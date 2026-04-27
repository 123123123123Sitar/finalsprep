"use client";

import { useRef, useState } from "react";
import { toCanvas } from "html-to-image";

type Props = {
  reelId: number;
  durationSeconds: number;
};

/**
 * Two recording modes, because there's a real trade-off:
 *
 *   "auto"  — html-to-image + canvas.captureStream(). Fully automatic
 *             but bounded by html-to-image's DOM-walk speed (~3-4 fps
 *             at 1080x1920 even with pixelRatio cuts). Good for
 *             slow UI animations; choppy for fast motion.
 *
 *   "screen" — getDisplayMedia(). User picks the tab/window once,
 *              browser captures at ~30 fps natively, recording stops
 *              automatically when the reel duration elapses.
 *              Smooth, real video — but the extra picker click and
 *              the captured frame includes whatever's around the
 *              phone in the picked area.
 */

/**
 * Records a v2 reel's live preview as a video by:
 *   1. Resetting CSS animations to t=0 (so the recording starts on the
 *      first frame of the animation cycle, not whatever loop position
 *      the page happened to be in).
 *   2. Looping html-to-image over the phone DOM at ~12 fps and drawing
 *      each capture to a hidden canvas at 1080×1920.
 *   3. Recording that canvas via canvas.captureStream() + MediaRecorder.
 *   4. Stopping after the reel's duration and triggering a download.
 *
 * Output is webm (Chrome/Firefox) or mp4 (Safari) depending on browser
 * support. Instagram and most social platforms accept both.
 */
