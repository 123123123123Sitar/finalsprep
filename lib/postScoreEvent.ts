"use client";
/**
 * Client-side helper for posting a weighted leaderboard event.
 * Fire-and-forget — failures are logged and swallowed so we never
 * interfere with the user-facing flow.
 */
import type { ScoreEvent } from "@/lib/leaderboardScore";

export async function postScoreEvent(
  getIdToken: () => Promise<string | null>,
  courseSlug: string | null | undefined,
  event: ScoreEvent,
  extras?: { unitNumber?: number; lessonTitle?: string }
): Promise<void> {
  try {
    const slug = (courseSlug || "general").toString();
    const token = await getIdToken();
    if (!token) return;
    await fetch("/api/leaderboards/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        courseSlug: slug,
        event,
        ...(extras?.unitNumber !== undefined
          ? { unitNumber: extras.unitNumber }
          : {}),
        ...(extras?.lessonTitle ? { lessonTitle: extras.lessonTitle } : {}),
      }),
      keepalive: true,
    });
  } catch {
    // Swallow — scoring must never interrupt the main flow.
  }
}
