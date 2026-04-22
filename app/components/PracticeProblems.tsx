"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PracticeProblem } from "@/lib/practice/types";
import { addToWrongBank } from "@/lib/wrongBank";
import { addWrongProblemToSrs } from "@/lib/srs";
import { recordActivityClient } from "@/lib/activityClient";
import { useAuth } from "./AuthProvider";
import MathRender from "./Math";
import Whiteboard from "./Whiteboard";

const CREDIT_THRESHOLD = 5;

function progressKey(courseSlug: string, unitNumber: number) {
  return `fp-practice-progress:${courseSlug}:${unitNumber}`;
}

function stripUnmatched(s: string, open: string, close: string): string {
  const toRemove = new Set<number>();
  const opens: number[] = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === open) opens.push(i);
    else if (s[i] === close) {
      if (opens.length) opens.pop();
      else toRemove.add(i);
    }
  }
  for (const idx of opens) toRemove.add(idx);
  if (!toRemove.size) return s;
  let out = "";
  for (let i = 0; i < s.length; i++) if (!toRemove.has(i)) out += s[i];
  return out;
}

function buildPreview(raw: string): string {
  let out = raw;
  out = stripUnmatched(out, "(", ")");
  out = stripUnmatched(out, "{", "}");
  out = stripUnmatched(out, "[", "]");
  out = out.replace(/[ \t]+/g, " ").replace(/ *\n+ */g, " ").trim();
  if (!out) return "";
  out = out
    .replace(/∫/g, "\\int ")
    .replace(/²/g, "^{2}")
    .replace(/³/g, "^{3}")
    .replace(/⁴/g, "^{4}")
    .replace(/π/g, "\\pi ")
    .replace(/√/g, "\\sqrt ")
    .replace(/·/g, "\\cdot ")
    .replace(/×/g, "\\times ")
    .replace(/÷/g, "\\div ")
    .replace(/±/g, "\\pm ")
    .replace(/≤/g, "\\le ")
    .replace(/≥/g, "\\ge ")
    .replace(/≠/g, "\\ne ")
    .replace(/∞/g, "\\infty ")
    .replace(/θ/g, "\\theta ");
  out = out.replace(/\$/g, "");
  out = out.replace(/\s+/g, " ").trim();
  // Wrap word-like runs (3+ letters not following a backslash) in \text{}
  // so prose renders upright with proper spacing instead of being treated
  // as concatenated math variables. LaTeX commands (\int, \sqrt, \pi, …)
  // are skipped because the char before their letters is a backslash.
  out = out.replace(
    /(^|[^\\a-zA-Z])([a-zA-Z]{3,})/g,
    (_m, pre: string, word: string) => `${pre}\\text{${word}}`
  );
  // Preserve remaining bare spaces inside math mode with a backslash-space.
  out = out.replace(/ /g, "\\ ");
  return `$${out}$`;
}

