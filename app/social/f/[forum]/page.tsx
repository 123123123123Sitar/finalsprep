"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import SiteNav from "@/app/components/SiteNav";
import CommunityTabs from "@/app/components/CommunityTabs";
import ForumPostRow from "@/app/components/ForumPostRow";
import { useAuth } from "@/app/components/AuthProvider";
import {
  getSubforum,
  POST_TAGS,
  POST_TITLE_MAX,
  POST_BODY_MAX,
  MAX_TAGS_PER_POST,
  validatePostTitle,
  type ForumPost,
} from "@/lib/forums";

type Sort = "hot" | "new";

export default function SubforumPage() {
  const params = useParams<{ forum: string }>();
  const forumSlug = decodeURIComponent(String(params.forum || ""));
  const forum = useMemo(() => getSubforum(forumSlug), [forumSlug]);
  const { user, getIdToken } = useAuth();

  const [posts, setPosts] = useState<ForumPost[] | null>(null);
  const [sort, setSort] = useState<Sort>("hot");
  const [composerOpen, setComposerOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!forum) return;
    const res = await fetch(
      `/api/forum/posts?forum=${encodeURIComponent(forum.slug)}&sort=${sort}`
    );
    const data = await res.json();
    setPosts(data.posts || []);
  }, [forum, sort]);

  useEffect(() => {
    load();
  }, [load]);

  if (!forum) {
    notFound();
  }

  async function submit() {
    if (!user) {
      window.location.href = `/signin?next=/social/f/${forum!.slug}`;
      return;
    }
    const err = validatePostTitle(title);
    if (err) {
      setPostError(err);
      return;
    }
    setPosting(true);
    setPostError(null);
    try {
      const token = await getIdToken();
      if (!token) return;
      const res = await fetch("/api/forum/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          forum: forum!.slug,
          title,
          body,
          tags,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPostError(data?.error || "Could not post.");
        return;
      }
      setTitle("");
      setBody("");
      setTags([]);
      setComposerOpen(false);
      load();
    } finally {
      setPosting(false);
    }
  }

  return (
    <main className="min-h-screen bg-paper">
      <SiteNav sticky />
      <CommunityTabs />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <a href="/social" className="label text-muted hover:text-ink">
              ← All forums
            </a>
            <h1 className="mt-1 font-serif text-4xl text-ink">
              f/{forum!.slug}
            </h1>
            <p className="mt-1 text-[14.5px] text-muted">
              {forum!.description}
            </p>
          </div>
          <button
            onClick={() => setComposerOpen((v) => !v)}
            className="btn-primary text-[13px]"
          >
            {composerOpen ? "Cancel" : "New post"}
          </button>
        </header>

        {composerOpen && (
          <div className="mb-6 rounded-xl border border-hair bg-paper p-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={POST_TITLE_MAX}
              placeholder="Title"
              className="w-full rounded-md border border-hair bg-offwhite/40 px-3 py-2 text-[15px] text-ink focus:border-orange focus:bg-paper focus:outline-none"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={POST_BODY_MAX}
              placeholder="Body (optional). Explain what you're asking, sharing, or thinking about."
              rows={6}
              className="mt-3 w-full resize-y rounded-md border border-hair bg-offwhite/40 px-3 py-2 text-[14px] text-ink focus:border-orange focus:bg-paper focus:outline-none"
            />
            <div className="mt-3">
              <div className="label mb-1.5">Tags (up to {MAX_TAGS_PER_POST})</div>
              <div className="flex flex-wrap gap-1.5">
                {POST_TAGS.map((t) => {
                  const active = tags.includes(t);
                  const atLimit = tags.length >= MAX_TAGS_PER_POST && !active;
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={atLimit}
                      onClick={() =>
                        setTags((prev) =>
                          active
                            ? prev.filter((x) => x !== t)
                            : prev.length >= MAX_TAGS_PER_POST
                            ? prev
                            : [...prev, t]
                        )
                      }
                      className={`rounded-full border px-2.5 py-0.5 text-[12px] transition disabled:opacity-40 ${
                        active
                          ? "border-orange bg-orange-tint text-orange-ink"
                          : "border-hair bg-paper text-muted hover:text-ink"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
            {postError && (
              <div className="mt-3 text-sm text-red-700">{postError}</div>
            )}
            <div className="mt-4 flex items-center justify-between text-[12px] text-muted">
              <span>
                {title.length}/{POST_TITLE_MAX} title ·{" "}
                {body.length}/{POST_BODY_MAX} body
              </span>
              <button
                onClick={submit}
                disabled={posting || title.trim().length < 4}
                className="btn-primary text-[13px] disabled:opacity-50"
              >
                {posting ? "Posting…" : "Post"}
              </button>
            </div>
          </div>
        )}

        <div className="mb-4 flex items-center gap-2 text-[13px]">
          <SortTab active={sort === "hot"} onClick={() => setSort("hot")}>
            Hot
          </SortTab>
          <SortTab active={sort === "new"} onClick={() => setSort("new")}>
            New
          </SortTab>
        </div>

        {posts === null ? (
          <div className="py-10 text-center text-sm text-muted">Loading…</div>
        ) : posts.length === 0 ? (
          <div className="rounded-xl bg-offwhite/60 p-10 text-center">
            <div className="text-[15px] text-ink">No posts here yet.</div>
            <p className="mt-2 text-[13px] text-muted">
              Be the first — click New post.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {posts.map((p) => (
              <li key={p.id}>
                <ForumPostRow post={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function SortTab({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 transition ${
        active
          ? "border-orange bg-orange-tint text-orange-ink"
          : "border-hair bg-paper text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

