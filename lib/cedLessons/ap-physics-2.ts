import type { CourseCedLessons } from "./types";

/**
 * AP Physics 2 CED lessons — every topic from Units 1-7 of the 2024-25 CED.
 * Algebra-based, mechanism-focused, and aligned with how the AP graders
 * actually score FRQs. Select topics carry inline animated SVGs (SMIL
 * <animate> tags) so the diagram panel reinforces the mental model.
 *
 * Inline LaTeX uses \\(...\\) so the MathRender pipeline renders it.
 */

// ---------- Reusable animated SVG snippets ------------------------------------

const GAS_BOX_ANIMATION = `
<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-label="Gas particles bouncing in a box">
  <rect x="20" y="20" width="360" height="200" fill="none" stroke="#1a1a1a" stroke-width="1.8" />
  <circle r="5" fill="#c2410c">
    <animate attributeName="cx" values="60;340;60" dur="3.1s" repeatCount="indefinite" />
    <animate attributeName="cy" values="60;200;60" dur="2.4s" repeatCount="indefinite" />
  </circle>
  <circle r="5" fill="#c2410c">
    <animate attributeName="cx" values="300;40;300" dur="2.6s" repeatCount="indefinite" />
    <animate attributeName="cy" values="180;50;180" dur="3.2s" repeatCount="indefinite" />
  </circle>
  <circle r="5" fill="#c2410c">
    <animate attributeName="cx" values="180;360;180;40;180" dur="3.6s" repeatCount="indefinite" />
    <animate attributeName="cy" values="40;140;200;100;40" dur="3.0s" repeatCount="indefinite" />
  </circle>
  <circle r="5" fill="#c2410c">
    <animate attributeName="cx" values="120;280;120" dur="2.2s" repeatCount="indefinite" />
    <animate attributeName="cy" values="160;40;160" dur="2.8s" repeatCount="indefinite" />
  </circle>
  <circle r="5" fill="#c2410c">
    <animate attributeName="cx" values="240;80;340;240" dur="3.4s" repeatCount="indefinite" />
    <animate attributeName="cy" values="90;210;70;90" dur="3.8s" repeatCount="indefinite" />
  </circle>
  <text x="200" y="14" text-anchor="middle" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">Ideal gas: no-drag particles in a sealed box</text>
</svg>`;

const ELECTRIC_FIELD_ANIMATION = `
<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-label="Electric field from a positive point charge">
  <defs>
    <marker id="arrE" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="#c2410c" />
    </marker>
  </defs>
  <circle cx="200" cy="120" r="16" fill="#c2410c" />
  <text x="200" y="125" text-anchor="middle" font-family="ui-sans-serif" font-size="14" fill="#fff" font-weight="700">+</text>
  <g stroke="#c2410c" stroke-width="1.6" fill="none" marker-end="url(#arrE)">
    <line x1="216" y1="120" x2="320" y2="120" />
    <line x1="184" y1="120" x2="80" y2="120" />
    <line x1="200" y1="104" x2="200" y2="24" />
    <line x1="200" y1="136" x2="200" y2="216" />
    <line x1="212" y1="108" x2="290" y2="40" />
    <line x1="188" y1="108" x2="110" y2="40" />
    <line x1="212" y1="132" x2="290" y2="200" />
    <line x1="188" y1="132" x2="110" y2="200" />
  </g>
  <circle r="6" fill="#1a1a1a">
    <animate attributeName="cx" values="220;340;220" dur="2.8s" repeatCount="indefinite" />
    <animate attributeName="cy" values="120;120;120" dur="2.8s" repeatCount="indefinite" />
  </circle>
  <text x="200" y="14" text-anchor="middle" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">Test charge pushed radially outward by field of +Q</text>
</svg>`;

const CIRCUIT_CURRENT_ANIMATION = `
<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-label="Current flowing around a loop">
  <rect x="60" y="50" width="280" height="140" fill="none" stroke="#1a1a1a" stroke-width="2" />
  <rect x="50" y="100" width="20" height="40" fill="#1a1a1a" />
  <text x="35" y="125" text-anchor="middle" font-family="ui-sans-serif" font-size="12" fill="#6b6b6b">ε</text>
  <rect x="220" y="45" width="40" height="12" fill="#c2410c" />
  <text x="240" y="38" text-anchor="middle" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">R</text>
  <circle r="4" fill="#c2410c">
    <animateMotion dur="3.2s" repeatCount="indefinite" path="M60 50 L340 50 L340 190 L60 190 Z" />
  </circle>
  <circle r="4" fill="#c2410c">
    <animateMotion dur="3.2s" begin="-0.8s" repeatCount="indefinite" path="M60 50 L340 50 L340 190 L60 190 Z" />
  </circle>
  <circle r="4" fill="#c2410c">
    <animateMotion dur="3.2s" begin="-1.6s" repeatCount="indefinite" path="M60 50 L340 50 L340 190 L60 190 Z" />
  </circle>
  <circle r="4" fill="#c2410c">
    <animateMotion dur="3.2s" begin="-2.4s" repeatCount="indefinite" path="M60 50 L340 50 L340 190 L60 190 Z" />
  </circle>
  <text x="200" y="220" text-anchor="middle" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">Current loops from + to − through the resistor</text>
</svg>`;

const LORENTZ_FORCE_ANIMATION = `
<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-label="Charge moving in a circle due to magnetic force">
  <g fill="#6b6b6b">
    <circle cx="60" cy="60" r="4" fill="none" stroke="#6b6b6b" stroke-width="1" />
    <circle cx="60" cy="60" r="1.2" />
    <circle cx="140" cy="60" r="4" fill="none" stroke="#6b6b6b" stroke-width="1" />
    <circle cx="140" cy="60" r="1.2" />
    <circle cx="260" cy="60" r="4" fill="none" stroke="#6b6b6b" stroke-width="1" />
    <circle cx="260" cy="60" r="1.2" />
    <circle cx="340" cy="60" r="4" fill="none" stroke="#6b6b6b" stroke-width="1" />
    <circle cx="340" cy="60" r="1.2" />
    <circle cx="60" cy="180" r="4" fill="none" stroke="#6b6b6b" stroke-width="1" />
    <circle cx="60" cy="180" r="1.2" />
    <circle cx="140" cy="180" r="4" fill="none" stroke="#6b6b6b" stroke-width="1" />
    <circle cx="140" cy="180" r="1.2" />
    <circle cx="260" cy="180" r="4" fill="none" stroke="#6b6b6b" stroke-width="1" />
    <circle cx="260" cy="180" r="1.2" />
    <circle cx="340" cy="180" r="4" fill="none" stroke="#6b6b6b" stroke-width="1" />
    <circle cx="340" cy="180" r="1.2" />
  </g>
  <circle cx="200" cy="120" r="60" fill="none" stroke="#c2410c" stroke-width="1.2" stroke-dasharray="4 4" />
  <circle r="7" fill="#c2410c">
    <animateMotion dur="3s" repeatCount="indefinite" path="M 260 120 a 60 60 0 1 1 -120 0 a 60 60 0 1 1 120 0" />
  </circle>
  <text x="200" y="28" text-anchor="middle" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">B out of page → moving + charge curves in a circle</text>
</svg>`;

const WAVE_ANIMATION = `
<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-label="Traveling sinusoidal wave">
  <line x1="20" y1="120" x2="380" y2="120" stroke="#9b9b9b" stroke-width="1" stroke-dasharray="3 3" />
  <path d="M0 120 Q 50 40 100 120 T 200 120 T 300 120 T 400 120 T 500 120" fill="none" stroke="#c2410c" stroke-width="2.4">
    <animateTransform attributeName="transform" type="translate" from="0 0" to="-200 0" dur="2.4s" repeatCount="indefinite" />
  </path>
  <text x="200" y="24" text-anchor="middle" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">Transverse wave: pattern moves; medium oscillates in place</text>
</svg>`;

const EM_WAVE_ANIMATION = `
<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-label="Electromagnetic wave with perpendicular E and B">
  <line x1="20" y1="120" x2="380" y2="120" stroke="#9b9b9b" stroke-width="1" stroke-dasharray="3 3" />
  <path d="M0 120 Q 50 60 100 120 T 200 120 T 300 120 T 400 120 T 500 120" fill="none" stroke="#c2410c" stroke-width="2.4">
    <animateTransform attributeName="transform" type="translate" from="0 0" to="-200 0" dur="2.4s" repeatCount="indefinite" />
  </path>
  <path d="M0 120 Q 50 180 100 120 T 200 120 T 300 120 T 400 120 T 500 120" fill="none" stroke="#1e40af" stroke-width="2.4">
    <animateTransform attributeName="transform" type="translate" from="0 0" to="-200 0" dur="2.4s" repeatCount="indefinite" />
  </path>
  <text x="30" y="40" font-family="ui-sans-serif" font-size="11" fill="#c2410c">E</text>
  <text x="30" y="210" font-family="ui-sans-serif" font-size="11" fill="#1e40af">B</text>
  <text x="200" y="232" text-anchor="middle" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">E and B oscillate in phase, perpendicular to each other and to v</text>
</svg>`;

const PHOTOELECTRIC_ANIMATION = `
<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-label="Photoelectric effect">
  <rect x="50" y="80" width="20" height="120" fill="#6b6b6b" />
  <text x="60" y="72" text-anchor="middle" font-family="ui-sans-serif" font-size="10" fill="#6b6b6b">metal</text>
  <circle r="5" fill="#c2410c">
    <animate attributeName="cx" values="360;70" dur="1.6s" repeatCount="indefinite" />
    <animate attributeName="cy" values="140;140" dur="1.6s" repeatCount="indefinite" />
  </circle>
  <circle r="5" fill="#c2410c">
    <animate attributeName="cx" values="360;70" dur="1.6s" begin="-0.5s" repeatCount="indefinite" />
    <animate attributeName="cy" values="110;110" dur="1.6s" begin="-0.5s" repeatCount="indefinite" />
  </circle>
  <circle r="5" fill="#c2410c">
    <animate attributeName="cx" values="360;70" dur="1.6s" begin="-1.1s" repeatCount="indefinite" />
    <animate attributeName="cy" values="170;170" dur="1.6s" begin="-1.1s" repeatCount="indefinite" />
  </circle>
  <circle r="4" fill="#1e40af">
    <animate attributeName="cx" values="70;340" dur="1.6s" begin="0s" repeatCount="indefinite" />
    <animate attributeName="cy" values="140;60" dur="1.6s" begin="0s" repeatCount="indefinite" />
  </circle>
  <circle r="4" fill="#1e40af">
    <animate attributeName="cx" values="70;340" dur="1.6s" begin="-0.5s" repeatCount="indefinite" />
    <animate attributeName="cy" values="110;100" dur="1.6s" begin="-0.5s" repeatCount="indefinite" />
  </circle>
  <circle r="4" fill="#1e40af">
    <animate attributeName="cx" values="70;340" dur="1.6s" begin="-1.1s" repeatCount="indefinite" />
    <animate attributeName="cy" values="170;200" dur="1.6s" begin="-1.1s" repeatCount="indefinite" />
  </circle>
  <text x="220" y="24" text-anchor="middle" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">Photon in (orange) → electron out (blue) if hv ≥ work function</text>
</svg>`;

// ---------- Lesson catalog ----------------------------------------------------

