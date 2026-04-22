/**
 * Single source of truth for "how far is this user through a course?".
 *
 * Used by the dashboard course cards, the per-course progress panel, and any
 * other surface that wants to show progress, so a user always sees the same
 * number on the same course wherever it appears.
 *
 * Formula:
 *   progress = (sublessons completed + practice problems correct)
 *              / (total sublessons + total practice problems available)
 *
 * Sublessons are CED topics from `ApUnit.topics[]`. If a unit has no `topics`
 * array we treat the unit itself as one sublesson so the bar still moves.
 *
 * Practice progress is read from localStorage under the per-unit key
 * `fp-practice-progress:{courseSlug}:{unitNumber}` - same key
 * `app/components/PracticeProblems.tsx` writes to. Practices are optional:
 * if a unit has no problems available, it just contributes 0/0 to the totals.
 */
import { LESSONS, type Course } from "./topics";
import { cedTopicSlug } from "./progress";

export type CourseProgress = {
  /** Numerator: sublessons completed + practice problems correctly answered. */
  done: number;
  /** Denominator: total sublessons + total practice problems available. */
  total: number;
  /** Whole-number percent, 0–100. */
  pct: number;
  /** Sub-buckets for surfaces that want to show the breakdown. */
  sublessons: { done: number; total: number };
  practices: { done: number; total: number };
};

/** Localstorage shape written by PracticeProblems.tsx. */
type PracticeProgress = { submitted?: number[]; correct?: number[] };

/** Reads localStorage practice progress for one course/unit. SSR-safe. */
function readPractice(
  courseSlug: string,
  unitNumber: number
): PracticeProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(
      `fp-practice-progress:${courseSlug}:${unitNumber}`
    );
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return {
      submitted: Array.isArray(parsed?.submitted) ? parsed.submitted : [],
      correct: Array.isArray(parsed?.correct) ? parsed.correct : [],
    };
  } catch {
    return {};
  }
}

export type PracticeTotalsLookup = (
  courseSlug: string,
  unitNumber: number
) => number;

/**
 * Compute the canonical progress for a course.
 *
 * @param course           Full course definition from lib/topics.
 * @param completedSlugs   The user's completedSlugs set (mix of lesson and
 *                         `ced:{course}:{topicId}` entries).
 * @param practiceTotal    Optional callback returning how many practice
 *                         problems are available for a given course/unit.
 *                         When omitted, only the count of correctly answered
 *                         problems is added (the denominator stays sublessons-
 *                         only). Provide this when you can derive totals from
 *                         a static problem set.
 */
export function getCourseProgress(
  course: Course,
  completedSlugs: Set<string>,
  practiceTotal?: PracticeTotalsLookup
): CourseProgress {
  let totalSublessons = 0;
  let doneSublessons = 0;
  let totalPractices = 0;
  let donePractices = 0;

  for (const unit of course.units) {
    if (unit.topics && unit.topics.length > 0) {
      for (const topic of unit.topics) {
        totalSublessons += 1;
        if (completedSlugs.has(cedTopicSlug(course.slug, topic.id))) {
          doneSublessons += 1;
        }
      }
    } else {
      // Fall back to lessons mapped to this unit so the bar still has a denominator.
      const unitLessons = LESSONS.filter((l) =>
        l.courses.some(
          (m) => m.courseSlug === course.slug && m.unitNumber === unit.number
        )
      );
      totalSublessons += unitLessons.length || 1;
      doneSublessons += unitLessons.filter((l) =>
        completedSlugs.has(l.slug)
      ).length;
    }

    const practice = readPractice(course.slug, unit.number);
    donePractices += practice.correct?.length ?? 0;
    if (practiceTotal) {
      totalPractices += practiceTotal(course.slug, unit.number);
    }
  }

  // If we don't know practice totals, never let "correct" exceed itself in
  // the denominator (otherwise pct could exceed 100%).
  if (!practiceTotal) totalPractices = donePractices;

  const total = totalSublessons + totalPractices;
  const done = doneSublessons + donePractices;
  const pct = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;

  return {
    done,
    total,
    pct,
    sublessons: { done: doneSublessons, total: totalSublessons },
    practices: { done: donePractices, total: totalPractices },
  };
}
