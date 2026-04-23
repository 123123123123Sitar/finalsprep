/**
 * Official College Board AP exam formats (2024-25 / 2025-26 administration).
 *
 * Source of truth for practice-test defaults: how many MCQs, how many FRQs,
 * how long each section is, and any reading period. Values verified against
 * apcentral.collegeboard.org and current CEDs. When the UI lets a student
 * override question counts or timing, these are the defaults we fall back to
 * so a "leave it alone" test mirrors the real exam.
 */
import type { CourseSlug } from "@/lib/topics";

export type FrqPartSpec = {
  /** Human-readable label, e.g. "Part A (graphing calculator)" or "SAQs". */
  label: string;
  /** Number of questions in this part. */
  count: number;
  /** Total minutes allotted to this part (sum across all questions in it). */
  minutes: number;
};

export type SectionSpec = {
  count: number;
  minutes: number;
};

export type ApExamSpec = {
  slug: CourseSlug;
  title: string;
  mcq: SectionSpec & { secondsPerQuestion: number };
  frq: SectionSpec & { parts: FrqPartSpec[] };
  /** Mandatory reading period counted inside the FRQ section (e.g. APUSH DBQ). */
  readingPeriodMinutes: number;
  notes: string;
};

export const AP_EXAM_SPECS: Record<CourseSlug, ApExamSpec> = {
  "ap-precalc": {
    slug: "ap-precalc",
    title: "AP Precalculus",
    mcq: { count: 40, minutes: 120, secondsPerQuestion: 180 },
    frq: {
      count: 4,
      minutes: 60,
      parts: [
        { label: "Part A (graphing calculator)", count: 2, minutes: 30 },
        { label: "Part B (no calculator)", count: 2, minutes: 30 },
      ],
    },
    readingPeriodMinutes: 0,
    notes:
      "MCQ Part A (28 Qs, 80 min, no calc) + Part B (12 Qs, 40 min, calc).",
  },
  "ap-calc-ab": {
    slug: "ap-calc-ab",
    title: "AP Calculus AB",
    mcq: { count: 45, minutes: 105, secondsPerQuestion: 140 },
    frq: {
      count: 6,
      minutes: 90,
      parts: [
        { label: "Part A (graphing calculator)", count: 2, minutes: 30 },
        { label: "Part B (no calculator)", count: 4, minutes: 60 },
      ],
    },
    readingPeriodMinutes: 0,
    notes:
      "MCQ Part A 30 Qs/60 min no calc; Part B 15 Qs/45 min calc.",
  },
  "ap-calc-bc": {
    slug: "ap-calc-bc",
    title: "AP Calculus BC",
    mcq: { count: 45, minutes: 105, secondsPerQuestion: 140 },
    frq: {
      count: 6,
      minutes: 90,
      parts: [
        { label: "Part A (graphing calculator)", count: 2, minutes: 30 },
        { label: "Part B (no calculator)", count: 4, minutes: 60 },
      ],
    },
    readingPeriodMinutes: 0,
    notes: "Same structural timing as AB.",
  },
  "ap-statistics": {
    slug: "ap-statistics",
    title: "AP Statistics",
    mcq: { count: 40, minutes: 90, secondsPerQuestion: 135 },
    frq: {
      count: 6,
      minutes: 90,
      parts: [
        { label: "Short FRQs", count: 5, minutes: 65 },
        { label: "Investigative Task", count: 1, minutes: 25 },
      ],
    },
    readingPeriodMinutes: 0,
    notes:
      "CB suggests ~13 min per short FRQ and ~25 min for the Investigative Task.",
  },
  "ap-physics-1": {
    slug: "ap-physics-1",
    title: "AP Physics 1: Algebra-Based",
    mcq: { count: 50, minutes: 80, secondsPerQuestion: 96 },
    frq: {
      count: 4,
      minutes: 100,
      parts: [
        {
          label:
            "Task types: Mathematical Routines, Translation, Experimental Design, Qual-Quant",
          count: 4,
          minutes: 100,
        },
      ],
    },
    readingPeriodMinutes: 0,
    notes:
      "Redesigned 2024-25: 50 MCQ/80 min + 4 FRQ/100 min with defined task types.",
  },
  "ap-physics-2": {
    slug: "ap-physics-2",
    title: "AP Physics 2: Algebra-Based",
    mcq: { count: 50, minutes: 80, secondsPerQuestion: 96 },
    frq: {
      count: 4,
      minutes: 100,
      parts: [{ label: "Four defined task types", count: 4, minutes: 100 }],
    },
    readingPeriodMinutes: 0,
    notes: "Matches redesigned Physics 1 structure (2024-25+).",
  },
  "ap-physics-c-mech": {
    slug: "ap-physics-c-mech",
    title: "AP Physics C: Mechanics",
    mcq: { count: 40, minutes: 80, secondsPerQuestion: 120 },
    frq: {
      count: 4,
      minutes: 100,
      parts: [{ label: "Free-response", count: 4, minutes: 100 }],
    },
    readingPeriodMinutes: 0,
    notes:
      "Updated to 40 MCQ/80 min and 4 FRQ/100 min starting 2024-25.",
  },
  "ap-physics-c-em": {
    slug: "ap-physics-c-em",
    title: "AP Physics C: Electricity and Magnetism",
    mcq: { count: 40, minutes: 80, secondsPerQuestion: 120 },
    frq: {
      count: 4,
      minutes: 100,
      parts: [{ label: "Free-response", count: 4, minutes: 100 }],
    },
    readingPeriodMinutes: 0,
    notes: "Same updated structure as Physics C: Mech for 2024-25+.",
  },
  "ap-biology": {
    slug: "ap-biology",
    title: "AP Biology",
    mcq: { count: 60, minutes: 90, secondsPerQuestion: 90 },
    frq: {
      count: 6,
      minutes: 90,
      parts: [
        { label: "Long FRQs (Interpret Experiment; Scientific Investigation)", count: 2, minutes: 40 },
        { label: "Short FRQs", count: 4, minutes: 50 },
      ],
    },
    readingPeriodMinutes: 0,
    notes:
      "~20 min per long FRQ and ~12-13 min per short FRQ.",
  },
  "ap-chemistry": {
    slug: "ap-chemistry",
    title: "AP Chemistry",
    mcq: { count: 60, minutes: 90, secondsPerQuestion: 90 },
    frq: {
      count: 7,
      minutes: 105,
      parts: [
        { label: "Long FRQs", count: 3, minutes: 60 },
        { label: "Short FRQs", count: 4, minutes: 45 },
      ],
    },
    readingPeriodMinutes: 0,
    notes: "~20 min per long FRQ, ~9 min per short FRQ.",
  },
  "ap-environmental": {
    slug: "ap-environmental",
    title: "AP Environmental Science",
    mcq: { count: 80, minutes: 90, secondsPerQuestion: 68 },
    frq: {
      count: 3,
      minutes: 70,
      parts: [
        {
          label:
            "FRQs (design investigation; analyze + calculations; analyze + data)",
          count: 3,
          minutes: 70,
        },
      ],
    },
    readingPeriodMinutes: 0,
    notes:
      "No per-FRQ time officially published; ~23 min each is typical.",
  },
  "ap-cs-a": {
    slug: "ap-cs-a",
    title: "AP Computer Science A",
    mcq: { count: 40, minutes: 90, secondsPerQuestion: 135 },
    frq: {
      count: 4,
      minutes: 100,
      parts: [
        {
          label:
            "Methods & Control Structures; Class; Array/ArrayList; 2D Array",
          count: 4,
          minutes: 100,
        },
      ],
    },
    readingPeriodMinutes: 0,
    notes: "Updated 2024-25: 40 MCQ/90 min and 4 FRQ/100 min.",
  },
  "ap-cs-principles": {
    slug: "ap-cs-principles",
    title: "AP Computer Science Principles",
    mcq: { count: 70, minutes: 120, secondsPerQuestion: 103 },
    frq: { count: 0, minutes: 0, parts: [] },
    readingPeriodMinutes: 0,
    notes:
      "End-of-course exam is MCQ-only (70 Qs / 2 hr). The Create Performance Task is submitted separately and is not part of exam-day timing.",
  },
  "ap-us-history": {
    slug: "ap-us-history",
    title: "AP U.S. History",
    mcq: { count: 55, minutes: 55, secondsPerQuestion: 60 },
    frq: {
      count: 5,
      minutes: 100,
      parts: [
        { label: "Short-Answer Questions (SAQs)", count: 3, minutes: 40 },
        { label: "Document-Based Question (DBQ, incl. 15-min reading)", count: 1, minutes: 60 },
        { label: "Long Essay Question (LEQ)", count: 1, minutes: 40 },
      ],
    },
    readingPeriodMinutes: 15,
    notes:
      "DBQ 60 min total includes a mandatory 15-min reading period.",
  },
  "ap-world-history": {
    slug: "ap-world-history",
    title: "AP World History: Modern",
    mcq: { count: 55, minutes: 55, secondsPerQuestion: 60 },
    frq: {
      count: 5,
      minutes: 100,
      parts: [
        { label: "SAQs", count: 3, minutes: 40 },
        { label: "DBQ (incl. 15-min reading)", count: 1, minutes: 60 },
        { label: "LEQ", count: 1, minutes: 40 },
      ],
    },
    readingPeriodMinutes: 15,
    notes: "Same structural timing as APUSH.",
  },
  "ap-euro-history": {
    slug: "ap-euro-history",
    title: "AP European History",
    mcq: { count: 55, minutes: 55, secondsPerQuestion: 60 },
    frq: {
      count: 5,
      minutes: 100,
      parts: [
        { label: "SAQs", count: 3, minutes: 40 },
        { label: "DBQ (incl. 15-min reading)", count: 1, minutes: 60 },
        { label: "LEQ", count: 1, minutes: 40 },
      ],
    },
    readingPeriodMinutes: 15,
    notes: "Same structural timing as APUSH/AP World.",
  },
};

