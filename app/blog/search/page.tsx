// Blog search page. Server component that builds a lightweight search
// index at build time (title/description/excerpt/category/keywords
// only — no article bodies) and hands it to a client component that
// filters in-memory on every keystroke.

import type { Metadata } from "next";
import Link from "next/link";
import BlogMasthead from "@/app/components/BlogMasthead";
import { getAllPostsSorted } from "@/lib/blogPosts";
import SearchClient, { type SearchEntry } from "./SearchClient";

export const metadata: Metadata = {
  title: "Search the Blog | FinalsPrep",
  description:
    "Search the FinalsPrep blog for AP exam review guides, study strategies, and subject-specific prep content.",
  alternates: {
    canonical: "/blog/search",
  },
  // Search pages shouldn't be indexed — they have no content of their
  // own, and crawlers finding them create duplicate-content headaches.
  robots: {
    index: false,
    follow: true,
  },
};

type Props = {
  searchParams: { q?: string };
};

export default function BlogSearchPage({ searchParams }: Props) {
  const posts = getAllPostsSorted();
  const entries: SearchEntry[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    excerpt: p.excerpt,
    category: p.category,
    keywords: p.keywords,
    readTime: p.readTime,
    date: p.date,
    type: p.type,
  }));
  const initialQuery = (searchParams.q ?? "").trim();

  return (
    <main className="bg-paper text-body">
      <BlogMasthead compact />

      <div className="border-b border-hair bg-offwhite/40">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-3 text-[13px]">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-md px-2 py-1 text-body transition hover:bg-paper hover:text-ink"
          >
            <span
              aria-hidden
              className="transition-transform group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Back to the blog
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-14">
        <header className="mb-8">
          <div className="label mb-3">Search</div>
          <h1 className="font-serif text-[40px] font-normal leading-[1.05] tracking-tight text-ink sm:text-[52px]">
            Find a review guide.
          </h1>
          <p className="mt-4 text-[18px] leading-relaxed text-body">
            Search every post by title, topic, AP course, or tag.
          </p>
        </header>

        <SearchClient entries={entries} initialQuery={initialQuery} />
      </div>

      <footer className="border-t border-hair">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} FinalsPrep, Inc.</div>
          <div className="flex gap-4">
            <a href="/" className="hover:text-ink">
              Home
            </a>
            <a href="/blog" className="hover:text-ink">
              Blog
            </a>
            <a href="/contact" className="hover:text-ink">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
