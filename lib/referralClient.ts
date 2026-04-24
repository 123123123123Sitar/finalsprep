/**
 * Client-side helpers for stashing an inbound `?ref=CODE` until the
 * user finishes email verification. Kept tiny and side-effect-free so
 * it can be imported from multiple entry points without conflict.
 */
const REF_KEY = "fp-referral-code";

export function stashReferralCodeFromUrl(): void {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const raw = url.searchParams.get("ref");
    if (!raw) return;
    const clean = raw.trim().toUpperCase();
    if (!/^[A-Z0-9]{4,12}$/.test(clean)) return;
    // Don't overwrite: whoever got here first wins so a later
    // reshare can't steal the credit from a real inbound signup.
    if (!window.localStorage.getItem(REF_KEY)) {
      window.localStorage.setItem(REF_KEY, clean);
    }
  } catch {
    /* ignore */
  }
}

export function readStashedReferralCode(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(REF_KEY);
    return v && v.length > 0 ? v : null;
  } catch {
    return null;
  }
}

export function clearStashedReferralCode(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(REF_KEY);
  } catch {
    /* ignore */
  }
}
