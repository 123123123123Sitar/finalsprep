import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  adminDbOrThrow,
  ensurePublicProfile,
  writeNotification,
} from "@/lib/socialAdmin";
import { validateCommentText } from "@/lib/social";

export const runtime = "nodejs";

type BlogComment = {
  id: string;
  blogSlug: string;
  uid: string;
  username: string;
  displayName: string;
  text: string;
  parentId: string | null;
  upvotes: string[];
  createdAt: number;
  edited?: boolean;
};

/** GET /api/blog-comments?blogSlug=ap-calculus-ab-review-guide: public list. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const blogSlug = (searchParams.get("blogSlug") || "").trim();
  if (!blogSlug) {
    return NextResponse.json({ error: "Missing blogSlug" }, { status: 400 });
  }

  let db;
  try {
    db = adminDbOrThrow();
  } catch {
    return NextResponse.json({ comments: [] });
  }

  // Intentionally no `.orderBy()`. A composite where+orderBy query on
  // two different fields needs a Firestore index, which isn't worth
  // maintaining for a small per-post comment list. We fetch and sort
  // in memory instead. The limit is a safety cap, not a pagination
  // cursor, so ordering doesn't need to happen at the DB layer.
  let snap;
  try {
    snap = await db
      .collection("blogComments")
      .where("blogSlug", "==", blogSlug)
      .limit(500)
      .get();
  } catch (e) {
    console.error("[blog-comments] GET failed:", e);
    return NextResponse.json(
      { error: "Couldn't load comments" },
      { status: 500 }
    );
  }

  const comments: BlogComment[] = snap.docs
    .map((d) => {
      const data = d.data() as any;
      return {
        id: d.id,
        blogSlug: data.blogSlug,
        uid: data.uid,
        username: data.username,
        displayName: data.displayName,
        text: data.text,
        parentId: data.parentId || null,
        upvotes: Array.isArray(data.upvotes) ? data.upvotes : [],
        createdAt: data.createdAt || 0,
        edited: !!data.edited,
      };
    })
    .sort((a, b) => b.createdAt - a.createdAt);

  return NextResponse.json({ comments });
}

/** POST /api/blog-comments: create (signed-in + verified). */
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

  const blogSlug = (body?.blogSlug || "").toString().trim();
  const text = (body?.text || "").toString();
  const parentId =
    typeof body?.parentId === "string" && body.parentId ? body.parentId : null;

  if (!blogSlug) {
    return NextResponse.json({ error: "Missing blogSlug" }, { status: 400 });
  }
  const invalid = validateCommentText(text);
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });

  const db = adminDbOrThrow();
  const profile = await ensurePublicProfile(db, user.uid, user.email);

  const ref = db.collection("blogComments").doc();
  const createdAt = Date.now();
  await ref.set({
    blogSlug,
    uid: user.uid,
    username: profile.username,
    displayName: profile.displayName,
    text: text.trim(),
    parentId,
    upvotes: [],
    createdAt,
  });

  // Notify the parent author on replies (non-fatal if it fails).
  if (parentId) {
    try {
      const parentSnap = await db
        .collection("blogComments")
        .doc(parentId)
        .get();
      const parent = parentSnap.data() as any;
      if (parent?.uid && parent.uid !== user.uid) {
        await writeNotification(db, parent.uid, {
          kind: "comment_reply",
          fromUid: user.uid,
          fromUsername: profile.username,
          fromDisplayName: profile.displayName,
          text: `${profile.displayName} replied: ${text.trim().slice(0, 120)}`,
          link: `/blog/${blogSlug}#comments`,
        });
      }
    } catch {
      // Swallow: reply is still recorded; notification just missed.
    }
  }

  return NextResponse.json({
    comment: {
      id: ref.id,
      blogSlug,
      uid: user.uid,
      username: profile.username,
      displayName: profile.displayName,
      text: text.trim(),
      parentId,
      upvotes: [],
      createdAt,
    },
  });
}
