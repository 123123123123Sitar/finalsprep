import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import {
  checkoutDescription,
  parseCheckoutPlan,
  type PaidCheckoutPlan,
} from "@/lib/plans";
import { logEvent } from "@/lib/events";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe not configured. Set STRIPE_SECRET_KEY." },
      { status: 500 }
    );
  }

  // When admin is configured, require a signed-in user so the webhook can
  // match this checkout session back to a Firebase uid.
  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && !user) {
    return NextResponse.json(
      {
        error: "Authentication required",
        message: "Sign in before subscribing so we can attach the plan to your account.",
      },
      { status: 401 }
    );
  }
  if (adminOn && user && !user.emailVerified) {
    return NextResponse.json(
      { error: "Email not verified", message: "Verify your email first." },
      { status: 403 }
    );
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {}
  const checkoutPlan = parseCheckoutPlan(
    body?.checkoutPlan ??
      body?.plan ??
      (body?.tier && body?.interval ? `${body.tier}-${body.interval}` : undefined)
  );
  const priceId = resolvePriceId(checkoutPlan.key);

  if (!priceId) {
    return NextResponse.json(
      {
        error: missingPriceMessage(checkoutPlan.key),
      },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });
  // AP season promo: $5 off first month via a Stripe coupon.
  // The coupon ID must exist in your Stripe dashboard (Products → Coupons)
  // with code APPREP, $5 off, once. When not found, checkout still works
  // with the `allow_promotion_codes: true` fallback — users can enter the
  // code manually on Stripe's hosted page.
  const apSaleCouponId = process.env.STRIPE_COUPON_APPREP;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${site}/success?session_id={CHECKOUT_SESSION_ID}&plan=${checkoutPlan.key}`,
      cancel_url: `${site}/?canceled=1`,
      allow_promotion_codes: true,
      ...(apSaleCouponId && checkoutPlan.interval === "monthly"
        ? { discounts: [{ coupon: apSaleCouponId }] }
        : {}),
      billing_address_collection: "auto",
      customer_creation: "always",
      metadata: {
        tier: checkoutPlan.tier,
        interval: checkoutPlan.interval,
        checkout_plan: checkoutPlan.key,
        ...(user ? { uid: user.uid } : {}),
      },
      // Attach the Firebase uid to the session and subscription so the
      // webhook can upgrade the right user.
      ...(user
        ? {
            client_reference_id: user.uid,
            customer_email: user.email ?? undefined,
            subscription_data: {
              description: checkoutDescription(
                checkoutPlan.tier,
                checkoutPlan.interval
              ),
              metadata: {
                uid: user.uid,
                tier: checkoutPlan.tier,
                interval: checkoutPlan.interval,
                checkout_plan: checkoutPlan.key,
              },
            },
          }
        : {
            subscription_data: {
              description: checkoutDescription(
                checkoutPlan.tier,
                checkoutPlan.interval
              ),
              metadata: {
                tier: checkoutPlan.tier,
                interval: checkoutPlan.interval,
                checkout_plan: checkoutPlan.key,
              },
            },
          }),
    });
    void logEvent({
      kind: "checkout.start",
      uid: user?.uid ?? null,
      email: user?.email ?? null,
      meta: {
        tier: checkoutPlan.tier,
        interval: checkoutPlan.interval,
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

function resolvePriceId(plan: PaidCheckoutPlan): string | undefined {
  switch (plan) {
    case "pro-monthly":
      return (
        process.env.STRIPE_PRICE_PRO_MONTHLY ||
        process.env.STRIPE_PRICE_MONTHLY
      );
    case "pro-sixmonth":
      return (
        process.env.STRIPE_PRICE_PRO_SIXMONTH ||
        process.env.STRIPE_PRICE_SIXMONTH ||
        process.env.STRIPE_PRICE_YEARLY
      );
    case "hacker-monthly":
      return (
        process.env.STRIPE_PRICE_HACKER_MONTHLY ||
        process.env.STRIPE_PRICE_PREMIUM_MONTHLY
      );
    case "hacker-sixmonth":
      return (
        process.env.STRIPE_PRICE_HACKER_SIXMONTH ||
        process.env.STRIPE_PRICE_PREMIUM_SIXMONTH
      );
  }
}

function missingPriceMessage(plan: PaidCheckoutPlan): string {
  switch (plan) {
    case "pro-monthly":
      return "Set STRIPE_PRICE_PRO_MONTHLY in your environment.";
    case "pro-sixmonth":
      return "Set STRIPE_PRICE_PRO_SIXMONTH in your environment.";
    case "hacker-monthly":
      return "Set STRIPE_PRICE_HACKER_MONTHLY in your environment.";
    case "hacker-sixmonth":
      return "Set STRIPE_PRICE_HACKER_SIXMONTH in your environment.";
  }
}
