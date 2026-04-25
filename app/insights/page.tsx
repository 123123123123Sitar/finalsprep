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
  computeCourseUnitMastery,
  predictApScore,
  computeNextActions,
  type HistoryEntry,
  type WeakTopic,
  type NextAction,
  type CourseMasteryMap,
} from "@/lib/insights";
import PageLoader from "@/app/components/PageLoader";
import ReviewPanel from "@/app/components/ReviewPanel";
import CourseIcon from "@/app/components/CourseIcon";

type LiveUsage = {
  tokensRemaining: number;
  tokensCap: number;
  bonusBalance: number;
};

type TabId = "insights" | "review";
const VALID_TABS: TabId[] = ["insights", "review"];

export default function InsightsPage() {
  const { user, loading, plan, planLoading, streak, getIdToken } = useAuth();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [wrongBank, setWrongBank] = useState<WrongBankEntry[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState<TabId>("insights");
  // Canonical "right now" token state, fetched from /api/usage so this page
  // shows the SAME numbers as the dashboard tile and the chat header pill.
  const [liveUsage, setLiveUsage] = useState<LiveUsage | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/signin?next=/insights";
    }
  }, [loading, user]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("tab");
    if (raw && (VALID_TABS as string[]).includes(raw)) {
      setTab(raw as TabId);
    }
  }, []);

  function switchTab(next: TabId) {
    setTab(next);
    const params = new URLSearchParams(window.location.search);
    if (next === "insights") params.delete("tab");
    else params.set("tab", next);
    const qs = params.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState({}, "", url);
  }

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const fetchUsage = async () => {
      try {
        const token = await getIdToken();
        const res = await fetch("/api/usage", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setLiveUsage({
            tokensRemaining: Number(data.tokensRemaining) || 0,
            tokensCap: Number(data.tokensCap) || 0,
            bonusBalance: Number(data.bonusBalance) || 0,
          });
        }
      } catch {}
    };
    fetchUsage();
    const id = setInterval(fetchUsage, 20_000);
    const onFocus = () => fetchUsage();
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, [user, getIdToken]);

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
  const courseMastery = useMemo(
    () => computeCourseUnitMastery(selectedCourses, wrongBank, examResults),
    [selectedCourses, wrongBank, examResults, loaded]
  );
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
        <section data-tour="insights-learner-upsell" className="mx-auto max-w-xl px-6 py-20">
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
        <div className="label mb-3">{tab === "review" ? "Review" : "Insights"}</div>
        <h1 className="font-serif text-4xl font-normal text-ink">
          {tab === "review"
            ? "Problems you got wrong."
            : "How you've been studying."}
        </h1>

        <div className="mt-6 flex gap-1 border-b border-hair">
          <TabButton
            active={tab === "insights"}
            onClick={() => switchTab("insights")}
            label="Insights"
          />
          <span data-tour="insights-review-tab">
            <TabButton
              active={tab === "review"}
              onClick={() => switchTab("review")}
              label="Review"
              badge={wrongBank.length > 0 ? wrongBank.length : undefined}
            />
          </span>
        </div>

        {tab === "review" ? (
          <div className="mt-8">
            <ReviewPanel />
            <RelatedFeatures />
          </div>
        ) : (
          <InsightsBody
            liveUsage={liveUsage}
            streak={streak}
            chats7={chats7}
            tokens7={tokens7}
            actions={actions}
            selectedCourses={selectedCourses}
            completedSlugs={completedSlugs}
            wrongBank={wrongBank}
            examResults={examResults}
            mastery={mastery}
            weakTopics={weakTopics}
            courseMastery={courseMastery}
            activityMap={activityMap}
            onGoToReview={() => switchTab("review")}
          />
        )}
      </section>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2 text-[14px] transition ${
        active
          ? "border-orange text-ink"
          : "border-transparent text-muted hover:text-ink"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <span>{label}</span>
      {typeof badge === "number" && badge > 0 && (
        <span className="rounded-full bg-orange-tint px-1.5 py-0.5 text-[10px] font-semibold text-orange-ink">
          {badge}
        </span>
      )}
    </button>
  );
}

