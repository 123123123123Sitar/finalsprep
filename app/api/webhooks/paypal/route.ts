import { NextResponse } from "next/server";
import { decodeCustomId, paypalConfig, verifyWebhookSignature } from "@/lib/paypal";
import { grantForOrder } from "@/lib/paypalGrant";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * PayPal webhook. Only used as belt-and-braces — the primary grant path
 * is the client-called /api/paypal/capture-order, which runs right after
 * user approval and writes to Firestore before the browser returns.
 *
 * This webhook:
 *   - Verifies the signature using PAYPAL_WEBHOOK_ID.
 *   - On PAYMENT.CAPTURE.COMPLETED, re-grants idempotently.
 *
 * If PAYPAL_WEBHOOK_ID is not configured, we still return 200 but skip
 * any side effects so PayPal stops retrying.
 */
export async function POST(req: Request) {
  const raw = await req.text();
  let event: any = null;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad-json" }, { status: 400 });
  }

  const cfg = paypalConfig();
  if (!cfg || !cfg.webhookId) {
    console.warn("[paypal-webhook] webhook id not configured; ignoring event");
    return NextResponse.json({ ok: true, ignored: true });
  }

  const verified = await verifyWebhookSignature({
    transmissionId: req.headers.get("paypal-transmission-id"),
    transmissionTime: req.headers.get("paypal-transmission-time"),
    certUrl: req.headers.get("paypal-cert-url"),
    authAlgo: req.headers.get("paypal-auth-algo"),
    transmissionSig: req.headers.get("paypal-transmission-sig"),
    body: event,
  });
  if (!verified) {
    return NextResponse.json({ error: "invalid-signature" }, { status: 400 });
  }

  if (event?.event_type !== "PAYMENT.CAPTURE.COMPLETED") {
    return NextResponse.json({ ok: true, ignored: event?.event_type });
  }

  const resource = event?.resource ?? {};
  const orderId = findOrderId(resource);
  const decoded = decodeCustomId(resource?.custom_id);
  const amountUsd = resource?.amount?.value
    ? Number(resource.amount.value)
    : null;

  if (!orderId || !decoded) {
    return NextResponse.json(
      { ok: true, ignored: "missing-order-or-custom-id" }
    );
  }

  const grant = await grantForOrder({
    uid: decoded.uid,
    orderId,
    sku: decoded.sku,
    coupon: decoded.coupon,
    amountUsd,
  });

  return NextResponse.json({ ok: grant.ok, kind: (grant as any).kind });
}

function findOrderId(resource: any): string | null {
  if (typeof resource?.supplementary_data?.related_ids?.order_id === "string") {
    return resource.supplementary_data.related_ids.order_id;
  }
  if (Array.isArray(resource?.links)) {
    const up = resource.links.find(
      (l: any) => l?.rel === "up" && typeof l?.href === "string"
    );
    if (up) {
      const m = up.href.match(/checkout\/orders\/([^/?]+)/);
      if (m) return m[1];
    }
  }
  return null;
}
