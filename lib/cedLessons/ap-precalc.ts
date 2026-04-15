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
};
