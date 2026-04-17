"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import SiteNav from "@/app/components/SiteNav";
import PageLoader from "@/app/components/PageLoader";
import { useAuth } from "@/app/components/AuthProvider";
import { TOKEN_PACKS } from "@/lib/tokenPacks";
import {
  AP_SALE_FIRST_MONTH_OFF_USD,
  checkoutDescription,
  parseCheckoutPlan,
  planPrice,
} from "@/lib/plans";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<Shell><PageLoader /></Shell>}>
      <CheckoutInner />
    </Suspense>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-paper text-body min-h-screen">
      <SiteNav />
      {children}
    </main>
  );
}

function CheckoutInner() {
  const { user, loading, getIdToken } = useAuth();
  const [params, setParams] = useState<URLSearchParams | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "approving" }
    | { kind: "capturing" }
    | { kind: "success"; message: string }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setParams(new URLSearchParams(window.location.search));
    }
  }, []);

  useEffect(() => {
    if (!loading && !user && params) {
      const next = `/checkout?${params.toString()}`;
      window.location.href = `/signin?next=${encodeURIComponent(next)}`;
    }
  }, [loading, user, params]);

  const item = useMemo(() => {
    if (!params) return null;
    const pack = params.get("pack");
    if (pack) {
      const match = TOKEN_PACKS.find((p) => p.id === pack);
      if (!match) return null;
      return {
        kind: "pack" as const,
        sku: match.id,
        title: match.label,
        subtitle: `${match.tokens.toLocaleString()} bonus tokens, never expire`,
        priceUsd: match.priceUsd,
      };
    }
    const planRaw = params.get("plan") || "pro-monthly";
    const { key, tier, interval } = parseCheckoutPlan(planRaw);
    const { amount } = planPrice(key);
    const subtitleBase =
      interval === "monthly"
        ? "1 month of access. Does not auto-renew."
        : "6 months of access. Does not auto-renew.";
    return {
      kind: "plan" as const,
      sku: key,
      title: checkoutDescription(tier, interval),
      subtitle: subtitleBase,
      priceUsd: amount,
    };
  }, [params]);

  const finalPrice = useMemo(() => {
    if (!item) return 0;
    if (item.kind === "plan" && item.sku === "pro-monthly" && appliedCoupon === "SCORE5") {
      return Math.max(0.5, +(item.priceUsd - AP_SALE_FIRST_MONTH_OFF_USD).toFixed(2));
    }
    return item.priceUsd;
  }, [item, appliedCoupon]);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (loading || !params) return <Shell><PageLoader /></Shell>;
  if (!user) return <Shell><PageLoader /></Shell>;

  if (!item) {
    return (
      <Shell>
        <section className="mx-auto max-w-xl px-6 py-16">
          <h1 className="font-serif text-3xl text-ink">We couldn't find that item.</h1>
          <p className="mt-3 text-body">Check the link or head back to the pricing page.</p>
          <a href="/#price" className="btn-primary mt-6 inline-flex">View pricing</a>
        </section>
      </Shell>
    );
  }

  if (!clientId) {
    return (
      <Shell>
        <section className="mx-auto max-w-xl px-6 py-16">
          <h1 className="font-serif text-3xl text-ink">Checkout isn't configured yet.</h1>
          <p className="mt-3 text-body">
            <code>NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> is not set. Add it in your
            environment variables and redeploy.
          </p>
        </section>
      </Shell>
    );
  }

  const activeItem = item;

  async function handleApplyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setAppliedCoupon(null);
      return;
    }
    if (activeItem?.kind === "plan" && activeItem.sku === "pro-monthly" && code === "SCORE5") {
      setAppliedCoupon("SCORE5");
    } else {
      setAppliedCoupon(null);
      setStatus({
        kind: "error",
        message: "That code doesn't apply to this purchase.",
      });
    }
  }

  async function createOrder() {
    if (!activeItem) throw new Error("Missing item");
    setStatus({ kind: "approving" });
    const token = await getIdToken();
    if (!token) {
      throw new Error("Not signed in");
    }
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(
        activeItem.kind === "pack"
          ? { pack: activeItem.sku }
          : { plan: activeItem.sku, coupon: appliedCoupon }
      ),
    });
    const data = await res.json();
    if (!res.ok || !data?.orderID) {
      throw new Error(data?.error || "Could not create order");
    }
    return data.orderID as string;
  }

  async function onApprove(data: { orderID: string }) {
    if (!activeItem) return;
    setStatus({ kind: "capturing" });
    const token = await getIdToken();
    if (!token) {
      setStatus({ kind: "error", message: "Session expired. Sign in again." });
      return;
    }
    const res = await fetch("/api/paypal/capture-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderID: data.orderID }),
    });
    const json = await res.json();
    if (!res.ok || !json?.ok) {
      setStatus({
        kind: "error",
        message:
          json?.error === "capture-not-completed"
            ? "PayPal didn't confirm your payment. If money was charged, email us and we'll make it right."
            : "Payment captured, but we couldn't unlock your account. Email finalsprephelp@gmail.com with your PayPal order ID.",
      });
      return;
    }
    if (json.kind === "plan") {
      window.location.href = "/success?plan=" + encodeURIComponent(activeItem.sku);
    } else if (json.kind === "pack") {
      window.location.href = "/shop?status=ok";
    } else {
      window.location.href = "/account";
    }
  }

  return (
    <Shell>
      <section className="mx-auto max-w-xl px-6 py-12">
        <div className="label mb-3">Checkout</div>
        <h1 className="font-serif text-4xl font-normal leading-tight text-ink">
          {item.title}
        </h1>
        <p className="mt-2 text-sm text-muted">{item.subtitle}</p>

        <div className="mt-8 rounded-xl border border-hair bg-paper p-6">
          <div className="flex items-baseline justify-between">
            <div className="label">Total due</div>
            <div className="font-serif text-4xl text-ink">
              ${finalPrice.toFixed(2)}
            </div>
          </div>
          {appliedCoupon && (
            <div className="mt-2 text-xs text-orange-ink">
              Coupon <code className="font-mono">{appliedCoupon}</code> applied
              — ${AP_SALE_FIRST_MONTH_OFF_USD.toFixed(2)} off.
            </div>
          )}

          {item.kind === "plan" && item.sku === "pro-monthly" && (
            <div className="mt-5 flex flex-wrap gap-2">
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon (e.g. SCORE5)"
                className="min-w-0 flex-1 rounded-md border border-hair bg-paper px-3 py-2 text-sm outline-none focus:border-ink"
              />
              <button
                onClick={handleApplyCoupon}
                className="rounded-md border border-hair px-4 py-2 text-sm hover:border-ink"
              >
                Apply
              </button>
            </div>
          )}

          <div className="mt-6">
            <PayPalScriptProvider
              options={{
                clientId,
                currency: "USD",
                intent: "capture",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical", label: "pay" }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={(err) =>
                  setStatus({
                    kind: "error",
                    message:
                      (err as { message?: string })?.message || "PayPal error",
                  })
                }
                onCancel={() => setStatus({ kind: "idle" })}
              />
            </PayPalScriptProvider>
          </div>

          {status.kind === "capturing" && (
            <p className="mt-4 text-sm text-muted">Finalizing your purchase…</p>
          )}
          {status.kind === "error" && (
            <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
              {status.message}
            </p>
          )}
        </div>

        <p className="mt-6 text-xs text-muted">
          Payments are handled by PayPal. We never see your card number —
          just a PayPal order ID and payment status. 7-day refund, no
          questions. Email{" "}
          <a className="underline" href="mailto:finalsprephelp@gmail.com">
            finalsprephelp@gmail.com
          </a>
          .
        </p>
      </section>
    </Shell>
  );
}
