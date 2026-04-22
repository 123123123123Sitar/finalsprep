import type { ForumComment, ForumPost } from "@/lib/forums";

/**
 * Shared hydrators used by both forum API routes to coerce Firestore docs
 * into the typed shapes the client expects. Lives in /lib so route files
 * can keep exporting only HTTP verb handlers (Next.js requirement).
 */
export function hydratePost(id: string, d: any): ForumPost {
  const upvotes: string[] = Array.isArray(d.upvotes) ? d.upvotes : [];
  return {
    id,
    forum: d.forum,
    authorUid: d.authorUid,
    authorUsername: d.authorUsername,
    authorDisplayName: d.authorDisplayName,
    authorAvatarEmoji: d.authorAvatarEmoji ?? null,
    authorAvatarColor: d.authorAvatarColor ?? null,
    title: d.title,
    body: d.body || "",
    tags: Array.isArray(d.tags) ? d.tags : [],
    upvotes,
    score: upvotes.length,
    commentCount: typeof d.commentCount === "number" ? d.commentCount : 0,
    createdAt: d.createdAt || 0,
    updatedAt: d.updatedAt || d.createdAt || 0,
  };
}

export function hydrateComment(id: string, d: any): ForumComment {
  return {
    id,
    postId: d.postId,
    forum: d.forum,
    authorUid: d.authorUid,
    authorUsername: d.authorUsername,
    authorDisplayName: d.authorDisplayName,
    authorAvatarEmoji: d.authorAvatarEmoji ?? null,
    authorAvatarColor: d.authorAvatarColor ?? null,
    parentId: typeof d.parentId === "string" ? d.parentId : null,
    body: d.body || "",
    upvotes: Array.isArray(d.upvotes) ? d.upvotes : [],
    createdAt: d.createdAt || 0,
    edited: !!d.edited,
  };
}
