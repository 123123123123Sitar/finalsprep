import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import { adminDbOrThrow } from "@/lib/socialAdmin";

export const runtime = "nodejs";

/** POST /api/comments/{id}/vote — toggle the caller's upvote. */
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;

  const db = adminDbOrThrow();
  const ref = db.collection("lessonComments").doc(params.id);

  const result = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return null;
    const data = snap.data() as any;
    const upvotes: string[] = Array.isArray(data.upvotes) ? data.upvotes : [];
    const has = upvotes.includes(user.uid);
    const next = has
      ? upvotes.filter((u) => u !== user.uid)
      : [...upvotes, user.uid];
    tx.update(ref, { upvotes: next });
    return { upvoted: !has, count: next.length };
  });

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(result);
}
