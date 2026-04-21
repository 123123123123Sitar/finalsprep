/**
 * Simplified SM-2 spaced repetition algorithm for flashcards and wrong-bank problems.
 * Stores intervals, ease factors, and due dates in localStorage.
 */

export type SrsCard = {
  interval: number; // days until next review
  ef: number; // ease factor (2.5 default, range 1.3-3.0)
  dueDate: string; // YYYY-MM-DD in local time
};

export type SrsDeck = SrsCard[];

function today(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function initCard(): SrsCard {
  return { interval: 1, ef: 2.5, dueDate: today() };
}

export function isDue(card: SrsCard): boolean {
  return card.dueDate <= today();
}

/**
 * Rate a card: 0 (hard), 3 (okay), 5 (easy).
 * Returns updated card with new interval, ease factor, and due date.
 */
export function rateSrsCard(card: SrsCard, rating: 0 | 3 | 5): SrsCard {
  let newEf = card.ef;
  let newInterval: number;

  if (rating === 0) {
    // Hard: reset interval, decrease ease
    newInterval = 1;
    newEf = Math.max(1.3, card.ef - 0.2);
  } else if (rating === 3) {
    // Okay: normal progression, ease unchanged
    newInterval = Math.max(1, Math.round(card.interval * card.ef));
    newEf = card.ef;
  } else {
    // Easy (5): boost progression, increase ease
    newInterval = Math.max(1, Math.round(card.interval * card.ef * 1.3));
    newEf = Math.min(3.0, card.ef + 0.1);
  }

  return {
    interval: newInterval,
    ef: newEf,
    dueDate: addDays(today(), newInterval),
  };
}

export function loadSrsDeck(storageKey: string): SrsDeck {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`fp-srs:${storageKey}`);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveSrsDeck(storageKey: string, deck: SrsDeck): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`fp-srs:${storageKey}`, JSON.stringify(deck));
  } catch {}
}

export function addWrongProblemToSrs(prompt: string, answer: string): void {
  if (typeof window === "undefined") return;
  const deck = loadSrsDeck("wrong-bank");
  const newCard = initCard();
  const data = { ...newCard, prompt, answer };
  deck.push(data as any);
  saveSrsDeck("wrong-bank", deck as any);
}

export function loadWrongBankSrs(): Array<SrsCard & { prompt: string; answer: string }> {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("fp-srs:wrong-bank");
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function removeWrongBankSrsCard(index: number): void {
  if (typeof window === "undefined") return;
  const deck = loadWrongBankSrs();
  deck.splice(index, 1);
  try {
    if (deck.length === 0) {
      localStorage.removeItem("fp-srs:wrong-bank");
    } else {
      localStorage.setItem("fp-srs:wrong-bank", JSON.stringify(deck));
    }
  } catch {}
}

export function updateWrongBankSrsCard(index: number, card: SrsCard): void {
  if (typeof window === "undefined") return;
  const deck = loadWrongBankSrs();
  if (index >= 0 && index < deck.length) {
    deck[index] = { ...deck[index], ...card };
    try {
      localStorage.setItem("fp-srs:wrong-bank", JSON.stringify(deck));
    } catch {}
  }
}
