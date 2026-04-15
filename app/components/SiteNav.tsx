"use client";
import { useEffect, useRef, useState } from "react";
import Logo from "@/app/components/Logo";
import { useAuth } from "@/app/components/AuthProvider";
import { useTheme, THEMES, type Theme } from "@/app/components/ThemeProvider";

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

function ThemePicker() {
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

function BuyProButton() {
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
        <a
          href="/account"
          className="nav-link"
          title={user.email || undefined}
        >
          Account
        </a>
        <button
          onClick={async () => {
            await signOut();
            window.location.href = "/";
          }}
          className="nav-link"
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <a href="/signin" className="nav-link">
      Sign in
    </a>
  );
}
