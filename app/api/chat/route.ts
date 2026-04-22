import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildChatSystemPrompt } from "@/lib/chatSystemPrompt";
import { maxOutputTokens, normalizeAiPrefs } from "@/lib/aiPrefs";
import { getStoredAiPrefs } from "@/lib/aiPrefsStore";
import {
  clampInput,
  estimateTokens,
  LIMITS,
  peek,
  record,
  reserve,
  userKey,
  type Tier,
} from "@/lib/rateLimit";
import { getAuthedUser } from "@/lib/authGuard";
import { getPlan, planToRateTier } from "@/lib/userPlan";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { recordAiHistory } from "@/lib/aiHistory";
import { logEvent } from "@/lib/events";
import {
  getTokenBank,
  deductFromTokenBank,
} from "@/lib/tokenBank";
import {
  peekUsage,
  recordUsage,
  reserveUsage,
} from "@/lib/rateLimitStore";
import {
  isGeminiBlocked,
  isGeminiRateLimit,
  markGeminiBlocked,
} from "@/lib/geminiStatus";
import { ocrImage } from "@/lib/ocr";
import type { PlanTier } from "@/lib/plans";
import { aiCost } from "@/lib/aiCost";
import { spendTokens } from "@/lib/spend";
import { recordActivity } from "@/lib/activity";

export const runtime = "nodejs";

type ClientMsg = { role: "user" | "assistant"; content: string };

