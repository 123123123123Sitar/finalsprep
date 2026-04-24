// Lightweight entry point for MCQ data.
//
// Previous versions of this file eagerly imported every per-course
// MCQ bundle (ap-biology.ts, ap-chemistry.ts, ...) totalling ~7 MB of
// JS. That blew up the /study client bundle even for users who never
// opened a quiz. This file now exports:
//
//  - Constants and types that are always safe to import.
//  - `hasMcqs(lessonSlug)`: synchronous lookup against a small manifest
//    (see manifest.ts). Callers can still make a sync rendering
//    decision ("is there a quiz for this lesson?") without pulling in
//    the heavy data.
//  - `loadMcqsFor(lessonSlug)`: async loader that dynamic-imports the
//    exact per-course file the lesson lives in. The course-level
//    chunks stay out of the /study first-load bundle and are only
//    fetched when a user actually opens a quiz.

import type { LessonMcqs, Mcq } from "./types";
import { MCQ_MANIFEST } from "./manifest";

export type { Mcq, LessonMcqs } from "./types";

// 3/4 correct (75%) counts as passing. True 80% on 4 questions rounds up
// to 4/4, which is effectively a perfection bar. Going one notch below
// lets a student pass with a single mistake while still demonstrating
// mastery, and unlimited retakes (with rotating questions) handle the
// rest.
export const PASS_THRESHOLD = 0.75;
export const PRIMARY_COUNT = 4;

// Synchronous: does this lesson have enough MCQs to show a quiz?
export function hasMcqs(lessonSlug: string): boolean {
  const entry = MCQ_MANIFEST[lessonSlug];
  return !!entry && entry.count >= PRIMARY_COUNT;
}

// Per-course dynamic importers. Keeping this as a switch (rather than
// a Record of functions) keeps webpack's static analysis happy: each
// `import("./ap-biology")` is a recognisable split point and becomes a
// separate chunk. An indirection layer like `IMPORTERS[key]()` works
// but the resulting chunk graph is murkier and harder to debug.
async function importCourse(key: string): Promise<LessonMcqs[]> {
  switch (key) {
    case "ap-biology":
      return (await import("./ap-biology")).AP_BIOLOGY_MCQS;
    case "ap-chemistry":
      return (await import("./ap-chemistry")).AP_CHEMISTRY_MCQS;
    case "ap-environmental":
      return (await import("./ap-environmental")).AP_ENVIRONMENTAL_MCQS;
    case "ap-statistics":
      return (await import("./ap-statistics")).AP_STATISTICS_MCQS;
    case "ap-physics-c-mech":
      return (await import("./ap-physics-c-mech")).AP_PHYSICS_C_MECH_MCQS;
    case "ap-physics-c-em":
      return (await import("./ap-physics-c-em")).AP_PHYSICS_C_EM_MCQS;
    case "ap-cs-a":
      return (await import("./ap-cs-a")).AP_CS_A_MCQS;
    case "ap-cs-principles":
      return (await import("./ap-cs-principles")).AP_CS_PRINCIPLES_MCQS;
    case "ap-us-history":
      return (await import("./ap-us-history")).AP_US_HISTORY_MCQS;
    case "ap-world-history":
      return (await import("./ap-world-history")).AP_WORLD_HISTORY_MCQS;
    case "ap-euro-history":
      return (await import("./ap-euro-history")).AP_EURO_HISTORY_MCQS;
    default:
      return [];
  }
}

// In-flight / completed request cache. If a user clicks a lesson,
// navigates away, and comes back, we don't want to re-download the
// course's MCQs. The cache survives route changes because the module
// lives in memory as long as the tab is open.
const coursePromises = new Map<string, Promise<LessonMcqs[]>>();

function getCourse(key: string): Promise<LessonMcqs[]> {
  const cached = coursePromises.get(key);
  if (cached) return cached;
  const p = importCourse(key);
  coursePromises.set(key, p);
  return p;
}

export async function loadMcqsFor(lessonSlug: string): Promise<Mcq[]> {
  const entry = MCQ_MANIFEST[lessonSlug];
  if (!entry) return [];
  const course = await getCourse(entry.key);
  const lesson = course.find((l) => l.lessonSlug === lessonSlug);
  return lesson?.mcqs ?? [];
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
