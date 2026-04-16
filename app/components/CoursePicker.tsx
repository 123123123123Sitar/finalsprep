"use client";
import { useEffect, useState } from "react";
import { COURSES } from "@/lib/topics";
import { getCourseLimit, planLabel, type PlanTier } from "@/lib/plans";
import { saveSelectedCourses } from "@/lib/selectedCourses";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";

/**
 * Course-selection UI. Writes straight to Firestore on every toggle, so any
 * subscriber (e.g. the /study subscription to `selectedCourses`) updates
 * live. Enforces the plan's course cap both in the UI (at-limit disabled
 * state) and on write (`saveSelectedCourses` clamps defensively).
 *
 * Used on /study both inline (empty state) and inside a dialog (editing).
 */
export default function CoursePicker({
  selected,
  plan,
  variant = "inline",
  onClose,
  heading,
  subheading,
}: {
  selected: string[];
  plan: PlanTier;
  variant?: "inline" | "dialog";
  onClose?: () => void;
  heading?: string;
  subheading?: string;
}) {
  const { user } = useAuth();
  // Local optimistic copy so toggles feel instant; reconciled from the prop
  // whenever the Firestore snapshot echoes back.
  const [localSelected, setLocalSelected] = useState<string[]>(selected);
  const [saveError, setSaveError] = useState<string | null>(null);
  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  const limit = getCourseLimit(plan);

  async function toggle(slug: string) {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    const currently = localSelected.includes(slug);
    let next: string[];
    if (currently) {
      next = localSelected.filter((s) => s !== slug);
    } else {
      if (localSelected.length >= limit) return;
      next = [...localSelected, slug];
    }
    setLocalSelected(next);
    setSaveError(null);
    try {
      await saveSelectedCourses(db, user.uid, next, limit);
    } catch (e: any) {
      setSaveError(e?.message || "Couldn't save. Check your connection.");
      setLocalSelected(localSelected);
    }
  }

  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {heading && (
            <div className="label mb-1">{heading}</div>
          )}
          {subheading && (
            <p className="text-[13px] text-muted">{subheading}</p>
          )}
        </div>
        <span className="shrink-0 text-[11px] text-muted">
          {localSelected.length} / {limit} · {planLabel(plan)}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {COURSES.map((c) => {
          const isSelected = localSelected.includes(c.slug);
          const atLimit = !isSelected && localSelected.length >= limit;
          return (
            <button
              key={c.slug}
              onClick={() => toggle(c.slug)}
              disabled={atLimit}
              aria-pressed={isSelected}
              className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-[13px] transition ${
                isSelected
                  ? "border-orange bg-orange-tint text-ink"
                  : atLimit
                  ? "cursor-not-allowed border-hair bg-offwhite text-dim"
                  : "border-hair bg-paper text-body hover:border-orange"
              }`}
            >
              <span className="truncate">{c.title}</span>
              {isSelected && (
                <span aria-hidden="true" className="shrink-0 text-orange-ink">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {localSelected.length >= limit && plan !== "hacker" && (
        <p className="mt-3 text-[12px] text-orange-ink">
          You've hit your plan's course limit. Upgrade for more slots.
        </p>
      )}

      {saveError && (
        <p className="mt-3 text-[12px] text-red-700">{saveError}</p>
      )}
    </>
  );

  if (variant === "dialog") {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Manage courses"
        className="fixed inset-0 z-40 flex items-center justify-center px-4"
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative z-10 max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-xl border border-hair bg-paper p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
          {body}
          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="btn-primary">
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div>{body}</div>;
}
