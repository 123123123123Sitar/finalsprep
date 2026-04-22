"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import UserAvatar from "@/app/components/UserAvatar";
import FollowButton from "@/app/components/FollowButton";
import PageLoader from "@/app/components/PageLoader";
import { useAuth } from "@/app/components/AuthProvider";
import {
  AVATAR_COLOR_OPTIONS,
  AVATAR_EMOJI_OPTIONS,
  type PublicProfile,
} from "@/lib/social";
import { COURSES } from "@/lib/topics";
import CourseIcon from "@/app/components/CourseIcon";
import { getHeatmapDays } from "@/lib/insights";

type HistoryEntry = {
  kind?: string;
  tokens?: number;
  createdAt: number;
};

type CourseProgress = {
  courseSlug: string;
  completed: number;
};

type ProfileResponse = {
  profile: PublicProfile;
  isFollowing: boolean;
  isRequested: boolean;
  isSelf: boolean;
  canSeeActivity: boolean;
  courses: CourseProgress[];
  history: HistoryEntry[];
};

export default function UserProfilePage({
  params,
}: {
  params: { uid: string };
}) {
  const { user, loading: authLoading, getIdToken } = useAuth();
  const [data, setData] = useState<ProfileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editEmoji, setEditEmoji] = useState<string | null>(null);
  const [editColor, setEditColor] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/users/${params.uid}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Couldn't load profile");
      setData(json);
    } catch (e: any) {
      setError(e?.message || "Couldn't load profile");
    }
  }, [params.uid, getIdToken]);

  useEffect(() => {
    if (authLoading) return;
    load();
  }, [authLoading, load]);

  useEffect(() => {
    if (data?.isSelf && typeof window !== "undefined") {
      window.location.replace("/account");
    }
  }, [data?.isSelf]);

  function openEdit() {
    if (!data) return;
    setEditDisplayName(data.profile.displayName);
    setEditUsername(data.profile.username);
    setEditBio(data.profile.bio);
    setEditEmoji(data.profile.avatarEmoji ?? null);
    setEditColor(data.profile.avatarColor ?? null);
    setEditing(true);
  }

  async function save() {
    setSaving(true);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/me/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          displayName: editDisplayName,
          username: editUsername,
          bio: editBio,
          avatarEmoji: editEmoji,
          avatarColor: editColor,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Save failed");
      } else {
        setEditing(false);
        load();
      }
    } finally {
      setSaving(false);
    }
  }

  async function startDm() {
    if (!user) {
      window.location.href = `/signin?next=/users/${params.uid}`;
      return;
    }
    const token = await getIdToken();
    if (!token) return;
    const res = await fetch("/api/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ otherUid: params.uid }),
    });
    const json = await res.json();
    if (res.ok && json.conversationId) {
      window.location.href = `/messages?c=${json.conversationId}`;
    }
  }

  if (!data && !error) {
    return (
      <main className="min-h-screen bg-paper">
        <SiteNav sticky />
        <PageLoader />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-paper">
        <SiteNav sticky />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h1 className="font-serif text-3xl text-ink">Profile not found</h1>
          <p className="mt-2 text-sm text-muted">
            {error || "This user doesn't exist."}
          </p>
          <a href="/social" className="btn-primary mt-6 inline-block">
            Back to feed
          </a>
        </div>
      </main>
    );
  }

  const p = data.profile;

  return (
    <main className="min-h-screen bg-paper">
      <SiteNav sticky />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-start gap-5">
          <UserAvatar
            seed={p.uid}
            label={p.displayName || p.username}
            emoji={p.avatarEmoji}
            color={p.avatarColor}
            size="lg"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-3xl text-ink">
                {p.displayName || p.username}
              </h1>
              {!data.isSelf && (
                <FollowButton
                  targetUid={p.uid}
                  initialFollowing={data.isFollowing}
                  initialRequested={data.isRequested}
                  onChange={() => load()}
                />
              )}
              {!data.isSelf && (
                <button
                  onClick={startDm}
                  className="rounded-md border border-hair px-3 py-1.5 text-[13px] text-ink hover:bg-offwhite"
                >
                  Message
                </button>
              )}
              {data.isSelf && (
                <button
                  onClick={openEdit}
                  className="rounded-md border border-hair px-3 py-1.5 text-[13px] text-ink hover:bg-offwhite"
                >
                  Edit profile
                </button>
              )}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-[14px] text-muted">
              <span>@{p.username}</span>
              <PlanChip plan={p.plan} />
              {p.gradeLevel && (
                <span className="rounded-full border border-hair bg-offwhite px-2 py-0.5 text-[11px] font-medium text-muted">
                  {p.gradeLevel}
                </span>
              )}
            </div>
            {p.bio && (
              <p className="mt-3 max-w-prose whitespace-pre-wrap text-[14.5px] text-body">
                {p.bio}
              </p>
            )}
            {p.interests && p.interests.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.interests.map((i) => (
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
              <Stat label="Followers" value={p.stats.followersCount} />
              <Stat label="Following" value={p.stats.followingCount} />
              <Stat label="Longest streak" value={p.stats.longestStreak} />
            </div>
          </div>
        </div>

        <CoursesSection courses={data.courses} />

        <ActivitySection
          canSee={data.canSeeActivity}
          isSelf={data.isSelf}
          isRequested={data.isRequested}
          history={data.history}
          displayName={p.displayName || p.username}
        />

        {editing && data.isSelf && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-xl border border-hair bg-paper p-5 shadow-xl">
              <h3 className="font-serif text-xl text-ink">Edit profile</h3>
              <div className="mt-4 space-y-4">
                <Field label="Profile picture">
                  <div className="flex items-center gap-4">
                    <UserAvatar
                      seed={p.uid}
                      label={editDisplayName || p.displayName || p.username}
                      emoji={editEmoji}
                      color={editColor}
                      size="lg"
                    />
                    <div className="flex flex-wrap gap-2">
                      {AVATAR_COLOR_OPTIONS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setEditColor(c)}
                          aria-label={`Color ${c}`}
                          className={`h-6 w-6 rounded-full border-2 transition ${
                            editColor === c
                              ? "border-ink scale-110"
                              : "border-transparent hover:scale-105"
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-10 gap-1">
                    <button
                      type="button"
                      onClick={() => setEditEmoji(null)}
                      className={`grid h-8 w-8 place-items-center rounded-md border text-[11px] ${
                        editEmoji === null
                          ? "border-orange bg-orange-tint text-orange-ink"
                          : "border-hair text-muted hover:bg-offwhite"
                      }`}
                      title="Use initial"
                    >
                      A
                    </button>
                    {AVATAR_EMOJI_OPTIONS.map((e) => (
                      <button
                        key={e}
                        type="button"
                        onClick={() => setEditEmoji(e)}
                        className={`grid h-8 w-8 place-items-center rounded-md border text-[16px] ${
                          editEmoji === e
                            ? "border-orange bg-orange-tint"
                            : "border-hair hover:bg-offwhite"
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Display name">
                  <input
                    value={editDisplayName}
                    onChange={(e) => setEditDisplayName(e.target.value)}
                    maxLength={40}
                    className="w-full rounded-md border border-hair bg-offwhite/40 px-3 py-2 text-sm text-ink focus:border-orange focus:bg-paper focus:outline-none"
                  />
                </Field>
                <Field label="Username (letters, digits, . _)">
                  <input
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    maxLength={24}
                    className="w-full rounded-md border border-hair bg-offwhite/40 px-3 py-2 text-sm text-ink focus:border-orange focus:bg-paper focus:outline-none"
                  />
                </Field>
                <Field label="Bio">
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    rows={3}
                    maxLength={280}
                    className="w-full resize-none rounded-md border border-hair bg-offwhite/40 px-3 py-2 text-sm text-ink focus:border-orange focus:bg-paper focus:outline-none"
                  />
                </Field>
              </div>
              {error && (
                <div className="mt-3 text-[13px] text-red-600">{error}</div>
              )}
              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => setEditing(false)}
                  className="rounded-md px-3 py-1.5 text-[13px] text-muted hover:bg-offwhite hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  disabled={saving}
                  className="btn-primary disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function CoursesSection({ courses }: { courses: CourseProgress[] }) {
  if (courses.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="label mb-3">Courses in progress</h2>
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
    </section>
  );
}

function ActivitySection({
  canSee,
  isSelf,
  isRequested,
  history,
  displayName,
}: {
  canSee: boolean;
  isSelf: boolean;
  isRequested: boolean;
  history: HistoryEntry[];
  displayName: string;
}) {
  if (!canSee) {
    return (
      <section className="mt-10 rounded-xl border border-dashed border-hair bg-offwhite/50 p-6 text-center">
        <div className="label mb-2">Activity</div>
        <div className="text-[24px]" aria-hidden="true">
          🔒
        </div>
        <p className="mt-2 text-[13.5px] text-muted">
          {isRequested
            ? `Waiting on ${displayName} to approve your follow request. Their heatmap and recent activity unlock once they accept.`
            : `Follow ${displayName} to see their study heatmap and recent activity.`}
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10 space-y-6">
      <Heatmap history={history} />
      <RecentActivity history={history} isSelf={isSelf} />
    </section>
  );
}

function Heatmap({ history }: { history: HistoryEntry[] }) {
  const activityMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const h of history) {
      const d = new Date(h.createdAt);
      const key = ymd(d);
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
    <div className="rounded-lg border border-hair bg-paper p-5">
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

function RecentActivity({
  history,
  isSelf,
}: {
  history: HistoryEntry[];
  isSelf: boolean;
}) {
  const recent = history.slice(0, 20);
  if (recent.length === 0) {
    return (
      <div className="rounded-lg border border-hair bg-paper p-5">
        <div className="label mb-2">Recent activity</div>
        <p className="text-[13px] text-muted">
          {isSelf
            ? "Nothing here yet. Chat with the tutor or finish a lesson to get started."
            : "No recent activity to show."}
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-hair bg-paper p-5">
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

function ymd(d: Date): string {
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

function PlanChip({ plan }: { plan?: PublicProfile["plan"] }) {
  if (!plan || plan === "learner") return null;
  const label = plan === "hacker" ? "Hacker" : "Pro";
  const cls =
    plan === "hacker"
      ? "border-violet-300 bg-violet-50 text-violet-800"
      : "border-orange/40 bg-orange-tint text-orange-ink";
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}
    >
      {label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-semibold text-ink">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-muted">
        {label}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="label mb-1">{label}</div>
      {children}
    </label>
  );
}
