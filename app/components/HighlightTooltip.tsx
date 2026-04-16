"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Watches text selection inside its container and shows a floating
 * toolbar (Ask AI, Copy, Define) above the selection. "Ask AI" jumps
 * the user to /chat?q=… so the highlighted text becomes the next
 * chat prompt — that's the monetization hook: we want highlights to
 * flow into paid chat sessions so token usage goes up.
 */
export default function HighlightTooltip({
  children,
  onHighlight,
  enabled = true,
}: {
  children: React.ReactNode;
  onHighlight?: (text: string) => void;
  enabled?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<
    | { visible: false }
    | { visible: true; text: string; x: number; y: number }
  >({ visible: false });
  const [defining, setDefining] = useState<string | null>(null);

  const hide = useCallback(() => {
    setState({ visible: false });
    setDefining(null);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setState({ visible: false });
      return;
    }
    function updateFromSelection() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setState({ visible: false });
        return;
      }
      const range = sel.getRangeAt(0);
      const container = containerRef.current;
      if (!container) return;
      // Only show if the selection is actually inside our container.
      if (!container.contains(range.commonAncestorContainer)) {
        setState({ visible: false });
        return;
      }
      const text = sel.toString().trim();
      if (text.length < 2 || text.length > 500) {
        setState({ visible: false });
        return;
      }
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;
      // Viewport-relative coords because we render with `position: fixed`.
      setState({
        visible: true,
        text,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }

    function onMouseUp(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-highlight-toolbar]")) return;
      // Defer so the browser's own selection settles before we read it.
      setTimeout(updateFromSelection, 0);
    }

    function onMouseDown(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-highlight-toolbar]")) return;
      setState({ visible: false });
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setState({ visible: false });
      // Arrow / shift-arrow keyboard selection: refresh once key lifts.
      if (e.key.startsWith("Arrow") && e.shiftKey) {
        setTimeout(updateFromSelection, 0);
      }
    }

    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keyup", onKey);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keyup", onKey);
    };
  }, [enabled]);

  function copy() {
    if (!state.visible) return;
    void navigator.clipboard.writeText(state.text);
    hide();
  }

  function askAI() {
    if (!state.visible) return;
    const q = encodeURIComponent(state.text);
    window.location.href = `/chat?q=${q}`;
  }

  function highlight() {
    if (!state.visible || !onHighlight) return;
    onHighlight(state.text);
    window.getSelection()?.removeAllRanges();
    hide();
  }

  function define() {
    if (!state.visible) return;
    const word = state.text.split(/\s+/)[0];
    setDefining(word);
    // Punt to Wiktionary as a lightweight free source.
    window.open(
      `https://en.wiktionary.org/wiki/${encodeURIComponent(word)}`,
      "_blank",
      "noopener"
    );
    hide();
  }

  return (
    <div ref={containerRef} className="relative">
      {children}
      {state.visible && (
        <div
          data-highlight-toolbar
          style={{
            position: "fixed",
            left: state.x,
            top: state.y - 44,
            transform: "translateX(-50%)",
          }}
          className="z-50 flex items-center gap-0.5 rounded-lg border border-ink/20 bg-ink px-1 py-1 text-xs text-paper shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)]"
          onMouseDown={(e) => e.preventDefault()}
        >
          <button
            onClick={askAI}
            className="flex items-center gap-1 rounded px-2 py-1 hover:bg-white/15"
            title="Ask the AI tutor about this"
          >
            <span aria-hidden="true">✨</span>
            <span>Ask AI</span>
          </button>
          {onHighlight && (
            <>
              <span className="h-4 w-px bg-white/20" />
              <button
                onClick={highlight}
                className="flex items-center gap-1 rounded px-2 py-1 hover:bg-white/15"
                title="Save as highlight"
              >
                <span aria-hidden="true">🖍</span>
                <span>Highlight</span>
              </button>
            </>
          )}
          <span className="h-4 w-px bg-white/20" />
          <button
            onClick={copy}
            className="rounded px-2 py-1 hover:bg-white/15"
            title="Copy selection"
          >
            Copy
          </button>
          <span className="h-4 w-px bg-white/20" />
          <button
            onClick={define}
            className="rounded px-2 py-1 hover:bg-white/15"
            title="Look up definition"
          >
            Define
          </button>
        </div>
      )}
    </div>
  );
}
