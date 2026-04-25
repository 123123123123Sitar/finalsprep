import { NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { getPlan, planToRateTier } from "@/lib/userPlan";
import { spendTokens } from "@/lib/spend";
import { peekUsage } from "@/lib/rateLimitStore";
import { getTokenBank } from "@/lib/tokenBank";
import { COURSES, LESSONS, type CourseSlug } from "@/lib/topics";
import { AP_EXAM_SPECS } from "@/lib/apExamSpec";
import { getCurriculum } from "@/lib/curriculum";
import { loadMcqsFor, selectVariant } from "@/lib/mcqs";
import { frqsForCourse, type PastFrq } from "@/lib/pastFrqs";

export const runtime = "nodejs";

/**
 * POST /api/practice/exam/generate
 *
 * Pure bank lookup, no AI. MCQs are sampled from lib/mcqs weighted by each
 * unit's official College Board examWeight. FRQs are sampled from the
 * curated PAST_FRQS bank in lib/pastFrqs. Tokens are still charged at a
 * flat per-item rate because tokens are the app's internal currency.
 *
 * Pro/Hacker plans only.
 *
 * Body: {
 *   courseSlug: CourseSlug,
 *   mcqCount?: number,
 *   frqCount?: number,
 *   difficulty?: "easy" | "medium" | "hard"
 * }
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

// Hard ceilings: refuse oversized requests even on a Pro account.
const MAX_MCQ = 80;
const MAX_FRQ = 10;

// Flat token cost per item. Tokens are the app's internal currency; we no
// longer pay an AI provider to assemble these exams.
const MCQ_TOKEN_COST_EACH = 50;
const FRQ_TOKEN_COST_EACH = 200;

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function parseWeightMidpoint(examWeight: string): number {
  // "10-17%" → 13.5, "8%" → 8. Fallback to 1 so no unit gets zero weight.
  const nums = examWeight.match(/\d+(\.\d+)?/g);
  if (!nums || nums.length === 0) return 1;
  const parsed = nums
    .map((n) => parseFloat(n))
    .filter((n) => Number.isFinite(n));
  if (parsed.length === 0) return 1;
  const avg = parsed.reduce((s, x) => s + x, 0) / parsed.length;
  return avg > 0 ? avg : 1;
}

async function sampleMcqsFromBank(
  courseSlug: CourseSlug,
  mcqCount: number,
  difficulty: Difficulty
): Promise<GeneratedMcq[]> {
  if (mcqCount <= 0) return [];
  const curriculum = getCurriculum(courseSlug);
  if (!curriculum || curriculum.units.length === 0) return [];

  // Build per-unit pools so we can weight allocation against availability.
  // loadMcqsFor is async (the course bundles are code-split); parallelize
  // per-unit fetches.
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
    const lessonMcqsLists = await Promise.all(
      unitLessons.map((l) => loadMcqsFor(l.slug))
    );
    const mcqs: GeneratedMcq[] = [];
    for (const list of lessonMcqsLists) {
      for (const bankMcq of list) {
        // Pick a random variant each time so two students taking the same
        // exam — or the same student taking it twice — see different
        // numbers on parametric questions.
        const totalVariants = 1 + (bankMcq.variations?.length ?? 0);
        const variantIdx = Math.floor(Math.random() * totalVariants);
        const m = selectVariant(bankMcq, variantIdx);
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

  // Weight-proportional allocation. Parse each unit's examWeight to a
  // midpoint (e.g. "10-17%" → 13.5), distribute mcqCount by weight,
  // remainder goes to the units with the largest fractional shortfall.
  const allocations = curriculum.units.map((u) => {
    const weight = parseWeightMidpoint(u.examWeight);
    const available = byUnit.get(u.unitNumber)?.mcqs.length ?? 0;
    return {
      unitNumber: u.unitNumber,
      weight,
      available,
      allocated: 0,
      exact: 0,
    };
  });
  const totalWeight = allocations.reduce((s, a) => s + a.weight, 0) || 1;
  for (const a of allocations) {
    a.exact = (mcqCount * a.weight) / totalWeight;
    a.allocated = Math.min(a.available, Math.floor(a.exact));
  }
  let remaining =
    mcqCount - allocations.reduce((s, a) => s + a.allocated, 0);
  if (remaining > 0) {
    const byFrac = [...allocations]
      .filter((a) => a.available > a.allocated)
      .sort((a, b) => b.exact - b.allocated - (a.exact - a.allocated));
    let i = 0;
    while (remaining > 0 && byFrac.length > 0) {
      const a = byFrac[i % byFrac.length];
      if (a.allocated < a.available) {
        a.allocated++;
        remaining--;
      }
      i++;
      if (byFrac.every((x) => x.allocated >= x.available)) break;
    }
  }

  // Randomize the pick inside each unit and the final order across units so
  // the same exam settings never produce the same question sequence.
  const picked: GeneratedMcq[] = [];
  for (const a of allocations) {
    if (a.allocated === 0) continue;
    const pool = byUnit.get(a.unitNumber)?.mcqs ?? [];
    const shuffled = shuffle(pool);
    picked.push(...shuffled.slice(0, a.allocated));
  }
  return shuffle(picked);
}

function sampleFrqsFromBank(
  courseSlug: CourseSlug,
  frqCount: number,
  difficulty: Difficulty,
  defaultMinutesPerFrq: number
): GeneratedFrq[] {
  if (frqCount <= 0) return [];
  const pool: PastFrq[] = frqsForCourse(courseSlug);
  if (pool.length === 0) return [];
  const shuffled = shuffle(pool);
  const picked = shuffled.slice(0, Math.min(frqCount, shuffled.length));
  return picked.map((f) => ({
    prompt: f.prompt,
    parts: f.parts.map((p) => ({
      label: p.label,
      prompt: p.prompt,
      rubric: p.rubric,
      points: p.points,
    })),
    totalPoints: f.totalPoints,
    suggestedMinutes: Math.max(1, Math.round(defaultMinutesPerFrq)),
    difficulty,
    unit: f.topic,
  }));
}

export async function POST(req: Request) {
  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && (!user || !user.emailVerified)) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const courseSlug = body?.courseSlug as CourseSlug | undefined;
  if (!courseSlug) {
    return NextResponse.json(
      { error: "courseSlug required" },
      { status: 400 }
    );
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

  const estimatedCost =
    mcqCount * MCQ_TOKEN_COST_EACH + frqCount * FRQ_TOKEN_COST_EACH;

  if (user?.uid && userPlan) {
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
          error: `Not enough tokens. This exam costs ${estimatedCost} tokens and you have ${available} available. Wait for your daily cap to reset or top up your bonus bank.`,
          estimatedCost,
          available,
        },
        { status: 402 }
      );
    }
  }

  const mcqs = await sampleMcqsFromBank(courseSlug, mcqCount, difficulty);
  if (mcqCount > 0 && mcqs.length === 0) {
    return NextResponse.json(
      {
        error:
          "No MCQs available for this course yet. The bank may be still populating.",
      },
      { status: 503 }
    );
  }

  const defaultMinutesPerFrq =
    spec.frq.count > 0 ? spec.frq.minutes / spec.frq.count : 15;
  const frqs = sampleFrqsFromBank(
    courseSlug,
    frqCount,
    difficulty,
    defaultMinutesPerFrq
  );
  if (frqCount > 0 && frqs.length === 0) {
    return NextResponse.json(
      {
        error:
          "No past FRQs on file for this course yet. Try another course or stick to MCQs.",
      },
      { status: 503 }
    );
  }

  // Charge: flat per-item. Charge only for what we actually returned so a
  // course missing some FRQs doesn't overbill.
  let charged = 0;
  if (user?.uid) {
    const cost =
      mcqs.length * MCQ_TOKEN_COST_EACH +
      frqs.length * FRQ_TOKEN_COST_EACH;
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
  });
}
