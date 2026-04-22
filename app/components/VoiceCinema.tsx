"use client";
import { useEffect, useRef, useState } from "react";

/**
 * VoiceCinema
 * Scroll-pinned cinematic demo of the real voice-mode chat UI in the app.
 * Same architecture as ScrollCinema/CedCinema (scroll progress is the single
 * source of truth for every frame, so scrolling back rewinds it).
 *
 * The visuals here mirror the actual VoiceModeUI rendered by app/chat/page.tsx:
 *   - Dark #0b0f1a fullscreen with white text
 *   - "Voice settings" pill (left) + X close button (right) in the header
 *   - Big animated gradient orb (sky → indigo → fuchsia) in the center
 *     - Pulses while listening (red ping ring)
 *     - Spins slowly while transcribing / thinking
 *     - Pulses while the tutor is speaking
 *   - State label below the orb that cycles through:
 *       Listening… → Transcribing… → Thinking… → Speaking… → idle
 *   - Two transcript cards (You / Tutor) — Tutor card streams a quiz with
 *     a blinking cursor while "Speaking…" runs
 *   - Bottom mic button — white when idle, red with ping ring when
 *     listening, sky-400 when speaking — with a "Or type a message…" pill
 *
 * Story arc (driven by scroll progress 0→1):
 *   0.00–0.08  Voice overlay fades in (dark surface + idle white mic)
 *   0.08–0.18  User taps mic → state flips to "Listening…", mic turns red,
 *              orb gets the sky ping ring, transcript types into "You" card
 *   0.18–0.26  "Transcribing…" — orb spins, "You" text settles
 *   0.26–0.34  "Thinking…" — orb continues to spin
 *   0.34–0.96  "Speaking…" — Tutor card streams a 5-question quiz markdown
 *              line by line with a blinking caret; mic turns sky-400 with
 *              its own ping
 *   0.96–1.00  Tail / idle settle
 */

const TRANSCRIPT = "Quiz me on momentum and impulse for AP Physics 1.";

// The tutor's spoken (and rendered) reply. Mirrors the markdown the real
// chat tutor would stream into the Tutor card. Kept short enough to fit the
// fixed-height transcript area.
const QUIZ_REPLY = [
  "Sure — five questions, mixed difficulty. Take your time.",
  "",
  "1. A 10 N force acts on a 2 kg cart for 0.5 s. What's the change in momentum?",
  "2. Two carts collide and stick. Which quantity is always conserved?",
  "3. A 0.145 kg baseball goes from +30 m/s to −40 m/s. Find the impulse.",
  "4. Why does a tennis ball bouncing off a wall have more impulse than one that sticks?",
  "5. Elastic vs. inelastic — which conserves kinetic energy?",
].join("\n");

const clamp = (n: number, a: number, b: number) =>
  Math.min(b, Math.max(a, n));
