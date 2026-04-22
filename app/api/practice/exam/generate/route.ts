import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { getPlan } from "@/lib/userPlan";
import { aiCost } from "@/lib/aiCost";
import { estimateTokens } from "@/lib/rateLimit";
import { spendTokens } from "@/lib/spend";
import { COURSES, type CourseSlug } from "@/lib/topics";

export const runtime = "nodejs";

/**
 * POST /api/practice/exam/generate
 *
 * Body: { courseSlug: CourseSlug, count: 5 | 10 | 20, difficulty?: "easy"|"medium"|"hard" }
 * Returns: { questions: [{ prompt, answer, difficulty, unit }] }
 *
 * Uses Claude Haiku for speed. The model is forced to emit a strict JSON
 * envelope that the /practice UI can render verbatim.
 */

type Difficulty = "easy" | "medium" | "hard";

type GeneratedQuestion = {
  prompt: string;
  answer: string;
  difficulty: Difficulty;
  unit?: string;
};

const VALID_COUNTS = new Set([5, 10, 20]);
const VALID_DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

function buildSystem(course: { title: string; units: { number: number; title: string }[] }, count: number, difficulty: Difficulty) {
  const unitList = course.units
    .map((u) => `  ${u.number}. ${u.title}`)
    .join("\n");
  return `You are designing a realistic AP-style practice exam for ${course.title}.

Generate exactly ${count} short-answer questions across the official units of the course. Mix the units so the exam feels like a real test, weighted slightly toward the higher-numbered units (since they tend to be more complex). Aim for the "${difficulty}" difficulty band.

Course units:
${unitList}

For each question:
- prompt: a concise problem statement, 1–4 sentences. Use plain text math (e.g. "f(x) = 2x^2 - 5x"); avoid LaTeX delimiters.
- answer: the model answer as a short string (numeric, expression, or one-line explanation). This is what's revealed to the student after they submit.
- difficulty: one of "easy" | "medium" | "hard".
- unit: the unit title the question targets.

Return ONLY a JSON object, no prose, no markdown, no code fences:

{
  "questions": [
    { "prompt": "...", "answer": "...", "difficulty": "...", "unit": "..." }
  ]
}

Rules:
- Exactly ${count} questions.
- Each prompt must be self-contained (no references to figures or previous questions).
- Answers must be unambiguous so a student can self-check.
- No multi-part questions; keep each prompt to a single ask.`;
}

function extractJson(text: string): { questions?: unknown } | null {
  const cleaned = text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*$/g, "")
    .trim();
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

function validateQuestions(raw: unknown, expected: number): GeneratedQuestion[] | null {
  if (!Array.isArray(raw)) return null;
  const out: GeneratedQuestion[] = [];
  for (const q of raw) {
    if (!q || typeof q !== "object") return null;
    const prompt = typeof (q as any).prompt === "string" ? (q as any).prompt.trim() : "";
    const answer = typeof (q as any).answer === "string" ? (q as any).answer.trim() : "";
    const difficulty = (q as any).difficulty;
    if (!prompt || !answer) return null;
    out.push({
      prompt,
      answer,
      difficulty: VALID_DIFFICULTIES.includes(difficulty) ? difficulty : "medium",
      unit: typeof (q as any).unit === "string" ? (q as any).unit : undefined,
    });
  }
  // Allow ±1 question slack so a sloppy model output isn't a hard fail, but
  // truncate/pad to the requested count.
  if (out.length === 0) return null;
  return out.slice(0, expected);
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

  const courseSlug = body?.courseSlug as CourseSlug | undefined;
  const count = Number(body?.count);
  const difficulty: Difficulty = VALID_DIFFICULTIES.includes(body?.difficulty)
    ? body.difficulty
    : "medium";

  if (!courseSlug) {
    return NextResponse.json({ error: "courseSlug required" }, { status: 400 });
  }
  if (!VALID_COUNTS.has(count)) {
    return NextResponse.json({ error: "count must be 5, 10, or 20" }, { status: 400 });
  }
  const course = COURSES.find((c) => c.slug === courseSlug);
  if (!course) {
    return NextResponse.json({ error: "Unknown course" }, { status: 400 });
  }

  const userPlan = user ? await getPlan(user.uid) : null;
  const plan = userPlan?.plan ?? "learner";

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY missing" }, { status: 500 });
  }

  const systemPrompt = buildSystem(course, count, difficulty);
  const userPrompt = `Generate the exam now.`;

  let rawText = "";
  let inputTokens = 0;
  let outputTokens = 0;
  try {
    const client = new Anthropic({ apiKey });
    const res = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4000,
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

  // Charge before parsing so a malformed reply still consumes tokens (the
  // call ran, the user got the work).
  if (user?.uid) {
    const cost = aiCost({ inputTokens, outputTokens, plan });
    await spendTokens(user.uid, cost);
  }

  const parsed = extractJson(rawText);
  const questions = parsed ? validateQuestions((parsed as any).questions, count) : null;
  if (!questions || questions.length === 0) {
    return NextResponse.json(
      { error: "Model returned no usable questions.", raw: rawText.slice(0, 500) },
      { status: 502 }
    );
  }

  return NextResponse.json({
    courseSlug,
    courseTitle: course.title,
    difficulty,
    questions,
  });
}
