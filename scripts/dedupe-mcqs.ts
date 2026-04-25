// Remove exact-duplicate questions inside the same lesson and drop IDs
// ending in -corrected / -revised / _revised when they're identical to the
// canonical entry. Leaves the canonical q1..q15 shape intact.
//
// Does NOT attempt to fix the 18 duplicate-option bugs — those need real
// re-authoring. They're listed and left in place for codex to handle.

import { promises as fs } from "node:fs";
import path from "node:path";

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

const COURSES: Array<[string, LessonMcqs[], string, string]> = [
  ["ap-biology", AP_BIOLOGY_MCQS, "ap-biology.ts", "AP_BIOLOGY_MCQS"],
  ["ap-chemistry", AP_CHEMISTRY_MCQS, "ap-chemistry.ts", "AP_CHEMISTRY_MCQS"],
  [
    "ap-environmental",
    AP_ENVIRONMENTAL_MCQS,
    "ap-environmental.ts",
    "AP_ENVIRONMENTAL_MCQS",
  ],
  ["ap-statistics", AP_STATISTICS_MCQS, "ap-statistics.ts", "AP_STATISTICS_MCQS"],
  [
    "ap-physics-c-mech",
    AP_PHYSICS_C_MECH_MCQS,
    "ap-physics-c-mech.ts",
    "AP_PHYSICS_C_MECH_MCQS",
  ],
  [
    "ap-physics-c-em",
    AP_PHYSICS_C_EM_MCQS,
    "ap-physics-c-em.ts",
    "AP_PHYSICS_C_EM_MCQS",
  ],
  ["ap-cs-a", AP_CS_A_MCQS, "ap-cs-a.ts", "AP_CS_A_MCQS"],
  [
    "ap-cs-principles",
    AP_CS_PRINCIPLES_MCQS,
    "ap-cs-principles.ts",
    "AP_CS_PRINCIPLES_MCQS",
  ],
  ["ap-us-history", AP_US_HISTORY_MCQS, "ap-us-history.ts", "AP_US_HISTORY_MCQS"],
  [
    "ap-world-history",
    AP_WORLD_HISTORY_MCQS,
    "ap-world-history.ts",
    "AP_WORLD_HISTORY_MCQS",
  ],
  [
    "ap-euro-history",
    AP_EURO_HISTORY_MCQS,
    "ap-euro-history.ts",
    "AP_EURO_HISTORY_MCQS",
  ],
];

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function escapeTsString(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function serialize(entries: LessonMcqs[], exportName: string): string {
  if (entries.length === 0) {
    return `import type { LessonMcqs } from "./types";\n\nexport const ${exportName}: LessonMcqs[] = [];\n`;
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
  return `import type { LessonMcqs } from "./types";\n\nexport const ${exportName}: LessonMcqs[] = [\n${body},\n];\n`;
}

async function main() {
let totalRemoved = 0;
const perCourseRemovals: Array<[string, number]> = [];

for (const [course, bank, fileName, exportName] of COURSES) {
  let removedInCourse = 0;
  const cleaned: LessonMcqs[] = bank.map((lesson) => {
    const seen = new Map<string, Mcq>();
    const kept: Mcq[] = [];
    for (const q of lesson.mcqs) {
      const key = norm(q.question);
      const existing = seen.get(key);
      if (existing) {
        // Prefer the canonical ID (no -corrected / -revised suffix).
        const existingHasSuffix = /-(corrected|revised)|_revised/i.test(
          existing.id
        );
        const currentHasSuffix = /-(corrected|revised)|_revised/i.test(q.id);
        if (existingHasSuffix && !currentHasSuffix) {
          // Replace: drop the existing and keep the new canonical.
          const idx = kept.findIndex((x) => x.id === existing.id);
          if (idx >= 0) kept[idx] = q;
          seen.set(key, q);
        }
        // Else: drop the current (it's the suffixed dupe, or a later duplicate).
        removedInCourse++;
        continue;
      }
      seen.set(key, q);
      kept.push(q);
    }
    return { lessonSlug: lesson.lessonSlug, mcqs: kept };
  });
  if (removedInCourse > 0) {
    const outPath = path.resolve("lib/mcqs", fileName);
    const content = serialize(cleaned, exportName);
    await fs.writeFile(outPath, content, "utf8");
    totalRemoved += removedInCourse;
    perCourseRemovals.push([course, removedInCourse]);
  }
}

console.log(`Removed ${totalRemoved} duplicate questions in total.`);
for (const [c, n] of perCourseRemovals) {
  console.log(`  ${c}: ${n}`);
}
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
