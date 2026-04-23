"use client";

import { useMemo, useState } from "react";
import MathRender from "@/app/components/Math";
import type { Mcq } from "@/lib/mcqs/types";
import { PASS_THRESHOLD, PRIMARY_COUNT } from "@/lib/mcqs";

type QuestionState = {
  mcq: Mcq;
  selected: number | null;
  revealed: boolean;
  locked: boolean;
  correct: boolean | null;
};

function buildInitial(pool: Mcq[]): {
  active: QuestionState[];
  swapPool: Mcq[];
} {
  const primary = pool.slice(0, PRIMARY_COUNT);
  const swapPool = pool.slice(PRIMARY_COUNT);
  return {
    active: primary.map((m) => ({
      mcq: m,
      selected: null,
      revealed: false,
      locked: false,
      correct: null,
    })),
    swapPool,
  };
}

export function Quiz({
  lessonSlug,
  pool,
  isCompleted,
  onPass,
  onRetake,
}: {
  lessonSlug: string;
  pool: Mcq[];
  isCompleted: boolean;
  onPass: () => void;
  onRetake?: () => void;
}) {
  const initial = useMemo(() => buildInitial(pool), [pool, lessonSlug]);
  const [active, setActive] = useState<QuestionState[]>(initial.active);
  const [swapPool, setSwapPool] = useState<Mcq[]>(initial.swapPool);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);

  const totalAnswered = active.filter((q) => q.locked).length;
  const correctCount = active.filter((q) => q.correct === true).length;
  const allAnswered = totalAnswered === active.length;
  const scorePct = active.length > 0 ? correctCount / active.length : 0;
  const passThreshold = PASS_THRESHOLD;
  const needed = Math.ceil(active.length * passThreshold);

  function selectOption(qIdx: number, optIdx: number) {
    setActive((prev) =>
      prev.map((q, i) =>
        i === qIdx && !q.locked ? { ...q, selected: optIdx } : q
      )
    );
  }

  function checkAnswer(qIdx: number) {
    setActive((prev) =>
      prev.map((q, i) => {
        if (i !== qIdx || q.locked || q.selected === null) return q;
        const correct = q.selected === q.mcq.correctIndex;
        return { ...q, revealed: true, locked: correct, correct };
      })
    );
  }

  function tryAgain(qIdx: number) {
    setActive((prev) =>
      prev.map((q, i) =>
        i === qIdx
          ? { ...q, selected: null, revealed: false, correct: null }
          : q
      )
    );
  }

  function swapQuestion(qIdx: number) {
    setSwapPool((prevPool) => {
      if (prevPool.length === 0) return prevPool;
      const [replacement, ...rest] = prevPool;
      setActive((prev) =>
        prev.map((q, i) =>
          i === qIdx
            ? {
                mcq: replacement,
                selected: null,
                revealed: false,
                locked: false,
                correct: null,
              }
            : q
        )
      );
      return rest;
    });
  }

  function submitQuiz() {
    if (!allAnswered) return;
    const pct = correctCount / active.length;
    const didPass = pct >= passThreshold;
    setPassed(didPass);
    setFinished(true);
    if (didPass) onPass();
  }

  function retake() {
    const fresh = buildInitial(pool);
    setActive(fresh.active);
    setSwapPool(fresh.swapPool);
    setFinished(false);
    setPassed(false);
    onRetake?.();
  }

  if (finished) {
    return (
      <div className="rounded-xl border border-hair bg-paper p-6">
        <div className="label">Quiz result</div>
        <h3 className="mt-1 font-serif text-2xl text-ink">
          {correctCount}/{active.length} correct ·{" "}
          {Math.round(scorePct * 100)}%
        </h3>
        {passed ? (
          <p className="mt-3 text-[15px] text-body">
            You passed! This lesson is marked complete. You can move on to the
            next lesson.
          </p>
        ) : (
          <p className="mt-3 text-[15px] text-body">
            You need at least {Math.round(passThreshold * 100)}% (
            {needed}/{active.length}) to advance. Take another pass at the
            lesson and retake the quiz.
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={retake} className="btn-ghost text-sm">
            {passed ? "Take again" : "Retake quiz"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="label">Unit quiz</div>
          <h3 className="mt-1 font-serif text-xl text-ink">
            Answer at least {needed}/{active.length} ({Math.round(passThreshold * 100)}%) to
            complete this lesson.
          </h3>
        </div>
        <div className="text-[13px] text-muted">
          {totalAnswered}/{active.length} answered
        </div>
      </div>

      {isCompleted && (
        <div className="rounded-md border border-green-600/30 bg-green-50 p-3 text-[13px] text-green-800">
          You've already completed this lesson. You can retake the quiz any
          time to review.
        </div>
      )}

      <ol className="space-y-5">
        {active.map((q, qIdx) => (
          <li
            key={`${lessonSlug}-${qIdx}-${q.mcq.id}`}
            className="rounded-xl border border-hair bg-paper p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-[15px] font-medium text-ink">
                <span className="mr-2 text-muted">{qIdx + 1}.</span>
                <MathRender auto>{q.mcq.question}</MathRender>
              </div>
              {!q.locked && swapPool.length > 0 && (
                <button
                  onClick={() => swapQuestion(qIdx)}
                  className="shrink-0 text-[12px] text-muted underline hover:text-ink"
                  title="Swap in a different question"
                >
                  Swap
                </button>
              )}
            </div>
            <ul className="mt-3 space-y-2">
              {q.mcq.options.map((opt, optIdx) => {
                const isSelected = q.selected === optIdx;
                const isCorrectOpt = optIdx === q.mcq.correctIndex;
                const showCorrect = q.revealed && isCorrectOpt;
                const showWrong =
                  q.revealed && isSelected && !isCorrectOpt;
                return (
                  <li key={optIdx}>
                    <button
                      onClick={() => selectOption(qIdx, optIdx)}
                      disabled={q.locked}
                      className={
                        "w-full rounded-md border px-3 py-2 text-left text-[14px] transition " +
                        (showCorrect
                          ? "border-green-600/60 bg-green-50 text-green-900"
                          : showWrong
                          ? "border-red-500/60 bg-red-50 text-red-900"
                          : isSelected
                          ? "border-ink/80 bg-offwhite text-ink"
                          : "border-hair bg-paper text-body hover:border-ink/40") +
                        (q.locked && !showCorrect && !showWrong
                          ? " opacity-60"
                          : "")
                      }
                    >
                      <span className="mr-2 font-mono text-[12px] text-muted">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <MathRender auto>{opt}</MathRender>
                    </button>
                  </li>
                );
              })}
            </ul>
            {q.revealed && (
              <div
                className={
                  "mt-3 rounded-md border p-3 text-[13px] " +
                  (q.correct
                    ? "border-green-600/30 bg-green-50 text-green-900"
                    : "border-red-500/30 bg-red-50 text-red-900")
                }
              >
                <div className="font-medium">
                  {q.correct ? "Correct." : "Not quite."}
                </div>
                <div className="mt-1 text-body">
                  <MathRender auto>{q.mcq.explanation}</MathRender>
                </div>
              </div>
            )}
            {!q.locked && (
              <div className="mt-3 flex flex-wrap gap-2">
                {!q.revealed ? (
                  <button
                    onClick={() => checkAnswer(qIdx)}
                    disabled={q.selected === null}
                    className="rounded-md bg-ink px-3 py-1.5 text-[13px] font-medium text-paper disabled:opacity-40"
                  >
                    Check
                  </button>
                ) : (
                  <button
                    onClick={() => tryAgain(qIdx)}
                    className="rounded-md border border-hair bg-paper px-3 py-1.5 text-[13px] font-medium text-ink hover:border-ink/40"
                  >
                    Try again
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className="flex items-center justify-between border-t border-hair pt-5">
        <div className="text-[13px] text-muted">
          {allAnswered
            ? `Score: ${correctCount}/${active.length} (${Math.round(scorePct * 100)}%)`
            : "Answer every question to submit."}
        </div>
        <button
          onClick={submitQuiz}
          disabled={!allAnswered}
          className="rounded-md bg-ink px-4 py-2 text-[14px] font-medium text-paper disabled:opacity-40"
        >
          Submit quiz
        </button>
      </div>
    </div>
  );
}
