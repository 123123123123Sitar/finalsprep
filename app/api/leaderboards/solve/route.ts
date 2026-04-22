import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  adminDbOrThrow,
  ensurePublicProfile,
  postActivity,
  recordScoreEvent,
} from "@/lib/socialAdmin";
import type { ScoreEvent } from "@/lib/leaderboardScore";

export const runtime = "nodejs";

const VALID_EVENTS: ScoreEvent[] = [
  "problem_solve",
  "chat_message",
  "tool_use",
  "lesson_complete",
];

/**
 * POST /api/leaderboards/solve
 * Body: { courseSlug, event?, unitNumber?, lessonTitle? }
 *
 * `event` defaults to "problem_solve" for back-compat with the practice
 * page. See lib/leaderboardScore.ts for the weighted scoring formula.
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

  const courseSlug = (body?.courseSlug || "").toString().trim();
  const rawEvent = (body?.event || "problem_solve").toString();
  const event = (VALID_EVENTS.includes(rawEvent as ScoreEvent)
    ? (rawEvent as ScoreEvent)
    : "problem_solve") as ScoreEvent;
  const unitNumber =
    typeof body?.unitNumber === "number" ? body.unitNumber : undefined;
  const lessonTitle = (body?.lessonTitle || "").toString().slice(0, 120);
  if (!courseSlug) {
    return NextResponse.json({ error: "Missing courseSlug" }, { status: 400 });
  }

  const db = adminDbOrThrow();
  const profile = await ensurePublicProfile(db, user.uid, user.email);

  await recordScoreEvent(db, user.uid, courseSlug, event);

  // Problem-solve milestones still post to the feed every 10 solves.
  if (event === "problem_solve") {
    const statSnap = await db
      .collection("leaderboardStats")
      .doc(`${courseSlug}::${user.uid}`)
      .get();
    const newCount = (statSnap.data() as any)?.problems || 1;

    if (newCount % 10 === 0) {
      await postActivity(db, {
        uid: user.uid,
        username: profile.username,
        displayName: profile.displayName,
        kind: "mastered_unit",
        course: courseSlug,
        unit: unitNumber,
        content: `hit ${newCount} problems solved in ${courseSlug}${
          lessonTitle ? ` — latest: ${lessonTitle}` : ""
        }`,
      });
    }
  }

  return NextResponse.json({ ok: true, event });
}
