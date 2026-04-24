// Auto-split from lib/blogPosts.ts by tools/split_blogposts.ts.
// One file per post so diffs are small and git blame is readable.
//
// Do not edit the shape of this file manually; the loader in
// lib/blogPosts.ts expects a single named default export per slug.

import type { BlogPost } from "../../blogPosts";

export const POST_AP_PHYSICS_C_MECHANICS_REVIEW_GUIDE: BlogPost = {
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
  };
