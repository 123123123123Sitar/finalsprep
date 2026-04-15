/**
 * User plan helper. Stores and reads a user's subscription status in
 * Firestore under users/{uid}/profile/billing.
 *
 * Shape:
 *   users/{uid}/profile/billing = {
 *     plan: "free" | "pro" | "premium",
 *     billingInterval?: "monthly" | "sixmonth",
 *     status?: string,
 *     stripeCustomerId?: string,
 *     stripeSubscriptionId?: string,
 *     stripePriceId?: string,
 *     currentPeriodEnd?: number,  // unix seconds
 *     updatedAt: number,
 *   }
 *
 * The API routes call `getPlan(uid)` to decide whether a request should
 * use the paid tier rate limit. Stripe webhook calls `setPlan` to promote
 * a user after checkout.session.completed and demote on cancellation.
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
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
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
  if (!db) return { plan: "free", updatedAt: Date.now() };
  try {
    const snap = await billingRef(uid).get();
    if (!snap.exists) return { plan: "free", updatedAt: Date.now() };
    const raw = (snap.data() || {}) as Partial<UserPlan>;
    const data: UserPlan = {
      plan: normalizePlanTier(raw.plan),
      billingInterval: normalizeBillingInterval(raw.billingInterval),
      status: typeof raw.status === "string" ? raw.status : undefined,
      stripeCustomerId: raw.stripeCustomerId,
      stripeSubscriptionId: raw.stripeSubscriptionId,
      stripePriceId: raw.stripePriceId,
      currentPeriodEnd: raw.currentPeriodEnd,
      updatedAt: typeof raw.updatedAt === "number" ? raw.updatedAt : Date.now(),
    };
    // Auto-downgrade if the subscription period has ended.
    if (
      isPaidPlan(data.plan) &&
      data.currentPeriodEnd &&
      data.currentPeriodEnd * 1000 < Date.now()
    ) {
      return { ...data, plan: "free" };
    }
    return data;
  } catch (e) {
    console.error("[userPlan] getPlan failed", e);
    return { plan: "free", updatedAt: Date.now() };
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
    case "premium":
      return "premium";
    default:
      return "free";
  }
}
