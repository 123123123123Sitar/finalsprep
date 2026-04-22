import { COURSES, unitsForCourse, type CourseSlug } from "@/lib/topics";
import { getUnitPractice } from "@/lib/practice";
import type { WrongBankEntry } from "@/lib/wrongBank";
import type { ExamResult } from "@/lib/examResults";
import { loadWrongBankSrs, isDue } from "@/lib/srs";

export type HistoryEntry = {
  kind?: string;
  tokens?: number;
  createdAt?: number;
};

export type DifficultyMastery = {
  easy: { correct: number; total: number; pct: number };
  medium: { correct: number; total: number; pct: number };
  hard: { correct: number; total: number; pct: number };
};

export type WeakTopic = {
  courseSlug: string;
  courseTitle: string;
  unitNumber: number;
  unitTitle: string;
  count: number;
};

export type NextAction = {
  label: string;
  description: string;
  href: string;
  priority: number;
};

function toDateKey(ms: number): string {
  const d = new Date(ms);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function buildActivityMap(
  history: HistoryEntry[],
  wrongBank: WrongBankEntry[],
  examResults: ExamResult[]
): Map<string, number> {
  const map = new Map<string, number>();
  const bump = (ms: number, weight = 1) => {
    const key = toDateKey(ms);
    map.set(key, (map.get(key) || 0) + weight);
  };
  for (const h of history) {
    if (h.createdAt) bump(h.createdAt, 1);
  }
  for (const w of wrongBank) {
    if (w.savedAt) bump(w.savedAt, 2);
  }
  for (const e of examResults) {
    if (e.createdAt) bump(e.createdAt, 5);
  }
  return map;
}

export function getHeatmapDays(daysBack = 90): string[] {
  const out: string[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    out.push(toDateKey(d.getTime()));
  }
  return out;
}

/**
 * Reads per-unit practice progress from localStorage and aggregates
 * correct / submitted counts by difficulty across every unit of every
 * selected course. Hard-coded to the storage shape used by
 * PracticeProblems ("fp-practice-progress:{courseSlug}:{unitNumber}").
 */
export function computeDifficultyMastery(
  selectedCourses: string[]
): DifficultyMastery {
  if (typeof window === "undefined") {
    return emptyMastery();
  }
  const counters = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
  };

  for (const courseSlug of selectedCourses) {
    let units;
    try {
      units = unitsForCourse(courseSlug as CourseSlug);
    } catch {
      continue;
    }
    for (const unit of units) {
      const key = `fp-practice-progress:${courseSlug}:${unit.number}`;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      let parsed: { submitted?: number[]; correct?: number[] };
      try {
        parsed = JSON.parse(raw);
      } catch {
        continue;
      }
      const submitted = new Set(parsed.submitted || []);
      const correct = new Set(parsed.correct || []);
      const problems = getUnitPractice(courseSlug as CourseSlug, unit.number);
      problems.forEach((p, idx) => {
        const diff = (p.difficulty || "medium") as "easy" | "medium" | "hard";
        if (submitted.has(idx)) {
          counters[diff].total += 1;
          if (correct.has(idx)) counters[diff].correct += 1;
        }
      });
    }
  }
  return {
    easy: { ...counters.easy, pct: pct(counters.easy) },
    medium: { ...counters.medium, pct: pct(counters.medium) },
    hard: { ...counters.hard, pct: pct(counters.hard) },
  };
}

function pct(c: { correct: number; total: number }): number {
  return c.total === 0 ? 0 : Math.round((c.correct / c.total) * 100);
}

function emptyMastery(): DifficultyMastery {
  return {
    easy: { correct: 0, total: 0, pct: 0 },
    medium: { correct: 0, total: 0, pct: 0 },
    hard: { correct: 0, total: 0, pct: 0 },
  };
}

