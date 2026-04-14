"use client";
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
          <AuthMenu />
        </div>
      </div>
    </nav>
  );
}

function AuthMenu() {
  const { user, loading, configured, signOut } = useAuth();

  // Don't flash sign-in/sign-out before we know the auth state.
  if (!configured || loading) return null;

  if (user && user.emailVerified) {
    return (
      <button
        onClick={() => signOut()}
        className="nav-link"
        title={user.email || undefined}
      >
        Sign out
      </button>
    );
  }

  return (
    <a href="/signin" className="nav-link">
      Sign in
    </a>
  );
}
