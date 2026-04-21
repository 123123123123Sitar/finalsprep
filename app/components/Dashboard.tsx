"use client";
import { useEffect, useMemo, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";
import { doc, onSnapshot, getDocs, query, orderBy, limit, collection } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { listConversations, type StoredConversation } from "@/lib/chatStore";
import { planLabel } from "@/lib/plans";
import {
  COURSES,
  LESSONS,
  type Course,
  type CourseSlug,
  type Lesson,
} from "@/lib/topics";
import { subscribeSelectedCourses } from "@/lib/selectedCourses";
import { examCountdownLabel } from "@/lib/examDates";
import { subscribeCompletedSlugs } from "@/lib/progress";
import {
  blocksOnDay,
  fmtTime,
  DEFAULT_SCHEDULE,
  type Schedule,
  type StudyBlock,
} from "@/lib/schedule";
import { listWrongBank } from "@/lib/wrongBank";
import ProgressPanel from "./ProgressPanel";

type QuickAction = {
  href: string;
  title: string;
  blurb: string;
  emphasis?: boolean;
};

type HistoryEntry = { kind: string; tokens?: number; createdAt?: number };

const QUICK_ACTIONS: QuickAction[] = [
  {
    href: "/chat",
    title: "Open chat",
    blurb: "Pick up where you left off or start a new conversation.",
    emphasis: true,
  },
  { href: "/study", title: "Study", blurb: "Curated walkthroughs by subject." },
  { href: "/review", title: "Review", blurb: "Your saved problems and notes." },
  { href: "/insights", title: "Insights", blurb: "Progress, streaks, and weak spots." },
  { href: "/schedule", title: "Schedule", blurb: "Plan the week ahead." },
  { href: "/exam", title: "Mock Exam", blurb: "Test yourself across all units." },
  { href: "/shop", title: "Shop", blurb: "Extra tokens that never expire." },
];

/**
 * Authenticated home surface. Rendered by app/page.tsx when a verified user
 * is signed in. Structured so we can add panels (recent projects, progress
 * charts, etc.) without reshuffling the top-level grid.
 */
type UsageData = {
  tokensRemaining: number;
  tokensCap: number;
  bonusBalance: number;
};

export default function Dashboard() {
  const { user, loading: authLoading, plan, planLoading, streak, getIdToken } = useAuth();
  const [bonusBalance, setBonusBalance] = useState<number | null>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [recent, setRecent] = useState<StoredConversation[] | null>(null);
  const [recentError, setRecentError] = useState(false);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [, tickBanner] = useState(0);
  const [aiHistory, setAiHistory] = useState<HistoryEntry[]>([]);
  const [wrongCount, setWrongCount] = useState(0);
  // Same three-state machine as /study so the course-cards section never
  // flashes an empty state during the auth → Firestore resolution window.
  const [selectedCourses, setSelectedCourses] = useState<string[] | null>(
    null
  );
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  const displayName = useMemo(() => {
    const dn = user?.displayName?.trim();
    if (dn) return dn.split(" ")[0];
    const email = user?.email ?? "";
    const local = email.split("@")[0];
    return local || "there";
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    const unsub = onSnapshot(
      doc(db, "users", user.uid, "profile", "tokenBank"),
      (snap) => {
        const d = snap.data() as { balance?: number } | undefined;
        setBonusBalance(typeof d?.balance === "number" ? d.balance : 0);
      },
      () => setBonusBalance(0)
    );
    return () => unsub();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const fetchUsage = async () => {
      try {
        const token = await getIdToken();
        const res = await fetch("/api/usage", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setUsage(data);
      } catch {}
    };

    fetchUsage();
    // Live-ish refresh: poll every 20s (covers chats sent in another tab) and
    // refetch immediately when the tab regains focus (covers the common case
    // of switching tabs after sending a message).
    intervalId = setInterval(fetchUsage, 20_000);
    const onFocus = () => fetchUsage();
    const onVisibility = () => {
      if (document.visibilityState === "visible") fetchUsage();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [user, getIdToken]);

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    const unsub = onSnapshot(
      doc(db, "users", user.uid, "profile", "schedule"),
      (snap) => {
        const d = snap.data() as any;
        if (!d) { setSchedule(DEFAULT_SCHEDULE); return; }
        setSchedule({
          days: Array.isArray(d.days) ? d.days : DEFAULT_SCHEDULE.days,
          dailyGoalMinutes: d.dailyGoalMinutes || DEFAULT_SCHEDULE.dailyGoalMinutes,
          lastClaimDate: d.lastClaimDate || "",
          totalClaims: d.totalClaims || 0,
          blocks: Array.isArray(d.blocks) ? (d.blocks as StudyBlock[]) : [],
        });
      },
      () => setSchedule(DEFAULT_SCHEDULE)
    );
    return () => unsub();
  }, [user]);

  useEffect(() => {
    const id = setInterval(() => tickBanner((n) => n + 1), 10_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    listConversations(user.uid, 5)
      .then((list) => {
        if (!cancelled) setRecent(list);
      })
      .catch(() => {
        if (!cancelled) setRecentError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Enrollment: hold `null` while auth is still loading so a signed-in user's
  // first render never collapses to the "no courses" state.
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

  // Completion progress — reads the same `completedSlugs` field the study
  // page's "Mark complete" button writes, so the progress bar here only
  // advances when a lesson is explicitly finished.
  useEffect(() => {
    if (!user) {
      setCompletedSlugs(new Set());
      return;
    }
    const db = getDb();
    if (!db) return;
    const unsub = subscribeCompletedSlugs(db, user.uid, setCompletedSlugs);
    return () => unsub();
  }, [user]);

  // Fetch aiHistory and wrongCount for progress panel
  useEffect(() => {
    if (!user) {
      setAiHistory([]);
      setWrongCount(0);
      return;
    }
    let cancelled = false;
    const db = getDb();
    if (!db) return;

    Promise.all([
      getDocs(
        query(
          collection(db, "users", user.uid, "aiHistory"),
          orderBy("createdAt", "desc"),
          limit(50)
        )
      ),
      listWrongBank(user.uid),
    ])
      .then(([historySnap, wrongBank]) => {
        if (!cancelled) {
          const history = historySnap.docs.map((d) => {
            const data = d.data() as any;
            return {
              kind: data.kind || "",
              tokens: data.tokens,
              createdAt: data.createdAt?.toMillis?.() || Date.now(),
            } as HistoryEntry;
          });
          setAiHistory(history);
          setWrongCount(wrongBank.length);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAiHistory([]);
          setWrongCount(0);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  const addedCourses = useMemo<Course[]>(
    () =>
      selectedCourses
        ? COURSES.filter((c) => selectedCourses.includes(c.slug))
        : [],
    [selectedCourses]
  );
  const coursesLoading = selectedCourses === null;

  const nowDate = new Date();
  const todayWd = nowDate.getDay();
  const nowMin = nowDate.getHours() * 60 + nowDate.getMinutes();
  const todayBlocks = schedule ? blocksOnDay(schedule.blocks, todayWd) : [];
  const activeBlock = todayBlocks.find(
    (b) => nowMin >= Number(b.startMin) && nowMin < Number(b.endMin)
  ) ?? null;

  return (
    <main className="bg-paper text-body">
      <SiteNav sticky />

      {activeBlock && (
        <div className="bg-orange px-6 py-3 text-paper">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold uppercase tracking-wider opacity-80">
                Study time
              </span>
              <span className="font-serif text-lg font-normal">
                {activeBlock.subject}
              </span>
            </div>
            <div className="shrink-0 text-sm opacity-80">
              {fmtTime(activeBlock.startMin)} – {fmtTime(activeBlock.endMin)}
            </div>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-5xl px-6 pt-12 pb-6">
        <div className="label mb-3">Dashboard</div>
        <h1 className="font-serif text-[40px] font-normal leading-[1.1] tracking-tightest text-ink sm:text-[52px]">
          Welcome back, {displayName}.
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-muted">
          {user?.email}
          {!planLoading && (
            <>
              {" · "}
              <span className="text-ink">{planLabel(plan)}</span> plan
            </>
          )}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryTile
            label="Current streak"
            value={streak ? `${streak.current} day${streak.current === 1 ? "" : "s"}` : "—"}
            hint={streak?.longest ? `Best: ${streak.longest}` : "Solve one problem to start"}
          />
          <SummaryTile
            label="Plan"
            value={planLoading ? "…" : planLabel(plan)}
            hint={
              planLoading
                ? "Checking subscription"
                : plan === "learner"
                ? "10,000 tokens / day"
                : "Unlimited walkthroughs"
            }
            cta={!planLoading && plan === "learner" ? { href: "/#price", label: "Upgrade" } : undefined}
          />
          <div className="rounded-xl border border-hair bg-paper p-5">
            <div className="label">Your tokens</div>
            <div className="mt-3 space-y-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">Daily</div>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl font-normal text-ink">
                    {usage ? usage.tokensRemaining.toLocaleString() : "…"}
                  </span>
                  <span className="text-xs text-muted">
                    / {usage ? usage.tokensCap.toLocaleString() : "…"}
                  </span>
                </div>
              </div>
              <div className="border-t border-hair pt-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">Bonus</div>
                <div className="mt-0.5 font-serif text-3xl font-normal text-ink">
                  {bonusBalance === null ? "…" : bonusBalance.toLocaleString()}
                </div>
                <div className="text-xs text-muted">never expire</div>
              </div>
            </div>
            <a href="/shop" className="mt-3 inline-block text-xs font-medium text-orange hover:underline">
              Top up →
            </a>
          </div>
        </div>
      </section>

      {todayBlocks.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pt-6 pb-2">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="label">Today's schedule</h2>
            <a href="/schedule" className="text-xs text-muted hover:text-ink">
              Edit →
            </a>
          </div>
          <div className="divide-y divide-hair overflow-hidden rounded-xl border border-hair bg-paper">
            {todayBlocks.map((b) => (
              <div
                key={b.id}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  nowMin >= Number(b.startMin) && nowMin < Number(b.endMin)
                    ? "bg-orange-tint"
                    : ""
                }`}
              >
                <div>
                  <span className="font-medium text-ink">{b.subject}</span>
                  <span className="ml-2 text-sm text-muted">
                    {fmtTime(b.startMin)}–{fmtTime(b.endMin)}
                  </span>
                </div>
                <span className="text-xs text-muted">{b.endMin - b.startMin} min</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 pt-8 pb-2">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="label">Your courses</h2>
          <a href="/study" className="text-xs text-muted hover:text-ink">
            Open study →
          </a>
        </div>
        {coursesLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-[168px] animate-pulse rounded-xl border border-hair bg-offwhite"
              />
            ))}
          </div>
        ) : addedCourses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-hair bg-offwhite p-6 text-sm text-muted">
            No courses added yet.{" "}
            <a href="/study" className="text-orange hover:underline">
              Pick your AP courses →
            </a>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addedCourses.map((c) => (
              <CourseCard
                key={c.slug}
                course={c}
                completedSlugs={completedSlugs}
              />
            ))}
          </div>
        )}
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <ProgressPanel
          selectedCourses={selectedCourses ?? []}
          completedSlugs={completedSlugs}
          aiHistory={aiHistory}
          wrongCount={wrongCount}
        />
      </div>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <h2 className="label mb-4">Jump back in</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_ACTIONS.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className={`group rounded-xl border p-5 transition hover:-translate-y-[1px] hover:shadow-[0_12px_40px_-22px_rgba(0,0,0,0.35)] ${
                a.emphasis
                  ? "border-ink bg-ink text-paper hover:bg-ink/95"
                  : "border-hair bg-paper text-ink hover:border-ink"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-normal">{a.title}</span>
                <span
                  aria-hidden
                  className={`text-lg transition-transform group-hover:translate-x-0.5 ${
                    a.emphasis ? "text-paper/80" : "text-muted"
                  }`}
                >
                  →
                </span>
              </div>
              <p
                className={`mt-2 text-sm ${
                  a.emphasis ? "text-paper/75" : "text-muted"
                }`}
              >
                {a.blurb}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="flex items-baseline justify-between">
          <h2 className="label">Recent chats</h2>
          <a href="/chat" className="text-xs text-muted hover:text-ink">
            Open chat →
          </a>
        </div>
        <div className="mt-4 rounded-xl border border-hair bg-paper">
          {recent === null && !recentError && (
            <div className="p-5 text-sm text-muted">Loading recent activity…</div>
          )}
          {recentError && (
            <div className="p-5 text-sm text-muted">
              Couldn't load recent activity. Try reloading.
            </div>
          )}
          {recent && recent.length === 0 && (
            <div className="p-5 text-sm text-muted">
              No chats yet.{" "}
              <a href="/chat" className="text-orange hover:underline">
                Ask your first question →
              </a>
            </div>
          )}
          {recent && recent.length > 0 && (
            <ul className="divide-y divide-hair">
              {recent.map((c) => (
                <li key={c.id}>
                  <a
                    href={`/chat?c=${encodeURIComponent(c.id)}`}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm hover:bg-offwhite"
                  >
                    <span className="truncate text-ink">{c.title}</span>
                    <span className="shrink-0 text-xs text-muted">
                      {formatRelative(c.updatedAt)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

function SummaryTile({
  label,
  value,
  hint,
  cta,
}: {
  label: string;
  value: string;
  hint?: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="rounded-xl border border-hair bg-paper p-5">
      <div className="label">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-serif text-3xl font-normal text-ink">{value}</span>
      </div>
      {hint && <div className="mt-1 text-xs text-muted">{hint}</div>}
      {cta && (
        <a
          href={cta.href}
          className="mt-3 inline-block text-xs font-medium text-orange hover:underline"
        >
          {cta.label} →
        </a>
      )}
    </div>
  );
}

function CourseCard({
  course,
  completedSlugs,
}: {
  course: Course;
  completedSlugs: Set<string>;
}) {
  // Lessons are already in curriculum order within LESSONS, so the first
  // uncompleted one is the natural "current lesson" to resume.
  const courseLessons = useMemo<Lesson[]>(
    () =>
      LESSONS.filter((l) =>
        l.courses.some((m) => m.courseSlug === course.slug)
      ),
    [course.slug]
  );
  const total = courseLessons.length;
  const done = courseLessons.reduce(
    (n, l) => (completedSlugs.has(l.slug) ? n + 1 : n),
    0
  );
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const nextLesson = courseLessons.find((l) => !completedSlugs.has(l.slug));
  const resumeLesson = nextLesson ?? courseLessons[courseLessons.length - 1];
  const countdown = examCountdownLabel(course.slug as CourseSlug);
  const href =
    resumeLesson != null
      ? `/study?course=${encodeURIComponent(
          course.slug
        )}&lesson=${encodeURIComponent(resumeLesson.slug)}`
      : `/study?course=${encodeURIComponent(course.slug)}`;

  return (
    <a
      href={href}
      className="group flex flex-col rounded-xl border border-hair bg-paper p-5 transition hover:-translate-y-0.5 hover:border-orange hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 font-serif text-xl text-ink group-hover:text-orange">
          {course.title}
        </div>
        {countdown && (
          <span className="shrink-0 rounded-full border border-orange/30 bg-orange-tint px-2 py-1 text-[10px] font-medium text-orange-ink">
            {countdown}
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-muted">
          <span>
            {total === 0
              ? "No lessons yet"
              : `${done}/${total} lessons`}
          </span>
          <span className="font-medium text-ink">{pct}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-offwhite">
          <div
            className="h-full rounded-full bg-orange transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="mt-4 border-t border-hair pt-3 text-[12px]">
        <div className="label mb-1">
          {nextLesson ? "Current lesson" : "Last lesson"}
        </div>
        <div className="line-clamp-2 text-ink group-hover:text-orange">
          {resumeLesson
            ? resumeLesson.title
            : "Curriculum coming soon"}
        </div>
      </div>
    </a>
  );
}

function formatRelative(ms: number): string {
  if (!ms) return "";
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ms).toLocaleDateString();
}
