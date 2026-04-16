"use client";
import { useEffect, useMemo, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";
import { doc, onSnapshot } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { listConversations, type StoredConversation } from "@/lib/chatStore";
import { planLabel } from "@/lib/plans";

type QuickAction = {
  href: string;
  title: string;
  blurb: string;
  emphasis?: boolean;
};

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
  { href: "/shop", title: "Shop", blurb: "Top up bonus tokens." },
];

/**
 * Authenticated home surface. Rendered by app/page.tsx when a verified user
 * is signed in. Structured so we can add panels (recent projects, progress
 * charts, etc.) without reshuffling the top-level grid.
 */
export default function Dashboard() {
  const { user, plan, planLoading, streak } = useAuth();
  const [bonusBalance, setBonusBalance] = useState<number | null>(null);
  const [recent, setRecent] = useState<StoredConversation[] | null>(null);
  const [recentError, setRecentError] = useState(false);

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

  return (
    <main className="bg-paper text-body">
      <SiteNav sticky />

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
          <SummaryTile
            label="Bonus tokens"
            value={bonusBalance === null ? "…" : bonusBalance.toLocaleString()}
            hint="Never expire"
            cta={{ href: "/shop", label: "Top up" }}
          />
        </div>
      </section>

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
