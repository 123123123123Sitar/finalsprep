"use client";
import { useEffect, useRef, useState } from "react";

/**
 * CedCinema
 * Second scroll-pinned cinematic. Two acts:
 *   Act 1 (0.00–0.48): the CED curriculum view — sidebar navigation, unit
 *     header, exam weighting, overview, big-ideas list revealing one by one.
 *   Act 2 (0.52–1.00): the interactive graphing calculator — equation typed
 *     into the expression bar, curve drawing left-to-right, a traveling dot,
 *     and an "area under curve" readout at the end.
 * Same invariant as ScrollCinema: all state is a pure function of scroll
 * progress, so scrolling up rewinds every frame.
 */

const clamp = (n: number, a: number, b: number) =>
  Math.min(b, Math.max(a, n));
const remap = (p: number, a: number, b: number) =>
  clamp((p - a) / (b - a), 0, 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

const URL_ACT_1 = "finalsprep.com/study/ap-calculus-bc/unit-3";
const URL_ACT_2 = "finalsprep.com/study/ap-calculus-bc/tools";

const OVERVIEW =
  "The definite integral accumulates a rate of change over an interval. Differentiation and integration are inverse processes, related by the Fundamental Theorem of Calculus.";

const BIG_IDEAS = [
  "Integrals measure accumulated change; derivatives measure instantaneous rate of change.",
  "The Fundamental Theorem links a function, its derivative, and its integral in one equation.",
  "Approximations (Riemann sums, trapezoidal rule) converge to the true integral as Δx → 0.",
];

const EQUATION = "f(x) = −(x − 6)² + 36";

type Key = { p: number; x: number; y: number };
const CURSOR_PATH: Key[] = [
  { p: 0.0, x: 92, y: 92 },
  { p: 0.05, x: 32, y: 55 },
  { p: 0.12, x: 18, y: 42 }, // Sidebar Unit 3
  { p: 0.22, x: 18, y: 42 },
  { p: 0.30, x: 65, y: 22 }, // Over to content
  { p: 0.46, x: 64, y: 46 }, // Scrolling down big ideas
  { p: 0.54, x: 70, y: 20 }, // Up to "Interactive" tab
  { p: 0.62, x: 70, y: 20 },
  { p: 0.72, x: 52, y: 28 }, // Equation bar
  { p: 0.85, x: 62, y: 55 }, // Over to the curve
  { p: 1.0, x: 78, y: 60 },
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

export default function CedCinema() {
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

  // Middle 92% is the story.
  const story = remap(progress, 0.04, 0.96);

  // Act 1 — CED curriculum view
  const inAct1 = story < 0.52;
  const act1Progress = remap(story, 0, 0.5);

  // URL switches partway through the scene transition
  const showAct2Url = story >= 0.5;
  const url = showAct2Url ? URL_ACT_2 : URL_ACT_1;

  const sidebarReveal = remap(story, 0.02, 0.1);
  const unit3Highlight = remap(story, 0.1, 0.16);
  const unit3ClickFlash =
    remap(story, 0.14, 0.18) * (1 - remap(story, 0.18, 0.22));
  const headerReveal = remap(story, 0.18, 0.26);

  const overviewP = remap(story, 0.22, 0.32);
  const overviewLen = Math.round(overviewP * OVERVIEW.length);
  const overview = OVERVIEW.slice(0, overviewLen);

  // Big ideas reveal, one every ~0.05 starting at 0.32
  const bigIdeasStart = 0.32;
  const bigIdeaStep = 0.04;
  const bigIdeasShown = BIG_IDEAS.map((_, i) =>
    remap(
      story,
      bigIdeasStart + i * bigIdeaStep,
      bigIdeasStart + i * bigIdeaStep + 0.035
    )
  );

  // Tab click transition 0.50 -> 0.58
  const tabSwitch = remap(story, 0.5, 0.58);
  const interactiveOn = tabSwitch > 0;
  const tabClickFlash =
    remap(story, 0.52, 0.56) * (1 - remap(story, 0.56, 0.6));

  // Act 2 — interactive graphing calculator
  const eqP = remap(story, 0.6, 0.72);
  const eqLen = Math.round(eqP * EQUATION.length);
  const equationTyped = EQUATION.slice(0, eqLen);
  const showEqCaret = eqP > 0.02 && eqP < 1;

  // Curve progress (0→1)
  const curveP = remap(story, 0.72, 0.96);
  // Discrete x-range 0..12, vertex at x=6, y=36
  // Map to SVG coords: viewBox 200x120, origin at (20, 100), unit = 15px x, 2px y
  const VB_W = 220;
  const VB_H = 130;
  const OX = 20;
  const OY = 110;
  const UX = 15;
  const UY = 2.4;
  // parametric curve
  const curvePoints: string[] = [];
  const N = 80;
  const curveCutoff = Math.floor(N * curveP);
  for (let i = 0; i <= curveCutoff; i++) {
    const x = (12 * i) / N;
    const y = -(x - 6) * (x - 6) + 36;
    const sx = OX + x * UX;
    const sy = OY - y * UY;
    curvePoints.push(`${sx.toFixed(2)},${sy.toFixed(2)}`);
  }
  const curvePath = curvePoints.join(" ");
  const dotX = OX + 12 * curveP * UX;
  const dotYval = -(12 * curveP - 6) * (12 * curveP - 6) + 36;
  const dotY = OY - dotYval * UY;

  // Area shading 0→full, starting at 0.82
  const areaP = remap(story, 0.82, 0.96);
  // Integral of -(x-6)^2+36 from 0 to 12 = 288
  const areaValue = (288 * areaP).toFixed(1);

  const cursor = cursorAt(story);
  const titleOpacity =
    1 - remap(story, 0, 0.04) * 0.2 - remap(story, 0.94, 1) * 1;

  const wobble = Math.sin(progress * 55) * 0.3;

  return (
    <section
      ref={wrapRef}
      className="relative h-[520vh]"
      aria-label="Animated demo: CED curriculum and interactive tools"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden">
        {/* Cinema background */}
        <div
          className="absolute inset-0 opacity-70"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(249,115,22,0.12), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.12), transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(194,65,12,0.06), transparent 62%)",
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
              "radial-gradient(ellipse at center, black 32%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 32%, transparent 72%)",
          }}
        />

        <div
          className="relative z-10 w-full px-4 pt-[13vh] pb-[2vh] text-center"
          style={{ opacity: titleOpacity }}
        >
          <div className="label">Every unit, every tool</div>
          <h2 className="mt-2 font-serif text-2xl leading-tight text-ink sm:text-4xl">
            The{" "}
            <span className="italic gradient-text">
              {inAct1 ? "College Board CED" : "interactive toolkit"}
            </span>
            , built in.
          </h2>
        </div>

        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center px-4 pb-[8vh]">
        <div
          className="relative h-full w-full overflow-hidden rounded-xl border border-hair bg-paper"
          style={{
            maxWidth: "min(68rem, 94vw)",
            aspectRatio: "16 / 10",
            maxHeight: "100%",
            boxShadow:
              "0 60px 120px -40px rgba(10,10,10,0.45), 0 20px 50px -30px rgba(249,115,22,0.22)",
          }}
        >
          {/* Chrome */}
          <div className="flex items-center gap-2 border-b border-hair bg-offwhite px-3 py-2 sm:px-4 sm:py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <div className="ml-2 flex-1 overflow-hidden rounded-md border border-hair bg-paper px-3 py-1 font-mono text-[11px] text-muted sm:ml-4 sm:text-xs">
              <span className="mr-1.5 text-green-600">●</span>
              <span className="text-ink">{url}</span>
            </div>
            <div className="hidden items-center gap-1 text-[10px] text-muted sm:flex">
              <span className="rounded px-1.5 py-0.5 ring-1 ring-hair">
                ⌘R
              </span>
            </div>
          </div>

          <div className="relative h-[calc(100%-41px)]">
            {/* Top nav */}
            <div className="flex items-center justify-between border-b border-hair bg-paper/90 px-4 py-2.5 sm:px-6 sm:py-3">
              <div className="flex items-center gap-2 font-serif text-base text-ink sm:text-lg">
                <span className="h-4 w-4 rounded bg-gradient-to-br from-orange to-amber-500" />
                finalsprep
                <span className="ml-3 text-[10px] font-normal uppercase tracking-[0.16em] text-muted">
                  AP Calculus BC
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-muted sm:text-xs">
                <span className="hidden sm:inline">Units</span>
                <span className="hidden sm:inline">Tools</span>
                <span className="rounded-md bg-ink px-2.5 py-1 font-medium text-paper">
                  Start Pro
                </span>
              </div>
            </div>

            {/* Grid: sidebar + content */}
            <div className="grid h-[calc(100%-47px)] grid-cols-10">
              {/* Sidebar */}
              <div
                className="col-span-3 overflow-hidden border-r border-hair bg-offwhite/70 px-3 py-3 sm:px-4"
                style={{ opacity: sidebarReveal }}
              >
                <div className="mb-3 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">
                  <span>Units</span>
                  <span className="rounded bg-paper px-1.5 py-0.5 ring-1 ring-hair">
                    8 total
                  </span>
                </div>
                <SidebarUnit n={1} title="Limits and Continuity" done />
                <SidebarUnit n={2} title="Differentiation: Definition" done />
                <SidebarUnit
                  n={3}
                  title="Integration and Accumulation"
                  active
                  highlight={unit3Highlight}
                  clickFlash={unit3ClickFlash}
                />
                <SidebarUnit n={4} title="Differential Equations" />
                <SidebarUnit n={5} title="Applications of Integration" />
                <SidebarUnit n={6} title="Parametric & Polar" />
                <SidebarUnit n={7} title="Infinite Sequences & Series" />
              </div>

              {/* Content column */}
              <div className="col-span-7 flex flex-col overflow-hidden">
                {/* Tabs */}
                <div className="flex gap-1 border-b border-hair bg-paper px-4 sm:px-6">
                  <Tab label="Overview" active={!interactiveOn} />
                  <Tab label="Big ideas" />
                  <Tab
                    label="Interactive"
                    active={interactiveOn}
                    clickFlash={tabClickFlash}
                  />
                  <Tab label="Practice" />
                </div>

                {/* Body */}
                <div className="relative min-h-0 flex-1 overflow-hidden px-4 py-3 sm:px-6 sm:py-4">
                  {/* Act 1 content */}
                  <div
                    className="absolute inset-0 px-4 py-3 sm:px-6 sm:py-4"
                    style={{
                      opacity: 1 - tabSwitch,
                      transform: `translateY(${lerp(0, -14, tabSwitch)}px)`,
                      pointerEvents: interactiveOn ? "none" : "auto",
                    }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-[0.18em] text-muted"
                      style={{ opacity: headerReveal }}
                    >
                      Unit 3 · Exam weight 17–23%
                    </div>
                    <div
                      className="mt-1 font-serif text-[18px] leading-tight text-ink sm:text-[22px]"
                      style={{
                        opacity: headerReveal,
                        transform: `translateY(${lerp(
                          8,
                          0,
                          headerReveal
                        )}px)`,
                      }}
                    >
                      Integration and Accumulation of Change
                    </div>
                    <p
                      className="mt-2 text-[11px] leading-5 text-body sm:text-[13px]"
                      style={{ opacity: overviewP > 0 ? 1 : 0 }}
                    >
                      {overview}
                      {overviewP > 0 && overviewP < 1 && (
                        <span className="ml-0.5 inline-block h-[11px] w-[1.5px] animate-pulseSoft bg-orange align-middle" />
                      )}
                    </p>

                    <div
                      className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink"
                      style={{
                        opacity: remap(story, 0.3, 0.34),
                      }}
                    >
                      Big ideas
                    </div>
                    <ul className="mt-1.5 space-y-1.5 text-[11px] leading-5 text-body sm:text-[12.5px]">
                      {BIG_IDEAS.map((idea, i) => (
                        <li
                          key={i}
                          className="flex gap-2"
                          style={{
                            opacity: bigIdeasShown[i],
                            transform: `translateY(${lerp(
                              10,
                              0,
                              bigIdeasShown[i]
                            )}px)`,
                          }}
                        >
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-orange" />
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Act 2 content — graphing calc */}
                  <div
                    className="absolute inset-0 px-4 py-3 sm:px-6 sm:py-4"
                    style={{
                      opacity: tabSwitch,
                      transform: `translateY(${lerp(14, 0, tabSwitch)}px)`,
                      pointerEvents: interactiveOn ? "auto" : "none",
                    }}
                  >
                    <div className="flex items-center gap-1.5 text-[9px] text-muted sm:text-[10px]">
                      <span className="rounded border border-hair bg-paper px-1.5 py-0.5 text-ink">
                        Graph 2D
                      </span>
                      <span className="rounded border border-hair px-1.5 py-0.5">
                        3D
                      </span>
                      <span className="rounded border border-hair px-1.5 py-0.5">
                        Physics
                      </span>
                      <span className="rounded border border-hair px-1.5 py-0.5">
                        Java / CSP
                      </span>
                      <span className="ml-auto rounded bg-orange-tint px-1.5 py-0.5 text-orange-ink">
                        LIVE
                      </span>
                    </div>

                    {/* Equation bar */}
                    <div
                      className="mt-2 flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[11px] text-ink sm:text-[13px]"
                      style={{
                        borderColor:
                          eqP > 0 && eqP < 1
                            ? "rgb(var(--orange))"
                            : "rgb(var(--hair))",
                        boxShadow:
                          eqP > 0 && eqP < 1
                            ? "0 0 0 3px rgba(194,65,12,0.12)"
                            : "none",
                      }}
                    >
                      <span className="text-muted">y =</span>
                      <span>
                        {equationTyped.replace(/^f\(x\)\s*=\s*/, "")}
                        {showEqCaret && (
                          <span className="ml-0.5 inline-block h-[13px] w-[1.5px] animate-pulseSoft bg-orange align-middle" />
                        )}
                      </span>
                    </div>

                    {/* Graph */}
                    <div className="relative mt-2 h-[58%] w-full overflow-hidden rounded-md border border-hair bg-paper">
                      <svg
                        viewBox={`0 0 ${VB_W} ${VB_H}`}
                        className="h-full w-full"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <pattern
                            id="cedgrid"
                            width="15"
                            height="12"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M15 0H0V12"
                              fill="none"
                              stroke="rgb(var(--hair))"
                              strokeWidth="0.4"
                            />
                          </pattern>
                          <linearGradient
                            id="cedAreaFill"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="rgb(var(--orange))"
                              stopOpacity="0.28"
                            />
                            <stop
                              offset="100%"
                              stopColor="rgb(var(--orange))"
                              stopOpacity="0.02"
                            />
                          </linearGradient>
                        </defs>
                        <rect
                          width={VB_W}
                          height={VB_H}
                          fill="url(#cedgrid)"
                        />
                        {/* Axes */}
                        <line
                          x1={OX}
                          y1={OY}
                          x2={VB_W - 5}
                          y2={OY}
                          stroke="rgb(var(--rule))"
                          strokeWidth="0.8"
                        />
                        <line
                          x1={OX}
                          y1={5}
                          x2={OX}
                          y2={OY + 8}
                          stroke="rgb(var(--rule))"
                          strokeWidth="0.8"
                        />
                        {/* Axis ticks/labels */}
                        {[0, 3, 6, 9, 12].map((n) => (
                          <g key={`xt-${n}`}>
                            <line
                              x1={OX + n * UX}
                              y1={OY - 2}
                              x2={OX + n * UX}
                              y2={OY + 2}
                              stroke="rgb(var(--rule))"
                              strokeWidth="0.6"
                            />
                            <text
                              x={OX + n * UX}
                              y={OY + 8}
                              fontSize="5"
                              fill="rgb(var(--muted))"
                              textAnchor="middle"
                            >
                              {n}
                            </text>
                          </g>
                        ))}
                        {[10, 20, 30].map((n) => (
                          <text
                            key={`yt-${n}`}
                            x={OX - 4}
                            y={OY - n * UY + 2}
                            fontSize="5"
                            fill="rgb(var(--muted))"
                            textAnchor="end"
                          >
                            {n}
                          </text>
                        ))}

                        {/* Area shading */}
                        {areaP > 0 && curvePath && (
                          <polygon
                            points={`${OX},${OY} ${curvePath} ${
                              OX + 12 * curveP * UX
                            },${OY}`}
                            fill="url(#cedAreaFill)"
                            opacity={areaP}
                          />
                        )}
                        {/* Curve */}
                        {curvePath && (
                          <polyline
                            points={curvePath}
                            fill="none"
                            stroke="rgb(var(--orange))"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                        {/* Traveling dot */}
                        {curveP > 0 && curveP < 1 && (
                          <g>
                            <circle
                              cx={dotX}
                              cy={dotY}
                              r="3.2"
                              fill="rgb(var(--orange))"
                              opacity="0.22"
                            />
                            <circle
                              cx={dotX}
                              cy={dotY}
                              r="1.6"
                              fill="rgb(var(--orange))"
                            />
                          </g>
                        )}
                        {/* End label */}
                        {curveP >= 0.4 && (
                          <text
                            x={OX + 6 * UX}
                            y={OY - 36 * UY - 4}
                            fontSize="5"
                            fill="rgb(var(--ink))"
                            textAnchor="middle"
                          >
                            max (6, 36)
                          </text>
                        )}
                      </svg>

                      {/* Area readout chip */}
                      {areaP > 0 && (
                        <div
                          className="absolute right-2 top-2 rounded-md border border-orange/40 bg-orange-tint px-2 py-1 font-mono text-[9px] text-orange-ink sm:text-[10px]"
                          style={{ opacity: areaP }}
                        >
                          ∫₀¹² f(x) dx ≈{" "}
                          <span className="font-semibold">{areaValue}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[9px] text-muted sm:text-[10px]">
                      <span>
                        Drag sliders or edit the equation — 2D, 3D, physics
                        sims and a code sandbox are one click away.
                      </span>
                      <span className="rounded bg-offwhite px-1.5 py-0.5 font-mono text-ink">
                        ⌘K
                      </span>
                    </div>
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
            {(unit3ClickFlash > 0 || tabClickFlash > 0) && (
              <span
                className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange"
                style={{
                  opacity:
                    Math.max(unit3ClickFlash, tabClickFlash) * 0.7,
                  transform: `translate(-50%, -50%) scale(${
                    0.5 +
                    Math.max(unit3ClickFlash, tabClickFlash) * 2.2
                  })`,
                }}
              />
            )}
          </div>

          {/* Stage caption */}
          <CedStageCaption progress={story} />
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

function SidebarUnit({
  n,
  title,
  done,
  active,
  highlight = 0,
  clickFlash = 0,
}: {
  n: number;
  title: string;
  done?: boolean;
  active?: boolean;
  highlight?: number;
  clickFlash?: number;
}) {
  const bg = active
    ? `rgba(194,65,12,${0.08 + highlight * 0.12})`
    : highlight > 0
    ? `rgba(194,65,12,${highlight * 0.08})`
    : "transparent";
  return (
    <div
      className="relative mb-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] transition-colors sm:text-[11px]"
      style={{
        background: bg,
        borderLeft: active
          ? "2px solid rgb(var(--orange))"
          : "2px solid transparent",
      }}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-semibold ${
          done
            ? "bg-green-100 text-green-700"
            : active
            ? "bg-orange text-white"
            : "bg-paper text-muted ring-1 ring-hair"
        }`}
      >
        {done ? "✓" : n}
      </span>
      <span
        className={`truncate ${
          active ? "text-ink font-medium" : "text-body"
        }`}
      >
        {title}
      </span>
      {clickFlash > 0 && (
        <span
          className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-orange"
          style={{
            opacity: clickFlash,
            transform: `scale(${1 + clickFlash * 0.08})`,
          }}
        />
      )}
    </div>
  );
}

function Tab({
  label,
  active,
  clickFlash = 0,
}: {
  label: string;
  active?: boolean;
  clickFlash?: number;
}) {
  return (
    <div
      className={`relative -mb-px border-b-2 px-3 py-2 text-[10px] font-medium sm:text-[11px] ${
        active
          ? "border-orange text-ink"
          : "border-transparent text-muted"
      }`}
    >
      {label}
      {clickFlash > 0 && (
        <span
          className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-orange"
          style={{
            opacity: clickFlash,
            transform: `scale(${1 + clickFlash * 0.1})`,
          }}
        />
      )}
    </div>
  );
}

function CedStageCaption({ progress }: { progress: number }) {
  const stages = [
    { from: 0.04, to: 0.12, label: "01 · Open Unit 3" },
    { from: 0.18, to: 0.34, label: "02 · Read the exam weighting" },
    { from: 0.34, to: 0.5, label: "03 · Big ideas, one by one" },
    { from: 0.5, to: 0.6, label: "04 · Switch to Interactive" },
    { from: 0.6, to: 0.74, label: "05 · Enter an equation" },
    { from: 0.74, to: 0.98, label: "06 · Graph + area under curve" },
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
          : progress < 0.04
          ? "00 · Loading"
          : progress > 0.98
          ? "Done."
          : "…"}
      </span>
    </div>
  );
}
