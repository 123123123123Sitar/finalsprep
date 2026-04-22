import { NextResponse } from "next/server";
import {
  adminDbOrThrow,
  getProfilesByUids,
} from "@/lib/socialAdmin";
import { streakBonusPoints } from "@/lib/leaderboardScore";
import type { LeaderboardEntry } from "@/lib/social";

export const runtime = "nodejs";

/**
 * GET /api/leaderboards?course=ap-calc-bc&limit=50
 * GET /api/leaderboards?course=overall&limit=50
 *
 * Returns top-N users ranked by weighted points (see lib/leaderboardScore.ts).
 * When `course=overall`, points are summed per-user across every course doc
 * in leaderboardStats. Public endpoint.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const course = (searchParams.get("course") || "").trim();
  const limit = Math.min(
    Math.max(parseInt(searchParams.get("limit") || "50", 10), 10),
    100
  );
  if (!course) {
    return NextResponse.json({ error: "Missing course" }, { status: 400 });
  }

  let db;
  try {
    db = adminDbOrThrow();
  } catch {
    return NextResponse.json({ entries: [], total: 0 });
  }

  if (course === "overall") {
    return overallLeaderboard(db, limit);
  }

  // Pull a larger window so the streak-bonus re-ranking is stable on a page
  // of 50; an in-memory sort on (points + streakBonus) is cheaper than
  // denormalizing streak onto every leaderboardStats doc.
  const snap = await db
    .collection("leaderboardStats")
    .where("courseSlug", "==", course)
    .limit(limit * 2)
    .get();

  const rows = snap.docs.map((d) => d.data() as any);
  const uids = rows.map((r) => r.uid).filter(Boolean);
  const profiles = await getProfilesByUids(db, uids);

  const withScore = rows.map((r) => {
    const p = profiles.get(r.uid);
    const streak = p?.stats.currentStreak || 0;
    const base = r.points || 0;
    const bonus = streakBonusPoints(streak);
    return {
      row: r,
      profile: p,
      totalPoints: base + bonus,
      streak,
    };
  });

  withScore.sort((a, b) => b.totalPoints - a.totalPoints);

  const entries: LeaderboardEntry[] = withScore.slice(0, limit).map((s, i) => {
    const r = s.row;
    const p = s.profile;
    return {
      uid: r.uid,
      username: p?.username || "user",
      displayName: p?.displayName || p?.username || "user",
      problems: r.problems || 0,
      chatMessages: r.chatMessages || 0,
      toolUses: r.toolUses || 0,
      lessonsCompleted: r.lessonsCompleted || 0,
      points: s.totalPoints,
      streak: s.streak,
      accuracy: 0,
      rank: i + 1,
      avatarEmoji: p?.avatarEmoji ?? null,
      avatarColor: p?.avatarColor ?? null,
    };
  });

  return NextResponse.json({ entries, total: entries.length });
}

/**
 * Aggregate every leaderboardStats doc by uid, adding per-user totals across
 * all courses. Then apply the same streak bonus used for per-course boards.
 * Bounded by a read cap so big installs don't pull the whole collection.
 */
async function overallLeaderboard(
  db: FirebaseFirestore.Firestore,
  limit: number
) {
  const READ_CAP = 2000;
  const snap = await db
    .collection("leaderboardStats")
    .limit(READ_CAP)
    .get();

  type Acc = {
    uid: string;
    problems: number;
    chatMessages: number;
    toolUses: number;
    lessonsCompleted: number;
    points: number;
  };
  const byUid = new Map<string, Acc>();
  for (const d of snap.docs) {
    const r = d.data() as any;
    if (!r?.uid) continue;
    const cur = byUid.get(r.uid) || {
      uid: r.uid,
      problems: 0,
      chatMessages: 0,
      toolUses: 0,
      lessonsCompleted: 0,
      points: 0,
    };
    cur.problems += r.problems || 0;
    cur.chatMessages += r.chatMessages || 0;
    cur.toolUses += r.toolUses || 0;
    cur.lessonsCompleted += r.lessonsCompleted || 0;
    cur.points += r.points || 0;
    byUid.set(r.uid, cur);
  }

  const rows = Array.from(byUid.values());
  const uids = rows.map((r) => r.uid);
  const profiles = await getProfilesByUids(db, uids);

  const withScore = rows.map((r) => {
    const p = profiles.get(r.uid);
    const streak = p?.stats.currentStreak || 0;
    const bonus = streakBonusPoints(streak);
    return {
      row: r,
      profile: p,
      totalPoints: r.points + bonus,
      streak,
    };
  });
  withScore.sort((a, b) => b.totalPoints - a.totalPoints);

  const entries: LeaderboardEntry[] = withScore.slice(0, limit).map((s, i) => {
    const r = s.row;
    const p = s.profile;
    return {
      uid: r.uid,
      username: p?.username || "user",
      displayName: p?.displayName || p?.username || "user",
      problems: r.problems,
      chatMessages: r.chatMessages,
      toolUses: r.toolUses,
      lessonsCompleted: r.lessonsCompleted,
      points: s.totalPoints,
      streak: s.streak,
      accuracy: 0,
      rank: i + 1,
      avatarEmoji: p?.avatarEmoji ?? null,
      avatarColor: p?.avatarColor ?? null,
    };
  });

  return NextResponse.json({ entries, total: entries.length });
}
