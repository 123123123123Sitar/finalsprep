import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  adminDbOrThrow,
  ensurePublicProfile,
  writeNotification,
} from "@/lib/socialAdmin";
import { validateCommentBody } from "@/lib/forums";
import { hydrateComment } from "@/lib/forumsHydrate";

export const runtime = "nodejs";

/** POST /api/forum/posts/{id}/comments: add a comment (or reply). */
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

  const text =
    typeof body?.body === "string" ? body.body.replace(/\r\n/g, "\n").trim() : "";
  const err = validateCommentBody(text);
  if (err) return NextResponse.json({ error: err }, { status: 400 });

  const parentId =
    typeof body?.parentId === "string" && body.parentId ? body.parentId : null;

  const db = adminDbOrThrow();
  const postRef = db.collection("forumPosts").doc(params.id);
  const postSnap = await postRef.get();
  if (!postSnap.exists) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  const post = postSnap.data() as any;

  const profile = await ensurePublicProfile(db, user.uid, user.email);

  const now = Date.now();
  const doc = {
    postId: params.id,
    forum: post.forum,
    authorUid: user.uid,
    authorUsername: profile.username,
    authorDisplayName: profile.displayName,
    authorAvatarEmoji: profile.avatarEmoji ?? null,
    authorAvatarColor: profile.avatarColor ?? null,
    parentId,
    body: text.slice(0, 2000),
    upvotes: [user.uid],
    createdAt: now,
  };
  const ref = await db.collection("forumComments").add(doc);
  await postRef.update({
    commentCount: FieldValue.increment(1),
    updatedAt: now,
  });

  // Notify the post author on top-level replies, and the parent comment's
  // author on threaded replies. Never self-notify.
  const targetUid = parentId
    ? await lookupCommentAuthor(db, parentId)
    : post.authorUid;
  if (targetUid && targetUid !== user.uid) {
    await writeNotification(db, targetUid, {
      kind: "comment_reply",
      fromUid: user.uid,
      fromUsername: profile.username,
      fromDisplayName: profile.displayName,
      text: `${profile.displayName} replied: ${text.slice(0, 80)}`,
      link: `/social/f/${post.forum}/${params.id}`,
    });
  }

  return NextResponse.json({ comment: hydrateComment(ref.id, doc) });
}

async function lookupCommentAuthor(
  db: FirebaseFirestore.Firestore,
  commentId: string
): Promise<string | null> {
  try {
    const snap = await db.collection("forumComments").doc(commentId).get();
    if (!snap.exists) return null;
    const d = snap.data() as any;
    return typeof d.authorUid === "string" ? d.authorUid : null;
  } catch {
    return null;
  }
}
