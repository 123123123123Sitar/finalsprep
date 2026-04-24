export type Mcq = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  /**
   * Parametric variants of this question: same concept, different numbers,
   * different correct answer. Used to prevent memorization across repeat
   * attempts. Variants do NOT carry their own variations — they're leaves.
   * Shape is the same minus the `variations` field, enforced by the
   * `McqVariant` type.
   *
   * Population is optional. Conceptual / factual questions (history dates,
   * vocab, definitions) don't need variations — leave this field absent.
   */
  variations?: McqVariant[];
};

export type McqVariant = Omit<Mcq, "variations">;

export type LessonMcqs = {
  lessonSlug: string;
  mcqs: Mcq[];
};
