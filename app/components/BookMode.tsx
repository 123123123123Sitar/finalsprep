"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const STORAGE_KEY = "fp-book-mode";

type BookModeCtx = {
  bookMode: boolean;
  setBookMode: (v: boolean) => void;
  toggleBookMode: () => void;
};

const BookModeContext = createContext<BookModeCtx | null>(null);

export function BookModeProvider({ children }: { children: React.ReactNode }) {
  const [bookMode, setBookModeState] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "1") setBookModeState(true);
    } catch {}
  }, []);

  const setBookMode = useCallback((v: boolean) => {
    setBookModeState(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
    } catch {}
  }, []);

  const toggleBookMode = useCallback(() => {
    setBookModeState((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });
  }, []);

  return (
    <BookModeContext.Provider value={{ bookMode, setBookMode, toggleBookMode }}>
      {children}
    </BookModeContext.Provider>
  );
}

export function useBookMode() {
  const ctx = useContext(BookModeContext);
  if (!ctx) throw new Error("useBookMode must be within BookModeProvider");
  return ctx;
}

export function BookModeToggle({ className }: { className?: string }) {
  const { bookMode, toggleBookMode } = useBookMode();
  return (
    <button
      type="button"
      onClick={toggleBookMode}
      aria-pressed={bookMode}
      title={bookMode ? "Exit Book Mode" : "Read in Book Mode"}
      className={
        className ??
        "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-hair bg-paper px-2.5 py-1.5 text-[11px] font-medium text-ink hover:border-orange hover:text-orange"
      }
    >
      <span aria-hidden="true">{bookMode ? "✕" : "❦"}</span>
      {bookMode ? "Exit Book Mode" : "Book Mode"}
    </button>
  );
}

type FlipDir = "forward" | "back" | null;

/**
 * A real paginated book page. The content you pass in is laid out inside a
 * viewport-height, CSS-columns container — the browser auto-splits it into
 * viewport-wide "pages" which we translateX between with a slide animation.
 *
 * `onPrevLesson` / `onNextLesson` fire when the user hits Previous on page 1
 * or Next on the last page, so the caller can flip to the previous/next
 * lesson or topic for seamless navigation.
 *
 * `pageKey` must change when the content source changes (new lesson) so
 * the page counter resets to 1.
 */
export function BookPage({
  children,
  chapter,
  title,
  onPrevLesson,
  onNextLesson,
  pageKey,
  enterDir = null,
}: {
  children: React.ReactNode;
  chapter?: string;
  title?: string;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  pageKey?: string | number;
  /** If set, the page slides in from that side on mount (used when the
   * parent replaces children due to a lesson flip). */
  enterDir?: FlipDir;
}) {
  const { toggleBookMode } = useBookMode();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const columnsRef = useRef<HTMLDivElement | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [flipping, setFlipping] = useState<FlipDir>(null);

  // Reset pagination when the source content changes.
  useEffect(() => {
    setPageIndex(0);
  }, [pageKey]);

  // Measure viewport + total pages. Re-measures on resize and when children
  // mutate (MathRender resolves KaTeX async, images load, etc.).
  useLayoutEffect(() => {
    const vp = viewportRef.current;
    const col = columnsRef.current;
    if (!vp || !col) return;

    let raf = 0;
    const measure = () => {
      const w = vp.clientWidth;
      if (w <= 0) return;
      setViewportWidth(w);
      // Wait a frame for the new column-width to apply before reading
      // scrollWidth, otherwise we'd get the pre-layout width.
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sw = col.scrollWidth;
        const total = Math.max(1, Math.round(sw / w));
        setTotalPages(total);
        setPageIndex((i) => Math.min(i, total - 1));
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    const mo = new MutationObserver(measure);
    mo.observe(col, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: false,
    });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
    };
  }, [pageKey]);

  const canPrev = pageIndex > 0 || !!onPrevLesson;
  const canNext = pageIndex < totalPages - 1 || !!onNextLesson;

  const goPrev = useCallback(() => {
    if (pageIndex > 0) {
      setPageIndex((i) => i - 1);
    } else if (onPrevLesson) {
      setFlipping("back");
      // Delay the lesson change until the slide-out finishes for a real
      // "turn-the-page" feel.
      window.setTimeout(() => {
        setFlipping(null);
        onPrevLesson();
      }, 260);
    }
  }, [pageIndex, onPrevLesson]);

  const goNext = useCallback(() => {
    if (pageIndex < totalPages - 1) {
      setPageIndex((i) => i + 1);
    } else if (onNextLesson) {
      setFlipping("forward");
      window.setTimeout(() => {
        setFlipping(null);
        onNextLesson();
      }, 260);
    }
  }, [pageIndex, totalPages, onNextLesson]);

  // Keyboard nav: left / right arrow, PageUp / PageDown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack keys while the user is typing somewhere.
      const t = e.target as HTMLElement | null;
      if (t) {
        const tag = t.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          t.isContentEditable
        ) {
          return;
        }
      }
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  // Enter animation when a new lesson arrives.
  const [entering, setEntering] = useState<FlipDir>(enterDir);
  useLayoutEffect(() => {
    setEntering(enterDir);
    if (enterDir) {
      const id = window.setTimeout(() => setEntering(null), 420);
      return () => window.clearTimeout(id);
    }
  }, [pageKey, enterDir]);

  const pageNumberLabel =
    totalPages > 1
      ? `Page ${pageIndex + 1} of ${totalPages}`
      : `Page ${pageIndex + 1}`;

  return (
    <div className="book-stage">
      <article
        className={`book-page ${
          flipping === "forward"
            ? "is-flipping-forward"
            : flipping === "back"
            ? "is-flipping-back"
            : ""
        } ${
          entering === "forward"
            ? "is-entering-forward"
            : entering === "back"
            ? "is-entering-back"
            : ""
        }`}
        key={pageKey}
        role="article"
        aria-label={title ? `${title} — book view` : "Book view"}
      >
        <button
          type="button"
          onClick={toggleBookMode}
          className="book-page__exit"
          aria-label="Exit Book Mode"
          title="Exit Book Mode"
        >
          ✕
        </button>
        {(chapter || title) && (
          <header className="book-page__header">
            {chapter && <div className="book-page__chapter">{chapter}</div>}
            {title && <h1 className="book-page__title">{title}</h1>}
          </header>
        )}
        <div className="book-page__viewport" ref={viewportRef}>
          <div
            className="book-page__columns"
            ref={columnsRef}
            style={{
              transform: `translateX(${-pageIndex * 100}%)`,
              columnWidth: viewportWidth ? `${viewportWidth}px` : undefined,
            }}
          >
            {children}
          </div>
          {/* Click targets on the outer edges to flip — feels like clicking
              the edge of a physical book. Purely a progressive enhancement;
              the footer buttons and arrow keys still work. */}
          <button
            type="button"
            className="book-page__edge book-page__edge--left"
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Previous page"
            tabIndex={-1}
          />
          <button
            type="button"
            className="book-page__edge book-page__edge--right"
            onClick={goNext}
            disabled={!canNext}
            aria-label="Next page"
            tabIndex={-1}
          />
        </div>
        <footer className="book-page__footer" aria-label="Page navigation">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            className="book-page__nav"
            aria-label="Previous page"
          >
            ← Previous
          </button>
          <span className="book-page__pageno" aria-live="polite">
            {pageNumberLabel}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            className="book-page__nav"
            aria-label="Next page"
          >
            Next →
          </button>
        </footer>
      </article>
    </div>
  );
}
