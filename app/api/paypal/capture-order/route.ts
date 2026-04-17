import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import { captureOrder, decodeCustomId, paypalConfig } from "@/lib/paypal";
import { grantForOrder } from "@/lib/paypalGrant";

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

  let body: { orderID?: string } = {};
  try {
    body = await req.json();
  } catch {
    // leave empty
  }
  const orderId = (body.orderID || "").trim();
  if (!orderId) {
    return NextResponse.json({ error: "missing-orderID" }, { status: 400 });
  }

  const capture = await captureOrder(orderId);
  if (!capture) {
    return NextResponse.json(
      { error: "paypal-capture-failed" },
      { status: 502 }
    );
  }

  if (capture.status !== "COMPLETED") {
    return NextResponse.json(
      { error: "capture-not-completed", status: capture.status },
      { status: 402 }
    );
  }

  const captureObj =
    capture.purchase_units?.[0]?.payments?.captures?.[0] ?? null;
  const decoded = decodeCustomId(captureObj?.custom_id ?? null);
  if (!decoded) {
    return NextResponse.json({ error: "missing-custom-id" }, { status: 422 });
  }

  // Require the authed user to match the order's embedded uid. If the
  // uid doesn't match we refuse to grant — that's either a bug or someone
  // trying to steal someone else's capture.
  if (decoded.uid !== uid) {
    return NextResponse.json({ error: "uid-mismatch" }, { status: 403 });
  }

  const amountUsd = captureObj?.amount?.value
    ? Number(captureObj.amount.value)
    : null;

  const grant = await grantForOrder({
    uid,
    orderId,
    sku: decoded.sku,
    coupon: decoded.coupon,
    amountUsd,
  });

  if (!grant.ok) {
    return NextResponse.json(
      { error: "grant-failed", reason: grant.reason },
      { status: 500 }
    );
  }

  if (grant.kind === "plan") {
    return NextResponse.json({
      ok: true,
      kind: "plan",
      plan: grant.plan,
      expiresAt: grant.expiresAt,
    });
  }
  if (grant.kind === "pack") {
    return NextResponse.json({ ok: true, kind: "pack", tokens: grant.tokens });
  }
  return NextResponse.json({ ok: true, kind: "already-granted" });
}
