"use client";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";
import { TOKEN_PACKS } from "@/lib/tokenPacks";
import PageLoader from "@/app/components/PageLoader";

export default function ShopPage() {
  const { user, loading, getIdToken } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
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
      // If we're inside the checkout popup, notify the opener and close.
      const opener = window.opener as Window | null;
      if (opener && opener !== window && !opener.closed) {
        try {
          opener.postMessage(
            { type: "finalsprep:purchase-complete", plan: "pack" },
            window.location.origin
          );
        } catch {}
        window.setTimeout(() => {
          try { window.close(); } catch {}
        }, 400);
      }
    } else if (status === "canceled") {
      setMsg("Checkout canceled. No charge.");
    }
    if (status) {
      url.searchParams.delete("status");
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

  async function buy(packId: string) {
    const token = await getIdToken();
    if (!token) {
      window.location.href = `/signin?next=${encodeURIComponent(
        "/checkout?pack=" + packId
      )}`;
      return;
    }
    window.location.href = `/checkout?pack=${encodeURIComponent(packId)}`;
  }

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
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="label mb-3">Shop</div>
        <h1 className="font-serif text-[44px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[52px]">
          Bonus tokens.
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-muted">
          Used up your daily budget and still have homework? Top up with a
          one-time pack. Bonus tokens stack with your daily allowance and
          never expire.
        </p>

        <div data-tour="shop-balance" className="mt-8 inline-block rounded-xl border border-orange/40 bg-orange-tint px-6 py-4">
          <div className="label text-orange-ink">Your current balance</div>
          <div className="mt-1 font-serif text-4xl font-normal text-orange-ink">
            {balance === null ? "…" : balance.toLocaleString()}
          </div>
          <div className="mt-0.5 text-sm text-orange-ink/70">bonus tokens · never expire</div>
        </div>

        {msg && (
          <div className="mt-6 rounded-md border border-orange/40 bg-orange-tint p-3 text-sm text-orange-ink">
            {msg}
          </div>
        )}

        <div data-tour="shop-packs" className="mt-10 grid gap-5 md:grid-cols-3">
          {TOKEN_PACKS.map((pack, i) => (
            <div
              key={pack.id}
              className={`rounded-xl border bg-paper p-6 ${
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
                className={`mt-5 w-full rounded-md px-4 py-3 text-center text-base font-medium transition ${
                  i === 1
                    ? "bg-ink text-paper hover:bg-ink/90"
                    : "border border-hair bg-paper text-ink hover:border-ink"
                }`}
              >
                Buy {pack.label}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
