import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  adminDbOrThrow,
  ensurePublicProfile,
  writeNotification,
} from "@/lib/socialAdmin";

export const runtime = "nodejs";

/**
 * POST /api/users/{uid}/follow — request to follow the target user.
 *
 * Follows go through an approval step now: the request sits in the
 * `follows` collection with `status: "pending"` and a notification is
 * delivered to the target. They accept via /api/follow-requests/accept.
 * Until then, the follower/following counters stay unchanged and the
 * follower doesn't see gated content.
 */
export async function POST(
  req: Request,
  { params }: { params: { uid: string } }
) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;
  const targetUid = params.uid;
  if (user.uid === targetUid) {
    return NextResponse.json({ error: "Can't follow yourself" }, { status: 400 });
  }

  const db = adminDbOrThrow();
  const followerProfile = await ensurePublicProfile(db, user.uid, user.email);
  const targetProfile = await ensurePublicProfile(db, targetUid, null);
  if (!targetProfile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const followId = `${user.uid}__${targetUid}`;
  const followRef = db.collection("follows").doc(followId);
  const existing = await followRef.get();
  if (existing.exists) {
    const data = existing.data() as any;
    return NextResponse.json({
      ok: true,
      status: data.status || "accepted",
      isFollowing: data.status === "accepted",
      isRequested: data.status === "pending",
    });
  }

  await followRef.set({
    followerUid: user.uid,
    followeeUid: targetUid,
    status: "pending",
    createdAt: Date.now(),
  });

  await writeNotification(db, targetUid, {
    kind: "follow_request",
    fromUid: user.uid,
    fromUsername: followerProfile.username,
    fromDisplayName: followerProfile.displayName,
    text: `${followerProfile.displayName} wants to follow you`,
    link: `/users/${user.uid}`,
  });

  return NextResponse.json({
    ok: true,
    status: "pending",
    isFollowing: false,
    isRequested: true,
  });
}

/**
 * DELETE /api/users/{uid}/follow — unfollow or cancel a pending request.
 * Counter decrements only when we tear down an accepted follow.
 */
export async function DELETE(
  req: Request,
  { params }: { params: { uid: string } }
) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;
  const targetUid = params.uid;
  if (user.uid === targetUid) {
    return NextResponse.json({ error: "Can't unfollow yourself" }, { status: 400 });
  }

  const db = adminDbOrThrow();
  const followId = `${user.uid}__${targetUid}`;
  const followRef = db.collection("follows").doc(followId);
  const existing = await followRef.get();
  if (!existing.exists) {
    return NextResponse.json({ ok: true, isFollowing: false, isRequested: false });
  }

  const wasAccepted = (existing.data() as any)?.status === "accepted";
  const batch = db.batch();
  batch.delete(followRef);
  if (wasAccepted) {
    batch.set(
      db.collection("publicProfiles").doc(user.uid),
      { stats: { followingCount: FieldValue.increment(-1) } },
      { merge: true }
    );
    batch.set(
      db.collection("publicProfiles").doc(targetUid),
      { stats: { followersCount: FieldValue.increment(-1) } },
      { merge: true }
    );
  }
  await batch.commit();

  return NextResponse.json({ ok: true, isFollowing: false, isRequested: false });
}
