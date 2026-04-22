import { NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/authGuard";
import {
  adminDbOrThrow,
  ensurePublicProfile,
  getPublicProfile,
} from "@/lib/socialAdmin";
import { getPlan } from "@/lib/userPlan";

export const runtime = "nodejs";

type CourseProgress = {
  courseSlug: string;
  completed: number;
};

type HistoryEntry = {
  kind?: string;
  tokens?: number;
  createdAt: number;
};

/**
 * GET /api/users/{uid}: public profile view.
 *
 * Returns the profile + the caller's follow relationship. Activity data
 * (recent AI history + a 90-day heatmap) is only included when the caller
 * is the profile owner OR an accepted follower; otherwise the client
 * shows a "locked" placeholder.
 */
export async function GET(
  req: Request,
  { params }: { params: { uid: string } }
) {
  let db;
  try {
    db = adminDbOrThrow();
  } catch (e: any) {
    console.error("[api/users] adminDbOrThrow failed", e);
    return NextResponse.json(
      { error: e?.message || "Server not configured" },
      { status: 500 }
    );
  }

  const caller = await getAuthedUser(req);
  const isSelf = !!caller && caller.uid === params.uid;

  let profile;
  try {
    profile = await getPublicProfile(db, params.uid);
    // Auto-create the public profile on first visit: for the owner viewing
    // their own page, or for any authed user landing on someone else's page
    // whose profile hasn't been seeded yet.
    if (!profile && caller) {
      if (isSelf) {
        profile = await ensurePublicProfile(db, caller.uid, caller.email || null);
      } else {
        // Seed a minimal stub so the page renders; owner can edit later.
        profile = await ensurePublicProfile(db, params.uid, null);
      }
    }
  } catch (e: any) {
    console.error("[api/users] profile lookup failed", e);
    return NextResponse.json(
      { error: e?.message || "Profile lookup failed" },
      { status: 500 }
    );
  }
  if (!profile) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // The `plan` field on publicProfiles isn't kept in sync with purchases,
  // so hydrate it from the authoritative source before returning.
  try {
    const fresh = await getPlan(params.uid);
    if (fresh?.plan) profile.plan = fresh.plan;
  } catch (e) {
    console.error("[api/users] getPlan failed", e);
  }

  let isFollowing = false;
  let isRequested = false;
  if (caller && !isSelf) {
    const followId = `${caller.uid}__${params.uid}`;
    const snap = await db.collection("follows").doc(followId).get();
    if (snap.exists) {
      const status = (snap.data() as any)?.status;
      isFollowing = status === "accepted";
      isRequested = status === "pending";
    }
  }

  // Selected courses + completion counts are always public.
  const prefsSnap = await db
    .collection("users")
    .doc(params.uid)
    .collection("profile")
    .doc("prefs")
    .get();
  const selectedCourses: string[] = Array.isArray(
    (prefsSnap.data() as any)?.selectedCourses
  )
    ? ((prefsSnap.data() as any).selectedCourses as string[]).filter(
        (s) => typeof s === "string"
      )
    : [];

  const lessonsSnap = await db
    .collection("users")
    .doc(params.uid)
    .collection("profile")
    .doc("lessons")
    .get();
  const completedSlugs: string[] = Array.isArray(
    (lessonsSnap.data() as any)?.completedSlugs
  )
    ? ((lessonsSnap.data() as any).completedSlugs as string[]).filter(
        (s) => typeof s === "string"
      )
    : [];

  const courses: CourseProgress[] = selectedCourses.map((slug) => {
    const prefix = `ced:${slug}:`;
    const completed = completedSlugs.filter((s) => s.startsWith(prefix)).length;
    return { courseSlug: slug, completed };
  });

  // Activity data is gated: only the user themself or an accepted
  // follower can see the heatmap / recent list.
  const canSeeActivity = isSelf || isFollowing;
  let history: HistoryEntry[] = [];
  if (canSeeActivity) {
    const histSnap = await db
      .collection("users")
      .doc(params.uid)
      .collection("aiHistory")
      .limit(500)
      .get();
    history = histSnap.docs
      .map((d) => {
        const data = d.data() as any;
        const createdAt =
          typeof data.createdAt === "number"
            ? data.createdAt
            : typeof data.createdAt?.toMillis === "function"
            ? data.createdAt.toMillis()
            : 0;
        return { kind: data.kind, tokens: data.tokens, createdAt };
      })
      .filter((h) => h.createdAt > 0)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  return NextResponse.json({
    profile,
    isFollowing,
    isRequested,
    isSelf,
    canSeeActivity,
    courses,
    history,
  });
}
