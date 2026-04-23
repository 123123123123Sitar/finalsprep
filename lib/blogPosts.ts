// Blog post content lives here as plain TypeScript rather than MDX so we
// can ship without an MDX toolchain and keep the article renderer tiny.
// Each post is a list of typed "sections" that the renderer in
// app/blog/[slug]/page.tsx walks over. If you need a new section type
// (quote, image, table, etc.), add it here and extend the renderer.
//
// SEO notes:
//  - `title` drives the <h1> and the <title> tag. Keep it under ~65 chars
//    so it doesn't get truncated in Google SERPs.
//  - `description` fuels both <meta name="description"> and OpenGraph.
//    Aim for 150-160 chars, lead with the primary keyword, include the
//    benefit ("complete review", "unit-by-unit", etc.).
//  - `keywords` gets joined into the meta keywords tag and rendered as
//    subtle topic chips on the article page.
//  - Never use emdashes in copy. Use regular hyphens, colons, or commas.

export type BlogSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; variant: "tip" | "note" | "warn"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "code"; text: string; language?: string }
  // `math` renders centered in a serif face; we keep the syntax plain
  // text rather than KaTeX so the blog doesn't depend on the math stack.
  | { type: "math"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  // The meta title used in the <title> tag. Falls back to `title` if not
  // specified. Override when the on-page H1 and the SERP title should
  // differ (usually to pack more keywords into the SERP title).
  metaTitle?: string;
  description: string;
  excerpt: string;
  // ISO date string (YYYY-MM-DD). Used for sorting, sitemap, <time>, and
  // the schema.org Article payload we inject on the post page.
  date: string;
  readTime: string;
  category: string;
  // SEO keywords. Also rendered as subtle topic chips on the post page.
  keywords: string[];
  author: string;
  content: BlogSection[];
  // Drives the two-section layout on the blog index. "general" posts
  // apply across subjects (study planning, exam-day prep, AI tutor
  // usage) and get the hero slot on the index page. "subject" posts
  // are the per-course review guides.
  type: "general" | "subject";
};

