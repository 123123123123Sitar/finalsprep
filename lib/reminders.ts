import type { AdminDb } from "@/lib/socialAdmin";
import { writeNotification } from "@/lib/socialAdmin";
import { ymdLocal } from "@/lib/schedule";
import { STREAK_MIN_MINUTES } from "@/lib/activity";
import { getPlan } from "@/lib/userPlan";

/**
 * Reminders live in the same `notifications` collection as follow / DM
 * notifications, under `kind: "system"`. Each evaluation is guarded by a
 * marker doc at `users/{uid}/reminders/{kind}_{YYYY-MM-DD}` so we never
 * send the same reminder twice on the same local day. The one-shot
 * `welcome` kind uses a date-less marker so it fires exactly once per
 * account.
 *
 * Kinds evaluated on each call to /api/notifications:
 *   - welcome          : one-time greeting for an account that has never
 *                        been active. Suppresses the "come_back" path so
 *                        a brand-new user isn't told they've been gone.
 *   - streak_at_risk   : user has a streak >=2, kept it yesterday, but has
 *                        <30 active minutes today and it's already past
 *                        mid-afternoon local.
 *   - review_reminder  : user has saved review problems but hasn't opened
 *                        the review surface in 3+ days.
 *   - come_back        : user has logged at least one prior active day and
 *                        has zero active minutes in the last 48 hours.
 *   - ap_discount      : learner-plan users get a daily nudge about the
 *                        active SCORE5 AP discount on Pro / Hacker.
 */

const REMINDER_AFTER_HOUR_LOCAL = 15;

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}

function yesterday(today: string): string {
  const [y, m, d] = today.split("-").map(Number);
  const dt = new Date(y, m - 1, d - 1);
  const yy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

async function alreadySentToday(
  db: AdminDb,
  uid: string,
  kind: string,
  today: string
): Promise<boolean> {
  const ref = db.doc(`users/${uid}/reminders/${kind}_${today}`);
  const snap = await ref.get();
  return snap.exists;
}

async function markSent(
  db: AdminDb,
  uid: string,
  kind: string,
  today: string
): Promise<void> {
  const ref = db.doc(`users/${uid}/reminders/${kind}_${today}`);
  await ref.set({ sentAt: Date.now() });
}

async function alreadySentEver(
  db: AdminDb,
  uid: string,
  kind: string
): Promise<boolean> {
  const ref = db.doc(`users/${uid}/reminders/${kind}`);
  const snap = await ref.get();
  return snap.exists;
}

async function markSentEver(
  db: AdminDb,
  uid: string,
  kind: string
): Promise<void> {
  const ref = db.doc(`users/${uid}/reminders/${kind}`);
  await ref.set({ sentAt: Date.now() });
}

async function countActivityMinutes(
  db: AdminDb,
  uid: string,
  date: string
): Promise<number> {
  const snap = await db
    .doc(`users/${uid}/profile/activityPings_${date}`)
    .get();
  if (!snap.exists) return 0;
  const data = snap.data() as any;
  return Array.isArray(data?.minutes) ? data.minutes.length : 0;
}

export async function evaluateReminders(
  db: AdminDb,
  uid: string
): Promise<void> {
  const now = new Date();
  const today = ymdLocal(now);
  const hour = now.getHours();

  const streakSnap = await db.doc(`users/${uid}/profile/streak`).get();
  const streak = streakSnap.exists ? (streakSnap.data() as any) : null;
  const currentStreak: number =
    typeof streak?.current === "number" ? streak.current : 0;
  const lastActiveDate: string =
    typeof streak?.lastActiveDate === "string" ? streak.lastActiveDate : "";

  const activeToday = await countActivityMinutes(db, uid, today);

  if (
    currentStreak >= 2 &&
    lastActiveDate === yesterday(today) &&
    activeToday <= STREAK_MIN_MINUTES &&
    hour >= REMINDER_AFTER_HOUR_LOCAL
  ) {
    if (!(await alreadySentToday(db, uid, "streak_at_risk", today))) {
      await writeNotification(db, uid, {
        kind: "system",
        text: `Your ${currentStreak}-day streak ends at midnight. Study for ${STREAK_MIN_MINUTES}+ minutes today to keep it alive.`,
        link: "/schedule",
      });
      await markSent(db, uid, "streak_at_risk", today);
    }
  }

  const activeYesterday = await countActivityMinutes(
    db,
    uid,
    yesterday(today)
  );

  // A user counts as "ever active" if they've logged a streak day OR if
  // we've recorded any activity yesterday/today. This is what gates the
  // "come_back" reminder — without it, brand-new accounts get told they've
  // been gone before they've even started.
  const hasEverBeenActive =
    !!lastActiveDate || activeToday > 0 || activeYesterday > 0;

  if (!hasEverBeenActive) {
    if (!(await alreadySentEver(db, uid, "welcome"))) {
      await writeNotification(db, uid, {
        kind: "system",
        text: "Welcome to FinalsPrep! Pick your AP courses, then open a unit to get started.",
        link: "/study",
      });
      await markSentEver(db, uid, "welcome");
    }
  } else if (activeToday === 0 && activeYesterday === 0 && hour >= 12) {
    if (!(await alreadySentToday(db, uid, "come_back", today))) {
      await writeNotification(db, uid, {
        kind: "system",
        text: "It's been a couple of days. Jump into a lesson or practice set to keep exam prep on track.",
        link: "/study",
      });
      await markSent(db, uid, "come_back", today);
    }
  }

  const userPlan = await getPlan(uid);
  if (userPlan.plan === "learner") {
    if (!(await alreadySentToday(db, uid, "ap_discount", today))) {
      await writeNotification(db, uid, {
        kind: "system",
        text: "AP Cram Time discount: $5 off your first month of Pro or Hacker with code SCORE5.",
        link: "/#price",
      });
      await markSent(db, uid, "ap_discount", today);
    }
  }

  const wrongSnap = await db
    .collection(`users/${uid}/wrongBank`)
    .limit(1)
    .get();
  if (!wrongSnap.empty) {
    const reviewVisitSnap = await db
      .doc(`users/${uid}/profile/reviewVisits`)
      .get();
    const lastReviewVisit: string =
      reviewVisitSnap.exists
        ? (reviewVisitSnap.data() as any)?.lastVisitDate || ""
        : "";
    const daysSinceReview = lastReviewVisit
      ? daysBetween(lastReviewVisit, today)
      : 999;
    if (daysSinceReview >= 3) {
      if (!(await alreadySentToday(db, uid, "review_reminder", today))) {
        await writeNotification(db, uid, {
          kind: "system",
          text: "You have saved review problems waiting. Spaced repetition works best when you return in a day or two.",
          link: "/insights?tab=review",
        });
        await markSent(db, uid, "review_reminder", today);
      }
    }
  }
}
