export type PracticeProblem = {
  difficulty: "easy" | "medium" | "hard";
  prompt: string;
  hint?: string;
  answer: string;
  explanation: string;
};

export type UnitPractice = {
  unitNumber: number;
  title?: string;
  problems: PracticeProblem[];
};
