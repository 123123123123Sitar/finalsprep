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

export type ClientPlan = PlanTier;

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
  // Starts true because the auth check is still pending on first mount —
  // we don't yet know whether there's a user whose plan we need to load.
  const [planLoading, setPlanLoading] = useState(true);
  const [streak, setStreak] = useState<StreakDoc | null>(null);
  const configured = isFirebaseConfigured();

  useEffect(() => {
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

  // Subscribe to the user's billing doc so the plan updates in real-time
  // when the Stripe webhook promotes them.
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
      // Auth state not resolved yet — we can't know which plan to fetch.
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
              ? "Account created, but Firebase throttled the verification email. Wait a minute, then use 'Resend verification email'."
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
      // full-page redirect flow. This never resolves — the browser
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
      getIdToken,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      resendVerification,
      sendPasswordReset,
      refresh,
    }),
    [user, loading, configured, plan, planLoading, streak, getIdToken]
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
      return "Email/Password sign-in isn't enabled in Firebase. Enable it in the Firebase console.";
    case "auth/app-not-authorized":
    case "auth/unauthorized-domain":
      return "This domain isn't authorized for Firebase auth. Add it under Firebase Authentication -> Settings -> Authorized domains.";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in popup. Allow popups for this site and try again.";
    case "auth/account-exists-with-different-credential":
      return "An account with this email already exists using a different sign-in method. Try the other method first.";
    case "auth/configuration-not-found":
      return "Firebase auth isn't fully configured for this project yet. Check the web app config and enabled sign-in methods.";
    case "auth/invalid-api-key":
    case "auth/api-key-not-valid":
      return "The Firebase web API key is invalid for this app. Re-copy the NEXT_PUBLIC_FIREBASE_* config from the Firebase console and restart the app.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    default:
      return fallbackMessage || "Something went wrong.";
  }
}
