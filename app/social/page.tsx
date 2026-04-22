"use client";
import { useCallback, useEffect, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import CommunityTabs from "@/app/components/CommunityTabs";
import UserAvatar from "@/app/components/UserAvatar";
import { useAuth } from "@/app/components/AuthProvider";
import {
  relativeTime,
  type ActivityItem,
} from "@/lib/social";

type SearchResult = {
  uid: string;
  username: string;
  displayName: string;
  bio: string;
  avatarEmoji?: string | null;
  avatarColor?: string | null;
  stats: { problemsSolved: number; followersCount: number };
};

export default function SocialPage() {
  const { user, getIdToken } = useAuth();
  const [feed, setFeed] = useState<ActivityItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [postText, setPostText] = useState("");
  const [posting, setPosting] = useState(false);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);

  const loadFeed = useCallback(async () => {
    try {
      const token = await getIdToken();
      const res = await fetch("/api/feed", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Couldn't load feed");
      setFeed(data.items || []);
    } catch (e: any) {
      setError(e?.message || "Couldn't load feed");
    }
  }, [getIdToken]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  useEffect(() => {
    const q = search.trim();
    if (q.length < 2) {
      setSearchResults(null);
      return;
    }
    let alive = true;
    const t = setTimeout(async () => {
      const res = await fetch(`/api/users/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (alive) setSearchResults(data.results || []);
    }, 200);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [search]);

  async function shareProgress() {
    if (!user) {
      window.location.href = "/signin?next=/social";
      return;
    }
    const content = postText.trim();
    if (content.length < 2) return;
    setPosting(true);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/feed/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setPostText("");
        loadFeed();
      }
    } finally {
      setPosting(false);
    }
  }

  return (
    <main className="min-h-screen bg-paper">
      <SiteNav sticky />
      <CommunityTabs />
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_300px]">
        <div>
          <header className="mb-6">
            <div className="label">Community</div>
            <h1 className="mt-1 font-serif text-4xl text-ink">Feed</h1>
            <p className="mt-2 max-w-xl text-[15px] text-body">
              Progress updates from students you follow, plus what's hot in the
              community.
            </p>
          </header>

          {/* Composer */}
          {user && (
            <div className="mb-6 rounded-xl border border-hair bg-paper p-4">
              <div className="flex items-start gap-3">
                <UserAvatar
                  seed={user.uid}
                  label={user.email || "?"}
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="Share what you're studying…"
                    rows={2}
                    className="w-full resize-none rounded-md border border-hair bg-offwhite/40 px-3 py-2 text-[14px] text-ink placeholder:text-dim focus:border-orange focus:bg-paper focus:outline-none"
                    maxLength={400}
                  />
                  <div className="mt-2 flex items-center justify-between text-[12px] text-muted">
                    <span>{postText.length}/400</span>
                    <button
                      onClick={shareProgress}
                      disabled={posting || postText.trim().length < 2}
                      className="btn-primary px-3 py-1 text-[13px] disabled:opacity-50"
                    >
                      {posting ? "Posting…" : "Share"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {feed === null ? (
            <div className="py-10 text-center text-sm text-muted">
              Loading…
            </div>
          ) : feed.length === 0 ? (
            <div className="rounded-xl bg-offwhite/60 p-10 text-center">
              <div className="text-[15px] text-ink">No activity yet.</div>
              <p className="mt-2 text-[13px] text-muted">
                Follow a few classmates, or solve a problem to kick off your feed.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {feed.map((a) => (
                <FeedCard key={a.id} activity={a} />
              ))}
            </ul>
          )}
        </div>

        {/* Sidebar: search + quick links */}
        <aside className="space-y-5">
          <div className="rounded-xl border border-hair bg-paper p-4">
            <div className="label mb-2">Find people</div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search username…"
              className="w-full rounded-md border border-hair bg-offwhite/50 px-3 py-2 text-sm text-ink placeholder:text-dim focus:border-orange focus:bg-paper focus:outline-none"
            />
            {searchResults !== null && (
              <div className="mt-3 space-y-1">
                {searchResults.length === 0 ? (
                  <div className="px-1 py-2 text-[12.5px] text-muted">
                    No matches.
                  </div>
                ) : (
                  searchResults.map((r) => (
                    <a
                      key={r.uid}
                      href={`/users/${r.uid}`}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-offwhite"
                    >
                      <UserAvatar
                        seed={r.uid}
                        label={r.displayName || r.username}
                        emoji={r.avatarEmoji}
                        color={r.avatarColor}
                        size="sm"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13px] text-ink">
                          {r.displayName}
                        </div>
                        <div className="truncate text-[11px] text-muted">
                          @{r.username} · {r.stats.problemsSolved} solves
                        </div>
                      </div>
                    </a>
                  ))
                )}
              </div>
            )}
          </div>

          {user && (
            <div className="rounded-xl border border-hair bg-paper p-4">
              <div className="label mb-2">Jump to</div>
              <ul className="space-y-1 text-[13.5px]">
                <li>
                  <a
                    href={`/users/${user.uid}`}
                    className="block rounded-md px-2 py-1.5 text-body hover:bg-offwhite hover:text-ink"
                  >
                    👤 Your profile
                  </a>
                </li>
              </ul>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

function FeedCard({ activity }: { activity: ActivityItem }) {
  const verb = verbFor(activity);
  return (
    <li className="rounded-xl border border-hair bg-paper p-4">
      <div className="flex items-start gap-3">
        <a href={`/users/${activity.uid}`} className="shrink-0">
          <UserAvatar
            seed={activity.uid}
            label={activity.displayName || activity.username}
            size="md"
          />
        </a>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-[14px]">
            <a
              href={`/users/${activity.uid}`}
              className="font-medium text-ink hover:underline"
            >
              {activity.displayName || activity.username}
            </a>
            <span className="text-muted">{verb}</span>
            <span className="text-[12px] text-dim">
              · {relativeTime(activity.createdAt)}
            </span>
          </div>
          <p className="mt-1 text-[14px] text-body">{activity.content}</p>
          {activity.course && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-offwhite px-2 py-0.5 text-[11px] text-muted">
              <span>📚</span>
              <span>{activity.course}</span>
              {typeof activity.unit === "number" && (
                <span>· Unit {activity.unit}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function verbFor(a: ActivityItem): string {
  switch (a.kind) {
    case "solve":
      return "solved a problem";
    case "mastered_unit":
      return "hit a milestone";
    case "streak_milestone":
      return "extended their streak";
    case "rank_up":
      return "moved up the leaderboard";
    case "custom_post":
    default:
      return "";
  }
}
