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
/**
 * A recurring weekly study block: "AP Java on Monday from 18:00 to 19:00."
 * Times are minutes-since-midnight in the user's local timezone.
 */
export type StudyBlock = {
  id: string;
  day: number;        // 0 Sun – 6 Sat
  startMin: number;   // 0–1439
  endMin: number;     // 0–1439, exclusive
  subject: string;    // e.g. "AP Java"
  color?: string;     // optional hex
};

export type Schedule = {
  days: number[];
  dailyGoalMinutes: number;
  lastClaimDate: string;
  totalClaims: number;
  blocks: StudyBlock[];
};

export const DEFAULT_SCHEDULE: Schedule = {
  days: [1, 2, 3, 4, 5], // weekdays (legacy)
  dailyGoalMinutes: 30,
  lastClaimDate: "",
  totalClaims: 0,
  blocks: [],
};

export const DAILY_CLAIM_TOKENS = 50;

/**
 * Token reward for a completed study session based on engagement.
 *
 *   - 1 token per minute of planned work
 *   - +25% bonus for sessions of 45 minutes or longer (deep-focus bonus)
 *   - hard cap at 150 tokens per day to keep abuse cheap
 */
export function engagementTokens(minutes: number): number {
  if (!Number.isFinite(minutes) || minutes <= 0) return 0;
  const capped = Math.min(minutes, 180);
  const base = Math.round(capped);
  const bonus = capped >= 45 ? Math.round(capped * 0.25) : 0;
  return Math.min(base + bonus, 150);
}

export function blocksOnDay(blocks: StudyBlock[], day: number): StudyBlock[] {
  return blocks
    .filter((b) => b.day === day)
    .sort((a, b) => a.startMin - b.startMin);
}

export function fmtTime(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const ap = h >= 12 ? "pm" : "am";
  const h12 = ((h + 11) % 12) + 1;
  return m === 0 ? `${h12}${ap}` : `${h12}:${String(m).padStart(2, "0")}${ap}`;
}

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
