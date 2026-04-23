export type Mcq = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type LessonMcqs = {
  lessonSlug: string;
  mcqs: Mcq[];
};
