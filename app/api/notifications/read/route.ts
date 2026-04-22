import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import { adminDbOrThrow } from "@/lib/socialAdmin";

export const runtime = "nodejs";

/** POST /api/notifications/read: mark all unread notifications as read. */
export async function POST(req: Request) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;

  const db = adminDbOrThrow();
  const snap = await db
    .collection("notifications")
    .where("uid", "==", user.uid)
    .where("read", "==", false)
    .limit(200)
    .get();

  if (snap.empty) return NextResponse.json({ ok: true, updated: 0 });

  const batch = db.batch();
  snap.docs.forEach((d) => batch.update(d.ref, { read: true }));
  await batch.commit();

  return NextResponse.json({ ok: true, updated: snap.size });
}
