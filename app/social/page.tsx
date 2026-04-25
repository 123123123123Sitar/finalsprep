"use client";
import { useCallback, useEffect, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import CommunityTabs from "@/app/components/CommunityTabs";
import UserAvatar from "@/app/components/UserAvatar";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { allSubforums, type ForumPost } from "@/lib/forums";
import ForumPostRow from "@/app/components/ForumPostRow";
import CourseIcon from "@/app/components/CourseIcon";

type SearchResult = {
  uid: string;
  username: string;
  displayName: string;
  bio: string;
  avatarEmoji?: string | null;
  avatarColor?: string | null;
  stats: { problemsSolved: number; followersCount: number };
};

type Recommendation = {
  uid: string;
  username: string;
  displayName: string;
  avatarEmoji?: string | null;
  avatarColor?: string | null;
  reason: string;
};

export default function SocialHomePage() {
  const { user, getIdToken } = useAuth();

  const [hot, setHot] = useState<ForumPost[] | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const [recs, setRecs] = useState<Recommendation[] | null>(null);

  const loadHot = useCallback(async () => {
    const res = await fetch("/api/forum/posts?sort=hot&limit=20");
    const data = await res.json();
    setHot(data.posts || []);
  }, []);

  useEffect(() => {
    loadHot();
  }, [loadHot]);

  useEffect(() => {
    if (!user) {
      setSelectedCourses([]);
      return;
    }
    const db = getDb();
    if (!db) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid, "profile", "prefs"));
        const cs = (snap.data() as any)?.selectedCourses;
        if (Array.isArray(cs)) setSelectedCourses(cs.filter((s) => typeof s === "string"));
      } catch {
        // Non-fatal; just won't pin the user's courses to the top.
      }
    })();
  }, [user]);

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

  useEffect(() => {
    if (!user) {
      setRecs(null);
      return;
    }
    let alive = true;
    (async () => {
      try {
        const token = await getIdToken();
        if (!token) return;
        const res = await fetch("/api/recommendations/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (alive) setRecs(data.users || []);
      } catch {
        // Sidebar card silently hides on failure.
      }
    })();
    return () => {
      alive = false;
    };
  }, [user, getIdToken]);

  const subforums = allSubforums();
  const pinned = new Set(selectedCourses);
  // Surface the user's courses + general at the top; rest stays discoverable.
  const primary = subforums.filter(
    (s) => s.kind === "general" || pinned.has(s.slug)
  );
  const secondary = subforums.filter(
    (s) => s.kind !== "general" && !pinned.has(s.slug)
  );

  return (
    <main className="min-h-screen bg-paper">
      <SiteNav sticky />
      <CommunityTabs />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1fr_300px]">
        <div>
          <header className="mb-6">
            <div className="label">Community</div>
            <h1 className="mt-1 font-serif text-4xl text-ink">Forums</h1>
            <p className="mt-2 max-w-xl text-[15px] text-body">
              One subforum per course plus a general room. Ask questions, share
              resources, organize study groups.
            </p>
          </header>

          <section className="mb-8">
            <div className="mb-2 flex items-baseline justify-between">
              <div className="label">Your forums</div>
              <span className="text-[12px] text-muted">{primary.length}</span>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {primary.map((s) => (
                <SubforumCard key={s.slug} slug={s.slug} title={s.title} description={s.description} />
              ))}
            </ul>

            {secondary.length > 0 && (
              <>
                <div className="mt-6 mb-2 flex items-baseline justify-between">
                  <div className="label">Browse all courses</div>
                  <span className="text-[12px] text-muted">{secondary.length}</span>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {secondary.map((s) => (
                    <SubforumCard key={s.slug} slug={s.slug} title={s.title} description={s.description} />
                  ))}
                </ul>
              </>
            )}
          </section>

          <section data-tour="social-feed">
            <div className="mb-3 flex items-baseline justify-between">
              <div className="label">Hot across all forums</div>
              <a href="/social" className="text-[12px] text-muted hover:text-ink">
                Refresh
              </a>
            </div>
            {hot === null ? (
              <div className="py-10 text-center text-sm text-muted">Loading…</div>
            ) : hot.length === 0 ? (
              <div className="rounded-xl bg-offwhite/60 p-10 text-center">
                <div className="text-[15px] text-ink">
                  No posts anywhere yet.
                </div>
                <p className="mt-2 text-[13px] text-muted">
                  Pick a forum and start the conversation.
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {hot.map((p) => (
                  <li key={p.id}>
                    <ForumPostRow post={p} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-xl border border-hair bg-paper p-4">
            <div className="label mb-2">Find people</div>
            <input
              data-tour="social-search"
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
                          @{r.username}
                        </div>
                      </div>
                    </a>
                  ))
                )}
              </div>
            )}
          </div>

          {user && recs && recs.length > 0 && (
            <div data-tour="social-recommendations" className="rounded-xl border border-hair bg-paper p-4">
              <div className="label mb-2">People you might like</div>
              <p className="mb-3 text-[12px] text-muted">
                Based on your courses and interests.
              </p>
              <ul className="space-y-2">
                {recs.map((r) => (
                  <li key={r.uid}>
                    <a
                      href={`/users/${r.uid}`}
                      className="flex items-start gap-2 rounded-md px-2 py-1.5 hover:bg-offwhite"
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
                          @{r.username}
                        </div>
                        {r.reason && (
                          <div className="mt-0.5 truncate text-[11px] text-orange-ink">
                            {r.reason}
                          </div>
                        )}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
                <li>
                  <a
                    href="/account"
                    className="block rounded-md px-2 py-1.5 text-body hover:bg-offwhite hover:text-ink"
                  >
                    ⚙️ Account settings
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

function SubforumCard({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}) {
  const isGeneral = slug === "general";
  return (
    <li>
      <a
        href={`/social/f/${slug}`}
        className="flex h-full gap-3 rounded-xl border border-hair bg-paper p-4 hover:border-orange/40"
      >
        {isGeneral ? (
          <span
            aria-hidden
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-tint text-orange-ink"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M4 6 a 2 2 0 0 1 2 -2 h 12 a 2 2 0 0 1 2 2 v 9 a 2 2 0 0 1 -2 2 H 9 L 5 21 V 17 H 6 a 2 2 0 0 1 -2 -2 Z" />
            </svg>
          </span>
        ) : (
          <CourseIcon slug={slug} size="md" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-offwhite px-2 py-0.5 text-[11px] font-medium text-muted">
              f/{slug}
            </span>
            <span className="truncate text-[14px] font-medium text-ink">
              {title}
            </span>
          </div>
          <p className="mt-1.5 line-clamp-2 text-[13px] text-muted">{description}</p>
        </div>
      </a>
    </li>
  );
}

