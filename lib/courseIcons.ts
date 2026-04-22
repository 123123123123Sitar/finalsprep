import type { CourseSlug, CourseCategory } from "@/lib/topics";

/**
 * Per-course visual identity - background tint used under the SVG glyph so
 * each subject reads at a glance. The actual SVG art lives in
 * app/components/CourseIcon.tsx so it can inline currentColor.
 */
export type CourseIconSpec = {
  /** Tailwind class pair: background tint + ink color for the badge. */
  bg: string;
  /** Tailwind ring/border class for outlined treatments. */
  ring: string;
};

const CATEGORY_FALLBACK: Record<CourseCategory, CourseIconSpec> = {
  math: { bg: "bg-indigo-100 text-indigo-700", ring: "ring-indigo-200" },
  science: { bg: "bg-emerald-100 text-emerald-700", ring: "ring-emerald-200" },
  cs: { bg: "bg-violet-100 text-violet-700", ring: "ring-violet-200" },
  history: { bg: "bg-amber-100 text-amber-800", ring: "ring-amber-200" },
};

const COURSE_COLORS: Record<CourseSlug, CourseIconSpec> = {
  "ap-precalc": { bg: "bg-indigo-100 text-indigo-700", ring: "ring-indigo-200" },
  "ap-calc-ab": { bg: "bg-blue-100 text-blue-700", ring: "ring-blue-200" },
  "ap-calc-bc": { bg: "bg-sky-100 text-sky-700", ring: "ring-sky-200" },
  "ap-statistics": { bg: "bg-cyan-100 text-cyan-700", ring: "ring-cyan-200" },

  "ap-physics-1": { bg: "bg-emerald-100 text-emerald-700", ring: "ring-emerald-200" },
  "ap-physics-2": { bg: "bg-teal-100 text-teal-700", ring: "ring-teal-200" },
  "ap-physics-c-mech": { bg: "bg-slate-200 text-slate-700", ring: "ring-slate-300" },
  "ap-physics-c-em": { bg: "bg-rose-100 text-rose-700", ring: "ring-rose-200" },
  "ap-biology": { bg: "bg-green-100 text-green-700", ring: "ring-green-200" },
  "ap-chemistry": { bg: "bg-lime-100 text-lime-800", ring: "ring-lime-200" },
  "ap-environmental": { bg: "bg-emerald-100 text-emerald-800", ring: "ring-emerald-200" },

  "ap-cs-a": { bg: "bg-violet-100 text-violet-700", ring: "ring-violet-200" },
  "ap-cs-principles": { bg: "bg-purple-100 text-purple-700", ring: "ring-purple-200" },

  "ap-us-history": { bg: "bg-amber-100 text-amber-800", ring: "ring-amber-200" },
  "ap-world-history": { bg: "bg-yellow-100 text-yellow-800", ring: "ring-yellow-200" },
  "ap-euro-history": { bg: "bg-orange-100 text-orange-800", ring: "ring-orange-200" },
};

export function courseColors(slug: string, category?: CourseCategory): CourseIconSpec {
  if (slug in COURSE_COLORS) return COURSE_COLORS[slug as CourseSlug];
  if (category && category in CATEGORY_FALLBACK) return CATEGORY_FALLBACK[category];
  return { bg: "bg-offwhite text-body", ring: "ring-hair" };
}
