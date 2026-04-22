import { NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured, getAdminDb } from "@/lib/firebaseAdmin";
import { ymdLocal } from "@/lib/schedule";

export const runtime = "nodejs";

/**
 * Records that the user was active at (or near) the current local minute.
 * Clients ping roughly every 60 seconds while the tab is focused. We store
 * the sparse set of minute-of-day indices ({0..1439}) in a single doc per
 * day so the claim endpoint can compute per-block coverage cheaply.
 */
export async function POST(req: Request) {
  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && (!user || !user.emailVerified)) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }
  if (!user) {
    return NextResponse.json({ error: "Admin SDK not configured" }, { status: 500 });
  }

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json({ error: "Admin SDK not configured" }, { status: 500 });
  }

  const now = new Date();
  const date = ymdLocal(now);
  const minute = now.getHours() * 60 + now.getMinutes();

  const ref = db.doc(`users/${user.uid}/profile/activityPings_${date}`);

  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = (snap.exists ? snap.data() : {}) as any;
      const existing: number[] = Array.isArray(data?.minutes) ? data.minutes : [];
      const set = new Set(existing);
      set.add(minute);
      const sorted = Array.from(set).sort((a, b) => a - b);
      tx.set(
        ref,
        {
          date,
          minutes: sorted.slice(-1440),
          lastPingAt: Date.now(),
        },
        { merge: true }
      );
    });
    return NextResponse.json({ ok: true, minute });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "ping failed" }, { status: 500 });
  }
}
