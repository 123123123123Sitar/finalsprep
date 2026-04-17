/**
 * Per-CED-topic lesson content. Every topic in lib/apUnits/*.ts has a
 * matching CedLesson with a full walkthrough, key ideas, a worked
 * example, flashcards, common mistakes, and (for topics that benefit
 * from it) an inline SVG diagram. Pro users unlock the full catalog;
 * free users see the first two units of each course as a sample.
 */

export type CedFlashcard = {
  q: string;
  a: string;
};

/**
 * A single multiple-choice question served after a lesson. Four answer
 * choices is the AP exam convention; keep `answerIndex` zero-based and
 * always include a short `explanation` for the correct choice so the UI
 * can reveal it after submission.
 */
export type CedQuizQuestion = {
  q: string;
  choices: [string, string, string, string];
  answerIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export type CedLesson = {
  /** Matches the topic id in apUnits (e.g. "1.1", "3.14"). */
  id: string;
  /** Matches the CED topic title. */
  title: string;
  /** 1-2 sentence elevator pitch shown in the collapsed topic card. */
  summary: string;
  /**
   * 300-600 word walkthrough of the topic. Plain text with optional
   * inline LaTeX (e.g. `\(x^2\)`, `$$\int f \, dx$$`). Rendered through
   * MathRender on the client.
   */
  lesson: string;
  /** 3-5 short takeaways students must walk away remembering. */
  keyIdeas: string[];
  /** Optional: one fully-worked example pair. */
  workedExample?: {
    prompt: string;
    solution: string;
  };
  /** Optional: 3-5 quick review cards for spaced repetition. */
  flashcards?: CedFlashcard[];
  /** 2-4 traps graders see on this topic. */
  commonMistakes: string[];
  /**
   * End-of-lesson check: 4-5 multiple-choice questions. Rendered as a
   * mini-quiz beneath the lesson body so students can self-assess before
   * moving to the next topic.
   */
  quiz?: CedQuizQuestion[];
  /**
   * Optional inline SVG string. Use viewBox="0 0 400 240" by default
   * so the diagram scales to the card width. Keep palette neutral +
   * the orange accent (#c2410c) so it fits the theme.
   */
  diagram?: string;
};

/** A course's full set of CED topic lessons, keyed by topic id. */
export type CourseCedLessons = Record<string, CedLesson>;
