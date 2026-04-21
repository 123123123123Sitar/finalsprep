"use client";
import { useState, useEffect } from "react";
import MathRender from "./Math";
import {
  loadWrongBankSrs,
  updateWrongBankSrsCard,
  removeWrongBankSrsCard,
  isDue,
  rateSrsCard,
} from "@/lib/srs";

export default function WrongBankSrsMode() {
  const [cards, setCards] = useState<any[]>([]);
  const [dueCards, setDueCards] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [activeMode, setActiveMode] = useState(false);

  useEffect(() => {
    const loaded = loadWrongBankSrs();
    setCards(loaded);
    setDueCards(loaded.filter((_, i) => isDue(loaded[i])));
  }, []);

  if (!activeMode) {
    const dueCount = dueCards.length;
    if (dueCount === 0) return null;

    return (
      <button
        onClick={() => setActiveMode(true)}
        className="w-full rounded-md border border-green-300 bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-800 hover:border-green-400 transition-colors"
      >
        🔄 {dueCount} problem{dueCount === 1 ? "" : "s"} ready for review
      </button>
    );
  }

  if (dueCards.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-hair bg-offwhite p-6 text-center text-sm text-muted">
        No problems due for review today. Come back later!
      </div>
    );
  }

  const card = dueCards[currentIdx];

  function handleRate(rating: 0 | 3 | 5) {
    const globalIdx = cards.findIndex((c) => c.prompt === card.prompt);
    if (globalIdx !== -1) {
      const updated = rateSrsCard(card, rating);
      updateWrongBankSrsCard(globalIdx, updated);
      setFlipped(false);

      if (currentIdx < dueCards.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setActiveMode(false);
        setDueCards(loadWrongBankSrs().filter((_, i) => isDue(loadWrongBankSrs()[i])));
      }
    }
  }

  function handleRemove() {
    const globalIdx = cards.findIndex((c) => c.prompt === card.prompt);
    if (globalIdx !== -1) {
      removeWrongBankSrsCard(globalIdx);
      const updatedCards = loadWrongBankSrs();
      setCards(updatedCards);
      setDueCards(updatedCards.filter((_, i) => isDue(updatedCards[i])));
      if (currentIdx >= dueCards.length - 1) {
        setCurrentIdx(Math.max(0, currentIdx - 1));
      }
    }
  }

  return (
    <div className="rounded-lg border border-green-300 bg-green-50 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-green-900">
          SRS Review: Problem {currentIdx + 1} of {dueCards.length}
        </h3>
        <button
          onClick={() => setActiveMode(false)}
          className="text-xs text-green-700 hover:text-green-900"
        >
          ✕ Exit review
        </button>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="group block w-full h-60 select-none rounded-md border border-green-300 bg-white p-8 text-left transition-colors hover:border-green-400 mb-4"
      >
        <div className="meta text-green-700">
          {flipped ? "Answer" : "Problem"} · click to flip
        </div>
        <div className="mt-4 flex h-[calc(100%-2rem)] items-center justify-center">
          <div
            key={`${currentIdx}-${flipped}`}
            className="animate-fadeUp max-w-xl text-center text-[19px] leading-snug text-ink"
          >
            <MathRender auto>{flipped ? card.answer : card.prompt}</MathRender>
          </div>
        </div>
      </button>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button
          onClick={() => handleRate(0)}
          className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:border-red-400 transition-colors"
        >
          Hard
        </button>
        <button
          onClick={() => handleRate(3)}
          className="rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-xs font-medium text-yellow-700 hover:border-yellow-400 transition-colors"
        >
          Okay
        </button>
        <button
          onClick={() => handleRate(5)}
          className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-xs font-medium text-green-700 hover:border-green-400 transition-colors"
        >
          Easy
        </button>
        <button
          onClick={handleRemove}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-600 hover:border-gray-400 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
