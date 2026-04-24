// Individual blog post page. Server-rendered, statically generated at
// build time via generateStaticParams. Each post gets its own <title>,
// meta description, OpenGraph tags, and JSON-LD Article payload so
// search engines can index and pretty-render the posts.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogMasthead from "@/app/components/BlogMasthead";
import BlogComments from "@/app/components/BlogComments";
import BlogReadingProgress from "@/app/components/BlogReadingProgress";
import { LogoMark } from "@/app/components/Logo";
import {
  getAllPostsSorted,
  getPostBySlug,
  getRelatedPosts,
  tagToSlug,
  type BlogSection,
} from "@/lib/blogPosts";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPostsSorted().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Not found - FinalsPrep Blog",
    };
  }
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
    notFound();
  }
  const related = getRelatedPosts(post.slug, 3);

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

  // FAQ schema. Review guides include an h2 labelled "Common mistakes"
  // followed by a list, plus "How to score a 5" with an ordered list —
  // those convert naturally into FAQ entries for Google's rich-result
  // panel. We also pull out any h2 directly followed by a paragraph, so
  // all courses (even ones without the standard sections) get some FAQ
  // coverage. Only review-guide articles get FAQ markup; general posts
  // skip it.
  const faqItems = post.type === "subject" ? buildFaqItems(post.content) : [];
  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: it.a,
            },
          })),
        }
      : null;

  return (
    <main className="bg-paper text-body">
      <BlogReadingProgress />
      <BlogMasthead compact />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Back bar. A persistent, obvious "return to the blog" that sits
          just under the masthead so readers never feel stranded. */}
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
            <span className="truncate text-body">{post.category}</span>
          </nav>
        </div>
      </div>

      <div className="flex gap-8 mx-auto max-w-7xl px-6 pt-10 pb-12 sm:pt-14">
        {/* Table of Contents Sidebar. `data-blog-toc` marks the root so
            the client-side scroll-spy (see BlogReadingProgress) can find
            anchors to highlight. The CSS attribute selector
            `[data-blog-toc-active]` styles the active entry. */}
        <aside className="hidden lg:block flex-shrink-0 w-56">
          <div className="sticky top-20">
            <nav className="text-[13px]" data-blog-toc>
              <div className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted font-medium">
                On this page
              </div>
              <ul className="space-y-2">
                {post.content.map((section, i) => {
                  if (section.type === "h2") {
                    const slug = headingToSlug(section.text);
                    return (
                      <li key={i}>
                        <a
                          href={`#${slug}`}
                          className="block border-l-2 border-transparent pl-3 -ml-[2px] text-body transition hover:text-orange-ink data-[blog-toc-active]:border-orange-ink data-[blog-toc-active]:font-medium data-[blog-toc-active]:text-orange-ink"
                        >
                          {section.text}
                        </a>
                      </li>
                    );
                  }
                  if (section.type === "h3") {
                    const slug = headingToSlug(section.text);
                    return (
                      <li key={i}>
                        <a
                          href={`#${slug}`}
                          className="block border-l-2 border-transparent pl-5 -ml-[2px] text-muted transition hover:text-orange-ink data-[blog-toc-active]:border-orange-ink data-[blog-toc-active]:text-orange-ink"
                        >
                          {section.text}
                        </a>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Article */}
        <article className="flex-1 min-w-0">
          <header>
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="rounded-full bg-orange-tint px-2.5 py-1 text-orange-ink">
              {post.category}
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="mt-5 font-serif text-[40px] font-normal leading-[1.05] tracking-tight text-ink sm:text-[56px]">
            {post.title}
          </h1>
          <p className="mt-6 text-[19px] leading-relaxed text-body sm:text-[20px]">
            {post.description}
          </p>
          <div className="mt-8 flex items-center gap-3 border-y border-hair py-5">
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-hair bg-offwhite/60">
              <LogoMark size={22} className="text-ink" />
            </span>
            <div className="flex-1 text-[13px]">
              <div className="font-medium text-ink">{post.author}</div>
              <div className="text-muted">Written by the tutoring team</div>
            </div>
            <a
              href="#comments"
              className="hidden rounded-full border border-hair px-3 py-1.5 text-[12px] text-body transition hover:border-orange/50 hover:text-orange-ink sm:inline-flex"
            >
              Jump to discussion ↓
            </a>
          </div>
        </header>

        {/* Body. The renderer below dispatches on section type. */}
        <div className="mt-10 space-y-5 text-[17.5px] leading-[1.8]">
          {post.content.map((section, i) => (
            <Section key={i} section={section} isFirst={i === 0} />
          ))}
        </div>

        {/* Clickable tag chips. Each links to /blog/tag/<slug>. */}
        {post.keywords.length > 0 && (
          <div className="mt-12 border-t border-hair pt-6">
            <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted">
              Filed under
            </div>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((k) => (
                <Link
                  key={k}
                  href={`/blog/tag/${tagToSlug(k)}`}
                  className="rounded-full border border-hair bg-offwhite/60 px-3 py-1 text-[12px] text-body transition hover:border-orange/60 hover:bg-orange-tint hover:text-orange-ink"
                >
                  {k}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Inline tutor CTA for review guides. Drops in between the
            article body and the comments so a reader who just finished
            absorbing a unit can jump straight into asking a question.
            Only shown on subject-specific review guides. */}
        {post.type === "subject" && (
          <div className="mt-10 rounded-lg border border-orange/30 bg-orange-tint px-6 py-5 text-[14px] leading-relaxed text-orange-ink">
            <div className="text-[11px] uppercase tracking-[0.2em] text-orange-ink/80">
              Practice this with the tutor
            </div>
            <div className="mt-2 text-ink">
              Want to work through a {post.category} problem using the
              concepts in this guide? The tutor already knows the CED.
            </div>
            <a
              href={`/study?q=${encodeURIComponent(
                `Quiz me on ${post.category}. I just finished the FinalsPrep review guide.`
              )}`}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-orange-ink px-4 py-1.5 text-[12px] font-medium text-paper transition hover:opacity-90"
            >
              Open tutor with {post.category} context →
            </a>
          </div>
        )}

        {/* Back-to-blog link in the footer of the article, for readers
            who scrolled past it. */}
        <div className="mt-10 flex items-center justify-between border-t border-hair pt-6 text-[13px]">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-body hover:text-ink"
          >
            <span
              aria-hidden
              className="transition-transform group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Back to the blog
          </Link>
          <a
            href="#comments"
            className="text-orange-ink hover:underline"
          >
            Join the discussion ↓
          </a>
        </div>
        </article>
      </div>

      {/* Comments section. Client component so it can manage auth + fetch. */}
      <BlogComments blogSlug={post.slug} />

      {/* End-of-post CTA. On review guides (type === "subject") the CTA
          passes the course category in a `?q=` param so the tutor page
          can pre-fill the chat input. The general CTA is kept for
          non-subject posts where a course-specific prompt would be odd. */}
      <section className="border-y border-hair bg-offwhite/50">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center">
          <div className="label mb-3">Try it while it's fresh</div>
          {post.type === "subject" ? (
            <>
              <h2 className="font-serif text-3xl font-normal text-ink">
                Stuck on a {post.category} problem? Walk through it with the tutor.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-body">
                Paste a problem, snap a picture of your homework, or ask
                about any concept from this guide. The FinalsPrep tutor
                already knows the {post.category} CED. Free tier. No card
                required.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={`/study?q=${encodeURIComponent(
                    `Help me review ${post.category}. I just read "${post.title}".`
                  )}`}
                  className="btn-primary"
                >
                  Discuss {post.category} with the tutor
                </a>
                <a href="/blog" className="btn-ghost">
                  Back to the blog
                </a>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted">
            <span className="h-px w-8 bg-hair" aria-hidden />
            <span>Keep reading</span>
            <span className="h-px flex-1 bg-hair" aria-hidden />
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <a
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-hair bg-paper p-6 transition hover:border-orange/40 hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-orange-ink/80">
                  <span>{r.category}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={r.date} className="text-muted">
                    {formatDate(r.date)}
                  </time>
                </div>
                <h3 className="font-serif text-[18px] font-normal leading-snug text-ink transition group-hover:text-orange-ink">
                  {r.title}
                </h3>
                <div className="mt-1 text-[12px] text-orange-ink">
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

// Dispatch table from section type -> JSX. The `isFirst` flag lets the
// very first paragraph get a drop cap, a bit of editorial polish that
// sets the tone of a blog post.
function Section({
  section,
  isFirst,
}: {
  section: BlogSection;
  isFirst?: boolean;
}) {
  switch (section.type) {
    case "p":
      if (isFirst) {
        return (
          <p className="text-body first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-serif first-letter:text-[58px] first-letter:font-normal first-letter:leading-none first-letter:text-orange-ink">
            {section.text}
          </p>
        );
      }
      return <p className="text-body">{section.text}</p>;
    case "h2":
      return (
        <h2
          id={headingToSlug(section.text)}
          className="mt-12 border-t border-hair pt-8 font-serif text-2xl font-normal leading-tight text-ink sm:text-3xl scroll-mt-20"
        >
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={headingToSlug(section.text)}
          className="mt-6 font-serif text-xl font-normal leading-tight text-ink scroll-mt-20"
        >
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
      return (
        <div className="my-4 text-center font-serif text-[20px] italic text-ink">
          {section.text}
        </div>
      );
  }
}

function headingToSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Turn an article's sections into FAQ entries for schema.org FAQPage
// markup. Walk the content list, and whenever an h2 is followed by a
// paragraph, a ul, or an ol, treat the heading as a question and the
// following content as the answer. Lists are joined into one paragraph
// so the answer is readable when rendered by search engines.
function buildFaqItems(
  content: BlogSection[]
): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  for (let i = 0; i < content.length; i++) {
    const s = content[i];
    if (s.type !== "h2") continue;
    const next = content[i + 1];
    if (!next) continue;
    let answer: string | null = null;
    if (next.type === "p") answer = next.text;
    else if (next.type === "h3") {
      // Heading-next-heading: peek one more section ahead.
      const after = content[i + 2];
      if (after?.type === "p") answer = after.text;
      else if (after?.type === "ul" || after?.type === "ol")
        answer = after.items.join(" ");
    } else if (next.type === "ul" || next.type === "ol") {
      answer = next.items.join(" ");
    }
    if (answer) out.push({ q: s.text, a: answer });
  }
  // Cap at 10 to keep the schema lean; Google only highlights a handful.
  return out.slice(0, 10);
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
