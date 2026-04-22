"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";

export type Theme =
  | "light"
  | "dark"
  | "sepia"
  | "solarized"
  | "nord"
  | "rose"
  | "forest"
  | "contrast"
  | "auto";
export type EffectiveTheme = Exclude<Theme, "auto">;
export const THEMES: Theme[] = [
  "light",
  "dark",
  "sepia",
  "solarized",
  "nord",
  "rose",
  "forest",
  "contrast",
  "auto",
];
const STORAGE_KEY = "fp-theme";

function isTheme(v: unknown): v is Theme {
  return typeof v === "string" && (THEMES as string[]).includes(v);
}

/** Light during the day (6:00–18:00 local), dark otherwise. */
export function resolveAutoTheme(now: Date = new Date()): EffectiveTheme {
  const h = now.getHours();
  return h >= 6 && h < 18 ? "light" : "dark";
}

function effective(theme: Theme): EffectiveTheme {
  return theme === "auto" ? resolveAutoTheme() : theme;
}

type Ctx = {
  theme: Theme;
  effectiveTheme: EffectiveTheme;
  setTheme: (t: Theme) => void;
  /** Retained for backwards compat; themes are universal now, so this is always true. */
  canUseThemes: boolean;
};

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<Theme>("light");
  const [autoTick, setAutoTick] = useState(0);

  // Hydrate from localStorage on mount. An inline script in layout.tsx
  // has already applied data-theme to <html> before paint to avoid flash.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isTheme(saved)) setThemeState(saved);
  }, []);

  // For any signed-in user, sync theme with Firestore prefs so it follows
  // them across devices. Dark mode is universal, no plan check.
  useEffect(() => {
    if (!user) return;
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
  }, [user]);

  // In auto mode, re-evaluate every 5 minutes so the UI transitions
  // around 6am / 6pm without a page reload.
  useEffect(() => {
    if (theme !== "auto") return;
    const id = window.setInterval(() => setAutoTick((n) => n + 1), 5 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [theme]);

  const effectiveTheme = useMemo<EffectiveTheme>(
    () => effective(theme),
    // autoTick intentionally in deps so `effective()` re-runs on the interval.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, autoTick]
  );

  // Apply the resolved theme to <html>.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", effectiveTheme);
  }, [effectiveTheme]);

  const setTheme = useCallback(
    (t: Theme) => {
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
    [user]
  );

  return (
    <ThemeContext.Provider
      value={{ theme, effectiveTheme, setTheme, canUseThemes: true }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be within ThemeProvider");
  return ctx;
}
