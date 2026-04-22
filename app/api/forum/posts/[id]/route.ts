import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import { adminDbOrThrow } from "@/lib/socialAdmin";
import type { ForumComment } from "@/lib/forums";
import { hydrateComment, hydratePost } from "@/lib/forumsHydrate";

export const runtime = "nodejs";

/** GET /api/forum/posts/{id} — post + flat comments list (newest-first). */
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = adminDbOrThrow();
    const postSnap = await db.collection("forumPosts").doc(params.id).get();
    if (!postSnap.exists) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    const post = hydratePost(postSnap.id, postSnap.data() as any);

    // Pull comments ordered by createdAt ascending (oldest first is typical
    // for threaded discussion — we render nested replies in-order).
    const commentsSnap = await db
      .collection("forumComments")
      .where("postId", "==", params.id)
      .limit(500)
      .get();
    const comments: ForumComment[] = commentsSnap.docs
      .map((d) => hydrateComment(d.id, d.data() as any))
      .sort((a, b) => a.createdAt - b.createdAt);

    return NextResponse.json({ post, comments });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Post unavailable" },
      { status: 500 }
    );
  }
}

/** DELETE /api/forum/posts/{id} — author only. Also nukes its comments. */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;
  const db = adminDbOrThrow();

  const ref = db.collection("forumPosts").doc(params.id);
  const snap = await ref.get();
  if (!snap.exists) return NextResponse.json({ ok: true });
  const data = snap.data() as any;
  if (data.authorUid !== user.uid) {
    return NextResponse.json({ error: "Not your post" }, { status: 403 });
  }

  const commentsSnap = await db
    .collection("forumComments")
    .where("postId", "==", params.id)
    .get();
  const batch = db.batch();
  commentsSnap.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(ref);
  await batch.commit();

  return NextResponse.json({ ok: true });
}

