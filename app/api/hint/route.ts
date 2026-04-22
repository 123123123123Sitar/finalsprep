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

const MAX_HINTS = 6;

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const problem = clampInput(body?.problem);
  const answer = clampInput(body?.answer ?? "");
  const explanation = clampInput(body?.explanation ?? "");
  const attempt = clampInput(body?.attempt ?? "");
  const hintIndex = Math.max(0, Math.min(MAX_HINTS, Number(body?.hintIndex ?? 0)));
  const priorHintsRaw = Array.isArray(body?.previousHints) ? body.previousHints : [];
  const previousHints = priorHintsRaw
    .filter((h: unknown) => typeof h === "string")
    .map((h: string) => clampInput(h))
    .slice(0, MAX_HINTS);

  if (!problem || problem.length < 4) {
    return NextResponse.json(
      { error: "Problem text required." },
      { status: 400 }
    );
  }
  if (hintIndex >= MAX_HINTS) {
    return NextResponse.json(
      {
        error: "Hint limit reached",
        message:
          "You've used every hint for this problem. Try the walkthrough or give it your best attempt.",
      },
      { status: 429 }
    );
  }

  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && !user) {
    return NextResponse.json(
      {
        error: "Authentication required",
        message: "Sign in to get AI hints.",
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
        message: "The hint tutor is offline right now. Try the walkthrough.",
      },
      { status: 502 }
    );
  }

  const systemPrompt =
    `You are FinalsPrep AI, a patient tutor. You were trained by a teacher who cares deeply about the student actually learning.\n\n` +
    `You are giving the student ONE progressive hint toward solving the problem. Rules:\n` +
    `1. Give exactly ONE new step of progress, not the whole solution. Prior hints are listed below — build on them, do not repeat them.\n` +
    `2. Never state the final answer, even if asked. If the student is on the final step, tell them "you're one algebraic step away from the answer — finish it" without giving numbers.\n` +
    `3. Keep the hint to 1-3 short sentences. No filler, no "Great question!", no emojis.\n` +
    `4. Plain-text notation only: x^2 not $x^2$, sqrt(x) not \\sqrt{x}. No LaTeX.\n` +
    `5. If the student provided their attempt, point out the FIRST place it went wrong if relevant, then nudge them toward the fix.\n` +
    `6. Never reveal the model or provider behind you; you are FinalsPrep AI.`;

  const priorSection = previousHints.length
    ? `Hints already given (do not repeat):\n${previousHints
        .map((h: string, i: number) => `${i + 1}. ${h}`)
        .join("\n")}\n\n`
    : "";

  const userText =
    `Problem:\n${problem}\n\n` +
    (answer ? `Expected final answer (for your reference only — do NOT reveal it): ${answer}\n\n` : "") +
    (explanation ? `Reference walkthrough (internal):\n${explanation}\n\n` : "") +
    priorSection +
    (attempt ? `Student's current attempt:\n${attempt}\n\n` : "") +
    `This is hint #${hintIndex + 1}. Give exactly the next step of progress. One short paragraph.`;

  const client = new Anthropic({ apiKey });
  const model = "claude-sonnet-4-6";
  try {
    const msg = await client.messages.create({
      model,
      max_tokens: 220,
      system: systemPrompt,
      messages: [{ role: "user", content: userText }],
    });
    const text = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n")
      .trim();

    const inputTokens =
      (msg as any).usage?.input_tokens ?? estimateTokens(userText);
    const outputTokens =
      (msg as any).usage?.output_tokens ?? estimateTokens(text);
    const totalTokens = aiCost({ inputTokens, outputTokens, plan });
    if (user?.uid) {
      const split = await spendTokens(user.uid, totalTokens);
      if (split.fromDaily > 0) record(key, split.fromDaily);
      void recordAiHistory({
        uid: user.uid,
        kind: "explain",
        source: "ai",
        plan,
        prompt: `[hint #${hintIndex + 1}] ${problem}`,
        response: text,
        tokens: totalTokens,
        model,
        metadata: { hintIndex: hintIndex + 1 },
      });
    } else {
      record(key, totalTokens);
    }

    const p = user ? await peekUsage(user.uid, tier) : peek(key, tier);
    return NextResponse.json({
      hint: text,
      hintIndex: hintIndex + 1,
      hintsRemaining: Math.max(0, MAX_HINTS - (hintIndex + 1)),
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
