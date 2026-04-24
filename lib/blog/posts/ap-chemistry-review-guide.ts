// Auto-split from lib/blogPosts.ts by tools/split_blogposts.ts.
// One file per post so diffs are small and git blame is readable.
//
// Do not edit the shape of this file manually; the loader in
// lib/blogPosts.ts expects a single named default export per slug.

import type { BlogPost } from "../../blogPosts";

export const POST_AP_CHEMISTRY_REVIEW_GUIDE: BlogPost = {
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
  };
