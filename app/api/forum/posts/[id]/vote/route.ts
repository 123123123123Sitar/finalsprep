import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { requireAuthedUser } from "@/lib/authGuard";
import { adminDbOrThrow } from "@/lib/socialAdmin";

export const runtime = "nodejs";

/**
 * POST /api/forum/posts/{id}/vote  body: { op: "up" | "clear" }
 * Toggles the caller's uid in the post's `upvotes` array. No down-votes —
 * this is an upvote-only model (closer to Reddit gold than Reddit karma).
 */
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
  const op = body?.op === "clear" ? "clear" : "up";

  const db = adminDbOrThrow();
  const ref = db.collection("forumPosts").doc(params.id);
  const snap = await ref.get();
  if (!snap.exists) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  await ref.update({
    upvotes:
      op === "up"
        ? FieldValue.arrayUnion(user.uid)
        : FieldValue.arrayRemove(user.uid),
    updatedAt: Date.now(),
  });

  const after = await ref.get();
  const upvotes: string[] = Array.isArray((after.data() as any).upvotes)
    ? (after.data() as any).upvotes
    : [];
  return NextResponse.json({
    ok: true,
    upvoted: upvotes.includes(user.uid),
    score: upvotes.length,
  });
}
