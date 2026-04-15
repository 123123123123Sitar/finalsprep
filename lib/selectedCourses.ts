"use client";
import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Firestore,
} from "firebase/firestore";

/**
 * Per-user "which AP courses have I added" state. Stored inside the same
 * users/{uid}/profile/prefs doc as AI prefs so we only subscribe once.
 *
 * Enforcement happens on write: the caller passes the plan limit and we
 * clamp the array before persisting.
 */

const PREFS_DOC_PATH = (uid: string) =>
  ["users", uid, "profile", "prefs"] as const;

export function subscribeSelectedCourses(
  db: Firestore,
  uid: string,
  cb: (slugs: string[]) => void
): () => void {
  const [a, b, c, d] = PREFS_DOC_PATH(uid);
  return onSnapshot(
    doc(db, a, b, c, d),
    (snap) => {
      const raw = (snap.data() as any)?.selectedCourses;
      cb(Array.isArray(raw) ? raw.filter((x: unknown) => typeof x === "string") : []);
    },
    () => cb([])
  );
}

export async function saveSelectedCourses(
  db: Firestore,
  uid: string,
  slugs: string[],
  limit: number
): Promise<string[]> {
  const clamped = Array.from(new Set(slugs)).slice(0, limit);
  const [a, b, c, d] = PREFS_DOC_PATH(uid);
  await setDoc(
    doc(db, a, b, c, d),
    { selectedCourses: clamped, updatedAt: serverTimestamp() },
    { merge: true }
  );
  return clamped;
}
