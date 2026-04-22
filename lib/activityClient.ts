"use client";

/**
 * Browser-side: tell the server the user just did something that counts as
 * active studying (completed a lesson, submitted a practice problem). The
 * server dedupes pings by minute-of-day and bumps the streak once the user
 * crosses the daily threshold.
 */
export async function recordActivityClient(
  getIdToken: () => Promise<string | null>
): Promise<void> {
  try {
    const token = await getIdToken();
    if (!token) return;
    await fetch("/api/activity/record", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {}
}
