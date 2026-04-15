/**
 * Rate limiter with per-day token budgets.
 *
 * Three tiers:
 *   LEARNER - starter budget, enough to test the tutor on real homework
 *   PRO     - comfortable daily budget for active students
 *   HACKER  - biggest budget + priority traffic
 *
 * Each call costs real tokens (input + output). We record the actual
 * usage so the budget scales with real cost, not request count.
 *
 * Budgets are displayed as "tokens per day" and the values below are
 * the numbers the user actually sees — generous round totals so the
 * value is obvious. Inflation is a feature, not a bug: each chat
 * exchange burns only a few hundred tokens so a 10k/day learner
 * budget still lets them run the tutor every day.
 *
 * IMPORTANT production caveat:
 *   This limiter is in-memory. In local dev (single Node process) it
 *   works. On Vercel serverless, each cold start gets a fresh Map. For
 *   real production abuse protection, back this with Upstash Redis or
 *   Firestore — this file is the single place to swap the backend.
 */

export type Tier = "learner" | "pro" | "hacker";

export const LIMITS = {
  /** 24-hour sliding window. */
  WINDOW_MS: 24 * 60 * 60 * 1000,
  MAX_INPUT_CHARS: 1200,
  MAX_HISTORY: 20,
  /** Minimum tokens we need in the budget before we even attempt a call. */
  RESERVE_MIN_TOKENS: 700,

  learner: {
    tokens: 10_000,
    messages: 40,
  },
  pro: {
    tokens: 20_000,
    messages: 80,
  },
  hacker: {
    tokens: 80_000,
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
    case "hacker":
      return "Hacker plan";
    default:
      return "Learner plan";
  }
}

function tierUpgradeHint(tier: Tier): string {
  switch (tier) {
    case "learner":
      return " Upgrade to Pro or Hacker for a much bigger daily budget.";
    case "pro":
      return " Upgrade to Hacker for the largest daily budget + priority traffic.";
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

/** Check whether a new call is allowed. Does NOT deduct tokens — you must
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
      message: `You've hit the ${tierLabel(tier)} daily message cap. ${humanReset(
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
      message: `You've used your ${tierLabel(tier)} daily tokens. ${humanReset(
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
 *  Real calls always return usage — this is just so we never record 0. */
export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}
