import Link from "next/link";
import SiteNav from "@/app/components/SiteNav";

// Blog masthead. Sits under the site nav on every /blog page and gives
// the section its own identity: big serif wordmark + a thin rule + a
// horizontal list of category links. The category strip serves as
// sub-navigation inside the blog so readers can jump straight to review
// guides or study strategy without bouncing back to the index.
//
// The categories are hard-coded because they're stable (the CED for each
// AP class changes rarely) and because the tag pages are prerendered
// from these slugs.
const BLOG_CATEGORIES: { label: string; href: string }[] = [
  { label: "All posts", href: "/blog" },
  { label: "Study strategy", href: "/blog/tag/study-strategy" },
  { label: "Study guides", href: "/blog/tag/study-guide" },
  { label: "STEM", href: "/blog/tag/stem" },
  { label: "Humanities", href: "/blog/tag/humanities" },
  { label: "FRQ strategy", href: "/blog/tag/frq-strategy" },
];

export default function BlogMasthead({
  compact = false,
}: {
  // `compact` trims the vertical padding for in-article pages where the
  // masthead is a header, not a landing moment. The index page uses the
  // roomy version; post pages use compact.
  compact?: boolean;
}) {
  return (
    <>
      <SiteNav />
      <div className="border-b border-hair bg-paper">
        <div
          className={`mx-auto flex max-w-6xl flex-col gap-3 px-6 ${
            compact ? "py-4" : "py-6"
          }`}
        >
          <div className="flex items-baseline justify-between gap-4">
            <Link
              href="/blog"
              className="group inline-flex items-baseline gap-2"
            >
              <span className="font-serif text-2xl leading-none text-ink sm:text-[28px]">
                FinalsPrep <span className="italic text-orange-ink">Blog</span>
              </span>
              <span className="hidden text-[11px] uppercase tracking-[0.18em] text-muted sm:inline">
                / AP prep, written plainly
              </span>
            </Link>
          </div>

          {/* Category strip. Horizontally scrollable on mobile so it
              doesn't wrap awkwardly. */}
          <nav
            aria-label="Blog categories"
            className="-mx-1 flex gap-1 overflow-x-auto"
          >
            {BLOG_CATEGORIES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="whitespace-nowrap rounded-full border border-transparent px-3 py-1 text-[13px] text-body transition hover:border-hair hover:bg-offwhite hover:text-ink"
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
