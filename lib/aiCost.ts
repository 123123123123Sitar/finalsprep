/**
 * Single source of truth for "what does an AI call cost the user?"
 *
 * Every AI feature (chat, explain, chat-title, interactives, …) should call
 * `aiCost()` to compute the number of tokens to deduct from the user's daily
 * budget or bonus bank.
 *
 *   base:        100 tokens minimum per call
 *   input tax:   +20% of actual input tokens
 *   output tax:  +30% of actual output tokens
 *   image 2x:    doubled when images are attached, EXCEPT on Hacker plan
 *   multiplier:  optional cost multiplier (e.g. 3x for Sonnet thinking mode)
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
