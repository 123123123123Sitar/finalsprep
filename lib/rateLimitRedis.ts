/**
 * Upstash Redis-backed rate limiter. Same token/message sliding-window
 * semantics as rateLimitStore.ts (Firestore), but backed by a Redis
 * sorted set so reads and writes survive Vercel cold starts without
 * paying a Firestore transaction per chat turn.
 *
 * Storage: one sorted set per user under key `rl:{uid}`.
 *   member = `${timestamp}:${tokens}:${rand}` (rand for uniqueness)
 *   score  = timestamp (ms)
 *
 * We trim with ZREMRANGEBYSCORE on the weekly cutoff on every touch, so
 * the set stays bounded (≤ hacker weekly message cap, ~1750 entries).
 *
 * Enable by setting UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
 * If either is missing, isRedisEnabled() returns false and callers fall
 * back to the Firestore store.
 */
import { LIMITS, type Tier } from "./rateLimit";

type Entry = { t: number; tokens: number };

const KEY_PREFIX = "rl:";

function env() {
  return {
    url: process.env.UPSTASH_REDIS_REST_URL?.trim() || "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN?.trim() || "",
  };
}

export function isRedisEnabled(): boolean {
  const { url, token } = env();
  return !!(url && token);
}

async function redisFetch(command: (string | number)[]): Promise<any> {
  const { url, token } = env();
  if (!url || !token) throw new Error("Upstash Redis not configured");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Upstash ${res.status}: ${await res.text().catch(() => "")}`);
  }
  const json = (await res.json()) as { result?: unknown; error?: string };
  if (json.error) throw new Error(`Upstash: ${json.error}`);
  return json.result;
}

async function redisPipeline(commands: (string | number)[][]): Promise<any[]> {
  const { url, token } = env();
  if (!url || !token) throw new Error("Upstash Redis not configured");
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Upstash ${res.status}: ${await res.text().catch(() => "")}`);
  }
  const body = (await res.json()) as Array<{ result?: unknown; error?: string }>;
  return body.map((x) => {
    if (x && typeof x === "object" && "error" in x && x.error) {
      throw new Error(`Upstash: ${x.error}`);
    }
    return x?.result;
  });
}

function parseEntry(raw: unknown): Entry | null {
  if (typeof raw !== "string") return null;
  const m = raw.match(/^(\d+):(\d+)(?::.*)?$/);
  if (!m) return null;
  const t = Number(m[1]);
  const tokens = Number(m[2]);
  if (!Number.isFinite(t) || !Number.isFinite(tokens)) return null;
  return { t, tokens };
}

export type PersistedUsage = {
  tokensUsed: number;
  tokensRemaining: number;
  messagesUsed: number;
  messagesRemaining: number;
  resetMinutes: number;
  weeklyTokensUsed: number;
  weeklyTokensRemaining: number;
  weeklyResetMinutes: number;
};

function resetMinutesFor(entries: Entry[], at: number, windowMs: number): number {
  if (entries.length === 0) return 0;
  const oldest = entries[0].t;
  return Math.max(1, Math.ceil((oldest + windowMs - at) / 60000));
}

export async function redisPeek(uid: string, tier: Tier): Promise<PersistedUsage> {
  const caps = LIMITS[tier];
  const key = `${KEY_PREFIX}${uid}`;
  const at = Date.now();
  const weeklyCutoff = at - LIMITS.WEEKLY_WINDOW_MS;
  const dailyCutoff = at - LIMITS.WINDOW_MS;

  // Trim anything past the weekly cutoff, then read the whole (bounded) set.
  const [, members] = await redisPipeline([
    ["ZREMRANGEBYSCORE", key, "-inf", String(weeklyCutoff - 1)],
    ["ZRANGE", key, "0", "-1"],
  ]);

  const all = Array.isArray(members)
    ? (members as unknown[])
        .map(parseEntry)
        .filter((e): e is Entry => e !== null)
        .sort((a, b) => a.t - b.t)
    : [];
  const daily = all.filter((e) => e.t >= dailyCutoff);

  const tokensUsed = daily.reduce((s, e) => s + e.tokens, 0);
  const weeklyTokensUsed = all.reduce((s, e) => s + e.tokens, 0);

  return {
    tokensUsed,
    tokensRemaining: Math.max(0, caps.tokens - tokensUsed),
    messagesUsed: daily.length,
    messagesRemaining: Math.max(0, caps.messages - daily.length),
    resetMinutes: resetMinutesFor(daily, at, LIMITS.WINDOW_MS),
    weeklyTokensUsed,
    weeklyTokensRemaining: Math.max(0, caps.weeklyTokens - weeklyTokensUsed),
    weeklyResetMinutes: resetMinutesFor(all, at, LIMITS.WEEKLY_WINDOW_MS),
  };
}

export async function redisRecord(uid: string, tokens: number): Promise<void> {
  if (tokens <= 0) return;
  const key = `${KEY_PREFIX}${uid}`;
  const at = Date.now();
  const rand = Math.random().toString(36).slice(2, 10);
  const member = `${at}:${Math.round(tokens)}:${rand}`;
  // TTL a week after the last write so completely inactive users don't
  // pile up old keys.
  const ttlSec = Math.ceil(LIMITS.WEEKLY_WINDOW_MS / 1000) + 3600;
  await redisPipeline([
    ["ZADD", key, String(at), member],
    ["EXPIRE", key, String(ttlSec)],
  ]);
}
