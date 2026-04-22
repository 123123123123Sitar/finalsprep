import { getAdminDb } from "@/lib/firebaseAdmin";
import { ymdLocal } from "@/lib/schedule";

/**
 * A day counts toward the streak only if the user was actively engaged for
 * more than this many unique minutes. Each minute-of-day the user is active
 * (scheduled-block ping, chat message, lesson completion, practice submit)
 * contributes at most 1 unique minute to the day's set.
 */
export const STREAK_MIN_MINUTES = 30;

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}

/**
 * Server-side: record that the user was active at the current local minute
 * and, if they crossed the streak threshold for the day, bump their streak
 * doc. Safe to call repeatedly - the minute set dedupes and streak bumps
 * are idempotent within a day.
 */
export async function recordActivity(uid: string): Promise<void> {
  const db = getAdminDb();
  if (!db) return;

  const now = new Date();
  const date = ymdLocal(now);
  const minute = now.getHours() * 60 + now.getMinutes();

  const pingsRef = db.doc(`users/${uid}/profile/activityPings_${date}`);
  const streakRef = db.doc(`users/${uid}/profile/streak`);

  let activeMinuteCount = 0;
  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(pingsRef);
      const data = (snap.exists ? snap.data() : {}) as any;
      const existing: number[] = Array.isArray(data?.minutes) ? data.minutes : [];
      const set = new Set(existing);
      set.add(minute);
      const sorted = Array.from(set).sort((a, b) => a - b);
      activeMinuteCount = sorted.length;
      tx.set(
        pingsRef,
        { date, minutes: sorted.slice(-1440), lastPingAt: Date.now() },
        { merge: true }
      );
    });
  } catch {
    return;
  }

  if (activeMinuteCount <= STREAK_MIN_MINUTES) return;

  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(streakRef);
      const prev = (snap.exists ? snap.data() : {}) as Partial<{
        current: number;
        longest: number;
        lastActiveDate: string;
      }>;
      if (prev.lastActiveDate === date) return;

      let nextCurrent = 1;
      if (prev.lastActiveDate) {
        const gap = daysBetween(prev.lastActiveDate, date);
        if (gap === 1) nextCurrent = (prev.current || 0) + 1;
        else if (gap === 0) nextCurrent = prev.current || 1;
      }
      const nextLongest = Math.max(prev.longest || 0, nextCurrent);
      tx.set(
        streakRef,
        {
          current: nextCurrent,
          longest: nextLongest,
          lastActiveDate: date,
          updatedAt: Date.now(),
        },
        { merge: true }
      );
    });
  } catch {}
}
