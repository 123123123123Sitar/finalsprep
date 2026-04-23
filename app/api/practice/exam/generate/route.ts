import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { getPlan, planToRateTier } from "@/lib/userPlan";
import { aiCost } from "@/lib/aiCost";
import { estimateTokens } from "@/lib/rateLimit";
import { spendTokens } from "@/lib/spend";
import { peekUsage } from "@/lib/rateLimitStore";
import { getTokenBank } from "@/lib/tokenBank";
import { COURSES, LESSONS, type CourseSlug } from "@/lib/topics";
import { AP_EXAM_SPECS } from "@/lib/apExamSpec";
import { getCurriculum } from "@/lib/curriculum";
import { getMcqsFor } from "@/lib/mcqs";

export const runtime = "nodejs";

/**
 * POST /api/practice/exam/generate
 *
 * Body: {
 *   courseSlug: CourseSlug,
 *   mcqCount?: number,
 *   frqCount?: number,
 *   difficulty?: "easy" | "medium" | "hard"
 * }
 *
 * MCQs are pulled from the static 11,000-question bank in lib/mcqs, weighted
 * by the official College Board unit percentages from lib/curriculum. No AI
 * call; no AI cost to us. Tokens are still charged to the user at a flat
 * per-MCQ rate (MCQ_TOKEN_COST_EACH) because tokens are the app's currency.
 *
 * FRQs still go through Claude (no FRQ bank exists yet) and charge real AI
 * cost on top of the MCQ flat fee.
 */

type Difficulty = "easy" | "medium" | "hard";

type McqChoice = { letter: "A" | "B" | "C" | "D"; text: string };
type GeneratedMcq = {
  prompt: string;
  choices: McqChoice[];
  correct: "A" | "B" | "C" | "D";
  explanation: string;
  difficulty: Difficulty;
  unit?: string;
};

type GeneratedFrqPart = {
  label: string;
  prompt: string;
  rubric: string;
  points: number;
};

type GeneratedFrq = {
  prompt: string;
  parts: GeneratedFrqPart[];
  totalPoints: number;
  suggestedMinutes: number;
  difficulty: Difficulty;
  unit?: string;
};

const VALID_DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
const LETTERS: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];

// Hard ceilings so a malformed client can't ask for a 500-question exam and
// burn the user's daily budget in one call.
const MAX_MCQ = 80;
const MAX_FRQ = 10;

// Flat token charge per MCQ. MCQs come from our static bank, so we don't
// pay an AI provider — this is the internal-currency price that still lets
// the app monetize practice use.
const MCQ_TOKEN_COST_EACH = 50;

function difficultyGuidance(difficulty: Difficulty): string {
  switch (difficulty) {
    case "easy":
      return `"easy" → early-unit recall and direct application. One-step reasoning. Bloom levels: remember / understand.`;
    case "hard":
      return `"hard" → late-unit synthesis, multi-step reasoning, carefully designed distractors drawn from common misconceptions. Bloom levels: analyze / evaluate / create. Should feel like a released exam's hardest MCQs and late-part FRQs.`;
    default:
      return `"medium" → typical mid-exam difficulty. Two-step reasoning, standard AP stem phrasing, distractors from plausible student errors. Bloom level: apply / analyze.`;
  }
}

