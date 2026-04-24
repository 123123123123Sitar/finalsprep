/**
 * Gift-a-plan program. When a user buys a gift SKU via Ko-fi (see
 * `lib/kofiSkus.ts`), the webhook mints a one-time redemption code that
 * the recipient can claim at /gift?code=XXXX. Buyers are credited bonus
 * tokens as a thank-you, regardless of whether the code is ever redeemed.
 *
 * Data model:
 *   giftCodes/{CODE}          - canonical record, one doc per code
 *     buyerUid, sku, tier, interval, durationMs, createdAt, orderId,
 *     redeemed (bool), redeemedBy?, redeemedAt?
 *
 *   users/{uid}/profile/giftPurchases/{CODE}  - buyer-facing mirror so
 *     the billing tab can list their codes without a cross-collection
 *     query.
 *
 * Redemption is idempotent via a Firestore transaction on the canonical
 * doc; the plan grant fires outside the transaction through the same
 * path Ko-fi uses (setPlan).
 */
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { setPlan } from "@/lib/userPlan";
import { captureException } from "@/lib/observability";
import type { GiftPlanSku, GiftSkuId } from "@/lib/kofiSkus";

// Same confusable-safe alphabet used for referral codes. 10 chars gives
// ~10^14 possible codes — room to grow without a central sequence.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CODE_LEN = 10;

export type GiftCodeDoc = {
  code: string;
  buyerUid: string;
  sku: GiftSkuId;
  tier: "pro" | "hacker";
  interval: "monthly" | "sixmonth";
  durationMs: number;
  createdAt: number;
  orderId: string;
  redeemed: boolean;
  redeemedBy?: string | null;
  redeemedAt?: number | null;
};

