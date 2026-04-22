import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  adminDbOrThrow,
  ensurePublicProfile,
  postActivity,
} from "@/lib/socialAdmin";

export const runtime = "nodejs";

/**
 * POST /api/feed/post: share a custom progress update to the global feed.
 */
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

  const content = (body?.content || "").toString().trim().slice(0, 400);
  if (content.length < 2) {
    return NextResponse.json({ error: "Too short" }, { status: 400 });
  }

  const db = adminDbOrThrow();
  const profile = await ensurePublicProfile(db, user.uid, user.email);
  const id = await postActivity(db, {
    uid: user.uid,
    username: profile.username,
    displayName: profile.displayName,
    kind: "custom_post",
    content,
  });

  return NextResponse.json({ id });
}
