"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import Logo from "@/app/components/Logo";
import { useAuth } from "@/app/components/AuthProvider";
import NotificationsBell from "@/app/components/NotificationsBell";
import UserAvatar from "@/app/components/UserAvatar";
import { getDb } from "@/lib/firebase";
import { subscribeBookmarks, type Bookmark } from "@/lib/bookmarks";

type NavLinkDef = { href: string; label: string };

// Primary destinations shown inline on ≥md, and inside the hamburger on mobile.
// Keep this list short: five links is the ceiling before the bar feels noisy.
const PRIMARY_LINKS: NavLinkDef[] = [
  { href: "/study", label: "Study" },
  { href: "/chat", label: "Chat" },
  { href: "/practice", label: "Practice" },
  { href: "/insights", label: "Insights" },
  { href: "/social", label: "Community" },
];

// Secondary destinations shown only in the mobile menu and the account dropdown.
// Blog lives here rather than in PRIMARY_LINKS so the main bar stays lean,
// but it still surfaces in the mobile hamburger.
const SECONDARY_LINKS: NavLinkDef[] = [
  { href: "/interactives", label: "Interactives" },
  { href: "/messages", label: "Messages" },
  { href: "/schedule", label: "Schedule" },
  { href: "/blog", label: "Blog" },
  { href: "/shop", label: "Shop" },
];

