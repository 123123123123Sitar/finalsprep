"use client";
import { useState } from "react";
import Logo from "@/app/components/Logo";
import { useAuth } from "@/app/components/AuthProvider";

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
          <BuyProButton />
          <AuthMenu />
        </div>
      </div>
    </nav>
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
  const { user, loading, configured, signOut, streak } = useAuth();

  // Don't flash sign-in/sign-out before we know the auth state.
  if (!configured || loading) return null;

  if (user && user.emailVerified) {
    return (
      <>
        {streak && streak.current > 0 && (
          <a
            href="/account"
            title={`${streak.current}-day streak · longest ${streak.longest}`}
            className="flex items-center gap-1 rounded-full bg-orange-tint px-2 py-0.5 text-xs font-medium text-orange-ink hover:bg-orange/20"
          >
            <span aria-hidden="true">🔥</span>
            <span>{streak.current}</span>
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
