"use client";
import { useEffect, useRef, useState } from "react";

/**
 * VoiceCinema
 * A scroll-pinned cinematic demo of a voice conversation with the tutor that
 * ends in an AI-generated quiz. Same architecture as ScrollCinema/CedCinema:
 * scroll progress 0→1 is the single source of truth for every frame, so
 * scrolling back rewinds the whole thing perfectly.
 *
 * Story arc:
 *   0.00–0.10  Chat UI + mic button fade in
 *   0.10–0.22  User taps mic; "Listening…" ring pulses
 *   0.22–0.50  Waveform visualizes user voice; transcript types out
 *   0.50–0.60  AI processing pulse + "Generating quiz" message
 *   0.60–0.92  Five quiz cards drop in one by one (impulse, momentum…)
 *   0.92–1.00  "Quiz ready · 5 questions" success state
 *
 * No real audio; pure CSS-driven visuals so it works in every browser
 * (and won't trigger autoplay/cookie/permissions surprises on a marketing
 * landing page). Respects prefers-reduced-motion by jumping to the end state.
 */

const TRANSCRIPT = "Quiz me on momentum and impulse for AP Physics 1.";

type QuizCard = {
  q: string;
  type: "MCQ" | "Free response" | "Numeric";
  topic: string;
};
const QUIZ: QuizCard[] = [
  { topic: "Impulse", type: "MCQ", q: "If a force of 10 N acts for 0.5 s on a 2 kg cart, what's the change in momentum?" },
  { topic: "Conservation", type: "MCQ", q: "Two carts collide and stick. Which quantity is always conserved?" },
  { topic: "Impulse", type: "Numeric", q: "A 0.145 kg baseball goes from +30 m/s to −40 m/s. Find the impulse." },
  { topic: "Free fall", type: "Free response", q: "Explain why a tennis ball bouncing off a wall has more impulse than one that sticks." },
  { topic: "Collisions", type: "MCQ", q: "Elastic vs. inelastic — which conserves kinetic energy?" },
];

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

  // Use the middle 92% of the section so the pin has breathing room.
  const story = remap(progress, 0.04, 0.96);

  const fadeIn = remap(story, 0.00, 0.10);
  const micPress = remap(story, 0.10, 0.22);
  const listening = remap(story, 0.22, 0.50);
  const transcriptP = listening; // transcript types alongside listening
  const transcriptText = TRANSCRIPT.slice(
    0,
    Math.round(transcriptP * TRANSCRIPT.length)
  );
  const showTranscriptCaret = transcriptP > 0.05 && transcriptP < 1;
  const processing = remap(story, 0.50, 0.60);
  const quizReveal = remap(story, 0.60, 0.92);
  const success = remap(story, 0.92, 1.00);

  // Compute per-card reveal — each card unlocks 1/5 of the quizReveal window
  const cardP = (i: number) => {
    const start = i * 0.20;
    const end = start + 0.30;
    return remap(quizReveal, start, end);
  };

  const titleOpacity =
    1 - remap(story, 0, 0.06) * 0.2 - remap(story, 0.94, 1) * 1;

  return (
    <section
      ref={wrapRef}
      className="relative h-[460vh]"
      aria-label="Animated demo: voice chat with quiz generation"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden">
        {/* Soft cinema background — different palette so it doesn't look like the
            other two cinemas: cooler purple/orange mix to set this section apart */}
        <div
          className="absolute inset-0 opacity-70"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at 25% 20%, rgba(249,115,22,0.12), transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(168,85,247,0.10), transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.07), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,10,10,0.030) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.030) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 72%)",
          }}
        />

        {/* Caption */}
        <div
          className="relative z-10 w-full px-4 pt-[10vh] pb-[2vh] text-center"
          style={{ opacity: titleOpacity }}
        >
          <div className="label">Talk to it</div>
          <h2 className="mt-2 font-serif text-2xl leading-tight text-ink sm:text-4xl">
            Hold the mic.{" "}
            <span className="italic gradient-text">Get a quiz.</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[13px] text-muted sm:text-sm">
            Talk to the tutor like you would a study partner. It listens,
            understands, and turns your request into a custom quiz on the spot.
          </p>
        </div>

        {/* Phone-style chat surface */}
        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center px-4 pb-[6vh]">
          <div
            className="relative h-full w-full overflow-hidden rounded-[28px] border border-hair bg-paper"
            style={{
              maxWidth: "min(28rem, 92vw)",
              aspectRatio: "9 / 16",
              maxHeight: "100%",
              boxShadow:
                "0 60px 120px -40px rgba(10,10,10,0.45), 0 20px 50px -30px rgba(168,85,247,0.20)",
              opacity: fadeIn,
              transform: `translateY(${lerp(40, 0, fadeIn)}px) scale(${lerp(0.96, 1, fadeIn)})`,
              transition: "transform 80ms linear, opacity 80ms linear",
            }}
          >
            {/* Phone status bar */}
            <div className="flex items-center justify-between border-b border-hair bg-offwhite px-5 py-2 text-[11px] text-muted">
              <span className="font-medium text-ink">9:41</span>
              <div className="flex items-center gap-1">
                <span>•••</span>
                <svg viewBox="0 0 16 12" className="h-3 w-4 fill-ink">
                  <rect x="0" y="3" width="14" height="6" rx="1.5" stroke="currentColor" fill="none" />
                  <rect x="2" y="5" width="9" height="2" />
                  <rect x="14.5" y="5" width="1" height="2" />
                </svg>
              </div>
            </div>

            {/* App header */}
            <div className="flex items-center gap-2 border-b border-hair bg-paper px-5 py-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-orange/15 text-orange">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 8h16M4 14h10" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-serif text-[14px] text-ink">FinalsPrep</div>
                <div className="text-[10px] text-muted">
                  {processing > 0 && quizReveal === 0
                    ? "Thinking…"
                    : success > 0.5
                    ? "Quiz ready · 5 questions"
                    : "AP Physics 1 · Voice mode"}
                </div>
              </div>
              <div
                className="rounded-full bg-orange-tint px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-ink"
                style={{ opacity: clamp(0.4 + listening * 0.6, 0, 1) }}
              >
                {success > 0.5 ? "Done" : "Live"}
              </div>
            </div>

            {/* Conversation area */}
            <div className="relative flex flex-col gap-3 px-4 py-4" style={{ height: "calc(100% - 200px)", overflow: "hidden" }}>
              {/* Greeting bubble (always shown after fadeIn) */}
              <div
                className="max-w-[85%] rounded-2xl rounded-tl-md border border-hair bg-offwhite px-3 py-2 text-[12px] leading-snug text-body"
                style={{ opacity: fadeIn }}
              >
                Hey, what would you like to study?
              </div>

              {/* User voice message — appears when listening starts */}
              {listening > 0.05 && (
                <div
                  className="ml-auto flex max-w-[85%] flex-col items-end gap-1.5"
                  style={{
                    opacity: clamp(listening * 1.5, 0, 1),
                    transform: `translateY(${lerp(8, 0, clamp(listening * 1.5, 0, 1))}px)`,
                  }}
                >
                  {/* Voice bubble with waveform */}
                  <div className="flex items-center gap-2 rounded-2xl rounded-tr-md bg-orange px-3 py-2 text-paper">
                    <Waveform progress={listening} />
                    <span className="font-mono text-[10px] tabular-nums text-paper/80">
                      0:{String(Math.round(listening * 6)).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Transcript */}
                  <div className="max-w-full rounded-xl bg-orange-tint/60 px-2.5 py-1.5 text-[11px] italic text-orange-ink">
                    "{transcriptText}
                    {showTranscriptCaret && (
                      <span className="ml-0.5 inline-block h-3 w-[1.5px] animate-pulseSoft bg-orange-ink align-middle" />
                    )}
                    {transcriptP === 1 ? '"' : ""}
                  </div>
                </div>
              )}

              {/* AI thinking bubble */}
              {processing > 0.02 && quizReveal < 0.05 && (
                <div
                  className="flex max-w-[60%] items-center gap-1.5 rounded-2xl rounded-tl-md border border-hair bg-offwhite px-3 py-2"
                  style={{ opacity: clamp(processing * 1.4, 0, 1) }}
                >
                  <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-orange" style={{ animationDelay: "0s" }} />
                  <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-orange" style={{ animationDelay: "0.15s" }} />
                  <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-orange" style={{ animationDelay: "0.30s" }} />
                  <span className="ml-1 text-[10px] text-muted">Generating your quiz…</span>
                </div>
              )}

              {/* AI summary bubble that appears once quiz starts */}
              {quizReveal > 0.05 && (
                <div
                  className="max-w-[85%] rounded-2xl rounded-tl-md border border-hair bg-offwhite px-3 py-2 text-[12px] leading-snug text-body"
                  style={{
                    opacity: clamp(quizReveal * 2, 0, 1),
                    transform: `translateY(${lerp(8, 0, clamp(quizReveal * 2, 0, 1))}px)`,
                  }}
                >
                  Got it — here are 5 questions on momentum + impulse, mixed
                  difficulty:
                </div>
              )}

              {/* Quiz cards stack (compressed view) */}
              <div className="mt-1 space-y-1.5 overflow-hidden">
                {QUIZ.map((card, i) => {
                  const p = cardP(i);
                  if (p <= 0) return null;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg border border-hair bg-paper px-2.5 py-1.5"
                      style={{
                        opacity: clamp(p * 1.5, 0, 1),
                        transform: `translateY(${lerp(10, 0, clamp(p * 1.5, 0, 1))}px) scale(${lerp(0.96, 1, clamp(p * 1.5, 0, 1))})`,
                      }}
                    >
                      <div className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange/15 font-mono text-[9px] font-semibold text-orange-ink">
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-wider text-muted">
                          <span>{card.topic}</span>
                          <span className="text-hair">·</span>
                          <span className="text-orange-ink">{card.type}</span>
                        </div>
                        <div className="truncate text-[10px] text-ink">
                          {card.q}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mic dock at the bottom */}
            <div
              className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-paper via-paper to-transparent px-6 pb-6 pt-10"
            >
              {/* Status text above the mic */}
              <div className="absolute inset-x-0 top-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                {success > 0.5
                  ? "Tap card to start quiz"
                  : quizReveal > 0.1
                  ? "Generating…"
                  : listening > 0.05
                  ? "Listening…"
                  : micPress > 0.5
                  ? "Hold to talk"
                  : "Tap mic to talk"}
              </div>

              {/* Mic button with pulsing rings */}
              <div className="relative">
                {/* Outer pulse rings while listening */}
                {listening > 0.02 && quizReveal < 0.05 && (
                  <>
                    <span
                      className="absolute inset-0 rounded-full bg-orange/20"
                      style={{
                        transform: `scale(${1 + (Math.sin(listening * Math.PI * 6) + 1) * 0.5})`,
                        opacity: 1 - clamp((Math.sin(listening * Math.PI * 6) + 1) * 0.5, 0, 1),
                        transition: "transform 60ms linear, opacity 60ms linear",
                      }}
                    />
                    <span
                      className="absolute inset-0 rounded-full bg-orange/15"
                      style={{
                        transform: `scale(${1.4 + (Math.sin(listening * Math.PI * 6 + 1) + 1) * 0.4})`,
                        opacity: 0.5 - clamp((Math.sin(listening * Math.PI * 6 + 1) + 1) * 0.5, 0, 0.5),
                        transition: "transform 60ms linear, opacity 60ms linear",
                      }}
                    />
                  </>
                )}
                <button
                  type="button"
                  aria-hidden
                  tabIndex={-1}
                  className="relative grid h-16 w-16 place-items-center rounded-full text-paper shadow-[0_8px_24px_-8px_rgba(194,65,12,0.6)]"
                  style={{
                    background:
                      success > 0.5
                        ? "linear-gradient(135deg, #16a34a, #15803d)"
                        : "linear-gradient(135deg, #f97316, #c2410c)",
                    transform: `scale(${lerp(0.92, micPress > 0.5 && quizReveal < 0.05 ? 0.96 : 1, fadeIn)})`,
                    transition: "transform 100ms linear, background 200ms",
                  }}
                >
                  {success > 0.5 ? (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                      <rect x="9" y="3" width="6" height="13" rx="3" />
                      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </svg>
                  )}
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
    </section>
  );
}

/**
 * Animated waveform that "moves" with the listening progress so it feels
 * alive rather than a static decoration. 18 bars; each bar's height is a
 * sine of (its index + listening progress * speed).
 */
function Waveform({ progress }: { progress: number }) {
  const bars = 18;
  return (
    <div className="flex h-4 items-center gap-[2px]">
      {Array.from({ length: bars }).map((_, i) => {
        const phase = i * 0.5 + progress * 30;
        const heightPct =
          progress > 0.02
            ? 25 + Math.abs(Math.sin(phase)) * 70 + Math.abs(Math.cos(phase * 1.7)) * 20
            : 18;
        return (
          <span
            key={i}
            className="block w-[2px] rounded-full bg-paper/90"
            style={{
              height: `${Math.min(95, heightPct)}%`,
              opacity: progress > 0.02 ? 0.7 + (i / bars) * 0.3 : 0.4,
              transition: "height 80ms linear",
            }}
          />
        );
      })}
    </div>
  );
}
