import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  applyCoupon,
  resolvePackSku,
  resolvePlanSku,
} from "@/lib/paypalSkus";
import { createOrder, encodeCustomId, paypalConfig } from "@/lib/paypal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!paypalConfig()) {
    return NextResponse.json(
      { error: "paypal-not-configured" },
      { status: 500 }
    );
  }

  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { uid } = authed.user;

  let body: { plan?: string; pack?: string; coupon?: string } = {};
  try {
    body = await req.json();
  } catch {
    // leave body empty
  }

  let priceUsd: number;
  let description: string;
  let sku: string;
  let coupon: string | null = null;

  if (body.pack) {
    const pack = resolvePackSku(body.pack);
    if (!pack) {
      return NextResponse.json({ error: "unknown-pack" }, { status: 400 });
    }
    priceUsd = pack.priceUsd;
    description = pack.description;
    sku = pack.sku;
  } else {
    const plan = resolvePlanSku(body.plan);
    const priced = applyCoupon(plan, body.coupon ?? null);
    priceUsd = priced.priceUsd;
    coupon = priced.coupon;
    description = plan.description;
    sku = plan.sku;
  }

  const customId = encodeCustomId({ uid, sku, coupon });
  const order = await createOrder({
    amountUsd: priceUsd,
    description,
    customId,
  });
  if (!order) {
    return NextResponse.json({ error: "paypal-create-failed" }, { status: 502 });
  }

  return NextResponse.json({
    orderID: order.id,
    status: order.status,
    amount: priceUsd.toFixed(2),
    sku,
    coupon,
  });
}
