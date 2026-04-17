import type { CourseCedLessons } from "./types";

/**
 * AP Calculus BC CED lessons. Mirrors math.ts topic list (~111 topics).
 * Units 1-8 overlap AB content (BC adds 6.11-6.13, 7.5, 7.9, 8.13); Units 9-10 are BC-only.
 */

export const AP_CALC_BC_CED_LESSONS: CourseCedLessons = {
  "1.1": {
    id: "1.1",
    title: "Introducing Calculus: Can Change Occur at an Instant?",
    summary:
      "Calculus begins by asking whether \"instantaneous\" change makes sense. The answer is yes — via limits of average rates of change.",
    lesson:
      "Average speed over an interval is easy: distance divided by time. But what is your speed at a single instant? The denominator would be zero, which is nonsense without a new idea. Calculus handles this by shrinking the interval toward zero and tracking what the average rate does in the limit.\n\nFormally, the instantaneous rate of change of \\(f\\) at \\(x = a\\) is \\(\\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}\\). That limit (when it exists) is the derivative \\(f'(a)\\). Geometrically it is the slope of the tangent line, i.e. the limit of secant slopes as the second point slides toward \\(a\\).\n\nOn the AP, this topic is mostly motivation. You will not compute derivatives from scratch often, but you must be able to say what the derivative represents in context — rate, slope, marginal change — and to relate it to limits of difference quotients. Keep the sentence \"instantaneous rate of change = limit of average rates of change\" in your pocket.",
    keyIdeas: [
      "Average rate over \\([a, a+h]\\) is \\(\\frac{f(a+h)-f(a)}{h}\\).",
      "Instantaneous rate = limit of average rates as \\(h \\to 0\\).",
      "Tangent slope is the geometric image of the derivative.",
      "Change at an instant is only meaningful via limits.",
    ],
    workedExample: {
      prompt:
        "Estimate the instantaneous rate of change of \\(f(x) = x^2\\) at \\(x = 3\\) using \\(h = 0.01\\).",
      solution:
        "\\(\\frac{f(3.01) - f(3)}{0.01} = \\frac{9.0601 - 9}{0.01} = 6.01\\). As \\(h \\to 0\\), this approaches 6, which is the exact instantaneous rate (the tangent slope at 3).",
    },
    flashcards: [
      { q: "Difference quotient at \\(x = a\\)?", a: "\\(\\frac{f(a+h)-f(a)}{h}\\)." },
      { q: "What does taking \\(h \\to 0\\) give you?", a: "The derivative \\(f'(a)\\) — the instantaneous rate of change." },
      { q: "Geometric meaning of \\(f'(a)\\)?", a: "Slope of the tangent line to \\(y = f(x)\\) at \\(x = a\\)." },
    ],
    commonMistakes: [
      "Plugging in \\(h = 0\\) directly — that gives \\(0/0\\).",
      "Saying the derivative is the average rate of change rather than its limit.",
      "Forgetting to mention units when interpreting a rate in context.",
    ],
    quiz: [
      {
        q: "Which expression equals the instantaneous rate of change of \\(f\\) at \\(x = a\\)?",
        choices: [
          "\\(\\frac{f(a+h) - f(a)}{h}\\)",
          "\\(\\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}\\)",
          "\\(\\frac{f(b) - f(a)}{b - a}\\)",
          "\\(f(a) \\cdot h\\)",
        ],
        answerIndex: 1,
        explanation: "By definition, the instantaneous rate is the limit of the difference quotient as \\(h \\to 0\\).",
      },
      {
        q: "Average speed on \\([2, 2+h]\\) approaches 10 as \\(h \\to 0\\). What is the instantaneous speed at \\(t = 2\\)?",
        choices: ["0", "2", "10", "Cannot be determined"],
        answerIndex: 2,
        explanation: "The instantaneous speed is the limit of average speeds, which is 10.",
      },
      {
        q: "Which best describes the tangent line at \\((a, f(a))\\)?",
        choices: [
          "A secant line between two distinct points.",
          "The limiting position of secant lines as the second point slides toward \\(a\\).",
          "A horizontal line through \\((a, f(a))\\).",
          "The x-axis.",
        ],
        answerIndex: 1,
        explanation: "The tangent is obtained as the limit of secant lines as the second point approaches the first.",
      },
      {
        q: "Why can't average rate of change handle an \"instant\"?",
        choices: [
          "It requires two different inputs; at an instant they coincide and \\(\\Delta x = 0\\).",
          "Because averages are always zero at a single point.",
          "Because average rates only work for linear functions.",
          "It only applies when \\(f\\) is continuous.",
        ],
        answerIndex: 0,
        explanation: "Average rate is \\((f(b)-f(a))/(b-a)\\); at one instant \\(a = b\\), dividing by zero. Limits fix this.",
      },
    ],
  },

  "1.2": {
    id: "1.2",
    title: "Defining Limits and Using Limit Notation",
    summary:
      "A limit captures where a function \"heads\" as the input approaches a target, even if the function is undefined or jumps there.",
    lesson:
      "We write \\(\\lim_{x \\to a} f(x) = L\\) to mean \\(f(x)\\) gets arbitrarily close to \\(L\\) whenever \\(x\\) is close enough to \\(a\\) (but \\(x \\ne a\\)). The limit describes the behavior near \\(a\\), not the value at \\(a\\).\n\nOne-sided limits come in two flavors: \\(\\lim_{x \\to a^-} f(x)\\) (from the left) and \\(\\lim_{x \\to a^+} f(x)\\) (from the right). The two-sided limit exists only when both one-sided limits exist and agree.\n\nA limit can fail to exist for three big reasons: (1) a jump (left \\(\\ne\\) right), (2) an oscillation that never settles, or (3) unbounded growth (\\(\\pm\\infty\\) — we still say the limit does not exist in the strict finite sense, even though we may write \\(= \\infty\\) descriptively).\n\nLimit notation shows up constantly on the FRQ — you must write it correctly (arrow, subscript for one-sided, equals sign for the value) to get full credit.",
    keyIdeas: [
      "\\(\\lim_{x \\to a} f(x) = L\\) means \\(f\\) approaches \\(L\\) near \\(a\\); \\(f(a)\\) is irrelevant.",
      "Two-sided limit exists iff both one-sided limits exist and match.",
      "Limits fail via jumps, oscillations, or unbounded behavior.",
      "Notation matters: \\(x \\to a^-\\) vs \\(x \\to a^+\\) vs \\(x \\to a\\).",
    ],
    workedExample: {
      prompt:
        "A piecewise function has \\(f(x) = x + 1\\) for \\(x < 2\\) and \\(f(x) = x^2\\) for \\(x \\ge 2\\). Does \\(\\lim_{x \\to 2} f(x)\\) exist?",
      solution:
        "Left: \\(\\lim_{x \\to 2^-}(x+1) = 3\\). Right: \\(\\lim_{x \\to 2^+}x^2 = 4\\). They disagree, so the two-sided limit does not exist.",
    },
    flashcards: [
      { q: "When does \\(\\lim_{x \\to a} f(x)\\) exist?", a: "When both one-sided limits exist and are equal." },
      { q: "Does \\(f(a)\\) affect \\(\\lim_{x \\to a} f(x)\\)?", a: "No — the limit only depends on behavior near \\(a\\)." },
      { q: "Three ways a limit can fail?", a: "Jump, oscillation, unbounded (\\(\\pm\\infty\\))." },
    ],
    commonMistakes: [
      "Confusing \\(\\lim_{x \\to a} f(x)\\) with \\(f(a)\\).",
      "Writing \\(= \\infty\\) and calling that \"the limit exists\" on an FRQ; AP treats infinite limits as DNE in the finite sense.",
      "Ignoring one-sided limits on piecewise functions.",
    ],
    quiz: [
      {
        q: "If \\(\\lim_{x \\to 3^-} f(x) = 5\\) and \\(\\lim_{x \\to 3^+} f(x) = 7\\), what is \\(\\lim_{x \\to 3} f(x)\\)?",
        choices: ["5", "6", "7", "Does not exist"],
        answerIndex: 3,
        explanation: "Two-sided limit requires matching one-sided limits; 5 \\(\\ne\\) 7, so DNE.",
      },
      {
        q: "\\(\\lim_{x \\to a} f(x) = L\\) does NOT require:",
        choices: [
          "\\(f(x)\\) close to \\(L\\) when \\(x\\) is close to \\(a\\)",
          "\\(f(a) = L\\)",
          "Left and right limits to agree",
          "The approach to work from both sides",
        ],
        answerIndex: 1,
        explanation: "The limit does not depend on the function value at \\(a\\); \\(f(a)\\) can be anything or undefined.",
      },
      {
        q: "Which notation represents the left-hand limit?",
        choices: ["\\(\\lim_{x \\to a^+} f(x)\\)", "\\(\\lim_{x \\to a^-} f(x)\\)", "\\(\\lim_{x \\to a} f(x)\\)", "\\(\\lim_{x \\to \\infty} f(x)\\)"],
        answerIndex: 1,
        explanation: "The minus superscript denotes approach from the left.",
      },
      {
        q: "Which scenario guarantees a two-sided limit does not exist?",
        choices: [
          "\\(f\\) is undefined at \\(a\\)",
          "Left and right one-sided limits disagree",
          "\\(f(a)\\) is defined",
          "\\(f\\) is continuous elsewhere",
        ],
        answerIndex: 1,
        explanation: "Mismatched one-sided limits immediately kill the two-sided limit.",
      },
    ],
  },

  "1.3": {
    id: "1.3",
    title: "Estimating Limit Values from Graphs",
    summary:
      "Reading a graph for a limit means tracing what \\(y\\) approaches as \\(x\\) closes in on the target — from each side separately.",
    lesson:
      "Given a graph, follow the curve from the left and from the right toward \\(x = a\\). The \\(y\\)-values you approach are the one-sided limits. If both arrows land on the same height, that is \\(\\lim_{x \\to a} f(x)\\); if they land on different heights, the two-sided limit DNE.\n\nOpen circles, closed circles, and jumps are the story. An open circle at \\((a, L)\\) with no closed circle elsewhere means \\(f(a)\\) is undefined but \\(\\lim_{x \\to a} f(x) = L\\). A closed circle at a different height means \\(f(a)\\) exists but disagrees with the limit — a removable discontinuity.\n\nFor asymptotes, watch whether the curve shoots to \\(\\pm\\infty\\). Write the infinite limit as \\(\\lim_{x \\to a} f(x) = \\infty\\) or \\(-\\infty\\) — AP accepts this phrasing while still calling the (finite) limit DNE.",
    keyIdeas: [
      "Trace left and right arrows — heights give one-sided limits.",
      "Open circle = undefined; closed circle = defined.",
      "Matching heights from both sides means the two-sided limit exists.",
      "Vertical asymptotes give \\(\\pm\\infty\\) limits.",
    ],
    workedExample: {
      prompt:
        "A graph has an open circle at \\((1, 4)\\), no other dot there, and the curve approaches height 4 from both sides. What is \\(\\lim_{x \\to 1} f(x)\\) and \\(f(1)\\)?",
      solution:
        "\\(\\lim_{x \\to 1} f(x) = 4\\) since both sides approach 4. \\(f(1)\\) is undefined because there is only an open circle, no filled point.",
    },
    flashcards: [
      { q: "What does an open circle at \\((a, L)\\) mean?", a: "\\(f(a)\\) is not equal to \\(L\\) (or undefined); still tells you the limit heads to \\(L\\)." },
      { q: "When reading a graph, how do you decide the two-sided limit exists?", a: "Left and right arrows land at the same height." },
    ],
    commonMistakes: [
      "Reporting \\(f(a)\\) instead of the limit when they disagree.",
      "Assuming closed circles always equal the limit.",
      "Missing vertical asymptote behavior.",
    ],
    quiz: [
      {
        q: "A graph shows a curve approaching \\(y = 2\\) from the left and \\(y = 5\\) from the right of \\(x = 3\\). \\(\\lim_{x \\to 3} f(x)\\) is:",
        choices: ["2", "3.5", "5", "DNE"],
        answerIndex: 3,
        explanation: "One-sided limits disagree, so the two-sided limit does not exist.",
      },
      {
        q: "Open circle at \\((2, 5)\\), closed circle at \\((2, 1)\\). What are \\(\\lim_{x \\to 2} f(x)\\) and \\(f(2)\\)?",
        choices: ["Both 5", "Limit = 5, \\(f(2) = 1\\)", "Limit = 1, \\(f(2) = 5\\)", "Both 1"],
        answerIndex: 1,
        explanation: "The curve approaches 5 (open circle) and is defined at 1 (closed circle); classic removable discontinuity.",
      },
      {
        q: "Vertical asymptote at \\(x = 0\\) with curve shooting to \\(+\\infty\\) from both sides. \\(\\lim_{x \\to 0} f(x)\\) is:",
        choices: ["0", "\\(+\\infty\\)", "\\(-\\infty\\)", "DNE (finite)"],
        answerIndex: 1,
        explanation: "Both sides go to \\(+\\infty\\); AP notation lets you write \\(+\\infty\\). (Technically DNE in the finite sense.)",
      },
      {
        q: "Graph has \\(\\lim_{x \\to 4^-} f(x) = 3\\) and \\(\\lim_{x \\to 4^+} f(x) = 3\\) with a closed circle at \\((4, 7)\\). The two-sided limit is:",
        choices: ["3", "5", "7", "DNE"],
        answerIndex: 0,
        explanation: "Limits look at approach, not the value at the point. Both sides \\(\\to 3\\), so the limit is 3 even though \\(f(4) = 7\\).",
      },
    ],
  },

  "1.4": {
    id: "1.4",
    title: "Estimating Limit Values from Tables",
    summary:
      "A table of values near \\(x = a\\) suggests a limit by showing what \\(f(x)\\) settles toward from each side.",
    lesson:
      "Tables approximate limits numerically. Pick a few \\(x\\)-values that close in on \\(a\\) from each side — say \\(a - 0.1, a - 0.01, a - 0.001\\) from the left and similarly from the right — and record \\(f(x)\\). If both columns march toward the same number, that number is your estimated limit.\n\nCaveats: tables can lie. Round-off, cancellation, and oscillation (like \\(\\sin(1/x)\\) near 0) can fool the pattern. Always verify algebraically when possible, especially if the function has a \\(0/0\\) form near \\(a\\).\n\nOn the exam, tables are mostly a reading-comprehension task. Report the estimated limit cleanly (\"\\(\\lim_{x \\to 2} f(x) \\approx 3.0\\)\"), and note whether the two sides agree.",
    keyIdeas: [
      "Pick \\(x\\)-values squeezing toward \\(a\\) from both sides.",
      "Look for a single value both columns approach.",
      "Oscillation or round-off can mislead a table.",
      "Report estimated value with \\(\\approx\\).",
    ],
    workedExample: {
      prompt:
        "Table: \\(f(1.9) = 3.61, f(1.99) = 3.9601, f(2.01) = 4.0401, f(2.1) = 4.41\\). Estimate \\(\\lim_{x \\to 2} f(x)\\).",
      solution:
        "Both sides approach 4. So \\(\\lim_{x \\to 2} f(x) \\approx 4\\). (Indeed \\(f(x) = x^2\\), so the limit equals 4 exactly.)",
    },
    flashcards: [
      { q: "How many sides of a table do you need to convince yourself of a limit?", a: "Both — left and right." },
      { q: "When can a table mislead?", a: "Round-off, cancellation, or oscillatory behavior like \\(\\sin(1/x)\\) near 0." },
    ],
    commonMistakes: [
      "Using only one-sided data and declaring the two-sided limit.",
      "Missing oscillations that a coarse table hides.",
      "Reporting a rounded value as if it were exact.",
    ],
    quiz: [
      {
        q: "Table gives \\(f(0.99) = 1.9801, f(0.999) = 1.998, f(1.001) = 2.002, f(1.01) = 2.0201\\). Estimate \\(\\lim_{x \\to 1} f(x)\\).",
        choices: ["1", "1.99", "2", "2.02"],
        answerIndex: 2,
        explanation: "Values tighten toward 2 from both sides.",
      },
      {
        q: "Which situation most undermines trust in a table estimate?",
        choices: [
          "Values neatly rounded",
          "A function like \\(\\sin(1/x)\\) near 0 with only a few sample points",
          "Symmetric sampling from both sides",
          "Smooth, monotone columns",
        ],
        answerIndex: 1,
        explanation: "Rapid oscillation hides between sample points — table can give a false impression.",
      },
      {
        q: "Left column approaches 5; right column approaches 3. The two-sided limit is:",
        choices: ["5", "4", "3", "DNE"],
        answerIndex: 3,
        explanation: "Mismatched sides ⇒ two-sided DNE.",
      },
      {
        q: "\\(f(x) = (x^2 - 4)/(x-2)\\). A table near \\(x = 2\\) best suggests the limit is:",
        choices: ["0", "2", "4", "Undefined"],
        answerIndex: 2,
        explanation: "Simplifies to \\(x + 2\\); near 2 values approach 4, even though \\(f(2)\\) is undefined.",
      },
    ],
  },

  "1.5": {
    id: "1.5",
    title: "Determining Limits Using Algebraic Properties of Limits",
    summary:
      "Limits split over sums, differences, products, quotients, and constant multiples — as long as the relevant limits exist.",
    lesson:
      "The limit laws let you pull limits through ordinary algebra. If \\(\\lim_{x \\to a} f(x) = L\\) and \\(\\lim_{x \\to a} g(x) = M\\), then:\n\n$$\\lim (f \\pm g) = L \\pm M,\\quad \\lim (fg) = LM,\\quad \\lim (f/g) = L/M \\text{ if } M \\ne 0,\\quad \\lim (cf) = cL.$$\n\nComposition: if \\(g\\) is continuous at \\(L\\), then \\(\\lim g(f(x)) = g(L)\\). Polynomials and rational functions are continuous on their domains, so at any \\(a\\) in the domain you can just plug in — direct substitution.\n\nThe law for quotients has a zero-in-denominator trap. If \\(M = 0\\) but \\(L \\ne 0\\), the quotient blows up (\\(\\pm\\infty\\)). If both are zero, you have an indeterminate form and need algebraic manipulation, L'Hôpital, or substitution tricks.",
    keyIdeas: [
      "Limits distribute over sums, products, quotients (with denominator \\(\\ne 0\\)).",
      "Direct substitution works for polynomials and for rational functions at points in their domain.",
      "0/0 is indeterminate — needs more work.",
      "Composition passes through continuity.",
    ],
    workedExample: {
      prompt:
        "Compute \\(\\lim_{x \\to 2} (3x^2 - x + 4)\\).",
      solution:
        "Polynomial, continuous everywhere. Plug in: \\(3(4) - 2 + 4 = 12 - 2 + 4 = 14\\).",
    },
    flashcards: [
      { q: "Limit of a sum?", a: "Sum of the limits (when both exist)." },
      { q: "When does direct substitution give the limit?", a: "When the function is continuous at \\(a\\)." },
      { q: "What makes 0/0 special?", a: "Indeterminate form — you need algebra, conjugates, or L'Hôpital." },
    ],
    commonMistakes: [
      "Applying the quotient rule when the denominator limit is 0.",
      "Forgetting continuity is required for direct substitution.",
      "Declaring 0/0 equals 0 or 1.",
    ],
    quiz: [
      {
        q: "\\(\\lim_{x \\to 1} (x^3 + 2x)\\) equals:",
        choices: ["0", "2", "3", "6"],
        answerIndex: 2,
        explanation: "Polynomial; plug in: \\(1 + 2 = 3\\).",
      },
      {
        q: "If \\(\\lim_{x \\to a} f(x) = 3\\) and \\(\\lim_{x \\to a} g(x) = 0\\), then \\(\\lim_{x \\to a} f(x)/g(x)\\) is:",
        choices: [
          "0",
          "3",
          "Undefined/infinite (not automatic)",
          "Always 1",
        ],
        answerIndex: 2,
        explanation: "Denominator \\(\\to 0\\) but numerator \\(\\to 3 \\ne 0\\) gives \\(\\pm\\infty\\) — not a finite limit.",
      },
      {
        q: "Direct substitution works immediately for which of these?",
        choices: [
          "\\(\\lim_{x \\to 0} \\sin x / x\\)",
          "\\(\\lim_{x \\to 1} (x^2 - 1)/(x - 1)\\)",
          "\\(\\lim_{x \\to 2} (x^2 + 3x - 1)\\)",
          "\\(\\lim_{x \\to 0} 1/x\\)",
        ],
        answerIndex: 2,
        explanation: "Polynomial continuous at 2; the others are indeterminate or undefined.",
      },
      {
        q: "\\(\\lim_{x \\to a} [f(x) \\cdot g(x)]\\) equals:",
        choices: [
          "\\([\\lim f(x)] + [\\lim g(x)]\\)",
          "\\([\\lim f(x)] \\cdot [\\lim g(x)]\\) if both exist",
          "\\(f(a) \\cdot g(a)\\) always",
          "\\(f(a) / g(a)\\)",
        ],
        answerIndex: 1,
        explanation: "Product rule for limits: product of limits, provided both exist.",
      },
    ],
  },

  "1.6": {
    id: "1.6",
    title: "Determining Limits Using Algebraic Manipulation",
    summary:
      "For 0/0 indeterminate forms, rewrite before you take the limit: factor, rationalize, or find a common denominator.",
    lesson:
      "Indeterminate forms signal the need to simplify. The three moves you lean on are (1) factor and cancel, (2) rationalize with a conjugate, and (3) combine or split fractions via a common denominator. Each removes the offending zero.\n\nFactor/cancel: for \\((x^2 - 4)/(x - 2)\\) at \\(x = 2\\), factor the numerator as \\((x - 2)(x + 2)\\), cancel the \\((x - 2)\\), then plug in to get 4.\n\nRationalize: for \\((\\sqrt{x+1} - 1)/x\\) at \\(x = 0\\), multiply top and bottom by \\(\\sqrt{x+1} + 1\\). The numerator becomes \\(x\\), which cancels the denominator.\n\nCommon denominator: for \\((1/(x+1) - 1)/x\\) at \\(x = 0\\), combine the top fraction first — \\(-x/(x+1)\\) — then simplify.\n\nAfter simplification, the rewritten function matches the original everywhere near \\(a\\) except at \\(a\\) itself, which is enough for the limit.",
    keyIdeas: [
      "0/0 demands simplification before substitution.",
      "Factor and cancel is first choice when roots are rational.",
      "Conjugate multiplication handles surds.",
      "Combining fractions turns complex fractions into clean ratios.",
    ],
    workedExample: {
      prompt:
        "Compute \\(\\lim_{x \\to 9} \\frac{\\sqrt{x} - 3}{x - 9}\\).",
      solution:
        "Direct sub gives 0/0. Multiply by conjugate \\(\\sqrt{x} + 3\\): \\(\\frac{x - 9}{(x - 9)(\\sqrt{x} + 3)} = \\frac{1}{\\sqrt{x} + 3}\\). Plug in \\(x = 9\\): \\(1/6\\).",
    },
    flashcards: [
      { q: "0/0 near \\(x = a\\) in a polynomial ratio — first move?", a: "Factor numerator and denominator, cancel the common \\((x-a)\\) factor." },
      { q: "Limit with a square root giving 0/0 — standard trick?", a: "Multiply top and bottom by the conjugate." },
    ],
    commonMistakes: [
      "Canceling factors that aren't actually equal (e.g., \\(x - 2\\) from \\(x + 2\\)).",
      "Forgetting the denominator when rationalizing.",
      "Declaring 0/0 equals 0 without doing any algebra.",
    ],
    quiz: [
      {
        q: "\\(\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}\\) equals:",
        choices: ["0", "3", "6", "DNE"],
        answerIndex: 2,
        explanation: "Factor to \\(x + 3\\); plug in 3.",
      },
      {
        q: "\\(\\lim_{x \\to 0} \\frac{\\sqrt{x+4} - 2}{x}\\) equals:",
        choices: ["0", "\\(1/4\\)", "\\(1/2\\)", "2"],
        answerIndex: 1,
        explanation: "Conjugate gives \\(1/(\\sqrt{x+4} + 2)\\); plug in 0: \\(1/4\\).",
      },
      {
        q: "Which situation most invites a conjugate multiplication?",
        choices: [
          "Polynomial over polynomial with 0/0",
          "Expression with a square-root term giving 0/0",
          "Constant divided by polynomial",
          "Exponential over linear",
        ],
        answerIndex: 1,
        explanation: "Conjugates rationalize surds, clearing the offending cancellation.",
      },
      {
        q: "After simplifying \\((x^2 - x - 6)/(x - 3)\\) for \\(x \\ne 3\\) you get:",
        choices: ["\\(x + 2\\)", "\\(x - 2\\)", "\\(x + 3\\)", "\\(x - 3\\)"],
        answerIndex: 0,
        explanation: "Factor top as \\((x-3)(x+2)\\); cancel with \\(x-3\\).",
      },
    ],
  },

  "1.7": {
    id: "1.7",
    title: "Selecting Procedures for Determining Limits",
    summary:
      "A triage skill: pick direct substitution, algebra, special limits, or L'Hôpital based on the form you see.",
    lesson:
      "The workflow is: (1) plug in \\(x = a\\). If you get a number, done. (2) If you get 0/0, simplify (factor, rationalize, combine fractions). (3) If it's still stuck, consider a special limit like \\(\\lim_{x \\to 0} \\sin x / x = 1\\) or \\(\\lim_{x \\to 0} (1 - \\cos x)/x = 0\\). (4) If all else fails and BC tools are fair game, apply L'Hôpital's Rule.\n\nFor \\(x \\to \\pm\\infty\\) limits, compare dominant terms. Rational functions: divide top and bottom by the highest power of \\(x\\) in the denominator. Exponentials beat polynomials; polynomials beat logs.\n\nPiecewise functions: always take one-sided limits separately at breakpoints. This triage is basically a checklist — learning it saves time on multiple choice.",
    keyIdeas: [
      "Plug in first; only simplify if you hit an indeterminate form.",
      "Memorize the triage: substitution \\(\\to\\) algebra \\(\\to\\) special limits \\(\\to\\) L'Hôpital.",
      "At infinity, compare growth rates.",
      "Piecewise: one-sided limits at every seam.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\lim_{x \\to \\infty} \\frac{3x^2 + 2}{5x^2 - x + 1}\\).",
      solution:
        "Divide top and bottom by \\(x^2\\): \\((3 + 2/x^2)/(5 - 1/x + 1/x^2)\\to 3/5\\).",
    },
    flashcards: [
      { q: "First step in any limit problem?", a: "Direct substitution to check for indeterminate form." },
      { q: "Classic limit \\(\\lim_{x \\to 0} \\sin x / x = ?\\)", a: "1." },
    ],
    commonMistakes: [
      "Jumping to L'Hôpital before checking direct substitution.",
      "Forgetting to verify indeterminate form before applying L'Hôpital.",
      "Ignoring one-sided behavior at a piecewise seam.",
    ],
    quiz: [
      {
        q: "For \\(\\lim_{x \\to \\infty} (5x^3 - x)/(2x^3 + 4)\\), the best technique is:",
        choices: [
          "Substitute immediately",
          "Divide top and bottom by \\(x^3\\)",
          "Use conjugates",
          "Factor the denominator",
        ],
        answerIndex: 1,
        explanation: "For rational limits at infinity, divide by the highest power in the denominator.",
      },
      {
        q: "\\(\\lim_{x \\to 0} \\sin(3x)/x\\) equals:",
        choices: ["0", "1", "3", "DNE"],
        answerIndex: 2,
        explanation: "\\(\\sin(3x)/x = 3 \\cdot \\sin(3x)/(3x) \\to 3 \\cdot 1 = 3\\).",
      },
      {
        q: "Which limit requires more than direct substitution?",
        choices: [
          "\\(\\lim_{x \\to 1}(x^2 + x)\\)",
          "\\(\\lim_{x \\to 0} (x^2 - 4x)/x\\)",
          "\\(\\lim_{x \\to 2} 3x\\)",
          "\\(\\lim_{x \\to -1}(x + 4)\\)",
        ],
        answerIndex: 1,
        explanation: "Substituting gives 0/0; factor out \\(x\\) to simplify.",
      },
      {
        q: "L'Hôpital's Rule is valid only when the limit has the form:",
        choices: ["\\(0 \\cdot \\infty\\) always", "0/0 or \\(\\infty/\\infty\\)", "Any limit", "\\(\\infty - \\infty\\) only"],
        answerIndex: 1,
        explanation: "L'Hôpital applies directly only to 0/0 or \\(\\infty/\\infty\\); other forms must be rewritten first.",
      },
    ],
  },

  "1.8": {
    id: "1.8",
    title: "Determining Limits Using the Squeeze Theorem",
    summary:
      "If \\(g(x) \\le f(x) \\le h(x)\\) near \\(a\\) and \\(g, h\\) have the same limit at \\(a\\), then so does \\(f\\).",
    lesson:
      "The squeeze theorem is the tool for bounded-oscillation limits. Classic example: \\(\\lim_{x \\to 0} x^2 \\sin(1/x)\\). The factor \\(\\sin(1/x)\\) oscillates wildly, but \\(-1 \\le \\sin(1/x) \\le 1\\), so \\(-x^2 \\le x^2 \\sin(1/x) \\le x^2\\). Both bounds go to 0 at \\(x = 0\\), so the middle is squeezed to 0.\n\nStructure: find bounding functions \\(g\\) and \\(h\\) that trap \\(f\\) near \\(a\\), show they share a common limit \\(L\\), then conclude \\(\\lim f = L\\).\n\nBC students also use squeeze to establish series convergence (via comparison) and to argue that bounded \\(\\times\\) small \\(\\to 0\\).",
    keyIdeas: [
      "Need \\(g \\le f \\le h\\) near \\(a\\).",
      "Bounds must share a common limit at \\(a\\).",
      "Great for bounded oscillations like \\(\\sin, \\cos\\) of something wild.",
      "Works for \\(x \\to \\infty\\) too.",
    ],
    workedExample: {
      prompt: "Find \\(\\lim_{x \\to 0} x^2 \\cos(1/x)\\).",
      solution:
        "Since \\(|\\cos(1/x)| \\le 1\\), \\(-x^2 \\le x^2 \\cos(1/x) \\le x^2\\). Both bounds \\(\\to 0\\), so the limit is 0.",
    },
    flashcards: [
      { q: "Squeeze theorem statement?", a: "If \\(g \\le f \\le h\\) and \\(\\lim g = \\lim h = L\\), then \\(\\lim f = L\\)." },
      { q: "Classic setup?", a: "Bounded function (like sin/cos) times something tending to 0." },
    ],
    commonMistakes: [
      "Forgetting to check the bounds have the same limit.",
      "Using bounds that are not actually \\(\\le\\) or \\(\\ge\\) \\(f\\) near \\(a\\).",
      "Applying squeeze when the function isn't bounded.",
    ],
    quiz: [
      {
        q: "\\(\\lim_{x \\to 0} x \\sin(1/x)\\) equals:",
        choices: ["0", "1", "Undefined", "DNE"],
        answerIndex: 0,
        explanation: "Bounded by \\(\\pm |x|\\), both \\(\\to 0\\).",
      },
      {
        q: "Squeeze theorem requires:",
        choices: [
          "\\(f = g = h\\) at \\(a\\)",
          "\\(g \\le f \\le h\\) near \\(a\\), with \\(\\lim g = \\lim h\\)",
          "\\(f\\) monotone",
          "\\(f\\) continuous at \\(a\\)",
        ],
        answerIndex: 1,
        explanation: "Bounded between two functions with matching limits.",
      },
      {
        q: "Which expression CAN'T be handled with squeeze as stated?",
        choices: [
          "\\(x^2 \\sin(1/x)\\) as \\(x \\to 0\\)",
          "\\(\\cos x / x\\) as \\(x \\to \\infty\\)",
          "\\(1/x\\) as \\(x \\to 0\\)",
          "\\((\\sin x)/x^2\\) as \\(x \\to \\infty\\)",
        ],
        answerIndex: 2,
        explanation: "\\(1/x\\) is unbounded near 0, no finite squeeze works.",
      },
      {
        q: "If \\(-|x| \\le f(x) \\le |x|\\), then \\(\\lim_{x \\to 0} f(x)\\) equals:",
        choices: ["0", "1", "Cannot determine", "DNE"],
        answerIndex: 0,
        explanation: "Both bounds \\(\\to 0\\), so \\(f \\to 0\\).",
      },
    ],
  },

  "1.9": {
    id: "1.9",
    title: "Connecting Multiple Representations of Limits",
    summary:
      "A limit is the same idea whether you see it as a formula, a graph, a table, or a sentence. Translate fluently.",
    lesson:
      "AP loves to ask questions that swap between representations. You should be able to look at a table and write the limit in limit notation; look at a graph and answer in a table-style claim; or read \"as time goes on, the drug concentration approaches 0 mg/mL\" and write \\(\\lim_{t \\to \\infty} C(t) = 0\\).\n\nThe big operational takeaway: if one representation is ambiguous (e.g., a graph where you can't tell if the curve hits the open circle), use another representation to decide.\n\nContextual statements always need units and a direction of approach. \"As \\(t \\to \\infty\\), the population approaches 500,000\" should be written \\(\\lim_{t \\to \\infty} P(t) = 500{,}000\\) — including the carrying-capacity interpretation if relevant.",
    keyIdeas: [
      "Four representations: symbolic, graphical, tabular, verbal.",
      "Cross-check when one is ambiguous.",
      "Always note units and direction of approach.",
      "Limit statements are about behavior near the target input.",
    ],
    workedExample: {
      prompt:
        "A population \\(P(t)\\) grows toward a carrying capacity. The graph has a horizontal asymptote at \\(P = 1000\\). Write the limit statement.",
      solution: "\\(\\lim_{t \\to \\infty} P(t) = 1000\\). Units: individuals.",
    },
    flashcards: [
      { q: "How to translate a horizontal asymptote into limit notation?", a: "\\(\\lim_{x \\to \\pm\\infty} f(x) = L\\) where \\(L\\) is the asymptote." },
      { q: "Why cross-check representations?", a: "Each can hide or distort information; combining them catches mistakes." },
    ],
    commonMistakes: [
      "Reporting limits without units in context.",
      "Confusing a horizontal asymptote (\\(x \\to \\pm\\infty\\)) with a vertical asymptote (\\(x \\to a\\)).",
      "Writing limit statements without the arrow.",
    ],
    quiz: [
      {
        q: "Graph has horizontal asymptote at \\(y = -2\\) as \\(x \\to -\\infty\\). Correct notation:",
        choices: [
          "\\(\\lim_{x \\to -\\infty} f(x) = -2\\)",
          "\\(\\lim_{x \\to -2} f(x) = \\infty\\)",
          "\\(f(-2) = -\\infty\\)",
          "\\(f(-\\infty) = -2\\)",
        ],
        answerIndex: 0,
        explanation: "Horizontal asymptote tells you the limit at infinity.",
      },
      {
        q: "Table shows \\(f(1.9)=3.9, f(1.99)=3.99\\), \\(f(2.1)=4.1, f(2.01)=4.01\\). Best verbal statement:",
        choices: [
          "As \\(x \\to 2\\), \\(f(x) \\to 4\\).",
          "As \\(x \\to 4\\), \\(f(x) \\to 2\\).",
          "As \\(x \\to \\infty\\), \\(f(x) \\to 4\\).",
          "As \\(x \\to 0\\), \\(f(x) \\to 4\\).",
        ],
        answerIndex: 0,
        explanation: "Both sides approach 4 as \\(x \\to 2\\).",
      },
      {
        q: "Which is equivalent to \\(\\lim_{x \\to 3} f(x) = 7\\)?",
        choices: [
          "\\(f(3) = 7\\)",
          "As \\(x\\) gets close to 3, \\(f(x)\\) gets close to 7.",
          "\\(f\\) is continuous at 3.",
          "The graph has a hole at \\((7, 3)\\).",
        ],
        answerIndex: 1,
        explanation: "Limit is the approach statement — not the value at 3.",
      },
      {
        q: "Verbal: \"as \\(t\\) increases without bound, concentration approaches 0 mg/L.\" Symbolic form:",
        choices: [
          "\\(\\lim_{t \\to 0} C(t) = \\infty\\)",
          "\\(\\lim_{t \\to \\infty} C(t) = 0\\)",
          "\\(C(\\infty) = 0\\)",
          "\\(\\lim_{t \\to 0} C(t) = 0\\)",
        ],
        answerIndex: 1,
        explanation: "\"\\(t\\) increases without bound\" means \\(t \\to \\infty\\).",
      },
    ],
  },

  "1.10": {
    id: "1.10",
    title: "Exploring Types of Discontinuities",
    summary:
      "Discontinuities come in three flavors: removable (hole), jump, and infinite (asymptote).",
    lesson:
      "Removable: \\(\\lim_{x \\to a} f(x)\\) exists but differs from \\(f(a)\\) (or \\(f(a)\\) is undefined). Filling the hole with \\(f(a) = L\\) fixes it — hence \"removable.\"\n\nJump: \\(\\lim_{x \\to a^-} f(x) \\ne \\lim_{x \\to a^+} f(x)\\). Both one-sided limits exist but disagree. You cannot smooth out the jump with a single redefinition.\n\nInfinite: at least one one-sided limit is \\(\\pm\\infty\\). The graph has a vertical asymptote at \\(x = a\\).\n\nIdentifying which type is on an FRQ matters because only removable discontinuities are fixable — the exam often asks \"find the value of \\(k\\) that would make \\(f\\) continuous.\"",
    keyIdeas: [
      "Removable = hole; limit exists but \\(f(a)\\) misses.",
      "Jump = one-sided limits disagree.",
      "Infinite = vertical asymptote.",
      "Only removable discontinuities are repairable by redefining one value.",
    ],
    workedExample: {
      prompt: "Classify the discontinuity of \\(f(x) = (x^2 - 1)/(x - 1)\\) at \\(x = 1\\).",
      solution:
        "Factor: \\(f(x) = x + 1\\) for \\(x \\ne 1\\). Limit is 2; \\(f(1)\\) is undefined. Removable.",
    },
    flashcards: [
      { q: "Removable discontinuity?", a: "Limit exists but disagrees with \\(f(a)\\) (or \\(f(a)\\) undefined)." },
      { q: "Jump discontinuity?", a: "One-sided limits exist and differ." },
      { q: "Infinite discontinuity?", a: "A one-sided limit is infinite — vertical asymptote." },
    ],
    commonMistakes: [
      "Calling a jump \"removable.\"",
      "Missing the domain restriction when canceling factors.",
      "Confusing an oscillatory discontinuity with a jump.",
    ],
    quiz: [
      {
        q: "A piecewise function has \\(\\lim_{x \\to 2^-}f = 3\\) and \\(\\lim_{x \\to 2^+}f = 5\\). The discontinuity at 2 is:",
        choices: ["Removable", "Jump", "Infinite", "None"],
        answerIndex: 1,
        explanation: "One-sided limits exist but differ — jump.",
      },
      {
        q: "\\(f(x) = 1/(x - 3)\\) at \\(x = 3\\) has what kind of discontinuity?",
        choices: ["Removable", "Jump", "Infinite", "None"],
        answerIndex: 2,
        explanation: "Vertical asymptote; \\(f \\to \\pm\\infty\\) from each side.",
      },
      {
        q: "Which situation is repairable by redefining one value?",
        choices: ["Jump", "Infinite", "Removable", "Oscillatory"],
        answerIndex: 2,
        explanation: "Only removable discontinuities can be fixed by a single point redefinition.",
      },
      {
        q: "If \\(\\lim_{x \\to 0} f(x) = 4\\) and \\(f(0) = 4\\), the function at 0 is:",
        choices: ["Removably discontinuous", "Continuous", "Jump discontinuous", "Infinitely discontinuous"],
        answerIndex: 1,
        explanation: "Limit equals value — no discontinuity.",
      },
    ],
  },

  "1.11": {
    id: "1.11",
    title: "Defining Continuity at a Point",
    summary:
      "\\(f\\) is continuous at \\(a\\) iff \\(f(a)\\) is defined, \\(\\lim_{x \\to a} f(x)\\) exists, and they are equal.",
    lesson:
      "The three-part definition: (1) \\(f(a)\\) exists, (2) \\(\\lim_{x \\to a} f(x)\\) exists (finite), (3) the limit equals \\(f(a)\\). Missing any one produces some kind of discontinuity.\n\nAP FRQs ask you to prove continuity at a seam of a piecewise function — typical setup: find \\(k\\) such that \\(f\\) is continuous. You compute the one-sided limits, set them equal to \\(f(a)\\), and solve.\n\nContinuity is local — a function can be continuous everywhere except at one rogue point. Basic families (polynomials, sine, cosine, exponentials) are continuous on \\(\\mathbb{R}\\); rational functions are continuous wherever the denominator is nonzero; log is continuous on its domain.",
    keyIdeas: [
      "Three-part check: value, limit, equality.",
      "Fail any one and \\(f\\) is discontinuous at \\(a\\).",
      "Polynomials, sin, cos, exp continuous everywhere.",
      "Rational continuous wherever denominator \\(\\ne 0\\).",
    ],
    workedExample: {
      prompt:
        "Let \\(f(x) = kx + 1\\) for \\(x < 2\\) and \\(f(x) = x^2 - 3\\) for \\(x \\ge 2\\). Find \\(k\\) making \\(f\\) continuous at 2.",
      solution:
        "\\(f(2) = 1\\). Left limit: \\(2k + 1\\). Set \\(2k + 1 = 1 \\Rightarrow k = 0\\).",
    },
    flashcards: [
      { q: "What three conditions define continuity at \\(a\\)?", a: "\\(f(a)\\) defined, \\(\\lim_{x \\to a} f(x)\\) exists, and they are equal." },
      { q: "Is \\(f(x) = \\tan x\\) continuous everywhere?", a: "No — discontinuous at \\(\\pi/2 + n\\pi\\)." },
    ],
    commonMistakes: [
      "Checking only the limit, not the value at \\(a\\).",
      "Assuming piecewise functions are automatically continuous.",
      "Forgetting to equate both one-sided limits to \\(f(a)\\).",
    ],
    quiz: [
      {
        q: "Which is NOT required for continuity at \\(a\\)?",
        choices: [
          "\\(f(a)\\) defined",
          "\\(\\lim_{x \\to a} f(x)\\) exists",
          "\\(\\lim_{x \\to a} f(x) = f(a)\\)",
          "\\(f\\) differentiable at \\(a\\)",
        ],
        answerIndex: 3,
        explanation: "Differentiability is a stronger condition, not required for continuity.",
      },
      {
        q: "If \\(f(3)\\) is undefined, then \\(f\\) is:",
        choices: [
          "Continuous at 3",
          "Discontinuous at 3",
          "Differentiable at 3",
          "Cannot decide",
        ],
        answerIndex: 1,
        explanation: "Undefined value ⇒ not continuous at 3.",
      },
      {
        q: "Which family is continuous on all of \\(\\mathbb{R}\\)?",
        choices: ["Polynomials", "\\(\\tan x\\)", "\\(1/x\\)", "\\(\\ln x\\)"],
        answerIndex: 0,
        explanation: "Polynomials are continuous everywhere; the others have discontinuities.",
      },
      {
        q: "Piecewise \\(f(x) = x + k\\) for \\(x < 1\\), \\(f(x) = 3x\\) for \\(x \\ge 1\\). For continuity at 1, \\(k =\\)",
        choices: ["0", "1", "2", "3"],
        answerIndex: 2,
        explanation: "Set \\(1 + k = 3\\); \\(k = 2\\).",
      },
    ],
  },

  "1.12": {
    id: "1.12",
    title: "Confirming Continuity over an Interval",
    summary:
      "\\(f\\) is continuous on an interval iff it is continuous at every point of the interval — endpoint behavior uses one-sided limits.",
    lesson:
      "For open intervals \\((a, b)\\), continuity at every interior point is all you need. For closed intervals \\([a, b]\\), you also need right-continuity at \\(a\\) (i.e., \\(\\lim_{x \\to a^+} f = f(a)\\)) and left-continuity at \\(b\\).\n\nThe building block: pointwise continuity. In practice you inherit continuity from the standard rules — sums, products, quotients (non-zero denominator), compositions of continuous functions are continuous.\n\nBC-style exam questions ask you to state the interval where \\(f\\) is continuous and justify. A typical justification: \"since polynomials are continuous on \\(\\mathbb{R}\\) and the denominator is nonzero on the interval, \\(f\\) is continuous there.\"",
    keyIdeas: [
      "Continuous at every point of the interval.",
      "Endpoints of closed intervals use one-sided limits.",
      "Sums, products, quotients (where defined), compositions stay continuous.",
      "Cite the underlying continuous functions in FRQs.",
    ],
    workedExample: {
      prompt:
        "State the interval where \\(f(x) = \\sqrt{x - 4}\\) is continuous.",
      solution:
        "Domain: \\(x \\ge 4\\). On \\((4, \\infty)\\), \\(\\sqrt{x-4}\\) is continuous; at \\(x = 4\\), right-continuous. So continuous on \\([4, \\infty)\\).",
    },
    flashcards: [
      { q: "Continuity on a closed interval?", a: "Continuous at every interior point + one-sided continuity at endpoints." },
      { q: "Quotient of continuous functions continuous where?", a: "Wherever the denominator is nonzero." },
    ],
    commonMistakes: [
      "Forgetting to check endpoints on closed intervals.",
      "Assuming continuity outside the domain.",
      "Ignoring denominator zeros.",
    ],
    quiz: [
      {
        q: "\\(f(x) = 1/(x^2 - 1)\\) is continuous on:",
        choices: [
          "\\(\\mathbb{R}\\)",
          "\\(\\mathbb{R} \\setminus \\{-1, 1\\}\\)",
          "\\([-1, 1]\\)",
          "\\((0, \\infty)\\)",
        ],
        answerIndex: 1,
        explanation: "Denominator zero at \\(\\pm 1\\); continuous elsewhere.",
      },
      {
        q: "At the left endpoint of a closed interval, continuity requires:",
        choices: [
          "Full two-sided limit",
          "Right-continuity only",
          "Left-continuity only",
          "Nothing",
        ],
        answerIndex: 1,
        explanation: "Only \\(\\lim_{x \\to a^+} f(x) = f(a)\\) is required at the left endpoint.",
      },
      {
        q: "\\(f(x) = \\ln(x - 3)\\) is continuous on:",
        choices: ["\\(\\mathbb{R}\\)", "\\([3, \\infty)\\)", "\\((3, \\infty)\\)", "\\([0, \\infty)\\)"],
        answerIndex: 2,
        explanation: "Log requires \\(x - 3 > 0\\), so continuous on \\((3, \\infty)\\).",
      },
      {
        q: "A composition \\(g(f(x))\\) is continuous at \\(a\\) if:",
        choices: [
          "\\(f\\) continuous at \\(a\\) only",
          "\\(g\\) continuous at \\(a\\) only",
          "\\(f\\) continuous at \\(a\\) and \\(g\\) continuous at \\(f(a)\\)",
          "Neither",
        ],
        answerIndex: 2,
        explanation: "Composition of continuous functions is continuous at the relevant points.",
      },
    ],
  },

  "1.13": {
    id: "1.13",
    title: "Removing Discontinuities",
    summary:
      "Redefining \\(f(a)\\) to equal the limit repairs a removable discontinuity.",
    lesson:
      "If \\(\\lim_{x \\to a} f(x) = L\\) but \\(f(a) \\ne L\\) (or undefined), redefine \\(f(a) = L\\). The patched function agrees with the original everywhere except at \\(a\\), and is now continuous at \\(a\\).\n\nTypical AP setup: piecewise function with a parameter \\(k\\). Find \\(k\\) so that the limit at the seam equals \\(f(\\text{seam})\\). Compute both one-sided limits and set the expression in the piece covering \\(x = \\text{seam}\\) equal to them.\n\nRemoving doesn't work on jumps or infinite discontinuities — you can't patch two different one-sided limits with a single value, and you can't absorb \\(\\infty\\) into a finite value.",
    keyIdeas: [
      "Redefine \\(f(a) = \\lim_{x \\to a} f(x)\\) to remove.",
      "Only removable discontinuities are repairable.",
      "Typical task: choose parameter so seam becomes continuous.",
      "Jumps and infinities cannot be removed this way.",
    ],
    workedExample: {
      prompt:
        "Let \\(f(x) = (x^2 - 9)/(x - 3)\\) for \\(x \\ne 3\\). Define \\(f(3)\\) so that \\(f\\) is continuous at 3.",
      solution:
        "Simplify to \\(x + 3\\), limit at 3 is 6. Define \\(f(3) = 6\\).",
    },
    flashcards: [
      { q: "When is a discontinuity \"removable\"?", a: "When \\(\\lim_{x \\to a} f(x)\\) exists (finite) and differs from \\(f(a)\\)." },
      { q: "How to remove?", a: "Redefine \\(f(a) = L\\) where \\(L\\) is the limit." },
    ],
    commonMistakes: [
      "Attempting to remove a jump or asymptote.",
      "Setting \\(f(a) = f(\\text{nearby})\\) rather than the limit.",
      "Not checking that the limit actually exists.",
    ],
    quiz: [
      {
        q: "To remove the discontinuity in \\(f(x) = (x^2 - 4)/(x - 2)\\) at \\(x = 2\\), define \\(f(2) = ?\\)",
        choices: ["0", "2", "4", "Undefined"],
        answerIndex: 2,
        explanation: "Simplifies to \\(x + 2\\); limit at 2 is 4.",
      },
      {
        q: "Which discontinuity CANNOT be removed?",
        choices: [
          "Removable hole",
          "Jump",
          "Both (a) and (b)",
          "None",
        ],
        answerIndex: 1,
        explanation: "Jumps cannot be patched by redefining one value.",
      },
      {
        q: "\\(f(x) = \\begin{cases} \\frac{\\sin x}{x}, & x \\ne 0 \\\\ k, & x = 0 \\end{cases}\\). Choose \\(k\\):",
        choices: ["0", "1", "\\(\\pi\\)", "No value works"],
        answerIndex: 1,
        explanation: "\\(\\lim_{x \\to 0} \\sin x / x = 1\\), so set \\(k = 1\\).",
      },
      {
        q: "True or false: You can always remove an infinite discontinuity by defining the function appropriately.",
        choices: ["True", "False", "Depends on the sign of infinity", "Only if \\(f\\) is even"],
        answerIndex: 1,
        explanation: "No finite value equals \\(\\infty\\), so you can't patch it.",
      },
    ],
  },

  "1.14": {
    id: "1.14",
    title: "Connecting Infinite Limits and Vertical Asymptotes",
    summary:
      "\\(\\lim_{x \\to a} f(x) = \\pm \\infty\\) means \\(f\\) has a vertical asymptote at \\(x = a\\).",
    lesson:
      "A vertical asymptote at \\(x = a\\) is exactly a place where at least one one-sided limit is \\(\\pm\\infty\\). For rational functions \\(f(x) = P(x)/Q(x)\\), asymptotes occur where \\(Q(a) = 0\\) and \\(P(a) \\ne 0\\). If both are zero you might have a hole — factor and simplify to check.\n\nDetermining sign: near the asymptote, plug in a value just left and just right of \\(a\\). Track the signs of numerator and denominator; the ratio gives \\(+\\infty\\) or \\(-\\infty\\). Multiplicity of the zero in the denominator matters — odd multiplicity flips signs across \\(a\\), even multiplicity preserves the sign.\n\nFunctions like \\(\\ln x\\) have \\(\\lim_{x \\to 0^+} \\ln x = -\\infty\\); \\(\\tan x\\) at \\(\\pi/2\\) has opposite-signed infinities on each side. Know these cold.",
    keyIdeas: [
      "Vertical asymptote \\(\\Leftrightarrow\\) one-sided infinite limit.",
      "Rational: denominator zero + numerator nonzero after simplification.",
      "Sign-check both sides to decide \\(\\pm\\infty\\).",
      "Odd multiplicity flips signs; even preserves.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\lim_{x \\to 2^+} \\frac{x + 1}{x - 2}\\) and \\(\\lim_{x \\to 2^-} \\frac{x + 1}{x - 2}\\).",
      solution:
        "At \\(x \\to 2^+\\): numerator \\(\\to 3 > 0\\), denominator \\(\\to 0^+\\), so \\(+\\infty\\). At \\(x \\to 2^-\\): denominator \\(\\to 0^-\\), so \\(-\\infty\\).",
    },
    flashcards: [
      { q: "When does a rational function have a vertical asymptote?", a: "Where the denominator is zero and the numerator is nonzero (after simplification)." },
      { q: "How to decide sign of infinite limit?", a: "Test a value just on that side of \\(a\\); track numerator and denominator signs." },
    ],
    commonMistakes: [
      "Declaring asymptote at every zero of the denominator without checking factoring.",
      "Forgetting to check one-sided signs.",
      "Writing \"limit = DNE\" without mentioning \\(\\pm\\infty\\) when the exam asks for asymptote behavior.",
    ],
    quiz: [
      {
        q: "\\(\\lim_{x \\to 3^+} \\frac{5}{x - 3}\\) equals:",
        choices: ["0", "\\(+\\infty\\)", "\\(-\\infty\\)", "5"],
        answerIndex: 1,
        explanation: "Numerator positive, denominator small positive: \\(+\\infty\\).",
      },
      {
        q: "Which point is a vertical asymptote of \\(f(x) = (x + 2)/(x^2 - 4)\\)?",
        choices: ["\\(x = -2\\)", "\\(x = 2\\)", "Both", "Neither"],
        answerIndex: 1,
        explanation: "Factor: \\((x+2)/[(x-2)(x+2)] = 1/(x-2)\\); hole at \\(-2\\), asymptote at 2.",
      },
      {
        q: "\\(\\lim_{x \\to 0^+} \\ln x =\\)",
        choices: ["0", "\\(+\\infty\\)", "\\(-\\infty\\)", "1"],
        answerIndex: 2,
        explanation: "Log shoots to \\(-\\infty\\) as \\(x \\to 0^+\\).",
      },
      {
        q: "If \\(\\lim_{x \\to 2^-} f(x) = +\\infty\\) and \\(\\lim_{x \\to 2^+} f(x) = -\\infty\\), then at \\(x = 2\\) there is:",
        choices: ["A jump", "A hole", "A vertical asymptote with sign change", "Continuity"],
        answerIndex: 2,
        explanation: "Both one-sided limits infinite with opposite signs — asymptote with sign flip.",
      },
    ],
  },

  "1.15": {
    id: "1.15",
    title: "Connecting Limits at Infinity and Horizontal Asymptotes",
    summary:
      "\\(\\lim_{x \\to \\pm\\infty} f(x) = L\\) means the graph levels off at \\(y = L\\) — a horizontal asymptote.",
    lesson:
      "For rational functions, compare degrees of numerator and denominator. If \\(\\deg P < \\deg Q\\), limit is 0 — asymptote \\(y = 0\\). If equal, ratio of leading coefficients. If \\(\\deg P > \\deg Q\\), no horizontal asymptote (slant or polynomial asymptote possible).\n\nFor exponentials: \\(\\lim_{x \\to \\infty} e^{-x} = 0\\); \\(\\lim_{x \\to -\\infty} e^x = 0\\). For logs: \\(\\lim_{x \\to \\infty} \\ln x = \\infty\\). These dominate in end-behavior comparisons.\n\nTo compute tricky limits at infinity, divide top and bottom by the highest power in the denominator. For differences like \\(\\sqrt{x^2 + x} - x\\), rationalize first.",
    keyIdeas: [
      "Rational limits at \\(\\infty\\): compare degrees.",
      "Equal degrees \\(\\to\\) ratio of leading coefficients.",
      "Lower top degree \\(\\to\\) 0.",
      "Divide by highest denominator power when in doubt.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\lim_{x \\to \\infty} (2x^3 - x)/(5x^3 + 2x^2 + 1)\\).",
      solution:
        "Leading coefficients 2 and 5, same degree: limit = \\(2/5\\).",
    },
    flashcards: [
      { q: "Horizontal asymptote of \\(1/x^2\\)?", a: "\\(y = 0\\)." },
      { q: "Rational: degree top > degree bottom — what's the limit at infinity?", a: "No horizontal asymptote (\\(\\pm\\infty\\))." },
    ],
    commonMistakes: [
      "Forgetting sign of infinity when comparing dominant terms.",
      "Missing slant asymptotes when top degree is one more than bottom.",
      "Treating exponentials as polynomials.",
    ],
    quiz: [
      {
        q: "\\(\\lim_{x \\to \\infty} \\frac{3x^2 + 1}{x^3 + x}\\) equals:",
        choices: ["0", "1", "3", "\\(\\infty\\)"],
        answerIndex: 0,
        explanation: "Top degree < bottom degree; limit = 0.",
      },
      {
        q: "Horizontal asymptote of \\(f(x) = (4x - 7)/(2x + 3)\\)?",
        choices: ["\\(y = 0\\)", "\\(y = 2\\)", "\\(y = -7/3\\)", "None"],
        answerIndex: 1,
        explanation: "Equal degree; ratio of leading coefficients = 4/2 = 2.",
      },
      {
        q: "\\(\\lim_{x \\to -\\infty} e^x\\) equals:",
        choices: ["0", "1", "\\(\\infty\\)", "\\(-\\infty\\)"],
        answerIndex: 0,
        explanation: "\\(e^x \\to 0\\) as \\(x \\to -\\infty\\).",
      },
      {
        q: "If \\(\\deg P(x) = \\deg Q(x) + 1\\) in a rational function, the limit at \\(\\pm\\infty\\) is:",
        choices: ["Finite, ratio of leading coefficients", "0", "\\(\\pm\\infty\\)", "Undefined"],
        answerIndex: 2,
        explanation: "Top grows strictly faster, so the ratio grows without bound.",
      },
    ],
  },

  "1.16": {
    id: "1.16",
    title: "Working with the Intermediate Value Theorem",
    summary:
      "If \\(f\\) is continuous on \\([a, b]\\) and \\(N\\) lies between \\(f(a)\\) and \\(f(b)\\), then \\(f(c) = N\\) for some \\(c\\) in \\((a, b)\\).",
    lesson:
      "IVT is an existence theorem — it guarantees a solution exists without telling you where. Hypotheses: continuity on a closed interval. Conclusion: every intermediate \\(y\\)-value is attained somewhere inside.\n\nTypical application: show that \\(f(x) = 0\\) has a root on \\([a, b]\\). Compute \\(f(a), f(b)\\); if they have opposite signs and \\(f\\) is continuous, IVT guarantees a root.\n\nAP graders want all three things spelled out: (1) continuity stated explicitly, (2) endpoint values named, (3) conclusion with \"by IVT\" and \"there exists \\(c\\) in \\((a, b)\\).\" Miss any piece and you lose the point.",
    keyIdeas: [
      "Continuity on closed interval is required.",
      "Conclusion: every \\(y\\) between \\(f(a)\\) and \\(f(b)\\) is hit.",
      "Existence only — doesn't locate \\(c\\).",
      "FRQ script: state continuity, endpoint values, IVT.",
    ],
    workedExample: {
      prompt:
        "Show that \\(x^3 + x - 1 = 0\\) has a solution in \\((0, 1)\\).",
      solution:
        "Let \\(f(x) = x^3 + x - 1\\). \\(f\\) is continuous (polynomial). \\(f(0) = -1 < 0\\) and \\(f(1) = 1 > 0\\). Since 0 lies between \\(-1\\) and 1, by IVT there exists \\(c \\in (0, 1)\\) with \\(f(c) = 0\\).",
    },
    flashcards: [
      { q: "IVT hypotheses?", a: "Continuous on closed interval \\([a, b]\\)." },
      { q: "IVT conclusion?", a: "For every \\(N\\) between \\(f(a)\\) and \\(f(b)\\), some \\(c \\in (a, b)\\) has \\(f(c) = N\\)." },
      { q: "Does IVT locate \\(c\\)?", a: "No — existence only." },
    ],
    commonMistakes: [
      "Forgetting to verify continuity.",
      "Using open interval values for a closed-interval theorem.",
      "Claiming uniqueness — IVT only says \"at least one.\"",
    ],
    quiz: [
      {
        q: "IVT requires \\(f\\) to be:",
        choices: ["Differentiable on \\([a,b]\\)", "Continuous on \\([a,b]\\)", "Increasing on \\([a,b]\\)", "Bounded on \\([a,b]\\)"],
        answerIndex: 1,
        explanation: "Only continuity is required.",
      },
      {
        q: "If \\(f\\) is continuous on \\([1, 4]\\), \\(f(1) = -2\\), \\(f(4) = 5\\), which must be true?",
        choices: [
          "\\(f(c) = 0\\) for some \\(c \\in (1, 4)\\)",
          "\\(f\\) is increasing on \\((1, 4)\\)",
          "\\(f(c) = 6\\) for some \\(c\\)",
          "\\(f(c) = -3\\) for some \\(c\\)",
        ],
        answerIndex: 0,
        explanation: "0 is between \\(-2\\) and 5; IVT guarantees a root.",
      },
      {
        q: "Which conclusion does NOT follow from IVT on \\([a, b]\\)?",
        choices: [
          "Existence of \\(c\\) with \\(f(c) = N\\) for \\(N\\) between endpoints",
          "\\(f\\) hits every \\(y\\)-value between the endpoint values",
          "\\(c\\) is unique",
          "\\(c \\in (a, b)\\)",
        ],
        answerIndex: 2,
        explanation: "Uniqueness is not guaranteed by IVT.",
      },
      {
        q: "On an AP FRQ, a full IVT justification must include:",
        choices: [
          "A derivative computation",
          "Statement of continuity, endpoint values, and IVT conclusion",
          "A graph sketch",
          "Calculator steps",
        ],
        answerIndex: 1,
        explanation: "Graders look for the three-part argument: continuity, values, IVT.",
      },
    ],
  },

  "2.1": {
    id: "2.1",
    title: "Defining Average and Instantaneous Rates of Change at a Point",
    summary:
      "Average rate over \\([a, a+h]\\) is \\((f(a+h)-f(a))/h\\); its limit as \\(h \\to 0\\) is the instantaneous rate.",
    lesson:
      "Average and instantaneous rates are the two faces of differentiation. The average rate of change on \\([a, a+h]\\) is the difference quotient \\((f(a+h) - f(a))/h\\) — equivalently, the slope of the secant line. Letting \\(h \\to 0\\) collapses the secant into the tangent and gives the instantaneous rate, \\(f'(a)\\).\n\nBoth forms appear on the AP: numerical (\"estimate \\(f'(2)\\) using the data\") and symbolic (\"use the limit definition to find \\(f'(a)\\)\"). Know both.\n\nUnits always tag along. If \\(f(t)\\) is position in meters and \\(t\\) is in seconds, the average rate is in m/s — the average velocity. Same units for the instantaneous rate, which is the velocity.",
    keyIdeas: [
      "Average rate on \\([a, b]\\): \\((f(b)-f(a))/(b-a)\\).",
      "Instantaneous rate: \\(\\lim_{h \\to 0} (f(a+h)-f(a))/h\\).",
      "Geometric: secant slope \\(\\to\\) tangent slope.",
      "Units: output units over input units.",
    ],
    workedExample: {
      prompt:
        "\\(f(t) = t^2\\). Find average rate on \\([1, 1.5]\\) and instantaneous rate at \\(t = 1\\).",
      solution:
        "Average: \\((2.25 - 1)/0.5 = 2.5\\). Instantaneous: \\(\\lim_{h \\to 0} ((1+h)^2 - 1)/h = \\lim(2 + h) = 2\\).",
    },
    flashcards: [
      { q: "Average rate of change formula?", a: "\\((f(b) - f(a))/(b - a)\\)." },
      { q: "Instantaneous rate as a limit?", a: "\\(\\lim_{h \\to 0}(f(a+h) - f(a))/h\\)." },
    ],
    commonMistakes: [
      "Plugging \\(h = 0\\) directly.",
      "Forgetting units in context problems.",
      "Confusing average and instantaneous rates.",
    ],
    quiz: [
      {
        q: "Average rate of change of \\(f(x) = x^2 + 1\\) on \\([1, 3]\\):",
        choices: ["2", "4", "5", "8"],
        answerIndex: 1,
        explanation: "\\((10 - 2)/2 = 4\\).",
      },
      {
        q: "Instantaneous rate at \\(a\\) equals what geometrically?",
        choices: ["Secant slope at \\(a\\)", "Tangent slope at \\(a\\)", "y-intercept", "Vertical asymptote"],
        answerIndex: 1,
        explanation: "Instantaneous rate = tangent slope.",
      },
      {
        q: "If position \\(s(t)\\) is in ft and \\(t\\) in seconds, instantaneous rate of change of \\(s\\) has units:",
        choices: ["ft", "sec", "ft/sec", "ft/sec²"],
        answerIndex: 2,
        explanation: "Velocity units.",
      },
      {
        q: "As \\(h \\to 0\\) in \\((f(a+h)-f(a))/h\\), the quantity becomes:",
        choices: [
          "Always 0",
          "The derivative \\(f'(a)\\) (if the limit exists)",
          "Always infinite",
          "\\(f(a)\\)",
        ],
        answerIndex: 1,
        explanation: "By definition of the derivative.",
      },
    ],
  },

  "2.2": {
    id: "2.2",
    title: "Defining the Derivative of a Function and Using Derivative Notation",
    summary:
      "\\(f'(x) = \\lim_{h \\to 0}(f(x+h) - f(x))/h\\); notations: \\(f'(x)\\), \\(dy/dx\\), \\(\\frac{d}{dx}[f(x)]\\).",
    lesson:
      "The derivative of \\(f\\) at \\(x\\) is the function that returns the instantaneous rate of change at each point where the limit exists. Two equivalent forms: \\(f'(x) = \\lim_{h \\to 0}(f(x+h)-f(x))/h\\) and \\(f'(a) = \\lim_{x \\to a}(f(x) - f(a))/(x - a)\\). They interchange in proofs.\n\nLeibniz notation \\(dy/dx\\) emphasizes dependent/independent variables and makes chain rule and implicit differentiation more readable. Prime notation \\(f'\\) is compact and ideal for stating theorems. \\(\\frac{d}{dx}\\) is an operator that acts on the function following it.\n\nThe derivative is itself a function. Its value at each point is a number — the slope of the tangent line there. On AP questions, be fluent in all three notations and choose the one that makes the problem cleanest.",
    keyIdeas: [
      "Two limit definitions; both appear on the AP.",
      "\\(f'(x)\\), \\(dy/dx\\), \\(\\frac{d}{dx}[f(x)]\\) all denote the derivative.",
      "Derivative is a function; evaluating at \\(x = a\\) gives a number.",
      "Leibniz notation helps with substitutions and chain rule.",
    ],
    workedExample: {
      prompt:
        "Use the definition to find \\(f'(x)\\) for \\(f(x) = x^2 + 3x\\).",
      solution:
        "\\(\\lim_{h \\to 0}[(x+h)^2 + 3(x+h) - x^2 - 3x]/h = \\lim(2x + h + 3) = 2x + 3\\).",
    },
    flashcards: [
      { q: "Two forms of the derivative definition?", a: "\\(\\lim_{h \\to 0}(f(x+h)-f(x))/h\\) and \\(\\lim_{x \\to a}(f(x)-f(a))/(x-a)\\)." },
      { q: "What does \\(dy/dx\\) mean?", a: "The derivative of \\(y\\) with respect to \\(x\\)." },
    ],
    commonMistakes: [
      "Forgetting parentheses when substituting \\(x + h\\).",
      "Treating \\(dy/dx\\) as a literal fraction (works for chain rule but not always).",
      "Writing \\(f'\\) but computing \\(f(x+h)\\) only.",
    ],
    quiz: [
      {
        q: "Which is a valid limit definition of \\(f'(a)\\)?",
        choices: [
          "\\(\\lim_{x \\to a}(f(x) - f(a))/(x - a)\\)",
          "\\(\\lim_{x \\to a}(f(x) + f(a))/(x + a)\\)",
          "\\(\\lim_{x \\to a} f(x) - f(a)\\)",
          "\\(\\lim_{h \\to \\infty}(f(a+h)-f(a))/h\\)",
        ],
        answerIndex: 0,
        explanation: "Classic alternate form of the derivative.",
      },
      {
        q: "\\(\\frac{d}{dx}[x^3]\\) using definition gives:",
        choices: ["\\(3x^2\\)", "\\(3x\\)", "\\(x^2\\)", "\\(3x^3\\)"],
        answerIndex: 0,
        explanation: "Standard power rule derivative.",
      },
      {
        q: "\\(dy/dx\\) is best read as:",
        choices: [
          "A fraction of differentials",
          "The derivative of \\(y\\) with respect to \\(x\\)",
          "An infinitesimal division",
          "A limit value at a point",
        ],
        answerIndex: 1,
        explanation: "Leibniz notation for the derivative.",
      },
      {
        q: "Which notation uses prime symbols?",
        choices: ["\\(dy/dx\\)", "\\(f'(x)\\)", "\\(\\frac{d}{dx}[f(x)]\\)", "\\(\\Delta y / \\Delta x\\)"],
        answerIndex: 1,
        explanation: "Prime notation is \\(f'(x)\\).",
      },
    ],
  },

  "2.3": {
    id: "2.3",
    title: "Estimating Derivatives of a Function at a Point",
    summary:
      "Estimate \\(f'(a)\\) numerically with a small-\\(h\\) difference quotient or graphically with a tangent slope.",
    lesson:
      "When you don't have a formula, estimate. Methods:\n\n1) Symmetric difference quotient: \\((f(a+h) - f(a-h))/(2h)\\). Often more accurate than the one-sided difference for a given \\(h\\).\n\n2) Forward or backward difference: \\((f(a+h) - f(a))/h\\) — pick based on data availability.\n\n3) Graphical: draw a tangent line at \\(x = a\\), pick two points on the tangent, compute rise/run.\n\n4) Calculator: nDeriv on a TI, or d/dx at a point on most calculators — permitted on calculator-active sections.\n\nOn the AP, tabular FRQs love the symmetric difference because the data typically bracket the point.",
    keyIdeas: [
      "Small-\\(h\\) difference quotient estimates \\(f'(a)\\).",
      "Symmetric difference typically more accurate.",
      "Graphical estimate: slope of tangent drawn by eye.",
      "Calculator: numerical derivative is fair on calculator sections.",
    ],
    workedExample: {
      prompt:
        "Table: \\(f(1.9) = 2.5, f(2.1) = 3.1\\). Estimate \\(f'(2)\\).",
      solution:
        "Symmetric: \\((3.1 - 2.5)/(2.1 - 1.9) = 0.6/0.2 = 3\\). So \\(f'(2) \\approx 3\\).",
    },
    flashcards: [
      { q: "Symmetric difference quotient?", a: "\\((f(a+h)-f(a-h))/(2h)\\)." },
      { q: "Which is usually more accurate: one-sided or symmetric?", a: "Symmetric, for equal \\(h\\)." },
    ],
    commonMistakes: [
      "Dividing by \\(h\\) instead of \\(2h\\) in the symmetric formula.",
      "Using too-large \\(h\\) and over-smoothing the estimate.",
      "Estimating from a graph without carefully identifying two tangent points.",
    ],
    quiz: [
      {
        q: "Best formula for estimating \\(f'(a)\\) from table values \\(f(a-h)\\) and \\(f(a+h)\\):",
        choices: [
          "\\((f(a+h) - f(a-h))/(2h)\\)",
          "\\((f(a+h) - f(a-h))/h\\)",
          "\\((f(a+h) + f(a-h))/(2h)\\)",
          "\\((f(a+h) \\cdot f(a-h))/h\\)",
        ],
        answerIndex: 0,
        explanation: "Symmetric difference quotient.",
      },
      {
        q: "From \\(f(3) = 5, f(3.1) = 5.7\\), a forward-difference estimate for \\(f'(3)\\):",
        choices: ["0.7", "7", "5", "0.07"],
        answerIndex: 1,
        explanation: "\\((5.7 - 5)/0.1 = 7\\).",
      },
      {
        q: "A graph's tangent at \\(x = 2\\) passes through \\((2, 4)\\) and \\((4, 8)\\). \\(f'(2) \\approx\\)",
        choices: ["1", "2", "3", "4"],
        answerIndex: 1,
        explanation: "Slope \\((8-4)/(4-2) = 2\\).",
      },
      {
        q: "Which error makes an estimated derivative least trustworthy?",
        choices: [
          "Using a smaller \\(h\\)",
          "Using a large \\(h\\) and assuming smoothness",
          "Using the symmetric difference",
          "Evaluating with a calculator",
        ],
        answerIndex: 1,
        explanation: "Large \\(h\\) can average away real behavior.",
      },
    ],
  },

  "2.4": {
    id: "2.4",
    title: "Connecting Differentiability and Continuity",
    summary:
      "Differentiable \\(\\Rightarrow\\) continuous, but not vice versa. Corners, cusps, and vertical tangents block differentiability.",
    lesson:
      "If \\(f'(a)\\) exists, then \\(f\\) is continuous at \\(a\\). The proof: \\(\\lim_{x \\to a}(f(x) - f(a)) = \\lim (x - a) \\cdot (f(x)-f(a))/(x-a) = 0 \\cdot f'(a) = 0\\).\n\nThe converse fails. \\(f(x) = |x|\\) is continuous at 0 but has a corner — left derivative \\(-1\\), right derivative \\(+1\\) — so \\(f'(0)\\) does not exist. Similarly \\(f(x) = x^{1/3}\\) has a vertical tangent at 0 (infinite slope).\n\nThree classic reasons differentiability fails: (1) discontinuity (automatically), (2) corner/cusp (one-sided derivatives disagree), (3) vertical tangent (slope \\(\\to \\pm\\infty\\)). On the AP FRQ, cite these explicitly when arguing a function isn't differentiable.",
    keyIdeas: [
      "Differentiable \\(\\Rightarrow\\) continuous.",
      "Continuous \\(\\not\\Rightarrow\\) differentiable.",
      "Corner, cusp, vertical tangent, or discontinuity each blocks differentiability.",
      "Compare left/right derivatives at piecewise seams.",
    ],
    workedExample: {
      prompt:
        "Is \\(f(x) = |x - 3|\\) differentiable at \\(x = 3\\)?",
      solution:
        "Left: slope \\(-1\\). Right: slope \\(+1\\). Unequal, so no derivative at 3 (corner).",
    },
    flashcards: [
      { q: "Does differentiable imply continuous?", a: "Yes." },
      { q: "Does continuous imply differentiable?", a: "No — corners, cusps, vertical tangents break it." },
    ],
    commonMistakes: [
      "Claiming \\(|x|\\) is differentiable at 0.",
      "Forgetting to check continuity first when assessing differentiability.",
      "Ignoring vertical tangents.",
    ],
    quiz: [
      {
        q: "Which function is continuous at 0 but NOT differentiable there?",
        choices: ["\\(x^2\\)", "\\(x^3\\)", "\\(|x|\\)", "\\(\\sin x\\)"],
        answerIndex: 2,
        explanation: "\\(|x|\\) has a corner at 0.",
      },
      {
        q: "If \\(f'(a)\\) exists, then \\(f\\) at \\(a\\) is:",
        choices: ["Continuous", "Discontinuous", "Undefined", "Integer-valued"],
        answerIndex: 0,
        explanation: "Differentiability forces continuity.",
      },
      {
        q: "A graph shows a cusp at \\(x = 1\\). At \\(x = 1\\), \\(f\\) is:",
        choices: [
          "Differentiable and continuous",
          "Continuous but not differentiable",
          "Differentiable but not continuous",
          "Neither",
        ],
        answerIndex: 1,
        explanation: "Cusps are continuous but not differentiable.",
      },
      {
        q: "A function has \\(\\lim_{x \\to a^-} f'(x) = 2\\) and \\(\\lim_{x \\to a^+} f'(x) = 5\\). At \\(a\\), if continuous:",
        choices: [
          "\\(f'(a) = 3.5\\)",
          "\\(f'(a)\\) does not exist (corner)",
          "\\(f\\) is discontinuous",
          "\\(f'(a) = 7\\)",
        ],
        answerIndex: 1,
        explanation: "Different one-sided slopes = corner; derivative fails.",
      },
    ],
  },

  "2.5": {
    id: "2.5",
    title: "Applying the Power Rule",
    summary:
      "\\(\\frac{d}{dx}[x^n] = n x^{n-1}\\) for any real \\(n\\).",
    lesson:
      "The power rule is the workhorse of early differentiation. For any real \\(n\\), \\(\\frac{d}{dx}[x^n] = n x^{n-1}\\). It covers integer, rational, and irrational exponents. Combine with constant multiple and sum rules to differentiate any polynomial.\n\nRewrite before differentiating when the function isn't already in power form. \\(1/x^3 = x^{-3}\\); \\(\\sqrt{x} = x^{1/2}\\); \\(\\sqrt[3]{x^2} = x^{2/3}\\). Negative and fractional exponents are fair game.\n\nOn AP MC, the power rule shows up everywhere. Slow-down mistakes: forgetting to subtract 1 from the exponent; forgetting negative signs in negative exponents after differentiation.",
    keyIdeas: [
      "\\(\\frac{d}{dx}[x^n] = n x^{n-1}\\) for all real \\(n\\).",
      "Rewrite radicals and reciprocals as powers first.",
      "Works with constant multiples: \\((cf)' = c f'\\).",
      "Sum rule: derivative of a sum = sum of derivatives.",
    ],
    workedExample: {
      prompt:
        "Find \\(f'(x)\\) for \\(f(x) = 3\\sqrt{x} + 2/x^2\\).",
      solution:
        "Rewrite: \\(3x^{1/2} + 2x^{-2}\\). Differentiate: \\(\\frac{3}{2}x^{-1/2} - 4 x^{-3}\\). Or \\(\\frac{3}{2\\sqrt{x}} - 4/x^3\\).",
    },
    flashcards: [
      { q: "Power rule formula?", a: "\\(\\frac{d}{dx}[x^n] = n x^{n-1}\\)." },
      { q: "Derivative of \\(\\sqrt{x}\\)?", a: "\\(1/(2\\sqrt{x})\\)." },
      { q: "Derivative of \\(1/x\\)?", a: "\\(-1/x^2\\)." },
    ],
    commonMistakes: [
      "Forgetting to subtract 1 from the exponent.",
      "Sign error on negative exponents.",
      "Treating constants as \\(x\\)-dependent.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}[x^5]\\) =",
        choices: ["\\(x^4\\)", "\\(5x^4\\)", "\\(5x^5\\)", "\\(x^5/5\\)"],
        answerIndex: 1,
        explanation: "Power rule: 5x^4.",
      },
      {
        q: "\\(\\frac{d}{dx}[1/x^4]\\) =",
        choices: ["\\(-4/x^5\\)", "\\(4/x^3\\)", "\\(-1/(4x^3)\\)", "\\(-4 x^3\\)"],
        answerIndex: 0,
        explanation: "\\(x^{-4}\\) differentiated: \\(-4 x^{-5}\\).",
      },
      {
        q: "\\(\\frac{d}{dx}[x^{1/3}]\\) =",
        choices: ["\\(\\frac{1}{3} x^{-2/3}\\)", "\\(\\frac{1}{3} x^{2/3}\\)", "\\(3 x^{-2/3}\\)", "\\(x^{-2/3}\\)"],
        answerIndex: 0,
        explanation: "Power rule on fractional exponents.",
      },
      {
        q: "\\(\\frac{d}{dx}[7]\\) =",
        choices: ["7", "0", "1", "\\(7x\\)"],
        answerIndex: 1,
        explanation: "Derivative of any constant is 0.",
      },
    ],
  },

  "2.6": {
    id: "2.6",
    title: "Derivative Rules: Constant, Sum, Difference, and Constant Multiple",
    summary:
      "Derivatives distribute over sums and differences, and constants pull out — but only constants.",
    lesson:
      "Four foundational rules:\n\n1) Constant rule: \\(\\frac{d}{dx}[c] = 0\\).\n2) Constant multiple: \\(\\frac{d}{dx}[c f(x)] = c f'(x)\\).\n3) Sum rule: \\((f + g)' = f' + g'\\).\n4) Difference rule: \\((f - g)' = f' - g'\\).\n\nWith these, plus the power rule, you can differentiate any polynomial in one move. The rules do NOT extend to products or quotients — those need the product and quotient rules.\n\nAP MC questions here are usually about applying all four in one expression and cleaning up. Keep your algebra tight.",
    keyIdeas: [
      "\\(\\frac{d}{dx}[c] = 0\\).",
      "Constants pass through derivatives.",
      "Sum and difference split derivatives.",
      "Does NOT work for products or quotients.",
    ],
    workedExample: {
      prompt:
        "Find \\(f'(x)\\) for \\(f(x) = 4x^3 - 2x^2 + 7x - 9\\).",
      solution:
        "\\(f'(x) = 12x^2 - 4x + 7\\).",
    },
    flashcards: [
      { q: "Derivative of a constant?", a: "0." },
      { q: "Does \\((fg)' = f' g'\\)?", a: "No — need product rule." },
    ],
    commonMistakes: [
      "Applying sum rule to products.",
      "Forgetting the constant multiple factors through.",
      "Dropping the \\(-\\) in a difference.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}[5x^2 - 3x + 2]\\) =",
        choices: ["\\(10x - 3\\)", "\\(10x\\)", "\\(5x - 3\\)", "\\(10x + 2\\)"],
        answerIndex: 0,
        explanation: "Power + sum rules.",
      },
      {
        q: "\\(\\frac{d}{dx}[c]\\) for any constant \\(c\\) is:",
        choices: ["\\(c\\)", "0", "1", "\\(cx\\)"],
        answerIndex: 1,
        explanation: "Constants have zero derivative.",
      },
      {
        q: "\\((f - g)' =\\)",
        choices: ["\\(f' - g'\\)", "\\(f' + g'\\)", "\\(f' \\cdot g'\\)", "\\((f - g)\\)"],
        answerIndex: 0,
        explanation: "Difference rule.",
      },
      {
        q: "\\(\\frac{d}{dx}[3 \\cdot g(x)]\\) =",
        choices: ["\\(g(x)\\)", "\\(3 g'(x)\\)", "\\(3 g(x)\\)", "\\(g'(x) / 3\\)"],
        answerIndex: 1,
        explanation: "Constant multiple rule.",
      },
    ],
  },

  "2.7": {
    id: "2.7",
    title: "Derivatives of cos x, sin x, e^x, and ln x",
    summary:
      "Memorize: \\((\\sin)' = \\cos\\), \\((\\cos)' = -\\sin\\), \\((e^x)' = e^x\\), \\((\\ln x)' = 1/x\\).",
    lesson:
      "These four derivative rules are essential and come up on nearly every exam. \\(\\frac{d}{dx}[\\sin x] = \\cos x\\); \\(\\frac{d}{dx}[\\cos x] = -\\sin x\\); \\(\\frac{d}{dx}[e^x] = e^x\\); \\(\\frac{d}{dx}[\\ln x] = 1/x\\) (domain \\(x > 0\\)).\n\nBase-\\(a\\) exponential: \\(\\frac{d}{dx}[a^x] = a^x \\ln a\\). Base-\\(a\\) log: \\(\\frac{d}{dx}[\\log_a x] = 1/(x \\ln a)\\).\n\nThese rules almost always combine with chain rule. For \\(\\sin(3x)\\), the derivative is \\(\\cos(3x) \\cdot 3\\). Practice the chain rule alongside these basics from day one.",
    keyIdeas: [
      "\\((\\sin x)' = \\cos x\\).",
      "\\((\\cos x)' = -\\sin x\\) (mind the negative).",
      "\\((e^x)' = e^x\\) — unique fixed point.",
      "\\((\\ln x)' = 1/x\\).",
    ],
    workedExample: {
      prompt:
        "Find \\(g'(x)\\) for \\(g(x) = 2\\sin x - e^x + 3\\ln x\\).",
      solution:
        "\\(g'(x) = 2\\cos x - e^x + 3/x\\).",
    },
    flashcards: [
      { q: "\\(d/dx[\\cos x]\\)?", a: "\\(-\\sin x\\)." },
      { q: "\\(d/dx[e^x]\\)?", a: "\\(e^x\\)." },
      { q: "\\(d/dx[\\ln x]\\)?", a: "\\(1/x\\)." },
      { q: "\\(d/dx[a^x]\\)?", a: "\\(a^x \\ln a\\)." },
    ],
    commonMistakes: [
      "Forgetting the negative sign on \\((\\cos x)'\\).",
      "Writing \\((e^x)' = x e^{x-1}\\) (confusing with power rule).",
      "Forgetting \\(\\ln a\\) in the base-\\(a\\) exponential.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}[\\sin x]\\) =",
        choices: ["\\(\\cos x\\)", "\\(-\\cos x\\)", "\\(\\sin x\\)", "\\(-\\sin x\\)"],
        answerIndex: 0,
        explanation: "Standard rule.",
      },
      {
        q: "\\(\\frac{d}{dx}[\\ln x]\\) =",
        choices: ["\\(x\\)", "\\(e^x\\)", "\\(1/x\\)", "\\(\\ln x\\)"],
        answerIndex: 2,
        explanation: "Derivative of ln.",
      },
      {
        q: "\\(\\frac{d}{dx}[e^x]\\) =",
        choices: ["\\(x e^{x-1}\\)", "\\(e^x\\)", "\\(x e^x\\)", "\\(1\\)"],
        answerIndex: 1,
        explanation: "\\(e^x\\) is its own derivative.",
      },
      {
        q: "\\(\\frac{d}{dx}[2^x]\\) =",
        choices: ["\\(x \\cdot 2^{x-1}\\)", "\\(2^x\\)", "\\(2^x \\ln 2\\)", "\\(2 \\ln x\\)"],
        answerIndex: 2,
        explanation: "Base-\\(a\\) exponential rule.",
      },
    ],
  },

  "2.8": {
    id: "2.8",
    title: "The Product Rule",
    summary:
      "\\((fg)' = f'g + fg'\\). Differentiate each factor while keeping the other, then add.",
    lesson:
      "The product rule: \\((fg)' = f' g + f g'\\). It is NOT \\(f' g'\\) — that's the most common error.\n\nFor three factors, apply the rule twice: \\((fgh)' = f'gh + fg'h + fgh'\\). Each term differentiates one factor and leaves the others alone.\n\nStrategy: name the factors \\(u = f, v = g\\), compute \\(u', v'\\), then plug into \\(u'v + uv'\\). Simplify at the end. Often you'll be asked to evaluate at a specific point; plug in numbers after applying the rule.",
    keyIdeas: [
      "\\((fg)' = f'g + fg'\\).",
      "Three-factor version: differentiate one factor per term.",
      "Not equal to \\(f' g'\\).",
      "Evaluate at a point only after fully expanding.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\frac{d}{dx}[x^2 \\sin x]\\).",
      solution:
        "\\(f = x^2, g = \\sin x\\). \\(f' = 2x, g' = \\cos x\\). Product rule: \\(2x \\sin x + x^2 \\cos x\\).",
    },
    flashcards: [
      { q: "Product rule formula?", a: "\\((fg)' = f'g + fg'\\)." },
      { q: "Is \\((fg)' = f'g'\\) ever true?", a: "Only in unusual coincidences — it's not a general rule." },
    ],
    commonMistakes: [
      "Writing \\(f' g'\\) instead of \\(f' g + f g'\\).",
      "Forgetting one of the two terms.",
      "Applying product rule when the quotient rule is needed.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}[x e^x]\\) =",
        choices: ["\\(e^x\\)", "\\(x e^x\\)", "\\(e^x + x e^x\\)", "\\(x e^{x-1}\\)"],
        answerIndex: 2,
        explanation: "Product rule: \\(1 \\cdot e^x + x \\cdot e^x\\).",
      },
      {
        q: "\\(\\frac{d}{dx}[(3x+1)(x^2 - 4)]\\) =",
        choices: [
          "\\(3(x^2 - 4) + (3x+1)(2x)\\)",
          "\\(6x\\)",
          "\\(3 \\cdot 2x\\)",
          "\\((3x+1) + (x^2 - 4)\\)",
        ],
        answerIndex: 0,
        explanation: "Apply \\(f'g + fg'\\).",
      },
      {
        q: "If \\(f(2) = 3, g(2) = -1, f'(2) = 4, g'(2) = 5\\), then \\((fg)'(2)\\) =",
        choices: ["\\(15\\)", "\\(11\\)", "\\(19\\)", "\\(-1\\)"],
        answerIndex: 1,
        explanation: "\\(4 \\cdot (-1) + 3 \\cdot 5 = -4 + 15 = 11\\).",
      },
      {
        q: "Which is the correct product rule?",
        choices: [
          "\\((fg)' = f' + g'\\)",
          "\\((fg)' = f'g'\\)",
          "\\((fg)' = f'g + fg'\\)",
          "\\((fg)' = f g + f g\\)",
        ],
        answerIndex: 2,
        explanation: "Standard form.",
      },
    ],
  },

  "2.9": {
    id: "2.9",
    title: "The Quotient Rule",
    summary:
      "\\(\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}\\). Top prime bottom minus top bottom prime, over bottom squared.",
    lesson:
      "The quotient rule: for \\(h(x) = f(x)/g(x)\\) where \\(g(x) \\ne 0\\), \\(h'(x) = (f'g - fg')/g^2\\). Order matters — reversing gives the wrong sign.\n\nMemory aid: \"low d-high minus high d-low, square the bottom and away we go.\" Or LHS style: (bottom × d top − top × d bottom) / (bottom)^2.\n\nOften, you can rewrite a quotient to avoid the rule — especially when the denominator is a monomial. \\(f(x)/x^3\\) becomes \\(f(x) \\cdot x^{-3}\\), then use product rule. Sometimes the quotient rule is the cleanest; use judgment.",
    keyIdeas: [
      "Quotient rule: \\((f/g)' = (f'g - fg')/g^2\\).",
      "Order matters — don't swap.",
      "Square the denominator.",
      "Consider rewriting to avoid the rule when denominator is simple.",
    ],
    workedExample: {
      prompt:
        "Differentiate \\(h(x) = (x^2 + 1)/(x - 2)\\).",
      solution:
        "\\(f = x^2 + 1, g = x - 2\\). \\(f' = 2x, g' = 1\\). \\(h'(x) = [2x(x-2) - (x^2+1)(1)]/(x-2)^2 = (2x^2 - 4x - x^2 - 1)/(x-2)^2 = (x^2 - 4x - 1)/(x-2)^2\\).",
    },
    flashcards: [
      { q: "Quotient rule formula?", a: "\\((f/g)' = (f'g - fg')/g^2\\)." },
      { q: "What if the denominator is \\(x^3\\)?", a: "Rewrite as \\(f \\cdot x^{-3}\\); product rule is cleaner." },
    ],
    commonMistakes: [
      "Forgetting the minus sign.",
      "Swapping the order to \\((fg' - f'g)/g^2\\).",
      "Forgetting to square the denominator.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}[(3x)/(x^2+1)]\\) =",
        choices: [
          "\\((3(x^2+1) - 3x \\cdot 2x)/(x^2+1)^2\\)",
          "\\((3x - 6x^2)/(x^2+1)^2\\)",
          "\\(3/(x^2+1)\\)",
          "\\((x^2+1)/3x\\)",
        ],
        answerIndex: 0,
        explanation: "Quotient rule applied.",
      },
      {
        q: "Order in quotient rule is:",
        choices: [
          "\\((fg' - f'g)/g^2\\)",
          "\\((f'g - fg')/g^2\\)",
          "\\((f'g + fg')/g^2\\)",
          "\\((f' - g')/g^2\\)",
        ],
        answerIndex: 1,
        explanation: "Top prime bottom minus top bottom prime.",
      },
      {
        q: "If \\(f(1) = 2, f'(1) = 3, g(1) = 4, g'(1) = -1\\), \\((f/g)'(1)\\) =",
        choices: [
          "\\(7/16\\)",
          "\\(14/16\\)",
          "\\(1/16\\)",
          "\\(12/16\\)",
        ],
        answerIndex: 1,
        explanation: "\\((3 \\cdot 4 - 2 \\cdot (-1))/16 = 14/16\\).",
      },
      {
        q: "Which rewrite avoids the quotient rule entirely for \\(x^2/x^5\\)?",
        choices: [
          "\\(x^{-3}\\)",
          "\\(x^{-10}\\)",
          "\\(1/x^3\\) then quotient rule",
          "Not possible",
        ],
        answerIndex: 0,
        explanation: "Simplify to \\(x^{-3}\\), use power rule.",
      },
    ],
  },

  "2.10": {
    id: "2.10",
    title: "Finding the Derivatives of Tangent, Cotangent, Secant, and/or Cosecant Functions",
    summary:
      "Memorize: \\((\\tan)' = \\sec^2\\), \\((\\cot)' = -\\csc^2\\), \\((\\sec)' = \\sec \\tan\\), \\((\\csc)' = -\\csc \\cot\\).",
    lesson:
      "Each of these derives from sin/cos via quotient rule, but memorize:\n\n\\(\\frac{d}{dx}[\\tan x] = \\sec^2 x\\).\n\\(\\frac{d}{dx}[\\cot x] = -\\csc^2 x\\).\n\\(\\frac{d}{dx}[\\sec x] = \\sec x \\tan x\\).\n\\(\\frac{d}{dx}[\\csc x] = -\\csc x \\cot x\\).\n\nMnemonic: the \"co-\" versions (cot, csc) carry negative signs.\n\nDomain: \\(\\tan, \\sec\\) undefined at odd multiples of \\(\\pi/2\\); \\(\\cot, \\csc\\) undefined at multiples of \\(\\pi\\). Derivatives fail where the function fails.\n\nChain rule combines with these constantly. \\(\\frac{d}{dx}[\\sec(5x)] = \\sec(5x)\\tan(5x) \\cdot 5\\).",
    keyIdeas: [
      "Four trig derivatives to memorize.",
      "Co-versions are negative.",
      "Derivatives undefined wherever function is.",
      "Combine with chain rule on exam.",
    ],
    workedExample: {
      prompt:
        "\\(f(x) = 2\\sec x - \\tan(3x)\\). Find \\(f'(x)\\).",
      solution:
        "\\(f'(x) = 2 \\sec x \\tan x - \\sec^2(3x) \\cdot 3 = 2 \\sec x \\tan x - 3 \\sec^2(3x)\\).",
    },
    flashcards: [
      { q: "\\(d/dx[\\tan x]\\)?", a: "\\(\\sec^2 x\\)." },
      { q: "\\(d/dx[\\sec x]\\)?", a: "\\(\\sec x \\tan x\\)." },
      { q: "\\(d/dx[\\csc x]\\)?", a: "\\(-\\csc x \\cot x\\)." },
      { q: "\\(d/dx[\\cot x]\\)?", a: "\\(-\\csc^2 x\\)." },
    ],
    commonMistakes: [
      "Missing negative on \\((\\cot)'\\) or \\((\\csc)'\\).",
      "Writing \\((\\tan)' = \\tan^2\\) (should be \\(\\sec^2\\)).",
      "Forgetting chain factor on composite trig.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}[\\tan x]\\) =",
        choices: ["\\(\\sec x\\)", "\\(\\sec^2 x\\)", "\\(-\\csc^2 x\\)", "\\(\\tan^2 x\\)"],
        answerIndex: 1,
        explanation: "Classic result.",
      },
      {
        q: "\\(\\frac{d}{dx}[\\sec x]\\) =",
        choices: ["\\(\\sec x \\tan x\\)", "\\(\\tan x\\)", "\\(\\sec^2 x\\)", "\\(-\\sec x \\cot x\\)"],
        answerIndex: 0,
        explanation: "Product form.",
      },
      {
        q: "\\(\\frac{d}{dx}[\\cot x]\\) =",
        choices: ["\\(\\csc^2 x\\)", "\\(-\\csc^2 x\\)", "\\(\\tan x\\)", "\\(-\\cot x \\csc x\\)"],
        answerIndex: 1,
        explanation: "Negative of \\(\\csc^2\\).",
      },
      {
        q: "\\(\\frac{d}{dx}[\\csc(2x)]\\) =",
        choices: [
          "\\(-\\csc(2x) \\cot(2x) \\cdot 2\\)",
          "\\(\\csc(2x) \\cot(2x)\\)",
          "\\(-\\csc^2(2x)\\)",
          "\\(2 \\csc(2x)\\)",
        ],
        answerIndex: 0,
        explanation: "Chain rule on \\(\\csc\\).",
      },
    ],
  },

  "3.1": {
    id: "3.1",
    title: "The Chain Rule",
    summary:
      "\\(\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)\\). Differentiate outside, leaving inside untouched, then multiply by derivative of inside.",
    lesson:
      "The chain rule is the most-tested derivative rule on the AP. For a composition \\(y = f(g(x))\\), the derivative is \\(f'(g(x)) \\cdot g'(x)\\). In Leibniz notation: \\(dy/dx = dy/du \\cdot du/dx\\) where \\(u = g(x)\\).\n\nWorkflow: identify outer and inner, take outer derivative at the inner expression, multiply by inner derivative. For \\((3x + 1)^5\\): outer is \\(u^5\\), inner is \\(3x + 1\\); derivative \\(5(3x+1)^4 \\cdot 3 = 15(3x+1)^4\\).\n\nChain rule nests. For \\(\\sin(\\sqrt{x^2 + 1})\\), outer is \\(\\sin\\), middle is \\(\\sqrt{\\cdot}\\), inner is \\(x^2 + 1\\). Differentiate from the outside in, multiplying each chain factor.\n\nExam graders check for the chain factor — missing it is the single most common derivative error.",
    keyIdeas: [
      "\\((f \\circ g)' = f'(g) \\cdot g'\\).",
      "Differentiate outside, multiply by inside derivative.",
      "Chain rule nests as deep as you need.",
      "Missing the inside derivative is the classic trap.",
    ],
    workedExample: {
      prompt: "Differentiate \\(y = \\sin(x^2)\\).",
      solution:
        "Outer \\(\\sin(u)\\), inner \\(u = x^2\\). \\(dy/dx = \\cos(x^2) \\cdot 2x = 2x \\cos(x^2)\\).",
    },
    flashcards: [
      { q: "Chain rule formula?", a: "\\((f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)\\)." },
      { q: "Leibniz version?", a: "\\(dy/dx = dy/du \\cdot du/dx\\)." },
    ],
    commonMistakes: [
      "Forgetting the inner derivative.",
      "Differentiating the inside before the outside (wrong order).",
      "Dropping chain rule on nested compositions.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}[(2x + 5)^3]\\) =",
        choices: ["\\(3(2x+5)^2\\)", "\\(6(2x+5)^2\\)", "\\(3(2x+5)^2 \\cdot 2\\)", "\\((2x+5)^3 \\cdot 2\\)"],
        answerIndex: 2,
        explanation: "Outer derivative times inner derivative \\(2\\).",
      },
      {
        q: "\\(\\frac{d}{dx}[e^{x^2}]\\) =",
        choices: ["\\(e^{x^2}\\)", "\\(2x e^{x^2}\\)", "\\(2x^2 e^{x^2}\\)", "\\(e^{2x}\\)"],
        answerIndex: 1,
        explanation: "Chain rule with inner \\(x^2\\).",
      },
      {
        q: "\\(\\frac{d}{dx}[\\ln(\\sin x)]\\) =",
        choices: ["\\(1/\\sin x\\)", "\\(\\cos x / \\sin x = \\cot x\\)", "\\(\\tan x\\)", "\\(-\\csc^2 x\\)"],
        answerIndex: 1,
        explanation: "Chain: \\(\\frac{1}{\\sin x} \\cdot \\cos x = \\cot x\\).",
      },
      {
        q: "Which is NOT an example of the chain rule?",
        choices: [
          "\\(\\frac{d}{dx}[\\sin(2x)]\\)",
          "\\(\\frac{d}{dx}[(x+1)^5]\\)",
          "\\(\\frac{d}{dx}[x \\sin x]\\)",
          "\\(\\frac{d}{dx}[\\ln(x^2)]\\)",
        ],
        answerIndex: 2,
        explanation: "\\(x \\sin x\\) is a product, not a composition — product rule.",
      },
    ],
  },

  "3.2": {
    id: "3.2",
    title: "Implicit Differentiation",
    summary:
      "For relations not solvable for \\(y\\), differentiate both sides with respect to \\(x\\), treat \\(y\\) as a function of \\(x\\), and solve for \\(dy/dx\\).",
    lesson:
      "Some curves are defined implicitly: \\(x^2 + y^2 = 25\\), \\(x y + \\sin(y) = 1\\). Solving for \\(y\\) is messy or impossible. Implicit differentiation bypasses this.\n\nProcedure: differentiate every term with respect to \\(x\\). Whenever you differentiate a \\(y\\) expression, tack on a \\(dy/dx\\) by chain rule (since \\(y\\) depends on \\(x\\)). Then collect \\(dy/dx\\) terms on one side and solve.\n\nExample: \\(x^2 + y^2 = 25\\). Differentiating: \\(2x + 2y \\cdot dy/dx = 0 \\Rightarrow dy/dx = -x/y\\). The slope depends on both coordinates.\n\nFor higher derivatives, differentiate the implicit first derivative again, using \\(dy/dx\\) from step 1 whenever it appears.",
    keyIdeas: [
      "Treat \\(y\\) as a function of \\(x\\); every \\(d/dx\\) of a \\(y\\) term picks up \\(dy/dx\\).",
      "Collect \\(dy/dx\\) on one side; solve.",
      "Slope may depend on both \\(x\\) and \\(y\\).",
      "For \\(d^2y/dx^2\\), differentiate the first implicit derivative again.",
    ],
    workedExample: {
      prompt: "Find \\(dy/dx\\) for \\(x^2 y + y^3 = 4\\).",
      solution:
        "Differentiate: \\(2x y + x^2 \\cdot dy/dx + 3 y^2 \\cdot dy/dx = 0\\). Solve: \\(dy/dx = -2xy / (x^2 + 3y^2)\\).",
    },
    flashcards: [
      { q: "What do you do when differentiating a \\(y\\) term with respect to \\(x\\)?", a: "Apply chain rule — multiply by \\(dy/dx\\)." },
      { q: "Is implicit slope usually a function of \\(x\\) alone?", a: "No — typically depends on both \\(x\\) and \\(y\\)." },
    ],
    commonMistakes: [
      "Forgetting the \\(dy/dx\\) factor on \\(y\\) terms.",
      "Not applying product rule when \\(xy\\) appears.",
      "Dividing without moving all \\(dy/dx\\) terms to one side first.",
    ],
    quiz: [
      {
        q: "For \\(x^2 + y^2 = 9\\), \\(dy/dx\\) at \\((1, 2\\sqrt{2})\\) is:",
        choices: ["\\(-1/(2\\sqrt{2})\\)", "\\(1/(2\\sqrt{2})\\)", "\\(-2\\sqrt{2}\\)", "0"],
        answerIndex: 0,
        explanation: "\\(dy/dx = -x/y = -1/(2\\sqrt{2})\\).",
      },
      {
        q: "Why does \\(d/dx[y^2] = 2y \\cdot dy/dx\\)?",
        choices: [
          "Chain rule: \\(y\\) depends on \\(x\\)",
          "Product rule",
          "Coincidence",
          "Power rule alone",
        ],
        answerIndex: 0,
        explanation: "Chain rule, since \\(y = y(x)\\).",
      },
      {
        q: "For \\(x y = 1\\), \\(dy/dx\\) =",
        choices: ["\\(-y/x\\)", "\\(-1\\)", "\\(y/x\\)", "0"],
        answerIndex: 0,
        explanation: "Differentiate: \\(y + x \\cdot dy/dx = 0\\); solve.",
      },
      {
        q: "Implicit differentiation is needed when:",
        choices: [
          "\\(y\\) is explicitly given as \\(f(x)\\)",
          "The equation can't easily be solved for \\(y\\)",
          "\\(x\\) is a constant",
          "\\(y\\) is piecewise",
        ],
        answerIndex: 1,
        explanation: "Implicit is useful when we can't isolate \\(y\\).",
      },
    ],
  },

  "3.3": {
    id: "3.3",
    title: "Differentiating Inverse Functions",
    summary:
      "If \\(f\\) and \\(f^{-1}\\) are inverses, \\((f^{-1})'(y) = 1/f'(x)\\) where \\(y = f(x)\\).",
    lesson:
      "Inverse function derivative: \\((f^{-1})'(b) = 1/f'(a)\\) where \\(f(a) = b\\) and \\(f'(a) \\ne 0\\). Intuitively, inverses swap inputs and outputs, and slopes of tangent lines become reciprocals.\n\nTo use: given a target \\(y = b\\), find the \\(x = a\\) such that \\(f(a) = b\\). Compute \\(f'(a)\\). Then \\((f^{-1})'(b) = 1/f'(a)\\).\n\nAP FRQs like this: they give you a table of values for \\(f\\) and \\(f'\\) and ask for \\((f^{-1})'(\\text{some number})\\). Always locate the \\(x\\) where \\(f(x) = \\text{that number}\\), then reciprocate.",
    keyIdeas: [
      "\\((f^{-1})'(b) = 1/f'(a)\\) where \\(f(a) = b\\).",
      "Need \\(f'(a) \\ne 0\\) for the inverse to be differentiable at \\(b\\).",
      "Locate the right \\(x\\) before reciprocating.",
      "Derives from chain rule applied to \\(f(f^{-1}(y)) = y\\).",
    ],
    workedExample: {
      prompt:
        "Let \\(f(x) = x^3 + x\\). Find \\((f^{-1})'(10)\\).",
      solution:
        "Solve \\(f(x) = 10\\): \\(x^3 + x = 10 \\Rightarrow x = 2\\). \\(f'(x) = 3x^2 + 1\\); \\(f'(2) = 13\\). So \\((f^{-1})'(10) = 1/13\\).",
    },
    flashcards: [
      { q: "Inverse function derivative formula?", a: "\\((f^{-1})'(b) = 1/f'(a)\\) where \\(f(a) = b\\)." },
      { q: "Why must \\(f'(a) \\ne 0\\)?", a: "Division by zero; also means horizontal tangent translates to vertical tangent of inverse (not differentiable)." },
    ],
    commonMistakes: [
      "Plugging \\(b\\) directly into \\(1/f'(b)\\) instead of finding the preimage \\(a\\).",
      "Forgetting to check \\(f'(a) \\ne 0\\).",
      "Writing the reciprocal without finding \\(x\\).",
    ],
    quiz: [
      {
        q: "If \\(f(3) = 7\\) and \\(f'(3) = 2\\), then \\((f^{-1})'(7) =\\)",
        choices: ["2", "\\(1/2\\)", "3", "\\(1/3\\)"],
        answerIndex: 1,
        explanation: "\\(1/f'(3) = 1/2\\).",
      },
      {
        q: "For \\(f(x) = e^x\\), \\((f^{-1})'(1) =\\)",
        choices: ["\\(e\\)", "\\(1/e\\)", "1", "0"],
        answerIndex: 2,
        explanation: "\\(e^x = 1\\) at \\(x = 0\\); \\(f'(0) = 1\\); reciprocal is 1.",
      },
      {
        q: "At a point where \\(f'(a) = 0\\), the inverse at \\(b = f(a)\\) has:",
        choices: [
          "Horizontal tangent",
          "Vertical tangent (not differentiable)",
          "Slope 1",
          "Slope 0",
        ],
        answerIndex: 1,
        explanation: "Horizontal tangent of \\(f\\) flips to vertical tangent of \\(f^{-1}\\).",
      },
      {
        q: "Given \\(f(2) = 5, f'(2) = 1/4\\), \\((f^{-1})'(5) =\\)",
        choices: ["\\(1/4\\)", "4", "5", "\\(-4\\)"],
        answerIndex: 1,
        explanation: "Reciprocal: \\(1/(1/4) = 4\\).",
      },
    ],
  },

  "3.4": {
    id: "3.4",
    title: "Differentiating Inverse Trigonometric Functions",
    summary:
      "\\((\\arcsin x)' = 1/\\sqrt{1-x^2}\\), \\((\\arctan x)' = 1/(1+x^2)\\), \\((\\text{arcsec} x)' = 1/(|x|\\sqrt{x^2 - 1})\\).",
    lesson:
      "Memorize the inverse trig derivatives:\n\n\\(\\frac{d}{dx}[\\arcsin x] = \\frac{1}{\\sqrt{1 - x^2}}\\)\n\\(\\frac{d}{dx}[\\arccos x] = -\\frac{1}{\\sqrt{1 - x^2}}\\)\n\\(\\frac{d}{dx}[\\arctan x] = \\frac{1}{1 + x^2}\\)\n\\(\\frac{d}{dx}[\\text{arccot}\\, x] = -\\frac{1}{1 + x^2}\\)\n\\(\\frac{d}{dx}[\\text{arcsec}\\, x] = \\frac{1}{|x|\\sqrt{x^2 - 1}}\\)\n\\(\\frac{d}{dx}[\\text{arccsc}\\, x] = -\\frac{1}{|x|\\sqrt{x^2 - 1}}\\)\n\nThe \"co-\" inverses are negatives. Derive the arcsine one by implicit differentiation of \\(\\sin y = x\\): \\(\\cos y \\cdot dy/dx = 1 \\Rightarrow dy/dx = 1/\\cos y = 1/\\sqrt{1 - x^2}\\).\n\nChain rule combines: \\(\\frac{d}{dx}[\\arctan(3x)] = 1/(1 + 9x^2) \\cdot 3\\).",
    keyIdeas: [
      "Six inverse trig derivatives; co-versions negative.",
      "Derivations use implicit differentiation.",
      "Always multiply by inner derivative (chain rule).",
      "Denominator tells you the domain restriction.",
    ],
    workedExample: {
      prompt:
        "Differentiate \\(y = \\arctan(x^2)\\).",
      solution:
        "\\(dy/dx = \\frac{1}{1 + (x^2)^2} \\cdot 2x = \\frac{2x}{1 + x^4}\\).",
    },
    flashcards: [
      { q: "\\(d/dx[\\arcsin x]\\)?", a: "\\(1/\\sqrt{1 - x^2}\\)." },
      { q: "\\(d/dx[\\arctan x]\\)?", a: "\\(1/(1 + x^2)\\)." },
      { q: "\\(d/dx[\\arccos x]\\)?", a: "\\(-1/\\sqrt{1 - x^2}\\)." },
    ],
    commonMistakes: [
      "Forgetting the minus on arccos / arccot / arccsc.",
      "Missing the chain factor.",
      "Confusing arcsec with arctan derivative.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}[\\arcsin x]\\) =",
        choices: ["\\(-1/\\sqrt{1-x^2}\\)", "\\(1/\\sqrt{1-x^2}\\)", "\\(1/(1+x^2)\\)", "\\(-1/(1+x^2)\\)"],
        answerIndex: 1,
        explanation: "Standard.",
      },
      {
        q: "\\(\\frac{d}{dx}[\\arctan(2x)]\\) =",
        choices: ["\\(1/(1+2x^2)\\)", "\\(2/(1+4x^2)\\)", "\\(2/(1+2x^2)\\)", "\\(1/(1+4x^2)\\)"],
        answerIndex: 1,
        explanation: "Chain rule: \\(2\\) from inner derivative.",
      },
      {
        q: "\\(\\frac{d}{dx}[\\arccos x]\\) =",
        choices: ["\\(1/\\sqrt{1-x^2}\\)", "\\(-1/\\sqrt{1-x^2}\\)", "\\(-1/(1+x^2)\\)", "\\(1/(|x|\\sqrt{x^2-1})\\)"],
        answerIndex: 1,
        explanation: "Negative of arcsin derivative.",
      },
      {
        q: "\\(\\frac{d}{dx}[\\arctan(e^x)]\\) =",
        choices: ["\\(e^x/(1 + e^x)\\)", "\\(e^x/(1 + e^{2x})\\)", "\\(1/(1 + e^x)\\)", "\\(e^x/(1 + x^2)\\)"],
        answerIndex: 1,
        explanation: "Chain: inner derivative \\(e^x\\), inner squared \\(e^{2x}\\).",
      },
    ],
  },

  "3.5": {
    id: "3.5",
    title: "Selecting Procedures for Calculating Derivatives",
    summary:
      "A triage: identify composition, product, quotient, or basic form, and pick the right rule(s).",
    lesson:
      "Quick decision tree:\n\n- Polynomial terms? Power rule + sum rule.\n- Product of functions? Product rule.\n- Quotient? Quotient rule (or rewrite).\n- Composition (function of a function)? Chain rule.\n- Implicit (mixed \\(x\\) and \\(y\\))? Implicit differentiation.\n- Inverse functions / inverse trig? Memorized formulas.\n- Combination of above? Apply them in the right order — outside in.\n\nStrategy tips: simplify algebra before differentiating when easy (e.g., expand before power rule); rewrite radicals and reciprocals as exponents; use logarithmic differentiation for products of many factors (BC-level shortcut, optional).\n\nOn the AP, speed comes from recognizing the form, not from second-guessing the rule.",
    keyIdeas: [
      "Identify form first, then pick rule.",
      "Multiple rules often combine.",
      "Simplify algebra when it saves work.",
      "Speed = pattern recognition.",
    ],
    workedExample: {
      prompt:
        "Differentiate \\(h(x) = (x^2 + 1) \\sin(3x)\\).",
      solution:
        "Product rule with inner chain: \\((2x) \\sin(3x) + (x^2 + 1)(3\\cos(3x)) = 2x \\sin(3x) + 3(x^2+1)\\cos(3x)\\).",
    },
    flashcards: [
      { q: "First step before differentiating?", a: "Classify: product, quotient, composition, or basic." },
      { q: "When to simplify first?", a: "Whenever it produces a clean standard form." },
    ],
    commonMistakes: [
      "Applying chain rule without identifying composition.",
      "Overusing quotient rule when rewrite is easier.",
      "Forgetting multiple-rule combinations.",
    ],
    quiz: [
      {
        q: "Which rule(s) differentiate \\(f(x) = x \\sin(x^2)\\)?",
        choices: [
          "Power rule only",
          "Product rule only",
          "Product + chain rule",
          "Quotient rule",
        ],
        answerIndex: 2,
        explanation: "Product of \\(x\\) and composition \\(\\sin(x^2)\\).",
      },
      {
        q: "Best approach for \\(f(x) = x^2/\\sqrt{x}\\)?",
        choices: [
          "Quotient rule",
          "Rewrite as \\(x^{3/2}\\), power rule",
          "Product rule",
          "Chain rule",
        ],
        answerIndex: 1,
        explanation: "Simplify first; much cleaner.",
      },
      {
        q: "Which requires implicit differentiation?",
        choices: [
          "\\(y = x^3\\)",
          "\\(y = \\sin x\\)",
          "\\(x^2 + x y + y^2 = 7\\)",
          "\\(y = e^x / x\\)",
        ],
        answerIndex: 2,
        explanation: "Mixed \\(x, y\\) — can't isolate \\(y\\) easily.",
      },
      {
        q: "For \\(f(x) = \\ln(\\cos x)\\), the needed rules are:",
        choices: [
          "Chain rule",
          "Product rule",
          "Quotient rule",
          "Power rule",
        ],
        answerIndex: 0,
        explanation: "Composition ln(cos); chain rule.",
      },
    ],
  },

  "3.6": {
    id: "3.6",
    title: "Calculating Higher-Order Derivatives",
    summary:
      "Differentiate repeatedly: \\(f''(x), f'''(x), f^{(n)}(x)\\). Each higher derivative is the rate of change of the previous.",
    lesson:
      "The second derivative \\(f''\\) gives the rate of change of \\(f'\\); geometrically it measures concavity. In motion, \\(f''\\) is acceleration if \\(f\\) is position.\n\nNotation: \\(f''(x)\\), \\(f^{(n)}(x)\\), \\(d^2y/dx^2\\), \\(\\frac{d^n y}{dx^n}\\). For power functions, patterns emerge: \\(f(x) = x^n \\Rightarrow f^{(k)}(x) = n(n-1)\\cdots(n-k+1) x^{n-k}\\); for \\(k > n\\), zero.\n\nTrig: \\((\\sin x)^{(n)}\\) cycles through \\(\\sin x, \\cos x, -\\sin x, -\\cos x\\) with period 4.\n\nFor implicit or chain-rule-heavy expressions, be careful: the second derivative often requires re-differentiating a full expression and re-applying product/chain rules.",
    keyIdeas: [
      "Second derivative = derivative of the derivative.",
      "\\(f'' > 0\\) concave up; \\(f'' < 0\\) concave down.",
      "Motion: \\(f\\) position, \\(f'\\) velocity, \\(f''\\) acceleration.",
      "Trig derivatives cycle with period 4.",
    ],
    workedExample: {
      prompt:
        "Find \\(f''(x)\\) for \\(f(x) = x^3 \\cos x\\).",
      solution:
        "\\(f'(x) = 3x^2 \\cos x - x^3 \\sin x\\). Differentiate again: \\(f''(x) = 6x \\cos x - 3x^2 \\sin x - 3x^2 \\sin x - x^3 \\cos x = 6x \\cos x - 6x^2 \\sin x - x^3 \\cos x\\).",
    },
    flashcards: [
      { q: "What does \\(f''\\) measure geometrically?", a: "Concavity (and the rate at which the slope changes)." },
      { q: "Second derivative of \\(\\sin x\\)?", a: "\\(-\\sin x\\)." },
    ],
    commonMistakes: [
      "Only differentiating one term when taking \\(f''\\).",
      "Forgetting product rule on the second pass.",
      "Mixing up signs in repeated trig derivatives.",
    ],
    quiz: [
      {
        q: "\\(f(x) = x^4\\); \\(f''(x) =\\)",
        choices: ["\\(4x^3\\)", "\\(12x^2\\)", "\\(24x\\)", "\\(x^2\\)"],
        answerIndex: 1,
        explanation: "\\(f'=4x^3\\), \\(f''=12x^2\\).",
      },
      {
        q: "\\((\\sin x)^{(4)} =\\)",
        choices: ["\\(\\sin x\\)", "\\(\\cos x\\)", "\\(-\\sin x\\)", "\\(-\\cos x\\)"],
        answerIndex: 0,
        explanation: "Cycle of length 4 returns to \\(\\sin x\\).",
      },
      {
        q: "If \\(f''(x) < 0\\) on \\((a, b)\\), then \\(f\\) is:",
        choices: ["Increasing", "Decreasing", "Concave up", "Concave down"],
        answerIndex: 3,
        explanation: "Negative second derivative = concave down.",
      },
      {
        q: "For \\(s(t) = \\sin(2t)\\), acceleration \\(a(t) =\\)",
        choices: ["\\(\\cos(2t)\\)", "\\(-4\\sin(2t)\\)", "\\(-2\\sin(2t)\\)", "\\(2\\cos(2t)\\)"],
        answerIndex: 1,
        explanation: "\\(s' = 2\\cos(2t)\\); \\(s'' = -4\\sin(2t)\\).",
      },
    ],
  },

  "4.1": {
    id: "4.1",
    title: "Interpreting the Meaning of the Derivative in Context",
    summary:
      "In context, \\(f'(a)\\) is the rate of change of \\(f\\) at \\(a\\), in units of (output)/(input).",
    lesson:
      "Every derivative in context has a story. If \\(V(t)\\) is a volume in liters at time \\(t\\) in minutes, then \\(V'(3) = 2\\) means \"at \\(t = 3\\) minutes, the volume is increasing at 2 liters per minute.\"\n\nOn the FRQ, a good answer has three pieces: (1) the numerical rate, (2) the units (output/input), (3) an action verb (\"is increasing\" / \"is decreasing\") or a direction (if sign is negative).\n\nGraders penalize missing units. They also penalize sign-careless language — \\(V'(3) = -2\\) means \"volume is decreasing at 2 liters per minute,\" not \"volume is negative.\"",
    keyIdeas: [
      "Derivative = rate of change; units = output units per input unit.",
      "Include value, units, and direction in interpretations.",
      "Negative derivative \\(\\Rightarrow\\) decreasing.",
      "Don't confuse the derivative with the function value.",
    ],
    workedExample: {
      prompt:
        "\\(P(t)\\) is population (thousands) at year \\(t\\). If \\(P'(10) = 1.5\\), interpret.",
      solution:
        "At year 10, the population is increasing at 1.5 thousand people per year.",
    },
    flashcards: [
      { q: "Units of \\(f'(a)\\)?", a: "Output units / input units." },
      { q: "Meaning of \\(f'(a) > 0\\)?", a: "\\(f\\) is increasing at \\(a\\)." },
    ],
    commonMistakes: [
      "Reporting a derivative without units.",
      "Confusing sign with absolute value.",
      "Writing \"rate of change\" without specifying what is changing and relative to what.",
    ],
    quiz: [
      {
        q: "\\(C(x)\\) is cost (dollars) of making \\(x\\) widgets. \\(C'(50) = 12\\) means:",
        choices: [
          "Making 50 widgets costs 12 dollars.",
          "The marginal cost at 50 widgets is 12 dollars per widget.",
          "Cost decreases by 12 dollars.",
          "Total cost is 12 dollars.",
        ],
        answerIndex: 1,
        explanation: "Rate interpretation: dollars per additional widget.",
      },
      {
        q: "\\(T(h)\\) is temperature at height \\(h\\) meters. \\(T'(100) = -0.5\\) °C/m tells you:",
        choices: [
          "Temp is 100 °C",
          "Temp is dropping 0.5 °C per meter at \\(h = 100\\).",
          "Temp is increasing",
          "Temp is \\(-0.5\\) °C",
        ],
        answerIndex: 1,
        explanation: "Negative rate means decrease.",
      },
      {
        q: "\\(V'(t)\\) in L/min has units of:",
        choices: ["L", "min", "L/min", "L·min"],
        answerIndex: 2,
        explanation: "Output (L) per input (min).",
      },
      {
        q: "FRQ rubric: best interpretation includes:",
        choices: [
          "Value only",
          "Value, units, and direction",
          "Direction only",
          "Just the formula",
        ],
        answerIndex: 1,
        explanation: "Graders expect full context.",
      },
    ],
  },

  "4.2": {
    id: "4.2",
    title: "Straight-Line Motion: Connecting Position, Velocity, and Acceleration",
    summary:
      "If \\(s(t)\\) is position, then \\(v(t) = s'(t)\\) is velocity and \\(a(t) = v'(t) = s''(t)\\) is acceleration.",
    lesson:
      "Three related functions describe motion along a line:\n\n- Position \\(s(t)\\): signed displacement from an origin.\n- Velocity \\(v(t) = s'(t)\\): signed rate of position change.\n- Acceleration \\(a(t) = v'(t)\\): rate of velocity change.\n\nSpeed = \\(|v(t)|\\). An object is speeding up when velocity and acceleration have the same sign; slowing down when they have opposite signs. At rest means \\(v(t) = 0\\).\n\nChanges in direction correspond to sign changes of \\(v\\). Find them by solving \\(v(t) = 0\\) and checking sign changes around those zeros.",
    keyIdeas: [
      "Velocity is the derivative of position.",
      "Acceleration is the derivative of velocity.",
      "Speed = |velocity|.",
      "Speeding up: \\(v\\) and \\(a\\) same sign; slowing down: opposite signs.",
    ],
    workedExample: {
      prompt:
        "\\(s(t) = t^3 - 6t^2 + 9t\\). Find when the particle is at rest and when it's speeding up on \\([0, 4]\\).",
      solution:
        "\\(v(t) = 3t^2 - 12t + 9 = 3(t-1)(t-3)\\); zeros at \\(t = 1, 3\\). \\(a(t) = 6t - 12\\); zero at \\(t = 2\\). On (0,1): \\(v > 0, a < 0\\) \\(\\to\\) slowing. On (1,2): \\(v < 0, a < 0\\) \\(\\to\\) speeding up. On (2,3): \\(v < 0, a > 0\\) \\(\\to\\) slowing. On (3,4): \\(v > 0, a > 0\\) \\(\\to\\) speeding up.",
    },
    flashcards: [
      { q: "Velocity in terms of position?", a: "\\(v(t) = s'(t)\\)." },
      { q: "Speed vs velocity?", a: "Speed is the absolute value of velocity." },
      { q: "Speeding up means?", a: "Velocity and acceleration have the same sign." },
    ],
    commonMistakes: [
      "Confusing speed with velocity.",
      "Assuming \\(v(t) = 0\\) means object turned around (may just graze).",
      "Forgetting to test intervals for sign of velocity/acceleration.",
    ],
    quiz: [
      {
        q: "\\(v(t) = t^2 - 4\\). At \\(t = 3\\), velocity is:",
        choices: ["0", "5", "8", "12"],
        answerIndex: 1,
        explanation: "\\(9 - 4 = 5\\).",
      },
      {
        q: "A particle is speeding up when:",
        choices: [
          "\\(v = 0\\)",
          "\\(v\\) and \\(a\\) have the same sign",
          "\\(a = 0\\)",
          "\\(|v|\\) is constant",
        ],
        answerIndex: 1,
        explanation: "Same sign = speeding up; opposite = slowing.",
      },
      {
        q: "Speed at time \\(t\\) with \\(v(t) = -3\\) is:",
        choices: ["\\(-3\\)", "0", "3", "9"],
        answerIndex: 2,
        explanation: "Speed = |velocity| = 3.",
      },
      {
        q: "If \\(s(t) = t^2 - 6t + 5\\), the particle is at rest at:",
        choices: ["\\(t = 0\\)", "\\(t = 3\\)", "\\(t = 5\\)", "\\(t = 6\\)"],
        answerIndex: 1,
        explanation: "\\(s' = 2t - 6 = 0 \\Rightarrow t = 3\\).",
      },
    ],
  },

  "4.3": {
    id: "4.3",
    title: "Rates of Change in Applied Contexts Other Than Motion",
    summary:
      "Derivatives describe any instantaneous rate of change: population growth, concentration change, marginal cost, temperature change, leakage rate, and so on.",
    lesson:
      "The derivative is a universal tool for rate of change; motion is just one incarnation. In economics, \\(C'(x)\\) (cost function) is the marginal cost. In biology, \\(P'(t)\\) gives the growth rate of a population. In chemistry, concentration derivatives measure reaction rates.\n\nFRQ formula: state the rate, name the units, give direction (increasing/decreasing), at what input value. Graders also want you to contextualize: \"at \\(t = 5\\) hours, the water is leaking out of the tank at a rate of 3 gallons per hour.\"\n\nAlso common: inverse interpretation. \\(f^{-1}(50)\\) tells you \"at what input is the function equal to 50?\" and \\((f^{-1})'(50) = 1/f'(x)\\) says how fast the input changes per unit of output.",
    keyIdeas: [
      "Derivative = rate of change in any context.",
      "Marginal cost = derivative of total cost.",
      "Always carry units through.",
      "Inverse derivatives measure input-per-output sensitivity.",
    ],
    workedExample: {
      prompt:
        "A tank has water volume \\(V(t) = 100 - 4t^2\\) gallons. Find rate at \\(t = 2\\) and interpret.",
      solution:
        "\\(V'(t) = -8t\\); \\(V'(2) = -16\\) gal/hour. At \\(t = 2\\), the tank is losing water at 16 gal/hour.",
    },
    flashcards: [
      { q: "Marginal cost means?", a: "Derivative of total cost — additional cost per one-unit increase in production." },
      { q: "Sign conventions for rate?", a: "Positive = increasing; negative = decreasing." },
    ],
    commonMistakes: [
      "Omitting units.",
      "Stating 'rate is negative' without explaining it means decreasing.",
      "Confusing \\(f(a)\\) with \\(f'(a)\\).",
    ],
    quiz: [
      {
        q: "\\(C(x) = 500 + 20x + 0.1x^2\\) (dollars for \\(x\\) items). Marginal cost at \\(x = 50\\):",
        choices: ["10", "20", "30", "40"],
        answerIndex: 2,
        explanation: "\\(C'(x) = 20 + 0.2x\\); \\(C'(50) = 30\\).",
      },
      {
        q: "Rate has units of \"degrees per minute.\" Likely interpretation:",
        choices: [
          "Temperature at a moment",
          "Temperature change rate",
          "Total heat",
          "Average of temps",
        ],
        answerIndex: 1,
        explanation: "Unit is a rate; it measures temperature change.",
      },
      {
        q: "If \\(V'(5) = -0.3\\) L/min, the best interpretation:",
        choices: [
          "Volume at 5 min is 0.3 L",
          "Volume is decreasing at 0.3 L/min at \\(t = 5\\)",
          "Volume is 5 L",
          "Volume increases by 5 L",
        ],
        answerIndex: 1,
        explanation: "Negative rate = decreasing.",
      },
      {
        q: "Sales \\(S(p)\\) at price \\(p\\). \\(S'(10) = -50\\) units per dollar means:",
        choices: [
          "Sales at price 10 are 50 units",
          "Increasing price from 10 by 1 decreases sales by about 50 units",
          "Price is \\$10",
          "Sales are rising",
        ],
        answerIndex: 1,
        explanation: "Rate interpretation.",
      },
    ],
  },

  "4.4": {
    id: "4.4",
    title: "Introduction to Related Rates",
    summary:
      "Related rates connect derivatives of linked variables via an equation, using the chain rule.",
    lesson:
      "Related rates problems connect the rates of change of multiple variables tied by an equation. The setup:\n\n1) Identify all variables (usually time-dependent).\n2) Write an equation relating them.\n3) Differentiate both sides with respect to time.\n4) Plug in known values and known rates, solve for the unknown rate.\n\nThe chain rule is everywhere — every variable is a function of \\(t\\), so derivatives come with \\(dV/dt, dr/dt,\\) etc.\n\nClassic intro example: a balloon is inflated; its volume \\(V = (4/3)\\pi r^3\\) relates radius and volume, giving \\(dV/dt = 4\\pi r^2 \\cdot dr/dt\\).",
    keyIdeas: [
      "Draw a picture and label variables.",
      "Differentiate the relation with respect to time.",
      "Every variable gets a \\(d/dt\\) factor via chain rule.",
      "Plug in numerics only after differentiating.",
    ],
    workedExample: {
      prompt:
        "A sphere's radius grows at 2 cm/s. How fast is the volume changing when \\(r = 5\\)?",
      solution:
        "\\(V = (4/3)\\pi r^3 \\Rightarrow dV/dt = 4\\pi r^2 \\cdot dr/dt\\). At \\(r = 5, dr/dt = 2\\): \\(dV/dt = 4\\pi(25)(2) = 200\\pi\\) cm³/s.",
    },
    flashcards: [
      { q: "Key tool in related rates?", a: "Chain rule — every time-dependent variable gets its own rate factor." },
      { q: "When to substitute numbers?", a: "After differentiating, not before." },
    ],
    commonMistakes: [
      "Substituting numerical values before differentiating.",
      "Forgetting chain-rule factor on one variable.",
      "Confusing variables with constants.",
    ],
    quiz: [
      {
        q: "In related rates, what does the chain rule do?",
        choices: [
          "Multiplies equations",
          "Attaches \\(d(\\text{var})/dt\\) when differentiating time-dependent variables",
          "Replaces variables with constants",
          "Integrates",
        ],
        answerIndex: 1,
        explanation: "Chain rule links variable derivatives to time.",
      },
      {
        q: "When should you plug numeric values in?",
        choices: [
          "Before differentiating",
          "After differentiating",
          "Only at the end of differentiation when solving",
          "Never",
        ],
        answerIndex: 2,
        explanation: "Differentiate symbolically, substitute last.",
      },
      {
        q: "If \\(A = \\pi r^2\\), then \\(dA/dt =\\)",
        choices: ["\\(2\\pi r\\)", "\\(2\\pi r \\cdot dr/dt\\)", "\\(\\pi r^2 \\cdot dr/dt\\)", "\\(2r\\)"],
        answerIndex: 1,
        explanation: "Chain rule: \\(dA/dt = (dA/dr)(dr/dt) = 2\\pi r \\cdot dr/dt\\).",
      },
      {
        q: "A related rates setup typically begins with:",
        choices: [
          "Evaluating the final expression",
          "Writing a geometric or physical relation",
          "Finding an antiderivative",
          "Using L'Hôpital",
        ],
        answerIndex: 1,
        explanation: "Equation first, then differentiate.",
      },
    ],
  },

  "4.5": {
    id: "4.5",
    title: "Solving Related Rates Problems",
    summary:
      "Classic setups: ladder sliding, shadow lengthening, water draining, cars moving toward an intersection.",
    lesson:
      "Full procedure:\n\n1) Draw a diagram; label fixed and changing quantities.\n2) Identify what you know (rates and values) and what you want.\n3) Write an equation that relates the quantities — often geometry (Pythagorean theorem, similar triangles, volume formulas).\n4) Differentiate with respect to \\(t\\).\n5) Substitute known values at the moment of interest.\n6) Solve for unknown rate. State answer with units.\n\nTypical pitfalls: forgetting implicit \\(t\\)-dependence on an implicit variable; failing to draw a clear diagram; mis-setting similar-triangle ratios.\n\nSign convention: rates of shrinking are negative. If a tank drains, \\(dV/dt < 0\\).",
    keyIdeas: [
      "Diagram + label.",
      "Equation from geometry or physics.",
      "Differentiate, then substitute.",
      "Include units in the answer.",
    ],
    workedExample: {
      prompt:
        "A 10-ft ladder leans against a wall. The bottom slides away at 1 ft/s. How fast is the top sliding down when the bottom is 6 ft from the wall?",
      solution:
        "\\(x^2 + y^2 = 100 \\Rightarrow 2x \\cdot dx/dt + 2y \\cdot dy/dt = 0\\). At \\(x = 6\\): \\(y = 8\\). With \\(dx/dt = 1\\): \\(12 + 16 \\cdot dy/dt = 0\\) \\(\\Rightarrow dy/dt = -0.75\\) ft/s.",
    },
    flashcards: [
      { q: "Equation for ladder problem?", a: "\\(x^2 + y^2 = L^2\\)." },
      { q: "What's the first step?", a: "Diagram + label known/unknown rates and values." },
    ],
    commonMistakes: [
      "Mixing up which quantity is constant.",
      "Forgetting to differentiate the constant side (it stays 0).",
      "Plugging in before differentiating.",
    ],
    quiz: [
      {
        q: "Water drains from a conical tank. \\(dV/dt < 0\\) because:",
        choices: [
          "Volume increases",
          "Volume decreases",
          "Volume is constant",
          "Time is negative",
        ],
        answerIndex: 1,
        explanation: "Draining = volume decreasing = negative rate.",
      },
      {
        q: "Two cars approach an intersection perpendicularly. Distance relation to use:",
        choices: [
          "Linear",
          "Pythagorean theorem",
          "Circle area",
          "Trig identity",
        ],
        answerIndex: 1,
        explanation: "\\(D^2 = x^2 + y^2\\).",
      },
      {
        q: "A balloon inflates at 10 cm³/s. At \\(r = 3\\), \\(dr/dt =\\)",
        choices: [
          "\\(10/(4\\pi \\cdot 9)\\)",
          "\\(10\\)",
          "\\(40\\pi\\)",
          "\\(10/(36\\pi)\\)",
        ],
        answerIndex: 0,
        explanation: "\\(dV/dt = 4\\pi r^2 dr/dt\\); solve for \\(dr/dt = 10/(36\\pi)\\) which equals first option.",
      },
      {
        q: "Biggest trap in related rates?",
        choices: [
          "Wrong diagram",
          "Substituting numbers before differentiating",
          "Using the wrong units",
          "Not memorizing formulas",
        ],
        answerIndex: 1,
        explanation: "Early substitution kills the implicit variable's rate.",
      },
    ],
  },

  "4.6": {
    id: "4.6",
    title: "Approximating Values of a Function Using Local Linearity and Linearization",
    summary:
      "Near \\(x = a\\), \\(f(x) \\approx f(a) + f'(a)(x - a)\\). The tangent line is the best local linear approximation.",
    lesson:
      "The linearization (or tangent line approximation) of \\(f\\) at \\(a\\) is \\(L(x) = f(a) + f'(a)(x - a)\\). For \\(x\\) near \\(a\\), \\(f(x) \\approx L(x)\\).\n\nAP uses this in two ways: (1) Approximate \\(f(x)\\) for some nearby \\(x\\) when \\(f\\) is hard to evaluate directly (think \\(\\sqrt{16.1}\\) near 16); (2) Use tangent slope to estimate \\(f(x)\\) changes in applied contexts.\n\nConcavity controls error. If \\(f\\) is concave up near \\(a\\), the tangent line lies below the curve and the linearization under-estimates. Concave down: tangent is above, over-estimates. This is the bread and butter of FRQ \"is the estimate an over- or under-estimate?\" questions.",
    keyIdeas: [
      "Linearization: \\(L(x) = f(a) + f'(a)(x - a)\\).",
      "Tangent line approximation works for \\(x\\) near \\(a\\).",
      "Concave up \\(\\to\\) tangent under; concave down \\(\\to\\) tangent over.",
      "Great for nearby evaluations of hard functions.",
    ],
    workedExample: {
      prompt:
        "Use linearization of \\(\\sqrt{x}\\) at \\(a = 16\\) to approximate \\(\\sqrt{16.3}\\).",
      solution:
        "\\(f(x) = \\sqrt{x}\\), \\(f'(x) = 1/(2\\sqrt{x})\\), \\(f(16) = 4, f'(16) = 1/8\\). \\(L(16.3) = 4 + (1/8)(0.3) = 4.0375\\). Actual \\(\\approx 4.0373\\).",
    },
    flashcards: [
      { q: "Linearization formula at \\(a\\)?", a: "\\(L(x) = f(a) + f'(a)(x - a)\\)." },
      { q: "Concave up \\(\\Rightarrow\\) tangent approximation is?", a: "An under-estimate." },
    ],
    commonMistakes: [
      "Using \\(L\\) far from \\(a\\) where it's unreliable.",
      "Forgetting to evaluate \\(f(a)\\) and \\(f'(a)\\) at \\(a\\), not at \\(x\\).",
      "Stating the wrong over/under claim without checking concavity.",
    ],
    quiz: [
      {
        q: "Linearization of \\(f(x) = x^2\\) at \\(a = 3\\):",
        choices: [
          "\\(L(x) = 9 + 6(x - 3)\\)",
          "\\(L(x) = 3 + 9(x - 3)\\)",
          "\\(L(x) = 6x\\)",
          "\\(L(x) = x^2\\)",
        ],
        answerIndex: 0,
        explanation: "\\(f(3) = 9, f'(3) = 6\\).",
      },
      {
        q: "If \\(f\\) is concave up at \\(a\\), the tangent line approximation of \\(f(b)\\) for \\(b\\) near \\(a\\) is:",
        choices: ["Over-estimate", "Under-estimate", "Exact", "Could be either"],
        answerIndex: 1,
        explanation: "Concave up: curve above tangent \\(\\Rightarrow\\) tangent under-estimates.",
      },
      {
        q: "\\(L(x) = f(a) + f'(a)(x - a)\\) is most accurate when:",
        choices: [
          "\\(x\\) is far from \\(a\\)",
          "\\(x\\) is near \\(a\\)",
          "\\(f'\\) is zero",
          "\\(f''\\) is large",
        ],
        answerIndex: 1,
        explanation: "Local linearity works only close to \\(a\\).",
      },
      {
        q: "Approximate \\(\\ln(1.05)\\) using linearization at \\(x = 1\\):",
        choices: ["0", "0.05", "0.5", "1.05"],
        answerIndex: 1,
        explanation: "\\(f(1) = 0, f'(1) = 1\\); \\(L(1.05) = 0.05\\).",
      },
    ],
  },

  "4.7": {
    id: "4.7",
    title: "Using L'Hôpital's Rule for Determining Limits of Indeterminate Forms",
    summary:
      "For 0/0 or \\(\\infty/\\infty\\), \\(\\lim f/g = \\lim f'/g'\\) (if the latter exists).",
    lesson:
      "L'Hôpital's Rule: if \\(\\lim_{x \\to a} f(x) = 0 = \\lim g(x)\\) (or both \\(\\pm\\infty\\)) and \\(g'(x) \\ne 0\\) near \\(a\\), then \\(\\lim f/g = \\lim f'/g'\\) (provided the new limit exists or is \\(\\pm\\infty\\)).\n\nCheck the form is indeterminate before applying. You can apply repeatedly. Simplify between applications — don't blindly differentiate.\n\nOther indeterminate forms (\\(0 \\cdot \\infty\\), \\(\\infty - \\infty\\), \\(0^0, 1^\\infty, \\infty^0\\)) must be rewritten into 0/0 or \\(\\infty/\\infty\\) first. For \\(0 \\cdot \\infty\\), convert one factor into a reciprocal; for exponential indeterminate forms, take logs.",
    keyIdeas: [
      "Only applies to 0/0 or \\(\\infty/\\infty\\).",
      "Differentiate numerator and denominator separately (NOT quotient rule).",
      "Apply repeatedly if needed.",
      "Rewrite other indeterminate forms before applying.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\lim_{x \\to 0} (\\sin x - x)/x^3\\).",
      solution:
        "0/0: apply L'Hôpital: \\(\\lim (\\cos x - 1)/(3x^2)\\); still 0/0. Apply again: \\(\\lim (-\\sin x)/(6x)\\); 0/0. Again: \\(\\lim(-\\cos x)/6 = -1/6\\).",
    },
    flashcards: [
      { q: "When can you use L'Hôpital?", a: "0/0 or \\(\\infty/\\infty\\) indeterminate form." },
      { q: "What do you differentiate?", a: "Numerator and denominator separately." },
    ],
    commonMistakes: [
      "Using L'Hôpital on a 1/0 or 5/0 (not indeterminate).",
      "Applying quotient rule instead of separate derivatives.",
      "Not re-checking indeterminate form between applications.",
    ],
    quiz: [
      {
        q: "\\(\\lim_{x \\to 0} \\sin(2x)/x\\) by L'Hôpital:",
        choices: ["0", "1", "2", "\\(\\infty\\)"],
        answerIndex: 2,
        explanation: "0/0; \\(\\lim 2\\cos(2x)/1 = 2\\).",
      },
      {
        q: "L'Hôpital applies directly to which form?",
        choices: ["1/0", "\\(\\infty/\\infty\\)", "0/5", "2/3"],
        answerIndex: 1,
        explanation: "Only 0/0 and \\(\\infty/\\infty\\).",
      },
      {
        q: "\\(\\lim_{x \\to \\infty} x/e^x\\):",
        choices: ["0", "1", "\\(\\infty\\)", "\\(e\\)"],
        answerIndex: 0,
        explanation: "\\(\\infty/\\infty\\); L'Hôpital: \\(1/e^x \\to 0\\).",
      },
      {
        q: "L'Hôpital gives \\(f'/g' \\to L\\), but original form wasn't indeterminate. Conclusion?",
        choices: [
          "Original limit is \\(L\\)",
          "L'Hôpital was misused; original needs direct substitution",
          "Original limit is 0",
          "Original limit is infinite",
        ],
        answerIndex: 1,
        explanation: "L'Hôpital requires indeterminate form as prerequisite.",
      },
    ],
  },

  "5.1": {
    id: "5.1",
    title: "Using the Mean Value Theorem",
    summary:
      "If \\(f\\) is continuous on \\([a, b]\\) and differentiable on \\((a, b)\\), then \\(f'(c) = (f(b) - f(a))/(b - a)\\) for some \\(c \\in (a, b)\\).",
    lesson:
      "MVT guarantees a point where instantaneous slope equals average slope. Hypotheses: continuity on closed interval, differentiability on open interval. Conclusion: existence of \\(c\\) with \\(f'(c) = \\text{average rate of change}\\).\n\nFRQ script: state continuity, state differentiability, compute the average rate of change, apply MVT to assert existence of \\(c\\).\n\nRolle's theorem is the special case where \\(f(a) = f(b)\\): then some \\(c\\) has \\(f'(c) = 0\\).\n\nUse MVT to argue inequalities and estimate function values. If \\(|f'(x)| \\le M\\) on \\([a, b]\\), then \\(|f(b) - f(a)| \\le M |b - a|\\).",
    keyIdeas: [
      "Hypotheses: continuous on \\([a, b]\\), differentiable on \\((a, b)\\).",
      "Conclusion: \\(f'(c) = (f(b) - f(a))/(b - a)\\) for some \\(c\\).",
      "Rolle's theorem: if \\(f(a) = f(b)\\), \\(f'(c) = 0\\).",
      "Existence only — doesn't locate \\(c\\).",
    ],
    workedExample: {
      prompt:
        "Verify MVT for \\(f(x) = x^2\\) on \\([1, 3]\\) and find \\(c\\).",
      solution:
        "Continuous and differentiable. Average rate: \\((9 - 1)/2 = 4\\). \\(f'(c) = 2c = 4 \\Rightarrow c = 2\\). \\(c \\in (1, 3)\\). ✓",
    },
    flashcards: [
      { q: "MVT hypotheses?", a: "Continuous on \\([a, b]\\), differentiable on \\((a, b)\\)." },
      { q: "MVT conclusion?", a: "\\(\\exists c \\in (a, b)\\) with \\(f'(c) = (f(b)-f(a))/(b-a)\\)." },
    ],
    commonMistakes: [
      "Using closed interval for differentiability.",
      "Forgetting continuity.",
      "Claiming uniqueness.",
    ],
    quiz: [
      {
        q: "MVT requires \\(f\\) to be:",
        choices: [
          "Continuous on \\([a,b]\\), differentiable on \\((a,b)\\)",
          "Continuous and differentiable on \\((a,b)\\)",
          "Differentiable on \\([a,b]\\)",
          "Monotone on \\([a,b]\\)",
        ],
        answerIndex: 0,
        explanation: "Standard hypotheses.",
      },
      {
        q: "For \\(f(x) = x^3\\) on \\([0, 2]\\), the MVT \\(c\\) satisfies \\(f'(c) =\\)",
        choices: ["0", "2", "4", "12"],
        answerIndex: 2,
        explanation: "Avg rate \\((8-0)/2 = 4\\).",
      },
      {
        q: "Rolle's theorem is MVT with the extra condition:",
        choices: ["\\(f'(a) = f'(b)\\)", "\\(f(a) = f(b)\\)", "\\(f\\) constant", "\\(f\\) monotone"],
        answerIndex: 1,
        explanation: "Equal endpoint values yield \\(f'(c) = 0\\).",
      },
      {
        q: "Does MVT tell you where \\(c\\) is?",
        choices: ["Yes, at the midpoint", "Yes, at \\(x = (a+b)/2\\)", "No — existence only", "Only if \\(f\\) is linear"],
        answerIndex: 2,
        explanation: "MVT is an existence theorem.",
      },
    ],
  },

  "5.2": {
    id: "5.2",
    title: "Extreme Value Theorem, Global Versus Local Extrema, and Critical Points",
    summary:
      "On a closed interval, continuous \\(f\\) attains a global max and min. Candidates: critical points and endpoints.",
    lesson:
      "EVT: if \\(f\\) is continuous on \\([a, b]\\), then \\(f\\) attains both a global (absolute) maximum and a global minimum on \\([a, b]\\).\n\nCritical points are where \\(f'(x) = 0\\) or \\(f'(x)\\) is undefined (and \\(x\\) is in the domain). Local extrema occur only at critical points (necessary but not sufficient).\n\nGlobal extrema on a closed interval come from the Candidates Test: evaluate \\(f\\) at all critical points in \\((a, b)\\) and at endpoints \\(a, b\\); pick the largest and smallest values.",
    keyIdeas: [
      "EVT requires continuity on closed interval.",
      "Critical point: \\(f'(x) = 0\\) or DNE (within domain).",
      "Local extrema are among critical points.",
      "Global extrema: check critical points + endpoints.",
    ],
    workedExample: {
      prompt:
        "Find global extrema of \\(f(x) = x^3 - 3x\\) on \\([0, 2]\\).",
      solution:
        "\\(f'(x) = 3x^2 - 3 = 0 \\Rightarrow x = 1\\). Evaluate: \\(f(0) = 0, f(1) = -2, f(2) = 2\\). Global max 2 at \\(x = 2\\); global min \\(-2\\) at \\(x = 1\\).",
    },
    flashcards: [
      { q: "EVT requires?", a: "Continuity on a closed interval." },
      { q: "Critical points?", a: "Where \\(f' = 0\\) or \\(f'\\) DNE, within the domain." },
    ],
    commonMistakes: [
      "Forgetting endpoints in the Candidates Test.",
      "Claiming every critical point is an extremum.",
      "Using EVT on an open interval.",
    ],
    quiz: [
      {
        q: "EVT guarantees:",
        choices: [
          "Exactly one max and one min",
          "At least one global max and one global min",
          "Continuous derivative",
          "Differentiability",
        ],
        answerIndex: 1,
        explanation: "EVT: existence of global extrema.",
      },
      {
        q: "A critical point is:",
        choices: [
          "Where \\(f(x) = 0\\)",
          "Where \\(f'(x) = 0\\) or undefined (and \\(x\\) in domain)",
          "Any endpoint",
          "Where \\(f\\) is discontinuous",
        ],
        answerIndex: 1,
        explanation: "Standard definition.",
      },
      {
        q: "On \\([0, 5]\\), \\(f\\) continuous with critical points at 1, 3. Candidates for global min include:",
        choices: [
          "Only critical points",
          "Only endpoints",
          "Critical points and endpoints",
          "Only midpoint",
        ],
        answerIndex: 2,
        explanation: "Candidates test: 0, 1, 3, 5.",
      },
      {
        q: "A function without a global max on \\((0, 1)\\) shows:",
        choices: [
          "EVT fails on open intervals",
          "The function is not continuous",
          "All functions have a max",
          "The max is at the midpoint",
        ],
        answerIndex: 0,
        explanation: "EVT needs a closed interval.",
      },
    ],
  },

  "5.3": {
    id: "5.3",
    title: "Determining Intervals on Which a Function Is Increasing or Decreasing",
    summary:
      "\\(f' > 0\\) \\(\\Rightarrow\\) \\(f\\) increasing; \\(f' < 0\\) \\(\\Rightarrow\\) decreasing.",
    lesson:
      "Find intervals of monotonicity by the sign of \\(f'\\):\n\n1) Find all critical points (where \\(f' = 0\\) or DNE).\n2) Test the sign of \\(f'\\) on each subinterval between consecutive critical points (and outside them).\n3) Report intervals where \\(f' > 0\\) as increasing; \\(f' < 0\\) as decreasing.\n\nUse a sign chart. Remember: include endpoints of intervals if \\(f\\) is continuous there (the AP convention is to state \"increasing on \\([a, b]\\)\" rather than open interval when \\(f\\) is defined at the endpoint and the interval limit matches).",
    keyIdeas: [
      "Sign of \\(f'\\) drives monotonicity.",
      "Find critical points; sign-chart subintervals.",
      "Include endpoints if continuous.",
      "Critical points separate sign regions.",
    ],
    workedExample: {
      prompt:
        "Intervals of increase/decrease for \\(f(x) = x^3 - 6x^2\\).",
      solution:
        "\\(f'(x) = 3x^2 - 12x = 3x(x - 4)\\); zeros at 0, 4. Signs: \\(x < 0\\): \\(+\\). \\(0 < x < 4\\): \\(-\\). \\(x > 4\\): \\(+\\). Increasing on \\((-\\infty, 0]\\) and \\([4, \\infty)\\); decreasing on \\([0, 4]\\).",
    },
    flashcards: [
      { q: "What does \\(f'(x) > 0\\) mean?", a: "\\(f\\) is increasing at \\(x\\)." },
      { q: "How to find sign-change locations?", a: "Critical points of \\(f\\)." },
    ],
    commonMistakes: [
      "Claiming increasing because \\(f(x) > 0\\) (confusing value with slope).",
      "Skipping undefined-\\(f'\\) points.",
      "Using strict inequalities when the AP convention accepts \\([ \\, ]\\).",
    ],
    quiz: [
      {
        q: "\\(f'(x) = x - 2\\). \\(f\\) is decreasing on:",
        choices: ["\\((-\\infty, 2)\\)", "\\((2, \\infty)\\)", "\\(\\mathbb{R}\\)", "Nowhere"],
        answerIndex: 0,
        explanation: "\\(f' < 0\\) for \\(x < 2\\).",
      },
      {
        q: "\\(f'(x) = -(x - 1)(x - 3)\\). \\(f\\) increases on:",
        choices: ["\\((1, 3)\\)", "\\((-\\infty, 1)\\)", "\\((3, \\infty)\\)", "\\(\\mathbb{R}\\)"],
        answerIndex: 0,
        explanation: "\\(f' > 0\\) between roots due to negative leading coefficient.",
      },
      {
        q: "Critical points of \\(f\\) with \\(f'(x) = (x-1)/(x+2)\\):",
        choices: ["\\(x = 1\\) only", "\\(x = -2\\) only", "\\(x = 1\\) and \\(x = -2\\)", "None"],
        answerIndex: 2,
        explanation: "\\(f'=0\\) at 1; \\(f'\\) undefined at \\(-2\\) (and \\(-2\\) might or might not be in domain — assume it is for critical point).",
      },
      {
        q: "\\(f\\) is increasing where:",
        choices: ["\\(f > 0\\)", "\\(f' > 0\\)", "\\(f'' > 0\\)", "\\(f' = 0\\)"],
        answerIndex: 1,
        explanation: "Monotonicity tied to derivative sign.",
      },
    ],
  },

  "5.4": {
    id: "5.4",
    title: "Using the First Derivative Test to Determine Relative (Local) Extrema",
    summary:
      "At a critical point, \\(f'\\) changes sign: \\(+\\to -\\) = local max; \\(- \\to +\\) = local min; no sign change = neither.",
    lesson:
      "First Derivative Test procedure:\n\n1) Find critical points of \\(f\\).\n2) Test sign of \\(f'\\) on each side of each critical point.\n3) If sign changes \\(+\\to -\\), local max. If \\(-\\to +\\), local min. If no change, not an extremum.\n\nGeometric intuition: slope was going up, now down — you just passed a peak.\n\nFRQ script: state critical points, show sign chart, and explicitly conclude \"local max\" or \"local min\" with the value.",
    keyIdeas: [
      "Use sign change of \\(f'\\) at critical points.",
      "\\(+\\to -\\): local max; \\(-\\to +\\): local min.",
      "No sign change: neither max nor min.",
      "Works even at points where \\(f'\\) is undefined.",
    ],
    workedExample: {
      prompt:
        "Find local extrema of \\(f(x) = x^3 - 3x^2\\).",
      solution:
        "\\(f'(x) = 3x^2 - 6x = 3x(x - 2)\\); critical points at 0, 2. Sign of \\(f'\\): for \\(x < 0\\): \\(+\\); \\(0 < x < 2\\): \\(-\\); \\(x > 2\\): \\(+\\). At \\(x = 0\\), sign changes \\(+\\to -\\) — local max; at \\(x = 2\\), \\(-\\to +\\) — local min.",
    },
    flashcards: [
      { q: "First Derivative Test: \\(+\\to -\\) at critical point means?", a: "Local max." },
      { q: "What if \\(f'\\) doesn't change sign?", a: "Not an extremum (could be a horizontal tangent with same sign on both sides)." },
    ],
    commonMistakes: [
      "Forgetting to test both sides of the critical point.",
      "Declaring an extremum at a sign non-change.",
      "Missing critical points where \\(f'\\) is undefined.",
    ],
    quiz: [
      {
        q: "\\(f'\\) changes from positive to negative at \\(x = 3\\). At \\(x = 3\\), \\(f\\) has:",
        choices: ["Local max", "Local min", "Inflection point", "Nothing"],
        answerIndex: 0,
        explanation: "First Derivative Test.",
      },
      {
        q: "\\(f'\\) changes from negative to positive at \\(x = -1\\). At \\(x = -1\\), \\(f\\) has:",
        choices: ["Local max", "Local min", "Inflection", "Nothing"],
        answerIndex: 1,
        explanation: "Standard rule.",
      },
      {
        q: "\\(f'(x) = (x - 2)^2\\). At \\(x = 2\\), \\(f\\) has:",
        choices: ["Local max", "Local min", "No local extremum", "Discontinuity"],
        answerIndex: 2,
        explanation: "\\(f'\\ge 0\\) everywhere; no sign change.",
      },
      {
        q: "First Derivative Test uses:",
        choices: [
          "Value of \\(f\\) at critical points",
          "Sign of \\(f'\\) around critical points",
          "Value of \\(f''\\) only",
          "None",
        ],
        answerIndex: 1,
        explanation: "It's about sign change of the first derivative.",
      },
    ],
  },

  "5.5": {
    id: "5.5",
    title: "Using the Candidates Test to Determine Absolute (Global) Extrema",
    summary:
      "On a closed interval, compare \\(f\\) at all critical points and endpoints; largest is global max, smallest is global min.",
    lesson:
      "Candidates Test:\n\n1) List all critical points in \\([a, b]\\).\n2) List the endpoints \\(a, b\\).\n3) Evaluate \\(f\\) at each.\n4) Largest value = global max; smallest = global min.\n\nWorks because EVT guarantees existence on closed intervals, and extrema must occur at critical points or endpoints.\n\nDon't skip this for continuous functions on closed intervals — it's the fastest and most reliable method.",
    keyIdeas: [
      "Requires continuity on closed interval.",
      "Candidates = critical points + endpoints.",
      "Compare \\(f\\) values; pick extremes.",
      "No sign charts needed.",
    ],
    workedExample: {
      prompt:
        "Find global extrema of \\(f(x) = x^3 - 6x + 1\\) on \\([-3, 3]\\).",
      solution:
        "\\(f'(x) = 3x^2 - 6 = 0 \\Rightarrow x = \\pm\\sqrt{2}\\). Evaluate: \\(f(-3) = -8, f(-\\sqrt{2}) \\approx 5.66, f(\\sqrt{2}) \\approx -3.66, f(3) = 10\\). Global max 10 at \\(x = 3\\); global min \\(-8\\) at \\(x = -3\\).",
    },
    flashcards: [
      { q: "Candidates in the Candidates Test?", a: "Critical points inside \\((a, b)\\) plus endpoints \\(a, b\\)." },
      { q: "Why must \\(f\\) be continuous on closed interval?", a: "EVT guarantees global extrema exist only under these conditions." },
    ],
    commonMistakes: [
      "Forgetting to include endpoints.",
      "Forgetting critical points where \\(f'\\) is undefined.",
      "Applying candidates test on open intervals.",
    ],
    quiz: [
      {
        q: "On a closed interval, global extrema of continuous \\(f\\) must occur at:",
        choices: [
          "Midpoint only",
          "Critical points only",
          "Endpoints only",
          "Critical points or endpoints",
        ],
        answerIndex: 3,
        explanation: "Both are candidates.",
      },
      {
        q: "The candidates test requires:",
        choices: [
          "Differentiability everywhere",
          "Continuity on closed interval",
          "Monotonicity",
          "Symmetry",
        ],
        answerIndex: 1,
        explanation: "EVT is the foundation.",
      },
      {
        q: "If \\(f(2) = 5, f(5) = 3\\), critical point \\(f(3) = 7\\), global max on \\([2, 5]\\):",
        choices: ["3", "5", "7", "2"],
        answerIndex: 2,
        explanation: "Largest value is 7 at critical point 3.",
      },
      {
        q: "Candidates test doesn't apply on \\((0, 1)\\) because:",
        choices: [
          "Function is wrong",
          "Interval is open; EVT fails",
          "Derivative is undefined",
          "Always applies",
        ],
        answerIndex: 1,
        explanation: "Open interval doesn't guarantee extrema.",
      },
    ],
  },

  "5.6": {
    id: "5.6",
    title: "Determining Concavity of Functions over Their Domains",
    summary:
      "\\(f'' > 0\\) \\(\\Rightarrow\\) concave up; \\(f'' < 0\\) \\(\\Rightarrow\\) concave down. Inflection points are where concavity changes.",
    lesson:
      "Concavity:\n\n- \\(f'' > 0\\): slope is increasing \\(\\Rightarrow\\) \\(f\\) is concave up (bowl shape).\n- \\(f'' < 0\\): slope is decreasing \\(\\Rightarrow\\) \\(f\\) is concave down (inverted bowl).\n\nInflection points: \\(f''\\) changes sign. Typically found by solving \\(f''(x) = 0\\) or finding where \\(f''\\) is undefined, and checking the sign change.\n\nCaution: \\(f''(x) = 0\\) alone doesn't guarantee inflection (need sign change). Example: \\(f(x) = x^4\\) has \\(f''(0) = 0\\) but is concave up everywhere (no inflection).",
    keyIdeas: [
      "\\(f'' > 0\\): concave up; \\(f'' < 0\\): concave down.",
      "Inflection point: concavity changes (sign of \\(f''\\) changes).",
      "\\(f''(x) = 0\\) necessary but not sufficient.",
      "Use sign chart of \\(f''\\).",
    ],
    workedExample: {
      prompt:
        "Concavity and inflection points of \\(f(x) = x^3 - 3x\\).",
      solution:
        "\\(f'(x) = 3x^2 - 3, f''(x) = 6x\\). \\(f'' > 0\\) for \\(x > 0\\): concave up. \\(f'' < 0\\) for \\(x < 0\\): concave down. Sign changes at \\(x = 0\\): inflection point.",
    },
    flashcards: [
      { q: "Concave up means?", a: "\\(f'' > 0\\); graph curves upward like a bowl." },
      { q: "Inflection point?", a: "Where concavity changes — \\(f''\\) changes sign." },
    ],
    commonMistakes: [
      "Declaring an inflection point wherever \\(f'' = 0\\).",
      "Confusing \"concave up\" with \"increasing.\"",
      "Forgetting to check sign change.",
    ],
    quiz: [
      {
        q: "Concave up requires:",
        choices: ["\\(f > 0\\)", "\\(f' > 0\\)", "\\(f'' > 0\\)", "\\(f = 0\\)"],
        answerIndex: 2,
        explanation: "Second derivative positive.",
      },
      {
        q: "\\(f(x) = x^4\\). Inflection at \\(x = 0\\)?",
        choices: ["Yes", "No", "Cannot tell", "Only if \\(x < 0\\)"],
        answerIndex: 1,
        explanation: "\\(f'' = 12x^2 \\ge 0\\) everywhere; no sign change at 0.",
      },
      {
        q: "At inflection point, \\(f''\\):",
        choices: ["\\(> 0\\)", "\\(< 0\\)", "Changes sign", "Is constant"],
        answerIndex: 2,
        explanation: "Concavity changes.",
      },
      {
        q: "For \\(f(x) = \\ln x\\), concavity:",
        choices: [
          "Concave up everywhere",
          "Concave down everywhere",
          "Mixed",
          "Cannot determine",
        ],
        answerIndex: 1,
        explanation: "\\(f'' = -1/x^2 < 0\\) for \\(x > 0\\).",
      },
    ],
  },

  "5.7": {
    id: "5.7",
    title: "Using the Second Derivative Test to Determine Extrema",
    summary:
      "At a critical point \\(c\\): if \\(f''(c) > 0\\), local min; if \\(f''(c) < 0\\), local max; if \\(f''(c) = 0\\), test inconclusive.",
    lesson:
      "Second Derivative Test: at a critical point \\(c\\) where \\(f'(c) = 0\\):\n\n- \\(f''(c) > 0\\): local min (concave up \"cup\" at bottom).\n- \\(f''(c) < 0\\): local max (concave down \"frown\" at top).\n- \\(f''(c) = 0\\): inconclusive. Fall back on First Derivative Test.\n\nFaster than the First Derivative Test when computing \\(f''\\) is easy. But whenever \\(f''(c) = 0\\), switch to First Derivative Test.",
    keyIdeas: [
      "Requires \\(f'(c) = 0\\).",
      "\\(f''(c) > 0\\): min.",
      "\\(f''(c) < 0\\): max.",
      "\\(f''(c) = 0\\): inconclusive; use First Derivative Test.",
    ],
    workedExample: {
      prompt:
        "Classify extrema of \\(f(x) = x^3 - 3x\\) using second derivative test.",
      solution:
        "\\(f'(x) = 3x^2 - 3\\); critical points \\(x = \\pm 1\\). \\(f''(x) = 6x\\). \\(f''(1) = 6 > 0\\): local min. \\(f''(-1) = -6 < 0\\): local max.",
    },
    flashcards: [
      { q: "Second Derivative Test inputs?", a: "Critical points where \\(f'(c) = 0\\)." },
      { q: "What if \\(f''(c) = 0\\)?", a: "Inconclusive — fall back to first derivative test." },
    ],
    commonMistakes: [
      "Applying at non-critical points.",
      "Declaring extremum when \\(f''(c) = 0\\).",
      "Forgetting sign convention.",
    ],
    quiz: [
      {
        q: "\\(f'(c) = 0, f''(c) = -2\\). At \\(c\\):",
        choices: ["Local min", "Local max", "Inflection", "Nothing"],
        answerIndex: 1,
        explanation: "Negative second derivative = concave down = local max.",
      },
      {
        q: "Second derivative test is inconclusive when:",
        choices: ["\\(f'(c) = 0\\)", "\\(f''(c) = 0\\)", "\\(f(c) = 0\\)", "Always conclusive"],
        answerIndex: 1,
        explanation: "Zero second derivative blocks decision.",
      },
      {
        q: "\\(f(x) = x^4\\). At \\(x = 0\\), second derivative test gives:",
        choices: ["Local max", "Local min", "Inconclusive", "Inflection"],
        answerIndex: 2,
        explanation: "\\(f''(0) = 0\\) — inconclusive. (First derivative test shows local min.)",
      },
      {
        q: "Second derivative test requires first:",
        choices: [
          "\\(f''(c)\\) defined",
          "\\(f'(c) = 0\\)",
          "Both",
          "Neither",
        ],
        answerIndex: 2,
        explanation: "Need critical point and \\(f''\\) value.",
      },
    ],
  },

  "5.8": {
    id: "5.8",
    title: "Sketching Graphs of Functions and Their Derivatives",
    summary:
      "Convert between graphs of \\(f\\), \\(f'\\), and \\(f''\\). Slope of \\(f\\) = value of \\(f'\\); concavity of \\(f\\) = sign of \\(f''\\).",
    lesson:
      "Decoding graphs:\n\n- Where \\(f' > 0\\), \\(f\\) is increasing.\n- Where \\(f' = 0\\), \\(f\\) has a horizontal tangent (possible extremum).\n- Where \\(f' > 0\\) and decreasing to 0, \\(f\\) is approaching a local max.\n- Where \\(f' < 0\\), \\(f\\) is decreasing.\n- Zero crossings of \\(f'\\) correspond to extrema of \\(f\\).\n- \\(f''\\) tells concavity: zero crossings of \\(f''\\) correspond to inflection points of \\(f\\).\n\nReading backwards: given \\(f'\\), find \\(f\\) by tracing direction and slope.",
    keyIdeas: [
      "Slope of \\(f\\) = value of \\(f'\\).",
      "Zero of \\(f'\\) + sign change = extremum of \\(f\\).",
      "Sign of \\(f''\\) = concavity of \\(f\\).",
      "Zero of \\(f''\\) + sign change = inflection of \\(f\\).",
    ],
    workedExample: {
      prompt:
        "If graph of \\(f'\\) has zero at \\(x = 2\\) and crosses from \\(+\\) to \\(-\\), what is \\(x = 2\\) for \\(f\\)?",
      solution:
        "Local max.",
    },
    flashcards: [
      { q: "Critical points of \\(f\\) correspond to what on the graph of \\(f'\\)?", a: "Zeros of \\(f'\\)." },
      { q: "Inflection points of \\(f\\) correspond to what on \\(f''\\)?", a: "Sign changes (zeros crossing through zero) of \\(f''\\)." },
    ],
    commonMistakes: [
      "Confusing graph of \\(f\\) with graph of \\(f'\\).",
      "Reading extremum at every \\(f' = 0\\) (need sign change).",
      "Ignoring concavity info when \\(f''\\) is given.",
    ],
    quiz: [
      {
        q: "Graph of \\(f'\\) is positive on \\((-1, 3)\\). \\(f\\) is:",
        choices: ["Increasing on \\((-1, 3)\\)", "Decreasing on \\((-1, 3)\\)", "Constant", "Concave up"],
        answerIndex: 0,
        explanation: "Positive derivative = increasing.",
      },
      {
        q: "\\(f'\\) has zero at 4 but doesn't change sign. At \\(x = 4\\):",
        choices: ["Local max", "Local min", "Neither extremum", "Inflection"],
        answerIndex: 2,
        explanation: "No sign change = no extremum.",
      },
      {
        q: "If \\(f'' > 0\\) on \\((0, 5)\\), \\(f\\) is:",
        choices: ["Increasing", "Concave up", "Decreasing", "Linear"],
        answerIndex: 1,
        explanation: "Positive second derivative = concave up.",
      },
      {
        q: "Inflection points of \\(f\\) show up in graph of \\(f''\\) as:",
        choices: [
          "Maxima",
          "Minima",
          "Zeros with sign change",
          "Asymptotes",
        ],
        answerIndex: 2,
        explanation: "Concavity changes where \\(f''\\) crosses zero.",
      },
    ],
  },

  "5.9": {
    id: "5.9",
    title: "Connecting a Function, Its First Derivative, and Its Second Derivative",
    summary:
      "The triple relationship: \\(f\\) value, \\(f'\\) slope/monotonicity, \\(f''\\) concavity/extrema classification.",
    lesson:
      "Use all three derivatives together for a complete picture of \\(f\\):\n\n- \\(f\\) value: y-coordinate.\n- \\(f'\\) sign: increasing/decreasing.\n- \\(f'\\) zero + sign change: extremum location.\n- \\(f''\\) sign: concavity.\n- \\(f''\\) zero + sign change: inflection.\n\nA common AP prompt is: given info about \\(f\\) and \\(f'\\), determine \\(f''\\) behavior; or given graph of \\(f''\\), determine where \\(f\\) has inflection points.",
    keyIdeas: [
      "\\(f, f', f''\\) together give full picture.",
      "Monotonicity from \\(f'\\).",
      "Concavity from \\(f''\\).",
      "Classify extrema from sign changes.",
    ],
    workedExample: {
      prompt:
        "\\(f'\\) is increasing on \\((2, 5)\\). What does this say about \\(f''\\) and concavity of \\(f\\)?",
      solution:
        "\\(f'\\) increasing means \\((f')' = f'' > 0\\) on \\((2, 5)\\). \\(f\\) is concave up on \\((2, 5)\\).",
    },
    flashcards: [
      { q: "\\(f'\\) increasing means what about \\(f\\)?", a: "\\(f\\) is concave up." },
      { q: "Local min at \\(c\\) means about \\(f', f''\\)?", a: "\\(f'(c) = 0\\) and (if SDT applies) \\(f''(c) > 0\\)." },
    ],
    commonMistakes: [
      "Confusing \"\\(f'\\) increasing\" with \"\\(f\\) increasing.\"",
      "Assuming \\(f'(c) = 0\\) implies extremum without checking sign change.",
      "Reading concavity off \\(f'\\) instead of \\(f''\\).",
    ],
    quiz: [
      {
        q: "\\(f''(x) > 0\\) everywhere and \\(f'(a) = 0\\). At \\(x = a\\), \\(f\\) has:",
        choices: ["Local max", "Local min", "Inflection", "Nothing"],
        answerIndex: 1,
        explanation: "Concave up + zero first derivative = local min.",
      },
      {
        q: "\\(f'(x) > 0\\) and \\(f''(x) < 0\\) on an interval. \\(f\\) is:",
        choices: [
          "Increasing and concave up",
          "Increasing and concave down",
          "Decreasing and concave up",
          "Decreasing and concave down",
        ],
        answerIndex: 1,
        explanation: "Positive first + negative second.",
      },
      {
        q: "If \\(f'\\) has a local min at \\(x = 3\\), then \\(f\\) has:",
        choices: ["Inflection at 3", "Local max at 3", "Local min at 3", "Nothing"],
        answerIndex: 0,
        explanation: "\\(f'\\) min means \\(f''\\) changes sign from \\(-\\) to \\(+\\) — concavity change in \\(f\\).",
      },
      {
        q: "\\(f''(c) = 0\\) guarantees:",
        choices: [
          "Inflection at \\(c\\)",
          "Nothing without sign change check",
          "Max at \\(c\\)",
          "Min at \\(c\\)",
        ],
        answerIndex: 1,
        explanation: "Zero \\(f''\\) is necessary but not sufficient.",
      },
    ],
  },

  "5.10": {
    id: "5.10",
    title: "Introduction to Optimization Problems",
    summary:
      "Optimization: find the input that maximizes or minimizes a quantity, subject to constraints.",
    lesson:
      "Optimization workflow:\n\n1) Read carefully; identify the quantity to optimize (objective).\n2) Draw a diagram and label variables.\n3) Write constraint equation(s).\n4) Express objective in one variable using the constraint.\n5) Take derivative, set to zero, solve.\n6) Verify it's a max or min (second derivative or first derivative test).\n7) Answer the specific question with units.\n\nDomain matters: constraints often impose a closed interval. Use candidates test for global extremum.",
    keyIdeas: [
      "Identify objective and constraints.",
      "Reduce to one variable.",
      "Set derivative to zero; classify.",
      "Respect domain constraints.",
    ],
    workedExample: {
      prompt:
        "Find two positive numbers that sum to 20 and maximize their product.",
      solution:
        "Constraint: \\(x + y = 20 \\Rightarrow y = 20 - x\\). Objective: \\(P(x) = x(20 - x) = 20x - x^2\\). \\(P'(x) = 20 - 2x = 0 \\Rightarrow x = 10\\). \\(P''(x) = -2 < 0\\), local max. Both numbers = 10; max product = 100.",
    },
    flashcards: [
      { q: "First step in an optimization problem?", a: "Identify the quantity to optimize and the constraint(s)." },
      { q: "Why reduce to one variable?", a: "So you can differentiate with respect to a single input." },
    ],
    commonMistakes: [
      "Not using the constraint to eliminate a variable.",
      "Forgetting to check domain endpoints.",
      "Declaring max without verifying.",
    ],
    quiz: [
      {
        q: "In optimization, constraint equations usually:",
        choices: [
          "Add variables",
          "Eliminate variables",
          "Replace the objective",
          "Are ignored",
        ],
        answerIndex: 1,
        explanation: "Use constraint to express objective in one variable.",
      },
      {
        q: "Maximize \\(A = xy\\) with \\(x + y = 8\\). Optimal \\(x = y =\\)",
        choices: ["2", "4", "8", "6"],
        answerIndex: 1,
        explanation: "Symmetric: \\(x = y = 4\\).",
      },
      {
        q: "Why check the endpoints of the feasible interval?",
        choices: [
          "To find inflection",
          "Because global extrema may occur there",
          "They're always extrema",
          "Never needed",
        ],
        answerIndex: 1,
        explanation: "Candidates test.",
      },
      {
        q: "After solving, you should verify:",
        choices: [
          "Nothing",
          "Solution is max/min and respects constraints",
          "The calculator works",
          "Answer is an integer",
        ],
        answerIndex: 1,
        explanation: "Classification + domain check.",
      },
    ],
  },

  "5.11": {
    id: "5.11",
    title: "Solving Optimization Problems",
    summary:
      "Apply the optimization workflow to classic setups: rectangle-in-parabola, minimal-surface cans, ladder/fence problems.",
    lesson:
      "Common setups:\n\n- Max area rectangle inscribed in a curve: parameterize, write area, constrain by curve.\n- Minimum surface area for fixed volume: express surface as a function of one dimension using volume constraint.\n- Ladder problems, fence problems: geometry-based constraints.\n- Business: max revenue, min cost.\n\nDon't lose sight of units and reasonable domains. If the variable is a length, it must be positive; if the domain is closed, endpoints are candidates.\n\nWhen the problem says \"cannot be simpler than,\" that's a hint to use calculus rather than symmetry tricks.",
    keyIdeas: [
      "Identify objective + constraints + domain.",
      "Express in one variable, differentiate, classify.",
      "Respect physical domain constraints.",
      "Always state answer with units.",
    ],
    workedExample: {
      prompt:
        "A rectangle has its base on the x-axis and upper corners on \\(y = 4 - x^2\\). Max area?",
      solution:
        "Corners at \\((x, 4 - x^2)\\) and \\((-x, 4 - x^2)\\). \\(A(x) = 2x(4 - x^2) = 8x - 2x^3\\). \\(A'(x) = 8 - 6x^2 = 0 \\Rightarrow x = 2/\\sqrt{3}\\). Max area \\(A = 2 \\cdot (2/\\sqrt{3})(4 - 4/3) = 32/(3\\sqrt{3})\\).",
    },
    flashcards: [
      { q: "Min surface area for fixed cylinder volume \\(V\\) — relation between radius and height?", a: "\\(h = 2r\\) (for closed cylinder)." },
      { q: "Max rectangle in a semicircle of radius \\(R\\)?", a: "\\(x = R/\\sqrt{2}, y = R/\\sqrt{2}\\); area = \\(R^2\\)." },
    ],
    commonMistakes: [
      "Using a wrong constraint.",
      "Failing to check that the critical point is feasible.",
      "Not verifying max vs min.",
    ],
    quiz: [
      {
        q: "Rectangle with perimeter 20 has max area when:",
        choices: ["Square, \\(5 \\times 5\\)", "\\(2 \\times 8\\)", "\\(1 \\times 9\\)", "Depends"],
        answerIndex: 0,
        explanation: "Square maximizes area for fixed perimeter.",
      },
      {
        q: "Cylinder volume fixed. Surface area minimized when:",
        choices: [
          "\\(h = r\\)",
          "\\(h = 2r\\)",
          "\\(r = 2h\\)",
          "Height doesn't matter",
        ],
        answerIndex: 1,
        explanation: "Classic result for closed cylinder.",
      },
      {
        q: "For a max rectangle under \\(y = 4 - x^2\\), the critical point is at \\(x =\\)",
        choices: ["1", "\\(2/\\sqrt{3}\\)", "2", "\\(\\sqrt{3}\\)"],
        answerIndex: 1,
        explanation: "Derivative zero at \\(x = 2/\\sqrt{3}\\).",
      },
      {
        q: "Always required in a full AP optimization answer?",
        choices: [
          "Units and verification",
          "Only a numeric value",
          "A chart",
          "Second derivative of the constraint",
        ],
        answerIndex: 0,
        explanation: "Graders check units and classification.",
      },
    ],
  },

  "5.12": {
    id: "5.12",
    title: "Exploring Behaviors of Implicit Relations",
    summary:
      "Implicit equations \\(F(x, y) = 0\\) have tangent lines where \\(F_y \\ne 0\\); horizontal tangents where \\(dy/dx = 0\\); vertical tangents where \\(dy/dx\\) blows up.",
    lesson:
      "For an implicitly defined curve \\(F(x, y) = 0\\):\n\n- Horizontal tangent: \\(dy/dx = 0\\). Solve numerator of \\(dy/dx\\) = 0 alongside \\(F = 0\\).\n- Vertical tangent: \\(dy/dx\\) is undefined — denominator of \\(dy/dx\\) = 0, numerator \\(\\ne 0\\).\n- Critical points: horizontal tangent points that satisfy the curve equation.\n\nConcavity via implicit differentiation of the first derivative gives \\(d^2y/dx^2\\), used for inflection analysis.\n\nKey subtlety: implicit relations may have loops (non-functions). The derivative gives you tangent info at every smooth point.",
    keyIdeas: [
      "\\(dy/dx = 0\\) for horizontal tangent.",
      "\\(dy/dx\\) undefined for vertical tangent.",
      "Satisfy the original equation when solving.",
      "Implicit relations can have multiple branches.",
    ],
    workedExample: {
      prompt:
        "\\(x^2 + y^2 = 25\\). Find points with horizontal and vertical tangents.",
      solution:
        "\\(dy/dx = -x/y\\). Horizontal: \\(x = 0 \\Rightarrow y = \\pm 5\\), giving \\((0, 5), (0, -5)\\). Vertical: \\(y = 0 \\Rightarrow x = \\pm 5\\), giving \\((5, 0), (-5, 0)\\).",
    },
    flashcards: [
      { q: "Horizontal tangent condition?", a: "\\(dy/dx = 0\\); numerator of \\(dy/dx\\) = 0 and denominator \\(\\ne 0\\)." },
      { q: "Vertical tangent condition?", a: "Denominator of \\(dy/dx\\) = 0, numerator \\(\\ne 0\\)." },
    ],
    commonMistakes: [
      "Solving \\(dy/dx\\) numerator = 0 without checking the curve equation.",
      "Forgetting vertical tangents.",
      "Reading implicit derivatives as explicit.",
    ],
    quiz: [
      {
        q: "For \\(x^2 + y^2 = 9\\), horizontal tangents occur at:",
        choices: ["\\((0, \\pm 3)\\)", "\\((\\pm 3, 0)\\)", "\\((1, 2\\sqrt{2})\\)", "No horizontal tangents"],
        answerIndex: 0,
        explanation: "Horizontal when \\(x = 0\\); y-intercepts.",
      },
      {
        q: "\\(dy/dx = (x + y)/(x - y)\\). Vertical tangent when:",
        choices: ["\\(x = y\\)", "\\(x = -y\\)", "\\(x = 0\\)", "\\(y = 0\\)"],
        answerIndex: 0,
        explanation: "Denominator zero = vertical tangent.",
      },
      {
        q: "Implicit derivatives often depend on:",
        choices: ["\\(x\\) only", "\\(y\\) only", "Both \\(x\\) and \\(y\\)", "Neither"],
        answerIndex: 2,
        explanation: "Typical feature of implicit differentiation.",
      },
      {
        q: "To find \\(d^2y/dx^2\\) implicitly:",
        choices: [
          "Differentiate \\(F\\) again",
          "Differentiate \\(dy/dx\\) again, substituting \\(dy/dx\\) where it reappears",
          "Use quotient rule on \\(x\\)",
          "Solve for \\(y\\)",
        ],
        answerIndex: 1,
        explanation: "Re-differentiate the implicit first derivative.",
      },
    ],
  },

  "6.1": {
    id: "6.1",
    title: "Exploring Accumulations of Change",
    summary:
      "A definite integral is the accumulation of a rate over an interval — total change = integral of rate.",
    lesson:
      "If \\(R(t)\\) is a rate of change (like velocity or flow rate), then \\(\\int_a^b R(t)\\, dt\\) is the net accumulation over \\([a, b]\\). If \\(R\\) is velocity, the integral gives displacement; if \\(R\\) is a leak rate, the integral is total volume lost.\n\nThis is the foundation of the Fundamental Theorem of Calculus: total change of \\(F\\) on \\([a, b]\\) equals \\(\\int_a^b F'(t)\\, dt\\).\n\nOn the FRQ, accumulation questions ask: \"how much water is in the tank at \\(t = 10\\)?\" Answer: initial amount + \\(\\int_0^{10} (\\text{rate in} - \\text{rate out})\\, dt\\).",
    keyIdeas: [
      "Integral of rate = accumulated change.",
      "Position = initial position + integral of velocity.",
      "Net accumulation considers sign of rate.",
      "Foundation for FTC.",
    ],
    workedExample: {
      prompt:
        "Water enters a tank at rate \\(R(t) = 3 + 2t\\) gal/min for \\(0 \\le t \\le 4\\). How much water entered total?",
      solution:
        "\\(\\int_0^4 (3 + 2t)\\, dt = [3t + t^2]_0^4 = 12 + 16 = 28\\) gallons.",
    },
    flashcards: [
      { q: "What does \\(\\int_a^b v(t)\\, dt\\) give for velocity \\(v\\)?", a: "Net displacement from \\(a\\) to \\(b\\)." },
      { q: "Total amount = initial + ?", a: "Integral of net rate of change." },
    ],
    commonMistakes: [
      "Confusing displacement (signed) with total distance (unsigned).",
      "Ignoring initial amount in 'total' problems.",
      "Integrating quantity instead of rate.",
    ],
    quiz: [
      {
        q: "A car moves at velocity \\(v(t) = 3t\\) for \\(0 \\le t \\le 2\\). Displacement:",
        choices: ["0", "3", "6", "9"],
        answerIndex: 2,
        explanation: "\\(\\int_0^2 3t\\, dt = 6\\).",
      },
      {
        q: "If \\(W(t)\\) is the rate of water flow (gal/min) and \\(W(t) < 0\\), what does \\(\\int W\\, dt\\) represent?",
        choices: ["Water added", "Water removed (negative accumulation)", "Speed", "Pressure"],
        answerIndex: 1,
        explanation: "Negative rate integrates to net outflow.",
      },
      {
        q: "Total water in tank at time \\(t\\) = initial +",
        choices: [
          "Rate at time \\(t\\)",
          "\\(\\int_0^t R(s)\\, ds\\)",
          "\\(R'(t)\\)",
          "Just initial",
        ],
        answerIndex: 1,
        explanation: "Accumulation integral.",
      },
      {
        q: "Distance vs displacement: distance uses:",
        choices: ["\\(\\int v\\, dt\\)", "\\(\\int |v|\\, dt\\)", "\\(v(t)\\)", "Average velocity"],
        answerIndex: 1,
        explanation: "Distance is accumulated speed.",
      },
    ],
  },

  "6.2": {
    id: "6.2",
    title: "Approximating Areas with Riemann Sums",
    summary:
      "Left, right, midpoint, and trapezoidal sums approximate the area under a curve by rectangles or trapezoids.",
    lesson:
      "Divide \\([a, b]\\) into \\(n\\) subintervals of width \\(\\Delta x = (b - a)/n\\). Sample \\(f\\) at chosen points to build rectangles or trapezoids.\n\n- Left Riemann sum: \\(f(x_0) + f(x_1) + \\cdots + f(x_{n-1})\\), each times \\(\\Delta x\\).\n- Right Riemann sum: \\(f(x_1) + \\cdots + f(x_n)\\), each times \\(\\Delta x\\).\n- Midpoint: use midpoints of each subinterval.\n- Trapezoidal: average of left and right sums; \\(T_n = (\\Delta x / 2)[f(x_0) + 2 f(x_1) + \\cdots + 2 f(x_{n-1}) + f(x_n)]\\).\n\nOver/underestimates: on an increasing function, LRAM is under, RRAM is over; on a decreasing function, LRAM is over, RRAM is under. Trapezoidal overshoots on concave up, undershoots on concave down.",
    keyIdeas: [
      "\\(\\Delta x = (b - a)/n\\).",
      "Left, right, midpoint, trapezoidal all approximate area.",
      "Increasing: LRAM under, RRAM over.",
      "Trapezoidal: over if concave up.",
    ],
    workedExample: {
      prompt:
        "Estimate \\(\\int_0^2 x^2\\, dx\\) with left Riemann sum using \\(n = 4\\).",
      solution:
        "\\(\\Delta x = 0.5\\). Left points: 0, 0.5, 1, 1.5. Sum: \\(0.5(0 + 0.25 + 1 + 2.25) = 1.75\\). (True value \\(8/3 \\approx 2.67\\).)",
    },
    flashcards: [
      { q: "Formula for \\(\\Delta x\\)?", a: "\\((b - a)/n\\)." },
      { q: "Trapezoidal formula?", a: "\\((\\Delta x/2)[f(x_0) + 2f(x_1) + \\cdots + 2f(x_{n-1}) + f(x_n)]\\)." },
    ],
    commonMistakes: [
      "Using the wrong sample points (e.g., right endpoints for LRAM).",
      "Forgetting \\(\\Delta x\\) multiplier.",
      "Misjudging over vs under estimate direction.",
    ],
    quiz: [
      {
        q: "Left Riemann sum for \\(\\int_0^4 f\\, dx\\) with \\(n = 2\\) uses samples at:",
        choices: ["0 and 2", "2 and 4", "0 and 4", "1 and 3"],
        answerIndex: 0,
        explanation: "Left endpoints of subintervals [0,2] and [2,4].",
      },
      {
        q: "For increasing \\(f\\), RRAM is:",
        choices: ["Under-estimate", "Over-estimate", "Exact", "Cannot tell"],
        answerIndex: 1,
        explanation: "Right endpoint hits higher values.",
      },
      {
        q: "Trapezoidal estimate on concave up \\(f\\) is:",
        choices: ["Under", "Over", "Exact", "Depends"],
        answerIndex: 1,
        explanation: "Chord lies above curve on concave-up intervals.",
      },
      {
        q: "Increasing number of subintervals \\(n\\):",
        choices: [
          "Makes estimate worse",
          "Makes estimate better (approaches integral)",
          "Doesn't matter",
          "Makes estimate constant",
        ],
        answerIndex: 1,
        explanation: "More rectangles = better approximation.",
      },
    ],
  },

  "6.3": {
    id: "6.3",
    title: "Riemann Sums, Summation Notation, and Definite Integral Notation",
    summary:
      "The definite integral is the limit of Riemann sums as \\(n \\to \\infty\\): \\(\\int_a^b f(x)\\, dx = \\lim_{n \\to \\infty} \\sum f(x_i) \\Delta x\\).",
    lesson:
      "Riemann sum in sigma notation: \\(\\sum_{i=1}^n f(x_i^*) \\Delta x\\), where \\(x_i^*\\) is a sample point in the \\(i\\)-th subinterval.\n\nDefinite integral: \\(\\int_a^b f(x)\\, dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x\\), as long as the limit exists (it does for continuous \\(f\\)).\n\nInterpret definite integrals as signed area between curve and x-axis.\n\nRecognize a limit of Riemann sums and rewrite as an integral. For example, \\(\\lim_{n \\to \\infty} \\sum_{i=1}^n (2 + 3i/n)^2 \\cdot (3/n) = \\int_2^5 x^2 \\, dx\\).",
    keyIdeas: [
      "Riemann sum = \\(\\sum f(x_i^*) \\Delta x\\).",
      "Integral = limit as \\(n \\to \\infty\\).",
      "Signed area interpretation.",
      "Practice converting Riemann sums to integrals.",
    ],
    workedExample: {
      prompt:
        "Express \\(\\lim_{n \\to \\infty} \\sum_{i=1}^n (1 + i/n)^3 (1/n)\\) as a definite integral.",
      solution:
        "\\(\\Delta x = 1/n\\), \\(x_i = 1 + i/n\\) — samples from \\([1, 2]\\). So the integral is \\(\\int_1^2 x^3\\, dx\\).",
    },
    flashcards: [
      { q: "Riemann sum in sigma notation?", a: "\\(\\sum_{i=1}^n f(x_i^*) \\Delta x\\)." },
      { q: "Definite integral definition?", a: "\\(\\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x\\)." },
    ],
    commonMistakes: [
      "Confusing sigma index bounds.",
      "Missing \\(\\Delta x\\) factor.",
      "Misidentifying \\(a\\) and \\(b\\) from Riemann sum.",
    ],
    quiz: [
      {
        q: "\\(\\int_a^b f(x)\\, dx\\) equals:",
        choices: [
          "\\(\\sum f(x_i) \\Delta x\\) for finite \\(n\\)",
          "\\(\\lim_{n \\to \\infty} \\sum f(x_i^*) \\Delta x\\)",
          "\\(f(b) - f(a)\\)",
          "Average value",
        ],
        answerIndex: 1,
        explanation: "Definition as limit.",
      },
      {
        q: "Riemann sum \\(\\sum_{i=1}^n (2i/n)^2 (2/n)\\) represents:",
        choices: [
          "\\(\\int_0^2 x^2\\, dx\\)",
          "\\(\\int_0^1 x^2\\, dx\\)",
          "\\(\\int_2^4 x^2\\, dx\\)",
          "\\(\\int_1^2 x^2\\, dx\\)",
        ],
        answerIndex: 0,
        explanation: "\\(\\Delta x = 2/n, x_i = 2i/n\\), interval \\([0, 2]\\).",
      },
      {
        q: "Signed area: below x-axis contributes as:",
        choices: ["Positive", "Negative", "Zero", "Absolute value"],
        answerIndex: 1,
        explanation: "Definite integral counts signed area.",
      },
      {
        q: "For continuous \\(f\\), the limit of Riemann sums:",
        choices: [
          "May not exist",
          "Depends on sample point choice",
          "Exists and is independent of choice",
          "Is always zero",
        ],
        answerIndex: 2,
        explanation: "Continuous \\(\\Rightarrow\\) Riemann integrable.",
      },
    ],
  },

  "6.4": {
    id: "6.4",
    title: "The Fundamental Theorem of Calculus and Accumulation Functions",
    summary:
      "If \\(F(x) = \\int_a^x f(t)\\, dt\\), then \\(F'(x) = f(x)\\).",
    lesson:
      "FTC Part 1: for continuous \\(f\\), the accumulation function \\(F(x) = \\int_a^x f(t)\\, dt\\) is differentiable with \\(F'(x) = f(x)\\).\n\nThis says differentiation and integration are inverse processes.\n\nIf the upper limit is a function \\(u(x)\\), use chain rule: \\(\\frac{d}{dx}\\int_a^{u(x)} f(t)\\, dt = f(u(x)) \\cdot u'(x)\\).\n\nAccumulation functions show up constantly on the AP. Questions ask: \"at what \\(x\\) is \\(F\\) increasing / has a local max / is concave up?\" Translate: \\(F' = f\\), so \\(F\\) increasing means \\(f > 0\\); local max of \\(F\\) where \\(f\\) changes from \\(+\\) to \\(-\\); concavity of \\(F\\) governed by \\(f'\\).",
    keyIdeas: [
      "FTC 1: \\(F(x) = \\int_a^x f(t)\\, dt \\Rightarrow F'(x) = f(x)\\).",
      "Chain rule for variable upper limit: multiply by \\(u'(x)\\).",
      "\\(F\\) increasing where \\(f > 0\\).",
      "Local max of \\(F\\) where \\(f\\) switches \\(+ \\to -\\).",
    ],
    workedExample: {
      prompt:
        "Let \\(F(x) = \\int_0^{x^2} \\sin t\\, dt\\). Find \\(F'(x)\\).",
      solution:
        "By FTC + chain rule: \\(F'(x) = \\sin(x^2) \\cdot 2x\\).",
    },
    flashcards: [
      { q: "FTC Part 1?", a: "If \\(F(x) = \\int_a^x f(t)\\, dt\\) then \\(F'(x) = f(x)\\)." },
      { q: "Upper limit is \\(u(x)\\)?", a: "\\(F'(x) = f(u(x)) u'(x)\\)." },
    ],
    commonMistakes: [
      "Forgetting chain factor when upper limit is \\(u(x)\\).",
      "Confusing \\(F'\\) with \\(f'\\).",
      "Ignoring sign of \\(f\\) when analyzing \\(F\\).",
    ],
    quiz: [
      {
        q: "\\(F(x) = \\int_1^x t^2\\, dt\\). \\(F'(3) =\\)",
        choices: ["0", "3", "9", "27"],
        answerIndex: 2,
        explanation: "FTC: \\(F'(x) = x^2\\); at 3, equals 9.",
      },
      {
        q: "\\(F(x) = \\int_0^{3x} \\cos t\\, dt\\). \\(F'(x) =\\)",
        choices: ["\\(\\cos(3x)\\)", "\\(3\\cos(3x)\\)", "\\(\\sin(3x)\\)", "\\(3 \\sin(3x)\\)"],
        answerIndex: 1,
        explanation: "Chain rule: \\(\\cos(3x) \\cdot 3\\).",
      },
      {
        q: "If \\(f > 0\\) on an interval, the accumulation function is:",
        choices: [
          "Constant",
          "Decreasing",
          "Increasing",
          "Oscillating",
        ],
        answerIndex: 2,
        explanation: "Derivative of \\(F\\) is \\(f > 0\\).",
      },
      {
        q: "Local max of \\(F(x) = \\int_0^x f(t)\\, dt\\) occurs where \\(f\\):",
        choices: [
          "Has a local max",
          "Changes from \\(+\\) to \\(-\\)",
          "Changes from \\(-\\) to \\(+\\)",
          "Is zero without sign change",
        ],
        answerIndex: 1,
        explanation: "\\(F' = f\\); sign change \\(+ \\to -\\) = local max of \\(F\\).",
      },
    ],
  },

  "6.5": {
    id: "6.5",
    title: "Interpreting the Behavior of Accumulation Functions Involving Area",
    summary:
      "\\(F(x) = \\int_a^x f(t)\\, dt\\) represents cumulative signed area. Use the graph of \\(f\\) to deduce \\(F\\).",
    lesson:
      "Given the graph of \\(f\\), read off behavior of \\(F(x) = \\int_a^x f(t)\\, dt\\):\n\n- \\(F\\) increases where \\(f > 0\\) (above x-axis).\n- \\(F\\) decreases where \\(f < 0\\).\n- \\(F\\) has local max where \\(f\\) crosses from \\(+\\) to \\(-\\); local min where \\(-\\) to \\(+\\).\n- \\(F\\) concave up where \\(f\\) is increasing; concave down where \\(f\\) decreasing.\n- \\(F\\) has inflection where \\(f\\) has a local extremum.\n\nAccumulation questions appear on FRQs with a graph of \\(f\\) and ask you to compare values or find extrema of \\(F\\) without an explicit formula.",
    keyIdeas: [
      "\\(F\\) = cumulative signed area under \\(f\\).",
      "\\(F' = f\\); concavity of \\(F\\) from \\(f'\\).",
      "Extrema of \\(F\\) \\(\\leftrightarrow\\) sign changes of \\(f\\).",
      "Inflection of \\(F\\) \\(\\leftrightarrow\\) extrema of \\(f\\).",
    ],
    workedExample: {
      prompt:
        "\\(f\\) has zero at \\(x = 2\\) (switches \\(+ \\to -\\)). What happens to \\(F(x) = \\int_0^x f(t)\\, dt\\) at \\(x = 2\\)?",
      solution:
        "\\(F' = f\\) changes from \\(+\\) to \\(-\\): \\(F\\) has a local max at \\(x = 2\\).",
    },
    flashcards: [
      { q: "Concavity of \\(F\\) relates to what of \\(f\\)?", a: "Monotonicity of \\(f\\): \\(F\\) concave up iff \\(f\\) increasing." },
      { q: "Zero of \\(f\\) with sign change?", a: "Local extremum of \\(F\\)." },
    ],
    commonMistakes: [
      "Confusing behavior of \\(f\\) with behavior of \\(F\\).",
      "Reading area signs incorrectly.",
      "Ignoring cumulative nature of \\(F\\).",
    ],
    quiz: [
      {
        q: "\\(f < 0\\) on \\((1, 3)\\). On \\((1, 3)\\), the accumulation function \\(F\\) is:",
        choices: ["Increasing", "Decreasing", "Constant", "Concave up"],
        answerIndex: 1,
        explanation: "Negative derivative.",
      },
      {
        q: "\\(f\\) has local max at \\(x = 2\\). \\(F\\) has:",
        choices: [
          "Local max at 2",
          "Local min at 2",
          "Inflection at 2",
          "Nothing at 2",
        ],
        answerIndex: 2,
        explanation: "\\(F\\) inflection where \\(f\\) has extremum.",
      },
      {
        q: "\\(F(x) = \\int_0^x f(t)\\, dt\\), \\(f\\) positive on \\([0, 3]\\). \\(F(3)\\) is:",
        choices: [
          "Negative",
          "Zero",
          "Positive",
          "Unknown",
        ],
        answerIndex: 2,
        explanation: "Area under positive function.",
      },
      {
        q: "\\(f\\) crosses from \\(-\\) to \\(+\\) at \\(x = 4\\). \\(F\\) at \\(x = 4\\):",
        choices: [
          "Local max",
          "Local min",
          "Inflection",
          "Nothing",
        ],
        answerIndex: 1,
        explanation: "\\(F'\\) switches \\(- \\to +\\): local min.",
      },
    ],
  },

  "6.6": {
    id: "6.6",
    title: "Applying Properties of Definite Integrals",
    summary:
      "Linearity, additivity over intervals, and swap-bounds rule let you manipulate integrals algebraically.",
    lesson:
      "Key properties:\n\n1) \\(\\int_a^a f\\, dx = 0\\).\n2) \\(\\int_a^b f\\, dx = -\\int_b^a f\\, dx\\) (swap bounds).\n3) Linearity: \\(\\int (c f + d g)\\, dx = c \\int f + d \\int g\\).\n4) Additivity: \\(\\int_a^c f + \\int_c^b f = \\int_a^b f\\).\n5) If \\(f \\le g\\) on \\([a, b]\\), \\(\\int_a^b f \\le \\int_a^b g\\).\n6) \\(|\\int f| \\le \\int |f|\\).\n\nUse these to combine or split integrals in tabular FRQs. Symmetry properties: for odd \\(f\\), \\(\\int_{-a}^a f\\, dx = 0\\); for even \\(f\\), \\(\\int_{-a}^a f = 2 \\int_0^a f\\).",
    keyIdeas: [
      "Swap bounds negates.",
      "Additivity joins adjacent intervals.",
      "Linearity pulls constants and splits sums.",
      "Symmetry tricks for odd/even functions.",
    ],
    workedExample: {
      prompt:
        "If \\(\\int_1^4 f = 5, \\int_1^7 f = 11\\), find \\(\\int_4^7 f\\).",
      solution:
        "\\(\\int_1^4 f + \\int_4^7 f = \\int_1^7 f \\Rightarrow 5 + \\int_4^7 f = 11 \\Rightarrow \\int_4^7 f = 6\\).",
    },
    flashcards: [
      { q: "\\(\\int_a^a f\\, dx\\)?", a: "0." },
      { q: "\\(\\int_a^b f\\, dx = -?\\)", a: "\\(\\int_b^a f\\, dx\\)." },
      { q: "Odd function integrated symmetrically?", a: "Zero." },
    ],
    commonMistakes: [
      "Forgetting to negate when swapping bounds.",
      "Misapplying additivity to non-adjacent intervals.",
      "Treating \\(\\int fg\\) as \\(\\int f \\cdot \\int g\\) (false).",
    ],
    quiz: [
      {
        q: "\\(\\int_2^5 f = 3, \\int_2^5 g = -1\\). \\(\\int_2^5 (2f - 3g) =\\)",
        choices: ["0", "3", "9", "-3"],
        answerIndex: 2,
        explanation: "Linearity: \\(2(3) - 3(-1) = 9\\).",
      },
      {
        q: "\\(\\int_{-2}^{2} x^3\\, dx =\\)",
        choices: ["0", "4", "\\(-4\\)", "Unknown"],
        answerIndex: 0,
        explanation: "\\(x^3\\) is odd; symmetric integral is 0.",
      },
      {
        q: "\\(\\int_1^5 f = 10, \\int_5^3 f = ?\\) if \\(\\int_1^3 f = 4\\):",
        choices: ["6", "-6", "10", "14"],
        answerIndex: 1,
        explanation: "\\(\\int_3^5 f = 10 - 4 = 6\\); swap: \\(\\int_5^3 = -6\\).",
      },
      {
        q: "Which property is TRUE?",
        choices: [
          "\\(\\int fg = \\int f \\cdot \\int g\\)",
          "\\(\\int a^b f = \\int_b^a f\\)",
          "\\(\\int_a^b (f + g) = \\int f + \\int g\\)",
          "\\(\\int_0^0 f = f(0)\\)",
        ],
        answerIndex: 2,
        explanation: "Linearity.",
      },
    ],
  },

  "6.7": {
    id: "6.7",
    title: "The Fundamental Theorem of Calculus and Definite Integrals",
    summary:
      "FTC 2: \\(\\int_a^b f(x)\\, dx = F(b) - F(a)\\) where \\(F\\) is any antiderivative of \\(f\\).",
    lesson:
      "FTC Part 2 (evaluation theorem): if \\(f\\) is continuous on \\([a, b]\\) and \\(F\\) is any antiderivative of \\(f\\), then \\(\\int_a^b f(x)\\, dx = F(b) - F(a)\\). This turns integration into finding antiderivatives plus plugging in.\n\nNotation: \\([F(x)]_a^b = F(b) - F(a)\\).\n\nMemorize standard antiderivatives: \\(\\int x^n\\, dx = x^{n+1}/(n+1) + C\\) for \\(n \\ne -1\\); \\(\\int 1/x\\, dx = \\ln|x| + C\\); \\(\\int e^x\\, dx = e^x + C\\); \\(\\int \\sin x\\, dx = -\\cos x + C\\); \\(\\int \\cos x\\, dx = \\sin x + C\\); \\(\\int \\sec^2 x\\, dx = \\tan x + C\\); etc.",
    keyIdeas: [
      "FTC 2: \\(\\int_a^b f = F(b) - F(a)\\) for any antiderivative \\(F\\).",
      "Need continuity (or at least integrability) on \\([a, b]\\).",
      "Start with antiderivative, then plug in endpoints.",
      "Memorize basic antiderivatives.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\int_0^{\\pi} \\sin x\\, dx\\).",
      solution:
        "\\([-\\cos x]_0^{\\pi} = -\\cos \\pi - (-\\cos 0) = 1 + 1 = 2\\).",
    },
    flashcards: [
      { q: "FTC 2?", a: "\\(\\int_a^b f\\, dx = F(b) - F(a)\\) for any antiderivative \\(F\\)." },
      { q: "\\(\\int 1/x\\, dx\\)?", a: "\\(\\ln|x| + C\\)." },
    ],
    commonMistakes: [
      "Using wrong antiderivative.",
      "Forgetting to subtract \\(F(a)\\).",
      "Applying FTC when \\(f\\) has discontinuity in \\([a, b]\\).",
    ],
    quiz: [
      {
        q: "\\(\\int_0^2 x^2\\, dx =\\)",
        choices: ["4/3", "8/3", "2", "4"],
        answerIndex: 1,
        explanation: "\\([x^3/3]_0^2 = 8/3\\).",
      },
      {
        q: "\\(\\int_1^e 1/x\\, dx =\\)",
        choices: ["0", "1", "\\(e\\)", "\\(e - 1\\)"],
        answerIndex: 1,
        explanation: "\\([\\ln x]_1^e = 1 - 0 = 1\\).",
      },
      {
        q: "\\(\\int_0^1 e^x\\, dx =\\)",
        choices: ["\\(e\\)", "\\(e - 1\\)", "1", "0"],
        answerIndex: 1,
        explanation: "\\([e^x]_0^1 = e - 1\\).",
      },
      {
        q: "\\(\\int_{-1}^1 3x^2\\, dx =\\)",
        choices: ["0", "1", "2", "3"],
        answerIndex: 2,
        explanation: "\\([x^3]_{-1}^1 = 1 - (-1) = 2\\).",
      },
    ],
  },

  "6.8": {
    id: "6.8",
    title: "Finding Antiderivatives and Indefinite Integrals: Basic Rules and Notation",
    summary:
      "\\(\\int f(x)\\, dx = F(x) + C\\) where \\(F' = f\\). Add \\(C\\) for indefinite integrals.",
    lesson:
      "The indefinite integral \\(\\int f(x)\\, dx = F(x) + C\\) represents the family of all antiderivatives of \\(f\\). The constant \\(C\\) is non-negotiable — don't omit it on indefinite integrals.\n\nBasic antiderivatives:\n- \\(\\int x^n\\, dx = x^{n+1}/(n+1) + C\\) for \\(n \\ne -1\\).\n- \\(\\int 1/x\\, dx = \\ln|x| + C\\).\n- \\(\\int e^x\\, dx = e^x + C\\).\n- \\(\\int \\sin x\\, dx = -\\cos x + C\\).\n- \\(\\int \\cos x\\, dx = \\sin x + C\\).\n- \\(\\int \\sec^2 x\\, dx = \\tan x + C\\).\n- \\(\\int \\sec x \\tan x\\, dx = \\sec x + C\\).\n- \\(\\int 1/\\sqrt{1-x^2}\\, dx = \\arcsin x + C\\).\n- \\(\\int 1/(1+x^2)\\, dx = \\arctan x + C\\).\n\nLinearity: constants pull out; sums split.",
    keyIdeas: [
      "Indefinite integrals include \\(+ C\\).",
      "Basic power and trig antiderivatives are must-know.",
      "Linearity works for indefinite integrals too.",
      "Check by differentiating the answer.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\int (3x^2 + 2\\sin x - 4)\\, dx\\).",
      solution:
        "\\(= x^3 - 2\\cos x - 4x + C\\).",
    },
    flashcards: [
      { q: "\\(\\int x^n\\, dx\\) (for \\(n \\ne -1\\))?", a: "\\(x^{n+1}/(n+1) + C\\)." },
      { q: "\\(\\int \\sin x\\, dx\\)?", a: "\\(-\\cos x + C\\)." },
      { q: "Why \\(+ C\\)?", a: "Antiderivatives form a family differing by a constant." },
    ],
    commonMistakes: [
      "Dropping \\(+ C\\) on indefinite integrals.",
      "Wrong sign on \\(\\int \\sin x\\).",
      "Forgetting absolute value in \\(\\int 1/x\\, dx = \\ln|x|\\).",
    ],
    quiz: [
      {
        q: "\\(\\int 4x^3\\, dx =\\)",
        choices: ["\\(x^4 + C\\)", "\\(4x^4 + C\\)", "\\(12x^2 + C\\)", "\\(x^4\\)"],
        answerIndex: 0,
        explanation: "Power rule inverse.",
      },
      {
        q: "\\(\\int \\cos x\\, dx =\\)",
        choices: ["\\(-\\sin x + C\\)", "\\(\\sin x + C\\)", "\\(\\cos x + C\\)", "\\(-\\cos x + C\\)"],
        answerIndex: 1,
        explanation: "Standard.",
      },
      {
        q: "\\(\\int 1/x\\, dx =\\)",
        choices: ["\\(\\ln x + C\\)", "\\(\\ln |x| + C\\)", "\\(1/x^2 + C\\)", "\\(x + C\\)"],
        answerIndex: 1,
        explanation: "Absolute value for full real domain.",
      },
      {
        q: "\\(\\int (2x + 5)\\, dx =\\)",
        choices: [
          "\\(x^2 + 5x + C\\)",
          "\\(2x^2 + 5x\\)",
          "\\(x^2 + 5\\)",
          "\\(2x + 5 + C\\)",
        ],
        answerIndex: 0,
        explanation: "Linearity + power rule.",
      },
    ],
  },

  "6.9": {
    id: "6.9",
    title: "Integration Using Substitution",
    summary:
      "\\(u\\)-substitution reverses the chain rule: let \\(u = g(x)\\), \\(du = g'(x)\\, dx\\), rewrite integral in \\(u\\).",
    lesson:
      "Procedure:\n\n1) Pick \\(u = g(x)\\), typically the inside of a composition.\n2) Compute \\(du = g'(x)\\, dx\\).\n3) Rewrite integral entirely in \\(u, du\\).\n4) Integrate.\n5) Back-substitute \\(u = g(x)\\).\n\nFor definite integrals, either change limits or substitute back before evaluating.\n\nLook for the \"inside\" and its derivative factor. Example: \\(\\int x e^{x^2}\\, dx\\) — let \\(u = x^2, du = 2x\\, dx\\), so the integral becomes \\((1/2) \\int e^u\\, du = (1/2) e^{x^2} + C\\).",
    keyIdeas: [
      "\\(u\\)-sub reverses chain rule.",
      "Choose \\(u\\) = inner function; \\(du\\) should match the outside.",
      "Change limits for definite integrals, or back-substitute.",
      "Always verify with differentiation.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\int 2x \\sqrt{x^2 + 1}\\, dx\\).",
      solution:
        "Let \\(u = x^2 + 1, du = 2x\\, dx\\). Integral becomes \\(\\int \\sqrt{u}\\, du = (2/3) u^{3/2} + C = (2/3)(x^2 + 1)^{3/2} + C\\).",
    },
    flashcards: [
      { q: "What does \\(u\\)-substitution reverse?", a: "The chain rule." },
      { q: "How to pick \\(u\\)?", a: "Usually the \"inside\" function whose derivative appears (up to constant) in the integrand." },
    ],
    commonMistakes: [
      "Forgetting to change limits on definite integrals.",
      "Not accounting for constants when matching \\(du\\).",
      "Leaving the answer in \\(u\\) (must back-substitute for indefinite).",
    ],
    quiz: [
      {
        q: "\\(\\int 2x (x^2 + 3)^5\\, dx =\\)",
        choices: [
          "\\((x^2 + 3)^6/6 + C\\)",
          "\\((x^2 + 3)^6 + C\\)",
          "\\((x^2 + 3)^5\\)",
          "\\(2x (x^2 + 3)^5 + C\\)",
        ],
        answerIndex: 0,
        explanation: "\\(u = x^2 + 3, du = 2x\\, dx\\).",
      },
      {
        q: "\\(\\int \\cos(3x)\\, dx =\\)",
        choices: [
          "\\(\\sin(3x) + C\\)",
          "\\((1/3)\\sin(3x) + C\\)",
          "\\(3\\sin(3x) + C\\)",
          "\\(-\\sin(3x) + C\\)",
        ],
        answerIndex: 1,
        explanation: "\\(u = 3x, du = 3\\, dx\\).",
      },
      {
        q: "For \\(\\int_0^1 2x \\cdot e^{x^2}\\, dx\\) with \\(u = x^2\\), new limits are:",
        choices: ["0 to 1", "0 to 2", "0 to \\(e\\)", "1 to 2"],
        answerIndex: 0,
        explanation: "\\(u(0) = 0, u(1) = 1\\).",
      },
      {
        q: "\\(\\int x/(x^2 + 1)\\, dx =\\)",
        choices: [
          "\\(\\ln|x^2+1| + C\\)",
          "\\((1/2)\\ln|x^2+1| + C\\)",
          "\\(1/(x^2+1) + C\\)",
          "\\(\\arctan x + C\\)",
        ],
        answerIndex: 1,
        explanation: "\\(u = x^2 + 1, du = 2x\\, dx\\); factor 1/2.",
      },
    ],
  },

  "6.10": {
    id: "6.10",
    title: "Integrating Functions Using Long Division and Completing the Square",
    summary:
      "Simplify improper rational functions by polynomial long division; complete the square for inverse-trig forms.",
    lesson:
      "Long division: when the numerator's degree \\(\\ge\\) denominator's in a rational function, divide first. E.g., \\(\\int (x^2)/(x + 1)\\, dx\\) — divide to get \\(x - 1 + 1/(x+1)\\), then integrate.\n\nCompleting the square: for integrals like \\(\\int 1/(x^2 + 2x + 5)\\, dx\\), rewrite \\(x^2 + 2x + 5 = (x+1)^2 + 4\\), then substitute \\(u = x + 1\\) to get \\((1/2)\\arctan((x+1)/2) + C\\).\n\nThese are the typical preprocessing moves before applying a known formula. On the AP, recognize which trick the integral invites.",
    keyIdeas: [
      "Long division for top-heavy rationals.",
      "Complete the square for \\(\\int dx/(ax^2 + bx + c)\\) forms.",
      "After preprocessing, apply basic antiderivatives.",
      "Always simplify to a standard form first.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\int 1/(x^2 - 4x + 13)\\, dx\\).",
      solution:
        "\\(x^2 - 4x + 13 = (x - 2)^2 + 9\\). Let \\(u = x - 2\\): \\(\\int 1/(u^2 + 9)\\, du = (1/3)\\arctan(u/3) + C = (1/3)\\arctan((x-2)/3) + C\\).",
    },
    flashcards: [
      { q: "When to use long division?", a: "Numerator degree ≥ denominator degree in rational function." },
      { q: "Complete the square converts quadratic to what form?", a: "\\((x - h)^2 + k\\) — sets up arctan or arcsin." },
    ],
    commonMistakes: [
      "Forgetting to complete the square before attempting arctan.",
      "Arithmetic errors in long division.",
      "Wrong coefficient after substitution.",
    ],
    quiz: [
      {
        q: "\\(\\int x^2/(x - 1)\\, dx\\) starts by:",
        choices: [
          "Substituting \\(u = x - 1\\)",
          "Long division",
          "Partial fractions",
          "By parts",
        ],
        answerIndex: 1,
        explanation: "Improper rational; divide first.",
      },
      {
        q: "\\(x^2 + 6x + 13 =\\)",
        choices: ["\\((x+3)^2 + 4\\)", "\\((x+3)^2 + 13\\)", "\\((x+6)^2 + 4\\)", "\\((x-3)^2 + 4\\)"],
        answerIndex: 0,
        explanation: "\\(6/2 = 3\\); \\(13 - 9 = 4\\).",
      },
      {
        q: "\\(\\int 1/(x^2 + 1)\\, dx =\\)",
        choices: ["\\(\\arctan x + C\\)", "\\(\\arcsin x + C\\)", "\\(\\ln |x^2+1| + C\\)", "\\(2x/(x^2+1) + C\\)"],
        answerIndex: 0,
        explanation: "Standard form.",
      },
      {
        q: "For \\(\\int 1/\\sqrt{1 - (x-3)^2}\\, dx\\), the result is:",
        choices: [
          "\\(\\arctan(x-3) + C\\)",
          "\\(\\arcsin(x-3) + C\\)",
          "\\(\\ln|x-3| + C\\)",
          "\\(-\\arcsin(x-3) + C\\)",
        ],
        answerIndex: 1,
        explanation: "Completed-square form of arcsin.",
      },
    ],
  },

  "6.11": {
    id: "6.11",
    title: "Integration Using Integration by Parts",
    summary:
      "\\(\\int u\\, dv = uv - \\int v\\, du\\). Use LIATE to choose \\(u\\).",
    lesson:
      "Integration by parts (IBP) reverses the product rule. Formula: \\(\\int u\\, dv = uv - \\int v\\, du\\). Pick \\(u\\) to differentiate (making it simpler) and \\(dv\\) to integrate.\n\nLIATE heuristic (priority for \\(u\\)): Logarithms, Inverse trig, Algebraic (polynomial), Trig, Exponential. Pick \\(u\\) as the highest on the list present.\n\nClassic integrals:\n- \\(\\int x e^x\\, dx\\): \\(u = x, dv = e^x dx\\) → \\(xe^x - e^x + C\\).\n- \\(\\int x \\sin x\\, dx\\): \\(u = x, dv = \\sin x\\, dx\\) → \\(-x\\cos x + \\sin x + C\\).\n- \\(\\int \\ln x\\, dx\\): \\(u = \\ln x, dv = dx\\) → \\(x \\ln x - x + C\\).\n- \\(\\int \\arctan x\\, dx\\): \\(u = \\arctan x, dv = dx\\) → \\(x \\arctan x - (1/2)\\ln(1 + x^2) + C\\).\n\nTabular method for \\(\\int x^n e^{ax}\\, dx\\): differentiate the polynomial repeatedly until zero while integrating the exponential, alternating signs.",
    keyIdeas: [
      "IBP: \\(\\int u\\, dv = uv - \\int v\\, du\\).",
      "LIATE picks \\(u\\).",
      "Use twice if needed (e.g., \\(\\int x^2 e^x\\, dx\\)).",
      "Tabular method for repeated IBP.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\int x \\cos x\\, dx\\).",
      solution:
        "\\(u = x, du = dx, dv = \\cos x\\, dx, v = \\sin x\\). \\(\\int x \\cos x\\, dx = x \\sin x - \\int \\sin x\\, dx = x \\sin x + \\cos x + C\\).",
    },
    flashcards: [
      { q: "IBP formula?", a: "\\(\\int u\\, dv = uv - \\int v\\, du\\)." },
      { q: "LIATE meaning?", a: "Log, Inverse trig, Algebraic, Trig, Exponential — priority for \\(u\\)." },
      { q: "\\(\\int \\ln x\\, dx\\)?", a: "\\(x \\ln x - x + C\\)." },
    ],
    commonMistakes: [
      "Choosing \\(u\\) wrong, making \\(\\int v\\, du\\) harder.",
      "Forgetting the minus sign.",
      "Integration by parts doesn't work when \\(\\int v\\, du\\) is not simpler.",
    ],
    quiz: [
      {
        q: "\\(\\int x e^x\\, dx =\\)",
        choices: [
          "\\(xe^x - e^x + C\\)",
          "\\(xe^x + e^x + C\\)",
          "\\(e^x + C\\)",
          "\\(x^2 e^x/2 + C\\)",
        ],
        answerIndex: 0,
        explanation: "IBP with \\(u = x, dv = e^x dx\\).",
      },
      {
        q: "In LIATE, \\(u\\) for \\(\\int x \\ln x\\, dx\\) is:",
        choices: ["\\(x\\)", "\\(\\ln x\\)", "Either", "\\(x \\ln x\\)"],
        answerIndex: 1,
        explanation: "Log beats Algebraic in LIATE.",
      },
      {
        q: "\\(\\int \\ln x\\, dx =\\)",
        choices: [
          "\\(1/x + C\\)",
          "\\(x \\ln x + C\\)",
          "\\(x \\ln x - x + C\\)",
          "\\((\\ln x)^2/2 + C\\)",
        ],
        answerIndex: 2,
        explanation: "\\(u = \\ln x, dv = dx\\).",
      },
      {
        q: "Why use tabular IBP?",
        choices: [
          "Saves algebra on \\(\\int x^n e^{ax}\\, dx\\) and similar",
          "Required by the CED",
          "Only for trig",
          "Used for substitution",
        ],
        answerIndex: 0,
        explanation: "Repeated IBP organized in columns.",
      },
    ],
  },

  "6.12": {
    id: "6.12",
    title: "Using Linear Partial Fractions",
    summary:
      "Decompose \\(P(x)/Q(x)\\) with distinct linear factors into \\(A/(x - r_1) + B/(x - r_2) + \\ldots\\).",
    lesson:
      "For a proper rational \\(P(x)/Q(x)\\) where \\(Q(x)\\) factors into distinct linear pieces \\((x - r_1)(x - r_2)\\cdots\\), write:\n\n$$\\frac{P(x)}{Q(x)} = \\frac{A_1}{x - r_1} + \\frac{A_2}{x - r_2} + \\cdots$$\n\nFind coefficients by the cover-up method: multiply by \\((x - r_i)\\) and evaluate at \\(x = r_i\\) to read off \\(A_i\\).\n\nAfter decomposing, each piece integrates as \\(A_i \\ln|x - r_i|\\). Combined: \\(\\int = \\sum A_i \\ln|x - r_i| + C\\).\n\nLong divide first if \\(\\deg P \\ge \\deg Q\\). CED keeps it to distinct linear factors on BC.",
    keyIdeas: [
      "Distinct linear factors → sum of \\(A_i/(x - r_i)\\).",
      "Cover-up method for coefficients.",
      "Each piece integrates to log.",
      "Long-divide improper rationals first.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\int \\frac{1}{(x-1)(x+2)}\\, dx\\).",
      solution:
        "Write \\(1/[(x-1)(x+2)] = A/(x-1) + B/(x+2)\\). Cover-up at \\(x = 1\\): \\(A = 1/3\\). At \\(x = -2\\): \\(B = -1/3\\). Integral: \\((1/3)\\ln|x-1| - (1/3)\\ln|x+2| + C\\).",
    },
    flashcards: [
      { q: "Partial-fraction decomposition for distinct linear factors?", a: "\\(A_i/(x - r_i)\\) per factor." },
      { q: "Cover-up shortcut?", a: "Multiply by \\((x - r_i)\\) and plug in \\(x = r_i\\) to read off \\(A_i\\)." },
    ],
    commonMistakes: [
      "Forgetting to long-divide first.",
      "Incorrect sign in cover-up.",
      "Missing absolute value in \\(\\ln|x - r|\\).",
    ],
    quiz: [
      {
        q: "\\(1/[(x-2)(x-5)]\\) decomposes as:",
        choices: [
          "\\(A/(x-2) + B/(x-5)\\)",
          "\\(A(x-2) + B(x-5)\\)",
          "\\((A + B)/(x-2)(x-5)\\)",
          "\\(A/(x^2 - 7x + 10)\\)",
        ],
        answerIndex: 0,
        explanation: "Sum over each linear factor.",
      },
      {
        q: "\\(\\int 1/(x(x-1))\\, dx =\\)",
        choices: [
          "\\(\\ln|x/(x-1)| + C\\)",
          "\\(\\ln|(x-1)/x| + C\\)",
          "\\(\\ln|x| - \\ln|x-1| + C\\)",
          "\\(\\arctan(x) + C\\)",
        ],
        answerIndex: 1,
        explanation: "Cover-up: \\(A = -1\\) (at \\(x=0\\)), \\(B = 1\\); integrates to \\(\\ln|x-1| - \\ln|x| = \\ln|(x-1)/x|\\).",
      },
      {
        q: "If \\(\\deg P \\ge \\deg Q\\) in a rational function, first:",
        choices: [
          "Apply cover-up",
          "Long-divide",
          "Substitute",
          "Do nothing",
        ],
        answerIndex: 1,
        explanation: "Reduce to a proper rational plus polynomial.",
      },
      {
        q: "Cover-up at \\(x = r_i\\) gives \\(A_i\\) equal to:",
        choices: [
          "\\(P(r_i)\\)",
          "\\(P(r_i) / Q'(r_i)\\)",
          "\\(Q(r_i)\\)",
          "\\(P(r_i) \\cdot Q(r_i)\\)",
        ],
        answerIndex: 1,
        explanation: "Alternate form of cover-up.",
      },
    ],
  },

  "6.13": {
    id: "6.13",
    title: "Evaluating Improper Integrals",
    summary:
      "Improper integrals have infinite limits or unbounded integrands. Evaluate as a limit of proper integrals.",
    lesson:
      "Two types:\n\n1) Infinite bounds: \\(\\int_a^\\infty f\\, dx = \\lim_{b \\to \\infty} \\int_a^b f\\, dx\\).\n2) Unbounded integrand at an endpoint: \\(\\int_a^b f\\, dx\\) with \\(f\\) blowing up at \\(a\\) or \\(b\\) = \\(\\lim_{t \\to a^+} \\int_t^b f\\, dx\\).\n\nConverges if limit is a finite number; otherwise diverges.\n\nKey benchmark: \\(\\int_1^\\infty 1/x^p\\, dx\\) converges iff \\(p > 1\\); \\(\\int_0^1 1/x^p\\, dx\\) converges iff \\(p < 1\\).\n\nAP FRQs: write the limit expression first, then evaluate. Saying \"diverges\" without the limit form loses points.",
    keyIdeas: [
      "Always rewrite as a limit of proper integrals.",
      "Converges if limit is finite.",
      "\\(\\int_1^\\infty 1/x^p\\, dx\\) converges iff \\(p > 1\\).",
      "Report convergence/divergence explicitly.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\int_1^\\infty 1/x^2\\, dx\\).",
      solution:
        "\\(\\lim_{b \\to \\infty}\\int_1^b x^{-2}\\, dx = \\lim_{b \\to \\infty}[-1/x]_1^b = \\lim_{b \\to \\infty}(-1/b + 1) = 1\\). Converges to 1.",
    },
    flashcards: [
      { q: "Improper integral convergence test for \\(\\int_1^\\infty 1/x^p\\, dx\\)?", a: "Converges iff \\(p > 1\\)." },
      { q: "Evaluation first step?", a: "Rewrite as a limit of proper integrals." },
    ],
    commonMistakes: [
      "Skipping the limit and just plugging in \\(\\infty\\).",
      "Mixing up p < 1 vs p > 1 convergence cases.",
      "Not noting which endpoint is problematic.",
    ],
    quiz: [
      {
        q: "\\(\\int_1^\\infty 1/x\\, dx\\):",
        choices: ["Converges to 1", "Converges to \\(\\ln 2\\)", "Diverges", "Converges to 0"],
        answerIndex: 2,
        explanation: "\\(p = 1\\) fails convergence test.",
      },
      {
        q: "\\(\\int_0^1 1/\\sqrt{x}\\, dx\\):",
        choices: ["Converges to 2", "Converges to 1", "Diverges", "Converges to 0"],
        answerIndex: 0,
        explanation: "\\(p = 1/2 < 1\\); converges; \\([2\\sqrt{x}]_0^1 = 2\\).",
      },
      {
        q: "\\(\\int_0^\\infty e^{-x}\\, dx\\):",
        choices: ["Converges to 1", "Converges to 0", "Diverges", "Converges to \\(e\\)"],
        answerIndex: 0,
        explanation: "\\([-e^{-x}]_0^\\infty = 0 - (-1) = 1\\).",
      },
      {
        q: "On an FRQ, improper integrals require:",
        choices: [
          "Direct substitution",
          "Limit expression shown explicitly",
          "A graph",
          "Nothing special",
        ],
        answerIndex: 1,
        explanation: "Graders insist on \\(\\lim_{b \\to \\infty}\\) notation.",
      },
    ],
  },

  "6.14": {
    id: "6.14",
    title: "Selecting Techniques for Antidifferentiation",
    summary:
      "Match integrals to the right technique: basic rules, substitution, IBP, partial fractions, completing the square, or trig identities.",
    lesson:
      "A triage for antidifferentiation:\n\n1) Is it a standard form? Use basic rule.\n2) Composition with inner derivative factor? Substitution.\n3) Product of different function types (polynomial × exp, poly × trig, log × anything)? IBP.\n4) Rational function with distinct linear factors? Partial fractions.\n5) Irreducible quadratic in denominator? Complete the square → arctan or arcsin.\n6) Trig with high powers or mixed? Trig identities first.\n\nOften you combine: u-sub then IBP, or partial fractions then u-sub. Build a reflex for pattern recognition.",
    keyIdeas: [
      "Recognize form, then pick technique.",
      "Sub for composition; IBP for product.",
      "Partial fractions for rational pieces.",
      "Complete square for irreducible quadratics.",
    ],
    workedExample: {
      prompt:
        "Which technique for \\(\\int x^2 \\ln x\\, dx\\)?",
      solution:
        "IBP with \\(u = \\ln x\\) (LIATE: log > algebraic), \\(dv = x^2\\, dx\\). Result: \\((x^3/3)\\ln x - x^3/9 + C\\).",
    },
    flashcards: [
      { q: "\\(\\int x e^{x^2}\\, dx\\) — which technique?", a: "Substitution \\(u = x^2\\)." },
      { q: "\\(\\int x \\cos x\\, dx\\) — which?", a: "Integration by parts." },
    ],
    commonMistakes: [
      "Using IBP when substitution works.",
      "Using partial fractions when long division or substitution does the job.",
      "Forcing trig substitution on a basic integral.",
    ],
    quiz: [
      {
        q: "\\(\\int 2x \\sin(x^2)\\, dx\\):",
        choices: ["IBP", "Substitution", "Partial fractions", "Complete the square"],
        answerIndex: 1,
        explanation: "\\(u = x^2\\).",
      },
      {
        q: "\\(\\int x e^x\\, dx\\):",
        choices: ["IBP", "Substitution", "Partial fractions", "Long division"],
        answerIndex: 0,
        explanation: "Product of algebraic and exponential.",
      },
      {
        q: "\\(\\int 1/(x^2 - 4)\\, dx\\):",
        choices: ["Substitution", "IBP", "Partial fractions", "Trig identity"],
        answerIndex: 2,
        explanation: "Factor \\((x-2)(x+2)\\) and decompose.",
      },
      {
        q: "\\(\\int 1/(x^2 + 4x + 8)\\, dx\\):",
        choices: ["Complete the square → arctan", "Partial fractions", "IBP", "Substitution of \\(e^x\\)"],
        answerIndex: 0,
        explanation: "\\((x+2)^2 + 4\\) sets up arctan form.",
      },
    ],
  },

  "7.1": {
    id: "7.1",
    title: "Modeling Situations with Differential Equations",
    summary:
      "Set up a differential equation by translating a rate statement into derivative notation.",
    lesson:
      "Differential equations model how a quantity changes. Translate English into \\(dy/dt\\):\n\n- \"Grows at a rate proportional to current amount\" → \\(dy/dt = ky\\).\n- \"Cools at a rate proportional to temperature difference from ambient\" → \\(dT/dt = -k(T - T_a)\\) (Newton's law of cooling).\n- \"Changes at a rate proportional to product of two quantities\" → \\(dy/dt = k \\cdot x \\cdot y\\).\n\nUnits in differential equations must match. If \\(y\\) is in liters and \\(t\\) is in hours, \\(dy/dt\\) is in L/hour.\n\nKey verbs map to operators: \"rate\" = derivative; \"net\" = inflow minus outflow.",
    keyIdeas: [
      "Translate rate descriptions to \\(dy/dt\\) equations.",
      "Include constants of proportionality and signs.",
      "Net change = inflow − outflow.",
      "Match units throughout.",
    ],
    workedExample: {
      prompt:
        "Bacteria grow at a rate proportional to the current population, currently 500. Write the differential equation.",
      solution:
        "\\(dP/dt = k P\\), with \\(P(0) = 500\\). Sign positive (growth).",
    },
    flashcards: [
      { q: "Exponential growth DE?", a: "\\(dy/dt = ky\\)." },
      { q: "Newton's cooling?", a: "\\(dT/dt = -k(T - T_a)\\)." },
    ],
    commonMistakes: [
      "Missing the sign for decay.",
      "Forgetting the constant \\(k\\).",
      "Confusing proportional with linear.",
    ],
    quiz: [
      {
        q: "\"Decays at rate proportional to amount present\" translates to:",
        choices: [
          "\\(dy/dt = ky\\)",
          "\\(dy/dt = -ky\\)",
          "\\(dy/dt = k\\)",
          "\\(dy/dt = k/y\\)",
        ],
        answerIndex: 1,
        explanation: "Decay means negative proportionality.",
      },
      {
        q: "In \\(dT/dt = -k(T - 70)\\), \\(T = 70\\) is the:",
        choices: ["Initial temp", "Ambient temp", "Rate", "Time"],
        answerIndex: 1,
        explanation: "Target ambient temperature.",
      },
      {
        q: "Water enters a tank at 3 gal/min and leaves at 2 gal/min. \\(dV/dt =\\)",
        choices: ["5", "1", "\\(-1\\)", "6"],
        answerIndex: 1,
        explanation: "Net rate: 3 − 2 = 1.",
      },
      {
        q: "\"Rate of change proportional to product\" becomes:",
        choices: [
          "\\(dy/dt = y + x\\)",
          "\\(dy/dt = k x y\\)",
          "\\(dy/dt = k(x - y)\\)",
          "\\(dy/dt = k(x/y)\\)",
        ],
        answerIndex: 1,
        explanation: "Product form.",
      },
    ],
  },

  "7.2": {
    id: "7.2",
    title: "Verifying Solutions for Differential Equations",
    summary:
      "Substitute a candidate function and its derivative into the DE; check both sides agree.",
    lesson:
      "To verify \\(y = f(t)\\) solves a DE, compute \\(dy/dt\\) and substitute. Both sides should simplify to the same expression.\n\nExample: is \\(y = e^{2t}\\) a solution of \\(dy/dt = 2y\\)? Compute \\(dy/dt = 2 e^{2t}\\); right-hand side \\(2y = 2 e^{2t}\\). Equal — yes.\n\nFor implicit solutions (like \\(y^2 - x = 5\\)), differentiate implicitly and check.\n\nInitial conditions: if given \\(y(0) = y_0\\), verify the candidate satisfies this too.",
    keyIdeas: [
      "Differentiate the candidate.",
      "Plug into the DE.",
      "Both sides must match identically.",
      "Verify initial conditions separately.",
    ],
    workedExample: {
      prompt:
        "Verify \\(y = \\sin x + 2\\cos x\\) satisfies \\(y'' + y = 0\\).",
      solution:
        "\\(y' = \\cos x - 2\\sin x\\); \\(y'' = -\\sin x - 2\\cos x\\). \\(y'' + y = -\\sin x - 2\\cos x + \\sin x + 2\\cos x = 0\\). ✓",
    },
    flashcards: [
      { q: "How to verify a DE solution?", a: "Differentiate and substitute into the DE; both sides must match." },
      { q: "What about initial conditions?", a: "Evaluate the candidate at the given point and check." },
    ],
    commonMistakes: [
      "Forgetting to check both DE and initial condition.",
      "Arithmetic slips in differentiation.",
      "Assuming any candidate works without substituting.",
    ],
    quiz: [
      {
        q: "Which is a solution of \\(dy/dt = 3y\\)?",
        choices: ["\\(y = 3t\\)", "\\(y = e^{3t}\\)", "\\(y = t^3\\)", "\\(y = e^t\\)"],
        answerIndex: 1,
        explanation: "\\(y = e^{3t}\\) gives \\(y' = 3 e^{3t} = 3y\\).",
      },
      {
        q: "Verify \\(y = x^2\\) satisfies \\(dy/dx = 2x\\)?",
        choices: ["Yes", "No", "Only at \\(x = 0\\)", "Depends"],
        answerIndex: 0,
        explanation: "Derivative of \\(x^2\\) is \\(2x\\).",
      },
      {
        q: "To verify \\(y = Ce^{kt}\\) solves \\(dy/dt = ky\\):",
        choices: [
          "Differentiate and compare",
          "Integrate \\(ky\\)",
          "Substitute \\(t = 0\\)",
          "Plot both functions",
        ],
        answerIndex: 0,
        explanation: "Check \\(y' = Cke^{kt} = ky\\).",
      },
      {
        q: "If \\(y(0) = 5\\) required and \\(y(t) = Ce^{2t}\\), \\(C =\\)",
        choices: ["0", "2", "5", "10"],
        answerIndex: 2,
        explanation: "Plug in \\(t = 0\\): \\(y(0) = C = 5\\).",
      },
    ],
  },

  "7.3": {
    id: "7.3",
    title: "Sketching Slope Fields",
    summary:
      "A slope field shows the direction \\(dy/dx\\) at each grid point. Solutions follow the arrows.",
    lesson:
      "A slope field visualizes \\(dy/dx = f(x, y)\\) as tiny line segments at grid points, each with slope \\(f(x, y)\\). Drawing one: compute slope at each point, draw a short segment with that slope.\n\nSolutions are curves tangent to the slope field everywhere. Sketching a solution: pick an initial point, follow the slope field.\n\nOn the AP, slope fields show up as multiple choice or given field + initial condition; you trace the right curve.",
    keyIdeas: [
      "Plot slopes at grid points.",
      "Solutions are tangent curves.",
      "Horizontal segments where \\(dy/dx = 0\\).",
      "Vertical segments when \\(dy/dx\\) undefined.",
    ],
    workedExample: {
      prompt:
        "Sketch a few slopes of \\(dy/dx = x + y\\) at (0,0), (1,0), (0,1), (1,1).",
      solution:
        "At (0,0): 0 (horizontal). At (1,0): 1. At (0,1): 1. At (1,1): 2.",
    },
    flashcards: [
      { q: "What does each segment in a slope field show?", a: "Slope \\(dy/dx\\) at that point." },
      { q: "How to draw a solution curve?", a: "Start at an initial point and follow the tangent arrows." },
    ],
    commonMistakes: [
      "Drawing slopes as vectors with varying length.",
      "Ignoring the initial condition.",
      "Assuming all segments should go the same direction.",
    ],
    quiz: [
      {
        q: "\\(dy/dx = y\\). At \\((x, 0)\\), slope is:",
        choices: ["0", "1", "\\(y\\)", "\\(x\\)"],
        answerIndex: 0,
        explanation: "Horizontal along \\(y = 0\\).",
      },
      {
        q: "Slope field segments tangent to the solution curve show:",
        choices: ["Acceleration", "Direction of solution", "Area", "Concavity"],
        answerIndex: 1,
        explanation: "Slope = direction.",
      },
      {
        q: "\\(dy/dx = x\\). Along which curve is slope zero?",
        choices: ["\\(x = 0\\)", "\\(y = 0\\)", "\\(y = x\\)", "Nowhere"],
        answerIndex: 0,
        explanation: "Slope is 0 where \\(x = 0\\).",
      },
      {
        q: "To solve a DE with slope field + initial condition:",
        choices: [
          "Find exact formula",
          "Follow tangent arrows from initial point",
          "Integrate numerically",
          "Ignore initial point",
        ],
        answerIndex: 1,
        explanation: "Visually trace the solution.",
      },
    ],
  },

  "7.4": {
    id: "7.4",
    title: "Reasoning Using Slope Fields",
    summary:
      "Use slope fields to qualitatively analyze solutions: equilibrium, long-term behavior, concavity.",
    lesson:
      "Slope fields reveal:\n\n- Equilibrium solutions: horizontal lines where \\(dy/dx = 0\\) for all \\(x\\).\n- Stability: whether nearby solutions approach or depart from equilibrium.\n- Long-term behavior: \\(\\lim_{x \\to \\infty} y(x)\\) by tracing the field.\n- Concavity: differentiate \\(dy/dx = f(x, y)\\) implicitly to get \\(d^2y/dx^2\\).\n\nSometimes a DE has no closed-form solution, so qualitative reasoning via slope fields is the only path to information.",
    keyIdeas: [
      "Equilibrium solutions are horizontal.",
      "Long-term behavior from field trajectories.",
      "Concavity from chain-rule applied to the DE.",
      "Stability = attract vs repel nearby solutions.",
    ],
    workedExample: {
      prompt:
        "For \\(dy/dx = y(1 - y)\\), equilibrium solutions are?",
      solution:
        "Set \\(y(1-y) = 0\\): \\(y = 0\\) and \\(y = 1\\). 0 is unstable (push away), 1 is stable (attract).",
    },
    flashcards: [
      { q: "Equilibrium solution?", a: "Constant \\(y\\) with \\(dy/dx = 0\\) everywhere on that line." },
      { q: "Stable vs unstable?", a: "Stable: nearby solutions converge; unstable: they diverge." },
    ],
    commonMistakes: [
      "Confusing equilibrium with local minimum.",
      "Ignoring stability.",
      "Assuming unique long-term limit for all initial conditions.",
    ],
    quiz: [
      {
        q: "Equilibrium solutions of \\(dy/dx = 2y\\)?",
        choices: ["\\(y = 0\\)", "\\(y = 2\\)", "None", "All constants"],
        answerIndex: 0,
        explanation: "Only \\(y = 0\\) satisfies \\(dy/dx = 0\\).",
      },
      {
        q: "\\(dy/dx = y(y - 4)\\). Equilibria are:",
        choices: ["0 and 4", "0 only", "4 only", "None"],
        answerIndex: 0,
        explanation: "Zeros of right side.",
      },
      {
        q: "A solution curve in a slope field:",
        choices: [
          "Crosses all segments",
          "Is tangent to segments",
          "Is perpendicular to segments",
          "Is horizontal only",
        ],
        answerIndex: 1,
        explanation: "Tangent to tangent vectors.",
      },
      {
        q: "\\(dy/dx = 1 - y\\). Long-term behavior as \\(x \\to \\infty\\):",
        choices: ["\\(y \\to 0\\)", "\\(y \\to 1\\)", "\\(y \\to \\infty\\)", "Diverges"],
        answerIndex: 1,
        explanation: "Approaches equilibrium at \\(y = 1\\).",
      },
    ],
  },

  "7.5": {
    id: "7.5",
    title: "Approximating Solutions Using Euler's Method",
    summary:
      "Step along tangent lines: \\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\).",
    lesson:
      "Euler's method numerically approximates solutions to \\(dy/dx = f(x, y)\\) with initial condition \\(y(x_0) = y_0\\). Pick step size \\(h\\); iterate:\n\n\\(x_{n+1} = x_n + h\\), \\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\).\n\nEach step is a tangent-line approximation. Smaller \\(h\\) = more accuracy but more work.\n\nError: if the true solution is concave up, Euler's method under-estimates; if concave down, over-estimates. Because Euler follows tangents that under/over shoot curves.\n\nOn the AP: typical FRQ gives a DE, initial condition, asks for \\(y\\) at a later \\(x\\) using 2 or 3 Euler steps.",
    keyIdeas: [
      "\\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\).",
      "Smaller \\(h\\) = better accuracy.",
      "Concave up: Euler under-estimates.",
      "Concave down: Euler over-estimates.",
    ],
    workedExample: {
      prompt:
        "\\(dy/dx = x + y, y(0) = 1\\). Use \\(h = 0.5\\) and 2 Euler steps to approximate \\(y(1)\\).",
      solution:
        "Step 1: \\(y_1 = 1 + 0.5 \\cdot (0 + 1) = 1.5\\), \\(x_1 = 0.5\\). Step 2: \\(y_2 = 1.5 + 0.5 \\cdot (0.5 + 1.5) = 1.5 + 1 = 2.5\\). So \\(y(1) \\approx 2.5\\).",
    },
    flashcards: [
      { q: "Euler's method formula?", a: "\\(y_{n+1} = y_n + h f(x_n, y_n)\\)." },
      { q: "Concave up solution: Euler under or over?", a: "Under-estimates." },
    ],
    commonMistakes: [
      "Updating \\(x\\) and \\(y\\) out of order.",
      "Using wrong \\(f(x, y)\\).",
      "Forgetting that Euler is an approximation, not exact.",
    ],
    quiz: [
      {
        q: "Euler's formula:",
        choices: [
          "\\(y_{n+1} = y_n\\)",
          "\\(y_{n+1} = y_n + h f(x_n, y_n)\\)",
          "\\(y_{n+1} = y_n + f(x_n, y_n)\\)",
          "\\(y_{n+1} = h f(x_n, y_n)\\)",
        ],
        answerIndex: 1,
        explanation: "Tangent-line step.",
      },
      {
        q: "\\(dy/dx = y, y(0) = 1, h = 1\\). One Euler step:",
        choices: ["1", "2", "e", "0"],
        answerIndex: 1,
        explanation: "\\(y_1 = 1 + 1 \\cdot 1 = 2\\). (Exact: \\(e \\approx 2.718\\).)",
      },
      {
        q: "For concave-up solutions, Euler's method:",
        choices: [
          "Over-estimates",
          "Under-estimates",
          "Is exact",
          "Depends on \\(h\\)",
        ],
        answerIndex: 1,
        explanation: "Tangents lie below concave-up curves.",
      },
      {
        q: "To improve Euler accuracy:",
        choices: [
          "Increase \\(h\\)",
          "Decrease \\(h\\)",
          "Change \\(f\\)",
          "Use fewer steps",
        ],
        answerIndex: 1,
        explanation: "Smaller step = closer to the curve.",
      },
    ],
  },

  "7.6": {
    id: "7.6",
    title: "Finding General Solutions Using Separation of Variables",
    summary:
      "For \\(dy/dx = g(x) h(y)\\), separate: \\(dy/h(y) = g(x)\\, dx\\), then integrate both sides.",
    lesson:
      "Separation of variables applies when the DE factors as \\(dy/dx = g(x) h(y)\\). Procedure:\n\n1) Separate: \\(dy/h(y) = g(x)\\, dx\\).\n2) Integrate both sides.\n3) Combine constants: \\(C\\) on one side.\n4) Solve for \\(y\\) if possible.\n\nExample: \\(dy/dx = xy\\). Separate: \\(dy/y = x\\, dx\\). Integrate: \\(\\ln|y| = x^2/2 + C\\). Exponentiate: \\(|y| = e^{x^2/2 + C} \\Rightarrow y = A e^{x^2/2}\\) with \\(A = \\pm e^C\\).\n\nAP form: usually paired with initial condition to pin down \\(A\\).",
    keyIdeas: [
      "Separate the DE into \\(y\\) and \\(x\\) parts.",
      "Integrate both sides.",
      "Combine constants.",
      "Exponentiate if needed to solve for \\(y\\).",
    ],
    workedExample: {
      prompt:
        "Solve \\(dy/dx = 2xy\\).",
      solution:
        "Separate: \\(dy/y = 2x\\, dx\\). Integrate: \\(\\ln|y| = x^2 + C\\). Exponentiate: \\(y = A e^{x^2}\\).",
    },
    flashcards: [
      { q: "When does separation work?", a: "When the DE can be written \\(dy/dx = g(x) h(y)\\)." },
      { q: "After integrating, constant becomes?", a: "Usually absorbed into a multiplicative \\(A\\) after exponentiation." },
    ],
    commonMistakes: [
      "Forgetting the absolute value in \\(\\ln|y|\\).",
      "Not combining constants.",
      "Mis-separating when variables are mixed.",
    ],
    quiz: [
      {
        q: "\\(dy/dx = y/x\\). Separated form:",
        choices: [
          "\\(dy/y = dx/x\\)",
          "\\(y\\, dy = x\\, dx\\)",
          "\\(dy = y/x\\, dx\\)",
          "Cannot separate",
        ],
        answerIndex: 0,
        explanation: "Factor into \\(y\\) and \\(x\\) pieces.",
      },
      {
        q: "Solve \\(dy/dx = y^2\\).",
        choices: [
          "\\(y = e^x + C\\)",
          "\\(y = -1/(x + C)\\)",
          "\\(y = C/x\\)",
          "\\(y = C e^x\\)",
        ],
        answerIndex: 1,
        explanation: "\\(\\int dy/y^2 = \\int dx\\) gives \\(-1/y = x + C\\).",
      },
      {
        q: "\\(dy/dx = x^2 y\\). General solution:",
        choices: [
          "\\(y = A e^{x^2/2}\\)",
          "\\(y = A e^{x^3/3}\\)",
          "\\(y = A x^3\\)",
          "\\(y = C x\\)",
        ],
        answerIndex: 1,
        explanation: "\\(\\int dy/y = \\int x^2\\, dx\\).",
      },
      {
        q: "Separable DE has the form:",
        choices: [
          "\\(dy/dx = ay + b\\)",
          "\\(dy/dx = g(x) + h(y)\\)",
          "\\(dy/dx = g(x) h(y)\\)",
          "\\(dy/dx = f(x, y)\\) (any form)",
        ],
        answerIndex: 2,
        explanation: "Product structure is required.",
      },
    ],
  },

  "7.7": {
    id: "7.7",
    title: "Finding Particular Solutions Using Initial Conditions and Separation of Variables",
    summary:
      "Solve the general DE, then plug in the initial condition to determine the constant.",
    lesson:
      "After separating and integrating, you have a family \\(y = F(x, C)\\). The initial condition \\(y(x_0) = y_0\\) pins down \\(C\\) uniquely.\n\nExample: \\(dy/dx = y\\) with \\(y(0) = 3\\). General: \\(y = A e^x\\). Plug in: \\(3 = A \\cdot 1 \\Rightarrow A = 3\\). Particular solution: \\(y = 3 e^x\\).\n\nAP FRQ: watch for implicit solutions and domain restrictions. If \\(\\ln|y|\\) appears, sign of \\(y\\) must match the initial condition.",
    keyIdeas: [
      "General + initial condition = particular.",
      "Plug in \\((x_0, y_0)\\) to find the constant.",
      "Solve explicitly for \\(y\\) when possible.",
      "Respect sign/domain dictated by initial condition.",
    ],
    workedExample: {
      prompt:
        "Solve \\(dy/dx = -2y\\) with \\(y(0) = 5\\).",
      solution:
        "General: \\(y = A e^{-2x}\\). \\(y(0) = 5 \\Rightarrow A = 5\\). Particular: \\(y = 5 e^{-2x}\\).",
    },
    flashcards: [
      { q: "How to find particular solution?", a: "Apply initial condition to pin down the constant in the general solution." },
    ],
    commonMistakes: [
      "Leaving the answer as general, not particular.",
      "Sign errors when exponentiating.",
      "Picking the wrong branch when the equation is implicit.",
    ],
    quiz: [
      {
        q: "\\(dy/dx = 3y, y(0) = 2\\). Particular solution:",
        choices: ["\\(y = 3 e^{2x}\\)", "\\(y = 2 e^{3x}\\)", "\\(y = 2 + 3x\\)", "\\(y = 6 e^x\\)"],
        answerIndex: 1,
        explanation: "General \\(y = A e^{3x}\\); \\(A = 2\\).",
      },
      {
        q: "\\(dy/dx = y^2, y(1) = -1\\). Particular solution:",
        choices: [
          "\\(y = -1/x\\)",
          "\\(y = 1/x\\)",
          "\\(y = -x\\)",
          "\\(y = x - 2\\)",
        ],
        answerIndex: 0,
        explanation: "General \\(y = -1/(x + C)\\); at \\((1, -1)\\): \\(C = 0\\).",
      },
      {
        q: "\\(dy/dx = x/y, y(0) = 2\\). Particular:",
        choices: [
          "\\(y = \\sqrt{x^2 + 4}\\)",
          "\\(y = x + 2\\)",
          "\\(y^2 = x^2\\)",
          "\\(y = 2 \\cos x\\)",
        ],
        answerIndex: 0,
        explanation: "\\(\\int y\\, dy = \\int x\\, dx\\); \\(y^2/2 = x^2/2 + 2\\); \\(y = \\sqrt{x^2 + 4}\\).",
      },
      {
        q: "Initial condition purpose?",
        choices: [
          "Determine particular solution",
          "Cause the general solution",
          "Nothing",
          "Define the DE",
        ],
        answerIndex: 0,
        explanation: "Locks down the family to one curve.",
      },
    ],
  },

  "7.8": {
    id: "7.8",
    title: "Exponential Models with Differential Equations",
    summary:
      "\\(dy/dt = ky\\) has solution \\(y(t) = y_0 e^{kt}\\): growth (\\(k > 0\\)) or decay (\\(k < 0\\)).",
    lesson:
      "Exponential model: any quantity changing at a rate proportional to its current amount. Solution to \\(dy/dt = ky\\) is \\(y(t) = y_0 e^{kt}\\), where \\(y_0 = y(0)\\).\n\nHalf-life (decay): time for \\(y\\) to halve. Solve \\(y_0 / 2 = y_0 e^{kt} \\Rightarrow t = -\\ln 2 / k\\).\n\nDoubling time (growth): \\(t = \\ln 2 / k\\).\n\nApplications: bacteria, radioactive decay, compound interest, drug elimination (if linear).",
    keyIdeas: [
      "Solution: \\(y(t) = y_0 e^{kt}\\).",
      "\\(k > 0\\): growth; \\(k < 0\\): decay.",
      "Half-life: \\(t = -\\ln 2 / k\\).",
      "Doubling time: \\(t = \\ln 2 / k\\).",
    ],
    workedExample: {
      prompt:
        "Population \\(P(t)\\) satisfies \\(dP/dt = 0.03 P, P(0) = 1000\\). Find \\(P(10)\\).",
      solution:
        "\\(P(t) = 1000 e^{0.03 t}\\); \\(P(10) = 1000 e^{0.3} \\approx 1349.86\\).",
    },
    flashcards: [
      { q: "Solution of \\(dy/dt = ky, y(0) = y_0\\)?", a: "\\(y = y_0 e^{kt}\\)." },
      { q: "Half-life formula (decay)?", a: "\\(\\ln 2 / |k|\\)." },
    ],
    commonMistakes: [
      "Wrong sign on \\(k\\) for decay.",
      "Confusing half-life with doubling time.",
      "Forgetting to plug in \\(y_0\\).",
    ],
    quiz: [
      {
        q: "\\(dy/dt = -0.1 y, y(0) = 100\\). \\(y(t) =\\)",
        choices: [
          "\\(100 e^{0.1 t}\\)",
          "\\(100 e^{-0.1 t}\\)",
          "\\(100 + e^{-0.1 t}\\)",
          "\\(-100 e^{0.1 t}\\)",
        ],
        answerIndex: 1,
        explanation: "Decay with \\(k = -0.1\\).",
      },
      {
        q: "Half-life for \\(k = -0.05\\):",
        choices: [
          "\\(\\ln 2 / 0.05\\)",
          "\\(-\\ln 2 / 0.05\\)",
          "\\(2/0.05\\)",
          "\\(0.05 \\ln 2\\)",
        ],
        answerIndex: 0,
        explanation: "\\(\\ln 2 / |k| = \\ln 2 / 0.05 \\approx 13.86\\).",
      },
      {
        q: "Doubling time for growth rate \\(k = 0.02\\):",
        choices: [
          "\\(\\ln 2 / 0.02\\)",
          "\\(2 / 0.02\\)",
          "\\(e^{0.02}\\)",
          "\\(0.02 \\ln 2\\)",
        ],
        answerIndex: 0,
        explanation: "\\(\\ln 2 / k\\).",
      },
      {
        q: "Exponential model works when rate is proportional to:",
        choices: [
          "Time",
          "Current amount",
          "Difference from equilibrium",
          "Constant",
        ],
        answerIndex: 1,
        explanation: "\\(dy/dt \\propto y\\).",
      },
    ],
  },

  "7.9": {
    id: "7.9",
    title: "Logistic Models with Differential Equations",
    summary:
      "\\(dP/dt = kP(1 - P/L)\\) models population with carrying capacity \\(L\\). Max growth at \\(P = L/2\\).",
    lesson:
      "Logistic differential equation: \\(dP/dt = kP(1 - P/L)\\). For small \\(P\\), behaves like exponential growth. As \\(P \\to L\\), growth slows; \\(P = L\\) is the carrying capacity.\n\nKey features:\n- Equilibria: \\(P = 0\\) (unstable) and \\(P = L\\) (stable).\n- Max growth rate: at \\(P = L/2\\); substituting gives \\(dP/dt = kL/4\\).\n- Sigmoid (S-shaped) solution curve.\n- Inflection at \\(P = L/2\\).\n\nSolution (optional to know): \\(P(t) = L/(1 + A e^{-kt})\\) where \\(A = (L - P_0)/P_0\\).\n\nAP asks qualitative questions: carrying capacity, long-term behavior, when is growth fastest.",
    keyIdeas: [
      "DE: \\(dP/dt = kP(1 - P/L)\\).",
      "Carrying capacity: \\(L\\).",
      "Max growth at \\(P = L/2\\).",
      "Sigmoid / S-shaped solution.",
    ],
    workedExample: {
      prompt:
        "\\(dP/dt = 0.1 P(1 - P/500)\\). Carrying capacity? Max growth rate?",
      solution:
        "Carrying capacity \\(L = 500\\). Max growth at \\(P = 250\\): \\(dP/dt = 0.1 \\cdot 250 \\cdot (1 - 250/500) = 0.1 \\cdot 250 \\cdot 0.5 = 12.5\\).",
    },
    flashcards: [
      { q: "Logistic DE?", a: "\\(dP/dt = kP(1 - P/L)\\)." },
      { q: "Max growth occurs at?", a: "\\(P = L/2\\)." },
      { q: "Long-term limit as \\(t \\to \\infty\\) (if \\(P_0 > 0\\))?", a: "\\(L\\)." },
    ],
    commonMistakes: [
      "Confusing max growth with maximum population.",
      "Forgetting \\(P = 0\\) is also equilibrium.",
      "Using exponential model when growth is bounded.",
    ],
    quiz: [
      {
        q: "\\(dP/dt = 0.5 P(1 - P/100)\\). Carrying capacity:",
        choices: ["0", "50", "100", "0.5"],
        answerIndex: 2,
        explanation: "\\(L = 100\\).",
      },
      {
        q: "Population grows fastest at:",
        choices: [
          "\\(P = 0\\)",
          "\\(P = L\\)",
          "\\(P = L/2\\)",
          "\\(P = L/4\\)",
        ],
        answerIndex: 2,
        explanation: "Maximum of \\(kP(1 - P/L)\\) at midpoint.",
      },
      {
        q: "As \\(t \\to \\infty\\) in logistic (with \\(P_0 > 0\\)):",
        choices: [
          "\\(P \\to 0\\)",
          "\\(P \\to L\\)",
          "\\(P \\to \\infty\\)",
          "Oscillates",
        ],
        answerIndex: 1,
        explanation: "Converges to carrying capacity.",
      },
      {
        q: "Inflection point of logistic solution curve:",
        choices: [
          "\\(P = 0\\)",
          "\\(P = L/2\\)",
          "\\(P = L\\)",
          "No inflection",
        ],
        answerIndex: 1,
        explanation: "Inflection at half carrying capacity.",
      },
    ],
  },

  "8.1": {
    id: "8.1",
    title: "Finding the Average Value of a Function on an Interval",
    summary:
      "\\(f_{\\text{avg}} = (1/(b-a)) \\int_a^b f(x)\\, dx\\).",
    lesson:
      "Average value: for a continuous \\(f\\) on \\([a, b]\\), the average value is \\(f_{\\text{avg}} = \\frac{1}{b - a}\\int_a^b f(x)\\, dx\\). Geometrically: the height of the rectangle over \\([a, b]\\) with area equal to \\(\\int_a^b f\\).\n\nMean Value Theorem for Integrals: there exists \\(c \\in [a, b]\\) such that \\(f(c) = f_{\\text{avg}}\\) (if \\(f\\) continuous).\n\nApplications: average velocity = (displacement)/(time); average temperature over a day; average concentration over a period.",
    keyIdeas: [
      "\\(f_{\\text{avg}} = \\frac{1}{b - a}\\int_a^b f\\, dx\\).",
      "Average ≠ midpoint value (unless \\(f\\) is linear).",
      "MVT for integrals: \\(\\exists c\\) with \\(f(c) = f_{\\text{avg}}\\).",
      "Always include units.",
    ],
    workedExample: {
      prompt:
        "Average value of \\(f(x) = x^2\\) on \\([0, 3]\\)?",
      solution:
        "\\((1/3)\\int_0^3 x^2\\, dx = (1/3)(27/3) = 3\\).",
    },
    flashcards: [
      { q: "Average value formula?", a: "\\(\\frac{1}{b-a}\\int_a^b f\\, dx\\)." },
      { q: "Average velocity?", a: "Displacement / elapsed time = \\(\\frac{1}{b-a}\\int_a^b v\\, dt\\)." },
    ],
    commonMistakes: [
      "Forgetting \\(1/(b-a)\\) factor.",
      "Confusing average with midpoint.",
      "Missing units.",
    ],
    quiz: [
      {
        q: "Average value of \\(f(x) = \\sin x\\) on \\([0, \\pi]\\):",
        choices: ["0", "1", "\\(2/\\pi\\)", "\\(\\pi/2\\)"],
        answerIndex: 2,
        explanation: "\\((1/\\pi)\\int_0^\\pi \\sin x\\, dx = (1/\\pi) \\cdot 2 = 2/\\pi\\).",
      },
      {
        q: "Average value formula:",
        choices: [
          "\\(\\int_a^b f\\, dx\\)",
          "\\((f(a) + f(b))/2\\)",
          "\\(\\frac{1}{b-a}\\int_a^b f\\, dx\\)",
          "\\(f((a+b)/2)\\)",
        ],
        answerIndex: 2,
        explanation: "Standard.",
      },
      {
        q: "Average value of \\(f(x) = 2x + 1\\) on \\([0, 4]\\):",
        choices: ["3", "5", "7", "9"],
        answerIndex: 1,
        explanation: "Linear: average = midpoint value = \\(f(2) = 5\\).",
      },
      {
        q: "MVT for Integrals: some \\(c\\) has \\(f(c) =\\)",
        choices: [
          "\\(\\int f\\)",
          "Average value",
          "\\(f(a) + f(b)\\)",
          "0",
        ],
        answerIndex: 1,
        explanation: "By continuity, the average value is attained.",
      },
    ],
  },

  "8.2": {
    id: "8.2",
    title: "Connecting Position, Velocity, and Acceleration Using Integrals",
    summary:
      "\\(s(t) = s(t_0) + \\int_{t_0}^t v(u)\\, du\\); total distance = \\(\\int |v|\\, dt\\).",
    lesson:
      "Integral analogs of motion:\n\n- Displacement over \\([a, b]\\): \\(\\int_a^b v(t)\\, dt\\).\n- Total distance over \\([a, b]\\): \\(\\int_a^b |v(t)|\\, dt\\) (always positive).\n- Position: \\(s(t) = s(t_0) + \\int_{t_0}^t v(u)\\, du\\).\n- Velocity: \\(v(t) = v(t_0) + \\int_{t_0}^t a(u)\\, du\\).\n\nDisplacement is signed (net change); distance is unsigned (sum of magnitudes). If particle reverses direction, distance > |displacement|.\n\nKnow the difference — AP loves to test this distinction.",
    keyIdeas: [
      "Displacement = \\(\\int v\\, dt\\).",
      "Distance = \\(\\int |v|\\, dt\\).",
      "Position recovered by integration + initial condition.",
      "Integrals of acceleration give velocity changes.",
    ],
    workedExample: {
      prompt:
        "\\(v(t) = t - 2\\) on \\([0, 4]\\). Displacement and distance?",
      solution:
        "Displacement: \\(\\int_0^4 (t - 2)\\, dt = [t^2/2 - 2t]_0^4 = 8 - 8 = 0\\). Distance: \\(\\int_0^2 |t-2|\\, dt + \\int_2^4 |t-2|\\, dt = 2 + 2 = 4\\).",
    },
    flashcards: [
      { q: "Displacement vs distance?", a: "Displacement: signed (\\(\\int v\\)); distance: unsigned (\\(\\int |v|\\))." },
      { q: "Position formula?", a: "\\(s(t) = s(t_0) + \\int_{t_0}^t v\\, du\\)." },
    ],
    commonMistakes: [
      "Computing distance without absolute value on velocity.",
      "Forgetting initial position.",
      "Confusing displacement with position.",
    ],
    quiz: [
      {
        q: "Displacement from velocity \\(v(t)\\) over \\([a, b]\\):",
        choices: ["\\(\\int_a^b v\\, dt\\)", "\\(\\int_a^b |v|\\, dt\\)", "\\(v(b) - v(a)\\)", "Average velocity"],
        answerIndex: 0,
        explanation: "Signed integral.",
      },
      {
        q: "Total distance from velocity:",
        choices: ["\\(\\int v\\)", "\\(\\int |v|\\)", "\\(\\int a\\)", "Displacement"],
        answerIndex: 1,
        explanation: "Uses absolute value.",
      },
      {
        q: "\\(v(t) = 3 - t\\), \\(s(0) = 5\\). \\(s(2) =\\)",
        choices: ["5", "7", "9", "11"],
        answerIndex: 2,
        explanation: "\\(s(2) = 5 + \\int_0^2 (3 - t)\\, dt = 5 + 4 = 9\\).",
      },
      {
        q: "Particle reverses direction when:",
        choices: [
          "\\(v = 0\\) without sign change",
          "\\(v\\) changes sign",
          "\\(a = 0\\)",
          "\\(s = 0\\)",
        ],
        answerIndex: 1,
        explanation: "Direction change = velocity sign change.",
      },
    ],
  },

  "8.3": {
    id: "8.3",
    title: "Using Accumulation Functions and Definite Integrals in Applied Contexts",
    summary:
      "Applied integrals: water in/out of tanks, drug concentrations, heat flow. Interpret the integral with units.",
    lesson:
      "Real-world accumulation problems blend FTC and context:\n\n- Water tank: \\(V(t) = V_0 + \\int_0^t (R_{\\text{in}} - R_{\\text{out}})\\, du\\).\n- Drug elimination: \\(C(t) = C_0 - \\int_0^t k \\cdot C(u)\\, du\\) (combined with a DE).\n- Heat: total heat = \\(\\int\\) rate \\(dt\\).\n\nOn FRQs, be explicit:\n- State the integral.\n- State the units of the answer.\n- Describe what the integral represents in context.\n\nAlso common: \"at what time is the amount greatest?\" — find \\(t\\) where \\(\\int\\)\\'s derivative (i.e. the rate) changes sign from \\(+\\) to \\(-\\).",
    keyIdeas: [
      "Accumulation over an interval = integral of rate.",
      "Include initial amount explicitly.",
      "Max/min of cumulative = sign change of rate.",
      "Always state units.",
    ],
    workedExample: {
      prompt:
        "Water enters at rate \\(R(t)\\) gal/min. If \\(V(0) = 10\\) and \\(\\int_0^{20} R(t)\\, dt = 150\\), find \\(V(20)\\).",
      solution:
        "\\(V(20) = 10 + 150 = 160\\) gallons.",
    },
    flashcards: [
      { q: "Accumulation in applied problems formula?", a: "Final = initial + \\(\\int\\) rate \\(dt\\)." },
      { q: "Max of accumulation happens when?", a: "When rate changes from positive to negative." },
    ],
    commonMistakes: [
      "Forgetting initial amount.",
      "Omitting units.",
      "Mixing up rate and quantity.",
    ],
    quiz: [
      {
        q: "Tank has \\(V(0) = 50\\) L. Rate \\(R(t) = 2t\\) L/min for 5 min. \\(V(5) =\\)",
        choices: ["25", "50", "75", "100"],
        answerIndex: 2,
        explanation: "\\(50 + \\int_0^5 2t\\, dt = 50 + 25 = 75\\).",
      },
      {
        q: "Max accumulation when rate:",
        choices: [
          "Is positive",
          "Changes sign \\(+\\to -\\)",
          "Changes sign \\(-\\to +\\)",
          "Is zero",
        ],
        answerIndex: 1,
        explanation: "\\(+ \\to -\\) means accumulation peaks.",
      },
      {
        q: "Drug concentration rate of elimination is 0.5 mg/L·hr. Over 4 hrs, cumulative elimination:",
        choices: ["0.5", "1", "2", "4"],
        answerIndex: 2,
        explanation: "\\(0.5 \\times 4 = 2\\) mg/L.",
      },
      {
        q: "An AP accumulation FRQ answer must:",
        choices: [
          "Give a number",
          "Give a number with units and context",
          "Be an integral expression only",
          "Be a graph",
        ],
        answerIndex: 1,
        explanation: "Graders require full contextual answer.",
      },
    ],
  },

  "8.4": {
    id: "8.4",
    title: "Finding the Area Between Curves Expressed as Functions of x",
    summary:
      "Area = \\(\\int_a^b (\\text{top} - \\text{bottom})\\, dx\\). Find intersections, identify which function is on top.",
    lesson:
      "For two curves \\(y = f(x)\\) (top) and \\(y = g(x)\\) (bottom) on \\([a, b]\\):\n\nArea = \\(\\int_a^b [f(x) - g(x)]\\, dx\\).\n\nSteps:\n1) Find intersections (or use given bounds).\n2) Determine which is top (test a point).\n3) Set up and integrate.\n\nIf the \"top\" switches between curves within the interval, split the integral at the crossing.",
    keyIdeas: [
      "Top − bottom, integrated.",
      "Find intersections first.",
      "Test a point to decide top/bottom.",
      "Split integral if curves cross.",
    ],
    workedExample: {
      prompt:
        "Area between \\(y = x^2\\) and \\(y = x\\) on \\([0, 1]\\).",
      solution:
        "On \\([0, 1]\\), \\(x \\ge x^2\\). Area = \\(\\int_0^1 (x - x^2)\\, dx = [x^2/2 - x^3/3]_0^1 = 1/2 - 1/3 = 1/6\\).",
    },
    flashcards: [
      { q: "Area between curves formula?", a: "\\(\\int_a^b [\\text{top} - \\text{bottom}]\\, dx\\)." },
      { q: "What if curves cross at \\(c\\) in \\((a, b)\\)?", a: "Split integral at \\(c\\); flip top/bottom." },
    ],
    commonMistakes: [
      "Subtracting in the wrong order (gives negative).",
      "Forgetting to find intersection points.",
      "Ignoring crossings.",
    ],
    quiz: [
      {
        q: "Area between \\(y = x\\) and \\(y = x^2\\) on \\([0, 1]\\):",
        choices: ["\\(1/3\\)", "\\(1/6\\)", "\\(1/2\\)", "1"],
        answerIndex: 1,
        explanation: "Standard result.",
      },
      {
        q: "Which function is on top determines:",
        choices: [
          "Only the sign",
          "The integrand order",
          "Whether to integrate at all",
          "Nothing",
        ],
        answerIndex: 1,
        explanation: "Top − bottom vs bottom − top matters.",
      },
      {
        q: "\\(y = 4\\) and \\(y = x^2\\) enclose area. Bounds are:",
        choices: ["0 to 2", "\\(-2\\) to 2", "0 to 4", "\\(-1\\) to 1"],
        answerIndex: 1,
        explanation: "Intersect where \\(x^2 = 4\\).",
      },
      {
        q: "If two curves cross at midpoint of \\([a, b]\\):",
        choices: [
          "Split integral",
          "Integrate from \\(a\\) to \\(b\\) as usual",
          "Take only one curve",
          "Doesn't matter",
        ],
        answerIndex: 0,
        explanation: "Top/bottom flips at the crossing.",
      },
    ],
  },

  "8.5": {
    id: "8.5",
    title: "Finding the Area Between Curves Expressed as Functions of y",
    summary:
      "For curves \\(x = f(y)\\) and \\(x = g(y)\\), area = \\(\\int_c^d (\\text{right} - \\text{left})\\, dy\\).",
    lesson:
      "When it's more natural to integrate with respect to \\(y\\) (e.g., curves are functions of \\(y\\), or horizontal slicing is easier), set up:\n\nArea = \\(\\int_c^d [x_{\\text{right}}(y) - x_{\\text{left}}(y)]\\, dy\\).\n\nRewrite curves as \\(x\\) in terms of \\(y\\). Find intersections (set \\(x\\)'s equal). Integrate.\n\nUseful when the region has a natural \\(y\\)-description — e.g., bounded by \\(x = y^2\\) and \\(x = y + 2\\).",
    keyIdeas: [
      "Integrate in \\(y\\) when natural.",
      "Right − left, integrated.",
      "Swap: solve for \\(x\\) in terms of \\(y\\).",
      "Useful for sideways curves.",
    ],
    workedExample: {
      prompt:
        "Area between \\(x = y^2\\) and \\(x = y + 2\\).",
      solution:
        "Set \\(y^2 = y + 2 \\Rightarrow y^2 - y - 2 = 0 \\Rightarrow y = -1, 2\\). On \\((-1, 2)\\), \\(y + 2 > y^2\\). Area = \\(\\int_{-1}^2 (y + 2 - y^2)\\, dy = [y^2/2 + 2y - y^3/3]_{-1}^2 = (2 + 4 - 8/3) - (1/2 - 2 + 1/3) = 9/2\\).",
    },
    flashcards: [
      { q: "Formula for area between \\(x = f(y)\\) and \\(x = g(y)\\)?", a: "\\(\\int_c^d [f(y) - g(y)]\\, dy\\), where \\(f\\) is on the right." },
      { q: "When is \\(y\\)-integration easier?", a: "When curves are naturally expressed as \\(x = h(y)\\)." },
    ],
    commonMistakes: [
      "Not solving for \\(x\\) in terms of \\(y\\).",
      "Wrong choice of left vs right.",
      "Missing \\(y\\)-intersection points.",
    ],
    quiz: [
      {
        q: "\\(x = y^2\\) and \\(x = 4\\). Area integrated in \\(y\\):",
        choices: [
          "\\(\\int_{-2}^2 (4 - y^2)\\, dy\\)",
          "\\(\\int_0^4 y^2\\, dy\\)",
          "\\(\\int_{-2}^2 y^2\\, dy\\)",
          "\\(\\int_0^4 (4 - y^2)\\, dy\\)",
        ],
        answerIndex: 0,
        explanation: "Right − left; \\(y\\) from \\(-2\\) to 2.",
      },
      {
        q: "Which suggests integrating in \\(y\\)?",
        choices: [
          "\\(y = x^2\\) with \\(y = 4\\)",
          "\\(x = y^2\\) with \\(x = 4\\)",
          "\\(y = x\\) with \\(y = 2x + 1\\)",
          "None",
        ],
        answerIndex: 1,
        explanation: "Curves naturally in \\(y\\).",
      },
      {
        q: "Right − left, integrated in \\(y\\):",
        choices: [
          "Gives negative area",
          "Gives positive area if right > left",
          "Always zero",
          "Only works for squares",
        ],
        answerIndex: 1,
        explanation: "Positive if setup correct.",
      },
      {
        q: "Intersection of \\(x = y^2\\) and \\(x = y + 2\\):",
        choices: ["\\(y = -1, 2\\)", "\\(y = 0, 3\\)", "\\(y = 1, -2\\)", "\\(y = 1, 2\\)"],
        answerIndex: 0,
        explanation: "\\(y^2 - y - 2 = 0\\).",
      },
    ],
  },

  "8.6": {
    id: "8.6",
    title: "Finding the Area Between Curves That Intersect at More Than Two Points",
    summary:
      "Split the integral at each intersection; pay attention to which curve is on top in each sub-interval.",
    lesson:
      "When curves cross multiple times, the \"top\" function changes. Procedure:\n\n1) Find all intersections on the interval.\n2) Split into sub-intervals.\n3) On each, determine top vs bottom by testing a point.\n4) Sum the integrals, with absolute correction if needed.\n\nAlternative: just integrate \\(|f - g|\\) directly, but in practice splitting is cleaner.",
    keyIdeas: [
      "Find all crossings.",
      "Test top/bottom per sub-interval.",
      "Sum integrals, each top − bottom.",
      "Equivalent to \\(\\int |f - g|\\, dx\\).",
    ],
    workedExample: {
      prompt:
        "Area between \\(y = \\sin x\\) and \\(y = \\cos x\\) on \\([0, \\pi]\\).",
      solution:
        "They intersect at \\(x = \\pi/4\\) on \\([0, \\pi]\\). On \\([0, \\pi/4]\\), \\(\\cos > \\sin\\). On \\([\\pi/4, \\pi]\\), \\(\\sin > \\cos\\) (for most of the way). Area = \\(\\int_0^{\\pi/4}(\\cos x - \\sin x)\\, dx + \\int_{\\pi/4}^\\pi (\\sin x - \\cos x)\\, dx\\). Compute each to get \\((\\sqrt{2} - 1) + (1 + \\sqrt{2}) = 2\\sqrt{2}\\).",
    },
    flashcards: [
      { q: "Strategy for multiple-intersection area?", a: "Split at each intersection; identify top vs bottom per sub-interval." },
      { q: "Alternative compact formula?", a: "\\(\\int |f - g|\\, dx\\) over the interval." },
    ],
    commonMistakes: [
      "Missing an intersection.",
      "Forgetting to swap top/bottom after crossing.",
      "Adding negative areas.",
    ],
    quiz: [
      {
        q: "\\(y = x^3\\) and \\(y = x\\) intersect at:",
        choices: ["0 only", "1 only", "0, \\(\\pm 1\\)", "\\(-1\\) only"],
        answerIndex: 2,
        explanation: "Three intersections.",
      },
      {
        q: "Area between \\(y = x^3\\) and \\(y = x\\) on \\([-1, 1]\\):",
        choices: ["0", "\\(1/2\\)", "\\(1\\)", "\\(2\\)"],
        answerIndex: 1,
        explanation: "Symmetric; each half contributes 1/4; total 1/2.",
      },
      {
        q: "Best strategy when curves cross 3 times on \\([a, b]\\):",
        choices: [
          "Integrate without splitting",
          "Split into 3 parts",
          "Split into 4 parts with correct top/bottom",
          "Take only the positive parts",
        ],
        answerIndex: 2,
        explanation: "Three crossings make 4 sub-intervals.",
      },
      {
        q: "\\(\\int_a^b |f - g|\\, dx\\) equals:",
        choices: [
          "Displacement between curves",
          "Total area between them",
          "Always zero",
          "Difference of integrals",
        ],
        answerIndex: 1,
        explanation: "Absolute value guarantees positive contributions.",
      },
    ],
  },

  "8.7": {
    id: "8.7",
    title: "Volumes with Cross Sections: Squares and Rectangles",
    summary:
      "\\(V = \\int_a^b A(x)\\, dx\\). For square cross sections of side \\(s(x)\\), \\(A = s^2\\).",
    lesson:
      "For a solid where cross sections perpendicular to a given axis have known shape, volume is \\(\\int_a^b A(x)\\, dx\\), where \\(A(x)\\) is the cross-section area.\n\nSquares on base between two curves \\(f(x)\\) and \\(g(x)\\): side length = \\(|f(x) - g(x)|\\), so \\(A(x) = (f(x) - g(x))^2\\).\n\nRectangles: if height is defined (e.g., rectangles of height equal to \\(h(x)\\) and width \\(|f - g|\\)), \\(A(x) = h(x) \\cdot |f(x) - g(x)|\\).",
    keyIdeas: [
      "\\(V = \\int A(x)\\, dx\\).",
      "Square side = curve difference.",
      "Rectangle area = length × height.",
      "Identify axis of integration (\\(x\\) or \\(y\\)) from problem.",
    ],
    workedExample: {
      prompt:
        "Base is region under \\(y = \\sqrt{x}\\) from 0 to 4; cross sections perpendicular to x-axis are squares. Volume?",
      solution:
        "Side = \\(\\sqrt{x}\\); area = \\(x\\). \\(V = \\int_0^4 x\\, dx = 8\\).",
    },
    flashcards: [
      { q: "Volume of solid with known cross sections?", a: "\\(V = \\int A(x)\\, dx\\) along perpendicular axis." },
      { q: "Square cross section from base region?", a: "\\(A = s^2\\) where \\(s\\) is the length between the base curves." },
    ],
    commonMistakes: [
      "Forgetting to square the side.",
      "Using incorrect side length.",
      "Integrating along wrong axis.",
    ],
    quiz: [
      {
        q: "Base under \\(y = x\\) from 0 to 2. Square cross sections perpendicular to x-axis. Volume:",
        choices: ["\\(4\\)", "\\(8/3\\)", "\\(2\\)", "\\(4/3\\)"],
        answerIndex: 1,
        explanation: "\\(\\int_0^2 x^2\\, dx = 8/3\\).",
      },
      {
        q: "Rectangle cross section has width \\(|f - g|\\) and height 2. Area:",
        choices: ["\\((f - g)^2\\)", "\\(2 (f - g)\\)", "\\(2 |f - g|\\)", "\\(|f - g| / 2\\)"],
        answerIndex: 2,
        explanation: "Rectangle: length × width.",
      },
      {
        q: "Volume formula uses:",
        choices: [
          "Length of base curve",
          "Integral of cross-sectional area",
          "Derivative of area",
          "Surface area",
        ],
        answerIndex: 1,
        explanation: "Standard Cavalieri setup.",
      },
      {
        q: "Cross sections perpendicular to y-axis means integrate:",
        choices: ["In \\(x\\)", "In \\(y\\)", "Doesn't matter", "In \\(z\\)"],
        answerIndex: 1,
        explanation: "Integration variable matches cross-section direction.",
      },
    ],
  },

  "8.8": {
    id: "8.8",
    title: "Volumes with Cross Sections: Triangles and Semicircles",
    summary:
      "For triangle cross sections (equilateral, isosceles): \\(A = (\\sqrt{3}/4) s^2\\) or \\((1/2)bh\\). Semicircles: \\(A = (\\pi/8) s^2\\) (diameter = \\(s\\)).",
    lesson:
      "Common shapes:\n\n- Equilateral triangle with side \\(s\\): \\(A = (\\sqrt{3}/4) s^2\\).\n- Isosceles right triangle (leg \\(s\\), hypotenuse on base): \\(A = (1/2) s^2\\).\n- Isosceles right triangle (hypotenuse \\(= s\\) on base): \\(A = (1/4) s^2\\).\n- Semicircle (diameter \\(= s\\)): \\(A = (\\pi / 8) s^2\\).\n\nPlug into \\(V = \\int A(x)\\, dx\\). Watch the geometry: whether the base of the triangle is the diameter, leg, or hypotenuse.",
    keyIdeas: [
      "Memorize area formulas for common shapes.",
      "Side length comes from difference of base curves.",
      "Integrate cross-section area.",
      "Check geometric interpretation (diameter vs radius).",
    ],
    workedExample: {
      prompt:
        "Base is circle \\(x^2 + y^2 = 9\\). Cross sections perpendicular to x-axis are semicircles with diameter on base. Volume?",
      solution:
        "Chord length = \\(2\\sqrt{9 - x^2}\\); diameter = \\(2\\sqrt{9 - x^2}\\). Area = \\((\\pi/8)(2\\sqrt{9-x^2})^2 = (\\pi/2)(9 - x^2)\\). \\(V = (\\pi/2)\\int_{-3}^3 (9 - x^2)\\, dx = (\\pi/2)(36) = 18\\pi\\).",
    },
    flashcards: [
      { q: "Equilateral triangle area (side \\(s\\))?", a: "\\((\\sqrt{3}/4) s^2\\)." },
      { q: "Semicircle area (diameter \\(s\\))?", a: "\\((\\pi/8) s^2\\)." },
    ],
    commonMistakes: [
      "Confusing diameter with radius.",
      "Wrong triangle formula.",
      "Not accounting for orientation.",
    ],
    quiz: [
      {
        q: "Equilateral triangle with side 2 has area:",
        choices: ["1", "\\(\\sqrt{3}\\)", "2", "\\(2\\sqrt{3}\\)"],
        answerIndex: 1,
        explanation: "\\((\\sqrt{3}/4) \\cdot 4 = \\sqrt{3}\\).",
      },
      {
        q: "Semicircle with diameter 4:",
        choices: ["\\(\\pi\\)", "\\(2\\pi\\)", "\\(4\\pi\\)", "\\(\\pi/2\\)"],
        answerIndex: 1,
        explanation: "\\((\\pi/8) \\cdot 16 = 2\\pi\\).",
      },
      {
        q: "Isosceles right triangle with legs \\(s\\) has area:",
        choices: ["\\(s^2\\)", "\\(s^2/2\\)", "\\(s^2/4\\)", "\\(\\sqrt{2} s\\)"],
        answerIndex: 1,
        explanation: "\\((1/2) s \\cdot s = s^2/2\\).",
      },
      {
        q: "For cross sections, the side \\(s\\) is usually:",
        choices: [
          "An independent variable",
          "Distance between the two base curves",
          "The radius",
          "1",
        ],
        answerIndex: 1,
        explanation: "Length of the segment cut by the base region.",
      },
    ],
  },

  "8.9": {
    id: "8.9",
    title: "Volume with Disc Method: Revolving Around the x- or y-Axis",
    summary:
      "Revolving \\(y = f(x) \\ge 0\\) around x-axis: \\(V = \\pi \\int_a^b [f(x)]^2\\, dx\\).",
    lesson:
      "Disc method formula for revolution around an axis:\n\n- Around x-axis: \\(V = \\pi \\int_a^b [f(x)]^2\\, dx\\).\n- Around y-axis: \\(V = \\pi \\int_c^d [g(y)]^2\\, dy\\) (rewrite as \\(x = g(y)\\)).\n\nEach \"disc\" is a circle of radius \\(|f(x)|\\) and thickness \\(dx\\); area \\(\\pi f(x)^2\\).\n\nCrucial: the region must touch the axis of revolution (no gap). If there's a gap, use washers instead.",
    keyIdeas: [
      "Disc volume: \\(\\pi \\int r^2\\, dr\\)-like setup.",
      "Radius = distance from axis to the curve.",
      "No gap: region touches axis.",
      "Axis of revolution picks integration variable.",
    ],
    workedExample: {
      prompt:
        "Region under \\(y = \\sqrt{x}\\) on \\([0, 4]\\) revolved around x-axis. Volume?",
      solution:
        "\\(V = \\pi \\int_0^4 x\\, dx = \\pi \\cdot 8 = 8\\pi\\).",
    },
    flashcards: [
      { q: "Disc method formula (x-axis)?", a: "\\(V = \\pi \\int_a^b [f(x)]^2\\, dx\\)." },
      { q: "Disc radius?", a: "Distance from the curve to the axis of revolution." },
    ],
    commonMistakes: [
      "Forgetting \\(\\pi\\).",
      "Not squaring the radius.",
      "Using discs when a gap requires washers.",
    ],
    quiz: [
      {
        q: "Region under \\(y = x\\) on \\([0, 1]\\) revolved around x-axis:",
        choices: [
          "\\(\\pi/3\\)",
          "\\(\\pi/2\\)",
          "\\(\\pi\\)",
          "\\(2\\pi\\)",
        ],
        answerIndex: 0,
        explanation: "\\(\\pi \\int_0^1 x^2\\, dx = \\pi/3\\).",
      },
      {
        q: "Disc method requires the region to:",
        choices: [
          "Be symmetric",
          "Touch the axis (no gap)",
          "Have area 1",
          "Be rectangular",
        ],
        answerIndex: 1,
        explanation: "No gap → discs; gap → washers.",
      },
      {
        q: "Revolving \\(y = x^2\\) from 0 to 2 around x-axis:",
        choices: [
          "\\(32\\pi/5\\)",
          "\\(4\\pi\\)",
          "\\(8\\pi\\)",
          "\\(16\\pi/3\\)",
        ],
        answerIndex: 0,
        explanation: "\\(\\pi \\int_0^2 x^4\\, dx = 32\\pi/5\\).",
      },
      {
        q: "Disc formula dimension:",
        choices: [
          "\\(\\pi r\\)",
          "\\(\\pi r^2\\)",
          "\\(2\\pi r\\)",
          "\\(r^2\\)",
        ],
        answerIndex: 1,
        explanation: "Area of a circle.",
      },
    ],
  },

  "8.10": {
    id: "8.10",
    title: "Volume with Disc Method: Revolving Around Other Axes",
    summary:
      "Shift the radius: disc method with radius = |curve − axis line|, then \\(V = \\pi \\int r^2\\).",
    lesson:
      "For revolution around a non-coordinate axis (horizontal line \\(y = k\\) or vertical line \\(x = c\\)):\n\nRadius = |distance from curve to line of revolution|.\n\n- Around \\(y = k\\): radius = \\(|f(x) - k|\\); \\(V = \\pi \\int [f(x) - k]^2\\, dx\\).\n- Around \\(x = c\\): radius = \\(|g(y) - c|\\); integrate in \\(y\\).\n\nAlways sketch the region and axis to determine signs and orientation.",
    keyIdeas: [
      "Adjust radius by subtracting axis line.",
      "Absolute value handled by squaring.",
      "Draw the picture.",
      "Axis determines integration variable.",
    ],
    workedExample: {
      prompt:
        "Region under \\(y = x^2\\) on \\([0, 2]\\) revolved around \\(y = -1\\). Volume?",
      solution:
        "Radius: \\(x^2 - (-1) = x^2 + 1\\). \\(V = \\pi \\int_0^2 (x^2 + 1)^2\\, dx\\). Expand: \\(x^4 + 2x^2 + 1\\); integrate: \\(x^5/5 + 2x^3/3 + x\\). Eval at 2: \\(32/5 + 16/3 + 2 = 206/15\\). So \\(V = 206\\pi/15\\).",
    },
    flashcards: [
      { q: "Around \\(y = k\\), radius?", a: "\\(|f(x) - k|\\)." },
      { q: "Always do what before setting up?", a: "Sketch the region and the axis." },
    ],
    commonMistakes: [
      "Using \\(f(x)\\) as radius when axis is shifted.",
      "Sign error when axis is below the region.",
      "Confusing horizontal and vertical axis cases.",
    ],
    quiz: [
      {
        q: "Region under \\(y = x\\), 0 to 1, revolved around \\(y = -2\\). Radius:",
        choices: [
          "\\(x\\)",
          "\\(x + 2\\)",
          "\\(2 - x\\)",
          "\\(x^2 + 2\\)",
        ],
        answerIndex: 1,
        explanation: "Distance from \\(y = x\\) to \\(y = -2\\).",
      },
      {
        q: "Revolve around \\(x = 4\\). Radius:",
        choices: [
          "\\(x\\)",
          "\\(x - 4\\)",
          "\\(|x - 4|\\) (gets squared)",
          "Always 4",
        ],
        answerIndex: 2,
        explanation: "Distance to vertical axis, squared.",
      },
      {
        q: "To revolve \\(y = x^2\\) from 0 to 1 around \\(y = 2\\), radius is:",
        choices: [
          "\\(x^2\\)",
          "\\(x^2 + 2\\)",
          "\\(2 - x^2\\)",
          "2",
        ],
        answerIndex: 2,
        explanation: "Curve below axis; radius \\(2 - x^2\\).",
      },
      {
        q: "After subtracting axis line, radius gets:",
        choices: [
          "Absolute valued",
          "Squared and integrated with \\(\\pi\\)",
          "Differentiated",
          "Ignored",
        ],
        answerIndex: 1,
        explanation: "Disc method: \\(\\pi r^2\\).",
      },
    ],
  },

  "8.11": {
    id: "8.11",
    title: "Volume with Washer Method: Revolving Around the x- or y-Axis",
    summary:
      "\\(V = \\pi \\int [(R)^2 - (r)^2]\\, dx\\) where \\(R\\) is outer, \\(r\\) inner radius.",
    lesson:
      "When the region has a gap from the axis (bounded by two curves), use washers:\n\n\\(V = \\pi \\int_a^b [R(x)^2 - r(x)^2]\\, dx\\)\n\nwhere \\(R\\) is the outer radius (distance from axis to outer curve) and \\(r\\) is the inner radius (distance from axis to inner curve).\n\nEssential: identify which curve is further from the axis. Both are measured from the axis, not from each other.",
    keyIdeas: [
      "Outer squared minus inner squared.",
      "Both radii measured from axis.",
      "Useful when region has gap from axis.",
      "Never replace \\(R^2 - r^2\\) with \\((R - r)^2\\).",
    ],
    workedExample: {
      prompt:
        "Region between \\(y = x\\) and \\(y = x^2\\) revolved around x-axis.",
      solution:
        "Outer \\(R = x\\); inner \\(r = x^2\\). \\(V = \\pi \\int_0^1 (x^2 - x^4)\\, dx = \\pi (1/3 - 1/5) = 2\\pi/15\\).",
    },
    flashcards: [
      { q: "Washer formula?", a: "\\(\\pi \\int (R^2 - r^2)\\, dx\\)." },
      { q: "Inner radius?", a: "Distance from axis to the closer curve." },
    ],
    commonMistakes: [
      "Writing \\((R - r)^2\\) instead of \\(R^2 - r^2\\).",
      "Swapping outer and inner.",
      "Using discs when a gap requires washers.",
    ],
    quiz: [
      {
        q: "Region between \\(y = x\\) and \\(y = x^2\\), \\(x \\in [0, 1]\\), revolved around x-axis. Volume:",
        choices: ["\\(\\pi/15\\)", "\\(2\\pi/15\\)", "\\(\\pi/5\\)", "\\(\\pi/3\\)"],
        answerIndex: 1,
        explanation: "Standard washer result.",
      },
      {
        q: "Washer integrand:",
        choices: [
          "\\((R - r)^2\\)",
          "\\(R^2 - r^2\\)",
          "\\(\\pi(R - r)\\)",
          "\\(R^2 + r^2\\)",
        ],
        answerIndex: 1,
        explanation: "Outer squared minus inner squared.",
      },
      {
        q: "If the region touches the axis, use:",
        choices: ["Washers", "Discs", "Neither", "Both"],
        answerIndex: 1,
        explanation: "No gap = discs.",
      },
      {
        q: "For \\(y = \\sqrt{x}\\) and \\(y = x^2\\) on \\([0, 1]\\), which is outer?",
        choices: ["\\(\\sqrt{x}\\)", "\\(x^2\\)", "Depends on \\(x\\)", "Both"],
        answerIndex: 0,
        explanation: "\\(\\sqrt{x} \\ge x^2\\) on \\([0,1]\\).",
      },
    ],
  },

  "8.12": {
    id: "8.12",
    title: "Volume with Washer Method: Revolving Around Other Axes",
    summary:
      "Shift the radii: outer = |farther curve − axis|, inner = |closer curve − axis|.",
    lesson:
      "Revolving around a non-coordinate axis with a gap:\n\nOuter radius \\(R\\) = distance from axis to the farther curve.\nInner radius \\(r\\) = distance from axis to the closer curve.\n\n\\(V = \\pi \\int_a^b (R^2 - r^2)\\, dx\\).\n\nStep carefully: sketch, identify which curve is farther from the axis (not necessarily the one on top).",
    keyIdeas: [
      "Draw the region and axis.",
      "Farther curve = outer radius.",
      "Closer curve = inner radius.",
      "Axis choice determines \\(x\\) or \\(y\\) integration.",
    ],
    workedExample: {
      prompt:
        "Region between \\(y = x\\) and \\(y = x^2\\), revolved around \\(y = -1\\).",
      solution:
        "\\(R = x + 1\\) (farther from \\(y = -1\\)); \\(r = x^2 + 1\\). \\(V = \\pi \\int_0^1 [(x+1)^2 - (x^2+1)^2]\\, dx\\). Expand and integrate to get the volume.",
    },
    flashcards: [
      { q: "Outer radius when axis is below region?", a: "Upper curve − axis." },
      { q: "Inner radius?", a: "Lower curve − axis (in the non-gap direction)." },
    ],
    commonMistakes: [
      "Forgetting to shift by the axis position.",
      "Confusing outer with inner.",
      "Mixing up \\(R^2 - r^2\\) with \\((R - r)^2\\).",
    ],
    quiz: [
      {
        q: "Revolve \\(y = x^2\\) from 0 to 2 around \\(y = -1\\); if solid were just disc method, radius:",
        choices: ["\\(x^2\\)", "\\(x^2 + 1\\)", "\\(1 - x^2\\)", "\\(-x^2\\)"],
        answerIndex: 1,
        explanation: "Distance to axis \\(y = -1\\).",
      },
      {
        q: "Washer around \\(x = 3\\). Outer radius:",
        choices: [
          "Max of \\(|x - 3|\\) for outer curve",
          "Just \\(x - 3\\)",
          "Radius always 3",
          "None",
        ],
        answerIndex: 0,
        explanation: "Farther curve's distance.",
      },
      {
        q: "Before setting up a washer around a shifted axis:",
        choices: [
          "Sketch the setup",
          "Invert the function",
          "Assume disc method",
          "Use numerical only",
        ],
        answerIndex: 0,
        explanation: "Picture reveals outer vs inner.",
      },
      {
        q: "Washer integrand structure:",
        choices: [
          "\\((R-r)^2\\)",
          "\\(R^2 - r^2\\)",
          "\\(R^2 + r^2\\)",
          "\\(|R - r|\\)",
        ],
        answerIndex: 1,
        explanation: "Always squared difference of individual radii.",
      },
    ],
  },

  "8.13": {
    id: "8.13",
    title: "The Arc Length of a Smooth, Planar Curve and Distance Traveled",
    summary:
      "\\(L = \\int_a^b \\sqrt{1 + (f'(x))^2}\\, dx\\) for \\(y = f(x)\\). Matches distance for motion along a line.",
    lesson:
      "Arc length for \\(y = f(x)\\) on \\([a, b]\\) (with \\(f'\\) continuous):\n\n$$L = \\int_a^b \\sqrt{1 + (f'(x))^2}\\, dx.$$\n\nFor \\(x = g(y)\\): \\(L = \\int_c^d \\sqrt{1 + (g'(y))^2}\\, dy\\).\n\nArc length is the total distance along the curve. When interpreted as a 1D motion problem, \\(\\int |v|\\, dt\\) gives total distance; the Pythagorean setup is \\(ds = \\sqrt{dx^2 + dy^2}\\).\n\nMost arc length integrals don't simplify to elementary forms; you may need a calculator on the AP.",
    keyIdeas: [
      "\\(L = \\int \\sqrt{1 + (f')^2}\\, dx\\).",
      "Equivalent form in \\(y\\): \\(\\sqrt{1 + (dx/dy)^2}\\, dy\\).",
      "\\(ds\\) setup: \\(\\sqrt{dx^2 + dy^2}\\).",
      "Most integrals require calculator.",
    ],
    workedExample: {
      prompt:
        "Arc length of \\(y = (2/3) x^{3/2}\\) from \\(x = 0\\) to \\(x = 3\\).",
      solution:
        "\\(y' = x^{1/2}\\); \\(1 + (y')^2 = 1 + x\\). \\(L = \\int_0^3 \\sqrt{1 + x}\\, dx = [(2/3)(1+x)^{3/2}]_0^3 = (2/3)(8 - 1) = 14/3\\).",
    },
    flashcards: [
      { q: "Arc length formula in \\(x\\)?", a: "\\(L = \\int_a^b \\sqrt{1 + (f'(x))^2}\\, dx\\)." },
      { q: "Why can't you usually integrate elementarily?", a: "The integrand \\(\\sqrt{1 + (f')^2}\\) rarely has an elementary antiderivative." },
    ],
    commonMistakes: [
      "Missing the \\(1 +\\) inside the square root.",
      "Squaring \\(f\\) instead of \\(f'\\).",
      "Forgetting absolute value in distance context.",
    ],
    quiz: [
      {
        q: "Arc length of \\(y = x\\) from 0 to 1:",
        choices: ["1", "\\(\\sqrt{2}\\)", "2", "\\(\\sqrt{3}\\)"],
        answerIndex: 1,
        explanation: "\\(\\int_0^1 \\sqrt{2}\\, dx = \\sqrt{2}\\).",
      },
      {
        q: "Arc length formula:",
        choices: [
          "\\(\\int \\sqrt{f^2 + 1}\\, dx\\)",
          "\\(\\int \\sqrt{1 + (f')^2}\\, dx\\)",
          "\\(\\int (1 + f')^2\\, dx\\)",
          "\\(\\int f'\\, dx\\)",
        ],
        answerIndex: 1,
        explanation: "Standard form.",
      },
      {
        q: "For horizontal line \\(y = 5\\) from 0 to 10, arc length:",
        choices: ["0", "5", "10", "\\(\\sqrt{25}\\)"],
        answerIndex: 2,
        explanation: "\\(f' = 0\\); \\(\\int_0^{10} 1\\, dx = 10\\).",
      },
      {
        q: "\\(ds\\) (differential arc length) equals:",
        choices: [
          "\\(dx\\)",
          "\\(\\sqrt{dx^2 + dy^2}\\)",
          "\\(dy\\)",
          "\\(dx + dy\\)",
        ],
        answerIndex: 1,
        explanation: "Pythagorean.",
      },
    ],
  },




};
