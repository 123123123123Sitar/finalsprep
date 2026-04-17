"use client";

import { useEffect } from "react";

/** When the success page is loaded inside a popup (from the /checkout
 *  flow), notify the opener and close. If we're not in a popup, this is
 *  a no-op and the page renders normally. */
export default function SuccessNotifier({ plan }: { plan: string | null }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const opener = window.opener as Window | null;
    if (!opener || opener === window || opener.closed) return;
    try {
      opener.postMessage(
        { type: "finalsprep:purchase-complete", plan },
        window.location.origin
      );
    } catch {}
    // Give the parent a moment to react, then close.
    const t = window.setTimeout(() => {
      try { window.close(); } catch {}
    }, 400);
    return () => window.clearTimeout(t);
  }, [plan]);

  return null;
}
