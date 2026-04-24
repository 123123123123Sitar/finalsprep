// Auto-split from lib/blogPosts.ts by tools/split_blogposts.ts.
// One file per post so diffs are small and git blame is readable.
//
// Do not edit the shape of this file manually; the loader in
// lib/blogPosts.ts expects a single named default export per slug.

import type { BlogPost } from "../../blogPosts";

export const POST_AP_CALCULUS_BC_REVIEW_GUIDE: BlogPost = {
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
  };
