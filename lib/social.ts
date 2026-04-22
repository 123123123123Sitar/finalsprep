/**
 * Shared helpers for the social surface area (comments, leaderboards,
 * profiles, follows, feed, DMs). All cross-user data lives in top-level
 * collections and is read/written via server API routes that use the
 * Firebase Admin SDK. The per-user Firestore rules only cover `users/{uid}`
 * (anything in `publicProfiles`, `lessonComments`, `follows`, etc. is
 * server-authoritative).
 */

export type PublicProfile = {
  uid: string;
  username: string;
  displayName: string;
  bio: string;
  avatarSeed: string;
  avatarEmoji?: string | null;
  avatarColor?: string | null;
  visibility: "public" | "private";
  plan?: "learner" | "pro" | "hacker" | null;
  gradeLevel?: string | null;
  interests?: string[];
  stats: {
    problemsSolved: number;
    longestStreak: number;
    currentStreak: number;
    followersCount: number;
    followingCount: number;
    chatMessages?: number;
    toolUses?: number;
    lessonsCompleted?: number;
    points?: number;
  };
  createdAt: number;
  updatedAt: number;
};

export const GRADE_OPTIONS = [
  "Middle school",
  "9th grade",
  "10th grade",
  "11th grade",
  "12th grade",
  "College",
  "Graduate",
  "Other",
] as const;

export const INTEREST_OPTIONS = [
  "Math",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer science",
  "Engineering",
  "Statistics",
  "Economics",
  "History",
  "Government",
  "English",
  "Writing",
  "Languages",
  "Psychology",
  "Art",
  "Music",
  "Research",
  "Debate",
  "Robotics",
  "Competitive math",
  "College prep",
  "Test prep",
] as const;

export const MAX_INTERESTS = 6;

export function sanitizeInterests(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const allowed = new Set<string>(INTEREST_OPTIONS);
  const out: string[] = [];
  for (const v of raw) {
    if (typeof v === "string" && allowed.has(v) && !out.includes(v)) {
      out.push(v);
      if (out.length >= MAX_INTERESTS) break;
    }
  }
  return out;
}

export function sanitizeGradeLevel(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  return (GRADE_OPTIONS as readonly string[]).includes(raw) ? raw : null;
}

export const AVATAR_EMOJI_OPTIONS = [
  "🦊", "🐻", "🐼", "🐸", "🦁", "🐯", "🐨", "🦉", "🐙", "🐳",
  "🌱", "🌿", "🌻", "🌸", "🍀", "🍄", "🌙", "⭐", "☄️", "🌊",
  "📚", "✏️", "🎨", "🎯", "🧪", "🎹", "🎧", "🧠", "⚡", "🔮",
  "🚀", "🏔️", "⚓", "🌍", "🔥", "💎", "🧭", "🎲", "🪁", "🍉",
];

export const AVATAR_COLOR_OPTIONS = [
  "#f97316", "#8b5cf6", "#10b981", "#3b82f6", "#ec4899",
  "#eab308", "#14b8a6", "#ef4444", "#0ea5e9", "#84cc16",
  "#a855f7", "#f43f5e",
];

export type LessonComment = {
  id: string;
  lessonKey: string;
  uid: string;
  username: string;
  displayName: string;
  text: string;
  parentId: string | null;
  upvotes: string[];
  createdAt: number;
  edited?: boolean;
};

export type LeaderboardEntry = {
  uid: string;
  username: string;
  displayName: string;
  problems: number;
  chatMessages: number;
  toolUses: number;
  lessonsCompleted: number;
  points: number;
  streak: number;
  accuracy: number;
  rank: number;
  avatarEmoji?: string | null;
  avatarColor?: string | null;
};

export type ActivityKind =
  | "solve"
  | "mastered_unit"
  | "streak_milestone"
  | "rank_up"
  | "custom_post";

export type ActivityItem = {
  id: string;
  uid: string;
  username: string;
  displayName: string;
  kind: ActivityKind;
  course?: string;
  unit?: number;
  content: string;
  createdAt: number;
  reactions: Record<string, string[]>;
};

export type Conversation = {
  id: string;
  participants: string[];
  participantProfiles: Record<
    string,
    { username: string; displayName: string }
  >;
  lastMessage: string;
  lastMessageUid: string;
  lastMessageAt: number;
  createdAt: number;
};

export type DirectMessage = {
  id: string;
  conversationId: string;
  uid: string;
  text: string;
  createdAt: number;
};

export type NotificationKind =
  | "follow"
  | "follow_request"
  | "message"
  | "comment_reply"
  | "system";

export type AppNotification = {
  id: string;
  uid: string;
  kind: NotificationKind;
  fromUid?: string;
  fromUsername?: string;
  fromDisplayName?: string;
  text: string;
  link: string;
  read: boolean;
  createdAt: number;
};

/**
 * Derive a stable username candidate from an email address. The result is
 * lowercase alphanumeric + dots/underscores, capped at 24 chars. Used on
 * first profile creation - the user can edit it later in /account.
 */
export function usernameFromEmail(email: string | null | undefined): string {
  if (!email) return `user${Math.floor(Math.random() * 100000)}`;
  const local = email.split("@")[0] || "user";
  const cleaned = local
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, "")
    .slice(0, 24);
  return cleaned || `user${Math.floor(Math.random() * 100000)}`;
}

/** Cross-page key used to scope comments and activity to a lesson. */
export function lessonKey(courseSlug: string, unitNumber: number): string {
  return `${courseSlug}::u${unitNumber}`;
}

export function parseLessonKey(
  key: string
): { courseSlug: string; unitNumber: number } | null {
  const m = key.match(/^(.+?)::u(\d+)$/);
  if (!m) return null;
  return { courseSlug: m[1], unitNumber: Number(m[2]) };
}

/** Deterministic 1-of-8 accent color for an avatar from a seed string. */
export function avatarColorFor(seed: string): string {
  const palette = [
    "#f97316",
    "#8b5cf6",
    "#10b981",
    "#3b82f6",
    "#ec4899",
    "#eab308",
    "#14b8a6",
    "#ef4444",
  ];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}

export function displayNameOrUsername(p: Pick<PublicProfile, "displayName" | "username">): string {
  return p.displayName?.trim() || p.username;
}

/** Canonical conversation ID: sorted uids joined by `__`. */
export function conversationIdFor(uidA: string, uidB: string): string {
  return [uidA, uidB].sort().join("__");
}

/** Validation used by both client forms and server routes. */
export function validateUsername(u: string): string | null {
  const v = u.trim();
  if (v.length < 3) return "Username must be at least 3 characters.";
  if (v.length > 24) return "Username can be at most 24 characters.";
  if (!/^[a-z0-9._]+$/i.test(v))
    return "Use letters, numbers, dot, or underscore only.";
  return null;
}

export function validateCommentText(text: string): string | null {
  const t = text.trim();
  if (t.length < 2) return "Comment is too short.";
  if (t.length > 2000) return "Comment is too long (2000 char max).";
  return null;
}

export function validateMessageText(text: string): string | null {
  const t = text.trim();
  if (t.length < 1) return "Message can't be empty.";
  if (t.length > 2000) return "Message is too long (2000 char max).";
  return null;
}

export function relativeTime(ms: number): string {
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)}d ago`;
  return new Date(ms).toLocaleDateString();
}