function jsonError(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Model routing (cost-controlled, invisible to the user):
 *
 *   Learner (Gemini OK)    → Gemini 2.5 Flash     · 1x cost
 *   Learner (Gemini 429)   → Claude Haiku 4.5     · 1x cost (auto-fallback)
 *   Pro (default)          → Claude Haiku 4.5     · 1x cost
 *   Pro (thinking)         → Claude Sonnet 4.6    · 3x cost
 *   Hacker (default)       → Claude Haiku 4.5     · 1x cost
 *   Hacker (thinking)      → Claude Sonnet 4.6    · 3x cost
 *
 * Pro and Hacker always use Claude. Learners try Gemini first; when Gemini
 * is globally rate-limited (flag set in Firestore by the fallback path
 * below) we route them to Claude Haiku instead.
 *
 * "thinking" is a client boolean. We never expose model names in the UI.
 */
type Provider = "gemini" | "anthropic";
type ModelPick = {
  provider: Provider;
  model: string;
  costMultiplier: number;
};

const GEMINI_MODEL = "gemini-2.5-flash";
const HAIKU_MODEL = "claude-haiku-4-5-20251001";
const SONNET_MODEL = "claude-sonnet-4-6";

function pickModel(
  plan: PlanTier,
  thinking: boolean,
  geminiBlocked: boolean
): ModelPick {
  if (plan === "hacker" || plan === "pro") {
    return thinking
      ? { provider: "anthropic", model: SONNET_MODEL, costMultiplier: 1.5 }
      : { provider: "anthropic", model: HAIKU_MODEL, costMultiplier: 1 };
  }
  // Learner: prefer Gemini, fall back to Claude when Gemini is rate-limited.
  if (geminiBlocked) {
    return { provider: "anthropic", model: HAIKU_MODEL, costMultiplier: 1 };
  }
  return { provider: "gemini", model: GEMINI_MODEL, costMultiplier: 1 };
}

export async function POST(req: Request) {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const geminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

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

  const messages = rawMessages
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
  const systemPrompt = buildChatSystemPrompt(aiPrefs, { voiceMode });
  // Cheap pre-check so learners hit Claude immediately when Gemini is
  // globally rate-limited; the in-stream fallback below still handles a
  // 429 racing past this check.
  const geminiBlocked = plan === "learner" ? await isGeminiBlocked() : false;
  const picked = pickModel(plan, thinking, geminiBlocked);

  // Gate on the right API key.
  const needAnthropic = picked.provider === "anthropic";
  if (needAnthropic && !anthropicKey) {
    return jsonError(500, {
      error: "Chat requires ANTHROPIC_API_KEY to be set on the server.",
      limitReached: true,
    });
  }
  if (!needAnthropic && !geminiKey) {
    // If Gemini isn't configured, fall back to Anthropic Haiku so the app
    // still works; we just eat a slightly higher cost.
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
  // Authed users: Firestore-backed usage (survives serverless cold starts).
  // Anonymous/dev: in-memory bucket, since we have no uid to key on.
  let r: {
    ok: boolean;
    tier: Tier;
    tokensRemaining: number;
    messagesRemaining: number;
    reason?: "tokens" | "messages";
    message?: string;
    resetMinutes?: number;
  };
  if (user?.uid) {
    const p = await reserveUsage(user.uid, tier);
    r = p.ok
      ? {
          ok: true,
          tier,
          tokensRemaining: p.tokensRemaining,
          messagesRemaining: p.messagesRemaining,
        }
      : {
          ok: false,
          tier,
          tokensRemaining: p.tokensRemaining,
          messagesRemaining: p.messagesRemaining,
          reason: p.reason,
          message: p.message,
          resetMinutes: p.resetMinutes,
        };
  } else {
    const mem = reserve(key, tier);
    r = mem.ok
      ? {
          ok: true,
          tier,
          tokensRemaining: mem.tokensRemaining,
          messagesRemaining: mem.messagesRemaining,
        }
      : {
          ok: false,
          tier,
          tokensRemaining: mem.tokensRemaining,
          messagesRemaining: mem.messagesRemaining,
          reason: mem.reason,
          message: mem.message,
          resetMinutes: mem.resetMinutes,
        };
  }
  // If they're out of daily budget, fall back to the bonus token bank for
  // the gate. The actual deduction (drain daily first, overflow to bank)
  // happens via spendTokens() after the API call returns.
  if (!r.ok && user?.uid) {
    const bank = await getTokenBank(user.uid);
    if (bank.balance >= LIMITS.RESERVE_MIN_TOKENS) {
      r = {
        ok: true,
        tier,
        tokensRemaining: bank.balance,
        messagesRemaining: Math.floor(bank.balance / 700),
      };
    }
  }
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

  // Image uploads: available to every plan. OCR pulls text out for free,
  // and the vision-capable models (Claude + Gemini Flash) handle anything
  // OCR can't read. Attach to the last user message.
  const rawImages = Array.isArray(body?.images) ? body.images : [];
  const validImages = rawImages
    .filter(
      (img: any) =>
        img &&
        typeof img.mediaType === "string" &&
        /^image\/(png|jpeg|jpg|gif|webp)$/i.test(img.mediaType) &&
        typeof img.data === "string" &&
        img.data.length > 0 &&
        img.data.length < 10_000_000
    )
    .slice(0, 5);

  // OCR pre-pass. Try to pull plain text out of each attachment with
  // Tesseract. Three outcomes per image:
  //   - transcribed: high confidence; drop the image, send text only
  //   - partial:     some text, but uncertain; keep BOTH the OCR text
  //                  (as a hint) AND the image so the vision model can
  //                  verify what's actually there
  //   - failed:      unreadable; send the image only
  const imagesForVision: typeof validImages = [];
  const ocrBlocks: string[] = [];
  if (validImages.length > 0) {
    const results = await Promise.all(
      validImages.map((img: any) =>
        ocrImage({ mediaType: img.mediaType, data: img.data })
      )
    );
    results.forEach((r, i) => {
      if (r.kind === "transcribed") {
        ocrBlocks.push(`[OCR transcription of attached image]\n${r.text}`);
      } else if (r.kind === "partial") {
        ocrBlocks.push(
          `[Partial OCR of attached image: may be inaccurate, the image is also attached for reference]\n${r.text}`
        );
        imagesForVision.push(validImages[i]);
      } else {
        imagesForVision.push(validImages[i]);
      }
    });
  }

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
      let capturedInput = 0;
      let capturedOutput = 0;
      let accumulated = "";

      const runAnthropic = async (modelId: string) => {
        const client = new Anthropic({ apiKey: anthropicKey! });
        const anthMessages: Anthropic.MessageParam[] = messages.map(
          (m, i) => {
            const isLastUser =
              i === messages.length - 1 &&
              m.role === "user" &&
              imagesForVision.length > 0;
            if (!isLastUser) return { role: m.role, content: m.content };
            const content: any[] = imagesForVision.map((img: any) => ({
              type: "image",
              source: {
                type: "base64",
                media_type: img.mediaType,
                data: img.data,
              },
            }));
            if (m.content.trim().length > 0) {
              content.push({ type: "text", text: m.content });
            } else {
              content.push({
                type: "text",
                text: "Please help me with the work in this image.",
              });
            }
            return { role: "user" as const, content };
          }
        );
        const response = client.messages.stream({
          model: modelId,
          max_tokens: outputTokenLimit,
          system: systemPrompt,
          messages: anthMessages,
        });
        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            accumulated += event.delta.text;
            controller.enqueue(enc.encode(event.delta.text));
          } else if (event.type === "message_start") {
            const u = (event as any).message?.usage;
            if (u?.input_tokens) capturedInput = u.input_tokens;
          } else if (event.type === "message_delta") {
            const u = (event as any).usage;
            if (u?.output_tokens) capturedOutput = u.output_tokens;
          }
        }
        if (!capturedInput || !capturedOutput) {
          try {
            const final = await response.finalMessage();
            if (!capturedInput)
              capturedInput = final.usage?.input_tokens ?? 0;
            if (!capturedOutput)
              capturedOutput = final.usage?.output_tokens ?? 0;
          } catch {}
        }
      };

      const runGemini = async () => {
        const genAi = new GoogleGenerativeAI(geminiKey!);
        const model = genAi.getGenerativeModel({
          model: picked.model,
          systemInstruction: systemPrompt,
          generationConfig: {
            maxOutputTokens: outputTokenLimit,
          },
        });
        const history = messages.slice(0, -1).map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));
        const lastText = messages[messages.length - 1]?.content || "";
        // Gemini accepts a mix of text and inline image parts in the same
        // message. Send any vision-fallback images alongside the text so
        // Gemini Flash can read what OCR couldn't.
        const lastParts: any[] = [];
        for (const img of imagesForVision) {
          lastParts.push({
            inlineData: { mimeType: img.mediaType, data: img.data },
          });
        }
        if (lastText.trim().length > 0) {
          lastParts.push({ text: lastText });
        } else if (imagesForVision.length > 0) {
          lastParts.push({
            text: "Please help me with the work in this image.",
          });
        }
        const chat = model.startChat({ history });
        const result = await chat.sendMessageStream(lastParts);
        for await (const chunk of result.stream) {
          const t = chunk.text();
          if (t) {
            accumulated += t;
            controller.enqueue(enc.encode(t));
          }
        }
        try {
          const agg = await result.response;
          const usage = (agg as any).usageMetadata;
          if (usage) {
            capturedInput = usage.promptTokenCount || 0;
            capturedOutput = usage.candidatesTokenCount || 0;
          }
        } catch {}
      };

      try {
        if (picked.provider === "anthropic") {
          await runAnthropic(picked.model);
        } else {
          try {
            await runGemini();
          } catch (e) {
            // Learner-tier fallback: Gemini hit a rate limit. Flip the
            // global flag so the next request routes to Claude immediately,
            // then retry this request on Claude, but only if we haven't
            // already streamed any tokens to the client.
            if (
              isGeminiRateLimit(e) &&
              accumulated.length === 0 &&
              anthropicKey
            ) {
              void markGeminiBlocked((e as any)?.message);
              picked.provider = "anthropic";
              picked.model = HAIKU_MODEL;
              picked.costMultiplier = 1;
              await runAnthropic(HAIKU_MODEL);
            } else {
              throw e;
            }
          }
        }

        // Single source of truth for the formula lives in lib/aiCost.ts:
        //   base 100 + 20% input + 30% output, ×2 if images (except Hacker),
        //   × provider costMultiplier (1.5x for Sonnet thinking).
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
        const msg = e?.message || "Upstream error";
        controller.enqueue(enc.encode(`\n\n[error: ${msg}]`));
        // Still charge the floor for failed prompts so users can't retry
        // for free past their budget on error.
        const inputEst =
          estimateTokens(messages.map((m) => m.content).join("\n"));
        const outputEst = estimateTokens(accumulated);
        const est = aiCost({ inputTokens: inputEst, outputTokens: outputEst, plan });
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
