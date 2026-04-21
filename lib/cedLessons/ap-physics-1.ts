import type { CourseCedLessons } from "./types";

/**
 * AP Physics 1 CED lessons — every topic from Units 1-8 of the 2024-25 CED.
 * The revised framework added Fluids (Unit 8) and restructured rotational
 * mechanics into Units 5-6. Content is algebra-based; vectors are used
 * geometrically without calculus. Inline LaTeX uses \\(...\\) so the
 * MathRender pipeline picks it up.
 *
 * Tone: mechanism first, equation second. Every lesson points back to a
 * conservation law or Newton's laws — AP FRQs award more points for
 * correct physics reasoning than for correct algebra.
 */

export const AP_PHYSICS_1_CED_LESSONS: CourseCedLessons = {
  // =========================================================================
  // UNIT 1 — KINEMATICS
  // =========================================================================
  "1.1": {
    id: "1.1",
    title: "Position, Velocity, and Acceleration",
    summary:
      "Position is where an object is, velocity is how fast its position changes, and acceleration is how fast its velocity changes — each is a vector, each is the rate of change of the previous.",
    lesson:
      "Position \\(x\\) is a vector from a chosen origin. In 1D we often drop the arrow and use signed numbers: positive to the right, negative to the left. The change \\(\\Delta x = x_f - x_i\\) is **displacement** — a vector. **Distance** is the total path length, a scalar that ignores direction. These are different: a lap around a 400 m track has distance 400 m but displacement 0.\n\nAverage velocity is \\(\\bar{v} = \\Delta x / \\Delta t\\). Instantaneous velocity is the slope of the position-vs-time graph at an instant. Speed is \\(|v|\\) — never negative.\n\nAcceleration is the rate of change of velocity: \\(\\bar{a} = \\Delta v / \\Delta t\\). Sign matters: negative acceleration doesn't always mean slowing down. A car moving in the \\(-x\\) direction with \\(a < 0\\) is speeding up. An object is speeding up when \\(v\\) and \\(a\\) have the same sign, slowing down when they have opposite signs.\n\nFor constant acceleration, the kinematic equations apply:\n- \\(v = v_0 + at\\)\n- \\(x = x_0 + v_0 t + \\tfrac{1}{2}at^2\\)\n- \\(v^2 = v_0^2 + 2a\\,\\Delta x\\)\n\nFree fall is a special case: near Earth's surface, \\(a = -g = -9.8\\,\\text{m/s}^2\\) (downward) with no air resistance.",
    keyIdeas: [
      "Position, velocity, and acceleration are vectors; signs encode direction in 1D.",
      "Distance is a scalar (path length); displacement is a vector (net change).",
      "Speeding up ⇔ \\(v\\) and \\(a\\) have the same sign.",
      "The three kinematic equations hold only when acceleration is constant.",
    ],
    workedExample: {
      prompt:
        "A ball is thrown straight up with initial speed \\(20\\,\\text{m/s}\\). How high does it rise, and how long until it returns to the thrower's hand? Use \\(g = 10\\,\\text{m/s}^2\\).",
      solution:
        "At the peak, \\(v = 0\\). Using \\(v^2 = v_0^2 - 2g\\,\\Delta y\\): \\(0 = 400 - 20\\,\\Delta y\\), so \\(\\Delta y = 20\\,\\text{m}\\). Time to peak from \\(v = v_0 - gt\\): \\(0 = 20 - 10t\\Rightarrow t = 2\\,\\text{s}\\). By symmetry, total time aloft is \\(4\\,\\text{s}\\).",
    },
    commonMistakes: [
      "Confusing distance and displacement on round-trip problems.",
      "Assuming negative acceleration means decelerating — it depends on velocity's sign.",
      "Using the kinematic equations when acceleration isn't constant.",
    ],
  },
  "1.2": {
    id: "1.2",
    title: "Representations of Motion",
    summary:
      "Motion graphs, tables, equations, and verbal descriptions all represent the same scenario; skill is translating fluently between them.",
    lesson:
      "Four equivalent representations of 1D motion:\n- **Position vs. time** \\((x\\text{-}t)\\) graph: slope is velocity; curvature indicates acceleration.\n- **Velocity vs. time** \\((v\\text{-}t)\\) graph: slope is acceleration; area under the curve is displacement.\n- **Acceleration vs. time** \\((a\\text{-}t)\\) graph: area under the curve is change in velocity.\n- **Equations / kinematic formulas** when acceleration is constant.\n\nMoving between them:\n- To find velocity from an \\(x\\text{-}t\\) graph, read the slope (rise over run). A horizontal line means \\(v = 0\\); a steep line means high speed; a line with negative slope means negative velocity.\n- To find displacement from a \\(v\\text{-}t\\) graph, compute signed area — areas below the axis subtract.\n- Curvature in \\(x\\text{-}t\\): concave up ⇒ \\(a > 0\\); concave down ⇒ \\(a < 0\\).\n\nAP FRQs typically hand you one representation (a graph) and ask you to extract another (velocity at \\(t=3\\), total displacement, direction of acceleration). Practice the translation dictionary cold.\n\n**Projectile motion** is a 2D kinematics problem: horizontal motion is uniform (\\(a_x = 0\\), \\(v_x\\) constant); vertical motion has \\(a_y = -g\\). The two axes are independent; solve separately, then combine.",
    keyIdeas: [
      "Slope on \\(x\\text{-}t\\) = velocity. Slope on \\(v\\text{-}t\\) = acceleration.",
      "Area under \\(v\\text{-}t\\) = displacement. Area under \\(a\\text{-}t\\) = \\(\\Delta v\\).",
      "Projectile: treat \\(x\\) and \\(y\\) independently; only \\(y\\) has acceleration \\(-g\\).",
      "Signed area matters — below the axis is negative.",
    ],
    workedExample: {
      prompt:
        "A projectile is launched at \\(30\\,\\text{m/s}\\) at \\(60^\\circ\\) above horizontal. Find its range (flat ground, \\(g=10\\)).",
      solution:
        "Components: \\(v_x = 30\\cos 60^\\circ = 15\\,\\text{m/s}\\); \\(v_y = 30\\sin 60^\\circ \\approx 26\\,\\text{m/s}\\). Time aloft: \\(t = 2 v_y / g \\approx 5.2\\,\\text{s}\\). Range: \\(R = v_x t \\approx 78\\,\\text{m}\\).",
    },
    commonMistakes: [
      "Reading \\(x\\text{-}t\\) graph values as velocities (they're positions).",
      "Forgetting to include signed area when \\(v\\) dips below zero.",
      "Applying horizontal kinematics with \\(g\\) to projectile motion.",
    ],
  },

  // =========================================================================
  // UNIT 2 — FORCE AND TRANSLATIONAL DYNAMICS
  // =========================================================================
  "2.1": {
    id: "2.1",
    title: "Systems and Center of Mass",
    summary:
      "A system is a collection of objects treated as one. Its center of mass moves as if all external forces act on a single point.",
    lesson:
      "Defining the **system** is a deliberate choice — it decides which forces are internal (don't affect system motion overall) and which are external (do). A good choice simplifies the problem. For a person pushing a cart, if the system is \"person + cart,\" the push force is internal and cancels; the external forces are gravity, normal, and friction.\n\nThe **center of mass** (COM) is the mass-weighted average position:\n\n$$x_{\\text{COM}} = \\frac{\\sum m_i x_i}{\\sum m_i}.$$\n\nNewton's second law applied to a system of particles says the COM accelerates as if all external forces act there:\n\n$$\\vec{F}_{\\text{ext,net}} = M\\,\\vec{a}_{\\text{COM}}.$$\n\nConsequence: if you throw a wrench, every part of the wrench may tumble chaotically, but its COM traces a parabola.\n\nInternal forces (forces between parts of the system) come in Newton's-third-law pairs and cancel in the sum — they can't change the COM's motion.",
    keyIdeas: [
      "System choice determines internal vs. external forces.",
      "\\(x_{\\text{COM}} = \\sum m_i x_i / \\sum m_i\\).",
      "COM obeys \\(\\vec{F}_{\\text{ext,net}} = M\\vec{a}_{\\text{COM}}\\).",
      "Internal forces cannot accelerate the COM.",
    ],
    workedExample: {
      prompt:
        "A 60 kg person stands on the left end of a 40 kg boat (10 m long) at rest on frictionless water. The person walks to the right end. How far does the boat move?",
      solution:
        "No external horizontal force ⇒ COM doesn't move. Let the boat shift left by \\(d\\). Person moves right by \\(10 - d\\) relative to water. COM unchanged: \\(60(10-d) = 40 d\\), giving \\(600 = 100 d\\), \\(d = 6\\,\\text{m}\\). The boat shifts 6 m in the direction opposite the person's walk.",
    },
    commonMistakes: [
      "Choosing a system that makes a problem harder by splitting internal forces.",
      "Forgetting that COM obeys only external forces.",
      "Mixing up the mass-weighted average with a geometric midpoint.",
    ],
  },
  "2.2": {
    id: "2.2",
    title: "Forces and Free-Body Diagrams",
    summary:
      "A free-body diagram (FBD) shows every force on one object as an arrow from a single point. It's the starting point of nearly every dynamics problem.",
    lesson:
      "A **free-body diagram** isolates one object and draws every force acting on it as an arrow, with magnitude, direction, and a label. Common forces:\n- **Weight** \\(\\vec{W} = m\\vec{g}\\) — always down.\n- **Normal** \\(\\vec{N}\\) — perpendicular to the contact surface, away from it.\n- **Friction** \\(\\vec{f}\\) — parallel to the surface, opposing relative motion (kinetic) or the tendency to slip (static).\n- **Tension** \\(\\vec{T}\\) — along a rope, pulling toward the rope's other end.\n- **Applied** \\(\\vec{F}_a\\) — whatever push/pull the problem specifies.\n- **Spring** \\(\\vec{F}_s\\) — toward the relaxed length.\n\nFBD rules (AP-grading strict):\n- Draw forces as arrows *from* the object (or its point-mass representation), not *to* it.\n- Label each arrow with a symbol (\\(m\\vec{g}\\), not \"gravity\").\n- Don't include velocity, acceleration, or net force — only real forces.\n- No fictional \"centrifugal,\" \"motion,\" or \"inertial\" forces.\n\nAfter the FBD, pick coordinate axes (often along and perpendicular to acceleration), decompose forces, and apply \\(\\sum F = ma\\) per axis.",
    keyIdeas: [
      "Only real contact and field forces appear on an FBD.",
      "Every arrow starts at the object and points in the force's direction.",
      "Label with force symbols, not vague words.",
      "Decompose and apply \\(\\sum F = ma\\) per axis after drawing.",
    ],
    commonMistakes: [
      "Including velocity or acceleration arrows on the FBD.",
      "Inventing a \"force of motion\" or centrifugal force.",
      "Omitting normal or weight forces on inclined-plane problems.",
    ],
  },
  "2.3": {
    id: "2.3",
    title: "Newton's Third Law",
    summary:
      "When object A pushes on B, B pushes on A with equal magnitude and opposite direction. The two forces act on different objects — they never cancel on the same FBD.",
    lesson:
      "Newton's third law: forces come in action-reaction pairs of equal magnitude and opposite direction, acting on different objects. If your hand pushes a wall east with 50 N, the wall pushes your hand west with 50 N.\n\nCrucial consequence: **third-law pairs never appear on the same FBD.** They act on different objects. They don't \"cancel,\" because the forces act on different things — one accelerates the hand, the other accelerates (or resists accelerating) the wall.\n\nTypical AP traps:\n- Weight (\\(m\\vec{g}\\) on the object from Earth) and normal force (\\(\\vec{N}\\) on the object from the ground) are **not** a third-law pair. They happen to be equal and opposite on flat ground, but the partner of \\(m\\vec{g}\\) is the gravitational pull of the object on Earth, and the partner of \\(\\vec{N}\\) is the object pushing back on the ground.\n- Tension in a rope between two carts: the rope pulls each cart toward the other. The forces are a third-law pair only in the massless-rope idealization.\n\n\"Equal and opposite\" applies even when the two objects have very different masses — the massive object just accelerates less.",
    keyIdeas: [
      "Third-law pairs: equal magnitude, opposite direction, different objects.",
      "They never appear together on one FBD.",
      "Normal and weight on flat ground are not a third-law pair.",
      "The pair forces are equal even when masses differ.",
    ],
    commonMistakes: [
      "Saying normal and weight are an action-reaction pair.",
      "Claiming a heavier object experiences a larger reaction force than a lighter one.",
      "Putting both halves of a pair on a single FBD.",
    ],
  },
  "2.4": {
    id: "2.4",
    title: "Newton's First Law",
    summary:
      "An object moves with constant velocity (including being at rest) unless a net external force acts on it. Equivalently, \\(\\sum \\vec{F} = 0 \\Leftrightarrow \\vec{a} = 0\\).",
    lesson:
      "Newton's first law is the statement of **inertia**: in the absence of a net external force, an object's velocity doesn't change. If it's at rest, it stays at rest; if moving, it continues at the same speed and direction forever.\n\nThe first law also defines **inertial reference frames**: frames in which the first law holds. An accelerating train car is not inertial; a ball on its floor appears to accelerate without any horizontal force — that's a sign you're in a non-inertial frame.\n\nOn the AP exam, invoke the first law whenever the problem says \"at rest,\" \"moving at constant velocity,\" or \"in equilibrium.\" In those situations, \\(\\sum F_x = 0\\) and \\(\\sum F_y = 0\\). Plug in and solve.",
    keyIdeas: [
      "Zero net force ⇔ zero acceleration (constant velocity).",
      "Equilibrium includes rest and constant-velocity motion.",
      "First law defines inertial frames.",
      "Use \\(\\sum F = 0\\) whenever motion is described as \"constant\" or \"equilibrium.\"",
    ],
    commonMistakes: [
      "Thinking \"at rest\" requires no forces — it requires no *net* force.",
      "Confusing first law (zero net force) with zero motion.",
      "Applying in non-inertial frames without accounting for pseudo-forces.",
    ],
  },
  "2.5": {
    id: "2.5",
    title: "Newton's Second Law",
    summary:
      "\\(\\vec{F}_{\\text{net}} = m\\vec{a}\\). The net force on an object equals its mass times its acceleration, in the direction of the net force.",
    lesson:
      "Newton's second law relates net force to acceleration: \\(\\vec{F}_{\\text{net}} = m\\vec{a}\\). Apply per axis: \\(\\sum F_x = m a_x\\); \\(\\sum F_y = m a_y\\).\n\nProblem-solving protocol (appears on nearly every AP dynamics FRQ):\n1. Choose the system and draw FBDs.\n2. Pick coordinate axes (often with one axis along the acceleration).\n3. Decompose each force into components along those axes.\n4. Write \\(\\sum F_x = m a_x\\) and \\(\\sum F_y = m a_y\\).\n5. Solve the resulting equations for unknowns.\n\nMass vs. weight: mass (kg) is an intrinsic property, weight (N) is the gravitational force \\(mg\\). They're different quantities with different units. An astronaut has the same mass on the Moon as on Earth but only about 1/6 the weight.\n\nAcceleration points along the net force, not along the velocity. A ball at the peak of a toss has \\(v = 0\\) but \\(a = -g\\) still.",
    keyIdeas: [
      "\\(\\vec{F}_{\\text{net}} = m\\vec{a}\\) applies per axis.",
      "Acceleration points along the net force.",
      "Mass is an intrinsic property; weight is a force.",
      "Always decompose into axes aligned with motion when possible.",
    ],
    workedExample: {
      prompt:
        "A 5 kg block on a frictionless surface is pulled by a 20 N horizontal force. Find its acceleration.",
      solution:
        "\\(F_{\\text{net}} = 20\\,\\text{N}\\) horizontal. \\(a = F/m = 20/5 = 4\\,\\text{m/s}^2\\).",
    },
    commonMistakes: [
      "Applying \\(F = ma\\) with weight instead of mass.",
      "Forgetting to resolve forces into components along the axes.",
      "Setting \\(F_{\\text{net}} = 0\\) when there is clearly acceleration.",
    ],
  },
  "2.6": {
    id: "2.6",
    title: "Gravitational Force",
    summary:
      "\\(\\vec{F}_g = GmM/r^2\\) between any two masses. Near Earth's surface, this simplifies to \\(F = mg\\) with \\(g = 9.8\\,\\text{m/s}^2\\).",
    lesson:
      "Newton's law of universal gravitation: between two point masses \\(m\\) and \\(M\\) separated by distance \\(r\\),\n\n$$F_g = \\frac{GmM}{r^2},$$\n\npointing along the line between them (attractive). \\(G = 6.67\\times 10^{-11}\\,\\text{N}\\,\\text{m}^2/\\text{kg}^2\\).\n\nNear Earth's surface (\\(r \\approx R_E\\)), the force per unit mass is nearly constant: \\(g = GM_E/R_E^2 \\approx 9.8\\,\\text{m/s}^2\\). So the gravitational force on a mass \\(m\\) is \\(F_g = mg\\) — the familiar weight.\n\nFor orbiting satellites, gravity supplies the centripetal force: \\(GmM/r^2 = mv^2/r\\), giving the orbital speed \\(v = \\sqrt{GM/r}\\).\n\nAPs' favorite twists:\n- Two small spheres attracted by their mutual gravity.\n- Weight at altitude: use \\(F = GMm/r^2\\) with \\(r = R_E + h\\), not \\(mg\\).\n- Apparent weightlessness in orbit: you're in free fall, not gravity-free.",
    keyIdeas: [
      "Universal law: \\(F_g = GmM/r^2\\).",
      "Near Earth: \\(F_g \\approx mg\\) with \\(g = 9.8\\,\\text{m/s}^2\\).",
      "Always attractive, along the line joining the masses.",
      "Orbital gravity supplies the centripetal force.",
    ],
    workedExample: {
      prompt:
        "What's the weight of a 100 kg astronaut at a height equal to Earth's radius above the surface?",
      solution:
        "At altitude \\(h = R_E\\), distance from center is \\(2R_E\\). Force is \\(F = GMm/(2R_E)^2 = (1/4) \\cdot (GMm/R_E^2) = mg/4 = 100 \\cdot 9.8 / 4 = 245\\,\\text{N}\\).",
    },
    commonMistakes: [
      "Using \\(F = mg\\) at large altitudes.",
      "Confusing weightlessness with absence of gravity (in orbit, gravity is everything).",
      "Forgetting the inverse-square dependence.",
    ],
  },
  "2.7": {
    id: "2.7",
    title: "Kinetic and Static Friction",
    summary:
      "Static friction adjusts to prevent slipping, up to a maximum \\(f_s \\le \\mu_s N\\). Kinetic friction is constant in magnitude: \\(f_k = \\mu_k N\\), opposite to motion.",
    lesson:
      "Friction is the contact force parallel to a surface. Two flavors:\n\n- **Static friction**: acts when surfaces don't slide. Magnitude \\(f_s \\le \\mu_s N\\), direction whatever prevents slipping. Adjusts up to the max; at the breaking point (impending motion), \\(f_s = \\mu_s N\\).\n- **Kinetic friction**: acts when surfaces are already sliding. Magnitude \\(f_k = \\mu_k N\\), direction opposite the relative motion. Approximately constant independent of speed.\n\nUsually \\(\\mu_s > \\mu_k\\) — it's harder to start sliding than to keep sliding. That's why a stopped car needs more push than a rolling one.\n\nKey subtlety: static friction is **not** a fixed value. If you push a book gently on a table, static friction matches your push exactly. Only at the breaking point does it hit the \\(\\mu_s N\\) max.\n\nOn inclined planes: the normal force is \\(N = mg\\cos\\theta\\), so friction depends on the incline angle. The component of gravity along the incline is \\(mg\\sin\\theta\\).",
    keyIdeas: [
      "Static friction adjusts to prevent slip; bounded by \\(\\mu_s N\\).",
      "Kinetic friction is \\(\\mu_k N\\), constant in magnitude.",
      "\\(\\mu_s > \\mu_k\\) almost always.",
      "On an incline, \\(N = mg\\cos\\theta\\); friction depends on \\(\\cos\\theta\\).",
    ],
    workedExample: {
      prompt:
        "A 10 kg block rests on a surface with \\(\\mu_s = 0.4\\), \\(\\mu_k = 0.3\\). A horizontal push of 30 N is applied. Does the block move? If so, find its acceleration.",
      solution:
        "Max static: \\(\\mu_s N = 0.4 \\cdot 10 \\cdot 10 = 40\\,\\text{N}\\). Applied 30 N < 40 N, so block doesn't move. Static friction balances the push at 30 N. \\(a = 0\\).",
    },
    commonMistakes: [
      "Using \\(\\mu_s N\\) as the actual static friction when it should only be the maximum.",
      "Omitting the normal dependence on incline angle.",
      "Treating kinetic friction as speed-dependent.",
    ],
  },
  "2.8": {
    id: "2.8",
    title: "Spring Forces",
    summary:
      "Hooke's law: \\(F_s = -kx\\). An ideal spring pulls back toward equilibrium with a force proportional to displacement.",
    lesson:
      "An ideal spring exerts a restoring force:\n\n$$\\vec{F}_s = -k\\vec{x},$$\n\nwhere \\(\\vec{x}\\) is the displacement from the spring's natural length and \\(k\\) is the spring constant (N/m). The minus sign means the force points opposite to the displacement — if the spring is stretched, the force pulls back; if compressed, it pushes out.\n\nThis linear relation is **Hooke's law** — the standard model for springs in Physics 1. It breaks down at extreme stretches (permanent deformation) but AP problems assume ideal.\n\nSprings combine:\n- **In series**: \\(1/k_{\\text{eq}} = 1/k_1 + 1/k_2\\) — softer than either.\n- **In parallel**: \\(k_{\\text{eq}} = k_1 + k_2\\) — stiffer than either.\n\nThe spring potential energy is \\(U_s = \\frac{1}{2}kx^2\\), covered in Unit 3.\n\nSprings are central to Unit 7 (oscillations): a mass on a spring obeys simple harmonic motion with angular frequency \\(\\omega = \\sqrt{k/m}\\).",
    keyIdeas: [
      "\\(F_s = -kx\\) — restoring, linear in displacement.",
      "\\(k\\) is the stiffness; units are N/m.",
      "Series springs combine like resistors: \\(1/k_{\\text{eq}} = \\sum 1/k_i\\).",
      "Parallel springs add: \\(k_{\\text{eq}} = \\sum k_i\\).",
    ],
    commonMistakes: [
      "Forgetting the minus sign — direction matters for SHM.",
      "Swapping series and parallel combination rules.",
      "Using natural length instead of displacement from equilibrium.",
    ],
  },
  "2.9": {
    id: "2.9",
    title: "Circular Motion",
    summary:
      "An object in circular motion has centripetal acceleration \\(a_c = v^2/r\\) directed toward the center. Real forces must supply this — centripetal force is not a new force.",
    lesson:
      "An object moving in a circle of radius \\(r\\) at speed \\(v\\) has **centripetal acceleration** \\(a_c = v^2/r\\), pointing toward the center. Newton's second law then requires a net inward force of magnitude \\(F_c = mv^2/r\\).\n\n\"Centripetal force\" is not a new type of force — it's the *net* inward force, supplied by whatever real forces (tension, gravity, normal, friction) happen to be acting. Always identify the source.\n\nStandard scenarios:\n- **Ball on a string** horizontal circle: tension pulls inward.\n- **Car on a flat curve**: static friction supplies the centripetal force. Max speed \\(v_{\\max} = \\sqrt{\\mu_s g r}\\).\n- **Car on a banked curve**: a component of the normal force points inward.\n- **Vertical loop** (ball on string): at the top, both tension and gravity point inward; at the bottom, tension fights gravity.\n- **Orbit**: gravity alone provides centripetal force.\n\nUniform circular motion: constant speed, changing velocity (direction changes). Tangential acceleration is zero; centripetal is non-zero.\n\nThere is **no centrifugal force** in inertial frames. What feels like an outward push is just inertia — your body wants to continue in a straight line while the car turns.",
    keyIdeas: [
      "\\(a_c = v^2/r\\), directed toward the center.",
      "Centripetal force is the *net* inward force; real forces supply it.",
      "On a flat curve, friction; on a banked curve, normal component.",
      "No centrifugal force in inertial frames — it's just inertia.",
    ],
    workedExample: {
      prompt:
        "A 1000 kg car rounds a flat curve of radius 50 m at 20 m/s. What minimum coefficient of static friction is required?",
      solution:
        "\\(F_c = mv^2/r = 1000 \\cdot 400 / 50 = 8000\\,\\text{N}\\). Max friction: \\(\\mu_s mg = \\mu_s \\cdot 10000\\). Set equal: \\(\\mu_s = 8000/10000 = 0.8\\).",
    },
    commonMistakes: [
      "Treating \"centripetal force\" as a separate physical force alongside gravity, tension, etc.",
      "Invoking centrifugal force in Newton's second law.",
      "Using \\(v^2/r\\) as the net force (it's the acceleration — multiply by \\(m\\)).",
    ],
  },

  // =========================================================================
  // UNIT 3 — WORK, ENERGY, AND POWER
  // =========================================================================
  "3.1": {
    id: "3.1",
    title: "Translational Kinetic Energy",
    summary:
      "Kinetic energy is energy of motion: \\(K = \\tfrac{1}{2}mv^2\\). Scalar, always nonnegative, depends on reference frame.",
    lesson:
      "The translational kinetic energy of a point mass is\n\n$$K = \\tfrac{1}{2}mv^2.$$\n\nUnits: joules (J). It's a scalar — no direction, just magnitude. Always nonnegative (\\(v^2 \\ge 0\\)).\n\nKinetic energy depends on reference frame because \\(v\\) does. A person sitting on a train has \\(K = 0\\) in the train frame but \\(K \\ne 0\\) in the ground frame.\n\nThe square dependence on speed is important: doubling speed **quadruples** kinetic energy. That's why car crashes at highway speeds are so much more dangerous than city-speed ones, and why braking distance grows with \\(v^2\\).\n\nFor a system of particles, total kinetic energy is the sum: \\(K_{\\text{total}} = \\sum \\tfrac{1}{2} m_i v_i^2\\). Different from \\(\\tfrac{1}{2}M v_{\\text{COM}}^2\\) in general — a rotating object has kinetic energy beyond its COM motion (Unit 6).",
    keyIdeas: [
      "\\(K = \\tfrac{1}{2}mv^2\\), scalar, nonnegative.",
      "Depends on reference frame.",
      "Quadratic in speed — doubling \\(v\\) quadruples \\(K\\).",
      "System \\(K\\) is the sum of individual \\(K\\)'s, not just the COM term.",
    ],
    commonMistakes: [
      "Treating kinetic energy as a vector.",
      "Forgetting the \\(\\tfrac{1}{2}\\).",
      "Assuming \\(K_{\\text{total}} = \\tfrac{1}{2}M v_{\\text{COM}}^2\\) (ignores internal/rotational motion).",
    ],
  },
  "3.2": {
    id: "3.2",
    title: "Work",
    summary:
      "Work is energy transferred by a force over a displacement: \\(W = \\vec{F}\\cdot\\vec{d} = Fd\\cos\\theta\\). Positive, negative, or zero depending on angle.",
    lesson:
      "Work done by a constant force on an object moving through displacement \\(\\vec{d}\\):\n\n$$W = \\vec{F}\\cdot\\vec{d} = Fd\\cos\\theta,$$\n\nwhere \\(\\theta\\) is the angle between \\(\\vec{F}\\) and \\(\\vec{d}\\). Positive if force has a component along motion (force does positive work), negative if opposite (force takes energy out), zero if perpendicular (no energy transfer).\n\nExamples:\n- Pushing a box across a floor: applied force does positive work; friction does negative work.\n- Lifting a book at constant speed: your hand does positive work; gravity does negative work; they cancel.\n- Centripetal force (perpendicular to velocity): zero work, even though a force acts.\n\nFor variable forces, work is the integral \\(W = \\int \\vec{F}\\cdot d\\vec{r}\\); graphically, it's the area under a force-vs-position graph.\n\n**Work-energy theorem**: the net work done on an object equals its change in kinetic energy:\n\n$$W_{\\text{net}} = \\Delta K = K_f - K_i.$$\n\nThis is the bridge between forces (dynamics) and energy (kinematics via energy conservation).",
    keyIdeas: [
      "\\(W = Fd\\cos\\theta\\); scalar, can be positive or negative.",
      "Force perpendicular to motion does no work.",
      "Area under force-position graph = work.",
      "Work-energy theorem: \\(W_{\\text{net}} = \\Delta K\\).",
    ],
    workedExample: {
      prompt:
        "A 10 N horizontal force pushes a 2 kg block 5 m across a frictionless floor. Find the work done and the resulting speed if the block started at rest.",
      solution:
        "\\(W = 10 \\cdot 5 \\cdot \\cos 0 = 50\\,\\text{J}\\). By work-energy theorem, \\(\\tfrac{1}{2}(2)v^2 = 50\\), so \\(v^2 = 50\\) and \\(v \\approx 7.07\\,\\text{m/s}\\).",
    },
    commonMistakes: [
      "Forgetting \\(\\cos\\theta\\) when force and motion aren't parallel.",
      "Counting centripetal force as doing work.",
      "Using just one force instead of the net force when applying the work-energy theorem.",
    ],
  },
  "3.3": {
    id: "3.3",
    title: "Potential Energy",
    summary:
      "Potential energy is stored energy due to position or configuration. Gravitational: \\(U_g = mgh\\). Spring: \\(U_s = \\tfrac{1}{2}kx^2\\).",
    lesson:
      "**Potential energy** \\(U\\) is energy stored in the configuration of a system relative to a chosen reference. Two types in Physics 1:\n\n- **Gravitational PE** (near Earth): \\(U_g = mgh\\), with \\(h\\) measured above a reference level.\n- **Spring (elastic) PE**: \\(U_s = \\tfrac{1}{2}k x^2\\), with \\(x\\) measured from the natural length.\n\nOnly differences \\(\\Delta U\\) matter physically; the absolute value depends on your choice of reference. Picking a smart reference (often the lowest point in the motion or the equilibrium position) simplifies bookkeeping.\n\nConservative forces (gravity, springs, universal gravitation) have an associated potential energy. Non-conservative forces (friction, drag, applied forces) do not — their work goes to heat or other forms.\n\nRelation: the conservative force equals \\(-dU/dx\\). Positive slope of \\(U\\) means force points \\(-x\\); negative slope means \\(+x\\). Potential energy minima are stable equilibria; maxima are unstable.",
    keyIdeas: [
      "Gravitational PE: \\(U_g = mgh\\); reference arbitrary.",
      "Spring PE: \\(U_s = \\tfrac{1}{2}kx^2\\); measured from natural length.",
      "Only \\(\\Delta U\\) matters.",
      "Conservative forces have potentials; friction doesn't.",
    ],
    commonMistakes: [
      "Using negative \\(h\\) when the object is below the reference but forgetting to do so consistently.",
      "Measuring spring PE from the fixed end instead of equilibrium.",
      "Assigning potential energy to non-conservative forces.",
    ],
  },
  "3.4": {
    id: "3.4",
    title: "Conservation of Energy",
    summary:
      "Mechanical energy \\(E = K + U\\) is conserved when only conservative forces do work. Otherwise, \\(\\Delta E = W_{\\text{nc}}\\).",
    lesson:
      "**Conservation of mechanical energy**: if only conservative forces (gravity, springs) do work, then\n\n$$K_i + U_i = K_f + U_f.$$\n\nThis is the most powerful tool in Physics 1. Write down the kinetic and potential energy at two states (usually start and end); set them equal; solve.\n\nChoose a reference level for gravitational PE — everything else is measured relative to it. Often the lowest point of motion is easiest.\n\nWhen non-conservative forces (friction, drag, external pushes) do work, mechanical energy changes:\n\n$$\\Delta E = W_{\\text{nc}}.$$\n\nFor friction, \\(W_{\\text{nc}} < 0\\) — mechanical energy decreases, and the loss becomes heat.\n\nEnergy conservation bypasses messy force analysis on systems that change speed through complicated paths. If you only need endpoints (speed at bottom of a loop, height of a projectile, compression of a spring), use energy.",
    keyIdeas: [
      "Mechanical energy: \\(E = K + U\\).",
      "Conserved when only conservative forces act.",
      "Non-conservative work changes mechanical energy: \\(\\Delta E = W_{\\text{nc}}\\).",
      "Energy conservation beats force analysis for start-to-end questions.",
    ],
    workedExample: {
      prompt:
        "A 2 kg ball slides from rest down a frictionless ramp, starting 3 m above the ground. Find its speed at the bottom.",
      solution:
        "Initial: \\(U = mgh = 2 \\cdot 10 \\cdot 3 = 60\\,\\text{J}\\), \\(K = 0\\). Final: \\(U = 0\\), \\(K = \\tfrac{1}{2}(2)v^2 = v^2\\). Conservation: \\(60 = v^2\\), so \\(v \\approx 7.75\\,\\text{m/s}\\).",
    },
    commonMistakes: [
      "Using mechanical energy conservation when friction is present.",
      "Forgetting to include spring PE alongside gravitational PE.",
      "Inconsistent reference level across initial and final states.",
    ],
  },
  "3.5": {
    id: "3.5",
    title: "Power",
    summary:
      "Power is the rate of energy transfer: \\(P = dW/dt\\). For constant force: \\(P = Fv\\cos\\theta\\). Units: watts (W).",
    lesson:
      "**Power** is how fast energy is transferred or work is done:\n\n$$P = \\frac{dW}{dt}.$$\n\nFor a constant force at angle \\(\\theta\\) to velocity, \\(P = Fv\\cos\\theta\\) — instantaneous power is force dotted with velocity.\n\nAverage power is total work over total time: \\(\\bar{P} = W/\\Delta t\\).\n\nUnits: watts (\\(1\\,\\text{W} = 1\\,\\text{J/s}\\)). Horsepower is an obsolete unit (1 hp ≈ 746 W) but shows up in engineering.\n\nExamples:\n- A 50 W light bulb converts electrical energy to heat + light at 50 J/s.\n- A car engine's maximum power limits its top speed: drag force grows with speed, and \\(P = Fv\\).\n- Running up a flight of stairs: \\(P = mgh/t\\). A 60 kg person climbing 3 m in 2 s produces \\(60 \\cdot 10 \\cdot 3 / 2 = 900\\,\\text{W}\\) — briefly.",
    keyIdeas: [
      "\\(P = dW/dt\\).",
      "Instantaneous: \\(P = \\vec{F}\\cdot\\vec{v}\\).",
      "Average: \\(\\bar{P} = W/\\Delta t\\).",
      "Units: watts = J/s.",
    ],
    workedExample: {
      prompt:
        "A car travels at constant 20 m/s. The engine applies 500 N of forward force. What's the engine's power output?",
      solution:
        "At constant velocity, engine balances drag. Power: \\(P = Fv = 500 \\cdot 20 = 10{,}000\\,\\text{W} = 10\\,\\text{kW}\\).",
    },
    commonMistakes: [
      "Confusing power with energy (power is a rate).",
      "Using \\(W/t\\) when force varies over time.",
      "Forgetting that \\(P = Fv\\cos\\theta\\), not just \\(Fv\\).",
    ],
  },

  // =========================================================================
  // UNIT 4 — LINEAR MOMENTUM
  // =========================================================================
  "4.1": {
    id: "4.1",
    title: "Linear Momentum",
    summary:
      "Momentum is \\(\\vec{p} = m\\vec{v}\\). A vector, proportional to mass and velocity.",
    lesson:
      "Linear momentum: \\(\\vec{p} = m\\vec{v}\\). Units kg·m/s. It's a vector — direction matters. Total system momentum adds vectorially: \\(\\vec{P} = \\sum m_i \\vec{v}_i\\).\n\nWhy momentum is useful beyond velocity alone: Newton's second law can be written as \\(\\vec{F}_{\\text{net}} = d\\vec{p}/dt\\), which holds even when mass changes (rockets, falling snow on a cart). For fixed mass it reduces to \\(\\vec{F} = m\\vec{a}\\).\n\nMomentum is conserved when the net external force is zero — the foundation for collision analysis (4.3, 4.4).\n\nKinetic energy and momentum are related by \\(K = p^2/(2m)\\), useful for swapping between them without needing \\(v\\) explicitly.",
    keyIdeas: [
      "\\(\\vec{p} = m\\vec{v}\\) — vector, direction matters.",
      "\\(\\vec{F}_{\\text{net}} = d\\vec{p}/dt\\) is Newton's law in momentum form.",
      "Total system momentum adds vectorially.",
      "\\(K = p^2/(2m)\\).",
    ],
    commonMistakes: [
      "Treating momentum as a scalar.",
      "Forgetting that negative velocity gives negative momentum.",
      "Using \\(K = p^2/(2m)\\) component-wise incorrectly (it needs the magnitude).",
    ],
  },
  "4.2": {
    id: "4.2",
    title: "Change in Momentum and Impulse",
    summary:
      "Impulse is the change in momentum: \\(\\vec{J} = \\Delta\\vec{p} = \\int \\vec{F}\\,dt\\). Equal to average force times time for constant force.",
    lesson:
      "**Impulse** is the change in momentum of an object:\n\n$$\\vec{J} = \\Delta\\vec{p} = \\int \\vec{F}\\,dt.$$\n\nFor a constant force over time \\(\\Delta t\\), \\(\\vec{J} = \\vec{F}\\,\\Delta t\\). Graphically, impulse is the area under a force-vs-time curve.\n\nUnits are N·s = kg·m/s (same as momentum, by design).\n\nImpulse perspective explains collision details force analysis hides. A ball bouncing off a wall has a large \\(\\Delta p\\) over a short time, so the force during contact is huge. Air bags and crumple zones extend \\(\\Delta t\\) to reduce peak force for a given \\(\\Delta p\\).\n\nFor a two-object collision, Newton's third law guarantees the forces are equal and opposite during contact, so the impulses on the two are equal and opposite: \\(\\vec{J}_{12} = -\\vec{J}_{21}\\). This is why total momentum is conserved.",
    keyIdeas: [
      "\\(\\vec{J} = \\Delta\\vec{p}\\) — impulse equals momentum change.",
      "For constant force: \\(\\vec{J} = \\vec{F}\\Delta t\\).",
      "Area under F-t graph = impulse.",
      "Airbags reduce force by extending collision time.",
    ],
    workedExample: {
      prompt:
        "A 0.2 kg ball moving at 10 m/s strikes a wall and rebounds at 8 m/s. If contact lasts 0.01 s, find the average force.",
      solution:
        "Choose \\(+\\) away from wall. \\(\\Delta p = 0.2(8) - 0.2(-10) = 3.6\\,\\text{kg·m/s}\\). \\(F = \\Delta p / \\Delta t = 3.6/0.01 = 360\\,\\text{N}\\).",
    },
    commonMistakes: [
      "Treating impulse and force interchangeably.",
      "Missing the sign flip on a rebounded velocity.",
      "Using \\(F = ma\\) when impulse is the cleaner approach.",
    ],
  },
  "4.3": {
    id: "4.3",
    title: "Conservation of Linear Momentum",
    summary:
      "If net external force on a system is zero, total momentum is conserved: \\(\\vec{P}_i = \\vec{P}_f\\).",
    lesson:
      "Total momentum of an isolated system (no net external force) is conserved. Internal forces (between parts of the system) come in third-law pairs and cancel.\n\nApplication: collisions. During a collision, the collision forces are internal if you take the two bodies as your system — so momentum is conserved even if external forces like friction and gravity are present, provided the collision is quick (external impulses are negligible compared to collision impulses).\n\nComponent-wise: \\(P_x\\) and \\(P_y\\) are separately conserved.\n\nTypical AP scenarios:\n- Two carts collide on a low-friction track → momentum conservation gives the post-collision velocities.\n- A gun recoils when firing a bullet → initial momentum 0, so bullet \\(+\\) gun momentum must sum to 0 afterward.\n- Explosion of a projectile mid-flight → pieces' total momentum equals the whole's before explosion.",
    keyIdeas: [
      "Conservation: \\(\\vec{P}_i = \\vec{P}_f\\) when net external force is zero.",
      "Internal forces cancel by Newton's third law.",
      "Apply component-wise for 2D problems.",
      "For short collisions, external forces can be neglected.",
    ],
    workedExample: {
      prompt:
        "A 60 kg skater (initially at rest) pushes a 40 kg friend, who moves away at 3 m/s. Find the skater's recoil speed.",
      solution:
        "Initial momentum = 0. Final: \\(60 v + 40(3) = 0\\), so \\(v = -2\\,\\text{m/s}\\). Skater moves 2 m/s in the opposite direction.",
    },
    commonMistakes: [
      "Forgetting momentum is a vector — signs matter.",
      "Applying conservation when a significant external force acts during the interaction.",
      "Confusing momentum conservation with kinetic energy conservation.",
    ],
  },
  "4.4": {
    id: "4.4",
    title: "Elastic and Inelastic Collisions",
    summary:
      "Elastic: both momentum and kinetic energy conserved. Inelastic: momentum conserved, kinetic energy is not. Perfectly inelastic: objects stick.",
    lesson:
      "All collisions conserve momentum (if external forces are negligible). The distinction is kinetic energy:\n\n- **Elastic**: \\(K_i = K_f\\). Common in atomic/subatomic interactions; rare in macroscopic life. Billiard balls are approximately elastic.\n- **Inelastic**: \\(K_f < K_i\\); some energy goes to deformation, heat, sound.\n- **Perfectly inelastic**: objects stick together afterward. \\(K_f\\) is the minimum consistent with momentum conservation.\n\nFor 1D elastic collisions with object 2 initially at rest:\n\n$$v_1' = \\frac{m_1 - m_2}{m_1 + m_2}v_1,\\quad v_2' = \\frac{2m_1}{m_1 + m_2}v_1.$$\n\nEqual-mass elastic: \\(v_1' = 0\\), \\(v_2' = v_1\\) — the projectile stops, the target takes all the velocity. This is why billiards works.\n\nFor perfectly inelastic, the combined mass moves with \\(v_f = (m_1 v_1 + m_2 v_2)/(m_1 + m_2)\\).",
    keyIdeas: [
      "All collisions conserve momentum (isolated system).",
      "Elastic conserves K too; inelastic doesn't.",
      "Perfectly inelastic: objects stick; max K loss.",
      "Equal-mass elastic: projectile stops, target takes the velocity.",
    ],
    workedExample: {
      prompt:
        "A 2 kg block moving at 5 m/s collides and sticks to a 3 kg block at rest. Find the final speed and the energy lost.",
      solution:
        "Momentum: \\(2(5) = 5 v_f\\), so \\(v_f = 2\\,\\text{m/s}\\). \\(K_i = \\tfrac{1}{2}(2)(25) = 25\\,\\text{J}\\). \\(K_f = \\tfrac{1}{2}(5)(4) = 10\\,\\text{J}\\). Energy lost: 15 J.",
    },
    commonMistakes: [
      "Applying K conservation to an inelastic collision.",
      "Forgetting that \"perfectly inelastic\" means they stick.",
      "Mixing up initial and final expressions.",
    ],
  },

  // =========================================================================
  // UNIT 5 — TORQUE AND ROTATIONAL DYNAMICS
  // =========================================================================
  "5.1": {
    id: "5.1",
    title: "Rotational Kinematics",
    summary:
      "Angular position \\(\\theta\\), angular velocity \\(\\omega = d\\theta/dt\\), angular acceleration \\(\\alpha = d\\omega/dt\\). Same kinematic equations as linear, with angular variables.",
    lesson:
      "For rotation about a fixed axis, use angular variables:\n- **Angular position** \\(\\theta\\) (radians).\n- **Angular velocity** \\(\\omega = d\\theta/dt\\) (rad/s).\n- **Angular acceleration** \\(\\alpha = d\\omega/dt\\) (rad/s²).\n\nFor constant angular acceleration, the rotational kinematic equations are the angular analogs of the linear ones:\n- \\(\\omega = \\omega_0 + \\alpha t\\)\n- \\(\\theta = \\theta_0 + \\omega_0 t + \\tfrac{1}{2}\\alpha t^2\\)\n- \\(\\omega^2 = \\omega_0^2 + 2\\alpha\\,\\Delta\\theta\\)\n\nUnits: always radians, not degrees, for physics calculations. One revolution = \\(2\\pi\\) rad.\n\nRotational quantities are vectors using the right-hand rule (curl fingers in the direction of rotation; thumb points along \\(\\vec{\\omega}\\)). For Physics 1 purposes, you usually only need the signed scalar magnitude — positive or negative rotation around the axis.",
    keyIdeas: [
      "Angular analog of linear kinematics: just replace \\(x,v,a\\) with \\(\\theta,\\omega,\\alpha\\).",
      "Always use radians.",
      "\\(2\\pi\\) rad = one revolution.",
      "Sign indicates direction of rotation.",
    ],
    workedExample: {
      prompt:
        "A wheel starts from rest and spins up to 10 rad/s in 2 seconds with constant angular acceleration. Find \\(\\alpha\\) and total angle traveled.",
      solution:
        "\\(\\alpha = (\\omega - \\omega_0)/t = 10/2 = 5\\,\\text{rad/s}^2\\). \\(\\theta = \\tfrac{1}{2}(5)(4) = 10\\,\\text{rad}\\).",
    },
    commonMistakes: [
      "Using degrees in kinematic equations.",
      "Forgetting that constant \\(\\alpha\\) is required for the formulas.",
      "Mixing angular and linear quantities without converting.",
    ],
  },
  "5.2": {
    id: "5.2",
    title: "Connecting Linear and Rotational Motion",
    summary:
      "For a point at radius \\(r\\) on a rotating body: \\(v = r\\omega\\), \\(a_t = r\\alpha\\), \\(a_c = r\\omega^2\\).",
    lesson:
      "A point at radius \\(r\\) from the rotation axis has:\n- Linear (tangential) speed: \\(v = r\\omega\\).\n- Tangential acceleration: \\(a_t = r\\alpha\\).\n- Centripetal acceleration: \\(a_c = v^2/r = r\\omega^2\\).\n\nTotal linear acceleration is the vector sum of \\(a_t\\) (tangential, along motion) and \\(a_c\\) (radial, toward the center).\n\nFor a **rolling without slipping** body of radius \\(R\\), the COM has linear velocity \\(v_{\\text{COM}} = R\\omega\\) and acceleration \\(a_{\\text{COM}} = R\\alpha\\). The contact point instantaneously has zero velocity (relative to the ground). The top of the wheel moves at \\(2v_{\\text{COM}}\\).\n\nThis connection bridges rotational and translational descriptions — it's how you relate the angular kinematics of a wheel to the linear motion of a car.",
    keyIdeas: [
      "\\(v = r\\omega\\), \\(a_t = r\\alpha\\), \\(a_c = r\\omega^2\\).",
      "Centripetal and tangential accelerations combine vectorially.",
      "Rolling without slipping: \\(v_{\\text{COM}} = R\\omega\\).",
      "Contact point of a rolling wheel is momentarily at rest.",
    ],
    workedExample: {
      prompt:
        "A 0.3 m radius wheel rolls without slipping at 6 m/s. Find \\(\\omega\\) and the speed of the topmost point.",
      solution:
        "\\(\\omega = v/r = 6/0.3 = 20\\,\\text{rad/s}\\). Top moves at \\(2v = 12\\,\\text{m/s}\\).",
    },
    commonMistakes: [
      "Using \\(v = r\\omega\\) with \\(\\omega\\) in degrees/s or rev/s.",
      "Forgetting centripetal when only tangential was asked about.",
      "Applying rolling formula when slipping occurs.",
    ],
  },
  "5.3": {
    id: "5.3",
    title: "Torque",
    summary:
      "Torque \\(\\tau = rF\\sin\\theta\\) — the rotational analog of force. Magnitude is force times lever arm; direction from right-hand rule.",
    lesson:
      "**Torque** about an axis:\n\n$$\\tau = rF\\sin\\theta,$$\n\nwhere \\(r\\) is the distance from the axis to the point of force application, \\(F\\) is the force magnitude, and \\(\\theta\\) is the angle between \\(\\vec{r}\\) and \\(\\vec{F}\\). Equivalently, \\(\\tau = r_\\perp F\\) (perpendicular distance times force) or \\(\\tau = r F_\\perp\\) (distance times perpendicular force component).\n\nThe **lever arm** is the perpendicular distance from the axis to the line of force. Maximizing lever arm maximizes torque — which is why you pull on a door near the handle (far from the hinge) rather than near the hinge.\n\nSign convention (AP): counterclockwise positive, clockwise negative. Always pick a pivot and stick with it.\n\nTorque is not a force — it's the rotational equivalent. A force produces a torque about any given axis equal to \\(\\tau = rF\\sin\\theta\\). The same force can produce different torques about different axes.",
    keyIdeas: [
      "\\(\\tau = rF\\sin\\theta = r_\\perp F\\).",
      "Lever arm is the perpendicular distance from axis to line of force.",
      "Sign: CCW positive, CW negative.",
      "Torque depends on the chosen axis.",
    ],
    workedExample: {
      prompt:
        "A 5 N force is applied at 60° from the rod to a point 0.4 m from the pivot. Find the torque.",
      solution:
        "\\(\\tau = rF\\sin\\theta = 0.4 \\cdot 5 \\cdot \\sin 60^\\circ \\approx 1.73\\,\\text{N·m}\\).",
    },
    commonMistakes: [
      "Using total distance when only perpendicular distance applies.",
      "Forgetting \\(\\sin\\theta\\) when force and rod aren't perpendicular.",
      "Inconsistent sign convention across sub-parts of a problem.",
    ],
  },
  "5.4": {
    id: "5.4",
    title: "Rotational Inertia",
    summary:
      "Rotational inertia (moment of inertia) \\(I = \\sum m_i r_i^2\\) measures an object's resistance to angular acceleration about an axis.",
    lesson:
      "**Rotational inertia** (moment of inertia) about an axis:\n\n$$I = \\sum m_i r_i^2,$$\n\nfor discrete particles, or \\(I = \\int r^2\\,dm\\) for continuous bodies. It's the rotational analog of mass.\n\nCommon shapes (about axis through COM):\n- Point mass at radius \\(R\\): \\(I = MR^2\\).\n- Thin hoop, axis through center: \\(I = MR^2\\).\n- Solid disk/cylinder, axis through center: \\(I = \\tfrac{1}{2}MR^2\\).\n- Thin rod, axis through center, perpendicular to length: \\(I = \\tfrac{1}{12}ML^2\\).\n- Thin rod, axis at end: \\(I = \\tfrac{1}{3}ML^2\\).\n- Solid sphere: \\(I = \\tfrac{2}{5}MR^2\\).\n- Thin spherical shell: \\(I = \\tfrac{2}{3}MR^2\\).\n\nThe distribution of mass matters: a hoop has all mass at \\(R\\), so it resists rotation more than a disk of the same mass and radius. Mass farther from the axis means larger \\(I\\).",
    keyIdeas: [
      "\\(I = \\sum m_i r_i^2\\); depends on axis.",
      "Rotational analog of mass.",
      "Hoop \\(I = MR^2\\); disk \\(I = \\tfrac{1}{2}MR^2\\); solid sphere \\(I = \\tfrac{2}{5}MR^2\\).",
      "Mass far from axis contributes more than mass close.",
    ],
    commonMistakes: [
      "Using a COM formula when the axis isn't through the COM.",
      "Confusing disk and hoop formulas.",
      "Summing \\(mr\\) instead of \\(mr^2\\).",
    ],
  },
  "5.5": {
    id: "5.5",
    title: "Rotational Equilibrium",
    summary:
      "A rigid body in rotational equilibrium has \\(\\sum \\tau = 0\\) — the sum of torques about any axis is zero.",
    lesson:
      "A rigid body is in **rotational equilibrium** when its angular acceleration is zero: \\(\\sum \\tau = 0\\) about any axis. Combined with translational equilibrium \\((\\sum F = 0)\\), this gives **static equilibrium**, used in statics problems (beams, ladders, see-saws).\n\nProblem-solving recipe:\n1. Draw an extended FBD showing forces at their points of application.\n2. Choose a convenient axis — often one that eliminates an unknown force.\n3. Write \\(\\sum F_x = 0\\), \\(\\sum F_y = 0\\), \\(\\sum \\tau = 0\\).\n4. Solve.\n\nWhy axis choice matters: the torque of a force about the axis is zero if the force passes through the axis. Putting the axis at an unknown pivot force eliminates that unknown from the torque equation.",
    keyIdeas: [
      "\\(\\sum \\tau = 0\\) for rotational equilibrium.",
      "Combine with \\(\\sum F = 0\\) for full static equilibrium.",
      "Pick the axis cleverly to eliminate unknowns.",
      "Forces through the axis contribute zero torque about that axis.",
    ],
    workedExample: {
      prompt:
        "A 3 m uniform beam weighing 40 N is supported at its left end and by a rope at its right end. Find the rope tension.",
      solution:
        "Pick the left end as pivot. Weight acts at the center (1.5 m from pivot). \\(\\sum \\tau = T(3) - 40(1.5) = 0\\), giving \\(T = 20\\,\\text{N}\\).",
    },
    commonMistakes: [
      "Computing torques about different axes for different forces.",
      "Forgetting that force through the pivot contributes zero torque.",
      "Mixing signs of torques (CCW vs. CW).",
    ],
  },
  "5.6": {
    id: "5.6",
    title: "Newton's Second Law in Rotational Form",
    summary:
      "\\(\\sum \\tau = I\\alpha\\). Torque causes angular acceleration proportional to 1/I.",
    lesson:
      "Newton's second law for rotation:\n\n$$\\sum \\tau = I\\alpha.$$\n\nDirect analog of \\(F = ma\\): torque is the analog of force, rotational inertia of mass, angular acceleration of linear acceleration.\n\nApplication: a disc rolling down a ramp has both translational and rotational \\(F = ma\\) equations. Friction provides the torque that spins the disc; gravity provides the translational force. Coupling them (via the rolling-without-slipping constraint \\(a = R\\alpha\\)) lets you solve for the acceleration.\n\nFor a purely rotating body, this equation alone determines \\(\\alpha\\). For a rolling body, it couples with \\(\\sum F = ma\\) on the COM.",
    keyIdeas: [
      "\\(\\sum \\tau = I\\alpha\\).",
      "Rotational analog of \\(F = ma\\).",
      "Couple with \\(\\sum F = ma\\) using rolling constraint \\(a = R\\alpha\\).",
      "Torque causes angular acceleration; rotational inertia resists it.",
    ],
    workedExample: {
      prompt:
        "A 2 kg, 0.5 m radius solid disk has a tangential force of 6 N applied at its edge. Find its angular acceleration.",
      solution:
        "\\(I = \\tfrac{1}{2}MR^2 = 0.5 \\cdot 2 \\cdot 0.25 = 0.25\\,\\text{kg·m}^2\\). \\(\\tau = rF = 0.5 \\cdot 6 = 3\\,\\text{N·m}\\). \\(\\alpha = \\tau/I = 12\\,\\text{rad/s}^2\\).",
    },
    commonMistakes: [
      "Using linear \\(F = ma\\) for rotation.",
      "Forgetting the rolling-without-slipping constraint on coupled problems.",
      "Mixing up torque and force.",
    ],
  },

  // =========================================================================
  // UNIT 6 — ENERGY AND MOMENTUM OF ROTATING SYSTEMS
  // =========================================================================
  "6.1": {
    id: "6.1",
    title: "Rotational Kinetic Energy",
    summary:
      "\\(K_{\\text{rot}} = \\tfrac{1}{2}I\\omega^2\\). Analog of translational kinetic energy. A rolling body has both: \\(K = \\tfrac{1}{2}Mv^2 + \\tfrac{1}{2}I\\omega^2\\).",
    lesson:
      "Rotational kinetic energy:\n\n$$K_{\\text{rot}} = \\tfrac{1}{2}I\\omega^2.$$\n\nDirect analog of \\(K = \\tfrac{1}{2}mv^2\\). Scalar, nonnegative, depends on \\(I\\) and \\(\\omega\\).\n\nFor a body rolling without slipping, total kinetic energy is the sum of translational (COM) and rotational (about COM):\n\n$$K = \\tfrac{1}{2}Mv_{\\text{COM}}^2 + \\tfrac{1}{2}I\\omega^2.$$\n\nSince \\(v = R\\omega\\), you can rewrite as \\(K = \\tfrac{1}{2}(M + I/R^2)v^2\\). For a disk (\\(I = \\tfrac{1}{2}MR^2\\)): \\(K = \\tfrac{3}{4}Mv^2\\). For a hoop (\\(I = MR^2\\)): \\(K = Mv^2\\).\n\nConsequence: when rolling down a ramp, the fraction of gravitational PE going to translational KE is smaller than for a sliding block — the rest goes to rotation. A hoop rolls more slowly than a disk of the same mass and radius.",
    keyIdeas: [
      "\\(K_{\\text{rot}} = \\tfrac{1}{2}I\\omega^2\\).",
      "Rolling body: sum of translational and rotational KE.",
      "Rolling with slipping breaks the simple constraint.",
      "Heavier-at-the-edge objects roll slower (same mass, same radius).",
    ],
    workedExample: {
      prompt:
        "A 2 kg solid sphere rolls without slipping at 3 m/s. Find its total kinetic energy. (\\(I = \\tfrac{2}{5}MR^2\\))",
      solution:
        "\\(K = \\tfrac{1}{2}(2)(9) + \\tfrac{1}{2}(\\tfrac{2}{5})(2)R^2(v/R)^2 = 9 + \\tfrac{2}{5}(2)(9/2) = 9 + 3.6 = 12.6\\,\\text{J}\\). Or use \\(K = \\tfrac{7}{10}Mv^2 = \\tfrac{7}{10}(2)(9) = 12.6\\,\\text{J}\\).",
    },
    commonMistakes: [
      "Forgetting rotational KE when a body rolls.",
      "Using the wrong \\(I\\) formula.",
      "Double-counting energy by including COM rotation separately from total angular kinetic energy.",
    ],
  },
  "6.2": {
    id: "6.2",
    title: "Torque and Work",
    summary:
      "Work done by a torque: \\(W = \\tau\\,\\Delta\\theta\\) for constant torque. Power: \\(P = \\tau\\omega\\).",
    lesson:
      "Work done by a torque through angular displacement \\(\\Delta\\theta\\):\n\n$$W_{\\text{rot}} = \\tau\\,\\Delta\\theta\\quad\\text{(constant torque)}.$$\n\nFor variable torque, \\(W = \\int \\tau\\,d\\theta\\) — the area under a torque-vs-angle graph.\n\nRotational power: \\(P = \\tau\\omega\\), analogous to \\(P = Fv\\).\n\nThe **rotational work-energy theorem**: the net rotational work equals the change in rotational kinetic energy:\n\n$$W_{\\text{net,rot}} = \\Delta K_{\\text{rot}} = \\tfrac{1}{2}I\\omega_f^2 - \\tfrac{1}{2}I\\omega_i^2.$$\n\nApplies in the same way as the linear work-energy theorem, just with rotational variables.",
    keyIdeas: [
      "\\(W = \\tau\\,\\Delta\\theta\\); area under \\(\\tau\\text{-}\\theta\\) graph.",
      "\\(P = \\tau\\omega\\).",
      "Rotational work-energy theorem: \\(W = \\Delta K_{\\text{rot}}\\).",
      "Same dimensional structure as linear work, energy, power.",
    ],
    commonMistakes: [
      "Using degrees in \\(W = \\tau\\theta\\) — always radians.",
      "Forgetting to use \\(\\Delta\\theta\\), not \\(\\theta\\).",
      "Applying only part of the system's rotational energy.",
    ],
  },
  "6.3": {
    id: "6.3",
    title: "Angular Momentum and Angular Impulse",
    summary:
      "Angular momentum \\(L = I\\omega\\) for rotating rigid bodies; \\(L = mvr\\sin\\theta\\) for point masses. Angular impulse is \\(\\int \\tau\\,dt\\).",
    lesson:
      "**Angular momentum** is the rotational analog of linear momentum.\n\n- Rigid body rotating about an axis: \\(L = I\\omega\\).\n- Point particle with position \\(\\vec{r}\\) from axis and linear momentum \\(\\vec{p}\\): \\(L = rp\\sin\\theta\\) (magnitude), with direction from the right-hand rule.\n\nUnits: kg·m²/s.\n\n**Angular impulse** \\(=\\int \\tau\\,dt = \\Delta L\\). Analog of impulse = \\(\\Delta p\\).\n\nNewton's second law in angular form: \\(\\vec{\\tau}_{\\text{net}} = d\\vec{L}/dt\\). If net torque is zero, \\(L\\) is conserved (6.4).",
    keyIdeas: [
      "\\(L = I\\omega\\) (rigid body) or \\(L = rp\\sin\\theta\\) (point particle).",
      "Units: kg·m²/s.",
      "\\(\\tau = dL/dt\\).",
      "Zero net torque ⇒ \\(L\\) conserved.",
    ],
    commonMistakes: [
      "Using \\(L = mvr\\) without the \\(\\sin\\theta\\) factor.",
      "Missing the axis — angular momentum is defined relative to an axis.",
      "Mixing point-particle and rigid-body formulas.",
    ],
  },
  "6.4": {
    id: "6.4",
    title: "Conservation of Angular Momentum",
    summary:
      "If net external torque on a system is zero, total angular momentum is conserved. \\(I_i \\omega_i = I_f \\omega_f\\).",
    lesson:
      "Angular momentum is conserved when the net external torque is zero:\n\n$$L_i = L_f \\quad\\text{(when }\\sum \\tau_{\\text{ext}} = 0\\text{)}.$$\n\nFor a single rotating body whose \\(I\\) changes (e.g., a spinning ice skater pulling in her arms): \\(I_i \\omega_i = I_f \\omega_f\\). Decreasing \\(I\\) increases \\(\\omega\\) — the skater speeds up.\n\nThis is a powerful tool for problems where the moment of inertia changes mid-motion, like:\n- Ice skater pulling arms in.\n- A satellite in elliptical orbit (angular momentum about the central body is conserved).\n- A merry-go-round with people walking toward the center.\n\nKey: identify the axis, check that net external torque about that axis is zero, then equate \\(L_i = L_f\\).",
    keyIdeas: [
      "Zero net external torque ⇒ \\(L\\) conserved.",
      "\\(I_i \\omega_i = I_f \\omega_f\\).",
      "Pulling mass inward decreases \\(I\\), speeds up rotation.",
      "Always relative to a specific axis.",
    ],
    workedExample: {
      prompt:
        "A skater spins at 2 rev/s with arms out, \\(I_i = 5\\,\\text{kg·m}^2\\). She pulls them in to \\(I_f = 2\\,\\text{kg·m}^2\\). Find her new angular speed.",
      solution:
        "\\(I_i \\omega_i = I_f \\omega_f\\): \\(5 \\cdot 2 = 2\\cdot \\omega_f \\Rightarrow \\omega_f = 5\\,\\text{rev/s}\\).",
    },
    commonMistakes: [
      "Applying conservation when an external torque acts.",
      "Confusing angular momentum conservation with kinetic energy conservation (KE *increases* when the skater pulls in — she does internal work).",
      "Forgetting to identify the axis.",
    ],
  },
  "6.5": {
    id: "6.5",
    title: "Rolling",
    summary:
      "Rolling without slipping: \\(v = R\\omega\\), \\(a = R\\alpha\\). Contact point instantaneously at rest; friction is static and can be in either direction.",
    lesson:
      "**Rolling without slipping** satisfies the kinematic constraint \\(v_{\\text{COM}} = R\\omega\\), \\(a_{\\text{COM}} = R\\alpha\\). The contact point is momentarily at rest relative to the ground — so the friction there is **static** (not kinetic), even though the wheel is moving.\n\nStatic friction can point in any direction consistent with the no-slip constraint. For a ball rolling down a ramp, friction points **up the ramp** (forward relative to motion direction). For a ball speeding up due to an applied forward torque on a flat surface, friction points **backward**. Decide from Newton's laws with the constraint.\n\nBecause static friction does no work on a rolling body (contact point doesn't move), mechanical energy is conserved even in the presence of friction — a key trick for energy conservation problems involving rolling.\n\nKey ratio: for a body with \\(I = \\beta MR^2\\) rolling down a ramp, acceleration is \\(a = g\\sin\\theta / (1 + \\beta)\\). Hoop (\\(\\beta = 1\\)) is slower than disk (\\(\\beta = 1/2\\)) is slower than sphere (\\(\\beta = 2/5\\)).",
    keyIdeas: [
      "Rolling no-slip: \\(v = R\\omega\\), \\(a = R\\alpha\\).",
      "Contact point momentarily at rest — friction is static.",
      "Static friction on a rolling body does no work.",
      "Ramp acceleration: \\(a = g\\sin\\theta/(1 + I/(MR^2))\\).",
    ],
    commonMistakes: [
      "Treating rolling friction as kinetic.",
      "Assuming the friction direction without checking the constraint.",
      "Losing mechanical energy to friction on a rolling body (it doesn't dissipate on no-slip).",
    ],
  },
  "6.6": {
    id: "6.6",
    title: "Motion of Orbiting Satellites",
    summary:
      "In circular orbit, gravity supplies the centripetal force: \\(GMm/r^2 = mv^2/r\\). \\(v = \\sqrt{GM/r}\\), \\(T = 2\\pi r/v\\).",
    lesson:
      "For a satellite in a **circular orbit** of radius \\(r\\) around a body of mass \\(M\\), gravity supplies the centripetal force:\n\n$$\\frac{GMm}{r^2} = \\frac{mv^2}{r} \\Rightarrow v = \\sqrt{\\frac{GM}{r}}.$$\n\nPeriod \\(T = 2\\pi r/v = 2\\pi\\sqrt{r^3/(GM)}\\) — Kepler's third law.\n\nEnergy in circular orbit:\n- \\(K = \\tfrac{1}{2}mv^2 = GMm/(2r)\\)\n- \\(U = -GMm/r\\) (note the sign: reference at infinity)\n- Total: \\(E = K + U = -GMm/(2r)\\) — always negative for bound orbits.\n\nHigher orbit = lower speed. Counterintuitive: to go faster in orbit, you have to *fall* to a lower radius.\n\n**Elliptical orbits** conserve angular momentum (torque from central gravity is zero about the central body) and total energy. At perihelion (closest approach), \\(v\\) is highest; at aphelion, lowest.",
    keyIdeas: [
      "Circular orbit: \\(v = \\sqrt{GM/r}\\), \\(T^2 \\propto r^3\\).",
      "Bound orbit energy is negative: \\(E = -GMm/(2r)\\).",
      "Higher orbit ⇔ slower speed.",
      "Elliptical: conserves \\(L\\) and \\(E\\); speed varies around orbit.",
    ],
    workedExample: {
      prompt:
        "A satellite orbits Earth at altitude equal to Earth's radius. By what factor does its orbital speed differ from low-Earth orbit?",
      solution:
        "Low orbit: \\(r = R_E\\). High orbit: \\(r = 2R_E\\). \\(v \\propto 1/\\sqrt{r}\\), so high orbit speed is \\(1/\\sqrt{2}\\) times low orbit speed.",
    },
    commonMistakes: [
      "Using \\(mg\\) instead of \\(GMm/r^2\\) at large altitudes.",
      "Missing the negative sign on gravitational PE.",
      "Thinking higher orbits go faster.",
    ],
  },

  // =========================================================================
  // UNIT 7 — OSCILLATIONS
  // =========================================================================
  "7.1": {
    id: "7.1",
    title: "Defining Simple Harmonic Motion",
    summary:
      "SHM is motion under a linear restoring force: \\(F = -kx\\). Solutions are sinusoidal in time.",
    lesson:
      "**Simple harmonic motion (SHM)** occurs whenever an object is subject to a restoring force proportional to its displacement from equilibrium:\n\n$$F = -kx.$$\n\nNewton's second law gives \\(m\\ddot{x} = -kx\\), whose solutions are sinusoidal:\n\n$$x(t) = A\\cos(\\omega t + \\phi),$$\n\nwhere \\(A\\) is the amplitude, \\(\\omega = \\sqrt{k/m}\\) is the angular frequency, and \\(\\phi\\) is a phase constant set by initial conditions.\n\nExamples of SHM:\n- Mass on a spring.\n- Pendulum (small-angle approximation; \\(\\omega = \\sqrt{g/L}\\)).\n- Buoyant bob oscillating in a fluid.\n- LC electrical circuit.\n\nAny system where a restoring force is approximately linear near equilibrium will oscillate simply harmonically for small amplitudes — SHM is the universal \"small oscillation\" behavior.",
    keyIdeas: [
      "SHM requires a linear restoring force: \\(F = -kx\\).",
      "Solution: \\(x(t) = A\\cos(\\omega t + \\phi)\\).",
      "\\(\\omega = \\sqrt{k/m}\\) for mass-spring; \\(\\sqrt{g/L}\\) for pendulum.",
      "Universal near any stable equilibrium for small displacements.",
    ],
    commonMistakes: [
      "Treating a pendulum as exactly SHM at large angles.",
      "Forgetting the linear dependence — if \\(F \\propto x^3\\), it's not SHM.",
      "Using the wrong formula for \\(\\omega\\).",
    ],
  },
  "7.2": {
    id: "7.2",
    title: "Frequency and Period of SHM",
    summary:
      "\\(T = 2\\pi\\sqrt{m/k}\\) for mass-spring; \\(T = 2\\pi\\sqrt{L/g}\\) for pendulum. Frequency \\(f = 1/T\\); angular frequency \\(\\omega = 2\\pi f\\).",
    lesson:
      "Period and frequency of SHM:\n- Period \\(T\\): time for one complete oscillation.\n- Frequency \\(f = 1/T\\): oscillations per second (Hz).\n- Angular frequency \\(\\omega = 2\\pi f = 2\\pi/T\\): radians per second.\n\nFor a **mass-spring** system: \\(\\omega = \\sqrt{k/m}\\), so \\(T = 2\\pi\\sqrt{m/k}\\). Heavier mass → slower; stiffer spring → faster. No dependence on amplitude — an isochronism property of SHM.\n\nFor a **simple pendulum** (small angles): \\(\\omega = \\sqrt{g/L}\\), so \\(T = 2\\pi\\sqrt{L/g}\\). Surprising: doesn't depend on the pendulum's mass. Longer pendulum → slower.\n\nPeriod is independent of amplitude for SHM — the restoring force is linear, so the kinematics scale cleanly. Breaks for large-amplitude pendulums where the small-angle approximation fails.",
    keyIdeas: [
      "\\(T = 2\\pi\\sqrt{m/k}\\) for spring.",
      "\\(T = 2\\pi\\sqrt{L/g}\\) for small-angle pendulum.",
      "SHM period doesn't depend on amplitude.",
      "\\(\\omega = 2\\pi f = 2\\pi/T\\).",
    ],
    workedExample: {
      prompt:
        "A 0.5 kg mass on a spring of \\(k = 200\\,\\text{N/m}\\). Find the period and frequency.",
      solution:
        "\\(T = 2\\pi\\sqrt{0.5/200} = 2\\pi\\sqrt{0.0025} = 2\\pi \\cdot 0.05 \\approx 0.314\\,\\text{s}\\). \\(f = 1/T \\approx 3.18\\,\\text{Hz}\\).",
    },
    commonMistakes: [
      "Using mass in the pendulum period formula.",
      "Confusing \\(\\omega\\) and \\(f\\).",
      "Including amplitude dependence where there is none.",
    ],
  },
  "7.3": {
    id: "7.3",
    title: "Representing and Analyzing SHM",
    summary:
      "Position, velocity, acceleration in SHM are all sinusoidal, out of phase: \\(v\\) leads \\(x\\) by 90°; \\(a\\) is 180° out of phase with \\(x\\).",
    lesson:
      "For \\(x(t) = A\\cos(\\omega t + \\phi)\\):\n- \\(v(t) = -A\\omega\\sin(\\omega t + \\phi)\\)\n- \\(a(t) = -A\\omega^2\\cos(\\omega t + \\phi) = -\\omega^2 x(t)\\)\n\nAmplitudes: \\(x_{\\max} = A\\), \\(v_{\\max} = A\\omega\\), \\(a_{\\max} = A\\omega^2\\).\n\nPhase relations: \\(v\\) is \\(90^\\circ\\) ahead of \\(x\\) — when \\(x = \\pm A\\) (turning points), \\(v = 0\\). \\(a\\) is \\(180^\\circ\\) out of phase with \\(x\\) — acceleration points back toward equilibrium always.\n\nGraphical reading: if \\(x\\) is a cosine curve, \\(v\\) is negative sine, \\(a\\) is negative cosine. All three have the same period. On an FRQ, sketching all three on the same time axis is a common ask.\n\nEnergy analysis (next topic) benefits from knowing at \\(x = \\pm A\\), \\(v = 0\\) — all energy is potential; at \\(x = 0\\), \\(v = v_{\\max}\\) — all energy is kinetic.",
    keyIdeas: [
      "\\(x = A\\cos(\\omega t + \\phi)\\); \\(v_{\\max} = A\\omega\\); \\(a_{\\max} = A\\omega^2\\).",
      "\\(v\\) leads \\(x\\) by 90°.",
      "\\(a = -\\omega^2 x\\) — restoring always.",
      "Turning points: \\(v = 0\\); center: \\(|v| = v_{\\max}\\).",
    ],
    commonMistakes: [
      "Mixing up the amplitudes \\(A\\), \\(A\\omega\\), \\(A\\omega^2\\).",
      "Getting phase relations backwards (v leads x, not lags).",
      "Using angular frequency in radians with input in degrees.",
    ],
  },
  "7.4": {
    id: "7.4",
    title: "Energy of SHM",
    summary:
      "Total energy \\(E = \\tfrac{1}{2}kA^2\\). Oscillates between K and U but sum is constant.",
    lesson:
      "For a mass on a spring in SHM:\n- Spring PE: \\(U = \\tfrac{1}{2}kx^2\\).\n- Kinetic energy: \\(K = \\tfrac{1}{2}mv^2\\).\n- Total: \\(E = K + U = \\tfrac{1}{2}kA^2\\) — constant in time.\n\nAt the **turning points** \\(x = \\pm A\\): \\(v = 0\\), so \\(K = 0\\), \\(U = \\tfrac{1}{2}kA^2\\).\n\nAt **equilibrium** \\(x = 0\\): \\(U = 0\\), so \\(K = \\tfrac{1}{2}kA^2\\), giving \\(v_{\\max} = A\\omega = A\\sqrt{k/m}\\).\n\nAt any intermediate \\(x\\): \\(K + U = \\tfrac{1}{2}kA^2\\), so \\(v^2 = \\omega^2(A^2 - x^2)\\).\n\nThis gives you another way to solve SHM problems — energy conservation often beats the full sinusoidal solution for finding maximum speed or amplitude.",
    keyIdeas: [
      "\\(E = \\tfrac{1}{2}kA^2\\) for mass-spring SHM.",
      "\\(K = \\tfrac{1}{2}kA^2\\) at \\(x = 0\\); \\(U = \\tfrac{1}{2}kA^2\\) at \\(x = \\pm A\\).",
      "\\(v^2 = \\omega^2(A^2 - x^2)\\).",
      "Energy conservation shortcuts many SHM problems.",
    ],
    workedExample: {
      prompt:
        "A mass on a spring has \\(k = 100\\,\\text{N/m}\\) and amplitude 0.2 m. Find \\(v_{\\max}\\) and the speed at \\(x = 0.1\\,\\text{m}\\), given \\(m = 1\\,\\text{kg}\\).",
      solution:
        "\\(E = \\tfrac{1}{2}(100)(0.04) = 2\\,\\text{J}\\). \\(v_{\\max} = \\sqrt{2E/m} = 2\\,\\text{m/s}\\). At \\(x = 0.1\\): \\(U = \\tfrac{1}{2}(100)(0.01) = 0.5\\,\\text{J}\\), \\(K = 1.5\\,\\text{J}\\), \\(v = \\sqrt{3}\\approx 1.73\\,\\text{m/s}\\).",
    },
    commonMistakes: [
      "Using \\(E = \\tfrac{1}{2}kx^2\\) instead of \\(\\tfrac{1}{2}kA^2\\).",
      "Forgetting that total energy is constant.",
      "Confusing spring PE with gravitational PE in pendulum oscillations.",
    ],
  },

  // =========================================================================
  // UNIT 8 — FLUIDS
  // =========================================================================
  "8.1": {
    id: "8.1",
    title: "Internal Structure and Density",
    summary:
      "Density \\(\\rho = m/V\\) measures mass per unit volume. Incompressible fluids have constant \\(\\rho\\).",
    lesson:
      "**Density** \\(\\rho = m/V\\) is mass per unit volume. Units kg/m³. Water is about \\(1000\\,\\text{kg/m}^3\\) by convention; air is about \\(1.2\\,\\text{kg/m}^3\\).\n\n**Specific gravity** is the ratio of a fluid's density to water's — a dimensionless number. Oil has SG ≈ 0.9 (less than 1, so it floats on water); mercury has SG ≈ 13.6.\n\nFluids can be categorized:\n- **Incompressible**: \\(\\rho\\) is essentially constant regardless of pressure. Liquids are well-approximated as incompressible.\n- **Compressible**: density changes with pressure. Gases are compressible; the ideal gas law \\(PV = nRT\\) quantifies this.\n\nFor AP Physics 1, we mostly deal with **incompressible fluids** (water, oil) where \\(\\rho\\) is a given constant.\n\nUseful computational fact: mass of a submerged object = \\(\\rho_{\\text{object}} V\\). Mass of displaced fluid when submerged = \\(\\rho_{\\text{fluid}} V_{\\text{submerged}}\\).",
    keyIdeas: [
      "\\(\\rho = m/V\\); water ≈ \\(1000\\,\\text{kg/m}^3\\).",
      "Specific gravity is density relative to water.",
      "Incompressible fluids have constant density.",
      "Pressure variations in a fluid are driven by gravity and applied forces.",
    ],
    commonMistakes: [
      "Confusing density with weight density (\\(\\rho g\\)).",
      "Treating air as incompressible.",
      "Using SG without realizing it's dimensionless.",
    ],
  },
  "8.2": {
    id: "8.2",
    title: "Pressure",
    summary:
      "Pressure \\(P = F/A\\) is force per unit area. In a static fluid, \\(P = P_0 + \\rho g h\\).",
    lesson:
      "**Pressure** is force per unit area:\n\n$$P = \\frac{F_\\perp}{A}.$$\n\nUnits: pascal (\\(1\\,\\text{Pa} = 1\\,\\text{N/m}^2\\)). Atmospheric pressure at sea level is about \\(1.01\\times 10^5\\,\\text{Pa} = 101\\,\\text{kPa}\\).\n\nPressure is a scalar — it has no direction. The *force* from pressure on a surface is perpendicular to the surface and of magnitude \\(F = PA\\).\n\n**Hydrostatic pressure** in a static fluid at depth \\(h\\) below the free surface:\n\n$$P(h) = P_0 + \\rho g h,$$\n\nwhere \\(P_0\\) is the pressure at the surface (often atmospheric). This is the vertical equilibrium of a column of fluid.\n\nConsequence: pressure depends only on depth, not on the shape of the container. A narrow tube of water and a wide pool of the same depth have the same pressure at the bottom.\n\n**Pascal's principle**: a pressure change applied to an enclosed fluid is transmitted undiminished throughout. Basis for hydraulic lifts: a small force on a small piston becomes a large force on a large piston because \\(P = F_1/A_1 = F_2/A_2\\).",
    keyIdeas: [
      "\\(P = F_\\perp/A\\); scalar with Pa units.",
      "Hydrostatic: \\(P(h) = P_0 + \\rho g h\\); depth-only dependence.",
      "Pascal's principle: pressure transmits equally in an enclosed fluid.",
      "Hydraulic lift trades force for displacement.",
    ],
    workedExample: {
      prompt:
        "A diver is 10 m deep in fresh water. Find the total pressure (include atmospheric).",
      solution:
        "\\(P = P_0 + \\rho g h = 101{,}000 + 1000(10)(10) = 201{,}000\\,\\text{Pa} \\approx 2\\,\\text{atm}\\).",
    },
    commonMistakes: [
      "Forgetting atmospheric pressure when absolute pressure is asked.",
      "Using gauge pressure as absolute pressure.",
      "Treating the container shape as relevant to hydrostatic pressure.",
    ],
  },
  "8.3": {
    id: "8.3",
    title: "Fluids and Newton's Laws",
    summary:
      "Buoyancy (Archimedes): a submerged object experiences an upward force equal to the weight of displaced fluid, \\(F_b = \\rho_{\\text{fluid}} V_{\\text{sub}} g\\).",
    lesson:
      "**Archimedes' principle**: a body immersed (partly or fully) in a fluid experiences an upward buoyant force equal to the weight of the displaced fluid:\n\n$$F_b = \\rho_{\\text{fluid}} V_{\\text{sub}} g.$$\n\nDerivation: hydrostatic pressure is larger at the bottom of the submerged body than at the top; the pressure difference times the cross-sectional area gives an upward net force equal to the weight of the fluid that would have filled the submerged volume.\n\n**Floating condition**: a body floats with a fraction of its volume submerged equal to the ratio of its density to the fluid's:\n\n$$\\frac{V_{\\text{sub}}}{V_{\\text{total}}} = \\frac{\\rho_{\\text{object}}}{\\rho_{\\text{fluid}}}.$$\n\nIf \\(\\rho_{\\text{object}} > \\rho_{\\text{fluid}}\\), the body sinks.\n\n**Apparent weight** of a submerged object: \\(W_{\\text{app}} = W - F_b\\). A 100 N steel ball displacing 30 N of water feels 70 N in the water.\n\nCombining buoyancy with Newton's second law lets you analyze floating, sinking, and the dynamics of objects accelerated through fluids.",
    keyIdeas: [
      "\\(F_b = \\rho_{\\text{fluid}} V_{\\text{sub}} g\\).",
      "Float fraction: \\(V_{\\text{sub}}/V_{\\text{total}} = \\rho_{\\text{object}}/\\rho_{\\text{fluid}}\\).",
      "Apparent weight = actual weight − buoyant force.",
      "Direction is always up, opposing gravity.",
    ],
    workedExample: {
      prompt:
        "A block has density 600 kg/m³ and volume 0.1 m³. It floats in water. What fraction is submerged? What's the buoyant force?",
      solution:
        "Fraction submerged = 600/1000 = 0.6. Submerged volume = 0.06 m³. \\(F_b = 1000(0.06)(10) = 600\\,\\text{N}\\). (Equals the weight, as required for floating.)",
    },
    commonMistakes: [
      "Using \\(\\rho_{\\text{object}}\\) instead of \\(\\rho_{\\text{fluid}}\\) in \\(F_b\\).",
      "Using total volume instead of submerged volume.",
      "Forgetting that a floating object satisfies \\(F_b = W\\).",
    ],
  },
  "8.4": {
    id: "8.4",
    title: "Fluids and Conservation Laws",
    summary:
      "Continuity: \\(A_1 v_1 = A_2 v_2\\) (mass conservation). Bernoulli: \\(P + \\tfrac{1}{2}\\rho v^2 + \\rho g h\\) is constant along a streamline (energy conservation).",
    lesson:
      "For incompressible, steady flow through a pipe:\n\n**Continuity equation** (mass conservation): \\(A_1 v_1 = A_2 v_2\\). A narrower pipe means a faster flow; the volume flow rate \\(Av\\) is conserved.\n\n**Bernoulli's equation** (energy conservation per unit volume along a streamline):\n\n$$P + \\tfrac{1}{2}\\rho v^2 + \\rho g h = \\text{const}.$$\n\nThe three terms are pressure, kinetic per volume, potential per volume. High-speed regions have lower pressure — the basis of airplane lift, atomizers, and venturi meters.\n\nAssumptions for Bernoulli: incompressible, non-viscous, steady, along a single streamline. Don't apply across separated streamlines or to viscous/turbulent flow.\n\nCombined use: in a horizontal pipe (\\(h\\) constant), Bernoulli reduces to \\(P + \\tfrac{1}{2}\\rho v^2 = \\text{const}\\). Use continuity to relate \\(v_1\\) and \\(v_2\\), then Bernoulli to get pressure difference.",
    keyIdeas: [
      "Continuity: \\(Av = \\text{const}\\) — narrow pipe = faster flow.",
      "Bernoulli: \\(P + \\tfrac{1}{2}\\rho v^2 + \\rho g h = \\text{const}\\) along a streamline.",
      "Higher speed → lower pressure.",
      "Assumes incompressible, non-viscous, steady flow.",
    ],
    workedExample: {
      prompt:
        "Water flows in a horizontal pipe with speed 2 m/s at cross-section 0.01 m². The pipe narrows to 0.005 m². Find the speed and pressure change.",
      solution:
        "Continuity: \\(v_2 = (0.01)(2)/0.005 = 4\\,\\text{m/s}\\). Bernoulli (horizontal, so \\(h\\) cancels): \\(P_1 + \\tfrac{1}{2}(1000)(4) = P_2 + \\tfrac{1}{2}(1000)(16)\\). \\(P_1 - P_2 = \\tfrac{1}{2}(1000)(12) = 6000\\,\\text{Pa}\\). Pressure drops by 6 kPa in the narrower section.",
    },
    commonMistakes: [
      "Applying Bernoulli across non-streamlined flow.",
      "Using continuity with compressible flow.",
      "Forgetting that higher speed means lower pressure (not higher).",
    ],
  },
};