function RelatedFeatures() {
  const links: { href: string; label: string; description: string }[] = [
    {
      href: "/practice",
      label: "Practice problems",
      description: "Grind a few fresh problems to feed the review bank.",
    },
    {
      href: "/chat",
      label: "Ask the tutor",
      description: "Get step-by-step help on anything you missed.",
    },
    {
      href: "/exam",
      label: "Take a mock exam",
      description: "Benchmark how your review is translating to the real thing.",
    },
    {
      href: "/insights",
      label: "Back to insights",
      description: "See weak topics, mastery, and the predicted score.",
    },
  ];
  return (
    <div className="mt-10">
      <div className="label mb-3">Keep the loop going</div>
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-lg border border-hair bg-paper p-4 transition-colors hover:border-orange"
          >
            <div className="font-medium text-ink">{l.label}</div>
            <div className="mt-1 text-[13px] text-muted">{l.description}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function InsightsBody({
  liveUsage,
  streak,
  chats7,
  tokens7,
  actions,
  selectedCourses,
  completedSlugs,
  wrongBank,
  examResults,
  mastery,
  weakTopics,
  courseMastery,
  activityMap,
  onGoToReview,
}: {
  liveUsage: LiveUsage | null;
  streak: { current: number; longest: number } | null | undefined;
  chats7: number;
  tokens7: number;
  actions: NextAction[];
  selectedCourses: string[];
  completedSlugs: Set<string>;
  wrongBank: WrongBankEntry[];
  examResults: ExamResult[];
  mastery: ReturnType<typeof computeDifficultyMastery>;
  weakTopics: WeakTopic[];
  courseMastery: CourseMasteryMap[];
  activityMap: Map<string, number>;
  onGoToReview: () => void;
}) {
  return (
    <>
      {/* Canonical "right now" token state: matches the dashboard tile and
          the chat header pill. The 7-day numbers below are historical. */}
      <div className="mt-8 rounded-xl border border-hair bg-paper p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="label">Daily tokens</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-serif text-3xl font-normal text-ink">
                  {liveUsage
                    ? liveUsage.tokensRemaining.toLocaleString()
                    : "…"}
                </span>
                <span className="text-xs text-muted">
                  / {liveUsage ? liveUsage.tokensCap.toLocaleString() : "…"} remaining today
                </span>
              </div>
            </div>
            <div className="border-t border-hair pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
              <div className="label">Bonus tokens</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-serif text-3xl font-normal text-ink">
                  {liveUsage ? liveUsage.bonusBalance.toLocaleString() : "…"}
                </span>
                <span className="text-xs text-muted">never expire</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Current streak" value={streak?.current ?? 0} suffix="days" />
          <Stat label="Longest streak" value={streak?.longest ?? 0} suffix="days" />
          <Stat label="Chats (last 7d)" value={chats7} />
          <Stat label="Tokens used (7d)" value={tokens7.toLocaleString()} />
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

        <CourseMasterySection courseMastery={courseMastery} />

        <DifficultyMasterySection mastery={mastery} />

        <WeakTopicsSection weakTopics={weakTopics} />

        <ActivityHeatmapSection activityMap={activityMap} />

        <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
          <div className="label mb-3">Wrong-answer bank</div>
          <p className="text-[15px] text-body">
            You have{" "}
            <strong className="text-ink">{wrongBank.length}</strong> problem
            {wrongBank.length === 1 ? "" : "s"} saved for review.{" "}
            <button
              onClick={onGoToReview}
              className="text-orange hover:underline"
            >
              Review them →
            </button>
          </p>
        </div>
    </>
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
    <div data-tour="insights-prediction" className="mt-8 rounded-lg border border-hair bg-paper p-5">
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
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <CourseIcon
                    slug={course.slug}
                    category={course.category}
                    size="sm"
                  />
                  <div className="min-w-0 truncate font-medium text-ink">
                    {course.shortTitle}
                  </div>
                </div>
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
            <div
              key={e.id}
              className="flex items-center gap-1.5 rounded border border-hair px-2 py-1"
            >
              <CourseIcon
                slug={e.courseSlug}
                category={course?.category}
                size="xs"
              />
              <span>
                {course?.shortTitle || e.courseSlug}: {e.percentage}% ({e.score}/{e.total})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CourseMasterySection({
  courseMastery,
}: {
  courseMastery: CourseMasteryMap[];
}) {
  if (courseMastery.length === 0) return null;
  return (
    <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
      <div className="flex items-baseline justify-between">
        <div className="label">Strengths & weaknesses</div>
        <div className="text-[11px] text-muted">By course × unit</div>
      </div>
      <p className="mt-2 text-[12.5px] text-muted">
        Each cell blends practice accuracy, mock-exam scores, and review-bank
        misses. Gray = not enough data.
      </p>
      <div className="mt-4 space-y-5">
        {courseMastery.map((cm) => (
          <CourseMasteryRow key={cm.courseSlug} cm={cm} />
        ))}
      </div>
      <MasteryLegend />
    </div>
  );
}

function CourseMasteryRow({ cm }: { cm: CourseMasteryMap }) {
  if (cm.units.length === 0) return null;
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <CourseIcon
          slug={cm.courseSlug}
          category={cm.category as any}
          size="sm"
        />
        <div className="text-[13.5px] font-medium text-ink">
          {cm.courseShortTitle}
        </div>
      </div>
      <div data-tour="insights-mastery" className="grid gap-[4px] sm:gap-[5px] grid-cols-[repeat(auto-fill,minmax(60px,1fr))]">
        {cm.units.map((u) => (
          <MasteryCell key={u.unitNumber} u={u} courseSlug={cm.courseSlug} />
        ))}
      </div>
    </div>
  );
}

function MasteryCell({
  u,
  courseSlug,
}: {
  u: import("@/lib/insights").UnitMastery;
  courseSlug: string;
}) {
  // Color ramp: red (weak) → yellow → green (strong). When confidence is
  // low, drop opacity so the grid communicates uncertainty visually.
  function colorFor(score: number, confidence: number): string {
    if (confidence < 0.05) return "rgb(var(--hair))";
    const alpha = Math.max(0.35, Math.min(1, 0.35 + confidence * 0.8));
    if (score >= 0.8) return `rgb(34 197 94 / ${alpha})`;
    if (score >= 0.6) return `rgb(132 204 22 / ${alpha})`;
    if (score >= 0.45) return `rgb(234 179 8 / ${alpha})`;
    if (score >= 0.3) return `rgb(249 115 22 / ${alpha})`;
    return `rgb(239 68 68 / ${alpha})`;
  }
  const pct = Math.round(u.score * 100);
  const title =
    u.practiceTotal === 0 && u.wrongCount === 0
      ? `Unit ${u.unitNumber}: ${u.unitTitle}\n(no practice data yet)`
      : `Unit ${u.unitNumber}: ${u.unitTitle}\nPractice: ${u.practiceCorrect}/${u.practiceTotal}${
          u.wrongCount > 0 ? ` · ${u.wrongCount} in review` : ""
        }\nScore: ${pct}%`;
  return (
    <a
      href={`/study?course=${courseSlug}&unit=${u.unitNumber}`}
      title={title}
      className="group flex aspect-[5/3] min-w-[56px] flex-col items-center justify-center rounded-md border border-hair p-1 text-center transition hover:border-orange hover:shadow-sm"
      style={{ backgroundColor: colorFor(u.score, u.confidence) }}
    >
      <div className="text-[10px] font-semibold text-ink/80">
        U{u.unitNumber}
      </div>
      {u.confidence >= 0.05 && (
        <div className="mt-0.5 text-[10px] font-medium text-ink">{pct}%</div>
      )}
    </a>
  );
}

function MasteryLegend() {
  const stops: { label: string; color: string }[] = [
    { label: "Weak", color: "rgb(239 68 68 / 0.85)" },
    { label: " ", color: "rgb(249 115 22 / 0.85)" },
    { label: " ", color: "rgb(234 179 8 / 0.85)" },
    { label: " ", color: "rgb(132 204 22 / 0.85)" },
    { label: "Strong", color: "rgb(34 197 94 / 0.85)" },
  ];
  return (
    <div className="mt-5 flex items-center gap-2 text-[11px] text-muted">
      <span>Weak</span>
      <div className="flex gap-[2px]">
        {stops.map((s, i) => (
          <span
            key={i}
            className="h-3 w-4 rounded-sm"
            style={{ backgroundColor: s.color }}
          />
        ))}
      </div>
      <span>Strong</span>
      <span className="ml-3 flex items-center gap-1.5">
        <span
          className="h-3 w-4 rounded-sm"
          style={{ backgroundColor: "rgb(var(--hair))" }}
        />
        <span>No data</span>
      </span>
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
    <div data-tour="insights-weak-topics" className="mt-8 rounded-lg border border-hair bg-paper p-5">
      <div className="label mb-3">Weak spots</div>
      {weakTopics.length === 0 ? (
        <p className="text-[13px] text-muted">
          No weak spots yet. Problems you save to review will surface here.
        </p>
      ) : (
        <ul className="divide-y divide-hair">
          {weakTopics.map((w) => {
            const course = COURSES.find((c) => c.slug === w.courseSlug);
            return (
            <li
              key={`${w.courseSlug}:${w.unitNumber}`}
              className="flex items-center justify-between py-2.5"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <CourseIcon
                  slug={w.courseSlug}
                  category={course?.category}
                  size="sm"
                />
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-medium text-ink">
                    {w.courseTitle} · Unit {w.unitNumber}
                  </div>
                  <div className="truncate text-[12px] text-muted">
                    {w.unitTitle}
                  </div>
                </div>
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
            );
          })}
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
    <div data-tour="insights-heatmap" className="mt-8 rounded-lg border border-hair bg-paper p-5">
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
