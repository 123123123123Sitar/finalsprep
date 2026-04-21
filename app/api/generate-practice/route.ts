import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { PracticeProblem } from "@/lib/practice/types";
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
import { aiCost } from "@/lib/aiCost";
import { spendTokens } from "@/lib/spend";

export const runtime = "nodejs";

function coerceProblems(raw: unknown): PracticeProblem[] {
  if (!Array.isArray(raw)) return [];
  const out: PracticeProblem[] = [];
  for (const r of raw) {
    if (!r || typeof r !== "object") continue;
    const o = r as Record<string, unknown>;
    const prompt = typeof o.prompt === "string" ? o.prompt.trim() : "";
    const answer = typeof o.answer === "string" ? o.answer.trim() : "";
    const explanation =
      typeof o.explanation === "string" ? o.explanation.trim() : "";
    const hint = typeof o.hint === "string" ? o.hint.trim() : undefined;
    const difficulty =
      o.difficulty === "easy" ||
      o.difficulty === "medium" ||
      o.difficulty === "hard"
        ? o.difficulty
        : "medium";
    if (!prompt || !answer || !explanation) continue;
    out.push({ difficulty, prompt, answer, explanation, hint });
  }
  return out;
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const courseTitle = clampInput(body?.courseTitle ?? "") || "AP course";
  const courseSlug = clampInput(body?.courseSlug ?? "");
  const unitNumberRaw = Number(body?.unitNumber);
  const unitNumber =
    Number.isFinite(unitNumberRaw) && unitNumberRaw > 0 ? unitNumberRaw : 1;
  const countRaw = Number(body?.count);
  const count = Math.max(
    1,
    Math.min(8, Number.isFinite(countRaw) ? Math.round(countRaw) : 4)
  );
  const similarTo = clampInput(body?.similarTo ?? "");

  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && !user) {
    return NextResponse.json(
      {
        error: "Authentication required",
        message: "Sign in to generate practice problems.",
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
      { error: "AI unavailable", message: "API key not configured." },
      { status: 502 }
    );
  }

  const systemPrompt =
    `You write AP-style practice problems. Respond with ONLY a JSON array, ` +
    `no markdown, no prose around it. Each element must have exactly these ` +
    `string fields: difficulty ("easy" | "medium" | "hard"), prompt, hint, ` +
    `answer, explanation. Use plain-text math notation the site's autoLatex ` +
    `pipeline understands: x^2, sqrt(x), (x-h)^2, a_n, pi, theta, sin(x), ` +
    `log_2(x). Write 3–5 sentence explanations. Keep prompts self-contained. ` +
    `Do not repeat any textbook example that's likely already in the user's ` +
    `curriculum — invent fresh scenarios.`;

  const userText = similarTo
    ? `Generate ${count} fresh AP-style practice problems for ${courseTitle}, ` +
      `unit ${unitNumber}, that test the same skill as the problem below but ` +
      `are NOT the same problem. Match the difficulty.\n\nReference problem:\n${similarTo}`
    : `Generate ${count} fresh AP-style practice problems for ${courseTitle}, ` +
      `unit ${unitNumber}. Mix difficulties: about ${Math.max(
        1,
        Math.round(count / 4)
      )} easy, ` +
      `${Math.max(1, Math.round(count / 2))} medium, ` +
      `${Math.max(1, count - Math.round(count / 4) - Math.round(count / 2))} hard.`;

  const client = new Anthropic({ apiKey });
  const model = "claude-sonnet-4-6";
  try {
    const msg = await client.messages.create({
      model,
      max_tokens: 3000,
      system: systemPrompt,
      messages: [{ role: "user", content: userText }],
    });
    const text = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n")
      .trim();

    let problems: PracticeProblem[] = [];
    const match = text.match(/\[[\s\S]*\]/);
    if (match) {
      try {
        problems = coerceProblems(JSON.parse(match[0]));
      } catch {
        // fallthrough
      }
    }
    if (problems.length === 0) {
      return NextResponse.json(
        { error: "Generation failed", message: "Could not parse problems." },
        { status: 502 }
      );
    }

    const inputTokens =
      (msg as any).usage?.input_tokens ?? estimateTokens(userText);
    const outputTokens =
      (msg as any).usage?.output_tokens ?? estimateTokens(text);
    const totalTokens = aiCost({ inputTokens, outputTokens, plan });
    if (user?.uid) {
      const split = await spendTokens(user.uid, totalTokens);
      if (split.fromDaily > 0) record(key, split.fromDaily);
    } else {
      record(key, totalTokens);
    }

    const p = user ? await peekUsage(user.uid, tier) : peek(key, tier);
    return NextResponse.json({
      problems,
      tokens: totalTokens,
      tokensRemaining: p.tokensRemaining,
      courseSlug,
      courseTitle,
      unitNumber,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Upstream error" },
      { status: 500 }
    );
  }
}
