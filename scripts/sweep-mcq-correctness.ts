/**
 * scripts/sweep-mcq-correctness.ts
 *
 * Run every MCQ through a small model and flag any where the model's
 * chosen answer disagrees with the MCQ's `correctIndex`. Writes a
 * JSONL findings file. Does NOT modify the MCQ bank; human review.
 *
 * Usage:
 *   source .env.vercel
 *   npx tsx scripts/sweep-mcq-correctness.ts [course-slug]
 *
 * If no course-slug is given, sweeps all 11 courses. Otherwise only
 * the named course (e.g. ap-physics-c-mech).
 *
 * Cost: Haiku at ~$0.50/course, ~$5 for the full bank. Resumable: if
 * a findings file already exists, skips MCQs that have already been
 * graded. Failures (timeouts, 429s) are retried up to 4 times.
 *
 * IMPORTANT: This is a suspect-flagger, not a fixer. A mismatch means
 * "the model thinks correctIndex is wrong" — could be a real bug, or
 * the model misread the question. Every flag needs a human to verify.
 */

import Anthropic from "@anthropic-ai/sdk";
import { existsSync, readFileSync } from "node:fs";
import { promises as fs, appendFileSync } from "node:fs";
import path from "node:path";

// Load env from .env.vercel / .env.local.
(() => {
  for (const file of [".env.vercel", ".env.local"]) {
    const p = path.resolve(file);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 0) continue;
      const k = trimmed.slice(0, eq).trim();
      let v = trimmed.slice(eq + 1).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      if (!(k in process.env)) process.env[k] = v;
    }
  }
})();

import { AP_BIOLOGY_MCQS } from "../lib/mcqs/ap-biology";
import { AP_CHEMISTRY_MCQS } from "../lib/mcqs/ap-chemistry";
import { AP_ENVIRONMENTAL_MCQS } from "../lib/mcqs/ap-environmental";
import { AP_STATISTICS_MCQS } from "../lib/mcqs/ap-statistics";
import { AP_PHYSICS_C_MECH_MCQS } from "../lib/mcqs/ap-physics-c-mech";
import { AP_PHYSICS_C_EM_MCQS } from "../lib/mcqs/ap-physics-c-em";
import { AP_CS_A_MCQS } from "../lib/mcqs/ap-cs-a";
import { AP_CS_PRINCIPLES_MCQS } from "../lib/mcqs/ap-cs-principles";
import { AP_US_HISTORY_MCQS } from "../lib/mcqs/ap-us-history";
import { AP_WORLD_HISTORY_MCQS } from "../lib/mcqs/ap-world-history";
import { AP_EURO_HISTORY_MCQS } from "../lib/mcqs/ap-euro-history";
import type { LessonMcqs, Mcq } from "../lib/mcqs/types";

const COURSES: Record<string, LessonMcqs[]> = {
  "ap-biology": AP_BIOLOGY_MCQS,
  "ap-chemistry": AP_CHEMISTRY_MCQS,
  "ap-environmental": AP_ENVIRONMENTAL_MCQS,
  "ap-statistics": AP_STATISTICS_MCQS,
  "ap-physics-c-mech": AP_PHYSICS_C_MECH_MCQS,
  "ap-physics-c-em": AP_PHYSICS_C_EM_MCQS,
  "ap-cs-a": AP_CS_A_MCQS,
  "ap-cs-principles": AP_CS_PRINCIPLES_MCQS,
  "ap-us-history": AP_US_HISTORY_MCQS,
  "ap-world-history": AP_WORLD_HISTORY_MCQS,
  "ap-euro-history": AP_EURO_HISTORY_MCQS,
};

const LETTERS = ["A", "B", "C", "D"] as const;

type Grade = {
  course: string;
  lessonSlug: string;
  qId: string;
  correctIndex: number;
  modelAnswer: string | null;
  modelIndex: number | null;
  mismatch: boolean;
  rationale: string;
};

function buildPrompt(q: Mcq): string {
  return `You are verifying a multiple-choice question from an AP-level study app. Your job: pick the single correct answer.

Work through the problem carefully. If there's arithmetic, do it. If there's a concept, recall the definition. Then state your final answer as one letter A, B, C, or D on its own line, preceded by "ANSWER:". After that line, give one short sentence explaining why.

Question: ${q.question}

A. ${q.options[0]}
B. ${q.options[1]}
C. ${q.options[2]}
D. ${q.options[3]}`;
}

