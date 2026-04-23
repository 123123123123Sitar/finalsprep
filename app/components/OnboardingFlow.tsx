"use client";
import { useEffect, useMemo, useState } from "react";
import { updateProfile } from "firebase/auth";
import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthProvider";
import CourseIcon from "./CourseIcon";
import UserAvatar from "./UserAvatar";
import { getDb, getFirebaseAuth } from "@/lib/firebase";
import { COURSES } from "@/lib/topics";
import { getCourseLimit, planLabel, type PlanTier } from "@/lib/plans";
import { saveSelectedCourses } from "@/lib/selectedCourses";
import {
  AI_MODE_OPTIONS,
  AI_PERSONALITY_OPTIONS,
  AI_VERBOSITY_OPTIONS,
  DEFAULT_AI_PREFS,
  type AiMode,
  type AiPersonality,
  type AiVerbosity,
} from "@/lib/aiPrefs";
import {
  AVATAR_COLOR_OPTIONS,
  AVATAR_EMOJI_OPTIONS,
  GRADE_OPTIONS,
  INTEREST_OPTIONS,
  MAX_INTERESTS,
} from "@/lib/social";

const ONBOARDING_VERSION = 1;
const TERMS_VERSION = "2026-04";

type PaidChoice = "pro" | "hacker" | "skip";

const PLAN_OFFERS: Array<{
  key: "pro" | "hacker";
  title: string;
  price: string;
  blurb: string;
  perks: string[];
  highlight?: boolean;
}> = [
  {
    key: "pro",
    title: "Pro",
    price: "$16/mo",
    blurb: "The sweet spot for finals season.",
    perks: [
      "Up to 10 AP courses at once",
      "Full unit lessons + practice banks",
      "Priority chat tutor responses",
    ],
    highlight: true,
  },
  {
    key: "hacker",
    title: "Hacker (Premium)",
    price: "$29/mo",
    blurb: "Every course, every tool, no caps.",
    perks: [
      "Unlimited AP courses (all 16)",
      "Higher token caps for the AI tutor",
      "Early access to new features",
    ],
  },
];

type OnboardingDoc = {
  completed?: boolean;
  version?: number;
};

/**
 * First-run onboarding modal. Renders once per account, gated on a
 * `users/{uid}/profile/onboarding.completed` flag. Walks the user
 * through name → plan pitch → AP courses → chat personalization → terms
 * → warm welcome, persisting each step as it happens so a refresh in
 * the middle just resumes from step 1 with the data already saved.
 *
 * Mounted from the root layout so it overlays every page once a verified
 * user signs in for the first time.
 */
export default function OnboardingFlow() {
  const { user, loading, configured } = useAuth();
  const [onboardingState, setOnboardingState] = useState<
    "loading" | "needed" | "done"
  >("loading");

  useEffect(() => {
    if (loading) {
      setOnboardingState("loading");
      return;
    }
    if (!configured || !user || !user.emailVerified) {
      setOnboardingState("done");
      return;
    }
    const db = getDb();
    if (!db) {
      setOnboardingState("done");
      return;
    }
    const ref = doc(db, "users", user.uid, "profile", "onboarding");
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data = snap.data() as OnboardingDoc | undefined;
        setOnboardingState(data?.completed ? "done" : "needed");
      },
      () => {
        // Fail open — never block the app on a Firestore read error here.
        setOnboardingState("done");
      }
    );
    return () => unsub();
  }, [user, loading, configured]);

  if (onboardingState !== "needed" || !user) return null;
  return <OnboardingDialog uid={user.uid} email={user.email} />;
}

