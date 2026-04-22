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
          Generate a fresh AP-style mock exam, or work a past free-response
          question and have it graded against the official rubric.
        </p>

        {/* Tabs */}
        <div className="mt-8 border-b border-hair">
          <div className="flex gap-6">
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
type GenQuestion = { prompt: string; answer: string; difficulty: Difficulty; unit?: string };
type ExamPhase = "setup" | "loading" | "active" | "results";

function ExamsTab() {
  const { user, getIdToken } = useAuth();
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [courseSlug, setCourseSlug] = useState<CourseSlug | "">("");
  const [count, setCount] = useState<5 | 10 | 20>(10);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [timerMin, setTimerMin] = useState(45);
  const [phase, setPhase] = useState<ExamPhase>("setup");
  const [error, setError] = useState<string | null>(null);

  const [questions, setQuestions] = useState<GenQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

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
    if (!courseSlug) {
      setError("Pick a course first.");
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
        body: JSON.stringify({ courseSlug, count, difficulty }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Couldn't generate exam.");
        setPhase("setup");
        return;
      }
      setQuestions(data.questions);
      setIdx(0);
      setResponses(data.questions.map(() => ""));
      setConfirmSubmit(false);
      setPhase("active");
    } catch (e: any) {
      setError(e?.message || "Network error.");
      setPhase("setup");
    }
  }

  function updateAnswer(text: string) {
    setResponses((prev) => {
      const next = [...prev];
      next[idx] = text;
      return next;
    });
  }

  function goTo(i: number) {
    if (i < 0 || i >= questions.length) return;
    setIdx(i);
    setConfirmSubmit(false);
  }

  function submitExam() {
    setPhase("results");
    setConfirmSubmit(false);
  }

  function restart() {
    setPhase("setup");
    setQuestions([]);
    setResponses([]);
    setIdx(0);
    setConfirmSubmit(false);
    setError(null);
  }

  if (phase === "loading") {
    return (
      <div className="mt-10 rounded-xl border border-hair bg-paper p-10 text-center">
        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-hair border-t-orange" />
        <p className="mt-4 text-sm text-muted">
          Generating {count} questions… usually 5–15 seconds.
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

        <div>
          <label className="mb-2 block text-sm font-medium text-ink">
            Number of questions
          </label>
          <div className="flex gap-2">
            {[5, 10, 20].map((n) => (
              <button
                key={n}
                onClick={() => setCount(n as 5 | 10 | 20)}
                className={`rounded-md px-4 py-2 transition-colors ${
                  count === n
                    ? "bg-orange text-white"
                    : "border border-hair bg-offwhite text-ink hover:border-orange"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-ink">Difficulty</label>
          <div className="flex gap-2">
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

        <div>
          <label className="mb-2 block text-sm font-medium text-ink">
            Timer: <strong>{timerMin === 0 ? "None" : `${timerMin} min`}</strong>
          </label>
          <div className="flex flex-wrap gap-2">
            {[0, 20, 45, 90].map((m) => (
              <button
                key={m}
                onClick={() => setTimerMin(m)}
                className={`rounded-md px-4 py-2 text-sm transition-colors ${
                  timerMin === m
                    ? "bg-orange text-white"
                    : "border border-hair bg-offwhite text-ink hover:border-orange"
                }`}
              >
                {m === 0 ? "Untimed" : `${m}m`}
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
          onClick={generateExam}
          disabled={!courseSlug}
          className="w-full rounded-md bg-orange px-4 py-3 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Generate exam
        </button>
        <p className="text-xs text-muted">
          Costs daily tokens (then bonus tokens). A 10-question exam typically
          runs ~600–900 tokens.
        </p>
      </div>
    );
  }

  if (phase === "active" && questions.length > 0) {
    const q = questions[idx];
    const answeredCount = responses.filter((r) => r.trim().length > 0).length;
    const unansweredCount = questions.length - answeredCount;
    const isAnswered = (i: number) => responses[i]?.trim().length > 0;
    return (
      <div className="mt-8 space-y-5">
        {/* TOP BAR: timer + question navigator + submit */}
        <div className="rounded-xl border border-hair bg-paper p-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              {answeredCount}/{questions.length} answered
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
            {questions.map((_, i) => {
              const current = i === idx;
              const answered = isAnswered(i);
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to question ${i + 1}${
                    answered ? " (answered)" : ""
                  }`}
                  aria-current={current ? "step" : undefined}
                  className={`grid h-8 w-8 place-items-center rounded-md border text-xs font-medium transition-colors ${
                    current
                      ? "border-orange bg-orange text-white"
                      : answered
                      ? "border-orange/40 bg-orange-tint text-orange-ink hover:border-orange"
                      : "border-hair bg-offwhite text-muted hover:border-orange hover:text-ink"
                  }`}
                >
                  {i + 1}
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
        <div className="rounded-xl border border-hair bg-paper p-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-serif text-xl text-ink">
              Question {idx + 1}
              <span className="ml-2 text-sm text-muted">
                of {questions.length}
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
          <div className="whitespace-pre-wrap text-[16px] leading-relaxed text-ink">
            {q.prompt}
          </div>
        </div>

        <div className="rounded-md border border-hair bg-offwhite p-3">
          <label className="mb-2 block text-xs font-medium text-muted">
            Your work
          </label>
          <textarea
            value={responses[idx] || ""}
            onChange={(e) => updateAnswer(e.target.value)}
            placeholder="Show your work and final answer…"
            rows={6}
            className="w-full rounded-md border border-hair bg-paper px-3 py-2 text-ink focus:border-orange focus:outline-none"
          />
        </div>

        {/* BOTTOM NAV: previous / next */}
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
            disabled={idx === questions.length - 1}
            className="rounded-md border border-hair bg-paper px-4 py-2 text-sm text-ink hover:border-orange disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  // results
  return (
    <div className="mt-8 space-y-8">
      <div>
        <div className="label mb-2">Results</div>
        <h2 className="font-serif text-3xl text-ink">Exam complete.</h2>
        <p className="mt-2 text-sm text-muted">
          Self-grade your responses against the model answers below.
        </p>
      </div>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="rounded-lg border border-hair bg-paper p-4">
            <div className="mb-2 text-sm font-medium text-ink">
              Question {i + 1}
            </div>
            <div className="whitespace-pre-wrap text-[13px] text-ink">
              {q.prompt}
            </div>
            <div className="mt-3 whitespace-pre-wrap text-xs text-muted">
              Your answer: {responses[i]?.trim() || "(skipped)"}
            </div>
            <div className="mt-1 whitespace-pre-wrap text-xs text-orange-ink">
              Model answer: {q.answer}
            </div>
          </div>
        ))}
      </div>
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
  const { getIdToken } = useAuth();
  const [filterCourse, setFilterCourse] = useState<CourseSlug | "all">("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (filterCourse === "all") return PAST_FRQS;
    return frqsForCourse(filterCourse);
  }, [filterCourse]);

  const active: PastFrq | null = activeId ? getFrqById(activeId) : null;

  // Reset response + grade when switching FRQ.
  useEffect(() => {
    setResponse("");
    setResult(null);
    setError(null);
  }, [activeId]);

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
            <p className="mt-3 whitespace-pre-wrap text-[14px] leading-relaxed text-body">
              {active.prompt}
            </p>
          )}
          <div className="mt-5 space-y-4 border-t border-hair pt-4">
            {active.parts.map((p) => (
              <div key={p.label}>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-orange-ink">
                  {p.label} · {p.points} pt{p.points === 1 ? "" : "s"}
                </div>
                <div className="mt-1 whitespace-pre-wrap text-[14px] text-ink">
                  {p.prompt}
                </div>
              </div>
            ))}
          </div>
          {active.source && (
            <div className="mt-4 text-[11px] italic text-dim">{active.source}</div>
          )}
        </div>

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

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={grade}
            disabled={grading}
            className="flex-1 rounded-md bg-orange px-4 py-3 font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {grading ? "Grading…" : "Grade my response"}
          </button>
        </div>

        {result && <GradeResultCard result={result} />}
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm text-muted">Course:</label>
        <select
          value={filterCourse}
          onChange={(e) =>
            setFilterCourse(e.target.value === "all" ? "all" : (e.target.value as CourseSlug))
          }
          className="rounded-md border border-hair bg-paper px-3 py-1.5 text-sm text-ink focus:border-orange focus:outline-none"
        >
          <option value="all">All courses</option>
          {Array.from(new Set(PAST_FRQS.map((f) => f.courseSlug))).map((slug) => (
            <option key={slug} value={slug}>
              {courseLabel(slug)}
            </option>
          ))}
        </select>
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
                    {courseLabel(f.courseSlug)} · {f.year} · FRQ #{f.number}
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
