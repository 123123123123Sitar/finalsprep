"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";
import {
  makeHighlightId,
  saveHighlights,
  subscribeAnnotations,
  type Highlight,
  type HighlightColor,
} from "@/lib/annotations";

const MARK_CLASS = "lesson-highlight";

const COLOR_BG: Record<HighlightColor, string> = {
  yellow: "rgba(254, 240, 138, 0.7)",
  green: "rgba(187, 247, 208, 0.75)",
  pink: "rgba(251, 207, 232, 0.75)",
};

// Applies saved highlights to its children as in-place <mark> spans. Also
// exposes an `addHighlight` hook so the text-selection tooltip can push new
// highlights into storage and have them re-render inline on the same text.
// Click a mark to remove that highlight.
export default function InlineHighlights({
  lessonSlug,
  children,
  onReady,
}: {
  lessonSlug: string;
  children: React.ReactNode;
  onReady?: (api: { addHighlight: (text: string) => void }) => void;
}) {
  const { user, plan } = useAuth();
  const canUse = plan === "pro" || plan === "hacker";
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const highlightsRef = useRef<Highlight[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    highlightsRef.current = highlights;
  }, [highlights]);

  // Subscribe to stored highlights for this lesson.
  useEffect(() => {
    if (!user || !canUse) {
      setHighlights([]);
      return;
    }
    const db = getDb();
    if (!db) return;
    const unsub = subscribeAnnotations(db, user.uid, lessonSlug, (a) => {
      setHighlights(a.highlights);
    });
    return () => unsub();
  }, [user, canUse, lessonSlug]);

  // Expose addHighlight to the parent (wired to the selection tooltip).
  useEffect(() => {
    if (!onReady) return;
    onReady({
      addHighlight: (text: string) => {
        if (!user || !canUse) return;
        const db = getDb();
        if (!db) return;
        const clean = text.trim();
        if (!clean) return;
        // Skip duplicates so re-highlighting the same text is a no-op.
        if (highlightsRef.current.some((h) => h.text === clean)) return;
        const next: Highlight = {
          id: makeHighlightId(),
          text: clean,
          color: "yellow",
          createdAt: Date.now(),
        };
        const updated = [next, ...highlightsRef.current];
        setHighlights(updated);
        void saveHighlights(db, user.uid, lessonSlug, updated);
      },
    });
  }, [onReady, user, canUse, lessonSlug]);

  // Apply / re-apply marks whenever highlights change.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    unwrapMarks(container);
    if (highlights.length === 0) return;
    for (const h of highlights) {
      applyHighlightToDom(container, h);
    }
  }, [highlights, lessonSlug]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const mark = target.closest(`mark.${MARK_CLASS}`) as HTMLElement | null;
      if (!mark) return;
      const id = mark.dataset.highlightId;
      if (!id || !user) return;
      const db = getDb();
      if (!db) return;
      e.preventDefault();
      e.stopPropagation();
      const updated = highlightsRef.current.filter((h) => h.id !== id);
      setHighlights(updated);
      void saveHighlights(db, user.uid, lessonSlug, updated);
    },
    [user, lessonSlug]
  );

  return (
    <div ref={containerRef} onClick={handleClick}>
      {children}
    </div>
  );
}

function unwrapMarks(container: HTMLElement) {
  const existing = container.querySelectorAll(`mark.${MARK_CLASS}`);
  existing.forEach((m) => {
    const parent = m.parentNode;
    if (!parent) return;
    while (m.firstChild) parent.insertBefore(m.firstChild, m);
    parent.removeChild(m);
  });
  container.normalize();
}

function applyHighlightToDom(container: HTMLElement, h: Highlight) {
  const needle = h.text;
  if (!needle) return;
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const el = (node as Text).parentElement;
      if (!el) return NodeFilter.FILTER_REJECT;
      // Skip text inside existing marks and rendered KaTeX math.
      if (el.closest(`mark.${MARK_CLASS}`)) return NodeFilter.FILTER_REJECT;
      if (el.closest(".katex, .katex-display, .katex-html"))
        return NodeFilter.FILTER_REJECT;
      // Skip the highlight toolbar + any interactive widgets.
      if (el.closest("[data-highlight-toolbar]")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const textNodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    textNodes.push(node as Text);
    node = walker.nextNode();
  }
  for (let n of textNodes) {
    // Wrap every occurrence within this text node.
    while (true) {
      const txt = n.nodeValue || "";
      const idx = txt.indexOf(needle);
      if (idx === -1) break;
      const match = n.splitText(idx);
      const remainder = match.splitText(needle.length);
      const mark = document.createElement("mark");
      mark.className = MARK_CLASS;
      mark.dataset.highlightId = h.id;
      mark.style.backgroundColor = COLOR_BG[h.color];
      mark.style.cursor = "pointer";
      mark.style.padding = "0 1px";
      mark.style.borderRadius = "2px";
      mark.title = "Click to remove highlight";
      match.parentNode?.insertBefore(mark, match);
      mark.appendChild(match);
      n = remainder;
      if (!n.nodeValue) break;
    }
  }
}
