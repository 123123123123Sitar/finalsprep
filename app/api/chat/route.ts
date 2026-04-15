import Anthropic from "@anthropic-ai/sdk";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chatSystemPrompt";
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

export const runtime = "nodejs";

type ClientMsg = { role: "user" | "assistant"; content: string };

function jsonError(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const ALLOWED_MODELS: Record<string, string> = {
  haiku: "claude-haiku-4-5-20251001",
  sonnet: "claude-sonnet-4-6",
  opus: "claude-opus-4-6",
};
const DEFAULT_MODEL_ID = ALLOWED_MODELS.sonnet;

function pickModel(
  requested: unknown,
  plan: string,
  bringsOwnKey: boolean
): string {
  if (typeof requested !== "string") return DEFAULT_MODEL_ID;
  const id = ALLOWED_MODELS[requested];
  if (!id) return DEFAULT_MODEL_ID;
  // Free and Pro always get Sonnet. Premium can pick any, or anyone bringing
  // their own API key (since they're paying for it directly).
  if (plan === "premium" || bringsOwnKey) return id;
  return DEFAULT_MODEL_ID;
}

export async function POST(req: Request) {
  const serverKey = process.env.ANTHROPIC_API_KEY;

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
  const plan = userPlan?.plan ?? "free";

  // Premium users can bring their own Anthropic API key and pick a model.
  // When they do, we don't rate-limit them since it's their wallet.
  const clientApiKey =
    plan === "premium" && typeof body?.anthropicApiKey === "string"
      ? body.anthropicApiKey.trim()
      : "";
  const bringsOwnKey = clientApiKey.startsWith("sk-ant-");
  const apiKey = bringsOwnKey ? clientApiKey : serverKey;
  if (!apiKey) {
    return jsonError(500, {
      error: "Chat requires ANTHROPIC_API_KEY to be set on the server.",
      limitReached: true,
    });
  }

  const key = userKey(user?.uid, req);
  const r = bringsOwnKey
    ? { ok: true as const, tier, tokensRemaining: Infinity, messagesRemaining: Infinity }
    : reserve(key, tier);
  if (!r.ok) {
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

  const client = new Anthropic({ apiKey });
  const model = pickModel(body?.model, plan, bringsOwnKey);

  // Image uploads: Pro and Premium only. Attach to the last user message.
  const rawImages = Array.isArray(body?.images) ? body.images : [];
  const allowImages = plan === "pro" || plan === "premium" || bringsOwnKey;
  const validImages = allowImages
    ? rawImages
        .filter(
          (img: any) =>
            img &&
            typeof img.mediaType === "string" &&
            /^image\/(png|jpeg|jpg|gif|webp)$/i.test(img.mediaType) &&
            typeof img.data === "string" &&
            img.data.length > 0 &&
            img.data.length < 10_000_000 // ~7.5MB decoded
        )
        .slice(0, 5)
    : [];

  const anthMessages: Anthropic.MessageParam[] = messages.map((m, i) => {
    const isLastUser =
      i === messages.length - 1 && m.role === "user" && validImages.length > 0;
    if (!isLastUser) return { role: m.role, content: m.content };
    const content: any[] = validImages.map((img: any) => ({
      type: "image",
      source: {
        type: "base64",
        media_type: img.mediaType as
          | "image/png"
          | "image/jpeg"
          | "image/gif"
          | "image/webp",
        data: img.data,
      },
    }));
    if (m.content.trim().length > 0) {
      content.push({ type: "text", text: m.content });
    } else {
      content.push({ type: "text", text: "Please help me with the work in this image." });
    }
    return { role: "user" as const, content };
  });

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      let capturedInput = 0;
      let capturedOutput = 0;
      let accumulated = "";
      try {
        const response = client.messages.stream({
          model,
          max_tokens: 1200,
          system: CHAT_SYSTEM_PROMPT,
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
            if (!capturedInput) capturedInput = final.usage?.input_tokens ?? 0;
            if (!capturedOutput) capturedOutput = final.usage?.output_tokens ?? 0;
          } catch {}
        }

        const rawTokens =
          capturedInput + capturedOutput ||
          estimateTokens(messages.map((m) => m.content).join("\n")) +
            estimateTokens(accumulated);
        // Thinking models (Opus) charge 2x against the rate-limit budget.
        // They're slower and more expensive per token, and the reasoning
        // chain consumes extra latent tokens we don't get billed for in
        // "usage" — so double-booking keeps incentives aligned.
        const isThinking = model === ALLOWED_MODELS.opus;
        const totalTokens = isThinking ? rawTokens * 2 : rawTokens;
        // Only charge the shared budget if we used our own server key.
        if (!bringsOwnKey) record(key, totalTokens);
        if (user?.uid) {
          void recordAiHistory({
            uid: user.uid,
            kind: "chat",
            source: "ai",
            plan,
            prompt: messages[messages.length - 1]?.content || "",
            response: accumulated,
            tokens: totalTokens,
            model,
            metadata: {
              contextMessages: messages.length,
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
        if (!bringsOwnKey && est > 0) record(key, est);
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
