"use client";
import { usePathname } from "next/navigation";

type Tab = { href: string; label: string };

const TABS: Tab[] = [
  { href: "/social", label: "Forums" },
  { href: "/leaderboard", label: "Leaderboards" },
  { href: "/messages", label: "Messages" },
];

/**
 * Sub-nav used across the Community hub (feed, leaderboards, messages) so
 * they feel like one surface even though they're separate routes. Rendered
 * immediately under the site nav on each of those pages.
 */
export default function CommunityTabs() {
  const pathname = usePathname();
  return (
    <div className="border-b border-hair bg-paper">
      <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-6">
        {TABS.map((t) => {
          const active = isActive(pathname, t.href);
          return (
            <a
              key={t.href}
              href={t.href}
              className={`-mb-px border-b-2 px-4 py-2.5 text-[13.5px] transition ${
                active
                  ? "border-orange text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {t.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(href + "/");
}
