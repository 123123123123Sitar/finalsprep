import type { CourseCurriculum } from "./types";

export const MATH_CURRICULUM: Record<string, CourseCurriculum> = {
  // =========================================================================
  // AP PRECALCULUS
  // =========================================================================
  "ap-precalc": {
    courseSlug: "ap-precalc",
    examFormat: {
      length: "3 hours",
      structure:
        "40 multiple-choice (80 min) + 4 free-response (40 min). Calculator allowed on Part B of MCQ and on FRQ.",
      scoring:
        "MCQ is 62.5% of the score, FRQ is 37.5%. Unit 4 is optional on the exam — the College Board uses it as a stretch unit.",
    },
    framing:
      "AP Precalc is about understanding functions as tools for modeling change. The course leans hard on multiple representations — tables, graphs, equations, verbal descriptions — and asks you to move between them fluently. It's the modern replacement for 'Analysis' at most high schools, so treat it as the prerequisite every calc teacher wishes you had.",
    units: [
      {
        unitNumber: 1,
        title: "Polynomial & Rational Functions",
        overview:
          "Functions as models of tandem change. You learn how to analyze rates of change, end behavior, zeros, and asymptotes of polynomial and rational functions, and how to pick between competing models.",
        examWeight: "30-40%",
        bigIdeas: [
          "Average rate of change over an interval is the slope of the secant line.",
          "Polynomials are classified by degree; leading coefficient + parity controls end behavior.",
          "Complex zeros come in conjugate pairs when coefficients are real.",
          "Rational functions have vertical asymptotes where the denominator is zero (after canceling holes) and horizontal or slant asymptotes from the degree comparison.",
          "Model selection: linear, quadratic, polynomial, or rational? Justify with rates of change, not aesthetics.",
        ],
        essentials: [
          {
            heading: "Rates of change",
            body: "For linear functions the rate of change is constant. For quadratics the rate of change of the rate of change is constant. For polynomials of degree n, the nth finite difference is constant — use this to identify degree from a table.",
          },
          {
            heading: "Zeros and multiplicity",
            body: "A real zero of multiplicity k makes the graph touch the x-axis without crossing when k is even, and cross flat when k is odd and ≥3. Count zeros with multiplicity so a degree-n polynomial has exactly n complex zeros.",
          },
          {
            heading: "End behavior",
            body: "Only the leading term matters as x → ±∞. Even degree + positive coefficient: both ends up. Even + negative: both down. Odd + positive: left down right up. Odd + negative: left up right down.",
          },
          {
            heading: "Rational functions",
            body: "Factor top and bottom first. Common factors give holes at the canceled zeros. Remaining denominator zeros give vertical asymptotes. If deg num < deg den the horizontal asymptote is y=0; if equal, it's the ratio of leading coefficients; if num is exactly one higher than den, do polynomial division to get a slant asymptote.",
          },
          {
            heading: "Transformations",
            body: "af(b(x-h))+k compresses/stretches vertically by a, horizontally by 1/b, shifts right by h and up by k. Signs flip the obvious way. Apply in order: horizontal shift, horizontal stretch, vertical stretch, vertical shift.",
          },
        ],
        keyFacts: [
          "Degree n polynomial: up to n-1 turning points, exactly n complex zeros with multiplicity.",
          "Rational root theorem: ±(factors of constant)/(factors of leading coeff).",
          "Synthetic division gives both the quotient and remainder in one pass.",
        ],
        commonMistakes: [
          "Forgetting to check for holes before finding vertical asymptotes.",
          "Stating end behavior by plugging in small x instead of analyzing the leading term.",
          "Treating f(x-3) as a left shift instead of right — the sign flips.",
          "Calling multiplicity-2 zeros 'roots' and double-counting them as turning points.",
        ],
        examStrategy:
          "Unit 1 FRQs almost always show a table or graph and ask you to justify a claim about rate of change. Cite a specific comparison (e.g. '2nd differences are constant so the function is quadratic') rather than waving your hands. On rational function questions, factor before you do anything else.",
        studyTips: [
          "Build a one-page 'end behavior' reference table for all four leading-coefficient × parity combinations.",
          "For any rational function, always write it in fully factored form first, then mark holes and asymptotes.",
          "Practice writing justifications in complete sentences that quote the relevant rate-of-change evidence.",
          "Drill on multiplicity: given a graph, state the multiplicity of each real zero.",
        ],
      },
      {
        unitNumber: 2,
        title: "Exponential & Logarithmic Functions",
        overview:
          "Exponential growth and decay plus their inverses. You learn to solve exponential and log equations, work with log properties, and recognize when to pick an exponential over a polynomial model.",
        examWeight: "27-40%",
        bigIdeas: [
          "Exponential functions have a constant ratio (not constant difference) over equal intervals.",
          "Logarithms are the inverses of exponentials. log_b(x) asks 'b to what power is x?'",
          "log(ab)=log a + log b, log(a/b)=log a - log b, log(a^k)=k log a.",
          "Semi-log plots: if log(y) is linear in x, the original data is exponential.",
          "Competing model validation: check residuals and domain restrictions, not just R².",
        ],
        essentials: [
          {
            heading: "Exponential growth and decay",
            body: "f(x) = a·b^x with a ≠ 0. If b > 1 it grows; if 0 < b < 1 it decays. The y-intercept is a. Find b from a table by computing ratios of consecutive outputs — if constant, the function is exponential.",
          },
          {
            heading: "Change of base",
            body: "log_b(x) = ln(x)/ln(b) = log(x)/log(b). This lets you evaluate any log on a calculator and lets you compare growth rates across different bases.",
          },
          {
            heading: "Solving exponential equations",
            body: "Try to match bases first. If you can't, take ln of both sides and use ln(a^k)=k ln a to pull the variable out of the exponent. Check domain: log arguments must be positive.",
          },
          {
            heading: "Composition and inverses",
            body: "(f∘g)(x) = f(g(x)). Inverses reflect across y=x and satisfy f(f⁻¹(x))=x. To find an inverse algebraically, swap x and y and solve for y.",
          },
          {
            heading: "Semi-log plots",
            body: "Plotting log(y) vs x linearizes exponential data. Slope of the linearized plot equals log(b). Use this to identify exponential models from noisy real-world data.",
          },
        ],
        keyFacts: [
          "log(1) = 0 for any base. log_b(b) = 1. log(b^x) = x. b^(log_b x) = x.",
          "e ≈ 2.71828, ln = log_e.",
          "Doubling time: t = ln(2)/ln(b). Half-life: t = ln(2)/|ln(b)| for 0<b<1.",
        ],
        commonMistakes: [
          "Writing log(a + b) = log a + log b (wrong — the sum rule is log(a·b)).",
          "Forgetting to check that log arguments are positive in the final answer.",
          "Using log base 10 when the problem used ln — they give different numerical answers.",
          "Claiming e^x grows faster than 2^x 'because e > 2' instead of comparing ln(e) vs ln(2).",
        ],
        examStrategy:
          "Exponential/log FRQs almost always ask you to verify a model fits data and then use it to predict. On verification, compute ratios (or log ratios) and argue from the numerical pattern. On prediction, plug in carefully and state units.",
        studyTips: [
          "Memorize ln(2) ≈ 0.693 and ln(10) ≈ 2.303 for mental estimates.",
          "Drill on match-the-base and take-the-log on a wide range of equations.",
          "Practice inverse-finding on non-obvious functions like f(x) = (2x-1)/(x+3).",
          "Solve one real-world word problem (doubling time, radioactive decay, compound interest) each day for a week.",
        ],
      },
      {
        unitNumber: 3,
        title: "Trigonometric & Polar Functions",
        overview:
          "Periodic phenomena modeled with sine, cosine, tangent, and their reciprocals, plus the polar coordinate system. You learn to build sinusoidal models and transform between rectangular and polar forms.",
        examWeight: "30-35%",
        bigIdeas: [
          "sin and cos parameterize the unit circle; sin θ is the y-coordinate, cos θ is the x-coordinate.",
          "Sinusoidal functions have form a·sin(b(x-h))+k with amplitude |a|, period 2π/|b|, phase shift h, vertical shift k.",
          "Pythagorean identity: sin²θ + cos²θ = 1 — this is the identity you'll use most often.",
          "Polar coordinates (r,θ) relate to rectangular by x=r cos θ, y=r sin θ.",
          "Polar curves include circles, roses, cardioids, limaçons, and lemniscates — know their parent equations.",
        ],
        essentials: [
          {
            heading: "The unit circle",
            body: "Memorize sin, cos, and tan at 0, π/6, π/4, π/3, π/2, and their reflections into the other quadrants. ASTC (All Students Take Calculus) tells you which functions are positive in each quadrant.",
          },
          {
            heading: "Sinusoidal transformations",
            body: "y = a sin(b(x-h)) + k has amplitude |a|, period 2π/|b|, phase shift h (right if positive), midline y=k. For real-world data, fit a from max−min)/2, k from (max+min)/2, b from the period, and h from where the function hits the midline going up.",
          },
          {
            heading: "Solving trig equations",
            body: "Isolate the trig function, find solutions in [0, 2π), then add 2πk for the general solution. Watch for squared trig functions — sin²x = 1/2 gives four solutions in [0, 2π) from sin x = ±√2/2.",
          },
          {
            heading: "Polar graphs",
            body: "r = a is a circle of radius a centered at the origin. r = a cos θ is a circle of radius a/2 passing through the origin. r = a(1 ± cos θ) is a cardioid. r = a sin(nθ) is a rose with n petals (if n odd) or 2n petals (if n even).",
          },
          {
            heading: "Rectangular ↔ polar conversion",
            body: "x = r cos θ, y = r sin θ, r² = x² + y², tan θ = y/x. Watch quadrant placement when converting rectangular to polar — arctan only returns values in (-π/2, π/2).",
          },
        ],
        keyFacts: [
          "sin(30°)=1/2, sin(45°)=√2/2, sin(60°)=√3/2.",
          "1 + tan²θ = sec²θ, 1 + cot²θ = csc²θ.",
          "sin(2x)=2 sin x cos x. cos(2x)=cos²x − sin²x = 1 − 2sin²x = 2cos²x − 1.",
        ],
        commonMistakes: [
          "Confusing amplitude with period on sinusoidal modeling problems.",
          "Dropping the ± when taking square roots of trig equations (lose half your solutions).",
          "Getting quadrant wrong when converting from rectangular to polar coordinates.",
          "Mixing up radians and degrees — the AP expects radians unless stated otherwise.",
        ],
        examStrategy:
          "Sinusoidal modeling FRQs are predictable: identify a, b, h, k from a verbal description or graph, write the equation, use it to predict. Show your steps explicitly. On polar graph problems, sketch the rose/cardioid from the parent curve and apply transformations.",
        studyTips: [
          "Build the unit circle from memory once a day until you can do it in under a minute.",
          "Identify amplitude, period, and midline from 10 different sinusoidal graphs in a row.",
          "Practice converting between polar and rectangular for 10 points including edge cases (origin, points on axes).",
          "Sketch r = 1 + 2cos θ and identify the inner loop — limaçons with |b/a| > 1 are tricky.",
        ],
      },
      {
        unitNumber: 4,
        title: "Functions Involving Parameters, Vectors & Matrices",
        overview:
          "Parametric equations, vectors, and matrices as tools for modeling motion and transformations. This unit is optional on the AP exam — the College Board calls it out as stretch content.",
        examWeight: "Optional on exam",
        bigIdeas: [
          "Parametric equations describe curves via a shared parameter (often time).",
          "Vectors have magnitude and direction; dot product measures alignment, cross product (in 3D) gives perpendicular.",
          "Matrices encode linear transformations of the plane (rotations, reflections, scalings).",
          "The determinant of a 2×2 matrix measures signed area; det=0 means non-invertible.",
          "Conic sections parameterize naturally — circles, ellipses, parabolas, hyperbolas.",
        ],
        essentials: [
          {
            heading: "Parametric motion",
            body: "x=f(t), y=g(t) traces a path as t varies. Velocity is (f'(t), g'(t)); speed is the magnitude of velocity. To eliminate the parameter, solve one equation for t and substitute.",
          },
          {
            heading: "Vector arithmetic",
            body: "Add vectors head-to-tail or component-wise. Scalar multiplication stretches a vector. Magnitude of (a,b) is √(a² + b²). Unit vector: divide by magnitude.",
          },
          {
            heading: "Matrix multiplication",
            body: "(AB)ᵢⱼ = row i of A · column j of B. Not commutative — AB ≠ BA in general. Identity matrix I satisfies AI = IA = A.",
          },
          {
            heading: "Linear transformations",
            body: "A 2×2 matrix acting on a column vector (x,y) produces a new vector — this is a linear map. Rotation by θ: [[cos θ, -sin θ], [sin θ, cos θ]]. Scaling by k: kI. Reflection across x-axis: [[1,0],[0,-1]].",
          },
          {
            heading: "Determinant and inverse",
            body: "det([[a,b],[c,d]]) = ad - bc. If det ≠ 0, the inverse is (1/det)·[[d,-b],[-c,a]]. Determinant = 0 means the matrix collapses the plane to a line (or point).",
          },
        ],
        keyFacts: [
          "Parametric circle: x = a + r cos t, y = b + r sin t.",
          "Parametric line from (x₀,y₀) in direction (a,b): x = x₀ + at, y = y₀ + bt.",
          "Dot product: (a,b)·(c,d) = ac + bd.",
          "Angle between vectors: cos θ = (u·v)/(|u||v|).",
        ],
        commonMistakes: [
          "Parameter confusion: forgetting that t has physical meaning in motion problems.",
          "Matrix multiplication order — AB vs BA matters.",
          "Computing determinants as ad + bc instead of ad - bc.",
          "Using rotation matrices without converting degrees to radians.",
        ],
        examStrategy:
          "This unit is optional, so pick your spots. If your teacher covers it fully, drill parametric motion and matrix multiplication because those transfer to AP Calc and physics.",
        studyTips: [
          "Sketch parametric curves by making a t-table and plotting (x,y) points.",
          "Multiply 2×2 matrices until you can do it without looking at the formula.",
          "Drill on unit vectors and angle calculations.",
          "Memorize the 2×2 rotation matrix for π/6, π/4, π/3, π/2.",
        ],
      },
    ],
  },

  // =========================================================================
  // AP CALCULUS AB
  // =========================================================================
  "ap-calc-ab": {
    courseSlug: "ap-calc-ab",
    examFormat: {
      length: "3 hours 15 minutes",
      structure:
        "45 MCQ (1h 45m, 30 no-calc + 15 calc) and 6 FRQ (1h 30m, 2 calc + 4 no-calc). MCQ is 50% of score, FRQ is 50%.",
      scoring:
        "Score 1-5; 3+ is typically considered passing. Most selective colleges want a 4 or 5 for credit.",
    },
    framing:
      "AP Calc AB is a semester of college calculus compressed into a year. It's linear, concept-heavy, and rewards students who see the through-line: limits → derivatives → integrals are one continuous story about rates and accumulation. The common trap is to treat each unit as separate formulas — the strong students see the connections.",
    units: [
      {
        unitNumber: 1,
        title: "Limits & Continuity",
        overview:
          "Limits formalize what happens to a function as x approaches a value (possibly infinity). Continuity is defined in terms of limits, and the Intermediate Value Theorem is the first calculus theorem you'll apply.",
        examWeight: "10-12%",
        bigIdeas: [
          "A limit is about the value f approaches, not the value at the point.",
          "For a limit to exist at a point, the left and right limits must agree.",
          "Indeterminate forms (0/0, ∞/∞, etc.) are signals to do more algebra, not verdicts.",
          "Continuity at a point requires: f(c) exists, lim f(x) as x→c exists, and the two are equal.",
          "IVT: if f is continuous on [a,b] and y₀ is between f(a) and f(b), then some c in [a,b] has f(c)=y₀.",
        ],
        essentials: [
          {
            heading: "Evaluating limits",
            body: "Try direct substitution first. If you get 0/0, factor and cancel, rationalize, or use L'Hôpital's Rule (Unit 4). If you get a nonzero/0, the limit is ±∞ depending on sign analysis. If you get ∞/∞, divide numerator and denominator by the highest power.",
          },
          {
            heading: "One-sided limits",
            body: "lim x→c⁻ f(x) is the limit from the left. Piecewise functions, absolute values, and step functions can have different one-sided limits, which means the two-sided limit doesn't exist.",
          },
          {
            heading: "Limits at infinity and horizontal asymptotes",
            body: "For rational functions, compare the degrees. For exponential vs polynomial, exponential wins. For log vs polynomial, polynomial wins.",
          },
          {
            heading: "Types of discontinuities",
            body: "Removable (hole — the limit exists but doesn't equal f(c) or f(c) is undefined), jump (left and right limits differ), infinite (vertical asymptote).",
          },
          {
            heading: "Intermediate Value Theorem",
            body: "Used to prove a function has at least one zero (or any specific value) on an interval. Prerequisites: f must be continuous on the closed interval.",
          },
        ],
        keyFacts: [
          "lim x→0 sin(x)/x = 1. lim x→0 (1 - cos x)/x = 0.",
          "lim x→∞ (1 + 1/x)^x = e.",
          "Squeeze theorem: if g(x) ≤ f(x) ≤ h(x) and g and h have the same limit L, so does f.",
        ],
        commonMistakes: [
          "Saying 'the limit is undefined' when you see 0/0 — that's indeterminate, not undefined.",
          "Plugging in infinity directly into a rational function instead of analyzing degree.",
          "Forgetting that IVT requires continuity on a closed interval, not just the function being defined there.",
          "Confusing discontinuity types: a hole is removable, a jump is not.",
        ],
        examStrategy:
          "IVT questions are almost free points — set up the hypothesis (f continuous on [a,b]), compute f(a) and f(b), cite IVT, conclude. Limit-from-a-graph problems show up every year; read carefully for open/closed circles.",
        studyTips: [
          "Do 10 mixed limit problems a day for a week — direct sub, factor/cancel, infinity, one-sided.",
          "Write out the three continuity conditions until you can recite them.",
          "Practice IVT justifications in exact CED wording: 'Since f is continuous on [a,b] and f(a) < 0 < f(b), by the IVT there exists c in (a,b) with f(c)=0.'",
          "Sketch 5 functions with each type of discontinuity.",
        ],
      },
      {
        unitNumber: 2,
        title: "Differentiation: Definition & Fundamental Properties",
        overview:
          "The derivative is the instantaneous rate of change — the slope of the tangent line. This unit builds derivative rules from the limit definition and develops power, product, quotient, and trig rules.",
        examWeight: "10-12%",
        bigIdeas: [
          "f'(a) = lim h→0 (f(a+h) - f(a))/h — the formal definition.",
          "Differentiability implies continuity (but not the reverse).",
          "Power rule: d/dx[xⁿ] = nxⁿ⁻¹.",
          "Product rule: (fg)' = f'g + fg'. Quotient rule: (f/g)' = (f'g - fg')/g².",
          "Derivatives of sin, cos, eˣ, ln x are foundational and must be memorized.",
        ],
        essentials: [
          {
            heading: "Definition of the derivative",
            body: "The formal limit definition is rarely used for computation but shows up on MCQ to test understanding. Alt form: f'(a) = lim x→a (f(x) - f(a))/(x - a).",
          },
          {
            heading: "Differentiability",
            body: "A function is differentiable where it has a tangent line with finite slope. Corners (|x| at 0), cusps, vertical tangents, and discontinuities kill differentiability.",
          },
          {
            heading: "Basic rules",
            body: "d/dx[c] = 0. d/dx[cf(x)] = cf'(x). d/dx[f+g] = f' + g'. These sound obvious but apply them cleanly and you save seconds on every problem.",
          },
          {
            heading: "Product and quotient rules",
            body: "Product: memorize 'first times derivative of second plus second times derivative of first'. Quotient: 'low d-high minus high d-low over low squared'. Quotient rule is error-prone; consider rewriting as a product when possible.",
          },
          {
            heading: "Trig and exponential derivatives",
            body: "d/dx[sin x] = cos x. d/dx[cos x] = -sin x. d/dx[tan x] = sec²x. d/dx[eˣ] = eˣ. d/dx[ln x] = 1/x. d/dx[aˣ] = aˣ ln a.",
          },
        ],
        keyFacts: [
          "Power rule works for any real exponent n, including fractions and negatives.",
          "d/dx[sec x] = sec x tan x. d/dx[csc x] = -csc x cot x. d/dx[cot x] = -csc²x.",
          "Tangent line at x=a: y = f(a) + f'(a)(x - a).",
        ],
        commonMistakes: [
          "Applying power rule to eˣ — it's not x^e, the derivative of eˣ is eˣ.",
          "Forgetting the minus sign in the derivative of cos x.",
          "Quotient rule: putting f' and g' in the wrong spots.",
          "Treating differentiability and continuity as the same thing — they're not.",
        ],
        examStrategy:
          "Unit 2 problems are mechanical — speed matters. Be flawless on power, product, quotient, and chain. On 'derivative from a limit' MCQ problems, recognize the form and identify f and a.",
        studyTips: [
          "Memorize the basic derivatives until you can recall them in under a second each.",
          "Drill product and quotient rules on 20 problems without a calculator.",
          "Practice recognizing the limit form of a derivative.",
          "Write out the quotient rule in words before applying — slows you down in a good way.",
        ],
      },
      {
        unitNumber: 3,
        title: "Differentiation: Composite, Implicit & Inverse Functions",
        overview:
          "The chain rule unlocks derivatives of compositions. Implicit differentiation handles equations you can't solve for y. Inverse function differentiation connects a function to its inverse's slopes.",
        examWeight: "9-13%",
        bigIdeas: [
          "Chain rule: (f∘g)'(x) = f'(g(x)) · g'(x). Outer times inner.",
          "Implicit differentiation treats y as a function of x and uses chain rule on y-terms.",
          "Inverse function theorem: (f⁻¹)'(b) = 1/f'(f⁻¹(b)) when f'(f⁻¹(b)) ≠ 0.",
          "Inverse trig derivatives: d/dx[arcsin x] = 1/√(1-x²).",
          "Higher-order derivatives: f'' is concavity, f''' is the rate of change of concavity.",
        ],
        essentials: [
          {
            heading: "Chain rule",
            body: "The single most important rule in calculus. For y = f(g(x)), y' = f'(g(x))·g'(x). For three-layer composition y = f(g(h(x))), y' = f'(g(h(x)))·g'(h(x))·h'(x).",
          },
          {
            heading: "Implicit differentiation",
            body: "Differentiate both sides of the equation, remembering that d/dx[y] = y'. Collect y' terms on one side, factor out y', solve.",
          },
          {
            heading: "Inverse function differentiation",
            body: "If f and g are inverses and f(g(x)) = x, then f'(g(x))·g'(x) = 1. Useful when the inverse is hard to write explicitly.",
          },
          {
            heading: "Inverse trig derivatives",
            body: "d/dx[arcsin x] = 1/√(1-x²). d/dx[arccos x] = -1/√(1-x²). d/dx[arctan x] = 1/(1+x²). Chain rule compatible.",
          },
          {
            heading: "Higher-order derivatives",
            body: "f''(x) is the derivative of f'. Used for concavity (f''>0 means concave up), the second derivative test, and acceleration in motion problems.",
          },
        ],
        keyFacts: [
          "Chain rule is required in almost every integral problem too — via u-substitution.",
          "d/dx[ln(f(x))] = f'(x)/f(x).",
          "d/dx[e^(f(x))] = f'(x)·e^(f(x)).",
        ],
        commonMistakes: [
          "Skipping the inner derivative in the chain rule.",
          "On implicit differentiation, forgetting the y' (chain rule) when differentiating y terms.",
          "Treating inverse trig derivatives as if they had the chain rule built in.",
          "Confusing (f⁻¹)'(x) with 1/f'(x) — the correct form is 1/f'(f⁻¹(x)).",
        ],
        examStrategy:
          "Chain rule is tested on every FRQ. Implicit differentiation always has at least one FRQ — practice finding tangent lines, horizontal tangents, and second derivatives from implicit equations.",
        studyTips: [
          "Drill chain rule until it's automatic — 30 composite problems a day for 3 days.",
          "Practice implicit differentiation on x²+y²=25, xy=1, and sin(xy)=x.",
          "Write out the inverse function theorem explicitly for 5 worked examples.",
          "Memorize all 6 inverse trig derivatives.",
        ],
      },
      {
        unitNumber: 4,
        title: "Contextual Applications of Differentiation",
        overview:
          "Derivatives as real-world rates. Straight-line motion (position, velocity, acceleration), related rates, linearization, and L'Hôpital's Rule.",
        examWeight: "10-15%",
        bigIdeas: [
          "Position x(t), velocity v(t)=x'(t), acceleration a(t)=v'(t)=x''(t).",
          "Speeding up ↔ velocity and acceleration have the same sign.",
          "Related rates: differentiate the geometric relationship with respect to time.",
          "Linearization: f(x) ≈ f(a) + f'(a)(x-a) near x=a.",
          "L'Hôpital's Rule: for 0/0 or ∞/∞, lim f/g = lim f'/g'.",
        ],
        essentials: [
          {
            heading: "Motion problems",
            body: "Read carefully — 'speed' means |velocity| and 'moving to the right' means v > 0. The particle is at rest when v = 0. It changes direction where v changes sign (and the sign change is real, not a tangent).",
          },
          {
            heading: "Related rates setup",
            body: "1) Draw a picture and label variables that change with time. 2) Write a geometric equation relating them. 3) Differentiate both sides with respect to t. 4) Plug in the values at the instant, including the given rate. Don't plug in numbers for variables before differentiating — they'll disappear.",
          },
          {
            heading: "Linearization",
            body: "Used to estimate f near a known point. Works when you know f(a) and f'(a). The error grows as you move farther from a.",
          },
          {
            heading: "L'Hôpital's Rule",
            body: "Only applies to indeterminate forms 0/0 or ∞/∞. Other indeterminate forms (0·∞, ∞-∞, 0⁰, 1^∞, ∞⁰) need to be rewritten first.",
          },
        ],
        keyFacts: [
          "If v(t) doesn't change sign on [a,b], total distance equals |x(b)-x(a)|.",
          "If v(t) changes sign, total distance = ∫|v(t)|dt.",
          "The 'instant' in a related rates problem is a snapshot — use it only after you've differentiated.",
        ],
        commonMistakes: [
          "Calling speed the same as velocity (speed is |velocity|).",
          "Plugging in values before differentiating on related rates.",
          "Applying L'Hôpital to limits that aren't indeterminate.",
          "Using linearization far from the base point and trusting the result.",
        ],
        examStrategy:
          "Related rates FRQs reward clean setup. Draw the figure, state what's given, write the equation explicitly. Show the differentiation step. You get points for each part of the process.",
        studyTips: [
          "Drill related rates on cones, ladders, shadows, boats, and spheres — these recur every year.",
          "For motion FRQs, practice reading the prompt twice to identify what's being asked.",
          "Memorize the linearization formula and apply it to 5 estimation problems.",
          "Practice L'Hôpital on all indeterminate forms, including rewrites from 0·∞.",
        ],
      },
      {
        unitNumber: 5,
        title: "Analytical Applications of Differentiation",
        overview:
          "Using f, f', f'' to analyze function shape: extrema, concavity, inflection, optimization. Plus MVT and the candidates test.",
        examWeight: "15-18%",
        bigIdeas: [
          "MVT: if f is continuous on [a,b] and differentiable on (a,b), there's a c in (a,b) with f'(c)=(f(b)-f(a))/(b-a).",
          "Critical points: where f'=0 or f' is undefined.",
          "First derivative test: sign change of f' gives local extremum.",
          "Second derivative test: f''>0 at critical point means local min.",
          "Optimization: set up an objective in one variable, use calculus to find the optimum.",
        ],
        essentials: [
          {
            heading: "Mean Value Theorem",
            body: "If f is continuous on [a,b] and differentiable on (a,b), there's at least one c in (a,b) where f'(c) equals the average rate of change over [a,b]. Used for justification problems.",
          },
          {
            heading: "Increasing/decreasing and extrema",
            body: "f' > 0 means f is increasing. f' < 0 means f is decreasing. Sign change at a critical point = local extremum (positive to negative is max, negative to positive is min).",
          },
          {
            heading: "Concavity and inflection",
            body: "f'' > 0 means f is concave up. f'' < 0 means concave down. Inflection point: where concavity changes — requires an actual sign change of f''.",
          },
          {
            heading: "Candidates test for absolute extrema",
            body: "On a closed interval, absolute extrema occur at critical points or endpoints. Evaluate f at each candidate and pick the biggest/smallest.",
          },
          {
            heading: "Optimization",
            body: "1) Write the quantity to optimize in one variable. 2) Find critical points. 3) Verify it's a max/min (first or second derivative test, or candidates test on a closed interval).",
          },
        ],
        keyFacts: [
          "Absolute extrema on a closed interval always exist (Extreme Value Theorem).",
          "A critical point doesn't have to be a local extremum — check for sign change.",
          "Inflection at x=c requires f'' to change sign, not just equal zero.",
        ],
        commonMistakes: [
          "Calling f'(c)=0 a local extremum without checking sign change.",
          "Stating an inflection point where f''=0 but doesn't change sign.",
          "Forgetting endpoints in the candidates test.",
          "Confusing 'increasing' with 'positive' — f increasing means f' > 0, not f > 0.",
        ],
        examStrategy:
          "Unit 5 FRQs always ask for justifications using f, f', f''. Cite the specific test (first derivative test, concavity analysis) and reference the table or graph the question provides. Write justifications in complete sentences.",
        studyTips: [
          "Build an 'interpretation chart' relating f, f', f'' to function behavior.",
          "Practice writing justifications in AP-approved wording.",
          "Drill optimization: 5 word problems a day until the setup is automatic.",
          "Solve 10 MVT problems focused on the existence hypothesis and finding c.",
        ],
      },
      {
        unitNumber: 6,
        title: "Integration & Accumulation of Change",
        overview:
          "Antiderivatives, definite integrals, Riemann sums, the Fundamental Theorem of Calculus. Integration as the reverse of differentiation and as accumulation of change.",
        examWeight: "17-20%",
        bigIdeas: [
          "Riemann sums approximate area under a curve.",
          "FTC Part 1: d/dx[∫[a to x] f(t) dt] = f(x).",
          "FTC Part 2: ∫[a to b] f(x) dx = F(b) - F(a) where F is any antiderivative.",
          "u-substitution: reverse of chain rule.",
          "Accumulation: F(x) - F(a) = ∫[a to x] f(t) dt measures total change.",
        ],
        essentials: [
          {
            heading: "Riemann sums",
            body: "Partition [a,b] into n rectangles of width Δx=(b-a)/n. Left endpoint, right endpoint, midpoint, and trapezoidal rules. Left underestimates on increasing functions; right overestimates.",
          },
          {
            heading: "Fundamental Theorem of Calculus",
            body: "Part 1 says differentiation undoes integration (when the upper limit is x). Part 2 says you can evaluate a definite integral using any antiderivative. Part 1 proves Part 2.",
          },
          {
            heading: "Basic antiderivatives",
            body: "∫xⁿ dx = x^(n+1)/(n+1) + C (n ≠ -1). ∫1/x dx = ln|x| + C. ∫eˣ dx = eˣ + C. ∫sin x dx = -cos x + C. ∫cos x dx = sin x + C.",
          },
          {
            heading: "u-substitution",
            body: "Pick u as the inside function. Compute du. Rewrite the integral entirely in u. Integrate. Substitute back. For definite integrals, either change the bounds to u-values or substitute back before plugging in.",
          },
          {
            heading: "Accumulation functions",
            body: "F(x) = ∫[a to x] f(t) dt. F(a) = 0. F' = f. F is increasing where f > 0.",
          },
        ],
        keyFacts: [
          "∫sec²x dx = tan x + C. ∫sec x tan x dx = sec x + C.",
          "Don't forget +C on indefinite integrals.",
          "∫[a to a] f(x) dx = 0.",
          "∫[a to b] f(x) dx = -∫[b to a] f(x) dx.",
        ],
        commonMistakes: [
          "Forgetting +C on indefinite integrals.",
          "u-substitution without changing the bounds or substituting back.",
          "Treating ∫f(x)g(x) dx as (∫f)(∫g) — there's no product rule for integration (that's integration by parts, BC only).",
          "Integrating 1/x as x⁰/0 — that's undefined. The antiderivative is ln|x|.",
        ],
        examStrategy:
          "Unit 6 is the biggest FRQ unit. Be ruthless about u-substitution choice — wrong u wastes 5 minutes. On accumulation function problems, track what f tells you about F.",
        studyTips: [
          "Memorize the 12 most common antiderivatives.",
          "Drill u-substitution on 20 problems a day for a week.",
          "Practice FTC Part 1 on problems where the upper limit is a function of x (chain rule applies).",
          "Solve 5 Riemann sum estimation problems.",
        ],
      },
      {
        unitNumber: 7,
        title: "Differential Equations",
        overview:
          "Equations involving derivatives. AB covers separable equations, slope fields, and exponential models. The emphasis is on setting up and solving, not on theory.",
        examWeight: "6-12%",
        bigIdeas: [
          "A differential equation involves a function and its derivatives.",
          "Slope fields visualize the direction of a DE at each point.",
          "Separation of variables: if dy/dx = f(x)g(y), separate and integrate.",
          "Initial condition: a point (x₀, y₀) picks out a specific solution.",
          "Exponential models: dy/dt = ky has solution y = Ce^(kt).",
        ],
        essentials: [
          {
            heading: "Slope fields",
            body: "At each grid point, draw a short line segment with slope f(x,y). The solution curves follow the direction of the segments. Sketch a candidate solution starting from an initial condition.",
          },
          {
            heading: "Separation of variables",
            body: "Rewrite dy/dx = f(x)g(y) as dy/g(y) = f(x) dx. Integrate both sides. Apply the initial condition to solve for C.",
          },
          {
            heading: "Exponential growth/decay",
            body: "dy/dt = ky (k > 0 grows, k < 0 decays) has solution y = Ce^(kt). Population, radioactive decay, and Newton's law of cooling all fit this pattern.",
          },
          {
            heading: "Applied models",
            body: "Read the problem carefully. Identify the rate of change language ('proportional to', 'inversely proportional'). Translate into a DE, separate, solve, apply initial condition.",
          },
        ],
        keyFacts: [
          "Newton's law of cooling: dT/dt = k(T - T_env).",
          "Logistic model (BC only): dy/dt = ky(1 - y/M).",
          "General solution has a constant C; particular solution has C determined by the initial condition.",
        ],
        commonMistakes: [
          "Forgetting +C before applying the initial condition.",
          "Separating variables incorrectly when f(x) and g(y) are mixed.",
          "Not checking whether the initial condition makes the solution valid (avoid y-values that made g(y)=0).",
        ],
        examStrategy:
          "One FRQ will involve a differential equation. Show the separation, the integration, and the application of the initial condition on three separate lines. Earn full credit by being methodical.",
        studyTips: [
          "Drill separation of variables on 10 DEs.",
          "Sketch slope fields by hand for 5 simple DEs.",
          "Memorize the exponential growth solution form.",
          "Solve one applied DE problem a day (Newton's law of cooling, population, etc.).",
        ],
      },
      {
        unitNumber: 8,
        title: "Applications of Integration",
        overview:
          "Using integrals to compute average values, total change, area between curves, and volumes of solids.",
        examWeight: "10-15%",
        bigIdeas: [
          "Average value of f on [a,b] is (1/(b-a))·∫[a to b] f(x) dx.",
          "Total change: ∫[a to b] v(t) dt is displacement (not distance — distance is ∫|v|).",
          "Area between curves: ∫[a to b] (top - bottom) dx.",
          "Disk method: V = π·∫[a to b] [f(x)]² dx.",
          "Washer method: V = π·∫[a to b] ([R(x)]² - [r(x)]²) dx.",
        ],
        essentials: [
          {
            heading: "Area between curves",
            body: "Find intersection points. Decide which curve is on top in each subinterval. Integrate (top - bottom). If the curves switch, split the integral.",
          },
          {
            heading: "Volumes: disk method",
            body: "Rotate a region around an axis. Cross-sections perpendicular to the axis are disks. V = π·∫ [radius]² dx (or dy).",
          },
          {
            heading: "Volumes: washer method",
            body: "Region bounded by two curves rotated around an axis. Cross-sections are washers (annuli). V = π·∫ (R² - r²) dx, where R is the outer radius and r is the inner radius.",
          },
          {
            heading: "Volumes with cross-sections",
            body: "Known cross-sections (squares, semicircles, triangles) perpendicular to an axis. V = ∫ A(x) dx where A(x) is the area of the cross-section.",
          },
          {
            heading: "Average value",
            body: "(1/(b-a))·∫[a to b] f(x) dx. By the Mean Value Theorem for integrals, this value is achieved by f at some c in (a,b) if f is continuous.",
          },
        ],
        keyFacts: [
          "Always sketch the region before integrating.",
          "Distance vs displacement: distance uses |v|, displacement uses v.",
          "When rotating around y=k instead of y=0, the radius is |f(x)-k|.",
        ],
        commonMistakes: [
          "Setting up area between curves with (bottom - top) — sign error.",
          "Forgetting to square the radius in the disk method.",
          "Using volume formulas when the axis of rotation isn't x- or y-axis without adjusting.",
          "Confusing distance and displacement on motion problems.",
        ],
        examStrategy:
          "Volume and area FRQs are step-by-step and reward clean setup. Sketch, identify the region, write the integral, evaluate. Don't try to do it in your head.",
        studyTips: [
          "Drill 10 area-between-curves problems with sketches.",
          "Practice disk and washer method around x-axis, y-axis, and non-axis lines.",
          "Solve 5 cross-section volume problems.",
          "Memorize the average value formula and apply it to physical quantities.",
        ],
      },
    ],
  },

  // =========================================================================
  // AP CALCULUS BC
  // =========================================================================
  "ap-calc-bc": {
    courseSlug: "ap-calc-bc",
    examFormat: {
      length: "3 hours 15 minutes",
      structure:
        "45 MCQ (1h 45m) + 6 FRQ (1h 30m), same format as AB. BC content extends AB; students receive an AB subscore reflecting AB-only material.",
      scoring:
        "BC students get two scores: BC (the full exam) and AB subscore (AB material only). Both 1-5.",
    },
    framing:
      "AP Calc BC is AB plus sequences, series, parametrics, polar, and vector-valued functions. The BC-only material concentrates in the second half of the course, so the first half is essentially AB. Strong BC students treat AB mastery as a prerequisite and don't try to learn it from scratch in September.",
    units: [
      {
        unitNumber: 1,
        title: "Limits & Continuity",
        overview:
          "Identical to AB Unit 1 — limits, one-sided limits, continuity, IVT.",
        examWeight: "4-7%",
        bigIdeas: [
          "Same fundamentals as AB — limits, continuity, IVT.",
          "Expect BC problems to combine limits with later topics (e.g., series convergence).",
        ],
        essentials: [
          {
            heading: "Core limit techniques",
            body: "Direct sub, factor/cancel, rationalize, L'Hôpital. For infinity limits, compare growth rates: exponential > polynomial > log.",
          },
          {
            heading: "Continuity and IVT",
            body: "Continuity at c requires f(c), lim f(x), and equality. IVT is used for existence proofs.",
          },
        ],
        keyFacts: [
          "lim x→0 sin(x)/x = 1.",
          "Exponential beats polynomial beats log at infinity.",
        ],
        commonMistakes: [
          "Skipping continuity checks before invoking IVT.",
          "Ignoring one-sided limits on piecewise functions.",
        ],
        examStrategy:
          "Mostly review — don't overspend study time here if you've mastered the AB version.",
        studyTips: [
          "Refresh the 10-problem AB drill.",
          "Practice IVT justifications in AP-approved wording.",
        ],
      },
      {
        unitNumber: 2,
        title: "Differentiation: Definition & Fundamental Properties",
        overview: "Same content as AB Unit 2 — derivative rules, definition.",
        examWeight: "4-7%",
        bigIdeas: [
          "Limit definition of the derivative.",
          "Power, product, quotient rules.",
          "Basic trig and exponential derivatives.",
        ],
        essentials: [
          {
            heading: "Derivative rules",
            body: "Power, constant multiple, sum/difference, product, quotient. Memorize sin, cos, tan, eˣ, ln x derivatives.",
          },
        ],
        commonMistakes: [
          "Misapplying quotient rule.",
          "Forgetting derivative of eˣ is eˣ.",
        ],
        examStrategy: "Another AB review unit. Keep it sharp but don't dwell.",
        studyTips: [
          "Speed drill: 20 derivatives in 10 minutes.",
          "Memorize basic derivative list.",
        ],
      },
      {
        unitNumber: 3,
        title: "Differentiation: Composite, Implicit & Inverse Functions",
        overview: "Chain rule, implicit, inverse trig — same as AB Unit 3.",
        examWeight: "4-7%",
        bigIdeas: [
          "Chain rule is used on virtually every BC problem.",
          "Implicit differentiation for curves defined implicitly.",
          "Inverse function theorem for inverse derivatives.",
        ],
        essentials: [
          {
            heading: "Chain rule",
            body: "(f∘g)'(x) = f'(g(x))·g'(x).",
          },
          {
            heading: "Implicit differentiation",
            body: "Treat y as a function of x. Use chain rule on y-terms. Collect y' and solve.",
          },
        ],
        commonMistakes: [
          "Skipping the inner derivative.",
          "Forgetting y' on implicit problems.",
        ],
        examStrategy: "AB review — make sure chain rule is reflexive.",
        studyTips: [
          "Drill chain rule until automatic.",
          "Practice implicit differentiation on 10 curves.",
        ],
      },
      {
        unitNumber: 4,
        title: "Contextual Applications of Differentiation",
        overview: "Motion, related rates, linearization, L'Hôpital — AB Unit 4.",
        examWeight: "6-9%",
        bigIdeas: [
          "Position, velocity, acceleration in 1D.",
          "Related rates via implicit differentiation with respect to time.",
          "Linearization near a base point.",
          "L'Hôpital for 0/0 and ∞/∞.",
        ],
        essentials: [
          {
            heading: "Related rates",
            body: "Draw, label, relate, differentiate, plug in. Don't plug in values for variables before differentiating.",
          },
          {
            heading: "Motion problems",
            body: "Speed = |v|. Changing direction requires v to change sign. Total distance is ∫|v| dt.",
          },
        ],
        commonMistakes: [
          "Plugging numbers in too early on related rates.",
          "Using L'Hôpital on non-indeterminate forms.",
        ],
        examStrategy: "Related rates FRQ is guaranteed — practice setup cleanly.",
        studyTips: [
          "Drill ladder, cone, shadow, and boat related-rates problems.",
          "Practice motion FRQs with v(t) that changes sign.",
        ],
      },
      {
        unitNumber: 5,
        title: "Analytical Applications of Differentiation",
        overview: "Extrema, concavity, optimization, MVT — AB Unit 5.",
        examWeight: "8-11%",
        bigIdeas: [
          "Critical points, first/second derivative tests.",
          "Concavity and inflection points.",
          "Mean Value Theorem.",
          "Optimization on closed and open intervals.",
        ],
        essentials: [
          {
            heading: "Extrema analysis",
            body: "First derivative test on sign changes of f'. Second derivative test at critical points.",
          },
          {
            heading: "Optimization",
            body: "Objective function in one variable. Critical points. Verify max/min. State in context.",
          },
        ],
        commonMistakes: [
          "Inflection without sign change of f''.",
          "Missing endpoints on candidates test.",
        ],
        examStrategy: "Cite the test you're using. 'By the first derivative test...'",
        studyTips: [
          "Practice justification writing with AP wording.",
          "Drill optimization word problems.",
        ],
      },
      {
        unitNumber: 6,
        title: "Integration & Accumulation of Change",
        overview:
          "AB integration plus integration by parts, partial fractions, and improper integrals.",
        examWeight: "17-20%",
        bigIdeas: [
          "FTC connects differentiation and integration.",
          "u-substitution (reverses chain rule).",
          "Integration by parts (reverses product rule): ∫u dv = uv - ∫v du.",
          "Partial fractions for rational integrands.",
          "Improper integrals: integrate, then take a limit.",
        ],
        essentials: [
          {
            heading: "Integration by parts",
            body: "∫u dv = uv - ∫v du. Pick u using LIATE (Log, Inverse trig, Algebraic, Trig, Exponential) — preferences for u in that order. The 'du' should be simpler than u.",
          },
          {
            heading: "Partial fractions",
            body: "Decompose a rational function into simpler fractions: (1/((x-1)(x+2))) = A/(x-1) + B/(x+2). Solve for A and B. Integrate term-by-term.",
          },
          {
            heading: "Improper integrals",
            body: "Rewrite as a limit. ∫[1 to ∞] f(x) dx = lim b→∞ ∫[1 to b] f(x) dx. If the limit is finite, the integral converges.",
          },
        ],
        keyFacts: [
          "∫ln x dx = x ln x - x + C (integration by parts).",
          "∫[1 to ∞] 1/x^p dx converges iff p > 1.",
          "LIATE is a heuristic, not a law.",
        ],
        commonMistakes: [
          "Parts without choosing u carefully — endless cycles.",
          "Partial fractions without checking the denominator factors completely.",
          "Forgetting the limit on improper integrals.",
        ],
        examStrategy:
          "IBP and partial fractions are guaranteed BC-only content. Drill both to automaticity.",
        studyTips: [
          "Memorize LIATE and apply to 10 IBP problems.",
          "Practice partial fraction decomposition on 10 rational integrands.",
          "Solve 5 improper integrals and classify each as convergent or divergent.",
        ],
      },
      {
        unitNumber: 7,
        title: "Differential Equations",
        overview:
          "AB separation of variables plus Euler's method and the logistic model.",
        examWeight: "6-9%",
        bigIdeas: [
          "Separation of variables and initial conditions.",
          "Euler's method: step along the slope from a starting point.",
          "Logistic model: dy/dt = ky(1 - y/M).",
        ],
        essentials: [
          {
            heading: "Euler's method",
            body: "Starting at (x₀, y₀), step size h. Next point: (x₀+h, y₀+h·f(x₀,y₀)). Iterate. The error accumulates, so small h is more accurate.",
          },
          {
            heading: "Logistic model",
            body: "dy/dt = ky(1 - y/M) has carrying capacity M. y(t) approaches M as t→∞. The inflection point of y(t) is at y = M/2 (where growth is fastest).",
          },
        ],
        keyFacts: [
          "Logistic solution: y(t) = M/(1 + Ae^(-kt)) for constant A determined by initial conditions.",
          "Fastest growth on a logistic curve is at y = M/2.",
        ],
        commonMistakes: [
          "Confusing logistic with pure exponential growth.",
          "Forgetting step size in Euler's method.",
        ],
        examStrategy: "Euler's method FRQ is common — practice the iterative table.",
        studyTips: [
          "Drill Euler's method on 5 DEs with 3 steps each.",
          "Memorize the logistic model and its carrying capacity interpretation.",
        ],
      },
      {
        unitNumber: 8,
        title: "Applications of Integration",
        overview:
          "Area, volumes, average value — AB Unit 8 plus arc length.",
        examWeight: "6-9%",
        bigIdeas: [
          "Area between curves, volumes by disk/washer/cross-section.",
          "Average value via integral.",
          "Arc length: L = ∫[a to b] √(1 + (f'(x))²) dx.",
        ],
        essentials: [
          {
            heading: "Arc length",
            body: "For y=f(x) on [a,b]: L = ∫[a to b] √(1 + (f'(x))²) dx. For parametric curves x=x(t), y=y(t): L = ∫ √((dx/dt)² + (dy/dt)²) dt.",
          },
        ],
        commonMistakes: [
          "Forgetting to square f'(x) in arc length.",
          "Mixing up disk and washer volumes.",
        ],
        examStrategy: "Know arc length formulas for rectangular and parametric curves.",
        studyTips: [
          "Memorize arc length formulas and drill 5 problems.",
          "Practice volumes around non-axis lines.",
        ],
      },
      {
        unitNumber: 9,
        title: "Parametric Equations, Polar Coordinates & Vector-Valued Functions",
        overview:
          "BC-only unit. Parametric motion, polar curves, vector-valued functions, arc length in each form.",
        examWeight: "11-12%",
        bigIdeas: [
          "Parametric: dy/dx = (dy/dt)/(dx/dt). Speed = √((dx/dt)² + (dy/dt)²).",
          "Polar area: A = (1/2)·∫[α to β] r² dθ.",
          "Vector-valued functions: r(t) = (f(t), g(t)). Derivative is (f'(t), g'(t)) — velocity vector.",
          "Arc length in parametric/polar forms.",
        ],
        essentials: [
          {
            heading: "Parametric derivatives",
            body: "dy/dx = (dy/dt)/(dx/dt). Second derivative: d²y/dx² = d/dx[dy/dx] = (d/dt[dy/dx])/(dx/dt).",
          },
          {
            heading: "Polar area",
            body: "Area swept by r(θ) from α to β: A = (1/2)·∫ r² dθ. Area between two polar curves: (1/2)·∫ (r_outer² - r_inner²) dθ.",
          },
          {
            heading: "Vector-valued motion",
            body: "Position r(t), velocity r'(t), speed |r'(t)|, acceleration r''(t). Total distance = ∫ |r'(t)| dt.",
          },
        ],
        keyFacts: [
          "Polar circle: r = a sin θ or r = a cos θ has radius a/2.",
          "Cardioid: r = a(1 ± cos θ).",
          "Rose r = a sin(nθ) has n petals if n is odd, 2n petals if n is even.",
        ],
        commonMistakes: [
          "Computing parametric dy/dx as dx/dy.",
          "Forgetting the 1/2 in polar area.",
          "Using speed as velocity in vector-valued motion.",
        ],
        examStrategy:
          "Unit 9 is BC-specific and shows up in at least one FRQ. Drill each type.",
        studyTips: [
          "Practice dy/dx, d²y/dx² for parametric curves.",
          "Sketch polar curves and compute enclosed area.",
          "Drill total distance for vector-valued motion.",
        ],
      },
      {
        unitNumber: 10,
        title: "Infinite Sequences & Series",
        overview:
          "The BC capstone: convergence tests, power series, Taylor series, Lagrange error bound.",
        examWeight: "17-18%",
        bigIdeas: [
          "Convergence tests: nth term, geometric, p-series, ratio, comparison, alternating.",
          "Power series: f(x) = Σ aₙ(x - c)ⁿ.",
          "Taylor series: f(x) = Σ f⁽ⁿ⁾(a)/n! · (x - a)ⁿ.",
          "Radius and interval of convergence.",
          "Lagrange error bound limits the error of a Taylor approximation.",
        ],
        essentials: [
          {
            heading: "nth term test",
            body: "If lim aₙ ≠ 0, the series diverges. If the limit is 0, the test is inconclusive.",
          },
          {
            heading: "Geometric series",
            body: "Σ arⁿ converges iff |r| < 1, with sum a/(1-r).",
          },
          {
            heading: "p-series",
            body: "Σ 1/nᵖ converges iff p > 1.",
          },
          {
            heading: "Ratio test",
            body: "L = lim |aₙ₊₁/aₙ|. L < 1 converges, L > 1 diverges, L = 1 inconclusive.",
          },
          {
            heading: "Alternating series test",
            body: "Σ (-1)ⁿ bₙ converges if bₙ is decreasing and bₙ → 0.",
          },
          {
            heading: "Taylor and Maclaurin series",
            body: "Taylor: f(x) = Σ f⁽ⁿ⁾(a)/n! · (x-a)ⁿ. Maclaurin is Taylor at a=0. Memorize series for eˣ, sin x, cos x, 1/(1-x), ln(1+x), arctan x.",
          },
          {
            heading: "Lagrange error bound",
            body: "|Rₙ(x)| ≤ M|x-a|^(n+1)/(n+1)! where M bounds |f⁽ⁿ⁺¹⁾| on the interval.",
          },
        ],
        keyFacts: [
          "eˣ = Σ xⁿ/n!. sin x = Σ (-1)ⁿ x^(2n+1)/(2n+1)!. cos x = Σ (-1)ⁿ x^(2n)/(2n)!.",
          "1/(1-x) = Σ xⁿ for |x|<1.",
          "Ratio test is the default for series with factorials or exponentials.",
        ],
        commonMistakes: [
          "Applying the nth term test wrongly — only useful for divergence.",
          "Forgetting to check endpoints for the interval of convergence.",
          "Using the wrong center on a Taylor series.",
          "Leaving Lagrange error bound in terms of a variable instead of numerically bounding.",
        ],
        examStrategy:
          "Series FRQ is guaranteed (usually the last FRQ). Master Maclaurin series for the 6 common functions and practice manipulation (substitution, integration, differentiation of series).",
        studyTips: [
          "Memorize the 6 Maclaurin series cold.",
          "Drill 20 convergence test problems across all tests.",
          "Practice finding radius and interval of convergence.",
          "Compute Lagrange error bounds on 5 Taylor approximations.",
        ],
      },
    ],
  },

  // =========================================================================
  // AP STATISTICS
  // =========================================================================
  "ap-statistics": {
    courseSlug: "ap-statistics",
    examFormat: {
      length: "3 hours",
      structure:
        "40 MCQ (90 min) + 6 FRQ (90 min). Calculator is required throughout. The last FRQ is an 'investigative task' that's longer than the others.",
      scoring: "MCQ and FRQ are 50-50. Rubric weighting rewards communication.",
    },
    framing:
      "AP Stats is 20% computation and 80% communication. You can do every calculator key-stroke correctly and still get a 2 on FRQs if you don't write justifications in AP-approved language. Treat the course like a writing class: every answer should name the procedure, verify conditions, compute, and interpret in context.",
    units: [
      {
        unitNumber: 1,
        title: "Exploring One-Variable Data",
        overview:
          "Describing distributions of a single variable with graphs, summary statistics, and the Normal distribution.",
        examWeight: "15-23%",
        bigIdeas: [
          "Describe distributions in terms of shape, center, spread, and outliers.",
          "Use appropriate graphs for categorical (bar, pie) and quantitative (histogram, box plot) data.",
          "The mean is pulled toward outliers; the median is resistant.",
          "For Normal data: z = (x - μ)/σ.",
          "68-95-99.7 rule: proportion of data within 1, 2, 3 SDs of the mean.",
        ],
        essentials: [
          {
            heading: "Summary statistics",
            body: "Mean, median, mode, range, IQR, variance, standard deviation. Five-number summary (min, Q1, median, Q3, max) drives the box plot. Outliers are typically defined as more than 1.5·IQR below Q1 or above Q3.",
          },
          {
            heading: "Normal distribution",
            body: "Bell-shaped, symmetric, fully described by μ and σ. z-scores standardize to the standard normal N(0,1). Use normalcdf(a, b, μ, σ) to find probabilities and invNorm for percentiles.",
          },
          {
            heading: "Describing distributions",
            body: "Always hit four points: shape (skewed right/left, symmetric, bimodal), center (median or mean in context), spread (IQR or SD in context), and outliers. Use context — don't just say 'the distribution is skewed', say 'the distribution of reaction times is skewed right'.",
          },
        ],
        keyFacts: [
          "Mean > median suggests right skew. Mean < median suggests left skew.",
          "SD and IQR are resistant to different types of outliers.",
          "The 68-95-99.7 rule works ONLY for Normal distributions.",
        ],
        commonMistakes: [
          "Using mean and SD to describe a skewed distribution (should use median and IQR).",
          "Forgetting to name the variable when describing shape/center/spread.",
          "Confusing 'mean' and 'median' when reading graphs.",
        ],
        examStrategy:
          "Unit 1 questions reward precise language. Write every answer in context. Use the CED's SOCS framework (Shape, Outliers, Center, Spread).",
        studyTips: [
          "Describe 5 distributions a day in SOCS format.",
          "Drill z-score and Normal probability problems with a calculator.",
          "Memorize the outlier 1.5·IQR rule.",
        ],
      },
      {
        unitNumber: 2,
        title: "Exploring Two-Variable Data",
        overview:
          "Scatterplots, correlation, linear regression, and residual analysis for quantitative bivariate data.",
        examWeight: "5-7%",
        bigIdeas: [
          "Scatterplots show the relationship between two quantitative variables.",
          "Correlation r ∈ [-1,1] measures linear association strength.",
          "Least-squares regression line minimizes sum of squared residuals.",
          "Residuals = observed - predicted. Residual plots show whether a linear model is appropriate.",
          "Correlation does not imply causation.",
        ],
        essentials: [
          {
            heading: "Describing scatterplots",
            body: "Direction (positive/negative/none), form (linear/curved), strength (strong/moderate/weak), and unusual features (outliers, influential points).",
          },
          {
            heading: "Linear regression",
            body: "ŷ = a + bx. Slope b = r·(s_y/s_x). Intercept a = ȳ - b·x̄. The regression line always passes through (x̄, ȳ).",
          },
          {
            heading: "Residual analysis",
            body: "A residual plot with no pattern supports a linear model. A curved pattern suggests a nonlinear model (log, square, etc.).",
          },
          {
            heading: "r and r²",
            body: "r is correlation. r² is the proportion of variation in y explained by the linear model. Report both.",
          },
        ],
        keyFacts: [
          "r is unitless and unaffected by linear transformations of x or y.",
          "Outliers can greatly influence slope and r.",
          "The slope interpretation: 'For a 1-unit increase in x, ŷ changes by b, in context.'",
        ],
        commonMistakes: [
          "Saying 'r² is the correlation' — r is correlation, r² is the proportion of variation.",
          "Interpreting slope without units or context.",
          "Extrapolating beyond the data range.",
          "Using correlation on non-linear data.",
        ],
        examStrategy:
          "Regression FRQs always reward written interpretation. Slope in context, r² in context, residual analysis with evidence.",
        studyTips: [
          "Practice slope and intercept interpretation on 10 scatterplots.",
          "Sketch residual plots for linear and nonlinear data.",
          "Drill calculator regression (LinReg).",
        ],
      },
      {
        unitNumber: 3,
        title: "Collecting Data",
        overview:
          "Sampling design, observational vs experimental studies, bias, confounding, random assignment.",
        examWeight: "12-15%",
        bigIdeas: [
          "SRS (simple random sample), stratified, cluster, and systematic sampling.",
          "Observational studies describe; experiments test causation.",
          "Confounding variables undermine observational causal claims.",
          "Random assignment in experiments controls for confounding.",
          "Blocking is random assignment within similar groups.",
        ],
        essentials: [
          {
            heading: "Sampling methods",
            body: "SRS: every individual has an equal chance. Stratified: divide into strata then SRS within each. Cluster: pick random clusters and sample everyone within. Systematic: every kth individual.",
          },
          {
            heading: "Experimental design",
            body: "Elements: treatment, control group, random assignment, replication. Blocking reduces variation. Blinding reduces placebo and observer bias.",
          },
          {
            heading: "Observational vs experimental",
            body: "Observational: no treatment imposed. Can show association but not causation. Experimental: researcher imposes treatment. Random assignment enables causal claims.",
          },
          {
            heading: "Sources of bias",
            body: "Undercoverage, nonresponse, response bias, wording effects, voluntary response. Larger sample size doesn't fix bias.",
          },
        ],
        keyFacts: [
          "Only random assignment in an experiment justifies causal language.",
          "Only random sampling justifies generalization to a population.",
          "Bias is systematic; random error decreases with larger samples.",
        ],
        commonMistakes: [
          "Claiming causation from an observational study.",
          "Generalizing beyond the sample without random sampling.",
          "Confusing random assignment (experiments) with random sampling (surveys).",
        ],
        examStrategy:
          "One FRQ is often an experimental design critique. Identify the design, the randomization used (if any), and the inferences that can and can't be drawn.",
        studyTips: [
          "Read 5 study designs and classify each as observational or experimental.",
          "Memorize the four sampling methods with pros and cons.",
          "Practice writing 'random assignment' and 'random sampling' distinctions.",
        ],
      },
      {
        unitNumber: 4,
        title: "Probability, Random Variables & Distributions",
        overview:
          "Probability rules, conditional probability, discrete and continuous random variables, binomial and geometric distributions.",
        examWeight: "10-20%",
        bigIdeas: [
          "P(A or B) = P(A) + P(B) - P(A and B).",
          "P(A and B) = P(A)·P(B|A). Independent: P(A and B) = P(A)·P(B).",
          "Expected value E(X) = Σ x·P(x).",
          "Variance adds for independent variables: Var(X±Y) = Var(X) + Var(Y).",
          "Binomial: fixed n trials, constant p. Geometric: trials until first success.",
        ],
        essentials: [
          {
            heading: "Conditional probability",
            body: "P(A|B) = P(A and B)/P(B). Bayes' rule inverts: P(A|B) = P(B|A)·P(A)/P(B). Use tree diagrams or tables.",
          },
          {
            heading: "Random variables",
            body: "Discrete: list probabilities. Continuous: integrate a pdf. E(X) = Σ x·P(x). Var(X) = Σ (x - μ)²·P(x). SD = √Var.",
          },
          {
            heading: "Combining random variables",
            body: "E(aX + bY) = aE(X) + bE(Y). Var(aX ± bY) = a²Var(X) + b²Var(Y) when X and Y are independent. SD does NOT add.",
          },
          {
            heading: "Binomial distribution",
            body: "n fixed trials, probability p, X = number of successes. E(X) = np, Var(X) = np(1-p). P(X=k) = C(n,k)·p^k·(1-p)^(n-k).",
          },
          {
            heading: "Geometric distribution",
            body: "Trials until first success. E(X) = 1/p. P(X=k) = (1-p)^(k-1)·p.",
          },
        ],
        keyFacts: [
          "Variances add for independent; SDs do not.",
          "E(X) is a weighted average, not the most likely value.",
          "Binomial and Geometric both require independent trials with constant p.",
        ],
        commonMistakes: [
          "Using E(X)+E(Y) when correct, but SD(X)+SD(Y) instead of adding variances.",
          "Confusing independent and mutually exclusive.",
          "Forgetting (1-p) in the geometric PMF.",
        ],
        examStrategy:
          "Binomial and geometric problems are almost always on the exam. Set up the distribution (name, parameters), identify what's asked, compute.",
        studyTips: [
          "Drill binomial probability on a calculator (binompdf, binomcdf).",
          "Practice tree diagrams and Bayes.",
          "Memorize binomial E(X), Var(X) formulas.",
        ],
      },
      {
        unitNumber: 5,
        title: "Sampling Distributions",
        overview:
          "The distribution of a sample statistic across repeated samples. Central Limit Theorem, bias, and variability.",
        examWeight: "7-12%",
        bigIdeas: [
          "A sampling distribution is the distribution of a statistic across all possible samples.",
          "The mean of the sampling distribution of x̄ is μ (unbiased).",
          "SD of x̄ is σ/√n. This shrinks with larger n.",
          "Central Limit Theorem: for large n, x̄ is approximately Normal regardless of the population distribution.",
          "Unbiased estimators have the right center; low-variance estimators have tight spread.",
        ],
        essentials: [
          {
            heading: "Sampling distribution of x̄",
            body: "Mean μ_x̄ = μ. SD σ_x̄ = σ/√n. If population is Normal, x̄ is Normal for any n. Otherwise, x̄ is approximately Normal when n ≥ 30 (CLT).",
          },
          {
            heading: "Sampling distribution of p̂",
            body: "Mean μ_p̂ = p. SD σ_p̂ = √(p(1-p)/n). Approximately Normal when np ≥ 10 and n(1-p) ≥ 10.",
          },
          {
            heading: "Difference of sample statistics",
            body: "Mean of difference = difference of means. Variance of difference = sum of variances (for independent samples). SD is the square root.",
          },
        ],
        keyFacts: [
          "CLT: Sample means are approximately Normal for n ≥ 30.",
          "10% condition: sample size ≤ 10% of population for independence.",
          "Success-failure condition for proportions: np ≥ 10 and n(1-p) ≥ 10.",
        ],
        commonMistakes: [
          "Confusing σ and σ/√n.",
          "Ignoring conditions before applying Normal approximation.",
          "Applying CLT for tiny n and non-Normal populations.",
        ],
        examStrategy:
          "Unit 5 is the bridge from probability to inference. Make sure you can state conditions and compute sampling distribution parameters cold.",
        studyTips: [
          "Drill 10 sampling distribution problems with conditions.",
          "Memorize the formulas for mean and SD of x̄ and p̂.",
          "Practice the CLT condition: n ≥ 30 for sample means, np ≥ 10 for proportions.",
        ],
      },
      {
        unitNumber: 6,
        title: "Inference for Categorical Data: Proportions",
        overview:
          "Confidence intervals and significance tests for one-sample and two-sample proportions.",
        examWeight: "12-15%",
        bigIdeas: [
          "1-prop z-interval: p̂ ± z*·√(p̂(1-p̂)/n).",
          "1-prop z-test: z = (p̂ - p₀)/√(p₀(1-p₀)/n).",
          "2-prop test uses pooled proportion p̂c = (x₁+x₂)/(n₁+n₂) in the SE.",
          "Type I error: rejecting true H₀. Type II error: failing to reject false H₀.",
          "Power = 1 - P(Type II).",
        ],
        essentials: [
          {
            heading: "Confidence intervals for one proportion",
            body: "Name: 1-prop z-interval. Conditions: SRS, independence (10% rule), success-failure (np̂ ≥ 10, nq̂ ≥ 10). Interval: p̂ ± z*·√(p̂q̂/n). Interpret in context.",
          },
          {
            heading: "Significance tests for one proportion",
            body: "Name: 1-prop z-test. Hypotheses: H₀: p = p₀, H_A: p <, >, or ≠ p₀. Conditions: SRS, independence, np₀ ≥ 10 and nq₀ ≥ 10 (use p₀, not p̂, in SE). Compute z and p-value. Conclude in context.",
          },
          {
            heading: "Two-proportion comparisons",
            body: "Name: 2-prop z-test/interval. Use pooled proportion in test (but unpooled in interval). Conditions: two independent SRS, success-failure on both samples.",
          },
          {
            heading: "Type I and II errors, and power",
            body: "Type I: reject H₀ when true (probability = α). Type II: fail to reject H₀ when false (probability = β). Power = 1 - β, the probability of correctly rejecting a false H₀.",
          },
        ],
        keyFacts: [
          "Conditions must be checked before every inference procedure.",
          "Always interpret the interval and the significance test in context.",
          "Power increases with sample size, effect size, and α.",
        ],
        commonMistakes: [
          "Skipping the conditions check.",
          "Using p̂ instead of p₀ in the SE of a significance test.",
          "Confusing confidence level with probability that p is in the interval.",
        ],
        examStrategy:
          "Inference FRQs have a 4-step template: state (the procedure), plan (conditions), do (compute), conclude (in context). Earn all four points.",
        studyTips: [
          "Memorize the 4-step template and apply to 5 problems.",
          "Drill condition-checking on 10 inference problems.",
          "Practice writing conclusions in AP-approved language.",
        ],
      },
      {
        unitNumber: 7,
        title: "Inference for Quantitative Data: Means",
        overview:
          "t-intervals and t-tests for one and two sample means, plus paired tests.",
        examWeight: "10-18%",
        bigIdeas: [
          "Use t-distributions when σ is unknown (which is almost always).",
          "Degrees of freedom: n-1 for one sample, complicated for two (use calculator).",
          "Paired t-test: analyze the differences, not the two samples separately.",
          "Conditions: Random, Normal (or large n via CLT), Independent (10% rule).",
          "The procedure is essentially the same as Unit 6 but with t instead of z.",
        ],
        essentials: [
          {
            heading: "One-sample t-interval",
            body: "x̄ ± t*·(s/√n) where t* comes from the t-distribution with n-1 df.",
          },
          {
            heading: "One-sample t-test",
            body: "t = (x̄ - μ₀)/(s/√n) with df = n-1. Find p-value. Compare to α.",
          },
          {
            heading: "Two-sample t-test",
            body: "Compares two independent means. Standard error = √(s₁²/n₁ + s₂²/n₂). df is computed by the calculator. Conditions: both samples SRS, both approximately Normal or large n.",
          },
          {
            heading: "Paired t-test",
            body: "For matched pairs (before/after, twins). Compute differences, run a one-sample t-test on the differences.",
          },
        ],
        keyFacts: [
          "t-distribution is wider than Normal for small n; converges to Normal as n → ∞.",
          "df = n-1 for one sample.",
          "Paired tests require paired data — don't use two-sample t when samples are matched.",
        ],
        commonMistakes: [
          "Using z instead of t when σ is unknown.",
          "Two-sample t when the data is paired.",
          "Forgetting to check the Normal condition.",
        ],
        examStrategy:
          "Identify the correct procedure first — is it one-sample, two-sample, or paired? Wrong choice is 0 points on the setup.",
        studyTips: [
          "Build a decision tree for choosing inference procedures.",
          "Drill paired t-tests on 5 before/after scenarios.",
          "Practice two-sample t on 5 independent-sample scenarios.",
        ],
      },
      {
        unitNumber: 8,
        title: "Inference for Categorical Data: Chi-Square",
        overview:
          "Chi-square goodness-of-fit test, test for homogeneity, test for independence.",
        examWeight: "2-5%",
        bigIdeas: [
          "Goodness-of-fit: one categorical variable against an expected distribution.",
          "Homogeneity: several populations, one categorical variable. Test if distributions are the same.",
          "Independence: two categorical variables, one sample. Test if they're independent.",
          "Test statistic: χ² = Σ (observed - expected)²/expected.",
          "Conditions: expected counts ≥ 5 in every cell.",
        ],
        essentials: [
          {
            heading: "Goodness-of-fit test",
            body: "Expected = (total)·(hypothesized proportion). df = categories - 1.",
          },
          {
            heading: "Homogeneity and independence",
            body: "Expected in a two-way table = (row total)·(column total)/(grand total). df = (r-1)(c-1). The math is the same; the contexts differ.",
          },
        ],
        keyFacts: [
          "Always compute expected counts and verify ≥ 5 before proceeding.",
          "χ² is right-skewed; large values mean strong evidence against H₀.",
        ],
        commonMistakes: [
          "Mixing up homogeneity (several populations) and independence (one population, two variables).",
          "Forgetting to check expected counts condition.",
          "Using observed counts instead of expected in the chi-square formula.",
        ],
        examStrategy:
          "Identify which chi-square test first. Compute expected counts. Check conditions. Run the test. Conclude in context.",
        studyTips: [
          "Practice each of the 3 chi-square tests on worked examples.",
          "Drill expected count calculations for two-way tables.",
          "Memorize df formulas for each test.",
        ],
      },
      {
        unitNumber: 9,
        title: "Inference for Quantitative Data: Slopes",
        overview:
          "Confidence intervals and significance tests for the slope of a regression line.",
        examWeight: "2-5%",
        bigIdeas: [
          "LINER conditions: Linear, Independent, Normal residuals, Equal variance, Random.",
          "Test statistic: t = b/SE(b) with df = n-2.",
          "Confidence interval for slope: b ± t*·SE(b).",
          "A slope test answers whether there's a significant linear relationship.",
        ],
        essentials: [
          {
            heading: "Conditions (LINER)",
            body: "L: linear pattern in scatterplot. I: independent observations. N: Normal residuals. E: equal variance across x. R: random sample.",
          },
          {
            heading: "Slope t-test",
            body: "H₀: β = 0 (no linear relationship). Test statistic t = b/SE(b). df = n-2. Reject H₀ means there's evidence of a linear relationship.",
          },
        ],
        keyFacts: [
          "df = n-2 for regression inference.",
          "Rejecting H₀: β = 0 is evidence of a linear association, not a causal claim.",
        ],
        commonMistakes: [
          "Skipping LINER conditions.",
          "Claiming causation from a significant slope test.",
        ],
        examStrategy:
          "Use computer output tables provided on the FRQ. Extract b, SE(b), t, p-value and interpret in context.",
        studyTips: [
          "Practice reading computer regression output.",
          "Drill interpretation of slope and intercept in context.",
          "Memorize LINER.",
        ],
      },
    ],
  },
};
