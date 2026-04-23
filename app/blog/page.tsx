// The blog index. Server-rendered (no "use client" at the top) so search
// engines see the full list of posts in the initial HTML and the per-post
// metadata gets picked up during the static prerender.
//
// The feed has two sections:
//  1. General articles (study strategy, exam day, AI tutoring). Top of
//     the page, larger hero + roomier grid because they apply to every
//     student regardless of subject.
//  2. Subject-specific review guides (one per AP course). Grid of small
//     cards below.
//
// SEO notes:
//  - This page owns the <title> and a 150ish char meta description that
//    includes the core keywords (AP, review guide, study plan).
//  - Each post card links to /blog/[slug] so Google can crawl the tree.

import type { Metadata } from "next";
import SiteNav from "@/app/components/SiteNav";
import {
  getGeneralPostsSorted,
  getSubjectPostsSorted,
  type BlogPost,
} from "@/lib/blogPosts";

export const metadata: Metadata = {
  title:
    "AP Exam Review Guides and Study Plans for Every AP Class | FinalsPrep",
  description:
    "Practical AP exam study plans and unit-by-unit review guides for every major AP class. Covers AP Calculus, Physics, Chemistry, Biology, Statistics, APUSH, World History, CSA, and APES.",
  openGraph: {
    title: "AP Exam Review Guides for Every Class | FinalsPrep Blog",
    description:
      "AP exam study plans and unit-by-unit review guides. AP Calc AB/BC, Physics 1, Chem, Bio, Stats, APUSH, World History, CSA, APES, Psych, HuG, Micro, Macro, Lang, Precalc.",
    type: "website",
  },
  // Keywords are deprecated by Google but Bing/DDG still read them, and
  // it costs us nothing to include them.
  keywords: [
    "AP exam review guide",
    "AP study guide",
    "AP exam study plan",
    "AP tutoring blog",
    "how to study for AP exams",
    "AP exam day checklist",
    "self study AP exam",
    "AI tutor AP prep",
    "AP Calculus AB review",
    "AP Calculus BC review",
    "AP Physics 1 review",
    "AP Chemistry review",
    "AP Biology review",
    "AP Statistics review",
    "AP US History review",
    "AP World History review",
    "AP Computer Science A review",
    "AP Environmental Science review",
    "AP Psychology review",
    "AP Human Geography review",
    "AP Microeconomics review",
    "AP Macroeconomics review",
    "AP English Language review",
    "AP Precalculus review",
    "FinalsPrep",
  ],
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  // Fetch the sorted lists at render time. Since this is a server
  // component and the data is static, Next inlines this into the HTML.
  const generalPosts = getGeneralPostsSorted();
  const subjectPosts = getSubjectPostsSorted();
  // The hero card at the top uses the most recent general post, since
  // general posts are the "front door" to the blog.
  const [heroPost, ...restGeneral] = generalPosts;

  return (
    <main className="bg-paper text-body">
      <SiteNav />

      {/* Page header. Intentionally simple so the post cards get the
          visual weight. */}
      <header className="border-b border-hair bg-offwhite/40">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-14">
          <div className="label mb-3">Blog</div>
          <h1 className="font-serif text-5xl font-normal leading-[1.05] tracking-tight text-ink sm:text-6xl">
            AP exam guides that
            <br />
            <span className="italic">actually</span> help.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-body">
            Study plans, exam-day guides, and unit-by-unit review
            guides for every major AP class. Built by tutors, written
            for students. No filler.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* ---------- GENERAL ARTICLES (PROMINENT) ---------- */}
        {/* This block is above the fold and styled larger so general
            study strategy posts get the most attention. */}
        {generalPosts.length > 0 && (
          <section aria-labelledby="general-heading" className="mb-20">
            <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <div className="label mb-2">For every AP student</div>
                <h2
                  id="general-heading"
                  className="font-serif text-3xl font-normal leading-tight text-ink sm:text-4xl"
                >
                  Study plans and exam strategy
                </h2>
                <p className="mt-2 max-w-xl text-[15px] text-body">
                  Practical guides that apply to any AP class. Start
                  here if you are new to exam prep.
                </p>
              </div>
              <div className="text-[12px] text-muted">
                {generalPosts.length} article
                {generalPosts.length === 1 ? "" : "s"}
              </div>
            </div>

            {/* Hero card: the most recent general article. Full width
                and roomier so it anchors the feed. */}
            {heroPost && <HeroCard post={heroPost} />}

            {/* Remaining general articles in a 2-column grid. Uses
                LargeCard (bigger than the subject cards below) because
                these are the "featured" content. */}
            {restGeneral.length > 0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {restGeneral.map((post) => (
                  <LargeCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Visual divider between the two sections. */}
        <div
          aria-hidden
          className="mx-auto my-4 h-px max-w-3xl bg-gradient-to-r from-transparent via-hair to-transparent"
        />

        {/* ---------- SUBJECT-SPECIFIC REVIEW GUIDES ---------- */}
        {subjectPosts.length > 0 && (
          <section
            aria-labelledby="subject-heading"
            className="mt-20 scroll-mt-20"
            id="review-guides"
          >
            <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <div className="label mb-2">Review guides</div>
                <h2
                  id="subject-heading"
                  className="font-serif text-3xl font-normal leading-tight text-ink sm:text-4xl"
                >
                  Unit-by-unit guides by AP class
                </h2>
                <p className="mt-2 max-w-xl text-[15px] text-body">
                  Complete review guides for every major AP course,
                  with the skills, formulas, and FRQ strategies that
                  earn the points.
                </p>
              </div>
              <div className="text-[12px] text-muted">
                {subjectPosts.length} review guide
                {subjectPosts.length === 1 ? "" : "s"}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {subjectPosts.map((post) => (
                <SmallCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Soft CTA at the bottom of the list, because every blog visitor
            is a warm lead and shouldn't hit a dead end. */}
        <section className="mt-20 rounded-2xl border border-hair bg-offwhite/60 px-8 py-12 text-center">
          <div className="label mb-3">Ready to try the tutor?</div>
          <h2 className="font-serif text-3xl font-normal text-ink sm:text-4xl">
            Paste a problem. Get a walkthrough.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body">
            The same frameworks you read about here are how the
            FinalsPrep tutor walks through any AP problem you give
            it. Free tier is real and covers the whole CED.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="/study" className="btn-primary">
              Open the tutor
            </a>
            <a href="/" className="btn-ghost">
              See all features
            </a>
          </div>
        </section>
      </div>

      <footer className="border-t border-hair">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
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
            <a href="/privacy" className="hover:text-ink">
              Privacy
            </a>
            <a href="/terms" className="hover:text-ink">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Full-width hero card used for the newest general article. Styled to
// feel like the most important thing on the page: gradient accent, big
// type, generous padding. Don't use this for subject guides; it would
// drown out the real "top" of the feed.
function HeroCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-hair bg-paper p-8 transition hover:border-orange/50 hover:shadow-lg sm:p-12"
    >
      {/* Decorative corner gradient so the hero reads as the featured
          card even before the reader hovers. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-orange/15 via-amber-200/20 to-transparent blur-2xl"
      />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wider text-muted">
          <span className="rounded-full bg-orange/10 px-2.5 py-1 text-orange-ink">
            Featured
          </span>
          <span>{post.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink transition group-hover:text-orange-ink sm:text-4xl">
          {post.title}
        </h3>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-body sm:text-[17px]">
          {post.excerpt}
        </p>
        <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-orange-ink">
          Read the article
          <span className="transition group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </div>
      </div>
    </a>
  );
}

// Medium card used for the rest of the general articles. Larger type
// and padding than SmallCard so general posts still feel prominent even
// outside the hero slot.
function LargeCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-xl border border-hair bg-paper p-7 transition hover:border-orange/50 hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider text-muted">
        <span className="text-orange-ink/80">{post.category}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <h3 className="mt-3 font-serif text-xl font-normal leading-snug text-ink transition group-hover:text-orange-ink sm:text-2xl">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-body">
        {post.excerpt}
      </p>
      <div className="mt-5 flex items-center justify-between text-[12px] text-muted">
        <span>{post.readTime}</span>
        <span className="font-medium text-orange-ink transition group-hover:translate-x-0.5">
          Read →
        </span>
      </div>
    </a>
  );
}

// Compact card used for the subject-specific review guides. More of
// these fit per row, which is the point: the subject feed is
// browse-heavy and visitors usually arrive knowing which AP they want.
function SmallCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-lg border border-hair bg-paper p-5 transition hover:border-orange/40 hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-muted">
        <span className="text-orange-ink/80">{post.category}</span>
      </div>
      <h3 className="mt-2 font-serif text-[17px] font-normal leading-snug text-ink transition group-hover:text-orange-ink">
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-body">
        {post.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between text-[11px] text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="font-medium text-orange-ink transition group-hover:translate-x-0.5">
          Read →
        </span>
      </div>
    </a>
  );
}

// Renders dates as "April 10, 2026". Keeping this local to the page so
// we don't pull in a date library for a single format.
function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
