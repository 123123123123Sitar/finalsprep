"use client";

import { useEffect, useMemo, useState } from "react";
import MathRender from "@/app/components/Math";
import type { Mcq } from "@/lib/mcqs/types";
import { PASS_THRESHOLD, pickQuestionsForAttempt } from "@/lib/mcqs";

type QuestionState = {
  mcq: Mcq;
  selected: number | null;
  revealed: boolean;
  locked: boolean;
  correct: boolean | null;
};

function buildStates(mcqs: Mcq[]): QuestionState[] {
  return mcqs.map((m) => ({
    mcq: m,
    selected: null,
    revealed: false,
    locked: false,
    correct: null,
  }));
}

function readAttemptIndex(lessonSlug: string): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(`quiz-attempt:${lessonSlug}`);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function readBestFraction(lessonSlug: string): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(`quiz-best:${lessonSlug}`);
  const n = raw ? parseFloat(raw) : NaN;
  return Number.isFinite(n) ? n : null;
}

export function Quiz({
  lessonSlug,
  pool,
  isCompleted,
  onPass,
}: {
  lessonSlug: string;
  pool: Mcq[];
  isCompleted: boolean;
  onPass: () => void;
}) {
  // Hydration-safe: start from attempt 0 on the server/first client render,
  // then swap to the persisted attempt once we're in the browser.
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [active, setActive] = useState<QuestionState[]>(() =>
    buildStates(pickQuestionsForAttempt(pool, 0))
  );
  const [bestFraction, setBestFraction] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const idx = readAttemptIndex(lessonSlug);
    setAttemptIndex(idx);
    setActive(buildStates(pickQuestionsForAttempt(pool, idx)));
    setBestFraction(readBestFraction(lessonSlug));
    setFinished(false);
    setPassed(false);
  }, [lessonSlug, pool]);

  const totalAnswered = active.filter((q) => q.locked).length;
  const correctCount = active.filter((q) => q.correct === true).length;
  const allAnswered = totalAnswered === active.length;
  const scoreFraction =
    active.length > 0 ? correctCount / active.length : 0;
  const needed = active.length
    ? Math.ceil(active.length * PASS_THRESHOLD)
    : 0;

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
        // Lock on correct only — wrong answer stays unlocked so the student
        // can try again in place for instant-feedback learning.
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

  function submitQuiz() {
    if (!allAnswered) return;
    const didPass = scoreFraction >= PASS_THRESHOLD;
    if (typeof window !== "undefined") {
      const prev = bestFraction ?? 0;
      const nextBest = Math.max(prev, scoreFraction);
      if (nextBest > prev) {
        window.localStorage.setItem(
          `quiz-best:${lessonSlug}`,
          String(nextBest)
        );
      }
      setBestFraction(nextBest);
    }
    setPassed(didPass);
    setFinished(true);
    if (didPass) onPass();
  }

  function retake() {
    const nextIdx = attemptIndex + 1;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        `quiz-attempt:${lessonSlug}`,
        String(nextIdx)
      );
    }
    setAttemptIndex(nextIdx);
    setActive(buildStates(pickQuestionsForAttempt(pool, nextIdx)));
    setFinished(false);
    setPassed(false);
  }

  if (finished) {
    const bestPct =
      bestFraction !== null ? Math.round(bestFraction * 100) : null;
    return (
      <div className="rounded-xl border border-hair bg-paper p-6">
        <div className="label">Quiz result</div>
        <h3 className="mt-1 font-serif text-2xl text-ink">
          {correctCount}/{active.length} correct ·{" "}
          {Math.round(scoreFraction * 100)}%
        </h3>
        {passed ? (
          <p className="mt-3 text-[15px] text-body">
            You passed! This lesson is marked complete. You can move on to
            the next lesson.
          </p>
        ) : (
          <p className="mt-3 text-[15px] text-body">
            You need {needed}/{active.length} ({Math.round(PASS_THRESHOLD * 100)}%) to
            advance. Review the lesson, then retake — you'll get a
            different set of questions.
          </p>
        )}
        {bestPct !== null && bestPct > Math.round(scoreFraction * 100) && (
          <div className="mt-3 text-[13px] text-muted">
            Best attempt so far: {bestPct}%.
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={retake} className="btn-ghost text-sm">
            {passed ? "Try a fresh set" : "Retake quiz"}
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
            Answer {needed}/{active.length} ({Math.round(PASS_THRESHOLD * 100)}%) correctly to
            complete this lesson.
          </h3>
          <div className="mt-1 text-[12px] text-muted">
            Attempt {attemptIndex + 1} — retakes draw different questions
            from a 15-question bank.
          </div>
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
            key={`${lessonSlug}-${attemptIndex}-${qIdx}-${q.mcq.id}`}
            className="rounded-xl border border-hair bg-paper p-5"
          >
            <div className="text-[15px] font-medium text-ink">
              <span className="mr-2 text-muted">{qIdx + 1}.</span>
              <MathRender auto>{q.mcq.question}</MathRender>
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
            ? `Score: ${correctCount}/${active.length} (${Math.round(scoreFraction * 100)}%)`
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
