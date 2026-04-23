// The blog index. Server-rendered so search engines see the full list
// of posts in the initial HTML. Layout is editorial: masthead up top,
// a featured-story hero, a mixed recent grid, a full review-guide
// library, and a popular-tags rail for navigation.

import type { Metadata } from "next";
import Link from "next/link";
import BlogMasthead from "@/app/components/BlogMasthead";
import {
  getGeneralPostsSorted,
  getSubjectPostsSorted,
  tagToSlug,
  type BlogPost,
} from "@/lib/blogPosts";

export const metadata: Metadata = {
  title:
    "FinalsPrep Blog | AP Exam Review Guides and Study Plans",
  description:
    "Practical AP exam study plans and unit-by-unit review guides for every major AP class. Covers AP Calculus, Physics, Chemistry, Biology, Statistics, APUSH, World History, CSA, and APES.",
  openGraph: {
    title: "FinalsPrep Blog: AP Exam Guides for Every Class",
    description:
      "AP exam study plans and unit-by-unit review guides. AP Calc AB/BC, Physics 1, Chem, Bio, Stats, APUSH, World History, CSA, APES, Psych, HuG, Micro, Macro, Lang, Precalc.",
    type: "website",
  },
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
  const generalPosts = getGeneralPostsSorted();
  const subjectPosts = getSubjectPostsSorted();
  const [heroPost, ...restGeneral] = generalPosts;

  // Popular tags rail. Pulls keywords from every post, counts them, and
  // picks the top 14. Gives readers an alternate way into the archive.
  const tagCounts = new Map<string, { display: string; count: number }>();
  for (const p of [...generalPosts, ...subjectPosts]) {
    for (const k of p.keywords) {
      const slug = tagToSlug(k);
      const existing = tagCounts.get(slug);
      if (existing) existing.count += 1;
      else tagCounts.set(slug, { display: k, count: 1 });
    }
  }
  const popularTags = [...tagCounts.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 14);

  return (
    <main className="bg-paper text-body">
      <BlogMasthead />

      {/* Editorial intro. Big serif headline + a one-liner, framed with
          datelines to reinforce the "journal" vibe. */}
      <header className="border-b border-hair bg-offwhite/30">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted">
            <span>AP Exam Preparation</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-[44px] font-normal leading-[1.02] tracking-tight text-ink sm:text-[64px]">
            AP exam guides that
            <br />
            <span className="italic text-orange-ink">actually</span> help.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-body">
            Study plans, exam-day guides, and unit-by-unit review guides
            for every major AP class. Written by tutors, read in a sitting,
            and short on filler.
          </p>
        </div>
      </header>

      {/* FEATURED STORY. Big two-column spread (art on right, copy on
          left) so the top of the feed feels like a front page. */}
      {heroPost && (
        <section aria-labelledby="featured-heading" className="border-b border-hair">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted">
              <span className="h-px w-8 bg-hair" aria-hidden />
              <span id="featured-heading">Lead story</span>
              <span className="h-px flex-1 bg-hair" aria-hidden />
            </div>
            <FeaturedStory post={heroPost} />
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-6">
        {/* LATEST (general articles). A 2-up editorial grid for the rest
            of the general posts. Styled like newspaper columns. */}
        {restGeneral.length > 0 && (
          <section aria-labelledby="latest-heading" className="py-14">
            <SectionHeading
              kicker="From the editors"
              title="Latest in study strategy"
              count={`${restGeneral.length} article${restGeneral.length === 1 ? "" : "s"}`}
              id="latest-heading"
            />
            <div className="mt-8 grid gap-x-10 gap-y-10 md:grid-cols-2">
              {restGeneral.map((post, i) => (
                <EditorialCard key={post.slug} post={post} position={i} />
              ))}
            </div>
          </section>
        )}

        {/* REVIEW GUIDES. Three-column grid. Feels like a "library" or
            archive section of the journal. */}
        {subjectPosts.length > 0 && (
          <section
            aria-labelledby="review-guides-heading"
            className="scroll-mt-20 border-t border-hair py-14"
            id="review-guides"
          >
            <SectionHeading
              kicker="The library"
              title="Review guides by AP class"
              count={`${subjectPosts.length} guide${subjectPosts.length === 1 ? "" : "s"}`}
              id="review-guides-heading"
            />
            <p className="mt-3 max-w-2xl text-[15px] text-body">
              Unit-by-unit reviews for every major AP course, with the
              skills, formulas, and FRQ patterns that earn the points.
            </p>
            <div className="mt-8 grid gap-[1px] overflow-hidden rounded-xl border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-3">
              {subjectPosts.map((post) => (
                <ReviewGuideCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* POPULAR TAGS. A rail of clickable tags so readers have a
            second, topic-first way into the archive. */}
        {popularTags.length > 0 && (
          <section className="border-t border-hair py-12">
            <SectionHeading
              kicker="Browse by topic"
              title="Popular tags"
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {popularTags.map(([slug, { display, count }]) => (
                <Link
                  key={slug}
                  href={`/blog/tag/${slug}`}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-hair bg-paper px-3.5 py-1.5 text-[13px] text-body transition hover:border-orange/60 hover:bg-orange-tint hover:text-orange-ink"
                >
                  <span>{display}</span>
                  <span className="text-[11px] text-muted group-hover:text-orange-ink">
                    {count}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* End-of-feed CTA. */}
        <section className="mb-20 mt-4 rounded-2xl border border-hair bg-gradient-to-br from-orange-tint via-offwhite/40 to-offwhite/60 px-8 py-14 text-center">
          <div className="label mb-3">Ready to try the tutor?</div>
          <h2 className="font-serif text-3xl font-normal text-ink sm:text-4xl">
            Paste a problem. Get a walkthrough.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body">
            The same frameworks you read about here are how the
            FinalsPrep tutor walks through any AP problem you give it.
            Free tier is real and covers the whole CED.
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

// Section heading used across the index page. Keeps the typography
// consistent (kicker / title / optional count badge) without repeating
// the class salad inline.
function SectionHeading({
  kicker,
  title,
  count,
  id,
}: {
  kicker: string;
  title: string;
  count?: string;
  id?: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-orange-ink/80">
          {kicker}
        </div>
        <h2
          id={id}
          className="mt-2 font-serif text-[32px] font-normal leading-tight text-ink sm:text-[40px]"
        >
          {title}
        </h2>
      </div>
      {count && (
        <div className="rounded-full border border-hair px-3 py-1 text-[11px] uppercase tracking-wider text-muted">
          {count}
        </div>
      )}
    </div>
  );
}

// Front-page lead story. The only card that gets the full two-column
// magazine treatment — bold dateline, giant serif headline, pull-quote
// deck, and a decorative number. Reserved for the newest general post.
function FeaturedStory({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group grid gap-8 md:grid-cols-[1.25fr_1fr]"
    >
      <div>
        <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="rounded-full bg-orange-tint px-2.5 py-1 text-orange-ink">
            Featured
          </span>
          <span>{post.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="mt-5 font-serif text-[36px] font-normal leading-[1.05] tracking-tight text-ink transition group-hover:text-orange-ink sm:text-[52px]">
          {post.title}
        </h3>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-body">
          {post.excerpt}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-orange-ink">
          Read the article
          <span className="transition group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </div>
      </div>
      {/* Decorative right column — a stylized "01" drop-numeral backed
          by a soft gradient to replace the missing hero image slot. */}
      <div className="relative hidden overflow-hidden rounded-xl border border-hair bg-gradient-to-br from-orange-tint via-offwhite/60 to-paper md:block">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(194,65,12,0.10),_transparent_60%)]"
        />
        <div className="relative flex h-full flex-col justify-between p-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted">
            Today's read
          </div>
          <div className="pointer-events-none select-none font-serif text-[200px] leading-none text-ink/10">
            01
          </div>
          <div className="flex items-center gap-2 text-[13px] text-body">
            <span className="h-px flex-1 bg-hair" aria-hidden />
            <span>By {post.author}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

// Editorial card used for the rest of the general posts. Large serif
// headline, kicker above, a thin rule separates it from neighboring
// cards so the grid reads like a newspaper column layout.
function EditorialCard({
  post,
  position,
}: {
  post: BlogPost;
  position: number;
}) {
  const number = String(position + 2).padStart(2, "0");
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col border-b border-hair pb-10 last:border-b-0 sm:border-b-0"
    >
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted">
        <span className="font-mono text-orange-ink/70">{number}</span>
        <span aria-hidden>·</span>
        <span>{post.category}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <h3 className="mt-4 font-serif text-[26px] font-normal leading-[1.15] tracking-tight text-ink transition group-hover:text-orange-ink sm:text-[30px]">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-body">
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

// Compact card used inside the review-guide library grid. Uses a flat
// white tile with hairline gridlines (rendered by the parent `gap-[1px]`
// trick) so the whole library reads like a contact sheet.
function ReviewGuideCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col gap-3 bg-paper p-6 transition hover:bg-offwhite/60"
    >
      <div className="text-[10px] uppercase tracking-[0.2em] text-orange-ink/80">
        {post.category}
      </div>
      <h3 className="font-serif text-[18px] font-normal leading-snug text-ink transition group-hover:text-orange-ink">
        {post.title}
      </h3>
      <p className="flex-1 text-[13.5px] leading-relaxed text-body">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span>{post.readTime}</span>
        <span className="font-medium text-orange-ink transition group-hover:translate-x-0.5">
          Read →
        </span>
      </div>
    </a>
  );
}

// Dates render as "April 10, 2026" per AP Style. Local helper so we
// don't drag in a date library for a single format.
function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
