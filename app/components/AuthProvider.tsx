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
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { getDb, getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

export type ClientPlan = "free" | "pro";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  plan: ClientPlan;
  /** Returns an ID token for the current user, or null if not signed in. */
  getIdToken: () => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  signOut: () => Promise<void>;
  resendVerification: () => Promise<{ ok: boolean; message?: string }>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<ClientPlan>("free");
  const configured = isFirebaseConfigured();

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Subscribe to the user's billing doc so the plan updates in real-time
  // when the Stripe webhook promotes them.
  useEffect(() => {
    if (!user) {
      setPlan("free");
      return;
    }
    const db = getDb();
    if (!db) return;
    const ref = doc(db, "users", user.uid, "profile", "billing");
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data = snap.data() as any;
        if (!data) {
          setPlan("free");
          return;
        }
        const nowSec = Math.floor(Date.now() / 1000);
        const expired =
          data.currentPeriodEnd && data.currentPeriodEnd < nowSec;
        setPlan(data.plan === "pro" && !expired ? "pro" : "free");
      },
      () => setPlan("free")
    );
    return () => unsub();
  }, [user]);

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
    if (!auth) return { ok: false, message: "Auth is not configured on this server." };
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user);
      return {
        ok: true,
        message:
          "Account created. We just sent a verification link to your inbox - click it, then come back and sign in.",
      };
    } catch (e: any) {
      return { ok: false, message: prettyFirebaseError(e) };
    }
  }

  async function signIn(email: string, password: string) {
    const auth = getFirebaseAuth();
    if (!auth) return { ok: false, message: "Auth is not configured on this server." };
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await reload(cred.user);
      if (!cred.user.emailVerified) {
        return {
          ok: false,
          message:
            "Your email isn't verified yet. Check your inbox for the verification link, then sign in again.",
        };
      }
      return { ok: true };
    } catch (e: any) {
      return { ok: false, message: prettyFirebaseError(e) };
    }
  }

  async function signOut() {
    const auth = getFirebaseAuth();
    if (!auth) return;
    await fbSignOut(auth);
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
      return { ok: false, message: prettyFirebaseError(e) };
    }
  }

  async function refresh() {
    const auth = getFirebaseAuth();
    if (!auth || !auth.currentUser) return;
    await reload(auth.currentUser);
    setUser({ ...auth.currentUser });
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured,
      plan,
      getIdToken,
      signUp,
      signIn,
      signOut,
      resendVerification,
      refresh,
    }),
    [user, loading, configured, plan, getIdToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

function prettyFirebaseError(e: any): string {
  const code = e?.code as string | undefined;
  if (!code) return e?.message || "Something went wrong.";
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
    default:
      return e?.message || "Something went wrong.";
  }
}
