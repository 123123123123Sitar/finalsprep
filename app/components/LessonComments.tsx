"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import UserAvatar from "@/app/components/UserAvatar";
import {
  relativeTime,
  validateCommentText,
  type LessonComment,
} from "@/lib/social";

type CommentTree = LessonComment & { replies: LessonComment[] };

function toTree(flat: LessonComment[]): CommentTree[] {
  const byParent = new Map<string, LessonComment[]>();
  const roots: LessonComment[] = [];
  for (const c of flat) {
    if (c.parentId) {
      const arr = byParent.get(c.parentId) || [];
      arr.push(c);
      byParent.set(c.parentId, arr);
    } else {
      roots.push(c);
    }
  }
  return roots.map((r) => ({
    ...r,
    replies: (byParent.get(r.id) || []).sort(
      (a, b) => a.createdAt - b.createdAt
    ),
  }));
}

export default function LessonComments({
  lessonKey,
}: {
  lessonKey: string;
}) {
  const { user, getIdToken } = useAuth();
  const [comments, setComments] = useState<LessonComment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newText, setNewText] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sortMode, setSortMode] = useState<"helpful" | "recent">("helpful");

  const loadComments = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/comments?lessonKey=${encodeURIComponent(lessonKey)}`
      );
      if (!res.ok) throw new Error("Couldn't load comments");
      const data = await res.json();
      setComments(data.comments || []);
    } catch (e: any) {
      setError(e?.message || "Couldn't load comments");
    }
  }, [lessonKey]);

  useEffect(() => {
    setComments(null);
    setError(null);
    loadComments();
  }, [loadComments]);

  async function submitComment(text: string, parentId: string | null) {
    const invalid = validateCommentText(text);
    if (invalid) {
      setError(invalid);
      return;
    }
    if (!user) {
      window.location.href = `/signin?next=${encodeURIComponent(
        window.location.pathname + window.location.search
      )}`;
      return;
    }
    const token = await getIdToken();
    if (!token) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lessonKey, text, parentId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Couldn't post comment");
      setComments((prev) => (prev ? [data.comment, ...prev] : [data.comment]));
      if (parentId) {
        setReplyText("");
        setReplyTo(null);
      } else {
        setNewText("");
      }
    } catch (e: any) {
      setError(e?.message || "Couldn't post comment");
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleVote(id: string) {
    if (!user) {
      window.location.href = `/signin?next=${encodeURIComponent(
        window.location.pathname + window.location.search
      )}`;
      return;
    }
    const token = await getIdToken();
    if (!token) return;
    // Optimistic update.
    setComments((prev) =>
      prev
        ? prev.map((c) => {
            if (c.id !== id) return c;
            const has = c.upvotes.includes(user.uid);
            return {
              ...c,
              upvotes: has
                ? c.upvotes.filter((u) => u !== user.uid)
                : [...c.upvotes, user.uid],
            };
          })
        : prev
    );
    try {
      await fetch(`/api/comments/${id}/vote`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Reload on failure to reconcile.
      loadComments();
    }
  }

  async function deleteComment(id: string) {
    if (!user) return;
    if (!confirm("Delete this comment?")) return;
    const token = await getIdToken();
    if (!token) return;
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setComments((prev) =>
        prev ? prev.filter((c) => c.id !== id && c.parentId !== id) : prev
      );
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    }
  }

  const tree = comments ? toTree(comments) : null;
  const sorted = tree
    ? [...tree].sort((a, b) =>
        sortMode === "helpful"
          ? b.upvotes.length - a.upvotes.length ||
            b.createdAt - a.createdAt
          : b.createdAt - a.createdAt
      )
    : null;

  return (
    <section className="mt-12 border-t border-hair pt-8">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h4 className="font-serif text-xl text-ink">
            Discussion
            {comments ? (
              <span className="ml-2 text-sm text-muted">
                {comments.length}
              </span>
            ) : null}
          </h4>
          <p className="mt-1 text-[13px] text-muted">
            Ask a question, share what clicked, help someone else.
          </p>
        </div>
        <div className="flex gap-1 text-[12px]">
          <button
            onClick={() => setSortMode("helpful")}
            className={`rounded-md px-2 py-1 ${
              sortMode === "helpful"
                ? "bg-ink text-paper"
                : "text-muted hover:bg-offwhite hover:text-ink"
            }`}
          >
            Most helpful
          </button>
          <button
            onClick={() => setSortMode("recent")}
            className={`rounded-md px-2 py-1 ${
              sortMode === "recent"
                ? "bg-ink text-paper"
                : "text-muted hover:bg-offwhite hover:text-ink"
            }`}
          >
            Most recent
          </button>
        </div>
      </div>

      {/* Composer */}
      <div className="mb-6 rounded-lg border border-hair bg-offwhite/50 p-3">
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder={
            user
              ? "Add to the discussion…"
              : "Sign in to join the discussion"
          }
          disabled={!user}
          rows={3}
          className="w-full resize-none rounded-md border border-hair bg-paper px-3 py-2 text-sm text-ink placeholder:text-dim focus:border-orange focus:outline-none"
          maxLength={2000}
        />
        <div className="mt-2 flex items-center justify-between text-[12px] text-muted">
          <span>{newText.length}/2000</span>
          <button
            onClick={() => submitComment(newText, null)}
            disabled={submitting || newText.trim().length < 2}
            className="btn-primary px-4 py-1.5 text-sm disabled:opacity-50"
          >
            {submitting ? "Posting…" : "Post comment"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {sorted === null ? (
        <div className="text-sm text-muted">Loading comments…</div>
      ) : sorted.length === 0 ? (
        <div className="rounded-md bg-offwhite/50 p-6 text-center text-sm text-muted">
          No comments yet. Be the first to start the discussion.
        </div>
      ) : (
        <ul className="space-y-5">
          {sorted.map((c) => (
            <CommentNode
              key={c.id}
              comment={c}
              currentUid={user?.uid}
              onVote={toggleVote}
              onDelete={deleteComment}
              onReply={(id) => {
                setReplyTo(id === replyTo ? null : id);
                setReplyText("");
              }}
              replyingTo={replyTo}
              replyText={replyText}
              setReplyText={setReplyText}
              onSubmitReply={(id) => submitComment(replyText, id)}
              submitting={submitting}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

function CommentNode({
  comment,
  currentUid,
  onVote,
  onDelete,
  onReply,
  replyingTo,
  replyText,
  setReplyText,
  onSubmitReply,
  submitting,
}: {
  comment: CommentTree;
  currentUid?: string;
  onVote: (id: string) => void;
  onDelete: (id: string) => void;
  onReply: (id: string) => void;
  replyingTo: string | null;
  replyText: string;
  setReplyText: (v: string) => void;
  onSubmitReply: (id: string) => void;
  submitting: boolean;
}) {
  const upvoted = !!currentUid && comment.upvotes.includes(currentUid);
  return (
    <li className="flex gap-3">
      <a href={`/users/${comment.uid}`} className="shrink-0">
        <UserAvatar
          seed={comment.uid}
          label={comment.displayName || comment.username}
          size="md"
        />
      </a>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-[13px]">
          <a
            href={`/users/${comment.uid}`}
            className="font-medium text-ink hover:underline"
          >
            {comment.displayName || comment.username}
          </a>
          <span className="text-dim">·</span>
          <span className="text-muted">{relativeTime(comment.createdAt)}</span>
        </div>
        <p className="mt-1 whitespace-pre-wrap text-[14.5px] text-body">
          {comment.text}
        </p>
        <div className="mt-2 flex items-center gap-4 text-[12px]">
          <button
            onClick={() => onVote(comment.id)}
            className={`flex items-center gap-1 rounded px-1.5 py-0.5 ${
              upvoted
                ? "bg-orange-tint text-orange-ink"
                : "text-muted hover:text-ink"
            }`}
          >
            <span aria-hidden="true">▲</span>
            <span>{comment.upvotes.length}</span>
          </button>
          <button
            onClick={() => onReply(comment.id)}
            className="text-muted hover:text-ink"
          >
            Reply
          </button>
          {currentUid === comment.uid && (
            <button
              onClick={() => onDelete(comment.id)}
              className="text-muted hover:text-red-600"
            >
              Delete
            </button>
          )}
        </div>

        {replyingTo === comment.id && (
          <div className="mt-3 rounded-md border border-hair bg-offwhite/50 p-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${comment.displayName || comment.username}…`}
              rows={2}
              className="w-full resize-none rounded border border-hair bg-paper px-2 py-1.5 text-sm text-ink placeholder:text-dim focus:border-orange focus:outline-none"
              maxLength={2000}
            />
            <div className="mt-1 flex justify-end gap-2 text-[12px]">
              <button
                onClick={() => onReply(comment.id)}
                className="rounded px-2 py-1 text-muted hover:text-ink"
              >
                Cancel
              </button>
              <button
                onClick={() => onSubmitReply(comment.id)}
                disabled={submitting || replyText.trim().length < 2}
                className="btn-primary px-3 py-1 text-[12px] disabled:opacity-50"
              >
                Reply
              </button>
            </div>
          </div>
        )}

        {comment.replies.length > 0 && (
          <ul className="mt-4 space-y-4 border-l-2 border-hair pl-4">
            {comment.replies.map((r) => (
              <li key={r.id} className="flex gap-3">
                <a href={`/users/${r.uid}`} className="shrink-0">
                  <UserAvatar
                    seed={r.uid}
                    label={r.displayName || r.username}
                    size="sm"
                  />
                </a>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[12.5px]">
                    <a
                      href={`/users/${r.uid}`}
                      className="font-medium text-ink hover:underline"
                    >
                      {r.displayName || r.username}
                    </a>
                    <span className="text-dim">·</span>
                    <span className="text-muted">
                      {relativeTime(r.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap text-[14px] text-body">
                    {r.text}
                  </p>
                  <div className="mt-1.5 flex items-center gap-3 text-[12px]">
                    <button
                      onClick={() => onVote(r.id)}
                      className={`flex items-center gap-1 rounded px-1.5 py-0.5 ${
                        currentUid && r.upvotes.includes(currentUid)
                          ? "bg-orange-tint text-orange-ink"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      <span aria-hidden="true">▲</span>
                      <span>{r.upvotes.length}</span>
                    </button>
                    {currentUid === r.uid && (
                      <button
                        onClick={() => onDelete(r.id)}
                        className="text-muted hover:text-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
