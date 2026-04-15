"use client";
import { useEffect, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";
import {
  removeBookmark,
  subscribeBookmarks,
  type Bookmark,
} from "@/lib/bookmarks";

export default function BookmarksPage() {
  const { user, loading, plan } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);
  const canUse = plan === "pro" || plan === "hacker";

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    const unsub = subscribeBookmarks(db, user.uid, setBookmarks);
    return () => unsub();
  }, [user]);

  async function remove(slug: string) {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    await removeBookmark(db, user.uid, slug);
  }

  return (
    <main className="min-h-screen bg-paper text-body">
      <SiteNav sticky />
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <div className="label mb-4">Your library</div>
        <h1 className="font-serif text-4xl font-normal text-ink sm:text-5xl">
          Bookmarks
        </h1>
        <p className="mt-3 text-muted">
          Lessons you've saved. Click to jump back in.
        </p>

        <div className="mt-10">
          {loading ? (
            <div className="text-sm text-muted">Loading…</div>
          ) : !user ? (
            <div className="rounded-xl border border-hair bg-offwhite p-6 text-sm text-muted">
              <a href="/signin" className="text-ink underline">
                Sign in
              </a>{" "}
              to see your bookmarks.
            </div>
          ) : !canUse ? (
            <div className="rounded-xl border-2 border-orange/40 bg-orange-tint p-6">
              <div className="label text-orange-ink">Pro feature</div>
              <p className="mt-2 text-ink">
                Bookmarks, themes, and highlighting are part of Pro.
              </p>
              <a href="/#price" className="btn-primary mt-4 inline-flex">
                See Pro - $11 first month
              </a>
            </div>
          ) : bookmarks === null ? (
            <div className="text-sm text-muted">Loading your bookmarks…</div>
          ) : bookmarks.length === 0 ? (
            <div className="rounded-xl border border-hair bg-offwhite p-6 text-sm text-muted">
              No bookmarks yet. Open a lesson and hit the ☆ button to save it
              for later.
            </div>
          ) : (
            <ul className="divide-y divide-hair border-y border-hair">
              {bookmarks.map((b) => (
                <li
                  key={b.slug}
                  className="flex items-start justify-between gap-4 py-4"
                >
                  <a
                    href={`/study?course=${encodeURIComponent(
                      b.courseSlug
                    )}&lesson=${encodeURIComponent(b.slug)}`}
                    className="min-w-0 flex-1"
                  >
                    <div className="meta">
                      {b.courseTitle}
                      {b.unitNumber
                        ? ` · Unit ${b.unitNumber}${
                            b.unitTitle ? `: ${b.unitTitle}` : ""
                          }`
                        : ""}
                    </div>
                    <div className="mt-1 font-serif text-xl text-ink">
                      {b.title}
                    </div>
                  </a>
                  <button
                    onClick={() => remove(b.slug)}
                    className="shrink-0 text-sm text-muted hover:text-ink"
                    title="Remove bookmark"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
