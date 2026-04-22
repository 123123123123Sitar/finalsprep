"use client";
import { useEffect, useRef, useState } from "react";

/**
 * ScrollCinema
 * A scroll-pinned cinematic "screencast" of a user using FinalsPrep.
 * Scroll progress 0→1 drives every frame: URL typing, cursor path, input
 * typing, button click flash, and solution streaming in. Scrolling back up
 * rewinds the whole thing because state is a pure function of progress.
 */

const URL_TEXT = "finalsprep.com/chat";
const PROBLEM = "Solve 2x² − 5x − 3 = 0";
const SOLUTION = `This is a quadratic. Use the formula
  x = [ −b ± √(b² − 4ac) ] / 2a

With a = 2, b = −5, c = −3:
  Discriminant = (−5)² − 4(2)(−3) = 25 + 24 = 49
  √49 = 7
  x = (5 ± 7) / 4

So  x = 3  or  x = −½`;

const clamp = (n: number, a: number, b: number) =>
  Math.min(b, Math.max(a, n));
const remap = (p: number, a: number, b: number) =>
  clamp((p - a) / (b - a), 0, 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// Smoothstep for cursor easing between waypoints.
const smooth = (t: number) => t * t * (3 - 2 * t);

type Key = { p: number; x: number; y: number };
// Coordinates target the new chat layout:
//   URL bar     ≈ (22, 8)
//   Composer    ≈ (55, 88)
//   Send button ≈ (88, 88)
//   Messages    ≈ (50, 55)
const CURSOR_PATH: Key[] = [
  { p: 0.0, x: 92, y: 92 },
  { p: 0.08, x: 60, y: 30 },
  { p: 0.17, x: 22, y: 8 },
  { p: 0.32, x: 22, y: 8 },
  { p: 0.44, x: 55, y: 88 },
  { p: 0.66, x: 55, y: 88 },
  { p: 0.74, x: 88, y: 88 },
  { p: 0.82, x: 88, y: 88 },
  { p: 1.0, x: 50, y: 55 },
];

function cursorAt(p: number) {
  if (p <= CURSOR_PATH[0].p) return CURSOR_PATH[0];
  for (let i = 1; i < CURSOR_PATH.length; i++) {
    const k = CURSOR_PATH[i];
    const prev = CURSOR_PATH[i - 1];
    if (p <= k.p) {
      const t = (p - prev.p) / (k.p - prev.p || 1);
      const et = smooth(t);
      return { p, x: lerp(prev.x, k.x, et), y: lerp(prev.y, k.y, et) };
    }
  }
  return CURSOR_PATH[CURSOR_PATH.length - 1];
}

export default function ScrollCinema() {
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

  // Allocate the middle 90% of the section to the story so the pin has
  // breathing room at enter/exit.
  const story = remap(progress, 0.04, 0.96);

  const urlTypingP = remap(story, 0.06, 0.18);
  const urlTyped = URL_TEXT.slice(
    0,
    Math.round(urlTypingP * URL_TEXT.length)
  );
  const showUrlCaret = urlTypingP > 0 && urlTypingP < 1;

  const pageLoad = remap(story, 0.18, 0.32);

  const cursor = cursorAt(story);

  const focusIntensity = remap(story, 0.42, 0.50);
  const inputP = remap(story, 0.46, 0.66);
  const problemTyped = PROBLEM.slice(0, Math.round(inputP * PROBLEM.length));
  const showInputCaret = inputP > 0.02 && inputP < 1;

  const clickP = remap(story, 0.72, 0.82);
  const clickRipple = clickP < 0.5 ? clickP * 2 : (1 - clickP) * 2;

  const thinkingP = remap(story, 0.78, 0.84);
  const solutionP = remap(story, 0.82, 1.0);
  const solutionLen = Math.round(solutionP * SOLUTION.length);
  const solution = SOLUTION.slice(0, solutionLen);
  const showSolutionCaret = solutionP > 0.02 && solutionP < 1;

  const titleOpacity =
    1 - remap(story, 0, 0.06) * 0.2 - remap(story, 0.92, 1) * 1;

  // Tiny wander so the cursor never sits perfectly still.
  const wobble = Math.sin(progress * 50) * 0.35;

  return (
    <section
      ref={wrapRef}
      className="relative h-[520vh]"
      aria-label="Animated demo: watch a problem get solved as you scroll"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden">
        {/* Soft cinema background */}
        <div
          className="absolute inset-0 opacity-70"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at 20% 15%, rgba(249,115,22,0.14), transparent 55%), radial-gradient(ellipse at 80% 85%, rgba(194,65,12,0.12), transparent 55%), radial-gradient(ellipse at 60% 40%, rgba(245,158,11,0.08), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,10,10,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.035) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 72%)",
          }}
        />

        {/* Caption */}
        <div
          className="relative z-10 w-full px-4 pt-[13vh] pb-[2vh] text-center"
          style={{ opacity: titleOpacity }}
        >
          <div className="label">Watch it happen</div>
          <h2 className="mt-2 font-serif text-2xl leading-tight text-ink sm:text-4xl">
            A full tutoring session,{" "}
            <span className="italic gradient-text">one scroll.</span>
          </h2>
        </div>

        {/* Browser: sized to fit the remaining space */}
        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center px-4 pb-[8vh]">
        <div
          className="relative h-full w-full overflow-hidden rounded-xl border border-hair bg-paper"
          style={{
            maxWidth: "min(68rem, 94vw)",
            aspectRatio: "16 / 10",
            maxHeight: "100%",
            boxShadow:
              "0 60px 120px -40px rgba(10,10,10,0.45), 0 20px 50px -30px rgba(194,65,12,0.25)",
            transform: `translateY(${lerp(40, 0, pageLoad)}px) scale(${lerp(
              0.97,
              1,
              pageLoad
            )})`,
            transition: "transform 80ms linear",
          }}
        >
          {/* Chrome */}
          <div className="flex items-center gap-2 border-b border-hair bg-offwhite px-3 py-2 sm:px-4 sm:py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <div className="ml-2 flex-1 overflow-hidden rounded-md border border-hair bg-paper px-3 py-1 font-mono text-[11px] text-muted sm:ml-4 sm:text-xs">
              <span className="mr-1.5 text-green-600">●</span>
              <span className="text-ink">{urlTyped}</span>
              {showUrlCaret && (
                <span className="ml-0.5 inline-block h-3 w-[1.5px] animate-pulseSoft bg-orange align-middle" />
              )}
            </div>
            <div className="hidden items-center gap-1 text-[10px] text-muted sm:flex">
              <span className="rounded px-1.5 py-0.5 ring-1 ring-hair">
                ⌘R
              </span>
            </div>
          </div>

          {/* Page content: fades in on "page load". This is a faithful
              recreation of /chat: sidebar + main column + dark composer. */}
          <div
            className="relative h-[calc(100%-41px)]"
            style={{ opacity: pageLoad }}
          >
            <div className="flex h-full bg-paper">
              {/* LEFT SIDEBAR */}
              <aside className="hidden w-44 shrink-0 flex-col border-r border-hair bg-offwhite p-2 sm:flex">
                <div className="flex items-center gap-1.5 rounded-md border border-hair bg-paper px-2 py-1.5 text-[10px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full border border-muted/60" />
                  <span>Search…</span>
                </div>
                <div className="mt-1.5 rounded-md bg-ink px-2 py-1.5 text-center text-[11px] font-medium text-paper">
                  + New chat
                </div>
                <div className="mt-3 px-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-muted/70">
                  Today
                </div>
                <div className="mt-1 space-y-0.5">
                  <div
                    className="rounded px-1.5 py-1 text-[10px] transition-colors"
                    style={{
                      background:
                        solutionP > 0.05
                          ? "rgba(249,115,22,0.15)"
                          : "transparent",
                      color: solutionP > 0.05 ? "rgb(154,52,18)" : "inherit",
                    }}
                  >
                    {solutionP > 0.05 ? "Quadratic equation" : "New chat"}
                  </div>
                  <div className="rounded px-1.5 py-1 text-[10px] text-body">
                    Chain rule check
                  </div>
                  <div className="rounded px-1.5 py-1 text-[10px] text-body">
                    u-sub warm-up
                  </div>
                </div>
                <div className="mt-3 px-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-muted/70">
                  Yesterday
                </div>
                <div className="mt-1 space-y-0.5">
                  <div className="rounded px-1.5 py-1 text-[10px] text-body">
                    Redox half-cells
                  </div>
                  <div className="rounded px-1.5 py-1 text-[10px] text-body">
                    Projectile motion
                  </div>
                </div>
              </aside>

              {/* MAIN CHAT COLUMN */}
              <div className="flex min-w-0 flex-1 flex-col">
                {/* Header bar: title + token usage pill */}
                <div className="flex items-center justify-between border-b border-hair bg-offwhite/60 px-3 py-2 sm:px-4">
                  <div className="truncate font-serif text-[13px] text-ink sm:text-sm">
                    {solutionP > 0.05 ? "Quadratic equation" : "New chat"}
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-hair bg-paper px-2 py-0.5 text-[10px] text-muted">
                    <span className="h-1 w-1 rounded-full bg-orange" />
                    <span className="font-mono text-ink">
                      {Math.round(
                        10000 - lerp(0, 432, solutionP)
                      ).toLocaleString()}
                    </span>
                    <span>/ 10k</span>
                  </div>
                </div>

                {/* Messages area / empty state */}
                <div className="flex-1 overflow-hidden px-4 py-4 sm:px-6">
                  {clickP < 0.45 ? (
                    // Empty state: exactly mirrors the real /chat hero
                    <div
                      className="mx-auto max-w-md text-center"
                      style={{ opacity: remap(story, 0.32, 0.42) }}
                    >
                      <h3 className="mt-4 font-serif text-xl leading-tight text-ink sm:mt-6 sm:text-2xl">
                        What are you stuck on?
                      </h3>
                      <div className="mt-3 text-[8px] font-medium uppercase tracking-[0.14em] text-muted sm:mt-4">
                        Try one of these
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-1.5">
                        <div className="rounded-md border border-hair bg-paper p-2 text-left text-[10px] text-body">
                          <span className="text-muted">→</span> Solve a
                          quadratic
                        </div>
                        <div className="rounded-md border border-hair bg-paper p-2 text-left text-[10px] text-body">
                          <span className="text-muted">→</span> Find dy/dx
                        </div>
                        <div className="rounded-md border border-hair bg-paper p-2 text-left text-[10px] text-body">
                          <span className="text-muted">→</span> Projectile
                          motion
                        </div>
                        <div className="rounded-md border border-hair bg-paper p-2 text-left text-[10px] text-body">
                          <span className="text-muted">→</span> u-substitution
                        </div>
                      </div>
                    </div>
                  ) : (
                    // After send: user bubble, then assistant streams in
                    <div className="space-y-2.5">
                      <div className="ml-auto max-w-[78%] rounded-lg bg-offwhite px-3 py-2 text-[11px] leading-snug text-body sm:text-xs">
                        {PROBLEM}
                      </div>
                      {thinkingP > 0 && solutionP < 0.05 && (
                        <div className="max-w-[40%] border-l-2 border-orange bg-paper px-3 py-2 text-[11px] text-muted">
                          <span className="typing-dots">
                            <span />
                            <span />
                            <span />
                          </span>
                        </div>
                      )}
                      {solutionP > 0.02 && (
                        <div className="max-w-[88%] border-l-2 border-orange bg-paper px-3 py-2 text-[10px] leading-5 text-body sm:text-[11.5px]">
                          <pre
                            className="whitespace-pre-wrap font-sans"
                            style={{ margin: 0 }}
                          >
                            {solution}
                            {showSolutionCaret && (
                              <span className="ml-0.5 inline-block h-[10px] w-[1.5px] animate-pulseSoft bg-orange align-middle" />
                            )}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* COMPOSER: dark rounded pill, identical to the real one */}
                <div className="px-4 pb-3 pt-1 sm:px-6">
                  <div
                    className="flex items-center gap-2 rounded-[24px] border border-white/10 bg-[#1f1f22] px-3 py-2.5 shadow-[0_10px_28px_-12px_rgba(0,0,0,0.45)] transition-shadow"
                    style={{
                      boxShadow:
                        focusIntensity > 0
                          ? `0 12px 36px -12px rgba(194,65,12,${0.25 + focusIntensity * 0.4})`
                          : undefined,
                    }}
                  >
                    {/* Attach button */}
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white/60">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      >
                        <path d="M8 2v12M2 8h12" />
                      </svg>
                    </span>
                    {/* Input text: empty until typing phase, then the problem */}
                    <span className="flex-1 truncate text-[11px] text-white sm:text-xs">
                      {clickP > 0.45 && solutionP < 0.05 ? (
                        <span className="text-white/45">Ask anything…</span>
                      ) : problemTyped ? (
                        <span>{problemTyped}</span>
                      ) : (
                        <span className="text-white/45">Ask anything…</span>
                      )}
                      {showInputCaret && (
                        <span className="ml-0.5 inline-block h-[11px] w-[1.5px] animate-pulseSoft bg-orange align-middle" />
                      )}
                    </span>
                    {/* Send button: orange when typing, glows on click */}
                    <button
                      type="button"
                      tabIndex={-1}
                      className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange text-paper"
                      style={{
                        opacity: problemTyped.length > 4 || clickP > 0 ? 1 : 0.5,
                        transform:
                          clickP > 0 && clickP < 0.4
                            ? "scale(0.9)"
                            : "scale(1)",
                      }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 13V3M3 8l5-5 5 5" />
                      </svg>
                      {clickRipple > 0 && (
                        <span
                          className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-orange"
                          style={{
                            opacity: clickRipple,
                            transform: `scale(${1 + clickRipple * 0.6})`,
                          }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated cursor */}
          <div
            className="pointer-events-none absolute z-20"
            style={{
              left: `calc(${cursor.x + wobble}% )`,
              top: `calc(${cursor.y + wobble}% )`,
              transform: "translate(-6px, -4px)",
              transition:
                "left 70ms linear, top 70ms linear, transform 140ms ease",
            }}
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)]"
            >
              <path
                d="M5 3 L5 20 L9.4 16.2 L11.8 21.5 L14.2 20.4 L11.9 15.3 L17.2 14.6 Z"
                fill="#111"
                stroke="#fff"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
            {/* click pulse ring */}
            {clickRipple > 0 && (
              <span
                className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange"
                style={{
                  opacity: clickRipple * 0.7,
                  transform: `translate(-50%, -50%) scale(${
                    0.5 + clickRipple * 2.2
                  })`,
                }}
              />
            )}
          </div>

          {/* Stage captions that float beside the frame */}
          <StageCaption progress={story} />
        </div>
        </div>

        {/* Progress track */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
          <div className="flex h-1 w-44 overflow-hidden rounded-full bg-hair/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange to-amber-500 transition-[width] duration-75"
              style={{ width: `${story * 100}%` }}
            />
          </div>
          <div className="font-mono text-[10px] tracking-wider text-muted">
            {Math.round(story * 100)
              .toString()
              .padStart(2, "0")}
            %
          </div>
        </div>
      </div>
    </section>
  );
}

function StageCaption({ progress }: { progress: number }) {
  const stages = [
    { from: 0.06, to: 0.18, label: "01 · Open the chat" },
    { from: 0.32, to: 0.46, label: "02 · Pick a starter" },
    { from: 0.46, to: 0.72, label: "03 · Type your question" },
    { from: 0.72, to: 0.82, label: "04 · Send" },
    { from: 0.82, to: 0.98, label: "05 · Read the walkthrough" },
  ];
  const active = stages.findIndex(
    (s) => progress >= s.from && progress <= s.to
  );
  return (
    <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-hair bg-paper/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted backdrop-blur-sm sm:text-xs">
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-pulseSoft rounded-full bg-orange" />
        <span className="relative m-auto h-1 w-1 rounded-full bg-orange" />
      </span>
      <span className="text-ink">
        {active >= 0
          ? stages[active].label
          : progress < 0.06
          ? "00 · Ready"
          : progress > 0.98
          ? "Done."
          : "…"}
      </span>
    </div>
  );
}
