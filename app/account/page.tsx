"use client";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import SiteNav from "@/app/components/SiteNav";
import ThemePicker from "@/app/components/ThemePicker";
import UserAvatar from "@/app/components/UserAvatar";
import { useAuth } from "@/app/components/AuthProvider";
import PageLoader from "@/app/components/PageLoader";
import { getDb, getFirebaseAuth } from "@/lib/firebase";
import {
  DEFAULT_AI_PREFS,
  normalizeAiPrefs,
  type AiPrefs,
} from "@/lib/aiPrefs";
import { planLabel } from "@/lib/plans";
import {
  AVATAR_COLOR_OPTIONS,
  AVATAR_EMOJI_OPTIONS,
  GRADE_OPTIONS,
  INTEREST_OPTIONS,
  MAX_INTERESTS,
  validateUsername,
} from "@/lib/social";

type Prefs = AiPrefs & {
  selectedCourses: string[];
};

const DEFAULT_PREFS: Prefs = {
  selectedCourses: [],
  ...DEFAULT_AI_PREFS,
};

type TabKey = "profile" | "preferences" | "billing" | "support";

const TABS: { key: TabKey; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "preferences", label: "Preferences" },
  { key: "billing", label: "Billing" },
  { key: "support", label: "Support" },
];

type Msg = { kind: "ok" | "err"; text: string } | null;

export default function AccountPage() {
  return (
    <Suspense fallback={<AccountSkeleton />}>
      <AccountInner />
    </Suspense>
  );
}

function AccountSkeleton() {
  return (
    <main className="bg-paper text-body">
      <SiteNav />
      <PageLoader />
    </main>
  );
}