function buildFrqSystemPrompt(
  course: { title: string; units: { number: number; title: string }[] },
  frqCount: number,
  difficulty: Difficulty,
  examTitle: string,
  isHistory: boolean,
  isCsp: boolean,
  isMathOrScience: boolean,
  frqParts: { label: string; count: number; minutes: number }[]
) {
  const unitList = course.units
    .map((u) => `  Unit ${u.number}: ${u.title}`)
    .join("\n");

  const frqSectionGuidance = (() => {
    if (isHistory) {
      return `HISTORY FRQ STRUCTURE
- The ${course.title} free-response section officially consists of:
${frqParts.map((p) => `    • ${p.count}× ${p.label} (${p.minutes} min total)`).join("\n")}
- Distribute the ${frqCount} FRQs you generate across these types proportionally. If the student asked for fewer than the official mix, prioritize SAQs first, then DBQ, then LEQ.
- SAQs must have 3 lettered sub-parts (a)(b)(c), each worth 1 point, each asking for a specific historical example / evidence / explanation. Keep them under 6 sentences of expected response.
- DBQs must reference 5–7 short fictional primary-source documents you invent (give each a label like "Doc A", attribution, and 1–3 sentence excerpt). Rubric must mirror the 7-point DBQ scoring (Thesis, Contextualization, Evidence from Docs, Evidence Beyond Docs, Sourcing, Complexity).
- LEQs must use the 6-point LEQ rubric (Thesis 1, Contextualization 1, Evidence 2, Analysis & Reasoning 2) and target one of: comparison, causation, or continuity/change over time.`;
    }
    return `FRQ STRUCTURE
- Each FRQ should have 2–4 sub-parts labeled (a), (b), (c), (d), escalating in difficulty.
- Each sub-part lists a specific ask AND a per-part point value (1–4 points each).
- Typical College Board FRQ part phrasing: "Calculate…", "Justify your answer…", "Explain, in terms of …", "Describe a procedure that would…", "Draw and label…".
${isMathOrScience ? "- For math/science FRQs, require the student to show work and state units. When calculators are normally allowed for a part, say so." : ""}
- Rubric text must be scoring criteria a grader can mechanically check, one bullet per earned point, in the form "1 pt: [exact criterion]".
- Total points per FRQ should be realistic (typically 10 pts for AP math/sci FRQs; 4–10 for short, 20+ for AP Chem Q1/Q2). Match the course's actual conventions.
- FRQ prompts may use KaTeX: wrap inline math with $...$ and display math with $$...$$.`;
  })();

  const cspNote = isCsp
    ? "\n- AP CSP exam is MCQ-only. Generate the requested FRQs anyway as AP-CSP-style written-response items (pseudocode tracing, algorithm analysis, data-representation explanations) but note in the prompt that they are supplemental practice, not part of the official exam."
    : "";

  return `You are a senior College Board AP item writer producing free-response questions for ${examTitle}.

Every FRQ must be:
- Accurate: no physics typos, no wrong chemistry, no historical errors.
- On-spec: use the exact content scope of the official Course and Exam Description for this course only.
- Calibrated to the target difficulty.
- Self-contained: stands alone without referring to material outside the FRQ.

TARGET DIFFICULTY
- ${difficultyGuidance(difficulty)}

OFFICIAL CED UNITS (pick from these ONLY; do not invent units)
${unitList}

${frqSectionGuidance}${cspNote}

STRICT OUTPUT FORMAT
Return ONLY a JSON object. No prose, no markdown fences, no commentary before or after.

{
  "frqs": [
    {
      "prompt": "<stem / scenario — may be empty string if each part is independent>",
      "parts": [
        { "label": "(a)", "prompt": "<ask>", "rubric": "1 pt: …\\n1 pt: …", "points": <int> }
      ],
      "totalPoints": <sum of part points>,
      "suggestedMinutes": <integer>,
      "difficulty": "easy" | "medium" | "hard",
      "unit": "<exact unit title from the CED list>"
    }
  ]
}

HARD REQUIREMENTS:
- Exactly ${frqCount} FRQs.
- Each FRQ's totalPoints equals the sum of its parts' points.
- No duplicate stems.
- Escape newlines in JSON strings as \\n and backslashes as \\\\.`;
}

