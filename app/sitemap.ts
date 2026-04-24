// XML sitemap generator. Next.js serves this at /sitemap.xml.
// Includes every public-facing page we want Google to index: the
// marketing pages, the blog index, every blog post, and every tag
// archive. Dynamic/auth-gated routes (/account, /study, /chat, etc.)
// are intentionally omitted — they need a logged-in session and
// indexing them leaks nothing useful.

import type { MetadataRoute } from "next";
import {
  getAllPostsSorted,
  getAllTagSlugs,
} from "@/lib/blogPosts";

const SITE = "https://www.finalsprep.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsSorted();
  const tagSlugs = getAllTagSlugs();

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(p.date + "T00:00:00Z"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tagPages: MetadataRoute.Sitemap = tagSlugs.map((slug) => ({
    url: `${SITE}/blog/tag/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...postPages, ...tagPages];
}
