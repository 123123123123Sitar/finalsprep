/**
 * Idempotent post-purchase grant for Ko-fi webhooks. Dedupes by Ko-fi's
 * message_id at users/{uid}/kofiOrders/{messageId}, updates the billing
 * doc for plan purchases, or credits the token bank for pack purchases.
 */
import { getAdminDb } from "@/lib/firebaseAdmin";
import { addToTokenBank } from "@/lib/tokenBank";
import { setPlan } from "@/lib/userPlan";
import type { Sku } from "@/lib/kofiSkus";

export type GrantResult =
  | { ok: true; kind: "plan"; plan: string; expiresAt: number }
  | { ok: true; kind: "pack"; tokens: number }
  | { ok: true; kind: "already-granted" }
  | { ok: false; reason: string };

export async function grantForKofi(params: {
  uid: string;
  messageId: string;
  sku: Sku;
  amountUsd: number | null;
}): Promise<GrantResult> {
  const { uid, messageId, sku, amountUsd } = params;
  const db = getAdminDb();
  if (!db) return { ok: false, reason: "firestore-unavailable" };
  const ref = db.doc(`users/${uid}/kofiOrders/${messageId}`);

  const existing = await ref.get();
  if (existing.exists && existing.data()?.granted === true) {
    return { ok: true, kind: "already-granted" };
  }

  if (sku.kind === "plan") {
    const now = Date.now();
    const billingSnap = await db.doc(`users/${uid}/profile/billing`).get();
    const currentEndSec =
      (billingSnap.exists && (billingSnap.data() as any)?.currentPeriodEnd) || 0;
    const baseMs = Math.max(now, currentEndSec * 1000);
    const newEndMs = baseMs + sku.durationMs;
    await setPlan(uid, {
      plan: sku.tier,
      billingInterval: sku.interval,
      status: "active",
      kofiOrderId: messageId,
      currentPeriodEnd: Math.floor(newEndMs / 1000),
    });
    await ref.set(
      {
        granted: true,
        kind: "plan",
        sku: sku.sku,
        tier: sku.tier,
        interval: sku.interval,
        amountUsd,
        expiresAt: newEndMs,
        grantedAt: now,
      },
      { merge: true }
    );
    return { ok: true, kind: "plan", plan: sku.tier, expiresAt: newEndMs };
  }

  await addToTokenBank(uid, sku.tokens, `kofi:${messageId}`);
  await ref.set(
    {
      granted: true,
      kind: "pack",
      sku: sku.sku,
      tokens: sku.tokens,
      amountUsd,
      grantedAt: Date.now(),
    },
    { merge: true }
  );
  return { ok: true, kind: "pack", tokens: sku.tokens };
}
