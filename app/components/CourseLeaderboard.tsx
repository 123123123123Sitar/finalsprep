"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import UserAvatar from "@/app/components/UserAvatar";
import type { LeaderboardEntry } from "@/lib/social";

export default function CourseLeaderboard({
  courseSlug,
  courseTitle,
  limit = 50,
}: {
  courseSlug: string;
  courseTitle: string;
  limit?: number;
}) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setEntries(null);
    setError(null);
    (async () => {
      try {
        const res = await fetch(
          `/api/leaderboards?course=${encodeURIComponent(
            courseSlug
          )}&limit=${limit}`
        );
        const data = await res.json();
        if (!alive) return;
        if (!res.ok) throw new Error(data?.error || "Couldn't load");
        setEntries(data.entries || []);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message || "Couldn't load leaderboard");
      }
    })();
    return () => {
      alive = false;
    };
  }, [courseSlug, limit]);

  const myRank = entries?.findIndex((e) => e.uid === user?.uid) ?? -1;

  return (
    <div className="rounded-xl border border-hair bg-paper p-5">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <div className="label">Leaderboard</div>
          <h3 className="mt-1 font-serif text-xl text-ink">{courseTitle}</h3>
        </div>
        {user && myRank >= 0 && (
          <div className="text-right text-[12px] text-muted">
            You're{" "}
            <span className="font-semibold text-ink">#{myRank + 1}</span>
          </div>
        )}
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : entries === null ? (
        <div className="py-6 text-center text-sm text-muted">Loading…</div>
      ) : entries.length === 0 ? (
        <div className="rounded-md bg-offwhite/60 p-6 text-center text-sm text-muted">
          No one on the board for this course yet. Solve a problem to claim #1.
        </div>
      ) : (
        <ol className="divide-y divide-hair">
          {entries.map((e) => {
            const isMe = user?.uid === e.uid;
            return (
              <li
                key={e.uid}
                className={`flex items-center gap-3 py-2.5 ${
                  isMe ? "rounded-md bg-orange-tint/40 px-2" : "px-2"
                }`}
              >
                <span
                  className={`w-7 shrink-0 text-right font-mono text-[13px] ${
                    e.rank <= 3 ? "text-orange" : "text-muted"
                  }`}
                >
                  {e.rank === 1
                    ? "🥇"
                    : e.rank === 2
                    ? "🥈"
                    : e.rank === 3
                    ? "🥉"
                    : `#${e.rank}`}
                </span>
                <a
                  href={`/users/${e.uid}`}
                  className="flex min-w-0 flex-1 items-center gap-2.5 hover:opacity-80"
                >
                  <UserAvatar
                    seed={e.uid}
                    label={e.displayName || e.username}
                    emoji={e.avatarEmoji}
                    color={e.avatarColor}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] text-ink">
                      {e.displayName || e.username}
                      {isMe && (
                        <span className="ml-2 rounded bg-orange px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                          you
                        </span>
                      )}
                    </div>
                    <div className="text-[11.5px] text-muted">
                      @{e.username}
                      {e.streak > 0 && (
                        <span className="ml-2">🔥 {e.streak}d</span>
                      )}
                      <span className="ml-2">
                        💬 {e.chatMessages} · 🧠 {e.toolUses} · ✅ {e.problems}
                      </span>
                    </div>
                  </div>
                </a>
                <div className="shrink-0 text-right">
                  <div className="text-[14px] font-semibold text-ink">
                    {e.points}
                  </div>
                  <div className="text-[10.5px] uppercase tracking-wider text-muted">
                    points
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
