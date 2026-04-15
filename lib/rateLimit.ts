/**
 * Rate limiter using a sliding 5-hour token window - the same shape as
 * Claude's own free plan. Every call costs real tokens (input + output);
 * the limit is a total token budget that replenishes continuously.
 *
 * Why tokens not requests:
 *   A per-request cap (3/day, etc.) lets tiny messages be "free" and
 *   punishes anyone asking a real question. Tokens scale with actual cost,
 *   which is both fair to users and protective of our margins.
 *
 * Three tiers:
 *   FREE    - tight budget, enough to test the tutor
 *   PRO     - larger budget for active students, includes image uploads
 *   PREMIUM - largest budget, model chooser, custom API key option
 *
 * All tiers also enforce a message-count safety cap so that a
 * low-token spammer can't hammer the API with hundreds of one-word
 * prompts.
 *
 * IMPORTANT production caveat:
 *   This limiter is in-memory. In local dev (single Node process) it
 *   works. On Vercel serverless, each cold start gets a fresh Map. For
 *   real production abuse protection, back this with Upstash Redis or
 *   Firestore - this file is the single place to swap the backend.
 */

export type Tier = "free" | "pro" | "premium";

export const LIMITS = {
  WINDOW_MS: 5 * 60 * 60 * 1000, // 5-hour sliding window
  MAX_INPUT_CHARS: 1200,
  MAX_HISTORY: 20,
  /** Minimum tokens we need in the budget before we even attempt a call. */
  RESERVE_MIN_TOKENS: 700,

  free: {
    tokens: 4000, // ~5-8 real chat exchanges per 5h
    messages: 10,
  },
  pro: {
    tokens: 30000,
    messages: 80,
  },
  premium: {
    tokens: 120000,
    messages: 250,
  },
} as const;

type Entry = { t: number; tokens: number };

const buckets = new Map<string, Entry[]>();

function now(): number {
  return Date.now();
}

function trimWindow(list: Entry[], at: number): Entry[] {
  const cutoff = at - LIMITS.WINDOW_MS;
  return list.filter((e) => e.t >= cutoff);
}

function getList(key: string, at: number): Entry[] {
  const list = trimWindow(buckets.get(key) || [], at);
  buckets.set(key, list);
  return list;
}

function resetInMinutes(list: Entry[], at: number): number {
  if (list.length === 0) return 0;
  const oldest = list[0].t;
  const resetAt = oldest + LIMITS.WINDOW_MS;
  return Math.max(1, Math.ceil((resetAt - at) / 60000));
}

function humanReset(minutes: number): string {
  if (minutes < 60) return `Resets in ${minutes} minute${minutes === 1 ? "" : "s"}.`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `Resets in ${h} hour${h === 1 ? "" : "s"}.`;
  return `Resets in ${h}h ${m}m.`;
}

function tierLabel(tier: Tier): string {
  switch (tier) {
    case "pro":
      return "Pro plan";
    case "premium":
      return "Premium plan";
    default:
      return "Free plan";
  }
}

function tierUpgradeHint(tier: Tier): string {
  switch (tier) {
    case "free":
      return " Upgrade to Pro or Premium for more AI budget.";
    case "pro":
      return " Upgrade to Premium for the largest AI budget.";
    default:
      return "";
  }
}

export type ReserveResult =
  | {
      ok: true;
      tier: Tier;
      tokensRemaining: number;
      messagesRemaining: number;
    }
  | {
      ok: false;
      tier: Tier;
      reason: "tokens" | "messages";
      message: string;
      tokensRemaining: number;
      messagesRemaining: number;
      resetMinutes: number;
    };

/** Check whether a new call is allowed. Does NOT deduct tokens - you must
 *  call `record()` after the API call with the actual token count. */
export function reserve(key: string, tier: Tier): ReserveResult {
  const at = now();
  const caps = LIMITS[tier];
  const list = getList(key, at);

  const tokensUsed = list.reduce((s, e) => s + e.tokens, 0);
  const messagesUsed = list.length;
  const tokensRemaining = Math.max(0, caps.tokens - tokensUsed);
  const messagesRemaining = Math.max(0, caps.messages - messagesUsed);

  if (messagesUsed >= caps.messages) {
    const mins = resetInMinutes(list, at);
    return {
      ok: false,
      tier,
      reason: "messages",
      message: `You've hit the ${tierLabel(tier)} message cap for this 5-hour window. ${humanReset(
        mins
      )}${tierUpgradeHint(tier)}`,
      tokensRemaining,
      messagesRemaining: 0,
      resetMinutes: mins,
    };
  }
  if (tokensRemaining < LIMITS.RESERVE_MIN_TOKENS) {
    const mins = resetInMinutes(list, at);
    return {
      ok: false,
      tier,
      reason: "tokens",
      message: `You've used your ${tierLabel(tier)} tokens for this 5-hour window. ${humanReset(
        mins
      )}${tierUpgradeHint(tier)}`,
      tokensRemaining: 0,
      messagesRemaining,
      resetMinutes: mins,
    };
  }
  return {
    ok: true,
    tier,
    tokensRemaining,
    messagesRemaining,
  };
}

/** Record actual token usage after a successful API call. */
export function record(key: string, tokens: number): void {
  if (tokens <= 0) return;
  const at = now();
  const list = getList(key, at);
  list.push({ t: at, tokens });
  buckets.set(key, list);
}

/** Peek at remaining budget without consuming. */
export function peek(key: string, tier: Tier): {
  tokensRemaining: number;
  messagesRemaining: number;
  resetMinutes: number;
} {
  const at = now();
  const caps = LIMITS[tier];
  const list = getList(key, at);
  const tokensUsed = list.reduce((s, e) => s + e.tokens, 0);
  return {
    tokensRemaining: Math.max(0, caps.tokens - tokensUsed),
    messagesRemaining: Math.max(0, caps.messages - list.length),
    resetMinutes: resetInMinutes(list, at),
  };
}

/** Parse the lightweight client ID from the Cookie header. */
function readClientCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const m = cookieHeader.match(/(?:^|;\s*)fp_uid=([A-Za-z0-9_-]{6,64})/);
  return m ? m[1] : null;
}

/** Compose a per-client key. IP alone is too easy to rotate with a VPN, so
 *  we combine IP + cookie + short UA fingerprint to raise the floor. */
export function clientKey(req: Request): string {
  const h = req.headers;
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "";
  const cookie = readClientCookie(h.get("cookie"));
  const ua = (h.get("user-agent") || "").slice(0, 40);
  return `${ip || "noip"}::${cookie || "nocookie"}::${ua}`;
}

/** Preferred: a stable user-id-based key. Falls back to IP-based. */
export function userKey(uid: string | null | undefined, req: Request): string {
  if (uid) return `uid:${uid}`;
  return clientKey(req);
}

/** Clamp & sanitize user-provided input before it ever hits an LLM. */
export function clampInput(text: unknown): string {
  if (typeof text !== "string") return "";
  return text.slice(0, LIMITS.MAX_INPUT_CHARS).trim();
}

/** Rough token estimator when the API doesn't report usage (fallback only).
 *  Real calls always return usage - this is just so we never record 0. */
export function estimateTokens(text: string): number {
  // 1 token ≈ 4 chars for English text, plus some overhead.
  return Math.max(1, Math.ceil(text.length / 4));
}
