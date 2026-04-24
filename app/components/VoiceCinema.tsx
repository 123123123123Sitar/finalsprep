"use client";
import { useEffect, useRef, useState } from "react";

/**
 * VoiceCinema
 * Scroll-pinned cinematic demo of the real voice-mode chat UI from
 * app/chat/page.tsx. Same architecture as ScrollCinema/CedCinema: the
 * section is taller than the viewport and the inner content uses
 * `sticky top-0` so it stays fixed while the user scrolls through. Scroll
 * progress within the section drives every frame of the demo, which means:
 *   - Visitors literally can't scroll past the closing CTA until they've
 *     scrubbed through the whole demo (the section eats that much scroll)
 *   - Scrolling back rewinds it perfectly because state is a pure function
 *     of progress
 *
 * Story arc (driven by scroll progress 0→1, story remapped to 0.04–0.96):
 *   0.00–0.06  Voice overlay fades in (idle, white mic)
 *   0.06–0.14  User taps mic → "Listening…", red mic with sky ping ring,
 *              transcript types into the You card
 *   0.14–0.20  "Transcribing…" — orb spins
 *   0.20–0.26  "Thinking…" — orb continues to spin
 *   0.26–0.96  "Speaking…" — Tutor card streams the 5-question quiz
 *              markdown line by line; mic turns sky-400 with its own ping;
 *              this state gets ~70% of the scroll so visitors can read it
 *
 * Visuals match the actual VoiceModeUI: dark #0b0f1a surface, gradient orb
 * (sky → indigo → fuchsia), state labels cycling through Listening →
 * Transcribing → Thinking → Speaking, white→red→sky mic with ping rings,
 * and the same You/Tutor transcript cards.
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

const clamp = (n: number, a: number, b: number) =>
  Math.min(b, Math.max(a, n));
const remap = (p: number, a: number, b: number) =>
  clamp((p - a) / (b - a), 0, 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function VoiceCinema() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
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
      const next = total > 0 ? scrolled / total : 0;
      // Quantize to ~0.2% steps so React only rerenders when progress has
      // actually moved meaningfully — kills jank during fast scrolls.
      setProgress((prev) =>
        Math.abs(next - prev) < 0.002 ? prev : next
      );
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

  // Use the middle 92% of the section so the pin has breathing room.
  const story = remap(progress, 0.04, 0.96);

  // Story segments — speaking state intentionally gets the lion's share
  // (~70% of scroll) because that's where the tutor reads the quiz back.
  const overlayIn = remap(story, 0.00, 0.06);
  const listeningP = remap(story, 0.06, 0.14);
  const transcribeP = remap(story, 0.14, 0.20);
  const thinkP = remap(story, 0.20, 0.26);
  const speakP = remap(story, 0.26, 0.96);

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

  const transcript = TRANSCRIPT.slice(
    0,
    Math.round(remap(story, 0.07, 0.13) * TRANSCRIPT.length)
  );

  const reply = QUIZ_REPLY.slice(0, Math.round(speakP * QUIZ_REPLY.length));
  const showReplyCursor = speakP > 0.02 && speakP < 1;

  // Auto-scroll the transcript so the latest-revealed text is always visible
  // as the tutor reply streams in. Without this, long replies get clipped by
  // the fixed-height phone card and users only see the first few lines.
  useEffect(() => {
    const el = transcriptRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [reply, transcript]);

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

  const titleOpacity =
    1 - remap(story, 0, 0.06) * 0.2 - remap(story, 0.94, 1) * 1;

  // Per-section progress bar at the top of the pinned card so visitors can
  // tell at a glance how much of the demo they've watched and that scrolling
  // is what's playing it.
  const barPct = Math.round(progress * 100);

  return (
    <section
      ref={wrapRef}
      className="relative h-[560vh]"
      aria-label="Animated demo: voice chat with the tutor"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden">
        {/* Surrounding wash */}
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
          className="relative z-10 w-full px-4 pt-[8vh] pb-[1vh] text-center"
          style={{ opacity: titleOpacity }}
        >
          <div className="label">Talk to it</div>
          <h2 className="mt-2 font-serif text-2xl leading-tight text-ink sm:text-4xl">
            Open voice mode.{" "}
            <span className="italic gradient-text">
              Have a real conversation.
            </span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[12px] text-muted sm:text-[13px]">
            Scroll to play. The tutor listens, transcribes, thinks, and
            speaks back — ask it for a quiz; it'll dictate one to you.
          </p>
          {/* Per-section progress bar */}
          <div className="mx-auto mt-3 flex max-w-[14rem] items-center gap-2">
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-hair/60">
              <div
                className="absolute inset-y-0 left-0 bg-orange"
                style={{ width: `${barPct}%`, transition: "width 80ms linear" }}
              />
            </div>
            <span className="font-mono text-[10px] tabular-nums text-muted">
              {String(barPct).padStart(2, "0")}%
            </span>
          </div>
        </div>

        {/* Voice mode surface */}
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
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] text-white/80">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Voice settings
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Orb + state */}
            <div className="flex flex-col items-center px-6 pt-1">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24">
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 opacity-90 blur-[2px] ${orbAnim}`}
                />
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-sky-300/30 via-indigo-400/30 to-fuchsia-400/30 backdrop-blur-sm" />
                <div className="absolute inset-8 rounded-full bg-white/5 ring-1 ring-white/10" />
                {state === "listening" && (
                  <div className="absolute inset-0 rounded-full ring-4 ring-sky-400/40 vc-ping" />
                )}
              </div>
              <div className="mt-2 text-[13px] font-medium text-white/90">
                {stateLabel[state]}
              </div>
              <div className="mt-0.5 min-h-[14px] text-[11px] text-white/50">
                {stateHelper[state]}
              </div>
            </div>

            {/* Transcript */}
            <div
              ref={transcriptRef}
              className="vc-transcript min-h-0 flex-1 overflow-y-auto px-5 pt-4"
            >
              <div className="space-y-2.5 pb-2">
                {transcript.length > 0 && (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5"
                    style={{
                      opacity: clamp(remap(story, 0.07, 0.10) * 1.5, 0, 1),
                      transform: `translateY(${lerp(8, 0, clamp(remap(story, 0.07, 0.10) * 1.5, 0, 1))}px)`,
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

            {/* Mic + text input */}
            <div className="flex flex-col items-center gap-2 px-6 pb-4 pt-2">
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
                  style={{
                    transform: `scale(${lerp(0.92, 1, overlayIn)})`,
                  }}
                >
                  <svg
                    width="22"
                    height="22"
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
              <div className="flex w-full max-w-xl items-center gap-2">
                <div className="flex-1 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12px] text-white/40">
                  Or type a message…
                </div>
                <div className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white/60">
                  <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden>
                    <path d="M8 14V2M3 7l5-5 5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint — fades after the demo gets going */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-muted"
          style={{
            opacity:
              progress < 0.05
                ? 0.7
                : progress > 0.95
                ? 0.7
                : 0,
            transition: "opacity 200ms",
          }}
          aria-hidden
        >
          {progress > 0.95 ? "↓ continue" : "↓ scroll to play"}
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
        .vc-transcript { scrollbar-width: none; -ms-overflow-style: none; }
        .vc-transcript::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .vc-orb-pulse, .vc-orb-pulse-fast, .vc-orb-spin, .vc-ping, .vc-blink {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
