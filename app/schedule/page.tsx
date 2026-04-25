"use client";
import { useEffect, useState, useRef } from "react";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";
import PageLoader from "@/app/components/PageLoader";
import {
  DEFAULT_SCHEDULE,
  WEEKDAYS,
  MIN_BLOCK_MINUTES,
  ACTIVITY_COVERAGE_THRESHOLD,
  MAX_CLAIM_TOKENS,
  blocksOnDay,
  claimReward,
  lastBlockEndMin,
  fmtTime,
  ymdLocal,
  type Schedule,
  type StudyBlock,
} from "@/lib/schedule";
import { COURSES } from "@/lib/topics";
import { subscribeSelectedCourses } from "@/lib/selectedCourses";

export default function SchedulePage() {
  const { user, loading, getIdToken } = useAuth();
  const [schedule, setSchedule] = useState<Schedule>(DEFAULT_SCHEDULE);
  const [bankBalance, setBankBalance] = useState<number>(0);
  const [claiming, setClaiming] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [celebrate, setCelebrate] = useState<{
    open: boolean;
    tokens: number;
    minutes: number;
    base?: number;
    perMinute?: number;
    subtotal?: number;
    focusBonus?: number;
    depletionBonus?: number;
    usedAiTools?: boolean;
    aiTokensUsedToday?: number;
  }>({
    open: false,
    tokens: 0,
    minutes: 0,
  });
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [pingMinutes, setPingMinutes] = useState<Set<number>>(new Set());
  const [newBlock, setNewBlock] = useState<{
    day: number;
    subject: string;
    start: string;
    end: string;
  }>({ day: new Date().getDay(), subject: "", start: "18:00", end: "19:00" });
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  type PlanBlock = {
    day: number;
    startMin: number;
    endMin: number;
    subject: string;
    focus?: string;
  };
  const [planLoading, setPlanLoading] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const [planPreview, setPlanPreview] = useState<{
    rationale: string;
    blocks: PlanBlock[];
  } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/signin?next=/schedule";
    }
  }, [loading, user]);

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;

    // Initial load of schedule
    (async () => {
      const snap = await getDoc(
        doc(db, "users", user.uid, "profile", "schedule")
      );
      if (snap.exists()) {
        const d = snap.data() as any;
        setSchedule({
          days: Array.isArray(d.days) ? d.days : DEFAULT_SCHEDULE.days,
          dailyGoalMinutes:
            typeof d.dailyGoalMinutes === "number"
              ? d.dailyGoalMinutes
              : DEFAULT_SCHEDULE.dailyGoalMinutes,
          lastClaimDate: d.lastClaimDate || "",
          totalClaims: d.totalClaims || 0,
          blocks: Array.isArray(d.blocks) ? (d.blocks as StudyBlock[]) : [],
        });
      }
    })();

    // Subscribe to token bank and claim updates
    const unsub = onSnapshot(
      doc(db, "users", user.uid, "profile", "tokenBank"),
      (snap) => {
        const d = snap.data() as any;
        setBankBalance(typeof d?.balance === "number" ? d.balance : 0);
      }
    );
    const unsub2 = onSnapshot(
      doc(db, "users", user.uid, "profile", "schedule"),
      (snap) => {
        const d = snap.data() as any;
        if (!d) return;
        setSchedule((s) => ({
          ...s,
          lastClaimDate: d.lastClaimDate || "",
          totalClaims: d.totalClaims || 0,
        }));
      }
    );

    return () => {
      unsub();
      unsub2();
    };
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    const unsub = subscribeSelectedCourses(db, user.uid, setSelectedCourses);
    return () => unsub();
  }, [user]);

  // Subscribe to today's completions + activity pings so UI updates live
  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    const today = ymdLocal();
    const unsubDone = onSnapshot(
      doc(db, "users", user.uid, "profile", `blockCompletions_${today}`),
      (snap) => {
        const d = snap.data() as any;
        const ids: string[] = Array.isArray(d?.completedBlockIds)
          ? d.completedBlockIds
          : [];
        setCompletedIds(new Set(ids));
      }
    );
    const unsubPings = onSnapshot(
      doc(db, "users", user.uid, "profile", `activityPings_${today}`),
      (snap) => {
        const d = snap.data() as any;
        const mins: number[] = Array.isArray(d?.minutes) ? d.minutes : [];
        setPingMinutes(new Set(mins));
      }
    );
    return () => {
      unsubDone();
      unsubPings();
    };
  }, [user]);

  // Activity ping loop: ping every 60s while tab is visible.
  useEffect(() => {
    if (!user) return;
    let alive = true;
    async function ping() {
      if (!alive || document.hidden) return;
      try {
        const token = await getIdToken();
        await fetch("/api/schedule/ping", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
      } catch {}
    }
    ping();
    const id = setInterval(ping, 60_000);
    const onVis = () => {
      if (!document.hidden) ping();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      alive = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [user, getIdToken]);

  async function toggleComplete(block: StudyBlock) {
    if (!user) return;
    const wasComplete = completedIds.has(block.id);
    // Optimistic update
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (wasComplete) next.delete(block.id);
      else next.add(block.id);
      return next;
    });
    try {
      const token = await getIdToken();
      await fetch("/api/schedule/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ blockId: block.id, completed: !wasComplete }),
      });
    } catch {
      // Revert on failure
      setCompletedIds((prev) => {
        const next = new Set(prev);
        if (wasComplete) next.add(block.id);
        else next.delete(block.id);
        return next;
      });
    }
  }

  // Auto-save schedule whenever it changes
  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;

    // Clear any pending save
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Schedule a save for 1 second after the last change
    autoSaveTimeoutRef.current = setTimeout(() => {
      setDoc(
        doc(db, "users", user.uid, "profile", "schedule"),
        {
          days: schedule.days,
          dailyGoalMinutes: schedule.dailyGoalMinutes,
          blocks: schedule.blocks,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      ).catch((e) => {
        console.error("Failed to auto-save schedule:", e);
        setMsg("Failed to save schedule. Please check your connection.");
      });
    }, 1000);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [schedule.blocks, schedule.days, schedule.dailyGoalMinutes, user]);

  async function claim(minutes: number) {
    if (!user) return;
    setClaiming(true);
    setMsg(null);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/schedule/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ minutes }),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) {
        if (j.reason === "already_claimed_today") {
          setMsg("You already claimed today. Come back tomorrow.");
        } else if (j.reason === "day_not_over") {
          const end = j.details?.lastEndMin;
          setMsg(
            typeof end === "number"
              ? `Come back after ${fmtTime(end)}. Claim opens once every block ends.`
              : "Finish all of today's blocks first."
          );
        } else if (j.reason === "no_qualifying_blocks") {
          const details = j.details?.blocks || [];
          const reasons = details
            .filter((b: any) => b.reason)
            .map((b: any) => {
              if (b.reason === "too_short")
                return `${b.subject}: under ${MIN_BLOCK_MINUTES + 1} min`;
              if (b.reason === "not_completed")
                return `${b.subject}: not marked done`;
              if (b.reason === "insufficient_activity")
                return `${b.subject}: only ${Math.round(
                  b.coverage * 100
                )}% active (need ${Math.round(
                  ACTIVITY_COVERAGE_THRESHOLD * 100
                )}%)`;
              return `${b.subject}: ${b.reason}`;
            });
          setMsg(
            reasons.length > 0
              ? `Can't claim yet: ${reasons.join("; ")}`
              : "No qualifying blocks yet."
          );
        } else if (j.reason === "no_schedule") {
          setMsg("Add a study block first.");
        } else {
          setMsg(j.error || "Couldn't claim.");
        }
      } else {
        setMsg(null);
        setCelebrate({
          open: true,
          tokens: j.credited || 0,
          minutes: j.minutes || minutes,
          base: typeof j.base === "number" ? j.base : undefined,
          perMinute: typeof j.perMinute === "number" ? j.perMinute : undefined,
          subtotal: typeof j.subtotal === "number" ? j.subtotal : undefined,
          focusBonus: typeof j.focusBonus === "number" ? j.focusBonus : undefined,
          depletionBonus:
            typeof j.depletionBonus === "number" ? j.depletionBonus : undefined,
          usedAiTools: !!j.usedAiTools,
          aiTokensUsedToday:
            typeof j.aiTokensUsedToday === "number"
              ? j.aiTokensUsedToday
              : undefined,
        });
      }
    } finally {
      setClaiming(false);
    }
  }

  function addBlock() {
    const s = parseHHMM(newBlock.start);
    const e = parseHHMM(newBlock.end);
    if (s === null || e === null) {
      setMsg("Invalid time format. Use HH:MM.");
      return;
    }
    if (e <= s) {
      setMsg("End time must be after start time.");
      return;
    }
    if (e - s <= MIN_BLOCK_MINUTES) {
      setMsg(
        `Blocks must be longer than ${MIN_BLOCK_MINUTES} minutes to earn tokens.`
      );
      return;
    }
    if (!newBlock.subject.trim()) {
      setMsg("Give the session a subject, like 'AP Java'.");
      return;
    }
    const block: StudyBlock = {
      id: Math.random().toString(36).slice(2, 10),
      day: newBlock.day,
      startMin: s,
      endMin: e,
      subject: newBlock.subject.trim(),
    };
    setSchedule((prev) => ({ ...prev, blocks: [...prev.blocks, block] }));
    setNewBlock((n) => ({ ...n, subject: "" }));
    setMsg(null);
  }

  function removeBlock(id: string) {
    setSchedule((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((b) => b.id !== id),
    }));
  }

  async function generatePlan() {
    if (!user) return;
    setPlanError(null);
    setPlanLoading(true);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/schedule/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          dailyGoalMinutes: schedule.dailyGoalMinutes || 60,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setPlanError(data?.message || data?.error || "Could not generate plan.");
        return;
      }
      const blocks: PlanBlock[] = Array.isArray(data?.blocks) ? data.blocks : [];
      if (blocks.length === 0) {
        setPlanError("AI returned no valid blocks. Try again.");
        return;
      }
      setPlanPreview({
        rationale: typeof data?.rationale === "string" ? data.rationale : "",
        blocks,
      });
    } catch (e: any) {
      setPlanError(e?.message || "Could not generate plan.");
    } finally {
      setPlanLoading(false);
    }
  }

  function applyPlan(mode: "replace" | "append") {
    if (!planPreview) return;
    const newBlocks: StudyBlock[] = planPreview.blocks.map((b) => ({
      id: Math.random().toString(36).slice(2, 10),
      day: b.day,
      startMin: b.startMin,
      endMin: b.endMin,
      subject: b.focus ? `${b.subject} · ${b.focus}` : b.subject,
    }));
    setSchedule((prev) => ({
      ...prev,
      blocks: mode === "replace" ? newBlocks : [...prev.blocks, ...newBlocks],
    }));
    setPlanPreview(null);
    setMsg(
      mode === "replace"
        ? "Replaced your week with the AI plan."
        : "Added AI blocks to your schedule."
    );
  }

  function toggleDay(d: number) {
    setSchedule((s) => ({
      ...s,
      days: s.days.includes(d)
        ? s.days.filter((x) => x !== d)
        : [...s.days, d].sort((a, b) => a - b),
    }));
  }

  function parseHHMM(v: string): number | null {
    const m = /^(\d{1,2}):(\d{2})$/.exec(v.trim());
    if (!m) return null;
    const h = parseInt(m[1], 10);
    const mm = parseInt(m[2], 10);
    if (h < 0 || h > 23 || mm < 0 || mm > 59) return null;
    return h * 60 + mm;
  }

  if (loading || !user) {
    return (
      <main className="bg-paper">
        <SiteNav>
        </SiteNav>
        <PageLoader />
      </main>
    );
  }

  const today = ymdLocal();
  const claimedToday = schedule.lastClaimDate === today;
  const todayWd = new Date().getDay();
  const todays = blocksOnDay(schedule.blocks, todayWd);

  // Per-block qualification status (must be > MIN_BLOCK_MINUTES, marked done,
  // and have ≥ ACTIVITY_COVERAGE_THRESHOLD of its minutes observed active).
  const perBlock = todays.map((b) => {
    const mins = b.endMin - b.startMin;
    let hits = 0;
    for (let m = b.startMin; m < b.endMin; m++) {
      if (pingMinutes.has(m)) hits += 1;
    }
    const coverage = mins > 0 ? hits / mins : 0;
    const tooShort = mins <= MIN_BLOCK_MINUTES;
    const done = completedIds.has(b.id);
    const active = coverage >= ACTIVITY_COVERAGE_THRESHOLD;
    const qualifies = !tooShort && done && active;
    return { block: b, mins, coverage, tooShort, done, active, qualifies };
  });

  const qualifyingMins = perBlock
    .filter((p) => p.qualifies)
    .reduce((sum, p) => sum + p.mins, 0);

  // End-of-day gate: last scheduled block must have ended.
  const lastEnd = lastBlockEndMin(schedule.blocks, todayWd);
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const dayOver = lastEnd === null || nowMin >= lastEnd;

  // Preview doesn't yet know today's AI usage, so show a no-AI, no-depletion
  // estimate so the user sees a sensible lower bound. The server uses the
  // true values when credit is issued.
  const previewReward = claimReward({
    minutes: qualifyingMins,
    usedAiTools: false,
    aiTokensUsedToday: 0,
  });
  const estTokens = previewReward.amount;
  const canClaim =
    qualifyingMins > MIN_BLOCK_MINUTES && !claimedToday && dayOver;

  const todayPanel = (
    <div className="mt-8 rounded-xl border-2 border-orange/40 bg-orange-tint p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="label text-orange-ink">Today · {WEEKDAYS[todayWd].short}</div>
          <p className="mt-1 text-[14px] text-orange-ink/80">
            {todays.length === 0
              ? "Nothing scheduled for today. Add a block below."
              : `${todays.length} session${todays.length === 1 ? "" : "s"} planned today. Claim when you're done studying.`}
          </p>
        </div>
        <div className="text-right">
          <div className="font-serif text-3xl text-orange-ink">+{estTokens}</div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-orange-ink/70">
            tokens from {qualifyingMins}m qualifying
          </div>
        </div>
      </div>

      {todays.length > 0 && (
        <ul className="mt-5 space-y-2">
          {perBlock.map((p) => {
            const { block: b, mins, coverage, tooShort, done, active, qualifies } = p;
            const coveragePct = Math.round(coverage * 100);
            let hint = "";
            if (tooShort) hint = `Too short: needs more than ${MIN_BLOCK_MINUTES} min`;
            else if (!done) hint = "Mark as done when you finish";
            else if (!active)
              hint = `Need ${Math.round(ACTIVITY_COVERAGE_THRESHOLD * 100)}% active time (currently ${coveragePct}%)`;
            else hint = "Ready to claim";
            return (
              <li
                key={b.id}
                className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 ${
                  qualifies
                    ? "border-orange/40 bg-paper"
                    : "border-hair bg-paper"
                }`}
              >
                <label className="flex flex-1 cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggleComplete(b)}
                    disabled={tooShort}
                    className="mt-1 h-4 w-4 rounded border-hair accent-orange disabled:opacity-40"
                  />
                  <div className="flex-1">
                    <div className="text-[15px] text-ink">
                      <strong className={done ? "line-through opacity-70" : ""}>
                        {b.subject}
                      </strong>
                      <span className="ml-2 text-muted">
                        {fmtTime(b.startMin)}–{fmtTime(b.endMin)}
                      </span>
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-muted">
                      {mins} min · active {coveragePct}%
                    </div>
                    <div
                      className={`mt-1 text-[11px] ${
                        qualifies ? "text-orange-ink" : "text-muted"
                      }`}
                    >
                      {qualifies ? "✓ " : "• "}
                      {hint}
                    </div>
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {claimedToday ? (
          <span className="text-[14px] text-orange-ink">
            ✓ Already claimed today. Come back tomorrow.
          </span>
        ) : (
          <button
            data-tour="schedule-claim"
            onClick={() => claim(qualifyingMins)}
            disabled={claiming || !canClaim}
            className={`btn-primary disabled:opacity-50${canClaim ? " animate-glowPulse" : ""}`}
            title={
              canClaim
                ? ""
                : !dayOver && lastEnd !== null
                ? `Claim opens at ${fmtTime(lastEnd)}. Finish every block first.`
                : `Finish a block over ${MIN_BLOCK_MINUTES} min, mark it done, and stay active for ${Math.round(ACTIVITY_COVERAGE_THRESHOLD * 100)}% of it.`
            }
          >
            {claiming
              ? "Claiming…"
              : canClaim
              ? `Claim ~${estTokens}+ tokens`
              : !dayOver && lastEnd !== null
              ? `Opens at ${fmtTime(lastEnd)}`
              : `Finish a qualifying block`}
          </button>
        )}
        {msg && <span className="text-sm text-orange-ink">{msg}</span>}
      </div>
    </div>
  );

  return (
    <main className="bg-paper text-body">
      <SiteNav>
      </SiteNav>
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="label mb-3">Study schedule</div>
        <h1 className="font-serif text-[44px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[52px]">
          Block off your week.
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] text-muted">
          Build a real weekly calendar: block off an hour on Monday for AP
          Java, 45 minutes on Wednesday for Calc, whatever you need. Your
          scheduled sessions automatically count when you claim for the day.
          Longer, deeper sessions earn a focus bonus.
        </p>

        <div data-tour="schedule-token-balance" className="mt-6 inline-flex items-center gap-2 rounded-full border border-hair bg-paper px-4 py-2 text-sm">
          <span className="text-muted">Bonus balance:</span>
          <strong className="font-mono text-ink">
            {bankBalance.toLocaleString()}
          </strong>
          <span className="text-muted">tokens</span>
          <span className="text-dim">·</span>
          <span className="text-muted">Total claims:</span>
          <strong className="font-mono text-ink">{schedule.totalClaims}</strong>
        </div>

        {/* TODAY'S SESSIONS + CLAIM */}
        {todayPanel}

        {/* AI-GENERATED STUDY PLAN */}
        <div data-tour="schedule-ai-plan" className="mt-10 rounded-xl border border-hair bg-paper p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className="label">AI study plan</div>
              <p className="mt-1 text-[14px] text-muted">
                Generate a weekly plan based on your courses, exam dates, and
                weak spots. Preview before it touches your schedule.
              </p>
            </div>
            <button
              onClick={generatePlan}
              disabled={planLoading}
              className="btn-primary disabled:opacity-50"
            >
              {planLoading ? "Generating…" : "Generate plan"}
            </button>
          </div>
          {planError && (
            <p className="mt-3 text-sm text-red-700">{planError}</p>
          )}
          {planPreview && (
            <div className="mt-5 rounded-lg border border-orange/40 bg-orange-tint/40 p-4">
              {planPreview.rationale && (
                <p className="text-[14px] text-orange-ink">
                  {planPreview.rationale}
                </p>
              )}
              <ul className="mt-4 space-y-2">
                {planPreview.blocks.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-md border border-hair bg-paper px-3 py-2 text-[14px]"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold text-ink">
                        {b.subject}
                      </span>
                      {b.focus && (
                        <span className="ml-2 text-muted">· {b.focus}</span>
                      )}
                    </div>
                    <div className="shrink-0 text-[12px] text-muted">
                      {WEEKDAYS[b.day]?.short || "?"} · {fmtTime(b.startMin)}–
                      {fmtTime(b.endMin)}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => applyPlan("replace")}
                  className="btn-primary"
                >
                  Replace my week
                </button>
                <button
                  onClick={() => applyPlan("append")}
                  className="btn-ghost"
                >
                  Add to my schedule
                </button>
                <button
                  onClick={() => setPlanPreview(null)}
                  className="btn-ghost"
                >
                  Discard
                </button>
              </div>
            </div>
          )}
        </div>

        {/* WEEKLY CALENDAR: time-blocked grid */}
        <div data-tour="schedule-calendar" className="mt-12">
          <div className="label mb-3">Your week</div>
          <WeekGrid
            blocks={schedule.blocks}
            onRemove={removeBlock}
            today={new Date().getDay()}
          />
        </div>

        {/* ADD-SESSION FORM */}
        <div data-tour="schedule-add-block" className="mt-8 rounded-xl border border-hair bg-paper p-6">
          <div className="label mb-3">Add a study block</div>
          <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <select
              value={newBlock.subject}
              onChange={(e) =>
                setNewBlock((n) => ({ ...n, subject: e.target.value }))
              }
              className="focus-ring rounded-md border border-hair bg-paper px-3 py-2 text-sm"
            >
              <option value="">Select a course</option>
              {selectedCourses.length > 0
                ? COURSES.filter((c) => selectedCourses.includes(c.slug)).map(
                    (c) => (
                      <option key={c.slug} value={c.shortTitle}>
                        {c.shortTitle}
                      </option>
                    )
                  )
                : COURSES.map((c) => (
                    <option key={c.slug} value={c.shortTitle}>
                      {c.shortTitle}
                    </option>
                  ))}
            </select>
            <select
              value={newBlock.day}
              onChange={(e) =>
                setNewBlock((n) => ({ ...n, day: parseInt(e.target.value, 10) }))
              }
              className="focus-ring rounded-md border border-hair bg-paper px-3 py-2 text-sm"
            >
              {WEEKDAYS.map((w) => (
                <option key={w.n} value={w.n}>
                  {w.short}
                </option>
              ))}
            </select>
            <input
              type="time"
              value={newBlock.start}
              onChange={(e) =>
                setNewBlock((n) => ({ ...n, start: e.target.value }))
              }
              className="focus-ring rounded-md border border-hair bg-paper px-3 py-2 text-sm"
            />
            <input
              type="time"
              value={newBlock.end}
              onChange={(e) =>
                setNewBlock((n) => ({ ...n, end: e.target.value }))
              }
              className="focus-ring rounded-md border border-hair bg-paper px-3 py-2 text-sm"
            />
            <button onClick={addBlock} className="btn-primary">
              Add
            </button>
          </div>
          <p className="mt-3 text-xs text-muted">
            Blocks must be longer than {MIN_BLOCK_MINUTES} minutes to earn tokens.
            Mark each block done and stay active in the app for at least{" "}
            {Math.round(ACTIVITY_COVERAGE_THRESHOLD * 100)}% of its time. Claim
            opens after your last block ends: 50 base + 1 token per minute past
            the first hour, plus focus and depletion bonuses up to {MAX_CLAIM_TOKENS} total.
          </p>
        </div>
      </section>

      {celebrate.open && (
        <ClaimCelebration
          tokens={celebrate.tokens}
          minutes={celebrate.minutes}
          base={celebrate.base}
          perMinute={celebrate.perMinute}
          subtotal={celebrate.subtotal}
          focusBonus={celebrate.focusBonus}
          depletionBonus={celebrate.depletionBonus}
          usedAiTools={celebrate.usedAiTools}
          onClose={() => setCelebrate({ open: false, tokens: 0, minutes: 0 })}
        />
      )}
    </main>
  );
}

function WeekGrid({
  blocks,
  onRemove,
  today,
}: {
  blocks: StudyBlock[];
  onRemove: (id: string) => void;
  today: number;
}) {
  // visible time range: 6am to 11pm (17 hours)
  const START_HOUR = 6;
  const END_HOUR = 23;
  const HOUR_PX = 44;
  const totalHours = END_HOUR - START_HOUR;
  const totalHeight = totalHours * HOUR_PX;

  function pxFromMin(min: number): number {
    return ((min - START_HOUR * 60) / 60) * HOUR_PX;
  }

  const hours = Array.from({ length: totalHours + 1 }, (_, i) => START_HOUR + i);

  return (
    <div className="overflow-hidden rounded-xl border border-hair bg-paper shadow-sm">
      {/* header row */}
      <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-hair bg-offwhite">
        <div />
        {WEEKDAYS.map((w) => (
          <div
            key={w.n}
            className={`border-l border-hair px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wider ${
              w.n === today ? "text-orange" : "text-muted"
            }`}
          >
            {w.short}
          </div>
        ))}
      </div>

      {/* body */}
      <div
        className="relative grid grid-cols-[56px_repeat(7,1fr)]"
        style={{ height: totalHeight }}
      >
        {/* hour labels */}
        <div className="relative">
          {hours.map((h, i) => (
            <div
              key={h}
              className="absolute left-0 right-0 pr-2 text-right text-[10px] font-medium uppercase tracking-wider text-dim"
              style={{ top: i * HOUR_PX - 6 }}
            >
              {fmtTime(h * 60)}
            </div>
          ))}
        </div>

        {/* day columns */}
        {WEEKDAYS.map((w) => {
          const dayBlocks = blocksOnDay(blocks, w.n);
          const isTodayCol = w.n === today;
          return (
            <div
              key={w.n}
              className={`relative border-l border-hair ${
                isTodayCol ? "bg-orange-tint/30" : ""
              }`}
            >
              {/* hour lines */}
              {hours.map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 border-t border-hair/60"
                  style={{ top: i * HOUR_PX }}
                />
              ))}
              {/* blocks */}
              {dayBlocks.map((b) => {
                const top = Math.max(0, pxFromMin(b.startMin));
                const height = Math.max(
                  18,
                  pxFromMin(b.endMin) - pxFromMin(b.startMin)
                );
                const mins = b.endMin - b.startMin;
                return (
                  <div
                    key={b.id}
                    className="group absolute left-1 right-1 overflow-hidden rounded-md border border-orange/50 bg-orange-tint px-2 py-1 text-[11px] text-orange-ink shadow-[0_6px_16px_-10px_rgba(194,65,12,0.45)] transition-transform hover:scale-[1.02] hover:bg-orange-tint/90"
                    style={{ top, height }}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold text-ink">
                          {b.subject}
                        </div>
                        <div className="truncate text-[10px] text-orange-ink/80">
                          {fmtTime(b.startMin)}–{fmtTime(b.endMin)} · {mins}m
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(b.id)}
                        className="rounded p-0.5 text-orange-ink/60 opacity-0 transition-opacity hover:bg-paper/60 hover:text-orange-ink group-hover:opacity-100"
                        aria-label="Remove block"
                      >
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
                          <path d="M3.28 3.28a.75.75 0 0 1 1.06 0L8 6.94l3.66-3.66a.75.75 0 1 1 1.06 1.06L9.06 8l3.66 3.66a.75.75 0 1 1-1.06 1.06L8 9.06l-3.66 3.66a.75.75 0 0 1-1.06-1.06L6.94 8 3.28 4.34a.75.75 0 0 1 0-1.06Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ClaimCelebration({
  tokens,
  minutes,
  base,
  perMinute,
  subtotal,
  focusBonus,
  depletionBonus,
  usedAiTools,
  onClose,
}: {
  tokens: number;
  minutes: number;
  base?: number;
  perMinute?: number;
  subtotal?: number;
  focusBonus?: number;
  depletionBonus?: number;
  usedAiTools?: boolean;
  onClose: () => void;
}) {
  const hasBreakdown = typeof subtotal === "number";
  const showFocus = typeof focusBonus === "number" && focusBonus > 0;
  const showDepletion =
    typeof depletionBonus === "number" && depletionBonus > 0.005;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const confetti = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* confetti layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((i) => {
          const left = (i * 37) % 100;
          const delay = (i % 8) * 90;
          const duration = 1800 + (i % 5) * 300;
          const colors = ["#c2410c", "#f97316", "#fbbf24", "#ea580c", "#fcd34d"];
          const color = colors[i % colors.length];
          return (
            <span
              key={i}
              className="absolute block h-2 w-2 rounded-sm"
              style={{
                left: `${left}%`,
                top: "-10px",
                backgroundColor: color,
                transform: `rotate(${(i * 30) % 360}deg)`,
                animation: `confettiFall ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
              }}
            />
          );
        })}
      </div>

      <div
        className="animate-bounceIn relative max-w-md rounded-2xl border border-hair bg-paper px-8 pb-8 pt-16 text-center shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Treasure chest */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div
              className="absolute inset-0 -m-6 rounded-full bg-orange/20 blur-2xl"
              aria-hidden
            />
            <TreasureChest className="animate-float relative h-28 w-28 drop-shadow-[0_10px_30px_rgba(194,65,12,0.45)]" />
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-muted hover:bg-offwhite hover:text-ink"
          aria-label="Close"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
            <path d="M3.28 3.28a.75.75 0 0 1 1.06 0L8 6.94l3.66-3.66a.75.75 0 1 1 1.06 1.06L9.06 8l3.66 3.66a.75.75 0 1 1-1.06 1.06L8 9.06l-3.66 3.66a.75.75 0 0 1-1.06-1.06L6.94 8 3.28 4.34a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </button>

        <div className="label mb-2 text-orange-ink">Quest complete</div>
        <h2 className="font-serif text-3xl font-normal leading-tight text-ink sm:text-4xl">
          You completed<br />your study!
        </h2>
        <p className="mt-4 text-sm text-muted">
          {minutes > 0
            ? `${minutes} minutes of deep focus. Tokens earned based on engagement; they never expire and stack with your daily budget.`
            : "Bonus unlocked. These tokens never expire and stack with your daily budget."}
        </p>

        <div className="animate-countUp mt-6 inline-flex items-baseline gap-2 rounded-full border-2 border-orange/40 bg-orange-tint px-6 py-3">
          <span className="font-serif text-4xl text-orange-ink">+{tokens}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
            tokens
          </span>
        </div>
        {hasBreakdown && (
          <div className="mt-3 space-y-1 text-[12px] text-orange-ink">
            <div>
              {base} base{" "}
              {typeof perMinute === "number" && perMinute > 0
                ? `+ ${perMinute} per-min`
                : ""}{" "}
              → {subtotal} subtotal
            </div>
            {showFocus && (
              <div>
                +{Math.round((focusBonus || 0) * 100)}% focus bonus
                {usedAiTools ? " (used AI tools)" : ""}
              </div>
            )}
            {showDepletion && (
              <div>
                +{Math.round((depletionBonus || 0) * 100)}% depletion bonus
              </div>
            )}
          </div>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button onClick={onClose} className="btn-primary">
            Keep going →
          </button>
          <a href="/study" className="btn-ghost">
            Back to studying
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}

function TreasureChest({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      {/* glow rays */}
      <g opacity="0.6">
        {[0, 45, 90, 135].map((r) => (
          <rect
            key={r}
            x="58"
            y="10"
            width="4"
            height="24"
            fill="#fbbf24"
            transform={`rotate(${r} 60 60)`}
          />
        ))}
      </g>
      {/* chest body */}
      <rect x="18" y="52" width="84" height="52" rx="4" fill="#92400e" stroke="#451a03" strokeWidth="2" />
      <rect x="18" y="52" width="84" height="10" fill="#7c2d12" />
      {/* planks */}
      <line x1="40" y1="62" x2="40" y2="104" stroke="#451a03" strokeWidth="1.5" />
      <line x1="60" y1="62" x2="60" y2="104" stroke="#451a03" strokeWidth="1.5" />
      <line x1="80" y1="62" x2="80" y2="104" stroke="#451a03" strokeWidth="1.5" />
      {/* lid (open) */}
      <path
        d="M18 52 Q60 18 102 52 L102 60 Q60 28 18 60 Z"
        fill="#b45309"
        stroke="#451a03"
        strokeWidth="2"
      />
      {/* gold inside */}
      <circle cx="40" cy="60" r="5" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
      <circle cx="55" cy="58" r="6" fill="#fcd34d" stroke="#b45309" strokeWidth="1" />
      <circle cx="72" cy="60" r="5" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
      <circle cx="85" cy="59" r="4" fill="#fcd34d" stroke="#b45309" strokeWidth="1" />
      {/* lock */}
      <rect x="54" y="76" width="12" height="14" rx="1" fill="#fbbf24" stroke="#451a03" strokeWidth="1.5" />
      <circle cx="60" cy="82" r="1.6" fill="#451a03" />
      {/* metal bands */}
      <rect x="18" y="72" width="84" height="3" fill="#451a03" />
      <rect x="18" y="94" width="84" height="3" fill="#451a03" />
    </svg>
  );
}
