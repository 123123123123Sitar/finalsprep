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

type Verdict = "correct" | "partial" | "incorrect";

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
  const imageBase64Raw = typeof body?.imageBase64 === "string" ? body.imageBase64 : "";
  const imageBase64 = imageBase64Raw.replace(/^data:image\/\w+;base64,/, "");
  const hasImage = imageBase64.length > 128;

  if (!problem || (!hasImage && (!attempt || attempt.length < 2))) {
    return NextResponse.json(
      { error: "Problem and either an attempt or image are required." },
      { status: 400 }
    );
  }

  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && !user) {
    return NextResponse.json(
      {
        error: "Authentication required",
        message: "Sign in to use AI grading.",
      },
      { status: 401 }
    );
  }

  const userPlan = user ? await getPlan(user.uid) : null;
  const plan = userPlan?.plan ?? "learner";
  if (plan !== "hacker") {
    return NextResponse.json(
      {
        error: "Hacker plan required",
        message: "AI grading is a Hacker plan perk. Upgrade to unlock.",
      },
      { status: 403 }
    );
  }

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
      { error: "Grader unavailable", message: "AI grader is offline." },
      { status: 502 }
    );
  }

  const systemPrompt =
    `You are an AP exam grader. The student submitted a solution to a practice problem. ` +
    `Respond with ONLY a single JSON object, no markdown, no prose around it. Shape:\n` +
    `{"verdict":"correct|partial|incorrect","score":<number 0..1>,"extracted":"<student's answer as text, if from image>","feedback":"<2-4 sentences>"}\n` +
    `Grade on substance, not form. Accept any valid mathematical form of the right answer. ` +
    `Give specific feedback: what the student got right, what they got wrong, and the next step if partial. ` +
    `Do not reveal the full walkthrough unless the attempt is incorrect.` +
    (hasImage
      ? ` The attached image is a whiteboard snapshot. The student has CIRCLED their final answer; extract ONLY what is inside that circle as the student's answer, ignoring other scratch work. Put what you extracted in the "extracted" field.`
      : "");

  const userText =
    `Problem:\n${problem}\n\n` +
    `Expected answer: ${answer || "(not provided)"}\n\n` +
    `Reference walkthrough:\n${explanation || "(not provided)"}\n\n` +
    `Student's solution:\n${attempt || (hasImage ? "(see attached whiteboard image)" : "(none)")}`;

  const client = new Anthropic({ apiKey });
  const model = "claude-sonnet-4-6";
  try {
    const content: any[] = hasImage
      ? [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/png",
              data: imageBase64,
            },
          },
          { type: "text", text: userText },
        ]
      : [{ type: "text", text: userText }];
    const msg = await client.messages.create({
      model,
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: "user", content }],
    });
    const text = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n")
      .trim();

    let verdict: Verdict = "partial";
    let score = 0.5;
    let feedback = text;
    let extracted = "";
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]);
        if (
          parsed.verdict === "correct" ||
          parsed.verdict === "partial" ||
          parsed.verdict === "incorrect"
        ) {
          verdict = parsed.verdict;
        }
        if (typeof parsed.score === "number") {
          score = Math.max(0, Math.min(1, parsed.score));
        }
        if (typeof parsed.feedback === "string" && parsed.feedback.trim()) {
          feedback = parsed.feedback.trim();
        }
        if (typeof parsed.extracted === "string") {
          extracted = parsed.extracted.trim();
        }
      } catch {
        // Fall back to raw text as feedback.
      }
    }

    const inputTokens =
      (msg as any).usage?.input_tokens ?? estimateTokens(userText);
    const outputTokens =
      (msg as any).usage?.output_tokens ?? estimateTokens(text);
    const totalTokens = aiCost({
      inputTokens,
      outputTokens,
      plan,
      hasImages: hasImage,
    });
    if (user?.uid) {
      const split = await spendTokens(user.uid, totalTokens);
      if (split.fromDaily > 0) record(key, split.fromDaily);
      void recordAiHistory({
        uid: user.uid,
        kind: "grade",
        source: "ai",
        plan,
        prompt: userText,
        response: feedback,
        tokens: totalTokens,
        model,
        metadata: { verdict, score, hasImage },
      });
    } else {
      record(key, totalTokens);
    }

    const p = user ? await peekUsage(user.uid, tier) : peek(key, tier);
    return NextResponse.json({
      verdict,
      score,
      feedback,
      extracted,
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
