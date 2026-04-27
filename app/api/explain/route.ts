import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildTutorSystemPrompt } from "@/lib/systemPrompt";
import { maxOutputTokens, normalizeAiPrefs } from "@/lib/aiPrefs";
import { getStoredAiPrefs } from "@/lib/aiPrefsStore";
import { findWalkthrough } from "@/lib/topics";
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
import { captureException } from "@/lib/observability";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const problem = clampInput(body?.problem);
  if (!problem) {
    return NextResponse.json({ error: "Problem text required." }, { status: 400 });
  }
  if (problem.length < 4) {
    return NextResponse.json(
      { error: "That's too short - paste a real problem." },
      { status: 400 }
    );
  }

  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  const userPlan = user ? await getPlan(user.uid) : null;
  const plan = userPlan?.plan ?? "learner";
  const aiPrefs = user
    ? await getStoredAiPrefs(user.uid)
    : normalizeAiPrefs(body?.aiPrefs);
  const systemPrompt = buildTutorSystemPrompt(aiPrefs);
  const outputTokenLimit = maxOutputTokens("explain", aiPrefs.aiVerbosity);

  // 1. Curated walkthroughs never cost us an API call and are open to
  //    anyone (even anonymous users). Return early.
  const canned = findWalkthrough(problem);
  if (canned) {
    if (user?.uid) {
      void recordAiHistory({
        uid: user.uid,
        kind: "explain",
        source: "curated",
        plan,
        prompt: problem,
        response: canned.sampleWalkthrough,
        tokens: 0,
        model: "curated",
        metadata: { topic: canned.slug },
      });
    }
    return NextResponse.json({
      explanation: canned.sampleWalkthrough,
      source: "curated",
      topic: canned.slug,
    });
  }

  // 2. For arbitrary problems we require a signed-in user when admin SDK
  //    is configured. If it's not configured we fall back to IP-keyed
  //    anonymous access (dev ergonomics only).
  if (adminOn && !user) {
    return NextResponse.json(
      {
        error: "Authentication required",
        message: "Sign in to use the AI tutor on arbitrary problems.",
      },
      { status: 401 }
    );
  }
  if (adminOn && user && !user.emailVerified) {
    return NextResponse.json(
      {
        error: "Email not verified",
        message: "Verify your email first.",
      },
      { status: 403 }
    );
  }

  // 3. Plan lookup.
  const tier = planToRateTier(userPlan);

  // 4. Reserve budget. Authed users go through Firestore so cold starts
  //    don't reset the 24h window; anonymous fall back to the in-memory map.
  const key = userKey(user?.uid, req);
  const r = user ? await reserveUsage(user.uid, tier) : reserve(key, tier);
  if (!r.ok) {
    return NextResponse.json(
      {
        error: "Rate limited",
        limitReached: true,
        message: r.message,
        tokensRemaining: r.tokensRemaining,
        messagesRemaining: r.messagesRemaining,
        resetMinutes: r.resetMinutes,
        plan,
        rateTier: tier,
      },
      { status: 429 }
    );
  }

  // 5. Call Claude.
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = "claude-sonnet-4-6";
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Demo mode",
        message:
          "The AI tutor is running in demo mode. Curated walkthroughs still work. For arbitrary problems, set ANTHROPIC_API_KEY.",
        limitReached: true,
      },
      { status: 402 }
    );
  }

  const client = new Anthropic({ apiKey });
  try {
    const msg = await client.messages.create({
      model,
      max_tokens: outputTokenLimit,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Explain this problem step by step:\n\n${problem}`,
        },
      ],
    });
    const text = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n")
      .trim();

    const inputTokens = (msg as any).usage?.input_tokens ?? estimateTokens(problem);
    const outputTokens = (msg as any).usage?.output_tokens ?? estimateTokens(text);
    const totalTokens = aiCost({ inputTokens, outputTokens, plan });
    if (user?.uid) {
      const split = await spendTokens(user.uid, totalTokens);
      if (split.fromDaily > 0) record(key, split.fromDaily);
      void recordAiHistory({
        uid: user.uid,
        kind: "explain",
        source: "ai",
        plan,
        prompt: problem,
        response: text,
        tokens: totalTokens,
        inputTokens,
        outputTokens,
        model,
        metadata: {
          aiVerbosity: aiPrefs.aiVerbosity,
          aiMode: aiPrefs.aiMode,
          aiPersonality: aiPrefs.aiPersonality,
        },
      });
    } else {
      record(key, totalTokens);
    }

    const p = user ? await peekUsage(user.uid, tier) : peek(key, tier);
    return NextResponse.json({
      explanation: text,
      source: "ai",
      tokensRemaining: p.tokensRemaining,
      messagesRemaining: p.messagesRemaining,
      resetMinutes: p.resetMinutes,
      plan,
      rateTier: tier,
    });
  } catch (e: any) {
    captureException(e, { area: "explain" });
    return NextResponse.json(
      { error: "Explanation service is unavailable. Please try again." },
      { status: 500 }
    );
  }
}
