/**
 * Pro-tier curriculum content for each AP course, organized by the official
 * College Board CED unit structure. Free users see units 1 and 2 in full
 * plus a preview blurb for the rest of the course. Pro users unlock every
 * unit across every course.
 */

export type CurriculumUnit = {
  /** Matches the unit number in lib/apUnits/<category>.ts */
  unitNumber: number;
  /** Short headline for the unit as displayed in the curriculum view. */
  title: string;
  /** 2-3 sentence plain-English summary of what the unit covers. */
  overview: string;
  /** Approximate exam weight as published in the CED (e.g. "10-12%"). */
  examWeight: string;
  /** 4-6 short "big idea" bullets — what students must walk away understanding. */
  bigIdeas: string[];
  /** 3-8 essential knowledge sections with a heading and a short paragraph. */
  essentials: { heading: string; body: string }[];
  /** Optional: formulas or memorized facts students should know cold. */
  keyFacts?: string[];
  /** 3-5 common mistakes graders see on this unit. */
  commonMistakes: string[];
  /** One paragraph on how to approach this unit on the AP exam. */
  examStrategy: string;
  /** 3-5 concrete actions to study this unit effectively. */
  studyTips: string[];
};

export type CourseCurriculum = {
  courseSlug: string;
  /** Summary of the exam format and length, for the course landing view. */
  examFormat: {
    length: string;
    structure: string;
    scoring: string;
  };
  /** One-paragraph "why this course matters" framing. */
  framing: string;
  units: CurriculumUnit[];
};
