import { NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured, getAdminDb } from "@/lib/firebaseAdmin";
import { addToTokenBank, getTokenBank } from "@/lib/tokenBank";
import { logEvent } from "@/lib/events";
import { reloadReward, ymdLocal } from "@/lib/schedule";
import { bumpStreak } from "@/lib/streaks";

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

  // Engagement-based reward: client reports completed minutes for today's
  // sessions. We clamp and compute tokens server-side so the UI can't just
  // pass an arbitrary number.
  let minutes = 0;
  try {
    const body = await req.json().catch(() => ({}));
    if (typeof body?.minutes === "number" && Number.isFinite(body.minutes)) {
      minutes = Math.max(0, Math.min(Math.round(body.minutes), 240));
    }
  } catch {}

  // Pull current bonus-bank balance so we can scale the reward by how
  // depleted the user actually is. A student who's burned through their
  // bonus pool gets a bigger reload than one sitting on unused tokens.
  const bank = await getTokenBank(user.uid);
  const { amount: credited, base, multiplier } = reloadReward(
    minutes,
    bank.balance
  );

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
    await addToTokenBank(user.uid, credited, "schedule.claim");
    // Bump streak if they studied for at least 10 minutes
    void bumpStreak(user.uid, minutes);
    void logEvent({
      kind: "chat.send", // reuse for now; add "schedule.claim" later
      uid: user.uid,
      email: user.email,
      meta: {
        kind: "schedule.claim",
        tokens: credited,
        minutes,
        base,
        multiplier,
        priorBalance: bank.balance,
      },
    });
    return NextResponse.json({
      ok: true,
      credited,
      minutes,
      base,
      multiplier,
      priorBalance: bank.balance,
    });
  }

  return NextResponse.json(
    { ok: false, reason: reason || "not_claimed" },
    { status: 409 }
  );
}
