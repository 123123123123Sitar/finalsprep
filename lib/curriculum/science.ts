import type { CourseCurriculum } from "./types";

export const SCIENCE_CURRICULUM: Record<string, CourseCurriculum> = {
  // =========================================================================
  // AP PHYSICS 1
  // =========================================================================
  "ap-physics-1": {
    courseSlug: "ap-physics-1",
    examFormat: {
      length: "3 hours",
      structure:
        "40 MCQ (80 min) + 4 FRQ (100 min, one is experimental design, one is a qualitative/quantitative translation). Calculator allowed throughout.",
      scoring:
        "MCQ is 50%, FRQ is 50%. The historical pass rate hovers around 45%, making it one of the toughest AP exams because the course is taken earlier and students underestimate it.",
    },
    framing:
      "AP Physics 1 teaches you to reason about physical systems using a small number of conservation laws and force diagrams. It's notoriously the lowest-scoring AP exam because students try to memorize formulas instead of learning to draw free-body diagrams and track energy/momentum transfers. The course rewards conceptual fluency over computation; treat it as a physics reasoning class, not a math class.",
    units: [
      {
        unitNumber: 1,
        title: "Kinematics",
        overview:
          "Describing motion without worrying about the forces that cause it. Position, velocity, acceleration, and how they relate. Projectile motion in 2D.",
        examWeight: "10-15%",
        bigIdeas: [
          "Velocity is the derivative of position; acceleration is the derivative of velocity.",
          "Four kinematic equations apply ONLY when acceleration is constant.",
          "Horizontal and vertical motion in projectiles are independent.",
          "At the peak of a projectile's trajectory, vertical velocity is zero (not the whole velocity).",
          "Graphs: slope of position-time = velocity; slope of velocity-time = acceleration; area under v-t = displacement.",
        ],
        essentials: [
          {
            heading: "Position, velocity, acceleration",
            body: "Position x(t) is measured from an origin. Velocity v(t) = dx/dt is the rate of change of position. Acceleration a(t) = dv/dt is the rate of change of velocity. Signs indicate direction in 1D.",
          },
          {
            heading: "Kinematic equations (constant a)",
            body: "v = v₀ + at. x = x₀ + v₀t + (1/2)at². v² = v₀² + 2a(x - x₀). x = x₀ + (1/2)(v₀ + v)t. Pick the equation missing the unknown you don't care about.",
          },
          {
            heading: "Projectile motion",
            body: "Horizontal: constant velocity v_x = v₀cos θ. Vertical: initial velocity v_y₀ = v₀sin θ, acceleration -g. Time of flight depends on vertical motion alone.",
          },
          {
            heading: "Motion graphs",
            body: "x-t graph: slope is v, concavity is sign of a. v-t graph: slope is a, area under curve is Δx. a-t graph: area under curve is Δv.",
          },
        ],
        keyFacts: [
          "g ≈ 9.8 m/s² (often approximated as 10 for mental math).",
          "At the top of a projectile's arc, v_y = 0 but v_x is unchanged.",
          "Displacement can be zero even with large distance traveled.",
        ],
        commonMistakes: [
          "Using kinematic equations when acceleration isn't constant.",
          "Mixing horizontal and vertical components in projectile motion.",
          "Thinking v = 0 at the peak means acceleration is 0 (it's still -g).",
          "Confusing displacement with distance.",
        ],
        examStrategy:
          "Always identify if acceleration is constant before applying kinematic equations. On projectile problems, treat x and y independently. On graph problems, translate between position, velocity, and acceleration.",
        studyTips: [
          "Memorize the 4 kinematic equations and their missing-variable hints.",
          "Practice reading motion graphs: 20 problems across position, velocity, acceleration.",
          "Drill projectile motion with different launch angles.",
          "Sketch v-t graphs for scenarios (car accelerating, ball bouncing, etc.).",
        ],
      },
      {
        unitNumber: 2,
        title: "Force & Translational Dynamics",
        overview:
          "Newton's laws of motion, free-body diagrams, friction, gravitational force, spring forces, and uniform circular motion.",
        examWeight: "16-20%",
        bigIdeas: [
          "Newton's 2nd law: F_net = ma. Direction matters.",
          "Free-body diagrams (FBDs) identify every force acting on an object.",
          "Friction: f_k = μ_k·N (kinetic), f_s ≤ μ_s·N (static, up to the max).",
          "Circular motion: centripetal acceleration a_c = v²/r, directed toward the center.",
          "Newton's 3rd law: pairs act on different objects with equal magnitude and opposite direction.",
        ],
        essentials: [
          {
            heading: "Free-body diagrams",
            body: "Isolate one object. Draw every force acting ON it (not BY it). Label forces with vectors. Pick axes aligned with motion (tilt for inclines). Apply F_net = ma in each direction.",
          },
          {
            heading: "Incline problems",
            body: "Tilt axes. Gravity component down the ramp: mg sin θ. Perpendicular to ramp: mg cos θ. Normal force balances mg cos θ (no motion perpendicular to ramp).",
          },
          {
            heading: "Friction",
            body: "Kinetic friction f_k = μ_k·N opposes motion. Static friction ranges from 0 to μ_s·N, taking whatever value keeps the object at rest. Static max is usually larger than kinetic.",
          },
          {
            heading: "Uniform circular motion",
            body: "Speed is constant but direction changes. Net force points toward the center (centripetal). Magnitude: F_c = mv²/r. Source of the centripetal force varies: tension, gravity, friction, normal force.",
          },
          {
            heading: "Newton's 3rd law",
            body: "If A exerts force F on B, B exerts -F on A. The pair acts on DIFFERENT objects, so they don't cancel in a single FBD. Common misconception: 'the table pushes up on the book because the book pushes down on the table'. Actually the table pushes up because of contact forces, not because of Newton's 3rd.",
          },
        ],
        keyFacts: [
          "Weight W = mg (always downward).",
          "Tension in an ideal massless string is the same throughout.",
          "Normal force adjusts to whatever keeps the surface from being compressed.",
          "On a free-body diagram, always account for contact forces (normal, friction, tension) and non-contact forces (gravity).",
        ],
        commonMistakes: [
          "Drawing forces BY the object instead of ON it.",
          "Forgetting that static friction is variable, not always at its max.",
          "Thinking centripetal force is a separate force: it's the NET force in circular motion.",
          "Confusing action-reaction pairs (Newton's 3rd) with equilibrium forces (Newton's 1st).",
        ],
        examStrategy:
          "FRQs always require a clean free-body diagram. Get the FBD right and the rest of the problem is algebra. Apply F_net = ma in each axis separately. On circular motion, be explicit about which force(s) provide the centripetal force.",
        studyTips: [
          "Draw 20 free-body diagrams for different scenarios and check against an answer key.",
          "Practice incline problems with and without friction.",
          "Drill circular motion: tension in a string, car on a curve, ball on a hill.",
          "Memorize the difference between static and kinetic friction.",
        ],
      },
      {
        unitNumber: 3,
        title: "Work, Energy & Power",
        overview:
          "Energy as a conserved quantity. Work-energy theorem, kinetic and potential energy, conservation of mechanical energy.",
        examWeight: "20-28%",
        bigIdeas: [
          "Work: W = F·d·cos θ. Only the component of force along displacement does work.",
          "Kinetic energy: KE = (1/2)mv².",
          "Gravitational PE near Earth: PE_grav = mgh.",
          "Spring PE: PE_spring = (1/2)kx².",
          "Work-energy theorem: W_net = ΔKE.",
          "Conservation of mechanical energy (when only conservative forces do work): KE_i + PE_i = KE_f + PE_f.",
        ],
        essentials: [
          {
            heading: "Work",
            body: "W = F·d·cos θ where θ is the angle between force and displacement. Positive work adds energy to the system; negative work removes energy. Perpendicular forces do zero work.",
          },
          {
            heading: "Kinetic and potential energy",
            body: "KE depends on speed (not velocity direction). PE depends on position. Choose a reference level for PE; the physics doesn't change.",
          },
          {
            heading: "Conservation of energy",
            body: "When only conservative forces act, mechanical energy is conserved. If friction or other non-conservative forces act, mechanical energy decreases by the work done by friction: W_friction = -f·d.",
          },
          {
            heading: "Power",
            body: "P = W/t = F·v (if force is constant). Average vs instantaneous power matters.",
          },
        ],
        keyFacts: [
          "mgh gives PE near Earth's surface; use -GMm/r for general gravitational PE.",
          "For a spring, the reference is the natural length.",
          "1 Joule = 1 N·m = 1 kg·m²/s². 1 Watt = 1 J/s.",
        ],
        commonMistakes: [
          "Using conservation of energy when friction is present without accounting for energy lost.",
          "Forgetting the cos θ in work calculations.",
          "Double-counting work (e.g., computing work done by gravity AND using PE_grav).",
          "Using KE = (1/2)mv² with velocity as a vector: v is the speed.",
        ],
        examStrategy:
          "Energy conservation is often faster than Newton's 2nd law for 'find the speed at the bottom' problems. Always decide between force analysis and energy analysis; they're two tools, not competitors.",
        studyTips: [
          "Solve each free-fall problem with both energy conservation and kinematics; they should match.",
          "Drill energy diagrams (bar charts).",
          "Practice identifying when to use energy vs. force analysis.",
          "Memorize PE formulas for gravity, springs, and general gravitation.",
        ],
      },
      {
        unitNumber: 4,
        title: "Linear Momentum",
        overview:
          "Momentum, impulse, conservation of momentum, elastic vs inelastic collisions.",
        examWeight: "12-18%",
        bigIdeas: [
          "Momentum p = mv (vector).",
          "Impulse J = F·Δt = Δp.",
          "Conservation of momentum: in an isolated system, total momentum is conserved.",
          "Elastic: KE conserved. Inelastic: KE not conserved. Perfectly inelastic: objects stick.",
          "Center of mass moves at constant velocity in the absence of external forces.",
        ],
        essentials: [
          {
            heading: "Momentum and impulse",
            body: "Momentum is mass times velocity: it's a vector. Impulse is the change in momentum, equal to the integral of force over time. For constant force: J = F·Δt.",
          },
          {
            heading: "Conservation of momentum",
            body: "If no external forces act, total momentum is conserved. This holds in every direction separately. For collisions, solve separately in x and y.",
          },
          {
            heading: "Types of collisions",
            body: "Elastic: total KE conserved (like billiard balls). Inelastic: total KE decreases. Perfectly inelastic: objects stick together (max KE loss while conserving momentum).",
          },
          {
            heading: "Center of mass",
            body: "x_cm = (m₁x₁ + m₂x₂)/(m₁ + m₂). For a system with no external forces, v_cm is constant.",
          },
        ],
        keyFacts: [
          "Momentum is a vector. Always check direction (signs in 1D).",
          "KE is scalar. KE_i and KE_f can both be zero.",
          "Impulse equals the area under an F-t graph.",
        ],
        commonMistakes: [
          "Using KE conservation in perfectly inelastic collisions (don't).",
          "Forgetting that momentum is a vector: signs matter in 1D.",
          "Computing impulse without considering force direction.",
          "Assuming energy is conserved in all collisions.",
        ],
        examStrategy:
          "Identify the type of collision first: elastic, inelastic, or perfectly inelastic. Set up conservation of momentum. Decide whether to also use KE conservation.",
        studyTips: [
          "Drill 10 collision problems across types.",
          "Practice 2D collisions with vector components.",
          "Memorize p = mv and J = Δp.",
        ],
      },
      {
        unitNumber: 5,
        title: "Torque & Rotational Dynamics",
        overview:
          "Rotational motion: angular kinematics, torque, rotational inertia, Newton's 2nd law for rotation.",
        examWeight: "10-16%",
        bigIdeas: [
          "Angular quantities: θ, ω, α are the rotational analogs of x, v, a.",
          "Torque τ = r·F·sin θ. It's the 'twist' that causes angular acceleration.",
          "Rotational inertia I depends on mass and how it's distributed.",
          "Newton's 2nd law for rotation: τ_net = Iα.",
          "Rotational equilibrium: net force AND net torque are zero.",
        ],
        essentials: [
          {
            heading: "Angular kinematics",
            body: "θ = angle, ω = dθ/dt = angular velocity, α = dω/dt = angular angular acceleration. The kinematic equations for constant α mirror the linear versions.",
          },
          {
            heading: "Torque",
            body: "τ = r·F·sin θ, where r is the distance from the axis to the point where F is applied and θ is the angle between r and F. Equivalently, τ = r⊥·F = r·F⊥.",
          },
          {
            heading: "Rotational inertia",
            body: "I = Σ m_i r_i². Common shapes: solid disk I = (1/2)MR². Hoop I = MR². Solid sphere I = (2/5)MR². Rod about end I = (1/3)ML². Rod about center I = (1/12)ML².",
          },
          {
            heading: "Newton's 2nd law for rotation",
            body: "τ_net = Iα. Apply to rolling objects, pulleys, and rigid bodies.",
          },
          {
            heading: "Rotational equilibrium",
            body: "Net force zero AND net torque zero. Pick any axis for torque calculation; result is the same. Pick cleverly to eliminate unknowns.",
          },
        ],
        keyFacts: [
          "Torque is zero when force is parallel to r.",
          "For a rigid body, choose the axis of torque calculation strategically.",
          "Moment arm = r⊥ = perpendicular distance from axis to line of force.",
        ],
        commonMistakes: [
          "Using r instead of r·sin θ in torque calculations.",
          "Confusing rotational inertia of different shapes.",
          "Forgetting that τ depends on the choice of axis.",
          "Mixing degrees and radians in rotational kinematics.",
        ],
        examStrategy:
          "Draw a diagram with the rotation axis. Label forces and their moment arms. Apply τ_net = Iα or equilibrium conditions.",
        studyTips: [
          "Memorize I for disk, hoop, sphere, rod.",
          "Drill 10 torque problems with various geometries.",
          "Practice equilibrium problems with multiple forces.",
        ],
      },
      {
        unitNumber: 6,
        title: "Energy & Momentum of Rotating Systems",
        overview:
          "Rotational kinetic energy, angular momentum, conservation of angular momentum, rolling without slipping, orbits.",
        examWeight: "5-8%",
        bigIdeas: [
          "Rotational KE = (1/2)Iω².",
          "Angular momentum L = Iω.",
          "Conservation of angular momentum: L is conserved if net torque is zero.",
          "Rolling without slipping: v_cm = Rω.",
          "Orbital motion: gravity provides centripetal force.",
        ],
        essentials: [
          {
            heading: "Rotational kinetic energy",
            body: "A rotating object has KE_rot = (1/2)Iω². For rolling without slipping, total KE is translational plus rotational: (1/2)mv² + (1/2)Iω².",
          },
          {
            heading: "Angular momentum",
            body: "L = Iω for a rigid body rotating about a fixed axis. For a point particle, L = r × p = mvr sin θ. Angular momentum is conserved when net external torque is zero.",
          },
          {
            heading: "Rolling without slipping",
            body: "v_cm = Rω. Contact point is momentarily at rest. The object has both translational and rotational KE.",
          },
          {
            heading: "Orbital motion",
            body: "Gravitational force provides centripetal force: GMm/r² = mv²/r. Orbital speed: v = √(GM/r). Period: T² = (4π²/GM)·r³ (Kepler's 3rd law).",
          },
        ],
        keyFacts: [
          "Conservation of L: a spinning skater pulling arms in spins faster.",
          "Rolling without slipping: contact point has zero velocity.",
          "Kepler's 3rd law applies to any central-force orbit.",
        ],
        commonMistakes: [
          "Forgetting the rotational KE term for rolling objects.",
          "Using v = Rω when slipping occurs.",
          "Confusing angular momentum (L = Iω) with linear momentum (p = mv).",
        ],
        examStrategy:
          "For rolling down an incline, energy conservation includes BOTH translational and rotational KE. For angular momentum conservation, identify whether torque is zero.",
        studyTips: [
          "Drill 5 rolling-down-a-ramp problems with different shapes (hoop, disk, sphere).",
          "Practice conservation of L problems (ice skater, merry-go-round).",
          "Memorize the orbital speed and Kepler's 3rd law.",
        ],
      },
      {
        unitNumber: 7,
        title: "Oscillations",
        overview:
          "Simple harmonic motion (SHM) of springs and pendulums. Period, frequency, energy in SHM.",
        examWeight: "5-9%",
        bigIdeas: [
          "SHM is sinusoidal motion about an equilibrium point with restoring force proportional to displacement.",
          "Spring: F = -kx. Period T = 2π√(m/k).",
          "Pendulum (small angles): Period T = 2π√(L/g).",
          "Energy alternates between KE and PE; total is constant in an ideal oscillator.",
          "Frequency f = 1/T. Angular frequency ω = 2πf.",
        ],
        essentials: [
          {
            heading: "Simple harmonic motion",
            body: "SHM occurs when the restoring force is proportional to displacement: F = -kx. Solution: x(t) = A·cos(ωt + φ) where A is amplitude.",
          },
          {
            heading: "Spring oscillator",
            body: "T = 2π√(m/k). ω = √(k/m). Mass at the end of a spring oscillates with this period regardless of amplitude.",
          },
          {
            heading: "Pendulum",
            body: "For small angles (<15°), T = 2π√(L/g). Period depends only on length and g, not mass or amplitude. For large angles, the motion is no longer SHM.",
          },
          {
            heading: "Energy in SHM",
            body: "Total energy E = (1/2)kA² (for a spring) is constant. At maximum displacement, all is PE. At equilibrium, all is KE. Max speed: v_max = ωA.",
          },
        ],
        keyFacts: [
          "SHM period is independent of amplitude.",
          "Pendulum period depends on length, not mass.",
          "Max speed is ωA; max acceleration is ω²A.",
        ],
        commonMistakes: [
          "Including amplitude in the period formula.",
          "Using the pendulum period formula for large angles.",
          "Forgetting the negative sign in F = -kx.",
        ],
        examStrategy:
          "Identify the system (spring or pendulum), write the period formula, solve. For energy problems, use (1/2)kA² or (1/2)mv².",
        studyTips: [
          "Memorize T = 2π√(m/k) and T = 2π√(L/g).",
          "Drill SHM energy problems.",
          "Practice pendulum problems on different planets (varying g).",
        ],
      },
      {
        unitNumber: 8,
        title: "Fluids",
        overview:
          "Density, pressure, buoyancy (Archimedes' principle), fluid flow (continuity, Bernoulli).",
        examWeight: "5-9%",
        bigIdeas: [
          "Pressure P = F/A. Pascal's principle: pressure applied to a confined fluid is transmitted undiminished.",
          "Hydrostatic pressure: P = P₀ + ρgh.",
          "Archimedes' principle: buoyant force = weight of displaced fluid.",
          "Continuity: for incompressible flow, A₁v₁ = A₂v₂.",
          "Bernoulli's equation: P + (1/2)ρv² + ρgh = constant along a streamline.",
        ],
        essentials: [
          {
            heading: "Density and pressure",
            body: "ρ = m/V. P = F/A, measured in Pascals (N/m²). Atmospheric pressure is about 10⁵ Pa.",
          },
          {
            heading: "Hydrostatic pressure",
            body: "At depth h in a fluid of density ρ: P = P₀ + ρgh. Independent of container shape (Pascal's paradox).",
          },
          {
            heading: "Buoyancy",
            body: "Archimedes: F_b = ρ_fluid · V_displaced · g. An object floats if its average density is less than the fluid's.",
          },
          {
            heading: "Continuity equation",
            body: "For incompressible flow, A₁v₁ = A₂v₂. Narrower pipes → faster flow.",
          },
          {
            heading: "Bernoulli's equation",
            body: "P + (1/2)ρv² + ρgh = constant along a streamline. Faster flow → lower pressure. Explains airplane lift, Venturi effect.",
          },
        ],
        keyFacts: [
          "Objects float when F_b ≥ weight.",
          "Fluid pressure depends on depth, not container shape.",
          "Bernoulli requires incompressible, non-viscous, steady flow.",
        ],
        commonMistakes: [
          "Thinking buoyant force depends on the object's weight (it depends on displaced fluid).",
          "Using Bernoulli for turbulent or compressible flow.",
          "Confusing gauge pressure and absolute pressure.",
        ],
        examStrategy:
          "For buoyancy, compute F_b and compare to weight. For flow, apply continuity first, then Bernoulli if needed.",
        studyTips: [
          "Drill 5 buoyancy problems (floating, sinking, partially submerged).",
          "Practice Bernoulli's equation for Venturi tubes and flow through nozzles.",
          "Memorize Archimedes' principle.",
        ],
      },
    ],
  },

  // =========================================================================
  // AP PHYSICS 2
  // =========================================================================
  "ap-physics-2": {
    courseSlug: "ap-physics-2",
    examFormat: {
      length: "3 hours",
      structure:
        "40 MCQ (80 min) + 4 FRQ (100 min). Calculator throughout.",
      scoring: "MCQ 50%, FRQ 50%.",
    },
    framing:
      "AP Physics 2 picks up where Physics 1 left off. Where Physics 1 was about mechanics and energy, Physics 2 is about thermodynamics, electricity, magnetism, waves, and modern physics. The topics are broader and shallower; you need breadth, not deep computation.",
    units: [
      {
        unitNumber: 1,
        title: "Thermodynamics & Fluids",
        overview:
          "Kinetic theory of gases, ideal gas law, heat and work, laws of thermodynamics, entropy.",
        examWeight: "15-18%",
        bigIdeas: [
          "Temperature is a measure of average translational KE of molecules.",
          "Ideal gas law: PV = nRT (or PV = Nk_BT).",
          "First law: ΔU = Q - W (W is work done BY gas on surroundings).",
          "Heat engines convert heat to work; efficiency is limited by the 2nd law.",
          "Entropy: the universe evolves toward higher entropy states.",
        ],
        essentials: [
          {
            heading: "Kinetic theory",
            body: "Gas molecules move randomly. Pressure arises from collisions with container walls. Average KE of a molecule = (3/2)k_BT. Temperature in Kelvin.",
          },
          {
            heading: "Ideal gas law",
            body: "PV = nRT with R = 8.314 J/(mol·K). Or PV = Nk_BT with k_B = 1.38 × 10⁻²³ J/K. Same equation, different conventions.",
          },
          {
            heading: "First law of thermodynamics",
            body: "ΔU = Q + W (with W as work done ON gas) or ΔU = Q - W (with W as work done BY gas). Check sign conventions on the AP formula sheet.",
          },
          {
            heading: "PV diagrams and processes",
            body: "Isothermal (ΔT=0, ΔU=0), adiabatic (Q=0), isobaric (P constant), isochoric (V constant). Work done by gas = area under PV curve.",
          },
          {
            heading: "Second law and entropy",
            body: "Heat flows from hot to cold. The total entropy of an isolated system never decreases. Efficiency of a heat engine: η = W/Q_h ≤ 1 - T_c/T_h (Carnot limit).",
          },
        ],
        keyFacts: [
          "Temperature must be in Kelvin for gas law calculations.",
          "Work done by gas: W = ∫P dV. For isobaric, W = PΔV.",
          "Carnot efficiency is the maximum possible, set by reservoir temperatures.",
        ],
        commonMistakes: [
          "Using Celsius in PV = nRT.",
          "Sign errors in the first law; check AP convention.",
          "Claiming heat and temperature are the same thing.",
          "Forgetting that ΔU = 0 for isothermal processes.",
        ],
        examStrategy:
          "Identify the process type first (isothermal, adiabatic, isobaric, isochoric). Write the first law. Use the gas law to relate P, V, T.",
        studyTips: [
          "Memorize the process types and their defining features.",
          "Drill PV diagrams and compute work as areas.",
          "Practice Carnot efficiency calculations.",
        ],
      },
      {
        unitNumber: 2,
        title: "Electric Force, Field & Potential",
        overview:
          "Electric charges, Coulomb's law, electric fields, electric potential, and energy.",
        examWeight: "15-18%",
        bigIdeas: [
          "Coulomb's law: F = kq₁q₂/r². Like charges repel; unlike attract.",
          "Electric field E = F/q is the force per unit charge.",
          "Electric potential V is the PE per unit charge.",
          "Field lines point from + to -; density indicates strength.",
          "Work done by electric force: W = qΔV.",
        ],
        essentials: [
          {
            heading: "Coulomb's law",
            body: "F = kq₁q₂/r² with k = 9 × 10⁹ N·m²/C². Direction is along the line joining the charges. Like charges repel; unlike charges attract.",
          },
          {
            heading: "Electric field",
            body: "E = F/q (vector). A positive test charge experiences force in the direction of E. Field of a point charge: E = kq/r². Field lines help visualize.",
          },
          {
            heading: "Electric potential",
            body: "V = kq/r for a point charge. Potential is scalar (not vector); add contributions algebraically. Work done by the field on a charge q moving between potentials: W = qΔV.",
          },
          {
            heading: "Conductors in electrostatic equilibrium",
            body: "Net charge on a conductor sits on its surface. The electric field inside is zero. The surface is an equipotential. Field just outside is perpendicular to the surface.",
          },
          {
            heading: "Gauss's law (qualitative)",
            body: "Flux through a closed surface is proportional to enclosed charge: Φ = q_enc/ε₀. Used to find E for symmetric charge distributions.",
          },
        ],
        keyFacts: [
          "ε₀ = 8.85 × 10⁻¹² C²/(N·m²).",
          "Field lines start on positive charges and end on negative.",
          "Potential decreases in the direction of the field.",
        ],
        commonMistakes: [
          "Treating V as a vector.",
          "Forgetting to square r in Coulomb's law.",
          "Confusing E field (force per charge) with V (energy per charge).",
          "Sign errors when computing potential from multiple charges.",
        ],
        examStrategy:
          "Draw the situation. Add up E (as vectors) or V (as scalars) from each charge. Use W = qΔV for energy changes.",
        studyTips: [
          "Drill 10 Coulomb's law problems with 2-3 point charges.",
          "Practice computing V from superposition.",
          "Memorize the properties of conductors in equilibrium.",
        ],
      },
      {
        unitNumber: 3,
        title: "Electric Circuits",
        overview:
          "Current, resistance, Ohm's law, Kirchhoff's rules, capacitors, RC circuits.",
        examWeight: "15-18%",
        bigIdeas: [
          "Ohm's law: V = IR.",
          "Power: P = IV = I²R = V²/R.",
          "Series resistors add; parallel resistors combine reciprocally.",
          "Kirchhoff's junction rule: current in = current out.",
          "Kirchhoff's loop rule: sum of voltage changes around a loop is zero.",
        ],
        essentials: [
          {
            heading: "Ohm's law and resistance",
            body: "V = IR. Resistance R depends on material resistivity ρ, length L, and cross-section area A: R = ρL/A.",
          },
          {
            heading: "Combining resistors",
            body: "Series: R_total = R₁ + R₂ + ... (same current through each). Parallel: 1/R_total = 1/R₁ + 1/R₂ + ... (same voltage across each).",
          },
          {
            heading: "Kirchhoff's rules",
            body: "Junction rule (charge conservation): sum of currents entering a junction equals sum leaving. Loop rule (energy conservation): sum of voltage changes around a closed loop is zero. Use to solve multi-loop circuits.",
          },
          {
            heading: "Capacitors",
            body: "C = Q/V. Energy stored: U = (1/2)CV². Parallel capacitors add; series combine reciprocally. Parallel-plate: C = ε₀A/d.",
          },
          {
            heading: "RC circuits",
            body: "Charging: Q(t) = Q_max(1 - e^(-t/RC)). Discharging: Q(t) = Q₀·e^(-t/RC). Time constant τ = RC.",
          },
        ],
        keyFacts: [
          "P = IV is the universal power formula; the others follow from Ohm's law.",
          "Capacitors block DC in steady state (no current flows).",
          "RC time constant τ = RC is when 63% charge/discharge has happened.",
        ],
        commonMistakes: [
          "Mixing up series vs parallel rules (especially for capacitors, where series/parallel reverse).",
          "Forgetting to include EMF sources correctly in Kirchhoff's loop rule.",
          "Using V=IR for instantaneous analysis when V varies.",
          "Confusing C (capacitance) with Q (charge).",
        ],
        examStrategy:
          "Identify series vs parallel sections. Use Kirchhoff's rules for multi-loop circuits. Draw current direction first.",
        studyTips: [
          "Drill 10 resistor combination problems.",
          "Practice Kirchhoff's loop rule on circuits with 2-3 loops.",
          "Solve 5 capacitor problems including parallel-plate geometry.",
          "Memorize RC charging and discharging curves.",
        ],
      },
      {
        unitNumber: 4,
        title: "Magnetism & Electromagnetic Induction",
        overview:
          "Magnetic fields, forces on moving charges and current-carrying wires, electromagnetic induction, Faraday's law.",
        examWeight: "12-16%",
        bigIdeas: [
          "Moving charges in magnetic fields feel a force: F = qv × B (magnitude qvB sin θ).",
          "Current-carrying wires in magnetic fields feel a force: F = IL × B.",
          "Moving magnets (changing flux) induce an EMF: ε = -dΦ/dt.",
          "Lenz's law: induced current opposes the change in flux.",
          "Right-hand rule for direction of force, field, and velocity.",
        ],
        essentials: [
          {
            heading: "Force on a moving charge",
            body: "F = qv × B. Magnitude: F = |q|vB sin θ. Direction: right-hand rule. A charged particle in a uniform B field (perpendicular to velocity) moves in a circle with radius r = mv/(|q|B).",
          },
          {
            heading: "Force on a current",
            body: "F = IL × B. Magnitude for straight wire: F = ILB sin θ. Use right-hand rule.",
          },
          {
            heading: "Magnetic flux",
            body: "Φ_B = B·A·cos θ. Flux changes when B changes, when A changes, or when the angle changes.",
          },
          {
            heading: "Faraday's law and Lenz's law",
            body: "EMF induced: ε = -dΦ_B/dt. The minus sign (Lenz) indicates the induced current opposes the change. Use Lenz's law to find the direction of induced current.",
          },
          {
            heading: "Motional EMF",
            body: "A rod of length L moving at velocity v through a field B (perpendicular) experiences EMF = BLv.",
          },
        ],
        keyFacts: [
          "B field from a long straight wire: B = μ₀I/(2πr).",
          "Magnetic force does no work on a point charge (F ⊥ v).",
          "Induced EMF depends on the rate of flux change, not the flux itself.",
        ],
        commonMistakes: [
          "Using right-hand rule for negative charges without flipping.",
          "Forgetting sin θ in force magnitude.",
          "Missing Lenz's law direction.",
          "Confusing electric and magnetic forces on charges.",
        ],
        examStrategy:
          "Use the right-hand rule carefully. For flux problems, identify what's changing (B, A, or θ). Apply Faraday to get EMF magnitude; use Lenz for direction.",
        studyTips: [
          "Drill right-hand rule on 20 vector configurations.",
          "Practice 10 flux-change problems and apply Lenz's law.",
          "Memorize F = qvB sin θ and EMF = BLv.",
        ],
      },
      {
        unitNumber: 5,
        title: "Geometric & Physical Optics",
        overview:
          "Light as a wave; reflection, refraction, lenses, mirrors. Interference, diffraction, polarization.",
        examWeight: "12-17%",
        bigIdeas: [
          "Light travels in straight lines in a uniform medium.",
          "Reflection: angle of incidence = angle of reflection.",
          "Refraction: n₁ sin θ₁ = n₂ sin θ₂ (Snell's law).",
          "Lenses and mirrors: 1/f = 1/d_o + 1/d_i.",
          "Interference: constructive at path differences of nλ; destructive at (n+1/2)λ.",
        ],
        essentials: [
          {
            heading: "Reflection and refraction",
            body: "Reflection: angles measured from the normal, equal. Refraction: light bends toward the normal when entering a denser medium. Index of refraction n = c/v.",
          },
          {
            heading: "Total internal reflection",
            body: "When light goes from high-n to low-n, there's a critical angle θ_c where refraction angle is 90°. Beyond θ_c, all light is reflected. sin θ_c = n₂/n₁.",
          },
          {
            heading: "Lenses and mirrors",
            body: "Thin lens/mirror equation: 1/f = 1/d_o + 1/d_i. Magnification: m = -d_i/d_o. Positive f: converging. Negative f: diverging. Image: real (positive d_i) or virtual (negative).",
          },
          {
            heading: "Double-slit interference",
            body: "Bright fringes at d sin θ = nλ. Dark fringes at d sin θ = (n+1/2)λ. For small angles, y = nλL/d where L is the screen distance.",
          },
          {
            heading: "Single-slit diffraction",
            body: "First minimum at sin θ = λ/a. Central bright region is twice as wide as the side fringes.",
          },
        ],
        keyFacts: [
          "n_water ≈ 1.33, n_glass ≈ 1.5.",
          "Light slows down in denser media but frequency is unchanged.",
          "Constructive interference requires an integer number of wavelengths difference.",
        ],
        commonMistakes: [
          "Sign conventions for lens/mirror equation.",
          "Using degrees instead of radians or vice versa.",
          "Forgetting TIR only occurs from dense to less dense.",
          "Mixing up single- and double-slit formulas.",
        ],
        examStrategy:
          "Use Snell's law for refraction. For lenses, apply the mirror/lens equation with correct sign conventions. For interference, identify if it's double-slit or single-slit.",
        studyTips: [
          "Drill ray tracing for converging and diverging lenses.",
          "Practice Snell's law with TIR problems.",
          "Memorize the double-slit formula for bright and dark fringes.",
        ],
      },
      {
        unitNumber: 6,
        title: "Quantum, Atomic & Nuclear Physics",
        overview:
          "Wave-particle duality, photons, atomic spectra, radioactive decay, nuclear reactions.",
        examWeight: "10-14%",
        bigIdeas: [
          "Light has particle nature: E_photon = hf.",
          "Matter has wave nature: de Broglie wavelength λ = h/p.",
          "Atoms emit/absorb photons when electrons change energy levels.",
          "E = mc² relates mass and energy.",
          "Radioactive decay: activity = λN (exponential decay).",
        ],
        essentials: [
          {
            heading: "Photoelectric effect",
            body: "Light above threshold frequency ejects electrons. KE_max = hf - φ where φ is the work function. Cannot be explained classically; requires photons.",
          },
          {
            heading: "Photons and de Broglie",
            body: "Photon energy: E = hf = hc/λ. Matter wavelength: λ = h/p = h/(mv). For macroscopic objects, λ is negligibly small.",
          },
          {
            heading: "Atomic energy levels",
            body: "Hydrogen: E_n = -13.6/n² eV. Photon energy = |E_final - E_initial|. Absorbed photons excite; emitted photons drop.",
          },
          {
            heading: "Mass-energy equivalence",
            body: "E = mc². Small mass can become enormous energy. Used in nuclear physics: binding energy, fission, fusion.",
          },
          {
            heading: "Radioactive decay",
            body: "N(t) = N₀·e^(-λt). Half-life T₁/₂ = ln(2)/λ. Types: alpha, beta, gamma.",
          },
        ],
        keyFacts: [
          "h = 6.63 × 10⁻³⁴ J·s (Planck's constant).",
          "1 eV = 1.6 × 10⁻¹⁹ J.",
          "Speed of light c = 3 × 10⁸ m/s.",
        ],
        commonMistakes: [
          "Confusing frequency and wavelength.",
          "Forgetting negative sign on hydrogen energy levels.",
          "Mixing up alpha, beta, gamma decays.",
          "Using λ (wavelength) and λ (decay constant) without distinguishing.",
        ],
        examStrategy:
          "Be careful with units: eV vs J. Remember E_photon = hf. Identify decay type from the change in Z and A.",
        studyTips: [
          "Drill photoelectric effect problems.",
          "Practice atomic transition calculations.",
          "Memorize nuclear notation and decay types.",
        ],
      },
      {
        unitNumber: 7,
        title: "Waves, Sound & Oscillations",
        overview:
          "Transverse and longitudinal waves, wave equation, superposition, standing waves, Doppler effect.",
        examWeight: "10-14%",
        bigIdeas: [
          "Wave equation: v = fλ.",
          "Transverse (string, light) vs longitudinal (sound).",
          "Superposition: waves add when they overlap.",
          "Standing waves: boundary conditions select allowed wavelengths.",
          "Doppler effect: frequency shifts when source and observer move relative to each other.",
        ],
        essentials: [
          {
            heading: "Wave properties",
            body: "Wavelength λ, frequency f, speed v = fλ. Amplitude determines intensity. Phase determines position in the cycle.",
          },
          {
            heading: "Superposition and interference",
            body: "When waves overlap, displacements add. Constructive: same phase, amplitudes add. Destructive: opposite phase, amplitudes cancel.",
          },
          {
            heading: "Standing waves",
            body: "String fixed at both ends: λ_n = 2L/n, f_n = nv/(2L). Open pipes: same pattern. Closed pipe (one end closed): λ_n = 4L/(2n-1).",
          },
          {
            heading: "Doppler effect",
            body: "Observed frequency shifts up when source and observer approach, down when they recede. Sound: f' = f·(v ± v_obs)/(v ∓ v_src) with signs depending on direction.",
          },
        ],
        keyFacts: [
          "Speed of sound in air ≈ 343 m/s at room temperature.",
          "Speed of light c = 3 × 10⁸ m/s.",
          "Standing wave on a string: fundamental has nodes at both ends.",
        ],
        commonMistakes: [
          "Confusing transverse and longitudinal waves.",
          "Getting Doppler signs wrong.",
          "Mixing up fundamental and higher harmonics.",
        ],
        examStrategy:
          "Identify the boundary conditions for standing waves. Use v = fλ as the master equation. For Doppler, determine direction carefully.",
        studyTips: [
          "Draw standing wave patterns for strings and pipes.",
          "Drill Doppler effect problems with various scenarios.",
          "Memorize the wave equation v = fλ.",
        ],
      },
    ],
  },

  // =========================================================================
  // AP PHYSICS C: MECHANICS
  // =========================================================================
  "ap-physics-c-mech": {
    courseSlug: "ap-physics-c-mech",
    examFormat: {
      length: "1 hour 30 minutes",
      structure:
        "35 MCQ (45 min) + 3 FRQ (45 min). Calculator allowed throughout.",
      scoring: "MCQ 50%, FRQ 50%. Historically one of the highest-scoring AP exams.",
    },
    framing:
      "AP Physics C: Mechanics is Physics 1 with calculus. Every topic has a calculus-based treatment: integrals for work, differential equations for motion, moments of inertia computed by integration. Strong students know AP Calc AB/BC in parallel; the course assumes derivatives and integrals as tools.",
    units: [
      {
        unitNumber: 1,
        title: "Kinematics",
        overview:
          "Motion in 1 and 2 dimensions using calculus. Velocity and acceleration as derivatives of position; integrals to recover position from velocity.",
        examWeight: "14-20%",
        bigIdeas: [
          "Position, velocity, acceleration as vector-valued functions of time.",
          "v = dr/dt, a = dv/dt.",
          "Reverse: r(t) = r₀ + ∫v dt, v(t) = v₀ + ∫a dt.",
          "Projectile motion is two independent 1D problems.",
          "Relative motion: velocities add as vectors.",
        ],
        essentials: [
          {
            heading: "Position, velocity, acceleration",
            body: "r(t), v(t) = dr/dt, a(t) = dv/dt = d²r/dt². In 2D, treat x and y independently.",
          },
          {
            heading: "Integration to recover motion",
            body: "Given a(t): v(t) = v₀ + ∫[0 to t] a(t') dt'. Given v(t): r(t) = r₀ + ∫[0 to t] v(t') dt'. Use when acceleration isn't constant.",
          },
          {
            heading: "Projectile motion with calculus",
            body: "2D problem. x(t) = v₀ cos θ · t. y(t) = v₀ sin θ · t - (1/2)g·t². Velocity components and their derivatives.",
          },
          {
            heading: "Relative motion",
            body: "v_AB = v_A - v_B (velocity of A relative to B). Apply in any frame.",
          },
        ],
        keyFacts: [
          "Area under v-t graph = displacement.",
          "Area under a-t graph = change in velocity.",
          "v dot r' = power delivered to a point mass.",
        ],
        commonMistakes: [
          "Using constant-a kinematic equations when a varies.",
          "Dropping the vector nature of motion.",
          "Confusing speed with velocity magnitude.",
        ],
        examStrategy:
          "Identify if acceleration is constant. If not, integrate. If it's a function of position or velocity, use chain rule: a = dv/dt = v·dv/dx.",
        studyTips: [
          "Drill 10 non-constant acceleration problems.",
          "Practice relative velocity in 2D.",
          "Sketch v-t and a-t graphs and recover position.",
        ],
      },
      {
        unitNumber: 2,
        title: "Newton's Laws of Motion",
        overview:
          "Newton's three laws with calculus-based treatment. Non-constant forces, resistive forces, differential equations of motion.",
        examWeight: "17-23%",
        bigIdeas: [
          "F = ma (or F = dp/dt when mass changes).",
          "Free-body diagrams for every problem.",
          "Drag and resistive forces: F = -bv (linear) or F = -cv² (quadratic).",
          "Terminal velocity: when drag force equals gravity.",
          "Non-constant forces lead to ODEs; solve by separation of variables.",
        ],
        essentials: [
          {
            heading: "Newton's laws",
            body: "1st: inertia. 2nd: F_net = ma. 3rd: equal and opposite. Apply the 2nd law in each axis.",
          },
          {
            heading: "Resistive forces",
            body: "F_drag = -bv or F_drag = -cv². For linear drag on a falling object: m(dv/dt) = mg - bv. Separable ODE with solution v(t) = (mg/b)(1 - e^(-bt/m)).",
          },
          {
            heading: "Terminal velocity",
            body: "When mg = bv_t (linear drag), v_t = mg/b. For quadratic drag, v_t = √(mg/c).",
          },
          {
            heading: "Springs and other variable forces",
            body: "F = -kx for Hooke's law. The equation of motion m(d²x/dt²) = -kx is the simple harmonic oscillator.",
          },
        ],
        keyFacts: [
          "F = dp/dt is more general than F = ma (handles variable mass like rockets).",
          "Terminal velocity is when net force is zero.",
          "A spring under its natural length exerts a pull; compressed, it pushes.",
        ],
        commonMistakes: [
          "Solving ODEs without recognizing them as ODEs.",
          "Forgetting the direction of resistive forces.",
          "Mixing up linear and quadratic drag.",
        ],
        examStrategy:
          "Write the equation of motion first. Decide if it's separable. Apply initial conditions.",
        studyTips: [
          "Solve the drag ODE by hand at least once.",
          "Practice 5 problems with non-constant forces.",
          "Memorize terminal velocity derivations.",
        ],
      },
      {
        unitNumber: 3,
        title: "Work, Energy & Power",
        overview:
          "Work as a line integral, work-energy theorem, potential energy from conservative forces.",
        examWeight: "14-17%",
        bigIdeas: [
          "Work: W = ∫F·dr (line integral).",
          "Work-energy theorem: W_net = ΔKE.",
          "Conservative force: W depends only on endpoints. F = -∇U (or -dU/dx in 1D).",
          "Conservation of energy: ΔKE + ΔU = W_nonconservative.",
          "Power: P = dW/dt = F·v.",
        ],
        essentials: [
          {
            heading: "Work as an integral",
            body: "For variable force: W = ∫F·dr. In 1D: W = ∫F(x) dx. For a spring: W = ∫(-kx) dx = -(1/2)kx².",
          },
          {
            heading: "Conservative forces and PE",
            body: "A force is conservative if the work done around a closed loop is zero (equivalently, work depends only on endpoints). Examples: gravity, spring. Friction is NOT conservative. Potential energy: U(x) = -∫F(x) dx + C.",
          },
          {
            heading: "Energy conservation",
            body: "ΔKE + ΔU = W_nc (work done by non-conservative forces). If W_nc = 0, mechanical energy is conserved.",
          },
          {
            heading: "Power",
            body: "Instantaneous P = F·v. Average P = W/Δt. Units: Watt = J/s.",
          },
        ],
        keyFacts: [
          "Spring PE: U = (1/2)kx².",
          "Gravitational PE (general): U = -GMm/r.",
          "Work done by gravity is path-independent (conservative).",
        ],
        commonMistakes: [
          "Forgetting the negative sign when computing U from F.",
          "Applying energy conservation when friction is present.",
          "Computing work without the cos θ factor.",
        ],
        examStrategy:
          "Recognize which forces are conservative. Use energy conservation whenever possible; it's usually faster than force analysis.",
        studyTips: [
          "Derive the spring PE by integration.",
          "Drill 10 energy conservation problems.",
          "Practice computing power in different scenarios.",
        ],
      },
      {
        unitNumber: 4,
        title: "Systems of Particles & Linear Momentum",
        overview:
          "Center of mass, momentum conservation, impulse, collisions.",
        examWeight: "14-17%",
        bigIdeas: [
          "Center of mass: x_cm = (Σ m_i x_i) / (Σ m_i).",
          "F_ext = M·a_cm. Internal forces cancel in pairs.",
          "p = mv. Conservation of p when external forces are zero.",
          "Impulse J = ∫F dt = Δp.",
          "Collisions: elastic (KE conserved) vs inelastic vs perfectly inelastic.",
        ],
        essentials: [
          {
            heading: "Center of mass",
            body: "For discrete particles: x_cm = (Σ m_i x_i)/M. For continuous bodies: x_cm = (1/M)∫x dm. Use integration for non-uniform densities.",
          },
          {
            heading: "Motion of the center of mass",
            body: "F_ext = M·a_cm. The center of mass moves as if all the mass were concentrated there and all external forces acted on that point.",
          },
          {
            heading: "Momentum conservation",
            body: "In the absence of external forces, total momentum is conserved. Apply to collisions, explosions, rocket propulsion.",
          },
          {
            heading: "Collisions",
            body: "Elastic: p conserved and KE conserved. Inelastic: p conserved, KE not. Perfectly inelastic: objects stick.",
          },
        ],
        keyFacts: [
          "For a uniform rod of length L, x_cm = L/2.",
          "For a triangle, the centroid is at 1/3 of the way from each side.",
          "Total p of an isolated system is conserved, always.",
        ],
        commonMistakes: [
          "Forgetting that momentum is a vector.",
          "Using KE conservation in inelastic collisions.",
          "Setting up center of mass with wrong reference point.",
        ],
        examStrategy:
          "Draw before/after diagrams. Write conservation of momentum in each direction. Solve for unknowns.",
        studyTips: [
          "Drill center of mass calculations for composite bodies.",
          "Practice 10 collision problems.",
          "Solve rocket equation problems for variable mass.",
        ],
      },
      {
        unitNumber: 5,
        title: "Rotation",
        overview:
          "Angular kinematics, rotational inertia, torque, rolling motion.",
        examWeight: "14-20%",
        bigIdeas: [
          "Angular kinematics: θ, ω, α, analogous to linear x, v, a.",
          "Rotational inertia I = ∫r² dm.",
          "Torque τ = r × F. Newton's 2nd law: τ_net = Iα.",
          "Rotational KE = (1/2)Iω².",
          "Rolling without slipping: v_cm = Rω.",
        ],
        essentials: [
          {
            heading: "Angular motion",
            body: "θ, ω = dθ/dt, α = dω/dt. Constant-α equations parallel constant-a equations.",
          },
          {
            heading: "Rotational inertia",
            body: "I = ∫r² dm for continuous bodies. Parallel axis theorem: I = I_cm + Md². Memorize: solid sphere (2/5)MR², solid disk (1/2)MR², hoop MR², rod about center (1/12)ML², rod about end (1/3)ML².",
          },
          {
            heading: "Torque and Newton's 2nd law for rotation",
            body: "τ = r × F. τ_net = Iα. For a rigid body rotating about a fixed axis.",
          },
          {
            heading: "Rolling without slipping",
            body: "v_cm = Rω, a_cm = Rα. Contact point has zero velocity. Total KE = (1/2)Mv² + (1/2)Iω².",
          },
        ],
        keyFacts: [
          "Parallel axis theorem: I = I_cm + Md² where d is the distance from CM to new axis.",
          "Rolling without slipping: kinematic constraint v = Rω.",
          "Torque is a vector (perpendicular to r and F).",
        ],
        commonMistakes: [
          "Forgetting the parallel axis theorem when computing I about a non-CM axis.",
          "Mixing up solid disk and hoop inertias.",
          "Using v = Rω when slipping occurs.",
        ],
        examStrategy:
          "Choose the axis of rotation cleverly. Apply τ_net = Iα. For rolling, use energy conservation to include both translational and rotational KE.",
        studyTips: [
          "Derive I for disk, sphere, rod by integration.",
          "Drill parallel axis theorem on 5 configurations.",
          "Practice rolling down inclines for different shapes.",
        ],
      },
      {
        unitNumber: 6,
        title: "Oscillations",
        overview:
          "Simple harmonic motion, energy, damping, driven oscillators.",
        examWeight: "6-14%",
        bigIdeas: [
          "SHM: restoring force proportional to displacement, F = -kx.",
          "Equation of motion: d²x/dt² = -ω²x, with solution x(t) = A cos(ωt + φ).",
          "Period T = 2π/ω. For a spring-mass: ω = √(k/m).",
          "Energy oscillates between KE and PE; total is (1/2)kA².",
          "Damping: reduces amplitude over time; can be under-, critically-, or over-damped.",
        ],
        essentials: [
          {
            heading: "SHM from F = -kx",
            body: "m(d²x/dt²) = -kx → d²x/dt² = -ω²x where ω² = k/m. Solution: x(t) = A cos(ωt + φ).",
          },
          {
            heading: "Energy in SHM",
            body: "KE = (1/2)mv² = (1/2)mω²(A² - x²). PE = (1/2)kx². Total E = (1/2)kA². At x=0, all KE. At x=A, all PE.",
          },
          {
            heading: "Pendulum",
            body: "Small angle: T = 2π√(L/g). Derived from torque analysis with sin θ ≈ θ.",
          },
          {
            heading: "Damped SHM (qualitative)",
            body: "Underdamped: oscillates with decreasing amplitude. Critically damped: returns to equilibrium fastest without oscillating. Overdamped: slow return to equilibrium.",
          },
        ],
        keyFacts: [
          "Period of a spring-mass: T = 2π√(m/k).",
          "Pendulum: T = 2π√(L/g), independent of mass.",
          "Max velocity: v_max = ωA.",
        ],
        commonMistakes: [
          "Including amplitude in the period.",
          "Using small-angle approximation for large-amplitude pendulums.",
          "Solving the ODE without recognizing it as SHM.",
        ],
        examStrategy:
          "Identify the restoring force. Write the equation of motion. Extract ω. Compute period, energy, max speed.",
        studyTips: [
          "Derive ω = √(k/m) from F = -kx.",
          "Practice pendulum problems with torque analysis.",
          "Drill energy in SHM.",
        ],
      },
      {
        unitNumber: 7,
        title: "Gravitation",
        overview:
          "Newton's law of gravitation, orbits, Kepler's laws, gravitational PE.",
        examWeight: "5-13%",
        bigIdeas: [
          "F = GMm/r². Gravity is always attractive.",
          "Gravitational PE: U = -GMm/r (taking infinity as zero).",
          "Orbital speed: v = √(GM/r) for circular orbit.",
          "Kepler's laws: elliptical orbits, equal areas in equal times, T² ∝ r³.",
          "Escape velocity: v_esc = √(2GM/R).",
        ],
        essentials: [
          {
            heading: "Newton's law of gravitation",
            body: "F = GMm/r². Universal constant G = 6.67 × 10⁻¹¹ N·m²/kg².",
          },
          {
            heading: "Gravitational potential energy",
            body: "U(r) = -GMm/r, taking U(∞) = 0. Total energy of an orbit: E = -GMm/(2r) for circular orbits.",
          },
          {
            heading: "Circular orbits",
            body: "Gravity provides centripetal force: GMm/r² = mv²/r → v = √(GM/r). Period: T² = 4π²r³/(GM).",
          },
          {
            heading: "Kepler's laws",
            body: "1st: orbits are ellipses with the focus at the central body. 2nd: equal areas in equal times (angular momentum conservation). 3rd: T² ∝ a³.",
          },
          {
            heading: "Escape velocity",
            body: "Minimum speed to escape to infinity: (1/2)mv² = GMm/R → v_esc = √(2GM/R).",
          },
        ],
        keyFacts: [
          "g at Earth's surface ≈ 9.8 m/s² = GM_Earth/R_Earth².",
          "Escape velocity from Earth ≈ 11.2 km/s.",
          "Satellite at r has KE = -E_total (virial theorem).",
        ],
        commonMistakes: [
          "Using mgh for potential energy far from Earth's surface.",
          "Forgetting the negative sign on U = -GMm/r.",
          "Confusing escape velocity with orbital velocity.",
        ],
        examStrategy:
          "For orbits, equate gravitational force to centripetal. For energy, use U = -GMm/r with U(∞) = 0.",
        studyTips: [
          "Derive orbital speed from force balance.",
          "Practice Kepler's 3rd law for different planets.",
          "Drill escape velocity calculations.",
        ],
      },
    ],
  },

  // =========================================================================
  // AP PHYSICS C: E&M
  // =========================================================================
  "ap-physics-c-em": {
    courseSlug: "ap-physics-c-em",
    examFormat: {
      length: "1 hour 30 minutes",
      structure: "35 MCQ + 3 FRQ. Calculator allowed.",
      scoring: "50/50 MCQ/FRQ split.",
    },
    framing:
      "AP Physics C: E&M is the most mathematical of the AP physics courses. Every major topic involves vector calculus: gradients for fields, divergences for Gauss's law, curls for Ampère's law. Strong students know multivariable calculus informally by the end of the course.",
    units: [
      {
        unitNumber: 1,
        title: "Electrostatics",
        overview:
          "Coulomb's law, electric field and potential, Gauss's law for static charge distributions.",
        examWeight: "26-34%",
        bigIdeas: [
          "Coulomb's law: F = kq₁q₂/r² (central, along the line joining charges).",
          "Electric field: E = F/q.",
          "Electric potential: V = -∫E·dr. V is scalar; add contributions algebraically.",
          "Gauss's law: ∮E·dA = q_enc/ε₀.",
          "Continuous charge distributions require integration.",
        ],
        essentials: [
          {
            heading: "Electric field from continuous charges",
            body: "For a line, surface, or volume charge, integrate: E = ∫k(dq/r²)·r̂. Use symmetry to simplify (e.g., symmetric line charge has only a perpendicular component).",
          },
          {
            heading: "Electric potential",
            body: "V = ∫k(dq/r). Also V = -∫E·dr along a path. E = -∇V (field is the negative gradient of potential).",
          },
          {
            heading: "Gauss's law",
            body: "∮E·dA = q_enc/ε₀. Used for high-symmetry cases: spherical, cylindrical, planar. Pick a Gaussian surface where E is either constant and perpendicular or parallel to the surface.",
          },
          {
            heading: "Conductors in equilibrium",
            body: "E inside = 0. Charge sits on the surface. Surface is equipotential. E just outside = σ/ε₀ (perpendicular to surface).",
          },
        ],
        keyFacts: [
          "ε₀ = 8.85 × 10⁻¹² C²/(N·m²).",
          "k = 1/(4πε₀) = 9 × 10⁹ N·m²/C².",
          "Electric field is a vector; potential is a scalar.",
        ],
        commonMistakes: [
          "Using Gauss's law on non-symmetric distributions.",
          "Treating V as a vector.",
          "Forgetting the negative sign in E = -∇V.",
          "Setting up the wrong Gaussian surface.",
        ],
        examStrategy:
          "Identify symmetry first. Apply Gauss's law when symmetry permits. Use direct integration otherwise.",
        studyTips: [
          "Derive E and V for a uniformly charged sphere, cylinder, and plane.",
          "Drill Gauss's law applications.",
          "Practice converting between E and V via the gradient.",
        ],
      },
      {
        unitNumber: 2,
        title: "Conductors, Capacitors & Dielectrics",
        overview:
          "Capacitance, energy storage, dielectric materials, capacitor combinations.",
        examWeight: "14-17%",
        bigIdeas: [
          "Capacitance: C = Q/V. Depends on geometry.",
          "Parallel-plate: C = ε₀A/d.",
          "Energy stored: U = (1/2)CV² = (1/2)QV = Q²/(2C).",
          "Dielectrics increase C by a factor κ.",
          "Capacitors in parallel add; in series, they combine reciprocally.",
        ],
        essentials: [
          {
            heading: "Capacitance",
            body: "C = Q/V. Compute by: (1) place a charge Q on each plate, (2) find V using E, (3) compute C = Q/V. Examples: parallel-plate, spherical, cylindrical.",
          },
          {
            heading: "Energy storage",
            body: "U = (1/2)CV² = Q²/(2C). Energy density: u = (1/2)ε₀E².",
          },
          {
            heading: "Dielectrics",
            body: "Inserting a dielectric between capacitor plates reduces E (and V) by a factor κ (dielectric constant). C increases by κ.",
          },
          {
            heading: "Combinations",
            body: "Parallel: C_total = C₁ + C₂. Series: 1/C_total = 1/C₁ + 1/C₂. Note: the rules are OPPOSITE of resistors.",
          },
        ],
        keyFacts: [
          "Dielectric constant: air ≈ 1, water ≈ 80, paper ≈ 3.7.",
          "Energy density of E field: u = (1/2)ε₀E².",
          "C is purely geometric (plus κ if dielectric present).",
        ],
        commonMistakes: [
          "Mixing series/parallel rules for capacitors vs resistors.",
          "Forgetting to square V in the energy formula.",
          "Assuming dielectric insertion always decreases charge (it depends on whether battery stays connected).",
        ],
        examStrategy:
          "Identify capacitor geometry. Compute C using the three-step method. For combinations, simplify step by step.",
        studyTips: [
          "Derive C for parallel-plate, spherical, and cylindrical capacitors.",
          "Drill capacitor combination problems.",
          "Practice dielectric insertion scenarios (battery connected vs disconnected).",
        ],
      },
      {
        unitNumber: 3,
        title: "Electric Circuits",
        overview:
          "Resistance, EMF, Kirchhoff's rules, RC circuits with calculus-based analysis.",
        examWeight: "14-17%",
        bigIdeas: [
          "Ohm's law V = IR.",
          "Kirchhoff's junction and loop rules.",
          "RC circuits: exponential charging/discharging.",
          "Time constant τ = RC.",
          "Power: P = IV = I²R = V²/R.",
        ],
        essentials: [
          {
            heading: "Ohm's law and Kirchhoff's rules",
            body: "V = IR. Apply junction rule (ΣI_in = ΣI_out) and loop rule (ΣΔV = 0 around any loop). These give enough equations to solve any DC circuit.",
          },
          {
            heading: "RC circuits",
            body: "Charging: Q(t) = Q_max(1 - e^(-t/RC)). Discharging: Q(t) = Q₀ e^(-t/RC). Current is dQ/dt. Time constant τ = RC.",
          },
          {
            heading: "Derivation from Kirchhoff",
            body: "For a charging RC circuit: ε = IR + Q/C. Take d/dt and solve the first-order ODE. Get exponential approach to Q_max = Cε.",
          },
        ],
        keyFacts: [
          "Time constant τ = RC is in seconds.",
          "After 5τ, the circuit is ~99% charged/discharged.",
          "P = I²R is the power dissipated as heat in a resistor.",
        ],
        commonMistakes: [
          "Forgetting to include EMFs in Kirchhoff's loop.",
          "Treating exponential charging as linear.",
          "Using τ = RC wrong in combination circuits.",
        ],
        examStrategy:
          "Write Kirchhoff's rules, solve algebraically. For RC, set up the ODE and solve.",
        studyTips: [
          "Derive the RC charging equation from Kirchhoff's rules.",
          "Drill 5 multi-loop DC circuits.",
          "Practice RC circuits with 2 resistors and 1 capacitor.",
        ],
      },
      {
        unitNumber: 4,
        title: "Magnetic Fields",
        overview:
          "Magnetic forces on moving charges, force on current-carrying wires, sources of magnetic fields.",
        examWeight: "17-23%",
        bigIdeas: [
          "Force on a moving charge: F = qv × B.",
          "Force on a current element: dF = I dL × B.",
          "Biot-Savart: dB = (μ₀/4π)·(I dL × r̂)/r².",
          "Ampère's law: ∮B·dL = μ₀ I_enc.",
          "Magnetic flux Φ = ∫B·dA.",
        ],
        essentials: [
          {
            heading: "Force on charges and currents",
            body: "F = qv × B causes circular motion of charges in a uniform B (r = mv/qB). F on a current: dF = IL × B.",
          },
          {
            heading: "Biot-Savart law",
            body: "dB = (μ₀/4π)·(I dL × r̂)/r². Integrate along the wire. Used for loops, straight wires, solenoids.",
          },
          {
            heading: "Ampère's law",
            body: "∮B·dL = μ₀ I_enc. Useful for high-symmetry cases: long straight wire (B = μ₀I/(2πr)), solenoid (B = μ₀nI), toroid.",
          },
          {
            heading: "Magnetic flux",
            body: "Φ = ∫B·dA. Used in Faraday's law for induced EMF.",
          },
        ],
        keyFacts: [
          "μ₀ = 4π × 10⁻⁷ T·m/A.",
          "B from a long straight wire: B = μ₀I/(2πr).",
          "B inside a solenoid: B = μ₀nI (where n is turns per length).",
          "Magnetic force on a charge does no work (always perpendicular to v).",
        ],
        commonMistakes: [
          "Using Ampère's law without symmetry.",
          "Getting the cross-product direction wrong (right-hand rule).",
          "Confusing field due to a current with force on a current.",
        ],
        examStrategy:
          "Use Ampère's law when symmetry permits. Use Biot-Savart otherwise. Apply right-hand rule carefully.",
        studyTips: [
          "Derive B from Biot-Savart for a circular loop and straight wire.",
          "Practice Ampère's law for solenoids and toroids.",
          "Drill right-hand rule on 20 configurations.",
        ],
      },
      {
        unitNumber: 5,
        title: "Electromagnetism",
        overview:
          "Electromagnetic induction: Faraday's law, Lenz's law, inductance, LR and LC circuits, Maxwell's equations.",
        examWeight: "14-20%",
        bigIdeas: [
          "Faraday's law: ε = -dΦ/dt.",
          "Lenz's law: induced current opposes the flux change.",
          "Inductance: L = -ε/(dI/dt).",
          "LR circuit: exponential approach to steady state.",
          "Maxwell's equations unify electricity and magnetism.",
        ],
        essentials: [
          {
            heading: "Faraday's law and Lenz's law",
            body: "ε = -dΦ/dt. The minus sign (Lenz) indicates the induced EMF drives a current that opposes the change in flux.",
          },
          {
            heading: "Motional EMF",
            body: "A rod of length L moving at velocity v through perpendicular B field: ε = BLv. Derives from F = qv × B on charges in the rod.",
          },
          {
            heading: "Inductance",
            body: "Self-inductance L relates induced EMF to rate of change of current: ε = -L(dI/dt). For a solenoid: L = μ₀n²·V (where V is volume).",
          },
          {
            heading: "LR circuits",
            body: "Rise: I(t) = (ε/R)(1 - e^(-Rt/L)). Decay: I(t) = I₀ e^(-Rt/L). Time constant τ = L/R.",
          },
          {
            heading: "Maxwell's equations",
            body: "∇·E = ρ/ε₀ (Gauss). ∇·B = 0 (no magnetic monopoles). ∇×E = -dB/dt (Faraday). ∇×B = μ₀J + μ₀ε₀(dE/dt) (Ampère-Maxwell). These four equations govern all of classical EM.",
          },
        ],
        keyFacts: [
          "Inductor stores energy: U = (1/2)LI².",
          "LC circuit oscillates with frequency ω = 1/√(LC).",
          "Speed of light: c = 1/√(μ₀ε₀).",
        ],
        commonMistakes: [
          "Missing the minus sign in Faraday's law.",
          "Getting Lenz's law direction wrong.",
          "Confusing L (inductance) with L (length).",
        ],
        examStrategy:
          "Identify the flux and its rate of change. Apply Faraday for magnitude and Lenz for direction.",
        studyTips: [
          "Drill 10 Faraday/Lenz problems.",
          "Derive LR circuit equations from Kirchhoff's rules.",
          "Memorize Maxwell's equations qualitatively.",
        ],
      },
    ],
  },

  // =========================================================================
  // AP BIOLOGY
  // =========================================================================
  "ap-biology": {
    courseSlug: "ap-biology",
    examFormat: {
      length: "3 hours",
      structure:
        "60 MCQ (90 min) + 6 FRQ (90 min): 2 long, 4 short. Calculator and formula sheet provided.",
      scoring: "MCQ 50%, FRQ 50%.",
    },
    framing:
      "AP Biology is a big-picture course that tests your ability to connect molecular details to ecological and evolutionary outcomes. The College Board cares less about facts than about reasoning: how does a molecular structure cause a cellular function, and how does that cellular function affect the organism, the population, the ecosystem? Treat each unit as a lens on the same underlying biology.",
    units: [
      {
        unitNumber: 1,
        title: "Chemistry of Life",
        overview:
          "Water's properties, biological macromolecules (carbohydrates, lipids, proteins, nucleic acids), their structures and functions.",
        examWeight: "8-11%",
        bigIdeas: [
          "Water's polarity causes cohesion, adhesion, high heat capacity.",
          "Carbon's 4 bonds allow complex biomolecules.",
          "Macromolecules: carbs, lipids, proteins, nucleic acids.",
          "Protein structure: primary → secondary → tertiary → quaternary.",
          "DNA double helix: anti-parallel strands, A-T, G-C base pairing.",
        ],
        essentials: [
          {
            heading: "Water properties",
            body: "Polar molecule with hydrogen bonds. Cohesion (water-water), adhesion (water-surface). High specific heat moderates temperature. Ice less dense than liquid water (floating insulates).",
          },
          {
            heading: "Macromolecule classes",
            body: "Carbohydrates: energy, structural (cellulose). Lipids: long-term energy, membranes, signaling. Proteins: enzymes, transport, structure. Nucleic acids: DNA (info), RNA (messaging/catalysis).",
          },
          {
            heading: "Protein structure",
            body: "Primary: amino acid sequence. Secondary: α-helix and β-sheet (H-bonds). Tertiary: 3D fold. Quaternary: multiple subunits. Function depends on folded shape.",
          },
          {
            heading: "Nucleic acids",
            body: "DNA: deoxyribose, double-stranded, antiparallel, A-T, G-C. RNA: ribose, usually single-stranded, U replaces T. DNA stores information; RNA carries it.",
          },
        ],
        keyFacts: [
          "Hydrogen bonds between water molecules give water its unique properties.",
          "Monomers: amino acids (proteins), nucleotides (DNA/RNA), monosaccharides (carbs).",
          "Dehydration synthesis forms bonds, hydrolysis breaks them.",
        ],
        commonMistakes: [
          "Confusing dehydration synthesis and hydrolysis.",
          "Mixing up DNA and RNA features.",
          "Thinking proteins are built by DNA (they're built by ribosomes from mRNA).",
        ],
        examStrategy:
          "Link structure to function in every answer. 'Because DNA is double-stranded with base pairing, it can be replicated accurately.'",
        studyTips: [
          "Memorize the 4 macromolecule classes and their monomers.",
          "Draw protein structure levels with examples.",
          "Practice explaining water's properties based on H-bonds.",
        ],
      },
      {
        unitNumber: 2,
        title: "Cell Structure & Function",
        overview:
          "Prokaryotic vs eukaryotic cells, organelles, membranes, transport across membranes.",
        examWeight: "10-13%",
        bigIdeas: [
          "Surface-area-to-volume ratio limits cell size.",
          "Prokaryotes lack membrane-bound organelles; eukaryotes have them.",
          "Membrane: phospholipid bilayer with embedded proteins (fluid mosaic model).",
          "Passive transport: diffusion, osmosis, facilitated diffusion. No energy needed.",
          "Active transport: energy-requiring, moves against gradient.",
        ],
        essentials: [
          {
            heading: "Cell types",
            body: "Prokaryotes (bacteria, archaea): no nucleus, no membrane-bound organelles. Eukaryotes (plants, animals, fungi, protists): nucleus, mitochondria, ER, Golgi, etc.",
          },
          {
            heading: "Membrane structure",
            body: "Phospholipid bilayer: hydrophilic heads outside, hydrophobic tails inside. Fluid mosaic model: proteins move within the bilayer. Cholesterol modulates fluidity in animals.",
          },
          {
            heading: "Transport across membranes",
            body: "Passive: diffusion (small, nonpolar), osmosis (water), facilitated diffusion (through channels). Active: pumps (like Na/K ATPase), endocytosis, exocytosis.",
          },
          {
            heading: "Tonicity",
            body: "Hypertonic: cell loses water, shrivels. Hypotonic: cell gains water, bursts (animal) or becomes turgid (plant). Isotonic: no net water movement.",
          },
          {
            heading: "Organelle functions",
            body: "Nucleus: DNA. Mitochondria: ATP (cellular respiration). Chloroplasts (plants): photosynthesis. ER (rough: protein synthesis, smooth: lipid synthesis). Golgi: packaging. Lysosomes: digestion. Ribosomes: protein synthesis.",
          },
        ],
        keyFacts: [
          "Surface area to volume ratio decreases as cells grow; limits cell size.",
          "Osmosis moves water to areas of higher solute concentration.",
          "Na/K ATPase pumps 3 Na out and 2 K in, using 1 ATP.",
        ],
        commonMistakes: [
          "Confusing osmosis (water) with diffusion (solutes).",
          "Describing hypertonic/hypotonic from the wrong perspective.",
          "Forgetting that prokaryotes have ribosomes.",
        ],
        examStrategy:
          "Always state tonicity from the solution's perspective. Explain transport mechanisms with reference to gradients.",
        studyTips: [
          "Draw a labeled eukaryotic cell with functions.",
          "Practice tonicity problems with red blood cells.",
          "Memorize the Na/K pump stoichiometry.",
        ],
      },
      {
        unitNumber: 3,
        title: "Cellular Energetics",
        overview:
          "Enzymes, metabolism, cellular respiration (glycolysis, Krebs cycle, electron transport), photosynthesis.",
        examWeight: "12-16%",
        bigIdeas: [
          "Enzymes lower activation energy; they are not consumed.",
          "Cellular respiration extracts energy from glucose: ~32 ATP per glucose (aerobic).",
          "Glycolysis (cytoplasm) → Krebs (mitochondrial matrix) → ETC (inner membrane).",
          "Photosynthesis captures light energy: light reactions (thylakoid) + Calvin cycle (stroma).",
          "Cellular respiration and photosynthesis are essentially reverse reactions globally.",
        ],
        essentials: [
          {
            heading: "Enzymes",
            body: "Proteins that catalyze reactions. They lower activation energy by stabilizing the transition state. Enzyme activity depends on pH, temperature, substrate concentration. Competitive and non-competitive inhibitors.",
          },
          {
            heading: "Glycolysis",
            body: "Glucose → 2 pyruvate. Net yield: 2 ATP, 2 NADH. Happens in the cytoplasm. Anaerobic.",
          },
          {
            heading: "Krebs cycle",
            body: "Pyruvate → acetyl-CoA → Krebs cycle. Produces ATP, NADH, FADH₂, CO₂. Happens in the mitochondrial matrix. Aerobic.",
          },
          {
            heading: "Electron transport chain",
            body: "NADH and FADH₂ donate electrons. As electrons pass through complexes, H+ is pumped across the inner mitochondrial membrane. H+ gradient drives ATP synthase. Final electron acceptor: O₂ → H₂O.",
          },
          {
            heading: "Photosynthesis",
            body: "Light reactions (thylakoid membrane): H₂O split, O₂ released, ATP and NADPH generated. Calvin cycle (stroma): CO₂ fixed into sugars using ATP and NADPH from light reactions.",
          },
        ],
        keyFacts: [
          "Cellular respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP.",
          "Photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂.",
          "ATP is the universal energy currency; ~32 ATP per glucose aerobically.",
        ],
        commonMistakes: [
          "Confusing light reactions and Calvin cycle.",
          "Thinking ATP is stored: it's spent almost immediately.",
          "Mixing up NADH and NADPH (respiration vs photosynthesis).",
        ],
        examStrategy:
          "FRQs love asking you to trace electrons, carbons, or ATP through a pathway. Know the stages, inputs, outputs, and location.",
        studyTips: [
          "Draw the respiration pathway with inputs and outputs.",
          "Memorize the stages of photosynthesis.",
          "Practice explaining chemiosmosis.",
        ],
      },
      {
        unitNumber: 4,
        title: "Cell Communication & the Cell Cycle",
        overview:
          "Cell signaling pathways, cell cycle regulation, mitosis, cancer.",
        examWeight: "10-15%",
        bigIdeas: [
          "Cells communicate via signal transduction.",
          "Signaling involves reception, transduction, response.",
          "Cell cycle: G1 → S → G2 → M → (G0).",
          "Checkpoints ensure DNA integrity before division.",
          "Cancer: uncontrolled cell division from broken checkpoints.",
        ],
        essentials: [
          {
            heading: "Signal transduction",
            body: "Signal molecule binds receptor (usually a membrane protein). Triggers a cascade: G-proteins, kinases, second messengers (cAMP, Ca²⁺). Results in a cellular response.",
          },
          {
            heading: "Cell cycle stages",
            body: "G1 (growth, metabolism), S (DNA replication), G2 (prepare for division), M (mitosis + cytokinesis). G0 is a resting state.",
          },
          {
            heading: "Mitosis",
            body: "Prophase (chromosomes condense), metaphase (align at equator), anaphase (sister chromatids separate), telophase (nuclei re-form). Cytokinesis divides the cytoplasm.",
          },
          {
            heading: "Checkpoints and cancer",
            body: "Checkpoints at G1/S, G2/M, and spindle checkpoint. p53 triggers repair or apoptosis for damaged DNA. Cancer: loss of checkpoint control (oncogenes + tumor suppressors).",
          },
        ],
        keyFacts: [
          "Humans have 46 chromosomes (23 pairs).",
          "Cyclins and CDKs drive the cell cycle.",
          "Cancer is typically caused by multiple mutations.",
        ],
        commonMistakes: [
          "Confusing mitosis and meiosis.",
          "Mixing up the cell cycle stages.",
          "Thinking signaling always involves hormones: it's also local and even intracellular.",
        ],
        examStrategy:
          "Know the cell cycle stages cold. For signaling, describe a specific pathway (receptor → G-protein → enzyme → response).",
        studyTips: [
          "Draw the cell cycle with checkpoints.",
          "Practice identifying mitosis phases from diagrams.",
          "Memorize key signaling components (cAMP, kinases, Ca²⁺).",
        ],
      },
      {
        unitNumber: 5,
        title: "Heredity",
        overview:
          "Meiosis, Mendelian genetics, non-Mendelian inheritance, chromosomal basis of inheritance.",
        examWeight: "8-11%",
        bigIdeas: [
          "Meiosis produces genetically diverse gametes.",
          "Mendel's laws: segregation and independent assortment.",
          "Dominant alleles mask recessive ones in heterozygotes.",
          "Punnett squares predict offspring ratios.",
          "Non-Mendelian: incomplete dominance, codominance, multiple alleles, linked genes.",
        ],
        essentials: [
          {
            heading: "Meiosis",
            body: "Produces haploid gametes from diploid cells. Two divisions (meiosis I and II). Genetic variation from independent assortment and crossing over.",
          },
          {
            heading: "Mendel's laws",
            body: "Law of segregation: alleles separate during gamete formation. Law of independent assortment: alleles for different traits segregate independently (except for linked genes).",
          },
          {
            heading: "Punnett squares",
            body: "Monohybrid cross of heterozygotes: 3:1 phenotype ratio, 1:2:1 genotype ratio. Dihybrid: 9:3:3:1. Test cross with a homozygous recessive to reveal the unknown genotype.",
          },
          {
            heading: "Non-Mendelian inheritance",
            body: "Incomplete dominance (blending, e.g. red + white = pink). Codominance (both expressed, e.g. AB blood). Multiple alleles (e.g. ABO). Linked genes (inherited together). Sex-linked (X-linked: hemophilia).",
          },
          {
            heading: "Chromosomal basis",
            body: "Genes are on chromosomes. Linked genes on the same chromosome are inherited together unless crossing over separates them. Crossing over frequency correlates with map distance.",
          },
        ],
        keyFacts: [
          "Crossing over occurs during meiosis I (prophase).",
          "Humans have 22 autosomes + 2 sex chromosomes.",
          "X-linked recessive disorders affect males more than females.",
        ],
        commonMistakes: [
          "Mixing up meiosis and mitosis.",
          "Drawing Punnett squares incorrectly for linked genes.",
          "Confusing codominance and incomplete dominance.",
        ],
        examStrategy:
          "Genetics problems reward clear notation. Use uppercase for dominant, lowercase for recessive. Draw Punnett squares.",
        studyTips: [
          "Drill 20 Punnett squares across dominance patterns.",
          "Practice chi-square for genetic ratios (testing observed vs expected).",
          "Memorize meiosis stages.",
        ],
      },
      {
        unitNumber: 6,
        title: "Gene Expression & Regulation",
        overview:
          "DNA replication, transcription, translation, gene regulation, mutations, biotechnology.",
        examWeight: "12-16%",
        bigIdeas: [
          "DNA replication: semi-conservative, requires DNA polymerase, primers, Okazaki fragments.",
          "Transcription: DNA → mRNA in the nucleus.",
          "Translation: mRNA → protein at ribosomes.",
          "Gene regulation: turn genes on/off as needed.",
          "Mutations can be harmful, neutral, or beneficial.",
        ],
        essentials: [
          {
            heading: "DNA replication",
            body: "Semi-conservative (each new strand has one old strand). DNA polymerase adds nucleotides 5' → 3'. Leading strand continuous, lagging strand in Okazaki fragments. Helicase unwinds; primase makes RNA primer; ligase joins fragments.",
          },
          {
            heading: "Transcription",
            body: "RNA polymerase reads DNA template 3' → 5' and makes mRNA 5' → 3'. Start at promoter, end at terminator. Eukaryotic mRNA is processed: 5' cap, poly-A tail, introns spliced out.",
          },
          {
            heading: "Translation",
            body: "Ribosome reads mRNA in codons (3 nucleotides each). tRNAs bring amino acids. Start codon AUG (methionine). Stop codons (UAA, UAG, UGA). Peptide bonds form between amino acids.",
          },
          {
            heading: "Gene regulation",
            body: "Prokaryotes: operons (lac operon: glucose absent + lactose present → lac genes ON). Eukaryotes: transcription factors, enhancers, chromatin remodeling, epigenetic modifications.",
          },
          {
            heading: "Mutations",
            body: "Point mutations: silent, missense, nonsense. Frameshift: insertion/deletion shifts the reading frame. Chromosomal mutations: duplications, deletions, inversions, translocations.",
          },
        ],
        keyFacts: [
          "The genetic code is nearly universal.",
          "20 amino acids; 64 codons.",
          "Mutations are the raw material of evolution.",
        ],
        commonMistakes: [
          "Confusing transcription and translation.",
          "Mixing up RNA types (mRNA, tRNA, rRNA).",
          "Forgetting that DNA polymerase works 5' → 3'.",
        ],
        examStrategy:
          "Know each step of transcription and translation in order. FRQs often ask you to trace information flow from DNA to protein.",
        studyTips: [
          "Draw the central dogma: DNA → RNA → protein.",
          "Memorize start and stop codons.",
          "Practice mutation effects on protein sequence.",
        ],
      },
      {
        unitNumber: 7,
        title: "Natural Selection",
        overview:
          "Evolution by natural selection, Hardy-Weinberg equilibrium, evidence for evolution, speciation.",
        examWeight: "13-20%",
        bigIdeas: [
          "Natural selection: differential survival and reproduction based on heritable traits.",
          "Evolution is change in allele frequencies over generations.",
          "Hardy-Weinberg: p² + 2pq + q² = 1 when no evolution occurs.",
          "Evidence for evolution: fossils, homology, biogeography, molecular.",
          "Speciation: formation of new species (allopatric vs sympatric).",
        ],
        essentials: [
          {
            heading: "Natural selection",
            body: "Requires: variation, heritability, differential reproduction. Those with favorable traits leave more offspring. Accumulates over generations to change populations.",
          },
          {
            heading: "Hardy-Weinberg",
            body: "5 conditions: no mutation, no migration, no selection, no genetic drift, random mating. p² + 2pq + q² = 1 and p + q = 1. If frequencies don't match, evolution is happening.",
          },
          {
            heading: "Evidence for evolution",
            body: "Fossils show transitional forms. Homologous structures reveal common ancestry. Vestigial structures. Biogeography (species distribution). Molecular evidence (DNA similarities).",
          },
          {
            heading: "Speciation",
            body: "Allopatric: geographic isolation, populations diverge. Sympatric: divergence within the same area (e.g., polyploidy in plants). Reproductive isolation defines species.",
          },
          {
            heading: "Phylogeny",
            body: "Cladograms show evolutionary relationships. Nodes represent common ancestors. Derived characters define clades.",
          },
        ],
        keyFacts: [
          "Fitness = reproductive success.",
          "Genetic drift has stronger effects in small populations.",
          "Speciation takes many generations.",
        ],
        commonMistakes: [
          "Calling natural selection 'survival of the fittest': it's really differential reproduction.",
          "Thinking individuals evolve: populations evolve.",
          "Misusing Hardy-Weinberg (it's a null hypothesis, not a description of reality).",
        ],
        examStrategy:
          "Hardy-Weinberg is almost always on the exam. Set up p and q, compute p², 2pq, q². Interpret results.",
        studyTips: [
          "Drill 10 Hardy-Weinberg problems.",
          "Practice cladogram analysis.",
          "Memorize the requirements for natural selection.",
        ],
      },
      {
        unitNumber: 8,
        title: "Ecology",
        overview:
          "Ecosystem structure, energy flow, nutrient cycles, population dynamics, community interactions, human impacts.",
        examWeight: "10-15%",
        bigIdeas: [
          "Energy flows through ecosystems; nutrients cycle.",
          "Only ~10% of energy transfers between trophic levels.",
          "Population growth: exponential (unchecked) vs logistic (carrying capacity).",
          "Community interactions: competition, predation, symbiosis.",
          "Humans disrupt ecosystems through habitat destruction, invasive species, climate change.",
        ],
        essentials: [
          {
            heading: "Energy flow",
            body: "Producers (autotrophs) capture energy. Consumers (heterotrophs) eat producers and each other. Decomposers recycle. Only ~10% of energy passes to the next trophic level (rest is lost as heat).",
          },
          {
            heading: "Nutrient cycles",
            body: "Carbon cycle: photosynthesis, respiration, combustion. Nitrogen cycle: fixation, nitrification, denitrification. Water cycle: evaporation, condensation, precipitation.",
          },
          {
            heading: "Population dynamics",
            body: "Exponential: dN/dt = rN, unbounded. Logistic: dN/dt = rN(1 - N/K), approaches carrying capacity K. Real populations fluctuate.",
          },
          {
            heading: "Community interactions",
            body: "Competition (-/-), predation (+/-), mutualism (+/+), commensalism (+/0), parasitism (+/-). Keystone species have disproportionate effects on community structure.",
          },
          {
            heading: "Human impact",
            body: "Habitat destruction, invasive species, pollution, climate change, overexploitation. Biodiversity declining.",
          },
        ],
        keyFacts: [
          "10% rule for energy transfer between trophic levels.",
          "Keystone species shape communities.",
          "Carbon and nitrogen are essential for life.",
        ],
        commonMistakes: [
          "Confusing food chains and food webs.",
          "Thinking energy cycles (it flows); nutrients cycle.",
          "Missing the difference between exponential and logistic growth.",
        ],
        examStrategy:
          "Identify the cycle or interaction type. Connect to larger ecosystem dynamics. Use real-world examples.",
        studyTips: [
          "Draw the carbon and nitrogen cycles.",
          "Practice computing energy transfer efficiency.",
          "Memorize community interaction types.",
        ],
      },
    ],
  },

  // =========================================================================
  // AP CHEMISTRY
  // =========================================================================
  "ap-chemistry": {
    courseSlug: "ap-chemistry",
    examFormat: {
      length: "3 hours 15 minutes",
      structure:
        "60 MCQ (90 min) + 7 FRQ (105 min): 3 long, 4 short. Calculator and formula/periodic table provided.",
      scoring: "MCQ 50%, FRQ 50%.",
    },
    framing:
      "AP Chem is the most quantitative of the AP sciences. You must be fluent in stoichiometry, equilibrium, kinetics, and thermodynamics, and you must explain your reasoning in writing on FRQs. The topics build on each other; weak foundations in Unit 1 will hurt you through Unit 9.",
    units: [
      {
        unitNumber: 1,
        title: "Atomic Structure & Properties",
        overview:
          "Atoms, moles, mass spectrometry, electron configuration, periodic trends.",
        examWeight: "7-9%",
        bigIdeas: [
          "Atoms are defined by their number of protons (atomic number).",
          "Mole: 6.022 × 10²³ particles (Avogadro's number).",
          "Mass spectrometry reveals isotope abundance.",
          "Electron configurations follow Aufbau, Pauli, Hund's rules.",
          "Periodic trends: IE, EA, atomic radius, electronegativity.",
        ],
        essentials: [
          {
            heading: "Moles and molar mass",
            body: "1 mole = 6.022 × 10²³ particles. Molar mass (g/mol) comes from the periodic table. Moles = mass/molar mass.",
          },
          {
            heading: "Mass spectrometry",
            body: "Separates ions by mass/charge ratio. Peaks show isotopes and their relative abundances. Weighted average gives atomic mass.",
          },
          {
            heading: "Electron configuration",
            body: "Aufbau: fill from lowest energy. Pauli: no two electrons in the same orbital have the same spin. Hund's: fill degenerate orbitals singly first. Noble gas shorthand: [Ne] 3s² 3p⁴ for S.",
          },
          {
            heading: "Periodic trends",
            body: "Atomic radius: decreases left → right, increases top → bottom. Ionization energy: opposite of radius. Electron affinity: similar to IE but more erratic. Electronegativity: increases left → right, top → bottom (except noble gases).",
          },
          {
            heading: "Photoelectron spectroscopy",
            body: "Measures binding energies of electrons. Peaks correspond to subshells. Higher binding energy = closer to nucleus.",
          },
        ],
        keyFacts: [
          "Avogadro's number: 6.022 × 10²³.",
          "Molar volume of an ideal gas at STP: 22.4 L.",
          "Anomalous configurations: Cr [Ar] 4s¹ 3d⁵, Cu [Ar] 4s¹ 3d¹⁰.",
        ],
        commonMistakes: [
          "Forgetting to convert grams to moles before stoichiometry.",
          "Mixing up ionization energy and electron affinity trends.",
          "Writing electron configurations with the wrong filling order.",
        ],
        examStrategy:
          "Unit 1 is foundational. Drill moles and mass spec calculations. Memorize trends.",
        studyTips: [
          "Solve 20 mole/mass conversion problems.",
          "Write electron configurations for the first 30 elements.",
          "Memorize the periodic trends with visual arrows.",
        ],
      },
      {
        unitNumber: 2,
        title: "Molecular & Ionic Compound Structure & Properties",
        overview:
          "Types of bonds, Lewis structures, VSEPR, molecular shapes, polarity.",
        examWeight: "7-9%",
        bigIdeas: [
          "Ionic bonds: metal + nonmetal, transfer of electrons.",
          "Covalent bonds: nonmetal + nonmetal, sharing of electrons.",
          "Metallic bonds: sea of delocalized electrons.",
          "VSEPR predicts molecular geometry from electron domain count.",
          "Polarity depends on both bond polarity and molecular shape.",
        ],
        essentials: [
          {
            heading: "Types of bonds",
            body: "Ionic: electrostatic attraction between oppositely charged ions. Covalent: shared electron pairs. Metallic: delocalized electrons among a lattice of metal cations.",
          },
          {
            heading: "Lewis structures",
            body: "Count valence electrons. Arrange atoms with the least electronegative in the center. Form single bonds. Add lone pairs. Check octet (or expanded octet for row 3+). Compute formal charges.",
          },
          {
            heading: "VSEPR",
            body: "Count electron domains (bonds + lone pairs). 2: linear. 3: trigonal planar. 4: tetrahedral. 5: trigonal bipyramidal. 6: octahedral. Lone pairs change molecular shape (bent, pyramidal).",
          },
          {
            heading: "Hybridization",
            body: "sp (linear, 2 domains), sp² (trigonal planar, 3), sp³ (tetrahedral, 4), sp³d (5), sp³d² (6).",
          },
          {
            heading: "Polarity",
            body: "Bond polarity from electronegativity difference. Molecular polarity depends on shape: symmetric molecules with polar bonds can be nonpolar overall (e.g., CO₂).",
          },
        ],
        keyFacts: [
          "Water has two lone pairs on O → bent shape → polar.",
          "CO₂ is linear and symmetric → nonpolar despite polar bonds.",
          "sp³ hybridization gives 109.5° bond angles.",
        ],
        commonMistakes: [
          "Confusing electron-domain geometry and molecular geometry.",
          "Forgetting lone pairs in VSEPR count.",
          "Claiming polar bonds always mean polar molecule.",
        ],
        examStrategy:
          "Draw Lewis, then apply VSEPR, then determine polarity. Always show the steps.",
        studyTips: [
          "Drill 20 Lewis structure problems.",
          "Memorize VSEPR geometries and angles.",
          "Practice polarity determination for 10 molecules.",
        ],
      },
      {
        unitNumber: 3,
        title: "Intermolecular Forces & Properties",
        overview:
          "Intermolecular forces (IMFs), states of matter, gas laws, solutions.",
        examWeight: "18-22%",
        bigIdeas: [
          "IMFs determine boiling point, vapor pressure, viscosity.",
          "IMF strength: London dispersion < dipole-dipole < H-bonding < ion-dipole.",
          "Ideal gas law: PV = nRT.",
          "Kinetic molecular theory explains gas behavior.",
          "Solutions: concentration, solubility, colligative properties.",
        ],
        essentials: [
          {
            heading: "Types of IMFs",
            body: "London dispersion (all molecules, weakest). Dipole-dipole (polar molecules). Hydrogen bonding (H attached to N, O, F). Ion-dipole (ions in polar solvents, strongest).",
          },
          {
            heading: "Ideal gas law",
            body: "PV = nRT with R = 0.0821 L·atm/(mol·K). Use for standard conditions. Kinetic molecular theory: gas particles are point masses in constant random motion, no IMFs, collisions elastic.",
          },
          {
            heading: "Real gases",
            body: "Deviate from ideal behavior at high pressure and low temperature (IMFs and particle volume matter). Van der Waals equation corrects for both.",
          },
          {
            heading: "Solutions",
            body: "Concentration: molarity (M = mol/L), molality (m = mol/kg). 'Like dissolves like'. Temperature affects solubility.",
          },
          {
            heading: "Phase diagrams",
            body: "Pressure-temperature diagrams show solid, liquid, gas regions. Triple point, critical point. Lines are phase boundaries.",
          },
        ],
        keyFacts: [
          "Water has exceptionally strong H-bonds.",
          "Boiling point increases with IMF strength.",
          "Ideal gas: assume no IMFs, no molecular volume.",
        ],
        commonMistakes: [
          "Forgetting to include London dispersion in all molecules.",
          "Mixing up molarity and molality.",
          "Using ideal gas law for real gases at high P.",
        ],
        examStrategy:
          "Identify IMFs first. Use them to predict properties. For gas problems, apply PV = nRT with correct units.",
        studyTips: [
          "Rank IMFs for 10 molecule pairs.",
          "Drill ideal gas calculations.",
          "Practice identifying polar vs nonpolar solvents.",
        ],
      },
      {
        unitNumber: 4,
        title: "Chemical Reactions",
        overview:
          "Balancing equations, stoichiometry, types of reactions, titrations.",
        examWeight: "7-9%",
        bigIdeas: [
          "Balanced equations conserve atoms and charge.",
          "Stoichiometry: mole ratios from the balanced equation.",
          "Types of reactions: synthesis, decomposition, single replacement, double replacement, combustion.",
          "Net ionic equations show only species that change.",
          "Redox: oxidation = loss of electrons, reduction = gain.",
        ],
        essentials: [
          {
            heading: "Balancing",
            body: "Balance elements first, then hydrogen, then oxygen. For redox: balance atoms, then electrons, then charge.",
          },
          {
            heading: "Stoichiometry",
            body: "Convert mass → moles → moles (via ratio) → moles → mass. Watch for limiting reagent (the one that runs out first). Percent yield = actual/theoretical × 100.",
          },
          {
            heading: "Types of reactions",
            body: "Synthesis: A + B → AB. Decomposition: AB → A + B. Single replacement: A + BC → AC + B. Double replacement: AB + CD → AD + CB. Combustion: hydrocarbon + O₂ → CO₂ + H₂O.",
          },
          {
            heading: "Net ionic equations",
            body: "Write full equation. Split aqueous strong electrolytes into ions. Cancel spectators. Result: only species that changed.",
          },
          {
            heading: "Redox",
            body: "Oxidation: loses electrons, increase in oxidation state. Reduction: gains electrons, decrease in state. Balance half-reactions separately, then combine.",
          },
        ],
        keyFacts: [
          "Oxidation states: in a compound, sum = 0 (or charge for ions).",
          "Strong acids/bases dissociate completely.",
          "Limiting reagent determines the theoretical yield.",
        ],
        commonMistakes: [
          "Not balancing equations before computing stoichiometry.",
          "Forgetting that the limiting reagent runs out first.",
          "Mixing up oxidation and reduction.",
        ],
        examStrategy:
          "Always balance first. Show each step in stoichiometric conversions. For redox, balance half-reactions.",
        studyTips: [
          "Balance 20 equations, including redox.",
          "Drill limiting reagent problems.",
          "Practice writing net ionic equations.",
        ],
      },
      {
        unitNumber: 5,
        title: "Kinetics",
        overview:
          "Reaction rates, rate laws, reaction mechanisms, activation energy, catalysis.",
        examWeight: "8-12%",
        bigIdeas: [
          "Rate = -Δ[reactant]/Δt = Δ[product]/Δt.",
          "Rate law: rate = k[A]^m[B]^n. Orders determined experimentally.",
          "Collision theory: reactions require effective collisions with sufficient energy and proper orientation.",
          "Activation energy is the minimum energy to react.",
          "Catalysts lower E_a without being consumed.",
        ],
        essentials: [
          {
            heading: "Rate laws",
            body: "rate = k[A]^m[B]^n. m and n are orders (often 0, 1, or 2). Determine orders from initial rate experiments: change [A], measure rate change.",
          },
          {
            heading: "Integrated rate laws",
            body: "0th order: [A] = [A]₀ - kt. 1st order: ln[A] = ln[A]₀ - kt. 2nd order: 1/[A] = 1/[A]₀ + kt. Half-life: 0th: [A]₀/(2k); 1st: ln2/k; 2nd: 1/(k[A]₀).",
          },
          {
            heading: "Reaction mechanisms",
            body: "Overall reaction = sum of elementary steps. Rate-determining step (slowest) sets the overall rate. Rate law from the rate-determining step.",
          },
          {
            heading: "Activation energy",
            body: "Minimum energy needed for reaction. Transition state is the high-energy configuration. Catalysts provide alternative pathways with lower E_a.",
          },
          {
            heading: "Arrhenius equation",
            body: "k = A·e^(-E_a/RT). Higher T → higher k. Higher E_a → lower k.",
          },
        ],
        keyFacts: [
          "Half-life depends on order.",
          "First-order half-life is independent of concentration.",
          "Catalysts don't change thermodynamics, only kinetics.",
        ],
        commonMistakes: [
          "Confusing reaction order with stoichiometric coefficients.",
          "Using integrated rate laws for the wrong order.",
          "Thinking catalysts increase yield (they don't; they just speed up equilibrium approach).",
        ],
        examStrategy:
          "Determine the order from experimental data. Apply the matching integrated rate law. Use Arrhenius for temperature dependence.",
        studyTips: [
          "Memorize integrated rate laws and half-lives for 0, 1, 2 orders.",
          "Drill 10 order-determination problems.",
          "Practice rate-determining step analysis.",
        ],
      },
      {
        unitNumber: 6,
        title: "Thermodynamics",
        overview:
          "Enthalpy, calorimetry, bond energies, Hess's law, entropy and free energy.",
        examWeight: "7-9%",
        bigIdeas: [
          "Enthalpy ΔH: heat at constant pressure. Exothermic: ΔH<0. Endothermic: ΔH>0.",
          "Calorimetry: q = mcΔT.",
          "Hess's law: ΔH for a reaction = sum of ΔH for steps.",
          "Bond energy: energy to break a bond. Reaction ΔH ≈ bonds broken - bonds formed.",
          "Standard enthalpy of formation ΔH°_f tabulated for common compounds.",
        ],
        essentials: [
          {
            heading: "Enthalpy and calorimetry",
            body: "ΔH = q_p (heat at constant pressure). Calorimetry: q = mcΔT. Units: J or kJ. Conservation: q_hot + q_cold = 0.",
          },
          {
            heading: "Hess's law",
            body: "ΔH for an overall reaction equals the sum of ΔH for individual steps. Use known reactions (combustion, formation) to compute unknown ΔH.",
          },
          {
            heading: "Bond energies",
            body: "ΔH ≈ Σ(bonds broken) - Σ(bonds formed). Approximate; doesn't account for state or entropy.",
          },
          {
            heading: "Standard formation enthalpies",
            body: "ΔH°_rxn = Σn·ΔH°_f(products) - Σn·ΔH°_f(reactants). ΔH°_f of elements in standard state is zero.",
          },
        ],
        keyFacts: [
          "Specific heat of water: 4.18 J/(g·°C).",
          "Exothermic reactions release heat.",
          "Bond breaking requires energy; bond forming releases energy.",
        ],
        commonMistakes: [
          "Sign errors on endothermic/exothermic reactions.",
          "Forgetting to multiply by stoichiometric coefficients in Hess's law.",
          "Using bond energy method when more accurate data is available.",
        ],
        examStrategy:
          "Decide which method to use: calorimetry, Hess's law, formation enthalpies, or bond energies. Show work.",
        studyTips: [
          "Drill calorimetry with coffee-cup and bomb calorimeters.",
          "Practice Hess's law with 3-5 step combinations.",
          "Memorize q = mcΔT.",
        ],
      },
      {
        unitNumber: 7,
        title: "Equilibrium",
        overview:
          "Equilibrium constants, ICE tables, Le Chatelier's principle, solubility, common-ion effect.",
        examWeight: "10-15%",
        bigIdeas: [
          "Equilibrium: forward and reverse rates are equal.",
          "K_eq: ratio of products to reactants at equilibrium.",
          "Reaction quotient Q compared to K: Q<K (→ forward), Q=K (equilibrium), Q>K (→ reverse).",
          "Le Chatelier: system responds to shift the stress.",
          "Ksp: solubility product for sparingly soluble salts.",
        ],
        essentials: [
          {
            heading: "Equilibrium constant",
            body: "For aA + bB ⇌ cC + dD: K = [C]^c[D]^d / ([A]^a[B]^b). Pure solids and liquids excluded. K_p uses partial pressures for gases.",
          },
          {
            heading: "ICE tables",
            body: "Initial, Change, Equilibrium. Used to find equilibrium concentrations. Define x as the change, express E in terms of x, plug into K expression, solve.",
          },
          {
            heading: "Le Chatelier's principle",
            body: "Adding reactants shifts forward. Adding products shifts reverse. Increasing T shifts endothermic direction. Changing pressure affects gas mole counts.",
          },
          {
            heading: "Solubility equilibria",
            body: "For slightly soluble salt MX: K_sp = [M+][X-]. Common-ion effect: adding a common ion decreases solubility.",
          },
          {
            heading: "pH and solubility",
            body: "Many salts are more soluble in acid (if anion is a weak base). E.g., CaCO₃ dissolves in acid because CO₃²⁻ + H⁺ → HCO₃⁻.",
          },
        ],
        keyFacts: [
          "K is dimensionless by convention.",
          "K > 1: products favored. K < 1: reactants favored.",
          "Temperature changes K; concentration changes don't.",
        ],
        commonMistakes: [
          "Including pure solids and liquids in K expression.",
          "Forgetting the stoichiometric coefficients as exponents.",
          "Using Le Chatelier to predict K change due to concentration (it doesn't).",
        ],
        examStrategy:
          "Write the K expression first. Set up the ICE table. Solve for x, then equilibrium values. Interpret Le Chatelier shifts qualitatively.",
        studyTips: [
          "Drill ICE tables for 10 scenarios.",
          "Practice K_sp and common-ion effect.",
          "Memorize Le Chatelier's shifts for concentration, pressure, temperature.",
        ],
      },
      {
        unitNumber: 8,
        title: "Acids & Bases",
        overview:
          "Strong and weak acids/bases, pH, equilibrium, titrations, buffers.",
        examWeight: "11-15%",
        bigIdeas: [
          "pH = -log[H+]. pOH = -log[OH-]. pH + pOH = 14 at 25°C.",
          "Strong acid/base: fully dissociates.",
          "Weak acid/base: partial dissociation, K_a or K_b.",
          "Buffers: weak acid + conjugate base, resist pH change.",
          "Henderson-Hasselbalch: pH = pKa + log([A-]/[HA]).",
        ],
        essentials: [
          {
            heading: "Strong acids and bases",
            body: "Strong acids: HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄, HClO₃. Strong bases: Group 1 hydroxides, Ca(OH)₂, Sr(OH)₂, Ba(OH)₂. Fully dissociate in water.",
          },
          {
            heading: "Weak acids and bases",
            body: "Partial dissociation. HA ⇌ H+ + A-, K_a = [H+][A-]/[HA]. Use ICE table with small-x approximation when K is small.",
          },
          {
            heading: "pH calculations",
            body: "Strong acid: pH = -log[acid]. Weak acid: ICE table. Ka·Kb = Kw for conjugate pairs.",
          },
          {
            heading: "Buffers",
            body: "Weak acid + conjugate base resists pH change. Henderson-Hasselbalch: pH = pKa + log([A-]/[HA]). Effective range: pKa ± 1.",
          },
          {
            heading: "Titrations",
            body: "Strong-strong: equivalence at pH 7. Weak-strong: pH depends on which is in excess; at half-equivalence, pH = pKa.",
          },
        ],
        keyFacts: [
          "K_w = [H+][OH-] = 10⁻¹⁴ at 25°C.",
          "Buffer pH changes slowly as small amounts of acid/base are added.",
          "At half-equivalence in a weak acid titration, pH = pKa.",
        ],
        commonMistakes: [
          "Confusing strong and weak acids.",
          "Using log₁₀ when calculator is set to ln.",
          "Forgetting buffer range (pKa ± 1).",
        ],
        examStrategy:
          "Identify strong vs weak. Use ICE tables for weak acids. Apply Henderson-Hasselbalch for buffers.",
        studyTips: [
          "Drill pH calculations for strong and weak acids.",
          "Practice buffer calculations with Henderson-Hasselbalch.",
          "Sketch titration curves for strong-strong and weak-strong.",
        ],
      },
      {
        unitNumber: 9,
        title: "Applications of Thermodynamics",
        overview:
          "Entropy, Gibbs free energy, spontaneity, electrochemistry.",
        examWeight: "7-9%",
        bigIdeas: [
          "Entropy S: measure of disorder.",
          "Gibbs free energy: ΔG = ΔH - TΔS.",
          "ΔG < 0: spontaneous. ΔG = 0: equilibrium. ΔG > 0: non-spontaneous.",
          "ΔG° = -RT ln K, relating thermodynamics to equilibrium.",
          "Electrochemistry: galvanic cells generate electricity; electrolytic cells consume it.",
        ],
        essentials: [
          {
            heading: "Entropy",
            body: "Entropy increases going from solid → liquid → gas. More particles means more entropy. ΔS°_rxn = ΣS°(products) - ΣS°(reactants).",
          },
          {
            heading: "Gibbs free energy",
            body: "ΔG = ΔH - TΔS. Spontaneity depends on signs and temperature: ΔH<0, ΔS>0: always spontaneous. ΔH>0, ΔS<0: never spontaneous. Mixed cases depend on T.",
          },
          {
            heading: "ΔG° and equilibrium",
            body: "ΔG° = -RT ln K. Relates standard free energy to equilibrium constant. Large K → negative ΔG°.",
          },
          {
            heading: "Electrochemistry basics",
            body: "Oxidation at anode, reduction at cathode. Cell potential E°_cell = E°_cathode - E°_anode. Spontaneous if E°_cell > 0.",
          },
          {
            heading: "Nernst equation",
            body: "E = E° - (RT/nF)·ln Q. Under non-standard conditions, cell potential shifts.",
          },
          {
            heading: "Electrolysis",
            body: "Non-spontaneous reactions driven by an external source. Faraday's law: moles of electrons = current × time / Faraday constant.",
          },
        ],
        keyFacts: [
          "R = 8.314 J/(mol·K).",
          "Faraday constant: 96,500 C/mol electrons.",
          "ΔG°_f of elements in standard states is zero.",
        ],
        commonMistakes: [
          "Mixing up ΔG and ΔG°.",
          "Forgetting the sign in Nernst equation.",
          "Confusing galvanic and electrolytic cells.",
        ],
        examStrategy:
          "Apply ΔG = ΔH - TΔS. For electrochemistry, identify cathode and anode, compute E°_cell. For electrolysis, use Faraday's law.",
        studyTips: [
          "Drill 10 ΔG spontaneity problems.",
          "Practice E°_cell calculations from tables.",
          "Memorize Faraday's law.",
        ],
      },
    ],
  },

  // =========================================================================
  // AP ENVIRONMENTAL SCIENCE
  // =========================================================================
  "ap-environmental": {
    courseSlug: "ap-environmental",
    examFormat: {
      length: "2 hours 40 minutes",
      structure: "80 MCQ (90 min) + 3 FRQ (70 min).",
      scoring: "MCQ 60%, FRQ 40%. Calculator allowed.",
    },
    framing:
      "APES is a content-heavy course that combines ecology, geology, earth science, and environmental policy. The FRQs reward data interpretation and clear writing. You're less likely to be asked for a formula than to analyze a graph and propose a solution.",
    units: [
      {
        unitNumber: 1,
        title: "The Living World: Ecosystems",
        overview:
          "Biogeochemical cycles, energy flow, trophic levels, primary productivity.",
        examWeight: "6-8%",
        bigIdeas: [
          "Energy flows in one direction; nutrients cycle.",
          "Biogeochemical cycles: carbon, nitrogen, phosphorus, water.",
          "Only ~10% of energy transfers between trophic levels.",
          "Primary productivity limits ecosystem energy.",
          "Food webs show multi-directional trophic interactions.",
        ],
        essentials: [
          {
            heading: "Biogeochemical cycles",
            body: "Carbon: photosynthesis, respiration, combustion, decomposition. Nitrogen: fixation (bacteria), ammonification, nitrification, denitrification. Phosphorus: weathering of rock, uptake by plants, no gaseous phase. Water: evaporation, condensation, precipitation.",
          },
          {
            heading: "Energy flow",
            body: "Producers → primary consumers → secondary consumers → tertiary. 10% rule: only 10% of energy passes to next level, rest lost as heat.",
          },
          {
            heading: "Primary productivity",
            body: "GPP = total photosynthesis. NPP = GPP - respiration. Higher near the equator, higher in wetter biomes.",
          },
          {
            heading: "Food chains and webs",
            body: "Chains are linear; webs show the complexity. Keystone species can have disproportionate effects.",
          },
        ],
        keyFacts: [
          "Nitrogen-fixing bacteria in legume root nodules.",
          "Phosphorus has no atmospheric cycle.",
          "Tropical rainforests have highest NPP per area.",
        ],
        commonMistakes: [
          "Calling NPP and GPP interchangeable.",
          "Forgetting that carbon cycle includes fossil fuels.",
          "Confusing ammonification and denitrification.",
        ],
        examStrategy:
          "Be ready to explain how humans disrupt each biogeochemical cycle. Quantitative problems often involve the 10% rule.",
        studyTips: [
          "Draw each biogeochemical cycle with human impacts.",
          "Practice trophic level calculations using 10% rule.",
          "Memorize productivity of major biomes.",
        ],
      },
      {
        unitNumber: 2,
        title: "The Living World: Biodiversity",
        overview:
          "Species diversity, ecosystem services, island biogeography, succession, adaptation.",
        examWeight: "6-8%",
        bigIdeas: [
          "Biodiversity provides ecosystem services.",
          "Larger and closer-to-mainland islands support more species.",
          "Ecological succession: primary (bare rock) vs secondary (disturbance).",
          "Adaptations are heritable traits that improve fitness.",
          "Disruptions drive ecosystem change: natural and anthropogenic.",
        ],
        essentials: [
          {
            heading: "Biodiversity and services",
            body: "Genetic, species, and ecosystem diversity. Services: provisioning (food, water), regulating (climate, flood), cultural (recreation), supporting (nutrient cycling).",
          },
          {
            heading: "Island biogeography",
            body: "Species richness depends on island size (larger = more species) and distance from mainland (closer = more species). Equilibrium between immigration and extinction.",
          },
          {
            heading: "Succession",
            body: "Primary: starts on bare rock (after glaciation or volcanism). Pioneer species like lichens. Secondary: after disturbance (fire, flood); soil remains. Faster than primary.",
          },
          {
            heading: "Adaptation",
            body: "Heritable traits that improve survival and reproduction in a specific environment. Accumulated over generations by natural selection.",
          },
        ],
        keyFacts: [
          "Biodiversity hotspots: Amazon, Madagascar, coral reefs.",
          "Primary succession is slower than secondary.",
          "Keystone species drive community structure.",
        ],
        commonMistakes: [
          "Confusing primary and secondary succession.",
          "Not distinguishing genetic and species diversity.",
          "Assuming all disruptions are harmful.",
        ],
        examStrategy:
          "Use specific examples (climate change, invasive species, habitat destruction) when discussing disruptions.",
        studyTips: [
          "Memorize primary vs secondary succession.",
          "Practice island biogeography graphs.",
          "List ecosystem services for 5 biomes.",
        ],
      },
      {
        unitNumber: 3,
        title: "Populations",
        overview:
          "Population dynamics, growth models, carrying capacity, age structure, human population.",
        examWeight: "10-15%",
        bigIdeas: [
          "Generalists vs specialists.",
          "r-selected: many offspring, low survival. K-selected: few offspring, high investment.",
          "Exponential vs logistic growth.",
          "Carrying capacity limits population size.",
          "Human population growth follows the demographic transition model.",
        ],
        essentials: [
          {
            heading: "Generalists and specialists",
            body: "Generalists: tolerate a wide range of conditions (raccoons). Specialists: narrow requirements (pandas). Generalists more resilient to change.",
          },
          {
            heading: "r and K selection",
            body: "r-selected: high r, short life, many offspring, low parental care (insects). K-selected: long life, few offspring, high parental care (elephants).",
          },
          {
            heading: "Population growth",
            body: "Exponential: dN/dt = rN. Logistic: dN/dt = rN(1 - N/K). K is carrying capacity. Real populations fluctuate.",
          },
          {
            heading: "Age structure diagrams",
            body: "Pyramid shape: rapidly growing (wide base), stable (even), declining (narrow base). Used to predict future population.",
          },
          {
            heading: "Demographic transition model",
            body: "4 stages: 1) high birth and death, low growth. 2) falling death, high growth. 3) falling birth, slowing growth. 4) low birth and death, low growth.",
          },
        ],
        keyFacts: [
          "Doubling time = 70/growth rate (%).",
          "Total fertility rate (TFR) of 2.1 maintains population.",
          "Rule of 70 works for exponential growth.",
        ],
        commonMistakes: [
          "Confusing r and K selection.",
          "Mixing exponential and logistic graphs.",
          "Forgetting the demographic transition is descriptive, not predictive.",
        ],
        examStrategy:
          "Use the rule of 70 for growth rate problems. Identify age structure type and predict future.",
        studyTips: [
          "Memorize r vs K characteristics.",
          "Drill exponential vs logistic math.",
          "Practice reading age structure diagrams.",
        ],
      },
      {
        unitNumber: 4,
        title: "Earth Systems & Resources",
        overview:
          "Plate tectonics, soil, atmosphere, weather, climate.",
        examWeight: "10-15%",
        bigIdeas: [
          "Plate tectonics drives earthquakes, volcanoes, mountain building.",
          "Soil forms from weathered rock and organic matter.",
          "Atmosphere has layered structure; ozone in stratosphere blocks UV.",
          "Global wind patterns driven by uneven heating and Coriolis.",
          "Climate shaped by latitude, altitude, proximity to water.",
        ],
        essentials: [
          {
            heading: "Plate tectonics",
            body: "Plates move due to convection in mantle. Convergent: subduction, mountains, trenches. Divergent: ridges, rifts. Transform: earthquakes.",
          },
          {
            heading: "Soil",
            body: "Formed from weathered rock + organic matter. Horizons: O, A, B, C. Texture: sand, silt, clay. Loam is ideal for agriculture.",
          },
          {
            heading: "Atmosphere",
            body: "Troposphere (weather, 0-12 km), stratosphere (ozone, 12-50 km), mesosphere, thermosphere. Ozone in stratosphere absorbs UV.",
          },
          {
            heading: "Global winds",
            body: "Hadley cells near equator. Ferrel cells at mid-latitudes. Polar cells at high latitudes. Coriolis deflects: right in N hemisphere, left in S.",
          },
          {
            heading: "Climate factors",
            body: "Latitude (tropics vs poles), altitude (higher = cooler), water proximity (moderates), ocean currents, rain shadows.",
          },
        ],
        keyFacts: [
          "Ozone layer: 12-50 km altitude.",
          "Earth's tilt causes seasons.",
          "Loam = ~40% sand, 40% silt, 20% clay.",
        ],
        commonMistakes: [
          "Confusing troposphere and stratosphere.",
          "Thinking ozone in troposphere is beneficial (it's a pollutant).",
          "Mixing up convergent and divergent boundaries.",
        ],
        examStrategy:
          "Know the atmosphere layers and what each does. Connect plate tectonics to specific hazards.",
        studyTips: [
          "Sketch the atmosphere layers with labels.",
          "Map major tectonic boundaries.",
          "Memorize soil horizons.",
        ],
      },
      {
        unitNumber: 5,
        title: "Land & Water Use",
        overview:
          "Agriculture, forestry, mining, fisheries, sustainability.",
        examWeight: "10-15%",
        bigIdeas: [
          "Tragedy of the commons: shared resources get overexploited.",
          "Industrial agriculture has high yields but environmental costs.",
          "Deforestation reduces biodiversity and increases CO₂.",
          "Overfishing collapses fisheries.",
          "Sustainable practices balance extraction with regeneration.",
        ],
        essentials: [
          {
            heading: "Tragedy of the commons",
            body: "Individuals overuse shared resources (pasture, fisheries, atmosphere) when there's no incentive to conserve. Solutions: regulation, privatization, community management.",
          },
          {
            heading: "Agriculture impacts",
            body: "Pesticides, fertilizer runoff, monocultures, irrigation salinization, erosion. Sustainable alternatives: crop rotation, IPM (integrated pest management), no-till farming, cover crops.",
          },
          {
            heading: "Forestry",
            body: "Clearcutting: removes all trees. Selective: leaves some. Reforestation can restore but old-growth is irreplaceable in human timescales.",
          },
          {
            heading: "Fisheries",
            body: "Overfishing depletes stocks. Bycatch kills non-target species. Aquaculture reduces pressure on wild stocks but has its own impacts.",
          },
          {
            heading: "Mining and urbanization",
            body: "Mining disturbs land and water quality. Urbanization increases runoff (impervious surfaces), heat islands.",
          },
        ],
        keyFacts: [
          "Monocultures are vulnerable to pests and disease.",
          "Green Revolution increased yields via high-yield varieties + fertilizer.",
          "Aquaculture has doubled in recent decades.",
        ],
        commonMistakes: [
          "Thinking all agriculture is harmful.",
          "Missing the distinction between renewable and nonrenewable resources.",
          "Confusing selective logging and clearcutting.",
        ],
        examStrategy:
          "Propose trade-offs: economic vs environmental. Use specific examples.",
        studyTips: [
          "Memorize sustainable agriculture practices.",
          "Drill tragedy of the commons scenarios.",
          "Practice data interpretation from land-use charts.",
        ],
      },
      {
        unitNumber: 6,
        title: "Energy Resources & Consumption",
        overview:
          "Fossil fuels, nuclear, renewable energy sources, efficiency.",
        examWeight: "10-15%",
        bigIdeas: [
          "Fossil fuels dominate but are finite and polluting.",
          "Nuclear has low CO₂ but waste and accident risks.",
          "Renewables (solar, wind, hydro, geothermal) are growing.",
          "Energy conservation is often more cost-effective than new generation.",
          "Each source has distinct benefits and drawbacks.",
        ],
        essentials: [
          {
            heading: "Fossil fuels",
            body: "Coal, oil, natural gas. High energy density, established infrastructure. Emit CO₂ and particulates. Finite.",
          },
          {
            heading: "Nuclear",
            body: "Fission of uranium. Low CO₂, high power output. Waste storage challenges. Accidents (Chernobyl, Fukushima) rare but severe.",
          },
          {
            heading: "Solar",
            body: "Photovoltaic (direct electricity) and thermal (heat). Intermittent, land-intensive. Costs dropping rapidly.",
          },
          {
            heading: "Wind",
            body: "Turbines convert wind kinetic energy. Intermittent, affects bird populations. Onshore and offshore.",
          },
          {
            heading: "Hydro and geothermal",
            body: "Hydro: reliable but disrupts rivers and displaces communities. Geothermal: constant but location-limited.",
          },
          {
            heading: "Biomass and biofuels",
            body: "Wood, crops, waste. Carbon-neutral in principle but production can be harmful.",
          },
        ],
        keyFacts: [
          "Fossil fuels supply ~80% of global energy.",
          "Nuclear supplies ~10%.",
          "Renewables growing fastest.",
        ],
        commonMistakes: [
          "Calling nuclear a renewable (it's not).",
          "Assuming biomass is always sustainable.",
          "Forgetting energy efficiency measures.",
        ],
        examStrategy:
          "Compare energy sources on CO₂, cost, reliability, land use.",
        studyTips: [
          "Build a table comparing energy sources.",
          "Memorize fuel types and uses.",
          "Practice energy efficiency calculations.",
        ],
      },
      {
        unitNumber: 7,
        title: "Atmospheric Pollution",
        overview:
          "Air pollution sources, photochemical smog, indoor pollution, acid rain, noise.",
        examWeight: "7-10%",
        bigIdeas: [
          "Primary pollutants emitted directly; secondary form in atmosphere.",
          "Photochemical smog: sunlight + NOx + VOCs → ground-level ozone.",
          "Thermal inversion traps pollution.",
          "Acid rain: SOx and NOx form H₂SO₄ and HNO₃.",
          "Indoor pollutants: radon, CO, VOCs from products.",
        ],
        essentials: [
          {
            heading: "Air pollutants",
            body: "Primary: CO, SOx, NOx, particulates, VOCs, lead. Secondary: ozone (O₃), acid rain components. Sources: vehicles, power plants, industry.",
          },
          {
            heading: "Smog",
            body: "Photochemical smog: NOx + VOCs + sunlight → ozone + other oxidants. Forms on hot sunny days in cities. Thermal inversion: warm air above cool air traps pollution at ground level.",
          },
          {
            heading: "Acid rain",
            body: "SO₂ + O₂ + H₂O → H₂SO₄. NO₂ + O₂ + H₂O → HNO₃. Damages ecosystems, erodes buildings. Addressed by Clean Air Act (SO₂ caps).",
          },
          {
            heading: "Indoor pollution",
            body: "Radon (radioactive gas from soil), CO (incomplete combustion), asbestos, VOCs from paint/cleaning, secondhand smoke.",
          },
        ],
        keyFacts: [
          "Ground-level ozone is bad for health.",
          "Stratospheric ozone is good.",
          "Radon is the 2nd leading cause of lung cancer after smoking.",
        ],
        commonMistakes: [
          "Confusing good and bad ozone.",
          "Mixing up primary and secondary pollutants.",
          "Forgetting that thermal inversion is a trapping mechanism.",
        ],
        examStrategy:
          "Identify pollutant type and source. Explain formation chemistry.",
        studyTips: [
          "List primary and secondary pollutants.",
          "Draw thermal inversion.",
          "Memorize indoor pollution sources.",
        ],
      },
      {
        unitNumber: 8,
        title: "Aquatic & Terrestrial Pollution",
        overview:
          "Water pollution, solid waste, pollution effects on human health.",
        examWeight: "7-10%",
        bigIdeas: [
          "Point sources (pipes) vs nonpoint sources (runoff).",
          "Eutrophication: nutrient enrichment → algal bloom → hypoxia.",
          "POPs and heavy metals bioaccumulate and biomagnify.",
          "Solid waste disposal: landfills, incineration, recycling.",
          "Pathogens cause infectious disease.",
        ],
        essentials: [
          {
            heading: "Water pollution",
            body: "Sources: sewage, runoff (agricultural, urban), industrial. Eutrophication from N and P → algal bloom → decomposition uses O₂ → hypoxic dead zone.",
          },
          {
            heading: "Bioaccumulation and biomagnification",
            body: "Persistent toxins (DDT, PCBs, mercury) accumulate in organisms. Biomagnify up the food chain; top predators accumulate the most.",
          },
          {
            heading: "Solid waste",
            body: "Landfills: cheap but leachate and methane. Incineration: reduces volume but air pollution. Reduction and recycling best.",
          },
          {
            heading: "Pollution and health",
            body: "LD50: dose lethal to 50% of population. Dose-response curves. Thresholds. Acute vs chronic exposure.",
          },
          {
            heading: "Infectious diseases",
            body: "Cholera from contaminated water. Malaria from mosquito vectors. Lyme from ticks. Climate change alters vector distribution.",
          },
        ],
        keyFacts: [
          "Eutrophication is caused by N and P.",
          "DDT famously biomagnified in bald eagles.",
          "LD50 measures toxicity.",
        ],
        commonMistakes: [
          "Confusing bioaccumulation (within individual) and biomagnification (up food chain).",
          "Missing nonpoint sources of water pollution.",
          "Forgetting solid waste reduction hierarchy.",
        ],
        examStrategy:
          "Draw the biomagnification pyramid. Trace pollutant paths from source to top predator.",
        studyTips: [
          "Memorize the waste hierarchy (reduce, reuse, recycle, recover, dispose).",
          "Practice eutrophication scenarios.",
          "Drill dose-response curve questions.",
        ],
      },
      {
        unitNumber: 9,
        title: "Global Change",
        overview:
          "Ozone depletion, greenhouse effect, climate change, ocean acidification, biodiversity loss.",
        examWeight: "15-20%",
        bigIdeas: [
          "CFCs destroyed stratospheric ozone (Montreal Protocol banned).",
          "Greenhouse gases trap heat, warming the planet.",
          "CO₂, methane, N₂O, water vapor are key GHGs.",
          "Ocean warming and acidification threaten marine life.",
          "Invasive species and extinction reduce biodiversity.",
        ],
        essentials: [
          {
            heading: "Ozone depletion",
            body: "CFCs released Cl radicals that destroyed O₃ in the stratosphere. Worst in Antarctica (ozone hole). Montreal Protocol (1987) banned CFCs.",
          },
          {
            heading: "Greenhouse effect",
            body: "Sun's radiation warms Earth. Earth emits IR. Greenhouse gases absorb IR and re-radiate, warming atmosphere. Without it, Earth would be -18°C.",
          },
          {
            heading: "Climate change",
            body: "Enhanced greenhouse effect from human emissions. CO₂ from fossil fuels, deforestation. Methane from livestock, rice, landfills. Warming, sea level rise, extreme weather.",
          },
          {
            heading: "Ocean acidification",
            body: "CO₂ dissolves in ocean, forms H₂CO₃. Lowers pH. Threatens calcifying organisms (corals, shellfish).",
          },
          {
            heading: "Invasive species and extinction",
            body: "Non-native species disrupt ecosystems. Extinction rates 100-1000× background. Sixth mass extinction.",
          },
        ],
        keyFacts: [
          "Pre-industrial CO₂: 280 ppm. Today: 420+ ppm.",
          "Methane is ~30× more potent than CO₂ (per molecule).",
          "Global average temperature has risen ~1°C since pre-industrial times.",
        ],
        commonMistakes: [
          "Confusing ozone depletion and climate change (different problems).",
          "Thinking climate change is the same as weather.",
          "Missing the ocean as a carbon sink.",
        ],
        examStrategy:
          "Use data to argue. Distinguish correlation and causation in climate graphs. Propose concrete mitigation strategies.",
        studyTips: [
          "Memorize greenhouse gases and their sources.",
          "Draw the greenhouse effect.",
          "Practice climate change FRQs.",
        ],
      },
    ],
  },
};
