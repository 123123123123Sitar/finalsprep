import type { CourseCedLessons } from "./types";

/**
 * AP Precalculus CED lessons. Unit 1 is written out in full here as a
 * worked example of the format. Remaining units are scheduled for a
 * subsequent generation pass — the UI falls back to a "Coming soon"
 * badge until a topic gets a CedLesson entry.
 */

const AXIS = `
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="#1a1a1a" />
    </marker>
  </defs>
  <line x1="20" y1="120" x2="380" y2="120" stroke="#1a1a1a" stroke-width="1.2" marker-end="url(#arr)" />
  <line x1="200" y1="220" x2="200" y2="20" stroke="#1a1a1a" stroke-width="1.2" marker-end="url(#arr)" />
  <text x="375" y="135" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">x</text>
  <text x="210" y="25" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">y</text>
`;

export const AP_PRECALC_CED_LESSONS: CourseCedLessons = {
  "1.1": {
    id: "1.1",
    title: "Change in Tandem",
    summary:
      "Functions describe how one quantity changes as another changes. Unit 1 starts by teaching you to read those changes from tables, graphs, and contexts.",
    lesson:
      "A function is a rule that assigns exactly one output to each input. In AP Precalc the phrase \"change in tandem\" captures the core move: you watch one variable move and describe how the other responds. The classic example is time and distance on a drive — as time \\(t\\) increases, distance \\(d\\) increases too, and you can describe the relationship with a rate.\n\nWhen you look at a table, you're checking differences. If the first differences \\(\\Delta y\\) are constant for equal steps in \\(x\\), the function is linear. If the second differences are constant, the function is quadratic. These patterns repeat in every unit this year, so train the habit now.\n\nWhen you look at a graph, you're checking slope direction. Where does the graph go up, where does it go down, where is it flat? Every time the slope flips sign the function has a local max or min — a critical feature you'll revisit when you hit derivatives in Calc.\n\nContextually, always name the input and output in sentences. \"As the number of students doubles, the cost triples\" is a tandem statement; it forces you to think about units and direction before you touch any algebra.",
    keyIdeas: [
      "A function assigns exactly one output per input.",
      "Constant first differences = linear; constant second differences = quadratic.",
      "The direction of change on a graph is just the sign of the slope.",
      "Describe change in full sentences before reaching for a formula.",
    ],
    workedExample: {
      prompt:
        "A table gives \\(f(0) = 3,\\ f(1) = 5,\\ f(2) = 9,\\ f(3) = 15\\). Is \\(f\\) linear, quadratic, or neither?",
      solution:
        "First differences: \\(5-3=2,\\ 9-5=4,\\ 15-9=6\\) — not constant, so not linear. Second differences: \\(4-2=2,\\ 6-4=2\\) — constant. Equal second differences mean \\(f\\) is quadratic, consistent with something like \\(f(x) = x^2 + x + 3\\).",
    },
    commonMistakes: [
      "Computing differences over unequal x-steps — they have to be uniform for the trick to work.",
      "Confusing \"increasing\" with \"positive\" — a function can be positive while decreasing.",
      "Skipping the sentence-level description and jumping to formulas you can't justify.",
    ],
    quiz: [
      {
        q: "A table gives \\(f(0)=4,\\ f(1)=7,\\ f(2)=10,\\ f(3)=13\\). What kind of function is \\(f\\)?",
        choices: ["Linear", "Quadratic", "Exponential", "Neither"],
        answerIndex: 0,
        explanation: "First differences 3, 3, 3 are constant, so f grows by the same absolute amount per unit — linear.",
      },
      {
        q: "For the table \\(g(0)=1, g(1)=3, g(2)=9, g(3)=27\\), which statement best describes the change?",
        choices: ["Constant first differences", "Constant second differences", "Constant ratio between consecutive outputs", "Constant sum of outputs"],
        answerIndex: 2,
        explanation: "Consecutive outputs multiply by 3 each step, so the ratio is constant — a geometric (exponential) pattern.",
      },
      {
        q: "Which of the following is the best description of a function that is \"positive and decreasing\" on an interval?",
        choices: ["The graph is above the x-axis and sloping upward.", "The graph is below the x-axis and sloping downward.", "The graph is above the x-axis and sloping downward.", "The graph crosses the x-axis repeatedly."],
        answerIndex: 2,
        explanation: "Positive means y-values above zero; decreasing means the slope is negative, so the graph slopes downward while staying above the x-axis.",
      },
      {
        q: "A table has first differences 2, 4, 8, 16 for equal x-steps. What is the likely function family?",
        choices: ["Linear", "Quadratic", "Exponential", "Constant"],
        answerIndex: 2,
        explanation: "First differences themselves double, matching a geometric pattern in the change — characteristic of an exponential function.",
      },
    ],
    diagram: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
      ${AXIS}
      <path d="M30 200 Q120 170 200 120 Q280 70 370 50" fill="none" stroke="#c2410c" stroke-width="2.4" />
      <circle cx="70" cy="185" r="3" fill="#c2410c" />
      <circle cx="130" cy="160" r="3" fill="#c2410c" />
      <circle cx="200" cy="120" r="3" fill="#c2410c" />
      <circle cx="270" cy="85" r="3" fill="#c2410c" />
      <text x="90" y="215" font-family="ui-sans-serif" font-size="10" fill="#6b6b6b">\u0394y small</text>
      <text x="255" y="65" font-family="ui-sans-serif" font-size="10" fill="#6b6b6b">\u0394y larger</text>
    </svg>`,
  },

  "1.2": {
    id: "1.2",
    title: "Rates of Change",
    summary:
      "Average rate of change measures how much a function changes per unit of input across an interval — the precalc version of a derivative.",
    lesson:
      "The average rate of change of \\(f\\) on \\([a, b]\\) is \\(\\dfrac{f(b) - f(a)}{b - a}\\). Geometrically this is the slope of the secant line that joins the two points on the graph. As \\(b\\) gets closer to \\(a\\), the secant tilts to approach the tangent, previewing the derivative you'll meet in Calc AB.\n\nWhy this matters: the CED hammers you on interpreting rates in context. \"The function is increasing at an average rate of 4 units of output per unit of input on the interval from 2 to 5\" is the kind of sentence you'll write on the FRQ. Always name the units.\n\nRates of change also distinguish function families. Linear functions have constant average rates of change (the slope); exponential functions have constant percent change, not constant absolute change; and quadratic functions have linear first differences, so the average rate of change itself increases linearly with the interval midpoint.",
    keyIdeas: [
      "Average rate of change on \\([a,b]\\) is the secant slope \\(\\frac{f(b)-f(a)}{b-a}\\).",
      "Linear: constant average rate of change.",
      "Exponential: constant ratio, i.e. constant percent change.",
      "Quadratic: average rates of change grow linearly as you slide the interval right.",
    ],
    workedExample: {
      prompt:
        "For \\(f(x) = 2x^2 - 3\\), find the average rate of change on \\([1, 4]\\).",
      solution:
        "\\(f(4) = 2(16)-3 = 29\\). \\(f(1) = 2-3 = -1\\). Average rate = \\(\\frac{29 - (-1)}{4-1} = \\frac{30}{3} = 10\\). So \\(f\\) increases by about 10 units of output per unit of input across that window.",
    },
    commonMistakes: [
      "Dropping the sign of \\(f(a)\\) when subtracting — always use parentheses.",
      "Calling it \"slope\" without saying \"of the secant line,\" which graders read as sloppy.",
      "Forgetting that for non-linear functions the rate depends on which interval you pick.",
    ],
    quiz: [
      {
        q: "What is the average rate of change of \\(f(x) = x^2 + 1\\) on the interval \\([2, 5]\\)?",
        choices: ["3", "7", "9", "27"],
        answerIndex: 1,
        explanation: "\\(f(5)=26, f(2)=5\\); \\((26-5)/(5-2) = 21/3 = 7\\).",
      },
      {
        q: "Which function family has a constant average rate of change on every interval?",
        choices: ["Linear", "Quadratic", "Exponential", "Logarithmic"],
        answerIndex: 0,
        explanation: "Only linear functions have a constant slope everywhere; every secant line has the same slope m.",
      },
      {
        q: "The average rate of change of a function on \\([a, b]\\) is geometrically which of the following?",
        choices: ["The tangent line slope at \\(x = a\\).", "The slope of the secant line through \\((a, f(a))\\) and \\((b, f(b))\\).", "The average of \\(f(a)\\) and \\(f(b)\\).", "The y-intercept of the function."],
        answerIndex: 1,
        explanation: "By definition, average rate of change on [a,b] is the secant slope between the two endpoints.",
      },
      {
        q: "For \\(f(x) = 3 - 2x\\), the average rate of change on \\([0, 10]\\) is:",
        choices: ["\\(-2\\)", "\\(-20\\)", "\\(3\\)", "\\(2\\)"],
        answerIndex: 0,
        explanation: "f is linear with slope \\(-2\\), so its average rate of change on any interval equals the slope, \\(-2\\).",
      },
    ],
  },

  "1.3": {
    id: "1.3",
    title: "Rates of Change in Linear and Quadratic Functions",
    summary:
      "Linear functions have constant slope; quadratic functions have constant second differences. That's what lets you classify a table in three rows of subtraction.",
    lesson:
      "Linear functions \\(f(x) = mx + b\\) have \\(m\\) as the slope — the one and only rate of change, period. Because the rate never changes, any secant line on the graph has the same slope \\(m\\). This makes linear models the simplest but also the least expressive: no curvature, no acceleration.\n\nQuadratic functions \\(f(x) = ax^2 + bx + c\\) behave differently: as \\(x\\) moves right by one unit, the second differences of \\(f\\) stay constant and equal to \\(2a\\). The first differences (i.e. the discrete rate of change) are themselves linear in \\(x\\). That's why quadratics feel like \"accelerating\" — their rate of change grows at a steady clip.\n\nBecause the CED emphasizes multiple representations, know the three lenses: (1) algebraically, compute differences; (2) graphically, look at whether the curve is straight or bowl-shaped; (3) in context, ask whether the rate stays flat or changes predictably.",
    keyIdeas: [
      "Linear: \\(\\Delta y / \\Delta x = m\\) everywhere.",
      "Quadratic: first differences are linear, second differences are constant \\(= 2a\\).",
      "Bowl-shaped graphs signal quadratic behavior; straight lines signal linear.",
      "Classifying a table is three subtraction rows, no more.",
    ],
    workedExample: {
      prompt:
        "Given \\(g(0)=1,\\ g(1)=2,\\ g(2)=5,\\ g(3)=10\\), classify \\(g\\) and write its formula.",
      solution:
        "First differences: \\(1, 3, 5\\). Second differences: \\(2, 2\\) — constant, so quadratic with leading coefficient \\(a = 2/2 = 1\\). Try \\(g(x) = x^2 + bx + c\\). From \\(g(0) = 1\\) we get \\(c = 1\\). From \\(g(1) = 2\\) we get \\(1 + b + 1 = 2 \\Rightarrow b = 0\\). So \\(g(x) = x^2 + 1\\). Check: \\(g(3) = 10\\). \u2713",
    },
    commonMistakes: [
      "Computing second differences on non-uniform x-steps.",
      "Forgetting \\(2a\\) (not \\(a\\)) is the constant second difference.",
      "Stopping at \"quadratic\" without pinning down \\(a, b, c\\).",
    ],
    quiz: [
      {
        q: "A quadratic \\(f(x) = ax^2 + bx + c\\) has constant second differences equal to 6 for unit x-steps. What is \\(a\\)?",
        choices: ["6", "3", "2", "1"],
        answerIndex: 1,
        explanation: "Constant second difference for unit steps equals \\(2a\\), so \\(2a = 6\\) gives \\(a = 3\\).",
      },
      {
        q: "A table gives \\(h(0)=2, h(1)=5, h(2)=10, h(3)=17\\). Classify \\(h\\).",
        choices: ["Linear", "Quadratic", "Exponential", "Neither"],
        answerIndex: 1,
        explanation: "First differences are 3, 5, 7 (not constant) and second differences are 2, 2 (constant), so h is quadratic.",
      },
      {
        q: "Which behavior describes how the first differences of a quadratic function change over equal x-steps?",
        choices: ["They are constant.", "They grow linearly.", "They grow exponentially.", "They oscillate."],
        answerIndex: 1,
        explanation: "A quadratic has constant second differences, which means the first differences form an arithmetic (linear) sequence.",
      },
      {
        q: "Given a linear function with slope 4, what is the average rate of change on the interval \\([7, 100]\\)?",
        choices: ["4", "93", "372", "Cannot be determined"],
        answerIndex: 0,
        explanation: "Linear functions have constant slope, so the average rate of change equals the slope on every interval.",
      },
    ],
  },

  "1.4": {
    id: "1.4",
    title: "Polynomial Functions and Rates of Change",
    summary:
      "A degree-\\(n\\) polynomial has constant \\(n\\)-th differences. That single fact lets you identify degree from a table in seconds.",
    lesson:
      "A polynomial of degree \\(n\\) is \\(p(x) = a_n x^n + \\dots + a_0\\). Taking differences successively, the \\(n\\)-th differences become constant and equal to \\(n! \\cdot a_n\\) (for integer-step tables). Higher-degree polynomials are just the generalization of linear and quadratic patterns: degree 3 has constant third differences, degree 4 has constant fourth differences, and so on.\n\nThis is extremely useful. If a table has non-constant first, second, and third differences but constant fourth differences, you know it's a degree-4 polynomial before you write a single variable. You also know the leading coefficient: divide the constant fourth difference by \\(4! = 24\\).\n\nPolynomials share a consistent geometric behavior. The number of real turning points (local maxes or mins) is at most \\(n - 1\\), and the graph eventually runs off to \\(\\pm\\infty\\) according to the degree and leading sign.",
    keyIdeas: [
      "Degree \\(n\\) \\(\\Leftrightarrow\\) constant \\(n\\)-th differences.",
      "Constant \\(n\\)-th difference equals \\(n!\\,a_n\\) (for integer-step tables).",
      "Up to \\(n-1\\) local extrema on a degree-\\(n\\) polynomial.",
      "Leading term dictates end behavior entirely.",
    ],
    workedExample: {
      prompt:
        "A table has first differences \\(2, 9, 28, 65\\) for integer x-steps. Find the polynomial degree and the leading coefficient.",
      solution:
        "Second differences: \\(7, 19, 37\\). Third differences: \\(12, 18\\). Fourth differences: \\(6, 6\\) — constant. So the polynomial has degree 4. Leading coefficient \\(= 6 / 4! = 6/24 = 0.25\\).",
    },
    commonMistakes: [
      "Forgetting the factor of \\(n!\\) when backing out the leading coefficient.",
      "Using non-integer step sizes without rescaling the formula.",
      "Claiming \"no turning points\" when you only checked a narrow window.",
    ],
    quiz: [
      {
        q: "A table (integer x-steps) has constant third differences equal to 12. What is the degree and leading coefficient?",
        choices: ["Degree 3, \\(a_3 = 12\\)", "Degree 3, \\(a_3 = 2\\)", "Degree 4, \\(a_4 = 2\\)", "Degree 3, \\(a_3 = 4\\)"],
        answerIndex: 1,
        explanation: "Degree = 3 because third differences are constant; leading coefficient is constant difference divided by 3! = 12/6 = 2.",
      },
      {
        q: "The maximum number of turning points of a degree-7 polynomial is:",
        choices: ["6", "7", "8", "Infinitely many"],
        answerIndex: 0,
        explanation: "A degree-n polynomial has at most n−1 turning points, so 7−1 = 6.",
      },
      {
        q: "Which statement is true about a degree-5 polynomial with a positive leading coefficient?",
        choices: ["Both tails go to \\(+\\infty\\).", "Both tails go to \\(-\\infty\\).", "Left tail \\(\\to -\\infty\\), right tail \\(\\to +\\infty\\).", "The function is bounded."],
        answerIndex: 2,
        explanation: "Odd degree with positive leading coefficient gives tails that disagree: left down, right up.",
      },
      {
        q: "A table has differences that only become constant at the 4th level, equal to 48. The leading coefficient of the degree-4 polynomial is:",
        choices: ["48", "12", "2", "24"],
        answerIndex: 2,
        explanation: "Leading coefficient = (constant nth difference)/n! = 48/24 = 2.",
      },
    ],
  },

  "1.5": {
    id: "1.5",
    title: "Polynomial Functions and Complex Zeros",
    summary:
      "Every degree-\\(n\\) polynomial with real coefficients has exactly \\(n\\) zeros counted with multiplicity over the complex numbers, and any complex zeros come in conjugate pairs.",
    lesson:
      "The Fundamental Theorem of Algebra says a degree-\\(n\\) polynomial factors into exactly \\(n\\) linear factors over \\(\\mathbb{C}\\). Real polynomials inherit a bonus constraint: if \\(a + bi\\) is a root, so is its conjugate \\(a - bi\\). That forces any non-real zeros to travel in pairs, which is why a real cubic must have at least one real root.\n\nMultiplicity matters for graph behavior. A zero of odd multiplicity means the graph crosses the x-axis there; a zero of even multiplicity means the graph touches and bounces back. Write these out explicitly when you graph — exam graders reward you for calling out \\((x - 2)^2\\) as a bounce versus \\((x - 2)^3\\) as a cross with an inflection point.\n\nThe connection between factor form, expanded form, and graph is the whole point of this topic: given any one of the three representations, you should be able to reconstruct the others.",
    keyIdeas: [
      "Degree \\(n\\) gives exactly \\(n\\) complex zeros (with multiplicity).",
      "Real coefficients \\(\\Rightarrow\\) non-real zeros come in conjugate pairs.",
      "Odd multiplicity: graph crosses. Even multiplicity: graph bounces.",
      "Factor form and zeros are the same information.",
    ],
    workedExample: {
      prompt:
        "Find a degree-4 real polynomial with zeros at \\(x = 1, -2, 3i\\).",
      solution:
        "Since 3i is a non-real zero and coefficients must be real, \\(-3i\\) is also a zero. The polynomial is \\((x-1)(x+2)(x-3i)(x+3i) = (x^2+x-2)(x^2+9) = x^4 + x^3 + 7x^2 + 9x - 18\\).",
    },
    commonMistakes: [
      "Forgetting to include the conjugate when given a single complex root.",
      "Confusing multiplicity with degree — a double root still counts as one distinct zero.",
      "Labeling a \"bounce\" as \"no root\" — multiplicity 2 still counts as two zeros.",
    ],
    quiz: [
      {
        q: "A real polynomial has \\(2 + 3i\\) as a zero. Which of the following must also be a zero?",
        choices: ["\\(-2 - 3i\\)", "\\(2 - 3i\\)", "\\(-2 + 3i\\)", "\\(3 + 2i\\)"],
        answerIndex: 1,
        explanation: "Real-coefficient polynomials force complex zeros to appear in conjugate pairs, so the conjugate \\(2-3i\\) must also be a zero.",
      },
      {
        q: "Near \\(x = 4\\), the graph of \\(p(x) = (x-4)^2(x+1)\\) will:",
        choices: ["Cross the x-axis.", "Touch the x-axis and bounce back.", "Have a vertical asymptote.", "Not interact with the x-axis."],
        answerIndex: 1,
        explanation: "Multiplicity 2 at x=4 is even, so the graph touches and bounces; it does not cross.",
      },
      {
        q: "How many complex zeros (counting multiplicity) does a degree-6 polynomial have?",
        choices: ["At most 6", "Exactly 6", "Exactly 3", "At least 1, at most 6"],
        answerIndex: 1,
        explanation: "The Fundamental Theorem of Algebra guarantees exactly n complex zeros counted with multiplicity for a degree-n polynomial.",
      },
      {
        q: "Which degree-3 real polynomial has zeros at \\(x = 2\\) and \\(x = i\\)?",
        choices: ["\\((x-2)(x-i)\\)", "\\((x-2)(x-i)(x+i)\\)", "\\((x-2)(x^2+i)\\)", "\\((x-2)^2(x-i)\\)"],
        answerIndex: 1,
        explanation: "Real coefficients require the conjugate \\(-i\\) as a zero too, giving the product (x−2)(x−i)(x+i) = (x−2)(x²+1).",
      },
    ],
  },

  "1.6": {
    id: "1.6",
    title: "Polynomial Functions and End Behavior",
    summary:
      "End behavior depends only on the degree and sign of the leading coefficient — four possibilities total.",
    lesson:
      "For large \\(|x|\\), the leading term \\(a_n x^n\\) dominates and every other term becomes negligible. So the graph heads off in one of four ways based on two binary choices: even versus odd degree, and positive versus negative leading coefficient.\n\nEven degree, positive leading: both tails go up (like \\(x^2\\)). Even degree, negative leading: both tails go down (like \\(-x^2\\)). Odd degree, positive leading: left tail down, right tail up (like \\(x^3\\)). Odd degree, negative leading: left tail up, right tail down (like \\(-x^3\\)).\n\nIn limit notation (preview for Calc): \\(\\lim_{x \\to \\infty} p(x)\\) and \\(\\lim_{x \\to -\\infty} p(x)\\) are \\(\\pm\\infty\\) according to the rules above. End behavior is what lets you sketch a rough graph in 30 seconds: mark the zeros, apply the multiplicity rules, then anchor the tails.",
    keyIdeas: [
      "Only the leading term determines end behavior.",
      "Even degree: tails match. Odd degree: tails disagree.",
      "Positive leading: right tail goes up. Negative leading: right tail goes down.",
      "Use end behavior to sanity-check any polynomial sketch.",
    ],
    workedExample: {
      prompt: "Describe the end behavior of \\(p(x) = -2x^5 + 3x^2 - 7\\).",
      solution:
        "Leading term \\(-2x^5\\) has odd degree and negative leading coefficient. So as \\(x \\to -\\infty\\), \\(p(x) \\to +\\infty\\); as \\(x \\to +\\infty\\), \\(p(x) \\to -\\infty\\).",
    },
    commonMistakes: [
      "Looking at the constant term instead of the leading term.",
      "Assuming odd-degree graphs have both tails the same way (they don't).",
      "Forgetting the negative leading flips the whole picture.",
    ],
    quiz: [
      {
        q: "What is the end behavior of \\(p(x) = 3x^4 - 5x^2 + 1\\)?",
        choices: ["Both tails \\(\\to -\\infty\\)", "Both tails \\(\\to +\\infty\\)", "Left \\(\\to -\\infty\\), right \\(\\to +\\infty\\)", "Left \\(\\to +\\infty\\), right \\(\\to -\\infty\\)"],
        answerIndex: 1,
        explanation: "Even degree with positive leading coefficient gives matching tails, both to +∞.",
      },
      {
        q: "For \\(p(x) = -x^3 + 2x^2 + 5\\), as \\(x \\to +\\infty\\), \\(p(x) \\to\\):",
        choices: ["\\(+\\infty\\)", "\\(-\\infty\\)", "0", "5"],
        answerIndex: 1,
        explanation: "The leading term \\(-x^3\\) dominates; for large positive x, it goes to \\(-\\infty\\).",
      },
      {
        q: "A polynomial has both tails going up. Which of the following could be its leading term?",
        choices: ["\\(-2x^4\\)", "\\(3x^5\\)", "\\(4x^6\\)", "\\(-x^3\\)"],
        answerIndex: 2,
        explanation: "Both tails up means even degree with positive leading coefficient; only \\(4x^6\\) matches.",
      },
      {
        q: "Which feature of a polynomial determines end behavior?",
        choices: ["The constant term", "The number of roots", "The leading term (degree and sign)", "The y-intercept"],
        answerIndex: 2,
        explanation: "Only the leading term matters for large |x| because it dominates all other terms.",
      },
    ],
    diagram: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
      ${AXIS}
      <path d="M25 30 Q100 30 120 80 Q160 180 200 125 Q240 70 290 180 Q330 210 375 210" fill="none" stroke="#c2410c" stroke-width="2.4" />
      <text x="28" y="22" font-family="ui-sans-serif" font-size="10" fill="#6b6b6b">y \u2192 \u221e</text>
      <text x="320" y="230" font-family="ui-sans-serif" font-size="10" fill="#6b6b6b">y \u2192 \u2212\u221e</text>
      <text x="40" y="55" font-family="ui-sans-serif" font-size="10" fill="#c2410c">\u2212 leading, odd degree</text>
    </svg>`,
  },

  "1.7": {
    id: "1.7",
    title: "Rational Functions and End Behavior",
    summary:
      "For a rational function \\(r(x) = p(x)/q(x)\\), end behavior is determined by the ratio of the leading terms alone.",
    lesson:
      "Suppose \\(r(x) = p(x)/q(x)\\) where \\(p\\) has degree \\(m\\) and \\(q\\) has degree \\(n\\). End behavior follows three cases:\n\n1. \\(m < n\\): horizontal asymptote \\(y = 0\\). Both tails approach the x-axis.\n2. \\(m = n\\): horizontal asymptote \\(y = a_m/b_n\\) — the ratio of leading coefficients.\n3. \\(m > n\\): no horizontal asymptote; tails blow up. If \\(m = n+1\\), long division produces a slant asymptote of the form \\(y = ax + b\\).\n\nThe reasoning is simple: for large \\(|x|\\), leading terms dominate, so \\(r(x) \\approx a_m x^m / (b_n x^n) = (a_m/b_n)\\,x^{m-n}\\). The sign and degree of that simplified expression tell you everything. On the FRQ, always compare degrees first, then write a sentence describing the asymptote with units if the problem is contextual.",
    keyIdeas: [
      "Compare degrees \\(m\\) (top) and \\(n\\) (bottom).",
      "\\(m < n\\): horizontal asymptote \\(y = 0\\).",
      "\\(m = n\\): horizontal asymptote \\(y = a_m/b_n\\).",
      "\\(m > n\\): blow-up tails; slant asymptote if \\(m - n = 1\\).",
    ],
    workedExample: {
      prompt:
        "Find the horizontal asymptote of \\(r(x) = \\frac{3x^2 - 5x + 1}{2x^2 + 7}\\).",
      solution:
        "Degrees equal at 2, so horizontal asymptote is \\(y = 3/2\\). As \\(|x| \\to \\infty\\), \\(r(x) \\to 1.5\\).",
    },
    commonMistakes: [
      "Reading horizontal asymptotes off the constant terms instead of the leading coefficients.",
      "Forgetting to cancel common factors before computing end behavior.",
      "Missing that slant asymptotes exist whenever \\(m = n + 1\\).",
    ],
    quiz: [
      {
        q: "Find the horizontal asymptote of \\(r(x) = \\frac{4x^3 + 1}{2x^3 - 5}\\).",
        choices: ["\\(y = 0\\)", "\\(y = 2\\)", "\\(y = -5\\)", "No horizontal asymptote"],
        answerIndex: 1,
        explanation: "Equal degrees: horizontal asymptote = ratio of leading coefficients = 4/2 = 2.",
      },
      {
        q: "Which rational function has horizontal asymptote \\(y = 0\\)?",
        choices: ["\\(\\frac{2x^2}{x^2+1}\\)", "\\(\\frac{x+1}{x-3}\\)", "\\(\\frac{x}{x^2+1}\\)", "\\(\\frac{x^3}{x+2}\\)"],
        answerIndex: 2,
        explanation: "Numerator degree (1) less than denominator degree (2), so horizontal asymptote is y = 0.",
      },
      {
        q: "The function \\(r(x) = \\frac{x^2 + 1}{x - 2}\\) has what kind of asymptote?",
        choices: ["Horizontal asymptote at \\(y = 1\\)", "Horizontal asymptote at \\(y = 0\\)", "Slant asymptote", "No asymptote of any kind"],
        answerIndex: 2,
        explanation: "Numerator degree exceeds denominator by exactly 1, so there is a slant (oblique) asymptote.",
      },
      {
        q: "For very large |x|, \\(r(x) = \\frac{7x^5 - 2}{3x^2 + 1}\\) behaves like which expression?",
        choices: ["A constant \\(7/3\\)", "The cubic \\(\\tfrac{7}{3}x^3\\)", "A slant line", "Zero"],
        answerIndex: 1,
        explanation: "Leading-term ratio gives \\(7x^5/(3x^2) = (7/3)x^3\\), so r grows like a cubic with no horizontal asymptote.",
      },
    ],
  },

  "1.8": {
    id: "1.8",
    title: "Rational Functions and Zeros",
    summary:
      "Rational zeros live exactly where the numerator vanishes — provided the denominator doesn't vanish there too.",
    lesson:
      "For \\(r(x) = p(x)/q(x)\\), the real zeros of \\(r\\) are the real roots of \\(p(x) = 0\\) that are not also roots of \\(q(x)\\). If a value simultaneously zeros both, that's a hole (topic 1.10), not a zero.\n\nAlgorithm: factor \\(p\\) and \\(q\\), cancel shared factors (holes), then set \\(p = 0\\) on the simplified numerator. Students often over-count zeros; the graph only touches the x-axis at the simplified zeros. Removed factors leave holes, not intercepts. Zero multiplicity from \\(p\\) carries over to the graph — odd multiplicity means sign change, even means touch-and-rebound, same as for polynomials.",
    keyIdeas: [
      "Zeros of \\(r\\) = roots of \\(p\\) after cancelling shared factors with \\(q\\).",
      "A shared root becomes a hole, not a zero.",
      "Multiplicity rules carry over from polynomials.",
      "Always factor and simplify before solving.",
    ],
    workedExample: {
      prompt:
        "Find all real zeros of \\(r(x) = \\frac{x^2 - 4}{x^2 - 5x + 6}\\).",
      solution:
        "Factor: \\(r(x) = \\frac{(x-2)(x+2)}{(x-2)(x-3)}\\). Cancel \\((x-2)\\) as a hole at \\(x = 2\\). Simplified \\(\\frac{x+2}{x-3}\\) has zero at \\(x = -2\\). Only real zero: \\(x = -2\\); \\(x = 2\\) is a hole.",
    },
    commonMistakes: [
      "Listing \\(x = 2\\) as a zero when it's a hole.",
      "Forgetting to cancel before reading off the zero.",
      "Treating the denominator's roots as zeros — those are asymptotes or holes.",
    ],
    quiz: [
      {
        q: "What are the real zeros of \\(r(x) = \\frac{(x-1)(x+3)}{(x-1)(x-5)}\\)?",
        choices: ["\\(x = 1\\) and \\(x = -3\\)", "\\(x = -3\\) only", "\\(x = 1\\) only", "\\(x = 5\\)"],
        answerIndex: 1,
        explanation: "Cancel the common factor (x−1) which becomes a hole; simplified zeros come only from (x+3)=0, giving x = −3.",
      },
      {
        q: "A rational function \\(r(x) = p(x)/q(x)\\) has a value \\(c\\) where \\(p(c) = 0\\) and \\(q(c) = 0\\). This is:",
        choices: ["A zero of \\(r\\)", "A vertical asymptote", "A potential hole, depending on multiplicities", "Always a y-intercept"],
        answerIndex: 2,
        explanation: "When both numerator and denominator vanish, cancel the shared factor; the result is a hole (not a zero) if cancellation fully removes the denominator issue.",
      },
      {
        q: "For \\(r(x) = \\frac{x^2 - 9}{x + 3}\\), the real zeros are:",
        choices: ["\\(x = 3\\) and \\(x = -3\\)", "\\(x = 3\\) only", "\\(x = -3\\) only", "No real zeros"],
        answerIndex: 1,
        explanation: "Factor: \\((x-3)(x+3)/(x+3)\\); cancel gives \\(x - 3\\) with hole at −3. Only zero is x = 3.",
      },
      {
        q: "The zero of a rational function occurs where:",
        choices: ["The denominator equals zero.", "Both numerator and denominator equal zero.", "The simplified numerator equals zero.", "The denominator equals 1."],
        answerIndex: 2,
        explanation: "Zeros come from the numerator (after cancelling common factors with the denominator). Denominator zeros give asymptotes or holes.",
      },
    ],
  },

  "1.9": {
    id: "1.9",
    title: "Rational Functions and Vertical Asymptotes",
    summary:
      "A vertical asymptote lives where the denominator vanishes but the numerator does not — the function blows up to \\(\\pm\\infty\\) there.",
    lesson:
      "Given \\(r(x) = p(x)/q(x)\\) in simplified form (shared factors cancelled), a vertical asymptote appears at every \\(x = a\\) where \\(q(a) = 0\\). The sign of \\(r(x)\\) on either side depends on the sign of \\(p\\) and the sign of \\(q\\) as you approach.\n\nSketching tip: pick a test value just left and just right of the asymptote, plug in, and record whether \\(r\\) is headed to \\(+\\infty\\) or \\(-\\infty\\). On AP FRQs you're asked to describe one-sided limits, so write them: \\(\\lim_{x \\to a^-} r(x) = -\\infty\\) and \\(\\lim_{x \\to a^+} r(x) = +\\infty\\), or whatever the case is. Multiplicity of the root in \\(q\\) controls whether both sides go the same direction (even multiplicity) or opposite directions (odd multiplicity).",
    keyIdeas: [
      "Vertical asymptote \\(\\Leftrightarrow\\) denominator zero that survives cancellation.",
      "Test values on each side to determine \\(\\pm\\infty\\) behavior.",
      "Odd multiplicity: opposite-sign tails. Even multiplicity: same-sign tails.",
      "State one-sided limits explicitly on FRQs.",
    ],
    workedExample: {
      prompt:
        "Describe the behavior of \\(r(x) = \\frac{1}{(x-2)^2}\\) near \\(x = 2\\).",
      solution:
        "Denominator has a double root at 2; numerator is positive. So \\(\\lim_{x \\to 2^-} r(x) = \\lim_{x \\to 2^+} r(x) = +\\infty\\). Vertical asymptote with matching tails because the multiplicity is even.",
    },
    commonMistakes: [
      "Reporting a vertical asymptote where there's actually a hole.",
      "Assuming both sides go the same direction without testing.",
      "Dropping the one-sided notation when the problem asks for limits.",
    ],
    quiz: [
      {
        q: "Where are the vertical asymptotes of \\(r(x) = \\frac{x+1}{(x-3)(x+2)}\\)?",
        choices: ["\\(x = -1\\) only", "\\(x = 3\\) and \\(x = -2\\)", "\\(x = 3, -2, -1\\)", "There are none."],
        answerIndex: 1,
        explanation: "Vertical asymptotes at denominator zeros that don't cancel. Numerator doesn't share factors, so asymptotes at x = 3 and x = −2.",
      },
      {
        q: "Near a vertical asymptote where the denominator has odd multiplicity, the function's two side-limits:",
        choices: ["Agree in sign.", "Disagree in sign.", "Are always both \\(+\\infty\\).", "Are always finite."],
        answerIndex: 1,
        explanation: "Odd multiplicity causes a sign change in the denominator as x crosses the asymptote, flipping the direction of the blow-up.",
      },
      {
        q: "Consider \\(r(x) = \\frac{3}{(x+1)^2}\\). Near \\(x = -1\\):",
        choices: ["\\(r(x) \\to +\\infty\\) from both sides.", "\\(r(x) \\to -\\infty\\) from both sides.", "Left and right limits disagree.", "There is a hole."],
        answerIndex: 0,
        explanation: "The denominator is positive on both sides (even multiplicity squared), and numerator is 3 > 0, so r → +∞ from both sides.",
      },
      {
        q: "Which expression has a vertical asymptote at \\(x = 4\\) but NOT a hole there?",
        choices: ["\\(\\frac{x - 4}{x - 4}\\)", "\\(\\frac{x - 4}{(x - 4)(x + 1)}\\)", "\\(\\frac{x + 1}{x - 4}\\)", "\\(\\frac{(x - 4)^2}{x - 4}\\)"],
        answerIndex: 2,
        explanation: "For a true vertical asymptote at 4, x − 4 must appear in the denominator and NOT cancel from the numerator. Only the third option satisfies this.",
      },
    ],
  },

  "1.10": {
    id: "1.10",
    title: "Rational Functions and Holes",
    summary:
      "A hole is a removable discontinuity — it happens when a factor cancels from numerator and denominator.",
    lesson:
      "If \\(p\\) and \\(q\\) share a common factor \\((x - c)\\), the function \\(r(x) = p(x)/q(x)\\) is undefined at \\(x = c\\) but the \"gap\" is removable: the simplified function has a perfectly fine value there, so the graph looks like a normal curve with a single point missing.\n\nProcedure: factor numerator and denominator, cancel shared factors, note the cancelled value as a hole. The height of the hole is the simplified function evaluated at \\(c\\). Write it as the ordered pair \\((c, r_\\text{simplified}(c))\\) — not just \"x = c.\" In limit notation: \\(\\lim_{x \\to c} r(x)\\) exists, but \\(r(c)\\) itself is undefined. That's the formal distinction between a hole and an asymptote.",
    keyIdeas: [
      "A hole comes from a common factor cancelling between top and bottom.",
      "The hole's height = simplified function at the cancelled x-value.",
      "Limit exists at a hole; the function value doesn't.",
      "Record both coordinates when you call out a hole.",
    ],
    workedExample: {
      prompt:
        "Locate any holes in \\(r(x) = \\frac{x^2 - 9}{x - 3}\\).",
      solution:
        "Factor: \\(r(x) = \\frac{(x-3)(x+3)}{x-3}\\). Cancel \\((x-3)\\), hole at \\(x = 3\\). Simplified \\(x + 3\\) at \\(x = 3\\) is 6. Hole sits at \\((3, 6)\\).",
    },
    commonMistakes: [
      "Reporting just the x-value of the hole instead of \\((c, r(c))\\).",
      "Confusing the hole's location with a vertical asymptote.",
      "Forgetting that the limit at a hole exists and equals the simplified value.",
    ],
    quiz: [
      {
        q: "Find the coordinates of the hole in \\(r(x) = \\frac{x^2 - 4}{x - 2}\\).",
        choices: ["\\((2, 0)\\)", "\\((2, 4)\\)", "\\((-2, 0)\\)", "\\((2, 2)\\)"],
        answerIndex: 1,
        explanation: "Factor: (x−2)(x+2)/(x−2); cancel gives x+2. At x = 2, simplified function = 4, so hole at (2, 4).",
      },
      {
        q: "The difference between a hole and a vertical asymptote is that at a hole:",
        choices: ["The function value is undefined but the limit exists.", "The function approaches infinity.", "Both the function and limit are undefined.", "The graph crosses the x-axis."],
        answerIndex: 0,
        explanation: "At a hole, the simplified function has a normal value (the limit), but the original function is undefined because of the cancelled factor.",
      },
      {
        q: "\\(r(x) = \\frac{(x-1)(x+5)}{(x-1)}\\) has what feature at \\(x = 1\\)?",
        choices: ["Vertical asymptote", "x-intercept", "Hole at \\((1, 6)\\)", "Maximum value"],
        answerIndex: 2,
        explanation: "(x−1) cancels, so x = 1 is a hole; simplified function x+5 at x=1 equals 6, so hole is at (1, 6).",
      },
      {
        q: "Which of the following indicates a hole rather than a zero?",
        choices: ["Only the numerator vanishes at \\(x=c\\).", "The numerator and denominator both vanish at \\(x=c\\), and the factor cancels.", "Only the denominator vanishes at \\(x=c\\).", "Neither vanishes at \\(x=c\\)."],
        answerIndex: 1,
        explanation: "A hole occurs only when numerator and denominator share a factor that cancels — otherwise it is a zero or asymptote.",
      },
    ],
  },

  "1.11": {
    id: "1.11",
    title: "Equivalent Representations of Polynomial and Rational Expressions",
    summary:
      "Factored, expanded, and rewritten forms all describe the same function — use whichever form makes the feature you care about easiest to read.",
    lesson:
      "Polynomials and rationals can usually be written in several equivalent forms: factored, standard (expanded), and for rationals, long-divided form \\(\\text{quotient} + \\text{remainder}/\\text{divisor}\\). Each form highlights something different.\n\nFactored form shows zeros and multiplicities at a glance. Standard form makes end behavior and the constant term easy. For rationals, long division exposes the slant asymptote: if \\(r(x) = q(x) + s(x)/d(x)\\), then \\(y = q(x)\\) is the slant asymptote whenever the remainder fraction shrinks to zero for large \\(|x|\\).\n\nOn AP problems, pick the form that makes the question fast. If the problem asks for zeros, factor. End behavior? Leading terms. Asymptotes on a rational? Long divide.",
    keyIdeas: [
      "Factored form \\(\\to\\) zeros + multiplicity.",
      "Standard form \\(\\to\\) end behavior + constant term.",
      "Long-divided form \\(\\to\\) slant asymptote.",
      "Pick the form that makes the question easy.",
    ],
    workedExample: {
      prompt:
        "Rewrite \\(r(x) = \\frac{x^2 + 3x + 5}{x + 1}\\) to expose the slant asymptote.",
      solution:
        "Long divide \\(x^2 + 3x + 5\\) by \\(x + 1\\): quotient \\(x + 2\\), remainder \\(3\\). So \\(r(x) = (x + 2) + \\frac{3}{x+1}\\) and the slant asymptote is \\(y = x + 2\\).",
    },
    commonMistakes: [
      "Trying to read a slant asymptote off factored form (you can't).",
      "Losing the remainder when doing long division.",
      "Switching forms mid-problem and losing track of which features stay invariant.",
    ],
    quiz: [
      {
        q: "To quickly identify the zeros of a polynomial, which form is most useful?",
        choices: ["Standard (expanded) form", "Factored form", "Long-divided form", "Decimal form"],
        answerIndex: 1,
        explanation: "Zeros are immediately visible as the roots of each linear factor in factored form.",
      },
      {
        q: "Rewrite \\(r(x) = \\frac{x^2 + 5}{x - 1}\\) to read off the slant asymptote.",
        choices: ["\\(y = x\\)", "\\(y = x + 1\\)", "\\(y = x - 1\\)", "\\(y = x + 5\\)"],
        answerIndex: 1,
        explanation: "Long division: \\(x^2 + 5 = (x-1)(x+1) + 6\\), so \\(r(x) = x + 1 + 6/(x-1)\\); slant asymptote is y = x + 1.",
      },
      {
        q: "Which representation best shows end behavior of a polynomial?",
        choices: ["Factored form (zeros)", "Standard form (leading term)", "Tabular form", "Graph only"],
        answerIndex: 1,
        explanation: "Standard form makes the leading term explicit; leading term determines end behavior.",
      },
      {
        q: "Two equivalent forms of the same polynomial will always share:",
        choices: ["The same coefficients.", "The same zeros and end behavior.", "Different y-intercepts.", "Different degrees."],
        answerIndex: 1,
        explanation: "Equivalent representations describe the exact same function, so all structural features (zeros, end behavior, intercepts) match.",
      },
    ],
  },

  "1.12": {
    id: "1.12",
    title: "Transformations of Functions",
    summary:
      "Shifts, stretches, and reflections compose predictably — the CED expects fluency with the standard \\(a f(b(x - h)) + k\\) form.",
    lesson:
      "Given a parent function \\(f(x)\\), the transformed function \\(g(x) = a f(b(x - h)) + k\\) acts on the graph in four coordinated ways:\n\n- \\(h\\) is a horizontal shift by \\(h\\) (sign flips — \\(x - h\\) shifts right).\n- \\(k\\) is a vertical shift by \\(k\\).\n- \\(a\\) is a vertical stretch by \\(|a|\\) with a reflection if \\(a < 0\\).\n- \\(b\\) is a horizontal stretch by \\(1/|b|\\) with a reflection if \\(b < 0\\).\n\nHorizontal operations fight you because they're inside the function, so subtract then multiply inside the argument. Try a test point like \\((0, f(0))\\) and track where it lands; if your transformed graph doesn't put that point where the formula says, you've mis-ordered. Point-by-point rule: \\((x, y) \\to (x/b + h,\\ a y + k)\\).",
    keyIdeas: [
      "Write everything in the standard form \\(a f(b(x - h)) + k\\).",
      "Horizontal: scale by \\(1/|b|\\), shift by \\(h\\) — sign conventions flip.",
      "Vertical: scale by \\(|a|\\), shift by \\(k\\).",
      "Negative \\(a\\) or \\(b\\): reflect across the x-axis or y-axis respectively.",
    ],
    workedExample: {
      prompt:
        "Describe the transformation that sends \\(f(x) = x^2\\) to \\(g(x) = -3(x - 4)^2 + 1\\).",
      solution:
        "Horizontal shift right 4 (\\(h = 4\\)), vertical stretch by 3 and reflection across x-axis (\\(a = -3\\)), vertical shift up 1 (\\(k = 1\\)). Vertex moves from \\((0,0)\\) to \\((4, 1)\\); parabola opens downward, narrower than parent.",
    },
    commonMistakes: [
      "Shifting left instead of right when \\(h > 0\\).",
      "Applying scale factors before shifts when horizontal operations require the opposite order.",
      "Forgetting that negative \\(a\\) flips the graph vertically.",
    ],
    quiz: [
      {
        q: "Given parent \\(f(x) = x^2\\), the graph of \\(g(x) = (x+3)^2 - 5\\) is:",
        choices: ["Shifted right 3 and down 5", "Shifted left 3 and down 5", "Shifted left 3 and up 5", "Shifted right 3 and up 5"],
        answerIndex: 1,
        explanation: "Inside (x+3) means shift LEFT by 3 (sign flips); outside \\(-5\\) means shift DOWN by 5.",
      },
      {
        q: "The transformation \\(g(x) = -2f(x)\\) does what to the graph of \\(f\\)?",
        choices: ["Reflects across x-axis and stretches vertically by 2.", "Reflects across y-axis and stretches horizontally by 2.", "Just shifts down 2.", "Just stretches horizontally by 1/2."],
        answerIndex: 0,
        explanation: "The coefficient −2 reflects across x-axis (negative sign) and stretches vertically by factor of 2.",
      },
      {
        q: "A point \\((4, 6)\\) on \\(y = f(x)\\) lands where under \\(g(x) = f(x - 2) + 3\\)?",
        choices: ["\\((2, 3)\\)", "\\((6, 9)\\)", "\\((4, 9)\\)", "\\((2, 9)\\)"],
        answerIndex: 1,
        explanation: "Shift right 2 and up 3: (4, 6) → (4+2, 6+3) = (6, 9).",
      },
      {
        q: "Which transformation doubles the horizontal stretch?",
        choices: ["\\(g(x) = f(2x)\\)", "\\(g(x) = f(x/2)\\)", "\\(g(x) = 2f(x)\\)", "\\(g(x) = f(x) + 2\\)"],
        answerIndex: 1,
        explanation: "f(x/2) replaces x with x/2 inside, which stretches the graph horizontally by factor of 2.",
      },
    ],
  },

  "1.13": {
    id: "1.13",
    title: "Function Model Selection and Assumption Articulation",
    summary:
      "Picking the right model isn't just about fitting data — it's about knowing which assumptions you're importing when you choose a family.",
    lesson:
      "On modeling questions, the CED wants two things: pick a reasonable function family, and write down the assumptions that choice commits you to. Linear assumes constant rate of change; good for short time windows or proportionality. Quadratic assumes constant second differences; good for projectile heights. Exponential assumes constant percent change per unit time; good for unchecked population growth or radioactive decay. Logarithmic assumes rapidly diminishing rate of change; good for perceived intensity or diminishing returns.\n\nOn the FRQ, write an explicit sentence: \"I'm using an exponential model because the data doubles every 10 years, which matches a constant percent change assumption.\" Graders award points for the assumption statement, not just the fit.",
    keyIdeas: [
      "Every function family encodes assumptions about how change happens.",
      "Linear: constant absolute change. Exponential: constant percent change.",
      "Quadratic: constant second differences \\(\\to\\) linearly changing rate.",
      "Logarithmic: diminishing returns.",
      "Always state your assumption in words.",
    ],
    workedExample: {
      prompt:
        "A study observes tumor volume shrinks by 15% per week. Which function family fits and why?",
      solution:
        "Exponential decay, because the change each week is a fixed *percentage* of current volume rather than a fixed absolute amount. Model: \\(V(t) = V_0 (0.85)^t\\). Assumption: drug effectiveness doesn't change over time and the tumor would otherwise keep growing unchecked.",
    },
    commonMistakes: [
      "Fitting a model without saying which assumption justifies it.",
      "Picking exponential when the data has constant absolute change (should be linear).",
      "Skipping the sentence that states the assumption — that's where FRQ points live.",
    ],
    quiz: [
      {
        q: "A quantity decreases by a fixed 5 units each year. Which family best models it?",
        choices: ["Linear", "Exponential decay", "Quadratic", "Logarithmic"],
        answerIndex: 0,
        explanation: "Constant absolute change per unit time is the defining property of a linear function.",
      },
      {
        q: "A bank account grows by a fixed 3% per year. The appropriate model is:",
        choices: ["Linear growth", "Exponential growth", "Quadratic growth", "Logarithmic growth"],
        answerIndex: 1,
        explanation: "Constant percent change per unit time is the defining property of exponential functions.",
      },
      {
        q: "Which model assumes diminishing returns — rapid early change that slows over time?",
        choices: ["Linear", "Exponential growth", "Logarithmic", "Constant"],
        answerIndex: 2,
        explanation: "Logarithmic functions grow quickly at first and slow dramatically — the classic diminishing returns shape.",
      },
      {
        q: "When choosing a model family, AP graders reward students for:",
        choices: ["Guessing without justification.", "Explicitly stating the assumption the model encodes.", "Using only regression.", "Always picking exponential."],
        answerIndex: 1,
        explanation: "A full-credit FRQ response names the model family AND states the assumption (constant rate, percent change, etc.) justifying the choice.",
      },
    ],
  },

  "1.14": {
    id: "1.14",
    title: "Function Model Construction and Application",
    summary:
      "Once you've picked a family, nail the parameters from given data and then extract information from the model.",
    lesson:
      "Model construction is a two-step procedure: (1) pick the family (topic 1.13), (2) solve for the parameters using the points or conditions you're given. With two data points you can pin down any one-parameter or two-parameter family like linear or exponential. With three points you can pin down a quadratic.\n\nAfter you have the model, the application half is about extracting answers: evaluate at a new \\(x\\), solve for when \\(f(x)\\) crosses a threshold, or describe long-run behavior. Always check the answer's sign and magnitude against the context. On AP FRQs the question usually chains two steps: build the model, then apply it. Write one sentence of interpretation per computation — numbers without units rarely earn full credit.",
    keyIdeas: [
      "Use as many data points as parameters to pin the model.",
      "Solve algebraically; don't eyeball unless the problem says so.",
      "Always interpret numerical answers in the problem's context.",
      "Check that your answer's sign matches physical constraints.",
    ],
    workedExample: {
      prompt:
        "A bacteria population is 200 at \\(t = 0\\) hours and 450 at \\(t = 3\\). Assuming exponential growth, write \\(P(t)\\) and find when \\(P\\) reaches 1000.",
      solution:
        "Use \\(P(t) = 200 \\cdot r^t\\). Plug in \\(t = 3\\): \\(450 = 200 r^3\\), so \\(r^3 = 2.25\\), \\(r \\approx 1.311\\). Model: \\(P(t) \\approx 200 (1.311)^t\\). Set \\(P(t) = 1000\\): \\(5 = 1.311^t \\Rightarrow t = \\log(5)/\\log(1.311) \\approx 5.94\\) hours.",
    },
    commonMistakes: [
      "Using \\(r\\) as the rate instead of the base \\(1 + r\\).",
      "Forgetting to log both sides when solving for \\(t\\).",
      "Reporting a bare number without units or a sentence interpretation.",
    ],
    quiz: [
      {
        q: "An exponential model is \\(P(t) = 100 \\cdot (1.08)^t\\). What is the annual percent change?",
        choices: ["0.08%", "8%", "108%", "80%"],
        answerIndex: 1,
        explanation: "Base 1.08 means the quantity multiplies by 1.08 each year, a growth of 8% per year.",
      },
      {
        q: "A linear model \\(C(t) = 50 + 3t\\) (dollars, years). Find the total cost at \\(t = 7\\).",
        choices: ["\\$21", "\\$53", "\\$71", "\\$350"],
        answerIndex: 2,
        explanation: "C(7) = 50 + 3(7) = 50 + 21 = 71 dollars.",
      },
      {
        q: "Given two points \\((0, 8)\\) and \\((3, 1)\\) for an exponential model \\(f(t)=ab^t\\), what is the value of \\(a\\)?",
        choices: ["0", "8", "1", "3"],
        answerIndex: 1,
        explanation: "a is the initial value f(0), which is given as 8.",
      },
      {
        q: "If a population triples every 5 years, the model can be written as \\(P(t) = P_0 \\cdot 3^{t/5}\\). What is the equivalent annual growth factor?",
        choices: ["\\(3\\)", "\\(3^{1/5} \\approx 1.246\\)", "\\(15\\)", "\\(5\\)"],
        answerIndex: 1,
        explanation: "Annual factor is 3^(1/5) ≈ 1.246, about 24.6% per year.",
      },
    ],
  },

  // ===========================================================================
  // UNIT 2 — Exponential and Logarithmic Functions
  // ===========================================================================

  "2.1": {
    id: "2.1",
    title: "Change in Arithmetic and Geometric Sequences",
    summary:
      "Arithmetic sequences add a constant difference; geometric sequences multiply by a constant ratio. These are the discrete parents of linear and exponential functions.",
    lesson:
      "A sequence is a function whose domain is the non-negative integers. Arithmetic sequences have the form \\(a_n = a_0 + nd\\), where \\(d\\) is the common difference: each term is the previous term plus \\(d\\). That matches the definition of a linear function restricted to integer inputs. Graphed as points on the \\(xy\\)-plane, an arithmetic sequence lies on a straight line of slope \\(d\\).\n\nGeometric sequences have the form \\(g_n = g_0 \\cdot r^n\\), where \\(r\\) is the common ratio: each term is the previous term times \\(r\\). Geometric sequences are the integer-input version of an exponential function. For \\(r > 1\\) the sequence grows; for \\(0 < r < 1\\) it decays toward zero; for \\(r < 0\\) it alternates sign.\n\nThe CED wants you to recognize the pattern from a table: check whether consecutive differences are constant (arithmetic) or consecutive ratios are constant (geometric). The distinction matters because it determines whether a continuous model should be linear or exponential. Indexing is also a trap — watch whether the problem starts at \\(n = 0\\) or \\(n = 1\\), since \\(a_0\\) and \\(a_1\\) differ by \\(d\\).",
    keyIdeas: [
      "Arithmetic: \\(a_n = a_0 + nd\\). Constant first differences \\(d\\).",
      "Geometric: \\(g_n = g_0 r^n\\). Constant ratios \\(r\\).",
      "Arithmetic sequences are discrete lines; geometric are discrete exponentials.",
      "Check the starting index — \\(n = 0\\) vs \\(n = 1\\) shifts the formula.",
    ],
    workedExample: {
      prompt:
        "A sequence has \\(a_1 = 6\\) and \\(a_4 = 162\\). Assuming it's geometric, find the common ratio and a closed form.",
      solution:
        "From \\(a_4 = a_1 r^3\\) we get \\(162 = 6 r^3 \\Rightarrow r^3 = 27 \\Rightarrow r = 3\\). Using \\(n = 1\\) indexing, \\(a_n = 6 \\cdot 3^{n-1}\\). Check \\(a_4 = 6 \\cdot 27 = 162\\). Correct.",
    },
    commonMistakes: [
      "Testing differences when the sequence is actually geometric (or vice versa).",
      "Forgetting to shift the exponent when the sequence starts at \\(n = 1\\) instead of \\(n = 0\\).",
      "Assuming \\(r > 0\\) and missing negative or alternating ratios.",
    ],
    quiz: [
      {
        q: "An arithmetic sequence starts with \\(a_0 = 4\\) and has common difference \\(d = 3\\). Find \\(a_5\\).",
        choices: ["15", "19", "22", "12"],
        answerIndex: 1,
        explanation: "\\(a_5 = 4 + 5(3) = 19\\).",
      },
      {
        q: "A geometric sequence has \\(g_1 = 2\\) and \\(g_4 = 54\\). Find the common ratio.",
        choices: ["3", "27", "13", "9"],
        answerIndex: 0,
        explanation: "\\(g_4 = g_1 r^3\\), so \\(54 = 2 r^3 \\Rightarrow r^3 = 27 \\Rightarrow r = 3\\).",
      },
      {
        q: "Which sequence is geometric?",
        choices: ["2, 5, 8, 11, 14", "1, 2, 4, 7, 11", "3, 6, 12, 24, 48", "1, 4, 9, 16, 25"],
        answerIndex: 2,
        explanation: "3, 6, 12, 24, 48 has a constant ratio of 2 between consecutive terms.",
      },
      {
        q: "An arithmetic sequence is the discrete analog of which continuous function family?",
        choices: ["Linear", "Quadratic", "Exponential", "Logarithmic"],
        answerIndex: 0,
        explanation: "Arithmetic sequences have constant first differences, matching the constant slope of a linear function.",
      },
    ],
  },

  "2.2": {
    id: "2.2",
    title: "Change in Linear and Exponential Functions",
    summary:
      "Linear functions add the same amount over equal intervals; exponential functions multiply by the same amount over equal intervals.",
    lesson:
      "Linear functions \\(f(x) = mx + b\\) exhibit constant absolute change: moving \\(x\\) right by one unit always adds \\(m\\) to \\(y\\), regardless of where you start. Exponential functions \\(f(x) = a \\cdot b^x\\) exhibit constant relative change: moving \\(x\\) right by one unit always multiplies \\(y\\) by \\(b\\). That multiplicative structure creates compounding, which is why exponentials eventually outstrip any polynomial.\n\nThe CED emphasizes translating between these languages. If a table shows consecutive outputs \\(3, 6, 12, 24\\), you should immediately recognize the constant ratio 2 and write \\(f(x) = 3 \\cdot 2^x\\). If a table shows \\(3, 6, 9, 12\\), you recognize the constant difference 3 and write \\(f(x) = 3 + 3x\\). For unequal intervals you still use the same idea: linear grows additively in proportion to \\(\\Delta x\\), exponential grows multiplicatively in proportion to \\(b^{\\Delta x}\\).\n\nOne framing that helps on the FRQ: linear answers \"how much does it change?\" while exponential answers \"by what factor does it change?\" Keep your sentences consistent with that distinction.",
    keyIdeas: [
      "Linear \\(\\Leftrightarrow\\) constant absolute change over equal \\(\\Delta x\\).",
      "Exponential \\(\\Leftrightarrow\\) constant relative (multiplicative) change.",
      "Ratios distinguish exponential; differences distinguish linear.",
      "Linear answers \"how much?\" Exponential answers \"by what factor?\"",
    ],
    workedExample: {
      prompt:
        "Data: \\((0, 5), (2, 20), (4, 80)\\). Linear or exponential? Write the model.",
      solution:
        "Ratios of consecutive outputs: \\(20/5 = 4\\), \\(80/20 = 4\\). Constant ratio 4 across \\(\\Delta x = 2\\), so exponential. Over one unit of \\(x\\), the factor is \\(\\sqrt{4} = 2\\). Model: \\(f(x) = 5 \\cdot 2^x\\).",
    },
    commonMistakes: [
      "Comparing absolute differences on data that's actually exponential.",
      "Dropping the initial value \\(a\\) and writing \\(f(x) = b^x\\) instead of \\(a b^x\\).",
      "Forgetting to take the \\(\\Delta x\\)-th root when ratios span multi-unit intervals.",
    ],
    quiz: [
      {
        q: "Data: \\((0, 3), (1, 9), (2, 27), (3, 81)\\). Write the exponential model \\(f(x) = ab^x\\).",
        choices: ["\\(f(x) = 9 \\cdot 3^x\\)", "\\(f(x) = 3 \\cdot 3^x\\)", "\\(f(x) = 3 + 3x\\)", "\\(f(x) = 3x^3\\)"],
        answerIndex: 1,
        explanation: "Initial value a = f(0) = 3. Ratio between consecutive terms is 3, so b = 3.",
      },
      {
        q: "If each year a population grows by 12%, which formula represents the population after \\(t\\) years?",
        choices: ["\\(P_0 \\cdot 0.12^t\\)", "\\(P_0 + 0.12 t\\)", "\\(P_0 \\cdot 1.12^t\\)", "\\(P_0 \\cdot 12^t\\)"],
        answerIndex: 2,
        explanation: "12% growth per year means multiply by (1 + 0.12) = 1.12 each year; model is \\(P_0 \\cdot 1.12^t\\).",
      },
      {
        q: "Compared to any linear function, a growing exponential function eventually:",
        choices: ["Grows more slowly forever.", "Has the same growth rate.", "Overtakes the linear function.", "Stays bounded."],
        answerIndex: 2,
        explanation: "Exponential growth eventually dominates any linear (or any polynomial) growth.",
      },
      {
        q: "A table has outputs 5, 10, 20, 40 at equal x-steps. Which model fits?",
        choices: ["Linear with slope 5", "Exponential with base 2", "Quadratic", "Logarithmic"],
        answerIndex: 1,
        explanation: "Each output is double the previous, so it's exponential with base 2.",
      },
    ],
  },

  "2.3": {
    id: "2.3",
    title: "Exponential Functions",
    summary:
      "Exponential functions have the form \\(f(x) = a \\cdot b^x\\) with base \\(b > 0, b \\neq 1\\), and grow or decay by a constant factor each unit.",
    lesson:
      "An exponential function is \\(f(x) = a \\cdot b^x\\). The initial value \\(a = f(0)\\) sets the scale, and the base \\(b\\) controls the growth rate: \\(b > 1\\) means growth, \\(0 < b < 1\\) means decay, and \\(b = 1\\) collapses to the constant function (not allowed). The domain is all real numbers and the range is \\((0, \\infty)\\) if \\(a > 0\\) or \\((-\\infty, 0)\\) if \\(a < 0\\).\n\nKey structural features: \\(f\\) has no zeros (the graph never touches the x-axis), has a horizontal asymptote at \\(y = 0\\), and is monotonic — strictly increasing if \\(b > 1\\) and strictly decreasing if \\(0 < b < 1\\). Concavity is always in the same direction: concave up when \\(a > 0\\).\n\nThe natural base \\(e \\approx 2.718\\) deserves special attention because continuous compounding and most growth/decay problems in science use it. You can always rewrite \\(b^x = e^{x \\ln b}\\) — the CED expects you to be comfortable switching between bases using \\(\\ln\\) or \\(\\log_b\\).",
    keyIdeas: [
      "Form: \\(f(x) = a \\cdot b^x\\) with \\(b > 0, b \\neq 1\\).",
      "Horizontal asymptote \\(y = 0\\); no x-intercept.",
      "Monotonic: growth if \\(b > 1\\), decay if \\(0 < b < 1\\).",
      "Any base can be rewritten via \\(b^x = e^{x \\ln b}\\).",
    ],
    workedExample: {
      prompt:
        "Let \\(f(x) = 4 \\cdot 3^x\\). Find \\(f(0)\\), \\(f(2)\\), and describe the end behavior.",
      solution:
        "\\(f(0) = 4 \\cdot 3^0 = 4\\). \\(f(2) = 4 \\cdot 9 = 36\\). Since \\(a = 4 > 0\\) and \\(b = 3 > 1\\), \\(f\\) grows. As \\(x \\to +\\infty\\), \\(f(x) \\to +\\infty\\). As \\(x \\to -\\infty\\), \\(f(x) \\to 0^+\\) (horizontal asymptote).",
    },
    commonMistakes: [
      "Calling \\(a\\) the \"rate of growth\" when it's the initial value.",
      "Assuming the graph can cross the x-axis.",
      "Forgetting that negative \\(a\\) reflects everything through the x-axis.",
    ],
    quiz: [
      {
        q: "What is the horizontal asymptote of \\(f(x) = 2 \\cdot 5^x\\)?",
        choices: ["\\(y = 0\\)", "\\(y = 2\\)", "\\(y = 5\\)", "No asymptote"],
        answerIndex: 0,
        explanation: "Exponential functions \\(ab^x\\) have horizontal asymptote at y = 0; the initial value a does not shift the asymptote.",
      },
      {
        q: "For \\(f(x) = 3 \\cdot (0.5)^x\\), describe the behavior.",
        choices: ["Growth, increasing", "Decay, decreasing", "Growth, decreasing", "Neither"],
        answerIndex: 1,
        explanation: "Base 0.5 < 1 with positive coefficient means exponential decay — the function is decreasing.",
      },
      {
        q: "Which exponential function passes through \\((0, 4)\\) and \\((1, 12)\\)?",
        choices: ["\\(f(x) = 4 \\cdot 3^x\\)", "\\(f(x) = 3 \\cdot 4^x\\)", "\\(f(x) = 4 + 8x\\)", "\\(f(x) = 12 \\cdot (1/3)^x\\)"],
        answerIndex: 0,
        explanation: "a = f(0) = 4; b = f(1)/f(0) = 12/4 = 3. So \\(f(x) = 4 \\cdot 3^x\\).",
      },
      {
        q: "The range of \\(f(x) = 5 \\cdot 2^x\\) is:",
        choices: ["\\((-\\infty, \\infty)\\)", "\\((0, \\infty)\\)", "\\([0, \\infty)\\)", "\\((5, \\infty)\\)"],
        answerIndex: 1,
        explanation: "With positive a and any valid base, exponential output is strictly positive — range is (0, ∞).",
      },
    ],
    diagram: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
      ${AXIS}
      <path d="M25 195 Q140 185 200 140 Q260 80 330 30" fill="none" stroke="#c2410c" stroke-width="2.4" />
      <line x1="25" y1="200" x2="380" y2="200" stroke="#c2410c" stroke-width="0.8" stroke-dasharray="4 3" />
      <text x="320" y="195" font-family="ui-sans-serif" font-size="10" fill="#c2410c">y = 0 asymptote</text>
      <text x="260" y="55" font-family="ui-sans-serif" font-size="10" fill="#6b6b6b">b &gt; 1: growth</text>
    </svg>`,
  },

  "2.4": {
    id: "2.4",
    title: "Exponential Function Manipulation",
    summary:
      "Use exponent rules to rewrite exponential expressions, change bases, or extract information about growth rates and initial values.",
    lesson:
      "The core rules \\(b^{m+n} = b^m b^n\\), \\(b^{mn} = (b^m)^n\\), and \\(b^{-n} = 1/b^n\\) let you rewrite any exponential expression. The most common AP move is changing the period of growth. If a bacteria population satisfies \\(P(t) = 200 \\cdot 2^{t/3}\\) where \\(t\\) is in hours, you can rewrite it as \\(P(t) = 200 \\cdot (2^{1/3})^t \\approx 200 \\cdot 1.26^t\\), which tells you the hourly growth factor is about 1.26 (a 26% increase per hour).\n\nAnother recurring move: shifting the time origin. If \\(P(t) = 200 \\cdot 2^{t/3}\\) gives population starting at \\(t = 0\\), then \\(P(t - 5) = 200 \\cdot 2^{(t-5)/3}\\) shifts the origin five hours later, and you can rewrite it as \\((200 / 2^{5/3}) \\cdot 2^{t/3}\\) to get a new initial-value representation.\n\nOn the FRQ, the CED frequently asks you to move between a period-based form (doubles every 10 years) and a unit-time form (grows by 7.2% per year). Both are correct; the manipulation is just \\((\\text{factor})^{1/\\text{period}}\\).",
    keyIdeas: [
      "Exponent rules let you convert between bases and periods.",
      "\\(b^{t/k} = (b^{1/k})^t\\): move the division inside to find unit growth factor.",
      "Shifting \\(t \\to t - c\\) rescales the initial value.",
      "Period form and unit-time form are both valid; pick what the question wants.",
    ],
    workedExample: {
      prompt:
        "A population follows \\(P(t) = 500 \\cdot 3^{t/4}\\) with \\(t\\) in years. Find the annual growth factor and percent change per year.",
      solution:
        "Rewrite: \\(P(t) = 500 \\cdot (3^{1/4})^t\\). Compute \\(3^{1/4} \\approx 1.3161\\). Annual growth factor \\(\\approx 1.3161\\), so population increases by about \\(31.6\\%\\) per year.",
    },
    commonMistakes: [
      "Dropping the exponent when factoring: \\((3^{1/4})^t \\neq 3^{1/4} \\cdot t\\).",
      "Reporting \\(1.3161\\) as a \\(131\\%\\) change instead of a \\(31.6\\%\\) change.",
      "Forgetting that shifting \\(t\\) changes the initial value, not just the formula.",
    ],
    quiz: [
      {
        q: "If \\(P(t) = 800 \\cdot 2^{t/10}\\), what is the growth factor per year?",
        choices: ["2", "\\(2^{1/10} \\approx 1.0718\\)", "0.5", "10"],
        answerIndex: 1,
        explanation: "Rewrite \\(2^{t/10} = (2^{1/10})^t\\), so annual factor is \\(2^{1/10} \\approx 1.0718\\).",
      },
      {
        q: "An expression \\(a b^x\\) is rewritten \\(a \\cdot (b^2)^{x/2}\\). The equivalent form:",
        choices: ["Changes the function.", "Is not equivalent.", "Expresses growth over 2-unit intervals.", "Sets b to 1."],
        answerIndex: 2,
        explanation: "\\(b^x = (b^2)^{x/2}\\) is algebraically the same function, but the new form makes every 2-unit interval the natural period.",
      },
      {
        q: "A population model \\(P(t) = 100 \\cdot 1.05^t\\) can be rewritten with \\(t\\) measured in decades as:",
        choices: ["\\(100 \\cdot 1.05^{10t}\\)", "\\(100 \\cdot (1.05^{10})^t\\)", "\\(100 \\cdot 10 \\cdot 1.05^t\\)", "\\(100 + 1.05^t\\)"],
        answerIndex: 1,
        explanation: "If t is in decades, the factor per decade is \\(1.05^{10}\\); rewrite as \\(100 (1.05^{10})^t\\).",
      },
      {
        q: "Which exponent rule is used to combine \\(3^x \\cdot 3^{2x}\\)?",
        choices: ["\\(b^m \\cdot b^n = b^{m+n}\\)", "\\(b^{mn} = (b^m)^n\\)", "\\(b^{-n} = 1/b^n\\)", "\\((ab)^n = a^n b^n\\)"],
        answerIndex: 0,
        explanation: "Same-base multiplication adds exponents: 3^x · 3^(2x) = 3^(3x).",
      },
    ],
  },

  "2.5": {
    id: "2.5",
    title: "Exponential Function Context and Data Modeling",
    summary:
      "Build an exponential model from two data points and use it to answer contextual questions about growth or decay.",
    lesson:
      "Exponential modeling workflow: (1) pick form \\(f(t) = a \\cdot b^t\\); (2) use the initial condition \\(f(0) = a\\) or any two points to solve for \\(a\\) and \\(b\\); (3) interpret \\(b\\) in words — growth if \\(b > 1\\), decay if \\(0 < b < 1\\), percent change per unit \\(= (b - 1) \\cdot 100\\%\\).\n\nGiven two points \\((t_1, f_1)\\) and \\((t_2, f_2)\\), divide to eliminate \\(a\\): \\(f_2 / f_1 = b^{t_2 - t_1}\\), so \\(b = (f_2/f_1)^{1/(t_2 - t_1)}\\). Then back-solve for \\(a\\) using either point. This is cleaner than setting up two equations and solving a system.\n\nContext questions usually come in three flavors: (1) evaluate at a specific time, (2) solve for the time a threshold is crossed (requires logs), (3) interpret \\(b\\) as a percent rate. Always attach units and a sentence. \"The population reaches 1000 after about 7.3 years\" is the form graders want.",
    keyIdeas: [
      "Two data points fully determine an exponential \\(a \\cdot b^t\\).",
      "Divide outputs to eliminate \\(a\\): \\(b^{\\Delta t} = f_2/f_1\\).",
      "Percent change per unit = \\((b - 1) \\cdot 100\\%\\).",
      "Always state the answer in a sentence with units.",
    ],
    workedExample: {
      prompt:
        "Radioactive decay: \\(500\\) g at \\(t = 0\\), \\(200\\) g at \\(t = 10\\) years. Find \\(f(t)\\) and estimate when only \\(50\\) g remain.",
      solution:
        "\\(a = 500\\). From \\(200 = 500 b^{10}\\), \\(b^{10} = 0.4\\), \\(b = 0.4^{1/10} \\approx 0.9124\\). Model: \\(f(t) = 500(0.9124)^t\\). Solve \\(50 = 500(0.9124)^t\\): \\(0.1 = 0.9124^t \\Rightarrow t = \\ln(0.1)/\\ln(0.9124) \\approx 25.1\\) years.",
    },
    commonMistakes: [
      "Using \\(b = 0.4\\) instead of \\(b = 0.4^{1/10}\\).",
      "Forgetting that decay means \\(b < 1\\), not a negative base.",
      "Missing the final units sentence.",
    ],
    quiz: [
      {
        q: "A bacteria culture has 200 at \\(t=0\\) and 800 at \\(t=2\\). The exponential model is:",
        choices: ["\\(f(t) = 200 \\cdot 2^t\\)", "\\(f(t) = 200 \\cdot 4^t\\)", "\\(f(t) = 200 \\cdot 4^{t/2}\\)", "\\(f(t) = 200 + 300t\\)"],
        answerIndex: 2,
        explanation: "f(0)=200, and 800/200 = 4 over 2 time units, so b satisfies b² = 4, giving \\(f(t) = 200 \\cdot 4^{t/2}\\) (equivalently \\(200 \\cdot 2^t\\)).",
      },
      {
        q: "If an investment doubles in 6 years, what is the annual growth factor?",
        choices: ["2", "\\(2^{1/6} \\approx 1.122\\)", "1.6", "6"],
        answerIndex: 1,
        explanation: "Doubling in 6 years gives per-year factor of \\(2^{1/6} \\approx 1.122\\), about 12.2% annual growth.",
      },
      {
        q: "Radioactive decay: 80 g left after 10 years, 20 g left after 30 years. The decay factor per year satisfies:",
        choices: ["\\(b = 1/4\\)", "\\(b^{20} = 1/4\\)", "\\(b = 4\\)", "\\(b^{20} = 4\\)"],
        answerIndex: 1,
        explanation: "From 80 to 20 is a factor of 1/4 across 20 years, so \\(b^{20} = 1/4\\) giving \\(b = (1/4)^{1/20}\\).",
      },
      {
        q: "A population model \\(P(t) = 100 \\cdot 0.9^t\\) means each year the population:",
        choices: ["Decreases by 10%.", "Decreases by 90%.", "Increases by 10%.", "Decreases by 0.9 people."],
        answerIndex: 0,
        explanation: "Factor 0.9 per year means 10% loss each year (percent change = (0.9 − 1) × 100% = −10%).",
      },
    ],
  },

  "2.6": {
    id: "2.6",
    title: "Competing Function Model Validation",
    summary:
      "When linear, quadratic, and exponential models all kind of fit, use residuals or growth-rate checks to pick the best one.",
    lesson:
      "Real data rarely matches one family perfectly. The CED expects you to compare candidate models using evidence: (1) check structural fit — are differences constant (linear), second differences constant (quadratic), ratios constant (exponential)? (2) compute residuals for each model and compare their pattern or total magnitude, (3) compare long-run predictions against context — does the model give sensible values outside the data range?\n\nA crucial diagnostic: residual patterns. If residuals from a linear fit form a U-shape or inverted-U, the true function is curved; try quadratic or exponential instead. If residuals are scattered randomly with no pattern, the model is structurally appropriate.\n\nExtrapolation is where model choice gets punished. A linear model might fit nearby data well but predict impossibly large values outside the range. Exponential growth models also eventually break realism (populations don't grow forever). Writing a sentence about the domain where a model is reasonable is often a free point.",
    keyIdeas: [
      "Check structural fit: differences, second differences, or ratios constant?",
      "Residual patterns reveal which family the data really belongs to.",
      "Extrapolate and sanity-check against context — unrealistic predictions flag bad models.",
      "A valid model includes a statement of its reasonable domain.",
    ],
    workedExample: {
      prompt:
        "Data: \\((0, 10), (1, 12), (2, 15), (3, 19), (4, 24)\\). Is linear, quadratic, or exponential best?",
      solution:
        "First differences: \\(2, 3, 4, 5\\) — not constant, so not linear. Second differences: \\(1, 1, 1\\) — constant, so quadratic with \\(2a = 1 \\Rightarrow a = 0.5\\). Ratios: \\(1.2, 1.25, 1.27, 1.26\\) — close to constant but not exactly so. Quadratic fits structurally with \\(f(x) = 0.5 x^2 + 1.5 x + 10\\).",
    },
    commonMistakes: [
      "Ignoring residual patterns when they clearly signal curvature.",
      "Picking exponential because the numbers grow, without checking ratios.",
      "Extrapolating far beyond the data range without flagging the risk.",
    ],
    quiz: [
      {
        q: "Residuals from a linear fit form a U-shape. This suggests:",
        choices: ["The linear fit is excellent.", "A quadratic or nonlinear model is more appropriate.", "The data has no trend.", "You should add more points."],
        answerIndex: 1,
        explanation: "A systematic pattern like a U in residuals indicates the linear model misses curvature; a higher-order model fits better.",
      },
      {
        q: "Data ratios between consecutive outputs are approximately 1.1, 1.1, 1.1. Best model family:",
        choices: ["Linear", "Quadratic", "Exponential", "Logarithmic"],
        answerIndex: 2,
        explanation: "Constant ratios indicate exponential growth with base approximately 1.1.",
      },
      {
        q: "A model predicts negative population 50 years from now. The appropriate conclusion is:",
        choices: ["The prediction is correct.", "The model is valid only in a bounded range around the data.", "Populations can be negative.", "The model must be linear."],
        answerIndex: 1,
        explanation: "Models should only be trusted within or near their data range; unrealistic extrapolation signals the model breaks down.",
      },
      {
        q: "When choosing between linear, quadratic, and exponential models, structural diagnostics check:",
        choices: ["Whether differences, second differences, or ratios are constant.", "Only the y-intercept.", "Only the maximum value.", "Whether the data is ordered."],
        answerIndex: 0,
        explanation: "Constant first differences signal linear, constant second differences signal quadratic, and constant ratios signal exponential.",
      },
    ],
  },

  "2.7": {
    id: "2.7",
    title: "Composition of Functions",
    summary:
      "Composition \\((f \\circ g)(x) = f(g(x))\\) chains two functions together — the output of one becomes the input of the next.",
    lesson:
      "Composition means evaluating one function's output as another function's input. In symbols, \\((f \\circ g)(x) = f(g(x))\\). The order matters — \\(f \\circ g\\) is usually not the same as \\(g \\circ f\\).\n\nDomain of \\(f \\circ g\\): an \\(x\\) is valid if (1) \\(x\\) is in the domain of \\(g\\), and (2) \\(g(x)\\) is in the domain of \\(f\\). Both restrictions have to hold. If \\(g(x) = \\sqrt{x - 1}\\) and \\(f(u) = 1/u\\), then \\((f \\circ g)(x) = 1/\\sqrt{x - 1}\\) requires \\(x > 1\\) (strict, because 0 is not in \\(f\\)'s domain).\n\nThe CED tests composition in graphs, tables, and formulas. From a table, find \\(g(2)\\) first, then look up \\(f\\) at that value. From a graph, trace the input vertically up to \\(g\\), horizontally across to identify the y-value, then back down to the \\(f\\) graph. Composition also foreshadows the chain rule in Calc AB: the chain rule tells you how to differentiate a composition.",
    keyIdeas: [
      "\\((f \\circ g)(x) = f(g(x))\\): apply \\(g\\) first, then \\(f\\).",
      "Order matters: \\(f \\circ g \\neq g \\circ f\\) in general.",
      "Domain requires both \\(x\\) and \\(g(x)\\) valid for \\(g\\) and \\(f\\) respectively.",
      "Graphs and tables let you compose without formulas.",
    ],
    workedExample: {
      prompt:
        "Let \\(f(x) = x^2 + 1\\) and \\(g(x) = 2x - 3\\). Find \\((f \\circ g)(4)\\) and \\((g \\circ f)(4)\\).",
      solution:
        "\\(g(4) = 8 - 3 = 5\\). \\((f \\circ g)(4) = f(5) = 26\\). \\(f(4) = 16 + 1 = 17\\). \\((g \\circ f)(4) = g(17) = 34 - 3 = 31\\). Note \\(26 \\neq 31\\), confirming order matters.",
    },
    commonMistakes: [
      "Applying \\(f\\) before \\(g\\) in \\(f \\circ g\\).",
      "Ignoring the inner function's domain when restricting.",
      "Trying to simplify composition as multiplication.",
    ],
    quiz: [
      {
        q: "If \\(f(x) = 2x + 1\\) and \\(g(x) = x^2\\), find \\((f \\circ g)(3)\\).",
        choices: ["19", "37", "49", "10"],
        answerIndex: 0,
        explanation: "g(3) = 9, then f(9) = 2(9) + 1 = 19.",
      },
      {
        q: "Which is generally true about composition?",
        choices: ["\\(f \\circ g = g \\circ f\\) always.", "\\(f \\circ g\\) means multiply \\(f\\) by \\(g\\).", "\\(f \\circ g\\) usually differs from \\(g \\circ f\\).", "Composition requires both functions to have the same domain."],
        answerIndex: 2,
        explanation: "Composition is generally non-commutative: applying g then f produces different output than applying f then g.",
      },
      {
        q: "For \\(f(x) = \\sqrt{x}\\) and \\(g(x) = x - 4\\), what is the domain of \\((f \\circ g)(x)\\)?",
        choices: ["All real numbers", "\\(x \\geq 0\\)", "\\(x \\geq 4\\)", "\\(x > 4\\)"],
        answerIndex: 2,
        explanation: "We need g(x) ≥ 0 for the square root to be defined, i.e., x − 4 ≥ 0, so x ≥ 4.",
      },
      {
        q: "If \\(h(x) = (x+3)^2\\), one valid decomposition as \\(f \\circ g\\) is:",
        choices: ["\\(f(x) = x^2, g(x) = x + 3\\)", "\\(f(x) = x + 3, g(x) = x^2\\)", "\\(f(x) = x^2 + 3, g(x) = x\\)", "\\(f(x) = x, g(x) = x^2 + 3\\)"],
        answerIndex: 0,
        explanation: "Apply g first (add 3), then f (square): f(g(x)) = f(x+3) = (x+3)² = h(x).",
      },
    ],
  },

  "2.8": {
    id: "2.8",
    title: "Inverse Functions",
    summary:
      "The inverse \\(f^{-1}\\) undoes \\(f\\): \\(f^{-1}(f(x)) = x\\). Only one-to-one functions have inverses without domain restrictions.",
    lesson:
      "An inverse function \\(f^{-1}\\) is the function that reverses \\(f\\): if \\(f\\) sends 3 to 7, then \\(f^{-1}\\) sends 7 to 3. Algebraically, \\(f^{-1}(f(x)) = x\\) and \\(f(f^{-1}(y)) = y\\) on their respective domains. Graphically, \\(f^{-1}\\) is the reflection of \\(f\\) across the line \\(y = x\\).\n\nA function has an inverse only if it's one-to-one — that is, no horizontal line hits the graph more than once. Functions that fail the horizontal line test (like \\(f(x) = x^2\\) on all of \\(\\mathbb{R}\\)) can still have inverses after restricting the domain (like \\(x \\geq 0\\), giving \\(\\sqrt{y}\\) as inverse).\n\nTo find an inverse algebraically: (1) write \\(y = f(x)\\); (2) swap \\(x\\) and \\(y\\); (3) solve for \\(y\\). The result is \\(y = f^{-1}(x)\\). The domain of \\(f^{-1}\\) equals the range of \\(f\\), and vice versa.",
    keyIdeas: [
      "\\(f^{-1}(f(x)) = x\\) — inverses undo.",
      "Graph of \\(f^{-1}\\) = reflection of \\(f\\) across \\(y = x\\).",
      "Horizontal line test decides whether \\(f\\) has an inverse.",
      "Domain of \\(f^{-1}\\) = range of \\(f\\).",
    ],
    workedExample: {
      prompt: "Find the inverse of \\(f(x) = 2x - 5\\).",
      solution:
        "Start with \\(y = 2x - 5\\). Swap: \\(x = 2y - 5\\). Solve: \\(2y = x + 5 \\Rightarrow y = (x + 5)/2\\). So \\(f^{-1}(x) = (x + 5)/2\\). Check: \\(f^{-1}(f(3)) = f^{-1}(1) = (1+5)/2 = 3\\). Correct.",
    },
    commonMistakes: [
      "Writing \\(f^{-1}(x) = 1/f(x)\\) — that's a reciprocal, not an inverse.",
      "Forgetting to restrict the domain for non-one-to-one functions.",
      "Swapping variables but forgetting to solve for \\(y\\).",
    ],
    quiz: [
      {
        q: "Find the inverse of \\(f(x) = 3x - 2\\).",
        choices: ["\\(f^{-1}(x) = (x+2)/3\\)", "\\(f^{-1}(x) = 1/(3x-2)\\)", "\\(f^{-1}(x) = (x-2)/3\\)", "\\(f^{-1}(x) = 3x + 2\\)"],
        answerIndex: 0,
        explanation: "Swap and solve: x = 3y − 2 → y = (x + 2)/3.",
      },
      {
        q: "A function is invertible over all of \\(\\mathbb{R}\\) if and only if it passes:",
        choices: ["The vertical line test.", "The horizontal line test.", "The y-axis test.", "The symmetry test."],
        answerIndex: 1,
        explanation: "Horizontal line test determines whether the function is one-to-one, which is required for an inverse to exist on the full domain.",
      },
      {
        q: "The graph of \\(f^{-1}\\) is obtained from the graph of \\(f\\) by:",
        choices: ["Reflecting across the x-axis", "Reflecting across the y-axis", "Reflecting across the line \\(y = x\\)", "Rotating by 180 degrees"],
        answerIndex: 2,
        explanation: "Since inverses swap x and y coordinates, the graph reflects across the line y = x.",
      },
      {
        q: "If \\(f(2) = 7\\), what does \\(f^{-1}\\) do to 7?",
        choices: ["Sends 7 to 1/7", "Sends 7 to 2", "Sends 7 to −7", "Not enough information"],
        answerIndex: 1,
        explanation: "Inverse undoes the original: if f(2) = 7, then f⁻¹(7) = 2.",
      },
    ],
  },

  "2.9": {
    id: "2.9",
    title: "Logarithmic Expressions",
    summary:
      "A logarithm answers the question \"what exponent do I need?\" Formally, \\(\\log_b(y) = x\\) means \\(b^x = y\\).",
    lesson:
      "Logarithms are the inverse of exponentiation. The expression \\(\\log_b(y)\\) means \"the exponent \\(x\\) such that \\(b^x = y\\).\" The base \\(b\\) must satisfy \\(b > 0, b \\neq 1\\), and the input \\(y\\) must be positive.\n\nTwo standard bases dominate: \\(\\log\\) (base 10, common log) and \\(\\ln\\) (base \\(e\\), natural log). For other bases use change-of-base: \\(\\log_b(y) = \\ln(y)/\\ln(b) = \\log(y)/\\log(b)\\).\n\nThe logarithm rules follow directly from exponent rules:\n\n- \\(\\log_b(xy) = \\log_b(x) + \\log_b(y)\\) (product rule)\n- \\(\\log_b(x/y) = \\log_b(x) - \\log_b(y)\\) (quotient rule)\n- \\(\\log_b(x^n) = n \\log_b(x)\\) (power rule)\n- \\(\\log_b(b) = 1\\), \\(\\log_b(1) = 0\\)\n\nOn the AP exam these rules are used constantly to simplify logarithmic equations, convert between forms, and fit data to logarithmic models.",
    keyIdeas: [
      "\\(\\log_b(y) = x \\Leftrightarrow b^x = y\\).",
      "Product, quotient, and power rules convert multiplication into addition.",
      "Change of base: \\(\\log_b y = \\ln y / \\ln b\\).",
      "Input must be positive: \\(\\log_b(0)\\) and \\(\\log_b(-1)\\) are undefined.",
    ],
    workedExample: {
      prompt:
        "Simplify \\(\\log_2(8 x^3) - \\log_2(2 x)\\).",
      solution:
        "Quotient rule: \\(\\log_2\\left(\\frac{8 x^3}{2 x}\\right) = \\log_2(4 x^2)\\). Product rule: \\(\\log_2(4) + \\log_2(x^2) = 2 + 2 \\log_2(x)\\).",
    },
    commonMistakes: [
      "Distributing \\(\\log\\) across a sum: \\(\\log(a + b) \\neq \\log a + \\log b\\).",
      "Forgetting the positivity constraint on the input.",
      "Mixing up the direction of change-of-base.",
    ],
    quiz: [
      {
        q: "Evaluate \\(\\log_3(81)\\).",
        choices: ["3", "4", "27", "9"],
        answerIndex: 1,
        explanation: "\\(3^4 = 81\\), so \\(\\log_3(81) = 4\\).",
      },
      {
        q: "Simplify \\(\\log(100) - \\log(4)\\).",
        choices: ["\\(\\log(96)\\)", "\\(\\log(25)\\)", "\\(\\log(400)\\)", "\\(\\log(104)\\)"],
        answerIndex: 1,
        explanation: "Quotient rule: \\(\\log(100) - \\log(4) = \\log(100/4) = \\log(25)\\).",
      },
      {
        q: "Which of the following is INVALID?",
        choices: ["\\(\\log_2(8)\\)", "\\(\\log_2(1)\\)", "\\(\\log_2(-4)\\)", "\\(\\log_2(0.5)\\)"],
        answerIndex: 2,
        explanation: "Logarithms are only defined for strictly positive arguments; \\(\\log_2(-4)\\) is undefined.",
      },
      {
        q: "Rewrite \\(\\log_5(x^3)\\) using log rules.",
        choices: ["\\(3 \\log_5(x)\\)", "\\(\\log_5(3x)\\)", "\\((\\log_5(x))^3\\)", "\\(\\log_5(x) + 3\\)"],
        answerIndex: 0,
        explanation: "Power rule: \\(\\log_b(x^n) = n \\log_b(x)\\), so \\(\\log_5(x^3) = 3 \\log_5(x)\\).",
      },
    ],
  },

  "2.10": {
    id: "2.10",
    title: "Inverses of Exponential Functions",
    summary:
      "The inverse of \\(f(x) = a b^x\\) is a logarithmic function. That's how we solve exponential equations.",
    lesson:
      "Because exponentials are one-to-one, they have inverses — and those inverses are logarithms. The inverse of \\(f(x) = b^x\\) is \\(f^{-1}(y) = \\log_b(y)\\). More generally, the inverse of \\(f(x) = a b^x\\) is \\(f^{-1}(y) = \\log_b(y/a)\\).\n\nTo solve an equation of the form \\(a b^x = y\\) for \\(x\\), take a log of both sides: \\(\\log_b(y/a) = x\\), or equivalently \\(x = \\ln(y/a) / \\ln(b)\\). This is the workhorse technique for every exponential equation on the exam.\n\nThe graph relationship is just reflection over \\(y = x\\): since \\(b^x\\) has a horizontal asymptote at \\(y = 0\\), its inverse \\(\\log_b(y)\\) has a vertical asymptote at \\(y = 0\\) (the reflected version). Exponential's \\(y\\)-intercept at \\((0, 1)\\) becomes log's \\(x\\)-intercept at \\((1, 0)\\). This pairing is a reliable sanity check.",
    keyIdeas: [
      "Inverse of \\(b^x\\) is \\(\\log_b(x)\\).",
      "Inverse of \\(a b^x\\) is \\(\\log_b(x/a)\\).",
      "Solve exponential equations by taking logs of both sides.",
      "Graphs reflect across \\(y = x\\): y-asymptotes become x-asymptotes.",
    ],
    workedExample: {
      prompt: "Solve \\(7 \\cdot 2^x = 56\\) for \\(x\\).",
      solution:
        "Divide: \\(2^x = 8\\). Take \\(\\log_2\\): \\(x = \\log_2(8) = 3\\). Check: \\(7 \\cdot 8 = 56\\). Correct.",
    },
    commonMistakes: [
      "Forgetting to divide by \\(a\\) before taking the log.",
      "Using \\(\\log\\) when the problem needs \\(\\log_b\\) or \\(\\ln\\).",
      "Missing that logs require a positive argument — rule out extraneous cases.",
    ],
    quiz: [
      {
        q: "Solve \\(3^x = 27\\).",
        choices: ["\\(x = 3\\)", "\\(x = 9\\)", "\\(x = 2\\)", "\\(x = 1\\)"],
        answerIndex: 0,
        explanation: "\\(27 = 3^3\\), so x = 3.",
      },
      {
        q: "The inverse of \\(f(x) = e^x\\) is:",
        choices: ["\\(1/e^x\\)", "\\(\\ln(x)\\)", "\\(\\log(x)\\)", "\\(e^{-x}\\)"],
        answerIndex: 1,
        explanation: "Natural exponential's inverse is the natural log: \\(\\ln(x)\\).",
      },
      {
        q: "Solve \\(5 \\cdot 2^x = 40\\) for \\(x\\).",
        choices: ["\\(x = 3\\)", "\\(x = 8\\)", "\\(x = 4\\)", "\\(x = 5\\)"],
        answerIndex: 0,
        explanation: "Divide: \\(2^x = 8 = 2^3\\), so x = 3.",
      },
      {
        q: "What is the vertical asymptote of \\(f^{-1}(x) = \\log_b(x)\\)?",
        choices: ["\\(x = 1\\)", "\\(x = 0\\)", "\\(x = b\\)", "None"],
        answerIndex: 1,
        explanation: "Log functions blow up as x → 0⁺; the vertical asymptote of any basic log is x = 0.",
      },
    ],
  },

  "2.11": {
    id: "2.11",
    title: "Logarithmic Functions",
    summary:
      "Logarithmic functions grow slowly and have vertical asymptotes at zero. They're the mirror image of exponentials.",
    lesson:
      "A logarithmic function has the form \\(f(x) = \\log_b(x)\\) with base \\(b > 0, b \\neq 1\\). Its domain is \\((0, \\infty)\\) — you can't take a log of a non-positive number. The range is all real numbers. Key features:\n\n- Vertical asymptote at \\(x = 0\\).\n- x-intercept at \\((1, 0)\\) since \\(\\log_b(1) = 0\\).\n- Passes through \\((b, 1)\\) since \\(\\log_b(b) = 1\\).\n- Strictly increasing if \\(b > 1\\), strictly decreasing if \\(0 < b < 1\\).\n- Concave down for \\(b > 1\\) (up for \\(b < 1\\)).\n\nLog functions grow slowly: \\(\\log_2(x)\\) only reaches 10 when \\(x = 1024\\). That slow growth is exactly what makes them useful for compressing large dynamic ranges — decibels, Richter scale, and pH are all logarithmic.\n\nEnd behavior: as \\(x \\to \\infty\\), \\(\\log_b(x) \\to \\infty\\) (for \\(b > 1\\)) but slower than any polynomial. As \\(x \\to 0^+\\), \\(\\log_b(x) \\to -\\infty\\).",
    keyIdeas: [
      "Domain \\((0, \\infty)\\), range \\(\\mathbb{R}\\).",
      "Vertical asymptote \\(x = 0\\); x-intercept at \\((1, 0)\\).",
      "Increasing if \\(b > 1\\), concave down.",
      "Slower than any polynomial at infinity.",
    ],
    workedExample: {
      prompt:
        "Describe the graph of \\(f(x) = \\log_3(x)\\). List domain, range, intercepts, and asymptotes.",
      solution:
        "Domain: \\(x > 0\\). Range: all real numbers. x-intercept at \\((1, 0)\\). Passes through \\((3, 1)\\) since \\(\\log_3(3) = 1\\). Vertical asymptote at \\(x = 0\\). Strictly increasing, concave down. As \\(x \\to \\infty\\), \\(f(x) \\to \\infty\\) slowly.",
    },
    commonMistakes: [
      "Putting the asymptote at \\(y = 0\\) instead of \\(x = 0\\).",
      "Forgetting the domain is strictly positive.",
      "Thinking logs grow fast — they're the slowest growing non-constant class on the exam.",
    ],
    quiz: [
      {
        q: "The domain of \\(f(x) = \\log_4(x)\\) is:",
        choices: ["All real numbers", "\\(x \\geq 0\\)", "\\(x > 0\\)", "\\(x > 1\\)"],
        answerIndex: 2,
        explanation: "Logarithms are defined only for strictly positive inputs: x > 0.",
      },
      {
        q: "A logarithmic function \\(f(x) = \\log_b(x)\\) with base \\(b > 1\\) is:",
        choices: ["Increasing and concave up", "Decreasing and concave up", "Increasing and concave down", "Decreasing and concave down"],
        answerIndex: 2,
        explanation: "For b > 1, log is increasing (output grows as input grows) and concave down (rate of change decreases).",
      },
      {
        q: "For \\(f(x) = \\log_2(x)\\), what is \\(f(16)\\)?",
        choices: ["2", "4", "8", "\\(2^{16}\\)"],
        answerIndex: 1,
        explanation: "\\(2^4 = 16\\), so \\(\\log_2(16) = 4\\).",
      },
      {
        q: "Compared to polynomial functions, log functions at infinity:",
        choices: ["Grow faster than any polynomial.", "Grow at the same rate as \\(x^2\\).", "Grow slower than any positive-power polynomial.", "Are eventually negative."],
        answerIndex: 2,
        explanation: "Logarithmic growth is slower than x^p for any p > 0; logs are the slowest-growing non-constant family in the course.",
      },
    ],
  },

  "2.12": {
    id: "2.12",
    title: "Logarithmic Function Manipulation",
    summary:
      "Combine, expand, and transform logarithmic expressions using the product, quotient, and power rules.",
    lesson:
      "Logarithm manipulation is all about using the three rules to rewrite expressions in a form that makes the problem easier. Expanding goes from a single log with a complicated input to a sum of simpler logs. Condensing goes the other direction, combining a messy sum into a single log of a product or quotient.\n\nThe typical FRQ move: convert a logarithmic equation into a single log on one side, then exponentiate. For example, \\(\\log(x) + \\log(x - 3) = 1\\) becomes \\(\\log(x(x-3)) = 1\\), so \\(x(x-3) = 10^1 = 10\\), a quadratic you can solve.\n\nAlways verify solutions against the domain of the original log equation. Logarithms only accept positive arguments, so any algebraic solution that makes \\(x\\) or \\(x - 3\\) non-positive is extraneous and must be discarded. This is the single biggest place students lose points on logarithmic equations.",
    keyIdeas: [
      "Product, quotient, power rules move between expanded and condensed forms.",
      "Condense before exponentiating when solving log equations.",
      "Always check solutions against the original domain — extraneous roots are common.",
      "Change of base is useful when your calculator only has \\(\\log\\) and \\(\\ln\\).",
    ],
    workedExample: {
      prompt:
        "Solve \\(\\log_2(x) + \\log_2(x - 6) = 4\\).",
      solution:
        "Condense: \\(\\log_2(x(x - 6)) = 4\\). Exponentiate: \\(x(x - 6) = 16\\), so \\(x^2 - 6x - 16 = 0\\). Quadratic formula: \\(x = (6 \\pm \\sqrt{36 + 64})/2 = (6 \\pm 10)/2 = 8\\) or \\(-2\\). Check: \\(x = -2\\) makes \\(\\log_2(-2)\\) undefined, so discard. Only valid solution: \\(x = 8\\).",
    },
    commonMistakes: [
      "Forgetting to check extraneous solutions from the domain restriction.",
      "Distributing logs across sums incorrectly.",
      "Leaving the equation in expanded form before exponentiating.",
    ],
    quiz: [
      {
        q: "Solve \\(\\log_5(x) + \\log_5(4) = 2\\).",
        choices: ["\\(x = 25\\)", "\\(x = 6.25\\)", "\\(x = 5\\)", "\\(x = 100\\)"],
        answerIndex: 1,
        explanation: "Condense: \\(\\log_5(4x) = 2 \\Rightarrow 4x = 25 \\Rightarrow x = 6.25\\).",
      },
      {
        q: "Expand \\(\\ln\\left(\\frac{xy^2}{z}\\right)\\).",
        choices: ["\\(\\ln x + \\ln y + \\ln z\\)", "\\(\\ln x + 2 \\ln y - \\ln z\\)", "\\(\\ln(x + y^2 - z)\\)", "\\(\\ln x \\cdot \\ln y^2 / \\ln z\\)"],
        answerIndex: 1,
        explanation: "Use product, power, and quotient rules: ln(x) + 2 ln(y) − ln(z).",
      },
      {
        q: "Solving \\(\\log(x) + \\log(x-3) = 1\\) gives candidate solutions \\(x = 5\\) and \\(x = -2\\). Which is/are valid?",
        choices: ["Both", "\\(x = 5\\) only", "\\(x = -2\\) only", "Neither"],
        answerIndex: 1,
        explanation: "x = -2 makes log(-2) undefined; only x = 5 is valid.",
      },
      {
        q: "Which expression equals \\(\\log_b(x^3 y)\\)?",
        choices: ["\\(3\\log_b(x) + \\log_b(y)\\)", "\\(\\log_b(3x) + \\log_b(y)\\)", "\\(\\log_b(x) + \\log_b(3y)\\)", "\\(3 \\log_b(xy)\\)"],
        answerIndex: 0,
        explanation: "Product rule, then power rule: \\(\\log_b(x^3 y) = \\log_b(x^3) + \\log_b(y) = 3\\log_b(x) + \\log_b(y)\\).",
      },
    ],
  },

  "2.13": {
    id: "2.13",
    title: "Exponential and Logarithmic Equations and Inequalities",
    summary:
      "Solve exponential equations by taking logs; solve log equations by exponentiating. Inequalities preserve direction except when multiplying by negatives.",
    lesson:
      "The two techniques for solving exponential and logarithmic equations are duals of each other. To solve \\(a b^x = c\\), isolate \\(b^x\\), then take \\(\\log_b\\) (or \\(\\ln\\)) of both sides. To solve \\(\\log_b(f(x)) = c\\), exponentiate: \\(f(x) = b^c\\). Then solve whatever algebra remains.\n\nFor inequalities, the same operations apply but with careful attention to direction. Taking a log is monotonic increasing (for bases \\(>1\\)), so it preserves inequality direction: \\(b^x > c \\Leftrightarrow x > \\log_b(c)\\). If the base is less than 1, the log is monotonic decreasing, so inequality flips. This is one of the subtlest and most graded parts of the topic.\n\nCompound-interest and half-life problems are the two classic application types. Compound interest: \\(A(t) = P(1 + r/n)^{nt}\\), solve for \\(t\\) by taking logs. Half-life: \\(N(t) = N_0 (1/2)^{t/T}\\), similarly solve for \\(t\\). Both reduce to exponential equations you already know how to handle.",
    keyIdeas: [
      "Exponential equation: isolate and take log.",
      "Log equation: exponentiate.",
      "Inequality with base \\(b > 1\\) preserves direction; \\(0 < b < 1\\) reverses it.",
      "Check extraneous solutions against log domains.",
    ],
    workedExample: {
      prompt:
        "Solve \\(3 e^{0.2 t} = 15\\) for \\(t\\).",
      solution:
        "Divide by 3: \\(e^{0.2 t} = 5\\). Take \\(\\ln\\): \\(0.2 t = \\ln 5\\). So \\(t = \\ln(5) / 0.2 \\approx 8.047\\).",
    },
    commonMistakes: [
      "Taking logs before isolating the exponential term.",
      "Flipping inequality when the base is \\(>1\\) (it doesn't flip).",
      "Skipping the domain check on log equations.",
    ],
    quiz: [
      {
        q: "Solve \\(e^{2x} = 7\\).",
        choices: ["\\(x = \\ln 7\\)", "\\(x = \\ln 7/2\\)", "\\(x = 2 \\ln 7\\)", "\\(x = e^{7/2}\\)"],
        answerIndex: 1,
        explanation: "Take ln: 2x = ln 7, so x = (ln 7)/2.",
      },
      {
        q: "Solve the inequality \\(2^x > 16\\).",
        choices: ["\\(x > 4\\)", "\\(x > 2\\)", "\\(x < 4\\)", "\\(x > 8\\)"],
        answerIndex: 0,
        explanation: "\\(16 = 2^4\\). Since base > 1, the inequality is preserved: x > 4.",
      },
      {
        q: "What is the solution to \\(\\log_3(x - 1) = 2\\)?",
        choices: ["\\(x = 6\\)", "\\(x = 9\\)", "\\(x = 10\\)", "\\(x = 4\\)"],
        answerIndex: 2,
        explanation: "Exponentiate: x − 1 = 3² = 9, so x = 10.",
      },
      {
        q: "A $1000 investment compounds continuously at 5% per year. How long until it reaches $2000?",
        choices: ["\\(t = \\ln(2)/0.05 \\approx 13.86\\) years", "\\(t = 2/0.05 = 40\\) years", "\\(t = \\log_2(1000) \\approx 9.97\\) years", "\\(t = e^2 \\approx 7.4\\) years"],
        answerIndex: 0,
        explanation: "Solve \\(1000 e^{0.05 t} = 2000 \\Rightarrow e^{0.05 t} = 2 \\Rightarrow t = \\ln(2)/0.05 \\approx 13.86\\).",
      },
    ],
  },

  "2.14": {
    id: "2.14",
    title: "Logarithmic Function Context and Data Modeling",
    summary:
      "Logarithmic models fit data where the rate of change diminishes over time — sensation, diminishing returns, or log-transformed quantities.",
    lesson:
      "Logarithmic models have the form \\(f(t) = a + b \\ln(t)\\) or \\(f(t) = a + b \\log_{10}(t)\\). They're appropriate when the data grows but with a rate that decreases as the input increases. Classic applications: perceived loudness (decibels), earthquake intensity (Richter), acidity (pH), and diminishing returns in economics.\n\nTo fit a model given two points \\((t_1, f_1)\\) and \\((t_2, f_2)\\), use the two equations \\(f_1 = a + b \\ln(t_1)\\) and \\(f_2 = a + b \\ln(t_2)\\), and solve the linear system for \\(a\\) and \\(b\\). Subtract to eliminate \\(a\\): \\(b = (f_2 - f_1) / (\\ln(t_2) - \\ln(t_1))\\), then back-solve for \\(a\\).\n\nThe interpretation sentence matters: \"For every doubling of \\(t\\), \\(f\\) increases by about \\(b \\ln(2)\\) units.\" This captures the diminishing-returns flavor cleanly and is exactly the kind of explanation AP graders reward.",
    keyIdeas: [
      "Form: \\(f(t) = a + b \\ln(t)\\) or \\(a + b \\log(t)\\).",
      "Appropriate when growth rate diminishes.",
      "Two points + linear-system solve to get \\(a, b\\).",
      "\"Per doubling of \\(t\\), \\(f\\) changes by \\(b \\ln 2\\).\"",
    ],
    workedExample: {
      prompt:
        "Data: \\((1, 2)\\) and \\((e^2, 6)\\). Fit \\(f(t) = a + b \\ln(t)\\).",
      solution:
        "\\(f(1) = 2 \\Rightarrow a + b \\cdot 0 = 2 \\Rightarrow a = 2\\). \\(f(e^2) = 6 \\Rightarrow 2 + 2 b = 6 \\Rightarrow b = 2\\). Model: \\(f(t) = 2 + 2 \\ln(t)\\).",
    },
    commonMistakes: [
      "Forgetting that \\(\\ln(1) = 0\\) gives you \\(a\\) directly.",
      "Using exponential model when the data actually diminishes.",
      "Mixing up \\(\\log\\) and \\(\\ln\\) when interpreting \\(b\\).",
    ],
    quiz: [
      {
        q: "A logarithmic model \\(f(t) = a + b \\ln(t)\\) passes through \\((1, 5)\\) and \\((e, 8)\\). Find \\(a\\).",
        choices: ["\\(a = 5\\)", "\\(a = 8\\)", "\\(a = 3\\)", "\\(a = e\\)"],
        answerIndex: 0,
        explanation: "At t = 1, ln(1) = 0, so f(1) = a = 5.",
      },
      {
        q: "Logarithmic models are most appropriate when:",
        choices: ["Data grows without bound at a constant rate.", "Data grows but the rate diminishes over time.", "Data oscillates.", "Data decays to zero."],
        answerIndex: 1,
        explanation: "Logs capture rapid initial change that slows down — the diminishing returns pattern.",
      },
      {
        q: "Earthquake magnitude on the Richter scale is modeled with what kind of function?",
        choices: ["Linear", "Exponential", "Logarithmic", "Polynomial"],
        answerIndex: 2,
        explanation: "The Richter scale is logarithmic: each unit represents a 10× increase in amplitude.",
      },
      {
        q: "Given \\(f(t) = 3 + 4 \\log_{10}(t)\\), find \\(f(100)\\).",
        choices: ["7", "11", "103", "12"],
        answerIndex: 1,
        explanation: "log(100) = 2, so f(100) = 3 + 4(2) = 11.",
      },
    ],
  },

  "2.15": {
    id: "2.15",
    title: "Semi-log Plots",
    summary:
      "A semi-log plot puts the y-axis on a log scale. Exponential data becomes a straight line — the ultimate diagnostic.",
    lesson:
      "On a semi-log plot, the x-axis is linear but the y-axis is logarithmic. If you plot \\(y = a b^x\\) on a semi-log graph, you're really plotting \\(\\log y = \\log a + x \\log b\\), which is a linear function of \\(x\\) with slope \\(\\log b\\) and y-intercept \\(\\log a\\). So exponential data appears as a straight line. That's the whole point.\n\nThis gives you a quick diagnostic: take your data, plot on semi-log paper (or log-transform the y-values and plot on normal axes). If the points line up, the underlying model is exponential. The slope of that line tells you \\(\\log b\\), so \\(b = 10^{\\text{slope}}\\). The y-intercept tells you \\(\\log a\\), so \\(a = 10^{\\text{y-intercept}}\\).\n\nOn the FRQ, the CED often provides a semi-log plot and asks you to (1) recognize the underlying model is exponential, (2) extract parameters from the line's slope and intercept, and (3) back-transform to give \\(a b^x\\). Make sure you know whether the log scale is base 10 or base \\(e\\) — the back-transformation depends on it.",
    keyIdeas: [
      "Semi-log plot: linear x, log y.",
      "Exponential \\(y = a b^x\\) plots as a straight line on semi-log.",
      "Slope on semi-log = \\(\\log b\\); y-intercept = \\(\\log a\\).",
      "Check the base of the log scale before back-transforming.",
    ],
    workedExample: {
      prompt:
        "A semi-log plot (base 10) shows a straight line with y-intercept 2 and slope 0.3. Find the original exponential model \\(y = a b^x\\).",
      solution:
        "On semi-log, \\(\\log y = 2 + 0.3 x\\). Exponentiate: \\(y = 10^2 \\cdot 10^{0.3 x} = 100 \\cdot (10^{0.3})^x \\approx 100 \\cdot 1.995^x \\approx 100 \\cdot 2^x\\). So \\(a = 100\\), \\(b \\approx 2\\).",
    },
    commonMistakes: [
      "Forgetting to exponentiate the intercept to recover \\(a\\).",
      "Using base \\(e\\) when the plot is base 10 (or vice versa).",
      "Reading the slope directly as \\(b\\) instead of \\(\\log b\\).",
    ],
    quiz: [
      {
        q: "On a semi-log (base 10) plot, data forms a straight line. The underlying relationship is:",
        choices: ["Linear", "Exponential", "Quadratic", "Logarithmic"],
        answerIndex: 1,
        explanation: "Exponential functions y = ab^x become linear on a semi-log plot because log(y) = log(a) + x log(b).",
      },
      {
        q: "A semi-log (base 10) plot has y-intercept 1 and slope 0.5. The exponential model \\(y = ab^x\\) has:",
        choices: ["\\(a = 10, b = \\sqrt{10}\\)", "\\(a = 1, b = 0.5\\)", "\\(a = 0.5, b = 1\\)", "\\(a = 10, b = 0.5\\)"],
        answerIndex: 0,
        explanation: "a = 10^(intercept) = 10^1 = 10 and b = 10^(slope) = 10^0.5 = √10.",
      },
      {
        q: "Why is semi-log useful for exponential data?",
        choices: ["It makes the data linear, so slope/intercept reveal the parameters.", "It compresses the range but distorts shape.", "It works best for polynomials.", "It removes outliers automatically."],
        answerIndex: 0,
        explanation: "Exponential data plotted on a semi-log graph becomes a line, from which slope and intercept give log(b) and log(a).",
      },
      {
        q: "On a semi-log plot (natural log), a line has slope \\(k\\). The exponential model is \\(y = a e^{kx}\\) where:",
        choices: ["\\(k\\) is the intercept.", "\\(k\\) is the slope itself.", "\\(k = \\ln(\\text{slope})\\).", "\\(k = e^{\\text{slope}}\\)."],
        answerIndex: 1,
        explanation: "With natural log y-axis, slope equals k directly since ln(y) = ln(a) + kx.",
      },
    ],
  },

  // ===========================================================================
  // UNIT 3 — Trigonometric and Polar Functions
  // ===========================================================================

  "3.1": {
    id: "3.1",
    title: "Periodic Phenomena",
    summary:
      "Periodic functions repeat their values at regular intervals. Period, amplitude, midline, and phase shift are the four features that describe them.",
    lesson:
      "A function \\(f\\) is periodic with period \\(p\\) if \\(f(x + p) = f(x)\\) for every \\(x\\) in the domain, and \\(p\\) is the smallest positive number for which this holds. Periodic phenomena appear everywhere in the real world: sound waves, tides, heartbeats, seasonal temperatures, orbital positions — all repeat with characteristic periods.\n\nFour quantities describe a periodic function: (1) period \\(p\\), the length of one cycle; (2) amplitude \\(A\\), half the vertical distance between max and min; (3) midline \\(y = k\\), the horizontal line halfway between max and min; (4) phase shift, the horizontal offset of the \"start\" of the cycle. The CED expects you to read all four off a graph or extract them from a contextual description.\n\nAmplitude is always non-negative, and midline is always a horizontal line. Period is measured in input units (seconds, days, radians, etc.) — never in y-units. Phase shift is a horizontal number, often expressed as a fraction of the period.",
    keyIdeas: [
      "Periodic: \\(f(x + p) = f(x)\\); \\(p\\) is the period.",
      "Amplitude = \\((\\max - \\min)/2\\).",
      "Midline = \\((\\max + \\min)/2\\).",
      "Phase shift is horizontal offset; period is in x-units.",
    ],
    workedExample: {
      prompt:
        "A tide table shows the water level oscillates between 2 ft and 8 ft, repeating every 12 hours. Find the period, amplitude, and midline.",
      solution:
        "Period: 12 hours. Amplitude: \\((8 - 2)/2 = 3\\) ft. Midline: \\((8 + 2)/2 = 5\\) ft, i.e. \\(y = 5\\).",
    },
    commonMistakes: [
      "Using \\(\\max - \\min\\) as amplitude instead of half that.",
      "Reporting period in feet when it should be in hours.",
      "Confusing midline with the average of two endpoint values instead of max and min.",
    ],
    quiz: [
      {
        q: "A periodic function reaches max 14 and min 2. Its amplitude is:",
        choices: ["12", "8", "7", "6"],
        answerIndex: 3,
        explanation: "Amplitude = (max − min)/2 = (14 − 2)/2 = 6.",
      },
      {
        q: "A wave has max 10 and min \\(-4\\). Its midline is:",
        choices: ["\\(y = 0\\)", "\\(y = 3\\)", "\\(y = 7\\)", "\\(y = 6\\)"],
        answerIndex: 1,
        explanation: "Midline = (max + min)/2 = (10 + (−4))/2 = 3.",
      },
      {
        q: "A function repeats every 5 seconds. What is its period?",
        choices: ["0.2 seconds", "5 seconds", "10 seconds", "\\(2\\pi\\) seconds"],
        answerIndex: 1,
        explanation: "Period is the length of one full cycle, which is 5 seconds here.",
      },
      {
        q: "For a sinusoidal function modeling tide height, amplitude is measured in:",
        choices: ["Hours (x-units)", "Feet (y-units)", "Radians", "Cycles per hour"],
        answerIndex: 1,
        explanation: "Amplitude is a vertical (y) quantity; for tide height it is measured in feet.",
      },
    ],
  },

  "3.2": {
    id: "3.2",
    title: "Sine, Cosine, and Tangent",
    summary:
      "Sine, cosine, and tangent are defined from the unit circle. They encode horizontal and vertical components of angles.",
    lesson:
      "Given a unit circle (radius 1, centered at origin) and an angle \\(\\theta\\) measured counterclockwise from the positive x-axis, the terminal side of \\(\\theta\\) hits the circle at a point \\((\\cos\\theta, \\sin\\theta)\\). So cosine is the x-coordinate and sine is the y-coordinate of that point. Tangent is \\(\\tan\\theta = \\sin\\theta / \\cos\\theta\\), which geometrically is the slope of the terminal side.\n\nThis definition extends trig beyond right triangles (where \\(\\sin\\theta = \\text{opposite}/\\text{hypotenuse}\\)) to all angles, including negative ones and angles larger than \\(2\\pi\\). The unit circle makes the signs automatic: quadrant I gives \\(+\\cos, +\\sin\\); II gives \\(-\\cos, +\\sin\\); III gives \\(-\\cos, -\\sin\\); IV gives \\(+\\cos, -\\sin\\).\n\nThe fundamental identity \\(\\cos^2\\theta + \\sin^2\\theta = 1\\) is just the unit-circle equation \\(x^2 + y^2 = 1\\) written in trig form. Every Pythagorean identity in the course derives from this one.",
    keyIdeas: [
      "Unit circle: \\((\\cos\\theta, \\sin\\theta)\\) is the terminal point for angle \\(\\theta\\).",
      "Tangent is the slope of the terminal ray.",
      "Signs depend on quadrant: remember ASTC.",
      "\\(\\cos^2\\theta + \\sin^2\\theta = 1\\) always holds.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\sin\\theta\\) and \\(\\cos\\theta\\) if \\(\\theta = 5\\pi/6\\).",
      solution:
        "\\(5\\pi/6\\) is in quadrant II, with reference angle \\(\\pi/6\\). \\(\\cos(\\pi/6) = \\sqrt{3}/2\\), \\(\\sin(\\pi/6) = 1/2\\). In QII, cosine is negative and sine is positive. So \\(\\cos(5\\pi/6) = -\\sqrt{3}/2\\), \\(\\sin(5\\pi/6) = 1/2\\).",
    },
    commonMistakes: [
      "Getting signs wrong by quadrant.",
      "Mixing up sine and cosine for reference angles.",
      "Leaving the angle in degrees when radians are expected.",
    ],
    quiz: [
      {
        q: "The coordinates on the unit circle for angle \\(\\theta\\) are:",
        choices: ["\\((\\sin\\theta, \\cos\\theta)\\)", "\\((\\cos\\theta, \\sin\\theta)\\)", "\\((\\tan\\theta, 1)\\)", "\\((1, \\tan\\theta)\\)"],
        answerIndex: 1,
        explanation: "Unit circle gives x = cos θ and y = sin θ.",
      },
      {
        q: "Which quadrant has both sine and cosine negative?",
        choices: ["I", "II", "III", "IV"],
        answerIndex: 2,
        explanation: "In Quadrant III both x and y are negative, so both cos and sin are negative.",
      },
      {
        q: "If \\(\\cos\\theta = 3/5\\) and \\(\\theta\\) is in Quadrant IV, what is \\(\\sin\\theta\\)?",
        choices: ["\\(4/5\\)", "\\(-4/5\\)", "\\(-3/5\\)", "\\(3/5\\)"],
        answerIndex: 1,
        explanation: "\\(\\sin^2 + \\cos^2 = 1 \\Rightarrow \\sin\\theta = \\pm 4/5\\). In QIV sine is negative, so \\(\\sin\\theta = -4/5\\).",
      },
      {
        q: "The identity \\(\\cos^2\\theta + \\sin^2\\theta = 1\\) comes from:",
        choices: ["The distance formula", "The unit circle equation \\(x^2 + y^2 = 1\\)", "A definition of tangent", "A double-angle formula"],
        answerIndex: 1,
        explanation: "Since (cos θ, sin θ) is on the unit circle x² + y² = 1, substituting gives \\(\\cos^2 + \\sin^2 = 1\\).",
      },
    ],
    diagram: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
      ${AXIS}
      <circle cx="200" cy="120" r="90" fill="none" stroke="#c2410c" stroke-width="2" />
      <line x1="200" y1="120" x2="264" y2="56" stroke="#c2410c" stroke-width="2" />
      <line x1="264" y1="56" x2="264" y2="120" stroke="#c2410c" stroke-width="1.5" stroke-dasharray="3 3" />
      <line x1="200" y1="120" x2="264" y2="120" stroke="#c2410c" stroke-width="1.5" stroke-dasharray="3 3" />
      <circle cx="264" cy="56" r="3" fill="#c2410c" />
      <text x="270" y="52" font-family="ui-sans-serif" font-size="10" fill="#c2410c">(cos\u03b8, sin\u03b8)</text>
      <text x="220" y="105" font-family="ui-sans-serif" font-size="10" fill="#6b6b6b">\u03b8</text>
    </svg>`,
  },

  "3.3": {
    id: "3.3",
    title: "Sine and Cosine Function Values",
    summary:
      "You need exact values for \\(0, \\pi/6, \\pi/4, \\pi/3, \\pi/2\\) and their reflections around the unit circle.",
    lesson:
      "The AP exam expects you to know the exact values of sine and cosine for the standard angles \\(0, \\pi/6, \\pi/4, \\pi/3, \\pi/2\\) and all their reflections in the other three quadrants. Memorize the mini-table:\n\n\\(\\sin 0 = 0, \\sin(\\pi/6) = 1/2, \\sin(\\pi/4) = \\sqrt{2}/2, \\sin(\\pi/3) = \\sqrt{3}/2, \\sin(\\pi/2) = 1\\).\n\nCosines are the same values read backward: \\(\\cos 0 = 1, \\cos(\\pi/6) = \\sqrt{3}/2, \\cos(\\pi/4) = \\sqrt{2}/2, \\cos(\\pi/3) = 1/2, \\cos(\\pi/2) = 0\\).\n\nFor angles in other quadrants, find the reference angle (the acute angle to the x-axis), look up its sine/cosine from the above, then apply the quadrant's sign: ASTC — All (QI), Sine (QII), Tangent (QIII), Cosine (QIV) are positive.\n\nThese exact values matter because on the no-calculator multiple choice, you'll encounter angles like \\(2\\pi/3\\) or \\(7\\pi/4\\) and must reduce them to reference angles fast. Being slow here costs you time across multiple problems.",
    keyIdeas: [
      "Memorize sine/cosine at \\(0, \\pi/6, \\pi/4, \\pi/3, \\pi/2\\).",
      "Reflections into QII, III, IV use the reference angle + a sign flip.",
      "ASTC mnemonic tells you which sign in which quadrant.",
      "Radians are the default on AP; degrees appear in labeled contexts.",
    ],
    workedExample: {
      prompt: "Find \\(\\cos(4\\pi/3)\\).",
      solution:
        "\\(4\\pi/3\\) is in QIII (between \\(\\pi\\) and \\(3\\pi/2\\)). Reference angle: \\(4\\pi/3 - \\pi = \\pi/3\\). \\(\\cos(\\pi/3) = 1/2\\). In QIII, cosine is negative. So \\(\\cos(4\\pi/3) = -1/2\\).",
    },
    commonMistakes: [
      "Using degree values when the angle is in radians.",
      "Getting the reference angle wrong in QII/III/IV.",
      "Remembering ASTC but flipping S and T.",
    ],
    quiz: [
      {
        q: "Find \\(\\sin(2\\pi/3)\\).",
        choices: ["\\(1/2\\)", "\\(-1/2\\)", "\\(\\sqrt{3}/2\\)", "\\(-\\sqrt{3}/2\\)"],
        answerIndex: 2,
        explanation: "2π/3 is in QII with reference angle π/3. sin(π/3) = √3/2 and sine is positive in QII.",
      },
      {
        q: "Evaluate \\(\\cos(7\\pi/6)\\).",
        choices: ["\\(-\\sqrt{3}/2\\)", "\\(\\sqrt{3}/2\\)", "\\(-1/2\\)", "\\(1/2\\)"],
        answerIndex: 0,
        explanation: "7π/6 is in QIII with reference angle π/6. cos(π/6) = √3/2 and cosine is negative in QIII.",
      },
      {
        q: "The reference angle for \\(5\\pi/4\\) is:",
        choices: ["\\(\\pi/4\\)", "\\(\\pi/2\\)", "\\(3\\pi/4\\)", "\\(5\\pi/4\\)"],
        answerIndex: 0,
        explanation: "5π/4 is in QIII. Reference angle = 5π/4 − π = π/4.",
      },
      {
        q: "Which of these equals \\(1/2\\)?",
        choices: ["\\(\\sin(\\pi/3)\\)", "\\(\\cos(\\pi/6)\\)", "\\(\\sin(\\pi/6)\\)", "\\(\\cos 0\\)"],
        answerIndex: 2,
        explanation: "\\(\\sin(\\pi/6) = 1/2\\). The others equal √3/2, √3/2, and 1 respectively.",
      },
    ],
  },

  "3.4": {
    id: "3.4",
    title: "Sine and Cosine Function Graphs",
    summary:
      "The graphs of \\(\\sin x\\) and \\(\\cos x\\) are smooth sinusoids of period \\(2\\pi\\), amplitude 1, oscillating between -1 and 1.",
    lesson:
      "The graph of \\(y = \\sin x\\) starts at the origin, rises to 1 at \\(x = \\pi/2\\), returns to 0 at \\(x = \\pi\\), falls to -1 at \\(x = 3\\pi/2\\), and returns to 0 at \\(x = 2\\pi\\) to complete one cycle. The graph of \\(y = \\cos x\\) is identical except shifted left by \\(\\pi/2\\): it starts at 1 at \\(x = 0\\), descends to 0 at \\(\\pi/2\\), to -1 at \\(\\pi\\), to 0 at \\(3\\pi/2\\), and back to 1 at \\(2\\pi\\).\n\nBoth functions are periodic with period \\(2\\pi\\), have amplitude 1, midline \\(y = 0\\), and zero phase shift in their parent form. Sine is odd (\\(\\sin(-x) = -\\sin x\\)) and cosine is even (\\(\\cos(-x) = \\cos x\\)). These symmetries show up in the graphs: sine has rotational symmetry about the origin; cosine has reflective symmetry across the y-axis.\n\nRecognizing the five key points per cycle (start, max, mid, min, end) lets you sketch any transformed sinusoid quickly. Just apply the transformation rules from Unit 1 to those five points, and connect smoothly.",
    keyIdeas: [
      "Period \\(2\\pi\\), amplitude 1, midline \\(y = 0\\).",
      "\\(\\sin\\) is odd; \\(\\cos\\) is even.",
      "\\(\\cos x = \\sin(x + \\pi/2)\\) — cosine is sine shifted left.",
      "Five key points per cycle: zero, max, zero, min, zero (for sine).",
    ],
    workedExample: {
      prompt:
        "Sketch \\(y = \\sin x\\) on \\([0, 2\\pi]\\). Label the max, min, and x-intercepts.",
      solution:
        "Five key points: \\((0, 0)\\), \\((\\pi/2, 1)\\) [max], \\((\\pi, 0)\\), \\((3\\pi/2, -1)\\) [min], \\((2\\pi, 0)\\). Connect smoothly. The curve passes through the origin rising, peaks at \\(\\pi/2\\), crosses down at \\(\\pi\\), bottoms out at \\(3\\pi/2\\), and returns to zero at \\(2\\pi\\).",
    },
    commonMistakes: [
      "Starting cosine at zero instead of 1.",
      "Drawing corners instead of smooth curves at max/min.",
      "Miscounting key points between max and min.",
    ],
    quiz: [
      {
        q: "What is the period of \\(y = \\sin x\\)?",
        choices: ["\\(\\pi\\)", "\\(2\\pi\\)", "\\(4\\pi\\)", "\\(\\pi/2\\)"],
        answerIndex: 1,
        explanation: "The basic sine function repeats every 2π.",
      },
      {
        q: "At \\(x = 0\\), which is true?",
        choices: ["\\(\\sin 0 = 1\\)", "\\(\\cos 0 = 0\\)", "\\(\\sin 0 = 0, \\cos 0 = 1\\)", "\\(\\sin 0 = -1\\)"],
        answerIndex: 2,
        explanation: "sin(0) = 0 and cos(0) = 1 by the unit circle definition at angle 0.",
      },
      {
        q: "Which statement about symmetry is correct?",
        choices: ["Sine is even; cosine is odd.", "Sine is odd; cosine is even.", "Both are even.", "Both are odd."],
        answerIndex: 1,
        explanation: "\\(\\sin(-x) = -\\sin x\\) (odd); \\(\\cos(-x) = \\cos x\\) (even).",
      },
      {
        q: "Where does \\(y = \\cos x\\) reach its minimum on \\([0, 2\\pi]\\)?",
        choices: ["\\(x = 0\\)", "\\(x = \\pi/2\\)", "\\(x = \\pi\\)", "\\(x = 2\\pi\\)"],
        answerIndex: 2,
        explanation: "\\(\\cos(\\pi) = -1\\) is the minimum of cosine on [0, 2π].",
      },
    ],
    diagram: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
      ${AXIS}
      <path d="M25 120 Q60 50 120 50 Q180 50 200 120 Q220 190 280 190 Q340 190 375 120" fill="none" stroke="#c2410c" stroke-width="2.4" />
      <circle cx="120" cy="50" r="3" fill="#c2410c" />
      <circle cx="200" cy="120" r="3" fill="#c2410c" />
      <circle cx="280" cy="190" r="3" fill="#c2410c" />
      <text x="100" y="42" font-family="ui-sans-serif" font-size="10" fill="#c2410c">max = 1</text>
      <text x="260" y="208" font-family="ui-sans-serif" font-size="10" fill="#c2410c">min = \u22121</text>
      <text x="205" y="140" font-family="ui-sans-serif" font-size="10" fill="#6b6b6b">\u03c0</text>
    </svg>`,
  },

  "3.5": {
    id: "3.5",
    title: "Sinusoidal Functions",
    summary:
      "A sinusoidal function is any vertical shift, scale, and horizontal shift/scale of sine or cosine: \\(f(x) = A \\sin(B(x - C)) + D\\).",
    lesson:
      "The general sinusoidal form is \\(f(x) = A \\sin(B(x - C)) + D\\) or the same with cosine. Each parameter has a geometric meaning:\n\n- \\(|A|\\) is the amplitude.\n- \\(B\\) scales the period: period \\(= 2\\pi/|B|\\).\n- \\(C\\) is the phase shift (horizontal offset).\n- \\(D\\) is the midline (vertical offset).\n\nA negative \\(A\\) flips the graph upside down (equivalent to a phase shift of \\(\\pi\\) for sine). A negative \\(B\\) reflects horizontally but gives the same graph as a phase shift. To convert between sine and cosine, remember \\(\\cos x = \\sin(x + \\pi/2)\\), so a cosine is just a sine shifted left by \\(\\pi/2\\) (equivalently, \\(C = \\pi/2\\)).\n\nTo read parameters from a graph: midline first (\\(D\\) is the average of max and min), then amplitude (\\(|A|\\) is half the distance between them), then period (measure one full cycle), then \\(B = 2\\pi/\\text{period}\\), then phase shift by checking where the function hits its max or crosses the midline going up.",
    keyIdeas: [
      "General form: \\(A \\sin(B(x - C)) + D\\).",
      "Period \\(= 2\\pi/|B|\\).",
      "Amplitude \\(= |A|\\), midline \\(y = D\\), phase shift \\(= C\\).",
      "Read midline \\(\\to\\) amplitude \\(\\to\\) period \\(\\to\\) phase shift, in that order.",
    ],
    workedExample: {
      prompt:
        "Write a sinusoidal function for a wave with max 10, min 2, period 4, and starting at max at \\(x = 1\\).",
      solution:
        "Midline: \\(D = (10 + 2)/2 = 6\\). Amplitude: \\(A = (10 - 2)/2 = 4\\). \\(B = 2\\pi/4 = \\pi/2\\). Since the function starts at max at \\(x = 1\\), use cosine (max at phase): \\(f(x) = 4 \\cos(\\frac{\\pi}{2}(x - 1)) + 6\\).",
    },
    commonMistakes: [
      "Using \\(B = 4\\) when the period is 4 (should be \\(B = 2\\pi/4\\)).",
      "Putting \\(C\\) inside without the factor of \\(B\\).",
      "Forgetting the midline when the data doesn't oscillate around zero.",
    ],
    quiz: [
      {
        q: "For \\(f(x) = 4 \\sin(2x) + 3\\), the amplitude is:",
        choices: ["2", "3", "4", "8"],
        answerIndex: 2,
        explanation: "Amplitude = |A| = 4.",
      },
      {
        q: "The period of \\(y = \\sin(3x)\\) is:",
        choices: ["\\(2\\pi\\)", "\\(2\\pi/3\\)", "\\(3/(2\\pi)\\)", "\\(\\pi/3\\)"],
        answerIndex: 1,
        explanation: "Period of \\(\\sin(Bx)\\) is \\(2\\pi/|B|\\); with B = 3, period = 2π/3.",
      },
      {
        q: "The midline of \\(y = 2 \\cos x - 5\\) is:",
        choices: ["\\(y = 0\\)", "\\(y = -5\\)", "\\(y = 5\\)", "\\(y = -3\\)"],
        answerIndex: 1,
        explanation: "The constant added outside the trig function (D = −5) gives the midline.",
      },
      {
        q: "What is \\(B\\) if a sinusoidal function has period \\(\\pi/2\\)?",
        choices: ["2", "\\(\\pi\\)", "4", "\\(2\\pi\\)"],
        answerIndex: 2,
        explanation: "Period = 2π/|B| = π/2 ⟹ |B| = 4.",
      },
    ],
  },

  "3.6": {
    id: "3.6",
    title: "Sinusoidal Function Transformations",
    summary:
      "Transformations on sinusoids follow the same rules as polynomial transformations, but with amplitude and period in place of stretch and length.",
    lesson:
      "A sinusoidal transformation is just the general Unit 1 transformation applied to \\(\\sin\\) or \\(\\cos\\). Given \\(f(x) = A \\sin(B(x - C)) + D\\):\n\n- \\(A\\) stretches vertically by \\(|A|\\); negative \\(A\\) reflects across the midline.\n- \\(B\\) compresses horizontally by factor \\(|B|\\); negative \\(B\\) reflects across the y-axis (same graph as \\(C \\to -C\\)).\n- \\(C\\) shifts right by \\(C\\).\n- \\(D\\) shifts up by \\(D\\).\n\nOrder matters for horizontal operations: factor \\(B\\) out first so the shift is clearly \\(x - C\\). If the function is written \\(A \\sin(Bx - \\phi) + D\\), you must factor to get \\(A \\sin(B(x - \\phi/B)) + D\\) before reading the phase shift as \\(\\phi/B\\), not \\(\\phi\\).\n\nOn FRQs, the CED often asks you to transform a graph to match a description: doubling the amplitude, halving the period, shifting right, etc. Walk through each parameter in order and write a sentence for each transformation.",
    keyIdeas: [
      "Factor \\(B\\) before reading the phase shift.",
      "Amplitude stretch doesn't affect period.",
      "Horizontal compression and reflection interact via \\(B\\).",
      "Transformations compose the same way as polynomial ones.",
    ],
    workedExample: {
      prompt:
        "Rewrite \\(f(x) = 3 \\sin(2x - \\pi) + 1\\) in the form \\(A \\sin(B(x - C)) + D\\) and read the parameters.",
      solution:
        "Factor 2 out of the argument: \\(2x - \\pi = 2(x - \\pi/2)\\). So \\(f(x) = 3 \\sin(2(x - \\pi/2)) + 1\\). Parameters: \\(A = 3\\), \\(B = 2\\), \\(C = \\pi/2\\), \\(D = 1\\). Period \\(= 2\\pi/2 = \\pi\\). Amplitude 3. Midline \\(y = 1\\). Phase shift right by \\(\\pi/2\\).",
    },
    commonMistakes: [
      "Reading phase shift as \\(\\pi\\) instead of \\(\\pi/2\\) in the example.",
      "Swapping the order of amplitude stretch and vertical shift.",
      "Forgetting negative \\(B\\) can be absorbed into a sign flip of \\(C\\).",
    ],
    quiz: [
      {
        q: "The phase shift of \\(y = \\sin(2x - \\pi)\\) is:",
        choices: ["\\(\\pi\\) right", "\\(\\pi/2\\) right", "\\(\\pi/2\\) left", "\\(2\\pi\\) right"],
        answerIndex: 1,
        explanation: "Factor: \\(\\sin(2(x - \\pi/2))\\), so phase shift is π/2 to the right.",
      },
      {
        q: "A transformation \\(y = -3 \\sin x\\) relative to \\(y = \\sin x\\):",
        choices: ["Stretches amplitude to 3 and reflects across x-axis.", "Stretches amplitude to 3 and reflects across y-axis.", "Just stretches to 3.", "Reduces amplitude to 1/3."],
        answerIndex: 0,
        explanation: "A = −3: absolute value 3 gives vertical stretch of amplitude, and the negative sign reflects across the x-axis.",
      },
      {
        q: "The graph \\(y = \\cos(x + \\pi/2)\\) is the same as:",
        choices: ["\\(y = \\sin x\\)", "\\(y = -\\sin x\\)", "\\(y = \\cos x\\)", "\\(y = -\\cos x\\)"],
        answerIndex: 1,
        explanation: "\\(\\cos(x + \\pi/2) = -\\sin x\\) by the co-function identity.",
      },
      {
        q: "Rewrite \\(\\sin(3x + 6)\\) in the form \\(\\sin(B(x - C))\\).",
        choices: ["\\(\\sin(3(x + 2))\\)", "\\(\\sin(3(x - 2))\\)", "\\(\\sin(3(x + 6))\\)", "\\(\\sin(3(x - 6))\\)"],
        answerIndex: 0,
        explanation: "Factor 3 from argument: 3x + 6 = 3(x + 2), so \\(\\sin(3(x-(-2))) = \\sin(3(x+2))\\).",
      },
    ],
  },

  "3.7": {
    id: "3.7",
    title: "Sinusoidal Function Context and Data Modeling",
    summary:
      "Pick sinusoidal models when data oscillates. Extract max, min, period, and starting phase from the situation, then write \\(A \\sin(B(x - C)) + D\\).",
    lesson:
      "Contextual sinusoidal modeling comes in three stages. (1) Recognize oscillation: the description mentions a max, a min, and a repeat cycle. (2) Pull out the four parameters from whatever language the problem uses — maximum and minimum give you midline and amplitude; period (length of one cycle) gives \\(B = 2\\pi/\\text{period}\\); the time at which the max or midline occurs gives phase shift. (3) Pick sine or cosine for convenience — if the problem tells you when the max occurs, cosine is cleaner (cosine starts at max); if it tells you when the midline crossing occurs, sine is cleaner.\n\nTypical applications: tidal heights, daylight hours across the year, temperatures over seasons, Ferris wheel heights, sound waves, spring oscillations. Each looks different in the prompt but reduces to the same four-parameter extraction.\n\nAfter writing the model, always verify by plugging in a known point and checking it matches the description. Then interpret: \"The maximum tide height is 8 ft, occurring every 12 hours, and the tide oscillates around a mean of 5 ft.\"",
    keyIdeas: [
      "Midline = \\((\\max + \\min)/2\\); amplitude \\(=(\\max - \\min)/2\\).",
      "\\(B = 2\\pi/\\text{period}\\).",
      "Pick cosine when starting at max, sine when starting at midline going up.",
      "Verify your model against a known data point.",
    ],
    workedExample: {
      prompt:
        "A Ferris wheel has radius 15 m, bottom 2 m above ground, and one rotation every 40 seconds. A rider boards at the bottom at \\(t = 0\\). Write \\(h(t)\\).",
      solution:
        "Max height: \\(2 + 30 = 32\\). Min height: 2. Midline: \\((32 + 2)/2 = 17\\). Amplitude: 15. Period: 40, so \\(B = 2\\pi/40 = \\pi/20\\). Rider starts at minimum, so use \\(-\\cos\\) or \\(\\cos\\) with phase shift. Simplest: \\(h(t) = -15 \\cos(\\frac{\\pi}{20} t) + 17\\). Check: \\(h(0) = -15 + 17 = 2\\). Correct.",
    },
    commonMistakes: [
      "Mixing up the radius and diameter when computing amplitude.",
      "Forgetting the midline is the center of the wheel, not the bottom.",
      "Using \\(+\\cos\\) when the rider starts at the minimum.",
    ],
    quiz: [
      {
        q: "Tides at a bay oscillate between 2 ft (low) and 12 ft (high), cycle every 12 hours. Which sinusoidal model fits the height?",
        choices: ["\\(h(t) = 7 + 5\\cos(\\pi t/6)\\)", "\\(h(t) = 7 + 10\\cos(\\pi t/6)\\)", "\\(h(t) = 5 + 7\\cos(\\pi t/12)\\)", "\\(h(t) = 12 + 2\\cos(2\\pi t)\\)"],
        answerIndex: 0,
        explanation: "Midline = 7, amplitude = 5, B = 2π/12 = π/6. A model starting at max at t=0 uses +cos.",
      },
      {
        q: "A Ferris wheel has radius 20 ft and center 22 ft above ground. The amplitude and midline of its height function are:",
        choices: ["Amplitude 22, midline 20", "Amplitude 20, midline 22", "Amplitude 40, midline 11", "Amplitude 10, midline 22"],
        answerIndex: 1,
        explanation: "Amplitude equals the radius (20). Midline equals the height of the center (22).",
      },
      {
        q: "If a wave starts at its midline moving upward at \\(t = 0\\), which parent is simplest to use?",
        choices: ["\\(\\cos t\\)", "\\(-\\cos t\\)", "\\(\\sin t\\)", "\\(-\\sin t\\)"],
        answerIndex: 2,
        explanation: "Sine starts at 0 moving upward — that matches \"midline, going up.\"",
      },
      {
        q: "For a sinusoidal model with period 24 (hours), the value of \\(B\\) is:",
        choices: ["\\(24\\)", "\\(\\pi/12\\)", "\\(2\\pi\\)", "\\(12\\)"],
        answerIndex: 1,
        explanation: "B = 2π/period = 2π/24 = π/12.",
      },
    ],
  },

  "3.8": {
    id: "3.8",
    title: "The Tangent Function",
    summary:
      "Tangent is \\(\\sin/\\cos\\), with period \\(\\pi\\), vertical asymptotes where cosine vanishes, and no amplitude or midline.",
    lesson:
      "The tangent function \\(\\tan x = \\sin x / \\cos x\\) has very different behavior from sine and cosine. Its period is \\(\\pi\\) (not \\(2\\pi\\)) because the ratio repeats sign every half period. It has vertical asymptotes wherever \\(\\cos x = 0\\), i.e. at \\(x = \\pi/2 + k\\pi\\) for integer \\(k\\). The graph is a series of disconnected S-curves that climb from \\(-\\infty\\) to \\(\\infty\\) across each interval between asymptotes.\n\nWithin one period, say \\((-\\pi/2, \\pi/2)\\), tangent is zero at \\(x = 0\\), equals 1 at \\(\\pi/4\\), blows up as \\(x \\to \\pi/2^-\\), and blows down as \\(x \\to -\\pi/2^+\\). Tangent has no amplitude and no midline — the range is all real numbers.\n\nTransformations of tangent follow the form \\(f(x) = A \\tan(B(x - C)) + D\\). \\(A\\) is a vertical stretch (not amplitude — tangent has none), \\(B\\) rescales the period to \\(\\pi/|B|\\), \\(C\\) is phase shift, \\(D\\) is vertical shift. Crucially, \\(B\\) divides into \\(\\pi\\), not \\(2\\pi\\), when computing the period.",
    keyIdeas: [
      "\\(\\tan x = \\sin x / \\cos x\\), period \\(\\pi\\).",
      "Vertical asymptotes at \\(x = \\pi/2 + k\\pi\\).",
      "No amplitude, no midline; range is all real numbers.",
      "Period of \\(\\tan(Bx)\\) is \\(\\pi/|B|\\), not \\(2\\pi/|B|\\).",
    ],
    workedExample: {
      prompt:
        "Find the period and vertical asymptotes of \\(f(x) = \\tan(2 x)\\) on \\([0, \\pi]\\).",
      solution:
        "Period: \\(\\pi/2\\). Asymptotes where \\(2 x = \\pi/2 + k \\pi\\), i.e. \\(x = \\pi/4 + k \\pi/2\\). On \\([0, \\pi]\\): \\(x = \\pi/4\\) and \\(x = 3\\pi/4\\). So there are two asymptotes in that window.",
    },
    commonMistakes: [
      "Using period \\(2\\pi/B\\) instead of \\(\\pi/B\\).",
      "Reporting amplitude for tangent (it has none).",
      "Missing asymptotes by forgetting to include negative \\(k\\).",
    ],
    quiz: [
      {
        q: "The period of \\(y = \\tan(3x)\\) is:",
        choices: ["\\(2\\pi/3\\)", "\\(3\\pi\\)", "\\(\\pi/3\\)", "\\(3\\)"],
        answerIndex: 2,
        explanation: "Period of tan(Bx) = π/|B| = π/3.",
      },
      {
        q: "Which value of \\(x\\) is a vertical asymptote of \\(\\tan x\\)?",
        choices: ["\\(0\\)", "\\(\\pi\\)", "\\(\\pi/2\\)", "\\(2\\pi\\)"],
        answerIndex: 2,
        explanation: "Tangent has asymptotes wherever cos x = 0, i.e., x = π/2 + kπ.",
      },
      {
        q: "What is the range of \\(\\tan x\\)?",
        choices: ["\\([-1, 1]\\)", "\\((-1, 1)\\)", "All real numbers", "\\([0, \\infty)\\)"],
        answerIndex: 2,
        explanation: "Tangent can take any real value between vertical asymptotes; its range is all real numbers.",
      },
      {
        q: "Evaluate \\(\\tan(\\pi/4)\\).",
        choices: ["0", "1", "\\(\\sqrt{2}/2\\)", "Undefined"],
        answerIndex: 1,
        explanation: "\\(\\tan(\\pi/4) = \\sin(\\pi/4)/\\cos(\\pi/4) = (\\sqrt{2}/2)/(\\sqrt{2}/2) = 1\\).",
      },
    ],
  },

  "3.9": {
    id: "3.9",
    title: "Inverse Trigonometric Functions",
    summary:
      "Inverse trig functions take a ratio and return an angle. Each has a restricted domain to remain one-to-one.",
    lesson:
      "Trig functions aren't one-to-one over their full domains, so to define inverses we restrict each to a sensible slice. The standard choices:\n\n- \\(\\arcsin x\\) or \\(\\sin^{-1} x\\): domain \\([-1, 1]\\), range \\([-\\pi/2, \\pi/2]\\).\n- \\(\\arccos x\\) or \\(\\cos^{-1} x\\): domain \\([-1, 1]\\), range \\([0, \\pi]\\).\n- \\(\\arctan x\\) or \\(\\tan^{-1} x\\): domain all reals, range \\((-\\pi/2, \\pi/2)\\).\n\nThese return principal-value angles, so \\(\\arcsin(1/2) = \\pi/6\\) not \\(5\\pi/6\\) — even though \\(\\sin(5\\pi/6) = 1/2\\) also. On a calculator, \\(\\sin^{-1}\\) only ever returns the principal value, so if a problem asks for all angles satisfying an equation, you have to generate the others manually from symmetry and periodicity.\n\nEvaluating inverse trig composed with trig often simplifies: \\(\\sin(\\arccos x) = \\sqrt{1 - x^2}\\), \\(\\cos(\\arcsin x) = \\sqrt{1 - x^2}\\), etc. Draw a reference triangle with one side \\(x\\) and the others determined by \\(\\sin^2 + \\cos^2 = 1\\) to compute these fast.",
    keyIdeas: [
      "Inverse trig takes a ratio, returns the principal angle.",
      "\\(\\arcsin\\) range: \\([-\\pi/2, \\pi/2]\\); \\(\\arccos\\): \\([0, \\pi]\\); \\(\\arctan\\): \\((-\\pi/2, \\pi/2)\\).",
      "Calculators return principal values only — adjust for all solutions manually.",
      "Compositions simplify using reference triangles.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\cos(\\arcsin(3/5))\\).",
      solution:
        "Let \\(\\theta = \\arcsin(3/5)\\), so \\(\\sin\\theta = 3/5\\) with \\(\\theta \\in [-\\pi/2, \\pi/2]\\). Draw a right triangle with opposite 3 and hypotenuse 5; adjacent \\(= \\sqrt{25 - 9} = 4\\). Since \\(\\theta\\) is in QI or QIV and sine is positive, \\(\\theta\\) is in QI where cosine is positive. So \\(\\cos\\theta = 4/5\\).",
    },
    commonMistakes: [
      "Forgetting to restrict the output to the principal range.",
      "Treating \\(\\sin^{-1}\\) as \\(1/\\sin\\).",
      "Choosing the wrong quadrant when composing.",
    ],
    quiz: [
      {
        q: "Evaluate \\(\\arcsin(1/2)\\).",
        choices: ["\\(\\pi/6\\)", "\\(5\\pi/6\\)", "\\(\\pi/3\\)", "\\(\\pi/2\\)"],
        answerIndex: 0,
        explanation: "Principal value: arcsin(1/2) = π/6 (in [−π/2, π/2]).",
      },
      {
        q: "The range of \\(\\arccos\\) is:",
        choices: ["\\([-\\pi/2, \\pi/2]\\)", "\\([0, \\pi]\\)", "\\((-\\pi/2, \\pi/2)\\)", "All real numbers"],
        answerIndex: 1,
        explanation: "By convention, arccos returns values in [0, π].",
      },
      {
        q: "Evaluate \\(\\cos(\\arctan(1))\\).",
        choices: ["\\(1/\\sqrt{2}\\)", "\\(\\sqrt{2}\\)", "\\(1/2\\)", "\\(1\\)"],
        answerIndex: 0,
        explanation: "arctan(1) = π/4, and cos(π/4) = √2/2 = 1/√2.",
      },
      {
        q: "\\(\\sin^{-1}(x)\\) and \\(1/\\sin(x)\\):",
        choices: ["Mean the same thing.", "Are completely different — inverse vs. reciprocal.", "Are always equal.", "Both equal the cosecant."],
        answerIndex: 1,
        explanation: "sin⁻¹ is the inverse function (arcsine); 1/sin is the reciprocal (cosecant). Different functions!",
      },
    ],
  },

  "3.10": {
    id: "3.10",
    title: "Trigonometric Equations and Inequalities",
    summary:
      "Solve trig equations by isolating a trig function, inverting it to find one angle, then using symmetry and periodicity to generate all solutions.",
    lesson:
      "Solving a trig equation is a four-step dance: (1) algebraically isolate the trig function to look like \\(\\sin x = c\\) or similar; (2) use inverse trig to find one angle in the principal range; (3) use symmetry of the unit circle to find all other solutions in \\([0, 2\\pi)\\); (4) add period multiples to capture all solutions.\n\nFor example, \\(\\sin x = 1/2\\) on \\([0, 2\\pi)\\) has two solutions: the principal \\(x = \\pi/6\\), and its quadrant-II partner \\(x = \\pi - \\pi/6 = 5\\pi/6\\). To extend to all real \\(x\\), add \\(2\\pi k\\) for integer \\(k\\) to both.\n\nFor cosine equations \\(\\cos x = c\\), the two solutions in \\([0, 2\\pi)\\) are \\(\\arccos c\\) and \\(2\\pi - \\arccos c\\). For tangent \\(\\tan x = c\\), solutions are \\(\\arctan c + k\\pi\\). Inequalities work by finding the equality solutions first, then testing intervals between them — the same approach as rational inequalities.",
    keyIdeas: [
      "Isolate the trig function first.",
      "Inverse gives one angle; use symmetry for the other in the same period.",
      "Add \\(2\\pi k\\) (or \\(\\pi k\\) for tangent) for all solutions.",
      "Trig inequalities use interval testing between equality points.",
    ],
    workedExample: {
      prompt:
        "Solve \\(2 \\cos x - 1 = 0\\) on \\([0, 2\\pi)\\).",
      solution:
        "Isolate: \\(\\cos x = 1/2\\). Principal: \\(x = \\pi/3\\). Second solution in \\([0, 2\\pi)\\): \\(x = 2\\pi - \\pi/3 = 5\\pi/3\\). Answer: \\(x = \\pi/3\\) or \\(x = 5\\pi/3\\).",
    },
    commonMistakes: [
      "Reporting only the principal solution and missing the second.",
      "Using the wrong symmetry for sine vs cosine.",
      "Forgetting to add period multiples when the domain is all reals.",
    ],
    quiz: [
      {
        q: "How many solutions does \\(\\sin x = 1/2\\) have on \\([0, 2\\pi)\\)?",
        choices: ["1", "2", "3", "4"],
        answerIndex: 1,
        explanation: "Two: \\(x = \\pi/6\\) and \\(x = 5\\pi/6\\) (both in [0, 2π)).",
      },
      {
        q: "Solve \\(2 \\sin x + 1 = 0\\) on \\([0, 2\\pi)\\).",
        choices: ["\\(x = \\pi/6, 5\\pi/6\\)", "\\(x = 7\\pi/6, 11\\pi/6\\)", "\\(x = \\pi/6, 11\\pi/6\\)", "\\(x = \\pi/3, 2\\pi/3\\)"],
        answerIndex: 1,
        explanation: "\\(\\sin x = -1/2\\) in QIII and QIV: x = 7π/6 and x = 11π/6.",
      },
      {
        q: "All solutions of \\(\\tan x = 1\\) are:",
        choices: ["\\(x = \\pi/4\\)", "\\(x = \\pi/4 + 2\\pi k\\)", "\\(x = \\pi/4 + \\pi k\\)", "\\(x = \\pi/4 + \\pi/2 k\\)"],
        answerIndex: 2,
        explanation: "Tangent has period π, so general solution is π/4 + kπ for integer k.",
      },
      {
        q: "Solve \\(\\cos x = 0\\) on \\([0, 2\\pi)\\).",
        choices: ["\\(x = 0, \\pi\\)", "\\(x = \\pi/2, 3\\pi/2\\)", "\\(x = \\pi, 2\\pi\\)", "\\(x = \\pi/4, 5\\pi/4\\)"],
        answerIndex: 1,
        explanation: "cos is zero at π/2 and 3π/2 on [0, 2π).",
      },
    ],
  },

  "3.11": {
    id: "3.11",
    title: "The Secant, Cosecant, and Cotangent Functions",
    summary:
      "Secant, cosecant, and cotangent are reciprocals of cosine, sine, and tangent. They inherit asymptotes and period from their parents.",
    lesson:
      "The three reciprocal trig functions are:\n\n- \\(\\sec x = 1/\\cos x\\)\n- \\(\\csc x = 1/\\sin x\\)\n- \\(\\cot x = \\cos x / \\sin x = 1/\\tan x\\)\n\nSecant has vertical asymptotes wherever cosine is zero, i.e. at \\(x = \\pi/2 + k\\pi\\). Cosecant has asymptotes where sine is zero, i.e. at \\(x = k\\pi\\). Cotangent also has asymptotes where sine is zero, but with period \\(\\pi\\) (matching tangent).\n\nSecant and cosecant have range \\((-\\infty, -1] \\cup [1, \\infty)\\) — they never take values between -1 and 1 because that would require their reciprocal (cosine or sine) to exceed 1 in magnitude, which it can't. Cotangent has range all of \\(\\mathbb{R}\\) like tangent.\n\nGraphs: secant looks like U and upside-down-U shapes between vertical asymptotes, touching the parent cosine's extrema. Cosecant is the same shape above and below the sine curve. Cotangent is tangent's mirror image, decreasing across each period.",
    keyIdeas: [
      "Reciprocal functions: \\(\\sec = 1/\\cos\\), \\(\\csc = 1/\\sin\\), \\(\\cot = 1/\\tan\\).",
      "Asymptotes occur where the parent is zero.",
      "Sec/csc range: \\((-\\infty, -1] \\cup [1, \\infty)\\).",
      "Period: sec, csc = \\(2\\pi\\); cot = \\(\\pi\\).",
    ],
    workedExample: {
      prompt:
        "Find all asymptotes of \\(f(x) = \\sec x\\) on \\([0, 2\\pi]\\).",
      solution:
        "Asymptotes where \\(\\cos x = 0\\): \\(x = \\pi/2\\) and \\(x = 3\\pi/2\\). Two asymptotes on the given interval.",
    },
    commonMistakes: [
      "Using \\(\\sin^{-1}\\) for \\(\\csc\\) — they're different.",
      "Forgetting reciprocals skip the range \\((-1, 1)\\).",
      "Putting secant asymptotes at zero of sine instead of zero of cosine.",
    ],
    quiz: [
      {
        q: "Which function has asymptotes where \\(\\sin x = 0\\)?",
        choices: ["\\(\\sec x\\)", "\\(\\csc x\\)", "\\(\\cos x\\)", "\\(\\tan x\\)"],
        answerIndex: 1,
        explanation: "csc = 1/sin, so asymptotes occur where sin = 0.",
      },
      {
        q: "Evaluate \\(\\sec(\\pi/3)\\).",
        choices: ["\\(1/2\\)", "\\(2\\)", "\\(\\sqrt{3}\\)", "\\(2/\\sqrt{3}\\)"],
        answerIndex: 1,
        explanation: "sec(π/3) = 1/cos(π/3) = 1/(1/2) = 2.",
      },
      {
        q: "The range of \\(\\sec x\\) is:",
        choices: ["All real numbers", "\\([-1, 1]\\)", "\\((-\\infty, -1] \\cup [1, \\infty)\\)", "\\((0, \\infty)\\)"],
        answerIndex: 2,
        explanation: "Secant skips (−1, 1) because its reciprocal (cosine) never exceeds 1 in magnitude.",
      },
      {
        q: "The period of \\(\\cot x\\) is:",
        choices: ["\\(\\pi/2\\)", "\\(\\pi\\)", "\\(2\\pi\\)", "\\(4\\pi\\)"],
        answerIndex: 1,
        explanation: "Cotangent = cos/sin repeats every π (same as tangent).",
      },
    ],
  },

  "3.12": {
    id: "3.12",
    title: "Equivalent Representations of Trigonometric Functions",
    summary:
      "Pythagorean, double-angle, and sum-difference identities let you rewrite trig expressions in a form the problem wants.",
    lesson:
      "The CED expects fluency with the core identities:\n\n- Pythagorean: \\(\\sin^2 x + \\cos^2 x = 1\\), \\(1 + \\tan^2 x = \\sec^2 x\\), \\(1 + \\cot^2 x = \\csc^2 x\\).\n- Co-function: \\(\\sin(\\pi/2 - x) = \\cos x\\), \\(\\cos(\\pi/2 - x) = \\sin x\\).\n- Even/odd: \\(\\sin(-x) = -\\sin x\\), \\(\\cos(-x) = \\cos x\\), \\(\\tan(-x) = -\\tan x\\).\n- Double angle: \\(\\sin(2x) = 2 \\sin x \\cos x\\), \\(\\cos(2x) = \\cos^2 x - \\sin^2 x = 1 - 2\\sin^2 x = 2 \\cos^2 x - 1\\).\n- Sum/difference: \\(\\sin(a \\pm b) = \\sin a \\cos b \\pm \\cos a \\sin b\\), \\(\\cos(a \\pm b) = \\cos a \\cos b \\mp \\sin a \\sin b\\).\n\nThe typical FRQ problem gives you a trig expression and asks you to simplify it, or gives a trig equation and asks you to solve it by first rewriting. Know which identity turns products into sums, which converts \\(\\sin^2\\) to \\(\\cos^2\\) (Pythagorean), and which halves or doubles angles.\n\nA handy move: rewriting expressions like \\(a \\sin x + b \\cos x\\) as a single sinusoid \\(R \\sin(x + \\phi)\\) with \\(R = \\sqrt{a^2 + b^2}\\), which the CED specifically calls out.",
    keyIdeas: [
      "Pythagorean identities convert between \\(\\sin^2\\), \\(\\cos^2\\), \\(\\tan^2\\), \\(\\sec^2\\).",
      "Double-angle identities are essential for solving many equations.",
      "Co-function identities link sine and cosine via complementary angles.",
      "\\(a \\sin x + b \\cos x = R \\sin(x + \\phi)\\) is the sinusoidal rewrite.",
    ],
    workedExample: {
      prompt:
        "Simplify \\(\\frac{1 - \\cos^2 x}{\\sin x}\\).",
      solution:
        "Numerator is \\(\\sin^2 x\\) by Pythagorean. So expression is \\(\\sin^2 x / \\sin x = \\sin x\\) (for \\(\\sin x \\neq 0\\)).",
    },
    commonMistakes: [
      "Using the wrong form of \\(\\cos 2x\\) for the problem at hand.",
      "Forgetting \\(1 + \\tan^2 x = \\sec^2 x\\) when tangent appears.",
      "Dividing by a trig function without noting the domain restriction.",
    ],
    quiz: [
      {
        q: "Which of the following equals \\(\\sin(2x)\\)?",
        choices: ["\\(2 \\sin x\\)", "\\(\\sin^2 x - \\cos^2 x\\)", "\\(2 \\sin x \\cos x\\)", "\\(\\cos^2 x - \\sin^2 x\\)"],
        answerIndex: 2,
        explanation: "The double angle identity: \\(\\sin(2x) = 2 \\sin x \\cos x\\).",
      },
      {
        q: "Simplify \\(1 + \\tan^2 x\\).",
        choices: ["\\(\\sec^2 x\\)", "\\(\\csc^2 x\\)", "\\(\\cos^2 x\\)", "\\(\\sin^2 x\\)"],
        answerIndex: 0,
        explanation: "Pythagorean identity: \\(1 + \\tan^2 x = \\sec^2 x\\).",
      },
      {
        q: "Using \\(\\sin^2 x + \\cos^2 x = 1\\), simplify \\(\\sin^2 x\\).",
        choices: ["\\(\\cos^2 x - 1\\)", "\\(1 - \\cos^2 x\\)", "\\(\\cos x\\)", "\\(1 + \\cos^2 x\\)"],
        answerIndex: 1,
        explanation: "Rearrange: \\(\\sin^2 x = 1 - \\cos^2 x\\).",
      },
      {
        q: "Which is a correct form of \\(\\cos(2x)\\)?",
        choices: ["\\(1 - 2\\sin^2 x\\)", "\\(2\\sin x\\cos x\\)", "\\(\\sin^2 x + \\cos^2 x\\)", "\\(1 + 2\\cos^2 x\\)"],
        answerIndex: 0,
        explanation: "Double angle: \\(\\cos(2x) = 1 - 2\\sin^2 x = 2\\cos^2 x - 1 = \\cos^2 x - \\sin^2 x\\).",
      },
    ],
  },

  "3.13": {
    id: "3.13",
    title: "Trigonometry and Polar Coordinates",
    summary:
      "Polar coordinates describe a point by its distance \\(r\\) from the origin and angle \\(\\theta\\) from the positive x-axis.",
    lesson:
      "A polar coordinate \\((r, \\theta)\\) specifies a point by how far it is from the origin (\\(r \\geq 0\\)) and the angle \\(\\theta\\) its radial line makes with the positive x-axis (measured counterclockwise). The conversion to Cartesian is \\(x = r \\cos\\theta\\), \\(y = r \\sin\\theta\\). Going the other way, \\(r = \\sqrt{x^2 + y^2}\\) and \\(\\theta = \\arctan(y/x)\\), adjusted for quadrant.\n\nPolar has multi-representation — the same point has infinitely many polar coordinates because \\(\\theta\\) can be shifted by \\(2\\pi\\) or \\(r\\) can be negated with \\(\\theta\\) adjusted by \\(\\pi\\). The CED sometimes allows negative \\(r\\) (sending the point \\(\\pi\\) radians the other way), and sometimes restricts to \\(r \\geq 0\\) — read the problem.\n\nPolar coordinates shine for circles, spirals, and rose curves because their symmetries are radial. A circle of radius \\(a\\) centered at the origin is just \\(r = a\\) — one constant. That's the tradeoff: easy radial shapes, harder rectangular shapes.",
    keyIdeas: [
      "\\((x, y) = (r \\cos\\theta, r \\sin\\theta)\\).",
      "\\(r = \\sqrt{x^2 + y^2}\\), \\(\\theta = \\arctan(y/x)\\) with quadrant adjustment.",
      "Same point has infinitely many polar coordinates.",
      "Circles and spirals are natural in polar form.",
    ],
    workedExample: {
      prompt:
        "Convert the polar point \\((4, 2\\pi/3)\\) to Cartesian.",
      solution:
        "\\(x = 4 \\cos(2\\pi/3) = 4 \\cdot (-1/2) = -2\\). \\(y = 4 \\sin(2\\pi/3) = 4 \\cdot \\sqrt{3}/2 = 2\\sqrt{3}\\). Cartesian: \\((-2, 2\\sqrt{3})\\).",
    },
    commonMistakes: [
      "Mixing up \\(r \\cos\\theta\\) with \\(r \\sin\\theta\\).",
      "Ignoring the quadrant when using \\(\\arctan\\).",
      "Forgetting the angle is in radians, not degrees.",
    ],
    quiz: [
      {
        q: "Convert the polar point \\((2, \\pi/4)\\) to Cartesian coordinates.",
        choices: ["\\((\\sqrt{2}, \\sqrt{2})\\)", "\\((1, 1)\\)", "\\((2, 2)\\)", "\\((2, \\pi/4)\\)"],
        answerIndex: 0,
        explanation: "\\(x = 2 \\cos(\\pi/4) = 2 \\cdot \\sqrt{2}/2 = \\sqrt{2}\\); \\(y = 2 \\sin(\\pi/4) = \\sqrt{2}\\).",
      },
      {
        q: "What Cartesian point corresponds to polar \\((r, \\theta) = (5, \\pi)\\)?",
        choices: ["\\((0, 5)\\)", "\\((-5, 0)\\)", "\\((5, 0)\\)", "\\((0, -5)\\)"],
        answerIndex: 1,
        explanation: "x = 5 cos π = −5; y = 5 sin π = 0.",
      },
      {
        q: "Which polar equation represents a circle of radius 3 centered at the origin?",
        choices: ["\\(r = 3\\theta\\)", "\\(r = 3\\)", "\\(\\theta = 3\\)", "\\(r = \\cos(3\\theta)\\)"],
        answerIndex: 1,
        explanation: "A constant r = a describes a circle of radius a centered at the origin.",
      },
      {
        q: "The Cartesian point \\((0, -4)\\) in polar coordinates (with r ≥ 0) is:",
        choices: ["\\((4, \\pi/2)\\)", "\\((4, -\\pi/2)\\) or \\((4, 3\\pi/2)\\)", "\\((-4, \\pi/2)\\)", "\\((4, \\pi)\\)"],
        answerIndex: 1,
        explanation: "r = √(0 + 16) = 4; angle pointing down is −π/2 or equivalently 3π/2.",
      },
    ],
  },

  "3.14": {
    id: "3.14",
    title: "Polar Function Graphs",
    summary:
      "Polar graphs \\(r = f(\\theta)\\) describe how the radius varies with angle. Roses, limaçons, and cardioids all live in this family.",
    lesson:
      "A polar function \\(r = f(\\theta)\\) specifies a curve by giving the radius as a function of the angle. As \\(\\theta\\) sweeps from 0 to \\(2\\pi\\), the point \\((f(\\theta), \\theta)\\) traces out a curve. Common families:\n\n- Circle: \\(r = a\\) (constant) or \\(r = 2 a \\cos\\theta\\) (circle of radius \\(a\\) centered at \\((a, 0)\\)).\n- Rose: \\(r = a \\cos(n\\theta)\\) or \\(a \\sin(n\\theta)\\). Gives \\(n\\) petals if \\(n\\) is odd, \\(2n\\) petals if \\(n\\) is even.\n- Cardioid: \\(r = a(1 \\pm \\cos\\theta)\\) or \\(a(1 \\pm \\sin\\theta)\\). Heart-shaped.\n- Limaçon: \\(r = a + b \\cos\\theta\\). May have a loop if \\(|a/b| < 1\\), a dimple if \\(1 < |a/b| < 2\\), or be convex if \\(|a/b| \\geq 2\\).\n- Spiral: \\(r = a \\theta\\) (Archimedean spiral), or \\(r = e^{a\\theta}\\) (logarithmic spiral).\n\nTo sketch, pick a sequence of \\(\\theta\\) values, compute \\(r\\), and plot. Or look at where \\(r = 0\\) — those are the angles where the curve passes through the origin. For roses, zeros give the directions of the petal boundaries.",
    keyIdeas: [
      "\\(r = f(\\theta)\\): radius as function of angle.",
      "Rose: \\(n\\) petals (odd \\(n\\)) or \\(2n\\) petals (even \\(n\\)).",
      "Cardioid \\(r = a(1 + \\cos\\theta)\\) is a heart shape.",
      "Limaçon shape depends on the \\(a/b\\) ratio.",
    ],
    workedExample: {
      prompt:
        "Sketch the rose \\(r = 3 \\cos(2\\theta)\\). How many petals and what are the petal directions?",
      solution:
        "Since \\(n = 2\\) is even, the rose has \\(2 \\cdot 2 = 4\\) petals. Petals align with angles where \\(\\cos(2\\theta) = \\pm 1\\), i.e. \\(2\\theta = 0, \\pi, 2\\pi, 3\\pi\\), giving \\(\\theta = 0, \\pi/2, \\pi, 3\\pi/2\\). Each petal reaches length 3. Curve passes through origin when \\(\\cos(2\\theta) = 0\\), at \\(\\theta = \\pi/4, 3\\pi/4, 5\\pi/4, 7\\pi/4\\).",
    },
    commonMistakes: [
      "Using \\(n\\) petals instead of \\(2n\\) for even-\\(n\\) roses.",
      "Forgetting the negative \\(r\\) portion when plotting limaçons.",
      "Mixing up cardioid and limaçon.",
    ],
    quiz: [
      {
        q: "How many petals does the rose \\(r = 4 \\cos(3\\theta)\\) have?",
        choices: ["3", "6", "9", "12"],
        answerIndex: 0,
        explanation: "For odd n = 3, the rose has exactly n = 3 petals.",
      },
      {
        q: "The rose \\(r = 2\\sin(4\\theta)\\) has how many petals?",
        choices: ["4", "8", "16", "2"],
        answerIndex: 1,
        explanation: "For even n, the rose has 2n petals, so 2(4) = 8.",
      },
      {
        q: "The polar equation \\(r = 1 + \\cos\\theta\\) describes a:",
        choices: ["Circle", "Limaçon with loop", "Cardioid", "Rose"],
        answerIndex: 2,
        explanation: "When a = b in r = a + b cos θ, the curve is a cardioid (heart-shaped).",
      },
      {
        q: "For \\(r = 2\\sin\\theta\\), the curve is:",
        choices: ["A circle of radius 1 centered at \\((0, 1)\\)", "A circle of radius 2", "A cardioid", "A spiral"],
        answerIndex: 0,
        explanation: "\\(r = 2\\sin\\theta\\) is a circle of radius 1 centered at (0, 1) in Cartesian.",
      },
    ],
    diagram: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
      ${AXIS}
      <path d="M200 120 Q240 50 280 120 Q240 95 200 120 Q160 50 120 120 Q160 95 200 120 Q240 190 280 120 Q240 145 200 120 Q160 190 120 120 Q160 145 200 120" fill="none" stroke="#c2410c" stroke-width="2.2" />
      <text x="285" y="115" font-family="ui-sans-serif" font-size="10" fill="#c2410c">4-petal rose</text>
      <text x="105" y="135" font-family="ui-sans-serif" font-size="10" fill="#6b6b6b">r = 3 cos(2\u03b8)</text>
    </svg>`,
  },

  "3.15": {
    id: "3.15",
    title: "Rates of Change in Polar Functions",
    summary:
      "In polar, the rate of change of \\(r\\) with respect to \\(\\theta\\) tells you whether the curve is spiraling in, out, or holding steady.",
    lesson:
      "For a polar curve \\(r = f(\\theta)\\), the rate of change \\(\\frac{dr}{d\\theta}\\) measures how fast the radius is changing as the angle sweeps. Positive means \\(r\\) is growing (spiraling outward at that angle); negative means \\(r\\) is shrinking (spiraling inward); zero means the radius is momentarily stationary — often at local max or min of \\(r\\).\n\nThe CED asks you to reason about polar rates without actually computing calculus derivatives. You can use average rate of change on an interval \\([\\theta_1, \\theta_2]\\): \\(\\frac{f(\\theta_2) - f(\\theta_1)}{\\theta_2 - \\theta_1}\\). This gives the average radial rate per radian on that window.\n\nDescribe behavior qualitatively: \"On the interval \\([0, \\pi/2]\\), the curve moves outward from \\(r = 2\\) to \\(r = 5\\); on \\([\\pi/2, \\pi]\\) the curve moves inward back toward the origin.\" This interpretation is the kind graders reward. Be careful with sign — polar \"outward\" is positive \\(\\Delta r\\), but the curve's actual direction in the \\(xy\\)-plane depends on both \\(r\\) and \\(\\theta\\).",
    keyIdeas: [
      "\\(\\frac{dr}{d\\theta}\\) measures how fast radius changes per radian.",
      "Positive: spiraling outward. Negative: spiraling inward.",
      "Average rate of change on \\([\\theta_1, \\theta_2]\\) is \\(\\Delta r / \\Delta \\theta\\).",
      "Sign analysis of \\(r\\) and its rate gives curve shape.",
    ],
    workedExample: {
      prompt:
        "For \\(r = 3 + 2 \\cos\\theta\\), find the average rate of change of \\(r\\) on \\([0, \\pi]\\).",
      solution:
        "\\(r(0) = 5\\). \\(r(\\pi) = 1\\). Average rate: \\((1 - 5)/(\\pi - 0) = -4/\\pi \\approx -1.27\\). So \\(r\\) decreases by about 1.27 per radian on this interval — the curve is spiraling inward.",
    },
    commonMistakes: [
      "Confusing rate of change of \\(r\\) with distance traveled.",
      "Forgetting \\(\\Delta\\theta\\) is in radians, not degrees.",
      "Assigning the wrong sign to outward vs. inward.",
    ],
    quiz: [
      {
        q: "For \\(r = 2 + \\sin\\theta\\), the average rate of change of \\(r\\) on \\([0, \\pi/2]\\) is:",
        choices: ["\\(-2/\\pi\\)", "\\(1/(\\pi/2) = 2/\\pi\\)", "\\(1\\)", "\\(\\pi/2\\)"],
        answerIndex: 1,
        explanation: "r(0) = 2, r(π/2) = 3. Avg rate = (3 − 2)/(π/2) = 2/π.",
      },
      {
        q: "A positive \\(dr/d\\theta\\) means the polar curve is:",
        choices: ["Spiraling inward", "Spiraling outward", "Crossing the origin", "Constant"],
        answerIndex: 1,
        explanation: "Positive rate of change of r means the radius grows as θ increases — spiraling outward.",
      },
      {
        q: "For \\(r = 5\\) (a constant), the average rate of change of \\(r\\) on any interval is:",
        choices: ["5", "0", "Undefined", "Depends on interval"],
        answerIndex: 1,
        explanation: "r is constant, so Δr = 0 over any interval — the curve is a circle with no radial change.",
      },
      {
        q: "If \\(r(\\theta_1) = 4\\) and \\(r(\\theta_2) = 1\\) with \\(\\theta_2 > \\theta_1\\), the polar curve is:",
        choices: ["Spiraling outward", "Spiraling inward", "Constant", "Undefined"],
        answerIndex: 1,
        explanation: "r decreases as θ increases, indicating the curve moves toward the origin (spiral inward).",
      },
    ],
  },

  // ===========================================================================
  // UNIT 4 — Functions Involving Parameters, Vectors, and Matrices
  // ===========================================================================

  "4.1": {
    id: "4.1",
    title: "Parametric Functions",
    summary:
      "A parametric function defines \\(x\\) and \\(y\\) as separate functions of a parameter \\(t\\), often representing time.",
    lesson:
      "A parametric function has the form \\((x(t), y(t))\\) where \\(t\\) is a parameter (commonly thought of as time). As \\(t\\) varies over its domain, the point \\((x(t), y(t))\\) traces a curve in the plane. Crucially, the curve has a direction of motion, so parametric functions carry more information than the graph of \\(y = f(x)\\) does: you know the order in which points are visited.\n\nTo sketch: pick several values of \\(t\\), compute \\((x(t), y(t))\\), and plot. Connect points in the order of increasing \\(t\\), drawing an arrow to show direction. Parametric forms can describe loops, self-intersections, and motion patterns that would be impossible to capture as a single function \\(y(x)\\).\n\nTo convert to Cartesian form (eliminating the parameter), solve one equation for \\(t\\) and substitute into the other. Sometimes this gives a familiar form like an ellipse or a line; other times the algebra is messy and staying in parametric is cleaner.",
    keyIdeas: [
      "Parametric form: \\((x(t), y(t))\\).",
      "The parameter \\(t\\) introduces direction and ordering.",
      "Can represent loops and self-intersections — impossible for ordinary \\(y = f(x)\\).",
      "Convert to Cartesian by eliminating \\(t\\).",
    ],
    workedExample: {
      prompt:
        "Given \\(x(t) = t + 1\\), \\(y(t) = t^2\\), for \\(t \\in [-2, 2]\\), sketch the curve and give its Cartesian form.",
      solution:
        "Points: \\(t = -2 \\to (-1, 4)\\), \\(t = -1 \\to (0, 1)\\), \\(t = 0 \\to (1, 0)\\), \\(t = 1 \\to (2, 1)\\), \\(t = 2 \\to (3, 4)\\). Connect left to right as \\(t\\) increases. Cartesian: \\(t = x - 1\\), so \\(y = (x - 1)^2\\). A parabola with vertex at \\((1, 0)\\) and \\(t\\) increasing as \\(x\\) increases.",
    },
    commonMistakes: [
      "Plotting points without an arrow — direction matters.",
      "Assuming the parametric curve is the same as its Cartesian graph (it also has direction and domain).",
      "Eliminating \\(t\\) but forgetting to preserve the parameter's domain restriction.",
    ],
    quiz: [
      {
        q: "Given \\(x = 2t, y = t + 1\\), eliminate the parameter to find the Cartesian form.",
        choices: ["\\(y = 2x + 1\\)", "\\(y = x/2 + 1\\)", "\\(y = x - 1\\)", "\\(y = x + 2\\)"],
        answerIndex: 1,
        explanation: "From x = 2t, t = x/2; substitute: y = x/2 + 1.",
      },
      {
        q: "At \\(t = 2\\) for \\(x(t) = t^2, y(t) = 3t\\), the position is:",
        choices: ["\\((4, 6)\\)", "\\((2, 6)\\)", "\\((4, 3)\\)", "\\((6, 4)\\)"],
        answerIndex: 0,
        explanation: "x(2) = 4, y(2) = 6.",
      },
      {
        q: "Parametric functions offer which advantage over \\(y = f(x)\\)?",
        choices: ["They are always simpler.", "They can describe curves that self-intersect and indicate direction.", "They eliminate the need for graphs.", "They have no domain restrictions."],
        answerIndex: 1,
        explanation: "Parametric form naturally handles direction of traversal and self-intersecting curves that single-valued y = f(x) cannot.",
      },
      {
        q: "A parameter \\(t\\) typically represents:",
        choices: ["Only time.", "A generic independent variable that indexes position on the curve.", "The distance from origin.", "The x-coordinate."],
        answerIndex: 1,
        explanation: "t is a generic parameter; it often represents time but may stand for any independent indexing variable.",
      },
    ],
  },

  "4.2": {
    id: "4.2",
    title: "Parametric Functions Modeling Planar Motion",
    summary:
      "In motion problems, \\(x(t)\\) and \\(y(t)\\) describe horizontal and vertical position as time unfolds. Velocity and speed come from differences.",
    lesson:
      "When a parametric function models motion, \\(t\\) is time and \\((x(t), y(t))\\) is the position at time \\(t\\). The direction of motion at any moment is tangent to the curve. Speed is the magnitude of velocity — roughly, how fast the point is moving along the curve, regardless of direction.\n\nIn precalc you reason about motion with average rates: average horizontal velocity \\(\\overline{v_x} = \\Delta x / \\Delta t\\), average vertical velocity \\(\\overline{v_y} = \\Delta y / \\Delta t\\), average speed \\(\\approx \\sqrt{(\\Delta x)^2 + (\\Delta y)^2} / \\Delta t\\). This gives you per-axis rates and the approximate direction of travel on an interval.\n\nClassic contexts: projectile motion (\\(x(t) = v_0 \\cos\\theta \\cdot t\\), \\(y(t) = v_0 \\sin\\theta \\cdot t - \\frac{1}{2} g t^2\\)), circular motion (\\(x(t) = r \\cos(\\omega t)\\), \\(y(t) = r \\sin(\\omega t)\\)), and linear motion (\\(x(t) = x_0 + a t\\), \\(y(t) = y_0 + b t\\)). Knowing these three templates covers most exam scenarios.",
    keyIdeas: [
      "Position \\((x(t), y(t))\\), velocity is tangent direction with per-axis rates.",
      "Average speed on \\([t_1, t_2]\\) \\(\\approx \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}/\\Delta t\\).",
      "Projectile, circular, and linear motion are the three standard templates.",
      "Motion is always parametric — two functions, one parameter.",
    ],
    workedExample: {
      prompt:
        "A projectile is launched with initial speed 40 m/s at 30 degrees above horizontal. Write parametric equations for position, using \\(g = 9.8\\) m/s\\(^2\\).",
      solution:
        "Horizontal velocity: \\(40 \\cos 30^\\circ \\approx 34.64\\). Vertical velocity: \\(40 \\sin 30^\\circ = 20\\). Position: \\(x(t) = 34.64 t\\), \\(y(t) = 20 t - 4.9 t^2\\). These describe a parabolic arc.",
    },
    commonMistakes: [
      "Forgetting the factor of \\(1/2\\) in the gravity term.",
      "Using degrees mode when the expected is radians (or vice versa).",
      "Reporting only horizontal or vertical velocity — motion is 2D.",
    ],
    quiz: [
      {
        q: "A particle has position \\(\\langle t, t^2 \\rangle\\) at time \\(t\\). Its average velocity vector on \\([0, 3]\\) is:",
        choices: ["\\(\\langle 3, 9 \\rangle\\)", "\\(\\langle 1, 3 \\rangle\\)", "\\(\\langle 3, 3 \\rangle\\)", "\\(\\langle 1, 2 \\rangle\\)"],
        answerIndex: 1,
        explanation: "Δx = 3, Δy = 9, Δt = 3 → avg velocity ⟨1, 3⟩.",
      },
      {
        q: "In projectile motion \\(y(t) = v_0 \\sin\\theta \\cdot t - \\tfrac{1}{2}g t^2\\), what does the \\(-\\tfrac{1}{2}gt^2\\) term represent?",
        choices: ["Initial velocity upward", "Gravity pulling downward", "Horizontal motion", "The angle of launch"],
        answerIndex: 1,
        explanation: "The quadratic term models the effect of gravity reducing height over time.",
      },
      {
        q: "For circular motion \\((x, y) = (r\\cos(\\omega t), r\\sin(\\omega t))\\), a larger \\(\\omega\\) means:",
        choices: ["Larger radius", "Faster rotation (shorter period)", "Slower rotation", "The curve becomes an ellipse"],
        answerIndex: 1,
        explanation: "ω controls angular speed; larger ω means faster rotation, shorter period = 2π/ω.",
      },
      {
        q: "A line in parametric form passes through \\((2, 3)\\) with direction \\(\\langle 1, -2 \\rangle\\). At \\(t = 4\\), the point is:",
        choices: ["\\((4, -5)\\)", "\\((6, -5)\\)", "\\((6, 11)\\)", "\\((2, -5)\\)"],
        answerIndex: 1,
        explanation: "(2 + 4(1), 3 + 4(−2)) = (6, −5).",
      },
    ],
  },

  "4.3": {
    id: "4.3",
    title: "Parametric Functions and Rates of Change",
    summary:
      "Average rates of change for parametric curves split into horizontal, vertical, and overall rates — each answers a different question.",
    lesson:
      "Given a parametric \\((x(t), y(t))\\) and an interval \\([t_1, t_2]\\), you can compute three rates of change:\n\n- Horizontal: \\(\\overline{v_x} = \\frac{x(t_2) - x(t_1)}{t_2 - t_1}\\).\n- Vertical: \\(\\overline{v_y} = \\frac{y(t_2) - y(t_1)}{t_2 - t_1}\\).\n- With respect to \\(x\\) (slope of secant): \\(\\frac{y(t_2) - y(t_1)}{x(t_2) - x(t_1)}\\).\n\nThe first two describe speed along each axis. The third is the slope of the secant line on the \\(xy\\)-plane — that's the rate of change of \\(y\\) per unit change in \\(x\\), not per unit change in \\(t\\). It matches the secant slope you'd draw on the Cartesian graph.\n\nOn an FRQ the CED asks you to interpret these. \"Between \\(t = 1\\) and \\(t = 3\\), the object's position changes from \\((2, 4)\\) to \\((6, 10)\\). Average horizontal velocity is 2 units per second, average vertical velocity is 3 units per second, and the slope of the secant line on the \\(xy\\)-plane is 3/2.\" That's the level of detail expected.",
    keyIdeas: [
      "Three different rates: horizontal, vertical, and \\(dy/dx\\).",
      "Horizontal/vertical rates use \\(\\Delta t\\) in denominator.",
      "Secant slope on \\(xy\\)-plane uses \\(\\Delta x\\) in denominator.",
      "Interpret each in terms of the motion described.",
    ],
    workedExample: {
      prompt:
        "For \\((x(t), y(t)) = (t^2, 3t)\\), find the average horizontal and vertical rates on \\([1, 3]\\), and the secant slope on the \\(xy\\)-plane.",
      solution:
        "\\(x(1) = 1, x(3) = 9\\), \\(y(1) = 3, y(3) = 9\\). Average \\(v_x = (9 - 1)/2 = 4\\). Average \\(v_y = (9 - 3)/2 = 3\\). Secant slope on \\(xy\\)-plane: \\((9 - 3)/(9 - 1) = 6/8 = 3/4\\).",
    },
    commonMistakes: [
      "Dividing \\(\\Delta y\\) by \\(\\Delta t\\) when the question asks for slope on the \\(xy\\)-plane.",
      "Forgetting the units — per second versus per unit \\(x\\).",
      "Claiming a single \"rate of change\" without specifying which one.",
    ],
    quiz: [
      {
        q: "For \\(x(t) = 2t\\) and \\(y(t) = t^3\\), find the average vertical velocity on \\([1, 2]\\).",
        choices: ["3", "7", "1", "8"],
        answerIndex: 1,
        explanation: "y(1) = 1, y(2) = 8, Δt = 1, avg \\(v_y = (8-1)/1 = 7\\).",
      },
      {
        q: "For the same \\(x(t) = 2t, y(t) = t^3\\), the slope of the secant on the \\(xy\\)-plane between \\(t = 1\\) and \\(t = 2\\) is:",
        choices: ["7", "3.5", "\\(7/2\\)", "\\(1/2\\)"],
        answerIndex: 1,
        explanation: "Δy/Δx = (8−1)/(4−2) = 7/2 = 3.5.",
      },
      {
        q: "Which quantity measures how fast \\(x\\) changes per unit time?",
        choices: ["\\(\\Delta y / \\Delta x\\)", "\\(\\Delta x / \\Delta t\\)", "\\(\\Delta y / \\Delta t\\)", "\\(\\Delta t / \\Delta x\\)"],
        answerIndex: 1,
        explanation: "By definition, average horizontal velocity is \\(\\Delta x / \\Delta t\\).",
      },
      {
        q: "If \\(v_x = 3\\) and \\(v_y = 4\\) are average velocities, the average speed is approximately:",
        choices: ["7", "5", "3.5", "12"],
        answerIndex: 1,
        explanation: "Speed = magnitude of velocity = \\(\\sqrt{3^2 + 4^2} = 5\\).",
      },
    ],
  },

  "4.4": {
    id: "4.4",
    title: "Parametrically Defined Circles and Lines",
    summary:
      "Circles and lines have especially clean parametric forms. Know both so you can generate them on demand.",
    lesson:
      "A circle of radius \\(r\\) centered at \\((h, k)\\) can be parametrized as:\n\n\\(x(t) = h + r \\cos t\\), \\(y(t) = k + r \\sin t\\), for \\(t \\in [0, 2\\pi)\\).\n\nAs \\(t\\) sweeps from 0 to \\(2\\pi\\), the point traces the circle once counterclockwise starting at \\((h + r, k)\\). To go clockwise, use \\((h + r \\cos t, k - r \\sin t)\\). To start at a different point, add a phase shift inside the trig functions. To change speed, replace \\(t\\) with \\(\\omega t\\) — now the point takes \\(2\\pi/\\omega\\) to complete a revolution.\n\nA line through \\((x_0, y_0)\\) with direction vector \\((a, b)\\) parametrizes as:\n\n\\(x(t) = x_0 + a t\\), \\(y(t) = y_0 + b t\\).\n\nThe slope of this line is \\(b/a\\) (provided \\(a \\neq 0\\)). As \\(t\\) varies, the point moves along the line in the direction of \\((a, b)\\). This is the cleanest way to describe oriented lines and line segments.",
    keyIdeas: [
      "Circle: \\((h + r \\cos t, k + r \\sin t)\\), counterclockwise.",
      "Line: \\((x_0 + at, y_0 + bt)\\), direction \\((a, b)\\).",
      "Direction reversal: negate one trig or one direction component.",
      "Angular speed: replace \\(t\\) with \\(\\omega t\\).",
    ],
    workedExample: {
      prompt:
        "Parametrize the circle centered at \\((3, -1)\\) with radius 2, traveling counterclockwise starting at \\((5, -1)\\).",
      solution:
        "Standard form: \\(x(t) = 3 + 2 \\cos t\\), \\(y(t) = -1 + 2 \\sin t\\). Check \\(t = 0\\): \\((5, -1)\\). Correct. As \\(t\\) increases, sine is positive first, so \\(y\\) increases — moving upward from \\((5, -1)\\), which is counterclockwise.",
    },
    commonMistakes: [
      "Swapping sine and cosine.",
      "Omitting the center shift.",
      "Parameterizing clockwise when counterclockwise is required.",
    ],
    quiz: [
      {
        q: "The parametrization \\((x(t), y(t)) = (3\\cos t, 3\\sin t)\\) traces:",
        choices: ["A line", "A circle of radius 3 centered at origin, counterclockwise", "A parabola", "A circle of radius 9"],
        answerIndex: 1,
        explanation: "x² + y² = 9 cos² t + 9 sin² t = 9 — a circle of radius 3. Increasing t sweeps counterclockwise.",
      },
      {
        q: "Parametrize a line through \\((1, 2)\\) with direction vector \\(\\langle 3, -1 \\rangle\\).",
        choices: ["\\((1 + 3t, 2 - t)\\)", "\\((3 + t, -1 + 2t)\\)", "\\((1 - 3t, 2 + t)\\)", "\\((3t, -t)\\)"],
        answerIndex: 0,
        explanation: "Start point + t * direction: (1 + 3t, 2 + (−1)t) = (1 + 3t, 2 − t).",
      },
      {
        q: "To parametrize a circle of radius 2 centered at \\((5, 3)\\) traveling counterclockwise, use:",
        choices: ["\\((5 + 2\\cos t, 3 + 2\\sin t)\\)", "\\((2 + 5\\cos t, 2 + 3\\sin t)\\)", "\\((5\\cos t, 3\\sin t)\\)", "\\((5 - 2\\sin t, 3 - 2\\cos t)\\)"],
        answerIndex: 0,
        explanation: "Standard circle parametrization: (h + r cos t, k + r sin t) with h=5, k=3, r=2.",
      },
      {
        q: "Replacing \\(\\sin t\\) with \\(-\\sin t\\) in a circle parametrization:",
        choices: ["Changes the radius.", "Reverses direction from counterclockwise to clockwise.", "Shifts the center.", "Has no effect."],
        answerIndex: 1,
        explanation: "Negating sin t reverses the vertical motion of the parameterization, reversing orientation to clockwise.",
      },
    ],
  },

  "4.5": {
    id: "4.5",
    title: "Implicitly Defined Functions",
    summary:
      "An implicit equation \\(F(x, y) = 0\\) defines one or more curves without solving for \\(y\\) in terms of \\(x\\).",
    lesson:
      "An implicit equation is a relation between \\(x\\) and \\(y\\) that isn't solved for \\(y\\). The classic example is the unit circle \\(x^2 + y^2 = 1\\): it's a relation between \\(x\\) and \\(y\\), but you can't write \\(y\\) as a single function of \\(x\\) because there are two \\(y\\)-values for each \\(x \\in (-1, 1)\\). The relation still defines a curve, just not as a simple \\(y = f(x)\\).\n\nGraphing implicit curves relies on plugging in values and using symmetry. For \\(x^2 + y^2 = 1\\), pick \\(x = 0\\) to get \\(y = \\pm 1\\); pick \\(y = 0\\) to get \\(x = \\pm 1\\); plot those four points and draw the smooth circle they suggest. For more complex implicit curves you can solve for \\(y\\) in terms of \\(x\\) (sometimes yielding two or more branches) or use a graphing tool.\n\nKey AP skill: recognize when a curve is implicit and think about the upper and lower branches separately, each of which is a function \\(y = f(x)\\) over its own domain. Implicit curves also parametrize nicely — which is topic 4.7.",
    keyIdeas: [
      "Implicit form: \\(F(x, y) = 0\\). Not solved for \\(y\\).",
      "A single \\(x\\) can correspond to multiple \\(y\\) values.",
      "Branches: split into pieces each giving a function.",
      "Symmetry and test points help you sketch.",
    ],
    workedExample: {
      prompt:
        "Graph the implicit curve \\(y^2 = x\\). Identify its branches.",
      solution:
        "Solve: \\(y = \\pm \\sqrt{x}\\), valid for \\(x \\geq 0\\). Upper branch: \\(y = \\sqrt{x}\\), a half-parabola opening right from \\((0, 0)\\) going up. Lower branch: \\(y = -\\sqrt{x}\\), same shape going down. Together they form a sideways parabola symmetric about the x-axis.",
    },
    commonMistakes: [
      "Forgetting the \\(\\pm\\) when taking a square root — you lose a branch.",
      "Claiming an implicit curve is a \"function\" without splitting branches.",
      "Missing the domain restriction when the implicit equation limits valid values.",
    ],
    quiz: [
      {
        q: "The equation \\(x^2 + y^2 = 16\\) defines:",
        choices: ["A single function \\(y = f(x)\\).", "Two functions, \\(y = \\sqrt{16-x^2}\\) and \\(y = -\\sqrt{16-x^2}\\).", "A line.", "A parabola."],
        answerIndex: 1,
        explanation: "The implicit equation gives a circle that splits into upper and lower semicircles, each a function.",
      },
      {
        q: "Which of the following implicit relations IS a function \\(y = f(x)\\)?",
        choices: ["\\(x^2 + y^2 = 1\\)", "\\(y^2 = x\\)", "\\(y = x^3 + 1\\)", "\\(x = y^2 - 4\\)"],
        answerIndex: 2,
        explanation: "y = x³ + 1 is already solved for y; for each x there is exactly one y value.",
      },
      {
        q: "The implicit curve \\(y^2 = 4x\\) has domain:",
        choices: ["All real numbers", "\\(x \\geq 0\\)", "\\(x \\leq 0\\)", "\\(y \\geq 0\\)"],
        answerIndex: 1,
        explanation: "y² ≥ 0 forces 4x ≥ 0, so x ≥ 0.",
      },
      {
        q: "For the implicit equation \\(xy = 6\\), solving for \\(y\\) gives:",
        choices: ["\\(y = 6 - x\\)", "\\(y = 6/x\\)", "\\(y = 6x\\)", "\\(y = x - 6\\)"],
        answerIndex: 1,
        explanation: "Divide both sides by x (for x ≠ 0): y = 6/x — a hyperbola.",
      },
    ],
  },

  "4.6": {
    id: "4.6",
    title: "Conic Sections",
    summary:
      "Conic sections — circles, ellipses, parabolas, hyperbolas — are implicit curves you should recognize by their standard equation forms.",
    lesson:
      "Conic sections are the curves you get by slicing a double cone with a plane. Their standard forms are:\n\n- Circle: \\((x - h)^2 + (y - k)^2 = r^2\\). Center \\((h, k)\\), radius \\(r\\).\n- Ellipse: \\(\\frac{(x - h)^2}{a^2} + \\frac{(y - k)^2}{b^2} = 1\\). Axes of lengths \\(2a\\), \\(2b\\).\n- Parabola: \\((y - k) = a (x - h)^2\\) or \\((x - h) = a (y - k)^2\\). Opens up/down or left/right.\n- Hyperbola: \\(\\frac{(x - h)^2}{a^2} - \\frac{(y - k)^2}{b^2} = 1\\). Opens horizontally; flip the sign for vertical.\n\nThe discriminator: look at the signs of the squared terms. Same sign, same coefficient: circle. Same sign, different coefficients: ellipse. Opposite signs: hyperbola. One squared term only (other is linear): parabola.\n\nCompleting the square is the main technique for converting a general form \\(A x^2 + B y^2 + C x + D y + E = 0\\) into standard form. Once you recognize the type, you can read off center, axes, and orientation.",
    keyIdeas: [
      "Circle, ellipse, parabola, hyperbola cover all conic cases.",
      "Standard forms differ by sign pattern and which variables are squared.",
      "Completing the square converts general to standard form.",
      "Recognize type by squared-term signs before computing anything.",
    ],
    workedExample: {
      prompt:
        "Classify and describe \\(x^2 + 4 y^2 - 6 x + 8 y + 9 = 0\\).",
      solution:
        "Both \\(x^2\\) and \\(y^2\\) positive with different coefficients — ellipse. Complete the square: \\((x^2 - 6x + 9) + 4(y^2 + 2y + 1) = -9 + 9 + 4 \\Rightarrow (x - 3)^2 + 4(y + 1)^2 = 4\\). Divide by 4: \\(\\frac{(x-3)^2}{4} + \\frac{(y+1)^2}{1} = 1\\). Ellipse centered at \\((3, -1)\\), horizontal axis length 4, vertical axis length 2.",
    },
    commonMistakes: [
      "Forgetting to divide so the right side equals 1.",
      "Completing the square without carrying the coefficients through correctly.",
      "Mixing up major and minor axes on ellipses.",
    ],
    quiz: [
      {
        q: "What is the center of the circle \\((x-2)^2 + (y+3)^2 = 25\\)?",
        choices: ["\\((2, -3)\\) with radius 5", "\\((-2, 3)\\) with radius 5", "\\((2, -3)\\) with radius 25", "\\((2, 3)\\) with radius 5"],
        answerIndex: 0,
        explanation: "Standard form (x−h)² + (y−k)² = r² with h=2, k=−3, r=√25 = 5.",
      },
      {
        q: "Which equation is a hyperbola?",
        choices: ["\\(x^2 + y^2 = 9\\)", "\\(\\frac{x^2}{4} - \\frac{y^2}{9} = 1\\)", "\\(\\frac{x^2}{4} + \\frac{y^2}{9} = 1\\)", "\\(y = x^2\\)"],
        answerIndex: 1,
        explanation: "Opposite signs on x² and y² terms (one positive, one negative) defines a hyperbola.",
      },
      {
        q: "The equation \\(\\frac{x^2}{16} + \\frac{y^2}{9} = 1\\) represents an ellipse with:",
        choices: ["Horizontal major axis of length 8", "Horizontal major axis of length 4", "Vertical major axis of length 6", "A circle of radius 4"],
        answerIndex: 0,
        explanation: "Since 16 > 9, major axis is horizontal with length 2a = 2(4) = 8.",
      },
      {
        q: "The conic \\(y = 2x^2 - 4x + 3\\) is:",
        choices: ["A circle", "An ellipse", "A parabola opening upward", "A hyperbola"],
        answerIndex: 2,
        explanation: "Only x² squared, coefficient positive → parabola opening upward.",
      },
    ],
  },

  "4.7": {
    id: "4.7",
    title: "Parametrization of Implicitly Defined Functions",
    summary:
      "Many implicit curves — especially conics — have natural parametrizations using trigonometry.",
    lesson:
      "Converting an implicit curve into a parametrization is useful because parametric form builds in direction and lets you handle self-intersecting shapes cleanly. For conics, the standard parametrizations are:\n\n- Circle \\((x - h)^2 + (y - k)^2 = r^2\\): \\((h + r \\cos t, k + r \\sin t)\\).\n- Ellipse \\(\\frac{(x - h)^2}{a^2} + \\frac{(y - k)^2}{b^2} = 1\\): \\((h + a \\cos t, k + b \\sin t)\\).\n- Parabola \\(y = x^2\\): \\((t, t^2)\\) is a simple choice. Any monotone substitution works.\n- Hyperbola \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\): \\((a \\sec t, b \\tan t)\\).\n\nThese work because of trig identities: for circles and ellipses, \\(\\cos^2 t + \\sin^2 t = 1\\) automatically satisfies the implicit form. For hyperbolas, \\(\\sec^2 t - \\tan^2 t = 1\\) does the job.\n\nThe benefit of parametrizing: once in parametric form you can integrate, compute arc length, find velocities, and describe motion. In AP Precalc the CED just wants you to know the standard parametrizations; Calc BC will use them more heavily.",
    keyIdeas: [
      "Trig identities let you parametrize conics cleanly.",
      "Circle/ellipse use \\(\\cos t, \\sin t\\); hyperbola uses \\(\\sec t, \\tan t\\).",
      "Parabola has many valid parametrizations — the simplest is \\((t, f(t))\\).",
      "Parametrization adds direction to the implicit curve.",
    ],
    workedExample: {
      prompt:
        "Parametrize the ellipse \\(\\frac{x^2}{9} + \\frac{y^2}{4} = 1\\).",
      solution:
        "Use \\(x = 3 \\cos t\\), \\(y = 2 \\sin t\\) for \\(t \\in [0, 2\\pi)\\). Check: \\(\\frac{9 \\cos^2 t}{9} + \\frac{4 \\sin^2 t}{4} = \\cos^2 t + \\sin^2 t = 1\\). Correct.",
    },
    commonMistakes: [
      "Using \\(a\\) and \\(b\\) in the wrong positions.",
      "Forgetting to include center shift when the conic isn't at origin.",
      "Writing \\((t, t^2)\\) for a general parabola and missing the shift/scale.",
    ],
    quiz: [
      {
        q: "A parametrization of the ellipse \\(\\frac{x^2}{16} + \\frac{y^2}{9} = 1\\) is:",
        choices: ["\\((4\\cos t, 3\\sin t)\\)", "\\((3\\cos t, 4\\sin t)\\)", "\\((16\\cos t, 9\\sin t)\\)", "\\((\\cos t, \\sin t)\\)"],
        answerIndex: 0,
        explanation: "Use a = √16 = 4 and b = √9 = 3 in (a cos t, b sin t).",
      },
      {
        q: "Which identity makes the circle parametrization \\((r\\cos t, r\\sin t)\\) satisfy \\(x^2 + y^2 = r^2\\)?",
        choices: ["\\(\\sin t + \\cos t = 1\\)", "\\(\\sin^2 t + \\cos^2 t = 1\\)", "\\(\\tan^2 t = \\sec^2 t - 1\\)", "\\(\\sin(2t) = 2\\sin t \\cos t\\)"],
        answerIndex: 1,
        explanation: "The Pythagorean identity ensures x² + y² = r²(cos² t + sin² t) = r².",
      },
      {
        q: "A parabola \\(y = x^2 - 3\\) can be parametrized as:",
        choices: ["\\((t, t^2 - 3)\\)", "\\((t^2 - 3, t)\\)", "\\((\\cos t, \\sin t - 3)\\)", "\\((t, t - 3)\\)"],
        answerIndex: 0,
        explanation: "Set x = t, then y = t² − 3 automatically.",
      },
      {
        q: "The identity used to parametrize a hyperbola \\(x^2 - y^2 = 1\\) with \\((\\sec t, \\tan t)\\) is:",
        choices: ["\\(\\sin^2 + \\cos^2 = 1\\)", "\\(\\sec^2 - \\tan^2 = 1\\)", "\\(1 + \\cot^2 = \\csc^2\\)", "Double-angle for cosine"],
        answerIndex: 1,
        explanation: "The Pythagorean identity sec² t − tan² t = 1 makes (sec t)² − (tan t)² = 1 work.",
      },
    ],
  },

  "4.8": {
    id: "4.8",
    title: "Vectors",
    summary:
      "A vector has both magnitude and direction. In 2D, \\(\\vec{v} = \\langle a, b \\rangle\\) points from origin to \\((a, b)\\) with length \\(\\sqrt{a^2 + b^2}\\).",
    lesson:
      "A vector is an object with magnitude and direction. In 2D, we write it as a component pair \\(\\vec{v} = \\langle a, b \\rangle\\), which you can picture as an arrow from the origin to the point \\((a, b)\\). The magnitude is \\(|\\vec{v}| = \\sqrt{a^2 + b^2}\\) — the length of the arrow. The direction is the angle \\(\\theta = \\arctan(b/a)\\), adjusted for the correct quadrant.\n\nVectors add componentwise: \\(\\langle a, b \\rangle + \\langle c, d \\rangle = \\langle a + c, b + d \\rangle\\). Geometrically, this is the parallelogram rule — place one vector's tail at the other's head, and the resultant goes from the first tail to the second head.\n\nScalar multiplication: \\(k \\langle a, b \\rangle = \\langle ka, kb \\rangle\\), stretches the vector by \\(|k|\\) and reverses direction if \\(k < 0\\). The dot product \\(\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y\\) equals \\(|\\vec{u}||\\vec{v}|\\cos\\theta\\) where \\(\\theta\\) is the angle between the vectors. Dot product is zero iff the vectors are perpendicular.\n\nUnit vectors have magnitude 1. To normalize a nonzero vector, divide by its magnitude: \\(\\hat{v} = \\vec{v}/|\\vec{v}|\\).",
    keyIdeas: [
      "Vector: magnitude and direction. 2D form \\(\\langle a, b \\rangle\\).",
      "Magnitude \\(|\\vec{v}| = \\sqrt{a^2 + b^2}\\); direction \\(\\theta = \\arctan(b/a)\\).",
      "Add componentwise; scalar-multiply componentwise.",
      "Dot product \\(= u_x v_x + u_y v_y = |\\vec u||\\vec v|\\cos\\theta\\).",
    ],
    workedExample: {
      prompt:
        "Given \\(\\vec{u} = \\langle 3, 4 \\rangle\\) and \\(\\vec{v} = \\langle 1, -2 \\rangle\\), find \\(\\vec{u} + \\vec{v}\\), \\(|\\vec{u}|\\), and \\(\\vec{u} \\cdot \\vec{v}\\).",
      solution:
        "\\(\\vec{u} + \\vec{v} = \\langle 4, 2 \\rangle\\). \\(|\\vec{u}| = \\sqrt{9 + 16} = 5\\). \\(\\vec{u} \\cdot \\vec{v} = 3 \\cdot 1 + 4 \\cdot (-2) = 3 - 8 = -5\\). Negative dot product tells you the angle between them is obtuse.",
    },
    commonMistakes: [
      "Computing magnitude as \\(a + b\\) instead of \\(\\sqrt{a^2 + b^2}\\).",
      "Mixing up dot product with component multiplication that yields a vector.",
      "Forgetting quadrant adjustment on the direction angle.",
    ],
    quiz: [
      {
        q: "The magnitude of \\(\\vec{v} = \\langle 6, 8 \\rangle\\) is:",
        choices: ["14", "10", "\\(\\sqrt{14}\\)", "48"],
        answerIndex: 1,
        explanation: "\\(|\\vec v| = \\sqrt{36 + 64} = \\sqrt{100} = 10\\).",
      },
      {
        q: "Find \\(\\vec{u} \\cdot \\vec{v}\\) for \\(\\vec{u} = \\langle 2, 3 \\rangle\\) and \\(\\vec{v} = \\langle 4, -1 \\rangle\\).",
        choices: ["\\(\\langle 8, -3 \\rangle\\)", "5", "11", "\\(-5\\)"],
        answerIndex: 1,
        explanation: "Dot product: 2(4) + 3(−1) = 8 − 3 = 5.",
      },
      {
        q: "Two vectors are perpendicular if and only if:",
        choices: ["Their magnitudes are equal.", "Their dot product is zero.", "Their cross product is zero.", "They point in the same direction."],
        answerIndex: 1,
        explanation: "\\(\\vec u \\cdot \\vec v = |\\vec u||\\vec v|\\cos\\theta\\); this is 0 iff cos θ = 0, i.e., vectors are perpendicular.",
      },
      {
        q: "Scalar multiplication \\(-2 \\cdot \\langle 3, -4 \\rangle\\) equals:",
        choices: ["\\(\\langle -6, 8 \\rangle\\)", "\\(\\langle 6, -8 \\rangle\\)", "\\(\\langle 1, -2 \\rangle\\)", "\\(\\langle -6, -8 \\rangle\\)"],
        answerIndex: 0,
        explanation: "Multiply each component by −2: (−6, 8).",
      },
    ],
  },

  "4.9": {
    id: "4.9",
    title: "Vector-Valued Functions",
    summary:
      "A vector-valued function \\(\\vec{r}(t) = \\langle x(t), y(t) \\rangle\\) describes a curve by giving a position vector at each time — essentially parametric motion in vector form.",
    lesson:
      "A vector-valued function \\(\\vec{r}(t) = \\langle x(t), y(t) \\rangle\\) is just a parametric function written as a position vector. As \\(t\\) varies, \\(\\vec{r}(t)\\) sweeps a curve in the plane. The tail of the vector stays at the origin; the head traces the curve.\n\nThe advantage of vector notation: it makes operations like addition, scalar multiplication, and dot products natural. If \\(\\vec{r}_1(t)\\) and \\(\\vec{r}_2(t)\\) are two position functions, you can add them to describe the \"combined\" trajectory or subtract to get the displacement from one to the other. Scaling \\(\\vec{r}(t)\\) by a constant stretches or compresses the entire curve radially.\n\nVector-valued functions also generalize cleanly to 3D with \\(\\vec{r}(t) = \\langle x(t), y(t), z(t) \\rangle\\), which you'll revisit in multivariable calculus. For Precalc, stick with 2D and know how to extract the position at a specific time and compute average velocity between two times: \\(\\overline{\\vec{v}} = (\\vec{r}(t_2) - \\vec{r}(t_1))/(t_2 - t_1)\\).",
    keyIdeas: [
      "Vector form of parametric motion: \\(\\vec{r}(t) = \\langle x(t), y(t) \\rangle\\).",
      "Operations (add, subtract, scale) are componentwise.",
      "Average velocity = change in position divided by change in time.",
      "Generalizes to 3D cleanly.",
    ],
    workedExample: {
      prompt:
        "For \\(\\vec{r}(t) = \\langle \\cos t, \\sin t \\rangle\\), find \\(\\vec{r}(0)\\), \\(\\vec{r}(\\pi/2)\\), and the average velocity on \\([0, \\pi/2]\\).",
      solution:
        "\\(\\vec{r}(0) = \\langle 1, 0 \\rangle\\). \\(\\vec{r}(\\pi/2) = \\langle 0, 1 \\rangle\\). Average velocity: \\((\\langle 0, 1 \\rangle - \\langle 1, 0 \\rangle)/(\\pi/2 - 0) = \\langle -1, 1 \\rangle / (\\pi/2) = \\langle -2/\\pi, 2/\\pi \\rangle\\).",
    },
    commonMistakes: [
      "Computing the magnitude when the question asks for the vector.",
      "Forgetting that average velocity is itself a vector.",
      "Mixing up position and velocity.",
    ],
    quiz: [
      {
        q: "For \\(\\vec r(t) = \\langle t, t^2 \\rangle\\), find \\(\\vec r(2)\\).",
        choices: ["\\(\\langle 2, 2 \\rangle\\)", "\\(\\langle 2, 4 \\rangle\\)", "\\(\\langle 4, 4 \\rangle\\)", "\\(\\langle 4, 2 \\rangle\\)"],
        answerIndex: 1,
        explanation: "Plug t = 2: x = 2, y = 4. So \\(\\vec r(2) = \\langle 2, 4 \\rangle\\).",
      },
      {
        q: "Average velocity from \\(\\vec r(0) = \\langle 1, 0 \\rangle\\) to \\(\\vec r(4) = \\langle 9, 8 \\rangle\\) is:",
        choices: ["\\(\\langle 2, 2 \\rangle\\)", "\\(\\langle 8, 8 \\rangle\\)", "\\(\\langle 10, 8 \\rangle\\)", "\\(\\langle 2, 8 \\rangle\\)"],
        answerIndex: 0,
        explanation: "\\((\\vec r(4) - \\vec r(0))/4 = \\langle 8, 8 \\rangle/4 = \\langle 2, 2 \\rangle\\).",
      },
      {
        q: "A vector-valued function \\(\\vec r(t)\\) differs from a scalar function \\(f(t)\\) because:",
        choices: ["It outputs a scalar.", "It outputs a vector (direction + magnitude).", "It has no domain.", "It is always periodic."],
        answerIndex: 1,
        explanation: "Vector-valued functions produce vectors at each input, encoding both direction and size.",
      },
      {
        q: "A vector-valued function \\(\\vec r(t) = \\langle \\cos t, \\sin t \\rangle\\) traces:",
        choices: ["A line", "A unit circle", "A parabola", "A spiral"],
        answerIndex: 1,
        explanation: "\\(\\cos^2 t + \\sin^2 t = 1\\) — the unit circle.",
      },
    ],
  },

  "4.10": {
    id: "4.10",
    title: "Matrices",
    summary:
      "A matrix is a rectangular array of numbers. You add, subtract, and multiply them by rules that respect the rows-and-columns structure.",
    lesson:
      "A matrix is a rectangular grid of numbers with \\(m\\) rows and \\(n\\) columns, written as an \\(m \\times n\\) matrix. A 2x2 matrix looks like \\(\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\).\n\nMatrix addition: add corresponding entries. This requires the two matrices to have the same dimensions.\n\nScalar multiplication: multiply every entry by the scalar.\n\nMatrix multiplication is the key operation and has a specific rule: to multiply an \\(m \\times n\\) matrix \\(A\\) by an \\(n \\times p\\) matrix \\(B\\), you get an \\(m \\times p\\) matrix whose \\((i, j)\\) entry is the dot product of row \\(i\\) of \\(A\\) with column \\(j\\) of \\(B\\). The inner dimensions must match; if they don't, the product is undefined.\n\nMatrix multiplication is not commutative: \\(AB \\neq BA\\) in general. It is associative and distributive. The identity matrix \\(I\\) (1s on diagonal, 0s elsewhere) acts like 1 in multiplication: \\(AI = IA = A\\).",
    keyIdeas: [
      "Dimensions \\(m \\times n\\): \\(m\\) rows, \\(n\\) columns.",
      "Add/subtract: same dimensions, entry-by-entry.",
      "Multiply: \\((m \\times n) \\cdot (n \\times p) = (m \\times p)\\); row-times-column dot product.",
      "Not commutative: \\(AB \\neq BA\\) in general.",
    ],
    workedExample: {
      prompt:
        "Compute \\(A B\\) where \\(A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\) and \\(B = \\begin{pmatrix} 0 & 1 \\\\ 5 & 2 \\end{pmatrix}\\).",
      solution:
        "Row 1 of \\(A\\) times col 1 of \\(B\\): \\(1 \\cdot 0 + 2 \\cdot 5 = 10\\). Row 1 times col 2: \\(1 \\cdot 1 + 2 \\cdot 2 = 5\\). Row 2 times col 1: \\(3 \\cdot 0 + 4 \\cdot 5 = 20\\). Row 2 times col 2: \\(3 \\cdot 1 + 4 \\cdot 2 = 11\\). \\(AB = \\begin{pmatrix} 10 & 5 \\\\ 20 & 11 \\end{pmatrix}\\).",
    },
    commonMistakes: [
      "Multiplying entry-by-entry instead of row-times-column.",
      "Swapping the order \\(AB\\) vs \\(BA\\) — different answers.",
      "Trying to multiply when inner dimensions don't match.",
    ],
    quiz: [
      {
        q: "If \\(A\\) is \\(3 \\times 5\\) and \\(B\\) is \\(5 \\times 2\\), what are the dimensions of \\(AB\\)?",
        choices: ["\\(3 \\times 2\\)", "\\(5 \\times 5\\)", "\\(2 \\times 3\\)", "Undefined"],
        answerIndex: 0,
        explanation: "Inner dimensions (5 and 5) match; result is (outer) 3 × 2.",
      },
      {
        q: "Matrix multiplication is generally:",
        choices: ["Commutative", "Not commutative", "Always equal to scalar multiplication", "Always equal to the identity matrix"],
        answerIndex: 1,
        explanation: "AB ≠ BA in general; order matters.",
      },
      {
        q: "Compute \\(\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}\\).",
        choices: ["\\(\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}\\)", "\\(\\begin{pmatrix} 11 \\\\ 4 \\end{pmatrix}\\)", "\\(\\begin{pmatrix} 7 \\\\ 4 \\end{pmatrix}\\)", "\\(\\begin{pmatrix} 3 \\\\ 8 \\end{pmatrix}\\)"],
        answerIndex: 1,
        explanation: "Row 1: 1(3) + 2(4) = 11. Row 2: 0(3) + 1(4) = 4.",
      },
      {
        q: "If \\(A\\) is \\(2 \\times 3\\) and \\(B\\) is \\(3 \\times 3\\), what is \\(BA\\)?",
        choices: ["\\(2 \\times 3\\)", "\\(3 \\times 3\\)", "\\(3 \\times 2\\)", "Undefined"],
        answerIndex: 3,
        explanation: "Inner dimensions of BA are 3 (from B's columns) and 2 (from A's rows) — they don't match, so BA is undefined.",
      },
    ],
  },

  "4.11": {
    id: "4.11",
    title: "The Inverse and Determinant of a Matrix",
    summary:
      "A square matrix has an inverse iff its determinant is nonzero. For 2x2 matrices, both are quick computations.",
    lesson:
      "For a square \\(2 \\times 2\\) matrix \\(A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\), the determinant is \\(\\det A = ad - bc\\). The determinant measures how much the matrix scales area: if you apply \\(A\\) as a linear transformation to a unit square, the image has area equal to \\(|\\det A|\\). Negative determinant means the orientation (chirality) is flipped.\n\nIf \\(\\det A \\neq 0\\), the matrix is invertible, and the inverse is\n\n\\(A^{-1} = \\frac{1}{\\det A} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}\\).\n\nMultiplying \\(A A^{-1}\\) yields the identity matrix. If \\(\\det A = 0\\), the matrix is singular — not invertible, and it collapses some direction entirely (the linear transformation squashes a 2D region to a line or point).\n\nInverse matrices solve linear systems. The equation \\(A \\vec{x} = \\vec{b}\\) has solution \\(\\vec{x} = A^{-1} \\vec{b}\\) whenever \\(A\\) is invertible.",
    keyIdeas: [
      "2x2 determinant: \\(ad - bc\\).",
      "Inverse exists iff determinant \\(\\neq 0\\).",
      "2x2 inverse: swap diagonal, negate off-diagonal, divide by det.",
      "Zero determinant = singular = not invertible.",
    ],
    workedExample: {
      prompt:
        "Find \\(A^{-1}\\) for \\(A = \\begin{pmatrix} 2 & 3 \\\\ 1 & 4 \\end{pmatrix}\\), or show it doesn't exist.",
      solution:
        "Determinant: \\(2 \\cdot 4 - 3 \\cdot 1 = 8 - 3 = 5 \\neq 0\\), so invertible. Inverse: \\(\\frac{1}{5}\\begin{pmatrix} 4 & -3 \\\\ -1 & 2 \\end{pmatrix} = \\begin{pmatrix} 4/5 & -3/5 \\\\ -1/5 & 2/5 \\end{pmatrix}\\).",
    },
    commonMistakes: [
      "Forgetting to divide by the determinant in the inverse formula.",
      "Swapping the wrong entries in the 2x2 inverse.",
      "Not checking for singularity before computing.",
    ],
    quiz: [
      {
        q: "Find the determinant of \\(A = \\begin{pmatrix} 3 & 2 \\\\ 4 & 5 \\end{pmatrix}\\).",
        choices: ["7", "23", "-7", "8"],
        answerIndex: 0,
        explanation: "ad − bc = 3(5) − 2(4) = 15 − 8 = 7.",
      },
      {
        q: "A 2x2 matrix has determinant 0. The matrix:",
        choices: ["Is invertible.", "Is not invertible (singular).", "Must be the identity.", "Has all-zero entries."],
        answerIndex: 1,
        explanation: "Zero determinant means the matrix collapses some direction and cannot be inverted.",
      },
      {
        q: "The inverse of \\(A = \\begin{pmatrix} 1 & 0 \\\\ 0 & 2 \\end{pmatrix}\\) is:",
        choices: ["\\(\\begin{pmatrix} 1 & 0 \\\\ 0 & 1/2 \\end{pmatrix}\\)", "\\(\\begin{pmatrix} -1 & 0 \\\\ 0 & -2 \\end{pmatrix}\\)", "\\(\\begin{pmatrix} 2 & 0 \\\\ 0 & 1 \\end{pmatrix}\\)", "Not invertible"],
        answerIndex: 0,
        explanation: "det = 2. Inverse = (1/2) · \\(\\begin{pmatrix} 2 & 0 \\\\ 0 & 1 \\end{pmatrix}\\) = \\(\\begin{pmatrix} 1 & 0 \\\\ 0 & 1/2 \\end{pmatrix}\\).",
      },
      {
        q: "Geometrically, the absolute value of the determinant measures:",
        choices: ["The trace of the matrix.", "The area-scaling factor of the transformation.", "The rotation angle.", "The sum of diagonal entries."],
        answerIndex: 1,
        explanation: "|det A| equals how much A stretches areas (unit square maps to parallelogram of that area).",
      },
    ],
  },

  "4.12": {
    id: "4.12",
    title: "Linear Transformations and Matrices",
    summary:
      "Every 2x2 matrix represents a linear transformation of the plane — rotation, scaling, reflection, shear, or a combination.",
    lesson:
      "A 2x2 matrix \\(A\\) acts on a vector \\(\\vec{v}\\) by multiplication: \\(A \\vec{v}\\) is a new vector. This defines a linear transformation of the plane. Linear means it preserves the origin (sends \\(\\vec{0}\\) to \\(\\vec{0}\\)), preserves straight lines, and preserves the operations of addition and scalar multiplication.\n\nCommon 2x2 transformations:\n\n- Rotation by angle \\(\\theta\\): \\(\\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}\\).\n- Scaling by factor \\(k\\): \\(\\begin{pmatrix} k & 0 \\\\ 0 & k \\end{pmatrix}\\).\n- Reflection across x-axis: \\(\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}\\).\n- Horizontal shear by factor \\(c\\): \\(\\begin{pmatrix} 1 & c \\\\ 0 & 1 \\end{pmatrix}\\).\n\nComposing transformations corresponds to multiplying their matrices. If \\(A\\) rotates and \\(B\\) scales, then \\(BA\\) rotates first, then scales (right-to-left order). This is exactly why matrix multiplication is non-commutative: the order of operations matters.\n\nThe columns of a transformation matrix are the images of the standard basis vectors \\(\\hat e_1 = \\langle 1, 0 \\rangle\\) and \\(\\hat e_2 = \\langle 0, 1 \\rangle\\). Knowing this lets you build matrices to perform any linear transformation you need.",
    keyIdeas: [
      "2x2 matrix = linear transformation of the plane.",
      "Standard types: rotation, scaling, reflection, shear.",
      "Composition = matrix multiplication (right-to-left order).",
      "Columns of \\(A\\) are the images of the basis vectors.",
    ],
    workedExample: {
      prompt:
        "Apply the rotation matrix for \\(\\theta = \\pi/2\\) to the vector \\(\\langle 3, 1 \\rangle\\).",
      solution:
        "Rotation matrix: \\(\\begin{pmatrix} \\cos(\\pi/2) & -\\sin(\\pi/2) \\\\ \\sin(\\pi/2) & \\cos(\\pi/2) \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\). Multiply: \\(\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 3 \\end{pmatrix}\\). So \\(\\langle 3, 1 \\rangle\\) rotates 90 degrees CCW to \\(\\langle -1, 3 \\rangle\\).",
    },
    commonMistakes: [
      "Applying transformations in the wrong order.",
      "Forgetting the minus sign in the rotation matrix.",
      "Multiplying left-to-right when composing.",
    ],
    quiz: [
      {
        q: "The matrix \\(\\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}\\) performs:",
        choices: ["Reflection across y-axis.", "Reflection across x-axis.", "Rotation by \\(\\pi\\).", "Identity."],
        answerIndex: 0,
        explanation: "Negating x while keeping y flips horizontally — reflection across the y-axis.",
      },
      {
        q: "To rotate the vector \\(\\langle 1, 0 \\rangle\\) by 90° counterclockwise, apply:",
        choices: ["\\(\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\)", "\\(\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\)", "\\(\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}\\)", "\\(\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}\\)"],
        answerIndex: 1,
        explanation: "Rotation matrix for π/2 with cos = 0, sin = 1: \\(\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\). Applied to ⟨1,0⟩ gives ⟨0, 1⟩.",
      },
      {
        q: "The columns of a 2×2 transformation matrix are:",
        choices: ["The eigenvectors.", "The images of \\(\\hat e_1\\) and \\(\\hat e_2\\) under the transformation.", "Always orthogonal.", "The inverse of the matrix."],
        answerIndex: 1,
        explanation: "Column j of A is the result of applying A to the jth standard basis vector.",
      },
      {
        q: "Composing transformations with matrices corresponds to:",
        choices: ["Matrix addition", "Matrix multiplication", "Determinant addition", "Scalar multiplication"],
        answerIndex: 1,
        explanation: "Applying T₁ then T₂ is the same as multiplying by matrix product T₂T₁.",
      },
    ],
  },

  "4.13": {
    id: "4.13",
    title: "Matrices as Functions",
    summary:
      "Think of a matrix as a function \\(T: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) that sends vectors to vectors linearly.",
    lesson:
      "A matrix \\(A\\) defines a function \\(T(\\vec{v}) = A \\vec{v}\\). The function takes a vector input and returns a vector output, just like a regular function, but with the bonus structure that \\(T\\) is linear: \\(T(\\vec{u} + \\vec{v}) = T(\\vec{u}) + T(\\vec{v})\\) and \\(T(c \\vec{v}) = c T(\\vec{v})\\).\n\nViewing matrices as functions lets you apply function-ish concepts. Composition of two linear functions corresponds to matrix multiplication. The \"inverse function\" of \\(T\\) (when it exists) is \\(T^{-1}(\\vec{v}) = A^{-1} \\vec{v}\\), the function that undoes \\(T\\). The \"identity function\" is the identity matrix \\(I\\), which sends every vector to itself.\n\nBecause linear transformations preserve the origin and straight lines, the image of any line through the origin is another line through the origin (or the origin itself if the matrix is singular). The image of the unit square is a parallelogram whose area is \\(|\\det A|\\) times the original. These geometric consequences are what make matrix-as-function thinking useful on exam problems.",
    keyIdeas: [
      "Matrix \\(A\\) defines a linear function \\(T(\\vec{v}) = A \\vec{v}\\).",
      "Inverse function corresponds to inverse matrix.",
      "Composition of linear functions = matrix multiplication.",
      "Image of unit square area is \\(|\\det A|\\).",
    ],
    workedExample: {
      prompt:
        "Given \\(T(\\vec{v}) = \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix} \\vec{v}\\), find \\(T(\\langle 1, 1 \\rangle)\\) and the image of the unit square.",
      solution:
        "\\(T(\\langle 1, 1 \\rangle) = \\langle 2, 3 \\rangle\\). Determinant: \\(2 \\cdot 3 = 6\\). Unit square (area 1) maps to a rectangle with area \\(6\\): stretched by 2 horizontally and 3 vertically.",
    },
    commonMistakes: [
      "Forgetting linearity lets you distribute over sums.",
      "Applying inverse in the wrong direction.",
      "Treating non-linear operations as if they fit the framework.",
    ],
    quiz: [
      {
        q: "If \\(T(\\vec v) = A \\vec v\\) and \\(A\\) has determinant \\(-3\\), the image of a unit square has area:",
        choices: ["\\(-3\\)", "\\(3\\)", "\\(9\\)", "\\(1\\)"],
        answerIndex: 1,
        explanation: "Area-scaling factor is |det A| = 3; negative sign indicates orientation reversal but doesn't affect area.",
      },
      {
        q: "A linear transformation satisfies:",
        choices: ["\\(T(\\vec u + \\vec v) = T(\\vec u) + T(\\vec v)\\) and \\(T(c\\vec v) = cT(\\vec v)\\)", "\\(T(\\vec u + \\vec v) = T(\\vec u) \\cdot T(\\vec v)\\)", "\\(T(\\vec v)\\) is always a constant.", "\\(T(\\vec 0) = \\vec v\\) for some v."],
        answerIndex: 0,
        explanation: "Linearity means preserving vector addition and scalar multiplication.",
      },
      {
        q: "If \\(T\\) is invertible, then:",
        choices: ["\\(T^{-1}(T(\\vec v)) = \\vec v\\) for all \\(\\vec v\\).", "\\(T\\) has determinant 0.", "\\(T\\) is the zero transformation.", "T is not a function."],
        answerIndex: 0,
        explanation: "By definition of inverse, composing with the inverse returns the original vector.",
      },
      {
        q: "The function \\(T(\\vec v) = A\\vec v + \\vec b\\) (with nonzero \\(\\vec b\\)) is:",
        choices: ["Linear", "Affine but not linear (fails T(0)=0)", "Nonlinear and discontinuous", "The identity"],
        answerIndex: 1,
        explanation: "Adding a nonzero constant vector makes T(0) ≠ 0, so it's affine — not linear in the strict sense.",
      },
    ],
  },

  "4.14": {
    id: "4.14",
    title: "Matrices Modeling Contexts",
    summary:
      "Matrices model situations with multiple interacting quantities — population transitions, system states, and Leslie matrices all use them.",
    lesson:
      "Matrices can model real-world systems where you track multiple interacting quantities. The classic setup: a state vector \\(\\vec{s}_n\\) contains the current amounts of each quantity, and a transition matrix \\(A\\) updates it: \\(\\vec{s}_{n+1} = A \\vec{s}_n\\).\n\nA typical context is a Markov population model. Suppose a city has 60% of urban residents staying urban and 40% moving suburban next year, and 20% of suburban residents moving urban while 80% stay. The transition matrix is\n\n\\(A = \\begin{pmatrix} 0.6 & 0.2 \\\\ 0.4 & 0.8 \\end{pmatrix}\\)\n\nwith state vector \\(\\langle \\text{urban}, \\text{suburban} \\rangle\\). Applying \\(A\\) advances the population one year. Applying \\(A^n\\) advances it \\(n\\) years.\n\nAnother use: Leslie matrices in biology, which project age-structured populations forward. The CED keeps the scope to linear updates with constant transition matrices, which is already enough to ask nontrivial questions like \"what fraction will be urban in 5 years if we start with equal populations?\"",
    keyIdeas: [
      "State vector \\(\\vec{s}_n\\) plus transition matrix \\(A\\) plus update \\(\\vec{s}_{n+1} = A \\vec{s}_n\\).",
      "Apply \\(A^n\\) to advance \\(n\\) steps at once.",
      "Columns of the transition matrix should usually sum to 1 for probability-preserving models.",
      "Use matrix powers for long-run predictions.",
    ],
    workedExample: {
      prompt:
        "A city's transition matrix is \\(A = \\begin{pmatrix} 0.7 & 0.3 \\\\ 0.3 & 0.7 \\end{pmatrix}\\) (urban/suburban). If this year \\(\\vec{s}_0 = \\langle 100, 100 \\rangle\\), find the state next year.",
      solution:
        "\\(A \\vec{s}_0 = \\begin{pmatrix} 0.7 & 0.3 \\\\ 0.3 & 0.7 \\end{pmatrix} \\begin{pmatrix} 100 \\\\ 100 \\end{pmatrix} = \\begin{pmatrix} 70 + 30 \\\\ 30 + 70 \\end{pmatrix} = \\begin{pmatrix} 100 \\\\ 100 \\end{pmatrix}\\). Population stays balanced — 100 urban and 100 suburban. This is a steady state for the matrix.",
    },
    commonMistakes: [
      "Writing the transition matrix with rows swapped — entries must go the right way.",
      "Forgetting that columns usually need to sum to 1 for probability models.",
      "Multiplying matrices in the wrong order when applying multiple time steps.",
    ],
    quiz: [
      {
        q: "For a Markov population model with transition matrix \\(A\\) and state \\(\\vec s_0\\), the state after 3 time steps is:",
        choices: ["\\(3 A \\vec s_0\\)", "\\(A^3 \\vec s_0\\)", "\\(A \\vec s_0 + 3\\)", "\\(\\vec s_0 / A^3\\)"],
        answerIndex: 1,
        explanation: "Each step multiplies by A, so three applications give A³ applied to the initial state.",
      },
      {
        q: "In a probability-preserving transition matrix, each column should sum to:",
        choices: ["0", "1", "The population size", "The determinant"],
        answerIndex: 1,
        explanation: "Columns sum to 1 so all probability mass from a state is distributed among possible next states.",
      },
      {
        q: "Given transition matrix \\(A = \\begin{pmatrix} 0.5 & 0.1 \\\\ 0.5 & 0.9 \\end{pmatrix}\\) and state \\(\\vec s_0 = \\begin{pmatrix} 40 \\\\ 60 \\end{pmatrix}\\), find \\(\\vec s_1\\).",
        choices: ["\\(\\begin{pmatrix} 26 \\\\ 74 \\end{pmatrix}\\)", "\\(\\begin{pmatrix} 20 \\\\ 80 \\end{pmatrix}\\)", "\\(\\begin{pmatrix} 44 \\\\ 56 \\end{pmatrix}\\)", "\\(\\begin{pmatrix} 50 \\\\ 50 \\end{pmatrix}\\)"],
        answerIndex: 0,
        explanation: "Row 1: 0.5(40) + 0.1(60) = 26. Row 2: 0.5(40) + 0.9(60) = 74.",
      },
      {
        q: "A steady state \\(\\vec s\\) of a transition matrix \\(A\\) satisfies:",
        choices: ["\\(A \\vec s = \\vec 0\\)", "\\(A \\vec s = \\vec s\\)", "\\(\\vec s = \\vec 0\\)", "\\(A = I\\)"],
        answerIndex: 1,
        explanation: "A steady state is unchanged by one more application of the transition, so \\(A \\vec s = \\vec s\\).",
      },
    ],
  },
};
