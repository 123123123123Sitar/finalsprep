/**
 * User plan helper. Stores and reads a user's access period in
 * Firestore under users/{uid}/profile/billing.
 *
 * Paid access is sold as one-time PayPal Orders (no auto-renew on
 * Personal PayPal). Each successful capture extends currentPeriodEnd
 * from max(now, currentPeriodEnd). When the period ends, getPlan
 * auto-returns the learner tier.
 */
import { getAdminDb } from "@/lib/firebaseAdmin";
import {
  isPaidPlan,
  normalizeBillingInterval,
  normalizePlanTier,
  type BillingInterval,
  type PlanTier,
} from "@/lib/plans";
import type { Tier } from "@/lib/rateLimit";

export type UserPlan = {
  plan: PlanTier;
  billingInterval?: BillingInterval;
  status?: string;
  paypalOrderId?: string;
  currentPeriodEnd?: number;
  updatedAt: number;
};

function billingRef(uid: string) {
  const db = getAdminDb();
  if (!db) throw new Error("Firestore admin not configured");
  return db.doc(`users/${uid}/profile/billing`);
}

export async function getPlan(uid: string): Promise<UserPlan> {
  const db = getAdminDb();
  if (!db) return { plan: "learner", updatedAt: Date.now() };
  try {
    const snap = await billingRef(uid).get();
    if (!snap.exists) return { plan: "learner", updatedAt: Date.now() };
    const raw = (snap.data() || {}) as Partial<UserPlan>;
    const data: UserPlan = {
      plan: normalizePlanTier(raw.plan),
      billingInterval: normalizeBillingInterval(raw.billingInterval),
      status: typeof raw.status === "string" ? raw.status : undefined,
      paypalOrderId: raw.paypalOrderId,
      currentPeriodEnd: raw.currentPeriodEnd,
      updatedAt: typeof raw.updatedAt === "number" ? raw.updatedAt : Date.now(),
    };
    // Auto-downgrade if the subscription period has ended.
    if (
      isPaidPlan(data.plan) &&
      data.currentPeriodEnd &&
      data.currentPeriodEnd * 1000 < Date.now()
    ) {
      return { ...data, plan: "learner" };
    }
    return data;
  } catch (e) {
    console.error("[userPlan] getPlan failed", e);
    return { plan: "learner", updatedAt: Date.now() };
  }
}

export async function setPlan(
  uid: string,
  partial: Partial<UserPlan>
): Promise<void> {
  const db = getAdminDb();
  if (!db) return;
  try {
    await billingRef(uid).set(
      { ...partial, updatedAt: Date.now() },
      { merge: true }
    );
  } catch (e) {
    console.error("[userPlan] setPlan failed", e);
  }
}

export function isPaid(plan: UserPlan | null | undefined): boolean {
  return !!plan && isPaidPlan(plan.plan);
}

export function planToRateTier(plan: UserPlan | null | undefined): Tier {
  switch (plan?.plan) {
    case "pro":
      return "pro";
    case "hacker":
      return "hacker";
    default:
      return "learner";
  }
}
