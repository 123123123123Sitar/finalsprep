import Stripe from "stripe";
import { setPlan } from "@/lib/userPlan";
import {
  normalizeBillingInterval,
  normalizePlanTier,
  type BillingInterval,
  type PlanTier,
} from "@/lib/plans";

export const runtime = "nodejs";
// Webhook handlers need the raw request body for signature verification.
// Next.js 14 App Router Route Handlers give us req.text() which is raw.
export const dynamic = "force-dynamic";

function jsonError(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return jsonError(500, "STRIPE_SECRET_KEY not set.");
  if (!whSecret) return jsonError(500, "STRIPE_WEBHOOK_SECRET not set.");

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  const sig = req.headers.get("stripe-signature");
  if (!sig) return jsonError(400, "Missing stripe-signature header.");

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, whSecret);
  } catch (err: any) {
    console.error("[stripe-webhook] signature verification failed", err?.message);
    return jsonError(400, `Webhook signature verification failed: ${err?.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const uid = session.client_reference_id;
        if (!uid) {
          console.warn("[stripe-webhook] checkout.session.completed with no client_reference_id");
          break;
        }
        // Fetch the subscription to get current period end
        let currentPeriodEnd: number | undefined;
        let subscriptionId: string | undefined;
        if (session.subscription) {
          subscriptionId = typeof session.subscription === "string"
            ? session.subscription
            : session.subscription.id;
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          currentPeriodEnd = sub.current_period_end;
          const priceId = sub.items.data[0]?.price?.id;
          const recurring = sub.items.data[0]?.price?.recurring;
          const resolvedPlan = resolvePlanTier(priceId);
          const billingInterval = resolveBillingInterval(
            priceId,
            recurring?.interval,
            recurring?.interval_count
          );
          const customerId = typeof session.customer === "string"
            ? session.customer
            : session.customer?.id;

          await setPlan(uid, {
            plan: resolvedPlan,
            billingInterval,
            status: sub.status,
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            stripePriceId: priceId,
            currentPeriodEnd,
          });
          console.log("[stripe-webhook] promoted user", uid, "to", resolvedPlan);
          break;
        }
        const customerId = typeof session.customer === "string"
          ? session.customer
          : session.customer?.id;
        // No subscription on the session: we can't derive a plan safely.
        // Leave the user on whatever their current plan is (do nothing) —
        // the subscription.created event will promote them correctly.
        console.warn(
          "[stripe-webhook] checkout.session.completed with no subscription for uid",
          uid,
          "customerId",
          customerId
        );
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const uid = (sub.metadata && sub.metadata.uid) || null;
        if (!uid) {
          console.warn("[stripe-webhook] subscription.updated with no metadata.uid");
          break;
        }
        const status = sub.status;
        const isActive = status === "active" || status === "trialing";
        const priceId = sub.items.data[0]?.price?.id;
        const recurring = sub.items.data[0]?.price?.recurring;
        const resolvedPlan = isActive ? resolvePlanTier(priceId) : "free";
        await setPlan(uid, {
          plan: resolvedPlan,
          billingInterval: resolveBillingInterval(
            priceId,
            recurring?.interval,
            recurring?.interval_count
          ),
          status,
          stripeSubscriptionId: sub.id,
          stripePriceId: priceId,
          currentPeriodEnd: sub.current_period_end,
        });
        console.log("[stripe-webhook] subscription.updated", uid, status, resolvedPlan);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const uid = (sub.metadata && sub.metadata.uid) || null;
        if (!uid) break;
        await setPlan(uid, {
          plan: "free",
          status: sub.status,
          stripeSubscriptionId: undefined,
          currentPeriodEnd: sub.current_period_end,
        });
        console.log("[stripe-webhook] subscription.deleted", uid);
        break;
      }

      default:
        // Unhandled event types return 200 so Stripe stops retrying.
        console.log("[stripe-webhook] unhandled event type:", event.type);
    }
  } catch (e: any) {
    console.error("[stripe-webhook] handler failed", e);
    return jsonError(500, `Webhook handler failed: ${e?.message || "unknown"}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Resolve the plan tier STRICTLY from the Stripe priceId. We never trust
 * client-supplied metadata (session or subscription metadata) because the
 * client controls it via /api/checkout — an attacker could send
 * `{checkoutPlan:"pro-yearly"}` while paying the regular price. Always
 * derive from the authoritative priceId on the subscription.
 */
function resolvePlanTier(priceId: string | undefined): PlanTier {
  if (priceId && PRO_PRICE_IDS.has(priceId)) return "pro";
  if (priceId && REGULAR_PRICE_IDS.has(priceId)) return "regular";
  // Unknown price → default to free to avoid accidentally granting paid access.
  return "free";
}

/**
 * Derive billing interval from the Stripe price's recurring config.
 * Never trust client metadata.
 */
function resolveBillingInterval(
  priceId: string | undefined,
  recurringInterval: Stripe.Price.Recurring.Interval | null | undefined,
  intervalCount?: number | null
): BillingInterval | undefined {
  if (priceId && SIXMONTH_PRICE_IDS.has(priceId)) return "sixmonth";
  if (recurringInterval === "month" && intervalCount && intervalCount >= 6)
    return "sixmonth";
  if (recurringInterval === "month") return "monthly";
  if (recurringInterval === "year") return "sixmonth";
  return undefined;
}

// Authoritative price ID sets. Configure via env and NEVER read tier from
// client-supplied metadata.
const REGULAR_PRICE_IDS = new Set(
  [
    process.env.STRIPE_PRICE_REGULAR_MONTHLY,
    process.env.STRIPE_PRICE_REGULAR_SIXMONTH,
    process.env.STRIPE_PRICE_REGULAR_YEARLY, // legacy
    process.env.STRIPE_PRICE_MONTHLY, // legacy
    process.env.STRIPE_PRICE_YEARLY, // legacy
    process.env.STRIPE_PRICE_SIXMONTH, // legacy alt
  ].filter(Boolean)
);

const PRO_PRICE_IDS = new Set(
  [
    process.env.STRIPE_PRICE_PRO_MONTHLY,
    process.env.STRIPE_PRICE_PRO_SIXMONTH,
    process.env.STRIPE_PRICE_PRO_YEARLY, // legacy
  ].filter(Boolean)
);

const SIXMONTH_PRICE_IDS = new Set(
  [
    process.env.STRIPE_PRICE_REGULAR_SIXMONTH,
    process.env.STRIPE_PRICE_PRO_SIXMONTH,
    process.env.STRIPE_PRICE_SIXMONTH, // legacy alt
  ].filter(Boolean)
);
