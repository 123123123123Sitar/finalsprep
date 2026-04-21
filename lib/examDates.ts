import { type CourseSlug } from "./topics";

// 2026 AP exam dates sourced from the College Board schedule. Stored as
// local-time ISO dates because the College Board publishes each slot in the
// student's local time, and we only need day-level granularity for the
// "days until exam" countdown on the dashboard.
export const AP_EXAM_DATES: Record<CourseSlug, string> = {
  "ap-biology": "2026-05-04",
  "ap-euro-history": "2026-05-04",
  "ap-chemistry": "2026-05-05",
  "ap-physics-1": "2026-05-06",
  "ap-physics-2": "2026-05-07",
  "ap-world-history": "2026-05-07",
  "ap-statistics": "2026-05-07",
  "ap-us-history": "2026-05-08",
  "ap-calc-ab": "2026-05-11",
  "ap-calc-bc": "2026-05-11",
  "ap-precalc": "2026-05-12",
  "ap-physics-c-mech": "2026-05-13",
  "ap-cs-principles": "2026-05-14",
  "ap-physics-c-em": "2026-05-14",
  "ap-environmental": "2026-05-15",
  "ap-cs-a": "2026-05-15",
};

// Whole days between today (local midnight) and the exam date.
// Negative = exam is in the past.
export function daysUntilExam(
  slug: CourseSlug,
  now: Date = new Date()
): number | null {
  const iso = AP_EXAM_DATES[slug];
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const exam = new Date(y, m - 1, d).getTime();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
  return Math.round((exam - today) / (1000 * 60 * 60 * 24));
}

export function examCountdownLabel(
  slug: CourseSlug,
  now: Date = new Date()
): string | null {
  const days = daysUntilExam(slug, now);
  if (days === null) return null;
  if (days < 0) return "Exam passed";
  if (days === 0) return "Exam today";
  if (days === 1) return "1 day until exam";
  return `${days} days until exam`;
}

/** First scheduled AP exam of the season (8am local on the earliest date in
 *  AP_EXAM_DATES). Used by the marketing-page countdown. */
export function firstApExamDate(): Date {
  const earliestIso = Object.values(AP_EXAM_DATES).sort()[0];
  const [y, m, d] = earliestIso.split("-").map(Number);
  // College Board exams start at 8:00 local time on the scheduled date.
  return new Date(y, m - 1, d, 8, 0, 0, 0);
}
