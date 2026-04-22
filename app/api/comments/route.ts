import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  adminDbOrThrow,
  ensurePublicProfile,
  writeNotification,
} from "@/lib/socialAdmin";
import {
  validateCommentText,
  parseLessonKey,
  type LessonComment,
} from "@/lib/social";

export const runtime = "nodejs";

/** GET /api/comments?lessonKey=ap-calc-bc::u4 — list comments (public, unauth OK). */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lessonKey = (searchParams.get("lessonKey") || "").trim();
  if (!lessonKey) {
    return NextResponse.json({ error: "Missing lessonKey" }, { status: 400 });
  }

  let db;
  try {
    db = adminDbOrThrow();
  } catch {
    return NextResponse.json({ comments: [] });
  }

  const snap = await db
    .collection("lessonComments")
    .where("lessonKey", "==", lessonKey)
    .orderBy("createdAt", "desc")
    .limit(100)
    .get();

  const comments: LessonComment[] = snap.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      lessonKey: data.lessonKey,
      uid: data.uid,
      username: data.username,
      displayName: data.displayName,
      text: data.text,
      parentId: data.parentId || null,
      upvotes: Array.isArray(data.upvotes) ? data.upvotes : [],
      createdAt: data.createdAt || 0,
      edited: !!data.edited,
    };
  });

  return NextResponse.json({ comments });
}

/** POST /api/comments — create a new comment (signed-in + verified). */
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

  const lessonKey = (body?.lessonKey || "").toString().trim();
  const text = (body?.text || "").toString();
  const parentId =
    typeof body?.parentId === "string" && body.parentId ? body.parentId : null;

  if (!lessonKey) {
    return NextResponse.json({ error: "Missing lessonKey" }, { status: 400 });
  }
  const invalid = validateCommentText(text);
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });

  const db = adminDbOrThrow();
  const profile = await ensurePublicProfile(db, user.uid, user.email);

  const ref = db.collection("lessonComments").doc();
  const createdAt = Date.now();
  await ref.set({
    lessonKey,
    uid: user.uid,
    username: profile.username,
    displayName: profile.displayName,
    text: text.trim(),
    parentId,
    upvotes: [],
    createdAt,
  });

  // Notify the parent comment's author when this is a reply.
  if (parentId) {
    try {
      const parentSnap = await db
        .collection("lessonComments")
        .doc(parentId)
        .get();
      const parent = parentSnap.data() as any;
      if (parent?.uid && parent.uid !== user.uid) {
        const parsed = parseLessonKey(lessonKey);
        const link = parsed
          ? `/study?course=${encodeURIComponent(parsed.courseSlug)}&unit=${parsed.unitNumber}`
          : "/study";
        await writeNotification(db, parent.uid, {
          kind: "comment_reply",
          fromUid: user.uid,
          fromUsername: profile.username,
          fromDisplayName: profile.displayName,
          text: `${profile.displayName} replied: ${text.trim().slice(0, 120)}`,
          link,
        });
      }
    } catch {
      // Non-fatal: reply still recorded, notification just missed.
    }
  }

  return NextResponse.json({
    comment: {
      id: ref.id,
      lessonKey,
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
