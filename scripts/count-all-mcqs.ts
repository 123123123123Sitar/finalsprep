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

const COURSES = [
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

let grandBase = 0;
let grandVar = 0;
let grandTotal = 0;

console.log("Course".padEnd(22) + "  base    var   total");
console.log("─".repeat(50));
for (const [course, bank] of COURSES) {
  let base = 0;
  let varCount = 0;
  for (const lesson of bank) {
    for (const q of lesson.mcqs) {
      base++;
      if (q.variations) varCount += q.variations.length;
    }
  }
  const total = base + varCount;
  grandBase += base;
  grandVar += varCount;
  grandTotal += total;
  console.log(
    `${course.padEnd(22)}  ${String(base).padStart(4)}  ${String(varCount).padStart(5)}  ${String(total).padStart(5)}`
  );
}
console.log("─".repeat(50));
console.log(
  `${"TOTAL".padEnd(22)}  ${String(grandBase).padStart(4)}  ${String(grandVar).padStart(5)}  ${String(grandTotal).padStart(5)}`
);
