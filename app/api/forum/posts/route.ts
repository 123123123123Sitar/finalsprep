import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  adminDbOrThrow,
  ensurePublicProfile,
} from "@/lib/socialAdmin";
import {
  getSubforum,
  hotScore,
  sanitizeTags,
  validatePostBody,
  validatePostTitle,
  type ForumPost,
} from "@/lib/forums";
import { hydratePost } from "@/lib/forumsHydrate";

export const runtime = "nodejs";

/**
 * GET /api/forum/posts?forum={slug}&sort={hot|new}&limit={n}
 *
 * `forum` is optional — omitted means "all subforums" (the home feed).
 * `sort` defaults to `hot`. We over-fetch a small pool from Firestore
 * (ordered by createdAt) and score in memory so we don't need a composite
 * index for each sort mode.
 */
export async function GET(req: Request) {
  try {
    const db = adminDbOrThrow();
    const url = new URL(req.url);
    const forum = url.searchParams.get("forum");
    const sort = url.searchParams.get("sort") === "new" ? "new" : "hot";
    const limit = Math.min(Number(url.searchParams.get("limit") || 30) || 30, 50);

    if (forum && !getSubforum(forum)) {
      return NextResponse.json({ error: "Unknown forum" }, { status: 404 });
    }

    let q: FirebaseFirestore.Query = db.collection("forumPosts");
    if (forum) q = q.where("forum", "==", forum);
    // Over-fetch for hot-sort ranking. createdAt is the natural pagination key.
    const snap = await q.orderBy("createdAt", "desc").limit(120).get();

    const posts: ForumPost[] = snap.docs.map((d) => hydratePost(d.id, d.data() as any));
    const ranked =
      sort === "new"
        ? posts
        : posts
            .map((p) => ({
              p,
              h: hotScore(p.upvotes.length, p.createdAt),
            }))
            .sort((a, b) => b.h - a.h)
            .map((x) => x.p);

    return NextResponse.json({ posts: ranked.slice(0, limit) });
  } catch (e: any) {
    return NextResponse.json(
      { posts: [], error: e?.message || "Posts unavailable" },
      { status: 200 }
    );
  }
}

/** POST /api/forum/posts — create a new post. */
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

  const forum = typeof body?.forum === "string" ? body.forum : "";
  const sub = getSubforum(forum);
  if (!sub) {
    return NextResponse.json({ error: "Unknown forum" }, { status: 400 });
  }

  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const titleErr = validatePostTitle(title);
  if (titleErr) return NextResponse.json({ error: titleErr }, { status: 400 });

  const bodyText =
    typeof body?.body === "string" ? body.body.replace(/\r\n/g, "\n") : "";
  const bodyErr = validatePostBody(bodyText);
  if (bodyErr) return NextResponse.json({ error: bodyErr }, { status: 400 });

  const tags = sanitizeTags(body?.tags);

  const db = adminDbOrThrow();
  const profile = await ensurePublicProfile(db, user.uid, user.email);

  const now = Date.now();
  const doc = {
    forum: sub.slug,
    authorUid: user.uid,
    authorUsername: profile.username,
    authorDisplayName: profile.displayName,
    authorAvatarEmoji: profile.avatarEmoji ?? null,
    authorAvatarColor: profile.avatarColor ?? null,
    title: title.slice(0, 140),
    body: bodyText.slice(0, 4000),
    tags,
    upvotes: [user.uid],
    commentCount: 0,
    createdAt: now,
    updatedAt: now,
  };
  const ref = await db.collection("forumPosts").add(doc);

  return NextResponse.json({
    post: hydratePost(ref.id, doc),
  });
}

