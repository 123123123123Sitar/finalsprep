"use client";

import { useRef, useState } from "react";
import { toCanvas } from "html-to-image";

type Props = {
  reelId: number;
  durationSeconds: number;
};

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

    const captureScale = W / phone.getBoundingClientRect().width;
    let stopped = false;

    async function captureLoop(deadline: number) {
      while (!stopped && performance.now() < deadline) {
        try {
          const cap = await toCanvas(phone, {
            pixelRatio: captureScale,
            cacheBust: false,
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

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={record}
          disabled={state !== "idle"}
          className="rounded-full bg-orange px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-orange-hover disabled:cursor-wait disabled:opacity-70"
        >
          {state === "idle" && "Record video"}
          {state === "recording" && `Recording… ${Math.round(progress * 100)}%`}
          {state === "encoding" && "Encoding…"}
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
          ~{durationSeconds}s capture · saves as{" "}
          {typeof MediaRecorder !== "undefined" &&
          MediaRecorder.isTypeSupported("video/mp4")
            ? "MP4"
            : "WebM"}
        </span>
      </div>
      {error && (
        <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-[12px] text-red-800">
          {error}
        </div>
      )}
    </div>
  );
}
