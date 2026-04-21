import { unitsForCourse, type CourseSlug } from "@/lib/topics";
import { getUnitPractice, type PracticeProblem } from "@/lib/practice";

export type ExamProblem = PracticeProblem & {
  unitNumber: number;
  unitTitle: string;
};

export type ExamAttempt = {
  problemIdx: number;
  attempt: string;
  isCorrect: boolean;
};

export function buildExam(courseSlug: CourseSlug, questionCount: number): ExamProblem[] {
  const units = unitsForCourse(courseSlug);
  const allProblems: ExamProblem[] = [];

  // Gather all problems across units
  for (const unit of units) {
    const unitProblems = getUnitPractice(courseSlug, unit.number);
    const unitTitle = unit.title || `Unit ${unit.number}`;
    allProblems.push(
      ...unitProblems.map((p) => ({
        ...p,
        unitNumber: unit.number,
        unitTitle,
      }))
    );
  }

  if (allProblems.length === 0) return [];

  // Distribute problems across difficulty levels
  const easyProblems = allProblems.filter((p) => p.difficulty === "easy");
  const mediumProblems = allProblems.filter((p) => p.difficulty === "medium");
  const hardProblems = allProblems.filter((p) => p.difficulty === "hard");

  const selected: ExamProblem[] = [];
  const easyPerLevel = Math.floor(questionCount / 3);
  const mediumPerLevel = Math.floor(questionCount / 3);
  const hardPerLevel = questionCount - easyPerLevel - mediumPerLevel;

  // Shuffle and pick from each level
  function shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  selected.push(...shuffle(easyProblems).slice(0, easyPerLevel));
  selected.push(...shuffle(mediumProblems).slice(0, mediumPerLevel));
  selected.push(...shuffle(hardProblems).slice(0, hardPerLevel));

  return shuffle(selected);
}

export function calculateScore(attempts: ExamAttempt[]): {
  score: number;
  total: number;
  percentage: number;
  byUnit: Record<
    number,
    { unitTitle: string; correct: number; total: number; percentage: number }
  >;
} {
  const total = attempts.length;
  const correct = attempts.filter((a) => a.isCorrect).length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const byUnit: Record<
    number,
    { unitTitle: string; correct: number; total: number; percentage: number }
  > = {};

  return {
    score: correct,
    total,
    percentage,
    byUnit,
  };
}
