import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  adminDbOrThrow,
  ensurePublicProfile,
  writeNotification,
} from "@/lib/socialAdmin";
import { validateMessageText } from "@/lib/social";

export const runtime = "nodejs";

/**
 * Access gate shared by GET/POST. Verifies that the caller is one of the
 * conversation's two participants; returns 403 otherwise.
 */
async function assertParticipant(
  db: FirebaseFirestore.Firestore,
  conversationId: string,
  uid: string
) {
  const conv = await db.collection("conversations").doc(conversationId).get();
  if (!conv.exists) return null;
  const parts: string[] = (conv.data() as any).participants || [];
  if (!parts.includes(uid)) return null;
  return conv;
}

/** GET /api/conversations/{id}/messages — paginated message thread. */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;

  const db = adminDbOrThrow();
  const conv = await assertParticipant(db, params.id, user.uid);
  if (!conv) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const snap = await db
    .collection("conversations")
    .doc(params.id)
    .collection("messages")
    .orderBy("createdAt", "asc")
    .limit(200)
    .get();

  const messages = snap.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      conversationId: params.id,
      uid: data.uid,
      text: data.text,
      createdAt: data.createdAt || 0,
    };
  });

  return NextResponse.json({ messages });
}

/** POST /api/conversations/{id}/messages { text } — send a message. */
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const text = (body?.text || "").toString();
  const invalid = validateMessageText(text);
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });

  const db = adminDbOrThrow();
  const conv = await assertParticipant(db, params.id, user.uid);
  if (!conv) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const now = Date.now();
  const msgRef = await db
    .collection("conversations")
    .doc(params.id)
    .collection("messages")
    .add({
      uid: user.uid,
      text: text.trim(),
      createdAt: now,
    });

  await db.collection("conversations").doc(params.id).update({
    lastMessage: text.trim().slice(0, 200),
    lastMessageUid: user.uid,
    lastMessageAt: now,
  });

  const parts: string[] = (conv.data() as any).participants || [];
  const recipientUid = parts.find((u) => u !== user.uid);
  if (recipientUid) {
    const senderProfile = await ensurePublicProfile(db, user.uid, user.email);
    await writeNotification(db, recipientUid, {
      kind: "message",
      fromUid: user.uid,
      fromUsername: senderProfile.username,
      fromDisplayName: senderProfile.displayName,
      text: `${senderProfile.displayName}: ${text.trim().slice(0, 120)}`,
      link: `/messages?c=${params.id}`,
    });
  }

  return NextResponse.json({
    message: {
      id: msgRef.id,
      conversationId: params.id,
      uid: user.uid,
      text: text.trim(),
      createdAt: now,
    },
  });
}
