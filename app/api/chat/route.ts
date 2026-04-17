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
  isGeminiBlocked,
  isGeminiRateLimit,
  markGeminiBlocked,
} from "@/lib/geminiStatus";
import type { PlanTier } from "@/lib/plans";

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
      ? { provider: "anthropic", model: SONNET_MODEL, costMultiplier: 3 }
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
  const systemPrompt = buildChatSystemPrompt(aiPrefs);
  const outputTokenLimit = maxOutputTokens("chat", aiPrefs.aiVerbosity);

  // Thinking mode: only Pro/Hacker users can enable it. Learners ignored.
  const thinking =
    (plan === "pro" || plan === "hacker") && body?.thinking === true;
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
    // still works — we just eat a slightly higher cost.
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
  let r = reserve(key, tier);
  // If they're out of daily budget, fall back to the bonus token bank.
  let useTokenBank = false;
  if (!r.ok && user?.uid) {
    const bank = await getTokenBank(user.uid);
    if (bank.balance >= LIMITS.RESERVE_MIN_TOKENS) {
      useTokenBank = true;
      r = {
        ok: true as const,
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
      meta: { reason: r.reason, tier },
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
      hasImages: Array.isArray(body?.images) && body.images.length > 0,
      aiVerbosity: aiPrefs.aiVerbosity,
      aiMode: aiPrefs.aiMode,
      aiPersonality: aiPrefs.aiPersonality,
    },
  });

  // Image uploads: Pro/Hacker only. Attach to the last user message.
  const rawImages = Array.isArray(body?.images) ? body.images : [];
  const allowImages = plan === "pro" || plan === "hacker";
  const validImages = allowImages
    ? rawImages
        .filter(
          (img: any) =>
            img &&
            typeof img.mediaType === "string" &&
            /^image\/(png|jpeg|jpg|gif|webp)$/i.test(img.mediaType) &&
            typeof img.data === "string" &&
            img.data.length > 0 &&
            img.data.length < 10_000_000
        )
        .slice(0, 5)
    : [];

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
              validImages.length > 0;
            if (!isLastUser) return { role: m.role, content: m.content };
            const content: any[] = validImages.map((img: any) => ({
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
        const last = messages[messages.length - 1]?.content || "";
        const chat = model.startChat({ history });
        const result = await chat.sendMessageStream(last);
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
            // then retry this request on Claude — but only if we haven't
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

        const rawTokens =
          capturedInput + capturedOutput ||
          estimateTokens(messages.map((m) => m.content).join("\n")) +
            estimateTokens(accumulated);
        const totalTokens = Math.round(rawTokens * picked.costMultiplier);
        if (useTokenBank && user?.uid) {
          await deductFromTokenBank(user.uid, totalTokens);
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
        const est =
          estimateTokens(messages.map((m) => m.content).join("\n")) +
          estimateTokens(accumulated);
        if (est > 0) record(key, est);
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
