import { NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured, getAdminDb } from "@/lib/firebaseAdmin";
import { addToTokenBank } from "@/lib/tokenBank";
import { logEvent } from "@/lib/events";
import { DAILY_CLAIM_TOKENS, ymdLocal } from "@/lib/schedule";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && (!user || !user.emailVerified)) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }
  if (!user) {
    return NextResponse.json(
      { error: "Admin SDK not configured" },
      { status: 500 }
    );
  }

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json(
      { error: "Admin SDK not configured" },
      { status: 500 }
    );
  }

  const ref = db.doc(`users/${user.uid}/profile/schedule`);
  const today = ymdLocal();

  let claimed = false;
  let reason: string | undefined;
  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = (snap.exists ? snap.data() : {}) as any;
      if (data?.lastClaimDate === today) {
        reason = "already_claimed_today";
        return;
      }
      tx.set(
        ref,
        {
          lastClaimDate: today,
          totalClaims: (data?.totalClaims || 0) + 1,
          updatedAt: Date.now(),
        },
        { merge: true }
      );
      claimed = true;
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "claim failed" },
      { status: 500 }
    );
  }

  if (claimed) {
    await addToTokenBank(user.uid, DAILY_CLAIM_TOKENS, "schedule.claim");
    void logEvent({
      kind: "chat.send", // reuse for now; add "schedule.claim" later
      uid: user.uid,
      email: user.email,
      meta: { kind: "schedule.claim", tokens: DAILY_CLAIM_TOKENS },
    });
    return NextResponse.json({ ok: true, credited: DAILY_CLAIM_TOKENS });
  }

  return NextResponse.json(
    { ok: false, reason: reason || "not_claimed" },
    { status: 409 }
  );
}
