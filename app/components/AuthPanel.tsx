"use client";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

type Mode = "signin" | "signup" | "reset";

/**
 * Sign-in / sign-up form. Used by AuthGate (inline) and the dedicated
 * /signin page. Email verification is required after sign-up.
 */
export default function AuthPanel({
  initialMode = "signin",
  pendingUser = false,
  onSuccess,
}: {
  initialMode?: Mode;
  pendingUser?: boolean;
  onSuccess?: () => void;
}) {
  const {
    signUp,
    signIn,
    signInWithGoogle,
    resendVerification,
    sendPasswordReset,
    signOut,
    refresh,
    user,
  } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user?.email]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "signup" && !ageConfirmed) {
      setMsg({
        kind: "err",
        text: "You must confirm you're at least 13 and accept the terms to create an account.",
      });
      return;
    }
    setBusy(true);
    setMsg(null);
    const fn = mode === "signup" ? signUp : signIn;
    const res = await fn(email.trim(), password);
    setBusy(false);
    if (!res.ok) {
      if (mode === "signup" && res.code === "auth/email-already-in-use") {
        setMode("signin");
      }
      setMsg({ kind: "err", text: res.message || "Something went wrong." });
    } else if (res.message) {
      setMsg({ kind: "ok", text: res.message });
      if (mode === "signin" && res.ok && onSuccess) onSuccess();
    } else if (mode === "signin" && onSuccess) {
      onSuccess();
    }
    if (mode === "signup" && res.ok) setPassword("");
  }

  async function doReset(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setMsg({ kind: "err", text: "Enter the email you signed up with." });
      return;
    }
    setBusy(true);
    setMsg(null);
    const r = await sendPasswordReset(email);
    setBusy(false);
    setMsg({ kind: r.ok ? "ok" : "err", text: r.message || "" });
  }

  async function doGoogle() {
    if (mode === "signup" && !ageConfirmed) {
      setMsg({
        kind: "err",
        text: "You must confirm you're at least 13 and accept the terms to create an account.",
      });
      return;
    }
    setBusy(true);
    setMsg(null);
    const r = await signInWithGoogle();
    setBusy(false);
    if (r.ok) {
      if (onSuccess) onSuccess();
    } else if (r.code !== "auth/popup-closed-by-user") {
      setMsg({ kind: "err", text: r.message || "Google sign-in failed." });
    }
  }

  async function doResend() {
    setBusy(true);
    setMsg(null);
    const r = await resendVerification();
    setBusy(false);
    setMsg({ kind: r.ok ? "ok" : "err", text: r.message || "" });
  }

  async function checkVerified() {
    setBusy(true);
    const refreshedUser = await refresh();
    setBusy(false);
    if (refreshedUser?.emailVerified) {
      setMsg(null);
      if (onSuccess) onSuccess();
      return;
    }
    setMsg({
      kind: "err",
      text: "That account still isn't verified yet. Click the email link first, then try again.",
    });
  }

  return (
    <div className="mx-auto max-w-md animate-scaleIn">
      <div className="label mb-3">
        {pendingUser
          ? "Verify your email"
          : mode === "reset"
          ? "Reset password"
          : mode === "signup"
          ? "Create account"
          : "Sign in"}
      </div>
      {!pendingUser && mode !== "reset" && (
        <div className="mb-5 inline-flex rounded-full border border-hair bg-white p-1 text-sm">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setMsg(null);
            }}
            className={`rounded-full px-3 py-1.5 ${
              mode === "signin" ? "bg-ink text-white" : "text-muted hover:text-ink"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setMsg(null);
            }}
            className={`rounded-full px-3 py-1.5 ${
              mode === "signup" ? "bg-ink text-white" : "text-muted hover:text-ink"
            }`}
          >
            Create account
          </button>
        </div>
      )}
      <h2 className="font-serif text-3xl font-normal text-ink">
        {pendingUser
          ? "Check your inbox."
          : mode === "reset"
          ? "Forgot your password?"
          : mode === "signup"
          ? "Create a free account."
          : "Welcome back."}
      </h2>
      <p className="mt-3 text-sm text-muted">
        {pendingUser
          ? "We sent a verification link to your email. Click it, then come back and hit the button below."
          : mode === "reset"
          ? "Enter your email and we'll send you a link to set a new one."
          : "Your chat history is saved to your account so you can pick up where you left off. Email verification is required."}
      </p>

      {pendingUser ? (
        <div className="mt-8 space-y-3">
          <button
            onClick={checkVerified}
            disabled={busy}
            className="btn-primary w-full justify-center disabled:opacity-50"
          >
            {busy ? "Checking…" : "I verified my email"}
          </button>
          <button
            onClick={doResend}
            disabled={busy}
            className="btn-ghost w-full justify-center disabled:opacity-50"
          >
            Resend verification email
          </button>
          <button
            onClick={() => signOut()}
            className="w-full text-center text-xs text-muted hover:text-ink"
          >
            Use a different account
          </button>
        </div>
      ) : mode === "reset" ? (
        <form onSubmit={doReset} className="mt-8 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@school.edu"
            className="focus-ring h-12 w-full rounded-md border border-hair bg-white px-4 text-ink placeholder-dim"
            aria-label="Email"
            autoComplete="email"
          />
          <button
            type="submit"
            disabled={busy}
            className="btn-primary h-12 w-full justify-center disabled:opacity-50"
          >
            {busy ? "Sending…" : "Send reset link"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setMsg(null);
            }}
            className="w-full text-center text-xs text-muted hover:text-ink"
          >
            ← Back to sign in
          </button>
        </form>
      ) : (
        <>
          <button
            type="button"
            onClick={doGoogle}
            disabled={busy}
            className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-md border border-hair bg-white text-[15px] font-medium text-ink transition hover:border-ink disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-0.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            {busy ? "Working…" : "Continue with Google"}
          </button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-hair" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-paper px-3 text-muted">or email</span>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@school.edu"
              className="focus-ring h-12 w-full rounded-md border border-hair bg-white px-4 text-ink placeholder-dim"
              aria-label="Email"
              autoComplete="email"
            />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (6+ characters)"
              className="focus-ring h-12 w-full rounded-md border border-hair bg-white px-4 text-ink placeholder-dim"
              aria-label="Password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
            {mode === "signin" && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {
                    setMode("reset");
                    setMsg(null);
                  }}
                  className="text-xs text-muted hover:text-orange hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}
            {mode === "signup" && (
              <label className="flex cursor-pointer items-start gap-2 pt-1 text-[12px] leading-snug text-body">
                <input
                  type="checkbox"
                  checked={ageConfirmed}
                  onChange={(e) => setAgeConfirmed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-orange"
                  aria-label="Age and terms confirmation"
                />
                <span>
                  I'm at least 13 years old and I agree to the{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
            )}
            <button
              type="submit"
              disabled={busy || (mode === "signup" && !ageConfirmed)}
              className="btn-primary h-12 w-full justify-center disabled:opacity-50"
            >
              {busy ? "Working…" : mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-muted">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setMsg(null);
                  }}
                  className="font-medium text-orange hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have one yet?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setMsg(null);
                  }}
                  className="font-medium text-orange hover:underline"
                >
                  Create one
                </button>
              </>
            )}
          </div>
        </>
      )}

      {msg && (
        <div
          className={`mt-5 rounded-md border p-3 text-sm ${
            msg.kind === "ok"
              ? "border-orange/40 bg-orange-tint text-orange-ink"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {msg.text}
        </div>
      )}
    </div>
  );
}
