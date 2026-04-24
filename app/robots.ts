// robots.txt. Next.js serves this at /robots.txt. Allows crawling of
// the marketing and blog surface. Disallows API routes and logged-in
// app pages, which aren't useful in search and create duplicate /
// parameter-pollution problems if crawlers find them.

import type { MetadataRoute } from "next";

const SITE = "https://www.finalsprep.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/account",
          "/admin",
          "/admin/",
          "/checkout",
          "/success",
          "/messages",
          "/signin",
          "/blog/search",
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
