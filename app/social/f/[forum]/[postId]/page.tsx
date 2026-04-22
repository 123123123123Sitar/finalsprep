"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import SiteNav from "@/app/components/SiteNav";
import CommunityTabs from "@/app/components/CommunityTabs";
import PageLoader from "@/app/components/PageLoader";
import { useAuth } from "@/app/components/AuthProvider";
import { relativeTime } from "@/lib/social";
import {
  getSubforum,
  validateCommentBody,
  type ForumComment,
  type ForumPost,
} from "@/lib/forums";

type ResponseShape = { post: ForumPost; comments: ForumComment[] };

export default function ForumPostPage() {
  const params = useParams<{ forum: string; postId: string }>();
  const forumSlug = decodeURIComponent(String(params.forum || ""));
  const postId = String(params.postId || "");
  const forum = useMemo(() => getSubforum(forumSlug), [forumSlug]);

  const { user, getIdToken } = useAuth();
  const [data, setData] = useState<ResponseShape | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/forum/posts/${postId}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Couldn't load post");
      setData(json);
    } catch (e: any) {
      setError(e?.message || "Couldn't load post");
    }
  }, [postId]);

  useEffect(() => {
    load();
  }, [load]);

  async function vote(target: "post" | "comment", id: string, currentlyUp: boolean) {
    if (!user) {
      window.location.href = `/signin?next=/social/f/${forumSlug}/${postId}`;
      return;
    }
    const token = await getIdToken();
    if (!token) return;
    const op = currentlyUp ? "clear" : "up";
    const url =
      target === "post"
        ? `/api/forum/posts/${id}/vote`
        : `/api/forum/comments/${id}/vote`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ op }),
    });
    load();
  }

  async function postComment() {
    if (!user) {
      window.location.href = `/signin?next=/social/f/${forumSlug}/${postId}`;
      return;
    }
    const err = validateCommentBody(replyText);
    if (err) {
      setCommentError(err);
      return;
    }
    setSubmitting(true);
    setCommentError(null);
    try {
      const token = await getIdToken();
      if (!token) return;
      const res = await fetch(`/api/forum/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          body: replyText,
          parentId: replyTarget,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setCommentError(json?.error || "Could not comment.");
        return;
      }
      setReplyText("");
      setReplyTarget(null);
      load();
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteComment(id: string) {
    if (!confirm("Delete this comment?")) return;
    const token = await getIdToken();
    if (!token) return;
    await fetch(`/api/forum/comments/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  }

  async function deletePost() {
    if (!data) return;
    if (!confirm("Delete this whole post?")) return;
    const token = await getIdToken();
    if (!token) return;
    await fetch(`/api/forum/posts/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.href = `/social/f/${forumSlug}`;
  }

  if (!forum) {
    return (
      <main className="min-h-screen bg-paper">
        <SiteNav sticky />
        <CommunityTabs />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h1 className="font-serif text-3xl text-ink">Unknown forum</h1>
          <a href="/social" className="btn-primary mt-6 inline-block">
            Back to forums
          </a>
        </div>
      </main>
    );
  }

  if (!data && !error) {
    return (
      <main className="min-h-screen bg-paper">
        <SiteNav sticky />
        <CommunityTabs />
        <PageLoader />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-paper">
        <SiteNav sticky />
        <CommunityTabs />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h1 className="font-serif text-3xl text-ink">Post not found</h1>
          <p className="mt-2 text-sm text-muted">{error}</p>
          <a href={`/social/f/${forumSlug}`} className="btn-primary mt-6 inline-block">
            Back to f/{forumSlug}
          </a>
        </div>
      </main>
    );
  }

  const post = data.post;
  const tree = buildCommentTree(data.comments);
  const postVoted = !!user && post.upvotes.includes(user.uid);

  return (
    <main className="min-h-screen bg-paper">
      <SiteNav sticky />
      <CommunityTabs />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <a
          href={`/social/f/${post.forum}`}
          className="label text-muted hover:text-ink"
        >
          ← f/{post.forum}
        </a>

        <article className="mt-3 rounded-xl border border-hair bg-paper p-5">
          <div className="flex items-start gap-4">
            <VoteCol
              score={post.score}
              voted={postVoted}
              onClick={() => vote("post", post.id, postVoted)}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-muted">
                <a
                  href={`/users/${post.authorUid}`}
                  className="hover:text-ink hover:underline"
                >
                  @{post.authorUsername}
                </a>
                <span>·</span>
                <span>{relativeTime(post.createdAt)}</span>
                {user?.uid === post.authorUid && (
                  <>
                    <span>·</span>
                    <button
                      onClick={deletePost}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
              <h1 className="mt-1 font-serif text-[26px] leading-tight text-ink">
                {post.title}
              </h1>
              {post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-hair bg-offwhite px-2 py-0.5 text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {post.body && (
                <p className="mt-4 whitespace-pre-wrap text-[14.5px] leading-relaxed text-body">
                  {post.body}
                </p>
              )}
            </div>
          </div>
        </article>

        <section className="mt-6">
          <div className="label mb-3">
            {post.commentCount} comment{post.commentCount === 1 ? "" : "s"}
          </div>

          {user && replyTarget === null && (
            <CommentComposer
              placeholder="Add a comment…"
              value={replyText}
              onChange={setReplyText}
              onSubmit={postComment}
              submitting={submitting}
              error={commentError}
              onCancel={null}
            />
          )}
          {!user && (
            <div className="rounded-md border border-hair bg-offwhite p-3 text-[13.5px] text-muted">
              <a href="/signin" className="text-orange underline">
                Sign in
              </a>{" "}
              to comment.
            </div>
          )}

          <ul className="mt-5 space-y-5">
            {tree.map((node) => (
              <CommentNode
                key={node.comment.id}
                node={node}
                depth={0}
                currentUid={user?.uid ?? null}
                replyTarget={replyTarget}
                replyText={replyText}
                commentError={commentError}
                submitting={submitting}
                onVote={(id, up) => vote("comment", id, up)}
                onReplyClick={(id) => {
                  setReplyTarget((prev) => (prev === id ? null : id));
                  setReplyText("");
                  setCommentError(null);
                }}
                onReplyTextChange={setReplyText}
                onReplySubmit={postComment}
                onReplyCancel={() => {
                  setReplyTarget(null);
                  setReplyText("");
                }}
                onDelete={deleteComment}
              />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

type CommentNodeT = { comment: ForumComment; children: CommentNodeT[] };

function buildCommentTree(comments: ForumComment[]): CommentNodeT[] {
  const byId = new Map<string, CommentNodeT>();
  comments.forEach((c) => byId.set(c.id, { comment: c, children: [] }));
  const roots: CommentNodeT[] = [];
  comments.forEach((c) => {
    const node = byId.get(c.id)!;
    if (c.parentId && byId.has(c.parentId)) {
      byId.get(c.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
}

function VoteCol({
  score,
  voted,
  onClick,
}: {
  score: number;
  voted: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex shrink-0 flex-col items-center">
      <button
        onClick={onClick}
        aria-label={voted ? "Remove upvote" : "Upvote"}
        className={`grid h-7 w-7 place-items-center rounded-md transition ${
          voted
            ? "bg-orange text-white"
            : "text-muted hover:bg-offwhite hover:text-ink"
        }`}
      >
        ▲
      </button>
      <div className="mt-0.5 text-[13px] font-semibold text-ink">{score}</div>
    </div>
  );
}

function CommentNode({
  node,
  depth,
  currentUid,
  replyTarget,
  replyText,
  commentError,
  submitting,
  onVote,
  onReplyClick,
  onReplyTextChange,
  onReplySubmit,
  onReplyCancel,
  onDelete,
}: {
  node: CommentNodeT;
  depth: number;
  currentUid: string | null;
  replyTarget: string | null;
  replyText: string;
  commentError: string | null;
  submitting: boolean;
  onVote: (id: string, currentlyUp: boolean) => void;
  onReplyClick: (id: string) => void;
  onReplyTextChange: (s: string) => void;
  onReplySubmit: () => void;
  onReplyCancel: () => void;
  onDelete: (id: string) => void;
}) {
  const c = node.comment;
  const voted = !!currentUid && c.upvotes.includes(currentUid);
  const deleted = c.body === "[deleted]";
  return (
    <li className={depth > 0 ? "border-l border-hair pl-4" : ""}>
      <div className="flex items-start gap-3">
        <VoteCol
          score={c.upvotes.length}
          voted={voted}
          onClick={() => onVote(c.id, voted)}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 text-[12px] text-muted">
            {deleted ? (
              <span className="italic">[deleted]</span>
            ) : (
              <a
                href={`/users/${c.authorUid}`}
                className="font-medium text-ink hover:underline"
              >
                @{c.authorUsername}
              </a>
            )}
            <span>·</span>
            <span>{relativeTime(c.createdAt)}</span>
            {c.edited && !deleted && <span className="italic">(edited)</span>}
          </div>
          <p className="mt-1 whitespace-pre-wrap text-[14px] leading-relaxed text-body">
            {c.body}
          </p>
          {!deleted && (
            <div className="mt-1 flex items-center gap-3 text-[12px] text-muted">
              <button
                onClick={() => onReplyClick(c.id)}
                className="hover:text-ink"
              >
                Reply
              </button>
              {currentUid === c.authorUid && (
                <button
                  onClick={() => onDelete(c.id)}
                  className="hover:text-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          )}

          {replyTarget === c.id && (
            <div className="mt-3">
              <CommentComposer
                placeholder={`Reply to @${c.authorUsername}…`}
                value={replyText}
                onChange={onReplyTextChange}
                onSubmit={onReplySubmit}
                submitting={submitting}
                error={commentError}
                onCancel={onReplyCancel}
              />
            </div>
          )}

          {node.children.length > 0 && (
            <ul className="mt-4 space-y-4">
              {node.children.map((child) => (
                <CommentNode
                  key={child.comment.id}
                  node={child}
                  depth={depth + 1}
                  currentUid={currentUid}
                  replyTarget={replyTarget}
                  replyText={replyText}
                  commentError={commentError}
                  submitting={submitting}
                  onVote={onVote}
                  onReplyClick={onReplyClick}
                  onReplyTextChange={onReplyTextChange}
                  onReplySubmit={onReplySubmit}
                  onReplyCancel={onReplyCancel}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}

function CommentComposer({
  placeholder,
  value,
  onChange,
  onSubmit,
  submitting,
  error,
  onCancel,
}: {
  placeholder: string;
  value: string;
  onChange: (s: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string | null;
  onCancel: (() => void) | null;
}) {
  return (
    <div className="rounded-md border border-hair bg-paper p-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        maxLength={2000}
        className="w-full resize-y rounded-md border border-hair bg-offwhite/40 px-3 py-2 text-[14px] text-ink focus:border-orange focus:bg-paper focus:outline-none"
      />
      {error && <div className="mt-2 text-sm text-red-700">{error}</div>}
      <div className="mt-2 flex items-center justify-end gap-2 text-[12px]">
        {onCancel && (
          <button
            onClick={onCancel}
            className="rounded-md border border-hair px-2.5 py-1 text-muted hover:text-ink"
          >
            Cancel
          </button>
        )}
        <button
          onClick={onSubmit}
          disabled={submitting || value.trim().length < 2}
          className="btn-primary px-2.5 py-1 disabled:opacity-50"
        >
          {submitting ? "Posting…" : "Comment"}
        </button>
      </div>
    </div>
  );
}

