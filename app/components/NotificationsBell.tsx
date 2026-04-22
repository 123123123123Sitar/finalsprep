"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import { relativeTime, type AppNotification } from "@/lib/social";

/**
 * Nav-bar bell with a dropdown showing recent notifications. Polls every 30s
 * while the user is signed in. Clicking the bell fetches fresh and marks all
 * unread as read on the server the first time it's opened after new unread
 * notifications land.
 */
export default function NotificationsBell() {
  const { user, getIdToken } = useAuth();
  const [items, setItems] = useState<AppNotification[] | null>(null);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    if (!user) return;
    try {
      const token = await getIdToken();
      if (!token) return;
      const res = await fetch("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      setItems(data.notifications || []);
      setUnread(data.unread || 0);
    } catch {
      // Ignore — nav bell should never surface errors.
    }
  }, [user, getIdToken]);

  useEffect(() => {
    if (!user) {
      setItems(null);
      setUnread(0);
      return;
    }
    load();
    const id = window.setInterval(load, 30_000);
    return () => window.clearInterval(id);
  }, [user, load]);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  async function toggleOpen() {
    const next = !open;
    setOpen(next);
    if (next) {
      await load();
      if (unread > 0) {
        try {
          const token = await getIdToken();
          if (!token) return;
          await fetch("/api/notifications/read", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });
          setUnread(0);
          setItems((prev) =>
            prev ? prev.map((n) => ({ ...n, read: true })) : prev
          );
        } catch {
          // Swallow.
        }
      }
    }
  }

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggleOpen}
        className="relative grid h-9 w-9 place-items-center rounded-md text-muted hover:bg-offwhite hover:text-ink"
        title="Notifications"
        aria-label="Notifications"
        aria-expanded={open}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 1 1-6 0m6 0H9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {unread > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-orange px-1 text-[9px] font-semibold text-white"
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-xl border border-hair bg-paper p-2 shadow-[0_28px_80px_-28px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-between px-2 pt-1 pb-2">
            <div className="label">Notifications</div>
            {items && items.length > 0 && (
              <span className="text-[10px] uppercase tracking-wider text-dim">
                Last 50
              </span>
            )}
          </div>
          {items === null ? (
            <div className="px-2 py-4 text-sm text-muted">Loading…</div>
          ) : items.length === 0 ? (
            <div className="px-2 py-6 text-center text-[13px] text-muted">
              Nothing here yet. When someone follows you or DMs you, it'll
              show up here.
            </div>
          ) : (
            <ul className="max-h-[60vh] divide-y divide-hair overflow-y-auto">
              {items.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.link || "#"}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-2 py-2 hover:bg-offwhite ${
                      n.read ? "" : "bg-orange-tint/30"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 text-[14px]"
                      >
                        {kindGlyph(n.kind)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] text-ink">{n.text}</div>
                        <div className="mt-0.5 text-[11px] text-muted">
                          {relativeTime(n.createdAt)}
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function kindGlyph(kind: AppNotification["kind"]): string {
  switch (kind) {
    case "follow":
      return "👤";
    case "message":
      return "✉️";
    case "comment_reply":
      return "💬";
    default:
      return "🔔";
  }
}
