import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  adminDbOrThrow,
  ensurePublicProfile,
  postActivity,
  writeNotification,
} from "@/lib/socialAdmin";

export const runtime = "nodejs";

/** POST /api/users/{uid}/follow — caller follows target. */
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
    return NextResponse.json({ ok: true, isFollowing: true });
  }

  const batch = db.batch();
  batch.set(followRef, {
    followerUid: user.uid,
    followeeUid: targetUid,
    createdAt: Date.now(),
  });
  batch.set(
    db.collection("publicProfiles").doc(user.uid),
    { stats: { followingCount: FieldValue.increment(1) } },
    { merge: true }
  );
  batch.set(
    db.collection("publicProfiles").doc(targetUid),
    { stats: { followersCount: FieldValue.increment(1) } },
    { merge: true }
  );
  await batch.commit();

  // Fire-and-forget activity (caller's feed broadcasts the new follow).
  await postActivity(db, {
    uid: user.uid,
    username: followerProfile.username,
    displayName: followerProfile.displayName,
    kind: "custom_post",
    content: `started following @${targetProfile.username}`,
  }).catch(() => {});

  await writeNotification(db, targetUid, {
    kind: "follow",
    fromUid: user.uid,
    fromUsername: followerProfile.username,
    fromDisplayName: followerProfile.displayName,
    text: `${followerProfile.displayName} started following you`,
    link: `/users/${user.uid}`,
  });

  return NextResponse.json({ ok: true, isFollowing: true });
}

/** DELETE /api/users/{uid}/follow — caller unfollows target. */
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
    return NextResponse.json({ ok: true, isFollowing: false });
  }

  const batch = db.batch();
  batch.delete(followRef);
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
  await batch.commit();

  return NextResponse.json({ ok: true, isFollowing: false });
}
