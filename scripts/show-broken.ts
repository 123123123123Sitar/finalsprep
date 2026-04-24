// Print the full content of each of the 12 broken MCQs so I can write
// principled fixes.

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

const ALL = [
  ["ap-biology", AP_BIOLOGY_MCQS],
  ["ap-chemistry", AP_CHEMISTRY_MCQS],
  ["ap-environmental", AP_ENVIRONMENTAL_MCQS],
  ["ap-statistics", AP_STATISTICS_MCQS],
  ["ap-physics-c-mech", AP_PHYSICS_C_MECH_MCQS],
  ["ap-physics-c-em", AP_PHYSICS_C_EM_MCQS],
  ["ap-cs-a", AP_CS_A_MCQS],
  ["ap-cs-principles", AP_CS_PRINCIPLES_MCQS],
  ["ap-us-history", AP_US_HISTORY_MCQS],
  ["ap-world-history", AP_WORLD_HISTORY_MCQS],
  ["ap-euro-history", AP_EURO_HISTORY_MCQS],
] as const;

const targets: Array<[string, string, string]> = [
  ["ap-chemistry", "chem-1-4", "q7"],
  ["ap-chemistry", "chem-3-4", "q7"],
  ["ap-chemistry", "chem-9-3", "q12"],
  ["ap-statistics", "stats-4-5", "q6"],
  ["ap-statistics", "stats-4-5", "q13"],
  ["ap-statistics", "stats-8-6", "q4"],
  ["ap-physics-c-mech", "pcm-1-4", "q6"],
  ["ap-physics-c-mech", "pcm-5-3", "q7"],
  ["ap-physics-c-mech", "pcm-5-3", "q10"],
  ["ap-physics-c-mech", "pcm-5-3", "q12"],
  ["ap-cs-a", "csa-8-2", "q14"],
  ["ap-cs-principles", "csp-3-4", "q8"],
];

for (const [course, slug, id] of targets) {
  const bank = ALL.find(([c]) => c === course)?.[1] ?? [];
  const lesson = bank.find((l) => l.lessonSlug === slug);
  const q = lesson?.mcqs.find((m) => m.id === id);
  console.log("===");
  console.log(`${course}/${slug} ${id}`);
  if (!q) {
    console.log("NOT FOUND");
    continue;
  }
  console.log(`Q: ${q.question}`);
  q.options.forEach((o, i) =>
    console.log(`  ${i === q.correctIndex ? "*" : " "} [${i}] ${o}`)
  );
  console.log(`Explanation: ${q.explanation}`);
}
