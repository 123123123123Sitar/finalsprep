// Auto-split from lib/blogPosts.ts by tools/split_blogposts.ts.
// One file per post so diffs are small and git blame is readable.
//
// Do not edit the shape of this file manually; the loader in
// lib/blogPosts.ts expects a single named default export per slug.

import type { BlogPost } from "../../blogPosts";

export const POST_AP_PRECALCULUS_REVIEW_GUIDE: BlogPost = {
    slug: "ap-precalculus-review-guide",
    title: "AP Precalculus Review Guide: All 4 Units Explained",
    metaTitle: "AP Precalculus Review Guide: All 4 Units (2026 Exam)",
    description:
      "A complete AP Precalculus review guide covering all 4 units, polynomial and rational functions, exponentials and logarithms, trigonometry, polar coordinates, and the function analysis framework.",
    excerpt:
      "AP Precalculus is the newest AP math exam and rewards precise language about function behavior. This unit-by-unit guide covers every topic on the CED with exam strategies.",
    date: "2026-04-25",
    readTime: "18 min read",
    category: "AP Precalculus",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "math",
      "STEM",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Precalculus launched in 2023 and is still building its body of released questions. Students who take it often feel like they are learning the course blind. This guide walks through every unit on the CED with the skills the released exams emphasize most. The key insight: Precalc rewards PRECISE LANGUAGE about function behavior, not calculus tricks.",
      },
      {
        type: "p",
        text: "This guide covers exam format, Units 1-3 (what is tested), Unit 4 (not tested), the function analysis framework that drives every FRQ, the unit circle and trig identities, and the common mistakes. Master the language, and the exam is a well-labeled map.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "h3", text: "Exam structure and scoring" },
      {
        type: "ul",
        items: [
          "3 hours total.",
          "Section I: 40 multiple choice in 2 hours (split no-calculator 28 questions and calculator 12 questions). Worth 62 percent.",
          "Section II: 4 free response in 60 minutes (split no-calculator 2 FRQs and calculator 2 FRQs). Worth 38 percent.",
          "IMPORTANT: the course covers 4 units, but the exam only tests Units 1, 2, and 3. Unit 4 (parametric, vectors, matrices) is NOT on the exam.",
          "Calculator is graphing calculator (TI-84, TI-Nspire).",
        ],
      },
      { type: "h2", text: "Unit 1: Polynomial and Rational Functions" },
      {
        type: "h3", text: "What you need to know (30-40 percent, the heaviest unit)" },
      {
        type: "h3", text: "Rates of change" },
      {
        type: "ul",
        items: [
          "Average rate of change between two points: (f(b) - f(a)) / (b - a). This is the slope of the secant line.",
          "Instantaneous rate of change (introduced without calculus): the slope of the tangent line at a point, approximated by average rates over smaller intervals.",
          "For a polynomial of degree n, the nth differences of equally-spaced values are constant. For linear (degree 1), first differences constant. For quadratic, second differences constant.",
        ],
      },
      {
        type: "h3", text: "Polynomial functions" },
      {
        type: "ul",
        items: [
          "End behavior: determined by the LEADING TERM. Even degree (positive coefficient): both ends go up. Even degree (negative): both ends go down. Odd degree (positive): left down, right up. Odd degree (negative): left up, right down.",
          "Zeros: x-values where f(x) = 0. For y = a(x - r1)(x - r2)(x - r3), zeros are r1, r2, r3.",
          "Multiplicity: if a zero has odd multiplicity (1, 3, 5...), graph crosses x-axis. If even (2, 4...), graph touches and turns.",
          "Complex zeros: non-real zeros come in conjugate pairs for polynomials with real coefficients.",
          "Rational root theorem: possible rational roots of polynomial with integer coefficients are +/- (factors of constant) / (factors of leading coefficient).",
        ],
      },
      {
        type: "h3", text: "Rational functions" },
      {
        type: "ul",
        items: [
          "Rational function: quotient of two polynomials. Has domain restrictions where denominator is zero.",
          "Vertical asymptote: at x = c where denominator is zero but numerator is NOT zero at c.",
          "Hole: at x = c where BOTH numerator AND denominator are zero (common factor).",
          "Horizontal asymptote: depends on degrees. If degree of numerator < denominator: y = 0. If equal: y = ratio of leading coefficients. If numerator > denominator (by 1): slant (oblique) asymptote.",
          "To find slant asymptote: long division of polynomials.",
          "End behavior described using asymptotes: 'as x approaches infinity, f(x) approaches y = L.'",
        ],
      },
      {
        type: "h3", text: "Transformations" },
      {
        type: "ul",
        items: [
          "Horizontal shift: y = f(x - h) shifts right by h. y = f(x + h) shifts left.",
          "Vertical shift: y = f(x) + k shifts up by k.",
          "Vertical stretch: y = a*f(x) stretches by factor a (if |a| > 1) or compresses (if |a| < 1). Flips vertically if a < 0.",
          "Horizontal stretch: y = f(bx) compresses by factor 1/b. If b < 0, reflects horizontally.",
          "Combined: y = a*f(b(x - h)) + k. Apply in order: horizontal shift, horizontal stretch, vertical stretch, vertical shift.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "AP Precalculus distinguishes CONCAVE UP and CONCAVE DOWN without requiring calculus. Concave up means the rate of change is INCREASING as x increases. Concave down means the rate of change is DECREASING. Learn this phrasing: it shows up on every FRQ.",
      },
      { type: "h2", text: "Unit 2: Exponential and Logarithmic Functions" },
      {
        type: "h3", text: "What you need to know (27-40 percent)" },
      {
        type: "h3", text: "Exponential functions" },
      {
        type: "ul",
        items: [
          "Form: y = a * b^x where a = initial value (y-intercept) and b = base (growth or decay factor).",
          "Growth: b > 1. Decay: 0 < b < 1.",
          "Equal changes in x produce EQUAL RATIOS in y (not equal differences). A function has equal ratios if and only if it is exponential.",
          "Exponential models: y = a * b^t for continuous growth. Common base e for continuous: y = a * e^(kt).",
          "Half-life: time for quantity to reduce by half. Doubling time: time to double. If b = (1/2)^(t/h), h is half-life.",
          "Compound interest: A = P(1 + r/n)^(nt). Continuous compounding: A = P * e^(rt).",
        ],
      },
      {
        type: "h3", text: "Logarithmic functions" },
      {
        type: "ul",
        items: [
          "y = log_b(x) is the INVERSE of y = b^x. b^(log_b x) = x and log_b(b^x) = x.",
          "Common log: log(x) means log base 10. Natural log: ln(x) means log base e.",
          "Log properties: log(ab) = log a + log b. log(a/b) = log a - log b. log(a^n) = n * log a.",
          "Change of base: log_b(x) = log(x) / log(b) or ln(x) / ln(b). Allows any base on calculator.",
          "Domain of log: x > 0. Log of zero or negative is undefined.",
        ],
      },
      {
        type: "h3", text: "Solving exponential and log equations" },
      {
        type: "ul",
        items: [
          "Exponential equation: take log of both sides. 3^x = 10 -> x = log(10) / log(3).",
          "Log equation: convert to exponential form. log_2(x) = 3 -> x = 2^3 = 8.",
          "Check for extraneous solutions (arguments of logs must be positive).",
        ],
      },
      {
        type: "h3", text: "Semi-log plots and inverse functions" },
      {
        type: "ul",
        items: [
          "Semi-log plot: y-axis logarithmic, x-axis linear. Exponential data appears linear on semi-log plot.",
          "Inverse functions: swap x and y, solve for y. Graph of inverse is reflection across y = x.",
          "One-to-one functions have inverses. Horizontal line test.",
        ],
      },
      { type: "h2", text: "Unit 3: Trigonometric and Polar Functions" },
      {
        type: "h3", text: "What you need to know (30-40 percent)" },
      {
        type: "h3", text: "The unit circle" },
      {
        type: "ul",
        items: [
          "Unit circle: circle of radius 1 centered at origin. Any point on unit circle at angle theta is (cos theta, sin theta).",
          "Memorize special angles: 0, pi/6, pi/4, pi/3, pi/2 (and all equivalents in other quadrants by reflection).",
          "At pi/6 (30 degrees): (sqrt(3)/2, 1/2). At pi/4 (45): (sqrt(2)/2, sqrt(2)/2). At pi/3 (60): (1/2, sqrt(3)/2).",
          "Radians: 2 pi radians = 360 degrees. pi radians = 180 degrees.",
          "Tangent: tan(theta) = sin(theta) / cos(theta) = y/x. Undefined where cos = 0.",
        ],
      },
      {
        type: "h3", text: "Graphs of trigonometric functions" },
      {
        type: "ul",
        items: [
          "y = sin(x): period 2 pi, amplitude 1, range [-1, 1]. Crosses x-axis at 0, pi, 2 pi.",
          "y = cos(x): period 2 pi, amplitude 1, range [-1, 1]. Maximum at 0, 2 pi. Minimum at pi.",
          "y = tan(x): period pi, vertical asymptotes at pi/2 + n*pi. Range all reals.",
          "Transformed: y = A sin(B(x - C)) + D. Amplitude A. Period 2 pi / B. Phase shift C (right if positive). Vertical shift D (midline).",
          "Frequency = 1 / period = B / (2 pi).",
        ],
      },
      {
        type: "h3", text: "Inverse trigonometric functions" },
      {
        type: "ul",
        items: [
          "arcsin (sin^-1): domain [-1, 1], range [-pi/2, pi/2].",
          "arccos (cos^-1): domain [-1, 1], range [0, pi].",
          "arctan (tan^-1): domain all reals, range (-pi/2, pi/2).",
          "Inverse trig functions return ONE angle only (restricted range). To find other angles, use reference angle and quadrant logic.",
        ],
      },
      {
        type: "h3", text: "Trig equations and identities" },
      {
        type: "ul",
        items: [
          "Solving trig equations: find one solution, then add period. sin(x) = 0.5 has solutions x = pi/6 + 2*pi*k AND x = 5*pi/6 + 2*pi*k.",
          "Pythagorean identity: sin^2(x) + cos^2(x) = 1.",
          "Related: tan^2 + 1 = sec^2. 1 + cot^2 = csc^2.",
          "Double angle: sin(2x) = 2 sin(x) cos(x). cos(2x) = cos^2(x) - sin^2(x) = 2 cos^2(x) - 1 = 1 - 2 sin^2(x).",
          "Sum/difference: sin(A + B) = sin A cos B + cos A sin B. cos(A + B) = cos A cos B - sin A sin B.",
        ],
      },
      {
        type: "h3", text: "Polar coordinates and graphs" },
      {
        type: "ul",
        items: [
          "Polar coordinates: (r, theta) where r is distance from origin, theta is angle from positive x-axis.",
          "Convert polar to Cartesian: x = r cos theta, y = r sin theta.",
          "Convert Cartesian to polar: r = sqrt(x^2 + y^2), theta = arctan(y/x) (with quadrant adjustment).",
          "Polar curves: r = a (circle of radius a centered at origin). r = a cos(theta) (circle of radius a/2 centered at (a/2, 0)).",
          "Limacons: r = a + b cos(theta). If a > b: convex. If a = b: cardioid (heart shape). If a < b: inner loop.",
          "Roses: r = a cos(n theta). Number of petals: n if n odd, 2n if n even.",
        ],
      },
      { type: "h2", text: "Unit 4: Functions Involving Parameters, Vectors, and Matrices" },
      {
        type: "h3", text: "NOT ON EXAM (taught in class but not tested)" },
      {
        type: "ul",
        items: [
          "Parametric equations: x = f(t), y = g(t) where t is a parameter. Trace a curve as t varies.",
          "Vectors: magnitude and direction. Addition, scalar multiplication, dot product.",
          "Matrices as transformations: 2x2 matrix multiplication.",
          "If your teacher covers this unit, engage - it is a head start on Calc BC and linear algebra. But for AP exam prep, prioritize Units 1-3.",
        ],
      },
      { type: "h2", text: "The function analysis framework" },
      {
        type: "p",
        text: "The AP Precalculus exam OBSESSIVELY tests function behavior description. Every FRQ has some version of the following questions:",
      },
      {
        type: "ol",
        items: [
          "On what intervals is the function increasing? Decreasing?",
          "On what intervals is the function concave up? Concave down?",
          "Where are relative maxima? Relative minima? Absolute extrema?",
          "Describe the end behavior as x approaches positive or negative infinity.",
          "Describe the rate of change: is it increasing, decreasing, or constant?",
          "How do parameters (a, b, c, d) in the function model real-world quantities?",
        ],
      },
      {
        type: "p",
        text: "The grader wants PRECISE language. 'The function is increasing' is different from 'the rate of change is increasing.' A function can be increasing (output rising) while its rate of change decreases (rising more slowly each step). Practice this distinction until it is automatic.",
      },
      { type: "h2", text: "How to score a 5 on AP Precalculus" },
      {
        type: "ol",
        items: [
          "Master the function analysis language. Precalc tests whether you can describe function behavior with PRECISION. 'Increasing' vs 'rate of change increasing' is the central distinction.",
          "Unit 1 is the heaviest (30-40 percent). Prioritize polynomial and rational functions. Know end behavior, asymptotes, zeros, transformations cold.",
          "Understand exponentials and logs as inverses. Logarithms solve exponential equations. Modeling questions are common.",
          "MEMORIZE THE UNIT CIRCLE. There is no shortcut. Every trig problem requires it. Know sine, cosine, tangent of 0, pi/6, pi/4, pi/3, pi/2 and equivalents in all four quadrants.",
          "Solve trig equations with the FULL solution set. Include '+2*pi*k' for sine/cosine, '+pi*k' for tangent (periods differ).",
          "Take timed FRQs. Multiple choice is pattern recognition. FRQs require clear explanation in words.",
          "Practice reading function information from TABLES and GRAPHS, not just equations. The exam uses all three representations.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Using calculus notation (f prime, derivatives) on Precalc FRQs. Describe behavior in WORDS: 'the function is increasing' NOT 'f prime is positive.' The exam wants algebraic/descriptive language.",
          "Confusing 'the function is increasing' (y getting larger) with 'the rate of change is increasing' (the slope getting steeper). A function can be increasing while its rate of change is decreasing (concave down).",
          "Forgetting to include full solution set for trig equations. sin(x) = 1/2 has solutions x = pi/6 + 2*pi*k AND x = 5*pi/6 + 2*pi*k (for all integers k).",
          "Confusing vertical asymptotes (denominator zero, numerator nonzero) with HOLES (numerator and denominator both zero). Asymptote = goes to infinity. Hole = gap in graph.",
          "Forgetting log undefined for zero or negative. Domain restrictions matter.",
          "Incorrectly applying transformation order. For f(2(x - 1)): horizontal compression by 1/2 AND horizontal shift by 1. Think 'plug in 2(x - 1) into f.'",
          "Misidentifying end behavior. Leading term determines. For y = -3x^4 + ..., end behavior: both ends go DOWN (even degree, negative coefficient).",
          "Mixing up exponential growth and decay. b > 1 is growth, 0 < b < 1 is decay.",
          "Forgetting that equal changes in x for exponential functions produce EQUAL RATIOS, not equal differences. y increases by a factor of b for each unit increase in x.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep has the full AP Precalculus CED indexed and walks you through any problem using the precise language the exam expects (no calculus notation, proper descriptive language). Free tier covers Precalc.",
      },
      {
        type: "p",
        text: "Precalc is about being fluent in the language of functions. Memorize the unit circle. Know your function transformations. Distinguish 'function is increasing' from 'rate of change is increasing.' Once you master the language, the exam is a well-labeled map.",
      },
    ],
  };
