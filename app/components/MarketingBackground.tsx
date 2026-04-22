"use client";
import { useEffect, useRef, useState } from "react";

/**
 * MarketingBackground
 * Page-wide continuous animated backdrop for the marketing home page.
 *
 * The existing AuroraBackground only covers the hero. This extends the
 * aesthetic through every section below — three slow-drifting orbs, a faint
 * grid, and a gradient wash whose hue/opacity shifts as the visitor scrolls.
 * All CSS-only; no canvas, no RAF inside the render loop. One scroll listener
 * updates a CSS custom property for the scroll-linked gradient shift.
 *
 * Also renders a 2px-tall progress bar pinned to the top of the viewport that
 * fills as the user scrolls — a subtle scroll cue that ties the whole page
 * together.
 *
 * Pointer-events: none. Sits behind content (z-0). Respects
 * prefers-reduced-motion by freezing drift animations.
 */
export default function MarketingBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement;
        const denom = h.scrollHeight - window.innerHeight;
        const p = denom > 0 ? Math.min(1, Math.max(0, window.scrollY / denom)) : 0;
        root.style.setProperty("--scroll-progress", p.toFixed(4));
        setProgress(p);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Page-wide continuous backdrop */}
      <div
        ref={rootRef}
        aria-hidden
        className="mp-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="mp-wash" />
        <div className="mp-orb mp-orb-1" />
        <div className="mp-orb mp-orb-2" />
        <div className="mp-orb mp-orb-3" />
        <div className="mp-orb mp-orb-4" />
        <div className="mp-grid" />
        <div className="mp-vignette" />
      </div>

      {/* Scroll progress bar — sits above the sticky SiteNav (z-50) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
      >
        <div
          className="h-full origin-left bg-gradient-to-r from-orange via-amber-500 to-orange transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <style>{`
        /* ---- page-wide gradient wash that shifts as you scroll ---- */
        .mp-bg {
          --scroll-progress: 0;
          background:
            radial-gradient(
              1200px 800px at 18% calc(12% + (var(--scroll-progress) * 30%)),
              rgba(249, 115, 22, 0.10),
              transparent 60%
            ),
            radial-gradient(
              1000px 700px at 85% calc(30% + (var(--scroll-progress) * -18%)),
              rgba(245, 158, 11, 0.08),
              transparent 60%
            ),
            radial-gradient(
              1100px 900px at 50% calc(85% + (var(--scroll-progress) * -30%)),
              rgba(251, 146, 60, 0.07),
              transparent 60%
            );
          transition: background 0.1s linear;
        }
        [data-theme="dark"] .mp-bg {
          background:
            radial-gradient(
              1200px 800px at 18% calc(12% + (var(--scroll-progress) * 30%)),
              rgba(249, 115, 22, 0.18),
              transparent 60%
            ),
            radial-gradient(
              1000px 700px at 85% calc(30% + (var(--scroll-progress) * -18%)),
              rgba(245, 158, 11, 0.14),
              transparent 60%
            ),
            radial-gradient(
              1100px 900px at 50% calc(85% + (var(--scroll-progress) * -30%)),
              rgba(251, 146, 60, 0.12),
              transparent 60%
            );
        }

        .mp-wash {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(249, 115, 22, 0.015) 25%,
            transparent 50%,
            rgba(245, 158, 11, 0.020) 75%,
            transparent 100%
          );
          opacity: 0.9;
        }

        /* ---- drifting orbs ---- */
        .mp-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
          opacity: 0.55;
          mix-blend-mode: multiply;
          will-change: transform;
        }
        [data-theme="dark"] .mp-orb {
          mix-blend-mode: screen;
          opacity: 0.75;
          filter: blur(120px);
        }
        .mp-orb-1 {
          top: 10%; left: -10%;
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(249,115,22,0.42), transparent 65%);
          animation: mpOrbDrift1 42s ease-in-out infinite;
        }
        .mp-orb-2 {
          top: 35%; right: -8%;
          width: 620px; height: 620px;
          background: radial-gradient(circle, rgba(245,158,11,0.38), transparent 65%);
          animation: mpOrbDrift2 52s ease-in-out infinite;
        }
        .mp-orb-3 {
          top: 65%; left: 20%;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(251,146,60,0.36), transparent 65%);
          animation: mpOrbDrift3 62s ease-in-out infinite;
        }
        .mp-orb-4 {
          top: 88%; right: 15%;
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(249,115,22,0.32), transparent 65%);
          animation: mpOrbDrift4 48s ease-in-out infinite;
        }

        @keyframes mpOrbDrift1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(80px, 40px, 0) scale(1.08); }
          66% { transform: translate3d(-50px, 60px, 0) scale(0.95); }
        }
        @keyframes mpOrbDrift2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-100px, 80px, 0) scale(1.12); }
        }
        @keyframes mpOrbDrift3 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          40% { transform: translate3d(60px, -50px, 0) scale(0.92); }
          70% { transform: translate3d(-40px, 40px, 0) scale(1.06); }
        }
        @keyframes mpOrbDrift4 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(70px, -60px, 0) scale(1.1); }
        }

        /* ---- subtle dotted grid ---- */
        .mp-grid {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(currentColor 0.8px, transparent 0.8px);
          background-size: 34px 34px;
          opacity: 0.035;
          color: rgb(var(--ink));
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
        }

        /* ---- edge vignette so content feels "on" the page ---- */
        .mp-vignette {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(var(--paper), 0.55) 0%, transparent 8%, transparent 92%, rgba(var(--paper), 0.55) 100%);
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .mp-orb { animation: none !important; }
        }
      `}</style>
    </>
  );
}
