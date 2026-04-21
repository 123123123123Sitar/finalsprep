"use client";
import { useEffect, useState } from "react";
import type { Flashcard } from "@/lib/topics";
import MathRender from "@/app/components/Math";
import { loadSrsDeck, saveSrsDeck, rateSrsCard, isDue, initCard, type SrsCard } from "@/lib/srs";

type Status = "unseen" | "known" | "review";
type Mode = "all" | "due";

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
  const [mode, setMode] = useState<Mode>("all");
  const [srsDeck, setSrsDeck] = useState<SrsCard[]>([]);
  const [lastRated, setLastRated] = useState<string>("");

  useEffect(() => {
    setI(0);
    setFlipped(false);
    setStatus(cards.map(() => "unseen"));
    const newDeck = cards.map(() => initCard());
    setSrsDeck(newDeck);
  }, [storageKey, cards]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`fc:${storageKey}`);
      if (raw) {
        const parsed = JSON.parse(raw) as Status[];
        if (Array.isArray(parsed) && parsed.length === cards.length) setStatus(parsed);
      }
    } catch {}
    const deck = loadSrsDeck(storageKey);
    if (deck.length === cards.length) setSrsDeck(deck);
    else setSrsDeck(cards.map(() => initCard()));
  }, [storageKey, cards.length]);

  useEffect(() => {
    try {
      localStorage.setItem(`fc:${storageKey}`, JSON.stringify(status));
    } catch {}
  }, [status, storageKey]);

  useEffect(() => {
    saveSrsDeck(storageKey, srsDeck);
  }, [srsDeck, storageKey]);

  const visibleIndices = mode === "due"
    ? cards.map((_, idx) => idx).filter(idx => isDue(srsDeck[idx]))
    : cards.map((_, idx) => idx);

  const visibleI = visibleIndices.indexOf(i);
  const currentVisibleIdx = visibleI >= 0 ? visibleI : 0;
  const actualI = visibleIndices[currentVisibleIdx] ?? 0;
  const card = cards[actualI];

  const knownCount = status.filter((s) => s === "known").length;
  const reviewCount = status.filter((s) => s === "review").length;
  const dueCount = srsDeck.filter(isDue).length;

  function rateSrs(rating: 0 | 3 | 5) {
    const updated = rateSrsCard(srsDeck[actualI], rating);
    setSrsDeck((prev) => {
      const next = [...prev];
      next[actualI] = updated;
      return next;
    });
    setLastRated(`Next review: in ${updated.interval} day${updated.interval === 1 ? "" : "s"}`);
    setFlipped(false);
    if (currentVisibleIdx < visibleIndices.length - 1) {
      setI(visibleIndices[currentVisibleIdx + 1]);
    } else {
      setI(visibleIndices[0] ?? 0);
    }
  }

  function advance(markAs?: Status) {
    setStatus((prev) => {
      if (!markAs) return prev;
      const next = [...prev];
      next[actualI] = markAs;
      return next;
    });
    setFlipped(false);
    if (currentVisibleIdx < visibleIndices.length - 1) {
      setI(visibleIndices[currentVisibleIdx + 1]);
    } else {
      setI(visibleIndices[0] ?? 0);
    }
  }

  function prev() {
    setFlipped(false);
    if (currentVisibleIdx > 0) {
      setI(visibleIndices[currentVisibleIdx - 1]);
    } else {
      setI(visibleIndices[visibleIndices.length - 1] ?? 0);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setMode("all")}
            className={`text-xs px-3 py-1 rounded transition-colors ${
              mode === "all"
                ? "bg-ink text-paper"
                : "bg-offwhite text-muted hover:text-ink"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setMode("due")}
            className={`text-xs px-3 py-1 rounded transition-colors ${
              mode === "due"
                ? "bg-ink text-paper"
                : "bg-offwhite text-muted hover:text-ink"
            }`}
          >
            Review due ({dueCount})
          </button>
        </div>
      </div>

      <div className="mb-3 flex items-baseline justify-between text-xs text-muted">
        <div className="font-mono">
          {String(currentVisibleIdx + 1).padStart(2, "0")} / {String(visibleIndices.length).padStart(2, "0")}
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
            key={`${actualI}-${flipped}`}
            className="animate-fadeUp max-w-xl text-center text-[19px] leading-snug text-ink"
          >
            <MathRender auto>{flipped ? card.a : card.q}</MathRender>
          </div>
        </div>
      </button>

      {lastRated && (
        <div className="mt-3 text-center text-sm text-muted">
          {lastRated}
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button onClick={prev} className="btn-ghost">← Prev</button>
        <button onClick={() => rateSrs(0)} className="btn-ghost">
          Hard
        </button>
        <button onClick={() => rateSrs(3)} className="btn-ghost">
          Okay
        </button>
        <button onClick={() => rateSrs(5)} className="btn-ghost">
          Easy
        </button>
      </div>
    </div>
  );
}
