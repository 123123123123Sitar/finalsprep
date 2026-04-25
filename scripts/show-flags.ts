// Print full MCQ content for each mismatch in mcq-sweep-findings.jsonl.
// Usage: npx tsx scripts/show-flags.ts [--limit N] [--course slug]

import { readFileSync } from "node:fs";
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

const COURSES: Record<string, any> = {
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

const args = process.argv.slice(2);
let limit = Infinity;
let courseFilter: string | null = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--limit") limit = Number(args[++i]);
  else if (args[i] === "--course") courseFilter = args[++i];
}

const lines = readFileSync("mcq-sweep-findings.jsonl", "utf8")
  .split(/\r?\n/)
  .filter((l) => l.trim());

let shown = 0;
for (const line of lines) {
  const row = JSON.parse(line);
  if (!row.mismatch) continue;
  if (courseFilter && row.course !== courseFilter) continue;
  if (shown >= limit) break;
  const bank = COURSES[row.course] ?? [];
  const lesson = bank.find((l: any) => l.lessonSlug === row.lessonSlug);
  const q = lesson?.mcqs.find((m: any) => m.id === row.qId);
  if (!q) continue;
  shown++;
  const correctLetter = "ABCD"[row.correctIndex];
  console.log(`═══ ${row.course}/${row.lessonSlug} ${row.qId} ═══`);
  console.log(`Q: ${q.question}`);
  q.options.forEach((o: string, i: number) =>
    console.log(
      `  ${i === row.correctIndex ? "✓" : i === row.modelIndex ? "→" : " "} ${"ABCD"[i]}. ${o}`
    )
  );
  console.log(`Book says: ${correctLetter}`);
  console.log(`Model says: ${row.modelAnswer} — ${row.rationale}`);
  console.log(`Explanation: ${q.explanation}`);
  console.log("");
}
console.log(`(${shown} of ${lines.filter(l => JSON.parse(l).mismatch).length} flagged MCQs shown)`);
