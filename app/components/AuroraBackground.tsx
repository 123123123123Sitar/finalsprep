"use client";

/**
 * AuroraBackground
 * Low-cost animated aurora/mesh gradient. Pure CSS — no canvas, no JS loop.
 * Sits behind hero content; pointer-events disabled. Respects dark themes
 * via var-driven opacity.
 */
export default function AuroraBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <div className="aurora-noise" />
    </div>
  );
}
