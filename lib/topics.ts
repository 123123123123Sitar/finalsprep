export type Flashcard = { q: string; a: string };
export type LinkRef = { title: string; url: string; source: string };

export type CourseSlug =
  | "ap-precalc"
  | "ap-calc-ab"
  | "ap-calc-bc"
  | "ap-statistics"
  | "ap-physics-1"
  | "ap-physics-2"
  | "ap-physics-c-mech"
  | "ap-physics-c-em"
  | "ap-biology"
  | "ap-chemistry"
  | "ap-environmental"
  | "ap-cs-a"
  | "ap-cs-principles"
  | "ap-us-history"
  | "ap-world-history"
  | "ap-euro-history";

export type CourseCategory = "math" | "science" | "cs" | "history";

export type CourseMembership = {
  courseSlug: CourseSlug;
  unitNumber: number;
  unitTitle: string;
};

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
  keyIdeas: string[];
  sampleProblem: string;
  sampleWalkthrough: string;
  flashcards: Flashcard[];
  links: LinkRef[];
  diagram?: string;
  /** AP courses this lesson appears in, with unit number + unit title. */
  courses: CourseMembership[];
};

// Back-compat alias for any code still importing `Topic`.
export type Topic = Lesson;

/** One topic / subunit inside an AP unit, matching the CED code and title. */
export type ApTopic = { id: string; title: string };

/** One unit in a College Board CED. `topics` is the optional CED topic breakdown. */
export type ApUnit = {
  number: number;
  title: string;
  topics?: ApTopic[];
};

export type Course = {
  slug: CourseSlug;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: CourseCategory;
  /** Official AP unit list with optional per-unit CED topic breakdown. */
  units: ApUnit[];
};

