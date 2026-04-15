"use client";
import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import Logo from "@/app/components/Logo";
import { useAuth } from "@/app/components/AuthProvider";
import { useTheme, THEMES, type Theme } from "@/app/components/ThemeProvider";
import { getDb } from "@/lib/firebase";

export default function SiteNav({
  children,
  sticky = false,
  maxWidth = "max-w-5xl",
}: {
  children?: React.ReactNode;
  sticky?: boolean;
  maxWidth?: string;
}) {
  return (
    <nav
      data-site-nav
      className={`border-b border-hair ${
        sticky ? "sticky top-0 z-30 bg-paper/85 backdrop-blur" : "bg-paper"
      }`}
    >
      <div className={`mx-auto flex ${maxWidth} items-center justify-between px-6 py-4`}>
        <Logo />
        <div className="flex items-center gap-5 text-sm">
          {children}
          <ThemePicker />
          <BuyProButton />
          <AuthMenu />
        </div>
      </div>
    </nav>
  );
}

const THEME_META: Record<Theme, { label: string; icon: string }> = {
  light: { label: "Light", icon: "☀︎" },
  dark: { label: "Dark", icon: "☾" },
  sepia: { label: "Sepia", icon: "✦" },
};

export function ThemePicker() {
  const { theme, setTheme, canUseThemes } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  if (!canUseThemes) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="nav-link flex items-center gap-1"
        title="Theme"
        aria-label="Change theme"
      >
        <span aria-hidden="true">{THEME_META[theme].icon}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-36 rounded-md border border-hair bg-paper py-1 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.35)]">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTheme(t);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm ${
                theme === t ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              <span aria-hidden="true" className="w-4 text-center">
                {THEME_META[t].icon}
              </span>
              <span>{THEME_META[t].label}</span>
              {theme === t && (
                <span className="ml-auto text-xs text-orange">●</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function BuyProButton() {
  const { getIdToken, plan } = useAuth();
  const [loading, setLoading] = useState(false);

  if (plan && plan !== "learner") return null;

  async function buy() {
    setLoading(true);
    try {
      const token = await getIdToken();
      if (!token) {
        window.location.href = `/signin?next=${encodeURIComponent(
          "/?plan=pro-monthly"
        )}`;
        return;
      }
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: "pro-monthly" }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={buy} disabled={loading} className="btn-primary">
      {loading ? "Opening…" : "Get Pro - $11 first month"}
    </button>
  );
}

export function NavUserArea() {
  return <AuthMenu />;
}

function AuthMenu() {
  const { user, loading, configured, signOut, streak, plan } = useAuth();

  // Don't flash sign-in/sign-out before we know the auth state.
  if (!configured || loading) return null;

  if (user && user.emailVerified) {
    return (
      <>
        {streak && streak.current > 0 && (
          <a
            href="/schedule"
            title={`${streak.current}-day streak · longest ${streak.longest}`}
            className="flex items-center gap-1 rounded-full bg-orange-tint px-2 py-0.5 text-xs font-medium text-orange-ink hover:bg-orange/20"
          >
            <span aria-hidden="true">🔥</span>
            <span>{streak.current}</span>
          </a>
        )}
        {(plan === "pro" || plan === "hacker") && (
          <a href="/bookmarks" className="nav-link" title="Saved lessons">
            Saved
          </a>
        )}
        <AccountMenu
          email={user.email}
          plan={plan}
          signOut={signOut}
          uid={user.uid}
        />
      </>
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
  plan,
  signOut,
  uid,
}: {
  email: string | null;
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
  const initial = (email || "?").charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="nav-link flex items-center gap-2"
        title={email || "Account"}
        aria-label="Account menu"
        aria-expanded={open}
      >
        <span
          aria-hidden="true"
          className="grid h-6 w-6 place-items-center rounded-full bg-orange-tint text-[10px] font-semibold text-orange-ink"
        >
          {initial}
        </span>
        <span>Account</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-72 rounded-xl border border-hair bg-paper p-4 shadow-[0_28px_80px_-28px_rgba(0,0,0,0.4)]">
          <div className="mb-3">
            <div className="truncate text-sm font-medium text-ink">
              {email || "Signed in"}
            </div>
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
                      ? "bg-ink text-white"
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
                        isToday ? "bg-white" : "bg-orange"
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
              href="/account"
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] text-muted hover:bg-offwhite hover:text-ink"
            >
              <span>Account settings</span>
              <span aria-hidden="true" className="text-dim">
                ›
              </span>
            </a>
            {(plan === "pro" || plan === "hacker") && (
              <a
                href="/bookmarks"
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] text-muted hover:bg-offwhite hover:text-ink"
              >
                <span>Saved lessons</span>
                <span aria-hidden="true" className="text-dim">
                  ›
                </span>
              </a>
            )}
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

function ymdLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
