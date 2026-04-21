/**
 * Firestore-backed rate-limit tracker for authenticated users.
 *
 * The in-memory tracker in `rateLimit.ts` still handles anonymous/IP-based
 * callers (and local dev when the admin SDK isn't wired up), but a Vercel
 * cold start wipes that Map — which is why users would see "tokens remaining"
 * stay flat across requests. For signed-in users we persist the 24h sliding
 * window of token usage to `users/{uid}/profile/rateLimit`.
 *
 * One doc per user; `entries` is a small list (≤ the tier's daily message
 * cap, ≤ a few hundred), trimmed to the 24h window on every read/write so
 * it stays bounded.
 */
import { getAdminDb } from "@/lib/firebaseAdmin";
import { LIMITS, type Tier } from "./rateLimit";

type Entry = { t: number; tokens: number };
type RateLimitDoc = {
  entries?: Entry[];
  weeklyEntries?: Entry[];
  updatedAt?: number;
};

function docRef(uid: string) {
  const db = getAdminDb();
  if (!db) return null;
  return db.doc(`users/${uid}/profile/rateLimit`);
}

function trim(entries: Entry[], at: number): Entry[] {
  const cutoff = at - LIMITS.WINDOW_MS;
  return entries.filter((e) => typeof e?.t === "number" && e.t >= cutoff);
}

function trimWeekly(entries: Entry[], at: number): Entry[] {
  const cutoff = at - LIMITS.WEEKLY_WINDOW_MS;
  return entries.filter((e) => typeof e?.t === "number" && e.t >= cutoff);
}

function resetMinutesFor(entries: Entry[], at: number): number {
  if (entries.length === 0) return 0;
  const oldest = entries[0].t;
  return Math.max(1, Math.ceil((oldest + LIMITS.WINDOW_MS - at) / 60000));
}

function weeklyResetMinutesFor(entries: Entry[], at: number): number {
  if (entries.length === 0) return 0;
  const oldest = entries[0].t;
  return Math.max(
    1,
    Math.ceil((oldest + LIMITS.WEEKLY_WINDOW_MS - at) / 60000)
  );
}

export type PersistedUsage = {
  tokensUsed: number;
  tokensRemaining: number;
  messagesUsed: number;
  messagesRemaining: number;
  resetMinutes: number;
  /** Hidden weekly-window counters (not surfaced in the UI). */
  weeklyTokensUsed: number;
  weeklyTokensRemaining: number;
  weeklyResetMinutes: number;
};

function emptyUsage(tier: Tier): PersistedUsage {
  const caps = LIMITS[tier];
  return {
    tokensUsed: 0,
    tokensRemaining: caps.tokens,
    messagesUsed: 0,
    messagesRemaining: caps.messages,
    resetMinutes: 0,
    weeklyTokensUsed: 0,
    weeklyTokensRemaining: caps.weeklyTokens,
    weeklyResetMinutes: 0,
  };
}

/** Read the user's current window usage. Non-mutating. */
export async function peekUsage(
  uid: string,
  tier: Tier
): Promise<PersistedUsage> {
  const ref = docRef(uid);
  if (!ref) return emptyUsage(tier);
  try {
    const snap = await ref.get();
    if (!snap.exists) return emptyUsage(tier);
    const data = snap.data() as RateLimitDoc | undefined;
    const at = Date.now();
    const entries = trim(data?.entries ?? [], at);
    const weeklyEntries = trimWeekly(
      data?.weeklyEntries ?? data?.entries ?? [],
      at
    );
    const tokensUsed = entries.reduce((s, e) => s + (e.tokens || 0), 0);
    const weeklyTokensUsed = weeklyEntries.reduce(
      (s, e) => s + (e.tokens || 0),
      0
    );
    const caps = LIMITS[tier];
    return {
      tokensUsed,
      tokensRemaining: Math.max(0, caps.tokens - tokensUsed),
      messagesUsed: entries.length,
      messagesRemaining: Math.max(0, caps.messages - entries.length),
      resetMinutes: resetMinutesFor(entries, at),
      weeklyTokensUsed,
      weeklyTokensRemaining: Math.max(
        0,
        caps.weeklyTokens - weeklyTokensUsed
      ),
      weeklyResetMinutes: weeklyResetMinutesFor(weeklyEntries, at),
    };
  } catch {
    return emptyUsage(tier);
  }
}

/** Append an entry atomically, trimming the window on the same transaction. */
export async function recordUsage(uid: string, tokens: number): Promise<void> {
  if (tokens <= 0) return;
  const ref = docRef(uid);
  if (!ref) return;
  const db = getAdminDb();
  if (!db) return;
  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = (snap.exists ? snap.data() : null) as
        | RateLimitDoc
        | null
        | undefined;
      const at = Date.now();
      const entries = trim(data?.entries ?? [], at);
      const weeklyEntries = trimWeekly(
        data?.weeklyEntries ?? data?.entries ?? [],
        at
      );
      const entry = { t: at, tokens: Math.round(tokens) };
      entries.push(entry);
      weeklyEntries.push(entry);
      tx.set(
        ref,
        { entries, weeklyEntries, updatedAt: at },
        { merge: true }
      );
    });
  } catch (e) {
    console.error("[rateLimitStore] record failed", e);
  }
}

export type PersistedReserve =
  | ({ ok: true; tier: Tier } & PersistedUsage)
  | ({
      ok: false;
      tier: Tier;
      reason: "tokens" | "messages";
      message: string;
    } & PersistedUsage);

/** Check the user's budget; does NOT deduct. Callers still `recordUsage`
 *  after the API call with the real cost. */
export async function reserveUsage(
  uid: string,
  tier: Tier
): Promise<PersistedReserve> {
  const caps = LIMITS[tier];
  const p = await peekUsage(uid, tier);
  if (p.messagesUsed >= caps.messages) {
    return {
      ok: false,
      tier,
      reason: "messages",
      message: `You've hit your daily message cap. Resets in ~${p.resetMinutes} min.`,
      ...p,
    };
  }
  if (p.tokensRemaining < LIMITS.RESERVE_MIN_TOKENS) {
    return {
      ok: false,
      tier,
      reason: "tokens",
      message: `You've used your daily tokens. Resets in ~${p.resetMinutes} min.`,
      ...p,
    };
  }
  // Hidden weekly cap (5x daily per tier). Surfaced as the same "tokens"
  // error string so the UI never distinguishes it from the daily cap.
  if (p.weeklyTokensRemaining < LIMITS.RESERVE_MIN_TOKENS) {
    return {
      ok: false,
      tier,
      reason: "tokens",
      message: `You've used your tokens. Resets in ~${p.weeklyResetMinutes} min.`,
      ...p,
    };
  }
  return { ok: true, tier, ...p };
}
