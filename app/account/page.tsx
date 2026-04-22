"use client";
import { useEffect, useMemo, useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import SiteNav from "@/app/components/SiteNav";
import ThemePicker from "@/app/components/ThemePicker";
import UserAvatar from "@/app/components/UserAvatar";
import CourseIcon from "@/app/components/CourseIcon";
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
  type PublicProfile,
} from "@/lib/social";
import { COURSES } from "@/lib/topics";
import { getHeatmapDays } from "@/lib/insights";

type Prefs = AiPrefs & {
  selectedCourses: string[];
};

const DEFAULT_PREFS: Prefs = {
  selectedCourses: [],
  ...DEFAULT_AI_PREFS,
};

type CourseProgress = { courseSlug: string; completed: number };
type HistoryEntry = { kind?: string; tokens?: number; createdAt: number };
type SelfProfileView = {
  profile: PublicProfile;
  courses: CourseProgress[];
  history: HistoryEntry[];
};

export default function AccountPage() {
  const { user, loading, configured, plan, signOut, getIdToken } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarEmoji, setAvatarEmoji] = useState<string | null>(null);
  const [avatarColor, setAvatarColor] = useState<string | null>(null);
  const [gradeLevel, setGradeLevel] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [loadingPrefs, setLoadingPrefs] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null
  );
  const [bonusBalance, setBonusBalance] = useState<number | null>(null);
  const [profileView, setProfileView] = useState<SelfProfileView | null>(null);
  const [masteryUnlock, setMasteryUnlock] = useState(false);

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
          setGradeLevel(typeof p.gradeLevel === "string" ? p.gradeLevel : null);
          setInterests(Array.isArray(p.interests) ? p.interests : []);
          if (!displayName && typeof p.displayName === "string") {
            setDisplayName(p.displayName);
          }
        }
      } catch {
        // Profile surface stays usable even if this fetch fails.
      }
    })();
    return () => {
      cancelled = true;
    };
    // displayName intentionally excluded - we only want the initial seed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, getIdToken]);

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
        const data = snap.data() as (Partial<Prefs> & { masteryUnlock?: boolean }) | undefined;
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

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const token = await getIdToken();
        const res = await fetch(`/api/users/${user.uid}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setProfileView({
          profile: data.profile,
          courses: Array.isArray(data.courses) ? data.courses : [],
          history: Array.isArray(data.history) ? data.history : [],
        });
      } catch {
        // Profile preview is best-effort.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, getIdToken]);

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

  async function save() {
    if (!user) return;
    const trimmedUsername = username.trim();
    if (trimmedUsername) {
      const usernameErr = validateUsername(trimmedUsername);
      if (usernameErr) {
        setMsg({ kind: "err", text: usernameErr });
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
          setMsg({
            kind: "err",
            text: data?.error || "Could not save profile.",
          });
          setSaving(false);
          return;
        }
      }
      const db = getDb();
      if (db) {
        const normalizedAiPrefs = normalizeAiPrefs(prefs);
        // `selectedCourses` is owned by the Study page picker now; strip it
        // from the write so a stale-in-state copy can't stomp a concurrent
        // edit made there.
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
      setMsg({ kind: "ok", text: "Saved." });
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
        <SiteNav>
        </SiteNav>
        <PageLoader />
      </main>
    );
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav>
        <a href="/study" className="nav-link">Study</a>
      </SiteNav>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="label mb-3">Account</div>
        <h1 className="font-serif text-[44px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[52px]">
          Your profile.
        </h1>
        <p className="mt-3 text-[15px] text-muted">
          Signed in as <span className="text-ink">{user.email}</span>. Current
          plan: <span className="text-ink">{planLabel(plan)}</span>.
        </p>

        {profileView && (
          <div className="mt-8 space-y-6">
            <ProfilePreview
              profile={profileView.profile}
              bio={bio}
              displayName={displayName}
              username={username}
              avatarEmoji={avatarEmoji}
              avatarColor={avatarColor}
              gradeLevel={gradeLevel}
              interests={interests}
            />
            <CoursesInProgress courses={profileView.courses} />
            <ActivityHeatmap history={profileView.history} />
            <RecentActivityList history={profileView.history} />
          </div>
        )}

        <div className="mt-12">
          <div className="label mb-3">Settings</div>
          <h2 className="font-serif text-2xl text-ink">
            Update your account.
          </h2>
        </div>

        <div className="mt-6 space-y-10">
          {/* Display name */}
          <div>
            <label className="label mb-2 block">Display name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="What should we call you?"
              className="w-full rounded-md border border-hair bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-orange"
              maxLength={60}
            />
            <p className="mt-2 text-xs text-muted">
              Shown on the top of chat replies and your public profile.
            </p>
          </div>

          {/* Username */}
          <div>
            <label className="label mb-2 block">Username</label>
            <div className="flex items-center">
              <span className="rounded-l-md border border-r-0 border-hair bg-offwhite px-3 py-3 text-[15px] text-muted">
                @
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_handle"
                className="w-full rounded-r-md border border-hair bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-orange"
                maxLength={24}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
            <p className="mt-2 text-xs text-muted">
              Shown on your profile URL. Letters, numbers, dot, or underscore,
              3 to 24 characters. Must be unique.
            </p>
          </div>

          {/* Bio */}
          <div>
            <label className="label mb-2 block">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A line or two about what you're studying."
              rows={3}
              maxLength={280}
              className="w-full resize-none rounded-md border border-hair bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-orange"
            />
            <p className="mt-2 text-xs text-muted">
              Shown on your public profile. {bio.length} / 280
            </p>
          </div>

          {/* Avatar */}
          <div className="rounded-xl border border-hair bg-offwhite p-5">
            <div className="label mb-2">Profile picture</div>
            <p className="mb-4 text-[14px] text-body">
              Pick an emoji and accent color shown next to your name on
              profiles, the feed, and comments.
            </p>
            <div className="flex items-center gap-4">
              <UserAvatar
                seed={user.uid}
                label={displayName || username || user.email || "You"}
                emoji={avatarEmoji}
                color={avatarColor}
                size="lg"
              />
              <div className="flex flex-wrap gap-2">
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
            </div>
            <div className="mt-4 grid grid-cols-10 gap-1">
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
          </div>

          {/* Grade level + interests */}
          <div className="rounded-xl border border-hair bg-offwhite p-5">
            <div className="label mb-2">Grade level</div>
            <p className="mb-3 text-[14px] text-body">
              Helps the AI pitch examples at the right depth, and lets us
              recommend people studying the same material.
            </p>
            <div className="flex flex-wrap gap-2">
              {GRADE_OPTIONS.map((g) => {
                const active = gradeLevel === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGradeLevel(active ? null : g)}
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
          </div>

          <div className="rounded-xl border border-hair bg-offwhite p-5">
            <div className="label mb-2">Interests</div>
            <p className="mb-3 text-[14px] text-body">
              Pick up to {MAX_INTERESTS}. The AI tutor will lean on these when
              choosing analogies, and they're used to recommend classmates to
              follow.
            </p>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((i) => {
                const active = interests.includes(i);
                const atLimit = interests.length >= MAX_INTERESTS && !active;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={atLimit}
                    onClick={() => {
                      if (active) {
                        setInterests((prev) => prev.filter((x) => x !== i));
                      } else {
                        setInterests((prev) =>
                          prev.length >= MAX_INTERESTS ? prev : [...prev, i]
                        );
                      }
                    }}
                    className={`rounded-full border px-3 py-1 text-[13px] transition disabled:opacity-40 ${
                      active
                        ? "border-orange bg-orange-tint text-orange-ink"
                        : "border-hair bg-paper text-muted hover:border-orange/60 hover:text-ink"
                    }`}
                  >
                    {active ? "✓ " : ""}{i}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted">
              {interests.length} / {MAX_INTERESTS} selected
            </p>
          </div>

          <div className="rounded-xl border border-hair bg-offwhite p-5">
            <div className="label mb-2">Practice mastery unlock</div>
            <p className="mb-3 text-[14px] text-body">
              When on, medium problems stay locked until you get every easy
              one correct, and hard stays locked until you get every medium
              correct. Helps enforce progression for exam prep.
            </p>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={masteryUnlock}
                onChange={(e) => setMasteryUnlock(e.target.checked)}
                className="h-4 w-4 rounded border-hair accent-orange"
              />
              <span className="text-[14px] text-ink">
                Enable mastery unlock for practice problems
              </span>
            </label>
          </div>

          <div className="rounded-xl border border-hair bg-offwhite p-5">
            <div className="label mb-2">Appearance</div>
            <p className="mb-3 text-[14px] text-body">
              Pick a theme for the whole app. Syncs across devices when you're
              signed in.
            </p>
            <ThemePicker />
          </div>

          <div className="rounded-xl border border-hair bg-offwhite p-5">
            <div className="label mb-2">Bonus tokens</div>
            <p className="text-[15px] text-body">
              You have <span className="font-semibold text-ink">{bonusBalance === null ? "…" : bonusBalance.toLocaleString()}</span> bonus tokens available. These are earned by completing scheduled study sessions.
            </p>
            <a
              href="/shop"
              className="btn-ghost mt-4 inline-flex text-sm"
            >
              Top up tokens →
            </a>
          </div>

          <div className="rounded-xl border border-hair bg-offwhite p-5">
            <div className="label mb-2">AI tutor behavior</div>
            <p className="text-[15px] text-body">
              Response length, mode, personality, and custom instructions live
              inside the chat now. Open chat and click the gear icon next to
              your email in the sidebar footer to tweak them.
            </p>
            <a
              href="/chat"
              className="btn-ghost mt-4 inline-flex text-sm"
            >
              Open chat settings →
            </a>
          </div>

          <div className="rounded-xl border border-hair bg-offwhite p-5">
            <div className="label mb-2">Customer support</div>
            <p className="text-[15px] text-body">
              Need help with your account, billing, a bug, or a feature request?
              Send a message through the contact form and we'll route it to the
              right person. Most replies go out within a business day.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
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
          </div>

          {/* Plan status */}
          <div className="rounded-xl border border-hair bg-offwhite p-5">
            <div className="label mb-2">AI tutor model</div>
            <p className="text-[15px] text-body">
              {plan === "hacker"
                ? "You're on Hacker: the strongest reasoning model is active, plus Thinking mode for the hardest problems."
                : plan === "pro"
                ? "You're on Pro: you get the smart model by default, plus a Thinking mode toggle in chat for harder problems."
                : "You're on Learner: the standard model is active. Upgrade to Pro or Hacker for a smarter model and Thinking mode."}
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
                plan.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfilePreview({
  profile,
  bio,
  displayName,
  username,
  avatarEmoji,
  avatarColor,
  gradeLevel,
  interests,
}: {
  profile: PublicProfile;
  bio: string;
  displayName: string;
  username: string;
  avatarEmoji: string | null;
  avatarColor: string | null;
  gradeLevel: string | null;
  interests: string[];
}) {
  const name = displayName || profile.displayName || username || profile.username;
  return (
    <div className="rounded-xl border border-hair bg-offwhite p-5">
      <div className="flex items-start gap-4">
        <UserAvatar
          seed={profile.uid}
          label={name}
          emoji={avatarEmoji}
          color={avatarColor}
          size="lg"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-xl text-ink">{name}</h3>
            <PlanChip plan={profile.plan} />
            {gradeLevel && (
              <span className="rounded-full border border-hair bg-paper px-2 py-0.5 text-[11px] font-medium text-muted">
                {gradeLevel}
              </span>
            )}
          </div>
          {username && (
            <div className="mt-0.5 text-[13px] text-muted">@{username}</div>
          )}
          {bio && (
            <p className="mt-3 whitespace-pre-wrap text-[14px] text-body">
              {bio}
            </p>
          )}
          {interests.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {interests.map((i) => (
                <span
                  key={i}
                  className="rounded-full border border-hair bg-paper px-2.5 py-0.5 text-[11px] text-muted"
                >
                  {i}
                </span>
              ))}
            </div>
          )}
          <div className="mt-4 flex gap-6 text-[13px]">
            <PreviewStat label="Followers" value={profile.stats?.followersCount || 0} />
            <PreviewStat label="Following" value={profile.stats?.followingCount || 0} />
            <PreviewStat label="Longest streak" value={profile.stats?.longestStreak || 0} />
          </div>
        </div>
      </div>
      <div className="mt-4 text-right">
        <a
          href={`/users/${profile.uid}`}
          className="text-[12px] text-muted underline hover:text-ink"
        >
          View public profile →
        </a>
      </div>
    </div>
  );
}

function PreviewStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-semibold text-ink">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-muted">
        {label}
      </div>
    </div>
  );
}

function PlanChip({ plan }: { plan?: PublicProfile["plan"] }) {
  if (!plan || plan === "learner") return null;
  const label = plan === "hacker" ? "Hacker" : "Pro";
  const cls =
    plan === "hacker"
      ? "border-amber-400 bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 text-amber-950 shadow-[0_1px_2px_rgba(180,120,0,0.25)]"
      : "border-orange/40 bg-orange-tint text-orange-ink";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${cls}`}
    >
      {plan === "hacker" && <span aria-hidden>★</span>}
      {label}
    </span>
  );
}

