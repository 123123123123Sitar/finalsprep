"use client";
import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right" | "scale";

/**
 * Fades + slides content into view once it scrolls into the viewport.
 * Direction controls the starting position:
 *   up    - slides up from below (default)
 *   left  - slides in from the left
 *   right - slides in from the right
 *   scale - scales up from 95%
 *
 * Pair with the .reveal-* classes in globals.css.
 */
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: Direction;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const t = setTimeout(() => setSeen(true), delay);
            io.disconnect();
            return () => clearTimeout(t);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const baseClass = `reveal-${from}`;
  return (
    <div ref={ref} className={`${baseClass} ${seen ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}
