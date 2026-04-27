import { buildChatSystemPrompt } from "@/lib/chatSystemPrompt";
import { maxOutputTokens, normalizeAiPrefs } from "@/lib/aiPrefs";
import { getStoredAiPrefs } from "@/lib/aiPrefsStore";
import {
  clampInput,
  estimateTokens,
  LIMITS,
  peek,
  record,
  userKey,
} from "@/lib/rateLimit";
import { getAuthedUser } from "@/lib/authGuard";
import { getPlan, planToRateTier } from "@/lib/userPlan";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { recordAiHistory } from "@/lib/aiHistory";
import { logEvent } from "@/lib/events";
import {
  isGeminiBlocked,
  isGeminiRateLimit,
  markGeminiBlocked,
} from "@/lib/geminiStatus";
import { aiCost } from "@/lib/aiCost";
import { spendTokens } from "@/lib/spend";
import { recordActivity } from "@/lib/activity";
import { captureException } from "@/lib/observability";
import { GEMINI_MODEL, HAIKU_MODEL, pickModel } from "@/lib/chat/models";
import { runOcrSplit, validateImages } from "@/lib/chat/images";
import { reserveBudget } from "@/lib/chat/budget";
import {
  runAnthropicStream,
  runGeminiStream,
  runMercuryStream,
  type ChatMsg,
} from "@/lib/chat/stream";

export const runtime = "nodejs";

type ClientMsg = { role: "user" | "assistant"; content: string };

