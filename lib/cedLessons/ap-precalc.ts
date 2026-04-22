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
  },

  // ===========================================================================
  // UNIT 2 — Exponential and Logarithmic Functions
  // ===========================================================================
  "2.1": {
    id: "2.1",
    title: "Change in Arithmetic and Geometric Sequences",
    summary:
      "Arithmetic sequences add a constant each step; geometric sequences multiply by a constant. Those two patterns preview linear and exponential growth.",
    lesson:
      "An **arithmetic sequence** has a constant **common difference** \\(d\\): \\(a_n = a_1 + (n-1)d\\). Consecutive terms differ by \\(d\\) no matter where you are in the sequence. A **geometric sequence** has a constant **common ratio** \\(r\\): \\(a_n = a_1 \\cdot r^{n-1}\\). Consecutive terms differ by a factor of \\(r\\).\n\nThe two patterns have **explicit** forms (formula in \\(n\\)) and **recursive** forms (formula in previous term): arithmetic \\(a_n = a_{n-1} + d\\); geometric \\(a_n = r \\cdot a_{n-1}\\). Both representations should feel interchangeable.\n\nSequences are the discrete cousins of the continuous functions you'll see next. Arithmetic sequences are **linear** at integer inputs; geometric sequences are **exponential** at integer inputs. Recognizing which pattern a table shows is how the AP exam asks you to distinguish linear from exponential growth.",
    keyIdeas: [
      "Arithmetic: constant additive change \\(d\\); explicit \\(a_n = a_1 + (n-1)d\\).",
      "Geometric: constant multiplicative change \\(r\\); explicit \\(a_n = a_1 r^{n-1}\\).",
      "Explicit vs recursive forms are two views of the same sequence.",
      "Arithmetic → linear; geometric → exponential (when extended to real inputs).",
    ],
    workedExample: {
      prompt:
        "A sequence starts \\(a_1 = 5\\) and has common ratio \\(r = 3\\). Write \\(a_n\\) and find \\(a_6\\).",
      solution:
        "Geometric: \\(a_n = 5 \\cdot 3^{n-1}\\). Then \\(a_6 = 5 \\cdot 3^5 = 5 \\cdot 243 = 1215\\).",
    },
    commonMistakes: [
      "Using \\(n\\) instead of \\(n-1\\) in the exponent — the first term is \\(a_1 = a_1 r^0\\).",
      "Mixing up \\(d\\) (additive) and \\(r\\) (multiplicative).",
      "Treating a recursive definition as starting at \\(n=0\\) when it starts at \\(n=1\\).",
    ],
  },
  "2.2": {
    id: "2.2",
    title: "Change in Linear and Exponential Functions",
    summary:
      "Linear functions change by equal additive amounts over equal input steps; exponential functions change by equal multiplicative factors.",
    lesson:
      "Given a table with equally spaced \\(x\\)-values, check the pattern of outputs:\n- If first differences \\(\\Delta y\\) are constant, the function is **linear**: \\(f(x) = mx + b\\).\n- If ratios \\(y_{n+1}/y_n\\) are constant, the function is **exponential**: \\(f(x) = a \\cdot b^x\\).\n\nLinear change is described by the constant slope \\(m\\) — meters per second, dollars per hour. Exponential change is described by a **growth/decay factor** \\(b\\) — a population that doubles every 10 years has \\(b = 2\\) with time measured in decades.\n\nA useful reframing: exponential growth means the **rate of change is proportional to the current amount**. The derivative pays attention to how big \\(f(x)\\) already is, not just where \\(x\\) sits. This is why exponentials eventually dominate any polynomial — their own size feeds the rate of change.",
    keyIdeas: [
      "Linear: equal additive change over equal intervals.",
      "Exponential: equal multiplicative change over equal intervals.",
      "\\(f(x) = a b^x\\): \\(a\\) is initial value, \\(b\\) is growth factor.",
      "\\(b > 1\\) growth, \\(0 < b < 1\\) decay.",
    ],
    workedExample: {
      prompt:
        "A table gives \\(f(0) = 8,\\ f(1) = 12,\\ f(2) = 18,\\ f(3) = 27\\). Linear or exponential?",
      solution:
        "Ratios: \\(12/8 = 1.5,\\ 18/12 = 1.5,\\ 27/18 = 1.5\\) — constant. So exponential with \\(a = 8,\\ b = 1.5\\): \\(f(x) = 8(1.5)^x\\).",
    },
    commonMistakes: [
      "Checking differences first and stopping — always also check ratios.",
      "Forgetting the \\(x\\)-steps must be equal for the test to work.",
      "Writing \\(b\\) as the percent change (e.g. \\(0.5\\)) instead of \\(1 + 0.5 = 1.5\\).",
    ],
  },
  "2.3": {
    id: "2.3",
    title: "Exponential Functions",
    summary:
      "An exponential function has the form \\(f(x) = a b^x\\) with \\(a \\ne 0\\) and \\(b > 0,\\ b \\ne 1\\). Know its domain, range, asymptote, and growth behavior.",
    lesson:
      "An **exponential function** has the form \\(f(x) = a \\cdot b^x\\). Conventions:\n- **Domain**: all real numbers.\n- **Range**: \\((0,\\infty)\\) if \\(a > 0\\); \\((-\\infty, 0)\\) if \\(a < 0\\).\n- **Horizontal asymptote**: \\(y = 0\\) (the \\(x\\)-axis).\n- **y-intercept**: \\(f(0) = a\\).\n- If \\(b > 1\\): **growth**, increasing.\n- If \\(0 < b < 1\\): **decay**, decreasing.\n\nThe graph never crosses its horizontal asymptote. Exponentials grow (or decay) faster than any polynomial for large \\(x\\): for any positive \\(b > 1\\) and any \\(n\\), \\(b^x\\) eventually exceeds \\(x^n\\).\n\nThe special base \\(e \\approx 2.71828\\) shows up wherever continuous compounding happens: \\(f(x) = a e^{kx}\\) is common in population and finance models. Many AP problems let you choose between \\(b^x\\) and \\(e^{kx}\\) forms — the two are equivalent because \\(b = e^{\\ln b}\\), so \\(b^x = e^{(\\ln b) x}\\).",
    keyIdeas: [
      "\\(f(x) = ab^x\\), \\(a = \\) y-intercept, \\(b = \\) growth/decay factor.",
      "Domain all reals; range \\((0, \\infty)\\) (for \\(a > 0\\)); HA \\(y = 0\\).",
      "\\(b > 1\\) growth; \\(0 < b < 1\\) decay.",
      "\\(b^x\\) eventually dominates any polynomial.",
    ],
    workedExample: {
      prompt:
        "Find the y-intercept, horizontal asymptote, and whether \\(f(x) = 7(0.6)^x\\) grows or decays.",
      solution:
        "y-intercept: \\(f(0) = 7\\). Horizontal asymptote: \\(y = 0\\). Since \\(0 < 0.6 < 1\\), it is **decay**.",
    },
    commonMistakes: [
      "Calling the HA the x-axis but writing it as \\(x = 0\\) — it's \\(y = 0\\).",
      "Saying the domain is \\((0, \\infty)\\) — that's the range.",
      "Assuming \\(b < 0\\) is allowed — it isn't.",
    ],
  },
  "2.4": {
    id: "2.4",
    title: "Exponential Function Manipulation",
    summary:
      "Use exponent rules to rewrite \\(ab^x\\) in equivalent forms that reveal different features (initial value, growth rate, doubling time).",
    lesson:
      "Key exponent rules: \\(b^{m+n} = b^m b^n\\), \\(b^{mn} = (b^m)^n\\), \\(b^{-n} = 1/b^n\\), \\(b^0 = 1\\).\n\n**Equivalent forms of the same exponential**:\n- \\(f(x) = ab^x\\) — standard form.\n- \\(f(x) = ae^{kx}\\) where \\(k = \\ln b\\) — continuous-growth form.\n- \\(f(x) = ab^{x/T}\\) — period-\\(T\\) form; emphasizes the time scale over which output multiplies by \\(b\\).\n\nExample: a population that doubles every 7 years can be written as \\(P(t) = P_0 \\cdot 2^{t/7}\\) or as \\(P(t) = P_0 e^{(\\ln 2 / 7) t}\\). Same function, different emphasis.\n\nAnother common trick: \\(a(1 + r)^x\\) where \\(r\\) is a percent change per step. A 3% annual growth becomes \\(a(1.03)^x\\); a 15% annual decline becomes \\(a(0.85)^x\\).\n\nManipulating the form often lets you read off a quantity directly: half-life, doubling time, or annual percent change.",
    keyIdeas: [
      "Exponent rules let you rewrite the same function multiple ways.",
      "\\(ab^x = a b^{x/T \\cdot T} = a(b^T)^{x/T}\\) reveals period-\\(T\\) growth.",
      "\\(ab^x = ae^{(\\ln b) x}\\) converts to base \\(e\\).",
      "Percent change \\(r\\) gives factor \\(1 + r\\).",
    ],
    workedExample: {
      prompt:
        "Rewrite \\(P(t) = 500 \\cdot 3^{t/4}\\) in the form \\(P(t) = 500 b^t\\) and identify \\(b\\).",
      solution:
        "Use \\(3^{t/4} = (3^{1/4})^t\\). So \\(P(t) = 500 (3^{1/4})^t\\) and \\(b = 3^{1/4} \\approx 1.316\\).",
    },
    commonMistakes: [
      "Treating \\(b^{m+n}\\) as \\(b^m + b^n\\).",
      "Dropping negative signs in exponents when rewriting.",
      "Forgetting that \\((b^m)^n = b^{mn}\\), not \\(b^{m+n}\\).",
    ],
  },
  "2.5": {
    id: "2.5",
    title: "Exponential Function Context and Data Modeling",
    summary:
      "Fit an exponential model \\(a b^x\\) to data using initial value and one point, or two points, then interpret \\(a\\) and \\(b\\) in context.",
    lesson:
      "To build an exponential model from context:\n1. Identify the **initial value** \\(a\\) (output when input = 0).\n2. Identify the **growth/decay factor** \\(b\\) from a second data point or a rate.\n3. Write \\(f(x) = a b^x\\).\n\n**From percent change**: if the quantity grows \\(r\\) per period (written as a decimal), \\(b = 1 + r\\). If it decays \\(r\\), \\(b = 1 - r\\).\n\n**From doubling/halving time**: if the quantity doubles every \\(T\\) units, \\(f(x) = a \\cdot 2^{x/T}\\); if it halves every \\(T\\) units, \\(f(x) = a (1/2)^{x/T}\\).\n\n**From two points**: given \\(f(0) = a\\) and \\(f(x_1) = y_1\\), solve \\(y_1 = a b^{x_1}\\) for \\(b = (y_1/a)^{1/x_1}\\).\n\nOn FRQs: always **interpret** \\(a\\) and \\(b\\) in words. 'The population was \\(a\\) at time \\(0\\), and each year it multiplies by \\(b\\) (or grows by \\((b-1) \\cdot 100\\%\\)).'",
    keyIdeas: [
      "\\(a\\) = initial value; \\(b\\) = growth factor.",
      "Percent change \\(r\\) per period → \\(b = 1 + r\\) (growth) or \\(1 - r\\) (decay).",
      "Doubling time \\(T\\) → base \\(2^{1/T}\\); half-life \\(T\\) → base \\(0.5^{1/T}\\).",
      "Interpret parameters in sentence form on FRQs.",
    ],
    workedExample: {
      prompt:
        "A drug decays in the body so that half the amount remains every 6 hours. If the initial dose is 80 mg, write \\(D(t)\\) and find when 10 mg remain.",
      solution:
        "Half-life 6 hours: \\(D(t) = 80 (0.5)^{t/6}\\). Set \\(10 = 80 (0.5)^{t/6}\\) → \\(0.125 = (0.5)^{t/6}\\) → since \\(0.125 = (0.5)^3\\), \\(t/6 = 3\\), \\(t = 18\\) hours.",
    },
    commonMistakes: [
      "Using the percent change directly as \\(b\\) instead of \\(1 + r\\) or \\(1 - r\\).",
      "Dropping units when interpreting parameters.",
      "Confusing doubling time with growth per unit time.",
    ],
  },
  "2.6": {
    id: "2.6",
    title: "Competing Function Model Validation",
    summary:
      "When two model families (e.g., linear vs. exponential) might fit, use differences, ratios, and residuals to decide which is better supported.",
    lesson:
      "Given data, candidates might include linear, quadratic, or exponential models. Systematic validation:\n- **Check first differences**: constant → linear.\n- **Check second differences**: constant → quadratic.\n- **Check ratios**: constant → exponential.\n- **Check residuals**: for each candidate, fit it and plot residuals \\(y_{\\text{actual}} - y_{\\text{predicted}}\\). Random residuals near 0 support the model; a pattern means the model is wrong.\n\nOn AP exams you rarely have huge datasets, so you mostly rely on the first three tests plus contextual reasoning. If the quantity grows without bound and the growth itself speeds up, an exponential or higher-order polynomial is likely. If the quantity approaches a **limit** (like cooling toward room temperature), neither linear nor unbounded exponential fits — you'd want a logistic or exponential-decay-toward-an-asymptote model (Precalc hints at these through 'bounded' contexts).\n\n'Best fit' is a judgment call; AP rewards articulating *why* one model is supported by the data rather than just reporting an \\(R^2\\).",
    keyIdeas: [
      "Constant differences → linear.",
      "Constant second differences → quadratic.",
      "Constant ratios → exponential.",
      "Residuals should be random, not patterned.",
      "Context (bounded? unbounded? periodic?) narrows the candidate family.",
    ],
    commonMistakes: [
      "Choosing the model with the highest \\(R^2\\) even when residuals show a trend.",
      "Not checking all three tests (differences, second differences, ratios).",
      "Ignoring context clues like 'approaches a limit' or 'repeats.'",
    ],
    workedExample: {
      prompt:
        "A table: \\(f(0) = 10,\\ f(1) = 15,\\ f(2) = 22.5,\\ f(3) = 33.75\\). Best model?",
      solution:
        "First differences: 5, 7.5, 11.25 — not constant. Ratios: \\(15/10 = 1.5,\\ 22.5/15 = 1.5,\\ 33.75/22.5 = 1.5\\) — constant. Exponential: \\(f(x) = 10 (1.5)^x\\).",
    },
  },
  "2.7": {
    id: "2.7",
    title: "Composition of Functions",
    summary:
      "Composition \\((f \\circ g)(x) = f(g(x))\\) chains two functions. Evaluate inside-out and track domain restrictions.",
    lesson:
      "**Composition** plugs one function into another: \\((f \\circ g)(x) = f(g(x))\\). Read inside-out: apply \\(g\\) first, then apply \\(f\\) to the result.\n\n**Domain of \\(f \\circ g\\)**: all \\(x\\) such that (1) \\(x\\) is in the domain of \\(g\\), AND (2) \\(g(x)\\) is in the domain of \\(f\\). Skipping condition (2) is the usual error.\n\n**Decomposing** a complicated function into a composition is just as important. Given \\(h(x) = \\sqrt{3x+1}\\), you can write \\(h = f \\circ g\\) with \\(g(x) = 3x+1\\) and \\(f(u) = \\sqrt{u}\\). Decomposition makes chain-rule differentiation in Calc simpler.\n\nComposition is **not commutative**: in general \\(f(g(x)) \\ne g(f(x))\\). Always evaluate carefully; don't shortcut.",
    keyIdeas: [
      "\\((f \\circ g)(x) = f(g(x))\\): inner function first.",
      "Domain of composition = domain of \\(g\\) restricted so \\(g(x)\\) is in domain of \\(f\\).",
      "Composition is not commutative.",
      "Decomposition is the inverse skill: split a function into outer + inner.",
    ],
    workedExample: {
      prompt:
        "Given \\(f(x) = x^2 + 1\\) and \\(g(x) = \\sqrt{x}\\), find \\((f \\circ g)(x)\\), \\((g \\circ f)(x)\\), and the domain of each.",
      solution:
        "\\((f \\circ g)(x) = f(\\sqrt{x}) = (\\sqrt{x})^2 + 1 = x + 1\\), domain \\(x \\ge 0\\) (from \\(g\\)). \\((g \\circ f)(x) = g(x^2+1) = \\sqrt{x^2+1}\\), domain all reals (since \\(x^2+1 > 0\\)).",
    },
    commonMistakes: [
      "Writing \\((f \\circ g)(x) = f(x) g(x)\\) — that's a product, not composition.",
      "Forgetting domain restrictions inherited from the inner function.",
      "Assuming \\(f \\circ g = g \\circ f\\).",
    ],
  },
  "2.8": {
    id: "2.8",
    title: "Inverse Functions",
    summary:
      "An inverse \\(f^{-1}\\) undoes \\(f\\). A function has an inverse iff it is one-to-one. Graphs of \\(f\\) and \\(f^{-1}\\) reflect across \\(y = x\\).",
    lesson:
      "\\(f\\) is **one-to-one** (injective) if each output comes from exactly one input — passes the **horizontal line test**. Only one-to-one functions have inverses.\n\nThe **inverse** \\(f^{-1}\\) satisfies \\(f(f^{-1}(x)) = x\\) and \\(f^{-1}(f(x)) = x\\) on their respective domains.\n\n**Algebraic procedure** to find \\(f^{-1}\\):\n1. Write \\(y = f(x)\\).\n2. Swap \\(x\\) and \\(y\\).\n3. Solve for \\(y\\). That's \\(f^{-1}(x)\\).\n\nExample: \\(f(x) = 2x + 5\\). Swap: \\(x = 2y + 5\\). Solve: \\(y = (x-5)/2\\). So \\(f^{-1}(x) = (x-5)/2\\).\n\n**Graphically**: \\(f\\) and \\(f^{-1}\\) are reflections of each other across the line \\(y = x\\). Whatever \\(f\\) does, \\(f^{-1}\\) reverses.\n\n**Domain/range swap**: domain of \\(f^{-1}\\) = range of \\(f\\); range of \\(f^{-1}\\) = domain of \\(f\\).\n\nIf \\(f\\) isn't one-to-one everywhere, you can often **restrict the domain** (e.g., \\(f(x) = x^2\\) restricted to \\(x \\ge 0\\) becomes invertible with \\(f^{-1}(x) = \\sqrt{x}\\)).",
    keyIdeas: [
      "Inverse exists iff \\(f\\) is one-to-one (horizontal line test).",
      "\\((f \\circ f^{-1})(x) = x\\); \\((f^{-1} \\circ f)(x) = x\\).",
      "Graphs reflect across \\(y = x\\).",
      "Domain and range swap between \\(f\\) and \\(f^{-1}\\).",
      "Sometimes restrict domain to force one-to-one.",
    ],
    workedExample: {
      prompt:
        "Find the inverse of \\(f(x) = (x - 3)^3 + 2\\).",
      solution:
        "Set \\(y = (x-3)^3 + 2\\). Swap: \\(x = (y-3)^3 + 2\\). Solve: \\(x - 2 = (y-3)^3\\), \\(y - 3 = \\sqrt[3]{x-2}\\), \\(y = \\sqrt[3]{x-2} + 3\\). So \\(f^{-1}(x) = \\sqrt[3]{x-2} + 3\\).",
    },
    commonMistakes: [
      "Confusing \\(f^{-1}(x)\\) with \\(1/f(x)\\).",
      "Forgetting to check one-to-one before claiming an inverse exists.",
      "Mis-swapping domain and range.",
    ],
  },
  "2.9": {
    id: "2.9",
    title: "Logarithmic Expressions",
    summary:
      "\\(\\log_b(x) = y\\) means \\(b^y = x\\). Logs are the inverse operation of exponentiation.",
    lesson:
      "By definition, \\(\\log_b(x) = y \\iff b^y = x\\), with \\(b > 0,\\ b \\ne 1\\), and \\(x > 0\\).\n\nShorthand:\n- **Common log**: \\(\\log x = \\log_{10} x\\).\n- **Natural log**: \\(\\ln x = \\log_e x\\).\n\n**Basic values** to know:\n- \\(\\log_b(1) = 0\\) (because \\(b^0 = 1\\)).\n- \\(\\log_b(b) = 1\\).\n- \\(\\log_b(b^n) = n\\).\n- \\(b^{\\log_b(x)} = x\\).\n\nLogs let you invert exponential operations. If \\(3^x = 20\\), you can't solve with pure algebra — take \\(\\log_3\\) of both sides: \\(x = \\log_3 20\\). Calculators typically have only \\(\\log\\) and \\(\\ln\\), so you use the **change of base** formula: \\(\\log_b(x) = \\ln(x) / \\ln(b) = \\log(x)/\\log(b)\\).",
    keyIdeas: [
      "\\(\\log_b(x) = y \\iff b^y = x\\).",
      "\\(\\log(1) = 0,\\ \\log_b(b) = 1,\\ \\log_b(b^n) = n\\).",
      "Change of base: \\(\\log_b(x) = \\ln x / \\ln b\\).",
      "\\(b^{\\log_b(x)} = x\\) and \\(\\log_b(b^x) = x\\).",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\log_2 32\\) and \\(\\log_5(1/25)\\).",
      solution:
        "\\(\\log_2 32\\): since \\(2^5 = 32\\), answer is \\(5\\). \\(\\log_5(1/25) = \\log_5(5^{-2}) = -2\\).",
    },
    commonMistakes: [
      "Writing \\(\\log(xy) = \\log(x) \\cdot \\log(y)\\). It's \\(\\log(x) + \\log(y)\\).",
      "Taking \\(\\log\\) of a negative number or zero — undefined.",
      "Assuming \\(\\log\\) means \\(\\ln\\) or vice versa without checking the context.",
    ],
  },
  "2.10": {
    id: "2.10",
    title: "Inverses of Exponential Functions",
    summary:
      "The logarithm is the inverse of the exponential function: if \\(f(x) = b^x\\), then \\(f^{-1}(x) = \\log_b x\\).",
    lesson:
      "Since \\(b^x\\) is one-to-one (strictly increasing for \\(b > 1\\), strictly decreasing for \\(0 < b < 1\\)), it has an inverse. That inverse is \\(\\log_b\\).\n\nCheck via composition:\n- \\(b^{\\log_b(x)} = x\\) for \\(x > 0\\).\n- \\(\\log_b(b^x) = x\\) for all real \\(x\\).\n\n**Graphical reflection**: the graph of \\(y = \\log_b x\\) is the reflection of \\(y = b^x\\) across the line \\(y = x\\). Where \\(b^x\\) has HA \\(y = 0\\), \\(\\log_b x\\) has VA \\(x = 0\\). Where \\(b^x\\) has y-intercept \\((0, 1)\\), \\(\\log_b x\\) has x-intercept \\((1, 0)\\).\n\nDomain/range swap:\n- \\(b^x\\): domain all reals, range \\((0, \\infty)\\).\n- \\(\\log_b x\\): domain \\((0, \\infty)\\), range all reals.\n\nInvertibility is why logs are so useful: any exponential equation can be converted to a linear one by taking a log.",
    keyIdeas: [
      "\\(\\log_b\\) and \\(b^x\\) are inverses; compose to the identity.",
      "Graph of \\(\\log_b x\\) reflects graph of \\(b^x\\) across \\(y = x\\).",
      "Domain/range swap between them.",
      "VA at \\(x = 0\\) for \\(\\log\\); HA at \\(y = 0\\) for \\(b^x\\).",
    ],
    commonMistakes: [
      "Thinking \\(\\log_b(x) = 1/b^x\\).",
      "Confusing the VA of \\(\\log_b x\\) with HA of \\(b^x\\).",
      "Trying to take \\(\\log_b(0)\\) — it's undefined (limit is \\(-\\infty\\)).",
    ],
    workedExample: {
      prompt:
        "Sketch key features of \\(g(x) = \\log_2 x\\) and compare to \\(f(x) = 2^x\\).",
      solution:
        "\\(f\\): HA \\(y = 0\\), passes \\((0,1)\\) and \\((1,2)\\). \\(g\\): VA \\(x = 0\\), passes \\((1, 0)\\) and \\((2, 1)\\). Each \\((a, b)\\) on \\(f\\) corresponds to \\((b, a)\\) on \\(g\\).",
    },
  },
  "2.11": {
    id: "2.11",
    title: "Logarithmic Functions",
    summary:
      "\\(f(x) = \\log_b x\\) has domain \\((0, \\infty)\\), range all reals, vertical asymptote \\(x = 0\\), and passes through \\((1, 0)\\).",
    lesson:
      "**Anatomy of \\(f(x) = \\log_b x\\)**:\n- **Domain**: \\((0, \\infty)\\) — logs of non-positive numbers are undefined.\n- **Range**: all real numbers.\n- **Vertical asymptote**: \\(x = 0\\).\n- **x-intercept**: \\((1, 0)\\), since \\(\\log_b 1 = 0\\).\n- **Shape**:\n  - \\(b > 1\\): increasing, concave down; grows slowly but without bound.\n  - \\(0 < b < 1\\): decreasing.\n\nLog functions grow extremely slowly for large \\(x\\) — slower than any positive-power function. They are the natural tool for describing phenomena that span many orders of magnitude (decibels, earthquake magnitudes, pH).\n\n**Transformations**: \\(f(x) = a \\log_b(c(x - h)) + k\\) shifts/stretches like any other function. Horizontal shift moves the VA; vertical shift moves the value at \\(x = 1\\).",
    keyIdeas: [
      "Domain \\((0, \\infty)\\); range all reals; VA \\(x = 0\\); x-intercept \\((1, 0)\\).",
      "\\(b > 1\\): increasing; \\(0 < b < 1\\): decreasing.",
      "Grows slower than any positive-power function.",
      "Transformations shift VA and x-intercept predictably.",
    ],
    workedExample: {
      prompt:
        "Identify the vertical asymptote and x-intercept of \\(g(x) = \\log_3(x - 2) + 4\\).",
      solution:
        "Argument zero when \\(x - 2 = 0\\), so **VA**: \\(x = 2\\). Set \\(g = 0\\): \\(\\log_3(x-2) = -4\\), so \\(x - 2 = 3^{-4} = 1/81\\), \\(x = 2 + 1/81\\).",
    },
    commonMistakes: [
      "Taking log of a negative number (domain violation).",
      "Placing the VA at \\(x = 0\\) even after a horizontal shift.",
      "Treating logs as polynomials for end behavior.",
    ],
  },
  "2.12": {
    id: "2.12",
    title: "Logarithmic Function Manipulation",
    summary:
      "Product, quotient, power, and change-of-base rules let you combine or separate log expressions.",
    lesson:
      "The **log rules** come from the corresponding exponent rules:\n- **Product**: \\(\\log_b(xy) = \\log_b x + \\log_b y\\).\n- **Quotient**: \\(\\log_b(x/y) = \\log_b x - \\log_b y\\).\n- **Power**: \\(\\log_b(x^n) = n \\log_b x\\).\n- **Change of base**: \\(\\log_b(x) = \\log_c(x) / \\log_c(b)\\) for any valid \\(c\\).\n\nTwo directions:\n- **Expanding**: break one log into a sum: \\(\\log((x^2 y)/z) = 2\\log x + \\log y - \\log z\\).\n- **Condensing**: combine sums into one log: \\(3\\log x - \\log y = \\log(x^3/y)\\).\n\nThese manipulations are how you solve log equations and evaluate log expressions on non-standard bases.\n\n**Common traps**:\n- \\(\\log(x + y) \\ne \\log x + \\log y\\).\n- \\(\\log(x)/\\log(y) \\ne \\log(x/y)\\).\n- Negative arguments appear when combining carelessly.",
    keyIdeas: [
      "Product \\(\\log(xy)\\), quotient \\(\\log(x/y)\\), power \\(\\log(x^n)\\) rules.",
      "Change of base converts between bases: \\(\\log_b x = \\ln x / \\ln b\\).",
      "Expanding separates; condensing combines.",
      "Always check domain — combining can hide invalid arguments.",
    ],
    workedExample: {
      prompt:
        "Write \\(\\log_2 x + 3\\log_2 y - \\log_2 z\\) as a single logarithm.",
      solution:
        "Apply power rule: \\(3\\log_2 y = \\log_2(y^3)\\). Combine: \\(\\log_2 x + \\log_2(y^3) - \\log_2 z = \\log_2(x y^3 / z)\\).",
    },
    commonMistakes: [
      "Writing \\(\\log(x + y) = \\log x + \\log y\\).",
      "Mixing up \\(\\log(x)/\\log(y)\\) and \\(\\log(x/y)\\).",
      "Forgetting the power rule applies only to an exponent *on the argument*: \\(\\log(x)^n \\ne n \\log x\\); you need the exponent inside — \\(\\log(x^n) = n\\log x\\).",
    ],
  },
  "2.13": {
    id: "2.13",
    title: "Exponential and Logarithmic Equations and Inequalities",
    summary:
      "Solve \\(b^x = c\\) by taking a log; solve \\(\\log_b x = c\\) by exponentiating. Always check for extraneous solutions.",
    lesson:
      "**Exponential equations**: isolate the exponential, then take a log. E.g., \\(5 \\cdot 2^x = 80 \\Rightarrow 2^x = 16 \\Rightarrow x = \\log_2 16 = 4\\). For ugly numbers use \\(\\ln\\) and the power rule: \\(3^x = 20 \\Rightarrow x \\ln 3 = \\ln 20 \\Rightarrow x = \\ln 20 / \\ln 3\\).\n\n**Log equations**: isolate the log, then exponentiate. \\(\\log_3(x - 1) = 2 \\Rightarrow x - 1 = 3^2 = 9 \\Rightarrow x = 10\\). Then **check the domain**: argument must be positive.\n\n**Common traps — extraneous solutions**:\n- Combining two logs into one can introduce solutions that violate the original domain. \\(\\log(x) + \\log(x-3) = 1\\) combines to \\(\\log(x(x-3)) = 1 \\Rightarrow x^2 - 3x - 10 = 0 \\Rightarrow x = 5\\) or \\(x = -2\\). But \\(x = -2\\) makes \\(\\log(x)\\) undefined, so reject.\n\n**Inequalities**: flip the inequality if you multiply by a negative, but exponentials and logs preserve direction for positive bases \\(> 1\\) and reverse for bases \\(< 1\\). Most AP problems use base \\(> 1\\), so the inequality preserves.",
    keyIdeas: [
      "Exp equations: isolate, take log; log equations: isolate, exponentiate.",
      "Always verify solutions in the original equation — logs can generate extraneous ones.",
      "For exponential inequalities with base \\(>1\\), the direction is preserved; with base \\(<1\\), reversed.",
    ],
    workedExample: {
      prompt:
        "Solve \\(\\ln(x) + \\ln(x-2) = \\ln(15)\\).",
      solution:
        "Combine: \\(\\ln(x(x-2)) = \\ln(15)\\) → \\(x^2 - 2x = 15\\) → \\(x^2 - 2x - 15 = 0\\) → \\((x-5)(x+3) = 0\\) → \\(x = 5\\) or \\(x = -3\\). Check: \\(x = -3\\) fails (negative argument). **\\(x = 5\\)**.",
    },
    commonMistakes: [
      "Forgetting to check for extraneous solutions.",
      "Taking the log of both sides of an equation where one side is zero or negative.",
      "Reversing inequality direction for base \\(> 1\\) — only reverse for base \\(< 1\\).",
    ],
  },
  "2.14": {
    id: "2.14",
    title: "Logarithmic Function Context and Data Modeling",
    summary:
      "Log scales (Richter, pH, decibels) compress huge ranges; logarithmic models capture data where change slows over time.",
    lesson:
      "Logs are used whenever data spans many orders of magnitude or where the **rate of change decreases** but the quantity keeps growing.\n\n**Log scales**:\n- **pH**: \\(\\text{pH} = -\\log_{10}[\\text{H}^+]\\). A pH difference of 1 corresponds to a 10× change in acidity.\n- **Richter scale**: magnitude \\(M\\) means amplitude scales like \\(10^M\\). A magnitude-7 earthquake is 10× the amplitude of a magnitude-6.\n- **Decibels (dB)**: \\(L = 10 \\log_{10}(I/I_0)\\). Every 10 dB is a 10× increase in intensity.\n\n**Log models** \\(f(x) = a + b \\log_c(x)\\) fit data where growth slows. If residuals from a linear model show a pattern that curves downward with increasing \\(x\\), try a log model.\n\n**Interpretation on FRQs**:\n- \\(a\\) is the output when \\(x = 1\\) (since \\(\\log 1 = 0\\)).\n- \\(b\\) tells you how much output changes for each multiplicative change in \\(x\\) (e.g., each doubling).",
    keyIdeas: [
      "Log scales compress wide-range quantities.",
      "pH, Richter, decibels are canonical examples.",
      "Log models fit data where rate of change decreases but never stops.",
      "Coefficient in front of log tells rate of change per multiplicative step.",
    ],
    workedExample: {
      prompt:
        "How many times more intense is a 70 dB sound than a 40 dB sound?",
      solution:
        "Difference 30 dB → ratio \\(10^{30/10} = 10^3 = 1000\\). The 70 dB sound is **1000 times** more intense.",
    },
    commonMistakes: [
      "Treating a difference on a log scale as an additive difference rather than a multiplicative one.",
      "Forgetting the factor of 10 in the decibel formula.",
      "Confusing 'log base' in context (pH is base 10, not \\(e\\)).",
    ],
  },
  "2.15": {
    id: "2.15",
    title: "Semi-log Plots",
    summary:
      "A semi-log plot (log y, linear x) turns exponentials into straight lines. The slope of the line is proportional to the growth rate.",
    lesson:
      "A **semi-log plot** uses a logarithmic \\(y\\)-axis and a linear \\(x\\)-axis (or vice versa). On such a plot:\n- An exponential function \\(y = ab^x\\) becomes a **straight line**: taking \\(\\log\\) of both sides, \\(\\log y = \\log a + x \\log b\\). The slope is \\(\\log b\\) and the y-intercept is \\(\\log a\\).\n- A power function \\(y = a x^n\\) becomes a straight line on a **log-log** plot: \\(\\log y = \\log a + n \\log x\\). Slope \\(n\\).\n\nThe usefulness: if you plot data on semi-log paper and it's linear, the underlying relationship is exponential. If it's linear on log-log paper, it's a power law. This is a quick visual model-validation tool.\n\n**Reading off parameters**:\n- From a semi-log plot with slope \\(m\\), the growth factor is \\(b = 10^m\\) (if you used base-10 log).\n- From a log-log plot with slope \\(n\\), that's the exponent in the power law directly.\n\nOn the AP exam you might be given a semi-log plot and asked to recover \\(a\\) and \\(b\\) in \\(y = a b^x\\), or simply to recognize the data as exponential.",
    keyIdeas: [
      "Semi-log: one axis linear, one axis log.",
      "Exponentials straighten on semi-log plots.",
      "Power laws straighten on log-log plots.",
      "Slope on semi-log = \\(\\log(\\text{growth factor})\\); slope on log-log = power exponent.",
    ],
    workedExample: {
      prompt:
        "Data plotted on a semi-log (base 10) plot falls on a line with slope \\(0.3\\) and y-intercept \\(2\\). Find \\(y = a b^x\\).",
      solution:
        "\\(\\log y = 2 + 0.3x\\). So \\(a = 10^2 = 100\\) and \\(b = 10^{0.3} \\approx 1.995 \\approx 2\\). Model: \\(y = 100 \\cdot 2^x\\).",
    },
    commonMistakes: [
      "Confusing semi-log (exponential) with log-log (power-law).",
      "Forgetting to undo the log when reading off \\(a\\) and \\(b\\) from the plot.",
      "Using natural log values without converting when the plot is base 10.",
    ],
  },

  // ===========================================================================
  // UNIT 3 — Trigonometric and Polar Functions
  // ===========================================================================
  "3.1": {
    id: "3.1",
    title: "Periodic Phenomena",
    summary:
      "A periodic function repeats its outputs at regular input intervals. The period, amplitude, and midline describe the repetition.",
    lesson:
      "A function \\(f\\) is **periodic** if there is a positive number \\(P\\) such that \\(f(x + P) = f(x)\\) for every \\(x\\) in the domain. The smallest such \\(P\\) is the **period**.\n\nKey descriptors:\n- **Period** \\(P\\): horizontal distance for one full cycle.\n- **Amplitude** \\(A\\): half the vertical distance between max and min, \\(A = (\\max - \\min)/2\\).\n- **Midline** \\(y = k\\): horizontal line halfway between max and min, \\(k = (\\max + \\min)/2\\).\n- **Frequency** \\(f = 1/P\\): cycles per unit of input.\n\nPeriodic behavior shows up in tides, temperature cycles, pendulums, circadian rhythms, sound waves. In AP Precalc the canonical periodic functions are sine, cosine, and tangent — and everything in this unit builds toward modeling real periodic data with sinusoidal functions.\n\n**Reading a graph**: pick two consecutive peaks; the horizontal distance between them is the period. Measure the vertical distance from peak to trough, divide by 2, for amplitude. Average peak and trough heights for the midline.",
    keyIdeas: [
      "Period \\(P\\): smallest positive \\(P\\) with \\(f(x + P) = f(x)\\).",
      "Amplitude \\(= (\\max - \\min)/2\\).",
      "Midline \\(= (\\max + \\min)/2\\).",
      "Frequency \\(= 1/P\\).",
    ],
    workedExample: {
      prompt:
        "A periodic function oscillates between a max of \\(14\\) and a min of \\(-2\\) with period \\(8\\). Find amplitude, midline, and frequency.",
      solution:
        "Amplitude \\(= (14 - (-2))/2 = 8\\). Midline: \\(y = (14 + (-2))/2 = 6\\). Frequency \\(= 1/8\\) cycles per unit.",
    },
    commonMistakes: [
      "Confusing amplitude (half the vertical range) with the full range.",
      "Measuring period from zero to peak (that's a quarter-period).",
      "Reporting midline as a number rather than an equation \\(y = k\\).",
    ],
  },
  "3.2": {
    id: "3.2",
    title: "Sine, Cosine, and Tangent",
    summary:
      "Sine, cosine, and tangent are defined on the unit circle by coordinates and slope: \\(\\sin\\theta = y,\\ \\cos\\theta = x,\\ \\tan\\theta = y/x\\).",
    lesson:
      "Start on the **unit circle** (radius 1, centered at origin). For any angle \\(\\theta\\) measured counterclockwise from the positive \\(x\\)-axis, the **terminal point** \\((x, y)\\) satisfies \\(x^2 + y^2 = 1\\). Define:\n- \\(\\cos \\theta = x\\) (the horizontal coordinate).\n- \\(\\sin \\theta = y\\) (the vertical coordinate).\n- \\(\\tan \\theta = y/x = \\sin\\theta / \\cos\\theta\\).\n\n**Pythagorean identity**: since \\(x^2 + y^2 = 1\\), \\(\\sin^2\\theta + \\cos^2\\theta = 1\\).\n\nFor an angle \\(\\theta\\) in a right triangle with opposite side O, adjacent A, hypotenuse H:\n- \\(\\sin\\theta = O/H\\).\n- \\(\\cos\\theta = A/H\\).\n- \\(\\tan\\theta = O/A\\).\n\n**Angle measure**: AP Precalc uses both **degrees** (full circle = 360°) and **radians** (full circle = \\(2\\pi\\)). Conversions: \\(180° = \\pi\\) rad, so \\(\\theta_{\\text{rad}} = \\theta_{\\text{deg}} \\cdot \\pi/180\\). Most calculus work uses radians.\n\n**Signs by quadrant**:\n- Q1 (0 to 90°): all positive.\n- Q2 (90° to 180°): only sine positive.\n- Q3 (180° to 270°): only tangent positive.\n- Q4 (270° to 360°): only cosine positive.\n- Mnemonic: **All Students Take Calculus** (A, S, T, C starting in Q1).",
    keyIdeas: [
      "Unit circle: \\(\\cos\\theta = x\\), \\(\\sin\\theta = y\\).",
      "\\(\\tan\\theta = \\sin\\theta/\\cos\\theta\\).",
      "Pythagorean: \\(\\sin^2\\theta + \\cos^2\\theta = 1\\).",
      "Radians: \\(\\pi\\) rad \\(= 180°\\).",
      "All Students Take Calculus: sign pattern by quadrant.",
    ],
    workedExample: {
      prompt:
        "If \\(\\theta\\) is in quadrant II and \\(\\sin\\theta = 3/5\\), find \\(\\cos\\theta\\) and \\(\\tan\\theta\\).",
      solution:
        "\\(\\cos^2\\theta = 1 - 9/25 = 16/25\\), so \\(\\cos\\theta = \\pm 4/5\\). In Q2, cosine is negative: \\(\\cos\\theta = -4/5\\). Then \\(\\tan\\theta = (3/5)/(-4/5) = -3/4\\).",
    },
    commonMistakes: [
      "Switching sine and cosine on the unit circle.",
      "Mixing radians and degrees in the same calculation.",
      "Ignoring the quadrant when taking a square root.",
    ],
  },
  "3.3": {
    id: "3.3",
    title: "Sine and Cosine Function Values",
    summary:
      "Memorize exact values at the special angles \\(0,\\ \\pi/6,\\ \\pi/4,\\ \\pi/3,\\ \\pi/2\\) and use reference angles + symmetry to extend.",
    lesson:
      "**Exact values** for special angles in Q1 (memorize):\n\n| \\(\\theta\\) | \\(0\\) | \\(\\pi/6\\) | \\(\\pi/4\\) | \\(\\pi/3\\) | \\(\\pi/2\\) |\n|---|---|---|---|---|---|\n| \\(\\sin\\theta\\) | \\(0\\) | \\(1/2\\) | \\(\\sqrt{2}/2\\) | \\(\\sqrt{3}/2\\) | \\(1\\) |\n| \\(\\cos\\theta\\) | \\(1\\) | \\(\\sqrt{3}/2\\) | \\(\\sqrt{2}/2\\) | \\(1/2\\) | \\(0\\) |\n\nNote the symmetry: \\(\\sin\\) goes \\(0,\\ 1/2,\\ \\sqrt{2}/2,\\ \\sqrt{3}/2,\\ 1\\); \\(\\cos\\) is the reverse. A handy mnemonic is \\(\\sin\\theta = \\sqrt{n}/2\\) for \\(n = 0, 1, 2, 3, 4\\).\n\n**Reference angle**: for any \\(\\theta\\), the reference angle \\(\\theta_r\\) is the acute angle between the terminal side and the \\(x\\)-axis. Values of sine/cosine at \\(\\theta\\) equal those at \\(\\theta_r\\) up to sign (determined by quadrant).\n\nExample: \\(\\sin(5\\pi/6) = \\sin(\\pi/6) = 1/2\\) (Q2, sine positive). \\(\\cos(5\\pi/6) = -\\cos(\\pi/6) = -\\sqrt{3}/2\\).\n\n**Symmetries / identities**:\n- \\(\\sin(-\\theta) = -\\sin\\theta\\) (sine is odd).\n- \\(\\cos(-\\theta) = \\cos\\theta\\) (cosine is even).\n- \\(\\sin(\\theta + 2\\pi) = \\sin\\theta\\); \\(\\cos(\\theta + 2\\pi) = \\cos\\theta\\) (period \\(2\\pi\\)).\n- \\(\\sin(\\pi - \\theta) = \\sin\\theta\\); \\(\\cos(\\pi - \\theta) = -\\cos\\theta\\).\n- \\(\\sin(\\pi/2 - \\theta) = \\cos\\theta\\); \\(\\cos(\\pi/2 - \\theta) = \\sin\\theta\\) (complementary).",
    keyIdeas: [
      "Memorize Q1 values for \\(0,\\ \\pi/6,\\ \\pi/4,\\ \\pi/3,\\ \\pi/2\\).",
      "Use reference angles + quadrant sign for other angles.",
      "Sine is odd, cosine is even.",
      "Period \\(2\\pi\\): values repeat every \\(2\\pi\\).",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\cos(7\\pi/6)\\).",
      solution:
        "\\(7\\pi/6\\) is in Q3, reference angle \\(\\pi/6\\). In Q3, cosine is negative. \\(\\cos(7\\pi/6) = -\\cos(\\pi/6) = -\\sqrt{3}/2\\).",
    },
    commonMistakes: [
      "Forgetting to apply the quadrant sign.",
      "Swapping \\(\\sin(\\pi/6) = \\sqrt{3}/2\\) with \\(\\cos(\\pi/6) = 1/2\\). (It's the other way: \\(\\sin(\\pi/6) = 1/2\\).)",
      "Reporting a reference angle as the answer when it should carry the quadrant sign.",
    ],
  },
  "3.4": {
    id: "3.4",
    title: "Sine and Cosine Function Graphs",
    summary:
      "\\(y = \\sin x\\) and \\(y = \\cos x\\) have amplitude 1, period \\(2\\pi\\), midline \\(y = 0\\); cosine is sine shifted left by \\(\\pi/2\\).",
    lesson:
      "**Parent graphs**:\n- \\(y = \\sin x\\): passes through origin, peaks at \\((\\pi/2, 1)\\), zero at \\(\\pi\\), trough at \\((3\\pi/2, -1)\\), zero at \\(2\\pi\\). Range \\([-1, 1]\\).\n- \\(y = \\cos x\\): peak at \\((0, 1)\\), zero at \\(\\pi/2\\), trough at \\((\\pi, -1)\\), zero at \\(3\\pi/2\\), back to peak at \\(2\\pi\\). Range \\([-1, 1]\\).\n\nBoth have period \\(2\\pi\\), amplitude 1, midline \\(y = 0\\).\n\n**Relation between them**: \\(\\cos x = \\sin(x + \\pi/2)\\) — cosine is sine shifted **left** by \\(\\pi/2\\).\n\n**Key features**:\n- Domain: all reals.\n- Zeros of sine: \\(x = n\\pi\\); zeros of cosine: \\(x = \\pi/2 + n\\pi\\).\n- Maxima of sine: \\(x = \\pi/2 + 2n\\pi\\); of cosine: \\(x = 2n\\pi\\).\n- Sine is odd: symmetric about origin. Cosine is even: symmetric about the y-axis.\n\nGraphing by hand: draw five key points in one period — start, peak, middle zero, trough, end. Then replicate.",
    keyIdeas: [
      "\\(\\sin x\\) and \\(\\cos x\\) have period \\(2\\pi\\), amplitude 1, midline 0.",
      "Sine is odd; cosine is even.",
      "\\(\\cos x = \\sin(x + \\pi/2)\\).",
      "Five key points per cycle: start, peak, middle zero, trough, end.",
    ],
    commonMistakes: [
      "Forgetting sine starts at origin and cosine at \\((0,1)\\).",
      "Mixing up zero locations of sine vs. cosine.",
      "Treating the zero between max and min as an inflection point but not a zero.",
    ],
    workedExample: {
      prompt:
        "Find all \\(x\\) in \\([0, 2\\pi]\\) where \\(\\sin x = \\cos x\\).",
      solution:
        "\\(\\sin x = \\cos x \\Rightarrow \\tan x = 1 \\Rightarrow x = \\pi/4\\) or \\(x = 5\\pi/4\\) in \\([0, 2\\pi]\\).",
    },
  },
  "3.5": {
    id: "3.5",
    title: "Sinusoidal Functions",
    summary:
      "A sinusoidal function \\(f(x) = A\\sin(B(x - h)) + k\\) has amplitude \\(|A|\\), period \\(2\\pi/|B|\\), phase shift \\(h\\), and midline \\(y = k\\).",
    lesson:
      "A **sinusoidal function** is any sine or cosine wave shifted and scaled:\n\\[ f(x) = A\\sin(B(x - h)) + k \\quad \\text{or} \\quad f(x) = A\\cos(B(x - h)) + k \\]\n\n**Parameters**:\n- \\(|A|\\): **amplitude**.\n- \\(B\\): angular frequency; **period** \\(= 2\\pi / |B|\\).\n- \\(h\\): **phase shift** (horizontal shift).\n- \\(k\\): **vertical shift** / midline \\(y = k\\).\n\nReflection: if \\(A < 0\\), the wave is flipped upside down. If \\(B < 0\\), the wave reflects horizontally — which for sine flips sign and for cosine has no effect (since cosine is even).\n\n**Working backwards from data**: Given max \\(M\\), min \\(m\\), and period \\(P\\):\n- \\(A = (M - m)/2\\).\n- \\(k = (M + m)/2\\).\n- \\(B = 2\\pi / P\\).\n- \\(h\\) determined by when the function hits a specific landmark (e.g., max, midline going up).",
    keyIdeas: [
      "Standard form: \\(f(x) = A\\sin(B(x - h)) + k\\).",
      "Amplitude \\(|A|\\); period \\(2\\pi/|B|\\); phase shift \\(h\\); midline \\(y = k\\).",
      "Max \\(= k + |A|\\); min \\(= k - |A|\\).",
      "Inside-out: scale by \\(B\\) first, then shift by \\(h\\).",
    ],
    workedExample: {
      prompt:
        "A sinusoidal function has max \\(10\\), min \\(2\\), period \\(12\\), and first reaches its maximum at \\(x = 3\\). Write it as a cosine function.",
      solution:
        "Amplitude \\(A = (10-2)/2 = 4\\); midline \\(k = 6\\); \\(B = 2\\pi/12 = \\pi/6\\). Cosine peaks at \\(x = h\\), so \\(h = 3\\). Thus \\(f(x) = 4\\cos(\\tfrac{\\pi}{6}(x - 3)) + 6\\).",
    },
    commonMistakes: [
      "Confusing \\(B\\) with period (period \\(= 2\\pi/|B|\\), not \\(B\\) itself).",
      "Writing \\(B(x - h)\\) as \\(Bx - h\\).",
      "Setting amplitude to \\(M - m\\) instead of \\((M - m)/2\\).",
    ],
  },
  "3.6": {
    id: "3.6",
    title: "Sinusoidal Function Transformations",
    summary:
      "Vertical and horizontal shifts, stretches, and reflections combine to transform \\(\\sin x\\) or \\(\\cos x\\) into any sinusoidal function.",
    lesson:
      "Transformations are applied inside-out, same as any function.\n\nFor \\(f(x) = A\\sin(B(x - h)) + k\\):\n- **Horizontal stretch/compress** by factor \\(1/|B|\\) (compress if \\(|B| > 1\\), stretch if \\(|B| < 1\\)).\n- **Horizontal shift** right by \\(h\\) (left if \\(h < 0\\)).\n- **Vertical stretch/compress** by factor \\(|A|\\); reflection across midline if \\(A < 0\\).\n- **Vertical shift** up by \\(k\\).\n\nOrder matters when applying by hand — scale first, then shift. When reading a formula, factor the inside to make \\(h\\) visible. \\(f(x) = \\sin(2x - \\pi)\\) must be factored as \\(\\sin(2(x - \\pi/2))\\) to see the shift \\(h = \\pi/2\\).\n\n**Equivalent forms**: \\(\\sin(x + \\pi/2) = \\cos x\\). Any sinusoidal function can be written as a sine or cosine with appropriate phase shift.\n\nCommon FRQ task: given a sinusoidal graph, write both a sine and cosine equation for it. The amplitude, period, and midline stay the same; the horizontal shift differs by a quarter period.",
    keyIdeas: [
      "Apply transformations inside-out: scale before shift.",
      "Factor the argument to read off the phase shift.",
      "Any sinusoidal can be written as sine OR cosine with a different shift.",
      "Negative \\(A\\) reflects across the midline.",
    ],
    workedExample: {
      prompt:
        "Describe the transformations in \\(f(x) = -2\\cos(3x + \\pi) + 1\\).",
      solution:
        "Factor: \\(f(x) = -2\\cos(3(x + \\pi/3)) + 1\\). Shift left \\(\\pi/3\\); compress horizontally by factor \\(1/3\\) (period \\(2\\pi/3\\)); stretch vertically by 2 and reflect across midline; shift up 1. Midline \\(y = 1\\); amplitude 2; max 3, min \\(-1\\).",
    },
    commonMistakes: [
      "Reading \\(h\\) as the whole coefficient instead of the shift (must factor).",
      "Flipping over the \\(x\\)-axis (a reflection is across the midline, not the axis).",
      "Applying the shift before the horizontal scale.",
    ],
  },
  "3.7": {
    id: "3.7",
    title: "Sinusoidal Function Context and Data Modeling",
    summary:
      "Fit a sinusoidal model to periodic data (tides, temperatures, daylight, rotating objects) by identifying amplitude, period, midline, and phase.",
    lesson:
      "To model periodic data with \\(f(x) = A\\sin(B(x - h)) + k\\):\n1. **Midline** \\(k = (\\max + \\min)/2\\).\n2. **Amplitude** \\(A = (\\max - \\min)/2\\).\n3. **Period** \\(P\\) from context (24 hours for daily tides, 12 months for temperature, \\(2\\pi\\) per revolution). Then \\(B = 2\\pi/P\\).\n4. **Phase shift** \\(h\\): decide which reference point to align. If using sine, align with midline-going-up; if using cosine, align with the max.\n\n**Interpretation on FRQs**: always state what each parameter means in context. 'The average temperature is 60°F, it oscillates 20°F above and below, completes one cycle every 12 months, and reaches its maximum in July.'\n\n**Context examples**:\n- **Tides**: water level oscillates between high and low tide, period ~12.4 hours.\n- **Temperature**: monthly average temperature over a year, period 12 months.\n- **Daylight hours**: period 365 days.\n- **Ferris wheel / rotating wheel**: period = time for one rotation.",
    keyIdeas: [
      "\\(k\\) = midline; \\(A\\) = amplitude from max/min.",
      "\\(B = 2\\pi/P\\) from context-given period.",
      "\\(h\\) chosen to align with a reference point (max for cosine, midline-up for sine).",
      "Always interpret parameters in context.",
    ],
    workedExample: {
      prompt:
        "A Ferris wheel has diameter 60 ft. Its center is 35 ft above the ground. It takes 2 minutes per revolution. A rider starts at the bottom. Model height \\(h(t)\\) in minutes.",
      solution:
        "Amplitude \\(A = 30\\); midline \\(k = 35\\); period \\(2\\); \\(B = \\pi\\). Starts at bottom, so use \\(-\\cos\\): \\(h(t) = -30 \\cos(\\pi t) + 35\\). At \\(t = 0\\), \\(h = -30 + 35 = 5\\) ft (matches bottom of wheel at 35 − 30 = 5).",
    },
    commonMistakes: [
      "Using degrees when calculator is in radians (or vice versa).",
      "Forgetting the sign on \\(A\\) when the starting point is the minimum.",
      "Reporting period as \\(B\\) rather than \\(2\\pi/B\\).",
    ],
  },
  "3.8": {
    id: "3.8",
    title: "The Tangent Function",
    summary:
      "\\(\\tan x = \\sin x / \\cos x\\) has period \\(\\pi\\), zeros where sine is zero, and vertical asymptotes where cosine is zero.",
    lesson:
      "The **tangent function** \\(\\tan x = \\sin x / \\cos x\\) has a fundamentally different shape from sine and cosine.\n\n**Features**:\n- **Period**: \\(\\pi\\) (not \\(2\\pi\\)).\n- **Domain**: all reals except where \\(\\cos x = 0\\), i.e., \\(x \\ne \\pi/2 + n\\pi\\).\n- **Vertical asymptotes**: at \\(x = \\pi/2 + n\\pi\\).\n- **Zeros**: at \\(x = n\\pi\\) (where sine is zero).\n- **Range**: all real numbers.\n- **Shape** in each period \\((-\\pi/2, \\pi/2)\\): increasing, from \\(-\\infty\\) at \\(-\\pi/2^+\\) through \\((0, 0)\\) to \\(+\\infty\\) at \\(\\pi/2^-\\).\n- **Odd function**: \\(\\tan(-x) = -\\tan x\\).\n\n**Geometric interpretation**: on the unit circle, \\(\\tan \\theta\\) is the slope of the line from origin through the terminal point; equivalently, if you extend that line to hit the vertical line \\(x = 1\\), its \\(y\\)-coordinate is \\(\\tan\\theta\\).\n\n**Transformations**: \\(y = A\\tan(B(x - h)) + k\\) scales vertically by \\(A\\), horizontally by \\(1/B\\) (so period \\(\\pi/|B|\\)), shifts right by \\(h\\), up by \\(k\\). Unlike sine/cosine, tangent has no 'amplitude' — it has no bound — so \\(A\\) is just a vertical scale.",
    keyIdeas: [
      "\\(\\tan x = \\sin x / \\cos x\\); period \\(\\pi\\).",
      "VAs where \\(\\cos x = 0\\): \\(x = \\pi/2 + n\\pi\\).",
      "Zeros at \\(x = n\\pi\\).",
      "Range is all reals; no amplitude.",
    ],
    workedExample: {
      prompt:
        "Find the VAs and zeros of \\(g(x) = \\tan(2x)\\) in \\([0, 2\\pi]\\).",
      solution:
        "VAs when \\(\\cos(2x) = 0 \\Rightarrow 2x = \\pi/2 + n\\pi \\Rightarrow x = \\pi/4 + n\\pi/2\\). In \\([0, 2\\pi]\\): \\(x = \\pi/4,\\ 3\\pi/4,\\ 5\\pi/4,\\ 7\\pi/4\\). Zeros when \\(\\sin(2x) = 0 \\Rightarrow 2x = n\\pi \\Rightarrow x = n\\pi/2\\): \\(0, \\pi/2, \\pi, 3\\pi/2, 2\\pi\\).",
    },
    commonMistakes: [
      "Using period \\(2\\pi\\) for tangent.",
      "Putting zeros and asymptotes at the same place.",
      "Applying 'amplitude' language to tangent.",
    ],
  },
  "3.9": {
    id: "3.9",
    title: "Inverse Trigonometric Functions",
    summary:
      "\\(\\sin^{-1},\\ \\cos^{-1},\\ \\tan^{-1}\\) are inverses of sine, cosine, and tangent on restricted domains that make them one-to-one.",
    lesson:
      "Since sine, cosine, and tangent are not one-to-one, we restrict domains:\n- **Arcsine**: \\(\\sin^{-1}: [-1, 1] \\to [-\\pi/2, \\pi/2]\\).\n- **Arccosine**: \\(\\cos^{-1}: [-1, 1] \\to [0, \\pi]\\).\n- **Arctangent**: \\(\\tan^{-1}: \\mathbb{R} \\to (-\\pi/2, \\pi/2)\\).\n\nEach returns an angle whose sine/cosine/tangent is the given value.\n\n**Compositions**:\n- \\(\\sin(\\sin^{-1}(x)) = x\\) for \\(x \\in [-1, 1]\\).\n- \\(\\sin^{-1}(\\sin(x)) = x\\) only for \\(x \\in [-\\pi/2, \\pi/2]\\) — outside that range, you get the corresponding angle within the range.\n\n**Evaluating**: \\(\\sin^{-1}(1/2)\\) asks 'what angle in \\([-\\pi/2, \\pi/2]\\) has sine \\(1/2\\)?' Answer: \\(\\pi/6\\). \\(\\cos^{-1}(-1/2)\\): 'what angle in \\([0, \\pi]\\) has cosine \\(-1/2\\)?' Answer: \\(2\\pi/3\\).\n\n**Graphs**: each is the reflection of the (restricted) original across \\(y = x\\).\n- Arcsine: from \\((-1, -\\pi/2)\\) to \\((1, \\pi/2)\\), increasing, odd.\n- Arccosine: from \\((-1, \\pi)\\) to \\((1, 0)\\), decreasing.\n- Arctangent: HAs at \\(y = \\pm \\pi/2\\).\n\n**Notation warning**: \\(\\sin^{-1}(x)\\) is the inverse function, not \\(1/\\sin(x) = \\csc(x)\\).",
    keyIdeas: [
      "Arcsine range \\([-\\pi/2, \\pi/2]\\); arccosine range \\([0, \\pi]\\); arctangent range \\((-\\pi/2, \\pi/2)\\).",
      "\\(\\sin^{-1}(\\sin x) = x\\) only on the restricted domain.",
      "Reflection of restricted original across \\(y = x\\).",
      "\\(\\sin^{-1}\\) is NOT \\(1/\\sin\\).",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\tan^{-1}(-\\sqrt{3})\\).",
      solution:
        "Looking for angle in \\((-\\pi/2, \\pi/2)\\) with tangent \\(-\\sqrt{3}\\). \\(\\tan(\\pi/3) = \\sqrt{3}\\); tangent is odd, so \\(\\tan(-\\pi/3) = -\\sqrt{3}\\). Answer: \\(-\\pi/3\\).",
    },
    commonMistakes: [
      "Writing \\(\\sin^{-1}(x) = 1/\\sin x\\).",
      "Forgetting range restrictions — answers outside the range are wrong.",
      "Reporting any angle with the right sine/cosine/tangent, instead of the unique one in the range.",
    ],
  },
  "3.10": {
    id: "3.10",
    title: "Trigonometric Equations and Inequalities",
    summary:
      "Solve by isolating the trig function, using inverse trig for principal solutions, then adding the period or using symmetry for all solutions.",
    lesson:
      "**Method for \\(\\sin x = c\\), \\(\\cos x = c\\), or \\(\\tan x = c\\)**:\n1. Isolate the trig function.\n2. Find the **principal solution** using the inverse function, respecting the range.\n3. Use symmetry (sine: second solution at \\(\\pi -\\) principal; cosine: second solution at \\(-\\) principal) to find a second solution within one period.\n4. Add multiples of the period for all solutions.\n\n**Example**: \\(\\sin x = 1/2\\). Principal: \\(x = \\pi/6\\). Second solution in \\([0, 2\\pi)\\): \\(x = \\pi - \\pi/6 = 5\\pi/6\\). All solutions: \\(x = \\pi/6 + 2n\\pi\\) or \\(x = 5\\pi/6 + 2n\\pi\\).\n\n**For tangent**: only one solution per period \\(\\pi\\). \\(\\tan x = 1 \\Rightarrow x = \\pi/4 + n\\pi\\).\n\n**Inequalities**: sketch the graph, identify intervals where the function lies above/below \\(c\\). Intervals repeat periodically.\n\n**Equations involving multiple-angle**: for \\(\\sin(2x) = 1/2\\), solve \\(2x = \\pi/6 + 2n\\pi\\) or \\(2x = 5\\pi/6 + 2n\\pi\\), then divide by 2, giving \\(x = \\pi/12 + n\\pi\\) or \\(x = 5\\pi/12 + n\\pi\\).",
    keyIdeas: [
      "Isolate, invert, use symmetry, add period.",
      "Sine and cosine: 2 solutions per period; tangent: 1 solution per period.",
      "Multiple-angle equations: solve for the inner expression, then divide.",
      "Always specify the interval — general solutions should include \\(+ 2n\\pi\\) or \\(+ n\\pi\\).",
    ],
    workedExample: {
      prompt:
        "Find all solutions in \\([0, 2\\pi)\\) of \\(2\\cos x + \\sqrt{3} = 0\\).",
      solution:
        "\\(\\cos x = -\\sqrt{3}/2\\). Principal: \\(x = 5\\pi/6\\) (Q2). Second: \\(x = 7\\pi/6\\) (Q3). Solutions: \\(x = 5\\pi/6,\\ 7\\pi/6\\).",
    },
    commonMistakes: [
      "Reporting only the principal solution.",
      "Forgetting \\(2n\\pi\\) or \\(n\\pi\\) for general solutions.",
      "Dividing by \\(\\sin/\\cos\\) without checking for where it's zero.",
    ],
  },
  "3.11": {
    id: "3.11",
    title: "The Secant, Cosecant, and Cotangent Functions",
    summary:
      "\\(\\sec\\), \\(\\csc\\), \\(\\cot\\) are reciprocals of \\(\\cos\\), \\(\\sin\\), \\(\\tan\\). They inherit their zeros and asymptotes from those relationships.",
    lesson:
      "Reciprocal definitions:\n- \\(\\sec x = 1/\\cos x\\).\n- \\(\\csc x = 1/\\sin x\\).\n- \\(\\cot x = 1/\\tan x = \\cos x / \\sin x\\).\n\n**Properties**:\n- **Secant**: undefined where \\(\\cos x = 0\\). Range \\((-\\infty, -1] \\cup [1, \\infty)\\). Period \\(2\\pi\\). Even.\n- **Cosecant**: undefined where \\(\\sin x = 0\\). Range \\((-\\infty, -1] \\cup [1, \\infty)\\). Period \\(2\\pi\\). Odd.\n- **Cotangent**: undefined where \\(\\sin x = 0\\). Range all reals. Period \\(\\pi\\). Odd. Decreasing on each period.\n\n**Asymptotes and zeros**:\n- Secant has VAs where cosine has zeros; secant's minima/maxima align with cosine's maxima/minima.\n- Cosecant similarly tracks sine.\n- Cotangent has VAs where sine is zero; zeros where cosine is zero.\n\n**Graphing strategy**: graph the base function (sine, cosine, or tangent) faintly, then draw the reciprocal:\n- Where base is zero → VA.\n- Where base is ±1 → reciprocal is ±1 (they touch).\n- Where base is small → reciprocal is large.\n\n**Reciprocal-based identities**:\n- \\(\\sin^2 + \\cos^2 = 1\\) → dividing by \\(\\cos^2\\) gives \\(\\tan^2 + 1 = \\sec^2\\); dividing by \\(\\sin^2\\) gives \\(1 + \\cot^2 = \\csc^2\\).",
    keyIdeas: [
      "Sec/csc/cot are reciprocals of cos/sin/tan.",
      "VAs where the corresponding base function is zero.",
      "Secant and cosecant have range \\((-\\infty, -1] \\cup [1, \\infty)\\).",
      "\\(\\tan^2 + 1 = \\sec^2\\); \\(1 + \\cot^2 = \\csc^2\\).",
    ],
    workedExample: {
      prompt:
        "If \\(\\sin\\theta = 3/5\\) and \\(\\theta\\) is in Q2, find \\(\\sec\\theta\\), \\(\\csc\\theta\\), and \\(\\cot\\theta\\).",
      solution:
        "\\(\\cos\\theta = -4/5\\) (Q2), \\(\\tan\\theta = -3/4\\). \\(\\sec\\theta = -5/4\\), \\(\\csc\\theta = 5/3\\), \\(\\cot\\theta = -4/3\\).",
    },
    commonMistakes: [
      "Confusing \\(\\sec\\) with \\(\\csc\\).",
      "Trying to take \\(\\sec(\\pi/2)\\) — undefined.",
      "Forgetting the identities derived by dividing the Pythagorean identity.",
    ],
  },
  "3.12": {
    id: "3.12",
    title: "Equivalent Representations of Trigonometric Functions",
    summary:
      "Use Pythagorean, sum/difference, double-angle, and product identities to rewrite trigonometric expressions.",
    lesson:
      "Core identities worth memorizing:\n\n**Pythagorean**:\n- \\(\\sin^2\\theta + \\cos^2\\theta = 1\\).\n- \\(\\tan^2\\theta + 1 = \\sec^2\\theta\\).\n- \\(1 + \\cot^2\\theta = \\csc^2\\theta\\).\n\n**Sum and difference**:\n- \\(\\sin(a \\pm b) = \\sin a \\cos b \\pm \\cos a \\sin b\\).\n- \\(\\cos(a \\pm b) = \\cos a \\cos b \\mp \\sin a \\sin b\\).\n- \\(\\tan(a \\pm b) = (\\tan a \\pm \\tan b)/(1 \\mp \\tan a \\tan b)\\).\n\n**Double-angle**:\n- \\(\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta\\).\n- \\(\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta\\).\n- \\(\\tan(2\\theta) = 2\\tan\\theta/(1 - \\tan^2\\theta)\\).\n\n**Half-angle** (derived from double-angle): \\(\\sin^2(\\theta/2) = (1 - \\cos\\theta)/2\\), \\(\\cos^2(\\theta/2) = (1 + \\cos\\theta)/2\\).\n\n**Even/odd**:\n- \\(\\sin, \\tan, \\csc, \\cot\\) are odd.\n- \\(\\cos, \\sec\\) are even.\n\n**Co-function** (for complementary angles \\(\\pi/2 - \\theta\\)):\n- \\(\\sin(\\pi/2 - \\theta) = \\cos\\theta\\); \\(\\cos(\\pi/2 - \\theta) = \\sin\\theta\\); \\(\\tan(\\pi/2 - \\theta) = \\cot\\theta\\).\n\n**Strategy for simplification**:\n- Convert everything to sine and cosine.\n- Find common denominators.\n- Look for applicable identities.\n- Factor where possible.",
    keyIdeas: [
      "Three Pythagorean, sum/difference, double-angle identities form the core toolkit.",
      "Convert to sine and cosine, then simplify.",
      "Even/odd and cofunction identities handle sign manipulations.",
      "Multiple equivalent forms — pick the one that matches the target.",
    ],
    workedExample: {
      prompt:
        "Simplify \\((1 - \\cos(2x))/\\sin(2x)\\).",
      solution:
        "\\(1 - \\cos(2x) = 2\\sin^2 x\\). \\(\\sin(2x) = 2\\sin x \\cos x\\). Ratio: \\(2\\sin^2 x / (2\\sin x \\cos x) = \\sin x/\\cos x = \\tan x\\).",
    },
    commonMistakes: [
      "Writing \\(\\cos(2\\theta) = 2\\cos\\theta\\).",
      "Expanding \\(\\sin(a+b) = \\sin a + \\sin b\\).",
      "Forgetting to carry the sign in \\(\\cos(a \\pm b)\\) — it flips.",
    ],
  },
  "3.13": {
    id: "3.13",
    title: "Trigonometry and Polar Coordinates",
    summary:
      "Polar coordinates \\((r, \\theta)\\) describe a point by distance from origin and angle from positive x-axis. Convert to/from Cartesian using sin and cos.",
    lesson:
      "A point in the plane can be described by:\n- **Cartesian** coordinates \\((x, y)\\).\n- **Polar** coordinates \\((r, \\theta)\\), where \\(r\\) is the distance from origin and \\(\\theta\\) is the angle from the positive x-axis.\n\n**Conversions**:\n- **Polar → Cartesian**: \\(x = r\\cos\\theta\\), \\(y = r\\sin\\theta\\).\n- **Cartesian → Polar**: \\(r = \\sqrt{x^2 + y^2}\\), \\(\\theta = \\tan^{-1}(y/x)\\) — adjusted for quadrant.\n\n**Non-uniqueness**: a point has infinitely many polar representations. \\((3, \\pi/4)\\), \\((3, \\pi/4 + 2\\pi)\\), and \\((-3, \\pi/4 + \\pi)\\) all represent the same point. The convention \\(r \\ge 0\\), \\(\\theta \\in [0, 2\\pi)\\) gives a unique representation for most points (origin is special).\n\n**Negative r**: \\((-r, \\theta)\\) is the same point as \\((r, \\theta + \\pi)\\).\n\n**Polar equations**: describe curves via \\(r\\) as a function of \\(\\theta\\). \\(r = 3\\) is a circle of radius 3. \\(\\theta = \\pi/4\\) is the line through origin at 45°. \\(r = 2\\cos\\theta\\) is a circle of radius 1 centered at \\((1, 0)\\) in Cartesian.\n\n**Symmetry tests for polar curves**:\n- **About polar axis** (x-axis): replace \\(\\theta\\) with \\(-\\theta\\).\n- **About pole** (origin): replace \\(r\\) with \\(-r\\).\n- **About \\(\\theta = \\pi/2\\)** (y-axis): replace \\(\\theta\\) with \\(\\pi - \\theta\\).",
    keyIdeas: [
      "\\(x = r\\cos\\theta,\\ y = r\\sin\\theta\\); \\(r = \\sqrt{x^2+y^2}\\).",
      "Polar representations are not unique.",
      "\\((-r, \\theta) = (r, \\theta + \\pi)\\).",
      "\\(r = k\\) is a circle; \\(\\theta = k\\) is a line through origin.",
    ],
    workedExample: {
      prompt:
        "Convert \\((r, \\theta) = (4, 2\\pi/3)\\) to Cartesian.",
      solution:
        "\\(x = 4\\cos(2\\pi/3) = 4 \\cdot (-1/2) = -2\\). \\(y = 4\\sin(2\\pi/3) = 4 \\cdot \\sqrt{3}/2 = 2\\sqrt{3}\\). Answer: \\((-2, 2\\sqrt{3})\\).",
    },
    commonMistakes: [
      "Dropping the quadrant when computing \\(\\theta = \\tan^{-1}(y/x)\\).",
      "Treating polar representation as unique.",
      "Forgetting negative \\(r\\) is valid.",
    ],
  },
  "3.14": {
    id: "3.14",
    title: "Polar Function Graphs",
    summary:
      "Graphing \\(r = f(\\theta)\\) produces circles, cardioids, limaçons, and roses depending on the formula.",
    lesson:
      "To graph \\(r = f(\\theta)\\), make a table of \\((\\theta, r)\\) pairs at key angles, plot each as a polar point, and connect smoothly.\n\n**Canonical polar curves**:\n\n- **Circles**:\n  - \\(r = a\\): circle of radius \\(a\\) centered at origin.\n  - \\(r = 2a\\cos\\theta\\): circle of radius \\(a\\) centered at \\((a, 0)\\).\n  - \\(r = 2a\\sin\\theta\\): circle of radius \\(a\\) centered at \\((0, a)\\).\n\n- **Cardioids** (heart-shaped):\n  - \\(r = a(1 + \\cos\\theta)\\) or \\(r = a(1 + \\sin\\theta)\\).\n  - Has a dimple at one end and a max at the other.\n\n- **Limaçons**:\n  - \\(r = a + b\\cos\\theta\\) (or sin).\n  - If \\(|a| < |b|\\): inner loop.\n  - If \\(|a| = |b|\\): cardioid.\n  - If \\(|b| < |a| < 2|b|\\): dimpled limaçon.\n  - If \\(|a| \\ge 2|b|\\): convex limaçon.\n\n- **Rose curves** \\(r = a\\cos(n\\theta)\\) or \\(r = a\\sin(n\\theta)\\):\n  - If \\(n\\) is odd: \\(n\\) petals.\n  - If \\(n\\) is even: \\(2n\\) petals.\n  - Each petal has length \\(|a|\\).\n\n- **Lemniscates**: \\(r^2 = a^2\\cos(2\\theta)\\) — figure-eight.\n\n- **Spirals**: \\(r = a\\theta\\) — Archimedean spiral (not tested often but good to know).\n\n**Zeros** of \\(r = f(\\theta)\\): where \\(r = 0\\), the curve passes through the origin. The tangent direction there is \\(\\theta\\).",
    keyIdeas: [
      "\\(r = a\\): circle centered at origin.",
      "\\(r = a + b\\cos\\theta\\): limaçon (cardioid if \\(|a| = |b|\\)).",
      "\\(r = a\\cos(n\\theta)\\): rose — \\(n\\) petals if \\(n\\) odd, \\(2n\\) if even.",
      "Where \\(r = 0\\), the curve passes through origin.",
    ],
    workedExample: {
      prompt:
        "Identify the curve \\(r = 4\\sin(3\\theta)\\).",
      solution:
        "Rose curve with \\(n = 3\\) odd, so **3 petals**, each of length 4.",
    },
    commonMistakes: [
      "Counting petals wrong — odd \\(n\\) gives \\(n\\) petals (not \\(2n\\)).",
      "Treating negative \\(r\\) values as invalid — they flip the direction.",
      "Confusing cardioid with limaçon (cardioid is a special limaçon).",
    ],
  },
  "3.15": {
    id: "3.15",
    title: "Rates of Change in Polar Functions",
    summary:
      "For \\(r = f(\\theta)\\), the rate \\(dr/d\\theta\\) tells you whether the curve is moving toward or away from the origin.",
    lesson:
      "For a polar function \\(r = f(\\theta)\\), the **radial rate of change** is \\(dr/d\\theta\\). It describes how the distance from origin changes as the angle sweeps around.\n\n**Interpretations**:\n- \\(dr/d\\theta > 0\\): the curve is spiraling **outward** (getting farther from origin).\n- \\(dr/d\\theta < 0\\): the curve is spiraling **inward** (getting closer to origin).\n- \\(dr/d\\theta = 0\\): the curve is at a local extreme distance (but only relative to \\(r\\) as a function of \\(\\theta\\); not necessarily a max/min of distance from origin in absolute terms unless \\(r\\) itself is also an extremum).\n\nFor \\(r = f(\\theta)\\), the **average rate of change** over \\([\\theta_1, \\theta_2]\\) is:\n\\[ \\frac{f(\\theta_2) - f(\\theta_1)}{\\theta_2 - \\theta_1} \\]\n\nThis is the slope of the secant of \\(r\\) vs. \\(\\theta\\) over that interval.\n\n**Instantaneous rate** uses \\(dr/d\\theta = f'(\\theta)\\) — the derivative of \\(f\\). AP Precalc doesn't require you to compute derivatives (that's Calculus) but understand the interpretation. Calc BC will compute these.\n\n**Example**: for \\(r = 3 + 2\\cos\\theta\\), \\(r\\) is largest when \\(\\cos\\theta = 1\\) (\\(\\theta = 0\\)) giving \\(r = 5\\), smallest when \\(\\cos\\theta = -1\\) (\\(\\theta = \\pi\\)) giving \\(r = 1\\). Between \\(\\theta = 0\\) and \\(\\theta = \\pi\\), \\(r\\) decreases (\\(dr/d\\theta < 0\\)); between \\(\\pi\\) and \\(2\\pi\\), \\(r\\) increases.",
    keyIdeas: [
      "\\(dr/d\\theta > 0\\): spiraling outward.",
      "\\(dr/d\\theta < 0\\): spiraling inward.",
      "Average rate \\(= (\\Delta r)/(\\Delta\\theta)\\).",
      "Interpret in terms of distance from origin as angle sweeps.",
    ],
    workedExample: {
      prompt:
        "For \\(r = 2 + \\sin\\theta\\), find the average rate of change of \\(r\\) over \\([\\pi/6, 5\\pi/6]\\).",
      solution:
        "\\(r(\\pi/6) = 2 + 1/2 = 5/2\\). \\(r(5\\pi/6) = 2 + 1/2 = 5/2\\). Average rate \\(= (5/2 - 5/2)/(5\\pi/6 - \\pi/6) = 0\\). The function returns to the same value.",
    },
    commonMistakes: [
      "Confusing \\(dr/d\\theta\\) with \\(dy/dx\\) (slope of the curve in Cartesian).",
      "Treating increases in \\(r\\) as motion in the direction of the tangent line.",
      "Forgetting that \\(r = 0\\) is a special point (through origin).",
    ],
  },

  // ===========================================================================
  // UNIT 4 — Functions Involving Parameters, Vectors, and Matrices
  // ===========================================================================
  "4.1": {
    id: "4.1",
    title: "Parametric Functions",
    summary:
      "A parametric function describes position by giving \\(x(t)\\) and \\(y(t)\\) separately, each as a function of a third variable \\(t\\).",
    lesson:
      "A **parametric function** expresses a curve by two equations:\n\\[ x = x(t), \\quad y = y(t), \\quad t \\in I \\]\nThe variable \\(t\\) is the **parameter** — often time. As \\(t\\) sweeps through \\(I\\), the point \\((x(t), y(t))\\) traces a curve.\n\n**Why use parametric form**:\n- Describes paths that are not functions of \\(x\\) (circles, figure-eights, self-intersecting curves).\n- Encodes **direction and speed** — two different parametrizations can trace the same curve in different ways.\n- Natural for motion: \\(t\\) = time, \\((x, y)\\) = position.\n\n**Eliminating the parameter**: to convert to Cartesian, solve one equation for \\(t\\) and substitute. Example: \\(x = t + 1,\\ y = t^2 \\Rightarrow t = x - 1,\\ y = (x-1)^2\\).\n\nNot every parametric system reduces cleanly — sometimes trig or algebraic identities are needed: \\(x = \\cos t,\\ y = \\sin t \\Rightarrow x^2 + y^2 = 1\\) (a circle).\n\n**Domain issues**: the range of \\(t\\) may limit what portion of the Cartesian curve is traced. \\(x = t^2,\\ y = t\\) with \\(t \\in \\mathbb{R}\\) traces the parabola \\(x = y^2\\) — fully. But \\(t \\in [0, \\infty)\\) traces only the upper half.",
    keyIdeas: [
      "Parametric: \\(x(t)\\), \\(y(t)\\), with \\(t\\) the parameter.",
      "Captures direction and speed, not just shape.",
      "Eliminate the parameter to get Cartesian form.",
      "Parameter interval may restrict the traced portion.",
    ],
    workedExample: {
      prompt:
        "Eliminate the parameter and describe the curve: \\(x = 2t - 1,\\ y = t^2\\).",
      solution:
        "Solve for \\(t\\): \\(t = (x+1)/2\\). Substitute: \\(y = ((x+1)/2)^2 = (x+1)^2/4\\). A parabola opening upward with vertex at \\((-1, 0)\\).",
    },
    commonMistakes: [
      "Treating parametric curves as graphs of functions — they can self-intersect.",
      "Forgetting to note direction of motion.",
      "Ignoring parameter domain when converting.",
    ],
  },
  "4.2": {
    id: "4.2",
    title: "Parametric Functions Modeling Planar Motion",
    summary:
      "Parametric equations naturally describe motion in the plane: \\(x(t)\\) and \\(y(t)\\) are coordinates of a moving object at time \\(t\\).",
    lesson:
      "When \\(t\\) is time, \\((x(t), y(t))\\) is the **position vector** of a particle in the plane.\n\n**Projectile motion** (ignoring air resistance): a projectile launched from height \\(h\\) with initial speed \\(v_0\\) at angle \\(\\alpha\\):\n\\[ x(t) = v_0 \\cos(\\alpha) \\cdot t, \\quad y(t) = h + v_0 \\sin(\\alpha) \\cdot t - \\tfrac{1}{2} g t^2 \\]\nwhere \\(g \\approx 9.8\\ \\text{m/s}^2\\) or \\(32\\ \\text{ft/s}^2\\).\n\n**Circular motion**: \\(x(t) = x_0 + r\\cos(\\omega t),\\ y(t) = y_0 + r\\sin(\\omega t)\\) describes a point on a circle of radius \\(r\\) centered at \\((x_0, y_0)\\), rotating with angular velocity \\(\\omega\\). Period \\(T = 2\\pi/\\omega\\).\n\n**Directed motion analysis**: to find where the particle is at time \\(t\\), plug in \\(t\\). To find where the particle returns to its start, solve \\(x(t) = x(0)\\) and \\(y(t) = y(0)\\) simultaneously.\n\n**Range and landing**: for projectile motion, find time when \\(y(t) = 0\\) (ground), then evaluate \\(x(t)\\) to get the horizontal distance.\n\nOn AP problems you'll often be asked: at what time is the object at a specified location? What is its path? When is it above/below/to the right of a given point?",
    keyIdeas: [
      "Projectile: horizontal uniform, vertical with \\(\\frac{1}{2}gt^2\\) term.",
      "Circular motion: \\(r\\cos(\\omega t),\\ r\\sin(\\omega t)\\).",
      "Position problems: plug in \\(t\\) or solve for \\(t\\) from coordinates.",
      "Interpret \\(t\\) as time and answer in seconds.",
    ],
    workedExample: {
      prompt:
        "A particle moves with \\(x(t) = 3\\cos t\\), \\(y(t) = 3\\sin t\\). Describe the path and find its position at \\(t = \\pi/2\\).",
      solution:
        "\\(x^2 + y^2 = 9\\) — circle of radius 3 centered at origin. At \\(t = \\pi/2\\): \\(x = 0\\), \\(y = 3\\). Position \\((0, 3)\\).",
    },
    commonMistakes: [
      "Confusing angular velocity \\(\\omega\\) with angular position \\(\\theta\\).",
      "Using degrees when \\(t\\) is in radians (and vice versa).",
      "Dropping the \\(-\\tfrac{1}{2}gt^2\\) term in projectile problems.",
    ],
  },
  "4.3": {
    id: "4.3",
    title: "Parametric Functions and Rates of Change",
    summary:
      "For parametric curves, \\(dy/dx = (dy/dt)/(dx/dt)\\) when \\(dx/dt \\ne 0\\). This gives the slope of the curve in Cartesian terms.",
    lesson:
      "Given \\(x(t),\\ y(t)\\), the **slope** of the tangent to the curve at a given \\(t\\) is:\n\\[ \\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}, \\quad \\text{provided}\\ \\frac{dx}{dt} \\ne 0. \\]\n\nThis follows from the chain rule: \\(dy/dx \\cdot dx/dt = dy/dt\\).\n\n**AP Precalc level**: you aren't expected to compute derivatives — those are Calculus. But you should understand:\n- **Rates** \\(dx/dt\\) and \\(dy/dt\\) describe how \\(x\\) and \\(y\\) change with respect to time.\n- The **ratio** gives the slope of the curve itself in the plane.\n- The **sign** of \\(dx/dt\\) tells which horizontal direction the particle is moving; sign of \\(dy/dt\\) tells vertical direction.\n\n**Average rates** of change of \\(x\\) and \\(y\\) with respect to \\(t\\) over an interval \\([t_1, t_2]\\):\n\\[ \\frac{\\Delta x}{\\Delta t} = \\frac{x(t_2) - x(t_1)}{t_2 - t_1}, \\quad \\frac{\\Delta y}{\\Delta t} = \\frac{y(t_2) - y(t_1)}{t_2 - t_1} \\]\n\nThese are the average horizontal and vertical velocities.\n\n**Average slope of the curve** over that interval: \\((y(t_2) - y(t_1))/(x(t_2) - x(t_1))\\).",
    keyIdeas: [
      "Slope of parametric curve: \\(dy/dx = (dy/dt)/(dx/dt)\\).",
      "Sign of \\(dx/dt\\) gives horizontal direction of motion.",
      "Sign of \\(dy/dt\\) gives vertical direction.",
      "Average rates \\(\\Delta x/\\Delta t,\\ \\Delta y/\\Delta t\\) describe average velocity components.",
    ],
    workedExample: {
      prompt:
        "A particle has \\(x(t) = t^2,\\ y(t) = t^3\\). Find the slope of the path at \\(t = 2\\).",
      solution:
        "\\(dx/dt = 2t = 4\\) at \\(t = 2\\). \\(dy/dt = 3t^2 = 12\\). Slope \\(= 12/4 = 3\\).",
    },
    commonMistakes: [
      "Computing \\(dy/dx\\) as \\(y'(t)\\) without dividing by \\(x'(t)\\).",
      "Missing undefined slope when \\(dx/dt = 0\\) (vertical tangent).",
      "Confusing the slope of the path with the particle's speed.",
    ],
  },
  "4.4": {
    id: "4.4",
    title: "Parametrically Defined Circles and Lines",
    summary:
      "Standard parametrizations: \\(x = x_0 + r\\cos t,\\ y = y_0 + r\\sin t\\) for a circle; \\(x = x_0 + at,\\ y = y_0 + bt\\) for a line.",
    lesson:
      "**Circle** centered at \\((x_0, y_0)\\) with radius \\(r\\):\n\\[ x = x_0 + r\\cos t, \\quad y = y_0 + r\\sin t, \\quad t \\in [0, 2\\pi). \\]\nDirection: counterclockwise starting at \\((x_0 + r, y_0)\\) for \\(t = 0\\).\n\nTo reverse direction: \\(x = x_0 + r\\cos t,\\ y = y_0 - r\\sin t\\) (clockwise).\nTo start at a different point: replace \\(t\\) with \\(t - t_0\\) where \\(t_0\\) is the starting angle.\nAngular speed: \\(x = x_0 + r\\cos(\\omega t)\\), \\(y = y_0 + r\\sin(\\omega t)\\) completes one revolution every \\(T = 2\\pi/\\omega\\).\n\n**Line** through \\((x_0, y_0)\\) with direction \\((a, b)\\):\n\\[ x = x_0 + at, \\quad y = y_0 + bt, \\quad t \\in \\mathbb{R}. \\]\nSlope \\(= b/a\\) (if \\(a \\ne 0\\)). This is equivalent to \\(y - y_0 = (b/a)(x - x_0)\\).\n\nTo parametrize a line segment from \\((x_1, y_1)\\) to \\((x_2, y_2)\\), use:\n\\[ x = x_1 + t(x_2 - x_1), \\quad y = y_1 + t(y_2 - y_1), \\quad t \\in [0, 1]. \\]\nAt \\(t = 0\\): start point. At \\(t = 1\\): end point.\n\n**Ellipses**: \\(x = x_0 + a\\cos t,\\ y = y_0 + b\\sin t\\) — traces an ellipse with semi-axes \\(a\\) (horizontal) and \\(b\\) (vertical).",
    keyIdeas: [
      "Circle: \\(r\\cos t, r\\sin t\\) (plus center).",
      "Line: \\(x_0 + at,\\ y_0 + bt\\) with direction vector \\((a, b)\\).",
      "Segment from P to Q: \\(P + t(Q - P)\\) with \\(t \\in [0, 1]\\).",
      "Ellipse: use different radii for cos and sin.",
    ],
    workedExample: {
      prompt:
        "Write a parametrization of the line segment from \\((1, 4)\\) to \\((7, -2)\\) for \\(t \\in [0, 1]\\).",
      solution:
        "\\(x = 1 + 6t,\\ y = 4 - 6t\\), \\(t \\in [0, 1]\\). At \\(t = 0\\): \\((1, 4)\\). At \\(t = 1\\): \\((7, -2)\\). Check.",
    },
    commonMistakes: [
      "Swapping \\(\\sin\\) and \\(\\cos\\) in the circle parametrization.",
      "Getting the direction of motion backwards.",
      "Using \\(t \\in [0, 2\\pi]\\) (inclusive) when \\(t = 0\\) and \\(t = 2\\pi\\) give the same point — use \\([0, 2\\pi)\\).",
    ],
  },
  "4.5": {
    id: "4.5",
    title: "Implicitly Defined Functions",
    summary:
      "An implicit function is defined by an equation \\(F(x, y) = 0\\) that doesn't isolate \\(y\\); circles, ellipses, and hyperbolas are classic examples.",
    lesson:
      "An **implicit** equation relates \\(x\\) and \\(y\\) without expressing either as a function of the other. Familiar examples:\n- \\(x^2 + y^2 = 25\\): circle. Not a function — fails vertical line test.\n- \\(x^2 + 4y^2 = 16\\): ellipse.\n- \\(x^2 - y^2 = 1\\): hyperbola.\n- \\(\\sin(xy) = x + y\\): implicit but no standard curve.\n\nImplicit curves may:\n- Fail the vertical line test (not functions of \\(x\\)).\n- Have multiple branches.\n- Be split into multiple functions by solving for \\(y\\) in each branch.\n\nExample: \\(x^2 + y^2 = 25\\) has branches \\(y = \\sqrt{25 - x^2}\\) (upper) and \\(y = -\\sqrt{25 - x^2}\\) (lower). Each branch is a function on \\([-5, 5]\\).\n\n**Graphing tips**:\n- Find intercepts: set \\(x = 0\\) for \\(y\\)-intercepts; \\(y = 0\\) for \\(x\\)-intercepts.\n- Find symmetry: swap \\(x \\to -x\\), \\(y \\to -y\\) to test.\n- Identify the conic type from the equation's form.\n\n**Why implicit representation**: some curves can't be written in \\(y = f(x)\\) form but describe important geometric or physical situations. Conic sections (4.6) are the canonical examples.",
    keyIdeas: [
      "Implicit: \\(F(x,y) = 0\\) without solving for \\(y\\).",
      "May not be a function — may fail vertical line test.",
      "Can often split into branches that are functions.",
      "Useful for curves that don't admit a simple \\(y = f(x)\\) form.",
    ],
    workedExample: {
      prompt:
        "Is \\(y^2 = x\\) a function of \\(x\\)? Split it into branches.",
      solution:
        "No — at \\(x = 4\\) there are two \\(y\\) values: \\(\\pm 2\\). Branches: \\(y = \\sqrt{x}\\) (upper) and \\(y = -\\sqrt{x}\\) (lower), each a function on \\([0, \\infty)\\).",
    },
    commonMistakes: [
      "Assuming every equation defines a function.",
      "Forgetting one branch when solving for \\(y\\).",
      "Mixing up the domain of the implicit curve with the domain of its branches.",
    ],
  },
  "4.6": {
    id: "4.6",
    title: "Conic Sections",
    summary:
      "Circles, ellipses, parabolas, and hyperbolas come from slicing a cone; each has a standard form that reveals its geometry.",
    lesson:
      "**Conic sections** arise from intersecting a plane with a double cone. In Cartesian coordinates, they are described by a general equation \\(Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0\\). APCalc Precalc usually works with axis-aligned conics (so \\(B = 0\\)).\n\n**Standard forms** (centered at \\((h, k)\\)):\n\n- **Circle**: \\((x - h)^2 + (y - k)^2 = r^2\\). Radius \\(r\\).\n\n- **Ellipse**: \\((x - h)^2/a^2 + (y - k)^2/b^2 = 1\\). Semi-axes \\(a\\) (horizontal) and \\(b\\) (vertical). If \\(a > b\\), foci lie on horizontal axis at \\((h \\pm c, k)\\) with \\(c^2 = a^2 - b^2\\).\n\n- **Parabola**: \\((x - h)^2 = 4p(y - k)\\) opens up if \\(p > 0\\), down if \\(p < 0\\). Vertex \\((h, k)\\); focus \\((h, k + p)\\); directrix \\(y = k - p\\). For a parabola opening horizontally, swap \\(x\\) and \\(y\\).\n\n- **Hyperbola**: \\((x - h)^2/a^2 - (y - k)^2/b^2 = 1\\) (horizontal) or \\((y - k)^2/a^2 - (x - h)^2/b^2 = 1\\) (vertical). Asymptotes through center with slopes \\(\\pm b/a\\) (horizontal) or \\(\\pm a/b\\) (vertical).\n\n**Identifying the conic from the general form**:\n- \\(A = C\\): circle.\n- \\(A, C\\) same sign but different: ellipse.\n- One of \\(A, C\\) is 0: parabola.\n- \\(A, C\\) opposite signs: hyperbola.\n\n**Completing the square** converts a messy general form into standard form. Practice is essential.",
    keyIdeas: [
      "Circle, ellipse, parabola, hyperbola — four conic types.",
      "Standard forms reveal center, radii, vertex, foci, directrix.",
      "Identify from general form by looking at signs of \\(A\\) and \\(C\\).",
      "Complete the square to convert general to standard.",
    ],
    workedExample: {
      prompt:
        "Identify and describe: \\(4x^2 + 9y^2 - 16x + 18y - 11 = 0\\).",
      solution:
        "Group: \\(4(x^2 - 4x) + 9(y^2 + 2y) = 11\\). Complete squares: \\(4(x - 2)^2 - 16 + 9(y + 1)^2 - 9 = 11\\) → \\(4(x-2)^2 + 9(y+1)^2 = 36\\) → \\((x-2)^2/9 + (y+1)^2/4 = 1\\). Ellipse centered \\((2, -1)\\) with \\(a = 3,\\ b = 2\\).",
    },
    commonMistakes: [
      "Dropping the constant when completing the square.",
      "Mixing up which axis is the major axis of an ellipse.",
      "Swapping \\(a\\) and \\(b\\) — in ellipse standard form, the larger denominator's axis is the major one.",
    ],
  },
  "4.7": {
    id: "4.7",
    title: "Parametrization of Implicitly Defined Functions",
    summary:
      "Convert implicit equations into parametric form: circles and ellipses use trig parametrizations; lines and parabolas use linear or polynomial ones.",
    lesson:
      "Many implicit curves have natural parametric forms.\n\n**Circle** \\(x^2 + y^2 = r^2\\): \\(x = r\\cos t,\\ y = r\\sin t\\), \\(t \\in [0, 2\\pi)\\). Verify: \\(r^2\\cos^2 t + r^2\\sin^2 t = r^2\\). ✓\n\n**Ellipse** \\(x^2/a^2 + y^2/b^2 = 1\\): \\(x = a\\cos t,\\ y = b\\sin t\\), \\(t \\in [0, 2\\pi)\\).\n\n**Hyperbola** \\(x^2/a^2 - y^2/b^2 = 1\\): \\(x = a\\sec t,\\ y = b\\tan t\\) — traces one branch.\n\n**Parabola** \\(y = x^2\\): \\(x = t,\\ y = t^2\\). Trivial parametrization.\n\n**Line** \\(y = mx + b\\): \\(x = t,\\ y = mt + b\\).\n\n**Shifted conics**: add center to the parametrization. Circle at \\((h, k)\\) with radius \\(r\\): \\(x = h + r\\cos t,\\ y = k + r\\sin t\\).\n\n**Why parametrize**:\n- Gives a natural ordering of points on the curve.\n- Encodes direction and speed of traversal.\n- Converts multi-valued relations into single-valued pairs.\n- Useful for motion and animation.\n\n**Non-uniqueness**: any curve has infinitely many parametrizations. Different choices of \\(t\\) trace the same curve at different speeds or directions.",
    keyIdeas: [
      "Circle: \\(r\\cos t,\\ r\\sin t\\).",
      "Ellipse: \\(a\\cos t,\\ b\\sin t\\).",
      "Hyperbola: \\(a\\sec t,\\ b\\tan t\\).",
      "Add center to shift.",
      "Parametrizations are not unique.",
    ],
    workedExample: {
      prompt:
        "Parametrize \\(((x-1)^2)/4 + ((y+2)^2)/9 = 1\\) starting at \\((3, -2)\\) and going counterclockwise.",
      solution:
        "Semi-axes \\(a = 2\\) (horizontal), \\(b = 3\\) (vertical); center \\((1, -2)\\). Parametrization: \\(x = 1 + 2\\cos t,\\ y = -2 + 3\\sin t\\), \\(t \\in [0, 2\\pi)\\). At \\(t = 0\\): \\((3, -2)\\) ✓.",
    },
    commonMistakes: [
      "Using \\(r\\sin t,\\ r\\cos t\\) instead of \\(r\\cos t,\\ r\\sin t\\).",
      "Forgetting to add the center.",
      "Parameterizing both axes of an ellipse with the same factor.",
    ],
  },
  "4.8": {
    id: "4.8",
    title: "Vectors",
    summary:
      "A vector has magnitude and direction; it can be represented as an arrow in the plane or as a pair of components \\(\\langle a, b \\rangle\\).",
    lesson:
      "A **vector** is a quantity with both magnitude and direction. Representations:\n- As an **arrow** from tail to head.\n- As an **ordered pair** of components: \\(\\vec{v} = \\langle v_1, v_2 \\rangle\\).\n\n**Magnitude**: \\(|\\vec{v}| = \\sqrt{v_1^2 + v_2^2}\\). The length of the arrow.\n\n**Direction**: \\(\\theta = \\tan^{-1}(v_2/v_1)\\), adjusted for quadrant.\n\n**Operations**:\n- **Addition**: \\(\\vec{u} + \\vec{v} = \\langle u_1 + v_1, u_2 + v_2 \\rangle\\). Geometrically, head-to-tail.\n- **Scalar multiplication**: \\(c\\vec{v} = \\langle c v_1, c v_2 \\rangle\\). Stretches by \\(|c|\\); reverses if \\(c < 0\\).\n- **Subtraction**: \\(\\vec{u} - \\vec{v} = \\vec{u} + (-\\vec{v})\\).\n\n**Unit vectors**: \\(\\hat{v} = \\vec{v}/|\\vec{v}|\\) has magnitude 1 in the direction of \\(\\vec{v}\\). Special unit vectors: \\(\\hat{i} = \\langle 1, 0 \\rangle,\\ \\hat{j} = \\langle 0, 1 \\rangle\\). Any vector \\(\\langle a, b \\rangle = a\\hat{i} + b\\hat{j}\\).\n\n**Dot product**: \\(\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 = |\\vec{u}||\\vec{v}|\\cos\\theta\\) where \\(\\theta\\) is the angle between them. Zero dot product ↔ perpendicular vectors.\n\n**Applications**:\n- Force, velocity, displacement in physics.\n- Directions on maps.\n- Forces acting on objects.",
    keyIdeas: [
      "Vector: magnitude + direction. Components \\(\\langle v_1, v_2 \\rangle\\).",
      "Magnitude \\(|\\vec{v}| = \\sqrt{v_1^2 + v_2^2}\\).",
      "Addition componentwise; scalar mult stretches or reverses.",
      "Unit vector \\(\\hat{v} = \\vec{v}/|\\vec{v}|\\); \\(\\hat{i}, \\hat{j}\\) standard.",
      "\\(\\vec{u} \\cdot \\vec{v} = |\\vec{u}||\\vec{v}|\\cos\\theta\\); zero ↔ perpendicular.",
    ],
    workedExample: {
      prompt:
        "Given \\(\\vec{u} = \\langle 3, -4 \\rangle\\). Find its magnitude and unit vector.",
      solution:
        "\\(|\\vec{u}| = \\sqrt{9 + 16} = 5\\). \\(\\hat{u} = \\langle 3/5, -4/5 \\rangle\\).",
    },
    commonMistakes: [
      "Confusing magnitude with a component.",
      "Forgetting the quadrant when reporting direction.",
      "Using \\(|\\vec{v}|^2 = v_1^2 + v_2^2\\) but forgetting the square root for magnitude.",
    ],
  },
  "4.9": {
    id: "4.9",
    title: "Vector-Valued Functions",
    summary:
      "A vector-valued function \\(\\vec{r}(t) = \\langle x(t), y(t) \\rangle\\) gives a position vector at each \\(t\\); it's essentially a parametric curve in vector form.",
    lesson:
      "A **vector-valued function** returns a vector for each input:\n\\[ \\vec{r}(t) = \\langle x(t), y(t) \\rangle \\]\n\\(\\vec{r}(t)\\) is the **position vector** of a point at parameter (typically time) \\(t\\). This is exactly a parametric curve, reorganized.\n\n**Operations on vector-valued functions**:\n- **Sum/difference**: componentwise.\n- **Scalar function times vector function**: \\(f(t)\\vec{r}(t) = \\langle f(t)x(t), f(t)y(t) \\rangle\\).\n- **Evaluation**: plug in \\(t\\) to get a specific vector.\n\n**Magnitude function**: \\(|\\vec{r}(t)| = \\sqrt{x(t)^2 + y(t)^2}\\) — distance from origin as a function of \\(t\\).\n\n**Displacement between two times**: \\(\\vec{r}(t_2) - \\vec{r}(t_1) = \\langle x(t_2) - x(t_1),\\ y(t_2) - y(t_1) \\rangle\\). The displacement vector from one time to another.\n\n**Average velocity** over \\([t_1, t_2]\\): displacement divided by elapsed time:\n\\[ \\frac{\\vec{r}(t_2) - \\vec{r}(t_1)}{t_2 - t_1} \\]\nThis is a vector — it has both a magnitude (average speed) and a direction.\n\nIn Calculus BC, you'll learn that the velocity vector is \\(\\vec{v}(t) = \\vec{r}\\,'(t) = \\langle x'(t), y'(t) \\rangle\\). Precalc just asks you to think about rates without computing derivatives.",
    keyIdeas: [
      "\\(\\vec{r}(t) = \\langle x(t), y(t) \\rangle\\) encodes parametric position.",
      "Magnitude gives distance from origin.",
      "Displacement \\(= \\vec{r}(t_2) - \\vec{r}(t_1)\\).",
      "Average velocity = displacement / elapsed time — a vector.",
    ],
    workedExample: {
      prompt:
        "\\(\\vec{r}(t) = \\langle t^2, 2t \\rangle\\). Find the displacement from \\(t = 1\\) to \\(t = 3\\) and the average velocity over that interval.",
      solution:
        "\\(\\vec{r}(1) = \\langle 1, 2 \\rangle\\), \\(\\vec{r}(3) = \\langle 9, 6 \\rangle\\). Displacement \\(= \\langle 8, 4 \\rangle\\). Elapsed time \\(= 2\\). Average velocity \\(= \\langle 4, 2 \\rangle\\).",
    },
    commonMistakes: [
      "Reporting speed (a scalar) instead of velocity (a vector).",
      "Confusing position vector with displacement vector.",
      "Dividing a vector by a vector — only divide by scalars.",
    ],
  },
  "4.10": {
    id: "4.10",
    title: "Matrices",
    summary:
      "A matrix is a rectangular array of numbers; matrices can be added, multiplied by scalars, and multiplied by other matrices when dimensions match.",
    lesson:
      "A **matrix** is a rectangular array of numbers arranged in **rows** and **columns**. An \\(m \\times n\\) matrix has \\(m\\) rows and \\(n\\) columns.\n\n**Example**: \\(A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\) is a \\(2 \\times 2\\) matrix.\n\n**Operations**:\n\n- **Addition/subtraction**: componentwise. Only matrices of the same size can be added.\n\n- **Scalar multiplication**: multiply every entry by the scalar.\n\n- **Matrix multiplication**: for \\(A\\) (\\(m \\times n\\)) and \\(B\\) (\\(n \\times p\\)), product \\(AB\\) is \\(m \\times p\\). Entry \\((i, j)\\) = dot product of row \\(i\\) of \\(A\\) with column \\(j\\) of \\(B\\):\n\\[ (AB)_{ij} = \\sum_k A_{ik} B_{kj} \\]\nDimensions must align: columns of first = rows of second.\n\n- **Not commutative**: generally \\(AB \\ne BA\\).\n\n- **Identity matrix** \\(I\\): \\(n \\times n\\) matrix with 1s on the diagonal, 0s elsewhere. \\(IA = AI = A\\).\n\n- **Transpose** \\(A^T\\): swap rows and columns.\n\n**Special matrices**:\n- **Square matrix**: \\(n \\times n\\).\n- **Zero matrix**: all entries zero.\n- **Diagonal matrix**: non-diagonal entries zero.\n\n**Why matrices**: they efficiently encode linear systems, transformations, and networks. AP Precalc introduces them here; Linear Algebra and Calc go much deeper.",
    keyIdeas: [
      "\\(m \\times n\\): rows \\(\\times\\) columns.",
      "Addition requires same size; multiplication requires inner dimensions to match.",
      "Matrix multiplication: row \\(\\cdot\\) column.",
      "\\(AB \\ne BA\\) in general.",
      "Identity matrix acts like \\(1\\) for matrices.",
    ],
    workedExample: {
      prompt:
        "Compute \\(\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}\\).",
      solution:
        "Row 1, col 1: \\(1(0) + 2(1) = 2\\). Row 1, col 2: \\(1(1) + 2(0) = 1\\). Row 2, col 1: \\(3(0) + 4(1) = 4\\). Row 2, col 2: \\(3(1) + 4(0) = 3\\). Result: \\(\\begin{bmatrix} 2 & 1 \\\\ 4 & 3 \\end{bmatrix}\\).",
    },
    commonMistakes: [
      "Multiplying matrices entrywise (that's Hadamard product, not the usual matrix product).",
      "Forgetting the dimension-matching requirement.",
      "Assuming \\(AB = BA\\).",
    ],
  },
  "4.11": {
    id: "4.11",
    title: "The Inverse and Determinant of a Matrix",
    summary:
      "For a \\(2 \\times 2\\) matrix, determinant \\(ad - bc\\); inverse exists iff determinant nonzero; formula given below.",
    lesson:
      "For a **\\(2 \\times 2\\) matrix** \\(A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\):\n\n**Determinant**: \\(\\det A = ad - bc\\).\n\n**Inverse** (if \\(\\det A \\ne 0\\)):\n\\[ A^{-1} = \\frac{1}{\\det A} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\]\nSwap the diagonal, negate the off-diagonal, divide by \\(\\det A\\).\n\n**Properties**:\n- \\(A A^{-1} = A^{-1} A = I\\).\n- \\((AB)^{-1} = B^{-1} A^{-1}\\) (order reverses).\n- \\(\\det(AB) = \\det(A) \\det(B)\\).\n- \\(\\det(A^{-1}) = 1/\\det(A)\\).\n- \\(A\\) is **singular** (non-invertible) ↔ \\(\\det A = 0\\).\n\n**Geometric interpretation** of determinant: the (signed) area of the parallelogram formed by the column vectors of \\(A\\). \\(|\\det A|\\) is the scaling factor for area under the linear transformation \\(\\vec{x} \\mapsto A\\vec{x}\\).\n\n**Solving linear systems**: \\(A\\vec{x} = \\vec{b}\\) has unique solution \\(\\vec{x} = A^{-1}\\vec{b}\\) when \\(A\\) is invertible.\n\n**Larger matrices**: \\(3 \\times 3\\) and higher determinants can be computed by cofactor expansion; AP Precalc mostly limits you to \\(2 \\times 2\\) inverses and determinants.",
    keyIdeas: [
      "\\(2 \\times 2\\) determinant: \\(ad - bc\\).",
      "Inverse formula: swap diagonal, negate off-diagonal, divide by det.",
      "Invertible ↔ \\(\\det \\ne 0\\).",
      "\\(\\det\\) = area scale factor; sign indicates orientation.",
      "\\((AB)^{-1} = B^{-1} A^{-1}\\).",
    ],
    workedExample: {
      prompt:
        "Find the inverse of \\(A = \\begin{bmatrix} 2 & 3 \\\\ 1 & 4 \\end{bmatrix}\\).",
      solution:
        "\\(\\det A = 2(4) - 3(1) = 5\\). \\(A^{-1} = \\frac{1}{5}\\begin{bmatrix} 4 & -3 \\\\ -1 & 2 \\end{bmatrix} = \\begin{bmatrix} 4/5 & -3/5 \\\\ -1/5 & 2/5 \\end{bmatrix}\\).",
    },
    commonMistakes: [
      "Writing \\(\\det = ab - cd\\).",
      "Forgetting to negate the off-diagonal entries in the inverse formula.",
      "Trying to invert a singular matrix.",
    ],
  },
  "4.12": {
    id: "4.12",
    title: "Linear Transformations and Matrices",
    summary:
      "A \\(2 \\times 2\\) matrix represents a linear transformation of \\(\\mathbb{R}^2\\); it maps \\(\\vec{x}\\) to \\(A\\vec{x}\\). Standard examples: rotation, scaling, reflection, shear.",
    lesson:
      "A **linear transformation** \\(T: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) satisfies two properties:\n1. **Additivity**: \\(T(\\vec{u} + \\vec{v}) = T(\\vec{u}) + T(\\vec{v})\\).\n2. **Homogeneity**: \\(T(c\\vec{v}) = c T(\\vec{v})\\).\n\nEvery linear transformation of \\(\\mathbb{R}^2\\) can be represented by a \\(2 \\times 2\\) matrix: \\(T(\\vec{x}) = A\\vec{x}\\).\n\n**Standard transformations**:\n\n- **Rotation by \\(\\theta\\) counterclockwise**:\n\\[ R_\\theta = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix} \\]\n\n- **Scaling by factor \\(k\\)**:\n\\[ S_k = \\begin{bmatrix} k & 0 \\\\ 0 & k \\end{bmatrix} \\]\n\n- **Non-uniform scaling**: \\(\\begin{bmatrix} a & 0 \\\\ 0 & b \\end{bmatrix}\\) scales horizontally by \\(a\\), vertically by \\(b\\).\n\n- **Reflection across x-axis**: \\(\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}\\).\n- **Reflection across y-axis**: \\(\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\).\n- **Reflection across \\(y = x\\)**: \\(\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}\\).\n\n- **Horizontal shear by factor \\(s\\)**: \\(\\begin{bmatrix} 1 & s \\\\ 0 & 1 \\end{bmatrix}\\) — shifts points to the right proportional to their height.\n\n**Finding \\(A\\) from action on basis**: if \\(T(\\hat{i}) = \\langle a, c \\rangle\\) and \\(T(\\hat{j}) = \\langle b, d \\rangle\\), then \\(A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\). Columns of \\(A\\) are images of the standard basis.",
    keyIdeas: [
      "Linear transformations preserve addition and scalar multiplication.",
      "Every 2D linear transformation \\(\\leftrightarrow\\) a \\(2 \\times 2\\) matrix.",
      "Rotation, scaling, reflection, shear are standard examples.",
      "Columns of the matrix = images of \\(\\hat{i},\\ \\hat{j}\\).",
    ],
    workedExample: {
      prompt:
        "Write the matrix for rotation by \\(90°\\) counterclockwise. Apply it to \\(\\vec{v} = \\langle 2, 1 \\rangle\\).",
      solution:
        "\\(R_{90} = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\). \\(R_{90} \\vec{v} = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} -1 \\\\ 2 \\end{bmatrix}\\).",
    },
    commonMistakes: [
      "Mixing up rotation direction (counterclockwise vs. clockwise).",
      "Forgetting that rotation matrices use \\(\\cos\\) and \\(\\sin\\), not \\(\\tan\\).",
      "Writing columns as rows (or vice versa).",
    ],
  },
  "4.13": {
    id: "4.13",
    title: "Matrices as Functions",
    summary:
      "A matrix defines a function \\(\\vec{x} \\mapsto A\\vec{x}\\). Composition of transformations corresponds to matrix multiplication.",
    lesson:
      "Treating a matrix as a function: \\(A: \\mathbb{R}^n \\to \\mathbb{R}^m\\) sends \\(\\vec{x} \\in \\mathbb{R}^n\\) to \\(A\\vec{x} \\in \\mathbb{R}^m\\). This is a function whose **inputs are vectors**.\n\n**Composition of transformations**: if \\(T\\) is represented by \\(A\\) and \\(S\\) is represented by \\(B\\), then the composition \\(S \\circ T\\) is represented by the product \\(BA\\):\n\\[ (S \\circ T)(\\vec{x}) = S(T(\\vec{x})) = S(A\\vec{x}) = B(A\\vec{x}) = (BA)\\vec{x} \\]\nOrder matters: applying \\(T\\) first then \\(S\\) is \\(BA\\), not \\(AB\\).\n\n**Inverse as inverse function**: \\(A^{-1}\\) undoes the transformation \\(A\\). If \\(A\\vec{x} = \\vec{y}\\), then \\(\\vec{x} = A^{-1}\\vec{y}\\).\n\n**Examples**:\n- Rotate by \\(\\alpha\\) then by \\(\\beta\\): the combined transformation is rotation by \\(\\alpha + \\beta\\). Matrix product \\(R_\\beta R_\\alpha = R_{\\alpha + \\beta}\\).\n- Scale then rotate: not the same as rotate then scale in general (though for uniform scaling, they commute).\n\n**Linearity of functions**: a function \\(f: \\mathbb{R}^n \\to \\mathbb{R}^m\\) is **linear** iff it can be written as \\(f(\\vec{x}) = A\\vec{x}\\) for some matrix \\(A\\). That's the content of the representation theorem.",
    keyIdeas: [
      "Matrix defines a vector-valued function.",
      "Composition of linear functions = matrix product; order matters.",
      "Inverse matrix = inverse function.",
      "Every linear function corresponds to a unique matrix.",
    ],
    workedExample: {
      prompt:
        "A rotation by \\(45°\\) followed by scaling by 2: what single matrix represents this?",
      solution:
        "\\(R_{45} = \\begin{bmatrix} \\sqrt{2}/2 & -\\sqrt{2}/2 \\\\ \\sqrt{2}/2 & \\sqrt{2}/2 \\end{bmatrix}\\). Scale by 2: \\(S_2 = 2I\\). Composition (scale after rotate): \\(S_2 R_{45} = 2 R_{45} = \\begin{bmatrix} \\sqrt{2} & -\\sqrt{2} \\\\ \\sqrt{2} & \\sqrt{2} \\end{bmatrix}\\).",
    },
    commonMistakes: [
      "Getting the order of composition backwards (functions applied left to right but matrices multiply right to left).",
      "Assuming composition is commutative when it's not.",
      "Treating inverse matrices as unnecessary when the function has an inverse.",
    ],
  },
  "4.14": {
    id: "4.14",
    title: "Matrices Modeling Contexts",
    summary:
      "Matrices model linear systems, discrete-time transitions (Markov chains, population), and economic input-output; their power comes from compact representation and matrix arithmetic.",
    lesson:
      "**Linear systems**: \\(Ax = b\\) compactly encodes any system of linear equations. Solve via \\(x = A^{-1}b\\) when \\(A\\) is invertible.\n\nExample: \\(\\begin{cases} 2x + 3y = 8 \\\\ x + 4y = 9 \\end{cases}\\). Matrix form: \\(\\begin{bmatrix} 2 & 3 \\\\ 1 & 4 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 9 \\end{bmatrix}\\). Solve: \\(\\vec{x} = A^{-1}\\vec{b}\\).\n\n**Discrete-time transitions (Markov chains)**: a **transition matrix** \\(P\\) has entry \\(P_{ij}\\) = probability (or rate) of moving from state \\(j\\) to state \\(i\\). If \\(\\vec{v}_t\\) is the state vector at time \\(t\\), then \\(\\vec{v}_{t+1} = P \\vec{v}_t\\). After \\(n\\) steps, \\(\\vec{v}_n = P^n \\vec{v}_0\\).\n\nExample: a population divided between city and suburb. Each year, 10% of city residents move to suburb and 5% of suburb residents move to city. Transition: \\(\\begin{bmatrix} 0.9 & 0.05 \\\\ 0.1 & 0.95 \\end{bmatrix}\\). Start: \\(\\begin{bmatrix} 500000 \\\\ 500000 \\end{bmatrix}\\). After 1 year: multiply by transition matrix.\n\n**Leontief input-output (economics)**: matrix \\(A\\) encodes how much of each commodity is needed to produce one unit of each commodity; solve \\((I - A)x = d\\) for production \\(x\\) meeting demand \\(d\\).\n\n**Graph adjacency**: \\(A_{ij} = 1\\) if there's an edge from vertex \\(j\\) to vertex \\(i\\); \\((A^n)_{ij}\\) counts paths of length \\(n\\) from \\(j\\) to \\(i\\).\n\n**Linear programming, computer graphics, data science**: all heavily matrix-based — Precalc just introduces the idea.\n\n**AP tasks**: model a two-variable situation with a transition or coefficient matrix, multiply to find state after \\(n\\) steps, or invert to solve a system.",
    keyIdeas: [
      "Linear systems: \\(Ax = b\\).",
      "Transition matrices model discrete-time evolution; \\(\\vec{v}_{t+1} = P\\vec{v}_t\\).",
      "Interpret matrix entries in context (rates, probabilities, coefficients).",
      "\\(P^n\\) gives evolution over \\(n\\) time steps.",
    ],
    workedExample: {
      prompt:
        "A population of 200 in Region A and 300 in Region B has transition matrix \\(P = \\begin{bmatrix} 0.8 & 0.3 \\\\ 0.2 & 0.7 \\end{bmatrix}\\) per year. Find the populations after 1 year.",
      solution:
        "\\(P \\begin{bmatrix} 200 \\\\ 300 \\end{bmatrix} = \\begin{bmatrix} 0.8(200) + 0.3(300) \\\\ 0.2(200) + 0.7(300) \\end{bmatrix} = \\begin{bmatrix} 160 + 90 \\\\ 40 + 210 \\end{bmatrix} = \\begin{bmatrix} 250 \\\\ 250 \\end{bmatrix}\\). A: 250; B: 250.",
    },
    commonMistakes: [
      "Getting the direction of transition wrong — rows vs. columns.",
      "Forgetting the transition matrix's columns should sum to 1 (for probabilities) or have specific meaning (for economics).",
      "Not updating the state vector between steps.",
    ],
  },
};
