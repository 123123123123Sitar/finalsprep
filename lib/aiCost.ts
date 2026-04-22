/**
 * ─────────────────────────────────────────────────────────────────────────────
 * TOKEN POLICY - single source of truth for what an AI call costs.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *   base:        100 tokens minimum per call (the "floor")
 *   input tax:   +20% of the model's reported input  tokens
 *   output tax:  +30% of the model's reported output tokens
 *   image 2x:    cost is doubled when any image is attached - EXCEPT on Hacker
 *   multiplier:  optional × multiplier applied last
 *                  · 1.5×  for Sonnet "thinking" mode (Pro/Hacker only)
 *                  · 1×    everywhere else
 *
 *   cost = round( max(100, 100 + 0.20·in + 0.30·out)  × imageFactor × mult )
 *
 * SPENDING ORDER  (lib/spend.ts → spendTokens)
 *   1. Daily budget first (10k Learner / 20k Pro / 80k Hacker, 24h sliding window)
 *   2. Any overflow draws from the bonus bank (purchased + earned tokens)
 *
 * PER-FEATURE RULES  (every AI route must deduct via spendTokens)
 *   ┌──────────────────────────────────┬──────────────────────────────────────┐
 *   │ Feature / route                  │ Cost rule                            │
 *   ├──────────────────────────────────┼──────────────────────────────────────┤
 *   │ Chat                             │ aiCost() with image-2× and Sonnet    │
 *   │ /api/chat                        │ thinking 1.5×                        │
 *   │                                  │                                      │
 *   │ Problem explain                  │ aiCost(); no image flag, no mult     │
 *   │ /api/explain                     │ Curated walkthroughs cost 0          │
 *   │                                  │                                      │
 *   │ Chat-title generation            │ FLAT 10 tokens (bypasses formula -   │
 *   │ /api/chat-title                  │ titles are tiny side-calls)          │
 *   │                                  │                                      │
 *   │ Interactives generate            │ aiCost(); no image flag, no mult     │
 *   │ /api/interactives/generate       │ Pro/Hacker only                      │
 *   │                                  │                                      │
 *   │ Practice exam generate           │ aiCost(); typically 600–900 tokens   │
 *   │ /api/practice/exam/generate      │ for a 10-question exam               │
 *   │                                  │                                      │
 *   │ FRQ grade                        │ aiCost(); Sonnet model               │
 *   │ /api/practice/frq/grade          │                                      │
 *   │                                  │                                      │
 *   │ Practice problem grade           │ aiCost(); standard formula           │
 *   │ /api/grade                       │                                      │
 *   │                                  │                                      │
 *   │ On-the-fly practice generate     │ aiCost(); standard formula           │
 *   │ /api/generate-practice           │                                      │
 *   └──────────────────────────────────┴──────────────────────────────────────┘
 *
 * DISPLAY CONTRACT
 *   Every surface that shows "tokens" MUST read from /api/usage so the number
 *   matches everywhere. The endpoint returns:
 *     · tokensRemaining: daily budget left (24h sliding window)
 *     · tokensCap:        the plan's full daily cap
 *     · bonusBalance:     bonus bank balance
 *   Historical / cumulative numbers (e.g. "Tokens used in last 7d") MUST be
 *   labelled as such (never as "Tokens" alone) so they can't be confused
 *   with the remaining budget.
 */
import type { PlanTier } from "@/lib/plans";

export type AiCostInput = {
  inputTokens: number;
  outputTokens: number;
  hasImages?: boolean;
  plan?: PlanTier;
  /** Optional multiplier applied last (e.g. 3x for thinking-mode Sonnet). */
  multiplier?: number;
};

export function aiCost(args: AiCostInput): number {
  const safeInput = Math.max(0, args.inputTokens || 0);
  const safeOutput = Math.max(0, args.outputTokens || 0);
  let total = Math.max(
    100,
    Math.round(100 + safeInput * 0.2 + safeOutput * 0.3)
  );
  if (args.hasImages && args.plan !== "hacker") total *= 2;
  total = Math.round(total * Math.max(1, args.multiplier ?? 1));
  return total;
}
