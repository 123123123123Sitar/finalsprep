import type { CourseCedLessons, CedLesson } from "./types";
import { AP_PRECALC_CED_LESSONS } from "./ap-precalc";
import { AP_CALC_AB_CED_LESSONS } from "./ap-calc-ab";
import { AP_CALC_BC_CED_LESSONS } from "./ap-calc-bc";
import { AP_STATISTICS_CED_LESSONS } from "./ap-statistics";
import { AP_BIOLOGY_CED_LESSONS } from "./ap-biology";
import { AP_CHEMISTRY_CED_LESSONS } from "./ap-chemistry";
import { AP_PHYSICS_1_CED_LESSONS } from "./ap-physics-1";
import { AP_PHYSICS_2_CED_LESSONS } from "./ap-physics-2";
import { AP_PHYSICS_C_MECH_CED_LESSONS } from "./ap-physics-c-mech";
import { AP_PHYSICS_C_EM_CED_LESSONS } from "./ap-physics-c-em";
import { AP_ENVIRONMENTAL_CED_LESSONS } from "./ap-environmental";
import { AP_CS_A_CED_LESSONS } from "./ap-cs-a";
import { AP_CS_PRINCIPLES_CED_LESSONS } from "./ap-cs-principles";
import { AP_US_HISTORY_CED_LESSONS } from "./ap-us-history";
import { AP_WORLD_HISTORY_CED_LESSONS } from "./ap-world-history";
import { AP_EURO_HISTORY_CED_LESSONS } from "./ap-euro-history";
import { generateCedLesson, generateCourseCedLessons } from "./generated";

export type { CedLesson, CourseCedLessons } from "./types";

const MANUAL_CED_LESSONS: Record<string, CourseCedLessons> = {
  "ap-precalc": AP_PRECALC_CED_LESSONS,
  "ap-calc-ab": AP_CALC_AB_CED_LESSONS,
  "ap-calc-bc": AP_CALC_BC_CED_LESSONS,
  "ap-statistics": AP_STATISTICS_CED_LESSONS,
  "ap-biology": AP_BIOLOGY_CED_LESSONS,
  "ap-chemistry": AP_CHEMISTRY_CED_LESSONS,
  "ap-physics-1": AP_PHYSICS_1_CED_LESSONS,
  "ap-physics-2": AP_PHYSICS_2_CED_LESSONS,
  "ap-physics-c-mech": AP_PHYSICS_C_MECH_CED_LESSONS,
  "ap-physics-c-em": AP_PHYSICS_C_EM_CED_LESSONS,
  "ap-environmental": AP_ENVIRONMENTAL_CED_LESSONS,
  "ap-cs-a": AP_CS_A_CED_LESSONS,
  "ap-cs-principles": AP_CS_PRINCIPLES_CED_LESSONS,
  "ap-us-history": AP_US_HISTORY_CED_LESSONS,
  "ap-world-history": AP_WORLD_HISTORY_CED_LESSONS,
  "ap-euro-history": AP_EURO_HISTORY_CED_LESSONS,
};

const mergedCourseCache = new Map<string, CourseCedLessons>();

/**
 * Hand-authored topic overrides. `getCedLesson()` and
 * `getCourseCedLessons()` layer generated coverage on top of this so every
 * topic in the current app has content without eagerly bundling thousands of
 * static strings into the client.
 */
export const CED_LESSONS: Record<string, CourseCedLessons> = {
  ...MANUAL_CED_LESSONS,
};

export function getCedLesson(
  courseSlug: string,
  topicId: string
): CedLesson | undefined {
  return MANUAL_CED_LESSONS[courseSlug]?.[topicId] ?? generateCedLesson(courseSlug, topicId);
}

export function getCourseCedLessons(
  courseSlug: string
): CourseCedLessons | undefined {
  const cached = mergedCourseCache.get(courseSlug);
  if (cached) return cached;

  const generated = generateCourseCedLessons(courseSlug);
  const manual = MANUAL_CED_LESSONS[courseSlug];
  if (!generated && !manual) return undefined;

  const merged = {
    ...(generated ?? {}),
    ...(manual ?? {}),
  };
  mergedCourseCache.set(courseSlug, merged);
  return merged;
}
