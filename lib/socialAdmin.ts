/**
 * Server-only helpers for the social surface. Uses the Firebase Admin SDK
 * so we can do cross-user reads/writes that the client-side Firestore rules
 * deny. Kept in a separate module from `lib/social.ts` so the client bundle
 * never imports `firebase-admin`.
 */
import type { Firestore } from "firebase-admin/firestore";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import {
  POINTS_PER_EVENT,
  type ScoreEvent,
} from "@/lib/leaderboardScore";
import {
  usernameFromEmail,
  AVATAR_COLOR_OPTIONS,
  AVATAR_EMOJI_OPTIONS,
  type PublicProfile,
} from "@/lib/social";

export type AdminDb = Firestore;

export function adminDbOrThrow(): AdminDb {
  const db = getAdminDb();
  if (!db) throw new Error("firebase-admin not configured");
  return db;
}

/**
 * Ensure a `publicProfiles/{uid}` doc exists for the given user. Returns
 * the profile, creating it with sane defaults if this is the first time
 * the user has interacted with a social feature.
 *
 * We store `usernameLower` as the unique key for username lookups. If a
 * derived username collides with an existing one, we append a random
 * 4-digit suffix — profile creation is rare (per-user, once) so this is fine.
 */
export async function ensurePublicProfile(
  db: AdminDb,
  uid: string,
  email: string | null
): Promise<PublicProfile> {
  const ref = db.collection("publicProfiles").doc(uid);
  const snap = await ref.get();
  if (snap.exists) {
    return snap.data() as PublicProfile;
  }

  const base = usernameFromEmail(email);
  let username = base;
  // Up to 5 attempts to resolve a unique username.
  for (let attempt = 0; attempt < 5; attempt++) {
    const existing = await db
      .collection("publicProfiles")
      .where("usernameLower", "==", username.toLowerCase())
      .limit(1)
      .get();
    if (existing.empty) break;
    username = `${base}${Math.floor(1000 + Math.random() * 9000)}`;
  }

  const now = Date.now();
  const seedHash = hashSeed(uid);
  const profile: PublicProfile = {
    uid,
    username,
    displayName: username,
    bio: "",
    avatarSeed: uid,
    avatarEmoji:
      AVATAR_EMOJI_OPTIONS[seedHash % AVATAR_EMOJI_OPTIONS.length],
    avatarColor:
      AVATAR_COLOR_OPTIONS[seedHash % AVATAR_COLOR_OPTIONS.length],
    visibility: "public",
    stats: {
      problemsSolved: 0,
      longestStreak: 0,
      currentStreak: 0,
      followersCount: 0,
      followingCount: 0,
      chatMessages: 0,
      toolUses: 0,
      lessonsCompleted: 0,
      points: 0,
    },
    createdAt: now,
    updatedAt: now,
  };
  await ref.set({
    ...profile,
    usernameLower: username.toLowerCase(),
  });
  return profile;
}

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export async function getPublicProfile(
  db: AdminDb,
  uid: string
): Promise<PublicProfile | null> {
  const snap = await db.collection("publicProfiles").doc(uid).get();
  if (!snap.exists) return null;
  return hydrateProfile(snap.data());
}

function hydrateProfile(d: any): PublicProfile {
  return {
    uid: d.uid,
    username: d.username,
    displayName: d.displayName,
    bio: d.bio || "",
    avatarSeed: d.avatarSeed || d.uid,
    avatarEmoji: d.avatarEmoji ?? null,
    avatarColor: d.avatarColor ?? null,
    visibility: d.visibility || "public",
    stats: {
      problemsSolved: d.stats?.problemsSolved || 0,
      longestStreak: d.stats?.longestStreak || 0,
      currentStreak: d.stats?.currentStreak || 0,
      followersCount: d.stats?.followersCount || 0,
      followingCount: d.stats?.followingCount || 0,
      chatMessages: d.stats?.chatMessages || 0,
      toolUses: d.stats?.toolUses || 0,
      lessonsCompleted: d.stats?.lessonsCompleted || 0,
      points: d.stats?.points || 0,
    },
    createdAt: d.createdAt || 0,
    updatedAt: d.updatedAt || 0,
  };
}