export const AP_PHYSICS_2_CED_LESSONS: CourseCedLessons = {
  // =========================================================================
  // UNIT 1 — THERMODYNAMICS
  // =========================================================================
  "1.1": {
    id: "1.1",
    title: "Thermodynamic Systems",
    summary:
      "A thermodynamic system is a chosen region of matter; its surroundings are everything else. The boundary determines whether mass or energy can flow in or out.",
    lesson:
      "Thermodynamics analyzes energy transfer between a **system** (what you care about) and its **surroundings**. The boundary is a conceptual line — it can be rigid, movable, insulating, or conducting, depending on the problem.\n\nBoundary types:\n- **Open**: mass and energy both cross (e.g., pot without a lid).\n- **Closed**: energy can cross but not mass (sealed but conducting container).\n- **Isolated**: neither crosses (ideal thermos).\n\n**State variables** describe the system's condition: pressure \\(P\\), volume \\(V\\), temperature \\(T\\), moles \\(n\\), internal energy \\(U\\). They depend only on the current state, not on how the system got there.\n\n**Path-dependent quantities** like heat \\(Q\\) and work \\(W\\) depend on the process between states — they're not properties of a state.\n\nDefining the system cleanly is prerequisite to every calculation. Redefine if needed between parts of a problem; just be explicit.",
    keyIdeas: [
      "System + surroundings = universe; boundary determines what can cross.",
      "Open/closed/isolated classifications by what crosses the boundary.",
      "State variables (\\(P,V,T,n,U\\)) depend on current state only.",
      "Heat and work depend on the process path.",
    ],
    commonMistakes: [
      "Confusing state variables with process-dependent quantities.",
      "Forgetting to redefine the system between parts of a multi-part FRQ.",
      "Calling a system \"closed\" when energy can cross.",
    ],
    diagram: GAS_BOX_ANIMATION,
  },
  "1.2": {
    id: "1.2",
    title: "Pressure, Thermal Equilibrium, and the Ideal Gas Law",
    summary:
      "\\(PV = nRT\\) — the equation of state for an ideal gas. Two systems in thermal contact reach equilibrium when their temperatures match.",
    lesson:
      "**Pressure** in a gas arises from molecules colliding elastically with container walls. Averaged over many collisions, the steady force per area is the pressure.\n\n**Temperature** measures average translational kinetic energy:\n\n$$\\bar{K} = \\tfrac{3}{2}k_B T,$$\n\nwith \\(k_B = 1.38\\times 10^{-23}\\,\\text{J/K}\\). Kelvin only — Celsius doesn't work.\n\n**Thermal equilibrium**: two systems in thermal contact reach equilibrium when there's no net heat flow — equal temperatures. This is the **zeroth law**.\n\n**Ideal gas law**: \\(PV = nRT\\) with \\(R = 8.314\\,\\text{J/(mol·K)}\\). Equivalent: \\(PV = N k_B T\\).\n\nAssumes: point particles, elastic collisions, no intermolecular forces. Works well for everyday gases but breaks at high density or near condensation.",
    keyIdeas: [
      "\\(PV = nRT\\); always Kelvin.",
      "Average translational KE = \\(\\tfrac{3}{2}k_B T\\).",
      "Pressure = wall-collision force per area.",
      "Thermal equilibrium ⇔ equal temperatures.",
    ],
    workedExample: {
      prompt:
        "2 moles of ideal gas at 300 K occupy 0.05 m³. Find the pressure.",
      solution:
        "\\(P = nRT/V = 2 \\cdot 8.314 \\cdot 300 / 0.05 \\approx 1.0\\times 10^5\\,\\text{Pa}\\).",
    },
    commonMistakes: [
      "Using Celsius in \\(PV = nRT\\).",
      "Confusing \\(R\\) and \\(k_B\\) (different units).",
      "Forgetting that \\(P\\) must be absolute.",
    ],
  },
  "1.3": {
    id: "1.3",
    title: "Thermodynamics and Forces",
    summary:
      "Gas pressure times piston area gives a real mechanical force. Work done by gas = \\(\\int P\\,dV\\).",
    lesson:
      "Gas pressure produces a real force on any surface bounding it: \\(F = PA\\). A piston at equilibrium has internal gas force, external pressure force, weight, and any applied load summing to zero.\n\nWhen gas expands against a piston, it does work:\n\n$$W_{\\text{by gas}} = \\int P\\,dV.$$\n\n- **Isobaric**: \\(W = P\\,\\Delta V\\).\n- **Isothermal** (ideal gas): \\(W = nRT\\ln(V_f/V_i)\\).\n- **Isochoric**: \\(W = 0\\).\n\nSign convention: work **by** the gas is positive when volume increases. If using work **on** the gas, flip signs. Be consistent.\n\nMassive pistons have inertia; massless pistons are in instantaneous force balance. Always draw an FBD of the piston to pin down which pressure regime applies.",
    keyIdeas: [
      "Pressure force: \\(F = PA\\).",
      "Gas work: \\(W = \\int P\\,dV\\).",
      "Isobaric \\(W = P\\Delta V\\); isochoric \\(W = 0\\); isothermal \\(W = nRT\\ln(V_f/V_i)\\).",
      "State the sign convention before computing.",
    ],
    commonMistakes: [
      "Using the ideal gas law directly for work — it's a state equation.",
      "Mixing up which side is doing positive work.",
      "Applying \\(W = P\\Delta V\\) when pressure isn't constant.",
    ],
  },
  "1.4": {
    id: "1.4",
    title: "Thermodynamics and Free-Body Diagrams",
    summary:
      "FBDs for pistons and sealed containers include gas pressure forces alongside weight and external forces.",
    lesson:
      "Piston FBD forces:\n- **Internal gas**: \\(F_{\\text{gas}} = P_{\\text{in}} A\\), outward.\n- **Atmospheric**: \\(F_{\\text{atm}} = P_{\\text{atm}} A\\), inward.\n- **Weight**: \\(mg\\) if the piston is massive.\n- **Applied**: whatever the problem specifies.\n\nEquilibrium (piston at rest or moving at constant velocity):\n\n$$P_{\\text{in}} A = P_{\\text{atm}} A + mg + F_{\\text{applied}}.$$\n\nAdding weights on top of the piston increases \\(P_{\\text{in}}\\). Massless, frictionless pistons: \\(P_{\\text{in}} = P_{\\text{atm}} + F/A\\) from any applied load. No load + massless: \\(P_{\\text{in}} = P_{\\text{atm}}\\).\n\nFor vertically oriented cylinders, orientation flips some signs — always pick an axis.",
    keyIdeas: [
      "Treat gas pressure as a force \\(PA\\) on the piston face.",
      "Include atmospheric pressure outside and any external forces.",
      "Equilibrium equation relates internal pressure to external conditions.",
      "Massless piston ⇒ \\(P_{\\text{in}}\\) matches atmosphere + load/area.",
    ],
    commonMistakes: [
      "Forgetting atmospheric pressure.",
      "Omitting piston weight on vertical setups.",
      "Using \\(P\\) instead of \\(PA\\) as the force.",
    ],
  },
  "1.5": {
    id: "1.5",
    title: "Thermodynamics and Contact Forces",
    summary:
      "Heat flow between two objects depends on temperature difference; rate depends on conductivity and area.",
    lesson:
      "When two objects at different temperatures are in contact, heat flows hot → cold until temperatures equalize. Rate depends on \\(\\Delta T\\), thermal conductivity, and contact area — not on the absolute stored heat.\n\nConduction through a slab: \\(dQ/dt = kA\\,\\Delta T/L\\). Good conductors (metals) transfer rapidly; insulators (wood, air) slowly.\n\nOther mechanisms: **convection** (fluid motion carrying heat) and **radiation** (EM waves; every object at \\(T>0\\) radiates).\n\nThermal equilibrium: net heat flow is zero when temperatures match. Amounts transferred depend on heat capacities (1.6); endpoint depends only on \\(T\\).",
    keyIdeas: [
      "Heat flows hot → cold; rate \\(\\propto \\Delta T\\).",
      "Mechanisms: conduction, convection, radiation.",
      "Equilibrium ⇔ equal temperatures.",
      "Even cold objects radiate (less than hot ones).",
    ],
    commonMistakes: [
      "Equating heat flow with temperature.",
      "Forgetting radiation is continuous at any temperature.",
      "Ignoring area dependence in conduction rate.",
    ],
  },
  "1.6": {
    id: "1.6",
    title: "Heat and Energy Transfer",
    summary:
      "\\(Q = mc\\Delta T\\) for temperature change; \\(Q = mL\\) for phase change. In calorimetry, \\(\\sum Q_i = 0\\).",
    lesson:
      "**Heat** \\(Q\\) is energy in transit due to a temperature difference — not a property of a system.\n\nFor temperature change: \\(Q = mc\\Delta T\\), where \\(c\\) is **specific heat** (J/(kg·K)). Water's \\(c = 4186\\) is unusually high.\n\nFor phase change: \\(Q = mL\\), where \\(L\\) is **latent heat**. Temperature stays constant during phase change.\n\nSign: \\(Q > 0\\) = heat added; \\(Q < 0\\) = heat removed.\n\n**Calorimetry**: objects exchange heat until equilibrium; energy conservation gives \\(\\sum Q_i = 0\\). Water's high specific heat makes it ideal for this — small temperature changes reveal heat transferred.",
    keyIdeas: [
      "\\(Q = mc\\Delta T\\) for T-change; \\(Q = mL\\) for phase change.",
      "Temperature constant during phase change.",
      "Calorimetry: \\(\\sum Q_i = 0\\).",
      "Water has high specific heat — good heat reservoir.",
    ],
    workedExample: {
      prompt:
        "500 g of water at 80 °C is mixed with 500 g at 20 °C. Find the final temperature.",
      solution:
        "By symmetry: \\(T_f = 50\\,°\\text{C}\\).",
    },
    commonMistakes: [
      "Using temperature as a stand-in for heat.",
      "Forgetting latent heat during phase change.",
      "Inconsistent signs in calorimetry.",
    ],
  },
  "1.7": {
    id: "1.7",
    title: "Internal Energy and Temperature",
    summary:
      "Internal energy of a monatomic ideal gas: \\(U = \\tfrac{3}{2}nRT\\). First law: \\(\\Delta U = Q + W_{\\text{on}}\\).",
    lesson:
      "**Internal energy** \\(U\\) is the total microscopic energy. For an ideal monatomic gas:\n\n$$U = \\tfrac{3}{2}nRT.$$\n\nDiatomic gases add rotational modes (\\(\\tfrac{5}{2}nRT\\) at moderate temperatures); AP P2 focuses on monatomic.\n\n**First law**: \\(\\Delta U = Q + W_{\\text{on}}\\), where \\(W_{\\text{on}}\\) is work done **on** the gas. Equivalent: \\(\\Delta U = Q - W_{\\text{by}}\\).\n\nSpecial processes:\n- **Isothermal**: \\(\\Delta U = 0\\) ⇒ \\(Q = W_{\\text{by}}\\).\n- **Adiabatic**: \\(Q = 0\\) ⇒ \\(\\Delta U = W_{\\text{on}}\\).\n- **Isochoric**: \\(W = 0\\) ⇒ \\(\\Delta U = Q\\).\n- **Isobaric**: everything nonzero; use \\(W = P\\Delta V\\).\n\nFor an ideal gas, \\(U\\) depends only on \\(T\\) — not pressure or volume individually.",
    keyIdeas: [
      "\\(U_{\\text{monatomic}} = \\tfrac{3}{2}nRT\\).",
      "First law: \\(\\Delta U = Q + W_{\\text{on}}\\).",
      "\\(U\\) depends only on \\(T\\) for ideal gas.",
      "Isothermal/adiabatic/isochoric each zero out one of \\(\\Delta U, Q, W\\).",
    ],
    commonMistakes: [
      "Mixing up \\(W_{\\text{on}}\\) and \\(W_{\\text{by}}\\).",
      "Using \\(\\tfrac{5}{2}nRT\\) for monatomic gas.",
      "Claiming \\(U\\) depends on pressure for ideal gas.",
    ],
  },
  "1.8": {
    id: "1.8",
    title: "Thermodynamics and Collisions",
    summary:
      "Gas pressure comes from countless elastic wall collisions; \\(v_{\\text{rms}} = \\sqrt{3k_B T/m}\\).",
    lesson:
      "A molecule of mass \\(m\\), speed \\(v_x\\), bouncing elastically off a wall reverses \\(v_x\\), transferring \\(\\Delta p = 2mv_x\\). Summing over all molecules and collision frequencies recovers the ideal gas law.\n\nResult: \\(\\tfrac{1}{2}m\\overline{v^2} = \\tfrac{3}{2}k_B T\\), so\n\n$$v_{\\text{rms}} = \\sqrt{\\frac{3k_B T}{m}}.$$\n\nHeavier molecules move slower at the same temperature. The distribution of speeds is Maxwell-Boltzmann; \\(v_{\\text{rms}}\\) is its root-mean-square.\n\nMolecule-molecule collisions redistribute kinetic energy but don't change the total — elastic on average.\n\nImportant: \\(v_{\\text{rms}}\\) is a statistical average; individual molecules have a wide range of speeds. The distribution gets broader at higher \\(T\\) and narrower at lower.",
    keyIdeas: [
      "Wall collision momentum change: \\(2mv_x\\).",
      "\\(v_{\\text{rms}} = \\sqrt{3k_B T/m}\\).",
      "Heavier molecules are slower at same \\(T\\).",
      "\\(v_{\\text{rms}}\\) is a statistical average over many molecules.",
    ],
    commonMistakes: [
      "Using \\(\\Delta p = mv_x\\) (missing factor of 2).",
      "Claiming every molecule has speed \\(v_{\\text{rms}}\\).",
      "Confusing \\(\\overline{v^2}\\) with \\(\\overline{v}^2\\).",
    ],
  },
  "1.9": {
    id: "1.9",
    title: "Probability, Thermal Equilibrium, and Entropy",
    summary:
      "Entropy \\(S = k_B \\ln W\\); counts microstates. Second law: \\(\\Delta S_{\\text{universe}} \\ge 0\\).",
    lesson:
      "**Entropy** measures how many microstates are consistent with a macrostate:\n\n$$S = k_B \\ln W.$$\n\nHigh entropy = many arrangements; low entropy = few.\n\n**Second law**: entropy of an isolated system never decreases. Reversible processes have \\(\\Delta S = 0\\); irreversible ones have \\(\\Delta S > 0\\).\n\nReversible heat transfer: \\(dS = dQ/T\\). Isothermal transfer: \\(\\Delta S = Q/T\\).\n\nExamples:\n- Two blocks at different \\(T\\) in contact: heat flows hot → cold; total entropy increases (hot loses less entropy than cold gains).\n- Free expansion into vacuum: no heat, no work, but \\(\\Delta S = nR\\ln(V_f/V_i) > 0\\).\n\nTime's arrow: irreversibility is statistical. You can't uncrack an egg because the ordered state corresponds to far fewer microstates than the shattered one.",
    keyIdeas: [
      "\\(S = k_B \\ln W\\); entropy counts microstates.",
      "Second law: \\(\\Delta S_{\\text{universe}} \\ge 0\\).",
      "\\(\\Delta S = Q/T\\) for reversible heat transfer.",
      "Irreversibility comes from statistics.",
    ],
    commonMistakes: [
      "Using \\(\\Delta S = Q/T\\) for irreversible processes without care.",
      "Forgetting \\(\\Delta S \\ge 0\\) applies to the whole universe.",
      "Treating entropy as vague \"disorder\" without microstate counting.",
    ],
  },
  "1.10": {
    id: "1.10",
    title: "Thermodynamics and Elastic Collisions",
    summary:
      "Elastic wall collisions conserve kinetic energy and underpin the kinetic theory of gases.",
    lesson:
      "The ideal gas picture requires that wall and molecule-molecule collisions be **elastic** — kinetic energy conserved. If not, temperature would drop spontaneously as KE dissipated into heat, contradicting equilibrium.\n\nPer wall collision: \\(\\Delta p = 2mv_x\\). No energy lost.\n\nElastic collisions redistribute kinetic energy among molecules but preserve the total. Over time, a gas settles into the Maxwell-Boltzmann distribution — maximum-entropy distribution for a given temperature.\n\nAP problems sometimes ask: given \\(N\\) molecules hitting a wall per second at speed \\(v\\), what's the force? Answer: \\(F = N \\cdot 2mv / t\\), then pressure = \\(F/A\\).",
    keyIdeas: [
      "Elastic collisions conserve KE.",
      "Wall bounce: \\(\\Delta p = 2mv_x\\).",
      "Elastic intermolecular collisions maintain temperature.",
      "Maxwell-Boltzmann is the equilibrium speed distribution.",
    ],
    commonMistakes: [
      "Using \\(\\Delta p = mv_x\\).",
      "Assuming kinetic theory works with inelastic collisions.",
      "Ignoring that all velocity components contribute in 3D.",
    ],
  },
  "1.11": {
    id: "1.11",
    title: "Thermodynamics and Inelastic Collisions",
    summary:
      "In inelastic collisions, kinetic energy becomes internal (thermal) energy — temperature rises.",
    lesson:
      "**Inelastic** macroscopic collisions don't conserve kinetic energy. The lost KE goes into internal energy — deformation, sound, and most commonly heat.\n\nEnergy conservation still holds: \\(K_i + U_i = K_f + U_f + Q_{\\text{heat}}\\). Momentum is also always conserved (assuming no external impulse during collision).\n\nExample: two sticky clay balls colliding. Use momentum conservation to find \\(v_f\\), then \\(\\Delta K\\) gives the energy converted to heat: \\(Q = \\Delta K\\) (negative of kinetic-energy change). If the balls have specific heat \\(c\\) and total mass \\(M\\), \\(\\Delta T = Q / (Mc)\\).\n\nCar crashes, bullet-in-block problems, and car-deformation models all use this framework. The energy \"lost\" to thermodynamics is the link between macroscopic mechanics and microscopic internal energy.",
    keyIdeas: [
      "Inelastic: KE not conserved; total energy is.",
      "Lost KE becomes internal (thermal) energy.",
      "Momentum conservation still holds.",
      "\\(\\Delta T = |\\Delta K| / (Mc)\\).",
    ],
    workedExample: {
      prompt:
        "A 0.5 kg clay ball at 20 m/s sticks to a 0.5 kg block at rest. Combined \\(c = 800\\,\\text{J/(kg·K)}\\). Find \\(v_f\\) and \\(\\Delta T\\).",
      solution:
        "Momentum: \\(v_f = 10\\,\\text{m/s}\\). \\(K_i = 100\\,\\text{J}\\), \\(K_f = 50\\,\\text{J}\\). Lost 50 J to heat. \\(\\Delta T = 50/(1 \\cdot 800) \\approx 0.063\\,\\text{K}\\).",
    },
    commonMistakes: [
      "Applying K conservation to inelastic collision.",
      "Forgetting momentum conservation still holds.",
      "Ignoring the resulting temperature rise.",
    ],
  },

  // =========================================================================
  // UNIT 2 — ELECTRIC FORCE, FIELD, AND POTENTIAL
  // =========================================================================
  "2.1": {
    id: "2.1",
    title: "Electric Systems and Charge",
    summary:
      "Electric charge is a conserved, quantized property of matter. Two kinds: positive and negative.",
    lesson:
      "**Electric charge** \\(q\\) is a fundamental property of matter, measured in coulombs (C). Two kinds, positive and negative. Like charges repel; unlike attract.\n\n**Quantized**: charge comes in integer multiples of \\(e = 1.6\\times 10^{-19}\\,\\text{C}\\). Protons: \\(+e\\); electrons: \\(-e\\). Macroscopic objects with net charge have \\(q = Ne\\) for some integer \\(N\\).\n\n**Conserved**: total charge in an isolated system is constant. Charges can be transferred between objects (friction, contact, induction) but not created or destroyed.\n\nElectrons are the mobile carriers in most everyday systems — solid metals, salt solutions with ions, air with free charges. Protons are locked in atomic nuclei and don't move around in chemistry or Physics 2 contexts.\n\nA **neutral** object has equal numbers of protons and electrons. A negatively charged object has excess electrons; a positive one has a deficit.",
    keyIdeas: [
      "Charge \\(q\\) in coulombs; two kinds (\\(+\\) and \\(-\\)).",
      "Quantized: \\(q = Ne\\) with \\(e = 1.6\\times 10^{-19}\\) C.",
      "Conserved: total charge is constant in isolated systems.",
      "Electrons are the mobile carriers; protons stay put.",
    ],
    commonMistakes: [
      "Treating charge as a continuous variable (it's discrete, but appears continuous macroscopically).",
      "Forgetting that macroscopic neutrality doesn't mean no charges — just balanced ones.",
      "Moving protons around in thought experiments; in solid matter, they don't move.",
    ],
  },
  "2.2": {
    id: "2.2",
    title: "Conservation of Electric Charge",
    summary:
      "Net charge is conserved in any isolated system. In chemical reactions, electron flow, and radioactive decay.",
    lesson:
      "Charge conservation is a cornerstone. In any closed system, \\(\\sum q_i\\) before = \\(\\sum q_i\\) after.\n\nExamples:\n- **Electrons transferred** by rubbing: if rod gets \\(-q\\), cloth gets \\(+q\\). Sum: 0.\n- **Beta decay**: a neutron (\\(q=0\\)) decays to a proton (\\(+e\\)) + electron (\\(-e\\)) + antineutrino (\\(0\\)). Sum: 0.\n- **Chemical reactions**: ions rearrange but total charge is unchanged.\n\nWhen two charged conductors touch and then separate, they share charge until their potentials match. For identical spheres, the final charge is \\((q_1 + q_2)/2\\) on each. For different sizes, the charge distributes in proportion to radius (if both can be treated as isolated spheres).",
    keyIdeas: [
      "Total charge is conserved in any isolated system.",
      "Charge transfer is redistribution, not creation.",
      "Identical conductors touching → equal final charges.",
      "Applies across friction, induction, chemistry, and nuclear processes.",
    ],
    commonMistakes: [
      "Overlooking the charge of neutralized ions.",
      "Forgetting the antiparticle charge in nuclear processes.",
      "Assuming all charge ends up on one object after contact.",
    ],
  },
  "2.3": {
    id: "2.3",
    title: "Charge Distribution: Friction, Conduction, and Induction",
    summary:
      "Three ways to charge an object: friction (rubbing), conduction (contact), and induction (without contact).",
    lesson:
      "**Charging by friction**: rubbing two different materials transfers electrons from one to the other. Direction depends on the **triboelectric series**: glass rubbed with silk gets positive; rubber with fur gets negative.\n\n**Charging by conduction**: bringing a charged object into contact with a neutral conductor transfers charge until their potentials match. For identical spheres touching, each ends with half the total charge.\n\n**Charging by induction**: bring a charged object *near* a neutral conductor (not touching). The neutral conductor's charges redistribute — negatives move toward (or away from) the charged object. **Grounding** the far side of the conductor while the charged object is near drains off charge of one sign; removing the ground and then the charged object leaves the conductor with net charge of opposite sign.\n\nPolarization is similar but applies to **insulators** — internal charges shift slightly without migrating. This is why a charged balloon sticks to a wall even though the wall is neutral.",
    keyIdeas: [
      "Friction transfers electrons based on triboelectric series.",
      "Conduction: contact equalizes potentials.",
      "Induction: charge without contact, using grounding.",
      "Insulators polarize; conductors let charges migrate.",
    ],
    commonMistakes: [
      "Confusing induction with conduction — induction keeps the source charge intact.",
      "Forgetting to ground during induction.",
      "Treating all charging methods as requiring contact.",
    ],
  },
  "2.4": {
    id: "2.4",
    title: "Electric Permittivity",
    summary:
      "Permittivity \\(\\varepsilon\\) describes how a medium responds to electric fields. Vacuum: \\(\\varepsilon_0 = 8.85\\times 10^{-12}\\,\\text{C}^2/(\\text{N·m}^2)\\).",
    lesson:
      "**Permittivity** \\(\\varepsilon\\) is a medium's response to an applied electric field. In vacuum: \\(\\varepsilon_0 = 8.85\\times 10^{-12}\\,\\text{C}^2/(\\text{N·m}^2)\\). Materials have \\(\\varepsilon = \\kappa \\varepsilon_0\\), where \\(\\kappa\\) is the **dielectric constant** (\\(\\kappa \\ge 1\\)).\n\nCoulomb's law in vacuum: \\(F = \\frac{1}{4\\pi\\varepsilon_0}\\cdot\\frac{q_1 q_2}{r^2}\\). The constant \\(k = 1/(4\\pi\\varepsilon_0) \\approx 9\\times 10^9\\,\\text{N·m}^2/\\text{C}^2\\).\n\nIn a dielectric medium, replace \\(\\varepsilon_0\\) with \\(\\varepsilon\\) — the force shrinks by factor \\(\\kappa\\). A capacitor filled with dielectric has capacitance \\(C = \\kappa C_0\\) — holds \\(\\kappa\\) times more charge at the same voltage.\n\nMost AP problems work in vacuum or air, where \\(\\kappa \\approx 1\\). Water has \\(\\kappa \\approx 80\\), which is why ionic compounds dissolve readily.",
    keyIdeas: [
      "\\(\\varepsilon_0 = 8.85\\times 10^{-12}\\) C²/(N·m²); \\(k = 1/(4\\pi\\varepsilon_0) \\approx 9\\times 10^9\\).",
      "Dielectric constant \\(\\kappa \\ge 1\\) characterizes materials.",
      "Force in a medium: divide vacuum force by \\(\\kappa\\).",
      "Capacitors: \\(C = \\kappa C_0\\).",
    ],
    commonMistakes: [
      "Mixing up \\(\\varepsilon_0\\) and \\(k\\).",
      "Using \\(\\kappa\\) as a force (it's dimensionless).",
      "Forgetting to switch to \\(\\varepsilon\\) when a dielectric is present.",
    ],
  },
  "2.5": {
    id: "2.5",
    title: "Electric Forces and Free-Body Diagrams",
    summary:
      "Coulomb's law: \\(F = kq_1 q_2/r^2\\). Like charges repel, unlike attract. Superpose contributions from multiple sources.",
    lesson:
      "**Coulomb's law**: the electric force between two point charges \\(q_1, q_2\\) separated by \\(r\\) has magnitude\n\n$$F = \\frac{k|q_1 q_2|}{r^2},$$\n\nwith \\(k \\approx 9\\times 10^9\\,\\text{N·m}^2/\\text{C}^2\\). Direction: along the line joining them — repulsive if same sign, attractive if opposite.\n\nFor a system of point charges, the net force on one is the **vector sum** of pairwise Coulomb forces. Compute each, resolve into components, add.\n\nEquilibrium of charged objects (charged pendulums, suspended balls) combines Coulomb force with tension, weight, normal forces — a standard mechanics problem with an extra force vector.\n\nInverse-square dependence is identical to gravity. But charges can be either sign, so attractive *and* repulsive forces both appear.",
    keyIdeas: [
      "\\(F = k|q_1 q_2|/r^2\\); direction along the line between charges.",
      "Like repels, unlike attracts.",
      "Vector superposition for multiple charges.",
      "Inverse-square law, analogous to gravity.",
    ],
    workedExample: {
      prompt:
        "Two charges, \\(+2\\,\\mu\\text{C}\\) and \\(-3\\,\\mu\\text{C}\\), separated by 0.1 m. Find the force.",
      solution:
        "\\(F = 9\\times 10^9 \\cdot 2\\times 10^{-6} \\cdot 3\\times 10^{-6} / 0.01 = 5.4\\,\\text{N}\\), attractive.",
    },
    commonMistakes: [
      "Dropping absolute values and getting a sign-confused magnitude.",
      "Not superposing forces from multiple charges vectorially.",
      "Using \\(r\\) instead of \\(r^2\\) in the denominator.",
    ],
  },
  "2.6": {
    id: "2.6",
    title: "Gravitational and Electromagnetic Forces",
    summary:
      "Both follow inverse-square laws, but EM forces can be attractive or repulsive and are \\(~10^{40}\\) times stronger.",
    lesson:
      "Coulomb vs. Newton:\n- Coulomb: \\(F_e = k q_1 q_2 / r^2\\).\n- Newton: \\(F_g = G m_1 m_2 / r^2\\).\n\nBoth inverse-square, both long-range. Differences:\n- **Sign**: mass is always positive (only attractive); charge can be either (attractive or repulsive).\n- **Strength**: for two protons, \\(F_e / F_g \\approx 10^{36}\\) — electromagnetic dominates at the particle scale.\n- **Screening**: opposite charges cancel in bulk matter, so net electromagnetic forces between macroscopic neutral objects are small — that's why gravity dominates at astronomical scales.\n\nThis is why planets orbit by gravity (attractive, unscreened) but atoms are held together by electromagnetic forces (attractive between nucleus and electrons).",
    keyIdeas: [
      "Both are inverse-square, long-range.",
      "Gravity is always attractive; EM can be either sign.",
      "EM is vastly stronger than gravity at particle scales.",
      "Bulk matter is mostly neutral, so gravity dominates large-scale structures.",
    ],
    commonMistakes: [
      "Treating gravity as repulsive in any scenario.",
      "Ignoring screening — macroscopic charged objects usually have small effective charges.",
      "Comparing the same pair with each force and forgetting the mass/charge ratios.",
    ],
  },
  "2.7": {
    id: "2.7",
    title: "Vector and Scalar Fields",
    summary:
      "A field assigns a value to every point in space. Electric field is a vector field; electric potential is a scalar field.",
    lesson:
      "A **field** is a physical quantity defined at every point in space. Two types in Physics 2:\n- **Vector field**: direction and magnitude at each point (e.g., electric field \\(\\vec{E}\\), magnetic field \\(\\vec{B}\\)).\n- **Scalar field**: magnitude only (e.g., temperature, electric potential \\(V\\)).\n\nFields let us describe interactions locally. Instead of \"charge A acts on charge B at a distance,\" we say \"charge A creates a field at B's location; B feels a force from that field.\"\n\nVector fields are visualized with field lines; scalar fields with level curves (equipotentials). The two are related: \\(\\vec{E}\\) points from high \\(V\\) to low \\(V\\), perpendicular to equipotentials.\n\nSuperposition applies to fields as well as forces: the total field at a point is the vector (or scalar) sum of contributions from every source.",
    keyIdeas: [
      "Field = value at every point in space.",
      "Electric field is a vector; potential is a scalar.",
      "Field lines (vector) vs. equipotentials (scalar).",
      "Superposition: fields add.",
    ],
    commonMistakes: [
      "Treating a scalar field as a vector and vice versa.",
      "Confusing field lines with particle paths.",
      "Ignoring the vector nature of electric field in summations.",
    ],
  },
  "2.8": {
    id: "2.8",
    title: "Electric Charges and Fields",
    summary:
      "\\(\\vec{E} = \\vec{F}/q\\) — field per unit test charge. For a point charge \\(Q\\) at distance \\(r\\): \\(E = kQ/r^2\\).",
    lesson:
      "**Electric field** at a point is the force per unit positive test charge:\n\n$$\\vec{E} = \\vec{F}/q_0.$$\n\nUnits: N/C (or V/m).\n\nFor a point charge \\(Q\\) at distance \\(r\\):\n\n$$E = \\frac{kQ}{r^2},$$\n\npointing **outward** from \\(+Q\\) and **inward** toward \\(-Q\\).\n\n**Field lines**: drawn tangent to \\(\\vec{E}\\), starting on \\(+\\) charges and ending on \\(-\\). Density = field strength. Never cross.\n\nNear a charged conductor's surface, \\(\\vec{E}\\) is perpendicular to the surface (field would push charges along a parallel component). Inside a conductor at equilibrium, \\(\\vec{E} = 0\\).\n\nFor multiple charges, use **superposition**: vector sum of individual point-charge fields.",
    keyIdeas: [
      "\\(\\vec{E} = \\vec{F}/q_0\\); units N/C.",
      "Point charge: \\(E = kQ/r^2\\), radial.",
      "Field lines start on \\(+\\), end on \\(-\\).",
      "Inside a conductor at equilibrium: \\(\\vec{E} = 0\\).",
    ],
    workedExample: {
      prompt:
        "Find the electric field 0.05 m from a \\(+3\\,\\mu\\text{C}\\) point charge.",
      solution:
        "\\(E = 9\\times 10^9 \\cdot 3\\times 10^{-6} / (0.05)^2 = 1.08\\times 10^7\\,\\text{N/C}\\), outward.",
    },
    commonMistakes: [
      "Mixing up force and field.",
      "Forgetting that field points outward from \\(+\\) but inward toward \\(-\\).",
      "Not superposing vectorially.",
    ],
    diagram: ELECTRIC_FIELD_ANIMATION,
  },
  "2.9": {
    id: "2.9",
    title: "Isolines and Electric Fields",
    summary:
      "Equipotential surfaces are where \\(V\\) is constant. \\(\\vec{E}\\) is perpendicular to them, pointing from high to low \\(V\\).",
    lesson:
      "**Equipotential surfaces** connect points at the same electric potential. \"Isolines\" are their 2D slices.\n\nProperties:\n- \\(\\vec{E}\\) is always perpendicular to equipotentials.\n- \\(\\vec{E}\\) points from high \\(V\\) to low \\(V\\).\n- No work is done moving a charge along an equipotential: \\(W = -q\\,\\Delta V = 0\\).\n- Conductor surfaces are equipotentials (at electrostatic equilibrium).\n\nFor a point charge \\(Q\\), equipotentials are concentric spheres. For a dipole, they're more complex — symmetric \"figure-eight\" shapes. For a parallel-plate capacitor, equipotentials are planes parallel to the plates.\n\nGiven an equipotential map, you can read the field direction (perpendicular to lines) and magnitude (closer spacing = stronger field). The gradient relation: \\(E = -dV/dx\\) in 1D.",
    keyIdeas: [
      "Equipotentials = constant-V surfaces.",
      "\\(\\vec{E} \\perp\\) equipotential, from high to low.",
      "No work to move charge along an equipotential.",
      "Closer equipotential spacing = stronger field.",
    ],
    commonMistakes: [
      "Drawing \\(\\vec{E}\\) along equipotentials instead of perpendicular.",
      "Claiming work is done moving along a constant-\\(V\\) surface.",
      "Mis-reading direction of \\(\\vec{E}\\) (it's high-to-low, like hills).",
    ],
  },
  "2.10": {
    id: "2.10",
    title: "Conservation of Electric Energy",
    summary:
      "\\(U_E = kq_1 q_2/r\\) for two point charges; \\(U_E = qV\\) in a potential. Energy conservation: \\(\\Delta K + \\Delta U_E = 0\\) if no external work.",
    lesson:
      "Electric potential energy between two point charges:\n\n$$U_E = \\frac{kq_1 q_2}{r}.$$\n\nSign matters — two positives or two negatives give \\(U_E > 0\\); opposite signs give \\(U_E < 0\\).\n\nIn a potential \\(V\\): \\(U_E = qV\\). The potential difference (\"voltage\") between two points: \\(\\Delta V = V_B - V_A\\). Work done by the field on charge \\(q\\) moving from A to B: \\(W = -q\\,\\Delta V\\).\n\n**Energy conservation**: in the absence of non-conservative forces, \\(K + U_E = \\text{const}\\). A charge released from rest at high \\(V\\) gains kinetic energy as it moves to low \\(V\\): \\(\\tfrac{1}{2}mv^2 = q\\,\\Delta V\\).\n\nThis is how an electron gun accelerates electrons in a CRT: a voltage difference does work on each electron. \\(1\\,\\text{eV}\\) is the energy gained by a charge \\(e\\) through \\(\\Delta V = 1\\,\\text{V}\\), about \\(1.6\\times 10^{-19}\\,\\text{J}\\).",
    keyIdeas: [
      "\\(U_E = kq_1 q_2/r\\) for point charges; watch signs.",
      "\\(U_E = qV\\) in a potential.",
      "Energy conservation: \\(\\Delta K = -\\Delta U_E\\) if isolated.",
      "\\(\\tfrac{1}{2}mv^2 = q\\,\\Delta V\\) for a charge accelerated from rest.",
    ],
    workedExample: {
      prompt:
        "An electron is accelerated from rest through \\(\\Delta V = 1000\\,\\text{V}\\). Find its final speed. \\((m_e = 9.1\\times 10^{-31}\\,\\text{kg})\\)",
      solution:
        "\\(\\tfrac{1}{2}m v^2 = e\\Delta V\\): \\(v = \\sqrt{2e\\Delta V/m_e} = \\sqrt{2 \\cdot 1.6\\times 10^{-19} \\cdot 1000/9.1\\times 10^{-31}} \\approx 1.87\\times 10^7\\,\\text{m/s}\\).",
    },
    commonMistakes: [
      "Dropping sign on \\(U_E\\) for mixed-sign charges.",
      "Conflating potential (V) with potential energy (J).",
      "Forgetting charge on \\(W = q\\Delta V\\).",
    ],
  },

  // =========================================================================
  // UNIT 3 — ELECTRIC CIRCUITS
  // =========================================================================
  "3.1": {
    id: "3.1",
    title: "Definition and Conservation of Electric Charge",
    summary:
      "Current \\(I = dQ/dt\\) is the rate of charge flow. Conservation of charge gives Kirchhoff's junction rule.",
    lesson:
      "**Electric current**: rate of charge flow through a cross-section,\n\n$$I = \\frac{dQ}{dt}.$$\n\nUnits: ampere (A) = C/s. Conventional current points in the direction positive charges would flow — opposite to actual electron drift direction.\n\nFor \\(N\\) mobile charges per volume, each with charge \\(q\\) and drift velocity \\(v_d\\), through a cross-sectional area \\(A\\): \\(I = nAqv_d\\).\n\n**Conservation of charge** at a junction: charges flow in and out at equal total rates (\"what goes in must come out\"). This is **Kirchhoff's junction rule**: \\(\\sum I_{\\text{in}} = \\sum I_{\\text{out}}\\). It's a restatement of charge conservation for steady currents.\n\nSeries elements carry the same current. Parallel elements share current according to resistance ratios.",
    keyIdeas: [
      "\\(I = dQ/dt\\); units of ampere.",
      "Conventional current is opposite to electron flow.",
      "\\(I = nAqv_d\\) for drift.",
      "Kirchhoff's junction rule: charges in = charges out.",
    ],
    commonMistakes: [
      "Assuming current is the flow of electrons specifically (it's conventional current, direction of \\(+\\)).",
      "Mixing up drift velocity with signal speed.",
      "Losing track of current directions at a junction.",
    ],
  },
  "3.2": {
    id: "3.2",
    title: "Resistivity and Resistance",
    summary:
      "Resistance \\(R = V/I\\) (Ohm's law). Resistivity \\(\\rho\\) is an intrinsic material property; \\(R = \\rho L/A\\).",
    lesson:
      "**Ohm's law**: for many materials, \\(V = IR\\) — voltage drop across a conductor is proportional to current. \\(R\\) is the resistance, measured in ohms (\\(\\Omega = \\text{V/A}\\)).\n\n**Resistivity** \\(\\rho\\) is a material property (\\(\\Omega\\cdot\\text{m}\\)). For a uniform wire,\n\n$$R = \\rho\\frac{L}{A}.$$\n\nLonger wires resist more; thicker wires resist less. Doubling length doubles \\(R\\); doubling area halves it.\n\n**Temperature dependence**: for most conductors, \\(\\rho\\) increases with \\(T\\) (thermal vibrations scatter carriers more). Semiconductors do the opposite.\n\n**Combining resistors**:\n- Series: \\(R_{\\text{tot}} = \\sum R_i\\).\n- Parallel: \\(1/R_{\\text{tot}} = \\sum 1/R_i\\).\n\nSeries always bigger than any individual; parallel always smaller than any individual.",
    keyIdeas: [
      "Ohm: \\(V = IR\\).",
      "\\(R = \\rho L/A\\).",
      "Series: resistances add; parallel: reciprocals add.",
      "Resistivity increases with \\(T\\) for metals.",
    ],
    workedExample: {
      prompt:
        "Two resistors, 6 Ω and 3 Ω, in parallel. Find equivalent resistance.",
      solution:
        "\\(1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2\\), so \\(R = 2\\,\\Omega\\).",
    },
    commonMistakes: [
      "Forgetting the reciprocal for parallel.",
      "Swapping series and parallel combination rules.",
      "Using diameter instead of area in \\(R = \\rho L/A\\).",
    ],
  },
  "3.3": {
    id: "3.3",
    title: "Resistance and Capacitance",
    summary:
      "Capacitance \\(C = Q/V\\) measures charge stored per volt. Parallel-plate: \\(C = \\kappa\\varepsilon_0 A/d\\). Energy: \\(U = \\tfrac{1}{2}CV^2\\).",
    lesson:
      "**Capacitance**:\n\n$$C = \\frac{Q}{V}.$$\n\nUnits: farad (F) = C/V. A 1 F capacitor stores 1 C at 1 V — huge. Real capacitors range from pF to μF.\n\n**Parallel-plate capacitor** with plates of area \\(A\\) separated by \\(d\\), with dielectric constant \\(\\kappa\\):\n\n$$C = \\kappa\\varepsilon_0\\frac{A}{d}.$$\n\nEnergy stored: \\(U = \\tfrac{1}{2}CV^2 = \\tfrac{1}{2}Q^2/C = \\tfrac{1}{2}QV\\).\n\n**Combining capacitors** (opposite to resistors):\n- Series: \\(1/C_{\\text{tot}} = \\sum 1/C_i\\).\n- Parallel: \\(C_{\\text{tot}} = \\sum C_i\\).\n\nInserting a dielectric increases \\(C\\) by factor \\(\\kappa\\) — useful for storing more charge at the same voltage.\n\n**RC circuits**: during charging, \\(Q(t) = CV(1 - e^{-t/RC})\\). Time constant \\(\\tau = RC\\). After \\(\\tau\\), capacitor is \\(\\sim 63\\%\\) charged.",
    keyIdeas: [
      "\\(C = Q/V\\); units farad.",
      "Parallel-plate: \\(C = \\kappa\\varepsilon_0 A/d\\).",
      "Stored energy: \\(U = \\tfrac{1}{2}CV^2\\).",
      "RC time constant: \\(\\tau = RC\\).",
    ],
    commonMistakes: [
      "Swapping series and parallel combination rules (capacitors are opposite of resistors).",
      "Forgetting the dielectric factor \\(\\kappa\\).",
      "Confusing time constant with half-life.",
    ],
  },
  "3.4": {
    id: "3.4",
    title: "Kirchhoff's Loop Rule",
    summary:
      "Sum of voltage drops around any closed loop equals zero: \\(\\sum V_i = 0\\). Restatement of energy conservation.",
    lesson:
      "**Kirchhoff's loop rule**: around any closed loop in a circuit, the sum of voltage changes is zero:\n\n$$\\sum_{\\text{loop}} \\Delta V = 0.$$\n\nThis is energy conservation applied to a unit charge going around the loop — starting and ending at the same point, net work done is zero.\n\nSign conventions:\n- Traversing a battery from \\(-\\) to \\(+\\): \\(+\\varepsilon\\).\n- Traversing a resistor in the direction of current: \\(-IR\\).\n- Traversing a capacitor from \\(-\\) to \\(+\\) plate: \\(+V_C = +Q/C\\).\n\nReverse direction, flip signs.\n\nCombined with the junction rule (3.1), Kirchhoff's laws solve any DC circuit. For complex networks, write the loop and junction equations, solve the system.\n\nAP FRQs like circuits with two loops sharing an element. Label each branch current, apply both rules, solve.",
    keyIdeas: [
      "\\(\\sum \\Delta V = 0\\) around any closed loop.",
      "Battery \\(-\\to +\\): \\(+\\varepsilon\\); resistor with current: \\(-IR\\).",
      "Based on energy conservation.",
      "Combined with junction rule, solves any DC circuit.",
    ],
    workedExample: {
      prompt:
        "A 12 V battery is connected in series with a 4 Ω and 2 Ω resistor. Find the current.",
      solution:
        "Loop: \\(12 - 4I - 2I = 0 \\Rightarrow I = 2\\,\\text{A}\\).",
    },
    commonMistakes: [
      "Wrong sign on a resistor voltage (direction of traversal matters).",
      "Forgetting a battery's internal resistance.",
      "Not writing enough independent equations for multi-loop circuits.",
    ],
    diagram: CIRCUIT_CURRENT_ANIMATION,
  },
  "3.5": {
    id: "3.5",
    title: "Kirchhoff's Junction Rule",
    summary:
      "At any junction, \\(\\sum I_{\\text{in}} = \\sum I_{\\text{out}}\\). Restatement of charge conservation for steady currents.",
    lesson:
      "**Kirchhoff's junction rule**: at any node (junction) in a circuit, the total current flowing in equals the total current flowing out:\n\n$$\\sum I_{\\text{in}} = \\sum I_{\\text{out}}.$$\n\nIt's charge conservation — charge doesn't pile up at a junction under steady-state conditions.\n\nPractical use: when a wire splits into two, the current splits too. If the two branches have resistances \\(R_1, R_2\\), the currents divide:\n\n$$I_1 = I\\frac{R_2}{R_1 + R_2}, \\quad I_2 = I\\frac{R_1}{R_1 + R_2}$$\n\n(current divider formula — more flows through the lower-resistance branch).\n\nCombined with the loop rule, you solve DC circuit problems systematically. Label currents with directions (guess if unclear; a negative result means the true direction is opposite).",
    keyIdeas: [
      "\\(\\sum I_{\\text{in}} = \\sum I_{\\text{out}}\\) at every junction.",
      "Charge conservation in steady state.",
      "Current divider: \\(I_i \\propto 1/R_i\\) in parallel branches.",
      "Combine with loop rule to solve full circuits.",
    ],
    commonMistakes: [
      "Inconsistent direction conventions between junctions.",
      "Forgetting that branch currents can add back together downstream.",
      "Using voltage divider when you need current divider (or vice versa).",
    ],
  },

  // =========================================================================
  // UNIT 4 — MAGNETISM AND ELECTROMAGNETIC INDUCTION
  // =========================================================================
  "4.1": {
    id: "4.1",
    title: "Magnetic Systems",
    summary:
      "Magnetism is a relativistic effect of moving charges. Permanent magnets arise from aligned atomic magnetic moments.",
    lesson:
      "Magnetic phenomena arise from **moving charges**. A wire carrying current produces a magnetic field; an electron moving in its orbit around a nucleus has a magnetic moment; the collective alignment of atomic moments creates a **permanent magnet**.\n\n**Magnetic dipoles** have a north and south pole, which cannot be separated (unlike electric charges). Cut a bar magnet in half — each piece is still a dipole. Magnetic monopoles have never been observed.\n\nThe Earth itself is a magnetic dipole, roughly aligned with the rotation axis (but offset and gradually shifting). Compasses point to the magnetic \"north pole,\" which is actually a south magnetic pole (because a compass needle's N is attracted to it).\n\nIn ferromagnetic materials (iron, cobalt, nickel), domains of aligned moments exist even at equilibrium. External fields can align the domains, leaving the material magnetized. Heating above the **Curie temperature** destroys the alignment.",
    keyIdeas: [
      "Magnetism = moving charges + intrinsic spin.",
      "Dipoles only; no magnetic monopoles.",
      "Ferromagnets have aligned domains.",
      "Heat (above Curie T) randomizes domains.",
    ],
    commonMistakes: [
      "Treating magnetic monopoles as real.",
      "Confusing electric and magnetic dipole fields.",
      "Thinking permanent magnets are \"made of charges\" rather than aligned atomic currents.",
    ],
  },
  "4.2": {
    id: "4.2",
    title: "Magnetic Permeability and Magnetic Dipole Moment",
    summary:
      "Permeability \\(\\mu\\) characterizes a medium's magnetic response. Vacuum: \\(\\mu_0 = 4\\pi\\times 10^{-7}\\,\\text{T·m/A}\\).",
    lesson:
      "**Permeability** \\(\\mu\\) is to magnetism what permittivity is to electricity. Vacuum: \\(\\mu_0 = 4\\pi\\times 10^{-7}\\,\\text{T·m/A} \\approx 1.26\\times 10^{-6}\\). Materials have \\(\\mu = \\kappa_m \\mu_0\\), where \\(\\kappa_m\\) is the relative permeability.\n\nClasses:\n- **Ferromagnetic** (iron, cobalt, nickel): \\(\\kappa_m \\gg 1\\); strong magnetic response.\n- **Paramagnetic**: \\(\\kappa_m\\) slightly \\(> 1\\); weak response, aligns with field.\n- **Diamagnetic**: \\(\\kappa_m\\) slightly \\(< 1\\); repels field weakly.\n\n**Magnetic dipole moment** \\(\\vec{\\mu}\\) characterizes a magnet's strength and orientation. Units A·m². For a current loop of area \\(A\\) carrying current \\(I\\):\n\n$$\\vec{\\mu} = I\\vec{A},$$\n\nwith direction given by the right-hand rule (curl fingers along current, thumb = \\(\\vec{\\mu}\\)).\n\nTorque on a dipole in a field: \\(\\vec{\\tau} = \\vec{\\mu}\\times\\vec{B}\\). Potential energy: \\(U = -\\vec{\\mu}\\cdot\\vec{B}\\). Dipoles align with external fields at equilibrium.",
    keyIdeas: [
      "\\(\\mu_0 = 4\\pi\\times 10^{-7}\\) T·m/A.",
      "Relative permeability \\(\\kappa_m\\) classifies materials.",
      "Loop moment: \\(\\mu = IA\\).",
      "Torque: \\(\\tau = \\mu B \\sin\\theta\\); PE: \\(-\\mu B\\cos\\theta\\).",
    ],
    commonMistakes: [
      "Using permittivity formula for magnetism.",
      "Forgetting that dipole moment is a vector.",
      "Confusing para- and diamagnetic responses.",
    ],
  },
  "4.3": {
    id: "4.3",
    title: "Vector and Scalar Fields (Magnetic)",
    summary:
      "The magnetic field \\(\\vec{B}\\) is a vector field. No magnetic monopoles means field lines form closed loops.",
    lesson:
      "The **magnetic field** \\(\\vec{B}\\) is a vector field, measured in teslas (T). 1 T = 1 N/(A·m).\n\n**Field lines** for \\(\\vec{B}\\): tangent to field direction; density indicates magnitude. But critically, they form **closed loops** — start and end on themselves. No magnetic monopoles mean field lines have no sources or sinks.\n\nContrast with electric field lines, which start on \\(+\\) charges and end on \\(-\\). For a magnetic bar, lines go from N pole out around and back to S pole through the interior — a closed loop.\n\nMagnetic flux: \\(\\Phi_B = \\int \\vec{B}\\cdot d\\vec{A}\\), measured in webers (Wb) = T·m². Through a closed surface, net flux is always 0 (Gauss's law for magnetism) — what goes out must come back in.\n\nThis topological fact (no monopoles) has deep consequences: it's why Maxwell's equations are structured the way they are, and why electromagnetic waves exist at all.",
    keyIdeas: [
      "\\(\\vec{B}\\) is a vector field; units tesla.",
      "Field lines close on themselves.",
      "Flux through a closed surface is zero.",
      "Contrast with \\(\\vec{E}\\) lines, which start/end on charges.",
    ],
    commonMistakes: [
      "Drawing \\(\\vec{B}\\) lines that start or end at a pole (they don't; they continue through).",
      "Using electric analogy too aggressively — no magnetic monopoles.",
      "Forgetting flux is signed (direction of \\(\\vec{A}\\) matters).",
    ],
  },
  "4.4": {
    id: "4.4",
    title: "Monopole and Dipole Fields",
    summary:
      "There are no magnetic monopoles. The simplest magnetic source is a dipole — current loop, bar magnet, or atomic moment.",
    lesson:
      "An **electric monopole** (point charge) has a radial field \\(E \\propto 1/r^2\\). A magnetic monopole would behave similarly — but none has ever been observed. Magnetic sources are always at least dipoles.\n\n**Magnetic dipole field**: far from a small loop or bar magnet, the field is\n\n$$B \\sim \\frac{\\mu_0}{4\\pi}\\frac{2\\mu}{r^3}$$\n\non-axis (along the dipole axis). Falls as \\(1/r^3\\) — faster than a point charge's electric field (which falls as \\(1/r^2\\)).\n\nAn **electric dipole** (two opposite charges close together) similarly has \\(1/r^3\\) far field, because the two monopoles nearly cancel.\n\nEarth's field, a bar magnet's field, and far fields of wire loops all approximate dipole fields at distances much larger than the object.",
    keyIdeas: [
      "No magnetic monopoles; simplest source is a dipole.",
      "Dipole field magnitude \\(\\sim \\mu_0 \\mu / r^3\\).",
      "Falls faster than monopole \\(1/r^2\\).",
      "Same \\(1/r^3\\) law for electric dipoles.",
    ],
    commonMistakes: [
      "Treating Earth's field as a monopole field.",
      "Using \\(1/r^2\\) for dipole far field.",
      "Mixing up magnetic dipole and electric dipole formulas.",
    ],
  },
  "4.5": {
    id: "4.5",
    title: "Magnetic Fields and Forces",
    summary:
      "\\(\\vec{F} = q\\vec{v}\\times\\vec{B}\\) on a moving charge; \\(\\vec{F} = I\\vec{L}\\times\\vec{B}\\) on a current-carrying wire.",
    lesson:
      "Force on a moving charge in a magnetic field:\n\n$$\\vec{F} = q\\vec{v}\\times\\vec{B},$$\n\nmagnitude \\(F = qvB\\sin\\theta\\). The force is **perpendicular** to both \\(\\vec{v}\\) and \\(\\vec{B}\\); use the right-hand rule.\n\nConsequence: magnetic force does no work (always \\(\\perp\\) to \\(\\vec{v}\\)). It can change direction but not speed.\n\nCircular motion: a charge moving perpendicular to a uniform \\(\\vec{B}\\) travels in a circle of radius\n\n$$r = \\frac{mv}{qB}.$$\n\nPeriod: \\(T = 2\\pi m/(qB)\\) — independent of speed.\n\nForce on a current-carrying wire of length \\(\\vec{L}\\) in field \\(\\vec{B}\\):\n\n$$\\vec{F} = I\\vec{L}\\times\\vec{B}.$$\n\nThis is the principle behind electric motors: current in a loop in a magnetic field produces a torque.",
    keyIdeas: [
      "\\(F = qvB\\sin\\theta\\); perpendicular to both.",
      "Magnetic force does no work.",
      "Circular radius: \\(r = mv/(qB)\\).",
      "Wire force: \\(F = BIL\\sin\\theta\\).",
    ],
    workedExample: {
      prompt:
        "A proton moves at \\(10^6\\,\\text{m/s}\\) perpendicular to a 0.1 T field. Find the radius of its circular path.",
      solution:
        "\\(r = mv/(qB) = 1.67\\times 10^{-27} \\cdot 10^6 / (1.6\\times 10^{-19} \\cdot 0.1) \\approx 0.1\\,\\text{m}\\).",
    },
    commonMistakes: [
      "Forgetting the right-hand rule for direction.",
      "Using \\(F = qE\\) instead of \\(F = qvB\\) for magnetic force.",
      "Treating magnetic force as if it can change kinetic energy.",
    ],
    diagram: LORENTZ_FORCE_ANIMATION,
  },
  "4.6": {
    id: "4.6",
    title: "Forces Review",
    summary:
      "Combined electric and magnetic: \\(\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B})\\) — the Lorentz force.",
    lesson:
      "Total electromagnetic force on a charge:\n\n$$\\vec{F} = q\\vec{E} + q\\vec{v}\\times\\vec{B}.$$\n\nThis is the **Lorentz force**. Electric part pushes regardless of motion; magnetic part only acts on moving charges and is perpendicular to velocity.\n\n**Velocity selector**: crossed \\(\\vec{E}\\) and \\(\\vec{B}\\) fields with forces in opposition. A charge with \\(v = E/B\\) has zero net force — passes through. Others are deflected. Used in mass spectrometry.\n\n**Hall effect**: current in a conductor in a magnetic field causes a sideways accumulation of charge (Hall voltage). Lets you measure \\(\\vec{B}\\) in a semiconductor.\n\nFor a current-carrying wire, both forces combine — the electric force on individual carriers and the magnetic force on their motion. The net effect is the \\(I\\vec{L}\\times\\vec{B}\\) force.\n\nAlways choose the right tool: if the charge is stationary, only \\(\\vec{E}\\) matters; if there's no field but a magnet nearby, only \\(\\vec{B}\\); in most real systems, both.",
    keyIdeas: [
      "Lorentz: \\(\\vec{F} = q\\vec{E} + q\\vec{v}\\times\\vec{B}\\).",
      "Velocity selector: \\(v = E/B\\) passes through.",
      "Hall effect: sideways voltage in a current-carrying conductor in \\(\\vec{B}\\).",
      "Combine fields thoughtfully — include only what's present.",
    ],
    commonMistakes: [
      "Using only electric or only magnetic when both apply.",
      "Forgetting that magnetic force vanishes if \\(v = 0\\).",
      "Mixing up right-hand rule for \\(\\vec{v}\\times\\vec{B}\\).",
    ],
  },
  "4.7": {
    id: "4.7",
    title: "Magnetic Flux and Electromagnetic Induction",
    summary:
      "Magnetic flux \\(\\Phi_B = BA\\cos\\theta\\). Faraday's law: \\(\\varepsilon = -d\\Phi_B/dt\\). Lenz's law: induced current opposes the change.",
    lesson:
      "**Magnetic flux**:\n\n$$\\Phi_B = \\int \\vec{B}\\cdot d\\vec{A} = BA\\cos\\theta$$\n\nfor uniform field through a flat loop. Units: weber (Wb) = T·m².\n\n**Faraday's law**: a changing magnetic flux through a loop induces an electromotive force (EMF):\n\n$$\\varepsilon = -\\frac{d\\Phi_B}{dt}.$$\n\nSources of changing flux:\n1. Changing \\(\\vec{B}\\) (e.g., moving magnet).\n2. Changing area \\(A\\) (e.g., loop being pulled through a field).\n3. Changing orientation \\(\\theta\\) (e.g., rotating loop — generator).\n\n**Lenz's law**: the induced current flows in the direction such that its own magnetic field opposes the change in flux. If flux is increasing, induced current creates \\(\\vec{B}\\) opposing it; if decreasing, aiding it.\n\nThis is energy conservation in disguise — without Lenz's law, induction could create free energy.\n\nApplications: generators, transformers, induction stovetops, metal detectors.",
    keyIdeas: [
      "\\(\\Phi_B = BA\\cos\\theta\\); units weber.",
      "Faraday: \\(\\varepsilon = -d\\Phi_B/dt\\).",
      "Lenz: induced \\(I\\) opposes flux change.",
      "Three ways to change flux: \\(B, A, \\theta\\).",
    ],
    workedExample: {
      prompt:
        "A 0.01 m² loop in a uniform 0.2 T field perpendicular to the loop. If B drops to 0 in 0.5 s, find the induced EMF.",
      solution:
        "\\(\\Delta\\Phi = -0.2 \\cdot 0.01 = -0.002\\,\\text{Wb}\\). \\(\\varepsilon = -\\Delta\\Phi/\\Delta t = 0.002/0.5 = 4\\,\\text{mV}\\).",
    },
    commonMistakes: [
      "Getting the sign wrong in Faraday's law.",
      "Forgetting \\(\\cos\\theta\\) when loop isn't perpendicular.",
      "Applying Lenz to voltage instead of current direction.",
    ],
  },

  // =========================================================================
  // UNIT 5 — GEOMETRIC OPTICS
  // =========================================================================
  "5.1": {
    id: "5.1",
    title: "Waves and Fields",
    summary:
      "Light is an electromagnetic wave. It carries energy and momentum, propagates at \\(c\\) in vacuum, and has both wave and particle character.",
    lesson:
      "**Electromagnetic waves** are oscillations of electric and magnetic fields propagating through space. In vacuum they travel at \\(c = 3\\times 10^8\\,\\text{m/s}\\).\n\nSpectrum (by wavelength): radio → microwave → IR → visible (400-700 nm) → UV → X-ray → gamma. Energy per photon: \\(E = hf = hc/\\lambda\\), with \\(h = 6.63\\times 10^{-34}\\,\\text{J·s}\\).\n\nIn a medium, light slows to \\(v = c/n\\), where \\(n\\) is the **index of refraction** (\\(\\ge 1\\)). Air: \\(n \\approx 1\\). Water: \\(n \\approx 1.33\\). Glass: \\(n \\approx 1.5\\). Frequency stays the same; wavelength shrinks: \\(\\lambda_{\\text{medium}} = \\lambda_{\\text{vacuum}}/n\\).\n\nGeometric optics treats light as **rays** — good for objects much larger than \\(\\lambda\\). Wave optics (Unit 6) handles interference and diffraction.",
    keyIdeas: [
      "Light is an EM wave at speed \\(c\\) in vacuum.",
      "\\(E = hf = hc/\\lambda\\) per photon.",
      "\\(n = c/v\\) in a medium; \\(n \\ge 1\\).",
      "Geometric optics: rays; wave optics: interference.",
    ],
    commonMistakes: [
      "Calling light's medium required (it propagates in vacuum).",
      "Confusing frequency and wavelength when light enters a medium (frequency doesn't change).",
      "Using \\(E = hc/\\lambda\\) with \\(\\lambda\\) in the wrong units.",
    ],
  },
  "5.2": {
    id: "5.2",
    title: "Changes in Wave Properties",
    summary:
      "At an interface: reflection, transmission, and refraction. \\(n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2\\) (Snell's law).",
    lesson:
      "When a wave meets a boundary between two media, part reflects, part transmits (refracts).\n\n**Reflection**: angle of incidence = angle of reflection, measured from the normal. Holds for any wave.\n\n**Refraction** (transmission with bending): **Snell's law**:\n\n$$n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2.$$\n\nLight bends toward the normal when entering a denser (higher-\\(n\\)) medium; away from the normal when entering less dense.\n\n**Total internal reflection**: if light goes from high-\\(n\\) to low-\\(n\\), at large enough angles it reflects entirely (no transmitted ray). Critical angle: \\(\\sin\\theta_c = n_2/n_1\\).\n\nApplications: fiber optics (TIR keeps light trapped), prisms (dispersion: different \\(\\lambda\\) refract by different amounts).\n\nFrequency is preserved across the interface. Wavelength and speed change: \\(v = f\\lambda\\), with \\(v = c/n\\) and \\(\\lambda = \\lambda_0/n\\).",
    keyIdeas: [
      "Reflection: angle in = angle out.",
      "Snell: \\(n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2\\).",
      "Higher \\(n\\) → bend toward normal.",
      "Total internal reflection above critical angle (only when going to lower \\(n\\)).",
    ],
    workedExample: {
      prompt:
        "Light in water (\\(n = 1.33\\)) hits the surface at 30°. Find the angle of refraction into air (\\(n=1\\)).",
      solution:
        "\\(1.33 \\sin 30° = 1 \\sin\\theta_2 \\Rightarrow \\sin\\theta_2 = 0.665 \\Rightarrow \\theta_2 \\approx 41.7°\\).",
    },
    commonMistakes: [
      "Measuring angles from the surface instead of the normal.",
      "Applying TIR when going into a denser medium.",
      "Forgetting that frequency doesn't change across a boundary.",
    ],
  },
  "5.3": {
    id: "5.3",
    title: "Geometric Optics",
    summary:
      "Mirror and lens equations: \\(1/f = 1/d_o + 1/d_i\\). Magnification: \\(m = -d_i/d_o = h_i/h_o\\).",
    lesson:
      "For thin lenses and mirrors:\n\n$$\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i},$$\n\nwith \\(d_o\\) = object distance, \\(d_i\\) = image distance, \\(f\\) = focal length.\n\n**Magnification**:\n\n$$m = -\\frac{d_i}{d_o} = \\frac{h_i}{h_o}.$$\n\nSign convention (standard AP):\n- \\(d_o > 0\\) always (object in front).\n- \\(f > 0\\) for converging lenses and concave mirrors; \\(f < 0\\) for diverging lenses and convex mirrors.\n- \\(d_i > 0\\) real image (same side as outgoing light for lens; in front of mirror); \\(d_i < 0\\) virtual (other side).\n- \\(m > 0\\) upright; \\(m < 0\\) inverted.\n- \\(|m| > 1\\) enlarged; \\(|m| < 1\\) reduced.\n\n**Ray diagrams**: trace principal rays through focal points and center. Intersection = image location.\n\nTypes of images:\n- **Real**: light actually converges; can project on a screen.\n- **Virtual**: light appears to diverge from a point behind mirror/lens; cannot project.\n\nConverging lens with object beyond focal point: real, inverted. Object between focal point and lens: virtual, upright (like a magnifying glass). Diverging lens: always virtual, upright, reduced.",
    keyIdeas: [
      "\\(1/f = 1/d_o + 1/d_i\\); \\(m = -d_i/d_o\\).",
      "Focal length sign: converging \\(+\\), diverging \\(-\\).",
      "Real image: \\(d_i > 0\\); virtual: \\(d_i < 0\\).",
      "Ray diagrams: principal ray through F and through center.",
    ],
    workedExample: {
      prompt:
        "A 10-cm focal length converging lens has an object 15 cm in front. Find the image distance and magnification.",
      solution:
        "\\(1/10 = 1/15 + 1/d_i \\Rightarrow 1/d_i = 1/10 - 1/15 = 1/30 \\Rightarrow d_i = 30\\,\\text{cm}\\). \\(m = -30/15 = -2\\) (inverted, 2× enlarged). Real image.",
    },
    commonMistakes: [
      "Using \\(d_o + d_i = f\\) instead of the reciprocal equation.",
      "Flipping the sign convention.",
      "Forgetting the negative sign in \\(m\\) for lenses.",
    ],
  },

  // =========================================================================
  // UNIT 6 — WAVES, SOUND, AND PHYSICAL OPTICS
  // =========================================================================
  "6.1": {
    id: "6.1",
    title: "Periodic Waves",
    summary:
      "A wave is a disturbance that propagates with speed \\(v = f\\lambda\\). Transverse vs. longitudinal.",
    lesson:
      "A **wave** is a propagating disturbance that carries energy but not matter. Characterized by:\n- **Wavelength** \\(\\lambda\\): distance between consecutive peaks.\n- **Frequency** \\(f\\): cycles per second (Hz).\n- **Period** \\(T = 1/f\\).\n- **Amplitude** \\(A\\): maximum displacement.\n- **Speed** \\(v = f\\lambda\\): how fast the pattern moves.\n\n**Transverse wave**: medium oscillates perpendicular to propagation (waves on a string, EM waves).\n\n**Longitudinal wave**: medium oscillates along propagation (sound, pressure waves).\n\nWave speed depends on the medium, not on amplitude. For a string: \\(v = \\sqrt{T/\\mu}\\) with \\(T\\) tension, \\(\\mu\\) linear density. For sound in air: \\(v \\approx 343\\,\\text{m/s}\\) at room temperature. For EM in vacuum: \\(c = 3\\times 10^8\\,\\text{m/s}\\).",
    keyIdeas: [
      "\\(v = f\\lambda\\).",
      "Transverse: perpendicular; longitudinal: parallel.",
      "Speed depends on medium, not amplitude.",
      "EM waves travel in vacuum; sound doesn't.",
    ],
    commonMistakes: [
      "Saying speed depends on amplitude.",
      "Confusing transverse and longitudinal.",
      "Claiming sound propagates in vacuum.",
    ],
    diagram: WAVE_ANIMATION,
  },
  "6.2": {
    id: "6.2",
    title: "Interference and Superposition (Standing Waves)",
    summary:
      "Two waves at a point add linearly. Standing waves occur when a wave reflects and interferes with itself in a bounded medium.",
    lesson:
      "**Superposition**: when two waves meet, the total displacement is the sum of individual displacements.\n\n**Constructive interference**: crests align — amplitudes add.\n**Destructive interference**: crest meets trough — amplitudes subtract.\n\n**Standing waves**: a wave reflecting between fixed ends interferes with itself. For a string fixed at both ends of length \\(L\\), allowed wavelengths:\n\n$$\\lambda_n = \\frac{2L}{n},\\quad n = 1, 2, 3, \\ldots$$\n\n**Fundamental** (\\(n=1\\)): \\(\\lambda = 2L\\), one antinode. **Harmonics** (\\(n > 1\\)): more nodes/antinodes. Frequencies: \\(f_n = nv/(2L)\\).\n\nFor a pipe open at one end, closed at the other: \\(\\lambda_n = 4L/n\\) with only odd \\(n\\). Open both ends: same as string.\n\nStanding waves store energy in oscillations but don't transmit it — nodes never move.",
    keyIdeas: [
      "Superposition: amplitudes add.",
      "Standing waves on fixed-fixed string: \\(\\lambda_n = 2L/n\\).",
      "Closed-open pipe: odd harmonics only.",
      "Nodes are always at rest.",
    ],
    workedExample: {
      prompt:
        "A string 1 m long fixed at both ends has \\(v = 200\\,\\text{m/s}\\). Find the first three harmonic frequencies.",
      solution:
        "\\(f_n = nv/(2L) = n(200)/(2\\cdot 1) = 100n\\). \\(f_1 = 100\\,\\text{Hz}, f_2 = 200, f_3 = 300\\).",
    },
    commonMistakes: [
      "Using fixed-fixed formulas for open-closed pipe.",
      "Forgetting even harmonics don't exist in closed-open pipes.",
      "Confusing node and antinode locations.",
    ],
  },
  "6.3": {
    id: "6.3",
    title: "Interference and Superposition (Double Slit, Beats)",
    summary:
      "Double-slit: \\(d\\sin\\theta = m\\lambda\\). Beats: \\(f_{\\text{beat}} = |f_1 - f_2|\\).",
    lesson:
      "**Double-slit interference**: coherent light through two slits \\(d\\) apart produces bright fringes at\n\n$$d\\sin\\theta = m\\lambda, \\quad m = 0, \\pm 1, \\pm 2, \\ldots$$\n\nand dark fringes at \\(d\\sin\\theta = (m + \\tfrac{1}{2})\\lambda\\).\n\nOn a screen at distance \\(L\\), fringe spacing \\(\\Delta y \\approx \\lambda L/d\\).\n\nThis is Young's experiment — first evidence that light is a wave.\n\n**Beats**: two sound waves of nearby frequencies \\(f_1, f_2\\) produce a combined wave with slow amplitude modulation at frequency\n\n$$f_{\\text{beat}} = |f_1 - f_2|.$$\n\nA piano tuner listens for beats to match strings.\n\nBoth phenomena come from superposition. Light interference gives spatial patterns (fringes); beat phenomena give temporal patterns.",
    keyIdeas: [
      "Double-slit bright: \\(d\\sin\\theta = m\\lambda\\).",
      "Fringe spacing on screen: \\(\\Delta y \\approx \\lambda L/d\\).",
      "Beats: \\(f_{\\text{beat}} = |f_1 - f_2|\\).",
      "Both come from linear superposition.",
    ],
    commonMistakes: [
      "Using dark-fringe formula for bright fringes (or vice versa).",
      "Beat formula with sum instead of difference.",
      "Confusing \\(m\\lambda\\) vs. \\((m+1/2)\\lambda\\).",
    ],
  },
  "6.4": {
    id: "6.4",
    title: "Doppler Effect",
    summary:
      "Observed frequency shifts when source or observer moves: \\(f' = f(v \\pm v_o)/(v \\mp v_s)\\).",
    lesson:
      "When a wave source or observer moves through the medium, the observed frequency differs from the emitted frequency.\n\nFor sound in still air:\n\n$$f' = f\\,\\frac{v \\pm v_o}{v \\mp v_s},$$\n\nwhere \\(v\\) is the sound speed, \\(v_o\\) observer speed, \\(v_s\\) source speed, signs chosen so that motion toward raises \\(f\\), motion away lowers it.\n\nAmbulance approaching: higher pitch. Receding: lower pitch.\n\nFor light (relativistic Doppler): \\(f' = f\\sqrt{(1-\\beta)/(1+\\beta)}\\) for source receding at \\(v = \\beta c\\). At non-relativistic speeds: \\(\\Delta f/f \\approx -v_r/c\\) where \\(v_r\\) is radial velocity (positive if receding). Redshifted = receding; blueshifted = approaching. Astronomers use this to measure galaxy speeds.",
    keyIdeas: [
      "\\(f' = f(v \\pm v_o)/(v \\mp v_s)\\); toward raises frequency.",
      "Applies to sound in still air.",
      "Light: redshift (receding) and blueshift (approaching).",
      "Relativistic correction at high source speeds.",
    ],
    workedExample: {
      prompt:
        "A siren emits 500 Hz while moving toward a stationary observer at 20 m/s. Sound speed 340 m/s. Find the observed frequency.",
      solution:
        "\\(f' = 500 \\cdot 340/(340 - 20) = 500 \\cdot 340/320 \\approx 531\\,\\text{Hz}\\).",
    },
    commonMistakes: [
      "Getting signs wrong — check whether motion raises or lowers the frequency.",
      "Using the sound formula for light without caveat.",
      "Confusing source with observer motion.",
    ],
  },
  "6.5": {
    id: "6.5",
    title: "Electromagnetic Waves",
    summary:
      "EM waves: oscillating \\(\\vec{E}\\) and \\(\\vec{B}\\) perpendicular to each other and to propagation. Speed \\(c\\) in vacuum.",
    lesson:
      "Maxwell's equations predict that a changing electric field generates a magnetic field and vice versa. This coupled oscillation propagates as an **electromagnetic wave**:\n\n- \\(\\vec{E}\\) and \\(\\vec{B}\\) oscillate perpendicular to each other and to the direction of propagation.\n- They're in phase — peak when the other peaks.\n- Ratio: \\(E/B = c\\).\n- Speed in vacuum: \\(c = 1/\\sqrt{\\mu_0 \\varepsilon_0} = 3\\times 10^8\\,\\text{m/s}\\).\n\nThe **EM spectrum** spans radio (long \\(\\lambda\\), low \\(f\\)) to gamma (short \\(\\lambda\\), high \\(f\\)). Visible light: 400-700 nm.\n\nEM waves carry energy and momentum. Intensity \\(S = cB_0^2/(2\\mu_0) = c\\varepsilon_0 E_0^2/2\\). They exert radiation pressure on surfaces — basis of solar sails.\n\nNo medium required — EM waves travel through vacuum.",
    keyIdeas: [
      "\\(\\vec{E}\\perp\\vec{B}\\perp\\) propagation.",
      "In phase; \\(E/B = c\\).",
      "\\(c = 1/\\sqrt{\\mu_0 \\varepsilon_0}\\); no medium needed.",
      "Carry energy and momentum (radiation pressure).",
    ],
    commonMistakes: [
      "Drawing \\(\\vec{E}\\) and \\(\\vec{B}\\) parallel.",
      "Claiming EM waves need a medium.",
      "Confusing wavelength and frequency relation across the spectrum.",
    ],
    diagram: EM_WAVE_ANIMATION,
  },

  // =========================================================================
  // UNIT 7 — MODERN PHYSICS
  // =========================================================================
  "7.1": {
    id: "7.1",
    title: "Systems and Fundamental Forces",
    summary:
      "Four fundamental forces: strong, electromagnetic, weak, gravity. Strong and weak act at subatomic scales; EM and gravity are long-range.",
    lesson:
      "The known fundamental forces:\n- **Strong nuclear**: binds quarks in protons/neutrons and nucleons in nuclei. Ultra-strong, short-range (\\(\\sim 10^{-15}\\) m).\n- **Electromagnetic**: between charges. Long-range, inverse-square. Screened in neutral matter.\n- **Weak nuclear**: mediates beta decay and neutrino interactions. Very short-range, relatively weak.\n- **Gravity**: between masses. Long-range, always attractive, vastly weaker than others at particle scales.\n\nRelative strengths (for two protons at short range): strong : EM : weak : gravity \\(\\approx 1 : 10^{-2} : 10^{-6} : 10^{-38}\\).\n\nEM and weak are unified at high energies into the **electroweak** force. The Standard Model unifies EM, weak, and strong — but gravity resists unification so far.\n\nAt normal distances and energies, you only worry about EM (for chemistry, electronics) and gravity (for motion, orbits). Strong and weak are only relevant in nuclei.",
    keyIdeas: [
      "Four fundamental forces: strong, EM, weak, gravity.",
      "Ranges: strong/weak short; EM/gravity long.",
      "Gravity is vastly weaker than the others at particle scales.",
      "Standard Model unifies three; gravity isn't unified.",
    ],
    commonMistakes: [
      "Equating strong and weak forces (they're very different).",
      "Thinking gravity dominates at all scales (only at astronomical ones).",
      "Forgetting screening makes bulk EM forces small.",
    ],
  },
  "7.2": {
    id: "7.2",
    title: "Radioactive Decay",
    summary:
      "Unstable nuclei decay by emitting particles: alpha (\\(^4\\)He), beta (\\(e^\\pm\\)), gamma (\\(\\gamma\\)). \\(N(t) = N_0 e^{-\\lambda t}\\).",
    lesson:
      "**Radioactive decay** is the spontaneous transformation of an unstable nucleus.\n\nTypes:\n- **Alpha** \\((\\alpha)\\): emission of a helium-4 nucleus (2 protons + 2 neutrons). Reduces Z by 2, A by 4.\n- **Beta-minus** \\((\\beta^-)\\): a neutron → proton + electron + antineutrino. Z up by 1, A same.\n- **Beta-plus** \\((\\beta^+)\\): a proton → neutron + positron + neutrino. Z down by 1, A same.\n- **Gamma** \\((\\gamma)\\): photon emission after other decays. Z and A unchanged.\n\n**Exponential decay**: \\(N(t) = N_0 e^{-\\lambda t}\\), where \\(\\lambda\\) is the decay constant (s⁻¹). **Half-life**: \\(t_{1/2} = \\ln 2/\\lambda\\).\n\nDecay rate (activity): \\(R = \\lambda N\\). Units: becquerel (Bq) = 1 decay/s.\n\nConservation laws: charge, baryon number, and total energy (including mass-energy) are conserved in each decay.",
    keyIdeas: [
      "Alpha (\\(^4\\)He), beta-minus (\\(e^-\\)), beta-plus (\\(e^+\\)), gamma (\\(\\gamma\\)).",
      "\\(N = N_0 e^{-\\lambda t}\\); \\(t_{1/2} = \\ln 2/\\lambda\\).",
      "Conservation of charge, baryon number, energy.",
      "Activity \\(R = \\lambda N\\) in becquerels.",
    ],
    workedExample: {
      prompt:
        "A 10 g sample has half-life 2 days. How much remains after 6 days?",
      solution:
        "After 3 half-lives: \\((1/2)^3 = 1/8\\). Remaining: \\(10/8 = 1.25\\) g.",
    },
    commonMistakes: [
      "Confusing half-life with mean life (\\(1/\\lambda\\)).",
      "Wrong \\(\\Delta Z, \\Delta A\\) for each decay type.",
      "Forgetting neutrino or antineutrino in beta decay (conservation requires them).",
    ],
  },
  "7.3": {
    id: "7.3",
    title: "Energy in Modern Physics",
    summary:
      "Nuclear binding energy and mass defect. \\(E = mc^2\\) accounts for mass converted to energy in nuclear reactions.",
    lesson:
      "The **mass defect** of a nucleus: the sum of free-nucleon masses exceeds the actual nuclear mass. The difference is binding energy:\n\n$$\\Delta m = Zm_p + Nm_n - M_{\\text{nucleus}},\\quad E_b = \\Delta m c^2.$$\n\nTypical binding energies are \\(\\sim 8\\,\\text{MeV}\\) per nucleon. Fe-56 has the highest binding energy per nucleon, making it the endpoint of fusion in stars.\n\nNuclear reactions release or absorb energy equal to \\(c^2\\) times the mass difference. Fusion (light nuclei combining) and fission (heavy nuclei splitting) both produce products with higher binding energy per nucleon than reactants, releasing energy.\n\n**Mass-energy equivalence**: any energy equivalently corresponds to mass \\(E/c^2\\). Chemical reactions' mass changes are tiny (binding energies \\(\\sim\\) eV); nuclear are millions of times larger.\n\nThis is why nuclear fuel is so energy-dense: a kilogram of uranium produces roughly \\(10^{14}\\,\\text{J}\\) via fission — millions of times more than burning a kilogram of coal.",
    keyIdeas: [
      "Mass defect: free nucleon mass − bound nucleus mass.",
      "Binding energy: \\(E_b = \\Delta m c^2\\).",
      "Fe-56 is peak binding per nucleon.",
      "Fusion/fission release energy by moving toward Fe.",
    ],
    commonMistakes: [
      "Forgetting \\(c^2\\) factor.",
      "Using atomic masses without accounting for electrons.",
      "Thinking all nuclear reactions release energy (only those that move toward higher binding per nucleon).",
    ],
  },
  "7.4": {
    id: "7.4",
    title: "Mass-Energy Equivalence",
    summary:
      "\\(E = mc^2\\). Mass is a form of energy; conversions occur in nuclear reactions, pair production, and annihilation.",
    lesson:
      "**\\(E = mc^2\\)** from special relativity: rest mass \\(m\\) is equivalent to energy \\(mc^2\\). For a particle with kinetic energy \\(K\\), total energy is \\(E = \\gamma mc^2\\) with \\(\\gamma = 1/\\sqrt{1-v^2/c^2}\\); for \\(v \\ll c\\), \\(K \\approx \\tfrac{1}{2}mv^2\\).\n\nProcesses where mass ↔ energy:\n- **Nuclear reactions**: fusion and fission (see 7.3).\n- **Pair production**: a photon (\\(\\ge 2m_e c^2 = 1.022\\,\\text{MeV}\\)) creates an electron-positron pair near a nucleus.\n- **Annihilation**: an electron and positron annihilate to two gamma photons of total energy \\(2m_e c^2\\).\n\n1 atomic mass unit (u) corresponds to \\(931.5\\,\\text{MeV}\\). Memorize — it's on the AP formula sheet.\n\nThe equivalence doesn't mean \"you can get energy from anywhere by converting mass\" — you need a reaction that's energetically favorable. Binding energy differences power reactors; fusion releases energy because helium has more binding per nucleon than hydrogen.",
    keyIdeas: [
      "\\(E = mc^2\\); mass and energy are equivalent.",
      "1 u = 931.5 MeV.",
      "Pair production: \\(\\gamma \\to e^+ + e^-\\) needs \\(\\ge 1.022\\,\\text{MeV}\\).",
      "Annihilation: \\(e^+ + e^- \\to 2\\gamma\\).",
    ],
    commonMistakes: [
      "Using \\(E = mc^2\\) for kinetic energy of a moving particle (use total energy formula).",
      "Forgetting the \\(\\ge 2m_e c^2\\) threshold for pair production.",
      "Conflating rest mass with relativistic mass.",
    ],
  },
  "7.5": {
    id: "7.5",
    title: "Properties of Waves and Particles",
    summary:
      "Particles (electrons, photons, etc.) have wave-like properties: \\(\\lambda = h/p\\) (de Broglie). Waves have particle-like properties.",
    lesson:
      "**Wave-particle duality**: every quantum object has both wave and particle characteristics.\n\n**Photons** (light particles): energy \\(E = hf\\), momentum \\(p = E/c = h/\\lambda\\). Observed as discrete quanta in the photoelectric effect and Compton scattering.\n\n**Matter waves** (electrons, atoms): de Broglie wavelength\n\n$$\\lambda = \\frac{h}{p} = \\frac{h}{mv}.$$\n\nAn electron in a 100 V accelerator has \\(\\lambda \\sim 0.12\\,\\text{nm}\\) — comparable to atomic spacings, explaining electron diffraction.\n\nFor macroscopic objects, \\(\\lambda\\) is absurdly tiny (a thrown ball has \\(\\lambda \\sim 10^{-34}\\,\\text{m}\\)) — why we never see \"wave behavior\" in everyday life.\n\n**Heisenberg uncertainty**: \\(\\Delta x\\,\\Delta p \\ge \\hbar/2\\). Position and momentum can't both be perfectly known. Only relevant at quantum scales.",
    keyIdeas: [
      "Photon: \\(E = hf\\), \\(p = h/\\lambda\\).",
      "Matter wave: \\(\\lambda = h/p\\).",
      "Classical objects have tiny \\(\\lambda\\) — wave behavior hidden.",
      "Uncertainty: \\(\\Delta x\\,\\Delta p \\ge \\hbar/2\\).",
    ],
    workedExample: {
      prompt:
        "An electron has kinetic energy \\(100\\,\\text{eV}\\). Find its de Broglie wavelength.",
      solution:
        "\\(p = \\sqrt{2mK}\\); with \\(K = 100\\,\\text{eV} = 1.6\\times 10^{-17}\\,\\text{J}\\), \\(p = \\sqrt{2\\cdot 9.1\\times 10^{-31}\\cdot 1.6\\times 10^{-17}} \\approx 5.4\\times 10^{-24}\\,\\text{kg·m/s}\\). \\(\\lambda = h/p \\approx 0.12\\,\\text{nm}\\).",
    },
    commonMistakes: [
      "Applying \\(\\lambda = h/p\\) with eV units directly (convert to SI).",
      "Treating macroscopic objects as quantum (their \\(\\lambda\\) is unobservably small).",
      "Confusing wave-particle duality with \"it's both at the same time\" — it's neither; it's quantum.",
    ],
  },
  "7.6": {
    id: "7.6",
    title: "Photoelectric Effect",
    summary:
      "Light above a threshold frequency ejects electrons from a metal. \\(KE_{\\max} = hf - \\phi\\) (Einstein).",
    lesson:
      "Shining light on a metal surface can eject electrons. The **photoelectric effect** gave Einstein a 1905 paper that turned out to be his Nobel-winning work.\n\nKey observations:\n- Ejection happens only above a threshold frequency \\(f_0\\) (material-dependent).\n- Above threshold, maximum KE of emitted electrons increases linearly with \\(f\\), independent of intensity.\n- Intensity affects the *number* of emitted electrons, not their energy.\n- Emission is essentially instantaneous.\n\nClassical wave theory predicted the opposite (more intensity = more energy, with a time lag). Einstein's quantum explanation: light comes in discrete photons of energy \\(hf\\). A single photon either ejects an electron or doesn't — energy from one photon doesn't add up over time.\n\n**Einstein's equation**: \\(KE_{\\max} = hf - \\phi\\), where \\(\\phi\\) is the **work function** (material-specific, minimum energy to eject). Threshold: \\(hf_0 = \\phi\\).\n\nConsequences: photoelectric cells, solar panels, image sensors. And the first concrete evidence that light is quantized.",
    keyIdeas: [
      "Einstein: \\(KE_{\\max} = hf - \\phi\\).",
      "Threshold frequency: \\(f_0 = \\phi/h\\).",
      "Intensity affects current, not electron energy.",
      "Classical theory fails; quantum succeeds.",
    ],
    workedExample: {
      prompt:
        "Light of wavelength 300 nm hits a metal with work function 2.0 eV. Find the maximum KE of ejected electrons.",
      solution:
        "\\(hf = hc/\\lambda = 1240\\,\\text{eV·nm}/300 \\approx 4.13\\,\\text{eV}\\). \\(KE_{\\max} = 4.13 - 2.0 = 2.13\\,\\text{eV}\\).",
    },
    commonMistakes: [
      "Using intensity in the energy calculation.",
      "Forgetting to convert \\(\\phi\\) to matching units.",
      "Treating the effect as a wave phenomenon.",
    ],
    diagram: PHOTOELECTRIC_ANIMATION,
  },
  "7.7": {
    id: "7.7",
    title: "Wave Functions and Probability",
    summary:
      "A quantum particle is described by a wave function \\(\\psi\\). \\(|\\psi|^2\\) gives the probability density of finding the particle.",
    lesson:
      "In quantum mechanics, a particle's state is described by a **wave function** \\(\\psi(x,t)\\) — a complex-valued function of position and time. Its magnitude-squared gives probability density:\n\n$$P(x) = |\\psi(x)|^2.$$\n\nTotal probability of finding the particle somewhere must be 1: \\(\\int |\\psi|^2\\,dx = 1\\).\n\nObservables (position, momentum, energy) have **expectation values** — average results over many measurements of identically-prepared systems. A quantum particle doesn't \"have\" a position until measured; it has a distribution of possible positions.\n\nThe **measurement** collapses the wave function: after measurement, the particle has a definite value (for that observable), and the wave function changes accordingly.\n\nStandard models:\n- Particle in a box: \\(\\psi_n = \\sqrt{2/L}\\sin(n\\pi x/L)\\); energies \\(E_n = n^2 h^2/(8mL^2)\\). Discrete!\n- Hydrogen atom: discrete energy levels \\(E_n = -13.6/n^2\\,\\text{eV}\\).\n\nDiscreteness of bound states is central. Atoms emit/absorb photons only at specific wavelengths matching energy-level differences — explaining atomic spectra (Balmer series, etc.).",
    keyIdeas: [
      "Wave function \\(\\psi\\); probability density \\(|\\psi|^2\\).",
      "Normalization: \\(\\int |\\psi|^2 = 1\\).",
      "Bound states have discrete energies.",
      "Atoms emit/absorb photons at specific energy differences.",
    ],
    commonMistakes: [
      "Treating \\(\\psi\\) as directly observable (only \\(|\\psi|^2\\) is).",
      "Forgetting the quantization of bound-state energies.",
      "Applying classical trajectories to quantum particles.",
    ],
  },
};
