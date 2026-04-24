// Blog post content lives here as plain TypeScript rather than MDX so we
// can ship without an MDX toolchain and keep the article renderer tiny.
// Each post is a list of typed "sections" that the renderer in
// app/blog/[slug]/page.tsx walks over. If you need a new section type
// (quote, image, table, etc.), add it here and extend the renderer.
//
// SEO notes:
//  - `title` drives the <h1> and the <title> tag. Keep it under ~65 chars
//    so it doesn't get truncated in Google SERPs.
//  - `description` fuels both <meta name="description"> and OpenGraph.
//    Aim for 150-160 chars, lead with the primary keyword, include the
//    benefit ("complete review", "unit-by-unit", etc.).
//  - `keywords` gets joined into the meta keywords tag and rendered as
//    subtle topic chips on the article page.
//  - Never use emdashes in copy. Use regular hyphens, colons, or commas.

export type BlogSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; variant: "tip" | "note" | "warn"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "code"; text: string; language?: string }
  // `math` renders centered in a serif face; we keep the syntax plain
  // text rather than KaTeX so the blog doesn't depend on the math stack.
  | { type: "math"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  // The meta title used in the <title> tag. Falls back to `title` if not
  // specified. Override when the on-page H1 and the SERP title should
  // differ (usually to pack more keywords into the SERP title).
  metaTitle?: string;
  description: string;
  excerpt: string;
  // ISO date string (YYYY-MM-DD). Used for sorting, sitemap, <time>, and
  // the schema.org Article payload we inject on the post page.
  date: string;
  readTime: string;
  category: string;
  // SEO keywords. Also rendered as subtle topic chips on the post page.
  keywords: string[];
  author: string;
  content: BlogSection[];
  // Drives the two-section layout on the blog index. "general" posts
  // apply across subjects (study planning, exam-day prep, AI tutor
  // usage) and get the hero slot on the index page. "subject" posts
  // are the per-course review guides.
  type: "general" | "subject";
};

// Ordered newest-first when the list renders. The date field is the
// source of truth, but we keep the array in publication order anyway so
// the data file reads chronologically top to bottom.
// Per-article modules live in ./blog/posts/<slug>.ts. Keeping each post
// in its own file makes diffs small and git blame per-article readable.
// The helpers below still read from the flat BLOG_POSTS array so no
// caller needs to change.
import { POST_AP_CALCULUS_AB_REVIEW_GUIDE } from "./blog/posts/ap-calculus-ab-review-guide";
import { POST_AP_PHYSICS_1_REVIEW_GUIDE } from "./blog/posts/ap-physics-1-review-guide";
import { POST_AP_CALCULUS_BC_REVIEW_GUIDE } from "./blog/posts/ap-calculus-bc-review-guide";
import { POST_AP_STATISTICS_REVIEW_GUIDE } from "./blog/posts/ap-statistics-review-guide";
import { POST_AP_CHEMISTRY_REVIEW_GUIDE } from "./blog/posts/ap-chemistry-review-guide";
import { POST_AP_BIOLOGY_REVIEW_GUIDE } from "./blog/posts/ap-biology-review-guide";
import { POST_AP_US_HISTORY_REVIEW_GUIDE } from "./blog/posts/ap-us-history-review-guide";
import { POST_AP_WORLD_HISTORY_REVIEW_GUIDE } from "./blog/posts/ap-world-history-review-guide";
import { POST_AP_COMPUTER_SCIENCE_A_REVIEW_GUIDE } from "./blog/posts/ap-computer-science-a-review-guide";
import { POST_AP_ENVIRONMENTAL_SCIENCE_REVIEW_GUIDE } from "./blog/posts/ap-environmental-science-review-guide";
import { POST_AP_PSYCHOLOGY_REVIEW_GUIDE } from "./blog/posts/ap-psychology-review-guide";
import { POST_AP_HUMAN_GEOGRAPHY_REVIEW_GUIDE } from "./blog/posts/ap-human-geography-review-guide";
import { POST_AP_MICROECONOMICS_REVIEW_GUIDE } from "./blog/posts/ap-microeconomics-review-guide";
import { POST_AP_MACROECONOMICS_REVIEW_GUIDE } from "./blog/posts/ap-macroeconomics-review-guide";
import { POST_AP_ENGLISH_LANGUAGE_REVIEW_GUIDE } from "./blog/posts/ap-english-language-review-guide";
import { POST_AP_PRECALCULUS_REVIEW_GUIDE } from "./blog/posts/ap-precalculus-review-guide";
import { POST_HOW_TO_STUDY_FOR_AP_EXAMS_FINAL_30_DAYS } from "./blog/posts/how-to-study-for-ap-exams-final-30-days";
import { POST_AP_EXAM_DAY_CHECKLIST } from "./blog/posts/ap-exam-day-checklist";
import { POST_BEST_AP_STUDY_SCHEDULE } from "./blog/posts/best-ap-study-schedule";
import { POST_SELF_STUDY_AP_EXAMS_GUIDE } from "./blog/posts/self-study-ap-exams-guide";
import { POST_HOW_TO_USE_AI_TUTOR_FOR_AP_PREP } from "./blog/posts/how-to-use-ai-tutor-for-ap-prep";
import { POST_AP_PHYSICS_2_REVIEW_GUIDE } from "./blog/posts/ap-physics-2-review-guide";
import { POST_AP_PHYSICS_C_MECHANICS_REVIEW_GUIDE } from "./blog/posts/ap-physics-c-mechanics-review-guide";
import { POST_AP_PHYSICS_C_ELECTRICITY_MAGNETISM_REVIEW_GUIDE } from "./blog/posts/ap-physics-c-electricity-magnetism-review-guide";
import { POST_AP_COMPUTER_SCIENCE_PRINCIPLES_REVIEW_GUIDE } from "./blog/posts/ap-computer-science-principles-review-guide";