function OnboardingDialog({
  uid,
  email,
}: {
  uid: string;
  email: string | null;
}) {
  const initialName = useMemo(() => {
    const auth = getFirebaseAuth();
    const dn = auth?.currentUser?.displayName?.trim();
    if (dn) return dn;
    if (email) return email.split("@")[0] || "";
    return "";
  }, [email]);

  const [step, setStep] = useState(0);
  const [savingStep, setSavingStep] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  const [name, setName] = useState(initialName);
  const [gradeLevel, setGradeLevel] = useState<string>("");
  // Seed avatar defaults deterministically from the uid so the picker
  // shows a sensible starting choice (matching what ensurePublicProfile
  // would auto-pick on the server).
  const seedHash = useMemo(() => hashString(uid), [uid]);
  const [avatarEmoji, setAvatarEmoji] = useState<string>(
    AVATAR_EMOJI_OPTIONS[seedHash % AVATAR_EMOJI_OPTIONS.length]
  );
  const [avatarColor, setAvatarColor] = useState<string>(
    AVATAR_COLOR_OPTIONS[seedHash % AVATAR_COLOR_OPTIONS.length]
  );
  const [interests, setInterests] = useState<string[]>([]);
  // null until the user makes an explicit choice; lets us tell "skipped on
  // purpose" apart from "hasn't decided yet" so the Continue button can nudge.
  const [planChoice, setPlanChoice] = useState<PaidChoice | null>(null);
  const [referralSource, setReferralSource] = useState<string>("");
  // Course selection limit tracks the plan the user is *intending* to have
  // after onboarding. Keeps the picker honest: if they picked Hacker we let
  // them grab all 16 right away, even though Firestore still says learner.
  const courseLimit = getCourseLimit(planChoiceToTier(planChoice));
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [verbosity, setVerbosity] = useState<AiVerbosity>(
    DEFAULT_AI_PREFS.aiVerbosity
  );
  const [mode, setMode] = useState<AiMode>(DEFAULT_AI_PREFS.aiMode);
  const [personality, setPersonality] = useState<AiPersonality>(
    DEFAULT_AI_PREFS.aiPersonality
  );
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const totalSteps = 7;

  function toggleInterest(interest: string) {
    setInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((i) => i !== interest);
      }
      if (prev.length >= MAX_INTERESTS) return prev;
      return [...prev, interest];
    });
  }

  async function persistName() {
    const trimmed = name.trim();
    if (trimmed.length < 1) {
      setStepError("Tell us what to call you.");
      return false;
    }
    if (trimmed.length > 40) {
      setStepError("Name must be 40 characters or fewer.");
      return false;
    }
    setSavingStep(true);
    setStepError(null);
    try {
      const auth = getFirebaseAuth();
      if (auth?.currentUser) {
        await updateProfile(auth.currentUser, { displayName: trimmed });
      }
      const db = getDb();
      if (db) {
        await setDoc(
          doc(db, "users", uid, "profile", "onboarding"),
          {
            name: trimmed,
            gradeLevel: gradeLevel || null,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
      // Best-effort: sync to public profile so leaderboards/social pick it up.
      try {
        const token = await auth?.currentUser?.getIdToken();
        if (token) {
          await fetch("/api/me/profile", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              displayName: trimmed,
              gradeLevel: gradeLevel || null,
            }),
          });
        }
      } catch {
        /* non-fatal */
      }
      return true;
    } catch (e: any) {
      setStepError(e?.message || "Couldn't save your name.");
      return false;
    } finally {
      setSavingStep(false);
    }
  }

  async function persistProfile() {
    setSavingStep(true);
    setStepError(null);
    try {
      const auth = getFirebaseAuth();
      const token = await auth?.currentUser?.getIdToken();
      if (token) {
        const res = await fetch("/api/me/profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            avatarEmoji,
            avatarColor,
            interests,
          }),
        });
        if (!res.ok) {
          const detail = await res.json().catch(() => ({}));
          setStepError(detail?.error || "Couldn't save your profile.");
          return false;
        }
      }
      const db = getDb();
      if (db) {
        await setDoc(
          doc(db, "users", uid, "profile", "onboarding"),
          {
            avatarEmoji,
            avatarColor,
            interests,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
      return true;
    } catch (e: any) {
      setStepError(e?.message || "Couldn't save your profile.");
      return false;
    } finally {
      setSavingStep(false);
    }
  }

  async function choosePlanAndAdvance(choice: PaidChoice) {
    setPlanChoice(choice);
    setStepError(null);
    // Advance right away so the user sees clear feedback. The Firestore
    // write runs in the background.
    setStep((s) => (s === 2 ? 3 : s));
    const db = getDb();
    if (!db) return;
    try {
      await setDoc(
        doc(db, "users", uid, "profile", "onboarding"),
        { planChoice: choice, updatedAt: serverTimestamp() },
        { merge: true }
      );
    } catch {
      /* non-fatal — choice still drives the rest of the flow locally */
    }
  }

  async function toggleCourse(slug: string) {
    const has = selectedCourses.includes(slug);
    let next: string[];
    if (has) {
      next = selectedCourses.filter((s) => s !== slug);
    } else {
      if (selectedCourses.length >= courseLimit) return;
      next = [...selectedCourses, slug];
    }
    setSelectedCourses(next);
    const db = getDb();
    if (!db) return;
    try {
      await saveSelectedCourses(db, uid, next, courseLimit);
    } catch {
      // Roll back optimistic update.
      setSelectedCourses(selectedCourses);
      setStepError("Couldn't save your courses. Check your connection.");
    }
  }

  async function persistPersonalization() {
    setSavingStep(true);
    setStepError(null);
    try {
      const db = getDb();
      if (db) {
        await setDoc(
          doc(db, "users", uid, "profile", "prefs"),
          {
            aiVerbosity: verbosity,
            aiMode: mode,
            aiPersonality: personality,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
      return true;
    } catch (e: any) {
      setStepError(e?.message || "Couldn't save your preferences.");
      return false;
    } finally {
      setSavingStep(false);
    }
  }

  async function persistTermsAndComplete() {
    if (!acceptedTerms) {
      setStepError("You'll need to accept the Terms and Privacy Policy.");
      return false;
    }
    setSavingStep(true);
    setStepError(null);
    try {
      const db = getDb();
      if (db) {
        await setDoc(
          doc(db, "users", uid, "profile", "onboarding"),
          {
            termsAccepted: true,
            termsVersion: TERMS_VERSION,
            termsAcceptedAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
      return true;
    } catch (e: any) {
      setStepError(e?.message || "Couldn't record your acceptance.");
      return false;
    } finally {
      setSavingStep(false);
    }
  }

  async function finishOnboarding() {
    setSavingStep(true);
    setStepError(null);
    try {
      const db = getDb();
      if (db) {
        await setDoc(
          doc(db, "users", uid, "profile", "onboarding"),
          {
            completed: true,
            completedAt: serverTimestamp(),
            version: ONBOARDING_VERSION,
            referralSource: referralSource || null,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
      // If they picked a paid plan, send them straight to checkout.
      if (planChoice === "pro" || planChoice === "hacker") {
        window.location.href = `/checkout?plan=${encodeURIComponent(
          `${planChoice}-monthly`
        )}`;
        return;
      }
    } catch (e: any) {
      setStepError(e?.message || "Couldn't finish onboarding.");
    } finally {
      setSavingStep(false);
    }
  }

  async function goNext() {
    setStepError(null);
    if (step === 0) {
      const ok = await persistName();
      if (!ok) return;
      setStep(1);
      return;
    }
    if (step === 1) {
      const ok = await persistProfile();
      if (!ok) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      // Plan-pick buttons normally advance on click. If the user got here
      // by hitting the footer Continue without picking, nudge them.
      if (!planChoice) {
        setStepError("Pick a plan to keep going (Stay on Learner is fine).");
        return;
      }
      setStep(3);
      return;
    }
    if (step === 3) {
      if (selectedCourses.length === 0) {
        setStepError("Pick at least one AP course to get started.");
        return;
      }
      setStep(4);
      return;
    }
    if (step === 4) {
      const ok = await persistPersonalization();
      if (!ok) return;
      setStep(5);
      return;
    }
    if (step === 5) {
      const ok = await persistTermsAndComplete();
      if (!ok) return;
      setStep(6);
      return;
    }
    if (step === 6) {
      await finishOnboarding();
      return;
    }
  }

  function goBack() {
    setStepError(null);
    setStep((s) => Math.max(0, s - 1));
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to FinalsPrep"
      className="animate-fadeIn fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
    >
      <div className="animate-scaleIn relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-hair bg-paper shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)]">
        <ProgressHeader step={step} total={totalSteps} />

        <div className="flex-1 overflow-y-auto px-7 py-6 sm:px-10">
          {step === 0 && (
            <NameStep
              name={name}
              setName={setName}
              gradeLevel={gradeLevel}
              setGradeLevel={setGradeLevel}
            />
          )}
          {step === 1 && (
            <ProfileStep
              name={name}
              avatarEmoji={avatarEmoji}
              setAvatarEmoji={setAvatarEmoji}
              avatarColor={avatarColor}
              setAvatarColor={setAvatarColor}
              interests={interests}
              toggleInterest={toggleInterest}
              uid={uid}
            />
          )}
          {step === 2 && (
            <PlanStep
              choice={planChoice}
              onChoose={(c) => {
                void choosePlanAndAdvance(c);
              }}
            />
          )}
          {step === 3 && (
            <CoursesStep
              selected={selectedCourses}
              onToggle={toggleCourse}
              limit={courseLimit}
              planChoice={planChoice}
            />
          )}
          {step === 4 && (
            <PersonalizationStep
              verbosity={verbosity}
              setVerbosity={setVerbosity}
              mode={mode}
              setMode={setMode}
              personality={personality}
              setPersonality={setPersonality}
            />
          )}
          {step === 5 && (
            <TermsStep
              accepted={acceptedTerms}
              setAccepted={setAcceptedTerms}
            />
          )}
          {step === 6 && (
            <WelcomeStep
              name={name.trim() || "there"}
              planChoice={planChoice}
              courseCount={selectedCourses.length}
              referralSource={referralSource}
              setReferralSource={setReferralSource}
            />
          )}

          {stepError && (
            <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {stepError}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-hair bg-offwhite px-7 py-4 sm:px-10">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0 || savingStep}
            className="text-sm text-muted hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={savingStep}
            className="btn-primary disabled:opacity-50"
          >
            {savingStep
              ? "Saving…"
              : step === 6
              ? planChoice === "pro" || planChoice === "hacker"
                ? `Continue to ${planLabel(planChoiceToTier(planChoice))} checkout`
                : "Jump in"
              : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

function planChoiceToTier(c: PaidChoice | null): PlanTier {
  if (c === "pro") return "pro";
  if (c === "hacker") return "hacker";
  return "learner";
}

function ProgressHeader({ step, total }: { step: number; total: number }) {
  const pct = Math.round(((step + 1) / total) * 100);
  return (
    <div className="border-b border-hair px-7 pb-4 pt-6 sm:px-10">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-muted">
        <span>Welcome to FinalsPrep</span>
        <span>
          Step {step + 1} of {total}
        </span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-hair">
        <div
          className="h-full rounded-full bg-orange transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function NameStep({
  name,
  setName,
  gradeLevel,
  setGradeLevel,
}: {
  name: string;
  setName: (v: string) => void;
  gradeLevel: string;
  setGradeLevel: (v: string) => void;
}) {
  return (
    <div>
      <div className="label mb-2">Hi there 👋</div>
      <h2 className="font-serif text-3xl font-normal text-ink">
        First, what should we call you?
      </h2>
      <p className="mt-3 text-sm text-muted">
        We'll use this on your dashboard, in the chat tutor, and on
        leaderboards. You can change it anytime in your account settings.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="onboarding-name"
            className="label mb-2 block"
          >
            Your name
          </label>
          <input
            id="onboarding-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex"
            maxLength={40}
            className="focus-ring h-12 w-full rounded-md border border-hair bg-paper px-4 text-ink placeholder-dim"
          />
        </div>
        <div>
          <label
            htmlFor="onboarding-grade"
            className="label mb-2 block"
          >
            What grade are you in? <span className="text-dim">(optional)</span>
          </label>
          <select
            id="onboarding-grade"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            className="focus-ring h-12 w-full rounded-md border border-hair bg-paper px-3 text-ink"
          >
            <option value="">Prefer not to say</option>
            {GRADE_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function ProfileStep({
  name,
  avatarEmoji,
  setAvatarEmoji,
  avatarColor,
  setAvatarColor,
  interests,
  toggleInterest,
  uid,
}: {
  name: string;
  avatarEmoji: string;
  setAvatarEmoji: (v: string) => void;
  avatarColor: string;
  setAvatarColor: (v: string) => void;
  interests: string[];
  toggleInterest: (v: string) => void;
  uid: string;
}) {
  const previewLabel = name.trim() || "you";
  return (
    <div>
      <div className="label mb-2">Your profile</div>
      <h2 className="font-serif text-3xl font-normal text-ink">
        Make it look like you.
      </h2>
      <p className="mt-3 text-sm text-muted">
        Pick an avatar and a few interests so the tutor can pull examples that
        actually click. Both are optional and editable later.
      </p>

      <div className="mt-6 flex items-center gap-4 rounded-lg border border-hair bg-offwhite p-4">
        <UserAvatar
          seed={uid}
          label={previewLabel}
          size="xl"
          emoji={avatarEmoji}
          color={avatarColor}
        />
        <div className="min-w-0">
          <div className="text-[13px] text-muted">Preview</div>
          <div className="truncate font-serif text-xl text-ink">
            {previewLabel}
          </div>
          <div className="text-[12px] text-muted">
            {interests.length === 0
              ? "Add a few interests below"
              : interests.join(" · ")}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="label mb-2">Avatar emoji</div>
        <div className="grid grid-cols-10 gap-1.5">
          {AVATAR_EMOJI_OPTIONS.map((e) => {
            const selected = e === avatarEmoji;
            return (
              <button
                key={e}
                type="button"
                onClick={() => setAvatarEmoji(e)}
                aria-pressed={selected}
                aria-label={`Choose avatar ${e}`}
                className={`flex h-9 items-center justify-center rounded-md border text-base transition ${
                  selected
                    ? "border-orange bg-orange-tint"
                    : "border-hair bg-paper hover:border-orange"
                }`}
              >
                {e}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <div className="label mb-2">Background color</div>
        <div className="flex flex-wrap gap-2">
          {AVATAR_COLOR_OPTIONS.map((c) => {
            const selected = c === avatarColor;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setAvatarColor(c)}
                aria-pressed={selected}
                aria-label={`Choose color ${c}`}
                className={`h-8 w-8 rounded-full border-2 transition ${
                  selected ? "border-ink" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <div className="label">Interests</div>
          <span className="text-[11px] text-muted">
            {interests.length} / {MAX_INTERESTS}
          </span>
        </div>
        <p className="mt-1 text-[12px] text-muted">
          Pick up to {MAX_INTERESTS}. The tutor leans on these when it picks
          examples and analogies.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => {
            const selected = interests.includes(interest);
            const atLimit = !selected && interests.length >= MAX_INTERESTS;
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                disabled={atLimit}
                aria-pressed={selected}
                className={`rounded-full border px-3 py-1.5 text-[12.5px] transition ${
                  selected
                    ? "border-orange bg-orange-tint text-ink"
                    : atLimit
                    ? "cursor-not-allowed border-hair bg-offwhite text-dim"
                    : "border-hair bg-paper text-body hover:border-orange"
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PlanStep({
  choice,
  onChoose,
}: {
  choice: PaidChoice | null;
  onChoose: (c: PaidChoice) => void;
}) {
  return (
    <div>
      <div className="label mb-2">Pick a plan</div>
      <h2 className="font-serif text-3xl font-normal text-ink">
        Want to unlock the full tutor right now?
      </h2>
      <p className="mt-3 text-sm text-muted">
        You can stay on the free Learner plan and upgrade later — but if you
        already know finals are coming, going Pro now saves a step.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {PLAN_OFFERS.map((p) => {
          const isSelected = choice === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => onChoose(p.key)}
              className={`flex flex-col rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-orange bg-orange-tint"
                  : "border-hair bg-paper hover:border-orange"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-lg text-ink">{p.title}</span>
                <span className="text-sm font-medium text-ink">{p.price}</span>
              </div>
              <p className="mt-1 text-[12.5px] text-muted">{p.blurb}</p>
              <ul className="mt-3 space-y-1.5 text-[12.5px] text-body">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className="text-orange-ink">•</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              {p.highlight && (
                <span className="mt-3 inline-flex w-fit rounded-full bg-orange px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-paper">
                  Most popular
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onChoose("skip")}
        className={`mt-4 w-full rounded-md border px-4 py-3 text-sm transition ${
          choice === "skip"
            ? "border-ink bg-ink text-paper"
            : "border-hair bg-paper text-body hover:border-ink"
        }`}
      >
        Stay on the free Learner plan for now
      </button>

      <p className="mt-3 text-[11px] text-dim">
        If you pick Pro or Hacker we'll take you to checkout right after the
        warm welcome — nothing is charged until you confirm.
      </p>
    </div>
  );
}

function CoursesStep({
  selected,
  onToggle,
  limit,
  planChoice,
}: {
  selected: string[];
  onToggle: (slug: string) => void;
  limit: number;
  planChoice: PaidChoice | null;
}) {
  return (
    <div>
      <div className="label mb-2">Your AP courses</div>
      <h2 className="font-serif text-3xl font-normal text-ink">
        Which APs are you prepping for?
      </h2>
      <p className="mt-3 text-sm text-muted">
        Pick the courses you want on your dashboard. You can add or remove
        courses later from /study.
      </p>

      <div className="mt-4 flex items-center justify-between text-[12px] text-muted">
        <span>
          {selected.length} / {limit} selected ·{" "}
          {planLabel(planChoiceToTier(planChoice))} plan
        </span>
        {(planChoice === "skip" || planChoice === null) && (
          <span className="text-dim">Upgrade later for more slots.</span>
        )}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {COURSES.map((c) => {
          const isSelected = selected.includes(c.slug);
          const atLimit = !isSelected && selected.length >= limit;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => onToggle(c.slug)}
              disabled={atLimit}
              aria-pressed={isSelected}
              className={`flex items-center gap-2.5 rounded-md border px-3 py-2 text-left text-[13px] transition ${
                isSelected
                  ? "border-orange bg-orange-tint text-ink"
                  : atLimit
                  ? "cursor-not-allowed border-hair bg-offwhite text-dim"
                  : "border-hair bg-paper text-body hover:border-orange"
              }`}
            >
              <CourseIcon slug={c.slug} category={c.category} size="sm" />
              <span className="min-w-0 flex-1 truncate">{c.title}</span>
              {isSelected && (
                <span aria-hidden="true" className="shrink-0 text-orange-ink">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PersonalizationStep({
  verbosity,
  setVerbosity,
  mode,
  setMode,
  personality,
  setPersonality,
}: {
  verbosity: AiVerbosity;
  setVerbosity: (v: AiVerbosity) => void;
  mode: AiMode;
  setMode: (v: AiMode) => void;
  personality: AiPersonality;
  setPersonality: (v: AiPersonality) => void;
}) {
  return (
    <div>
      <div className="label mb-2">Chat personalization</div>
      <h2 className="font-serif text-3xl font-normal text-ink">
        How should the tutor talk to you?
      </h2>
      <p className="mt-3 text-sm text-muted">
        Tweak the AI's reply length, teaching style, and tone. You can change
        these anytime from the chat settings panel.
      </p>

      <div className="mt-6 space-y-6">
        <RadioGroup
          label="Reply length"
          value={verbosity}
          options={AI_VERBOSITY_OPTIONS}
          onChange={setVerbosity}
        />
        <RadioGroup
          label="Teaching mode"
          value={mode}
          options={AI_MODE_OPTIONS}
          onChange={setMode}
        />
        <RadioGroup
          label="Personality"
          value={personality}
          options={AI_PERSONALITY_OPTIONS}
          onChange={setPersonality}
        />
      </div>
    </div>
  );
}

function RadioGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: ReadonlyArray<{ key: T; label: string; description: string }>;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <div className="label mb-2">{label}</div>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((opt) => {
          const isSelected = value === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onChange(opt.key)}
              aria-pressed={isSelected}
              className={`rounded-md border p-3 text-left transition ${
                isSelected
                  ? "border-orange bg-orange-tint"
                  : "border-hair bg-paper hover:border-orange"
              }`}
            >
              <div className="text-[13px] font-medium text-ink">
                {opt.label}
              </div>
              <div className="mt-1 text-[11.5px] leading-snug text-muted">
                {opt.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TermsStep({
  accepted,
  setAccepted,
}: {
  accepted: boolean;
  setAccepted: (v: boolean) => void;
}) {
  return (
    <div>
      <div className="label mb-2">One last thing</div>
      <h2 className="font-serif text-3xl font-normal text-ink">
        Terms of Service & Privacy Policy
      </h2>
      <p className="mt-3 text-sm text-muted">
        Before we drop you into the dashboard, please review and accept the
        terms below. We keep them short and human-readable.
      </p>

      <div className="mt-6 space-y-3 rounded-lg border border-hair bg-offwhite p-5 text-[13px] text-body">
        <p>
          By using FinalsPrep you agree that the AI tutor is a study aid, not a
          substitute for graded work, and that you'll follow your school's
          academic integrity policy when using it.
        </p>
        <p>
          We store your chats, course selections, and progress so you can pick
          up where you left off. We do not sell your data.
        </p>
        <p>
          The full{" "}
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
          </a>{" "}
          have everything in detail.
        </p>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-md border border-hair bg-paper p-4 text-[13px] text-body">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-orange"
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
    </div>
  );
}

const REFERRAL_OPTIONS = [
  "Friend or classmate",
  "A teacher or tutor",
  "Reddit",
  "TikTok or Instagram",
  "YouTube",
  "Google search",
  "Discord or online community",
  "School counselor",
  "Other",
] as const;

function WelcomeStep({
  name,
  planChoice,
  courseCount,
  referralSource,
  setReferralSource,
}: {
  name: string;
  planChoice: PaidChoice | null;
  courseCount: number;
  referralSource: string;
  setReferralSource: (v: string) => void;
}) {
  const planLine =
    planChoice === "pro" || planChoice === "hacker"
      ? `Your ${planLabel(
          planChoiceToTier(planChoice)
        )} checkout is one tap away — once that clears, every unit lesson, practice bank, and tutor tool unlocks across all of your AP courses.`
      : "You're on the free Learner plan, which is plenty to get started — three AP courses on your dashboard, the chat tutor, and the full schedule + insights view. Whenever you're ready for more courses or higher tutor caps, /shop has the upgrade.";
  return (
    <div>
      <div className="text-center">
        <div className="text-5xl">🎉</div>
        <h2 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink">
          Welcome to FinalsPrep, {name}.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-body">
          From everyone on the FinalsPrep team — thank you for trusting us with
          your finals season. We built this because cramming the night before
          shouldn't be the only option, and we're genuinely glad you're here.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-orange/40 bg-orange-tint p-5">
        <div className="text-[12px] font-semibold uppercase tracking-wider text-orange-ink">
          Here's what you've got set up
        </div>
        <ul className="mt-3 space-y-2 text-[13.5px] leading-snug text-body">
          <li className="flex gap-2">
            <span className="text-orange-ink">✓</span>
            <span>
              <span className="text-ink">{courseCount}</span>{" "}
              {courseCount === 1 ? "AP course" : "AP courses"} pinned to your
              dashboard, with full unit breakdowns ready to go.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-orange-ink">✓</span>
            <span>
              A tutor tuned to your reply length, teaching mode, and
              personality — it'll keep that voice across every chat.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-orange-ink">✓</span>
            <span>
              Your profile is live, so you'll show up on leaderboards and class
              activity right away.
            </span>
          </li>
        </ul>
        <p className="mt-3 text-[13px] leading-relaxed text-body">{planLine}</p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <WelcomeTip
          title="Open the chat"
          body="Paste a problem and get a step-by-step walkthrough."
        />
        <WelcomeTip
          title="Plan your week"
          body="Use /schedule to block out study time across courses."
        />
        <WelcomeTip
          title="Try a mock exam"
          body="Run /exam to test yourself across the full unit list."
        />
      </div>

      <div className="mt-7 rounded-xl border border-hair bg-paper p-5">
        <div className="label mb-2">One last quick question</div>
        <h3 className="font-serif text-xl text-ink">
          How did you hear about FinalsPrep?
        </h3>
        <p className="mt-1 text-[12.5px] text-muted">
          Totally optional, but it genuinely helps us figure out where to spend
          time so more students can find us.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {REFERRAL_OPTIONS.map((opt) => {
            const selected = referralSource === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() =>
                  setReferralSource(selected ? "" : opt)
                }
                aria-pressed={selected}
                className={`rounded-full border px-3 py-1.5 text-[12.5px] transition ${
                  selected
                    ? "border-orange bg-orange-tint text-ink"
                    : "border-hair bg-paper text-body hover:border-orange"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-center text-[12px] text-dim">
        — The FinalsPrep team. Hit us up at /contact anytime.
      </p>
    </div>
  );
}

function WelcomeTip({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-hair bg-offwhite p-4">
      <div className="text-[13px] font-medium text-ink">{title}</div>
      <p className="mt-1 text-[12px] leading-snug text-muted">{body}</p>
    </div>
  );
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}
