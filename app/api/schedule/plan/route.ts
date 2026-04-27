import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import { adminDbOrThrow } from "@/lib/socialAdmin";
import { aiCost } from "@/lib/aiCost";
import { spendTokens } from "@/lib/spend";
import { recordAiHistory } from "@/lib/aiHistory";
import { estimateTokens, LIMITS } from "@/lib/rateLimit";
import { COURSES } from "@/lib/topics";
import { AP_EXAM_DATES, daysUntilExam } from "@/lib/examDates";
import { getPlan, planToRateTier } from "@/lib/userPlan";
import { peekUsage } from "@/lib/rateLimitStore";
import { getTokenBank } from "@/lib/tokenBank";
import { WEEKDAYS } from "@/lib/schedule";
import type { CourseSlug } from "@/lib/topics";

export const runtime = "nodejs";

const MODEL = "claude-haiku-4-5-20251001";

type PlanBlock = {
  day: number;
  startMin: number;
  endMin: number;
  subject: string;
  focus?: string;
};

function jsonError(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

/**
 * POST /api/schedule/plan: generate an AI weekly study plan.
 *
 * Reads the caller's selected courses, exam dates, and recent completion
 * activity, then asks Claude Haiku to return a weekly block schedule as
 * structured JSON. Charged through the usual daily-budget + bonus-bank path.
 */
export async function POST(req: Request) {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return jsonError(500, { error: "Study plan generator not configured." });
  }

  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;

  const userPlan = await getPlan(user.uid);
  const plan = userPlan?.plan ?? "learner";
  const tier = planToRateTier(userPlan);

  const usage = await peekUsage(user.uid, tier);
  const bank = await getTokenBank(user.uid);
  if (usage.tokensRemaining < LIMITS.RESERVE_MIN_TOKENS && bank.balance < LIMITS.RESERVE_MIN_TOKENS) {
    return jsonError(429, {
      error: "Rate limited",
      limitReached: true,
      message: "You're out of tokens. Top up or wait for the daily reset.",
    });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const dailyGoalMinutes: number =
    typeof body?.dailyGoalMinutes === "number" && body.dailyGoalMinutes > 0
      ? Math.min(480, Math.round(body.dailyGoalMinutes))
      : 60;

  const db = adminDbOrThrow();

  // Selected courses
  const prefsSnap = await db
    .collection("users")
    .doc(user.uid)
    .collection("profile")
    .doc("prefs")
    .get();
  const selectedCourses: string[] = Array.isArray((prefsSnap.data() as any)?.selectedCourses)
    ? ((prefsSnap.data() as any).selectedCourses as string[]).filter(
        (s) => typeof s === "string"
      )
    : [];

  if (selectedCourses.length === 0) {
    return jsonError(400, {
      error: "No courses selected. Pick at least one AP course in Study first.",
    });
  }

  // Completion totals per course
  const lessonsSnap = await db
    .collection("users")
    .doc(user.uid)
    .collection("profile")
    .doc("lessons")
    .get();
  const completedSlugs: string[] = Array.isArray(
    (lessonsSnap.data() as any)?.completedSlugs
  )
    ? ((lessonsSnap.data() as any).completedSlugs as string[]).filter(
        (s) => typeof s === "string"
      )
    : [];

  // Wrong-bank counts per course
  const wrongSnap = await db
    .collection("users")
    .doc(user.uid)
    .collection("wrongBank")
    .limit(200)
    .get();
  const wrongByCourse = new Map<string, number>();
  for (const d of wrongSnap.docs) {
    const slug = (d.data() as any)?.courseSlug;
    if (typeof slug === "string") {
      wrongByCourse.set(slug, (wrongByCourse.get(slug) || 0) + 1);
    }
  }

  const coursesContext = selectedCourses.map((slug) => {
    const meta = COURSES.find((c) => c.slug === slug);
    const title = meta?.shortTitle || meta?.title || slug;
    const totalTopics = meta
      ? meta.units.reduce((s, u) => s + (u.topics?.length || 0), 0)
      : 0;
    const prefix = `ced:${slug}:`;
    const doneTopics = completedSlugs.filter((s) => s.startsWith(prefix)).length;
    const pct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;
    const days = daysUntilExam(slug as CourseSlug);
    const examDate = AP_EXAM_DATES[slug as CourseSlug] || "(no date)";
    const wrong = wrongByCourse.get(slug) || 0;
    return { slug, title, doneTopics, totalTopics, pct, days, examDate, wrong };
  });

  // Sort by urgency so the model weighs nearer exams more heavily.
  coursesContext.sort((a, b) => {
    const ad = a.days ?? 9999;
    const bd = b.days ?? 9999;
    return ad - bd;
  });

  const systemPrompt = `You are a study-plan architect for AP exam prep. You return ONLY valid JSON that matches the schema exactly. No prose outside JSON. No markdown.

You design recurring weekly schedules. Each block is 45-90 minutes. Space sessions across 4-6 days/week. Give courses with sooner exam dates and more wrong-bank problems more time.`;

  const userPrompt = `Build a balanced weekly study plan for me. Today is ${new Date().toDateString()}.

My courses (sorted by exam urgency):
${coursesContext
  .map(
    (c) =>
      `- ${c.title} (${c.slug}): exam ${c.examDate}${c.days !== null ? ` (${c.days} days away)` : ""}, ${c.doneTopics}/${c.totalTopics} topics done (${c.pct}%), ${c.wrong} saved review problems`
  )
  .join("\n")}

My daily target: about ${dailyGoalMinutes} minutes.

Return JSON only, matching this exact shape:
{
  "rationale": "2-3 sentence summary of why this plan",
  "blocks": [
    {
      "day": 0,
      "startMin": 1080,
      "endMin": 1140,
      "subject": "AP Calc AB",
      "focus": "Unit 5 review"
    }
  ]
}

Rules for fields:
- day: integer 0-6 (0=Sunday, 6=Saturday)
- startMin / endMin: minutes since midnight (0-1439). Keep blocks between 3pm (900) and 11pm (1380) on weekdays, any time on weekends.
- endMin must be greater than startMin and blocks must be 45-90 minutes long.
- subject: use the course's short title from the list above.
- focus: brief unit-level focus hint (e.g. "Unit 3 practice", "FRQ drill").
- No two blocks should overlap on the same day.
- 5-8 total blocks for the week.

Return the JSON object now.`;

  const client = new Anthropic({ apiKey: anthropicKey });
  let responseText = "";
  let inputTokens = 0;
  let outputTokens = 0;
  try {
    const result = await client.messages.create({
      model: MODEL,
      max_tokens: 1200,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });
    inputTokens = result.usage?.input_tokens || 0;
    outputTokens = result.usage?.output_tokens || 0;
    responseText = result.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("");
  } catch (e: any) {
    return jsonError(502, {
      error: "Could not generate plan",
      message: e?.message || "Upstream error",
    });
  }

  const totalTokens = aiCost({
    inputTokens: inputTokens || estimateTokens(userPrompt),
    outputTokens: outputTokens || estimateTokens(responseText),
    plan,
  });
  await spendTokens(user.uid, totalTokens);
  await recordAiHistory({
    uid: user.uid,
    kind: "schedule_plan",
    source: "ai",
    plan,
    prompt: userPrompt.slice(0, 1000),
    response: responseText.slice(0, 2000),
    tokens: totalTokens,
    inputTokens: inputTokens || estimateTokens(userPrompt),
    outputTokens: outputTokens || estimateTokens(responseText),
    model: MODEL,
    metadata: { courses: selectedCourses.length },
  });

  // Parse the response as JSON. Tolerate stray backticks or prose.
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return jsonError(502, {
      error: "AI response was not valid JSON",
      message: "Try again.",
    });
  }
  let parsed: any;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch {
    return jsonError(502, {
      error: "AI response was not valid JSON",
      message: "Try again.",
    });
  }

  const rawBlocks: any[] = Array.isArray(parsed?.blocks) ? parsed.blocks : [];
  const blocks: PlanBlock[] = [];
  for (const b of rawBlocks) {
    const day = Number(b?.day);
    const startMin = Number(b?.startMin);
    const endMin = Number(b?.endMin);
    const subject = typeof b?.subject === "string" ? b.subject.trim() : "";
    const focus = typeof b?.focus === "string" ? b.focus.trim().slice(0, 80) : undefined;
    if (
      Number.isInteger(day) &&
      day >= 0 &&
      day <= 6 &&
      Number.isFinite(startMin) &&
      Number.isFinite(endMin) &&
      startMin >= 0 &&
      endMin > startMin &&
      endMin <= 1440 &&
      subject.length > 0
    ) {
      blocks.push({
        day,
        startMin: Math.round(startMin),
        endMin: Math.round(endMin),
        subject: subject.slice(0, 40),
        focus,
      });
    }
  }

  if (blocks.length === 0) {
    return jsonError(502, {
      error: "AI response had no valid blocks",
      message: "Try again.",
    });
  }

  const rationale: string =
    typeof parsed?.rationale === "string"
      ? parsed.rationale.slice(0, 400)
      : `Plan covers ${selectedCourses.length} course${selectedCourses.length === 1 ? "" : "s"}.`;

  return NextResponse.json({
    rationale,
    blocks,
    dayLabels: WEEKDAYS.map((w) => w.short),
    tokensCharged: totalTokens,
  });
}
