"use client";
import { useEffect, useState } from "react";
import type { Flashcard } from "@/lib/topics";
import MathRender from "@/app/components/Math";

type Status = "unseen" | "known" | "review";

export default function Flashcards({
  cards,
  storageKey,
}: {
  cards: Flashcard[];
  storageKey: string;
}) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [status, setStatus] = useState<Status[]>(() => cards.map(() => "unseen"));

  useEffect(() => {
    setI(0);
    setFlipped(false);
    setStatus(cards.map(() => "unseen"));
  }, [storageKey, cards]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`fc:${storageKey}`);
      if (raw) {
        const parsed = JSON.parse(raw) as Status[];
        if (Array.isArray(parsed) && parsed.length === cards.length) setStatus(parsed);
      }
    } catch {}
  }, [storageKey, cards.length]);

  useEffect(() => {
    try {
      localStorage.setItem(`fc:${storageKey}`, JSON.stringify(status));
    } catch {}
  }, [status, storageKey]);

  const card = cards[i];
  const knownCount = status.filter((s) => s === "known").length;
  const reviewCount = status.filter((s) => s === "review").length;

  function advance(markAs?: Status) {
    setStatus((prev) => {
      if (!markAs) return prev;
      const next = [...prev];
      next[i] = markAs;
      return next;
    });
    setFlipped(false);
    setI((prev) => (prev + 1) % cards.length);
  }

  function prev() {
    setFlipped(false);
    setI((p) => (p - 1 + cards.length) % cards.length);
  }

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between text-xs text-muted">
        <div className="font-mono">
          {String(i + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
        </div>
        <div className="flex gap-4">
          <span>{knownCount} known</span>
          <span>{reviewCount} to review</span>
        </div>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="group block h-60 w-full select-none rounded-md border border-hair bg-offwhite p-8 text-left transition-colors hover:border-rule"
      >
        <div className="meta">
          {flipped ? "Answer" : "Question"} · click to flip
        </div>
        <div className="mt-4 flex h-[calc(100%-2rem)] items-center justify-center">
          <div
            key={`${i}-${flipped}`}
            className="animate-fadeUp max-w-xl text-center text-[19px] leading-snug text-ink"
          >
            <MathRender auto>{flipped ? card.a : card.q}</MathRender>
          </div>
        </div>
      </button>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button onClick={prev} className="btn-ghost">← Prev</button>
        <button onClick={() => advance("review")} className="btn-ghost">
          Review later
        </button>
        <button onClick={() => advance("known")} className="btn-ghost">
          Got it
        </button>
        <button onClick={() => advance()} className="btn-ghost">Next →</button>
      </div>
    </div>
  );
}
