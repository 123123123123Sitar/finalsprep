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

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return jsonError(500, {
      error: "Chat requires ANTHROPIC_API_KEY to be set on the server.",
      limitReached: true,
    });
  }

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

  const key = userKey(user?.uid, req);
  const r = reserve(key, tier);
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
  const model = "claude-sonnet-4-6";

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
          messages,
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

        const totalTokens =
          capturedInput + capturedOutput ||
          estimateTokens(messages.map((m) => m.content).join("\n")) +
            estimateTokens(accumulated);
        record(key, totalTokens);
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
