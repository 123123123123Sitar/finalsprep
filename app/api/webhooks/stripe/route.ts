import Stripe from "stripe";
import { setPlan } from "@/lib/userPlan";

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
        }
        const customerId = typeof session.customer === "string"
          ? session.customer
          : session.customer?.id;

        await setPlan(uid, {
          plan: "pro",
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          currentPeriodEnd,
        });
        console.log("[stripe-webhook] promoted user", uid, "to pro");
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
        await setPlan(uid, {
          plan: isActive ? "pro" : "free",
          stripeSubscriptionId: sub.id,
          currentPeriodEnd: sub.current_period_end,
        });
        console.log("[stripe-webhook] subscription.updated", uid, status);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const uid = (sub.metadata && sub.metadata.uid) || null;
        if (!uid) break;
        await setPlan(uid, {
          plan: "free",
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
