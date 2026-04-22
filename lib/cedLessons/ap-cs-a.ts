import type { CourseCedLessons, CedLesson } from "./types";
import { AP_COMPUTER_SCIENCE_A, type CsaTopic } from "./ap_computer_science_a";

/**
 * AP CS A CED lessons consumed by the study surface (getCedLesson /
 * CurriculumUnitView). The rich bundle in ap_computer_science_a.ts is the
 * source of truth; we derive the CedLesson-shaped entries the UI expects
 * so every topic registers as "done" when a user marks it complete.
 */

function toCedLesson(topic: CsaTopic): CedLesson {
  const worked = topic.practiceProblems.find((p) => !p.choices);
  return {
    id: topic.id,
    title: topic.title,
    summary: topic.summary,
    lesson: topic.explanation,
    keyIdeas: topic.keyIdeas,
    commonMistakes: topic.commonMistakes,
    ...(worked
      ? {
          workedExample: {
            prompt: worked.prompt,
            solution: `${worked.answer}\n\n${worked.explanation}`,
          },
        }
      : {}),
  };
}

export const AP_CS_A_CED_LESSONS: CourseCedLessons = AP_COMPUTER_SCIENCE_A.units
  .flatMap((u) => u.topics)
  .reduce<CourseCedLessons>((acc, topic) => {
    acc[topic.id] = toCedLesson(topic);
    return acc;
  }, {});
