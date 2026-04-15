"use client";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";
import { TOKEN_PACKS } from "@/lib/tokenPacks";

export default function ShopPage() {
  const { user, loading, getIdToken } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [buying, setBuying] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/signin?next=/shop";
    }
  }, [loading, user]);

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    const unsub = onSnapshot(
      doc(db, "users", user.uid, "profile", "tokenBank"),
      (snap) => {
        const d = snap.data() as any;
        setBalance(typeof d?.balance === "number" ? d.balance : 0);
      },
      () => setBalance(0)
    );
    return () => unsub();
  }, [user]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const status = url.searchParams.get("status");
    if (status === "ok") {
      setMsg("Thanks! Your tokens should land in a few seconds.");
    } else if (status === "canceled") {
      setMsg("Checkout canceled. No charge.");
    }
    if (status) {
      url.searchParams.delete("status");
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

  async function buy(packId: string) {
    setBuying(packId);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ packId }),
      });
      const { url, error } = await res.json();
      if (url) window.location.href = url;
      else setMsg(error || "Checkout not ready yet.");
    } finally {
      setBuying(null);
    }
  }

  if (loading || !user) {
    return (
      <main className="bg-paper">
        <SiteNav>
          <a href="/study" className="nav-link">Study</a>
          <a href="/chat" className="nav-link">Chat</a>
        </SiteNav>
        <section className="mx-auto max-w-4xl px-6 py-20 text-center text-muted">
          Loading…
        </section>
      </main>
    );
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav>
        <a href="/study" className="nav-link">Study</a>
        <a href="/chat" className="nav-link">Chat</a>
      </SiteNav>
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="label mb-3">Shop</div>
        <h1 className="font-serif text-[44px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[52px]">
          Bonus tokens.
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-muted">
          Used up your daily budget and still have homework? Top up with a
          one-time pack. Bonus tokens stack with your daily allowance and
          never expire.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-hair bg-white px-4 py-2 text-sm">
          <span className="text-muted">Your bonus balance:</span>
          <strong className="font-mono text-ink">
            {balance === null ? "…" : balance.toLocaleString()}
          </strong>
          <span className="text-muted">tokens</span>
        </div>

        {msg && (
          <div className="mt-6 rounded-md border border-orange/40 bg-orange-tint p-3 text-sm text-orange-ink">
            {msg}
          </div>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TOKEN_PACKS.map((pack, i) => (
            <div
              key={pack.id}
              className={`rounded-xl border bg-white p-6 ${
                i === 1
                  ? "border-2 border-ink shadow-[0_20px_60px_-28px_rgba(0,0,0,0.35)]"
                  : "border-hair"
              }`}
            >
              <div className="label">{pack.label}</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-5xl font-normal text-ink">
                  ${pack.priceUsd}
                </span>
                <span className="text-sm text-muted">one time</span>
              </div>
              <div className="mt-2 text-sm text-body">
                <strong className="text-ink">
                  {pack.tokens.toLocaleString()}
                </strong>{" "}
                bonus tokens
              </div>
              <p className="mt-2 text-xs text-muted">
                {i === 0
                  ? "Covers a tough homework night."
                  : i === 1
                  ? "Sticks through a week of finals prep."
                  : "For heavy study sessions + FRQ practice."}
              </p>
              <button
                onClick={() => buy(pack.id)}
                disabled={buying !== null}
                className={`mt-5 w-full rounded-md px-4 py-3 text-center text-base font-medium transition disabled:opacity-50 ${
                  i === 1
                    ? "bg-ink text-white hover:bg-ink/90"
                    : "border border-hair bg-white text-ink hover:border-ink"
                }`}
              >
                {buying === pack.id ? "Opening checkout…" : `Buy ${pack.label}`}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted">
          Checkout runs through Stripe. Tokens credit to your account within
          a few seconds of the payment clearing. One-time purchase — no
          subscription, no auto-renew.
        </p>
      </section>
    </main>
  );
}
