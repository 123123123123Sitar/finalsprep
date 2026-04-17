/**
 * Idempotent post-capture grant: updates the billing doc (plan + access
 * expiration) for plan SKUs, or credits the token bank for pack SKUs.
 *
 * De-duped by PayPal order ID via users/{uid}/paypalOrders/{orderId}.
 * This function is called from both /api/paypal/capture-order (the
 * authoritative path) and /api/webhooks/paypal (belt-and-braces).
 */
import { getAdminDb } from "@/lib/firebaseAdmin";
import { addToTokenBank } from "@/lib/tokenBank";
import { setPlan } from "@/lib/userPlan";
import {
  resolvePackSku,
  resolvePlanSku,
} from "@/lib/paypalSkus";

export type GrantResult =
  | { ok: true; kind: "plan"; plan: string; expiresAt: number }
  | { ok: true; kind: "pack"; tokens: number }
  | { ok: true; kind: "already-granted" }
  | { ok: false; reason: string };

function ordersRef(uid: string, orderId: string) {
  const db = getAdminDb();
  if (!db) return null;
  return db.doc(`users/${uid}/paypalOrders/${orderId}`);
}

export async function grantForOrder(params: {
  uid: string;
  orderId: string;
  sku: string;
  coupon: string | null;
  amountUsd: number | null;
}): Promise<GrantResult> {
  const { uid, orderId, sku, coupon, amountUsd } = params;
  const db = getAdminDb();
  if (!db) return { ok: false, reason: "firestore-unavailable" };
  const ref = ordersRef(uid, orderId);
  if (!ref) return { ok: false, reason: "firestore-unavailable" };

  const existing = await ref.get();
  if (existing.exists && existing.data()?.granted === true) {
    return { ok: true, kind: "already-granted" };
  }

  const plan = resolvePlanSku(sku);
  const isPlan = plan.sku === sku;
  const pack = isPlan ? null : resolvePackSku(sku);

  if (!isPlan && !pack) {
    await ref.set(
      { granted: false, error: "unknown-sku", sku, updatedAt: Date.now() },
      { merge: true }
    );
    return { ok: false, reason: "unknown-sku" };
  }

  if (isPlan) {
    const now = Date.now();
    const billingSnap = await db.doc(`users/${uid}/profile/billing`).get();
    const currentEndSec =
      (billingSnap.exists && (billingSnap.data() as any)?.currentPeriodEnd) || 0;
    const currentEndMs = currentEndSec * 1000;
    const baseMs = Math.max(now, currentEndMs);
    const newEndMs = baseMs + plan.durationMs;
    await setPlan(uid, {
      plan: plan.tier,
      billingInterval: plan.interval,
      status: "active",
      paypalOrderId: orderId,
      currentPeriodEnd: Math.floor(newEndMs / 1000),
    });
    await ref.set(
      {
        granted: true,
        kind: "plan",
        sku,
        coupon,
        amountUsd,
        plan: plan.tier,
        interval: plan.interval,
        expiresAt: newEndMs,
        grantedAt: now,
      },
      { merge: true }
    );
    return { ok: true, kind: "plan", plan: plan.tier, expiresAt: newEndMs };
  }

  // Token pack
  await addToTokenBank(uid, pack!.tokens, `paypal:${orderId}`);
  await ref.set(
    {
      granted: true,
      kind: "pack",
      sku,
      amountUsd,
      tokens: pack!.tokens,
      grantedAt: Date.now(),
    },
    { merge: true }
  );
  return { ok: true, kind: "pack", tokens: pack!.tokens };
}