const SVG = (inner: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="100%" height="100%" role="img">${inner}</svg>`;

// --- DIAGRAMS ---
const D_PARABOLA = SVG(`
  <defs><marker id="a1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0a0e1a"/></marker></defs>
  <line x1="20" y1="200" x2="380" y2="200" stroke="#0a0e1a" stroke-width="1.5" marker-end="url(#a1)"/>
  <line x1="200" y1="220" x2="200" y2="20" stroke="#0a0e1a" stroke-width="1.5" marker-end="url(#a1)"/>
  <path d="M 60 40 Q 200 300 340 40" fill="none" stroke="#4f46e5" stroke-width="3"/>
  <circle cx="200" cy="180" r="4" fill="#4f46e5"/>
  <text x="208" y="178" font-family="ui-sans-serif" font-size="12" fill="#0a0e1a">vertex (h, k)</text>
  <circle cx="115" cy="200" r="4" fill="#ec4899"/>
  <circle cx="285" cy="200" r="4" fill="#ec4899"/>
  <text x="95" y="220" font-family="ui-sans-serif" font-size="11" fill="#0a0e1a">root</text>
  <text x="270" y="220" font-family="ui-sans-serif" font-size="11" fill="#0a0e1a">root</text>
  <text x="340" y="220" font-family="ui-sans-serif" font-size="12" fill="#5b6478">x</text>
  <text x="208" y="30" font-family="ui-sans-serif" font-size="12" fill="#5b6478">y</text>
`);

const D_UNIT_CIRCLE = SVG(`
  <g transform="translate(200,120)">
    <circle r="90" fill="none" stroke="#4f46e5" stroke-width="2"/>
    <line x1="-110" y1="0" x2="110" y2="0" stroke="#0a0e1a" stroke-width="1"/>
    <line x1="0" y1="-110" x2="0" y2="110" stroke="#0a0e1a" stroke-width="1"/>
    <line x1="0" y1="0" x2="63.6" y2="-63.6" stroke="#ec4899" stroke-width="2"/>
    <circle cx="63.6" cy="-63.6" r="4" fill="#ec4899"/>
    <path d="M 30 0 A 30 30 0 0 0 21.2 -21.2" fill="none" stroke="#10b981" stroke-width="2"/>
    <text x="36" y="-10" font-family="ui-sans-serif" font-size="11" fill="#10b981">θ</text>
    <text x="68" y="-68" font-family="ui-sans-serif" font-size="11" fill="#ec4899">(cos θ, sin θ)</text>
    <text x="95" y="15" font-family="ui-sans-serif" font-size="11" fill="#5b6478">1</text>
    <text x="-8" y="105" font-family="ui-sans-serif" font-size="11" fill="#5b6478">-1</text>
    <text x="-110" y="15" font-family="ui-sans-serif" font-size="11" fill="#5b6478">-1</text>
  </g>
`);

const D_PROJECTILE = SVG(`
  <line x1="20" y1="200" x2="380" y2="200" stroke="#0a0e1a" stroke-width="1.5"/>
  <path d="M 40 200 Q 200 20 360 200" fill="none" stroke="#4f46e5" stroke-width="3" stroke-dasharray="4 4"/>
  <circle cx="40" cy="200" r="6" fill="#ec4899"/>
  <line x1="40" y1="200" x2="90" y2="150" stroke="#10b981" stroke-width="2" marker-end="url(#arr)"/>
  <defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#10b981"/></marker></defs>
  <text x="55" y="145" font-family="ui-sans-serif" font-size="11" fill="#10b981">v₀</text>
  <text x="200" y="40" font-family="ui-sans-serif" font-size="11" fill="#4f46e5">max height</text>
  <line x1="200" y1="50" x2="200" y2="200" stroke="#5b6478" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="350" y="220" font-family="ui-sans-serif" font-size="11" fill="#5b6478">range</text>
`);

const D_FBD_INCLINE = SVG(`
  <polygon points="40,200 360,200 360,80" fill="#eef2ff" stroke="#0a0e1a" stroke-width="2"/>
  <rect x="220" y="108" width="50" height="32" fill="#fff" stroke="#0a0e1a" stroke-width="2" transform="rotate(-20 245 124)"/>
  <line x1="245" y1="124" x2="245" y2="184" stroke="#ec4899" stroke-width="2.5" marker-end="url(#ar2)"/>
  <defs><marker id="ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ec4899"/></marker><marker id="ar3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#10b981"/></marker><marker id="ar4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4f46e5"/></marker></defs>
  <text x="250" y="200" font-family="ui-sans-serif" font-size="11" fill="#ec4899">mg</text>
  <line x1="245" y1="124" x2="205" y2="83" stroke="#10b981" stroke-width="2.5" marker-end="url(#ar3)"/>
  <text x="180" y="80" font-family="ui-sans-serif" font-size="11" fill="#10b981">N</text>
  <line x1="245" y1="124" x2="305" y2="170" stroke="#4f46e5" stroke-width="2.5" marker-end="url(#ar4)"/>
  <text x="308" y="170" font-family="ui-sans-serif" font-size="11" fill="#4f46e5">f (friction)</text>
  <text x="70" y="195" font-family="ui-sans-serif" font-size="11" fill="#0a0e1a">θ = 30°</text>
`);

const D_RAMP = SVG(`
  <polygon points="40,200 300,200 300,70" fill="#eef2ff" stroke="#0a0e1a" stroke-width="2"/>
  <rect x="260" y="50" width="40" height="28" fill="#fff" stroke="#0a0e1a" stroke-width="2"/>
  <text x="265" y="42" font-family="ui-sans-serif" font-size="11" fill="#0a0e1a">m, v=0</text>
  <line x1="300" y1="70" x2="300" y2="200" stroke="#5b6478" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="305" y="140" font-family="ui-sans-serif" font-size="11" fill="#5b6478">h = 5 m</text>
  <circle cx="60" cy="195" r="8" fill="#ec4899"/>
  <text x="55" y="220" font-family="ui-sans-serif" font-size="11" fill="#ec4899">v = ?</text>
`);

const D_CIRCUIT = SVG(`
  <rect x="80" y="60" width="240" height="120" fill="none" stroke="#0a0e1a" stroke-width="2"/>
  <line x1="80" y1="110" x2="60" y2="110" stroke="#0a0e1a" stroke-width="2"/>
  <line x1="60" y1="100" x2="60" y2="120" stroke="#0a0e1a" stroke-width="3"/>
  <line x1="50" y1="95" x2="50" y2="125" stroke="#0a0e1a" stroke-width="2"/>
  <text x="20" y="115" font-family="ui-sans-serif" font-size="12" fill="#0a0e1a">V</text>
  <rect x="180" y="50" width="40" height="20" fill="#fff" stroke="#0a0e1a" stroke-width="2"/>
  <text x="185" y="44" font-family="ui-sans-serif" font-size="11" fill="#4f46e5">R₁</text>
  <rect x="180" y="170" width="40" height="20" fill="#fff" stroke="#0a0e1a" stroke-width="2"/>
  <text x="185" y="205" font-family="ui-sans-serif" font-size="11" fill="#4f46e5">R₂</text>
  <text x="210" y="130" font-family="ui-sans-serif" font-size="11" fill="#ec4899">I →</text>
`);

const D_STANDING_WAVE = SVG(`
  <line x1="40" y1="120" x2="360" y2="120" stroke="#0a0e1a" stroke-width="1" stroke-dasharray="3 3"/>
  <path d="M 40 120 Q 80 40 120 120 T 200 120 T 280 120 T 360 120" fill="none" stroke="#4f46e5" stroke-width="2.5"/>
  <path d="M 40 120 Q 80 200 120 120 T 200 120 T 280 120 T 360 120" fill="none" stroke="#ec4899" stroke-width="2.5"/>
  <circle cx="40" cy="120" r="5" fill="#0a0e1a"/>
  <circle cx="360" cy="120" r="5" fill="#0a0e1a"/>
  <circle cx="120" cy="120" r="4" fill="#10b981"/>
  <circle cx="200" cy="120" r="4" fill="#10b981"/>
  <circle cx="280" cy="120" r="4" fill="#10b981"/>
  <text x="110" y="145" font-family="ui-sans-serif" font-size="10" fill="#10b981">node</text>
  <text x="30" y="30" font-family="ui-sans-serif" font-size="11" fill="#4f46e5">antinode</text>
  <text x="30" y="215" font-family="ui-sans-serif" font-size="11" fill="#0a0e1a">L, fixed both ends</text>
`);

// --- TOPICS ---
export const LESSONS: Lesson[] = [
  {
    slug: "quadratics",
    title: "Quadratics",
    courses: [
      { courseSlug: "ap-precalc", unitNumber: 1, unitTitle: "Polynomial & Rational Functions" },
    ],
    blurb: "Factoring, quadratic formula, completing the square, vertex form.",
    keyIdeas: [
      "Factor first. If it won't factor cleanly, use the quadratic formula.",
      "Vertex form y = a(x-h)^2 + k tells you the vertex (h, k) at a glance.",
      "Discriminant b^2 - 4ac: positive = 2 real roots, 0 = 1 repeated, negative = complex.",
    ],
    sampleProblem: "Solve 2x^2 - 5x - 3 = 0",
    sampleWalkthrough:
      "This is a quadratic - try factoring first. We need two numbers that multiply to a·c = 2·(-3) = -6 and add to b = -5. That's -6 and +1.\n\nSplit the middle term:\n  2x^2 - 6x + x - 3\n\nFactor by grouping:\n  2x(x - 3) + 1(x - 3)\n  (2x + 1)(x - 3)\n\nSet each factor equal to zero:\n  2x + 1 = 0  →  x = -1/2\n  x - 3 = 0   →  x = 3\n\nCheck with the quadratic formula if you want: x = (5 ± sqrt(25 + 24))/4 = (5 ± 7)/4. Same answers.\n\nTakeaway: when a ≠ 1, split the middle term using the product-sum trick.",
    flashcards: [
      { q: "Quadratic formula?", a: "x = (-b ± sqrt(b^2 - 4ac)) / (2a)" },
      { q: "Discriminant rule?", a: "b^2 - 4ac: >0 two real, =0 one repeated, <0 complex conjugate pair." },
      { q: "Vertex of y = ax^2 + bx + c?", a: "x = -b/(2a); plug back in for y." },
      { q: "Vertex form of a parabola?", a: "y = a(x - h)^2 + k - vertex is (h, k)." },
      { q: "Sum and product of roots?", a: "Sum = -b/a, product = c/a." },
    ],
    links: [
      { title: "Quadratic equations overview", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations", source: "Khan Academy" },
      { title: "Completing the square (Paul's Notes)", url: "https://tutorial.math.lamar.edu/Classes/Alg/CompleteTheSquare.aspx", source: "Paul's Online Math Notes" },
      { title: "Visual intro to parabolas", url: "https://www.youtube.com/watch?v=IWigvJcCAJ0", source: "YouTube" },
    ],
    diagram: D_PARABOLA,
  },
  {
    slug: "polynomials",
    title: "Polynomials",
    courses: [
      { courseSlug: "ap-precalc", unitNumber: 1, unitTitle: "Polynomial & Rational Functions" },
    ],
    blurb: "Factoring, synthetic division, rational root theorem, end behavior.",
    keyIdeas: [
      "Rational Root Theorem: possible rational roots are ± factors of constant / factors of leading coeff.",
      "Synthetic division is long division with less writing.",
      "End behavior is controlled by the leading term alone.",
    ],
    sampleProblem: "Find all roots of x^3 - 4x^2 + x + 6",
    sampleWalkthrough:
      "This asks for all roots of a cubic. Start with the Rational Root Theorem: possible rational roots are ±(factors of 6) / (factors of 1), i.e. ±1, ±2, ±3, ±6.\n\nTest x = -1:\n  (-1)^3 - 4(-1)^2 + (-1) + 6 = -1 - 4 - 1 + 6 = 0. ✓\n\nSo (x + 1) is a factor. Divide x^3 - 4x^2 + x + 6 by (x + 1) (synthetic division with -1):\n  1, -4, 1, 6 → 1, -5, 6, 0\n\nQuotient: x^2 - 5x + 6 = (x - 2)(x - 3).\n\nAll roots: x = -1, 2, 3.\n\nTakeaway: always try small rational roots first - one hit turns a cubic into a quadratic.",
    flashcards: [
      { q: "Rational Root Theorem?", a: "Possible rational roots: ± (factors of constant) / (factors of leading coefficient)." },
      { q: "Factor Theorem?", a: "If p(a) = 0, then (x - a) is a factor of p(x)." },
      { q: "Degree n polynomial has how many roots?", a: "Exactly n, counted with multiplicity, in the complex numbers." },
      { q: "End behavior of x^4?", a: "Both ends go up (even degree, positive leading coefficient)." },
      { q: "Complex roots of real polynomials?", a: "Come in conjugate pairs." },
    ],
    links: [
      { title: "Polynomial long division", url: "https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:poly-div", source: "Khan Academy" },
      { title: "Synthetic division (Paul's Notes)", url: "https://tutorial.math.lamar.edu/Classes/Alg/DividingPolynomials.aspx", source: "Paul's Online Math Notes" },
    ],
  },
  {
    slug: "rationals",
    title: "Rational Functions",
    courses: [
      { courseSlug: "ap-precalc", unitNumber: 1, unitTitle: "Polynomial & Rational Functions" },
    ],
    blurb: "Asymptotes, holes, solving equations, domain restrictions.",
    keyIdeas: [
      "Vertical asymptotes: set denominator = 0 (after canceling common factors).",
      "Horizontal asymptote depends on degree comparison of top and bottom.",
      "Always check for extraneous solutions when clearing fractions.",
    ],
    sampleProblem: "Solve (x+2)/(x-1) = 3/(x-1) + 1",
    sampleWalkthrough:
      "Notice the domain restriction first: x ≠ 1.\n\nMultiply every term by (x - 1) to clear fractions:\n  (x + 2) = 3 + (x - 1)\n  x + 2 = 3 + x - 1\n  x + 2 = x + 2\n\nThis is an identity - true for all x EXCEPT x = 1 (where we'd divide by zero).\n\nSolution: all real numbers except x = 1.\n\nTakeaway: when solving rational equations, write down excluded values BEFORE you clear fractions. Otherwise you'll miss restrictions like this one.",
    flashcards: [
      { q: "When do vertical asymptotes happen?", a: "Where the denominator is zero AND the numerator isn't, after canceling common factors." },
      { q: "Horizontal asymptote when deg num < deg den?", a: "y = 0." },
      { q: "Horizontal asymptote when deg num = deg den?", a: "y = (leading coefficient numerator) / (leading coefficient denominator)." },
      { q: "Hole vs. asymptote?", a: "A common factor in numerator and denominator creates a hole, not an asymptote." },
      { q: "Why check extraneous solutions?", a: "Multiplying by variable expressions can create solutions that don't satisfy the original equation." },
    ],
    links: [
      { title: "Rational functions", url: "https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:rational", source: "Khan Academy" },
    ],
  },
  {
    slug: "exponentials-logs",
    title: "Exponentials & Logs",
    courses: [
      { courseSlug: "ap-precalc", unitNumber: 2, unitTitle: "Exponential & Logarithmic Functions" },
    ],
    blurb: "Growth, decay, log rules, solving exponential equations.",
    keyIdeas: [
      "Match bases if possible; otherwise take log of both sides.",
      "log(ab) = log a + log b, log(a/b) = log a - log b, log(a^k) = k log a.",
      "Always check that log arguments are positive in final answers.",
    ],
    sampleProblem: "Solve 3^(2x) = 81^(x-1)",
    sampleWalkthrough:
      "Both sides can be written with base 3, so match bases:\n  81 = 3^4\n\nRewrite the right side:\n  3^(2x) = (3^4)^(x-1) = 3^(4x - 4)\n\nSince the bases match, set the exponents equal:\n  2x = 4x - 4\n  -2x = -4\n  x = 2\n\nCheck: 3^(2·2) = 3^4 = 81. And 81^(2-1) = 81. ✓\n\nTakeaway: when you can match bases, always match - it beats logs every time.",
    flashcards: [
      { q: "log(a·b) = ?", a: "log a + log b" },
      { q: "log(a^k) = ?", a: "k · log a" },
      { q: "Change of base?", a: "log_b(x) = ln(x) / ln(b)" },
      { q: "e is approximately?", a: "2.71828..." },
      { q: "Inverse of y = a^x?", a: "y = log_a(x)" },
    ],
    links: [
      { title: "Exponentials & logarithms", url: "https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:logs", source: "Khan Academy" },
      { title: "The number e, explained", url: "https://www.youtube.com/watch?v=m2MIpDrF7Es", source: "3Blue1Brown" },
    ],
  },
  {
    slug: "systems",
    title: "Systems of Equations",
    courses: [
      { courseSlug: "ap-precalc", unitNumber: 4, unitTitle: "Functions Involving Parameters, Vectors & Matrices" },
    ],
    blurb: "Substitution, elimination, nonlinear systems.",
    keyIdeas: [
      "Substitution when one variable is easy to isolate.",
      "Elimination when coefficients line up for cancellation.",
      "Nonlinear systems can have 0, 1, 2, or more solutions - think geometrically.",
    ],
    sampleProblem: "Solve: x^2 + y^2 = 25, y = x + 1",
    sampleWalkthrough:
      "One equation is already solved for y - use substitution.\n\nPlug y = x + 1 into the first equation:\n  x^2 + (x + 1)^2 = 25\n  x^2 + x^2 + 2x + 1 = 25\n  2x^2 + 2x - 24 = 0\n  x^2 + x - 12 = 0\n  (x + 4)(x - 3) = 0\n\nSo x = -4 or x = 3. Use y = x + 1 to get y-values:\n  x = -4 → y = -3\n  x = 3  → y = 4\n\nTwo solutions: (-4, -3) and (3, 4). Geometrically, this is a line intersecting a circle at two points.\n\nTakeaway: when one variable is already isolated, substitution is almost always the fastest path.",
    flashcards: [
      { q: "Best method when a variable is isolated?", a: "Substitution." },
      { q: "Best method when coefficients nearly cancel?", a: "Elimination." },
      { q: "Line + circle can have how many intersections?", a: "0, 1, or 2." },
      { q: "Inconsistent system?", a: "No solutions (parallel lines)." },
      { q: "Dependent system?", a: "Infinitely many solutions (same line)." },
    ],
    links: [
      { title: "Systems of equations", url: "https://www.khanacademy.org/math/algebra-home/alg-system-of-equations", source: "Khan Academy" },
    ],
  },
  {
    slug: "functions",
    title: "Functions & Transformations",
    courses: [
      { courseSlug: "ap-precalc", unitNumber: 1, unitTitle: "Polynomial & Rational Functions" },
    ],
    blurb: "Composition, inverses, shifts, stretches, reflections.",
    keyIdeas: [
      "f(x) + k shifts up; f(x + k) shifts LEFT (the sign flips).",
      "Inverse: swap x and y, then solve for y.",
      "f(g(x)) means plug g(x) in wherever x appears in f.",
    ],
    sampleProblem: "If f(x) = 2x - 3 and g(x) = x^2, find f(g(2)) and g(f(2)).",
    sampleWalkthrough:
      "Work from the inside out.\n\nf(g(2)):\n  g(2) = 2^2 = 4\n  f(4) = 2(4) - 3 = 5\n\ng(f(2)):\n  f(2) = 2(2) - 3 = 1\n  g(1) = 1^2 = 1\n\nSo f(g(2)) = 5 and g(f(2)) = 1.\n\nTakeaway: f(g(x)) and g(f(x)) are generally NOT the same. Always work inside-out.",
    flashcards: [
      { q: "f(x - 3) does what to the graph?", a: "Shifts right by 3." },
      { q: "How to find an inverse?", a: "Swap x and y, then solve for y." },
      { q: "-f(x) vs f(-x)?", a: "-f(x) reflects over x-axis; f(-x) reflects over y-axis." },
      { q: "Composition (f ∘ g)(x) =", a: "f(g(x))" },
      { q: "Function passes which test?", a: "Vertical line test (each x maps to one y)." },
    ],
    links: [
      { title: "Function composition", url: "https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:composite", source: "Khan Academy" },
    ],
  },

  // --- Precalc & Trig ---
  {
    slug: "trig-basics",
    title: "Trig Basics & Unit Circle",
    courses: [
      { courseSlug: "ap-precalc", unitNumber: 3, unitTitle: "Trigonometric & Polar Functions" },
    ],
    blurb: "sin, cos, tan on the unit circle. Degrees ↔ radians.",
    keyIdeas: [
      "Radians = degrees · π/180. Memorize the 30/45/60 values cold.",
      "sin is y, cos is x on the unit circle.",
      "Signs follow ASTC (All, Sin, Tan, Cos) across the 4 quadrants.",
    ],
    sampleProblem: "Find sin(5π/6) and cos(5π/6) without a calculator.",
    sampleWalkthrough:
      "5π/6 is in quadrant II (between π/2 and π). The reference angle is π - 5π/6 = π/6 (30°).\n\nFrom the unit circle at 30°:\n  sin(π/6) = 1/2\n  cos(π/6) = sqrt(3)/2\n\nIn quadrant II, sin is positive and cos is negative. So:\n  sin(5π/6) = 1/2\n  cos(5π/6) = -sqrt(3)/2\n\nTakeaway: reference angle + quadrant sign rule (ASTC) solves every unit-circle question without memorizing 16 points.",
    flashcards: [
      { q: "sin(30°)?", a: "1/2" },
      { q: "cos(30°)?", a: "sqrt(3)/2" },
      { q: "sin(45°)?", a: "sqrt(2)/2" },
      { q: "cos(60°)?", a: "1/2" },
      { q: "Radians from degrees?", a: "Multiply by π/180." },
      { q: "ASTC?", a: "Quadrant signs: All, Sin, Tan, Cos positive in Q1-Q4 respectively." },
    ],
    links: [
      { title: "Unit circle walkthrough", url: "https://www.khanacademy.org/math/trigonometry/unit-circle-trig-func", source: "Khan Academy" },
      { title: "Trig intuition", url: "https://betterexplained.com/articles/intuitive-trigonometry/", source: "BetterExplained" },
    ],
    diagram: D_UNIT_CIRCLE,
  },
  {
    slug: "trig-identities",
    title: "Trig Identities & Equations",
    courses: [
      { courseSlug: "ap-precalc", unitNumber: 3, unitTitle: "Trigonometric & Polar Functions" },
    ],
    blurb: "Pythagorean, double-angle, solving trig equations.",
    keyIdeas: [
      "sin^2(x) + cos^2(x) = 1 is the one to always have ready.",
      "Double-angle: sin(2x) = 2 sin(x) cos(x); cos(2x) has 3 forms.",
      "Solving: find all solutions in [0, 2π), then add 2πk for general.",
    ],
    sampleProblem: "Solve 2 sin^2(x) - 1 = 0 for x in [0, 2π).",
    sampleWalkthrough:
      "Isolate sin^2(x):\n  2 sin^2(x) = 1\n  sin^2(x) = 1/2\n  sin(x) = ± sqrt(2)/2\n\nNow find all x in [0, 2π) where sin equals +sqrt(2)/2 or -sqrt(2)/2.\n\nsin(x) = sqrt(2)/2:  x = π/4, 3π/4\nsin(x) = -sqrt(2)/2: x = 5π/4, 7π/4\n\nFour solutions: π/4, 3π/4, 5π/4, 7π/4.\n\nTakeaway: don't forget the ± when taking square roots of trig equations - you'll lose half the answers.",
    flashcards: [
      { q: "Pythagorean identity?", a: "sin²x + cos²x = 1" },
      { q: "sin(2x) =?", a: "2 sin x cos x" },
      { q: "cos(2x) =?", a: "cos²x - sin²x = 1 - 2sin²x = 2cos²x - 1" },
      { q: "tan(x) in sin/cos?", a: "sin x / cos x" },
      { q: "1 + tan²x =?", a: "sec²x" },
    ],
    links: [
      { title: "Trig identities list", url: "https://tutorial.math.lamar.edu/Classes/Alg/Trig_Formulas.aspx", source: "Paul's Online Math Notes" },
    ],
  },
  {
    slug: "complex-numbers",
    title: "Complex Numbers",
    courses: [
      { courseSlug: "ap-precalc", unitNumber: 3, unitTitle: "Trigonometric & Polar Functions" },
    ],
    blurb: "i, arithmetic, conjugates, polar form.",
    keyIdeas: [
      "i^2 = -1. Powers cycle: i, -1, -i, 1, ...",
      "To divide, multiply top and bottom by the conjugate.",
      "Complex roots come in conjugate pairs for real-coefficient polynomials.",
    ],
    sampleProblem: "Simplify (3 + 2i)/(1 - i)",
    sampleWalkthrough:
      "To divide, multiply numerator and denominator by the conjugate of the denominator, which is (1 + i).\n\nNumerator: (3 + 2i)(1 + i) = 3 + 3i + 2i + 2i^2 = 3 + 5i - 2 = 1 + 5i\nDenominator: (1 - i)(1 + i) = 1 - i^2 = 1 - (-1) = 2\n\nResult: (1 + 5i)/2 = 1/2 + (5/2)i\n\nTakeaway: conjugate trick always makes a complex denominator real.",
    flashcards: [
      { q: "i^2 =", a: "-1" },
      { q: "i^3 =", a: "-i" },
      { q: "Conjugate of a + bi?", a: "a - bi" },
      { q: "|a + bi| =", a: "sqrt(a² + b²)" },
      { q: "(a + bi)(a - bi) =", a: "a² + b²" },
    ],
    links: [
      { title: "Complex numbers intro", url: "https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:complex", source: "Khan Academy" },
    ],
  },
  {
    slug: "sequences-series",
    title: "Sequences & Series",
    courses: [
      { courseSlug: "ap-precalc", unitNumber: 4, unitTitle: "Functions Involving Parameters, Vectors & Matrices" },
      { courseSlug: "ap-calc-bc", unitNumber: 10, unitTitle: "Infinite Sequences & Series" },
    ],
    blurb: "Arithmetic, geometric, sigma notation, sums.",
    keyIdeas: [
      "Arithmetic: a_n = a_1 + (n-1)d.",
      "Geometric: a_n = a_1 · r^(n-1).",
      "Finite geometric sum: S_n = a_1(1 - r^n)/(1 - r).",
    ],
    sampleProblem: "Find the sum of the first 10 terms of 3, 6, 12, 24, ...",
    sampleWalkthrough:
      "This is geometric: each term is ×2 the previous, so r = 2 and a_1 = 3.\n\nUse the finite geometric sum formula:\n  S_n = a_1 · (1 - r^n)/(1 - r)\n  S_10 = 3 · (1 - 2^10)/(1 - 2)\n  S_10 = 3 · (1 - 1024)/(-1)\n  S_10 = 3 · 1023\n  S_10 = 3069\n\nTakeaway: recognize arithmetic (common difference) vs. geometric (common ratio) in the first 15 seconds - pick the right formula immediately.",
    flashcards: [
      { q: "Arithmetic nth term?", a: "a_n = a_1 + (n-1)d" },
      { q: "Geometric nth term?", a: "a_n = a_1 · r^(n-1)" },
      { q: "Arithmetic sum first n terms?", a: "S_n = n(a_1 + a_n)/2" },
      { q: "Geometric sum first n terms?", a: "S_n = a_1(1 - r^n)/(1 - r)" },
      { q: "Infinite geometric sum (|r|<1)?", a: "S = a_1/(1 - r)" },
    ],
    links: [
      { title: "Sequences and series", url: "https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:seq", source: "Khan Academy" },
    ],
  },

  // --- Calculus ---
  {
    slug: "limits",
    title: "Limits & Continuity",
    courses: [
      { courseSlug: "ap-calc-ab", unitNumber: 1, unitTitle: "Limits & Continuity" },
      { courseSlug: "ap-calc-bc", unitNumber: 1, unitTitle: "Limits & Continuity" },
    ],
    blurb: "Direct sub, factor/cancel, conjugate, L'Hôpital.",
    keyIdeas: [
      "Always try direct substitution first.",
      "0/0 is a signal to factor, conjugate, or use L'Hôpital.",
      "lim x→0 sin(x)/x = 1 is memorize-once.",
    ],
    sampleProblem: "Evaluate lim x→2 (x^2 - 4)/(x - 2).",
    sampleWalkthrough:
      "First try direct substitution: plug x = 2 in.\n  (4 - 4)/(2 - 2) = 0/0\n\n0/0 is indeterminate - not the answer, just a signal to do more work. Factor the numerator:\n  x^2 - 4 = (x - 2)(x + 2)\n\nSo (x^2 - 4)/(x - 2) = (x - 2)(x + 2)/(x - 2) = x + 2 (for x ≠ 2).\n\nNow the limit is easy:\n  lim x→2 (x + 2) = 4\n\nTakeaway: 0/0 doesn't mean the limit is undefined - it means factor, conjugate, or L'Hôpital.",
    flashcards: [
      { q: "Indeterminate forms?", a: "0/0, ∞/∞, 0·∞, ∞-∞, 0^0, ∞^0, 1^∞" },
      { q: "lim x→0 sin(x)/x?", a: "1" },
      { q: "L'Hôpital's rule?", a: "For 0/0 or ∞/∞: lim f/g = lim f'/g'." },
      { q: "lim x→∞ (1 + 1/x)^x?", a: "e" },
      { q: "When limit exists?", a: "Left limit = right limit = a finite value." },
    ],
    links: [
      { title: "Limits intro", url: "https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new", source: "Khan Academy" },
      { title: "Essence of calculus: limits", url: "https://www.youtube.com/watch?v=kfF40MiS7zA", source: "3Blue1Brown" },
    ],
  },
  {
    slug: "derivatives",
    title: "Derivatives: Rules & Chain",
    courses: [
      { courseSlug: "ap-calc-ab", unitNumber: 2, unitTitle: "Differentiation: Definition & Fundamental Properties" },
      { courseSlug: "ap-calc-bc", unitNumber: 2, unitTitle: "Differentiation: Definition & Fundamental Properties" },
    ],
    blurb: "Power, product, quotient, chain rule.",
    keyIdeas: [
      "Chain rule is the one everyone forgets: d/dx f(g(x)) = f'(g(x)) · g'(x).",
      "Product rule: (fg)' = f'g + fg'. Quotient rule: (f/g)' = (f'g - fg')/g^2.",
      "Always simplify before differentiating if you can.",
    ],
    sampleProblem: "Find dy/dx if y = (3x^2 + 1)^5.",
    sampleWalkthrough:
      "This is a composition: an outer function (something)^5 applied to an inner function (3x^2 + 1). Chain rule.\n\nLet u = 3x^2 + 1. Then y = u^5.\n\nDerivative of outer (treating u as a variable):\n  dy/du = 5u^4 = 5(3x^2 + 1)^4\n\nDerivative of inner:\n  du/dx = 6x\n\nMultiply:\n  dy/dx = 5(3x^2 + 1)^4 · 6x = 30x(3x^2 + 1)^4\n\nTakeaway: chain rule = derivative of outer (leaving inner alone) times derivative of inner.",
    flashcards: [
      { q: "d/dx [x^n] =", a: "n x^(n-1)" },
      { q: "d/dx [e^x] =", a: "e^x" },
      { q: "d/dx [ln(x)] =", a: "1/x" },
      { q: "d/dx [sin(x)] =", a: "cos(x)" },
      { q: "d/dx [cos(x)] =", a: "-sin(x)" },
      { q: "Chain rule?", a: "d/dx f(g(x)) = f'(g(x)) · g'(x)" },
      { q: "Product rule?", a: "(fg)' = f'g + fg'" },
      { q: "Quotient rule?", a: "(f/g)' = (f'g - fg')/g²" },
    ],
    links: [
      { title: "Essence of calculus", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", source: "3Blue1Brown" },
      { title: "Derivative rules", url: "https://tutorial.math.lamar.edu/Classes/CalcI/DiffFormulas.aspx", source: "Paul's Online Math Notes" },
    ],
  },
  {
    slug: "applications-derivatives",
    title: "Optimization & Related Rates",
    courses: [
      { courseSlug: "ap-calc-ab", unitNumber: 4, unitTitle: "Contextual Applications of Differentiation" },
      { courseSlug: "ap-calc-bc", unitNumber: 4, unitTitle: "Contextual Applications of Differentiation" },
    ],
    blurb: "Max/min, related rates, curve sketching.",
    keyIdeas: [
      "Optimization: write the quantity in one variable, take derivative, set = 0.",
      "Related rates: differentiate the equation with respect to time, then plug in.",
      "Second derivative test: f''(a) > 0 means local min, < 0 means local max.",
    ],
    sampleProblem:
      "A ladder 10 ft long slides down a wall. The bottom moves at 2 ft/s. How fast is the top moving when the bottom is 6 ft from the wall?",
    sampleWalkthrough:
      "This is a related-rates problem. Let x = distance from wall to base, y = height of top on wall, and L = 10 (constant).\n\nRelationship (Pythagorean):\n  x^2 + y^2 = 100\n\nDifferentiate both sides with respect to time t:\n  2x (dx/dt) + 2y (dy/dt) = 0\n  x (dx/dt) + y (dy/dt) = 0\n\nAt the instant in question: x = 6, dx/dt = 2 ft/s.\nFind y: 6^2 + y^2 = 100 → y = 8.\n\nSolve for dy/dt:\n  6(2) + 8(dy/dt) = 0\n  dy/dt = -12/8 = -1.5 ft/s\n\nThe top is moving DOWN at 1.5 ft/s (negative sign indicates direction).\n\nTakeaway: related rates = differentiate the geometric relationship with respect to t, then plug in the instant.",
    flashcards: [
      { q: "Critical point?", a: "Where f'(x) = 0 or undefined." },
      { q: "Second derivative test?", a: "f''(a) > 0: local min. f''(a) < 0: local max." },
      { q: "Related rates general step?", a: "Differentiate the constraint equation with respect to time, then substitute." },
      { q: "Concave up ⇔?", a: "f''(x) > 0." },
      { q: "Inflection point?", a: "Where concavity changes (f'' changes sign)." },
    ],
    links: [
      { title: "Optimization problems", url: "https://tutorial.math.lamar.edu/Classes/CalcI/Optimization.aspx", source: "Paul's Online Math Notes" },
    ],
  },
  {
    slug: "integrals",
    title: "Integrals & u-substitution",
    courses: [
      { courseSlug: "ap-calc-ab", unitNumber: 6, unitTitle: "Integration & Accumulation of Change" },
      { courseSlug: "ap-calc-bc", unitNumber: 6, unitTitle: "Integration & Accumulation of Change" },
    ],
    blurb: "Antiderivatives, definite integrals, substitution.",
    keyIdeas: [
      "Power rule in reverse: integral of x^n dx = x^(n+1)/(n+1) + C (n ≠ -1).",
      "u-sub: pick u as the 'inside' function; compute du; replace everything.",
      "FTC: integral from a to b of f(x) dx = F(b) - F(a).",
    ],
    sampleProblem: "Evaluate integral of 2x · (x^2 + 1)^3 dx.",
    sampleWalkthrough:
      "The form screams u-substitution: we have (something)^3 and its derivative (2x) as a factor.\n\nLet u = x^2 + 1.\nThen du = 2x dx - which is exactly the rest of the integrand.\n\nRewrite:\n  integral of u^3 du\n\nPower rule in reverse:\n  = u^4/4 + C\n\nSubstitute back:\n  = (x^2 + 1)^4 / 4 + C\n\nCheck by differentiating (chain rule): d/dx [(x^2+1)^4/4] = (4(x^2+1)^3 · 2x)/4 = 2x(x^2+1)^3. ✓\n\nTakeaway: when you spot an inner function and its derivative in the same integral, u-sub is the move.",
    flashcards: [
      { q: "Integral of x^n dx (n ≠ -1)?", a: "x^(n+1)/(n+1) + C" },
      { q: "Integral of 1/x dx?", a: "ln|x| + C" },
      { q: "Integral of e^x dx?", a: "e^x + C" },
      { q: "Integral of sin(x) dx?", a: "-cos(x) + C" },
      { q: "Integral of cos(x) dx?", a: "sin(x) + C" },
      { q: "FTC Part 2?", a: "∫[a to b] f(x)dx = F(b) - F(a)" },
    ],
    links: [
      { title: "Integration by substitution", url: "https://tutorial.math.lamar.edu/Classes/CalcI/SubstitutionRuleIndefinite.aspx", source: "Paul's Online Math Notes" },
    ],
  },
  {
    slug: "series-tests",
    title: "Series Convergence Tests",
    courses: [
      { courseSlug: "ap-calc-bc", unitNumber: 10, unitTitle: "Infinite Sequences & Series" },
    ],
    blurb: "Geometric, p-series, ratio test, comparison.",
    keyIdeas: [
      "Geometric: converges iff |r| < 1, sum = a/(1-r).",
      "p-series: converges iff p > 1.",
      "Ratio test: L = lim |a_(n+1)/a_n|. L < 1 converges, L > 1 diverges.",
    ],
    sampleProblem: "Does the sum from n=1 of n/2^n converge? Find the sum if so.",
    sampleWalkthrough:
      "Try the ratio test:\n  a_n = n/2^n, a_(n+1) = (n+1)/2^(n+1)\n  |a_(n+1)/a_n| = ((n+1)/2^(n+1)) · (2^n/n) = (n+1)/(2n)\n  lim n→∞ (n+1)/(2n) = 1/2 < 1\n\nRatio test gives L = 1/2 < 1, so the series converges.\n\nFor the sum, use the known result: sum from n=1 of n x^n = x/(1-x)^2 for |x| < 1.\n\nWith x = 1/2:\n  sum = (1/2)/(1 - 1/2)^2 = (1/2)/(1/4) = 2\n\nTakeaway: ratio test is the default when you see factorials or exponentials in the terms.",
    flashcards: [
      { q: "Geometric series converges when?", a: "|r| < 1" },
      { q: "p-series converges when?", a: "p > 1" },
      { q: "Ratio test L < 1?", a: "Converges." },
      { q: "Harmonic series (p=1)?", a: "Diverges." },
      { q: "Nth-term test?", a: "If lim a_n ≠ 0, series diverges." },
    ],
    links: [
      { title: "Convergence tests cheat sheet", url: "https://tutorial.math.lamar.edu/Classes/CalcII/SeriesStrategy.aspx", source: "Paul's Online Math Notes" },
    ],
  },

  // --- Physics ---
  {
    slug: "kinematics",
    title: "Kinematics",
    courses: [
      { courseSlug: "ap-physics-1", unitNumber: 1, unitTitle: "Kinematics" },
    ],
    blurb: "Position, velocity, acceleration. The 4 equations.",
    keyIdeas: [
      "With constant acceleration, pick the equation missing your unknown.",
      "Horizontal and vertical motion are INDEPENDENT in projectile problems.",
      "v = dx/dt and a = dv/dt.",
    ],
    sampleProblem:
      "A ball is thrown up at 20 m/s from ground level. How high does it go? (g = 10 m/s^2)",
    sampleWalkthrough:
      "At max height, vertical velocity is momentarily zero - that's the trick. Use the equation missing time:\n  v^2 = v_0^2 + 2 a Δy\n\nHere: v = 0, v_0 = 20 m/s, a = -g = -10 m/s^2 (taking up as positive).\n  0 = (20)^2 + 2(-10) Δy\n  0 = 400 - 20 Δy\n  Δy = 20 m\n\nThe ball reaches 20 m.\n\nTakeaway: at max height, vertical velocity = 0. Use v^2 = v_0^2 + 2aΔy when time isn't asked for.",
    flashcards: [
      { q: "Kinematic equation 1 (no displacement)?", a: "v = v₀ + at" },
      { q: "Kinematic equation 2 (no final v)?", a: "x = v₀t + (1/2)at²" },
      { q: "Kinematic equation 3 (no time)?", a: "v² = v₀² + 2aΔx" },
      { q: "g (Earth, approx)?", a: "9.8 m/s² downward (often use 10)." },
      { q: "Free fall: horizontal velocity?", a: "Unchanged throughout flight." },
    ],
    links: [
      { title: "Kinematic equations", url: "https://www.khanacademy.org/science/physics/one-dimensional-motion", source: "Khan Academy" },
    ],
    diagram: D_PROJECTILE,
  },
  {
    slug: "newtons-laws",
    title: "Newton's Laws & Forces",
    courses: [
      { courseSlug: "ap-physics-1", unitNumber: 2, unitTitle: "Force & Translational Dynamics" },
    ],
    blurb: "Free-body diagrams, F = ma, friction, tension.",
    keyIdeas: [
      "Draw the free-body diagram FIRST. Every time.",
      "Pick axes that line up with motion - tilt them on inclines.",
      "F_friction = μN, where N is the normal force.",
    ],
    sampleProblem:
      "A 5 kg box slides down a 30° incline with μ = 0.2. Find its acceleration.",
    sampleWalkthrough:
      "Draw a free-body diagram and tilt axes so x points down the ramp, y perpendicular.\n\nForces on the box:\n  - Gravity: mg, straight down. Split into components: mg sin θ (down the ramp) and mg cos θ (into the ramp).\n  - Normal force N, perpendicular to ramp.\n  - Friction f = μN, up the ramp (opposes motion).\n\nPerpendicular (y) equilibrium:\n  N = mg cos θ\n\nAlong the ramp (x), Newton's 2nd law:\n  m a = mg sin θ - μ mg cos θ\n  a = g (sin θ - μ cos θ)\n\nPlug in g = 9.8, θ = 30°, μ = 0.2:\n  a = 9.8 · (0.5 - 0.2 · 0.866)\n  a = 9.8 · (0.5 - 0.173)\n  a = 9.8 · 0.327\n  a ≈ 3.2 m/s^2 (down the ramp)\n\nTakeaway: on an incline, tilt your axes. Perpendicular gives you N, parallel gives you the motion equation.",
    flashcards: [
      { q: "Newton's 1st law?", a: "An object at rest or moving stays so unless acted on by a net force." },
      { q: "Newton's 2nd law?", a: "F_net = ma" },
      { q: "Newton's 3rd law?", a: "Every action has an equal and opposite reaction." },
      { q: "Kinetic friction?", a: "f_k = μ_k · N" },
      { q: "On an incline, N =?", a: "mg cos θ (perpendicular to ramp)" },
      { q: "Gravity component down a ramp?", a: "mg sin θ" },
    ],
    links: [
      { title: "Forces and Newton's laws", url: "https://www.khanacademy.org/science/physics/forces-newtons-laws", source: "Khan Academy" },
    ],
    diagram: D_FBD_INCLINE,
  },
  {
    slug: "energy",
    title: "Work, Energy & Power",
    courses: [
      { courseSlug: "ap-physics-1", unitNumber: 3, unitTitle: "Work, Energy & Power" },
    ],
    blurb: "KE, PE, work-energy theorem, conservation of energy.",
    keyIdeas: [
      "Work-energy theorem: net work = ΔKE.",
      "Conservation: KE_i + PE_i + W_other = KE_f + PE_f.",
      "If only gravity/springs act, mechanical energy is conserved.",
    ],
    sampleProblem:
      "A 2 kg block slides down a frictionless 5 m ramp from rest. Find its speed at the bottom.",
    sampleWalkthrough:
      "Frictionless means mechanical energy is conserved. Use conservation of energy instead of forces - much faster.\n\nTop of ramp (rest at height h = 5 m):\n  KE_i = 0\n  PE_i = mgh = 2 · 9.8 · 5 = 98 J\n\nBottom of ramp (height 0):\n  KE_f = (1/2) m v^2\n  PE_f = 0\n\nConservation:\n  0 + 98 = (1/2)(2) v^2 + 0\n  98 = v^2\n  v = sqrt(98) ≈ 9.9 m/s\n\nNotice the mass cancels out - any object from 5 m high reaches ~9.9 m/s. Classic trick.\n\nTakeaway: if friction doesn't act, use energy conservation. It skips forces entirely.",
    flashcards: [
      { q: "Kinetic energy?", a: "KE = (1/2) m v²" },
      { q: "Gravitational PE near Earth?", a: "PE = m g h" },
      { q: "Spring PE?", a: "PE = (1/2) k x²" },
      { q: "Work done by a force?", a: "W = F · d · cos(θ)" },
      { q: "Work-energy theorem?", a: "W_net = ΔKE" },
      { q: "Power?", a: "P = W/t = F · v" },
    ],
    links: [
      { title: "Energy", url: "https://www.khanacademy.org/science/physics/work-and-energy", source: "Khan Academy" },
    ],
    diagram: D_RAMP,
  },
  {
    slug: "momentum",
    title: "Linear Momentum & Collisions",
    courses: [
      { courseSlug: "ap-physics-1", unitNumber: 4, unitTitle: "Linear Momentum" },
    ],
    blurb: "p = mv, conservation, elastic vs inelastic.",
    keyIdeas: [
      "Momentum is conserved in ALL collisions (no external forces).",
      "Kinetic energy is conserved only in elastic collisions.",
      "Impulse = F · Δt = Δp.",
    ],
    sampleProblem:
      "A 3 kg cart at 4 m/s hits a stationary 1 kg cart and sticks. Find the final velocity.",
    sampleWalkthrough:
      "They stick together - that's a perfectly inelastic collision. Momentum is still conserved (the 'sticks' just means KE isn't).\n\nMomentum before:\n  p_i = (3)(4) + (1)(0) = 12 kg·m/s\n\nAfter, they move as one object of mass 3 + 1 = 4 kg:\n  p_f = 4 v\n\nSet equal:\n  12 = 4 v\n  v = 3 m/s\n\nKinetic energy check (not required, just illustrative):\n  KE_i = (1/2)(3)(16) = 24 J\n  KE_f = (1/2)(4)(9) = 18 J\n\n6 J was 'lost' (turned into heat/sound/deformation) - that's why it's inelastic.\n\nTakeaway: momentum is always conserved in isolated collisions. KE is only conserved in elastic ones.",
    flashcards: [
      { q: "Momentum?", a: "p = mv (a vector)" },
      { q: "Impulse?", a: "J = F Δt = Δp" },
      { q: "Elastic collision?", a: "KE and momentum both conserved." },
      { q: "Inelastic collision?", a: "Momentum conserved, KE not." },
      { q: "Perfectly inelastic?", a: "Objects stick together - max KE loss while conserving momentum." },
    ],
    links: [
      { title: "Momentum & collisions", url: "https://www.khanacademy.org/science/physics/linear-momentum", source: "Khan Academy" },
    ],
  },
  {
    slug: "circuits",
    title: "DC Circuits",
    courses: [
      { courseSlug: "ap-physics-2", unitNumber: 3, unitTitle: "Electric Circuits" },
    ],
    blurb: "Ohm's law, series/parallel, Kirchhoff.",
    keyIdeas: [
      "V = IR. Power P = IV = I²R = V²/R.",
      "Series: resistances add. Parallel: reciprocals add.",
      "Kirchhoff: junction rule + loop rule.",
    ],
    sampleProblem:
      "Two 6 Ω resistors are in parallel, then in series with a 3 Ω resistor. Find total resistance.",
    sampleWalkthrough:
      "Parallel combination first. For two equal parallel resistors, the shortcut is R/2:\n  R_parallel = 6/2 = 3 Ω\n\n(Or from the formula: 1/R_p = 1/6 + 1/6 = 2/6 = 1/3, so R_p = 3 Ω.)\n\nNow the parallel combo (3 Ω) is in series with the other 3 Ω. Series resistances add:\n  R_total = 3 + 3 = 6 Ω\n\nTakeaway: two equal resistors in parallel halve the resistance. Two equal resistors in series double it.",
    flashcards: [
      { q: "Ohm's law?", a: "V = IR" },
      { q: "Power in a resistor?", a: "P = IV = I²R = V²/R" },
      { q: "Series resistors?", a: "R_total = R₁ + R₂ + ..." },
      { q: "Parallel resistors?", a: "1/R_total = 1/R₁ + 1/R₂ + ..." },
      { q: "Kirchhoff's junction rule?", a: "Sum of currents in = sum of currents out." },
      { q: "Kirchhoff's loop rule?", a: "Sum of voltage changes around a loop = 0." },
    ],
    links: [
      { title: "Circuits", url: "https://www.khanacademy.org/science/physics/circuits-topic", source: "Khan Academy" },
    ],
    diagram: D_CIRCUIT,
  },
  {
    slug: "waves",
    title: "Simple Harmonic Motion & Waves",
    courses: [
      { courseSlug: "ap-physics-1", unitNumber: 7, unitTitle: "Oscillations (SHM)" },
    ],
    blurb: "v = fλ, standing waves, Doppler.",
    keyIdeas: [
      "v = f · λ. For a string, v = sqrt(T/μ).",
      "Standing waves on a string fixed at both ends: λ_n = 2L/n.",
      "Doppler: observed frequency rises when source and observer approach.",
    ],
    sampleProblem:
      "A string 1.2 m long fixed at both ends resonates at 200 Hz in its fundamental mode. Find wave speed.",
    sampleWalkthrough:
      "Fundamental mode (n = 1) on a string fixed at both ends has wavelength:\n  λ_1 = 2L = 2 · 1.2 = 2.4 m\n\nWave speed from v = f λ:\n  v = (200 Hz)(2.4 m) = 480 m/s\n\nTakeaway: fundamental mode on a string fixed at both ends has half a wavelength fitting in the string - so λ = 2L.",
    flashcards: [
      { q: "Wave equation?", a: "v = f λ" },
      { q: "Wave on a string?", a: "v = sqrt(T/μ)" },
      { q: "Standing wave on string (both ends fixed), nth harmonic?", a: "λ_n = 2L/n, f_n = n v/(2L)" },
      { q: "Period and frequency?", a: "T = 1/f" },
      { q: "Speed of sound in air (~20°C)?", a: "~343 m/s" },
    ],
    links: [
      { title: "Waves", url: "https://www.khanacademy.org/science/physics/mechanical-waves-and-sound", source: "Khan Academy" },
    ],
    diagram: D_STANDING_WAVE,
  },
];

// Back-compat alias so any old import (TOPICS) still works.
export const TOPICS: Lesson[] = LESSONS;

// --- AP CED unit + subtopic data (one module per category) ---
import { MATH_UNITS } from "@/lib/apUnits/math";
import { SCIENCE_UNITS } from "@/lib/apUnits/science";
import { CS_UNITS } from "@/lib/apUnits/cs";
import { HISTORY_UNITS } from "@/lib/apUnits/history";

const AP_UNITS: Record<string, ApUnit[]> = {
  ...MATH_UNITS,
  ...SCIENCE_UNITS,
  ...CS_UNITS,
  ...HISTORY_UNITS,
};

/** Pull the official CED units for a course slug, or return the fallback
 *  units if the course isn't in the AP_UNITS registry yet. */
function cedUnits(slug: string, fallback: ApUnit[]): ApUnit[] {
  return AP_UNITS[slug] ?? fallback;
}

export const COURSES: Course[] = [
  // ---------- MATH ----------
  {
    slug: "ap-precalc",
    title: "AP Precalculus",
    shortTitle: "Precalc",
    category: "math",
    subtitle:
      "Polynomial, rational, exponential, logarithmic, and trigonometric functions.",
    units: cedUnits("ap-precalc", [
      { number: 1, title: "Polynomial & Rational Functions" },
      { number: 2, title: "Exponential & Logarithmic Functions" },
      { number: 3, title: "Trigonometric & Polar Functions" },
      { number: 4, title: "Functions Involving Parameters, Vectors & Matrices" },
    ]),
  },
  {
    slug: "ap-calc-ab",
    title: "AP Calculus AB",
    shortTitle: "Calc AB",
    category: "math",
    subtitle: "Single-variable calculus: limits, derivatives, and integrals.",
    units: cedUnits("ap-calc-ab", [
      { number: 1, title: "Limits & Continuity" },
      { number: 2, title: "Differentiation: Definition & Fundamental Properties" },
      { number: 3, title: "Differentiation: Composite, Implicit & Inverse Functions" },
      { number: 4, title: "Contextual Applications of Differentiation" },
      { number: 5, title: "Analytical Applications of Differentiation" },
      { number: 6, title: "Integration & Accumulation of Change" },
      { number: 7, title: "Differential Equations" },
      { number: 8, title: "Applications of Integration" },
    ]),
  },
  {
    slug: "ap-calc-bc",
    title: "AP Calculus BC",
    shortTitle: "Calc BC",
    category: "math",
    subtitle: "Everything in AB, plus sequences, series, parametric and polar.",
    units: cedUnits("ap-calc-bc", [
      { number: 1, title: "Limits & Continuity" },
      { number: 2, title: "Differentiation: Definition & Fundamental Properties" },
      { number: 3, title: "Differentiation: Composite, Implicit & Inverse Functions" },
      { number: 4, title: "Contextual Applications of Differentiation" },
      { number: 5, title: "Analytical Applications of Differentiation" },
      { number: 6, title: "Integration & Accumulation of Change" },
      { number: 7, title: "Differential Equations" },
      { number: 8, title: "Applications of Integration" },
      { number: 9, title: "Parametric Equations, Polar Coordinates & Vector Functions" },
      { number: 10, title: "Infinite Sequences & Series" },
    ]),
  },
  {
    slug: "ap-statistics",
    title: "AP Statistics",
    shortTitle: "Stats",
    category: "math",
    subtitle: "Exploring data, probability, sampling distributions, and inference.",
    units: cedUnits("ap-statistics", [
      { number: 1, title: "Exploring One-Variable Data" },
      { number: 2, title: "Exploring Two-Variable Data" },
      { number: 3, title: "Collecting Data" },
      { number: 4, title: "Probability, Random Variables & Distributions" },
      { number: 5, title: "Sampling Distributions" },
      { number: 6, title: "Inference for Categorical Data: Proportions" },
      { number: 7, title: "Inference for Quantitative Data: Means" },
      { number: 8, title: "Inference for Categorical Data: Chi-Square" },
      { number: 9, title: "Inference for Quantitative Data: Slopes" },
    ]),
  },

  // ---------- SCIENCE ----------
  {
    slug: "ap-physics-1",
    title: "AP Physics 1",
    shortTitle: "Physics 1",
    category: "science",
    subtitle: "Algebra-based mechanics: kinematics, forces, energy, momentum.",
    units: cedUnits("ap-physics-1", [
      { number: 1, title: "Kinematics" },
      { number: 2, title: "Force & Translational Dynamics" },
      { number: 3, title: "Work, Energy & Power" },
      { number: 4, title: "Linear Momentum" },
      { number: 5, title: "Torque & Rotational Dynamics" },
      { number: 6, title: "Energy & Momentum of Rotating Systems" },
      { number: 7, title: "Oscillations" },
      { number: 8, title: "Fluids" },
    ]),
  },
  {
    slug: "ap-physics-2",
    title: "AP Physics 2",
    shortTitle: "Physics 2",
    category: "science",
    subtitle:
      "Algebra-based: thermodynamics, electricity, magnetism, optics, modern physics.",
    units: cedUnits("ap-physics-2", [
      { number: 1, title: "Thermodynamics" },
      { number: 2, title: "Electric Force, Field & Potential" },
      { number: 3, title: "Electric Circuits" },
      { number: 4, title: "Magnetism & Electromagnetic Induction" },
      { number: 5, title: "Geometric Optics" },
      { number: 6, title: "Waves, Sound & Physical Optics" },
      { number: 7, title: "Modern Physics" },
    ]),
  },
  {
    slug: "ap-physics-c-mech",
    title: "AP Physics C: Mechanics",
    shortTitle: "Physics C Mech",
    category: "science",
    subtitle: "Calculus-based mechanics for engineering and physics majors.",
    units: cedUnits("ap-physics-c-mech", [
      { number: 1, title: "Kinematics" },
      { number: 2, title: "Newton's Laws of Motion" },
      { number: 3, title: "Work, Energy & Power" },
      { number: 4, title: "Systems of Particles & Linear Momentum" },
      { number: 5, title: "Rotation" },
      { number: 6, title: "Oscillations" },
      { number: 7, title: "Gravitation" },
    ]),
  },
  {
    slug: "ap-physics-c-em",
    title: "AP Physics C: E&M",
    shortTitle: "Physics C E&M",
    category: "science",
    subtitle: "Calculus-based electricity and magnetism.",
    units: cedUnits("ap-physics-c-em", [
      { number: 1, title: "Electrostatics" },
      { number: 2, title: "Conductors, Capacitors & Dielectrics" },
      { number: 3, title: "Electric Circuits" },
      { number: 4, title: "Magnetic Fields" },
      { number: 5, title: "Electromagnetism" },
    ]),
  },
  {
    slug: "ap-biology",
    title: "AP Biology",
    shortTitle: "Bio",
    category: "science",
    subtitle: "Molecular biology, genetics, evolution, and ecology.",
    units: cedUnits("ap-biology", [
      { number: 1, title: "Chemistry of Life" },
      { number: 2, title: "Cell Structure & Function" },
      { number: 3, title: "Cellular Energetics" },
      { number: 4, title: "Cell Communication & the Cell Cycle" },
      { number: 5, title: "Heredity" },
      { number: 6, title: "Gene Expression & Regulation" },
      { number: 7, title: "Natural Selection" },
      { number: 8, title: "Ecology" },
    ]),
  },
  {
    slug: "ap-chemistry",
    title: "AP Chemistry",
    shortTitle: "Chem",
    category: "science",
    subtitle: "Atomic structure, bonding, reactions, kinetics, equilibrium, thermo.",
    units: cedUnits("ap-chemistry", [
      { number: 1, title: "Atomic Structure & Properties" },
      { number: 2, title: "Molecular & Ionic Compound Structure & Properties" },
      { number: 3, title: "Intermolecular Forces & Properties" },
      { number: 4, title: "Chemical Reactions" },
      { number: 5, title: "Kinetics" },
      { number: 6, title: "Thermodynamics" },
      { number: 7, title: "Equilibrium" },
      { number: 8, title: "Acids & Bases" },
      { number: 9, title: "Applications of Thermodynamics" },
    ]),
  },
  {
    slug: "ap-environmental",
    title: "AP Environmental Science",
    shortTitle: "APES",
    category: "science",
    subtitle: "Ecosystems, populations, pollution, climate, and sustainability.",
    units: cedUnits("ap-environmental", [
      { number: 1, title: "The Living World: Ecosystems" },
      { number: 2, title: "The Living World: Biodiversity" },
      { number: 3, title: "Populations" },
      { number: 4, title: "Earth Systems & Resources" },
      { number: 5, title: "Land & Water Use" },
      { number: 6, title: "Energy Resources & Consumption" },
      { number: 7, title: "Atmospheric Pollution" },
      { number: 8, title: "Aquatic & Terrestrial Pollution" },
      { number: 9, title: "Global Change" },
    ]),
  },

  // ---------- CS ----------
  {
    slug: "ap-cs-a",
    title: "AP Computer Science A",
    shortTitle: "CS A",
    category: "cs",
    subtitle: "Java programming: objects, control flow, arrays, inheritance, recursion.",
    units: cedUnits("ap-cs-a", [
      { number: 1, title: "Primitive Types" },
      { number: 2, title: "Using Objects" },
      { number: 3, title: "Boolean Expressions & if Statements" },
      { number: 4, title: "Iteration" },
      { number: 5, title: "Writing Classes" },
      { number: 6, title: "Array" },
      { number: 7, title: "ArrayList" },
      { number: 8, title: "2D Array" },
      { number: 9, title: "Inheritance" },
      { number: 10, title: "Recursion" },
    ]),
  },
  {
    slug: "ap-cs-principles",
    title: "AP Computer Science Principles",
    shortTitle: "CSP",
    category: "cs",
    subtitle: "Big ideas of computing: creativity, data, algorithms, networks, impact.",
    units: cedUnits("ap-cs-principles", [
      { number: 1, title: "Creative Development" },
      { number: 2, title: "Data" },
      { number: 3, title: "Algorithms & Programming" },
      { number: 4, title: "Computer Systems & Networks" },
      { number: 5, title: "Impact of Computing" },
    ]),
  },

  // ---------- HISTORY ----------
  {
    slug: "ap-us-history",
    title: "AP United States History",
    shortTitle: "APUSH",
    category: "history",
    subtitle: "United States history from 1491 to the present, organized by period.",
    units: cedUnits("ap-us-history", [
      { number: 1, title: "Period 1: 1491-1607" },
      { number: 2, title: "Period 2: 1607-1754" },
      { number: 3, title: "Period 3: 1754-1800" },
      { number: 4, title: "Period 4: 1800-1848" },
      { number: 5, title: "Period 5: 1844-1877" },
      { number: 6, title: "Period 6: 1865-1898" },
      { number: 7, title: "Period 7: 1890-1945" },
      { number: 8, title: "Period 8: 1945-1980" },
      { number: 9, title: "Period 9: 1980-Present" },
    ]),
  },
  {
    slug: "ap-world-history",
    title: "AP World History: Modern",
    shortTitle: "World History",
    category: "history",
    subtitle: "World history from c. 1200 CE to the present.",
    units: cedUnits("ap-world-history", [
      { number: 1, title: "The Global Tapestry (c. 1200-1450)" },
      { number: 2, title: "Networks of Exchange (c. 1200-1450)" },
      { number: 3, title: "Land-Based Empires (c. 1450-1750)" },
      { number: 4, title: "Transoceanic Interconnections (c. 1450-1750)" },
      { number: 5, title: "Revolutions (c. 1750-1900)" },
      { number: 6, title: "Consequences of Industrialization (c. 1750-1900)" },
      { number: 7, title: "Global Conflict (c. 1900-present)" },
      { number: 8, title: "Cold War & Decolonization (c. 1900-present)" },
      { number: 9, title: "Globalization (c. 1900-present)" },
    ]),
  },
  {
    slug: "ap-euro-history",
    title: "AP European History",
    shortTitle: "Euro",
    category: "history",
    subtitle: "European history from the Renaissance to the present.",
    units: cedUnits("ap-euro-history", [
      { number: 1, title: "Renaissance & Exploration" },
      { number: 2, title: "Age of Reformation" },
      { number: 3, title: "Absolutism & Constitutionalism" },
      { number: 4, title: "Scientific, Philosophical & Political Developments" },
      { number: 5, title: "Conflict, Crisis & Reaction in the Late 18th Century" },
      { number: 6, title: "Industrialization & Its Effects" },
      { number: 7, title: "19th-Century Perspectives & Political Developments" },
      { number: 8, title: "20th-Century Global Conflicts" },
      { number: 9, title: "Cold War & Contemporary Europe" },
    ]),
  },
];

export const CATEGORIES: { key: CourseCategory; label: string }[] = [
  { key: "math", label: "Math" },
  { key: "science", label: "Science" },
  { key: "cs", label: "Computer Science" },
  { key: "history", label: "History" },
];

export type UnitGroup = {
  number: number;
  title: string;
  lessons: Lesson[];
  /** CED topic breakdown inherited from the course definition, if any. */
  topics?: ApTopic[];
};

/** Returns lessons for a course, grouped by AP unit number.
 *  Always returns every official unit from the course definition, even if
 *  there are no lessons yet for that unit. Lessons whose membership points
 *  to a unit number not listed on the course will still appear. */
export function unitsForCourse(courseSlug: CourseSlug): UnitGroup[] {
  const course = getCourse(courseSlug);
  const groups = new Map<number, UnitGroup>();

  if (course) {
    for (const u of course.units) {
      groups.set(u.number, {
        number: u.number,
        title: u.title,
        lessons: [],
        topics: u.topics,
      });
    }
  }

  for (const lesson of LESSONS) {
    const membership = lesson.courses.find((c) => c.courseSlug === courseSlug);
    if (!membership) continue;
    let group = groups.get(membership.unitNumber);
    if (!group) {
      group = {
        number: membership.unitNumber,
        title: membership.unitTitle,
        lessons: [],
      };
      groups.set(membership.unitNumber, group);
    }
    group.lessons.push(lesson);
  }
  return [...groups.values()].sort((a, b) => a.number - b.number);
}

/** Returns the course object for a slug, or undefined. */
export function getCourse(slug: CourseSlug): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

// Normalize a problem string for matching against sampleProblem
export function normalizeProblem(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[\u201c\u201d]/g, '"')
    .trim();
}

export function findWalkthrough(problem: string): Lesson | null {
  const norm = normalizeProblem(problem);
  for (const l of LESSONS) {
    if (normalizeProblem(l.sampleProblem) === norm) return l;
  }
  return null;
}
