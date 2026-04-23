import type { LessonMcqs, Mcq } from "./types";
import { AP_BIOLOGY_MCQS } from "./ap-biology";
import { AP_CHEMISTRY_MCQS } from "./ap-chemistry";
import { AP_ENVIRONMENTAL_MCQS } from "./ap-environmental";
import { AP_STATISTICS_MCQS } from "./ap-statistics";
import { AP_PHYSICS_C_MECH_MCQS } from "./ap-physics-c-mech";
import { AP_PHYSICS_C_EM_MCQS } from "./ap-physics-c-em";
import { AP_CS_A_MCQS } from "./ap-cs-a";
import { AP_CS_PRINCIPLES_MCQS } from "./ap-cs-principles";
import { AP_US_HISTORY_MCQS } from "./ap-us-history";
import { AP_WORLD_HISTORY_MCQS } from "./ap-world-history";
import { AP_EURO_HISTORY_MCQS } from "./ap-euro-history";

export type { Mcq, LessonMcqs } from "./types";

export const PASS_THRESHOLD = 0.8;
export const PRIMARY_COUNT = 4;

const ALL: LessonMcqs[] = [
  ...AP_BIOLOGY_MCQS,
  ...AP_CHEMISTRY_MCQS,
  ...AP_ENVIRONMENTAL_MCQS,
  ...AP_STATISTICS_MCQS,
  ...AP_PHYSICS_C_MECH_MCQS,
  ...AP_PHYSICS_C_EM_MCQS,
  ...AP_CS_A_MCQS,
  ...AP_CS_PRINCIPLES_MCQS,
  ...AP_US_HISTORY_MCQS,
  ...AP_WORLD_HISTORY_MCQS,
  ...AP_EURO_HISTORY_MCQS,
];

const BY_SLUG: Map<string, Mcq[]> = new Map(
  ALL.map((entry) => [entry.lessonSlug, entry.mcqs])
);

export function getMcqsFor(lessonSlug: string): Mcq[] {
  return BY_SLUG.get(lessonSlug) ?? [];
}

export function hasMcqs(lessonSlug: string): boolean {
  const list = BY_SLUG.get(lessonSlug);
  return !!list && list.length >= PRIMARY_COUNT;
}

/**
 * Select PRIMARY_COUNT questions from the pool for a given attempt index.
 * Uses round-robin rotation so retakes always pull fresh questions before
 * recycling. With a 15-question pool and 4 per attempt, attempts 0..2 have
 * zero overlap; attempt 3 wraps, and the full pool re-cycles every 15
 * attempts.
 */
export function pickQuestionsForAttempt(
  pool: Mcq[],
  attemptIndex: number
): Mcq[] {
  const n = pool.length;
  if (n === 0) return [];
  const k = Math.min(PRIMARY_COUNT, n);
  const safeIdx = Math.max(0, Math.floor(attemptIndex));
  const start = (safeIdx * k) % n;
  const out: Mcq[] = [];
  for (let i = 0; i < k; i++) out.push(pool[(start + i) % n]);
  return out;
}
