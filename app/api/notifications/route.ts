import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import { adminDbOrThrow } from "@/lib/socialAdmin";
import type { AppNotification } from "@/lib/social";

export const runtime = "nodejs";

/** GET /api/notifications — latest 50 for the caller, newest first. */
export async function GET(req: Request) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;

  const db = adminDbOrThrow();
  // Avoid `where + orderBy` to skip the composite-index requirement —
  // at a per-user cap of 50 notifications, in-memory sort is trivial.
  const snap = await db
    .collection("notifications")
    .where("uid", "==", user.uid)
    .limit(200)
    .get();

  const notifications: AppNotification[] = snap.docs
    .map((d) => {
      const data = d.data() as any;
      return {
        id: d.id,
        uid: data.uid,
        kind: data.kind,
        fromUid: data.fromUid || undefined,
        fromUsername: data.fromUsername || undefined,
        fromDisplayName: data.fromDisplayName || undefined,
        text: data.text || "",
        link: data.link || "",
        read: !!data.read,
        createdAt: data.createdAt || 0,
      };
    })
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 50);

  const unread = notifications.filter((n) => !n.read).length;

  return NextResponse.json({ notifications, unread });
}
