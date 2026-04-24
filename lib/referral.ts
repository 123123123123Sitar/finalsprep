/**
 * Referral program. Each signed-in user gets a short, shareable code
 * (created lazily on first access). When a new user lands on the app
 * via `?ref=CODE`, the client stashes it to localStorage and POSTs it
 * to /api/referral/attribute the moment their email is verified.
 *
 * Attribution is one-way and idempotent: a referee can only be
 * attributed once, and the paired token grants fire once per pairing.
 * Both sides are credited through the same bonus token bank used for
 * shop purchases and streak rewards.
 */
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { addToTokenBank } from "@/lib/tokenBank";
import { captureException } from "@/lib/observability";

// 5k tokens ≈ a handful of chat turns on the learner plan. Generous
// enough to feel rewarding without letting a referral farm drain the
// AI budget. Update both sides in lockstep if you tweak either number.
export const REFERRAL_TOKEN_REWARD_REFEREE = 5000;
export const REFERRAL_TOKEN_REWARD_REFERRER = 5000;

// Avoid confusable characters (0/O, 1/I/L) so codes are easy to read
// aloud or copy off a screenshot.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CODE_LEN = 7;

export type ReferralDoc = {
  code: string;
  createdAt: number;
  referredBy?: string | null;
  referredByCode?: string | null;
  attributedAt?: number;
  referredCount?: number;
  totalEarnedTokens?: number;
};

function randomCode(): string {
  let out = "";
  for (let i = 0; i < CODE_LEN; i++) {
    out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return out;
}

function referralRefs(uid: string) {
  const db = getAdminDb();
  if (!db) return null;
  return {
    db,
    userRef: db.doc(`users/${uid}/profile/referral`),
  };
}

/**
 * Return the caller's referral record, creating a fresh code if one
 * doesn't exist yet. Retries on the rare collision with an existing
 * code in the inverse index.
 */
export async function ensureReferralCode(uid: string): Promise<ReferralDoc> {
  const refs = referralRefs(uid);
  if (!refs) {
    return { code: "", createdAt: Date.now() };
  }
  const { db, userRef } = refs;
  try {
    const existing = await userRef.get();
    if (existing.exists) {
      return (existing.data() || {}) as ReferralDoc;
    }
    for (let attempt = 0; attempt < 6; attempt++) {
      const code = randomCode();
      const codeRef = db.doc(`referralCodes/${code}`);
      // The inverse-index write claims the code atomically — if another
      // user already holds it, this throws and we retry with a fresh one.
      try {
        await db.runTransaction(async (tx) => {
          const claim = await tx.get(codeRef);
          if (claim.exists) throw new Error("code-taken");
          tx.set(codeRef, { uid, createdAt: Date.now() });
          tx.set(
            userRef,
            { code, createdAt: Date.now(), referredCount: 0 },
            { merge: true }
          );
        });
        return { code, createdAt: Date.now(), referredCount: 0 };
      } catch (e: any) {
        if (e?.message === "code-taken") continue;
        throw e;
      }
    }
    throw new Error("Could not reserve a referral code after 6 attempts");
  } catch (e) {
    captureException(e, { area: "referral.ensureCode", uid });
    return { code: "", createdAt: Date.now() };
  }
}

/** Look up the owning uid for a shared code, or null if unknown. */
export async function getUidByCode(code: string): Promise<string | null> {
  const db = getAdminDb();
  if (!db) return null;
  const clean = code.trim().toUpperCase();
  if (!clean) return null;
  try {
    const snap = await db.doc(`referralCodes/${clean}`).get();
    if (!snap.exists) return null;
    const data = snap.data() as { uid?: string } | undefined;
    return typeof data?.uid === "string" ? data.uid : null;
  } catch (e) {
    captureException(e, { area: "referral.lookup", code: clean });
    return null;
  }
}

export type AttributeResult =
  | { ok: true; alreadyAttributed?: boolean; referrerUid: string }
  | {
      ok: false;
      reason:
        | "invalid-code"
        | "self-referral"
        | "already-attributed"
        | "not-configured"
        | "internal";
      message: string;
    };

/**
 * Mark `refereeUid` as referred by the owner of `code`, granting bonus
 * tokens to both parties. Safe to call more than once — a second call
 * for the same pairing short-circuits without double-granting.
 */
export async function attributeReferral(
  refereeUid: string,
  code: string
): Promise<AttributeResult> {
  const db = getAdminDb();
  if (!db) {
    return {
      ok: false,
      reason: "not-configured",
      message: "Referrals aren't available right now.",
    };
  }
  const clean = code.trim().toUpperCase();
  if (!clean) {
    return { ok: false, reason: "invalid-code", message: "Invalid code." };
  }
  const referrerUid = await getUidByCode(clean);
  if (!referrerUid) {
    return {
      ok: false,
      reason: "invalid-code",
      message: "That referral code doesn't exist.",
    };
  }
  if (referrerUid === refereeUid) {
    return {
      ok: false,
      reason: "self-referral",
      message: "You can't refer yourself.",
    };
  }

  const refereeRef = db.doc(`users/${refereeUid}/profile/referral`);
  const referrerRef = db.doc(`users/${referrerUid}/profile/referral`);

  // Claim the pairing inside a transaction so parallel calls (two tabs,
  // a retry after a flaky network) can't each grant a bonus.
  let shouldGrant = false;
  try {
    await db.runTransaction(async (tx) => {
      const current = await tx.get(refereeRef);
      const existing = (current.data() || {}) as ReferralDoc;
      if (existing.referredBy) {
        // Already attributed — either to this same referrer (idempotent
        // success) or to someone else (silently treat as already-done).
        shouldGrant = false;
        return;
      }
      tx.set(
        refereeRef,
        {
          referredBy: referrerUid,
          referredByCode: clean,
          attributedAt: Date.now(),
        },
        { merge: true }
      );
      tx.set(
        referrerRef,
        {
          referredCount: FieldValue.increment(1),
          totalEarnedTokens: FieldValue.increment(
            REFERRAL_TOKEN_REWARD_REFERRER
          ),
          updatedAt: Date.now(),
        },
        { merge: true }
      );
      shouldGrant = true;
    });
  } catch (e) {
    captureException(e, {
      area: "referral.attribute",
      refereeUid,
      code: clean,
    });
    return {
      ok: false,
      reason: "internal",
      message: "Couldn't attribute referral. Try again in a moment.",
    };
  }

  if (!shouldGrant) {
    return { ok: true, alreadyAttributed: true, referrerUid };
  }

  // Token grants run outside the transaction so a Firestore hiccup on
  // the bank write can't roll back the pairing (which we want to stick
  // once claimed). addToTokenBank is best-effort and captures its own
  // errors.
  await Promise.all([
    addToTokenBank(
      refereeUid,
      REFERRAL_TOKEN_REWARD_REFEREE,
      `referral:referee:${clean}`
    ),
    addToTokenBank(
      referrerUid,
      REFERRAL_TOKEN_REWARD_REFERRER,
      `referral:referrer:${clean}`
    ),
  ]);

  return { ok: true, referrerUid };
}

export async function getReferralDoc(
  uid: string
): Promise<ReferralDoc | null> {
  const db = getAdminDb();
  if (!db) return null;
  try {
    const snap = await db.doc(`users/${uid}/profile/referral`).get();
    if (!snap.exists) return null;
    return (snap.data() || {}) as ReferralDoc;
  } catch (e) {
    captureException(e, { area: "referral.getDoc", uid });
    return null;
  }
}
