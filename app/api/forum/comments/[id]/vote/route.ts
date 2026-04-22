import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { requireAuthedUser } from "@/lib/authGuard";
import { adminDbOrThrow } from "@/lib/socialAdmin";

export const runtime = "nodejs";

/** POST /api/forum/comments/{id}/vote  body: { op: "up" | "clear" } */
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
  const ref = db.collection("forumComments").doc(params.id);
  const snap = await ref.get();
  if (!snap.exists) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  await ref.update({
    upvotes:
      op === "up"
        ? FieldValue.arrayUnion(user.uid)
        : FieldValue.arrayRemove(user.uid),
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
