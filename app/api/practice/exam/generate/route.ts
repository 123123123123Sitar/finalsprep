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
import { COURSES, type CourseSlug } from "@/lib/topics";
import { AP_EXAM_SPECS } from "@/lib/apExamSpec";

export const runtime = "nodejs";

/**
 * POST /api/practice/exam/generate
 *
 * Body: {
 *   courseSlug: CourseSlug,
 *   mcqCount?: number,     // defaults to official AP MCQ count
 *   frqCount?: number,     // defaults to official AP FRQ count
 *   difficulty?: "easy" | "medium" | "hard"
 * }
 *
 * Returns: {
 *   mcqs: [{ prompt, choices: [{letter, text}], correct, explanation, difficulty, unit }],
 *   frqs: [{ prompt, parts: [{label, prompt, rubric, points}], totalPoints, suggestedMinutes, difficulty, unit }]
 * }
 *
 * Uses Claude Sonnet for better AP fidelity. Charges tokens via spendTokens.
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

function buildSystemPrompt(
  course: { title: string; units: { number: number; title: string }[] },
  mcqCount: number,
  frqCount: number,
  difficulty: Difficulty,
  examTitle: string,
  isHistory: boolean,
  isCsp: boolean,
  isCs: boolean,
  isMathOrScience: boolean,
  frqParts: { label: string; count: number; minutes: number }[],
  mcqSeconds: number
) {
  const unitList = course.units
    .map((u) => `  Unit ${u.number}: ${u.title}`)
    .join("\n");

  const frqSectionGuidance = (() => {
    if (frqCount === 0) return "";
    if (isHistory) {
      return `HISTORY FRQ STRUCTURE
- The ${course.title} free-response section officially consists of:
${frqParts.map((p) => `    • ${p.count}× ${p.label} (${p.minutes} min total)`).join("\n")}
- Distribute the ${frqCount} FRQs you generate across these types proportionally. If the student asked for fewer than the official mix, prioritize SAQs first, then DBQ, then LEQ.
- SAQs must have 3 lettered sub-parts (a)(b)(c), each worth 1 point, each asking for a specific historical example / evidence / explanation. Keep them under 6 sentences of expected response.
- DBQs must reference 5–7 short fictional primary-source documents you invent (give each a label like "Doc A", attribution, and 1–3 sentence excerpt). Rubric must mirror the 7-point DBQ scoring (Thesis, Contextualization, Evidence from Docs, Evidence Beyond Docs, Sourcing, Complexity).
- LEQs must use the 6-point LEQ rubric (Thesis 1, Contextualization 1, Evidence 2, Analysis & Reasoning 2) and target one of: comparison, causation, or continuity/change over time.`;
    }
    const isScienceOrMath =
      /physics|chem|bio|calc|stat|precalc|environ/.test(course.title.toLowerCase());
    return `FRQ STRUCTURE
- Each FRQ should have 2–4 sub-parts labeled (a), (b), (c), (d), escalating in difficulty.
- Each sub-part lists a specific ask AND a per-part point value (1–4 points each).
- Typical College Board FRQ part phrasing: "Calculate…", "Justify your answer…", "Explain, in terms of …", "Describe a procedure that would…", "Draw and label…".
${isScienceOrMath ? "- For math/science FRQs, require the student to show work and state units. When calculators are normally allowed for a part, say so." : ""}
- Rubric text must be scoring criteria a grader can mechanically check, one bullet per earned point, in the form "1 pt: [exact criterion]".
- Total points per FRQ should be realistic (typically 10 pts for AP math/sci FRQs; 4–10 for short, 20+ for AP Chem Q1/Q2). Match the course's actual conventions.
- FRQ prompts may use the same LaTeX + code rendering rules as MCQs.`;
  })();

  const cspNote = isCsp
    ? "\n- AP CSP exam is MCQ-only. If the request asked for FRQs, generate them anyway as AP-CSP-style written-response items (pseudocode tracing, algorithm analysis, data-representation explanations) but note in the prompt that they are supplemental practice, not part of the official exam."
    : "";

  return `You are a senior College Board AP item writer producing a high-fidelity practice exam for ${examTitle}.

Your output will drive a graded student practice test, so every item must be:
- Accurate: no physics typos, no wrong chemistry, no historical errors. If you are not certain a fact is correct, use a different fact.
- On-spec: use the exact content scope of the official Course and Exam Description for this course only. Do not pull in topics from outside the CED.
- Calibrated: match the target difficulty band precisely.
- Self-contained: each item stands alone. No "refer to the previous question" or "see figure above" unless you include the figure inline as ASCII or describe it fully.

TARGET DIFFICULTY
- ${difficultyGuidance(difficulty)}

OFFICIAL CED UNITS (pick from these ONLY; do not invent units)
${unitList}

UNIT WEIGHTING
- Spread items across units to mirror a released AP exam. Slightly over-weight later (higher-numbered) units since they're traditionally heavier on released exams, but every item should be labeled with the exact unit title it targets.
- Do NOT cluster every item in one unit.

MCQ RULES (${mcqCount} items)
- Every MCQ has exactly 4 choices labeled "A", "B", "C", "D".
- Exactly one choice is unambiguously correct. The other three are plausible wrong answers rooted in common student misconceptions (e.g. sign errors, unit errors, misapplied formulas, wrong historical period).
- Stems should be ~2–5 sentences. Use AP stem phrasings: "Which of the following best describes…", "A student claims that… Which statement is correct?", "Based on the table above…".
- Avoid "all of the above" / "none of the above" and negatively-phrased stems unless the official AP style uses them for this course.
- Expected pacing: about ${mcqSeconds}s per MCQ on the real exam, so calibrate the reasoning load accordingly.
- For math/science MCQs, include numeric distractors that reflect specific computational mistakes (off by a factor of 2, wrong sign, forgot to square, etc.), not random numbers.
- The "explanation" field is a 1–3 sentence rationale that cites WHY the correct answer is right AND names the misconception behind the most tempting distractor.

RENDERING — MATH (KaTeX) ${
    isMathOrScience ? "REQUIRED" : "allowed when natural"
  }
- Inline math: wrap in single dollar signs, e.g. $f(x) = 2x^2 - 5x$, $\\theta = \\pi/4$, $\\Delta H = -285 \\text{ kJ}$.
- Display math: wrap in double dollar signs on their own lines: $$\\int_0^\\pi \\sin x\\, dx = 2$$.
- Use real LaTeX commands: \\frac{a}{b}, \\sqrt{x}, x^{2}, x_{n+1}, \\vec{v}, \\hat{i}, \\int, \\sum, \\lim_{x \\to 0}, \\pi, \\theta, \\Delta, \\epsilon_0, \\mu, \\approx, \\leq, \\geq, \\cdot, \\times.
- Units outside math or inside \\text{}. Example: "the block has mass $m = 2.0 \\text{ kg}$".
- Never write LaTeX without delimiters (no bare \\frac in prose).

RENDERING — CODE ${
    isCs ? "REQUIRED for any code" : "only if directly relevant"
  }
- Inline code (identifiers, method names, single expressions): wrap in backticks, e.g. \`ArrayList<Integer>\`, \`numbers[0]\`, \`while (i < n)\`, \`public static int sum(int[] a)\`.
- Multi-line code: use fenced blocks with a language tag on its own line. ${
    isCsp
      ? "AP CSP uses College Board pseudocode — tag fences with pseudocode, e.g. ```pseudocode … ```. Use the CED operators (DISPLAY, INPUT, PROCEDURE, REPEAT n TIMES, IF/ELSE, ← for assignment)."
      : isCs
      ? "AP CS A is Java — tag fences with java, e.g. ```java\\nfor (int i = 0; i < n; i++) { … }\\n```."
      : "Use the language tag java, python, or pseudocode as appropriate."
  }
- Always escape JSON correctly: newlines inside the code block are written as \\n, backticks are literal (no extra escaping needed inside strings since backticks aren't JSON-special).
- Prefer inline \`code\` for single identifiers. Reserve fenced blocks for ≥2 lines of code or when asking students to trace execution.

${frqSectionGuidance}${cspNote}

STRICT OUTPUT FORMAT
Return ONLY a JSON object. No prose, no markdown fences, no commentary before or after.

{
  "mcqs": [
    {
      "prompt": "<stem>",
      "choices": [
        { "letter": "A", "text": "<option>" },
        { "letter": "B", "text": "<option>" },
        { "letter": "C", "text": "<option>" },
        { "letter": "D", "text": "<option>" }
      ],
      "correct": "A" | "B" | "C" | "D",
      "explanation": "<1-3 sentences>",
      "difficulty": "easy" | "medium" | "hard",
      "unit": "<exact unit title from the CED list>"
    }
  ],
  "frqs": [
    {
      "prompt": "<stem / scenario — the context shared by all parts, may be empty string if each part is independent>",
      "parts": [
        { "label": "(a)", "prompt": "<ask>", "rubric": "1 pt: …\\n1 pt: …", "points": <int> }
      ],
      "totalPoints": <sum of part points>,
      "suggestedMinutes": <integer>,
      "difficulty": "easy" | "medium" | "hard",
      "unit": "<exact unit title>"
    }
  ]
}

HARD REQUIREMENTS (violating these means a broken exam):
- Exactly ${mcqCount} MCQs.
- Exactly ${frqCount} FRQs.
- Every MCQ has exactly 4 choices with letters A, B, C, D (in order).
- "correct" MUST be one of the four letters and must match a choice that is genuinely correct.
- Each FRQ's totalPoints equals the sum of its parts' points.
- No duplicate stems across the exam.
- All numeric facts must be correct to 3 significant figures.
- Escape newlines in JSON strings as \\n and backslashes as \\\\ (LaTeX commands therefore look like "\\\\frac{a}{b}" inside JSON).`;
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

function validateMcqs(raw: unknown, expected: number): GeneratedMcq[] | null {
  if (!Array.isArray(raw)) return null;
  const out: GeneratedMcq[] = [];
  for (const q of raw) {
    if (!q || typeof q !== "object") continue;
    const prompt = typeof (q as any).prompt === "string" ? (q as any).prompt.trim() : "";
    const rawChoices = (q as any).choices;
    const correct = (q as any).correct;
    const explanation =
      typeof (q as any).explanation === "string" ? (q as any).explanation.trim() : "";
    const difficulty = (q as any).difficulty;
    if (!prompt || !Array.isArray(rawChoices) || rawChoices.length < 2) continue;
    const choices: McqChoice[] = [];
    for (let i = 0; i < Math.min(4, rawChoices.length); i++) {
      const c = rawChoices[i];
      const text = typeof c?.text === "string" ? c.text.trim() : "";
      if (!text) continue;
      choices.push({ letter: LETTERS[i], text });
    }
    if (choices.length < 2) continue;
    const correctLetter = LETTERS.includes(correct) ? correct : "A";
    out.push({
      prompt,
      choices,
      correct: correctLetter,
      explanation,
      difficulty: VALID_DIFFICULTIES.includes(difficulty) ? difficulty : "medium",
      unit: typeof (q as any).unit === "string" ? (q as any).unit : undefined,
    });
  }
  if (expected > 0 && out.length === 0) return null;
  return out.slice(0, expected);
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

  // Defaults come from the official AP exam spec. Clamp to sane bounds.
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

  // Pre-check the token budget so a user with no tokens sees a clear error
  // instead of getting the generated exam and then a confusing "out of
  // tokens" state afterward. We estimate cost conservatively based on a
  // typical response size for this mix.
  if (user?.uid && userPlan) {
    const estimatedOutput = mcqCount * 160 + frqCount * 400;
    const estimatedInput = 1500; // system prompt is sizable
    const estimatedCost = aiCost({
      inputTokens: estimatedInput,
      outputTokens: estimatedOutput,
      plan,
    });
    const tier = planToRateTier(userPlan);
    const [usage, bank] = await Promise.all([
      peekUsage(user.uid, tier),
      getTokenBank(user.uid),
    ]);
    const available = Math.max(0, usage.tokensRemaining) + Math.max(0, bank.balance);
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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY missing" }, { status: 500 });
  }

  const isHistory = /history/i.test(course.title);
  const isCsp = courseSlug === "ap-cs-principles";
  const isCs = courseSlug === "ap-cs-a" || isCsp;
  const isMathOrScience =
    /precalc|calc|stat|physics|chem|bio|environ/i.test(courseSlug);
  const systemPrompt = buildSystemPrompt(
    course,
    mcqCount,
    frqCount,
    difficulty,
    spec.title,
    isHistory,
    isCsp,
    isCs,
    isMathOrScience,
    spec.frq.parts,
    spec.mcq.secondsPerQuestion
  );
  const userPrompt = `Generate the ${spec.title} practice exam now: ${mcqCount} MCQs and ${frqCount} FRQs at "${difficulty}" difficulty. Begin JSON output immediately.`;

  // Size the response ceiling based on what we're actually asking for.
  const maxTokens = Math.min(16000, 2000 + mcqCount * 220 + frqCount * 700);

  let rawText = "";
  let inputTokens = 0;
  let outputTokens = 0;
  try {
    const client = new Anthropic({ apiKey });
    const res = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
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
  // call ran; the user got the work). This is the ONE required deduction.
  let charged = 0;
  if (user?.uid) {
    const cost = aiCost({ inputTokens, outputTokens, plan });
    const result = await spendTokens(user.uid, cost);
    charged = result.charged;
  }

  const parsed = extractJson(rawText);
  if (!parsed) {
    return NextResponse.json(
      {
        error: "Model returned unparseable output. Try again.",
        raw: rawText.slice(0, 500),
        tokensCharged: charged,
      },
      { status: 502 }
    );
  }

  const mcqs = validateMcqs(parsed.mcqs ?? [], mcqCount);
  const frqs = validateFrqs(parsed.frqs ?? [], frqCount);
  if (mcqs === null || frqs === null) {
    return NextResponse.json(
      {
        error: "Model returned no usable questions. Try again.",
        raw: rawText.slice(0, 500),
        tokensCharged: charged,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    courseSlug,
    courseTitle: course.title,
    difficulty,
    mcqs,
    frqs,
    tokensCharged: charged,
  });
}
