// Auto-split from lib/blogPosts.ts by tools/split_blogposts.ts.
// One file per post so diffs are small and git blame is readable.
//
// Do not edit the shape of this file manually; the loader in
// lib/blogPosts.ts expects a single named default export per slug.

import type { BlogPost } from "../../blogPosts";

export const POST_AP_PHYSICS_1_REVIEW_GUIDE: BlogPost = {
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
  };
