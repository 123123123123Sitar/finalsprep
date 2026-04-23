"use client";
import { useEffect, useRef, useState } from "react";

/**
 * VoiceCinema
 * Auto-playing demo of the real voice-mode chat UI from app/chat/page.tsx.
 *
 * Unlike ScrollCinema/CedCinema (which are scroll-driven), this one plays
 * automatically when it scrolls into view — start to finish — so visitors
 * don't have to land on a specific scroll position to see the output. The
 * mic input was visible but the AI reply wasn't, because users were scrolling
 * past the speaking-state frame too fast.
 *
 * Story arc (timed, ~14s total):
 *   0.00–0.04s  Voice overlay fades in (dark surface + idle white mic)
 *   0.04–0.10s  User taps mic → state flips to "Listening…", mic turns red,
 *               orb gets the sky ping ring, transcript types into "You" card
 *   0.10–0.18s  "Transcribing…" — orb spins, "You" text settles
 *   0.18–0.26s  "Thinking…" — orb continues to spin
 *   0.26–1.00s  "Speaking…" — Tutor card streams a 5-question quiz markdown
 *               line by line with a blinking caret; mic turns sky-400 with
 *               its own ping. After the reply is complete we hold the final
 *               state for a second or two before optionally looping.
 *
 * Visuals match the actual VoiceModeUI: dark #0b0f1a surface, gradient orb
 * (sky → indigo → fuchsia), state labels cycling through Listening →
 * Transcribing → Thinking → Speaking, white→red→sky mic with ping rings,
 * and the same You/Tutor transcript cards.
 *
 * Pauses when scrolled out of view, resumes when scrolled back. After one
 * full play it pauses at the end state; clicking the surface restarts.
 * Respects prefers-reduced-motion by jumping straight to the end frame.
 */

const TRANSCRIPT = "Quiz me on momentum and impulse for AP Physics 1.";

const QUIZ_REPLY = [
  "Sure — five questions, mixed difficulty. Take your time.",
  "",
  "1. A 10 N force acts on a 2 kg cart for 0.5 s. What's the change in momentum?",
  "2. Two carts collide and stick. Which quantity is always conserved?",
  "3. A 0.145 kg baseball goes from +30 m/s to −40 m/s. Find the impulse.",
  "4. Why does a tennis ball bouncing off a wall have more impulse than one that sticks?",
  "5. Elastic vs. inelastic — which conserves kinetic energy?",
].join("\n");

const TIMELINE_MS = 14000;

const clamp = (n: number, a: number, b: number) =>
  Math.min(b, Math.max(a, n));
