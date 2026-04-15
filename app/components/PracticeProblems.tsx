"use client";
import { useState } from "react";
import type { PracticeProblem } from "@/lib/practice/types";
import MathRender from "./Math";

export default function PracticeProblems({
  problems,
}: {
  problems: PracticeProblem[];
}) {
  if (!problems || problems.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-hair bg-offwhite p-6 text-sm text-muted">
        Practice problems coming soon for this unit.
      </div>
    );
  }
  return (
    <div className="max-w-3xl space-y-6">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
        Practice problems ({problems.length})
      </div>
      {problems.map((p, i) => (
        <ProblemCard key={i} problem={p} index={i} />
      ))}
    </div>
  );
}

function ProblemCard({
  problem,
  index,
}: {
  problem: PracticeProblem;
  index: number;
}) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

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
