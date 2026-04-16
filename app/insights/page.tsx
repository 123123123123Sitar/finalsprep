"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";
import { listWrongBank } from "@/lib/wrongBank";
import PageLoader from "@/app/components/PageLoader";

type HistoryEntry = {
  kind: string;
  tokens?: number;
  createdAt?: number;
  plan?: string;
};

export default function InsightsPage() {
  const { user, loading, plan, planLoading, streak } = useAuth();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [wrongCount, setWrongCount] = useState(0);
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
            limit(200)
          )
        );
        setHistory(snap.docs.map((d) => d.data() as HistoryEntry));
      } catch {
        /* ignore */
      }
      const wrong = await listWrongBank(user.uid);
      setWrongCount(wrong.length);
      setLoaded(true);
    })();
  }, [user]);

  // Keep the shell in a loader state until BOTH auth AND the billing-doc
  // snapshot resolve. Otherwise a paid user would briefly see the "learner"
  // upsell below while their cached plan is still the default.
  if (loading || !user || planLoading) {
    return (
      <main className="bg-paper">
        <SiteNav>
        </SiteNav>
        <PageLoader />
      </main>
    );
  }

  if (plan === "learner") {
    return (
      <main className="bg-paper text-body">
        <SiteNav>
        </SiteNav>
        <section className="mx-auto max-w-xl px-6 py-20">
          <div className="label mb-3">Insights</div>
          <h1 className="font-serif text-4xl font-normal text-ink">
            See how you study.
          </h1>
          <p className="mt-3 text-[15px] text-muted">
            Insights is a Pro feature. Upgrade to see your token usage,
            streak trend, and wrong-answer bank over time.
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
      <SiteNav>
      </SiteNav>
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="label mb-3">Insights</div>
        <h1 className="font-serif text-4xl font-normal text-ink">
          How you've been studying.
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat
            label="Current streak"
            value={streak?.current ?? 0}
            suffix="days"
          />
          <Stat
            label="Longest streak"
            value={streak?.longest ?? 0}
            suffix="days"
          />
          <Stat label="Chats, 7d" value={chats7} />
          <Stat label="Tokens, 7d" value={tokens7.toLocaleString()} />
        </div>

        <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
          <div className="label mb-3">Wrong-answer bank</div>
          <p className="text-[15px] text-body">
            You have{" "}
            <strong className="text-ink">{wrongCount}</strong> problem
            {wrongCount === 1 ? "" : "s"} saved for review.{" "}
            <a href="/review" className="text-orange hover:underline">
              Review them →
            </a>
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
          <div className="label mb-3">Recent chats</div>
          {loaded && history.length === 0 ? (
            <div className="text-sm text-muted">
              No chat history yet. Head to{" "}
              <a href="/chat" className="text-orange hover:underline">
                /chat
              </a>{" "}
              and ask your first question.
            </div>
          ) : (
            <ul className="divide-y divide-hair">
              {history.slice(0, 20).map((h, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between py-2 text-[13px]"
                >
                  <div className="text-body">
                    <span className="font-mono text-[11px] text-muted mr-2">
                      {h.kind}
                    </span>
                    {h.createdAt
                      ? new Date(h.createdAt).toLocaleString()
                      : ""}
                  </div>
                  <div className="font-mono text-[11px] text-muted">
                    {h.tokens ? `${h.tokens.toLocaleString()} tok` : ""}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
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
