"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SiteNav from "@/app/components/SiteNav";
import PageLoader from "@/app/components/PageLoader";
import { useAuth } from "@/app/components/AuthProvider";
import { planLabel } from "@/lib/plans";

type PreviewGift = {
  code: string;
  tier: "pro" | "hacker";
  interval: "monthly" | "sixmonth";
  redeemed: boolean;
};

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "missing-code" }
  | { kind: "invalid-code" }
  | { kind: "already-redeemed" }
  | { kind: "ready"; gift: PreviewGift }
  | { kind: "error"; message: string };

function intervalLabel(i: "monthly" | "sixmonth") {
  return i === "sixmonth" ? "6 months" : "1 month";
}

export default function GiftPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <GiftInner />
    </Suspense>
  );
}

function Skeleton() {
  return (
    <main className="bg-paper text-body">
      <SiteNav />
      <PageLoader />
    </main>
  );
}

function GiftInner() {
  const params = useSearchParams();
  const urlCode = (params.get("code") || "").trim().toUpperCase();
  const { user, loading, getIdToken } = useAuth();
  const [codeInput, setCodeInput] = useState(urlCode);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [redeeming, setRedeeming] = useState(false);
  const [redeemed, setRedeemed] = useState<{
    tier: "pro" | "hacker";
    interval: "monthly" | "sixmonth";
    expiresAt: number;
  } | null>(null);

  useEffect(() => {
    if (!urlCode) {
      setStatus({ kind: "idle" });
      return;
    }
    void loadPreview(urlCode);
  }, [urlCode]);

  async function loadPreview(code: string) {
    setStatus({ kind: "loading" });
    try {
      const res = await fetch(
        `/api/gifts/preview?code=${encodeURIComponent(code)}`
      );
      if (res.status === 404) {
        setStatus({ kind: "invalid-code" });
        return;
      }
      if (!res.ok) {
        setStatus({ kind: "error", message: "Could not look up that code." });
        return;
      }
      const data = await res.json();
      const gift = data?.gift as PreviewGift | undefined;
      if (!gift) {
        setStatus({ kind: "invalid-code" });
        return;
      }
      if (gift.redeemed) {
        setStatus({ kind: "already-redeemed" });
        return;
      }
      setStatus({ kind: "ready", gift });
    } catch {
      setStatus({ kind: "error", message: "Network error. Try again." });
    }
  }

  async function redeem() {
    const code = (
      status.kind === "ready" ? status.gift.code : codeInput
    )
      .trim()
      .toUpperCase();
    if (!code) {
      setStatus({ kind: "missing-code" });
      return;
    }
    if (!user) {
      window.location.href = `/signin?next=${encodeURIComponent(
        `/gift?code=${code}`
      )}`;
      return;
    }
    if (!user.emailVerified) {
      setStatus({
        kind: "error",
        message: "Verify your email before redeeming a gift.",
      });
      return;
    }
    setRedeeming(true);
    try {
      const token = await getIdToken();
      if (!token) {
        setStatus({
          kind: "error",
          message: "Sign in to redeem your gift.",
        });
        return;
      }
      const res = await fetch("/api/gifts/redeem", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus({
          kind: "error",
          message: data?.message || "Could not redeem that code.",
        });
        return;
      }
      setRedeemed({
        tier: data.tier,
        interval: data.interval,
        expiresAt: data.expiresAt,
      });
    } finally {
      setRedeeming(false);
    }
  }

  if (loading) {
    return <Skeleton />;
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav />
      <div className="mx-auto max-w-xl px-6 py-12">
        <h1 className="text-2xl font-semibold text-ink">Redeem a gift</h1>
        <p className="mt-2 text-sm text-muted">
          Paste a gift code to unlock a plan your friend bought for you.
        </p>

        {redeemed ? (
          <div className="mt-8 rounded-xl border border-hair bg-offwhite p-6">
            <div className="text-sm uppercase tracking-wider text-muted">
              Gift redeemed
            </div>
            <div className="mt-2 text-xl font-semibold text-ink">
              {planLabel(redeemed.tier)} - {intervalLabel(redeemed.interval)}
            </div>
            <p className="mt-3 text-sm text-muted">
              Your plan is active until{" "}
              {new Date(redeemed.expiresAt).toLocaleDateString()}.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href="/study" className="btn-primary">
                Start studying
              </a>
              <a href="/account?tab=billing" className="btn-ghost">
                View billing
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-hair bg-offwhite p-6">
            {status.kind === "ready" && (
              <div className="mb-4">
                <div className="text-sm uppercase tracking-wider text-muted">
                  Gift waiting for you
                </div>
                <div className="mt-1 text-xl font-semibold text-ink">
                  {planLabel(status.gift.tier)} -{" "}
                  {intervalLabel(status.gift.interval)}
                </div>
              </div>
            )}

            <label className="label">Gift code</label>
            <input
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              placeholder="ABCDE12345"
              className="mt-1 w-full rounded-md border border-hair bg-paper px-3 py-2 font-mono text-sm tracking-widest text-ink"
              autoCapitalize="characters"
              spellCheck={false}
              disabled={redeeming}
            />

            <button
              type="button"
              onClick={redeem}
              disabled={redeeming || !codeInput.trim()}
              className="btn-primary mt-4 disabled:opacity-50"
            >
              {redeeming
                ? "Redeeming…"
                : user
                  ? "Redeem gift"
                  : "Sign in & redeem"}
            </button>

            {status.kind === "loading" && (
              <p className="mt-3 text-xs text-muted">Checking code…</p>
            )}
            {status.kind === "invalid-code" && (
              <p className="mt-3 text-xs text-danger">
                That gift code doesn't exist.
              </p>
            )}
            {status.kind === "already-redeemed" && (
              <p className="mt-3 text-xs text-danger">
                This gift has already been redeemed.
              </p>
            )}
            {status.kind === "error" && (
              <p className="mt-3 text-xs text-danger">{status.message}</p>
            )}
          </div>
        )}

        <div className="mt-10 text-xs text-muted">
          Want to gift a plan? <a href="/account?tab=billing" className="underline">Head to billing.</a>
        </div>
      </div>
    </main>
  );
}
