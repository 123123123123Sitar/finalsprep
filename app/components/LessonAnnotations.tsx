"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";
import {
  EMPTY_ANNOTATIONS,
  saveNote,
  subscribeAnnotations,
  type LessonAnnotations as Annotations,
} from "@/lib/annotations";

/**
 * Per-lesson notes panel. Highlights themselves render inline on the lesson
 * text (see <InlineHighlights />), so this surface is just for freeform
 * notes. Pro-gated.
 */
export default function LessonAnnotationsPanel({
  lessonSlug,
}: {
  lessonSlug: string;
}) {
  const { user, plan } = useAuth();
  const canUse = plan === "pro" || plan === "hacker";
  const [annotations, setAnnotations] = useState<Annotations>(EMPTY_ANNOTATIONS);
  const [loaded, setLoaded] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");
  const [noteDirty, setNoteDirty] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const saveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!user || !canUse) {
      setAnnotations(EMPTY_ANNOTATIONS);
      setNoteDraft("");
      setNoteDirty(false);
      setLoaded(false);
      return;
    }
    const db = getDb();
    if (!db) return;
    setLoaded(false);
    const unsub = subscribeAnnotations(db, user.uid, lessonSlug, (a) => {
      setAnnotations(a);
      // Only reset the draft from server state when it isn't dirty, to
      // avoid clobbering the user's in-progress typing.
      setNoteDraft((prev) => (noteDirty ? prev : a.note));
      setLoaded(true);
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, canUse, lessonSlug]);

  useEffect(() => {
    if (!user || !canUse || !noteDirty) return;
    const db = getDb();
    if (!db) return;
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      void saveNote(db, user.uid, lessonSlug, noteDraft).then(() =>
        setNoteDirty(false)
      );
    }, 600);
    return () => {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    };
  }, [noteDraft, noteDirty, lessonSlug, user, canUse]);

  if (!user) return null;

  if (!canUse) {
    return (
      <div className="mt-4 rounded-md border border-dashed border-hair bg-offwhite p-3 text-[12px] text-muted">
        Notes and highlights are a Pro feature.{" "}
        <a href="/#price" className="text-orange hover:underline">
          Upgrade →
        </a>
      </div>
    );
  }

  const hasNote = noteDraft.trim().length > 0;

  return (
    <div className="mt-4 rounded-lg border border-hair bg-offwhite">
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="label">Notes</span>
          {hasNote && (
            <span className="rounded-full bg-paper px-2 py-0.5 text-[10px] text-muted">
              {noteDirty ? "Saving…" : loaded ? "Saved" : ""}
            </span>
          )}
        </div>
        <span aria-hidden="true" className="text-muted">
          {collapsed ? "▾" : "▴"}
        </span>
      </button>

      {!collapsed && (
        <div className="border-t border-hair px-4 py-3">
          <textarea
            value={noteDraft}
            onChange={(e) => {
              setNoteDraft(e.target.value);
              setNoteDirty(true);
            }}
            placeholder="Your notes on this lesson. Saved automatically."
            className="w-full resize-y rounded-md border border-hair bg-paper px-3 py-2 text-[13.5px] text-ink outline-none focus:border-orange"
            rows={4}
          />
        </div>
      )}
    </div>
  );
}
