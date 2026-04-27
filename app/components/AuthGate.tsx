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
      <div className="mx-auto flex min-h-0 w-full max-w-xl flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <div className="label mb-4">Sign-in unavailable</div>
        <h2 className="font-serif text-3xl text-ink">
          Sign-in is temporarily unavailable.
        </h2>
        <p className="mt-4 text-muted">
          Try again in a few minutes, or{" "}
          <a className="underline" href="/contact?topic=support">
            contact support
          </a>{" "}
          if it persists.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center text-muted">
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
    <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col justify-center px-6 py-12">
      <AuthPanel
        initialMode="signin"
        pendingUser={!!user && !user.emailVerified}
      />
    </div>
  );
}
