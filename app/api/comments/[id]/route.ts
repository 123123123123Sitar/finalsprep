import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import { adminDbOrThrow } from "@/lib/socialAdmin";

export const runtime = "nodejs";

/** DELETE /api/comments/{id} — author can delete their own comment. */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;

  const db = adminDbOrThrow();
  const ref = db.collection("lessonComments").doc(params.id);
  const snap = await ref.get();
  if (!snap.exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const data = snap.data() as any;
  if (data.uid !== user.uid) {
    return NextResponse.json({ error: "Not your comment" }, { status: 403 });
  }
  await ref.delete();
  return NextResponse.json({ ok: true });
}
