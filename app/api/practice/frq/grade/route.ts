import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { getPlan } from "@/lib/userPlan";
import { aiCost } from "@/lib/aiCost";
import { estimateTokens } from "@/lib/rateLimit";
import { spendTokens } from "@/lib/spend";
import { getFrqById, type PastFrqPart } from "@/lib/pastFrqs";

export const runtime = "nodejs";

/**
 * POST /api/practice/frq/grade
 *
 * Body: { frqId: string, response: string }
 * Returns: {
 *   totalEarned: number,
 *   totalPossible: number,
 *   parts: [{ label, earned, possible, feedback }],
 *   overall: string,  // 1–2 sentence summary
 * }
 *
 * Hands the official rubric to Claude Sonnet (the smarter model — grading
 * needs careful reasoning) and asks for a structured per-part score with
 * justifications.
 */

type GradedPart = {
  label: string;
  earned: number;
  possible: number;
  feedback: string;
};

type GradeResult = {
  totalEarned: number;
  totalPossible: number;
  parts: GradedPart[];
  overall: string;
};

function buildSystem(parts: PastFrqPart[]): string {
  const rubricBlocks = parts
    .map(
      (p) =>
        `Part ${p.label} (${p.points} point${p.points === 1 ? "" : "s"}):\n  Question: ${p.prompt}\n  Rubric criteria:\n${p.rubric
          .split("\n")
          .map((line) => `    ${line.trim()}`)
          .join("\n")}`
    )
    .join("\n\n");

  return `You are an experienced AP exam grader applying the official College Board rubric. Score the student's free-response answer part-by-part.

Apply the rubric strictly:
- Award a point only if the student's work clearly satisfies that specific criterion.
- Do not award points for unsupported answers — show-your-work matters.
- Partial credit is allowed when a criterion is partially satisfied (use 0.5 sparingly).
- "earned" must be between 0 and "possible" inclusive.

Here is the rubric for each part:

${rubricBlocks}

Return ONLY a JSON object — no prose, no markdown, no code fences:

{
  "parts": [
    {
      "label": "(a)",
      "earned": <number>,
      "possible": <number>,
      "feedback": "<2-3 sentence explanation: what they got right, what they missed, and which rubric criterion was/wasn't met>"
    }
  ],
  "overall": "<1-2 sentence summary: strengths and the single most important thing to improve>"
}

The "label" values must match the rubric exactly. Include every part, even if the student didn't address it (give 0 with feedback noting what was missing).`;
}

function extractJson(text: string): any | null {
  const cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*$/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      return JSON.parse(m[0]);
    } catch {
      return null;
    }
  }
}

function validateGraded(
  raw: any,
  expected: PastFrqPart[]
): { parts: GradedPart[]; overall: string } | null {
  if (!raw || !Array.isArray(raw.parts)) return null;
  const out: GradedPart[] = [];
  for (const p of raw.parts) {
    if (!p || typeof p !== "object") return null;
    const label = String(p.label ?? "").trim();
    const expectedPart = expected.find((x) => x.label === label);
    if (!expectedPart) continue;
    const possible = expectedPart.points;
    const earnedRaw = Number(p.earned);
    const earned = Number.isFinite(earnedRaw)
      ? Math.max(0, Math.min(possible, Math.round(earnedRaw * 2) / 2))
      : 0;
    out.push({
      label,
      earned,
      possible,
      feedback: typeof p.feedback === "string" ? p.feedback.trim() : "",
    });
  }
  if (out.length === 0) return null;
  // Backfill any parts the model dropped, with 0 + a generic note.
  for (const ep of expected) {
    if (!out.find((x) => x.label === ep.label)) {
      out.push({
        label: ep.label,
        earned: 0,
        possible: ep.points,
        feedback: "No response addressing this part was found.",
      });
    }
  }
  out.sort(
    (a, b) =>
      expected.findIndex((p) => p.label === a.label) -
      expected.findIndex((p) => p.label === b.label)
  );
  const overall = typeof raw.overall === "string" ? raw.overall.trim() : "";
  return { parts: out, overall };
}

export async function POST(req: Request) {
  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && (!user || !user.emailVerified)) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const frqId = typeof body?.frqId === "string" ? body.frqId : "";
  const response = typeof body?.response === "string" ? body.response.trim() : "";
  if (!frqId) return NextResponse.json({ error: "frqId required" }, { status: 400 });
  if (!response || response.length < 10) {
    return NextResponse.json(
      { error: "Write a longer response before requesting a grade." },
      { status: 400 }
    );
  }
  if (response.length > 12000) {
    return NextResponse.json({ error: "Response too long (12,000 char max)." }, { status: 400 });
  }

  const frq = getFrqById(frqId);
  if (!frq) return NextResponse.json({ error: "Unknown FRQ" }, { status: 404 });

  const userPlan = user ? await getPlan(user.uid) : null;
  const plan = userPlan?.plan ?? "learner";

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY missing" }, { status: 500 });
  }

  const systemPrompt = buildSystem(frq.parts);
  const userPrompt = `FRQ context:\n${frq.prompt}\n\nStudent response:\n${response}`;

  let rawText = "";
  let inputTokens = 0;
  let outputTokens = 0;
  try {
    const client = new Anthropic({ apiKey });
    const res = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });
    rawText = res.content.map((c) => (c.type === "text" ? c.text : "")).join("");
    inputTokens = (res as any).usage?.input_tokens ?? estimateTokens(systemPrompt + userPrompt);
    outputTokens = (res as any).usage?.output_tokens ?? estimateTokens(rawText);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Model request failed" },
      { status: 500 }
    );
  }

  // Sonnet costs the same per-token in our formula but is the right tool for
  // careful rubric application — bill at the standard formula.
  if (user?.uid) {
    const cost = aiCost({ inputTokens, outputTokens, plan });
    await spendTokens(user.uid, cost);
  }

  const parsed = extractJson(rawText);
  const validated = validateGraded(parsed, frq.parts);
  if (!validated) {
    return NextResponse.json(
      { error: "Grader returned an unparseable response.", raw: rawText.slice(0, 500) },
      { status: 502 }
    );
  }

  const totalEarned = validated.parts.reduce((s, p) => s + p.earned, 0);
  const totalPossible = frq.totalPoints;

  const result: GradeResult = {
    totalEarned,
    totalPossible,
    parts: validated.parts,
    overall: validated.overall || "",
  };
  return NextResponse.json(result);
}
