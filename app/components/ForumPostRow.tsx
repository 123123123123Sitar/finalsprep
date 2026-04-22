import UserAvatar from "@/app/components/UserAvatar";
import { relativeTime } from "@/lib/social";
import type { ForumPost } from "@/lib/forums";

/**
 * One row in a subforum or home-page hot list. Clickable card that routes
 * to the single-post page. Keep this file minimal so it can be imported
 * from both server and client component trees.
 */
export default function ForumPostRow({ post }: { post: ForumPost }) {
  return (
    <a
      href={`/social/f/${post.forum}/${post.id}`}
      className="block rounded-xl border border-hair bg-paper p-4 hover:border-orange/40"
    >
      <div className="flex gap-3">
        <div className="flex flex-col items-center pt-0.5">
          <div className="text-[13px] font-semibold text-ink">{post.score}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted">
            ups
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-muted">
            <span>f/{post.forum}</span>
            <span>·</span>
            <span>
              posted by{" "}
              <a
                href={`/users/${post.authorUid}`}
                className="hover:text-ink hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                @{post.authorUsername}
              </a>
            </span>
            <span>·</span>
            <span>{relativeTime(post.createdAt)}</span>
          </div>
          <h3 className="mt-0.5 text-[15.5px] font-medium leading-snug text-ink">
            {post.title}
          </h3>
          {post.tags.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-hair bg-offwhite px-2 py-0.5 text-[10.5px] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          {post.body && (
            <p className="mt-2 line-clamp-2 text-[13.5px] text-body">
              {post.body}
            </p>
          )}
          <div className="mt-2 flex items-center gap-3 text-[12px] text-muted">
            <UserAvatar
              seed={post.authorUid}
              label={post.authorDisplayName}
              emoji={post.authorAvatarEmoji}
              color={post.authorAvatarColor}
              size="sm"
            />
            <span>💬 {post.commentCount}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