export function getExamSpec(slug: CourseSlug): ApExamSpec {
  return AP_EXAM_SPECS[slug];
}

/**
 * Total exam time in minutes if a student takes the full official exam
 * (MCQ section + FRQ section). Used as the default timer when the student
 * doesn't pick a custom value.
 */
export function totalExamMinutes(slug: CourseSlug): number {
  const s = AP_EXAM_SPECS[slug];
  return s.mcq.minutes + s.frq.minutes;
}

/**
 * Scaled timer (minutes) for a practice session with a custom question mix.
 * Scales MCQ + FRQ sections independently at the real per-question pace,
 * rounded up to the nearest minute. Minimum of 1 min when any questions exist.
 */
export function scaledTimerMinutes(
  slug: CourseSlug,
  mcqCount: number,
  frqCount: number
): number {
  const s = AP_EXAM_SPECS[slug];
  const mcqSeconds =
    s.mcq.count > 0 ? (s.mcq.minutes * 60 * mcqCount) / s.mcq.count : 0;
  const frqMinutes =
    s.frq.count > 0 ? (s.frq.minutes * frqCount) / s.frq.count : 0;
  const total = mcqSeconds / 60 + frqMinutes;
  if (mcqCount + frqCount === 0) return 0;
  return Math.max(1, Math.ceil(total));
}