function randomCode(): string {
  let out = "";
  for (let i = 0; i < CODE_LEN; i++) {
    out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return out;
}

/**
 * Mint a gift code owned by `buyerUid`, retrying on the rare collision.
 * Writes both the canonical doc and the buyer-facing mirror in a single
 * transaction so the billing tab and the redemption endpoint stay
 * consistent.
 */
export async function createGiftCode(params: {
  buyerUid: string;
  orderId: string;
  sku: GiftPlanSku;
}): Promise<GiftCodeDoc | null> {
  const db = getAdminDb();
  if (!db) return null;
  const now = Date.now();
  for (let attempt = 0; attempt < 6; attempt++) {
    const code = randomCode();
    const codeRef = db.doc(`giftCodes/${code}`);
    const mirrorRef = db.doc(
      `users/${params.buyerUid}/profile/giftPurchases/${code}`
    );
    try {
      const doc: GiftCodeDoc = {
        code,
        buyerUid: params.buyerUid,
        sku: params.sku.sku,
        tier: params.sku.tier,
        interval: params.sku.interval,
        durationMs: params.sku.durationMs,
        createdAt: now,
        orderId: params.orderId,
        redeemed: false,
      };
      await db.runTransaction(async (tx) => {
        const claim = await tx.get(codeRef);
        if (claim.exists) throw new Error("code-taken");
        tx.set(codeRef, doc);
        tx.set(mirrorRef, doc);
      });
      return doc;
    } catch (e: any) {
      if (e?.message === "code-taken") continue;
      captureException(e, {
        area: "gifts.create",
        buyerUid: params.buyerUid,
        orderId: params.orderId,
      });
      return null;
    }
  }
  return null;
}

export async function getGiftCode(code: string): Promise<GiftCodeDoc | null> {
  const db = getAdminDb();
  if (!db) return null;
  const clean = code.trim().toUpperCase();
  if (!clean) return null;
  try {
    const snap = await db.doc(`giftCodes/${clean}`).get();
    if (!snap.exists) return null;
    return snap.data() as GiftCodeDoc;
  } catch (e) {
    captureException(e, { area: "gifts.get", code: clean });
    return null;
  }
}

export type RedeemResult =
  | { ok: true; tier: "pro" | "hacker"; interval: "monthly" | "sixmonth"; expiresAt: number }
  | {
      ok: false;
      reason:
        | "invalid-code"
        | "already-redeemed"
        | "self-redeem"
        | "not-configured"
        | "internal";
      message: string;
    };

/**
 * Redeem `code` for `recipientUid`. Atomic flip of the canonical doc
 * guards against two-tab double-redemption; the plan grant runs after
 * and uses the same `max(now, currentPeriodEnd)` stacking rule as the
 * Ko-fi webhook so gifts pile onto existing subscriptions cleanly.
 */
export async function redeemGiftCode(
  recipientUid: string,
  code: string
): Promise<RedeemResult> {
  const db = getAdminDb();
  if (!db) {
    return {
      ok: false,
      reason: "not-configured",
      message: "Gift redemption isn't available right now.",
    };
  }
  const clean = code.trim().toUpperCase();
  if (!clean) {
    return { ok: false, reason: "invalid-code", message: "Missing code." };
  }

  const codeRef = db.doc(`giftCodes/${clean}`);
  let doc: GiftCodeDoc | null = null;
  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(codeRef);
      if (!snap.exists) throw new Error("invalid-code");
      const data = snap.data() as GiftCodeDoc;
      if (data.redeemed) throw new Error("already-redeemed");
      if (data.buyerUid === recipientUid) throw new Error("self-redeem");
      doc = data;
      tx.update(codeRef, {
        redeemed: true,
        redeemedBy: recipientUid,
        redeemedAt: Date.now(),
      });
      // Mirror the redeemed flag to the buyer's record so their billing
      // tab flips from "unclaimed" to "claimed" without a follow-up read.
      tx.set(
        db.doc(
          `users/${data.buyerUid}/profile/giftPurchases/${clean}`
        ),
        {
          redeemed: true,
          redeemedBy: recipientUid,
          redeemedAt: Date.now(),
        },
        { merge: true }
      );
    });
  } catch (e: any) {
    const msg = e?.message;
    if (msg === "invalid-code") {
      return {
        ok: false,
        reason: "invalid-code",
        message: "That gift code doesn't exist.",
      };
    }
    if (msg === "already-redeemed") {
      return {
        ok: false,
        reason: "already-redeemed",
        message: "This gift code has already been redeemed.",
      };
    }
    if (msg === "self-redeem") {
      return {
        ok: false,
        reason: "self-redeem",
        message: "You can't redeem a gift you purchased yourself.",
      };
    }
    captureException(e, {
      area: "gifts.redeem",
      recipientUid,
      code: clean,
    });
    return {
      ok: false,
      reason: "internal",
      message: "Couldn't redeem gift. Try again in a moment.",
    };
  }

  if (!doc) {
    return {
      ok: false,
      reason: "internal",
      message: "Gift disappeared mid-flight. Try again.",
    };
  }
  const d = doc as GiftCodeDoc;

  // Stack the gift period on top of any existing paid access.
  try {
    const billingSnap = await db
      .doc(`users/${recipientUid}/profile/billing`)
      .get();
    const now = Date.now();
    const currentEndSec =
      (billingSnap.exists && (billingSnap.data() as any)?.currentPeriodEnd) ||
      0;
    const baseMs = Math.max(now, currentEndSec * 1000);
    const newEndMs = baseMs + d.durationMs;
    await setPlan(recipientUid, {
      plan: d.tier,
      billingInterval: d.interval,
      status: "active",
      currentPeriodEnd: Math.floor(newEndMs / 1000),
    });
    // Track the redemption on the recipient's side so we can audit later.
    await db
      .doc(`users/${recipientUid}/profile/giftRedemptions/${clean}`)
      .set({
        code: clean,
        buyerUid: d.buyerUid,
        tier: d.tier,
        interval: d.interval,
        redeemedAt: now,
        expiresAt: newEndMs,
      });
    // Increment a counter on the buyer so we can show "N gifts redeemed".
    await db
      .doc(`users/${d.buyerUid}/profile/giftSummary`)
      .set(
        {
          redeemedCount: FieldValue.increment(1),
          updatedAt: now,
        },
        { merge: true }
      );
    return {
      ok: true,
      tier: d.tier,
      interval: d.interval,
      expiresAt: newEndMs,
    };
  } catch (e) {
    captureException(e, {
      area: "gifts.grant",
      recipientUid,
      code: clean,
    });
    return {
      ok: false,
      reason: "internal",
      message: "Redeemed, but the plan grant failed. Contact support.",
    };
  }
}

/** List gift codes purchased by `buyerUid`, newest first. */
export async function listBuyerGifts(
  buyerUid: string
): Promise<GiftCodeDoc[]> {
  const db = getAdminDb();
  if (!db) return [];
  try {
    const snap = await db
      .collection(`users/${buyerUid}/profile/giftPurchases`)
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();
    return snap.docs.map((d) => d.data() as GiftCodeDoc);
  } catch (e) {
    captureException(e, { area: "gifts.listBuyer", buyerUid });
    return [];
  }
}
