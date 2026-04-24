"use client";

// Client-side blog search. Takes a pre-computed lightweight index of
// every post (title, description, excerpt, category, keywords, slug,
// readTime, date) and filters it in-memory on every keystroke.
//
// The index is intentionally not shipped with full article bodies —
// that would balloon the JS bundle. Body matches would be nice to
// have, but title/description/category/keywords cover 90 percent of
// what people actually search for.

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export type SearchEntry = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  keywords: string[];
  readTime: string;
  date: string;
  type: "general" | "subject";
};

export default function SearchClient({
  entries,
  initialQuery,
}: {
  entries: SearchEntry[];
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when the page loads so users can start typing
  // immediately.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keep the URL in sync with the current query so users can share or
  // bookmark search results.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.toString());
  }, [query]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    const terms = q.split(/\s+/).filter(Boolean);
    return entries
      .map((e) => ({
        entry: e,
        score: scoreEntry(e, terms),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.entry);
  }, [query, entries]);

  return (
    <div>
      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search review guides, study strategies, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-hair bg-paper px-5 py-4 pr-12 text-[17px] text-ink placeholder:text-muted focus:border-orange/60 focus:outline-none focus:ring-2 focus:ring-orange-tint"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
        >
          ⌕
        </span>
      </div>

      <div className="mt-3 text-[13px] text-muted">
        {query.trim() === ""
          ? `${entries.length} posts in the archive`
          : `${results.length} ${
              results.length === 1 ? "result" : "results"
            } for "${query.trim()}"`}
      </div>

      <div className="mt-8 divide-y divide-hair">
        {results.length === 0 ? (
          <div className="py-12 text-center text-body">
            <div className="font-serif text-xl text-ink">
              No matches.
            </div>
            <p className="mt-2 text-[14px] text-muted">
              Try a broader term like "AP Calculus" or browse{" "}
              <Link href="/blog" className="text-orange-ink hover:underline">
                all posts
              </Link>
              .
            </p>
          </div>
        ) : (
          results.map((r) => (
            <Link
              key={r.slug}
              href={`/blog/${r.slug}`}
              className="group flex flex-col gap-2 py-5 transition hover:bg-offwhite/50"
            >
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted">
                <span className="rounded-full bg-orange-tint px-2 py-0.5 text-orange-ink">
                  {r.category}
                </span>
                <time dateTime={r.date}>{formatDate(r.date)}</time>
                <span aria-hidden>·</span>
                <span>{r.readTime}</span>
              </div>
              <h3 className="font-serif text-[22px] font-normal leading-snug text-ink transition group-hover:text-orange-ink">
                {r.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-body line-clamp-2">
                {r.excerpt}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

// Simple relevance scoring. Title hits weigh most, then category,
// keywords, description, excerpt. Multi-word queries require all terms
// to appear somewhere (AND semantics), which matches user expectations
// for short queries.
function scoreEntry(entry: SearchEntry, terms: string[]): number {
  const title = entry.title.toLowerCase();
  const category = entry.category.toLowerCase();
  const description = entry.description.toLowerCase();
  const excerpt = entry.excerpt.toLowerCase();
  const keywords = entry.keywords.join(" ").toLowerCase();
  let total = 0;
  for (const t of terms) {
    let s = 0;
    if (title.includes(t)) s += 10;
    if (category.includes(t)) s += 6;
    if (keywords.includes(t)) s += 4;
    if (description.includes(t)) s += 2;
    if (excerpt.includes(t)) s += 1;
    // AND: if any term has zero matches, the whole entry is filtered.
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
