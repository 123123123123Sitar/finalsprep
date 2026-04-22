"use client";
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";
import { listWrongBank, type WrongBankEntry } from "@/lib/wrongBank";
import { listExamResults, type ExamResult } from "@/lib/examResults";
import { subscribeSelectedCourses } from "@/lib/selectedCourses";
import { subscribeCompletedSlugs } from "@/lib/progress";
import { COURSES } from "@/lib/topics";
import {
  buildActivityMap,
  getHeatmapDays,
  computeDifficultyMastery,
  computeWeakTopics,
  predictApScore,
  computeNextActions,
  type HistoryEntry,
  type WeakTopic,
  type NextAction,
} from "@/lib/insights";
import PageLoader from "@/app/components/PageLoader";

export default function InsightsPage() {
  const { user, loading, plan, planLoading, streak } = useAuth();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [wrongBank, setWrongBank] = useState<WrongBankEntry[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/signin?next=/insights";
    }
  }, [loading, user]);

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    (async () => {
      try {
        const snap = await getDocs(
          query(
            collection(db, "users", user.uid, "aiHistory"),
            orderBy("createdAt", "desc"),
            limit(500)
          )
        );
        setHistory(
          snap.docs.map((d) => {
            const data = d.data() as any;
            return {
              kind: data.kind,
              tokens: data.tokens,
              createdAt:
                data.createdAt?.toMillis?.() ||
                (typeof data.createdAt === "number"
                  ? data.createdAt
                  : Date.now()),
            };
          })
        );
      } catch {}
      const [wb, exams] = await Promise.all([
        listWrongBank(user.uid),
        listExamResults(user.uid),
      ]);
      setWrongBank(wb);
      setExamResults(exams);
      setLoaded(true);
    })();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    const u1 = subscribeSelectedCourses(db, user.uid, setSelectedCourses);
    const u2 = subscribeCompletedSlugs(db, user.uid, setCompletedSlugs);
    return () => {
      u1();
      u2();
    };
  }, [user]);

  const activityMap = useMemo(
    () => buildActivityMap(history, wrongBank, examResults),
    [history, wrongBank, examResults]
  );
  const mastery = useMemo(
    () => computeDifficultyMastery(selectedCourses),
    [selectedCourses, loaded]
  );
  const weakTopics = useMemo(() => computeWeakTopics(wrongBank), [wrongBank]);
  const actions = useMemo(
    () =>
      computeNextActions({
        wrongBankCount: wrongBank.length,
        completedSlugs,
        selectedCourses,
        examResults,
      }),
    [wrongBank.length, completedSlugs, selectedCourses, examResults]
  );

  if (loading || !user || planLoading) {
    return (
      <main className="bg-paper">
        <SiteNav />
        <PageLoader />
      </main>
    );
  }

  if (plan === "learner") {
    return (
      <main className="bg-paper text-body">
        <SiteNav />
        <section className="mx-auto max-w-xl px-6 py-20">
          <div className="label mb-3">Insights</div>
          <h1 className="font-serif text-4xl font-normal text-ink">
            See how you study.
          </h1>
          <p className="mt-3 text-[15px] text-muted">
            Insights is a Pro feature. Upgrade to see score predictions,
            weak spots, and your activity heatmap.
          </p>
          <a href="/#price" className="btn-primary mt-8 inline-block">
            See Pro plans →
          </a>
        </section>
      </main>
    );
  }

  const now = Date.now();
  const d7 = now - 7 * 24 * 60 * 60 * 1000;
  const last7 = history.filter((h) => (h.createdAt || 0) >= d7);
  const tokens7 = last7.reduce((s, h) => s + (h.tokens || 0), 0);
  const chats7 = last7.filter((h) => h.kind === "chat").length;

  return (
    <main className="bg-paper text-body">
      <SiteNav />
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="label mb-3">Insights</div>
        <h1 className="font-serif text-4xl font-normal text-ink">
          How you've been studying.
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Current streak" value={streak?.current ?? 0} suffix="days" />
          <Stat label="Longest streak" value={streak?.longest ?? 0} suffix="days" />
          <Stat label="Chats, 7d" value={chats7} />
          <Stat label="Tokens, 7d" value={tokens7.toLocaleString()} />
        </div>

        {actions.length > 0 && (
          <NextActionsSection actions={actions} />
        )}

        <ScorePredictorSection
          selectedCourses={selectedCourses}
          completedSlugs={completedSlugs}
          wrongBank={wrongBank}
          examResults={examResults}
        />

        <ExamHistorySection examResults={examResults} />

        <DifficultyMasterySection mastery={mastery} />

        <WeakTopicsSection weakTopics={weakTopics} />

        <ActivityHeatmapSection activityMap={activityMap} />

        <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
          <div className="label mb-3">Wrong-answer bank</div>
          <p className="text-[15px] text-body">
            You have{" "}
            <strong className="text-ink">{wrongBank.length}</strong> problem
            {wrongBank.length === 1 ? "" : "s"} saved for review.{" "}
            <a href="/review" className="text-orange hover:underline">
              Review them →
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

function NextActionsSection({ actions }: { actions: NextAction[] }) {
  return (
    <div className="mt-8">
      <div className="label mb-3">Next actions</div>
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((a, i) => (
          <a
            key={i}
            href={a.href}
            className="rounded-lg border border-hair bg-paper p-4 transition-colors hover:border-orange"
          >
            <div className="font-medium text-ink">{a.label}</div>
            <div className="mt-1 text-[13px] text-muted">{a.description}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ScorePredictorSection({
  selectedCourses,
  completedSlugs,
  wrongBank,
  examResults,
}: {
  selectedCourses: string[];
  completedSlugs: Set<string>;
  wrongBank: WrongBankEntry[];
  examResults: ExamResult[];
}) {
  if (selectedCourses.length === 0) return null;
  return (
    <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
      <div className="label mb-3">Predicted AP scores</div>
      <div className="grid gap-3 sm:grid-cols-2">
        {selectedCourses.map((slug) => {
          const course = COURSES.find((c) => c.slug === slug);
          if (!course) return null;
          const pred = predictApScore(
            slug,
            completedSlugs,
            wrongBank,
            examResults
          );
          return (
            <div
              key={slug}
              className="rounded-md border border-hair bg-offwhite p-4"
            >
              <div className="flex items-baseline justify-between">
                <div className="font-medium text-ink">{course.shortTitle}</div>
                <div className="font-serif text-3xl text-orange">
                  {pred.score}
                </div>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-hair">
                <div
                  className="h-full rounded-full bg-orange"
                  style={{ width: `${(pred.score / 5) * 100}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-muted">
                <span>Confidence: {Math.round(pred.confidence * 100)}%</span>
                <span>
                  L {pred.breakdown.completion}% · P{" "}
                  {pred.breakdown.practice}% · E{pred.breakdown.exam}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 text-[11px] text-muted">
        Estimate blends lesson completion, practice accuracy, and mock-exam
        scores. Take more mock exams to raise confidence.
      </div>
    </div>
  );
}

function ExamHistorySection({ examResults }: { examResults: ExamResult[] }) {
  const sorted = [...examResults].sort((a, b) => a.createdAt - b.createdAt);
  if (sorted.length === 0) {
    return (
      <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
        <div className="label mb-3">Mock exam history</div>
        <p className="text-[13px] text-muted">
          No mock exams taken yet.{" "}
          <a href="/exam" className="text-orange hover:underline">
            Take your first exam →
          </a>
        </p>
      </div>
    );
  }

  const w = 600;
  const h = 160;
  const pad = 30;
  const xs = sorted.map((_, i) => pad + (i * (w - 2 * pad)) / Math.max(1, sorted.length - 1));
  const ys = sorted.map((e) => h - pad - (e.percentage / 100) * (h - 2 * pad));
  const points = xs.map((x, i) => `${x},${ys[i]}`).join(" ");

  return (
    <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
      <div className="label mb-3">Mock exam history</div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: 200 }}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((pct) => {
            const y = h - pad - (pct / 100) * (h - 2 * pad);
            return (
              <g key={pct}>
                <line
                  x1={pad}
                  x2={w - pad}
                  y1={y}
                  y2={y}
                  stroke="rgb(var(--hair))"
                  strokeWidth="1"
                />
                <text
                  x={pad - 6}
                  y={y + 3}
                  fontSize="10"
                  fill="rgb(var(--muted))"
                  textAnchor="end"
                >
                  {pct}
                </text>
              </g>
            );
          })}
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="rgb(var(--orange))"
            strokeWidth="2"
          />
          {/* Dots */}
          {xs.map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={ys[i]}
              r="4"
              fill="rgb(var(--orange))"
            />
          ))}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted">
        {sorted.slice(-3).reverse().map((e) => {
          const course = COURSES.find((c) => c.slug === e.courseSlug);
          return (
            <div key={e.id} className="rounded border border-hair px-2 py-1">
              {course?.shortTitle || e.courseSlug}: {e.percentage}% ({e.score}/{e.total})
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DifficultyMasterySection({
  mastery,
}: {
  mastery: ReturnType<typeof computeDifficultyMastery>;
}) {
  const anyData =
    mastery.easy.total + mastery.medium.total + mastery.hard.total > 0;
  return (
    <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
      <div className="label mb-3">Difficulty mastery</div>
      {!anyData ? (
        <p className="text-[13px] text-muted">
          Solve practice problems to see your mastery by difficulty level.
        </p>
      ) : (
        <div className="space-y-3">
          {(["easy", "medium", "hard"] as const).map((d) => {
            const m = mastery[d];
            const color =
              d === "easy"
                ? "bg-green-500"
                : d === "medium"
                ? "bg-yellow-500"
                : "bg-red-500";
            return (
              <div key={d}>
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="font-medium capitalize text-ink">{d}</span>
                  <span className="text-muted">
                    {m.correct}/{m.total} · {m.pct}%
                  </span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-hair">
                  <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function WeakTopicsSection({ weakTopics }: { weakTopics: WeakTopic[] }) {
  return (
    <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
      <div className="label mb-3">Weak spots</div>
      {weakTopics.length === 0 ? (
        <p className="text-[13px] text-muted">
          No weak spots yet — problems you save to review will surface here.
        </p>
      ) : (
        <ul className="divide-y divide-hair">
          {weakTopics.map((w) => (
            <li
              key={`${w.courseSlug}:${w.unitNumber}`}
              className="flex items-center justify-between py-2.5"
            >
              <div>
                <div className="text-[13px] font-medium text-ink">
                  {w.courseTitle} · Unit {w.unitNumber}
                </div>
                <div className="text-[12px] text-muted">{w.unitTitle}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-[12px] text-muted">
                  {w.count} miss{w.count === 1 ? "" : "es"}
                </div>
                <a
                  href={`/study?course=${w.courseSlug}&unit=${w.unitNumber}`}
                  className="text-[12px] font-medium text-orange hover:underline"
                >
                  Study →
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ActivityHeatmapSection({
  activityMap,
}: {
  activityMap: Map<string, number>;
}) {
  const days = getHeatmapDays(90);
  // Pad to start on Sunday for grid alignment
  const firstDate = new Date(days[0]);
  const leadingBlanks = firstDate.getDay();

  const max = Math.max(1, ...Array.from(activityMap.values()));
  function intensity(count: number) {
    if (count === 0) return 0;
    const ratio = count / max;
    if (ratio >= 0.75) return 4;
    if (ratio >= 0.5) return 3;
    if (ratio >= 0.25) return 2;
    return 1;
  }
  const colors = [
    "rgb(var(--hair))",
    "rgb(var(--orange) / 0.3)",
    "rgb(var(--orange) / 0.55)",
    "rgb(var(--orange) / 0.8)",
    "rgb(var(--orange))",
  ];

  const totalActiveDays = Array.from(activityMap.values()).filter((v) => v > 0).length;

  return (
    <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
      <div className="flex items-baseline justify-between">
        <div className="label">Activity · last 90 days</div>
        <div className="text-[11px] text-muted">
          {totalActiveDays} active day{totalActiveDays === 1 ? "" : "s"}
        </div>
      </div>
      <div
        className="mt-4 grid gap-[3px]"
        style={{
          gridTemplateRows: "repeat(7, 12px)",
          gridAutoFlow: "column",
          gridAutoColumns: "12px",
        }}
      >
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map((key) => {
          const count = activityMap.get(key) || 0;
          const level = intensity(count);
          const date = new Date(key);
          return (
            <div
              key={key}
              title={`${date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })} · ${count} action${count === 1 ? "" : "s"}`}
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                backgroundColor: colors[level],
              }}
            />
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-muted">
        Less
        {colors.map((c, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              backgroundColor: c,
            }}
          />
        ))}
        More
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number | string;
  suffix?: string;
}) {
  return (
    <div className="rounded-lg border border-hair bg-paper p-4">
      <div className="text-[10px] uppercase tracking-wider text-muted">
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <div className="font-serif text-3xl text-ink">{value}</div>
        {suffix && <div className="text-xs text-muted">{suffix}</div>}
      </div>
    </div>
  );
}
