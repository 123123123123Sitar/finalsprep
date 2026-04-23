// Individual blog post page. Server-rendered, statically generated at
// build time via generateStaticParams below. Each post gets its own
// <title>, <meta description>, OpenGraph tags, and JSON-LD Article
// payload so search engines can index and pretty-render the posts.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteNav from "@/app/components/SiteNav";
import { LogoMark } from "@/app/components/Logo";
import {
  getAllPostsSorted,
  getPostBySlug,
  getRelatedPosts,
  type BlogSection,
} from "@/lib/blogPosts";

type Props = {
  params: { slug: string };
};

// Prerender every post at build time. If we add a slug later, Next will
// pick it up automatically from the blogPosts list.
export function generateStaticParams() {
  return getAllPostsSorted().map((p) => ({ slug: p.slug }));
}

// Per-post metadata. Next uses this to fill in the document head during
// the static prerender, so each URL gets a unique title and description.
export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Not found - FinalsPrep Blog",
    };
  }
  // Prefer the explicit metaTitle (optimized for SERP length and
  // keyword density) when present; otherwise fall back to the visible
  // on-page title. This lets copywriters tune what Google shows without
  // changing the H1 students actually read.
  const seoTitle = post.metaTitle ?? post.title;
  return {
    title: `${seoTitle} | FinalsPrep`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: seoTitle,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: post.description,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    // Renders Next's default 404 page for unknown slugs.
    notFound();
  }
  const related = getRelatedPosts(post.slug, 3);

  // JSON-LD Article payload. Crawlers that parse structured data (Google,
  // Bing) use this to build rich search results and Discover cards.
  // The headline here matches the on-page H1 (not the meta title) so the
  // schema is consistent with the visible content, which is what Google
  // prefers.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "FinalsPrep",
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.finalsprep.com/blog/${post.slug}`,
    },
  };

  return (
    <main className="bg-paper text-body">
      <SiteNav />

      {/* Structured data injected inline. React will render this as a
          plain <script> tag in the HTML output. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 pt-12 pb-20">
        {/* Breadcrumb lets the reader back out without hitting the nav
            again, and gives search engines an explicit hierarchy. */}
        <nav className="mb-6 flex items-center gap-1 text-[12px] text-muted">
          <a href="/" className="hover:text-ink">
            Home
          </a>
          <span aria-hidden>/</span>
          <a href="/blog" className="hover:text-ink">
            Blog
          </a>
          <span aria-hidden>/</span>
          <span className="truncate text-body">{post.category}</span>
        </nav>

        <header>
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wider text-muted">
            <span className="rounded-full bg-orange/10 px-2.5 py-1 text-orange-ink">
              {post.category}
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-[18px] leading-relaxed text-body">
            {post.description}
          </p>
          <div className="mt-6 flex items-center gap-3 border-b border-hair pb-6">
            <LogoMark size={24} className="text-ink flex-shrink-0" />
            <div className="text-[13px]">
              <div className="font-medium text-ink">{post.author}</div>
            </div>
          </div>
        </header>

        {/* Body. The renderer below dispatches on section type. Section
            styles live here rather than in a shared prose class because
            we want per-type control (callouts, code, math). */}
        <div className="mt-8 space-y-5 text-[17px] leading-[1.75]">
          {post.content.map((section, i) => (
            <Section key={i} section={section} />
          ))}
        </div>

        {/* Tag chips. Not link-throughs since we don't have a tag index
            yet, but they still carry the keywords into the rendered page
            for SEO and give the reader a sense of topic at a glance. */}
        {post.keywords.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-hair pt-6">
            {post.keywords.map((k) => (
              <span
                key={k}
                className="rounded-full border border-hair bg-offwhite/60 px-3 py-1 text-[11px] text-muted"
              >
                {k}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* End-of-post CTA. Lower-pressure than the landing page since
          readers here are further down the funnel, but still one click
          from trying the tutor. */}
      <section className="border-y border-hair bg-offwhite/50">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center">
          <div className="label mb-3">Try it while it's fresh</div>
          <h2 className="font-serif text-3xl font-normal text-ink">
            Walk through your next AP problem with the tutor.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-body">
            Paste a problem or snap a picture of your homework. The
            FinalsPrep tutor walks through it the way this article just
            did. Free tier. No card required.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="/study" className="btn-primary">
              Open the tutor
            </a>
            <a href="/blog" className="btn-ghost">
              Back to the blog
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-14">
          <div className="label mb-5">Keep reading</div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <a
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group flex flex-col rounded-lg border border-hair bg-paper p-6 transition hover:border-orange/40 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-muted">
                  <span className="text-orange-ink/80">{r.category}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={r.date}>{formatDate(r.date)}</time>
                </div>
                <h3 className="mt-3 font-serif text-lg font-normal leading-snug text-ink transition group-hover:text-orange-ink">
                  {r.title}
                </h3>
                <div className="mt-4 text-[12px] text-orange-ink">
                  Read →
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

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

// Dispatch table from section type -> rendered JSX. Keeping this as a
// switch rather than a registry so the exhaustive check still works.
function Section({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "p":
      return <p className="text-body">{section.text}</p>;
    case "h2":
      return (
        <h2 className="mt-10 border-t border-hair pt-8 font-serif text-2xl font-normal leading-tight text-ink sm:text-3xl">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-6 font-serif text-xl font-normal leading-tight text-ink">
          {section.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="ml-5 list-disc space-y-2 text-body marker:text-orange/60">
          {section.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="ml-5 list-decimal space-y-2 text-body marker:font-semibold marker:text-orange-ink">
          {section.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case "callout": {
      // Three callout variants. Tip is green, note is neutral/orange,
      // warn is amber. The left border does the coloring work; the
      // background is a softer tint so the callout stands out but
      // doesn't scream.
      const styles = {
        tip: "border-emerald-300/70 bg-emerald-50/60 text-emerald-900",
        note: "border-orange/40 bg-orange-tint text-orange-ink",
        warn: "border-amber-400/70 bg-amber-50/60 text-amber-900",
      } as const;
      const labels = {
        tip: "Tip",
        note: "Note",
        warn: "Watch out",
      } as const;
      return (
        <div
          className={`rounded-r-md border-l-4 px-5 py-4 text-[16px] leading-relaxed ${styles[section.variant]}`}
        >
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider">
            {labels[section.variant]}
          </div>
          <div>{section.text}</div>
        </div>
      );
    }
    case "quote":
      return (
        <blockquote className="border-l-4 border-orange/50 pl-5 italic text-body">
          {section.text}
          {section.attribution && (
            <footer className="mt-2 text-sm not-italic text-muted">
              {section.attribution}
            </footer>
          )}
        </blockquote>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-md border border-hair bg-offwhite/70 p-4 font-mono text-[13px] leading-relaxed text-ink">
          <code>{section.text}</code>
        </pre>
      );
    case "math":
      // Rendered in a centered serif face so formulas feel distinct
      // from prose without dragging in a full math renderer.
      return (
        <div className="my-4 text-center font-serif text-[20px] italic text-ink">
          {section.text}
        </div>
      );
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
