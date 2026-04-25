// Quick audit over the full bank.
// Flags:
//   - questions with fewer than 4 options
//   - duplicated options within a question
//   - duplicated questions within a lesson
//   - options identical in wording but different labels (no real distractor)
//   - correctIndex out of range
//   - "true/false" or "yes/no" disguised as MCQ

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

type Finding = {
  course: string;
  lessonSlug: string;
  qId: string;
  kind: string;
  detail?: string;
};

const findings: Finding[] = [];
let totalQ = 0;
const kindCounts = new Map<string, number>();

function norm(s: string) {
  // Collapse whitespace only. Do NOT lowercase — genetics questions
  // distinguish "BB" from "bb", and computer-science answers distinguish
  // variable names by case. Lowercasing produces false positives there.
  return s.trim().replace(/\s+/g, " ");
}

for (const [course, bank] of ALL) {
  for (const lesson of bank) {
    const seenQ = new Map<string, string>();
    for (const q of lesson.mcqs) {
      totalQ++;

      if (!Array.isArray(q.options) || q.options.length !== 4) {
        findings.push({
          course,
          lessonSlug: lesson.lessonSlug,
          qId: q.id,
          kind: "wrong-option-count",
          detail: `options.length=${q.options?.length ?? 0}`,
        });
      }

      if (
        typeof q.correctIndex !== "number" ||
        q.correctIndex < 0 ||
        q.correctIndex > 3
      ) {
        findings.push({
          course,
          lessonSlug: lesson.lessonSlug,
          qId: q.id,
          kind: "bad-correct-index",
          detail: `correctIndex=${q.correctIndex}`,
        });
      }

      const normed = (q.options ?? []).map(norm);
      const seenOpt = new Set<string>();
      for (const o of normed) {
        if (!o) continue;
        if (seenOpt.has(o)) {
          findings.push({
            course,
            lessonSlug: lesson.lessonSlug,
            qId: q.id,
            kind: "duplicate-option",
            detail: o.slice(0, 60),
          });
          break;
        }
        seenOpt.add(o);
      }

      // Detect binary (true/false, yes/no) disguised as MCQ.
      const allTF = normed.every((o) =>
        /^(true|false|yes|no|right|wrong)$/.test(o)
      );
      if (allTF && normed.length === 4) {
        findings.push({
          course,
          lessonSlug: lesson.lessonSlug,
          qId: q.id,
          kind: "binary-disguised-as-mcq",
        });
      }

      // Duplicate question within the lesson's 15.
      const qKey = norm(q.question);
      if (seenQ.has(qKey)) {
        findings.push({
          course,
          lessonSlug: lesson.lessonSlug,
          qId: q.id,
          kind: "duplicate-question-in-lesson",
          detail: `same as ${seenQ.get(qKey)}`,
        });
      } else {
        seenQ.set(qKey, q.id);
      }

      // Option equal to question stem.
      for (const o of normed) {
        if (o && o === qKey) {
          findings.push({
            course,
            lessonSlug: lesson.lessonSlug,
            qId: q.id,
            kind: "option-equals-question",
          });
          break;
        }
      }
    }
  }
}

for (const f of findings) {
  kindCounts.set(f.kind, (kindCounts.get(f.kind) || 0) + 1);
}

console.log(`Audited ${totalQ} MCQs across ${ALL.length} courses.`);
console.log(`Findings: ${findings.length}`);
if (kindCounts.size) {
  for (const [kind, n] of kindCounts) {
    console.log(`  ${kind}: ${n}`);
  }
}
console.log("");
if (findings.length === 0) {
  console.log("Clean — every MCQ has 4 options, valid correctIndex, no dup options, no dup questions within a lesson.");
} else {
  console.log("Sample findings (first 20):");
  for (const f of findings.slice(0, 20)) {
    console.log(
      `  ${f.course}/${f.lessonSlug} ${f.qId} → ${f.kind}${f.detail ? ` (${f.detail})` : ""}`
    );
  }
}