function extractJson(text: string): any | null {
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

function validateFrqs(raw: unknown, expected: number): GeneratedFrq[] | null {
  if (!Array.isArray(raw)) {
    return expected === 0 ? [] : null;
  }
  const out: GeneratedFrq[] = [];
  for (const f of raw) {
    if (!f || typeof f !== "object") continue;
    const prompt = typeof (f as any).prompt === "string" ? (f as any).prompt.trim() : "";
    const rawParts = (f as any).parts;
    if (!Array.isArray(rawParts) || rawParts.length === 0) continue;
    const parts: GeneratedFrqPart[] = [];
    for (const p of rawParts) {
      if (!p || typeof p !== "object") continue;
      const label = typeof p.label === "string" ? p.label.trim() : "";
      const partPrompt = typeof p.prompt === "string" ? p.prompt.trim() : "";
      const rubric = typeof p.rubric === "string" ? p.rubric.trim() : "";
      const points = Math.max(0, Math.round(Number(p.points) || 0));
      if (!label || !partPrompt || !rubric || points === 0) continue;
      parts.push({ label, prompt: partPrompt, rubric, points });
    }
    if (parts.length === 0) continue;
    const totalPoints = parts.reduce((s, p) => s + p.points, 0);
    const suggestedMinutes = Math.max(
      1,
      Math.round(Number((f as any).suggestedMinutes) || 15)
    );
    const difficulty = (f as any).difficulty;
    out.push({
      prompt,
      parts,
      totalPoints,
      suggestedMinutes,
      difficulty: VALID_DIFFICULTIES.includes(difficulty) ? difficulty : "medium",
      unit: typeof (f as any).unit === "string" ? (f as any).unit : undefined,
    });
  }
  if (expected > 0 && out.length === 0) return null;
  return out.slice(0, expected);
}

function parseWeightMidpoint(examWeight: string): number {
  // "10-17%" → 13.5, "8%" → 8. Fallback to 1 so no unit gets zero weight.
  const nums = examWeight.match(/\d+(\.\d+)?/g);
  if (!nums || nums.length === 0) return 1;
  const parsed = nums.map((n) => parseFloat(n)).filter((n) => Number.isFinite(n));
  if (parsed.length === 0) return 1;
  const avg = parsed.reduce((s, x) => s + x, 0) / parsed.length;
  return avg > 0 ? avg : 1;
}

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function sampleMcqsFromBank(
  courseSlug: CourseSlug,
  mcqCount: number,
  difficulty: Difficulty
): GeneratedMcq[] {
  if (mcqCount <= 0) return [];
  const curriculum = getCurriculum(courseSlug);
  if (!curriculum || curriculum.units.length === 0) return [];

  // Enumerate all bank MCQs per unit for this course, keyed by unit number.
  const byUnit = new Map<
    number,
    { unitTitle: string; mcqs: GeneratedMcq[] }
  >();
  for (const u of curriculum.units) {
    const unitLessons = LESSONS.filter((l) =>
      l.courses.some(
        (c) => c.courseSlug === courseSlug && c.unitNumber === u.unitNumber
      )
    );
    const mcqs: GeneratedMcq[] = [];
    for (const lesson of unitLessons) {
      for (const m of getMcqsFor(lesson.slug)) {
        if (m.options.length < 2) continue;
        const choices: McqChoice[] = [];
        for (let i = 0; i < Math.min(4, m.options.length); i++) {
          choices.push({ letter: LETTERS[i], text: m.options[i] });
        }
        const correctIdx = Math.max(0, Math.min(3, m.correctIndex));
        mcqs.push({
          prompt: m.question,
          choices,
          correct: LETTERS[correctIdx],
          explanation: m.explanation,
          difficulty,
          unit: `Unit ${u.unitNumber}: ${u.title}`,
        });
      }
    }
    byUnit.set(u.unitNumber, { unitTitle: u.title, mcqs });
  }

  // Weight-proportional allocation. Parse each unit's examWeight to a midpoint
  // (e.g. "10-17%" → 13.5), then distribute mcqCount by weight; remainder
  // goes to the units with the largest fractional shortfall.
  const allocations = curriculum.units.map((u) => {
    const weight = parseWeightMidpoint(u.examWeight);
    const available = byUnit.get(u.unitNumber)?.mcqs.length ?? 0;
    return { unitNumber: u.unitNumber, weight, available, allocated: 0, exact: 0 };
  });
  const totalWeight = allocations.reduce((s, a) => s + a.weight, 0) || 1;
  for (const a of allocations) {
    a.exact = (mcqCount * a.weight) / totalWeight;
    a.allocated = Math.min(a.available, Math.floor(a.exact));
  }
  // Distribute remainder by largest fractional part, respecting availability.
  let remaining =
    mcqCount - allocations.reduce((s, a) => s + a.allocated, 0);
  if (remaining > 0) {
    const byFrac = [...allocations]
      .filter((a) => a.available > a.allocated)
      .sort(
        (a, b) => b.exact - b.allocated - (a.exact - a.allocated)
      );
    let i = 0;
    while (remaining > 0 && byFrac.length > 0) {
      const a = byFrac[i % byFrac.length];
      if (a.allocated < a.available) {
        a.allocated++;
        remaining--;
      }
      i++;
      // Stop if no unit has capacity left.
      if (byFrac.every((x) => x.allocated >= x.available)) break;
    }
  }

  // Sample each unit's quota randomly from its pool.
  const picked: GeneratedMcq[] = [];
  for (const a of allocations) {
    if (a.allocated === 0) continue;
    const pool = byUnit.get(a.unitNumber)?.mcqs ?? [];
    const shuffled = shuffle(pool);
    picked.push(...shuffled.slice(0, a.allocated));
  }
  return shuffle(picked);
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
  if (!courseSlug) {
    return NextResponse.json({ error: "courseSlug required" }, { status: 400 });
  }
  const course = COURSES.find((c) => c.slug === courseSlug);
  const spec = AP_EXAM_SPECS[courseSlug];
  if (!course || !spec) {
    return NextResponse.json({ error: "Unknown course" }, { status: 400 });
  }

  const rawMcq = body?.mcqCount;
  const rawFrq = body?.frqCount;
  const mcqCount = Math.max(
    0,
    Math.min(MAX_MCQ, Math.round(Number(rawMcq ?? spec.mcq.count) || 0))
  );
  const frqCount = Math.max(
    0,
    Math.min(MAX_FRQ, Math.round(Number(rawFrq ?? spec.frq.count) || 0))
  );
  if (mcqCount + frqCount === 0) {
    return NextResponse.json(
      { error: "Pick at least one MCQ or FRQ." },
      { status: 400 }
    );
  }

  const difficulty: Difficulty = VALID_DIFFICULTIES.includes(body?.difficulty)
    ? body.difficulty
    : "medium";

  const userPlan = user ? await getPlan(user.uid) : null;
  const plan = userPlan?.plan ?? "learner";

  // Pro/Hacker gate. Practice exams are a paid feature.
  if (plan !== "pro" && plan !== "hacker") {
    return NextResponse.json(
      {
        error: "Pro plan required",
        message:
          "Practice exams are a Pro/Hacker feature. Upgrade to unlock full-length, unit-weighted exams drawn from the full question bank.",
      },
      { status: 403 }
    );
  }

  // Pre-check the token budget: MCQ flat fee + conservative FRQ estimate.
  if (user?.uid && userPlan) {
    const estimatedFrqOutput = frqCount * 400;
    const estimatedFrqInput = frqCount > 0 ? 1200 : 0;
    const estimatedFrqCost =
      frqCount > 0
        ? aiCost({
            inputTokens: estimatedFrqInput,
            outputTokens: estimatedFrqOutput,
            plan,
          })
        : 0;
    const estimatedCost = mcqCount * MCQ_TOKEN_COST_EACH + estimatedFrqCost;
    const tier = planToRateTier(userPlan);
    const [usage, bank] = await Promise.all([
      peekUsage(user.uid, tier),
      getTokenBank(user.uid),
    ]);
    const available =
      Math.max(0, usage.tokensRemaining) + Math.max(0, bank.balance);
    if (available < estimatedCost) {
      return NextResponse.json(
        {
          error: `Not enough tokens. This exam is estimated at ~${estimatedCost} tokens and you have ${available} available. Wait for your daily cap to reset or top up your bonus bank.`,
          estimatedCost,
          available,
        },
        { status: 402 }
      );
    }
  }

  // MCQs: pull from the bank, weighted by CED unit percentages. Free. Fast.
  const mcqs = sampleMcqsFromBank(courseSlug, mcqCount, difficulty);
  if (mcqCount > 0 && mcqs.length === 0) {
    return NextResponse.json(
      {
        error:
          "No MCQs available for this course yet. The bank may be still populating.",
      },
      { status: 503 }
    );
  }

  // FRQs: still generated by Claude. No bank for those yet.
  let frqs: GeneratedFrq[] = [];
  let frqInputTokens = 0;
  let frqOutputTokens = 0;
  let frqError: string | null = null;
  if (frqCount > 0) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY missing — required for FRQ generation." },
        { status: 500 }
      );
    }
    const isHistory = /history/i.test(course.title);
    const isCsp = courseSlug === "ap-cs-principles";
    const isMathOrScience =
      /precalc|calc|stat|physics|chem|bio|environ/i.test(courseSlug);
    const systemPrompt = buildFrqSystemPrompt(
      course,
      frqCount,
      difficulty,
      spec.title,
      isHistory,
      isCsp,
      isMathOrScience,
      spec.frq.parts
    );
    const userPrompt = `Generate ${frqCount} FRQs for ${spec.title} at "${difficulty}" difficulty. Begin JSON output immediately.`;
    const maxTokens = Math.min(16000, 1000 + frqCount * 700);
    try {
      const client = new Anthropic({ apiKey });
      const res = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      });
      const rawText = res.content
        .map((c) => (c.type === "text" ? c.text : ""))
        .join("");
      frqInputTokens =
        (res as any).usage?.input_tokens ??
        estimateTokens(systemPrompt + userPrompt);
      frqOutputTokens =
        (res as any).usage?.output_tokens ?? estimateTokens(rawText);
      const parsed = extractJson(rawText);
      const validated = validateFrqs(parsed?.frqs ?? [], frqCount);
      if (validated === null) {
        frqError = "Model returned no usable FRQs.";
      } else {
        frqs = validated;
      }
    } catch (e: any) {
      frqError = e?.message || "FRQ generation failed";
    }
  }

  // Charge: flat MCQ fee + real FRQ AI cost if we called Claude.
  let charged = 0;
  if (user?.uid) {
    const mcqFee = mcqs.length * MCQ_TOKEN_COST_EACH;
    const frqFee =
      frqInputTokens + frqOutputTokens > 0
        ? aiCost({
            inputTokens: frqInputTokens,
            outputTokens: frqOutputTokens,
            plan,
          })
        : 0;
    const cost = mcqFee + frqFee;
    if (cost > 0) {
      const result = await spendTokens(user.uid, cost);
      charged = result.charged;
    }
  }

  return NextResponse.json({
    courseSlug,
    courseTitle: course.title,
    difficulty,
    mcqs,
    frqs,
    tokensCharged: charged,
    ...(frqError ? { frqError } : {}),
  });
}