function jsonError(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const geminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const inceptionKey = process.env.INCEPTION_API_KEY;

  // Require signed-in user (unless admin SDK isn't configured yet, for dev).
  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && !user) {
    return jsonError(401, {
      error: "Authentication required",
      message: "Sign in to use the chat tutor.",
    });
  }
  if (adminOn && user && !user.emailVerified) {
    return jsonError(403, {
      error: "Email not verified",
      message: "Verify your email before using chat.",
    });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, { error: "Invalid JSON" });
  }

  const rawMessages: ClientMsg[] = Array.isArray(body?.messages) ? body.messages : [];

  const messages: ChatMsg[] = rawMessages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-LIMITS.MAX_HISTORY)
    .map((m) => ({ role: m.role, content: clampInput(m.content) }))
    .filter((m) => m.content.length > 0);

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return jsonError(400, { error: "Last message must be from user." });
  }

  const userPlan = user ? await getPlan(user.uid) : null;
  const tier = planToRateTier(userPlan);
  const plan = userPlan?.plan ?? "learner";
  const aiPrefs = user
    ? await getStoredAiPrefs(user.uid)
    : normalizeAiPrefs(body?.aiPrefs);
  const outputTokenLimit = maxOutputTokens("chat", aiPrefs.aiVerbosity);

  // Thinking mode: only Pro/Hacker users can enable it. Learners ignored.
  const thinking =
    (plan === "pro" || plan === "hacker") && body?.thinking === true;
  // Voice mode: only Pro/Hacker can enable it; adds a 1.5x cost multiplier
  // on top of whatever model is picked. Learners silently ignored.
  const voiceMode =
    (plan === "pro" || plan === "hacker") && body?.voiceMode === true;
  const systemPrompt = buildChatSystemPrompt(aiPrefs, { voiceMode, plan });
  const geminiBlocked = plan === "learner" ? await isGeminiBlocked() : false;
  // Mercury 2 is text-only, so route image queries to Gemini instead.
  const hasImagesUpfront =
    Array.isArray(body?.images) && body.images.length > 0;
  const picked = pickModel(plan, thinking, geminiBlocked, {
    inceptionAvailable: !!inceptionKey,
    hasImages: hasImagesUpfront,
  });

  // Gate on the right API key. If Gemini isn't configured, fall back to
  // Anthropic Haiku so the app still works; we just eat a slightly higher cost.
  if (picked.provider === "anthropic" && !anthropicKey) {
    return jsonError(500, {
      error: "Chat requires ANTHROPIC_API_KEY to be set on the server.",
      limitReached: true,
    });
  }
  if (picked.provider === "gemini" && !geminiKey) {
    if (!anthropicKey) {
      return jsonError(500, {
        error:
          "Chat requires GOOGLE_GENERATIVE_AI_API_KEY (preferred) or ANTHROPIC_API_KEY.",
        limitReached: true,
      });
    }
    picked.provider = "anthropic";
    picked.model = HAIKU_MODEL;
  }

  const key = userKey(user?.uid, req);
  const r = await reserveBudget({ uid: user?.uid, tier, key });
  if (!r.ok) {
    void logEvent({
      kind: "chat.limit_hit",
      uid: user?.uid,
      email: user?.email,
      plan,
      meta: { reason: r.reason ?? "unknown", tier },
    });
    return jsonError(429, {
      error: "Rate limited",
      limitReached: true,
      message: r.message,
      tokensRemaining: r.tokensRemaining,
      messagesRemaining: r.messagesRemaining,
      resetMinutes: r.resetMinutes,
      plan,
      rateTier: tier,
    });
  }

  void logEvent({
    kind: "chat.send",
    uid: user?.uid,
    email: user?.email,
    plan,
    meta: {
      provider: picked.provider,
      thinking,
      voiceMode,
      hasImages: Array.isArray(body?.images) && body.images.length > 0,
      aiVerbosity: aiPrefs.aiVerbosity,
      aiMode: aiPrefs.aiMode,
      aiPersonality: aiPrefs.aiPersonality,
    },
  });

  // Image OCR pre-pass. Drops cleanly-transcribed attachments, keeps
  // uncertain ones for the vision model to verify.
  const validImages = validateImages(body?.images);
  const { imagesForVision, ocrBlocks } = await runOcrSplit(validImages);

  // Splice OCR text into the latest user message so the model sees it as
  // part of the prompt. The student's typed question is preserved below.
  if (ocrBlocks.length > 0) {
    const preface = ocrBlocks.join("\n\n");
    const lastIdx = messages.length - 1;
    const existing = messages[lastIdx].content.trim();
    messages[lastIdx] = {
      ...messages[lastIdx],
      content: existing ? `${preface}\n\n${existing}` : preface,
    };
  }

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      let accumulated = "";
      let capturedInput = 0;
      let capturedOutput = 0;

      const onDelta = (text: string) => {
        accumulated += text;
        controller.enqueue(enc.encode(text));
      };

      try {
        const ctx = {
          messages,
          imagesForVision,
          systemPrompt,
          outputTokenLimit,
          onDelta,
        };
        // Sequential attempt chain. Each stage may pivot `picked` to the
        // next provider; later stages run only if a prior stage didn't
        // already stream a successful response.
        let completed = false;

        if (picked.provider === "inception") {
          try {
            const r = await runMercuryStream(ctx, {
              apiKey: inceptionKey!,
              model: picked.model,
            });
            capturedInput = r.inputTokens;
            capturedOutput = r.outputTokens;
            completed = true;
          } catch (e) {
            if (accumulated.length !== 0) throw e;
            captureException(e, {
              area: "chat.stream.mercury_fallback",
              uid: user?.uid,
              plan,
            });
            if (geminiKey && !geminiBlocked) {
              picked.provider = "gemini";
              picked.model = GEMINI_MODEL;
              picked.costMultiplier = 1;
            } else if (anthropicKey) {
              picked.provider = "anthropic";
              picked.model = HAIKU_MODEL;
              picked.costMultiplier = 1;
            } else {
              throw e;
            }
          }
        }

        if (!completed && picked.provider === "gemini") {
          try {
            const r = await runGeminiStream(ctx, {
              apiKey: geminiKey!,
              model: picked.model,
            });
            capturedInput = r.inputTokens;
            capturedOutput = r.outputTokens;
            completed = true;
          } catch (e) {
            // Learner fallback: if Gemini rate-limited us before any tokens
            // streamed, flip the global flag and retry on Claude Haiku.
            if (
              isGeminiRateLimit(e) &&
              accumulated.length === 0 &&
              anthropicKey
            ) {
              void markGeminiBlocked((e as any)?.message);
              picked.provider = "anthropic";
              picked.model = HAIKU_MODEL;
              picked.costMultiplier = 1;
            } else {
              throw e;
            }
          }
        }

        if (!completed && picked.provider === "anthropic") {
          const r = await runAnthropicStream(ctx, {
            apiKey: anthropicKey!,
            model: picked.model,
          });
          capturedInput = r.inputTokens;
          capturedOutput = r.outputTokens;
          completed = true;
        }

        // Single source of truth for the formula lives in lib/aiCost.ts.
        const inputTokens =
          capturedInput ||
          estimateTokens(messages.map((m) => m.content).join("\n"));
        const outputTokens = capturedOutput || estimateTokens(accumulated);
        const hasImages =
          imagesForVision.length > 0 || ocrBlocks.length > 0;
        const totalTokens = aiCost({
          inputTokens,
          outputTokens,
          hasImages,
          plan,
          multiplier: picked.costMultiplier * (voiceMode ? 1.5 : 1),
        });
        if (user?.uid) {
          // Drain daily budget first, overflow from the bonus bank.
          const split = await spendTokens(user.uid, totalTokens);
          // Mirror the daily portion into the in-memory bucket so /api/usage
          // reflects the write within the same warm instance.
          if (split.fromDaily > 0) record(key, split.fromDaily);
          void recordActivity(user.uid);
        } else {
          record(key, totalTokens);
        }

        if (user?.uid) {
          void recordAiHistory({
            uid: user.uid,
            kind: "chat",
            source: "ai",
            plan,
            prompt: messages[messages.length - 1]?.content || "",
            response: accumulated,
            tokens: totalTokens,
            inputTokens,
            outputTokens,
            model: picked.model,
            metadata: {
              provider: picked.provider,
              thinking,
              voiceMode,
              contextMessages: messages.length,
              aiVerbosity: aiPrefs.aiVerbosity,
              aiMode: aiPrefs.aiMode,
              aiPersonality: aiPrefs.aiPersonality,
            },
          });
        }

        controller.close();
      } catch (e: any) {
        captureException(e, {
          area: "chat.stream",
          uid: user?.uid,
          plan,
          provider: picked.provider,
          model: picked.model,
          thinking,
        });
        controller.enqueue(
          enc.encode("\n\n[error: The tutor is temporarily unavailable. Please try again.]")
        );
        // Still charge the floor for failed prompts so users can't retry
        // for free past their budget on error.
        const inputEst = estimateTokens(
          messages.map((m) => m.content).join("\n")
        );
        const outputEst = estimateTokens(accumulated);
        const est = aiCost({
          inputTokens: inputEst,
          outputTokens: outputEst,
          plan,
        });
        if (est > 0) {
          if (user?.uid) {
            const split = await spendTokens(user.uid, est);
            if (split.fromDaily > 0) record(key, split.fromDaily);
          } else {
            record(key, est);
          }
        }
        controller.close();
      }
    },
  });

  const p = peek(key, tier);
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Tokens-Remaining": String(p.tokensRemaining),
      "X-Messages-Remaining": String(p.messagesRemaining),
      "X-Reset-Minutes": String(p.resetMinutes),
      "X-Plan": plan,
      "X-Rate-Tier": tier,
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
