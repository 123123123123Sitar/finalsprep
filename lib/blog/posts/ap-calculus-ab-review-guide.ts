// Auto-split from lib/blogPosts.ts by tools/split_blogposts.ts.
// One file per post so diffs are small and git blame is readable.
//
// Do not edit the shape of this file manually; the loader in
// lib/blogPosts.ts expects a single named default export per slug.

import type { BlogPost } from "../../blogPosts";

export const POST_AP_CALCULUS_AB_REVIEW_GUIDE: BlogPost = {
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
  };
