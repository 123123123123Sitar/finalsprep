"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme, THEMES, type Theme } from "@/app/components/ThemeProvider";

const THEME_META: Record<Theme, { label: string; icon: string }> = {
  light: { label: "Light", icon: "☀︎" },
  dark: { label: "Dark", icon: "☾" },
  sepia: { label: "Sepia", icon: "✦" },
  solarized: { label: "Solarized", icon: "❂" },
  nord: { label: "Nord", icon: "❄" },
  rose: { label: "Rosé", icon: "❀" },
  forest: { label: "Forest", icon: "❋" },
  contrast: { label: "Contrast", icon: "◆" },
  auto: { label: "Auto", icon: "◐" },
};

/**
 * Compact dropdown for changing the active theme. Used on /account now that
 * the appearance controls have been moved out of the nav bar.
 */
export default function ThemePicker() {
  const { theme, effectiveTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const displayLabel =
    theme === "auto"
      ? `Auto · ${THEME_META[effectiveTheme].label}`
      : THEME_META[theme].label;
  const displayIcon =
    theme === "auto" ? THEME_META[effectiveTheme].icon : THEME_META[theme].icon;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-md border border-hair bg-paper px-3 py-2 text-sm text-ink hover:bg-offwhite"
      >
        <span aria-hidden="true">{displayIcon}</span>
        <span>{displayLabel}</span>
        <span aria-hidden="true" className="text-dim">
          ▾
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-48 rounded-md border border-hair bg-paper py-1 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.35)]">
          {THEMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTheme(t);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm ${
                theme === t ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              <span aria-hidden="true" className="w-4 text-center">
                {THEME_META[t].icon}
              </span>
              <span>{THEME_META[t].label}</span>
              {t === "auto" && (
                <span className="ml-1 text-[10px] uppercase tracking-wider text-dim">
                  {effectiveTheme}
                </span>
              )}
              {theme === t && (
                <span className="ml-auto text-xs text-orange">●</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
