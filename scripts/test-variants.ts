// Smoke test for selectVariant + pickQuestionsForAttempt with a
// synthesised parametric MCQ. Asserts that each variant index returns
// the right (question, options, correctIndex, explanation) tuple, and
// that attempt index rotation + variant offset compose correctly.

import { selectVariant, pickQuestionsForAttempt } from "../lib/mcqs";
import type { Mcq } from "../lib/mcqs/types";

const mcq: Mcq = {
  id: "test-q1",
  question: "ORIGINAL",
  options: ["a", "b", "c", "d"],
  correctIndex: 0,
  explanation: "original explanation",
  variations: [
    {
      id: "test-q1",
      question: "VARIATION-1",
      options: ["w", "x", "y", "z"],
      correctIndex: 1,
      explanation: "variation 1 explanation",
    },
    {
      id: "test-q1",
      question: "VARIATION-2",
      options: ["p", "q", "r", "s"],
      correctIndex: 2,
      explanation: "variation 2 explanation",
    },
  ],
};

function assert(cond: unknown, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

// Variant 0 → original.
const v0 = selectVariant(mcq, 0);
assert(v0.question === "ORIGINAL", "variant 0 is original");
assert(v0.correctIndex === 0, "variant 0 correctIndex");

// Variant 1 → first variation.
const v1 = selectVariant(mcq, 1);
assert(v1.question === "VARIATION-1", "variant 1");
assert(v1.correctIndex === 1, "variant 1 correctIndex");
assert(v1.options[1] === "x", "variant 1 options");

// Variant 2 → second variation.
const v2 = selectVariant(mcq, 2);
assert(v2.question === "VARIATION-2", "variant 2");
assert(v2.correctIndex === 2, "variant 2 correctIndex");

// Variant 3 wraps back to original (total = 1 + 2 variations = 3).
const v3 = selectVariant(mcq, 3);
assert(v3.question === "ORIGINAL", "variant 3 wraps to original");

// Variant 4 wraps to VARIATION-1.
const v4 = selectVariant(mcq, 4);
assert(v4.question === "VARIATION-1", "variant 4 wraps to VARIATION-1");

// MCQ with no variations: selectVariant always returns the same Mcq.
const plain: Mcq = {
  id: "plain",
  question: "plain",
  options: ["1", "2", "3", "4"],
  correctIndex: 0,
  explanation: "no variations here",
};
const plainV7 = selectVariant(plain, 7);
assert(plainV7 === plain, "plain Mcq collapses to itself");

// pickQuestionsForAttempt: with a 15-item pool and 4 per attempt,
// attempt 0 takes pool[0..3] at variant offset 0; attempt 3 wraps
// through the pool (variant offset increments once at attempt 4).
const pool: Mcq[] = Array.from({ length: 15 }, (_, i) => ({
  id: `p${i}`,
  question: `POOL-${i}`,
  options: ["a", "b", "c", "d"],
  correctIndex: 0,
  explanation: "",
  variations: [
    {
      id: `p${i}`,
      question: `POOL-${i}-VAR1`,
      options: ["a", "b", "c", "d"],
      correctIndex: 1,
      explanation: "",
    },
  ],
}));

const a0 = pickQuestionsForAttempt(pool, 0);
assert(a0.length === 4, "attempt 0 pulls 4");
assert(a0[0].question === "POOL-0", "attempt 0 starts at index 0");

const a3 = pickQuestionsForAttempt(pool, 3);
// start = (3 * 4) % 15 = 12; variantOffset = Math.floor(12/15) = 0.
assert(a3[0].question === "POOL-12", "attempt 3 starts at pool[12]");
// But question 2 and 3 wrap around to pool[14] then pool[0].
assert(a3[2].question === "POOL-14", "attempt 3 pulls pool[14]");
assert(a3[3].question === "POOL-0", "attempt 3 wraps to pool[0]");

const a4 = pickQuestionsForAttempt(pool, 4);
// start = (4 * 4) % 15 = 1; variantOffset = Math.floor(16/15) = 1.
assert(a4[0].question === "POOL-1-VAR1", "attempt 4 is variant 1 of pool[1]");

console.log("OK — selectVariant + pickQuestionsForAttempt behave as expected.");
