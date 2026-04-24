"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { getDb, getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { normalizePlanTier, type PlanTier } from "@/lib/plans";
import type { StreakDoc } from "@/lib/streaks";
import {
  clearStashedReferralCode,
  readStashedReferralCode,
  stashReferralCodeFromUrl,
} from "@/lib/referralClient";

export type ClientPlan = PlanTier;

/**
 * Lightweight slice of `publicProfiles/{uid}` exposed via auth context so
 * any component can render the user's chosen avatar + display name without
 * setting up its own Firestore subscription. Kept narrow on purpose — for
 * the full profile, hit `/api/me/profile`.
 */
export type AuthProfile = {
  displayName: string;
  username: string;
  avatarEmoji: string | null;
  avatarColor: string | null;
};

const PLAN_CACHE_KEY = "fp-plan";

function readCachedPlan(): PlanTier {
  if (typeof window === "undefined") return "learner";
  try {
    return normalizePlanTier(window.localStorage.getItem(PLAN_CACHE_KEY));
  } catch {
    return "learner";
  }
}

function writeCachedPlan(plan: PlanTier) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PLAN_CACHE_KEY, plan);
  } catch {
    /* ignore */
  }
}
export type AuthResult = {
  ok: boolean;
  code?: string;
  message?: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  plan: ClientPlan;
  /**
   * True while we're still waiting on the first Firestore billing snapshot
   * for the current user. `plan` may be a cached value during this window;
   * gate any paywalled UI on `!planLoading` to avoid flashing the learner
   * state at a paid user.
   */
  planLoading: boolean;
  streak: StreakDoc | null;
  /**
   * Public profile slice (display name + avatar). null until the first
   * publicProfiles snapshot resolves; falls back gracefully in consumers.
   */
  profile: AuthProfile | null;
  /** Returns an ID token for the current user, or null if not signed in. */
  getIdToken: () => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  signOut: () => Promise<void>;
  resendVerification: () => Promise<AuthResult>;
  sendPasswordReset: (email: string) => Promise<AuthResult>;
  refresh: () => Promise<User | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<ClientPlan>(() => readCachedPlan());
  // True until the first billing-doc snapshot returns for the current user.
  // Starts true because the auth check is still pending on first mount;
  // we don't yet know whether there's a user whose plan we need to load.
  const [planLoading, setPlanLoading] = useState(true);
  const [streak, setStreak] = useState<StreakDoc | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const configured = isFirebaseConfigured();

  useEffect(() => {
    // Capture `?ref=CODE` before anything else so a new visitor who
    // clicks a share link and bounces to signup still carries credit.
    stashReferralCodeFromUrl();
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    // Finalize any in-progress Google redirect flow (no-op if none).
    getRedirectResult(auth).catch((e) => {
      console.warn("[auth] getRedirectResult failed", e?.code || e);
    });
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Fire referral attribution once the account is real (email verified).
  // Best-effort: a server error just leaves the stash for the next load.
  useEffect(() => {
    if (!user || !user.emailVerified) return;
    const code = readStashedReferralCode();
    if (!code) return;
    let cancelled = false;
    (async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/referral/attribute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ code }),
        });
        if (cancelled) return;
        // Clear on any definitive response (success or a permanent 4xx
        // like invalid-code / self-referral). Network failures leave
        // the stash so the next visit retries.
        if (res.ok || res.status === 404 || res.status === 400) {
          clearStashedReferralCode();
        }
      } catch {
        /* leave the stash for the next page load */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Subscribe to the streak doc so the nav badge updates live.
  useEffect(() => {
    if (!user) {
      setStreak(null);
      return;
    }
    const db = getDb();
    if (!db) return;
    const ref = doc(db, "users", user.uid, "profile", "streak");
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const d = snap.data() as Partial<StreakDoc> | undefined;
        setStreak(
          d
            ? {
                current: typeof d.current === "number" ? d.current : 0,
                longest: typeof d.longest === "number" ? d.longest : 0,
                lastActiveDate:
                  typeof d.lastActiveDate === "string" ? d.lastActiveDate : "",
              }
            : null
        );
      },
      () => setStreak(null)
    );
    return () => unsub();
  }, [user]);

  // Subscribe to publicProfiles/{uid} so display name + avatar render
  // consistently across nav, dashboard, chat, etc. The doc is created
  // server-side on first /api/me/profile read; while that resolves, we
  // expose `null` and let consumers fall back to the email-derived initial.
  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    const db = getDb();
    if (!db) return;
    // Best-effort: poke /api/me/profile so the doc exists for brand-new
    // users who haven't otherwise hit any social endpoint yet. Failure is
    // fine — consumers fall back until something else creates the doc.
    (async () => {
      try {
        const token = await user.getIdToken();
        await fetch("/api/me/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        /* ignore */
      }
    })();
    const ref = doc(db, "publicProfiles", user.uid);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const d = snap.data() as
          | {
              displayName?: string;
              username?: string;
              avatarEmoji?: string | null;
              avatarColor?: string | null;
            }
          | undefined;
        if (!d) {
          setProfile(null);
          return;
        }
        setProfile({
          displayName: typeof d.displayName === "string" ? d.displayName : "",
          username: typeof d.username === "string" ? d.username : "",
          avatarEmoji:
            typeof d.avatarEmoji === "string" ? d.avatarEmoji : null,
          avatarColor:
            typeof d.avatarColor === "string" ? d.avatarColor : null,
        });
      },
      () => setProfile(null)
    );
    return () => unsub();
  }, [user]);

  // Subscribe to the user's billing doc so the plan updates in real-time
  // when the PayPal capture endpoint or webhook promotes them.
  //
  // Plan resolution is layered to avoid flicker:
  //   1. Initial render: `plan` starts from localStorage cache (fast, warm).
  //   2. If no user is present once auth resolves, plan is definitively
  //      "learner" and `planLoading` flips to false.
  //   3. If there is a user, we hold `planLoading = true` until the first
  //      Firestore snapshot returns, at which point plan is authoritative.
  // Firestore is the single source of truth; the cache only exists to keep
  // the first paint accurate for returning paid subscribers.
  useEffect(() => {
    if (loading) {
      // Auth state not resolved yet; we can't know which plan to fetch.
      return;
    }
    if (!user) {
      setPlan("learner");
      writeCachedPlan("learner");
      setPlanLoading(false);
      return;
    }
    setPlanLoading(true);
    const db = getDb();
    if (!db) {
      setPlanLoading(false);
      return;
    }
    const ref = doc(db, "users", user.uid, "profile", "billing");
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data = snap.data() as any;
        if (!data) {
          setPlan("learner");
          writeCachedPlan("learner");
          setPlanLoading(false);
          return;
        }
        const nowSec = Math.floor(Date.now() / 1000);
        const expired =
          data.currentPeriodEnd && data.currentPeriodEnd < nowSec;
        const nextPlan = normalizePlanTier(data.plan);
        const resolved: PlanTier =
          nextPlan !== "learner" && !expired ? nextPlan : "learner";
        setPlan(resolved);
        writeCachedPlan(resolved);
        setPlanLoading(false);
      },
      () => {
        setPlan("learner");
        setPlanLoading(false);
      }
    );
    return () => unsub();
  }, [user, loading]);

  const getIdToken = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth || !auth.currentUser) return null;
    try {
      return await auth.currentUser.getIdToken();
    } catch {
      return null;
    }
  }, []);

  async function signUp(email: string, password: string) {
    const auth = getFirebaseAuth();
    if (!auth) {
      return { ok: false, message: "Auth is not configured on this server." };
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await sendEmailVerification(cred.user);
      } catch (verificationError: any) {
        const detail = formatFirebaseError(verificationError);
        return {
          ok: true,
          code: detail.code,
          message:
            detail.code === "auth/too-many-requests"
              ? "Account created, but the verification email was throttled. Wait a minute, then use 'Resend verification email'."
              : "Account created, but we couldn't send the verification email yet. Use 'Resend verification email' on the next screen.",
        };
      }
      return {
        ok: true,
        message:
          "Account created. We just sent a verification link to your inbox - click it, then come back and sign in.",
      };
    } catch (e: any) {
      return { ok: false, ...formatFirebaseError(e) };
    }
  }

  async function signIn(email: string, password: string) {
    const auth = getFirebaseAuth();
    if (!auth) {
      return { ok: false, message: "Auth is not configured on this server." };
    }
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await reload(cred.user);
      if (!cred.user.emailVerified) {
        return {
          ok: false,
          code: "auth/email-not-verified",
          message:
            "Your email isn't verified yet. Check your inbox for the verification link, then sign in again.",
        };
      }
      return { ok: true };
    } catch (e: any) {
      return { ok: false, ...formatFirebaseError(e) };
    }
  }

  async function signInWithGoogle() {
    const auth = getFirebaseAuth();
    if (!auth) {
      return { ok: false, message: "Auth is not configured on this server." };
    }
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
      return { ok: true };
    } catch (e: any) {
      const code = e?.code as string | undefined;
      if (
        code === "auth/popup-closed-by-user" ||
        code === "auth/cancelled-popup-request"
      ) {
        return { ok: false, code, message: "Sign-in popup was closed." };
      }
      // Popup-blocked, cross-origin, or generic-internal: fall back to a
      // full-page redirect flow. This never resolves; the browser
      // navigates away and we finish the sign-in via getRedirectResult
      // on the next page load (handled in AuthProvider mount).
      if (
        code === "auth/popup-blocked" ||
        code === "auth/operation-not-supported-in-this-environment" ||
        code === "auth/internal-error" ||
        code === "auth/web-storage-unsupported"
      ) {
        try {
          await signInWithRedirect(auth, provider);
          return { ok: true };
        } catch (redirectErr: any) {
          return { ok: false, ...formatFirebaseError(redirectErr) };
        }
      }
      return { ok: false, ...formatFirebaseError(e) };
    }
  }

  async function signOut() {
    const auth = getFirebaseAuth();
    if (!auth) return;
    await fbSignOut(auth);
  }

  async function sendPasswordReset(email: string) {
    const auth = getFirebaseAuth();
    if (!auth) {
      return { ok: false, message: "Auth is not configured on this server." };
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return {
        ok: true,
        message:
          "If an account exists for that email, a reset link is on its way. Check your inbox in the next couple minutes.",
      };
    } catch (e: any) {
      return { ok: false, ...formatFirebaseError(e) };
    }
  }

  async function resendVerification() {
    const auth = getFirebaseAuth();
    if (!auth || !auth.currentUser) {
      return { ok: false, message: "You need to sign in first." };
    }
    try {
      await sendEmailVerification(auth.currentUser);
      return { ok: true, message: "Verification email resent." };
    } catch (e: any) {
      return { ok: false, ...formatFirebaseError(e) };
    }
  }

  async function refresh() {
    const auth = getFirebaseAuth();
    if (!auth || !auth.currentUser) return null;
    await reload(auth.currentUser);
    const refreshedUser = auth.currentUser;
    setUser({ ...refreshedUser });
    return refreshedUser;
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured,
      plan,
      planLoading,
      streak,
      profile,
      getIdToken,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      resendVerification,
      sendPasswordReset,
      refresh,
    }),
    [user, loading, configured, plan, planLoading, streak, profile, getIdToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

function formatFirebaseError(
  e: any
): { code?: string; message: string } {
  const code = e?.code as string | undefined;
  return {
    code,
    message: prettyFirebaseError(code, e?.message),
  };
}

function prettyFirebaseError(
  code?: string,
  fallbackMessage?: string
): string {
  if (!code) return fallbackMessage || "Something went wrong.";
  switch (code) {
    case "auth/invalid-email":
      return "That email address doesn't look valid.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in instead.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/user-not-found":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Email or password is incorrect.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a minute and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in isn't enabled right now. Visit /contact (support) if it persists.";
    case "auth/app-not-authorized":
    case "auth/unauthorized-domain":
      return "This domain isn't authorized for sign-in. Visit /contact (support) if you're seeing this on the live site.";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in popup. Allow popups for this site and try again.";
    case "auth/account-exists-with-different-credential":
      return "An account with this email already exists using a different sign-in method. Try the other method first.";
    case "auth/configuration-not-found":
      return "Sign-in isn't fully configured yet. Visit /contact (support) if it persists.";
    case "auth/invalid-api-key":
    case "auth/api-key-not-valid":
      return "Sign-in is temporarily unavailable. Try again in a few minutes, or visit /contact (support) if it persists.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    default:
      return fallbackMessage || "Something went wrong.";
  }
}
