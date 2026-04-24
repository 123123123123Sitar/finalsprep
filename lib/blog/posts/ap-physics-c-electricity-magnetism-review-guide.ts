// Auto-split from lib/blogPosts.ts by tools/split_blogposts.ts.
// One file per post so diffs are small and git blame is readable.
//
// Do not edit the shape of this file manually; the loader in
// lib/blogPosts.ts expects a single named default export per slug.

import type { BlogPost } from "../../blogPosts";

export const POST_AP_PHYSICS_C_ELECTRICITY_MAGNETISM_REVIEW_GUIDE: BlogPost = {
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
  };