function CoursesInProgress({ courses }: { courses: CourseProgress[] }) {
  if (courses.length === 0) return null;
  return (
    <div className="rounded-xl border border-hair bg-offwhite p-5">
      <div className="label mb-3">Courses in progress</div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {courses.map((c) => {
          const meta = COURSES.find((x) => x.slug === c.courseSlug);
          const total = meta
            ? meta.units.reduce((s, u) => s + (u.topics?.length || 0), 0)
            : 0;
          const pct =
            total > 0 ? Math.min(100, Math.round((c.completed / total) * 100)) : 0;
          return (
            <li
              key={c.courseSlug}
              className="rounded-lg border border-hair bg-paper px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <CourseIcon slug={c.courseSlug} category={meta?.category} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <a
                      href={`/study?course=${c.courseSlug}`}
                      className="truncate text-[14px] text-ink hover:underline"
                    >
                      {meta?.title || c.courseSlug}
                    </a>
                    <span className="text-[12px] text-muted">
                      {c.completed}
                      {total > 0 ? ` / ${total}` : ""}
                    </span>
                  </div>
                  {total > 0 && (
                    <div className="mt-2 h-1.5 w-full rounded-full bg-hair">
                      <div
                        className="h-full rounded-full bg-orange"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ActivityHeatmap({ history }: { history: HistoryEntry[] }) {
  const activityMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const h of history) {
      const d = new Date(h.createdAt);
      const key = ymdKey(d);
      map.set(key, (map.get(key) || 0) + 1);
    }
    return map;
  }, [history]);

  const days = getHeatmapDays(90);
  const firstDate = new Date(days[0]);
  const leadingBlanks = firstDate.getDay();
  const max = Math.max(1, ...Array.from(activityMap.values()));

  function intensity(count: number) {
    if (count === 0) return 0;
    const ratio = count / max;
    if (ratio >= 0.75) return 4;
    if (ratio >= 0.5) return 3;
    if (ratio >= 0.25) return 2;
    return 1;
  }

  const colors = [
    "rgb(var(--hair))",
    "rgb(var(--orange) / 0.3)",
    "rgb(var(--orange) / 0.55)",
    "rgb(var(--orange) / 0.8)",
    "rgb(var(--orange))",
  ];

  const activeDays = Array.from(activityMap.values()).filter((v) => v > 0).length;

  return (
    <div className="rounded-xl border border-hair bg-offwhite p-5">
      <div className="flex items-baseline justify-between">
        <div className="label">Activity · last 90 days</div>
        <div className="text-[11px] text-muted">
          {activeDays} active day{activeDays === 1 ? "" : "s"}
        </div>
      </div>
      <div
        className="mt-4 grid gap-[3px]"
        style={{
          gridTemplateRows: "repeat(7, 12px)",
          gridAutoFlow: "column",
          gridAutoColumns: "12px",
        }}
      >
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map((key) => {
          const count = activityMap.get(key) || 0;
          const level = intensity(count);
          return (
            <div
              key={key}
              title={`${key} · ${count} action${count === 1 ? "" : "s"}`}
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                backgroundColor: colors[level],
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function RecentActivityList({ history }: { history: HistoryEntry[] }) {
  const recent = history.slice(0, 10);
  if (recent.length === 0) return null;
  return (
    <div className="rounded-xl border border-hair bg-offwhite p-5">
      <div className="label mb-3">Recent activity</div>
      <ul className="divide-y divide-hair">
        {recent.map((h, i) => (
          <li
            key={i}
            className="flex items-center justify-between py-2 text-[13px]"
          >
            <span className="text-ink">{labelForKind(h.kind)}</span>
            <span className="text-muted">{relativeDate(h.createdAt)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function labelForKind(kind: string | undefined): string {
  switch (kind) {
    case "chat":
      return "Chatted with the tutor";
    case "explain":
      return "Used Explain";
    case "practice":
      return "Practiced problems";
    case "exam":
      return "Took a mock exam";
    case "interactive":
      return "Used an interactive";
    default:
      return "Studied";
  }
}

function ymdKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function relativeDate(ms: number): string {
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)}d ago`;
  return new Date(ms).toLocaleDateString();
}
