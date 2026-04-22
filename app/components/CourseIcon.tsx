import type { SVGProps } from "react";
import { courseColors } from "@/lib/courseIcons";
import type { CourseCategory, CourseSlug } from "@/lib/topics";

type Size = "xs" | "sm" | "md" | "lg";

const SIZE_CLS: Record<Size, string> = {
  xs: "h-5 w-5 rounded-full ring-1",
  sm: "h-7 w-7 rounded-full ring-1",
  md: "h-10 w-10 rounded-full ring-2",
  lg: "h-14 w-14 rounded-full ring-2",
};

const SVG_PAD: Record<Size, string> = {
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

/**
 * Rounded-square course badge: tinted background + hand-drawn SVG glyph
 * that inherits `currentColor` from the tint's text color. Used everywhere
 * a course is referenced so subjects become recognizable by color + shape.
 */
export default function CourseIcon({
  slug,
  category,
  size = "md",
  className,
}: {
  slug: string;
  category?: CourseCategory;
  size?: Size;
  className?: string;
}) {
  const colors = courseColors(slug, category);
  const Glyph = GLYPHS[slug as CourseSlug] ?? DefaultGlyph;
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center ${colors.bg} ${colors.ring} ${SIZE_CLS[size]} ${className || ""}`}
    >
      <Glyph className={SVG_PAD[size]} />
    </span>
  );
}

// --- SVG glyphs -----------------------------------------------------------
// Each icon is a 24×24 viewBox. Strokes use `currentColor` so the tint's
// text color bleeds into the art.

type GlyphProps = SVGProps<SVGSVGElement>;

const SVG_DEFAULTS: GlyphProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Precalc(p: GlyphProps) {
  // right triangle with angle arc: geometry vibe
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M4 19 L20 19 L4 7 Z" />
      <path d="M8.5 19 a 3.5 3.5 0 0 0 2 -3" />
    </svg>
  );
}

function CalcAB(p: GlyphProps) {
  // stylized ∫ with dx tick
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M16 5 c -3 0 -3 2 -3 5 v 4 c 0 3 -2 5 -5 5" />
    </svg>
  );
}

function CalcBC(p: GlyphProps) {
  // uppercase sigma Σ
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M17 5 H 7 L 12 12 L 7 19 H 17" />
    </svg>
  );
}

function Statistics(p: GlyphProps) {
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M4 20 H 20" />
      <rect x="5.5" y="13" width="3" height="6" />
      <rect x="10.5" y="9" width="3" height="10" />
      <rect x="15.5" y="5" width="3" height="14" />
    </svg>
  );
}

function Physics1(p: GlyphProps) {
  // ball with dashed trajectory arc
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <circle cx="6" cy="17.5" r="2" />
      <path d="M5.5 15.7 Q 12 5 19.5 11" strokeDasharray="1 2.25" />
      <circle cx="19.5" cy="11" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Physics2(p: GlyphProps) {
  // lightning bolt
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M13 3 L 6 13 H 11 L 10 21 L 18 10 H 13 L 14 3 Z" />
    </svg>
  );
}

function PhysicsCMech(p: GlyphProps) {
  // gear: 8 pegs + center circle
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3 V 6 M 12 18 V 21 M 3 12 H 6 M 18 12 H 21 M 5.6 5.6 L 7.7 7.7 M 16.3 16.3 L 18.4 18.4 M 18.4 5.6 L 16.3 7.7 M 7.7 16.3 L 5.6 18.4" />
    </svg>
  );
}

function PhysicsCEM(p: GlyphProps) {
  // horseshoe magnet (outer U + inner U = pole openings)
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M6 6 V 13 a 6 6 0 0 0 12 0 V 6" />
      <path d="M6 6 H 9.5 V 13 a 2.5 2.5 0 0 0 5 0 V 6 H 18" />
      <path d="M6 6 V 4 M 9.5 6 V 4 M 14.5 6 V 4 M 18 6 V 4" />
    </svg>
  );
}

function Biology(p: GlyphProps) {
  // DNA double helix + rungs
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M8 4 C 8 8 16 10 16 14 C 16 18 8 20 8 20" />
      <path d="M16 4 C 16 8 8 10 8 14 C 8 18 16 20 16 20" />
      <path d="M9.5 6.5 H 14.5 M 8.5 11.5 H 15.5 M 8.5 15 H 15.5 M 9.5 18 H 14.5" strokeWidth="1.25" />
    </svg>
  );
}

function Chemistry(p: GlyphProps) {
  // erlenmeyer flask with bubbles
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M9 3 H 15" />
      <path d="M10 3 V 9.5 L 5.5 18.5 a 1.2 1.2 0 0 0 1.1 1.75 H 17.4 a 1.2 1.2 0 0 0 1.1 -1.75 L 14 9.5 V 3" />
      <circle cx="10" cy="16" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="13" cy="14" r="0.55" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Environmental(p: GlyphProps) {
  // leaf with midrib
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M5 19 C 5 10 10 5 19 5 C 19 14 14 19 5 19 Z" />
      <path d="M5 19 L 15 9" />
    </svg>
  );
}

function CSA(p: GlyphProps) {
  // coffee mug (Java)
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M5 9 H 16 V 16 a 3 3 0 0 1 -3 3 H 8 a 3 3 0 0 1 -3 -3 V 9 Z" />
      <path d="M16 11 H 18.5 a 2 2 0 0 1 0 4 H 16" />
      <path d="M8.5 3 c 0 1.5 -1 2 -1 3.5 M 11.5 3 c 0 1.5 -1 2 -1 3.5" />
    </svg>
  );
}

function CSPrinciples(p: GlyphProps) {
  // </> angle brackets + slash
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M9 7 L 4 12 L 9 17" />
      <path d="M15 7 L 20 12 L 15 17" />
      <path d="M14 5 L 10 19" />
    </svg>
  );
}

function USHistory(p: GlyphProps) {
  // five-pointed star
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M12 3 L 14.5 9 L 21 9.5 L 16 13.7 L 17.6 20 L 12 16.5 L 6.4 20 L 8 13.7 L 3 9.5 L 9.5 9 Z" />
    </svg>
  );
}

function WorldHistory(p: GlyphProps) {
  // globe
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12 H 20" />
      <path d="M12 4 C 8 8 8 16 12 20" />
      <path d="M12 4 C 16 8 16 16 12 20" />
    </svg>
  );
}

function EuroHistory(p: GlyphProps) {
  // castle / crenellated keep
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <path d="M4 20 H 20 V 10 L 17 11.5 V 7 L 14 8.5 V 5 L 10 8.5 V 7 L 7 11.5 V 10 L 4 10 Z" />
      <path d="M10 20 V 14.5 H 14 V 20" />
    </svg>
  );
}

function DefaultGlyph(p: GlyphProps) {
  return (
    <svg {...SVG_DEFAULTS} {...p}>
      <rect x="5" y="4" width="14" height="16" rx="1.5" />
      <path d="M8 8 H 16 M 8 12 H 16 M 8 16 H 13" />
    </svg>
  );
}

const GLYPHS: Record<CourseSlug, (p: GlyphProps) => JSX.Element> = {
  "ap-precalc": Precalc,
  "ap-calc-ab": CalcAB,
  "ap-calc-bc": CalcBC,
  "ap-statistics": Statistics,
  "ap-physics-1": Physics1,
  "ap-physics-2": Physics2,
  "ap-physics-c-mech": PhysicsCMech,
  "ap-physics-c-em": PhysicsCEM,
  "ap-biology": Biology,
  "ap-chemistry": Chemistry,
  "ap-environmental": Environmental,
  "ap-cs-a": CSA,
  "ap-cs-principles": CSPrinciples,
  "ap-us-history": USHistory,
  "ap-world-history": WorldHistory,
  "ap-euro-history": EuroHistory,
};
