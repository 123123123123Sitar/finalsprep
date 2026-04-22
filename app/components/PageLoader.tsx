"use client";
import { LogoMark } from "@/app/components/Logo";

/**
 * Full-page loading screen with a pulsing logo. Use inside a `<main>` where
 * the nav renders above; this just fills the content slot.
 */
export default function PageLoader({
  label = "Loading",
  minHeight = "min-h-[60vh]",
}: {
  label?: string;
  minHeight?: string;
}) {
  return (
    <div
      className={`flex ${minHeight} items-center justify-center px-6`}
      aria-busy="true"
      aria-live="polite"
    >
      <LogoMark
        size={56}
        className="text-ink animate-logo-pulse"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