export default function PracticeProblems({
  problems,
  courseSlug,
  unitNumber,
  courseTitle,
}: {
  problems: PracticeProblem[];
  courseSlug: string;
  unitNumber: number;
  courseTitle?: string;
}) {
  const { user, plan, getIdToken } = useAuth();
  const canWrongBank = !!user && plan !== "learner";
  const canAiGrade = plan === "hacker";

  function generateMore() {
    const q = new URLSearchParams({
      courseSlug,
      courseTitle: courseTitle ?? "",
      unitNumber: String(unitNumber),
      count: "4",
    });
    window.location.href = `/practice/generated?${q.toString()}`;
  }

  function openSimilar(problem: PracticeProblem) {
    const q = new URLSearchParams({
      courseSlug,
      courseTitle: courseTitle ?? "",
      unitNumber: String(unitNumber),
      count: "1",
      similarTo: problem.prompt,
    });
    window.location.href = `/practice/generated?${q.toString()}`;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [submittedIndexes, setSubmittedIndexes] = useState<Set<number>>(() => new Set());
  const [correctIndexes, setCorrectIndexes] = useState<Set<number>>(() => new Set());
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "easy" | "medium" | "hard">("all");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(progressKey(courseSlug, unitNumber));
      if (!raw) return;
      const data = JSON.parse(raw);
      if (Array.isArray(data?.submitted)) {
        const set = new Set<number>(
          data.submitted.filter((n: unknown) => typeof n === "number")
        );
        setSubmittedIndexes(set);
        setSubmittedCount(set.size);
        const firstUnsubmitted = [...Array(problems?.length || 0).keys()].find(
          (i) => !set.has(i)
        );
        if (firstUnsubmitted !== undefined) setCurrentIndex(firstUnsubmitted);
      }
      if (Array.isArray(data?.correct)) {
        const correctSet = new Set<number>(
          data.correct.filter((n: unknown) => typeof n === "number")
        );
        setCorrectIndexes(correctSet);
      }
    } catch {}
  }, [courseSlug, unitNumber, problems?.length]);

  function markSubmitted(i: number, isCorrect?: boolean) {
    setSubmittedIndexes((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      setSubmittedCount(next.size);
      if (user) void recordActivityClient(getIdToken);

      if (isCorrect) {
        setCorrectIndexes((correct) => {
          const nextCorrect = new Set(correct);
          nextCorrect.add(i);
          if (typeof window !== "undefined") {
            try {
              window.localStorage.setItem(
                progressKey(courseSlug, unitNumber),
                JSON.stringify({ submitted: [...next], correct: [...nextCorrect] })
              );
            } catch {}
          }
          return nextCorrect;
        });
      } else {
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(
              progressKey(courseSlug, unitNumber),
              JSON.stringify({ submitted: [...next], correct: [...correctIndexes] })
            );
          } catch {}
        }
      }
      return next;
    });
  }

  if (!problems || problems.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-hair bg-offwhite p-6 text-sm text-muted">
        Practice problems coming soon for this unit.
      </div>
    );
  }

  const difficultyOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2 };
  const sortedProblems = [...problems].sort(
    (a, b) => (difficultyOrder[a.difficulty] || 999) - (difficultyOrder[b.difficulty] || 999)
  );

  const filteredIndices = sortedProblems
    .map((p, idx) => idx)
    .filter((idx) =>
      difficultyFilter === "all" || sortedProblems[idx].difficulty === difficultyFilter
    );

  const clampedIndex = Math.max(
    0,
    Math.min(currentIndex, filteredIndices[filteredIndices.length - 1] ?? 0)
  );
  const currentProblem = sortedProblems[clampedIndex];
  const currentSubmitted = submittedIndexes.has(clampedIndex);

  const allEasyIndices = sortedProblems
    .map((p, idx) => idx)
    .filter((idx) => sortedProblems[idx].difficulty === "easy");
  const allEasyCorrect = allEasyIndices.every((idx) => correctIndexes.has(idx)) && allEasyIndices.length > 0;

  const target = Math.min(CREDIT_THRESHOLD, problems.length);
  const creditEarned = submittedCount >= target;
  const progressPct = Math.min(100, Math.round((submittedCount / target) * 100));

  function goNext() {
    const nextUnsubmitted = [...Array(problems.length).keys()].find(
      (i) => i !== clampedIndex && !submittedIndexes.has(i)
    );
    if (nextUnsubmitted !== undefined) {
      setCurrentIndex(nextUnsubmitted);
    } else if (clampedIndex < problems.length - 1) {
      setCurrentIndex(clampedIndex + 1);
    }
  }

  function skipCurrent() {
    if (clampedIndex < problems.length - 1) {
      setCurrentIndex(clampedIndex + 1);
    }
  }

  function resetProgress() {
    setSubmittedIndexes(new Set());
    setSubmittedCount(0);
    setCurrentIndex(0);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(progressKey(courseSlug, unitNumber));
      } catch {}
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Difficulty filter pills */}
      <div className="flex flex-wrap gap-2">
        {(["all", "easy", "medium", "hard"] as const).map((level) => (
          <button
            key={level}
            onClick={() => setDifficultyFilter(level)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              difficultyFilter === level
                ? "bg-orange text-white"
                : "border border-hair bg-offwhite text-ink hover:border-orange"
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* All easy solved message */}
      {allEasyCorrect && difficultyFilter === "all" && (
        <div className="rounded-md border border-green-300 bg-green-50 p-3 text-[13px] text-green-800">
          ✓ All easy problems solved. Medium difficulty unlocked!
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            Practice · {submittedCount} of {target} for credit
          </div>
          <div className="mt-2 h-1.5 w-48 overflow-hidden rounded-full bg-hair">
            <div
              className={`h-full transition-all ${
                creditEarned ? "bg-green-500" : "bg-orange"
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {submittedCount > 0 && (
            <button
              onClick={resetProgress}
              className="rounded-md border border-hair bg-offwhite px-3 py-1 text-xs text-muted hover:border-orange"
              title="Reset practice progress for this unit"
            >
              Reset
            </button>
          )}
          <button
            onClick={generateMore}
            className="rounded-md border border-orange/40 bg-orange-tint px-3 py-1 text-xs font-medium text-orange-ink hover:border-orange"
            title="Ask the AI tutor to generate more problems like these"
          >
            ✨ Generate more →
          </button>
        </div>
      </div>

      {creditEarned && (
        <div className="rounded-md border border-green-300 bg-green-50 p-3 text-[13px] text-green-900">
          ✓ Practice credit earned for this unit. Great work. You can keep going
          or move on.
        </div>
      )}

      <ProblemCard
        key={clampedIndex}
        problem={currentProblem}
        index={clampedIndex}
        courseSlug={courseSlug}
        unitNumber={unitNumber}
        canWrongBank={canWrongBank}
        canAiGrade={canAiGrade}
        getIdToken={getIdToken}
        alreadySubmitted={currentSubmitted}
        canSkip={clampedIndex < problems.length - 1}
        onSkip={skipCurrent}
        onSimilar={() => openSimilar(currentProblem)}
        onSubmitted={(isCorrect) => markSubmitted(clampedIndex, isCorrect)}
        onSaveWrong={
          canWrongBank && user
            ? async () => {
                await addToWrongBank(user.uid, {
                  courseSlug,
                  unitNumber,
                  prompt: currentProblem.prompt,
                  answer: currentProblem.answer,
                  explanation: currentProblem.explanation,
                  difficulty: currentProblem.difficulty,
                });
                addWrongProblemToSrs(currentProblem.prompt, currentProblem.answer);
              }
            : undefined
        }
      />

      <div className="flex items-center justify-between">
        <div className="text-[12px] text-muted">
          Question {clampedIndex + 1} of {problems.length}
        </div>
        <button
          onClick={goNext}
          disabled={!currentSubmitted || clampedIndex >= problems.length - 1}
          className="rounded-md border border-orange bg-orange px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next question →
        </button>
      </div>
    </div>
  );
}

type GradeResult = {
  verdict: "correct" | "partial" | "incorrect";
  score: number;
  feedback: string;
  tokens?: number;
};

export function ProblemCard({
  problem,
  index,
  courseSlug,
  unitNumber,
  canWrongBank,
  canAiGrade,
  getIdToken,
  alreadySubmitted,
  canSkip,
  onSkip,
  onSimilar,
  onSubmitted,
  onSaveWrong,
  onRemove,
  labelOverride,
  problemKey,
}: {
  problem: PracticeProblem;
  index: number;
  courseSlug: string;
  unitNumber: number;
  canWrongBank: boolean;
  canAiGrade: boolean;
  getIdToken: () => Promise<string | null>;
  alreadySubmitted?: boolean;
  canSkip?: boolean;
  onSkip?: () => void;
  onSimilar?: () => void;
  onSubmitted?: (isCorrect: boolean) => void;
  onSaveWrong?: () => Promise<void>;
  onRemove?: () => void;
  labelOverride?: string;
  problemKey?: string;
}) {
  const [attempt, setAttempt] = useState("");
  const [submitted, setSubmitted] = useState(!!alreadySubmitted);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(!!alreadySubmitted);
  const [showExplain, setShowExplain] = useState(!!alreadySubmitted);
  const [saved, setSaved] = useState(false);
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [grading, setGrading] = useState(false);
  const [grade, setGrade] = useState<GradeResult | null>(null);
  const [gradeError, setGradeError] = useState<string>("");
  const attemptRef = useRef<HTMLTextAreaElement>(null);

  function insertSymbol(text: string, caretOffset?: number) {
    const ta = attemptRef.current;
    if (!ta) {
      setAttempt((a) => a + text);
      return;
    }
    const start = ta.selectionStart ?? attempt.length;
    const end = ta.selectionEnd ?? attempt.length;
    const next = attempt.slice(0, start) + text + attempt.slice(end);
    setAttempt(next);
    const pos = start + (caretOffset ?? text.length);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(pos, pos);
    });
  }

  function normalize(s: string) {
    return s
      .toLowerCase()
      .replace(/\$/g, "")
      .replace(/\\left|\\right/g, "")
      .replace(/[{}\\]/g, "")
      .replace(/\s+/g, "");
  }

  function handleSubmit() {
    if (!attempt.trim()) return;
    setSubmitted(true);
    setShowAnswer(true);
    setShowExplain(true);
    const correct = normalize(attempt) === normalize(problem.answer);
    onSubmitted?.(correct);
    if (correct) postSolve(getIdToken, courseSlug, unitNumber, problem.prompt);
  }

  async function runGrade(args: { attempt?: string; imageBase64?: string }) {
    if (grading) return;
    const hasAttempt = !!args.attempt && args.attempt.trim().length > 0;
    const hasImage = !!args.imageBase64 && args.imageBase64.length > 0;
    if (!hasAttempt && !hasImage) return;
    setGradeError("");
    setGrading(true);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          problem: problem.prompt,
          attempt: args.attempt ?? "",
          imageBase64: args.imageBase64 ?? "",
          answer: problem.answer,
          explanation: problem.explanation,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setGradeError(data?.message || data?.error || "Grading failed.");
      } else {
        setGrade({
          verdict: data.verdict,
          score: data.score,
          feedback: data.feedback,
          tokens: data.tokens,
        });
        if (typeof data.extracted === "string" && data.extracted.trim()) {
          setAttempt((prev) => prev || data.extracted);
        }
        setSubmitted(true);
        setShowAnswer(true);
        setShowExplain(true);
        setWhiteboardOpen(false);
        const isCorrect = data.verdict === "correct";
        onSubmitted?.(isCorrect);
        if (isCorrect)
          postSolve(getIdToken, courseSlug, unitNumber, problem.prompt);
      }
    } catch (e: any) {
      setGradeError(e?.message || "Grading failed.");
    } finally {
      setGrading(false);
    }
  }

  async function handleAiGrade() {
    await runGrade({ attempt });
  }

  async function handleWhiteboardSubmit(imageBase64: string) {
    await runGrade({ imageBase64 });
  }

  const isCorrect =
    submitted && attempt.trim() !== "" && normalize(attempt) === normalize(problem.answer);

  const preview = useMemo(() => buildPreview(attempt), [attempt]);

  const shortcuts: { label: string; insert: string; caretOffset?: number; title: string }[] = [
    { label: "∫", insert: "∫ ", title: "Integral" },
    { label: "d/dx", insert: "d/dx ", title: "Derivative" },
    { label: "x²", insert: "²", title: "Square" },
    { label: "xⁿ", insert: "^", title: "Power" },
  ];

  const difficultyColor =
    problem.difficulty === "easy"
      ? "bg-green-100 text-green-700"
      : problem.difficulty === "medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="rounded-lg border border-hair bg-paper p-5">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted">
          {labelOverride || `Problem ${index + 1}`}
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${difficultyColor}`}>
            {problem.difficulty}
          </span>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="text-[11px] text-muted hover:text-red-600"
              title="Remove from review bank"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-start justify-between gap-3">
        <div className="flex-1 whitespace-pre-wrap text-[15px] text-ink">
          <MathRender auto>{problem.prompt}</MathRender>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          <button
            type="button"
            onClick={() => setWhiteboardOpen(true)}
            className="rounded-md border border-hair bg-offwhite px-2.5 py-1 text-xs text-ink hover:border-orange"
            title="Open a whiteboard to work this out"
          >
            ✎ Whiteboard
          </button>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(problem.prompt);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              } catch {}
            }}
            className="rounded-md border border-hair bg-offwhite px-2.5 py-1 text-xs text-ink hover:border-orange"
            title="Copy the problem text"
          >
            {copied ? "✓ Copied" : "⎘ Copy"}
          </button>
          {onSimilar && (
            <button
              type="button"
              onClick={onSimilar}
              className="rounded-md border border-hair bg-offwhite px-2.5 py-1 text-xs text-ink hover:border-orange"
              title="Generate a fresh problem like this one"
            >
              ✨ Similar
            </button>
          )}
          {onSkip && canSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="rounded-md border border-hair bg-offwhite px-2.5 py-1 text-xs text-muted hover:border-orange"
              title="Skip to the next question without credit"
            >
              ⟶ Skip
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-md border border-hair bg-offwhite p-3">
        <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted">
          Your answer
        </label>
        <textarea
          ref={attemptRef}
          value={attempt}
          onChange={(e) => setAttempt(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={submitted}
          rows={3}
          placeholder="Work out your solution here…"
          className="w-full resize-y rounded-md border border-hair bg-paper px-3 py-2 text-[14px] text-ink focus:border-orange focus:outline-none disabled:opacity-60"
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {shortcuts.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => insertSymbol(s.insert, s.caretOffset)}
              disabled={submitted}
              title={s.title}
              className="rounded-md border border-hair bg-paper px-2.5 py-1 font-mono text-[13px] text-ink hover:border-orange disabled:opacity-50"
            >
              {s.label}
            </button>
          ))}
        </div>
        {preview && (
          <div className="mt-3 rounded-md border border-hair bg-paper px-3 py-2">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
              Preview
            </div>
            <div className="overflow-x-auto text-[15px] text-ink">
              <MathRender>{preview}</MathRender>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleSubmit}
          disabled={submitted || !attempt.trim()}
          className="rounded-md border border-orange bg-orange px-3 py-1 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitted ? "Submitted" : "Submit"}
        </button>
        {canAiGrade && (
          <button
            onClick={handleAiGrade}
            disabled={!attempt.trim() || grading}
            className="rounded-md border border-purple-400 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-800 hover:border-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
            title="Have the AI grade your full solution (spends tokens)"
          >
            {grading ? "Grading…" : "✨ AI grade (tokens)"}
          </button>
        )}
        {problem.hint && (
          <button
            onClick={() => setShowHint((x) => !x)}
            className="rounded-md border border-hair bg-offwhite px-3 py-1 text-xs text-ink hover:border-orange"
          >
            {showHint ? "Hide hint" : "Hint"}
          </button>
        )}
        {submitted && (
          <>
            <button
              onClick={() => setShowAnswer((x) => !x)}
              className="rounded-md border border-hair bg-offwhite px-3 py-1 text-xs text-ink hover:border-orange"
            >
              {showAnswer ? "Hide answer" : "Answer"}
            </button>
            <button
              onClick={() => setShowExplain((x) => !x)}
              className="rounded-md border border-hair bg-offwhite px-3 py-1 text-xs text-ink hover:border-orange"
            >
              {showExplain ? "Hide solution" : "Solution"}
            </button>
          </>
        )}
        {!submitted && (
          <button
            onClick={() => {
              setSubmitted(true);
              setShowAnswer(true);
              onSubmitted?.(false);
            }}
            className="rounded-md border border-hair bg-offwhite px-3 py-1 text-xs text-muted hover:border-orange"
            title="Give up and reveal the answer"
          >
            Show answer
          </button>
        )}
        {canWrongBank && onSaveWrong && (
          <button
            onClick={async () => {
              if (saved) return;
              await onSaveWrong();
              setSaved(true);
            }}
            className={`rounded-md border px-3 py-1 text-xs transition ${
              saved
                ? "border-red-300 bg-red-50 text-red-700"
                : "border-hair bg-offwhite text-ink hover:border-red-400"
            }`}
            title="Save for later review"
          >
            {saved ? "✓ Saved for review" : "Save for review"}
          </button>
        )}
      </div>

      {submitted && attempt.trim() && !grade && (
        <div
          className={`mt-3 rounded-md border p-3 text-[13px] ${
            isCorrect
              ? "border-green-300 bg-green-50 text-green-800"
              : "border-amber-300 bg-amber-50 text-amber-800"
          }`}
        >
          {isCorrect
            ? "✓ Looks right. Nice work. Compare with the walkthrough below."
            : "Not an exact match. Check the answer and walkthrough below; you may still be right in a different form."}
        </div>
      )}

      {grade && (
        <div
          className={`mt-3 rounded-md border p-3 text-[13px] ${
            grade.verdict === "correct"
              ? "border-green-300 bg-green-50 text-green-900"
              : grade.verdict === "partial"
              ? "border-amber-300 bg-amber-50 text-amber-900"
              : "border-red-300 bg-red-50 text-red-900"
          }`}
        >
          <div className="mb-1 flex items-center justify-between gap-2">
            <strong className="font-semibold uppercase tracking-wider text-[11px]">
              AI grade · {grade.verdict} ({Math.round(grade.score * 100)}%)
            </strong>
            {typeof grade.tokens === "number" && (
              <span className="text-[11px] opacity-70">
                {grade.tokens} tokens
              </span>
            )}
          </div>
          <div className="whitespace-pre-wrap">
            <MathRender auto>{grade.feedback}</MathRender>
          </div>
        </div>
      )}

      {gradeError && (
        <div className="mt-3 rounded-md border border-red-300 bg-red-50 p-3 text-[13px] text-red-800">
          {gradeError}
        </div>
      )}

      {showHint && problem.hint && (
        <div className="mt-3 rounded-md border border-orange/30 bg-orange-tint p-3 text-[13px] text-orange-ink">
          <strong className="font-semibold">Hint: </strong>
          <MathRender auto>{problem.hint}</MathRender>
        </div>
      )}
      {showAnswer && (
        <div className="mt-3 rounded-md border border-hair bg-offwhite p-3 text-[13px] text-ink">
          <strong className="font-semibold">Answer: </strong>
          <MathRender auto>{problem.answer}</MathRender>
        </div>
      )}
      {showExplain && (
        <div className="mt-3 border-l-2 border-orange pl-4 text-[13.5px] text-body">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
            Walkthrough
          </div>
          <div className="whitespace-pre-wrap font-sans">
            <MathRender auto>{problem.explanation}</MathRender>
          </div>
        </div>
      )}

      <Whiteboard
        open={whiteboardOpen}
        onClose={() => setWhiteboardOpen(false)}
        title={`Problem ${index + 1}`}
        questionText={problem.prompt}
        canSubmit={canAiGrade}
        submitting={grading}
        onSubmitAnswer={canAiGrade ? handleWhiteboardSubmit : undefined}
        storageKey={`fp-whiteboard:${problemKey ?? `${courseSlug}:${unitNumber}:${index}`}`}
      />
    </div>
  );
}

/**
 * Fire-and-forget: log a correct solve to the leaderboard API. Failures
 * are swallowed so grading UX never blocks on a social write.
 */
async function postSolve(
  getIdToken: () => Promise<string | null>,
  courseSlug: string,
  unitNumber: number,
  lessonTitle: string
) {
  try {
    const token = await getIdToken();
    if (!token) return;
    await fetch("/api/leaderboards/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        courseSlug,
        unitNumber,
        lessonTitle: lessonTitle.slice(0, 120),
      }),
    });
  } catch {
    /* ignore */
  }
}
