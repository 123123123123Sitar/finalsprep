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

const courses = {
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

let totalLessons = 0;
let totalMcqs = 0;
let minSeen = Infinity;
let maxSeen = -Infinity;
const under15: string[] = [];

for (const [course, bank] of Object.entries(courses)) {
  let courseMin = Infinity;
  let courseMax = -Infinity;
  let courseMcqs = 0;
  for (const entry of bank) {
    const n = entry.mcqs.length;
    courseMcqs += n;
    courseMin = Math.min(courseMin, n);
    courseMax = Math.max(courseMax, n);
    if (n < 15) under15.push(`${course}/${entry.lessonSlug}=${n}`);
  }
  totalLessons += bank.length;
  totalMcqs += courseMcqs;
  minSeen = Math.min(minSeen, courseMin);
  maxSeen = Math.max(maxSeen, courseMax);
  console.log(
    `${course.padEnd(22)} lessons=${String(bank.length).padStart(3)}  mcqs=${String(courseMcqs).padStart(5)}  per-lesson min=${courseMin} max=${courseMax}`
  );
}

console.log("");
console.log(`TOTAL lessons=${totalLessons}  mcqs=${totalMcqs}  per-lesson min=${minSeen} max=${maxSeen}`);
if (under15.length === 0) {
  console.log("OK — every lesson has >= 15 MCQs.");
} else {
  console.log(`WARN — ${under15.length} lesson(s) below 15:`);
  for (const s of under15) console.log(`  ${s}`);
}
