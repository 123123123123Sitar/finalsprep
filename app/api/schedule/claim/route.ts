import { NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured, getAdminDb } from "@/lib/firebaseAdmin";
import { addToTokenBank } from "@/lib/tokenBank";
import { logEvent } from "@/lib/events";
import {
  claimReward,
  ymdLocal,
  qualifyingBlocks,
  blocksOnDay,
  lastBlockEndMin,
  MIN_BLOCK_MINUTES,
  ACTIVITY_COVERAGE_THRESHOLD,
  type StudyBlock,
} from "@/lib/schedule";
import { bumpStreak } from "@/lib/streaks";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && (!user || !user.emailVerified)) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }
  if (!user) {
    return NextResponse.json(
      { error: "Admin SDK not configured" },
      { status: 500 }
    );
  }

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json(
      { error: "Admin SDK not configured" },
      { status: 500 }
    );
  }

  const today = ymdLocal();
  const scheduleRef = db.doc(`users/${user.uid}/profile/schedule`);
  const pingsRef = db.doc(`users/${user.uid}/profile/activityPings_${today}`);
  const completionsRef = db.doc(
    `users/${user.uid}/profile/blockCompletions_${today}`
  );

  const [scheduleSnap, pingsSnap, completionsSnap] = await Promise.all([
    scheduleRef.get(),
    pingsRef.get(),
    completionsRef.get(),
  ]);

  if (!scheduleSnap.exists) {
    return NextResponse.json(
      { ok: false, reason: "no_schedule" },
      { status: 409 }
    );
  }
  const scheduleData = scheduleSnap.data() as any;
  if (scheduleData?.lastClaimDate === today) {
    return NextResponse.json(
      { ok: false, reason: "already_claimed_today" },
      { status: 409 }
    );
  }

  const blocks: StudyBlock[] = Array.isArray(scheduleData?.blocks)
    ? scheduleData.blocks
    : [];
  const now = new Date();
  const todayWd = now.getDay();
  const todaysBlocks = blocksOnDay(blocks, todayWd);

  // End-of-day gate: can't claim until the last scheduled block of today
  // has ended in the user's local timezone.
  const lastEnd = lastBlockEndMin(blocks, todayWd);
  const nowMin = now.getHours() * 60 + now.getMinutes();
  if (lastEnd !== null && nowMin < lastEnd) {
    return NextResponse.json(
      {
        ok: false,
        reason: "day_not_over",
        details: { lastEndMin: lastEnd, nowMin },
      },
      { status: 409 }
    );
  }

  const pingMinutes: number[] = pingsSnap.exists
    ? (pingsSnap.data() as any)?.minutes || []
    : [];
  const pingSet = new Set<number>(pingMinutes);

  const completedIds: string[] = completionsSnap.exists
    ? (completionsSnap.data() as any)?.completedBlockIds || []
    : [];
  const completedSet = new Set<string>(completedIds);

  const evaluated = qualifyingBlocks(todaysBlocks, completedSet, pingSet);
  const qualifying = evaluated.filter((e) => !e.reason);
  const qualifyingMinutes = qualifying.reduce(
    (sum, e) => sum + (e.block.endMin - e.block.startMin),
    0
  );

  if (qualifyingMinutes <= MIN_BLOCK_MINUTES) {
    return NextResponse.json(
      {
        ok: false,
        reason: "no_qualifying_blocks",
        details: {
          minBlockMinutes: MIN_BLOCK_MINUTES,
          coverageThreshold: ACTIVITY_COVERAGE_THRESHOLD,
          blocks: evaluated.map((e) => ({
            id: e.block.id,
            subject: e.block.subject,
            minutes: e.block.endMin - e.block.startMin,
            coverage: Math.round(e.coverage * 100) / 100,
            reason: e.reason,
          })),
        },
      },
      { status: 409 }
    );
  }

  // Scan today's AI usage so we can apply the focus bonus (which needs an
  // AI-tools-used signal) and the depletion bonus (scales with tokens spent).
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const startMs = startOfDay.getTime();
  let aiTokensUsedToday = 0;
  let usedAiTools = false;
  try {
    const aiSnap = await db
      .collection("users")
      .doc(user.uid)
      .collection("aiHistory")
      .where("createdAt", ">=", startMs)
      .get();
    for (const d of aiSnap.docs) {
      const data = d.data() as any;
      usedAiTools = true;
      if (typeof data?.tokens === "number") {
        aiTokensUsedToday += Math.max(0, data.tokens);
      }
    }
  } catch {}

  const reward = claimReward({
    minutes: qualifyingMinutes,
    usedAiTools,
    aiTokensUsedToday,
  });
  const credited = reward.amount;

  let claimed = false;
  let reason: string | undefined;
  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(scheduleRef);
      const data = (snap.exists ? snap.data() : {}) as any;
      if (data?.lastClaimDate === today) {
        reason = "already_claimed_today";
        return;
      }
      tx.set(
        scheduleRef,
        {
          lastClaimDate: today,
          totalClaims: (data?.totalClaims || 0) + 1,
          updatedAt: Date.now(),
        },
        { merge: true }
      );
      claimed = true;
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "claim failed" },
      { status: 500 }
    );
  }

  if (claimed) {
    await addToTokenBank(user.uid, credited, "schedule.claim");
    void bumpStreak(user.uid, qualifyingMinutes);
    void logEvent({
      kind: "chat.send",
      uid: user.uid,
      email: user.email,
      meta: {
        kind: "schedule.claim",
        tokens: credited,
        minutes: qualifyingMinutes,
        base: reward.base,
        perMinute: reward.perMinute,
        subtotal: reward.subtotal,
        focusBonus: reward.focusBonus,
        depletionBonus: reward.depletionBonus,
        usedAiTools,
        aiTokensUsedToday,
        qualifyingBlockIds: qualifying.map((q) => q.block.id).join(","),
        qualifyingBlockCount: qualifying.length,
      },
    });
    return NextResponse.json({
      ok: true,
      credited,
      minutes: qualifyingMinutes,
      base: reward.base,
      perMinute: reward.perMinute,
      subtotal: reward.subtotal,
      focusBonus: reward.focusBonus,
      depletionBonus: reward.depletionBonus,
      usedAiTools,
      aiTokensUsedToday,
      qualifyingBlockIds: qualifying.map((q) => q.block.id),
    });
  }

  return NextResponse.json(
    { ok: false, reason: reason || "not_claimed" },
    { status: 409 }
  );
}
