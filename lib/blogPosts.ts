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
      "study guide",
      "exam prep",
      "frq strategy",
      "science",
      "STEM",
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
      "study guide",
      "exam prep",
      "frq strategy",
      "science",
      "STEM",
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
    readTime: "18 min read",
    category: "AP Biology",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "science",
      "STEM",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Biology has more content than any other AP science, and the exam rewards students who can connect topics rather than just memorize isolated facts. If you understand the four big ideas (evolution, energy transfer, information transmission, and system interactions) and how each unit illustrates them, you can reason through questions on material you do not fully remember.",
      },
      {
        type: "p",
        text: "This guide walks unit by unit through the full CED, then shows the experimental-design and data-analysis patterns the exam keeps using. If you are more than two weeks out, use it as a map. If you are less than a week out, read it in one sitting and then drill FRQs.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "h3", text: "Exam structure and scoring" },
      {
        type: "ul",
        items: [
          "3 hours total.",
          "Section I (90 minutes): 60 multiple choice. Worth 50 percent of the score. Calculator allowed throughout.",
          "Section II (90 minutes): 6 free response: 2 long FRQs (one is always an experimental design / data analysis) and 4 short FRQs. Worth 50 percent.",
          "Formula sheet is provided (Hardy-Weinberg, chi-square, rates of change, Q10). You do not have to memorize them.",
          "Graders look for connections across units. An FRQ on photosynthesis can hide an evolution question inside it.",
        ],
      },
      { type: "h2", text: "Unit 1: Chemistry of Life" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "p",
        text: "About 8 to 11 percent of the exam. The foundation: water, macromolecules, and enzymes. Every later unit depends on this one.",
      },
      {
        type: "h3", text: "Water and chemistry basics" },
      {
        type: "ul",
        items: [
          "Water is polar because oxygen is more electronegative than hydrogen. This polarity drives cohesion, adhesion, surface tension, high specific heat, and high heat of vaporization.",
          "Hydrogen bonds form between water molecules and give water its life-supporting properties.",
          "pH: acidic solutions have more H plus ions, basic solutions have more OH minus ions. Buffers resist change in pH.",
          "Carbon is the backbone of life because it can form 4 stable covalent bonds, enabling long chains and rings.",
        ],
      },
      {
        type: "h3", text: "The four macromolecules" },
      {
        type: "ul",
        items: [
          "Carbohydrates: monomer is monosaccharide (glucose). Polymers include starch (energy storage in plants), glycogen (energy storage in animals), cellulose (plant cell walls).",
          "Lipids: not true polymers. Include fats (triglycerides), phospholipids (membrane bilayers), and steroids. Hydrophobic.",
          "Proteins: monomer is amino acid (20 types). Peptide bonds link them. Four levels of structure (primary sequence, secondary helix/sheet, tertiary 3D folding, quaternary multiple subunits).",
          "Nucleic acids: monomer is nucleotide (phosphate + sugar + base). DNA is double-stranded with deoxyribose and bases A, T, C, G. RNA is single-stranded with ribose and bases A, U, C, G.",
          "Dehydration synthesis (condensation) joins monomers by removing water. Hydrolysis breaks polymers by adding water.",
        ],
      },
      {
        type: "h3", text: "Enzymes" },
      {
        type: "ul",
        items: [
          "Enzymes are proteins (mostly) that lower activation energy, making reactions faster. They do NOT change delta G.",
          "Active site is the region where substrate binds. Shape complementarity (induced fit) drives specificity.",
          "Temperature and pH affect enzyme activity. Each enzyme has an optimum. Too hot denatures (unfolds) the enzyme; extreme pH does too.",
          "Inhibitors: competitive (binds active site, overcome by more substrate) vs non-competitive / allosteric (binds elsewhere, changes shape).",
        ],
      },
      { type: "h2", text: "Unit 2: Cell Structure and Function" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "p",
        text: "About 10 to 13 percent. Cell compartments, membranes, and transport. The surface-area-to-volume ratio theme starts here and returns in ecology.",
      },
      {
        type: "h3", text: "Cells and organelles" },
      {
        type: "ul",
        items: [
          "Prokaryotes (bacteria, archaea): no membrane-bound nucleus, no organelles, small, circular DNA, ribosomes.",
          "Eukaryotes (plants, animals, fungi, protists): membrane-bound nucleus, organelles, linear DNA, larger cells.",
          "Nucleus: houses DNA. Nucleolus makes ribosomes.",
          "Mitochondria: cellular respiration, makes ATP. Double membrane (evidence for endosymbiosis).",
          "Chloroplasts (plants only): photosynthesis. Also double membrane and own DNA.",
          "Endoplasmic reticulum: rough ER (ribosomes, protein synthesis), smooth ER (lipid synthesis, detoxification).",
          "Golgi apparatus: modifies, sorts, and ships proteins.",
          "Lysosomes: digestion. Vacuoles: storage (large central vacuole in plants).",
          "Cytoskeleton: microfilaments, intermediate filaments, microtubules. Gives shape, enables movement.",
        ],
      },
      {
        type: "h3", text: "Membranes and transport" },
      {
        type: "ul",
        items: [
          "Membranes are phospholipid bilayers with embedded proteins. Fluid mosaic model.",
          "Passive transport: no ATP needed. Diffusion (high to low concentration), osmosis (water), facilitated diffusion (through protein channel).",
          "Active transport: uses ATP, moves solutes against gradient. Example: sodium-potassium pump (3 Na out, 2 K in).",
          "Tonicity: hypertonic solution (cell loses water, shrivels), hypotonic (cell gains water, may burst), isotonic (no net movement).",
          "Bulk transport: endocytosis (in), exocytosis (out). Phagocytosis is cell-eating, pinocytosis is cell-drinking.",
        ],
      },
      { type: "h2", text: "Unit 3: Cellular Energetics" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "p",
        text: "About 12 to 16 percent. Photosynthesis and respiration. One of the heaviest and most important units. The reactions are mirror images.",
      },
      {
        type: "h3", text: "Photosynthesis" },
      {
        type: "ul",
        items: [
          "Overall: 6 CO2 + 6 H2O + light energy -> C6H12O6 + 6 O2.",
          "Light reactions (in thylakoid membrane): chlorophyll absorbs light, water splits (O2 released), NADP+ reduced to NADPH, ATP made via chemiosmosis.",
          "Calvin cycle (in stroma): CO2 fixed by RuBisCO onto RuBP, making G3P (sugar precursor). Uses ATP and NADPH from light reactions.",
          "C3, C4, CAM plants: different adaptations to prevent photorespiration in hot or dry climates.",
        ],
      },
      {
        type: "h3", text: "Cellular respiration" },
      {
        type: "ul",
        items: [
          "Overall: C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O + ATP energy.",
          "Glycolysis (cytoplasm): glucose splits into 2 pyruvate. Net 2 ATP and 2 NADH. Anaerobic.",
          "Pyruvate oxidation (mitochondrial matrix): pyruvate to acetyl-CoA, produces 2 NADH and 2 CO2.",
          "Krebs cycle (mitochondrial matrix): acetyl-CoA oxidized. Produces 2 ATP, 6 NADH, 2 FADH2, 4 CO2.",
          "Electron transport chain (inner mitochondrial membrane): NADH and FADH2 donate electrons. Protons pumped across membrane. Oxygen is final electron acceptor (makes water). About 32-34 ATP via chemiosmosis.",
          "Fermentation (anaerobic): glycolysis only. Lactic acid (animals) or ethanol (yeast) regenerates NAD+.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Photosynthesis and respiration are chemical mirror images. Photosynthesis uses light energy to build glucose from CO2 and H2O, releasing O2. Respiration breaks glucose using O2 to release CO2 and H2O, capturing energy as ATP. Both use electron transport chains and chemiosmosis to make ATP.",
      },
      { type: "h2", text: "Unit 4: Cell Communication and Cell Cycle" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "p",
        text: "About 10 to 15 percent. How cells talk to each other and how they reproduce. Cancer shows up when cell cycle control fails.",
      },
      {
        type: "h3", text: "Cell signaling" },
      {
        type: "ul",
        items: [
          "Three steps: reception (ligand binds receptor), transduction (signal cascade inside cell, often phosphorylation), response (gene expression, cell activity).",
          "G-protein coupled receptors (GPCR) and receptor tyrosine kinases are the main types.",
          "Second messengers amplify signals: cAMP, Ca2+.",
          "Signal transduction pathways are conserved across organisms (evidence of evolution).",
        ],
      },
      {
        type: "h3", text: "Cell cycle and division" },
      {
        type: "ul",
        items: [
          "Interphase: G1 (growth), S (DNA synthesis), G2 (prep for mitosis). Most of the cell's life.",
          "Mitosis: prophase, prometaphase, metaphase, anaphase, telophase. Then cytokinesis. Produces 2 identical diploid cells.",
          "Meiosis: two divisions (meiosis I and II) producing 4 genetically distinct haploid gametes. Crossing over in prophase I increases variation.",
          "Cell cycle checkpoints: G1/S (is the DNA damaged? are nutrients adequate?), G2/M (is DNA replicated correctly?), M (are chromosomes attached to spindle?). Cyclins and Cdks regulate.",
          "Cancer: uncontrolled cell division. Tumor suppressor genes (p53, Rb) prevent it; proto-oncogenes drive division. Mutations in either type can cause cancer.",
        ],
      },
      { type: "h2", text: "Unit 5: Heredity" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "p",
        text: "About 8 to 11 percent. Mendelian and non-Mendelian inheritance, chromosomes, chi-square. Combines well with Unit 6.",
      },
      {
        type: "h3", text: "Mendelian genetics" },
      {
        type: "ul",
        items: [
          "Law of segregation: alleles separate during gamete formation (one from each parent).",
          "Law of independent assortment: genes on different chromosomes assort independently.",
          "Punnett squares predict offspring ratios. 3:1 for monohybrid, 9:3:3:1 for dihybrid with independent genes.",
          "Test cross: cross unknown genotype with homozygous recessive to determine genotype.",
        ],
      },
      {
        type: "h3", text: "Non-Mendelian patterns" },
      {
        type: "ul",
        items: [
          "Incomplete dominance: heterozygotes show blended phenotype (red + white = pink).",
          "Codominance: both alleles expressed simultaneously (AB blood type).",
          "Multiple alleles: more than 2 alleles for a gene (ABO blood groups).",
          "Sex-linked: X-linked recessive traits (color blindness, hemophilia) more common in males.",
          "Polygenic: multiple genes affect one trait (skin color, height).",
          "Pleiotropy: one gene affects multiple traits (sickle cell).",
          "Epistasis: one gene masks another (coat color in mice).",
          "Linked genes: genes on same chromosome don't assort independently. Recombination frequency measures distance.",
        ],
      },
      {
        type: "h3", text: "Chi-square analysis" },
      {
        type: "ul",
        items: [
          "Test if observed ratios match expected (null hypothesis).",
          "Formula: sum of (observed minus expected) squared divided by expected.",
          "Degrees of freedom: number of categories minus 1.",
          "Critical value typically at p = 0.05. If chi-square is greater than critical value, reject null hypothesis.",
        ],
      },
      { type: "h2", text: "Unit 6: Gene Expression and Regulation" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "p",
        text: "About 12 to 16 percent. The central dogma (DNA to RNA to protein), regulation, mutations, and biotechnology. Combines with Unit 5 on many FRQs.",
      },
      {
        type: "h3", text: "DNA replication" },
      {
        type: "ul",
        items: [
          "Semiconservative: each new DNA molecule has one old strand and one new strand.",
          "Helicase unwinds DNA. DNA polymerase adds nucleotides 5' to 3'.",
          "Leading strand synthesized continuously, lagging strand synthesized in Okazaki fragments (then joined by ligase).",
          "Primers (RNA) start replication. Telomeres protect chromosome ends.",
        ],
      },
      {
        type: "h3", text: "Transcription and translation" },
      {
        type: "ul",
        items: [
          "Transcription (in nucleus): DNA to RNA. RNA polymerase reads DNA 3' to 5', builds mRNA 5' to 3'.",
          "mRNA processing: 5' cap and poly-A tail added. Introns spliced out, exons joined.",
          "Translation (at ribosomes): mRNA read in codons (3 bases = 1 amino acid). tRNA brings amino acids matching codons. Ribosome joins them into polypeptide.",
          "Genetic code: 64 codons for 20 amino acids. Start codon AUG (methionine). Stop codons UAA, UAG, UGA. Code is redundant (multiple codons per amino acid) but not ambiguous.",
        ],
      },
      {
        type: "h3", text: "Regulation of gene expression" },
      {
        type: "ul",
        items: [
          "Prokaryotes: operons. lac operon (inducible, turned ON in presence of lactose). trp operon (repressible, turned OFF in presence of tryptophan).",
          "Eukaryotes: regulation at multiple levels. Transcription factors bind promoter/enhancer regions. DNA methylation silences genes. Histone modification opens or closes chromatin.",
          "Post-transcriptional: alternative splicing (different exon combinations make different proteins from same gene).",
          "Post-translational: phosphorylation, ubiquitination modify protein activity.",
        ],
      },
      {
        type: "h3", text: "Mutations and biotechnology" },
      {
        type: "ul",
        items: [
          "Point mutations: substitutions can be silent (same amino acid), missense (different amino acid), or nonsense (premature stop).",
          "Frameshift mutations: insertions or deletions that shift reading frame, disrupting all downstream codons.",
          "Biotechnology: PCR amplifies DNA. Gel electrophoresis separates DNA by size. CRISPR edits genes. Restriction enzymes cut at specific sequences.",
        ],
      },
      { type: "h2", text: "Unit 7: Natural Selection" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "p",
        text: "About 13 to 20 percent. Evolution is the unifying idea of biology. Darwin, Hardy-Weinberg, speciation, phylogenetics. This is the heaviest unit along with Units 3 and 6.",
      },
      {
        type: "h3", text: "Evolution basics" },
      {
        type: "ul",
        items: [
          "Darwin: species change over time through natural selection. Variation exists, organisms compete for resources, fittest reproduce.",
          "Evidence for evolution: fossil record, anatomical homology (similar structures), molecular homology (similar DNA), embryology, biogeography, direct observation.",
          "Types of selection: directional (favors one extreme), stabilizing (favors average), disruptive (favors extremes).",
          "Genetic drift: random changes in allele frequency, more pronounced in small populations. Bottleneck and founder effects.",
          "Gene flow: migration moves alleles between populations.",
          "Mutation: introduces new alleles.",
        ],
      },
      {
        type: "h3", text: "Hardy-Weinberg equilibrium" },
      {
        type: "ul",
        items: [
          "Formulas: p + q = 1 (allele frequencies). p squared + 2pq + q squared = 1 (genotype frequencies).",
          "Five assumptions: no mutation, random mating, no selection, no migration, large population (no genetic drift). If ANY are violated, evolution is occurring.",
          "Use H-W to calculate expected allele and genotype frequencies, then test if population is evolving by comparing with observed.",
        ],
      },
      {
        type: "h3", text: "Speciation and phylogenetics" },
      {
        type: "ul",
        items: [
          "Biological species concept: groups that can interbreed and produce fertile offspring.",
          "Reproductive isolation: prezygotic (habitat, behavior, temporal, mechanical) or postzygotic (hybrid inviability, sterility).",
          "Allopatric speciation: geographic separation. Sympatric: without geographic separation (often in plants via polyploidy).",
          "Phylogenetic trees (cladograms): show evolutionary relationships. Shared derived characters (synapomorphies) group clades. Node = common ancestor.",
        ],
      },
      { type: "h2", text: "Unit 8: Ecology" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "p",
        text: "About 10 to 15 percent. Populations, communities, ecosystems. Human impact is heavily tested on FRQs.",
      },
      {
        type: "h3", text: "Population and community ecology" },
      {
        type: "ul",
        items: [
          "Exponential growth: dN/dt = rN. Growth accelerates indefinitely. Happens when resources are unlimited.",
          "Logistic growth: dN/dt = rN(K-N)/K, where K is carrying capacity. Growth slows as population approaches K.",
          "Life history: r-selected (many offspring, low care) vs K-selected (few offspring, high care).",
          "Community interactions: predation, competition, symbiosis (mutualism +/+, commensalism +/0, parasitism +/-).",
          "Keystone species: small in number but outsized impact (sea otters, wolves).",
          "Ecological succession: primary (bare rock) or secondary (after disturbance like fire).",
        ],
      },
      {
        type: "h3", text: "Ecosystem ecology" },
      {
        type: "ul",
        items: [
          "Energy flow: one-way. Only ~10 percent of energy transferred between trophic levels (10 percent rule).",
          "Trophic pyramid: producers (plants) -> primary consumers (herbivores) -> secondary consumers -> tertiary consumers.",
          "Biogeochemical cycles: carbon (photosynthesis/respiration/combustion), nitrogen (fixation/nitrification/denitrification), water (evaporation/precipitation), phosphorus (no atmospheric phase).",
          "Human impact: carbon dioxide and global warming, ocean acidification, nitrogen runoff causing dead zones, habitat loss, invasive species.",
        ],
      },
      { type: "h2", text: "The four big ideas (the framework for every FRQ)" },
      {
        type: "ul",
        items: [
          "Evolution: natural selection drives species change. Every biology phenomenon can be viewed through this lens.",
          "Energy and matter: cells, organisms, and ecosystems transform energy and cycle matter. Photosynthesis, respiration, food webs all illustrate this.",
          "Information: DNA stores genetic information. Signaling transmits information between cells and organisms.",
          "Systems interactions: molecules, cells, tissues, organisms, ecosystems all exhibit emergent properties from interactions.",
        ],
      },
      { type: "h2", text: "The experimental-design FRQ" },
      {
        type: "p",
        text: "One long FRQ always asks you to design or interpret an experiment. The grader is looking for:",
      },
      {
        type: "ol",
        items: [
          "A clear hypothesis that makes a testable prediction.",
          "Independent variable (what you change) and dependent variable (what you measure) clearly identified.",
          "Controls: control group (no treatment) and controlled variables (held constant).",
          "Adequate replication: multiple trials to reduce random variation.",
          "Data analysis: graphs, statistics (chi-square if appropriate), error bars.",
          "Conclusion linked back to hypothesis. Explain what the data show and whether they support the hypothesis.",
        ],
      },
      { type: "h2", text: "How to score a 5 on AP Biology" },
      {
        type: "ol",
        items: [
          "Master the four big ideas as a framework. Every FRQ connects to at least one. When you feel stuck, ask which big idea is being tested.",
          "Focus on the three heaviest units: photosynthesis / respiration (Unit 3), gene expression (Unit 6), and evolution (Unit 7). Together these are ~40 percent of the exam.",
          "Learn the experimental-design template cold. One FRQ is always experimental, and the rubric rewards the same moves every year.",
          "Practice chi-square and Hardy-Weinberg calculations. These appear on almost every exam.",
          "Take at least two timed practice exams. Bio has a LOT of content, and pacing is often what separates a 4 from a 5.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Confusing mitosis and meiosis. Mitosis: 1 division, 2 identical diploid cells, for growth/repair. Meiosis: 2 divisions, 4 genetically unique haploid gametes, for reproduction.",
          "Forgetting that enzymes do not change delta G, only activation energy. Enzymes speed up reactions without changing equilibrium.",
          "Mixing up inducible (lac, turns ON with lactose) and repressible (trp, turns OFF with tryptophan).",
          "Treating evolution as 'survival of the fittest' at the individual level. Populations evolve, not individuals. An individual organism does not change its DNA; the allele frequencies in a population shift.",
          "Forgetting Hardy-Weinberg assumptions. If a population is evolving, it violates at least one of the five assumptions.",
          "On experimental design FRQs, forgetting to include a control group. The control is what makes the experiment interpretable.",
          "Confusing primary (photosynthesis fixes CO2) and secondary (decomposition) productivity in ecosystems.",
          "Writing 'DNA makes RNA makes protein' without identifying where each step happens (nucleus vs cytoplasm) or the enzymes involved.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can generate Bio FRQ-style questions with novel experimental setups and walk through the data interpretation with you. Free tier is enough for the full course.",
      },
      {
        type: "p",
        text: "AP Biology rewards pattern recognition over rote memorization. Learn the patterns, apply the big ideas, and the course shrinks to something manageable.",
      },
    ],
  },
  {
    slug: "ap-us-history-review-guide",
    title: "AP US History Review Guide: Every Period from 1491 to Today",
    metaTitle: "AP US History Review Guide: All 9 Periods (APUSH 2026)",
    description:
      "A complete AP US History review guide covering all 9 periods, the DBQ rubric, LEQ strategies, SAQ tactics, and the themes that connect American history. Built for a 5 on the 2026 APUSH exam.",
    excerpt:
      "APUSH covers 500 years of American history, but the exam tests the same themes over and over. Here is the period-by-period review, plus the DBQ, LEQ, and SAQ rubric strategies that actually earn the points.",
    date: "2026-04-16",
    readTime: "18 min read",
    category: "AP US History",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "history",
      "humanities",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "APUSH has so much content that students sometimes give up trying to learn it and just cram primary sources. Do not do that. The exam does not reward fact memorization. It rewards your ability to trace themes across periods. If you know how each period connects to the next, the facts hang on that frame.",
      },
      {
        type: "p",
        text: "This guide walks you through every period on the CED, the seven themes that tie them together, and the rubrics for every essay type. Know the periods. Know the themes. Argue, do not list.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "h3", text: "Exam structure and scoring" },
      {
        type: "ul",
        items: [
          "3 hours 15 minutes total.",
          "Section I Part A: 55 multiple choice in 55 minutes. Worth 40 percent.",
          "Section I Part B: 3 short answer questions (SAQs) in 40 minutes. Worth 20 percent.",
          "Section II Part A: Document-Based Question (DBQ) in 60 minutes (15 reading, 45 writing). Worth 25 percent.",
          "Section II Part B: Long Essay Question (LEQ), choice of 3 prompts, 40 minutes. Worth 15 percent.",
          "The essays are graded by trained readers on College Board rubrics. The rubric is the entire game.",
        ],
      },
      { type: "h2", text: "The seven themes" },
      {
        type: "p",
        text: "Every APUSH prompt connects to at least one theme. These are the framework you use to argue claims across periods:",
      },
      {
        type: "ul",
        items: [
          "American and National Identity (NAT): debates over what it means to be American, citizenship, nationalism.",
          "Work, Exchange, and Technology (WXT): labor systems, economic development, trade, technological innovation.",
          "Geography and the Environment (GEO): how geography shaped settlement, natural resources, environmental impact.",
          "Migration and Settlement (MIG): immigration, internal migration (westward, urbanization), forced migration (slavery).",
          "Politics and Power (PCE): formation of political institutions, democratic ideals, expansion of rights, federal vs state power.",
          "America in the World (WOR): foreign policy, interactions with other nations, imperialism, wars.",
          "American and Regional Culture (ARC): regional differences, religion, arts, social movements.",
          "Social Structures (SOC): race, class, gender, ethnicity and how they have structured American society.",
        ],
      },
      { type: "h2", text: "Period 1: 1491 to 1607" },
      {
        type: "h3", text: "Pre-contact to Spanish colonization" },
      {
        type: "ul",
        items: [
          "Pre-contact Americas: diverse Native American societies (Iroquois Confederacy in Northeast, Pueblo in Southwest, Mississippian civilizations). Not a 'wilderness' but home to millions.",
          "Columbian Exchange: the two-way transfer of plants, animals, diseases, people, and ideas between the Americas and Europe/Africa after 1492. Devastating for Native populations (~90 percent died from disease). Transformed European and American diets.",
          "Spanish colonization: encomienda system (forced labor from Natives), Catholic missions, mixed-race casta system. Focused on extracting gold and silver.",
          "Key idea: contact between Europeans, Africans, and Native Americans reshaped all three continents.",
        ],
      },
      { type: "h2", text: "Period 2: 1607 to 1754" },
      {
        type: "h3", text: "Colonial America" },
      {
        type: "ul",
        items: [
          "British colonization: Jamestown (1607), Plymouth (1620), Massachusetts Bay (1630).",
          "Colonial regions developed distinct identities: New England (religious, family farms, shipping), Middle Colonies (diverse, wheat, religious tolerance), Chesapeake (tobacco, indentured servants then slaves), Lower South (rice, indigo, enslaved labor).",
          "Atlantic slave trade expanded massively, especially after Bacon's Rebellion (1676) as planters shifted from indentured servants to enslaved Africans.",
          "Mercantilism: Britain regulated colonial trade for its own benefit (Navigation Acts). Colonies were expected to supply raw materials and buy British manufactured goods.",
          "Early democratic practices: town meetings in New England, House of Burgesses in Virginia. First Great Awakening (1730s-40s) democratized religion.",
          "Key idea: geography + labor systems produced distinct colonial regions with different economies and societies.",
        ],
      },
      { type: "h2", text: "Period 3: 1754 to 1800" },
      {
        type: "h3", text: "Revolution and early republic" },
      {
        type: "ul",
        items: [
          "French and Indian War (1754-1763): Britain won, but the debt led to taxes on colonies (Stamp Act, Townshend Acts).",
          "Road to revolution: 'No taxation without representation,' Boston Massacre, Boston Tea Party, Intolerable Acts, First Continental Congress.",
          "American Revolution (1775-1783): Declaration of Independence (1776), victory at Saratoga brought French alliance, Yorktown ended the war, Treaty of Paris 1783.",
          "Articles of Confederation: weak central government, no power to tax or raise army. Shays' Rebellion (1786-87) revealed weaknesses.",
          "Constitutional Convention (1787): compromises on representation (Great Compromise), slavery (Three-Fifths Compromise), and federalism. Bill of Rights (1791) protected individual liberties.",
          "Early presidencies: Washington (precedent-setter, avoided parties), Adams (XYZ Affair, Alien and Sedition Acts), Jefferson (Louisiana Purchase 1803).",
          "Key idea: a successful rebellion against Britain led to a decade of figuring out how to govern without turning into tyranny themselves.",
        ],
      },
      { type: "h2", text: "Period 4: 1800 to 1848" },
      {
        type: "h3", text: "Market Revolution and reform" },
      {
        type: "ul",
        items: [
          "Jeffersonian era: Louisiana Purchase (doubled US size), Lewis and Clark, Marbury v. Madison (judicial review).",
          "War of 1812: against Britain over impressment and trade. Draw militarily but boosted American nationalism.",
          "Era of Good Feelings: one-party rule under Monroe. Missouri Compromise (1820) postponed slavery crisis.",
          "Market Revolution: steamboats, canals (Erie Canal 1825), railroads, factories. Transformed economy from local to national. Created wage labor.",
          "Jacksonian democracy: expanded white male suffrage, ended property requirements, but also Indian Removal Act (Trail of Tears), destruction of Second Bank.",
          "Second Great Awakening: religious revival that inspired reform movements.",
          "Reform movements: abolitionism (Frederick Douglass, William Lloyd Garrison), women's rights (Seneca Falls 1848), temperance, education reform, utopian communities.",
          "Key idea: market revolution and religious revival produced reformers who wanted to perfect American society.",
        ],
      },
      { type: "h2", text: "Period 5: 1844 to 1877" },
      {
        type: "h3", text: "Civil War and Reconstruction" },
      {
        type: "ul",
        items: [
          "Manifest Destiny: belief America should stretch to the Pacific. Mexican-American War (1846-48) gained Southwest.",
          "Slavery crisis: Wilmot Proviso, Compromise of 1850, Fugitive Slave Act, Kansas-Nebraska Act (1854), Dred Scott (1857). All failed to contain the issue.",
          "Civil War (1861-65): secession after Lincoln's election. Emancipation Proclamation (1863), Gettysburg, Sherman's March, Appomattox. Civil War amendments: 13th (ends slavery), 14th (citizenship and due process), 15th (black male suffrage).",
          "Reconstruction (1865-77): Presidential (Johnson, lenient), Radical (Congress, Reconstruction Acts), Redemption (white Democrats retake South after Compromise of 1877).",
          "Key idea: slavery and federalism exploded into civil war. Reconstruction briefly promised equality but was rolled back.",
        ],
      },
      { type: "h2", text: "Period 6: 1865 to 1898" },
      {
        type: "h3", text: "Gilded Age" },
      {
        type: "ul",
        items: [
          "Industrialization: railroads, steel (Carnegie), oil (Rockefeller), electricity, mass production. Rise of monopolies (trusts).",
          "Labor movements: Knights of Labor, AFL. Strikes: Haymarket (1886), Homestead (1892), Pullman (1894). Often violently suppressed.",
          "Urbanization and immigration: cities grew explosively. 'New immigrants' from southern and eastern Europe. Nativist backlash.",
          "Populism (People's Party): farmers demanding free silver, graduated income tax, regulation of railroads. William Jennings Bryan's 'Cross of Gold' speech (1896).",
          "Westward expansion: transcontinental railroad (1869), destruction of buffalo, confinement of Native Americans to reservations, Dawes Act (1887).",
          "Gilded Age inequality: Mark Twain's phrase for wealth covering corruption. Social Darwinism justified it; Social Gospel and reformers fought it.",
          "Key idea: rapid industrial growth created enormous wealth AND equally enormous inequality, sparking labor, agrarian, and political movements.",
        ],
      },
      { type: "h2", text: "Period 7: 1890 to 1945" },
      {
        type: "h3", text: "Progressivism, World Wars, Depression" },
      {
        type: "ul",
        items: [
          "Progressive Era (1890-1920): muckrakers exposed abuses (Upton Sinclair's 'The Jungle'). Reforms: direct election of senators (17th Amendment), women's suffrage (19th), Prohibition (18th, later repealed by 21st), income tax (16th), trust busting.",
          "Spanish-American War (1898): acquired Philippines, Puerto Rico, Guam. US became imperialist power.",
          "World War I: US initially neutral, joined 1917 after Zimmermann Telegram. Wilson's 14 Points. Senate rejected League of Nations.",
          "Roaring Twenties: consumer culture, Harlem Renaissance, women's changing roles (flappers), cultural conflict (Scopes Trial, KKK revival, immigration restriction).",
          "Great Depression (1929-39): stock market crash, bank failures, 25 percent unemployment. Hoover's response inadequate.",
          "New Deal (FDR): Relief (jobs programs like CCC, WPA), Recovery (NRA, AAA), Reform (Social Security, SEC, FDIC, Wagner Act). Expanded federal government permanently.",
          "World War II: Pearl Harbor (1941), Manhattan Project, Japanese internment, D-Day, atomic bombs on Hiroshima and Nagasaki (1945). US emerged as superpower.",
          "Key idea: federal government expanded dramatically, and America moved from isolationism to global superpower.",
        ],
      },
      { type: "h2", text: "Period 8: 1945 to 1980" },
      {
        type: "h3", text: "Cold War and civil rights" },
      {
        type: "ul",
        items: [
          "Cold War: containment (Truman Doctrine, Marshall Plan, NATO). Korean War (1950-53), Berlin Wall, Cuban Missile Crisis (1962).",
          "McCarthyism: Red Scare. House Un-American Activities Committee, Hollywood blacklist.",
          "Civil Rights Movement: Brown v. Board (1954), Montgomery Bus Boycott (1955-56), Little Rock Nine, March on Washington (1963), Civil Rights Act (1964), Voting Rights Act (1965). MLK, Malcolm X, Black Power.",
          "Vietnam War: escalation under LBJ, Tet Offensive (1968), anti-war protests, Nixon's 'Vietnamization' and withdrawal (1973), Saigon fell (1975).",
          "Counterculture: hippies, sexual revolution, women's liberation (Friedan, NOW, Roe v. Wade 1973), Stonewall (1969).",
          "Nixon and Watergate: opening to China, détente with USSR. Watergate scandal forced resignation (1974).",
          "Key idea: Cold War abroad and civil rights struggle at home shaped the era.",
        ],
      },
      { type: "h2", text: "Period 9: 1980 to Present" },
      {
        type: "h3", text: "Contemporary America" },
      {
        type: "ul",
        items: [
          "Reagan Revolution: tax cuts, deregulation, military buildup, conservative Supreme Court appointments.",
          "End of Cold War: Gorbachev's reforms, fall of Berlin Wall (1989), collapse of Soviet Union (1991).",
          "Globalization: NAFTA (1993), WTO (1995). Manufacturing declined, tech rose (Silicon Valley).",
          "9/11 and War on Terror: attacks on 9/11/2001 led to wars in Afghanistan (2001) and Iraq (2003). Patriot Act.",
          "2008 financial crisis: housing bubble burst, Great Recession. TARP bailout. Obama presidency.",
          "Recent: Affordable Care Act (2010), marriage equality (Obergefell 2015), Trump presidency, BLM, COVID-19, polarization.",
          "Key idea: the political consensus that formed after WWII broke down, and the nation grew more polarized.",
        ],
      },
      { type: "h2", text: "DBQ rubric (7 points)" },
      {
        type: "ol",
        items: [
          "Thesis (1): defensible claim responding to the prompt with a line of reasoning. NOT just restating the prompt.",
          "Contextualization (1): broader historical context relevant to the prompt, typically one to two sentences describing events before or after that explain why the prompt matters.",
          "Evidence from 3 documents (1): use at least three of the documents to support argument.",
          "Evidence from 6 documents (1): use at least six (out of 7) to support argument.",
          "Evidence beyond the documents (1): one specific piece of historical evidence NOT in the documents that supports the argument.",
          "Sourcing HIPP on 3 documents (1): for at least three documents, explain historical situation, intended audience, purpose, or point of view and WHY it matters.",
          "Complexity (1): demonstrate nuance via qualifying the argument, comparing across time periods, analyzing multiple perspectives, or connecting to broader themes.",
        ],
      },
      { type: "h2", text: "LEQ rubric (6 points)" },
      {
        type: "ul",
        items: [
          "Thesis (1): same as DBQ.",
          "Contextualization (1): same as DBQ.",
          "Evidence (2): specific, relevant historical evidence. 1 point for some evidence, 2 points for multiple pieces used to support argument.",
          "Analysis and reasoning (2): 1 point for addressing the prompt's reasoning (change/continuity, comparison, or causation). 1 point for complexity (same as DBQ).",
        ],
      },
      { type: "h2", text: "SAQ strategy" },
      {
        type: "p",
        text: "Short Answer Questions are 3 parts each, usually asking you to (A) describe, (B) explain, and (C) provide evidence. Answer ALL parts. Use specific examples. Do not ramble; two to three sentences per part is typical.",
      },
      { type: "h2", text: "How to score a 5 on APUSH" },
      {
        type: "ol",
        items: [
          "Master the seven themes. Every prompt connects to them. When you see a prompt, immediately identify the theme and use theme-specific vocabulary.",
          "Practice contextualization. This is often the easiest point to earn because it only requires two sentences of broader context.",
          "Master HIPP (Historical situation, Intended audience, Purpose, Point of view). Every DBQ needs this for at least 3 documents.",
          "Plan for complexity. Close every essay with a paragraph that explicitly compares periods, offers counterargument, or shows change AND continuity.",
          "Write densely. Do not pad. Every sentence should earn a rubric point or support one that does.",
          "Take timed DBQs. Pacing (15 min reading, 45 min writing) is crucial. Practice until it is automatic.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Complexity is the hardest point on both essays. Plan for it from the start. The easiest ways to earn it: explicitly compare across time periods, offer a counterargument and explain why your thesis is stronger, or argue change AND continuity.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Writing a chronology instead of an argument. The essay is not a timeline. Every paragraph needs a claim.",
          "Listing documents without tying them to a claim. 'Document 1 says X' is not analysis. 'Document 1 supports my claim because X, which shows Y' is.",
          "Naming HIPP without explaining why it matters. 'Point of view: he is a Federalist' earns nothing. 'As a Federalist, he would have supported a strong central government, which explains why he argues X' earns the point.",
          "Using outside evidence that is too vague ('the economy changed' or 'people protested'). Name specific events, laws, people, or dates.",
          "Skipping the LEQ option you know best because another sounds 'easier.' The LEQ you know deeply will always score higher.",
          "Wasting time on the SAQs. They are 20 percent of the score, not 50. Do not over-polish.",
          "Running out of time on the DBQ. The 45 minutes to write feels long until you are 20 minutes in and realize you have only done 4 documents.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can score a DBQ or LEQ you paste in using the official College Board rubrics and tell you exactly which point you earned and which you missed. Free tier covers APUSH.",
      },
      {
        type: "p",
        text: "Know the periods. Know the themes. Master the rubrics. Argue, do not list. That is the APUSH playbook.",
      },
    ],
  },
  {
    slug: "ap-world-history-review-guide",
    title: "AP World History Modern Review Guide: All 9 Units Explained",
    metaTitle: "AP World History Modern Review Guide: 1200 to Present (2026)",
    description:
      "A complete AP World History Modern review guide covering all 9 units from 1200 to present, plus DBQ and LEQ strategies, key documents, themes, and cross-regional comparisons.",
    excerpt:
      "AP World History Modern covers 800 years across every continent. This unit-by-unit guide covers each period's defining developments, the connections between regions, and the essay strategies that earn the points.",
    date: "2026-04-17",
    readTime: "18 min read",
    category: "AP World History",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "history",
      "humanities",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP World History Modern covers the world from 1200 to the present. That is 800 years of interconnected history on every continent. The exam is less interested in trivia than in your ability to compare across regions, trace change and continuity over time, and explain cause and effect. If you learn the structure (units, themes, regions), the content fits into it.",
      },
      {
        type: "p",
        text: "This guide walks through all 9 units, the six themes, the comparison framework, and the rubrics for the DBQ and LEQ. Do not memorize every fact. Understand the patterns, and the facts hang on them.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "h3", text: "Exam structure and scoring" },
      {
        type: "ul",
        items: [
          "3 hours 15 minutes. Same format as APUSH.",
          "Section I Part A: 55 multiple choice in 55 minutes (40 percent).",
          "Section I Part B: 3 Short Answer Questions (SAQs) in 40 minutes (20 percent).",
          "Section II Part A: Document-Based Question (DBQ) in 60 minutes, 7 documents (25 percent). Always on the period 1450-2001.",
          "Section II Part B: Long Essay Question (LEQ), choice of 3 prompts across different periods, 40 minutes (15 percent).",
        ],
      },
      { type: "h2", text: "The six themes" },
      {
        type: "p",
        text: "Every prompt ties to one or more of these themes. Use them as your lens:",
      },
      {
        type: "ul",
        items: [
          "Governance (GOV): how states formed, consolidated, and collapsed. Political structures.",
          "Cultural Developments and Interactions (CDI): religion, philosophy, art, science, their spread and syntheses.",
          "Technology and Innovation (TEC): tools, ideas, techniques that transformed societies.",
          "Economic Systems (ECN): production, trade, labor systems (slavery, feudalism, wage labor), economic philosophies.",
          "Social Interactions and Organization (SIO): gender, class, race, ethnicity, family structures.",
          "Humans and the Environment (ENV): how societies shaped and were shaped by their environments.",
        ],
      },
      { type: "h2", text: "Unit 1: The Global Tapestry (c. 1200-1450)" },
      {
        type: "h3", text: "State building across regions" },
      {
        type: "ul",
        items: [
          "East Asia: Song China (civil service exams, Neo-Confucianism, technological innovations like gunpowder and movable type, foot binding). Later Yuan (Mongol) and Ming.",
          "Dar al-Islam: Abbasid Caliphate fragmentation, Seljuk Turks, Mamluk Sultanate in Egypt, Delhi Sultanate in India. Cultural flowering: House of Wisdom, Islamic scholarship, trade networks.",
          "South and Southeast Asia: Delhi Sultanate (Muslim rule over Hindu majority), Vijayanagara, Majapahit, Khmer Empire.",
          "Sub-Saharan Africa: Mali Empire (Mansa Musa, trans-Saharan gold trade, Timbuktu), Great Zimbabwe, Swahili city-states (Indian Ocean trade).",
          "Americas: Aztec Empire (Tenochtitlan, tribute system, human sacrifice), Inca Empire (Andean terraces, mit'a labor, Machu Picchu).",
          "Europe: feudalism, manorialism, Christian Church, Holy Roman Empire, rise of towns, universities, Black Death (1347-51) transforming society.",
          "Key idea: by 1450, every region had complex states with distinct religious, political, and economic systems.",
        ],
      },
      { type: "h2", text: "Unit 2: Networks of Exchange (c. 1200-1450)" },
      {
        type: "h3", text: "Trade routes and cultural diffusion" },
      {
        type: "ul",
        items: [
          "Silk Roads: connected China, Central Asia, Middle East, Europe. Silk, porcelain, spices. Cultural exchange: Buddhism spread to China.",
          "Indian Ocean trade: monsoon winds, Arab dhows, Chinese junks. Spices, textiles, slaves. Swahili coast, Malacca, Calicut as key ports.",
          "Trans-Saharan trade: camels, salt for gold. Mansa Musa's hajj displayed Mali's wealth.",
          "Mongol Empire (13th-14th c.): largest contiguous empire in history. Pax Mongolica enabled Silk Road trade. Also spread Black Death.",
          "Travelers: Marco Polo (Italian to China), Ibn Battuta (Moroccan across Dar al-Islam), Mansa Musa (Mali to Mecca).",
          "Technologies diffused: gunpowder, compass, paper (from China westward). Bubonic plague moved east to west.",
          "Key idea: pre-modern world was not isolated. Networks of exchange moved goods, people, ideas, and diseases across vast distances.",
        ],
      },
      { type: "h2", text: "Unit 3: Land-Based Empires (c. 1450-1750)" },
      {
        type: "h3", text: "Gunpowder empires" },
      {
        type: "ul",
        items: [
          "Ottoman Empire: expanded from Anatolia. Captured Constantinople (1453). Peak under Suleiman the Magnificent. Devshirme (Christian boys taken as Janissaries). Sunni Islam.",
          "Safavid Empire (Persia): founded by Ismail. Shia Islam (distinguished from Sunni Ottomans). Frequent wars with Ottomans.",
          "Mughal Empire (India): founded by Babur. Akbar the Great ruled with religious tolerance. Shah Jahan built Taj Mahal. Aurangzeb's intolerance accelerated decline.",
          "Ming and Qing China: Ming (1368-1644, restoration of Han rule, Great Wall expansion, Zheng He voyages then isolation). Qing (1644-1912, Manchu dynasty).",
          "Russia: Ivan IV 'the Terrible', expansion into Siberia. Peter the Great westernized. Romanov dynasty.",
          "Methods of legitimation: religion (Islam, Neo-Confucianism, divine right), art and architecture (Hagia Sophia conversion, Taj Mahal, Versailles), bureaucracy, tax collection.",
          "Key idea: gunpowder enabled centralized empires that consolidated territory and used religion to legitimize rule.",
        ],
      },
      { type: "h2", text: "Unit 4: Transoceanic Interconnections (c. 1450-1750)" },
      {
        type: "h3", text: "European expansion and global trade" },
      {
        type: "ul",
        items: [
          "Technological advances: caravel ships, lateen sails, astrolabe, compass, magnetic compass, cartography.",
          "Portuguese and Spanish expansion: Prince Henry, Vasco da Gama (to India), Columbus (1492), Magellan (circumnavigation).",
          "Columbian Exchange: plants (maize, potatoes to Old World; wheat, sugar to New World), animals (horses to Americas), diseases (smallpox devastated Native populations), people (forced and voluntary migration).",
          "Atlantic slave trade: ~12 million Africans forcibly transported to Americas over 400 years. Triangular trade (slaves, sugar/tobacco, manufactured goods).",
          "Spanish colonial system: encomienda (Native labor), mit'a (Inca-style corvee labor), hacienda (large estates), casta system (racial hierarchy).",
          "Joint-stock companies: British East India Company, Dutch East India Company (VOC) pioneered investment in risky voyages.",
          "Mercantilism: nation's wealth = total gold and silver. Accumulate trade surplus, extract from colonies.",
          "Silver trade: Spanish silver from Potosi (Bolivia) flowed to China via Manila galleons, globalizing the economy.",
          "Key idea: for the first time, the world was truly connected in a global economic system built on European maritime power and African slavery.",
        ],
      },
      { type: "h2", text: "Unit 5: Revolutions (c. 1750-1900)" },
      {
        type: "h3", text: "Enlightenment and Atlantic revolutions" },
      {
        type: "ul",
        items: [
          "Enlightenment: reason, natural rights, social contract. Locke, Rousseau, Voltaire, Smith. Influenced revolutions.",
          "American Revolution (1776): Declaration of Independence, Constitution, Bill of Rights. Influenced others.",
          "French Revolution (1789): Estates-General, Storming of Bastille, Declaration of Rights of Man, Reign of Terror, Napoleon.",
          "Haitian Revolution (1791-1804): only successful slave revolt. Toussaint L'Ouverture. Founded first black republic.",
          "Latin American independence: Bolivar (Gran Colombia), San Martin (Argentina, Chile, Peru). Creoles led movements.",
          "Industrial Revolution: started in Britain. Textile factories, steam engine, railroads, telegraph. Spread to US, Germany, Japan.",
          "Social consequences: working class emerged, urbanization, pollution, child labor. Labor movements, unions, socialism (Marx).",
          "Nationalism and unification: Italy (Cavour, Garibaldi), Germany (Bismarck, Franco-Prussian War).",
          "Reform movements: abolitionism (slavery ended: Britain 1833, US 1865, Brazil 1888), women's rights (Seneca Falls 1848), suffragettes.",
          "Key idea: Enlightenment ideas and industrialization transformed political and economic systems worldwide.",
        ],
      },
      { type: "h2", text: "Unit 6: Consequences of Industrialization (c. 1750-1900)" },
      {
        type: "h3", text: "New imperialism" },
      {
        type: "ul",
        items: [
          "Motives: economic (raw materials, markets, investment), political (nationalism, strategic), ideological (social Darwinism, 'White Man's Burden,' civilizing mission).",
          "Scramble for Africa: Berlin Conference (1884-85) partitioned Africa without Africans. By 1914, only Ethiopia and Liberia remained independent.",
          "Asia: British Raj (India), French Indochina, Dutch East Indies, Opium Wars (Britain vs Qing China), unequal treaties, spheres of influence.",
          "Resistance: Sepoy Rebellion (India 1857), Boxer Rebellion (China 1900), Zulu resistance, Ethiopia defeated Italy at Adwa (1896).",
          "Economic imperialism in Latin America: formal independence but economic dependence on US and Europe (banana republics, export economies).",
          "Effects: forced labor, famines (Irish Potato Famine, Indian famines), racial hierarchies, environmental damage, loss of local industries.",
          "Global migrations: indentured servants (Indian to Caribbean, Chinese to California), economic migrants, Irish and European immigrants to Americas.",
          "Key idea: industrialized nations extracted resources and markets from non-industrialized world, sometimes through direct colonization, sometimes economically.",
        ],
      },
      { type: "h2", text: "Unit 7: Global Conflict (c. 1900-Present)" },
      {
        type: "h3", text: "World Wars" },
      {
        type: "ul",
        items: [
          "WWI (1914-18): causes (militarism, alliances, imperialism, nationalism; spark was assassination of Archduke). Trench warfare, machine guns, poison gas, ~20 million dead.",
          "Treaty of Versailles (1919): harsh on Germany (war guilt clause, reparations), redrew maps of Europe and Middle East (Sykes-Picot), collapsed Austro-Hungarian, Ottoman, Russian, German empires. League of Nations.",
          "Russian Revolution (1917): Bolsheviks (Lenin) overthrew Tsar and then Provisional Government. Founded first communist state (USSR). Stalin's totalitarian rule, Five-Year Plans, Great Purge.",
          "Interwar: Great Depression (1929), rise of totalitarianism (Nazi Germany under Hitler, Fascist Italy under Mussolini, Imperial Japan).",
          "WWII (1939-45): Nazi invasion of Poland. Allies vs Axis. ~60 million dead. Holocaust (~6 million Jews). Atomic bombs on Hiroshima and Nagasaki ended war.",
          "Decolonization begins: India (1947, Gandhi's nonviolence), Israel (1948), split of Indochina, Algeria (1962 after violent war with France).",
          "Key idea: total war reshaped states, economies, and populations on an unprecedented scale. Empires collapsed.",
        ],
      },
      { type: "h2", text: "Unit 8: Cold War and Decolonization (c. 1900-Present)" },
      {
        type: "h3", text: "Post-war world" },
      {
        type: "ul",
        items: [
          "Cold War (1947-1991): US (capitalism, democracy) vs USSR (communism, single-party state). NATO vs Warsaw Pact. Nuclear arms race.",
          "Proxy wars: Korean War (1950-53), Vietnam War (US failed 1975), Cuban Revolution (Castro 1959) and Missile Crisis (1962), Afghanistan (USSR invasion 1979), Latin America (US-backed coups).",
          "Non-Aligned Movement: India (Nehru), Egypt (Nasser), Indonesia (Sukarno), Yugoslavia (Tito). Refused to pick sides.",
          "Chinese Revolution (1949): Mao's communists defeated Nationalists (Chiang Kai-shek). Great Leap Forward (famine), Cultural Revolution (purge of intellectuals).",
          "Decolonization: Ghana (1957), Kenya (Mau Mau), Algeria, Indonesia, Vietnam. Varied paths (nonviolent vs armed struggle).",
          "Apartheid in South Africa: formal racial segregation (1948-1994). Mandela, ANC. International sanctions.",
          "End of Cold War: Gorbachev's perestroika and glasnost, fall of Berlin Wall (1989), collapse of USSR (1991).",
          "Key idea: two superpowers defined the post-1945 world while former colonies fought for independence.",
        ],
      },
      { type: "h2", text: "Unit 9: Globalization (c. 1900-Present)" },
      {
        type: "h3", text: "Interconnected modern world" },
      {
        type: "ul",
        items: [
          "Economic globalization: free trade agreements (NAFTA, EU, WTO), multinational corporations, supply chains across countries, neoliberalism.",
          "Technological change: computers, internet, mobile phones. Information age transformed work and communication.",
          "Environmental consequences: climate change, deforestation, pollution. Kyoto Protocol, Paris Agreement. Debate over responsibility (developed vs developing).",
          "Migration: labor migration, refugees (from wars and climate change), brain drain.",
          "Terrorism: 9/11 (2001), War on Terror, rise of ISIS.",
          "Pandemics: HIV/AIDS, SARS, Ebola, COVID-19 (2020-). Showed interconnectedness AND fragility.",
          "Human rights: UN Universal Declaration (1948), women's rights, LGBTQ rights, indigenous movements.",
          "Key idea: interconnection accelerated, along with its benefits (trade, prosperity) and costs (inequality, climate change, pandemics).",
        ],
      },
      { type: "h2", text: "Thinking across regions" },
      {
        type: "p",
        text: "World History rewards comparison. Practice comparing similar phenomena in different regions:",
      },
      {
        type: "ul",
        items: [
          "Responses to European expansion: Tokugawa Japan (isolation) vs Ming/Qing China (limited trade) vs Mughal India (welcomed trade, conquered).",
          "Responses to industrialization: Japan (Meiji modernized quickly) vs China (conservative, fell behind) vs Ottoman Empire (Tanzimat reforms, limited success).",
          "Decolonization paths: India (Gandhi, nonviolent) vs Algeria (violent war) vs Ghana (negotiated).",
          "Revolutions: American (moderate, preserved wealth) vs French (radical, violence) vs Russian (complete overthrow of old order) vs Chinese (peasant-based).",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Build a region-by-period grid. One axis is the nine units, the other is six regions (East Asia, South/SE Asia, Southwest Asia/North Africa, Sub-Saharan Africa, Europe, Americas). Fill in the dominant state or development per cell. Patterns emerge you did not see reading linearly.",
      },
      { type: "h2", text: "DBQ document types" },
      {
        type: "ul",
        items: [
          "Travel accounts: Ibn Battuta, Marco Polo, missionaries. Useful for showing contact between cultures.",
          "Religious texts and sermons: reveal beliefs, social norms, legitimation of authority.",
          "Revolutionary manifestos: Declaration of Rights of Man, Bolivar, Communist Manifesto.",
          "Economic data: trade volumes, GDP, industrial output. Always ask: who collected this data and why?",
          "Photographs and political cartoons: propaganda, power, perspective.",
          "Government decrees and treaties: formal policies and international agreements.",
          "Autobiographies and diaries: personal experience, subject to bias.",
        ],
      },
      { type: "h2", text: "DBQ and LEQ rubrics" },
      {
        type: "p",
        text: "Same rubrics as APUSH: DBQ is 7 points (thesis, contextualization, evidence from docs, outside evidence, HIPP analysis, complexity). LEQ is 6 points (thesis, contextualization, evidence, reasoning with complexity).",
      },
      { type: "h2", text: "How to score a 5 on AP World History" },
      {
        type: "ol",
        items: [
          "Learn the regions. Do not bury your head in one (like Europe). World History is GLOBAL. Know major developments in East Asia, South Asia, Middle East, Africa, Europe, Americas.",
          "Master the six themes. Use them in every essay to categorize and compare developments.",
          "Practice chronology. Know roughly when key events happened so you can correctly situate developments in time.",
          "Learn cross-regional comparisons. This is what the LEQ tests most often. Have 5-10 ready for common comparisons (responses to imperialism, paths of decolonization, types of revolutions).",
          "Practice the DBQ essay under timed conditions. The 15-minute reading window is crucial. Use it to identify the prompt's stakes, skim all 7 docs, and plan your thesis.",
          "Plan for complexity on every essay. Compare across periods, show change AND continuity, offer counterarguments.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Spending too much time on any one region (usually Europe). World History is global. Balance your knowledge.",
          "Treating the 20th century like a bonus unit. Three of the nine units cover 1900-present. Know it well.",
          "Forgetting HIPP analysis on the DBQ. Every DBQ needs it for at least 3 documents.",
          "Writing generic thesis statements. 'Many things changed' is NOT a thesis. Specify regions, time periods, and your line of reasoning.",
          "Confusing decolonization paths. Nonviolent (India), negotiated (Ghana), and violent (Algeria) are NOT the same story.",
          "Equating 'globalization' with modern. The world was globalizing since at least 1450. Don't restrict it to post-1945.",
          "Missing causation in favor of description. The LEQ often asks WHY something happened, not what happened. Give reasons, not just events.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep's tutor can help you build cross-regional comparisons on demand. Ask 'compare industrialization in Britain and Japan' and it gives you a side-by-side with specific evidence. Free tier works for the full course.",
      },
      {
        type: "p",
        text: "The world was connected long before globalization. Learn the connections, apply the themes, compare across regions, and the content organizes itself.",
      },
    ],
  },
  {
    slug: "ap-computer-science-a-review-guide",
    title: "AP Computer Science A Review Guide: All 10 Units with Java Tips",
    metaTitle: "AP Computer Science A Review Guide: All 10 Units (2026)",
    description:
      "A complete AP Computer Science A review guide covering all 10 units of Java, common FRQ patterns, 2D arrays, recursion, inheritance, and the Java syntax gotchas the exam tests every year.",
    excerpt:
      "AP CS A is Java plus object-oriented thinking plus algorithms. This unit-by-unit guide covers every topic on the CED, with the exact FRQ patterns the exam uses and the Java syntax traps that cost points.",
    date: "2026-04-18",
    readTime: "18 min read",
    category: "AP Computer Science A",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "STEM",
      "computer science",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Computer Science A is the most practical AP exam in the lineup: you learn Java, and the exam tests whether you can read Java and write Java. Every FRQ is a class, a method, or a loop. The patterns are predictable. The syntax is what trips people up.",
      },
      {
        type: "p",
        text: "This guide walks through every unit, the four FRQ patterns that repeat every year, and the Java syntax gotchas that cost the most points. If you can read, write, and trace Java code, you will score well.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "h3", text: "Exam structure and scoring" },
      {
        type: "ul",
        items: [
          "3 hours total.",
          "Section I: 40 multiple choice in 90 minutes. Worth 50 percent of score.",
          "Section II: 4 free response in 90 minutes. Worth 50 percent of score.",
          "FRQ #1: methods and control structures (often a class with a method to implement).",
          "FRQ #2: a class design (write a class from specification).",
          "FRQ #3: array or ArrayList manipulation.",
          "FRQ #4: 2D array traversal.",
          "A Java Quick Reference is provided (subset of String, Math, ArrayList, etc.). You do not need to memorize method signatures.",
        ],
      },
      { type: "h2", text: "Unit 1: Primitive Types" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Primitives: int, double, boolean (there are others but these three are tested most).",
          "Arithmetic: +, -, *, /, %. Precedence follows math rules (PEMDAS).",
          "Integer division truncates: 5 / 2 equals 2, not 2.5. To get a decimal, cast at least one operand: (double) 5 / 2 equals 2.5.",
          "Modulo (%) gives the remainder: 7 % 3 equals 1. Useful for checking even/odd (n % 2 == 0).",
          "Casting: (int) 3.7 equals 3 (truncates). (double) 5 equals 5.0.",
          "Variable assignment: int x = 5. Reassignment: x = x + 1 (or x++).",
        ],
      },
      { type: "h2", text: "Unit 2: Using Objects" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Strings are objects. String s = \"hello\". Create with double quotes or new String().",
          "String methods you must know: .length() (returns int), .substring(int), .substring(int, int), .indexOf(String), .equals(String), .compareTo(String).",
          "Strings are IMMUTABLE. s.substring(1) returns a NEW string; it does not modify s.",
          "String concatenation uses +. \"hello\" + \" world\" equals \"hello world\".",
          "Math class (static methods): Math.sqrt(x), Math.pow(base, exp), Math.abs(x), Math.random() (returns double in [0, 1)), Math.min, Math.max.",
          "Wrapper classes: Integer (wraps int), Double (wraps double). Used when you need to put primitives in an ArrayList.",
          "Autoboxing: int automatically converts to Integer when needed. Unboxing: Integer to int.",
        ],
      },
      { type: "h2", text: "Unit 3: Boolean Expressions and if Statements" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Comparison operators: <, >, <=, >=, ==, !=. Return boolean.",
          "Logical operators: && (AND), || (OR), ! (NOT).",
          "Short-circuit evaluation: && stops at first false, || stops at first true. Use this for safe checks: if (i < arr.length && arr[i] > 0) — the second condition only runs if the first is true, preventing ArrayIndexOutOfBounds.",
          "De Morgan's laws: !(a && b) equals !a || !b. !(a || b) equals !a && !b.",
          "if-else-if structure: only first matching branch runs.",
          "Compound conditions: if (x > 0 && y > 0) — both must be true.",
        ],
      },
      { type: "h2", text: "Unit 4: Iteration" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "while loop: runs as long as condition is true. Easy to create infinite loops if condition never becomes false.",
          "for loop: initialization, condition, update. for (int i = 0; i < n; i++).",
          "Nested loops: loop inside a loop. O(n squared) time complexity for common cases.",
          "Breaking out of loops: return statement, or setting condition to false.",
          "Off-by-one errors: should the loop run n times or n-1 times? Tracing through on paper catches these.",
          "Loop invariants: what is true at the start of every iteration? This helps debug loops.",
        ],
      },
      { type: "h2", text: "Unit 5: Writing Classes" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Class: blueprint for objects. public class Car { ... }.",
          "Instance variables (fields): variables held by each object. private int speed;.",
          "Constructor: initializes a new object. Has same name as class, no return type.",
          "Methods: functions inside a class. Can access instance variables.",
          "this keyword: refers to the current object. Useful for disambiguation: this.speed = speed.",
          "Visibility: public (accessible anywhere), private (only inside the class). Encapsulate: make fields private, expose with getters/setters.",
          "Static keyword: belongs to the class, not an instance. static int count; shared by all instances. Access with ClassName.count, not instance.count.",
        ],
      },
      {
        type: "code",
        language: "java",
        text: "public class Book {\\n    private String title;\\n    private int pages;\\n\\n    public Book(String t, int p) {\\n        title = t;\\n        pages = p;\\n    }\\n\\n    public String getTitle() { return title; }\\n    public int getPages() { return pages; }\\n    public void setPages(int p) { pages = p; }\\n}",
      },
      { type: "h2", text: "Unit 6: Array" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Array: fixed-size, ordered collection of same-type items.",
          "Declaration: int[] arr = new int[10]. Or int[] arr = {1, 2, 3}.",
          "Access: arr[i]. Indices start at 0 and go to arr.length - 1.",
          "Length: arr.length (PROPERTY, no parens). This is different from String.length() (method).",
          "Traversal with for loop: for (int i = 0; i < arr.length; i++) { ... arr[i] ... }.",
          "Enhanced for loop (for-each): for (int n : arr) { ... n ... }. Good for reading, but you cannot modify arr elements through n.",
          "Common operations: find max, find min, count matching, sum, reverse, shift.",
        ],
      },
      { type: "h2", text: "Unit 7: ArrayList" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "ArrayList: dynamic (resizable) array of objects. ArrayList<Integer> list = new ArrayList<Integer>().",
          "Autoboxing: list.add(5) auto-converts 5 (int) to Integer.",
          "Methods: .add(E), .add(int, E), .get(int), .set(int, E), .remove(int), .remove(E), .size().",
          "Size is a METHOD: list.size() (with parens). Different from array.length (property). String.length() is a method. Array .length is property. ArrayList .size() is method. This inconsistency is tested every year.",
          "Iteration: standard for with .size() and .get(i), or enhanced for.",
          "Removing while iterating: iterate BACKWARDS (from size()-1 to 0) to avoid skipping elements when indices shift.",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        text: "Array length is a PROPERTY (arr.length, no parens). ArrayList size is a METHOD (list.size(), with parens). String length is a METHOD (s.length(), with parens). That inconsistency is tested every year. Memorize it.",
      },
      { type: "h2", text: "Unit 8: 2D Array" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "2D array: array of arrays. int[][] grid = new int[rows][cols].",
          "Access: grid[row][col]. First index is row, second is column.",
          "Dimensions: grid.length is number of rows. grid[0].length is number of columns (assuming all rows same length).",
          "Row-major traversal: outer loop rows, inner loop columns. Most common.",
          "Column-major traversal: outer loop columns, inner loop rows. Less common, used for column-specific operations.",
          "Common operations: find max in each row/column, count occurrences, check if matrix is symmetric, sum of diagonal.",
        ],
      },
      {
        type: "code",
        language: "java",
        text: "public static int sumAll(int[][] grid) {\\n    int sum = 0;\\n    for (int r = 0; r < grid.length; r++) {\\n        for (int c = 0; c < grid[r].length; c++) {\\n            sum += grid[r][c];\\n        }\\n    }\\n    return sum;\\n}",
      },
      { type: "h2", text: "Unit 9: Inheritance" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Inheritance: a class extends another class, inheriting its public methods and fields. public class Dog extends Animal { ... }.",
          "Subclass (child) extends superclass (parent). Subclass inherits non-private methods.",
          "super keyword: access superclass constructor or method. super(args) calls parent constructor. super.method() calls parent's version.",
          "Method overriding: subclass redefines a method with same signature. @Override annotation helps catch typos.",
          "Polymorphism: declare variable as superclass type, assign subclass object. At runtime, the correct (overridden) method runs. Animal a = new Dog(); a.makeSound(); runs Dog's version.",
          "Object class: root of all Java classes. Every class inherits toString(), equals(), hashCode() from Object.",
          "Abstract classes: cannot be instantiated. Abstract methods must be overridden by subclasses.",
        ],
      },
      { type: "h2", text: "Unit 10: Recursion" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Recursion: a method that calls itself.",
          "Two parts: base case (stops recursion, no recursive call) and recursive case (calls itself with a smaller or simpler input).",
          "Without a base case: infinite recursion, StackOverflowError.",
          "Common recursive problems: factorial, Fibonacci, sum of array, binary search, tree traversal.",
          "Tracing recursion: draw the call stack. Each call is a frame, parent waits for child to return.",
          "Recursion is often equivalent to iteration but more elegant for naturally recursive problems (trees, divide-and-conquer).",
        ],
      },
      {
        type: "code",
        language: "java",
        text: "public static int factorial(int n) {\\n    if (n <= 1) return 1;      // base case\\n    return n * factorial(n - 1); // recursive case\\n}\\n\\npublic static int fibonacci(int n) {\\n    if (n <= 1) return n;\\n    return fibonacci(n - 1) + fibonacci(n - 2);\\n}",
      },
      { type: "h2", text: "The four FRQ patterns that repeat" },
      {
        type: "ol",
        items: [
          "Methods and control structures: write a method that loops and performs logic. Often involves an ArrayList or array parameter. Practice filter, transform, count methods.",
          "Class design: given a specification, write a class with fields, constructor, and methods. The spec describes what the class should DO; you translate to code.",
          "Array / ArrayList: manipulate a collection. Filter, sum, search, sort, reverse. Know both array and ArrayList syntax cold.",
          "2D array: traverse a grid. Find max in each row, sum all elements, count occurrences. Nested for loops. Know row vs column indexing.",
        ],
      },
      { type: "h2", text: "Java syntax gotchas" },
      {
        type: "ul",
        items: [
          "String comparison: use .equals(), NOT ==. == compares references; .equals compares content.",
          ".length vs .length() vs .size(): array is property (no parens), String is method (with parens), ArrayList is method (with parens).",
          "Integer division truncates: 5 / 2 = 2. Cast to double for decimal: (double) 5 / 2 = 2.5.",
          "ArrayList holds OBJECTS only. ArrayList<Integer>, not ArrayList<int>. Autoboxing handles conversion.",
          "When removing from ArrayList while iterating, iterate BACKWARDS to avoid skipping elements.",
          "Off-by-one: does the loop include arr.length or stop at arr.length - 1? Hint: use < arr.length, not <=.",
          "2D array: grid.length is rows, grid[0].length is columns. Don't confuse.",
          "Overriding requires identical signature: same name, same parameters, same return type.",
          "Don't forget to return. If a method has a return type (not void), every path must return.",
        ],
      },
      { type: "h2", text: "How to score a 5 on AP CSA" },
      {
        type: "ol",
        items: [
          "Practice tracing code by hand. The MCQ asks what a method returns. If you cannot trace it on paper, the method is confusing in your head too.",
          "Master the four FRQ patterns. Do at least 4-6 timed FRQs from past exams. The patterns repeat every year.",
          "Learn the Java Quick Reference. It tells you what methods are available. If you forget a method signature, check it.",
          "Know the syntax gotchas (especially .length vs .length() vs .size()). These are GUARANTEED to appear.",
          "Code is graded on correctness AND style. Use clear variable names (total, sum, count, not x, y, z). Indent consistently.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Using == instead of .equals() for String comparison. 'abc' == 'abc' is sometimes true in Java for literal strings, but you should ALWAYS use .equals() for strings.",
          "Off-by-one errors in loops. Test your code mentally with edge cases (empty array, array of 1, boundary values).",
          "Modifying an ArrayList while iterating forward: elements shift, you skip items. Iterate backward or use Iterator.remove().",
          "Forgetting to return from a non-void method. Every code path must return a value.",
          "Using int when you need double (or vice versa). Division and assignment rules differ.",
          "Forgetting @Override (not required, but catches typos). Without it, a typo creates a new method rather than overriding.",
          "Using instance variable name when constructor parameter shadows it. Use this.variable = variable to disambiguate.",
          "Confusing public and private. Private can only be accessed within the class. Public is accessible anywhere.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can step through any Java method you paste in and show what each variable holds at each line. Catches off-by-one and missing returns before the exam does. Free tier covers the course.",
      },
      {
        type: "p",
        text: "AP CSA rewards clean, readable code. Write like someone has to grade it in 30 seconds, because someone does.",
      },
    ],
  },
  {
    slug: "ap-environmental-science-review-guide",
    title: "AP Environmental Science Review Guide: Every Unit Made Visual",
    metaTitle: "AP Environmental Science Review Guide: All 9 Units (2026)",
    description:
      "A complete AP Environmental Science review guide covering all 9 units, biogeochemical cycles, energy resources, pollution, climate change, math skills, and FRQ strategies for the 2026 APES exam.",
    excerpt:
      "APES covers ecosystems, populations, resources, pollution, and climate change. This unit-by-unit review organizes around the diagrams, trade-offs, and calculations the exam reuses every year.",
    date: "2026-04-19",
    readTime: "18 min read",
    category: "AP Environmental Science",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "science",
      "STEM",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "APES is the AP science with the widest breadth and the lightest math. The exam tests specific facts (soil horizons, energy sources, pollutants, treaties) AND your ability to reason about environmental trade-offs. Unlike Chem or Physics, APES rewards you for knowing a lot of discrete things rather than mastering a handful of equations.",
      },
      {
        type: "p",
        text: "This guide walks through all 9 units with the facts, math, and diagrams the exam reuses. If you can identify pollutants, interpret data, and reason about environmental choices, you will score well.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "h3", text: "Exam structure and scoring" },
      {
        type: "ul",
        items: [
          "2 hours 40 minutes total.",
          "Section I: 80 multiple choice in 90 minutes. Worth 60 percent.",
          "Section II: 3 free response in 70 minutes. Worth 40 percent.",
          "FRQ #1: design an investigation (hypothesis, variables, controls).",
          "FRQ #2: analyze an environmental problem with authentic data (often includes graphs, math).",
          "FRQ #3: propose and evaluate an environmental solution.",
          "Calculator allowed throughout. Math is straightforward (percentages, unit conversions, simple formulas).",
        ],
      },
      { type: "h2", text: "Unit 1: The Living World, Ecosystems" },
      {
        type: "h3", text: "Biogeochemical cycles and energy flow" },
      {
        type: "ul",
        items: [
          "Biomes: defined by climate and vegetation. Major biomes: tropical rainforest (high biodiversity), temperate forest, grassland, desert, tundra, taiga (boreal), chaparral, wetlands, freshwater, marine.",
          "Carbon cycle: CO2 in atmosphere. Photosynthesis (plants take in CO2, release O2). Respiration (organisms release CO2). Combustion (burning fuels, major human contribution). Decomposition.",
          "Nitrogen cycle: N2 is inert. Requires fixation (by bacteria, lightning, or Haber-Bosch process). Nitrification (NH4+ to NO2- to NO3-). Assimilation (plants take up nitrates). Denitrification (NO3- back to N2).",
          "Phosphorus cycle: no atmospheric phase. Weathering of rocks releases phosphate. Taken up by plants and animals. Returned to soil/water by decomposition. Slow cycle.",
          "Water cycle: evaporation, transpiration, condensation, precipitation, runoff, infiltration, groundwater.",
          "Food chains and food webs: producers (plants) -> primary consumers (herbivores) -> secondary consumers -> tertiary consumers. Decomposers break down dead matter.",
          "10 percent rule: only ~10 percent of energy transfers between trophic levels (the rest is lost as heat). Explains why top predators are rare.",
          "Primary productivity (GPP and NPP): GPP is total energy fixed by producers. NPP is GPP minus respiration (energy available to consumers).",
        ],
      },
      { type: "h2", text: "Unit 2: The Living World, Biodiversity" },
      {
        type: "h3", text: "Ecosystem disturbance and resilience" },
      {
        type: "ul",
        items: [
          "Species diversity: number of species (richness) and their relative abundances (evenness). Measured by Simpson's or Shannon indices.",
          "Ecological tolerance: range of conditions a species can survive. Wider tolerance equals generalist. Narrow equals specialist.",
          "Natural disruptions: fires, hurricanes, volcanic eruptions, disease. Part of natural cycles; some ecosystems depend on them (fire-adapted forests).",
          "Ecological succession: primary (bare rock/soil-less surface, starts with pioneer species like lichens) vs secondary (after disturbance, soil remains).",
          "Stages: pioneer -> grasses and shrubs -> small trees -> mature forest (climax community).",
          "Adaptations: structural, behavioral, physiological. Natural selection favors traits suited to environment.",
          "Keystone species: disproportionate impact on ecosystem relative to numbers (sea otters, wolves). Remove them, the ecosystem collapses.",
          "Indicator species: sensitive to environmental changes, reveal ecosystem health (lichens for air quality, amphibians for water quality).",
        ],
      },
      { type: "h2", text: "Unit 3: Populations" },
      {
        type: "h3", text: "Population dynamics" },
      {
        type: "ul",
        items: [
          "Generalist (broad diet, wide tolerance, common in disturbed areas) vs specialist (narrow niche, vulnerable to change).",
          "r-strategists: many offspring, short life, little parental care (insects, weeds). Good when environments are unstable.",
          "K-strategists: few offspring, long life, much parental care (elephants, humans). Good when environments are stable; population at carrying capacity.",
          "Carrying capacity (K): max population the environment can support long-term.",
          "Population growth: exponential when resources abundant (dN/dt = rN). Logistic as resources become limited (dN/dt = rN(K-N)/K).",
          "Demographic transition: Stage 1 (high birth, high death, low growth: pre-industrial). Stage 2 (death drops, birth high: population surges, developing nations). Stage 3 (birth drops: growth slows). Stage 4 (both low: stable or shrinking).",
          "Age structure pyramids: broad base = growing population. Even = stable. Narrow base = shrinking (Japan, Germany).",
          "Human population: ~8 billion. Growth rate 1.1 percent per year. Global variations: highest in sub-Saharan Africa, shrinking in Japan, parts of Europe.",
        ],
      },
      { type: "h2", text: "Unit 4: Earth Systems and Resources" },
      {
        type: "h3", text: "Physical and geological systems" },
      {
        type: "ul",
        items: [
          "Plate tectonics: convergent (plates collide, subduction, mountains, earthquakes, volcanoes), divergent (plates separate, mid-ocean ridges, rift valleys), transform (plates slide past, San Andreas Fault).",
          "Soil horizons (top to bottom): O (organic, leaf litter), A (topsoil, mix of organic and mineral), E (eluviated, leached), B (subsoil, accumulation), C (parent material), R (bedrock).",
          "Atmospheric layers: troposphere (weather), stratosphere (ozone layer, jets), mesosphere, thermosphere, exosphere.",
          "Watershed: area that drains to a common waterway.",
          "El Nino and La Nina: El Nino (warm Pacific waters near South America, disrupts normal trade winds, affects global weather). La Nina (opposite, cooler waters, intensifies normal patterns).",
          "Solar energy and Earth's tilt cause seasons, not distance from sun.",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        text: "Do not confuse stratospheric ozone (good, blocks UV radiation) with tropospheric ozone (bad, ground-level smog, respiratory irritant). Same molecule (O3), different locations, opposite effects. CFCs destroy stratospheric ozone. Tropospheric ozone is a secondary pollutant from NOx and VOCs reacting in sunlight.",
      },
      { type: "h2", text: "Unit 5: Land and Water Use" },
      {
        type: "h3", text: "Human impacts on land" },
      {
        type: "ul",
        items: [
          "Agriculture: slash and burn (temporary fertility, destroys forests), monoculture (efficient but fragile, pests thrive), irrigation (can cause salinization), Green Revolution (high yields but heavy fertilizer/pesticide use).",
          "Livestock: CAFOs (concentrated animal feeding operations, efficient but waste problem, antibiotic overuse, disease risk). Overgrazing (damages grasslands, desertification).",
          "Deforestation: for agriculture, logging, development. Leads to erosion, biodiversity loss, climate change (reduces carbon sequestration).",
          "Mining: open-pit (huge surface scars), strip mining (coal), mountaintop removal (destroys ecosystems), acid mine drainage (contaminates water).",
          "Overfishing: bycatch, bottom trawling destroys habitats, species collapse (cod, bluefin tuna).",
          "Urbanization: impervious surfaces increase runoff, urban heat island, pollution.",
          "Sustainability: integrated pest management, contour plowing, no-till farming, crop rotation, aquaculture (with caveats), sustainable forestry.",
        ],
      },
      { type: "h2", text: "Unit 6: Energy Resources and Consumption" },
      {
        type: "h3", text: "Energy sources and trade-offs" },
      {
        type: "ul",
        items: [
          "Nonrenewable: fossil fuels (coal, oil, natural gas) and nuclear. Finite supplies.",
          "Coal: cheap, abundant. BUT highest CO2, particulates, mercury emissions. Mining destroys landscapes.",
          "Oil: energy-dense, easy to transport. BUT CO2, spills devastate ecosystems, geopolitics (Middle East, OPEC).",
          "Natural gas: cleaner than coal/oil (less CO2 per unit energy). BUT methane leaks are potent greenhouse gas. Fracking causes water contamination concerns.",
          "Nuclear (fission): low operational CO2. BUT produces long-lived radioactive waste. Meltdown risks (Three Mile Island, Chernobyl, Fukushima). Uranium mining and processing.",
          "Renewable: solar, wind, hydro, geothermal, biomass.",
          "Solar (PV and thermal): zero operational emissions. BUT intermittent, requires battery storage, manufacturing has environmental costs.",
          "Wind: clean, increasingly cheap. BUT intermittent, bird/bat deaths, visual/noise impact.",
          "Hydroelectric: renewable, reliable. BUT dams destroy ecosystems, displace people, emit methane from flooded vegetation.",
          "Geothermal: reliable, clean. BUT location-specific (volcanic areas).",
          "Biomass: renewable. BUT burning produces CO2 (theoretically carbon-neutral if regrown), competes with food crops.",
          "Energy efficiency: using less energy for same service. Cheapest way to cut emissions.",
        ],
      },
      { type: "h2", text: "Unit 7: Atmospheric Pollution" },
      {
        type: "h3", text: "Air pollutants and their effects" },
      {
        type: "ul",
        items: [
          "Primary pollutants: emitted directly (CO, SO2, NOx, particulate matter, VOCs).",
          "Secondary pollutants: form from reactions in atmosphere (O3 ground-level ozone, acid rain).",
          "Photochemical smog: NOx + VOCs + sunlight -> ozone. Worst in cities (LA, Beijing).",
          "Industrial smog (London smog): coal burning -> SO2 + particulates. Thermal inversions trap it.",
          "Acid rain: SO2 + NOx react with water to form H2SO4 and HNO3. Harms lakes, forests, buildings. Worse in areas downwind of industry.",
          "Thermal inversions: warm air traps cold air near ground, concentrating pollutants. Common in valleys.",
          "Indoor air pollution: radon (naturally occurring), asbestos (old buildings), VOCs (cleaners, paint), combustion byproducts (biomass burning in developing countries).",
          "Stratospheric ozone depletion: CFCs (chlorofluorocarbons) destroy O3. Ozone hole over Antarctica. Montreal Protocol (1987) banned CFCs, ozone recovering.",
        ],
      },
      { type: "h2", text: "Unit 8: Aquatic and Terrestrial Pollution" },
      {
        type: "h3", text: "Water and land pollution" },
      {
        type: "ul",
        items: [
          "Point source: identifiable, single source (factory pipe, sewage plant).",
          "Nonpoint source: diffuse (agricultural runoff, urban runoff). Much harder to regulate.",
          "Eutrophication: nutrient pollution (nitrogen, phosphorus from fertilizer) -> algal bloom -> algae die, decomposers consume O2 -> dead zone (low O2, kills fish). Gulf of Mexico dead zone from Mississippi runoff.",
          "Thermal pollution: warm water (from power plants) reduces dissolved O2, stresses fish.",
          "Oil spills: Exxon Valdez, Deepwater Horizon. Devastate marine life, hard to clean up.",
          "Solid waste: landfills (leachate can contaminate groundwater), incineration (reduces volume but releases pollutants), ocean garbage patches (plastics).",
          "Hazardous waste: radioactive, toxic chemicals. Superfund (US program for cleaning contaminated sites).",
          "Dose-response curves: LD50 (dose lethal to 50 percent of test population). Lower LD50 = more toxic.",
          "Bioaccumulation: contaminant builds up in organism over time.",
          "Biomagnification: contaminant concentrates UP the food chain. Top predators have highest concentrations. DDT (eggshell thinning in raptors), mercury (in predatory fish like tuna), PCBs.",
        ],
      },
      { type: "h2", text: "Unit 9: Global Change" },
      {
        type: "h3", text: "Climate and planetary-scale change" },
      {
        type: "ul",
        items: [
          "Greenhouse effect: natural process. Greenhouse gases (GHGs) trap heat. Without it, Earth would be frozen.",
          "Enhanced greenhouse effect: human-caused increase in GHGs (CO2, CH4, N2O, CFCs) raises global temperature.",
          "Main GHGs by warming potential per molecule: CFCs (highest) > N2O > CH4 > CO2. But CO2 is dominant contributor by total quantity.",
          "Sources: CO2 (burning fossil fuels, deforestation), CH4 (cattle, rice paddies, landfills, natural gas leaks), N2O (fertilizer, combustion), CFCs (refrigerants, banned).",
          "Climate change consequences: rising sea levels (melting ice, thermal expansion), changing precipitation patterns, more extreme weather, species migration, ocean acidification, coral bleaching.",
          "Ocean acidification: CO2 dissolves in water, forms H2CO3 (carbonic acid), lowers pH. Harms shellfish, corals (calcium carbonate shells dissolve).",
          "Invasive species: non-native species that outcompete natives. Examples: kudzu (US South), zebra mussels, Asian carp, rabbits in Australia.",
          "Human health impacts: expanded disease vectors (mosquitoes spreading malaria, dengue, Zika), heat waves, air pollution, food/water insecurity.",
        ],
      },
      { type: "h2", text: "Math that shows up" },
      {
        type: "ul",
        items: [
          "Population growth rate: r = (births - deaths + immigration - emigration) / population.",
          "Doubling time: 70 / percent growth rate (Rule of 70).",
          "Percent change: (new - old) / old * 100.",
          "Dimensional analysis (unit conversions): always show work. Convert m to km, kg to metric tons, etc.",
          "Half-life calculations: how much contaminant remains after n half-lives? (1/2) to the n times original amount.",
          "Energy calculations: 1 kWh = 3.6 million joules. Power (watts) times time (hours) = energy (kWh).",
          "Reading graphs: trends over time, correlations, identifying variables.",
        ],
      },
      { type: "h2", text: "Key laws and treaties" },
      {
        type: "ul",
        items: [
          "Clean Air Act (1970, 1990): regulates air pollutants. Cap-and-trade for SO2 reduced acid rain.",
          "Clean Water Act (1972): regulates water pollution.",
          "Endangered Species Act (1973): protects threatened and endangered species.",
          "Montreal Protocol (1987): banned CFCs. Ozone recovering.",
          "Kyoto Protocol (1997): first international climate treaty. US did not ratify.",
          "Paris Agreement (2015): nations set own climate targets. Goal to limit warming to 1.5-2 degrees C above pre-industrial.",
          "CITES: international treaty to protect endangered species from trade.",
          "Superfund (CERCLA 1980): cleans hazardous waste sites.",
          "EPA: federal agency enforcing environmental laws.",
        ],
      },
      { type: "h2", text: "How to score a 5 on APES" },
      {
        type: "ol",
        items: [
          "Master the 9 units as a whole, not as silos. An FRQ on nitrogen pollution pulls from Unit 1 (cycle), Unit 5 (agriculture), Unit 8 (eutrophication), and Unit 9 (climate).",
          "Memorize pollutants and their sources. What causes smog? Acid rain? Dead zones? Ozone depletion? These appear constantly.",
          "Practice the math. Doubling time, percent change, unit conversions. Always show work and units.",
          "Know the major laws and treaties. Montreal, Paris, Clean Air, Endangered Species. What did each do?",
          "Practice the FRQ types. Investigation design (hypothesis, variables, controls). Problem analysis (read graphs, interpret data). Solution evaluation (pros, cons, trade-offs).",
          "On solution FRQs, propose environmentally AND economically viable solutions. The grader rewards practical thinking.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Confusing weather (day-to-day) with climate (decades-to-centuries). Weather is a specific day; climate is a long-term average.",
          "Assuming all nuclear power is the same as nuclear weapons. Fission power plants do not explode like bombs. But they do produce waste.",
          "Saying the ozone hole causes global warming. They are SEPARATE issues. Ozone depletion is UV radiation; climate change is GHGs.",
          "Skipping units on APES calculations. That is a guaranteed point loss. Show work AND units.",
          "Confusing the carbon cycle steps. Photosynthesis (CO2 to plants). Respiration (plants/animals to CO2). Combustion (fossil fuels to CO2).",
          "Forgetting renewable does not equal sustainable. Biomass is renewable but unsustainable if deforestation is involved. Hydroelectric is renewable but dam construction has huge impacts.",
          "Misidentifying primary vs secondary pollutants. Primary emitted directly (CO, SO2). Secondary forms in atmosphere (O3, acid rain).",
          "Treating humans as separate from ecosystems. We are part of them. Human impact is always on the exam.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep's tutor has APES mapped across units, so when you ask about nitrogen runoff in Unit 8, it reminds you of the nitrogen cycle from Unit 1. Free tier covers APES.",
      },
      {
        type: "p",
        text: "APES is wide, not deep. Make flashcards of the specific facts (pollutants, energy sources, treaties), practice the calculations, and understand the trade-offs. That is the exam.",
      },
    ],
  },
  {
    slug: "ap-psychology-review-guide",
    title: "AP Psychology Review Guide: All 5 Units Explained",
    metaTitle: "AP Psychology Review Guide: All 5 Units (2026 Exam)",
    description:
      "A complete AP Psychology review guide covering all 5 units of the redesigned course, key researchers, neurotransmitters, disorders, therapies, FRQ strategies, and the concepts the exam tests every year.",
    excerpt:
      "The new AP Psychology course trimmed nine units to five. This unit-by-unit review covers every topic on the redesigned CED with the researchers, studies, and FRQ patterns the exam reuses.",
    date: "2026-04-20",
    readTime: "18 min read",
    category: "AP Psychology",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "humanities",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Psychology was redesigned for the 2024-25 school year. The old 9 units are now 5 broader units, and the exam emphasizes real-world application more than memorizing researchers. The content is still rich, but the new structure makes it easier to study if you know how to use it.",
      },
      {
        type: "p",
        text: "This guide walks through all 5 units, the researchers you must know, the define-then-apply FRQ template, and the concepts that trip people up (negative reinforcement vs punishment, sensation vs perception, correlation vs causation).",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "h3", text: "Exam structure and scoring" },
      {
        type: "ul",
        items: [
          "2 hours total.",
          "Section I: 75 multiple choice in 90 minutes. Worth 67 percent.",
          "Section II: 2 free response in 70 minutes. Worth 33 percent.",
          "FRQ #1: Article Analysis Question (AAQ). You read a research article summary, describe design, apply concepts, evaluate claims.",
          "FRQ #2: Evidence-Based Question (EBQ). You apply psychology concepts to a scenario.",
          "No calculator. No formulas to speak of. This is a concepts exam.",
        ],
      },
      { type: "h2", text: "Unit 1: Biological Bases of Behavior" },
      {
        type: "h3", text: "What you need to know (15-25 percent)" },
      {
        type: "p",
        text: "Nervous system, brain structures, sensation and perception, consciousness. The biological foundation for all other units.",
      },
      {
        type: "h3", text: "Neurons and neurotransmitters" },
      {
        type: "ul",
        items: [
          "Neuron parts: dendrites (receive), cell body (soma), axon (send), myelin sheath (insulation, speeds signal), terminal buttons (release neurotransmitters).",
          "Action potential: all-or-nothing electrical signal. Resting potential (negative inside) -> depolarization (sodium rushes in) -> repolarization (potassium out).",
          "Synapse: gap between neurons. Neurotransmitters cross and bind to receptors.",
          "Key neurotransmitters: dopamine (reward, movement; too little = Parkinson's, too much = schizophrenia), serotonin (mood, sleep; low = depression), GABA (main inhibitor), glutamate (main excitor), acetylcholine (memory, muscle), norepinephrine (alertness, arousal), endorphins (pain suppression).",
          "Agonists mimic a neurotransmitter. Antagonists block it. Drugs work this way.",
        ],
      },
      {
        type: "h3", text: "Brain structures and lobes" },
      {
        type: "ul",
        items: [
          "Brainstem: medulla (breathing, heart rate), pons (arousal, sleep). Most primitive.",
          "Cerebellum: balance, coordination, procedural memory.",
          "Limbic system: thalamus (sensory relay), hypothalamus (body regulation, hunger, thirst, sex), hippocampus (memory formation), amygdala (emotion, especially fear).",
          "Cerebral cortex: four lobes. Frontal (decision-making, planning, personality, Broca's area for speech production). Parietal (sensory, spatial). Temporal (auditory, Wernicke's area for language comprehension). Occipital (vision).",
          "Split brain: corpus callosum connects hemispheres. When severed, hemispheres process independently (Sperry, Gazzaniga studies).",
          "Plasticity: brain can rewire after injury (especially in young).",
        ],
      },
      {
        type: "h3", text: "Sensation and perception" },
      {
        type: "ul",
        items: [
          "Sensation: detecting stimuli. Perception: interpreting them.",
          "Vision: light enters pupil, lens focuses on retina. Rods (dim light, peripheral) and cones (color, center). Optic nerve to visual cortex.",
          "Hearing: sound waves move eardrum, bones amplify to cochlea. Hair cells send signal to auditory cortex.",
          "Gestalt principles: proximity, similarity, closure, continuity. The brain organizes sensory input.",
          "Signal detection theory: ability to detect a stimulus depends on both signal strength and decision criteria (noise, motivation).",
          "Top-down (based on expectations) vs bottom-up (based on raw data) processing.",
        ],
      },
      { type: "h2", text: "Unit 2: Cognition" },
      {
        type: "h3", text: "What you need to know (15-25 percent)" },
      {
        type: "p",
        text: "Memory, thinking, intelligence, language. How the mind processes information.",
      },
      {
        type: "h3", text: "Memory" },
      {
        type: "ul",
        items: [
          "Three stages: encoding (getting info in), storage (holding), retrieval (getting it out).",
          "Three storage systems (Atkinson-Shiffrin model): sensory memory (< 1 second), short-term / working memory (~20 seconds, 7 +/- 2 items), long-term memory (potentially unlimited, permanent).",
          "Long-term memory types: explicit / declarative (semantic = facts, episodic = events), implicit / non-declarative (procedural = how to do things, conditioned responses).",
          "Serial position effect: remember first (primacy, encoded to LTM) and last (recency, still in STM) items best.",
          "Forgetting: encoding failure, storage decay, retrieval failure.",
          "Interference: proactive (old info disrupts new), retroactive (new info disrupts old).",
          "Mnemonics: chunking, method of loci, acronyms.",
        ],
      },
      {
        type: "h3", text: "Thinking and problem solving" },
      {
        type: "ul",
        items: [
          "Concepts: mental groupings. Prototypes are the best examples.",
          "Algorithms (step-by-step, guaranteed solution) vs heuristics (shortcuts, faster but sometimes wrong).",
          "Availability heuristic: judging by what comes to mind easily. Leads to overestimating vivid events (plane crashes).",
          "Representativeness heuristic: judging by how much something resembles a stereotype.",
          "Confirmation bias: seeking info that confirms existing beliefs.",
          "Framing: how info is presented affects decisions (same surgery with 90 percent survival vs 10 percent mortality).",
          "Fixation: inability to see a problem from a new angle. Functional fixedness (stuck on typical function of an object).",
        ],
      },
      {
        type: "h3", text: "Intelligence and language" },
      {
        type: "ul",
        items: [
          "Intelligence theories: Spearman's g (general intelligence), Gardner's multiple intelligences (linguistic, logical, musical, spatial, bodily, interpersonal, intrapersonal, naturalistic), Sternberg's triarchic (analytical, creative, practical).",
          "IQ: mean 100, SD 15. Bell curve. Normal distribution.",
          "Stereotype threat: worry about confirming a negative stereotype impairs performance.",
          "Language: phonemes (sounds), morphemes (meanings), grammar (rules).",
          "Language acquisition: universal stages. Babbling, one-word, two-word, telegraphic speech.",
          "Whorf's linguistic relativity: language shapes thought (debated).",
        ],
      },
      { type: "h2", text: "Unit 3: Development and Learning" },
      {
        type: "h3", text: "What you need to know (15-25 percent)" },
      {
        type: "p",
        text: "Lifespan development and how organisms learn (conditioning, observation). Combines biological and environmental factors.",
      },
      {
        type: "h3", text: "Development theories" },
      {
        type: "ul",
        items: [
          "Piaget's cognitive stages: sensorimotor (0-2, object permanence), preoperational (2-7, pretend play, egocentric, lacks conservation), concrete operational (7-11, can reason logically about concrete objects), formal operational (12+, abstract reasoning).",
          "Erikson's psychosocial stages (8 across lifespan): trust vs mistrust (infancy), autonomy vs shame, initiative vs guilt, industry vs inferiority, identity vs role confusion (adolescence), intimacy vs isolation, generativity vs stagnation, integrity vs despair.",
          "Kohlberg's moral development: preconventional (avoid punishment, rewards), conventional (social approval, law and order), postconventional (social contract, universal ethics).",
          "Attachment: Harlow's monkeys showed comfort more important than food. Ainsworth's Strange Situation: secure, avoidant, anxious/resistant attachment.",
          "Nature vs nurture: both matter. Twin studies reveal genetic influence on intelligence, personality.",
        ],
      },
      {
        type: "h3", text: "Classical conditioning" },
      {
        type: "ul",
        items: [
          "Pavlov's dogs: learning through association. Neutral stimulus (bell) paired with unconditioned stimulus (food) becomes conditioned stimulus that elicits conditioned response (salivation).",
          "Acquisition: learning the association.",
          "Extinction: CS alone (no US) stops eliciting CR.",
          "Spontaneous recovery: after extinction, CR returns briefly.",
          "Generalization: similar stimuli elicit the response. Discrimination: responding only to specific CS.",
          "Watson's Little Albert: human classical conditioning of fear.",
        ],
      },
      {
        type: "h3", text: "Operant conditioning" },
      {
        type: "ul",
        items: [
          "Skinner: learning through consequences. Reinforcement increases behavior; punishment decreases it.",
          "Positive reinforcement: add a pleasant stimulus (praise, money).",
          "Negative reinforcement: remove an unpleasant stimulus (taking Tylenol for headache).",
          "Positive punishment: add an unpleasant stimulus (spanking).",
          "Negative punishment: remove a pleasant stimulus (grounding, time-out).",
          "Reinforcement schedules: continuous (every response) vs partial (intermittent). Partial schedules more resistant to extinction.",
          "Ratio schedules (based on behaviors): fixed (every nth) or variable (slot machines).",
          "Interval schedules (based on time): fixed (paycheck) or variable (checking social media).",
          "Variable schedules produce highest, most persistent responding.",
          "Shaping: reinforcing successive approximations toward target behavior.",
        ],
      },
      {
        type: "h3", text: "Observational learning" },
      {
        type: "ul",
        items: [
          "Bandura's Bobo doll experiment: children imitate aggressive behavior they observe.",
          "Mirror neurons may provide neurological basis.",
          "Media and TV have observational learning effects on behavior.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Reinforcement INCREASES behavior; punishment DECREASES it. Positive means ADDING a stimulus; negative means REMOVING one. Negative reinforcement (removing a bad thing to strengthen behavior) is the one students confuse with punishment most often. A rat pushing a button to stop a shock is NEGATIVE REINFORCEMENT, not punishment.",
      },
      { type: "h2", text: "Unit 4: Social Psychology and Personality" },
      {
        type: "h3", text: "What you need to know (15-25 percent)" },
      {
        type: "p",
        text: "Social influences, attitudes, personality theories. People in context.",
      },
      {
        type: "h3", text: "Social thinking and influence" },
      {
        type: "ul",
        items: [
          "Attribution theory: explaining behavior via disposition (personality) vs situation (environment).",
          "Fundamental attribution error: overemphasizing disposition, underemphasizing situation when judging others. (We do the opposite for ourselves: self-serving bias.)",
          "Cognitive dissonance: discomfort when attitudes and behavior conflict. People change attitudes to match behavior.",
          "Conformity: Asch line study. People often agree with the group even when group is wrong. Driven by informational influence (want to be right) or normative influence (want to be liked).",
          "Obedience: Milgram's shock study. 65 percent administered lethal shocks when authority figure said to.",
          "Zimbardo's Stanford Prison Experiment: ordinary people adopt brutal or submissive roles.",
          "Bystander effect: people less likely to help when others present (Kitty Genovese case). Diffusion of responsibility.",
          "Group polarization: groups make more extreme decisions than individuals.",
          "Groupthink: desire for harmony overrides realistic appraisal (Bay of Pigs).",
          "Social facilitation: presence of others improves performance on easy tasks, hurts on hard tasks.",
        ],
      },
      {
        type: "h3", text: "Personality" },
      {
        type: "ul",
        items: [
          "Psychodynamic (Freud): id (pleasure), ego (reality), superego (morality). Defense mechanisms (denial, projection, rationalization, sublimation, repression).",
          "Humanistic (Maslow, Rogers): hierarchy of needs (physiological to self-actualization). Unconditional positive regard.",
          "Trait theories: Big Five (OCEAN - Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism).",
          "Social-cognitive (Bandura): reciprocal determinism. Behavior, environment, and person interact.",
        ],
      },
      { type: "h2", text: "Unit 5: Mental and Physical Health" },
      {
        type: "h3", text: "What you need to know (15-25 percent)" },
      {
        type: "p",
        text: "Motivation, emotion, stress, disorders, therapies. Practical applications.",
      },
      {
        type: "h3", text: "Motivation and emotion" },
      {
        type: "ul",
        items: [
          "Drive reduction: motivated to reduce physiological need (hunger, thirst).",
          "Arousal theory: seek optimal arousal (Yerkes-Dodson: moderate is best).",
          "Maslow's hierarchy: physiological -> safety -> belongingness -> esteem -> self-actualization.",
          "Intrinsic (internal reward) vs extrinsic (external reward) motivation. Overjustification effect: external rewards can reduce intrinsic motivation.",
          "Theories of emotion: James-Lange (body first, then emotion), Cannon-Bard (simultaneous), Schachter-Singer two-factor (arousal + cognitive label).",
        ],
      },
      {
        type: "h3", text: "Stress and health" },
      {
        type: "ul",
        items: [
          "Selye's general adaptation syndrome: alarm, resistance, exhaustion.",
          "Problem-focused coping (tackle the problem) vs emotion-focused (manage the feelings).",
          "Stress weakens immune system, contributes to heart disease, depression.",
          "Social support, exercise, mindfulness reduce stress.",
        ],
      },
      {
        type: "h3", text: "Psychological disorders" },
      {
        type: "ul",
        items: [
          "DSM-5 categorizes disorders.",
          "Anxiety disorders: generalized anxiety, panic disorder, phobias, OCD.",
          "Depressive and bipolar disorders: major depressive disorder, persistent depressive, bipolar I and II.",
          "Schizophrenia spectrum: positive symptoms (hallucinations, delusions), negative (flat affect, social withdrawal).",
          "Personality disorders: antisocial, borderline, narcissistic.",
          "Neurocognitive: Alzheimer's, dementia.",
          "Eating disorders: anorexia, bulimia.",
          "Dissociative: amnesia, identity disorder.",
        ],
      },
      {
        type: "h3", text: "Therapy" },
      {
        type: "ul",
        items: [
          "Psychoanalysis (Freud): free association, dream analysis, uncovering unconscious conflicts.",
          "Humanistic / client-centered (Rogers): unconditional positive regard, active listening, help client reach self-actualization.",
          "Behavior therapy: classical conditioning techniques (systematic desensitization for phobias), operant (token economies).",
          "Cognitive therapy (Beck, Ellis): identify and change distorted thinking patterns.",
          "Cognitive-behavioral therapy (CBT): combines cognitive and behavior approaches. Evidence-based for many disorders.",
          "Biological: medications (SSRIs for depression, antipsychotics for schizophrenia, lithium for bipolar), ECT (electroconvulsive therapy).",
        ],
      },
      { type: "h2", text: "Researchers you must know" },
      {
        type: "ul",
        items: [
          "Freud: psychoanalysis, unconscious, defense mechanisms.",
          "Pavlov: classical conditioning (dogs).",
          "Skinner: operant conditioning (rats, pigeons).",
          "Watson: behaviorism. Little Albert (fear conditioning in humans).",
          "Bandura: observational learning (Bobo doll), self-efficacy.",
          "Piaget: cognitive development stages.",
          "Erikson: psychosocial stages across lifespan.",
          "Kohlberg: moral development.",
          "Maslow: hierarchy of needs, humanistic psychology.",
          "Rogers: client-centered therapy, unconditional positive regard.",
          "Asch: conformity (line study).",
          "Milgram: obedience (shock study).",
          "Zimbardo: Stanford Prison Experiment.",
          "Harlow: attachment (monkeys).",
          "Ainsworth: Strange Situation, attachment styles.",
          "Sperry and Gazzaniga: split-brain studies.",
          "Beck and Ellis: cognitive therapy.",
          "Selye: general adaptation syndrome (stress).",
          "Loftus: memory and eyewitness testimony.",
        ],
      },
      { type: "h2", text: "How to attack the two FRQs" },
      {
        type: "h3", text: "The define-then-apply template" },
      {
        type: "p",
        text: "Both FRQs reward specific definitions followed by specific application. This template works for every single AP Psych FRQ:",
      },
      {
        type: "ol",
        items: [
          "First sentence: DEFINE the concept. 'Negative reinforcement is the removal of an aversive stimulus to increase a behavior.'",
          "Second sentence: APPLY it to the scenario. 'In the scenario, Sarah puts on her seatbelt to stop the annoying beep, which makes her more likely to put on the seatbelt in the future.'",
          "Connect your application to the specific facts in the scenario. Quote details. Do not stay abstract.",
        ],
      },
      {
        type: "p",
        text: "If you just name-drop the term without defining it, you lose the point. If you define without applying, you lose the point. DO BOTH.",
      },
      { type: "h2", text: "How to score a 5 on AP Psychology" },
      {
        type: "ol",
        items: [
          "Master the researchers. They are tested constantly. Make flashcards: name on one side, contribution on the other.",
          "Master the neurotransmitters. Match each to function and associated disorders.",
          "Know the difference between classical and operant conditioning. This is tested every year and students confuse them.",
          "Use the define-then-apply template on every FRQ. Every term needs both a definition and an application.",
          "Practice reading research abstracts. The AAQ requires you to evaluate studies.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Confusing negative reinforcement with punishment. Negative reinforcement INCREASES behavior (by removing something bad). Punishment DECREASES behavior.",
          "Using 'prove' or 'cause' when a study only shows correlation. Correlational studies cannot establish causation.",
          "Mixing up retroactive (new info disrupts OLD) and proactive (OLD disrupts new) interference.",
          "Forgetting perception vs sensation. Sensation = detecting a stimulus. Perception = interpreting it.",
          "Confusing classical and operant conditioning. Classical: associating two stimuli. Operant: consequences shaping behavior.",
          "Attributing Pavlov's name to operant conditioning (it's classical). Skinner's to classical (it's operant).",
          "Forgetting to define terms on FRQs. Just listing 'this is negative reinforcement' does not earn full credit.",
          "Incorrect stage assignments. Piaget's preoperational is 2-7 (not 0-2). Erikson's intimacy vs isolation is young adulthood (not adolescence).",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can quiz you on the psychology researchers and their studies, or run you through practice FRQs in the correct define-then-apply format. Free tier covers AP Psych.",
      },
      {
        type: "p",
        text: "AP Psych rewards clear definitions and specific applications. Know the researchers, know the terms, apply them to examples. Master the define-then-apply template, and the FRQs become mechanical.",
      },
    ],
  },
  {
    slug: "ap-human-geography-review-guide",
    title: "AP Human Geography Review Guide: All 7 Units Explained",
    metaTitle: "AP Human Geography Review Guide: All 7 Units (2026)",
    description:
      "A complete AP Human Geography review guide covering all 7 units, key models (DTM, von Thunen, Weber, Rostow, Wallerstein), case studies, and FRQ strategies for the 2026 AP Human Geo exam.",
    excerpt:
      "AP Human Geography tests a handful of models (demographic transition, von Thunen, urban structure, Weber, world systems) on every exam. This guide covers all of them plus the FRQ patterns that come back every year.",
    date: "2026-04-21",
    readTime: "18 min read",
    category: "AP Human Geography",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "humanities",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Human Geography is one of the shortest AP exams and one of the most predictable. The course is built around a small set of models (demographic transition, von Thunen, concentric zone, Weber, world systems) that show up on every exam. If you know the models plus a few case studies per theme, the exam is very manageable.",
      },
      {
        type: "p",
        text: "This guide walks you through all 7 units, the 8+ models you must memorize, and the FRQ templates that score well. Learn the models, use the vocabulary, and apply them to specific places.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "h3", text: "Exam structure and scoring" },
      {
        type: "ul",
        items: [
          "2 hours 15 minutes total.",
          "Section I: 60 multiple choice in 60 minutes. Worth 50 percent.",
          "Section II: 3 free response in 75 minutes. Worth 50 percent.",
          "FRQ #1: no stimulus. Apply concepts to a scenario.",
          "FRQ #2: stimulus (map, chart, image). Interpret and analyze.",
          "FRQ #3: two stimuli. Compare and analyze.",
          "Each FRQ has 7 parts (A-G), increasing in complexity. Early parts are definitions; later parts require application.",
          "No calculator. Specific geographic vocabulary is essential.",
        ],
      },
      { type: "h2", text: "Unit 1: Thinking Geographically" },
      {
        type: "h3", text: "What you need to know (8-10 percent)" },
      {
        type: "ul",
        items: [
          "Maps and projections: Mercator (preserves angles, distorts size near poles), Peters (preserves area, distorts shape), Robinson (compromise), Goode's homolosine (preserves area via interruptions), Fuller/Dymaxion.",
          "Types of maps: reference (political, physical) vs thematic (dot density, choropleth, graduated/proportional symbols, isoline, cartogram).",
          "Scale of analysis: global, regional, national, local. Scale matters: poverty rate at national scale hides huge regional variations.",
          "Absolute vs relative location: absolute = latitude/longitude. Relative = in relation to other places.",
          "Types of regions: formal (uniform, e.g., Corn Belt, countries with common official language), functional (nodal, organized around a central point like a media market), vernacular (perceived, e.g., 'The Bible Belt', 'Silicon Valley').",
          "GIS (Geographic Information Systems): digital mapping that layers data. Used in urban planning, disaster response.",
          "Spatial patterns: absolute distance (miles), relative distance (travel time), time-space compression (technology reduces effective distance).",
          "Geographic data sources: census, remote sensing (satellites), field work, GPS.",
        ],
      },
      { type: "h2", text: "Unit 2: Population and Migration" },
      {
        type: "h3", text: "What you need to know (12-17 percent)" },
      {
        type: "h3", text: "Population" },
      {
        type: "ul",
        items: [
          "Demographic Transition Model (DTM) - 5 stages: Stage 1 (high birth/death, low growth, pre-industrial). Stage 2 (death drops, birth still high, rapid growth). Stage 3 (birth drops, growth slows). Stage 4 (both low, slow growth). Stage 5 (birth below death, shrinking population).",
          "Stage examples: Stage 2 (parts of sub-Saharan Africa), Stage 3 (Mexico, India moving toward). Stage 4 (US, most of Europe). Stage 5 (Japan, Germany, Italy).",
          "Total Fertility Rate (TFR): average births per woman. Replacement rate is ~2.1. Below 2.1 = shrinking.",
          "Crude Birth/Death Rate (CBR, CDR): births/deaths per 1000 people per year.",
          "Natural Increase Rate (NIR) = (CBR - CDR) / 10. If NIR = 1, population doubles in 70 years (rule of 70).",
          "Population pyramids: show age/sex structure. Broad base = young, growing. Even = stable. Narrow base = aging, shrinking.",
          "Dependency ratio: young (0-15) + old (65+) divided by working age (15-64). High = more dependents per worker.",
          "Malthus vs Boserup: Malthus predicted population would outgrow food; Boserup argued population drives innovation.",
          "Epidemiological transition: disease patterns shift (infectious -> chronic) as countries develop.",
        ],
      },
      {
        type: "h3", text: "Migration" },
      {
        type: "ul",
        items: [
          "Push factors (drive people away): war, famine, persecution, unemployment, environmental disaster.",
          "Pull factors (attract people): jobs, education, family, political/religious freedom, climate.",
          "Ravenstein's laws: most migrants move short distances, women migrate locally more than men, most are young adults, economic factors drive migration.",
          "Types: voluntary vs forced (refugees, human trafficking, slavery). Internal (rural-to-urban) vs international. Step migration (in stages, e.g., village -> small town -> large city).",
          "Remittances: money migrants send home. Major economic flow to many developing countries.",
          "Brain drain: emigration of highly educated workers (doctors leaving developing countries for developed ones).",
          "Chain migration: relatives follow earlier migrants to established communities.",
          "Refugees vs IDPs (internally displaced persons): refugees cross borders, IDPs remain in own country.",
        ],
      },
      { type: "h2", text: "Unit 3: Cultural Patterns and Processes" },
      {
        type: "h3", text: "What you need to know (12-17 percent)" },
      {
        type: "ul",
        items: [
          "Folk (traditional, localized) vs popular (widespread, mass-produced) culture.",
          "Cultural hearth: where a cultural innovation originated.",
          "Language families: Indo-European largest (English, Spanish, Hindi, Russian). Sino-Tibetan (Mandarin), Afro-Asiatic (Arabic), Niger-Congo.",
          "Lingua franca: language used between people who don't share native language (English globally). Pidgin (simplified, for trade) vs Creole (pidgin becomes first language).",
          "Religions: universalizing (seek converts: Christianity, Islam, Buddhism) vs ethnic (tied to a people/place: Hinduism, Judaism, Sikhism). Branches, denominations, sects within.",
          "Cultural diffusion types: relocation (moves with migrants), expansion (spreads while staying in origin): contagious (like a disease, neighbors), hierarchical (spreads along power/size hierarchy), stimulus (general idea spreads, adapts locally), reverse hierarchical (from small to big, unusual).",
          "Example: McDonald's expanding globally = hierarchical expansion diffusion. A virus through a crowd = contagious expansion diffusion. An immigrant bringing their cuisine = relocation diffusion.",
          "Cultural convergence (cultures merge, homogenization) vs divergence (cultures differentiate).",
          "Globalization's effect on culture: Americanization, McDonaldization, but also hybrid cultures.",
        ],
      },
      { type: "h2", text: "Unit 4: Political Patterns and Processes" },
      {
        type: "h3", text: "What you need to know (12-17 percent)" },
      {
        type: "ul",
        items: [
          "State (country with sovereignty), nation (group with shared identity), nation-state (nation with its own state, Japan close, Iceland nearly perfect), multinational state (multiple nations within, UK, Canada), stateless nation (no state of their own, Kurds, Palestinians, historically Jews before Israel).",
          "Devolution: central government gives power to sub-national units. Scotland from UK, Quebec debates in Canada, Basque region in Spain.",
          "Supranational organizations: UN, EU, NATO, ASEAN, WTO, African Union.",
          "Boundary types: antecedent (drawn before settlement, Indonesia/Papua New Guinea), subsequent (after settlement, adjusts to cultural features), superimposed (imposed without regard for culture, colonial Africa), relic (no longer functions, Berlin Wall, Great Wall of China).",
          "Boundary disputes: definitional (wording), locational (where exactly), operational (how to manage), allocational (resources under boundary like oil).",
          "Centripetal forces (unify state): shared language, religion, history, external threats, strong leader.",
          "Centrifugal forces (divide state): ethnic conflict, economic inequality, corruption.",
          "Gerrymandering: drawing voting districts to favor a party. Packing (concentrating opposition in one district) vs cracking (spreading them thin).",
          "Forms of government: unitary (power centralized, France) vs federal (power shared with states, US, Germany).",
          "Colonialism vs imperialism: colonialism = direct control and settlement. Imperialism = broader political/economic dominance.",
        ],
      },
      { type: "h2", text: "Unit 5: Agriculture and Rural Land Use" },
      {
        type: "h3", text: "What you need to know (12-17 percent)" },
      {
        type: "ul",
        items: [
          "Three Agricultural Revolutions: First / Neolithic (domestication of plants and animals, ~10,000 years ago, hearths in Fertile Crescent, Mesoamerica, China). Second (scientific methods, crop rotation, machinery, 1700s Britain). Third / Green Revolution (hybrid seeds, fertilizers, pesticides, mechanization, 20th century, India, Mexico).",
          "Subsistence agriculture (grow what you eat) vs commercial (grow to sell). Common in developing vs developed.",
          "Types: shifting cultivation (slash and burn), pastoral nomadism (herding in dry regions), intensive (high input per area: rice in East Asia, Mediterranean), extensive (low input: ranching, wheat in US plains), plantation (commercial, tropical, cash crops).",
          "Von Thunen's Model: assumes isolated city, flat land, uniform climate. Rings radiating from city: dairy/horticulture (closest, perishable), forest, grains, ranching (furthest).",
          "Clustered vs dispersed settlements: depend on topography, culture.",
          "Survey patterns: metes and bounds (natural features, oldest US), township-and-range (grid, Midwest/West), long lot (narrow river frontage, French Louisiana and Quebec).",
          "GMOs: genetically modified organisms. Controversial for environmental and health reasons.",
          "Food deserts: areas (often urban low-income or rural) without access to fresh food.",
          "Modern trends: organic farming, urban agriculture, fair trade, local food movements.",
        ],
      },
      { type: "h2", text: "Unit 6: Cities and Urban Land Use" },
      {
        type: "h3", text: "What you need to know (12-17 percent)" },
      {
        type: "ul",
        items: [
          "Central Place Theory (Christaller): settlements form hierarchy based on goods/services they provide. Range (distance people will travel for a good) vs threshold (minimum demand needed to sustain).",
          "Rank-size rule: nth largest city is 1/n the size of largest (US approximately follows).",
          "Primate city: largest city dwarfs others (Paris, Mexico City, Bangkok).",
          "World cities (global cities): command and control for global economy. New York, London, Tokyo are top tier.",
          "Suburbanization, edge cities (commercial hubs outside central city).",
          "Urban models for North America: Concentric Zone (Burgess, Chicago 1920s): rings of CBD, transition zone (slums), workers, middle-class, commuter. Sector (Hoyt): wedges radiating from CBD along transit. Multiple Nuclei (Harris-Ullman): multiple commercial centers.",
          "Griffin-Ford (Latin American city): CBD with wealthy spine, concentric rings decreasing in wealth, disamenity sector (favelas).",
          "Sub-Saharan African city: three CBDs (traditional, colonial, market), ethnic neighborhoods, squatter settlements.",
          "Southeast Asian city (McGee): focal point is port, not CBD. Mixed land use.",
          "Urban issues: gentrification (wealth displaces poor from revitalized neighborhoods), urban sprawl (low-density expansion), brownfields (abandoned industrial), smart growth, new urbanism.",
          "Census tract vs MSA (metropolitan statistical area).",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "The Burgess concentric zone model is for Chicago, 1920s. Do not apply it to a Latin American city. Use the Griffin-Ford model (wealthy spine, disamenity zones) for Latin America. The specific model depends on the region you are analyzing.",
      },
      { type: "h2", text: "Unit 7: Industrial and Economic Development" },
      {
        type: "h3", text: "What you need to know (12-17 percent)" },
      {
        type: "ul",
        items: [
          "Industrial Revolution: started in Britain (1700s). Steam power, textiles, railroads. Spread to Western Europe, US, Japan, East Asia.",
          "Weber's Least Cost Theory: factory locates to minimize combined cost of raw materials, labor, transportation. Weight-gaining industries (bakeries) locate near market. Weight-losing (smelters) locate near raw materials.",
          "Rostow's Stages of Economic Development: Traditional society, Preconditions for takeoff, Takeoff, Drive to maturity, Age of high mass consumption. Linear model, critiqued for Western bias.",
          "Wallerstein's World Systems Theory: Core (rich, industrial: US, Germany, Japan), Semi-periphery (transitional: China, Brazil, India), Periphery (poor, raw material producers: sub-Saharan Africa, Bangladesh). Core exploits periphery; semi-periphery buffers.",
          "Measures of development: GDP/GNI (economic output), GDP per capita (per person), HDI (Human Development Index: life expectancy, education, income), GII (Gender Inequality Index).",
          "Measures of social welfare: literacy rate, infant mortality, maternal mortality, life expectancy.",
          "Economic sectors: primary (extraction: farming, mining), secondary (manufacturing), tertiary (services), quaternary (research, tech, info), quinary (high-level decisions, CEOs).",
          "Shift from primary to tertiary indicates development (deindustrialization in developed countries).",
          "Fordism (assembly line, mass production) vs post-Fordism (flexible production, customization, global supply chains).",
          "Globalization: interconnected economies. Supply chains span countries. Outsourcing to lower-wage nations.",
          "MNCs (multinational corporations): operate across multiple countries.",
          "Fair trade, microfinance, sustainable development: responses to development inequality.",
        ],
      },
      { type: "h2", text: "The models you must memorize" },
      {
        type: "ul",
        items: [
          "Demographic Transition Model (5 stages: birth/death rates).",
          "Ravenstein's laws of migration.",
          "Von Thunen's agricultural land use model.",
          "Concentric Zone (Burgess), Sector (Hoyt), Multiple Nuclei (Harris-Ullman) urban models.",
          "Griffin-Ford (Latin American), Sub-Saharan African, McGee (Southeast Asian) city models.",
          "Weber's Least Cost Theory (industrial location).",
          "Rostow's Stages of Economic Development.",
          "Wallerstein's World Systems Theory (core/semi-periphery/periphery).",
          "Central Place Theory (Christaller): settlement hierarchy.",
        ],
      },
      { type: "h2", text: "How to score a 5 on AP Human Geography" },
      {
        type: "ol",
        items: [
          "Memorize the models. Each one is likely to appear on the exam. Know the stages, rings, sectors cold.",
          "Learn vocabulary. APHG graders reward specific geographic terminology (centripetal forces, centrifugal forces, gerrymandering, chain migration). Substitute these for general terms.",
          "Know case studies for each theme. Population: Japan (Stage 5, aging). Culture: Hindi/Urdu divergence. Politics: EU devolution. Agriculture: Green Revolution in India.",
          "Practice the FRQ format. 7 parts (A-G). Parts A-B are usually definitions. Parts C-G require application. Answer ALL parts.",
          "On stimulus FRQs, reference the stimulus explicitly ('as the map shows' or 'the graph indicates'). Graders reward this.",
          "Use the define-then-apply template like on AP Psych. State the concept, then apply it to the scenario.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Confusing migration terms. EMIGRATE is LEAVING. IMMIGRATE is ARRIVING. Remember E = Exit.",
          "Applying the wrong urban model to the wrong region. Do not apply Burgess to Latin America. Match the model to the region.",
          "Using 'race' and 'ethnicity' interchangeably. They are NOT the same. Race is about biological classification (often socially constructed); ethnicity is about cultural identity.",
          "Forgetting to use geographic terminology on FRQs. 'People move' does not earn points. 'Rural-to-urban migration driven by pull factors of industrial employment' does.",
          "Confusing contagious (disease-like spread among neighbors) and hierarchical (spreads along power/size hierarchy) diffusion.",
          "Treating all countries in one stage of DTM as identical. Within-stage variation is significant.",
          "Calling nation and state the same thing. Nation = people with shared identity. State = country with sovereignty. Nation-state = nation with its own state.",
          "Using development measures without defining them. Do not just say 'HDI is high.' Say 'Human Development Index, measuring life expectancy, education, and income, is high.'",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can quiz you on the models with flashcard-style prompts and will score your FRQ responses using the College Board rubric. Free tier works for APHG.",
      },
      {
        type: "p",
        text: "Learn the models, use the vocabulary, apply them to specific places. That is APHG in one sentence.",
      },
    ],
  },
  {
    slug: "ap-microeconomics-review-guide",
    title: "AP Microeconomics Review Guide: All 6 Units Explained",
    metaTitle: "AP Microeconomics Review Guide: All 6 Units (2026)",
    description:
      "A complete AP Microeconomics review guide covering all 6 units, supply and demand, the four market structures, factor markets, externalities, and FRQ strategies. Everything you need for a 5 on the 2026 Micro exam.",
    excerpt:
      "AP Micro is a graphing exam that happens to be about economics. If you can draw the six key graphs without thinking, you are most of the way there. This guide walks through every unit.",
    date: "2026-04-22",
    readTime: "18 min read",
    category: "AP Microeconomics",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "humanities",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Microeconomics is a graphing exam with some economic vocabulary attached. If you can draw the six key graphs (supply and demand, perfect competition, monopoly, monopolistic competition, oligopoly with game theory, factor markets) without thinking, the exam becomes an exercise in labeling.",
      },
      {
        type: "p",
        text: "This guide walks through all 6 units, the six graphs you must master, the rule 'MR equals MC for profit maximization,' and the common mistakes that cost points. Learn the graphs cold.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "h3", text: "Exam structure and scoring" },
      {
        type: "ul",
        items: [
          "2 hours 10 minutes total.",
          "Section I: 60 multiple choice in 70 minutes. Worth 66 percent.",
          "Section II: 3 free response in 60 minutes. Worth 33 percent.",
          "FRQ #1: long question worth most points (10+). Usually requires a graph.",
          "FRQs #2 and #3: shorter (5-6 points each).",
          "10-minute reading period before you start writing.",
          "Calculator permitted (but math is usually simple).",
          "Graders reward correct LABELED graphs. A drawing with no labels earns little.",
        ],
      },
      { type: "h2", text: "Unit 1: Basic Economic Concepts" },
      {
        type: "h3", text: "What you need to know (12-15 percent)" },
      {
        type: "ul",
        items: [
          "Scarcity: resources are limited, wants are unlimited. The fundamental economic problem.",
          "Opportunity cost: the value of the next-best alternative forgone. When choosing A, the opportunity cost is what you give up by not choosing B.",
          "Production Possibilities Curve (PPC): shows max output combinations of two goods given fixed resources. Points ON the curve are efficient, INSIDE are inefficient (unemployment), OUTSIDE are unattainable.",
          "PPC bowed outward (concave): increasing opportunity cost (specialization). Linear: constant opportunity cost.",
          "Comparative advantage: a country has comparative advantage in a good if it has the LOWER OPPORTUNITY COST of producing it. Different from absolute advantage (higher productivity).",
          "Specialization and trade: countries gain by specializing where they have comparative advantage and trading for other goods.",
          "Economic systems: market economy (prices guide decisions), command economy (government decides), mixed economy (combination).",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Comparative advantage depends on LOWER OPPORTUNITY COST, not higher productivity. A country can have absolute advantage in EVERYTHING and still benefit from trade by specializing where its comparative advantage is greatest.",
      },
      { type: "h2", text: "Unit 2: Supply and Demand" },
      {
        type: "h3", text: "What you need to know (20-25 percent, the biggest unit)" },
      {
        type: "h3", text: "Demand and supply" },
      {
        type: "ul",
        items: [
          "Law of demand: as price rises, quantity demanded falls (inverse relationship). Downward-sloping curve.",
          "Shifters of demand: income (normal vs inferior goods), prices of related goods (substitutes, complements), tastes and preferences, expectations, number of buyers.",
          "Law of supply: as price rises, quantity supplied rises (direct relationship). Upward-sloping curve.",
          "Shifters of supply: input prices, technology, number of sellers, taxes and subsidies, expectations.",
          "Equilibrium: intersection of supply and demand. Market-clearing price and quantity.",
          "When demand shifts: P and Q move in SAME direction. When supply shifts: P and Q move in OPPOSITE directions.",
        ],
      },
      {
        type: "h3", text: "Elasticity" },
      {
        type: "ul",
        items: [
          "Price elasticity of demand (PED): percent change in Qd / percent change in P. If greater than 1: elastic (responsive). Less than 1: inelastic (unresponsive).",
          "Elastic: luxuries, many substitutes, long time horizon. Inelastic: necessities, few substitutes, short time horizon.",
          "Revenue and elasticity: if demand is elastic, raising price DECREASES revenue. If inelastic, raising price INCREASES revenue.",
          "Income elasticity: positive for normal goods. Negative for inferior goods.",
          "Cross-price elasticity: positive for substitutes, negative for complements.",
          "Price elasticity of supply (PES): responsiveness of quantity supplied to price change.",
        ],
      },
      {
        type: "h3", text: "Government intervention" },
      {
        type: "ul",
        items: [
          "Consumer surplus: area below demand curve, above price (the benefit to consumers).",
          "Producer surplus: area above supply curve, below price (the benefit to producers).",
          "Tax on sellers: shifts supply up by tax amount. Price rises (but not by full tax), quantity falls. Creates deadweight loss.",
          "Price ceiling (below equilibrium, e.g., rent control): shortage. Price floor (above equilibrium, e.g., minimum wage): surplus.",
          "Tariffs (tax on imports): domestic price rises, domestic producers gain, consumers lose, imports fall, deadweight loss.",
          "Subsidies: government pays producers. Shifts supply down. Quantity rises, consumer price falls, producer effective price rises.",
        ],
      },
      { type: "h2", text: "Unit 3: Production, Cost, and Perfect Competition" },
      {
        type: "h3", text: "What you need to know (22-25 percent)" },
      {
        type: "h3", text: "Production and costs" },
      {
        type: "ul",
        items: [
          "Total product (TP): total output. Marginal product (MP): additional output from one more worker. Average product (AP): TP / labor.",
          "Law of diminishing marginal returns: as you add more of one input (labor) to a fixed input (capital), MP eventually decreases.",
          "Short-run costs: Fixed (FC, don't vary with output), Variable (VC, vary with output). Total Cost = TC = FC + VC.",
          "Marginal cost (MC): cost of one more unit. MC = change in TC / change in Q.",
          "Average Fixed Cost (AFC), Average Variable Cost (AVC), Average Total Cost (ATC = AFC + AVC).",
          "MC curve cuts AVC and ATC at their minimums.",
          "Long-run: all costs are variable. Economies of scale (LRATC falls as firm grows), diseconomies (LRATC rises).",
        ],
      },
      {
        type: "h3", text: "Perfect competition" },
      {
        type: "ul",
        items: [
          "Characteristics: many firms, identical products, free entry/exit, perfect information.",
          "Firm is a 'price taker.' Demand curve for the firm is HORIZONTAL at the market price.",
          "For PC firm: P = MR = AR = demand.",
          "Profit maximization: produce where MR = MC. In PC, that's where P = MC.",
          "Short-run profit: if P > ATC at Q*, firm earns profit. If P = ATC, break-even. If P < ATC but P > AVC, incurs loss but continues (covers variable costs). If P < AVC, SHUT DOWN (losses are minimized at 0 output).",
          "Long-run: economic profit attracts entry, prices fall. Losses drive exit, prices rise. Long-run equilibrium: P = minimum ATC, ZERO economic profit.",
          "Efficiency: allocative (P = MC, producing the right goods) and productive (at minimum ATC).",
        ],
      },
      { type: "h2", text: "Unit 4: Imperfect Competition" },
      {
        type: "h3", text: "What you need to know (15-22 percent)" },
      {
        type: "h3", text: "Monopoly" },
      {
        type: "ul",
        items: [
          "Characteristics: one firm, no close substitutes, barriers to entry, significant market power.",
          "Monopoly faces entire market demand (DOWNWARD SLOPING).",
          "MR is BELOW demand and falls twice as fast for linear demand.",
          "Profit max: MR = MC at Q*. Charge the price FROM THE DEMAND CURVE at that Q* (not from MR).",
          "Profit: (P - ATC) * Q. Rectangle on the graph.",
          "Monopoly inefficient: P > MC at equilibrium (allocative inefficiency). Produces LESS and charges MORE than PC. Creates deadweight loss.",
          "Natural monopoly: industry where economies of scale are so large that one firm can serve market cheaper than multiple. Utilities. Regulated via price controls.",
          "Price discrimination: charging different prices to different customers. Requires market power, ability to separate customers, prevent resale. Examples: movie tickets (student/senior discounts), airlines.",
        ],
      },
      {
        type: "h3", text: "Monopolistic competition" },
      {
        type: "ul",
        items: [
          "Characteristics: many firms, DIFFERENTIATED products, free entry/exit.",
          "Downward-sloping demand (some market power). MR below demand.",
          "Profit max: MR = MC at Q*. Charge P from demand curve.",
          "Short-run profit possible, but in long run, entry eliminates it. Long-run equilibrium: P = ATC (tangent), zero economic profit.",
          "Examples: restaurants, hair salons, clothing brands.",
          "Inefficient: excess capacity (produces below min ATC) and P > MC (allocative inefficiency).",
        ],
      },
      {
        type: "h3", text: "Oligopoly and game theory" },
      {
        type: "ul",
        items: [
          "Characteristics: few firms, interdependence, strategic behavior.",
          "Examples: airlines, auto makers, cell phone carriers.",
          "Firms may collude (form cartel, like OPEC) or compete.",
          "Game theory: payoff matrix shows outcomes for each combination of strategies.",
          "Dominant strategy: best choice regardless of what other player does.",
          "Nash equilibrium: both players play best response to each other. No one wants to unilaterally change.",
          "Prisoner's Dilemma: individually rational choices lead to collectively worse outcome.",
        ],
      },
      { type: "h2", text: "Unit 5: Factor Markets" },
      {
        type: "h3", text: "What you need to know (10-13 percent)" },
      {
        type: "ul",
        items: [
          "Factor markets: markets for resources (labor, capital, land) used to produce goods.",
          "Marginal Revenue Product (MRP): additional revenue from one more unit of input. MRP = MP * P (in perfect competition output market).",
          "Marginal Factor Cost (MFC): cost of one more unit of input. In competitive labor market, MFC = wage.",
          "Firm hires input until MRP = MFC.",
          "Shifters of labor demand (MRP): price of output, productivity of labor, prices of other inputs.",
          "Shifters of labor supply: immigration, taxes/subsidies, demographics.",
          "Monopsony: one buyer of labor (company town, some hospitals). Faces upward-sloping supply curve. MFC above supply. Hires fewer workers, pays lower wage than competitive market.",
          "Minimum wage in monopsony: can INCREASE both wages AND employment (opposite of competitive market).",
        ],
      },
      { type: "h2", text: "Unit 6: Market Failure and Government" },
      {
        type: "h3", text: "What you need to know (8-13 percent)" },
      {
        type: "ul",
        items: [
          "Externality: cost or benefit that affects third parties.",
          "Negative externality (pollution): Marginal Social Cost > Marginal Private Cost. Market overproduces. Graph: MSC above supply curve.",
          "Positive externality (education, vaccines): Marginal Social Benefit > Marginal Private Benefit. Market underproduces. Graph: MSB above demand curve.",
          "Pigouvian tax: tax equal to external cost. Internalizes the externality. Reduces production to socially optimal quantity.",
          "Pigouvian subsidy: subsidy equal to external benefit. Increases production to socially optimal.",
          "Coase theorem: if property rights are clear and transaction costs low, private parties can negotiate solution without government.",
          "Public goods: non-rival (my use does not reduce yours) and non-excludable (cannot keep non-payers out). National defense, lighthouses. Market undersupplies; government provides.",
          "Free rider problem: people benefit from public goods without paying.",
          "Income inequality: Lorenz curve (cumulative income vs population). Gini coefficient (0 = equal, 1 = inequality). Ranges roughly 0.25 (Scandinavia) to 0.5+ (some developing countries).",
        ],
      },
      { type: "h2", text: "The six graphs you must draw in your sleep" },
      {
        type: "ol",
        items: [
          "Supply and demand: show shifts and new equilibria. Label deadweight loss from tax.",
          "Perfectly competitive firm AND market side-by-side: show firm at profit, loss, or break-even.",
          "Monopoly: downward-sloping demand, MR below, MC, ATC. Show P, Q, profit rectangle, deadweight loss.",
          "Monopolistic competition in long-run equilibrium: demand tangent to ATC at Q where MR = MC.",
          "Game theory payoff matrix: identify dominant strategies and Nash equilibrium.",
          "Factor market (labor): MRP, MFC. Show competitive vs monopsony.",
        ],
      },
      { type: "h2", text: "How to score a 5 on AP Micro" },
      {
        type: "ol",
        items: [
          "Master the six graphs. You will draw them again and again. Do them cold. Label axes (P and Q), curves, equilibrium points, profits/losses, deadweight loss.",
          "Remember the profit-max rule: MR = MC. ALWAYS. P = MC only in perfect competition (because P = MR there).",
          "Know the differences between market structures. Perfect competition: horizontal demand, zero long-run profit. Monopoly: downward demand, MR below, sustained profit possible. Monopolistic competition: tangent in long run, excess capacity. Oligopoly: game theory.",
          "Practice shifting curves and predicting changes. When supply shifts, P and Q move opposite directions. When demand shifts, P and Q move same direction.",
          "Learn comparative advantage. Calculate opportunity costs, compare, determine who should specialize.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Drawing monopoly demand as horizontal. It is DOWNWARD SLOPING. A monopoly faces the entire market demand.",
          "Forgetting that MR = MC is the profit-max rule for ALL market structures. P = MC only works in perfect competition (because P = MR).",
          "Mixing up shutdown and break-even. Shutdown: P below AVC. Break-even: P equals minimum ATC.",
          "Not labeling graphs. Graders reward labels, not pretty curves. Label EVERYTHING: axes, curves, P*, Q*, profits, deadweight loss.",
          "Forgetting monopoly pricing rule. Profit max at MR = MC gives Q*. PRICE comes from the DEMAND CURVE at that Q*, not from MR.",
          "Confusing comparative advantage with absolute advantage. Lower opportunity cost = comparative. Higher productivity = absolute.",
          "Drawing MR above demand. MR is ALWAYS BELOW demand (except in perfect competition where they are the same).",
          "Using negative reinforcement phrasing. Subsidies are NOT reducing price. They shift supply, price in market falls, producer receives MORE (price plus subsidy).",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can walk you through drawing and labeling Micro graphs one piece at a time, so by the exam you are doing them automatically. Free tier covers the course.",
      },
      {
        type: "p",
        text: "Draw the graph. Label everything. Find MR = MC. Price from the demand curve. Profit/loss rectangle. Deadweight loss. That is AP Micro.",
      },
    ],
  },
  {
    slug: "ap-macroeconomics-review-guide",
    title: "AP Macroeconomics Review Guide: All 6 Units Explained",
    metaTitle: "AP Macroeconomics Review Guide: All 6 Units (2026)",
    description:
      "A complete AP Macroeconomics review guide covering all 6 units, the AD-AS model, money market, loanable funds, fiscal and monetary policy, Phillips curve, foreign exchange, and FRQ strategies.",
    excerpt:
      "AP Macro centers on two models: AD-AS and loanable funds. Master those, the policy chains, and the five exam graphs, and you score a 5.",
    date: "2026-04-23",
    readTime: "18 min read",
    category: "AP Macroeconomics",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "humanities",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Macroeconomics feels overwhelming because it connects so many moving pieces (monetary policy, fiscal policy, inflation, unemployment, exchange rates). But the exam centers on two models: aggregate demand and aggregate supply (AD-AS), and the loanable funds market. Almost every question is a chain of effects through those two graphs.",
      },
      {
        type: "p",
        text: "This guide covers all 6 units, the five graphs you must know cold, and the policy chains (fiscal and monetary) the exam reuses. Master those, and Macro becomes systematic.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "h3", text: "Exam structure and scoring" },
      {
        type: "ul",
        items: [
          "Same format as AP Micro.",
          "2 hours 10 minutes total.",
          "Section I: 60 multiple choice in 70 minutes. Worth 66 percent.",
          "Section II: 3 free response in 60 minutes (plus 10-minute reading period). Worth 33 percent.",
          "FRQ #1: long (10+ points), usually involves multiple graphs and policy chains.",
          "FRQs #2 and #3: shorter (5-6 points each).",
          "Calculator allowed. Math involves multipliers, GDP calculations, percent changes.",
        ],
      },
      { type: "h2", text: "Unit 1: Basic Economic Concepts" },
      {
        type: "h3", text: "Same as Micro Unit 1 (tested 5-10 percent)" },
      {
        type: "ul",
        items: [
          "Scarcity, opportunity cost, production possibilities curve.",
          "Comparative advantage (LOWER opportunity cost = comparative advantage).",
          "Specialization and trade: countries should specialize where they have comparative advantage and trade.",
          "Economic systems: market, command, mixed.",
          "Factors of production: land, labor, capital, entrepreneurship.",
        ],
      },
      { type: "h2", text: "Unit 2: Economic Indicators and the Business Cycle" },
      {
        type: "h3", text: "What you need to know (12-17 percent)" },
      {
        type: "h3", text: "GDP" },
      {
        type: "ul",
        items: [
          "GDP: total market value of final goods and services produced within a country in a year.",
          "Expenditure approach: GDP = C + I + G + (X - M). Consumption, Investment, Government spending, eXports minus iMports.",
          "C (~68 percent): spending on goods and services.",
          "I (~16 percent): business investment in capital, residential investment, inventory changes.",
          "G (~17 percent): government spending (does NOT include transfer payments like Social Security).",
          "NX = (X - M): net exports. Often negative for US.",
          "Income approach: GDP = wages + rent + interest + profit. Same total as expenditure approach.",
          "GDP excludes: used goods, financial transactions, illegal/underground economy, non-market activities (household work, volunteer).",
          "Nominal GDP: at current prices. Real GDP: adjusted for inflation (uses constant prices). Real GDP = Nominal GDP / price index * 100.",
          "GDP per capita: GDP / population. Better measure of living standards.",
          "Real GDP measures economic output; nominal GDP includes price changes that can mask real changes.",
        ],
      },
      {
        type: "h3", text: "Unemployment and inflation" },
      {
        type: "ul",
        items: [
          "Labor force: people working + actively looking. Excludes retirees, students not working, discouraged workers.",
          "Unemployment rate: unemployed / labor force.",
          "Types: FRICTIONAL (between jobs, normal), STRUCTURAL (skills mismatch, obsolete jobs), CYCLICAL (recession, too little demand).",
          "Natural rate of unemployment: frictional + structural (typically 4-6 percent).",
          "Full employment: only frictional and structural unemployment, no cyclical.",
          "CPI (Consumer Price Index): measures price level using a basket of consumer goods.",
          "Inflation rate: percent change in CPI. (CPI_new - CPI_old) / CPI_old * 100.",
          "Types of inflation: demand-pull (too much spending chasing too few goods, AD shifts right), cost-push (supply shock raises costs, SRAS shifts left).",
          "Costs of inflation: menu costs, shoe leather costs, redistribution (debtors gain, creditors lose), uncertainty.",
          "Deflation and disinflation: deflation is falling prices (dangerous), disinflation is slowing rate of inflation.",
        ],
      },
      {
        type: "h3", text: "Business cycle" },
      {
        type: "ul",
        items: [
          "Phases: expansion, peak, contraction (recession), trough.",
          "Recession: two consecutive quarters of negative real GDP growth.",
          "Depression: severe, prolonged recession.",
        ],
      },
      { type: "h2", text: "Unit 3: National Income and Price Determination" },
      {
        type: "h3", text: "What you need to know (17-27 percent, the biggest unit)" },
      {
        type: "h3", text: "AD-AS model" },
      {
        type: "ul",
        items: [
          "Aggregate Demand (AD): total demand for all goods and services. Downward sloping (due to wealth effect, interest rate effect, international trade effect).",
          "Shifters of AD: Consumer confidence/wealth, Investment (interest rates, business confidence), Government spending, Net exports.",
          "Short-Run Aggregate Supply (SRAS): upward-sloping. Prices sticky, wages sticky.",
          "Shifters of SRAS: input prices (oil, wages), productivity, taxes/subsidies on businesses, inflation expectations.",
          "Long-Run Aggregate Supply (LRAS): VERTICAL at full-employment output (Yf). Represents economy's potential.",
          "Shifters of LRAS: labor force growth, capital accumulation, technology, productivity.",
          "Equilibrium: where AD and SRAS intersect. Also where they meet LRAS (for long-run equilibrium).",
          "Recessionary gap: actual Y below Yf. Unemployment above natural rate. AD shifts right (or SRAS shifts right) to close gap.",
          "Inflationary gap: actual Y above Yf. Unemployment below natural rate. Self-corrects as wages rise and SRAS shifts left.",
          "Self-correction: given time, the economy returns to LRAS. In recession, wages fall, SRAS shifts right. In inflation, wages rise, SRAS shifts left.",
        ],
      },
      {
        type: "h3", text: "Fiscal policy" },
      {
        type: "ul",
        items: [
          "Fiscal policy: government use of spending and taxes to influence economy.",
          "Expansionary fiscal policy (close recessionary gap): increase G or decrease T. Shifts AD right.",
          "Contractionary fiscal policy (close inflationary gap): decrease G or increase T. Shifts AD left.",
          "Spending multiplier = 1 / (1 - MPC) = 1 / MPS. MPC is marginal propensity to consume.",
          "Tax multiplier = -MPC / (1 - MPC) = -MPC / MPS. Smaller in absolute value than spending multiplier (negative because tax cuts INCREASE AD).",
          "Why is spending multiplier bigger? Spending goes DIRECTLY into GDP. Tax cut is partially spent, partially saved.",
          "Example: MPC = 0.8. Spending multiplier = 1/0.2 = 5. Tax multiplier = -0.8/0.2 = -4. A $100 increase in G raises GDP by $500; a $100 tax cut raises GDP by $400.",
          "Automatic stabilizers: built-in fiscal adjustments (progressive income tax, unemployment insurance) that stabilize without congressional action.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "The spending multiplier is ALWAYS one bigger (in absolute value) than the tax multiplier, because government spending goes directly into GDP while a tax cut gets partially saved (by the amount MPS * tax cut).",
      },
      { type: "h2", text: "Unit 4: Financial Sector" },
      {
        type: "h3", text: "What you need to know (18-23 percent)" },
      {
        type: "h3", text: "Money and banking" },
      {
        type: "ul",
        items: [
          "Money functions: medium of exchange, unit of account, store of value.",
          "M1: currency + checking deposits. M2: M1 + savings + small time deposits + money market funds.",
          "Fractional reserve banking: banks keep a fraction of deposits (reserve requirement), lend the rest.",
          "Money multiplier: 1 / required reserve ratio. If RR = 10 percent, multiplier is 10. $1000 deposit creates up to $10,000 in new money.",
          "Commercial banks vs central bank (Federal Reserve).",
        ],
      },
      {
        type: "h3", text: "Money market and loanable funds" },
      {
        type: "ul",
        items: [
          "Money market: interest rate (y-axis) vs quantity of money (x-axis). Money supply is VERTICAL (set by Fed). Money demand is downward-sloping (at high rates, people hold less money).",
          "Loanable funds market: interest rate (y-axis) vs quantity of loanable funds (x-axis). Supply from savings (upward sloping). Demand from investment (downward sloping).",
          "Government deficit increases demand for loanable funds, raises interest rates, crowds out private investment.",
          "Difference: money market shows nominal interest rate from Fed policy. Loanable funds shows real interest rate from savings/investment decisions.",
        ],
      },
      {
        type: "h3", text: "Monetary policy" },
      {
        type: "ul",
        items: [
          "Monetary policy: Federal Reserve adjusts money supply to influence economy.",
          "Expansionary monetary policy (close recessionary gap): increase money supply, lower interest rates, boost investment and consumption. AD shifts right.",
          "Contractionary monetary policy (close inflationary gap): decrease money supply, raise interest rates, reduce spending. AD shifts left.",
          "Tools: Open Market Operations (buy bonds = expansionary, sell bonds = contractionary). Reserve requirement (lower = expansionary). Discount rate (lower = expansionary). Interest on reserves (IOR, primary tool in new CED).",
          "In revised 2022+ CED: the Fed primarily uses the interest on reserves to target the federal funds rate. Buying/selling bonds has changed roles somewhat.",
        ],
      },
      { type: "h2", text: "Unit 5: Long-Run Consequences of Stabilization Policies" },
      {
        type: "h3", text: "What you need to know (20-30 percent)" },
      {
        type: "ul",
        items: [
          "Phillips curve: inverse relationship between inflation and unemployment. Short-run is downward sloping. Long-run is VERTICAL at natural rate of unemployment.",
          "Shifts SRPC: inflation expectations, supply shocks. Stagflation: SRPC shifts right (higher inflation AND higher unemployment simultaneously).",
          "Crowding out: expansionary fiscal policy (deficit spending) raises interest rates (loanable funds demand up), reduces private investment. Partially offsets stimulus.",
          "Long-run economic growth: shifts LRAS right. Sources: labor force growth, capital accumulation, technology, productivity improvements, education.",
          "Real vs nominal interest rate: Fisher equation. Nominal = Real + Expected Inflation.",
          "Government debt: accumulation of deficits over time. Sustained high debt can crowd out private investment, raise future tax burden.",
          "Ricardian equivalence: people save in anticipation of future tax increases from current deficits. Limits effectiveness of debt-financed stimulus. Debated.",
        ],
      },
      { type: "h2", text: "Unit 6: Open Economy (International Trade and Finance)" },
      {
        type: "h3", text: "What you need to know (10-13 percent)" },
      {
        type: "h3", text: "Balance of payments" },
      {
        type: "ul",
        items: [
          "Current account: trade of goods and services (net exports) + net investment income + net transfers.",
          "Financial (capital) account: net financial flows (foreign purchases of US assets minus US purchases of foreign assets).",
          "Current account + Financial account = 0 (by definition).",
          "US runs current account DEFICIT (imports more than exports) balanced by financial account SURPLUS (foreigners buy US assets).",
        ],
      },
      {
        type: "h3", text: "Foreign exchange market" },
      {
        type: "ul",
        items: [
          "FX market: price of currency (exchange rate) vs quantity.",
          "For US dollar market: x-axis quantity of dollars, y-axis price (in foreign currency, like pesos per dollar).",
          "Supply of dollars: from Americans buying foreign goods/assets (high dollar price = fewer dollars supplied).",
          "Demand for dollars: from foreigners buying US goods/assets (high price = fewer dollars demanded).",
          "Appreciation: dollar becomes more valuable (takes more foreign currency to buy a dollar). Causes: higher US interest rates, expected dollar appreciation, higher US demand for foreign assets (less).",
          "Depreciation: dollar becomes less valuable.",
          "Weaker dollar: US exports cheaper to foreigners (net exports rise), imports more expensive (net exports rise). AD shifts right.",
          "Stronger dollar: opposite. Hurts US exports, cheapens imports. AD shifts left.",
          "Higher US interest rates (monetary policy) attract foreign capital, appreciate dollar, reduce net exports. Partial offset of monetary policy in open economy.",
        ],
      },
      { type: "h2", text: "Policy chains the exam loves" },
      {
        type: "h3", text: "Expansionary fiscal policy (e.g., increase G)" },
      {
        type: "ul",
        items: [
          "AD shifts right -> output rises, unemployment falls, price level rises.",
          "Loanable funds demand rises (government borrows more) -> interest rate rises -> investment falls (crowding out).",
          "In open economy: higher US interest rates attract capital -> dollar appreciates -> exports fall, imports rise -> net exports fall (partial offset).",
          "Money market: higher income raises money demand -> interest rate rises in money market too.",
          "Long-run: if at full employment, wages rise, SRAS shifts left, output returns to Yf but price level higher.",
        ],
      },
      {
        type: "h3", text: "Expansionary monetary policy (e.g., Fed buys bonds)" },
      {
        type: "ul",
        items: [
          "Money supply rises -> interest rate falls -> investment and consumption rise -> AD shifts right.",
          "Output rises, unemployment falls, price level rises.",
          "Lower US interest rates: capital flows out -> dollar depreciates -> net exports rise -> AD amplified.",
          "Long-run: same as fiscal, Y returns to Yf, price level higher.",
        ],
      },
      { type: "h2", text: "The five graphs you need cold" },
      {
        type: "ol",
        items: [
          "AD-AS: short-run AS (upward), long-run AS (vertical), AD (downward). Show recessionary gap (Y below Yf) and inflationary gap (Y above Yf).",
          "Money market: vertical MS, downward MD. Shift MS with monetary policy.",
          "Loanable funds: upward supply (savings), downward demand (investment). Shift demand with government borrowing.",
          "Phillips curve: short-run (downward sloping), long-run (vertical at natural rate).",
          "Foreign exchange (FX) market: downward demand, upward supply. Shift with interest rates, income, expectations.",
        ],
      },
      { type: "h2", text: "How to score a 5 on AP Macro" },
      {
        type: "ol",
        items: [
          "Master the five graphs. You will use them on every FRQ. Draw them cleanly, label axes and curves, show shifts.",
          "Practice the policy chains. Fiscal: change in G or T -> AD shifts -> output/price/unemployment change -> interest rate and FX effects.",
          "Learn the multipliers. Spending: 1/(1-MPC) = 1/MPS. Tax: -MPC/(1-MPC). Memorize.",
          "Know the difference between money market and loanable funds. Both have interest rate on y-axis, but show different things.",
          "Understand long-run adjustment. Even without policy, economy returns to LRAS. In recession, wages fall. In inflation, wages rise.",
          "On FRQs, show the graph changes AND explain the reasoning. Graders want both.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Shifting AS when you should shift AD, and vice versa. Taxes on consumers shift AD (they change C). Supply shocks (oil prices, wages) shift SRAS.",
          "Mislabeling axes. Money market: interest rate vs quantity of money. Loanable funds: interest rate vs quantity of loanable funds. They look similar but are different markets.",
          "Forgetting the long-run Phillips curve is VERTICAL at the natural rate of unemployment. In the long run, no trade-off between inflation and unemployment.",
          "Using wrong direction for exchange rate changes. STRONGER dollar = takes MORE foreign currency to buy a dollar = US goods EXPENSIVE to foreigners = net exports FALL.",
          "Confusing nominal and real variables. Nominal GDP includes price changes; real GDP does not. Real interest rate = nominal - expected inflation.",
          "Forgetting crowding out. Expansionary fiscal policy raises interest rates, reducing private investment. Partial offset of the stimulus.",
          "Not writing the direction clearly on FRQ graphs. Draw arrows showing the shift direction. Graders need to see it.",
          "Using tax multiplier magnitude when you need its sign. Tax multiplier is NEGATIVE (tax cut is expansionary). If cutting taxes, use |tax multiplier|.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can walk through policy chains step by step, showing the ripple effect on AD, AS, interest rates, and exchange rates. Free tier covers Macro.",
      },
      {
        type: "p",
        text: "Master AD-AS and loanable funds. Memorize the five graphs. Practice the policy chains until they are automatic. That is AP Macro.",
      },
    ],
  },
  {
    slug: "ap-english-language-review-guide",
    title: "AP English Language and Composition Review Guide",
    metaTitle: "AP English Language Review Guide: Rhetoric, Synthesis, Argument (2026)",
    description:
      "A complete AP English Language and Composition review guide covering rhetorical analysis, argument synthesis, the rubric, rhetorical devices, MCQ strategies, and the skills the exam tests every year.",
    excerpt:
      "AP Lang is not an English class. It is a rhetoric class with three essays and a multiple choice section. This guide covers the skills, rubrics, and rhetorical devices you need for a 5.",
    date: "2026-04-24",
    readTime: "18 min read",
    category: "AP English Language",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "humanities",
      "writing",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP English Language and Composition is not about reading novels. It is about analyzing HOW writers make arguments and writing your own. Once you stop thinking of it as English and start thinking of it as rhetoric, the whole course gets clearer.",
      },
      {
        type: "p",
        text: "This guide walks through the exam format, the six skill categories, the three essays with their rubrics, the rhetorical devices you must know, and the analysis techniques that earn points. The key insight: AP Lang rewards precise analysis of rhetorical choices and their effects.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "h3", text: "Exam structure and scoring" },
      {
        type: "ul",
        items: [
          "3 hours 15 minutes total.",
          "Section I: 45 multiple choice in 60 minutes. Worth 45 percent.",
          "MCQ mix: ~23-25 reading questions (analyze published passages) and ~20-22 writing/revision questions (improve student drafts).",
          "Section II: 3 essays in 2 hours 15 minutes + 15-minute reading period. Worth 55 percent.",
          "Each essay scored 0-6.",
          "No calculator (no math).",
        ],
      },
      { type: "h2", text: "The 6 skill categories" },
      {
        type: "p",
        text: "The CED organizes content around skill categories rather than units. Every MCQ and essay tests one or more:",
      },
      {
        type: "ol",
        items: [
          "Rhetorical situation (reading): identify who is writing, to whom, about what, why, in what context.",
          "Rhetorical situation (writing): make choices about your own rhetorical situation.",
          "Claims and evidence (reading): identify arguments and the evidence supporting them.",
          "Claims and evidence (writing): craft defensible claims and support them.",
          "Reasoning and organization: recognize and build argument structure.",
          "Style: analyze and use diction, syntax, figurative language.",
        ],
      },
      { type: "h2", text: "The rhetorical triangle (ethos, pathos, logos)" },
      {
        type: "h3", text: "The three appeals" },
      {
        type: "ul",
        items: [
          "Ethos: appeal to credibility and character. 'Trust me because I am qualified.' Established through credentials, tone, consistency, shared values.",
          "Pathos: appeal to emotion. 'You should care because this affects people you love.' Uses vivid imagery, personal stories, values, fears, hopes.",
          "Logos: appeal to logic and reason. 'This conclusion follows from these facts.' Uses data, statistics, logical structure, evidence.",
          "Effective arguments BALANCE all three. Pure logic feels cold. Pure emotion manipulative. Pure credibility self-promoting. Great writers weave them.",
        ],
      },
      { type: "h2", text: "The three essays" },
      {
        type: "h3", text: "Synthesis essay (Q1)" },
      {
        type: "ul",
        items: [
          "You get a prompt + 6-7 sources (articles, data, images, speeches).",
          "Your job: take a defensible position on the prompt AND use at least 3 sources as evidence to support your argument.",
          "Cite sources inline: (Source A), (Source B), etc.",
          "Use sources with different perspectives to strengthen your argument (show you acknowledge counterarguments).",
          "Do NOT summarize sources. SYNTHESIZE them. Weave them into your argument.",
          "The essay is NOT a research paper. Your argument leads; sources support.",
        ],
      },
      {
        type: "h3", text: "Rhetorical analysis essay (Q2)" },
      {
        type: "ul",
        items: [
          "You get ONE passage (speech, essay, letter).",
          "Your job: analyze the RHETORICAL CHOICES the writer makes and explain how they contribute to the writer's PURPOSE.",
          "Identify devices (ethos, pathos, logos, metaphor, anaphora, juxtaposition, etc.) AND explain their effect.",
          "Avoid summary. The grader already read the passage. What they want is analysis.",
          "Always ask: WHY did the author make this choice? What effect does it have on the audience?",
          "Hardest essay for most students because it requires interpretation, not explanation.",
        ],
      },
      {
        type: "h3", text: "Argument essay (Q3)" },
      {
        type: "ul",
        items: [
          "You get a prompt (often a quotation or statement).",
          "Your job: develop a defensible argument and support with your OWN evidence.",
          "Evidence from: history, literature, current events, personal experience, scientific studies.",
          "Rewards students who read broadly and think about big ideas.",
          "Take a position, even a bold one. Graders reward complexity and sophistication.",
        ],
      },
      { type: "h2", text: "The 6-point rubric (all three essays)" },
      {
        type: "h3", text: "Scoring breakdown" },
      {
        type: "ul",
        items: [
          "THESIS (0-1 point): 1 point for a defensible thesis that responds to the prompt with a clear line of reasoning. 0 points if thesis is missing, just restates prompt, or is not defensible.",
          "EVIDENCE AND COMMENTARY (0-4 points): the biggest pool of points. 4 points for specific evidence + commentary that consistently explains HOW evidence supports argument. Less for general evidence, minimal commentary.",
          "SOPHISTICATION (0-1 point): demonstrates complexity of thought, elegant style, or an especially insightful argument. Hardest point to earn. Awarded for: nuanced treatment of the prompt, recognition of counterarguments, complex/vivid style, situating the argument in broader context.",
        ],
      },
      {
        type: "h3", text: "How to earn evidence and commentary points" },
      {
        type: "ul",
        items: [
          "1 point: General evidence with some connection to thesis.",
          "2 points: Specific evidence from the passage/sources/experience, but limited commentary explaining the connection.",
          "3 points: Specific evidence + commentary that connects evidence to claim (but inconsistently).",
          "4 points: Specific evidence + commentary that CONSISTENTLY explains how evidence supports the thesis. This is the full score.",
          "Key move for commentary: after citing evidence, answer 'SO WHAT?' Why does this matter? What does it prove?",
        ],
      },
      { type: "h2", text: "Rhetorical devices you must know" },
      {
        type: "h3", text: "Structural and schemes" },
      {
        type: "ul",
        items: [
          "Anaphora: repetition at the start of clauses. 'We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields...'",
          "Epistrophe: repetition at the END of clauses. '...government of the people, by the people, for the people.'",
          "Chiasmus: ABBA structure. 'Ask not what your country can do for you, ask what you can do for your country.'",
          "Antithesis: contrasting ideas in parallel structure. 'Give me liberty or give me death.'",
          "Parallelism: similar grammatical structure. 'Veni, vidi, vici.'",
          "Juxtaposition: placing contrasting ideas side by side.",
          "Asyndeton: omission of conjunctions. 'I came, I saw, I conquered.'",
          "Polysyndeton: many conjunctions. 'We have ships and men and money and stores.'",
        ],
      },
      {
        type: "h3", text: "Tropes and figurative language" },
      {
        type: "ul",
        items: [
          "Metaphor: direct comparison. 'Life is a journey.'",
          "Simile: comparison using like or as. 'Life is like a journey.'",
          "Synecdoche: part for whole or whole for part. 'All hands on deck' (hands = workers).",
          "Metonymy: substituting a related term. 'The pen is mightier than the sword' (pen = writing, sword = violence).",
          "Hyperbole: extreme exaggeration. 'I have told you a million times.'",
          "Understatement / Litotes: deliberate underemphasis. 'Not bad' meaning 'excellent.'",
          "Irony: verbal (opposite of meaning), situational (unexpected outcome), dramatic (audience knows, character doesn't).",
          "Personification: giving human traits to non-human. 'The wind whispered.'",
          "Allusion: reference to another text, event, or figure.",
        ],
      },
      {
        type: "h3", text: "Style and tone" },
      {
        type: "ul",
        items: [
          "Diction: word choice. Formal, informal, colloquial, elevated, colloquial.",
          "Syntax: sentence structure. Short sentences create urgency. Long complex sentences create reflection.",
          "Tone: author's attitude toward subject. Derived from diction and syntax.",
          "Mood: reader's feeling (different from tone).",
          "Connotation (emotional weight) vs denotation (literal meaning). 'Skinny' vs 'slender' have same denotation but different connotations.",
          "Hypophora: asking and answering your own question.",
          "Rhetorical question: question not requiring answer, for effect.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Never write 'the author uses ethos to appeal to ethos' or 'the author uses pathos to make the reader feel emotion.' That is circular. Instead, identify WHAT the device does SPECIFICALLY. 'The author cites her military service, establishing personal authority on foreign policy (ethos), which convinces readers to trust her recommendations despite controversy.'",
      },
      { type: "h2", text: "How to write a rhetorical analysis essay" },
      {
        type: "ol",
        items: [
          "Read the passage twice. First for comprehension. Second to identify devices.",
          "Identify the author's PURPOSE (what do they want the audience to do, think, or feel?).",
          "Identify the AUDIENCE (who is the author addressing? what do they care about?).",
          "Identify the OCCASION / CONTEXT (why is the author writing now?).",
          "Find 2-3 key rhetorical choices (devices + structural moves).",
          "Thesis: state the author's purpose and 2-3 devices that accomplish it.",
          "Body paragraphs: for each device, provide textual evidence, then commentary explaining HOW the device works and WHY it contributes to purpose.",
          "Avoid summary of the passage. Every sentence should analyze.",
        ],
      },
      { type: "h2", text: "The MCQ section" },
      {
        type: "h3", text: "Reading passages" },
      {
        type: "ul",
        items: [
          "Read the passage first (even if long). Mark claims, evidence, rhetorical moves, tone shifts.",
          "Question types: tone, purpose, rhetorical device identification, argument structure, implicit meaning.",
          "Key phrase: 'most likely' or 'primarily' - these are inference questions. Use the whole passage to support.",
          "Trap answers often use words from the passage but misapply them.",
        ],
      },
      {
        type: "h3", text: "Writing revision passages" },
      {
        type: "ul",
        items: [
          "You see a student draft with underlined sentences or marked sections. You pick the best revision.",
          "Correct answer is usually the MOST CONCISE and MOST LOGICAL in context.",
          "Watch for: awkward phrasing, unclear pronouns, wordy constructions, weak transitions.",
          "For transitions, choose the one that accurately signals the relationship between ideas (contrast, cause, example, addition).",
        ],
      },
      { type: "h2", text: "How to score a 5 on AP Lang" },
      {
        type: "ol",
        items: [
          "Practice rhetorical analysis. This is the hardest essay. Read published essays (Atlantic, New Yorker, op-eds) and annotate for rhetorical choices.",
          "Use the rubric explicitly. Memorize the 6-point structure (1 thesis + 4 evidence/commentary + 1 sophistication). Plan your essays around these.",
          "Aim for sophistication. Take a nuanced position. Acknowledge counterarguments. Write with varied, precise diction.",
          "For synthesis essays, integrate sources smoothly. Use at least 3 sources with different perspectives. Cite inline: (Source A).",
          "Build a bank of essay-ready examples. For the argument essay, prepare 10-15 examples from history, literature, current events you can deploy on various prompts.",
          "Time yourself. 40 minutes per essay. Plan for 8-10 minutes reading/outlining, 28-30 minutes writing, 2 minutes proofreading.",
        ],
      },
      { type: "h2", text: "How to practice in the last 30 days" },
      {
        type: "ol",
        items: [
          "Read one op-ed or long-form article daily. Mark claims, evidence, rhetorical moves. Cycle through NYT, Atlantic, Washington Post, WSJ.",
          "Write one timed essay per week. Alternate synthesis, rhetorical analysis, argument. Score with the official rubric.",
          "Review each essay against the rubric. Identify specifically which row cost points.",
          "Complete one full MCQ section (45 questions) per week. Review every wrong answer carefully.",
          "Drill rhetorical device vocabulary. Flashcards if needed.",
          "Read model essays that scored 6. Notice their structure, thesis clarity, commentary quality.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Summarizing instead of analyzing. Rhetorical analysis explains HOW and WHY, not just WHAT. The grader knows what the passage says.",
          "Missing the sophistication point by playing it safe. Take a complex position. Acknowledge counterarguments. Use elevated diction.",
          "Listing devices without explaining their EFFECT. 'The author uses metaphor' earns nothing. 'The author uses metaphor to...' is necessary.",
          "Running out of time on the third essay. Use a clock. 40 minutes per essay. If you run long on synthesis, cut rhetorical analysis short, not argument.",
          "Citing sources without integrating them in synthesis. 'Source A says X' is not synthesis. 'As Source A argues, X, which demonstrates...' is.",
          "Writing summary-heavy body paragraphs. Every sentence should analyze or argue.",
          "Weak topic sentences. Each paragraph should start with a claim (your claim about the passage), not with context.",
          "Ignoring the occasion. Every speech/essay is written at a specific historical moment. Context shapes interpretation.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can score your Lang essays using the College Board rubric and tell you exactly which row you fell short on. It can also analyze passages with you and point out rhetorical choices you missed. Free tier covers AP Lang.",
      },
      {
        type: "p",
        text: "Rhetoric is the art of making an argument. Notice how others do it, then do it better. Analyze. Synthesize. Argue. That is AP Lang.",
      },
    ],
  },
  {
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
      "study strategy",
      "exam prep",
      "time management",
      "test taking",
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
      "study strategy",
      "exam prep",
      "test taking",
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
      "study strategy",
      "exam prep",
      "time management",
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
      "study strategy",
      "exam prep",
      "self study",
      "ai tutor",
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
      "study strategy",
      "exam prep",
      "ai tutor",
      "self study",
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
  {
    slug: "ap-physics-2-review-guide",
    title: "AP Physics 2 Review Guide: All 8 Units Covered",
    metaTitle: "AP Physics 2 Review Guide: Electricity, Waves, Modern Physics (2026)",
    description:
      "A complete AP Physics 2 review covering all 8 units: fluid mechanics, thermodynamics, electricity, magnetism, waves, optics, and modern physics. Key formulas and strategies for a 5.",
    excerpt:
      "AP Physics 2 covers electricity, magnetism, thermodynamics, and optics. The exam format is identical to Physics 1: multiple choice, free response, mix of no-calc and calc sections.",
    date: "2026-04-21",
    readTime: "14 min read",
    category: "AP Physics 2",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "science",
      "STEM",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Physics 2 covers electricity, magnetism, thermodynamics, and optics. The exam format is identical to Physics 1: multiple choice, free response, mix of no-calc and calc sections. The difference is that Physics 1 tested mechanics while Physics 2 tests everything else.",
      },
      { type: "h2", text: "Exam structure" },
      {
        type: "ul",
        items: [
          "3 hours total: 90 minute Section I (50 multiple choice, split into no-calc 30 questions and calc 20 questions) plus 90 minute Section II (2 long FRQs and 2 short FRQs).",
          "Both sections equally weighted (50-50). Calculator required for part B.",
          "Concepts tested: fluids, thermodynamics, electricity, circuits, magnetism, induction, waves, optics, modern physics.",
        ],
      },
      { type: "h2", text: "Unit 1: Fluids" },
      {
        type: "p",
        text: "About 3 to 5 percent of exam. Pressure, buoyancy, continuity, Bernoulli.",
      },
      { type: "h2", text: "Unit 2: Thermodynamics" },
      {
        type: "p",
        text: "About 12 to 18 percent of exam. Temperature, heat capacity, phase changes, first and second law, entropy.",
      },
      { type: "h2", text: "Unit 3: Electric Charge and Electric Force" },
      {
        type: "p",
        text: "About 12 to 15 percent. Coulomb's law, electric field, electric potential, capacitors.",
      },
      { type: "h2", text: "Unit 4: Electric Circuits" },
      {
        type: "p",
        text: "About 10 to 18 percent. Current, resistance, Ohm's law, series and parallel circuits.",
      },
      { type: "h2", text: "Unit 5: Magnetism" },
      {
        type: "p",
        text: "About 10 to 12 percent. Magnetic field, forces on moving charges and currents, right-hand rule, torque.",
      },
      { type: "h2", text: "Unit 6: Electromagnetic Induction" },
      {
        type: "p",
        text: "About 8 to 10 percent. Magnetic flux, Faraday's law, Lenz's law, transformers.",
      },
      { type: "h2", text: "Unit 7: Waves" },
      {
        type: "p",
        text: "About 12 to 16 percent. Wave properties, Doppler effect, interference, resonance.",
      },
      { type: "h2", text: "Unit 8: Optics and Modern Physics" },
      {
        type: "p",
        text: "About 10 to 14 percent. Mirrors and lenses, refraction, photoelectric effect, photons.",
      },
      { type: "h2", text: "How to score a 5" },
      {
        type: "ol",
        items: [
          "Master thermodynamics. It is the heaviest unit (12-18 percent) and hardest conceptually.",
          "Understand electric fields and circuits. Coulomb's law and Ohm's law are foundational.",
          "Learn Faraday's law and Lenz's law. Induction is on every exam.",
          "Know the right-hand rule. Magnetic problems become mechanical once you can visualize them.",
          "Take timed practice exams. Physics 2 is calculation-heavy. Get comfortable with your calculator.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Forgetting signs. Charges can be positive or negative. Current and electron flow are opposite directions.",
          "Confusing Faraday's law signs. Lenz's law is encoded in the minus sign.",
          "Pressure depends on depth but NOT on container shape (only vertical height).",
          "Capacitors block DC current. In circuits, a capacitor acts like an open circuit.",
          "Mixing up series and parallel. Series: voltage divides, current same. Parallel: current divides, voltage same.",
        ],
      },
      {
        type: "p",
        text: "Physics 2 is harder than Physics 1 conceptually (electricity and magnetism feel more abstract), but the exam format is identical. Master the concepts and the exam format becomes familiar.",
      },
    ],
  },
  {
    slug: "ap-physics-c-mechanics-review-guide",
    title: "AP Physics C: Mechanics Review Guide",
    metaTitle: "AP Physics C: Mechanics Review Guide (2026 Exam)",
    description:
      "AP Physics C: Mechanics is AP Physics 1 with calculus. Same topics but using derivatives and integrals instead of algebra. Complete review covering kinematics, dynamics, momentum, energy, rotation, and gravitation.",
    excerpt:
      "Physics C: Mechanics teaches the same motion and forces as Physics 1, but you describe and solve them with calculus. Velocity is dx/dt. Acceleration is dv/dt.",
    date: "2026-04-22",
    readTime: "15 min read",
    category: "AP Physics C",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "science",
      "STEM",
      "calculus",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Physics C: Mechanics is AP Physics 1 rewritten in calculus. The same topics appear (kinematics, forces, energy, momentum, rotation, gravitation, oscillations), but you use derivatives and integrals to solve them instead of algebra.",
      },
      { type: "h2", text: "Exam structure" },
      {
        type: "ul",
        items: [
          "3 hours 15 minutes total.",
          "Section I: 35 multiple choice (1 hour 15 minutes, split into no-calc 20 questions and calc 15 questions).",
          "Section II: 3 free response (1 hour 45 minutes, split no-calc and calc).",
          "Sections equally weighted (50-50).",
        ],
      },
      { type: "h2", text: "Key differences from Physics 1" },
      {
        type: "h3", text: "Calculus notation" },
      {
        type: "ul",
        items: [
          "Velocity is the derivative: v equals dx slash dt.",
          "Acceleration is the derivative: a equals dv slash dt.",
          "Position from acceleration uses integration: x equals the integral of v dt.",
          "Work equals integral of force: W equals the integral of F dot dx.",
          "Impulse equals integral of force: J equals the integral of F dt.",
        ],
      },
      { type: "h2", text: "Unit 1: Kinematics" },
      {
        type: "p",
        text: "If acceleration is constant: v equals v0 plus at, x equals x0 plus v0 t plus (one-half) a t squared. If a(t) is given, integrate directly.",
      },
      { type: "h2", text: "Unit 2: Newton's Laws" },
      {
        type: "p",
        text: "F equals ma (where a is d squared x slash dt squared). Set up force equation and integrate to find motion.",
      },
      { type: "h2", text: "Unit 3: Work and Energy" },
      {
        type: "p",
        text: "W equals integral of F dx. Power equals dW slash dt equals F times v.",
      },
      { type: "h2", text: "Unit 4: Momentum and Impulse" },
      {
        type: "p",
        text: "J equals integral of F dt equals change in p. In isolated systems, total momentum is conserved.",
      },
      { type: "h2", text: "Unit 5: Rotation" },
      {
        type: "p",
        text: "Omega equals d theta slash dt. Alpha equals d omega slash dt. Tau equals I times alpha (rotational version of F equals m a).",
      },
      { type: "h2", text: "Unit 6: Gravitation" },
      {
        type: "p",
        text: "F equals G M m slash r squared. For circular orbit: v equals square root (G M slash r). Escape velocity: v equals square root (2 G M slash r).",
      },
      { type: "h2", text: "Unit 7: Oscillations" },
      {
        type: "p",
        text: "SHM: d squared x slash dt squared equals minus (k slash m) x. Solution: x(t) equals A cos(omega t plus phi). Energy oscillates between kinetic and potential.",
      },
      { type: "h2", text: "How to score a 5" },
      {
        type: "ol",
        items: [
          "Understand the relationship between x, v, a. Know when to differentiate and integrate.",
          "Master setting up F equals ma from free-body diagrams.",
          "Use energy methods when forces are complicated. Energy conservation is often easier than Newton's second law.",
          "Know the three big moments of inertia: solid cylinder I equals (one-half) m r squared, hollow cylinder I equals m r squared, solid sphere I equals (two-fifths) m r squared.",
          "For oscillations, recognize SHM (pendulum, spring) and that period depends on system properties, not amplitude.",
        ],
      },
    ],
  },
  {
    slug: "ap-physics-c-electricity-magnetism-review-guide",
    title: "AP Physics C: Electricity and Magnetism Review Guide",
    metaTitle: "AP Physics C: E&M Review Guide: Calculus-Based Electromagnetism (2026)",
    description:
      "AP Physics C: E&M is AP Physics 2 with calculus. Covers Gauss's law, electric potential, circuits, Ampere's law, Faraday's induction, and Maxwell's equations using differential and integral forms.",
    excerpt:
      "Physics C: E&M covers the same electricity and magnetism as Physics 2, but expresses the laws as differential equations. Gauss's law, Ampere's law, Faraday's induction reveal deeper structure.",
    date: "2026-04-23",
    readTime: "16 min read",
    category: "AP Physics C",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "science",
      "STEM",
      "calculus",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Physics C: E&M covers the same electricity and magnetism as AP Physics 2, but expresses it using calculus (derivatives and integrals). The laws are more abstract but also more elegant and powerful.",
      },
      { type: "h2", text: "Exam structure" },
      {
        type: "ul",
        items: [
          "3 hours total (same format as Physics C: Mechanics).",
          "Section I: 35 multiple choice (split no-calc and calc).",
          "Section II: 3 free response (split no-calc and calc).",
        ],
      },
      { type: "h2", text: "Unit 1: Electrostatics" },
      {
        type: "h3", text: "Gauss's law and electric fields" },
      {
        type: "ul",
        items: [
          "Gauss's law: closed integral of E times dA equals Q enclosed slash epsilon 0. Find electric fields from symmetric charge distributions.",
          "Electric potential: V equals minus integral of E dot dl. Relates field to potential.",
          "Capacitors: C equals Q slash V. Parallel plate: C equals epsilon 0 A slash d.",
        ],
      },
      { type: "h2", text: "Unit 2: Conductors and Dielectrics" },
      {
        type: "p",
        text: "Inside a conductor in equilibrium: E equals 0. All charge resides on surface. Dielectrics increase capacitance.",
      },
      { type: "h2", text: "Unit 3: Electric Circuits" },
      {
        type: "ul",
        items: [
          "Ohm's law: V equals I R. Power: P equals I V.",
          "Kirchhoff's rules: currents sum to zero at junctions. Voltages sum to zero in loops.",
          "RC circuits: Q(t) equals Q max (1 minus e to the minus t slash (RC)). Time constant tau equals RC.",
        ],
      },
      { type: "h2", text: "Unit 4: Magnetism and Ampere's Law" },
      {
        type: "h3", text: "Magnetic fields from currents" },
      {
        type: "ul",
        items: [
          "Ampere's law: closed integral of B times dl equals mu 0 I enclosed. Find magnetic fields from symmetric current distributions.",
          "Long straight wire: B equals mu 0 I slash (2 pi r).",
          "Solenoid: B equals mu 0 n I (where n is turns per unit length).",
        ],
      },
      { type: "h2", text: "Unit 5: Electromagnetic Induction" },
      {
        type: "h3", text: "Faraday's law and Maxwell equations" },
      {
        type: "ul",
        items: [
          "Faraday's law: closed integral of E times dl equals minus d(Phi B) slash dt. Changing magnetic flux induces electric field.",
          "Lenz's law: induced effects oppose the change.",
          "Self-inductance: EMF equals minus L d I slash dt.",
          "Maxwell's equations unify electricity and magnetism into four laws.",
        ],
      },
      { type: "h2", text: "How to score a 5" },
      {
        type: "ol",
        items: [
          "Gauss's law simplifies many problems. Use it whenever there is symmetry.",
          "Faraday's law appears on every exam. Recognize scenarios where flux changes and predict induced fields.",
          "Understand Ampere's law. It is the magnetic analog of Gauss's law.",
          "Know RC and LC circuits: time constants and oscillation frequencies.",
          "The minus sign in Faraday's law is Lenz's law. Do not forget it.",
        ],
      },
    ],
  },
  {
    slug: "ap-computer-science-principles-review-guide",
    title: "AP Computer Science Principles Review Guide",
    metaTitle: "AP CSP Review: Seven Big Ideas, Performance Task, and Exam (2026)",
    description:
      "AP Computer Science Principles review covering the 7 big ideas (creativity, abstraction, data, algorithms, programming, internet, impact), the performance task (30 percent), and written exam strategies.",
    excerpt:
      "AP CSP tests computational thinking, not syntax. Create a program, document it (30 percent of grade), then take a written exam (70 percent). Master the seven big ideas and you score well.",
    date: "2026-04-24",
    readTime: "12 min read",
    category: "AP Computer Science Principles",
    keywords: [
      "study guide",
      "exam prep",
      "computer science",
      "STEM",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Computer Science Principles tests whether you understand computational thinking and the impact of computing on society, not whether you can write error-free code in one language. The course and exam are split 30-70: 30 percent is the performance task (design and create a program), 70 percent is the written exam (60-70 multiple choice).",
      },
      { type: "h2", text: "Exam structure" },
      {
        type: "h3", text: "Performance task (30 percent)" },
      {
        type: "ul",
        items: [
          "Create a useful program: game, tool, visualization, data analyzer, etc.",
          "10 hours of class time to design, code, and test.",
          "Document your process: planning, design choices, code, testing evidence.",
          "Rubric assesses program functionality, code clarity, design thinking, and documentation.",
        ],
      },
      { type: "h3", text: "Written exam (70 percent)" },
      {
        type: "ul",
        items: [
          "60-70 multiple choice questions.",
          "2 hours.",
          "Covers all seven big ideas and their applications.",
        ],
      },
      { type: "h2", text: "The seven big ideas" },
      {
        type: "h3", text: "1. Creativity: computing as creative tool" },
      {
        type: "p",
        text: "Programs solve problems and create experiences. Computational thinking: break problems into parts, find patterns, design algorithms, test and iterate.",
      },
      { type: "h3", text: "2. Abstraction: layers hide complexity" },
      {
        type: "ul",
        items: [
          "Variables encapsulate values.",
          "Functions encapsulate logic.",
          "APIs and libraries encapsulate complex systems.",
          "You use abstraction without knowing implementation details.",
        ],
      },
      { type: "h3", text: "3. Data: represent and analyze information" },
      {
        type: "ul",
        items: [
          "Bits and bytes: fundamental units. 8 bits equals 1 byte.",
          "Data types: integers, floating-point, strings, booleans, images, audio.",
          "Data structures: arrays, lists, dictionaries, records.",
          "Searching and sorting: linear search O(n), binary search O(log n), merge sort O(n log n).",
        ],
      },
      { type: "h3", text: "4. Algorithms: step-by-step procedures" },
      {
        type: "ul",
        items: [
          "Sequence: do A then B.",
          "Selection: if condition then A else B.",
          "Iteration: repeat while or for loop.",
          "Big O: classify runtime. O(1) constant, O(n) linear, O(n squared) quadratic, O(2 to the n) exponential.",
        ],
      },
      { type: "h3", text: "5. Programming: code as expression" },
      {
        type: "p",
        text: "Syntax differs by language. Logic does not. Exam uses pseudocode or Python, not exact syntax. Debugging: read errors, trace code, test assumptions.",
      },
      { type: "h3", text: "6. Internet: distributed systems" },
      {
        type: "ul",
        items: [
          "Packets: data chopped up with headers and routed to destination.",
          "Protocols: standards for communication (HTTP, TCP slash IP, DNS).",
          "Bandwidth: data per second. Latency: delay in milliseconds.",
          "Encryption: scramble data so only intended recipients can read it.",
          "Cybersecurity: passwords, two-factor, firewalls, updates.",
        ],
      },
      { type: "h3", text: "7. Impact: computing and society" },
      {
        type: "ul",
        items: [
          "Accessibility: is the software usable by everyone?",
          "Privacy: what data is collected and shared?",
          "Bias in algorithms: garbage data produces biased algorithms.",
          "Digital divide: not everyone has internet access.",
          "Environmental: data centers consume power. Efficiency saves energy.",
          "IP and open source: who owns software? What are you allowed to do with it?",
        ],
      },
      { type: "h2", text: "How to score a 5" },
      {
        type: "ol",
        items: [
          "Performance task: build something you believe in. Document it thoroughly. Passion counts.",
          "Study the seven big ideas. They connect every exam question.",
          "Learn Big O notation. Understand O(n) vs O(n squared) vs O(log n). The exam tests this constantly.",
          "Know binary, internet basics (packets, DNS, encryption), and algorithms (sorting, searching).",
          "Impact big idea is 15-20 percent of exam. Real-world consequences matter: privacy, bias, accessibility.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Obsessing over perfect syntax. The exam grades logic, not error-free code.",
          "Performance task too simple (hello world) or too ambitious (unfinished). Build something moderate and complete it.",
          "Confusing bandwidth and latency. Bandwidth is capacity (how much), latency is delay (how fast).",
          "Forgetting the impact big idea. It is 15-20 percent of the exam, not optional.",
          "Thinking CSP is just binary or just programming. It is about computational thinking across all domains.",
        ],
      },
      {
        type: "p",
        text: "AP Computer Science Principles rewards computational thinking and an understanding of computing's power and limits. Master the seven big ideas and the exam becomes straightforward.",
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

// Turn a human-readable tag ("AP Calc AB review") into a URL-safe slug
// ("ap-calc-ab-review"). Kept stable so tag URLs don't change when copy
// is tweaked: only letters/digits are kept, everything else becomes a
// single dash.
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Reverse lookup: given a tag slug, find the canonical display form by
// matching against any keyword on any post. Returns the original tag
// string so the tag page can show "AP Calc AB review" instead of the
// dashed slug. Falls back to a title-cased version of the slug when no
// post uses the tag (shouldn't happen, but keeps the page rendering).
export function getTagDisplay(slug: string): string {
  for (const p of BLOG_POSTS) {
    for (const k of p.keywords) {
      if (tagToSlug(k) === slug) return k;
    }
  }
  return slug.replace(/-/g, " ");
}

// All distinct tag slugs across the blog. Used to prerender the tag
// pages at build time. The set dedupes when multiple keyword variants
// slugify to the same thing (e.g. "AP Calc AB" vs "ap calc ab").
export function getAllTagSlugs(): string[] {
  const set = new Set<string>();
  for (const p of BLOG_POSTS) {
    for (const k of p.keywords) set.add(tagToSlug(k));
  }
  return [...set];
}

// Posts that use a given tag (by slug, so case/punctuation doesn't
// matter). Sorted newest-first like everywhere else in the blog.
export function getPostsByTagSlug(slug: string): BlogPost[] {
  return getAllPostsSorted().filter((p) =>
    p.keywords.some((k) => tagToSlug(k) === slug)
  );
}
