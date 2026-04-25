"use client";

import {
  doc,
  onSnapshot,
  setDoc,
  type Firestore,
} from "firebase/firestore";
import type {
  TourId,
  TutorialsSeenDoc,
  TutorialsSeenEntry,
} from "./types";

const PROFILE_DOC = "tutorialsSeen";
const SCHEMA_VERSION = 1;

function tutorialsSeenRef(db: Firestore, uid: string) {
  return doc(db, "users", uid, "profile", PROFILE_DOC);
}

export function subscribeTutorialsSeen(
  db: Firestore,
  uid: string,
  cb: (doc: TutorialsSeenDoc | null) => void
) {
  return onSnapshot(
    tutorialsSeenRef(db, uid),
    (snap) => cb((snap.data() as TutorialsSeenDoc | undefined) ?? null),
    () => cb(null)
  );
}

export async function markTourSeen(
  db: Firestore,
  uid: string,
  tourId: TourId,
  version: number,
  completed: boolean
): Promise<void> {
  await setDoc(
    tutorialsSeenRef(db, uid),
    {
      seen: {
        [tourId]: {
          version,
          seenAt: Date.now(),
          completed,
        },
      },
      schemaVersion: SCHEMA_VERSION,
    },
    { merge: true }
  );
}

/**
 * Used the first time FirstLookProvider runs for a "veteran" user — a user
 * whose `onboarding.completedAt` predates the tutorial system. We mark all
 * currently-shipped tours as seen so they don't get tour-bombed; new tours
 * added later (with a `firstAvailableAt` after this moment) will still
 * fire normally because they won't be in the pre-populated set.
 */
export async function bulkMarkSeenForVeteran(
  db: Firestore,
  uid: string,
  entries: Array<{ id: TourId; version: number }>
): Promise<void> {
  const seen: Record<string, TutorialsSeenEntry> = {};
  const now = Date.now();
  for (const entry of entries) {
    seen[entry.id] = {
      version: entry.version,
      seenAt: now,
      completed: false,
    };
  }
  await setDoc(
    tutorialsSeenRef(db, uid),
    {
      seen,
      firstSeenSystemAt: now,
      schemaVersion: SCHEMA_VERSION,
    },
    { merge: true }
  );
}

/** First time FirstLookProvider runs for a brand-new user — record the moment. */
export async function initFirstSeenSystemAt(
  db: Firestore,
  uid: string
): Promise<void> {
  await setDoc(
    tutorialsSeenRef(db, uid),
    {
      firstSeenSystemAt: Date.now(),
      schemaVersion: SCHEMA_VERSION,
    },
    { merge: true }
  );
}

/**
 * Reset a tour's seen entry so the next visit fires it again. Used by the
 * Account → Support → Replay tutorial UI. Setting `version: 0` is treated
 * as "not yet seen at the current version" by the firing logic.
 */
export async function clearTourSeen(
  db: Firestore,
  uid: string,
  tourId: TourId
): Promise<void> {
  await setDoc(
    tutorialsSeenRef(db, uid),
    {
      seen: {
        [tourId]: {
          version: 0,
          seenAt: Date.now(),
          completed: false,
        },
      },
    },
    { merge: true }
  );
}