const remap = (p: number, a: number, b: number) =>
  clamp((p - a) / (b - a), 0, 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function VoiceCinema() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setReduceMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = clamp(-rect.top, 0, total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  // Allocate the middle 92% of the section to the story.
  const story = remap(progress, 0.04, 0.96);

  const overlayIn = remap(story, 0.00, 0.08);
  const listeningP = remap(story, 0.08, 0.18);
  const transcribeP = remap(story, 0.18, 0.26);
  const thinkP = remap(story, 0.26, 0.34);
  const speakP = remap(story, 0.34, 0.96);

  // Determine current state label
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

  // Transcript types out during listening
  const transcript = TRANSCRIPT.slice(
    0,
    Math.round(remap(story, 0.10, 0.22) * TRANSCRIPT.length)
  );

  // Quiz reply streams character-by-character during speakP
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

  // Orb animation class — matches the real VoiceModeUI orbAnim logic
  const orbAnim =
    state === "listening"
      ? "vc-orb-pulse"
      : state === "speaking"
      ? "vc-orb-pulse-fast"
      : state === "thinking" || state === "transcribing"
      ? "vc-orb-spin"
      : "";

  // Title fades out at the very end so the closing CTA can take over visually
  const titleOpacity =
    1 - remap(story, 0, 0.06) * 0.2 - remap(story, 0.94, 1) * 1;

  return (
    <section
      ref={wrapRef}
      className="relative h-[480vh]"
      aria-label="Animated demo: voice chat with the tutor"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden">
        {/* Soft surrounding wash so the dark voice surface reads as a phone-like
            inset on the marketing page rather than a full break. */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at 30% 25%, rgba(56,189,248,0.10), transparent 55%), radial-gradient(ellipse at 70% 75%, rgba(168,85,247,0.10), transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.06), transparent 60%)",
          }}
        />

        {/* Caption */}
        <div
          className="relative z-10 w-full px-4 pt-[8vh] pb-[2vh] text-center"
          style={{ opacity: titleOpacity }}
        >
          <div className="label">Talk to it</div>
          <h2 className="mt-2 font-serif text-2xl leading-tight text-ink sm:text-4xl">
            Open voice mode.{" "}
            <span className="italic gradient-text">Have a real conversation.</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[13px] text-muted sm:text-sm">
            The tutor listens, transcribes, thinks, and speaks back. Ask for a
            quiz; it'll dictate one to you on the spot.
          </p>
        </div>

        {/* Voice mode surface — recreates app/chat VoiceModeUI exactly */}
        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center px-4 pb-[6vh]">
          <div
            className="relative flex h-full w-full max-w-[min(34rem,94vw)] flex-col overflow-hidden rounded-[28px] bg-[#0b0f1a] text-white"
            style={{
              aspectRatio: "9 / 16",
              maxHeight: "100%",
              boxShadow:
                "0 60px 120px -40px rgba(10,10,30,0.55), 0 30px 80px -30px rgba(99,102,241,0.30)",
              opacity: overlayIn,
              transform: `translateY(${lerp(40, 0, overlayIn)}px) scale(${lerp(0.96, 1, overlayIn)})`,
              transition: "transform 80ms linear, opacity 80ms linear",
            }}
          >
            {/* Top bar: Voice settings (left) + X close (right) — matches real UI */}
            <div className="flex items-center justify-between px-5 py-4">
              <button
                type="button"
                aria-hidden
                tabIndex={-1}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] text-white/80"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Voice settings
              </button>
              <button
                type="button"
                aria-hidden
                tabIndex={-1}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Center: gradient orb + state label */}
            <div className="flex flex-col items-center px-6 pt-2">
              <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                {/* Outer gradient sphere */}
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 opacity-90 blur-[2px] ${orbAnim}`}
                />
                {/* Inner soft ring */}
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-sky-300/30 via-indigo-400/30 to-fuchsia-400/30 backdrop-blur-sm" />
                {/* Innermost halo */}
                <div className="absolute inset-8 rounded-full bg-white/5 ring-1 ring-white/10" />
                {/* Listening: extra ping ring */}
                {state === "listening" && (
                  <div className="absolute inset-0 rounded-full ring-4 ring-sky-400/40 vc-ping" />
                )}
              </div>
              <div className="mt-4 text-[14px] font-medium text-white/90">
                {stateLabel[state]}
              </div>
              <div className="mt-1 min-h-[14px] text-[11px] text-white/50">
                {stateHelper[state]}
              </div>
            </div>

            {/* Transcript cards */}
            <div className="flex-1 overflow-hidden px-5 pt-4">
              <div className="mx-auto w-full max-w-2xl space-y-2.5">
                {/* You */}
                {transcript.length > 0 && (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5"
                    style={{
                      opacity: clamp(remap(story, 0.10, 0.16) * 1.5, 0, 1),
                      transform: `translateY(${lerp(8, 0, clamp(remap(story, 0.10, 0.16) * 1.5, 0, 1))}px)`,
                    }}
                  >
                    <div className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
                      You
                    </div>
                    <div className="text-[12.5px] text-white/90">
                      {transcript}
                      {state === "listening" && (
                        <span className="ml-0.5 inline-block h-3 w-[1.5px] vc-blink bg-white/60 align-middle" />
                      )}
                    </div>
                  </div>
                )}

                {/* Tutor */}
                {speakP > 0 && (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5"
                    style={{
                      opacity: clamp(speakP * 4, 0, 1),
                      transform: `translateY(${lerp(8, 0, clamp(speakP * 4, 0, 1))}px)`,
                    }}
                  >
                    <div className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
                      Tutor
                    </div>
                    <div className="vc-md whitespace-pre-line text-[12px] leading-snug text-white/90">
                      {reply}
                      {showReplyCursor && (
                        <span className="ml-0.5 inline-block h-3 w-[2px] vc-blink bg-white/60 align-middle" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom: mic button + text input */}
            <div className="flex flex-col items-center gap-2.5 px-6 pb-6 pt-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* Ping rings — match real UI */}
                  {state === "listening" && (
                    <span className="absolute inset-0 rounded-full bg-red-500/60 vc-ping" />
                  )}
                  {state === "speaking" && (
                    <span className="absolute inset-0 rounded-full bg-sky-400/50 vc-ping" />
                  )}
                  <button
                    type="button"
                    aria-hidden
                    tabIndex={-1}
                    className={`relative grid h-16 w-16 place-items-center rounded-full transition-colors ${
                      state === "listening"
                        ? "bg-red-500 text-white shadow-[0_0_50px_rgba(239,68,68,0.5)]"
                        : state === "speaking"
                        ? "bg-sky-400 text-slate-900 shadow-[0_0_50px_rgba(56,189,248,0.5)]"
                        : "bg-white text-slate-900 shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                    }`}
                    style={{
                      transform: `scale(${lerp(0.92, 1, overlayIn)})`,
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="relative"
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
                  </button>
                </div>
              </div>
              {/* Text input pill */}
              <div className="flex w-full max-w-xl items-center gap-2">
                <div className="flex-1 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12px] text-white/40">
                  Or type a message…
                </div>
                <button
                  type="button"
                  aria-hidden
                  tabIndex={-1}
                  className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white/60"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                    <path d="M8 14V2M3 7l5-5 5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-muted"
          style={{ opacity: clamp((1 - story * 4) * 0.7, 0, 0.7) }}
          aria-hidden
        >
          ↓ keep scrolling
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
