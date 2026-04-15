"use client";
import { useState } from "react";
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
  const canWrongBank = !!user && plan !== "free";

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
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [saved, setSaved] = useState(false);

  const diffColor =
    problem.difficulty === "easy"
      ? "bg-green-100 text-green-800"
      : problem.difficulty === "medium"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="rounded-lg border border-hair bg-white p-5">
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
      <div className="mt-4 flex flex-wrap gap-2">
        {problem.hint && (
          <button
            onClick={() => setShowHint((x) => !x)}
            className="rounded-md border border-hair bg-offwhite px-3 py-1 text-xs text-ink hover:border-orange"
          >
            {showHint ? "Hide hint" : "Hint"}
          </button>
        )}
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
