import { NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/authGuard";
import { adminDbOrThrow, getPublicProfile } from "@/lib/socialAdmin";

export const runtime = "nodejs";

/**
 * GET /api/users/{uid} — public profile view.
 *
 * Also returns whether the caller (if signed in) is following this user,
 * so the profile page can render the Follow/Unfollow button correctly
 * without a second round-trip.
 */
export async function GET(
  req: Request,
  { params }: { params: { uid: string } }
) {
  let db;
  try {
    db = adminDbOrThrow();
  } catch {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const profile = await getPublicProfile(db, params.uid);
  if (!profile) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const caller = await getAuthedUser(req);
  let isFollowing = false;
  let isSelf = false;
  if (caller) {
    isSelf = caller.uid === params.uid;
    if (!isSelf) {
      const followId = `${caller.uid}__${params.uid}`;
      const snap = await db.collection("follows").doc(followId).get();
      isFollowing = snap.exists;
    }
  }

  // Course-level stats to show on the profile.
  const statsSnap = await db
    .collection("leaderboardStats")
    .where("uid", "==", params.uid)
    .limit(20)
    .get();
  const courseStats = statsSnap.docs
    .map((d) => d.data() as any)
    .map((d) => ({ courseSlug: d.courseSlug, problems: d.problems || 0 }))
    .sort((a, b) => b.problems - a.problems);

  return NextResponse.json({ profile, isFollowing, isSelf, courseStats });
}
