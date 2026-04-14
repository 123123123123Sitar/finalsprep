import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

type Plan = "monthly" | "yearly";

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
  const plan: Plan = body?.plan === "yearly" ? "yearly" : "monthly";

  const priceId =
    plan === "yearly"
      ? process.env.STRIPE_PRICE_YEARLY
      : process.env.STRIPE_PRICE_MONTHLY;

  if (!priceId) {
    return NextResponse.json(
      {
        error:
          plan === "yearly"
            ? "Set STRIPE_PRICE_YEARLY in your environment."
            : "Set STRIPE_PRICE_MONTHLY in your environment.",
      },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${site}/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${site}/?canceled=1`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_creation: "always",
      // Attach the Firebase uid to the session and subscription so the
      // webhook can upgrade the right user.
      ...(user
        ? {
            client_reference_id: user.uid,
            customer_email: user.email ?? undefined,
            subscription_data: {
              description:
                plan === "yearly" ? "FinalsPrep - Yearly" : "FinalsPrep - Monthly",
              metadata: { uid: user.uid, plan },
            },
          }
        : {
            subscription_data: {
              description:
                plan === "yearly" ? "FinalsPrep - Yearly" : "FinalsPrep - Monthly",
              metadata: { plan },
            },
          }),
    });
    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
