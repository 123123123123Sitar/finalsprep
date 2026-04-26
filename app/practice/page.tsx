"use client";
import { useEffect, useMemo, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import PageLoader from "@/app/components/PageLoader";
import { useAuth } from "@/app/components/AuthProvider";
import { COURSES, type CourseSlug } from "@/lib/topics";
import { subscribeSelectedCourses } from "@/lib/selectedCourses";
import { getDb } from "@/lib/firebase";
import {
  PAST_FRQS,
  frqsForCourse,
  getFrqById,
  type PastFrq,
} from "@/lib/pastFrqs";
import { AP_EXAM_SPECS, scaledTimerMinutes } from "@/lib/apExamSpec";
import Markdown from "@/app/components/Markdown";
import CodeSandbox from "@/app/components/CodeSandbox";

const CSA_PLACEHOLDER = `// Label each part with a comment, e.g.
// (a)
public static int example(int[] arr) {
    // your code
    return 0;
}

// (b)
// ...
`;

type Tab = "exams" | "frqs";

export default function PracticePage() {
  const { user, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("exams");

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/signin?next=/practice";
    }
  }, [authLoading, user]);

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
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-6">
        <div className="label mb-3">Practice</div>
        <h1 className="font-serif text-[40px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[48px]">
          Drill before exam day.
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] text-muted">
          Generate a fresh AP-style mock exam at the real exam's pace, or work a
          past free-response question and have it graded against the official
          rubric.
        </p>

        {/* Tabs */}
        <div className="mt-8 border-b border-hair">
          <div data-tour="practice-tabs" className="flex gap-6">
            <TabButton active={tab === "exams"} onClick={() => setTab("exams")}>
              Exams
            </TabButton>
            <TabButton active={tab === "frqs"} onClick={() => setTab("frqs")}>
              FRQs
            </TabButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        {tab === "exams" ? <ExamsTab /> : <FrqsTab />}
      </section>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative -mb-px border-b-2 px-0 py-3 text-sm font-medium transition-colors ${
        active
          ? "border-orange text-ink"
          : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

// ─── EXAMS TAB ───────────────────────────────────────────────────────────────

type Difficulty = "easy" | "medium" | "hard";

type McqChoice = { letter: "A" | "B" | "C" | "D"; text: string };
type GenMcq = {
  prompt: string;
  choices: McqChoice[];
  correct: "A" | "B" | "C" | "D";
  explanation: string;
  difficulty: Difficulty;
  unit?: string;
};

type GenFrqPart = {
  label: string;
  prompt: string;
  rubric: string;
  points: number;
};

type GenFrq = {
  prompt: string;
  parts: GenFrqPart[];
  totalPoints: number;
  suggestedMinutes: number;
  difficulty: Difficulty;
  unit?: string;
};

type ExamPhase = "setup" | "loading" | "active" | "results";

function ExamsTab() {
  const { user, getIdToken, plan, planLoading } = useAuth();
  const isPaid = plan === "pro" || plan === "hacker";
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [courseSlug, setCourseSlug] = useState<CourseSlug | "">("");
  const [mcqCount, setMcqCount] = useState(10);
  const [frqCount, setFrqCount] = useState(1);
  const [timerMin, setTimerMin] = useState(20);
  const [useCustomTimer, setUseCustomTimer] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [phase, setPhase] = useState<ExamPhase>("setup");
  const [error, setError] = useState<string | null>(null);

  const [mcqs, setMcqs] = useState<GenMcq[]>([]);
  const [frqs, setFrqs] = useState<GenFrq[]>([]);
  const [mcqAnswers, setMcqAnswers] = useState<Array<"A" | "B" | "C" | "D" | "">>([]);
  const [frqResponses, setFrqResponses] = useState<string[]>([]);
  const [idx, setIdx] = useState(0); // index across combined [mcqs, frqs]
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const spec = courseSlug ? AP_EXAM_SPECS[courseSlug] : null;

  // When the user switches course, pre-fill with official AP defaults.
  useEffect(() => {
    if (!spec) return;
    setMcqCount(spec.mcq.count);
    setFrqCount(spec.frq.count);
    setTimerMin(spec.mcq.minutes + spec.frq.minutes);
    setUseCustomTimer(false);
  }, [courseSlug]);

  // Track timer: if the user hasn't overridden, rescale to match the chosen
  // question mix using the real AP per-question pacing.
  useEffect(() => {
    if (!spec || useCustomTimer) return;
    setTimerMin(scaledTimerMinutes(spec.slug, mcqCount, frqCount));
  }, [mcqCount, frqCount, spec, useCustomTimer]);

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    const unsub = subscribeSelectedCourses(db, user.uid, setEnrolled);
    return () => unsub();
  }, [user]);

  const courseChoices = useMemo(
    () =>
      enrolled.length > 0
        ? COURSES.filter((c) => enrolled.includes(c.slug))
        : COURSES,
    [enrolled]
  );

  // Timer countdown.
  useEffect(() => {
    if (phase !== "active" || timerMin === 0) return;
    setSecondsLeft(timerMin * 60);
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setPhase("results");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase, timerMin]);

  async function generateExam() {
    if (!courseSlug || !spec) {
      setError("Pick a course first.");
      return;
    }
    if (mcqCount + frqCount === 0) {
      setError("Include at least one MCQ or FRQ.");
      return;
    }
    setError(null);
    setPhase("loading");
    try {
      const token = await getIdToken();
      const res = await fetch("/api/practice/exam/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ courseSlug, mcqCount, frqCount, difficulty }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Couldn't generate exam.");
        setPhase("setup");
        return;
      }
      const gotMcqs: GenMcq[] = Array.isArray(data.mcqs) ? data.mcqs : [];
      const gotFrqs: GenFrq[] = Array.isArray(data.frqs) ? data.frqs : [];
      if (gotMcqs.length + gotFrqs.length === 0) {
        setError("No questions returned. Try again.");
        setPhase("setup");
        return;
      }
      setMcqs(gotMcqs);
      setFrqs(gotFrqs);
      setMcqAnswers(gotMcqs.map(() => "" as const));
      setFrqResponses(gotFrqs.map(() => ""));
      setIdx(0);
      setConfirmSubmit(false);
      setPhase("active");
    } catch (e: any) {
      setError(e?.message || "Network error.");
      setPhase("setup");
    }
  }

  const totalQuestions = mcqs.length + frqs.length;
  const isMcqIdx = (i: number) => i < mcqs.length;
  const frqIdx = (i: number) => i - mcqs.length;

  function isAnswered(i: number) {
    if (isMcqIdx(i)) return mcqAnswers[i] !== "";
    return frqResponses[frqIdx(i)]?.trim().length > 0;
  }

  function goTo(i: number) {
    if (i < 0 || i >= totalQuestions) return;
    setIdx(i);
    setConfirmSubmit(false);
  }

  function submitExam() {
    setPhase("results");
    setConfirmSubmit(false);
  }

  function restart() {
    setPhase("setup");
    setMcqs([]);
    setFrqs([]);
    setMcqAnswers([]);
    setFrqResponses([]);
    setIdx(0);
    setConfirmSubmit(false);
    setError(null);
  }

  if (!planLoading && !isPaid) {
    return (
      <div className="mt-8 rounded-xl border-2 border-orange/40 bg-orange-tint p-6">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-orange-ink">
          Pro feature
        </div>
        <h4 className="mt-2 font-serif text-2xl font-normal text-ink">
          Full-length practice exams are a Pro perk.
        </h4>
        <p className="mt-3 max-w-xl text-[15px] text-body">
          Exams are drawn from the full 11,000-question bank and weighted to
          match the official AP unit percentages. Free accounts can still
          work the past-FRQ tab and use lesson quizzes.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="/#price" className="btn-primary text-sm">
            Upgrade to Pro - $16/mo
          </a>
          <a href="/#price" className="btn-ghost text-sm">
            See all plans →
          </a>
        </div>
      </div>
    );
  }

  if (phase === "loading") {
    return (
      <div className="mt-10 rounded-xl border border-hair bg-paper p-10 text-center">
        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-hair border-t-orange" />
        <p className="mt-4 text-sm text-muted">
          {frqCount > 0
            ? `Assembling ${mcqCount} MCQ${mcqCount === 1 ? "" : "s"} and generating ${frqCount} FRQ${frqCount === 1 ? "" : "s"}…`
            : `Assembling ${mcqCount} MCQ${mcqCount === 1 ? "" : "s"} from the question bank…`}
        </p>
      </div>
    );
  }

  if (phase === "setup") {
    return (
      <div className="mt-8 space-y-6 rounded-xl border border-hair bg-paper p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink">Course</label>
          <select
            data-tour="practice-course"
            value={courseSlug}
            onChange={(e) => setCourseSlug(e.target.value as CourseSlug)}
            className="w-full rounded-md border border-hair bg-paper px-3 py-2 text-ink focus:border-orange focus:outline-none"
          >
            <option value="">- Select a course -</option>
            {courseChoices.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
          {enrolled.length === 0 && (
            <p className="mt-2 text-xs text-muted">
              You haven't enrolled in any courses yet.{" "}
              <a href="/study" className="text-orange hover:underline">
                Pick your AP courses →
              </a>
            </p>
          )}
        </div>

        {spec && (
          <div className="rounded-md border border-hair bg-offwhite p-3 text-[12px] text-muted">
            <span className="font-semibold text-ink">Official format:</span>{" "}
            {spec.mcq.count} MCQs in {spec.mcq.minutes} min
            {spec.frq.count > 0 && (
              <> · {spec.frq.count} FRQs in {spec.frq.minutes} min</>
            )}
            {spec.readingPeriodMinutes > 0 && (
              <> (incl. {spec.readingPeriodMinutes}-min reading period)</>
            )}
            . Defaults below match this.
          </div>
        )}

        <div data-tour="practice-mcq-slider" className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              MCQ count
            </label>
            <input
              type="number"
              min={0}
              max={spec ? Math.min(80, spec.mcq.count * 2) : 80}
              value={mcqCount}
              onChange={(e) => setMcqCount(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-md border border-hair bg-paper px-3 py-2 text-ink focus:border-orange focus:outline-none"
            />
            {spec && (
              <p className="mt-1 text-[11px] text-muted">
                Official: {spec.mcq.count}. Each MCQ allowed ~
                {spec.mcq.secondsPerQuestion}s on the real exam.
              </p>
            )}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              FRQ count
            </label>
            <input
              type="number"
              min={0}
              max={10}
              value={frqCount}
              onChange={(e) => setFrqCount(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-md border border-hair bg-paper px-3 py-2 text-ink focus:border-orange focus:outline-none"
              disabled={!!spec && spec.frq.count === 0}
            />
            {spec && (
              <p className="mt-1 text-[11px] text-muted">
                {spec.frq.count === 0
                  ? "This exam is MCQ-only officially. You can still add supplemental FRQs."
                  : `Official: ${spec.frq.count}.`}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-ink">
            Timer: <strong>{timerMin === 0 ? "Untimed" : `${timerMin} min`}</strong>
          </label>
          <div data-tour="practice-timer" className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setUseCustomTimer(false);
                if (spec)
                  setTimerMin(scaledTimerMinutes(spec.slug, mcqCount, frqCount));
              }}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                !useCustomTimer
                  ? "bg-orange text-white"
                  : "border border-hair bg-offwhite text-ink hover:border-orange"
              }`}
            >
              AP-pace (auto)
            </button>
            <button
              onClick={() => {
                setUseCustomTimer(true);
                setTimerMin(0);
              }}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                useCustomTimer && timerMin === 0
                  ? "bg-orange text-white"
                  : "border border-hair bg-offwhite text-ink hover:border-orange"
              }`}
            >
              Untimed
            </button>
            {useCustomTimer && timerMin !== 0 && (
              <input
                type="number"
                min={0}
                max={360}
                value={timerMin}
                onChange={(e) => setTimerMin(Math.max(0, Number(e.target.value) || 0))}
                className="w-24 rounded-md border border-hair bg-paper px-3 py-2 text-ink focus:border-orange focus:outline-none"
              />
            )}
            <button
              onClick={() => {
                setUseCustomTimer(true);
                setTimerMin(timerMin || 30);
              }}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                useCustomTimer && timerMin !== 0
                  ? "bg-orange text-white"
                  : "border border-hair bg-offwhite text-ink hover:border-orange"
              }`}
            >
              Custom (min)
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-ink">Difficulty</label>
          <div data-tour="practice-difficulty" className="flex gap-2">
            {(["easy", "medium", "hard"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`rounded-md px-4 py-2 capitalize transition-colors ${
                  difficulty === d
                    ? "bg-orange text-white"
                    : "border border-hair bg-offwhite text-ink hover:border-orange"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <button
          data-tour="practice-generate"
          onClick={generateExam}
          disabled={!courseSlug}
          className="w-full rounded-md bg-orange px-4 py-3 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Generate exam
        </button>
      </div>
    );
  }

  if (phase === "active" && totalQuestions > 0) {
    const answeredCount = Array.from({ length: totalQuestions }, (_, i) =>
      isAnswered(i) ? 1 : 0
    ).reduce<number>((a, b) => a + b, 0);
    const unansweredCount = totalQuestions - answeredCount;
    return (
      <div className="mt-8 space-y-5">
        {/* TOP BAR: timer + question navigator + submit */}
        <div className="rounded-xl border border-hair bg-paper p-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              {answeredCount}/{totalQuestions} answered
            </div>
            {timerMin > 0 && (
              <div
                className={`font-mono text-base font-semibold tabular-nums ${
                  secondsLeft < 60 ? "text-red-600" : "text-ink"
                }`}
              >
                {Math.floor(secondsLeft / 60)}:
                {String(secondsLeft % 60).padStart(2, "0")}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {Array.from({ length: totalQuestions }, (_, i) => {
              const current = i === idx;
              const answered = isAnswered(i);
              const mcq = isMcqIdx(i);
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${mcq ? "MCQ" : "FRQ"} ${
                    mcq ? i + 1 : frqIdx(i) + 1
                  }${answered ? " (answered)" : ""}`}
                  aria-current={current ? "step" : undefined}
                  className={`grid h-8 min-w-[2rem] place-items-center rounded-md border px-1.5 text-[11px] font-medium transition-colors ${
                    current
                      ? "border-orange bg-orange text-white"
                      : answered
                      ? "border-orange/40 bg-orange-tint text-orange-ink hover:border-orange"
                      : "border-hair bg-offwhite text-muted hover:border-orange hover:text-ink"
                  }`}
                >
                  {mcq ? i + 1 : `F${frqIdx(i) + 1}`}
                </button>
              );
            })}
            <div className="ml-auto">
              <button
                onClick={() =>
                  unansweredCount > 0 ? setConfirmSubmit(true) : submitExam()
                }
                className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink/90"
              >
                Submit exam
              </button>
            </div>
          </div>
        </div>

        {/* SUBMIT CONFIRMATION */}
        {confirmSubmit && (
          <div className="rounded-md border border-orange/40 bg-orange-tint p-4">
            <div className="text-sm text-orange-ink">
              You have <strong>{unansweredCount}</strong> unanswered question
              {unansweredCount === 1 ? "" : "s"}. Submit anyway?
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={submitExam}
                className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink/90"
              >
                Yes, submit
              </button>
              <button
                onClick={() => setConfirmSubmit(false)}
                className="rounded-md border border-hair bg-paper px-4 py-2 text-sm text-ink hover:border-orange"
              >
                Keep working
              </button>
            </div>
          </div>
        )}

        {/* QUESTION VIEW */}
        {isMcqIdx(idx) ? (
          <McqQuestionCard
            n={idx + 1}
            total={totalQuestions}
            q={mcqs[idx]}
            value={mcqAnswers[idx]}
            onChange={(letter) => {
              setMcqAnswers((prev) => {
                const next = [...prev];
                next[idx] = letter;
                return next;
              });
            }}
          />
        ) : (
          <FrqQuestionCard
            n={frqIdx(idx) + 1}
            totalFrq={frqs.length}
            q={frqs[frqIdx(idx)]}
            courseSlug={courseSlug as CourseSlug}
            value={frqResponses[frqIdx(idx)] || ""}
            onChange={(text) => {
              setFrqResponses((prev) => {
                const next = [...prev];
                next[frqIdx(idx)] = text;
                return next;
              });
            }}
          />
        )}

        {/* BOTTOM NAV */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => goTo(idx - 1)}
            disabled={idx === 0}
            className="rounded-md border border-hair bg-paper px-4 py-2 text-sm text-ink hover:border-orange disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>
          <button
            onClick={restart}
            className="text-xs text-muted hover:text-ink"
          >
            Exit exam
          </button>
          <button
            onClick={() => goTo(idx + 1)}
            disabled={idx === totalQuestions - 1}
            className="rounded-md border border-hair bg-paper px-4 py-2 text-sm text-ink hover:border-orange disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  // RESULTS
  const mcqCorrect = mcqs.filter((q, i) => mcqAnswers[i] === q.correct).length;
  const mcqPct =
    mcqs.length > 0 ? Math.round((mcqCorrect / mcqs.length) * 100) : 0;
  return (
    <div className="mt-8 space-y-8">
      <div>
        <div className="label mb-2">Results</div>
        <h2 className="font-serif text-3xl text-ink">Exam complete.</h2>
        {mcqs.length > 0 && (
          <p className="mt-2 text-sm text-muted">
            MCQ score: <strong className="text-ink">{mcqCorrect}/{mcqs.length}</strong>{" "}
            ({mcqPct}%). Self-grade your FRQs against the rubric below.
          </p>
        )}
      </div>

      {mcqs.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Multiple choice
          </h3>
          {mcqs.map((q, i) => {
            const picked = mcqAnswers[i];
            const right = picked === q.correct;
            return (
              <div
                key={`mcq-${i}`}
                className={`rounded-lg border p-4 ${
                  right
                    ? "border-green-300 bg-green-50"
                    : picked === ""
                    ? "border-hair bg-paper"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <div className="text-sm font-medium text-ink">Q{i + 1}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                    {q.difficulty}
                    {q.unit ? ` · ${q.unit}` : ""}
                  </div>
                </div>
                <Markdown className="space-y-2 text-[14px] leading-relaxed text-ink">
                  {q.prompt}
                </Markdown>
                <ul className="mt-2 space-y-1 text-[13px]">
                  {q.choices.map((c) => (
                    <li
                      key={c.letter}
                      className={`flex gap-2 ${
                        c.letter === q.correct
                          ? "font-semibold text-green-800"
                          : c.letter === picked
                          ? "text-red-800 line-through"
                          : "text-muted"
                      }`}
                    >
                      <span className="w-5 shrink-0">{c.letter}.</span>
                      <div className="min-w-0 flex-1">
                        <Markdown className="space-y-1 text-[13px] leading-relaxed">
                          {c.text}
                        </Markdown>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 text-[12px] text-muted">
                  Your answer: <strong>{picked || "skipped"}</strong> · Correct:{" "}
                  <strong>{q.correct}</strong>
                </div>
                {q.explanation && (
                  <div className="mt-2 rounded-md bg-paper/80 p-2">
                    <Markdown className="space-y-1 text-[12px] leading-relaxed text-body">
                      {q.explanation}
                    </Markdown>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {frqs.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Free response
          </h3>
          {frqs.map((f, i) => (
            <div key={`frq-${i}`} className="rounded-lg border border-hair bg-paper p-4">
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <div className="text-sm font-medium text-ink">
                  FRQ {i + 1} · {f.totalPoints} pts
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  {f.difficulty}
                  {f.unit ? ` · ${f.unit}` : ""}
                </div>
              </div>
              {f.prompt && (
                <Markdown className="space-y-2 text-[14px] leading-relaxed text-ink">
                  {f.prompt}
                </Markdown>
              )}
              <div className="mt-3 border-t border-hair pt-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Your response
                </div>
                <div className="mt-1 whitespace-pre-wrap text-[13px] text-body">
                  {frqResponses[i]?.trim() || "(skipped)"}
                </div>
              </div>
              <div className="mt-3 space-y-2 border-t border-hair pt-3">
                {f.parts.map((p) => (
                  <div key={p.label}>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-orange-ink">
                      {p.label} · {p.points} pt{p.points === 1 ? "" : "s"}
                    </div>
                    <Markdown className="space-y-1 text-[13px] leading-relaxed text-ink">
                      {p.prompt}
                    </Markdown>
                    <div className="mt-1 rounded-md bg-offwhite p-2">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                        Rubric
                      </div>
                      <Markdown className="mt-1 space-y-1 text-[12px] leading-relaxed text-muted">
                        {p.rubric}
                      </Markdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={restart}
          className="flex-1 rounded-md bg-orange px-4 py-3 font-medium text-white hover:opacity-90"
        >
          New exam
        </button>
      </div>
    </div>
  );
}

function McqQuestionCard({
  n,
  total,
  q,
  value,
  onChange,
}: {
  n: number;
  total: number;
  q: GenMcq;
  value: "A" | "B" | "C" | "D" | "";
  onChange: (letter: "A" | "B" | "C" | "D") => void;
}) {
  return (
    <>
      <div className="rounded-xl border border-hair bg-paper p-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="font-serif text-xl text-ink">
            Question {n}
            <span className="ml-2 text-sm text-muted">of {total}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
            <span>MCQ · {q.difficulty}</span>
            {q.unit && (
              <>
                <span className="text-dim">·</span>
                <span>{q.unit}</span>
              </>
            )}
          </div>
        </div>
        <Markdown className="space-y-3 text-[16px] leading-relaxed text-ink">
          {q.prompt}
        </Markdown>
      </div>

      <div className="space-y-2">
        {q.choices.map((c) => {
          const selected = value === c.letter;
          return (
            <button
              key={c.letter}
              onClick={() => onChange(c.letter)}
              className={`flex w-full items-start gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
                selected
                  ? "border-orange bg-orange-tint"
                  : "border-hair bg-paper hover:border-orange"
              }`}
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-semibold ${
                  selected
                    ? "border-orange bg-orange text-white"
                    : "border-hair bg-offwhite text-muted"
                }`}
              >
                {c.letter}
              </span>
              <div className="min-w-0 flex-1">
                <Markdown className="space-y-1 text-[14px] leading-relaxed text-ink">
                  {c.text}
                </Markdown>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function FrqQuestionCard({
  n,
  totalFrq,
  q,
  courseSlug,
  value,
  onChange,
}: {
  n: number;
  totalFrq: number;
  q: GenFrq;
  courseSlug: CourseSlug;
  value: string;
  onChange: (text: string) => void;
}) {
  const isCsa = courseSlug === "ap-cs-a";
  return (
    <>
      <div className="rounded-xl border border-hair bg-paper p-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="font-serif text-xl text-ink">
            FRQ {n}
            <span className="ml-2 text-sm text-muted">
              of {totalFrq} · {q.totalPoints} pts · ~{q.suggestedMinutes} min
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
            <span>{q.difficulty}</span>
            {q.unit && (
              <>
                <span className="text-dim">·</span>
                <span>{q.unit}</span>
              </>
            )}
          </div>
        </div>
        {q.prompt && (
          <Markdown className="space-y-3 text-[15px] leading-relaxed text-ink">
            {q.prompt}
          </Markdown>
        )}
        <div className="mt-4 space-y-3 border-t border-hair pt-4">
          {q.parts.map((p) => (
            <div key={p.label}>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-orange-ink">
                {p.label} · {p.points} pt{p.points === 1 ? "" : "s"}
              </div>
              <Markdown className="mt-1 space-y-2 text-[14px] leading-relaxed text-ink">
                {p.prompt}
              </Markdown>
            </div>
          ))}
        </div>
      </div>

      {isCsa ? (
        <CodeSandbox
          mode="java-trace"
          initialCode={CSA_PLACEHOLDER}
          value={value || CSA_PLACEHOLDER}
          onChange={onChange}
          height={320}
        />
      ) : (
        <div className="rounded-md border border-hair bg-offwhite p-3">
          <label className="mb-2 block text-xs font-medium text-muted">
            Your response (label each part, e.g. "(a) ...")
          </label>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`(a) ...\n(b) ...\n(c) ...`}
            rows={10}
            className="w-full rounded-md border border-hair bg-paper px-3 py-2 font-mono text-[13px] text-ink focus:border-orange focus:outline-none"
          />
        </div>
      )}
    </>
  );
}

// ─── FRQS TAB ────────────────────────────────────────────────────────────────

type GradedPart = {
  label: string;
  earned: number;
  possible: number;
  feedback: string;
};
type GradeResult = {
  totalEarned: number;
  totalPossible: number;
  parts: GradedPart[];
  overall: string;
};

function FrqsTab() {
  const { user, getIdToken, plan, planLoading } = useAuth();
  const isHacker = plan === "hacker";
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseSlug | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [hintLoading, setHintLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    const unsub = subscribeSelectedCourses(db, user.uid, setEnrolled);
    return () => unsub();
  }, [user]);

  const enrolledCourses = useMemo(
    () => COURSES.filter((c) => enrolled.includes(c.slug)),
    [enrolled]
  );

  const visible = useMemo(
    () => (selectedCourse ? frqsForCourse(selectedCourse) : []),
    [selectedCourse]
  );

  const active: PastFrq | null = activeId ? getFrqById(activeId) : null;

  if (!planLoading && !isHacker) {
    return (
      <div className="mt-8 rounded-xl border-2 border-orange/40 bg-orange-tint p-6">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-orange-ink">
          Hacker feature
        </div>
        <h4 className="mt-2 font-serif text-2xl font-normal text-ink">
          Past-FRQ practice is a Hacker perk.
        </h4>
        <p className="mt-3 max-w-xl text-[15px] text-body">
          Work real past AP free-response questions and get your response
          graded part-by-part against the official College Board rubric.
          Unlocked on the Hacker plan.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="/#price" className="btn-primary text-sm">
            Upgrade to Hacker - $29/mo
          </a>
          <a href="/#price" className="btn-ghost text-sm">
            See all plans →
          </a>
        </div>
      </div>
    );
  }

  // Reset response + grade when switching FRQ.
  useEffect(() => {
    setResponse("");
    setResult(null);
    setError(null);
    setHint(null);
  }, [activeId]);

  async function getHint() {
    if (!active) return;
    setError(null);
    setHintLoading(true);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/practice/frq/hint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ frqId: active.id, response }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Couldn't generate a hint.");
      } else {
        setHint(typeof data?.hint === "string" ? data.hint : null);
      }
    } catch (e: any) {
      setError(e?.message || "Network error.");
    } finally {
      setHintLoading(false);
    }
  }

  async function grade() {
    if (!active) return;
    if (response.trim().length < 10) {
      setError("Write a longer response before requesting a grade.");
      return;
    }
    setError(null);
    setGrading(true);
    setResult(null);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/practice/frq/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ frqId: active.id, response }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Couldn't grade response.");
      } else {
        setResult(data);
      }
    } catch (e: any) {
      setError(e?.message || "Network error.");
    } finally {
      setGrading(false);
    }
  }

  if (active) {
    return (
      <div className="mt-8 space-y-6">
        <button
          onClick={() => setActiveId(null)}
          className="text-xs text-muted hover:text-ink"
        >
          ← Back to FRQ list
        </button>

        <div className="rounded-xl border border-hair bg-paper p-6">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            {courseLabel(active.courseSlug)} · {active.year} · FRQ #{active.number} ·{" "}
            {active.totalPoints} pts
          </div>
          <h3 className="mt-1 font-serif text-2xl text-ink">{active.topic}</h3>
          {active.prompt && (
            <Markdown className="mt-3 space-y-2 text-[14px] leading-relaxed text-body">
              {active.prompt}
            </Markdown>
          )}
          <div className="mt-5 space-y-4 border-t border-hair pt-4">
            {active.parts.map((p) => (
              <div key={p.label}>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-orange-ink">
                  {p.label} · {p.points} pt{p.points === 1 ? "" : "s"}
                </div>
                <Markdown className="mt-1 space-y-1 text-[14px] leading-relaxed text-ink">
                  {p.prompt}
                </Markdown>
              </div>
            ))}
          </div>
          {active.source && (
            <div className="mt-4 text-[11px] italic text-dim">{active.source}</div>
          )}
        </div>

        {active.courseSlug === "ap-cs-a" ? (
          <CodeSandbox
            mode="java-trace"
            initialCode={CSA_PLACEHOLDER}
            value={response || CSA_PLACEHOLDER}
            onChange={setResponse}
            height={360}
          />
        ) : (
          <div className="rounded-md border border-hair bg-offwhite p-3">
            <label className="mb-2 block text-xs font-medium text-muted">
              Your response (label each part, e.g. "(a) ...")
            </label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder={`(a) Set up the integral as ...\n(b) Using the average value formula ...\n(c) ...`}
              rows={12}
              className="w-full rounded-md border border-hair bg-paper px-3 py-2 font-mono text-[13px] text-ink focus:border-orange focus:outline-none"
            />
          </div>
        )}

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={grade}
            disabled={grading || hintLoading}
            className="flex-1 rounded-md bg-orange px-4 py-3 font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {grading ? "Grading…" : "Grade my response"}
          </button>
          <button
            onClick={getHint}
            disabled={hintLoading || grading}
            title="Costs 50–100 tokens"
            className="rounded-md border border-orange/50 bg-orange-tint px-4 py-3 font-medium text-orange-ink hover:border-orange disabled:opacity-50 sm:flex-none"
          >
            {hintLoading ? "Thinking…" : "AI hint"}
          </button>
        </div>

        {hint && (
          <div className="rounded-md border border-orange/40 bg-orange-tint p-4">
            <div className="mb-1 flex items-center justify-between gap-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-orange-ink">
                AI hint
              </div>
              <button
                onClick={() => setHint(null)}
                aria-label="Dismiss hint"
                className="text-xs text-muted hover:text-ink"
              >
                ×
              </button>
            </div>
            <Markdown className="space-y-1 text-[14px] leading-relaxed text-ink">
              {hint}
            </Markdown>
          </div>
        )}

        {result && <GradeResultCard result={result} />}
      </div>
    );
  }

  if (!selectedCourse) {
    if (enrolledCourses.length === 0) {
      return (
        <div className="mt-8 rounded-md border border-dashed border-hair bg-offwhite p-6 text-sm text-muted">
          You haven't enrolled in any courses yet.{" "}
          <a href="/study" className="text-orange hover:underline">
            Pick your AP courses →
          </a>
        </div>
      );
    }
    return (
      <div className="mt-8 space-y-4">
        <div className="text-sm text-muted">Pick a course to see its past FRQs.</div>
        <ul className="divide-y divide-hair overflow-hidden rounded-xl border border-hair bg-paper">
          {enrolledCourses.map((c) => {
            const count = frqsForCourse(c.slug).length;
            return (
              <li key={c.slug}>
                <button
                  onClick={() => setSelectedCourse(c.slug)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-offwhite"
                >
                  <div className="min-w-0">
                    <div className="truncate text-[15px] text-ink">{c.title}</div>
                  </div>
                  <div className="shrink-0 text-xs text-muted">
                    {count} FRQ{count === 1 ? "" : "s"} →
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <button
        onClick={() => setSelectedCourse(null)}
        className="text-xs text-muted hover:text-ink"
      >
        ← Back to courses
      </button>

      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          {courseLabel(selectedCourse)}
        </div>
        <h3 className="mt-1 font-serif text-2xl text-ink">Past FRQs</h3>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-md border border-dashed border-hair bg-offwhite p-6 text-sm text-muted">
          No past FRQs for this course yet.
        </div>
      ) : (
        <ul className="divide-y divide-hair overflow-hidden rounded-xl border border-hair bg-paper">
          {visible.map((f) => (
            <li key={f.id}>
              <button
                onClick={() => setActiveId(f.id)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left hover:bg-offwhite"
              >
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {f.year} · FRQ #{f.number}
                  </div>
                  <div className="mt-0.5 truncate text-[15px] text-ink">{f.topic}</div>
                </div>
                <div className="shrink-0 self-center text-xs text-muted">
                  {f.totalPoints} pts →
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GradeResultCard({ result }: { result: GradeResult }) {
  const pct = Math.round((result.totalEarned / result.totalPossible) * 100);
  return (
    <div className="rounded-xl border border-orange/40 bg-orange-tint p-6">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="label text-orange-ink">Graded</div>
          <div className="font-serif text-3xl text-orange-ink">
            {result.totalEarned} / {result.totalPossible}
          </div>
        </div>
        <div className="text-right">
          <div className="font-serif text-4xl text-orange-ink">{pct}%</div>
        </div>
      </div>
      {result.overall && (
        <p className="mt-3 text-[14px] text-orange-ink">{result.overall}</p>
      )}
      <div className="mt-5 space-y-3 border-t border-orange/30 pt-4">
        {result.parts.map((p) => (
          <div key={p.label} className="rounded-md bg-paper/60 p-3">
            <div className="flex items-baseline justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-orange-ink">
                {p.label}
              </div>
              <div className="font-mono text-sm text-ink">
                {p.earned} / {p.possible}
              </div>
            </div>
            <p className="mt-1 text-[13px] text-body">{p.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function courseLabel(slug: CourseSlug): string {
  return COURSES.find((c) => c.slug === slug)?.shortTitle ?? slug;
}
