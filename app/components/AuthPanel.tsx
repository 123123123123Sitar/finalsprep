"use client";
import { useState } from "react";
import { useAuth } from "./AuthProvider";

type Mode = "signin" | "signup";

/**
 * Sign-in / sign-up form. Used by AuthGate (inline) and the dedicated
 * /signin page. Email verification is required after sign-up.
 */
export default function AuthPanel({
  initialMode = "signup",
  pendingUser = false,
  onSuccess,
}: {
  initialMode?: Mode;
  pendingUser?: boolean;
  onSuccess?: () => void;
}) {
  const { signUp, signIn, resendVerification, signOut, refresh, user } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const fn = mode === "signup" ? signUp : signIn;
    const res = await fn(email.trim(), password);
    setBusy(false);
    if (!res.ok) {
      setMsg({ kind: "err", text: res.message || "Something went wrong." });
    } else if (res.message) {
      setMsg({ kind: "ok", text: res.message });
      if (mode === "signin" && res.ok && onSuccess) onSuccess();
    } else if (mode === "signin" && onSuccess) {
      onSuccess();
    }
    if (mode === "signup" && res.ok) setPassword("");
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
    await refresh();
    setBusy(false);
    if (onSuccess) onSuccess();
  }

  return (
    <div className="mx-auto max-w-md animate-scaleIn">
      <div className="label mb-3">
        {pendingUser ? "Verify your email" : "Sign in required"}
      </div>
      <h2 className="font-serif text-3xl font-normal text-ink">
        {pendingUser
          ? "Check your inbox."
          : mode === "signup"
          ? "Create a free account."
          : "Welcome back."}
      </h2>
      <p className="mt-3 text-sm text-muted">
        {pendingUser
          ? "We sent a verification link to your email. Click it, then come back and hit the button below."
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
      ) : (
        <>
          <form onSubmit={submit} className="mt-8 space-y-3">
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
            <button
              type="submit"
              disabled={busy}
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
