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
      <span aria-hidden="true">{saved ? "★" : "☆"}</span>
      <span>{saved ? "Saved" : "Save"}</span>
    </button>
  );
}