export default function RecordReelButton({ reelId, durationSeconds }: Props) {
  const [state, setState] = useState<"idle" | "recording" | "encoding">("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  function pickMimeType(): { mimeType: string; ext: string } {
    if (typeof MediaRecorder === "undefined")
      return { mimeType: "video/webm", ext: "webm" };
    const mp4 = "video/mp4";
    if (MediaRecorder.isTypeSupported(mp4))
      return { mimeType: mp4, ext: "mp4" };
    const webmVp9 = "video/webm;codecs=vp9,opus";
    if (MediaRecorder.isTypeSupported(webmVp9))
      return { mimeType: webmVp9, ext: "webm" };
    return { mimeType: "video/webm", ext: "webm" };
  }

  async function record() {
    if (state !== "idle") return;
    setError(null);
    setProgress(0);

    const phoneOrNull = document.querySelector<HTMLElement>(
      `[data-reel-id="${reelId}"]`
    );
    if (!phoneOrNull) {
      setError("Couldn't find the preview to record.");
      return;
    }
    const phone: HTMLElement = phoneOrNull;

    setState("recording");

    // Reset every animation in the phone to t=0 so the recording starts
    // at the first frame of the cycle.
    const animated = phone.querySelectorAll<HTMLElement>(
      ".v2-anim, .reel-progress span"
    );
    animated.forEach((el) => {
      const prev = el.style.animation;
      el.style.animation = "none";
      // Force reflow so the animation actually restarts when we re-apply.
      void el.offsetWidth;
      el.style.animation = "";
      el.style.animation = prev;
    });

    // Hide hover-pause behavior during recording so the strip keeps moving
    // even if the cursor is over the phone.
    phone.style.pointerEvents = "none";

    const W = 1080;
    const H = 1920;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      phone.style.pointerEvents = "";
      setState("idle");
      setError("Canvas 2D not available.");
      return;
    }
    ctx.fillStyle = "#0c0c0e";
    ctx.fillRect(0, 0, W, H);

    const stream = canvas.captureStream(30);
    const { mimeType, ext } = pickMimeType();
    const chunks: Blob[] = [];
    let recorder: MediaRecorder;
    try {
      recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 6_000_000,
      });
    } catch {
      phone.style.pointerEvents = "";
      setState("idle");
      setError("MediaRecorder isn't supported in this browser.");
      return;
    }

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    // Capture at the phone's native pixel size; let the recording canvas
    // upscale to 1080x1920. html-to-image rasterizes the whole DOM tree
    // every frame, so cutting capture resolution is the single biggest
    // speedup (~5-8x more fps without a noticeable quality loss for UI mocks).
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    let stopped = false;

    async function captureLoop(deadline: number) {
      while (!stopped && performance.now() < deadline) {
        try {
          const cap = await toCanvas(phone, {
            pixelRatio: 1,
            cacheBust: false,
            skipFonts: true,
          });
          if (stopped) break;
          ctx!.fillStyle = "#0c0c0e";
          ctx!.fillRect(0, 0, W, H);
          ctx!.drawImage(cap, 0, 0, W, H);
          const elapsed = performance.now() - start;
          setProgress(Math.min(1, elapsed / durationMs));
        } catch (e) {
          // skip a frame on transient capture errors
        }
      }
    }

    const durationMs = durationSeconds * 1000;
    const start = performance.now();
    const deadline = start + durationMs;

    recorder.start(250);
    stopRef.current = () => {
      stopped = true;
      try {
        recorder.state !== "inactive" && recorder.stop();
      } catch {
        // ignore
      }
    };

    captureLoop(deadline);

    const stopTimer = setTimeout(() => {
      stopped = true;
      try {
        recorder.state !== "inactive" && recorder.stop();
      } catch {
        // ignore
      }
    }, durationMs + 200);

    recorder.onstop = () => {
      clearTimeout(stopTimer);
      phone.style.pointerEvents = "";
      setState("encoding");
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `finalsprep-reel-v2-${String(reelId).padStart(2, "0")}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setState("idle");
      setProgress(0);
    };
  }

  function cancel() {
    stopRef.current?.();
  }

  async function recordScreen() {
    if (state !== "idle") return;
    setError(null);
    setProgress(0);

    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getDisplayMedia
    ) {
      setError("This browser doesn't support screen capture.");
      return;
    }

    setState("recording");

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } } as MediaTrackConstraints,
        audio: false,
      });
    } catch {
      setState("idle");
      setError("Screen capture cancelled.");
      return;
    }

    const { mimeType, ext } = pickMimeType();
    const chunks: Blob[] = [];
    let recorder: MediaRecorder;
    try {
      recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 8_000_000,
      });
    } catch {
      stream.getTracks().forEach((t) => t.stop());
      setState("idle");
      setError("MediaRecorder isn't supported in this browser.");
      return;
    }

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    const start = performance.now();
    const durationMs = durationSeconds * 1000;

    const tick = () => {
      const elapsed = performance.now() - start;
      setProgress(Math.min(1, elapsed / durationMs));
      if (recorder.state === "recording") {
        requestAnimationFrame(tick);
      }
    };

    recorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      setState("encoding");
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `finalsprep-reel-v2-${String(reelId).padStart(2, "0")}-screen.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setState("idle");
      setProgress(0);
    };

    recorder.start(250);
    requestAnimationFrame(tick);

    const stopTimer = setTimeout(() => {
      try {
        recorder.state !== "inactive" && recorder.stop();
      } catch {
        // ignore
      }
    }, durationMs);

    stopRef.current = () => {
      clearTimeout(stopTimer);
      try {
        recorder.state !== "inactive" && recorder.stop();
      } catch {
        // ignore
      }
    };

    // If the user stops sharing via the browser's own banner, end cleanly.
    stream.getVideoTracks()[0].addEventListener("ended", () => {
      clearTimeout(stopTimer);
      try {
        recorder.state !== "inactive" && recorder.stop();
      } catch {
        // ignore
      }
    });
  }

  const fileExt =
    typeof MediaRecorder !== "undefined" &&
    MediaRecorder.isTypeSupported("video/mp4")
      ? "MP4"
      : "WebM";

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={recordScreen}
          disabled={state !== "idle"}
          className="rounded-full bg-orange px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-orange-hover disabled:cursor-wait disabled:opacity-70"
          title="Pick the FinalsPrep tab in the screen-share dialog. Captures at ~30 fps. Smoothest output."
        >
          {state === "idle" && "Record (smooth, 30 fps)"}
          {state === "recording" && `Recording… ${Math.round(progress * 100)}%`}
          {state === "encoding" && "Encoding…"}
        </button>
        <button
          type="button"
          onClick={record}
          disabled={state !== "idle"}
          className="rounded-full border border-hair bg-paper px-4 py-2 text-[13px] font-medium text-ink transition hover:border-orange/60 hover:text-orange disabled:cursor-wait disabled:opacity-70"
          title="Captures the phone DOM directly (no screen-share). ~3-4 fps — fine for slow UI animations, choppy for fast motion."
        >
          Record (auto, lo-fps)
        </button>
        {state === "recording" && (
          <button
            type="button"
            onClick={cancel}
            className="rounded-full border border-hair bg-paper px-3 py-2 text-[12px] font-medium text-muted hover:text-ink"
          >
            Cancel
          </button>
        )}
        <span className="text-[11px] text-muted">
          ~{durationSeconds}s · {fileExt}
        </span>
      </div>
      <p className="mt-2 max-w-md text-[11px] leading-snug text-muted">
        <strong className="text-ink">Smooth</strong> opens the browser
        screen-picker — pick the FinalsPrep tab to capture the phone at
        real frame rate. <strong className="text-ink">Auto</strong>{" "}
        captures the DOM directly with no picker but only ~3–4 fps
        (html-to-image is the bottleneck, not the CPU).
      </p>
      {error && (
        <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-[12px] text-red-800">
          {error}
        </div>
      )}
    </div>
  );
}
