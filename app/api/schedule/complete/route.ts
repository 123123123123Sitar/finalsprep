import { NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured, getAdminDb } from "@/lib/firebaseAdmin";
import { ymdLocal } from "@/lib/schedule";

export const runtime = "nodejs";

/**
 * Marks or unmarks a scheduled block as "completed today". We keep one doc
 * per local day; the claim endpoint reads it to verify the user finished
 * what they planned before crediting bonus tokens.
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

  let body: any = {};
  try {
    body = await req.json();
  } catch {}
  const blockId = typeof body?.blockId === "string" ? body.blockId : "";
  const completed = body?.completed !== false;
  if (!blockId) {
    return NextResponse.json({ error: "blockId required" }, { status: 400 });
  }

  const date = ymdLocal();
  const ref = db.doc(`users/${user.uid}/profile/blockCompletions_${date}`);

  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = (snap.exists ? snap.data() : {}) as any;
      const existing: string[] = Array.isArray(data?.completedBlockIds)
        ? data.completedBlockIds
        : [];
      const set = new Set(existing);
      if (completed) set.add(blockId);
      else set.delete(blockId);
      tx.set(
        ref,
        { date, completedBlockIds: Array.from(set) },
        { merge: true }
      );
    });
    return NextResponse.json({ ok: true, blockId, completed });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "complete failed" }, { status: 500 });
  }
}
