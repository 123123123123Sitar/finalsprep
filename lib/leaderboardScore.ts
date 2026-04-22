/**
 * Weighted leaderboard score.
 *
 * Scoring philosophy (per user request): favor AI chat & tool use *slightly*
 * over passive lesson reading and pure problem solving. The idea is that the
 * product wants to reward engagement with the tutor (asking follow-up
 * questions, using the explain/interactives) as much or more than grinding
 * isolated problems.
 *
 * Weights per event, ranked:
 *   chat_message (sent to AI tutor)      : 3 points
 *   tool_use     (explain / interactive) : 3 points
 *   problem_solve (practice correct)     : 2 points
 *   lesson_complete (unit read / claim)  : 2 points
 *   streak_day_bonus (per current-streak day, capped) : 1 point × min(streak, 30)
 *
 * Points are accumulated on `publicProfiles/{uid}.stats.points` and per-course
 * on `leaderboardStats/{courseSlug::uid}.points`. The leaderboard orders by
 * `points` desc and falls back to `problems` desc for backwards compat.
 */
export type ScoreEvent =
  | "chat_message"
  | "tool_use"
  | "problem_solve"
  | "lesson_complete";

export const POINTS_PER_EVENT: Record<ScoreEvent, number> = {
  chat_message: 3,
  tool_use: 3,
  problem_solve: 2,
  lesson_complete: 2,
};

export const STREAK_POINT_CAP = 30;

/** Bonus points awarded for maintaining a current streak. */
export function streakBonusPoints(currentStreak: number): number {
  return Math.min(Math.max(currentStreak || 0, 0), STREAK_POINT_CAP);
}

export function pointsFor(event: ScoreEvent): number {
  return POINTS_PER_EVENT[event] || 0;
}
