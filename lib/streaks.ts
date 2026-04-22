import { doc, getDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";

export type StreakDoc = {
  current: number;
  longest: number;
  lastActiveDate: string; // YYYY-MM-DD in local time
};

/**
 * Streak bumps happen server-side in `lib/activity.ts` whenever unique
 * active-minute pings for the day cross the threshold (currently >30 min).
 * This module is now read-only.
 */
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
