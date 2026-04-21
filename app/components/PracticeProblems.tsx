"use client";
import { useRef, useState } from "react";
import type { PracticeProblem } from "@/lib/practice/types";
import { addToWrongBank } from "@/lib/wrongBank";
import { useAuth } from "./AuthProvider";
import MathRender from "./Math";

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
  const { user, plan } = useAuth();
  const canWrongBank = !!user && plan !== "learner";

  function generateMore() {
    const subject = courseTitle || courseSlug;
    const prompt = `Generate 4 new AP-style practice problems for ${subject}, unit ${unitNumber}, in this format for each one:\n- difficulty: easy/medium/hard\n- prompt\n- hint\n- answer\n- 3-5 sentence explanation\n\nMake them distinct from standard textbook examples. Match the difficulty mix: easy, medium, medium, hard.`;
    window.location.href = `/chat?q=${encodeURIComponent(prompt)}`;
  }

  if (!problems || problems.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-hair bg-offwhite p-6 text-sm text-muted">
        Practice problems coming soon for this unit.
      </div>
    );
  }
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          Practice problems ({problems.length})
        </div>
        <button
          onClick={generateMore}
          className="rounded-md border border-orange/40 bg-orange-tint px-3 py-1 text-xs font-medium text-orange-ink hover:border-orange"
          title="Ask the AI tutor to generate more problems like these"
        >
          ✨ Generate more →
        </button>
      </div>
      {problems.map((p, i) => (
        <ProblemCard
          key={i}
          problem={p}
          index={i}
          canWrongBank={canWrongBank}
          onSaveWrong={
            canWrongBank && user
              ? async () => {
                  await addToWrongBank(user.uid, {
                    courseSlug,
                    unitNumber,
                    prompt: p.prompt,
                    answer: p.answer,
                    explanation: p.explanation,
                    difficulty: p.difficulty,
                  });
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}

function ProblemCard({
  problem,
  index,
  canWrongBank,
  onSaveWrong,
}: {
  problem: PracticeProblem;
  index: number;
  canWrongBank: boolean;
  onSaveWrong?: () => Promise<void>;
}) {
  const [attempt, setAttempt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [saved, setSaved] = useState(false);
  const attemptRef = useRef<HTMLTextAreaElement>(null);

  const diffColor =
    problem.difficulty === "easy"
      ? "bg-green-100 text-green-800"
      : problem.difficulty === "medium"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";

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
  }

  const isCorrect =
    submitted && attempt.trim() !== "" && normalize(attempt) === normalize(problem.answer);

  const shortcuts: { label: string; insert: string; caretOffset?: number; title: string }[] = [
    { label: "∫", insert: "∫ ", title: "Integral" },
    { label: "d/dx", insert: "d/dx ", title: "Derivative" },
    { label: "x²", insert: "²", title: "Square" },
    { label: "xⁿ", insert: "^", title: "Power" },
  ];

  return (
    <div className="rounded-lg border border-hair bg-paper p-5">
      <div className="flex items-start justify-between">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted">
          Problem {index + 1}
        </div>
        <span className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${diffColor}`}>
          {problem.difficulty}
        </span>
      </div>
      <div className="mt-2 whitespace-pre-wrap text-[15px] text-ink">
        <MathRender auto>{problem.prompt}</MathRender>
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
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleSubmit}
          disabled={submitted || !attempt.trim()}
          className="rounded-md border border-orange bg-orange px-3 py-1 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitted ? "Submitted" : "Submit"}
        </button>
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

      {submitted && attempt.trim() && (
        <div
          className={`mt-3 rounded-md border p-3 text-[13px] ${
            isCorrect
              ? "border-green-300 bg-green-50 text-green-800"
              : "border-amber-300 bg-amber-50 text-amber-800"
          }`}
        >
          {isCorrect
            ? "✓ Looks right — nice work. Compare with the walkthrough below."
            : "Not an exact match. Check the answer and walkthrough below — you may still be right in a different form."}
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
    </div>
  );
}
