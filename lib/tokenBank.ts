/**
 * Per-user bonus token bank. Funded by shop purchases and study-streak
 * rewards; spent when a user would otherwise hit the daily rate limit.
 *
 * Stored at users/{uid}/profile/tokenBank = { balance, updatedAt }.
 * Writes go through the admin SDK from server routes - clients read
 * through onSnapshot elsewhere but never write directly.
 */
import { getAdminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export type TokenBank = { balance: number; updatedAt: number };

function tokenBankRef(uid: string) {
  const db = getAdminDb();
  if (!db) return null;
  return db.doc(`users/${uid}/profile/tokenBank`);
}

export async function getTokenBank(uid: string): Promise<TokenBank> {
  const ref = tokenBankRef(uid);
  if (!ref) return { balance: 0, updatedAt: 0 };
  try {
    const snap = await ref.get();
    if (!snap.exists) return { balance: 0, updatedAt: 0 };
    const data = snap.data() as any;
    return {
      balance: Math.max(0, Math.round(data?.balance || 0)),
      updatedAt:
        typeof data?.updatedAt === "number" ? data.updatedAt : Date.now(),
    };
  } catch {
    return { balance: 0, updatedAt: 0 };
  }
}

export async function addToTokenBank(
  uid: string,
  amount: number,
  source: string
): Promise<void> {
  const ref = tokenBankRef(uid);
  if (!ref || amount <= 0) return;
  try {
    await ref.set(
      {
        balance: FieldValue.increment(Math.round(amount)),
        updatedAt: Date.now(),
        lastSource: source,
      },
      { merge: true }
    );
  } catch (e) {
    console.error("[tokenBank] add failed", e);
  }
}

/** Deduct up to `amount` tokens. Returns how many were actually deducted. */
export async function deductFromTokenBank(
  uid: string,
  amount: number
): Promise<number> {
  const ref = tokenBankRef(uid);
  if (!ref || amount <= 0) return 0;
  try {
    const db = getAdminDb();
    if (!db) return 0;
    let deducted = 0;
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const current = snap.exists ? (snap.data() as any)?.balance || 0 : 0;
      deducted = Math.min(amount, current);
      if (deducted <= 0) return;
      tx.set(
        ref,
        {
          balance: Math.max(0, current - deducted),
          updatedAt: Date.now(),
        },
        { merge: true }
      );
    });
    return deducted;
  } catch (e) {
    console.error("[tokenBank] deduct failed", e);
    return 0;
  }
}

// Pack definitions live in lib/tokenPacks.ts so they can be imported from
// client components without pulling firebase-admin into the client bundle.
export { TOKEN_PACKS, getPackById } from "@/lib/tokenPacks";
