"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";

export type Theme = "light" | "dark" | "sepia";
export const THEMES: Theme[] = ["light", "dark", "sepia"];
const STORAGE_KEY = "fp-theme";

function isTheme(v: unknown): v is Theme {
  return typeof v === "string" && (THEMES as string[]).includes(v);
}

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  canUseThemes: boolean;
};

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user, plan } = useAuth();
  const canUseThemes = plan === "pro" || plan === "hacker";
  const [theme, setThemeState] = useState<Theme>("light");

  // Hydrate from localStorage on mount. An inline script in layout.tsx
  // has already applied data-theme to <html> before paint to avoid flash.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isTheme(saved)) setThemeState(saved);
  }, []);

  // For authed users on a paid plan, sync with Firestore prefs.
  useEffect(() => {
    if (!user || !canUseThemes) return;
    const db = getDb();
    if (!db) return;
    const ref = doc(db, "users", user.uid, "profile", "prefs");
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const t = (snap.data() as any)?.theme;
        if (isTheme(t)) {
          setThemeState(t);
          if (typeof window !== "undefined")
            window.localStorage.setItem(STORAGE_KEY, t);
        }
      },
      () => {}
    );
    return () => unsub();
  }, [user, canUseThemes]);

  // Apply to <html>. Non-pro users always render "light" regardless of
  // any stored preference (so downgrade works cleanly).
  useEffect(() => {
    if (typeof document === "undefined") return;
    const effective: Theme = canUseThemes ? theme : "light";
    document.documentElement.setAttribute("data-theme", effective);
  }, [theme, canUseThemes]);

  const setTheme = useCallback(
    (t: Theme) => {
      if (!canUseThemes) return;
      setThemeState(t);
      if (typeof window !== "undefined")
        window.localStorage.setItem(STORAGE_KEY, t);
      if (user) {
        const db = getDb();
        if (db) {
          setDoc(
            doc(db, "users", user.uid, "profile", "prefs"),
            { theme: t, updatedAt: serverTimestamp() },
            { merge: true }
          ).catch(() => {});
        }
      }
    },
    [user, canUseThemes]
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, canUseThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be within ThemeProvider");
  return ctx;
}
