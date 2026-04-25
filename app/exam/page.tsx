"use client";
import { useEffect, useState, useMemo } from "react";
import SiteNav from "@/app/components/SiteNav";
import MathRender from "@/app/components/Math";
import { useAuth } from "@/app/components/AuthProvider";
import { subscribeSelectedCourses } from "@/lib/selectedCourses";
import { COURSES, unitsForCourse, type CourseSlug } from "@/lib/topics";
import { getDb } from "@/lib/firebase";
import { buildExam, type ExamProblem, type ExamAttempt } from "@/lib/mockExam";
import { saveExamResult } from "@/lib/examResults";
import PageLoader from "@/app/components/PageLoader";

type Phase = "setup" | "active" | "results";

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/\\left|\\right/g, "")
    .replace(/[{}\\]/g, "")
    .replace(/\s+/g, "");
}

export default function ExamPage() {
  const { user, loading: authLoading } = useAuth();
  const [phase, setPhase] = useState<Phase>("setup");
  const [selectedCourses, setSelectedCourses] = useState<string[] | null>(null);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<CourseSlug | "">("");
  const [questionCount, setQuestionCount] = useState(20);
  const [timerMinutes, setTimerMinutes] = useState(45);

  const [exam, setExam] = useState<ExamProblem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [attempt, setAttempt] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const coursesLoading = selectedCourses === null;
  const addedCourses = useMemo(
    () =>
      selectedCourses
        ? COURSES.filter((c) => selectedCourses.includes(c.slug))
        : [],
    [selectedCourses]
  );

  useEffect(() => {
    if (authLoading) {
      setSelectedCourses(null);
      return;
    }
    if (!user) {
      setSelectedCourses([]);
      return;
    }
    const db = getDb();
    if (!db) {
      setSelectedCourses([]);
      return;
    }
    setSelectedCourses(null);
    const unsub = subscribeSelectedCourses(db, user.uid, setSelectedCourses);
    return () => unsub();
  }, [user, authLoading]);

  useEffect(() => {
    if (phase !== "active" || timerMinutes === 0) return;
    const totalSeconds = timerMinutes * 60;
    setTimeLeft(totalSeconds);
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setPhase("results");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, timerMinutes]);

  // Persist exam result to Firestore when entering results phase
  useEffect(() => {
    if (phase !== "results" || !user || exam.length === 0) return;
    const correct = attempts.filter((a) => a.isCorrect).length;
    const percentage = Math.round((correct / exam.length) * 100);
    saveExamResult(user.uid, {
      courseSlug: selectedCourseSlug,
      score: correct,
      total: exam.length,
      percentage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function startExam() {
    if (!selectedCourseSlug) return;
    const questions = buildExam(selectedCourseSlug as CourseSlug, questionCount);
    setExam(questions);
    setCurrentQuestion(0);
    setAttempt("");
    setAttempts([]);
    setSubmitted(false);
    setPhase("active");
  }

  function handleSubmitAnswer() {
    if (!attempt.trim() || submitted) return;
    const problem = exam[currentQuestion];
    const isCorrect = normalize(attempt) === normalize(problem.answer);
    setAttempts((prev) => [
      ...prev,
      { problemIdx: currentQuestion, attempt, isCorrect },
    ]);
    setSubmitted(true);
  }

  function handleNext() {
    if (currentQuestion < exam.length - 1) {
      setCurrentQuestion((p) => p + 1);
      setAttempt("");
      setSubmitted(false);
    } else {
      setPhase("results");
    }
  }

  function handleSkip() {
    setAttempts((prev) => [
      ...prev,
      { problemIdx: currentQuestion, attempt: "", isCorrect: false },
    ]);
    handleNext();
  }

  if (authLoading || !user) {
    return (
      <main className="bg-paper">
        <SiteNav />
        <PageLoader />
      </main>
    );
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        {phase === "setup" && (
          <div className="space-y-8">
            <div>
              <div className="label mb-3">Mock Exam</div>
              <h1 className="font-serif text-4xl font-normal text-ink">
                Test yourself
              </h1>
              <p className="mt-3 max-w-xl text-[15px] text-muted">
                Generate a timed practice exam across your selected AP courses.
              </p>
            </div>

            <div className="space-y-6 rounded-lg border border-hair bg-paper p-6">
              <div>
                <label className="block text-sm font-medium text-ink mb-3">
                  Select course
                </label>
                {coursesLoading ? (
                  <div className="text-sm text-muted">Loading courses…</div>
                ) : addedCourses.length === 0 ? (
                  <div className="text-sm text-muted">
                    No courses selected yet.{" "}
                    <a href="/study" className="text-orange hover:underline">
                      Pick your AP courses →
                    </a>
                  </div>
                ) : (
                  <select
                    value={selectedCourseSlug}
                    onChange={(e) => setSelectedCourseSlug(e.target.value as CourseSlug)}
                    className="w-full rounded-md border border-hair bg-paper px-3 py-2 text-ink focus:border-orange focus:outline-none"
                  >
                    <option value="">- Select a course -</option>
                    {addedCourses.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-3">
                  Number of questions: <strong>{questionCount}</strong>
                </label>
                <div className="flex gap-2">
                  {[10, 20, 40].map((count) => (
                    <button
                      key={count}
                      onClick={() => setQuestionCount(count)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        questionCount === count
                          ? "bg-orange text-white"
                          : "border border-hair bg-offwhite text-ink hover:border-orange"
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-3">
                  Timer: <strong>{timerMinutes === 0 ? "None" : `${timerMinutes} min`}</strong>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[0, 20, 45, 90].map((min) => (
                    <button
                      key={min}
                      onClick={() => setTimerMinutes(min)}
                      className={`px-4 py-2 rounded-md transition-colors text-sm ${
                        timerMinutes === min
                          ? "bg-orange text-white"
                          : "border border-hair bg-offwhite text-ink hover:border-orange"
                      }`}
                    >
                      {min === 0 ? "Untimed" : `${min}m`}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startExam}
                disabled={!selectedCourseSlug}
                className="w-full rounded-md border border-orange bg-orange px-4 py-3 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Start Exam
              </button>
            </div>
          </div>
        )}

        {phase === "active" && exam.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">
                Question {currentQuestion + 1} of {exam.length}
              </h2>
              {timerMinutes > 0 && (
                <div
                  className={`text-lg font-semibold ${
                    timeLeft < 60 ? "text-red-600" : "text-ink"
                  }`}
                >
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
                </div>
              )}
            </div>

            <div className="w-full h-1 bg-hair rounded-full overflow-hidden">
              <div
                className="h-full bg-orange transition-all"
                style={{
                  width: `${((currentQuestion + 1) / exam.length) * 100}%`,
                }}
              />
            </div>

            <div className="rounded-lg border border-hair bg-paper p-6">
              <div className="mb-4 text-sm text-muted">
                {exam[currentQuestion].difficulty.toUpperCase()}
              </div>
              <div className="text-[16px] text-ink">
                <MathRender auto>{exam[currentQuestion].prompt}</MathRender>
              </div>
            </div>

            <div className="rounded-md border border-hair bg-offwhite p-3">
              <label className="block text-xs font-medium text-muted mb-2">
                Your answer
              </label>
              <textarea
                value={attempt}
                onChange={(e) => setAttempt(e.target.value)}
                disabled={submitted}
                placeholder="Work out your solution…"
                rows={4}
                className="w-full rounded-md border border-hair bg-paper px-3 py-2 text-ink focus:border-orange focus:outline-none disabled:opacity-60"
              />
            </div>

            {submitted && (
              <div
                className={`rounded-md border p-3 text-sm ${
                  attempts[attempts.length - 1]?.isCorrect
                    ? "border-green-300 bg-green-50 text-green-800"
                    : "border-red-300 bg-red-50 text-red-800"
                }`}
              >
                {attempts[attempts.length - 1]?.isCorrect
                  ? "✓ Correct!"
                  : "✗ Incorrect"}
              </div>
            )}

            <div className="flex gap-2">
              {!submitted && (
                <>
                  <button
                    onClick={handleSubmitAnswer}
                    className="flex-1 rounded-md border border-orange bg-orange px-4 py-2 font-medium text-white hover:opacity-90"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleSkip}
                    className="flex-1 rounded-md border border-hair bg-offwhite px-4 py-2 text-ink hover:border-orange"
                  >
                    Skip
                  </button>
                </>
              )}
              {submitted && (
                <button
                  onClick={handleNext}
                  className="w-full rounded-md border border-orange bg-orange px-4 py-2 font-medium text-white hover:opacity-90"
                >
                  {currentQuestion < exam.length - 1 ? "Next question" : "Finish exam"}
                </button>
              )}
            </div>
          </div>
        )}

        {phase === "results" && (
          <div className="space-y-8">
            <div>
              <div className="label mb-3">Results</div>
              <h1 className="font-serif text-4xl font-normal text-ink">
                {Math.round((attempts.filter((a) => a.isCorrect).length / exam.length) * 100)}%
              </h1>
              <p className="mt-2 text-[15px] text-muted">
                {attempts.filter((a) => a.isCorrect).length} of {exam.length} correct
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-ink">Review answers</h3>
              {exam.map((problem, idx) => {
                const myAttempt = attempts.find((a) => a.problemIdx === idx);
                return (
                  <div
                    key={idx}
                    className="rounded-lg border border-hair bg-paper p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-ink">
                        Question {idx + 1}
                      </div>
                      <div
                        className={`text-sm font-semibold ${
                          myAttempt?.isCorrect
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {myAttempt?.isCorrect ? "✓" : "✗"}
                      </div>
                    </div>
                    <div className="text-[13px] text-ink mb-2">
                      <MathRender auto>{problem.prompt}</MathRender>
                    </div>
                    <div className="text-xs text-muted">
                      Your answer: {myAttempt?.attempt || "(skipped)"}
                    </div>
                    {!myAttempt?.isCorrect && (
                      <div className="mt-2 text-xs text-muted">
                        Correct: <MathRender auto>{problem.answer}</MathRender>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <a
                href="/exam"
                className="flex-1 rounded-md border border-orange bg-orange px-4 py-3 text-center font-medium text-white hover:opacity-90"
              >
                Try again
              </a>
              <a
                href="/study"
                className="flex-1 rounded-md border border-hair bg-offwhite px-4 py-3 text-center font-medium text-ink hover:border-orange"
              >
                Back to study
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
