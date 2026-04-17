"use client";
import {
  doc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  type Firestore,
} from "firebase/firestore";

/**
 * Per-user lesson-completion state. Stored on `users/{uid}/profile/lessons`
 * alongside `viewedSlugs` (which drives the learner cap), but kept as a
 * distinct field because "opened" and "completed" are different concepts.
 *
 * Progress bars on /study and the dashboard read from `completedSlugs` so
 * they only advance when the user explicitly finishes a lesson, not just
 * when they open it.
 */

/**
 * Slug used to track a CED sublesson's completion. Prefixed so it can't
 * collide with a real LESSON slug when stored in the same `completedSlugs`
 * Set, and so progress totals can recognize and count it.
 */
export function cedTopicSlug(courseSlug: string, topicId: string): string {
  return `ced:${courseSlug}:${topicId}`;
}

export function subscribeCompletedSlugs(
  db: Firestore,
  uid: string,
  cb: (slugs: Set<string>) => void
): () => void {
  return onSnapshot(
    doc(db, "users", uid, "profile", "lessons"),
    (snap) => {
      const arr = (snap.data() as any)?.completedSlugs;
      cb(new Set(Array.isArray(arr) ? arr.filter((s) => typeof s === "string") : []));
    },
    () => cb(new Set())
  );
}

export async function setLessonCompleted(
  db: Firestore,
  uid: string,
  slug: string,
  completed: boolean
): Promise<void> {
  const ref = doc(db, "users", uid, "profile", "lessons");
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const cur = (snap.data() as any)?.completedSlugs;
    const arr: string[] = Array.isArray(cur)
      ? cur.filter((s): s is string => typeof s === "string")
      : [];
    const has = arr.includes(slug);
    if (has === completed) return;
    const next = completed ? [...arr, slug] : arr.filter((s) => s !== slug);
    tx.set(
      ref,
      { completedSlugs: next, updatedAt: serverTimestamp() },
      { merge: true }
    );
  });
}
