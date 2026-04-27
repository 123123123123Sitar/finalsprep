import { getAdminDb } from "@/lib/firebaseAdmin";
import { normalizePlanTier, type PlanTier } from "@/lib/plans";

type AiHistoryKind = "chat" | "explain" | "grade" | "schedule_plan";
type AiHistorySource = "ai" | "curated";

export async function recordAiHistory({
  uid,
  kind,
  source,
  plan,
  prompt,
  response,
  tokens,
  inputTokens,
  outputTokens,
  model,
  metadata,
}: {
  uid: string;
  kind: AiHistoryKind;
  source: AiHistorySource;
  plan: PlanTier;
  prompt: string;
  response: string;
  /** Cost-weighted billing units charged via spendTokens (see aiCost.ts). */
  tokens?: number;
  /** Raw input tokens reported by the model API. Powers admin cost reporting. */
  inputTokens?: number;
  /** Raw output tokens reported by the model API. */
  outputTokens?: number;
  model?: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
}) {
  const db = getAdminDb();
  if (!db) return;

  const safeInput = Math.max(0, Math.round(inputTokens || 0));
  const safeOutput = Math.max(0, Math.round(outputTokens || 0));
  const enrichedMetadata = sanitizeMetadata({
    ...(metadata || {}),
    inputTokens: safeInput || undefined,
    outputTokens: safeOutput || undefined,
  });

  try {
    await db.collection("users").doc(uid).collection("aiHistory").add({
      kind,
      source,
      plan: normalizePlanTier(plan),
      prompt: trimText(prompt, 4000),
      promptPreview: trimText(prompt, 240),
      promptChars: prompt.length,
      response: trimText(response, 4000),
      responsePreview: trimText(response, 240),
      responseChars: response.length,
      tokens: Math.max(0, Math.round(tokens || 0)),
      inputTokens: safeInput,
      outputTokens: safeOutput,
      model: model || null,
      metadata: enrichedMetadata,
      createdAt: Date.now(),
    });
  } catch (e) {
    console.error("[aiHistory] record failed", e);
  }
}

function trimText(text: string, max: number): string {
  const normalized = (text || "").trim();
  if (normalized.length <= max) return normalized;
  return normalized.slice(0, Math.max(0, max - 1)).trimEnd() + "…";
}

function sanitizeMetadata(
  metadata?: Record<string, string | number | boolean | null | undefined>
) {
  if (!metadata) return {};
  const clean: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (value === undefined) continue;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      clean[key] = value;
    }
  }
  return clean;
}
