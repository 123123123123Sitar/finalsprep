import { getAdminDb } from "./firebaseAdmin";

/**
 * Global "is Gemini rate-limited right now?" flag, stored in Firestore so
 * every server instance shares it. Used for learner-tier chat routing:
 * if Gemini is blocked we transparently fall back to Claude Haiku.
 *
 * Stored at `globals/aiRouting`:
 *   geminiBlockedAt:    server timestamp of the most recent 429
 *   geminiBlockedReason: short string for debugging
 *
 * Auto-clears after one hour so we re-probe Gemini periodically rather than
 * staying on the more expensive Claude path forever after a transient 429.
 */

const FLAG_PATH = "globals/aiRouting";
const TTL_MS = 60 * 60 * 1000; // 1h

export async function isGeminiBlocked(): Promise<boolean> {
  const db = getAdminDb();
  if (!db) return false;
  try {
    const snap = await db.doc(FLAG_PATH).get();
    const blockedAt = (snap.data() as any)?.geminiBlockedAt;
    if (!blockedAt) return false;
    const ts =
      typeof blockedAt?.toMillis === "function"
        ? blockedAt.toMillis()
        : Number(blockedAt);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < TTL_MS;
  } catch {
    return false;
  }
}

export async function markGeminiBlocked(reason?: string): Promise<void> {
  const db = getAdminDb();
  if (!db) return;
  try {
    const { FieldValue } = await import("firebase-admin/firestore");
    await db.doc(FLAG_PATH).set(
      {
        geminiBlockedAt: FieldValue.serverTimestamp(),
        geminiBlockedReason: reason ?? "rate_limit",
      },
      { merge: true }
    );
  } catch (e) {
    console.warn("[geminiStatus] markGeminiBlocked failed", e);
  }
}

// Heuristic: did this error from the Gemini SDK look like a quota/429?
export function isGeminiRateLimit(err: unknown): boolean {
  const e = err as { status?: number; message?: string } | undefined;
  if (!e) return false;
  if (e.status === 429) return true;
  const msg = (e.message || "").toLowerCase();
  return (
    msg.includes("429") ||
    msg.includes("resource_exhausted") ||
    msg.includes("rate limit") ||
    msg.includes("quota")
  );
}
