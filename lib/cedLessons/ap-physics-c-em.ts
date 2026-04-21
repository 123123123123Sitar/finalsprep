import type { CourseCedLessons } from "./types";

/**
 * AP Physics C: Electricity & Magnetism CED lessons — every topic from
 * the 5-unit 2024 CED. Content is adapted from the AP Physics 2
 * electromagnetism lessons and upgraded with calculus: field integrals
 * for continuous charge distributions, Gauss's and Ampère's laws,
 * Biot-Savart, Faraday's law in integral and differential form, and
 * the LR/LC/RC circuit ODEs.
 *
 * Inline LaTeX uses \\(...\\) so the MathRender pipeline picks it up.
 */

export const AP_PHYSICS_C_EM_CED_LESSONS: CourseCedLessons = {
  // =========================================================================
  // UNIT 1 — ELECTROSTATICS
  // =========================================================================
  "1.1": {
    id: "1.1",
    title: "Electric Charge",
    summary:
      "Charge is a conserved, quantized property of matter — two kinds, like repels like, unlike attracts. \\(q = Ne\\) with \\(e = 1.6\\times 10^{-19}\\,\\text{C}\\).",
    lesson:
      "**Electric charge** is a fundamental property of matter, measured in coulombs (C). Two kinds — positive and negative — with like charges repelling and unlike charges attracting.\n\n**Quantization**: charge comes in integer multiples of \\(e = 1.602\\times 10^{-19}\\,\\text{C}\\). Protons: \\(+e\\); electrons: \\(-e\\); neutrons: \\(0\\). Macroscopic objects with net charge have \\(q = Ne\\) for some integer \\(N\\).\n\n**Conservation**: total charge in an isolated system is constant. Charges can be transferred between objects (friction, conduction, induction) but never created or destroyed. Beta decay \\(n \\to p + e^- + \\bar{\\nu}_e\\) preserves total charge (\\(0 \\to +e - e + 0\\)).\n\nIn ordinary matter, electrons are the **mobile carriers**. Protons are locked in atomic nuclei and do not move during everyday electrical phenomena.\n\nA **neutral** object has equal numbers of protons and electrons. A net charge means an excess or deficit of electrons. Everyday charge imbalances are tiny fractions of the total atomic population, yet produce macroscopic electrical effects — that's how potent the Coulomb force is.",
    keyIdeas: [
      "Two kinds of charge; like repels, unlike attracts.",
      "Quantized: \\(q = Ne\\) with \\(e = 1.6\\times 10^{-19}\\,\\text{C}\\).",
      "Conserved: \\(\\sum q\\) is constant in any isolated system.",
      "Electrons are the mobile carriers; protons stay put.",
    ],
    commonMistakes: [
      "Treating charge as continuous (it is discrete, but looks continuous macroscopically).",
      "Believing a neutral object has no charges — it has balanced ones.",
      "Moving protons around in thought experiments for solid matter.",
    ],
  },
  "1.2": {
    id: "1.2",
    title: "Coulomb's Law",
    summary:
      "\\(\\vec{F} = kq_1 q_2 \\hat{r}/r^2\\). Inverse-square, along the line joining the charges; superpose pairwise for multi-charge systems.",
    lesson:
      "**Coulomb's law** for two point charges \\(q_1, q_2\\) at separation \\(r\\):\n\n$$\\vec{F}_{12} = \\frac{k q_1 q_2}{r^2}\\hat{r}_{12},$$\n\nwhere \\(\\hat{r}_{12}\\) points from charge 1 to charge 2, and \\(k = 1/(4\\pi\\varepsilon_0) \\approx 8.99\\times 10^9\\,\\text{N·m}^2/\\text{C}^2\\). With signed charges, positive product gives repulsion (along \\(\\hat{r}\\)), negative product gives attraction (along \\(-\\hat{r}\\)).\n\nSame mathematical form as Newton's law of gravitation, but with crucial differences:\n- **Sign**: charges can be either; masses are always positive.\n- **Strength**: for two protons, \\(F_e/F_g \\sim 10^{36}\\).\n- **Screening**: opposite charges cancel in bulk neutral matter, so macroscopic gravitational forces dominate at astronomical scales.\n\n**Superposition**: for multiple source charges, the net force on a test charge is the vector sum of the pairwise Coulomb forces:\n\n$$\\vec{F}_{\\text{net}} = \\sum_i \\frac{k q q_i}{r_i^2}\\hat{r}_i.$$\n\nCompute each pair's force, resolve into components, add.\n\nCoulomb's law in vacuum; in a dielectric medium, replace \\(\\varepsilon_0\\) with \\(\\varepsilon = \\kappa\\varepsilon_0\\) (\\(\\kappa\\) = dielectric constant \\(\\ge 1\\)).",
    keyIdeas: [
      "\\(F = k|q_1 q_2|/r^2\\); along the line between charges.",
      "Like charges repel; unlike attract.",
      "Vector superposition for many charges.",
      "In a dielectric: replace \\(\\varepsilon_0\\) with \\(\\kappa\\varepsilon_0\\).",
    ],
    workedExample: {
      prompt:
        "Three charges sit on the x-axis: \\(+2\\,\\mu\\text{C}\\) at \\(x = 0\\), \\(-3\\,\\mu\\text{C}\\) at \\(x = 0.1\\,\\text{m}\\). Find the force on a \\(+1\\,\\mu\\text{C}\\) charge at \\(x = 0.2\\,\\text{m}\\).",
      solution:
        "From \\(+2\\,\\mu\\text{C}\\) at distance 0.2 m: repulsive, \\(F_1 = 9\\times 10^9(2\\times 10^{-6})(1\\times 10^{-6})/(0.2)^2 = 0.45\\,\\text{N}\\) in \\(+x\\). From \\(-3\\,\\mu\\text{C}\\) at distance 0.1 m: attractive, \\(F_2 = 9\\times 10^9(3\\times 10^{-6})(1\\times 10^{-6})/(0.1)^2 = 2.7\\,\\text{N}\\) in \\(-x\\). Net: \\(0.45 - 2.7 = -2.25\\,\\text{N}\\) (in \\(-x\\)).",
    },
    commonMistakes: [
      "Dropping absolute values and getting sign-confused magnitudes.",
      "Forgetting to add forces as vectors.",
      "Using \\(r\\) instead of \\(r^2\\) in the denominator.",
    ],
  },
  "1.3": {
    id: "1.3",
    title: "Electric Field",
    summary:
      "\\(\\vec{E} = \\vec{F}/q_0\\) — force per unit test charge. Point charge: \\(E = kQ/r^2\\) radially.",
    lesson:
      "**Electric field** at a point is the force per unit positive test charge placed there:\n\n$$\\vec{E} = \\vec{F}/q_0.$$\n\nUnits: N/C = V/m. The field is a property of the source configuration, independent of the test charge.\n\nFor a **point charge** \\(Q\\) at distance \\(r\\):\n\n$$\\vec{E} = \\frac{kQ}{r^2}\\hat{r},$$\n\npointing **outward** from \\(+Q\\) and **inward** toward \\(-Q\\).\n\n**Superposition** for a collection of point charges:\n\n$$\\vec{E}(\\vec{r}) = \\sum_i \\frac{kq_i}{|\\vec{r}-\\vec{r}_i|^2}\\hat{r}_i,$$\n\nwith each \\(\\hat{r}_i\\) pointing from source charge \\(i\\) to the field point.\n\n**Field lines** are drawn tangent to \\(\\vec{E}\\); they start on positive charges, end on negative charges (or at infinity). Density of lines indicates field magnitude. Lines never cross (a single direction at every point).\n\n**Force on a charge in a field**: \\(\\vec{F} = q\\vec{E}\\). The field is the \"messenger\" — sources create it, and any charge placed there feels \\(q\\vec{E}\\).\n\n**Conductor at electrostatic equilibrium**: \\(\\vec{E} = 0\\) inside; at the surface, \\(\\vec{E}\\) is perpendicular to the surface with magnitude \\(\\sigma/\\varepsilon_0\\) (from Gauss).",
    keyIdeas: [
      "\\(\\vec{E} = \\vec{F}/q_0\\); units N/C.",
      "Point charge: \\(E = kQ/r^2\\), radial.",
      "Force on a charge in a field: \\(\\vec{F} = q\\vec{E}\\).",
      "Field lines: \\(+\\) sources, \\(-\\) sinks, never cross.",
    ],
    workedExample: {
      prompt:
        "Two charges: \\(+3\\,\\mu\\text{C}\\) at origin and \\(-3\\,\\mu\\text{C}\\) at \\(x = 0.1\\,\\text{m}\\). Find the field at \\(x = 0.2\\,\\text{m}\\).",
      solution:
        "From \\(+3\\,\\mu\\text{C}\\): \\(E_1 = 9\\times 10^9\\cdot 3\\times 10^{-6}/(0.2)^2 = 675{,}000\\,\\text{N/C}\\) in \\(+x\\). From \\(-3\\,\\mu\\text{C}\\): \\(E_2 = 9\\times 10^9\\cdot 3\\times 10^{-6}/(0.1)^2 = 2{,}700{,}000\\,\\text{N/C}\\) in \\(-x\\). Net: \\(E = 675{,}000 - 2{,}700{,}000 = -2.025\\times 10^6\\,\\text{N/C}\\), i.e., toward \\(-x\\).",
    },
    commonMistakes: [
      "Confusing electric force and electric field (factor of \\(q\\)).",
      "Getting direction wrong for \\(+\\) vs. \\(-\\) sources.",
      "Forgetting to superpose vectorially.",
    ],
  },
  "1.4": {
    id: "1.4",
    title: "Electric Field Due to Continuous Charge Distributions",
    summary:
      "Break the distribution into elements \\(dq\\); each contributes \\(d\\vec{E} = k\\,dq\\,\\hat{r}/r^2\\). Integrate, using symmetry to cancel components.",
    lesson:
      "For a continuous charge distribution, sum (integrate) the contributions of infinitesimal pieces \\(dq\\):\n\n$$\\vec{E}(\\vec{r}) = \\int \\frac{k\\,dq}{|\\vec{r} - \\vec{r}'|^2}\\,\\hat{r},$$\n\nwhere \\(\\vec{r}'\\) is the source point and \\(\\hat{r}\\) points from \\(\\vec{r}'\\) to the field point.\n\nCharge-element shorthand:\n- **Linear density** \\(\\lambda\\) (C/m): \\(dq = \\lambda\\,d\\ell\\).\n- **Surface density** \\(\\sigma\\) (C/m²): \\(dq = \\sigma\\,dA\\).\n- **Volume density** \\(\\rho\\) (C/m³): \\(dq = \\rho\\,dV\\).\n\nSolution recipe:\n1. Choose a convenient coordinate adapted to the geometry (linear, cylindrical, spherical).\n2. Pick a mass/charge element \\(dq\\); express it in coordinates.\n3. Write \\(d\\vec{E}\\) in components. Use symmetry — pieces whose contributions cancel save you work.\n4. Integrate only the surviving component(s).\n\n**Canonical results**:\n- **Ring of total charge \\(Q\\), radius \\(R\\)**, field on axis at distance \\(z\\) from center: \\(E_z = kQz/(z^2 + R^2)^{3/2}\\) — zero at the center, maxes near \\(z \\sim R/\\sqrt{2}\\).\n- **Infinite line of linear density \\(\\lambda\\)**, perpendicular distance \\(r\\): \\(E = \\lambda/(2\\pi\\varepsilon_0 r)\\) (falls as \\(1/r\\), not \\(1/r^2\\)).\n- **Infinite sheet of surface density \\(\\sigma\\)**: \\(E = \\sigma/(2\\varepsilon_0)\\) — uniform, independent of distance.\n- **Uniformly charged disk** \\(\\sigma\\), radius \\(R\\), on axis: \\(E_z = (\\sigma/(2\\varepsilon_0))[1 - z/\\sqrt{z^2 + R^2}]\\).\n\nWhen computing \\(E\\) at a point, keep track of which distance \\(r\\) is which: often the separation from charge element to field point changes over the integration — substitute that in, not a constant.",
    keyIdeas: [
      "\\(\\vec{E} = \\int k\\,dq\\,\\hat{r}/r^2\\).",
      "Charge element: \\(dq = \\lambda\\,d\\ell\\), \\(\\sigma\\,dA\\), or \\(\\rho\\,dV\\).",
      "Exploit symmetry to cancel perpendicular components.",
      "Ring-on-axis: \\(E_z = kQz/(z^2 + R^2)^{3/2}\\); line: \\(\\lambda/(2\\pi\\varepsilon_0 r)\\); sheet: \\(\\sigma/(2\\varepsilon_0)\\).",
    ],
    workedExample: {
      prompt:
        "A uniformly charged ring of radius \\(R\\) and total charge \\(Q\\) lies in the \\(xy\\)-plane centered at the origin. Find \\(E\\) on the \\(z\\)-axis at height \\(z\\).",
      solution:
        "By symmetry, only the \\(z\\)-component survives. Each element \\(dq\\) is at distance \\(r = \\sqrt{z^2 + R^2}\\). The \\(z\\)-component contributes \\(dE_z = (k\\,dq/r^2)(z/r)\\). Integrating around the ring: \\(E_z = kQz/(z^2 + R^2)^{3/2}\\).",
    },
    commonMistakes: [
      "Pulling \\(r\\) out of the integral when it varies over the distribution.",
      "Forgetting to cancel perpendicular components via symmetry.",
      "Confusing \\(\\lambda\\), \\(\\sigma\\), \\(\\rho\\) units.",
    ],
  },
  "1.5": {
    id: "1.5",
    title: "Gauss's Law",
    summary:
      "\\(\\oint \\vec{E}\\cdot d\\vec{A} = Q_{\\text{enc}}/\\varepsilon_0\\). Reduces field calculations to algebra when symmetry makes \\(E\\) constant on a Gaussian surface.",
    lesson:
      "**Gauss's law**: the electric flux through any closed surface equals the enclosed charge divided by \\(\\varepsilon_0\\):\n\n$$\\oint_{\\mathcal{S}} \\vec{E}\\cdot d\\vec{A} = \\frac{Q_{\\text{enc}}}{\\varepsilon_0}.$$\n\nAlways true. Practically useful when symmetry lets you pull \\(E\\) outside the integral — spherical, cylindrical, or planar symmetry.\n\n**Procedure**:\n1. Identify the symmetry (spherical / cylindrical / planar).\n2. Choose a Gaussian surface matching that symmetry: sphere, cylinder coaxial with the charge, or \"pillbox\" flat.\n3. Compute flux \\(\\oint \\vec{E}\\cdot d\\vec{A}\\) by splitting the surface into pieces where \\(\\vec{E}\\) is either parallel to \\(d\\vec{A}\\) and constant, or perpendicular (zero contribution).\n4. Compute \\(Q_{\\text{enc}}\\) — only charge inside the surface counts.\n5. Equate and solve.\n\n**Canonical results** via Gauss:\n- **Point charge**: sphere of radius \\(r\\), \\(E(4\\pi r^2) = Q/\\varepsilon_0\\), so \\(E = kQ/r^2\\).\n- **Infinite line**, linear density \\(\\lambda\\): cylinder, \\(E(2\\pi r L) = \\lambda L/\\varepsilon_0\\), so \\(E = \\lambda/(2\\pi\\varepsilon_0 r)\\).\n- **Infinite sheet**, \\(\\sigma\\): pillbox with flux through both faces: \\(2EA = \\sigma A/\\varepsilon_0\\), so \\(E = \\sigma/(2\\varepsilon_0)\\).\n- **Solid insulating sphere**, uniform \\(\\rho\\), radius \\(R\\): inside \\(r < R\\), \\(E = kQr/R^3 = \\rho r/(3\\varepsilon_0)\\); outside, \\(E = kQ/r^2\\).\n- **Conducting sphere**: \\(E = 0\\) inside, \\(E = kQ/r^2\\) outside (all charge sits on the surface).\n\nGauss's law also implies conductors: in electrostatic equilibrium, \\(\\vec{E}_{\\text{inside}} = 0\\) (otherwise charges would move), and any net charge resides on the outer surface.",
    keyIdeas: [
      "\\(\\oint \\vec{E}\\cdot d\\vec{A} = Q_{\\text{enc}}/\\varepsilon_0\\).",
      "Solvable when symmetry makes \\(E\\) constant on the Gaussian surface.",
      "Works for spherical, cylindrical, planar symmetry.",
      "Inside a conductor at equilibrium: \\(\\vec{E} = 0\\); charge sits on the surface.",
    ],
    workedExample: {
      prompt:
        "A solid insulating sphere of radius \\(R\\) carries uniform charge density \\(\\rho\\). Find \\(\\vec{E}\\) for \\(r < R\\).",
      solution:
        "Gaussian sphere of radius \\(r\\): \\(E(4\\pi r^2) = Q_{\\text{enc}}/\\varepsilon_0 = (4/3)\\pi r^3 \\rho/\\varepsilon_0\\). So \\(E = \\rho r/(3\\varepsilon_0)\\), radially outward.",
    },
    commonMistakes: [
      "Including charge outside the Gaussian surface in \\(Q_{\\text{enc}}\\).",
      "Applying Gauss to problems lacking the required symmetry.",
      "Forgetting that flux through the \"sides\" of a pillbox/cylinder vanishes only when \\(\\vec{E}\\) is parallel to them.",
    ],
  },
  "1.6": {
    id: "1.6",
    title: "Electric Potential Energy",
    summary:
      "\\(U_E = kq_1 q_2/r\\) between two point charges. For a system, sum over all unique pairs. \\(\\Delta U = -W_{\\text{field}}\\).",
    lesson:
      "The work done by the electric force on a charge as it moves is path-independent (the electric force is conservative), so an **electric potential energy** \\(U_E\\) exists with\n\n$$W_{\\text{field}} = -\\Delta U_E.$$\n\nFor two point charges:\n\n$$U_E(r) = \\frac{kq_1 q_2}{r},$$\n\ntaken to vanish at \\(r\\to\\infty\\). Sign matters: same-sign charges have \\(U_E > 0\\) (work was required to bring them together); opposite signs have \\(U_E < 0\\) (the system is bound).\n\nFor a configuration of point charges, total potential energy is the sum over **unique pairs**:\n\n$$U_{\\text{system}} = \\sum_{i<j} \\frac{kq_i q_j}{r_{ij}}.$$\n\nDon't double-count.\n\nIn an external field described by potential \\(V\\): \\(U_E = qV\\). Work required by an external agent to move \\(q\\) from A to B (against the field, quasistatically) is \\(W_{\\text{ext}} = q(V_B - V_A) = q\\,\\Delta V\\).\n\n**Energy conservation**: in the absence of non-conservative forces, \\(\\Delta K + \\Delta U_E = 0\\). A charge released from rest gains kinetic energy as it moves from high to low \\(V\\):\n\n$$\\tfrac{1}{2}mv^2 = q\\,\\Delta V.$$\n\n1 eV (electron-volt) = \\(e\\cdot 1\\,\\text{V} = 1.6\\times 10^{-19}\\,\\text{J}\\) — an energy unit natural to atomic processes.",
    keyIdeas: [
      "\\(U_E = kq_1 q_2/r\\) (reference at infinity).",
      "For many charges: sum over unique pairs \\(i < j\\).",
      "\\(U_E = qV\\) in an external field.",
      "Energy conservation: \\(\\tfrac{1}{2}mv^2 = q\\,\\Delta V\\) for acceleration from rest.",
    ],
    workedExample: {
      prompt:
        "Three \\(+q\\) charges sit at the corners of an equilateral triangle of side \\(a\\). Find the total electric potential energy.",
      solution:
        "Three unique pairs, each contributing \\(kq^2/a\\). Total: \\(U_{\\text{tot}} = 3kq^2/a\\).",
    },
    commonMistakes: [
      "Forgetting sign on \\(U_E\\) for opposite-sign pairs.",
      "Double-counting pairs in a multi-charge system.",
      "Confusing potential \\(V\\) (J/C) with potential energy \\(U\\) (J).",
    ],
  },
  "1.7": {
    id: "1.7",
    title: "Electric Potential",
    summary:
      "\\(V(\\vec{r}) = kQ/r\\) for a point charge (reference at infinity). \\(V_B - V_A = -\\int_A^B \\vec{E}\\cdot d\\vec{\\ell}\\); \\(\\vec{E} = -\\nabla V\\).",
    lesson:
      "The **electric potential** at a point is the potential energy per unit test charge:\n\n$$V(\\vec{r}) = U_E/q.$$\n\nUnits: volt (\\(1\\,\\text{V} = 1\\,\\text{J/C}\\)). Scalar — no direction.\n\nFor a point charge \\(Q\\), reference at infinity:\n\n$$V(r) = \\frac{kQ}{r}.$$\n\nSuperposition: for multiple sources, \\(V = \\sum kq_i/r_i\\) (scalar sum — easier than vector \\(\\vec{E}\\) superposition).\n\nFor a continuous distribution: \\(V = \\int k\\,dq/r\\).\n\n**Line integral** relation between \\(V\\) and \\(\\vec{E}\\):\n\n$$V_B - V_A = -\\int_A^B \\vec{E}\\cdot d\\vec{\\ell}.$$\n\nGoing from A to B, subtract the integrated field component along the path. For a point charge: integrating \\(\\int_\\infty^r -kQ/r^2\\,dr = kQ/r\\) recovers the familiar result.\n\n**Gradient** relation:\n\n$$\\vec{E} = -\\nabla V.$$\n\nIn 1D: \\(E_x = -dV/dx\\). The field points from high \\(V\\) to low \\(V\\), down the gradient. Graphically: close-packed equipotentials mean strong field; widely spaced mean weak.\n\n**Equipotential surfaces** are where \\(V\\) is constant; \\(\\vec{E}\\) is always perpendicular to them. No work is done moving a charge along an equipotential (\\(W = -q\\,\\Delta V = 0\\)). Conductor surfaces at electrostatic equilibrium are equipotentials.\n\nChoose a convenient reference. For localized charge distributions, \\(V = 0\\) at infinity is standard. For problems with infinite planes or lines, that breaks — pick a finite reference point.",
    keyIdeas: [
      "\\(V = kQ/r\\) for a point charge; scalar, additive by superposition.",
      "\\(V_B - V_A = -\\int_A^B \\vec{E}\\cdot d\\vec{\\ell}\\); \\(\\vec{E} = -\\nabla V\\).",
      "Equipotentials are perpendicular to \\(\\vec{E}\\); no work moving along one.",
      "Conductor surfaces at equilibrium are equipotentials; interior has constant \\(V\\).",
    ],
    workedExample: {
      prompt:
        "A uniformly charged ring of radius \\(R\\) carries total charge \\(Q\\). Find \\(V\\) on the axis at distance \\(z\\) from the center.",
      solution:
        "Every element \\(dq\\) is at distance \\(r = \\sqrt{z^2 + R^2}\\). Since this is the same for all elements, \\(V = k\\int dq/r = kQ/\\sqrt{z^2 + R^2}\\). Differentiating \\(V\\) and applying \\(E_z = -dV/dz\\) recovers the ring-on-axis field result from 1.4.",
    },
    commonMistakes: [
      "Dropping the minus sign in \\(\\vec{E} = -\\nabla V\\).",
      "Taking \\(V = 0\\) at infinity for an infinite charge distribution (it isn't).",
      "Using \\(V\\) like a vector instead of a scalar.",
    ],
  },

  // =========================================================================
  // UNIT 2 — CONDUCTORS, CAPACITORS, DIELECTRICS
  // =========================================================================
  "2.1": {
    id: "2.1",
    title: "Conductors and Insulators",
    summary:
      "Conductors have mobile charges that redistribute until \\(\\vec{E}_{\\text{inside}} = 0\\). Insulators polarize but charges don't migrate.",
    lesson:
      "**Conductors** (metals, salt solutions) have charges — electrons in metals, ions in solutions — that are free to move macroscopic distances. **Insulators** (dielectrics: glass, rubber, plastic) have charges bound to atoms; they can shift slightly in an applied field but cannot flow.\n\n**Electrostatic equilibrium in a conductor**:\n- Inside the bulk: \\(\\vec{E} = 0\\). If it weren't, charges would rearrange until it were.\n- Surface: \\(\\vec{E}\\) perpendicular to the surface; tangential component would drive surface currents. Just outside, \\(E = \\sigma/\\varepsilon_0\\) (from a Gaussian pillbox).\n- Bulk potential is constant; surface is an equipotential.\n- Any net charge on an isolated conductor sits on the **outer surface** — interior has no net charge in equilibrium (Gauss).\n\n**Shielding**: a hollow conductor's interior is shielded from external fields (Faraday cage). Charges on the outer surface rearrange to cancel the external field inside. Lightning strikes a car but the passengers are safe.\n\n**Charging methods**:\n- **Friction**: transfers electrons via the triboelectric series.\n- **Conduction**: direct contact equalizes potentials.\n- **Induction**: separate charges in a neutral conductor using a nearby charged object; ground one side to drain off the opposite-sign charge; remove ground then external charge.\n\n**Insulators polarize**: internal dipoles align with an external field, producing surface bound charge. This effective polarization is described by the dielectric constant \\(\\kappa\\) (Unit 2.3) and weakens the field inside the insulator by factor \\(\\kappa\\).",
    keyIdeas: [
      "Conductors: charges free to move; \\(\\vec{E} = 0\\) inside at equilibrium.",
      "Surface \\(E = \\sigma/\\varepsilon_0\\); net charge lives on the outer surface.",
      "Faraday cage: hollow conductor shields its interior.",
      "Insulators polarize without charge migration.",
    ],
    commonMistakes: [
      "Thinking charges inside a conductor are \"stuck\" — they're mobile and arrange themselves.",
      "Claiming the interior of a charged conductor has field or net charge at equilibrium.",
      "Confusing conduction with induction charging.",
    ],
  },
  "2.2": {
    id: "2.2",
    title: "Capacitance",
    summary:
      "Capacitance \\(C = Q/V\\); a geometric property of a pair of conductors. Units: farad (F).",
    lesson:
      "Two conductors carrying equal and opposite charges \\(\\pm Q\\) form a **capacitor**. The potential difference between them is proportional to the charge:\n\n$$C = \\frac{Q}{V}.$$\n\nCapacitance \\(C\\) depends only on **geometry** (and the dielectric between the conductors), not on the voltage or charge. Units: farad (\\(1\\,\\text{F} = 1\\,\\text{C/V}\\)).\n\nCommon geometries:\n- **Parallel-plate**: \\(C = \\varepsilon_0 A/d\\) (vacuum), or \\(\\kappa\\varepsilon_0 A/d\\) with a dielectric filling the gap.\n- **Cylindrical** (length \\(L\\), inner radius \\(a\\), outer radius \\(b\\)): \\(C = 2\\pi\\varepsilon_0 L/\\ln(b/a)\\).\n- **Spherical** (inner radius \\(a\\), outer radius \\(b\\)): \\(C = 4\\pi\\varepsilon_0 ab/(b-a)\\).\n- **Isolated sphere** of radius \\(R\\): \\(C = 4\\pi\\varepsilon_0 R\\).\n\n**Derivation recipe**: assume charge \\(Q\\) on one conductor; find \\(\\vec{E}\\) between them (often via Gauss); integrate \\(V = \\int \\vec{E}\\cdot d\\vec{\\ell}\\) to get the potential difference; divide.\n\nReal-world farads are big — typical capacitors are μF to pF. A 1 F capacitor is desk-sized (at normal voltages).",
    keyIdeas: [
      "\\(C = Q/V\\); geometric property only.",
      "Parallel-plate: \\(C = \\varepsilon_0 A/d\\).",
      "Derive \\(C\\) by assume-Q, Gauss for \\(E\\), integrate for \\(V\\).",
      "Units: farad = C/V.",
    ],
    workedExample: {
      prompt:
        "A parallel-plate capacitor has plates of area \\(0.02\\,\\text{m}^2\\) separated by \\(1\\,\\text{mm}\\) of vacuum. Find its capacitance.",
      solution:
        "\\(C = \\varepsilon_0 A/d = 8.85\\times 10^{-12}\\cdot 0.02 / 0.001 \\approx 1.77\\times 10^{-10}\\,\\text{F} = 177\\,\\text{pF}\\).",
    },
    commonMistakes: [
      "Mixing up plate area and plate separation.",
      "Confusing total charge \\(Q\\) with charge per plate — they're equal in magnitude (on opposite plates), not doubled.",
      "Forgetting the dielectric factor \\(\\kappa\\).",
    ],
  },
  "2.3": {
    id: "2.3",
    title: "Parallel-Plate Capacitors and Dielectrics",
    summary:
      "\\(C = \\kappa\\varepsilon_0 A/d\\). A dielectric increases capacitance by factor \\(\\kappa\\); at fixed \\(Q\\), voltage drops; at fixed \\(V\\), charge grows.",
    lesson:
      "For a parallel-plate capacitor with plates of area \\(A\\) separated by \\(d\\), assume surface charge \\(\\pm\\sigma = \\pm Q/A\\). Between the plates, Gauss gives uniform \\(E = \\sigma/\\varepsilon_0\\); integrating across gives \\(V = Ed = Qd/(\\varepsilon_0 A)\\). So\n\n$$C = \\frac{Q}{V} = \\frac{\\varepsilon_0 A}{d}.$$\n\nWith a **dielectric** of constant \\(\\kappa\\) filling the gap:\n- The field inside is reduced: \\(E = \\sigma/(\\kappa\\varepsilon_0)\\).\n- Capacitance becomes \\(C = \\kappa\\varepsilon_0 A/d\\).\n\nTwo scenarios when a dielectric is inserted:\n- **Battery disconnected** (fixed \\(Q\\)): \\(V\\) drops by factor \\(\\kappa\\); \\(E\\) drops by \\(\\kappa\\); energy \\(U = Q^2/(2C)\\) drops by \\(\\kappa\\) (the inserted dielectric is pulled in — energy goes to mechanical work).\n- **Battery connected** (fixed \\(V\\)): \\(Q\\) increases by factor \\(\\kappa\\); \\(U = \\tfrac{1}{2}CV^2\\) increases by \\(\\kappa\\) (battery supplies extra energy).\n\nReal dielectrics also have a **breakdown field** — exceed it and the insulator conducts (arcs over). This limits the maximum voltage for a given gap.\n\nDesign trade-offs:\n- Larger plates, smaller gaps, higher-\\(\\kappa\\) dielectrics all raise \\(C\\).\n- But smaller gaps risk breakdown; higher \\(\\kappa\\) materials often have other trade-offs (cost, stability).\n- Electrolytic capacitors cheat via a very thin oxide layer as the dielectric — high \\(C\\) at low breakdown voltage.",
    keyIdeas: [
      "\\(C = \\kappa\\varepsilon_0 A/d\\).",
      "Dielectric multiplies \\(C\\) by \\(\\kappa\\), weakens \\(E\\) inside by the same factor.",
      "Fixed \\(Q\\): inserting dielectric lowers \\(V\\) and stored energy.",
      "Fixed \\(V\\): battery supplies extra \\(Q\\) and energy.",
    ],
    workedExample: {
      prompt:
        "A parallel-plate capacitor with \\(C_0 = 100\\,\\text{pF}\\) is connected to a 10 V battery. A dielectric with \\(\\kappa = 5\\) is inserted while still connected. Find the new stored energy.",
      solution:
        "New capacitance \\(C = \\kappa C_0 = 500\\,\\text{pF}\\). At fixed \\(V\\): \\(U = \\tfrac{1}{2}CV^2 = 0.5\\cdot 500\\times 10^{-12}\\cdot 100 = 2.5\\times 10^{-8}\\,\\text{J}\\). (Up by factor of 5 from the \\(C_0\\) case.)",
    },
    commonMistakes: [
      "Using the same formulas for fixed-\\(Q\\) vs. fixed-\\(V\\) insertion scenarios.",
      "Forgetting \\(\\kappa\\) when a dielectric is present.",
      "Assuming dielectric breakdown is irrelevant (for AP it is, but note the max-voltage warning).",
    ],
  },
  "2.4": {
    id: "2.4",
    title: "Energy Stored in Capacitors",
    summary:
      "\\(U = \\tfrac{1}{2}CV^2 = \\tfrac{1}{2}Q^2/C = \\tfrac{1}{2}QV\\). The factor of \\(\\tfrac{1}{2}\\) comes from integrating as the capacitor charges.",
    lesson:
      "To charge a capacitor from 0 to \\(Q\\), an external source supplies energy\n\n$$U = \\int_0^Q \\frac{q}{C}\\,dq = \\frac{Q^2}{2C} = \\tfrac{1}{2}CV^2 = \\tfrac{1}{2}QV.$$\n\nThe factor of \\(\\tfrac{1}{2}\\) accounts for the voltage growing linearly with charge during the charging process — only the final charge \\(q\\) sees the full voltage \\(V = Q/C\\), while earlier charges saw smaller potential differences.\n\nThis energy is stored in the **electric field** between the plates. Energy density:\n\n$$u_E = \\tfrac{1}{2}\\varepsilon_0 E^2$$\n\n(joules per cubic meter in vacuum). For a parallel-plate: \\(u_E = \\tfrac{1}{2}\\varepsilon_0 E^2\\), integrated over the volume \\(A\\cdot d\\) gives \\(\\tfrac{1}{2}\\varepsilon_0 E^2 A d = \\tfrac{1}{2}CV^2\\) — consistent.\n\nFor **RC circuits** (Unit 3.4), this stored energy is what later discharges through the circuit; \\(\\tfrac{1}{2}CV^2\\) converts into resistive heat as the capacitor drains.\n\n**Dielectric insertion** at fixed \\(Q\\) (battery off): stored energy decreases; the difference appears as mechanical work on the dielectric, which is pulled into the gap (lowering the system's energy). At fixed \\(V\\) (battery on): stored energy increases, and the battery also does extra work supplying additional charge.",
    keyIdeas: [
      "\\(U = \\tfrac{1}{2}CV^2 = Q^2/(2C) = \\tfrac{1}{2}QV\\).",
      "Factor of \\(\\tfrac{1}{2}\\) comes from integrating over the charging process.",
      "Energy density of the field: \\(u_E = \\tfrac{1}{2}\\varepsilon_0 E^2\\).",
      "Integrating \\(u_E\\) over volume recovers the stored energy.",
    ],
    workedExample: {
      prompt:
        "A \\(10\\,\\mu\\text{F}\\) capacitor is charged to 50 V. Find the stored energy and the energy density between the plates, given a 1 mm gap.",
      solution:
        "\\(U = \\tfrac{1}{2}CV^2 = 0.5\\cdot 10^{-5}\\cdot 2500 = 0.0125\\,\\text{J}\\). Field \\(E = V/d = 50{,}000\\,\\text{V/m}\\). \\(u_E = \\tfrac{1}{2}\\varepsilon_0 E^2 = 0.5\\cdot 8.85\\times 10^{-12}\\cdot(5\\times 10^4)^2 \\approx 0.011\\,\\text{J/m}^3\\).",
    },
    commonMistakes: [
      "Dropping the factor of 1/2.",
      "Using \\(U = QV\\) instead of \\(\\tfrac{1}{2}QV\\) for a capacitor.",
      "Applying \\(u_E = \\tfrac{1}{2}\\varepsilon_0 E^2\\) with \\(E\\) in the wrong units.",
    ],
  },
  "2.5": {
    id: "2.5",
    title: "Capacitors in Series and Parallel",
    summary:
      "Series: \\(1/C_{\\text{eq}} = \\sum 1/C_i\\) (opposite of resistors). Parallel: \\(C_{\\text{eq}} = \\sum C_i\\).",
    lesson:
      "Capacitors combine according to rules **opposite** to resistors:\n\n- **Series**: same \\(Q\\) on each (whatever charge pushes onto the first capacitor flows to the next). Voltage adds: \\(V_{\\text{tot}} = \\sum V_i\\), so \\(1/C_{\\text{eq}} = \\sum 1/C_i\\). The equivalent capacitance is smaller than any individual.\n- **Parallel**: same \\(V\\) across each (connected to the same two nodes). Charges add: \\(Q_{\\text{tot}} = \\sum Q_i\\), so \\(C_{\\text{eq}} = \\sum C_i\\). The equivalent is larger than any individual.\n\n**Mnemonic**: think about geometry. Putting two parallel-plate capacitors side by side (parallel) doubles the area → doubles \\(C\\). Stacking them (series) doubles the effective gap → halves \\(C\\).\n\nFor mixed networks, simplify step by step: combine parallel groups into single capacitors, then combine the resulting series chains, etc. At each stage, track \\(Q\\) (series-conserved) and \\(V\\) (parallel-conserved).\n\nEnergy: \\(U_{\\text{total}} = \\sum U_i = \\tfrac{1}{2}C_{\\text{eq}}V_{\\text{tot}}^2\\) for parallel, \\(= \\tfrac{1}{2}Q^2/C_{\\text{eq}}\\) for series. Both recover the individual energies when you track per-capacitor \\(Q\\) and \\(V\\).",
    keyIdeas: [
      "Series capacitors: \\(1/C_{\\text{eq}} = \\sum 1/C_i\\); smaller than any one.",
      "Parallel capacitors: \\(C_{\\text{eq}} = \\sum C_i\\); larger than any one.",
      "Series share \\(Q\\); parallel share \\(V\\).",
      "Opposite to resistor combination rules.",
    ],
    workedExample: {
      prompt:
        "Three capacitors: \\(2, 3, 6\\,\\mu\\text{F}\\). Find the equivalent capacitance when all three are in parallel, and when all three are in series.",
      solution:
        "Parallel: \\(C = 2 + 3 + 6 = 11\\,\\mu\\text{F}\\). Series: \\(1/C = 1/2 + 1/3 + 1/6 = 6/6 = 1\\), so \\(C = 1\\,\\mu\\text{F}\\).",
    },
    commonMistakes: [
      "Swapping series and parallel rules (they're the opposite of resistors).",
      "Adding individual voltages in parallel (they're the same) or charges in series (they're the same).",
      "Dropping reciprocal structure in series combinations.",
    ],
  },

  // =========================================================================
  // UNIT 3 — ELECTRIC CIRCUITS
  // =========================================================================
  "3.1": {
    id: "3.1",
    title: "Current, Resistance, and Power",
    summary:
      "\\(I = dQ/dt\\); \\(V = IR\\) for ohmic conductors; \\(R = \\rho L/A\\). Power dissipated: \\(P = IV = I^2R = V^2/R\\).",
    lesson:
      "**Current** is the rate of charge flow past a cross-section:\n\n$$I = \\frac{dQ}{dt}.$$\n\nUnits: ampere (A) = C/s. Conventional current is the direction positive charges would flow, opposite to actual electron drift in metals.\n\nMicroscopic picture: for \\(n\\) carriers per volume, each of charge \\(q\\), drifting at velocity \\(v_d\\) through cross-section \\(A\\): \\(I = nAq v_d\\).\n\n**Ohm's law** (for ohmic conductors): \\(V = IR\\) with \\(R\\) the resistance in ohms (\\(\\Omega = \\text{V/A}\\)). Not a fundamental law — many devices (diodes, LEDs, filaments) are non-ohmic.\n\n**Resistivity** \\(\\rho\\) (\\(\\Omega\\cdot\\text{m}\\)) is a material property:\n\n$$R = \\frac{\\rho L}{A}.$$\n\nLonger wires have more resistance; thicker wires have less. Metals have \\(\\rho\\) increasing with temperature.\n\n**Power** dissipated in a resistor:\n\n$$P = IV = I^2R = V^2/R.$$\n\nAll three forms are equivalent via Ohm's law. Energy delivered by a battery: \\(P = \\varepsilon I\\). When \\(\\varepsilon\\) is the EMF and the battery has internal resistance \\(r\\), the terminal voltage is \\(V = \\varepsilon - Ir\\).\n\nFor a resistor network, total power is distributed among elements: series elements share current (power goes as \\(I^2R\\), larger \\(R\\) dissipates more); parallel elements share voltage (power goes as \\(V^2/R\\), smaller \\(R\\) dissipates more).",
    keyIdeas: [
      "\\(I = dQ/dt\\); conventional current is direction of \\(+\\) flow.",
      "Ohm (ohmic only): \\(V = IR\\).",
      "\\(R = \\rho L/A\\).",
      "Power: \\(P = IV = I^2R = V^2/R\\).",
    ],
    workedExample: {
      prompt:
        "A 12 V battery drives \\(I = 2\\,\\text{A}\\) through a resistor. Find the resistance and the power dissipated.",
      solution:
        "\\(R = V/I = 6\\,\\Omega\\). \\(P = IV = 24\\,\\text{W}\\).",
    },
    commonMistakes: [
      "Using \\(P = V^2/R\\) when the resistor is in series (you want \\(I^2R\\) since currents are shared).",
      "Confusing drift velocity with signal propagation speed.",
      "Treating all devices as ohmic.",
    ],
  },
  "3.2": {
    id: "3.2",
    title: "Steady-State Direct Current Circuits with Batteries and Resistors",
    summary:
      "Combine Kirchhoff's loop and junction rules with Ohm's law. Resistors in series add; in parallel \\(1/R_{\\text{eq}} = \\sum 1/R_i\\).",
    lesson:
      "**Kirchhoff's junction rule**: at any node, total current in = total current out (conservation of charge in steady state).\n\n**Kirchhoff's loop rule**: around any closed loop, \\(\\sum \\Delta V = 0\\) (conservation of energy per unit charge).\n\nSign conventions for traversing the loop:\n- Battery from \\(-\\) to \\(+\\): \\(+\\varepsilon\\); reverse: \\(-\\varepsilon\\).\n- Resistor in the direction of current: \\(-IR\\); against: \\(+IR\\).\n- Capacitor in the direction from \\(-\\) to \\(+\\) plate: \\(+Q/C\\); reverse: \\(-Q/C\\).\n\n**Resistor combinations**:\n- **Series**: \\(R_{\\text{eq}} = \\sum R_i\\). Same current through each; voltage splits proportionally.\n- **Parallel**: \\(1/R_{\\text{eq}} = \\sum 1/R_i\\). Same voltage across each; current splits inversely with resistance.\n\n**Voltage divider**: two resistors \\(R_1, R_2\\) in series across voltage \\(V\\): \\(V_1 = V R_1/(R_1+R_2)\\); \\(V_2 = V R_2/(R_1+R_2)\\). **Current divider** (two parallel branches): \\(I_1 = I R_2/(R_1+R_2)\\); \\(I_2 = I R_1/(R_1+R_2)\\) (current prefers the lower-resistance path).\n\n**Batteries** have **internal resistance** \\(r\\). Terminal voltage \\(V = \\varepsilon - Ir\\) drops below the EMF when current flows; when short-circuited (\\(R = 0\\)), \\(I_{\\max} = \\varepsilon/r\\).\n\nFor multi-loop circuits: label each branch current, apply enough independent loop and junction equations to determine all unknowns, solve the linear system.",
    keyIdeas: [
      "Junction rule: \\(\\sum I_{\\text{in}} = \\sum I_{\\text{out}}\\).",
      "Loop rule: \\(\\sum \\Delta V = 0\\).",
      "Series: \\(R_{\\text{eq}} = \\sum R_i\\); parallel: \\(1/R_{\\text{eq}} = \\sum 1/R_i\\).",
      "Battery terminal voltage: \\(V = \\varepsilon - Ir\\).",
    ],
    workedExample: {
      prompt:
        "A 12 V battery drives two resistors, \\(4\\,\\Omega\\) and \\(2\\,\\Omega\\), in series. Find the current and the voltage across each.",
      solution:
        "\\(R_{\\text{eq}} = 6\\,\\Omega\\); \\(I = 12/6 = 2\\,\\text{A}\\). \\(V_{4} = 8\\,\\text{V}\\); \\(V_{2} = 4\\,\\text{V}\\).",
    },
    commonMistakes: [
      "Sign mistakes traversing resistors and batteries.",
      "Adding parallel resistances directly.",
      "Forgetting internal resistance when terminal voltage is asked.",
    ],
  },
  "3.3": {
    id: "3.3",
    title: "Capacitors in Circuits",
    summary:
      "In steady state, no current flows through a capacitor; voltage across it equals the emf driving that branch. During transients, \\(I = C\\,dV/dt\\).",
    lesson:
      "A capacitor in a DC circuit has two relevant regimes:\n\n- **Transient**: just after closing a switch (or during charging/discharging). Current flows onto or off the plates, \\(I_C = dQ/dt = C\\,dV/dt\\).\n- **Steady state** (long time): \\(dQ/dt = 0\\), so \\(I = 0\\) through the capacitor. It behaves like an open switch.\n\nConsequences:\n- **Initial behavior** (just after closing): the capacitor is uncharged (or starts at its pre-existing charge), and its voltage cannot change instantaneously — \\(V_C(0^+) = V_C(0^-)\\). So the capacitor initially behaves like a wire (short circuit) if it was uncharged.\n- **Final behavior**: no current through capacitor branches; voltage across equals the steady-state potential difference of those nodes.\n\nFor circuits with capacitors and resistors, solve both regimes:\n1. Initial: capacitor ⇒ wire (if uncharged), solve for currents.\n2. Final: capacitor ⇒ open, no current through it, solve for voltages.\n3. Transient behavior connects the two exponentially (see 3.4 for RC).\n\n**Energy**: charged to voltage \\(V\\), the capacitor stores \\(U = \\tfrac{1}{2}CV^2\\). During charging from a battery, the battery supplies \\(QV\\), the capacitor stores \\(\\tfrac{1}{2}QV\\), and the remaining \\(\\tfrac{1}{2}QV\\) dissipates as heat in the resistor — independent of \\(R\\)!",
    keyIdeas: [
      "Steady state: no current through capacitors.",
      "Transient: \\(I_C = C\\,dV/dt\\); \\(V_C\\) cannot jump instantaneously.",
      "Initial (uncharged): capacitor acts as a wire. Final: acts as open.",
      "Charging energy split: \\(\\tfrac{1}{2}QV\\) stored, \\(\\tfrac{1}{2}QV\\) dissipated as heat.",
    ],
    commonMistakes: [
      "Letting current flow through a capacitor at steady state.",
      "Forgetting that capacitor voltage is continuous (can't jump).",
      "Treating charged capacitors like charged batteries.",
    ],
  },
  "3.4": {
    id: "3.4",
    title: "RC Circuits",
    summary:
      "RC circuits satisfy \\(RC\\,dV/dt + V = V_{\\text{source}}\\). Solutions decay exponentially with time constant \\(\\tau = RC\\).",
    lesson:
      "A simple **charging RC circuit**: battery (EMF \\(\\varepsilon\\)) in series with resistor \\(R\\) and initially uncharged capacitor \\(C\\). Kirchhoff's loop rule: \\(\\varepsilon = IR + V_C\\) where \\(V_C = Q/C\\) and \\(I = dQ/dt\\). This gives the ODE\n\n$$R\\frac{dQ}{dt} + \\frac{Q}{C} = \\varepsilon,$$\n\nwith solution\n\n$$Q(t) = C\\varepsilon\\left(1 - e^{-t/\\tau}\\right),\\quad \\tau = RC.$$\n\nCurrent: \\(I(t) = (\\varepsilon/R)e^{-t/\\tau}\\) — starts at max \\(I_0 = \\varepsilon/R\\), decays to zero.\n\n**Discharging** (capacitor charged to \\(Q_0\\), then connected through resistor \\(R\\) with no battery): \\(Q/C = IR\\) with \\(I = -dQ/dt\\). ODE: \\(RC\\,dQ/dt = -Q\\), giving\n\n$$Q(t) = Q_0 e^{-t/\\tau}.$$\n\nCurrent: \\(I(t) = (Q_0/RC)e^{-t/\\tau}\\) — decays with same \\(\\tau\\).\n\n**Time constant** \\(\\tau = RC\\): time for \\(Q\\) (or \\(I\\)) to change by a factor of \\(e\\approx 2.718\\). After one \\(\\tau\\), capacitor is about 63% charged (or discharged). After \\(5\\tau\\), essentially complete.\n\n**Energy accounting** during full charging from battery \\(\\varepsilon\\) through \\(R\\):\n- Total from battery: \\(W_{\\text{bat}} = \\varepsilon Q_{\\text{final}} = C\\varepsilon^2\\).\n- Stored in capacitor: \\(U_C = \\tfrac{1}{2}C\\varepsilon^2\\).\n- Dissipated in resistor: \\(U_R = \\tfrac{1}{2}C\\varepsilon^2\\) (half — always, regardless of \\(R\\)).\n\nMulti-component RC circuits: compute the Thévenin equivalent (open-circuit voltage and equivalent resistance seen from the capacitor's terminals); the ODE is the same form with that equivalent.",
    keyIdeas: [
      "Time constant: \\(\\tau = RC\\).",
      "Charging: \\(Q(t) = C\\varepsilon(1 - e^{-t/\\tau})\\); current decays \\(e^{-t/\\tau}\\).",
      "Discharging: \\(Q(t) = Q_0 e^{-t/\\tau}\\).",
      "Charging energy: half to capacitor, half dissipated in resistor.",
    ],
    workedExample: {
      prompt:
        "A 10 μF capacitor, initially uncharged, is connected through a 1 kΩ resistor to a 12 V battery. Find the time constant and the capacitor voltage after 10 ms.",
      solution:
        "\\(\\tau = RC = 1000\\cdot 10^{-5} = 0.01\\,\\text{s}\\). After \\(t = \\tau\\): \\(V_C = \\varepsilon(1 - e^{-1}) = 12(1 - 0.368) \\approx 7.58\\,\\text{V}\\).",
    },
    commonMistakes: [
      "Using the wrong sign in the discharging ODE.",
      "Applying the charging formula for discharging (or vice versa).",
      "Confusing time constant with half-life (different constants).",
    ],
  },

  // =========================================================================
  // UNIT 4 — MAGNETIC FIELDS
  // =========================================================================
  "4.1": {
    id: "4.1",
    title: "Forces on Moving Charges in Magnetic Fields",
    summary:
      "\\(\\vec{F} = q\\vec{v}\\times\\vec{B}\\). Perpendicular to both; does no work; circular motion has radius \\(r = mv/(qB)\\).",
    lesson:
      "The **Lorentz force** on a charge moving in a magnetic field:\n\n$$\\vec{F} = q\\vec{v}\\times\\vec{B},$$\n\nwith magnitude \\(F = qvB\\sin\\theta\\). Direction from the right-hand rule: fingers from \\(\\vec{v}\\) curl toward \\(\\vec{B}\\); thumb points along \\(\\vec{v}\\times\\vec{B}\\) (for positive \\(q\\); flip for negative).\n\nKey consequences:\n- Force is **perpendicular** to velocity ⇒ \\(\\vec{F}\\cdot\\vec{v} = 0\\), so magnetic forces do **no work** (speed and KE unchanged).\n- If \\(\\vec{v}\\perp\\vec{B}\\), motion is **circular** with radius\n\n$$r = \\frac{mv}{qB}$$\n\n(from \\(qvB = mv^2/r\\)). Period: \\(T = 2\\pi m/(qB)\\), independent of \\(v\\).\n- If \\(\\vec{v}\\) has both perpendicular and parallel components: perpendicular produces circular motion; parallel is unaffected; trajectory is a helix.\n\n**Combined with an electric field** (full Lorentz): \\(\\vec{F} = q\\vec{E} + q\\vec{v}\\times\\vec{B}\\).\n\n**Velocity selector**: crossed \\(\\vec{E}\\perp\\vec{B}\\); charges with \\(v = E/B\\) experience zero net force and pass through.\n\n**Mass spectrometer**: after a velocity selector, charges enter a pure-\\(B\\) region and curve into semicircles of radius \\(r = mv/(qB)\\), separating by \\(m/q\\).",
    keyIdeas: [
      "\\(\\vec{F} = q\\vec{v}\\times\\vec{B}\\); \\(F = qvB\\sin\\theta\\).",
      "Magnetic force does no work; speed unchanged.",
      "Circular motion: \\(r = mv/(qB)\\); \\(T = 2\\pi m/(qB)\\).",
      "Velocity selector: \\(v = E/B\\) passes through crossed fields.",
    ],
    workedExample: {
      prompt:
        "A proton moves at \\(10^6\\,\\text{m/s}\\) perpendicular to a 0.1 T field. Find the radius and period of its circular motion.",
      solution:
        "\\(r = mv/(qB) = (1.67\\times 10^{-27})(10^6)/(1.6\\times 10^{-19}\\cdot 0.1) \\approx 0.104\\,\\text{m}\\). \\(T = 2\\pi m/(qB) \\approx 6.56\\times 10^{-7}\\,\\text{s}\\) — independent of \\(v\\).",
    },
    commonMistakes: [
      "Getting the right-hand-rule direction wrong (watch sign of \\(q\\)).",
      "Including magnetic force in work-energy calculations.",
      "Using force expressions with \\(v = 0\\) charges (no force).",
    ],
  },
  "4.2": {
    id: "4.2",
    title: "Forces on Current-Carrying Wires",
    summary:
      "\\(\\vec{F} = I\\vec{L}\\times\\vec{B}\\) for a straight segment; for curved wires, \\(\\vec{F} = \\int I\\,d\\vec{\\ell}\\times\\vec{B}\\).",
    lesson:
      "A current-carrying wire in a magnetic field experiences a force. For a straight segment of length \\(L\\) carrying current \\(I\\) in a uniform \\(\\vec{B}\\):\n\n$$\\vec{F} = I\\vec{L}\\times\\vec{B},$$\n\nwhere \\(\\vec{L}\\) is in the direction of current flow. Magnitude: \\(F = BIL\\sin\\theta\\).\n\nFor a curved wire in a non-uniform field, integrate over infinitesimal segments:\n\n$$\\vec{F} = \\int I\\,d\\vec{\\ell}\\times\\vec{B}.$$\n\n**Current loop in a uniform field**: the net force is zero (forces on opposite sides cancel). But the torque is\n\n$$\\vec{\\tau} = \\vec{\\mu}\\times\\vec{B},$$\n\nwith the loop's **magnetic dipole moment** \\(\\vec{\\mu} = I\\vec{A}\\). \\(\\vec{A}\\) is the vector area (right-hand rule: curl fingers with current, thumb = \\(\\vec{A}\\)).\n\nPotential energy of the dipole: \\(U = -\\vec{\\mu}\\cdot\\vec{B}\\). Dipoles want to align with \\(\\vec{B}\\) (lower \\(U\\)) — that's why compass needles point north.\n\n**Motor principle**: current loop in a field feels a torque; if commutated cleverly, the torque keeps it rotating. This is the basis of all electric motors.\n\n**Parallel wires**: two parallel wires carrying currents \\(I_1, I_2\\) separated by distance \\(d\\) exert a force per unit length \\(F/L = \\mu_0 I_1 I_2/(2\\pi d)\\). Same direction currents attract; opposite repel.",
    keyIdeas: [
      "\\(\\vec{F} = I\\vec{L}\\times\\vec{B}\\); for curved wires, integrate.",
      "Loop in uniform field: net \\(F = 0\\), but torque \\(\\vec{\\tau} = \\vec{\\mu}\\times\\vec{B}\\).",
      "Dipole moment: \\(\\vec{\\mu} = I\\vec{A}\\); PE \\(U = -\\vec{\\mu}\\cdot\\vec{B}\\).",
      "Parallel wires: same-direction currents attract; opposite repel.",
    ],
    workedExample: {
      prompt:
        "A 0.5 m wire carrying 3 A sits perpendicular to a 0.2 T field. Find the force on the wire.",
      solution:
        "\\(F = BIL = 0.2\\cdot 3\\cdot 0.5 = 0.3\\,\\text{N}\\).",
    },
    commonMistakes: [
      "Forgetting the \\(\\sin\\theta\\) when wire isn't perpendicular to the field.",
      "Claiming a loop in a uniform field has net translational force (it doesn't).",
      "Getting the magnetic-moment direction wrong — right-hand rule with current.",
    ],
  },
  "4.3": {
    id: "4.3",
    title: "Magnetic Fields Due to Current-Carrying Wires and Other Symmetric Configurations",
    summary:
      "Infinite straight wire: \\(B = \\mu_0 I/(2\\pi r)\\). Circular loop on axis: \\(B_z = \\mu_0 I R^2/[2(z^2 + R^2)^{3/2}]\\). Solenoid interior: \\(B = \\mu_0 n I\\).",
    lesson:
      "Moving charges (currents) create magnetic fields. Standard results:\n\n**Infinite straight wire**, perpendicular distance \\(r\\):\n\n$$B = \\frac{\\mu_0 I}{2\\pi r}.$$\n\nField lines are concentric circles around the wire; right-hand rule: thumb along current, fingers curl in the direction of \\(\\vec{B}\\).\n\n**Circular loop** of radius \\(R\\) carrying \\(I\\), on the axis at distance \\(z\\):\n\n$$B_z = \\frac{\\mu_0 I R^2}{2(z^2 + R^2)^{3/2}}.$$\n\nAt center (\\(z = 0\\)): \\(B = \\mu_0 I/(2R)\\). Far away (\\(z\\gg R\\)): \\(B \\approx \\mu_0 I R^2/(2z^3)\\) — dipole far-field.\n\n**Ideal solenoid** (long, tightly wound with \\(n\\) turns per unit length) carrying \\(I\\):\n\n$$B_{\\text{inside}} = \\mu_0 n I,\\qquad B_{\\text{outside}}\\approx 0.$$\n\nField is uniform and along the axis inside; essentially vanishes outside.\n\n**Toroid** (solenoid bent into a donut) with \\(N\\) total turns, at radius \\(r\\) from the central axis: \\(B = \\mu_0 N I/(2\\pi r)\\) inside the toroid; zero outside.\n\nThese results come from the Biot-Savart law (for generic geometries) or Ampère's law (for cases with enough symmetry). See 4.4 for the derivations.",
    keyIdeas: [
      "Straight wire: \\(B = \\mu_0 I/(2\\pi r)\\).",
      "Loop center: \\(B = \\mu_0 I/(2R)\\); on axis: \\(B_z = \\mu_0 I R^2/[2(z^2+R^2)^{3/2}]\\).",
      "Solenoid: \\(B = \\mu_0 n I\\) inside, \\(\\approx 0\\) outside.",
      "Toroid: \\(B = \\mu_0 N I/(2\\pi r)\\) inside.",
    ],
    workedExample: {
      prompt:
        "A long straight wire carries \\(5\\,\\text{A}\\). Find the magnetic field at a perpendicular distance of 2 cm.",
      solution:
        "\\(B = \\mu_0 I/(2\\pi r) = (4\\pi\\times 10^{-7})(5)/(2\\pi\\cdot 0.02) = 5\\times 10^{-5}\\,\\text{T}\\).",
    },
    commonMistakes: [
      "Using the straight-wire formula for a finite wire without applying Biot-Savart.",
      "Forgetting that the solenoid formula assumes a very long, tightly wound coil.",
      "Missing the \\(R^2\\) numerator in the loop-axis formula.",
    ],
  },
  "4.4": {
    id: "4.4",
    title: "Biot-Savart Law and Ampère's Law",
    summary:
      "Biot-Savart: \\(d\\vec{B} = (\\mu_0/4\\pi) I\\,d\\vec{\\ell}\\times\\hat{r}/r^2\\). Ampère: \\(\\oint \\vec{B}\\cdot d\\vec{\\ell} = \\mu_0 I_{\\text{enc}}\\).",
    lesson:
      "Two fundamental laws for magnetostatics.\n\n**Biot-Savart law**: each current element \\(I\\,d\\vec{\\ell}\\) contributes\n\n$$d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,d\\vec{\\ell}\\times\\hat{r}}{r^2}$$\n\nto the field at a point displaced by \\(r\\hat{r}\\) from the element. Integrate over the whole circuit. Works for any geometry but integrals can be nasty.\n\nExample (infinite straight wire): set up coordinates with the wire along \\(z\\). A generic element at height \\(z'\\) contributes \\(dB\\) perpendicular to both \\(d\\vec{\\ell}\\) and \\(\\hat{r}\\); integrating from \\(-\\infty\\) to \\(\\infty\\) gives \\(B = \\mu_0 I/(2\\pi r)\\).\n\n**Ampère's law** (always true; practically useful with symmetry): the line integral of \\(\\vec{B}\\) around any closed loop equals \\(\\mu_0\\) times the enclosed current:\n\n$$\\oint \\vec{B}\\cdot d\\vec{\\ell} = \\mu_0 I_{\\text{enc}}.$$\n\nChoose an **Ampèrian loop** aligned with the symmetry of the problem. The enclosed current is the net flux of current through any surface bounded by the loop.\n\nCanonical Ampère applications:\n- **Infinite straight wire**: circular Ampèrian loop of radius \\(r\\). \\(B(2\\pi r) = \\mu_0 I\\), so \\(B = \\mu_0 I/(2\\pi r)\\).\n- **Long solenoid**: rectangular Ampèrian loop straddling the wall. \\(B L = \\mu_0 N I = \\mu_0 n L I\\), so \\(B = \\mu_0 n I\\) inside.\n- **Thick wire of uniform current density**: circular loop at \\(r\\). Inside (\\(r < R\\)): \\(B(2\\pi r) = \\mu_0 I (r/R)^2\\), so \\(B \\propto r\\). Outside: \\(B = \\mu_0 I/(2\\pi r)\\).\n- **Toroid**: circular Ampèrian loop of radius \\(r\\) inside, \\(B(2\\pi r) = \\mu_0 NI\\) ⇒ \\(B = \\mu_0 NI/(2\\pi r)\\).\n\nMaxwell later corrected Ampère by adding the displacement current (see 5.3) so it holds in time-varying situations: \\(\\oint \\vec{B}\\cdot d\\vec{\\ell} = \\mu_0(I_{\\text{enc}} + \\varepsilon_0 d\\Phi_E/dt)\\).",
    keyIdeas: [
      "Biot-Savart: \\(d\\vec{B} = (\\mu_0/4\\pi)I\\,d\\vec{\\ell}\\times\\hat{r}/r^2\\).",
      "Ampère: \\(\\oint \\vec{B}\\cdot d\\vec{\\ell} = \\mu_0 I_{\\text{enc}}\\).",
      "Ampère is the magnetic analog of Gauss: solve when symmetry makes \\(\\vec{B}\\) constant on the loop.",
      "Maxwell's correction: add \\(\\mu_0\\varepsilon_0 d\\Phi_E/dt\\) in time-varying cases.",
    ],
    workedExample: {
      prompt:
        "A long straight wire carries a uniformly distributed current \\(I\\) through its cross-section (radius \\(R\\)). Find \\(B(r)\\) for \\(r < R\\).",
      solution:
        "Ampèrian loop of radius \\(r\\). Enclosed fraction of current: \\(I_{\\text{enc}} = I(r/R)^2\\). \\(B(2\\pi r) = \\mu_0 I(r/R)^2\\), so \\(B = \\mu_0 I r/(2\\pi R^2)\\) inside. (Outside, recover \\(B = \\mu_0 I/(2\\pi r)\\).)",
    },
    commonMistakes: [
      "Including current outside the Ampèrian loop in \\(I_{\\text{enc}}\\).",
      "Applying Ampère without symmetry — the integral isn't solvable by inspection.",
      "Forgetting the cross product direction in Biot-Savart.",
    ],
  },

  // =========================================================================
  // UNIT 5 — ELECTROMAGNETISM
  // =========================================================================
  "5.1": {
    id: "5.1",
    title: "Electromagnetic Induction (Faraday's Law and Lenz's Law)",
    summary:
      "Faraday: \\(\\varepsilon = -d\\Phi_B/dt\\). Lenz: the induced current opposes the change in flux. Motional EMF: \\(\\varepsilon = BLv\\).",
    lesson:
      "**Magnetic flux** through a loop:\n\n$$\\Phi_B = \\int \\vec{B}\\cdot d\\vec{A},$$\n\nwhich simplifies to \\(\\Phi_B = BA\\cos\\theta\\) for uniform \\(\\vec{B}\\) through a flat loop at angle \\(\\theta\\) to the normal. Units: weber (Wb) = T·m².\n\n**Faraday's law**: a changing magnetic flux through a loop induces an EMF:\n\n$$\\varepsilon = -\\frac{d\\Phi_B}{dt}.$$\n\nFor a coil of \\(N\\) turns: \\(\\varepsilon = -N\\,d\\Phi_B/dt\\) (each turn adds its flux change).\n\nThree ways to change flux:\n1. Change \\(\\vec{B}\\) (moving magnet, switching current in a nearby coil).\n2. Change area \\(A\\) (sliding rod in a magnetic field, expanding loop).\n3. Change orientation \\(\\theta\\) (rotating loop — the basis of generators: \\(\\varepsilon = NBA\\omega\\sin(\\omega t)\\)).\n\n**Lenz's law**: the induced current flows in whichever direction its own magnetic field opposes the change in flux. If flux is increasing, induced \\(\\vec{B}\\) inside the loop opposes the applied change; if decreasing, it reinforces it. This is the physical meaning of the minus sign in Faraday's law, and it ensures energy conservation (without it, induction could create free energy).\n\n**Motional EMF**: a rod of length \\(L\\) sliding at speed \\(v\\) perpendicular to a uniform field \\(B\\):\n\n$$\\varepsilon = BLv.$$\n\nInterpretation: free charges in the rod feel \\(qvB\\); they pile up at the ends until the resulting electric field balances the magnetic force. The potential difference across the rod equals \\(BLv\\).\n\n**Power**: the force required to push the rod at steady speed equals \\(F = BIL\\); the mechanical power \\(Fv = B^2 L^2 v^2/R\\) exactly matches the electrical power dissipated in the resistor — energy conservation in action.",
    keyIdeas: [
      "\\(\\Phi_B = \\int \\vec{B}\\cdot d\\vec{A}\\); \\(\\varepsilon = -d\\Phi_B/dt\\).",
      "Coil of \\(N\\) turns: \\(\\varepsilon = -N\\,d\\Phi_B/dt\\).",
      "Lenz: induced current opposes flux change.",
      "Motional EMF: \\(\\varepsilon = BLv\\).",
    ],
    workedExample: {
      prompt:
        "A 0.01 m² loop lies in a 0.2 T field perpendicular to the loop. If \\(B\\) drops linearly to zero in 0.5 s, find the induced EMF.",
      solution:
        "\\(\\Delta \\Phi = -0.2\\cdot 0.01 = -0.002\\,\\text{Wb}\\). \\(|\\varepsilon| = |\\Delta\\Phi/\\Delta t| = 0.002/0.5 = 4\\,\\text{mV}\\). By Lenz, the induced current flows in the direction whose own field tries to preserve the original (outward) flux.",
    },
    commonMistakes: [
      "Getting the sign wrong in Faraday's law.",
      "Using \\(\\Phi = BA\\) when the loop isn't perpendicular to the field.",
      "Applying Lenz to voltage instead of current direction.",
    ],
  },
  "5.2": {
    id: "5.2",
    title: "Inductance, Including LR and LC Circuits",
    summary:
      "Inductor: \\(V_L = L\\,dI/dt\\). LR circuit grows/decays with \\(\\tau = L/R\\). LC circuit oscillates at \\(\\omega = 1/\\sqrt{LC}\\).",
    lesson:
      "A coil stores energy in its magnetic field. Its **self-inductance** \\(L\\) is defined by\n\n$$\\varepsilon_L = -L\\frac{dI}{dt},$$\n\nwhich is Faraday's law applied to the coil's own flux (proportional to \\(I\\)). The minus sign enforces Lenz: the induced EMF opposes changes in current. Units: henry (H) = V·s/A. For a solenoid of \\(N\\) turns, length \\(\\ell\\), and cross-section \\(A\\): \\(L = \\mu_0 N^2 A/\\ell\\).\n\n**Energy stored** in an inductor: integrating \\(P = IV_L\\) during current buildup,\n\n$$U_L = \\tfrac{1}{2}LI^2.$$\n\nAnalogous to \\(\\tfrac{1}{2}CV^2\\). Energy density in the magnetic field: \\(u_B = B^2/(2\\mu_0)\\).\n\n**LR circuit** (EMF \\(\\varepsilon\\), resistor \\(R\\), inductor \\(L\\) in series): Kirchhoff's loop rule gives\n\n$$L\\frac{dI}{dt} + IR = \\varepsilon.$$\n\nSolution with \\(I(0) = 0\\):\n\n$$I(t) = \\frac{\\varepsilon}{R}\\left(1 - e^{-t/\\tau}\\right),\\quad \\tau = L/R.$$\n\nDecay (battery shorted): \\(I(t) = I_0 e^{-t/\\tau}\\).\n\n**LC circuit** (inductor and capacitor): Kirchhoff's loop rule with \\(V_C = Q/C\\) and \\(I = dQ/dt\\):\n\n$$L\\ddot{Q} + \\frac{Q}{C} = 0,\\quad \\ddot{Q} + \\omega^2 Q = 0,\\quad \\omega = \\frac{1}{\\sqrt{LC}}.$$\n\nSolution: \\(Q(t) = Q_0\\cos(\\omega t + \\phi)\\) — the charge oscillates sinusoidally with angular frequency \\(\\omega\\). This is the electrical analog of SHM: capacitor is the \"spring,\" inductor the \"mass.\"\n\nEnergy bounces between \\(U_C = Q^2/(2C)\\) and \\(U_L = \\tfrac{1}{2}LI^2\\); total is constant. Period \\(T = 2\\pi\\sqrt{LC}\\).\n\n**Current** in an inductor cannot change instantaneously (analogous to voltage across a capacitor). That's the **initial condition** for LR switch-on: \\(I_L(0^+) = I_L(0^-) = 0\\) (if uncharged).",
    keyIdeas: [
      "Inductor EMF: \\(V_L = L\\,dI/dt\\); energy \\(U_L = \\tfrac{1}{2}LI^2\\).",
      "LR time constant: \\(\\tau = L/R\\).",
      "LC angular frequency: \\(\\omega = 1/\\sqrt{LC}\\); \\(T = 2\\pi\\sqrt{LC}\\).",
      "Inductor current can't jump; capacitor voltage can't jump.",
    ],
    workedExample: {
      prompt:
        "A 0.5 H inductor and a \\(2\\,\\mu\\text{F}\\) capacitor form an LC circuit. Find the oscillation frequency.",
      solution:
        "\\(\\omega = 1/\\sqrt{LC} = 1/\\sqrt{0.5\\cdot 2\\times 10^{-6}} = 1000\\,\\text{rad/s}\\). \\(f = \\omega/(2\\pi) \\approx 159\\,\\text{Hz}\\).",
    },
    commonMistakes: [
      "Dropping the minus sign in \\(\\varepsilon_L = -L\\,dI/dt\\) and getting polarity backwards.",
      "Treating inductor current as able to change instantaneously (it can't).",
      "Confusing LC angular frequency \\(1/\\sqrt{LC}\\) with RC time constant \\(RC\\).",
    ],
  },
  "5.3": {
    id: "5.3",
    title: "Maxwell's Equations",
    summary:
      "The four Maxwell equations unify electromagnetism and predict EM waves propagating at \\(c = 1/\\sqrt{\\mu_0\\varepsilon_0}\\).",
    lesson:
      "The four **Maxwell's equations** summarize classical electromagnetism:\n\n$$\\oint \\vec{E}\\cdot d\\vec{A} = \\frac{Q_{\\text{enc}}}{\\varepsilon_0}\\quad \\text{(Gauss for electricity)}$$\n\n$$\\oint \\vec{B}\\cdot d\\vec{A} = 0\\quad \\text{(Gauss for magnetism — no monopoles)}$$\n\n$$\\oint \\vec{E}\\cdot d\\vec{\\ell} = -\\frac{d\\Phi_B}{dt}\\quad \\text{(Faraday)}$$\n\n$$\\oint \\vec{B}\\cdot d\\vec{\\ell} = \\mu_0 I_{\\text{enc}} + \\mu_0\\varepsilon_0\\frac{d\\Phi_E}{dt}\\quad \\text{(Ampère-Maxwell)}$$\n\n**Maxwell's correction** to Ampère was the addition of the **displacement current** term \\(\\mu_0\\varepsilon_0 d\\Phi_E/dt\\). Without it, Ampère's law fails for, e.g., the space between charging capacitor plates (real current zero, but magnetic field nonzero). With it, Ampère is exact, and the four equations become self-consistent in time-varying situations.\n\n**Consequence**: in vacuum (no charges, no currents), the equations reduce to wave equations for \\(\\vec{E}\\) and \\(\\vec{B}\\), propagating at\n\n$$c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}}\\approx 3\\times 10^8\\,\\text{m/s}.$$\n\nMaxwell computed this speed from the measured values of \\(\\mu_0\\) and \\(\\varepsilon_0\\) and identified \\(c\\) with the speed of light — unifying optics with electromagnetism.\n\n**EM waves**: \\(\\vec{E}\\perp\\vec{B}\\perp\\) direction of propagation. In phase; \\(E/B = c\\). Carry energy with Poynting vector \\(\\vec{S} = \\vec{E}\\times\\vec{B}/\\mu_0\\), and momentum — they exert radiation pressure.\n\nThe full EM spectrum (radio through gamma) consists of the same kind of wave differing only in frequency and wavelength. All travel at \\(c\\) in vacuum; in media, at \\(c/n\\).\n\nIn AP C, you should be able to state the four equations, identify which one describes each phenomenon (Gauss for charge configurations, Ampère-Maxwell for solenoids and capacitor gaps, Faraday for induction), and explain the displacement-current correction.",
    keyIdeas: [
      "Four Maxwell equations: Gauss (E), Gauss (B, no monopoles), Faraday, Ampère-Maxwell.",
      "Displacement current \\(\\mu_0\\varepsilon_0 d\\Phi_E/dt\\) completes Ampère.",
      "Vacuum wave speed: \\(c = 1/\\sqrt{\\mu_0\\varepsilon_0}\\).",
      "EM waves: \\(\\vec{E}\\perp\\vec{B}\\perp \\vec{v}\\); \\(E/B = c\\).",
    ],
    workedExample: {
      prompt:
        "During charging of a parallel-plate capacitor, the electric field between the plates grows at \\(dE/dt = 10^{12}\\,\\text{V/(m·s)}\\). If the plate area is 0.01 m², find the displacement current between the plates.",
      solution:
        "\\(I_d = \\varepsilon_0 A\\,dE/dt = 8.85\\times 10^{-12}\\cdot 0.01\\cdot 10^{12} \\approx 0.0885\\,\\text{A}\\).",
    },
    commonMistakes: [
      "Forgetting the displacement-current term in time-varying problems.",
      "Writing \"Gauss's law for magnetism\" with a nonzero right side (there's no monopole).",
      "Claiming EM waves need a medium — they propagate freely in vacuum.",
    ],
  },
};
