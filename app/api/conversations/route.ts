import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  adminDbOrThrow,
  ensurePublicProfile,
  getProfilesByUids,
} from "@/lib/socialAdmin";
import { conversationIdFor } from "@/lib/social";

export const runtime = "nodejs";

/** GET /api/conversations: list conversations the caller is part of. */
export async function GET(req: Request) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;

  const db = adminDbOrThrow();
  const snap = await db
    .collection("conversations")
    .where("participants", "array-contains", user.uid)
    .orderBy("lastMessageAt", "desc")
    .limit(50)
    .get();

  const otherUids: string[] = [];
  snap.forEach((d) => {
    const data = d.data() as any;
    const other = (data.participants || []).find((u: string) => u !== user.uid);
    if (other) otherUids.push(other);
  });
  const profiles = await getProfilesByUids(db, otherUids);

  const conversations = snap.docs.map((d) => {
    const data = d.data() as any;
    const other = (data.participants || []).find(
      (u: string) => u !== user.uid
    );
    const otherProfile = other ? profiles.get(other) : null;
    return {
      id: d.id,
      otherUid: other,
      otherUsername: otherProfile?.username || "user",
      otherDisplayName: otherProfile?.displayName || otherProfile?.username || "user",
      lastMessage: data.lastMessage || "",
      lastMessageUid: data.lastMessageUid || "",
      lastMessageAt: data.lastMessageAt || 0,
    };
  });

  return NextResponse.json({ conversations });
}

/** POST /api/conversations { otherUid }: create or return conversation id. */
export async function POST(req: Request) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const otherUid = (body?.otherUid || "").toString().trim();
  if (!otherUid || otherUid === user.uid) {
    return NextResponse.json({ error: "Bad otherUid" }, { status: 400 });
  }

  const db = adminDbOrThrow();
  await ensurePublicProfile(db, user.uid, user.email);
  const otherProfile = await ensurePublicProfile(db, otherUid, null);
  if (!otherProfile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const conversationId = conversationIdFor(user.uid, otherUid);
  const ref = db.collection("conversations").doc(conversationId);
  const snap = await ref.get();
  if (!snap.exists) {
    await ref.set({
      participants: [user.uid, otherUid].sort(),
      lastMessage: "",
      lastMessageUid: "",
      lastMessageAt: Date.now(),
      createdAt: Date.now(),
    });
  }

  return NextResponse.json({ conversationId });
}