// Ordered newest-first when the list renders. The date field is the
// source of truth, but we keep the array in publication order anyway so
// the data file reads chronologically top to bottom.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ap-calculus-ab-review-guide",
    title: "AP Calculus AB Review Guide: Every Unit Explained",
    metaTitle:
      "AP Calculus AB Review Guide: Every Unit Explained (2026 Exam)",
    description:
      "A complete AP Calculus AB review guide covering all 8 units, exam format, key formulas, and study strategies for a 5. Unit-by-unit breakdown from limits to integration.",
    excerpt:
      "Everything you need to review for AP Calculus AB, organized unit by unit. Exam format, the skills that matter most, the traps the College Board reuses every year, and a study timeline that actually fits into your week.",
    date: "2026-04-10",
    readTime: "12 min read",
    category: "AP Calculus AB",
    keywords: [
      "AP Calculus AB",
      "AP Calc AB review",
      "AP Calculus AB study guide",
      "AP Calc AB units",
      "AP exam prep",
      "calculus review",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "Most AP Calculus AB review guides are 80 pages long, which is too many pages to read in the week before the exam. This one is shorter on purpose. Every unit on the College Board CED gets covered, along with the question types that actually show up on the test and the two or three mistakes readers dock you for every year.",
      },
      {
        type: "p",
        text: "If you are more than two weeks out, use this as a map. Read a unit section, work a few problems, and come back. If you are less than a week out, read the whole thing in one sitting and then grind practice FRQs. Either way works.",
      },
      { type: "h2", text: "What the AP Calculus AB exam looks like" },
      {
        type: "p",
        text: "The exam is 3 hours and 15 minutes. Section I is 45 multiple choice questions (1 hour 45 minutes, split into a no-calc part and a calc part). Section II is 6 free response questions (1 hour 30 minutes, also split). The two sections are weighted equally, so a strong MCQ performance can carry a weaker FRQ and vice versa.",
      },
      {
        type: "ul",
        items: [
          "Calculator allowed sections: use it for decimal answers, solving equations, numerical derivatives, and definite integrals.",
          "No-calculator sections: everything has to be exact. Simplify by hand.",
          "FRQs are scored on a 0-9 scale, but partial credit is generous if your setup is correct.",
          "The free response is where communication matters. Label variables, show units, and justify conclusions.",
        ],
      },
      { type: "h2", text: "Unit 1: Limits and Continuity" },
      {
        type: "p",
        text: "About 10 to 12 percent of the exam. Topics: limit definition, one-sided limits, limits at infinity, continuity, removable vs non-removable discontinuities, intermediate value theorem.",
      },
      {
        type: "p",
        text: "Skills to drill. Evaluate limits algebraically (factor, rationalize, L'Hopital in BC). Recognize and apply the squeeze theorem. Check continuity using the three-part definition. Apply IVT to prove a root exists.",
      },
      {
        type: "callout",
        variant: "warn",
        text: "The classic trap is forgetting that a limit existing does not require the function to be defined there. A hole in the graph is not a problem for the limit. A jump discontinuity is.",
      },
      { type: "h2", text: "Unit 2: Differentiation, Definition and Basic Rules" },
      {
        type: "p",
        text: "About 10 to 12 percent of the exam. Topics: limit definition of the derivative, power rule, product rule, quotient rule, derivatives of trig functions, derivatives of exponentials and logs.",
      },
      {
        type: "p",
        text: "Skills to drill. Take derivatives using the shortcut rules without writing the limit. Compute derivatives of sin, cos, tan, e to the x, and ln x by memory. Recognize when the product or quotient rule applies.",
      },
      { type: "h2", text: "Unit 3: Differentiation, Composite, Implicit, and Inverse" },
      {
        type: "p",
        text: "About 9 to 13 percent of the exam. Topics: chain rule, implicit differentiation, inverse function derivatives, derivatives of inverse trig.",
      },
      {
        type: "p",
        text: "Skills to drill. Chain rule on nested functions. Implicit differentiation, solving for dy dx. Use the inverse function theorem: if f and g are inverses, then g prime of y equals 1 over f prime of x.",
      },
      { type: "h2", text: "Unit 4: Contextual Applications of Differentiation" },
      {
        type: "p",
        text: "About 10 to 15 percent of the exam. Topics: related rates, linear approximation, L'Hopital (in AB, only indeterminate 0 over 0 or infinity over infinity), rate problems in context.",
      },
      {
        type: "p",
        text: "Related rates is the single most tested topic in Unit 4. Three-step framework: draw and label with variables, write the equation relating the variables, differentiate with respect to time and plug in.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Never plug in numerical values before differentiating in a related rates problem. You will lose the variable and the derivative becomes useless.",
      },
      { type: "h2", text: "Unit 5: Analytical Applications of Differentiation" },
      {
        type: "p",
        text: "About 15 to 18 percent of the exam. This is one of the two heaviest units. Topics: mean value theorem, extrema, increasing and decreasing intervals, concavity, inflection points, optimization, curve sketching.",
      },
      {
        type: "p",
        text: "Skills to drill. First derivative test for increasing and decreasing. Second derivative test for concavity. Find absolute extrema on a closed interval by checking critical points and endpoints. Set up an optimization problem and solve.",
      },
      { type: "h2", text: "Unit 6: Integration and Accumulation of Change" },
      {
        type: "p",
        text: "About 17 to 20 percent of the exam. The heaviest unit. Topics: Riemann sums, definite integrals, fundamental theorem of calculus, indefinite integrals, u-substitution, accumulation functions.",
      },
      {
        type: "p",
        text: "Skills to drill. Compute Riemann sums (left, right, midpoint, trapezoidal). Evaluate integrals using u-sub. Apply the fundamental theorem in both directions: the derivative of an accumulation function equals the integrand at that point.",
      },
      { type: "h2", text: "Unit 7: Differential Equations" },
      {
        type: "p",
        text: "About 6 to 12 percent of the exam. Topics: slope fields, separation of variables, exponential growth and decay models.",
      },
      {
        type: "p",
        text: "Skills to drill. Sketch a slope field from a dy dx expression. Separate variables and integrate. Solve initial value problems. Recognize exponential growth: dy dt equals k y gives y equals y0 e to the k t.",
      },
      { type: "h2", text: "Unit 8: Applications of Integration" },
      {
        type: "p",
        text: "About 10 to 15 percent of the exam. Topics: area between curves, volumes by cross section, volumes of revolution (disc and washer), average value of a function.",
      },
      {
        type: "p",
        text: "Skills to drill. Set up a definite integral for area between two curves (top minus bottom). Volumes by rotation: washer method uses pi times (R squared minus r squared) integrated over the axis. Average value equals one over (b minus a) times the integral from a to b.",
      },
      { type: "h2", text: "The skills that matter most on exam day" },
      {
        type: "ol",
        items: [
          "Clean derivative computation. You need to be fast and accurate.",
          "Setting up integrals correctly. Graders care about the setup more than the arithmetic.",
          "Communicating with units and context. A number without units loses a point on every FRQ.",
          "Justification. When a problem asks why, explain the theorem or rule you are using.",
        ],
      },
      { type: "h2", text: "Common mistakes across the course" },
      {
        type: "ul",
        items: [
          "Dropping negative signs on slopes of decreasing functions.",
          "Forgetting the constant of integration on indefinite integrals.",
          "Missing the chain rule on nested trig or exponential expressions.",
          "Not reading the question stem. The words 'find the minimum value' and 'find where the minimum occurs' are different questions.",
        ],
      },
      { type: "h2", text: "A 4-week study plan" },
      {
        type: "ol",
        items: [
          "Week 1: Units 1-3. Review limits, derivative rules, chain rule. 30 practice problems.",
          "Week 2: Units 4-5. Related rates, curve sketching, optimization. Two full released FRQs.",
          "Week 3: Units 6-8. Integration, differential equations, volumes. Mixed practice set.",
          "Week 4: Two full practice exams (timed). Error log your wrong answers. Re-drill your weak units.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "The FinalsPrep tutor walks through any Calc AB problem you paste in with a full step by step explanation, including the rule being used at each step. The free tier is enough daily tokens to get through most of a unit in one session.",
      },
      {
        type: "p",
        text: "Know the units, grind the FRQs, watch the signs. That is the whole test. You got this.",
      },
    ],
  },
  {
    slug: "ap-physics-1-review-guide",
    title: "AP Physics 1 Review Guide: Every Unit with Worked Examples",
    metaTitle: "AP Physics 1 Review Guide: All 8 Units Explained (2026)",
    description:
      "A complete AP Physics 1 review guide covering every unit, key formulas, free response strategies, and the concepts the exam tests every year. Practical, no-fluff prep.",
    excerpt:
      "A unit-by-unit review of AP Physics 1 with the equations that matter, the setups the exam reuses, and the conceptual ideas that separate a 3 from a 5. Works whether you are studying for a week or a month.",
    date: "2026-04-11",
    readTime: "12 min read",
    category: "AP Physics 1",
    keywords: [
      "AP Physics 1",
      "AP Physics 1 review",
      "AP Physics 1 study guide",
      "AP Physics 1 units",
      "physics review",
      "AP exam prep",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Physics 1 has a reputation for being brutal, but the exam actually tests a fairly small set of ideas. Once you can identify which of those ideas a problem is asking about, most questions turn into a setup problem rather than a physics problem.",
      },
      {
        type: "p",
        text: "This guide walks through every unit on the current CED, calls out what shows up on the exam most often, and lists the common wrong answers. Read it end to end, then practice until the setups feel automatic.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "3 hours total. Section I is 50 multiple choice questions in 90 minutes. Section II is 4 free response questions in 100 minutes, including an experimental design and a qualitative translation question (new format as of 2024-25). A calculator is allowed throughout.",
      },
      {
        type: "ul",
        items: [
          "The equation sheet is provided. You still need to know when to use each equation.",
          "FRQs reward clear reasoning and diagrams. Draw the free body diagram every single time.",
          "Many questions have multiple correct answers or multiple reasonable approaches. Justify your choice.",
        ],
      },
      { type: "h2", text: "Unit 1: Kinematics" },
      {
        type: "p",
        text: "Position, velocity, acceleration, and motion graphs. The foundation everything else builds on.",
      },
      {
        type: "p",
        text: "Skills to drill. Read and interpret position vs time and velocity vs time graphs. Use the big four kinematics equations. Projectile motion broken into independent x and y components.",
      },
      { type: "math", text: "v = v₀ + at    x = x₀ + v₀t + ½at²    v² = v₀² + 2a(x - x₀)" },
      { type: "h2", text: "Unit 2: Forces and Translational Dynamics" },
      {
        type: "p",
        text: "Newton's laws, friction, tension, normal force, and inclined planes. This is where careful free body diagrams earn you points.",
      },
      {
        type: "p",
        text: "Skills to drill. Draw the free body diagram with every force labeled and pointing in the correct direction. Break forces into components along and perpendicular to the surface. Apply Newton's second law along each axis.",
      },
      {
        type: "callout",
        variant: "warn",
        text: "The friction direction trips people up. Kinetic friction always opposes the direction of motion. Static friction opposes the direction the object would move if there were no friction.",
      },
      { type: "h2", text: "Unit 3: Work, Energy, and Power" },
      {
        type: "p",
        text: "Work-energy theorem, conservation of energy, kinetic and potential energy, springs, and power.",
      },
      {
        type: "p",
        text: "Skills to drill. Choose between energy methods and Newton's laws. If the problem asks for a speed or height, energy is almost always faster. Track where energy starts and where it ends and set them equal if no non-conservative forces act.",
      },
      { type: "math", text: "KE = ½mv²    PE_gravity = mgh    PE_spring = ½kx²    W = F·d·cos(θ)" },
      { type: "h2", text: "Unit 4: Linear Momentum" },
      {
        type: "p",
        text: "Impulse, momentum, conservation of momentum, elastic and inelastic collisions.",
      },
      {
        type: "p",
        text: "Skills to drill. Impulse equals change in momentum, which equals force times time. Conservation of momentum applies whenever there is no external force. Kinetic energy is only conserved in elastic collisions.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "If the exam gives you a graph of force vs time, the area under the curve is impulse. That is your first move, every time.",
      },
      { type: "h2", text: "Unit 5: Torque and Rotational Dynamics" },
      {
        type: "p",
        text: "Torque, moment of inertia, angular acceleration, rotational analog of Newton's second law.",
      },
      {
        type: "p",
        text: "Skills to drill. Tau equals I times alpha. Every translational formula has a rotational analog (mass becomes I, force becomes torque, acceleration becomes alpha). Find the moment arm by drawing a perpendicular from the axis to the line of force.",
      },
      { type: "h2", text: "Unit 6: Energy and Momentum of Rotating Systems" },
      {
        type: "p",
        text: "Rotational kinetic energy, conservation of angular momentum, rolling without slipping.",
      },
      {
        type: "p",
        text: "Skills to drill. Rotational KE equals one half I omega squared. Total KE of a rolling object is translational plus rotational. Angular momentum L equals I omega, conserved when no external torque acts.",
      },
      {
        type: "p",
        text: "The ice skater problem shows up often. She pulls her arms in, moment of inertia drops, so angular velocity rises to conserve L. The kinetic energy actually increases, because she does work pulling her arms in.",
      },
      { type: "h2", text: "Unit 7: Oscillations" },
      {
        type: "p",
        text: "Simple harmonic motion, springs, pendulums, period and frequency.",
      },
      {
        type: "p",
        text: "Skills to drill. For a mass on a spring, period equals 2 pi times sqrt of (m over k). For a pendulum, period equals 2 pi times sqrt of (L over g). Identify when a system exhibits SHM: the restoring force is proportional to displacement.",
      },
      { type: "h2", text: "Unit 8: Fluids" },
      {
        type: "p",
        text: "Pressure, buoyancy, Archimedes' principle, continuity equation, Bernoulli's equation.",
      },
      {
        type: "p",
        text: "Skills to drill. Pressure in a fluid equals rho g h plus atmospheric pressure. Buoyant force equals the weight of displaced fluid. Continuity: A1 v1 equals A2 v2. Bernoulli relates pressure, elevation, and speed in a flowing fluid.",
      },
      { type: "h2", text: "The conceptual patterns the exam reuses" },
      {
        type: "ul",
        items: [
          "Block on an incline with friction.",
          "Two masses connected by a string over a pulley.",
          "Projectile launched at angle from a cliff.",
          "Spring launches a block (or the reverse).",
          "Ballistic pendulum or collision followed by swing.",
          "Rolling object on a ramp (compare solid sphere, hollow sphere, disc, ring).",
        ],
      },
      {
        type: "p",
        text: "If you can walk into the exam having solved two or three versions of each of those setups, you are in excellent shape. The numbers change. The approach does not.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ol",
        items: [
          "Confusing force of gravity (mg) with the normal force on an incline (mg cos theta).",
          "Forgetting to include both translational and rotational kinetic energy for rolling objects.",
          "Using energy methods when the problem has friction and not accounting for the work done by friction.",
          "Not specifying the direction of a vector in the final answer.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "If you paste a physics problem into FinalsPrep, the tutor draws the free body diagram for you and walks through the Newton's law or energy equations step by step. Free tier covers the full CED.",
      },
      {
        type: "p",
        text: "Draw the diagram. Write the equation. Track the signs. Units at the end. That is AP Physics 1.",
      },
    ],
  },
  {
    slug: "ap-calculus-bc-review-guide",
    title: "AP Calculus BC Review Guide: Every Unit from Limits to Series",
    metaTitle: "AP Calculus BC Review Guide: All 10 Units (2026 Exam)",
    description:
      "A complete AP Calculus BC review guide covering all 10 units including parametric, polar, vector-valued functions, and series convergence. Practical strategies for a 5.",
    excerpt:
      "AP Calculus BC covers everything in AB plus two extra units of parametric, polar, and series. Here is the unit-by-unit breakdown, plus the two BC-only skills that earn you the most points.",
    date: "2026-04-12",
    readTime: "10 min read",
    category: "AP Calculus BC",
    keywords: [
      "AP Calculus BC",
      "AP Calc BC review",
      "AP Calculus BC study guide",
      "series convergence",
      "parametric equations",
      "Taylor series",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Calculus BC is AP Calculus AB plus two more units. If you are solid on AB, you are already 75 percent of the way to a 5 on BC. The additional material is not harder than the AB content, it is just different, and the questions tend to follow predictable patterns.",
      },
      {
        type: "p",
        text: "This guide walks through all ten units of the BC CED, with extra attention on the two that are unique to BC: parametric, polar, and vector-valued functions, and infinite sequences and series.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "Same format as AB: 3 hours 15 minutes, 45 MCQs, 6 FRQs, split into calc-allowed and no-calc sections. BC students also get an AB subscore, which many colleges accept even if you do not get a 5 on BC itself.",
      },
      { type: "h2", text: "Units 1 through 8: the AB content" },
      {
        type: "p",
        text: "Limits, differentiation rules, chain and implicit, applications of derivatives, integration, differential equations, applications of integration. These are all covered in our AP Calculus AB review guide. BC tests them at slightly deeper levels, especially integration by parts, integration of more exotic functions, and improper integrals.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "BC-only integration techniques: integration by parts, partial fractions (simple cases), and improper integrals. These show up on both the MCQ and the FRQ. Drill them hard.",
      },
      { type: "h2", text: "Unit 9: Parametric Equations, Polar, and Vector-Valued Functions" },
      {
        type: "p",
        text: "About 11 to 12 percent of the exam. This is where BC starts to feel different from AB.",
      },
      {
        type: "p",
        text: "Parametric skills. Convert between parametric and cartesian. Find dy dx from parametric using (dy dt) divided by (dx dt). Arc length for a parametric curve is the integral of sqrt of ((dx dt) squared plus (dy dt) squared) dt.",
      },
      {
        type: "p",
        text: "Polar skills. Convert between polar and cartesian (x equals r cos theta, y equals r sin theta). Area inside a polar curve is one half the integral of r squared d theta. Find tangent lines using dy dx in polar form.",
      },
      {
        type: "p",
        text: "Vector-valued skills. A vector function r(t) has components x(t) and y(t). Velocity is the derivative, speed is the magnitude of the velocity vector. Acceleration is the second derivative.",
      },
      { type: "h2", text: "Unit 10: Infinite Sequences and Series" },
      {
        type: "p",
        text: "About 17 to 18 percent of the exam. The largest unit on BC, and the reason BC students who wing it do not get 5s.",
      },
      {
        type: "p",
        text: "The convergence tests you need to know cold. Nth term test, geometric series test, integral test, p-series, comparison test, limit comparison test, alternating series test, ratio test.",
      },
      {
        type: "p",
        text: "Decision tree. If the terms do not approach zero, the series diverges (nth term test). If it is a geometric or p-series, you already know. If it alternates, try alternating series. If there are factorials or powers of n, try ratio. Otherwise compare or integrate.",
      },
      { type: "h2", text: "Taylor and Maclaurin series" },
      {
        type: "p",
        text: "The other half of Unit 10. Memorize these four:",
      },
      { type: "math", text: "eˣ = 1 + x + x²/2! + x³/3! + ..." },
      { type: "math", text: "sin(x) = x - x³/3! + x⁵/5! - ..." },
      { type: "math", text: "cos(x) = 1 - x²/2! + x⁴/4! - ..." },
      { type: "math", text: "1/(1-x) = 1 + x + x² + x³ + ... for |x| < 1" },
      {
        type: "p",
        text: "From these four, you can derive almost any other Taylor series you need by substitution, differentiation, or integration. The exam loves questions like 'find the Taylor series of x times cos of x cubed.' Substitute x cubed into cos, then multiply by x.",
      },
      {
        type: "p",
        text: "Radius and interval of convergence. Use the ratio test. The ratio limit strictly less than one defines the radius. Then check the endpoints separately because the ratio test is inconclusive at r equals 1.",
      },
      {
        type: "callout",
        variant: "warn",
        text: "On the FRQ, interval of convergence questions always want you to check the endpoints. You lose the point if you skip that step, even if your radius is correct.",
      },
      { type: "h2", text: "The BC-only skills that earn the most points" },
      {
        type: "ol",
        items: [
          "Integration by parts with the LIATE or tabular method.",
          "Partial fractions for rational functions.",
          "Improper integrals: set up as a limit, evaluate, decide if it converges.",
          "Picking the right convergence test in under 10 seconds.",
          "Building a Taylor series by substituting into one of the four above.",
          "Arc length in both cartesian and parametric form.",
          "Polar area between two curves.",
        ],
      },
      { type: "h2", text: "A 4-week BC study plan" },
      {
        type: "ol",
        items: [
          "Week 1: Review AB units 1-4. Make sure derivatives are automatic.",
          "Week 2: Review AB units 5-8, with extra focus on integration techniques (parts, partial fractions).",
          "Week 3: Unit 9 (parametric, polar, vector) and Unit 10 series first half (convergence tests).",
          "Week 4: Unit 10 second half (Taylor series) and two timed practice exams.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Treating radius of convergence as the interval. Check the endpoints.",
          "Forgetting to use the ratio of component derivatives for parametric dy dx.",
          "Integrating r squared without the one half for polar area.",
          "Mixing up when a series converges absolutely vs conditionally.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "The FinalsPrep tutor has the BC-specific series decision tree built in. Paste a series and it tells you which test to try first based on the shape of the general term. Free tier covers the unit.",
      },
      {
        type: "p",
        text: "BC rewards students who can set up. Nobody cares about the last line of arithmetic. The graders care whether you picked the right tool. Pick the right tool.",
      },
    ],
  },
  {
    slug: "ap-statistics-review-guide",
    title: "AP Statistics Review Guide: Every Unit with FRQ Strategies",
    metaTitle: "AP Statistics Review Guide: All 9 Units (2026 Exam Prep)",
    description:
      "A complete AP Statistics review guide covering all 9 units, inference procedures, FRQ rubric strategies, and the formulas the exam actually tests. Everything you need for a 5.",
    excerpt:
      "AP Statistics is less about math and more about communication. This unit-by-unit guide covers every inference procedure, the four-part FRQ format graders look for, and the conceptual traps that catch smart students.",
    date: "2026-04-13",
    readTime: "10 min read",
    category: "AP Statistics",
    keywords: [
      "AP Statistics",
      "AP Stats review",
      "AP Statistics study guide",
      "confidence intervals",
      "hypothesis testing",
      "AP Stats FRQ",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Statistics is the AP exam where the math is the easy part and the vocabulary is where students lose points. Readers are looking for specific language in specific places. If you know the four-part template for every inference question and the three conditions to check, the exam turns into a fill-in-the-blanks exercise.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "3 hours. Section I is 40 multiple choice in 90 minutes. Section II is 6 free response in 90 minutes, one of which is the investigative task (worth about twice as much as a regular FRQ). Calculator allowed throughout, formula sheet provided.",
      },
      { type: "h2", text: "Unit 1: Exploring One-Variable Data" },
      {
        type: "p",
        text: "Roughly 15 to 23 percent of the exam, combined with Unit 2. Topics: distributions, center and spread, outliers, boxplots, histograms, z-scores, normal distribution.",
      },
      {
        type: "p",
        text: "Skills. Describe a distribution using SOCS (shape, outliers, center, spread) in context. Compute z-scores and use the empirical rule (68, 95, 99.7). Identify outliers using the 1.5 IQR rule.",
      },
      { type: "h2", text: "Unit 2: Exploring Two-Variable Data" },
      {
        type: "p",
        text: "Topics: scatterplots, correlation, linear regression, residuals, influential points, coefficient of determination.",
      },
      {
        type: "p",
        text: "Skills. Compute and interpret r and r-squared. Identify linearity from residual plots (no pattern means linear). Interpret slope and intercept in context. Distinguish correlation from causation in your written answer.",
      },
      { type: "h2", text: "Unit 3: Collecting Data" },
      {
        type: "p",
        text: "Roughly 12 to 15 percent. Topics: sampling methods (SRS, stratified, cluster, systematic), experimental design (control, randomization, replication, blinding), observational studies, bias.",
      },
      {
        type: "p",
        text: "Skills. Distinguish an experiment from an observational study (you need random assignment for causation). Identify sources of bias (nonresponse, undercoverage, response bias). Explain why randomization matters.",
      },
      { type: "h2", text: "Unit 4: Probability, Random Variables, and Probability Distributions" },
      {
        type: "p",
        text: "Roughly 10 to 20 percent. Topics: probability rules, conditional probability, independence, expected value, variance, binomial and geometric distributions.",
      },
      {
        type: "p",
        text: "Skills. Apply the addition and multiplication rules. Compute expected value as a weighted sum. Recognize a binomial situation (fixed n, two outcomes, independent, constant p). Geometric: trials until the first success.",
      },
      { type: "h2", text: "Unit 5: Sampling Distributions" },
      {
        type: "p",
        text: "Topics: sampling distribution of the mean, sampling distribution of the proportion, central limit theorem.",
      },
      {
        type: "p",
        text: "Skills. Standard error of a sample mean equals sigma over sqrt of n. Standard error of a sample proportion equals sqrt of (p(1 minus p) over n). Central limit theorem: if n is large enough, the sampling distribution of the mean is approximately normal regardless of the population shape.",
      },
      { type: "h2", text: "Unit 6: Inference for Categorical Data, Proportions" },
      {
        type: "p",
        text: "Roughly 12 to 15 percent. Topics: one-sample z-interval for a proportion, two-sample z-interval and z-test, one-sample z-test for a proportion.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Condition check for proportions. Random (stated or assumed). Independent (10 percent rule). Normal (both n p hat and n (1 minus p hat) at least 10).",
      },
      { type: "h2", text: "Unit 7: Inference for Quantitative Data, Means" },
      {
        type: "p",
        text: "Roughly 10 to 18 percent. Topics: one-sample t-interval and t-test, two-sample t-interval and t-test, matched pairs.",
      },
      {
        type: "p",
        text: "Same four-part template: name the procedure, check conditions, compute, interpret in context. For means, the normal condition is either 'population is normal' or 'n greater than 30' (CLT).",
      },
      { type: "h2", text: "Unit 8: Inference for Categorical Data, Chi-Square" },
      {
        type: "p",
        text: "Three types: goodness of fit (one sample compared to expected), independence (one sample, two variables), homogeneity (multiple samples compared).",
      },
      {
        type: "p",
        text: "Skills. Compute expected counts. Chi-square statistic is the sum of (observed minus expected) squared over expected. Degrees of freedom depend on the test type.",
      },
      { type: "h2", text: "Unit 9: Inference for Quantitative Data, Slopes" },
      {
        type: "p",
        text: "Topics: inference for the slope of a regression line, confidence interval for slope, t-test for slope.",
      },
      {
        type: "p",
        text: "Skills. The slope has a standard error provided on the computer output. The test statistic is t equals (b minus 0) over SE of b. Degrees of freedom is n minus 2.",
      },
      { type: "h2", text: "The four-part FRQ template" },
      {
        type: "ol",
        items: [
          "Name the procedure in full: one-sample t-interval for the true mean, two-proportion z-test for the difference in proportions, etc.",
          "State and check the conditions. Quote the problem for random. Check 10 percent. Check normal.",
          "Compute. Show the formula with numbers substituted, then the interval or test statistic and p-value.",
          "Interpret in context. Use the words 'we are 95 percent confident' or 'there is convincing evidence at the alpha equals 0.05 level that.'",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        text: "Do not say there is a 95 percent chance the true parameter is in the interval. The parameter is fixed. The interval is random. Use the word 'confident', not 'probability'.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Skipping the condition check. That is always worth a point, sometimes two.",
          "Using a z-test when you should use a t-test (t when sigma is unknown, which is almost always).",
          "Writing 'the data' when the question is about the population.",
          "Confusing Type I and Type II errors. Type I: reject H0 when it is true. Type II: fail to reject H0 when it is false.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep has the full four-part template for every inference procedure built into its Stats walkthroughs. Paste a problem and it will coach you through the format, not just the math. Free tier covers the full course.",
      },
      {
        type: "p",
        text: "Stats is about communication. If you can name the procedure, check the conditions, do the arithmetic, and write an interpretation in context, you are a 5.",
      },
    ],
  },
  {
    slug: "ap-chemistry-review-guide",
    title: "AP Chemistry Review Guide: Every Unit with Key Formulas",
    metaTitle: "AP Chemistry Review Guide: All 9 Units (2026 Exam)",
    description:
      "A complete AP Chemistry review guide covering all 9 units, key formulas, lab scenarios, and the conceptual threads that connect the course. Built for a 5 on the 2026 exam.",
    excerpt:
      "Every AP Chemistry unit boils down to a handful of core ideas and a few recurring problem types. Here is the full course broken down, with the formulas, setups, and conceptual links the exam tests every year.",
    date: "2026-04-14",
    readTime: "12 min read",
    category: "AP Chemistry",
    keywords: [
      "AP Chemistry",
      "AP Chem review",
      "AP Chemistry study guide",
      "equilibrium",
      "thermodynamics",
      "AP Chem formulas",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Chemistry has a reputation for being dense, and it is, but the course really only tests five or six big ideas and a predictable set of lab scenarios. This guide walks through every unit on the current CED, maps the big ideas across units, and calls out the reusable problem types.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "3 hours 15 minutes. Section I is 60 multiple choice in 90 minutes. Section II is 7 free response (3 long, 4 short) in 105 minutes. Calculator and formula sheet allowed in both sections.",
      },
      { type: "h2", text: "Unit 1: Atomic Structure and Properties" },
      {
        type: "p",
        text: "Topics: moles, isotopes, mass spectrometry, photoelectron spectroscopy (PES), electron configuration, periodic trends.",
      },
      {
        type: "p",
        text: "Skills. Read a PES graph and identify the element. Predict trends in ionization energy, atomic radius, and electronegativity. Do stoichiometry with moles.",
      },
      { type: "h2", text: "Unit 2: Molecular and Ionic Compound Structure and Properties" },
      {
        type: "p",
        text: "Topics: ionic vs covalent bonding, Lewis structures, VSEPR geometry, bond polarity, resonance, formal charge.",
      },
      {
        type: "p",
        text: "Skills. Draw Lewis structures for molecules with up to ~20 electrons. Predict geometry (tetrahedral, trigonal planar, bent, etc.). Determine whether a molecule is polar overall by summing bond dipoles.",
      },
      { type: "h2", text: "Unit 3: Intermolecular Forces and Properties" },
      {
        type: "p",
        text: "Topics: IMFs (London, dipole-dipole, hydrogen bonding), solids, liquids, gases, ideal gas law, solutions, colligative properties, Beer's law.",
      },
      {
        type: "p",
        text: "Skills. Rank IMFs in strength: hydrogen bonding > dipole-dipole > London dispersion. Use PV equals nRT. Read a Beer's law calibration curve to find concentration.",
      },
      { type: "h2", text: "Unit 4: Chemical Reactions" },
      {
        type: "p",
        text: "Topics: balancing, net ionic equations, types of reactions (precipitation, acid-base, redox), titrations introduction.",
      },
      {
        type: "p",
        text: "Skills. Balance equations. Write net ionic equations (eliminate spectator ions). Identify reaction type from the reactants.",
      },
      { type: "h2", text: "Unit 5: Kinetics" },
      {
        type: "p",
        text: "Topics: rate laws, reaction orders, integrated rate laws, Arrhenius equation, catalysts, reaction mechanisms.",
      },
      {
        type: "p",
        text: "Skills. Determine rate law from initial rates data. Recognize zero, first, and second order graphs. Match a proposed mechanism to the observed rate law (rate is determined by the slow step).",
      },
      {
        type: "callout",
        variant: "tip",
        text: "When given concentration vs time data, try plotting it three ways: concentration (zero order), ln concentration (first order), and 1 over concentration (second order). The one that gives a straight line wins.",
      },
      { type: "h2", text: "Unit 6: Thermodynamics" },
      {
        type: "p",
        text: "Topics: enthalpy, Hess's law, calorimetry, entropy, Gibbs free energy.",
      },
      {
        type: "p",
        text: "Skills. Calculate delta H using bond energies or Hess's law. Use q equals m c delta T for calorimetry. Predict spontaneity from the sign of delta G: negative means spontaneous.",
      },
      { type: "math", text: "ΔG = ΔH - TΔS" },
      { type: "h2", text: "Unit 7: Equilibrium" },
      {
        type: "p",
        text: "Topics: Kc and Kp, Q vs K to predict direction, ICE tables, Le Chatelier's principle, Ksp for solubility.",
      },
      {
        type: "p",
        text: "Skills. Write K expressions (pure solids and liquids excluded). Set up ICE tables. Apply Le Chatelier to predict which way a stressed equilibrium shifts.",
      },
      { type: "h2", text: "Unit 8: Acids and Bases" },
      {
        type: "p",
        text: "Topics: strong vs weak acids, pH, Ka and Kb, buffers, titration curves.",
      },
      {
        type: "p",
        text: "Skills. pH of strong acid equals negative log of concentration. Weak acid pH from Ka using the small-x approximation. Buffer pH with Henderson-Hasselbalch. Read titration curves to identify equivalence and half-equivalence points.",
      },
      { type: "math", text: "pH = pKa + log([A⁻]/[HA])" },
      { type: "h2", text: "Unit 9: Applications of Thermodynamics" },
      {
        type: "p",
        text: "Topics: connection between K and delta G, electrochemistry, galvanic and electrolytic cells, electrolysis, Nernst equation qualitatively.",
      },
      {
        type: "p",
        text: "Skills. Relate delta G to equilibrium: delta G equals negative R T ln K. For electrochemistry, higher reduction potential wins the electrons. Galvanic cells have positive E cell and negative delta G.",
      },
      { type: "h2", text: "How the units connect" },
      {
        type: "ul",
        items: [
          "IMFs (Unit 3) show up again in solubility (Unit 7) and vapor pressure.",
          "Kinetics (Unit 5) explains why reactions happen fast, thermodynamics (Unit 6) explains whether they happen.",
          "Equilibrium (Unit 7) is the same math as acid-base (Unit 8) and Ksp, just with different K values.",
          "Thermodynamics (Unit 6 and 9) ties to electrochemistry through delta G and E cell.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ol",
        items: [
          "Including pure solids or liquids in equilibrium expressions.",
          "Forgetting to check the small-x approximation in weak acid problems.",
          "Confusing delta H and delta G. Enthalpy is heat. Gibbs determines spontaneity.",
          "Mixing up anode and cathode. Oxidation at anode, reduction at cathode (OAR CRC mnemonic, or 'an ox and a red cat').",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "The FinalsPrep tutor builds ICE tables and Lewis structures with you step by step, so you see the reasoning rather than just the answer. Covers the full AP Chem CED on the free tier.",
      },
      {
        type: "p",
        text: "Ace this course by internalizing the big ideas, not by memorizing every reaction. The formulas are on the sheet. The thinking is what they are testing.",
      },
    ],
  },
  {
    slug: "ap-biology-review-guide",
    title: "AP Biology Review Guide: All 8 Units Simplified",
    metaTitle: "AP Biology Review Guide: All 8 Units Explained (2026)",
    description:
      "A complete AP Biology review guide covering all 8 units, key experiments, FRQ patterns, and the four big ideas that unify the course. Practical prep for the 2026 exam.",
    excerpt:
      "AP Biology is massive on paper but built around four big ideas that repeat throughout the course. Here is the unit-by-unit review, with the experiments and FRQ patterns the exam keeps coming back to.",
    date: "2026-04-15",
    readTime: "10 min read",
    category: "AP Biology",
    keywords: [
      "AP Biology",
      "AP Bio review",
      "AP Biology study guide",
      "cellular respiration",
      "heredity",
      "AP Bio FRQ",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Biology has more content than any AP science, and the exam tests connections between topics rather than isolated facts. If you understand the four big ideas (evolution, energy transfer, information transmission, system interactions) and how each unit illustrates them, you can answer questions on material you do not fully remember.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "3 hours. Section I is 60 multiple choice in 90 minutes. Section II is 6 free response in 90 minutes: 2 long FRQs (one of which is interpreting data), and 4 short FRQs. Calculator allowed (formula sheet included).",
      },
      { type: "h2", text: "Unit 1: Chemistry of Life" },
      {
        type: "p",
        text: "Topics: water properties, organic molecules (carbs, lipids, proteins, nucleic acids), enzyme structure and function.",
      },
      {
        type: "p",
        text: "Skills. Connect water's polarity to its properties (cohesion, high specific heat). Identify macromolecules by their monomers. Explain how enzymes lower activation energy, how temperature and pH affect them, and what inhibitors do.",
      },
      { type: "h2", text: "Unit 2: Cell Structure and Function" },
      {
        type: "p",
        text: "Topics: prokaryotic vs eukaryotic cells, organelles, membrane structure, transport across membranes, tonicity.",
      },
      {
        type: "p",
        text: "Skills. Match organelles to functions. Recognize passive vs active transport. Predict cell behavior in hypertonic, hypotonic, or isotonic solutions.",
      },
      { type: "h2", text: "Unit 3: Cellular Energetics" },
      {
        type: "p",
        text: "Topics: enzymes in more depth, photosynthesis, cellular respiration, fermentation.",
      },
      {
        type: "p",
        text: "Skills. Photosynthesis: light reactions make ATP and NADPH, Calvin cycle uses them to fix CO2 into sugar. Respiration: glycolysis, pyruvate oxidation, Krebs cycle, electron transport chain. Chemiosmotic theory: both pathways use proton gradients to make ATP.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "The overall respiration and photosynthesis reactions are mirror images of each other. If you can write one, you can write the other in reverse.",
      },
      { type: "h2", text: "Unit 4: Cell Communication and Cell Cycle" },
      {
        type: "p",
        text: "Topics: cell signaling (reception, transduction, response), mitosis, meiosis, regulation of the cell cycle, apoptosis, cancer.",
      },
      {
        type: "p",
        text: "Skills. Trace a signal from ligand to response. Distinguish mitosis (produces two identical diploid cells) from meiosis (produces four genetically distinct haploid cells). Explain how checkpoint failure leads to cancer.",
      },
      { type: "h2", text: "Unit 5: Heredity" },
      {
        type: "p",
        text: "Topics: Mendelian inheritance, non-Mendelian patterns (incomplete dominance, codominance, sex-linked, polygenic), pedigrees, chi-square analysis.",
      },
      {
        type: "p",
        text: "Skills. Predict ratios from Punnett squares. Read a pedigree to determine inheritance mode. Use chi-square to test if observed ratios match expected.",
      },
      { type: "h2", text: "Unit 6: Gene Expression and Regulation" },
      {
        type: "p",
        text: "Topics: DNA replication, transcription, translation, operons (lac and trp), gene regulation in eukaryotes, mutations, biotechnology.",
      },
      {
        type: "p",
        text: "Skills. Trace the central dogma: DNA to RNA to protein. Explain lac operon as an inducible system, trp as repressible. Recognize how mutations affect protein function.",
      },
      { type: "h2", text: "Unit 7: Natural Selection" },
      {
        type: "p",
        text: "Topics: Darwin, evidence for evolution, Hardy-Weinberg equilibrium, speciation, phylogenetics.",
      },
      {
        type: "p",
        text: "Skills. Hardy-Weinberg: p squared plus 2 p q plus q squared equals 1. Use it to calculate allele frequencies under equilibrium. The five assumptions: no mutation, random mating, no selection, no migration, large population.",
      },
      { type: "h2", text: "Unit 8: Ecology" },
      {
        type: "p",
        text: "Topics: population ecology, community interactions, ecosystems, biogeochemical cycles, effects of disruption.",
      },
      {
        type: "p",
        text: "Skills. Distinguish exponential vs logistic growth. Compute population growth rate from births and deaths. Identify trophic levels. Recognize human effects on carbon, nitrogen, and water cycles.",
      },
      { type: "h2", text: "The four big ideas" },
      {
        type: "ul",
        items: [
          "Evolution: the process of life. Drives everything else.",
          "Energy and matter transfer: cells, organisms, and ecosystems all process energy and matter.",
          "Information storage and transmission: DNA, genes, signaling, nervous systems.",
          "System interactions: molecules interact to make cells, cells make tissues, tissues make organisms, organisms make ecosystems.",
        ],
      },
      {
        type: "p",
        text: "Every FRQ can be connected back to at least one of these. When you get stuck, ask yourself which big idea is being tested and work from there.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ol",
        items: [
          "Confusing mitosis and meiosis. Mitosis makes identical cells. Meiosis makes gametes with crossing over.",
          "Forgetting that enzymes do not change delta G of a reaction, only the activation energy.",
          "Mixing up inducible (lac, turns on when lactose present) and repressible (trp, turns off when tryptophan present).",
          "Writing 'survival of the fittest' as if individual organisms evolve. Populations evolve. Individuals do not.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can generate Bio FRQ-style questions with novel experimental setups and walk through the data interpretation with you. Free tier is enough for the full course.",
      },
      {
        type: "p",
        text: "Bio rewards pattern recognition over memorization. Learn the patterns and the course shrinks to something manageable.",
      },
    ],
  },
  {
    slug: "ap-us-history-review-guide",
    title: "AP US History Review Guide: Every Period from 1491 to Today",
    metaTitle: "AP US History Review Guide: All 9 Periods (APUSH 2026)",
    description:
      "A complete AP US History review guide covering all 9 periods, the DBQ rubric, LEQ strategies, and the themes that connect American history. Built for a 5 on the 2026 APUSH exam.",
    excerpt:
      "APUSH covers 500 years of American history, but the exam tests the same themes over and over. Here is the period-by-period review, plus the DBQ and LEQ rubric strategies that actually earn the points.",
    date: "2026-04-16",
    readTime: "10 min read",
    category: "AP US History",
    keywords: [
      "APUSH",
      "AP US History",
      "APUSH review",
      "AP US History study guide",
      "DBQ rubric",
      "LEQ strategies",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "APUSH has so much content that students sometimes give up and decide to cram primary sources instead of learning the arc. Do not do that. The exam tests your ability to trace themes across periods. If you know how each period connects to the next, the facts hang on that frame.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "3 hours 15 minutes. Section I Part A: 55 multiple choice in 55 minutes. Section I Part B: 3 short answer in 40 minutes. Section II Part A: DBQ in 60 minutes (15 reading, 45 writing). Section II Part B: LEQ in 40 minutes. DBQ is worth 25 percent of the total, LEQ 15 percent, MCQ 40 percent, SAQ 20 percent.",
      },
      { type: "h2", text: "The seven themes that tie it together" },
      {
        type: "ul",
        items: [
          "American and National Identity (NAT)",
          "Work, Exchange, and Technology (WXT)",
          "Geography and the Environment (GEO)",
          "Migration and Settlement (MIG)",
          "Politics and Power (PCE)",
          "America in the World (WOR)",
          "American and Regional Culture (ARC)",
          "Social Structures (SOC)",
        ],
      },
      { type: "h2", text: "Period 1: 1491 to 1607" },
      {
        type: "p",
        text: "Pre-contact Americas, Columbian Exchange, early Spanish colonization. Key idea: contact between Europeans, Africans, and Native Americans reshaped all three. Diseases, crops, animals, and people moved across the Atlantic.",
      },
      { type: "h2", text: "Period 2: 1607 to 1754" },
      {
        type: "p",
        text: "British colonization, colonial regions (New England, Middle, Chesapeake, Lower South), Atlantic slave trade, mercantilism, early democratic practices. Key idea: distinct colonial regions developed different economies and societies based on geography.",
      },
      { type: "h2", text: "Period 3: 1754 to 1800" },
      {
        type: "p",
        text: "French and Indian War, American Revolution, Articles of Confederation, Constitution, early presidencies. Key idea: the colonies fought a war to separate from Britain and then spent a decade figuring out how to govern themselves.",
      },
      { type: "h2", text: "Period 4: 1800 to 1848" },
      {
        type: "p",
        text: "Jeffersonian democracy, Louisiana Purchase, War of 1812, Era of Good Feelings, Jacksonian democracy, market revolution, Second Great Awakening, reform movements (abolition, women's rights, temperance). Key idea: the country expanded west while reform movements tried to reshape society.",
      },
      { type: "h2", text: "Period 5: 1844 to 1877" },
      {
        type: "p",
        text: "Manifest Destiny, Mexican-American War, sectional conflict, Civil War, Reconstruction. Key idea: the conflict over slavery and state vs federal power exploded into civil war, and Reconstruction attempted to rebuild the South on new terms.",
      },
      { type: "h2", text: "Period 6: 1865 to 1898" },
      {
        type: "p",
        text: "Industrialization, Gilded Age, urbanization, immigration, labor movements, Populism, westward expansion and its cost to Native Americans. Key idea: rapid industrial growth created enormous wealth and equally enormous inequality.",
      },
      { type: "h2", text: "Period 7: 1890 to 1945" },
      {
        type: "p",
        text: "Progressive Era, Spanish-American War, WWI, Roaring Twenties, Great Depression, New Deal, WWII. Key idea: the federal government expanded dramatically, and America moved from isolation to global superpower.",
      },
      { type: "h2", text: "Period 8: 1945 to 1980" },
      {
        type: "p",
        text: "Cold War, containment, McCarthyism, civil rights movement, Vietnam, counterculture, feminism, Nixon and Watergate. Key idea: domestic and foreign policy intertwined as America fought communism abroad and inequality at home.",
      },
      { type: "h2", text: "Period 9: 1980 to Present" },
      {
        type: "p",
        text: "Reagan Revolution, end of Cold War, globalization, rise of conservatism, digital revolution, 9/11 and the War on Terror, 2008 recession, polarization. Key idea: the political consensus that formed after WWII broke down.",
      },
      { type: "h2", text: "DBQ rubric (7 points)" },
      {
        type: "ol",
        items: [
          "Thesis (1 point): defensible claim responding to the prompt with a line of reasoning.",
          "Contextualization (1 point): broader historical context, typically a generation before or after.",
          "Evidence from 3 documents (1 point).",
          "Evidence from 6 documents (1 point).",
          "Evidence beyond the documents (1 point): one specific fact not in the documents.",
          "Document analysis, HIPP on 3 documents (1 point).",
          "Complexity (1 point): show nuance, counterargument, or change over time.",
        ],
      },
      { type: "h2", text: "LEQ rubric (6 points)" },
      {
        type: "p",
        text: "Thesis (1), contextualization (1), evidence (2), analysis and reasoning (2, including complexity). The LEQ rewards going deeper rather than wider. Pick the option you know best and write densely.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Complexity is the hardest point on both essays. Plan for it. Close your essay with a paragraph that explicitly compares across time periods, offers a counterargument, or shows change vs continuity.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Writing a chronology instead of an argument. The essay is not a timeline.",
          "Listing documents without tying them to a claim.",
          "Naming HIPP without explaining why it matters.",
          "Using outside evidence that is too vague ('the economy changed').",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can score a DBQ or LEQ you paste in using the official College Board rubrics and tell you exactly which point you earned and which you missed. Free tier covers APUSH.",
      },
      {
        type: "p",
        text: "Know the periods. Know the themes. Argue, do not list. That is the APUSH playbook.",
      },
    ],
  },
  {
    slug: "ap-world-history-review-guide",
    title: "AP World History Modern Review Guide: All 9 Units Explained",
    metaTitle: "AP World History Modern Review Guide: 1200 to Present",
    description:
      "A complete AP World History Modern review guide covering all 9 units from 1200 to present, plus DBQ and LEQ strategies, key documents, and cross-regional comparisons.",
    excerpt:
      "AP World History Modern covers 800 years across every continent. This unit-by-unit guide covers each period's defining developments, the connections between regions, and the essay strategies that earn the points.",
    date: "2026-04-17",
    readTime: "8 min read",
    category: "AP World History",
    keywords: [
      "AP World History",
      "AP World History Modern",
      "AP World review",
      "AP World History study guide",
      "DBQ",
      "world history units",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP World History Modern covers the world from 1200 to the present. That is 800 years of interconnected history on every continent. The exam is less interested in trivia than in your ability to compare across regions and explain cause, change, and continuity. If you learn the structure, the content fits into it.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "Same format as APUSH: 55 MCQ, 3 SAQ, 1 DBQ (60 min), 1 LEQ (40 min). The DBQ focuses on the period from 1450 to 2001. The LEQ offers options from different time periods.",
      },
      { type: "h2", text: "Unit 1: The Global Tapestry, c. 1200 to 1450" },
      {
        type: "p",
        text: "State building across the world: Song China, Dar al-Islam (Abbasid fragmentation, Mamluks, Delhi Sultanate), Sub-Saharan Africa (Mali, Great Zimbabwe), Americas (Aztec, Inca), Europe (feudalism, Christendom). Key idea: by 1450, every region had developed complex states with its own religious and political systems.",
      },
      { type: "h2", text: "Unit 2: Networks of Exchange, c. 1200 to 1450" },
      {
        type: "p",
        text: "Silk Roads, Indian Ocean network, Trans-Saharan, Mongol Empire. Key idea: the Mongols made the largest trade zone in history, and the Black Death spread along the same routes. Ibn Battuta, Marco Polo, Mansa Musa all moved through these networks.",
      },
      { type: "h2", text: "Unit 3: Land-Based Empires, c. 1450 to 1750" },
      {
        type: "p",
        text: "Four empires to know: Ottoman, Safavid, Mughal, Ming and Qing China, plus Russia. Key idea: gunpowder let these empires expand and consolidate. Each used religion (Islam, Sunni vs Shia, Hindu minority under Mughal) to legitimize rule.",
      },
      { type: "h2", text: "Unit 4: Transoceanic Interconnections, c. 1450 to 1750" },
      {
        type: "p",
        text: "European maritime expansion (Portugal, Spain, Netherlands, England, France), Columbian Exchange, Atlantic slave trade, joint-stock companies, mercantilism. Key idea: the world became truly global for the first time, and the Atlantic slave trade forcibly moved 12 million people.",
      },
      { type: "h2", text: "Unit 5: Revolutions, c. 1750 to 1900" },
      {
        type: "p",
        text: "Enlightenment, Atlantic revolutions (American, French, Haitian, Latin American), Industrial Revolution, nationalism, global migration, reform movements. Key idea: Enlightenment ideas about individual rights spread globally, and industrialization remade economies and societies.",
      },
      { type: "h2", text: "Unit 6: Consequences of Industrialization, c. 1750 to 1900" },
      {
        type: "p",
        text: "New imperialism (the scramble for Africa, Opium Wars, Sepoy Rebellion), economic imperialism, anti-colonial movements begin. Key idea: industrialized nations extracted resources and markets from the non-industrialized world, sometimes through direct colonization.",
      },
      { type: "h2", text: "Unit 7: Global Conflict, c. 1900 to Present" },
      {
        type: "p",
        text: "WWI, WWII, interwar period, collapse of empires, Holocaust, rise of communism and fascism. Key idea: total war reshaped states, economies, and populations on an unprecedented scale.",
      },
      { type: "h2", text: "Unit 8: Cold War and Decolonization, c. 1900 to Present" },
      {
        type: "p",
        text: "Cold War (US vs USSR, proxy wars, nuclear arms race), decolonization of Asia and Africa, non-aligned movement, Chinese Revolution, Cuban Revolution, Vietnam War, end of apartheid. Key idea: two superpowers defined the post-1945 world, while former colonies fought for independence.",
      },
      { type: "h2", text: "Unit 9: Globalization, c. 1900 to Present" },
      {
        type: "p",
        text: "Economic globalization (free trade, multinationals, neoliberalism), technological change (internet, mobile, biotech), environmental consequences (climate change), migration, terrorism, pandemics. Key idea: interconnection accelerated, along with its benefits and its costs.",
      },
      { type: "h2", text: "Thinking across regions" },
      {
        type: "p",
        text: "World History grades comparison questions heavily. Practice comparing. For example: how was Qing China's response to the Industrial Revolution different from Meiji Japan's? How did decolonization play out in India vs Algeria vs Ghana?",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Build a region-by-period grid. One axis is the nine units, the other is five or six regions (East Asia, South Asia, Southwest Asia, Africa, Europe, Americas). Fill in the dominant state or development per cell. You will see patterns you did not notice reading linearly.",
      },
      { type: "h2", text: "DBQ documents that come up often" },
      {
        type: "ul",
        items: [
          "Travel accounts (Ibn Battuta, Marco Polo, missionaries)",
          "Religious texts and sermons",
          "Revolutionary manifestos (Declaration of the Rights of Man, Bolivar, Communist Manifesto)",
          "Economic data (trade volumes, GDP, industrial output)",
          "Photographs and political cartoons",
          "Government decrees and treaties",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ol",
        items: [
          "Spending too much time on any one region. World History is global.",
          "Treating the 20th century like a bonus unit. Three of the nine units cover 1900 to present.",
          "Forgetting HIPP analysis on the DBQ.",
          "Writing generic thesis statements. Specify regions, time periods, and your line of reasoning.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "The FinalsPrep tutor can help you build cross-regional comparisons on demand. Ask it 'compare industrialization in Britain and Japan' and it gives you a side-by-side with specific evidence. Free tier works.",
      },
      {
        type: "p",
        text: "The world was connected long before globalization. Learn the connections, and the content organizes itself.",
      },
    ],
  },
  {
    slug: "ap-computer-science-a-review-guide",
    title: "AP Computer Science A Review Guide: All 10 Units with Java Tips",
    metaTitle: "AP Computer Science A Review Guide: All 10 Units (2026)",
    description:
      "A complete AP Computer Science A review guide covering all 10 units of Java, common FRQ patterns, and the 2D array and recursion setups the exam tests every year.",
    excerpt:
      "AP CS A is really just Java plus object-oriented thinking plus algorithms. This unit-by-unit guide covers every topic in the CED, with the exact FRQ patterns the exam uses and the Java syntax gotchas that cost points.",
    date: "2026-04-18",
    readTime: "12 min read",
    category: "AP Computer Science A",
    keywords: [
      "AP Computer Science A",
      "AP CSA",
      "AP Computer Science A review",
      "Java",
      "ArrayList",
      "recursion",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Computer Science A is the most practical AP exam in the lineup: you learn Java, and the exam tests whether you can read Java and write Java. Every FRQ is a class, a method, or a loop. The patterns are predictable. The syntax is what trips people up.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "3 hours total. Section I is 40 multiple choice in 90 minutes. Section II is 4 free response in 90 minutes: a methods and control structures FRQ, a class FRQ, an array or ArrayList FRQ, and a 2D array FRQ. A subset of the Java library (the Quick Reference) is provided.",
      },
      { type: "h2", text: "Unit 1: Primitive Types" },
      {
        type: "p",
        text: "Topics: int, double, boolean, arithmetic expressions, casting.",
      },
      {
        type: "p",
        text: "Skills. Integer division truncates (5 divided by 2 equals 2). To get a decimal, cast at least one operand to double. Modulo gives the remainder (7 percent 3 equals 1).",
      },
      { type: "h2", text: "Unit 2: Using Objects" },
      {
        type: "p",
        text: "Topics: String class, Math class, calling methods on objects, Wrapper classes (Integer, Double).",
      },
      {
        type: "p",
        text: "Skills. String methods: length, substring, indexOf, equals. Math methods: sqrt, pow, abs, random. Strings are immutable, so operations return new strings.",
      },
      { type: "h2", text: "Unit 3: Boolean Expressions and if Statements" },
      {
        type: "p",
        text: "Topics: comparison operators, logical operators, short-circuit evaluation, if, if-else, nested ifs, De Morgan's laws.",
      },
      {
        type: "p",
        text: "Skills. && and || short-circuit (stop evaluating as soon as the answer is determined). Use this to safely check a condition before accessing an array index: if (i < arr.length && arr[i] > 0).",
      },
      { type: "h2", text: "Unit 4: Iteration" },
      {
        type: "p",
        text: "Topics: while loops, for loops, nested loops, algorithm analysis.",
      },
      {
        type: "p",
        text: "Skills. Trace loops on paper. Identify off-by-one errors. Count iterations. Translate between while and for. Understand when a nested loop produces O(n squared) behavior.",
      },
      { type: "h2", text: "Unit 5: Writing Classes" },
      {
        type: "p",
        text: "Topics: class definition, instance variables, constructors, methods, this keyword, encapsulation, visibility (public, private).",
      },
      {
        type: "p",
        text: "Skills. Write a class from a specification. Constructors initialize instance variables. Getters return them. Private keeps them hidden from outside code.",
      },
      {
        type: "code",
        language: "java",
        text: "public class Book {\n    private String title;\n    private int pages;\n\n    public Book(String t, int p) {\n        title = t;\n        pages = p;\n    }\n\n    public String getTitle() { return title; }\n    public int getPages() { return pages; }\n}",
      },
      { type: "h2", text: "Unit 6: Array" },
      {
        type: "p",
        text: "Topics: declaration, initialization, access, traversal, enhanced for loop.",
      },
      {
        type: "p",
        text: "Skills. Array length is .length (property, not method). Enhanced for iterates values but gives no index. Arrays have fixed size.",
      },
      { type: "h2", text: "Unit 7: ArrayList" },
      {
        type: "p",
        text: "Topics: ArrayList class, autoboxing, common methods (add, get, set, remove, size).",
      },
      {
        type: "p",
        text: "Skills. ArrayList size is .size() (method, not property). To remove while iterating without bugs, iterate from the end backward. ArrayList holds objects only, so primitives get autoboxed into wrapper classes.",
      },
      {
        type: "callout",
        variant: "warn",
        text: "Array length is a property (no parens). ArrayList size is a method (with parens). String length is a method (with parens). That inconsistency is tested every year.",
      },
      { type: "h2", text: "Unit 8: 2D Array" },
      {
        type: "p",
        text: "Topics: 2D arrays as arrays of arrays, row-major traversal, column-major traversal.",
      },
      {
        type: "p",
        text: "Skills. grid.length is the number of rows. grid[0].length is the number of columns (assuming rectangular). Use a nested for loop: outer for rows, inner for columns.",
      },
      { type: "h2", text: "Unit 9: Inheritance" },
      {
        type: "p",
        text: "Topics: subclass, superclass, extends, super keyword, method overriding, polymorphism, abstract classes, Object class.",
      },
      {
        type: "p",
        text: "Skills. A subclass inherits public methods from its superclass. Override by writing a method with the same signature. Use super to call the parent's version. Polymorphism: a variable declared as the superclass type can hold a subclass object, and the correct overridden method gets called at runtime.",
      },
      { type: "h2", text: "Unit 10: Recursion" },
      {
        type: "p",
        text: "Topics: recursive methods, base case, recursive case, tracing recursion.",
      },
      {
        type: "p",
        text: "Skills. Every recursive method has a base case (stops recursion) and a recursive case (calls itself with smaller input). Classics: factorial, fibonacci, sum of array, binary search.",
      },
      {
        type: "code",
        language: "java",
        text: "public static int factorial(int n) {\n    if (n <= 1) return 1;      // base case\n    return n * factorial(n - 1); // recursive case\n}",
      },
      { type: "h2", text: "The FRQ patterns that repeat" },
      {
        type: "ol",
        items: [
          "Write a method that operates on an array or ArrayList (filter, transform, count).",
          "Complete a class given a specification and partial code.",
          "Traverse a 2D array and return some aggregate (sum, max, count of matching entries).",
          "Implement a recursive method (often on strings or nested structures).",
        ],
      },
      { type: "h2", text: "Java syntax gotchas" },
      {
        type: "ul",
        items: [
          "equals() for String comparison, not ==",
          ".length vs .length() vs .size() (see above)",
          "Integer division truncates; cast to double for decimals",
          "Declaring int[] arr vs int arr[] both work, but stay consistent",
          "For ArrayList, always use the wrapper type: ArrayList<Integer>, not ArrayList<int>",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can step through any Java method you paste in and show you what each variable holds at each line. Catches the off-by-one and the missing return before the exam does. Free tier covers the course.",
      },
      {
        type: "p",
        text: "CSA rewards clean, readable code. Write like someone has to grade it in 30 seconds, because someone does.",
      },
    ],
  },
  {
    slug: "ap-environmental-science-review-guide",
    title: "AP Environmental Science Review Guide: Every Unit Made Visual",
    metaTitle: "AP Environmental Science Review Guide: All 9 Units (2026)",
    description:
      "A complete AP Environmental Science review guide covering all 9 units, key diagrams, math-heavy topics, and FRQ strategies for the 2026 APES exam.",
    excerpt:
      "APES covers ecosystems, populations, resources, pollution, and climate change. Here is a unit-by-unit review organized around the diagrams and calculations the exam reuses every year.",
    date: "2026-04-19",
    readTime: "10 min read",
    category: "AP Environmental Science",
    keywords: [
      "AP Environmental Science",
      "APES review",
      "AP Environmental Science study guide",
      "APES units",
      "ecosystems",
      "climate change",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "APES is the AP science with the lightest math and the widest breadth. The exam tests specific facts (soil horizons, energy sources, pollutants) and your ability to reason about environmental trade-offs. Unlike Chem or Physics, APES rewards you for knowing a lot of discrete things rather than mastering a handful of equations.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "2 hours 40 minutes. Section I is 80 multiple choice in 90 minutes. Section II is 3 free response in 70 minutes: one designing an investigation, one analyzing an environmental problem with authentic data, one about an environmental solution. Calculator allowed.",
      },
      { type: "h2", text: "Unit 1: The Living World, Ecosystems" },
      {
        type: "p",
        text: "Topics: biomes, biogeochemical cycles (carbon, nitrogen, phosphorus, water), food webs, primary productivity, trophic levels, energy flow.",
      },
      {
        type: "p",
        text: "Skills. Energy transfer between trophic levels is roughly 10 percent (the rest is lost as heat). Carbon cycle: photosynthesis takes CO2 in, respiration puts it back. Nitrogen requires fixation because N2 is inert.",
      },
      { type: "h2", text: "Unit 2: The Living World, Biodiversity" },
      {
        type: "p",
        text: "Topics: species diversity, ecological tolerance, natural disruptions, ecological succession, adaptations.",
      },
      {
        type: "p",
        text: "Skills. Primary succession starts on bare rock (no soil). Secondary succession starts after disturbance (soil remains). Keystone species have disproportionate effects on the community relative to their numbers.",
      },
      { type: "h2", text: "Unit 3: Populations" },
      {
        type: "p",
        text: "Topics: generalist vs specialist, r vs K strategies, carrying capacity, population growth, demographic transition, human population.",
      },
      {
        type: "p",
        text: "Skills. Exponential growth: no limiting factors. Logistic growth: growth slows as it approaches carrying capacity K. Demographic transition: stage 1 (high birth and death), stage 2 (death drops, population surges), stage 3 (birth drops), stage 4 (both low).",
      },
      { type: "h2", text: "Unit 4: Earth Systems and Resources" },
      {
        type: "p",
        text: "Topics: plate tectonics (convergent, divergent, transform), soil horizons (O, A, E, B, C, R), atmospheric layers, watersheds, El Nino and La Nina.",
      },
      {
        type: "callout",
        variant: "warn",
        text: "Do not confuse stratospheric ozone (good, blocks UV) with tropospheric ozone (bad, ground-level smog). Same molecule, different place, opposite effects.",
      },
      { type: "h2", text: "Unit 5: Land and Water Use" },
      {
        type: "p",
        text: "Topics: agriculture (slash and burn, monoculture, irrigation), livestock (CAFOs, overgrazing), deforestation, mining (open-pit, strip, mountaintop removal), fishing, urbanization, sustainability practices.",
      },
      {
        type: "p",
        text: "Skills. Identify the trade-offs of each practice. Slash and burn is cheap and quick but destroys soil. CAFOs are efficient but produce concentrated waste and disease risk. Aquaculture can address overfishing but introduces its own pollution.",
      },
      { type: "h2", text: "Unit 6: Energy Resources and Consumption" },
      {
        type: "p",
        text: "Topics: nonrenewable sources (coal, oil, natural gas, nuclear fission), renewable sources (solar, wind, hydro, geothermal, biomass), energy efficiency, energy conservation.",
      },
      {
        type: "p",
        text: "Skills. Know the major trade-offs of each source. Coal is cheap and abundant but high CO2 and particulates. Nuclear is low-carbon but produces long-lived waste and risks meltdown. Solar is intermittent but zero-emission in operation.",
      },
      { type: "h2", text: "Unit 7: Atmospheric Pollution" },
      {
        type: "p",
        text: "Topics: primary vs secondary air pollutants, smog (photochemical and industrial), acid rain, indoor air pollution, ozone depletion (CFCs, Montreal Protocol).",
      },
      {
        type: "p",
        text: "Skills. Primary pollutants are emitted directly (CO, SO2, NOx). Secondary form from reactions in the atmosphere (O3, acid rain). Thermal inversions trap pollutants near the ground.",
      },
      { type: "h2", text: "Unit 8: Aquatic and Terrestrial Pollution" },
      {
        type: "p",
        text: "Topics: point vs nonpoint source pollution, eutrophication, thermal pollution, oil spills, solid waste, hazardous waste, dose-response curves (LD50), bioaccumulation and biomagnification.",
      },
      {
        type: "p",
        text: "Skills. Eutrophication sequence: nutrient runoff causes algal bloom, algae die and decompose, decomposers consume O2, dead zone forms. Biomagnification: persistent pollutants (DDT, mercury) concentrate up the food chain.",
      },
      { type: "h2", text: "Unit 9: Global Change" },
      {
        type: "p",
        text: "Topics: stratospheric ozone depletion, climate change (greenhouse effect, greenhouse gases, consequences), ocean acidification, invasive species, human health impacts.",
      },
      {
        type: "p",
        text: "Skills. Greenhouse gases by warming potential: CH4 and N2O per molecule are far stronger than CO2, but CO2 is the dominant contributor because of sheer quantity. Ocean acidification happens when CO2 dissolves and forms carbonic acid, lowering pH.",
      },
      { type: "h2", text: "Math that shows up" },
      {
        type: "ul",
        items: [
          "Population growth rate: r equals (births minus deaths) over population size",
          "Doubling time: 70 divided by percent growth rate",
          "Dimensional analysis (unit conversions): always show your work",
          "Percent change: (new minus old) over old times 100",
          "Half-life calculations for radioactive waste or pollutants",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ol",
        items: [
          "Confusing weather (day to day) with climate (decades to centuries).",
          "Assuming all nuclear power is the same as nuclear weapons. Fission power plants do not explode like bombs.",
          "Saying the ozone hole causes global warming. They are separate issues.",
          "Skipping units on APES calculations. That is a guaranteed point loss.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "The FinalsPrep tutor has APES mapped across units, so when you ask about nitrogen runoff in Unit 8, it reminds you of the nitrogen cycle from Unit 1. Free tier covers APES.",
      },
      {
        type: "p",
        text: "APES is wide, not deep. Make flashcards of the specific facts (pollutants, energy sources, treaties) and practice the calculations. That is the exam.",
      },
    ],
  },
  {
    slug: "ap-psychology-review-guide",
    title: "AP Psychology Review Guide: All 5 Units Explained",
    metaTitle: "AP Psychology Review Guide: All 5 Units (2026 Exam)",
    description:
      "A complete AP Psychology review guide covering all 5 units of the redesigned course, key researchers, FRQ strategies, and the concepts the exam tests every year.",
    excerpt:
      "The new AP Psychology course trimmed the original nine units down to five. This unit-by-unit review covers every topic in the redesigned CED, with the researchers, studies, and FRQ patterns the exam reuses.",
    date: "2026-04-20",
    readTime: "10 min read",
    category: "AP Psychology",
    keywords: [
      "AP Psychology",
      "AP Psych review",
      "AP Psychology study guide",
      "AP Psych units",
      "AP Psych FRQ",
      "AP exam prep",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Psychology was redesigned for the 2024-25 school year. The old 9 units are now 5 broader units, and the exam emphasizes real-world application more than memorizing researchers. The content is still rich, but the structure makes it easier to study if you know how to use it.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "2 hours total. Section I is 75 multiple choice in 90 minutes. Section II is 2 free response in 70 minutes: one article analysis question and one evidence-based question. No calculator (no formulas to speak of).",
      },
      { type: "h2", text: "Unit 1: Biological Bases of Behavior" },
      {
        type: "p",
        text: "About 15 to 25 percent of the exam. Topics: neurons, neurotransmitters, the brain (lobes, major structures), endocrine system, sensation and perception, consciousness, sleep, dreams.",
      },
      {
        type: "p",
        text: "Skills. Match neurotransmitters to function (dopamine for reward and movement, serotonin for mood, GABA as primary inhibitor, acetylcholine for memory and muscle). Know what each lobe does. Identify sensory pathways from stimulus to perception.",
      },
      { type: "h2", text: "Unit 2: Cognition" },
      {
        type: "p",
        text: "About 15 to 25 percent. Topics: memory (encoding, storage, retrieval), forgetting, thinking and problem solving, intelligence, language.",
      },
      {
        type: "p",
        text: "Skills. Distinguish short-term from long-term memory. Apply the serial position effect (primacy and recency). Identify types of long-term memory (explicit: semantic, episodic; implicit: procedural). Recognize cognitive biases like availability heuristic and confirmation bias.",
      },
      { type: "h2", text: "Unit 3: Development and Learning" },
      {
        type: "p",
        text: "About 15 to 25 percent. Topics: lifespan development (Piaget, Erikson, Kohlberg), classical conditioning, operant conditioning, observational learning.",
      },
      {
        type: "p",
        text: "Skills. Piaget's stages (sensorimotor, preoperational, concrete operational, formal operational) and the hallmarks of each. Classical vs operant: Pavlov's dog involves an association between stimuli, Skinner's box involves consequences changing behavior. Reinforcement schedules (fixed vs variable, ratio vs interval).",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Reinforcement increases behavior; punishment decreases it. Positive means adding a stimulus; negative means removing one. Negative reinforcement (removing a bad thing to strengthen behavior) is the one students confuse with punishment most often.",
      },
      { type: "h2", text: "Unit 4: Social Psychology and Personality" },
      {
        type: "p",
        text: "About 15 to 25 percent. Topics: social thinking (attribution theory, cognitive dissonance), social influence (conformity, obedience, group behavior), personality theories (psychodynamic, humanistic, trait, social-cognitive).",
      },
      {
        type: "p",
        text: "Skills. Fundamental attribution error: overemphasizing disposition and underemphasizing situation. Asch (conformity), Milgram (obedience), Zimbardo (roles). The Big Five personality traits: OCEAN (openness, conscientiousness, extraversion, agreeableness, neuroticism).",
      },
      { type: "h2", text: "Unit 5: Mental and Physical Health" },
      {
        type: "p",
        text: "About 15 to 25 percent. Topics: stress, coping, motivation, emotion, health psychology, psychological disorders, therapies.",
      },
      {
        type: "p",
        text: "Skills. Match disorders to categories (anxiety, depressive, bipolar, schizophrenia spectrum, neurocognitive). Match therapies to their theoretical backgrounds (psychoanalysis from Freud, cognitive therapy from Beck and Ellis, behavior therapy from classical and operant conditioning).",
      },
      { type: "h2", text: "The researchers you have to know" },
      {
        type: "ul",
        items: [
          "Freud: psychoanalysis, unconscious, defense mechanisms",
          "Pavlov: classical conditioning",
          "Skinner: operant conditioning",
          "Watson and Little Albert: classical conditioning in humans",
          "Bandura: observational learning, Bobo doll",
          "Piaget: cognitive development stages",
          "Erikson: psychosocial stages across the lifespan",
          "Kohlberg: moral development",
          "Maslow: hierarchy of needs, humanistic psychology",
          "Rogers: client-centered therapy, unconditional positive regard",
          "Asch, Milgram, Zimbardo: landmark social psychology studies",
        ],
      },
      { type: "h2", text: "How to attack the two FRQs" },
      {
        type: "p",
        text: "The article analysis FRQ gives you a research article summary and asks you to describe the study design, apply concepts, and evaluate claims. The evidence-based FRQ asks you to apply concepts to a scenario. Both reward specific definitions followed by specific application.",
      },
      {
        type: "p",
        text: "Always define the term first, then apply it to the scenario in a full sentence. Readers are looking for a definition plus a specific example from the scenario. If you just name-drop the term without defining it, you lose the point.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ol",
        items: [
          "Confusing negative reinforcement with punishment.",
          "Using 'prove' or 'cause' when a study only shows correlation.",
          "Mixing up retroactive interference (new material disrupts old) and proactive (old disrupts new).",
          "Forgetting that perception is not the same as sensation. Sensation is detection; perception is interpretation.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can quiz you on the psychology researchers and their studies, or run you through practice FRQs in the correct define-then-apply format. Free tier covers AP Psych.",
      },
      {
        type: "p",
        text: "AP Psych rewards you for clear definitions and specific applications. Know the researchers, know the terms, apply them to examples. That is the exam.",
      },
    ],
  },
  {
    slug: "ap-human-geography-review-guide",
    title: "AP Human Geography Review Guide: All 7 Units Explained",
    metaTitle: "AP Human Geography Review Guide: All 7 Units (2026)",
    description:
      "A complete AP Human Geography review guide covering all 7 units, key models, case studies, and FRQ strategies for the 2026 AP Human Geo exam.",
    excerpt:
      "AP Human Geography tests a handful of models (demographic transition, von Thunen, urban structure) on every exam. This unit-by-unit guide covers all of them, plus the FRQ patterns that come back every year.",
    date: "2026-04-21",
    readTime: "10 min read",
    category: "AP Human Geography",
    keywords: [
      "AP Human Geography",
      "AP HuG review",
      "AP Human Geography study guide",
      "demographic transition",
      "urban geography",
      "APHG",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Human Geography is one of the smallest AP exams and also one of the most predictable. The course is built around a set of models (demographic transition, von Thunen, concentric zone, Weber) that show up on every exam. If you know the models and a few case studies for each theme, the exam is very manageable.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "2 hours 15 minutes. Section I is 60 multiple choice in 60 minutes. Section II is 3 free response in 75 minutes. No calculator. Answer the FRQs with a claim plus specific evidence, plus geographic terms.",
      },
      { type: "h2", text: "Unit 1: Thinking Geographically" },
      {
        type: "p",
        text: "About 8 to 10 percent. Topics: types of maps, scales, types of regions (formal, functional, vernacular), geographic data, spatial patterns.",
      },
      {
        type: "p",
        text: "Skills. Identify map projections (Mercator distorts size near the poles, Peters preserves area). Distinguish formal (uniform), functional (nodal), and vernacular (perceived) regions. Read GIS-style data.",
      },
      { type: "h2", text: "Unit 2: Population and Migration" },
      {
        type: "p",
        text: "About 12 to 17 percent. Topics: demographic transition model, population pyramids, fertility and mortality, migration (push and pull factors), Ravenstein's laws, refugees.",
      },
      {
        type: "p",
        text: "Skills. Read a population pyramid to infer a country's DTM stage. Apply push-pull factors to a migration scenario. Recognize how industrialization drives DTM transitions.",
      },
      { type: "h2", text: "Unit 3: Cultural Patterns and Processes" },
      {
        type: "p",
        text: "About 12 to 17 percent. Topics: folk and popular culture, language families, religions (universal vs ethnic), cultural diffusion (relocation, expansion, hierarchical, contagious).",
      },
      {
        type: "p",
        text: "Skills. Distinguish universalizing religions (Christianity, Islam, Buddhism) from ethnic ones (Judaism, Hinduism). Identify diffusion type from an example (McDonald's expanding is hierarchical and expansion; a virus spreading through a crowd is contagious).",
      },
      { type: "h2", text: "Unit 4: Political Patterns and Processes" },
      {
        type: "p",
        text: "About 12 to 17 percent. Topics: types of states (nation-state, multinational state, stateless nation), devolution, supranational organizations, boundary types, gerrymandering.",
      },
      {
        type: "p",
        text: "Skills. Match examples to categories (Japan is close to a nation-state; Kurds are a stateless nation). Identify boundary types (antecedent, subsequent, superimposed, relic). Recognize centripetal and centrifugal forces on states.",
      },
      { type: "h2", text: "Unit 5: Agriculture and Rural Land Use" },
      {
        type: "p",
        text: "About 12 to 17 percent. Topics: agricultural hearths, von Thunen's model, subsistence vs commercial agriculture, three agricultural revolutions (Neolithic, Second, Green), GMOs, food deserts.",
      },
      {
        type: "p",
        text: "Skills. Apply von Thunen rings (market at center, then dairy, forest, grains, ranching). Distinguish the three agricultural revolutions. Identify modern trends (organic, urban agriculture).",
      },
      { type: "h2", text: "Unit 6: Cities and Urban Land Use" },
      {
        type: "p",
        text: "About 12 to 17 percent. Topics: urbanization, central place theory, urban models (concentric zone, sector, multiple nuclei, Latin American, African, Southeast Asian), gentrification, urban sprawl.",
      },
      {
        type: "p",
        text: "Skills. Apply urban models to given city layouts. Compare North American models to Latin American models (in Latin America, wealth often radiates out from the center along a spine). Identify consequences of sprawl.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "The Burgess concentric zone model is for Chicago, 1920s. Do not apply it to a Latin American city. Use the Griffin-Ford model (wealthy spine, disamenity zones) for Latin America.",
      },
      { type: "h2", text: "Unit 7: Industrial and Economic Development" },
      {
        type: "p",
        text: "About 12 to 17 percent. Topics: Industrial Revolution, Weber's least cost theory, Rostow's stages of development, Wallerstein's world systems (core, semi-periphery, periphery), measures of development (GDP, HDI, GII), globalization.",
      },
      {
        type: "p",
        text: "Skills. Apply Weber: an industry picks a location that minimizes the combined cost of raw materials, labor, and transportation. Use world systems to classify countries. Distinguish economic measures (GDP, GNI) from development measures (HDI, GII).",
      },
      { type: "h2", text: "The models you must memorize" },
      {
        type: "ul",
        items: [
          "Demographic Transition Model (5 stages of birth and death rates)",
          "Ravenstein's laws of migration",
          "Von Thunen's agricultural land use model",
          "Concentric Zone, Sector, Multiple Nuclei models",
          "Griffin-Ford (Latin American), SE Asian, African city models",
          "Weber's least cost industrial location",
          "Rostow's stages of economic development",
          "Wallerstein's world systems theory",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ol",
        items: [
          "Confusing migration terms. Emigrate is leaving; immigrate is arriving.",
          "Applying the wrong urban model to the wrong region.",
          "Using 'race' and 'ethnicity' interchangeably. They are not.",
          "Forgetting to use geographic terminology on FRQs. Graders reward specific vocabulary.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can quiz you on the models with flashcard-style prompts and will score your FRQ responses using the College Board rubric. Free tier works for APHG.",
      },
      {
        type: "p",
        text: "Learn the models, learn the vocabulary, apply them to specific places. That is APHG in one sentence.",
      },
    ],
  },
  {
    slug: "ap-microeconomics-review-guide",
    title: "AP Microeconomics Review Guide: All 6 Units Explained",
    metaTitle: "AP Microeconomics Review Guide: All 6 Units (2026)",
    description:
      "A complete AP Microeconomics review guide covering all 6 units, key graphs, market structures, and FRQ strategies. Everything you need for a 5 on the 2026 Micro exam.",
    excerpt:
      "AP Micro is a graphing exam that happens to be about economics. If you can draw the four market structure graphs without thinking, you are most of the way there. This guide covers every unit.",
    date: "2026-04-22",
    readTime: "10 min read",
    category: "AP Microeconomics",
    keywords: [
      "AP Microeconomics",
      "AP Micro review",
      "AP Microeconomics study guide",
      "supply and demand",
      "market structures",
      "perfect competition",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Microeconomics is a graphing exam with some economic vocabulary attached. If you can draw the six key graphs (supply and demand, perfect competition, monopoly, monopolistic competition, oligopoly with game theory, factor markets) without thinking, the exam becomes an exercise in labeling.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "2 hours 10 minutes. Section I is 60 multiple choice in 70 minutes. Section II is 3 free response in 60 minutes (one long, two short). 10-minute reading period before you start writing. Calculator permitted.",
      },
      { type: "h2", text: "Unit 1: Basic Economic Concepts" },
      {
        type: "p",
        text: "About 12 to 15 percent. Topics: scarcity, opportunity cost, production possibilities curve (PPC), comparative advantage, specialization, economic systems.",
      },
      {
        type: "p",
        text: "Skills. Draw a PPC and identify efficient, inefficient, and unattainable points. Calculate opportunity cost as the ratio of what you give up over what you gain. Determine comparative advantage by comparing opportunity costs (not absolute numbers).",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Comparative advantage depends on lower opportunity cost, not higher productivity. A country can have absolute advantage in everything and still benefit from trade by specializing where its comparative advantage is greatest.",
      },
      { type: "h2", text: "Unit 2: Supply and Demand" },
      {
        type: "p",
        text: "About 20 to 25 percent. The largest unit. Topics: demand, supply, equilibrium, elasticity (price, income, cross), consumer and producer surplus, taxes, tariffs, price controls.",
      },
      {
        type: "p",
        text: "Skills. Shift supply or demand and predict the new equilibrium. Calculate elasticity as percent change in quantity over percent change in price. Show the deadweight loss from a tax, price ceiling, or price floor.",
      },
      { type: "h2", text: "Unit 3: Production, Cost, and the Perfect Competition Model" },
      {
        type: "p",
        text: "About 22 to 25 percent. Topics: total, marginal, and average product, law of diminishing returns, short-run and long-run costs, perfectly competitive firm's profit maximization, shutdown and break-even.",
      },
      {
        type: "p",
        text: "Skills. Profit maximizes where MR equals MC. In perfect competition, P equals MR. Shutdown happens when P falls below average variable cost in the short run. Long-run equilibrium has P equals minimum ATC, with zero economic profit.",
      },
      { type: "h2", text: "Unit 4: Imperfect Competition" },
      {
        type: "p",
        text: "About 15 to 22 percent. Topics: monopoly, monopolistic competition, oligopoly, game theory, price discrimination.",
      },
      {
        type: "p",
        text: "Skills. Monopoly: MR is below demand, profit max at MR equals MC, charges P from the demand curve at that Q. Monopolistic competition: differentiated products, some market power, zero long-run profit. Oligopoly: strategic interaction, solve with payoff matrices and find Nash equilibrium.",
      },
      { type: "h2", text: "Unit 5: Factor Markets" },
      {
        type: "p",
        text: "About 10 to 13 percent. Topics: labor markets, marginal revenue product (MRP), marginal factor cost (MFC), monopsony.",
      },
      {
        type: "p",
        text: "Skills. Firm hires labor until MRP equals MFC. In perfectly competitive labor market, MFC equals wage. Monopsony (one buyer of labor) pays below competitive wage and hires fewer workers.",
      },
      { type: "h2", text: "Unit 6: Market Failure and the Role of Government" },
      {
        type: "p",
        text: "About 8 to 13 percent. Topics: externalities (positive and negative), public goods, income inequality (Lorenz curve, Gini coefficient), Pigouvian taxes and subsidies.",
      },
      {
        type: "p",
        text: "Skills. Negative externality: social cost is above private cost, so market overproduces. Positive externality: social benefit above private, market underproduces. Correct with taxes (negative) or subsidies (positive) equal to the external cost or benefit.",
      },
      { type: "h2", text: "The six graphs you have to draw in your sleep" },
      {
        type: "ol",
        items: [
          "Supply and demand with shifts and equilibrium changes",
          "Perfectly competitive firm (side by side with the market graph)",
          "Monopoly (demand, MR, MC, ATC, showing profit or loss)",
          "Monopolistic competition (long-run equilibrium)",
          "Game theory payoff matrix with dominant strategy and Nash equilibrium",
          "Factor market (labor) with MRP and MFC",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Drawing monopoly demand as horizontal. It is downward sloping; a monopoly faces the entire market demand.",
          "Forgetting that MR equals MC is the rule for profit maximization, not P equals MC (that only works in perfect competition because P equals MR).",
          "Mixing up shutdown and break-even. Shutdown: P below AVC. Break-even: P equals minimum ATC.",
          "Not labeling graphs. Graders give points for labels, not pretty curves.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can walk you through drawing and labeling Micro graphs one piece at a time, so by the exam you are doing them automatically. Free tier covers the course.",
      },
      {
        type: "p",
        text: "Draw the graph. Label everything. Write the profit or loss rectangle. Calculate deadweight loss. That is AP Micro.",
      },
    ],
  },
  {
    slug: "ap-macroeconomics-review-guide",
    title: "AP Macroeconomics Review Guide: All 6 Units Explained",
    metaTitle: "AP Macroeconomics Review Guide: All 6 Units (2026)",
    description:
      "A complete AP Macroeconomics review guide covering all 6 units, the AD-AS model, fiscal and monetary policy, and FRQ strategies. Built for a 5 on the 2026 Macro exam.",
    excerpt:
      "AP Macro is about two things: the AD-AS model and the loanable funds market. Master those and the policy questions work themselves out. This guide covers every unit plus the exam graphs.",
    date: "2026-04-23",
    readTime: "10 min read",
    category: "AP Macroeconomics",
    keywords: [
      "AP Macroeconomics",
      "AP Macro review",
      "AP Macroeconomics study guide",
      "AD-AS model",
      "fiscal policy",
      "monetary policy",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Macro can feel overwhelming because it connects so many moving pieces. But the exam really centers on two models: aggregate demand and aggregate supply (AD-AS), and the loanable funds market. Almost every question is a chain of effects through those two graphs.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "Same format as AP Micro. 2 hours 10 minutes. 60 MCQ in 70 minutes. 3 FRQ in 60 minutes (plus 10-minute reading period). Calculator allowed.",
      },
      { type: "h2", text: "Unit 1: Basic Economic Concepts" },
      {
        type: "p",
        text: "Topics: scarcity, opportunity cost, PPC, comparative advantage, economic systems. Same as Micro Unit 1.",
      },
      { type: "h2", text: "Unit 2: Economic Indicators and the Business Cycle" },
      {
        type: "p",
        text: "About 12 to 17 percent. Topics: GDP (expenditure and income approaches), nominal vs real GDP, unemployment types, CPI and inflation, business cycle.",
      },
      {
        type: "p",
        text: "Skills. Compute GDP using the expenditure approach: C plus I plus G plus (X minus M). Real GDP equals nominal GDP divided by the price level (expressed as an index). Unemployment types: frictional (between jobs), structural (skills mismatch), cyclical (recession). Inflation rate equals percent change in CPI.",
      },
      { type: "h2", text: "Unit 3: National Income and Price Determination" },
      {
        type: "p",
        text: "About 17 to 27 percent. The biggest unit. Topics: aggregate demand, aggregate supply (short-run and long-run), equilibrium, fiscal policy, multipliers.",
      },
      {
        type: "p",
        text: "Skills. Draw AD-AS and identify recessionary and inflationary gaps. Apply fiscal policy: expansionary (increase G or cut T) to close a recessionary gap. Compute the spending multiplier as 1 over (1 minus MPC). Tax multiplier is MPC over (1 minus MPC), always smaller in absolute value.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "The spending multiplier is always one bigger than the tax multiplier (in absolute value), because spending goes directly into GDP while a tax cut only gets partially spent.",
      },
      { type: "h2", text: "Unit 4: Financial Sector" },
      {
        type: "p",
        text: "About 18 to 23 percent. Topics: money, banking, money market, loanable funds market, central bank tools.",
      },
      {
        type: "p",
        text: "Skills. Draw the money market (interest rate on y-axis, quantity of money on x-axis, vertical supply, downward demand). Draw loanable funds market (interest rate on y-axis, quantity of loanable funds). Understand the simple money multiplier as 1 over reserve requirement.",
      },
      {
        type: "p",
        text: "Central bank tools. Open market operations (buying bonds is expansionary, selling is contractionary). Reserve requirements. Discount rate. In newer CED material, interest on reserves is the primary tool.",
      },
      { type: "h2", text: "Unit 5: Long-Run Consequences of Stabilization Policies" },
      {
        type: "p",
        text: "About 20 to 30 percent. Topics: Phillips curve, long-run self-correction, crowding out, economic growth, government debt.",
      },
      {
        type: "p",
        text: "Skills. Short-run Phillips curve: inflation and unemployment trade off. Long-run Phillips curve is vertical at the natural rate of unemployment. Crowding out: government borrowing raises interest rates, reduces private investment. Long-run growth comes from productivity, technology, and capital accumulation (shifts the LRAS curve right).",
      },
      { type: "h2", text: "Unit 6: Open Economy, International Trade and Finance" },
      {
        type: "p",
        text: "About 10 to 13 percent. Topics: balance of payments, foreign exchange market, capital flows, effects of trade.",
      },
      {
        type: "p",
        text: "Skills. FX market: price of currency on y-axis, quantity on x-axis. A weaker dollar (depreciation) makes exports cheaper to foreigners and imports more expensive. Higher US interest rates attract foreign capital, strengthen the dollar, and reduce net exports.",
      },
      { type: "h2", text: "The policy chains the exam loves" },
      {
        type: "p",
        text: "Expansionary fiscal: G up or T down shifts AD right. Output rises, price level rises, unemployment falls (short-run). If at full employment, long-run adjustment raises prices without a permanent output gain.",
      },
      {
        type: "p",
        text: "Expansionary monetary: Fed buys bonds, money supply up, interest rates down, investment and consumption up, AD right. Same output and price-level response as fiscal.",
      },
      {
        type: "p",
        text: "Open economy chain: expansionary monetary lowers US rates, dollar depreciates, net exports rise, which amplifies AD shift.",
      },
      { type: "h2", text: "The five graphs you need cold" },
      {
        type: "ol",
        items: [
          "AD-AS (with short-run and long-run AS, plus recessionary and inflationary gaps)",
          "Money market (MS vertical, MD downward)",
          "Loanable funds market",
          "Short-run and long-run Phillips curves",
          "Foreign exchange market",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Shifting AS when you should shift AD, and vice versa. Taxes on consumers shift AD; supply shocks shift AS.",
          "Mislabeling axes. Money market is interest rate vs quantity of money. Loanable funds is interest rate vs quantity of loanable funds.",
          "Forgetting that the long-run Phillips curve is vertical at the natural rate of unemployment.",
          "Using the wrong direction for exchange rate changes. Stronger dollar means more foreign currency per dollar.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can walk through policy chains step by step, showing the ripple effect on AD, AS, interest rates, and exchange rates. Free tier covers Macro.",
      },
      {
        type: "p",
        text: "Master AD-AS and loanable funds. Everything else is a consequence. That is AP Macro.",
      },
    ],
  },
  {
    slug: "ap-english-language-review-guide",
    title: "AP English Language and Composition Review Guide",
    metaTitle: "AP English Language Review Guide: Rhetoric and Essays (2026)",
    description:
      "A complete AP English Language and Composition review guide covering rhetorical analysis, argument, synthesis essays, and the skills the exam tests every year.",
    excerpt:
      "AP Lang is not an English class. It is a rhetoric class with three essays and a multiple choice section. This guide covers the skills, essay rubrics, and rhetorical devices you need for a 5.",
    date: "2026-04-24",
    readTime: "12 min read",
    category: "AP English Language",
    keywords: [
      "AP English Language",
      "AP Lang review",
      "AP Lang study guide",
      "rhetorical analysis",
      "synthesis essay",
      "argument essay",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP English Language and Composition is not about reading novels. It is about analyzing how writers make arguments. Once you stop thinking of it as English and start thinking of it as rhetoric, the whole course gets clearer.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "3 hours 15 minutes. Section I is 45 multiple choice in 60 minutes (two types: reading passages and writing revision passages). Section II is three essays in 135 minutes plus 15 minutes of reading time. Each essay is scored 0 to 6.",
      },
      { type: "h2", text: "The skills the course is built on" },
      {
        type: "p",
        text: "The CED organizes content around six skill categories rather than units. Every multiple choice question and every essay targets one or more of these:",
      },
      {
        type: "ol",
        items: [
          "Rhetorical situation (reading): who is writing to whom, about what, why, in what context",
          "Rhetorical situation (writing): making choices about your own rhetorical situation",
          "Claims and evidence (reading): identifying arguments and the evidence that supports them",
          "Claims and evidence (writing): crafting defensible claims and supporting them",
          "Reasoning and organization (reading and writing): how arguments are structured",
          "Style: diction, syntax, figurative language",
        ],
      },
      { type: "h2", text: "The three essays" },
      { type: "h3", text: "Synthesis essay" },
      {
        type: "p",
        text: "You get a prompt and 6 to 7 sources. Your job: take a position and use at least 3 sources as evidence. Cite them inline (Source A, Source B, etc.). This is the essay that looks hardest but is actually the most mechanical. If you can paraphrase the sources and weave them into a clear argument, you earn the points.",
      },
      { type: "h3", text: "Rhetorical analysis essay" },
      {
        type: "p",
        text: "You get one passage. Your job: analyze the rhetorical choices the writer makes and explain how those choices contribute to their purpose. This is the hardest essay for most students because it requires analysis, not just summary.",
      },
      { type: "h3", text: "Argument essay" },
      {
        type: "p",
        text: "You get a prompt (often a quotation) and write a persuasive essay using your own evidence. Evidence can come from history, literature, current events, or personal experience. This rewards students who read broadly.",
      },
      { type: "h2", text: "The 6-point rubric (all three essays)" },
      {
        type: "ul",
        items: [
          "1 point: Thesis that responds to the prompt with a defensible claim",
          "4 points: Evidence and commentary (the biggest pool of points by far)",
          "1 point: Sophistication, an elevated quality of reasoning or style",
        ],
      },
      {
        type: "p",
        text: "The evidence and commentary score breaks down as follows. 1 point: general evidence with some connection. 2 points: specific evidence, minimal commentary. 3 points: specific evidence, commentary connects evidence to claim. 4 points: specific evidence, commentary consistently and clearly explains how evidence supports argument.",
      },
      { type: "h2", text: "Rhetorical devices you should actually know" },
      {
        type: "ul",
        items: [
          "Ethos, pathos, logos (appeals)",
          "Tone, mood (both relate to feeling, but tone is the author's, mood is the reader's)",
          "Diction (word choice) and syntax (sentence structure)",
          "Anaphora, epistrophe, chiasmus (repetition schemes)",
          "Juxtaposition, antithesis (contrast)",
          "Metaphor, simile, synecdoche, metonymy",
          "Irony (verbal, situational, dramatic)",
          "Hypophora, rhetorical question",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Never write 'the author uses ethos to appeal to ethos' or 'the author uses pathos to make the reader feel emotion.' Identify what the device does specifically in the passage. If the author cites their own military service, the ethos is personal credibility; explain why that matters for the argument.",
      },
      { type: "h2", text: "The multiple choice section" },
      {
        type: "p",
        text: "Two types of passages. Reading passages come first: you read a text and answer questions about rhetorical choices. Writing revision passages come second: you look at a student draft and pick the best revision.",
      },
      {
        type: "p",
        text: "Strategy. Read the passage first, even if it is long. Read the questions before rereading if you run short on time. For revision questions, the correct answer is usually the most concise and the most logical in context.",
      },
      { type: "h2", text: "How to practice in the last 30 days" },
      {
        type: "ol",
        items: [
          "Read one op-ed or long-form article every day. Mark the claims, evidence, and rhetorical moves.",
          "Write one essay a week under timed conditions. Alternate synthesis, rhetorical analysis, and argument.",
          "Review your scored essays with the rubric in hand. Identify which row of the rubric cost you points.",
          "Do one full MCQ section each week. Review every wrong answer.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Summarizing instead of analyzing. Rhetorical analysis has to explain how and why, not just what.",
          "Missing the sophistication point by writing safely. Take a complex position and defend it.",
          "Listing devices without explaining their effect.",
          "Running out of time on the third essay. Keep a clock on your desk.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can score your Lang essays using the College Board rubric and tell you exactly which row you fell short on. It can also analyze passages with you and point out rhetorical choices you missed. Free tier covers AP Lang.",
      },
      {
        type: "p",
        text: "Rhetoric is just the art of making an argument. Notice how others do it, then do it better. That is the whole course.",
      },
    ],
  },
  {
    slug: "ap-precalculus-review-guide",
    title: "AP Precalculus Review Guide: All 4 Units Explained",
    metaTitle: "AP Precalculus Review Guide: All 4 Units (2026 Exam)",
    description:
      "A complete AP Precalculus review guide covering all 4 units, function behavior, trig, polar, and the skills the new AP Precalculus exam tests. Practical, no-fluff prep.",
    excerpt:
      "AP Precalculus is the newest AP math exam and the one with the least released material. This unit-by-unit guide covers every topic on the CED, with the function analysis skills the exam actually tests.",
    date: "2026-04-25",
    readTime: "8 min read",
    category: "AP Precalculus",
    keywords: [
      "AP Precalculus",
      "AP Precalc review",
      "AP Precalculus study guide",
      "polynomial functions",
      "trigonometric functions",
      "AP Precalc units",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Precalculus launched in 2023 and is still building its body of released questions. Students who take it often feel like they are learning the course blind. This guide walks through every unit on the CED with the skills that the released exams have emphasized so far.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "3 hours. Section I is 40 multiple choice in 2 hours, split into a no-calculator and calculator-allowed part. Section II is 4 free response in 60 minutes, also split. The course covers 4 units but Unit 4 is not tested on the exam (only Units 1-3 appear).",
      },
      { type: "h2", text: "Unit 1: Polynomial and Rational Functions" },
      {
        type: "p",
        text: "About 30 to 40 percent. Topics: rates of change (average, instantaneous, concavity introduced without limits), polynomial end behavior, zeros, complex zeros, rational functions, asymptotes, transformations.",
      },
      {
        type: "p",
        text: "Skills. Describe end behavior using leading term and degree. Find zeros by factoring or using the rational root theorem. Identify vertical, horizontal, and slant asymptotes of rational functions. Apply transformations (shifts, stretches, reflections).",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Precalc distinguishes between 'concave up' and 'concave down' without requiring calculus. Concave up means the rate of change is increasing. Concave down means it is decreasing. Learn this phrasing: it shows up on every FRQ.",
      },
      { type: "h2", text: "Unit 2: Exponential and Logarithmic Functions" },
      {
        type: "p",
        text: "About 27 to 40 percent. Topics: exponential models, logarithmic functions, solving exponential and log equations, semi-log plots, inverse functions, regression.",
      },
      {
        type: "p",
        text: "Skills. Exponential functions have equal ratios over equal changes in x. Linear functions have equal differences. Solve exponential equations by taking logs. Use properties: log(ab) equals log a plus log b; log(a to the n) equals n log a. Interpret a in y equals a times b to the x as the initial value and b as the growth factor.",
      },
      { type: "h2", text: "Unit 3: Trigonometric and Polar Functions" },
      {
        type: "p",
        text: "About 30 to 40 percent. Topics: unit circle, sine, cosine, tangent, graphs of trig functions, inverse trig, equations, identities, polar coordinates, polar graphs.",
      },
      {
        type: "p",
        text: "Skills. Memorize the unit circle for multiples of pi over 6 and pi over 4. Sine of theta equals y coordinate; cosine of theta equals x coordinate on the unit circle. Amplitude, period, and phase shift in y equals A sin(B(x minus C)) plus D.",
      },
      {
        type: "p",
        text: "Polar. Convert points between polar and cartesian. Graph simple polar curves (circles, limacons, roses). Recognize r equals a cos theta as a circle centered at (a over 2, 0) with radius a over 2.",
      },
      { type: "h2", text: "Unit 4: Functions Involving Parameters, Vectors, and Matrices" },
      {
        type: "p",
        text: "Not assessed on the AP exam, but often covered in the class. Topics: parametric functions, vectors, matrices as transformations.",
      },
      {
        type: "p",
        text: "If your teacher covers this unit, engage. It is a head start on Calc BC and on linear algebra. But if you are short on study time for the AP exam, prioritize Units 1-3.",
      },
      { type: "h2", text: "The function analysis framework" },
      {
        type: "p",
        text: "The AP Precalculus exam rewards students who can describe function behavior in precise language. Every FRQ has some version of the following:",
      },
      {
        type: "ol",
        items: [
          "Identify intervals where the function is increasing or decreasing.",
          "Identify intervals where the function is concave up or concave down.",
          "Identify relative and absolute extrema.",
          "Describe the end behavior as x approaches plus or minus infinity.",
          "Describe the rate of change: increasing, decreasing, or constant.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Using calculus notation (derivatives) on precalc answers. Describe behavior in words, not with f prime.",
          "Confusing 'the function is increasing' with 'the rate of change is increasing.' A function can be increasing while its rate of change decreases.",
          "Dropping the plus 2 pi k or plus pi k when solving trig equations.",
          "Forgetting that log of zero and log of negative numbers are undefined.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep has the full AP Precalculus CED indexed, and the tutor will walk you through any problem you paste using the language the exam expects. Free tier covers Precalc.",
      },
      {
        type: "p",
        text: "Precalc is about being fluent in the language of functions. Once you can describe what a function is doing in precise words, the exam is a well-labeled map.",
      },
    ],
  },
  {
    slug: "how-to-study-for-ap-exams-final-30-days",
    title: "How to Actually Study for AP Exams in the Final 30 Days",
    metaTitle: "AP Exam Study Plan: The Realistic Last 30 Days (2026)",
    description:
      "A practical 30-day AP exam study plan that actually fits into a busy student's week. Covers how to prioritize content, drill FRQs, and avoid common last-month mistakes.",
    excerpt:
      "Thirty days before the AP exam is the highest-leverage time to study. Here is a realistic plan for those final four weeks, built around what actually moves the score, not what feels productive.",
    date: "2026-04-30",
    readTime: "8 min read",
    category: "Study Strategy",
    keywords: [
      "AP exam study plan",
      "how to study for AP exams",
      "30 day AP study plan",
      "AP exam prep",
      "last month AP exam",
      "AP study schedule",
    ],
    author: "FinalsPrep Team",
    type: "general",
    content: [
      {
        type: "p",
        text: "Most AP students do not fail because they did not start studying. They fail because the last month of studying was the wrong studying. Rereading the textbook and highlighting notes does almost nothing. Taking a timed FRQ, scoring it honestly, and then drilling the exact weakness it revealed does almost everything.",
      },
      {
        type: "p",
        text: "Here is the plan we walk students through in the final thirty days. It works for any AP course because the structure is the same even when the subject changes.",
      },
      { type: "h2", text: "Week 4 out: take a diagnostic" },
      {
        type: "p",
        text: "Day 1. Take a full released AP exam under timed conditions. No notes. No phone. Finish it. Score it yourself using the rubric.",
      },
      {
        type: "p",
        text: "This is painful and that is the point. You are not trying to feel good. You are trying to find the exact gaps. Make a list of every missed topic, every unit where your FRQ lost points, and every type of multiple choice question you got wrong.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Do not skip the diagnostic even if you feel unprepared. The worse your diagnostic, the more leverage you have in the next three weeks. You are measuring where to spend time, not proving that you are smart.",
      },
      { type: "h2", text: "Week 3 out: drill your weakest units" },
      {
        type: "p",
        text: "Spend the week on the two units where your diagnostic was weakest. Not every unit. Two. You get diminishing returns from spreading yourself thin.",
      },
      {
        type: "ol",
        items: [
          "Monday, Tuesday, Wednesday: work through the weakest unit. Reread notes, drill 20 to 30 practice problems.",
          "Thursday, Friday: work through the second weakest unit. Same approach.",
          "Saturday: timed FRQ from each unit. Score yourself.",
          "Sunday: rest, or a short review of the week.",
        ],
      },
      { type: "h2", text: "Week 2 out: full FRQ practice" },
      {
        type: "p",
        text: "Now you pivot from content to FRQ fluency. Every day this week, do one timed FRQ (25 to 45 minutes depending on the exam). Score it honestly using the official rubric.",
      },
      {
        type: "p",
        text: "The rubric is the whole game. Graders are trained to look for specific moves. If your essay does not include contextualization, you lose the point, even if your thesis is beautiful. If your math FRQ does not label units, you lose the point, even if the final number is right. Learn what the rubric wants, and give it.",
      },
      { type: "h2", text: "Week 1 out: second full practice exam" },
      {
        type: "p",
        text: "Take a second full released exam, timed, mid-week. Compare to your diagnostic. You should see improvement in the units you drilled.",
      },
      {
        type: "p",
        text: "Use the rest of the week for light review. Reread your summary sheets. Review the formulas you still forget. Sleep.",
      },
      {
        type: "callout",
        variant: "warn",
        text: "Do not cram the night before. For any AP exam, the marginal content you learn in the last 12 hours is worth less than the cognitive function you lose from bad sleep. Seven to eight hours is the move.",
      },
      { type: "h2", text: "The things that look like studying but are not" },
      {
        type: "ul",
        items: [
          "Rereading the textbook without taking notes or testing yourself.",
          "Watching review videos without pausing to work problems.",
          "Highlighting. Highlighting does nothing.",
          "Making beautiful notes you never open again.",
          "Studying the units you already know well because they feel easier.",
        ],
      },
      { type: "h2", text: "The things that actually move the score" },
      {
        type: "ul",
        items: [
          "Active recall. Close the book and write down what you remember.",
          "Practice problems. Especially ones you get wrong.",
          "Timed FRQs with honest self-scoring.",
          "Reviewing the rubric for your specific exam.",
          "Spaced repetition of key facts and formulas.",
        ],
      },
      { type: "h2", text: "A daily schedule that actually fits in" },
      {
        type: "p",
        text: "Ninety minutes per weekday is enough if you use it right. Forty-five minutes of focused content review. Forty-five minutes of practice problems or an FRQ. On weekends, one longer session (2 to 3 hours) with a full practice section.",
      },
      {
        type: "p",
        text: "If you only have sixty minutes, drop the review and keep the problems. Drilling beats reading every day of the week.",
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep is built for this kind of focused practice. Paste a problem, get a walkthrough. Drill by unit. Score your own FRQs against the rubric. The free tier gives you 10,000 tokens a day, which is roughly a full ninety-minute session.",
      },
      {
        type: "p",
        text: "Thirty days is enough. Not enough to learn a full course from scratch, but enough to close the gap between where you are now and the next score band. Diagnose, drill, retest, rest. That is the plan.",
      },
    ],
  },
  {
    slug: "ap-exam-day-checklist",
    title: "AP Exam Day Checklist: What to Bring and What to Expect",
    metaTitle: "AP Exam Day Checklist: What to Bring and Expect (2026)",
    description:
      "A complete AP exam day checklist covering what to bring, what to eat, what to expect at the testing site, and how to manage nerves. Built on what actually happens.",
    excerpt:
      "Every year students show up to the AP exam missing a required item or eating a bad breakfast. Here is the checklist we wish someone had given us: what to bring, what to expect, and how to handle the nerves.",
    date: "2026-04-29",
    readTime: "8 min read",
    category: "Exam Day",
    keywords: [
      "AP exam day",
      "AP exam checklist",
      "what to bring to AP exam",
      "AP test day",
      "AP exam tips",
      "AP testing site",
    ],
    author: "FinalsPrep Team",
    type: "general",
    content: [
      {
        type: "p",
        text: "The AP exam is mostly decided in the weeks of studying before it. But a bad exam day can absolutely cost you a score band. This is the checklist we wish someone had handed us: what to pack, what to eat, and what to actually expect when you walk in.",
      },
      { type: "h2", text: "What you must bring" },
      {
        type: "ul",
        items: [
          "Photo ID (required at some testing sites, always check yours)",
          "Multiple No. 2 pencils (for multiple choice, bubble sheets)",
          "Black or dark blue pens (for free response essays)",
          "Approved calculator with fresh batteries (and a spare set)",
          "Watch without audible alarm or smart features (test rooms often have no clock)",
          "A sweater or layers (test rooms are notoriously hot or cold)",
          "Water bottle and a snack for breaks",
        ],
      },
      { type: "h2", text: "What you must not bring" },
      {
        type: "ul",
        items: [
          "Phone, smartwatch, fitness tracker, earbuds (all banned; if you bring one, you might lose your score)",
          "Scratch paper (provided in the test book)",
          "Your own formula sheet (provided where needed)",
          "Notes of any kind",
          "Food inside the testing room (usually you can eat during the break)",
          "A mechanical pencil for bubble sheets (No. 2 wood pencils bubble more reliably)",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        text: "Phones in the room are a disqualification risk even if powered off. The safest move is to leave it in your car or locker. If your school does not have a secure place, ask the proctor ahead of time. Do not find out at the door.",
      },
      { type: "h2", text: "The night before" },
      {
        type: "ol",
        items: [
          "Lay out everything on the checklist the night before. Do not do it at 7 AM.",
          "Eat a normal dinner. Not your favorite spicy food if you are nervous.",
          "Avoid any new caffeine routines. If you do not drink coffee, do not start now.",
          "Sleep 7 to 9 hours. The single best thing you can do for your score that night.",
          "Set two alarms. The AP exam is not the time to oversleep.",
        ],
      },
      { type: "h2", text: "The morning of" },
      {
        type: "p",
        text: "Eat breakfast with protein and complex carbs. Eggs, toast, oatmeal, peanut butter. Not a donut or a sugary cereal; you will crash an hour in. Drink some water but not so much that you need the bathroom mid-section.",
      },
      {
        type: "p",
        text: "Arrive 20 to 30 minutes early. Parking is harder than you think. The proctor usually opens the room about 15 minutes before start time. Use the extra time to use the bathroom and settle your nerves.",
      },
      { type: "h2", text: "What the testing room is actually like" },
      {
        type: "p",
        text: "The proctor will read instructions from a script. This takes 15 to 30 minutes. During that time, you cannot open the booklet, take notes, or start. Just listen.",
      },
      {
        type: "p",
        text: "You will get a short break between the multiple choice and free response sections. Use it. Eat your snack. Drink water. Go to the bathroom. Do not look at notes (you cannot) or talk about the test with other students (you are not supposed to).",
      },
      { type: "h2", text: "Pacing for the multiple choice section" },
      {
        type: "p",
        text: "Know your per-question time budget in advance. If the section is 45 questions in 60 minutes, you have 1 minute 20 seconds per question. Never spend more than 2 minutes on a single question. If you are stuck, mark it, skip it, and come back.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "There is no penalty for wrong answers on any AP exam. Bubble every question, even the ones you are guessing on. A blind guess is 20 percent. A guess after eliminating one option is 25 percent. Those add up.",
      },
      { type: "h2", text: "Pacing for the free response section" },
      {
        type: "p",
        text: "Look at the question count and the time budget. Divide. Stick to it ruthlessly. A perfect first essay and a blank last essay is worse than two average essays.",
      },
      {
        type: "p",
        text: "Leave 5 minutes at the end to reread. Catch the silly mistakes. Label units. Double-check a formula. The highest ROI 5 minutes of the entire test.",
      },
      { type: "h2", text: "When nerves hit" },
      {
        type: "p",
        text: "If your heart is racing when the proctor hands out the booklet, that is normal. Box breathing: inhale 4 seconds, hold 4, exhale 4, hold 4. Three cycles and your pulse drops noticeably.",
      },
      {
        type: "p",
        text: "If you hit a question that makes you panic, skip it. Your brain is not reliable when it is in fight-or-flight. Move to a question you can answer. Come back when your rhythm is back.",
      },
      { type: "h2", text: "After the exam" },
      {
        type: "p",
        text: "Do not ask your friends how they did. Scores come out in July. No amount of comparing notes now will change anything, and it almost always makes one of you feel worse about an answer that was actually correct.",
      },
      {
        type: "p",
        text: "Take the rest of the day off. You earned it.",
      },
      {
        type: "callout",
        variant: "note",
        text: "If you want to practice exam-day conditions before the real thing, FinalsPrep can run you through timed MCQ sections and FRQs in the same format. Free tier is enough for a couple of full sections.",
      },
    ],
  },
  {
    slug: "best-ap-study-schedule",
    title: "How to Build an AP Study Schedule That Actually Fits Your Life",
    metaTitle: "The Best AP Study Schedule for Busy Students (2026)",
    description:
      "How to build a realistic AP study schedule around school, sports, and everything else. Covers weekly plans, daily session structure, and the habits that actually stick.",
    excerpt:
      "Nobody has four uninterrupted hours a day to study for AP exams, and anyone who tells you they do is lying. Here is how to build a study schedule that actually fits around your real life.",
    date: "2026-04-28",
    readTime: "7 min read",
    category: "Study Strategy",
    keywords: [
      "AP study schedule",
      "AP exam study plan",
      "how to study for AP",
      "AP prep schedule",
      "balancing AP classes",
      "AP study habits",
    ],
    author: "FinalsPrep Team",
    type: "general",
    content: [
      {
        type: "p",
        text: "Google 'best AP study schedule' and you will get a dozen articles telling you to study 3 hours a day starting in January. If you have a sport, a job, or more than one AP class, that plan is fiction. Here is how to build one that works around real life.",
      },
      { type: "h2", text: "Start with honest math" },
      {
        type: "p",
        text: "Count your weekly hours. Subtract school, sleep, practice, work, and meals. What you have left is your actual study budget. For most students it is 8 to 15 hours per week, spread across all classes, not just AP.",
      },
      {
        type: "p",
        text: "Accept that number. Do not plan a schedule that assumes you have more. Build for the life you actually live.",
      },
      { type: "h2", text: "Pick your top priorities" },
      {
        type: "p",
        text: "If you are taking two AP classes, you can give each one 4 to 7 hours a week. If you are taking five, you cannot study each of them equally. You have to pick.",
      },
      {
        type: "ul",
        items: [
          "Which AP exams do you need to pass for college credit? Those get priority.",
          "Which are you closest to failing? Those need triage.",
          "Which do you genuinely enjoy? Keep those sustainable so you do not burn out.",
          "Which have the lowest-stakes outcomes for you personally? Those can get the minimum.",
        ],
      },
      { type: "h2", text: "The template: 5 short sessions beats 1 long one" },
      {
        type: "p",
        text: "Research on learning is clear. Five 45-minute sessions distributed across a week beat one 4-hour session on Sunday. Your brain consolidates knowledge between sessions. Long blocks produce diminishing returns past about 90 minutes.",
      },
      {
        type: "p",
        text: "A week that works: 45 minutes on Monday, Tuesday, Thursday, and Friday, plus one 90-minute session on Saturday for practice problems or a timed FRQ. That is 5 hours of AP study per subject, distributed.",
      },
      { type: "h2", text: "Structure each session" },
      {
        type: "p",
        text: "A good 45-minute session has a shape:",
      },
      {
        type: "ol",
        items: [
          "5 minutes: review what you did last session. Write down what you remember without looking at notes.",
          "30 minutes: new content or practice problems. One specific topic, not 'everything.'",
          "10 minutes: self-test. Close the book. Write a summary or do a problem from memory.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "The self-test at the end is the highest-leverage part of the session. It is also the part students skip most often. If you only have time for one thing, make it the self-test.",
      },
      { type: "h2", text: "The weekly review" },
      {
        type: "p",
        text: "Once a week, spend 30 minutes reviewing what you covered in the previous week and the weeks before. This is spaced repetition, and it is the reason anything sticks long enough to show up on the AP exam in May.",
      },
      {
        type: "p",
        text: "Keep a summary sheet per unit as you go. Two pages max. Formulas, key concepts, classic problem types. The sheets become your final review material in the last week.",
      },
      { type: "h2", text: "What to do when life hits" },
      {
        type: "p",
        text: "You will miss days. Your sport will have a tournament. You will get sick. Accept it.",
      },
      {
        type: "p",
        text: "The plan is for the good weeks. Bad weeks, do what you can (even 20 minutes). Do not try to make up missed time by studying 5 hours one day. You will just burn out and skip the next three days.",
      },
      { type: "h2", text: "Sample schedules for different student types" },
      { type: "h3", text: "The 2-AP student with a sport" },
      {
        type: "p",
        text: "Goal: 3 hours per AP per week. Split: 30 min after school Mon/Wed/Fri, 90 min Sunday morning. Alternate between the two APs: one gets Mon/Wed, the other gets Tue/Thu, Sunday alternates weekly.",
      },
      { type: "h3", text: "The 4-AP student" },
      {
        type: "p",
        text: "Goal: 2 hours per AP per week. Impossible to give each one a daily slot, so rotate. Focus 3 days on two APs (60 min each), 3 days on the other two, Sunday is practice problems or FRQ practice on whichever is weakest.",
      },
      { type: "h3", text: "The self-studier" },
      {
        type: "p",
        text: "No class to reinforce the content, so you need more time. 5 hours a week minimum. Block two weeknights (90 min each) for new content. Saturday morning for practice problems (90 min). Use a single resource (textbook, course, tutor) as the spine, not a dozen.",
      },
      { type: "h2", text: "The habits that make schedules stick" },
      {
        type: "ul",
        items: [
          "Same time each day. Brains love routine.",
          "Same place. Your brain associates the environment with the activity.",
          "Phone in another room. You save the willpower for the work.",
          "Start small. A 15-minute session is better than a skipped 60-minute one. Momentum matters.",
          "Track your sessions. Check off a box each day. It is weirdly motivating.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can build a schedule for you based on your exam date and daily availability, and keep a simple streak counter so you can see your consistency. It also keeps a record of which topics you have already worked through, so you do not re-study the same thing.",
      },
      {
        type: "p",
        text: "The best schedule is the one you actually do. Plan for your real life, not the life of a person with unlimited time. Small, consistent, structured. That is the whole formula.",
      },
    ],
  },
  {
    slug: "self-study-ap-exams-guide",
    title: "How to Self-Study for an AP Exam Without Taking the Class",
    metaTitle: "How to Self-Study for AP Exams: The Complete Guide (2026)",
    description:
      "A complete guide to self-studying for AP exams without the class. Covers course selection, resources, timelines, and the self-study strategies that consistently earn 4s and 5s.",
    excerpt:
      "Self-studying an AP exam is harder than taking the class but completely doable. Here is the full guide to picking the right AP to self-study, finding resources, building a timeline, and actually getting the score.",
    date: "2026-04-27",
    readTime: "7 min read",
    category: "Self-Study",
    keywords: [
      "self-study AP exam",
      "how to self-study AP",
      "AP exam without class",
      "self-study AP Psychology",
      "self-study AP Human Geography",
      "AP self-study guide",
    ],
    author: "FinalsPrep Team",
    type: "general",
    content: [
      {
        type: "p",
        text: "Every year thousands of students take AP exams without taking the class. Most do fine. Some get 5s. The ones who fail usually made the same handful of mistakes: picked the wrong AP to self-study, started too late, used too many resources, or never did timed practice.",
      },
      {
        type: "p",
        text: "Here is the complete playbook for self-studying an AP exam and actually getting the score you need.",
      },
      { type: "h2", text: "Pick the right AP to self-study" },
      {
        type: "p",
        text: "Not every AP is a good candidate for self-study. Some require lab work. Some have huge content volume that benefits from classroom pacing. Some have writing-heavy exams that need feedback to improve.",
      },
      { type: "h3", text: "Good for self-study" },
      {
        type: "ul",
        items: [
          "AP Psychology: high-volume content but manageable without a class",
          "AP Human Geography: shortest exam, clear models",
          "AP Environmental Science: wide content, lightly technical",
          "AP Comparative Government: small but focused",
          "AP Microeconomics or AP Macroeconomics: self-contained, model-heavy",
        ],
      },
      { type: "h3", text: "Harder to self-study" },
      {
        type: "ul",
        items: [
          "AP Chemistry, AP Physics 1 and 2, AP Biology: heavy on labs and technical skills",
          "AP English Language, AP English Literature: essays need feedback",
          "AP Calculus BC: doable, but the content volume is high",
          "AP US History, AP World History, AP European History: content is fine to self-study but essay practice without feedback is a real limitation",
        ],
      },
      { type: "h2", text: "Set a realistic timeline" },
      {
        type: "p",
        text: "If you are starting in the fall (September, October), you have 7 to 8 months. That is plenty. If you start in January, you have 4 months, which is tight but doable. Starting in March for a May exam is hard mode and only realistic for the shorter APs.",
      },
      {
        type: "p",
        text: "Rough budget: 100 hours total for a mid-difficulty AP (Psych, HuG, APES). 150 to 200 hours for content-heavy courses (US History, World History). 200 plus for technical courses (Calc, Physics).",
      },
      {
        type: "callout",
        variant: "tip",
        text: "The biggest mistake self-studiers make is starting late and panicking. If you are cramming an AP in 4 weeks, pick a high-leverage exam (Psych, HuG) and ignore the rest. Do not try to 4-week an AP US History from a standing start.",
      },
      { type: "h2", text: "Pick one main resource and stick with it" },
      {
        type: "p",
        text: "The trap: you buy a Princeton Review book, watch Khan Academy, use Albert, subscribe to a YouTube channel, and try to do all of them. You never finish any of them, and the content in each is different enough to confuse you.",
      },
      {
        type: "p",
        text: "Pick one primary resource. A prep book, a course, or a tutor. Work through it end to end. Use secondary resources only to fill specific gaps. When you feel stuck, resist the urge to switch resources; dig into that specific topic.",
      },
      { type: "h2", text: "Match your study to the exam format" },
      {
        type: "p",
        text: "Do not just read. Practice in the format the exam uses. If the exam has multiple choice, drill multiple choice. If it has FRQs, write FRQs. If it has DBQs, write DBQs.",
      },
      {
        type: "p",
        text: "Rough weekly balance for self-study: 60 percent new content, 30 percent practice problems, 10 percent timed sections. As you get closer to May, shift toward more practice and fewer new topics.",
      },
      { type: "h2", text: "The big three resources" },
      { type: "h3", text: "1. The College Board CED" },
      {
        type: "p",
        text: "Free. This is the official course and exam description. It tells you exactly what is on the exam, with weights per unit. Read it first. Many self-studiers skip this and end up studying topics that are not even on the exam.",
      },
      { type: "h3", text: "2. A prep book" },
      {
        type: "p",
        text: "Princeton Review or Barrons are the two that students rate highly for most APs. They are condensed, aligned with the current CED, and include practice tests. Buy one. Do not buy three.",
      },
      { type: "h3", text: "3. A practice resource with feedback" },
      {
        type: "p",
        text: "This is where self-study usually breaks. Content you can get from a book. Feedback on your FRQs is what you do not have. Released AP FRQs with scoring commentary (free from the College Board) are the gold standard. An AI tutor that scores your work honestly is a decent second.",
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep is specifically good for self-study because it works the way a class would: walking through problems step by step, quizzing you on units, scoring your FRQs against the real rubric. Free tier gives you enough to self-study a full course at a reasonable pace.",
      },
      { type: "h2", text: "The monthly structure" },
      {
        type: "ol",
        items: [
          "Month 1: survey the course. Read the CED. Work through the prep book end to end lightly. Get the big picture.",
          "Month 2 and 3: deep dive unit by unit. Practice problems per unit. Take unit quizzes.",
          "Month 4 (if you have it): more practice. Start doing timed MCQs. Write your first FRQs.",
          "Final month: two full practice exams. Drill weak units. Refine FRQ technique.",
          "Final week: light review. Sleep. Show up.",
        ],
      },
      { type: "h2", text: "Common self-study mistakes" },
      {
        type: "ul",
        items: [
          "Studying passively: watching videos without pausing to practice.",
          "Not writing FRQs because it feels unproductive. It is the most productive thing you can do.",
          "Using the wrong resources. Outdated prep books for courses that have been redesigned (AP Psych, AP Precalc).",
          "Not taking a single full timed practice exam. You have to know what 3 hours of testing feels like.",
          "Giving up in February because the material got hard. Every AP course gets hard in the middle. Push through.",
        ],
      },
      { type: "h2", text: "Registering for the exam" },
      {
        type: "p",
        text: "Register through your school, even if you are not taking the class. Some schools let self-studiers register easily; some make it hard. Ask your counselor in September or October, not in April. Deadlines are earlier than students expect.",
      },
      {
        type: "p",
        text: "If your school does not proctor the exam, call nearby schools. Some schools allow outside students to test for a fee. The College Board has a tool to find proctoring sites if you are really stuck.",
      },
      {
        type: "p",
        text: "Self-studying an AP is a meaningful credential and a useful skill for the rest of your life. It is also hard in ways that a class is not. Start early, pick one resource, practice in the format, and do not try to do too many at once.",
      },
    ],
  },
  {
    slug: "how-to-use-ai-tutor-for-ap-prep",
    title: "How to Use an AI Tutor for AP Prep (Without Ruining Your Learning)",
    metaTitle: "How to Use AI Tutors for AP Exam Prep: The Smart Way (2026)",
    description:
      "How to use AI tutors like FinalsPrep for AP exam prep without shortcutting your learning. Covers what AI does well, where it falls short, and how to structure effective sessions.",
    excerpt:
      "AI tutors can absolutely help with AP prep. They can also absolutely ruin your learning if you use them wrong. Here is the framework for getting the benefit without the cost.",
    date: "2026-04-26",
    readTime: "7 min read",
    category: "Study Strategy",
    keywords: [
      "AI tutor for AP prep",
      "using AI for AP exams",
      "AI tutoring AP exam",
      "AI homework help",
      "effective AI studying",
      "AP prep AI",
    ],
    author: "FinalsPrep Team",
    type: "general",
    content: [
      {
        type: "p",
        text: "AI tutors are now good enough to replace a substantial portion of what a human tutor does. They are also good enough to ruin your learning if you use them as an answer machine. The difference between the two outcomes is entirely about how you use them.",
      },
      {
        type: "p",
        text: "This is not about FinalsPrep specifically. It applies to any AI tutor, including general ones like ChatGPT. The principles are the same.",
      },
      { type: "h2", text: "What AI tutors are actually good at" },
      {
        type: "ul",
        items: [
          "Walking through a problem step by step in plain language.",
          "Answering the question behind the question when you are stuck.",
          "Generating practice problems at any difficulty level.",
          "Quizzing you on flashcard-style content.",
          "Explaining the same concept three different ways until one lands.",
          "Being available at midnight when you are panicked about tomorrow's test.",
        ],
      },
      { type: "h2", text: "What AI tutors are bad at" },
      {
        type: "ul",
        items: [
          "Noticing that you are pretending to understand when you are not.",
          "Calibrating how much to say. Sometimes they give you way too much.",
          "Providing emotional accountability. They will not nag you to study.",
          "Remembering you unless you give them context each session.",
          "Knowing the specific rubric at your specific school.",
          "Spotting your pattern of wrong answers over weeks.",
        ],
      },
      { type: "h2", text: "The golden rule" },
      {
        type: "callout",
        variant: "tip",
        text: "Use the AI tutor to explain the concept. Use yourself to practice the problem. If you are typing in problems and copying the final answer, you are not learning; you are laundering work through a chatbot.",
      },
      { type: "h2", text: "The four-question framework" },
      {
        type: "p",
        text: "When you are stuck on a problem, ask the AI in this specific order. Do not skip to the last one.",
      },
      {
        type: "ol",
        items: [
          "What concept is this problem about? (You are checking whether you identified the right topic.)",
          "What should my first step be? (You are checking your entry point, not the answer.)",
          "Is my setup correct? (Paste your work. This catches setup errors before you go further.)",
          "I am still stuck, can you walk me through it? (Reserve this for real dead ends.)",
        ],
      },
      {
        type: "p",
        text: "By the time you get to step 4, you have already tried. The walkthrough sticks because you engaged with the problem first. Students who go straight to step 4 learn very little.",
      },
      { type: "h2", text: "Sessions that actually work" },
      { type: "h3", text: "Session type 1: concept review" },
      {
        type: "p",
        text: "You want to understand a specific concept (say, Le Chatelier's principle). Ask the AI to explain it. Then ask follow-ups: why does pressure only affect equilibria with different gas moles? What happens if I add an inert gas? Each question you ask is a signal of what you do not yet understand.",
      },
      { type: "h3", text: "Session type 2: problem drilling" },
      {
        type: "p",
        text: "Ask the AI to generate 5 problems on a specific topic at a specific difficulty. Work them without help. Then paste your work and ask the AI to score it. This is the closest you can get to a human tutor session.",
      },
      { type: "h3", text: "Session type 3: FRQ scoring" },
      {
        type: "p",
        text: "You wrote a full FRQ. You want it scored honestly. Paste your response and the official rubric, and ask for a point-by-point evaluation. The AI will tell you exactly which rubric points you earned and which you missed.",
      },
      { type: "h3", text: "Session type 4: targeted weakness drilling" },
      {
        type: "p",
        text: "You took a practice test. You missed all the related rates questions. Tell the AI. Ask for 10 related rates problems spanning the range of difficulty. Grind them. Ask for feedback on your pattern of errors.",
      },
      { type: "h2", text: "What not to do" },
      {
        type: "ol",
        items: [
          "Do not paste a problem and accept the first answer. Check it. AI tutors still get things wrong.",
          "Do not use AI to write your essays. Your teacher (and the AP exam) will notice the voice mismatch, and you learn nothing.",
          "Do not ask for 'the answer' as the first question. You will miss the reasoning.",
          "Do not use AI as your only resource. Combine it with a textbook, a class, or a prep book.",
          "Do not skip timed practice because AI makes it so easy to get answers. The exam is timed. Simulate that.",
        ],
      },
      { type: "h2", text: "When a specialized AI tutor beats a general one" },
      {
        type: "p",
        text: "General AI (like ChatGPT) is good at explaining things. Specialized AP tutors (like FinalsPrep) are tuned on the College Board CED, use the correct notation, follow the specific rubrics, and do not invent CED codes that do not exist. For AP-specific work, the specialized tool is usually better.",
      },
      {
        type: "p",
        text: "For general writing help, brainstorming, or non-AP topics, general AI is fine. Use the right tool for the job.",
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep is built around the AP CED, renders math and diagrams cleanly, and scores FRQs against the real College Board rubric. The free tier gives you enough daily tokens for a focused study session, and it remembers your course context across sessions.",
      },
      { type: "h2", text: "The test" },
      {
        type: "p",
        text: "Here is the check for whether you are using AI well. Close the tab. Try to do the problem from scratch on paper. If you can, the AI helped you learn. If you cannot, you used the AI to avoid learning.",
      },
      {
        type: "p",
        text: "AI tutors are a superpower when you use them right. Ask smart questions. Do the work. Then the score follows.",
      },
    ],
  },
];

// Sorts newest first by date for the blog index page.
export function getAllPostsSorted(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

// General posts (study strategy, exam day, AI tutoring). These get the
// top of the feed because they apply to any student regardless of which
// AP they are studying for, so they have broader appeal on first visit.
export function getGeneralPostsSorted(): BlogPost[] {
  return getAllPostsSorted().filter((p) => p.type === "general");
}

// Subject-specific posts. These are the per-course review guides; they
// live in their own section below the general posts on the index.
export function getSubjectPostsSorted(): BlogPost[] {
  return getAllPostsSorted().filter((p) => p.type === "subject");
}

// O(n) lookup is fine here: the list is small and this runs at build time.
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

// Grabs up to `limit` posts other than the current one, for the
// "keep reading" section on each post page. Prefers posts of the same
// type (subject-specific readers get more subject guides; general
// readers get more general posts), then falls back to any newest ones
// if that doesn't fill the slots.
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  const all = getAllPostsSorted().filter((p) => p.slug !== currentSlug);
  if (!current) return all.slice(0, limit);
  const sameType = all.filter((p) => p.type === current.type);
  const otherType = all.filter((p) => p.type !== current.type);
  return [...sameType, ...otherType].slice(0, limit);
}
