/**
 * Offline MCQ generation.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/generate-mcqs.ts <course-slug>
 *
 * Reads lessons for the given course, calls Gemini to draft 15 MCQs each
 * (12 primary + 3 swap pool), writes lib/mcqs/<course>.ts. Re-running skips
 * lessons that already have >= 15 MCQs, so the script is resumable.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";
import { promises as fs, readFileSync, existsSync } from "node:fs";
import path from "node:path";

// Minimal .env.local loader (Node 18 lacks --env-file).
(() => {
  const p = path.resolve(".env.local");
  if (!existsSync(p)) return;
  const src = readFileSync(p, "utf8");
  for (const rawLine of src.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const k = line.slice(0, eq).trim();
    let v = line.slice(eq + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (!(k in process.env)) process.env[k] = v;
  }
})();

import type { Lesson } from "../lib/topics";
import { AP_BIOLOGY_LESSONS } from "../lib/lessons/ap-biology";
import { AP_CHEMISTRY_LESSONS } from "../lib/lessons/ap-chemistry";
import { AP_ENVIRONMENTAL_LESSONS } from "../lib/lessons/ap-environmental";
import { AP_STATISTICS_LESSONS } from "../lib/lessons/ap-statistics";
import { AP_PHYSICS_C_MECH_LESSONS } from "../lib/lessons/ap-physics-c-mech";
import { AP_PHYSICS_C_EM_LESSONS } from "../lib/lessons/ap-physics-c-em";
import { AP_CS_A_LESSONS } from "../lib/lessons/ap-cs-a";
import { AP_CS_PRINCIPLES_LESSONS } from "../lib/lessons/ap-cs-principles";
import { AP_US_HISTORY_LESSONS } from "../lib/lessons/ap-us-history";
import { AP_WORLD_HISTORY_LESSONS } from "../lib/lessons/ap-world-history";
import { AP_EURO_HISTORY_LESSONS } from "../lib/lessons/ap-euro-history";

type RawMcq = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type LessonMcqs = {
  lessonSlug: string;
  mcqs: RawMcq[];
};

const TOTAL_PER_LESSON = 15;

const COURSES: Record<
  string,
  { lessons: Lesson[]; fileName: string; exportName: string }
> = {
  "ap-biology": {
    lessons: AP_BIOLOGY_LESSONS,
    fileName: "ap-biology.ts",
    exportName: "AP_BIOLOGY_MCQS",
  },
  "ap-chemistry": {
    lessons: AP_CHEMISTRY_LESSONS,
    fileName: "ap-chemistry.ts",
    exportName: "AP_CHEMISTRY_MCQS",
  },
  "ap-environmental": {
    lessons: AP_ENVIRONMENTAL_LESSONS,
    fileName: "ap-environmental.ts",
    exportName: "AP_ENVIRONMENTAL_MCQS",
  },
  "ap-statistics": {
    lessons: AP_STATISTICS_LESSONS,
    fileName: "ap-statistics.ts",
    exportName: "AP_STATISTICS_MCQS",
  },
  "ap-physics-c-mech": {
    lessons: AP_PHYSICS_C_MECH_LESSONS,
    fileName: "ap-physics-c-mech.ts",
    exportName: "AP_PHYSICS_C_MECH_MCQS",
  },
  "ap-physics-c-em": {
    lessons: AP_PHYSICS_C_EM_LESSONS,
    fileName: "ap-physics-c-em.ts",
    exportName: "AP_PHYSICS_C_EM_MCQS",
  },
  "ap-cs-a": {
    lessons: AP_CS_A_LESSONS,
    fileName: "ap-cs-a.ts",
    exportName: "AP_CS_A_MCQS",
  },
  "ap-cs-principles": {
    lessons: AP_CS_PRINCIPLES_LESSONS,
    fileName: "ap-cs-principles.ts",
    exportName: "AP_CS_PRINCIPLES_MCQS",
  },
  "ap-us-history": {
    lessons: AP_US_HISTORY_LESSONS,
    fileName: "ap-us-history.ts",
    exportName: "AP_US_HISTORY_MCQS",
  },
  "ap-world-history": {
    lessons: AP_WORLD_HISTORY_LESSONS,
    fileName: "ap-world-history.ts",
    exportName: "AP_WORLD_HISTORY_MCQS",
  },
  "ap-euro-history": {
    lessons: AP_EURO_HISTORY_LESSONS,
    fileName: "ap-euro-history.ts",
    exportName: "AP_EURO_HISTORY_MCQS",
  },
};

function buildPrompt(lesson: Lesson): string {
  return `You are writing AP-exam-style multiple-choice questions for a study app.

Lesson title: ${lesson.title}
Blurb: ${lesson.blurb}
Key ideas:
${lesson.keyIdeas.map((k, i) => `  ${i + 1}. ${k}`).join("\n")}
Worked example problem: ${lesson.sampleProblem}
Worked example solution: ${lesson.sampleWalkthrough}

Task: Produce exactly ${TOTAL_PER_LESSON} multiple-choice questions that
test understanding of this lesson. Follow these rules strictly:

- Each question has exactly 4 options labeled 0..3 (the "correctIndex"
  field is the 0-based index of the correct option).
- Questions must be factually correct and unambiguous. Exactly one option
  must be correct; the three distractors must be plausible but clearly
  wrong on careful reading.
- Vary difficulty: about 5 easy recall/definition questions, 6 medium
  application questions, and 4 harder analysis/synthesis questions.
- Questions must be self-contained (do not say "as in the lesson" or "from
  the worked example"). A student who never read this lesson should still
  understand what's being asked.
- Do not repeat wording across questions. Avoid trivially-similar options.
- "explanation" is one or two sentences explaining why the correct option
  is correct. Do not address the student as "you".
- Use plain text. KaTeX is supported for math: wrap math with $...$ or
  $$...$$. Do not use markdown headers, lists, or code fences.
- "id" is a short stable kebab-case identifier unique within this lesson,
  e.g. "q1", "q2", ... "q15".

Respond with ONLY a JSON array of ${TOTAL_PER_LESSON} objects, no prose,
no markdown fences. Each object must have exactly these string/number
fields: id, question, options (array of 4 strings), correctIndex (0-3),
explanation.`;
}

function extractJson(text: string): string {
  let s = text.trim();
  // Strip ```json fences if the model ignored instructions.
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) s = fence[1].trim();
  // Strip leading/trailing backticks if unmatched fence remnants survive.
  s = s.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  // Grab the first top-level JSON array if there's surrounding prose.
  const start = s.indexOf("[");
  const end = s.lastIndexOf("]");
  if (start >= 0 && end > start) {
    s = s.slice(start, end + 1);
  }
  return s;
}

function validateMcqs(raw: unknown, lessonSlug: string): RawMcq[] {
  if (!Array.isArray(raw)) {
    throw new Error(`expected array, got ${typeof raw}`);
  }
  if (raw.length < TOTAL_PER_LESSON) {
    throw new Error(
      `got ${raw.length} mcqs for ${lessonSlug}, need ${TOTAL_PER_LESSON}`
    );
  }
  const seenIds = new Set<string>();
  return raw.slice(0, TOTAL_PER_LESSON).map((m: any, i) => {
    if (typeof m !== "object" || m === null) {
      throw new Error(`entry ${i} is not an object`);
    }
    const {
      id,
      question,
      options,
      correctIndex,
      explanation,
    } = m;
    if (typeof id !== "string" || !id.trim()) {
      throw new Error(`entry ${i} missing id`);
    }
    if (seenIds.has(id)) {
      throw new Error(`entry ${i} duplicate id "${id}"`);
    }
    seenIds.add(id);
    if (typeof question !== "string" || question.trim().length < 5) {
      throw new Error(`entry ${i} bad question`);
    }
    if (
      !Array.isArray(options) ||
      options.length !== 4 ||
      !options.every((o) => typeof o === "string" && o.trim().length > 0)
    ) {
      throw new Error(`entry ${i} options must be 4 non-empty strings`);
    }
    if (
      typeof correctIndex !== "number" ||
      !Number.isInteger(correctIndex) ||
      correctIndex < 0 ||
      correctIndex > 3
    ) {
      throw new Error(`entry ${i} correctIndex must be 0..3`);
    }
    if (typeof explanation !== "string" || explanation.trim().length < 5) {
      throw new Error(`entry ${i} bad explanation`);
    }
    return { id, question, options, correctIndex, explanation };
  });
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

type Generator = (prompt: string) => Promise<string>;

function makeGeminiGenerator(): Generator | null {
  const key =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY;
  if (!key) return null;
  const client = new GoogleGenerativeAI(key);
  const model = client.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 4096,
      responseMimeType: "application/json",
    },
  });
  return async (prompt: string) => {
    const res = await model.generateContent(prompt);
    return res.response.text();
  };
}

function makeClaudeGenerator(): Generator | null {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const client = new Anthropic({ apiKey: key });
  return async (prompt: string) => {
    const res = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      temperature: 0.35,
      system:
        "You respond with only a JSON array. No prose, no markdown fences, no commentary.",
      messages: [{ role: "user", content: prompt }],
    });
    const block = res.content.find((c): c is Anthropic.TextBlock => c.type === "text");
    return block?.text ?? "";
  };
}

async function generateOne(
  gens: Generator[],
  lesson: Lesson
): Promise<RawMcq[]> {
  const prompt = buildPrompt(lesson);
  let lastErr: unknown;
  // Try every provider in order, up to 4 times each (parse/validation
  // errors are often one-off model wobbles; retrying helps).
  for (const gen of gens) {
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const text = await gen(prompt);
        const json = extractJson(text);
        const parsed = JSON.parse(json);
        return validateMcqs(parsed, lesson.slug);
      } catch (e: any) {
        lastErr = e;
        const msg = e?.message || String(e);
        const is429 = /429|quota|rate/i.test(msg);
        // On rate limit, skip to next provider immediately.
        if (is429) break;
        // Small backoff before retrying.
        await sleep(800 * (attempt + 1));
      }
    }
  }
  throw new Error(
    `exhausted retries for ${lesson.slug}: ${
      (lastErr as Error)?.message || lastErr
    }`
  );
}

function escapeTsString(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function formatLessonMcqs(entries: LessonMcqs[], exportName: string): string {
  if (entries.length === 0) {
    return `import type { LessonMcqs } from "./types";

export const ${exportName}: LessonMcqs[] = [];
`;
  }
  const body = entries
    .map((entry) => {
      const mcqLines = entry.mcqs
        .map((m) => {
          const opts = m.options
            .map((o) => `      \`${escapeTsString(o)}\``)
            .join(",\n");
          return `    {
      id: "${m.id}",
      question: \`${escapeTsString(m.question)}\`,
      options: [
${opts},
      ],
      correctIndex: ${m.correctIndex},
      explanation: \`${escapeTsString(m.explanation)}\`,
    }`;
        })
        .join(",\n");
      return `  {
    lessonSlug: "${entry.lessonSlug}",
    mcqs: [
${mcqLines},
    ],
  }`;
    })
    .join(",\n");
  return `import type { LessonMcqs } from "./types";

export const ${exportName}: LessonMcqs[] = [
${body},
];
`;
}

async function loadExisting(filePath: string): Promise<LessonMcqs[]> {
  try {
    const src = await fs.readFile(filePath, "utf8");
    const match = src.match(/=\s*(\[[\s\S]*\]);\s*$/m);
    if (!match) return [];
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return ${match[1]};`);
    const arr = fn();
    if (!Array.isArray(arr)) return [];
    return arr.filter(
      (e): e is LessonMcqs =>
        !!e &&
        typeof e === "object" &&
        typeof (e as any).lessonSlug === "string" &&
        Array.isArray((e as any).mcqs)
    );
  } catch {
    return [];
  }
}

async function main() {
  const courseSlug = process.argv[2];
  if (!courseSlug || !COURSES[courseSlug]) {
    console.error(
      `Usage: tsx scripts/generate-mcqs.ts <course-slug>\nKnown: ${Object.keys(
        COURSES
      ).join(", ")}`
    );
    process.exit(1);
  }
  const { lessons, fileName, exportName } = COURSES[courseSlug];
  const outPath = path.resolve("lib/mcqs", fileName);

  const gens: Generator[] = [];
  const gemini = makeGeminiGenerator();
  if (gemini) gens.push(gemini);
  const claude = makeClaudeGenerator();
  if (claude) gens.push(claude);
  if (gens.length === 0) {
    console.error(
      "No API key found. Set GOOGLE_GENERATIVE_AI_API_KEY and/or ANTHROPIC_API_KEY."
    );
    process.exit(1);
  }
  console.log(
    `[${courseSlug}] providers: ${gens.length === 2 ? "gemini+claude" : gens === gens && gemini ? "gemini" : "claude"}`
  );

  const existing = await loadExisting(outPath);
  const bySlug = new Map<string, RawMcq[]>(
    existing.map((e) => [e.lessonSlug, e.mcqs])
  );

  let generated = 0;
  let skipped = 0;
  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const cached = bySlug.get(lesson.slug);
    if (cached && cached.length >= TOTAL_PER_LESSON) {
      skipped++;
      continue;
    }
    process.stdout.write(
      `[${courseSlug}] ${i + 1}/${lessons.length} ${lesson.slug} ${lesson.title.slice(0, 60)}...`
    );
    try {
      const mcqs = await generateOne(gens, lesson);
      bySlug.set(lesson.slug, mcqs);
      generated++;
      process.stdout.write(" ok\n");
    } catch (e: any) {
      process.stdout.write(` FAILED: ${e?.message || e}\n`);
      // Persist what we have so far and abort so the run is resumable.
      await persist(outPath, exportName, lessons, bySlug);
      process.exit(1);
    }
    // Small delay between lessons to be polite and avoid burst 429s.
    if (i % 5 === 4) await sleep(400);
  }

  await persist(outPath, exportName, lessons, bySlug);
  console.log(
    `[${courseSlug}] done. generated=${generated} skipped=${skipped} total=${lessons.length}`
  );
}

async function persist(
  outPath: string,
  exportName: string,
  lessons: Lesson[],
  bySlug: Map<string, RawMcq[]>
) {
  const ordered: LessonMcqs[] = lessons
    .filter((l) => bySlug.has(l.slug))
    .map((l) => ({ lessonSlug: l.slug, mcqs: bySlug.get(l.slug)! }));
  const content = formatLessonMcqs(ordered, exportName);
  await fs.writeFile(outPath, content, "utf8");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
