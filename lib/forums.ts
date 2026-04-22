/**
 * Shared types and validators for the forum surface (subforums, posts,
 * comments, tags). Server routes under app/api/forum/* and the pages
 * under app/social/* import from here.
 *
 * Each course slug doubles as a subforum slug. The special "general"
 * slug is the catch-all subforum open to everyone.
 */
import { COURSES } from "@/lib/topics";

export const GENERAL_FORUM = "general";

export const POST_TAGS = [
  "Question",
  "Help",
  "Resource",
  "Tip",
  "Study group",
  "Discussion",
  "Vent",
  "Meme",
  "Announcement",
] as const;

export const MAX_TAGS_PER_POST = 3;
export const POST_TITLE_MIN = 4;
export const POST_TITLE_MAX = 140;
export const POST_BODY_MAX = 4000;
export const COMMENT_BODY_MIN = 2;
export const COMMENT_BODY_MAX = 2000;

export type ForumPost = {
  id: string;
  forum: string;
  authorUid: string;
  authorUsername: string;
  authorDisplayName: string;
  authorAvatarEmoji?: string | null;
  authorAvatarColor?: string | null;
  title: string;
  body: string;
  tags: string[];
  upvotes: string[];
  score: number;
  commentCount: number;
  createdAt: number;
  updatedAt: number;
};

export type ForumComment = {
  id: string;
  postId: string;
  forum: string;
  authorUid: string;
  authorUsername: string;
  authorDisplayName: string;
  authorAvatarEmoji?: string | null;
  authorAvatarColor?: string | null;
  parentId: string | null;
  body: string;
  upvotes: string[];
  createdAt: number;
  edited?: boolean;
};

export type SubforumMeta = {
  slug: string;
  title: string;
  description: string;
  kind: "general" | "course";
};

/**
 * All subforums known to the app: one per course plus the general catch-all.
 * Used to render the directory and to validate forum slugs on the server.
 */
export function allSubforums(): SubforumMeta[] {
  const general: SubforumMeta = {
    slug: GENERAL_FORUM,
    title: "General",
    description: "Off-topic, study tips, study-group hunting.",
    kind: "general",
  };
  const courses: SubforumMeta[] = COURSES.map((c) => ({
    slug: c.slug,
    title: c.shortTitle,
    description: c.subtitle,
    kind: "course",
  }));
  return [general, ...courses];
}

export function getSubforum(slug: string): SubforumMeta | null {
  return allSubforums().find((s) => s.slug === slug) ?? null;
}

export function validatePostTitle(title: string): string | null {
  const t = title.trim();
  if (t.length < POST_TITLE_MIN) return "Title is too short.";
  if (t.length > POST_TITLE_MAX) return "Title is too long.";
  return null;
}

export function validatePostBody(body: string): string | null {
  if (body.length > POST_BODY_MAX) return "Body is too long.";
  return null;
}

export function sanitizeTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const allowed = new Set<string>(POST_TAGS);
  const out: string[] = [];
  for (const v of raw) {
    if (typeof v === "string" && allowed.has(v) && !out.includes(v)) {
      out.push(v);
      if (out.length >= MAX_TAGS_PER_POST) break;
    }
  }
  return out;
}

export function validateCommentBody(body: string): string | null {
  const t = body.trim();
  if (t.length < COMMENT_BODY_MIN) return "Comment is too short.";
  if (t.length > COMMENT_BODY_MAX) return "Comment is too long.";
  return null;
}

/**
 * Reddit-style hot score: roughly log(max(score, 1)) * directionSign + age term.
 * Older posts decay; popular posts float. We apply a half-life of ~12h.
 */
export function hotScore(upvotes: number, createdAt: number): number {
  const score = Math.max(upvotes, 0);
  const order = Math.log10(Math.max(score, 1) + 1);
  const hours = (Date.now() - createdAt) / 3_600_000;
  return order - hours / 12;
}
