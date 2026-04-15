import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { getPackById } from "@/lib/tokenBank";
import { logEvent } from "@/lib/events";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 }
    );
  }

  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && (!user || !user.emailVerified)) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {}
  const pack = getPackById(body?.packId);
  if (!pack) {
    return NextResponse.json({ error: "Unknown pack" }, { status: 400 });
  }
  const priceId = process.env[pack.envKey];
  if (!priceId) {
    return NextResponse.json(
      { error: `Set ${pack.envKey} in the environment.` },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${site}/shop?status=ok`,
      cancel_url: `${site}/shop?status=canceled`,
      customer_creation: "always",
      ...(user
        ? {
            client_reference_id: user.uid,
            customer_email: user.email ?? undefined,
          }
        : {}),
      metadata: {
        kind: "token_pack",
        pack_id: pack.id,
        tokens: String(pack.tokens),
        ...(user ? { uid: user.uid } : {}),
      },
      payment_intent_data: {
        description: `${pack.label} · ${pack.tokens.toLocaleString()} bonus tokens`,
        metadata: {
          kind: "token_pack",
          pack_id: pack.id,
          tokens: String(pack.tokens),
          ...(user ? { uid: user.uid } : {}),
        },
      },
    });

    void logEvent({
      kind: "checkout.start",
      uid: user?.uid ?? null,
      email: user?.email ?? null,
      meta: { kind: "token_pack", pack_id: pack.id, tokens: pack.tokens },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
