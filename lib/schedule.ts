/**
 * Study schedule + daily claim. The user sets which days they want to
 * study (and an optional minute goal per day); claiming "I finished
 * today's session" credits bonus tokens to their token bank, capped at
 * 50 tokens per calendar day to keep abuse cheap.
 *
 * Stored at users/{uid}/profile/schedule = {
 *   days: number[],          // weekday numbers 0 (Sun) – 6 (Sat)
 *   dailyGoalMinutes: number,
 *   lastClaimDate: string,   // YYYY-MM-DD (local)
 *   totalClaims: number,
 *   updatedAt: number,
 * }
 */
export type Schedule = {
  days: number[];
  dailyGoalMinutes: number;
  lastClaimDate: string;
  totalClaims: number;
};

export const DEFAULT_SCHEDULE: Schedule = {
  days: [1, 2, 3, 4, 5], // weekdays
  dailyGoalMinutes: 30,
  lastClaimDate: "",
  totalClaims: 0,
};

export const DAILY_CLAIM_TOKENS = 50;

export function ymdLocal(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isScheduledToday(days: number[], now: Date = new Date()): boolean {
  const weekday = now.getDay();
  return days.includes(weekday);
}

export const WEEKDAYS: Array<{ n: number; short: string }> = [
  { n: 0, short: "Sun" },
  { n: 1, short: "Mon" },
  { n: 2, short: "Tue" },
  { n: 3, short: "Wed" },
  { n: 4, short: "Thu" },
  { n: 5, short: "Fri" },
  { n: 6, short: "Sat" },
];