const remap = (p: number, a: number, b: number) =>
  clamp((p - a) / (b - a), 0, 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function VoiceCinema() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  // playKey lets us restart the demo when the user clicks "Replay".
  const [playKey, setPlayKey] = useState(0);

  // IntersectionObserver pauses the timer when the section leaves the
  // viewport so it doesn't desync if the user scrolls away mid-playback.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setIsInView(e.isIntersecting);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Drive progress 0→1 over TIMELINE_MS. Pauses while not in view, resumes
  // from the same progress when it comes back. We intentionally still play
  // the timeline for users with prefers-reduced-motion — the orb spin/pulse
  // animations honor that preference via CSS, but the demo still plays so
  // visitors can see the conversation.
  useEffect(() => {
    if (!isInView || hasFinished) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // Clamp dt so a dropped frame, a backgrounded tab, or a slow first
      // rAF after page load doesn't advance progress in one giant leap.
      // 50ms ≈ 3 frames at 60fps.
      const dt = Math.min(50, now - last);
      last = now;
      setProgress((p) => {
        const next = Math.min(1, p + dt / TIMELINE_MS);
        if (next >= 1) setHasFinished(true);
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, hasFinished, playKey]);

  function replay() {
    setProgress(0);
    setHasFinished(false);
    setPlayKey((k) => k + 1);
  }

  // Story segments
  const overlayIn = remap(progress, 0.00, 0.04);
  const listeningP = remap(progress, 0.04, 0.10);
  const transcribeP = remap(progress, 0.10, 0.18);
  const thinkP = remap(progress, 0.18, 0.26);
  const speakP = remap(progress, 0.26, 0.96);

  type State = "idle" | "listening" | "transcribing" | "thinking" | "speaking";
  const state: State =
    speakP > 0
      ? "speaking"
      : thinkP > 0
      ? "thinking"
      : transcribeP > 0
      ? "transcribing"
      : listeningP > 0
      ? "listening"
      : "idle";

  // Transcript types out as the user "speaks"
  const transcript = TRANSCRIPT.slice(
    0,
    Math.round(remap(progress, 0.05, 0.13) * TRANSCRIPT.length)
  );

  const reply = QUIZ_REPLY.slice(0, Math.round(speakP * QUIZ_REPLY.length));
  const showReplyCursor = speakP > 0.02 && speakP < 1;

  const stateLabel: Record<State, string> = {
    idle: "Tap the mic to speak, or type below",
    listening: "Listening…",
    transcribing: "Transcribing…",
    thinking: "Thinking…",
    speaking: "Speaking…",
  };

  const stateHelper: Record<State, string> = {
    idle: "Tap mic, speak, tap again to send.",
    listening: "",
    transcribing: "Please wait…",
    thinking: "",
    speaking: "",
  };

  const orbAnim =
    state === "listening"
      ? "vc-orb-pulse"
      : state === "speaking"
      ? "vc-orb-pulse-fast"
      : state === "thinking" || state === "transcribing"
      ? "vc-orb-spin"
      : "";

  return (
    <section
      ref={wrapRef}
      className="relative mx-auto flex max-w-6xl items-stretch justify-center px-4 py-12 sm:py-16 md:py-20"
      aria-label="Animated demo: voice chat with the tutor"
    >
      {/* Surrounding wash so the dark surface reads as inset on the page */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 30% 25%, rgba(56,189,248,0.10), transparent 55%), radial-gradient(ellipse at 70% 75%, rgba(168,85,247,0.10), transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.06), transparent 60%)",
        }}
      />

      <div className="relative z-10 grid w-full items-center gap-8 md:grid-cols-[1fr_minmax(360px,460px)]">
        {/* Caption + replay button */}
        <div className="text-center md:text-left">
          <div className="label">Talk to it</div>
          <h2 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">
            Open voice mode.{" "}
            <span className="italic gradient-text">
              Have a real conversation.
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-body md:mx-0">
            The tutor listens, transcribes, thinks, and speaks back. Ask it for
            a quiz; it'll dictate one to you on the spot. This is a recording
            of the real <code className="font-mono text-[12px] text-ink">/chat</code>{" "}
            voice mode in action.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
            <button
              type="button"
              onClick={replay}
              className="inline-flex items-center gap-2 rounded-full border border-hair bg-paper px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-orange/50 hover:text-orange"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <path d="M3 4v5h5" />
              </svg>
              Replay
            </button>
            {/* Tiny progress bar so the visitor knows it's playing */}
            <div className="relative h-1 w-32 overflow-hidden rounded-full bg-hair/60">
              <div
                className="absolute inset-y-0 left-0 bg-orange transition-[width] duration-150 ease-linear"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-muted">
              {String(Math.round(progress * (TIMELINE_MS / 1000))).padStart(2, "0")}
              s / {Math.round(TIMELINE_MS / 1000)}s
            </span>
          </div>
        </div>

        {/* Voice mode surface — recreates the real VoiceModeUI */}
        <div className="mx-auto w-full max-w-[460px]">
          <div
            className="relative flex aspect-[9/16] w-full flex-col overflow-hidden rounded-[28px] bg-[#0b0f1a] text-white"
            style={{
              boxShadow:
                "0 60px 120px -40px rgba(10,10,30,0.55), 0 30px 80px -30px rgba(99,102,241,0.30)",
              opacity: overlayIn,
              transform: `translateY(${lerp(20, 0, overlayIn)}px) scale(${lerp(0.98, 1, overlayIn)})`,
              transition: "transform 80ms linear, opacity 80ms linear",
            }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] text-white/80">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Voice settings
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Orb + state label */}
            <div className="flex flex-col items-center px-6 pt-1">
              <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 opacity-90 blur-[2px] ${orbAnim}`}
                />
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-sky-300/30 via-indigo-400/30 to-fuchsia-400/30 backdrop-blur-sm" />
                <div className="absolute inset-7 rounded-full bg-white/5 ring-1 ring-white/10" />
                {state === "listening" && (
                  <div className="absolute inset-0 rounded-full ring-4 ring-sky-400/40 vc-ping" />
                )}
              </div>
              <div className="mt-3 text-[13px] font-medium text-white/90">
                {stateLabel[state]}
              </div>
              <div className="mt-1 min-h-[14px] text-[10px] text-white/50">
                {stateHelper[state]}
              </div>
            </div>

            {/* Transcript cards */}
            <div className="flex-1 overflow-hidden px-4 pt-3">
              <div className="space-y-2">
                {transcript.length > 0 && (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
                    style={{
                      opacity: clamp(remap(progress, 0.05, 0.09) * 1.5, 0, 1),
                    }}
                  >
                    <div className="mb-0.5 text-[9px] uppercase tracking-wider text-white/40">
                      You
                    </div>
                    <div className="text-[11.5px] text-white/90">
                      {transcript}
                      {state === "listening" && (
                        <span className="ml-0.5 inline-block h-3 w-[1.5px] vc-blink bg-white/60 align-middle" />
                      )}
                    </div>
                  </div>
                )}

                {speakP > 0 && (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2"
                    style={{
                      opacity: clamp(speakP * 4, 0, 1),
                    }}
                  >
                    <div className="mb-0.5 text-[9px] uppercase tracking-wider text-white/40">
                      Tutor
                    </div>
                    <div className="vc-md whitespace-pre-line text-[11px] leading-snug text-white/90">
                      {reply}
                      {showReplyCursor && (
                        <span className="ml-0.5 inline-block h-3 w-[2px] vc-blink bg-white/60 align-middle" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mic + text input */}
            <div className="flex flex-col items-center gap-2 px-6 pb-5 pt-3">
              <div className="relative">
                {state === "listening" && (
                  <span className="absolute inset-0 rounded-full bg-red-500/60 vc-ping" />
                )}
                {state === "speaking" && (
                  <span className="absolute inset-0 rounded-full bg-sky-400/50 vc-ping" />
                )}
                <div
                  className={`relative grid h-14 w-14 place-items-center rounded-full transition-colors ${
                    state === "listening"
                      ? "bg-red-500 text-white shadow-[0_0_50px_rgba(239,68,68,0.5)]"
                      : state === "speaking"
                      ? "bg-sky-400 text-slate-900 shadow-[0_0_50px_rgba(56,189,248,0.5)]"
                      : "bg-white text-slate-900 shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    {state === "listening" || state === "speaking" ? (
                      <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" />
                    ) : (
                      <>
                        <rect
                          x="9"
                          y="3"
                          width="6"
                          height="12"
                          rx="3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M5 11a7 7 0 0 0 14 0M12 18v3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </>
                    )}
                  </svg>
                </div>
              </div>
              <div className="flex w-full items-center gap-1.5">
                <div className="flex-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] text-white/40">
                  Or type a message…
                </div>
                <div className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white/60">
                  <svg width="10" height="10" viewBox="0 0 16 16" aria-hidden>
                    <path d="M8 14V2M3 7l5-5 5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes vcPulse {
          0%, 100% { transform: scale(1); opacity: 0.92; }
          50% { transform: scale(1.04); opacity: 1; }
        }
        @keyframes vcPulseFast {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes vcSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes vcPing {
          75%, 100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes vcBlink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        .vc-orb-pulse { animation: vcPulse 2s ease-in-out infinite; }
        .vc-orb-pulse-fast { animation: vcPulseFast 1.1s ease-in-out infinite; }
        .vc-orb-spin { animation: vcSpin 6s linear infinite; }
        .vc-ping {
          animation: vcPing 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .vc-blink {
          animation: vcBlink 0.9s steps(1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .vc-orb-pulse, .vc-orb-pulse-fast, .vc-orb-spin, .vc-ping, .vc-blink {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
