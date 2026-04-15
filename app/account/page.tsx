"use client";
import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb, getFirebaseAuth } from "@/lib/firebase";
import { CATEGORIES, type CourseCategory } from "@/lib/topics";
import { planLabel } from "@/lib/plans";

type AccentKey = "orange" | "blue" | "green" | "plum";

const ACCENTS: { key: AccentKey; label: string; swatch: string }[] = [
  { key: "orange", label: "Orange", swatch: "#d9480f" },
  { key: "blue", label: "Ink blue", swatch: "#1e40af" },
  { key: "green", label: "Pine", swatch: "#166534" },
  { key: "plum", label: "Plum", swatch: "#6b21a8" },
];

type Prefs = {
  defaultCategory: CourseCategory;
  accent: AccentKey;
  mathJaxRender: boolean;
};

const DEFAULT_PREFS: Prefs = {
  defaultCategory: "math",
  accent: "orange",
  mathJaxRender: true,
};

export default function AccountPage() {
  const { user, loading, configured, plan, signOut } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [loadingPrefs, setLoadingPrefs] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/signin?next=/account";
    }
  }, [loading, user]);

  useEffect(() => {
    if (user?.displayName) setDisplayName(user.displayName);
  }, [user?.displayName]);

  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid, "profile", "prefs"));
        if (cancelled) return;
        const data = snap.data() as Partial<Prefs> | undefined;
        if (data) setPrefs({ ...DEFAULT_PREFS, ...data });
      } finally {
        if (!cancelled) setLoadingPrefs(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  async function save() {
    if (!user) return;
    setSaving(true);
    setMsg(null);
    try {
      const auth = getFirebaseAuth();
      if (auth?.currentUser && displayName.trim() !== (user.displayName || "")) {
        await updateProfile(auth.currentUser, {
          displayName: displayName.trim(),
        });
      }
      const db = getDb();
      if (db) {
        await setDoc(
          doc(db, "users", user.uid, "profile", "prefs"),
          { ...prefs, updatedAt: serverTimestamp() },
          { merge: true }
        );
      }
      setMsg({ kind: "ok", text: "Saved. Your preferences will apply next load." });
    } catch (e: any) {
      setMsg({
        kind: "err",
        text: e?.message || "Could not save. Check your connection.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    window.location.href = "/";
  }

  if (!configured) {
    return (
      <main className="bg-paper text-body">
        <SiteNav>
          <a href="/study" className="nav-link">Study</a>
          <a href="/" className="nav-link">Home</a>
        </SiteNav>
        <section className="mx-auto max-w-xl px-6 py-24 text-center">
          <div className="label mb-3">Auth not configured</div>
          <h2 className="font-serif text-3xl text-ink">
            Firebase isn't wired up yet.
          </h2>
          <p className="mt-4 text-muted">
            Set <code className="font-mono text-ink">NEXT_PUBLIC_FIREBASE_*</code>{" "}
            in <code className="font-mono text-ink">.env.local</code> and
            restart the dev server.
          </p>
        </section>
      </main>
    );
  }

  if (loading || !user) {
    return (
      <main className="bg-paper text-body">
        <SiteNav>
          <a href="/study" className="nav-link">Study</a>
          <a href="/" className="nav-link">Home</a>
        </SiteNav>
        <section className="mx-auto max-w-2xl px-6 py-24">
          <div className="flex h-40 items-center justify-center text-muted">
            <div className="typing-dots" aria-label="Loading">
              <span /> <span /> <span />
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav>
        <a href="/study" className="nav-link">Study</a>
        <a href="/chat" className="nav-link">Chat</a>
        <a href="/" className="nav-link">Home</a>
      </SiteNav>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="label mb-3">Account</div>
        <h1 className="font-serif text-[44px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[52px]">
          Your settings.
        </h1>
        <p className="mt-3 text-[15px] text-muted">
          Signed in as <span className="text-ink">{user.email}</span>. Current
          plan: <span className="text-ink">{planLabel(plan)}</span>.
        </p>

        <div className="mt-10 space-y-10">
          {/* Display name */}
          <div>
            <label className="label mb-2 block">Display name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="What should we call you?"
              className="w-full rounded-md border border-hair bg-white px-4 py-3 text-[15px] text-ink outline-none focus:border-orange"
              maxLength={60}
            />
            <p className="mt-2 text-xs text-muted">
              Shown on the top of chat replies. Private — never sent to other
              users.
            </p>
          </div>

          {/* Default course category */}
          <div>
            <div className="label mb-2">Default category on Study</div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() =>
                    setPrefs((p) => ({ ...p, defaultCategory: c.key }))
                  }
                  className={`rounded-md border px-3 py-2 text-sm transition ${
                    prefs.defaultCategory === c.key
                      ? "border-orange bg-orange-tint text-ink"
                      : "border-hair bg-white text-body hover:border-orange"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">
              Which category the Study page opens to when you land there.
            </p>
          </div>

          {/* Accent color */}
          <div>
            <div className="label mb-2">Accent color</div>
            <div className="flex flex-wrap gap-2">
              {ACCENTS.map((a) => (
                <button
                  key={a.key}
                  onClick={() => setPrefs((p) => ({ ...p, accent: a.key }))}
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition ${
                    prefs.accent === a.key
                      ? "border-ink"
                      : "border-hair hover:border-ink"
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: a.swatch }}
                  />
                  {a.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">
              Used for highlights and button accents across the app.
            </p>
          </div>

          {/* Math rendering */}
          <div>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={prefs.mathJaxRender}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, mathJaxRender: e.target.checked }))
                }
                className="mt-[3px] h-4 w-4 accent-orange"
              />
              <span>
                <span className="text-[15px] text-ink">
                  Render math with KaTeX
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Turn off if equations look wrong on your device — we'll fall
                  back to plain text.
                </span>
              </span>
            </label>
          </div>

          {/* Plan status */}
          <div className="rounded-xl border border-hair bg-offwhite p-5">
            <div className="label mb-2">AI tutor model</div>
            <p className="text-[15px] text-body">
              {plan === "hacker"
                ? "You're on Hacker — the strongest reasoning model is active, plus Thinking mode for the hardest problems."
                : plan === "pro"
                ? "You're on Pro — you get the smart model by default, plus a Thinking mode toggle in chat for harder problems."
                : "You're on Learner — the standard model is active. Upgrade to Pro or Hacker for a smarter model and Thinking mode."}
            </p>
          </div>

          {/* Save + feedback */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={save}
              disabled={saving || loadingPrefs}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button onClick={handleSignOut} className="btn-ghost">
              Sign out
            </button>
            {msg && (
              <span
                className={`text-sm ${
                  msg.kind === "ok" ? "text-green-700" : "text-red-700"
                }`}
              >
                {msg.text}
              </span>
            )}
          </div>

          {/* Plan / danger zone */}
          <div className="border-t border-hair pt-8">
            <div className="label mb-2">Subscription</div>
            {plan === "learner" ? (
              <p className="text-[15px] text-body">
                You're on the free plan.{" "}
                <a href="/#pricing" className="text-orange underline">
                  See pricing →
                </a>
              </p>
            ) : (
              <p className="text-[15px] text-body">
                You're on the <strong className="text-ink">{planLabel(plan)}</strong>{" "}
                plan. To cancel or change billing, use the link in your most
                recent Stripe receipt email.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