function parseAnswer(text: string): { letter: string | null; rationale: string } {
  const m = text.match(/ANSWER\s*:\s*([A-D])/i);
  const letter = m ? m[1].toUpperCase() : null;
  // First line after ANSWER:
  const after = text.slice(text.toUpperCase().indexOf("ANSWER:") + 7);
  const rationale = after.replace(/^\s*[A-D]\.?\s*/i, "").trim().split(/\n/)[0] || "";
  return { letter, rationale: rationale.slice(0, 240) };
}

async function gradeOne(
  client: Anthropic,
  course: string,
  lessonSlug: string,
  q: Mcq
): Promise<Grade> {
  const prompt = buildPrompt(q);
  let lastErr: unknown;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        temperature: 0,
        system:
          "Answer multiple-choice questions with precise arithmetic. Output 'ANSWER: <letter>' then one sentence.",
        messages: [{ role: "user", content: prompt }],
      });
      const text = res.content
        .map((c) => (c.type === "text" ? c.text : ""))
        .join("");
      const { letter, rationale } = parseAnswer(text);
      const modelIndex =
        letter && LETTERS.includes(letter as any)
          ? (LETTERS as readonly string[]).indexOf(letter)
          : null;
      return {
        course,
        lessonSlug,
        qId: q.id,
        correctIndex: q.correctIndex,
        modelAnswer: letter,
        modelIndex,
        mismatch: modelIndex !== null && modelIndex !== q.correctIndex,
        rationale,
      };
    } catch (e: any) {
      lastErr = e;
      const msg = e?.message || String(e);
      if (/429|rate|overload/i.test(msg)) {
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
        continue;
      }
      await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
    }
  }
  console.error(`[${course}/${lessonSlug}/${q.id}] gave up:`, lastErr);
  return {
    course,
    lessonSlug,
    qId: q.id,
    correctIndex: q.correctIndex,
    modelAnswer: null,
    modelIndex: null,
    mismatch: false,
    rationale: `ERROR: ${(lastErr as Error)?.message || "unknown"}`,
  };
}

async function runPool<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T, idx: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const runners = Array.from({ length: concurrency }, async () => {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await worker(items[i], i);
    }
  });
  await Promise.all(runners);
  return results;
}

function loadProcessed(outPath: string): Set<string> {
  if (!existsSync(outPath)) return new Set();
  const seen = new Set<string>();
  for (const line of readFileSync(outPath, "utf8").split(/\r?\n/)) {
    if (!line.trim()) continue;
    try {
      const row = JSON.parse(line);
      seen.add(`${row.course}|${row.lessonSlug}|${row.qId}`);
    } catch {
      /* ignore corrupt lines */
    }
  }
  return seen;
}

async function main() {
  const only = process.argv[2] || null;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY not set.");
    process.exit(1);
  }
  const client = new Anthropic({ apiKey });

  const outPath = path.resolve("mcq-sweep-findings.jsonl");
  const seen = loadProcessed(outPath);
  console.log(`Resuming — ${seen.size} MCQs already graded.`);

  const targets: Array<{ course: string; lessonSlug: string; q: Mcq }> = [];
  for (const [course, bank] of Object.entries(COURSES)) {
    if (only && course !== only) continue;
    for (const lesson of bank) {
      for (const q of lesson.mcqs) {
        const key = `${course}|${lesson.lessonSlug}|${q.id}`;
        if (seen.has(key)) continue;
        targets.push({ course, lessonSlug: lesson.lessonSlug, q });
      }
    }
  }
  console.log(`Grading ${targets.length} MCQs at concurrency 8…`);

  let done = 0;
  let mismatches = 0;
  await runPool(targets, 8, async (t) => {
    const grade = await gradeOne(client, t.course, t.lessonSlug, t.q);
    appendFileSync(outPath, JSON.stringify(grade) + "\n", "utf8");
    done++;
    if (grade.mismatch) mismatches++;
    if (done % 50 === 0 || grade.mismatch) {
      const flag = grade.mismatch ? ` MISMATCH (model=${grade.modelAnswer}, correct=${LETTERS[grade.correctIndex]})` : "";
      console.log(
        `[${done}/${targets.length}] ${t.course}/${t.lessonSlug}/${t.q.id}${flag}`
      );
    }
    return grade;
  });

  console.log(`Done. ${mismatches} mismatches flagged in ${outPath}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
