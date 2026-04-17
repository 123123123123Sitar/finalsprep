"use client";
import { useAuth } from "./AuthProvider";
import AuthPanel from "./AuthPanel";

/**
 * Wraps children and only renders them when a signed-in, email-verified
 * user is present. Otherwise shows the inline AuthPanel.
 */
export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, configured } = useAuth();

  if (!configured) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <div className="label mb-4">Sign-in unavailable</div>
        <h2 className="font-serif text-3xl text-ink">
          Sign-in is temporarily unavailable.
        </h2>
        <p className="mt-4 text-muted">
          Try again in a few minutes, or email{" "}
          <a className="underline" href="mailto:finalsprephelp@gmail.com">
            finalsprephelp@gmail.com
          </a>{" "}
          if it persists.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted">
        <div className="typing-dots" aria-label="Loading">
          <span /> <span /> <span />
        </div>
      </div>
    );
  }

  if (user && user.emailVerified) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto px-6 py-16">
      <AuthPanel
        initialMode="signin"
        pendingUser={!!user && !user.emailVerified}
      />
    </div>
  );
}
