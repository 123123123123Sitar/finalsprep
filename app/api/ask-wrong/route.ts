import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  clampInput,
  estimateTokens,
  peek,
  record,
  reserve,
  userKey,
} from "@/lib/rateLimit";
import { peekUsage, reserveUsage } from "@/lib/rateLimitStore";
import { getAuthedUser } from "@/lib/authGuard";
import { getPlan, planToRateTier } from "@/lib/userPlan";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { recordAiHistory } from "@/lib/aiHistory";
import { aiCost } from "@/lib/aiCost";
import { spendTokens } from "@/lib/spend";

export const runtime = "nodejs";

type ChatTurn = { role: "user" | "assistant"; content: string };

const HISTORY_LIMIT = 10;

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const problem = clampInput(body?.problem);
  const attempt = clampInput(body?.attempt ?? "");
  const answer = clampInput(body?.answer ?? "");
  const explanation = clampInput(body?.explanation ?? "");
  const question = clampInput(body?.question ?? "");
  const rawHistory = Array.isArray(body?.history) ? body.history : [];
  const history: ChatTurn[] = rawHistory
    .filter(
      (t: any) =>
        t &&
        (t.role === "user" || t.role === "assistant") &&
        typeof t.content === "string"
    )
    .slice(-HISTORY_LIMIT)
    .map((t: any) => ({ role: t.role, content: clampInput(t.content) }));

  if (!problem || problem.length < 4) {
    return NextResponse.json(
      { error: "Problem text required." },
      { status: 400 }
    );
  }
  if (!question || question.length < 2) {
    return NextResponse.json(
      { error: "Type a question to ask the tutor." },
      { status: 400 }
    );
  }

  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && !user) {
    return NextResponse.json(
      {
        error: "Authentication required",
        message: "Sign in to ask the AI tutor.",
      },
      { status: 401 }
    );
  }

  const userPlan = user ? await getPlan(user.uid) : null;
  const plan = userPlan?.plan ?? "learner";
  const tier = planToRateTier(userPlan);
  const key = userKey(user?.uid, req);
  const r = user ? await reserveUsage(user.uid, tier) : reserve(key, tier);
  if (!r.ok) {
    return NextResponse.json(
      {
        error: "Rate limited",
        limitReached: true,
        message: r.message,
        tokensRemaining: r.tokensRemaining,
        resetMinutes: r.resetMinutes,
      },
      { status: 429 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "AI unavailable",
        message: "The tutor is offline right now.",
      },
      { status: 502 }
    );
  }

  const systemPrompt =
    `You are FinalsPrep AI. The student just got a practice problem wrong and is asking follow-up questions about what they did wrong.\n\n` +
    `The problem, the student's attempt, the correct answer, and the full walkthrough are below. Use them as ground truth. Answer only the student's specific question — do not dump the whole walkthrough unless they ask for it.\n\n` +
    `Rules:\n` +
    `1. Pinpoint the FIRST place their attempt went wrong. Explain why it is wrong in plain English before showing the fix.\n` +
    `2. If the student asks a general "why" question, answer that specifically. Keep it short: 2-5 sentences unless they ask for more.\n` +
    `3. Do not be condescending. They already know they got it wrong.\n` +
    `4. Plain-text notation only: x^2 not $x^2$, sqrt(x) not \\sqrt{x}. No LaTeX.\n` +
    `5. Never reveal the model or provider behind you; you are FinalsPrep AI.`;

  const contextBlock =
    `Problem:\n${problem}\n\n` +
    `Student's attempt:\n${attempt || "(no written attempt)"}\n\n` +
    `Correct answer: ${answer || "(not recorded)"}\n\n` +
    `Reference walkthrough:\n${explanation || "(not recorded)"}`;

  const messages: { role: "user" | "assistant"; content: string }[] = [];
  // Prepend the problem context as the first user turn so model has grounding.
  messages.push({
    role: "user",
    content: `${contextBlock}\n\nI'll ask you follow-up questions about where I went wrong.`,
  });
  messages.push({
    role: "assistant",
    content:
      "Got it. Ask whatever you want — I'll point to the first thing that went sideways and explain why.",
  });
  for (const t of history) messages.push(t);
  messages.push({ role: "user", content: question });

  const client = new Anthropic({ apiKey });
  const model = "claude-sonnet-4-6";
  try {
    const msg = await client.messages.create({
      model,
      max_tokens: 450,
      system: systemPrompt,
      messages,
    });
    const text = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n")
      .trim();

    const inputTokens =
      (msg as any).usage?.input_tokens ?? estimateTokens(contextBlock + question);
    const outputTokens =
      (msg as any).usage?.output_tokens ?? estimateTokens(text);
    const totalTokens = aiCost({ inputTokens, outputTokens, plan });
    if (user?.uid) {
      const split = await spendTokens(user.uid, totalTokens);
      if (split.fromDaily > 0) record(key, split.fromDaily);
      await recordAiHistory({
        uid: user.uid,
        kind: "explain",
        source: "ai",
        plan,
        prompt: `[ask-wrong] ${question}`,
        response: text,
        tokens: totalTokens,
        inputTokens,
        outputTokens,
        model,
        metadata: { wasAttemptProvided: !!attempt },
      });
    } else {
      record(key, totalTokens);
    }

    const p = user ? await peekUsage(user.uid, tier) : peek(key, tier);
    return NextResponse.json({
      reply: text,
      tokens: totalTokens,
      tokensRemaining: p.tokensRemaining,
      messagesRemaining: p.messagesRemaining,
      resetMinutes: p.resetMinutes,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Upstream error" },
      { status: 500 }
    );
  }
}
