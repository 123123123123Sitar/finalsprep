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

/**
 * POST /api/follow-requests/{id} — accept a pending follow request.
 * The id is the same composite key stored in the `follows` collection:
 * `${followerUid}__${targetUid}`. Only the target user can accept.
 */
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;

  const db = adminDbOrThrow();
  const followRef = db.collection("follows").doc(params.id);
  const snap = await followRef.get();
  if (!snap.exists) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  const data = snap.data() as any;
  if (data.followeeUid !== user.uid) {
    return NextResponse.json({ error: "Not your request" }, { status: 403 });
  }
  if (data.status === "accepted") {
    return NextResponse.json({ ok: true, status: "accepted" });
  }

  const followerUid = data.followerUid as string;
  const targetUid = data.followeeUid as string;

  const [followerProfile, targetProfile] = await Promise.all([
    ensurePublicProfile(db, followerUid, null),
    ensurePublicProfile(db, targetUid, user.email),
  ]);

  const batch = db.batch();
  batch.set(
    followRef,
    { status: "accepted", acceptedAt: Date.now() },
    { merge: true }
  );
  batch.set(
    db.collection("publicProfiles").doc(followerUid),
    { stats: { followingCount: FieldValue.increment(1) } },
    { merge: true }
  );
  batch.set(
    db.collection("publicProfiles").doc(targetUid),
    { stats: { followersCount: FieldValue.increment(1) } },
    { merge: true }
  );
  await batch.commit();

  // Tell the follower their request was approved.
  await writeNotification(db, followerUid, {
    kind: "follow",
    fromUid: targetUid,
    fromUsername: targetProfile.username,
    fromDisplayName: targetProfile.displayName,
    text: `${targetProfile.displayName} accepted your follow request`,
    link: `/users/${targetUid}`,
  });

  await postActivity(db, {
    uid: followerUid,
    username: followerProfile.username,
    displayName: followerProfile.displayName,
    kind: "custom_post",
    content: `started following @${targetProfile.username}`,
  }).catch(() => {});

  return NextResponse.json({ ok: true, status: "accepted" });
}

/** DELETE /api/follow-requests/{id} — reject the pending request. */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;

  const db = adminDbOrThrow();
  const followRef = db.collection("follows").doc(params.id);
  const snap = await followRef.get();
  if (!snap.exists) {
    return NextResponse.json({ ok: true });
  }
  const data = snap.data() as any;
  if (data.followeeUid !== user.uid) {
    return NextResponse.json({ error: "Not your request" }, { status: 403 });
  }
  if (data.status === "accepted") {
    return NextResponse.json(
      { error: "Already accepted — use DELETE /api/users/{uid}/follow to remove" },
      { status: 409 }
    );
  }
  await followRef.delete();
  return NextResponse.json({ ok: true });
}
