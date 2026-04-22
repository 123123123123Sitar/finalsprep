import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { requireAuthedUser } from "@/lib/authGuard";
import { adminDbOrThrow } from "@/lib/socialAdmin";

export const runtime = "nodejs";

/** DELETE /api/forum/comments/{id}: author only. Soft-deletes the body
 *  and decrements the post's comment count so existing replies stay
 *  threaded under a "[deleted]" placeholder. */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;
  const db = adminDbOrThrow();

  const ref = db.collection("forumComments").doc(params.id);
  const snap = await ref.get();
  if (!snap.exists) return NextResponse.json({ ok: true });
  const data = snap.data() as any;
  if (data.authorUid !== user.uid) {
    return NextResponse.json({ error: "Not your comment" }, { status: 403 });
  }

  await ref.update({
    body: "[deleted]",
    authorDisplayName: "[deleted]",
    authorUsername: "deleted",
    edited: true,
  });
  if (data.postId) {
    await db
      .collection("forumPosts")
      .doc(data.postId)
      .update({
        commentCount: FieldValue.increment(-1),
        updatedAt: Date.now(),
      })
      .catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
