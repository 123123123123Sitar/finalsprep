import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { getPlan } from "@/lib/userPlan";
import { spendTokens } from "@/lib/spend";
import { estimateTokens } from "@/lib/rateLimit";
import { getFrqById, type PastFrqPart } from "@/lib/pastFrqs";

export const runtime = "nodejs";

/**
 * POST /api/practice/frq/hint
 *
 * Body: { frqId: string, response: string }
 * Returns: { hint: string, tokens: number }
 *
 * Cheap hint endpoint for the FRQ practice surface. Bypasses the standard
 * aiCost() formula: charges a flat 50-token base and scales up by the
 * model's output length, capped at 100. A typical 1-2 sentence hint lands
 * around 60-80 tokens.
 */

const HINT_BASE_TOKENS = 50;
const HINT_MAX_TOKENS = 100;

function hintCost(outputTokens: number): number {
  const scaled = HINT_BASE_TOKENS + Math.round(outputTokens * 0.4);
  return Math.max(HINT_BASE_TOKENS, Math.min(HINT_MAX_TOKENS, scaled));
}

function buildSystem(): string {
  return `You are an AP tutor coaching a student through a free-response question. They are mid-attempt and want a hint. Give exactly ONE short, focused hint that nudges them toward the next idea — never the full answer.

Hard rules:
- 1–2 sentences. No preamble like "Sure!" or "Great question". No headers. No bullets.
- Do NOT reveal the final numeric answer, the rubric criteria, or quote the rubric.
- Look at what the student has written so far. If they're on the wrong track, point at the misstep ("you set up dV/dt with the wrong sign — the volume is decreasing"). If they haven't started a part, name the technique ("This part wants the average value formula") without working it out.
- Prefer naming the concept/technique over giving algebra. The student should still have to do the work.
- LaTeX inline math is fine ($x^2$); avoid display math.`;
}

function buildUserPrompt(
  frq: ReturnType<typeof getFrqById>,
  response: string
): string {
  if (!frq) return "";
  const partsBlock = frq.parts
    .map((p: PastFrqPart) => `${p.label} (${p.points} pt): ${p.prompt}`)
    .join("\n\n");
  const trimmedResponse = response.trim() || "(student hasn't written anything yet)";
  return `FRQ context:\n${frq.prompt || "(no shared setup)"}\n\nParts:\n${partsBlock}\n\nStudent's response so far:\n${trimmedResponse}\n\nGive one short hint.`;
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
  const response = typeof body?.response === "string" ? body.response : "";
  if (!frqId) return NextResponse.json({ error: "frqId required" }, { status: 400 });
  if (response.length > 12000) {
    return NextResponse.json({ error: "Response too long (12,000 char max)." }, { status: 400 });
  }

  const frq = getFrqById(frqId);
  if (!frq) return NextResponse.json({ error: "Unknown FRQ" }, { status: 404 });

  const userPlan = user ? await getPlan(user.uid) : null;
  const plan = userPlan?.plan ?? "learner";
  if (plan !== "hacker") {
    return NextResponse.json(
      {
        error: "Hacker plan required",
        message: "Past-FRQ hints are a Hacker plan perk.",
      },
      { status: 403 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY missing" }, { status: 500 });
  }

  const systemPrompt = buildSystem();
  const userPrompt = buildUserPrompt(frq, response);

  let hint = "";
  let outputTokens = 0;
  try {
    const client = new Anthropic({ apiKey });
    const res = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });
    hint = res.content
      .map((c) => (c.type === "text" ? c.text : ""))
      .join("")
      .trim();
    outputTokens = (res as any).usage?.output_tokens ?? estimateTokens(hint);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Hint request failed" },
      { status: 500 }
    );
  }

  if (!hint) {
    return NextResponse.json({ error: "Empty hint" }, { status: 502 });
  }

  const tokens = hintCost(outputTokens);
  if (user?.uid) {
    await spendTokens(user.uid, tokens);
  }

  return NextResponse.json({ hint, tokens });
}
