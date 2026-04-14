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
        <div className="label mb-4">Auth not configured</div>
        <h2 className="font-serif text-3xl text-ink">
          Firebase isn't wired up yet.
        </h2>
        <p className="mt-4 text-muted">
          Set the <code className="font-mono text-ink">NEXT_PUBLIC_FIREBASE_*</code>{" "}
          variables in <code className="font-mono text-ink">.env.local</code>,
          restart the dev server, and this page will show the sign-in form.
          See the README for setup steps.
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
        initialMode={user ? "signin" : "signup"}
        pendingUser={!!user && !user.emailVerified}
      />
    </div>
  );
}
