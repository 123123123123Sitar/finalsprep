/**
 * Official AP Course and Exam Description (CED) unit + topic breakdowns
 * for the science courses. AP Physics 1 and AP Physics 2 use the updated
 * 2024 framework (Physics 1 includes Fluids; Physics 2 moved Waves/Optics).
 *
 * Topic codes and titles track the College Board framework as closely as
 * possible; some have been lightly paraphrased for display clarity.
 *
 * Sources:
 *  - AP Central course pages (apcentral.collegeboard.org)
 *  - Published CED PDFs
 *  - Cross-checks against Khan Academy, Fiveable, and Princeton Review
 */

export type ApTopicLite = { id: string; title: string };
export type ApUnitLite = { number: number; title: string; topics: ApTopicLite[] };

export const SCIENCE_UNITS: Record<string, ApUnitLite[]> = {
  // =========================================================================
  // AP PHYSICS 1: ALGEBRA-BASED (2024 CED, 8 units)
  // =========================================================================
  "ap-physics-1": [
    {
      number: 1,
      title: "Kinematics",
      topics: [
        { id: "1.1", title: "Position, Velocity, and Acceleration" },
        { id: "1.2", title: "Representations of Motion" },
      ],
    },
    {
      number: 2,
      title: "Force and Translational Dynamics",
      topics: [
        { id: "2.1", title: "Systems and Center of Mass" },
        { id: "2.2", title: "Forces and Free-Body Diagrams" },
        { id: "2.3", title: "Newton's Third Law" },
        { id: "2.4", title: "Newton's First Law" },
        { id: "2.5", title: "Newton's Second Law" },
        { id: "2.6", title: "Gravitational Force" },
        { id: "2.7", title: "Kinetic and Static Friction" },
        { id: "2.8", title: "Spring Forces" },
        { id: "2.9", title: "Circular Motion" },
      ],
    },
    {
      number: 3,
      title: "Work, Energy, and Power",
      topics: [
        { id: "3.1", title: "Translational Kinetic Energy" },
        { id: "3.2", title: "Work" },
        { id: "3.3", title: "Potential Energy" },
        { id: "3.4", title: "Conservation of Energy" },
        { id: "3.5", title: "Power" },
      ],
    },
    {
      number: 4,
      title: "Linear Momentum",
      topics: [
        { id: "4.1", title: "Linear Momentum" },
        { id: "4.2", title: "Change in Momentum and Impulse" },
        { id: "4.3", title: "Conservation of Linear Momentum" },
        { id: "4.4", title: "Elastic and Inelastic Collisions" },
      ],
    },
    {
      number: 5,
      title: "Torque and Rotational Dynamics",
      topics: [
        { id: "5.1", title: "Rotational Kinematics" },
        { id: "5.2", title: "Connecting Linear and Rotational Motion" },
        { id: "5.3", title: "Torque" },
        { id: "5.4", title: "Rotational Inertia" },
        { id: "5.5", title: "Rotational Equilibrium and Newton's First Law in Rotational Form" },
        { id: "5.6", title: "Newton's Second Law in Rotational Form" },
      ],
    },
    {
      number: 6,
      title: "Energy and Momentum of Rotating Systems",
      topics: [
        { id: "6.1", title: "Rotational Kinetic Energy" },
        { id: "6.2", title: "Torque and Work" },
        { id: "6.3", title: "Angular Momentum and Angular Impulse" },
        { id: "6.4", title: "Conservation of Angular Momentum" },
        { id: "6.5", title: "Rolling" },
        { id: "6.6", title: "Motion of Orbiting Satellites" },
      ],
    },
    {
      number: 7,
      title: "Oscillations",
      topics: [
        { id: "7.1", title: "Defining Simple Harmonic Motion" },
        { id: "7.2", title: "Frequency and Period of Simple Harmonic Motion" },
        { id: "7.3", title: "Representing and Analyzing Simple Harmonic Motion" },
        { id: "7.4", title: "Energy of Simple Harmonic Oscillators" },
      ],
    },
    {
      number: 8,
      title: "Fluids",
      topics: [
        { id: "8.1", title: "Internal Structure and Density" },
        { id: "8.2", title: "Pressure" },
        { id: "8.3", title: "Fluids and Newton's Laws" },
        { id: "8.4", title: "Fluids and Conservation Laws" },
      ],
    },
  ],

  // =========================================================================
  // AP PHYSICS 2: ALGEBRA-BASED (2024 CED, 7 units)
  // =========================================================================
  "ap-physics-2": [
    {
      number: 1,
      title: "Thermodynamics",
      topics: [
        { id: "1.1", title: "Thermodynamic Systems" },
        { id: "1.2", title: "Pressure, Thermal Equilibrium, and the Ideal Gas Law" },
        { id: "1.3", title: "Thermodynamics and Forces" },
        { id: "1.4", title: "Thermodynamics and Free-Body Diagrams" },
        { id: "1.5", title: "Thermodynamics and Contact Forces" },
        { id: "1.6", title: "Heat and Energy Transfer" },
        { id: "1.7", title: "Internal Energy and Temperature" },
        { id: "1.8", title: "Thermodynamics and Collisions" },
        { id: "1.9", title: "Probability, Thermal Equilibrium, and Entropy" },
        { id: "1.10", title: "Thermodynamics and Elastic Collisions: Conservation of Kinetic Energy" },
        { id: "1.11", title: "Thermodynamics and Inelastic Collisions" },
      ],
    },
    {
      number: 2,
      title: "Electric Force, Field, and Potential",
      topics: [
        { id: "2.1", title: "Electric Systems and Charge" },
        { id: "2.2", title: "Conservation of Electric Charge" },
        { id: "2.3", title: "Charge Distribution: Friction, Conduction, and Induction" },
        { id: "2.4", title: "Electric Permittivity" },
        { id: "2.5", title: "Electric Forces and Free-Body Diagrams" },
        { id: "2.6", title: "Gravitational and Electromagnetic Forces" },
        { id: "2.7", title: "Vector and Scalar Fields" },
        { id: "2.8", title: "Electric Charges and Fields" },
        { id: "2.9", title: "Isolines and Electric Fields" },
        { id: "2.10", title: "Conservation of Electric Energy" },
      ],
    },
    {
      number: 3,
      title: "Electric Circuits",
      topics: [
        { id: "3.1", title: "Definition and Conservation of Electric Charge" },
        { id: "3.2", title: "Resistivity and Resistance" },
        { id: "3.3", title: "Resistance and Capacitance" },
        { id: "3.4", title: "Kirchhoff's Loop Rule" },
        { id: "3.5", title: "Kirchhoff's Junction Rule and the Conservation of Electric Charge" },
      ],
    },
    {
      number: 4,
      title: "Magnetism and Electromagnetic Induction",
      topics: [
        { id: "4.1", title: "Magnetic Systems" },
        { id: "4.2", title: "Magnetic Permeability and Magnetic Dipole Moment" },
        { id: "4.3", title: "Vector and Scalar Fields" },
        { id: "4.4", title: "Monopole and Dipole Fields" },
        { id: "4.5", title: "Magnetic Fields and Forces" },
        { id: "4.6", title: "Forces Review" },
        { id: "4.7", title: "Magnetic Flux" },
      ],
    },
    {
      number: 5,
      title: "Geometric Optics",
      topics: [
        { id: "5.1", title: "Waves and Fields" },
        { id: "5.2", title: "Changes in Wave Properties" },
        { id: "5.3", title: "Geometric Optics" },
      ],
    },
    {
      number: 6,
      title: "Waves, Sound, and Physical Optics",
      topics: [
        { id: "6.1", title: "Periodic Waves" },
        { id: "6.2", title: "Interference and Superposition (Waves in Tubes and on Strings)" },
        { id: "6.3", title: "Interference and Superposition" },
        { id: "6.4", title: "Doppler Effect" },
        { id: "6.5", title: "Electromagnetic Waves" },
      ],
    },
    {
      number: 7,
      title: "Modern Physics",
      topics: [
        { id: "7.1", title: "Systems and Fundamental Forces" },
        { id: "7.2", title: "Radioactive Decay" },
        { id: "7.3", title: "Energy in Modern Physics (Nuclear and Mass Energy)" },
        { id: "7.4", title: "Mass-Energy Equivalence" },
        { id: "7.5", title: "Properties of Waves and Particles" },
        { id: "7.6", title: "Photoelectric Effect" },
        { id: "7.7", title: "Wave Functions and Probability" },
      ],
    },
  ],

  // =========================================================================
  // AP PHYSICS C: MECHANICS (7 units, 2024 CED)
  // =========================================================================
  "ap-physics-c-mech": [
    {
      number: 1,
      title: "Kinematics",
      topics: [
        { id: "1.1", title: "Scalars and Vectors in One Dimension" },
        { id: "1.2", title: "Displacement, Velocity, and Acceleration" },
        { id: "1.3", title: "Representing Motion" },
        { id: "1.4", title: "Reference Frames and Relative Motion" },
        { id: "1.5", title: "Vectors and Motion in Two Dimensions" },
      ],
    },
    {
      number: 2,
      title: "Force and Translational Dynamics",
      topics: [
        { id: "2.1", title: "Systems and Center of Mass" },
        { id: "2.2", title: "Forces and Free-Body Diagrams" },
        { id: "2.3", title: "Newton's Third Law" },
        { id: "2.4", title: "Newton's First Law" },
        { id: "2.5", title: "Newton's Second Law" },
        { id: "2.6", title: "Gravitational Force" },
        { id: "2.7", title: "Kinetic and Static Friction" },
        { id: "2.8", title: "Spring Forces" },
        { id: "2.9", title: "Resistive Forces" },
        { id: "2.10", title: "Circular Motion" },
      ],
    },
    {
      number: 3,
      title: "Work, Energy, and Power",
      topics: [
        { id: "3.1", title: "Translational Kinetic Energy" },
        { id: "3.2", title: "Work" },
        { id: "3.3", title: "Potential Energy" },
        { id: "3.4", title: "Conservation of Energy" },
        { id: "3.5", title: "Power" },
      ],
    },
    {
      number: 4,
      title: "Linear Momentum",
      topics: [
        { id: "4.1", title: "Linear Momentum" },
        { id: "4.2", title: "Change in Momentum and Impulse" },
        { id: "4.3", title: "Conservation of Linear Momentum" },
        { id: "4.4", title: "Elastic and Inelastic Collisions" },
      ],
    },
    {
      number: 5,
      title: "Torque and Rotational Dynamics",
      topics: [
        { id: "5.1", title: "Rotational Kinematics" },
        { id: "5.2", title: "Connecting Linear and Rotational Motion" },
        { id: "5.3", title: "Torque" },
        { id: "5.4", title: "Rotational Inertia" },
        { id: "5.5", title: "Rotational Equilibrium" },
        { id: "5.6", title: "Newton's Second Law in Rotational Form" },
      ],
    },
    {
      number: 6,
      title: "Energy and Momentum of Rotating Systems",
      topics: [
        { id: "6.1", title: "Rotational Kinetic Energy" },
        { id: "6.2", title: "Torque and Work" },
        { id: "6.3", title: "Angular Momentum and Angular Impulse" },
        { id: "6.4", title: "Conservation of Angular Momentum" },
        { id: "6.5", title: "Rolling" },
        { id: "6.6", title: "Motion of Orbiting Satellites" },
      ],
    },
    {
      number: 7,
      title: "Oscillations",
      topics: [
        { id: "7.1", title: "Defining Simple Harmonic Motion (SHM)" },
        { id: "7.2", title: "Frequency and Period of SHM" },
        { id: "7.3", title: "Representing and Analyzing SHM" },
        { id: "7.4", title: "Energy of Simple Harmonic Oscillators" },
      ],
    },
  ],

  // =========================================================================
  // AP PHYSICS C: ELECTRICITY & MAGNETISM (5 units)
  // =========================================================================
  "ap-physics-c-em": [
    {
      number: 1,
      title: "Electrostatics",
      topics: [
        { id: "1.1", title: "Electric Charge" },
        { id: "1.2", title: "Coulomb's Law" },
        { id: "1.3", title: "Electric Field" },
        { id: "1.4", title: "Electric Field Due to Continuous Charge Distributions" },
        { id: "1.5", title: "Gauss's Law" },
        { id: "1.6", title: "Electric Potential Energy" },
        { id: "1.7", title: "Electric Potential" },
      ],
    },
    {
      number: 2,
      title: "Conductors, Capacitors, Dielectrics",
      topics: [
        { id: "2.1", title: "Conductors and Insulators" },
        { id: "2.2", title: "Capacitance" },
        { id: "2.3", title: "Parallel-Plate Capacitors and Dielectrics" },
        { id: "2.4", title: "Energy Stored in Capacitors" },
        { id: "2.5", title: "Capacitors in Series and Parallel" },
      ],
    },
    {
      number: 3,
      title: "Electric Circuits",
      topics: [
        { id: "3.1", title: "Current, Resistance, and Power" },
        { id: "3.2", title: "Steady-State Direct Current Circuits with Batteries and Resistors" },
        { id: "3.3", title: "Capacitors in Circuits" },
        { id: "3.4", title: "RC Circuits" },
      ],
    },
    {
      number: 4,
      title: "Magnetic Fields",
      topics: [
        { id: "4.1", title: "Forces on Moving Charges in Magnetic Fields" },
        { id: "4.2", title: "Forces on Current-Carrying Wires" },
        { id: "4.3", title: "Magnetic Fields Due to Current-Carrying Wires and Other Symmetric Configurations" },
        { id: "4.4", title: "Biot-Savart Law and Ampère's Law" },
      ],
    },
    {
      number: 5,
      title: "Electromagnetism",
      topics: [
        { id: "5.1", title: "Electromagnetic Induction (Faraday's Law and Lenz's Law)" },
        { id: "5.2", title: "Inductance, Including LR and LC Circuits" },
        { id: "5.3", title: "Maxwell's Equations" },
      ],
    },
  ],

  // =========================================================================
  // AP BIOLOGY (8 units)
  // =========================================================================
  // Verified against AP Biology CED (V.1, 2024-25 revision):
  // https://apcentral.collegeboard.org/media/pdf/ap-biology-course-and-exam-description.pdf
  "ap-biology": [
    {
      number: 1,
      title: "Chemistry of Life",
      topics: [
        { id: "1.1", title: "Structure of Water and Hydrogen Bonding" },
        { id: "1.2", title: "Elements of Life" },
        { id: "1.3", title: "Introduction to Macromolecules" },
        { id: "1.4", title: "Carbohydrates" },
        { id: "1.5", title: "Lipids" },
        { id: "1.6", title: "Nucleic Acids" },
        { id: "1.7", title: "Proteins" },
      ],
    },
    {
      number: 2,
      title: "Cell Structure and Function",
      topics: [
        { id: "2.1", title: "Cell Structure and Function" },
        { id: "2.2", title: "Cell Size" },
        { id: "2.3", title: "Plasma Membrane" },
        { id: "2.4", title: "Membrane Permeability" },
        { id: "2.5", title: "Membrane Transport" },
        { id: "2.6", title: "Facilitated Diffusion" },
        { id: "2.7", title: "Tonicity and Osmoregulation" },
        { id: "2.8", title: "Mechanisms of Transport" },
        { id: "2.9", title: "Cell Compartmentalization" },
        { id: "2.10", title: "Origins of Cell Compartmentalization" },
      ],
    },
    {
      number: 3,
      title: "Cellular Energetics",
      topics: [
        { id: "3.1", title: "Enzymes" },
        { id: "3.2", title: "Environmental Impacts on Enzyme Function" },
        { id: "3.3", title: "Cellular Energy" },
        { id: "3.4", title: "Photosynthesis" },
        { id: "3.5", title: "Cellular Respiration" },
      ],
    },
    {
      number: 4,
      title: "Cell Communication and Cell Cycle",
      topics: [
        { id: "4.1", title: "Cell Communication" },
        { id: "4.2", title: "Introduction to Signal Transduction" },
        { id: "4.3", title: "Signal Transduction Pathways" },
        { id: "4.4", title: "Feedback" },
        { id: "4.5", title: "Cell Cycle" },
        { id: "4.6", title: "Regulation of Cell Cycle" },
      ],
    },
    {
      number: 5,
      title: "Heredity",
      topics: [
        { id: "5.1", title: "Meiosis" },
        { id: "5.2", title: "Meiosis and Genetic Diversity" },
        { id: "5.3", title: "Mendelian Genetics" },
        { id: "5.4", title: "Non-Mendelian Genetics" },
        { id: "5.5", title: "Environmental Effects on Phenotype" },
      ],
    },
    {
      number: 6,
      title: "Gene Expression and Regulation",
      topics: [
        { id: "6.1", title: "DNA and RNA Structure" },
        { id: "6.2", title: "DNA Replication" },
        { id: "6.3", title: "Transcription and RNA Processing" },
        { id: "6.4", title: "Translation" },
        { id: "6.5", title: "Regulation of Gene Expression" },
        { id: "6.6", title: "Gene Expression and Cell Specialization" },
        { id: "6.7", title: "Mutations" },
        { id: "6.8", title: "Biotechnology" },
      ],
    },
    {
      number: 7,
      title: "Natural Selection",
      topics: [
        { id: "7.1", title: "Introduction to Natural Selection" },
        { id: "7.2", title: "Natural Selection" },
        { id: "7.3", title: "Artificial Selection" },
        { id: "7.4", title: "Population Genetics" },
        { id: "7.5", title: "Hardy–Weinberg Equilibrium" },
        { id: "7.6", title: "Evidence of Evolution" },
        { id: "7.7", title: "Common Ancestry" },
        { id: "7.8", title: "Continuing Evolution" },
        { id: "7.9", title: "Phylogeny" },
        { id: "7.10", title: "Speciation" },
        { id: "7.11", title: "Variations in Populations" },
        { id: "7.12", title: "Origins of Life on Earth" },
      ],
    },
    {
      number: 8,
      title: "Ecology",
      topics: [
        { id: "8.1", title: "Responses to the Environment" },
        { id: "8.2", title: "Energy Flow Through Ecosystems" },
        { id: "8.3", title: "Population Ecology" },
        { id: "8.4", title: "Effect of Density on Populations" },
        { id: "8.5", title: "Community Ecology" },
        { id: "8.6", title: "Biodiversity" },
        { id: "8.7", title: "Disruptions in Ecosystems" },
      ],
    },
  ],

  // =========================================================================
  // AP CHEMISTRY (9 units)
  // =========================================================================
  "ap-chemistry": [
    {
      number: 1,
      title: "Atomic Structure and Properties",
      topics: [
        { id: "1.1", title: "Moles and Molar Mass" },
        { id: "1.2", title: "Mass Spectroscopy of Elements" },
        { id: "1.3", title: "Elemental Composition of Pure Substances" },
        { id: "1.4", title: "Composition of Mixtures" },
        { id: "1.5", title: "Atomic Structure and Electron Configuration" },
        { id: "1.6", title: "Photoelectron Spectroscopy" },
        { id: "1.7", title: "Periodic Trends" },
        { id: "1.8", title: "Valence Electrons and Ionic Compounds" },
      ],
    },
    {
      number: 2,
      title: "Molecular and Ionic Compound Structure and Properties",
      topics: [
        { id: "2.1", title: "Types of Chemical Bonds" },
        { id: "2.2", title: "Intramolecular Force and Potential Energy" },
        { id: "2.3", title: "Structure of Ionic Solids" },
        { id: "2.4", title: "Structure of Metals and Alloys" },
        { id: "2.5", title: "Lewis Diagrams" },
        { id: "2.6", title: "Resonance and Formal Charge" },
        { id: "2.7", title: "VSEPR and Bond Hybridization" },
      ],
    },
    {
      number: 3,
      title: "Intermolecular Forces and Properties",
      topics: [
        { id: "3.1", title: "Intermolecular Forces" },
        { id: "3.2", title: "Properties of Solids" },
        { id: "3.3", title: "Solids, Liquids, and Gases" },
        { id: "3.4", title: "Ideal Gas Law" },
        { id: "3.5", title: "Kinetic Molecular Theory" },
        { id: "3.6", title: "Deviation from Ideal Gas Law" },
        { id: "3.7", title: "Solutions and Mixtures" },
        { id: "3.8", title: "Representations of Solutions" },
        { id: "3.9", title: "Separation of Solutions and Mixtures (Chromatography)" },
        { id: "3.10", title: "Solubility" },
        { id: "3.11", title: "Spectroscopy and the Electromagnetic Spectrum" },
        { id: "3.12", title: "Photoelectric Effect" },
        { id: "3.13", title: "Beer-Lambert Law" },
      ],
    },
    {
      number: 4,
      title: "Chemical Reactions",
      topics: [
        { id: "4.1", title: "Introduction for Reactions" },
        { id: "4.2", title: "Net Ionic Equations" },
        { id: "4.3", title: "Representations of Reactions" },
        { id: "4.4", title: "Physical and Chemical Changes" },
        { id: "4.5", title: "Stoichiometry" },
        { id: "4.6", title: "Introduction to Titration" },
        { id: "4.7", title: "Types of Chemical Reactions" },
        { id: "4.8", title: "Introduction to Acid-Base Reactions" },
        { id: "4.9", title: "Oxidation-Reduction (Redox) Reactions" },
      ],
    },
    {
      number: 5,
      title: "Kinetics",
      topics: [
        { id: "5.1", title: "Reaction Rate" },
        { id: "5.2", title: "Introduction to Rate Law" },
        { id: "5.3", title: "Concentration Changes Over Time" },
        { id: "5.4", title: "Elementary Reactions" },
        { id: "5.5", title: "Collision Model" },
        { id: "5.6", title: "Reaction Energy Profile" },
        { id: "5.7", title: "Introduction to Reaction Mechanisms" },
        { id: "5.8", title: "Reaction Mechanism and Rate Law" },
        { id: "5.9", title: "Steady-State Approximation" },
        { id: "5.10", title: "Multistep Reaction Energy Profile" },
        { id: "5.11", title: "Catalysis" },
      ],
    },
    {
      number: 6,
      title: "Thermodynamics",
      topics: [
        { id: "6.1", title: "Endothermic and Exothermic Processes" },
        { id: "6.2", title: "Energy Diagrams" },
        { id: "6.3", title: "Heat Transfer and Thermal Equilibrium" },
        { id: "6.4", title: "Heat Capacity and Calorimetry" },
        { id: "6.5", title: "Energy of Phase Changes" },
        { id: "6.6", title: "Introduction to Enthalpy of Reaction" },
        { id: "6.7", title: "Bond Enthalpies" },
        { id: "6.8", title: "Enthalpy of Formation" },
        { id: "6.9", title: "Hess's Law" },
      ],
    },
    {
      number: 7,
      title: "Equilibrium",
      topics: [
        { id: "7.1", title: "Introduction to Equilibrium" },
        { id: "7.2", title: "Direction of Reversible Reactions" },
        { id: "7.3", title: "Reaction Quotient and Equilibrium Constant" },
        { id: "7.4", title: "Calculating the Equilibrium Constant" },
        { id: "7.5", title: "Magnitude of the Equilibrium Constant" },
        { id: "7.6", title: "Properties of the Equilibrium Constant" },
        { id: "7.7", title: "Calculating Equilibrium Concentrations" },
        { id: "7.8", title: "Representations of Equilibrium" },
        { id: "7.9", title: "Introduction to Le Châtelier's Principle" },
        { id: "7.10", title: "Reaction Quotient and Le Châtelier's Principle" },
        { id: "7.11", title: "Introduction to Solubility Equilibria" },
        { id: "7.12", title: "Common-Ion Effect" },
        { id: "7.13", title: "pH and Solubility" },
        { id: "7.14", title: "Free Energy of Dissolution" },
      ],
    },
    {
      number: 8,
      title: "Acids and Bases",
      topics: [
        { id: "8.1", title: "Introduction to Acids and Bases" },
        { id: "8.2", title: "pH and pOH of Strong Acids and Bases" },
        { id: "8.3", title: "Weak Acid and Base Equilibria" },
        { id: "8.4", title: "Acid-Base Reactions and Buffers" },
        { id: "8.5", title: "Acid-Base Titrations" },
        { id: "8.6", title: "Molecular Structure of Acids and Bases" },
        { id: "8.7", title: "pH and pKa" },
        { id: "8.8", title: "Properties of Buffers" },
        { id: "8.9", title: "Henderson-Hasselbalch Equation" },
        { id: "8.10", title: "Buffer Capacity" },
      ],
    },
    {
      number: 9,
      title: "Applications of Thermodynamics",
      topics: [
        { id: "9.1", title: "Introduction to Entropy" },
        { id: "9.2", title: "Absolute Entropy and Entropy Change" },
        { id: "9.3", title: "Gibbs Free Energy and Thermodynamic Favorability" },
        { id: "9.4", title: "Thermodynamic and Kinetic Control" },
        { id: "9.5", title: "Free Energy and Equilibrium" },
        { id: "9.6", title: "Coupled Reactions" },
        { id: "9.7", title: "Galvanic (Voltaic) and Electrolytic Cells" },
        { id: "9.8", title: "Cell Potential and Free Energy" },
        { id: "9.9", title: "Cell Potential Under Nonstandard Conditions" },
        { id: "9.10", title: "Electrolysis and Faraday's Law" },
      ],
    },
  ],

  // =========================================================================
  // AP ENVIRONMENTAL SCIENCE (9 units)
  // =========================================================================
  "ap-environmental": [
    {
      number: 1,
      title: "The Living World: Ecosystems",
      topics: [
        { id: "1.1", title: "Introduction to Ecosystems" },
        { id: "1.2", title: "Terrestrial Biomes" },
        { id: "1.3", title: "Aquatic Biomes" },
        { id: "1.4", title: "The Carbon Cycle" },
        { id: "1.5", title: "The Nitrogen Cycle" },
        { id: "1.6", title: "The Phosphorus Cycle" },
        { id: "1.7", title: "The Hydrologic (Water) Cycle" },
        { id: "1.8", title: "Primary Productivity" },
        { id: "1.9", title: "Trophic Levels" },
        { id: "1.10", title: "Energy Flow and the 10% Rule" },
        { id: "1.11", title: "Food Chains and Food Webs" },
      ],
    },
    {
      number: 2,
      title: "The Living World: Biodiversity",
      topics: [
        { id: "2.1", title: "Introduction to Biodiversity" },
        { id: "2.2", title: "Ecosystem Services" },
        { id: "2.3", title: "Island Biogeography" },
        { id: "2.4", title: "Ecological Tolerance" },
        { id: "2.5", title: "Natural Disruptions to Ecosystems" },
        { id: "2.6", title: "Adaptations" },
        { id: "2.7", title: "Ecological Succession" },
      ],
    },
    {
      number: 3,
      title: "Populations",
      topics: [
        { id: "3.1", title: "Generalist and Specialist Species" },
        { id: "3.2", title: "K-Selected and r-Selected Species" },
        { id: "3.3", title: "Survivorship Curves" },
        { id: "3.4", title: "Carrying Capacity" },
        { id: "3.5", title: "Population Growth and Resource Availability" },
        { id: "3.6", title: "Age Structure Diagrams" },
        { id: "3.7", title: "Total Fertility Rate" },
        { id: "3.8", title: "Human Population Dynamics" },
        { id: "3.9", title: "Demographic Transition" },
      ],
    },
    {
      number: 4,
      title: "Earth Systems and Resources",
      topics: [
        { id: "4.1", title: "Plate Tectonics" },
        { id: "4.2", title: "Soil Formation and Erosion" },
        { id: "4.3", title: "Soil Composition and Properties" },
        { id: "4.4", title: "Earth's Atmosphere" },
        { id: "4.5", title: "Global Wind Patterns" },
        { id: "4.6", title: "Watersheds" },
        { id: "4.7", title: "Solar Radiation and Earth's Seasons" },
        { id: "4.8", title: "Earth's Geography and Climate" },
        { id: "4.9", title: "El Niño and La Niña" },
      ],
    },
    {
      number: 5,
      title: "Land and Water Use",
      topics: [
        { id: "5.1", title: "The Tragedy of the Commons" },
        { id: "5.2", title: "Clearcutting" },
        { id: "5.3", title: "The Green Revolution" },
        { id: "5.4", title: "Impacts of Agricultural Practices" },
        { id: "5.5", title: "Irrigation Methods" },
        { id: "5.6", title: "Pest Control Methods" },
        { id: "5.7", title: "Meat Production Methods" },
        { id: "5.8", title: "Impacts of Overfishing" },
        { id: "5.9", title: "Impacts of Mining" },
        { id: "5.10", title: "Impacts of Urbanization" },
        { id: "5.11", title: "Ecological Footprints" },
        { id: "5.12", title: "Introduction to Sustainability" },
        { id: "5.13", title: "Methods to Reduce Urban Runoff" },
        { id: "5.14", title: "Integrated Pest Management" },
        { id: "5.15", title: "Sustainable Agriculture" },
        { id: "5.16", title: "Aquaculture" },
        { id: "5.17", title: "Sustainable Forestry" },
      ],
    },
    {
      number: 6,
      title: "Energy Resources and Consumption",
      topics: [
        { id: "6.1", title: "Renewable and Nonrenewable Resources" },
        { id: "6.2", title: "Global Energy Consumption" },
        { id: "6.3", title: "Fuel Types and Uses" },
        { id: "6.4", title: "Distribution of Natural Energy Resources" },
        { id: "6.5", title: "Fossil Fuels" },
        { id: "6.6", title: "Nuclear Power" },
        { id: "6.7", title: "Energy from Biomass" },
        { id: "6.8", title: "Solar Energy" },
        { id: "6.9", title: "Hydroelectric Power" },
        { id: "6.10", title: "Geothermal Energy" },
        { id: "6.11", title: "Hydrogen Fuel Cell" },
        { id: "6.12", title: "Wind Energy" },
        { id: "6.13", title: "Energy Conservation" },
      ],
    },
    {
      number: 7,
      title: "Atmospheric Pollution",
      topics: [
        { id: "7.1", title: "Introduction to Air Pollution" },
        { id: "7.2", title: "Photochemical Smog" },
        { id: "7.3", title: "Thermal Inversion" },
        { id: "7.4", title: "Atmospheric CO2 and Particulates" },
        { id: "7.5", title: "Indoor Air Pollutants" },
        { id: "7.6", title: "Reduction of Air Pollutants" },
        { id: "7.7", title: "Acid Rain" },
        { id: "7.8", title: "Noise Pollution" },
      ],
    },
    {
      number: 8,
      title: "Aquatic and Terrestrial Pollution",
      topics: [
        { id: "8.1", title: "Sources of Pollution" },
        { id: "8.2", title: "Human Impacts on Ecosystems" },
        { id: "8.3", title: "Endocrine Disruptors" },
        { id: "8.4", title: "Human Impacts on Wetlands and Mangroves" },
        { id: "8.5", title: "Eutrophication" },
        { id: "8.6", title: "Thermal Pollution" },
        { id: "8.7", title: "Persistent Organic Pollutants (POPs)" },
        { id: "8.8", title: "Bioaccumulation and Biomagnification" },
        { id: "8.9", title: "Solid Waste Disposal" },
        { id: "8.10", title: "Waste Reduction Methods" },
        { id: "8.11", title: "Sewage Treatment" },
        { id: "8.12", title: "Lethal Dose 50% (LD50)" },
        { id: "8.13", title: "Dose Response Curve" },
        { id: "8.14", title: "Pollution and Human Health" },
        { id: "8.15", title: "Pathogens and Infectious Diseases" },
      ],
    },
    {
      number: 9,
      title: "Global Change",
      topics: [
        { id: "9.1", title: "Stratospheric Ozone Depletion" },
        { id: "9.2", title: "Reducing Ozone Depletion" },
        { id: "9.3", title: "The Greenhouse Effect" },
        { id: "9.4", title: "Increases in the Greenhouse Gases" },
        { id: "9.5", title: "Global Climate Change" },
        { id: "9.6", title: "Ocean Warming" },
        { id: "9.7", title: "Ocean Acidification" },
        { id: "9.8", title: "Invasive Species" },
        { id: "9.9", title: "Endangered Species" },
        { id: "9.10", title: "Human Impacts on Biodiversity" },
      ],
    },
  ],
};
