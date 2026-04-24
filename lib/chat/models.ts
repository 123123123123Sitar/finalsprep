/**
 * Model routing for /api/chat. Kept in one place so the cost-control
 * policy is easy to audit.
 *
 *   Learner (Gemini OK)    → Gemini 2.5 Flash     · 1x
 *   Learner (Gemini 429)   → Claude Haiku 4.5     · 1x (auto-fallback)
 *   Pro (default)          → Claude Haiku 4.5     · 1x
 *   Pro (thinking)         → Claude Sonnet 4.6    · 1.5x
 *   Hacker (default)       → Claude Haiku 4.5     · 1x
 *   Hacker (thinking)      → Claude Sonnet 4.6    · 1.5x
 *
 * "thinking" is a client boolean; we never expose model names in the UI.
 * The voice-mode multiplier is applied separately in the route.
 */
import type { PlanTier } from "@/lib/plans";

export type Provider = "gemini" | "anthropic";

export type ModelPick = {
  provider: Provider;
  model: string;
  costMultiplier: number;
};

export const GEMINI_MODEL = "gemini-2.5-flash";
export const HAIKU_MODEL = "claude-haiku-4-5-20251001";
export const SONNET_MODEL = "claude-sonnet-4-6";

export function pickModel(
  plan: PlanTier,
  thinking: boolean,
  geminiBlocked: boolean
): ModelPick {
  if (plan === "hacker" || plan === "pro") {
    return thinking
      ? { provider: "anthropic", model: SONNET_MODEL, costMultiplier: 1.5 }
      : { provider: "anthropic", model: HAIKU_MODEL, costMultiplier: 1 };
  }
  if (geminiBlocked) {
    return { provider: "anthropic", model: HAIKU_MODEL, costMultiplier: 1 };
  }
  return { provider: "gemini", model: GEMINI_MODEL, costMultiplier: 1 };
}
