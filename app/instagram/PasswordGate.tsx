"use client";

import { useEffect, useState, type ReactNode, type FormEvent } from "react";
import SiteNav from "@/app/components/SiteNav";

const UNLOCK_KEY = "fp-instagram-unlocked";

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<"loading" | "locked" | "ok">("loading");
  const [password, setPassword] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(UNLOCK_KEY) === "1") {
        setAuthed("ok");
        return;
      }
    } catch {
      // sessionStorage may be disabled — fall through to locked
    }
    setAuthed("locked");
  }, []);

  async function attemptUnlock(e?: FormEvent) {
    if (e) e.preventDefault();
    if (unlocking) return;
    setError("");
    setUnlocking(true);
    try {
      const res = await fetch("/api/admin/instagram-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Wrong password.");
        return;
      }
      try {
        sessionStorage.setItem(UNLOCK_KEY, "1");
      } catch {
        // session storage unavailable — gate will reappear on reload
      }
      setAuthed("ok");
      setPassword("");
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setUnlocking(false);
    }
  }

  if (authed === "ok") return <>{children}</>;

  // Render the same shell while loading and while locked so layout doesn't
  // jump on hydration. The form is hidden until we've checked sessionStorage.
  return (
    <main className="bg-paper">
      <SiteNav />
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
        <div className="label mb-3">Internal · Marketing</div>
        <h1 className="font-serif text-3xl text-ink">
          Enter password to continue.
        </h1>
        <p className="mt-3 text-[14px] text-muted">
          The Instagram ad library is internal. Same password as the rest of
          the marketing tooling.
        </p>
        {authed === "locked" && (
          <form onSubmit={attemptUnlock} className="mt-8">
            <label
              htmlFor="fp-ig-pass"
              className="block text-[13px] font-medium text-ink"
            >
              Password
            </label>
            <input
              id="fp-ig-pass"
              type="password"
              autoFocus
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-hair bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-orange"
              placeholder="••••••••"
            />
            {error && (
              <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-800">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={unlocking || !password}
              className="mt-5 w-full rounded-full bg-orange px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {unlocking ? "Checking…" : "Unlock"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
