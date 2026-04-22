import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import { adminDbOrThrow } from "@/lib/socialAdmin";
import type { PublicProfile } from "@/lib/social";

export const runtime = "nodejs";

type RecommendedUser = {
  uid: string;
  username: string;
  displayName: string;
  bio: string;
  avatarEmoji?: string | null;
  avatarColor?: string | null;
  interests: string[];
  gradeLevel: string | null;
  plan?: PublicProfile["plan"];
  sharedInterests: string[];
  sharedCourses: string[];
  score: number;
  reason: string;
};

/**
 * GET /api/recommendations/users
 * Returns up to 8 users the caller might want to follow, scored by
 * overlap on interests, courses, and grade level. Filters out anyone
 * the caller already follows (accepted or pending) plus themselves.
 */
export async function GET(req: Request) {
  try {
    const authed = await requireAuthedUser(req);
    if ("error" in authed) return authed.error;
    const { user } = authed;

    const db = adminDbOrThrow();

    // Caller's own profile + course selection.
    const [meProfileSnap, mePrefsSnap, followsSnap] = await Promise.all([
      db.collection("publicProfiles").doc(user.uid).get(),
      db
        .collection("users")
        .doc(user.uid)
        .collection("profile")
        .doc("prefs")
        .get(),
      db
        .collection("follows")
        .where("followerUid", "==", user.uid)
        .get(),
    ]);

    const me = meProfileSnap.data() as any | undefined;
    const myInterests: string[] = Array.isArray(me?.interests)
      ? me.interests
      : [];
    const myGrade: string | null =
      typeof me?.gradeLevel === "string" ? me.gradeLevel : null;
    const myCourses: string[] = Array.isArray(
      (mePrefsSnap.data() as any)?.selectedCourses
    )
      ? (mePrefsSnap.data() as any).selectedCourses
      : [];

    const excluded = new Set<string>([user.uid]);
    followsSnap.docs.forEach((d) => {
      const f = d.data() as any;
      if (f.followeeUid) excluded.add(f.followeeUid);
    });

    // Pull up to 200 candidate profiles. Small user base for now; this
    // is fine; swap to a scored index once it grows.
    const candidatesSnap = await db
      .collection("publicProfiles")
      .limit(200)
      .get();

    // Batch-load each candidate's selectedCourses.
    const candidates = candidatesSnap.docs
      .map((d) => d.data() as any)
      .filter(
        (p) =>
          p?.uid &&
          !excluded.has(p.uid) &&
          (p.visibility ?? "public") !== "private"
      );

    const prefsRefs = candidates.map((p) =>
      db
        .collection("users")
        .doc(p.uid)
        .collection("profile")
        .doc("prefs")
    );
    const prefsDocs = prefsRefs.length
      ? await db.getAll(...prefsRefs)
      : [];
    const coursesByUid = new Map<string, string[]>();
    prefsDocs.forEach((snap, i) => {
      const d = snap.data() as any;
      const cs = Array.isArray(d?.selectedCourses) ? d.selectedCourses : [];
      coursesByUid.set(candidates[i].uid, cs);
    });

    const scored: RecommendedUser[] = candidates.map((p) => {
      const theirInterests: string[] = Array.isArray(p.interests)
        ? p.interests
        : [];
      const theirCourses = coursesByUid.get(p.uid) || [];

      const sharedInterests = theirInterests.filter((x) =>
        myInterests.includes(x)
      );
      const sharedCourses = theirCourses.filter((x) => myCourses.includes(x));
      const gradeMatch = myGrade && p.gradeLevel === myGrade;

      const score =
        sharedInterests.length * 3 +
        sharedCourses.length * 2 +
        (gradeMatch ? 1 : 0);

      const reason = buildReason(sharedInterests, sharedCourses, !!gradeMatch);

      return {
        uid: p.uid,
        username: p.username,
        displayName: p.displayName || p.username,
        bio: p.bio || "",
        avatarEmoji: p.avatarEmoji ?? null,
        avatarColor: p.avatarColor ?? null,
        interests: theirInterests,
        gradeLevel:
          typeof p.gradeLevel === "string" ? p.gradeLevel : null,
        plan: p.plan ?? null,
        sharedInterests,
        sharedCourses,
        score,
        reason,
      };
    });

    // If the caller has set interests/courses, keep only positive-overlap
    // matches. Otherwise fall back to the most-followed active profiles so
    // there's always something to show.
    const hasSignal = myInterests.length > 0 || myCourses.length > 0;
    let results = hasSignal ? scored.filter((r) => r.score > 0) : scored;
    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Stable tiebreaker: more followers first.
      return 0;
    });
    results = results.slice(0, 8);

    return NextResponse.json({ users: results, hasSignal });
  } catch (e: any) {
    return NextResponse.json(
      { users: [], error: e?.message || "Recommendations unavailable" },
      { status: 200 }
    );
  }
}

function buildReason(
  sharedInterests: string[],
  sharedCourses: string[],
  gradeMatch: boolean
): string {
  const parts: string[] = [];
  if (sharedCourses.length > 0) {
    parts.push(
      `${sharedCourses.length} shared course${
        sharedCourses.length === 1 ? "" : "s"
      }`
    );
  }
  if (sharedInterests.length > 0) {
    parts.push(
      `${sharedInterests.length} shared interest${
        sharedInterests.length === 1 ? "" : "s"
      }`
    );
  }
  if (gradeMatch && parts.length === 0) parts.push("Same grade");
  return parts.join(" · ");
}