export const BLOG_POSTS: BlogPost[] = [
  POST_AP_CALCULUS_AB_REVIEW_GUIDE,
  POST_AP_PHYSICS_1_REVIEW_GUIDE,
  POST_AP_CALCULUS_BC_REVIEW_GUIDE,
  POST_AP_STATISTICS_REVIEW_GUIDE,
  POST_AP_CHEMISTRY_REVIEW_GUIDE,
  POST_AP_BIOLOGY_REVIEW_GUIDE,
  POST_AP_US_HISTORY_REVIEW_GUIDE,
  POST_AP_WORLD_HISTORY_REVIEW_GUIDE,
  POST_AP_COMPUTER_SCIENCE_A_REVIEW_GUIDE,
  POST_AP_ENVIRONMENTAL_SCIENCE_REVIEW_GUIDE,
  POST_AP_PSYCHOLOGY_REVIEW_GUIDE,
  POST_AP_HUMAN_GEOGRAPHY_REVIEW_GUIDE,
  POST_AP_MICROECONOMICS_REVIEW_GUIDE,
  POST_AP_MACROECONOMICS_REVIEW_GUIDE,
  POST_AP_ENGLISH_LANGUAGE_REVIEW_GUIDE,
  POST_AP_PRECALCULUS_REVIEW_GUIDE,
  POST_HOW_TO_STUDY_FOR_AP_EXAMS_FINAL_30_DAYS,
  POST_AP_EXAM_DAY_CHECKLIST,
  POST_BEST_AP_STUDY_SCHEDULE,
  POST_SELF_STUDY_AP_EXAMS_GUIDE,
  POST_HOW_TO_USE_AI_TUTOR_FOR_AP_PREP,
  POST_AP_PHYSICS_2_REVIEW_GUIDE,
  POST_AP_PHYSICS_C_MECHANICS_REVIEW_GUIDE,
  POST_AP_PHYSICS_C_ELECTRICITY_MAGNETISM_REVIEW_GUIDE,
  POST_AP_COMPUTER_SCIENCE_PRINCIPLES_REVIEW_GUIDE,
];

// Sorts newest first by date for the blog index page.
export function getAllPostsSorted(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

// General posts (study strategy, exam day, AI tutoring). These get the
// top of the feed because they apply to any student regardless of which
// AP they are studying for, so they have broader appeal on first visit.
export function getGeneralPostsSorted(): BlogPost[] {
  return getAllPostsSorted().filter((p) => p.type === "general");
}

// Subject-specific posts. These are the per-course review guides; they
// live in their own section below the general posts on the index.
export function getSubjectPostsSorted(): BlogPost[] {
  return getAllPostsSorted().filter((p) => p.type === "subject");
}

// O(n) lookup is fine here: the list is small and this runs at build time.
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

// Grabs up to `limit` posts other than the current one, for the
// "keep reading" section on each post page. Prefers posts of the same
// type (subject-specific readers get more subject guides; general
// readers get more general posts), then falls back to any newest ones
// if that doesn't fill the slots.
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  const all = getAllPostsSorted().filter((p) => p.slug !== currentSlug);
  if (!current) return all.slice(0, limit);
  const sameType = all.filter((p) => p.type === current.type);
  const otherType = all.filter((p) => p.type !== current.type);
  return [...sameType, ...otherType].slice(0, limit);
}

// Turn a human-readable tag ("AP Calc AB review") into a URL-safe slug
// ("ap-calc-ab-review"). Kept stable so tag URLs don't change when copy
// is tweaked: only letters/digits are kept, everything else becomes a
// single dash.
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Reverse lookup: given a tag slug, find the canonical display form by
// matching against any keyword on any post. Returns the original tag
// string so the tag page can show "AP Calc AB review" instead of the
// dashed slug. Falls back to a title-cased version of the slug when no
// post uses the tag (shouldn't happen, but keeps the page rendering).
export function getTagDisplay(slug: string): string {
  for (const p of BLOG_POSTS) {
    for (const k of p.keywords) {
      if (tagToSlug(k) === slug) return k;
    }
  }
  return slug.replace(/-/g, " ");
}

// All distinct tag slugs across the blog. Used to prerender the tag
// pages at build time. The set dedupes when multiple keyword variants
// slugify to the same thing (e.g. "AP Calc AB" vs "ap calc ab").
export function getAllTagSlugs(): string[] {
  const set = new Set<string>();
  for (const p of BLOG_POSTS) {
    for (const k of p.keywords) set.add(tagToSlug(k));
  }
  return [...set];
}

// Posts that use a given tag (by slug, so case/punctuation doesn't
// matter). Sorted newest-first like everywhere else in the blog.
export function getPostsByTagSlug(slug: string): BlogPost[] {
  return getAllPostsSorted().filter((p) =>
    p.keywords.some((k) => tagToSlug(k) === slug)
  );
}
