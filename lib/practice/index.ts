import { MATH_PRACTICE } from "./math";
import { SCIENCE_PRACTICE } from "./science";
import { CS_PRACTICE } from "./cs";
import { HISTORY_PRACTICE } from "./history";
import type { PracticeProblem, UnitPractice } from "./types";

export type { PracticeProblem, UnitPractice };

/** All practice problems keyed by course slug. */
export const PRACTICE: Record<string, UnitPractice[]> = {
  ...MATH_PRACTICE,
  ...SCIENCE_PRACTICE,
  ...CS_PRACTICE,
  ...HISTORY_PRACTICE,
};

export function getUnitPractice(
  courseSlug: string,
  unitNumber: number
): PracticeProblem[] {
  const course = PRACTICE[courseSlug];
  if (!course) return [];
  const unit = course.find((u) => u.unitNumber === unitNumber);
  return unit?.problems ?? [];
}
