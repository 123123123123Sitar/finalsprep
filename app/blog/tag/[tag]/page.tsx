// Tag archive page. Every keyword on every blog post becomes a slug
// here, and visitors can land on /blog/tag/<slug> to see every post
// filed under that tag. Prerendered statically via generateStaticParams.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogMasthead from "@/app/components/BlogMasthead";
import {
  getAllTagSlugs,
  getPostsByTagSlug,
  getTagDisplay,
  tagToSlug,
  type BlogPost,
} from "@/lib/blogPosts";

type Props = {
  params: { tag: string };
};

export function generateStaticParams() {
  return getAllTagSlugs().map((tag) => ({ tag }));
}

export function generateMetadata({ params }: Props): Metadata {
  const posts = getPostsByTagSlug(params.tag);
  const display = getTagDisplay(params.tag);
  if (posts.length === 0) {
    return { title: "Tag not found | FinalsPrep Blog" };
  }
  return {
    title: `${display}: Articles and Review Guides | FinalsPrep`,
    description: `Every FinalsPrep blog post tagged ${display}. ${posts.length} article${posts.length === 1 ? "" : "s"} covering AP exam prep, study strategy, and unit-by-unit review.`,
    alternates: {
      canonical: `/blog/tag/${params.tag}`,
    },
  };
}

export default function BlogTagPage({ params }: Props) {
  const posts = getPostsByTagSlug(params.tag);
  if (posts.length === 0) {
    notFound();
  }
  const display = getTagDisplay(params.tag);

  // Sibling tag chips: other tags that co-occur on the same posts.
  // Helpful for "related topics" style discovery.
  const relatedTags = new Map<string, { display: string; count: number }>();
  for (const p of posts) {
    for (const k of p.keywords) {
      const slug = tagToSlug(k);
      if (slug === params.tag) continue;
      const existing = relatedTags.get(slug);
      if (existing) existing.count += 1;
      else relatedTags.set(slug, { display: k, count: 1 });
    }
  }
  const related = [...relatedTags.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 12);

  return (
    <main className="bg-paper text-body">
      <BlogMasthead compact />

      {/* Back bar, mirrors the post page so the blog feels consistent. */}
      <div className="border-b border-hair bg-offwhite/40">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-3 text-[13px]">
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
          <nav
            aria-label="Breadcrumb"
            className="hidden items-center gap-1 text-[12px] text-muted sm:flex"
          >
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="hover:text-ink">
              Blog
            </Link>
            <span aria-hidden>/</span>
            <span className="text-body">Tag</span>
          </nav>
        </div>
      </div>

      <header className="border-b border-hair bg-offwhite/30">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted">
            Tag archive
          </div>
          <h1 className="mt-3 font-serif text-[42px] font-normal leading-[1.05] tracking-tight text-ink sm:text-[56px]">
            Filed under{" "}
            <span className="italic text-orange-ink">{display}</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] text-body">
            {posts.length} article{posts.length === 1 ? "" : "s"} tagged{" "}
            <span className="font-medium text-ink">{display}</span>. Sorted
            newest first.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <ul className="divide-y divide-hair">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <TagArticleRow post={post} index={i} />
            </li>
          ))}
        </ul>

        {related.length > 0 && (
          <section className="mt-14 border-t border-hair pt-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-orange-ink/80">
              Related topics
            </div>
            <h2 className="mt-2 font-serif text-2xl text-ink">
              Other tags these posts share
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {related.map(([slug, { display, count }]) => (
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

// Wide row used on the tag archive. Feels more like an article listing
// than a grid card — number, dateline, headline, excerpt.
function TagArticleRow({ post, index }: { post: BlogPost; index: number }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group grid gap-2 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-6"
    >
      <div className="hidden font-mono text-[14px] text-orange-ink/70 sm:block">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>{post.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="mt-2 font-serif text-[24px] font-normal leading-snug text-ink transition group-hover:text-orange-ink sm:text-[28px]">
          {post.title}
        </h3>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-body">
          {post.excerpt}
        </p>
      </div>
      <div className="hidden text-[12px] font-medium text-orange-ink transition group-hover:translate-x-0.5 sm:block sm:self-center">
        Read →
      </div>
    </a>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
