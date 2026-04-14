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
          const resolvedPlan = resolvePlanTier(session.metadata, sub.metadata, priceId);
          const billingInterval = resolveBillingInterval(
            session.metadata,
            sub.metadata,
            sub.items.data[0]?.price?.recurring?.interval
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
        await setPlan(uid, {
          plan: resolvePlanTier(session.metadata, undefined, undefined),
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          currentPeriodEnd,
        });
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
        const resolvedPlan = isActive
          ? resolvePlanTier(undefined, sub.metadata, priceId)
          : "free";
        await setPlan(uid, {
          plan: resolvedPlan,
          billingInterval: resolveBillingInterval(
            undefined,
            sub.metadata,
            sub.items.data[0]?.price?.recurring?.interval
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

function resolvePlanTier(
  sessionMetadata?: Stripe.Metadata | null,
  subscriptionMetadata?: Stripe.Metadata | null,
  priceId?: string
): PlanTier {
  const explicit =
    readTier(subscriptionMetadata?.tier) || readTier(sessionMetadata?.tier);
  if (explicit) return explicit;
  if (priceId && PRO_PRICE_IDS.has(priceId)) return "pro";
  return "regular";
}

function resolveBillingInterval(
  sessionMetadata?: Stripe.Metadata | null,
  subscriptionMetadata?: Stripe.Metadata | null,
  recurringInterval?: Stripe.Price.Recurring.Interval | null
): BillingInterval | undefined {
  const explicit =
    normalizeBillingInterval(subscriptionMetadata?.interval) ||
    normalizeBillingInterval(sessionMetadata?.interval);
  if (explicit) return explicit;
  if (recurringInterval === "month") return "monthly";
  if (recurringInterval === "year") return "yearly";
  const legacy =
    normalizeBillingInterval(subscriptionMetadata?.plan) ||
    normalizeBillingInterval(sessionMetadata?.plan);
  return legacy;
}

function readTier(value: string | null | undefined): PlanTier | null {
  const tier = normalizePlanTier(value);
  return tier === "free" ? null : tier;
}

const PRO_PRICE_IDS = new Set(
  [
    process.env.STRIPE_PRICE_PRO_MONTHLY,
    process.env.STRIPE_PRICE_PRO_YEARLY,
  ].filter(Boolean)
);