export default function SiteNav({
  children,
  sticky = true,
  maxWidth = "max-w-6xl",
  primaryLinks,
}: {
  children?: React.ReactNode;
  sticky?: boolean;
  maxWidth?: string;
  /** Override the default app nav links. Use for section anchors on the
   *  marketing homepage where the regular /study /chat /practice links
   *  don't make sense yet. */
  primaryLinks?: NavLinkDef[];
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = primaryLinks ?? PRIMARY_LINKS;

  // Close the mobile menu whenever the route changes so it doesn't linger.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      data-site-nav
      className={`border-b border-hair ${
        sticky ? "sticky top-0 z-50 bg-paper/85 backdrop-blur" : "bg-paper"
      }`}
    >
      <div
        className={`mx-auto flex ${maxWidth} items-center justify-between gap-4 px-6 py-3.5`}
      >
        <div className="flex min-w-0 items-center gap-6">
          <Logo />
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                label={l.label}
                active={isActive(pathname, l.href)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm sm:gap-4">
          {children}
          <NotificationsBell />
          <BuyProButton />
          <div className="hidden md:block">
            <AuthMenu />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="grid h-9 w-9 place-items-center rounded-md border border-hair text-ink hover:bg-offwhite md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-hair bg-paper md:hidden">
          <div className={`mx-auto ${maxWidth} px-6 py-3`}>
            <div className="grid gap-1">
              {[...links, ...(primaryLinks ? [] : SECONDARY_LINKS)].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`rounded-md px-3 py-2 text-sm ${
                    isActive(pathname, l.href)
                      ? "bg-offwhite text-ink"
                      : "text-body hover:bg-offwhite hover:text-ink"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div className="mt-3 border-t border-hair pt-3">
              <AuthMenu />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
        active
          ? "bg-offwhite text-ink"
          : "text-muted hover:bg-offwhite hover:text-ink"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </a>
  );
}

/**
 * Prominent streak display in the nav. Shows even at 0 so new users see
 * the "start your streak" affordance. Milestones (7, 30, 100 days) get a
 * subtle pulsing halo. Hidden on very narrow viewports to keep the nav
 * from wrapping.
 */
function StreakBadge({
  streak,
}: {
  streak: { current: number; longest: number } | null | undefined;
}) {
  const current = streak?.current ?? 0;
  const longest = streak?.longest ?? 0;
  const isMilestone = current >= 7 && (current === 7 || current % 30 === 0);
  const isCold = current === 0;

  return (
    <a
      href="/schedule"
      title={
        isCold
          ? "Start a study streak by claiming a scheduled session"
          : `${current}-day streak · longest ${longest}`
      }
      className={`group relative flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold transition ${
        isCold
          ? "border border-dashed border-hair text-muted hover:border-orange hover:text-orange-ink"
          : "bg-gradient-to-r from-orange/90 to-orange-ink text-white hover:brightness-110"
      }`}
    >
      {isMilestone && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-orange/40"
        />
      )}
      <span aria-hidden="true" className={isCold ? "" : "drop-shadow-sm"}>
        {isCold ? "🔥" : "🔥"}
      </span>
      <span className="relative tabular-nums">
        {isCold ? "Start streak" : current}
      </span>
      {!isCold && current > 0 && (
        <span className="relative hidden text-[10px] font-medium uppercase tracking-wider opacity-80 sm:inline">
          day{current === 1 ? "" : "s"}
        </span>
      )}
    </a>
  );
}

export function BuyProButton() {
  const { getIdToken, plan, planLoading, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  // Don't render the CTA until we've resolved the real plan; otherwise
  // paid users see a "Get Pro" button flash before their plan is confirmed.
  if (loading || planLoading) return null;
  if (plan && plan !== "learner") return null;

  async function buy() {
    const token = await getIdToken();
    if (!token) {
      window.location.href = `/signin?next=${encodeURIComponent(
        "/checkout?plan=pro-monthly"
      )}`;
      return;
    }
    window.location.href = `/checkout?plan=pro-monthly`;
  }

  return (
    <button onClick={buy} disabled={submitting} className="btn-primary">
      {submitting ? "Opening…" : "Get Pro - $11 first month"}
    </button>
  );
}

export function NavUserArea() {
  return <AuthMenu />;
}

function AuthMenu() {
  const { user, loading, configured, signOut, streak, plan, planLoading, profile } =
    useAuth();

  // Don't flash sign-in/sign-out before we know the auth state.
  if (!configured || loading) return null;

  if (user && user.emailVerified) {
    return (
      <div className="flex items-center gap-4">
        <StreakBadge streak={streak} />
        {/* Hide the bookmarks shortcut until plan is confirmed; otherwise
            it pops in a frame after the rest of the nav for returning pros. */}
        {!planLoading && (plan === "pro" || plan === "hacker") && (
          <BookmarksMenu uid={user.uid} />
        )}
        <AccountMenu
          email={user.email}
          displayName={
            profile?.displayName?.trim() ||
            user.displayName?.trim() ||
            null
          }
          avatarEmoji={profile?.avatarEmoji ?? null}
          avatarColor={profile?.avatarColor ?? null}
          plan={plan}
          signOut={signOut}
          uid={user.uid}
        />
      </div>
    );
  }

  return (
    <a href="/signin" className="nav-link">
      Sign in
    </a>
  );
}

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function AccountMenu({
  email,
  displayName,
  avatarEmoji,
  avatarColor,
  plan,
  signOut,
  uid,
}: {
  email: string | null;
  displayName: string | null;
  avatarEmoji: string | null;
  avatarColor: string | null;
  plan: string | null | undefined;
  signOut: () => Promise<void>;
  uid: string;
}) {
  const [open, setOpen] = useState(false);
  const [scheduledDays, setScheduledDays] = useState<number[]>([]);
  const [lastClaimDate, setLastClaimDate] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const today = new Date().getDay();
  const todayYmd = ymdLocal(new Date());

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Subscribe to the schedule doc only once the menu is opened for the
  // first time, so idle users don't pay for the listener.
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if (!open || subscribed) return;
    setSubscribed(true);
    const db = getDb();
    if (!db) return;
    const unsub = onSnapshot(
      doc(db, "users", uid, "profile", "schedule"),
      (snap) => {
        const data = snap.data() as any;
        const days = Array.isArray(data?.days) ? data.days : [];
        setScheduledDays(days.filter((n: any) => typeof n === "number"));
        setLastClaimDate(
          typeof data?.lastClaimDate === "string" ? data.lastClaimDate : ""
        );
      },
      () => {}
    );
    return () => unsub();
  }, [open, subscribed, uid]);

  const claimedToday = lastClaimDate === todayYmd;
  const primaryLabel = displayName || email || "Signed in";
  const avatarLabel = displayName || email || "?";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center rounded-full transition hover:opacity-80"
        title={primaryLabel}
        aria-label="Account menu"
        aria-expanded={open}
      >
        <UserAvatar
          seed={uid}
          label={avatarLabel}
          size="md"
          emoji={avatarEmoji}
          color={avatarColor}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-72 rounded-xl border border-hair bg-paper p-4 shadow-[0_28px_80px_-28px_rgba(0,0,0,0.4)]">
          <div className="mb-3">
            <div className="truncate text-sm font-medium text-ink">
              {primaryLabel}
            </div>
            {displayName && email && (
              <div className="mt-0.5 truncate text-[11px] text-muted">
                {email}
              </div>
            )}
            <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">
              {plan || "learner"} plan
            </div>
          </div>

          <div className="label mb-2">This week</div>
          <div className="flex items-center justify-between gap-1">
            {WEEKDAY_LABELS.map((lbl, i) => {
              const isToday = i === today;
              const isScheduled = scheduledDays.includes(i);
              return (
                <a
                  key={i}
                  href="/schedule"
                  className={`flex h-9 w-9 flex-col items-center justify-center rounded-lg text-[10px] font-medium transition ${
                    isToday
                      ? "bg-ink text-paper"
                      : isScheduled
                      ? "bg-orange-tint text-orange-ink hover:bg-orange/20"
                      : "bg-offwhite text-muted hover:bg-hair/60 hover:text-ink"
                  }`}
                >
                  <span>{lbl}</span>
                  {isScheduled && (
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 h-1 w-1 rounded-full ${
                        isToday ? "bg-paper" : "bg-orange"
                      }`}
                    />
                  )}
                </a>
              );
            })}
          </div>
          <a
            href="/schedule"
            className="mt-3 flex items-center justify-between rounded-md bg-offwhite px-3 py-2 text-[12px] text-muted hover:bg-hair/60 hover:text-ink"
          >
            <span>
              {claimedToday
                ? "Claimed today ✓"
                : scheduledDays.includes(today)
                ? "Check in for today →"
                : "Open calendar →"}
            </span>
          </a>

          <div className="my-3 border-t border-hair" />

          <div className="flex flex-col">
            <a
              href={`/users/${uid}`}
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] text-muted hover:bg-offwhite hover:text-ink"
            >
              <span>Your profile</span>
              <span aria-hidden="true" className="text-dim">
                ›
              </span>
            </a>
            <a
              href="/messages"
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] text-muted hover:bg-offwhite hover:text-ink"
            >
              <span>Messages</span>
              <span aria-hidden="true" className="text-dim">
                ›
              </span>
            </a>
            <a
              href="/account"
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] text-muted hover:bg-offwhite hover:text-ink"
            >
              <span>Account settings</span>
              <span aria-hidden="true" className="text-dim">
                ›
              </span>
            </a>
            <a
              href="/interactives"
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] text-muted hover:bg-offwhite hover:text-ink"
            >
              <span>Interactives</span>
              <span aria-hidden="true" className="text-dim">
                ›
              </span>
            </a>
            {/* Blog link: exposed in the account dropdown so signed-in
                users on desktop can still reach study guides without a
                trip back to the marketing page. */}
            <a
              href="/blog"
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] text-muted hover:bg-offwhite hover:text-ink"
            >
              <span>Blog</span>
              <span aria-hidden="true" className="text-dim">
                ›
              </span>
            </a>
            <a
              href="/shop"
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] text-muted hover:bg-offwhite hover:text-ink"
            >
              <span>Shop tokens</span>
              <span aria-hidden="true" className="text-dim">
                ›
              </span>
            </a>
            <button
              onClick={async () => {
                await signOut();
                window.location.href = "/";
              }}
              className="mt-1 flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[13px] text-muted hover:bg-offwhite hover:text-ink"
            >
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BookmarksMenu({ uid }: { uid: string }) {
  const [open, setOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);
  const [shouldSubscribe, setShouldSubscribe] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Start subscribing the first time the menu is opened, then keep the
  // listener alive so subsequent opens are instant. We can't toggle the
  // subscription flag inside the same effect that owns the listener; the
  // re-run tears down the snapshot before any data arrives.
  useEffect(() => {
    if (open) setShouldSubscribe(true);
  }, [open]);

  useEffect(() => {
    if (!shouldSubscribe) return;
    const db = getDb();
    if (!db) return;
    const unsub = subscribeBookmarks(db, uid, setBookmarks);
    return () => unsub();
  }, [shouldSubscribe, uid]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="grid h-9 w-9 place-items-center rounded-md text-muted hover:bg-offwhite hover:text-ink"
        title="Bookmarks"
        aria-label="Bookmarks"
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
            d="M6 3.75A1.75 1.75 0 0 1 7.75 2h8.5A1.75 1.75 0 0 1 18 3.75v17.19a.5.5 0 0 1-.79.4L12 17.35l-5.21 3.99a.5.5 0 0 1-.79-.4V3.75Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-xl border border-hair bg-paper p-2 shadow-[0_28px_80px_-28px_rgba(0,0,0,0.4)]">
          <div className="label px-2 pt-1 pb-2">Bookmarks</div>
          {bookmarks === null ? (
            <div className="px-2 py-3 text-sm text-muted">Loading…</div>
          ) : bookmarks.length === 0 ? (
            <div className="px-2 py-3 text-[13px] text-muted">
              No bookmarks yet. Open a lesson and hit the ☆ button to save it.
            </div>
          ) : (
            <ul className="max-h-[60vh] overflow-y-auto">
              {bookmarks.map((b) => (
                <li key={b.slug}>
                  <a
                    href={`/study?course=${encodeURIComponent(
                      b.courseSlug
                    )}&lesson=${encodeURIComponent(b.slug)}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2 hover:bg-offwhite"
                  >
                    <div className="text-[11px] uppercase tracking-wider text-muted">
                      {b.courseTitle}
                      {b.unitNumber ? ` · Unit ${b.unitNumber}` : ""}
                    </div>
                    <div className="mt-0.5 truncate text-[14px] text-ink">
                      {b.title}
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

function ymdLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
