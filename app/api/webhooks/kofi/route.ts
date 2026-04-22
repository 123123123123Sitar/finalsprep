import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebaseAdmin";
import { grantForKofi } from "@/lib/kofiGrant";
import { resolveKofiCode } from "@/lib/kofiSkus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Ko-fi webhook. Ko-fi posts a multipart/form-data payload with a single
 * `data` field containing JSON. We:
 *   1. Parse and verify the verification_token field.
 *   2. Find the FinalsPrep user by the buyer's email.
 *   3. Resolve each shop_item's direct_link_code to a plan/pack SKU.
 *   4. Grant idempotently (dedupe on message_id).
 *
 * Ko-fi webhook docs: https://ko-fi.com/manage/webhooks
 */
type KofiPayload = {
  verification_token?: string;
  message_id?: string;
  timestamp?: string;
  type?: "Donation" | "Subscription" | "Commission" | "Shop Order";
  is_public?: boolean;
  from_name?: string;
  email?: string;
  currency?: string;
  amount?: string;
  message?: string | null;
  shop_items?: Array<{
    direct_link_code?: string;
    variation_name?: string | null;
    quantity?: number;
  }>;
};

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  let dataJson: string | null = null;

  try {
    if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      const raw = form.get("data");
      if (typeof raw === "string") dataJson = raw;
    } else if (contentType.includes("application/json")) {
      dataJson = await req.text();
    } else {
      // Ko-fi sometimes posts as application/x-www-form-urlencoded without the header
      dataJson = await req.text();
      const m = dataJson.match(/^data=(.*)$/s);
      if (m) dataJson = decodeURIComponent(m[1]);
    }
  } catch (e) {
    return NextResponse.json({ error: "parse-failed" }, { status: 400 });
  }

  if (!dataJson) {
    return NextResponse.json({ error: "no-data" }, { status: 400 });
  }

  let payload: KofiPayload;
  try {
    payload = JSON.parse(dataJson);
  } catch {
    return NextResponse.json({ error: "bad-json" }, { status: 400 });
  }

  const expected = (process.env.KOFI_VERIFICATION_TOKEN || "").trim();
  if (!expected) {
    console.warn("[kofi-webhook] KOFI_VERIFICATION_TOKEN not set; ignoring");
    return NextResponse.json({ ok: true, ignored: "no-token-configured" });
  }
  if (payload.verification_token !== expected) {
    return NextResponse.json({ error: "invalid-token" }, { status: 401 });
  }

  // Only Shop Order events carry shop_items with direct_link_codes. Tips
  // and memberships we acknowledge but ignore (tipping doesn't grant
  // access on FinalsPrep).
  if (payload.type !== "Shop Order") {
    return NextResponse.json({ ok: true, ignored: payload.type ?? "unknown-type" });
  }

  const messageId = payload.message_id?.trim();
  const buyerEmail = payload.email?.trim().toLowerCase();
  if (!messageId || !buyerEmail) {
    return NextResponse.json({ ok: false, reason: "missing-id-or-email" });
  }

  const uid = await uidFromEmail(buyerEmail);
  if (!uid) {
    // Log but don't error; Ko-fi will retry otherwise. Stash the event
    // for later manual fulfillment.
    await stashUnmatchedOrder(payload);
    return NextResponse.json({
      ok: true,
      unmatched: true,
      buyerEmail,
    });
  }

  const amountUsd = payload.amount ? Number(payload.amount) : null;
  const results: Array<{ sku: string; kind: string; ok: boolean; reason?: string }> = [];

  for (const item of payload.shop_items ?? []) {
    const sku = resolveKofiCode(item.direct_link_code ?? null);
    if (!sku) {
      results.push({
        sku: item.direct_link_code ?? "unknown",
        kind: "unknown",
        ok: false,
        reason: "sku-not-mapped",
      });
      continue;
    }
    const quantity = Math.max(1, item.quantity ?? 1);
    for (let i = 0; i < quantity; i++) {
      // Suffix the message_id with the index so re-processing one item
      // doesn't collide with another in the same order.
      const itemMessageId = `${messageId}:${sku.sku}:${i}`;
      const res = await grantForKofi({
        uid,
        messageId: itemMessageId,
        sku,
        amountUsd,
      });
      results.push({ sku: sku.sku, kind: (res as any).kind ?? "error", ok: res.ok, reason: (res as any).reason });
    }
  }

  return NextResponse.json({ ok: true, results });
}

async function uidFromEmail(email: string): Promise<string | null> {
  const auth = getAdminAuth();
  if (!auth) return null;
  try {
    const user = await auth.getUserByEmail(email);
    return user.uid;
  } catch {
    return null;
  }
}

async function stashUnmatchedOrder(payload: KofiPayload): Promise<void> {
  const db = getAdminDb();
  if (!db) return;
  try {
    await db
      .collection("kofiUnmatchedOrders")
      .doc(payload.message_id ?? `${Date.now()}`)
      .set({
        ...payload,
        _receivedAt: Date.now(),
      });
  } catch (e) {
    console.error("[kofi-webhook] stash failed", e);
  }
}
