import type { CourseCedLessons } from "./types";

/**
 * AP Physics C: Mechanics CED lessons — every topic from the 7-unit 2024
 * CED. Content is adapted from the AP Physics 1 lessons but upgraded with
 * calculus: kinematics via derivatives and integrals, \(F = dp/dt\),
 * \(W = \int \vec{F}\cdot d\vec{r}\), moments of inertia as integrals,
 * the SHM differential equation, resistive-force ODEs, and so on.
 *
 * Inline LaTeX uses \\(...\\) so the MathRender pipeline picks it up.
 */

export const AP_PHYSICS_C_MECH_CED_LESSONS: CourseCedLessons = {
  // =========================================================================
  // UNIT 1 — KINEMATICS
  // =========================================================================
  "1.1": {
    id: "1.1",
    title: "Scalars and Vectors in One Dimension",
    summary:
      "Scalars have magnitude only; vectors have magnitude and direction. In 1D, a signed number encodes a vector along the chosen axis.",
    lesson:
      "Physics quantities split into **scalars** (mass, time, temperature, energy, power) and **vectors** (position, velocity, acceleration, force, momentum). Vectors obey head-to-tail addition; scalars add like ordinary numbers.\n\nIn 1D motion we pick an axis (usually \\(x\\)) and encode a vector by its signed component: positive along the axis, negative against it. The arrow is implicit — equations read like ordinary algebra but signs carry the direction.\n\nBasic vector algebra:\n- Magnitude of \\(\\vec{A}\\): \\(|\\vec{A}| = \\sqrt{A_x^2 + A_y^2}\\).\n- Dot product: \\(\\vec{A}\\cdot\\vec{B} = AB\\cos\\theta = A_xB_x + A_yB_y\\) — scalar, zero when perpendicular.\n- Cross product: \\(|\\vec{A}\\times\\vec{B}| = AB\\sin\\theta\\) — vector perpendicular to both, zero when parallel.\n\nUnit vectors \\(\\hat{i},\\hat{j},\\hat{k}\\) point along \\(+x,+y,+z\\). A position vector is \\(\\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}\\).\n\nCalculus plays nice with vectors: differentiation and integration act component-wise, so \\(\\frac{d\\vec{r}}{dt} = \\frac{dx}{dt}\\hat{i} + \\frac{dy}{dt}\\hat{j} + \\frac{dz}{dt}\\hat{k}\\). Every 1D formula in Physics 1 becomes a component equation when lifted to 2D or 3D.",
    keyIdeas: [
      "Scalars have magnitude only; vectors carry direction.",
      "In 1D a signed scalar encodes the vector along the chosen axis.",
      "Dot product is \\(AB\\cos\\theta\\); cross product magnitude is \\(AB\\sin\\theta\\).",
      "Derivatives and integrals of vectors act component-wise.",
    ],
    commonMistakes: [
      "Adding vectors as if they were scalars (ignoring direction).",
      "Forgetting that negative \\(x\\) means the vector points in the \\(-\\hat{i}\\) direction.",
      "Mixing up dot (scalar) and cross (vector) products.",
    ],
  },
  "1.2": {
    id: "1.2",
    title: "Displacement, Velocity, and Acceleration",
    summary:
      "Velocity is the derivative of position; acceleration is the derivative of velocity. Each formula in Physics 1 becomes an instantaneous calculus statement in Physics C.",
    lesson:
      "Position \\(\\vec{r}(t)\\) is a vector from the origin. **Displacement** is \\(\\Delta\\vec{r} = \\vec{r}_f - \\vec{r}_i\\). **Distance** is the path length \\(\\int |d\\vec{r}|\\) — a scalar.\n\n**Velocity** is the instantaneous rate of change of position:\n\n$$\\vec{v}(t) = \\frac{d\\vec{r}}{dt}.$$\n\nAverage velocity over \\([t_1,t_2]\\) is \\(\\bar{\\vec{v}} = \\Delta\\vec{r}/\\Delta t\\). **Speed** is \\(|\\vec{v}|\\) — always nonnegative.\n\n**Acceleration** is the rate of change of velocity:\n\n$$\\vec{a}(t) = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{r}}{dt^2}.$$\n\nAn object speeds up when \\(\\vec{v}\\cdot\\vec{a} > 0\\) and slows down when \\(\\vec{v}\\cdot\\vec{a} < 0\\). Sign of \\(a\\) alone doesn't determine speeding up or slowing down.\n\nFor **constant acceleration**, integrate once to get \\(v(t) = v_0 + at\\) and again to get \\(x(t) = x_0 + v_0 t + \\tfrac{1}{2}at^2\\). Eliminating \\(t\\) gives the time-independent relation \\(v^2 = v_0^2 + 2a\\Delta x\\). These reduce to the algebra-based kinematic equations Physics 1 students memorize — but here they're consequences of integration, so they fail silently the moment \\(a\\) is not constant.\n\nAP FRQ pattern: given \\(a(t)\\), find \\(v(t)\\) by integrating with an initial condition; given \\(v(t)\\), integrate for \\(x(t)\\). The constants of integration are set by the stated initial values.",
    keyIdeas: [
      "\\(\\vec{v} = d\\vec{r}/dt\\); \\(\\vec{a} = d\\vec{v}/dt\\).",
      "Object is speeding up iff \\(\\vec{v}\\cdot\\vec{a} > 0\\).",
      "The three kinematic equations hold only for constant \\(a\\); otherwise integrate.",
      "Distance is the integral of speed; displacement is the integral of velocity.",
    ],
    workedExample: {
      prompt:
        "A particle has \\(a(t) = 6t\\) (m/s²) with \\(v(0) = 2\\,\\text{m/s}\\) and \\(x(0) = 0\\). Find \\(v(t)\\), \\(x(t)\\), and \\(x(2)\\).",
      solution:
        "\\(v(t) = \\int 6t\\,dt = 3t^2 + C_1\\); initial condition \\(v(0) = 2\\) gives \\(v(t) = 3t^2 + 2\\). \\(x(t) = \\int(3t^2 + 2)\\,dt = t^3 + 2t + C_2\\); \\(x(0) = 0\\) gives \\(x(t) = t^3 + 2t\\). So \\(x(2) = 8 + 4 = 12\\,\\text{m}\\).",
    },
    commonMistakes: [
      "Applying constant-\\(a\\) kinematic equations when \\(a\\) varies with time.",
      "Dropping the constant of integration and losing the initial condition.",
      "Reading negative acceleration as slowing down regardless of the sign of velocity.",
    ],
  },
  "1.3": {
    id: "1.3",
    title: "Representing Motion",
    summary:
      "Slope and area on motion graphs correspond to derivatives and integrals. \\(v\\) is the slope of \\(x(t)\\); displacement is the signed area under \\(v(t)\\).",
    lesson:
      "Four equivalent representations of 1D motion — graph, table, equation, verbal description — and one translation dictionary:\n- **Slope on \\(x\\text{-}t\\)** = instantaneous velocity.\n- **Slope on \\(v\\text{-}t\\)** = instantaneous acceleration.\n- **Signed area under \\(v\\text{-}t\\)** = \\(\\displaystyle\\int_{t_i}^{t_f} v\\,dt = \\Delta x\\).\n- **Signed area under \\(a\\text{-}t\\)** = \\(\\displaystyle\\int a\\,dt = \\Delta v\\).\n- **Curvature of \\(x(t)\\)**: concave up \\(\\Rightarrow a > 0\\); concave down \\(\\Rightarrow a < 0\\).\n\nThese are just the fundamental theorem of calculus applied to the definitions \\(v = dx/dt\\) and \\(a = dv/dt\\).\n\nOn FRQs with a \\(v(t)\\) curve (often a piecewise graph or parabola), common asks are:\n- displacement between two times (definite integral / signed area),\n- acceleration at an instant (slope),\n- times when the object is at rest (\\(v = 0\\)),\n- when it reverses direction (\\(v\\) changes sign).\n\nFor **projectile motion** in two dimensions, \\(\\vec{a} = -g\\hat{j}\\) is constant, so horizontal and vertical motion decouple: \\(x(t) = v_{0x}t\\), \\(y(t) = v_{0y}t - \\tfrac{1}{2}gt^2\\). The trajectory is a parabola \\(y(x)\\) obtained by eliminating \\(t\\).",
    keyIdeas: [
      "Slope = derivative; area = integral. That's the whole dictionary.",
      "\\(\\Delta x = \\int v\\,dt\\); \\(\\Delta v = \\int a\\,dt\\).",
      "Signed area matters — below the axis subtracts.",
      "Projectile motion decouples into independent \\(x\\) and \\(y\\) kinematics.",
    ],
    workedExample: {
      prompt:
        "A particle's velocity is \\(v(t) = 4 - 2t\\,\\text{m/s}\\) on \\([0,4]\\,\\text{s}\\). Find displacement and total distance traveled.",
      solution:
        "\\(v = 0\\) at \\(t = 2\\). Displacement: \\(\\int_0^4 (4-2t)\\,dt = [4t - t^2]_0^4 = 0\\). Distance = \\(\\int_0^2 (4-2t)\\,dt + \\int_2^4 (2t-4)\\,dt = 4 + 4 = 8\\,\\text{m}\\).",
    },
    commonMistakes: [
      "Reading \\(x\\text{-}t\\) values as velocities.",
      "Taking |area| for displacement instead of signed area.",
      "Using projectile kinematics in the horizontal direction (\\(a_x = 0\\), not \\(g\\)).",
    ],
  },
  "1.4": {
    id: "1.4",
    title: "Reference Frames and Relative Motion",
    summary:
      "Velocities add as vectors between frames: \\(\\vec{v}_{A/C} = \\vec{v}_{A/B} + \\vec{v}_{B/C}\\). Acceleration is the same in any inertial frame.",
    lesson:
      "A **reference frame** is the viewpoint (origin + axes) from which positions and velocities are measured. Switching frames is a coordinate transformation.\n\nFor two frames \\(B\\) and \\(C\\) in relative motion, the position of object \\(A\\) satisfies\n\n$$\\vec{r}_{A/C} = \\vec{r}_{A/B} + \\vec{r}_{B/C}.$$\n\nDifferentiating gives the **Galilean velocity addition** rule:\n\n$$\\vec{v}_{A/C} = \\vec{v}_{A/B} + \\vec{v}_{B/C}.$$\n\nDifferentiating again: if \\(B\\) moves with constant velocity relative to \\(C\\), then \\(\\vec{a}_{A/C} = \\vec{a}_{A/B}\\) — accelerations agree between **inertial** frames.\n\nStandard AP C setups:\n- Boat crossing a river: boat's velocity relative to ground = velocity relative to water + current.\n- Passenger walking on a moving train: \\(\\vec{v}_{\\text{pass/ground}} = \\vec{v}_{\\text{pass/train}} + \\vec{v}_{\\text{train/ground}}\\).\n- Projectile fired from a moving vehicle: add the launch velocity to the vehicle's velocity.\n\nA frame is **inertial** if Newton's first law holds in it. Accelerating frames are non-inertial and introduce fictitious forces — avoid them unless the problem explicitly asks.\n\nSubscript discipline: read \\(\\vec{v}_{A/B}\\) as \"velocity of \\(A\\) relative to \\(B\\).\" Always check that adjacent subscripts match so the chain collapses cleanly.",
    keyIdeas: [
      "Relative-velocity rule: \\(\\vec{v}_{A/C} = \\vec{v}_{A/B} + \\vec{v}_{B/C}\\).",
      "Accelerations agree between inertial frames (same \\(\\vec{a}\\) in every uniformly moving frame).",
      "Always add velocities as vectors — don't just add magnitudes.",
      "Pick the inner subscript match carefully: \\(A/B + B/C \\to A/C\\).",
    ],
    workedExample: {
      prompt:
        "A boat can move at 4 m/s relative to still water. It heads straight across a river flowing at 3 m/s. Find its speed and direction relative to the ground.",
      solution:
        "Two perpendicular components: \\(v_{\\text{cross}} = 4\\,\\text{m/s}\\), \\(v_{\\text{downstream}} = 3\\,\\text{m/s}\\). Magnitude: \\(\\sqrt{16+9} = 5\\,\\text{m/s}\\). Angle from the across-direction: \\(\\tan^{-1}(3/4) \\approx 36.9^\\circ\\) downstream.",
    },
    commonMistakes: [
      "Adding speeds instead of vectors.",
      "Getting subscripts backwards (\\(\\vec{v}_{B/A} = -\\vec{v}_{A/B}\\)).",
      "Applying Galilean rules in non-inertial frames without flagging the fictitious forces.",
    ],
  },
  "1.5": {
    id: "1.5",
    title: "Vectors and Motion in Two Dimensions",
    summary:
      "In 2D, kinematic variables are vectors handled component-wise: \\(\\vec{v} = d\\vec{r}/dt\\), \\(\\vec{a} = d\\vec{v}/dt\\), and the axes are independent.",
    lesson:
      "Write position as \\(\\vec{r}(t) = x(t)\\hat{i} + y(t)\\hat{j}\\). Then\n\n$$\\vec{v}(t) = \\dot{x}\\hat{i} + \\dot{y}\\hat{j},\\qquad \\vec{a}(t) = \\ddot{x}\\hat{i} + \\ddot{y}\\hat{j}.$$\n\nEach component satisfies its own 1D kinematics. This independence is the key conceptual trick of 2D motion.\n\n**Projectile motion** near Earth's surface: \\(a_x = 0\\), \\(a_y = -g\\). Starting with launch speed \\(v_0\\) at angle \\(\\theta\\):\n\n$$x(t) = v_0\\cos\\theta\\,t,\\qquad y(t) = v_0\\sin\\theta\\,t - \\tfrac{1}{2}g t^2.$$\n\nEliminating \\(t\\) gives \\(y(x) = x\\tan\\theta - \\dfrac{g x^2}{2 v_0^2 \\cos^2\\theta}\\) — a parabola.\n\nUseful results: time of flight for level ground \\(T = 2v_0\\sin\\theta/g\\); range \\(R = v_0^2 \\sin(2\\theta)/g\\); max height \\(H = v_0^2\\sin^2\\theta/(2g)\\). Range is maximum at \\(\\theta = 45^\\circ\\) for symmetric landing.\n\nFor motion with non-constant acceleration — a projectile with quadratic drag, a charged particle in crossed fields — keep the component ODEs \\(\\ddot{x} = a_x(t,x,\\dot{x})\\), \\(\\ddot{y} = a_y(t,y,\\dot{y})\\) and solve each.\n\nFor **circular motion** in 2D, decompose acceleration into tangential (along \\(\\vec{v}\\)) and radial (toward center): \\(a_t = dv/dt\\), \\(a_r = v^2/r\\). Total acceleration magnitude is \\(\\sqrt{a_t^2 + a_r^2}\\).",
    keyIdeas: [
      "2D motion: treat \\(x\\) and \\(y\\) components independently.",
      "Projectile: \\(a_x = 0\\), \\(a_y = -g\\); trajectory is a parabola.",
      "Range on level ground: \\(R = v_0^2\\sin(2\\theta)/g\\) — max at \\(45^\\circ\\).",
      "In circular motion split acceleration into tangential and centripetal components.",
    ],
    workedExample: {
      prompt:
        "A projectile is launched at \\(30\\,\\text{m/s}\\) at \\(60^\\circ\\) above horizontal from level ground. Using \\(g = 10\\,\\text{m/s}^2\\), find range and maximum height.",
      solution:
        "\\(v_{0x} = 15\\), \\(v_{0y} = 15\\sqrt{3}\\). Time of flight \\(T = 2v_{0y}/g = 3\\sqrt{3}\\,\\text{s}\\). Range \\(R = v_{0x}T = 45\\sqrt{3}\\approx 78\\,\\text{m}\\). Max height \\(H = v_{0y}^2/(2g) = 675/20 = 33.75\\,\\text{m}\\).",
    },
    commonMistakes: [
      "Applying the horizontal kinematic equations with \\(g\\) (there is no horizontal gravity).",
      "Mixing components of velocity and acceleration.",
      "Using the range formula \\(v_0^2 \\sin 2\\theta/g\\) when launch and landing heights differ.",
    ],
  },

  // =========================================================================
  // UNIT 2 — FORCE AND TRANSLATIONAL DYNAMICS
  // =========================================================================
  "2.1": {
    id: "2.1",
    title: "Systems and Center of Mass",
    summary:
      "The center of mass is the mass-weighted average position. For continuous bodies it's an integral, and \\(\\vec{F}_{\\text{ext}} = M\\vec{a}_{\\text{COM}}\\).",
    lesson:
      "A **system** is any chosen collection of objects. The choice decides which forces are internal (cancel in pairs) and which are external (drive the motion of the system as a whole).\n\n**Center of mass** for a discrete system:\n\n$$\\vec{r}_{\\text{COM}} = \\frac{1}{M}\\sum_i m_i \\vec{r}_i,\\qquad M = \\sum_i m_i.$$\n\nFor a continuous body:\n\n$$\\vec{r}_{\\text{COM}} = \\frac{1}{M}\\int \\vec{r}\\,dm,$$\n\nwhere the integral runs over the whole body and \\(dm = \\rho\\,dV\\) (or \\(\\lambda\\,dL\\) for a 1D mass distribution, \\(\\sigma\\,dA\\) for 2D). Exploit symmetry: a uniform rod's COM is at its midpoint; a uniform disk's COM is at its geometric center.\n\n**Newton's second law for systems**: differentiating twice gives\n\n$$M\\vec{a}_{\\text{COM}} = \\sum_i m_i\\ddot{\\vec{r}}_i = \\vec{F}_{\\text{ext,net}},$$\n\nbecause internal forces cancel by Newton's third law. Consequence: the COM accelerates as if all external forces acted on a single point of mass \\(M\\). A tossed wrench spins chaotically, but its COM traces a parabola.\n\nCenter of **mass** vs. center of **gravity**: identical in a uniform gravitational field (Earth's surface for ordinary objects), different only for objects large enough that \\(g\\) varies across them.",
    keyIdeas: [
      "\\(\\vec{r}_{\\text{COM}} = M^{-1}\\int \\vec{r}\\,dm\\).",
      "Exploit symmetry to skip the integral when possible.",
      "\\(\\vec{F}_{\\text{ext,net}} = M\\vec{a}_{\\text{COM}}\\).",
      "Internal forces can never accelerate the COM.",
    ],
    workedExample: {
      prompt:
        "Find the center of mass of a uniform rod of length \\(L\\) and linear density \\(\\lambda(x) = \\lambda_0 (1 + x/L)\\).",
      solution:
        "\\(M = \\int_0^L \\lambda_0(1 + x/L)\\,dx = \\lambda_0 (L + L/2) = \\tfrac{3}{2}\\lambda_0 L\\). \\(M x_{\\text{COM}} = \\int_0^L x\\lambda_0(1 + x/L)\\,dx = \\lambda_0(L^2/2 + L^2/3) = \\tfrac{5}{6}\\lambda_0 L^2\\). So \\(x_{\\text{COM}} = (5/6)/(3/2)\\,L = 5L/9\\).",
    },
    commonMistakes: [
      "Using geometric midpoint for a non-uniform density.",
      "Including internal forces in \\(\\vec{F}_{\\text{ext,net}}\\).",
      "Forgetting the mass element \\(dm\\) — integrating over volume or length alone.",
    ],
  },
  "2.2": {
    id: "2.2",
    title: "Forces and Free-Body Diagrams",
    summary:
      "A free-body diagram isolates one object and shows every external force as a vector. It is the foundation of every Newton's-law problem.",
    lesson:
      "A **free-body diagram (FBD)** depicts one object as a point (or simplified shape) and every external force acting on it as an arrow from that point. Common forces:\n- **Weight** \\(\\vec{W} = m\\vec{g}\\) — vertical, toward the Earth's center.\n- **Normal** \\(\\vec{N}\\) — perpendicular to a contact surface, away from it.\n- **Friction** \\(\\vec{f}\\) — parallel to the surface, opposing slip or tendency to slip.\n- **Tension** \\(\\vec{T}\\) — along a rope, pulling away from the object.\n- **Applied** \\(\\vec{F}_a\\) — whatever push/pull the problem specifies.\n- **Spring** \\(\\vec{F}_s = -k\\vec{x}\\) — toward the relaxed length.\n- **Resistive / drag** \\(\\vec{F}_R\\) — opposite to velocity (covered in 2.9).\n\nRules (AP graders are strict):\n- Only include **real** forces (contact or field forces). No \"force of motion,\" no centrifugal force.\n- Draw each arrow from the object's point-mass representation; label with its physics symbol.\n- Don't include velocity, acceleration, or the net force on the FBD itself.\n- If the object is extended (for torque problems), draw forces at their points of application.\n\nAfter the FBD, choose axes — often one along the expected acceleration — decompose each force into components, and apply Newton's second law per axis: \\(\\sum F_x = ma_x\\), \\(\\sum F_y = ma_y\\).",
    keyIdeas: [
      "Only real contact and field forces appear on an FBD.",
      "Label every arrow with its symbol; draw from the object.",
      "Decompose and apply \\(\\sum F = ma\\) per axis.",
      "For extended bodies, draw forces at their points of application.",
    ],
    commonMistakes: [
      "Including velocity, acceleration, or \\(F_{\\text{net}}\\) on the diagram.",
      "Inventing a \"centrifugal\" or \"motion\" force.",
      "Omitting weight or normal on inclined-plane problems.",
    ],
  },
  "2.3": {
    id: "2.3",
    title: "Newton's Third Law",
    summary:
      "Forces come in equal-and-opposite pairs on different objects. Third-law pairs never appear on the same FBD.",
    lesson:
      "Newton's third law: if \\(A\\) exerts force \\(\\vec{F}_{AB}\\) on \\(B\\), then \\(B\\) exerts \\(\\vec{F}_{BA} = -\\vec{F}_{AB}\\) on \\(A\\). Equal magnitude, opposite direction, **different objects**.\n\nBecause the paired forces act on different bodies, they **never cancel on the same FBD** and never appear together on one. They can't cancel — they accelerate different things.\n\nCommon trap: weight of an object on level ground and the normal force from the ground are *not* a third-law pair. They act on the same object. The partner of the weight \\(m\\vec{g}\\) (Earth pulling object) is the object pulling Earth; the partner of the normal force is the object pushing the ground.\n\nAnother trap: the third-law partners are equal in magnitude even when masses differ dramatically. When a bug splats on a windshield, the bug and car exert equal-magnitude forces on each other — the bug just accelerates enormously more because \\(a = F/m\\).\n\nFor systems of connected bodies (Atwood, blocks with strings), third-law tension pairs in the rope are how momentum transfer happens internally. They cancel in the total system equation, leaving only external forces.",
    keyIdeas: [
      "Equal magnitude, opposite direction, different objects.",
      "Pairs never appear on the same FBD.",
      "Weight and normal on a level surface are not a third-law pair.",
      "Equal forces on unequal masses give unequal accelerations.",
    ],
    commonMistakes: [
      "Claiming weight and normal are an action-reaction pair.",
      "Saying a heavier object exerts a larger reaction force.",
      "Putting both halves of a pair on one object's FBD.",
    ],
  },
  "2.4": {
    id: "2.4",
    title: "Newton's First Law",
    summary:
      "In an inertial frame, an object's velocity is constant unless a net external force acts. \\(\\sum\\vec{F} = 0 \\Leftrightarrow \\vec{a} = 0\\).",
    lesson:
      "**Newton's first law** (law of inertia): an object continues at rest or in uniform motion in a straight line unless acted on by a net external force. Equivalent statement: \\(\\vec{a} = 0\\) iff \\(\\sum \\vec{F} = 0\\).\n\nThe first law also **defines** inertial frames: frames in which it holds. Any frame moving at constant velocity relative to an inertial frame is itself inertial. An accelerating elevator, rotating carousel, or curving car are non-inertial — a ball on the floor of such a frame appears to accelerate without a force, which is the signal to switch to an inertial frame (or add fictitious forces).\n\nAP problem tell: whenever a problem says \"at rest,\" \"moving at constant velocity,\" \"equilibrium,\" or \"terminal velocity,\" set \\(\\sum \\vec{F} = 0\\) and solve.\n\nFor rigid bodies, translational equilibrium is only half the story — you also need rotational equilibrium \\(\\sum\\vec{\\tau} = 0\\) (Unit 5). Together they define **static equilibrium**.",
    keyIdeas: [
      "Zero net force ⇔ zero acceleration.",
      "The first law defines inertial frames.",
      "\"At rest,\" \"constant velocity,\" \"equilibrium,\" \"terminal speed\" all ⇒ \\(\\sum\\vec{F} = 0\\).",
      "Rigid-body equilibrium also requires \\(\\sum \\vec{\\tau} = 0\\).",
    ],
    commonMistakes: [
      "Equating \"at rest\" with \"no forces\" — it means no *net* force.",
      "Applying Newton's laws in a non-inertial frame without the fictitious terms.",
      "Forgetting rotational equilibrium on statics problems.",
    ],
  },
  "2.5": {
    id: "2.5",
    title: "Newton's Second Law",
    summary:
      "\\(\\sum\\vec{F} = m\\vec{a} = d\\vec{p}/dt\\). The momentum form handles variable-mass systems; the familiar \\(F = ma\\) is its constant-mass special case.",
    lesson:
      "Newton's second law in its most general form:\n\n$$\\sum \\vec{F} = \\frac{d\\vec{p}}{dt},\\qquad \\vec{p} = m\\vec{v}.$$\n\nFor **constant mass** this reduces to \\(\\sum\\vec{F} = m\\,d\\vec{v}/dt = m\\vec{a}\\).\n\nFor **variable mass** (rockets, falling chains, a cart collecting sand), expand with the product rule: \\(\\sum\\vec{F} = m\\,d\\vec{v}/dt + \\vec{v}\\,dm/dt\\). The thrust term \\(\\vec{v}_{\\text{exhaust}}\\,dm/dt\\) drives rockets.\n\nProblem-solving protocol:\n1. Choose the system and draw FBDs.\n2. Pick axes (often one along the acceleration).\n3. Decompose forces into components.\n4. Write \\(\\sum F_x = ma_x\\), \\(\\sum F_y = ma_y\\).\n5. Solve.\n\nMass (kg) is an intrinsic property; weight (N) is the gravitational force \\(mg\\). Different quantities, different units. Acceleration points along the net force, not along velocity — a ball at its peak has \\(v = 0\\) but \\(a = -g\\).",
    keyIdeas: [
      "General: \\(\\sum\\vec{F} = d\\vec{p}/dt\\); constant mass: \\(\\sum\\vec{F} = m\\vec{a}\\).",
      "Apply component-wise after decomposing forces.",
      "Mass is intrinsic; weight is the gravitational force on the mass.",
      "Use momentum form whenever mass is changing with time.",
    ],
    workedExample: {
      prompt:
        "A rocket ejects mass at rate \\(|dm/dt| = 50\\,\\text{kg/s}\\) with exhaust speed \\(2000\\,\\text{m/s}\\) (relative to rocket). Ignore gravity and find the instantaneous thrust.",
      solution:
        "Thrust magnitude is \\(v_{\\text{ex}}|dm/dt| = 2000 \\cdot 50 = 1.0\\times 10^5\\,\\text{N}\\), directed opposite to the exhaust.",
    },
    commonMistakes: [
      "Using \\(F = ma\\) on variable-mass systems without the \\(v\\,dm/dt\\) term.",
      "Writing \\(F\\) where \\(F_{\\text{net}}\\) is required.",
      "Plugging weight into \\(F = ma\\) as the mass.",
    ],
  },
  "2.6": {
    id: "2.6",
    title: "Gravitational Force",
    summary:
      "Newton's universal gravitation: \\(F_g = GMm/r^2\\), attractive along the line joining masses. Near Earth it reduces to \\(F = mg\\) with \\(g = GM_E/R_E^2\\).",
    lesson:
      "Between two point masses separated by distance \\(r\\):\n\n$$\\vec{F}_g = -\\frac{GMm}{r^2}\\hat{r},$$\n\nwhere \\(\\hat{r}\\) points from the source mass to the field point and the minus sign encodes attraction. \\(G = 6.674\\times 10^{-11}\\,\\text{N·m}^2/\\text{kg}^2\\).\n\n**Shell theorem**: a spherically symmetric mass distribution attracts an external body as if all its mass were concentrated at the center. Inside a uniform sphere, only the mass within the current radius contributes.\n\nNear Earth's surface \\(r \\approx R_E\\), so \\(g = GM_E/R_E^2 \\approx 9.8\\,\\text{m/s}^2\\) and \\(F_g \\approx mg\\) — the familiar weight.\n\nFor a **circular orbit** of radius \\(r\\), gravity supplies the centripetal force:\n\n$$\\frac{GMm}{r^2} = \\frac{mv^2}{r}\\ \\Rightarrow\\ v = \\sqrt{\\frac{GM}{r}},\\quad T = 2\\pi\\sqrt{r^3/(GM)}.$$\n\nThis is **Kepler's third law**: \\(T^2 \\propto r^3\\).\n\nGravitational **potential energy** (reference at infinity): \\(U_g(r) = -GMm/r\\). **Escape speed**: \\(v_{\\text{esc}} = \\sqrt{2GM/R}\\).",
    keyIdeas: [
      "\\(F_g = GMm/r^2\\); shell theorem lets you treat spheres as point masses.",
      "Near Earth: \\(F \\approx mg\\) with \\(g = GM_E/R_E^2\\).",
      "Circular orbit: \\(v = \\sqrt{GM/r}\\); \\(T \\propto r^{3/2}\\).",
      "\\(U_g = -GMm/r\\) (zero at infinity); \\(v_{\\text{esc}} = \\sqrt{2GM/R}\\).",
    ],
    workedExample: {
      prompt:
        "Find the gravitational acceleration at height \\(h = R_E\\) above Earth's surface.",
      solution:
        "Distance from Earth's center is \\(2R_E\\), so \\(g' = GM/(2R_E)^2 = g/4 \\approx 2.45\\,\\text{m/s}^2\\).",
    },
    commonMistakes: [
      "Using \\(mg\\) at high altitude instead of \\(GMm/r^2\\).",
      "Dropping the minus sign on \\(U_g\\).",
      "Treating gravity as zero in orbit (astronauts are in free fall, not absence of gravity).",
    ],
  },
  "2.7": {
    id: "2.7",
    title: "Kinetic and Static Friction",
    summary:
      "Static friction adjusts to prevent slipping up to \\(f_s \\le \\mu_s N\\); kinetic friction is \\(f_k = \\mu_k N\\) opposite to slip, with \\(\\mu_s > \\mu_k\\).",
    lesson:
      "Friction is the component of a contact force parallel to the surface.\n\n**Static friction** acts when surfaces do not slide. Magnitude \\(f_s\\) takes whatever value is needed to prevent slip, up to a maximum\n\n$$f_s \\le \\mu_s N.$$\n\nAt the **breaking point** (impending motion), \\(f_s = \\mu_s N\\).\n\n**Kinetic friction** acts once surfaces are sliding:\n\n$$f_k = \\mu_k N,$$\n\ndirection opposite to the relative velocity of the surfaces. Approximately independent of speed.\n\nUsually \\(\\mu_s > \\mu_k\\) — harder to start sliding than to keep sliding. That discontinuity explains why static friction can give way suddenly when a force exceeds the threshold.\n\nOn an incline at angle \\(\\theta\\): \\(N = mg\\cos\\theta\\), and the gravity component along the incline is \\(mg\\sin\\theta\\). Threshold angle for slipping: \\(\\tan\\theta_c = \\mu_s\\).\n\nFriction is a **non-conservative** force — work done depends on the path. It converts mechanical energy into heat at rate \\(P = f_k v_{\\text{slip}}\\). For rolling without slipping (Unit 6), the contact point is momentarily at rest, so static friction does no work.",
    keyIdeas: [
      "Static friction is \\(\\le \\mu_s N\\), adjusts to prevent slip.",
      "Kinetic friction is \\(\\mu_k N\\), fixed magnitude, opposite to slip.",
      "\\(\\mu_s > \\mu_k\\) in almost all materials.",
      "Slip threshold on incline: \\(\\tan\\theta_c = \\mu_s\\).",
    ],
    workedExample: {
      prompt:
        "A 10 kg block on a surface with \\(\\mu_s = 0.4\\), \\(\\mu_k = 0.3\\) is pushed horizontally with \\(30\\,\\text{N}\\). Does it move? If so, what is its acceleration?",
      solution:
        "Max static: \\(0.4\\cdot 10\\cdot 10 = 40\\,\\text{N}\\). Applied \\(30\\,\\text{N} < 40\\,\\text{N}\\), so the block stays put; static friction matches at \\(30\\,\\text{N}\\) and \\(a = 0\\).",
    },
    commonMistakes: [
      "Using \\(\\mu_s N\\) as the actual static friction rather than its upper bound.",
      "Forgetting that \\(N\\) depends on incline angle.",
      "Treating kinetic friction as speed-dependent.",
    ],
  },
  "2.8": {
    id: "2.8",
    title: "Spring Forces",
    summary:
      "Hooke's law: \\(\\vec{F}_s = -k\\vec{x}\\). Linear restoring force; drives simple harmonic motion with \\(\\omega = \\sqrt{k/m}\\).",
    lesson:
      "An ideal spring exerts\n\n$$\\vec{F}_s = -k\\vec{x},$$\n\nwhere \\(\\vec{x}\\) is the displacement from the relaxed length and \\(k\\) is the spring constant (N/m). The minus sign means the force restores toward equilibrium.\n\n**Energy**: integrating \\(F = -kx\\) gives \\(U_s(x) = \\tfrac{1}{2}kx^2\\) (Unit 3), with \\(F_s = -dU_s/dx\\).\n\n**Combinations**:\n- Series: \\(1/k_{\\text{eq}} = 1/k_1 + 1/k_2\\) — softer than either.\n- Parallel: \\(k_{\\text{eq}} = k_1 + k_2\\) — stiffer than either.\n\nA mass on a spring satisfies \\(m\\ddot{x} = -kx\\), i.e., \\(\\ddot{x} + \\omega^2 x = 0\\) with \\(\\omega = \\sqrt{k/m}\\). Solution: \\(x(t) = A\\cos(\\omega t + \\phi)\\) — simple harmonic motion (Unit 7).\n\nHooke's law is the **leading-order expansion** of any smooth potential near a minimum: \\(U(x) \\approx U(x_0) + \\tfrac{1}{2}U''(x_0)(x-x_0)^2\\), with effective spring constant \\(k_{\\text{eff}} = U''(x_0)\\). That's why SHM is universal for small oscillations.",
    keyIdeas: [
      "\\(\\vec{F}_s = -k\\vec{x}\\); linear restoring force.",
      "\\(U_s = \\tfrac{1}{2}kx^2\\); \\(F_s = -dU_s/dx\\).",
      "Series: \\(1/k_{\\text{eq}} = \\sum 1/k_i\\); parallel: \\(k_{\\text{eq}} = \\sum k_i\\).",
      "Small oscillations of any smooth potential look like SHM with \\(k = U''(x_0)\\).",
    ],
    commonMistakes: [
      "Dropping the minus sign and losing the restoring behavior.",
      "Swapping the series/parallel combination rules.",
      "Measuring \\(x\\) from the fixed end of the spring instead of equilibrium.",
    ],
  },
  "2.9": {
    id: "2.9",
    title: "Resistive Forces",
    summary:
      "Drag opposes motion and grows with speed. Linear drag: \\(F = -bv\\); quadratic drag: \\(F = -cv^2\\). Terminal speed occurs when drag balances gravity.",
    lesson:
      "A **resistive force** opposes motion relative to a fluid (air, water). Two standard models:\n- **Linear (Stokes-type)**: \\(\\vec{F} = -b\\vec{v}\\). Applies for slow motion of small objects in viscous fluid.\n- **Quadratic (Newtonian)**: \\(\\vec{F} = -c|\\vec{v}|\\vec{v}\\). Applies for faster motion of larger objects in air.\n\nFor a falling object with linear drag, Newton's second law is\n\n$$m\\frac{dv}{dt} = mg - bv.$$\n\nThis is a first-order linear ODE. **Terminal velocity** occurs when \\(dv/dt = 0\\): \\(v_T = mg/b\\). Solving with \\(v(0) = 0\\):\n\n$$v(t) = v_T\\left(1 - e^{-t/\\tau}\\right),\\quad \\tau = m/b.$$\n\nThe speed approaches \\(v_T\\) exponentially with time constant \\(\\tau\\).\n\nFor quadratic drag, \\(m\\,dv/dt = mg - cv^2\\). Terminal speed: \\(v_T = \\sqrt{mg/c}\\). The solution involves a hyperbolic tangent: \\(v(t) = v_T\\tanh(gt/v_T)\\).\n\nAP FRQ pattern: given a drag law and initial condition, separate variables and integrate, or identify the steady state by setting \\(dv/dt = 0\\). Questions often ask for terminal velocity, time to reach some fraction of it, or position vs. time.\n\nDrag does **negative work** — it removes kinetic energy and dumps it as heat in the fluid. It's a non-conservative force; mechanical energy is not conserved when drag is present.",
    keyIdeas: [
      "Linear drag: \\(F = -bv\\); quadratic drag: \\(F = -cv^2\\).",
      "Terminal speed: set \\(dv/dt = 0\\) ⇒ \\(v_T = mg/b\\) or \\(\\sqrt{mg/c}\\).",
      "Linear-drag fall: \\(v(t) = v_T(1 - e^{-t/\\tau})\\) with \\(\\tau = m/b\\).",
      "Drag is non-conservative; mechanical energy decreases.",
    ],
    workedExample: {
      prompt:
        "A 2 kg ball falls from rest subject to linear air resistance with \\(b = 0.5\\,\\text{kg/s}\\). Find the terminal velocity and the time to reach half of it. Use \\(g = 10\\,\\text{m/s}^2\\).",
      solution:
        "\\(v_T = mg/b = 20/0.5 = 40\\,\\text{m/s}\\). From \\(v = v_T(1 - e^{-t/\\tau})\\) with \\(\\tau = m/b = 4\\,\\text{s}\\), set \\(v = v_T/2\\): \\(e^{-t/\\tau} = 1/2\\), so \\(t = \\tau\\ln 2 \\approx 2.77\\,\\text{s}\\).",
    },
    commonMistakes: [
      "Assuming drag is constant instead of velocity-dependent.",
      "Applying constant-\\(a\\) kinematics to falling-with-drag problems.",
      "Using \\(F = bv^2\\) when the problem specifies linear drag (or vice versa).",
    ],
  },
  "2.10": {
    id: "2.10",
    title: "Circular Motion",
    summary:
      "Centripetal acceleration \\(a_c = v^2/r\\) points toward the center. Real forces must supply it — \"centripetal force\" is just the net inward force.",
    lesson:
      "For an object moving along a circle of radius \\(r\\) with speed \\(v\\), the velocity direction changes continuously. The resulting **centripetal acceleration** points toward the center:\n\n$$a_c = \\frac{v^2}{r} = \\omega^2 r,\\qquad \\omega = v/r.$$\n\nNewton's second law requires a net inward force of magnitude \\(F_c = mv^2/r\\). Centripetal force is **not** a new force; it is whatever combination of real forces (tension, gravity, normal, friction) sums to the required inward total.\n\nCanonical scenarios:\n- **Horizontal circle on a string**: tension provides \\(F_c\\).\n- **Car on flat curve**: static friction provides \\(F_c\\); max speed \\(v_{\\max} = \\sqrt{\\mu_s g r}\\).\n- **Banked curve**: normal force's inward component (plus friction if needed) provides \\(F_c\\).\n- **Vertical loop**: at the top, gravity and tension both point inward; at the bottom, tension fights gravity.\n- **Orbit**: gravity is the only force, and it equals \\(mv^2/r\\).\n\nIf the motion is **non-uniform circular** (speed changing), the acceleration has both centripetal \\(a_c = v^2/r\\) and tangential \\(a_t = dv/dt\\) components; total acceleration magnitude is \\(\\sqrt{a_c^2 + a_t^2}\\).\n\nThere is **no centrifugal force** in an inertial frame — the apparent outward push you feel in a turning car is your body's inertia continuing straight while the car curves.",
    keyIdeas: [
      "\\(a_c = v^2/r = \\omega^2 r\\), always toward the center.",
      "Centripetal force is the *net* inward force, supplied by real forces.",
      "Non-uniform circular motion has tangential component \\(a_t = dv/dt\\).",
      "No centrifugal force in inertial frames.",
    ],
    workedExample: {
      prompt:
        "A 0.2 kg ball on a 0.5 m string is swung in a vertical circle. At the top, the string tension is 3 N. Find the speed there. (\\(g = 10\\,\\text{m/s}^2\\).)",
      solution:
        "At the top, both tension and weight point inward: \\(T + mg = mv^2/r\\). \\(3 + 2 = 0.2 v^2/0.5\\), so \\(v^2 = 12.5\\), \\(v \\approx 3.54\\,\\text{m/s}\\).",
    },
    commonMistakes: [
      "Writing \"centripetal force\" as a separate entry alongside real forces.",
      "Forgetting the tangential acceleration when speed changes around the circle.",
      "Using \\(v^2/r\\) as a force (it's an acceleration — multiply by \\(m\\)).",
    ],
  },

  // =========================================================================
  // UNIT 3 — WORK, ENERGY, AND POWER
  // =========================================================================
  "3.1": {
    id: "3.1",
    title: "Translational Kinetic Energy",
    summary:
      "Kinetic energy \\(K = \\tfrac{1}{2}mv^2\\). Scalar, nonnegative, frame-dependent; \\(K = p^2/(2m)\\).",
    lesson:
      "The translational kinetic energy of a point mass is\n\n$$K = \\tfrac{1}{2}mv^2 = \\frac{p^2}{2m},$$\n\na scalar (units: joules). Always nonnegative.\n\nQuadratic in speed: doubling \\(v\\) quadruples \\(K\\). That's why braking distance scales with \\(v^2\\) and high-speed collisions are disproportionately destructive.\n\nKinetic energy depends on the reference frame because \\(v\\) does. A passenger sitting on a train has \\(K = 0\\) in the train frame, \\(\\tfrac{1}{2}mv_{\\text{train}}^2\\) in the ground frame.\n\nFor a system of particles, \\(K_{\\text{total}} = \\sum \\tfrac{1}{2}m_i v_i^2\\). Using the **COM decomposition**,\n\n$$K_{\\text{total}} = \\tfrac{1}{2}M v_{\\text{COM}}^2 + K_{\\text{internal}},$$\n\nwhere \\(K_{\\text{internal}}\\) is the kinetic energy measured in the COM frame — e.g., rotational KE of a rigid body (Unit 6) or vibrational KE of an oscillating system.\n\nThe **work-energy theorem** \\(\\sum W = \\Delta K\\) (Unit 3.2) makes \\(K\\) the natural bridge between force integrals and motion.",
    keyIdeas: [
      "\\(K = \\tfrac{1}{2}mv^2 = p^2/(2m)\\).",
      "Scalar, nonnegative, frame-dependent.",
      "System \\(K\\) = COM translational \\(K\\) + internal \\(K\\).",
      "Quadratic scaling makes \\(K\\) sensitive to speed.",
    ],
    commonMistakes: [
      "Treating \\(K\\) as a vector.",
      "Assuming \\(K_{\\text{total}} = \\tfrac{1}{2}Mv_{\\text{COM}}^2\\) for an extended body (misses rotation).",
      "Using the wrong sign after a velocity reversal — \\(K\\) is always nonnegative.",
    ],
  },
  "3.2": {
    id: "3.2",
    title: "Work",
    summary:
      "Work is the line integral \\(W = \\int \\vec{F}\\cdot d\\vec{r}\\). Net work equals change in kinetic energy.",
    lesson:
      "Work done by a force on a particle moving along a path \\(\\mathcal{C}\\):\n\n$$W = \\int_{\\mathcal{C}} \\vec{F}\\cdot d\\vec{r}.$$\n\nFor a **constant** force, this reduces to \\(W = \\vec{F}\\cdot\\vec{d} = Fd\\cos\\theta\\). For a force that depends only on position, \\(W = \\int \\vec{F}(\\vec{r})\\cdot d\\vec{r}\\).\n\nGraphically, in 1D \\(W\\) is the signed area under an \\(F(x)\\) curve.\n\nWork is positive, negative, or zero:\n- \\(\\vec{F}\\) component along \\(\\vec{v}\\) ⇒ positive work (energy added).\n- Component opposite \\(\\vec{v}\\) ⇒ negative work (energy removed).\n- \\(\\vec{F}\\perp\\vec{v}\\) ⇒ zero work (centripetal, magnetic, normal on sliding surface).\n\n**Work-energy theorem**:\n\n$$W_{\\text{net}} = \\Delta K = \\tfrac{1}{2}mv_f^2 - \\tfrac{1}{2}mv_i^2.$$\n\nFor a **conservative** force there exists a potential energy \\(U(\\vec{r})\\) with \\(\\vec{F} = -\\nabla U\\) and \\(W = -\\Delta U\\). The line integral depends only on endpoints, not the path. For a **non-conservative** force (friction, drag), work depends on the path — mechanical energy is not conserved.",
    keyIdeas: [
      "\\(W = \\int \\vec{F}\\cdot d\\vec{r}\\); area under \\(F\\text{-}x\\) in 1D.",
      "Force perpendicular to motion does no work.",
      "Work-energy theorem: \\(W_{\\text{net}} = \\Delta K\\).",
      "Conservative forces: \\(\\vec{F} = -\\nabla U\\); path-independent work.",
    ],
    workedExample: {
      prompt:
        "A force \\(F(x) = 3x^2\\,\\text{N}\\) acts on a 2 kg block along \\([0,2]\\,\\text{m}\\), starting from rest. Find the work done and the final speed.",
      solution:
        "\\(W = \\int_0^2 3x^2\\,dx = [x^3]_0^2 = 8\\,\\text{J}\\). By \\(W = \\Delta K\\): \\(\\tfrac{1}{2}(2)v^2 = 8\\), so \\(v = 2\\sqrt{2}\\,\\text{m/s}\\).",
    },
    commonMistakes: [
      "Dropping \\(\\cos\\theta\\) when force and motion aren't parallel.",
      "Using a single force's work where the theorem calls for net work.",
      "Applying \\(W = F\\Delta x\\) when the force varies with position.",
    ],
  },
  "3.3": {
    id: "3.3",
    title: "Potential Energy",
    summary:
      "Conservative forces have a potential: \\(\\vec{F} = -\\nabla U\\), or in 1D \\(F = -dU/dx\\). Equilibria are extrema of \\(U\\).",
    lesson:
      "A conservative force \\(\\vec{F}\\) admits a **potential energy** function \\(U(\\vec{r})\\) such that\n\n$$\\vec{F} = -\\nabla U,\\qquad W_{\\text{cons}} = -\\Delta U.$$\n\nIn 1D: \\(F = -dU/dx\\), and \\(U(x) = -\\int F(x)\\,dx\\) (up to an additive constant).\n\nStandard forms on the AP C formula sheet:\n- **Near-Earth gravity**: \\(U_g = mgy\\).\n- **Universal gravity**: \\(U_g = -GMm/r\\) (zero at infinity).\n- **Spring**: \\(U_s = \\tfrac{1}{2}kx^2\\).\n\nEquilibria are points where \\(dU/dx = 0\\).\n- **Stable**: \\(U\\) has a minimum (\\(d^2U/dx^2 > 0\\)); small displacements produce a restoring force.\n- **Unstable**: \\(U\\) has a maximum; displacements grow.\n- **Neutral**: \\(U\\) is flat locally.\n\nAround a stable minimum at \\(x_0\\): \\(U(x) \\approx U(x_0) + \\tfrac{1}{2}U''(x_0)(x-x_0)^2\\), and small oscillations are SHM with effective spring constant \\(k = U''(x_0)\\) and angular frequency \\(\\omega = \\sqrt{U''(x_0)/m}\\).\n\n**Only conservative forces** have potentials. Friction, drag, and external pushes do not — their work becomes heat or other non-mechanical energy.",
    keyIdeas: [
      "\\(\\vec{F} = -\\nabla U\\); in 1D \\(F = -dU/dx\\).",
      "Minima of \\(U\\) are stable; maxima are unstable.",
      "\\(U_g = mgy\\), \\(U_g = -GMm/r\\), \\(U_s = \\tfrac{1}{2}kx^2\\).",
      "Small oscillations about a minimum look like SHM with \\(\\omega = \\sqrt{U''/m}\\).",
    ],
    workedExample: {
      prompt:
        "A particle has \\(U(x) = \\tfrac{1}{4}x^4 - \\tfrac{1}{2}x^2\\). Find the equilibria and their stabilities.",
      solution:
        "\\(dU/dx = x^3 - x = x(x-1)(x+1) = 0\\) at \\(x = 0, \\pm 1\\). \\(d^2U/dx^2 = 3x^2 - 1\\). At \\(x = \\pm 1\\): \\(+2 > 0\\), stable. At \\(x = 0\\): \\(-1 < 0\\), unstable.",
    },
    commonMistakes: [
      "Forgetting the minus sign in \\(F = -dU/dx\\).",
      "Assigning a potential to a non-conservative force.",
      "Picking an inconsistent zero of \\(U\\) between initial and final states.",
    ],
  },
  "3.4": {
    id: "3.4",
    title: "Conservation of Energy",
    summary:
      "When only conservative forces do work, \\(E = K + U\\) is conserved. Non-conservative work changes the mechanical energy by \\(W_{\\text{nc}}\\).",
    lesson:
      "For a system under conservative forces only,\n\n$$K_i + U_i = K_f + U_f.$$\n\nThe constant total mechanical energy \\(E = K + U\\) lets you skip force analysis and solve start-to-end directly.\n\nWith non-conservative forces (friction, drag, applied pushes/pulls):\n\n$$\\Delta E = W_{\\text{nc}}.$$\n\nFriction and drag give \\(W_{\\text{nc}} < 0\\); external pushes can give either sign.\n\nEnergy conservation is a **scalar** tool — no directions, just magnitudes and signs. It's ideal when you need only endpoints (speed at the bottom of a loop, maximum height, compression of a spring) and not the trajectory in between.\n\nOn a \\(U(x)\\) diagram with \\(E\\) marked, the classically allowed region is where \\(E \\ge U(x)\\); \\(K = E - U\\) gives the speed at each point. **Turning points** are where \\(E = U\\) — the object momentarily stops and reverses.\n\nReference-level discipline: pick one zero for gravitational PE and stick with it across every state in the problem.",
    keyIdeas: [
      "\\(E = K + U\\) is conserved under conservative forces only.",
      "Otherwise, \\(\\Delta E = W_{\\text{nc}}\\).",
      "Energy methods beat force methods whenever you only need endpoints.",
      "On \\(U(x)\\) diagrams, turning points satisfy \\(E = U\\).",
    ],
    workedExample: {
      prompt:
        "A 2 kg block slides from rest down a 3 m high frictionless ramp, then onto a horizontal surface where friction coefficient is 0.2. How far does it slide on the rough surface? (\\(g = 10\\).)",
      solution:
        "Speed at bottom: \\(mgh = \\tfrac{1}{2}mv^2 \\Rightarrow v^2 = 60\\). On the flat, friction work \\(-\\mu mg d = \\Delta K = -\\tfrac{1}{2}mv^2\\): \\(0.2\\cdot 2\\cdot 10\\cdot d = \\tfrac{1}{2}(2)(60)\\), so \\(4d = 60\\) and \\(d = 15\\,\\text{m}\\).",
    },
    commonMistakes: [
      "Applying conservation of mechanical energy when friction or drag is present.",
      "Using different reference levels for initial and final states.",
      "Forgetting that spring PE and gravitational PE can both contribute.",
    ],
  },
  "3.5": {
    id: "3.5",
    title: "Power",
    summary:
      "Power is the rate of energy transfer: \\(P = dW/dt = \\vec{F}\\cdot\\vec{v}\\). Average power is \\(W/\\Delta t\\).",
    lesson:
      "**Instantaneous power** delivered by a force:\n\n$$P = \\frac{dW}{dt} = \\vec{F}\\cdot\\vec{v}.$$\n\n**Average power** over an interval:\n\n$$\\bar{P} = \\frac{W}{\\Delta t} = \\frac{\\Delta E}{\\Delta t}.$$\n\nUnits: watt (\\(1\\,\\text{W} = 1\\,\\text{J/s}\\)).\n\nAt a constant cruising speed, the engine's power output balances drag power: \\(P_{\\text{eng}} = F_{\\text{drag}}v\\). This is why top speed is limited — if drag grows with \\(v\\) or \\(v^2\\), power grows with \\(v^2\\) or \\(v^3\\), and engines run out of delivery capacity.\n\nFor rotation (Unit 6): \\(P = \\vec{\\tau}\\cdot\\vec{\\omega}\\) — the rotational analog.\n\nFor energy storage: charging a capacitor \\(P = IV\\); charging a battery \\(P = IV\\). Same definition (work done per time), different physical context.\n\nWatch units: horsepower (\\(1\\,\\text{hp} \\approx 746\\,\\text{W}\\)) is obsolete but still appears on car spec sheets. Kilowatt-hours are units of energy (\\(1\\,\\text{kWh} = 3.6\\times 10^6\\,\\text{J}\\)), not power.",
    keyIdeas: [
      "\\(P = dW/dt = \\vec{F}\\cdot\\vec{v}\\).",
      "Average: \\(\\bar{P} = W/\\Delta t\\).",
      "At terminal speed, engine power balances drag power: \\(P_{\\text{eng}} = F_{\\text{drag}}v\\).",
      "kWh is energy (power × time), not power.",
    ],
    workedExample: {
      prompt:
        "A car travels at constant 30 m/s against a total drag of 600 N. Find the engine power output.",
      solution:
        "\\(P = Fv = 600\\cdot 30 = 18\\,000\\,\\text{W} = 18\\,\\text{kW}\\).",
    },
    commonMistakes: [
      "Confusing power (rate) with energy (quantity).",
      "Using \\(W/t\\) when force varies with time.",
      "Dropping the \\(\\cos\\theta\\) in \\(P = Fv\\cos\\theta\\).",
    ],
  },

  // =========================================================================
  // UNIT 4 — LINEAR MOMENTUM
  // =========================================================================
  "4.1": {
    id: "4.1",
    title: "Linear Momentum",
    summary:
      "Momentum \\(\\vec{p} = m\\vec{v}\\); Newton's second law in general form is \\(\\vec{F}_{\\text{net}} = d\\vec{p}/dt\\).",
    lesson:
      "Linear momentum is \\(\\vec{p} = m\\vec{v}\\) — a vector, units kg·m/s. For a system, \\(\\vec{P} = \\sum m_i\\vec{v}_i = M\\vec{v}_{\\text{COM}}\\).\n\nNewton's second law in its primary form:\n\n$$\\vec{F}_{\\text{net}} = \\frac{d\\vec{p}}{dt}.$$\n\nFor constant mass this collapses to \\(\\vec{F} = m\\vec{a}\\). For variable-mass systems (rockets, raindrops), the product-rule version governs: \\(\\vec{F} = m\\dot{\\vec{v}} + \\vec{v}\\dot{m}\\).\n\nMomentum and kinetic energy:\n\n$$K = \\frac{p^2}{2m}.$$\n\nHandy when you know \\(p\\) but not \\(v\\), e.g., after an impulse calculation.\n\nComponent decomposition: \\(p_x\\) and \\(p_y\\) are independent. In 2D problems, always use components — conservation applies axis-by-axis.\n\nBecause of \\(\\vec{F} = d\\vec{p}/dt\\), any statement about force is equivalently a statement about momentum change. Collisions, explosions, and thrust all are cleanest viewed through momentum.",
    keyIdeas: [
      "\\(\\vec{p} = m\\vec{v}\\); system momentum is \\(M\\vec{v}_{\\text{COM}}\\).",
      "\\(\\vec{F}_{\\text{net}} = d\\vec{p}/dt\\) (always); \\(\\vec{F} = m\\vec{a}\\) (constant mass).",
      "\\(K = p^2/(2m)\\).",
      "Handle 2D via components.",
    ],
    commonMistakes: [
      "Treating momentum as a scalar.",
      "Using \\(\\vec{F} = m\\vec{a}\\) on a rocket without the \\(\\vec{v}\\dot{m}\\) term.",
      "Applying \\(K = p^2/(2m)\\) componentwise (it needs the magnitude).",
    ],
  },
  "4.2": {
    id: "4.2",
    title: "Change in Momentum and Impulse",
    summary:
      "Impulse \\(\\vec{J} = \\int\\vec{F}\\,dt = \\Delta\\vec{p}\\). Area under an \\(F\\text{-}t\\) graph equals momentum change.",
    lesson:
      "**Impulse** on a particle over a time interval:\n\n$$\\vec{J} = \\int \\vec{F}\\,dt = \\Delta \\vec{p}.$$\n\nUnits: N·s = kg·m/s (same as momentum). For a **constant** force, \\(\\vec{J} = \\vec{F}\\Delta t\\). Graphically, impulse in 1D is the signed area under \\(F(t)\\).\n\nDuring a collision, the force between the two bodies is huge but brief — integrate it and you get a manageable impulse. Crumple zones and airbags extend \\(\\Delta t\\) so the peak force \\(F \\sim \\Delta p/\\Delta t\\) drops for a fixed \\(\\Delta p\\).\n\nFor two colliding bodies, Newton's third law guarantees \\(\\vec{F}_{12} = -\\vec{F}_{21}\\) during contact, so \\(\\vec{J}_{12} = -\\vec{J}_{21}\\) and \\(\\Delta \\vec{p}_1 = -\\Delta \\vec{p}_2\\). Summing gives \\(\\Delta\\vec{P}_{\\text{total}} = 0\\) — conservation of momentum (4.3).\n\nFor a 2D problem, apply impulse component-wise: \\(J_x = \\Delta p_x\\), \\(J_y = \\Delta p_y\\). A ball hitting a wall with both tangential and normal velocity components has an impulse only perpendicular to the wall if the wall is frictionless.",
    keyIdeas: [
      "\\(\\vec{J} = \\int \\vec{F}\\,dt = \\Delta \\vec{p}\\).",
      "Constant force: \\(\\vec{J} = \\vec{F}\\Delta t\\); area under \\(F\\text{-}t\\) graph.",
      "Extending collision time reduces peak force.",
      "Pair impulses in a collision are equal and opposite by Newton's third law.",
    ],
    workedExample: {
      prompt:
        "A 0.2 kg ball moving at 10 m/s strikes a wall and rebounds at 8 m/s along the same line. Contact lasts 0.01 s. Find the average force on the ball.",
      solution:
        "Take \\(+\\) away from the wall. \\(\\Delta p = 0.2\\cdot 8 - 0.2\\cdot(-10) = 3.6\\,\\text{kg·m/s}\\). \\(F_{\\text{avg}} = \\Delta p/\\Delta t = 360\\,\\text{N}\\).",
    },
    commonMistakes: [
      "Missing the sign flip on a rebounded velocity.",
      "Treating impulse and force as interchangeable instead of force × time.",
      "Dropping the vector nature of impulse.",
    ],
  },
  "4.3": {
    id: "4.3",
    title: "Conservation of Linear Momentum",
    summary:
      "\\(\\vec{F}_{\\text{ext,net}} = 0 \\Rightarrow \\vec{P} = \\text{const}\\). Holds component-wise; ideal for short-duration collisions.",
    lesson:
      "If the net external force on a system is zero, the system's total momentum is conserved:\n\n$$\\vec{P}_i = \\vec{P}_f.$$\n\nInternal forces (between parts of the system) come in third-law pairs and cancel. Applies component-wise: if there's external force in one direction only, the perpendicular components of \\(\\vec{P}\\) are still conserved.\n\nFor a **collision**, the contact forces are typically enormous compared to external forces (gravity, friction). Over the short duration \\(\\Delta t\\), external impulses \\(\\vec{F}_{\\text{ext}}\\Delta t\\) are negligible, so momentum is effectively conserved across the collision even when weight and friction are present.\n\nTypical scenarios:\n- Gun/bullet recoil: initial \\(\\vec{P} = 0\\), final \\(m_{\\text{gun}}\\vec{v}_{\\text{gun}} + m_{\\text{bullet}}\\vec{v}_{\\text{bullet}} = 0\\).\n- Explosion: total momentum before equals total after.\n- 2D collision of pucks on ice: conserve \\(P_x\\) and \\(P_y\\) separately.\n\nMomentum conservation is **independent of** kinetic-energy conservation. All collisions with negligible external impulses conserve \\(\\vec{P}\\); only **elastic** ones also conserve \\(K\\) (4.4).",
    keyIdeas: [
      "Zero net external force ⇒ \\(\\vec{P}\\) conserved.",
      "Apply component-wise.",
      "Short collisions: external impulses negligible, so \\(\\vec{P}\\) is effectively conserved.",
      "Momentum conservation holds for all collision types; kinetic energy need not.",
    ],
    workedExample: {
      prompt:
        "A 60 kg skater at rest pushes a 40 kg friend, who moves away at 3 m/s. Find the skater's recoil speed.",
      solution:
        "Initial \\(P = 0\\). Final \\(60 v_s + 40\\cdot 3 = 0\\) ⇒ \\(v_s = -2\\,\\text{m/s}\\). The skater moves 2 m/s in the opposite direction.",
    },
    commonMistakes: [
      "Forgetting the vector nature — sign matters in 1D.",
      "Applying conservation when a significant external force acts through the interaction.",
      "Mixing up momentum and kinetic-energy conservation conditions.",
    ],
  },
  "4.4": {
    id: "4.4",
    title: "Elastic and Inelastic Collisions",
    summary:
      "All collisions conserve \\(\\vec{P}\\). Elastic also conserves \\(K\\); perfectly inelastic objects stick together.",
    lesson:
      "Classify collisions by kinetic-energy behavior:\n- **Elastic**: \\(K_i = K_f\\) (rare in macroscopic life; billiard balls approximate it).\n- **Inelastic**: \\(K_f < K_i\\); some energy goes to deformation, sound, heat.\n- **Perfectly inelastic**: objects stick together; \\(K_f\\) is the minimum allowed by momentum conservation.\n\nFor a 1D elastic collision with target 2 at rest:\n\n$$v_1' = \\frac{m_1 - m_2}{m_1 + m_2}v_1,\\qquad v_2' = \\frac{2m_1}{m_1 + m_2}v_1.$$\n\nSpecial cases:\n- Equal masses: \\(v_1' = 0\\), \\(v_2' = v_1\\) — the projectile stops, the target takes all the velocity.\n- Heavy projectile: \\(v_1'\\approx v_1\\), \\(v_2' \\approx 2v_1\\).\n- Light projectile: \\(v_1' \\approx -v_1\\), \\(v_2' \\approx 0\\) — it bounces back.\n\nFor perfectly inelastic: \\(v_f = (m_1 v_1 + m_2 v_2)/(m_1 + m_2)\\); the energy lost is \\(\\Delta K = K_i - K_f\\).\n\nIn the **COM frame**, kinetic energy splits cleanly: \\(K = \\tfrac{1}{2}M v_{\\text{COM}}^2 + K_{\\text{int}}\\). Elastic collisions preserve \\(K_{\\text{int}}\\); perfectly inelastic ones set \\(K_{\\text{int}} = 0\\) — hence \"minimum KE\" in the lab frame too.",
    keyIdeas: [
      "All collisions conserve \\(\\vec{P}\\) (if external impulses are negligible).",
      "Elastic: \\(K\\) also conserved.",
      "Perfectly inelastic: objects stick; \\(K\\) loss is maximized.",
      "Equal-mass elastic: projectile stops, target speeds off.",
    ],
    workedExample: {
      prompt:
        "A 2 kg block moving at 5 m/s collides and sticks to a 3 kg block at rest. Find the final speed and the energy lost.",
      solution:
        "Momentum: \\(2\\cdot 5 = 5v_f\\), so \\(v_f = 2\\,\\text{m/s}\\). \\(K_i = 25\\,\\text{J}\\), \\(K_f = \\tfrac{1}{2}(5)(4) = 10\\,\\text{J}\\). Energy lost: \\(15\\,\\text{J}\\).",
    },
    commonMistakes: [
      "Applying \\(K\\) conservation to an inelastic collision.",
      "Forgetting \"perfectly inelastic\" means they stick.",
      "Swapping initial and final values when writing conservation.",
    ],
  },

  // =========================================================================
  // UNIT 5 — TORQUE AND ROTATIONAL DYNAMICS
  // =========================================================================
  "5.1": {
    id: "5.1",
    title: "Rotational Kinematics",
    summary:
      "\\(\\omega = d\\theta/dt\\), \\(\\alpha = d\\omega/dt\\). Integrate to get \\(\\omega(t)\\) and \\(\\theta(t)\\); constant \\(\\alpha\\) reproduces the rotational kinematic equations.",
    lesson:
      "For rotation about a fixed axis, use angular variables:\n- **Angular position** \\(\\theta\\) (rad).\n- **Angular velocity** \\(\\omega = d\\theta/dt\\) (rad/s).\n- **Angular acceleration** \\(\\alpha = d\\omega/dt = d^2\\theta/dt^2\\) (rad/s²).\n\nIntegrate \\(\\alpha(t)\\) to get \\(\\omega(t)\\) and then \\(\\theta(t)\\); initial conditions fix the constants. For **constant \\(\\alpha\\)**:\n\n$$\\omega = \\omega_0 + \\alpha t,\\quad \\theta = \\theta_0 + \\omega_0 t + \\tfrac{1}{2}\\alpha t^2,\\quad \\omega^2 = \\omega_0^2 + 2\\alpha\\Delta\\theta.$$\n\nDirect analog of linear kinematics with \\(x\\to\\theta\\), \\(v\\to\\omega\\), \\(a\\to\\alpha\\).\n\nAlways use **radians** in physics calculations. One revolution = \\(2\\pi\\) rad. Conversions: \\(1\\,\\text{rev/min} = \\pi/30\\,\\text{rad/s}\\).\n\nAngular quantities are vectors in 3D via the right-hand rule (thumb along \\(\\vec{\\omega}\\)), but for a fixed rotation axis (AP C typical) you can treat them as signed scalars: CCW positive, CW negative.",
    keyIdeas: [
      "\\(\\omega = d\\theta/dt\\); \\(\\alpha = d\\omega/dt\\).",
      "Constant \\(\\alpha\\) ⇒ angular-kinematic equations (direct analog of linear).",
      "Always radians.",
      "Sign encodes direction of rotation.",
    ],
    workedExample: {
      prompt:
        "A wheel has \\(\\alpha(t) = 6t\\,\\text{rad/s}^2\\) with \\(\\omega(0) = 2\\,\\text{rad/s}\\). Find \\(\\omega(2)\\) and the total angle rotated from \\(t = 0\\) to \\(t = 2\\).",
      solution:
        "\\(\\omega(t) = 2 + 3t^2\\). \\(\\omega(2) = 14\\,\\text{rad/s}\\). \\(\\theta(t) - \\theta(0) = \\int_0^2 (2 + 3t^2)\\,dt = [2t + t^3]_0^2 = 12\\,\\text{rad}\\).",
    },
    commonMistakes: [
      "Using degrees in angular kinematic equations.",
      "Applying constant-\\(\\alpha\\) formulas when \\(\\alpha\\) varies.",
      "Dropping constants of integration.",
    ],
  },
  "5.2": {
    id: "5.2",
    title: "Connecting Linear and Rotational Motion",
    summary:
      "For a point at radius \\(r\\): \\(v = r\\omega\\), \\(a_t = r\\alpha\\), \\(a_c = r\\omega^2\\). Rolling without slipping gives \\(v_{\\text{COM}} = R\\omega\\).",
    lesson:
      "A point at radius \\(r\\) from the rotation axis has:\n- Tangential speed \\(v = r\\omega\\).\n- Tangential acceleration \\(a_t = r\\alpha\\).\n- Centripetal (radial) acceleration \\(a_c = v^2/r = r\\omega^2\\).\n\nTotal linear acceleration is the vector sum: magnitude \\(\\sqrt{a_t^2 + a_c^2}\\), direction somewhere between tangential and radially inward.\n\nFor a body **rolling without slipping** along a straight line, the rolling constraint is\n\n$$v_{\\text{COM}} = R\\omega,\\qquad a_{\\text{COM}} = R\\alpha.$$\n\nAt any instant, the contact point of the wheel is momentarily at rest relative to the ground — a surprising but important fact. The topmost point moves at \\(2v_{\\text{COM}}\\). A point on the rim traces a cycloid.\n\nThis constraint couples rotational and translational equations of motion. For a wheel rolling down a ramp, you apply \\(F = ma\\) to the COM and \\(\\tau = I\\alpha\\) to the rotation, then close the system with \\(a = R\\alpha\\). Solving gives \\(a = g\\sin\\theta/(1 + I/(MR^2))\\).",
    keyIdeas: [
      "\\(v = r\\omega\\), \\(a_t = r\\alpha\\), \\(a_c = r\\omega^2\\).",
      "Rolling no-slip: \\(v_{\\text{COM}} = R\\omega\\), \\(a_{\\text{COM}} = R\\alpha\\).",
      "Contact point is instantaneously at rest.",
      "Couple rotational \\(\\tau = I\\alpha\\) with translational \\(F = ma\\) via the rolling constraint.",
    ],
    workedExample: {
      prompt:
        "A 0.3 m radius wheel rolls without slipping at 6 m/s. Find \\(\\omega\\) and the speed of the topmost point.",
      solution:
        "\\(\\omega = v/R = 20\\,\\text{rad/s}\\). Top speed \\(= 2v = 12\\,\\text{m/s}\\).",
    },
    commonMistakes: [
      "Using \\(v = r\\omega\\) with \\(\\omega\\) in rev/s or deg/s.",
      "Forgetting the centripetal component when both \\(\\omega\\) and \\(\\alpha\\) are nonzero.",
      "Applying the rolling constraint when the body is slipping.",
    ],
  },
  "5.3": {
    id: "5.3",
    title: "Torque",
    summary:
      "\\(\\vec{\\tau} = \\vec{r}\\times\\vec{F}\\). Magnitude \\(\\tau = rF\\sin\\theta = r_\\perp F\\). Torque depends on the chosen axis.",
    lesson:
      "Torque about an axis through a point \\(O\\):\n\n$$\\vec{\\tau}_O = \\vec{r}\\times\\vec{F},$$\n\nwhere \\(\\vec{r}\\) is the position of the force's point of application relative to \\(O\\). Magnitude: \\(\\tau = rF\\sin\\theta\\). Equivalently, \\(\\tau = r_\\perp F\\) (perpendicular distance times force) or \\(\\tau = r F_\\perp\\) (distance times perpendicular component).\n\nThe **lever arm** \\(r_\\perp\\) is the perpendicular distance from the axis to the line along which the force acts. A force directed along \\(\\vec{r}\\) produces zero torque.\n\nSign convention for fixed-axis (2D) problems: CCW positive, CW negative. Direction for 3D: right-hand rule applied to \\(\\vec{r}\\times\\vec{F}\\).\n\nTorque depends on the chosen axis — a force about a nearby pivot produces a different torque than about a far one. Torques from different forces about the **same axis** add algebraically.\n\nFor an extended body, the torque from gravity can be computed as if the weight acts at the center of mass: \\(\\vec{\\tau}_{\\text{grav}} = \\vec{r}_{\\text{COM}}\\times M\\vec{g}\\). This is an indispensable shortcut for statics problems.",
    keyIdeas: [
      "\\(\\vec{\\tau} = \\vec{r}\\times\\vec{F}\\); magnitude \\(r_\\perp F\\) or \\(rF\\sin\\theta\\).",
      "Depends on chosen axis.",
      "Sign convention: CCW \\(+\\), CW \\(-\\).",
      "Gravity torque on extended body acts through the COM.",
    ],
    workedExample: {
      prompt:
        "A 5 N force is applied at 60° from the rod at a point 0.4 m from the pivot. Find the torque about the pivot.",
      solution:
        "\\(\\tau = rF\\sin\\theta = 0.4\\cdot 5\\cdot\\sin 60^\\circ \\approx 1.73\\,\\text{N·m}\\).",
    },
    commonMistakes: [
      "Using full distance instead of perpendicular distance.",
      "Dropping \\(\\sin\\theta\\) when force isn't perpendicular to \\(\\vec{r}\\).",
      "Mixing sign conventions across parts of a problem.",
    ],
  },
  "5.4": {
    id: "5.4",
    title: "Rotational Inertia",
    summary:
      "\\(I = \\int r^2\\,dm\\) measures resistance to angular acceleration about an axis. Parallel-axis theorem: \\(I = I_{\\text{COM}} + Md^2\\).",
    lesson:
      "The **rotational inertia** (moment of inertia) about an axis:\n\n$$I = \\sum_i m_i r_i^2 = \\int r^2\\,dm,$$\n\nwhere \\(r\\) is the perpendicular distance from the axis. Units: kg·m².\n\n**Standard shapes** (about axis through COM):\n- Thin hoop, perpendicular axis through center: \\(I = MR^2\\).\n- Solid disk / cylinder, perpendicular axis through center: \\(I = \\tfrac{1}{2}MR^2\\).\n- Thin rod, perpendicular axis through center: \\(I = \\tfrac{1}{12}ML^2\\).\n- Thin rod, perpendicular axis through end: \\(I = \\tfrac{1}{3}ML^2\\).\n- Solid sphere: \\(I = \\tfrac{2}{5}MR^2\\).\n- Thin spherical shell: \\(I = \\tfrac{2}{3}MR^2\\).\n\n**Parallel-axis theorem**: if \\(I_{\\text{COM}}\\) is the moment about an axis through the COM, then about any parallel axis a distance \\(d\\) away,\n\n$$I = I_{\\text{COM}} + Md^2.$$\n\n**Perpendicular-axis theorem** (for thin planar laminae): \\(I_z = I_x + I_y\\).\n\nTo compute \\(I\\) for a continuous body: (1) choose a coordinate adapted to the axis, (2) pick a mass element \\(dm = \\rho\\,dV\\) (or \\(\\lambda\\,dx\\), \\(\\sigma\\,dA\\)), (3) evaluate \\(\\int r^2\\,dm\\).",
    keyIdeas: [
      "\\(I = \\int r^2\\,dm\\); depends on the chosen axis.",
      "Hoop \\(MR^2\\); disk \\(\\tfrac{1}{2}MR^2\\); solid sphere \\(\\tfrac{2}{5}MR^2\\).",
      "Parallel-axis theorem: \\(I = I_{\\text{COM}} + Md^2\\).",
      "Mass far from axis contributes more than mass close (via \\(r^2\\)).",
    ],
    workedExample: {
      prompt:
        "Find the moment of inertia of a uniform rod of mass \\(M\\) and length \\(L\\) about an axis through one end, perpendicular to the rod.",
      solution:
        "\\(\\lambda = M/L\\). \\(I = \\int_0^L x^2\\lambda\\,dx = \\lambda L^3/3 = ML^2/3\\). (Check: parallel axis from COM gives \\(\\tfrac{1}{12}ML^2 + M(L/2)^2 = \\tfrac{1}{3}ML^2\\).)",
    },
    commonMistakes: [
      "Using a COM formula when the axis isn't through the COM.",
      "Summing \\(mr\\) instead of \\(mr^2\\).",
      "Mixing up hoop vs. disk vs. solid-sphere formulas.",
    ],
  },
  "5.5": {
    id: "5.5",
    title: "Rotational Equilibrium",
    summary:
      "A rigid body is in rotational equilibrium when \\(\\sum \\vec{\\tau} = 0\\) about every axis. Combine with \\(\\sum \\vec{F} = 0\\) for full static equilibrium.",
    lesson:
      "A rigid body has **rotational equilibrium** when its angular acceleration is zero: \\(\\sum \\vec{\\tau} = 0\\) about any axis. Combined with translational equilibrium \\(\\sum \\vec{F} = 0\\), this is **static equilibrium**.\n\nSolution recipe:\n1. Draw an extended FBD showing each force at its point of application.\n2. Choose a convenient axis — usually one that eliminates an unknown by passing through its line of action.\n3. Write \\(\\sum F_x = 0\\), \\(\\sum F_y = 0\\), \\(\\sum \\tau = 0\\) about the chosen axis.\n4. Solve the linear system.\n\nAxis-choice trick: placing the axis at an unknown pivot force eliminates that force from the torque equation (zero lever arm). This lets you solve for the remaining unknowns first and back-substitute for the pivot reaction.\n\nGravity always acts at the COM of a rigid body in a uniform gravitational field — use this for beams, ladders, see-saws.\n\nTypical AP FRQ: a uniform beam pinned at one end with a cable at the other. Compute the cable tension and pin forces using the three equilibrium equations.",
    keyIdeas: [
      "\\(\\sum \\vec{\\tau} = 0\\) for rotational equilibrium.",
      "Combine with \\(\\sum \\vec{F} = 0\\) for static equilibrium.",
      "Choose the axis cleverly to eliminate unknowns.",
      "Gravity on a rigid body acts at the COM.",
    ],
    workedExample: {
      prompt:
        "A uniform 3 m beam of weight 40 N is supported by a pin at its left end and by a vertical rope at its right end. Find the rope tension.",
      solution:
        "About the pin: \\(T(3) - 40(1.5) = 0 \\Rightarrow T = 20\\,\\text{N}\\).",
    },
    commonMistakes: [
      "Using different axes for different forces in a single equation.",
      "Forgetting that the force through the pivot has zero torque about the pivot.",
      "Mixing CCW and CW signs within one torque sum.",
    ],
  },
  "5.6": {
    id: "5.6",
    title: "Newton's Second Law in Rotational Form",
    summary:
      "\\(\\sum \\vec{\\tau} = I\\vec{\\alpha}\\) about a fixed axis; equivalently \\(\\vec{\\tau} = d\\vec{L}/dt\\). Couple with \\(F = ma\\) for rolling bodies.",
    lesson:
      "Newton's second law for a rigid body rotating about a fixed axis:\n\n$$\\sum \\tau = I\\alpha.$$\n\nDirect rotational analog of \\(F = ma\\). For general motion (not fixed axis), the more fundamental statement is\n\n$$\\vec{\\tau}_{\\text{ext}} = \\frac{d\\vec{L}}{dt},$$\n\nwith \\(\\vec{L} = I\\vec{\\omega}\\) for a rigid body (Unit 6.3).\n\nFor a body rolling without slipping, pair this with translational \\(\\sum F = ma_{\\text{COM}}\\) and the constraint \\(a_{\\text{COM}} = R\\alpha\\). Three equations, three unknowns (acceleration, angular acceleration, friction, or tension) — solve simultaneously.\n\nStandard result for a body with \\(I = \\beta MR^2\\) rolling down an incline at angle \\(\\theta\\):\n\n$$a = \\frac{g\\sin\\theta}{1 + \\beta}.$$\n\nHoop (\\(\\beta = 1\\)) is slowest; solid sphere (\\(\\beta = 2/5\\)) is fastest.\n\nFor a pulley with mass, torque \\(\\sum\\tau = I\\alpha\\) makes the two side-tensions differ: \\(T_1 - T_2 = I\\alpha/R\\). The standard Atwood machine with a massless pulley is the \\(I \\to 0\\) limit.",
    keyIdeas: [
      "\\(\\sum \\tau = I\\alpha\\) about a fixed axis; \\(\\tau = dL/dt\\) in general.",
      "Couple with \\(F = ma\\) for rolling problems via \\(a = R\\alpha\\).",
      "Rolling down incline: \\(a = g\\sin\\theta/(1 + I/(MR^2))\\).",
      "Massive pulley ⇒ tensions on the two sides differ.",
    ],
    workedExample: {
      prompt:
        "A 2 kg, 0.5 m-radius solid disk has a 6 N tangential force applied at its edge. Find its angular acceleration.",
      solution:
        "\\(I = \\tfrac{1}{2}MR^2 = 0.25\\,\\text{kg·m}^2\\). \\(\\tau = RF = 3\\,\\text{N·m}\\). \\(\\alpha = \\tau/I = 12\\,\\text{rad/s}^2\\).",
    },
    commonMistakes: [
      "Applying linear \\(F = ma\\) to a rotation problem.",
      "Forgetting the rolling constraint when coupling translational and rotational equations.",
      "Using \\(I\\) about the wrong axis (COM vs. contact point).",
    ],
  },

  // =========================================================================
  // UNIT 6 — ENERGY AND MOMENTUM OF ROTATING SYSTEMS
  // =========================================================================
  "6.1": {
    id: "6.1",
    title: "Rotational Kinetic Energy",
    summary:
      "\\(K_{\\text{rot}} = \\tfrac{1}{2}I\\omega^2\\). A rolling body has both translational and rotational KE: \\(K = \\tfrac{1}{2}Mv^2 + \\tfrac{1}{2}I\\omega^2\\).",
    lesson:
      "Rotational kinetic energy of a rigid body:\n\n$$K_{\\text{rot}} = \\tfrac{1}{2}I\\omega^2.$$\n\nScalar, nonnegative, direct analog of \\(\\tfrac{1}{2}mv^2\\).\n\nFor a body rolling without slipping, kinetic energy decomposes as\n\n$$K = \\tfrac{1}{2}Mv_{\\text{COM}}^2 + \\tfrac{1}{2}I\\omega^2 = \\tfrac{1}{2}\\left(M + \\frac{I}{R^2}\\right)v_{\\text{COM}}^2,$$\n\nusing \\(v = R\\omega\\). For a disk (\\(I = \\tfrac{1}{2}MR^2\\)): \\(K = \\tfrac{3}{4}Mv^2\\). For a hoop (\\(I = MR^2\\)): \\(K = Mv^2\\). For a solid sphere: \\(K = \\tfrac{7}{10}Mv^2\\).\n\nConsequence: when rolling down a ramp, the fraction of \\(mgh\\) going into translational KE depends on \\(I/(MR^2)\\). A hoop of the same mass and radius reaches the bottom slower than a disk, which reaches it slower than a sphere.\n\nEquivalently, the final speed from height \\(h\\) is \\(v^2 = 2gh/(1 + I/(MR^2))\\).",
    keyIdeas: [
      "\\(K_{\\text{rot}} = \\tfrac{1}{2}I\\omega^2\\).",
      "Rolling: \\(K = \\tfrac{1}{2}(M + I/R^2)v^2\\).",
      "Heavier-at-the-edge objects roll slower for the same mass and radius.",
      "Ramp speed from rest: \\(v^2 = 2gh/(1 + I/(MR^2))\\).",
    ],
    workedExample: {
      prompt:
        "A 2 kg solid sphere rolls without slipping at 3 m/s. Find its total kinetic energy.",
      solution:
        "\\(K = \\tfrac{7}{10}Mv^2 = 0.7\\cdot 2\\cdot 9 = 12.6\\,\\text{J}\\).",
    },
    commonMistakes: [
      "Forgetting rotational KE when a body rolls.",
      "Using the wrong \\(I\\) in \\(\\tfrac{1}{2}I\\omega^2\\).",
      "Double-counting by adding the COM rotation KE to rotation about COM.",
    ],
  },
  "6.2": {
    id: "6.2",
    title: "Torque and Work",
    summary:
      "Rotational work: \\(W = \\int \\tau\\,d\\theta\\). Rotational power: \\(P = \\tau\\omega\\). Rotational work-energy theorem: \\(W_{\\text{net}} = \\Delta K_{\\text{rot}}\\).",
    lesson:
      "Work done by a torque rotating a rigid body through angular displacement:\n\n$$W = \\int \\tau\\,d\\theta.$$\n\nFor **constant torque**: \\(W = \\tau\\,\\Delta\\theta\\). Graphically, work is the area under a \\(\\tau(\\theta)\\) curve.\n\nRotational power:\n\n$$P = \\frac{dW}{dt} = \\tau\\omega.$$\n\nDirect analog of \\(P = Fv\\).\n\n**Rotational work-energy theorem**:\n\n$$W_{\\text{net}} = \\Delta K_{\\text{rot}} = \\tfrac{1}{2}I\\omega_f^2 - \\tfrac{1}{2}I\\omega_i^2.$$\n\nApplies like the linear version. Combined with translational work-energy and rolling constraint, it solves full rolling problems via energy methods — often cleaner than Newton's laws.\n\nKinetic energy conservation: for rolling-without-slipping on a smooth surface, static friction does no work (contact point is at rest), so mechanical energy is conserved even though friction is present. That's the shortcut energy conservation gives you for rolling problems.",
    keyIdeas: [
      "\\(W = \\int \\tau\\,d\\theta\\); area under \\(\\tau(\\theta)\\).",
      "\\(P = \\tau\\omega\\).",
      "Rotational work-energy: \\(W_{\\text{net}} = \\Delta K_{\\text{rot}}\\).",
      "Static friction on rolling body does no work.",
    ],
    commonMistakes: [
      "Using degrees in \\(W = \\tau\\theta\\) — always radians.",
      "Applying \\(W = \\tau\\Delta\\theta\\) when torque varies.",
      "Forgetting to include rotational KE change in energy-based problems.",
    ],
  },
  "6.3": {
    id: "6.3",
    title: "Angular Momentum and Angular Impulse",
    summary:
      "\\(\\vec{L} = \\vec{r}\\times\\vec{p}\\) for a point particle, \\(\\vec{L} = I\\vec{\\omega}\\) for a rigid body. \\(\\vec{\\tau} = d\\vec{L}/dt\\); angular impulse is \\(\\int\\vec{\\tau}\\,dt\\).",
    lesson:
      "**Angular momentum**:\n- Point particle with position \\(\\vec{r}\\) and linear momentum \\(\\vec{p}\\): \\(\\vec{L} = \\vec{r}\\times\\vec{p}\\). Magnitude \\(L = rp\\sin\\theta\\).\n- Rigid body rotating about a fixed axis: \\(L = I\\omega\\) (vector along axis by right-hand rule).\n\nUnits: kg·m²/s.\n\n**Angular impulse** over a time interval:\n\n$$\\int \\vec{\\tau}\\,dt = \\Delta \\vec{L}.$$\n\nThis is the rotational Newton-II integrated, \\(\\vec{\\tau} = d\\vec{L}/dt\\).\n\nCritical: for a point particle traveling in a straight line at distance \\(b\\) (the impact parameter) from a chosen axis, \\(L = pb\\) — constant as long as no external torque acts. Even straight-line motion carries angular momentum about off-axis points.\n\nFor a rigid body translating and rotating: \\(\\vec{L}_{\\text{total}} = \\vec{L}_{\\text{orbital}} + \\vec{L}_{\\text{spin}}\\), where \\(\\vec{L}_{\\text{orbital}} = M\\vec{r}_{\\text{COM}}\\times\\vec{v}_{\\text{COM}}\\) and \\(\\vec{L}_{\\text{spin}} = I_{\\text{COM}}\\vec{\\omega}\\).\n\nNewton's second law in angular form: \\(\\sum\\vec{\\tau}_{\\text{ext}} = d\\vec{L}/dt\\). Zero net external torque ⇒ \\(\\vec{L}\\) conserved (6.4).",
    keyIdeas: [
      "\\(\\vec{L} = \\vec{r}\\times\\vec{p}\\) or \\(I\\vec{\\omega}\\).",
      "Angular impulse \\(\\int \\vec{\\tau}\\,dt = \\Delta \\vec{L}\\).",
      "\\(\\vec{\\tau} = d\\vec{L}/dt\\).",
      "Total \\(\\vec{L}\\) = orbital (COM motion) + spin (rotation about COM).",
    ],
    commonMistakes: [
      "Using \\(L = mvr\\) without the \\(\\sin\\theta\\) factor.",
      "Forgetting that angular momentum is defined relative to a chosen axis.",
      "Mixing point-particle and rigid-body formulas.",
    ],
  },
  "6.4": {
    id: "6.4",
    title: "Conservation of Angular Momentum",
    summary:
      "Zero net external torque ⇒ \\(\\vec{L}\\) conserved. \\(I_i\\omega_i = I_f\\omega_f\\); central forces conserve angular momentum about the center.",
    lesson:
      "If \\(\\sum\\vec{\\tau}_{\\text{ext}} = 0\\) about an axis, the system's angular momentum about that axis is conserved:\n\n$$\\vec{L}_i = \\vec{L}_f.$$\n\nFor a single rigid body whose \\(I\\) changes (a figure skater pulling in her arms, a diver tucking): \\(I_i\\omega_i = I_f\\omega_f\\). Decreasing \\(I\\) increases \\(\\omega\\).\n\n**Central forces** (gravity, Coulomb) produce zero torque about the force center, so orbital angular momentum is conserved. This gives **Kepler's second law**: equal areas swept in equal times.\n\nClassic scenarios:\n- Ice skater: \\(I\\) decreases when arms tuck in, \\(\\omega\\) increases. KE increases because the skater does internal work pulling in.\n- Collapsing star: \\(I\\) decreases drastically, \\(\\omega\\) increases — neutron stars spin hundreds of times per second.\n- Person jumping onto a merry-go-round: the person + platform conserve \\(\\vec{L}\\) about the rotation axis.\n- Ballistic pendulum with rotation: conserve \\(\\vec{L}\\) about the pivot, not linear momentum (pivot exerts an external force during impact).\n\nCheck carefully whether external torques are absent. Gravity exerts zero torque only if the axis passes through the COM or is parallel to \\(\\vec{g}\\).",
    keyIdeas: [
      "Zero net external torque ⇒ \\(\\vec{L}\\) conserved about that axis.",
      "\\(I_i\\omega_i = I_f\\omega_f\\) when \\(I\\) changes.",
      "Central forces conserve \\(\\vec{L}\\) about the center (Kepler II).",
      "Ballistic pendulum: conserve \\(\\vec{L}\\) about the pivot, not \\(\\vec{p}\\).",
    ],
    workedExample: {
      prompt:
        "A skater spins at 2 rev/s with \\(I_i = 5\\,\\text{kg·m}^2\\). She pulls her arms in, reducing \\(I_f = 2\\,\\text{kg·m}^2\\). Find her new angular speed.",
      solution:
        "\\(I_i\\omega_i = I_f\\omega_f\\): \\(5\\cdot 2 = 2\\omega_f\\), so \\(\\omega_f = 5\\,\\text{rev/s}\\).",
    },
    commonMistakes: [
      "Applying \\(L\\) conservation when an external torque acts.",
      "Confusing it with energy conservation — KE changes when \\(I\\) changes (internal work).",
      "Forgetting to identify the axis explicitly.",
    ],
  },
  "6.5": {
    id: "6.5",
    title: "Rolling",
    summary:
      "Rolling without slipping: \\(v = R\\omega\\), \\(a = R\\alpha\\); static friction supplies any needed torque and does no work.",
    lesson:
      "For **rolling without slipping** of a wheel of radius \\(R\\), the rolling constraint is \\(v_{\\text{COM}} = R\\omega\\), \\(a_{\\text{COM}} = R\\alpha\\). The contact point is momentarily at rest relative to the surface.\n\nThe friction at the contact is **static** (not kinetic), and can point in either direction depending on the dynamics:\n- A ball rolling down an incline: friction points **up** the incline — it's what supplies the torque to spin the ball faster.\n- A torqued wheel on flat ground: friction points **backward** relative to motion, preventing the wheel from spinning out.\n- Rolling at constant velocity on a horizontal surface: no friction is needed; the rolling constraint is already satisfied.\n\nBecause the contact point doesn't move, static friction does **no work**. Mechanical energy is conserved even in the presence of friction, which is the computational shortcut behind rolling-with-energy problems.\n\nFor a body with \\(I = \\beta MR^2\\):\n- Acceleration down an incline: \\(a = g\\sin\\theta/(1 + \\beta)\\).\n- Speed at the bottom after descent \\(h\\): \\(v^2 = 2gh/(1 + \\beta)\\).\n\nSlipping is a separate regime: contact point moves, friction is kinetic, energy is dissipated, and \\(v \\ne R\\omega\\).",
    keyIdeas: [
      "Rolling no-slip: \\(v = R\\omega\\), \\(a = R\\alpha\\).",
      "Contact point instantaneously at rest; friction is static.",
      "Static friction does no work on a rolling body.",
      "Ramp acceleration: \\(g\\sin\\theta/(1 + I/(MR^2))\\).",
    ],
    commonMistakes: [
      "Treating rolling friction as kinetic.",
      "Assuming friction direction without checking the constraint.",
      "Losing mechanical energy to friction on a rolling body (it doesn't dissipate as heat when no-slip).",
    ],
  },
  "6.6": {
    id: "6.6",
    title: "Motion of Orbiting Satellites",
    summary:
      "Circular orbit: \\(v = \\sqrt{GM/r}\\), \\(T^2 \\propto r^3\\). Bound orbits have \\(E = -GMm/(2r)\\). Elliptical orbits conserve \\(L\\) and \\(E\\).",
    lesson:
      "For a satellite in a **circular orbit** of radius \\(r\\) about a body of mass \\(M\\), gravity supplies the centripetal force:\n\n$$\\frac{GMm}{r^2} = \\frac{mv^2}{r}\\Rightarrow v = \\sqrt{\\frac{GM}{r}}.$$\n\nPeriod: \\(T = 2\\pi r/v = 2\\pi\\sqrt{r^3/(GM)}\\) — **Kepler's third law** \\(T^2 \\propto r^3\\).\n\nEnergies (reference \\(U = 0\\) at infinity):\n- \\(U = -GMm/r\\).\n- \\(K = \\tfrac{1}{2}mv^2 = GMm/(2r)\\).\n- Total: \\(E = K + U = -GMm/(2r)\\) — **always negative** for bound orbits.\n\nCounterintuitive: higher orbit means lower speed. To speed up, a satellite must drop to a lower orbit (paradoxically, firing the engines forward to gain energy causes the satellite to climb to a slower orbit).\n\nEscape speed from radius \\(R\\): \\(v_{\\text{esc}} = \\sqrt{2GM/R}\\) — the speed at which \\(E = 0\\) and the object just barely reaches infinity.\n\n**Elliptical orbits**: conserve both energy and angular momentum. Kepler's laws:\n1. Orbits are ellipses with the central body at a focus.\n2. Equal areas swept in equal times (from \\(L\\) conservation).\n3. \\(T^2 \\propto a^3\\) with \\(a\\) the semi-major axis, and total energy \\(E = -GMm/(2a)\\).\n\nAt perihelion (closest approach), \\(v\\) is maximum; at aphelion, minimum. Conservation of \\(L\\): \\(v_p r_p = v_a r_a\\).",
    keyIdeas: [
      "Circular orbit: \\(v = \\sqrt{GM/r}\\); \\(T^2 \\propto r^3\\).",
      "Bound energy: \\(E = -GMm/(2r)\\); escape speed \\(\\sqrt{2GM/R}\\).",
      "Elliptical: conserve \\(E\\) and \\(L\\); \\(v_p r_p = v_a r_a\\); \\(E = -GMm/(2a)\\).",
      "Kepler II is angular-momentum conservation.",
    ],
    workedExample: {
      prompt:
        "A satellite orbits Earth at altitude \\(R_E\\). By what factor does its orbital speed differ from low-Earth orbit?",
      solution:
        "\\(v \\propto 1/\\sqrt{r}\\). At \\(r = 2R_E\\): \\(v_{\\text{high}} = v_{\\text{low}}/\\sqrt{2}\\) — about 0.707 times the low-orbit speed.",
    },
    commonMistakes: [
      "Using \\(mg\\) instead of \\(GMm/r^2\\) at high altitude.",
      "Dropping the minus sign on \\(U_g\\).",
      "Thinking \"higher orbit = faster\" — it's the opposite.",
    ],
  },

  // =========================================================================
  // UNIT 7 — OSCILLATIONS
  // =========================================================================
  "7.1": {
    id: "7.1",
    title: "Defining Simple Harmonic Motion (SHM)",
    summary:
      "SHM is motion under a linear restoring force: \\(m\\ddot{x} = -kx\\). Solutions are sinusoidal with \\(\\omega = \\sqrt{k/m}\\).",
    lesson:
      "**Simple harmonic motion** arises whenever the net force on an object is proportional to its displacement from equilibrium and directed back toward equilibrium:\n\n$$F = -kx.$$\n\nNewton's second law gives the **SHM differential equation**:\n\n$$m\\ddot{x} + kx = 0,\\qquad \\ddot{x} + \\omega^2 x = 0,\\quad \\omega = \\sqrt{k/m}.$$\n\nSolutions are linear combinations of \\(\\cos(\\omega t)\\) and \\(\\sin(\\omega t)\\), packaged as\n\n$$x(t) = A\\cos(\\omega t + \\phi),$$\n\nwhere amplitude \\(A\\) and phase \\(\\phi\\) are fixed by initial conditions \\(x(0)\\) and \\(\\dot{x}(0)\\).\n\nExamples:\n- Mass on a spring: \\(\\omega = \\sqrt{k/m}\\).\n- Simple pendulum (small angle): restoring force \\(\\approx -(mg/L)s\\), so \\(\\omega = \\sqrt{g/L}\\).\n- Physical pendulum: \\(\\omega = \\sqrt{MgL/I}\\) with \\(L\\) distance from pivot to COM and \\(I\\) moment about the pivot.\n- LC circuit (E&M): \\(\\omega = 1/\\sqrt{LC}\\).\n\nThe SHM equation is the universal small-oscillation behavior near a stable equilibrium: expand \\(U(x)\\) to second order, and you recover the spring-like restoring force with \\(k_{\\text{eff}} = U''(x_0)\\).",
    keyIdeas: [
      "SHM requires a linear restoring force: \\(F = -kx\\).",
      "Differential equation: \\(\\ddot{x} + \\omega^2 x = 0\\) with \\(\\omega = \\sqrt{k/m}\\).",
      "General solution: \\(x(t) = A\\cos(\\omega t + \\phi)\\).",
      "Small oscillations about any stable minimum look like SHM.",
    ],
    commonMistakes: [
      "Calling motion SHM when the restoring force isn't linear in \\(x\\).",
      "Mixing up \\(\\omega\\) for spring vs. pendulum vs. physical pendulum.",
      "Forgetting that the pendulum result uses the small-angle approximation.",
    ],
  },
  "7.2": {
    id: "7.2",
    title: "Frequency and Period of SHM",
    summary:
      "Mass-spring: \\(T = 2\\pi\\sqrt{m/k}\\). Simple pendulum: \\(T = 2\\pi\\sqrt{L/g}\\). Physical pendulum: \\(T = 2\\pi\\sqrt{I/(MgL)}\\). Period is amplitude-independent.",
    lesson:
      "For SHM, period and frequency are amplitude-independent — a feature unique to linear restoring forces.\n\nFormulas (all derivable from \\(\\omega = \\sqrt{\\text{restoring strength}/\\text{inertia}}\\)):\n\n- **Mass-spring**: \\(\\omega = \\sqrt{k/m}\\), \\(T = 2\\pi\\sqrt{m/k}\\).\n- **Simple pendulum** (small angles): \\(\\omega = \\sqrt{g/L}\\), \\(T = 2\\pi\\sqrt{L/g}\\). Notice: mass drops out.\n- **Physical pendulum** (rigid body pivoting in gravity, COM at distance \\(L\\) from pivot, \\(I\\) about pivot): \\(\\omega = \\sqrt{MgL/I}\\), \\(T = 2\\pi\\sqrt{I/(MgL)}\\).\n- **Torsional oscillator** (object on a torsion spring \\(\\kappa\\)): \\(\\omega = \\sqrt{\\kappa/I}\\).\n\nRelation to angular frequency: \\(\\omega = 2\\pi f = 2\\pi/T\\).\n\nLarge-amplitude pendulums are **not** SHM — the period increases with amplitude because \\(\\sin\\theta > \\theta\\) is a bad approximation beyond a few degrees. The exact period involves an elliptic integral.\n\nAmplitude independence (for genuine SHM) is why mechanical clocks keep time — the period of a small oscillation doesn't care about how hard you wind the spring.",
    keyIdeas: [
      "\\(T = 2\\pi\\sqrt{m/k}\\) for springs.",
      "\\(T = 2\\pi\\sqrt{L/g}\\) for simple pendulum (small angles).",
      "\\(T = 2\\pi\\sqrt{I/(MgL)}\\) for physical pendulum.",
      "SHM period is amplitude-independent.",
    ],
    workedExample: {
      prompt:
        "A physical pendulum is a uniform rod of mass 0.5 kg and length 1 m, pivoted at one end. Find its period. (\\(g = 9.8\\,\\text{m/s}^2\\).)",
      solution:
        "\\(I = \\tfrac{1}{3}ML^2 = \\tfrac{1}{3}(0.5)(1) = 1/6\\,\\text{kg·m}^2\\). \\(L_{\\text{COM}} = 0.5\\,\\text{m}\\). \\(T = 2\\pi\\sqrt{I/(MgL_{\\text{COM}})} = 2\\pi\\sqrt{(1/6)/(0.5\\cdot 9.8\\cdot 0.5)} \\approx 1.64\\,\\text{s}\\).",
    },
    commonMistakes: [
      "Including mass in the simple-pendulum period.",
      "Using the simple-pendulum formula when the mass distribution matters (physical pendulum).",
      "Introducing amplitude dependence where there is none (genuine SHM).",
    ],
  },
  "7.3": {
    id: "7.3",
    title: "Representing and Analyzing SHM",
    summary:
      "Position, velocity, acceleration are sinusoidal with amplitudes \\(A, A\\omega, A\\omega^2\\). \\(v\\) leads \\(x\\) by 90°; \\(a\\) is 180° out of phase with \\(x\\).",
    lesson:
      "From \\(x(t) = A\\cos(\\omega t + \\phi)\\):\n\n- \\(v(t) = \\dot{x} = -A\\omega\\sin(\\omega t + \\phi)\\).\n- \\(a(t) = \\ddot{x} = -A\\omega^2\\cos(\\omega t + \\phi) = -\\omega^2 x(t)\\).\n\nAmplitudes: \\(x_{\\max} = A\\); \\(v_{\\max} = A\\omega\\); \\(a_{\\max} = A\\omega^2\\).\n\nPhase relations:\n- \\(v\\) leads \\(x\\) by \\(\\pi/2\\): \\(v = 0\\) at turning points \\(x = \\pm A\\); \\(|v|\\) is max at \\(x = 0\\).\n- \\(a\\) is \\(\\pi\\) out of phase with \\(x\\): acceleration always points back toward equilibrium.\n\nOn a single time axis, sketch \\(x\\) as a cosine, \\(v\\) as a negative sine, \\(a\\) as a negative cosine. All three have the same period \\(T\\); amplitudes grow by a factor of \\(\\omega\\) each step.\n\nEnergy diagram: \\(U(x) = \\tfrac{1}{2}kx^2\\) is a parabola. The horizontal line \\(E = \\tfrac{1}{2}kA^2\\) intersects \\(U\\) at the turning points. At any \\(x\\): \\(K = E - U\\), so \\(v^2 = \\omega^2(A^2 - x^2)\\).\n\nFor FRQs: given \\(x(t)\\) or the ODE plus initial conditions, extract \\(A\\), \\(\\omega\\), \\(\\phi\\). A common twist: the problem hands you \\(x(0)\\) and \\(v(0)\\), and you need to solve two equations for \\(A\\) and \\(\\phi\\).",
    keyIdeas: [
      "\\(x_{\\max} = A\\); \\(v_{\\max} = A\\omega\\); \\(a_{\\max} = A\\omega^2\\).",
      "\\(v\\) leads \\(x\\) by 90°; \\(a\\) is opposite in sign to \\(x\\).",
      "\\(v^2 = \\omega^2(A^2 - x^2)\\).",
      "Determine \\(A\\) and \\(\\phi\\) from initial conditions.",
    ],
    commonMistakes: [
      "Mixing up \\(A\\), \\(A\\omega\\), \\(A\\omega^2\\).",
      "Getting phase relations reversed.",
      "Using degrees instead of radians inside the trig functions.",
    ],
  },
  "7.4": {
    id: "7.4",
    title: "Energy of Simple Harmonic Oscillators",
    summary:
      "Total energy is \\(E = \\tfrac{1}{2}kA^2\\), constant in time. \\(K\\) and \\(U\\) oscillate between 0 and \\(E\\) at twice the motion's frequency.",
    lesson:
      "For a mass on a spring in SHM:\n- \\(U(t) = \\tfrac{1}{2}kx^2 = \\tfrac{1}{2}kA^2\\cos^2(\\omega t + \\phi)\\).\n- \\(K(t) = \\tfrac{1}{2}mv^2 = \\tfrac{1}{2}kA^2\\sin^2(\\omega t + \\phi)\\) (using \\(m\\omega^2 = k\\)).\n- Total: \\(E = K + U = \\tfrac{1}{2}kA^2\\) — constant.\n\nConsequences:\n- At turning points \\(x = \\pm A\\): \\(v = 0\\), all energy is potential.\n- At equilibrium \\(x = 0\\): \\(v = v_{\\max} = A\\omega\\), all energy is kinetic.\n- At any \\(x\\): \\(K = E - U\\), so \\(v(x) = \\omega\\sqrt{A^2 - x^2}\\).\n\nAverage energies over a period: \\(\\langle K\\rangle = \\langle U\\rangle = \\tfrac{1}{2}E\\). They exchange at frequency \\(2\\omega\\) — twice the motion's frequency — because both contain \\(\\cos^2\\) / \\(\\sin^2\\) terms.\n\nEnergy methods are often the fastest way to find \\(v_{\\max}\\), amplitude from given \\(v(x_0)\\), or the speed at a particular displacement. Bypasses the trig of the full \\(x(t)\\) solution.\n\nFor other SHM systems (pendulum, physical pendulum) the energy has an analogous split: kinetic plus a harmonic-like potential expanded about the minimum.",
    keyIdeas: [
      "\\(E = \\tfrac{1}{2}kA^2\\) is constant.",
      "All KE at equilibrium; all PE at turning points.",
      "\\(v(x) = \\omega\\sqrt{A^2 - x^2}\\).",
      "\\(\\langle K\\rangle = \\langle U\\rangle = E/2\\); energies exchange at frequency \\(2\\omega\\).",
    ],
    workedExample: {
      prompt:
        "A mass \\(m = 1\\,\\text{kg}\\) on a spring \\(k = 100\\,\\text{N/m}\\) oscillates with amplitude 0.2 m. Find \\(v_{\\max}\\) and the speed at \\(x = 0.1\\,\\text{m}\\).",
      solution:
        "\\(E = \\tfrac{1}{2}(100)(0.04) = 2\\,\\text{J}\\). \\(v_{\\max} = \\sqrt{2E/m} = 2\\,\\text{m/s}\\). At \\(x = 0.1\\): \\(U = \\tfrac{1}{2}(100)(0.01) = 0.5\\,\\text{J}\\), \\(K = 1.5\\,\\text{J}\\), \\(v = \\sqrt{3}\\approx 1.73\\,\\text{m/s}\\).",
    },
    commonMistakes: [
      "Using \\(E = \\tfrac{1}{2}kx^2\\) instead of \\(\\tfrac{1}{2}kA^2\\) for total energy.",
      "Forgetting that total energy is constant while \\(K\\) and \\(U\\) oscillate.",
      "Using the spring energy formula for pendulum oscillations.",
    ],
  },
};
