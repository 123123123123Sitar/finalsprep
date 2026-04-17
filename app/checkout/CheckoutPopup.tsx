"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";

type Props = {
  kind: "plan" | "pack";
  sku: string;
  title: string;
  subtitle: string;
  priceUsd: number;
  kofiUrl: string | null;
  successPath: string;
  benefits: string[];
};

type Status =
  | { kind: "idle" }
  | { kind: "opening" }
  | { kind: "waiting" }
  | { kind: "success" }
  | { kind: "cancelled" }
  | { kind: "fallback" };

export default function CheckoutPopup(props: Props) {
  const { title, subtitle, priceUsd, kofiUrl, successPath, benefits } = props;
  const { user, loading } = useAuth();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const popupRef = useRef<Window | null>(null);
  const pollRef = useRef<number | null>(null);

  useEffect(() => {
    if (!loading && !user && typeof window !== "undefined") {
      const next = window.location.pathname + window.location.search;
      window.location.href = `/signin?next=${encodeURIComponent(next)}`;
    }
  }, [loading, user]);

  // Listen for the postMessage from the success page (which is loaded
  // inside the popup after a successful Ko-fi redirect).
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const data = e.data as { type?: string; plan?: string };
      if (data?.type === "finalsprep:purchase-complete") {
        setStatus({ kind: "success" });
        stopPolling();
        try { popupRef.current?.close(); } catch {}
        setTimeout(() => { window.location.href = successPath; }, 300);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [successPath]);

  const stopPolling = useCallback(() => {
    if (pollRef.current != null) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  useEffect(() => stopPolling, [stopPolling]);

  const openPopup = useCallback(() => {
    if (!kofiUrl) {
      setStatus({ kind: "fallback" });
      return;
    }
    // Open as a normal new tab (no popup=yes features). Ko-fi's checkout
    // uses PayPal Smart Buttons, which silently refuse to initialise in
    // restricted popup windows — a full tab gives them the capabilities
    // they need while still leaving the FinalsPrep page intact underneath.
    const popup = window.open(kofiUrl, "finalsprep_checkout");
    if (!popup) {
      setStatus({ kind: "fallback" });
      return;
    }
    popupRef.current = popup;
    setStatus({ kind: "waiting" });
    try { popup.focus(); } catch {}
    // Poll for close in case the postMessage never arrives (e.g. buyer
    // cancels, or Ko-fi doesn't redirect back to our domain).
    pollRef.current = window.setInterval(() => {
      if (popup.closed) {
        stopPolling();
        setStatus((prev) => (prev.kind === "success" ? prev : { kind: "cancelled" }));
      }
    }, 500);
  }, [kofiUrl, stopPolling]);

  if (!kofiUrl) {
    return <NotConfigured priceUsd={priceUsd} />;
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <div className="label mb-3">Checkout</div>
      <h1 className="font-serif text-4xl font-normal leading-tight text-ink">{title}</h1>
      <p className="mt-2 text-sm text-muted">{subtitle}</p>

      <div className="mt-8 rounded-xl border border-hair bg-paper p-6">
        <div className="flex items-baseline justify-between">
          <div className="label">Total today</div>
          <div className="font-serif text-5xl text-ink">${priceUsd.toFixed(2)}</div>
        </div>

        <ul className="mt-6 space-y-2 text-[15px] text-body">
          {benefits.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-orange" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={openPopup}
          disabled={status.kind === "waiting" || status.kind === "success"}
          className="btn-primary mt-7 w-full justify-center text-base disabled:opacity-60"
        >
          {status.kind === "waiting"
            ? "Finish in the other tab…"
            : status.kind === "success"
            ? "Unlocking your account…"
            : `Pay $${priceUsd.toFixed(2)} with card or PayPal`}
        </button>

        {status.kind === "waiting" && (
          <p className="mt-3 text-center text-xs text-muted">
            A new tab opened for secure checkout. If you closed it by accident,{" "}
            <button onClick={openPopup} className="underline">
              reopen it
            </button>
            .
          </p>
        )}

        {status.kind === "cancelled" && (
          <p className="mt-3 rounded-md bg-orange-tint/60 p-3 text-sm text-orange-ink">
            Looks like you closed the checkout before finishing. If you did pay,
            give it a minute — your access will activate automatically from the
            receipt.
          </p>
        )}
      </div>

      <p className="mt-6 text-xs text-muted">
        Payments are processed by Ko-fi and route to our PayPal. You can pay
        with a credit/debit card or a PayPal account — we never see your card
        number. 7-day refund, no questions. Email{" "}
        <a className="underline" href="mailto:finalsprephelp@gmail.com">
          finalsprephelp@gmail.com
        </a>
        .
      </p>
    </section>
  );
}

function NotConfigured({ priceUsd }: { priceUsd: number }) {
  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-serif text-3xl text-ink">Checkout isn't configured yet.</h1>
      <p className="mt-3 text-body">
        The Ko-fi product link for this item isn't set. For now you can send{" "}
        <strong className="text-ink">${priceUsd.toFixed(2)}</strong> to{" "}
        <a className="underline" href="https://ko-fi.com/finalsprep" target="_blank" rel="noopener noreferrer">
          ko-fi.com/finalsprep
        </a>{" "}
        and we'll activate your plan within a few hours.
      </p>
    </section>
  );
}