export function computeWeakTopics(
  wrongBank: WrongBankEntry[],
  limit = 5
): WeakTopic[] {
  const groups = new Map<string, WeakTopic>();
  for (const w of wrongBank) {
    const key = `${w.courseSlug}:${w.unitNumber}`;
    const existing = groups.get(key);
    if (existing) {
      existing.count += 1;
      continue;
    }
    const course = COURSES.find((c) => c.slug === w.courseSlug);
    const unit = course?.units.find((u) => u.number === w.unitNumber);
    groups.set(key, {
      courseSlug: w.courseSlug,
      courseTitle: course?.shortTitle || course?.title || w.courseSlug,
      unitNumber: w.unitNumber,
      unitTitle: unit?.title || `Unit ${w.unitNumber}`,
      count: 1,
    });
  }
  return Array.from(groups.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Predicts an AP score (1-5) for a course using a weighted blend of:
 *   - lesson completion rate (how much of the course they've studied)
 *   - practice-problem accuracy (correct / submitted, if any)
 *   - mock exam percentage (average across recent attempts)
 *   - wrong-bank density penalty (more saved wrongs = weaker signal)
 *
 * Returns {score, confidence}. Confidence is 0-1 based on data volume.
 */
export function predictApScore(
  courseSlug: string,
  completedSlugs: Set<string>,
  wrongBank: WrongBankEntry[],
  examResults: ExamResult[]
): { score: number; confidence: number; breakdown: Record<string, number> } {
  let units;
  try {
    units = unitsForCourse(courseSlug as CourseSlug);
  } catch {
    return { score: 1, confidence: 0, breakdown: {} };
  }

  const totalLessons = units.reduce(
    (sum, u) => sum + u.lessons.length + (u.topics?.length || 0),
    0
  );
  let completedCount = 0;
  for (const u of units) {
    for (const l of u.lessons) {
      if (completedSlugs.has(l.slug)) completedCount += 1;
    }
  }
  const completionPct = totalLessons > 0 ? completedCount / totalLessons : 0;

  // Practice accuracy
  let practiceCorrect = 0;
  let practiceTotal = 0;
  if (typeof window !== "undefined") {
    for (const u of units) {
      const key = `fp-practice-progress:${courseSlug}:${u.number}`;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        practiceTotal += (parsed.submitted || []).length;
        practiceCorrect += (parsed.correct || []).length;
      } catch {}
    }
  }
  const practiceAccuracy =
    practiceTotal > 0 ? practiceCorrect / practiceTotal : 0.5;

  // Exam performance
  const courseExams = examResults.filter((e) => e.courseSlug === courseSlug);
  const avgExamPct =
    courseExams.length > 0
      ? courseExams.reduce((s, e) => s + e.percentage, 0) /
        courseExams.length /
        100
      : 0.5;

  // Wrong-bank penalty
  const courseWrongs = wrongBank.filter((w) => w.courseSlug === courseSlug).length;
  const wrongPenalty = Math.min(courseWrongs / 30, 0.25);

  // Weighted blend (0-1)
  const blend =
    completionPct * 0.3 +
    practiceAccuracy * 0.3 +
    avgExamPct * 0.4 -
    wrongPenalty;
  const clamped = Math.max(0, Math.min(1, blend));

  // Map to 1-5. Even minimal data shouldn't yield a flat 1.
  const score = Math.max(1, Math.min(5, Math.round(1 + clamped * 4)));

  // Confidence scales with data volume
  const dataVolume =
    completedCount * 0.5 + practiceTotal * 0.3 + courseExams.length * 3;
  const confidence = Math.min(1, dataVolume / 40);

  return {
    score,
    confidence,
    breakdown: {
      completion: Math.round(completionPct * 100),
      practice: Math.round(practiceAccuracy * 100),
      exam: Math.round(avgExamPct * 100),
    },
  };
}

export function computeNextActions(params: {
  wrongBankCount: number;
  completedSlugs: Set<string>;
  selectedCourses: string[];
  examResults: ExamResult[];
}): NextAction[] {
  const actions: NextAction[] = [];

  // SRS due cards
  if (typeof window !== "undefined") {
    try {
      const deck = loadWrongBankSrs();
      const due = deck.filter((c) => isDue(c)).length;
      if (due > 0) {
        actions.push({
          label: `Review ${due} due card${due === 1 ? "" : "s"}`,
          description: "Spaced repetition picks what you're closest to forgetting.",
          href: "/insights?tab=review",
          priority: due > 10 ? 100 : 80,
        });
      }
    } catch {}
  }

  // Wrong bank
  if (params.wrongBankCount > 0) {
    actions.push({
      label: `Retry ${params.wrongBankCount} saved wrong${
        params.wrongBankCount === 1 ? "" : "s"
      }`,
      description: "Re-attempt problems you got wrong.",
      href: "/insights?tab=review",
      priority: 70,
    });
  }

  // Mock exam suggestion
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const hasRecentExam = params.examResults.some((e) => e.createdAt >= weekAgo);
  if (!hasRecentExam && params.selectedCourses.length > 0) {
    const target = params.selectedCourses[0];
    const course = COURSES.find((c) => c.slug === target);
    actions.push({
      label: "Take a mock exam",
      description: `Benchmark where you stand${
        course ? ` in ${course.shortTitle}` : ""
      }.`,
      href: "/exam",
      priority: 60,
    });
  }

  // Lessons to study
  let totalLessons = 0;
  let completedLessons = 0;
  for (const slug of params.selectedCourses) {
    try {
      const units = unitsForCourse(slug as CourseSlug);
      for (const u of units) {
        for (const l of u.lessons) {
          totalLessons += 1;
          if (params.completedSlugs.has(l.slug)) completedLessons += 1;
        }
      }
    } catch {}
  }
  const remaining = totalLessons - completedLessons;
  if (remaining > 0 && totalLessons > 0) {
    const pctDone = Math.round((completedLessons / totalLessons) * 100);
    actions.push({
      label: `Study ${remaining} remaining lesson${remaining === 1 ? "" : "s"}`,
      description: `You've completed ${pctDone}% of your course content.`,
      href: "/study",
      priority: 40,
    });
  }

  // No selected courses
  if (params.selectedCourses.length === 0) {
    actions.push({
      label: "Pick your AP courses",
      description: "Add courses to unlock personalized insights.",
      href: "/study",
      priority: 100,
    });
  }

  return actions.sort((a, b) => b.priority - a.priority).slice(0, 5);
}