function AccountInner() {
  const { user, loading, configured, plan, signOut, getIdToken } = useAuth();
  const searchParams = useSearchParams();
  const initialTab = normalizeTab(searchParams.get("tab"));
  const [tab, setTab] = useState<TabKey>(initialTab);

  // ---------- Profile tab state ----------
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarEmoji, setAvatarEmoji] = useState<string | null>(null);
  const [avatarColor, setAvatarColor] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [gradeLevel, setGradeLevel] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);

  // ---------- Preferences tab state ----------
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [loadingPrefs, setLoadingPrefs] = useState(true);
  const [masteryUnlock, setMasteryUnlock] = useState(false);

  // ---------- Billing tab state ----------
  const [bonusBalance, setBonusBalance] = useState<number | null>(null);
  const [referral, setReferral] = useState<{
    code: string;
    referredCount: number;
    totalEarnedTokens: number;
  } | null>(null);

  // ---------- Save state ----------
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<Msg>(null);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/signin?next=/account";
    }
  }, [loading, user]);

  useEffect(() => {
    if (user?.displayName) setDisplayName(user.displayName);
  }, [user?.displayName]);

  // Initial profile fetch.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const token = await getIdToken();
        if (!token) return;
        const res = await fetch("/api/me/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        const p = data?.profile;
        if (p) {
          if (typeof p.username === "string") setUsername(p.username);
          if (typeof p.bio === "string") setBio(p.bio);
          setAvatarEmoji(p.avatarEmoji ?? null);
          setAvatarColor(p.avatarColor ?? null);
          setAvatarUrl(p.avatarUrl ?? null);
          setGradeLevel(typeof p.gradeLevel === "string" ? p.gradeLevel : null);
          setInterests(Array.isArray(p.interests) ? p.interests : []);
          setDisplayName((prev) =>
            prev || (typeof p.displayName === "string" ? p.displayName : "")
          );
        }
      } catch {
        /* best-effort */
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, getIdToken]);

  // Prefs load (mastery unlock etc.).
  useEffect(() => {
    if (!user) {
      setLoadingPrefs(false);
      return;
    }
    const db = getDb();
    if (!db) {
      setLoadingPrefs(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid, "profile", "prefs"));
        if (cancelled) return;
        const data = snap.data() as
          | (Partial<Prefs> & { masteryUnlock?: boolean })
          | undefined;
        if (data) {
          setPrefs({ ...DEFAULT_PREFS, ...data, ...normalizeAiPrefs(data) });
          setMasteryUnlock(!!data.masteryUnlock);
        }
      } finally {
        if (!cancelled) setLoadingPrefs(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Token bank subscription.
  useEffect(() => {
    if (!user) return;
    const db = getDb();
    if (!db) return;
    const unsub = onSnapshot(
      doc(db, "users", user.uid, "profile", "tokenBank"),
      (snap) => {
        const d = snap.data() as { balance?: number } | undefined;
        setBonusBalance(typeof d?.balance === "number" ? d.balance : 0);
      },
      () => setBonusBalance(0)
    );
    return () => unsub();
  }, [user]);

  // Referral panel data.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const token = await getIdToken();
        if (!token) return;
        const res = await fetch("/api/referral/code", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled || !data?.code) return;
        setReferral({
          code: data.code,
          referredCount: data.referredCount ?? 0,
          totalEarnedTokens: data.totalEarnedTokens ?? 0,
        });
      } catch {
        /* panel hidden on error */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, getIdToken]);

  const toggleInterest = useCallback((i: string) => {
    setInterests((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i);
      return prev.length >= MAX_INTERESTS ? prev : [...prev, i];
    });
  }, []);

  async function saveProfile() {
    if (!user) return;
    const trimmedUsername = username.trim();
    if (trimmedUsername) {
      const err = validateUsername(trimmedUsername);
      if (err) {
        setMsg({ kind: "err", text: err });
        return;
      }
    }
    setSaving(true);
    setMsg(null);
    try {
      const auth = getFirebaseAuth();
      if (auth?.currentUser && displayName.trim() !== (user.displayName || "")) {
        await updateProfile(auth.currentUser, {
          displayName: displayName.trim(),
        });
      }
      const token = await getIdToken();
      if (token) {
        const res = await fetch("/api/me/profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            displayName: displayName.trim() || undefined,
            username: trimmedUsername || undefined,
            bio,
            avatarEmoji,
            avatarColor,
            gradeLevel,
            interests,
          }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          setMsg({ kind: "err", text: data?.error || "Could not save profile." });
          return;
        }
      }
      setMsg({ kind: "ok", text: "Profile saved." });
    } catch (e: any) {
      setMsg({
        kind: "err",
        text: e?.message || "Could not save. Check your connection.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function savePreferences() {
    if (!user) return;
    setSaving(true);
    setMsg(null);
    try {
      const db = getDb();
      if (db) {
        const normalizedAiPrefs = normalizeAiPrefs(prefs);
        const { selectedCourses: _ignored, ...rest } = prefs;
        await setDoc(
          doc(db, "users", user.uid, "profile", "prefs"),
          {
            ...rest,
            ...normalizedAiPrefs,
            masteryUnlock,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
      setMsg({ kind: "ok", text: "Preferences saved." });
    } catch (e: any) {
      setMsg({ kind: "err", text: e?.message || "Could not save preferences." });
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
        </SiteNav>
        <section className="mx-auto max-w-xl px-6 py-24 text-center">
          <div className="label mb-3">Account unavailable</div>
          <h2 className="font-serif text-3xl text-ink">
            Account access is temporarily unavailable.
          </h2>
          <p className="mt-4 text-muted">
            Try again in a few minutes, or{" "}
            <a className="underline" href="/contact?topic=support">
              contact support
            </a>{" "}
            if it persists.
          </p>
        </section>
      </main>
    );
  }

  if (loading || !user) {
    return (
      <main className="bg-paper text-body">
        <SiteNav />
        <PageLoader />
      </main>
    );
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav />

      <section className="mx-auto max-w-3xl px-6 pb-24 pt-12 sm:pt-16">
        <div className="flex flex-col gap-1">
          <div className="label">Account</div>
          <h1 className="font-serif text-[40px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[48px]">
            Settings
          </h1>
          <p className="mt-2 text-[14px] text-muted">
            Signed in as <span className="text-ink">{user.email}</span> ·{" "}
            <span className="text-ink">{planLabel(plan)}</span> plan ·{" "}
            <a href="/profile" className="text-orange underline">
              View public profile →
            </a>
          </p>
        </div>

        <TabBar active={tab} onChange={setTab} />

        <div className="mt-8">
          {tab === "profile" && (
            <ProfileTab
              uid={user.uid}
              email={user.email}
              displayName={displayName}
              setDisplayName={setDisplayName}
              username={username}
              setUsername={setUsername}
              bio={bio}
              setBio={setBio}
              avatarEmoji={avatarEmoji}
              setAvatarEmoji={setAvatarEmoji}
              avatarColor={avatarColor}
              setAvatarColor={setAvatarColor}
              avatarUrl={avatarUrl}
              setAvatarUrl={setAvatarUrl}
              gradeLevel={gradeLevel}
              setGradeLevel={setGradeLevel}
              interests={interests}
              toggleInterest={toggleInterest}
              getIdToken={getIdToken}
              onError={(text) => setMsg({ kind: "err", text })}
              onOk={(text) => setMsg({ kind: "ok", text })}
            />
          )}
          {tab === "preferences" && (
            <PreferencesTab
              masteryUnlock={masteryUnlock}
              setMasteryUnlock={setMasteryUnlock}
              plan={plan}
              loading={loadingPrefs}
            />
          )}
          {tab === "billing" && (
            <BillingTab
              plan={plan}
              bonusBalance={bonusBalance}
              referral={referral}
              getIdToken={getIdToken}
            />
          )}
          {tab === "support" && (
            <SupportTab onSignOut={handleSignOut} />
          )}
        </div>

        {(tab === "profile" || tab === "preferences") && (
          <StickySaveBar
            saving={saving}
            msg={msg}
            onSave={tab === "profile" ? saveProfile : savePreferences}
            disabled={tab === "preferences" && loadingPrefs}
          />
        )}
      </section>
    </main>
  );
}

function normalizeTab(raw: string | null): TabKey {
  if (raw === "preferences" || raw === "billing" || raw === "support") {
    return raw;
  }
  return "profile";
}

function TabBar({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  return (
    <nav
      role="tablist"
      aria-label="Account settings"
      className="mt-8 flex flex-wrap gap-1 border-b border-hair"
    >
      {TABS.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              onChange(t.key);
              // Reflect tab in URL so refreshes stay on the same panel.
              if (typeof window !== "undefined") {
                const url = new URL(window.location.href);
                url.searchParams.set("tab", t.key);
                window.history.replaceState({}, "", url.toString());
              }
            }}
            className={`-mb-px rounded-t-md border-b-2 px-4 py-2.5 text-[14px] font-medium transition ${
              isActive
                ? "border-orange text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

function StickySaveBar({
  saving,
  msg,
  onSave,
  disabled,
}: {
  saving: boolean;
  msg: Msg;
  onSave: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className="sticky bottom-4 z-10 mt-10 flex flex-wrap items-center gap-3 rounded-xl border border-hair bg-paper/95 px-4 py-3 shadow-lg backdrop-blur"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
    >
      <button
        onClick={onSave}
        disabled={saving || disabled}
        className="btn-primary disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save changes"}
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
  );
}

// ===========================================================================
// Profile tab
// ===========================================================================

function ProfileTab(props: {
  uid: string;
  email: string | null;
  displayName: string;
  setDisplayName: (v: string) => void;
  username: string;
  setUsername: (v: string) => void;
  bio: string;
  setBio: (v: string) => void;
  avatarEmoji: string | null;
  setAvatarEmoji: (v: string | null) => void;
  avatarColor: string | null;
  setAvatarColor: (v: string | null) => void;
  avatarUrl: string | null;
  setAvatarUrl: (v: string | null) => void;
  gradeLevel: string | null;
  setGradeLevel: (v: string | null) => void;
  interests: string[];
  toggleInterest: (i: string) => void;
  getIdToken: () => Promise<string | null>;
  onError: (text: string) => void;
  onOk: (text: string) => void;
}) {
  return (
    <div className="space-y-6">
      <Card title="Basics" hint="Shown wherever your name appears.">
        <Field label="Display name" hint="Used on chat replies, the feed, and your public profile.">
          <input
            type="text"
            value={props.displayName}
            onChange={(e) => props.setDisplayName(e.target.value)}
            placeholder="What should we call you?"
            className="w-full rounded-md border border-hair bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-orange"
            maxLength={60}
          />
        </Field>

        <Field label="Username" hint="Your profile URL. 3-24 chars, letters/numbers/dot/underscore. Must be unique.">
          <div className="flex items-center">
            <span className="rounded-l-md border border-r-0 border-hair bg-offwhite px-3 py-3 text-[15px] text-muted">
              @
            </span>
            <input
              type="text"
              value={props.username}
              onChange={(e) => props.setUsername(e.target.value)}
              placeholder="your_handle"
              className="w-full rounded-r-md border border-hair bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-orange"
              maxLength={24}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>
        </Field>

        <Field label={`Bio (${props.bio.length} / 280)`} hint="Shown on your public profile.">
          <textarea
            value={props.bio}
            onChange={(e) => props.setBio(e.target.value)}
            placeholder="A line or two about what you're studying."
            rows={3}
            maxLength={280}
            className="w-full resize-none rounded-md border border-hair bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-orange"
          />
        </Field>
      </Card>

      <Card title="Profile picture" hint="Upload a photo, or pick an emoji + color combo.">
        <AvatarEditor
          uid={props.uid}
          label={props.displayName || props.username || props.email || "You"}
          avatarEmoji={props.avatarEmoji}
          setAvatarEmoji={props.setAvatarEmoji}
          avatarColor={props.avatarColor}
          setAvatarColor={props.setAvatarColor}
          avatarUrl={props.avatarUrl}
          setAvatarUrl={props.setAvatarUrl}
          getIdToken={props.getIdToken}
          onError={props.onError}
          onOk={props.onOk}
        />
      </Card>

      <Card title="Grade level" hint="Helps the AI pitch examples at the right depth.">
        <div className="flex flex-wrap gap-2">
          {GRADE_OPTIONS.map((g) => {
            const active = props.gradeLevel === g;
            return (
              <button
                key={g}
                type="button"
                onClick={() => props.setGradeLevel(active ? null : g)}
                className={`rounded-full border px-3 py-1 text-[13px] transition ${
                  active
                    ? "border-orange bg-orange-tint text-orange-ink"
                    : "border-hair bg-paper text-muted hover:border-orange/60 hover:text-ink"
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </Card>

      <Card title="Interests" hint={`Pick up to ${MAX_INTERESTS}. We'll lean on these for analogies and classmate suggestions.`}>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((i) => {
            const active = props.interests.includes(i);
            const atLimit = props.interests.length >= MAX_INTERESTS && !active;
            return (
              <button
                key={i}
                type="button"
                disabled={atLimit}
                onClick={() => props.toggleInterest(i)}
                className={`rounded-full border px-3 py-1 text-[13px] transition disabled:opacity-40 ${
                  active
                    ? "border-orange bg-orange-tint text-orange-ink"
                    : "border-hair bg-paper text-muted hover:border-orange/60 hover:text-ink"
                }`}
              >
                {active ? "✓ " : ""}
                {i}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted">
          {props.interests.length} / {MAX_INTERESTS} selected
        </p>
      </Card>
    </div>
  );
}

function AvatarEditor({
  uid,
  label,
  avatarEmoji,
  setAvatarEmoji,
  avatarColor,
  setAvatarColor,
  avatarUrl,
  setAvatarUrl,
  getIdToken,
  onError,
  onOk,
}: {
  uid: string;
  label: string;
  avatarEmoji: string | null;
  setAvatarEmoji: (v: string | null) => void;
  avatarColor: string | null;
  setAvatarColor: (v: string | null) => void;
  avatarUrl: string | null;
  setAvatarUrl: (v: string | null) => void;
  getIdToken: () => Promise<string | null>;
  onError: (text: string) => void;
  onOk: (text: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    if (!file.type.startsWith("image/")) {
      onError("That file doesn't look like an image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onError("Image must be under 5MB.");
      return;
    }
    setUploading(true);
    try {
      const token = await getIdToken();
      if (!token) {
        onError("You need to be signed in.");
        return;
      }
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/me/avatar", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        onError(data?.error || "Upload failed.");
        return;
      }
      setAvatarUrl(data?.avatarUrl || null);
      onOk("Photo updated.");
    } catch (e: any) {
      onError(e?.message || "Upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function removePhoto() {
    setUploading(true);
    try {
      const token = await getIdToken();
      if (!token) return;
      const res = await fetch("/api/me/avatar", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        onError(data?.error || "Could not remove photo.");
        return;
      }
      setAvatarUrl(null);
      onOk("Photo removed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={label}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
        ) : (
          <UserAvatar
            seed={uid}
            label={label}
            emoji={avatarEmoji}
            color={avatarColor}
            size="lg"
          />
        )}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="btn-ghost text-sm disabled:opacity-50"
          >
            {uploading ? "Working…" : avatarUrl ? "Replace photo" : "Upload photo"}
          </button>
          {avatarUrl && (
            <button
              type="button"
              onClick={removePhoto}
              disabled={uploading}
              className="rounded-md border border-hair px-3 py-1.5 text-[13px] text-muted hover:text-ink disabled:opacity-50"
            >
              Remove photo
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload(f);
            }}
          />
        </div>
      </div>

      {!avatarUrl && (
        <>
          <div className="mt-5 label">Accent color</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {AVATAR_COLOR_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setAvatarColor(c)}
                aria-label={`Color ${c}`}
                className={`h-6 w-6 rounded-full border-2 transition ${
                  avatarColor === c
                    ? "border-ink scale-110"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="mt-5 label">Emoji</div>
          <div className="mt-2 grid grid-cols-10 gap-1">
            <button
              type="button"
              onClick={() => setAvatarEmoji(null)}
              className={`grid h-8 w-8 place-items-center rounded-md border text-[11px] ${
                avatarEmoji === null
                  ? "border-orange bg-orange-tint text-orange-ink"
                  : "border-hair text-muted hover:bg-paper"
              }`}
              title="Use initial"
            >
              A
            </button>
            {AVATAR_EMOJI_OPTIONS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setAvatarEmoji(e)}
                className={`grid h-8 w-8 place-items-center rounded-md border text-[16px] ${
                  avatarEmoji === e
                    ? "border-orange bg-orange-tint"
                    : "border-hair hover:bg-paper"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ===========================================================================
// Preferences tab
// ===========================================================================

function PreferencesTab({
  masteryUnlock,
  setMasteryUnlock,
  plan,
  loading,
}: {
  masteryUnlock: boolean;
  setMasteryUnlock: (v: boolean) => void;
  plan: "learner" | "pro" | "hacker";
  loading: boolean;
}) {
  return (
    <div className="space-y-6">
      <Card title="Appearance" hint="Pick a theme for the whole app. Syncs across devices while signed in.">
        <ThemePicker />
      </Card>

      <Card
        title="Practice mastery unlock"
        hint="Enforce progression: medium problems stay locked until you ace easy, and hard stays locked until you ace medium."
      >
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={masteryUnlock}
            onChange={(e) => setMasteryUnlock(e.target.checked)}
            disabled={loading}
            className="h-4 w-4 rounded border-hair accent-orange"
          />
          <span className="text-[14px] text-ink">
            Enable mastery unlock for practice problems
          </span>
        </label>
      </Card>

      <Card title="AI tutor">
        <p className="text-[14px] text-body">
          {plan === "hacker"
            ? "You're on Hacker: the strongest reasoning model is active, plus Thinking mode for the hardest problems."
            : plan === "pro"
            ? "You're on Pro: smart model by default, with a Thinking toggle inside chat for harder problems."
            : "You're on Learner: the standard model is active. Upgrade to Pro or Hacker for a smarter model and Thinking mode."}
        </p>
        <p className="mt-3 text-[14px] text-body">
          Response length, mode, personality, and custom instructions live inside the chat. Open chat and click the gear next to your email in the sidebar footer.
        </p>
        <a href="/chat" className="btn-ghost mt-4 inline-flex text-sm">
          Open chat settings →
        </a>
      </Card>
    </div>
  );
}

// ===========================================================================
// Billing tab
// ===========================================================================

function BillingTab({
  plan,
  bonusBalance,
  referral,
  getIdToken,
}: {
  plan: "learner" | "pro" | "hacker";
  bonusBalance: number | null;
  referral: {
    code: string;
    referredCount: number;
    totalEarnedTokens: number;
  } | null;
  getIdToken: () => Promise<string | null>;
}) {
  return (
    <div className="space-y-6">
      <Card title="Subscription">
        {plan === "learner" ? (
          <p className="text-[15px] text-body">
            You're on the free Learner plan.{" "}
            <a href="/#pricing" className="text-orange underline">
              See pricing →
            </a>
          </p>
        ) : (
          <>
            <p className="text-[15px] text-body">
              You're on the{" "}
              <strong className="text-ink">{planLabel(plan)}</strong> plan.
            </p>
            <p className="mt-2 text-[13px] text-muted">
              Plans renew as one-time Ko-fi shop orders. Your access runs
              through the end of the paid period, then drops to Learner unless
              renewed.
            </p>
          </>
        )}
      </Card>

      <Card title="Bonus tokens" hint="Spent automatically when your daily budget runs out.">
        <p className="text-[15px] text-body">
          You have{" "}
          <span className="font-semibold text-ink">
            {bonusBalance === null ? "…" : bonusBalance.toLocaleString()}
          </span>{" "}
          bonus tokens available.
        </p>
        <a href="/shop" className="btn-ghost mt-4 inline-flex text-sm">
          Top up tokens →
        </a>
      </Card>

      <ReferralCard referral={referral} />

      <GiftsCard getIdToken={getIdToken} />
    </div>
  );
}

type BuyerGift = {
  code: string;
  tier: "pro" | "hacker";
  interval: "monthly" | "sixmonth";
  createdAt: number;
  redeemed: boolean;
  redeemedAt?: number | null;
};

function GiftsCard({
  getIdToken,
}: {
  getIdToken: () => Promise<string | null>;
}) {
  const [gifts, setGifts] = useState<BuyerGift[] | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = await getIdToken();
      if (!token) {
        if (!cancelled) setGifts([]);
        return;
      }
      try {
        const res = await fetch("/api/gifts/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          if (!cancelled) setGifts([]);
          return;
        }
        const data = await res.json();
        if (!cancelled) setGifts(Array.isArray(data?.gifts) ? data.gifts : []);
      } catch {
        if (!cancelled) setGifts([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [getIdToken]);

  async function copy(code: string) {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/gift?code=${code}`
        : `/gift?code=${code}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(code);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked — the input field fallback handles it */
    }
  }

  return (
    <Card
      title="Gifts"
      hint="Gift a plan to a friend: earn 1,000 tokens for Pro or 2,500 for Hacker. After the purchase clears, a code appears here."
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <a
          href="/checkout?gift=gift-pro-monthly"
          className="rounded-lg border border-hair bg-paper p-4 transition hover:border-orange"
        >
          <div className="text-sm font-semibold text-ink">
            Gift Pro - 1 month
          </div>
          <div className="mt-0.5 text-[12px] text-muted">
            Earn 1,000 bonus tokens
          </div>
        </a>
        <a
          href="/checkout?gift=gift-hacker-monthly"
          className="rounded-lg border border-hair bg-paper p-4 transition hover:border-orange"
        >
          <div className="text-sm font-semibold text-ink">
            Gift Hacker - 1 month
          </div>
          <div className="mt-0.5 text-[12px] text-muted">
            Earn 2,500 bonus tokens
          </div>
        </a>
      </div>
      <div className="mt-3">
        <a href="/gift" className="btn-ghost inline-flex text-sm">
          Redeem a code
        </a>
      </div>

      {gifts === null ? (
        <p className="mt-4 text-[13px] text-muted">Loading your gifts…</p>
      ) : gifts.length === 0 ? (
        <p className="mt-4 text-[13px] text-muted">
          No gift codes yet. Once you purchase a gift plan on Ko-fi, its
          redemption code will show up here.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {gifts.map((g) => {
            const link =
              typeof window !== "undefined"
                ? `${window.location.origin}/gift?code=${g.code}`
                : `/gift?code=${g.code}`;
            return (
              <li
                key={g.code}
                className="flex flex-wrap items-center gap-3 rounded-md border border-hair bg-paper p-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-sm tracking-widest text-ink">
                    {g.code}
                  </div>
                  <div className="text-[11px] text-muted">
                    {planLabel(g.tier)} -{" "}
                    {g.interval === "sixmonth" ? "6 months" : "1 month"} ·{" "}
                    {g.redeemed ? (
                      <span className="text-ink">Redeemed</span>
                    ) : (
                      <span>Unclaimed</span>
                    )}
                  </div>
                </div>
                {!g.redeemed && (
                  <button
                    type="button"
                    onClick={() => copy(g.code)}
                    className="btn-ghost text-xs"
                  >
                    {copied === g.code ? "Copied!" : "Copy link"}
                  </button>
                )}
                <input
                  readOnly
                  value={link}
                  onFocus={(e) => e.currentTarget.select()}
                  className="w-full rounded-md border border-hair bg-offwhite px-2 py-1 font-mono text-[11px] text-muted outline-none focus:border-orange"
                />
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

function ReferralCard({
  referral,
}: {
  referral: {
    code: string;
    referredCount: number;
    totalEarnedTokens: number;
  } | null;
}) {
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => {
    if (!referral?.code) return "";
    if (typeof window === "undefined")
      return `/signin?mode=signup&ref=${referral.code}`;
    return `${window.location.origin}/signin?mode=signup&ref=${referral.code}`;
  }, [referral?.code]);

  async function copyLink() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const el = document.getElementById("fp-referral-link") as HTMLInputElement | null;
      el?.select();
    }
  }

  return (
    <Card
      title="Invite a friend"
      hint="When they sign up and verify their email, you both get 5,000 bonus tokens."
    >
      {referral?.code ? (
        <>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="fp-referral-link"
              readOnly
              value={shareUrl}
              onFocus={(e) => e.currentTarget.select()}
              className="flex-1 rounded-md border border-hair bg-paper px-3 py-2 font-mono text-[13px] text-ink outline-none focus:border-orange"
            />
            <button
              type="button"
              onClick={copyLink}
              className="btn-primary whitespace-nowrap text-sm"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-[13px]">
            <div>
              <div className="font-semibold text-ink">
                {referral.referredCount.toLocaleString()}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-muted">
                Friends joined
              </div>
            </div>
            <div>
              <div className="font-semibold text-ink">
                {referral.totalEarnedTokens.toLocaleString()}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-muted">
                Bonus tokens earned
              </div>
            </div>
          </div>
          <p className="mt-4 text-[12px] text-muted">
            Your code: <span className="font-mono text-ink">{referral.code}</span>
          </p>
        </>
      ) : (
        <p className="text-[13px] text-muted">Setting up your code…</p>
      )}
    </Card>
  );
}

// ===========================================================================
// Support tab
// ===========================================================================

function SupportTab({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="space-y-6">
      <Card
        title="Customer support"
        hint="Reach us for billing issues, bug reports, or feature asks — most replies go out within a business day."
      >
        <div className="flex flex-wrap gap-2">
          <a
            href="/contact?topic=support"
            className="btn-primary inline-flex text-sm"
          >
            Contact support →
          </a>
          <a
            href="/contact?topic=report-issue"
            className="btn-ghost inline-flex text-sm"
          >
            Report an issue
          </a>
          <a
            href="/contact?topic=billing"
            className="btn-ghost inline-flex text-sm"
          >
            Billing & refunds
          </a>
        </div>
      </Card>

      <Card title="Sign out" hint="Signs you out of this device only.">
        <button onClick={onSignOut} className="btn-ghost text-sm">
          Sign out
        </button>
      </Card>
    </div>
  );
}

// ===========================================================================
// Shared primitives
// ===========================================================================

function Card({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-hair bg-offwhite p-5">
      <div className="label">{title}</div>
      {hint && <p className="mt-1 text-[13px] text-muted">{hint}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label mb-1 block">{label}</label>
      {children}
      {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
    </div>
  );
}
