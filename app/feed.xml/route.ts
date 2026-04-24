// RSS 2.0 feed for the blog. Lives at /feed.xml. Emits every post
// newest-first, which is what feed readers expect. Description uses
// the post's excerpt (prose, not the full body) to keep the feed
// lightweight; readers who want the full article click through.
//
// NextResponse body is plain XML with the right Content-Type so
// autodiscovery (some readers GET and sniff) and manual subscription
// both work.

import { getAllPostsSorted } from "@/lib/blogPosts";

const SITE = "https://www.finalsprep.com";
const FEED_TITLE = "FinalsPrep Blog";
const FEED_DESCRIPTION =
  "AP exam review guides, study strategies, and subject-specific prep from FinalsPrep.";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPostsSorted();
  const lastBuildDate = new Date().toUTCString();
  const latestDate =
    posts.length > 0
      ? new Date(posts[0].date + "T00:00:00Z").toUTCString()
      : lastBuildDate;

  const items = posts
    .map((p) => {
      const url = `${SITE}/blog/${p.slug}`;
      const pubDate = new Date(p.date + "T00:00:00Z").toUTCString();
      const categories = [p.category, ...p.keywords]
        .map((c) => `<category>${escapeXml(c)}</category>`)
        .join("");
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
      <author>noreply@finalsprep.com (${escapeXml(p.author)})</author>
      ${categories}
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${latestDate}</pubDate>
${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
