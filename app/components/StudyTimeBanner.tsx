"use client";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";
import {
  blocksOnDay,
  fmtTime,
  type StudyBlock,
} from "@/lib/schedule";

/**
 * App-wide banner that shows up whenever the current time falls inside one
 * of the user's scheduled study blocks. Mounted once in app/layout.tsx so it
 * appears on every page (chat, study, schedule, etc.).
 *
 * Renders nothing if:
 *   - The user is signed out (no schedule to read).
 *   - The schedule has no block covering "now".
 *   - We're inside the chat-extension overlay (?embed=1) — the parent app
 *     already shows it; doubling up looks broken.
 */
export default function StudyTimeBanner() {
  const { user } = useAuth();
  const [blocks, setBlocks] = useState<StudyBlock[]>([]);
  const [, tick] = useState(0);
  const [embed, setEmbed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setEmbed(new URLSearchParams(window.location.search).get("embed") === "1");
  }, []);

  // Subscribe to the user's schedule blocks. Same path / shape the dashboard
  // and /schedule already use.
  useEffect(() => {
    if (!user) {
      setBlocks([]);
      return;
    }
    const db = getDb();
    if (!db) return;
    const unsub = onSnapshot(
      doc(db, "users", user.uid, "profile", "schedule"),
      (snap) => {
        const d = snap.data() as any;
        setBlocks(Array.isArray(d?.blocks) ? (d.blocks as StudyBlock[]) : []);
      },
      () => setBlocks([])
    );
    return () => unsub();
  }, [user]);

  // Re-render every 10s so the banner appears within ~10s of a block starting
  // and disappears within ~10s of it ending.
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 10_000);
    return () => clearInterval(id);
  }, []);

  if (!user || embed) return null;

  const now = new Date();
  const todayWd = now.getDay();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const todayBlocks = blocksOnDay(blocks, todayWd);
  const active =
    todayBlocks.find(
      (b) => nowMin >= Number(b.startMin) && nowMin < Number(b.endMin)
    ) ?? null;
  if (!active) return null;

  return (
    <div className="bg-orange px-6 py-3 text-paper">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold uppercase tracking-wider opacity-80">
            Study time
          </span>
          <span className="font-serif text-lg font-normal">
            {active.subject}
          </span>
        </div>
        <div className="shrink-0 text-sm opacity-80">
          {fmtTime(active.startMin)} – {fmtTime(active.endMin)}
        </div>
      </div>
    </div>
  );
}
