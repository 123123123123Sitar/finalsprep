import { MATH_CURRICULUM } from "./math";
import { SCIENCE_CURRICULUM } from "./science";
import { CS_CURRICULUM } from "./cs";
import { HISTORY_CURRICULUM } from "./history";
import type { PlanTier } from "@/lib/plans";
import type { CourseCurriculum, CurriculumUnit } from "./types";

export type { CourseCurriculum, CurriculumUnit };
export type { CurriculumUnit as CurriculumUnitType } from "./types";

/** All curriculum keyed by course slug. Merged from the four category files. */
export const CURRICULUM: Record<string, CourseCurriculum> = {
  ...MATH_CURRICULUM,
  ...SCIENCE_CURRICULUM,
  ...CS_CURRICULUM,
  ...HISTORY_CURRICULUM,
};

/**
 * How many units are unlocked for free users at the top of each course.
 * Free users see the full unit content for the first FREE_UNIT_LIMIT units
 * of every course, plus a locked teaser for subsequent units. Pro users
 * see every unit unlocked.
 */
export const FREE_UNIT_LIMIT = 2;

/** Lookup curriculum for a given course slug. Returns undefined if not found. */
export function getCurriculum(
  courseSlug: string
): CourseCurriculum | undefined {
  return CURRICULUM[courseSlug];
}

/** Lookup a specific unit in a course, or undefined if not found. */
export function getCurriculumUnit(
  courseSlug: string,
  unitNumber: number
): CurriculumUnit | undefined {
  return CURRICULUM[courseSlug]?.units.find((u) => u.unitNumber === unitNumber);
}

/**
 * Check whether a unit is unlocked for a given plan. Free users get the
 * first FREE_UNIT_LIMIT units of every course. Paid plans get everything.
 */
export function isUnitUnlocked(unitNumber: number, plan: PlanTier): boolean {
  if (plan !== "learner") return true;
  return unitNumber <= FREE_UNIT_LIMIT;
}
