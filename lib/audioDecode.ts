/**
 * Decode a MediaRecorder blob to a 16kHz mono Float32Array in the browser
 * and trim leading/trailing silence so Whisper has less audio to chew on.
 * This runs client-side so the server doesn't need ffmpeg or any audio
 * libraries - it just receives raw PCM samples and feeds them to Whisper.
 */
export async function blobTo16kMono(blob: Blob): Promise<Float32Array> {
  const arrayBuf = await blob.arrayBuffer();
  const AudioCtx: any =
    (typeof window !== "undefined" && (window as any).AudioContext) ||
    (typeof window !== "undefined" && (window as any).webkitAudioContext);
  if (!AudioCtx) throw new Error("AudioContext not available");
  const decodeCtx = new AudioCtx();
  let decoded: AudioBuffer;
  try {
    decoded = await decodeCtx.decodeAudioData(arrayBuf.slice(0));
  } finally {
    try {
      decodeCtx.close();
    } catch {}
  }
  const channelCount = decoded.numberOfChannels;
  const frames = decoded.length;
  const mono = new Float32Array(frames);
  for (let c = 0; c < channelCount; c++) {
    const data = decoded.getChannelData(c);
    for (let i = 0; i < frames; i++) mono[i] += data[i] / channelCount;
  }
  let samples: Float32Array;
  if (decoded.sampleRate === 16000) {
    samples = mono;
  } else {
    const Offline: any =
      (typeof window !== "undefined" && (window as any).OfflineAudioContext) ||
      (typeof window !== "undefined" &&
        (window as any).webkitOfflineAudioContext);
    const targetRate = 16000;
    const targetFrames = Math.ceil(frames * (targetRate / decoded.sampleRate));
    const offline = new Offline(1, targetFrames, targetRate);
    const src = offline.createBufferSource();
    const buf = offline.createBuffer(1, frames, decoded.sampleRate);
    buf.getChannelData(0).set(mono);
    src.buffer = buf;
    src.connect(offline.destination);
    src.start();
    const rendered: AudioBuffer = await offline.startRendering();
    samples = rendered.getChannelData(0).slice(0);
  }
  return trimSilence(samples, 16000);
}

/**
 * Trim leading/trailing silence from a PCM buffer so Whisper doesn't waste
 * inference cycles on dead air. Uses RMS over 20ms windows with a relative
 * threshold (15% of peak RMS, floored at 0.005) so it adapts to mic gain.
 * Keeps 100ms of padding on each side so we don't clip the first/last word.
 */
function trimSilence(samples: Float32Array, sampleRate: number): Float32Array {
  const winSize = Math.floor(sampleRate * 0.02); // 20ms
  if (samples.length < winSize * 4) return samples;
  const n = Math.floor(samples.length / winSize);
  const rms = new Float32Array(n);
  let peak = 0;
  for (let i = 0; i < n; i++) {
    let sum = 0;
    const base = i * winSize;
    for (let j = 0; j < winSize; j++) {
      const s = samples[base + j];
      sum += s * s;
    }
    rms[i] = Math.sqrt(sum / winSize);
    if (rms[i] > peak) peak = rms[i];
  }
  const thresh = Math.max(0.005, peak * 0.15);
  let start = 0;
  while (start < n && rms[start] < thresh) start++;
  let end = n - 1;
  while (end > start && rms[end] < thresh) end--;
  if (start >= end) return samples; // all silence? leave as-is
  const padWin = 5; // 100ms
  start = Math.max(0, start - padWin);
  end = Math.min(n - 1, end + padWin);
  const startSample = start * winSize;
  const endSample = Math.min(samples.length, (end + 1) * winSize);
  if (startSample === 0 && endSample === samples.length) return samples;
  return samples.slice(startSample, endSample);
}
