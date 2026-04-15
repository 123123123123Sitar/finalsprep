"use client";
import { useEffect, useState } from "react";
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
import {
  DAILY_CLAIM_TOKENS,
  DEFAULT_SCHEDULE,
  WEEKDAYS,
  isScheduledToday,
  ymdLocal,
  type Schedule,
} from "@/lib/schedule";

export default function SchedulePage() {
  const { user, loading, getIdToken } = useAuth();
  const [schedule, setSchedule] = useState<Schedule>(DEFAULT_SCHEDULE);
  const [bankBalance, setBankBalance] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/signin?next=/schedule";
    }
  }, [loading, user]);

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
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
        });
      }
    })();
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

  async function save() {
    if (!user) return;
    setSaving(true);
    setMsg(null);
    try {
      const db = getDb();
      if (!db) throw new Error("db not ready");
      await setDoc(
        doc(db, "users", user.uid, "profile", "schedule"),
        {
          days: schedule.days,
          dailyGoalMinutes: schedule.dailyGoalMinutes,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      setMsg("Schedule saved.");
    } catch (e: any) {
      setMsg(e?.message || "Couldn't save.");
    } finally {
      setSaving(false);
    }
  }

  async function claim() {
    if (!user) return;
    setClaiming(true);
    setMsg(null);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/schedule/claim", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const j = await res.json();
      if (!res.ok || !j.ok) {
        setMsg(
          j.reason === "already_claimed_today"
            ? "You already claimed today. Come back tomorrow."
            : j.error || "Couldn't claim."
        );
      } else {
        setMsg(
          `+${j.credited} bonus tokens added to your bank. Nice work!`
        );
      }
    } finally {
      setClaiming(false);
    }
  }

  function toggleDay(d: number) {
    setSchedule((s) => ({
      ...s,
      days: s.days.includes(d)
        ? s.days.filter((x) => x !== d)
        : [...s.days, d].sort((a, b) => a - b),
    }));
  }

  if (loading || !user) {
    return (
      <main className="bg-paper">
        <SiteNav>
          <a href="/study" className="nav-link">Study</a>
          <a href="/chat" className="nav-link">Chat</a>
        </SiteNav>
        <section className="mx-auto max-w-2xl px-6 py-20 text-center text-muted">
          Loading…
        </section>
      </main>
    );
  }

  const today = ymdLocal();
  const claimedToday = schedule.lastClaimDate === today;
  const scheduledToday = isScheduledToday(schedule.days);

  return (
    <main className="bg-paper text-body">
      <SiteNav>
        <a href="/study" className="nav-link">Study</a>
        <a href="/chat" className="nav-link">Chat</a>
      </SiteNav>
      <section className="mx-auto max-w-2xl px-6 py-12">
        <div className="label mb-3">Study schedule</div>
        <h1 className="font-serif text-[44px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[52px]">
          Show up daily.
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-muted">
          Pick the days you want to study and a minute goal. Come back after
          each session and claim{" "}
          <strong className="text-ink">{DAILY_CLAIM_TOKENS} bonus tokens</strong>{" "}
          — once per day, on honor. Bonus tokens never expire and stack with
          your daily budget.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-hair bg-white px-4 py-2 text-sm">
          <span className="text-muted">Bonus balance:</span>
          <strong className="font-mono text-ink">
            {bankBalance.toLocaleString()}
          </strong>
          <span className="text-muted">tokens</span>
          <span className="text-dim">·</span>
          <span className="text-muted">Total claims:</span>
          <strong className="font-mono text-ink">{schedule.totalClaims}</strong>
        </div>

        {/* TODAY'S CLAIM */}
        <div className="mt-8 rounded-xl border-2 border-orange/40 bg-orange-tint p-6">
          <div className="label mb-2 text-orange-ink">Today</div>
          {claimedToday ? (
            <p className="text-[15px] text-body">
              ✓ Already claimed. Come back tomorrow to keep the streak going.
            </p>
          ) : scheduledToday ? (
            <>
              <p className="text-[15px] text-body">
                You've scheduled a session for today ({schedule.dailyGoalMinutes}{" "}
                minutes). When you're done, claim your bonus.
              </p>
              <button
                onClick={claim}
                disabled={claiming}
                className="btn-primary mt-4 disabled:opacity-50"
              >
                {claiming ? "Claiming…" : `Claim ${DAILY_CLAIM_TOKENS} tokens`}
              </button>
            </>
          ) : (
            <p className="text-[15px] text-body">
              Today isn't a scheduled study day — but you can still claim if
              you put in a real session.
              <button
                onClick={claim}
                disabled={claiming}
                className="btn-link ml-2"
              >
                Claim anyway →
              </button>
            </p>
          )}
          {msg && (
            <p className="mt-3 text-sm text-orange-ink">{msg}</p>
          )}
        </div>

        {/* STUDY DAYS */}
        <div className="mt-10">
          <div className="label mb-2">Study days</div>
          <div className="flex flex-wrap gap-2">
            {WEEKDAYS.map((w) => (
              <button
                key={w.n}
                onClick={() => toggleDay(w.n)}
                className={`rounded-md border px-4 py-2 text-sm transition ${
                  schedule.days.includes(w.n)
                    ? "border-orange bg-orange-tint text-ink"
                    : "border-hair bg-white text-body hover:border-orange"
                }`}
              >
                {w.short}
              </button>
            ))}
          </div>
        </div>

        {/* DAILY GOAL */}
        <div className="mt-8">
          <div className="label mb-2">Minutes per session</div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={10}
              max={120}
              step={5}
              value={schedule.dailyGoalMinutes}
              onChange={(e) =>
                setSchedule((s) => ({
                  ...s,
                  dailyGoalMinutes: parseInt(e.target.value, 10),
                }))
              }
              className="flex-1 accent-orange"
            />
            <div className="w-20 text-right font-mono text-ink">
              {schedule.dailyGoalMinutes} min
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save schedule"}
          </button>
          <a href="/shop" className="btn-ghost">
            Shop bonus tokens →
          </a>
        </div>
      </section>
    </main>
  );
}
