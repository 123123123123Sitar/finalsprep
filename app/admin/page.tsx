"use client";
import { useEffect, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";
import PageLoader from "@/app/components/PageLoader";

type AdminData = {
  planCounts: Record<string, number>;
  totalBillingDocs: number;
  activeUsers24h: number;
  activeUsers7d: number;
  byKind24h: Record<string, number>;
  events: Array<{
    id: string;
    kind: string;
    uid?: string;
    email?: string;
    plan?: string;
    at: number;
    meta?: Record<string, any>;
  }>;
};

export default function AdminPage() {
  const { user, loading, getIdToken } = useAuth();
  const [data, setData] = useState<AdminData | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/signin?next=/admin";
    }
  }, [loading, user]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const token = await getIdToken();
      const res = await fetch("/api/admin", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setErr(j.error || `HTTP ${res.status}`);
        return;
      }
      setData(await res.json());
    })();
  }, [user, getIdToken]);

  if (loading || !user) {
    return (
      <main className="bg-paper">
        <SiteNav>
        </SiteNav>
        <PageLoader />
      </main>
    );
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav>
      </SiteNav>
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="label mb-3">Admin</div>
        <h1 className="font-serif text-4xl font-normal text-ink">
          Engagement dashboard.
        </h1>
        <p className="mt-3 text-[15px] text-muted">
          Read-only view of user plans, active users, and recent events.
          Restricted to the emails in <code>ADMIN_EMAILS</code>.
        </p>

        {err && (
          <div className="mt-8 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {err}
          </div>
        )}

        {data && (
          <>
            {/* KPI row */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Total users" value={data.totalBillingDocs} />
              <Stat label="Active 24h" value={data.activeUsers24h} />
              <Stat label="Active 7d" value={data.activeUsers7d} />
              <Stat
                label="Paid users"
                value={
                  (data.planCounts.pro || 0) +
                  (data.planCounts.hacker || 0)
                }
              />
            </div>

            {/* Plan distribution */}
            <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
              <div className="label mb-3">Plan distribution</div>
              <div className="grid gap-2 text-sm">
                <PlanRow
                  label="Learner"
                  count={data.planCounts.learner || 0}
                  total={data.totalBillingDocs}
                />
                <PlanRow
                  label="Pro"
                  count={data.planCounts.pro || 0}
                  total={data.totalBillingDocs}
                />
                <PlanRow
                  label="Hacker"
                  count={data.planCounts.hacker || 0}
                  total={data.totalBillingDocs}
                />
              </div>
            </div>

            {/* Event breakdown */}
            <div className="mt-8 rounded-lg border border-hair bg-paper p-5">
              <div className="label mb-3">Events last 24h</div>
              <div className="grid gap-1 text-sm">
                {Object.entries(data.byKind24h)
                  .sort((a, b) => b[1] - a[1])
                  .map(([kind, count]) => (
                    <div key={kind} className="flex justify-between">
                      <span className="text-body">{kind}</span>
                      <span className="font-mono text-ink">{count}</span>
                    </div>
                  ))}
                {Object.keys(data.byKind24h).length === 0 && (
                  <div className="text-muted">No events yet.</div>
                )}
              </div>
            </div>

            {/* Recent events */}
            <div className="mt-8 rounded-lg border border-hair bg-paper">
              <div className="border-b border-hair px-5 py-3 label">
                Recent events (200)
              </div>
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-[13px]">
                  <thead className="sticky top-0 bg-offwhite text-[10px] uppercase tracking-wider text-muted">
                    <tr>
                      <th className="px-4 py-2 text-left">When</th>
                      <th className="px-4 py-2 text-left">Kind</th>
                      <th className="px-4 py-2 text-left">User</th>
                      <th className="px-4 py-2 text-left">Plan</th>
                      <th className="px-4 py-2 text-left">Meta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hair">
                    {data.events.map((e) => (
                      <tr key={e.id}>
                        <td className="px-4 py-2 text-muted whitespace-nowrap">
                          {new Date(e.at).toLocaleString()}
                        </td>
                        <td className="px-4 py-2 font-mono text-[12px]">
                          {e.kind}
                        </td>
                        <td className="px-4 py-2 truncate max-w-[160px]">
                          {e.email || e.uid || "-"}
                        </td>
                        <td className="px-4 py-2">{e.plan || "-"}</td>
                        <td className="px-4 py-2 font-mono text-[11px] text-muted">
                          {e.meta ? JSON.stringify(e.meta) : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-hair bg-paper p-4">
      <div className="text-[10px] uppercase tracking-wider text-muted">
        {label}
      </div>
      <div className="mt-1 font-serif text-3xl text-ink">{value}</div>
    </div>
  );
}

function PlanRow({
  label,
  count,
  total,
}: {
  label: string;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="w-20 text-body">{label}</div>
      <div className="relative h-3 flex-1 overflow-hidden rounded bg-offwhite">
        <div
          className="h-full bg-orange"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="w-20 text-right font-mono text-ink">
        {count} · {pct}%
      </div>
    </div>
  );
}
