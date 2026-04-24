"use client";

// Reading progress bar + scroll-spy for the blog article page.
//
// Two features in one component because they share a scroll listener:
//  1. A thin orange bar across the top of the viewport that fills as
//     the reader scrolls through the article body.
//  2. Scroll-spy: finds the heading currently closest to the top of the
//     viewport and adds a `data-blog-toc-active` attribute to the
//     matching TOC anchor so CSS can highlight it.
//
// The article heading ids are set server-side (see page.tsx); this
// component only reads the DOM, so it is safe to render without having
// to re-pass the heading list as a prop.

import { useEffect, useState } from "react";

export default function BlogReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const tocLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-blog-toc] a")
    );
    const tocByHash = new Map<string, HTMLAnchorElement>();
    for (const a of tocLinks) {
      const hash = a.getAttribute("href") ?? "";
      if (hash.startsWith("#")) tocByHash.set(hash.slice(1), a);
    }

    const headings = Array.from(
      article.querySelectorAll<HTMLElement>("h2[id], h3[id]")
    );

    function update() {
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Distance scrolled past the top of the article as a fraction of
      // the article's scrollable length. Clamp to [0, 1].
      const total = rect.height - viewportH;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      setProgress(pct);

      // Scroll-spy: the heading nearest to 120px from the top wins.
      // 120px accounts for the sticky masthead/back bar.
      const marker = 120;
      let activeId: string | null = null;
      for (const h of headings) {
        const top = h.getBoundingClientRect().top;
        if (top <= marker) {
          activeId = h.id;
        } else {
          break;
        }
      }
      // If nothing has scrolled past the marker yet, highlight the first
      // heading so the TOC isn't blank.
      if (!activeId && headings.length > 0) activeId = headings[0].id;

      for (const [hash, link] of tocByHash) {
        if (hash === activeId) link.setAttribute("data-blog-toc-active", "");
        else link.removeAttribute("data-blog-toc-active");
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-50 h-0.5 bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-orange-ink transition-[width] duration-75 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
