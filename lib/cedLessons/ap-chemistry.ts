import type { CourseCedLessons } from "./types";

/**
 * AP Chemistry CED lessons — every topic from Units 1–9 of the 2024-25 CED.
 * Written to match the rest of the catalog: direct, calculation-ready, and
 * aligned to the MCQ/FRQ framing students will see on the AP exam.
 */

export const AP_CHEMISTRY_CED_LESSONS: CourseCedLessons = {
  // =========================================================================
  // UNIT 1 — ATOMIC STRUCTURE AND PROPERTIES
  // =========================================================================
  "1.1": {
    id: "1.1",
    title: "Moles and Molar Mass",
    summary:
      "A mole is \\(6.022 \\times 10^{23}\\) particles, and molar mass (g/mol) converts between moles and grams — the cornerstone of every stoichiometry problem.",
    lesson:
      "One mole contains Avogadro's number, \\(N_A = 6.022 \\times 10^{23}\\), particles (atoms, molecules, ions, or electrons). Molar mass is the mass of one mole of a substance in grams per mole; numerically it equals the element's atomic mass in amu or the sum of atomic masses in a compound.\n\nEvery conversion you'll do uses one of three bridges: mass \\(\\leftrightarrow\\) moles via molar mass, moles \\(\\leftrightarrow\\) particles via \\(N_A\\), and moles \\(\\leftrightarrow\\) volume (for a gas at STP) via 22.4 L/mol. Train yourself to write units along with every number and cancel them; that alone catches most errors.\n\nOn the FRQ, showing the full chain — given amount, molar mass, conversion, final answer with units and significant figures — is what earns the points. Never skip the units line.",
    keyIdeas: [
      "\\(1\\text{ mol} = 6.022 \\times 10^{23}\\) particles.",
      "Molar mass in g/mol equals the atomic (or formula) mass in amu.",
      "Three bridges: mass ↔ moles, moles ↔ particles, moles ↔ gas volume.",
      "Always carry units through every calculation.",
    ],
    workedExample: {
      prompt: "How many atoms are in 12.0 g of carbon-12?",
      solution:
        "12.0 g ÷ 12.0 g/mol = 1.00 mol C. 1.00 mol × \\(6.022 \\times 10^{23}\\) atoms/mol = \\(6.022 \\times 10^{23}\\) atoms.",
    },
    commonMistakes: [
      "Forgetting to divide (or multiply) by molar mass when converting between mass and moles.",
      "Using 22.4 L/mol at non-STP conditions — it only holds at 0 °C and 1 atm.",
      "Mixing up particles (atoms vs. molecules) when a compound has more than one of a given atom.",
    ],
  },
  "1.2": {
    id: "1.2",
    title: "Mass Spectroscopy of Elements",
    summary:
      "A mass spectrum shows each isotope's mass and relative abundance; the weighted average gives atomic mass.",
    lesson:
      "Mass spectrometry ionizes atoms, accelerates them through a magnetic field, and sorts ions by mass-to-charge ratio. The output is a spectrum with peaks at isotopic masses; peak height is proportional to abundance.\n\nCalculate average atomic mass by taking a weighted average: sum of (isotope mass × fractional abundance) across all isotopes. This is the number that appears on the periodic table. The spectrum also reveals relative abundance patterns used in identifying samples (chlorine has a distinctive 3:1 ratio at m/z 35 and 37).",
    keyIdeas: [
      "Peaks at isotope mass; peak heights give relative abundances.",
      "Average atomic mass = Σ(isotope mass × fraction).",
      "Heavier isotopes curve less in the magnetic field.",
      "Spectra fingerprint elements by isotope pattern.",
    ],
    workedExample: {
      prompt:
        "Cl-35 (34.97 amu) has 75.8% abundance; Cl-37 (36.97 amu) has 24.2%. Find the average atomic mass.",
      solution:
        "(0.758)(34.97) + (0.242)(36.97) = 26.51 + 8.95 = 35.46 amu — matches the periodic-table value.",
    },
    commonMistakes: [
      "Using percent abundance as-is instead of converting to a decimal fraction.",
      "Averaging isotope masses without weighting by abundance.",
      "Forgetting that the x-axis is m/z (mass-to-charge), not just mass.",
    ],
  },
  "1.3": {
    id: "1.3",
    title: "Elemental Composition of Pure Substances",
    summary:
      "Percent composition and empirical formulas tell you the ratio of atoms in a compound; molecular formula requires additional molar mass data.",
    lesson:
      "Percent composition: mass of each element ÷ total mass × 100. An empirical formula is the simplest whole-number ratio of atoms. Determine it by assuming 100 g of sample, converting each element's mass to moles, then dividing all mole values by the smallest to get whole-number ratios.\n\nMolecular formula = empirical formula × integer. That integer equals the ratio of actual molar mass to empirical-formula molar mass. Combustion analysis is the classic experimental setup: burn a CHO compound, measure CO₂ and H₂O produced, back out moles of C and H, and get O by difference.",
    keyIdeas: [
      "% composition = (mass of element / total mass) × 100.",
      "Empirical formula: divide moles by the smallest.",
      "Molecular formula = empirical × (molar mass / empirical mass).",
      "In combustion analysis, mass of O is usually found by subtracting C + H from the total.",
    ],
    workedExample: {
      prompt:
        "A compound is 40.0% C, 6.7% H, 53.3% O by mass. Find the empirical formula.",
      solution:
        "Assume 100 g: 40.0 g C / 12.01 = 3.33 mol; 6.7 g H / 1.008 = 6.65 mol; 53.3 g O / 16.00 = 3.33 mol. Divide by smallest (3.33): C = 1, H = 2, O = 1. Empirical formula = CH₂O.",
    },
    commonMistakes: [
      "Rounding moles too early — keep extra digits through the division.",
      "Skipping the \"divide by smallest\" step and reporting non-integer subscripts.",
      "Not multiplying up when the ratios come out to 1:1.5 (×2 to get 2:3).",
    ],
  },
  "1.4": {
    id: "1.4",
    title: "Composition of Mixtures",
    summary:
      "Unlike pure substances, mixtures vary in composition — separating them reveals the mass of each component.",
    lesson:
      "Mixtures contain two or more substances in variable ratios; pure substances have fixed ratios. Heterogeneous mixtures have visibly distinct phases (salad, granite); homogeneous mixtures (solutions) are uniform at the molecular level (saltwater, air, alloys).\n\nTo quantify mixtures, separate them physically (filtration, distillation, chromatography) and mass each component. Mass percent of a component = (mass of component / total mixture mass) × 100. Composition problems often chain into stoichiometry: determine moles of the reactive component, then use a balanced equation.",
    keyIdeas: [
      "Mixtures have variable composition; compounds have fixed composition.",
      "Homogeneous = one phase; heterogeneous = multiple phases.",
      "Mass percent of a component = component mass / total mass × 100.",
      "Separation methods rely on physical differences (boiling point, polarity, particle size).",
    ],
    commonMistakes: [
      "Calling saltwater a compound — it is a homogeneous mixture (solution).",
      "Using stoichiometry on the whole mixture rather than just the reactive component.",
      "Forgetting units in mass percent reporting.",
    ],
  },
  "1.5": {
    id: "1.5",
    title: "Atomic Structure and Electron Configuration",
    summary:
      "Electrons occupy orbitals in order of increasing energy; configurations follow Aufbau, Pauli exclusion, and Hund's rule.",
    lesson:
      "An atom's nucleus holds protons (+) and neutrons (0); electrons fill orbitals around it. The four quantum numbers describe each electron's location and spin. Orbitals fill in order of energy — 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p — by Aufbau's principle. Pauli exclusion says no two electrons share all four quantum numbers, which limits each orbital to 2 electrons of opposite spin. Hund's rule says degenerate orbitals fill singly (parallel spins) before pairing.\n\nWrite full (1s²2s²2p⁶…) or noble-gas shorthand ([Ne]3s²3p⁴). Exceptions: Cr and Cu promote one 4s electron to 3d for a half-filled or full d subshell, which is energetically favored. Cations lose electrons from the highest n first (so Fe²⁺ loses 4s before 3d, giving [Ar]3d⁶). Anions gain electrons into the next available orbital.",
    keyIdeas: [
      "Orbital filling order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p…",
      "Pauli exclusion limits each orbital to 2 opposite-spin electrons.",
      "Hund's rule: fill degenerate orbitals singly before pairing.",
      "Cr and Cu promote a 4s electron to 3d; cations lose from highest n first.",
    ],
    workedExample: {
      prompt: "Write the electron configuration for Fe²⁺.",
      solution:
        "Neutral Fe: [Ar]4s²3d⁶. Remove 2 electrons from 4s first (highest n): Fe²⁺ = [Ar]3d⁶.",
    },
    commonMistakes: [
      "Losing 3d electrons before 4s in transition-metal cations.",
      "Forgetting the Cr and Cu exceptions.",
      "Mixing up orbital filling order when 4s and 3d are close in energy.",
    ],
  },
  "1.6": {
    id: "1.6",
    title: "Photoelectron Spectroscopy",
    summary:
      "PES measures the energy needed to remove electrons from specific orbitals, revealing electron configurations directly.",
    lesson:
      "Photoelectron spectroscopy (PES) ejects electrons using high-energy photons and measures the kinetic energy of each ejected electron. Binding energy = photon energy − kinetic energy. Each peak on a PES spectrum corresponds to a specific subshell; peak position gives binding energy, and peak height (or area) gives the number of electrons in that subshell.\n\nCore electrons (1s, 2s) are tightly bound and appear at high binding energy; valence electrons (outer s and p) are weakly bound and appear at low binding energy. PES data directly confirms electron configurations — a 2:2:6 height ratio on three peaks between, say, 100 and 10 MJ/mol, matches 1s²2s²2p⁶.",
    keyIdeas: [
      "PES peak position = binding energy; peak area ∝ number of electrons.",
      "Core electrons: high binding energy. Valence electrons: low binding energy.",
      "Binding energy increases with nuclear charge and decreasing shell size.",
      "PES directly verifies electron configurations experimentally.",
    ],
    workedExample: {
      prompt:
        "A PES spectrum for an element shows peaks (high → low) with relative heights 2 : 2 : 6 : 2 : 2. Identify the element.",
      solution:
        "Total electrons = 2 + 2 + 6 + 2 + 2 = 14. Configuration 1s²2s²2p⁶3s²3p²: the element is silicon (Si, Z = 14).",
    },
    commonMistakes: [
      "Reading the x-axis backwards — binding energy typically increases leftward on CollegeBoard spectra.",
      "Confusing peak height with absolute (rather than relative) counts.",
      "Missing that core-level peak positions reflect Z_eff, not just n.",
    ],
  },
  "1.7": {
    id: "1.7",
    title: "Periodic Trends",
    summary:
      "Atomic radius, ionization energy, electron affinity, and electronegativity trend predictably because of Coulombic attraction and shielding.",
    lesson:
      "Moving across a period, effective nuclear charge (Z_eff) increases while the shell stays the same, pulling electrons closer: atomic radius decreases, ionization energy increases, electronegativity increases. Moving down a group, an additional shell is added: radius increases, ionization energy decreases, electronegativity decreases.\n\nCations are smaller than their neutral atoms (fewer electron-electron repulsions + same nuclear charge); anions are larger. Ionic radii of isoelectronic species decrease as nuclear charge increases (O²⁻ > F⁻ > Na⁺ > Mg²⁺). Successive ionization energies jump dramatically when a core electron is removed — evidence of electron shells.",
    keyIdeas: [
      "Across period: radius ↓, IE ↑, EN ↑. Down group: radius ↑, IE ↓, EN ↓.",
      "Cations shrink; anions expand.",
      "Isoelectronic ions: higher Z = smaller radius.",
      "Big IE jumps between successive ionizations mark shell boundaries.",
    ],
    commonMistakes: [
      "Applying electronegativity to noble gases — values aren't defined for most.",
      "Ignoring shielding when explaining why IE drops down a group.",
      "Treating atomic radius as fixed — it depends on whether you mean covalent, metallic, or van der Waals.",
    ],
  },
  "1.8": {
    id: "1.8",
    title: "Valence Electrons and Ionic Compounds",
    summary:
      "Valence electrons determine bonding behavior; metals lose them, nonmetals gain them, and the resulting ions pair to form neutral ionic compounds.",
    lesson:
      "Valence electrons are the outermost s and p electrons (and sometimes d for transition metals). Group number predicts valence electron count: group 1 has 1, group 17 has 7. Octet rule: atoms tend to gain, lose, or share electrons to achieve 8 valence electrons (like a noble gas).\n\nMetals (low IE) lose electrons to form cations; nonmetals (high electron affinity) gain electrons to form anions. An ionic compound must be electrically neutral: criss-cross charges to get subscripts (Al³⁺ and O²⁻ → Al₂O₃). Polyatomic ions keep their identity as units (NH₄⁺, SO₄²⁻, PO₄³⁻).",
    keyIdeas: [
      "Group number gives valence electron count for main-group elements.",
      "Metals lose → cations; nonmetals gain → anions.",
      "Ionic formulas are neutral; criss-cross charges give subscripts.",
      "Polyatomic ions stay intact in formulas.",
    ],
    commonMistakes: [
      "Including core electrons in valence counts.",
      "Forgetting to simplify subscripts (e.g., Ca₂O₂ should be CaO).",
      "Losing track of charges when writing formulas for transition-metal compounds.",
    ],
  },

  // =========================================================================
  // UNIT 2 — MOLECULAR AND IONIC COMPOUND STRUCTURE AND PROPERTIES
  // =========================================================================
  "2.1": {
    id: "2.1",
    title: "Types of Chemical Bonds",
    summary:
      "Ionic, covalent, and metallic bonds differ in how electrons are arranged, and electronegativity difference predicts which you'll see.",
    lesson:
      "Ionic bonds transfer electrons from metal to nonmetal, producing a lattice of cations and anions held together by Coulombic attraction. Covalent bonds share electrons between nonmetals; sharing can be equal (nonpolar) or unequal (polar) depending on electronegativity difference. Metallic bonds pool valence electrons into a \"sea\" that flows around fixed metal cations, producing conductivity and malleability.\n\nRule of thumb by ΔEN (Pauling): ΔEN > 1.7 ≈ ionic; 0.4 < ΔEN < 1.7 ≈ polar covalent; ΔEN < 0.4 ≈ nonpolar covalent. Metallic bonding applies within metals and alloys. These are tendencies, not strict cutoffs — always reason from structure and properties on the FRQ.",
    keyIdeas: [
      "Ionic = electron transfer (metal + nonmetal); lattice of +/− ions.",
      "Covalent = electron sharing (nonmetals); polar if ΔEN is moderate.",
      "Metallic = delocalized \"sea\" of valence electrons around cations.",
      "ΔEN predicts bond type on a continuum, not as hard categories.",
    ],
    commonMistakes: [
      "Drawing ionic bonds as shared pairs — they are transferred.",
      "Calling any bond between different elements \"ionic.\" ΔEN matters.",
      "Forgetting metallic bonding explains conductivity and malleability.",
    ],
  },
  "2.2": {
    id: "2.2",
    title: "Intramolecular Force and Potential Energy",
    summary:
      "A potential-energy curve shows how atom-atom distance sets bond length and bond energy — the dip's depth measures bond strength.",
    lesson:
      "Plot potential energy vs. internuclear distance for two bonded atoms. At short distances the curve rises steeply (electron-electron + nuclear repulsion). At long distances the curve flattens to zero (no interaction). The minimum is the bond length (equilibrium distance); its depth below zero is the bond energy.\n\nBond strength increases with bond order (triple > double > single) and decreases as atoms get larger (weaker overlap). Shorter bonds are generally stronger. You'll use this curve to explain why breaking bonds requires energy input and forming bonds releases energy — the core of chemistry's energetics.",
    keyIdeas: [
      "Minimum of PE curve = bond length; depth below zero = bond energy.",
      "Triple > double > single in strength and shortness.",
      "Bond breaking is endothermic; bond forming is exothermic.",
      "Smaller atoms form shorter, stronger bonds (within a family).",
    ],
    commonMistakes: [
      "Reading bond length from the y-axis — it is on the x-axis.",
      "Confusing bond energy (positive to break) with PE of the bond (negative at minimum).",
      "Comparing bond strengths across different atomic pairs without considering size and overlap.",
    ],
  },
  "2.3": {
    id: "2.3",
    title: "Structure of Ionic Solids",
    summary:
      "Ionic solids form 3D lattices with high melting points, brittle behavior, and conduction only when melted or dissolved.",
    lesson:
      "Ionic compounds pack cations and anions into a regular 3D lattice that maximizes +/− attractions and minimizes +/+ and −/− repulsions. This produces high melting points (a lot of Coulombic energy to break), hardness, and brittleness (shifting the lattice brings like charges together, shattering it).\n\nLattice energy scales with ion charge and inversely with ion size: lattice energy ∝ (q₁q₂)/r. MgO (2+/2−, small) has a much higher lattice energy than NaCl (1+/1−, larger) — and a much higher melting point. Ionic solids don't conduct when solid (ions locked in place) but do conduct when melted or dissolved (ions free to move).",
    keyIdeas: [
      "Lattice energy ∝ (q₁q₂)/r: higher charges and smaller ions → stronger lattice.",
      "High melting points, hard but brittle.",
      "Conducts only when melted or dissolved.",
      "Shifting the lattice brings like charges into contact and fractures it.",
    ],
    workedExample: {
      prompt:
        "Rank NaCl, MgO, and KBr by expected melting point, highest to lowest.",
      solution:
        "MgO (2+/2−, both small) has the largest (q₁q₂)/r, so highest mp. NaCl (1+/1−, small ions) comes next. KBr (1+/1−, larger K⁺ and Br⁻) has the lowest. Order: MgO > NaCl > KBr.",
    },
    commonMistakes: [
      "Calling ionic solids \"molecular\" — they are extended lattices, not discrete molecules.",
      "Forgetting ion size matters alongside charge in lattice energy.",
      "Saying ionic solids always conduct — they don't, until melted or dissolved.",
    ],
  },
  "2.4": {
    id: "2.4",
    title: "Structure of Metals and Alloys",
    summary:
      "Metallic bonding — a lattice of cations in a sea of delocalized electrons — explains luster, conductivity, malleability, and alloy behavior.",
    lesson:
      "Metals arrange as close-packed cations surrounded by a delocalized sea of valence electrons. The electrons can move freely, producing thermal and electrical conductivity. The lattice can deform without breaking bonds (the sea reshuffles), giving malleability and ductility.\n\nAlloys mix two or more metals. Substitutional alloys replace some atoms in the host lattice with atoms of similar size (brass = Cu + Zn). Interstitial alloys insert smaller atoms into gaps (steel = Fe with C in the interstices, which pin dislocations and make steel stronger and harder). Alloy properties are tunable by composition — the reason engineers pick specific stainless steels for specific jobs.",
    keyIdeas: [
      "Metallic bonding: cations + delocalized electron sea.",
      "Conductivity from mobile electrons; malleability from lattice reshuffling.",
      "Substitutional alloy: similar-size replacement. Interstitial alloy: smaller atom in gaps.",
      "Alloys can be stronger, harder, or more corrosion-resistant than pure metals.",
    ],
    commonMistakes: [
      "Picturing metals as having localized covalent bonds — electrons are delocalized.",
      "Confusing substitutional and interstitial alloys.",
      "Forgetting that alloy composition is tunable and that's the point.",
    ],
  },
  "2.5": {
    id: "2.5",
    title: "Lewis Diagrams",
    summary:
      "Lewis structures place valence electrons on atoms and bonds, showing bonding and lone pairs at a glance.",
    lesson:
      "Procedure: (1) Count total valence electrons. For a charged species, add electrons for each negative charge and subtract for each positive. (2) Place the least electronegative atom (not H) in the center. (3) Connect atoms with single bonds; each bond uses 2 electrons. (4) Fill lone pairs around outer atoms first to complete their octets. (5) Give the remaining electrons to the central atom. (6) If the central atom lacks an octet, convert lone pairs from outer atoms into double or triple bonds.\n\nExceptions: H gets 2 electrons only. B and Be are often electron-deficient (<8). Atoms from period 3+ can have expanded octets (PF₅, SF₆) using d-orbitals — though modern theory prefers to describe these without d-orbital participation.",
    keyIdeas: [
      "Step 1: total valence electrons (add/subtract for charge).",
      "Central atom = least electronegative (never H).",
      "Complete octets on outer atoms, then central; convert lone pairs to double/triple bonds if needed.",
      "H = 2; B/Be can be <8; period 3+ can expand octets.",
    ],
    workedExample: {
      prompt: "Draw the Lewis structure of CO₂.",
      solution:
        "Valence electrons: 4 + 2(6) = 16. C in center, O on each side. Single bonds first (4 e⁻ used), complete O octets with lone pairs (12 e⁻ used), total 16 — but C has only 4. Convert one lone pair from each O into a double bond to C. Final: O=C=O with two lone pairs on each O; C has full octet, O atoms have full octets. Total 16 electrons. Linear structure.",
    },
    commonMistakes: [
      "Miscounting valence electrons, especially for charged species.",
      "Putting H in the center.",
      "Leaving the central atom with an incomplete octet when multiple bonds would fix it.",
    ],
  },
  "2.6": {
    id: "2.6",
    title: "Resonance and Formal Charge",
    summary:
      "Resonance averages multiple valid Lewis structures; formal charge identifies the most reasonable one.",
    lesson:
      "When a molecule or ion has multiple equivalent Lewis structures differing only in placement of double bonds or lone pairs, the real structure is a resonance hybrid — a weighted average. All bonds involved in resonance are equivalent and have bond lengths between single and double (e.g., all three N-O bonds in NO₃⁻ are identical).\n\nFormal charge = (valence electrons) − (lone pair electrons) − ½(bonding electrons). The best Lewis structure minimizes formal charges, keeps any negative formal charge on the more electronegative atom, and has formal charges that sum to the overall charge on the species. Use formal charges to pick between non-equivalent resonance structures.",
    keyIdeas: [
      "Resonance = one real structure averaged over equivalent Lewis forms.",
      "Bonds in a resonance-involved region have equal length (between single/double).",
      "Formal charge = V − LP − ½(bonding e⁻).",
      "Best structure: minimize FC; negative FC goes on more electronegative atom.",
    ],
    workedExample: {
      prompt: "Assign formal charges in the nitrate ion, NO₃⁻ (one double-bonded O).",
      solution:
        "N: V = 5, LP = 0, bonding = 8 (one double, two single). FC = 5 − 0 − 4 = +1. Double-bonded O: V = 6, LP = 4, bonding = 4. FC = 6 − 4 − 2 = 0. Each single-bonded O: V = 6, LP = 6, bonding = 2. FC = 6 − 6 − 1 = −1. Check: (+1) + 0 + (−1) + (−1) = −1 ✓.",
    },
    commonMistakes: [
      "Treating resonance structures as \"real\" — the hybrid is what exists.",
      "Miscounting bonding vs. lone-pair electrons in formal charge.",
      "Choosing a resonance structure that puts negative formal charge on a less electronegative atom.",
    ],
  },
  "2.7": {
    id: "2.7",
    title: "VSEPR and Bond Hybridization",
    summary:
      "Electron-pair repulsion predicts molecular shape; hybridization explains how atomic orbitals mix to form bonds.",
    lesson:
      "VSEPR (Valence Shell Electron Pair Repulsion) says electron domains (bonds and lone pairs) around a central atom arrange to minimize repulsion. Count domains, apply geometry:\n\n- 2 domains → linear (180°)\n- 3 → trigonal planar (120°)\n- 4 → tetrahedral (109.5°)\n- 5 → trigonal bipyramidal (90°/120°)\n- 6 → octahedral (90°)\n\nLone pairs occupy more space than bonds, compressing bond angles (water's H-O-H is 104.5°, not 109.5°). Molecular shape names bonding positions only; ignore lone pairs when naming (NH₃ is trigonal pyramidal; H₂O is bent).\n\nHybridization matches electron-domain count: 2 = sp, 3 = sp², 4 = sp³, 5 = sp³d (historical), 6 = sp³d² (historical). Double and triple bonds include one σ bond (head-on overlap) plus π bonds (sideways overlap); π bonds restrict rotation.",
    keyIdeas: [
      "Electron domains = bonds (any order) + lone pairs around central atom.",
      "Lone pairs compress bond angles compared to ideal.",
      "sp/sp²/sp³ match 2/3/4 domains; σ = head-on, π = sideways overlap.",
      "Molecular shape is named by bonded atoms, not total domains.",
    ],
    workedExample: {
      prompt: "Predict the geometry and hybridization of the central atom in NH₃.",
      solution:
        "N has 4 electron domains: 3 N-H bonds + 1 lone pair. Electron geometry = tetrahedral; molecular geometry = trigonal pyramidal (lone pair on top). Bond angles ≈ 107° (compressed by lone pair from 109.5°). Hybridization: sp³.",
    },
    commonMistakes: [
      "Naming molecular shape based on total domains instead of bonded atoms only.",
      "Forgetting that a double bond counts as ONE electron domain.",
      "Ignoring how lone pairs shift bond angles below ideal.",
    ],
  },

  // =========================================================================
  // UNIT 3 — INTERMOLECULAR FORCES AND PROPERTIES
  // =========================================================================
  "3.1": {
    id: "3.1",
    title: "Intermolecular Forces",
    summary:
      "London dispersion, dipole-dipole, and hydrogen bonding hold molecules together — weaker than covalent bonds but decisive for phase behavior.",
    lesson:
      "IMFs are attractions between molecules, much weaker than intramolecular bonds. Types, weakest to strongest:\n\n- London dispersion (LDF): instantaneous induced dipoles in any molecule; stronger for larger, more polarizable electron clouds. The only IMF for nonpolar molecules.\n- Dipole-dipole: permanent dipoles in polar molecules align.\n- Hydrogen bonding: a special strong dipole-dipole when H is bonded to N, O, or F and sees a lone pair on another N, O, or F.\n- Ion-dipole: between an ion and a polar solvent (explains why salts dissolve in water).\n\nIMF strength drives boiling point, melting point, vapor pressure, and solubility. Larger molecules with more electrons have more dispersion, which can outweigh weaker dipole forces in smaller polar molecules — always compare IMFs holistically, not in isolation.",
    keyIdeas: [
      "LDF < dipole-dipole < H-bonding < ion-dipole (roughly).",
      "Every molecule has LDF; polar molecules add dipole-dipole.",
      "H-bond requires H-N, H-O, or H-F donor and N/O/F acceptor lone pair.",
      "Stronger IMFs → higher boiling point, lower vapor pressure.",
    ],
    commonMistakes: [
      "Claiming nonpolar molecules have no IMFs (they still have LDF).",
      "Calling any H-X bond a hydrogen bond — X must be N, O, or F.",
      "Ignoring size/polarizability when ranking IMFs (Cl₂ has stronger LDF than F₂ despite no dipole).",
    ],
  },
  "3.2": {
    id: "3.2",
    title: "Properties of Solids",
    summary:
      "Ionic, metallic, molecular, covalent-network, and atomic solids have distinct structures and properties rooted in their bonding.",
    lesson:
      "Solids come in five types:\n- Ionic (NaCl): lattice of ions; high mp, brittle, conducts only when melted or dissolved.\n- Metallic (Cu, Fe): cation lattice in electron sea; conducts as solid, malleable.\n- Molecular (I₂, H₂O ice, CO₂ dry ice): discrete molecules held by IMFs; low mp, soft, doesn't conduct.\n- Covalent network (diamond, SiO₂): 3D network of covalent bonds; very high mp, very hard, generally doesn't conduct (exception: graphite layers do).\n- Atomic (noble-gas solids at very low T): single atoms held by LDF; very low mp.\n\nOn the FRQ, map the properties back to the bonding type. High mp + conductivity when molten but not solid = ionic. High mp + very hard + no conductivity = covalent network. Low mp + soft + non-conducting = molecular.",
    keyIdeas: [
      "Five types: ionic, metallic, molecular, covalent network, atomic.",
      "Conductivity signature: metallic (always), ionic (only when liquid/aqueous), network/molecular (usually none).",
      "Hardness and mp track bond/lattice strength.",
      "Graphite conducts (delocalized π) while diamond doesn't — both covalent networks.",
    ],
    commonMistakes: [
      "Lumping molecular and covalent-network solids together.",
      "Forgetting ionic solids don't conduct as solids.",
      "Saying diamond conducts electricity — it doesn't.",
    ],
  },
  "3.3": {
    id: "3.3",
    title: "Solids, Liquids, and Gases",
    summary:
      "Phase behavior reflects the balance between IMFs holding particles together and thermal energy dispersing them.",
    lesson:
      "In solids, IMFs dominate and particles vibrate in fixed positions. In liquids, IMFs still attract, but particles slide past one another — producing fluidity and a free surface. In gases, thermal energy overwhelms IMFs; particles move independently, filling any container.\n\nHeating raises thermal energy and drives phase transitions: melting (s → l), vaporization (l → g), sublimation (s → g), and the reverses (freezing, condensation, deposition). Each transition has a characteristic enthalpy (ΔH_fus, ΔH_vap) — the energy needed to overcome IMFs at constant temperature.\n\nPhase diagrams summarize where each phase is stable in T-P space, showing the triple point (all three phases coexist) and critical point (above which liquid/gas distinction disappears). Water's phase diagram has a negative-slope solid-liquid boundary (ice is less dense than water).",
    keyIdeas: [
      "Solid: fixed positions, vibration. Liquid: fluid, some IMF still. Gas: IMFs minimal.",
      "Phase transitions cost or release energy equal to ΔH of transition.",
      "Triple point: three phases coexist. Critical point: liquid/gas boundary ends.",
      "Water's s-l boundary has negative slope; most substances have positive.",
    ],
    commonMistakes: [
      "Saying temperature changes during a phase transition — it doesn't at equilibrium.",
      "Confusing vaporization (anywhere) with boiling (bulk, at a specific T).",
      "Reading phase diagrams backwards (high-T region is gas; high-P, low-T is solid).",
    ],
  },
  "3.4": {
    id: "3.4",
    title: "Ideal Gas Law",
    summary:
      "PV = nRT relates pressure, volume, moles, and temperature — the universal equation for ideal-gas behavior.",
    lesson:
      "The ideal gas law PV = nRT combines Boyle's (P ∝ 1/V at constant n, T), Charles's (V ∝ T at constant n, P), and Avogadro's (V ∝ n at constant P, T) laws. R = 0.08206 L·atm/(mol·K) = 8.314 J/(mol·K). Always use absolute temperature in Kelvin.\n\nUseful rearrangements:\n- Density: ρ = PM/(RT), where M is molar mass.\n- Comparing two states: \\(P_1V_1/(n_1T_1) = P_2V_2/(n_2T_2)\\).\n- Molar volume at STP (0 °C, 1 atm): 22.4 L/mol.\n- At a gas mixture: \\(P_{total} = \\sum P_i\\) (Dalton's law). Partial pressure \\(P_i = x_i P_{total}\\) where \\(x_i\\) is mole fraction.",
    keyIdeas: [
      "PV = nRT; use Kelvin and match R's units to your other units.",
      "Density ρ = PM/(RT).",
      "At STP: 22.4 L/mol.",
      "Mixture: partial pressures sum to total; \\(P_i = x_i P_{total}\\).",
    ],
    workedExample: {
      prompt:
        "Calculate the pressure of 0.500 mol N₂ gas in a 2.00 L container at 300 K.",
      solution:
        "P = nRT/V = (0.500)(0.08206)(300)/(2.00) = 6.15 atm.",
    },
    commonMistakes: [
      "Using °C instead of K.",
      "Picking an R with wrong units (mixing L·atm with J).",
      "Forgetting to use mole fraction for partial pressure.",
    ],
  },
  "3.5": {
    id: "3.5",
    title: "Kinetic Molecular Theory",
    summary:
      "KMT's assumptions explain gas behavior: tiny particles, constant random motion, elastic collisions, negligible attractions, KE ∝ T.",
    lesson:
      "Assumptions of KMT:\n1. Gas particles are tiny compared to container volume.\n2. Particles are in constant, random, straight-line motion.\n3. Collisions are elastic (no kinetic energy lost).\n4. Attractive forces between particles are negligible.\n5. Average KE is proportional to absolute T.\n\nKE_avg = (3/2)RT per mole. Since KE = ½mv², at the same temperature, lighter particles move faster. Root-mean-square speed: \\(v_{rms} = \\sqrt{3RT/M}\\). Maxwell-Boltzmann distributions show speeds at a given temperature — the curve broadens and shifts right as T rises.\n\nGraham's law: rates of effusion are inversely proportional to \\(\\sqrt{M}\\). Lighter gases effuse faster. This is why helium balloons deflate before air balloons.",
    keyIdeas: [
      "Five KMT assumptions underpin ideal behavior.",
      "Average KE depends only on T (not on identity).",
      "At same T, lighter gases move faster; \\(v_{rms} = \\sqrt{3RT/M}\\).",
      "Graham's law: rate of effusion ∝ 1/\\(\\sqrt{M}\\).",
    ],
    commonMistakes: [
      "Saying lighter gases have more KE at the same T — they have the same KE, just more speed.",
      "Using °C in velocity/KE calculations.",
      "Treating Maxwell-Boltzmann curves as Gaussian — they aren't quite.",
    ],
  },
  "3.6": {
    id: "3.6",
    title: "Deviation from Ideal Gas Law",
    summary:
      "Real gases deviate at high pressure and low temperature, where molecular volume and IMFs matter.",
    lesson:
      "The ideal gas law assumes particles have no volume and no attractions. At high pressure, molecular volume becomes a non-negligible fraction of container volume, so real V > ideal V. At low temperature, attractions pull molecules together, reducing the pressure they exert below the ideal prediction.\n\nThe van der Waals equation adds correction terms: \\((P + a(n/V)^2)(V - nb) = nRT\\), where \\(a\\) accounts for attractions and \\(b\\) for molecular volume. Gases with strong IMFs (H₂O) or large size (Xe) deviate more. Small, nonpolar gases (He, H₂) behave most ideally.\n\nOn the FRQ, explain deviations qualitatively: at high P and low T, attractions and finite volume matter. At low P and high T, ideal-gas behavior is recovered.",
    keyIdeas: [
      "Deviations grow at high P (molecular volume) and low T (attractions).",
      "van der Waals adds correction terms for attractions (a) and volume (b).",
      "Small, nonpolar gases approximate ideal best.",
      "Gases with strong IMFs (H₂O, NH₃) deviate most.",
    ],
    commonMistakes: [
      "Saying real gases are always smaller than ideal predictions — the direction depends on P and T regime.",
      "Forgetting that ideal behavior improves at low P and high T.",
      "Confusing the a and b van der Waals terms.",
    ],
  },
  "3.7": {
    id: "3.7",
    title: "Solutions and Mixtures",
    summary:
      "Solutions are homogeneous mixtures where a solute dissolves in a solvent; concentration is quantified by molarity, molality, or mole fraction.",
    lesson:
      "Solute + solvent = solution. If the solvent is water, the solution is aqueous. Concentration units:\n- Molarity: M = mol solute / L solution. Temperature-dependent (volume changes with T).\n- Molality: m = mol solute / kg solvent. T-independent.\n- Mole fraction: x = mol A / total mol. Dimensionless.\n- Mass percent = (mass solute / mass solution) × 100.\n\nDilutions follow M₁V₁ = M₂V₂ (moles conserved). Always check units — \"50 mL\" in a 1 M solution means 0.050 mol. Stoichiometry in solution works from moles: use M × V to get moles, then the mole ratio, then convert back.",
    keyIdeas: [
      "Molarity = mol/L solution; molality = mol/kg solvent; mole fraction = dimensionless.",
      "M₁V₁ = M₂V₂ for dilutions.",
      "Use molality (not molarity) for colligative properties since it's T-independent.",
      "Aqueous solutions: assume complete dissociation of strong electrolytes.",
    ],
    workedExample: {
      prompt:
        "How many mL of 12 M HCl are needed to prepare 500 mL of 0.25 M HCl?",
      solution:
        "M₁V₁ = M₂V₂. (12)(V₁) = (0.25)(500) = 125 mmol. V₁ = 125/12 = 10.4 mL. Dilute 10.4 mL of concentrated acid to 500 mL.",
    },
    commonMistakes: [
      "Using mL instead of L with molarity.",
      "Mixing up molarity (solution volume) and molality (solvent mass).",
      "Forgetting to convert grams to moles before computing concentration.",
    ],
  },
  "3.8": {
    id: "3.8",
    title: "Representations of Solutions",
    summary:
      "Particle diagrams, chemical equations, and concentration units each highlight different aspects of solution behavior.",
    lesson:
      "A particle-level diagram shows individual ions and molecules. For a strong electrolyte like NaCl(aq), show Na⁺ and Cl⁻ each surrounded by water with partial charges oriented: O near cations, H near anions — depicting ion-dipole interactions.\n\nDissolution equations express the process: \\(\\text{NaCl}(s) \\rightarrow \\text{Na}^+(aq) + \\text{Cl}^-(aq)\\). For weak electrolytes, use an equilibrium arrow and show partial ionization. For nonelectrolytes (sucrose), show intact molecules.\n\nConcentration, solubility, and precipitation all ride on correct representation. When describing why NaCl dissolves but oil doesn't, lean on \"like dissolves like\": polar solvent solvates polar/ionic solutes; nonpolar solvent dissolves nonpolar solutes.",
    keyIdeas: [
      "Strong electrolytes → fully dissociated ions in particle diagrams.",
      "Water molecules orient around ions by their partial charges.",
      "Weak electrolytes: equilibrium arrow, mostly molecular, few ions.",
      "\"Like dissolves like\" — match solvent and solute polarity.",
    ],
    commonMistakes: [
      "Drawing NaCl as an intact molecule in aqueous solution.",
      "Omitting water orientation in ion-dipole pictures.",
      "Forgetting to use equilibrium arrows for weak electrolytes.",
    ],
  },
  "3.9": {
    id: "3.9",
    title: "Separation of Solutions and Mixtures (Chromatography)",
    summary:
      "Chromatography separates a mixture by partitioning components between a mobile and a stationary phase based on affinity.",
    lesson:
      "Chromatography splits a mixture across two phases: a mobile phase (moving fluid — liquid or gas) and a stationary phase (solid or coated surface). Components with stronger affinity for the stationary phase move slowly; components with stronger affinity for the mobile phase move fast. Separation results from the differential rates.\n\nPaper and thin-layer chromatography (TLC): a drop of mixture on paper or a silica plate is drawn up by a solvent; compounds separate by polarity. R_f = (distance of spot) / (distance of solvent front) is a characteristic identifier.\n\nOther variants: column chromatography (scaled-up separation), gas chromatography (vapor + long column), HPLC (high pressure, liquid mobile). Distillation separates by boiling point; filtration by particle size; recrystallization by solubility. Each method exploits a specific physical difference.",
    keyIdeas: [
      "Chromatography: differential affinity between mobile and stationary phases.",
      "R_f = spot distance / solvent-front distance.",
      "Polar solutes stick to polar stationary phase (travel slower).",
      "Distillation → boiling point; filtration → size; recrystallization → solubility.",
    ],
    commonMistakes: [
      "Using the total plate length instead of the solvent-front distance for R_f.",
      "Reversing which phase each component has more affinity for.",
      "Confusing which separation method suits which mixture type.",
    ],
  },
  "3.10": {
    id: "3.10",
    title: "Solubility",
    summary:
      "Solubility depends on solute-solvent IMF matching; temperature and pressure shift equilibria.",
    lesson:
      "\"Like dissolves like\": polar/ionic solutes dissolve in polar solvents (water); nonpolar solutes dissolve in nonpolar solvents (hexane). Solubility of most solids in water increases with temperature, though some exceptions exist (Na₂SO₄).\n\nGas solubility decreases with temperature (warm water holds less O₂, endangering fish in heated waters) and increases with pressure (Henry's law: C = kP). That's why soda fizzes when you open it — the pressure drops and dissolved CO₂ escapes.\n\nSaturation: a solution is saturated when no more solute can dissolve at that T and P (equilibrium with undissolved solute). Supersaturated: temporarily contains more than saturation; a disturbance triggers crystallization. Solubility data and Q vs K_sp comparisons (Unit 7) predict whether precipitation occurs.",
    keyIdeas: [
      "Like dissolves like — match polarity.",
      "Solid solubility in water usually rises with T; gas solubility falls with T.",
      "Gas solubility rises with P (Henry's law).",
      "Saturated = equilibrium with undissolved solute; supersaturated = unstable excess.",
    ],
    commonMistakes: [
      "Applying \"solubility increases with T\" universally — not for gases.",
      "Ignoring pressure for gas-in-liquid solutions.",
      "Confusing saturated with supersaturated.",
    ],
  },
  "3.11": {
    id: "3.11",
    title: "Spectroscopy and the Electromagnetic Spectrum",
    summary:
      "Different wavelengths of light probe different aspects of matter — UV-vis for electrons, IR for bonds, microwave for rotation.",
    lesson:
      "Electromagnetic radiation has wavelength (λ), frequency (ν), and energy E = hν = hc/λ. Shorter wavelength = higher frequency = higher energy. When a molecule absorbs a photon, it goes to a higher-energy state; spectroscopy measures which photons are absorbed to infer molecular structure.\n\nUV-visible (200–800 nm): promotes electrons between orbitals — used to find electronic structure and concentration via Beer-Lambert.\nIR (2.5–25 μm): excites bond vibrations — used to identify functional groups by characteristic frequencies.\nMicrowave: excites molecular rotations.\nRadio/NMR: aligns nuclear spins — used in NMR and MRI.\n\nMatch the probed motion to the right region: electrons = UV-vis, vibrations = IR, rotations = microwave, nuclear spins = radio.",
    keyIdeas: [
      "E = hν = hc/λ — shorter wavelength, higher energy.",
      "UV-vis probes electrons; IR probes bond vibrations; microwave probes rotation.",
      "Absorbance patterns fingerprint molecular structure.",
      "Emission lines in atomic spectra correspond to specific electron transitions.",
    ],
    commonMistakes: [
      "Mixing up wavelength and frequency (inverse relationship).",
      "Forgetting that higher-frequency light has higher energy.",
      "Using IR ranges to interpret electronic transitions.",
    ],
  },
  "3.12": {
    id: "3.12",
    title: "Photoelectric Effect",
    summary:
      "Light ejects electrons only above a threshold frequency, regardless of intensity — evidence that light is quantized.",
    lesson:
      "Shining light on a metal can eject electrons — but only if the frequency exceeds a threshold (the work function of the metal, φ). Below the threshold, no electrons come off regardless of intensity; above it, electrons come off instantly and their kinetic energy scales with frequency, not intensity. Intensity just changes how many electrons come off.\n\nKE_max of ejected electron = hν − φ. Einstein's photon picture: light comes in discrete quanta of energy hν, and each photon transfers its energy to one electron in an all-or-nothing event. This was among the first experimental confirmations that light is quantized — critical evidence for the photon model.",
    keyIdeas: [
      "Frequency must exceed threshold (work function) to eject electrons.",
      "KE_max = hν − φ; KE scales linearly with frequency, not intensity.",
      "Intensity controls the number of electrons, not their energy.",
      "Classic evidence that light is quantized as photons.",
    ],
    workedExample: {
      prompt:
        "A metal has a work function of 4.0 eV. Will 500 nm light eject electrons?",
      solution:
        "Photon energy: E = hc/λ = (1240 eV·nm)/500 nm = 2.48 eV. Since 2.48 eV < 4.0 eV, no electrons are ejected regardless of intensity.",
    },
    commonMistakes: [
      "Claiming more intensity always ejects electrons — not if below threshold.",
      "Using total light energy instead of per-photon energy.",
      "Mixing up work function (φ) with photon energy (hν).",
    ],
  },
  "3.13": {
    id: "3.13",
    title: "Beer-Lambert Law",
    summary:
      "Absorbance is linear in concentration and path length: A = εbc — the basis of quantitative UV-vis spectrophotometry.",
    lesson:
      "Beer-Lambert: A = εbc, where A is absorbance (unitless), ε is molar absorptivity (L·mol⁻¹·cm⁻¹), b is path length (cm), and c is concentration (mol/L). Plot A vs c at fixed λ and b to get a calibration line with slope εb; measure A of an unknown and read off c.\n\nWorks best at low-to-moderate absorbance (roughly 0.1 < A < 1.0). Deviations happen at very high concentrations (molecular interactions change ε), very dilute solutions (stray light), or chemical changes (dimerization, ionization with pH). Always use the wavelength of maximum absorption (λ_max) for highest sensitivity.",
    keyIdeas: [
      "A = εbc — linear in c at fixed λ and b.",
      "Use λ_max for sensitivity; calibration curve to find unknown c.",
      "ε is characteristic of species and wavelength.",
      "Linearity breaks down at high c or with chemical changes.",
    ],
    workedExample: {
      prompt:
        "A 1.0 cm cuvette measures A = 0.45 for a solution with ε = 4500 L·mol⁻¹·cm⁻¹ at λ_max. Find c.",
      solution:
        "c = A/(εb) = 0.45/(4500 × 1.0) = 1.0 × 10⁻⁴ M.",
    },
    commonMistakes: [
      "Using transmittance instead of absorbance (A = −log T).",
      "Forgetting that ε depends on both wavelength and compound.",
      "Applying Beer's law outside the linear range.",
    ],
  },

  // =========================================================================
  // UNIT 4 — CHEMICAL REACTIONS
  // =========================================================================
  "4.1": {
    id: "4.1",
    title: "Introduction for Reactions",
    summary:
      "A chemical reaction transforms reactants to products, conserving atoms and charge; balanced equations capture this quantitatively.",
    lesson:
      "In a chemical reaction, bonds break and form, producing new substances. Key signs of chemical change: color change, temperature change, gas evolution, precipitate formation, light emission. Physical changes (phase transitions, dissolving) don't form new substances at the molecular level, though dissolving ionic solids can look chemical.\n\nBalance by conservation of mass (atoms in = atoms out) and charge (net charge in = net charge out). Adjust coefficients (never subscripts) until both are satisfied. For complex reactions, balance one element at a time, starting with elements appearing in only one reactant and one product; save O and H for the end.",
    keyIdeas: [
      "Chemical change → new substances; physical change → same substance, different form.",
      "Balance by adjusting coefficients only; never change subscripts.",
      "Conserve atoms AND charge.",
      "Signs of chemical reaction: color, temperature, gas, precipitate, light.",
    ],
    commonMistakes: [
      "Changing subscripts to balance (changes identity).",
      "Forgetting to balance charge in ionic equations.",
      "Calling dissolution a chemical reaction — it's usually physical.",
    ],
  },
  "4.2": {
    id: "4.2",
    title: "Net Ionic Equations",
    summary:
      "Strip out spectator ions to show the chemistry that actually happens in aqueous solution.",
    lesson:
      "Three levels of detail:\n1. Molecular equation: full formulas. e.g., AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq).\n2. Complete ionic equation: write all dissolved strong electrolytes as separate ions. Ag⁺ + NO₃⁻ + Na⁺ + Cl⁻ → AgCl(s) + Na⁺ + NO₃⁻.\n3. Net ionic equation: cancel spectator ions (those present on both sides unchanged). Ag⁺(aq) + Cl⁻(aq) → AgCl(s).\n\nOnly strong electrolytes (strong acids, strong bases, soluble salts) are split into ions. Weak electrolytes, molecular compounds, and insoluble precipitates stay as formulas. Spectator ions don't participate in bond making/breaking; they just balance charge.",
    keyIdeas: [
      "Split only strong electrolytes into ions.",
      "Spectator ions appear identically on both sides — cancel them.",
      "Net ionic equations show what truly changes chemically.",
      "Charges and atoms must still balance after cancellation.",
    ],
    workedExample: {
      prompt: "Write the net ionic equation for Pb(NO₃)₂(aq) + 2 KI(aq) → PbI₂(s) + 2 KNO₃(aq).",
      solution:
        "Complete ionic: Pb²⁺ + 2 NO₃⁻ + 2 K⁺ + 2 I⁻ → PbI₂(s) + 2 K⁺ + 2 NO₃⁻. Cancel K⁺ and NO₃⁻ spectators. Net ionic: Pb²⁺(aq) + 2 I⁻(aq) → PbI₂(s).",
    },
    commonMistakes: [
      "Splitting weak acids or insoluble compounds into ions.",
      "Leaving spectator ions in the final net ionic equation.",
      "Forgetting that the net ionic equation still needs atom and charge balance.",
    ],
  },
  "4.3": {
    id: "4.3",
    title: "Representations of Reactions",
    summary:
      "Particle diagrams, molecular equations, ionic equations, and energy diagrams each highlight different aspects of a reaction.",
    lesson:
      "Particle diagrams show atoms and molecules before and after the reaction — good for explaining stoichiometry and conservation. Molecular equations summarize the reaction with formulas. Complete and net ionic equations zoom in on ionic reactions. Energy diagrams plot enthalpy (or potential energy) vs reaction progress and capture activation energy, intermediates, and overall ΔH.\n\nOn the FRQ, pick the representation that answers the question. Particle pictures for stoichiometry and ratios; ionic equations for aqueous chemistry; energy diagrams for kinetics/thermodynamics.",
    keyIdeas: [
      "Particle diagrams → stoichiometry and conservation.",
      "Ionic equations → aqueous chemistry, spectator awareness.",
      "Energy diagrams → ΔH, activation energy, intermediates.",
      "Match representation to question.",
    ],
    commonMistakes: [
      "Using a molecular equation when a net ionic was asked.",
      "Forgetting to balance particle diagrams.",
      "Confusing activation energy with ΔH on energy diagrams.",
    ],
  },
  "4.4": {
    id: "4.4",
    title: "Physical and Chemical Changes",
    summary:
      "Chemical changes form new substances; physical changes do not.",
    lesson:
      "Physical changes alter state or appearance (melting, boiling, dissolving, cutting) but preserve chemical identity. Chemical changes break or form bonds to produce new substances (burning, rusting, neutralization, digestion).\n\nAmbiguous cases require care. Dissolving NaCl in water is physical — ions separate but remain Na⁺ and Cl⁻. Dissolving CO₂ in water is chemical — it forms H₂CO₃. Diagnostic clues: new color, temperature change, gas or precipitate formation, light emission. If the product can be separated back by physical means, the change was physical; if not, chemical.",
    keyIdeas: [
      "Physical change: same substance, different form.",
      "Chemical change: new substance(s) with new bonds.",
      "Color, heat, gas, precipitate, light → chemical.",
      "Dissolving is physical for most ionic compounds; chemical for some (CO₂, SO₃).",
    ],
    commonMistakes: [
      "Calling every state change \"chemical\" if temperature changes.",
      "Treating all dissolving as physical (some is chemical).",
      "Forgetting that conservation of mass holds for both types of change.",
    ],
  },
  "4.5": {
    id: "4.5",
    title: "Stoichiometry",
    summary:
      "Balanced equations provide mole ratios that convert any quantity (mass, moles, volume of gas, molarity) from reactants to products.",
    lesson:
      "Stoichiometry workflow: given → moles → use mole ratio from balanced equation → moles of target → desired units. Pick the bridge that suits the given data: mass to moles by molar mass, gas volume to moles by PV = nRT (or 22.4 L/mol at STP), solution volume to moles by molarity.\n\nLimiting reactant: compute moles of product that each reactant would give; the smaller is the actual yield. The other reactant is in excess. Percent yield = (actual / theoretical) × 100. Real reactions rarely reach 100% because of side reactions, incomplete conversion, or loss during workup.",
    keyIdeas: [
      "Balanced equation gives mole ratios; those ratios bridge any quantities.",
      "Limiting reactant = smaller theoretical product yield.",
      "Percent yield = (actual / theoretical) × 100.",
      "Always go through moles — don't jump between mass and mass directly.",
    ],
    workedExample: {
      prompt:
        "How many grams of water are produced from the complete combustion of 8.0 g CH₄? (CH₄ + 2 O₂ → CO₂ + 2 H₂O).",
      solution:
        "Moles CH₄ = 8.0/16.0 = 0.50 mol. Mole ratio CH₄:H₂O = 1:2, so 0.50 × 2 = 1.0 mol H₂O. Mass = 1.0 × 18.0 = 18.0 g water.",
    },
    commonMistakes: [
      "Skipping the mole-ratio step.",
      "Mixing up limiting vs excess reactant.",
      "Reporting theoretical yield when actual was asked.",
    ],
  },
  "4.6": {
    id: "4.6",
    title: "Introduction to Titration",
    summary:
      "Titration uses a known-concentration titrant to react quantitatively with an unknown, finding the unknown's concentration at the equivalence point.",
    lesson:
      "In a titration, a titrant (known concentration) is added from a buret to an analyte (unknown concentration) until the reaction is stoichiometrically complete. The equivalence point is where moles of titrant equal stoichiometric moles of analyte; the endpoint is where an indicator signals that (ideally very close to equivalence).\n\nWork with M × V = moles. Set up the mole relationship from the balanced equation and solve for unknown concentration.\n\nAcid-base and redox are the most common AP titrations. For acids/bases, the indicator changes color near the equivalence-point pH. For redox, sometimes one reactant is self-indicating (permanganate's purple fades as it's consumed).",
    keyIdeas: [
      "Equivalence point: stoichiometric moles of titrant = moles of analyte.",
      "Use M × V = moles, then mole ratio from balanced equation.",
      "Endpoint (indicator color change) approximates equivalence.",
      "Record titrant volume at endpoint; calculate analyte concentration.",
    ],
    workedExample: {
      prompt:
        "25.0 mL of HCl is titrated with 0.100 M NaOH, requiring 18.5 mL to reach equivalence. What is [HCl]?",
      solution:
        "Moles NaOH = 0.100 × 0.0185 = 1.85 × 10⁻³. 1:1 stoichiometry → 1.85 × 10⁻³ mol HCl in 25.0 mL. [HCl] = 1.85 × 10⁻³ / 0.0250 = 0.0740 M.",
    },
    commonMistakes: [
      "Using initial volume only — always use volume added at endpoint.",
      "Forgetting to convert mL to L before multiplying by M.",
      "Skipping the mole ratio when stoichiometry isn't 1:1.",
    ],
  },
  "4.7": {
    id: "4.7",
    title: "Types of Chemical Reactions",
    summary:
      "Common reaction patterns: synthesis, decomposition, single/double replacement, combustion, acid-base, and redox.",
    lesson:
      "Key types:\n- Synthesis: A + B → AB (Mg + O₂ → MgO).\n- Decomposition: AB → A + B (CaCO₃ → CaO + CO₂).\n- Single replacement: A + BC → AC + B (Zn + 2 HCl → ZnCl₂ + H₂).\n- Double replacement: AB + CD → AD + CB (AgNO₃ + NaCl → AgCl + NaNO₃). Typically forms a precipitate, gas, or water.\n- Combustion: hydrocarbon + O₂ → CO₂ + H₂O.\n- Acid-base (neutralization): HX + BOH → BX + H₂O.\n- Redox: electrons transferred (Zn + Cu²⁺ → Zn²⁺ + Cu).\n\nSolubility rules (Na⁺, K⁺, NH₄⁺, NO₃⁻ always soluble; most chlorides soluble except Ag, Pb, Hg; sulfates soluble except Ba, Sr, Pb) help predict precipitates in double replacement.",
    keyIdeas: [
      "Six common reaction types; each has a recognizable pattern.",
      "Double replacement needs a driving force: precipitate, gas, or water.",
      "Solubility rules predict whether a precipitate forms.",
      "Combustion always produces CO₂ and H₂O for complete combustion of a hydrocarbon.",
    ],
    commonMistakes: [
      "Forgetting to check solubility rules for double replacement.",
      "Writing incomplete combustion products (CO or C soot) when complete combustion was implied.",
      "Mis-classifying redox as something else.",
    ],
  },
  "4.8": {
    id: "4.8",
    title: "Introduction to Acid-Base Reactions",
    summary:
      "Acids donate H⁺; bases accept H⁺. Strong acids/bases ionize completely; weak ones don't.",
    lesson:
      "Brønsted-Lowry: acids are proton donors; bases are proton acceptors. A proton transfer creates a conjugate acid-base pair on each side of the equation. Strong acids (HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄) ionize completely in water; strong bases (NaOH, KOH, other Group 1 hydroxides, some Group 2) dissociate completely. Weak acids/bases establish equilibrium with only partial ionization.\n\nNeutralization: acid + base → salt + water. Strong acid + strong base produces a neutral salt solution. Strong acid + weak base → acidic salt (hydrolysis). Weak acid + strong base → basic salt. At equivalence of a titration, consider salt hydrolysis to predict pH.",
    keyIdeas: [
      "Acids donate H⁺; bases accept H⁺ (Brønsted-Lowry).",
      "Strong acids/bases ionize completely; weak ones don't.",
      "Conjugate pairs differ by one proton.",
      "Salts from strong + weak partners give non-neutral pH at equivalence.",
    ],
    commonMistakes: [
      "Calling acetic acid \"strong\" — it's weak (partial ionization).",
      "Forgetting salts can hydrolyze — equivalence pH isn't always 7.",
      "Mixing up acid-base conjugate pairs on either side of the equation.",
    ],
  },
  "4.9": {
    id: "4.9",
    title: "Oxidation-Reduction (Redox) Reactions",
    summary:
      "Oxidation is loss of electrons; reduction is gain. Assign oxidation numbers to identify what's oxidized and reduced.",
    lesson:
      "Oxidation numbers (OxN) are bookkeeping: rules include 0 for elements in their standard state, charge for monatomic ions, +1 for H (except −1 in metal hydrides), −2 for O (except −1 in peroxides), +1 for Group 1, +2 for Group 2, and sum must equal overall charge.\n\nOxidation: OxN increases (electron loss). Reduction: OxN decreases (electron gain). Oxidizing agent = species reduced (causes oxidation of the other). Reducing agent = species oxidized.\n\nBalance redox by half-reactions: (1) write oxidation and reduction halves. (2) Balance non-H/O atoms. (3) Balance O with H₂O, H with H⁺ (acidic) or add OH⁻ (basic). (4) Balance charge with electrons. (5) Multiply halves to equalize electrons; add and cancel. Conservation of mass and charge must hold.",
    keyIdeas: [
      "Oxidation = OxN up = electron loss. Reduction = OxN down = electron gain.",
      "Oxidizing agent gets reduced; reducing agent gets oxidized.",
      "Half-reaction method: balance atoms, O with H₂O, H with H⁺, then electrons.",
      "In basic solution: balance as if acidic, then neutralize H⁺ with OH⁻.",
    ],
    workedExample: {
      prompt:
        "Identify oxidized and reduced species: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s).",
      solution:
        "Zn goes from 0 to +2 — oxidized (loses electrons), so Zn is the reducing agent. Cu²⁺ goes from +2 to 0 — reduced (gains electrons), so Cu²⁺ is the oxidizing agent.",
    },
    commonMistakes: [
      "Confusing oxidizing and reducing agents — the agent is the other one.",
      "Missing that the element itself has OxN = 0.",
      "Not balancing charge with electrons in half-reactions.",
    ],
  },

  // =========================================================================
  // UNIT 5 — KINETICS
  // =========================================================================
  "5.1": {
    id: "5.1",
    title: "Reaction Rate",
    summary:
      "Rate measures how fast concentration changes; stoichiometry links rates of disappearance and appearance.",
    lesson:
      "For aA + bB → cC + dD, rate = −(1/a) d[A]/dt = −(1/b) d[B]/dt = (1/c) d[C]/dt = (1/d) d[D]/dt. Negative for reactants (disappearing), positive for products. Units: mol·L⁻¹·s⁻¹.\n\nAverage rate over Δt vs instantaneous rate at one moment. Experimentally, plot concentration vs time and take slopes. Measure rates by any observable that tracks concentration: color (spectrophotometry), pressure (gas reactions), pH (acid-base), conductance (ion changes).\n\nRate depends on concentrations, temperature, presence of catalyst, and surface area for heterogeneous reactions.",
    keyIdeas: [
      "Rate = change in concentration per time, scaled by stoichiometric coefficient.",
      "Reactant rates are negative; product rates positive. Divide by coefficient to get the single \"rate of reaction.\"",
      "Average vs instantaneous rate.",
      "Rate depends on [reactants], T, catalyst, and sometimes surface area.",
    ],
    workedExample: {
      prompt:
        "For 2 N₂O₅ → 4 NO₂ + O₂, [N₂O₅] drops at 0.020 M/s. Find the rate of NO₂ appearance.",
      solution:
        "Rate of reaction = −(1/2) d[N₂O₅]/dt = (1/2)(0.020) = 0.010 M/s. Rate of [NO₂] appearance = 4 × 0.010 = 0.040 M/s.",
    },
    commonMistakes: [
      "Ignoring stoichiometric coefficients when comparing rates.",
      "Reporting reactant rates as positive in rate-law contexts.",
      "Confusing average with instantaneous rate.",
    ],
  },
  "5.2": {
    id: "5.2",
    title: "Introduction to Rate Law",
    summary:
      "Rate = k[A]^m[B]^n — orders come from experiment, not from stoichiometric coefficients.",
    lesson:
      "The rate law expresses how rate depends on concentrations: rate = k[A]^m[B]^n. Orders m and n are found experimentally by the method of initial rates — compare trials where one concentration changes at a time and see how rate responds:\n- [A] doubles, rate doubles → 1st order in A.\n- [A] doubles, rate quadruples → 2nd order.\n- [A] doubles, rate unchanged → 0th order.\n\nOverall order = m + n. Units of k depend on overall order: for 1st order, s⁻¹; for 2nd order, M⁻¹·s⁻¹.\n\nOrders can be fractional and can differ from stoichiometric coefficients. The rate law reflects the mechanism, not the balanced overall equation.",
    keyIdeas: [
      "Rate law: rate = k[reactants]^orders. Orders come from experiment.",
      "Method of initial rates: double one [reactant], see rate response.",
      "Overall order = sum of individual orders.",
      "Orders ≠ stoichiometric coefficients in general.",
    ],
    workedExample: {
      prompt:
        "Given data: [A]=0.1, [B]=0.1, rate=0.02; [A]=0.2, [B]=0.1, rate=0.08; [A]=0.1, [B]=0.2, rate=0.04. Find the rate law.",
      solution:
        "A doubles (trial 1→2) → rate 4× → 2nd order in A. B doubles (trial 1→3) → rate 2× → 1st order in B. Rate = k[A]²[B]. Find k from trial 1: 0.02 = k(0.1)²(0.1) = 0.001 k → k = 20 M⁻²·s⁻¹.",
    },
    commonMistakes: [
      "Using stoichiometric coefficients as orders.",
      "Forgetting to hold other concentrations constant when determining an order.",
      "Getting k's units wrong for the overall order.",
    ],
  },
  "5.3": {
    id: "5.3",
    title: "Concentration Changes Over Time",
    summary:
      "Integrated rate laws give concentration vs time for 0th, 1st, and 2nd order kinetics; their linear forms identify the order.",
    lesson:
      "Integrated rate laws:\n- Zero order: [A] = [A]₀ − kt. Plot [A] vs t → line with slope −k. Half-life = [A]₀/(2k).\n- First order: ln[A] = ln[A]₀ − kt. Plot ln[A] vs t → line with slope −k. Half-life = ln(2)/k = 0.693/k — independent of [A]₀.\n- Second order: 1/[A] = 1/[A]₀ + kt. Plot 1/[A] vs t → line with slope +k. Half-life = 1/(k[A]₀) — inversely proportional to [A]₀.\n\nTo identify order from data, plot all three forms ([A], ln[A], 1/[A]) vs t; the straight-line plot reveals the order. First-order half-life constancy is a hallmark (radioactive decay, many pharmacokinetics).",
    keyIdeas: [
      "Linear plots: 0th = [A] vs t; 1st = ln[A] vs t; 2nd = 1/[A] vs t.",
      "Slopes: −k, −k, +k respectively.",
      "Half-lives: [A]₀/(2k), 0.693/k, 1/(k[A]₀).",
      "Only first-order half-life is independent of [A]₀.",
    ],
    workedExample: {
      prompt:
        "A first-order reaction has k = 0.050 s⁻¹. How long until [A] drops to 25% of initial?",
      solution:
        "Two half-lives reduces [A] to 25%. t_½ = 0.693/0.050 = 13.86 s. Two half-lives = 27.7 s.",
    },
    commonMistakes: [
      "Applying the wrong half-life formula for the order.",
      "Confusing ln with log base 10.",
      "Reading slope sign incorrectly on integrated-rate-law plots.",
    ],
  },
  "5.4": {
    id: "5.4",
    title: "Elementary Reactions",
    summary:
      "For elementary steps, the rate law follows directly from stoichiometry — molecularity gives order.",
    lesson:
      "An elementary reaction happens in a single step as written. For such a step, the rate law equals the stoichiometry: unimolecular A → P has rate = k[A]; bimolecular A + B → P has rate = k[A][B]; termolecular A + 2B → P has rate = k[A][B]² (rare, since three particles colliding simultaneously is improbable).\n\nThis shortcut only applies to elementary steps, not to overall balanced reactions. The overall rate law must be derived from the mechanism (see 5.8).",
    keyIdeas: [
      "Elementary step → rate law from stoichiometry.",
      "Unimolecular, bimolecular, termolecular = molecularity = order of step.",
      "Overall rate laws rarely match overall stoichiometry.",
      "Termolecular steps are statistically rare.",
    ],
    commonMistakes: [
      "Applying the stoichiometry-to-rate-law rule to non-elementary (overall) equations.",
      "Confusing molecularity (step) with order (rate law).",
      "Writing termolecular mechanisms when a two-step route is more plausible.",
    ],
  },
  "5.5": {
    id: "5.5",
    title: "Collision Model",
    summary:
      "Reactions happen when reactants collide with enough energy and correct orientation to surmount activation energy.",
    lesson:
      "Collision theory: rate ∝ (collision frequency) × (fraction with KE ≥ Ea) × (orientation factor). Raising T increases both collision frequency and, more importantly, the fraction of molecules with KE above Ea (Maxwell-Boltzmann curve shifts right). That's why rates roughly double every 10 °C for many reactions.\n\nConcentration increases collision frequency. Catalysts lower Ea, increasing the fraction of collisions that succeed. Orientation (steric factor) explains why not every energetic collision produces a reaction — especially for reactions between complex molecules.",
    keyIdeas: [
      "Rate depends on collision frequency, energy, and orientation.",
      "Higher T → more high-KE molecules → faster rate.",
      "Higher [reactants] → more collisions per second.",
      "Catalysts lower Ea, raising fraction of successful collisions.",
    ],
    commonMistakes: [
      "Claiming T only changes collision frequency — its main effect is on the fraction with Ea.",
      "Ignoring orientation as a distinct factor.",
      "Treating all collisions as reactive.",
    ],
  },
  "5.6": {
    id: "5.6",
    title: "Reaction Energy Profile",
    summary:
      "An energy profile plots energy vs progress, showing activation energy Ea, the transition state, and ΔH of the overall reaction.",
    lesson:
      "A reaction energy diagram plots potential (or enthalpy) on the y-axis and \"reaction progress\" on the x-axis. The starting plateau is reactants, the ending plateau is products, and the peak between is the transition state (activated complex). Ea_forward = peak height above reactants; Ea_reverse = peak height above products; ΔH = products − reactants.\n\nExothermic: products below reactants, ΔH < 0. Endothermic: products above reactants, ΔH > 0. A catalyst provides an alternative path with lower Ea — the peak is shorter, but ΔH is unchanged.\n\nArrhenius equation: k = A·exp(−Ea/RT). Large Ea → small rate constant at a given T; increasing T raises k. Taking ln gives ln k = ln A − Ea/(RT), a straight line when ln k is plotted vs 1/T (slope = −Ea/R).",
    keyIdeas: [
      "Ea_fwd = peak − reactant level; Ea_rev = peak − product level.",
      "ΔH = product − reactant (sign from direction on the y-axis).",
      "Catalyst lowers Ea without changing ΔH.",
      "Arrhenius: k = A exp(−Ea/RT); ln k vs 1/T gives slope −Ea/R.",
    ],
    workedExample: {
      prompt:
        "A reaction's energy diagram has reactants at 100 kJ, transition state at 180 kJ, products at 60 kJ. Find Ea_fwd, Ea_rev, and ΔH.",
      solution:
        "Ea_fwd = 180 − 100 = 80 kJ. Ea_rev = 180 − 60 = 120 kJ. ΔH = 60 − 100 = −40 kJ (exothermic).",
    },
    commonMistakes: [
      "Reading ΔH as the height of the peak — it's the difference between plateaus.",
      "Forgetting that a catalyst affects both Ea_fwd and Ea_rev equally.",
      "Using Ea_fwd when Ea_rev was asked.",
    ],
  },
  "5.7": {
    id: "5.7",
    title: "Introduction to Reaction Mechanisms",
    summary:
      "A mechanism is the sequence of elementary steps whose sum equals the overall balanced reaction.",
    lesson:
      "Reactions usually proceed via multiple elementary steps. Intermediates appear in some steps but cancel out in the overall equation — they are produced and consumed within the mechanism. Transition states are momentary peaks, not tracked in the equation.\n\nA valid mechanism must (1) sum to the overall balanced equation and (2) be consistent with the experimentally determined rate law. If either fails, the mechanism is wrong or incomplete.",
    keyIdeas: [
      "Mechanism = ordered list of elementary steps.",
      "Intermediates cancel in the sum; catalysts appear on both sides.",
      "Mechanism must match both overall equation and rate law.",
      "Transition states are peaks, not intermediates.",
    ],
    commonMistakes: [
      "Forgetting that intermediates must cancel in the summed equation.",
      "Treating transition states and intermediates as the same thing.",
      "Accepting any mechanism whose steps sum correctly without checking the rate law.",
    ],
  },
  "5.8": {
    id: "5.8",
    title: "Reaction Mechanism and Rate Law",
    summary:
      "The rate-determining step (slowest step) sets the overall rate law; intermediates must be substituted out using equilibrium approximations.",
    lesson:
      "The slowest (rate-determining) step governs the overall rate. If the RDS is the first step, its rate law is the overall rate law (in terms of reactants). If the RDS is later, intermediates from faster prior steps may appear in its rate law; use the prior equilibrium (fast-equilibrium approximation) to replace [intermediate] with reactant concentrations.\n\nExample: Step 1 (fast eq): A + B ⇌ C; Step 2 (slow): C + D → P. Rate = k₂[C][D]. From Step 1 equilibrium: K₁ = [C]/([A][B]) → [C] = K₁[A][B]. So overall rate = k₂K₁[A][B][D] — an expression in reactants only.",
    keyIdeas: [
      "Rate law from the slowest (rate-determining) step.",
      "Substitute intermediates using fast-equilibrium step expressions.",
      "Catalysts can appear in the rate law too.",
      "Final rate law should contain only overall reactants (or catalysts).",
    ],
    commonMistakes: [
      "Leaving an intermediate in the final rate law.",
      "Assuming the first step is always rate-determining.",
      "Forgetting to multiply equilibrium constants into the combined rate expression.",
    ],
  },
  "5.9": {
    id: "5.9",
    title: "Steady-State Approximation",
    summary:
      "When an intermediate is consumed as fast as produced, set d[intermediate]/dt = 0 and solve for it.",
    lesson:
      "The steady-state approximation (SSA) assumes that reactive intermediates have small, roughly constant concentrations — their rate of formation equals their rate of consumption. Apply it when fast-equilibrium is not a clean assumption.\n\nSet d[I]/dt = 0, solve algebraically for [I], and substitute into the rate-determining step's rate law. Result: rate law in terms of reactants (and possibly catalysts). SSA is a more general tool than fast-equilibrium; fast-equilibrium is a special case where one step's forward-reverse balance dominates.",
    keyIdeas: [
      "Steady state: d[I]/dt ≈ 0.",
      "Set formation rate = consumption rate, solve for [I].",
      "Substitute [I] into the overall rate law.",
      "SSA is more general than fast-equilibrium approximation.",
    ],
    commonMistakes: [
      "Applying SSA to stable, high-concentration species — only for reactive intermediates.",
      "Forgetting to include all formation and consumption terms.",
      "Reporting [I] rather than the resulting rate law.",
    ],
  },
  "5.10": {
    id: "5.10",
    title: "Multistep Reaction Energy Profile",
    summary:
      "Multistep reactions have multiple peaks and valleys; the highest peak is the rate-determining step.",
    lesson:
      "Energy diagrams for multistep reactions show one peak per elementary step and one valley per intermediate. The tallest peak — relative to its preceding valley — corresponds to the step with the largest Ea, which is the rate-determining step.\n\nIntermediates sit in valleys; transition states are peaks. Overall ΔH = (final product level) − (initial reactant level). A catalyst drops all peaks (especially the rate-determining one) but doesn't change the valleys or overall ΔH.\n\nOn the FRQ, read off: (1) number of steps, (2) which step is rate-determining, (3) ΔH for each step and overall, (4) Ea_fwd/Ea_rev for each step.",
    keyIdeas: [
      "One peak per step, one valley per intermediate.",
      "Rate-determining step = tallest peak (from preceding valley).",
      "Overall ΔH = last plateau − first plateau.",
      "Catalyst lowers peaks, not valleys or overall ΔH.",
    ],
    commonMistakes: [
      "Picking the absolute highest peak rather than the one with largest Ea from its preceding valley.",
      "Confusing intermediates (valleys) with transition states (peaks).",
      "Treating multistep ΔH as the sum of absolute peak heights.",
    ],
  },
  "5.11": {
    id: "5.11",
    title: "Catalysis",
    summary:
      "A catalyst provides an alternate mechanism with lower Ea; it's not consumed overall and doesn't change ΔH or K.",
    lesson:
      "A catalyst speeds up a reaction by providing a new mechanism with lower activation energy. It's regenerated by the end — appears in the mechanism but cancels in the overall equation. Catalysts do not change ΔH, K, or equilibrium position; they just help the system reach equilibrium faster.\n\nTypes: homogeneous catalyst (same phase as reactants, e.g., aqueous enzymes or dissolved acid), heterogeneous catalyst (different phase, typically solid surface — platinum in catalytic converters, iron in Haber process), enzyme catalyst (biological, extremely specific).\n\nMechanism: a catalyst typically binds a reactant (lowering Ea for a key step), helps it through the transition state, then releases products and reverts to its original form. Enzymes use induced-fit active sites for this.",
    keyIdeas: [
      "Catalyst lowers Ea, speeds both forward and reverse rates equally.",
      "No change in ΔH, K, or equilibrium position.",
      "Homogeneous (same phase) vs heterogeneous (different phase) vs enzymatic.",
      "Catalyst regenerated at the end — appears in mechanism, cancels in overall equation.",
    ],
    commonMistakes: [
      "Saying catalysts shift equilibrium — they don't.",
      "Forgetting a catalyst speeds reverse rate too.",
      "Confusing catalyst (speeds reaction) with intermediate (appears mid-mechanism).",
    ],
  },

  // =========================================================================
  // UNIT 6 — THERMODYNAMICS
  // =========================================================================
  "6.1": {
    id: "6.1",
    title: "Endothermic and Exothermic Processes",
    summary:
      "Exothermic releases heat to surroundings (ΔH < 0, feels hot); endothermic absorbs heat (ΔH > 0, feels cold).",
    lesson:
      "Energy flows between system and surroundings. Exothermic reactions release energy as heat: system loses energy, surroundings gain it, container feels warm. Endothermic reactions absorb energy: system gains, surroundings lose, container feels cold. The sign convention: ΔH is defined from the system's perspective.\n\nBond perspective: breaking bonds requires energy (endothermic); forming bonds releases it (exothermic). Overall ΔH = energy of bonds broken − energy of bonds formed. If you form stronger (or more) bonds than you break, the reaction is exothermic.",
    keyIdeas: [
      "Exothermic: ΔH < 0, system releases heat.",
      "Endothermic: ΔH > 0, system absorbs heat.",
      "Bond breaking requires energy; bond forming releases it.",
      "Sign of ΔH refers to the system, not the surroundings.",
    ],
    commonMistakes: [
      "Flipping the sign of ΔH (thinking from surroundings).",
      "Calling combustion endothermic because a match is hot to touch.",
      "Forgetting that net energy change depends on both breaking and forming.",
    ],
  },
  "6.2": {
    id: "6.2",
    title: "Energy Diagrams",
    summary:
      "Enthalpy diagrams show reactant and product energies; catalysts and multistep paths reshape them without altering ΔH.",
    lesson:
      "Energy (enthalpy) diagrams plot energy on the y-axis with reactants and products at fixed levels. Descending diagrams are exothermic (products lower); ascending are endothermic (products higher). Ea is the gap between reactants and the highest peak. ΔH is the difference between product and reactant plateaus.\n\nMultistep reactions have multiple peaks; the rate-determining step is the highest barrier. Catalysts introduce a new, lower path but leave ΔH unchanged. Reading these diagrams fluently is essential for kinetics/thermodynamics questions.",
    keyIdeas: [
      "Products below reactants = exothermic; above = endothermic.",
      "Ea = peak height from reactants; ΔH = product level − reactant level.",
      "Catalyst lowers peaks; ΔH and product stability don't change.",
      "Multistep profiles show one peak per step, valleys for intermediates.",
    ],
    commonMistakes: [
      "Interpreting ΔH as peak height.",
      "Assuming catalysts shift products downward.",
      "Missing that endothermic products still need Ea to revert to reactants.",
    ],
  },
  "6.3": {
    id: "6.3",
    title: "Heat Transfer and Thermal Equilibrium",
    summary:
      "Heat flows from hot to cold until thermal equilibrium (equal temperatures) is reached.",
    lesson:
      "Heat is thermal energy in transit. Two objects in contact exchange heat until they reach the same temperature — thermal equilibrium. At equilibrium, molecular KE is distributed across both so the temperatures match (though distributions can differ).\n\nHeat flow spontaneously follows the second law: hot → cold, never the reverse (without external work). The amount of heat transferred depends on each substance's mass, heat capacity, and temperature change (Unit 6.4).",
    keyIdeas: [
      "Heat flows from hot to cold spontaneously.",
      "Thermal equilibrium: temperatures equal, no net heat flow.",
      "Heat is energy in transit, not a property of matter.",
      "Reverse flow requires external work (refrigerators, heat pumps).",
    ],
    commonMistakes: [
      "Saying \"cold flows\" — cold is just absence of heat.",
      "Confusing heat with temperature.",
      "Assuming equal heat means equal temperature change in different materials.",
    ],
  },
  "6.4": {
    id: "6.4",
    title: "Heat Capacity and Calorimetry",
    summary:
      "q = mcΔT for simple heating; calorimetry balances heat gained and lost to find unknown specific heats or enthalpies.",
    lesson:
      "Specific heat capacity c (J/g·°C) is heat per gram per degree. Heat q = mcΔT for temperature changes (no phase change). Molar heat capacity is per mole instead of per gram.\n\nCalorimetry assumes q_lost = −q_released: heat released by the system = heat absorbed by the calorimeter and contents. For a coffee-cup (constant P) calorimeter, q = ΔH of the reaction. For a bomb (constant V) calorimeter, q = ΔU.\n\nExample: a hot metal dropped into cooler water. Heat lost by metal = heat gained by water. m_metal × c_metal × ΔT_metal = −m_water × c_water × ΔT_water. Signs can be tricky — ΔT = T_final − T_initial, and the metal's ΔT is negative while water's is positive.",
    keyIdeas: [
      "q = mcΔT for temperature changes without phase transitions.",
      "Specific heat is per gram; molar heat capacity is per mole.",
      "Calorimetry: heat lost by one side = heat gained by the other.",
      "Coffee-cup gives ΔH; bomb gives ΔU.",
    ],
    workedExample: {
      prompt:
        "A 50.0 g metal at 90.0 °C is dropped into 100.0 g water at 20.0 °C. Final T is 25.0 °C. Find the metal's specific heat (c_water = 4.18 J/g·°C).",
      solution:
        "Heat gained by water = 100 × 4.18 × 5.0 = 2090 J. Heat lost by metal = 2090 J = 50.0 × c × (25.0 − 90.0) = 50.0 × c × (−65.0). Solve: c = 2090 / (50.0 × 65.0) = 0.643 J/g·°C.",
    },
    commonMistakes: [
      "Getting the sign of ΔT wrong.",
      "Using molar heat capacity with mass in grams.",
      "Ignoring the calorimeter's own heat capacity in high-precision problems.",
    ],
  },
  "6.5": {
    id: "6.5",
    title: "Energy of Phase Changes",
    summary:
      "Phase changes happen at constant T, with energy (ΔH_fus or ΔH_vap) going to breaking IMFs rather than raising KE.",
    lesson:
      "During a phase change, temperature stays constant while energy goes into breaking IMFs. The required energy is the heat of fusion (melting) or heat of vaporization (boiling). ΔH_vap is always larger than ΔH_fus because vaporization separates molecules completely; fusion only loosens the lattice.\n\nOn a heating curve, flat plateaus occur at phase transitions; sloped regions are within a phase (where q = mcΔT). To heat ice at −20 °C to steam at 110 °C: (1) warm ice, (2) melt, (3) warm water, (4) vaporize, (5) warm steam. Sum all steps — each uses the appropriate formula.",
    keyIdeas: [
      "Phase changes occur at constant T; q = n × ΔH_phase.",
      "ΔH_vap > ΔH_fus always.",
      "Heating curve: flat for phase changes, sloped for heating within a phase.",
      "Sum multiple steps carefully; don't forget phase-change plateaus.",
    ],
    workedExample: {
      prompt:
        "How much heat is required to melt 50.0 g of ice at 0 °C? (ΔH_fus = 334 J/g.)",
      solution: "q = 50.0 g × 334 J/g = 16,700 J = 16.7 kJ.",
    },
    commonMistakes: [
      "Using mcΔT during a phase change — T doesn't change.",
      "Forgetting to include each step when going across multiple phases.",
      "Mixing up molar and gram-based ΔH values.",
    ],
  },
  "6.6": {
    id: "6.6",
    title: "Introduction to Enthalpy of Reaction",
    summary:
      "ΔH_rxn is the heat absorbed or released at constant pressure; for standard conditions, ΔH°_rxn uses standard states.",
    lesson:
      "Enthalpy H = U + PV. ΔH_rxn is the heat exchanged at constant pressure, typical for open-air reactions. Standard conditions: 1 atm, 1 M solutions, typically 298 K; pure elements in their most stable form define ΔH°_f = 0.\n\nWays to determine ΔH_rxn:\n1. Calorimetry (direct measurement).\n2. Bond enthalpies: ΔH ≈ Σ bonds broken − Σ bonds formed.\n3. Enthalpies of formation: ΔH°_rxn = Σ n·ΔH°_f(products) − Σ n·ΔH°_f(reactants).\n4. Hess's law: sum individual step ΔH values.\n\nUse whichever data your problem gives you. Method 3 is usually fastest when a table of formation enthalpies is provided.",
    keyIdeas: [
      "ΔH = heat at constant pressure.",
      "Standard state: 1 atm, 1 M solutions, most stable elemental form.",
      "ΔH°_rxn = Σ ΔH°_f(products) − Σ ΔH°_f(reactants).",
      "Multiple methods — pick based on data given.",
    ],
    commonMistakes: [
      "Forgetting to weight ΔH°_f by stoichiometric coefficients.",
      "Using non-standard ΔH_f values without noting conditions.",
      "Applying bond-enthalpy estimates to compounds in condensed phases (they assume gas phase).",
    ],
  },
  "6.7": {
    id: "6.7",
    title: "Bond Enthalpies",
    summary:
      "ΔH ≈ energy of bonds broken − energy of bonds formed; an estimate, not exact, since bond energies are averages.",
    lesson:
      "Bond enthalpy is the energy needed to break a mole of that bond in the gas phase. Use an average-bond-enthalpy table: ΔH_rxn ≈ Σ (bonds broken) − Σ (bonds formed). Breaking takes energy in; forming releases energy out. If more energy is released by forming product bonds than was consumed breaking reactant bonds, ΔH is negative (exothermic).\n\nLimitations: bond enthalpy values are averages over many molecules, so results are estimates. Works best for gas-phase reactions. For condensed phases, use formation enthalpies instead.",
    keyIdeas: [
      "ΔH ≈ Σ bonds broken − Σ bonds formed.",
      "Breaking is endothermic (positive); forming is exothermic (negative) — but both numbers in the table are positive bond enthalpies.",
      "Bond enthalpies are averages; estimates only.",
      "Gas-phase reactions only; switch to ΔH°_f for liquids and solids.",
    ],
    workedExample: {
      prompt:
        "Estimate ΔH for H₂(g) + Cl₂(g) → 2 HCl(g) using bond enthalpies: H-H 436, Cl-Cl 243, H-Cl 431 kJ/mol.",
      solution:
        "Bonds broken: H-H (436) + Cl-Cl (243) = 679 kJ. Bonds formed: 2 × H-Cl = 2 × 431 = 862 kJ. ΔH ≈ 679 − 862 = −183 kJ. Exothermic.",
    },
    commonMistakes: [
      "Reversing the sign (formed minus broken).",
      "Forgetting to multiply bond count by stoichiometric coefficients.",
      "Using bond enthalpies for non-gas phase reactions.",
    ],
  },
  "6.8": {
    id: "6.8",
    title: "Enthalpy of Formation",
    summary:
      "ΔH°_f is the enthalpy of forming one mole of a compound from its elements in standard states; elements in standard state have ΔH°_f = 0.",
    lesson:
      "Standard enthalpy of formation (ΔH°_f) is defined as the enthalpy change when one mole of a compound forms from its elements in their standard states at 1 atm (typically 298 K). For any pure element in its standard state (O₂ gas, graphite, liquid Br₂, solid Na), ΔH°_f = 0.\n\nCompute ΔH°_rxn via: ΔH°_rxn = Σ n·ΔH°_f(products) − Σ n·ΔH°_f(reactants), multiplied by stoichiometric coefficients. Sign-sensitive; always double-check you used products − reactants and multiplied correctly.",
    keyIdeas: [
      "ΔH°_f forms one mole of a compound from standard-state elements.",
      "Elements in standard state: ΔH°_f = 0.",
      "ΔH°_rxn = Σ ΔH°_f(products) − Σ ΔH°_f(reactants), weighted by coefficients.",
      "Be careful about which allotrope is standard (graphite, not diamond).",
    ],
    workedExample: {
      prompt:
        "Find ΔH°_rxn for 2 H₂O₂(l) → 2 H₂O(l) + O₂(g). ΔH°_f: H₂O₂(l) = −188; H₂O(l) = −286; O₂(g) = 0 (kJ/mol).",
      solution:
        "ΔH°_rxn = [2(−286) + 0] − [2(−188)] = −572 − (−376) = −572 + 376 = −196 kJ.",
    },
    commonMistakes: [
      "Treating O₂(g) as nonzero.",
      "Dropping stoichiometric coefficients when summing.",
      "Subtracting products from reactants instead of products − reactants.",
    ],
  },
  "6.9": {
    id: "6.9",
    title: "Hess's Law",
    summary:
      "Enthalpy is a state function — the total ΔH depends only on initial and final states, not the path. Add step ΔH's to get an overall reaction ΔH.",
    lesson:
      "Hess's law: if a reaction can be expressed as the sum of a sequence of reactions, the overall ΔH is the sum of the individual ΔH values. Reversing a step flips the sign; multiplying a step by a factor multiplies ΔH by the same factor.\n\nUse Hess's law when direct measurement is impractical. Target: your desired reaction. Given: other reactions with known ΔH. Manipulate the given equations (reverse, scale) so they sum to the target, then sum their ΔH values (with signs adjusted).",
    keyIdeas: [
      "Enthalpy is a state function — path-independent.",
      "Reverse a step → flip sign of ΔH. Scale a step → multiply ΔH by the factor.",
      "Sum manipulated steps so intermediates cancel.",
      "Used when direct measurement is hard (e.g., carbon → CO requires C → CO₂ and CO → CO₂).",
    ],
    workedExample: {
      prompt:
        "Find ΔH for C(s) + ½ O₂(g) → CO(g). Given: (1) C + O₂ → CO₂, ΔH = −394 kJ. (2) CO + ½ O₂ → CO₂, ΔH = −283 kJ.",
      solution:
        "Reverse (2): CO₂ → CO + ½ O₂, ΔH = +283 kJ. Add to (1): C + O₂ + CO₂ → CO₂ + CO + ½ O₂. Cancel CO₂ on both sides and simplify O₂: C + ½ O₂ → CO. ΔH = −394 + 283 = −111 kJ.",
    },
    commonMistakes: [
      "Forgetting to flip ΔH sign when reversing an equation.",
      "Forgetting to multiply ΔH when scaling an equation.",
      "Not canceling intermediates before summing.",
    ],
  },

  // =========================================================================
  // UNIT 7 — EQUILIBRIUM
  // =========================================================================
  "7.1": {
    id: "7.1",
    title: "Introduction to Equilibrium",
    summary:
      "Reversible reactions reach dynamic equilibrium when forward and reverse rates equalize — concentrations stay constant, not zero.",
    lesson:
      "At equilibrium, a reversible reaction reaches a state where the forward and reverse rates are equal and concentrations no longer change. The reaction doesn't stop — molecules still convert back and forth — but net change is zero. Hence \"dynamic\" equilibrium.\n\nSigns you're at equilibrium: constant concentration over time (plateau on [vs t plot]), or Q = K. Not everything reaches equilibrium in observable time (some reactions are so slow they effectively don't).",
    keyIdeas: [
      "Forward rate = reverse rate at equilibrium.",
      "Concentrations constant, not zero.",
      "Dynamic: reaction continues in both directions at equal rates.",
      "Reaching equilibrium is kinetics; the position of equilibrium is thermodynamics.",
    ],
    commonMistakes: [
      "Saying reactions \"stop\" at equilibrium.",
      "Assuming equilibrium means equal reactant and product concentrations.",
      "Confusing equilibrium (ongoing) with completion (one-direction done).",
    ],
  },
  "7.2": {
    id: "7.2",
    title: "Direction of Reversible Reactions",
    summary:
      "Reversible reactions proceed toward equilibrium from either side; double arrows (⇌) signal reversibility.",
    lesson:
      "Write reversible reactions with ⇌ instead of →. Reactions approach equilibrium from either direction — start with only reactants, they form products; start with only products, they form reactants. The final equilibrium position depends on the equilibrium constant K, not on the starting composition.\n\nThe approach to equilibrium is a kinetics problem (how fast); the position is a thermodynamics problem (where). Fast-forward and slow-reverse (or any asymmetry) doesn't matter for the final equilibrium composition.",
    keyIdeas: [
      "Double arrows (⇌) denote reversibility.",
      "Equilibrium can be approached from reactant or product side.",
      "K determines the position; kinetics determines the speed.",
      "Final equilibrium composition is independent of starting direction.",
    ],
    commonMistakes: [
      "Using single → for reversible reactions.",
      "Claiming only reactants reach equilibrium.",
      "Assuming faster kinetics means K is larger.",
    ],
  },
  "7.3": {
    id: "7.3",
    title: "Reaction Quotient and Equilibrium Constant",
    summary:
      "Q has the same form as K but uses any-time concentrations; compare Q to K to predict which direction the reaction shifts.",
    lesson:
      "For aA + bB ⇌ cC + dD, K_c = [C]^c[D]^d / ([A]^a[B]^b) at equilibrium. Q has the same form but uses non-equilibrium concentrations. Compare:\n- Q < K: too few products → reaction shifts forward.\n- Q = K: equilibrium, no net shift.\n- Q > K: too many products → reaction shifts reverse.\n\nK_p uses partial pressures for gases. K_c and K_p relate via K_p = K_c·(RT)^Δn, where Δn is change in moles of gas.",
    keyIdeas: [
      "Q = K form, evaluated at current conditions.",
      "Q < K → forward shift; Q > K → reverse shift.",
      "K_c uses concentrations; K_p uses pressures (for gases).",
      "Pure solids and liquids are excluded from K expressions.",
    ],
    workedExample: {
      prompt:
        "For N₂ + 3 H₂ ⇌ 2 NH₃ with K = 4.0, if [N₂] = 0.50, [H₂] = 1.0, [NH₃] = 2.0 M, which way does the reaction shift?",
      solution:
        "Q = (2.0)² / [(0.50)(1.0)³] = 4.0 / 0.50 = 8.0. Q > K (8.0 > 4.0), so the reaction shifts reverse to make more reactants.",
    },
    commonMistakes: [
      "Including pure solids/liquids in K or Q.",
      "Forgetting to raise concentrations to their stoichiometric exponents.",
      "Reading Q < K as \"shift reverse\" (it's shift forward).",
    ],
  },
  "7.4": {
    id: "7.4",
    title: "Calculating the Equilibrium Constant",
    summary:
      "Given equilibrium concentrations, compute K directly by plugging into the expression.",
    lesson:
      "From given equilibrium concentrations (or pressures), compute K by plugging into the expression. If you're given only initial amounts and one final concentration, use ICE tables (Initial-Change-Equilibrium) to derive the rest, then evaluate.\n\nICE table: write initial concentrations; express change in terms of x using stoichiometry; sum to get equilibrium row; substitute into K. Solve for x if needed (sometimes quadratic, sometimes simplified using K small or K large approximations).",
    keyIdeas: [
      "K = product/reactant concentrations raised to coefficients, at equilibrium.",
      "Use ICE to bridge initial values to equilibrium values via x.",
      "Small-K approximation: if K << 1, assume x << initial.",
      "Large-K approximation: reaction goes nearly to completion; work from products.",
    ],
    workedExample: {
      prompt:
        "For H₂ + I₂ ⇌ 2 HI, initial [H₂] = [I₂] = 0.100 M, [HI] = 0 M. At equilibrium [HI] = 0.160 M. Find K.",
      solution:
        "x = 0.080 M (half of [HI] since stoichiometry 1:1:2 → Δ[H₂] = Δ[I₂] = x, Δ[HI] = 2x). Equilibrium: [H₂] = [I₂] = 0.020 M; [HI] = 0.160 M. K = (0.160)² / [(0.020)(0.020)] = 0.0256 / 0.0004 = 64.",
    },
    commonMistakes: [
      "Skipping ICE and reporting Q instead of K.",
      "Forgetting factor of 2 in Δ[HI] for this stoichiometry.",
      "Approximating x too aggressively without checking validity.",
    ],
  },
  "7.5": {
    id: "7.5",
    title: "Magnitude of the Equilibrium Constant",
    summary:
      "Large K favors products; small K favors reactants; K ≈ 1 means comparable amounts of each.",
    lesson:
      "K >> 1 (say 10³ or more) means products dominate at equilibrium — the forward reaction \"goes to completion\" for practical purposes. K << 1 (say 10⁻³ or less) means reactants dominate — little product forms. K near 1 means comparable quantities.\n\nThese rules of thumb guide qualitative predictions. They also inform ICE-table simplifications: for K very small, you can often assume the change x is tiny compared to initial concentrations.",
    keyIdeas: [
      "K >> 1: products favored at equilibrium.",
      "K << 1: reactants favored.",
      "K ≈ 1: comparable amounts.",
      "Magnitude, not value of K, gives the qualitative picture.",
    ],
    commonMistakes: [
      "Claiming K = 5 is huge — it isn't, on chemistry's log scales.",
      "Forgetting K depends on T and on the exact balanced equation.",
      "Confusing K magnitude with reaction rate.",
    ],
  },
  "7.6": {
    id: "7.6",
    title: "Properties of the Equilibrium Constant",
    summary:
      "Reversing a reaction inverts K; adding equations multiplies Ks; scaling by n raises K to the nth power.",
    lesson:
      "Properties of K:\n- If you reverse the equation, K_reverse = 1/K_forward.\n- If you multiply an equation by n, K_new = K_old^n.\n- If you add two equations, K_combined = K₁ × K₂.\n\nK depends on temperature — change T and K changes. K does not depend on concentrations or pressures (though Q does). K_p and K_c are related by K_p = K_c(RT)^Δn_gas.",
    keyIdeas: [
      "Reversal → K becomes 1/K.",
      "Scaling by n → K raised to n-th power.",
      "Adding equations → multiply K's.",
      "K depends only on T (and on how the equation is written).",
    ],
    commonMistakes: [
      "Adding K's when combining equations — you should multiply them.",
      "Forgetting to reverse K when rewriting the equation backward.",
      "Claiming K changes with concentration.",
    ],
  },
  "7.7": {
    id: "7.7",
    title: "Calculating Equilibrium Concentrations",
    summary:
      "Set up an ICE table, substitute into K, and solve for x — sometimes with an approximation or a quadratic.",
    lesson:
      "Steps:\n1. Write balanced equation and K expression.\n2. ICE table: Initial, Change (in terms of x via stoichiometry), Equilibrium.\n3. Substitute equilibrium expressions into K.\n4. Solve for x.\n5. Compute all equilibrium concentrations.\n\nIf K is small (<10⁻³), approximate x << initial [reactant] and simplify. Check the approximation (x should be less than ~5% of initial). If not valid, solve the full quadratic.",
    keyIdeas: [
      "ICE table organizes conservation of reactants and products.",
      "Small-K approximation: x << initial.",
      "Check approximation: x/[init] < 5% typically.",
      "Quadratic needed when approximation fails or K is moderate.",
    ],
    workedExample: {
      prompt:
        "For HA ⇌ H⁺ + A⁻ with K_a = 1.0 × 10⁻⁵ and initial [HA] = 0.10 M, find [H⁺] at equilibrium.",
      solution:
        "ICE: [HA] = 0.10 − x, [H⁺] = [A⁻] = x. K_a = x² / (0.10 − x) ≈ x²/0.10 (since K_a small). x² = 1.0 × 10⁻⁶, x = 1.0 × 10⁻³. So [H⁺] = 1.0 × 10⁻³ M. Check: 1.0 × 10⁻³ / 0.10 = 1% — approximation valid.",
    },
    commonMistakes: [
      "Approximating x even when K is not small.",
      "Forgetting to check the approximation's validity.",
      "Botching the quadratic sign.",
    ],
  },
  "7.8": {
    id: "7.8",
    title: "Representations of Equilibrium",
    summary:
      "Particle diagrams, concentration-vs-time plots, and rate-vs-time plots all visualize equilibrium from different angles.",
    lesson:
      "Particle diagrams: at equilibrium, the ratio of product to reactant particles in the box reflects K; snapshots over time show fluctuating but constant average ratios.\n\nConcentration-vs-time plot: reactants decrease (or increase if starting from products), products build up (or decrease), all plateauing at equilibrium. The relative heights indicate whether K > 1 (products higher) or K < 1 (reactants higher).\n\nRate-vs-time plot: forward rate starts high (lots of reactant) and decreases; reverse rate starts at zero and increases. They meet at equilibrium — equal, nonzero.",
    keyIdeas: [
      "Particle ratio at equilibrium reflects K.",
      "Concentration plot: reactants and products plateau; which is higher reflects K.",
      "Rate plot: forward and reverse rates meet at equilibrium.",
      "Match representation to question type on FRQs.",
    ],
    commonMistakes: [
      "Drawing rate-vs-time plots where rates drop to zero at equilibrium.",
      "Confusing particle count with concentration — container volume matters.",
      "Forgetting reactant plateau is not zero.",
    ],
  },
  "7.9": {
    id: "7.9",
    title: "Introduction to Le Châtelier's Principle",
    summary:
      "If a stress is applied to an equilibrium, the system shifts in the direction that partially counteracts the stress.",
    lesson:
      "Le Châtelier: add reactant → shift forward. Add product → shift reverse. Remove reactant → shift reverse. Remove product → shift forward. Increase total pressure (decrease volume) → shift to side with fewer moles of gas. Increase temperature → shift in the endothermic direction (treat heat as a reactant or product).\n\nAdding an inert gas at constant volume does not shift equilibrium (doesn't change partial pressures). Catalysts do not shift equilibrium (speeds both forward and reverse equally).",
    keyIdeas: [
      "Add reactant → forward; add product → reverse; opposite for removal.",
      "Increase P (decrease V) → shift to fewer moles of gas.",
      "Increase T → shift endothermic direction.",
      "Inert gas addition at constant V and catalyst do NOT shift equilibrium.",
    ],
    commonMistakes: [
      "Claiming temperature changes \"just shift without changing K\" — K actually changes with T.",
      "Including inert gas pressure as a stress.",
      "Treating catalyst as shifting equilibrium.",
    ],
  },
  "7.10": {
    id: "7.10",
    title: "Reaction Quotient and Le Châtelier's Principle",
    summary:
      "Stress changes Q; the reaction shifts until Q = K again.",
    lesson:
      "Le Châtelier is a shortcut; the underlying logic is Q. Adding reactant decreases Q (bigger denominator in Q = products/reactants), so Q < K and reaction shifts forward until Q returns to K. Adding product increases Q; reaction shifts reverse.\n\nFor gas-phase volume changes: decreasing V increases all concentrations proportionally, but not equally in terms of Q because of stoichiometric exponents. The side with fewer moles of gas has a smaller exponent effect, so Q moves in that direction.",
    keyIdeas: [
      "Stress changes Q; system shifts until Q returns to K.",
      "Adding reactant: Q drops → shift forward.",
      "Adding product: Q rises → shift reverse.",
      "Le Châtelier is Q-based reasoning in disguise.",
    ],
    commonMistakes: [
      "Forgetting to compare Q to K after a stress.",
      "Missing that volume changes affect Q via stoichiometric exponents.",
      "Treating concentration shifts and temperature shifts the same way — T changes K itself.",
    ],
  },
  "7.11": {
    id: "7.11",
    title: "Introduction to Solubility Equilibria",
    summary:
      "K_sp is the equilibrium constant for dissolving sparingly soluble salts; molar solubility is the x in its ICE table.",
    lesson:
      "For a sparingly soluble salt M_aX_b(s) ⇌ aM^n+ + bX^m−: K_sp = [M^n+]^a [X^m−]^b (solid excluded). Molar solubility s is the moles per liter that dissolve — compute from K_sp and stoichiometry.\n\nExample: AgCl, K_sp = 1.8 × 10⁻¹⁰. Dissolving AgCl gives [Ag⁺] = [Cl⁻] = s. K_sp = s² → s = √(1.8 × 10⁻¹⁰) = 1.3 × 10⁻⁵ M. For a 2:1 salt like Ag₂CrO₄: K_sp = (2s)²(s) = 4s³.\n\nLarger K_sp = more soluble (within same stoichiometry). Compare directly only for same ion stoichiometry; otherwise compute molar solubility.",
    keyIdeas: [
      "K_sp expression excludes pure solid.",
      "Molar solubility = s; the setup depends on stoichiometry.",
      "K_sp comparison valid only for same salt type (same ion count).",
      "Convert s to g/L by multiplying by molar mass if mass solubility is asked.",
    ],
    workedExample: {
      prompt:
        "Find molar solubility of Mg(OH)₂ in water. K_sp = 5.6 × 10⁻¹².",
      solution:
        "Mg(OH)₂ ⇌ Mg²⁺ + 2 OH⁻. Let s = solubility. [Mg²⁺] = s, [OH⁻] = 2s. K_sp = s(2s)² = 4s³ = 5.6 × 10⁻¹². s³ = 1.4 × 10⁻¹², s = (1.4 × 10⁻¹²)^(1/3) ≈ 1.1 × 10⁻⁴ M.",
    },
    commonMistakes: [
      "Forgetting the stoichiometric coefficients inside the K_sp exponents (2s, not s, for OH⁻).",
      "Cube-rooting incorrectly.",
      "Including the solid in the K_sp expression.",
    ],
  },
  "7.12": {
    id: "7.12",
    title: "Common-Ion Effect",
    summary:
      "Adding a common ion decreases solubility of a sparingly soluble salt — Le Châtelier in action.",
    lesson:
      "If you already have Cl⁻ in solution (say from NaCl), adding AgCl will dissolve less. The equilibrium Ag⁺ + Cl⁻ ⇌ AgCl(s) is shifted toward solid by the common ion. Set up an ICE with the common ion's initial concentration and solve for s (solubility).\n\nExample: AgCl in 0.10 M NaCl. K_sp = [Ag⁺][Cl⁻] = 1.8 × 10⁻¹⁰. [Cl⁻] ≈ 0.10 M (the common ion dominates). [Ag⁺] = K_sp/0.10 = 1.8 × 10⁻⁹ M — far less than 1.3 × 10⁻⁵ M in pure water.\n\nThis effect matters in buffer chemistry, selective precipitation, and qualitative analysis.",
    keyIdeas: [
      "Common ion → equilibrium shifts to solid → lower solubility.",
      "ICE with initial [common ion] at the bulk value.",
      "Approximate s << [common ion] usually works.",
      "Used intentionally in buffers and selective precipitation.",
    ],
    workedExample: {
      prompt:
        "Find solubility of PbCl₂ (K_sp = 1.6 × 10⁻⁵) in 0.20 M NaCl.",
      solution:
        "PbCl₂ ⇌ Pb²⁺ + 2 Cl⁻. In 0.20 M NaCl, [Cl⁻] ≈ 0.20 M (s << 0.20). K_sp = [Pb²⁺](0.20)² → [Pb²⁺] = 1.6 × 10⁻⁵ / 0.04 = 4.0 × 10⁻⁴ M. Solubility s = 4.0 × 10⁻⁴ M — less than in pure water.",
    },
    commonMistakes: [
      "Treating the common ion as contributing from the salt's own dissolution only.",
      "Forgetting to square [Cl⁻] for PbCl₂-type stoichiometries.",
      "Ignoring how the common-ion effect lowers, not raises, solubility.",
    ],
  },
  "7.13": {
    id: "7.13",
    title: "pH and Solubility",
    summary:
      "Salts of weak-acid anions (CO₃²⁻, F⁻, OH⁻) dissolve more in acidic solution because the acid consumes the anion.",
    lesson:
      "For a salt whose anion is the conjugate base of a weak acid, adding H⁺ (lowering pH) removes that anion by protonation. Le Châtelier then shifts the dissolution equilibrium forward, dissolving more salt.\n\nExample: CaF₂(s) ⇌ Ca²⁺ + 2 F⁻. In acidic solution, F⁻ + H⁺ → HF pulls F⁻ out, so more CaF₂ dissolves. Similarly, carbonates, hydroxides, and phosphates all show increased solubility in acid. Salts of strong-acid anions (Cl⁻, Br⁻, NO₃⁻) are unaffected by pH — their anions don't protonate significantly.",
    keyIdeas: [
      "Weak-acid anions (F⁻, CO₃²⁻, OH⁻) → solubility rises in acid.",
      "Strong-acid anions (Cl⁻, NO₃⁻, ClO₄⁻) → solubility unaffected by pH.",
      "H⁺ consumes anion → Le Châtelier shifts dissolution forward.",
      "Basic solution can suppress solubility of hydroxide salts (common-ion OH⁻).",
    ],
    commonMistakes: [
      "Thinking all salts dissolve more in acid — only those with basic anions.",
      "Forgetting that hydroxide precipitates are particularly pH-sensitive.",
      "Misapplying the rule to salts with Cl⁻, Br⁻, NO₃⁻.",
    ],
  },
  "7.14": {
    id: "7.14",
    title: "Free Energy of Dissolution",
    summary:
      "Dissolution is spontaneous when ΔG_dissolution < 0; ΔG = −RT ln K_sp links thermodynamics to solubility.",
    lesson:
      "The free-energy change of dissolving a salt is ΔG = ΔH − TΔS. Dissolution is usually entropically favored (ΔS > 0 because ions disperse). Enthalpy can be positive (lattice breaking dominates) or negative (solvation dominates). Net sign determines favorability.\n\nAt equilibrium: ΔG° = −RT ln K_sp. A K_sp < 1 yields positive ΔG° (dissolution non-spontaneous at standard conditions). This links Unit 7 (equilibrium) and Unit 9 (thermodynamics) — solubility equilibria are thermodynamic phenomena.",
    keyIdeas: [
      "ΔG_dissolution = ΔH − TΔS.",
      "ΔG° = −RT ln K_sp connects free energy to solubility.",
      "Entropy usually favors dissolution; enthalpy varies.",
      "Temperature affects both ΔH, ΔS contributions — solubility shifts with T.",
    ],
    commonMistakes: [
      "Forgetting the negative sign in ΔG° = −RT ln K.",
      "Using K_c where K_sp applies.",
      "Ignoring temperature's role in ΔG (via both ΔH and TΔS).",
    ],
  },

  // =========================================================================
  // UNIT 8 — ACIDS AND BASES
  // =========================================================================
  "8.1": {
    id: "8.1",
    title: "Introduction to Acids and Bases",
    summary:
      "Brønsted-Lowry defines acid as H⁺ donor, base as H⁺ acceptor; conjugate pairs are related by one proton.",
    lesson:
      "Brønsted-Lowry: acids donate protons; bases accept them. Proton transfer creates conjugate pairs: each acid has a conjugate base (acid − H⁺), and each base has a conjugate acid (base + H⁺). For NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, NH₃/NH₄⁺ and H₂O/OH⁻ are the conjugate pairs.\n\nStrong acids (HCl, HBr, HI, HNO₃, HClO₄, H₂SO₄ first H) ionize fully; weak acids ionize partially (acetic acid, HF). Strong bases (group 1 hydroxides, heavy group 2 like Ba(OH)₂) dissociate fully; weak bases ionize partially (NH₃, amines).",
    keyIdeas: [
      "Acid = H⁺ donor; base = H⁺ acceptor.",
      "Conjugate pairs differ by one proton.",
      "Strong = full ionization; weak = partial ionization.",
      "Amphoteric species (H₂O, HCO₃⁻) can act as either.",
    ],
    commonMistakes: [
      "Including weak acids in the strong-acid list.",
      "Identifying conjugate pairs across the equation (they must be on opposite sides and differ by one H).",
      "Forgetting water can be amphoteric.",
    ],
  },
  "8.2": {
    id: "8.2",
    title: "pH and pOH of Strong Acids and Bases",
    summary:
      "For strong acids/bases, [H⁺] (or [OH⁻]) equals the nominal concentration; pH = −log[H⁺]; pH + pOH = 14 at 25 °C.",
    lesson:
      "pH = −log[H⁺] and pOH = −log[OH⁻]. At 25 °C, K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴, so pH + pOH = 14.\n\nStrong acids ionize fully, so [H⁺] = nominal [acid] (for 1:1 acids like HCl). For H₂SO₄ (diprotic, though only first H is fully strong), treat accordingly. Strong bases like NaOH: [OH⁻] = [NaOH]. For Ca(OH)₂, [OH⁻] = 2[Ca(OH)₂].\n\nDilute cases: if the calculated [H⁺] ≈ 10⁻⁷, water's autoionization matters and pH is not just −log[strong acid]. Use K_w plus charge balance for such cases.",
    keyIdeas: [
      "pH = −log[H⁺]; pOH = −log[OH⁻]. pH + pOH = 14 at 25 °C.",
      "Strong acid [H⁺] = nominal concentration (for 1:1 stoichiometry).",
      "Strong base: factor in stoichiometry (Ca(OH)₂ gives 2 OH⁻).",
      "Very dilute strong acid: consider water autoionization.",
    ],
    workedExample: {
      prompt: "Find the pH of 0.025 M HNO₃.",
      solution:
        "[H⁺] = 0.025 M (HNO₃ strong, 1:1). pH = −log(0.025) = 1.60.",
    },
    commonMistakes: [
      "Using natural log instead of log base 10.",
      "Forgetting stoichiometry for Ca(OH)₂ and Ba(OH)₂.",
      "Reporting negative pH when simply −log of normal concentrations should give positive.",
    ],
  },
  "8.3": {
    id: "8.3",
    title: "Weak Acid and Base Equilibria",
    summary:
      "For weak acids, K_a = [H⁺][A⁻]/[HA]; solve an ICE table with the K_a expression to find [H⁺].",
    lesson:
      "Weak acids partially ionize: HA ⇌ H⁺ + A⁻, K_a = [H⁺][A⁻]/[HA]. ICE: [HA] = C_a − x, [H⁺] = [A⁻] = x. K_a ≈ x²/C_a if K_a is small and x << C_a. Then [H⁺] = √(K_a·C_a). Check the approximation.\n\nFor weak bases: B + H₂O ⇌ BH⁺ + OH⁻. K_b = [BH⁺][OH⁻]/[B]. Same ICE approach. Conjugate relationship: K_a·K_b = K_w for a conjugate acid-base pair.\n\npK_a = −log K_a, pK_b = −log K_b. Lower pK_a = stronger acid. pK_a + pK_b = 14 at 25 °C for a conjugate pair.",
    keyIdeas: [
      "K_a = [H⁺][A⁻]/[HA]; K_b similar for bases.",
      "ICE + small-x approximation (valid if x/C_a < 5%).",
      "K_a·K_b = K_w; pK_a + pK_b = 14.",
      "Lower pK_a → stronger acid.",
    ],
    workedExample: {
      prompt:
        "Find pH of 0.10 M acetic acid (K_a = 1.8 × 10⁻⁵).",
      solution:
        "ICE: [H⁺] = x, [A⁻] = x, [HA] = 0.10 − x ≈ 0.10. K_a ≈ x²/0.10 → x² = 1.8 × 10⁻⁶ → x = 1.34 × 10⁻³ M. pH = −log(1.34 × 10⁻³) = 2.87. Check: x/C ≈ 1.3% < 5% ✓.",
    },
    commonMistakes: [
      "Ignoring the approximation check — sometimes it fails.",
      "Swapping K_a and K_b labels for a conjugate pair.",
      "Forgetting that [H⁺] at equilibrium isn't the nominal weak-acid concentration.",
    ],
  },
  "8.4": {
    id: "8.4",
    title: "Acid-Base Reactions and Buffers",
    summary:
      "A buffer — weak acid and its conjugate base (or vice versa) — resists pH change when small amounts of acid or base are added.",
    lesson:
      "Buffer = weak acid + conjugate base (HA + A⁻) or weak base + conjugate acid (B + BH⁺). When acid is added, A⁻ neutralizes it (A⁻ + H⁺ → HA). When base is added, HA neutralizes it (HA + OH⁻ → A⁻ + H₂O). Small shifts in the ratio [HA]/[A⁻] produce only small shifts in pH.\n\nBuffers are made by:\n1. Mixing a weak acid with its conjugate base (or weak base + conjugate acid).\n2. Partially neutralizing a weak acid with strong base (or weak base with strong acid).\n3. Salt hydrolysis only for specific systems (less common).\n\nBuffer behavior is quantified by Henderson-Hasselbalch (8.9).",
    keyIdeas: [
      "Buffer components: weak acid + its conjugate base (or vice versa).",
      "Added H⁺: conjugate base absorbs it; added OH⁻: weak acid absorbs it.",
      "Strong acids and bases alone don't buffer.",
      "Made by mixing, or by partial neutralization.",
    ],
    commonMistakes: [
      "Calling HCl/NaCl a buffer — it isn't (no weak-acid/conjugate pair).",
      "Forgetting the conjugate form in mixture-based buffers.",
      "Assuming a buffer works at any ratio — its capacity is limited.",
    ],
  },
  "8.5": {
    id: "8.5",
    title: "Acid-Base Titrations",
    summary:
      "Titration curves show pH vs titrant volume; the equivalence point is where stoichiometric moles match, not always at pH 7.",
    lesson:
      "Four regions of a titration curve:\n1. Before titration starts: pH set by initial acid/base.\n2. Before equivalence: buffer region (weak acid/conjugate base); use Henderson-Hasselbalch.\n3. At equivalence: all the analyte has been neutralized. For strong-strong: pH = 7. For weak acid + strong base: pH > 7 (conjugate base hydrolysis). For weak base + strong acid: pH < 7.\n4. Past equivalence: pH set by excess titrant.\n\nAt half-equivalence for weak-acid titration: pH = pK_a (because [HA] = [A⁻]). This is a useful experimental way to find pK_a. Indicators: pick one with a pKa near the equivalence-point pH.",
    keyIdeas: [
      "Four regions: initial, buffer, equivalence, excess titrant.",
      "At half-equivalence of weak acid: pH = pK_a.",
      "Equivalence pH depends on the acid-base strength combination.",
      "Choose indicator whose pKa is near the equivalence pH.",
    ],
    commonMistakes: [
      "Assuming every equivalence point is pH 7.",
      "Using molecular formulas instead of moles in the buffer region.",
      "Picking phenolphthalein for a weak-base/strong-acid titration (equivalence is acidic).",
    ],
  },
  "8.6": {
    id: "8.6",
    title: "Molecular Structure of Acids and Bases",
    summary:
      "Acid strength tracks bond polarity, bond strength, and stability of the conjugate base.",
    lesson:
      "For binary acids HX: strength increases down a group (weaker H-X bond dominates) and increases across a period (more polar bond). So HI > HBr > HCl > HF and HF > H₂O > NH₃ > CH₄.\n\nFor oxyacids HₘXOₙ: more O atoms on the central atom pull electron density away from the O-H bond, stabilizing the conjugate base (anion) and strengthening the acid. HClO₄ > HClO₃ > HClO₂ > HClO.\n\nConjugate-base stability is the unifying principle. Anything that stabilizes A⁻ (electronegative atoms, resonance, size, etc.) strengthens HA as an acid.",
    keyIdeas: [
      "Binary HX: acidity increases down a group and across a period.",
      "Oxyacid strength rises with more O on the central atom.",
      "Stable conjugate base = stronger acid.",
      "Resonance and inductive effects stabilize negative charge in A⁻.",
    ],
    commonMistakes: [
      "Ranking HCl and HF as similarly strong — HF is actually weak.",
      "Ignoring electronegativity when comparing oxyacids with the same number of O.",
      "Forgetting that conjugate-base resonance (as in acetate) boosts acidity.",
    ],
  },
  "8.7": {
    id: "8.7",
    title: "pH and pKa",
    summary:
      "Lower pK_a = stronger acid; pH relative to pK_a determines ratio of protonated to deprotonated forms.",
    lesson:
      "pK_a = −log K_a. Lower pK_a → larger K_a → stronger acid. Approximate pK_a's: strong acids negative or small; carboxylic acids ~4-5; phenols ~10; water 15.7; alcohols ~16.\n\nAt pH = pK_a, [HA] = [A⁻]. When pH < pK_a, HA dominates (protonated). When pH > pK_a, A⁻ dominates (deprotonated). This is why drug/biomolecule charge states change dramatically with pH — compare pK_a to physiological pH to predict ionization.",
    keyIdeas: [
      "pK_a = −log K_a; lower = stronger acid.",
      "At pH = pK_a, [HA] = [A⁻].",
      "pH < pK_a: protonated. pH > pK_a: deprotonated.",
      "Compare pK_a to environment pH to predict charge state.",
    ],
    commonMistakes: [
      "Confusing direction: lower pK_a is stronger, not weaker.",
      "Treating pK_a as constant across temperature — it isn't.",
      "Forgetting that at pH = pK_a, the ratio is 1:1 (not 100% one form).",
    ],
  },
  "8.8": {
    id: "8.8",
    title: "Properties of Buffers",
    summary:
      "A buffer's pH sits near pK_a; its capacity depends on the total concentration of buffer components.",
    lesson:
      "A buffer works best when pH ≈ pK_a (ratio near 1:1). Outside ±1 pH unit from pK_a, the ratio [A⁻]/[HA] becomes extreme and the buffer weakens.\n\nBuffer capacity is how much added acid or base the buffer can absorb before pH changes significantly. Higher total [HA] + [A⁻] → more capacity. Equal amounts of HA and A⁻ give maximum capacity for a given total concentration.\n\nChoose a buffer by matching pK_a to desired pH. Biochemists use phosphate buffer (pKa₂ ≈ 7.2) near physiological pH; acetic acid/acetate (pK_a 4.75) for mildly acidic work; tris (pK_a 8.1) for slightly basic work.",
    keyIdeas: [
      "Best buffer range: pH within ±1 unit of pK_a.",
      "Capacity = higher total [HA + A⁻] → more robust.",
      "Equal [HA] = [A⁻] maximizes capacity.",
      "Choose a buffer whose pK_a is near your target pH.",
    ],
    commonMistakes: [
      "Using a buffer far from its pK_a.",
      "Treating capacity as unlimited.",
      "Forgetting the total concentration determines capacity, not just the ratio.",
    ],
  },
  "8.9": {
    id: "8.9",
    title: "Henderson-Hasselbalch Equation",
    summary:
      "pH = pK_a + log([A⁻]/[HA]) — the workhorse for computing buffer pH from a concentration ratio.",
    lesson:
      "Derived from K_a = [H⁺][A⁻]/[HA], Henderson-Hasselbalch gives pH = pK_a + log([A⁻]/[HA]). Use moles directly when both components are in the same solution (the volume cancels).\n\nThe equation works best when [HA] and [A⁻] are not too dilute (approximations behind it assume dissociation of HA is small). Also valid for weak-base buffers: pOH = pK_b + log([BH⁺]/[B]), or use the conjugate form with pK_a = 14 − pK_b.\n\nOn a buffer calculation: identify moles of acid and conjugate base, plug in pK_a, compute pH. Don't forget that adding strong acid or base changes the moles of each first (stoichiometrically) before you apply H-H.",
    keyIdeas: [
      "pH = pK_a + log([A⁻]/[HA]).",
      "Use moles directly when volumes cancel.",
      "Apply stoichiometry first when strong acid/base is added, then H-H.",
      "Valid approximately; assumes HA dissociation is small and the approximation holds.",
    ],
    workedExample: {
      prompt:
        "A buffer contains 0.20 M acetic acid (pK_a = 4.75) and 0.30 M sodium acetate. Find pH.",
      solution:
        "pH = 4.75 + log(0.30/0.20) = 4.75 + log(1.5) = 4.75 + 0.176 = 4.93.",
    },
    commonMistakes: [
      "Using [A⁻]/[HA] without taking the log (or using ln).",
      "Forgetting to do stoichiometry first when a strong acid is added.",
      "Inverting the ratio (putting HA on top).",
    ],
  },
  "8.10": {
    id: "8.10",
    title: "Buffer Capacity",
    summary:
      "A buffer's capacity scales with the total concentration of its components and is maximized when [HA] = [A⁻].",
    lesson:
      "Buffer capacity β measures moles of strong acid (or base) per liter that raises (or lowers) pH by 1 unit. It is highest when [HA] = [A⁻] (pH = pK_a) and when total concentration is high.\n\nTo increase capacity: use more concentrated buffer. To buffer at a particular pH, pick a buffer with pK_a close to that pH. Buffer capacity falls off quickly at pH > pK_a + 1 or < pK_a − 1 because one of the components becomes depleted.\n\nOn the FRQ, problems often ask: after adding x mol of strong acid/base, what is the new pH? Do the stoichiometric reaction first (strong acid + A⁻ → HA + conjugate), update moles, then apply Henderson-Hasselbalch with the new ratio.",
    keyIdeas: [
      "Capacity β = moles of strong acid/base per pH unit shift.",
      "Maximum capacity at [HA] = [A⁻] (pH = pK_a).",
      "Higher concentration → larger capacity.",
      "Workflow for added strong acid/base: stoichiometry → ratio → Henderson-Hasselbalch.",
    ],
    workedExample: {
      prompt:
        "A 1.0 L buffer of 0.50 M HA and 0.50 M A⁻ (pK_a = 5.0) receives 0.10 mol HCl. New pH?",
      solution:
        "HCl reacts: 0.10 mol A⁻ → HA. New moles: HA = 0.60, A⁻ = 0.40. pH = 5.0 + log(0.40/0.60) = 5.0 − 0.176 = 4.82.",
    },
    commonMistakes: [
      "Skipping the stoichiometric step before applying Henderson-Hasselbalch.",
      "Treating the added strong acid as if it ionized the buffer.",
      "Forgetting capacity falls off rapidly outside pH = pK_a ± 1.",
    ],
  },

  // =========================================================================
  // UNIT 9 — APPLICATIONS OF THERMODYNAMICS
  // =========================================================================
  "9.1": {
    id: "9.1",
    title: "Introduction to Entropy",
    summary:
      "Entropy (S) measures the number of microstates consistent with a macrostate — disorder in the informal sense.",
    lesson:
      "Entropy S is a thermodynamic function that tracks the number of ways a system's energy and particles can be arranged (microstates). More microstates = higher entropy. The second law: the entropy of the universe (system + surroundings) increases in any spontaneous process.\n\nQualitative trends:\n- Gases > liquids > solids (more freedom of motion).\n- Larger molecules > smaller (more vibrational modes).\n- Dissolving a solid or mixing gases increases entropy.\n- Higher T raises entropy.\n- ΔS > 0 when moles of gas increase across the reaction.",
    keyIdeas: [
      "Entropy = log(microstates); higher = more disordered.",
      "Solids < liquids < gases.",
      "Reactions with more moles of gas on the product side have ΔS > 0.",
      "Second law: ΔS_universe > 0 for spontaneous processes.",
    ],
    commonMistakes: [
      "Conflating system entropy with universe entropy.",
      "Forgetting that gas-phase stoichiometry dominates ΔS estimates.",
      "Ranking solids > liquids in entropy.",
    ],
  },
  "9.2": {
    id: "9.2",
    title: "Absolute Entropy and Entropy Change",
    summary:
      "S° values are absolute (from the third law); ΔS°_rxn = Σ n·S°(products) − Σ n·S°(reactants).",
    lesson:
      "The third law of thermodynamics: a perfect crystal at 0 K has S = 0. So absolute entropies can be tabulated (unlike enthalpies, which are measured as differences). At 298 K, every substance has a positive S° (J/mol·K).\n\nCompute ΔS°_rxn = Σ n·S°(products) − Σ n·S°(reactants), weighted by coefficients. For gas-phase reactions with Δn_gas > 0, expect ΔS > 0; for Δn_gas < 0, expect ΔS < 0.",
    keyIdeas: [
      "S° values are absolute (third law).",
      "ΔS°_rxn = Σ S°(products) − Σ S°(reactants), weighted.",
      "Δn_gas sign predicts ΔS°_rxn sign.",
      "Elements in standard state have non-zero S° (unlike ΔH°_f).",
    ],
    workedExample: {
      prompt:
        "Predict the sign of ΔS°_rxn for CaCO₃(s) → CaO(s) + CO₂(g).",
      solution:
        "A gas appears on the product side (Δn_gas = +1 > 0), so ΔS°_rxn is positive — more disorder.",
    },
    commonMistakes: [
      "Treating S° of elements as zero.",
      "Forgetting to weight S° values by stoichiometric coefficients.",
      "Misreading ΔS sign from Δn_gas.",
    ],
  },
  "9.3": {
    id: "9.3",
    title: "Gibbs Free Energy and Thermodynamic Favorability",
    summary:
      "ΔG = ΔH − TΔS; negative ΔG means the reaction is thermodynamically favored at that temperature.",
    lesson:
      "Gibbs free energy combines enthalpy and entropy at a given temperature: ΔG = ΔH − TΔS. Negative ΔG → spontaneous (thermodynamically favored). Positive → non-spontaneous. Zero → at equilibrium.\n\nFour cases:\n- ΔH < 0, ΔS > 0: always spontaneous.\n- ΔH > 0, ΔS < 0: never spontaneous.\n- ΔH < 0, ΔS < 0: spontaneous at low T (enthalpy-driven).\n- ΔH > 0, ΔS > 0: spontaneous at high T (entropy-driven).\n\nThe cutoff temperature where ΔG = 0 is T = ΔH/ΔS — useful for phase transitions (melting/boiling points approximate this condition).",
    keyIdeas: [
      "ΔG = ΔH − TΔS.",
      "ΔG < 0 spontaneous; ΔG > 0 non-spontaneous; ΔG = 0 equilibrium.",
      "Temperature flips favorability for mixed-sign (ΔH, ΔS) cases.",
      "T = ΔH/ΔS gives the crossover temperature.",
    ],
    workedExample: {
      prompt:
        "A reaction has ΔH = +50 kJ/mol and ΔS = +150 J/mol·K. Find the temperature above which it becomes spontaneous.",
      solution:
        "ΔG = 0 at T = ΔH/ΔS = 50,000 / 150 = 333 K. Above 333 K, ΔG < 0 (entropy-driven spontaneity). Watch unit consistency: convert kJ to J.",
    },
    commonMistakes: [
      "Mixing J and kJ when using ΔH and ΔS together.",
      "Using °C instead of K.",
      "Confusing spontaneous with fast — kinetics is a separate question.",
    ],
  },
  "9.4": {
    id: "9.4",
    title: "Thermodynamic and Kinetic Control",
    summary:
      "A reaction can be thermodynamically favored but kinetically slow; products depend on whether you wait or watch for the fastest path.",
    lesson:
      "Thermodynamic control: the favored product has the lowest ΔG (most stable). Kinetic control: the favored product has the lowest Ea (formed fastest). If both conditions point to the same product, no ambiguity. If they disagree, starting conditions determine what you see.\n\nDiamond vs graphite: graphite is the thermodynamically stable form at STP, yet diamond persists for geological times due to kinetic barriers. Many organic syntheses optimize Ea differences to selectively produce kinetic or thermodynamic products (e.g., enolate chemistry).",
    keyIdeas: [
      "Thermodynamic favorability (ΔG) and kinetic speed (Ea) are independent.",
      "ΔG < 0 doesn't guarantee observable reaction.",
      "Activation energy can trap systems in metastable states.",
      "Kinetic vs thermodynamic product depends on conditions (T, time).",
    ],
    commonMistakes: [
      "Using ΔG to predict rate.",
      "Assuming \"spontaneous\" means \"fast.\"",
      "Confusing which product is favored in a given kinetic/thermodynamic context.",
    ],
  },
  "9.5": {
    id: "9.5",
    title: "Free Energy and Equilibrium",
    summary:
      "ΔG° = −RT ln K links free energy to the equilibrium constant; ΔG = ΔG° + RT ln Q tracks the current position.",
    lesson:
      "ΔG° is the free-energy change under standard conditions; it relates to K by ΔG° = −RT ln K.\n- K > 1: ΔG° < 0 (products favored).\n- K < 1: ΔG° > 0 (reactants favored).\n- K = 1: ΔG° = 0.\n\nAt any instant, ΔG = ΔG° + RT ln Q. The reaction proceeds toward equilibrium, where Q = K and ΔG = 0. Use this equation to determine whether a reaction is spontaneous at non-standard conditions.\n\nR = 8.314 J/mol·K when ΔG is in J. T must be in K. Watch the ln vs log convention.",
    keyIdeas: [
      "ΔG° = −RT ln K links thermodynamics to equilibrium.",
      "ΔG = ΔG° + RT ln Q.",
      "ΔG = 0 at equilibrium (Q = K).",
      "Watch units: use J with R = 8.314, or kJ with R = 0.008314.",
    ],
    workedExample: {
      prompt:
        "At 298 K, K = 1.0 × 10⁵ for a reaction. Find ΔG°.",
      solution:
        "ΔG° = −RT ln K = −(8.314)(298) ln(10⁵) = −8.314 × 298 × 11.51 ≈ −28,500 J/mol = −28.5 kJ/mol. Strongly spontaneous.",
    },
    commonMistakes: [
      "Using log instead of ln.",
      "Dropping the negative sign.",
      "Mixing J and kJ without converting.",
    ],
  },
  "9.6": {
    id: "9.6",
    title: "Coupled Reactions",
    summary:
      "A non-spontaneous reaction (ΔG > 0) can be driven by coupling it to a strongly spontaneous one (ΔG < 0).",
    lesson:
      "If a reaction has ΔG > 0, it doesn't proceed on its own. But if you couple it to another reaction with ΔG negative and larger in magnitude, the net ΔG is negative and both together proceed.\n\nBiological example: ATP hydrolysis (ΔG° ≈ −30.5 kJ/mol) powers endergonic steps in metabolism by coupling — e.g., glucose phosphorylation in glycolysis. Chemistry example: industrial processes use catalysts or high T to drive one reaction and couple its products into the next.\n\nMechanism: the two reactions must share a common intermediate (like ATP/ADP-Pᵢ in biology) so that their ΔG's simply add when written as a sum.",
    keyIdeas: [
      "Couple ΔG-positive with ΔG-negative so net ΔG < 0.",
      "A shared intermediate is the coupling mechanism.",
      "ATP hydrolysis is the universal biological coupling partner.",
      "Net ΔG = sum of ΔG's for the coupled steps.",
    ],
    commonMistakes: [
      "Adding ΔG's without checking for a common intermediate.",
      "Forgetting to multiply step ΔGs by stoichiometric factors.",
      "Assuming every endergonic biological step uses ATP — some use GTP, NADH, etc.",
    ],
  },
  "9.7": {
    id: "9.7",
    title: "Galvanic (Voltaic) and Electrolytic Cells",
    summary:
      "Galvanic cells harness spontaneous redox to produce current; electrolytic cells use current to drive non-spontaneous redox.",
    lesson:
      "A galvanic/voltaic cell has two half-cells connected by a wire (electron flow) and a salt bridge (ion flow for charge balance). The anode is where oxidation occurs (electrons leave); the cathode is where reduction occurs (electrons arrive). Electrons flow anode → cathode in the external wire.\n\nMnemonic: anode = oxidation (both start with vowels); cathode = reduction (both start with consonants). Or AN OX / RED CAT.\n\nElectrolytic cells reverse this: an external power source drives a non-spontaneous reaction (ΔG > 0) by providing electrons. Used in electroplating, aluminum refining, and water splitting. Signs of anode/cathode flip — in an electrolytic cell, the anode is connected to the + terminal (positive) because you're pushing electrons out of it.\n\nCell notation: anode | anode solution || cathode solution | cathode (e.g., Zn | Zn²⁺ || Cu²⁺ | Cu).",
    keyIdeas: [
      "Galvanic: spontaneous; galvanic cell E°_cell > 0.",
      "Electrolytic: non-spontaneous; external power drives reaction.",
      "Anode = oxidation; cathode = reduction. Always.",
      "Salt bridge keeps charges balanced; without it, cell stops.",
    ],
    commonMistakes: [
      "Flipping anode and cathode.",
      "Forgetting that the electron flow in both cells is anode → cathode externally.",
      "Misreading sign conventions in electrolytic cells.",
    ],
  },
  "9.8": {
    id: "9.8",
    title: "Cell Potential and Free Energy",
    summary:
      "E°_cell = E°_cathode − E°_anode; ΔG° = −nFE°_cell links cell voltage to thermodynamics.",
    lesson:
      "Use a table of standard reduction potentials (E° values, in volts). For a cell, identify the half-reaction with more positive E° as the cathode (reduction) and the other as the anode (oxidation). Then E°_cell = E°_cathode − E°_anode. Do not flip the sign of E°_anode when subtracting — the table already reports it as a reduction potential.\n\nΔG° = −nFE°_cell, where n is moles of electrons transferred and F = 96,485 C/mol. Positive E° → negative ΔG° → spontaneous cell (galvanic). Larger E° means more driving force.\n\nLink to K: combining ΔG° = −nFE° and ΔG° = −RT ln K gives E° = (RT/nF) ln K.",
    keyIdeas: [
      "E°_cell = E°_cathode − E°_anode (both reduction potentials; don't flip signs).",
      "ΔG° = −nFE°_cell.",
      "E°_cell > 0 → spontaneous (galvanic).",
      "E° = (RT/nF) ln K links cell voltage to equilibrium.",
    ],
    workedExample: {
      prompt:
        "For Zn | Zn²⁺ || Cu²⁺ | Cu, E°(Cu²⁺/Cu) = +0.34 V, E°(Zn²⁺/Zn) = −0.76 V. Find E°_cell and ΔG° (n = 2).",
      solution:
        "E°_cell = 0.34 − (−0.76) = +1.10 V. ΔG° = −nFE° = −(2)(96,485)(1.10) = −212,000 J/mol = −212 kJ/mol. Spontaneous, as expected for a galvanic cell.",
    },
    commonMistakes: [
      "Flipping the sign of E°_anode when it's already a reduction potential.",
      "Using wrong n for the cell.",
      "Forgetting the negative sign in ΔG° = −nFE°.",
    ],
  },
  "9.9": {
    id: "9.9",
    title: "Cell Potential Under Nonstandard Conditions",
    summary:
      "The Nernst equation adjusts cell potential for concentrations: E = E° − (RT/nF) ln Q.",
    lesson:
      "At non-standard conditions, E = E° − (RT/nF) ln Q, where Q is the reaction quotient in the same direction as the cell reaction. At 298 K, the Nernst equation simplifies to E = E° − (0.0592/n) log Q.\n\nAs the cell runs, reactants are consumed and products build up, raising Q. When Q = K, E = 0 — the battery is dead. Cells at nonstandard conditions can have E very different from E° — concentration cells (where both half-cells have the same species but at different concentrations) rely entirely on this effect, with E° = 0 and E driven by the log(Q) term.",
    keyIdeas: [
      "Nernst: E = E° − (RT/nF) ln Q = E° − (0.0592/n) log Q at 298 K.",
      "At Q = K, E = 0 (battery dead).",
      "Concentration cells: E° = 0; E entirely from log(Q) term.",
      "Increasing reactant or decreasing product concentration raises E.",
    ],
    workedExample: {
      prompt:
        "A Daniell cell (Zn/Cu, E° = 1.10 V, n = 2) has [Zn²⁺] = 1.0 M and [Cu²⁺] = 0.010 M. Find E.",
      solution:
        "Q = [Zn²⁺]/[Cu²⁺] = 1.0/0.010 = 100. E = 1.10 − (0.0592/2) log(100) = 1.10 − 0.0296 × 2 = 1.10 − 0.059 = 1.04 V.",
    },
    commonMistakes: [
      "Using ln instead of log (or vice versa) with the wrong coefficient.",
      "Mixing up Q direction (should match cell reaction).",
      "Forgetting n in the denominator.",
    ],
  },
  "9.10": {
    id: "9.10",
    title: "Electrolysis and Faraday's Law",
    summary:
      "Electrolysis uses current to drive a non-spontaneous reaction; Faraday's law relates charge to moles of product.",
    lesson:
      "Charge Q = I × t (current × time, in coulombs). Moles of electrons = Q / F, where F = 96,485 C/mol. Moles of product = moles of electrons / n, where n is the electrons per product.\n\nThis lets you compute mass deposited, gas volume produced, or current needed for a given rate. Common applications: electroplating, electrorefining of copper, electrolysis of water (H₂ and O₂), chloralkali process, aluminum production (Hall-Héroult).\n\nBe careful about which half-reaction is at which electrode. In electrolysis, current is pushed through, so the direction of the reaction is opposite to the spontaneous galvanic direction. Metals deposit at the cathode; oxidation (often gas evolution) happens at the anode.",
    keyIdeas: [
      "Q = I × t. Moles of e⁻ = Q/F.",
      "Moles of product = moles of e⁻ / n.",
      "Mass = moles × molar mass; use for electroplating calculations.",
      "In electrolysis, metals deposit at cathode; oxidation at anode.",
    ],
    workedExample: {
      prompt:
        "How many grams of Cu are deposited when 2.5 A flows for 1.00 hr in a CuSO₄ electrolysis cell? (Cu²⁺ + 2 e⁻ → Cu).",
      solution:
        "Q = I × t = 2.5 A × 3600 s = 9000 C. Moles e⁻ = 9000 / 96,485 = 0.0933. Moles Cu = 0.0933 / 2 = 0.0466. Mass = 0.0466 × 63.55 = 2.96 g.",
    },
    commonMistakes: [
      "Using minutes or hours for t without converting to seconds.",
      "Forgetting to divide moles of e⁻ by n.",
      "Using wrong molar mass (element vs compound).",
    ],
  },
};