/** Batch-fetch profiles by uid. Skips missing ones silently. */
export async function getProfilesByUids(
  db: AdminDb,
  uids: string[]
): Promise<Map<string, PublicProfile>> {
  const out = new Map<string, PublicProfile>();
  if (uids.length === 0) return out;
  const unique = Array.from(new Set(uids));
  // Firestore `in` is capped at 30; chunk defensively.
  for (let i = 0; i < unique.length; i += 30) {
    const chunk = unique.slice(i, i + 30);
    const snap = await db
      .collection("publicProfiles")
      .where("uid", "in", chunk)
      .get();
    snap.forEach((d) => {
      const p = d.data() as any;
      out.set(p.uid, hydrateProfile(p));
    });
  }
  return out;
}

/**
 * Record a weighted leaderboard score event for a user. Increments the
 * per-course points + event counter and the public profile's aggregate
 * stats. Used for problem solves, lesson completions, chat messages, and
 * AI tool uses. See `lib/leaderboardScore.ts` for the formula.
 */
export async function recordScoreEvent(
  db: AdminDb,
  uid: string,
  courseSlug: string,
  event: ScoreEvent
): Promise<void> {
  const profileRef = db.collection("publicProfiles").doc(uid);
  const boardRef = db
    .collection("leaderboardStats")
    .doc(`${courseSlug}::${uid}`);
  const pts = POINTS_PER_EVENT[event] || 0;
  const statKey = statKeyFor(event);
  const boardKey = boardKeyFor(event);

  await db.runTransaction(async (tx) => {
    const boardSnap = await tx.get(boardRef);
    const existing = boardSnap.exists ? (boardSnap.data() as any) : null;
    tx.set(
      boardRef,
      {
        uid,
        courseSlug,
        points: (existing?.points || 0) + pts,
        problems: (existing?.problems || 0) + (event === "problem_solve" ? 1 : 0),
        [boardKey]: (existing?.[boardKey] || 0) + 1,
        lastEventAt: Date.now(),
      },
      { merge: true }
    );
    tx.set(
      profileRef,
      {
        stats: {
          points: FieldValue.increment(pts),
          [statKey]: FieldValue.increment(1),
        },
        updatedAt: Date.now(),
      },
      { merge: true }
    );
  });
}

function statKeyFor(event: ScoreEvent): string {
  switch (event) {
    case "problem_solve":
      return "problemsSolved";
    case "chat_message":
      return "chatMessages";
    case "tool_use":
      return "toolUses";
    case "lesson_complete":
      return "lessonsCompleted";
  }
}

function boardKeyFor(event: ScoreEvent): string {
  switch (event) {
    case "problem_solve":
      return "problems";
    case "chat_message":
      return "chatMessages";
    case "tool_use":
      return "toolUses";
    case "lesson_complete":
      return "lessonsCompleted";
  }
}

/** @deprecated kept for callers that haven't migrated to recordScoreEvent. */
export async function incrementSolveStat(
  db: AdminDb,
  uid: string,
  courseSlug: string
): Promise<void> {
  await recordScoreEvent(db, uid, courseSlug, "problem_solve");
}

/**
 * Write a notification doc for `recipientUid`. Swallows errors so the caller
 * never has a notification failure block the primary action (follow, send
 * message, post comment reply).
 */
export async function writeNotification(
  db: AdminDb,
  recipientUid: string,
  params: {
    kind: "follow" | "message" | "comment_reply" | "system";
    fromUid?: string;
    fromUsername?: string;
    fromDisplayName?: string;
    text: string;
    link: string;
  }
): Promise<void> {
  if (!recipientUid || recipientUid === params.fromUid) return;
  try {
    await db.collection("notifications").add({
      uid: recipientUid,
      kind: params.kind,
      fromUid: params.fromUid || null,
      fromUsername: params.fromUsername || null,
      fromDisplayName: params.fromDisplayName || null,
      text: params.text.slice(0, 280),
      link: params.link.slice(0, 400),
      read: false,
      createdAt: Date.now(),
    });
  } catch (e) {
    console.error("[writeNotification]", e);
  }
}

/** Append an activity item to the global activities stream. */
export async function postActivity(
  db: AdminDb,
  params: {
    uid: string;
    username: string;
    displayName: string;
    kind: string;
    course?: string;
    unit?: number;
    content: string;
  }
): Promise<string> {
  const ref = await db.collection("activities").add({
    ...params,
    createdAt: Date.now(),
    reactions: {},
  });
  return ref.id;
}
