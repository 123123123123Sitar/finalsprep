import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase";

export type StreakDoc = {
  current: number;
  longest: number;
  lastActiveDate: string; // YYYY-MM-DD in local time
};

function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBetween(a: string, b: string): number {
  // Difference in days between two YYYY-MM-DD strings (b - a).
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}

/** Fetch the current streak doc for a uid, or null if not set yet. */
export async function getStreak(uid: string): Promise<StreakDoc | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, "users", uid, "profile", "streak"));
    if (!snap.exists()) return null;
    const d = snap.data() as Partial<StreakDoc>;
    return {
      current: typeof d.current === "number" ? d.current : 0,
      longest: typeof d.longest === "number" ? d.longest : 0,
      lastActiveDate: typeof d.lastActiveDate === "string" ? d.lastActiveDate : "",
    };
  } catch {
    return null;
  }
}

/**
 * Bump the streak for the current date. This is now only called when a user
 * completes active studying during their scheduled study blocks and claims
 * tokens. The minutes parameter ensures they studied for at least 10 minutes
 * of active engagement.
 * 
 * Requirements for streak bump:
 * - User must have scheduled study block for the day
 * - User must have completed at least 10 minutes of active studying
 *   (reading lessons, using interactives, or AI)
 * - Idempotent within a single day.
 */
export async function bumpStreak(
  uid: string,
  minutes: number = 0
): Promise<StreakDoc | null> {
  const db = getDb();
  if (!db) return null;
  
  // Only bump if they actively studied for at least 10 minutes
  if (minutes < 10) return null;
  
  const today = ymd(new Date());
  try {
    const ref = doc(db, "users", uid, "profile", "streak");
    const snap = await getDoc(ref);
    const prev: StreakDoc = snap.exists()
      ? (snap.data() as StreakDoc)
      : { current: 0, longest: 0, lastActiveDate: "" };

    if (prev.lastActiveDate === today) return prev; // already bumped today

    let nextCurrent = 1;
    if (prev.lastActiveDate) {
      const gap = daysBetween(prev.lastActiveDate, today);
      if (gap === 1) nextCurrent = prev.current + 1;
      else if (gap === 0) nextCurrent = prev.current || 1;
      // gap > 1 → reset to 1
    }
    const nextLongest = Math.max(prev.longest || 0, nextCurrent);
    const next: StreakDoc = {
      current: nextCurrent,
      longest: nextLongest,
      lastActiveDate: today,
    };
    await setDoc(
      ref,
      { ...next, updatedAt: serverTimestamp() },
      { merge: true }
    );
    return next;
  } catch {
    return null;
  }
}
