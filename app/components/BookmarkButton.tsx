"use client";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";
import {
  addBookmark,
  bookmarkRef,
  removeBookmark,
  type Bookmark,
} from "@/lib/bookmarks";

export default function BookmarkButton(props: {
  bookmark: Bookmark;
  size?: "sm" | "md";
}) {
  const { user, plan } = useAuth();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const canUse = plan === "pro" || plan === "hacker";

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    const unsub = onSnapshot(
      bookmarkRef(db, user.uid, props.bookmark.slug),
      (snap) => setSaved(snap.exists()),
      () => setSaved(false)
    );
    return () => unsub();
  }, [user, props.bookmark.slug]);

  async function toggle() {
    if (!user || !canUse) {
      window.location.href = canUse
        ? `/signin?next=${encodeURIComponent(window.location.pathname + window.location.search)}`
        : "/#price";
      return;
    }
    const db = getDb();
    if (!db) return;
    setBusy(true);
    try {
      if (saved) {
        await removeBookmark(db, user.uid, props.bookmark.slug);
      } else {
        await addBookmark(db, user.uid, props.bookmark);
      }
    } finally {
      setBusy(false);
    }
  }

  const sizeClass =
    props.size === "sm"
      ? "h-7 px-2 text-xs"
      : "h-9 px-3 text-sm";

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={`inline-flex items-center gap-1.5 rounded-md border ${sizeClass} ${
        saved
          ? "border-orange bg-orange-tint text-orange-ink"
          : "border-hair bg-paper text-muted hover:border-rule hover:text-ink"
      } disabled:opacity-50`}
      title={
        !canUse
          ? "Bookmarks are a Pro feature"
          : saved
          ? "Remove bookmark"
          : "Bookmark this lesson"
      }
      aria-pressed={saved}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        aria-hidden="true"
      >
        <path
          d="M6 3.75A1.75 1.75 0 0 1 7.75 2h8.5A1.75 1.75 0 0 1 18 3.75v17.19a.5.5 0 0 1-.79.4L12 17.35l-5.21 3.99a.5.5 0 0 1-.79-.4V3.75Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <span>{saved ? "Bookmarked" : "Bookmark"}</span>
    </button>
  );
}
