import { NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/authGuard";
import { adminDbOrThrow } from "@/lib/socialAdmin";
import type { ActivityItem } from "@/lib/social";

export const runtime = "nodejs";

/**
 * GET /api/feed
 *
 * - If signed in: returns the most recent activities from people the
 *   caller follows (cap 50). If the caller follows no one, falls back
 *   to the global feed so they have something to look at.
 * - If not signed in: returns the global activity stream (cap 30).
 */
export async function GET(req: Request) {
  let db;
  try {
    db = adminDbOrThrow();
  } catch {
    return NextResponse.json({ items: [] });
  }

  const caller = await getAuthedUser(req);

  let items: ActivityItem[] = [];

  if (caller) {
    const followsSnap = await db
      .collection("follows")
      .where("followerUid", "==", caller.uid)
      .get();
    const followeeUids = followsSnap.docs.map(
      (d) => (d.data() as any).followeeUid
    );
    // Always include the caller's own activities in their feed.
    const uids = Array.from(new Set([...followeeUids, caller.uid])).slice(0, 30);
    if (uids.length > 0) {
      const actSnap = await db
        .collection("activities")
        .where("uid", "in", uids)
        .orderBy("createdAt", "desc")
        .limit(50)
        .get();
      items = actSnap.docs.map((d) => {
        const a = d.data() as any;
        return {
          id: d.id,
          uid: a.uid,
          username: a.username,
          displayName: a.displayName,
          kind: a.kind,
          course: a.course,
          unit: a.unit,
          content: a.content,
          createdAt: a.createdAt || 0,
          reactions: a.reactions || {},
        };
      });
    }
  }

  // Fall back to global feed if the user follows no one (or isn't signed in).
  if (items.length === 0) {
    const globalSnap = await db
      .collection("activities")
      .orderBy("createdAt", "desc")
      .limit(30)
      .get();
    items = globalSnap.docs.map((d) => {
      const a = d.data() as any;
      return {
        id: d.id,
        uid: a.uid,
        username: a.username,
        displayName: a.displayName,
        kind: a.kind,
        course: a.course,
        unit: a.unit,
        content: a.content,
        createdAt: a.createdAt || 0,
        reactions: a.reactions || {},
      };
    });
  }

  return NextResponse.json({ items });
}
