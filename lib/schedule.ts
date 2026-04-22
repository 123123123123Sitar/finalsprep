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

/** Minimum duration for a block to qualify toward bonus tokens. */
export const MIN_BLOCK_MINUTES = 30;

/** Fraction of a block's minutes that must be covered by activity pings. */
export const ACTIVITY_COVERAGE_THRESHOLD = 0.7;

export type ActivityPings = {
  date: string;      // YYYY-MM-DD (local)
  minutes: number[]; // sorted unique minute-of-day indices
  lastPingAt: number;
};

export type BlockCompletions = {
  date: string;
  completedBlockIds: string[];
};

/**
 * A block qualifies for reward if:
 *   (1) its duration is strictly greater than MIN_BLOCK_MINUTES, AND
 *   (2) the user marked it completed today, AND
 *   (3) at least ACTIVITY_COVERAGE_THRESHOLD of its minute-of-day slots
 *       are present in today's activity ping set.
 */
export function qualifyingBlocks(
  blocks: StudyBlock[],
  completedIds: Set<string>,
  pingSet: Set<number>
): { block: StudyBlock; coverage: number; reason?: string }[] {
  return blocks.map((b) => {
    const mins = b.endMin - b.startMin;
    if (mins <= MIN_BLOCK_MINUTES) {
      return { block: b, coverage: 0, reason: "too_short" };
    }
    if (!completedIds.has(b.id)) {
      return { block: b, coverage: 0, reason: "not_completed" };
    }
    let hits = 0;
    for (let m = b.startMin; m < b.endMin; m++) {
      if (pingSet.has(m)) hits += 1;
    }
    const coverage = mins > 0 ? hits / mins : 0;
    if (coverage < ACTIVITY_COVERAGE_THRESHOLD) {
      return { block: b, coverage, reason: "insufficient_activity" };
    }
    return { block: b, coverage };
  });
}

export const DEFAULT_SCHEDULE: Schedule = {
  days: [1, 2, 3, 4, 5], // weekdays (legacy)
  dailyGoalMinutes: 30,
  lastClaimDate: "",
  totalClaims: 0,
  blocks: [],
};

export const DAILY_CLAIM_TOKENS = 50;

/** Flat participation award for claiming a qualifying day. */
export const BASE_CLAIM_TOKENS = 50;
/** Minutes before per-minute tokens start accumulating. */
export const PER_MINUTE_START = 60;
/** Minute threshold for the focus bonus. */
export const FOCUS_BONUS_MINUTES = 60;
/** Focus bonus when above threshold without AI use. */
export const FOCUS_BONUS_NO_AI = 0.1;
/** Focus bonus when above threshold AND the user used AI tools today. */
export const FOCUS_BONUS_WITH_AI = 0.2;
/** Daily AI-token usage at which the depletion bonus maxes out. */
export const DEPLETION_FULL_USE = 2000;
/** Max depletion multiplier (e.g. 0.25 → up to +25%). */
export const DEPLETION_MAX_BONUS = 0.25;
/** Hard ceiling on a single claim regardless of inputs. */
export const MAX_CLAIM_TOKENS = 300;

/**
 * Token reward for a claim.
 *
 *   subtotal = BASE_CLAIM_TOKENS + max(0, minutes - PER_MINUTE_START)
 *   focus    = 1 + (usedAi && minutes > 60 ? 0.20 : minutes > 60 ? 0.10 : 0)
 *   deplete  = 1 + min(aiTokensUsedToday / DEPLETION_FULL_USE, 1) * 0.25
 *   amount   = min(round(subtotal * focus * deplete), MAX_CLAIM_TOKENS)
 *
 * Examples (minutes = 75, usedAi = true):
 *   aiTokensUsed    0 →  (50 + 15) * 1.20 * 1.00 → 78
 *   aiTokensUsed 1000 →  (50 + 15) * 1.20 * 1.125 → 88
 *   aiTokensUsed 2000 →  (50 + 15) * 1.20 * 1.25 → 98
 *
 * Minutes = 180, usedAi = true, aiTokensUsed = 2000:
 *   (50 + 120) * 1.20 * 1.25 → 255
 */
export function claimReward(params: {
  minutes: number;
  usedAiTools: boolean;
  aiTokensUsedToday: number;
}): {
  amount: number;
  base: number;
  perMinute: number;
  subtotal: number;
  focusBonus: number;
  depletionBonus: number;
} {
  const minutes = Math.max(0, Math.floor(params.minutes || 0));
  const perMinute = Math.max(0, minutes - PER_MINUTE_START);
  const subtotal = BASE_CLAIM_TOKENS + perMinute;

  let focusBonus = 0;
  if (minutes > FOCUS_BONUS_MINUTES) {
    focusBonus = params.usedAiTools ? FOCUS_BONUS_WITH_AI : FOCUS_BONUS_NO_AI;
  }

  const use = Math.max(0, params.aiTokensUsedToday || 0);
  const depletionBonus =
    Math.min(1, use / DEPLETION_FULL_USE) * DEPLETION_MAX_BONUS;

  const amount = Math.min(
    Math.round(subtotal * (1 + focusBonus) * (1 + depletionBonus)),
    MAX_CLAIM_TOKENS
  );

  return {
    amount,
    base: BASE_CLAIM_TOKENS,
    perMinute,
    subtotal,
    focusBonus,
    depletionBonus,
  };
}

/**
 * Returns the minute-of-day at which the last scheduled block of `day`
 * ends, or null if nothing is scheduled that day. Claims are gated until
 * this moment so the user has actually finished all planned sessions.
 */
export function lastBlockEndMin(
  blocks: StudyBlock[],
  day: number
): number | null {
  const today = blocksOnDay(blocks, day);
  if (today.length === 0) return null;
  return today.reduce((max, b) => (b.endMin > max ? b.endMin : max), 0);
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
