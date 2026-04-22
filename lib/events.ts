/**
 * Lightweight event logging to a top-level `events` collection. Writes
 * happen from server-side routes via the admin SDK. Clients never read
 * this directly - the admin panel goes through /api/admin.
 */
import { getAdminDb } from "@/lib/firebaseAdmin";
import type { PlanTier } from "@/lib/plans";

export type EventKind =
  | "chat.send"
  | "chat.limit_hit"
  | "explain.send"
  | "checkout.start"
  | "checkout.success"
  | "practice.open"
  | "lesson.view"
  | "signin"
  | "signup";

export type AppEvent = {
  kind: EventKind;
  uid?: string | null;
  email?: string | null;
  plan?: PlanTier;
  at: number;
  meta?: Record<string, string | number | boolean | null>;
};

export async function logEvent(event: Omit<AppEvent, "at">): Promise<void> {
  const db = getAdminDb();
  if (!db) return;
  try {
    await db.collection("events").add({
      ...event,
      at: Date.now(),
    });
  } catch (e) {
    // Never block the main request on logging.
    console.error("[events] log failed", e);
  }
}
