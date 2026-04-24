"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";

type Props = {
  kind: "plan" | "pack" | "gift";
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
    // Try to open Ko-fi in a centered popup window so the buyer stays on
    // FinalsPrep. If the browser blocks the popup (or returns a closed
    // handle, which some blockers do silently), fall back to redirecting
    // the main window to the Ko-fi URL. No dead-end for the buyer.
    const width = 520;
    const height = 720;
    const left = Math.max(0, Math.floor((window.screen.availWidth - width) / 2));
    const top = Math.max(0, Math.floor((window.screen.availHeight - height) / 2));
    const features = `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    let popup: Window | null = null;
    try {
      popup = window.open(kofiUrl, "finalsprep_checkout", features);
    } catch {
      popup = null;
    }
    if (!popup || popup.closed || typeof popup.focus !== "function") {
      // Popup blocker tripped: send the main window itself to Ko-fi.
      // The buyer will come back via Ko-fi's redirect URL (/success or
      // /shop?status=ok), which still fires the webhook and grants access.
      window.location.href = kofiUrl;
      return;
    }
    const opened: Window = popup;
    popupRef.current = opened;
    setStatus({ kind: "waiting" });
    try { opened.focus(); } catch {}
    // Poll for close in case the postMessage never arrives (e.g. buyer
    // cancels, or Ko-fi doesn't redirect back to our domain).
    pollRef.current = window.setInterval(() => {
      if (opened.closed) {
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
            : `Pay $${priceUsd.toFixed(2)} with card`}
        </button>

        {status.kind === "waiting" && (
          <p className="mt-3 text-center text-xs text-muted">
            Checkout opened in a popup. If you closed it by accident,{" "}
            <button onClick={openPopup} className="underline">
              reopen it
            </button>
            .
          </p>
        )}

        {status.kind === "cancelled" && (
          <div className="mt-3 rounded-md bg-orange-tint/60 p-3 text-sm text-orange-ink">
            <p>
              Looks like you closed the checkout before finishing. If you did pay,
              give it a minute. Your access will activate automatically from the
              receipt.
            </p>
            {kofiUrl && (
              <p className="mt-2">
                Popup blocked or stuck?{" "}
                <button
                  onClick={() => { window.location.href = kofiUrl; }}
                  className="underline"
                >
                  Continue checkout in this tab
                </button>
                .
              </p>
            )}
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-muted">
        Payments are processed securely through our payment provider. Pay
        with a credit or debit card and we never see your card number.
        7-day refund, no questions. Reach us via{" "}
        <a className="underline" href="/contact?topic=billing">
          /contact
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
        The product link for this <strong className="text-ink">${priceUsd.toFixed(2)}</strong>{" "}
        item isn't set. Send us a note via{" "}
        <a className="underline" href="/contact?topic=billing">
          /contact
        </a>{" "}
        and we'll activate your plan manually within a few hours.
      </p>
    </section>
  );
}
