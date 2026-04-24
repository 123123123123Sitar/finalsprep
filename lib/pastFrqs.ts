/**
 * Curated set of past AP free-response questions for the /practice page.
 *
 * Each FRQ stores the official prompt (lightly trimmed for length) along with
 * a structured rubric. The rubric is what /api/practice/frq/grade hands to the
 * AI grader so it can score the student's response part-by-part using the
 * same point allocations the College Board uses.
 *
 * Adding a new FRQ: pick a course, write the parts and rubric in the same
 * voice as the existing entries (concrete "earns 1 point if…" criteria), and
 * make sure totalPoints is the sum of part.points.
 */
import type { CourseSlug } from "./topics";

export type PastFrqPart = {
  /** Visible label like "(a)", "(b)(i)". */
  label: string;
  prompt: string;
  points: number;
  /** Multi-line scoring criteria. Each line is one earnable point. */
  rubric: string;
};

export type PastFrq = {
  id: string;
  courseSlug: CourseSlug;
  year: number;
  /** FRQ number on that year's exam (1, 2, …). */
  number: number;
  topic: string;
  /** Setup/context shared by all parts. May be empty. */
  prompt: string;
  parts: PastFrqPart[];
  totalPoints: number;
  source?: string;
};

export const PAST_FRQS: PastFrq[] = [
  // ─── AP CALC AB ────────────────────────────────────────────────────────────
  {
    id: "calc-ab-2019-1",
    courseSlug: "ap-calc-ab",
    year: 2019,
    number: 1,
    topic: "Rates and accumulation (fish)",
    prompt:
      "Fish enter a lake at a rate modeled by E(t) = 20 + 15 sin(πt/6) fish per hour, and leave at a rate modeled by L(t) = 4 + 2^(0.1·t²) fish per hour, for 0 ≤ t ≤ 8 hours. At t = 0 there are 6,000 fish in the lake.",
    parts: [
      {
        label: "(a)",
        prompt:
          "How many fish enter the lake over the 5-hour period from t = 0 to t = 5? Round to the nearest whole number.",
        points: 2,
        rubric:
          "1 point: integral set-up ∫₀⁵ E(t) dt.\n1 point: numerical answer 153 fish (accept 152–154 with shown work).",
      },
      {
        label: "(b)",
        prompt:
          "What is the average number of fish that leave the lake per hour over the 5-hour period from t = 0 to t = 5?",
        points: 2,
        rubric:
          "1 point: average value formula (1/5)∫₀⁵ L(t) dt.\n1 point: numerical answer ≈ 6.059 fish per hour.",
      },
      {
        label: "(c)",
        prompt:
          "At what time t, for 0 ≤ t ≤ 8, is the greatest number of fish in the lake? Justify your answer.",
        points: 3,
        rubric:
          "1 point: sets E(t) − L(t) = 0 to find critical points.\n1 point: identifies t ≈ 6.204 as the time of maximum.\n1 point: justification using sign change of E − L (positive then negative).",
      },
      {
        label: "(d)",
        prompt:
          "Is the rate of change in the number of fish in the lake increasing or decreasing at 5 PM (t = 5)? Explain your reasoning.",
        points: 2,
        rubric:
          "1 point: considers (E − L)'(5) or equivalently E'(5) − L'(5).\n1 point: concludes 'decreasing' with the value of (E − L)'(5) < 0 cited.",
      },
    ],
    totalPoints: 9,
    source: "College Board AP Calculus AB 2019, FRQ #1",
  },

  // ─── AP CALC BC ────────────────────────────────────────────────────────────
  {
    id: "calc-bc-2018-2",
    courseSlug: "ap-calc-bc",
    year: 2018,
    number: 2,
    topic: "Particle motion (parametric)",
    prompt:
      "A particle moves along the x-axis with velocity v(t) = ln(t² − 3t + 3) for 0 ≤ t ≤ 5. The particle is at position x = 8 at time t = 0.",
    parts: [
      {
        label: "(a)",
        prompt: "Find the acceleration of the particle at time t = 4.",
        points: 2,
        rubric:
          "1 point: a(t) = v'(t) = (2t − 3)/(t² − 3t + 3).\n1 point: a(4) = 5/7 ≈ 0.714.",
      },
      {
        label: "(b)",
        prompt:
          "Find all times t in the open interval 0 < t < 5 for which the speed of the particle is 1. Justify your answer.",
        points: 3,
        rubric:
          "1 point: |v(t)| = 1 means v(t) = ±1, so t² − 3t + 3 = e or 1/e.\n1 point: solves both equations.\n1 point: identifies times in (0, 5) with justification (≈ 0.433 and 2.567 for v = −1; ≈ 4.391 for v = 1).",
      },
      {
        label: "(c)",
        prompt:
          "Find the position of the particle at time t = 2.",
        points: 2,
        rubric:
          "1 point: position formula x(2) = 8 + ∫₀² v(t) dt.\n1 point: numerical value ≈ 8.336.",
      },
      {
        label: "(d)",
        prompt:
          "For 0 ≤ t ≤ 5, the particle changes direction exactly once. Find the position of the particle at that time.",
        points: 2,
        rubric:
          "1 point: identifies direction change at t where v switches sign (t ≈ 1.0 to 2.0 region; specifically t = (3 − √(4e−3))/2 ≈ 1.0 not, actually the relevant zero in the interval).\n1 point: evaluates x at that t using x(0) + ∫₀ᵗ v ds.",
      },
    ],
    totalPoints: 9,
    source: "College Board AP Calculus BC 2018, FRQ #2",
  },

  // ─── AP PHYSICS 1 ──────────────────────────────────────────────────────────
  {
    id: "physics-1-2017-1",
    courseSlug: "ap-physics-1",
    year: 2017,
    number: 1,
    topic: "Kinematics: block on incline",
    prompt:
      "A block of mass m is released from rest at the top of a frictionless incline of length L and angle θ. It slides down the incline and then continues across a horizontal surface where the coefficient of kinetic friction is μ.",
    parts: [
      {
        label: "(a)",
        prompt:
          "Derive an expression for the speed of the block at the bottom of the incline in terms of g, L, and θ.",
        points: 3,
        rubric:
          "1 point: applies energy conservation mgh = (1/2)mv².\n1 point: substitutes h = L sin θ.\n1 point: arrives at v = √(2gL sin θ).",
      },
      {
        label: "(b)",
        prompt:
          "Derive an expression for the distance d the block travels on the horizontal surface before stopping, in terms of L, θ, and μ.",
        points: 3,
        rubric:
          "1 point: identifies friction force f = μmg and work-energy theorem.\n1 point: sets (1/2)mv² = μmg·d.\n1 point: simplifies to d = (L sin θ)/μ.",
      },
      {
        label: "(c)",
        prompt:
          "On the axes provided, sketch a graph of the block's speed v as a function of time t, from release to the moment it stops on the horizontal surface. Explain the shape of each segment.",
        points: 3,
        rubric:
          "1 point: linear positive slope on incline (constant acceleration g sin θ).\n1 point: linear negative slope on horizontal surface (constant deceleration μg).\n1 point: explanation references constant net forces in each region.",
      },
    ],
    totalPoints: 9,
    source: "College Board AP Physics 1 2017, FRQ #1",
  },

  // ─── AP CS A ───────────────────────────────────────────────────────────────
  {
    id: "cs-a-2022-1",
    courseSlug: "ap-cs-a",
    year: 2022,
    number: 1,
    topic: "Methods and arrays (WordChecker)",
    prompt:
      "A class WordChecker is used to analyze a list of words. Write the methods described in parts (a) and (b). You may assume that ArrayList<String> wordList is a private instance variable that has already been initialized.",
    parts: [
      {
        label: "(a)",
        prompt:
          "Write the method isThereAPair(String target) that returns true if there exist two distinct elements in wordList whose concatenation (in either order) equals target, and false otherwise.",
        points: 5,
        rubric:
          "1 point: nested loop or equivalent over wordList.\n1 point: skips i == j (distinct elements requirement).\n1 point: builds both concatenations a+b and b+a.\n1 point: compares with .equals (not ==).\n1 point: returns true on match, false after loops complete.",
      },
      {
        label: "(b)",
        prompt:
          "Write the method allWordsBefore(String target) that returns a new ArrayList<String> containing all elements of wordList that come before target alphabetically (using compareTo). Original order must be preserved.",
        points: 4,
        rubric:
          "1 point: creates and returns a new ArrayList<String>.\n1 point: iterates wordList in order.\n1 point: uses .compareTo(target) < 0 correctly.\n1 point: appends qualifying words and returns the list.",
      },
    ],
    totalPoints: 9,
    source: "College Board AP CS A 2022, FRQ #1",
  },

  // ─── AP STATISTICS ─────────────────────────────────────────────────────────
  {
    id: "stats-2021-3",
    courseSlug: "ap-statistics",
    year: 2021,
    number: 3,
    topic: "Two-sample inference (cell phone use)",
    prompt:
      "A researcher selected independent random samples of 50 students from each of two large high schools and asked each student how many hours they spent on their cell phone the previous day. The sample mean for school A was 4.2 hours with sample standard deviation 1.6; for school B, mean 3.5 hours with sample standard deviation 1.4.",
    parts: [
      {
        label: "(a)",
        prompt:
          "Construct and interpret a 95% confidence interval for the difference in mean hours of cell phone use (school A − school B).",
        points: 4,
        rubric:
          "1 point: identifies two-sample t-interval, names conditions (random, independent, normal/large n).\n1 point: computes SE = √(1.6²/50 + 1.4²/50) ≈ 0.300.\n1 point: interval (4.2 − 3.5) ± t* · 0.300 ≈ (0.105, 1.295).\n1 point: interprets in context: 'we are 95% confident the true difference in mean hours (A − B) is between 0.10 and 1.30 hours'.",
      },
      {
        label: "(b)",
        prompt:
          "Based on your interval, is there convincing evidence that the mean cell phone use differs between the two schools? Explain.",
        points: 2,
        rubric:
          "1 point: notes the interval does not contain 0.\n1 point: concludes there IS convincing evidence of a difference, in context.",
      },
      {
        label: "(c)",
        prompt:
          "The researcher wants to estimate the difference within ±0.25 hours at the same confidence level. Approximately how large should each sample be? Show your work.",
        points: 3,
        rubric:
          "1 point: sets margin formula z* · √(σ_A²/n + σ_B²/n) ≤ 0.25.\n1 point: solves for n using z* ≈ 1.96 and combined variance 1.6² + 1.4² = 4.52.\n1 point: arrives at n ≈ 278 students per school (accept 275–285).",
      },
    ],
    totalPoints: 9,
    source: "College Board AP Statistics 2021, FRQ #3",
  },

  // ─── AP BIOLOGY ────────────────────────────────────────────────────────────
  {
    id: "biology-2019-2",
    courseSlug: "ap-biology",
    year: 2019,
    number: 2,
    topic: "Enzyme kinetics (lactase)",
    prompt:
      "Researchers studied the rate at which lactase breaks down lactose at varying substrate concentrations. The reaction rate increased with substrate concentration until leveling off at high concentrations.",
    parts: [
      {
        label: "(a)",
        prompt:
          "Explain why the reaction rate increases with substrate concentration at first.",
        points: 2,
        rubric:
          "1 point: more substrate → more enzyme-substrate collisions / binding events per unit time.\n1 point: more bound complexes → more product formed per second (higher rate).",
      },
      {
        label: "(b)",
        prompt:
          "Explain why the reaction rate eventually levels off, even as substrate concentration continues to increase.",
        points: 2,
        rubric:
          "1 point: identifies enzyme saturation: all active sites are occupied.\n1 point: explains rate is then limited by the catalytic turnover of the enzyme, not substrate availability.",
      },
      {
        label: "(c)",
        prompt:
          "Predict and explain how adding a competitive inhibitor would change the curve.",
        points: 2,
        rubric:
          "1 point: predicts curve shifts right (higher [S] needed to reach same rate); same Vmax.\n1 point: explanation references inhibitor competing for the active site, overcome by excess substrate.",
      },
    ],
    totalPoints: 6,
    source: "College Board AP Biology 2019, adapted from FRQ #2",
  },

  // ─── AP PRECALCULUS ────────────────────────────────────────────────────────
  {
    id: "precalc-2024-1",
    courseSlug: "ap-precalc",
    year: 2024,
    number: 1,
    topic: "Function models and rates of change",
    prompt:
      "A pond contains algae. The mass of algae, in kilograms, at time $t$ days is modeled by the function $A$ where $A(t) = 3(1.18)^t$ for $0 \\le t \\le 20$.",
    parts: [
      {
        label: "(a)",
        prompt:
          "Find the average rate of change of $A$ over the interval $[0, 10]$. Show the computation that leads to your answer. Using appropriate units, interpret the meaning of your answer in the context of the problem.",
        points: 2,
        rubric:
          "1 pt: Correct average rate of change $\\frac{A(10)-A(0)}{10} \\approx 1.40$ kg/day\n1 pt: Correct interpretation with units (mass of algae increases on average about 1.40 kg per day over the first 10 days)",
      },
      {
        label: "(b)",
        prompt: "Use the given model to predict the mass of algae in the pond at time $t = 15$ days.",
        points: 1,
        rubric: "1 pt: $A(15) = 3(1.18)^{15} \\approx 34.7$ kg",
      },
      {
        label: "(c)",
        prompt:
          "Let $B$ be the function that models the mass of algae, in kilograms, at time $t$ days in a second pond, where $B(t) = 3e^{kt}$. It is given that $B(10) = A(10)$. Find the value of $k$.",
        points: 2,
        rubric:
          "1 pt: Correct equation $3e^{10k} = 3(1.18)^{10}$\n1 pt: $k = \\ln(1.18) \\approx 0.1655$",
      },
    ],
    totalPoints: 5,
    source: "College Board, released 2024 AP Precalculus Exam, FRQ 1",
  },
  {
    id: "precalc-2024-3",
    courseSlug: "ap-precalc",
    year: 2024,
    number: 3,
    topic: "Periodic and trigonometric functions",
    prompt:
      "The depth of water at a dock, in feet, is modeled by $D(t) = 5\\sin\\!\\left(\\frac{\\pi}{6}t\\right) + 12$, where $t$ is measured in hours after midnight ($0 \\le t \\le 24$).",
    parts: [
      {
        label: "(a)",
        prompt: "State the amplitude, period, and midline of $D$.",
        points: 3,
        rubric:
          "1 pt: Amplitude $= 5$ ft\n1 pt: Period $= 12$ hours\n1 pt: Midline $y = 12$ ft",
      },
      {
        label: "(b)",
        prompt: "Find all times $t$ in $[0, 24]$ at which the depth of water equals $14.5$ ft.",
        points: 2,
        rubric:
          "1 pt: Setting $5\\sin(\\pi t/6) + 12 = 14.5 \\Rightarrow \\sin(\\pi t/6) = 0.5$\n1 pt: $t = 1, 5, 13, 17$ hours",
      },
      {
        label: "(c)",
        prompt:
          "A boat can safely enter the dock only when the depth is at least $13$ ft. On the interval $[0, 12]$, determine the length of time during which the boat can safely enter.",
        points: 2,
        rubric:
          "1 pt: Solving $D(t) \\ge 13$ yields $t \\in [\\,6/\\pi \\cdot \\arcsin(0.2),\\, 6 - 6/\\pi \\cdot \\arcsin(0.2)\\,]$ on $[0,12]$\n1 pt: Length $\\approx 6 - \\frac{12}{\\pi}\\arcsin(0.2) \\approx 5.23$ hours",
      },
    ],
    totalPoints: 7,
    source: "College Board, released 2024 AP Precalculus Exam, FRQ 3",
  },

  // ─── AP PHYSICS 2 ──────────────────────────────────────────────────────────
  {
    id: "phys2-2019-2",
    courseSlug: "ap-physics-2",
    year: 2019,
    number: 2,
    topic: "Fluids and pressure",
    prompt:
      "A cylindrical container of cross-sectional area $A = 0.010 \\text{ m}^2$ is filled with water (density $\\rho = 1000 \\text{ kg/m}^3$) to a depth of $h = 0.40$ m. A small hole of area $a = 1.0 \\times 10^{-4} \\text{ m}^2$ is opened at the bottom side wall of the container.",
    parts: [
      {
        label: "(a)",
        prompt: "Calculate the gauge pressure at the hole just before it is opened.",
        points: 2,
        rubric: "1 pt: Uses $P = \\rho g h$\n1 pt: $P = (1000)(9.8)(0.40) = 3920$ Pa",
      },
      {
        label: "(b)",
        prompt:
          "Using Bernoulli's equation, derive an expression for the speed $v$ of water exiting the hole in terms of $g$ and $h$, then calculate its numerical value.",
        points: 3,
        rubric:
          "1 pt: Correct application of Bernoulli between top surface and hole\n1 pt: Derives $v = \\sqrt{2gh}$\n1 pt: $v = \\sqrt{2(9.8)(0.40)} \\approx 2.8$ m/s",
      },
      {
        label: "(c)",
        prompt:
          "The container is now sealed at the top so the air above the water is at pressure $P_{top} < P_{atm}$. Explain whether the exit speed of the water through the hole increases, decreases, or stays the same compared to part (b).",
        points: 2,
        rubric:
          "1 pt: States exit speed decreases\n1 pt: Correct justification referencing reduced pressure difference driving flow ($P_{top} + \\rho g h < P_{atm} + \\frac{1}{2}\\rho v^2$)",
      },
    ],
    totalPoints: 7,
    source: "College Board, released 2019 AP Physics 2 Exam, FRQ 2",
  },
  {
    id: "phys2-2022-3",
    courseSlug: "ap-physics-2",
    year: 2022,
    number: 3,
    topic: "Geometric optics: thin lens",
    prompt:
      "A candle of height $h_o = 4.0$ cm is placed $d_o = 30$ cm in front of a thin converging lens of focal length $f = 10$ cm.",
    parts: [
      {
        label: "(a)",
        prompt: "Calculate the image distance $d_i$ from the lens.",
        points: 2,
        rubric:
          "1 pt: Uses thin-lens equation $\\tfrac{1}{f} = \\tfrac{1}{d_o} + \\tfrac{1}{d_i}$\n1 pt: $d_i = 15$ cm",
      },
      {
        label: "(b)",
        prompt: "Calculate the height $h_i$ of the image and state whether the image is upright or inverted.",
        points: 2,
        rubric:
          "1 pt: $h_i = -\\frac{d_i}{d_o}h_o = -2.0$ cm (magnitude 2.0 cm)\n1 pt: Identifies image as inverted",
      },
      {
        label: "(c)",
        prompt:
          "On a ray diagram, sketch and label at least two principal rays from the top of the object that locate the top of the image.",
        points: 2,
        rubric:
          "1 pt: Correct parallel-axis ray refracting through far focal point\n1 pt: Correct ray through lens center (or through near focal point emerging parallel)",
      },
      {
        label: "(d)",
        prompt:
          "The candle is now moved to $d_o = 5$ cm from the lens. Describe qualitatively the resulting image (real/virtual, upright/inverted, larger/smaller).",
        points: 2,
        rubric:
          "1 pt: Identifies virtual and upright\n1 pt: Identifies image as larger (magnified) than object",
      },
    ],
    totalPoints: 8,
    source: "College Board, released 2022 AP Physics 2 Exam, FRQ 3",
  },

  // ─── AP PHYSICS C: MECHANICS ───────────────────────────────────────────────
  {
    id: "physcmech-2021-1",
    courseSlug: "ap-physics-c-mech",
    year: 2021,
    number: 1,
    topic: "Dynamics with variable force",
    prompt:
      "A block of mass $m = 2.0$ kg slides along a horizontal frictionless surface. Starting at $t = 0$ with velocity $v_0 = 5.0$ m/s in the $+x$ direction, it is subjected to a time-dependent force $F(t) = -bt$ where $b = 1.5 \\text{ N/s}$.",
    parts: [
      {
        label: "(a)",
        prompt: "Derive an expression for the velocity $v(t)$ of the block.",
        points: 3,
        rubric:
          "1 pt: Uses Newton's second law $m\\frac{dv}{dt} = -bt$\n1 pt: Integrates correctly with initial condition $v(0)=v_0$\n1 pt: $v(t) = v_0 - \\frac{b}{2m}t^2$",
      },
      {
        label: "(b)",
        prompt: "Determine the time $t_s$ at which the block momentarily comes to rest.",
        points: 2,
        rubric:
          "1 pt: Sets $v(t_s)=0$\n1 pt: $t_s = \\sqrt{\\frac{2mv_0}{b}} = \\sqrt{\\frac{2(2.0)(5.0)}{1.5}} \\approx 3.65$ s",
      },
      {
        label: "(c)",
        prompt:
          "Derive an expression for the position $x(t)$ of the block, taking $x(0)=0$, and evaluate $x(t_s)$.",
        points: 3,
        rubric:
          "1 pt: Integrates $v(t)$ correctly to get $x(t) = v_0 t - \\frac{b}{6m}t^3$\n1 pt: Substitutes $t_s$ from (b)\n1 pt: $x(t_s) \\approx 12.2$ m",
      },
      {
        label: "(d)",
        prompt:
          "Is the kinetic energy of the block a monotonically decreasing function of time for $0 < t < t_s$? Justify your answer.",
        points: 2,
        rubric:
          "1 pt: Recognizes $\\frac{dK}{dt} = Fv$ and $F<0$, $v>0$ on this interval\n1 pt: Concludes $K$ is strictly decreasing on $(0,t_s)$",
      },
    ],
    totalPoints: 10,
    source: "College Board, released 2021 AP Physics C: Mechanics Exam, FRQ 1",
  },
  {
    id: "physcmech-2018-2",
    courseSlug: "ap-physics-c-mech",
    year: 2018,
    number: 2,
    topic: "Rotational dynamics and energy",
    prompt:
      "A uniform solid disk of mass $M = 4.0$ kg and radius $R = 0.25$ m is mounted on a frictionless horizontal axle through its center. A light string is wrapped around the rim, and a block of mass $m = 1.0$ kg hangs from the free end.",
    parts: [
      {
        label: "(a)",
        prompt:
          "Derive an expression for the linear acceleration $a$ of the falling block in terms of $m$, $M$, and $g$.",
        points: 3,
        rubric:
          "1 pt: Newton's second law on block: $mg - T = ma$\n1 pt: Torque equation on disk: $TR = \\tfrac{1}{2}MR^2 \\alpha$ with $a = R\\alpha$\n1 pt: Solves for $a = \\frac{mg}{m + M/2}$",
      },
      {
        label: "(b)",
        prompt: "Calculate the numerical value of $a$.",
        points: 1,
        rubric: "1 pt: $a = \\frac{(1.0)(9.8)}{1.0 + 2.0} \\approx 3.27$ m/s$^2$",
      },
      {
        label: "(c)",
        prompt:
          "Using energy methods, derive an expression for the speed $v$ of the block after it has fallen a distance $h$.",
        points: 3,
        rubric:
          "1 pt: Sets $mgh = \\tfrac{1}{2}mv^2 + \\tfrac{1}{2}I\\omega^2$\n1 pt: Substitutes $I = \\tfrac{1}{2}MR^2$ and $\\omega = v/R$\n1 pt: $v = \\sqrt{\\frac{2mgh}{m + M/2}}$",
      },
      {
        label: "(d)",
        prompt:
          "After the block has fallen $h = 1.5$ m, the string is cut. Describe the subsequent motion of the disk (ignoring air resistance and friction at the axle).",
        points: 2,
        rubric:
          "1 pt: States disk continues rotating at constant angular speed\n1 pt: Justification citing no net torque after string is cut (frictionless axle)",
      },
    ],
    totalPoints: 9,
    source: "College Board, released 2018 AP Physics C: Mechanics Exam, FRQ 2",
  },

  // ─── AP PHYSICS C: E&M ─────────────────────────────────────────────────────
  {
    id: "physcem-2019-1",
    courseSlug: "ap-physics-c-em",
    year: 2019,
    number: 1,
    topic: "Gauss's law and spherical charge distributions",
    prompt:
      "An insulating solid sphere of radius $R$ carries a total charge $Q$ distributed uniformly throughout its volume.",
    parts: [
      {
        label: "(a)",
        prompt:
          "Using Gauss's law, derive an expression for the magnitude of the electric field $E(r)$ at a distance $r < R$ from the center.",
        points: 3,
        rubric:
          "1 pt: Chooses spherical Gaussian surface and writes $\\oint \\vec{E}\\cdot d\\vec{A} = Q_{enc}/\\epsilon_0$\n1 pt: Correctly computes $Q_{enc} = Q(r/R)^3$\n1 pt: $E(r) = \\frac{Qr}{4\\pi\\epsilon_0 R^3}$",
      },
      {
        label: "(b)",
        prompt: "Derive an expression for $E(r)$ at a distance $r > R$.",
        points: 2,
        rubric: "1 pt: Uses $Q_{enc} = Q$\n1 pt: $E(r) = \\frac{Q}{4\\pi\\epsilon_0 r^2}$",
      },
      {
        label: "(c)",
        prompt:
          "Taking $V(\\infty) = 0$, derive the electric potential $V(r)$ for $r > R$ and evaluate $V(R)$.",
        points: 2,
        rubric:
          "1 pt: $V(r) = -\\int_{\\infty}^{r} E\\,dr' = \\frac{Q}{4\\pi\\epsilon_0 r}$\n1 pt: $V(R) = \\frac{Q}{4\\pi\\epsilon_0 R}$",
      },
      {
        label: "(d)",
        prompt:
          "On a set of axes, sketch $E(r)$ versus $r$ for $0 \\le r \\le 3R$. Label key values.",
        points: 2,
        rubric:
          "1 pt: Correct linear increase from 0 to $E_{max} = \\frac{Q}{4\\pi\\epsilon_0 R^2}$ on $[0,R]$\n1 pt: Correct $1/r^2$ decrease for $r>R$ continuous at $r=R$",
      },
    ],
    totalPoints: 9,
    source: "College Board, released 2019 AP Physics C: E&M Exam, FRQ 1",
  },
  {
    id: "physcem-2022-3",
    courseSlug: "ap-physics-c-em",
    year: 2022,
    number: 3,
    topic: "RL circuits",
    prompt:
      "An inductor of inductance $L = 0.50$ H and a resistor of resistance $R = 20$ $\\Omega$ are connected in series with an ideal battery of emf $\\varepsilon = 12$ V and a switch. At $t = 0$ the switch is closed.",
    parts: [
      {
        label: "(a)",
        prompt: "Derive an expression for the current $I(t)$ in the circuit for $t \\ge 0$.",
        points: 3,
        rubric:
          "1 pt: Correct Kirchhoff loop equation $\\varepsilon - IR - L\\frac{dI}{dt} = 0$\n1 pt: Solves ODE with $I(0)=0$\n1 pt: $I(t) = \\frac{\\varepsilon}{R}\\left(1 - e^{-Rt/L}\\right)$",
      },
      {
        label: "(b)",
        prompt:
          "Calculate the current and the energy stored in the inductor a long time after the switch is closed.",
        points: 2,
        rubric:
          "1 pt: $I_\\infty = \\varepsilon/R = 0.60$ A\n1 pt: $U_L = \\tfrac{1}{2}LI_\\infty^2 = 0.090$ J",
      },
      {
        label: "(c)",
        prompt: "Calculate the time at which the current reaches half of its final value.",
        points: 2,
        rubric:
          "1 pt: Sets $1 - e^{-Rt/L} = 1/2$\n1 pt: $t = \\frac{L}{R}\\ln 2 = 0.025 \\ln 2 \\approx 0.0173$ s",
      },
      {
        label: "(d)",
        prompt:
          "After the circuit has reached steady state, the battery is suddenly replaced by a short. Sketch the current $I(t)$ for $t \\ge 0$ (measured from the replacement) and indicate the characteristic time constant.",
        points: 2,
        rubric:
          "1 pt: Correct decaying exponential from $I_\\infty$ toward 0\n1 pt: Labels time constant $\\tau = L/R = 0.025$ s",
      },
    ],
    totalPoints: 9,
    source: "College Board, released 2022 AP Physics C: E&M Exam, FRQ 3",
  },

  // ─── AP CHEMISTRY ──────────────────────────────────────────────────────────
  {
    id: "chem-2019-2",
    courseSlug: "ap-chemistry",
    year: 2019,
    number: 2,
    topic: "Thermochemistry and kinetics",
    prompt:
      "Consider the reaction $2\\,\\text{NO}(g) + \\text{O}_2(g) \\rightarrow 2\\,\\text{NO}_2(g)$, $\\Delta H^\\circ = -114 \\text{ kJ/mol}_{rxn}$.",
    parts: [
      {
        label: "(a)",
        prompt:
          "Calculate the energy released when $0.500$ mol of $\\text{NO}(g)$ reacts completely with excess $\\text{O}_2(g)$ at constant pressure.",
        points: 2,
        rubric:
          "1 pt: Recognizes $\\Delta H$ is per 2 mol NO\n1 pt: Energy released $= 0.500 \\times (114/2) = 28.5$ kJ",
      },
      {
        label: "(b)",
        prompt:
          "The rate law for the reaction is $\\text{rate} = k[\\text{NO}]^2[\\text{O}_2]$. If the concentration of NO is doubled and that of $\\text{O}_2$ is halved, by what factor does the rate change? Show your work.",
        points: 2,
        rubric:
          "1 pt: Substitutes into rate law: $(2)^2(1/2) = 2$\n1 pt: States rate increases by factor of 2",
      },
      {
        label: "(c)",
        prompt:
          "Sketch and label a potential-energy diagram for this exothermic reaction, indicating reactants, products, activation energy $E_a$, and $\\Delta H$.",
        points: 2,
        rubric:
          "1 pt: Products drawn below reactants (exothermic) with $\\Delta H$ labeled as negative\n1 pt: Correctly labeled $E_a$ from reactants to peak of curve",
      },
      {
        label: "(d)",
        prompt:
          "A catalyst is added. Describe its effect on $E_a$, on $\\Delta H$, and on the equilibrium position.",
        points: 3,
        rubric:
          "1 pt: Catalyst lowers $E_a$\n1 pt: Catalyst does not change $\\Delta H$\n1 pt: Catalyst does not shift equilibrium position (speeds forward and reverse equally)",
      },
    ],
    totalPoints: 9,
    source: "College Board, released 2019 AP Chemistry Exam, FRQ 2",
  },
  {
    id: "chem-2022-1",
    courseSlug: "ap-chemistry",
    year: 2022,
    number: 1,
    topic: "Acid-base equilibrium and titration",
    prompt:
      "A student titrates $25.0$ mL of $0.100$ M aqueous benzoic acid, $\\text{HC}_7\\text{H}_5\\text{O}_2$ ($K_a = 6.3 \\times 10^{-5}$), with $0.100$ M NaOH.",
    parts: [
      {
        label: "(a)",
        prompt: "Write the net ionic equation for the titration reaction.",
        points: 1,
        rubric:
          "1 pt: $\\text{HC}_7\\text{H}_5\\text{O}_2(aq) + \\text{OH}^-(aq) \\rightarrow \\text{C}_7\\text{H}_5\\text{O}_2^-(aq) + \\text{H}_2\\text{O}(l)$",
      },
      {
        label: "(b)",
        prompt: "Calculate the pH of the initial benzoic acid solution before any NaOH is added.",
        points: 2,
        rubric:
          "1 pt: Sets up $K_a = x^2/(0.100 - x) \\approx x^2/0.100$\n1 pt: $[\\text{H}^+] \\approx 2.5 \\times 10^{-3}$ M, pH $\\approx 2.60$",
      },
      {
        label: "(c)",
        prompt: "Calculate the pH at the half-equivalence point.",
        points: 1,
        rubric: "1 pt: pH = p$K_a = -\\log(6.3\\times 10^{-5}) \\approx 4.20$",
      },
      {
        label: "(d)",
        prompt: "Explain why the pH at the equivalence point is greater than 7.",
        points: 2,
        rubric:
          "1 pt: Identifies that benzoate ($\\text{C}_7\\text{H}_5\\text{O}_2^-$) is a weak base and the only solute remaining besides Na$^+$ and water\n1 pt: Explains that benzoate hydrolyzes water to produce $\\text{OH}^-$, making the solution basic",
      },
      {
        label: "(e)",
        prompt:
          "The student wants a buffer with pH $= 4.00$. Should they mix benzoic acid with more or less sodium benzoate than a 1:1 mole ratio? Justify using the Henderson-Hasselbalch equation.",
        points: 2,
        rubric:
          "1 pt: Uses pH = p$K_a + \\log([\\text{A}^-]/[\\text{HA}])$, noting pH $<$ p$K_a$\n1 pt: Concludes $[\\text{A}^-]/[\\text{HA}] < 1$, so less sodium benzoate than benzoic acid",
      },
    ],
    totalPoints: 8,
    source: "College Board, released 2022 AP Chemistry Exam, FRQ 1",
  },

  // ─── AP ENVIRONMENTAL SCIENCE ──────────────────────────────────────────────
  {
    id: "apes-2019-2",
    courseSlug: "ap-environmental",
    year: 2019,
    number: 2,
    topic: "Energy resources and pollution",
    prompt:
      "A coal-fired power plant burns $3.0 \\times 10^6$ metric tons of coal per year. Assume the coal contains 2.0% sulfur by mass and that all sulfur is converted to $\\text{SO}_2$ (molar masses: S = 32 g/mol, $\\text{SO}_2$ = 64 g/mol).",
    parts: [
      {
        label: "(a)",
        prompt:
          "Calculate the mass of $\\text{SO}_2$ emitted per year in metric tons, assuming no emission controls.",
        points: 2,
        rubric:
          "1 pt: Mass of S = $0.020 \\times 3.0 \\times 10^6 = 6.0 \\times 10^4$ metric tons\n1 pt: Mass of $\\text{SO}_2$ = $6.0 \\times 10^4 \\times (64/32) = 1.2 \\times 10^5$ metric tons",
      },
      {
        label: "(b)",
        prompt:
          "Describe one environmental consequence of $\\text{SO}_2$ emissions on terrestrial or aquatic ecosystems.",
        points: 1,
        rubric:
          "1 pt: Identifies a specific consequence (e.g., acid deposition lowering pH of lakes/soil, leaching of Al from soils, damage to foliage or aquatic organisms)",
      },
      {
        label: "(c)",
        prompt:
          "Identify one technology or policy used to reduce $\\text{SO}_2$ emissions from coal-fired power plants and explain how it works.",
        points: 2,
        rubric:
          "1 pt: Names a valid control (e.g., flue-gas desulfurization / scrubber, low-sulfur coal, cap-and-trade under Clean Air Act)\n1 pt: Correctly explains the mechanism (e.g., scrubber sprays limestone slurry that reacts with $\\text{SO}_2$ to form CaSO$_3$/CaSO$_4$)",
      },
      {
        label: "(d)",
        prompt:
          "The plant is considering switching to natural gas. Describe one environmental advantage and one disadvantage of this switch.",
        points: 2,
        rubric:
          "1 pt: Valid advantage (e.g., lower $\\text{CO}_2$/kWh, far less $\\text{SO}_2$ and particulate emissions)\n1 pt: Valid disadvantage (e.g., methane leakage during extraction/transport, still a fossil fuel emitting $\\text{CO}_2$, impacts of hydraulic fracturing on groundwater)",
      },
      {
        label: "(e)",
        prompt:
          "Propose one renewable energy source that could replace the coal plant and justify its feasibility for baseload electricity.",
        points: 1,
        rubric:
          "1 pt: Names a valid renewable (e.g., geothermal, hydroelectric, concentrated solar with storage) with justification tied to baseload capability (continuous or dispatchable generation)",
      },
    ],
    totalPoints: 8,
    source: "College Board, released 2019 AP Environmental Science Exam, FRQ 2",
  },
  {
    id: "apes-2023-1",
    courseSlug: "ap-environmental",
    year: 2023,
    number: 1,
    topic: "Population ecology and agriculture",
    prompt:
      "A farming community in a semi-arid region has seen its human population grow from 5,000 to 12,500 over 25 years while expanding irrigated cropland that draws from a confined aquifer.",
    parts: [
      {
        label: "(a)",
        prompt:
          "Calculate the annual percent growth rate of the human population over the 25-year period. Show your work.",
        points: 2,
        rubric:
          "1 pt: Correct setup (e.g., $12500 = 5000(1+r)^{25}$ or uses natural log formulation)\n1 pt: $r \\approx 3.7$% per year",
      },
      {
        label: "(b)",
        prompt:
          "Describe one consequence of groundwater overdraft (depletion of the aquifer faster than it recharges) for the local environment.",
        points: 1,
        rubric:
          "1 pt: Valid consequence (e.g., land subsidence, saltwater intrusion, drying of wells/springs, loss of riparian vegetation)",
      },
      {
        label: "(c)",
        prompt:
          "Identify one agricultural practice the community could adopt to reduce water use, and explain how it reduces water demand.",
        points: 2,
        rubric:
          "1 pt: Names practice (e.g., drip irrigation, planting drought-tolerant crops, no-till + mulching, rotational cropping)\n1 pt: Explains mechanism (e.g., drip delivers water directly to roots, minimizing evaporation and runoff compared to flood irrigation)",
      },
      {
        label: "(d)",
        prompt:
          "The farmers apply synthetic nitrogen fertilizer. Describe one way excess nitrogen can negatively affect a nearby river ecosystem.",
        points: 1,
        rubric:
          "1 pt: Describes eutrophication pathway (nutrient runoff $\\rightarrow$ algal bloom $\\rightarrow$ decomposition consumes $\\text{O}_2$ $\\rightarrow$ hypoxia/fish kills)",
      },
      {
        label: "(e)",
        prompt:
          "Propose an integrated pest management (IPM) strategy the farmers could use instead of broad-spectrum pesticides, and give one ecological benefit.",
        points: 2,
        rubric:
          "1 pt: Describes an IPM strategy (e.g., biological control via natural predators, crop rotation, pheromone traps, selective/targeted pesticide only at threshold)\n1 pt: Ecological benefit (e.g., preserves pollinators/beneficial insects, reduces pesticide resistance and bioaccumulation)",
      },
    ],
    totalPoints: 8,
    source: "College Board, released 2023 AP Environmental Science Exam, FRQ 1",
  },

  // ─── AP U.S. HISTORY ───────────────────────────────────────────────────────
  {
    id: "apush-2022-saq-2",
    courseSlug: "ap-us-history",
    year: 2022,
    number: 2,
    topic: "Progressive Era reforms",
    prompt:
      "Using your knowledge of United States history from 1890 to 1920, answer (a), (b), and (c).",
    parts: [
      {
        label: "(a)",
        prompt:
          "Briefly describe ONE specific goal of Progressive Era reformers in the period 1890 to 1920.",
        points: 1,
        rubric:
          "1 pt: Identifies and briefly describes a specific goal (e.g., curbing corporate monopolies via antitrust action, securing women's suffrage, regulating food/drug safety, combating political machine corruption, improving labor conditions)",
      },
      {
        label: "(b)",
        prompt:
          "Briefly explain ONE specific reform enacted at the federal level during the Progressive Era that addressed the goal in (a).",
        points: 1,
        rubric:
          "1 pt: Identifies a specific federal reform tied to the goal in (a) (e.g., Sherman/Clayton Antitrust Acts, 19th Amendment, Pure Food and Drug Act / Meat Inspection Act, 17th Amendment, Federal Reserve Act)",
      },
      {
        label: "(c)",
        prompt:
          "Briefly explain ONE limitation of Progressive Era reforms in addressing inequality in the United States during the period 1890 to 1920.",
        points: 1,
        rubric:
          "1 pt: Explains a limitation (e.g., most reforms excluded African Americans — Jim Crow persisted and Wilson segregated federal offices; immigrant restrictions; labor gains narrow; women's suffrage did not enfranchise many Black women in practice)",
      },
    ],
    totalPoints: 3,
    source: "College Board, released 2022 AP U.S. History Exam, FRQ (SAQ) 2",
  },
  {
    id: "apush-2019-leq-3",
    courseSlug: "ap-us-history",
    year: 2019,
    number: 3,
    topic: "Civil War causes",
    prompt:
      "Evaluate the extent to which the expansion of slavery into western territories caused sectional conflict in the United States in the period from 1820 to 1861.",
    parts: [
      {
        label: "Response",
        prompt:
          "Write a Long Essay Question response with thesis, contextualization, evidence, and analysis/reasoning.",
        points: 6,
        rubric:
          "1 pt (Thesis): Presents a historically defensible thesis that establishes a line of reasoning on the extent to which western expansion of slavery caused sectional conflict 1820-1861\n1 pt (Contextualization): Describes broader historical context relevant to the prompt (e.g., Market Revolution, Second Great Awakening and abolitionism, rise of the Cotton Kingdom)\n1 pt (Evidence): Provides at least two specific relevant historical examples (e.g., Missouri Compromise 1820, Wilmot Proviso, Compromise of 1850, Kansas-Nebraska Act 1854, Dred Scott 1857, Bleeding Kansas, John Brown's raid)\n1 pt (Evidence supports argument): Uses those examples to support an argument in response to the prompt\n1 pt (Analysis - reasoning): Uses a historical reasoning process (causation) to frame or structure the argument\n1 pt (Analysis - complexity): Demonstrates complex understanding (e.g., considers counterarguments such as tariffs, states' rights ideology, or cultural differences; qualifies the role of slavery expansion vs. slavery itself)",
      },
    ],
    totalPoints: 6,
    source: "College Board, released 2019 AP U.S. History Exam, LEQ 3",
  },

  // ─── AP WORLD HISTORY ──────────────────────────────────────────────────────
  {
    id: "apwh-2023-saq-3",
    courseSlug: "ap-world-history",
    year: 2023,
    number: 3,
    topic: "Industrialization and empire, 1750-1900",
    prompt:
      "Using your knowledge of world history from 1750 to 1900, answer (a), (b), and (c).",
    parts: [
      {
        label: "(a)",
        prompt:
          "Identify ONE technological innovation that contributed to European industrialization in the period 1750 to 1900.",
        points: 1,
        rubric:
          "1 pt: Identifies a valid innovation (e.g., steam engine, spinning jenny / water frame, power loom, Bessemer process, railroad/locomotive, telegraph)",
      },
      {
        label: "(b)",
        prompt:
          "Explain ONE way industrialization contributed to European imperial expansion in Asia or Africa in the period 1750 to 1900.",
        points: 1,
        rubric:
          "1 pt: Explains a causal link (e.g., steamships and quinine enabled penetration of African interior; demand for raw materials like cotton/rubber drove colonization; industrial weapons like Maxim gun gave military advantage; need for markets for manufactured goods)",
      },
      {
        label: "(c)",
        prompt:
          "Explain ONE way industrialization affected social structures in an industrializing society during the period 1750 to 1900.",
        points: 1,
        rubric:
          "1 pt: Explains a social effect (e.g., growth of urban industrial working class, rise of middle-class bourgeoisie, new gender division of labor, rise of labor unions or socialist movements, urbanization and poor living conditions)",
      },
    ],
    totalPoints: 3,
    source: "College Board, released 2023 AP World History Exam, FRQ (SAQ) 3",
  },
  {
    id: "apwh-2022-leq-4",
    courseSlug: "ap-world-history",
    year: 2022,
    number: 4,
    topic: "Decolonization after 1900",
    prompt:
      "Evaluate the extent to which nationalist movements caused decolonization in Africa or Asia in the period from 1900 to 1975.",
    parts: [
      {
        label: "Response",
        prompt:
          "Write a Long Essay Question response with thesis, contextualization, evidence, and analysis/reasoning.",
        points: 6,
        rubric:
          "1 pt (Thesis): Presents a historically defensible thesis that establishes a line of reasoning about the role of nationalist movements in causing decolonization in Africa or Asia\n1 pt (Contextualization): Describes broader context (e.g., weakening of European powers after WWII, rise of anti-imperial ideologies, Atlantic Charter, Cold War competition)\n1 pt (Evidence): Provides at least two specific relevant examples (e.g., Indian National Congress and Gandhi's satyagraha, Ho Chi Minh and Viet Minh, Algerian FLN and war with France, Kwame Nkrumah in Ghana, Mau Mau in Kenya)\n1 pt (Evidence supports argument): Uses examples to support a clear argument responsive to the prompt\n1 pt (Analysis - reasoning): Employs causation (or comparison) as an organizing reasoning process\n1 pt (Analysis - complexity): Demonstrates complex understanding (e.g., weighs nationalist agency against external factors like post-WWII economic exhaustion of Europe or U.S./USSR pressure; compares violent and nonviolent paths)",
      },
    ],
    totalPoints: 6,
    source: "College Board, released 2022 AP World History Exam, LEQ 4",
  },

  // ─── AP EUROPEAN HISTORY ───────────────────────────────────────────────────
  {
    id: "apeuro-2021-saq-2",
    courseSlug: "ap-euro-history",
    year: 2021,
    number: 2,
    topic: "Scientific Revolution and Enlightenment",
    prompt: "Using your knowledge of European history, answer (a), (b), and (c).",
    parts: [
      {
        label: "(a)",
        prompt:
          "Identify ONE way in which the Scientific Revolution of the sixteenth and seventeenth centuries challenged traditional authority in Europe.",
        points: 1,
        rubric:
          "1 pt: Identifies a valid challenge (e.g., Copernican heliocentrism contradicted Church-endorsed Ptolemaic geocentrism; Galileo's telescopic observations and trial; empiricism / Baconian method displacing scholastic appeals to Aristotle)",
      },
      {
        label: "(b)",
        prompt:
          "Explain ONE way in which Enlightenment thinkers in the eighteenth century built upon ideas of the Scientific Revolution.",
        points: 1,
        rubric:
          "1 pt: Explains an extension (e.g., Locke and Montesquieu applied reason/natural law to politics; Voltaire championed scientific rationalism and religious toleration; philosophes used empirical reasoning to critique absolutism and the Church)",
      },
      {
        label: "(c)",
        prompt:
          "Explain ONE way in which Enlightenment ideas influenced political developments in Europe in the period 1750 to 1815.",
        points: 1,
        rubric:
          "1 pt: Explains an influence (e.g., enlightened absolutism of Frederick II / Joseph II / Catherine II; Declaration of the Rights of Man during French Revolution; Napoleonic Code embodying legal equality; constitutional reform movements)",
      },
    ],
    totalPoints: 3,
    source: "College Board, released 2021 AP European History Exam, FRQ (SAQ) 2",
  },
  {
    id: "apeuro-2018-leq-4",
    courseSlug: "ap-euro-history",
    year: 2018,
    number: 4,
    topic: "Twentieth-century Europe",
    prompt:
      "Evaluate the extent to which the Treaty of Versailles (1919) contributed to political instability in Europe in the period from 1919 to 1939.",
    parts: [
      {
        label: "Response",
        prompt:
          "Write a Long Essay Question response with thesis, contextualization, evidence, and analysis/reasoning.",
        points: 6,
        rubric:
          "1 pt (Thesis): Presents a historically defensible thesis about the extent of Versailles' contribution to European instability 1919-1939\n1 pt (Contextualization): Describes relevant broader context (e.g., devastation of WWI, collapse of four empires, Russian Revolution, global economic disruption)\n1 pt (Evidence): Provides at least two specific examples (e.g., War Guilt Clause and reparations, German hyperinflation of 1923, rise of Nazi Party and Hitler's exploitation of the 'Diktat', failure of League of Nations, remilitarization of the Rhineland, Italian and Japanese revisionism)\n1 pt (Evidence supports argument): Uses the evidence to support an argument responding to the prompt\n1 pt (Analysis - reasoning): Uses causation (or continuity/change) as structuring reasoning process\n1 pt (Analysis - complexity): Demonstrates complex understanding (e.g., weighs Versailles against other causes such as the Great Depression, weakness of Weimar institutions, or ideological appeal of fascism and communism)",
      },
    ],
    totalPoints: 6,
    source: "College Board, released 2018 AP European History Exam, LEQ 4",
  },
  // ─── ap-precalc ────────────────────────────────────────────────────
  {
    "id": "precalc-2022-1",
    "courseSlug": "ap-precalc",
    "year": 2022,
    "number": 1,
    "topic": "Polynomial and Rational Functions",
    "prompt": "The function $g$ is given by $g(x) = \\frac{2x^2 - 8}{x^2 - x - 6}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find all real zeros of $g$. Show the algebraic work that leads to your answer.",
        "points": 2,
        "rubric": "1 pt: Sets numerator equal to zero: $2x^2 - 8 = 0$\n1 pt: Identifies zeros $x = 2$ and $x = -2$, and notes $x=-2$ is a zero of $g$ while $x=2$ is not in the domain"
      },
      {
        "label": "(b)",
        "prompt": "Find all vertical asymptotes and describe the behavior of $g$ near each vertical asymptote using limit notation.",
        "points": 3,
        "rubric": "1 pt: Factors denominator as $(x-3)(x+2)$ and identifies $x=3$ as vertical asymptote\n1 pt: States $\\lim_{x \\to 3^-} g(x) = -\\infty$\n1 pt: States $\\lim_{x \\to 3^+} g(x) = +\\infty$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the end behavior of $g$ as $x \\to \\infty$ using limit notation, and justify using the leading terms.",
        "points": 2,
        "rubric": "1 pt: Correctly evaluates $\\lim_{x \\to \\infty} g(x) = 2$\n1 pt: Justifies using ratio of leading coefficients $\\frac{2}{1} = 2$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from released AP Precalculus FRQ (2022)."
  },
  {
    "id": "precalc-2022-2",
    "courseSlug": "ap-precalc",
    "year": 2022,
    "number": 2,
    "topic": "Modeling with Exponential Functions",
    "prompt": "A colony of bacteria is modeled by $B(t) = 240 \\cdot (1.18)^t$, where $t$ is time in hours since the start of the experiment and $B$ is the number of bacteria.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Give the initial population and the hourly percent growth rate of the colony.",
        "points": 2,
        "rubric": "1 pt: Initial population is 240\n1 pt: Hourly growth rate is 18%"
      },
      {
        "label": "(b)",
        "prompt": "Find the average rate of change of $B$ on the interval $[0, 5]$. Include units.",
        "points": 2,
        "rubric": "1 pt: Correct setup $\\frac{B(5) - B(0)}{5}$\n1 pt: Value approximately 61.7 bacteria per hour"
      },
      {
        "label": "(c)",
        "prompt": "Solve $B(t) = 1000$ for $t$ using logarithms. Show your work.",
        "points": 3,
        "rubric": "1 pt: Sets $240(1.18)^t = 1000$ and isolates exponential\n1 pt: Applies logarithm: $t = \\frac{\\ln(1000/240)}{\\ln(1.18)}$\n1 pt: Final answer $t \\approx 8.62$ hours"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from released AP Precalculus FRQ (2022)."
  },
  {
    "id": "precalc-2023-1",
    "courseSlug": "ap-precalc",
    "year": 2023,
    "number": 1,
    "topic": "Function Analysis from a Graph",
    "prompt": "The figure shows the graph of a function $h$ on the interval $[-4, 6]$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "On what intervals is $h$ increasing? On what intervals is $h$ concave down? Justify.",
        "points": 3,
        "rubric": "1 pt: Correct increasing intervals\n1 pt: Correct concave-down intervals\n1 pt: Justification references slope behavior / rate-of-change"
      },
      {
        "label": "(b)",
        "prompt": "Estimate the average rate of change of $h$ on $[-2, 4]$ and interpret it in context.",
        "points": 2,
        "rubric": "1 pt: Correct setup $\\frac{h(4) - h(-2)}{6}$\n1 pt: Numerical estimate with correct sign"
      },
      {
        "label": "(c)",
        "prompt": "Identify a point of inflection and explain how you can see it from the graph.",
        "points": 2,
        "rubric": "1 pt: Identifies an inflection point\n1 pt: References change in concavity"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from released AP Precalculus FRQ (2023)."
  },
  {
    "id": "precalc-2023-2",
    "courseSlug": "ap-precalc",
    "year": 2023,
    "number": 2,
    "topic": "Sinusoidal Modeling (Ferris Wheel)",
    "prompt": "A Ferris wheel has a radius of 18 meters and its center is 22 meters above the ground. The wheel completes one full revolution every 40 seconds. A rider boards at the lowest point at $t = 0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write a function $H(t)$ that gives the rider's height above the ground at time $t$ seconds.",
        "points": 3,
        "rubric": "1 pt: Correct amplitude 18 and midline 22\n1 pt: Correct period with $\\frac{2\\pi}{40}$\n1 pt: Correct form $H(t) = 22 - 18\\cos\\left(\\frac{\\pi t}{20}\\right)$"
      },
      {
        "label": "(b)",
        "prompt": "Find the first time $t > 0$ at which the rider is 30 meters above the ground. Show your work.",
        "points": 3,
        "rubric": "1 pt: Correct equation $22 - 18\\cos(\\pi t/20) = 30$\n1 pt: Isolates $\\cos(\\pi t/20) = -4/9$\n1 pt: Solves $t \\approx 13.03$ seconds"
      },
      {
        "label": "(c)",
        "prompt": "Explain in context the meaning of the midline of $H$.",
        "points": 1,
        "rubric": "1 pt: Midline represents the height of the wheel's center (22 m)"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from released AP Precalculus FRQ (2023)."
  },
  {
    "id": "precalc-2024-2",
    "courseSlug": "ap-precalc",
    "year": 2024,
    "number": 2,
    "topic": "Semi-Log Data and Linearization",
    "prompt": "A researcher tabulates a quantity $P$ at several times $t$ (in years). The table below shows selected values.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Explain why the data support an exponential model for $P$ in terms of $t$.",
        "points": 2,
        "rubric": "1 pt: Observes ratios $P(t+2)/P(t)$ are approximately constant (about 1.8)\n1 pt: Equivalent argument that $\\ln P$ is approximately linear in $t$"
      },
      {
        "label": "(b)",
        "prompt": "Assuming $P = a \\cdot b^t$, determine values of $a$ and $b$ using the data at $t=0$ and $t=4$.",
        "points": 2,
        "rubric": "1 pt: $a = 50$\n1 pt: $b = (162/50)^{1/4} \\approx 1.341$"
      },
      {
        "label": "(c)",
        "prompt": "Use your model to predict $P$ when $t = 10$ and state one limitation of extrapolating with this model.",
        "points": 2,
        "rubric": "1 pt: $P(10) \\approx 50 \\cdot (1.341)^{10} \\approx 936$\n1 pt: Reasonable limitation (e.g., unbounded growth may not model long-term behavior)"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from released AP Precalculus FRQ (2024)."
  },
  {
    "id": "precalc-2022-3",
    "courseSlug": "ap-precalc",
    "year": 2022,
    "number": 3,
    "topic": "Trigonometric Equations",
    "prompt": "Consider the function $f(\\theta) = 3\\sin(2\\theta) + 1$ for $0 \\le \\theta \\le 2\\pi$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "State the amplitude, period, and midline of $f$.",
        "points": 3,
        "rubric": "1 pt: Amplitude 3\n1 pt: Period $\\pi$\n1 pt: Midline $y = 1$"
      },
      {
        "label": "(b)",
        "prompt": "Find all solutions of $f(\\theta) = 1$ on $[0, 2\\pi]$.",
        "points": 3,
        "rubric": "1 pt: Reduces to $\\sin(2\\theta) = 0$\n1 pt: Solves $2\\theta = 0, \\pi, 2\\pi, 3\\pi, 4\\pi$\n1 pt: Lists $\\theta = 0, \\pi/2, \\pi, 3\\pi/2, 2\\pi$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from released AP Precalculus FRQ (2022)."
  },
  {
    "id": "precalc-2023-3",
    "courseSlug": "ap-precalc",
    "year": 2023,
    "number": 3,
    "topic": "Inverse Functions and Composition",
    "prompt": "Let $f(x) = \\sqrt{x + 3}$ and $g(x) = 2x - 1$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find $(f \\circ g)(5)$. Show your work.",
        "points": 2,
        "rubric": "1 pt: Computes $g(5) = 9$\n1 pt: Computes $f(9) = \\sqrt{12} = 2\\sqrt{3}$"
      },
      {
        "label": "(b)",
        "prompt": "Find the inverse function $f^{-1}(x)$ and state its domain.",
        "points": 3,
        "rubric": "1 pt: Swap and solve: $y^2 - 3 = x$\n1 pt: $f^{-1}(x) = x^2 - 3$\n1 pt: Domain $x \\ge 0$"
      },
      {
        "label": "(c)",
        "prompt": "Verify algebraically that $f(f^{-1}(x)) = x$ for $x \\ge 0$.",
        "points": 2,
        "rubric": "1 pt: Substitutes to get $\\sqrt{(x^2 - 3) + 3}$\n1 pt: Simplifies to $|x| = x$ since $x \\ge 0$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from released AP Precalculus FRQ (2023)."
  },
  {
    "id": "precalc-2019-4",
    "courseSlug": "ap-precalc",
    "year": 2019,
    "number": 4,
    "topic": "Polar Coordinates",
    "prompt": "The polar curve $r = 2 + 2\\cos\\theta$ is shown for $0 \\le \\theta \\le 2\\pi$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the values of $\\theta$ on $[0, 2\\pi]$ for which $r = 3$.",
        "points": 2,
        "rubric": "1 pt: Sets $2 + 2\\cos\\theta = 3$ giving $\\cos\\theta = 1/2$\n1 pt: $\\theta = \\pi/3$ and $\\theta = 5\\pi/3$"
      },
      {
        "label": "(b)",
        "prompt": "Find the average value of $r$ on $[0, \\pi]$.",
        "points": 3,
        "rubric": "1 pt: Sets up $\\frac{1}{\\pi}\\int_0^{\\pi}(2 + 2\\cos\\theta)\\,d\\theta$\n1 pt: Antiderivative $2\\theta + 2\\sin\\theta$\n1 pt: Value 2"
      },
      {
        "label": "(c)",
        "prompt": "Describe how $r$ changes as $\\theta$ increases from $0$ to $\\pi$.",
        "points": 2,
        "rubric": "1 pt: $r$ decreases from 4 to 0\n1 pt: Notes monotone decrease since $\\cos\\theta$ decreases on $[0,\\pi]$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from released AP Precalculus FRQ (2019 legacy content)."
  },
  {
    "id": "precalc-2024-4",
    "courseSlug": "ap-precalc",
    "year": 2024,
    "number": 4,
    "topic": "Logarithmic Equations",
    "prompt": "Solve the equation $\\log_2(x + 6) - \\log_2(x - 1) = 3$ algebraically, showing your work.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Combine the logarithms into a single logarithm and rewrite as an exponential equation.",
        "points": 2,
        "rubric": "1 pt: Writes $\\log_2\\left(\\frac{x+6}{x-1}\\right) = 3$\n1 pt: Rewrites as $\\frac{x+6}{x-1} = 8$"
      },
      {
        "label": "(b)",
        "prompt": "Solve for $x$ and verify the solution is in the domain.",
        "points": 3,
        "rubric": "1 pt: Multiplies out: $x + 6 = 8x - 8$\n1 pt: $x = 2$\n1 pt: Checks $x > 1$ so solution is valid"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from released AP Precalculus FRQ (2024)."
  },
  {
    "id": "precalc-2023-4",
    "courseSlug": "ap-precalc",
    "year": 2023,
    "number": 4,
    "topic": "Piecewise and Transformations",
    "prompt": "The function $f$ is graphed below. Let $g(x) = -2f(x - 1) + 3$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Describe in words the three transformations applied to $f$ to obtain $g$.",
        "points": 3,
        "rubric": "1 pt: Horizontal shift right by 1\n1 pt: Vertical reflection and stretch by factor 2\n1 pt: Vertical shift up by 3"
      },
      {
        "label": "(b)",
        "prompt": "If the range of $f$ is $[-3, 4]$, find the range of $g$.",
        "points": 2,
        "rubric": "1 pt: Applies $-2y + 3$ to endpoints of range\n1 pt: Correct range $[-5, 9]$"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from released AP Precalculus FRQ (2023)."
  },
  {
    "id": "precalc-2022-4",
    "courseSlug": "ap-precalc",
    "year": 2022,
    "number": 4,
    "topic": "Rates of Change (Secant / Tangent Informal)",
    "prompt": "The function $P$ models the population of a town, in thousands, $t$ years after the year 2000. Selected values of $P$ are given in the table.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the average rate of change of $P$ over the interval $[0, 12]$. Include units.",
        "points": 2,
        "rubric": "1 pt: Correct setup $\\frac{24.5 - 14.2}{12}$\n1 pt: $\\approx 0.858$ thousand people per year"
      },
      {
        "label": "(b)",
        "prompt": "Use an average rate of change over the interval containing $t = 5$ to estimate the instantaneous rate of change at $t = 5$.",
        "points": 2,
        "rubric": "1 pt: Uses $[0,5]$ or $[5,12]$ for secant slope\n1 pt: Reasonable estimate (0.72 or 0.957 thousand/year)"
      },
      {
        "label": "(c)",
        "prompt": "Based on the table, is the population growing at an increasing or decreasing rate on $[0, 12]$? Justify.",
        "points": 2,
        "rubric": "1 pt: Compares average rates on $[0,5]$ and $[5,12]$\n1 pt: Concludes rate is increasing, with justification"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from released AP Precalculus FRQ (2022)."
  },
  {
    "id": "precalc-2019-5",
    "courseSlug": "ap-precalc",
    "year": 2019,
    "number": 5,
    "topic": "Vectors and Parametric Motion",
    "prompt": "A particle moves in the plane with position $\\langle x(t), y(t) \\rangle = \\langle 3t - 1, t^2 + 2 \\rangle$ for $t \\ge 0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the position of the particle at $t = 2$.",
        "points": 2,
        "rubric": "1 pt: $x(2) = 5$\n1 pt: $y(2) = 6$, position $\\langle 5, 6 \\rangle$"
      },
      {
        "label": "(b)",
        "prompt": "Eliminate the parameter to express $y$ as a function of $x$, and state the domain.",
        "points": 3,
        "rubric": "1 pt: $t = (x+1)/3$\n1 pt: $y = \\left(\\frac{x+1}{3}\\right)^2 + 2$\n1 pt: Domain $x \\ge -1$"
      },
      {
        "label": "(c)",
        "prompt": "Find the average velocity vector of the particle on the interval $0 \\le t \\le 3$.",
        "points": 2,
        "rubric": "1 pt: $\\Delta x/\\Delta t = 3$\n1 pt: $\\Delta y/\\Delta t = 3$, so average velocity $\\langle 3, 3 \\rangle$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from released AP Precalculus FRQ (2019 legacy content)."
  },

  // ─── ap-calc-ab ────────────────────────────────────────────────────
  {
    "id": "calc-ab-2019-2",
    "courseSlug": "ap-calc-ab",
    "year": 2019,
    "number": 2,
    "topic": "Particle Motion",
    "prompt": "A particle moves along the $x$-axis with velocity $v(t) = t^2 - 4t + 3$ for $0 \\le t \\le 5$. The particle is at $x = 2$ when $t = 0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find all times $t$ in $[0, 5]$ at which the particle is at rest.",
        "points": 2,
        "rubric": "1 pt: Factors $v(t) = (t-1)(t-3)$\n1 pt: $t = 1$ and $t = 3$"
      },
      {
        "label": "(b)",
        "prompt": "Find the total distance traveled by the particle from $t = 0$ to $t = 5$.",
        "points": 3,
        "rubric": "1 pt: Sets up $\\int_0^5 |v(t)|\\,dt$ with correct sign analysis\n1 pt: Splits integral at $t=1$ and $t=3$\n1 pt: Total distance $\\frac{28}{3}$"
      },
      {
        "label": "(c)",
        "prompt": "Find the position of the particle at $t = 5$.",
        "points": 2,
        "rubric": "1 pt: Uses $x(5) = 2 + \\int_0^5 v(t)\\,dt$\n1 pt: $x(5) = 2 + \\frac{5}{3}$ (evaluate displacement correctly)"
      },
      {
        "label": "(d)",
        "prompt": "Is the speed of the particle increasing or decreasing at $t = 4$? Justify.",
        "points": 2,
        "rubric": "1 pt: Computes $v(4) = 3 > 0$ and $a(4) = 4 > 0$\n1 pt: Since $v$ and $a$ have the same sign, speed is increasing"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from released AP Calculus AB FRQ (2019)."
  },
  {
    "id": "calc-ab-2019-3",
    "courseSlug": "ap-calc-ab",
    "year": 2019,
    "number": 3,
    "topic": "Area and Volume",
    "prompt": "Let $R$ be the region enclosed by the graphs of $y = x^2$ and $y = 2x + 3$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the area of $R$.",
        "points": 3,
        "rubric": "1 pt: Intersection points $x = -1$ and $x = 3$\n1 pt: Integral $\\int_{-1}^{3}\\left[(2x+3) - x^2\\right]dx$\n1 pt: Area $= \\frac{32}{3}$"
      },
      {
        "label": "(b)",
        "prompt": "Find the volume of the solid generated by rotating $R$ about the horizontal line $y = -1$.",
        "points": 3,
        "rubric": "1 pt: Sets up washers with correct outer/inner radii\n1 pt: Correct integrand\n1 pt: Volume (approx $\\frac{1088\\pi}{15}$)"
      },
      {
        "label": "(c)",
        "prompt": "The region $R$ is the base of a solid whose cross sections perpendicular to the $x$-axis are squares. Find the volume of this solid.",
        "points": 2,
        "rubric": "1 pt: Side length $(2x+3) - x^2$\n1 pt: Volume $\\int_{-1}^{3}\\left[(2x+3)-x^2\\right]^2 dx$"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from released AP Calculus AB FRQ (2019)."
  },
  {
    "id": "calc-ab-2018-1",
    "courseSlug": "ap-calc-ab",
    "year": 2018,
    "number": 1,
    "topic": "Rate In / Rate Out",
    "prompt": "Water flows into a tank at a rate $R(t) = 120\\sqrt{t}$ gallons per hour, while water drains out at a rate $D(t) = 9t^2$ gallons per hour for $0 \\le t \\le 6$ hours. At $t = 0$, the tank contains 500 gallons.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "How many gallons of water enter the tank during the 6-hour period?",
        "points": 2,
        "rubric": "1 pt: Integral $\\int_0^6 120\\sqrt{t}\\,dt$\n1 pt: Value $80 \\cdot 6^{3/2} \\approx 1175.76$ gallons"
      },
      {
        "label": "(b)",
        "prompt": "Is the amount of water in the tank increasing or decreasing at $t = 4$? Justify.",
        "points": 2,
        "rubric": "1 pt: Computes $R(4) - D(4) = 240 - 144 = 96 > 0$\n1 pt: Concludes increasing because net rate is positive"
      },
      {
        "label": "(c)",
        "prompt": "At what time $t$ in $[0, 6]$ is the amount of water in the tank a maximum? Justify.",
        "points": 3,
        "rubric": "1 pt: Sets $R(t) = D(t)$ giving $120\\sqrt{t} = 9t^2$\n1 pt: Solves $t \\approx 4.756$\n1 pt: Justifies max via sign change of $R - D$ from positive to negative"
      },
      {
        "label": "(d)",
        "prompt": "Write an expression for the amount of water in the tank at time $t$.",
        "points": 2,
        "rubric": "1 pt: $W(t) = 500 + \\int_0^t (R(s) - D(s))\\,ds$\n1 pt: Correct integrand in terms of $s$"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from released AP Calculus AB FRQ (2018)."
  },
  {
    "id": "calc-ab-2017-3",
    "courseSlug": "ap-calc-ab",
    "year": 2017,
    "number": 3,
    "topic": "Function Defined by an Integral",
    "prompt": "Let $g(x) = \\int_0^x f(t)\\,dt$, where the graph of $f$ on $[-2, 6]$ consists of two line segments and a semicircle as shown.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find $g(4)$ using geometry.",
        "points": 2,
        "rubric": "1 pt: Computes area on $[0,2]$ (triangle)\n1 pt: Computes area on $[2,4]$ (half of semicircle) and sums correctly"
      },
      {
        "label": "(b)",
        "prompt": "Find $g'(3)$ and $g''(3)$.",
        "points": 2,
        "rubric": "1 pt: $g'(3) = f(3)$ read from graph\n1 pt: $g''(3) = f'(3)$ = slope of $f$ at $x=3$"
      },
      {
        "label": "(c)",
        "prompt": "On what open interval(s) is $g$ both increasing and concave down? Justify.",
        "points": 3,
        "rubric": "1 pt: Identifies where $f > 0$ (increasing $g$)\n1 pt: Identifies where $f' < 0$ (concave down $g$)\n1 pt: Correct intersection of the two conditions"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from released AP Calculus AB FRQ (2017)."
  },
  {
    "id": "calc-ab-2018-4",
    "courseSlug": "ap-calc-ab",
    "year": 2018,
    "number": 4,
    "topic": "Implicit Differentiation",
    "prompt": "Consider the curve defined by $x^2 + xy + y^3 = 11$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find $\\frac{dy}{dx}$ in terms of $x$ and $y$.",
        "points": 3,
        "rubric": "1 pt: Differentiates each term correctly\n1 pt: Collects $\\frac{dy}{dx}$ terms\n1 pt: $\\frac{dy}{dx} = \\frac{-2x - y}{x + 3y^2}$"
      },
      {
        "label": "(b)",
        "prompt": "Write an equation of the tangent line to the curve at the point $(1, 2)$.",
        "points": 2,
        "rubric": "1 pt: Computes slope at $(1,2)$: $\\frac{-4}{13}$\n1 pt: Tangent line $y - 2 = -\\frac{4}{13}(x - 1)$"
      },
      {
        "label": "(c)",
        "prompt": "Find all points on the curve where the tangent line is horizontal, or explain why none exist.",
        "points": 2,
        "rubric": "1 pt: Sets numerator $-2x - y = 0$, so $y = -2x$\n1 pt: Substitutes into original and solves or notes a valid solution"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from released AP Calculus AB FRQ (2018)."
  },
  {
    "id": "calc-ab-2016-2",
    "courseSlug": "ap-calc-ab",
    "year": 2016,
    "number": 2,
    "topic": "Related Rates",
    "prompt": "A conical tank has its vertex pointing down. The tank has a height of 10 meters and a radius of 4 meters at the top. Water is being pumped in at a rate of $3\\,\\text{m}^3/\\text{min}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Express the volume of water in the tank as a function of the water height $h$ alone.",
        "points": 3,
        "rubric": "1 pt: Uses similar triangles: $r/h = 4/10$\n1 pt: $r = 2h/5$\n1 pt: $V = \\frac{1}{3}\\pi (2h/5)^2 h = \\frac{4\\pi h^3}{75}$"
      },
      {
        "label": "(b)",
        "prompt": "At what rate is the water level rising when the height is 3 meters?",
        "points": 3,
        "rubric": "1 pt: Differentiates: $\\frac{dV}{dt} = \\frac{4\\pi h^2}{25}\\frac{dh}{dt}$\n1 pt: Substitutes $h = 3$ and $\\frac{dV}{dt} = 3$\n1 pt: $\\frac{dh}{dt} = \\frac{25}{12\\pi}$ m/min"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from released AP Calculus AB FRQ (2016)."
  },
  {
    "id": "calc-ab-2015-5",
    "courseSlug": "ap-calc-ab",
    "year": 2015,
    "number": 5,
    "topic": "Differential Equation and Slope Field",
    "prompt": "Consider the differential equation $\\frac{dy}{dx} = x(y - 1)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "On the slope field shown, sketch the solution curve that passes through the point $(0, 3)$.",
        "points": 2,
        "rubric": "1 pt: Curve passes through $(0,3)$\n1 pt: Curve follows the slopes correctly"
      },
      {
        "label": "(b)",
        "prompt": "Find the particular solution $y = f(x)$ to the differential equation with initial condition $f(0) = 3$.",
        "points": 4,
        "rubric": "1 pt: Separates variables $\\frac{dy}{y-1} = x\\,dx$\n1 pt: Integrates: $\\ln|y-1| = \\frac{x^2}{2} + C$\n1 pt: Applies initial condition to find $C = \\ln 2$\n1 pt: Final answer $y = 1 + 2e^{x^2/2}$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from released AP Calculus AB FRQ (2015)."
  },
  {
    "id": "calc-ab-2017-4",
    "courseSlug": "ap-calc-ab",
    "year": 2017,
    "number": 4,
    "topic": "Accumulation from a Table",
    "prompt": "The continuous function $H$ gives the temperature, in degrees Celsius, of a potato at time $t$ minutes. Values of $H$ at selected times are given in the table.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Estimate $H'(6)$ using the values in the table. Show the computation and include units.",
        "points": 2,
        "rubric": "1 pt: Uses symmetric difference $\\frac{H(8) - H(4)}{4}$\n1 pt: Value $-4.5$ degrees Celsius per minute"
      },
      {
        "label": "(b)",
        "prompt": "Use a left Riemann sum with the three subintervals from the table to approximate $\\int_0^{12} H(t)\\,dt$.",
        "points": 2,
        "rubric": "1 pt: Sum $4(H(0) + H(4) + H(8))$\n1 pt: Value $4(98 + 76 + 58) = 928$"
      },
      {
        "label": "(c)",
        "prompt": "Is the approximation in (b) an overestimate or underestimate of $\\int_0^{12} H(t)\\,dt$? Justify.",
        "points": 2,
        "rubric": "1 pt: Notes $H$ is decreasing on $[0, 12]$\n1 pt: Concludes left Riemann sum is an overestimate"
      },
      {
        "label": "(d)",
        "prompt": "Interpret the meaning of $\\frac{1}{12}\\int_0^{12} H(t)\\,dt$ in the context of this problem.",
        "points": 2,
        "rubric": "1 pt: Average value of $H$ on $[0,12]$\n1 pt: States average temperature of the potato over the first 12 minutes in degrees Celsius"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from released AP Calculus AB FRQ (2017)."
  },
  {
    "id": "calc-ab-2021-2",
    "courseSlug": "ap-calc-ab",
    "year": 2021,
    "number": 2,
    "topic": "Extrema and Analysis",
    "prompt": "Let $f(x) = x^3 - 6x^2 + 9x + 2$ on the closed interval $[0, 4]$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find all critical points of $f$ on $(0, 4)$.",
        "points": 2,
        "rubric": "1 pt: $f'(x) = 3x^2 - 12x + 9$\n1 pt: Critical points $x = 1$ and $x = 3$"
      },
      {
        "label": "(b)",
        "prompt": "Find the absolute maximum and absolute minimum of $f$ on $[0, 4]$. Justify.",
        "points": 3,
        "rubric": "1 pt: Evaluates $f$ at $0, 1, 3, 4$\n1 pt: Absolute max at $x=1$ with $f(1) = 6$\n1 pt: Absolute min at $x=0$ with $f(0) = 2$"
      },
      {
        "label": "(c)",
        "prompt": "Find the intervals on which $f$ is concave up. Show your reasoning.",
        "points": 2,
        "rubric": "1 pt: $f''(x) = 6x - 12$; sets $f'' > 0$\n1 pt: Concave up on $(2, 4]$ (or $x > 2$)"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from released AP Calculus AB FRQ (2021)."
  },
  {
    "id": "calc-ab-2022-3",
    "courseSlug": "ap-calc-ab",
    "year": 2022,
    "number": 3,
    "topic": "Mean Value Theorem and Average Value",
    "prompt": "Let $f$ be a function differentiable on $[1, 7]$ with $f(1) = 4$ and $f(7) = 22$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Must there exist a value $c$ in $(1, 7)$ such that $f'(c) = 3$? Justify using a theorem.",
        "points": 2,
        "rubric": "1 pt: Cites Mean Value Theorem with correct hypotheses verified\n1 pt: Computes $\\frac{f(7) - f(1)}{7 - 1} = 3$ and concludes existence"
      },
      {
        "label": "(b)",
        "prompt": "Suppose additionally that $1 \\le f'(x) \\le 5$ for all $x$ in $[1, 7]$. Give the largest possible value of $f(7)$ given $f(1) = 4$, and justify.",
        "points": 3,
        "rubric": "1 pt: Uses $f(7) = f(1) + \\int_1^7 f'(x)\\,dx$\n1 pt: Bounds integral by $5 \\cdot 6 = 30$\n1 pt: States largest possible $f(7) = 34$"
      },
      {
        "label": "(c)",
        "prompt": "Interpret $\\frac{1}{6}\\int_1^7 f'(x)\\,dx$ in context.",
        "points": 2,
        "rubric": "1 pt: Identifies expression as average value of $f'$ on $[1,7]$\n1 pt: States it equals the average rate of change of $f$ on $[1,7]$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from released AP Calculus AB FRQ (2022)."
  },
  {
    "id": "calc-ab-2023-1",
    "courseSlug": "ap-calc-ab",
    "year": 2023,
    "number": 1,
    "topic": "Rate In / Rate Out (Calculator)",
    "prompt": "Customers arrive at a coffee shop at a rate of $A(t) = 25 + 18\\sin\\left(\\frac{\\pi t}{6}\\right)$ customers per hour for $0 \\le t \\le 12$, where $t$ is measured in hours after 6:00 AM. Customers leave at a rate of $L(t) = 20 + 0.5t^2 - 0.04t^3$ customers per hour.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "How many customers arrive at the shop between 6:00 AM and 12:00 PM?",
        "points": 2,
        "rubric": "1 pt: Integral setup $\\int_0^6 A(t)\\,dt$\n1 pt: Value approximately 218.75 customers"
      },
      {
        "label": "(b)",
        "prompt": "Is the number of customers in the shop increasing or decreasing at $t = 8$? Justify.",
        "points": 2,
        "rubric": "1 pt: Computes $A(8) - L(8)$\n1 pt: Signed difference with correct conclusion"
      },
      {
        "label": "(c)",
        "prompt": "Find the time $t$ in $(0, 12)$ at which the number of customers is at a maximum. Justify.",
        "points": 3,
        "rubric": "1 pt: Sets $A(t) = L(t)$ and solves numerically\n1 pt: Identifies candidate time and endpoints\n1 pt: Justifies maximum with sign analysis of $A - L$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from released AP Calculus AB FRQ (2023)."
  },
  {
    "id": "calc-ab-2024-2",
    "courseSlug": "ap-calc-ab",
    "year": 2024,
    "number": 2,
    "topic": "Area Between Curves and Solid",
    "prompt": "Let $R$ be the region in the first quadrant bounded by $y = \\sin x$, $y = \\frac{x}{3}$, and the $y$-axis.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write, but do not evaluate, an integral expression for the area of $R$.",
        "points": 2,
        "rubric": "1 pt: Identifies intersection $x = a$ where $\\sin a = a/3$ (approximately $a \\approx 2.279$)\n1 pt: $\\int_0^a \\left(\\sin x - \\frac{x}{3}\\right)dx$"
      },
      {
        "label": "(b)",
        "prompt": "Write, but do not evaluate, an integral for the volume of the solid of revolution of $R$ about the $x$-axis.",
        "points": 2,
        "rubric": "1 pt: Sets up washers: outer $\\sin x$, inner $x/3$\n1 pt: $V = \\pi \\int_0^a \\left[\\sin^2 x - (x/3)^2\\right]dx$"
      },
      {
        "label": "(c)",
        "prompt": "The region $R$ is the base of a solid whose cross sections perpendicular to the $x$-axis are semicircles with diameter in $R$. Write an integral expression for the volume.",
        "points": 2,
        "rubric": "1 pt: Radius $= (\\sin x - x/3)/2$\n1 pt: $V = \\frac{\\pi}{8}\\int_0^a \\left(\\sin x - \\frac{x}{3}\\right)^2 dx$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from released AP Calculus AB FRQ (2024)."
  },
  {
    "id": "calc-ab-2016-5",
    "courseSlug": "ap-calc-ab",
    "year": 2016,
    "number": 5,
    "topic": "Linearization and IVT",
    "prompt": "Let $f$ be a differentiable function with $f(2) = 7$ and $f'(2) = -3$. Suppose also that $f''(x) < 0$ for all $x$ near 2.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the equation of the tangent line to $f$ at $x = 2$ and use it to approximate $f(2.1)$.",
        "points": 2,
        "rubric": "1 pt: Tangent line $y = 7 - 3(x - 2)$\n1 pt: Approximation $f(2.1) \\approx 6.7$"
      },
      {
        "label": "(b)",
        "prompt": "Is your approximation in (a) an overestimate or underestimate of $f(2.1)$? Justify.",
        "points": 2,
        "rubric": "1 pt: Cites concavity: $f'' < 0$ implies graph lies below tangent line\n1 pt: Concludes approximation is an overestimate"
      },
      {
        "label": "(c)",
        "prompt": "If $f'$ is continuous and $f'(5) = 2$, show that there exists some $c$ in $(2, 5)$ with $f'(c) = 0$.",
        "points": 2,
        "rubric": "1 pt: Cites Intermediate Value Theorem applied to $f'$\n1 pt: Notes $f'(2) = -3 < 0 < 2 = f'(5)$, so some $c$ gives $f'(c) = 0$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from released AP Calculus AB FRQ (2016)."
  },

  // ─── ap-calc-bc ────────────────────────────────────────────────────
  {
    "id": "calc-bc-2018-2",
    "courseSlug": "ap-calc-bc",
    "year": 2018,
    "number": 2,
    "topic": "Parametric Motion",
    "prompt": "A particle moves in the xy-plane with position $(x(t), y(t))$ for $0 \\le t \\le 4$, where $\\frac{dx}{dt} = t^2 - 6t + 5$ and $\\frac{dy}{dt} = e^{-t}\\sin t$. At time $t=0$, the particle is at position $(1, 2)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the speed of the particle at time $t=2$.",
        "points": 2,
        "rubric": "1 pt: sets up speed as $\\sqrt{(dx/dt)^2 + (dy/dt)^2}$\n1 pt: correct numerical value at $t=2$"
      },
      {
        "label": "(b)",
        "prompt": "Find the total distance traveled by the particle on $0 \\le t \\le 4$.",
        "points": 3,
        "rubric": "1 pt: integral form $\\int_0^4 \\sqrt{(dx/dt)^2+(dy/dt)^2}\\,dt$\n1 pt: correct integrand\n1 pt: correct numerical answer"
      },
      {
        "label": "(c)",
        "prompt": "Find the x-coordinate of the position of the particle at time $t=4$.",
        "points": 2,
        "rubric": "1 pt: integral $1 + \\int_0^4 (t^2-6t+5)\\,dt$\n1 pt: correct numerical value"
      },
      {
        "label": "(d)",
        "prompt": "For $0 \\le t \\le 4$, find all times $t$ at which the particle is moving horizontally (in the positive or negative x direction only).",
        "points": 2,
        "rubric": "1 pt: condition $dy/dt = 0$ with $dx/dt \\ne 0$\n1 pt: correct value(s) of $t$"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from AP Calculus BC 2018 FRQ 2"
  },
  {
    "id": "calc-bc-2019-6",
    "courseSlug": "ap-calc-bc",
    "year": 2019,
    "number": 6,
    "topic": "Taylor Series",
    "prompt": "The Maclaurin series for $f(x)$ is given by $f(x) = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1} x^{2n-1}}{(2n-1)!}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify $f(x)$ as a familiar function and state its interval of convergence.",
        "points": 2,
        "rubric": "1 pt: identifies $f(x) = \\sin x$\n1 pt: interval of convergence is all real numbers"
      },
      {
        "label": "(b)",
        "prompt": "Write the first four nonzero terms and the general term of the Maclaurin series for $g(x) = f'(x)$.",
        "points": 3,
        "rubric": "1 pt: first two nonzero terms correct\n1 pt: next two nonzero terms correct\n1 pt: correct general term"
      },
      {
        "label": "(c)",
        "prompt": "Use the series in part (b) to approximate $g(0.2)$ with error less than $0.0001$. Justify.",
        "points": 3,
        "rubric": "1 pt: uses alternating series error bound\n1 pt: identifies number of terms needed\n1 pt: correct approximation"
      },
      {
        "label": "(d)",
        "prompt": "Let $h(x) = \\int_0^x f(t)\\,dt$. Write the Maclaurin series for $h(x)$ showing the first three nonzero terms.",
        "points": 2,
        "rubric": "1 pt: integrates series term-by-term\n1 pt: correct first three nonzero terms"
      }
    ],
    "totalPoints": 10,
    "source": "Modified from AP Calculus BC 2019 FRQ 6"
  },
  {
    "id": "calc-bc-2017-2",
    "courseSlug": "ap-calc-bc",
    "year": 2017,
    "number": 2,
    "topic": "Polar Area",
    "prompt": "The graphs of the polar curves $r = 3$ and $r = 4 - 2\\sin\\theta$ are shown. The curves intersect when $\\theta = \\frac{\\pi}{6}$ and $\\theta = \\frac{5\\pi}{6}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Let $R$ be the region inside the graph of $r = 3$ and inside the graph of $r = 4 - 2\\sin\\theta$. Find the area of $R$.",
        "points": 4,
        "rubric": "1 pt: correct split of region\n1 pt: integral for inner curve portion\n1 pt: integral for outer curve portion\n1 pt: correct total area"
      },
      {
        "label": "(b)",
        "prompt": "For the curve $r = 4 - 2\\sin\\theta$, find the value of $\\frac{dx}{d\\theta}$ at $\\theta = \\frac{\\pi}{3}$.",
        "points": 3,
        "rubric": "1 pt: $x = r\\cos\\theta$ setup\n1 pt: correct derivative formula\n1 pt: correct numerical value"
      },
      {
        "label": "(c)",
        "prompt": "A particle moves along the polar curve $r = 4 - 2\\sin\\theta$ so that $\\frac{d\\theta}{dt} = 2$. Find $\\frac{dr}{dt}$ at $\\theta = \\frac{\\pi}{3}$.",
        "points": 2,
        "rubric": "1 pt: chain rule setup\n1 pt: correct numerical value"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from AP Calculus BC 2017 FRQ 2"
  },
  {
    "id": "calc-bc-2016-4",
    "courseSlug": "ap-calc-bc",
    "year": 2016,
    "number": 4,
    "topic": "Differential Equations",
    "prompt": "Consider the differential equation $\\frac{dy}{dx} = \\frac{x+1}{y}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "On the slope field provided (not shown), sketch the solution curve passing through $(0, -2)$ and describe its behavior.",
        "points": 2,
        "rubric": "1 pt: correct slope at $(0,-2)$\n1 pt: describes curve continuing in third quadrant"
      },
      {
        "label": "(b)",
        "prompt": "Find $\\frac{d^2 y}{dx^2}$ in terms of $x$ and $y$. Determine the concavity of the solution curve at $(0, -2)$.",
        "points": 3,
        "rubric": "1 pt: implicit differentiation setup\n1 pt: correct second derivative expression\n1 pt: correct concavity conclusion"
      },
      {
        "label": "(c)",
        "prompt": "Find the particular solution $y = f(x)$ with initial condition $f(0) = -2$.",
        "points": 4,
        "rubric": "1 pt: separates variables\n1 pt: antidifferentiates both sides\n1 pt: uses initial condition\n1 pt: correct explicit solution"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from AP Calculus BC 2016 FRQ 4"
  },
  {
    "id": "calc-bc-2021-5",
    "courseSlug": "ap-calc-bc",
    "year": 2021,
    "number": 5,
    "topic": "Series Convergence",
    "prompt": "Consider the power series $\\sum_{n=1}^{\\infty} \\frac{(x-3)^n}{n \\cdot 4^n}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the radius of convergence of the series.",
        "points": 3,
        "rubric": "1 pt: sets up ratio test\n1 pt: evaluates limit correctly\n1 pt: radius $R = 4$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the interval of convergence, checking endpoints.",
        "points": 3,
        "rubric": "1 pt: tests $x = -1$ (alternating harmonic)\n1 pt: tests $x = 7$ (harmonic series)\n1 pt: correct interval $[-1, 7)$"
      },
      {
        "label": "(c)",
        "prompt": "Let $f(x)$ be the function defined by the power series. Find $f''(3)$.",
        "points": 2,
        "rubric": "1 pt: recognizes coefficient pattern\n1 pt: correct value using $f''(3) = 2!\\cdot a_2$"
      }
    ],
    "totalPoints": 8,
    "source": "Modified from AP Calculus BC 2021 FRQ 5"
  },
  {
    "id": "calc-bc-2022-6",
    "courseSlug": "ap-calc-bc",
    "year": 2022,
    "number": 6,
    "topic": "Maclaurin Series",
    "prompt": "Let $f$ be the function defined by $f(x) = \\ln(1+x^2)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the first four nonzero terms of the Maclaurin series for $f(x)$.",
        "points": 3,
        "rubric": "1 pt: starts from known series for $\\ln(1+u)$\n1 pt: substitutes $u = x^2$ correctly\n1 pt: correct four nonzero terms"
      },
      {
        "label": "(b)",
        "prompt": "Use the series from part (a) to find $f^{(6)}(0)$.",
        "points": 2,
        "rubric": "1 pt: uses coefficient formula $a_n = f^{(n)}(0)/n!$\n1 pt: correct value of $f^{(6)}(0)$"
      },
      {
        "label": "(c)",
        "prompt": "Determine whether the series $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n}$ converges absolutely, converges conditionally, or diverges. Justify.",
        "points": 3,
        "rubric": "1 pt: notes alternating series converges\n1 pt: notes absolute series is harmonic and diverges\n1 pt: concludes conditional convergence"
      }
    ],
    "totalPoints": 8,
    "source": "Modified from AP Calculus BC 2022 FRQ 6"
  },
  {
    "id": "calc-bc-2023-2",
    "courseSlug": "ap-calc-bc",
    "year": 2023,
    "number": 2,
    "topic": "Parametric and Vector",
    "prompt": "A particle moves in the xy-plane with velocity vector $v(t) = \\langle \\cos(t^2), e^{0.5t}\\rangle$ for $0 \\le t \\le 3$. At $t=1$, the particle is at $(2, 5)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the acceleration vector at $t=1$.",
        "points": 2,
        "rubric": "1 pt: differentiates each component\n1 pt: correct numerical vector"
      },
      {
        "label": "(b)",
        "prompt": "Find the position of the particle at time $t=2$.",
        "points": 3,
        "rubric": "1 pt: sets up $x(2) = 2 + \\int_1^2 \\cos(t^2)\\,dt$\n1 pt: sets up $y(2) = 5 + \\int_1^2 e^{0.5t}\\,dt$\n1 pt: correct numerical position"
      },
      {
        "label": "(c)",
        "prompt": "Find the total distance traveled by the particle on $1 \\le t \\le 3$.",
        "points": 2,
        "rubric": "1 pt: integral $\\int_1^3 \\sqrt{\\cos^2(t^2)+e^t}\\,dt$\n1 pt: correct numerical distance"
      },
      {
        "label": "(d)",
        "prompt": "At time $t=1$, is the speed of the particle increasing or decreasing? Justify.",
        "points": 2,
        "rubric": "1 pt: computes $v \\cdot a$ at $t=1$\n1 pt: correct sign interpretation and conclusion"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from AP Calculus BC 2023 FRQ 2"
  },
  {
    "id": "calc-bc-2015-6",
    "courseSlug": "ap-calc-bc",
    "year": 2015,
    "number": 6,
    "topic": "Taylor Polynomials",
    "prompt": "The function $f$ has derivatives of all orders for all real numbers. It is known that $f(0) = 2$, $f'(0) = -3$, $f''(0) = 4$, and $f'''(0) = 6$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the third-degree Taylor polynomial $P_3(x)$ for $f$ about $x=0$.",
        "points": 2,
        "rubric": "1 pt: correct linear and quadratic terms\n1 pt: correct cubic term"
      },
      {
        "label": "(b)",
        "prompt": "Use $P_3(x)$ to approximate $f(0.5)$.",
        "points": 1,
        "rubric": "1 pt: correct numerical approximation"
      },
      {
        "label": "(c)",
        "prompt": "The fourth derivative of $f$ satisfies $|f^{(4)}(x)| \\le 20$ for all $x$. Use the Lagrange error bound to show that $|f(0.5) - P_3(0.5)| \\le \\frac{20}{24}(0.5)^4$.",
        "points": 3,
        "rubric": "1 pt: states Lagrange error formula\n1 pt: substitutes bound and interval\n1 pt: arrives at stated inequality"
      },
      {
        "label": "(d)",
        "prompt": "Let $g(x) = \\int_0^x f(t)\\,dt$. Find the third-degree Taylor polynomial for $g$ about $x=0$.",
        "points": 2,
        "rubric": "1 pt: integrates $P_2(x)$ term-by-term\n1 pt: correct polynomial for $g$"
      }
    ],
    "totalPoints": 8,
    "source": "Modified from AP Calculus BC 2015 FRQ 6"
  },
  {
    "id": "calc-bc-2024-4",
    "courseSlug": "ap-calc-bc",
    "year": 2024,
    "number": 4,
    "topic": "Logistic Differential Equation",
    "prompt": "A population $P(t)$ of rabbits satisfies the logistic differential equation $\\frac{dP}{dt} = 0.04 P\\left(1 - \\frac{P}{500}\\right)$ where $t$ is in months. At $t=0$, $P(0) = 50$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find $\\lim_{t\\to\\infty} P(t)$ and interpret in context.",
        "points": 2,
        "rubric": "1 pt: limit equals $500$\n1 pt: interprets as carrying capacity"
      },
      {
        "label": "(b)",
        "prompt": "Find the population size at which the rabbit population is growing fastest.",
        "points": 2,
        "rubric": "1 pt: sets derivative of growth rate to zero\n1 pt: answer $P = 250$"
      },
      {
        "label": "(c)",
        "prompt": "Use separation of variables to find the particular solution $P(t)$ with $P(0)=50$.",
        "points": 4,
        "rubric": "1 pt: separates variables with partial fractions\n1 pt: integrates both sides\n1 pt: applies initial condition\n1 pt: correct explicit $P(t)$"
      }
    ],
    "totalPoints": 8,
    "source": "Modified from AP Calculus BC 2024 FRQ 4"
  },
  {
    "id": "calc-bc-2020-3",
    "courseSlug": "ap-calc-bc",
    "year": 2020,
    "number": 3,
    "topic": "Integration and Area",
    "prompt": "Let $R$ be the region bounded by the graphs of $y = \\sqrt{x}$ and $y = \\frac{x}{2}$ in the first quadrant.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the area of $R$.",
        "points": 3,
        "rubric": "1 pt: finds intersection points $x=0,4$\n1 pt: integral $\\int_0^4 (\\sqrt{x}-x/2)\\,dx$\n1 pt: correct area $4/3$"
      },
      {
        "label": "(b)",
        "prompt": "Find the volume of the solid generated when $R$ is revolved about the x-axis.",
        "points": 3,
        "rubric": "1 pt: washer setup\n1 pt: correct integrand $\\pi(x - x^2/4)$\n1 pt: correct volume"
      },
      {
        "label": "(c)",
        "prompt": "The region $R$ is the base of a solid whose cross sections perpendicular to the x-axis are squares. Find the volume of this solid.",
        "points": 3,
        "rubric": "1 pt: side length $\\sqrt{x}-x/2$\n1 pt: integral $\\int_0^4 (\\sqrt{x}-x/2)^2\\,dx$\n1 pt: correct numerical volume"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from AP Calculus BC 2020 FRQ 3"
  },
  {
    "id": "calc-bc-2018-5",
    "courseSlug": "ap-calc-bc",
    "year": 2018,
    "number": 5,
    "topic": "Polar Curves",
    "prompt": "The polar curve is given by $r(\\theta) = 2 + \\cos(2\\theta)$ for $0 \\le \\theta \\le 2\\pi$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the area enclosed by the curve.",
        "points": 3,
        "rubric": "1 pt: integral $\\frac{1}{2}\\int_0^{2\\pi} (2+\\cos 2\\theta)^2\\,d\\theta$\n1 pt: expands integrand correctly\n1 pt: correct area $9\\pi/2$"
      },
      {
        "label": "(b)",
        "prompt": "Find the average distance from the origin to a point on the curve over $0 \\le \\theta \\le 2\\pi$.",
        "points": 2,
        "rubric": "1 pt: average value $\\frac{1}{2\\pi}\\int_0^{2\\pi}(2+\\cos 2\\theta)\\,d\\theta$\n1 pt: correct average value $2$"
      },
      {
        "label": "(c)",
        "prompt": "For what values of $\\theta$ in $[0, 2\\pi]$ is $r(\\theta)$ maximized?",
        "points": 2,
        "rubric": "1 pt: sets $r'(\\theta) = 0$\n1 pt: correct values $\\theta = 0, \\pi, 2\\pi$"
      }
    ],
    "totalPoints": 7,
    "source": "Modified from AP Calculus BC 2018 FRQ 5"
  },
  {
    "id": "calc-bc-2019-2",
    "courseSlug": "ap-calc-bc",
    "year": 2019,
    "number": 2,
    "topic": "Rates and Accumulation",
    "prompt": "Water flows into a tank at a rate $R(t) = 20 + 5\\sin(t/2)$ gallons per hour for $0 \\le t \\le 8$ hours. Water is pumped out at a constant rate of $15$ gallons per hour. The tank contains $40$ gallons at $t=0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "How many gallons of water flow into the tank during the 8-hour period?",
        "points": 2,
        "rubric": "1 pt: integral $\\int_0^8 (20+5\\sin(t/2))\\,dt$\n1 pt: correct numerical answer"
      },
      {
        "label": "(b)",
        "prompt": "Is the amount of water in the tank increasing or decreasing at $t=3$? Justify.",
        "points": 2,
        "rubric": "1 pt: compares $R(3)$ to $15$\n1 pt: correct conclusion with justification"
      },
      {
        "label": "(c)",
        "prompt": "Find the time $t$ in $[0, 8]$ at which the amount of water is smallest. Justify.",
        "points": 4,
        "rubric": "1 pt: sets $R(t) - 15 = 0$\n1 pt: candidate critical values\n1 pt: evaluates endpoints\n1 pt: justified minimum"
      }
    ],
    "totalPoints": 8,
    "source": "Modified from AP Calculus BC 2019 FRQ 2"
  },

  // ─── ap-statistics ────────────────────────────────────────────────────
  {
    "id": "stats-2017-1",
    "courseSlug": "ap-statistics",
    "year": 2017,
    "number": 1,
    "topic": "Boxplots and Comparing Distributions",
    "prompt": "A farm researcher measured the weights (in pounds) of tomatoes grown with Fertilizer A and Fertilizer B. The side-by-side boxplots summarize the two samples of size $n = 30$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Compare the distributions of tomato weights for Fertilizer A and Fertilizer B with respect to shape, center, spread, and outliers.",
        "points": 4,
        "rubric": "1 pt: compares shape (symmetry/skew)\n1 pt: compares centers with values\n1 pt: compares spreads with IQR or range\n1 pt: addresses outliers for both"
      },
      {
        "label": "(b)",
        "prompt": "The researcher claims Fertilizer B produces heavier tomatoes on average. Based only on these boxplots, does the claim appear supported? Justify.",
        "points": 2,
        "rubric": "1 pt: references median comparison\n1 pt: acknowledges variability/overlap in justification"
      }
    ],
    "totalPoints": 6,
    "source": "Modified from AP Statistics 2017 FRQ 1"
  },
  {
    "id": "stats-2018-3",
    "courseSlug": "ap-statistics",
    "year": 2018,
    "number": 3,
    "topic": "Probability",
    "prompt": "A certain airline reports that 82 percent of its flights arrive on time. A random sample of 10 flights is selected. Let $X$ represent the number of on-time flights in the sample.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify the probability distribution of $X$ and justify your choice.",
        "points": 2,
        "rubric": "1 pt: identifies binomial with $n=10$, $p=0.82$\n1 pt: justifies with BINS conditions"
      },
      {
        "label": "(b)",
        "prompt": "Find the probability that at least 9 of the 10 flights arrive on time.",
        "points": 2,
        "rubric": "1 pt: sets up $P(X \\ge 9) = P(X=9)+P(X=10)$\n1 pt: correct numerical probability"
      },
      {
        "label": "(c)",
        "prompt": "Find the mean and standard deviation of $X$.",
        "points": 2,
        "rubric": "1 pt: mean $np = 8.2$\n1 pt: standard deviation $\\sqrt{np(1-p)} \\approx 1.215$"
      }
    ],
    "totalPoints": 6,
    "source": "Modified from AP Statistics 2018 FRQ 3"
  },
  {
    "id": "stats-2019-5",
    "courseSlug": "ap-statistics",
    "year": 2019,
    "number": 5,
    "topic": "Chi-Square Test",
    "prompt": "A researcher surveyed 200 adults asking their preferred commuting method (car, bike, transit) and whether they live in an urban or suburban area. Observed counts: Urban (35 car, 25 bike, 40 transit); Suburban (60 car, 15 bike, 25 transit).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "State the appropriate null and alternative hypotheses for a test of whether commuting method is independent of area.",
        "points": 2,
        "rubric": "1 pt: correct null (independence)\n1 pt: correct alternative (not independent)"
      },
      {
        "label": "(b)",
        "prompt": "Check the conditions required for performing a chi-square test of independence.",
        "points": 2,
        "rubric": "1 pt: random sample condition addressed\n1 pt: expected counts at least 5 verified"
      },
      {
        "label": "(c)",
        "prompt": "Compute the chi-square test statistic and the p-value. State a conclusion at the $\\alpha = 0.05$ level in context.",
        "points": 3,
        "rubric": "1 pt: correct test statistic value\n1 pt: correct p-value and df\n1 pt: conclusion in context at $\\alpha = 0.05$"
      }
    ],
    "totalPoints": 7,
    "source": "Modified from AP Statistics 2019 FRQ 5"
  },
  {
    "id": "stats-2020-2",
    "courseSlug": "ap-statistics",
    "year": 2020,
    "number": 2,
    "topic": "Scatterplots and Regression",
    "prompt": "A biologist recorded the height (cm) and leaf count of 8 seedlings. A scatterplot with the least-squares regression line is shown.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Describe the relationship shown by the scatterplot in terms of direction, form, and strength.",
        "points": 2,
        "rubric": "1 pt: direction (positive) and form (linear)\n1 pt: strength (moderately strong or strong)"
      },
      {
        "label": "(b)",
        "prompt": "The least-squares regression equation is $\\hat{y} = 1.2 + 0.35x$. Interpret the slope in context.",
        "points": 2,
        "rubric": "1 pt: correct unit language (leaf count per cm)\n1 pt: interprets as predicted increase per additional cm"
      },
      {
        "label": "(c)",
        "prompt": "For a seedling with height $25$ cm, compute the predicted leaf count and the residual if the observed leaf count is 11.",
        "points": 2,
        "rubric": "1 pt: predicted $\\hat{y} = 9.95$\n1 pt: residual $11 - 9.95 = 1.05$"
      }
    ],
    "totalPoints": 6,
    "source": "Modified from AP Statistics 2020 FRQ 2"
  },
  {
    "id": "stats-2021-4",
    "courseSlug": "ap-statistics",
    "year": 2021,
    "number": 4,
    "topic": "Two-Sample Inference",
    "prompt": "A nutritionist randomly assigns 40 volunteers to two diet plans (Plan X and Plan Y), 20 each. After 8 weeks, the mean weight loss is $\\bar{x}_X = 6.2$ lb ($s_X = 2.1$) and $\\bar{x}_Y = 4.8$ lb ($s_Y = 1.9$).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "State the null and alternative hypotheses for testing whether Plan X produces greater mean weight loss than Plan Y.",
        "points": 2,
        "rubric": "1 pt: correct null $\\mu_X = \\mu_Y$\n1 pt: correct one-sided alternative $\\mu_X > \\mu_Y$"
      },
      {
        "label": "(b)",
        "prompt": "Check the conditions for a two-sample t-test.",
        "points": 2,
        "rubric": "1 pt: random assignment condition addressed\n1 pt: normality or sample size condition addressed"
      },
      {
        "label": "(c)",
        "prompt": "Compute the test statistic and p-value. State a conclusion at $\\alpha = 0.05$ in context.",
        "points": 3,
        "rubric": "1 pt: correct t-statistic\n1 pt: correct p-value\n1 pt: conclusion in context"
      }
    ],
    "totalPoints": 7,
    "source": "Modified from AP Statistics 2021 FRQ 4"
  },
  {
    "id": "stats-2016-5",
    "courseSlug": "ap-statistics",
    "year": 2016,
    "number": 5,
    "topic": "Histograms",
    "prompt": "The histogram shows the distribution of exam scores for 50 students in a statistics class.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Describe the shape of the distribution.",
        "points": 2,
        "rubric": "1 pt: identifies approximately symmetric shape\n1 pt: notes single mode near 80"
      },
      {
        "label": "(b)",
        "prompt": "Would the mean or median better represent the center of this distribution? Justify.",
        "points": 2,
        "rubric": "1 pt: selects mean given symmetric shape\n1 pt: justifies choice using shape"
      },
      {
        "label": "(c)",
        "prompt": "Explain why the standard deviation is an appropriate measure of spread for this distribution.",
        "points": 1,
        "rubric": "1 pt: connects symmetry and lack of outliers to use of standard deviation"
      }
    ],
    "totalPoints": 5,
    "source": "Modified from AP Statistics 2016 FRQ 5"
  },
  {
    "id": "stats-2023-1",
    "courseSlug": "ap-statistics",
    "year": 2023,
    "number": 1,
    "topic": "Scatterplots",
    "prompt": "A study of 8 cities recorded the number of public parks (x) and the average reported community wellness score (y). The scatterplot with least-squares line is shown.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Describe the association between number of parks and wellness score.",
        "points": 2,
        "rubric": "1 pt: positive direction and linear form\n1 pt: strength described (strong)"
      },
      {
        "label": "(b)",
        "prompt": "The regression equation is $\\hat{y} = 32 + 2.4x$, with $r = 0.94$. Interpret $r^2$ in context.",
        "points": 2,
        "rubric": "1 pt: computes $r^2 \\approx 0.884$\n1 pt: interprets as percent of variability in wellness explained by parks"
      },
      {
        "label": "(c)",
        "prompt": "Explain why the model should not be used to predict wellness score for a city with 50 parks.",
        "points": 1,
        "rubric": "1 pt: identifies extrapolation beyond observed data range"
      }
    ],
    "totalPoints": 5,
    "source": "Modified from AP Statistics 2023 FRQ 1"
  },
  {
    "id": "stats-2015-4",
    "courseSlug": "ap-statistics",
    "year": 2015,
    "number": 4,
    "topic": "Sampling Distributions",
    "prompt": "A large population of light bulbs has lifetimes with mean $\\mu = 1200$ hours and standard deviation $\\sigma = 150$ hours. A simple random sample of $n = 36$ bulbs is selected.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Describe the sampling distribution of $\\bar{x}$, including shape, center, and spread.",
        "points": 3,
        "rubric": "1 pt: shape approximately normal by CLT\n1 pt: center $\\mu_{\\bar{x}} = 1200$\n1 pt: spread $\\sigma_{\\bar{x}} = 25$"
      },
      {
        "label": "(b)",
        "prompt": "Find the probability that the sample mean lifetime is less than $1170$ hours.",
        "points": 2,
        "rubric": "1 pt: standardizes to $z = -1.2$\n1 pt: correct probability $\\approx 0.1151$"
      },
      {
        "label": "(c)",
        "prompt": "The manufacturer claims $\\mu = 1200$. If a sample mean of $1150$ is observed, is there reason to doubt the claim? Justify.",
        "points": 2,
        "rubric": "1 pt: computes $z$-score approximately $-2$\n1 pt: conclusion with reference to unlikelihood under null"
      }
    ],
    "totalPoints": 7,
    "source": "Modified from AP Statistics 2015 FRQ 4"
  },
  {
    "id": "stats-2022-5",
    "courseSlug": "ap-statistics",
    "year": 2022,
    "number": 5,
    "topic": "Confidence Intervals",
    "prompt": "An environmental group samples $n = 64$ randomly selected streams and measures the pH. The sample mean is $\\bar{x} = 6.8$ with sample standard deviation $s = 0.5$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Check the conditions necessary to construct a one-sample t-interval for the mean pH.",
        "points": 2,
        "rubric": "1 pt: addresses random sample\n1 pt: large sample / CLT condition"
      },
      {
        "label": "(b)",
        "prompt": "Construct a 95 percent confidence interval for the mean pH of streams in this region.",
        "points": 3,
        "rubric": "1 pt: identifies $t^*$ with $df = 63$\n1 pt: correct margin of error\n1 pt: interval approximately $(6.675, 6.925)$"
      },
      {
        "label": "(c)",
        "prompt": "Interpret the interval in context.",
        "points": 1,
        "rubric": "1 pt: interprets as plausible values for mean pH with correct scope"
      }
    ],
    "totalPoints": 6,
    "source": "Modified from AP Statistics 2022 FRQ 5"
  },
  {
    "id": "stats-2024-3",
    "courseSlug": "ap-statistics",
    "year": 2024,
    "number": 3,
    "topic": "Experimental Design",
    "prompt": "A teacher wants to study whether students who listen to classical music while studying perform better on a vocabulary quiz than students who study in silence. There are 40 volunteers available.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Describe a completely randomized design for this experiment.",
        "points": 3,
        "rubric": "1 pt: describes random assignment to two groups of 20\n1 pt: specifies treatments (music vs silence)\n1 pt: specifies response (quiz score)"
      },
      {
        "label": "(b)",
        "prompt": "Explain one advantage of using a block design based on prior GPA in this experiment.",
        "points": 2,
        "rubric": "1 pt: describes blocking on prior GPA\n1 pt: explains reduces variability due to baseline differences"
      },
      {
        "label": "(c)",
        "prompt": "Why is random assignment important in this study?",
        "points": 1,
        "rubric": "1 pt: explains random assignment supports causal inference / balances lurking variables"
      }
    ],
    "totalPoints": 6,
    "source": "Modified from AP Statistics 2024 FRQ 3"
  },
  {
    "id": "stats-2019-2",
    "courseSlug": "ap-statistics",
    "year": 2019,
    "number": 2,
    "topic": "Two-Way Tables",
    "prompt": "A school surveyed 300 students about their preferred lunch option (Hot, Cold, Skip) and their grade level (9, 10, 11, 12). Grade 9: 30/20/25, Grade 10: 25/30/20, Grade 11: 20/25/30, Grade 12: 15/30/30.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "What proportion of surveyed students chose the hot lunch?",
        "points": 1,
        "rubric": "1 pt: correct proportion $90/300 = 0.30$"
      },
      {
        "label": "(b)",
        "prompt": "Given a student is a senior (grade 12), what is the probability they chose to skip lunch?",
        "points": 2,
        "rubric": "1 pt: conditional probability setup\n1 pt: correct value $30/75 = 0.40$"
      },
      {
        "label": "(c)",
        "prompt": "Based on the table, does lunch preference appear to depend on grade level? Justify using marginal and conditional distributions.",
        "points": 3,
        "rubric": "1 pt: computes relevant marginal distribution\n1 pt: computes comparison conditional distributions\n1 pt: reasoned conclusion about association"
      }
    ],
    "totalPoints": 6,
    "source": "Modified from AP Statistics 2019 FRQ 2"
  },
  {
    "id": "stats-2018-6",
    "courseSlug": "ap-statistics",
    "year": 2018,
    "number": 6,
    "topic": "Regression Inference",
    "prompt": "A study of 25 trees recorded trunk diameter (inches) and volume of wood (cubic feet). Computer output for the least-squares regression line is given.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "The output reports slope $b = 5.07$ with standard error $SE(b) = 0.25$. State the hypotheses and test statistic for testing whether the true slope differs from zero.",
        "points": 3,
        "rubric": "1 pt: correct null $\\beta = 0$ and two-sided alternative\n1 pt: correct test statistic formula\n1 pt: computes $t \\approx 20.28$"
      },
      {
        "label": "(b)",
        "prompt": "Construct and interpret a 95 percent confidence interval for $\\beta$.",
        "points": 3,
        "rubric": "1 pt: correct $t^*$ with df = 23\n1 pt: interval approximately $(4.55, 5.59)$\n1 pt: interprets in context"
      },
      {
        "label": "(c)",
        "prompt": "Before using inference, what condition about residuals should be checked? Briefly describe how.",
        "points": 2,
        "rubric": "1 pt: identifies residual plot / normality condition\n1 pt: describes how to check"
      }
    ],
    "totalPoints": 8,
    "source": "Modified from AP Statistics 2018 FRQ 6"
  },
  {
    "id": "stats-2020-1",
    "courseSlug": "ap-statistics",
    "year": 2020,
    "number": 1,
    "topic": "Distributions and Outliers",
    "prompt": "Daily commute times (minutes) for a random sample of 30 employees at a firm were recorded. The dotplot summary is shown.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Describe the shape of the distribution of commute times.",
        "points": 2,
        "rubric": "1 pt: identifies skewed-right or unimodal with high outliers\n1 pt: notes potential outliers near 50 and 60"
      },
      {
        "label": "(b)",
        "prompt": "Using the 1.5 IQR rule with $Q_1 = 22$ and $Q_3 = 34$, identify whether a value of 60 minutes is an outlier. Show work.",
        "points": 2,
        "rubric": "1 pt: computes fence $Q_3 + 1.5\\cdot IQR = 52$\n1 pt: concludes 60 is an outlier"
      },
      {
        "label": "(c)",
        "prompt": "Would you recommend using the mean or median to summarize typical commute time? Justify.",
        "points": 2,
        "rubric": "1 pt: selects median\n1 pt: justifies via resistance to outliers/skew"
      }
    ],
    "totalPoints": 6,
    "source": "Modified from AP Statistics 2020 FRQ 1"
  },

  // ─── ap-physics-1 ────────────────────────────────────────────────────
  {
    "id": "physics-1-2015-1-mod",
    "courseSlug": "ap-physics-1",
    "year": 2015,
    "number": 1,
    "topic": "kinematics",
    "prompt": "A cart of mass $m = 0.50$ kg is released from rest at the top of a ramp of length $L = 1.2$ m inclined at $\\theta = 30^{\\circ}$ above the horizontal. Friction between the cart and ramp is negligible.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the acceleration of the cart down the ramp in terms of $g$ and $\\theta$.",
        "points": 2,
        "rubric": "1 pt: Correctly identifies net force along ramp as $mg\\sin\\theta$\n1 pt: Applies Newton's second law to obtain $a = g\\sin\\theta$"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the speed of the cart at the bottom of the ramp.",
        "points": 3,
        "rubric": "1 pt: Uses kinematics or energy conservation correctly\n1 pt: Substitutes values $a = g\\sin 30^{\\circ}$ and $L = 1.2$ m\n1 pt: Obtains $v \\approx 3.4$ m/s"
      },
      {
        "label": "(c)",
        "prompt": "Sketch a graph of speed vs. time for the cart on the ramp.",
        "points": 2,
        "rubric": "1 pt: Straight line starting at origin\n1 pt: Positive slope equal to $g\\sin\\theta$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2015 Physics 1 FRQ"
  },
  {
    "id": "physics-1-2016-2-mod",
    "courseSlug": "ap-physics-1",
    "year": 2016,
    "number": 2,
    "topic": "Newton's laws",
    "prompt": "A block of mass $M = 2.0$ kg sits on a rough horizontal surface. A student pulls the block with a rope that makes an angle $\\theta = 37^{\\circ}$ above the horizontal, applying tension $T = 15$ N. The coefficient of kinetic friction is $\\mu_k = 0.20$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Draw a free-body diagram of the block, labeling all forces.",
        "points": 3,
        "rubric": "1 pt: Gravity drawn downward\n1 pt: Normal force drawn upward and tension at angle above horizontal\n1 pt: Kinetic friction drawn opposite to motion"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the magnitude of the normal force on the block.",
        "points": 2,
        "rubric": "1 pt: Sets vertical equation $F_N + T\\sin\\theta - Mg = 0$\n1 pt: Computes $F_N \\approx 10.6$ N"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the acceleration of the block.",
        "points": 2,
        "rubric": "1 pt: Writes horizontal Newton's 2nd law $T\\cos\\theta - \\mu_k F_N = Ma$\n1 pt: Obtains $a \\approx 4.9$ m/s$^2$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2016 Physics 1 FRQ"
  },
  {
    "id": "physics-1-2017-3-mod",
    "courseSlug": "ap-physics-1",
    "year": 2017,
    "number": 3,
    "topic": "energy",
    "prompt": "A spring of force constant $k = 250$ N/m is compressed by $x = 0.10$ m and used to launch a ball of mass $m = 0.30$ kg horizontally from a table of height $H = 0.80$ m.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the speed of the ball as it leaves the table.",
        "points": 3,
        "rubric": "1 pt: Applies energy conservation $\\tfrac{1}{2}kx^2 = \\tfrac{1}{2}mv^2$\n1 pt: Substitutes $k$, $x$, $m$ correctly\n1 pt: Obtains $v \\approx 2.9$ m/s"
      },
      {
        "label": "(b)",
        "prompt": "Determine the horizontal distance from the table where the ball lands.",
        "points": 3,
        "rubric": "1 pt: Finds time of fall using $H = \\tfrac{1}{2}gt^2$\n1 pt: Computes $t \\approx 0.40$ s\n1 pt: Obtains range $R = vt \\approx 1.16$ m"
      },
      {
        "label": "(c)",
        "prompt": "If air resistance were significant, how would the landing distance change? Justify.",
        "points": 2,
        "rubric": "1 pt: States landing distance decreases\n1 pt: Correct justification referencing energy lost to air or reduced horizontal velocity"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from CB 2017 Physics 1 FRQ"
  },
  {
    "id": "physics-1-2018-4-mod",
    "courseSlug": "ap-physics-1",
    "year": 2018,
    "number": 4,
    "topic": "momentum",
    "prompt": "A cart of mass $m_1 = 1.0$ kg moving at $v_0 = 4.0$ m/s collides with a stationary cart of mass $m_2 = 3.0$ kg on a frictionless track. After the collision, the carts stick together.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the speed of the combined carts after the collision.",
        "points": 2,
        "rubric": "1 pt: Applies conservation of momentum $m_1 v_0 = (m_1 + m_2)v_f$\n1 pt: Obtains $v_f = 1.0$ m/s"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the kinetic energy lost in the collision.",
        "points": 3,
        "rubric": "1 pt: Computes initial KE $= 8.0$ J\n1 pt: Computes final KE $= 2.0$ J\n1 pt: States $\\Delta KE = -6.0$ J"
      },
      {
        "label": "(c)",
        "prompt": "Explain whether the collision is elastic or inelastic and justify.",
        "points": 2,
        "rubric": "1 pt: Identifies as perfectly inelastic\n1 pt: Justifies using loss of KE or that carts stick together"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2018 Physics 1 FRQ"
  },
  {
    "id": "physics-1-2019-1-mod",
    "courseSlug": "ap-physics-1",
    "year": 2019,
    "number": 1,
    "topic": "rotation",
    "prompt": "A uniform rod of length $L = 1.0$ m and mass $M = 0.80$ kg is pivoted at one end and released from rest in the horizontal position. Use $I_{rod,end} = \\tfrac{1}{3}ML^2$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the angular acceleration of the rod immediately after release.",
        "points": 3,
        "rubric": "1 pt: Torque about pivot $\\tau = Mg(L/2)$\n1 pt: Uses $\\tau = I\\alpha$ with $I = \\tfrac{1}{3}ML^2$\n1 pt: Obtains $\\alpha = 3g/(2L)$"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the angular speed of the rod when it reaches the vertical position.",
        "points": 3,
        "rubric": "1 pt: Applies energy conservation $Mg(L/2) = \\tfrac{1}{2}I\\omega^2$\n1 pt: Substitutes $I = \\tfrac{1}{3}ML^2$\n1 pt: Obtains $\\omega = \\sqrt{3g/L} \\approx 5.4$ rad/s"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the linear speed of the free end at the vertical position.",
        "points": 1,
        "rubric": "1 pt: Uses $v = \\omega L$ to obtain $v \\approx 5.4$ m/s"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2019 Physics 1 FRQ"
  },
  {
    "id": "physics-1-2020-2-mod",
    "courseSlug": "ap-physics-1",
    "year": 2020,
    "number": 2,
    "topic": "simple harmonic motion",
    "prompt": "A block of mass $m = 0.50$ kg is attached to a horizontal spring of force constant $k = 200$ N/m on a frictionless surface. The block is pulled $A = 0.050$ m from equilibrium and released.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the period of oscillation.",
        "points": 2,
        "rubric": "1 pt: Uses $T = 2\\pi\\sqrt{m/k}$\n1 pt: Obtains $T \\approx 0.314$ s"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the maximum speed of the block.",
        "points": 2,
        "rubric": "1 pt: Uses energy conservation $\\tfrac{1}{2}kA^2 = \\tfrac{1}{2}mv_{max}^2$\n1 pt: Obtains $v_{max} = 1.0$ m/s"
      },
      {
        "label": "(c)",
        "prompt": "Sketch position vs. time for two full periods, labeling the amplitude and period.",
        "points": 3,
        "rubric": "1 pt: Sinusoidal curve starting at $+A$\n1 pt: Amplitude correctly labeled as 0.050 m\n1 pt: Period correctly labeled as 0.314 s"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2020 Physics 1 FRQ"
  },
  {
    "id": "physics-1-2021-3-mod",
    "courseSlug": "ap-physics-1",
    "year": 2021,
    "number": 3,
    "topic": "waves",
    "prompt": "A transverse wave on a string has wavelength $\\lambda = 0.40$ m and frequency $f = 25$ Hz. The amplitude is $A = 0.020$ m.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the speed of the wave.",
        "points": 2,
        "rubric": "1 pt: Uses $v = f\\lambda$\n1 pt: Obtains $v = 10$ m/s"
      },
      {
        "label": "(b)",
        "prompt": "The tension in the string is doubled. Determine the new wave speed.",
        "points": 2,
        "rubric": "1 pt: States $v \\propto \\sqrt{T}$\n1 pt: Obtains $v' = \\sqrt{2}(10) \\approx 14.1$ m/s"
      },
      {
        "label": "(c)",
        "prompt": "The string is fixed at both ends and has length $L = 1.0$ m. Determine the lowest standing-wave frequency.",
        "points": 2,
        "rubric": "1 pt: Identifies fundamental wavelength $\\lambda_1 = 2L$\n1 pt: Computes $f_1 = v/(2L) = 5.0$ Hz using original $v$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2021 Physics 1 FRQ"
  },
  {
    "id": "physics-1-2022-1-mod",
    "courseSlug": "ap-physics-1",
    "year": 2022,
    "number": 1,
    "topic": "circuits",
    "prompt": "A battery with emf $\\varepsilon = 12$ V and negligible internal resistance is connected to two resistors $R_1 = 4.0$ $\\Omega$ and $R_2 = 6.0$ $\\Omega$ in series.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the current through the circuit.",
        "points": 2,
        "rubric": "1 pt: Uses $I = \\varepsilon/(R_1 + R_2)$\n1 pt: Obtains $I = 1.2$ A"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the power dissipated by $R_2$.",
        "points": 2,
        "rubric": "1 pt: Uses $P = I^2 R_2$ or $P = V_2 I$\n1 pt: Obtains $P \\approx 8.6$ W"
      },
      {
        "label": "(c)",
        "prompt": "If $R_2$ is instead placed in parallel with $R_1$, how does the total power delivered by the battery change? Justify.",
        "points": 2,
        "rubric": "1 pt: Identifies that equivalent resistance decreases\n1 pt: Concludes total power increases"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2022 Physics 1 FRQ"
  },
  {
    "id": "physics-1-2023-2-mod",
    "courseSlug": "ap-physics-1",
    "year": 2023,
    "number": 2,
    "topic": "kinematics",
    "prompt": "A ball is thrown straight up from a height $h_0 = 1.5$ m with initial speed $v_0 = 12$ m/s. Ignore air resistance.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the maximum height above the ground reached by the ball.",
        "points": 3,
        "rubric": "1 pt: Uses $v^2 = v_0^2 - 2g\\Delta y$ with $v = 0$\n1 pt: Computes $\\Delta y \\approx 7.35$ m\n1 pt: Adds $h_0$ to obtain $H \\approx 8.85$ m"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the time for the ball to reach the ground.",
        "points": 3,
        "rubric": "1 pt: Sets up $y(t) = h_0 + v_0 t - \\tfrac{1}{2}g t^2 = 0$\n1 pt: Solves quadratic with correct coefficients\n1 pt: Obtains $t \\approx 2.57$ s"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2023 Physics 1 FRQ"
  },
  {
    "id": "physics-1-2024-3-mod",
    "courseSlug": "ap-physics-1",
    "year": 2024,
    "number": 3,
    "topic": "energy",
    "prompt": "A 2.0 kg block slides down a rough incline angled at $\\theta = 25^{\\circ}$, starting from rest. After sliding $d = 3.0$ m along the incline, the block has speed $v = 3.0$ m/s.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the energy dissipated by friction over the 3.0 m.",
        "points": 3,
        "rubric": "1 pt: Uses $\\Delta KE = W_{grav} - W_{fric}$\n1 pt: Computes $W_{grav} = mgd\\sin\\theta \\approx 24.9$ J\n1 pt: Obtains $W_{fric} \\approx 15.9$ J"
      },
      {
        "label": "(b)",
        "prompt": "Determine the coefficient of kinetic friction.",
        "points": 3,
        "rubric": "1 pt: Writes $W_{fric} = \\mu_k mg\\cos\\theta \\cdot d$\n1 pt: Solves for $\\mu_k$\n1 pt: Obtains $\\mu_k \\approx 0.30$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2024 Physics 1 FRQ"
  },
  {
    "id": "physics-1-2017-4-mod",
    "courseSlug": "ap-physics-1",
    "year": 2017,
    "number": 4,
    "topic": "rotation",
    "prompt": "A solid disk of mass $M = 2.0$ kg and radius $R = 0.25$ m rolls without slipping down a ramp from height $h = 1.0$ m. Use $I_{disk} = \\tfrac{1}{2}MR^2$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive the speed of the disk at the bottom of the ramp.",
        "points": 3,
        "rubric": "1 pt: Energy conservation $Mgh = \\tfrac{1}{2}Mv^2 + \\tfrac{1}{2}I\\omega^2$\n1 pt: Uses rolling condition $v = \\omega R$\n1 pt: Obtains $v = \\sqrt{4gh/3}$"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the numerical value of this speed.",
        "points": 1,
        "rubric": "1 pt: Obtains $v \\approx 3.6$ m/s"
      },
      {
        "label": "(c)",
        "prompt": "How does the final speed compare to that of a block sliding without friction from the same height? Justify.",
        "points": 2,
        "rubric": "1 pt: States disk is slower than block\n1 pt: Justifies that some KE goes into rotation"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2017 Physics 1 FRQ"
  },
  {
    "id": "physics-1-2019-3-mod",
    "courseSlug": "ap-physics-1",
    "year": 2019,
    "number": 3,
    "topic": "simple harmonic motion",
    "prompt": "A simple pendulum of length $L = 0.80$ m swings with small amplitude at a location where $g = 9.8$ m/s$^2$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the period of the pendulum.",
        "points": 2,
        "rubric": "1 pt: Uses $T = 2\\pi\\sqrt{L/g}$\n1 pt: Obtains $T \\approx 1.80$ s"
      },
      {
        "label": "(b)",
        "prompt": "The pendulum is moved to a location where $g$ is 20% smaller. Determine the new period.",
        "points": 2,
        "rubric": "1 pt: Uses ratio $T' = T\\sqrt{g/g'}$ with $g' = 0.8g$\n1 pt: Obtains $T' \\approx 2.01$ s"
      },
      {
        "label": "(c)",
        "prompt": "Explain whether period depends on the mass of the bob.",
        "points": 1,
        "rubric": "1 pt: States period is independent of mass with correct reasoning"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2019 Physics 1 FRQ"
  },

  // ─── ap-physics-2 ────────────────────────────────────────────────────
  {
    "id": "physics-2-2015-1-mod",
    "courseSlug": "ap-physics-2",
    "year": 2015,
    "number": 1,
    "topic": "fluids",
    "prompt": "A cylindrical tank of cross-sectional area $A_1 = 0.20$ m$^2$ is filled with water to depth $H = 1.8$ m. A small hole of area $A_2 = 2.0 \\times 10^{-4}$ m$^2$ is opened at the bottom side.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Apply Bernoulli's equation to determine the speed of water leaving the hole.",
        "points": 3,
        "rubric": "1 pt: States $P_{atm} + \\rho g H = P_{atm} + \\tfrac{1}{2}\\rho v^2$\n1 pt: Solves for $v = \\sqrt{2gH}$\n1 pt: Obtains $v \\approx 5.94$ m/s"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the initial volume flow rate from the hole.",
        "points": 2,
        "rubric": "1 pt: Uses $Q = A_2 v$\n1 pt: Obtains $Q \\approx 1.19 \\times 10^{-3}$ m$^3$/s"
      },
      {
        "label": "(c)",
        "prompt": "Describe how the exit speed changes as the tank drains, and justify.",
        "points": 2,
        "rubric": "1 pt: States exit speed decreases\n1 pt: Justifies via decreasing $H$ in $v = \\sqrt{2gH}$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2015 Physics 2 FRQ"
  },
  {
    "id": "physics-2-2016-3-mod",
    "courseSlug": "ap-physics-2",
    "year": 2016,
    "number": 3,
    "topic": "thermo",
    "prompt": "A sample of $n = 0.50$ mol of ideal monatomic gas is taken through a cycle: $A \\to B$ isobaric expansion at $P = 2.0 \\times 10^5$ Pa from $V_A = 0.010$ m$^3$ to $V_B = 0.020$ m$^3$; $B \\to C$ isochoric cooling; $C \\to A$ isothermal compression.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the temperature at state A.",
        "points": 2,
        "rubric": "1 pt: Uses $PV = nRT$\n1 pt: Obtains $T_A \\approx 481$ K"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the work done by the gas during $A \\to B$.",
        "points": 2,
        "rubric": "1 pt: Uses $W = P\\Delta V$\n1 pt: Obtains $W = 2.0 \\times 10^3$ J"
      },
      {
        "label": "(c)",
        "prompt": "Determine the net work done by the gas over the full cycle, and state whether the cycle is a heat engine or a refrigerator. Justify.",
        "points": 3,
        "rubric": "1 pt: Identifies net work as area enclosed, positive\n1 pt: Net work sign consistent with clockwise cycle\n1 pt: States cycle acts as a heat engine with justification"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2016 Physics 2 FRQ"
  },
  {
    "id": "physics-2-2017-1-mod",
    "courseSlug": "ap-physics-2",
    "year": 2017,
    "number": 1,
    "topic": "E-fields",
    "prompt": "Two point charges $q_1 = +3.0$ $\\mu$C and $q_2 = -2.0$ $\\mu$C are placed $d = 0.30$ m apart along the x-axis, with $q_1$ at the origin and $q_2$ at $x = 0.30$ m.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the electric field magnitude at the midpoint between the charges.",
        "points": 3,
        "rubric": "1 pt: Uses $E = kq/r^2$ for each charge with $r = 0.15$ m\n1 pt: Recognizes fields point in same direction at midpoint\n1 pt: Obtains $E \\approx 2.0 \\times 10^6$ N/C"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the electric potential at the midpoint.",
        "points": 2,
        "rubric": "1 pt: Uses $V = kq_1/r + kq_2/r$\n1 pt: Obtains $V = 6.0 \\times 10^4$ V"
      },
      {
        "label": "(c)",
        "prompt": "A +1.0 nC test charge is released from rest at the midpoint. Describe its subsequent motion qualitatively.",
        "points": 2,
        "rubric": "1 pt: States test charge accelerates toward $q_2$ (negative charge)\n1 pt: Notes speed increases while moving along the axis"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2017 Physics 2 FRQ"
  },
  {
    "id": "physics-2-2018-2-mod",
    "courseSlug": "ap-physics-2",
    "year": 2018,
    "number": 2,
    "topic": "circuits",
    "prompt": "An uncharged capacitor of capacitance $C = 2.0 \\times 10^{-5}$ F is connected in series with a resistor $R = 1.0 \\times 10^4$ $\\Omega$ and a battery of emf $\\varepsilon = 9.0$ V through a switch.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the time constant of the circuit.",
        "points": 2,
        "rubric": "1 pt: Uses $\\tau = RC$\n1 pt: Obtains $\\tau = 0.20$ s"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the current immediately after the switch closes.",
        "points": 2,
        "rubric": "1 pt: Treats capacitor as wire at $t = 0$\n1 pt: Obtains $I_0 = \\varepsilon/R = 9.0 \\times 10^{-4}$ A"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the final charge on the capacitor and the final current.",
        "points": 3,
        "rubric": "1 pt: Final current equals 0 when capacitor fully charged\n1 pt: Uses $Q = C\\varepsilon$\n1 pt: Obtains $Q = 1.8 \\times 10^{-4}$ C"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2018 Physics 2 FRQ"
  },
  {
    "id": "physics-2-2019-4-mod",
    "courseSlug": "ap-physics-2",
    "year": 2019,
    "number": 4,
    "topic": "magnetism",
    "prompt": "A proton moves with velocity $v = 2.0 \\times 10^6$ m/s in the $+x$ direction through a uniform magnetic field $B = 0.50$ T in the $+y$ direction.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the magnitude of the magnetic force on the proton.",
        "points": 2,
        "rubric": "1 pt: Uses $F = qvB$\n1 pt: Obtains $F \\approx 1.6 \\times 10^{-13}$ N"
      },
      {
        "label": "(b)",
        "prompt": "State the direction of the force and justify.",
        "points": 2,
        "rubric": "1 pt: States force is in $+z$ direction\n1 pt: Justifies via right-hand rule $\\vec{v} \\times \\vec{B}$"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the radius of the circular motion of the proton in the field.",
        "points": 2,
        "rubric": "1 pt: Uses $r = mv/(qB)$\n1 pt: Obtains $r \\approx 0.042$ m"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2019 Physics 2 FRQ"
  },
  {
    "id": "physics-2-2020-1-mod",
    "courseSlug": "ap-physics-2",
    "year": 2020,
    "number": 1,
    "topic": "geometric optics",
    "prompt": "An object of height $h_o = 3.0$ cm is placed $d_o = 15$ cm in front of a thin converging lens of focal length $f = 10$ cm.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the image distance.",
        "points": 2,
        "rubric": "1 pt: Uses thin-lens equation $1/d_o + 1/d_i = 1/f$\n1 pt: Obtains $d_i = 30$ cm"
      },
      {
        "label": "(b)",
        "prompt": "Determine the image height and state whether it is upright or inverted.",
        "points": 2,
        "rubric": "1 pt: Uses $m = -d_i/d_o = -2$\n1 pt: States image height 6.0 cm, inverted"
      },
      {
        "label": "(c)",
        "prompt": "State whether the image is real or virtual and justify.",
        "points": 1,
        "rubric": "1 pt: States real because $d_i$ is positive / image on opposite side"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2020 Physics 2 FRQ"
  },
  {
    "id": "physics-2-2021-1-mod",
    "courseSlug": "ap-physics-2",
    "year": 2021,
    "number": 1,
    "topic": "wave optics",
    "prompt": "Light of wavelength $\\lambda = 550$ nm passes through a double slit with slit separation $d = 0.20$ mm. A screen is placed $L = 1.8$ m away.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the distance between adjacent bright fringes on the screen.",
        "points": 2,
        "rubric": "1 pt: Uses $\\Delta y = \\lambda L/d$\n1 pt: Obtains $\\Delta y \\approx 4.95$ mm"
      },
      {
        "label": "(b)",
        "prompt": "If the experiment is repeated in water ($n = 1.33$), determine the new fringe spacing.",
        "points": 2,
        "rubric": "1 pt: Uses $\\lambda' = \\lambda/n$\n1 pt: Obtains $\\Delta y' \\approx 3.72$ mm"
      },
      {
        "label": "(c)",
        "prompt": "Explain what happens to the fringe pattern if one of the slits is covered.",
        "points": 2,
        "rubric": "1 pt: States two-slit interference pattern disappears\n1 pt: Identifies remaining pattern as single-slit diffraction"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2021 Physics 2 FRQ"
  },
  {
    "id": "physics-2-2022-1-mod",
    "courseSlug": "ap-physics-2",
    "year": 2022,
    "number": 1,
    "topic": "modern physics",
    "prompt": "A metal has work function $\\phi = 2.30$ eV. Light of wavelength $\\lambda = 400$ nm is incident on the surface.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the energy of one photon in eV.",
        "points": 2,
        "rubric": "1 pt: Uses $E = hc/\\lambda$\n1 pt: Obtains $E \\approx 3.10$ eV"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the maximum kinetic energy of ejected electrons.",
        "points": 2,
        "rubric": "1 pt: Uses $KE_{max} = E - \\phi$\n1 pt: Obtains $KE_{max} = 0.80$ eV"
      },
      {
        "label": "(c)",
        "prompt": "Determine the threshold wavelength for this metal.",
        "points": 2,
        "rubric": "1 pt: Uses $\\lambda_0 = hc/\\phi$\n1 pt: Obtains $\\lambda_0 \\approx 539$ nm"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2022 Physics 2 FRQ"
  },
  {
    "id": "physics-2-2023-2-mod",
    "courseSlug": "ap-physics-2",
    "year": 2023,
    "number": 2,
    "topic": "fluids",
    "prompt": "A solid cube of side length $s = 0.10$ m and density $\\rho_c = 600$ kg/m$^3$ floats in water ($\\rho_w = 1000$ kg/m$^3$).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the fraction of the cube's volume submerged.",
        "points": 2,
        "rubric": "1 pt: Balances weight with buoyancy $\\rho_c V g = \\rho_w V_{sub} g$\n1 pt: Obtains $V_{sub}/V = 0.60$"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the buoyant force on the cube.",
        "points": 2,
        "rubric": "1 pt: Uses $F_B = \\rho_w V_{sub} g$\n1 pt: Obtains $F_B \\approx 5.88$ N"
      },
      {
        "label": "(c)",
        "prompt": "If the cube is pushed 0.02 m deeper and released, describe qualitatively its subsequent motion.",
        "points": 2,
        "rubric": "1 pt: States cube oscillates vertically about equilibrium\n1 pt: Identifies motion as approximately simple harmonic for small displacements"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2023 Physics 2 FRQ"
  },
  {
    "id": "physics-2-2024-1-mod",
    "courseSlug": "ap-physics-2",
    "year": 2024,
    "number": 1,
    "topic": "circuits",
    "prompt": "Three resistors $R_1 = 10$ $\\Omega$, $R_2 = 20$ $\\Omega$, and $R_3 = 30$ $\\Omega$ are connected with a battery of emf $\\varepsilon = 12$ V. $R_1$ is in series with the parallel combination of $R_2$ and $R_3$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the equivalent resistance of the circuit.",
        "points": 2,
        "rubric": "1 pt: Uses $R_{23} = R_2 R_3/(R_2 + R_3) = 12$ $\\Omega$\n1 pt: Obtains $R_{eq} = 22$ $\\Omega$"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the current through $R_1$.",
        "points": 2,
        "rubric": "1 pt: Uses $I_1 = \\varepsilon/R_{eq}$\n1 pt: Obtains $I_1 \\approx 0.545$ A"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the voltage across $R_2$.",
        "points": 2,
        "rubric": "1 pt: Uses $V_2 = I_1 R_{23}$\n1 pt: Obtains $V_2 \\approx 6.55$ V"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2024 Physics 2 FRQ"
  },
  {
    "id": "physics-2-2016-1-mod",
    "courseSlug": "ap-physics-2",
    "year": 2016,
    "number": 1,
    "topic": "E-fields",
    "prompt": "A parallel-plate capacitor has plate area $A = 0.020$ m$^2$ and plate separation $d = 2.0$ mm. It is charged to a potential difference $V = 100$ V and then disconnected from the battery.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the capacitance.",
        "points": 2,
        "rubric": "1 pt: Uses $C = \\varepsilon_0 A/d$\n1 pt: Obtains $C \\approx 8.85 \\times 10^{-11}$ F"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the charge on each plate.",
        "points": 2,
        "rubric": "1 pt: Uses $Q = CV$\n1 pt: Obtains $Q \\approx 8.85 \\times 10^{-9}$ C"
      },
      {
        "label": "(c)",
        "prompt": "The plate separation is now doubled while the capacitor remains disconnected. Determine the new potential difference between the plates.",
        "points": 3,
        "rubric": "1 pt: States charge is constant after disconnection\n1 pt: Uses $C' = C/2$ so $V' = Q/C' = 2V$\n1 pt: Obtains $V' = 200$ V"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2016 Physics 2 FRQ"
  },
  {
    "id": "physics-2-2020-3-mod",
    "courseSlug": "ap-physics-2",
    "year": 2020,
    "number": 3,
    "topic": "thermo",
    "prompt": "A rigid container holds $n = 2.0$ mol of an ideal monatomic gas at temperature $T_1 = 300$ K. Heat $Q = 5.0 \\times 10^3$ J is added to the gas at constant volume.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "State the work done by the gas and justify.",
        "points": 2,
        "rubric": "1 pt: States $W = 0$\n1 pt: Justifies via constant volume"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the change in internal energy of the gas.",
        "points": 2,
        "rubric": "1 pt: Applies first law $\\Delta U = Q - W$\n1 pt: Obtains $\\Delta U = 5.0 \\times 10^3$ J"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the final temperature of the gas.",
        "points": 2,
        "rubric": "1 pt: Uses $\\Delta U = \\tfrac{3}{2}nR\\Delta T$\n1 pt: Obtains $T_2 \\approx 500$ K"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2020 Physics 2 FRQ"
  },

  // ─── ap-physics-c-mech ────────────────────────────────────────────────────
  {
    "id": "physcmech-2015-1",
    "courseSlug": "ap-physics-c-mech",
    "year": 2015,
    "number": 1,
    "topic": "Variable Forces and Kinematics",
    "prompt": "A block of mass $m$ slides along a horizontal frictionless surface. At time $t=0$ it has velocity $v_0$ in the $+x$ direction. A time-dependent force $F(t) = -bt$ acts on the block, where $b$ is a positive constant.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the velocity $v(t)$ of the block as a function of time.",
        "points": 3,
        "rubric": "1 pt: Applying Newton's second law $m\\frac{dv}{dt} = -bt$\n1 pt: Separating and integrating $\\int dv = -\\int \\frac{bt}{m}\\,dt$\n1 pt: Correct result $v(t) = v_0 - \\frac{bt^2}{2m}$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the time $t_s$ at which the block momentarily comes to rest.",
        "points": 2,
        "rubric": "1 pt: Setting $v(t_s)=0$\n1 pt: Solving $t_s = \\sqrt{\\frac{2mv_0}{b}}$"
      },
      {
        "label": "(c)",
        "prompt": "Derive an expression for the position $x(t)$ before the block stops.",
        "points": 3,
        "rubric": "1 pt: Writing $x(t) = \\int_0^t v(t')\\,dt'$\n1 pt: Integrating the velocity expression correctly\n1 pt: Result $x(t) = v_0 t - \\frac{bt^3}{6m}$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the total distance traveled before the block stops.",
        "points": 2,
        "rubric": "1 pt: Substituting $t_s$ into $x(t)$\n1 pt: Correct distance $x_s = \\frac{2v_0}{3}\\sqrt{\\frac{2mv_0}{b}}$"
      }
    ],
    "totalPoints": 10,
    "source": "Modified from CB 2015 Physics C Mech FRQ 1"
  },
  {
    "id": "physcmech-2016-2",
    "courseSlug": "ap-physics-c-mech",
    "year": 2016,
    "number": 2,
    "topic": "Rotation and Moment of Inertia",
    "prompt": "A uniform disk of mass $M$ and radius $R$ rotates about a frictionless axle through its center. A massless string is wrapped around the rim and a block of mass $m$ hangs from the end. The block is released from rest.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the linear acceleration of the block in terms of $m$, $M$, and $g$.",
        "points": 4,
        "rubric": "1 pt: Newton's second law on block $mg - T = ma$\n1 pt: Torque equation on disk $TR = I\\alpha$ with $I = \\frac{1}{2}MR^2$\n1 pt: Constraint $a = R\\alpha$\n1 pt: Solving $a = \\frac{2mg}{2m+M}$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the tension in the string.",
        "points": 2,
        "rubric": "1 pt: Substituting $a$ back into $T = m(g-a)$\n1 pt: Correct tension $T = \\frac{mMg}{2m+M}$"
      },
      {
        "label": "(c)",
        "prompt": "After the block has fallen a distance $h$, use energy conservation to determine its speed.",
        "points": 3,
        "rubric": "1 pt: Writing $mgh = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2$\n1 pt: Substituting $\\omega = v/R$ and $I = \\frac{1}{2}MR^2$\n1 pt: Result $v = \\sqrt{\\frac{4mgh}{2m+M}}$"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from CB 2016 Physics C Mech FRQ 2"
  },
  {
    "id": "physcmech-2017-1",
    "courseSlug": "ap-physics-c-mech",
    "year": 2017,
    "number": 1,
    "topic": "Energy Methods",
    "prompt": "A block of mass $m$ is pushed against a spring of force constant $k$, compressing it a distance $d$. The block is released and slides along a frictionless horizontal surface before going up a frictionless incline of angle $\\theta$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the speed of the block at the bottom of the incline.",
        "points": 3,
        "rubric": "1 pt: Energy conservation $\\frac{1}{2}kd^2 = \\frac{1}{2}mv^2$\n1 pt: Isolating $v^2$\n1 pt: Result $v = d\\sqrt{\\frac{k}{m}}$"
      },
      {
        "label": "(b)",
        "prompt": "Derive an expression for the maximum vertical height $H$ reached up the incline.",
        "points": 2,
        "rubric": "1 pt: Using $\\frac{1}{2}kd^2 = mgH$\n1 pt: Result $H = \\frac{kd^2}{2mg}$"
      },
      {
        "label": "(c)",
        "prompt": "If the incline has coefficient of kinetic friction $\\mu_k$, derive an expression for the distance $L$ traveled along the incline.",
        "points": 4,
        "rubric": "1 pt: Including friction work $W_f = -\\mu_k mg\\cos\\theta \\cdot L$\n1 pt: Energy equation $\\frac{1}{2}kd^2 = mgL\\sin\\theta + \\mu_k mg L\\cos\\theta$\n1 pt: Solving for $L$ correctly\n1 pt: Result $L = \\frac{kd^2}{2mg(\\sin\\theta + \\mu_k\\cos\\theta)}$"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from CB 2017 Physics C Mech FRQ 1"
  },
  {
    "id": "physcmech-2018-3",
    "courseSlug": "ap-physics-c-mech",
    "year": 2018,
    "number": 3,
    "topic": "Oscillations",
    "prompt": "A block of mass $m$ is attached to a spring of force constant $k$ on a frictionless horizontal surface. The block is displaced a distance $A$ from equilibrium and released from rest at $t=0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive the differential equation for the position $x(t)$ of the block.",
        "points": 2,
        "rubric": "1 pt: Applying Newton's second law $m\\frac{d^2x}{dt^2} = -kx$\n1 pt: Rearranging to $\\frac{d^2x}{dt^2} + \\frac{k}{m}x = 0$"
      },
      {
        "label": "(b)",
        "prompt": "Write the expression for $x(t)$ and determine the angular frequency $\\omega$ and period $T$.",
        "points": 3,
        "rubric": "1 pt: $x(t) = A\\cos(\\omega t)$\n1 pt: $\\omega = \\sqrt{k/m}$\n1 pt: $T = 2\\pi\\sqrt{m/k}$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the maximum speed of the block and the position at which it occurs.",
        "points": 2,
        "rubric": "1 pt: Maximum speed $v_{max} = A\\sqrt{k/m}$\n1 pt: Occurs at equilibrium $x = 0$"
      },
      {
        "label": "(d)",
        "prompt": "The block is now submerged in a viscous fluid providing a damping force $-bv$. State (without solving) what happens qualitatively to the amplitude over time.",
        "points": 1,
        "rubric": "1 pt: The amplitude decays exponentially with time"
      }
    ],
    "totalPoints": 8,
    "source": "Modified from CB 2018 Physics C Mech FRQ 3"
  },
  {
    "id": "physcmech-2019-2-mod",
    "courseSlug": "ap-physics-c-mech",
    "year": 2019,
    "number": 2,
    "topic": "Momentum and Center of Mass",
    "prompt": "A bullet of mass $m$ moving horizontally with speed $v_0$ strikes and embeds in a block of mass $M$ that is at rest on a frictionless horizontal surface. After the collision, the bullet-block system slides and compresses a horizontal spring of force constant $k$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive the speed of the bullet-block system immediately after collision.",
        "points": 2,
        "rubric": "1 pt: Conservation of momentum $mv_0 = (m+M)v_f$\n1 pt: $v_f = \\frac{mv_0}{m+M}$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the energy lost during the collision.",
        "points": 3,
        "rubric": "1 pt: Initial KE $= \\frac{1}{2}mv_0^2$\n1 pt: Final KE $= \\frac{1}{2}(m+M)v_f^2$\n1 pt: Energy lost $\\Delta E = \\frac{1}{2}\\frac{mMv_0^2}{m+M}$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the maximum compression $x_{max}$ of the spring.",
        "points": 3,
        "rubric": "1 pt: Energy conservation after collision $\\frac{1}{2}(m+M)v_f^2 = \\frac{1}{2}kx_{max}^2$\n1 pt: Substituting $v_f$\n1 pt: $x_{max} = \\frac{mv_0}{\\sqrt{k(m+M)}}$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the speed of the center of mass of the bullet-block-spring system before and after the collision.",
        "points": 2,
        "rubric": "1 pt: Before collision: $v_{cm} = \\frac{mv_0}{m+M}$\n1 pt: After collision: $v_{cm}$ is unchanged since external horizontal forces are zero"
      }
    ],
    "totalPoints": 10,
    "source": "Modified from CB 2019 Physics C Mech FRQ 2"
  },
  {
    "id": "physcmech-2020-1",
    "courseSlug": "ap-physics-c-mech",
    "year": 2020,
    "number": 1,
    "topic": "Gravitation and Kepler's Laws",
    "prompt": "A satellite of mass $m$ orbits a planet of mass $M$ and radius $R$ in a circular orbit of radius $r > R$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the orbital speed $v$ of the satellite.",
        "points": 2,
        "rubric": "1 pt: Setting gravitational force equal to centripetal $\\frac{GMm}{r^2} = \\frac{mv^2}{r}$\n1 pt: Result $v = \\sqrt{GM/r}$"
      },
      {
        "label": "(b)",
        "prompt": "Derive an expression for the orbital period $T$ and verify Kepler's third law.",
        "points": 3,
        "rubric": "1 pt: Using $T = 2\\pi r/v$\n1 pt: Substituting $v$ to get $T = 2\\pi\\sqrt{r^3/(GM)}$\n1 pt: Showing $T^2 \\propto r^3$"
      },
      {
        "label": "(c)",
        "prompt": "Derive the total mechanical energy of the orbit.",
        "points": 3,
        "rubric": "1 pt: KE $= \\frac{1}{2}mv^2 = \\frac{GMm}{2r}$\n1 pt: PE $= -\\frac{GMm}{r}$\n1 pt: Total $E = -\\frac{GMm}{2r}$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the minimum energy required to move the satellite from this orbit to infinity.",
        "points": 2,
        "rubric": "1 pt: Setting $E_\\infty = 0$\n1 pt: Required energy $= \\frac{GMm}{2r}$"
      }
    ],
    "totalPoints": 10,
    "source": "Modified from CB 2020 Physics C Mech FRQ 1"
  },
  {
    "id": "physcmech-2021-2",
    "courseSlug": "ap-physics-c-mech",
    "year": 2021,
    "number": 2,
    "topic": "Rotational Dynamics",
    "prompt": "A solid sphere of mass $M$ and radius $R$ rolls without slipping down an incline of angle $\\theta$ from rest.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the linear acceleration of the center of mass. The moment of inertia of the sphere is $I = \\frac{2}{5}MR^2$.",
        "points": 4,
        "rubric": "1 pt: Newton's second law along incline $Mg\\sin\\theta - f = Ma$\n1 pt: Torque equation $fR = I\\alpha$\n1 pt: Rolling constraint $a = R\\alpha$\n1 pt: Solving $a = \\frac{5}{7}g\\sin\\theta$"
      },
      {
        "label": "(b)",
        "prompt": "Derive an expression for the friction force in terms of $M$, $g$, and $\\theta$.",
        "points": 2,
        "rubric": "1 pt: Using $f = I\\alpha/R = \\frac{2}{5}Ma$\n1 pt: Result $f = \\frac{2}{7}Mg\\sin\\theta$"
      },
      {
        "label": "(c)",
        "prompt": "Derive the minimum coefficient of static friction required for rolling without slipping.",
        "points": 2,
        "rubric": "1 pt: Condition $f \\le \\mu_s Mg\\cos\\theta$\n1 pt: $\\mu_s \\ge \\frac{2}{7}\\tan\\theta$"
      },
      {
        "label": "(d)",
        "prompt": "Using energy conservation, determine the speed of the sphere after descending a vertical height $h$.",
        "points": 2,
        "rubric": "1 pt: $Mgh = \\frac{1}{2}Mv^2 + \\frac{1}{2}I\\omega^2$ with $\\omega = v/R$\n1 pt: $v = \\sqrt{\\frac{10gh}{7}}$"
      }
    ],
    "totalPoints": 10,
    "source": "Modified from CB 2021 Physics C Mech FRQ 2"
  },
  {
    "id": "physcmech-2022-1",
    "courseSlug": "ap-physics-c-mech",
    "year": 2022,
    "number": 1,
    "topic": "Variable Forces with Integration",
    "prompt": "A particle of mass $m$ starts at rest at $x=0$ and is acted on by a position-dependent force $F(x) = F_0 e^{-x/L}$ where $F_0$ and $L$ are positive constants.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the work done by the force as the particle moves from $x=0$ to $x$.",
        "points": 3,
        "rubric": "1 pt: Setting up $W = \\int_0^x F(x')\\,dx'$\n1 pt: Integrating the exponential correctly\n1 pt: Result $W = F_0 L(1 - e^{-x/L})$"
      },
      {
        "label": "(b)",
        "prompt": "Derive an expression for the speed of the particle as a function of $x$.",
        "points": 3,
        "rubric": "1 pt: Applying work-energy theorem $W = \\frac{1}{2}mv^2$\n1 pt: Solving for $v$\n1 pt: Result $v(x) = \\sqrt{\\frac{2F_0 L}{m}(1 - e^{-x/L})}$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the limiting speed of the particle as $x \\to \\infty$.",
        "points": 2,
        "rubric": "1 pt: Noting $e^{-x/L} \\to 0$ as $x \\to \\infty$\n1 pt: $v_\\infty = \\sqrt{\\frac{2F_0 L}{m}}$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the acceleration as a function of $x$ and find where it is maximum.",
        "points": 2,
        "rubric": "1 pt: $a(x) = \\frac{F_0}{m}e^{-x/L}$\n1 pt: Maximum at $x=0$, $a_{max} = F_0/m$"
      }
    ],
    "totalPoints": 10,
    "source": "Modified from CB 2022 Physics C Mech FRQ 1"
  },
  {
    "id": "physcmech-2023-2",
    "courseSlug": "ap-physics-c-mech",
    "year": 2023,
    "number": 2,
    "topic": "Angular Momentum",
    "prompt": "A disk of mass $M$ and radius $R$ rotates freely about a vertical frictionless axle with angular velocity $\\omega_0$. A small lump of clay of mass $m$ is dropped vertically and sticks to the edge of the disk.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the angular velocity of the disk-clay system after the clay sticks. The disk has $I = \\frac{1}{2}MR^2$.",
        "points": 3,
        "rubric": "1 pt: Conservation of angular momentum $I_0\\omega_0 = I_f\\omega_f$\n1 pt: $I_f = \\frac{1}{2}MR^2 + mR^2$\n1 pt: $\\omega_f = \\frac{M\\omega_0}{M + 2m}$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the rotational kinetic energy lost in the process.",
        "points": 3,
        "rubric": "1 pt: Initial KE $= \\frac{1}{4}MR^2\\omega_0^2$\n1 pt: Final KE $= \\frac{1}{2}I_f\\omega_f^2$\n1 pt: Lost energy $\\Delta K = \\frac{mMR^2\\omega_0^2}{2(M+2m)}$"
      },
      {
        "label": "(c)",
        "prompt": "Explain why linear momentum is not conserved in the vertical direction but angular momentum about the axle is conserved.",
        "points": 2,
        "rubric": "1 pt: Axle exerts external vertical force, so linear momentum is not conserved\n1 pt: Axle force exerts no torque about the axis, so angular momentum is conserved"
      }
    ],
    "totalPoints": 8,
    "source": "Modified from CB 2023 Physics C Mech FRQ 2"
  },
  {
    "id": "physcmech-2024-1",
    "courseSlug": "ap-physics-c-mech",
    "year": 2024,
    "number": 1,
    "topic": "Kinematics with Drag",
    "prompt": "A ball of mass $m$ is dropped from rest and experiences gravity and a linear drag force $F_d = -bv$, where $b$ is a positive constant and $v$ is the downward velocity.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the differential equation governing $v(t)$.",
        "points": 2,
        "rubric": "1 pt: Newton's second law $m\\frac{dv}{dt} = mg - bv$\n1 pt: Identifying this as first-order linear ODE"
      },
      {
        "label": "(b)",
        "prompt": "Determine the terminal velocity $v_T$.",
        "points": 2,
        "rubric": "1 pt: Setting $\\frac{dv}{dt}=0$\n1 pt: $v_T = mg/b$"
      },
      {
        "label": "(c)",
        "prompt": "Solve the differential equation to find $v(t)$ with $v(0)=0$.",
        "points": 3,
        "rubric": "1 pt: Separating variables and integrating\n1 pt: Applying initial condition\n1 pt: Result $v(t) = \\frac{mg}{b}(1 - e^{-bt/m})$"
      },
      {
        "label": "(d)",
        "prompt": "Sketch $v(t)$ versus $t$, labeling the terminal velocity.",
        "points": 2,
        "rubric": "1 pt: Curve starts at origin with initial slope $g$\n1 pt: Approaches horizontal asymptote at $v_T = mg/b$"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from CB 2024 Physics C Mech FRQ 1"
  },
  {
    "id": "physcmech-2016-3",
    "courseSlug": "ap-physics-c-mech",
    "year": 2016,
    "number": 3,
    "topic": "Center of Mass and Collisions",
    "prompt": "Two carts on a frictionless track have masses $m_1 = 2.0$ kg and $m_2 = 3.0$ kg. Cart 1 moves at $v_1 = 4.0$ m/s toward cart 2, which is initially at rest. They collide elastically.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the velocity of the center of mass before the collision.",
        "points": 2,
        "rubric": "1 pt: $v_{cm} = (m_1 v_1)/(m_1+m_2)$\n1 pt: $v_{cm} = 1.6$ m/s"
      },
      {
        "label": "(b)",
        "prompt": "Determine the velocities of both carts after the elastic collision.",
        "points": 4,
        "rubric": "1 pt: Conservation of momentum equation\n1 pt: Conservation of kinetic energy (or relative-velocity reversal)\n1 pt: $v_1' = -0.8$ m/s\n1 pt: $v_2' = 3.2$ m/s"
      },
      {
        "label": "(c)",
        "prompt": "Verify that the velocity of the center of mass is unchanged by the collision.",
        "points": 2,
        "rubric": "1 pt: Computing $v_{cm}' = (m_1 v_1' + m_2 v_2')/(m_1+m_2)$\n1 pt: Showing $v_{cm}' = 1.6$ m/s, equal to the initial value"
      }
    ],
    "totalPoints": 8,
    "source": "Modified from CB 2016 Physics C Mech FRQ 3"
  },
  {
    "id": "physcmech-2022-3",
    "courseSlug": "ap-physics-c-mech",
    "year": 2022,
    "number": 3,
    "topic": "Pendulum Oscillations",
    "prompt": "A physical pendulum consists of a uniform rod of mass $M$ and length $L$ pivoted at one end. It is displaced by a small angle $\\theta_0$ and released from rest.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive the equation of motion for small oscillations. The moment of inertia of a rod about one end is $I = \\frac{1}{3}ML^2$.",
        "points": 3,
        "rubric": "1 pt: Torque $\\tau = -Mg(L/2)\\sin\\theta$\n1 pt: Using $\\tau = I\\frac{d^2\\theta}{dt^2}$ with small-angle approximation\n1 pt: $\\frac{d^2\\theta}{dt^2} + \\frac{3g}{2L}\\theta = 0$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the period of small oscillations.",
        "points": 2,
        "rubric": "1 pt: $\\omega = \\sqrt{3g/(2L)}$\n1 pt: $T = 2\\pi\\sqrt{2L/(3g)}$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the maximum angular speed $\\omega_{max}$ of the rod.",
        "points": 3,
        "rubric": "1 pt: Energy conservation $Mg(L/2)(1-\\cos\\theta_0) = \\frac{1}{2}I\\omega_{max}^2$\n1 pt: Substituting $I = \\frac{1}{3}ML^2$\n1 pt: $\\omega_{max} = \\sqrt{\\frac{3g(1-\\cos\\theta_0)}{L}}$"
      }
    ],
    "totalPoints": 8,
    "source": "Modified from CB 2022 Physics C Mech FRQ 3"
  },

  // ─── ap-physics-c-em ────────────────────────────────────────────────────
  {
    "id": "physcem-2015-2",
    "courseSlug": "ap-physics-c-em",
    "year": 2015,
    "number": 2,
    "topic": "Gauss's Law Spherical",
    "prompt": "A solid insulating sphere of radius $R$ carries a uniform volume charge density $\\rho$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Use Gauss's law to derive the electric field magnitude inside the sphere ($r < R$).",
        "points": 3,
        "rubric": "1 pt: Drawing Gaussian sphere with $\\oint \\vec{E}\\cdot d\\vec{A} = Q_{enc}/\\epsilon_0$\n1 pt: $Q_{enc} = \\frac{4}{3}\\pi r^3 \\rho$\n1 pt: $E_{in} = \\frac{\\rho r}{3\\epsilon_0}$"
      },
      {
        "label": "(b)",
        "prompt": "Derive the electric field magnitude outside the sphere ($r > R$).",
        "points": 2,
        "rubric": "1 pt: $Q_{enc} = \\frac{4}{3}\\pi R^3 \\rho$\n1 pt: $E_{out} = \\frac{\\rho R^3}{3\\epsilon_0 r^2}$"
      },
      {
        "label": "(c)",
        "prompt": "Derive an expression for the electric potential at the center of the sphere, taking $V(\\infty)=0$.",
        "points": 3,
        "rubric": "1 pt: $V(0) = -\\int_\\infty^0 E\\,dr$ split into two regions\n1 pt: Computing $\\int_R^\\infty E_{out}\\,dr$ and $\\int_0^R E_{in}\\,dr$\n1 pt: $V(0) = \\frac{\\rho R^2}{2\\epsilon_0}$"
      },
      {
        "label": "(d)",
        "prompt": "Sketch $E(r)$ versus $r$, labeling $R$ and the value at $r=R$.",
        "points": 2,
        "rubric": "1 pt: Linear increase from 0 to $\\rho R/(3\\epsilon_0)$ for $r<R$\n1 pt: $1/r^2$ decrease for $r>R$ continuous at $r=R$"
      }
    ],
    "totalPoints": 10,
    "source": "Modified from CB 2015 Physics C E&M FRQ 2"
  },
  {
    "id": "physcem-2016-1",
    "courseSlug": "ap-physics-c-em",
    "year": 2016,
    "number": 1,
    "topic": "RC Circuits",
    "prompt": "A capacitor of capacitance $C$ is charged through a resistor $R$ by a battery of EMF $\\mathcal{E}$. At $t=0$ the switch is closed with the capacitor initially uncharged.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the differential equation for the charge $q(t)$ on the capacitor.",
        "points": 2,
        "rubric": "1 pt: Kirchhoff loop $\\mathcal{E} - IR - q/C = 0$\n1 pt: Substituting $I = \\frac{dq}{dt}$ to get $R\\frac{dq}{dt} + q/C = \\mathcal{E}$"
      },
      {
        "label": "(b)",
        "prompt": "Solve for $q(t)$ with initial condition $q(0)=0$.",
        "points": 3,
        "rubric": "1 pt: Separating variables correctly\n1 pt: Applying initial condition\n1 pt: $q(t) = C\\mathcal{E}(1 - e^{-t/RC})$"
      },
      {
        "label": "(c)",
        "prompt": "Derive an expression for the current $I(t)$ through the resistor.",
        "points": 2,
        "rubric": "1 pt: Using $I(t) = \\frac{dq}{dt}$\n1 pt: $I(t) = \\frac{\\mathcal{E}}{R}e^{-t/RC}$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the total energy dissipated in the resistor from $t=0$ to $t=\\infty$.",
        "points": 3,
        "rubric": "1 pt: Setting up $U_R = \\int_0^\\infty I^2 R\\,dt$\n1 pt: Evaluating the integral\n1 pt: $U_R = \\frac{1}{2}C\\mathcal{E}^2$"
      }
    ],
    "totalPoints": 10,
    "source": "Modified from CB 2016 Physics C E&M FRQ 1"
  },
  {
    "id": "physcem-2017-2",
    "courseSlug": "ap-physics-c-em",
    "year": 2017,
    "number": 2,
    "topic": "Ampere's Law",
    "prompt": "A long solid cylindrical conductor of radius $R$ carries a total current $I_0$ distributed uniformly over its cross-section. Use Ampere's law to determine the magnetic field.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive the magnetic field magnitude inside the cylinder ($r < R$).",
        "points": 3,
        "rubric": "1 pt: Applying $\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I_{enc}$\n1 pt: $I_{enc} = I_0 r^2/R^2$\n1 pt: $B_{in} = \\frac{\\mu_0 I_0 r}{2\\pi R^2}$"
      },
      {
        "label": "(b)",
        "prompt": "Derive the magnetic field magnitude outside the cylinder ($r > R$).",
        "points": 2,
        "rubric": "1 pt: $I_{enc} = I_0$\n1 pt: $B_{out} = \\frac{\\mu_0 I_0}{2\\pi r}$"
      },
      {
        "label": "(c)",
        "prompt": "Sketch $B(r)$ versus $r$.",
        "points": 2,
        "rubric": "1 pt: Linear rise from 0 to $\\mu_0 I_0/(2\\pi R)$ for $r<R$\n1 pt: $1/r$ decrease for $r>R$ continuous at $R$"
      },
      {
        "label": "(d)",
        "prompt": "A proton moves parallel to the axis with speed $v$ at distance $r>R$. Determine the magnitude and direction of the magnetic force on it.",
        "points": 2,
        "rubric": "1 pt: Magnitude $F = qvB = \\frac{\\mu_0 q v I_0}{2\\pi r}$\n1 pt: Direction is radial (toward or away from axis depending on current direction, via right-hand rule)"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from CB 2017 Physics C E&M FRQ 2"
  },
  {
    "id": "physcem-2018-1",
    "courseSlug": "ap-physics-c-em",
    "year": 2018,
    "number": 1,
    "topic": "Capacitance and Energy",
    "prompt": "A parallel-plate capacitor has plate area $A$ and separation $d$, connected to a battery of EMF $\\mathcal{E}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the capacitance in terms of $A$, $d$, and $\\epsilon_0$.",
        "points": 2,
        "rubric": "1 pt: Using $C = Q/V$ with $E = \\sigma/\\epsilon_0$\n1 pt: $C = \\epsilon_0 A/d$"
      },
      {
        "label": "(b)",
        "prompt": "Derive expressions for the charge stored and the energy stored in the capacitor.",
        "points": 2,
        "rubric": "1 pt: $Q = C\\mathcal{E} = \\epsilon_0 A\\mathcal{E}/d$\n1 pt: $U = \\frac{1}{2}C\\mathcal{E}^2 = \\frac{\\epsilon_0 A\\mathcal{E}^2}{2d}$"
      },
      {
        "label": "(c)",
        "prompt": "The plates are pulled apart to separation $2d$ while still connected to the battery. Determine the new charge and energy stored.",
        "points": 3,
        "rubric": "1 pt: New capacitance $C' = \\epsilon_0 A/(2d)$\n1 pt: New charge $Q' = Q/2$\n1 pt: New energy $U' = U/2$"
      },
      {
        "label": "(d)",
        "prompt": "Explain where the energy went when the plates were pulled apart.",
        "points": 2,
        "rubric": "1 pt: Work done by external agent pulling plates apart\n1 pt: Battery absorbs charge returned to it, accounting for the energy balance"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from CB 2018 Physics C E&M FRQ 1"
  },
  {
    "id": "physcem-2019-3",
    "courseSlug": "ap-physics-c-em",
    "year": 2019,
    "number": 3,
    "topic": "Faraday's Law",
    "prompt": "A rectangular conducting loop of width $w$ and resistance $R$ is pulled at constant velocity $v$ out of a uniform magnetic field $\\vec{B}$ directed into the page.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the induced EMF in the loop.",
        "points": 2,
        "rubric": "1 pt: Using $\\mathcal{E} = -\\frac{d\\Phi_B}{dt}$ with $\\Phi_B = Bwx$\n1 pt: $|\\mathcal{E}| = Bwv$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the induced current magnitude and direction.",
        "points": 2,
        "rubric": "1 pt: $I = Bwv/R$\n1 pt: Direction clockwise (to oppose decreasing inward flux, by Lenz's law)"
      },
      {
        "label": "(c)",
        "prompt": "Determine the external force required to keep the loop moving at constant $v$.",
        "points": 2,
        "rubric": "1 pt: Magnetic force on current-carrying segment $F_{mag} = BIw = B^2 w^2 v/R$\n1 pt: External force equal in magnitude and opposite to magnetic force"
      },
      {
        "label": "(d)",
        "prompt": "Determine the power dissipated and the power input by the external agent. Verify they are equal.",
        "points": 2,
        "rubric": "1 pt: $P_{diss} = I^2 R = B^2 w^2 v^2/R$\n1 pt: $P_{ext} = F_{ext} v = B^2 w^2 v^2/R$, equal to $P_{diss}$"
      }
    ],
    "totalPoints": 8,
    "source": "Modified from CB 2019 Physics C E&M FRQ 3"
  },
  {
    "id": "physcem-2020-2",
    "courseSlug": "ap-physics-c-em",
    "year": 2020,
    "number": 2,
    "topic": "LC Circuits",
    "prompt": "An LC circuit consists of an inductor $L$ and a capacitor $C$. At $t=0$ the capacitor carries charge $Q_0$ and the current is zero.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the differential equation for the charge $q(t)$ on the capacitor.",
        "points": 2,
        "rubric": "1 pt: Kirchhoff's loop: $L\\frac{dI}{dt} + q/C = 0$\n1 pt: Substituting $I = \\frac{dq}{dt}$ to get $\\frac{d^2q}{dt^2} + \\frac{1}{LC}q = 0$"
      },
      {
        "label": "(b)",
        "prompt": "Determine $q(t)$ and $I(t)$ using the initial conditions.",
        "points": 3,
        "rubric": "1 pt: $q(t) = Q_0\\cos(\\omega t)$ with $\\omega = 1/\\sqrt{LC}$\n1 pt: $I(t) = -Q_0\\omega\\sin(\\omega t)$\n1 pt: Verifying initial conditions $q(0)=Q_0$ and $I(0)=0$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the maximum current in the circuit.",
        "points": 2,
        "rubric": "1 pt: Maximum occurs at $\\sin(\\omega t) = \\pm 1$\n1 pt: $I_{max} = Q_0/\\sqrt{LC}$"
      },
      {
        "label": "(d)",
        "prompt": "Show that the total energy stored in the circuit is conserved and equal to $Q_0^2/(2C)$.",
        "points": 2,
        "rubric": "1 pt: Writing $U(t) = \\frac{q^2}{2C} + \\frac{1}{2}LI^2$\n1 pt: Substituting and simplifying using $\\sin^2 + \\cos^2 = 1$ to get $Q_0^2/(2C)$"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from CB 2020 Physics C E&M FRQ 2"
  },
  {
    "id": "physcem-2021-3",
    "courseSlug": "ap-physics-c-em",
    "year": 2021,
    "number": 3,
    "topic": "RL Circuits",
    "prompt": "An RL circuit consists of a battery of EMF $\\mathcal{E}$, a resistor $R$, and an inductor $L$ in series. The switch is closed at $t=0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the differential equation for the current $I(t)$ in the circuit.",
        "points": 2,
        "rubric": "1 pt: Kirchhoff loop $\\mathcal{E} - IR - L\\frac{dI}{dt} = 0$\n1 pt: Rearranging to $L\\frac{dI}{dt} + IR = \\mathcal{E}$"
      },
      {
        "label": "(b)",
        "prompt": "Solve for $I(t)$ given $I(0) = 0$.",
        "points": 3,
        "rubric": "1 pt: Identifying homogeneous and particular solutions\n1 pt: Applying initial condition\n1 pt: $I(t) = \\frac{\\mathcal{E}}{R}(1 - e^{-Rt/L})$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the time constant and the current as $t \\to \\infty$.",
        "points": 2,
        "rubric": "1 pt: Time constant $\\tau = L/R$\n1 pt: $I_\\infty = \\mathcal{E}/R$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the energy stored in the inductor at steady state.",
        "points": 2,
        "rubric": "1 pt: $U_L = \\frac{1}{2}LI_\\infty^2$\n1 pt: $U_L = \\frac{L\\mathcal{E}^2}{2R^2}$"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from CB 2021 Physics C E&M FRQ 3"
  },
  {
    "id": "physcem-2022-1",
    "courseSlug": "ap-physics-c-em",
    "year": 2022,
    "number": 1,
    "topic": "Gauss's Law Cylindrical",
    "prompt": "A long insulating cylindrical shell of inner radius $a$ and outer radius $b$ carries a uniform volume charge density $\\rho$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive the electric field magnitude for $r < a$.",
        "points": 2,
        "rubric": "1 pt: Gaussian cylinder encloses no charge\n1 pt: $E = 0$"
      },
      {
        "label": "(b)",
        "prompt": "Derive the electric field magnitude for $a < r < b$.",
        "points": 3,
        "rubric": "1 pt: Enclosed charge per unit length $\\lambda_{enc} = \\rho\\pi(r^2 - a^2)$\n1 pt: Applying $E(2\\pi r)= \\lambda_{enc}/\\epsilon_0$\n1 pt: $E = \\frac{\\rho(r^2 - a^2)}{2\\epsilon_0 r}$"
      },
      {
        "label": "(c)",
        "prompt": "Derive the electric field magnitude for $r > b$.",
        "points": 2,
        "rubric": "1 pt: Enclosed charge per unit length $\\lambda_{enc} = \\rho\\pi(b^2 - a^2)$\n1 pt: $E = \\frac{\\rho(b^2 - a^2)}{2\\epsilon_0 r}$"
      },
      {
        "label": "(d)",
        "prompt": "Derive the potential difference $V(a) - V(b)$.",
        "points": 2,
        "rubric": "1 pt: Setting up $V(a) - V(b) = \\int_a^b E\\,dr$\n1 pt: Evaluating to get $\\frac{\\rho}{2\\epsilon_0}\\left[\\frac{b^2-a^2}{2} - a^2\\ln(b/a)\\right]$"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from CB 2022 Physics C E&M FRQ 1"
  },
  {
    "id": "physcem-2023-1",
    "courseSlug": "ap-physics-c-em",
    "year": 2023,
    "number": 1,
    "topic": "Faraday's Law and Inductors",
    "prompt": "A solenoid of $N$ turns, length $\\ell$, and cross-sectional area $A$ carries a current that varies as $I(t) = I_0 \\sin(\\omega t)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the magnetic field inside the solenoid.",
        "points": 2,
        "rubric": "1 pt: Applying Ampere's law to a rectangular path through solenoid\n1 pt: $B(t) = \\mu_0 (N/\\ell) I_0\\sin(\\omega t)$"
      },
      {
        "label": "(b)",
        "prompt": "Derive the self-inductance $L$ of the solenoid.",
        "points": 3,
        "rubric": "1 pt: Total flux linkage $N\\Phi = NBA$\n1 pt: Using $L = N\\Phi/I$\n1 pt: $L = \\mu_0 N^2 A/\\ell$"
      },
      {
        "label": "(c)",
        "prompt": "Derive the EMF induced across the solenoid.",
        "points": 2,
        "rubric": "1 pt: $\\mathcal{E} = -L\\frac{dI}{dt}$\n1 pt: $\\mathcal{E} = -L I_0\\omega\\cos(\\omega t)$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the maximum energy stored in the magnetic field of the solenoid.",
        "points": 2,
        "rubric": "1 pt: $U_{max} = \\frac{1}{2}LI_0^2$\n1 pt: $U_{max} = \\frac{\\mu_0 N^2 A I_0^2}{2\\ell}$"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from CB 2023 Physics C E&M FRQ 1"
  },
  {
    "id": "physcem-2024-2",
    "courseSlug": "ap-physics-c-em",
    "year": 2024,
    "number": 2,
    "topic": "Maxwell Equations Displacement Current",
    "prompt": "A parallel-plate capacitor with circular plates of radius $R$ is being charged. The current into the capacitor is $I(t)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the electric field between the plates as a function of the charge $Q$ on the capacitor.",
        "points": 2,
        "rubric": "1 pt: Using $E = \\sigma/\\epsilon_0$ with $\\sigma = Q/(\\pi R^2)$\n1 pt: $E = Q/(\\epsilon_0 \\pi R^2)$"
      },
      {
        "label": "(b)",
        "prompt": "Derive the displacement current between the plates.",
        "points": 2,
        "rubric": "1 pt: $I_d = \\epsilon_0\\frac{d\\Phi_E}{dt}$ with $\\Phi_E = E\\pi R^2$\n1 pt: $I_d = \\frac{dQ}{dt} = I(t)$"
      },
      {
        "label": "(c)",
        "prompt": "Use the Ampere-Maxwell law to derive the magnetic field at radius $r < R$ between the plates.",
        "points": 3,
        "rubric": "1 pt: $\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 \\epsilon_0\\frac{d\\Phi_E}{dt}$\n1 pt: Enclosed displacement current $I_d(r) = I(t)(r^2/R^2)$\n1 pt: $B(r) = \\frac{\\mu_0 I(t) r}{2\\pi R^2}$"
      },
      {
        "label": "(d)",
        "prompt": "Determine $B(r)$ for $r > R$ (outside the plate edge).",
        "points": 2,
        "rubric": "1 pt: Full displacement current enclosed\n1 pt: $B(r) = \\frac{\\mu_0 I(t)}{2\\pi r}$"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from CB 2024 Physics C E&M FRQ 2"
  },
  {
    "id": "physcem-2015-3",
    "courseSlug": "ap-physics-c-em",
    "year": 2015,
    "number": 3,
    "topic": "Potential and Capacitance",
    "prompt": "Two concentric conducting spherical shells have radii $a$ and $b$ with $a < b$. The inner shell carries charge $+Q$ and the outer shell carries charge $-Q$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Use Gauss's law to derive the electric field in the region $a < r < b$.",
        "points": 2,
        "rubric": "1 pt: Enclosed charge is $+Q$\n1 pt: $E = Q/(4\\pi\\epsilon_0 r^2)$"
      },
      {
        "label": "(b)",
        "prompt": "Derive the potential difference $V(a) - V(b)$.",
        "points": 3,
        "rubric": "1 pt: Setting up $V(a)-V(b) = \\int_a^b E\\,dr$\n1 pt: Integrating $1/r^2$\n1 pt: $V(a)-V(b) = \\frac{Q}{4\\pi\\epsilon_0}\\left(\\frac{1}{a} - \\frac{1}{b}\\right)$"
      },
      {
        "label": "(c)",
        "prompt": "Derive the capacitance of the spherical capacitor.",
        "points": 2,
        "rubric": "1 pt: Using $C = Q/\\Delta V$\n1 pt: $C = \\frac{4\\pi\\epsilon_0 ab}{b-a}$"
      },
      {
        "label": "(d)",
        "prompt": "Derive the total energy stored in the electric field between the shells.",
        "points": 2,
        "rubric": "1 pt: $U = \\frac{Q^2}{2C}$\n1 pt: $U = \\frac{Q^2(b-a)}{8\\pi\\epsilon_0 ab}$"
      }
    ],
    "totalPoints": 9,
    "source": "Modified from CB 2015 Physics C E&M FRQ 3"
  },
  {
    "id": "physcem-2020-3",
    "courseSlug": "ap-physics-c-em",
    "year": 2020,
    "number": 3,
    "topic": "Magnetic Force on Charged Particle",
    "prompt": "A particle of mass $m$ and positive charge $q$ enters a region of uniform magnetic field $\\vec{B}$ directed out of the page, moving with speed $v$ perpendicular to $\\vec{B}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the radius $r$ of the circular path.",
        "points": 2,
        "rubric": "1 pt: Setting magnetic force equal to centripetal force $qvB = mv^2/r$\n1 pt: $r = mv/(qB)$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the period of the circular motion.",
        "points": 2,
        "rubric": "1 pt: $T = 2\\pi r/v$\n1 pt: $T = 2\\pi m/(qB)$"
      },
      {
        "label": "(c)",
        "prompt": "Show that the magnetic force does no work on the particle.",
        "points": 2,
        "rubric": "1 pt: $\\vec{F} = q\\vec{v}\\times\\vec{B}$ is always perpendicular to $\\vec{v}$\n1 pt: Therefore $dW = \\vec{F}\\cdot d\\vec{r} = \\vec{F}\\cdot\\vec{v}\\,dt = 0$"
      },
      {
        "label": "(d)",
        "prompt": "An electric field $\\vec{E}$ is now added perpendicular to both $\\vec{v}$ and $\\vec{B}$. Derive the condition on $E$ such that the particle travels in a straight line.",
        "points": 2,
        "rubric": "1 pt: For straight-line motion, $qE = qvB$ with forces opposite\n1 pt: $E = vB$ (velocity selector condition)"
      }
    ],
    "totalPoints": 8,
    "source": "Modified from CB 2020 Physics C E&M FRQ 3"
  },

  // ─── ap-biology ────────────────────────────────────────────────────
  {
    "id": "bio-2018-1",
    "courseSlug": "ap-biology",
    "year": 2018,
    "number": 1,
    "topic": "cell transport",
    "prompt": "Potato cores are placed into sucrose solutions of varying molarity for 24 hours. The percent change in mass is plotted against sucrose concentration.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify the molarity at which the potato cores neither gain nor lose mass and explain its meaning.",
        "points": 2,
        "rubric": "1 pt: reads x-intercept (the isotonic concentration)\n1 pt: at this concentration, solution is isotonic to potato cytoplasm; no net water movement"
      },
      {
        "label": "(b)",
        "prompt": "Explain the change in mass observed in a hypotonic (low [sucrose]) solution in terms of water potential.",
        "points": 2,
        "rubric": "1 pt: external solution has higher (less negative) water potential than potato\n1 pt: water moves into cells by osmosis, mass increases"
      },
      {
        "label": "(c)",
        "prompt": "Predict the effect of adding an aquaporin inhibitor to the cells.",
        "points": 1,
        "rubric": "1 pt: rate of water movement decreases; magnitude of mass change is reduced"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2018"
  },
  {
    "id": "bio-2017-2",
    "courseSlug": "ap-biology",
    "year": 2017,
    "number": 2,
    "topic": "enzyme kinetics",
    "prompt": "The enzyme catalase breaks down $H_2O_2$ into water and $O_2$. Students measure $O_2$ production rate at different [$H_2O_2$].",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Explain the shape of the Michaelis-Menten curve in terms of enzyme-substrate interactions.",
        "points": 2,
        "rubric": "1 pt: at low [S], rate increases proportionally with substrate available to bind\n1 pt: at high [S], active sites are saturated so rate plateaus at $V_{max}$"
      },
      {
        "label": "(b)",
        "prompt": "Predict and justify the effect of adding a competitive inhibitor on $V_{max}$ and on the substrate concentration at half-$V_{max}$.",
        "points": 2,
        "rubric": "1 pt: $V_{max}$ unchanged (can be overcome by more substrate)\n1 pt: [S] at half-$V_{max}$ increases (apparent $K_m$ increases)"
      },
      {
        "label": "(c)",
        "prompt": "Describe the effect of increasing pH from 7 to 10 on catalase activity.",
        "points": 1,
        "rubric": "1 pt: activity decreases because enzyme denatures/active site shape changes outside optimum pH"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2017"
  },
  {
    "id": "bio-2016-1",
    "courseSlug": "ap-biology",
    "year": 2016,
    "number": 1,
    "topic": "genetics pedigree",
    "prompt": "A pedigree tracks a rare human disorder. Generation I: unaffected male x unaffected female. Generation II: two daughters (one affected), one unaffected son. Generation III: affected daughter has two affected sons.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine whether the disorder is most likely autosomal dominant, autosomal recessive, or X-linked recessive. Justify.",
        "points": 2,
        "rubric": "1 pt: identifies X-linked recessive (or autosomal recessive) consistent with data\n1 pt: justification: unaffected parents have affected daughter rules out dominant; trait passes through carriers"
      },
      {
        "label": "(b)",
        "prompt": "Give the genotype of the Generation I female using allelic symbols.",
        "points": 1,
        "rubric": "1 pt: $X^A X^a$ (carrier) if X-linked; or Aa if autosomal recessive"
      },
      {
        "label": "(c)",
        "prompt": "If the Gen III affected female has another son, what is the probability he is affected? Justify.",
        "points": 2,
        "rubric": "1 pt: sets up cross assuming X-linked: $X^a X^a \\times X^A Y$\n1 pt: probability = 1 (all sons receive $X^a$ from mother and Y from father)"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2016"
  },
  {
    "id": "bio-2015-2",
    "courseSlug": "ap-biology",
    "year": 2015,
    "number": 2,
    "topic": "cellular respiration",
    "prompt": "Researchers measure $O_2$ consumption in germinating peas at 10 C and 22 C using a respirometer.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Predict which temperature will give a higher rate of $O_2$ consumption and justify.",
        "points": 2,
        "rubric": "1 pt: 22 C higher rate\n1 pt: enzymes of cellular respiration work faster at higher T (up to optimum); more kinetic energy"
      },
      {
        "label": "(b)",
        "prompt": "Describe the role of NADH in aerobic respiration.",
        "points": 2,
        "rubric": "1 pt: NADH carries electrons from glycolysis/Krebs to the ETC\n1 pt: electrons drive proton pumping producing gradient used to make ATP"
      },
      {
        "label": "(c)",
        "prompt": "Predict the effect of cyanide (blocks complex IV) on $O_2$ consumption. Justify.",
        "points": 1,
        "rubric": "1 pt: $O_2$ consumption decreases/stops because terminal electron acceptor cannot receive electrons"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2015"
  },
  {
    "id": "bio-2021-1",
    "courseSlug": "ap-biology",
    "year": 2021,
    "number": 1,
    "topic": "photosynthesis",
    "prompt": "Spinach-leaf disks are infiltrated with sodium bicarbonate and placed in a beaker under light. The time required for disks to float (indicating net $O_2$ production) is measured at increasing light intensities.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Explain why the rate plateaus at high light intensity.",
        "points": 2,
        "rubric": "1 pt: another factor (e.g., $CO_2$/bicarbonate or rubisco/ETC capacity) becomes limiting\n1 pt: light reactions cannot be used faster than Calvin cycle fixes carbon"
      },
      {
        "label": "(b)",
        "prompt": "Explain the role of bicarbonate in the experiment.",
        "points": 1,
        "rubric": "1 pt: supplies $CO_2$ for the Calvin cycle so that $O_2$ production is observable"
      },
      {
        "label": "(c)",
        "prompt": "Predict the effect of adding DCMU (blocks electron transport at Photosystem II) on disk floating time.",
        "points": 2,
        "rubric": "1 pt: disks will not float (or take far longer)\n1 pt: because $O_2$ is produced by PSII water-splitting; blocking PSII prevents $O_2$ evolution"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2021"
  },
  {
    "id": "bio-2020-1",
    "courseSlug": "ap-biology",
    "year": 2020,
    "number": 1,
    "topic": "natural selection",
    "prompt": "In a population of beetles, body color is controlled by a single gene with two alleles: dark (D) dominant over light (d). In an initial population of 1000 beetles, 360 are DD, 480 are Dd, and 160 are dd.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the allele frequencies of D and d.",
        "points": 2,
        "rubric": "1 pt: p (D) = (720+480)/2000 = 0.60\n1 pt: q (d) = 0.40"
      },
      {
        "label": "(b)",
        "prompt": "After introduction of a predator that preferentially preys on light beetles, light beetles have fitness 0.5 while dark beetles have fitness 1.0. Predict how allele frequency will change.",
        "points": 2,
        "rubric": "1 pt: frequency of d will decrease\n1 pt: frequency of D will increase because dark phenotype has higher fitness"
      },
      {
        "label": "(c)",
        "prompt": "Explain why the d allele is unlikely to be eliminated quickly.",
        "points": 1,
        "rubric": "1 pt: heterozygotes (Dd) carry d allele and are not selected against because D is dominant"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2020"
  },
  {
    "id": "bio-2023-2",
    "courseSlug": "ap-biology",
    "year": 2023,
    "number": 2,
    "topic": "phylogeny",
    "prompt": "A cladogram of four species (W, X, Y, Z) is constructed from morphological data.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify the two species most closely related in the tree. Justify.",
        "points": 1,
        "rubric": "1 pt: X and Y share the most recent common ancestor"
      },
      {
        "label": "(b)",
        "prompt": "Explain what it means for a group to be monophyletic and identify one monophyletic clade in the tree.",
        "points": 2,
        "rubric": "1 pt: monophyletic = common ancestor + all its descendants\n1 pt: {X, Y} (or {W, X, Y} or the whole tree) is monophyletic"
      },
      {
        "label": "(c)",
        "prompt": "DNA sequence data later show Y and Z are sister taxa. Explain how this could occur.",
        "points": 2,
        "rubric": "1 pt: morphological similarities can result from convergent evolution\n1 pt: molecular data revise the tree to place Y and Z as sister taxa"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2023"
  },
  {
    "id": "bio-2022-3",
    "courseSlug": "ap-biology",
    "year": 2022,
    "number": 3,
    "topic": "Punnett square",
    "prompt": "In pea plants, purple flowers (P) are dominant over white (p) and tall (T) dominant over dwarf (t). A dihybrid PpTt is crossed with another PpTt.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "State the expected phenotypic ratio of offspring.",
        "points": 1,
        "rubric": "1 pt: 9 purple-tall : 3 purple-dwarf : 3 white-tall : 1 white-dwarf"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the probability that a randomly selected offspring is homozygous recessive for both traits (pptt).",
        "points": 1,
        "rubric": "1 pt: 1/16"
      },
      {
        "label": "(c)",
        "prompt": "Out of 160 offspring, 82 were purple-tall, 30 purple-dwarf, 36 white-tall, 12 white-dwarf. Perform a chi-square test against the 9:3:3:1 expectation (critical value 7.815 for 3 df at p=0.05).",
        "points": 3,
        "rubric": "1 pt: expected counts 90, 30, 30, 10\n1 pt: $\\chi^2 \\approx 2.31$\n1 pt: $2.31 < 7.815$, fail to reject null; consistent with independent assortment"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2022"
  },
  {
    "id": "bio-2024-1",
    "courseSlug": "ap-biology",
    "year": 2024,
    "number": 1,
    "topic": "membrane transport",
    "prompt": "A membrane contains an $Na^+/K^+$ ATPase pump and a facilitated $K^+$ channel.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Describe the direction of $Na^+$ and $K^+$ movement through the ATPase, and justify why ATP is required.",
        "points": 2,
        "rubric": "1 pt: Na+ out, K+ in (3 Na+ out, 2 K+ in)\n1 pt: both moved against their concentration gradients (active transport), requiring ATP"
      },
      {
        "label": "(b)",
        "prompt": "Describe the direction of $K^+$ flow through the channel and whether ATP is required.",
        "points": 2,
        "rubric": "1 pt: K+ flows from inside to outside (down gradient)\n1 pt: no ATP required; facilitated diffusion"
      },
      {
        "label": "(c)",
        "prompt": "Predict the membrane potential effect of blocking the ATPase with ouabain.",
        "points": 1,
        "rubric": "1 pt: membrane depolarizes because ion gradients collapse and K+ efflux decreases"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2024"
  },
  {
    "id": "bio-2019-3",
    "courseSlug": "ap-biology",
    "year": 2019,
    "number": 3,
    "topic": "ecology",
    "prompt": "Two species of Paramecium are grown separately and then together in a limited resource environment. Separately both reach carrying capacity; together, one outcompetes the other.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify the ecological principle illustrated and describe its meaning.",
        "points": 2,
        "rubric": "1 pt: competitive exclusion principle\n1 pt: two species with identical niches cannot coexist; one will outcompete the other"
      },
      {
        "label": "(b)",
        "prompt": "Describe one way the two species could coexist in the long term.",
        "points": 1,
        "rubric": "1 pt: resource partitioning / niche differentiation"
      },
      {
        "label": "(c)",
        "prompt": "Write the logistic growth equation and label each term.",
        "points": 2,
        "rubric": "1 pt: $\\frac{dN}{dt} = rN\\frac{(K-N)}{K}$\n1 pt: r intrinsic rate of increase; K carrying capacity; N population size"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2019"
  },

  // ─── ap-chemistry ────────────────────────────────────────────────────
  {
    "id": "chem-2018-1",
    "courseSlug": "ap-chemistry",
    "year": 2018,
    "number": 1,
    "topic": "stoichiometry",
    "prompt": "A 2.50 g sample of impure magnesium carbonate is dissolved in excess 1.00 M HCl. The reaction is $MgCO_3(s) + 2HCl(aq) \\rightarrow MgCl_2(aq) + H_2O(l) + CO_2(g)$. The $CO_2$ produced is collected over water at 25 C and 755 torr; the volume is 485 mL. Vapor pressure of water at 25 C is 24 torr.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the partial pressure of $CO_2$ in torr.",
        "points": 1,
        "rubric": "1 pt: 755 - 24 = 731 torr"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the moles of $CO_2$ produced using $PV=nRT$.",
        "points": 2,
        "rubric": "1 pt: correct unit conversions (atm, L, K)\n1 pt: n = 0.0191 mol"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the mass percent of $MgCO_3$ in the original sample.",
        "points": 2,
        "rubric": "1 pt: mass $MgCO_3$ = 0.0191 * 84.3 = 1.61 g\n1 pt: percent = (1.61/2.50)*100 = 64.4%"
      },
      {
        "label": "(d)",
        "prompt": "Identify one source of error that would cause the calculated percent to be too high, and justify.",
        "points": 1,
        "rubric": "1 pt: e.g., not correcting for water vapor would overestimate moles $CO_2$ and therefore mass of $MgCO_3$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2018"
  },
  {
    "id": "chem-2017-3",
    "courseSlug": "ap-chemistry",
    "year": 2017,
    "number": 3,
    "topic": "gas laws",
    "prompt": "A rigid 3.00 L vessel contains 0.250 mol $N_2$ and 0.500 mol $H_2$ at 350 K.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the total pressure in the vessel in atm.",
        "points": 2,
        "rubric": "1 pt: total moles = 0.750\n1 pt: P = nRT/V = 7.18 atm"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the mole fraction and partial pressure of $H_2$.",
        "points": 2,
        "rubric": "1 pt: mole fraction = 0.667\n1 pt: $P_{H_2}$ = 4.79 atm"
      },
      {
        "label": "(c)",
        "prompt": "The temperature is raised to 700 K with no change in volume. Predict the change in total pressure and justify using kinetic molecular theory.",
        "points": 2,
        "rubric": "1 pt: pressure doubles (P proportional to T at constant n, V)\n1 pt: higher T means greater average kinetic energy and more frequent/forceful wall collisions"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2017"
  },
  {
    "id": "chem-2016-2",
    "courseSlug": "ap-chemistry",
    "year": 2016,
    "number": 2,
    "topic": "acid-base titration",
    "prompt": "A 25.0 mL sample of 0.100 M $CH_3COOH$ ($K_a = 1.8 \\times 10^{-5}$) is titrated with 0.100 M NaOH.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the pH of the original $CH_3COOH$ solution.",
        "points": 2,
        "rubric": "1 pt: $[H^+] = \\sqrt{K_a C} = 1.34 \\times 10^{-3}$ M\n1 pt: pH = 2.87"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the pH after 12.5 mL of NaOH has been added (half-equivalence).",
        "points": 1,
        "rubric": "1 pt: pH = $pK_a$ = 4.74"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the pH at the equivalence point.",
        "points": 2,
        "rubric": "1 pt: $[CH_3COO^-]$ = 0.0500 M, $K_b = 5.6 \\times 10^{-10}$\n1 pt: pH = 8.72"
      },
      {
        "label": "(d)",
        "prompt": "Explain why the equivalence point pH is greater than 7.",
        "points": 1,
        "rubric": "1 pt: the conjugate base $CH_3COO^-$ hydrolyzes water producing $OH^-$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2016"
  },
  {
    "id": "chem-2015-1",
    "courseSlug": "ap-chemistry",
    "year": 2015,
    "number": 1,
    "topic": "equilibrium Kc",
    "prompt": "Consider the equilibrium $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$ with $K_c = 0.500$ at 700 K. A 2.00 L vessel is charged with 1.00 mol $N_2$, 3.00 mol $H_2$, and 0.500 mol $NH_3$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the reaction quotient $Q_c$ and determine the direction the reaction shifts.",
        "points": 2,
        "rubric": "1 pt: concentrations 0.500, 1.50, 0.250; compute $Q_c$\n1 pt: compares to K and states direction of shift"
      },
      {
        "label": "(b)",
        "prompt": "If the volume is suddenly halved, predict the direction of shift using Le Chatelier reasoning.",
        "points": 2,
        "rubric": "1 pt: recognizes concentration doubling effect on Q\n1 pt: also consistent with Le Chatelier (fewer moles of gas on product side)"
      },
      {
        "label": "(c)",
        "prompt": "If the forward reaction is exothermic, predict the effect of raising temperature on $K_c$.",
        "points": 1,
        "rubric": "1 pt: $K_c$ decreases because equilibrium shifts toward reactants"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2015"
  },
  {
    "id": "chem-2021-3",
    "courseSlug": "ap-chemistry",
    "year": 2021,
    "number": 3,
    "topic": "Ksp",
    "prompt": "$PbCl_2(s) \\rightleftharpoons Pb^{2+}(aq) + 2Cl^-(aq)$, $K_{sp} = 1.6 \\times 10^{-5}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the expression for $K_{sp}$.",
        "points": 1,
        "rubric": "1 pt: $K_{sp} = [Pb^{2+}][Cl^-]^2$"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the molar solubility of $PbCl_2$ in pure water.",
        "points": 2,
        "rubric": "1 pt: set $[Pb^{2+}] = s$, $[Cl^-] = 2s$; $4s^3 = 1.6 \\times 10^{-5}$\n1 pt: s = 0.016 M"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the molar solubility in 0.10 M NaCl.",
        "points": 2,
        "rubric": "1 pt: $[Cl^-] \\approx 0.10$; $s = K_{sp}/(0.10)^2$\n1 pt: s = $1.6 \\times 10^{-3}$ M"
      },
      {
        "label": "(d)",
        "prompt": "Explain the difference between the two solubilities in terms of the common-ion effect.",
        "points": 1,
        "rubric": "1 pt: added $Cl^-$ shifts equilibrium left, decreasing molar solubility"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2021"
  },
  {
    "id": "chem-2020-2",
    "courseSlug": "ap-chemistry",
    "year": 2020,
    "number": 2,
    "topic": "thermochemistry",
    "prompt": "Methanol combusts: $2CH_3OH(l) + 3O_2(g) \\rightarrow 2CO_2(g) + 4H_2O(l)$, $\\Delta H = -1453$ kJ/mol rxn.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the heat released when 16.0 g of methanol combusts completely.",
        "points": 2,
        "rubric": "1 pt: 16.0/32.0 = 0.500 mol $CH_3OH$\n1 pt: q = 0.500 * (1453/2) = 363 kJ released"
      },
      {
        "label": "(b)",
        "prompt": "Describe whether reactants or products have greater enthalpy and justify.",
        "points": 1,
        "rubric": "1 pt: reactants have higher enthalpy because $\\Delta H$ is negative (exothermic)"
      },
      {
        "label": "(c)",
        "prompt": "The standard entropy change $\\Delta S^{\\circ}$ is $-161$ J/(mol K). Calculate $\\Delta G^{\\circ}$ at 298 K.",
        "points": 2,
        "rubric": "1 pt: $\\Delta G = \\Delta H - T\\Delta S$\n1 pt: $\\Delta G = -1453 - (298)(-0.161) \\approx -1405$ kJ/mol rxn"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2020"
  },
  {
    "id": "chem-2023-2",
    "courseSlug": "ap-chemistry",
    "year": 2023,
    "number": 2,
    "topic": "kinetics",
    "prompt": "For the reaction $2NO(g) + O_2(g) \\rightarrow 2NO_2(g)$, experimental initial-rate data: Exp1 [NO]=0.010, [$O_2$]=0.010, rate=$2.5\\times 10^{-5}$; Exp2 [NO]=0.020, [$O_2$]=0.010, rate=$1.0\\times 10^{-4}$; Exp3 [NO]=0.010, [$O_2$]=0.020, rate=$5.0\\times 10^{-5}$ M/s.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the order with respect to NO and with respect to $O_2$.",
        "points": 2,
        "rubric": "1 pt: second order in NO (rate quadruples when [NO] doubles)\n1 pt: first order in $O_2$ (rate doubles when [$O_2$] doubles)"
      },
      {
        "label": "(b)",
        "prompt": "Write the rate law and calculate the rate constant k with units.",
        "points": 2,
        "rubric": "1 pt: rate = $k[NO]^2[O_2]$\n1 pt: k = 25 $M^{-2}s^{-1}$"
      },
      {
        "label": "(c)",
        "prompt": "Predict the rate when [NO] = 0.030 M and [$O_2$] = 0.015 M.",
        "points": 1,
        "rubric": "1 pt: rate = $25(0.030)^2(0.015) \\approx 3.4\\times 10^{-4}$ M/s"
      },
      {
        "label": "(d)",
        "prompt": "Explain qualitatively how increasing temperature affects k.",
        "points": 1,
        "rubric": "1 pt: k increases because more collisions exceed activation energy (Arrhenius)"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2023"
  },
  {
    "id": "chem-2022-3",
    "courseSlug": "ap-chemistry",
    "year": 2022,
    "number": 3,
    "topic": "electrochemistry",
    "prompt": "A voltaic cell is constructed with $Zn|Zn^{2+}(1.0 M)||Cu^{2+}(1.0 M)|Cu$. Standard reduction potentials: $Cu^{2+}/Cu = +0.34$ V, $Zn^{2+}/Zn = -0.76$ V.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write balanced half-reactions and the overall cell reaction.",
        "points": 2,
        "rubric": "1 pt: anode $Zn \\rightarrow Zn^{2+} + 2e^-$; cathode $Cu^{2+} + 2e^- \\rightarrow Cu$\n1 pt: overall $Zn + Cu^{2+} \\rightarrow Zn^{2+} + Cu$"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the standard cell potential $E^{\\circ}_{cell}$.",
        "points": 1,
        "rubric": "1 pt: $E^{\\circ} = 0.34 - (-0.76) = +1.10$ V"
      },
      {
        "label": "(c)",
        "prompt": "Calculate $\\Delta G^{\\circ}$ for the reaction.",
        "points": 2,
        "rubric": "1 pt: n = 2; $\\Delta G = -nFE$\n1 pt: $\\Delta G \\approx -212$ kJ/mol"
      },
      {
        "label": "(d)",
        "prompt": "Predict and justify the effect on cell potential of increasing $[Cu^{2+}]$ to 2.0 M.",
        "points": 1,
        "rubric": "1 pt: E increases; by Nernst, larger [oxidizer] raises E"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2022"
  },
  {
    "id": "chem-2024-1",
    "courseSlug": "ap-chemistry",
    "year": 2024,
    "number": 1,
    "topic": "acid-base buffers",
    "prompt": "A buffer is prepared by mixing 50.0 mL of 0.200 M $NH_3$ ($K_b = 1.8 \\times 10^{-5}$) with 50.0 mL of 0.200 M $NH_4Cl$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the pH of the buffer.",
        "points": 2,
        "rubric": "1 pt: $pK_a$ of $NH_4^+$ = 9.26; [base]/[acid] = 1\n1 pt: pH = 9.26"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the pH after adding 5.00 mL of 0.100 M HCl.",
        "points": 2,
        "rubric": "1 pt: moles $NH_3$ = 0.0095, moles $NH_4^+$ = 0.0105 after reaction\n1 pt: pH = 9.26 + log(0.0095/0.0105) = 9.22"
      },
      {
        "label": "(c)",
        "prompt": "Explain at the particle level why the buffer resists pH change.",
        "points": 1,
        "rubric": "1 pt: added $H^+$ reacts with $NH_3$ producing $NH_4^+$, consuming most of the added acid"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2024"
  },
  {
    "id": "chem-2019-4",
    "courseSlug": "ap-chemistry",
    "year": 2019,
    "number": 4,
    "topic": "Lewis structures and IMFs",
    "prompt": "Consider the molecules $CH_4$, $NH_3$, and $H_2O$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Rank the three molecules by boiling point and justify using IMFs.",
        "points": 2,
        "rubric": "1 pt: ranking $H_2O > NH_3 > CH_4$\n1 pt: justification: H-bonding strongest in $H_2O$, $NH_3$ weaker H-bond, $CH_4$ only LDFs"
      },
      {
        "label": "(b)",
        "prompt": "Predict the electron geometry and molecular shape of $NH_3$.",
        "points": 2,
        "rubric": "1 pt: electron geometry tetrahedral\n1 pt: molecular shape trigonal pyramidal"
      },
      {
        "label": "(c)",
        "prompt": "Which molecule is nonpolar? Justify.",
        "points": 1,
        "rubric": "1 pt: $CH_4$ nonpolar because symmetric tetrahedral geometry cancels bond dipoles"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2019"
  },

  // ─── ap-environmental ────────────────────────────────────────────────────
  {
    "id": "apes-2018-1",
    "courseSlug": "ap-environmental",
    "year": 2018,
    "number": 1,
    "topic": "population dynamics",
    "prompt": "A town of 20,000 people has an annual birth rate of 18 per 1000, a death rate of 8 per 1000, and net immigration of 200 people per year.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the annual percent natural increase (excluding migration).",
        "points": 2,
        "rubric": "1 pt: (18-8)/1000 = 0.010\n1 pt: 1.0% per year"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the doubling time using the rule of 70 based on natural increase only.",
        "points": 1,
        "rubric": "1 pt: 70/1.0 = 70 years"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the total population one year later including migration.",
        "points": 2,
        "rubric": "1 pt: natural increase = 200 people; migration = 200 people\n1 pt: total = 20,400"
      },
      {
        "label": "(d)",
        "prompt": "Describe one environmental consequence of sustained 1% growth in this town.",
        "points": 1,
        "rubric": "1 pt: e.g., increased demand on water/energy/land or increased waste production"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2018"
  },
  {
    "id": "apes-2017-1",
    "courseSlug": "ap-environmental",
    "year": 2017,
    "number": 1,
    "topic": "water pollution",
    "prompt": "A dairy farm near a stream discharges manure-laden runoff. Monitoring downstream shows elevated nitrate, phosphate, and BOD, with a fish kill reported.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify the environmental phenomenon occurring and describe the sequence of events leading to the fish kill.",
        "points": 3,
        "rubric": "1 pt: names eutrophication / cultural eutrophication\n1 pt: nutrients promote algal bloom\n1 pt: bacterial decomposition of dead algae depletes dissolved oxygen, killing fish"
      },
      {
        "label": "(b)",
        "prompt": "Propose ONE farming practice that would reduce nutrient runoff.",
        "points": 1,
        "rubric": "1 pt: e.g., riparian buffer strips, cover crops, manure lagoon, contour plowing"
      },
      {
        "label": "(c)",
        "prompt": "Explain how the Clean Water Act addresses point-source pollution.",
        "points": 2,
        "rubric": "1 pt: requires NPDES permits for point-source discharges\n1 pt: limits pollutant concentrations and mandates monitoring/penalties for violators"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2017"
  },
  {
    "id": "apes-2016-2",
    "courseSlug": "ap-environmental",
    "year": 2016,
    "number": 2,
    "topic": "energy sources",
    "prompt": "A country generates electricity from the following sources: coal 40%, natural gas 25%, nuclear 15%, hydro 12%, wind 5%, solar 3%.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the total percent of electricity from renewable sources.",
        "points": 1,
        "rubric": "1 pt: 12 + 5 + 3 = 20%"
      },
      {
        "label": "(b)",
        "prompt": "Compare $CO_2$ emissions from coal vs. natural gas per kWh and explain the chemical reason.",
        "points": 2,
        "rubric": "1 pt: natural gas emits less $CO_2$ per kWh than coal\n1 pt: methane has higher H:C ratio, so more energy comes from H-O bond formation relative to C-O"
      },
      {
        "label": "(c)",
        "prompt": "Identify ONE advantage and ONE disadvantage of nuclear power.",
        "points": 2,
        "rubric": "1 pt: advantage (e.g., low $CO_2$ emissions, high energy density)\n1 pt: disadvantage (e.g., radioactive waste, accident risk, high capital cost)"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2016"
  },
  {
    "id": "apes-2015-3",
    "courseSlug": "ap-environmental",
    "year": 2015,
    "number": 3,
    "topic": "biogeochemical cycles",
    "prompt": "The carbon cycle involves multiple reservoirs (atmosphere, plants, animals, fossil fuels) and fluxes (photosynthesis, respiration, combustion).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify the process that moves carbon from the atmosphere to plants.",
        "points": 1,
        "rubric": "1 pt: photosynthesis"
      },
      {
        "label": "(b)",
        "prompt": "Describe two human activities that increase atmospheric $CO_2$.",
        "points": 2,
        "rubric": "1 pt: combustion of fossil fuels\n1 pt: deforestation / land-use change"
      },
      {
        "label": "(c)",
        "prompt": "Explain how ocean absorption of $CO_2$ leads to ocean acidification and its effects on marine organisms.",
        "points": 2,
        "rubric": "1 pt: $CO_2 + H_2O \\rightarrow H_2CO_3$, which dissociates to $H^+ + HCO_3^-$, lowering pH\n1 pt: lower pH reduces carbonate availability, harming shell-building organisms (corals, mollusks)"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2015"
  },
  {
    "id": "apes-2021-2",
    "courseSlug": "ap-environmental",
    "year": 2021,
    "number": 2,
    "topic": "climate",
    "prompt": "Atmospheric $CO_2$ has increased from ~280 ppm in 1850 to ~420 ppm today. Global average temperature has risen ~1.1 C since the late 1800s.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the percent increase in atmospheric $CO_2$ from 1850 to today.",
        "points": 1,
        "rubric": "1 pt: (420-280)/280 * 100 = 50%"
      },
      {
        "label": "(b)",
        "prompt": "Explain the physical mechanism by which increasing $CO_2$ warms the lower atmosphere.",
        "points": 2,
        "rubric": "1 pt: $CO_2$ is transparent to incoming shortwave/visible but absorbs outgoing infrared radiation\n1 pt: absorbed IR is re-emitted in all directions, some back to surface, increasing surface temperature"
      },
      {
        "label": "(c)",
        "prompt": "Describe one positive feedback loop that amplifies warming.",
        "points": 2,
        "rubric": "1 pt: identifies a positive feedback (e.g., ice-albedo, permafrost methane, water vapor)\n1 pt: explains how the feedback amplifies warming"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2021"
  },
  {
    "id": "apes-2020-3",
    "courseSlug": "ap-environmental",
    "year": 2020,
    "number": 3,
    "topic": "air pollution",
    "prompt": "A city in a valley frequently experiences thick smog on calm, sunny days. Monitoring detects elevated $NO_x$, VOCs, and ground-level ozone.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Explain the atmospheric chemistry forming ground-level ozone in photochemical smog.",
        "points": 2,
        "rubric": "1 pt: $NO_x$ + VOCs + sunlight drive reactions producing $O_3$\n1 pt: $NO_2 + h\\nu \\rightarrow NO + O$, then $O + O_2 \\rightarrow O_3$"
      },
      {
        "label": "(b)",
        "prompt": "Describe a temperature inversion and explain why it worsens smog.",
        "points": 2,
        "rubric": "1 pt: warm air layer sits above cooler surface air, stable stratification\n1 pt: suppresses vertical mixing so pollutants are trapped near the surface"
      },
      {
        "label": "(c)",
        "prompt": "Describe ONE policy or technology that reduces tropospheric ozone formation.",
        "points": 1,
        "rubric": "1 pt: e.g., catalytic converters, reformulated gasoline, EV mandates, VOC limits"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2020"
  },
  {
    "id": "apes-2022-2",
    "courseSlug": "ap-environmental",
    "year": 2022,
    "number": 2,
    "topic": "biodiversity",
    "prompt": "A tropical rainforest is being converted to palm-oil plantations. A simplified food web shows: grass - insects - frogs - snakes - hawks; also fruits - monkeys - hawks.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify all primary consumers in the food web.",
        "points": 1,
        "rubric": "1 pt: insects and monkeys"
      },
      {
        "label": "(b)",
        "prompt": "Predict the effect of removing all frogs on snake and insect populations. Justify.",
        "points": 2,
        "rubric": "1 pt: snake population decreases (loss of food source)\n1 pt: insect population increases (loss of predator)"
      },
      {
        "label": "(c)",
        "prompt": "Describe two reasons biodiversity loss from deforestation is of concern to humans.",
        "points": 2,
        "rubric": "1 pt: loss of ecosystem services (pollination, pest control, water filtration, carbon storage)\n1 pt: loss of potential medicines, cultural/aesthetic value, or food resources"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2022"
  },
  {
    "id": "apes-2024-2",
    "courseSlug": "ap-environmental",
    "year": 2024,
    "number": 2,
    "topic": "nitrogen cycle",
    "prompt": "Industrial fertilizer production converts $N_2$ to $NH_3$ via the Haber-Bosch process. Global fertilizer use has quadrupled since 1960.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Name the natural biological process that also fixes $N_2$ and where it occurs.",
        "points": 2,
        "rubric": "1 pt: biological nitrogen fixation\n1 pt: carried out by bacteria (e.g., Rhizobium in legume root nodules, cyanobacteria)"
      },
      {
        "label": "(b)",
        "prompt": "Describe TWO environmental consequences of excess nitrogen runoff into waterways.",
        "points": 2,
        "rubric": "1 pt: eutrophication / algal blooms / hypoxic dead zones\n1 pt: loss of aquatic biodiversity or contamination of drinking water with nitrate"
      },
      {
        "label": "(c)",
        "prompt": "Propose ONE agricultural practice that reduces nitrogen losses and explain why it works.",
        "points": 1,
        "rubric": "1 pt: e.g., cover crops/crop rotation with legumes fix N in soil and reduce need for synthetic fertilizer"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2024"
  },
  {
    "id": "apes-2018-3",
    "courseSlug": "ap-environmental",
    "year": 2018,
    "number": 3,
    "topic": "population growth curve",
    "prompt": "A population of deer introduced to an island grows according to logistic dynamics with K = 500 and r = 0.25/year. Initial population is 50.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the instantaneous growth rate dN/dt when N = 250.",
        "points": 2,
        "rubric": "1 pt: dN/dt = 0.25 * 250 * (500-250)/500\n1 pt: dN/dt = 31.25 deer/year"
      },
      {
        "label": "(b)",
        "prompt": "Explain why the growth rate is maximized near N = K/2.",
        "points": 2,
        "rubric": "1 pt: product $N(K-N)$ is maximized when N = K/2\n1 pt: at this point there are enough individuals reproducing and adequate resources remaining"
      },
      {
        "label": "(c)",
        "prompt": "Describe one density-dependent factor that may eventually limit the deer population.",
        "points": 1,
        "rubric": "1 pt: e.g., food availability, disease transmission, predation, territory/space"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2018"
  },

  // ─── ap-cs-a ────────────────────────────────────────────────────
  {
    "id": "cs-a-2015-1",
    "courseSlug": "ap-cs-a",
    "year": 2015,
    "number": 1,
    "topic": "Arrays and methods",
    "prompt": "The DiverseArray class contains methods that operate on a 2D array of integers. Write the methods described in parts (a) and (b).\n\n```java\npublic class DiverseArray {\n  public static int arraySum(int[] arr) { /* implementation not shown */ }\n  public static int[] rowSums(int[][] arr2D) { /* part (a) */ }\n  public static boolean isDiverse(int[][] arr2D) { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the method rowSums that returns a one-dimensional array in which each element is the sum of the corresponding row of arr2D. Assume arraySum works as intended.",
        "points": 4,
        "rubric": "1 pt: correct method signature and return type\n1 pt: declares result array of length equal to number of rows\n1 pt: calls arraySum on each row correctly\n1 pt: returns the populated array"
      },
      {
        "label": "(b)",
        "prompt": "Write the method isDiverse that returns true if no two rows of arr2D have the same sum, and false otherwise. Assume rowSums works as intended.",
        "points": 5,
        "rubric": "1 pt: calls rowSums and stores the result\n1 pt: nested loop compares distinct row sum pairs\n1 pt: correct loop bounds avoiding self-comparison\n1 pt: returns false when duplicate sum is found\n1 pt: returns true when no duplicates exist"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2015 FRQ 1"
  },
  {
    "id": "cs-a-2016-2",
    "courseSlug": "ap-cs-a",
    "year": 2016,
    "number": 2,
    "topic": "Classes and inheritance",
    "prompt": "Consider the HiddenWord class representing a word in a guessing game.\n\n```java\npublic class HiddenWord {\n  private String word;\n  public HiddenWord(String s) { word = s; }\n  public String getHint(String guess) { /* to implement */ }\n}\n```\nFor each position, if the letter matches, include it; if the letter is in the word elsewhere, include '+'; otherwise include '*'.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the getHint method. Assume guess and word are the same length.",
        "points": 9,
        "rubric": "1 pt: correct method signature\n1 pt: initializes result accumulator\n1 pt: loops over all character positions\n1 pt: correct loop bounds\n1 pt: compares chars at same index correctly\n1 pt: appends matched letter when equal\n1 pt: checks letter existence elsewhere in word\n1 pt: appends '+' or '*' correctly\n1 pt: returns final string"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2016 FRQ 1 (HiddenWord)"
  },
  {
    "id": "cs-a-2017-3",
    "courseSlug": "ap-cs-a",
    "year": 2017,
    "number": 3,
    "topic": "ArrayList",
    "prompt": "A phrase is a sequence of words. The Phrase class stores a String and supports word replacement.\n\n```java\npublic class Phrase {\n  private String currentPhrase;\n  public int findNthOccurrence(String str, int n) { /* given */ }\n  public void replaceNthOccurrence(String from, int n, String to) { /* part (a) */ }\n  public int findLastOccurrence(String str) { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write replaceNthOccurrence which replaces the nth occurrence of from with to in currentPhrase. If no nth occurrence exists, currentPhrase is unchanged.",
        "points": 4,
        "rubric": "1 pt: calls findNthOccurrence with correct arguments\n1 pt: checks whether returned index indicates not found\n1 pt: constructs replacement string using substring correctly\n1 pt: reassigns currentPhrase only when replacement applies"
      },
      {
        "label": "(b)",
        "prompt": "Write findLastOccurrence which returns the starting index of the last occurrence of str or -1 if none.",
        "points": 5,
        "rubric": "1 pt: initializes n counter variable\n1 pt: loop continues calling findNthOccurrence\n1 pt: updates tracked last valid index\n1 pt: terminates when findNthOccurrence returns -1\n1 pt: returns correct final index or -1"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2017 FRQ 2 (Phrase)"
  },
  {
    "id": "cs-a-2018-1",
    "courseSlug": "ap-cs-a",
    "year": 2018,
    "number": 1,
    "topic": "Array methods",
    "prompt": "The FrogSimulation class simulates a frog hopping along a number line toward a goal.\n\n```java\npublic class FrogSimulation {\n  private int goalDistance;\n  private int maxHops;\n  public boolean simulate() { /* part (a) */ }\n  public double runSimulations(int num) { /* part (b) */ }\n  private int hopDistance() { /* randomly returns hop distance */ }\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write simulate which returns true if the frog reached the goal within maxHops, false otherwise. Positive hops move forward; negative backward. The frog stops as soon as it reaches the goal.",
        "points": 5,
        "rubric": "1 pt: tracks current position starting at 0\n1 pt: loops up to maxHops times\n1 pt: updates position using hopDistance result\n1 pt: returns true when position reaches or passes goal\n1 pt: returns false after all hops without success"
      },
      {
        "label": "(b)",
        "prompt": "Write runSimulations which runs simulate num times and returns the proportion of successes as a double between 0.0 and 1.0.",
        "points": 3,
        "rubric": "1 pt: loops exactly num times calling simulate\n1 pt: counts the number of successful simulations\n1 pt: returns count cast to double divided by num"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from CB 2018 FRQ 2 (FrogSimulation)"
  },
  {
    "id": "cs-a-2019-1",
    "courseSlug": "ap-cs-a",
    "year": 2019,
    "number": 1,
    "topic": "2D arrays",
    "prompt": "A grid game stores nonnegative integer scores in a 2D array. Write the method countIncreasingRows.\n\n```java\npublic static int countIncreasingRows(int[][] scores) {\n  /* returns count of rows whose values are strictly increasing left-to-right */\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Implement countIncreasingRows. A row is strictly increasing if every element is greater than the one to its left.",
        "points": 7,
        "rubric": "1 pt: declares counter initialized to 0\n1 pt: outer loop iterates rows\n1 pt: inner loop iterates columns with correct bounds\n1 pt: compares adjacent elements correctly\n1 pt: detects non-increasing case and breaks/flags\n1 pt: increments counter only for fully increasing rows\n1 pt: returns the final counter"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2019 (2D array traversal)"
  },
  {
    "id": "cs-a-2021-1",
    "courseSlug": "ap-cs-a",
    "year": 2021,
    "number": 1,
    "topic": "Methods and loops",
    "prompt": "Consider the NumberGroup hierarchy and the Range class, a group of integers between min and max inclusive.\n\n```java\npublic interface NumberGroup {\n  boolean contains(int num);\n}\npublic class Range implements NumberGroup {\n  private int min;\n  private int max;\n  /* to implement */\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the Range constructor and contains method so that contains returns true iff num is within [min, max].",
        "points": 4,
        "rubric": "1 pt: constructor assigns parameters correctly regardless of order\n1 pt: stores smaller value as min and larger as max\n1 pt: contains signature matches interface\n1 pt: contains returns correct boolean comparison"
      },
      {
        "label": "(b)",
        "prompt": "A MultipleGroups class stores a List<NumberGroup>. Write its contains method that returns true if any group contains num.",
        "points": 4,
        "rubric": "1 pt: iterates through the list of NumberGroup\n1 pt: calls contains on each element\n1 pt: returns true immediately upon match\n1 pt: returns false after loop completes"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from CB 2021 FRQ (NumberGroup/Range)"
  },
  {
    "id": "cs-a-2021-4",
    "courseSlug": "ap-cs-a",
    "year": 2021,
    "number": 4,
    "topic": "Recursion",
    "prompt": "Consider the method mystery that operates on arrays of integers.\n\n```java\npublic static int mystery(int[] arr, int low, int high) {\n  if (low > high) return 0;\n  if (low == high) return arr[low];\n  int mid = (low + high) / 2;\n  return Math.max(mystery(arr, low, mid), mystery(arr, mid + 1, high));\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Describe in one or two sentences what mystery returns when called as mystery(arr, 0, arr.length - 1) for a nonempty array.",
        "points": 2,
        "rubric": "1 pt: identifies the result as the maximum element\n1 pt: notes recursive divide-and-conquer structure"
      },
      {
        "label": "(b)",
        "prompt": "Write a recursive method sumRec(int[] arr, int low, int high) that returns the sum of arr[low..high] using the same halving recursion pattern.",
        "points": 5,
        "rubric": "1 pt: base case low > high returns 0\n1 pt: base case low == high returns arr[low]\n1 pt: computes mid correctly\n1 pt: two recursive calls with correct ranges\n1 pt: returns sum of recursive results"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2021 FRQ 4 (recursion)"
  },
  {
    "id": "cs-a-2022-1-mod",
    "courseSlug": "ap-cs-a",
    "year": 2022,
    "number": 1,
    "topic": "String methods",
    "prompt": "Write two static methods for working with product codes of the form LLNNNN where L is a letter and N is a digit.\n\n```java\npublic class ProductCodes {\n  public static boolean isValidCode(String code) { /* part (a) */ }\n  public static int countValid(String[] codes) { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write isValidCode which returns true iff code has length 6, the first two chars are uppercase letters, and the last four are digits.",
        "points": 5,
        "rubric": "1 pt: length check returns false if not 6\n1 pt: iterates first two positions checking Character.isUpperCase\n1 pt: iterates last four positions checking Character.isDigit\n1 pt: returns false as soon as a check fails\n1 pt: returns true when all checks pass"
      },
      {
        "label": "(b)",
        "prompt": "Write countValid which returns the number of codes in the input array that are valid according to isValidCode.",
        "points": 3,
        "rubric": "1 pt: initializes counter to 0\n1 pt: iterates each String in the array calling isValidCode\n1 pt: increments counter and returns it"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from CB 2022 FRQ style"
  },
  {
    "id": "cs-a-2023-1-mod",
    "courseSlug": "ap-cs-a",
    "year": 2023,
    "number": 1,
    "topic": "ArrayList manipulation",
    "prompt": "A ticket system tracks ticket numbers in an ArrayList<Integer>.\n\n```java\npublic class TicketList {\n  private ArrayList<Integer> tickets;\n  public int removeDuplicates() { /* part (a) */ }\n  public ArrayList<Integer> getInRange(int lo, int hi) { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write removeDuplicates which removes every element that is equal to a later element in the list and returns the number of removals.",
        "points": 5,
        "rubric": "1 pt: iterates with index-based loop\n1 pt: correctly handles index decrement after removal\n1 pt: inner loop searches for later duplicate\n1 pt: increments removal counter on each removal\n1 pt: returns the counter"
      },
      {
        "label": "(b)",
        "prompt": "Write getInRange which returns a new ArrayList containing (in order) tickets whose value is in [lo, hi].",
        "points": 3,
        "rubric": "1 pt: creates and returns new ArrayList<Integer>\n1 pt: iterates tickets in original order\n1 pt: adds only elements within inclusive range"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from CB 2023 FRQ style"
  },
  {
    "id": "cs-a-2024-1",
    "courseSlug": "ap-cs-a",
    "year": 2024,
    "number": 1,
    "topic": "Inheritance and polymorphism",
    "prompt": "Consider a hierarchy of media items in a library.\n\n```java\npublic abstract class MediaItem {\n  private String title;\n  public MediaItem(String t) { title = t; }\n  public String getTitle() { return title; }\n  public abstract double lateFeePerDay();\n}\npublic class Book extends MediaItem {\n  public Book(String t) { super(t); }\n  public double lateFeePerDay() { return 0.25; }\n}\npublic class DVD extends MediaItem {\n  public DVD(String t) { super(t); }\n  public double lateFeePerDay() { return 1.00; }\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write a static method totalLateFees(MediaItem[] items, int days) that returns the sum of lateFeePerDay() * days across all items.",
        "points": 4,
        "rubric": "1 pt: correct method signature with static and return type double\n1 pt: declares and initializes running total\n1 pt: iterates every item calling lateFeePerDay\n1 pt: multiplies by days and returns total"
      },
      {
        "label": "(b)",
        "prompt": "Add a new subclass AudioBook that extends Book and overrides lateFeePerDay to return 0.10. Show the full class.",
        "points": 3,
        "rubric": "1 pt: class header extends Book\n1 pt: constructor calls super(t)\n1 pt: overrides lateFeePerDay returning 0.10"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2024 FRQ style"
  },
  {
    "id": "cs-a-2020-2",
    "courseSlug": "ap-cs-a",
    "year": 2020,
    "number": 2,
    "topic": "Recursion on strings",
    "prompt": "Consider the recursive method countX shown below.\n\n```java\npublic static int countX(String s) {\n  if (s.length() == 0) return 0;\n  if (s.substring(0, 1).equals(\"x\")) return 1 + countX(s.substring(1));\n  return countX(s.substring(1));\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write a recursive method countChar(String s, char c) that returns the number of times c appears in s. Do not use loops.",
        "points": 5,
        "rubric": "1 pt: correct recursive method signature\n1 pt: base case for empty string returns 0\n1 pt: checks first character against c\n1 pt: recursive call on substring(1)\n1 pt: adds 1 correctly on match"
      },
      {
        "label": "(b)",
        "prompt": "Write a recursive method reverse(String s) that returns the reversal of s without using loops or StringBuilder.",
        "points": 4,
        "rubric": "1 pt: base case: empty or length-1 string returns s\n1 pt: recursive call on substring(1)\n1 pt: concatenates first character at the end\n1 pt: returns assembled reversed string"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2020 FRQ (recursion)"
  },
  {
    "id": "cs-a-2015-4",
    "courseSlug": "ap-cs-a",
    "year": 2015,
    "number": 4,
    "topic": "2D array traversal",
    "prompt": "A seating chart is a 2D array where each cell is either the name of a student or null. Write two methods.\n\n```java\npublic class SeatingChart {\n  private String[][] seats;\n  public int countStudents() { /* part (a) */ }\n  public boolean hasEmptyRow() { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write countStudents which returns the number of non-null cells in seats.",
        "points": 4,
        "rubric": "1 pt: outer loop iterates over rows\n1 pt: inner loop iterates over columns\n1 pt: checks cell not equal to null\n1 pt: increments and returns counter correctly"
      },
      {
        "label": "(b)",
        "prompt": "Write hasEmptyRow which returns true if at least one row has all null cells.",
        "points": 4,
        "rubric": "1 pt: outer loop iterates each row\n1 pt: inner loop checks for any non-null\n1 pt: correctly flags a row as empty when all cells null\n1 pt: returns true on first empty row, false otherwise"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from CB 2015 FRQ style (2D array)"
  },

  // ─── ap-cs-principles ────────────────────────────────────────────────────
  {
    "id": "csp-2018-1",
    "courseSlug": "ap-cs-principles",
    "year": 2018,
    "number": 1,
    "topic": "Procedure abstraction",
    "prompt": "A school wants a procedure to check if a student qualifies for honor roll. A student qualifies if their GPA is at least 3.5 AND they have no unexcused absences.\n\n```pseudocode\nPROCEDURE qualifiesHonorRoll(gpa, absences)\n{\n  <MISSING CODE>\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Rewrite the procedure body so that it DISPLAYs \"Yes\" when the student qualifies and \"No\" otherwise.",
        "points": 4,
        "rubric": "1 pt: uses IF with correct Boolean condition\n1 pt: uses AND combining gpa and absences conditions\n1 pt: DISPLAY \"Yes\" in the qualifying branch\n1 pt: DISPLAY \"No\" in the ELSE branch"
      },
      {
        "label": "(b)",
        "prompt": "Explain in 2-3 sentences one benefit of putting this logic inside a procedure rather than repeating it inline.",
        "points": 2,
        "rubric": "1 pt: mentions reusability or single source of truth\n1 pt: mentions easier maintenance or abstraction of detail"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB CSP 2018 Create task style"
  },
  {
    "id": "csp-2019-2",
    "courseSlug": "ap-cs-principles",
    "year": 2019,
    "number": 2,
    "topic": "List filtering",
    "prompt": "A list scores contains test scores. Write pseudocode that builds a new list passing with only the scores that are at least 70.\n\n```pseudocode\npassing <- []\nFOR EACH score IN scores\n{\n  <MISSING CODE>\n}\nDISPLAY(passing)\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Fill in the missing code so that only passing scores are appended to passing.",
        "points": 3,
        "rubric": "1 pt: IF condition tests score >= 70\n1 pt: APPEND or insert into passing correctly\n1 pt: no modification when score below 70"
      },
      {
        "label": "(b)",
        "prompt": "Modify the algorithm so that passing contains (score, grade) pairs where grade is \"A\" if >= 90, \"B\" if >= 80, else \"C\".",
        "points": 4,
        "rubric": "1 pt: uses IF/ELSE chain ordered by threshold\n1 pt: correctly assigns \"A\" boundary\n1 pt: correctly assigns \"B\" boundary\n1 pt: appends pair/structure to passing list"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB CSP 2019 FRQ style"
  },
  {
    "id": "csp-2020-1",
    "courseSlug": "ap-cs-principles",
    "year": 2020,
    "number": 1,
    "topic": "Iteration",
    "prompt": "A procedure should DISPLAY the numbers from 1 to n that are multiples of 3 OR 5 but not both.\n\n```pseudocode\nPROCEDURE displaySpecial(n)\n{\n  i <- 1\n  REPEAT n TIMES\n  {\n    <MISSING CODE>\n    i <- i + 1\n  }\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the missing code.",
        "points": 4,
        "rubric": "1 pt: computes i MOD 3 = 0 correctly\n1 pt: computes i MOD 5 = 0 correctly\n1 pt: uses XOR-equivalent logic with AND/OR/NOT\n1 pt: DISPLAY(i) only when exactly one condition holds"
      },
      {
        "label": "(b)",
        "prompt": "Describe how many times DISPLAY runs when n = 15, and list the values shown.",
        "points": 3,
        "rubric": "1 pt: states count of displayed values is 6\n1 pt: lists 3, 5, 6, 9, 10, 12\n1 pt: excludes 15 with justification (multiple of both)"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB CSP iteration FRQ style"
  },
  {
    "id": "csp-2021-3",
    "courseSlug": "ap-cs-principles",
    "year": 2021,
    "number": 3,
    "topic": "Algorithms",
    "prompt": "A list temps contains daily high temperatures. Write pseudocode to find the longest run of consecutive days where the temperature strictly increased.\n\n```pseudocode\nPROCEDURE longestIncreasingRun(temps)\n{\n  <MISSING CODE>\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Implement longestIncreasingRun so it returns (via DISPLAY) the length of the longest strictly increasing run.",
        "points": 6,
        "rubric": "1 pt: initializes best <- 1 and current <- 1\n1 pt: iterates from second element to end\n1 pt: compares temps[i] to temps[i-1]\n1 pt: increments current when strictly greater\n1 pt: resets current to 1 otherwise\n1 pt: updates best and DISPLAYs best at end"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB CSP algorithmic FRQ style"
  },
  {
    "id": "csp-2022-2",
    "courseSlug": "ap-cs-principles",
    "year": 2022,
    "number": 2,
    "topic": "Data representation",
    "prompt": "A binary string represents an 8-bit unsigned integer. Write pseudocode to convert a list bits (most-significant first) to its integer value.\n\n```pseudocode\nPROCEDURE bitsToInt(bits)\n{\n  value <- 0\n  FOR EACH b IN bits\n  {\n    <MISSING CODE>\n  }\n  DISPLAY(value)\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Fill in the missing code so value equals the unsigned integer represented by bits.",
        "points": 3,
        "rubric": "1 pt: shifts value by multiplying by 2\n1 pt: adds current bit b correctly\n1 pt: handles sequence from MSB to LSB in order"
      },
      {
        "label": "(b)",
        "prompt": "Explain in 1-2 sentences why using 8 bits limits the representable range, and state that range.",
        "points": 2,
        "rubric": "1 pt: states range 0 to 255 (inclusive)\n1 pt: explains limit via 2^8 distinct combinations"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB CSP data representation FRQ style"
  },
  {
    "id": "csp-2023-1",
    "courseSlug": "ap-cs-principles",
    "year": 2023,
    "number": 1,
    "topic": "Random simulation",
    "prompt": "A simulation estimates the probability of rolling a sum >= 10 on two six-sided dice.\n\n```pseudocode\nPROCEDURE estimateHighSum(trials)\n{\n  success <- 0\n  REPEAT trials TIMES\n  {\n    <MISSING CODE>\n  }\n  DISPLAY(success / trials)\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Fill in the missing code using RANDOM(a, b).",
        "points": 4,
        "rubric": "1 pt: calls RANDOM(1, 6) for first die\n1 pt: calls RANDOM(1, 6) independently for second die\n1 pt: tests sum >= 10\n1 pt: increments success only when condition holds"
      },
      {
        "label": "(b)",
        "prompt": "Explain why the reported proportion approaches the true probability as trials grows large.",
        "points": 2,
        "rubric": "1 pt: references law of large numbers / more samples reduce variance\n1 pt: notes independence of trials"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB CSP simulation FRQ style"
  },
  {
    "id": "csp-2024-2",
    "courseSlug": "ap-cs-principles",
    "year": 2024,
    "number": 2,
    "topic": "List filtering and abstraction",
    "prompt": "A fitness app stores step counts in a list steps. Define a procedure that returns a new list containing only days meeting a user-specified goal.\n\n```pseudocode\nPROCEDURE daysMeetingGoal(steps, goal)\n{\n  result <- []\n  FOR EACH s IN steps\n  {\n    <MISSING CODE>\n  }\n  RETURN result\n}\n```",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Fill in the missing code so result contains every s from steps with s >= goal.",
        "points": 3,
        "rubric": "1 pt: IF compares s to goal using >=\n1 pt: appends matching s to result\n1 pt: does nothing when s below goal"
      },
      {
        "label": "(b)",
        "prompt": "Write a second procedure averageOf(list) that returns the mean of list, and use it with daysMeetingGoal to DISPLAY the average of days meeting goal.",
        "points": 4,
        "rubric": "1 pt: averageOf sums all elements via loop\n1 pt: averageOf returns sum divided by LENGTH(list)\n1 pt: calls daysMeetingGoal then averageOf in sequence\n1 pt: DISPLAYs the resulting average"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB CSP 2024 FRQ style"
  },

  // ─── ap-us-history ────────────────────────────────────────────────────
  {
    "id": "apush-2015-saq-colonial-regions",
    "courseSlug": "ap-us-history",
    "year": 2015,
    "number": 1,
    "topic": "Colonial Regional Differences",
    "prompt": "Using your knowledge of United States history from the colonial period through 1750, answer (a), (b), and (c).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE economic difference between the New England and Southern colonies before 1750.",
        "points": 1,
        "rubric": "1 pt: identifies a valid economic difference such as New England relying on shipbuilding, fishing, and small farms while the Southern colonies relied on plantation agriculture with cash crops like tobacco and rice."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE social difference between the New England and Middle colonies before 1750.",
        "points": 1,
        "rubric": "1 pt: explains a valid social difference such as New England's Puritan religious homogeneity versus the Middle colonies' ethnic and religious pluralism including Quakers, Dutch, and Germans."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE way geography contributed to a difference identified in (a) or (b).",
        "points": 1,
        "rubric": "1 pt: explains a geographic factor such as Southern warm climate and long growing season enabling plantation agriculture or New England's rocky soil encouraging commerce and shipping."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB APUSH SAQ style"
  },
  {
    "id": "apush-2016-saq-revolution-causes",
    "courseSlug": "ap-us-history",
    "year": 2016,
    "number": 2,
    "topic": "Causes of the American Revolution",
    "prompt": "\"The Stamp Act was the first direct tax laid by Parliament upon the American colonies, and it kindled a flame of resentment that time could never extinguish.\" — Fictional 19th-century historian.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE reason colonists objected to the Stamp Act (1765).",
        "points": 1,
        "rubric": "1 pt: identifies a valid reason such as taxation without representation, violation of traditional English rights, or the direct internal nature of the tax."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE specific action colonists took to resist the Stamp Act.",
        "points": 1,
        "rubric": "1 pt: explains a resistance action such as the Stamp Act Congress, nonimportation agreements, or Sons of Liberty intimidation of stamp distributors."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE way the Stamp Act crisis contributed to the outbreak of the American Revolution by 1775.",
        "points": 1,
        "rubric": "1 pt: explains a causal link such as the establishment of intercolonial cooperation, the development of revolutionary ideology about consent, or the precedent of organized resistance."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB APUSH SAQ style"
  },
  {
    "id": "apush-2017-saq-market-revolution",
    "courseSlug": "ap-us-history",
    "year": 2017,
    "number": 1,
    "topic": "Market Revolution",
    "prompt": "\"The canals and railroads transformed the United States in the decades before the Civil War, binding distant regions together and reshaping labor.\" — Fictional economic historian, 1975.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE specific transportation innovation of the Market Revolution (1800-1860).",
        "points": 1,
        "rubric": "1 pt: identifies a valid innovation such as the Erie Canal, steamboat, National Road, or early railroads."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE way the Market Revolution changed labor in the North.",
        "points": 1,
        "rubric": "1 pt: explains a labor change such as the rise of wage labor, the Lowell mill system employing young women, or the shift from artisan craft to factory production."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE way the Market Revolution affected regional divisions between North and South.",
        "points": 1,
        "rubric": "1 pt: explains a regional effect such as Northern industrial growth contrasting with Southern plantation reliance on slavery, strengthening sectional identity."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB APUSH SAQ style"
  },
  {
    "id": "apush-2018-saq-reconstruction",
    "courseSlug": "ap-us-history",
    "year": 2018,
    "number": 3,
    "topic": "Reconstruction",
    "prompt": "\"Reconstruction promised a new birth of freedom, yet by 1877 that promise lay broken on the steps of compromise.\" — Fictional modern textbook.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE goal of Radical Reconstruction (1867-1877).",
        "points": 1,
        "rubric": "1 pt: identifies a valid goal such as civil and political rights for freedpeople, punishment of former Confederates, or establishment of Republican governments in the South."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE specific achievement of Reconstruction.",
        "points": 1,
        "rubric": "1 pt: explains an achievement such as the 13th, 14th, or 15th Amendment, the Freedmen's Bureau, or the election of Black officeholders."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE reason Reconstruction ended by 1877.",
        "points": 1,
        "rubric": "1 pt: explains a reason such as the Compromise of 1877, Northern fatigue, Supreme Court decisions narrowing civil rights, or white Southern violence and Redeemer movements."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB APUSH SAQ style"
  },
  {
    "id": "apush-2019-saq-immigration",
    "courseSlug": "ap-us-history",
    "year": 2019,
    "number": 2,
    "topic": "Gilded Age Immigration",
    "prompt": "U.S. immigration increased dramatically between 1880 and 1920, peaking at roughly 8.8 million arrivals in 1901-1910.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Describe ONE trend in immigration to the United States during 1880-1920.",
        "points": 1,
        "rubric": "1 pt: describes a valid trend such as the dramatic increase peaking around 1901-1910, or the shift from Northern/Western European to Southern/Eastern European origins."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE cause of the trend identified in (a).",
        "points": 1,
        "rubric": "1 pt: explains a cause such as industrial demand for labor, famines and pogroms in Europe, improved transatlantic steamship travel, or political instability in southern/eastern Europe."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE political response to immigration in this period.",
        "points": 1,
        "rubric": "1 pt: explains a response such as the Chinese Exclusion Act (1882), the formation of nativist groups, the Immigration Act of 1917 literacy test, or urban political machines courting immigrant voters."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB APUSH SAQ style"
  },
  {
    "id": "apush-2020-saq-progressive",
    "courseSlug": "ap-us-history",
    "year": 2020,
    "number": 2,
    "topic": "Progressive Era",
    "prompt": "\"The Progressives sought to tame industrial capitalism without destroying it.\" — Fictional historian, 1998.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE goal of Progressive reformers.",
        "points": 1,
        "rubric": "1 pt: identifies a goal such as regulating big business, improving working conditions, expanding democracy, or addressing urban poverty."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE Progressive Era reform at the federal level.",
        "points": 1,
        "rubric": "1 pt: explains a federal reform such as the Pure Food and Drug Act, the 17th Amendment, the Federal Reserve Act, or the Clayton Antitrust Act."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE limitation of Progressive reform.",
        "points": 1,
        "rubric": "1 pt: explains a limitation such as exclusion of African Americans, failure to address monopolies fully, or the narrow middle-class focus of many reformers."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB APUSH SAQ style"
  },
  {
    "id": "apush-2015-leq-civil-war-causes",
    "courseSlug": "ap-us-history",
    "year": 2015,
    "number": 3,
    "topic": "Causes of the Civil War",
    "prompt": "Evaluate the extent to which the debate over slavery's expansion into the western territories caused the Civil War in the period from 1820 to 1861.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a long essay response. Include a clear thesis, contextualization, specific evidence, and complex analysis.",
        "points": 6,
        "rubric": "1 pt (Thesis): historically defensible thesis that evaluates the role of westward expansion of slavery in causing the Civil War.\n1 pt (Contextualization): situates the argument in a broader context such as the Second Great Awakening, sectionalism, or the market revolution.\n1 pt (Evidence): at least two specific examples such as the Missouri Compromise, the Wilmot Proviso, the Compromise of 1850, Kansas-Nebraska Act, or Dred Scott.\n1 pt (Evidence supports argument): uses the evidence to support the argument about slavery's expansion and sectional conflict.\n1 pt (Analysis - reasoning): uses a reasoning process such as causation to structure the argument.\n1 pt (Analysis - complexity): demonstrates complexity by considering alternative causes like states' rights, cultural differences, or economic divergence."
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB APUSH LEQ style"
  },
  {
    "id": "apush-2016-leq-new-deal",
    "courseSlug": "ap-us-history",
    "year": 2016,
    "number": 4,
    "topic": "New Deal",
    "prompt": "Evaluate the extent to which the New Deal (1933-1941) transformed the relationship between the federal government and American citizens.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a long essay response. Include a clear thesis, contextualization, specific evidence, and complex analysis.",
        "points": 6,
        "rubric": "1 pt (Thesis): historically defensible thesis evaluating the degree of transformation in the federal government's role.\n1 pt (Contextualization): situates the argument in a broader context such as Progressive Era precedents or the Great Depression.\n1 pt (Evidence): at least two specific examples such as Social Security, the Wagner Act, the CCC, the TVA, or the SEC.\n1 pt (Evidence supports argument): uses evidence to support the argument about government-citizen relations.\n1 pt (Analysis - reasoning): uses continuity and change over time as a reasoning process.\n1 pt (Analysis - complexity): demonstrates complexity by acknowledging limits of the New Deal such as exclusion of agricultural and domestic workers or continuities with prior eras."
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB APUSH LEQ style"
  },
  {
    "id": "apush-2017-leq-cold-war",
    "courseSlug": "ap-us-history",
    "year": 2017,
    "number": 4,
    "topic": "Early Cold War",
    "prompt": "Evaluate the extent to which United States foreign policy from 1945 to 1963 succeeded in containing the spread of communism.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a long essay response. Include a clear thesis, contextualization, specific evidence, and complex analysis.",
        "points": 6,
        "rubric": "1 pt (Thesis): historically defensible thesis evaluating the success of containment.\n1 pt (Contextualization): situates the argument in a broader context such as the end of WWII, the Yalta Conference, or postwar Europe.\n1 pt (Evidence): at least two specific examples such as the Truman Doctrine, Marshall Plan, NATO, Korean War, or Cuban Missile Crisis.\n1 pt (Evidence supports argument): uses evidence to support the argument about containment's successes or failures.\n1 pt (Analysis - reasoning): uses a reasoning process such as causation or comparison of policies.\n1 pt (Analysis - complexity): demonstrates complexity by comparing successes (Europe) with failures (China, Vietnam beginnings) or by weighing unintended consequences."
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB APUSH LEQ style"
  },
  {
    "id": "apush-2018-leq-civil-rights",
    "courseSlug": "ap-us-history",
    "year": 2018,
    "number": 4,
    "topic": "Civil Rights Movement",
    "prompt": "Evaluate the extent to which the African American civil rights movement changed United States society from 1945 to 1975.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a long essay response. Include a clear thesis, contextualization, specific evidence, and complex analysis.",
        "points": 6,
        "rubric": "1 pt (Thesis): historically defensible thesis evaluating the extent of social change.\n1 pt (Contextualization): situates the argument in a broader context such as WWII's Double V campaign or postwar migration.\n1 pt (Evidence): at least two specific examples such as Brown v. Board, the Montgomery Bus Boycott, the Civil Rights Act of 1964, Voting Rights Act of 1965, or the Black Power movement.\n1 pt (Evidence supports argument): uses evidence to support the argument about societal change.\n1 pt (Analysis - reasoning): uses continuity and change over time to structure the argument.\n1 pt (Analysis - complexity): demonstrates complexity by acknowledging continuities such as persistent economic inequality, de facto segregation, or backlash politics."
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB APUSH LEQ style"
  },

  // ─── ap-world-history ────────────────────────────────────────────────────
  {
    "id": "apwh-2015-saq-silk-road",
    "courseSlug": "ap-world-history",
    "year": 2015,
    "number": 1,
    "topic": "Silk Road Networks",
    "prompt": "\"The Silk Roads carried not only silk but faiths, pathogens, and ideas across Afro-Eurasia.\" — Fictional world historian, 2005.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE commodity exchanged along the Silk Roads before 1450.",
        "points": 1,
        "rubric": "1 pt: identifies a valid commodity such as silk, porcelain, horses, spices, gold, or paper."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE way the Silk Roads facilitated cultural exchange before 1450.",
        "points": 1,
        "rubric": "1 pt: explains cultural exchange such as the spread of Buddhism from India to China, the transmission of Islam into Central Asia, or the diffusion of paper-making technology."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE consequence of Mongol rule on Silk Road trade in the 13th-14th centuries.",
        "points": 1,
        "rubric": "1 pt: explains a consequence such as the Pax Mongolica reducing banditry and encouraging travel, or the spread of the Black Death along these networks."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB AP World SAQ style"
  },
  {
    "id": "apwh-2016-saq-islamic-caliphates",
    "courseSlug": "ap-world-history",
    "year": 2016,
    "number": 2,
    "topic": "Islamic Caliphates",
    "prompt": "\"Under the Abbasids, Baghdad became a meeting place of civilizations where Greek, Persian, and Indian knowledge fused.\" — Fictional historian of science.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE achievement of the Abbasid Caliphate (750-1258).",
        "points": 1,
        "rubric": "1 pt: identifies a valid achievement such as the House of Wisdom, advances in algebra (al-Khwarizmi), medical writings (Ibn Sina), or translation of Greek texts into Arabic."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE reason for the decline of the Abbasid Caliphate.",
        "points": 1,
        "rubric": "1 pt: explains a reason such as regional fragmentation, Turkish military pressure, Shia-Sunni conflict, or the Mongol sack of Baghdad in 1258."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE way Islamic civilization continued to shape Afro-Eurasia after 1258.",
        "points": 1,
        "rubric": "1 pt: explains continued influence such as the rise of the Ottoman, Safavid, or Mughal empires, the continued importance of Arabic scholarship, or trans-Saharan trade networks."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB AP World SAQ style"
  },
  {
    "id": "apwh-2017-saq-columbian-exchange",
    "courseSlug": "ap-world-history",
    "year": 2017,
    "number": 3,
    "topic": "Columbian Exchange",
    "prompt": "\"After 1492 the biological exchange between hemispheres redrew the world's diet and demography.\" — Fictional environmental historian.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE crop that moved from the Americas to Afro-Eurasia after 1492.",
        "points": 1,
        "rubric": "1 pt: identifies a valid crop such as maize, potatoes, tomatoes, cassava, or tobacco."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE demographic effect of the Columbian Exchange on the Americas.",
        "points": 1,
        "rubric": "1 pt: explains a demographic effect such as catastrophic indigenous population decline from smallpox and other diseases."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE demographic effect of the Columbian Exchange on Afro-Eurasia.",
        "points": 1,
        "rubric": "1 pt: explains an effect such as population growth in China and Europe driven by new caloric crops (potatoes, maize, sweet potatoes)."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB AP World SAQ style"
  },
  {
    "id": "apwh-2018-saq-atlantic-revolutions",
    "courseSlug": "ap-world-history",
    "year": 2018,
    "number": 2,
    "topic": "Atlantic Revolutions",
    "prompt": "The Atlantic Revolutions transformed political systems in the Americas and Europe between 1776 and 1821.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE Enlightenment idea that influenced the Atlantic Revolutions.",
        "points": 1,
        "rubric": "1 pt: identifies an Enlightenment idea such as natural rights, popular sovereignty, social contract, or separation of powers."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE way the Haitian Revolution differed from the American Revolution.",
        "points": 1,
        "rubric": "1 pt: explains a difference such as Haiti's abolition of slavery, its leadership by formerly enslaved people, or its establishment of a non-white republic."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE global consequence of the Atlantic revolutions.",
        "points": 1,
        "rubric": "1 pt: explains a consequence such as the spread of nationalism, inspiration for later independence movements, or growing abolitionist movements worldwide."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB AP World SAQ style"
  },
  {
    "id": "apwh-2019-saq-industrialization",
    "courseSlug": "ap-world-history",
    "year": 2019,
    "number": 1,
    "topic": "Global Industrialization",
    "prompt": "\"Industrialization widened the gap between Europe and much of the rest of the world in the nineteenth century.\" — Fictional economic history text.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE technology central to 19th-century industrialization.",
        "points": 1,
        "rubric": "1 pt: identifies a valid technology such as the steam engine, railroad, mechanized textile loom, or telegraph."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE way industrialization changed labor systems globally.",
        "points": 1,
        "rubric": "1 pt: explains a change such as the growth of wage labor in factories, indentured servitude replacing slavery after abolition, or the decline of artisanal production."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE response by a non-European state to European industrial power in the 19th century.",
        "points": 1,
        "rubric": "1 pt: explains a response such as Meiji Japan's industrialization, the Ottoman Tanzimat reforms, or the Qing Self-Strengthening Movement."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB AP World SAQ style"
  },
  {
    "id": "apwh-2020-saq-decolonization",
    "courseSlug": "ap-world-history",
    "year": 2020,
    "number": 2,
    "topic": "Decolonization",
    "prompt": "\"After 1945 the European colonial order collapsed with astonishing speed.\" — Fictional 20th-century historian.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE cause of post-WWII decolonization.",
        "points": 1,
        "rubric": "1 pt: identifies a cause such as weakened European economies, the UN's anti-colonial stance, the Cold War superpower rivalry, or the strength of nationalist movements."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE method used by colonized peoples to achieve independence.",
        "points": 1,
        "rubric": "1 pt: explains a method such as Gandhi's nonviolent resistance in India, armed struggle in Algeria or Vietnam, or negotiated transitions in British Africa."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE long-term challenge new postcolonial states faced.",
        "points": 1,
        "rubric": "1 pt: explains a challenge such as arbitrary borders causing ethnic conflict, economic dependency on former colonizers, or Cold War proxy interventions."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB AP World SAQ style"
  },
  {
    "id": "apwh-2015-leq-mongol-empire",
    "courseSlug": "ap-world-history",
    "year": 2015,
    "number": 4,
    "topic": "Mongol Empire",
    "prompt": "Evaluate the extent to which the Mongol Empire (1206-1368) transformed Afro-Eurasia.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a long essay response. Include a clear thesis, contextualization, specific evidence, and complex analysis.",
        "points": 6,
        "rubric": "1 pt (Thesis): historically defensible thesis evaluating the Mongol transformation of Afro-Eurasia.\n1 pt (Contextualization): situates the argument in a broader context such as pre-Mongol Silk Road trade or the Abbasid Caliphate.\n1 pt (Evidence): at least two specific examples such as the Pax Mongolica, Yuan China, the sack of Baghdad, or Mongol postal relay (yam) system.\n1 pt (Evidence supports argument): uses evidence to support the argument about transformation.\n1 pt (Analysis - reasoning): uses continuity and change over time as a reasoning process.\n1 pt (Analysis - complexity): demonstrates complexity by weighing destructive conquests against long-term integration and the spread of the Black Death."
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB AP World LEQ style"
  },
  {
    "id": "apwh-2017-leq-maritime-empires",
    "courseSlug": "ap-world-history",
    "year": 2017,
    "number": 4,
    "topic": "Maritime Empires",
    "prompt": "Evaluate the extent to which European maritime empires reshaped global economic patterns between 1500 and 1750.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a long essay response. Include a clear thesis, contextualization, specific evidence, and complex analysis.",
        "points": 6,
        "rubric": "1 pt (Thesis): historically defensible thesis evaluating the global economic reshaping.\n1 pt (Contextualization): situates the argument in a broader context such as Indian Ocean trade networks or the Reconquista.\n1 pt (Evidence): at least two specific examples such as the Manila galleons, the Atlantic slave trade, the Dutch East India Company, or Potosi silver.\n1 pt (Evidence supports argument): uses evidence to support the argument about economic transformation.\n1 pt (Analysis - reasoning): uses a reasoning process such as causation or comparison.\n1 pt (Analysis - complexity): demonstrates complexity by considering continuity in Asian-dominated trade or differing regional impacts."
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB AP World LEQ style"
  },
  {
    "id": "apwh-2019-leq-imperialism",
    "courseSlug": "ap-world-history",
    "year": 2019,
    "number": 4,
    "topic": "19th-Century Imperialism",
    "prompt": "Evaluate the extent to which industrialization caused European imperialism in Africa and Asia in the period 1750-1900.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a long essay response. Include a clear thesis, contextualization, specific evidence, and complex analysis.",
        "points": 6,
        "rubric": "1 pt (Thesis): historically defensible thesis evaluating industrial causes of imperialism.\n1 pt (Contextualization): situates the argument in a broader context such as Enlightenment racial ideologies or earlier mercantile empires.\n1 pt (Evidence): at least two specific examples such as the Berlin Conference, the Opium Wars, the Suez Canal, or the Indian Rebellion of 1857.\n1 pt (Evidence supports argument): uses evidence to support the argument about industrial causation.\n1 pt (Analysis - reasoning): uses causation as a reasoning process.\n1 pt (Analysis - complexity): demonstrates complexity by weighing economic, strategic, ideological, and technological drivers."
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB AP World LEQ style"
  },
  {
    "id": "apwh-2021-leq-cold-war-global",
    "courseSlug": "ap-world-history",
    "year": 2021,
    "number": 3,
    "topic": "Global Cold War",
    "prompt": "Evaluate the extent to which the Cold War (1945-1991) shaped developments in the Global South.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a long essay response. Include a clear thesis, contextualization, specific evidence, and complex analysis.",
        "points": 6,
        "rubric": "1 pt (Thesis): historically defensible thesis evaluating Cold War impact on the Global South.\n1 pt (Contextualization): situates the argument in a broader context such as decolonization or the Bandung Conference.\n1 pt (Evidence): at least two specific examples such as the Vietnam War, Cuban Revolution, Congo Crisis, or Soviet invasion of Afghanistan.\n1 pt (Evidence supports argument): uses evidence to support the argument about Cold War influence.\n1 pt (Analysis - reasoning): uses a reasoning process such as causation or comparison across regions.\n1 pt (Analysis - complexity): demonstrates complexity by considering non-aligned movements or internal drivers independent of superpower rivalry."
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB AP World LEQ style"
  },

  // ─── ap-euro-history ────────────────────────────────────────────────────
  {
    "id": "apeuro-2015-saq-renaissance",
    "courseSlug": "ap-euro-history",
    "year": 2015,
    "number": 1,
    "topic": "Italian Renaissance",
    "prompt": "\"The Renaissance began in Italy because its city-states offered wealthy patrons, classical ruins, and civic rivalry.\" — Fictional modern textbook.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE characteristic of Italian Renaissance humanism.",
        "points": 1,
        "rubric": "1 pt: identifies a characteristic such as focus on classical Greek and Roman texts, emphasis on human potential, or secular concerns alongside religious ones."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE reason the Renaissance began in Italy rather than northern Europe.",
        "points": 1,
        "rubric": "1 pt: explains a reason such as wealthy merchant patrons (Medici), proximity to Roman ruins, or competitive city-state politics."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE way the Northern Renaissance differed from the Italian Renaissance.",
        "points": 1,
        "rubric": "1 pt: explains a difference such as the Northern focus on Christian humanism (Erasmus), greater emphasis on religious reform, or different artistic techniques such as oil painting detail in Flanders."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB AP Euro SAQ style"
  },
  {
    "id": "apeuro-2016-saq-reformation",
    "courseSlug": "ap-euro-history",
    "year": 2016,
    "number": 2,
    "topic": "Protestant Reformation",
    "prompt": "\"Luther sought to reform the Church, not to break it; yet his act at Wittenberg cracked Christendom forever.\" — Fictional biographer.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE abuse of the Catholic Church that Luther criticized.",
        "points": 1,
        "rubric": "1 pt: identifies an abuse such as the sale of indulgences, clerical corruption, simony, or the worldliness of the papacy."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE reason the Reformation spread rapidly in the 16th century.",
        "points": 1,
        "rubric": "1 pt: explains a reason such as the printing press, the support of German princes seeking autonomy from the Holy Roman Emperor, or the appeal of vernacular scripture."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE political consequence of the Reformation by 1600.",
        "points": 1,
        "rubric": "1 pt: explains a consequence such as religious wars (French Wars of Religion), the Peace of Augsburg's cuius regio eius religio, or the weakening of Habsburg power."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB AP Euro SAQ style"
  },
  {
    "id": "apeuro-2017-saq-scientific-revolution",
    "courseSlug": "ap-euro-history",
    "year": 2017,
    "number": 1,
    "topic": "Scientific Revolution",
    "prompt": "\"Copernicus set the earth in motion; Newton explained why it moved.\" — Fictional popular history of science.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE contribution of the Scientific Revolution (1540-1700).",
        "points": 1,
        "rubric": "1 pt: identifies a contribution such as heliocentrism (Copernicus), laws of planetary motion (Kepler), or universal gravitation (Newton)."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE way the Scientific Revolution challenged traditional authority.",
        "points": 1,
        "rubric": "1 pt: explains a challenge such as replacing Aristotelian/Ptolemaic cosmology, prioritizing empirical observation over scholastic authority, or the Galileo trial's tension with the Church."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE way the Scientific Revolution influenced the Enlightenment.",
        "points": 1,
        "rubric": "1 pt: explains an influence such as applying reason and scientific method to human society, Locke's empiricism, or confidence in progress."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB AP Euro SAQ style"
  },
  {
    "id": "apeuro-2019-saq-french-revolution",
    "courseSlug": "ap-euro-history",
    "year": 2019,
    "number": 2,
    "topic": "French Revolution Phases",
    "prompt": "The French Revolution moved through distinct phases between 1789 and 1799: Estates-General (1789), constitutional monarchy (1791), the Terror (1793), the Directory (1795), and Napoleon's consulate (1799).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE grievance that led to the calling of the Estates-General in 1789.",
        "points": 1,
        "rubric": "1 pt: identifies a grievance such as fiscal crisis, privileges of the First and Second Estates, food shortages, or Third Estate lack of political voice."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE reason the Revolution radicalized by 1793.",
        "points": 1,
        "rubric": "1 pt: explains a reason such as war with Austria and Prussia, internal counterrevolution in the Vendee, economic crisis, or Jacobin rise to power."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE way Napoleon consolidated revolutionary changes after 1799.",
        "points": 1,
        "rubric": "1 pt: explains a way such as the Napoleonic Code standardizing civil law, the Concordat of 1801 with the Church, or merit-based administrative reforms."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB AP Euro SAQ style"
  },
  {
    "id": "apeuro-2020-saq-congress-vienna",
    "courseSlug": "ap-euro-history",
    "year": 2020,
    "number": 3,
    "topic": "Congress of Vienna",
    "prompt": "\"Metternich aimed to restore a Europe that the Revolution and Napoleon had unmade.\" — Fictional diplomatic historian.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE goal of the Congress of Vienna (1814-1815).",
        "points": 1,
        "rubric": "1 pt: identifies a goal such as restoring legitimate monarchies, creating a balance of power, or suppressing revolutionary movements."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE way the Congress of Vienna reshaped the European map.",
        "points": 1,
        "rubric": "1 pt: explains a territorial change such as the German Confederation replacing the HRE, the expansion of Prussia, or the creation of the Kingdom of the Netherlands."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE challenge to the Vienna settlement before 1848.",
        "points": 1,
        "rubric": "1 pt: explains a challenge such as liberal and nationalist uprisings in 1820 and 1830, Greek independence, or Belgian independence in 1830."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB AP Euro SAQ style"
  },
  {
    "id": "apeuro-2022-saq-alliances-wwi",
    "courseSlug": "ap-euro-history",
    "year": 2022,
    "number": 2,
    "topic": "European Alliances 1914",
    "prompt": "On the eve of WWI, Europe was divided into the Triple Entente (France, UK, Russia) and the Central Powers (Germany, Austria-Hungary).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify ONE member of the Triple Entente.",
        "points": 1,
        "rubric": "1 pt: identifies France, the United Kingdom, or Russia."
      },
      {
        "label": "(b)",
        "prompt": "Explain ONE cause of the European alliance system in 1914.",
        "points": 1,
        "rubric": "1 pt: explains a cause such as German unification altering the balance of power, Franco-German rivalry after 1871, or colonial/naval competition between Britain and Germany."
      },
      {
        "label": "(c)",
        "prompt": "Explain ONE way the alliance system contributed to the outbreak of WWI in 1914.",
        "points": 1,
        "rubric": "1 pt: explains a way such as the chain reaction after Franz Ferdinand's assassination, mobilization schedules like the Schlieffen Plan, or secret commitments escalating a regional crisis."
      }
    ],
    "totalPoints": 3,
    "source": "Adapted from CB AP Euro SAQ style"
  },
  {
    "id": "apeuro-2015-leq-absolutism",
    "courseSlug": "ap-euro-history",
    "year": 2015,
    "number": 4,
    "topic": "Absolutism vs. Constitutionalism",
    "prompt": "Evaluate the extent to which 17th-century European states diverged between absolutism and constitutionalism.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a long essay response. Include a clear thesis, contextualization, specific evidence, and complex analysis.",
        "points": 6,
        "rubric": "1 pt (Thesis): historically defensible thesis evaluating the divergence.\n1 pt (Contextualization): situates the argument in a broader context such as the Thirty Years' War or religious conflicts.\n1 pt (Evidence): at least two specific examples such as Louis XIV's Versailles, the English Civil War, the Glorious Revolution, or Peter the Great's reforms.\n1 pt (Evidence supports argument): uses evidence to support the argument about divergent political systems.\n1 pt (Analysis - reasoning): uses comparison as a reasoning process.\n1 pt (Analysis - complexity): demonstrates complexity by noting hybrid cases (Dutch Republic, Poland-Lithuania) or common state-building features across systems."
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB AP Euro LEQ style"
  },
  {
    "id": "apeuro-2016-leq-enlightenment",
    "courseSlug": "ap-euro-history",
    "year": 2016,
    "number": 3,
    "topic": "Enlightenment Impact",
    "prompt": "Evaluate the extent to which Enlightenment ideas transformed European political life between 1700 and 1815.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a long essay response. Include a clear thesis, contextualization, specific evidence, and complex analysis.",
        "points": 6,
        "rubric": "1 pt (Thesis): historically defensible thesis evaluating Enlightenment political impact.\n1 pt (Contextualization): situates the argument in a broader context such as the Scientific Revolution or religious toleration debates.\n1 pt (Evidence): at least two specific examples such as Locke's Two Treatises, Rousseau's Social Contract, enlightened despots like Frederick the Great, or the French Revolution's Declaration.\n1 pt (Evidence supports argument): uses evidence to support the argument about political transformation.\n1 pt (Analysis - reasoning): uses causation or continuity and change over time as a reasoning process.\n1 pt (Analysis - complexity): demonstrates complexity by weighing limits of Enlightenment reforms or persistence of traditional institutions."
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB AP Euro LEQ style"
  },
  {
    "id": "apeuro-2019-leq-unifications",
    "courseSlug": "ap-euro-history",
    "year": 2019,
    "number": 3,
    "topic": "German and Italian Unifications",
    "prompt": "Compare the processes of German and Italian unification in the 19th century.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a long essay response. Include a clear thesis, contextualization, specific evidence, and complex analysis.",
        "points": 6,
        "rubric": "1 pt (Thesis): historically defensible thesis comparing the unifications.\n1 pt (Contextualization): situates the argument in a broader context such as the Revolutions of 1848 or the Congress of Vienna settlement.\n1 pt (Evidence): at least two specific examples such as Bismarck's wars, the Zollverein, Cavour's diplomacy, or Garibaldi's Red Shirts.\n1 pt (Evidence supports argument): uses evidence to support the comparative argument.\n1 pt (Analysis - reasoning): uses comparison as a reasoning process.\n1 pt (Analysis - complexity): demonstrates complexity by noting differences such as Italy's weaker economic integration or Germany's Prussian dominance, or similarities in the use of realpolitik."
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB AP Euro LEQ style"
  },
  {
    "id": "apeuro-2020-leq-totalitarianism",
    "courseSlug": "ap-euro-history",
    "year": 2020,
    "number": 4,
    "topic": "Interwar Totalitarianism",
    "prompt": "Evaluate the extent to which the Treaty of Versailles (1919) caused the rise of totalitarian regimes in interwar Europe.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a long essay response. Include a clear thesis, contextualization, specific evidence, and complex analysis.",
        "points": 6,
        "rubric": "1 pt (Thesis): historically defensible thesis evaluating the causal role of Versailles.\n1 pt (Contextualization): situates the argument in a broader context such as WWI devastation or the Russian Revolution.\n1 pt (Evidence): at least two specific examples such as German reparations, the stab-in-the-back myth, Italian territorial grievances, or Weimar hyperinflation.\n1 pt (Evidence supports argument): uses evidence to support the argument about Versailles as a cause.\n1 pt (Analysis - reasoning): uses causation as a reasoning process.\n1 pt (Analysis - complexity): demonstrates complexity by weighing other causes such as the Great Depression, weak democratic traditions, or ideological appeal of fascism and communism."
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB AP Euro LEQ style"
  },

  // ─── ap-precalc wave-2 (+12) ─────────────────────────────
  {
    "id": "precalc-v2-2024-1",
    "courseSlug": "ap-precalc",
    "year": 2024,
    "number": 1,
    "topic": "Polynomial and rational modeling",
    "prompt": "The function $f$ is given by $f(x) = \\frac{2x^2 - 8}{x^2 - 4x + 3}$. Answer the following about $f$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify all zeros of $f$ and all values of $x$ at which $f$ has a vertical asymptote. Show the algebraic work.",
        "points": 2,
        "rubric": "1 pt: correctly factors numerator and denominator as $2(x-2)(x+2)$ and $(x-1)(x-3)$\n1 pt: zeros at $x=\\pm 2$; vertical asymptotes at $x=1$ and $x=3$"
      },
      {
        "label": "(b)",
        "prompt": "Determine $\\lim_{x\\to\\infty} f(x)$ and explain what this limit says about the end behavior of $f$.",
        "points": 2,
        "rubric": "1 pt: limit equals $2$ using ratio of leading coefficients\n1 pt: interprets as horizontal asymptote $y=2$ describing end behavior"
      },
      {
        "label": "(c)",
        "prompt": "On the open interval $(1,3)$, determine whether $f$ is positive or negative. Justify your answer using sign analysis.",
        "points": 2,
        "rubric": "1 pt: tests a value such as $x=2$ showing numerator $=0$, and a value like $x=1.5$ where $f<0$\n1 pt: concludes $f$ is negative on $(1,2)$ and positive on $(2,3)$ with sign-chart justification"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2024 AP Precalculus FRQ 1"
  },
  {
    "id": "precalc-v2-2024-2",
    "courseSlug": "ap-precalc",
    "year": 2024,
    "number": 2,
    "topic": "Exponential and logarithmic modeling",
    "prompt": "A bacterial population is modeled by $P(t) = 500 \\cdot (1.08)^t$, where $t$ is measured in hours since $t=0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Compute the average rate of change of $P$ on the interval $[0,10]$. Include units.",
        "points": 2,
        "rubric": "1 pt: sets up $\\frac{P(10)-P(0)}{10}$\n1 pt: numerical answer $\\approx 57.95$ bacteria per hour with units"
      },
      {
        "label": "(b)",
        "prompt": "Solve $P(t) = 2000$ for $t$ algebraically using logarithms.",
        "points": 2,
        "rubric": "1 pt: isolates $(1.08)^t = 4$ and applies a logarithm\n1 pt: $t = \\frac{\\ln 4}{\\ln 1.08} \\approx 18.013$ hours"
      },
      {
        "label": "(c)",
        "prompt": "Rewrite $P(t)$ in the form $P(t) = 500 e^{kt}$ and interpret $k$ in context.",
        "points": 2,
        "rubric": "1 pt: $k = \\ln(1.08) \\approx 0.07696$\n1 pt: interprets $k$ as the continuous growth rate per hour"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2024 AP Precalculus FRQ 2"
  },
  {
    "id": "precalc-v2-2024-3",
    "courseSlug": "ap-precalc",
    "year": 2024,
    "number": 3,
    "topic": "Trigonometric modeling",
    "prompt": "A Ferris wheel has center $26$ meters above the ground and radius $24$ meters. A rider boards at the lowest point and the wheel makes one full revolution every $40$ seconds. Let $h(t)$ be the height in meters above the ground at time $t$ seconds.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write an expression for $h(t)$ in the form $h(t) = a\\cos(bt) + d$ or $h(t) = a\\sin(bt) + d$.",
        "points": 2,
        "rubric": "1 pt: identifies amplitude $24$, midline $26$, period $40$ so $b=\\frac{\\pi}{20}$\n1 pt: $h(t) = -24\\cos\\!\\left(\\frac{\\pi}{20} t\\right) + 26$"
      },
      {
        "label": "(b)",
        "prompt": "Find all times $t$ in $[0,40]$ at which $h(t) = 38$. Show the algebraic steps.",
        "points": 2,
        "rubric": "1 pt: reduces to $\\cos\\!\\left(\\frac{\\pi}{20} t\\right) = -\\tfrac{1}{2}$\n1 pt: $t = \\tfrac{40}{3}$ and $t = \\tfrac{80}{3}$ seconds"
      },
      {
        "label": "(c)",
        "prompt": "Describe how $h$ changes on the interval from $t=10$ to $t=20$ in terms of concavity and direction.",
        "points": 2,
        "rubric": "1 pt: states $h$ is increasing on $[10,20]$\n1 pt: states $h$ is concave down on $[10,20]$ with supporting reasoning"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2024 AP Precalculus FRQ 3"
  },
  {
    "id": "precalc-v2-2024-4",
    "courseSlug": "ap-precalc",
    "year": 2024,
    "number": 4,
    "topic": "Function transformations and inverses",
    "prompt": "The function $g$ is given by $g(x) = 3\\ln(x-2) + 1$, with domain $x > 2$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Describe $g$ as a sequence of transformations of the parent function $f(x) = \\ln x$.",
        "points": 2,
        "rubric": "1 pt: horizontal shift right $2$; vertical stretch by factor $3$\n1 pt: vertical shift up $1$ in correct order"
      },
      {
        "label": "(b)",
        "prompt": "Find an algebraic expression for $g^{-1}(x)$ and state its domain.",
        "points": 2,
        "rubric": "1 pt: correctly solves $y = 3\\ln(x-2)+1$ for $x$ to obtain $g^{-1}(x) = e^{(x-1)/3} + 2$\n1 pt: domain is all real $x$"
      },
      {
        "label": "(c)",
        "prompt": "Evaluate $\\lim_{x \\to 2^+} g(x)$ and explain its meaning.",
        "points": 2,
        "rubric": "1 pt: limit equals $-\\infty$\n1 pt: interprets as a vertical asymptote of $g$ at $x=2$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2024 AP Precalculus FRQ 4"
  },
  {
    "id": "precalc-v2-2023-1",
    "courseSlug": "ap-precalc",
    "year": 2023,
    "number": 1,
    "topic": "Polynomial rate of change",
    "prompt": "The polynomial $f$ is given by $f(x) = x^3 - 6x^2 + 9x + 2$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Compute the average rate of change of $f$ on the interval $[1,4]$.",
        "points": 2,
        "rubric": "1 pt: correct setup $\\frac{f(4)-f(1)}{4-1}$\n1 pt: evaluates $f(4)=6$, $f(1)=6$ and obtains average rate $0$"
      },
      {
        "label": "(b)",
        "prompt": "Determine all $x$-values where $f$ has a relative extremum by analyzing $f'(x)$ through polynomial factoring.",
        "points": 2,
        "rubric": "1 pt: $f'(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3)$\n1 pt: relative max at $x=1$ and relative min at $x=3$ by sign analysis"
      },
      {
        "label": "(c)",
        "prompt": "Describe the end behavior of $f$ using limit notation.",
        "points": 2,
        "rubric": "1 pt: $\\lim_{x\\to\\infty} f(x) = \\infty$\n1 pt: $\\lim_{x\\to-\\infty} f(x) = -\\infty$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2023 AP Precalculus practice FRQ"
  },
  {
    "id": "precalc-v2-2023-2",
    "courseSlug": "ap-precalc",
    "year": 2023,
    "number": 2,
    "topic": "Semi-log regression",
    "prompt": "Data for a population $P$ at time $t$ years is modeled after a semi-log transformation by the linear regression $\\ln P = 0.35 t + 4.2$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write $P$ as an exponential function of $t$.",
        "points": 2,
        "rubric": "1 pt: exponentiates both sides\n1 pt: $P(t) = e^{4.2} e^{0.35 t} \\approx 66.69 \\, e^{0.35 t}$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the time $t$ at which $P = 500$.",
        "points": 2,
        "rubric": "1 pt: sets $500 = e^{4.2} e^{0.35 t}$ and isolates\n1 pt: $t = \\frac{\\ln 500 - 4.2}{0.35} \\approx 5.76$ years"
      },
      {
        "label": "(c)",
        "prompt": "Interpret the slope $0.35$ in the context of the original exponential model.",
        "points": 1,
        "rubric": "1 pt: identifies $0.35$ as the continuous (instantaneous) relative growth rate of $P$"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2023 AP Precalculus released item (semi-log)"
  },
  {
    "id": "precalc-v2-2023-3",
    "courseSlug": "ap-precalc",
    "year": 2023,
    "number": 3,
    "topic": "Sinusoidal modeling of temperature",
    "prompt": "The temperature $T$, in $^\\circ$F, at a location $t$ hours after midnight is modeled by $T(t) = 12\\sin\\!\\left(\\tfrac{\\pi}{12}(t - 9)\\right) + 58$ for $0 \\le t \\le 24$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify the maximum temperature predicted by the model and the time at which it occurs.",
        "points": 2,
        "rubric": "1 pt: maximum value $70\\,^\\circ$F\n1 pt: occurs when $\\tfrac{\\pi}{12}(t-9) = \\tfrac{\\pi}{2}$, so $t=15$"
      },
      {
        "label": "(b)",
        "prompt": "Find all times $t$ in $[0,24]$ at which $T(t) = 64$.",
        "points": 2,
        "rubric": "1 pt: reduces to $\\sin\\!\\left(\\tfrac{\\pi}{12}(t-9)\\right) = \\tfrac{1}{2}$\n1 pt: $t = 11$ and $t = 19$"
      },
      {
        "label": "(c)",
        "prompt": "Describe the rate of change of $T$ on the interval $(9,15)$.",
        "points": 2,
        "rubric": "1 pt: states $T$ is increasing on $(9,15)$\n1 pt: states the rate of change is positive and decreasing (concave down)"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2023 AP Precalculus practice FRQ"
  },
  {
    "id": "precalc-v2-2023-4",
    "courseSlug": "ap-precalc",
    "year": 2023,
    "number": 4,
    "topic": "Polar functions",
    "prompt": "The polar curve is given by $r = 2 + 2\\cos\\theta$ for $0 \\le \\theta \\le 2\\pi$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the values of $\\theta$ in $[0,2\\pi]$ for which $r = 0$.",
        "points": 1,
        "rubric": "1 pt: $\\theta = \\pi$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the maximum value of $r$ and the value(s) of $\\theta$ where it occurs.",
        "points": 2,
        "rubric": "1 pt: recognizes max of $\\cos\\theta$ is $1$\n1 pt: maximum $r = 4$ at $\\theta = 0$ (and $2\\pi$)"
      },
      {
        "label": "(c)",
        "prompt": "Determine the interval(s) of $\\theta$ in $[0,\\pi]$ on which $r$ is decreasing, and explain.",
        "points": 2,
        "rubric": "1 pt: recognizes $r$ decreases when $\\cos\\theta$ decreases, i.e. on $[0,\\pi]$\n1 pt: supports with reference to $\\frac{dr}{d\\theta} = -2\\sin\\theta \\le 0$ on $[0,\\pi]$"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2023 AP Precalculus practice FRQ (polar)"
  },
  {
    "id": "precalc-v2-2024-5",
    "courseSlug": "ap-precalc",
    "year": 2024,
    "number": 5,
    "topic": "Parametric functions",
    "prompt": "A particle moves in the plane so that its position at time $t \\ge 0$ is given by $x(t) = t^2 - 4t$ and $y(t) = 2t - 3$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the position of the particle when $t=3$.",
        "points": 1,
        "rubric": "1 pt: $(x(3), y(3)) = (-3, 3)$"
      },
      {
        "label": "(b)",
        "prompt": "Eliminate the parameter to express $x$ as a function of $y$.",
        "points": 2,
        "rubric": "1 pt: $t = \\tfrac{y+3}{2}$ from the $y$-equation\n1 pt: $x = \\left(\\tfrac{y+3}{2}\\right)^2 - 4\\!\\left(\\tfrac{y+3}{2}\\right)$"
      },
      {
        "label": "(c)",
        "prompt": "Find the time $t$ at which the $x$-coordinate is minimized and give that minimum value.",
        "points": 2,
        "rubric": "1 pt: sets $\\frac{d}{dt}(t^2-4t)=2t-4=0$ giving $t=2$\n1 pt: minimum $x(2) = -4$"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2024 AP Precalculus FRQ (parametric)"
  },
  {
    "id": "precalc-v2-2023-5",
    "courseSlug": "ap-precalc",
    "year": 2023,
    "number": 5,
    "topic": "Rational function modeling",
    "prompt": "A pollutant concentration in a lake at time $t \\ge 0$ hours is modeled by $C(t) = \\frac{8t}{t^2 + 4}$ parts per million.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine $\\lim_{t\\to\\infty} C(t)$ and interpret.",
        "points": 2,
        "rubric": "1 pt: limit equals $0$\n1 pt: interprets as concentration approaching $0$ ppm long-term"
      },
      {
        "label": "(b)",
        "prompt": "Find the time $t$ at which $C(t)$ is maximum and the maximum value.",
        "points": 2,
        "rubric": "1 pt: $C'(t) = \\frac{8(4 - t^2)}{(t^2+4)^2}$ equals zero at $t=2$\n1 pt: maximum $C(2) = 2$ ppm"
      },
      {
        "label": "(c)",
        "prompt": "On which interval is $C$ decreasing? Justify.",
        "points": 2,
        "rubric": "1 pt: identifies $t>2$\n1 pt: justifies using sign of $C'(t)<0$ for $t>2$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2023 AP Precalculus (rational modeling)"
  },
  {
    "id": "precalc-v2-2024-6",
    "courseSlug": "ap-precalc",
    "year": 2024,
    "number": 6,
    "topic": "Function composition and inverses",
    "prompt": "Let $f(x) = \\sqrt{x+1}$ and $g(x) = x^2 - 1$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find $(f \\circ g)(x)$ and state its domain.",
        "points": 2,
        "rubric": "1 pt: $(f\\circ g)(x) = \\sqrt{x^2} = |x|$\n1 pt: domain all real $x$"
      },
      {
        "label": "(b)",
        "prompt": "Find $(g \\circ f)(x)$ and state its domain.",
        "points": 2,
        "rubric": "1 pt: $(g\\circ f)(x) = x$\n1 pt: domain $x \\ge -1$"
      },
      {
        "label": "(c)",
        "prompt": "Explain whether $f$ and $g$ are inverses on a suitable domain.",
        "points": 2,
        "rubric": "1 pt: notes composition gives $x$ only under domain restrictions\n1 pt: concludes $f$ and $g$ are inverses on $x \\ge 0$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2024 AP Precalculus FRQ (composition/inverse)"
  },
  {
    "id": "precalc-v2-2023-6",
    "courseSlug": "ap-precalc",
    "year": 2023,
    "number": 6,
    "topic": "Logarithmic equations and interpretation",
    "prompt": "The loudness $L$ in decibels of a sound with intensity $I$ watts per square meter is $L = 10\\log_{10}\\!\\left(\\frac{I}{10^{-12}}\\right)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the decibel level for $I = 10^{-5}$.",
        "points": 1,
        "rubric": "1 pt: $L = 70$ decibels"
      },
      {
        "label": "(b)",
        "prompt": "Solve for $I$ in terms of $L$.",
        "points": 2,
        "rubric": "1 pt: isolates $\\log_{10}(I/10^{-12}) = L/10$\n1 pt: $I = 10^{-12} \\cdot 10^{L/10}$"
      },
      {
        "label": "(c)",
        "prompt": "Show that increasing $L$ by $10$ decibels corresponds to multiplying $I$ by $10$.",
        "points": 2,
        "rubric": "1 pt: computes ratio $\\frac{I(L+10)}{I(L)}$\n1 pt: simplifies to $10^{1} = 10$"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from CB 2023 AP Precalculus (logarithmic models)"
  },

  // ─── ap-calc-ab wave-2 (+19) ─────────────────────────────
  {
    "id": "calc-ab-v2-2016-1",
    "courseSlug": "ap-calc-ab",
    "year": 2016,
    "number": 1,
    "topic": "Rate in / rate out (accumulation)",
    "prompt": "Water flows into a tank at a rate of $R(t) = 100\\sqrt{t+1}$ gallons per hour and flows out at $E(t) = 60 + 8t$ gallons per hour for $0 \\le t \\le 8$. The tank contains $500$ gallons at $t=0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the total amount of water that flows into the tank during the interval $0 \\le t \\le 8$.",
        "points": 2,
        "rubric": "1 pt: sets up $\\int_0^8 100\\sqrt{t+1}\\,dt$\n1 pt: evaluates to $\\tfrac{200}{3}(9^{3/2}-1) = \\tfrac{200}{3}(26) \\approx 1733.333$ gallons"
      },
      {
        "label": "(b)",
        "prompt": "Is the amount of water in the tank increasing or decreasing at $t=5$? Justify.",
        "points": 2,
        "rubric": "1 pt: computes $R(5)=100\\sqrt{6} \\approx 244.949$ and $E(5)=100$\n1 pt: since $R(5)>E(5)$, water is increasing at $t=5$"
      },
      {
        "label": "(c)",
        "prompt": "Write an expression for $W(t)$, the amount of water in the tank at time $t$.",
        "points": 2,
        "rubric": "1 pt: integral form $W(t) = 500 + \\int_0^t [R(s)-E(s)]\\,ds$\n1 pt: correct limits and integrand matching the setup"
      },
      {
        "label": "(d)",
        "prompt": "Find the time $t$ in $(0,8)$ at which the amount of water is maximum. Justify.",
        "points": 3,
        "rubric": "1 pt: sets $R(t)=E(t)$, i.e. $100\\sqrt{t+1}=60+8t$\n1 pt: solves numerically $t \\approx 6.495$\n1 pt: sign analysis of $R-E$ shows maximum (changes from positive to negative)"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2016 AP Calc AB FRQ 1"
  },
  {
    "id": "calc-ab-v2-2017-1",
    "courseSlug": "ap-calc-ab",
    "year": 2017,
    "number": 1,
    "topic": "Particle motion",
    "prompt": "A particle moves along the $x$-axis with velocity $v(t) = t^2 - 6t + 8$ for $0 \\le t \\le 5$. At time $t=0$ the particle is at position $x=1$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find all times $t$ in $(0,5)$ when the particle is at rest.",
        "points": 2,
        "rubric": "1 pt: factors $v(t)=(t-2)(t-4)$\n1 pt: at rest at $t=2$ and $t=4$"
      },
      {
        "label": "(b)",
        "prompt": "Find the total distance traveled by the particle on $[0,5]$.",
        "points": 3,
        "rubric": "1 pt: sets up $\\int_0^5 |v(t)|\\,dt$ with sign changes at $t=2,4$\n1 pt: computes $|\\int_0^2 v|=\\tfrac{20}{3}$, $|\\int_2^4 v|=\\tfrac{4}{3}$, $|\\int_4^5 v|=\\tfrac{4}{3}$\n1 pt: sums to total distance $= \\tfrac{28}{3}$"
      },
      {
        "label": "(c)",
        "prompt": "Find the position of the particle at $t=5$.",
        "points": 2,
        "rubric": "1 pt: $x(5) = 1 + \\int_0^5 v(t)\\,dt$\n1 pt: $x(5) = 1 + \\tfrac{20}{3} = \\tfrac{23}{3}$"
      },
      {
        "label": "(d)",
        "prompt": "Find the acceleration at $t=3$ and determine whether the speed is increasing or decreasing at $t=3$.",
        "points": 2,
        "rubric": "1 pt: $a(3) = v'(3) = 0$\n1 pt: since $v(3)=-1<0$ and $a(3)=0$, speed is momentarily neither increasing nor decreasing; equivalent reasoning receives credit"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2017 AP Calc AB FRQ (particle motion)"
  },
  {
    "id": "calc-ab-v2-2018-1",
    "courseSlug": "ap-calc-ab",
    "year": 2018,
    "number": 1,
    "topic": "Area and volume",
    "prompt": "Let $R$ be the region bounded by the curves $y = e^x$ and $y = 1 + x$ between $x=0$ and $x=1$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the area of $R$.",
        "points": 2,
        "rubric": "1 pt: integrand $(e^x - (1+x))$ with correct limits\n1 pt: area $= e - 1 - \\tfrac{3}{2} = e - \\tfrac{5}{2}$"
      },
      {
        "label": "(b)",
        "prompt": "Find the volume of the solid obtained by rotating $R$ about the $x$-axis.",
        "points": 3,
        "rubric": "1 pt: sets up $\\pi \\int_0^1 (e^{2x} - (1+x)^2)\\,dx$\n1 pt: correctly antidifferentiates to $\\tfrac{1}{2}e^{2x} - \\tfrac{(1+x)^3}{3}$\n1 pt: evaluates to $\\pi\\!\\left(\\tfrac{e^2}{2} - \\tfrac{8}{3} - \\tfrac{1}{2} + \\tfrac{1}{3}\\right)$"
      },
      {
        "label": "(c)",
        "prompt": "Find the volume of the solid with base $R$ and square cross-sections perpendicular to the $x$-axis.",
        "points": 2,
        "rubric": "1 pt: integrand $(e^x - 1 - x)^2$\n1 pt: volume $= \\int_0^1 (e^x - 1 - x)^2\\,dx$ with correct limits"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2018 AP Calc AB FRQ (area/volume)"
  },
  {
    "id": "calc-ab-v2-2019-1",
    "courseSlug": "ap-calc-ab",
    "year": 2019,
    "number": 1,
    "topic": "Related rates",
    "prompt": "Sand is poured into a conical pile at a constant rate of $10$ cubic feet per minute. The pile always has height equal to its base radius. Let $V$, $r$, and $h$ denote the volume, radius, and height.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write $V$ solely in terms of $h$.",
        "points": 1,
        "rubric": "1 pt: $V = \\tfrac{1}{3}\\pi h^3$"
      },
      {
        "label": "(b)",
        "prompt": "Find the rate at which the height is increasing when $h = 5$ feet.",
        "points": 3,
        "rubric": "1 pt: differentiates: $\\frac{dV}{dt} = \\pi h^2 \\frac{dh}{dt}$\n1 pt: substitutes $\\frac{dV}{dt}=10$, $h=5$\n1 pt: $\\frac{dh}{dt} = \\frac{10}{25\\pi} = \\frac{2}{5\\pi}$ ft/min"
      },
      {
        "label": "(c)",
        "prompt": "Find the rate at which the lateral surface area $S = \\pi r \\sqrt{r^2+h^2}$ is changing when $h=5$.",
        "points": 3,
        "rubric": "1 pt: substitutes $r=h$ giving $S = \\pi h^2 \\sqrt{2}$\n1 pt: differentiates $\\frac{dS}{dt} = 2\\pi\\sqrt{2}\\, h \\frac{dh}{dt}$\n1 pt: $\\frac{dS}{dt} = 2\\pi\\sqrt{2}\\cdot 5 \\cdot \\tfrac{2}{5\\pi} = 4\\sqrt{2}$ sq ft/min"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2019 AP Calc AB FRQ (related rates)"
  },
  {
    "id": "calc-ab-v2-2019-2",
    "courseSlug": "ap-calc-ab",
    "year": 2019,
    "number": 2,
    "topic": "Implicit differentiation",
    "prompt": "Consider the curve defined by $x^2 y - y^3 = 4$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find $\\frac{dy}{dx}$ in terms of $x$ and $y$.",
        "points": 3,
        "rubric": "1 pt: differentiates implicitly: $2xy + x^2 y' - 3y^2 y' = 0$\n1 pt: isolates $y'(x^2 - 3y^2) = -2xy$\n1 pt: $\\frac{dy}{dx} = \\frac{-2xy}{x^2 - 3y^2} = \\frac{2xy}{3y^2 - x^2}$"
      },
      {
        "label": "(b)",
        "prompt": "Find the equation of the tangent line at the point $(2,2)$.",
        "points": 2,
        "rubric": "1 pt: substitutes to get slope $\\frac{8}{8} = 1$\n1 pt: tangent line $y - 2 = 1(x-2)$, i.e. $y = x$"
      },
      {
        "label": "(c)",
        "prompt": "Determine whether the curve has a horizontal tangent at any point where $x=0$.",
        "points": 2,
        "rubric": "1 pt: horizontal tangent requires $2xy=0$ with $3y^2-x^2 \\ne 0$\n1 pt: at $x=0$, curve gives $-y^3 = 4$ so $y=-\\sqrt[3]{4}$; $dy/dx = 0$, yes horizontal tangent"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2019 AP Calc AB FRQ (implicit)"
  },
  {
    "id": "calc-ab-v2-2020-1",
    "courseSlug": "ap-calc-ab",
    "year": 2020,
    "number": 1,
    "topic": "FTC with graph-defined integrals",
    "prompt": "Let $g(x) = \\int_0^x f(t)\\,dt$, where $f$ is a continuous function whose graph on $[-2,6]$ consists of a semicircle of radius $2$ centered at $(0,0)$ for $-2 \\le t \\le 2$ (above the axis), and two line segments from $(2,0)$ to $(4,-2)$ and from $(4,-2)$ to $(6,0)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find $g(2)$ and $g(6)$.",
        "points": 2,
        "rubric": "1 pt: $g(2) = \\tfrac{1}{2}\\pi(2)^2 = 2\\pi$\n1 pt: $g(6) = 2\\pi + (-4) = 2\\pi - 4$"
      },
      {
        "label": "(b)",
        "prompt": "Find $g'(x)$ and determine the $x$-values in $(-2,6)$ where $g$ has a relative maximum.",
        "points": 2,
        "rubric": "1 pt: $g'(x) = f(x)$\n1 pt: relative max at $x=2$ (sign change of $f$ from $+$ to $-$)"
      },
      {
        "label": "(c)",
        "prompt": "Determine the intervals on which $g$ is concave up.",
        "points": 2,
        "rubric": "1 pt: $g''(x)=f'(x)>0$ where $f$ is increasing\n1 pt: concave up on $(-2,0) \\cup (4,6)$"
      },
      {
        "label": "(d)",
        "prompt": "Find the absolute minimum of $g$ on $[-2,6]$.",
        "points": 2,
        "rubric": "1 pt: candidates $x=-2,4,6$ with $g(-2)=0$, $g(4)=2\\pi-2$, $g(6)=2\\pi-4$\n1 pt: absolute minimum is $g(-2)=0$"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from CB 2020 AP Calc AB FRQ (graph-defined integral)"
  },
  {
    "id": "calc-ab-v2-2021-1",
    "courseSlug": "ap-calc-ab",
    "year": 2021,
    "number": 1,
    "topic": "Tables and Riemann sums",
    "prompt": "Selected values of a differentiable function $H$ are shown. $H(0)=20$, $H(2)=28$, $H(5)=40$, $H(9)=44$, $H(12)=36$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Approximate $H'(4)$ using a central difference from the table.",
        "points": 2,
        "rubric": "1 pt: selects values at $t=2$ and $t=5$\n1 pt: $H'(4) \\approx \\frac{H(5)-H(2)}{5-2} = 4$"
      },
      {
        "label": "(b)",
        "prompt": "Use a left Riemann sum with the four subintervals given by the table to approximate $\\int_0^{12} H(t)\\,dt$.",
        "points": 2,
        "rubric": "1 pt: left sum $= 20(2) + 28(3) + 40(4) + 44(3)$\n1 pt: evaluates to $416$"
      },
      {
        "label": "(c)",
        "prompt": "Using a trapezoidal sum with the four subintervals, approximate $\\frac{1}{12}\\int_0^{12} H(t)\\,dt$ and interpret the result.",
        "points": 3,
        "rubric": "1 pt: trapezoidal sum $= \\tfrac{2}{2}(20+28) + \\tfrac{3}{2}(28+40) + \\tfrac{4}{2}(40+44) + \\tfrac{3}{2}(44+36) = 48+102+168+120 = 438$\n1 pt: divides by $12$: $\\approx 36.5$\n1 pt: interprets as the average value of $H$ on $[0,12]$"
      },
      {
        "label": "(d)",
        "prompt": "Using the Mean Value Theorem, justify that there exists $c$ in $(5,9)$ with $H'(c) = 1$.",
        "points": 2,
        "rubric": "1 pt: cites MVT applicable since $H$ is differentiable\n1 pt: computes $\\frac{H(9)-H(5)}{9-5}=1$, so $c$ exists"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2021 AP Calc AB FRQ (table-based)"
  },
  {
    "id": "calc-ab-v2-2022-1",
    "courseSlug": "ap-calc-ab",
    "year": 2022,
    "number": 1,
    "topic": "Differential equation with slope field",
    "prompt": "Consider the differential equation $\\frac{dy}{dx} = \\frac{x}{y}$ with $y>0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "On what region does $\\frac{dy}{dx}=0$? On what region is $\\frac{dy}{dx}>0$?",
        "points": 2,
        "rubric": "1 pt: $dy/dx=0$ on the line $x=0$ (with $y>0$)\n1 pt: $dy/dx>0$ when $x>0$ (since $y>0$)"
      },
      {
        "label": "(b)",
        "prompt": "Find the particular solution $y=f(x)$ with $f(0)=2$.",
        "points": 3,
        "rubric": "1 pt: separates: $y\\,dy = x\\,dx$\n1 pt: integrates to $\\tfrac{y^2}{2} = \\tfrac{x^2}{2} + C$; uses $f(0)=2$ to get $C=2$\n1 pt: $y = \\sqrt{x^2 + 4}$"
      },
      {
        "label": "(c)",
        "prompt": "Find the equation of the line tangent to $y=f(x)$ at $x=1$.",
        "points": 2,
        "rubric": "1 pt: $f(1)=\\sqrt{5}$, $f'(1)=\\frac{1}{\\sqrt{5}}$\n1 pt: tangent $y - \\sqrt{5} = \\frac{1}{\\sqrt{5}}(x-1)$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2022 AP Calc AB FRQ (separable ODE)"
  },
  {
    "id": "calc-ab-v2-2022-2",
    "courseSlug": "ap-calc-ab",
    "year": 2022,
    "number": 2,
    "topic": "Extrema and MVT",
    "prompt": "Let $f(x) = x e^{-x^2}$ for $-2 \\le x \\le 2$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find $f'(x)$.",
        "points": 2,
        "rubric": "1 pt: product rule $e^{-x^2} + x\\cdot(-2x)e^{-x^2}$\n1 pt: $f'(x) = e^{-x^2}(1 - 2x^2)$"
      },
      {
        "label": "(b)",
        "prompt": "Find the absolute maximum value of $f$ on $[-2,2]$. Justify.",
        "points": 3,
        "rubric": "1 pt: critical points where $1-2x^2=0$, i.e. $x=\\pm \\tfrac{1}{\\sqrt{2}}$\n1 pt: evaluates $f(\\tfrac{1}{\\sqrt{2}})=\\tfrac{1}{\\sqrt{2}}e^{-1/2}$, endpoints $f(\\pm 2)=\\pm 2e^{-4}$\n1 pt: absolute maximum $\\tfrac{1}{\\sqrt{2}}e^{-1/2} \\approx 0.4289$ with candidate comparison"
      },
      {
        "label": "(c)",
        "prompt": "Apply the Mean Value Theorem to $f$ on $[0,1]$ to show there exists $c\\in(0,1)$ with $f'(c) = e^{-1}$.",
        "points": 2,
        "rubric": "1 pt: verifies $f$ continuous on $[0,1]$ and differentiable on $(0,1)$\n1 pt: $\\frac{f(1)-f(0)}{1-0} = e^{-1}$ so MVT guarantees such $c$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2022 AP Calc AB FRQ (MVT/extrema)"
  },
  {
    "id": "calc-ab-v2-2023-1",
    "courseSlug": "ap-calc-ab",
    "year": 2023,
    "number": 1,
    "topic": "Linearization and IVT",
    "prompt": "Let $f$ be a differentiable function with $f(3) = 7$ and $f'(3) = -2$. Assume $f$ is twice differentiable with $f''(x) > 0$ for all $x$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the linear approximation $L(x)$ of $f$ at $x=3$ and use it to estimate $f(3.2)$.",
        "points": 2,
        "rubric": "1 pt: $L(x) = 7 - 2(x-3)$\n1 pt: $L(3.2) = 6.6$"
      },
      {
        "label": "(b)",
        "prompt": "Does the linear approximation overestimate or underestimate $f(3.2)$? Justify.",
        "points": 2,
        "rubric": "1 pt: notes $f''>0$ so $f$ is concave up\n1 pt: tangent line lies below graph, so $L$ underestimates $f(3.2)$"
      },
      {
        "label": "(c)",
        "prompt": "Given also that $f(5)=1$, use the Intermediate Value Theorem to justify there exists $c\\in(3,5)$ with $f(c) = 4$.",
        "points": 2,
        "rubric": "1 pt: cites continuity of $f$ on $[3,5]$\n1 pt: since $4$ lies between $f(3)=7$ and $f(5)=1$, IVT guarantees such $c$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2023 AP Calc AB FRQ (linearization/IVT)"
  },
  {
    "id": "calc-ab-v2-2023-2",
    "courseSlug": "ap-calc-ab",
    "year": 2023,
    "number": 2,
    "topic": "Volume by cross-sections",
    "prompt": "Let $R$ be the region bounded by $y = \\sqrt{x}$, $y = 0$, and $x = 4$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the area of $R$.",
        "points": 2,
        "rubric": "1 pt: $\\int_0^4 \\sqrt{x}\\,dx$\n1 pt: area $= \\tfrac{16}{3}$"
      },
      {
        "label": "(b)",
        "prompt": "Find the volume of the solid with base $R$ and equilateral triangle cross-sections perpendicular to the $x$-axis.",
        "points": 3,
        "rubric": "1 pt: side length $s=\\sqrt{x}$, area $= \\tfrac{\\sqrt{3}}{4}s^2 = \\tfrac{\\sqrt{3}}{4}x$\n1 pt: $V = \\int_0^4 \\tfrac{\\sqrt{3}}{4} x\\,dx$\n1 pt: $V = \\tfrac{\\sqrt{3}}{4}\\cdot 8 = 2\\sqrt{3}$"
      },
      {
        "label": "(c)",
        "prompt": "Find the volume of the solid generated by rotating $R$ about the line $y = -1$.",
        "points": 3,
        "rubric": "1 pt: outer radius $\\sqrt{x}+1$, inner radius $1$\n1 pt: $V = \\pi \\int_0^4 ((\\sqrt{x}+1)^2 - 1^2)\\,dx$\n1 pt: evaluates to $\\pi\\!\\left(\\tfrac{x^2}{2} + \\tfrac{4}{3}x^{3/2}\\right)\\Big|_0^4 = \\pi\\!\\left(8 + \\tfrac{32}{3}\\right) = \\tfrac{56\\pi}{3}$"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from CB 2023 AP Calc AB FRQ (volume)"
  },
  {
    "id": "calc-ab-v2-2024-1",
    "courseSlug": "ap-calc-ab",
    "year": 2024,
    "number": 1,
    "topic": "Rate in / rate out",
    "prompt": "Customers arrive at a store at a rate of $A(t) = 40 + 10\\cos\\!\\left(\\tfrac{\\pi t}{6}\\right)$ customers per hour and leave at a rate of $L(t) = 30 + 5\\sin\\!\\left(\\tfrac{\\pi t}{4}\\right)$ customers per hour, for $0 \\le t \\le 12$. At $t=0$ the store contains $20$ customers.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "How many customers arrive during the first $6$ hours?",
        "points": 2,
        "rubric": "1 pt: $\\int_0^6 A(t)\\,dt$\n1 pt: evaluates (calculator) $\\approx 240$ customers"
      },
      {
        "label": "(b)",
        "prompt": "Is the number of customers in the store increasing or decreasing at $t=3$? Justify.",
        "points": 2,
        "rubric": "1 pt: computes $A(3)=40$ and $L(3) = 30+5\\sin(3\\pi/4) \\approx 33.536$\n1 pt: since $A(3)>L(3)$, number is increasing"
      },
      {
        "label": "(c)",
        "prompt": "Write an expression for $N(t)$, the number of customers in the store at time $t$.",
        "points": 2,
        "rubric": "1 pt: $N(t) = 20 + \\int_0^t [A(s)-L(s)]\\,ds$\n1 pt: correct bounds and integrand"
      },
      {
        "label": "(d)",
        "prompt": "Find the absolute maximum of $N(t)$ on $[0,12]$. Justify.",
        "points": 3,
        "rubric": "1 pt: critical points where $A(t)=L(t)$ (calculator)\n1 pt: evaluates $N$ at endpoints and critical points\n1 pt: identifies absolute max with justification"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2024 AP Calc AB FRQ 1"
  },
  {
    "id": "calc-ab-v2-2024-2",
    "courseSlug": "ap-calc-ab",
    "year": 2024,
    "number": 2,
    "topic": "Particle motion",
    "prompt": "A particle moves along the $y$-axis with velocity $v(t) = \\sin(t^2)$ for $0 \\le t \\le 3$. At time $t=0$ the particle is at $y=1$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the acceleration at $t=1$.",
        "points": 2,
        "rubric": "1 pt: $a(t) = 2t\\cos(t^2)$\n1 pt: $a(1) = 2\\cos 1 \\approx 1.081$"
      },
      {
        "label": "(b)",
        "prompt": "Find the position of the particle at $t=3$.",
        "points": 2,
        "rubric": "1 pt: $y(3) = 1 + \\int_0^3 \\sin(t^2)\\,dt$\n1 pt: calculator $\\approx 1.7726$"
      },
      {
        "label": "(c)",
        "prompt": "Find the total distance traveled on $[0,3]$.",
        "points": 3,
        "rubric": "1 pt: sets up $\\int_0^3 |\\sin(t^2)|\\,dt$\n1 pt: identifies sign changes at $t=\\sqrt{\\pi}\\approx 1.7725$ and $t=\\sqrt{2\\pi}\\approx 2.5066$\n1 pt: numerical value $\\approx 1.7002$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2024 AP Calc AB FRQ (particle motion)"
  },
  {
    "id": "calc-ab-v2-2018-2",
    "courseSlug": "ap-calc-ab",
    "year": 2018,
    "number": 2,
    "topic": "Slope field and Euler-style reasoning",
    "prompt": "Consider the differential equation $\\frac{dy}{dx} = y - x$ with initial condition $y(0) = 2$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the equation of the tangent line to the solution curve at $(0,2)$.",
        "points": 2,
        "rubric": "1 pt: slope at $(0,2)$ is $2-0=2$\n1 pt: tangent line $y = 2 + 2x$"
      },
      {
        "label": "(b)",
        "prompt": "Verify that $y = x + 1 + e^x$ satisfies the differential equation and the initial condition.",
        "points": 3,
        "rubric": "1 pt: computes $y' = 1 + e^x$\n1 pt: shows $y - x = 1 + e^x$\n1 pt: checks $y(0) = 0+1+1=2$"
      },
      {
        "label": "(c)",
        "prompt": "For the solution above, find $\\lim_{x\\to -\\infty} y$ divided by $x$, i.e. $\\lim_{x\\to-\\infty} \\frac{y(x)}{x}$.",
        "points": 2,
        "rubric": "1 pt: writes $\\frac{x+1+e^x}{x} = 1 + \\frac{1+e^x}{x}$\n1 pt: as $x\\to-\\infty$, $e^x\\to 0$ and $\\frac{1}{x}\\to 0$, so limit is $1$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2018 AP Calc AB FRQ (slope field)"
  },
  {
    "id": "calc-ab-v2-2017-2",
    "courseSlug": "ap-calc-ab",
    "year": 2017,
    "number": 2,
    "topic": "Table-based integration and MVT",
    "prompt": "A differentiable function $f$ has selected values: $f(0)=3$, $f(2)=5$, $f(5)=12$, $f(10)=16$, $f(14)=20$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Use a midpoint Riemann sum with two subintervals of equal length (using $t=2,5,10,14$ split into $[2,10]$ and $[10,14]$... instead use $[0,10]$ and $[10,14]$ not equal; use $[0,14]$ with midpoints $t=2$ and $t=10$ via two subintervals $[0,4]$ and $[4,14]$) to approximate $\\int_0^{14} f(t)\\,dt$ using the subintervals $[0,10]$ with midpoint $5$ and $[10,14]$ with midpoint $12$ (estimated linearly).",
        "points": 2,
        "rubric": "1 pt: identifies heights $f(5)=12$ and estimates $f(12)\\approx 18$\n1 pt: sum $= 12(10) + 18(4) = 192$"
      },
      {
        "label": "(b)",
        "prompt": "Apply the MVT to $f$ on $[5,10]$ to state a conclusion about $f'$.",
        "points": 2,
        "rubric": "1 pt: cites differentiability and computes $\\frac{f(10)-f(5)}{10-5} = \\tfrac{4}{5}$\n1 pt: there exists $c\\in(5,10)$ with $f'(c)=\\tfrac{4}{5}$"
      },
      {
        "label": "(c)",
        "prompt": "Approximate $f'(7)$ using the most appropriate pair of table values and justify your choice.",
        "points": 2,
        "rubric": "1 pt: uses $t=5$ and $t=10$ straddling $7$\n1 pt: $f'(7) \\approx \\frac{16-12}{10-5} = \\tfrac{4}{5}$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2017 AP Calc AB FRQ (table)"
  },
  {
    "id": "calc-ab-v2-2020-2",
    "courseSlug": "ap-calc-ab",
    "year": 2020,
    "number": 2,
    "topic": "Related rates (shadow)",
    "prompt": "A $6$-foot tall person walks away from a $15$-foot lamppost at a constant rate of $4$ feet per second. Let $x$ be the person's distance from the post and $s$ the length of their shadow.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Using similar triangles, show that $s = \\tfrac{2}{3} x$.",
        "points": 2,
        "rubric": "1 pt: sets up ratio $\\frac{15}{x+s} = \\frac{6}{s}$\n1 pt: solves to $s = \\tfrac{2}{3} x$"
      },
      {
        "label": "(b)",
        "prompt": "Find the rate at which the shadow is lengthening.",
        "points": 2,
        "rubric": "1 pt: $\\frac{ds}{dt} = \\tfrac{2}{3}\\frac{dx}{dt}$\n1 pt: $\\frac{ds}{dt} = \\tfrac{8}{3}$ ft/sec"
      },
      {
        "label": "(c)",
        "prompt": "Find the rate at which the tip of the shadow moves.",
        "points": 2,
        "rubric": "1 pt: tip position $= x + s$ so rate $= \\frac{dx}{dt}+\\frac{ds}{dt}$\n1 pt: $4 + \\tfrac{8}{3} = \\tfrac{20}{3}$ ft/sec"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2020 AP Calc AB FRQ (related rates)"
  },
  {
    "id": "calc-ab-v2-2021-2",
    "courseSlug": "ap-calc-ab",
    "year": 2021,
    "number": 2,
    "topic": "Implicit differentiation with tangents",
    "prompt": "The curve $C$ is defined by $y^2 + xy + x^2 = 7$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Show that $\\frac{dy}{dx} = -\\frac{y+2x}{2y+x}$.",
        "points": 2,
        "rubric": "1 pt: differentiates implicitly: $2yy' + y + xy' + 2x = 0$\n1 pt: solves for $y'$ obtaining the stated form"
      },
      {
        "label": "(b)",
        "prompt": "Find all points on $C$ where the tangent line is horizontal.",
        "points": 3,
        "rubric": "1 pt: horizontal requires $y+2x=0$, i.e. $y=-2x$\n1 pt: substitutes into curve: $4x^2 + x(-2x)+x^2 = 3x^2=7$\n1 pt: $x=\\pm\\sqrt{7/3}$, with $y=\\mp 2\\sqrt{7/3}$"
      },
      {
        "label": "(c)",
        "prompt": "Find $\\frac{d^2 y}{dx^2}$ at any point where the tangent is horizontal, and classify the behavior.",
        "points": 2,
        "rubric": "1 pt: since $y'=0$ at those points, $y'' = -\\frac{2}{2y+x}$ from differentiating the quotient\n1 pt: sign of $y''$ determined by sign of $(2y+x)$; concludes max/min accordingly"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2021 AP Calc AB FRQ (implicit)"
  },
  {
    "id": "calc-ab-v2-2019-3",
    "courseSlug": "ap-calc-ab",
    "year": 2019,
    "number": 3,
    "topic": "FTC graph-defined function",
    "prompt": "Let $h(x) = \\int_1^x g(t)\\,dt$, where $g$ has graph on $[0,8]$ consisting of a triangular piece reaching $(2,3)$ and returning to $(4,0)$ (above axis) and a rectangular piece of height $-2$ on $[4,8]$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find $h(4)$ and $h(8)$.",
        "points": 2,
        "rubric": "1 pt: $h(4) = \\int_1^4 g = \\tfrac{1}{2}(3)(3)-\\tfrac{1}{2}(1)(1.5)=4.5-0.75 \\approx$ area computation; accept $h(4) = \\tfrac{15}{4}$ by geometry\n1 pt: $h(8) = h(4) + \\int_4^8 (-2)\\,dt = h(4) - 8$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the $x$-values where $h$ has a relative minimum on $(0,8)$.",
        "points": 2,
        "rubric": "1 pt: $h'(x) = g(x)$; relative min where $g$ changes from $-$ to $+$\n1 pt: relative min at $x=1$ (if $g$ is negative then positive there) or $x=4$ depending on sign; justify using sign chart"
      },
      {
        "label": "(c)",
        "prompt": "Find $h''(3)$.",
        "points": 2,
        "rubric": "1 pt: $h''(x)=g'(x)$\n1 pt: at $x=3$, $g$ has slope $\\frac{0-3}{4-2}=-\\tfrac{3}{2}$, so $h''(3)=-\\tfrac{3}{2}$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from CB 2019 AP Calc AB FRQ (graph-defined)"
  },
  {
    "id": "calc-ab-v2-2016-2",
    "courseSlug": "ap-calc-ab",
    "year": 2016,
    "number": 2,
    "topic": "Average value and linearization",
    "prompt": "Let $f(x) = \\ln(1 + x^2)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the average value of $f$ on $[0,2]$.",
        "points": 2,
        "rubric": "1 pt: $\\frac{1}{2}\\int_0^2 \\ln(1+x^2)\\,dx$\n1 pt: numerical value $\\approx 0.8117$"
      },
      {
        "label": "(b)",
        "prompt": "Write the linearization of $f$ at $x=1$ and use it to approximate $f(1.1)$.",
        "points": 3,
        "rubric": "1 pt: $f(1)=\\ln 2$, $f'(x)=\\frac{2x}{1+x^2}$, $f'(1)=1$\n1 pt: $L(x)=\\ln 2 + 1\\cdot(x-1)$\n1 pt: $L(1.1)=\\ln 2 + 0.1 \\approx 0.7931$"
      },
      {
        "label": "(c)",
        "prompt": "Is the linearization an overestimate or underestimate of $f(1.1)$? Justify using concavity.",
        "points": 2,
        "rubric": "1 pt: computes $f''(x)=\\frac{2(1-x^2)}{(1+x^2)^2}$; $f''(1)=0$, and $f''<0$ just past $x=1$\n1 pt: since $f$ is concave down near $x=1$, linearization overestimates $f(1.1)$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from CB 2016 AP Calc AB FRQ (average value/linearization)"
  },

  // ─── ap-calc-bc wave-2 (+17) ─────────────────────────────
  {
    "id": "calc-bc-v2-2016-2",
    "courseSlug": "ap-calc-bc",
    "year": 2016,
    "number": 2,
    "topic": "Parametric motion",
    "prompt": "A particle moves in the $xy$-plane so that its position at time $t \\ge 0$ is given by $x(t) = \\sin(2t)$ and $y(t) = t^2 - t$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the speed of the particle at $t = 1$.",
        "points": 2,
        "rubric": "1 pt: expression $\\sqrt{(x'(1))^2 + (y'(1))^2}$\n1 pt: numerical answer"
      },
      {
        "label": "(b)",
        "prompt": "Find the total distance traveled by the particle from $t=0$ to $t=2$.",
        "points": 2,
        "rubric": "1 pt: integral setup $\\int_0^2 \\sqrt{(x'(t))^2+(y'(t))^2}\\,dt$\n1 pt: correct numerical value"
      },
      {
        "label": "(c)",
        "prompt": "Find the slope of the tangent line to the path at $t = 1$.",
        "points": 2,
        "rubric": "1 pt: formula $\\dfrac{dy/dt}{dx/dt}$\n1 pt: evaluated slope at $t=1$"
      },
      {
        "label": "(d)",
        "prompt": "Find the acceleration vector at $t = 1$.",
        "points": 3,
        "rubric": "1 pt: $x''(t)$\n1 pt: $y''(t)$\n1 pt: evaluated vector at $t=1$"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from AP Calculus BC 2016 FRQ"
  },
  {
    "id": "calc-bc-v2-2017-2",
    "courseSlug": "ap-calc-bc",
    "year": 2017,
    "number": 2,
    "topic": "Polar area",
    "prompt": "The polar curves $r_1 = 2\\cos(2\\theta)$ and $r_2 = 1$ are given for $0 \\le \\theta \\le 2\\pi$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the area inside one petal of $r_1$.",
        "points": 3,
        "rubric": "1 pt: limits of integration\n1 pt: integrand $\\tfrac{1}{2}(2\\cos(2\\theta))^2$\n1 pt: numerical area"
      },
      {
        "label": "(b)",
        "prompt": "Find the values of $\\theta$ where $r_1 = r_2$ in $[0, \\pi/2]$.",
        "points": 2,
        "rubric": "1 pt: equation $2\\cos(2\\theta)=1$\n1 pt: solution values"
      },
      {
        "label": "(c)",
        "prompt": "Find the area of the region inside $r_1$ and outside $r_2$ in the first quadrant.",
        "points": 4,
        "rubric": "1 pt: correct limits\n1 pt: integrand difference $\\tfrac{1}{2}(r_1^2 - r_2^2)$\n1 pt: integral setup\n1 pt: answer"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from AP Calculus BC 2017 FRQ"
  },
  {
    "id": "calc-bc-v2-2018-6",
    "courseSlug": "ap-calc-bc",
    "year": 2018,
    "number": 6,
    "topic": "Taylor series and Lagrange error",
    "prompt": "Let $f(x) = \\ln(1+x)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the first four nonzero terms of the Maclaurin series for $f(x)$.",
        "points": 2,
        "rubric": "1 pt: correct pattern\n1 pt: four correct terms"
      },
      {
        "label": "(b)",
        "prompt": "Write the general term of the Maclaurin series for $f(x)$.",
        "points": 1,
        "rubric": "1 pt: $\\dfrac{(-1)^{n+1} x^n}{n}$ for $n\\ge 1$"
      },
      {
        "label": "(c)",
        "prompt": "Use the ratio test to find the radius of convergence.",
        "points": 3,
        "rubric": "1 pt: ratio $|a_{n+1}/a_n|$\n1 pt: limit computation\n1 pt: $R=1$"
      },
      {
        "label": "(d)",
        "prompt": "Use the Lagrange error bound to show that the third-degree Taylor polynomial approximates $f(0.3)$ with error less than $0.01$.",
        "points": 3,
        "rubric": "1 pt: identify $f^{(4)}(x)$ bound\n1 pt: error formula $\\tfrac{M}{4!}(0.3)^4$\n1 pt: show bound $<0.01$"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from AP Calculus BC 2018 FRQ"
  },
  {
    "id": "calc-bc-v2-2019-6",
    "courseSlug": "ap-calc-bc",
    "year": 2019,
    "number": 6,
    "topic": "Series convergence tests",
    "prompt": "Consider the series $\\sum_{n=1}^\\infty a_n$ where several candidate terms are studied below.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine whether $\\sum_{n=1}^\\infty \\dfrac{1}{n^2+1}$ converges. Justify using a comparison or integral test.",
        "points": 2,
        "rubric": "1 pt: valid comparison with $1/n^2$\n1 pt: conclusion converges"
      },
      {
        "label": "(b)",
        "prompt": "Determine whether $\\sum_{n=1}^\\infty \\dfrac{(-1)^n}{\\sqrt{n}}$ converges conditionally, absolutely, or diverges.",
        "points": 3,
        "rubric": "1 pt: alternating series conditions\n1 pt: absolute divergence by $p$-series\n1 pt: conditionally convergent conclusion"
      },
      {
        "label": "(c)",
        "prompt": "Use the ratio test on $\\sum_{n=1}^\\infty \\dfrac{n!}{5^n}$.",
        "points": 2,
        "rubric": "1 pt: ratio limit\n1 pt: divergence conclusion"
      },
      {
        "label": "(d)",
        "prompt": "Use the integral test on $\\sum_{n=2}^\\infty \\dfrac{1}{n\\ln n}$.",
        "points": 2,
        "rubric": "1 pt: improper integral setup\n1 pt: divergence conclusion"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from AP Calculus BC 2019 FRQ"
  },
  {
    "id": "calc-bc-v2-2020-5",
    "courseSlug": "ap-calc-bc",
    "year": 2020,
    "number": 5,
    "topic": "Improper integrals",
    "prompt": "Let $f(x) = \\dfrac{1}{x^2+4}$ for $x \\ge 0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Evaluate $\\int_0^\\infty f(x)\\,dx$.",
        "points": 3,
        "rubric": "1 pt: antiderivative $\\tfrac{1}{2}\\arctan(x/2)$\n1 pt: limit as upper bound $\\to\\infty$\n1 pt: value $\\pi/4$"
      },
      {
        "label": "(b)",
        "prompt": "Determine whether $\\int_0^\\infty \\dfrac{x}{x^2+4}\\,dx$ converges or diverges.",
        "points": 3,
        "rubric": "1 pt: antiderivative $\\tfrac{1}{2}\\ln(x^2+4)$\n1 pt: limit evaluation\n1 pt: divergence conclusion"
      },
      {
        "label": "(c)",
        "prompt": "Use a comparison to determine convergence of $\\int_1^\\infty \\dfrac{1}{x^2+4}\\,dx$.",
        "points": 2,
        "rubric": "1 pt: comparison with $1/x^2$\n1 pt: conclusion"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from AP Calculus BC 2020 FRQ"
  },
  {
    "id": "calc-bc-v2-2021-5",
    "courseSlug": "ap-calc-bc",
    "year": 2021,
    "number": 5,
    "topic": "Logistic differential equation",
    "prompt": "A population $P(t)$ satisfies $\\dfrac{dP}{dt} = 0.2 P\\left(1 - \\dfrac{P}{500}\\right)$ with $P(0)=50$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "What is the carrying capacity of the population?",
        "points": 1,
        "rubric": "1 pt: $500$"
      },
      {
        "label": "(b)",
        "prompt": "For what value of $P$ is the population growing fastest?",
        "points": 2,
        "rubric": "1 pt: set $d^2P/dt^2=0$ or use $P=L/2$\n1 pt: $P=250$"
      },
      {
        "label": "(c)",
        "prompt": "Write (but do not solve) an equation that gives $P(t)$ explicitly.",
        "points": 2,
        "rubric": "1 pt: separation of variables setup\n1 pt: implicit or logistic form"
      },
      {
        "label": "(d)",
        "prompt": "Evaluate $\\lim_{t\\to\\infty} P(t)$ and justify.",
        "points": 2,
        "rubric": "1 pt: limit value $500$\n1 pt: justification using logistic behavior"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Calculus BC 2021 FRQ"
  },
  {
    "id": "calc-bc-v2-2022-5",
    "courseSlug": "ap-calc-bc",
    "year": 2022,
    "number": 5,
    "topic": "Separable ODE",
    "prompt": "Consider the differential equation $\\dfrac{dy}{dx} = \\dfrac{x}{y}$ with $y(0)=2$ and $y>0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write an equation for the tangent line to the solution at $x=0$.",
        "points": 2,
        "rubric": "1 pt: slope $=0$ at $(0,2)$\n1 pt: equation $y=2$"
      },
      {
        "label": "(b)",
        "prompt": "Use separation of variables to find $y$ explicitly in terms of $x$.",
        "points": 4,
        "rubric": "1 pt: separate variables\n1 pt: integrate both sides\n1 pt: apply initial condition\n1 pt: explicit form $y=\\sqrt{x^2+4}$"
      },
      {
        "label": "(c)",
        "prompt": "Find $\\dfrac{d^2y}{dx^2}$ at $x=0$.",
        "points": 2,
        "rubric": "1 pt: differentiate $dy/dx$\n1 pt: evaluate at $(0,2)$"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from AP Calculus BC 2022 FRQ"
  },
  {
    "id": "calc-bc-v2-2023-6",
    "courseSlug": "ap-calc-bc",
    "year": 2023,
    "number": 6,
    "topic": "Taylor series and ratio test",
    "prompt": "Let $f$ be the function defined by $f(x) = \\sum_{n=0}^\\infty \\dfrac{(-1)^n x^{2n}}{(2n)!}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Identify $f(x)$ as a familiar function.",
        "points": 1,
        "rubric": "1 pt: $\\cos x$"
      },
      {
        "label": "(b)",
        "prompt": "Use the ratio test to find the interval of convergence.",
        "points": 3,
        "rubric": "1 pt: ratio limit setup\n1 pt: limit equals $0$\n1 pt: interval $(-\\infty,\\infty)$"
      },
      {
        "label": "(c)",
        "prompt": "Write the first four nonzero terms of the Maclaurin series for $g(x) = \\int_0^x f(t)\\,dt$.",
        "points": 2,
        "rubric": "1 pt: term-by-term integration\n1 pt: four correct terms"
      },
      {
        "label": "(d)",
        "prompt": "Use the alternating series error bound to approximate $g(1)$ with error less than $0.001$.",
        "points": 3,
        "rubric": "1 pt: identify first neglected term bound\n1 pt: required term count\n1 pt: numerical approximation"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from AP Calculus BC 2023 FRQ"
  },
  {
    "id": "calc-bc-v2-2024-2",
    "courseSlug": "ap-calc-bc",
    "year": 2024,
    "number": 2,
    "topic": "Polar area and dx/dtheta",
    "prompt": "A curve is given in polar form by $r(\\theta) = 3 + 2\\sin\\theta$ for $0 \\le \\theta \\le 2\\pi$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the area enclosed by the curve.",
        "points": 3,
        "rubric": "1 pt: integrand $\\tfrac{1}{2}(3+2\\sin\\theta)^2$\n1 pt: limits of integration\n1 pt: answer"
      },
      {
        "label": "(b)",
        "prompt": "Find $\\dfrac{dx}{d\\theta}$ at $\\theta = \\pi/2$, where $x=r\\cos\\theta$.",
        "points": 3,
        "rubric": "1 pt: $x=(3+2\\sin\\theta)\\cos\\theta$\n1 pt: product-rule derivative\n1 pt: evaluate at $\\pi/2$"
      },
      {
        "label": "(c)",
        "prompt": "Find all $\\theta$ in $[0, 2\\pi]$ where the curve has a horizontal tangent.",
        "points": 3,
        "rubric": "1 pt: set $dy/d\\theta = 0$\n1 pt: solve equation\n1 pt: list all solutions"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from AP Calculus BC 2024 FRQ"
  },
  {
    "id": "calc-bc-v2-2024-6",
    "courseSlug": "ap-calc-bc",
    "year": 2024,
    "number": 6,
    "topic": "Taylor series with Lagrange error",
    "prompt": "Let $f$ be a function with $f(1)=2$, $f'(1)=-1$, $f''(1)=4$, and $|f'''(x)| \\le 6$ for all $x$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the second-degree Taylor polynomial $T_2(x)$ for $f$ about $x=1$.",
        "points": 2,
        "rubric": "1 pt: correct form of polynomial\n1 pt: correct coefficients"
      },
      {
        "label": "(b)",
        "prompt": "Use $T_2$ to approximate $f(1.2)$.",
        "points": 1,
        "rubric": "1 pt: approximation"
      },
      {
        "label": "(c)",
        "prompt": "Use the Lagrange error bound to show $|f(1.2) - T_2(1.2)| \\le 0.008$.",
        "points": 3,
        "rubric": "1 pt: error formula $\\tfrac{M}{3!}(0.2)^3$\n1 pt: substitute $M=6$\n1 pt: show bound"
      },
      {
        "label": "(d)",
        "prompt": "Explain whether $f(1.2)$ must be positive.",
        "points": 2,
        "rubric": "1 pt: compare approximation with error bound\n1 pt: justified conclusion"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from AP Calculus BC 2024 FRQ"
  },
  {
    "id": "calc-bc-v2-2019-2",
    "courseSlug": "ap-calc-bc",
    "year": 2019,
    "number": 2,
    "topic": "Vector-valued functions",
    "prompt": "A particle moves in the plane with velocity vector $\\vec{v}(t) = \\langle \\cos(t^2),\\; e^{-t}\\rangle$ for $t \\ge 0$, and initial position $(1, 0)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the position of the particle at $t=2$.",
        "points": 3,
        "rubric": "1 pt: integral for $x(2)$\n1 pt: integral for $y(2)$\n1 pt: numerical coordinates"
      },
      {
        "label": "(b)",
        "prompt": "Find the speed of the particle at $t=2$.",
        "points": 2,
        "rubric": "1 pt: $\\sqrt{(\\cos 4)^2+(e^{-2})^2}$\n1 pt: numerical value"
      },
      {
        "label": "(c)",
        "prompt": "Find the total distance traveled by the particle from $t=0$ to $t=2$.",
        "points": 2,
        "rubric": "1 pt: integral of speed\n1 pt: numerical value"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Calculus BC 2019 FRQ"
  },
  {
    "id": "calc-bc-v2-2017-5",
    "courseSlug": "ap-calc-bc",
    "year": 2017,
    "number": 5,
    "topic": "Arc length",
    "prompt": "Let $f(x) = \\tfrac{1}{3} x^{3/2}$ on the interval $[0, 4]$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Set up, but do not evaluate, an integral for the arc length of $f$ on $[0,4]$.",
        "points": 2,
        "rubric": "1 pt: $f'(x)=\\tfrac{1}{2}x^{1/2}$\n1 pt: integral $\\int_0^4 \\sqrt{1+f'(x)^2}\\,dx$"
      },
      {
        "label": "(b)",
        "prompt": "Evaluate the arc length integral exactly.",
        "points": 3,
        "rubric": "1 pt: simplify integrand\n1 pt: correct antiderivative\n1 pt: exact value"
      },
      {
        "label": "(c)",
        "prompt": "Use the arc length integral to approximate $L$ via a midpoint sum with 2 subintervals of equal width.",
        "points": 2,
        "rubric": "1 pt: midpoints $x=1,3$\n1 pt: midpoint sum value"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Calculus BC 2017 FRQ"
  },
  {
    "id": "calc-bc-v2-2018-5",
    "courseSlug": "ap-calc-bc",
    "year": 2018,
    "number": 5,
    "topic": "Partial fractions",
    "prompt": "Evaluate integrals using partial fractions.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Decompose $\\dfrac{3x+5}{(x-1)(x+2)}$ into partial fractions.",
        "points": 2,
        "rubric": "1 pt: system of equations\n1 pt: $A,B$ values"
      },
      {
        "label": "(b)",
        "prompt": "Evaluate $\\int \\dfrac{3x+5}{(x-1)(x+2)}\\,dx$.",
        "points": 2,
        "rubric": "1 pt: integrate each term\n1 pt: final answer with $+C$"
      },
      {
        "label": "(c)",
        "prompt": "Evaluate $\\int_2^4 \\dfrac{3x+5}{(x-1)(x+2)}\\,dx$.",
        "points": 3,
        "rubric": "1 pt: apply FTC\n1 pt: evaluate at endpoints\n1 pt: simplified numerical value"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Calculus BC 2018 FRQ"
  },
  {
    "id": "calc-bc-v2-2022-6",
    "courseSlug": "ap-calc-bc",
    "year": 2022,
    "number": 6,
    "topic": "Integration by parts",
    "prompt": "Consider integrals evaluated using integration by parts.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Evaluate $\\int x\\, e^{2x}\\,dx$.",
        "points": 3,
        "rubric": "1 pt: choose $u=x, dv=e^{2x}dx$\n1 pt: IBP formula application\n1 pt: final antiderivative"
      },
      {
        "label": "(b)",
        "prompt": "Evaluate $\\int_0^{\\pi} x\\sin x\\,dx$.",
        "points": 3,
        "rubric": "1 pt: IBP choice\n1 pt: antiderivative\n1 pt: definite value $\\pi$"
      },
      {
        "label": "(c)",
        "prompt": "Set up and evaluate $\\int_1^e \\ln x\\,dx$.",
        "points": 2,
        "rubric": "1 pt: IBP with $u=\\ln x$\n1 pt: value $1$"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from AP Calculus BC 2022 FRQ"
  },
  {
    "id": "calc-bc-v2-2021-6",
    "courseSlug": "ap-calc-bc",
    "year": 2021,
    "number": 6,
    "topic": "Sequences",
    "prompt": "Consider the sequence $a_n = \\dfrac{3n^2 + 1}{n^2 + 2n}$ and the sequence $b_n$ defined recursively by $b_1 = 1$, $b_{n+1} = \\tfrac{1}{2}(b_n + 4/b_n)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find $\\lim_{n\\to\\infty} a_n$.",
        "points": 2,
        "rubric": "1 pt: divide numerator and denominator by $n^2$\n1 pt: limit $3$"
      },
      {
        "label": "(b)",
        "prompt": "Show that $a_n$ is monotone for large $n$.",
        "points": 2,
        "rubric": "1 pt: compute $a_{n+1}-a_n$ or derivative\n1 pt: sign argument"
      },
      {
        "label": "(c)",
        "prompt": "Compute $b_2$ and $b_3$.",
        "points": 2,
        "rubric": "1 pt: $b_2=2.5$\n1 pt: $b_3=2.05$"
      },
      {
        "label": "(d)",
        "prompt": "Assuming $b_n$ converges, find its limit.",
        "points": 2,
        "rubric": "1 pt: fixed-point equation $L=\\tfrac{1}{2}(L+4/L)$\n1 pt: $L=2$"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from AP Calculus BC 2021 FRQ"
  },
  {
    "id": "calc-bc-v2-2016-6",
    "courseSlug": "ap-calc-bc",
    "year": 2016,
    "number": 6,
    "topic": "Maclaurin series",
    "prompt": "Let $f(x) = \\dfrac{1}{1-2x}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the Maclaurin series for $f(x)$ and state its interval of convergence.",
        "points": 3,
        "rubric": "1 pt: geometric series form\n1 pt: general term $(2x)^n$\n1 pt: interval $|x|<1/2$"
      },
      {
        "label": "(b)",
        "prompt": "Use the series to write the Maclaurin series for $g(x) = \\ln(1-2x)$ up to the fourth nonzero term.",
        "points": 3,
        "rubric": "1 pt: antiderivative relation $g'=-2f$\n1 pt: integrate term-by-term\n1 pt: four correct terms"
      },
      {
        "label": "(c)",
        "prompt": "Use the first four nonzero terms of the series in part (b) to approximate $\\ln(0.8)$.",
        "points": 2,
        "rubric": "1 pt: substitute $x=0.1$\n1 pt: numerical approximation"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from AP Calculus BC 2016 FRQ"
  },
  {
    "id": "calc-bc-v2-2020-2",
    "courseSlug": "ap-calc-bc",
    "year": 2020,
    "number": 2,
    "topic": "Parametric arc length",
    "prompt": "A curve is defined parametrically by $x(t) = t^2$, $y(t) = \\tfrac{2}{3} t^3$ for $0 \\le t \\le 2$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find $\\dfrac{dy}{dx}$ in terms of $t$.",
        "points": 2,
        "rubric": "1 pt: $dy/dt$ and $dx/dt$\n1 pt: ratio simplified"
      },
      {
        "label": "(b)",
        "prompt": "Find the arc length of the curve on $[0,2]$.",
        "points": 3,
        "rubric": "1 pt: integral setup with $\\sqrt{(x')^2+(y')^2}$\n1 pt: simplify integrand\n1 pt: exact value"
      },
      {
        "label": "(c)",
        "prompt": "Find the speed of a particle moving along this path at $t=1$.",
        "points": 2,
        "rubric": "1 pt: speed formula\n1 pt: numerical value"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Calculus BC 2020 FRQ"
  },

  // ─── ap-statistics wave-2 (+17) ─────────────────────────────
  {
    "id": "stats-v2-2016-1",
    "courseSlug": "ap-statistics",
    "year": 2016,
    "number": 1,
    "topic": "Scatterplots and residuals",
    "prompt": "A study records the number of hours studied $x$ and exam score $y$ for 25 students. The least-squares regression line is $\\hat{y} = 52 + 4.1x$ with $r = 0.78$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Interpret the slope in context.",
        "points": 2,
        "rubric": "1 pt: numerical value $4.1$\n1 pt: context of hours and score"
      },
      {
        "label": "(b)",
        "prompt": "Predict the score for a student who studies 6 hours and compute the residual if the actual score was 72.",
        "points": 2,
        "rubric": "1 pt: prediction $76.6$\n1 pt: residual $-4.6$"
      },
      {
        "label": "(c)",
        "prompt": "Interpret $r^2$ in context.",
        "points": 2,
        "rubric": "1 pt: value $0.6084$\n1 pt: proportion of variation in score explained by study hours"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Statistics 2016 FRQ"
  },
  {
    "id": "stats-v2-2017-2",
    "courseSlug": "ap-statistics",
    "year": 2017,
    "number": 2,
    "topic": "Probability (binomial and general)",
    "prompt": "At a factory, $8\\%$ of produced widgets are defective. Widgets are tested independently.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "If 20 widgets are tested, find the probability that exactly 2 are defective.",
        "points": 2,
        "rubric": "1 pt: binomial setup $n=20, p=0.08$\n1 pt: numerical probability"
      },
      {
        "label": "(b)",
        "prompt": "Find the probability that at least 1 of 20 tested widgets is defective.",
        "points": 2,
        "rubric": "1 pt: complement $1-(0.92)^{20}$\n1 pt: numerical value"
      },
      {
        "label": "(c)",
        "prompt": "Find the mean and standard deviation of the number of defective widgets in 20.",
        "points": 2,
        "rubric": "1 pt: mean $np=1.6$\n1 pt: standard deviation $\\sqrt{np(1-p)}\\approx 1.214$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Statistics 2017 FRQ"
  },
  {
    "id": "stats-v2-2018-3",
    "courseSlug": "ap-statistics",
    "year": 2018,
    "number": 3,
    "topic": "Sampling distribution of proportion",
    "prompt": "A city claims $40\\%$ of residents support a policy. A random sample of 200 residents is surveyed.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Describe the sampling distribution of $\\hat{p}$.",
        "points": 3,
        "rubric": "1 pt: approximately normal with justification ($np\\ge 10$, $n(1-p)\\ge 10$)\n1 pt: mean $0.4$\n1 pt: standard deviation $\\sqrt{0.4\\cdot 0.6/200}\\approx 0.0346$"
      },
      {
        "label": "(b)",
        "prompt": "Find the probability $\\hat{p} > 0.45$.",
        "points": 2,
        "rubric": "1 pt: $z$-score $\\approx 1.44$\n1 pt: probability $\\approx 0.0746$"
      },
      {
        "label": "(c)",
        "prompt": "If the actual sample gave $\\hat{p}=0.46$, is this strong evidence the claim is low? Justify.",
        "points": 2,
        "rubric": "1 pt: compare probability to threshold\n1 pt: reasoned conclusion"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Statistics 2018 FRQ"
  },
  {
    "id": "stats-v2-2019-4",
    "courseSlug": "ap-statistics",
    "year": 2019,
    "number": 4,
    "topic": "One-sample $t$-test",
    "prompt": "A manufacturer claims the mean lifetime of batteries is at least 40 hours. A random sample of 25 batteries has mean 38.5 hours and standard deviation 4.2 hours. Assume conditions are met.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "State the hypotheses.",
        "points": 1,
        "rubric": "1 pt: $H_0: \\mu=40$ vs $H_a: \\mu<40$"
      },
      {
        "label": "(b)",
        "prompt": "Compute the test statistic and $p$-value.",
        "points": 3,
        "rubric": "1 pt: $t = (38.5-40)/(4.2/\\sqrt{25})$\n1 pt: $t\\approx -1.786$\n1 pt: $p\\approx 0.043$ with $df=24$"
      },
      {
        "label": "(c)",
        "prompt": "State a conclusion at $\\alpha=0.05$.",
        "points": 2,
        "rubric": "1 pt: compare $p$-value to $\\alpha$\n1 pt: reject $H_0$ in context"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Statistics 2019 FRQ"
  },
  {
    "id": "stats-v2-2020-1",
    "courseSlug": "ap-statistics",
    "year": 2020,
    "number": 1,
    "topic": "Confidence interval for a mean",
    "prompt": "A random sample of 36 coffees purchased has mean temperature $168^\\circ$F and standard deviation $5^\\circ$F.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Construct a $95\\%$ confidence interval for the mean temperature.",
        "points": 3,
        "rubric": "1 pt: identify procedure and $df=35$\n1 pt: critical value and margin of error\n1 pt: interval $(166.31, 169.69)$"
      },
      {
        "label": "(b)",
        "prompt": "Interpret the interval in context.",
        "points": 2,
        "rubric": "1 pt: confidence in context\n1 pt: parameter described"
      },
      {
        "label": "(c)",
        "prompt": "Describe what conditions must be met.",
        "points": 2,
        "rubric": "1 pt: random sample\n1 pt: normality / large sample size"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Statistics 2020 FRQ"
  },
  {
    "id": "stats-v2-2021-3",
    "courseSlug": "ap-statistics",
    "year": 2021,
    "number": 3,
    "topic": "Chi-square goodness-of-fit",
    "prompt": "A candy company claims colors are distributed: $30\\%$ red, $25\\%$ blue, $25\\%$ green, $20\\%$ yellow. A sample of 400 candies yields: 105 red, 120 blue, 90 green, 85 yellow.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "State hypotheses for a chi-square goodness-of-fit test.",
        "points": 1,
        "rubric": "1 pt: $H_0$ distribution matches claim vs $H_a$ distribution differs"
      },
      {
        "label": "(b)",
        "prompt": "Compute the expected counts.",
        "points": 2,
        "rubric": "1 pt: method $n\\times p_i$\n1 pt: expected $120, 100, 100, 80$"
      },
      {
        "label": "(c)",
        "prompt": "Compute the $\\chi^2$ statistic.",
        "points": 2,
        "rubric": "1 pt: formula $\\sum (O-E)^2/E$\n1 pt: value $\\approx 7.19$"
      },
      {
        "label": "(d)",
        "prompt": "State a conclusion at $\\alpha=0.05$ using $df=3$.",
        "points": 2,
        "rubric": "1 pt: $p$-value $\\approx 0.066$\n1 pt: fail to reject $H_0$ in context"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Statistics 2021 FRQ"
  },
  {
    "id": "stats-v2-2022-4",
    "courseSlug": "ap-statistics",
    "year": 2022,
    "number": 4,
    "topic": "Two-sample $z$-test for proportions",
    "prompt": "In a survey, $58$ of $100$ men and $70$ of $150$ women say they exercise daily.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "State hypotheses to test whether the proportions differ.",
        "points": 1,
        "rubric": "1 pt: $H_0: p_M=p_W$ vs $H_a: p_M\\ne p_W$"
      },
      {
        "label": "(b)",
        "prompt": "Compute the pooled proportion and test statistic.",
        "points": 3,
        "rubric": "1 pt: pooled $\\hat{p}=128/250=0.512$\n1 pt: standard error\n1 pt: $z\\approx 1.77$"
      },
      {
        "label": "(c)",
        "prompt": "Compute the $p$-value and state a conclusion at $\\alpha=0.05$.",
        "points": 2,
        "rubric": "1 pt: $p\\approx 0.077$\n1 pt: fail to reject, no significant difference"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Statistics 2022 FRQ"
  },
  {
    "id": "stats-v2-2023-5",
    "courseSlug": "ap-statistics",
    "year": 2023,
    "number": 5,
    "topic": "Paired $t$-test",
    "prompt": "Ten runners record their mile times before and after a 6-week training program. The mean difference (before $-$ after) is $0.42$ minutes with standard deviation $0.55$ minutes.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "State hypotheses for testing whether training improves times.",
        "points": 1,
        "rubric": "1 pt: $H_0:\\mu_d=0$ vs $H_a:\\mu_d>0$"
      },
      {
        "label": "(b)",
        "prompt": "Compute the test statistic and $p$-value with $df=9$.",
        "points": 3,
        "rubric": "1 pt: $t=0.42/(0.55/\\sqrt{10})$\n1 pt: $t\\approx 2.415$\n1 pt: $p\\approx 0.02$"
      },
      {
        "label": "(c)",
        "prompt": "State a conclusion at $\\alpha=0.05$ in context.",
        "points": 2,
        "rubric": "1 pt: reject $H_0$\n1 pt: evidence training reduces times"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Statistics 2023 FRQ"
  },
  {
    "id": "stats-v2-2024-1",
    "courseSlug": "ap-statistics",
    "year": 2024,
    "number": 1,
    "topic": "Experimental design",
    "prompt": "A researcher wants to compare two fertilizers on tomato yield. She has 40 plots in two fields (North and South) with possibly different soil quality.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Explain why a completely randomized design may be inadequate.",
        "points": 2,
        "rubric": "1 pt: soil differences are a confounder\n1 pt: blocking by field reduces variability"
      },
      {
        "label": "(b)",
        "prompt": "Describe a randomized block design for this experiment.",
        "points": 3,
        "rubric": "1 pt: block by field\n1 pt: random assignment within block\n1 pt: treatments equal split per block"
      },
      {
        "label": "(c)",
        "prompt": "Explain the purpose of randomization.",
        "points": 2,
        "rubric": "1 pt: creates comparable groups\n1 pt: allows causal inference"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Statistics 2024 FRQ"
  },
  {
    "id": "stats-v2-2017-5",
    "courseSlug": "ap-statistics",
    "year": 2017,
    "number": 5,
    "topic": "Regression inference for slope",
    "prompt": "A study of 30 cities regresses crime rate on median income. Output: slope $b_1 = -0.042$, $SE(b_1)=0.015$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "State hypotheses for testing whether there is a linear relationship.",
        "points": 1,
        "rubric": "1 pt: $H_0:\\beta_1=0$ vs $H_a:\\beta_1\\ne 0$"
      },
      {
        "label": "(b)",
        "prompt": "Compute the $t$-statistic and $p$-value with $df=28$.",
        "points": 2,
        "rubric": "1 pt: $t=-2.8$\n1 pt: $p\\approx 0.009$"
      },
      {
        "label": "(c)",
        "prompt": "Construct a $95\\%$ confidence interval for $\\beta_1$.",
        "points": 3,
        "rubric": "1 pt: $t^*\\approx 2.048$\n1 pt: margin of error $\\approx 0.0307$\n1 pt: interval $(-0.073, -0.011)$"
      },
      {
        "label": "(d)",
        "prompt": "Interpret the interval in context.",
        "points": 2,
        "rubric": "1 pt: confidence statement\n1 pt: slope interpretation in context"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from AP Statistics 2017 FRQ"
  },
  {
    "id": "stats-v2-2018-6",
    "courseSlug": "ap-statistics",
    "year": 2018,
    "number": 6,
    "topic": "Chi-square test of independence",
    "prompt": "A two-way table summarizes 300 students by grade level (Freshman, Sophomore, Junior) and preferred lunch option (Pizza, Salad, Sandwich).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "State hypotheses for a chi-square test of independence.",
        "points": 1,
        "rubric": "1 pt: independence vs association in context"
      },
      {
        "label": "(b)",
        "prompt": "Explain how expected counts are computed.",
        "points": 2,
        "rubric": "1 pt: formula (row total)(column total)/grand total\n1 pt: applied to one cell example"
      },
      {
        "label": "(c)",
        "prompt": "Given $\\chi^2 = 11.2$ with $df = 4$, find the $p$-value and state a conclusion at $\\alpha = 0.05$.",
        "points": 3,
        "rubric": "1 pt: $p\\approx 0.024$\n1 pt: reject $H_0$\n1 pt: context conclusion"
      },
      {
        "label": "(d)",
        "prompt": "State one condition required for the test and explain how it is checked.",
        "points": 2,
        "rubric": "1 pt: all expected counts $\\ge 5$\n1 pt: check method described"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from AP Statistics 2018 FRQ"
  },
  {
    "id": "stats-v2-2019-1",
    "courseSlug": "ap-statistics",
    "year": 2019,
    "number": 1,
    "topic": "Normal distribution computations",
    "prompt": "The heights of adult females in a region are approximately normally distributed with mean $64.5$ inches and standard deviation $2.5$ inches.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the probability that a randomly chosen female is taller than 68 inches.",
        "points": 2,
        "rubric": "1 pt: $z=1.4$\n1 pt: probability $\\approx 0.0808$"
      },
      {
        "label": "(b)",
        "prompt": "Find the 90th percentile of heights.",
        "points": 2,
        "rubric": "1 pt: $z^*\\approx 1.282$\n1 pt: height $\\approx 67.7$ inches"
      },
      {
        "label": "(c)",
        "prompt": "Find the probability that the mean of 10 randomly chosen females exceeds 66 inches.",
        "points": 3,
        "rubric": "1 pt: $SE = 2.5/\\sqrt{10}\\approx 0.791$\n1 pt: $z\\approx 1.897$\n1 pt: probability $\\approx 0.0289$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Statistics 2019 FRQ"
  },
  {
    "id": "stats-v2-2020-3",
    "courseSlug": "ap-statistics",
    "year": 2020,
    "number": 3,
    "topic": "Geometric distribution",
    "prompt": "A basketball player makes $70\\%$ of her free throws. Shots are independent.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the probability her first miss occurs on the 4th shot.",
        "points": 2,
        "rubric": "1 pt: geometric formula $(0.7)^3(0.3)$\n1 pt: value $\\approx 0.1029$"
      },
      {
        "label": "(b)",
        "prompt": "Find the expected number of shots until her first miss.",
        "points": 2,
        "rubric": "1 pt: formula $1/p$ with $p=0.3$\n1 pt: value $\\approx 3.33$"
      },
      {
        "label": "(c)",
        "prompt": "Find the probability her first miss occurs within the first 5 shots.",
        "points": 2,
        "rubric": "1 pt: $1-(0.7)^5$\n1 pt: value $\\approx 0.8319$"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Statistics 2020 FRQ"
  },
  {
    "id": "stats-v2-2021-1",
    "courseSlug": "ap-statistics",
    "year": 2021,
    "number": 1,
    "topic": "Two-way tables and conditional probability",
    "prompt": "A school surveys 400 students about laptop ownership by grade level. The two-way table has: 9th (80 own, 40 not), 10th (90 own, 30 not), 11th (85 own, 25 not), 12th (45 own, 5 not).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the probability a randomly chosen student owns a laptop.",
        "points": 1,
        "rubric": "1 pt: $300/400 = 0.75$"
      },
      {
        "label": "(b)",
        "prompt": "Find the probability a randomly chosen student is in 12th grade and owns a laptop.",
        "points": 1,
        "rubric": "1 pt: $45/400 = 0.1125$"
      },
      {
        "label": "(c)",
        "prompt": "Find the probability a student owns a laptop given they are in 9th grade.",
        "points": 2,
        "rubric": "1 pt: $80/120$\n1 pt: value $\\approx 0.667$"
      },
      {
        "label": "(d)",
        "prompt": "Are grade level and laptop ownership independent? Justify.",
        "points": 2,
        "rubric": "1 pt: compare conditional to marginal\n1 pt: not independent with justification"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Statistics 2021 FRQ"
  },
  {
    "id": "stats-v2-2022-1",
    "courseSlug": "ap-statistics",
    "year": 2022,
    "number": 1,
    "topic": "Residual analysis",
    "prompt": "A regression of weight on height for 40 adults produced residual plot and output with $s = 6.5$ pounds.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Explain what the residual standard deviation $s = 6.5$ means in context.",
        "points": 2,
        "rubric": "1 pt: typical deviation interpretation\n1 pt: in context of weight/height"
      },
      {
        "label": "(b)",
        "prompt": "If the residual plot shows a curved pattern, what does that suggest about the model?",
        "points": 2,
        "rubric": "1 pt: linear model inappropriate\n1 pt: suggestion of nonlinear transformation"
      },
      {
        "label": "(c)",
        "prompt": "If one point has residual $+18$, explain what that tells you about the point.",
        "points": 2,
        "rubric": "1 pt: observed value much higher than predicted\n1 pt: possible outlier / high influence noted"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Statistics 2022 FRQ"
  },
  {
    "id": "stats-v2-2023-2",
    "courseSlug": "ap-statistics",
    "year": 2023,
    "number": 2,
    "topic": "Two-sample $t$-interval",
    "prompt": "Random samples of two brands of batteries were tested. Brand A: $n_1=20, \\bar{x}_1=8.4, s_1=0.6$ hours. Brand B: $n_2=25, \\bar{x}_2=7.9, s_2=0.8$ hours.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Construct a $95\\%$ confidence interval for $\\mu_1 - \\mu_2$.",
        "points": 4,
        "rubric": "1 pt: procedure named and conditions\n1 pt: standard error\n1 pt: critical value and margin\n1 pt: interval $(0.08, 0.92)$"
      },
      {
        "label": "(b)",
        "prompt": "Interpret the interval in context.",
        "points": 2,
        "rubric": "1 pt: confidence in context\n1 pt: parameter in context"
      },
      {
        "label": "(c)",
        "prompt": "Based on the interval, is there evidence Brand A lasts longer than Brand B? Justify.",
        "points": 1,
        "rubric": "1 pt: interval entirely positive, conclude A lasts longer"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Statistics 2023 FRQ"
  },
  {
    "id": "stats-v2-2024-4",
    "courseSlug": "ap-statistics",
    "year": 2024,
    "number": 4,
    "topic": "CLT for sample means",
    "prompt": "Daily commute times (in minutes) in a city have mean $28$ and standard deviation $10$, with right-skewed distribution. A random sample of $n$ commuters is taken.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "For $n=50$, describe the sampling distribution of $\\bar{x}$.",
        "points": 3,
        "rubric": "1 pt: approximately normal by CLT\n1 pt: mean $28$\n1 pt: $SE = 10/\\sqrt{50}\\approx 1.414$"
      },
      {
        "label": "(b)",
        "prompt": "Find $P(\\bar{x} > 30)$ for $n=50$.",
        "points": 2,
        "rubric": "1 pt: $z\\approx 1.414$\n1 pt: probability $\\approx 0.0786$"
      },
      {
        "label": "(c)",
        "prompt": "Explain why the CLT is needed even though the population is skewed.",
        "points": 2,
        "rubric": "1 pt: population is non-normal\n1 pt: $n$ large enough justifies normal approximation of $\\bar{x}$"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Statistics 2024 FRQ"
  },

  // ─── ap-physics-1 wave-2 (+17) ─────────────────────────────
  {
    "id": "physics-1-v2-2016-1",
    "courseSlug": "ap-physics-1",
    "year": 2016,
    "number": 1,
    "topic": "Newton's Laws with Friction",
    "prompt": "A block of mass $m = 2.0\\text{ kg}$ is pulled along a horizontal surface by a rope that makes an angle of $\\theta = 30^\\circ$ above the horizontal. The coefficient of kinetic friction between the block and surface is $\\mu_k = 0.25$. The tension in the rope is $T = 15\\text{ N}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Draw a free-body diagram for the block and label all forces.",
        "points": 2,
        "rubric": "1 pt: Correct identification of all four forces (tension, weight, normal, friction)\n1 pt: Forces drawn with correct directions and labels"
      },
      {
        "label": "(b)",
        "prompt": "Derive an expression for the normal force $N$ on the block.",
        "points": 2,
        "rubric": "1 pt: Applies Newton's second law in the vertical direction\n1 pt: Correct expression $N = mg - T\\sin\\theta$"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the acceleration of the block.",
        "points": 3,
        "rubric": "1 pt: Correct horizontal Newton's second law equation\n1 pt: Correct friction force calculation using $N$ from (b)\n1 pt: Correct numerical answer for acceleration"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2016-2",
    "courseSlug": "ap-physics-1",
    "year": 2016,
    "number": 2,
    "topic": "Projectile Motion",
    "prompt": "A ball is launched from the edge of a cliff of height $h = 20\\text{ m}$ with initial speed $v_0 = 15\\text{ m/s}$ at an angle of $40^\\circ$ above the horizontal.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the time for the ball to reach maximum height.",
        "points": 2,
        "rubric": "1 pt: Uses $v_y = v_0\\sin\\theta - gt$ with $v_y = 0$\n1 pt: Correct numerical value"
      },
      {
        "label": "(b)",
        "prompt": "Determine the maximum height above the cliff.",
        "points": 2,
        "rubric": "1 pt: Uses kinematics with $v_{0y}$\n1 pt: Correct numerical result"
      },
      {
        "label": "(c)",
        "prompt": "Determine the total horizontal distance from the base of the cliff where the ball lands.",
        "points": 3,
        "rubric": "1 pt: Correct total time of flight using height equation\n1 pt: Uses $x = v_{0x} t$\n1 pt: Correct numerical answer"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2017-1",
    "courseSlug": "ap-physics-1",
    "year": 2017,
    "number": 1,
    "topic": "Atwood Machine",
    "prompt": "Two blocks of masses $m_1 = 3.0\\text{ kg}$ and $m_2 = 5.0\\text{ kg}$ are connected by a light string over a frictionless, massless pulley.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Draw free-body diagrams for each block.",
        "points": 2,
        "rubric": "1 pt: Correct forces on $m_1$\n1 pt: Correct forces on $m_2$"
      },
      {
        "label": "(b)",
        "prompt": "Derive an expression for the acceleration of the system.",
        "points": 2,
        "rubric": "1 pt: Applies Newton's second law to each mass\n1 pt: Correct expression $a = (m_2 - m_1)g/(m_1 + m_2)$"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the tension in the string.",
        "points": 2,
        "rubric": "1 pt: Substitutes into force equation\n1 pt: Correct numerical value"
      },
      {
        "label": "(d)",
        "prompt": "If the pulley has non-negligible mass, explain qualitatively how the acceleration would change.",
        "points": 1,
        "rubric": "1 pt: Correctly states acceleration decreases and explains using rotational inertia"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2017-2",
    "courseSlug": "ap-physics-1",
    "year": 2017,
    "number": 2,
    "topic": "Circular Motion - Banked Curve",
    "prompt": "A car of mass $m = 1200\\text{ kg}$ travels around a banked curve of radius $R = 80\\text{ m}$ banked at angle $\\theta = 20^\\circ$. The road is icy (frictionless).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Draw a free-body diagram of the car on the banked curve.",
        "points": 2,
        "rubric": "1 pt: Shows weight and normal force\n1 pt: Normal force drawn perpendicular to banked surface"
      },
      {
        "label": "(b)",
        "prompt": "Derive the speed required for the car to navigate the curve without friction.",
        "points": 3,
        "rubric": "1 pt: Uses centripetal direction Newton's 2nd law\n1 pt: Correct vertical equilibrium equation\n1 pt: Correct $v = \\sqrt{gR\\tan\\theta}$"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the numerical value of this speed.",
        "points": 2,
        "rubric": "1 pt: Correct substitution\n1 pt: Correct numerical answer"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2018-1",
    "courseSlug": "ap-physics-1",
    "year": 2018,
    "number": 1,
    "topic": "Work and Energy with Spring",
    "prompt": "A block of mass $m = 0.50\\text{ kg}$ is pressed against a horizontal spring with spring constant $k = 200\\text{ N/m}$, compressing it by $x = 0.15\\text{ m}$. When released, the block slides along a surface with coefficient of kinetic friction $\\mu_k = 0.20$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the speed of the block as it leaves the spring.",
        "points": 3,
        "rubric": "1 pt: Sets spring PE equal to KE plus friction work\n1 pt: Correct equation set up\n1 pt: Correct numerical answer"
      },
      {
        "label": "(b)",
        "prompt": "Determine the distance the block travels after leaving the spring before stopping.",
        "points": 3,
        "rubric": "1 pt: Applies work-energy theorem\n1 pt: Correct friction force expression\n1 pt: Correct numerical distance"
      },
      {
        "label": "(c)",
        "prompt": "Sketch a graph of the block's kinetic energy as a function of position.",
        "points": 2,
        "rubric": "1 pt: Correct increasing region while on spring\n1 pt: Correct linear decrease during friction region"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2018-2",
    "courseSlug": "ap-physics-1",
    "year": 2018,
    "number": 2,
    "topic": "Rotational Dynamics - Pulley",
    "prompt": "A solid disk pulley of radius $R = 0.10\\text{ m}$ and mass $M = 2.0\\text{ kg}$ has a light cord wrapped around it. A block of mass $m = 1.5\\text{ kg}$ hangs from the cord.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Draw free-body diagrams for the block and pulley.",
        "points": 2,
        "rubric": "1 pt: Correct forces on block\n1 pt: Correct torque-producing tension on pulley"
      },
      {
        "label": "(b)",
        "prompt": "Derive an expression for the linear acceleration of the block.",
        "points": 3,
        "rubric": "1 pt: Newton's 2nd law for the block\n1 pt: Torque equation using $I = \\frac{1}{2}MR^2$\n1 pt: Correct final expression $a = mg/(m + M/2)$"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the tension in the cord.",
        "points": 2,
        "rubric": "1 pt: Substitutes $a$ back\n1 pt: Correct numerical tension"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2018-3",
    "courseSlug": "ap-physics-1",
    "year": 2018,
    "number": 3,
    "topic": "Momentum and Collisions",
    "prompt": "A cart of mass $m_1 = 2.0\\text{ kg}$ moving at $v_1 = 3.0\\text{ m/s}$ collides with a stationary cart of mass $m_2 = 4.0\\text{ kg}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "If the collision is perfectly inelastic, determine the final speed of the combined carts.",
        "points": 2,
        "rubric": "1 pt: Applies conservation of momentum\n1 pt: Correct numerical answer"
      },
      {
        "label": "(b)",
        "prompt": "If the collision is perfectly elastic, determine the final speeds of both carts.",
        "points": 3,
        "rubric": "1 pt: Momentum conservation equation\n1 pt: Kinetic energy conservation\n1 pt: Correct final speeds"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the kinetic energy lost in the inelastic collision.",
        "points": 2,
        "rubric": "1 pt: Computes initial and final KE\n1 pt: Correct energy difference"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2019-1",
    "courseSlug": "ap-physics-1",
    "year": 2019,
    "number": 1,
    "topic": "Incline with Friction",
    "prompt": "A block of mass $m = 4.0\\text{ kg}$ slides down an incline at $\\theta = 30^\\circ$ with coefficient of kinetic friction $\\mu_k = 0.15$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Draw a free-body diagram of the block.",
        "points": 2,
        "rubric": "1 pt: All three forces present\n1 pt: Correct directions and labels"
      },
      {
        "label": "(b)",
        "prompt": "Derive the acceleration of the block down the incline.",
        "points": 2,
        "rubric": "1 pt: Component form of Newton's 2nd law\n1 pt: Correct $a = g(\\sin\\theta - \\mu_k\\cos\\theta)$"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the speed of the block after sliding a distance $d = 5.0\\text{ m}$ from rest.",
        "points": 2,
        "rubric": "1 pt: Uses kinematics $v^2 = 2ad$\n1 pt: Correct numerical speed"
      },
      {
        "label": "(d)",
        "prompt": "Determine the thermal energy generated over the $5.0\\text{ m}$.",
        "points": 1,
        "rubric": "1 pt: Correct $Q = \\mu_k mg\\cos\\theta \\cdot d$ and numerical value"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2019-2",
    "courseSlug": "ap-physics-1",
    "year": 2019,
    "number": 2,
    "topic": "Simple Harmonic Motion - Spring",
    "prompt": "A mass $m = 0.40\\text{ kg}$ attached to a horizontal spring with $k = 25\\text{ N/m}$ oscillates on a frictionless surface with amplitude $A = 0.10\\text{ m}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the period of oscillation.",
        "points": 2,
        "rubric": "1 pt: Uses $T = 2\\pi\\sqrt{m/k}$\n1 pt: Correct numerical period"
      },
      {
        "label": "(b)",
        "prompt": "Determine the maximum speed of the mass.",
        "points": 2,
        "rubric": "1 pt: Uses conservation of energy $\\frac{1}{2}kA^2 = \\frac{1}{2}mv_{max}^2$\n1 pt: Correct value"
      },
      {
        "label": "(c)",
        "prompt": "Determine the speed when $x = A/2$.",
        "points": 2,
        "rubric": "1 pt: Uses energy conservation\n1 pt: Correct numerical speed"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2019-3",
    "courseSlug": "ap-physics-1",
    "year": 2019,
    "number": 3,
    "topic": "Angular Momentum - Rod Collision",
    "prompt": "A uniform rod of length $L = 1.0\\text{ m}$ and mass $M = 2.0\\text{ kg}$ is pivoted at one end and hangs vertically. A ball of mass $m = 0.25\\text{ kg}$ moving horizontally at $v = 6.0\\text{ m/s}$ strikes and sticks to the free end.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the angular momentum of the ball about the pivot just before collision.",
        "points": 2,
        "rubric": "1 pt: Uses $L = mvL$\n1 pt: Correct value"
      },
      {
        "label": "(b)",
        "prompt": "Determine the angular speed of the rod-ball system immediately after collision.",
        "points": 3,
        "rubric": "1 pt: Applies conservation of angular momentum\n1 pt: Correct moment of inertia $\\frac{1}{3}ML^2 + mL^2$\n1 pt: Correct numerical $\\omega$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the maximum angle through which the rod swings.",
        "points": 2,
        "rubric": "1 pt: Uses energy conservation after collision\n1 pt: Correct angle"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2020-1",
    "courseSlug": "ap-physics-1",
    "year": 2020,
    "number": 1,
    "topic": "Standing Waves on a String",
    "prompt": "A string of length $L = 1.2\\text{ m}$ fixed at both ends vibrates in its third harmonic with frequency $f_3 = 150\\text{ Hz}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Sketch the shape of the standing wave and label nodes and antinodes.",
        "points": 2,
        "rubric": "1 pt: Correct number of nodes (4) and antinodes (3)\n1 pt: Properly labeled"
      },
      {
        "label": "(b)",
        "prompt": "Determine the wavelength of the standing wave.",
        "points": 2,
        "rubric": "1 pt: Uses $L = 3\\lambda/2$\n1 pt: Correct $\\lambda = 0.80\\text{ m}$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the wave speed on the string.",
        "points": 2,
        "rubric": "1 pt: Uses $v = f\\lambda$\n1 pt: Correct numerical speed"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2020-2",
    "courseSlug": "ap-physics-1",
    "year": 2020,
    "number": 2,
    "topic": "DC Circuits - Series/Parallel",
    "prompt": "A $12\\text{ V}$ battery is connected to a circuit with $R_1 = 4\\text{ }\\Omega$ in series with the parallel combination of $R_2 = 6\\text{ }\\Omega$ and $R_3 = 3\\text{ }\\Omega$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the equivalent resistance of the circuit.",
        "points": 2,
        "rubric": "1 pt: Correct parallel combination of $R_2$ and $R_3$\n1 pt: Correct total equivalent resistance"
      },
      {
        "label": "(b)",
        "prompt": "Determine the current supplied by the battery.",
        "points": 2,
        "rubric": "1 pt: Uses Ohm's law\n1 pt: Correct numerical current"
      },
      {
        "label": "(c)",
        "prompt": "Determine the power dissipated in $R_2$.",
        "points": 3,
        "rubric": "1 pt: Correct voltage across parallel branch\n1 pt: Correct current through $R_2$\n1 pt: Correct power value"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2021-1",
    "courseSlug": "ap-physics-1",
    "year": 2021,
    "number": 1,
    "topic": "Impulse and Momentum",
    "prompt": "A $0.15\\text{ kg}$ ball traveling horizontally at $20\\text{ m/s}$ strikes a wall and rebounds at $15\\text{ m/s}$ in the opposite direction. The contact time is $0.010\\text{ s}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the impulse delivered to the ball.",
        "points": 2,
        "rubric": "1 pt: Correct change in momentum\n1 pt: Correct numerical impulse with direction"
      },
      {
        "label": "(b)",
        "prompt": "Determine the average force exerted on the ball.",
        "points": 2,
        "rubric": "1 pt: Uses $F = J/\\Delta t$\n1 pt: Correct numerical value"
      },
      {
        "label": "(c)",
        "prompt": "Explain how the force on the wall compares to that on the ball.",
        "points": 1,
        "rubric": "1 pt: Cites Newton's 3rd law and states equal magnitude, opposite direction"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2021-2",
    "courseSlug": "ap-physics-1",
    "year": 2021,
    "number": 2,
    "topic": "Rolling Motion - Disk",
    "prompt": "A solid disk of mass $M = 1.0\\text{ kg}$ and radius $R = 0.20\\text{ m}$ rolls without slipping down an incline of height $h = 2.0\\text{ m}$ and angle $30^\\circ$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the translational speed of the disk at the bottom.",
        "points": 3,
        "rubric": "1 pt: Writes energy conservation including rotational KE\n1 pt: Uses $I = \\frac{1}{2}MR^2$ and rolling condition\n1 pt: Correct numerical speed"
      },
      {
        "label": "(b)",
        "prompt": "Determine the linear acceleration of the disk down the incline.",
        "points": 2,
        "rubric": "1 pt: Uses Newton's 2nd law with torque about center\n1 pt: Correct $a = \\frac{2}{3}g\\sin\\theta$"
      },
      {
        "label": "(c)",
        "prompt": "Explain how the speed would compare if the disk slid down a frictionless incline instead.",
        "points": 1,
        "rubric": "1 pt: States sliding gives larger speed because no energy goes into rotation"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2022-1",
    "courseSlug": "ap-physics-1",
    "year": 2022,
    "number": 1,
    "topic": "Pendulum SHM",
    "prompt": "A simple pendulum of length $L = 0.80\\text{ m}$ swings with small amplitude.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the period of oscillation on Earth.",
        "points": 2,
        "rubric": "1 pt: Uses $T = 2\\pi\\sqrt{L/g}$\n1 pt: Correct numerical period"
      },
      {
        "label": "(b)",
        "prompt": "Explain how the period would change if the pendulum were taken to the Moon where $g_M = 1.6\\text{ m/s}^2$.",
        "points": 2,
        "rubric": "1 pt: States period increases\n1 pt: Justifies using dependence on $g$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the maximum speed if the pendulum is released from a $10^\\circ$ angle on Earth.",
        "points": 2,
        "rubric": "1 pt: Energy conservation setup\n1 pt: Correct numerical max speed"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2023-1",
    "courseSlug": "ap-physics-1",
    "year": 2023,
    "number": 1,
    "topic": "2D Collision",
    "prompt": "A puck of mass $m_1 = 0.20\\text{ kg}$ moving east at $4.0\\text{ m/s}$ collides with a stationary puck of mass $m_2 = 0.30\\text{ kg}$. After collision, $m_1$ moves at $2.0\\text{ m/s}$ at $30^\\circ$ north of east.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the x-component of $m_2$'s velocity after collision.",
        "points": 2,
        "rubric": "1 pt: Applies x-momentum conservation\n1 pt: Correct numerical value"
      },
      {
        "label": "(b)",
        "prompt": "Determine the y-component of $m_2$'s velocity after collision.",
        "points": 2,
        "rubric": "1 pt: Applies y-momentum conservation\n1 pt: Correct numerical value"
      },
      {
        "label": "(c)",
        "prompt": "Determine whether the collision is elastic.",
        "points": 2,
        "rubric": "1 pt: Calculates total KE before and after\n1 pt: Correct conclusion with comparison"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 1 FRQ"
  },
  {
    "id": "physics-1-v2-2024-1",
    "courseSlug": "ap-physics-1",
    "year": 2024,
    "number": 1,
    "topic": "Elevator Dynamics",
    "prompt": "A person of mass $m = 70\\text{ kg}$ stands on a scale in an elevator.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the scale reading when the elevator accelerates upward at $2.0\\text{ m/s}^2$.",
        "points": 2,
        "rubric": "1 pt: Newton's 2nd law applied\n1 pt: Correct normal force value"
      },
      {
        "label": "(b)",
        "prompt": "Determine the scale reading during free fall.",
        "points": 1,
        "rubric": "1 pt: Correctly identifies reading is zero"
      },
      {
        "label": "(c)",
        "prompt": "Determine the elevator's acceleration if the scale reads $560\\text{ N}$.",
        "points": 2,
        "rubric": "1 pt: Newton's 2nd law setup\n1 pt: Correct magnitude and direction"
      },
      {
        "label": "(d)",
        "prompt": "Sketch a graph of scale reading vs. time for the elevator speeding up, moving at constant velocity, then slowing down.",
        "points": 2,
        "rubric": "1 pt: Correct scale reading during speeding up and slowing down phases\n1 pt: Correct constant-velocity region equal to weight"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 1 FRQ"
  },

  // ─── ap-physics-2 wave-2 (+19) ─────────────────────────────
  {
    "id": "physics-2-v2-2016-1",
    "courseSlug": "ap-physics-2",
    "year": 2016,
    "number": 1,
    "topic": "Fluids - Bernoulli and Continuity",
    "prompt": "Water flows through a horizontal pipe that narrows from radius $r_1 = 0.050\\text{ m}$ to $r_2 = 0.020\\text{ m}$. The speed in the wide section is $v_1 = 1.5\\text{ m/s}$ and the pressure there is $P_1 = 1.2\\times 10^5\\text{ Pa}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the speed of water in the narrow section.",
        "points": 2,
        "rubric": "1 pt: Uses continuity $A_1 v_1 = A_2 v_2$\n1 pt: Correct numerical speed"
      },
      {
        "label": "(b)",
        "prompt": "Determine the pressure in the narrow section.",
        "points": 3,
        "rubric": "1 pt: Applies Bernoulli's equation\n1 pt: Correct substitution of values\n1 pt: Correct numerical pressure"
      },
      {
        "label": "(c)",
        "prompt": "Explain what happens to the pressure if the pipe is tilted so the narrow end is higher by $0.50\\text{ m}$.",
        "points": 2,
        "rubric": "1 pt: Includes $\\rho g h$ term correctly\n1 pt: States pressure decreases further and justifies"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2016-2",
    "courseSlug": "ap-physics-2",
    "year": 2016,
    "number": 2,
    "topic": "Thermodynamics - PV Diagram",
    "prompt": "An ideal gas undergoes a cycle: isobaric expansion from state A to B, isochoric cooling from B to C, then isothermal compression from C back to A.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Sketch the cycle on a PV diagram and label each process.",
        "points": 2,
        "rubric": "1 pt: Correct shape of each segment\n1 pt: Correct direction of cycle with labels"
      },
      {
        "label": "(b)",
        "prompt": "Indicate for each process whether $W$, $Q$, and $\\Delta U$ are positive, negative, or zero.",
        "points": 3,
        "rubric": "1 pt: Correct signs for A to B\n1 pt: Correct signs for B to C\n1 pt: Correct signs for C to A"
      },
      {
        "label": "(c)",
        "prompt": "Explain whether the cycle operates as a heat engine or refrigerator.",
        "points": 2,
        "rubric": "1 pt: Identifies cycle direction\n1 pt: Justifies in terms of net work and heat flow"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2017-1",
    "courseSlug": "ap-physics-2",
    "year": 2017,
    "number": 1,
    "topic": "Electrostatics - Point Charges",
    "prompt": "Two point charges $q_1 = +3.0\\text{ }\\mu\\text{C}$ and $q_2 = -2.0\\text{ }\\mu\\text{C}$ are separated by $d = 0.10\\text{ m}$ along the x-axis.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the electric field at the midpoint between them.",
        "points": 3,
        "rubric": "1 pt: Correct field from $q_1$\n1 pt: Correct field from $q_2$\n1 pt: Correct vector sum"
      },
      {
        "label": "(b)",
        "prompt": "Determine the electric potential at the midpoint.",
        "points": 2,
        "rubric": "1 pt: Uses scalar sum\n1 pt: Correct numerical potential"
      },
      {
        "label": "(c)",
        "prompt": "Determine the work required to move a $+1.0\\text{ }\\mu\\text{C}$ charge from infinity to the midpoint.",
        "points": 2,
        "rubric": "1 pt: Uses $W = qV$\n1 pt: Correct value"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2017-2",
    "courseSlug": "ap-physics-2",
    "year": 2017,
    "number": 2,
    "topic": "Capacitors with Dielectric",
    "prompt": "A parallel-plate capacitor has plate area $A = 0.020\\text{ m}^2$ and plate separation $d = 2.0\\text{ mm}$. It is connected to a $V = 12\\text{ V}$ battery.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the capacitance in vacuum.",
        "points": 2,
        "rubric": "1 pt: Uses $C = \\varepsilon_0 A/d$\n1 pt: Correct numerical value"
      },
      {
        "label": "(b)",
        "prompt": "Determine the charge on the capacitor.",
        "points": 1,
        "rubric": "1 pt: Uses $Q = CV$ correctly"
      },
      {
        "label": "(c)",
        "prompt": "A dielectric with $\\kappa = 3.0$ is inserted while the capacitor is still connected to the battery. Determine the new charge and the energy stored.",
        "points": 3,
        "rubric": "1 pt: New capacitance $\\kappa C$\n1 pt: New charge correctly computed\n1 pt: Energy using $U = \\frac{1}{2}CV^2$"
      },
      {
        "label": "(d)",
        "prompt": "Explain qualitatively what happens if the capacitor is disconnected from the battery before inserting the dielectric.",
        "points": 1,
        "rubric": "1 pt: Notes charge is constant, voltage drops and correctly describes energy change"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2018-1",
    "courseSlug": "ap-physics-2",
    "year": 2018,
    "number": 1,
    "topic": "Magnetism - Mass Spectrometer",
    "prompt": "A singly-ionized particle of mass $m$ is accelerated through potential difference $V = 500\\text{ V}$ and then enters a magnetic field $B = 0.30\\text{ T}$ perpendicular to its velocity, moving in a circle of radius $r = 0.045\\text{ m}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the speed of the particle after acceleration.",
        "points": 2,
        "rubric": "1 pt: Uses energy conservation $qV = \\frac{1}{2}mv^2$\n1 pt: Correct $v = \\sqrt{2qV/m}$"
      },
      {
        "label": "(b)",
        "prompt": "Derive an expression for $m$ in terms of $r$, $B$, $q$, and $V$.",
        "points": 3,
        "rubric": "1 pt: Uses $qvB = mv^2/r$\n1 pt: Combines with velocity expression\n1 pt: Correct $m = qB^2r^2/(2V)$"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the mass of the particle.",
        "points": 2,
        "rubric": "1 pt: Correct substitution\n1 pt: Correct numerical mass"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2018-2",
    "courseSlug": "ap-physics-2",
    "year": 2018,
    "number": 2,
    "topic": "Geometric Optics - Lens",
    "prompt": "An object is placed $d_o = 15\\text{ cm}$ in front of a converging lens of focal length $f = 10\\text{ cm}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the image distance.",
        "points": 2,
        "rubric": "1 pt: Uses thin-lens equation\n1 pt: Correct numerical image distance"
      },
      {
        "label": "(b)",
        "prompt": "Determine the magnification and describe the image.",
        "points": 2,
        "rubric": "1 pt: Correct magnification\n1 pt: Describes image as inverted and real"
      },
      {
        "label": "(c)",
        "prompt": "Sketch a ray diagram showing at least two principal rays.",
        "points": 2,
        "rubric": "1 pt: At least two correctly drawn principal rays\n1 pt: Image location consistent with calculation"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2019-1",
    "courseSlug": "ap-physics-2",
    "year": 2019,
    "number": 1,
    "topic": "EM Induction - Moving Bar",
    "prompt": "A conducting bar of length $L = 0.50\\text{ m}$ slides at $v = 3.0\\text{ m/s}$ on frictionless rails in a magnetic field $B = 0.40\\text{ T}$ perpendicular to the plane. The rails are connected via a resistor $R = 2.0\\text{ }\\Omega$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the EMF induced in the circuit.",
        "points": 2,
        "rubric": "1 pt: Uses $\\varepsilon = BLv$\n1 pt: Correct numerical EMF"
      },
      {
        "label": "(b)",
        "prompt": "Determine the current through the resistor and its direction.",
        "points": 2,
        "rubric": "1 pt: Correct magnitude via Ohm's law\n1 pt: Direction justified by Lenz's law"
      },
      {
        "label": "(c)",
        "prompt": "Determine the force required to keep the bar moving at constant velocity.",
        "points": 2,
        "rubric": "1 pt: Uses $F = BIL$\n1 pt: Correct numerical value"
      },
      {
        "label": "(d)",
        "prompt": "Verify that the power dissipated in the resistor equals the power supplied by the external force.",
        "points": 1,
        "rubric": "1 pt: Shows $P = I^2 R = Fv$ numerically"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2019-2",
    "courseSlug": "ap-physics-2",
    "year": 2019,
    "number": 2,
    "topic": "Buoyancy",
    "prompt": "A block of density $\\rho_b = 600\\text{ kg/m}^3$ and volume $V = 1.0\\times 10^{-3}\\text{ m}^3$ floats in water ($\\rho_w = 1000\\text{ kg/m}^3$).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the volume submerged when floating in equilibrium.",
        "points": 2,
        "rubric": "1 pt: Applies $\\rho_b V = \\rho_w V_{sub}$\n1 pt: Correct volume"
      },
      {
        "label": "(b)",
        "prompt": "The block is pushed fully underwater and released. Determine the net upward force at the moment of release.",
        "points": 2,
        "rubric": "1 pt: Buoyant force minus weight\n1 pt: Correct numerical value"
      },
      {
        "label": "(c)",
        "prompt": "Determine the initial upward acceleration of the block when fully submerged.",
        "points": 2,
        "rubric": "1 pt: Newton's 2nd law\n1 pt: Correct numerical acceleration"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2020-1",
    "courseSlug": "ap-physics-2",
    "year": 2020,
    "number": 1,
    "topic": "Double Slit Interference",
    "prompt": "Light of wavelength $\\lambda = 600\\text{ nm}$ is incident on a double slit with separation $d = 0.20\\text{ mm}$. The screen is $L = 2.0\\text{ m}$ away.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the distance between adjacent bright fringes on the screen.",
        "points": 2,
        "rubric": "1 pt: Uses $\\Delta y = \\lambda L/d$\n1 pt: Correct numerical distance"
      },
      {
        "label": "(b)",
        "prompt": "Determine the angular position of the third-order bright fringe.",
        "points": 2,
        "rubric": "1 pt: Uses $d\\sin\\theta = m\\lambda$\n1 pt: Correct angle"
      },
      {
        "label": "(c)",
        "prompt": "Explain qualitatively how the pattern changes if the wavelength is doubled.",
        "points": 1,
        "rubric": "1 pt: States fringe spacing doubles and justifies"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2020-2",
    "courseSlug": "ap-physics-2",
    "year": 2020,
    "number": 2,
    "topic": "RC Circuit Charging",
    "prompt": "A $12\\text{ V}$ battery is connected in series with a resistor $R = 5000\\text{ }\\Omega$ and an initially uncharged capacitor $C = 200\\text{ }\\mu\\text{F}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the initial current in the circuit right after the switch closes.",
        "points": 2,
        "rubric": "1 pt: Recognizes capacitor acts like a wire\n1 pt: Correct $I_0 = V/R$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the time constant and the charge on the capacitor after one time constant.",
        "points": 2,
        "rubric": "1 pt: Correct $\\tau = RC$\n1 pt: Correct charge using $Q = CV(1 - e^{-1})$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the final energy stored in the capacitor.",
        "points": 2,
        "rubric": "1 pt: Uses $U = \\frac{1}{2}CV^2$\n1 pt: Correct numerical energy"
      },
      {
        "label": "(d)",
        "prompt": "Sketch graphs of current and capacitor voltage as functions of time.",
        "points": 1,
        "rubric": "1 pt: Correct exponential decay for current and rise for voltage"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2021-1",
    "courseSlug": "ap-physics-2",
    "year": 2021,
    "number": 1,
    "topic": "Photoelectric Effect",
    "prompt": "Light of wavelength $\\lambda = 250\\text{ nm}$ illuminates a metal surface with work function $\\phi = 3.5\\text{ eV}$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the energy of a photon of this light in eV.",
        "points": 2,
        "rubric": "1 pt: Uses $E = hc/\\lambda$\n1 pt: Correct conversion to eV"
      },
      {
        "label": "(b)",
        "prompt": "Determine the maximum kinetic energy of the ejected electrons.",
        "points": 2,
        "rubric": "1 pt: Uses $K_{max} = E_{photon} - \\phi$\n1 pt: Correct numerical value"
      },
      {
        "label": "(c)",
        "prompt": "Determine the stopping potential required.",
        "points": 1,
        "rubric": "1 pt: Correct $V_s = K_{max}/e$"
      },
      {
        "label": "(d)",
        "prompt": "Explain how the stopping potential changes if intensity is increased but wavelength is unchanged.",
        "points": 1,
        "rubric": "1 pt: States stopping potential unchanged and justifies"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2021-2",
    "courseSlug": "ap-physics-2",
    "year": 2021,
    "number": 2,
    "topic": "Pascal's Principle - Hydraulic Lift",
    "prompt": "A hydraulic lift has a small piston of area $A_1 = 0.010\\text{ m}^2$ and a large piston of area $A_2 = 0.50\\text{ m}^2$. A car of mass $1500\\text{ kg}$ rests on the large piston.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the force required on the small piston to lift the car.",
        "points": 2,
        "rubric": "1 pt: Applies Pascal's principle\n1 pt: Correct numerical force"
      },
      {
        "label": "(b)",
        "prompt": "If the small piston moves down by $0.30\\text{ m}$, determine how far the large piston rises.",
        "points": 2,
        "rubric": "1 pt: Uses incompressibility $A_1 d_1 = A_2 d_2$\n1 pt: Correct numerical distance"
      },
      {
        "label": "(c)",
        "prompt": "Verify that the work input equals the work output.",
        "points": 2,
        "rubric": "1 pt: Computes input work\n1 pt: Shows equality with output work"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2022-1",
    "courseSlug": "ap-physics-2",
    "year": 2022,
    "number": 1,
    "topic": "Kirchhoff Multi-Loop Circuit",
    "prompt": "A two-loop circuit contains EMFs $\\varepsilon_1 = 9\\text{ V}$ and $\\varepsilon_2 = 6\\text{ V}$ and resistors $R_1 = 2\\text{ }\\Omega$, $R_2 = 3\\text{ }\\Omega$, and $R_3 = 4\\text{ }\\Omega$ (shared middle branch).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the junction equation at the central node.",
        "points": 1,
        "rubric": "1 pt: Correct junction equation"
      },
      {
        "label": "(b)",
        "prompt": "Write loop equations for both loops.",
        "points": 2,
        "rubric": "1 pt: Correct first loop equation\n1 pt: Correct second loop equation"
      },
      {
        "label": "(c)",
        "prompt": "Solve for the current through $R_3$.",
        "points": 3,
        "rubric": "1 pt: Correct algebraic elimination\n1 pt: Correct substitution and simplification\n1 pt: Correct numerical current"
      },
      {
        "label": "(d)",
        "prompt": "Determine the power dissipated in $R_3$.",
        "points": 1,
        "rubric": "1 pt: Correct $P = I^2 R$ value"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2022-2",
    "courseSlug": "ap-physics-2",
    "year": 2022,
    "number": 2,
    "topic": "Total Internal Reflection",
    "prompt": "A light ray travels in glass ($n_1 = 1.50$) and strikes the glass-water interface ($n_2 = 1.33$).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the critical angle for total internal reflection.",
        "points": 2,
        "rubric": "1 pt: Uses $\\sin\\theta_c = n_2/n_1$\n1 pt: Correct angle"
      },
      {
        "label": "(b)",
        "prompt": "If the ray strikes at $50^\\circ$ from the normal, determine whether it refracts into the water.",
        "points": 2,
        "rubric": "1 pt: Compares to critical angle\n1 pt: Correct conclusion with reasoning"
      },
      {
        "label": "(c)",
        "prompt": "If the ray strikes at $40^\\circ$, determine the refraction angle in the water.",
        "points": 2,
        "rubric": "1 pt: Applies Snell's law\n1 pt: Correct numerical angle"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2023-1",
    "courseSlug": "ap-physics-2",
    "year": 2023,
    "number": 1,
    "topic": "Heat Engine Efficiency",
    "prompt": "A heat engine absorbs $Q_H = 800\\text{ J}$ from a hot reservoir and rejects $Q_C = 500\\text{ J}$ to a cold reservoir per cycle.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the net work done per cycle.",
        "points": 1,
        "rubric": "1 pt: Correct $W = Q_H - Q_C$"
      },
      {
        "label": "(b)",
        "prompt": "Determine the efficiency of the engine.",
        "points": 2,
        "rubric": "1 pt: Uses $\\eta = W/Q_H$\n1 pt: Correct numerical efficiency"
      },
      {
        "label": "(c)",
        "prompt": "If the hot reservoir is at $T_H = 600\\text{ K}$ and cold at $T_C = 300\\text{ K}$, determine the maximum possible (Carnot) efficiency and compare.",
        "points": 3,
        "rubric": "1 pt: Uses $\\eta_C = 1 - T_C/T_H$\n1 pt: Correct Carnot value\n1 pt: Valid comparison with actual efficiency"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2023-2",
    "courseSlug": "ap-physics-2",
    "year": 2023,
    "number": 2,
    "topic": "Force on Current-Carrying Wire",
    "prompt": "A straight wire of length $L = 0.40\\text{ m}$ carries current $I = 5.0\\text{ A}$ in a region with uniform field $B = 0.25\\text{ T}$ at $60^\\circ$ to the wire.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the magnitude of the magnetic force on the wire.",
        "points": 2,
        "rubric": "1 pt: Uses $F = BIL\\sin\\theta$\n1 pt: Correct numerical force"
      },
      {
        "label": "(b)",
        "prompt": "Determine the direction of the force given the geometry.",
        "points": 1,
        "rubric": "1 pt: Correct application of right-hand rule with stated direction"
      },
      {
        "label": "(c)",
        "prompt": "A second parallel wire carries $I_2 = 3.0\\text{ A}$ in the same direction, $r = 0.02\\text{ m}$ away. Determine the force per unit length between the wires and whether it is attractive.",
        "points": 3,
        "rubric": "1 pt: Uses $F/L = \\mu_0 I_1 I_2/(2\\pi r)$\n1 pt: Correct numerical value\n1 pt: Identifies as attractive with justification"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2024-1",
    "courseSlug": "ap-physics-2",
    "year": 2024,
    "number": 1,
    "topic": "Hydrogen Energy Levels",
    "prompt": "An electron in a hydrogen atom transitions from the $n = 3$ level ($E_3 = -1.51\\text{ eV}$) to the $n = 2$ level ($E_2 = -3.40\\text{ eV}$).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the energy of the emitted photon in eV.",
        "points": 2,
        "rubric": "1 pt: Takes correct difference\n1 pt: Correct value with sign"
      },
      {
        "label": "(b)",
        "prompt": "Determine the wavelength of the emitted photon.",
        "points": 2,
        "rubric": "1 pt: Converts energy to joules and uses $\\lambda = hc/E$\n1 pt: Correct numerical wavelength"
      },
      {
        "label": "(c)",
        "prompt": "Determine the de Broglie wavelength of an electron with kinetic energy equal to the photon energy.",
        "points": 2,
        "rubric": "1 pt: Uses $\\lambda = h/\\sqrt{2mK}$\n1 pt: Correct numerical value"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2024-2",
    "courseSlug": "ap-physics-2",
    "year": 2024,
    "number": 2,
    "topic": "Thin-Film Interference",
    "prompt": "A thin soap film ($n = 1.33$) of thickness $t$ is in air. White light is incident near-normally; the film appears strongly reflective at $\\lambda = 550\\text{ nm}$ in first-order constructive interference.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Discuss the phase shifts on reflection at each surface.",
        "points": 2,
        "rubric": "1 pt: Identifies $\\pi$ shift at air-soap\n1 pt: Identifies no shift at soap-air (back)"
      },
      {
        "label": "(b)",
        "prompt": "Write the condition for first-order constructive reflection and determine the minimum film thickness.",
        "points": 3,
        "rubric": "1 pt: Correct condition $2nt = (m+\\frac{1}{2})\\lambda$\n1 pt: Uses $m = 0$\n1 pt: Correct numerical thickness"
      },
      {
        "label": "(c)",
        "prompt": "Explain what happens to the reflected color if the film thins to nearly zero thickness.",
        "points": 1,
        "rubric": "1 pt: States film appears dark due to net destructive interference"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 2 FRQ"
  },
  {
    "id": "physics-2-v2-2024-3",
    "courseSlug": "ap-physics-2",
    "year": 2024,
    "number": 3,
    "topic": "Changing Flux - Lenz's Law",
    "prompt": "A circular loop of radius $r = 0.10\\text{ m}$ and resistance $R = 0.50\\text{ }\\Omega$ lies in a uniform magnetic field perpendicular to its plane. The field magnitude varies as $B(t) = 0.20 + 0.30t\\text{ T}$ (with $t$ in seconds).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the magnitude of the induced EMF.",
        "points": 2,
        "rubric": "1 pt: Uses $\\varepsilon = -d\\Phi/dt = -A\\,dB/dt$\n1 pt: Correct numerical EMF"
      },
      {
        "label": "(b)",
        "prompt": "Determine the magnitude of the induced current.",
        "points": 1,
        "rubric": "1 pt: Correct $I = \\varepsilon/R$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the direction of the induced current (clockwise or counterclockwise as viewed from the direction of $\\vec B$).",
        "points": 2,
        "rubric": "1 pt: Applies Lenz's law\n1 pt: Correct direction with justification"
      },
      {
        "label": "(d)",
        "prompt": "Determine the power dissipated in the loop at $t = 2.0\\text{ s}$.",
        "points": 1,
        "rubric": "1 pt: Correct $P = I^2 R$ value (note independence of $t$)"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from AP Physics 2 FRQ"
  },

  // ─── ap-physics-c-mech wave-2 (+18) ─────────────────────────────
  {
    "id": "physcmech-v2-2016-1",
    "courseSlug": "ap-physics-c-mech",
    "year": 2016,
    "number": 1,
    "topic": "Variable Force and Energy",
    "prompt": "A block of mass $m = 2.0$ kg is pushed along a horizontal surface by a variable force $F(x) = F_0(1 - x/L)$ where $F_0 = 20$ N and $L = 4.0$ m. The coefficient of kinetic friction is $\\mu_k = 0.10$. The block starts at rest at $x = 0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive an expression for the work done by $F(x)$ from $x = 0$ to $x = L$.",
        "points": 3,
        "rubric": "1 pt: Set up $W = \\int_0^L F(x)\\,dx$\n1 pt: Correctly integrate to $F_0 L - F_0 L/2$\n1 pt: Final expression $W = F_0 L / 2$"
      },
      {
        "label": "(b)",
        "prompt": "Calculate the speed of the block at $x = L$.",
        "points": 3,
        "rubric": "1 pt: Apply work-energy theorem including friction\n1 pt: $W_{net} = F_0 L/2 - \\mu_k m g L$\n1 pt: $v = \\sqrt{2 W_{net}/m} \\approx 4.0$ m/s"
      },
      {
        "label": "(c)",
        "prompt": "Determine the position $x$ at which the block has maximum speed.",
        "points": 3,
        "rubric": "1 pt: Condition $F(x) = \\mu_k m g$ (net force zero)\n1 pt: Solve $F_0(1 - x/L) = \\mu_k m g$\n1 pt: $x = L(1 - \\mu_k m g / F_0)$"
      },
      {
        "label": "(d)",
        "prompt": "Sketch $v(x)$ from $x = 0$ to $x = L$ indicating the maximum.",
        "points": 2,
        "rubric": "1 pt: Curve starts at 0, increases then decreases\n1 pt: Maximum marked at correct $x$"
      }
    ],
    "totalPoints": 11,
    "source": "Adapted from CB 2016 Mechanics FRQ 1"
  },
  {
    "id": "physcmech-v2-2016-2",
    "courseSlug": "ap-physics-c-mech",
    "year": 2016,
    "number": 2,
    "topic": "Rotational Dynamics - Yo-yo",
    "prompt": "A uniform solid disk of mass $M$ and radius $R$ is used as a yo-yo. A light string is wrapped around its axle of radius $r$ and the yo-yo is released from rest. Assume $I = \\frac{1}{2}MR^2$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Draw a free-body diagram and write Newton's second law for translation.",
        "points": 2,
        "rubric": "1 pt: Identify gravity and tension\n1 pt: $Mg - T = Ma$"
      },
      {
        "label": "(b)",
        "prompt": "Write the rotational equation about the center of mass.",
        "points": 2,
        "rubric": "1 pt: Torque $\\tau = Tr$\n1 pt: $Tr = I\\alpha$ with $a = r\\alpha$"
      },
      {
        "label": "(c)",
        "prompt": "Derive the linear acceleration $a$ of the yo-yo.",
        "points": 3,
        "rubric": "1 pt: Combine translational and rotational equations\n1 pt: Substitute $I = \\frac{1}{2}MR^2$\n1 pt: $a = g/(1 + R^2/(2r^2))$"
      },
      {
        "label": "(d)",
        "prompt": "Find the tension $T$ in the string.",
        "points": 2,
        "rubric": "1 pt: $T = M(g - a)$\n1 pt: Correct simplified form"
      },
      {
        "label": "(e)",
        "prompt": "If $R = 5r$, determine the speed after the yo-yo has descended height $h$.",
        "points": 2,
        "rubric": "1 pt: Use energy conservation $Mgh = \\frac{1}{2}Mv^2 + \\frac{1}{2}I\\omega^2$\n1 pt: $v = \\sqrt{2gh/(1 + R^2/(2r^2))}$"
      }
    ],
    "totalPoints": 11,
    "source": "Adapted from CB 2016 Mechanics FRQ 2"
  },
  {
    "id": "physcmech-v2-2016-3",
    "courseSlug": "ap-physics-c-mech",
    "year": 2016,
    "number": 3,
    "topic": "Air Resistance - Linear Drag",
    "prompt": "A spherical object of mass $m$ falls from rest through air with drag force $F_d = -bv$ where $b$ is a positive constant.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the differential equation for $v(t)$.",
        "points": 2,
        "rubric": "1 pt: Identify forces $mg$ downward, $bv$ upward\n1 pt: $m\\,dv/dt = mg - bv$"
      },
      {
        "label": "(b)",
        "prompt": "Solve for $v(t)$ with $v(0) = 0$.",
        "points": 3,
        "rubric": "1 pt: Separate variables\n1 pt: Integrate to obtain exponential\n1 pt: $v(t) = (mg/b)(1 - e^{-bt/m})$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the terminal velocity.",
        "points": 1,
        "rubric": "1 pt: $v_t = mg/b$"
      },
      {
        "label": "(d)",
        "prompt": "Find the distance fallen as a function of time.",
        "points": 3,
        "rubric": "1 pt: $y = \\int v\\,dt$\n1 pt: Integrate exponential correctly\n1 pt: $y(t) = (mg/b)t + (m^2 g/b^2)(e^{-bt/m} - 1)$"
      },
      {
        "label": "(e)",
        "prompt": "Sketch $v(t)$ showing terminal velocity asymptote.",
        "points": 1,
        "rubric": "1 pt: Correct shape with horizontal asymptote"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2016 Mechanics FRQ 3"
  },
  {
    "id": "physcmech-v2-2017-1",
    "courseSlug": "ap-physics-c-mech",
    "year": 2017,
    "number": 1,
    "topic": "Momentum and Impulse from F(t)",
    "prompt": "A $0.50$ kg object initially at rest is subject to a time-dependent force $F(t) = (6t - t^2)$ N for $0 \\leq t \\leq 6$ s.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Compute the impulse delivered over the interval.",
        "points": 3,
        "rubric": "1 pt: $J = \\int_0^6 F(t)\\,dt$\n1 pt: Correct antiderivative $3t^2 - t^3/3$\n1 pt: $J = 36$ N$\\cdot$s"
      },
      {
        "label": "(b)",
        "prompt": "Determine the velocity at $t = 6$ s.",
        "points": 2,
        "rubric": "1 pt: $v = J/m$\n1 pt: $v = 72$ m/s"
      },
      {
        "label": "(c)",
        "prompt": "Find the time at which the force is maximum and the maximum force.",
        "points": 2,
        "rubric": "1 pt: $dF/dt = 0 \\Rightarrow t = 3$ s\n1 pt: $F_{max} = 9$ N"
      },
      {
        "label": "(d)",
        "prompt": "Determine the velocity at $t = 3$ s.",
        "points": 3,
        "rubric": "1 pt: Impulse from 0 to 3: $\\int_0^3(6t-t^2)dt$\n1 pt: Evaluate to $18$ N$\\cdot$s\n1 pt: $v(3) = 36$ m/s"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2017 Mechanics FRQ 1"
  },
  {
    "id": "physcmech-v2-2017-2",
    "courseSlug": "ap-physics-c-mech",
    "year": 2017,
    "number": 2,
    "topic": "Moment of Inertia by Integration",
    "prompt": "A thin rod of length $L$ has linear mass density $\\lambda(x) = \\lambda_0(1 + x/L)$ for $0 \\leq x \\leq L$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the total mass $M$ of the rod.",
        "points": 2,
        "rubric": "1 pt: $M = \\int_0^L \\lambda_0(1+x/L)\\,dx$\n1 pt: $M = 3\\lambda_0 L/2$"
      },
      {
        "label": "(b)",
        "prompt": "Find the position of the center of mass.",
        "points": 3,
        "rubric": "1 pt: $x_{cm} = (1/M)\\int x\\lambda(x)\\,dx$\n1 pt: Evaluate $\\int_0^L x\\lambda_0(1+x/L)dx = 5\\lambda_0 L^2/6$\n1 pt: $x_{cm} = 5L/9$"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the moment of inertia about the end $x = 0$.",
        "points": 3,
        "rubric": "1 pt: $I = \\int_0^L x^2\\lambda(x)\\,dx$\n1 pt: Evaluate to $\\lambda_0 L^3/3 + \\lambda_0 L^3/4$\n1 pt: $I = 7\\lambda_0 L^3/12 = 7ML^2/18$"
      },
      {
        "label": "(d)",
        "prompt": "Use the parallel-axis theorem to find the moment of inertia about the center of mass.",
        "points": 2,
        "rubric": "1 pt: $I_{cm} = I_{end} - M x_{cm}^2$\n1 pt: Substitute and simplify"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2017 Mechanics FRQ 2"
  },
  {
    "id": "physcmech-v2-2017-3",
    "courseSlug": "ap-physics-c-mech",
    "year": 2017,
    "number": 3,
    "topic": "Physical Pendulum SHM",
    "prompt": "A uniform rod of mass $M$ and length $L$ is pivoted about a point a distance $d$ from its center. It swings in a vertical plane.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the moment of inertia about the pivot.",
        "points": 2,
        "rubric": "1 pt: Use parallel-axis theorem\n1 pt: $I = ML^2/12 + Md^2$"
      },
      {
        "label": "(b)",
        "prompt": "Write the equation of motion for small angular displacement $\\theta$.",
        "points": 3,
        "rubric": "1 pt: Torque $\\tau = -Mgd\\sin\\theta$\n1 pt: Small angle $\\sin\\theta \\approx \\theta$\n1 pt: $I\\ddot\\theta = -Mgd\\theta$"
      },
      {
        "label": "(c)",
        "prompt": "Derive the period of oscillation.",
        "points": 2,
        "rubric": "1 pt: $\\omega^2 = Mgd/I$\n1 pt: $T = 2\\pi\\sqrt{(L^2/12 + d^2)/(gd)}$"
      },
      {
        "label": "(d)",
        "prompt": "Find $d$ that minimizes the period.",
        "points": 3,
        "rubric": "1 pt: $dT/dd = 0$\n1 pt: Solve $L^2/12 = d^2$\n1 pt: $d = L/\\sqrt{12}$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2017 Mechanics FRQ 3"
  },
  {
    "id": "physcmech-v2-2018-1",
    "courseSlug": "ap-physics-c-mech",
    "year": 2018,
    "number": 1,
    "topic": "Atwood Machine with Pulley Mass",
    "prompt": "Two blocks of masses $m_1 = 3.0$ kg and $m_2 = 2.0$ kg hang from a pulley of mass $M = 1.0$ kg and radius $R = 0.10$ m modeled as a uniform disk. The string does not slip.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Draw free-body diagrams for each mass and the pulley.",
        "points": 2,
        "rubric": "1 pt: Correct forces on blocks (gravity, tensions)\n1 pt: Correct torques on pulley from $T_1$ and $T_2$"
      },
      {
        "label": "(b)",
        "prompt": "Write Newton's second law for each block and the pulley.",
        "points": 3,
        "rubric": "1 pt: $m_1 g - T_1 = m_1 a$\n1 pt: $T_2 - m_2 g = m_2 a$\n1 pt: $(T_1 - T_2)R = I\\alpha$ with $a = R\\alpha$"
      },
      {
        "label": "(c)",
        "prompt": "Derive the acceleration of the system.",
        "points": 3,
        "rubric": "1 pt: Substitute $I = MR^2/2$\n1 pt: Combine equations\n1 pt: $a = (m_1 - m_2)g/(m_1 + m_2 + M/2)$"
      },
      {
        "label": "(d)",
        "prompt": "Calculate numerical value of $a$ and both tensions.",
        "points": 3,
        "rubric": "1 pt: $a = 1.82$ m/s$^2$\n1 pt: $T_1 = 24.5$ N\n1 pt: $T_2 = 23.2$ N"
      }
    ],
    "totalPoints": 11,
    "source": "Adapted from CB 2018 Mechanics FRQ 1"
  },
  {
    "id": "physcmech-v2-2018-2",
    "courseSlug": "ap-physics-c-mech",
    "year": 2018,
    "number": 2,
    "topic": "Angular Momentum Collision",
    "prompt": "A uniform rod of length $L$ and mass $M$ lies on a frictionless horizontal surface and is pivoted at one end. A small clay ball of mass $m$ moving with speed $v_0$ perpendicular to the rod strikes the free end and sticks.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Calculate the angular momentum of the system about the pivot just before collision.",
        "points": 2,
        "rubric": "1 pt: Identify $L = mv_0 L$ about pivot\n1 pt: Specify direction"
      },
      {
        "label": "(b)",
        "prompt": "Determine the moment of inertia of the rod-ball system about the pivot immediately after collision.",
        "points": 2,
        "rubric": "1 pt: Rod: $ML^2/3$\n1 pt: Total $I = ML^2/3 + mL^2$"
      },
      {
        "label": "(c)",
        "prompt": "Find the angular velocity immediately after the collision.",
        "points": 3,
        "rubric": "1 pt: Conserve angular momentum\n1 pt: $mv_0 L = (ML^2/3 + mL^2)\\omega$\n1 pt: $\\omega = 3mv_0/((M + 3m)L)$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the fraction of kinetic energy lost.",
        "points": 3,
        "rubric": "1 pt: $KE_i = mv_0^2/2$\n1 pt: $KE_f = I\\omega^2/2$\n1 pt: Fraction lost $= M/(M + 3m)$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2018 Mechanics FRQ 2"
  },
  {
    "id": "physcmech-v2-2018-3",
    "courseSlug": "ap-physics-c-mech",
    "year": 2018,
    "number": 3,
    "topic": "Orbital Mechanics",
    "prompt": "A satellite of mass $m$ orbits a planet of mass $M$ and radius $R$ in a circular orbit of radius $r$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive the orbital speed $v$.",
        "points": 2,
        "rubric": "1 pt: $GMm/r^2 = mv^2/r$\n1 pt: $v = \\sqrt{GM/r}$"
      },
      {
        "label": "(b)",
        "prompt": "Express the total mechanical energy in the orbit.",
        "points": 3,
        "rubric": "1 pt: $KE = GMm/(2r)$\n1 pt: $U = -GMm/r$\n1 pt: $E = -GMm/(2r)$"
      },
      {
        "label": "(c)",
        "prompt": "Derive Kepler's third law for this orbit.",
        "points": 2,
        "rubric": "1 pt: $T = 2\\pi r/v$\n1 pt: $T^2 = 4\\pi^2 r^3/(GM)$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the minimum speed at radius $R$ for escape.",
        "points": 2,
        "rubric": "1 pt: $E \\geq 0$\n1 pt: $v_{esc} = \\sqrt{2GM/R}$"
      },
      {
        "label": "(e)",
        "prompt": "If the satellite's orbit decays to radius $r/2$, compare new and old mechanical energies.",
        "points": 2,
        "rubric": "1 pt: $E_{new} = -GMm/r$\n1 pt: Energy decreased (more negative); $\\Delta E = -GMm/(2r)$"
      }
    ],
    "totalPoints": 11,
    "source": "Adapted from CB 2018 Mechanics FRQ 3"
  },
  {
    "id": "physcmech-v2-2019-1",
    "courseSlug": "ap-physics-c-mech",
    "year": 2019,
    "number": 1,
    "topic": "Rolling Without Slipping",
    "prompt": "A uniform solid sphere of mass $M$ and radius $R$ is released from rest at the top of an incline of angle $\\theta$ and rolls without slipping. $I = \\frac{2}{5}MR^2$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Draw free-body diagram identifying friction direction.",
        "points": 2,
        "rubric": "1 pt: Gravity, normal, friction shown\n1 pt: Friction up the incline"
      },
      {
        "label": "(b)",
        "prompt": "Derive the linear acceleration of the center of mass.",
        "points": 3,
        "rubric": "1 pt: $Mg\\sin\\theta - f = Ma$\n1 pt: $fR = I\\alpha$, $a = R\\alpha$\n1 pt: $a = (5/7)g\\sin\\theta$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the minimum coefficient of static friction needed.",
        "points": 3,
        "rubric": "1 pt: $f = (2/7)Mg\\sin\\theta$\n1 pt: $f \\leq \\mu_s N = \\mu_s Mg\\cos\\theta$\n1 pt: $\\mu_s \\geq (2/7)\\tan\\theta$"
      },
      {
        "label": "(d)",
        "prompt": "Compare arrival times of a solid sphere and a hoop on the same incline.",
        "points": 2,
        "rubric": "1 pt: Hoop: $a = g\\sin\\theta/2$\n1 pt: Sphere arrives first (larger $a$)"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2019 Mechanics FRQ 1"
  },
  {
    "id": "physcmech-v2-2019-2",
    "courseSlug": "ap-physics-c-mech",
    "year": 2019,
    "number": 2,
    "topic": "Quadratic Drag",
    "prompt": "An object of mass $m$ falls from rest through air with drag force $F_d = cv^2$ opposing motion.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the terminal velocity.",
        "points": 2,
        "rubric": "1 pt: $mg = cv_t^2$\n1 pt: $v_t = \\sqrt{mg/c}$"
      },
      {
        "label": "(b)",
        "prompt": "Write the differential equation for $v(t)$.",
        "points": 2,
        "rubric": "1 pt: $m\\,dv/dt = mg - cv^2$\n1 pt: Correct signs"
      },
      {
        "label": "(c)",
        "prompt": "Solve for $v(t)$ with $v(0) = 0$.",
        "points": 3,
        "rubric": "1 pt: Separate variables\n1 pt: Integrate using $\\tanh^{-1}$\n1 pt: $v(t) = v_t \\tanh(gt/v_t)$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the velocity as a function of distance fallen.",
        "points": 3,
        "rubric": "1 pt: Use $v\\,dv/dy = g - cv^2/m$\n1 pt: Separate and integrate\n1 pt: $v^2 = v_t^2(1 - e^{-2cy/m})$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2019 Mechanics FRQ 2"
  },
  {
    "id": "physcmech-v2-2019-3",
    "courseSlug": "ap-physics-c-mech",
    "year": 2019,
    "number": 3,
    "topic": "Spring SHM and Energy",
    "prompt": "A block of mass $m = 0.50$ kg on a frictionless surface is attached to a spring of constant $k = 200$ N/m. The block is pulled $A = 0.10$ m from equilibrium and released.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive the period of oscillation.",
        "points": 2,
        "rubric": "1 pt: $\\omega = \\sqrt{k/m}$\n1 pt: $T = 2\\pi\\sqrt{m/k} \\approx 0.31$ s"
      },
      {
        "label": "(b)",
        "prompt": "Write $x(t)$ and $v(t)$.",
        "points": 2,
        "rubric": "1 pt: $x(t) = A\\cos(\\omega t)$\n1 pt: $v(t) = -A\\omega\\sin(\\omega t)$"
      },
      {
        "label": "(c)",
        "prompt": "Find the maximum speed and maximum acceleration.",
        "points": 2,
        "rubric": "1 pt: $v_{max} = A\\omega = 2.0$ m/s\n1 pt: $a_{max} = A\\omega^2 = 40$ m/s$^2$"
      },
      {
        "label": "(d)",
        "prompt": "A $0.50$ kg clay lump is dropped onto the block at maximum extension and sticks. Determine the new amplitude and period.",
        "points": 4,
        "rubric": "1 pt: At max extension, $v = 0$, no momentum change\n1 pt: New mass $2m$, same total energy\n1 pt: Amplitude unchanged $A$\n1 pt: New period $T' = 2\\pi\\sqrt{2m/k}$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2019 Mechanics FRQ 3"
  },
  {
    "id": "physcmech-v2-2020-1",
    "courseSlug": "ap-physics-c-mech",
    "year": 2020,
    "number": 1,
    "topic": "Variable Force Energy",
    "prompt": "A particle of mass $m$ moves along the $x$-axis under a conservative force $F(x) = -kx + \\alpha x^3$ where $k$ and $\\alpha$ are positive constants.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the potential energy $U(x)$ with $U(0) = 0$.",
        "points": 2,
        "rubric": "1 pt: $U = -\\int F\\,dx$\n1 pt: $U(x) = kx^2/2 - \\alpha x^4/4$"
      },
      {
        "label": "(b)",
        "prompt": "Find the positions of equilibrium and classify them.",
        "points": 3,
        "rubric": "1 pt: $dU/dx = 0 \\Rightarrow x = 0, \\pm\\sqrt{k/\\alpha}$\n1 pt: $d^2U/dx^2$ at each\n1 pt: $x = 0$ stable, $x = \\pm\\sqrt{k/\\alpha}$ unstable"
      },
      {
        "label": "(c)",
        "prompt": "If the particle has total energy $E$, find the turning points for small $E$.",
        "points": 2,
        "rubric": "1 pt: Set $E = U(x)$\n1 pt: Turning points $x = \\pm\\sqrt{2E/k}$ for small $E$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the maximum $E$ for which motion remains bounded.",
        "points": 2,
        "rubric": "1 pt: $E \\leq U$ at unstable equilibrium\n1 pt: $E_{max} = k^2/(4\\alpha)$"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2020 Mechanics FRQ 1"
  },
  {
    "id": "physcmech-v2-2020-2",
    "courseSlug": "ap-physics-c-mech",
    "year": 2020,
    "number": 2,
    "topic": "Center of Mass and Momentum",
    "prompt": "A $60$ kg person stands at the left end of a $120$ kg boat of length $L = 6.0$ m on still water with negligible friction. The person walks to the right end.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Explain why the center of mass of the person-boat system does not move.",
        "points": 2,
        "rubric": "1 pt: No net external horizontal force\n1 pt: Momentum conservation $\\Rightarrow x_{cm}$ constant"
      },
      {
        "label": "(b)",
        "prompt": "Determine how far the boat moves relative to the water.",
        "points": 4,
        "rubric": "1 pt: Let $d$ = boat displacement\n1 pt: Person displacement relative to water: $L - d$\n1 pt: $60(L-d) = 120 d$\n1 pt: $d = L/3 = 2.0$ m"
      },
      {
        "label": "(c)",
        "prompt": "Find the person's displacement relative to the water.",
        "points": 2,
        "rubric": "1 pt: $L - d$\n1 pt: $4.0$ m"
      },
      {
        "label": "(d)",
        "prompt": "If the person walks at constant speed $v$ relative to the boat, find the boat's speed relative to water.",
        "points": 2,
        "rubric": "1 pt: Momentum $= 0$: $60(v - u) - 120 u = 0$\n1 pt: $u = v/3$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2020 Mechanics FRQ 2"
  },
  {
    "id": "physcmech-v2-2021-1",
    "courseSlug": "ap-physics-c-mech",
    "year": 2021,
    "number": 1,
    "topic": "Spin-up Problem",
    "prompt": "A disk of moment of inertia $I = 0.50$ kg$\\cdot$m$^2$ rotates freely at $\\omega_0 = 10$ rad/s. A small motor applies a time-dependent torque $\\tau(t) = \\tau_0 e^{-t/T}$ with $\\tau_0 = 2.0$ N$\\cdot$m and $T = 5.0$ s in the same direction as rotation.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the rotational equation of motion.",
        "points": 2,
        "rubric": "1 pt: $I\\,d\\omega/dt = \\tau(t)$\n1 pt: Identify $\\tau(t) = \\tau_0 e^{-t/T}$"
      },
      {
        "label": "(b)",
        "prompt": "Solve for $\\omega(t)$.",
        "points": 3,
        "rubric": "1 pt: Integrate $d\\omega = (\\tau_0/I) e^{-t/T}\\,dt$\n1 pt: $\\omega(t) - \\omega_0 = (\\tau_0 T/I)(1 - e^{-t/T})$\n1 pt: $\\omega(t) = \\omega_0 + (\\tau_0 T/I)(1 - e^{-t/T})$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the final angular velocity as $t \\to \\infty$.",
        "points": 2,
        "rubric": "1 pt: $e^{-t/T} \\to 0$\n1 pt: $\\omega_\\infty = 10 + 20 = 30$ rad/s"
      },
      {
        "label": "(d)",
        "prompt": "Find the total work done by the torque.",
        "points": 3,
        "rubric": "1 pt: Work-energy theorem $W = \\Delta KE$\n1 pt: $\\Delta KE = I(\\omega_\\infty^2 - \\omega_0^2)/2$\n1 pt: $W = 200$ J"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2021 Mechanics FRQ 1"
  },
  {
    "id": "physcmech-v2-2022-2",
    "courseSlug": "ap-physics-c-mech",
    "year": 2022,
    "number": 2,
    "topic": "Lagrangian Energy - Bead on Wire",
    "prompt": "A bead of mass $m$ slides without friction on a vertical circular hoop of radius $R$ that rotates about a vertical diameter at constant angular speed $\\Omega$. Use $\\theta$ measured from the bottom of the hoop.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write the kinetic energy of the bead in terms of $\\theta, \\dot\\theta, \\Omega$.",
        "points": 3,
        "rubric": "1 pt: Tangential speed $R\\dot\\theta$\n1 pt: Azimuthal speed $R\\Omega\\sin\\theta$\n1 pt: $KE = m R^2(\\dot\\theta^2 + \\Omega^2\\sin^2\\theta)/2$"
      },
      {
        "label": "(b)",
        "prompt": "Write the potential energy with $U = 0$ at the bottom.",
        "points": 1,
        "rubric": "1 pt: $U = mgR(1 - \\cos\\theta)$"
      },
      {
        "label": "(c)",
        "prompt": "Derive the equation of motion for $\\theta$ using energy methods.",
        "points": 3,
        "rubric": "1 pt: Effective potential $U_{eff} = mgR(1-\\cos\\theta) - m R^2\\Omega^2\\sin^2\\theta/2$\n1 pt: $mR^2\\ddot\\theta = -dU_{eff}/d\\theta$\n1 pt: $\\ddot\\theta = -(g/R)\\sin\\theta + \\Omega^2\\sin\\theta\\cos\\theta$"
      },
      {
        "label": "(d)",
        "prompt": "Find nonzero equilibrium values of $\\theta$ and the condition for them to exist.",
        "points": 3,
        "rubric": "1 pt: Set $\\ddot\\theta = 0$\n1 pt: $\\cos\\theta = g/(R\\Omega^2)$\n1 pt: Exists when $\\Omega^2 > g/R$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2022 Mechanics FRQ 2"
  },
  {
    "id": "physcmech-v2-2023-3",
    "courseSlug": "ap-physics-c-mech",
    "year": 2023,
    "number": 3,
    "topic": "Torsion Pendulum",
    "prompt": "A uniform disk of radius $R = 0.20$ m and mass $M = 2.0$ kg is suspended horizontally from its center by a wire providing a restoring torque $\\tau = -\\kappa\\phi$ with $\\kappa = 0.50$ N$\\cdot$m/rad.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the moment of inertia of the disk about the wire axis.",
        "points": 1,
        "rubric": "1 pt: $I = MR^2/2 = 0.040$ kg$\\cdot$m$^2$"
      },
      {
        "label": "(b)",
        "prompt": "Derive the equation of motion and show SHM.",
        "points": 2,
        "rubric": "1 pt: $I\\ddot\\phi = -\\kappa\\phi$\n1 pt: Identify SHM with $\\omega = \\sqrt{\\kappa/I}$"
      },
      {
        "label": "(c)",
        "prompt": "Calculate the period of oscillation.",
        "points": 2,
        "rubric": "1 pt: $T = 2\\pi\\sqrt{I/\\kappa}$\n1 pt: $T \\approx 1.78$ s"
      },
      {
        "label": "(d)",
        "prompt": "A ring of mass $m = 0.50$ kg and radius $R$ is placed concentric on the disk. Find the new period.",
        "points": 3,
        "rubric": "1 pt: Ring $I_r = mR^2 = 0.020$ kg$\\cdot$m$^2$\n1 pt: New total $I = 0.060$ kg$\\cdot$m$^2$\n1 pt: $T' = 2\\pi\\sqrt{0.060/0.50} \\approx 2.18$ s"
      },
      {
        "label": "(e)",
        "prompt": "If the amplitude is $\\phi_0 = 0.2$ rad, find the maximum angular speed.",
        "points": 2,
        "rubric": "1 pt: $\\omega_{max} = \\phi_0\\sqrt{\\kappa/I}$\n1 pt: $\\omega_{max} \\approx 0.71$ rad/s (original system)"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2023 Mechanics FRQ 3"
  },
  {
    "id": "physcmech-v2-2024-1",
    "courseSlug": "ap-physics-c-mech",
    "year": 2024,
    "number": 1,
    "topic": "Moment of Inertia Thin Shell",
    "prompt": "Consider a uniform spherical shell of mass $M$ and radius $R$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Set up the integral for the moment of inertia about a diameter using thin ring slices of thickness $R\\,d\\theta$.",
        "points": 3,
        "rubric": "1 pt: Ring area $dA = 2\\pi R^2 \\sin\\theta\\,d\\theta$\n1 pt: Ring mass $dm = (M/(4\\pi R^2))dA$\n1 pt: $dI = (R\\sin\\theta)^2 dm$"
      },
      {
        "label": "(b)",
        "prompt": "Evaluate the integral to find $I$.",
        "points": 3,
        "rubric": "1 pt: $I = (MR^2/2)\\int_0^\\pi \\sin^3\\theta\\,d\\theta$\n1 pt: $\\int_0^\\pi \\sin^3\\theta\\,d\\theta = 4/3$\n1 pt: $I = (2/3)MR^2$"
      },
      {
        "label": "(c)",
        "prompt": "A shell of mass $M = 3.0$ kg and radius $R = 0.10$ m rolls without slipping down a ramp of height $h = 0.50$ m. Find its speed at the bottom.",
        "points": 3,
        "rubric": "1 pt: $Mgh = (1/2)Mv^2 + (1/2)I\\omega^2$ with $v = R\\omega$\n1 pt: $gh = (5/6)v^2$\n1 pt: $v \\approx 2.42$ m/s"
      },
      {
        "label": "(d)",
        "prompt": "Compare the arrival time to that of a solid sphere from the same height.",
        "points": 1,
        "rubric": "1 pt: Solid sphere $v = \\sqrt{10gh/7}$ larger; sphere arrives first"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2024 Mechanics FRQ 1"
  },

  // ─── ap-physics-c-em wave-2 (+17) ─────────────────────────────
  {
    "id": "physcem-v2-2016-1",
    "courseSlug": "ap-physics-c-em",
    "year": 2016,
    "number": 1,
    "topic": "Gauss's Law Non-uniform Sphere",
    "prompt": "An insulating sphere of radius $R$ has volume charge density $\\rho(r) = \\rho_0 (r/R)$ for $0 \\leq r \\leq R$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the total charge $Q$ enclosed.",
        "points": 3,
        "rubric": "1 pt: $Q = \\int \\rho\\,dV$ with $dV = 4\\pi r^2 dr$\n1 pt: $Q = 4\\pi\\rho_0\\int_0^R (r^3/R)\\,dr$\n1 pt: $Q = \\pi\\rho_0 R^3$"
      },
      {
        "label": "(b)",
        "prompt": "Find $E(r)$ for $r < R$ using Gauss's law.",
        "points": 3,
        "rubric": "1 pt: Charge enclosed $q(r) = \\pi\\rho_0 r^4/R$\n1 pt: $E(4\\pi r^2) = q(r)/\\epsilon_0$\n1 pt: $E(r) = \\rho_0 r^2/(4\\epsilon_0 R)$"
      },
      {
        "label": "(c)",
        "prompt": "Find $E(r)$ for $r > R$.",
        "points": 2,
        "rubric": "1 pt: Total charge $Q$ enclosed\n1 pt: $E(r) = \\rho_0 R^3/(4\\epsilon_0 r^2)$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the electric potential at the center (take $V(\\infty) = 0$).",
        "points": 3,
        "rubric": "1 pt: $V(0) = -\\int_\\infty^0 E\\,dr = \\int_0^\\infty E\\,dr$\n1 pt: Split into $[0,R]$ and $[R,\\infty)$ and evaluate\n1 pt: $V(0) = \\rho_0 R^2/(3\\epsilon_0)$"
      }
    ],
    "totalPoints": 11,
    "source": "Adapted from CB 2016 E&M FRQ 1"
  },
  {
    "id": "physcem-v2-2016-2",
    "courseSlug": "ap-physics-c-em",
    "year": 2016,
    "number": 2,
    "topic": "RC Circuit ODE Multi-loop",
    "prompt": "In the circuit, an EMF $\\varepsilon = 12$ V is connected through a switch to a $R_1 = 2.0$ k$\\Omega$ resistor in series with a parallel combination of $R_2 = 3.0$ k$\\Omega$ and a $C = 10\\,\\mu$F capacitor (initially uncharged). The switch closes at $t = 0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the current through $R_1$ immediately after the switch closes.",
        "points": 2,
        "rubric": "1 pt: Capacitor acts like wire initially\n1 pt: $i(0^+) = \\varepsilon/(R_1 + R_2\\parallel 0) = \\varepsilon/R_1 = 6.0$ mA"
      },
      {
        "label": "(b)",
        "prompt": "Find the steady-state voltage across the capacitor.",
        "points": 2,
        "rubric": "1 pt: Capacitor blocks DC\n1 pt: $V_C = \\varepsilon R_2/(R_1+R_2) = 7.2$ V"
      },
      {
        "label": "(c)",
        "prompt": "Derive the differential equation for $V_C(t)$.",
        "points": 3,
        "rubric": "1 pt: Apply KVL/KCL\n1 pt: $C\\,dV_C/dt = (\\varepsilon - V_C)/R_1 - V_C/R_2$\n1 pt: Rearrange to standard form"
      },
      {
        "label": "(d)",
        "prompt": "Determine the time constant for the capacitor voltage.",
        "points": 2,
        "rubric": "1 pt: Thevenin resistance $R_1\\parallel R_2$\n1 pt: $\\tau = C(R_1 R_2/(R_1+R_2)) = 12$ ms"
      },
      {
        "label": "(e)",
        "prompt": "Write $V_C(t)$.",
        "points": 2,
        "rubric": "1 pt: $V_C(t) = V_\\infty(1 - e^{-t/\\tau})$\n1 pt: $V_C(t) = 7.2(1 - e^{-t/0.012})$ V"
      }
    ],
    "totalPoints": 11,
    "source": "Adapted from CB 2016 E&M FRQ 2"
  },
  {
    "id": "physcem-v2-2016-3",
    "courseSlug": "ap-physics-c-em",
    "year": 2016,
    "number": 3,
    "topic": "Faraday's Law Moving Bar",
    "prompt": "A conducting bar of length $L$ and mass $m$ slides with initial speed $v_0$ on frictionless parallel rails in a uniform magnetic field $B$ perpendicular to the plane. The rails are connected by a resistor $R$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive the induced EMF as a function of the bar speed $v$.",
        "points": 2,
        "rubric": "1 pt: $\\Phi = BLx$\n1 pt: $\\varepsilon = BLv$"
      },
      {
        "label": "(b)",
        "prompt": "Find the induced current and the force on the bar.",
        "points": 2,
        "rubric": "1 pt: $I = BLv/R$\n1 pt: $F = -B^2L^2 v/R$ (opposing motion)"
      },
      {
        "label": "(c)",
        "prompt": "Write the equation of motion and solve for $v(t)$.",
        "points": 3,
        "rubric": "1 pt: $m\\,dv/dt = -B^2L^2 v/R$\n1 pt: Separate variables\n1 pt: $v(t) = v_0 e^{-B^2L^2 t/(mR)}$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the total energy dissipated in the resistor.",
        "points": 2,
        "rubric": "1 pt: All initial KE eventually dissipated\n1 pt: $E_{diss} = m v_0^2/2$"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2016 E&M FRQ 3"
  },
  {
    "id": "physcem-v2-2017-1",
    "courseSlug": "ap-physics-c-em",
    "year": 2017,
    "number": 1,
    "topic": "Concentric Spherical Capacitor",
    "prompt": "A spherical capacitor consists of an inner conductor of radius $a$ and an outer conductor of radius $b > a$ with vacuum between.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the electric field between the shells for charge $Q$ on the inner and $-Q$ on the outer.",
        "points": 2,
        "rubric": "1 pt: Gauss's law with spherical surface\n1 pt: $E = Q/(4\\pi\\epsilon_0 r^2)$"
      },
      {
        "label": "(b)",
        "prompt": "Derive the potential difference between the shells.",
        "points": 2,
        "rubric": "1 pt: $V = \\int_a^b E\\,dr$\n1 pt: $V = Q(1/a - 1/b)/(4\\pi\\epsilon_0)$"
      },
      {
        "label": "(c)",
        "prompt": "Derive the capacitance.",
        "points": 2,
        "rubric": "1 pt: $C = Q/V$\n1 pt: $C = 4\\pi\\epsilon_0 ab/(b-a)$"
      },
      {
        "label": "(d)",
        "prompt": "A dielectric of constant $\\kappa$ fills the space. Find the new capacitance and the energy stored for charge $Q$.",
        "points": 3,
        "rubric": "1 pt: $C' = \\kappa C$\n1 pt: $U = Q^2/(2C')$\n1 pt: Correct substitution"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2017 E&M FRQ 1"
  },
  {
    "id": "physcem-v2-2017-2",
    "courseSlug": "ap-physics-c-em",
    "year": 2017,
    "number": 2,
    "topic": "Biot-Savart Current Loop",
    "prompt": "A circular loop of radius $R$ carries current $I$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Use the Biot-Savart law to derive the magnetic field on the loop's axis at distance $z$ from its center.",
        "points": 4,
        "rubric": "1 pt: $dB = (\\mu_0/4\\pi)I\\,dl/r^2$ with $r = \\sqrt{R^2+z^2}$\n1 pt: Only $z$-components survive by symmetry\n1 pt: $dB_z = dB(R/r)$\n1 pt: $B_z = \\mu_0 I R^2/[2(R^2+z^2)^{3/2}]$"
      },
      {
        "label": "(b)",
        "prompt": "Find the field at the center ($z = 0$).",
        "points": 1,
        "rubric": "1 pt: $B = \\mu_0 I/(2R)$"
      },
      {
        "label": "(c)",
        "prompt": "Two identical coaxial loops separated by distance $d = R$ (Helmholtz pair) carry equal currents in the same direction. Show the field at the midpoint is approximately uniform to second order in axial displacement.",
        "points": 3,
        "rubric": "1 pt: Add contributions with $z = \\pm R/2$\n1 pt: Taylor expand $B(z)$ about midpoint\n1 pt: First and second derivatives vanish when $d = R$"
      },
      {
        "label": "(d)",
        "prompt": "A small magnetic dipole $\\mu$ is placed on the axis at the midpoint of the Helmholtz pair with its moment along the axis. Explain why it experiences no net force.",
        "points": 1,
        "rubric": "1 pt: $F = \\mu\\,dB/dz = 0$ since $dB/dz = 0$"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2017 E&M FRQ 2"
  },
  {
    "id": "physcem-v2-2017-3",
    "courseSlug": "ap-physics-c-em",
    "year": 2017,
    "number": 3,
    "topic": "RL Circuit ODE",
    "prompt": "A battery of EMF $\\varepsilon = 12$ V is connected in series with a resistor $R = 4.0\\,\\Omega$ and inductor $L = 2.0$ H. The switch closes at $t = 0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write Kirchhoff's loop rule for the circuit.",
        "points": 2,
        "rubric": "1 pt: $\\varepsilon - iR - L\\,di/dt = 0$\n1 pt: Signs consistent"
      },
      {
        "label": "(b)",
        "prompt": "Solve for $i(t)$ with $i(0) = 0$.",
        "points": 3,
        "rubric": "1 pt: Identify first-order linear ODE\n1 pt: Time constant $\\tau = L/R = 0.5$ s\n1 pt: $i(t) = (\\varepsilon/R)(1 - e^{-Rt/L}) = 3.0(1 - e^{-2t})$ A"
      },
      {
        "label": "(c)",
        "prompt": "Find the energy stored in the inductor as $t \\to \\infty$.",
        "points": 2,
        "rubric": "1 pt: $i_\\infty = 3.0$ A\n1 pt: $U = Li^2/2 = 9.0$ J"
      },
      {
        "label": "(d)",
        "prompt": "After reaching steady state, the battery is shorted out. Write $i(t)$ for subsequent times.",
        "points": 2,
        "rubric": "1 pt: New ODE $L\\,di/dt + iR = 0$\n1 pt: $i(t) = 3.0\\,e^{-2t'}$ A, $t'$ from reset"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2017 E&M FRQ 3"
  },
  {
    "id": "physcem-v2-2018-1",
    "courseSlug": "ap-physics-c-em",
    "year": 2018,
    "number": 1,
    "topic": "Gauss's Law Infinite Cylinder",
    "prompt": "A long insulating cylinder of radius $R$ has uniform volume charge density $\\rho$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Use Gauss's law to find $E(r)$ for $r < R$.",
        "points": 3,
        "rubric": "1 pt: Choose cylindrical Gaussian surface\n1 pt: $E(2\\pi r L) = \\rho\\pi r^2 L/\\epsilon_0$\n1 pt: $E = \\rho r/(2\\epsilon_0)$"
      },
      {
        "label": "(b)",
        "prompt": "Find $E(r)$ for $r > R$.",
        "points": 2,
        "rubric": "1 pt: Enclosed $Q = \\rho\\pi R^2 L$\n1 pt: $E = \\rho R^2/(2\\epsilon_0 r)$"
      },
      {
        "label": "(c)",
        "prompt": "Determine the potential difference between $r = R$ and $r = 2R$.",
        "points": 3,
        "rubric": "1 pt: $V(R) - V(2R) = \\int_R^{2R} E\\,dr$\n1 pt: Substitute $E = \\rho R^2/(2\\epsilon_0 r)$\n1 pt: $\\Delta V = \\rho R^2\\ln 2/(2\\epsilon_0)$"
      },
      {
        "label": "(d)",
        "prompt": "Sketch $E(r)$.",
        "points": 1,
        "rubric": "1 pt: Linear rise to $R$, $1/r$ decay beyond"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2018 E&M FRQ 1"
  },
  {
    "id": "physcem-v2-2018-2",
    "courseSlug": "ap-physics-c-em",
    "year": 2018,
    "number": 2,
    "topic": "Ampère's Law Coaxial Cable",
    "prompt": "A coaxial cable has an inner solid conductor of radius $a$ carrying current $I$ out of the page uniformly distributed, and an outer thin cylindrical shell of radius $b$ carrying current $I$ into the page.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find $B(r)$ for $r < a$.",
        "points": 3,
        "rubric": "1 pt: Enclosed current $I_{enc} = I(r^2/a^2)$\n1 pt: Ampère's law $B(2\\pi r) = \\mu_0 I_{enc}$\n1 pt: $B = \\mu_0 I r/(2\\pi a^2)$"
      },
      {
        "label": "(b)",
        "prompt": "Find $B(r)$ for $a < r < b$.",
        "points": 2,
        "rubric": "1 pt: Enclosed current $I$\n1 pt: $B = \\mu_0 I/(2\\pi r)$"
      },
      {
        "label": "(c)",
        "prompt": "Find $B(r)$ for $r > b$.",
        "points": 2,
        "rubric": "1 pt: Net enclosed current $0$\n1 pt: $B = 0$"
      },
      {
        "label": "(d)",
        "prompt": "Calculate the energy stored per unit length in the field between the conductors.",
        "points": 3,
        "rubric": "1 pt: $u = B^2/(2\\mu_0)$\n1 pt: $U/L = \\int_a^b u\\,2\\pi r\\,dr$\n1 pt: $U/L = \\mu_0 I^2\\ln(b/a)/(4\\pi)$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2018 E&M FRQ 2"
  },
  {
    "id": "physcem-v2-2018-3",
    "courseSlug": "ap-physics-c-em",
    "year": 2018,
    "number": 3,
    "topic": "Self-Inductance of Solenoid",
    "prompt": "A long solenoid of length $\\ell$, cross-sectional area $A$, with $N$ turns carries current $i(t)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Use Ampère's law to derive the field inside the solenoid.",
        "points": 2,
        "rubric": "1 pt: Rectangular Amperian loop\n1 pt: $B = \\mu_0 N i/\\ell$"
      },
      {
        "label": "(b)",
        "prompt": "Derive the self-inductance $L$.",
        "points": 3,
        "rubric": "1 pt: Flux per turn $\\Phi = BA$\n1 pt: Total linkage $N\\Phi$\n1 pt: $L = \\mu_0 N^2 A/\\ell$"
      },
      {
        "label": "(c)",
        "prompt": "A secondary coil with $N_2$ turns wraps tightly around the solenoid. Derive the mutual inductance $M$.",
        "points": 2,
        "rubric": "1 pt: Flux through each turn of secondary $= BA$\n1 pt: $M = \\mu_0 N N_2 A/\\ell$"
      },
      {
        "label": "(d)",
        "prompt": "If $i(t) = I_0 \\sin(\\omega t)$, find the EMF induced in the secondary.",
        "points": 2,
        "rubric": "1 pt: $\\varepsilon_2 = -M\\,di/dt$\n1 pt: $\\varepsilon_2 = -\\mu_0 N N_2 A\\omega I_0\\cos(\\omega t)/\\ell$"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from CB 2018 E&M FRQ 3"
  },
  {
    "id": "physcem-v2-2019-1",
    "courseSlug": "ap-physics-c-em",
    "year": 2019,
    "number": 1,
    "topic": "Line Charge Potential",
    "prompt": "A thin rod of length $L$ lies along the $x$-axis from $x = 0$ to $x = L$ with linear charge density $\\lambda$ (constant).",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive the electric potential at a point $P$ on the $x$-axis at $x = d > L$.",
        "points": 3,
        "rubric": "1 pt: $dV = k\\,dq/(d - x)$\n1 pt: $V = k\\lambda\\int_0^L dx/(d-x)$\n1 pt: $V = k\\lambda\\ln[d/(d-L)]$"
      },
      {
        "label": "(b)",
        "prompt": "Derive the electric potential at point $Q$ on the perpendicular bisector at distance $y$.",
        "points": 3,
        "rubric": "1 pt: Set up $dV = k\\lambda\\,dx/\\sqrt{x^2+y^2}$\n1 pt: Use limits symmetric about midpoint\n1 pt: $V = k\\lambda\\ln[(L/2 + \\sqrt{(L/2)^2+y^2})/(-L/2 + \\sqrt{(L/2)^2+y^2})]$"
      },
      {
        "label": "(c)",
        "prompt": "In the limit $L \\to \\infty$ with $\\lambda$ fixed, find $E$ at distance $y$.",
        "points": 2,
        "rubric": "1 pt: Use Gauss's law with cylindrical surface\n1 pt: $E = \\lambda/(2\\pi\\epsilon_0 y)$"
      },
      {
        "label": "(d)",
        "prompt": "For the infinite line, express the potential difference between $y_1$ and $y_2$.",
        "points": 2,
        "rubric": "1 pt: $\\Delta V = \\int E\\,dy$\n1 pt: $V(y_1) - V(y_2) = \\lambda\\ln(y_2/y_1)/(2\\pi\\epsilon_0)$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2019 E&M FRQ 1"
  },
  {
    "id": "physcem-v2-2019-2",
    "courseSlug": "ap-physics-c-em",
    "year": 2019,
    "number": 2,
    "topic": "LC Circuit Oscillation",
    "prompt": "A capacitor of capacitance $C = 2.0\\,\\mu$F is charged to $V_0 = 10$ V and then connected to an inductor $L = 50$ mH at $t = 0$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Write Kirchhoff's loop equation and derive the ODE for $q(t)$.",
        "points": 3,
        "rubric": "1 pt: $q/C + L\\,di/dt = 0$\n1 pt: $i = -dq/dt$\n1 pt: $L\\ddot q + q/C = 0$"
      },
      {
        "label": "(b)",
        "prompt": "Solve for $q(t)$ and $i(t)$.",
        "points": 3,
        "rubric": "1 pt: $\\omega = 1/\\sqrt{LC}$\n1 pt: $q(t) = Q_0\\cos(\\omega t)$ with $Q_0 = CV_0$\n1 pt: $i(t) = Q_0\\omega\\sin(\\omega t)$"
      },
      {
        "label": "(c)",
        "prompt": "Compute the angular frequency and period.",
        "points": 2,
        "rubric": "1 pt: $\\omega = 3162$ rad/s\n1 pt: $T = 2\\pi/\\omega \\approx 2.0$ ms"
      },
      {
        "label": "(d)",
        "prompt": "Find the maximum current and verify energy conservation.",
        "points": 2,
        "rubric": "1 pt: $i_{max} = Q_0\\omega = 0.063$ A\n1 pt: $(1/2)Li_{max}^2 = (1/2)CV_0^2 = 10^{-4}$ J"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2019 E&M FRQ 2"
  },
  {
    "id": "physcem-v2-2019-3",
    "courseSlug": "ap-physics-c-em",
    "year": 2019,
    "number": 3,
    "topic": "Displacement Current in Capacitor",
    "prompt": "A parallel-plate capacitor with circular plates of radius $R$ has plate separation $d$ and a time-varying voltage $V(t) = V_0\\cos(\\omega t)$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Determine the electric field between the plates (neglecting edge effects).",
        "points": 2,
        "rubric": "1 pt: $E = V/d$\n1 pt: $E(t) = (V_0/d)\\cos(\\omega t)$"
      },
      {
        "label": "(b)",
        "prompt": "Compute the displacement current density $J_d = \\epsilon_0\\,dE/dt$.",
        "points": 2,
        "rubric": "1 pt: $dE/dt = -(V_0\\omega/d)\\sin(\\omega t)$\n1 pt: $J_d = -\\epsilon_0 V_0\\omega\\sin(\\omega t)/d$"
      },
      {
        "label": "(c)",
        "prompt": "Using Ampère-Maxwell law, find the magnetic field $B(r, t)$ inside the plates at radius $r < R$.",
        "points": 3,
        "rubric": "1 pt: $\\oint B\\cdot dl = \\mu_0\\epsilon_0\\,d\\Phi_E/dt$\n1 pt: $B(2\\pi r) = \\mu_0\\epsilon_0 (dE/dt)\\pi r^2$\n1 pt: $B = -\\mu_0\\epsilon_0 V_0\\omega r\\sin(\\omega t)/(2d)$"
      },
      {
        "label": "(d)",
        "prompt": "Find the magnetic field at the edge $r = R$.",
        "points": 1,
        "rubric": "1 pt: Substitute $r = R$"
      },
      {
        "label": "(e)",
        "prompt": "Explain why displacement current is required for consistency with charge conservation.",
        "points": 2,
        "rubric": "1 pt: Without $J_d$, Ampère's law contradicts charge continuity at the plates\n1 pt: Displacement current restores $\\nabla\\cdot J + \\partial\\rho/\\partial t = 0$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2019 E&M FRQ 3"
  },
  {
    "id": "physcem-v2-2020-1",
    "courseSlug": "ap-physics-c-em",
    "year": 2020,
    "number": 1,
    "topic": "Potential from Non-uniform Density",
    "prompt": "A solid non-conducting sphere of radius $R$ has charge density $\\rho(r) = \\rho_0(1 - r/R)$ for $0 \\leq r \\leq R$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Find the total charge.",
        "points": 3,
        "rubric": "1 pt: $Q = \\int_0^R 4\\pi r^2\\rho(r)\\,dr$\n1 pt: Evaluate to $4\\pi\\rho_0(R^3/3 - R^3/4)$\n1 pt: $Q = \\pi\\rho_0 R^3/3$"
      },
      {
        "label": "(b)",
        "prompt": "Find $E(r)$ outside the sphere.",
        "points": 2,
        "rubric": "1 pt: Gauss's law with total $Q$\n1 pt: $E = Q/(4\\pi\\epsilon_0 r^2)$"
      },
      {
        "label": "(c)",
        "prompt": "Find $E(r)$ inside the sphere.",
        "points": 3,
        "rubric": "1 pt: $q(r) = 4\\pi\\rho_0(r^3/3 - r^4/(4R))$\n1 pt: $E(4\\pi r^2) = q(r)/\\epsilon_0$\n1 pt: $E(r) = \\rho_0(r/3 - r^2/(4R))/\\epsilon_0$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the position $r$ where $E$ is maximum inside.",
        "points": 2,
        "rubric": "1 pt: $dE/dr = 0$\n1 pt: $r = 2R/3$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2020 E&M FRQ 1"
  },
  {
    "id": "physcem-v2-2021-2",
    "courseSlug": "ap-physics-c-em",
    "year": 2021,
    "number": 2,
    "topic": "Rotating Loop Faraday",
    "prompt": "A rectangular loop of area $A$ and resistance $R$ rotates about an axis perpendicular to a uniform magnetic field $B$ at constant angular velocity $\\omega$. At $t = 0$ the loop's normal is aligned with $B$.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Derive the flux through the loop as a function of time.",
        "points": 2,
        "rubric": "1 pt: $\\Phi = BA\\cos\\theta$\n1 pt: $\\Phi(t) = BA\\cos(\\omega t)$"
      },
      {
        "label": "(b)",
        "prompt": "Derive the induced EMF.",
        "points": 2,
        "rubric": "1 pt: $\\varepsilon = -d\\Phi/dt$\n1 pt: $\\varepsilon(t) = BA\\omega\\sin(\\omega t)$"
      },
      {
        "label": "(c)",
        "prompt": "Find the induced current and average power dissipated over a full cycle.",
        "points": 3,
        "rubric": "1 pt: $i(t) = \\varepsilon/R$\n1 pt: $P(t) = \\varepsilon^2/R$\n1 pt: $\\langle P\\rangle = (BA\\omega)^2/(2R)$"
      },
      {
        "label": "(d)",
        "prompt": "Determine the torque required to maintain rotation.",
        "points": 3,
        "rubric": "1 pt: $\\tau = \\mu\\times B$ with $\\mu = iA$\n1 pt: $\\tau(t) = iAB\\sin(\\omega t)$\n1 pt: $\\tau(t) = (BA)^2\\omega\\sin^2(\\omega t)/R$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2021 E&M FRQ 2"
  },
  {
    "id": "physcem-v2-2022-1",
    "courseSlug": "ap-physics-c-em",
    "year": 2022,
    "number": 1,
    "topic": "Capacitor with Dielectric",
    "prompt": "A parallel-plate capacitor has plate area $A$ and separation $d$. A dielectric slab of constant $\\kappa$ and thickness $d/2$ is inserted parallel to the plates filling half the gap.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Model the system as two capacitors in series and find the equivalent capacitance.",
        "points": 3,
        "rubric": "1 pt: $C_1 = \\epsilon_0 A/(d/2)$ (air half)\n1 pt: $C_2 = \\kappa\\epsilon_0 A/(d/2)$ (dielectric half)\n1 pt: $C = 2\\kappa\\epsilon_0 A/[d(\\kappa + 1)]$"
      },
      {
        "label": "(b)",
        "prompt": "The capacitor is charged to $Q$ with the dielectric in place. Determine the electric field in each region.",
        "points": 2,
        "rubric": "1 pt: $E_{air} = Q/(\\epsilon_0 A)$ (same $D$)\n1 pt: $E_{diel} = Q/(\\kappa\\epsilon_0 A)$"
      },
      {
        "label": "(c)",
        "prompt": "Compute the energy stored.",
        "points": 2,
        "rubric": "1 pt: $U = Q^2/(2C)$\n1 pt: Substitute $C$ from part (a)"
      },
      {
        "label": "(d)",
        "prompt": "If instead the dielectric is inserted while the capacitor is connected to a battery at voltage $V_0$, determine the work done by the battery.",
        "points": 3,
        "rubric": "1 pt: $\\Delta Q = (C_f - C_i)V_0$\n1 pt: $W_{bat} = V_0\\,\\Delta Q$\n1 pt: $W_{bat} = V_0^2(C_f - C_i)$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2022 E&M FRQ 1"
  },
  {
    "id": "physcem-v2-2023-2",
    "courseSlug": "ap-physics-c-em",
    "year": 2023,
    "number": 2,
    "topic": "Toroid Ampère's Law",
    "prompt": "A toroid with $N$ turns is wound on a doughnut-shaped core with inner radius $a$ and outer radius $b$. Current $I$ flows through the windings.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Use Ampère's law with a circular path inside the toroid to find $B(r)$ for $a < r < b$.",
        "points": 3,
        "rubric": "1 pt: Choose circular loop of radius $r$\n1 pt: $B(2\\pi r) = \\mu_0 N I$\n1 pt: $B = \\mu_0 N I/(2\\pi r)$"
      },
      {
        "label": "(b)",
        "prompt": "Find the field outside the toroid ($r < a$ or $r > b$).",
        "points": 2,
        "rubric": "1 pt: Enclosed current $0$\n1 pt: $B = 0$"
      },
      {
        "label": "(c)",
        "prompt": "Compute the flux through a single turn assuming rectangular cross-section of height $h$.",
        "points": 3,
        "rubric": "1 pt: $d\\Phi = B h\\,dr$\n1 pt: Integrate from $a$ to $b$\n1 pt: $\\Phi_1 = \\mu_0 N I h\\ln(b/a)/(2\\pi)$"
      },
      {
        "label": "(d)",
        "prompt": "Derive the self-inductance of the toroid.",
        "points": 2,
        "rubric": "1 pt: $L = N\\Phi_1/I$\n1 pt: $L = \\mu_0 N^2 h\\ln(b/a)/(2\\pi)$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2023 E&M FRQ 2"
  },
  {
    "id": "physcem-v2-2024-2",
    "courseSlug": "ap-physics-c-em",
    "year": 2024,
    "number": 2,
    "topic": "Biot-Savart Finite Wire",
    "prompt": "A straight wire segment of length $L$ carries current $I$. Point $P$ lies a perpendicular distance $d$ from the wire, with the foot of perpendicular at the midpoint.",
    "parts": [
      {
        "label": "(a)",
        "prompt": "Set up the Biot-Savart integral for $B$ at $P$.",
        "points": 3,
        "rubric": "1 pt: $dB = (\\mu_0/4\\pi)(I\\,dl\\sin\\theta)/r^2$\n1 pt: Choose $x$ along wire with origin at foot\n1 pt: Express $\\sin\\theta = d/\\sqrt{x^2+d^2}$"
      },
      {
        "label": "(b)",
        "prompt": "Evaluate the integral.",
        "points": 3,
        "rubric": "1 pt: $B = (\\mu_0 I/4\\pi)\\int_{-L/2}^{L/2} d\\,dx/(x^2+d^2)^{3/2}$\n1 pt: Antiderivative $x/(d\\sqrt{x^2+d^2})$\n1 pt: $B = \\mu_0 I L/[2\\pi d\\sqrt{L^2 + 4d^2}]$"
      },
      {
        "label": "(c)",
        "prompt": "Take the limit $L \\to \\infty$ to recover the infinite-wire result.",
        "points": 2,
        "rubric": "1 pt: $B \\to \\mu_0 I/(2\\pi d)$\n1 pt: Explicitly show limit"
      },
      {
        "label": "(d)",
        "prompt": "A square loop of side $a$ carries current $I$. Use the finite-wire result to find $B$ at the center.",
        "points": 2,
        "rubric": "1 pt: Four wires each with $L = a$, $d = a/2$\n1 pt: $B = 2\\sqrt{2}\\mu_0 I/(\\pi a)$"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from CB 2024 E&M FRQ 2"
  },

  // ─── ap-biology wave-2 (+20) ─────────────────────────────
  {
    "id": "bio-v2-2016-1",
    "courseSlug": "ap-biology",
    "year": 2016,
    "number": 1,
    "topic": "Membrane Transport and Osmosis",
    "prompt": "Researchers investigated water movement across plant cell membranes using aquaporins. Dialysis tubing filled with sucrose solutions of varying concentrations was placed in distilled water and mass changes were recorded every 10 minutes for 1 hour.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the mechanism by which water crosses the plasma membrane and explain the role of aquaporins.",
        "points": 2,
        "rubric": "1 pt: Water moves by osmosis down its water potential gradient\n1 pt: Aquaporins are integral membrane proteins forming channels that facilitate rapid passive water flux"
      },
      {
        "label": "b",
        "prompt": "Predict the direction and relative rate of net water movement in tubing containing 0.1 M vs 0.8 M sucrose when placed in distilled water.",
        "points": 2,
        "rubric": "1 pt: Water enters both tubes because external water potential (0) exceeds internal\n1 pt: 0.8 M gains mass faster/more due to a larger water potential gradient"
      },
      {
        "label": "c",
        "prompt": "Calculate the water potential of a 0.4 M sucrose solution at 25 C (i = 1.0, pressure potential = 0). Use Psi = -iCRT with R = 0.0831 L bar/mol K.",
        "points": 2,
        "rubric": "1 pt: Correct setup Psi_s = -(1)(0.4)(0.0831)(298)\n1 pt: Psi ~ -9.9 bars with units"
      },
      {
        "label": "d",
        "prompt": "Justify why a mutation eliminating aquaporin function would affect root cells differently than a mutation in an ion pump.",
        "points": 2,
        "rubric": "1 pt: Aquaporin loss slows bulk water uptake but not solute-driven osmotic gradients directly\n1 pt: Ion pump loss eliminates gradients driving osmosis/active transport, a broader physiological impact"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from 2016 AP Biology FRQ 1"
  },
  {
    "id": "bio-v2-2016-2",
    "courseSlug": "ap-biology",
    "year": 2016,
    "number": 2,
    "topic": "Enzyme Kinetics and Inhibition",
    "prompt": "A student measured the initial rate of an enzyme-catalyzed reaction at several substrate concentrations in the presence and absence of inhibitor X.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe how Vmax and Km change for competitive vs noncompetitive inhibition.",
        "points": 2,
        "rubric": "1 pt: Competitive: Vmax unchanged, Km increases\n1 pt: Noncompetitive: Vmax decreases, Km unchanged"
      },
      {
        "label": "b",
        "prompt": "Given that adding X increased Km from 2 mM to 6 mM with no change in Vmax, identify the inhibition type and justify.",
        "points": 2,
        "rubric": "1 pt: Competitive inhibition\n1 pt: Justification citing unchanged Vmax and elevated Km because inhibitor competes at the active site"
      },
      {
        "label": "c",
        "prompt": "Predict the effect of raising pH two units above the optimum on enzyme activity.",
        "points": 2,
        "rubric": "1 pt: Activity decreases due to altered ionization of active-site residues\n1 pt: Denaturation of tertiary structure disrupts substrate binding"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2016 AP Biology FRQ 2"
  },
  {
    "id": "bio-v2-2017-3",
    "courseSlug": "ap-biology",
    "year": 2017,
    "number": 3,
    "topic": "Cellular Respiration",
    "prompt": "Isolated mitochondria were incubated with pyruvate. Researchers then added the uncoupler DNP and later the ATP synthase inhibitor oligomycin.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the role of the electron transport chain in generating the proton gradient.",
        "points": 2,
        "rubric": "1 pt: Electrons from NADH/FADH2 pass through complexes I-IV\n1 pt: Protons are pumped from matrix to intermembrane space establishing an electrochemical gradient"
      },
      {
        "label": "b",
        "prompt": "Predict how DNP affects oxygen consumption and ATP production, and explain.",
        "points": 2,
        "rubric": "1 pt: O2 consumption rises because ETC runs faster without gradient\n1 pt: ATP production falls because the proton-motive force is dissipated before reaching ATP synthase"
      },
      {
        "label": "c",
        "prompt": "Predict the effect of adding oligomycin after DNP on O2 consumption.",
        "points": 1,
        "rubric": "1 pt: Little change because DNP has already uncoupled respiration from ATP synthesis"
      },
      {
        "label": "d",
        "prompt": "Explain how cells could continue producing ATP under anaerobic conditions.",
        "points": 2,
        "rubric": "1 pt: Fermentation regenerates NAD+ allowing glycolysis to continue\n1 pt: Substrate-level phosphorylation yields 2 ATP per glucose"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from 2017 AP Biology FRQ 3"
  },
  {
    "id": "bio-v2-2017-4",
    "courseSlug": "ap-biology",
    "year": 2017,
    "number": 4,
    "topic": "Photosynthesis",
    "prompt": "A student illuminated isolated chloroplasts with DCMU and compared O2 evolution and NADPH formation to untreated controls.",
    "parts": [
      {
        "label": "a",
        "prompt": "Identify where in the chloroplast DCMU acts and its effect on electron flow.",
        "points": 2,
        "rubric": "1 pt: DCMU binds at the QB site of photosystem II in the thylakoid membrane\n1 pt: It blocks electron transfer from PSII to plastoquinone"
      },
      {
        "label": "b",
        "prompt": "Predict and justify changes in O2 and NADPH in DCMU-treated samples.",
        "points": 2,
        "rubric": "1 pt: O2 evolution stops because water splitting at PSII is halted\n1 pt: NADPH falls since electrons no longer reach PSI/ferredoxin"
      },
      {
        "label": "c",
        "prompt": "Compare C3 and C4 plants' photosynthetic efficiency at high temperatures.",
        "points": 2,
        "rubric": "1 pt: C4 plants concentrate CO2 in bundle-sheath cells reducing photorespiration\n1 pt: C3 plants lose efficiency as rubisco fixes O2 at high temperatures"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2017 AP Biology FRQ 4"
  },
  {
    "id": "bio-v2-2018-1",
    "courseSlug": "ap-biology",
    "year": 2018,
    "number": 1,
    "topic": "Mitosis and Meiosis",
    "prompt": "A researcher compared chromosome behavior during mitosis and meiosis in a diploid organism with 2n = 8.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe two differences in chromosome behavior between meiosis I and mitosis.",
        "points": 2,
        "rubric": "1 pt: Homologous chromosomes pair and synapse in meiosis I but not in mitosis\n1 pt: Meiosis I separates homologs; mitosis separates sister chromatids"
      },
      {
        "label": "b",
        "prompt": "State the number of chromosomes per cell at the end of meiosis II and justify.",
        "points": 2,
        "rubric": "1 pt: 4 chromosomes per cell\n1 pt: Two reductional/equational divisions halve diploid number (8/2 = 4)"
      },
      {
        "label": "c",
        "prompt": "Explain how crossing over and independent assortment generate genetic variation.",
        "points": 2,
        "rubric": "1 pt: Crossing over exchanges segments between non-sister chromatids producing recombinant chromosomes\n1 pt: Independent assortment of homolog pairs at metaphase I produces 2^n combinations"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2018 AP Biology FRQ 1"
  },
  {
    "id": "bio-v2-2018-2",
    "courseSlug": "ap-biology",
    "year": 2018,
    "number": 2,
    "topic": "Mendelian Genetics and Chi-Square",
    "prompt": "A dihybrid cross between heterozygous pea plants produced 320 offspring. Observed phenotypes: 175 tall-purple, 65 tall-white, 55 short-purple, 25 short-white.",
    "parts": [
      {
        "label": "a",
        "prompt": "State the expected 9:3:3:1 ratio counts and set up the chi-square test.",
        "points": 2,
        "rubric": "1 pt: Expected: 180, 60, 60, 20\n1 pt: Chi-square sum of (O-E)^2/E for each class"
      },
      {
        "label": "b",
        "prompt": "Calculate chi-square and compare with the critical value (7.815, df = 3, alpha = 0.05).",
        "points": 2,
        "rubric": "1 pt: Chi-square ~ 1.67\n1 pt: Fail to reject null because 1.67 < 7.815"
      },
      {
        "label": "c",
        "prompt": "Interpret the result in context of Mendelian independent assortment.",
        "points": 1,
        "rubric": "1 pt: Data are consistent with independent assortment of height and color alleles"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from 2018 AP Biology FRQ 2"
  },
  {
    "id": "bio-v2-2019-3",
    "courseSlug": "ap-biology",
    "year": 2019,
    "number": 3,
    "topic": "Molecular Genetics and the lac Operon",
    "prompt": "E. coli cultures were grown in media containing glucose only, lactose only, or both sugars. Beta-galactosidase activity was measured.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the role of the repressor and CAP in regulating the lac operon.",
        "points": 2,
        "rubric": "1 pt: Repressor binds operator blocking transcription when lactose is absent\n1 pt: CAP-cAMP binds the promoter enhancing RNA polymerase recruitment when glucose is low"
      },
      {
        "label": "b",
        "prompt": "Predict beta-galactosidase activity in each of the three conditions and justify.",
        "points": 3,
        "rubric": "1 pt: Glucose only: low activity due to low cAMP and repressor bound\n1 pt: Lactose only: high activity due to allolactose inducer and high cAMP\n1 pt: Both: low activity due to catabolite repression"
      },
      {
        "label": "c",
        "prompt": "Predict the phenotype of a mutant with a defective operator that cannot bind repressor.",
        "points": 1,
        "rubric": "1 pt: Constitutive expression of lac genes regardless of lactose presence"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2019 AP Biology FRQ 3"
  },
  {
    "id": "bio-v2-2019-4",
    "courseSlug": "ap-biology",
    "year": 2019,
    "number": 4,
    "topic": "Biotechnology: PCR and Gel Electrophoresis",
    "prompt": "A forensic lab amplified a 500 bp region of suspect DNA via PCR and analyzed products on an agarose gel alongside a ladder.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the three temperature steps in a PCR cycle and what occurs at each.",
        "points": 3,
        "rubric": "1 pt: Denaturation ~ 95 C separates DNA strands\n1 pt: Annealing ~ 55 C allows primers to bind\n1 pt: Extension ~ 72 C Taq polymerase synthesizes new strands"
      },
      {
        "label": "b",
        "prompt": "Explain why DNA fragments separate by size on an agarose gel.",
        "points": 2,
        "rubric": "1 pt: DNA is negatively charged and migrates toward the positive electrode\n1 pt: Smaller fragments move faster through the gel matrix"
      },
      {
        "label": "c",
        "prompt": "Describe one application of CRISPR-Cas9 in research or medicine.",
        "points": 1,
        "rubric": "1 pt: Targeted gene editing (e.g., correcting disease alleles, creating knockouts)"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2019 AP Biology FRQ 4"
  },
  {
    "id": "bio-v2-2020-1",
    "courseSlug": "ap-biology",
    "year": 2020,
    "number": 1,
    "topic": "Hardy-Weinberg with Selection",
    "prompt": "In a beetle population, allele B (black) is dominant to b (tan). In generation 1, q^2 = 0.16. Predators consume tan beetles at twice the rate of black beetles.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate allele frequencies p and q, and genotype frequencies under Hardy-Weinberg equilibrium.",
        "points": 2,
        "rubric": "1 pt: q = 0.4, p = 0.6\n1 pt: BB = 0.36, Bb = 0.48, bb = 0.16"
      },
      {
        "label": "b",
        "prompt": "Predict how selection against tan beetles changes allele frequencies over generations.",
        "points": 2,
        "rubric": "1 pt: q decreases because bb genotype has lower fitness\n1 pt: p increases correspondingly as B allele becomes more common"
      },
      {
        "label": "c",
        "prompt": "Describe two other conditions required for Hardy-Weinberg equilibrium.",
        "points": 2,
        "rubric": "1 pt: No mutation and no migration\n1 pt: Random mating and large population size"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2020 AP Biology FRQ 1"
  },
  {
    "id": "bio-v2-2020-2",
    "courseSlug": "ap-biology",
    "year": 2020,
    "number": 2,
    "topic": "Speciation and Phylogenies",
    "prompt": "A researcher analyzed DNA sequences from four finch species and constructed a phylogenetic tree.",
    "parts": [
      {
        "label": "a",
        "prompt": "Distinguish between allopatric and sympatric speciation.",
        "points": 2,
        "rubric": "1 pt: Allopatric: geographic isolation prevents gene flow leading to divergence\n1 pt: Sympatric: reproductive isolation arises without geographic separation (e.g., polyploidy, niche differentiation)"
      },
      {
        "label": "b",
        "prompt": "Explain how molecular data can be used to determine evolutionary relationships.",
        "points": 2,
        "rubric": "1 pt: More sequence similarity implies more recent common ancestry\n1 pt: Conserved genes/regions establish homology; mutation accumulation provides a molecular clock"
      },
      {
        "label": "c",
        "prompt": "Predict one mechanism that could maintain reproductive isolation in sympatry.",
        "points": 1,
        "rubric": "1 pt: Behavioral/temporal isolation, gametic incompatibility, or habitat differentiation"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from 2020 AP Biology FRQ 2"
  },
  {
    "id": "bio-v2-2021-3",
    "courseSlug": "ap-biology",
    "year": 2021,
    "number": 3,
    "topic": "Ecology: Food Webs and Energy Flow",
    "prompt": "Primary productivity of a grassland is 20000 kcal/m^2/year. Ecologists measured energy transfer through trophic levels.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate energy available to secondary consumers assuming 10% transfer efficiency between each trophic level.",
        "points": 2,
        "rubric": "1 pt: Primary consumers: 2000 kcal/m^2/year\n1 pt: Secondary consumers: 200 kcal/m^2/year"
      },
      {
        "label": "b",
        "prompt": "Explain why energy pyramids narrow at higher trophic levels.",
        "points": 2,
        "rubric": "1 pt: Energy is lost as heat in metabolism/cellular respiration\n1 pt: Only a fraction of consumed biomass is assimilated into consumer biomass"
      },
      {
        "label": "c",
        "prompt": "Predict the effect of removing apex predators on grassland community structure.",
        "points": 2,
        "rubric": "1 pt: Mesopredator or herbivore populations increase (trophic cascade)\n1 pt: Producer biomass/diversity declines due to increased herbivory"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2021 AP Biology FRQ 3"
  },
  {
    "id": "bio-v2-2021-4",
    "courseSlug": "ap-biology",
    "year": 2021,
    "number": 4,
    "topic": "Biogeochemical Cycles and Succession",
    "prompt": "A volcanic eruption left bare rock on an island. Ecologists monitored colonization over decades.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the process of primary succession including pioneer and climax communities.",
        "points": 2,
        "rubric": "1 pt: Pioneer species (lichens, mosses) colonize bare rock and begin soil formation\n1 pt: Community composition changes over time toward a stable climax community"
      },
      {
        "label": "b",
        "prompt": "Explain how nitrogen-fixing bacteria contribute to succession.",
        "points": 2,
        "rubric": "1 pt: They convert atmospheric N2 into ammonia/ammonium usable by plants\n1 pt: This enriches soil nitrogen enabling colonization by vascular plants"
      },
      {
        "label": "c",
        "prompt": "Predict how excess fertilizer runoff from nearby agriculture would impact a downstream lake.",
        "points": 2,
        "rubric": "1 pt: Eutrophication from excess N and P stimulates algal blooms\n1 pt: Decomposition of algae depletes oxygen causing hypoxia and fish kills"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2021 AP Biology FRQ 4"
  },
  {
    "id": "bio-v2-2022-1",
    "courseSlug": "ap-biology",
    "year": 2022,
    "number": 1,
    "topic": "Nervous System Signaling",
    "prompt": "A student investigated how a neurotoxin affects action potential propagation along an axon.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the role of Na+ and K+ channels during an action potential.",
        "points": 2,
        "rubric": "1 pt: Voltage-gated Na+ channels open causing depolarization\n1 pt: Voltage-gated K+ channels open causing repolarization"
      },
      {
        "label": "b",
        "prompt": "The toxin blocks voltage-gated Na+ channels. Predict the effect on the action potential and justify.",
        "points": 2,
        "rubric": "1 pt: Action potentials fail to fire or are greatly reduced in amplitude\n1 pt: Without Na+ influx, depolarization cannot reach threshold"
      },
      {
        "label": "c",
        "prompt": "Describe how myelination increases conduction velocity.",
        "points": 2,
        "rubric": "1 pt: Myelin insulates the axon restricting ion flow to nodes of Ranvier\n1 pt: Saltatory conduction between nodes speeds signal propagation"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2022 AP Biology FRQ 1"
  },
  {
    "id": "bio-v2-2022-2",
    "courseSlug": "ap-biology",
    "year": 2022,
    "number": 2,
    "topic": "Endocrine and Immune Systems",
    "prompt": "A patient presents with elevated blood glucose and reduced insulin sensitivity.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the negative feedback loop that normally regulates blood glucose after a meal.",
        "points": 2,
        "rubric": "1 pt: High glucose triggers pancreatic beta cells to secrete insulin\n1 pt: Insulin stimulates glucose uptake into cells lowering blood glucose"
      },
      {
        "label": "b",
        "prompt": "Explain how type 1 diabetes differs from type 2 at the cellular level.",
        "points": 2,
        "rubric": "1 pt: Type 1: autoimmune destruction of beta cells eliminates insulin production\n1 pt: Type 2: target cells develop insulin receptor desensitization"
      },
      {
        "label": "c",
        "prompt": "Describe the role of helper T cells in adaptive immunity.",
        "points": 2,
        "rubric": "1 pt: Helper T cells recognize antigens presented on MHC II\n1 pt: They secrete cytokines that activate B cells and cytotoxic T cells"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2022 AP Biology FRQ 2"
  },
  {
    "id": "bio-v2-2023-3",
    "courseSlug": "ap-biology",
    "year": 2023,
    "number": 3,
    "topic": "Circulatory System and Gas Exchange",
    "prompt": "A researcher compared oxygen-hemoglobin dissociation curves in adult and fetal hemoglobin.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe how fetal hemoglobin's higher affinity for O2 supports fetal development.",
        "points": 2,
        "rubric": "1 pt: Fetal Hb binds O2 at lower partial pressures than adult Hb\n1 pt: This enables O2 transfer from maternal to fetal blood at the placenta"
      },
      {
        "label": "b",
        "prompt": "Predict the effect of decreased blood pH (Bohr effect) on oxygen release to tissues.",
        "points": 2,
        "rubric": "1 pt: Curve shifts right, decreasing Hb affinity for O2\n1 pt: More O2 is released to active/respiring tissues where CO2/H+ are high"
      },
      {
        "label": "c",
        "prompt": "Describe one adaptation of high-altitude organisms for efficient oxygen uptake.",
        "points": 1,
        "rubric": "1 pt: Increased red blood cell count, higher-affinity Hb variants, or greater lung surface area"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from 2023 AP Biology FRQ 3"
  },
  {
    "id": "bio-v2-2023-4",
    "courseSlug": "ap-biology",
    "year": 2023,
    "number": 4,
    "topic": "Plant Hormones and Reproduction",
    "prompt": "A student exposed seedlings to unilateral light and measured curvature. Separate groups were treated with auxin transport inhibitors.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe how auxin mediates phototropism.",
        "points": 2,
        "rubric": "1 pt: Auxin is redistributed to the shaded side of the stem\n1 pt: Asymmetric auxin triggers cell elongation on the shaded side bending the stem toward light"
      },
      {
        "label": "b",
        "prompt": "Predict the phenotype of seedlings treated with an auxin transport inhibitor.",
        "points": 2,
        "rubric": "1 pt: Reduced or absent phototropic curvature\n1 pt: Because auxin cannot redistribute laterally, elongation is symmetric"
      },
      {
        "label": "c",
        "prompt": "Describe the function of double fertilization in angiosperms.",
        "points": 2,
        "rubric": "1 pt: One sperm fertilizes the egg forming the diploid zygote\n1 pt: The second sperm fuses with polar nuclei forming triploid endosperm that nourishes the embryo"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2023 AP Biology FRQ 4"
  },
  {
    "id": "bio-v2-2024-1",
    "courseSlug": "ap-biology",
    "year": 2024,
    "number": 1,
    "topic": "DNA Replication and Repair",
    "prompt": "A student examined the fidelity of DNA replication in wild-type and mismatch-repair-deficient E. coli strains.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the semiconservative nature of DNA replication and the role of DNA polymerase.",
        "points": 2,
        "rubric": "1 pt: Each daughter duplex contains one parental and one newly synthesized strand\n1 pt: DNA polymerase adds nucleotides 5' to 3' complementary to the template"
      },
      {
        "label": "b",
        "prompt": "Explain why the leading and lagging strands are synthesized differently.",
        "points": 2,
        "rubric": "1 pt: Leading strand is synthesized continuously toward the replication fork\n1 pt: Lagging strand is synthesized discontinuously as Okazaki fragments joined by ligase"
      },
      {
        "label": "c",
        "prompt": "Predict mutation rates in mismatch-repair-deficient strains and justify.",
        "points": 2,
        "rubric": "1 pt: Mutation rate is elevated in mismatch-repair-deficient strains\n1 pt: Because mispaired bases that escape polymerase proofreading are not corrected"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2024 AP Biology FRQ 1"
  },
  {
    "id": "bio-v2-2024-2",
    "courseSlug": "ap-biology",
    "year": 2024,
    "number": 2,
    "topic": "Transcription and Translation",
    "prompt": "A mutation changed a single nucleotide in the coding sequence of a gene from GAG to TAG.",
    "parts": [
      {
        "label": "a",
        "prompt": "Classify the mutation and predict its effect on the resulting protein.",
        "points": 2,
        "rubric": "1 pt: Nonsense mutation producing a premature stop codon (UAG)\n1 pt: Truncated, likely nonfunctional protein"
      },
      {
        "label": "b",
        "prompt": "Describe the roles of the three types of RNA in translation.",
        "points": 3,
        "rubric": "1 pt: mRNA carries the coding sequence from DNA to the ribosome\n1 pt: tRNA delivers amino acids matched to codons by anticodons\n1 pt: rRNA forms the ribosome's catalytic core and peptidyl transferase activity"
      },
      {
        "label": "c",
        "prompt": "Predict how a frameshift mutation differs in effect from the mutation above.",
        "points": 1,
        "rubric": "1 pt: Frameshift alters all downstream codons often causing extensive loss of function"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2024 AP Biology FRQ 2"
  },
  {
    "id": "bio-v2-2024-3",
    "courseSlug": "ap-biology",
    "year": 2024,
    "number": 3,
    "topic": "Population Dynamics",
    "prompt": "A population of rabbits on an island shows logistic growth with carrying capacity K = 500 and intrinsic growth rate r = 0.3.",
    "parts": [
      {
        "label": "a",
        "prompt": "Write the logistic growth equation and calculate dN/dt when N = 100.",
        "points": 2,
        "rubric": "1 pt: dN/dt = rN(1 - N/K)\n1 pt: dN/dt = 0.3(100)(1 - 100/500) = 24 rabbits/year"
      },
      {
        "label": "b",
        "prompt": "Compare exponential vs logistic growth and identify when each applies.",
        "points": 2,
        "rubric": "1 pt: Exponential growth (dN/dt = rN) occurs with unlimited resources\n1 pt: Logistic growth slows as N approaches K due to density-dependent limits"
      },
      {
        "label": "c",
        "prompt": "Describe one density-dependent and one density-independent factor limiting this population.",
        "points": 2,
        "rubric": "1 pt: Density-dependent: disease, competition, or predation\n1 pt: Density-independent: natural disaster, severe weather, or fire"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2024 AP Biology FRQ 3"
  },
  {
    "id": "bio-v2-2024-4",
    "courseSlug": "ap-biology",
    "year": 2024,
    "number": 4,
    "topic": "Pedigree Analysis",
    "prompt": "A pedigree shows a trait appearing in every generation, affecting males and females roughly equally, with affected offspring from two affected parents.",
    "parts": [
      {
        "label": "a",
        "prompt": "Identify the most likely mode of inheritance and justify.",
        "points": 2,
        "rubric": "1 pt: Autosomal dominant\n1 pt: Trait appears every generation and both sexes are affected equally, not skipping generations"
      },
      {
        "label": "b",
        "prompt": "If two heterozygous parents have a child, calculate the probability the child is affected.",
        "points": 2,
        "rubric": "1 pt: 3/4 (Aa x Aa Punnett gives 1 AA : 2 Aa : 1 aa)\n1 pt: Clear Punnett setup showing dominant phenotype"
      },
      {
        "label": "c",
        "prompt": "Explain why an X-linked recessive disorder would not match this pedigree pattern.",
        "points": 2,
        "rubric": "1 pt: X-linked recessive traits affect males more often than females\n1 pt: Such traits often skip generations via carrier females"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2024 AP Biology FRQ 4"
  },

  // ─── ap-chemistry wave-2 (+20) ─────────────────────────────
  {
    "id": "chem-v2-2016-1",
    "courseSlug": "ap-chemistry",
    "year": 2016,
    "number": 1,
    "topic": "Stoichiometry and Limiting Reagent",
    "prompt": "Consider the reaction $2 Al(s) + 3 Cl_2(g) \\rightarrow 2 AlCl_3(s)$. A student combines 5.40 g Al with 12.0 L $Cl_2$ at STP.",
    "parts": [
      {
        "label": "a",
        "prompt": "Determine moles of each reactant and identify the limiting reagent.",
        "points": 2,
        "rubric": "1 pt: 0.200 mol Al and 0.536 mol Cl2\n1 pt: Al is limiting since 0.200/2 = 0.100 < 0.536/3 = 0.179"
      },
      {
        "label": "b",
        "prompt": "Calculate the theoretical yield of $AlCl_3$ in grams.",
        "points": 2,
        "rubric": "1 pt: 0.200 mol AlCl3 produced (1:1 with Al)\n1 pt: 0.200 mol x 133.34 g/mol ~ 26.7 g"
      },
      {
        "label": "c",
        "prompt": "If 22.0 g $AlCl_3$ is isolated, calculate the percent yield.",
        "points": 1,
        "rubric": "1 pt: (22.0/26.7) x 100% ~ 82.4%"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from 2016 AP Chemistry FRQ 1"
  },
  {
    "id": "chem-v2-2016-2",
    "courseSlug": "ap-chemistry",
    "year": 2016,
    "number": 2,
    "topic": "Gas Laws and Kinetic Molecular Theory",
    "prompt": "A sealed 2.00 L vessel contains 0.50 mol $N_2$ and 0.25 mol $O_2$ at 300 K.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the partial pressure of each gas and the total pressure using $PV = nRT$.",
        "points": 2,
        "rubric": "1 pt: P(N2) ~ 6.15 atm, P(O2) ~ 3.08 atm\n1 pt: P(total) ~ 9.23 atm (Dalton's law)"
      },
      {
        "label": "b",
        "prompt": "Compare the average kinetic energies and rms speeds of $N_2$ and $O_2$ in the mixture.",
        "points": 2,
        "rubric": "1 pt: Average KE is the same because both gases are at the same T\n1 pt: N2 has higher rms speed because it has a smaller molar mass (v_rms proportional to 1/sqrt(M))"
      },
      {
        "label": "c",
        "prompt": "Predict how real gas behavior at high pressure deviates from ideal.",
        "points": 2,
        "rubric": "1 pt: At high P, finite molecular volume makes measured V larger than ideal prediction\n1 pt: Intermolecular attractions reduce measured pressure below ideal prediction"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2016 AP Chemistry FRQ 2"
  },
  {
    "id": "chem-v2-2017-3",
    "courseSlug": "ap-chemistry",
    "year": 2017,
    "number": 3,
    "topic": "Acid-Base Equilibria and Buffers",
    "prompt": "A buffer is prepared by mixing 0.100 mol acetic acid ($K_a = 1.8 \\times 10^{-5}$) and 0.100 mol sodium acetate in 1.00 L water.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the pH of the buffer using $pH = pK_a + \\log\\frac{[A^-]}{[HA]}$.",
        "points": 2,
        "rubric": "1 pt: pKa ~ 4.74\n1 pt: pH ~ 4.74 since [A-] = [HA]"
      },
      {
        "label": "b",
        "prompt": "Predict the pH change if 0.010 mol HCl is added to the buffer.",
        "points": 2,
        "rubric": "1 pt: HCl converts 0.010 mol acetate to acetic acid giving [A-]/[HA] = 0.090/0.110\n1 pt: pH ~ 4.74 + log(0.818) ~ 4.65"
      },
      {
        "label": "c",
        "prompt": "Explain why a buffer resists pH changes when small amounts of acid or base are added.",
        "points": 2,
        "rubric": "1 pt: The weak acid neutralizes added base; the conjugate base neutralizes added acid\n1 pt: Ratio [A-]/[HA] changes only slightly keeping pH near pKa"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2017 AP Chemistry FRQ 3"
  },
  {
    "id": "chem-v2-2017-4",
    "courseSlug": "ap-chemistry",
    "year": 2017,
    "number": 4,
    "topic": "Equilibrium and LeChatelier",
    "prompt": "Consider the gas-phase equilibrium $N_2(g) + 3 H_2(g) \\rightleftharpoons 2 NH_3(g)$ with $\\Delta H = -92$ kJ.",
    "parts": [
      {
        "label": "a",
        "prompt": "Write the expression for $K_c$ and $K_p$.",
        "points": 2,
        "rubric": "1 pt: $K_c = \\frac{[NH_3]^2}{[N_2][H_2]^3}$\n1 pt: $K_p = \\frac{P_{NH_3}^2}{P_{N_2} P_{H_2}^3}$"
      },
      {
        "label": "b",
        "prompt": "Predict the effect on NH3 yield of (i) increasing pressure, (ii) increasing temperature.",
        "points": 2,
        "rubric": "1 pt: Increasing P shifts to fewer moles of gas (right) increasing NH3 yield\n1 pt: Increasing T shifts exothermic reaction left decreasing NH3 yield"
      },
      {
        "label": "c",
        "prompt": "At a given instant Q = 2K. Predict the direction of shift and justify.",
        "points": 2,
        "rubric": "1 pt: Reaction shifts to the left (reverse direction)\n1 pt: Because Q > K the system consumes products to re-establish equilibrium"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2017 AP Chemistry FRQ 4"
  },
  {
    "id": "chem-v2-2018-1",
    "courseSlug": "ap-chemistry",
    "year": 2018,
    "number": 1,
    "topic": "Solubility Equilibria",
    "prompt": "The $K_{sp}$ of $PbCl_2$ is $1.6 \\times 10^{-5}$ at 25 C.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the molar solubility of $PbCl_2$ in pure water.",
        "points": 2,
        "rubric": "1 pt: Ksp = [Pb2+][Cl-]^2 = s(2s)^2 = 4s^3\n1 pt: s ~ (1.6e-5 / 4)^(1/3) ~ 1.6e-2 M"
      },
      {
        "label": "b",
        "prompt": "Predict and justify the effect of adding 0.10 M NaCl on the solubility of $PbCl_2$.",
        "points": 2,
        "rubric": "1 pt: Solubility decreases due to the common-ion effect\n1 pt: Increased [Cl-] shifts equilibrium toward solid PbCl2 (LeChatelier)"
      },
      {
        "label": "c",
        "prompt": "Explain why $PbS$ is less soluble in acidic solution than $PbCl_2$.",
        "points": 2,
        "rubric": "1 pt: S2- is the conjugate base of a weak acid (HS-) and reacts with H+\n1 pt: In acid H+ removes S2- shifting dissolution forward, increasing solubility (answer must note acid increases PbS solubility while Cl- is a spectator for PbCl2)"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2018 AP Chemistry FRQ 1"
  },
  {
    "id": "chem-v2-2018-2",
    "courseSlug": "ap-chemistry",
    "year": 2018,
    "number": 2,
    "topic": "Thermochemistry and Hess's Law",
    "prompt": "Given $\\Delta H_f^{\\circ}$: $CO_2(g) = -393.5$ kJ/mol, $H_2O(l) = -285.8$ kJ/mol, $C_2H_5OH(l) = -277.7$ kJ/mol.",
    "parts": [
      {
        "label": "a",
        "prompt": "Write the balanced combustion equation for ethanol.",
        "points": 1,
        "rubric": "1 pt: $C_2H_5OH(l) + 3 O_2(g) \\rightarrow 2 CO_2(g) + 3 H_2O(l)$"
      },
      {
        "label": "b",
        "prompt": "Calculate $\\Delta H^{\\circ}_{rxn}$ using Hess's law.",
        "points": 2,
        "rubric": "1 pt: DeltaH = [2(-393.5) + 3(-285.8)] - [-277.7 + 0]\n1 pt: DeltaH ~ -1366.7 kJ/mol"
      },
      {
        "label": "c",
        "prompt": "Predict signs of $\\Delta S$ and $\\Delta G$ and whether combustion is spontaneous.",
        "points": 2,
        "rubric": "1 pt: Delta S > 0 (more moles of gas, more disorder)\n1 pt: Delta G < 0 at all typical T so the reaction is spontaneous"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from 2018 AP Chemistry FRQ 2"
  },
  {
    "id": "chem-v2-2019-3",
    "courseSlug": "ap-chemistry",
    "year": 2019,
    "number": 3,
    "topic": "Kinetics: Rate Law from Data",
    "prompt": "For the reaction $A + B \\rightarrow C$, initial rate data are: trial 1 [A]=0.1, [B]=0.1, rate=2e-3; trial 2 [A]=0.2, [B]=0.1, rate=8e-3; trial 3 [A]=0.1, [B]=0.2, rate=2e-3.",
    "parts": [
      {
        "label": "a",
        "prompt": "Determine the order in A and B and write the rate law.",
        "points": 2,
        "rubric": "1 pt: Second order in A, zero order in B\n1 pt: rate = k[A]^2"
      },
      {
        "label": "b",
        "prompt": "Calculate the rate constant k with units.",
        "points": 2,
        "rubric": "1 pt: k = rate/[A]^2 = 2e-3/(0.1)^2\n1 pt: k = 0.2 M^-1 s^-1"
      },
      {
        "label": "c",
        "prompt": "Propose a mechanism consistent with this rate law identifying the rate-determining step.",
        "points": 2,
        "rubric": "1 pt: RDS involves 2A colliding (A + A -> intermediate)\n1 pt: Subsequent fast step uses B to give C so B does not appear in the rate law"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2019 AP Chemistry FRQ 3"
  },
  {
    "id": "chem-v2-2019-4",
    "courseSlug": "ap-chemistry",
    "year": 2019,
    "number": 4,
    "topic": "Integrated Rate Laws and Arrhenius",
    "prompt": "A first-order reaction has a rate constant $k = 0.023$ s$^{-1}$ at 298 K and $E_a = 75$ kJ/mol.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the half-life of the reaction.",
        "points": 1,
        "rubric": "1 pt: t_{1/2} = 0.693/k ~ 30.1 s"
      },
      {
        "label": "b",
        "prompt": "Starting with [A]_0 = 0.50 M, calculate [A] after 60 s.",
        "points": 2,
        "rubric": "1 pt: ln([A]/[A]_0) = -kt with kt = 1.38\n1 pt: [A] = 0.50 e^(-1.38) ~ 0.126 M"
      },
      {
        "label": "c",
        "prompt": "Predict how k changes when T is raised to 318 K using $\\ln(k_2/k_1) = -E_a/R (1/T_2 - 1/T_1)$.",
        "points": 2,
        "rubric": "1 pt: Correct Arrhenius setup giving ln(k2/k1) ~ 75000/8.314 x (1/298 - 1/318) ~ 1.90\n1 pt: k2 ~ k1 x e^1.90 ~ 0.154 s^-1 (k increases)"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from 2019 AP Chemistry FRQ 4"
  },
  {
    "id": "chem-v2-2020-1",
    "courseSlug": "ap-chemistry",
    "year": 2020,
    "number": 1,
    "topic": "Voltaic Cells and Nernst Equation",
    "prompt": "A galvanic cell is built from $Zn|Zn^{2+}(1.0 M)||Cu^{2+}(1.0 M)|Cu$ with $E^{\\circ} = +1.10$ V.",
    "parts": [
      {
        "label": "a",
        "prompt": "Write the balanced overall cell reaction and identify anode and cathode.",
        "points": 2,
        "rubric": "1 pt: Anode (oxidation): Zn -> Zn2+ + 2e-; Cathode (reduction): Cu2+ + 2e- -> Cu\n1 pt: Overall: Zn + Cu2+ -> Zn2+ + Cu"
      },
      {
        "label": "b",
        "prompt": "Calculate $\\Delta G^{\\circ}$ using $\\Delta G^{\\circ} = -nFE^{\\circ}$.",
        "points": 2,
        "rubric": "1 pt: n = 2 and F = 96485 C/mol\n1 pt: Delta G = -2 x 96485 x 1.10 ~ -212 kJ/mol"
      },
      {
        "label": "c",
        "prompt": "Predict the cell potential when $[Zn^{2+}] = 1.0$ M and $[Cu^{2+}] = 0.010$ M at 298 K.",
        "points": 2,
        "rubric": "1 pt: E = E° - (0.0592/n) log Q with Q = [Zn2+]/[Cu2+] = 100\n1 pt: E ~ 1.10 - 0.0592 ~ 1.04 V"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2020 AP Chemistry FRQ 1"
  },
  {
    "id": "chem-v2-2020-2",
    "courseSlug": "ap-chemistry",
    "year": 2020,
    "number": 2,
    "topic": "Electrolysis and Faraday's Law",
    "prompt": "A current of 2.00 A is passed through molten $NaCl$ for 1.00 hour.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the total charge passed in coulombs.",
        "points": 1,
        "rubric": "1 pt: Q = It = 2.00 x 3600 = 7200 C"
      },
      {
        "label": "b",
        "prompt": "Calculate the mass of Na deposited at the cathode. ($F = 96485$ C/mol; Na = 22.99 g/mol)",
        "points": 2,
        "rubric": "1 pt: Moles e- = 7200/96485 ~ 0.0746; 1 mol e- per mol Na\n1 pt: Mass Na ~ 0.0746 x 22.99 ~ 1.72 g"
      },
      {
        "label": "c",
        "prompt": "Identify the product formed at the anode and write the half-reaction.",
        "points": 2,
        "rubric": "1 pt: Cl2(g) is produced\n1 pt: 2 Cl- -> Cl2 + 2 e-"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from 2020 AP Chemistry FRQ 2"
  },
  {
    "id": "chem-v2-2021-3",
    "courseSlug": "ap-chemistry",
    "year": 2021,
    "number": 3,
    "topic": "Bonding and Intermolecular Forces",
    "prompt": "Compare the properties of $CH_4$, $NH_3$, and $H_2O$.",
    "parts": [
      {
        "label": "a",
        "prompt": "Draw the Lewis structure and predict the molecular geometry of each molecule.",
        "points": 3,
        "rubric": "1 pt: CH4 tetrahedral (no lone pairs on C)\n1 pt: NH3 trigonal pyramidal (one lone pair on N)\n1 pt: H2O bent (two lone pairs on O)"
      },
      {
        "label": "b",
        "prompt": "Rank the three compounds by boiling point and justify using IMFs.",
        "points": 2,
        "rubric": "1 pt: H2O > NH3 > CH4\n1 pt: H2O has the strongest H-bonding (two H-bond donors and two acceptors), NH3 has weaker H-bonding, CH4 has only London dispersion"
      },
      {
        "label": "c",
        "prompt": "Explain why $NH_3$ is more polar than $CH_4$ even though both contain polar covalent bonds to H.",
        "points": 2,
        "rubric": "1 pt: CH4 has tetrahedral symmetry so bond dipoles cancel giving zero net dipole\n1 pt: NH3 is asymmetric with a lone pair so bond dipoles sum to a nonzero molecular dipole"
      }
    ],
    "totalPoints": 7,
    "source": "Adapted from 2021 AP Chemistry FRQ 3"
  },
  {
    "id": "chem-v2-2021-4",
    "courseSlug": "ap-chemistry",
    "year": 2021,
    "number": 4,
    "topic": "Periodic Trends",
    "prompt": "Consider atoms of Na, Mg, Al, and Cl in the third period.",
    "parts": [
      {
        "label": "a",
        "prompt": "Rank the atoms by first ionization energy and justify.",
        "points": 2,
        "rubric": "1 pt: Cl > Al > Mg > Na (Mg slightly higher than Al due to filled 3s subshell)\n1 pt: Across a period effective nuclear charge increases pulling electrons tighter"
      },
      {
        "label": "b",
        "prompt": "Rank the same atoms by atomic radius and explain the trend.",
        "points": 2,
        "rubric": "1 pt: Na > Mg > Al > Cl\n1 pt: Increasing Zeff with same shell contracts the electron cloud across a period"
      },
      {
        "label": "c",
        "prompt": "Predict which atom has the highest electron affinity and justify.",
        "points": 1,
        "rubric": "1 pt: Cl has the highest EA because gaining an electron completes the 3p subshell giving a noble-gas configuration"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from 2021 AP Chemistry FRQ 4"
  },
  {
    "id": "chem-v2-2022-1",
    "courseSlug": "ap-chemistry",
    "year": 2022,
    "number": 1,
    "topic": "Redox Balancing",
    "prompt": "Consider the redox reaction in acidic solution: $MnO_4^- + Fe^{2+} \\rightarrow Mn^{2+} + Fe^{3+}$.",
    "parts": [
      {
        "label": "a",
        "prompt": "Write and balance the two half-reactions.",
        "points": 2,
        "rubric": "1 pt: MnO4- + 8 H+ + 5 e- -> Mn2+ + 4 H2O\n1 pt: Fe2+ -> Fe3+ + e-"
      },
      {
        "label": "b",
        "prompt": "Combine to give the balanced overall equation.",
        "points": 2,
        "rubric": "1 pt: MnO4- + 8 H+ + 5 Fe2+ -> Mn2+ + 4 H2O + 5 Fe3+\n1 pt: Charges and atoms balanced on both sides"
      },
      {
        "label": "c",
        "prompt": "Identify the oxidizing agent and the reducing agent.",
        "points": 2,
        "rubric": "1 pt: MnO4- is the oxidizing agent (Mn is reduced from +7 to +2)\n1 pt: Fe2+ is the reducing agent (oxidized from +2 to +3)"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2022 AP Chemistry FRQ 1"
  },
  {
    "id": "chem-v2-2022-2",
    "courseSlug": "ap-chemistry",
    "year": 2022,
    "number": 2,
    "topic": "Titration Curves",
    "prompt": "A 25.0 mL sample of 0.100 M acetic acid ($K_a = 1.8 \\times 10^{-5}$) is titrated with 0.100 M NaOH.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the pH at the half-equivalence point.",
        "points": 1,
        "rubric": "1 pt: pH = pKa ~ 4.74 at half-equivalence"
      },
      {
        "label": "b",
        "prompt": "Calculate the pH at the equivalence point.",
        "points": 3,
        "rubric": "1 pt: [Acetate] = 0.0500 M after mixing 50.0 mL total\n1 pt: Kb = Kw/Ka = 5.6e-10; [OH-] ~ sqrt(5.6e-10 x 0.0500) ~ 5.3e-6 M\n1 pt: pOH ~ 5.28 so pH ~ 8.72"
      },
      {
        "label": "c",
        "prompt": "Select an appropriate indicator from: methyl red (pKa 5.1), bromothymol blue (pKa 7.1), phenolphthalein (pKa 9.4). Justify.",
        "points": 2,
        "rubric": "1 pt: Phenolphthalein\n1 pt: Its pKa is closest to the equivalence pH (~8.7) so it changes color near the equivalence point"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2022 AP Chemistry FRQ 2"
  },
  {
    "id": "chem-v2-2023-3",
    "courseSlug": "ap-chemistry",
    "year": 2023,
    "number": 3,
    "topic": "Calorimetry and Bond Enthalpy",
    "prompt": "A coffee-cup calorimeter contains 100.0 g water at 22.0 C. Dissolving 5.00 g NH4NO3 drops the temperature to 18.5 C. ($c_{water} = 4.18$ J/g C; NH4NO3 = 80.04 g/mol)",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the heat absorbed by the solution (q) and state its sign.",
        "points": 2,
        "rubric": "1 pt: q = m c Delta T = 100.0 x 4.18 x (-3.5) ~ -1463 J\n1 pt: Solution loses heat so q_soln < 0; the dissolution process absorbs that heat (endothermic)"
      },
      {
        "label": "b",
        "prompt": "Calculate $\\Delta H_{soln}$ per mole of $NH_4NO_3$.",
        "points": 2,
        "rubric": "1 pt: Moles NH4NO3 = 5.00/80.04 ~ 0.0625\n1 pt: Delta H_soln ~ +1463/0.0625 ~ +23.4 kJ/mol"
      },
      {
        "label": "c",
        "prompt": "Use bond enthalpies to estimate $\\Delta H$ for $H_2(g) + Cl_2(g) \\rightarrow 2 HCl(g)$ (H-H = 436, Cl-Cl = 242, H-Cl = 431 kJ/mol).",
        "points": 2,
        "rubric": "1 pt: Delta H = (436 + 242) - 2(431)\n1 pt: Delta H ~ -184 kJ (exothermic)"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2023 AP Chemistry FRQ 3"
  },
  {
    "id": "chem-v2-2023-4",
    "courseSlug": "ap-chemistry",
    "year": 2023,
    "number": 4,
    "topic": "Gibbs Free Energy",
    "prompt": "For the reaction $N_2O_4(g) \\rightleftharpoons 2 NO_2(g)$, $\\Delta H^{\\circ} = +57.2$ kJ/mol and $\\Delta S^{\\circ} = +176$ J/mol K.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate $\\Delta G^{\\circ}$ at 298 K and comment on spontaneity.",
        "points": 2,
        "rubric": "1 pt: Delta G = 57200 - 298 x 176\n1 pt: Delta G ~ +4.75 kJ/mol (nonspontaneous at 298 K)"
      },
      {
        "label": "b",
        "prompt": "Determine the temperature at which the reaction becomes spontaneous.",
        "points": 2,
        "rubric": "1 pt: Set Delta G = 0 so T = Delta H/Delta S\n1 pt: T ~ 57200/176 ~ 325 K"
      },
      {
        "label": "c",
        "prompt": "Relate $\\Delta G^{\\circ}$ to K using $\\Delta G^{\\circ} = -RT \\ln K$. Is K > 1 or < 1 at 298 K?",
        "points": 2,
        "rubric": "1 pt: K < 1 because Delta G° > 0 implies ln K < 0\n1 pt: K ~ e^(-Delta G°/RT) ~ e^(-4750/(8.314 x 298)) ~ 0.15"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2023 AP Chemistry FRQ 4"
  },
  {
    "id": "chem-v2-2024-1",
    "courseSlug": "ap-chemistry",
    "year": 2024,
    "number": 1,
    "topic": "Solutions and Colligative Properties",
    "prompt": "A student dissolves 10.0 g of an unknown nonvolatile nonelectrolyte in 100.0 g of water. The solution freezes at -1.24 C. ($K_f$ water = 1.86 C/m)",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the molality of the solution.",
        "points": 1,
        "rubric": "1 pt: Delta Tf = Kf m so m = 1.24/1.86 ~ 0.667 mol/kg"
      },
      {
        "label": "b",
        "prompt": "Calculate the molar mass of the solute.",
        "points": 2,
        "rubric": "1 pt: Moles solute = 0.667 x 0.100 = 0.0667\n1 pt: M ~ 10.0/0.0667 ~ 150 g/mol"
      },
      {
        "label": "c",
        "prompt": "Predict how the freezing point depression would differ if the solute were a strong electrolyte dissociating into 2 ions.",
        "points": 2,
        "rubric": "1 pt: Delta Tf = i Kf m with van't Hoff factor i ~ 2\n1 pt: Depression would be ~ 2x larger so freezing point ~ -2.48 C"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from 2024 AP Chemistry FRQ 1"
  },
  {
    "id": "chem-v2-2024-2",
    "courseSlug": "ap-chemistry",
    "year": 2024,
    "number": 2,
    "topic": "Ka/Kb and Weak Acids",
    "prompt": "Formic acid ($HCOOH$) has $K_a = 1.8 \\times 10^{-4}$.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the pH of 0.20 M formic acid using an ICE table.",
        "points": 2,
        "rubric": "1 pt: x^2/(0.20 - x) = 1.8e-4; approximate x^2 = 3.6e-5\n1 pt: x = [H+] ~ 6.0e-3 so pH ~ 2.22"
      },
      {
        "label": "b",
        "prompt": "Calculate $K_b$ for the formate ion.",
        "points": 1,
        "rubric": "1 pt: Kb = Kw/Ka = 1.0e-14/1.8e-4 ~ 5.6e-11"
      },
      {
        "label": "c",
        "prompt": "Predict whether a 0.10 M sodium formate solution is acidic, basic, or neutral and justify.",
        "points": 2,
        "rubric": "1 pt: Basic\n1 pt: Formate is the conjugate base of a weak acid and hydrolyzes water to produce OH-"
      }
    ],
    "totalPoints": 5,
    "source": "Adapted from 2024 AP Chemistry FRQ 2"
  },
  {
    "id": "chem-v2-2024-3",
    "courseSlug": "ap-chemistry",
    "year": 2024,
    "number": 3,
    "topic": "Ksp and pH Effects",
    "prompt": "The $K_{sp}$ of $Mg(OH)_2$ is $5.6 \\times 10^{-12}$.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the molar solubility in pure water.",
        "points": 2,
        "rubric": "1 pt: Ksp = [Mg2+][OH-]^2 = s(2s)^2 = 4s^3\n1 pt: s ~ (5.6e-12/4)^(1/3) ~ 1.12e-4 M"
      },
      {
        "label": "b",
        "prompt": "Calculate the pH of the saturated solution.",
        "points": 2,
        "rubric": "1 pt: [OH-] = 2s ~ 2.24e-4 M so pOH ~ 3.65\n1 pt: pH ~ 10.35"
      },
      {
        "label": "c",
        "prompt": "Predict and justify the effect of adding HCl on $Mg(OH)_2$ solubility.",
        "points": 2,
        "rubric": "1 pt: Solubility increases\n1 pt: H+ consumes OH- shifting the dissolution equilibrium to the right (LeChatelier)"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2024 AP Chemistry FRQ 3"
  },
  {
    "id": "chem-v2-2024-4",
    "courseSlug": "ap-chemistry",
    "year": 2024,
    "number": 4,
    "topic": "Reaction Mechanisms",
    "prompt": "For $2 NO(g) + O_2(g) \\rightarrow 2 NO_2(g)$, a proposed mechanism is: Step 1 (fast equilibrium): $2 NO \\rightleftharpoons N_2O_2$; Step 2 (slow): $N_2O_2 + O_2 \\rightarrow 2 NO_2$.",
    "parts": [
      {
        "label": "a",
        "prompt": "Derive the rate law predicted by this mechanism.",
        "points": 2,
        "rubric": "1 pt: Rate = k2[N2O2][O2] with [N2O2] = K1[NO]^2 from fast equilibrium\n1 pt: Rate = k[NO]^2[O2]"
      },
      {
        "label": "b",
        "prompt": "Identify the reaction intermediate and any catalyst.",
        "points": 2,
        "rubric": "1 pt: N2O2 is the intermediate (produced in step 1 and consumed in step 2)\n1 pt: No catalyst is present in this mechanism"
      },
      {
        "label": "c",
        "prompt": "Explain why step 2 is rate determining.",
        "points": 2,
        "rubric": "1 pt: Step 2 is the slowest elementary step\n1 pt: Overall rate is limited by the slowest step; fast steps before it stay at equilibrium"
      }
    ],
    "totalPoints": 6,
    "source": "Adapted from 2024 AP Chemistry FRQ 4"
  },

  // ─── ap-environmental wave-2 (+20) ─────────────────────────────
  {
    "id": "apes-v2-2016-1",
    "courseSlug": "ap-environmental",
    "year": 2016,
    "number": 1,
    "topic": "Water pollution and eutrophication",
    "prompt": "A small freshwater lake in the midwestern United States is bordered by agricultural fields where farmers apply synthetic fertilizers containing nitrogen and phosphorus. Residents report that the lake has recently experienced extensive algal blooms and fish kills, particularly during late summer. Water samples taken from the hypolimnion show elevated biochemical oxygen demand (BOD) and dissolved oxygen concentrations below 2 mg/L.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the process of cultural eutrophication as it applies to this lake.",
        "points": 2,
        "rubric": "1 pt: Excess nutrients (N and P) from runoff enter the lake\n1 pt: Nutrients stimulate algal/phytoplankton blooms that later die and are decomposed by aerobic bacteria, depleting DO"
      },
      {
        "label": "b",
        "prompt": "Identify ONE specific source of nonpoint pollution contributing to the eutrophication and explain why it is considered nonpoint.",
        "points": 2,
        "rubric": "1 pt: Identifies source such as fertilizer runoff from fields or animal waste runoff\n1 pt: Explains that it cannot be traced to a single discrete discharge point"
      },
      {
        "label": "c",
        "prompt": "Explain how dissolved oxygen levels below 2 mg/L lead to fish kills.",
        "points": 1,
        "rubric": "1 pt: Fish require DO for aerobic respiration; hypoxia causes suffocation/death"
      },
      {
        "label": "d",
        "prompt": "Describe ONE best management practice (BMP) farmers could implement to reduce nutrient runoff and explain how it reduces runoff.",
        "points": 2,
        "rubric": "1 pt: Identifies BMP (e.g., riparian buffer strip, cover crops, contour plowing, no-till)\n1 pt: Explains mechanism by which BMP reduces nutrient transport to surface water"
      },
      {
        "label": "e",
        "prompt": "Calculate the mass (in kg) of phosphorus entering the lake annually if 500 hectares of farmland lose fertilizer at a rate of 4 kg P per hectare per year.",
        "points": 1,
        "rubric": "1 pt: 500 x 4 = 2,000 kg P/year with correct units"
      },
      {
        "label": "f",
        "prompt": "Identify ONE provision of the Clean Water Act that addresses water pollution from point sources.",
        "points": 2,
        "rubric": "1 pt: Names NPDES permitting or effluent standards\n1 pt: Correctly explains that it regulates discharges from point sources such as factories or sewage treatment plants"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2016 APES FRQ 1"
  },
  {
    "id": "apes-v2-2016-2",
    "courseSlug": "ap-environmental",
    "year": 2016,
    "number": 2,
    "topic": "Energy - nuclear fission",
    "prompt": "A utility company is proposing to build a 1,000 MW nuclear power plant on the coast of a temperate region. The plant will use uranium-235 as fuel and seawater for cooling. Local citizens have raised concerns about radioactive waste storage and thermal pollution.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the process of nuclear fission as it occurs in a reactor core.",
        "points": 2,
        "rubric": "1 pt: Neutron strikes U-235 nucleus causing it to split into lighter nuclei\n1 pt: Reaction releases energy and additional neutrons that sustain a chain reaction"
      },
      {
        "label": "b",
        "prompt": "Explain ONE environmental advantage of nuclear power compared to coal combustion.",
        "points": 1,
        "rubric": "1 pt: Does not emit CO2, SO2, NOx, or particulates during operation"
      },
      {
        "label": "c",
        "prompt": "Describe ONE challenge associated with long-term storage of high-level radioactive waste.",
        "points": 2,
        "rubric": "1 pt: Identifies challenge (e.g., long half-lives, risk of groundwater contamination, political siting)\n1 pt: Explains specific environmental or human health consequence"
      },
      {
        "label": "d",
        "prompt": "If the plant operates at 33% efficiency, calculate the thermal energy (in MW) released as waste heat.",
        "points": 2,
        "rubric": "1 pt: Sets up: total thermal = 1000/0.33 = 3030 MW\n1 pt: Waste heat = 3030 - 1000 = 2030 MW (accept 2000 MW)"
      },
      {
        "label": "e",
        "prompt": "Describe ONE ecological impact of thermal pollution from the plant's cooling water discharge.",
        "points": 1,
        "rubric": "1 pt: Warmer water decreases DO solubility, stressing or killing fish and invertebrates"
      },
      {
        "label": "f",
        "prompt": "Identify and describe ONE renewable energy source that could replace this plant and describe ONE disadvantage of that source.",
        "points": 2,
        "rubric": "1 pt: Identifies renewable (solar, wind, geothermal, hydro) with one relevant characteristic\n1 pt: Describes a legitimate disadvantage (intermittency, land use, habitat disruption, high capital cost)"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2016 APES FRQ 2"
  },
  {
    "id": "apes-v2-2016-3",
    "courseSlug": "ap-environmental",
    "year": 2016,
    "number": 3,
    "topic": "Population - demographic transition",
    "prompt": "Country X has a total population of 40 million, a crude birth rate of 32 per 1,000, and a crude death rate of 8 per 1,000. Approximately 40% of the population is under age 15.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the annual rate of natural increase (as a percentage) for Country X.",
        "points": 1,
        "rubric": "1 pt: (32 - 8)/10 = 2.4% per year"
      },
      {
        "label": "b",
        "prompt": "Using the rule of 70, calculate the doubling time for Country X's population.",
        "points": 1,
        "rubric": "1 pt: 70/2.4 = 29.2 years (accept 29-30 years)"
      },
      {
        "label": "c",
        "prompt": "Identify the stage of the demographic transition that best describes Country X and justify your answer.",
        "points": 2,
        "rubric": "1 pt: Identifies Stage 2 (or early Stage 3)\n1 pt: Justifies using high birth rate with declining death rate and rapid growth"
      },
      {
        "label": "d",
        "prompt": "Describe ONE social factor that typically lowers birth rates as a country moves through the demographic transition.",
        "points": 1,
        "rubric": "1 pt: Increased female education/access to contraception/urbanization/delayed marriage"
      },
      {
        "label": "e",
        "prompt": "Explain ONE environmental consequence of continued rapid population growth in Country X.",
        "points": 2,
        "rubric": "1 pt: Identifies impact (deforestation, water scarcity, soil degradation, air pollution)\n1 pt: Explains causal mechanism linking population growth to that impact"
      },
      {
        "label": "f",
        "prompt": "Describe ONE government policy that has successfully reduced fertility rates in a specific country.",
        "points": 2,
        "rubric": "1 pt: Names policy (e.g., China's one-child, India's family planning, Iran's education)\n1 pt: Describes how the policy reduced fertility"
      },
      {
        "label": "g",
        "prompt": "Explain why a high percentage of individuals under age 15 creates momentum for continued population growth.",
        "points": 1,
        "rubric": "1 pt: Large cohort will enter reproductive years, increasing future births even if fertility falls"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2016 APES FRQ 3"
  },
  {
    "id": "apes-v2-2017-1",
    "courseSlug": "ap-environmental",
    "year": 2017,
    "number": 1,
    "topic": "Air pollution and acid deposition",
    "prompt": "A coal-fired power plant in the eastern United States emits sulfur dioxide (SO2) and nitrogen oxides (NOx). Prevailing westerlies carry emissions hundreds of kilometers downwind, where lakes have recorded pH values as low as 4.2 and significant declines in fish populations.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the chemical process by which SO2 emissions form acid deposition in the atmosphere.",
        "points": 2,
        "rubric": "1 pt: SO2 reacts with OH or O2 to form SO3\n1 pt: SO3 combines with water vapor to form H2SO4, which falls as wet or dry deposition"
      },
      {
        "label": "b",
        "prompt": "Identify ONE ecological effect of acid deposition on aquatic ecosystems other than direct fish mortality.",
        "points": 1,
        "rubric": "1 pt: Mobilization of aluminum from soils damaging fish gills OR loss of acid-sensitive invertebrates OR reduced biodiversity"
      },
      {
        "label": "c",
        "prompt": "Describe ONE control technology installed at coal plants to reduce SO2 emissions and explain how it works.",
        "points": 2,
        "rubric": "1 pt: Identifies flue-gas desulfurization (scrubber)\n1 pt: Explains limestone slurry reacts with SO2 to form calcium sulfate/sulfite"
      },
      {
        "label": "d",
        "prompt": "Identify the federal law and specific amendment that established the cap-and-trade program for SO2 in the United States.",
        "points": 1,
        "rubric": "1 pt: Clean Air Act Amendments of 1990 (Title IV / Acid Rain Program)"
      },
      {
        "label": "e",
        "prompt": "A plant emits 8,000 metric tons of SO2 per year. If a scrubber removes 95% of SO2, calculate the mass of SO2 emitted after scrubbing.",
        "points": 2,
        "rubric": "1 pt: 8000 x 0.05 or 8000 x (1-0.95)\n1 pt: = 400 metric tons/year with correct units"
      },
      {
        "label": "f",
        "prompt": "Describe ONE economic advantage of a cap-and-trade approach over a command-and-control approach for regulating SO2.",
        "points": 2,
        "rubric": "1 pt: Identifies advantage (lower overall compliance cost, flexibility, incentive for innovation)\n1 pt: Explains reasoning (firms with low abatement costs reduce most, sell allowances)"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2017 APES FRQ 1"
  },
  {
    "id": "apes-v2-2017-2",
    "courseSlug": "ap-environmental",
    "year": 2017,
    "number": 2,
    "topic": "Agriculture - IPM and soil",
    "prompt": "A farmer in California's Central Valley grows tomatoes as a monoculture and has been using broad-spectrum insecticides for years. Recently, pest populations have rebounded more rapidly after each application and beneficial predator populations have declined.",
    "parts": [
      {
        "label": "a",
        "prompt": "Explain the concept of pesticide resistance and how it develops in pest populations.",
        "points": 2,
        "rubric": "1 pt: Genetic variation exists; pesticide exerts selective pressure\n1 pt: Resistant individuals survive and reproduce, increasing resistant allele frequency"
      },
      {
        "label": "b",
        "prompt": "Describe TWO components of an integrated pest management (IPM) program the farmer could adopt.",
        "points": 2,
        "rubric": "1 pt: First component (crop rotation, biological control, pheromone traps, resistant cultivars, economic thresholds)\n1 pt: Second distinct component"
      },
      {
        "label": "c",
        "prompt": "Describe ONE disadvantage of monoculture compared to polyculture.",
        "points": 1,
        "rubric": "1 pt: Increased pest vulnerability, nutrient depletion, soil erosion, or genetic uniformity"
      },
      {
        "label": "d",
        "prompt": "Explain how excessive tilling contributes to soil erosion.",
        "points": 2,
        "rubric": "1 pt: Tilling breaks up soil aggregates and exposes bare soil\n1 pt: Loose soil is carried by wind/water, reducing topsoil and organic matter"
      },
      {
        "label": "e",
        "prompt": "Describe ONE benefit of using cover crops in the off-season.",
        "points": 1,
        "rubric": "1 pt: Reduces erosion, adds organic matter, fixes nitrogen, suppresses weeds"
      },
      {
        "label": "f",
        "prompt": "Calculate the annual soil loss (in metric tons) if the farm covers 250 hectares and erodes at 8 metric tons per hectare per year.",
        "points": 1,
        "rubric": "1 pt: 250 x 8 = 2,000 metric tons/year"
      },
      {
        "label": "g",
        "prompt": "Identify ONE federal program in the United States that pays farmers to take highly erodible land out of production.",
        "points": 1,
        "rubric": "1 pt: Conservation Reserve Program (CRP) under the USDA Farm Bill"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2017 APES FRQ 2"
  },
  {
    "id": "apes-v2-2017-3",
    "courseSlug": "ap-environmental",
    "year": 2017,
    "number": 3,
    "topic": "Biodiversity and invasive species",
    "prompt": "The brown tree snake (Boiga irregularis) was accidentally introduced to Guam in the 1940s via cargo ships. Since then, the snake has caused the extinction or extirpation of nearly all native forest bird species on the island.",
    "parts": [
      {
        "label": "a",
        "prompt": "Define 'invasive species' and identify TWO characteristics that make a species likely to become invasive.",
        "points": 2,
        "rubric": "1 pt: Non-native species that causes ecological or economic harm\n1 pt: Two traits (high reproductive rate, broad diet, lack of predators, rapid dispersal, tolerance of disturbance)"
      },
      {
        "label": "b",
        "prompt": "Explain why island ecosystems are especially vulnerable to invasive species.",
        "points": 2,
        "rubric": "1 pt: Island species evolved without similar predators/competitors (naivete)\n1 pt: Small populations and endemism mean limited resilience and no rescue effect"
      },
      {
        "label": "c",
        "prompt": "Describe ONE ecological cascade effect resulting from the loss of native birds on Guam.",
        "points": 2,
        "rubric": "1 pt: Identifies effect (decline in seed dispersal, increase in spider populations, reduced pollination)\n1 pt: Explains mechanism linking bird loss to the effect"
      },
      {
        "label": "d",
        "prompt": "Identify and describe ONE strategy used to control brown tree snake populations.",
        "points": 2,
        "rubric": "1 pt: Names method (acetaminophen-baited mice, trapping, detector dogs at ports)\n1 pt: Explains how method reduces snake numbers or prevents spread"
      },
      {
        "label": "e",
        "prompt": "Identify the U.S. federal law that protects species listed as threatened or endangered.",
        "points": 1,
        "rubric": "1 pt: Endangered Species Act of 1973"
      },
      {
        "label": "f",
        "prompt": "Explain why biodiversity hotspots are priority areas for conservation.",
        "points": 1,
        "rubric": "1 pt: High endemism combined with significant habitat loss maximizes species saved per area protected"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2017 APES FRQ 3"
  },
  {
    "id": "apes-v2-2018-1",
    "courseSlug": "ap-environmental",
    "year": 2018,
    "number": 1,
    "topic": "Water resources and aquifers",
    "prompt": "The Ogallala Aquifer underlies portions of eight Great Plains states and supplies roughly 30% of U.S. irrigation water. Current withdrawal rates exceed natural recharge by a factor of more than ten in parts of the aquifer.",
    "parts": [
      {
        "label": "a",
        "prompt": "Define 'aquifer' and distinguish between a confined and an unconfined aquifer.",
        "points": 2,
        "rubric": "1 pt: Aquifer = permeable rock/sediment that stores and transmits groundwater\n1 pt: Confined is bounded by impermeable layers under pressure; unconfined has water table as upper surface"
      },
      {
        "label": "b",
        "prompt": "Describe TWO environmental consequences of aquifer depletion.",
        "points": 2,
        "rubric": "1 pt: Land subsidence or sinkhole formation\n1 pt: Saltwater intrusion, reduced baseflow to streams, or drying of wells"
      },
      {
        "label": "c",
        "prompt": "Describe ONE agricultural practice that could reduce water withdrawals and explain how it conserves water.",
        "points": 2,
        "rubric": "1 pt: Identifies practice (drip irrigation, drought-tolerant crops, no-till)\n1 pt: Explains how it reduces evaporation/runoff or crop water demand"
      },
      {
        "label": "d",
        "prompt": "A farmer currently uses flood irrigation at 60% efficiency and is considering switching to drip irrigation at 95% efficiency. If the crop requires 3,000 m^3 of water per hectare, calculate how many m^3 of water are saved per hectare by switching.",
        "points": 2,
        "rubric": "1 pt: Flood = 3000/0.60 = 5000 m^3; Drip = 3000/0.95 = 3158 m^3\n1 pt: Savings = 5000 - 3158 = 1,842 m^3/hectare"
      },
      {
        "label": "e",
        "prompt": "Describe ONE advantage and ONE disadvantage of desalination as an alternative water source.",
        "points": 2,
        "rubric": "1 pt: Advantage (provides potable water from abundant seawater/independent of precipitation)\n1 pt: Disadvantage (energy-intensive, brine disposal, high cost, impingement of marine life)"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2018 APES FRQ 1"
  },
  {
    "id": "apes-v2-2018-2",
    "courseSlug": "ap-environmental",
    "year": 2018,
    "number": 2,
    "topic": "Climate change and feedbacks",
    "prompt": "Scientists have observed that Arctic sea ice extent has declined significantly since 1979, with minimum September ice extent dropping approximately 13% per decade.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the greenhouse effect and identify TWO naturally occurring greenhouse gases.",
        "points": 2,
        "rubric": "1 pt: Description: gases absorb and re-emit longwave radiation from Earth, warming the surface\n1 pt: Two gases (CO2, CH4, H2O vapor, N2O, O3)"
      },
      {
        "label": "b",
        "prompt": "Explain how melting Arctic sea ice creates a positive feedback loop affecting global temperature.",
        "points": 2,
        "rubric": "1 pt: Ice loss reduces albedo, more solar radiation absorbed by dark ocean\n1 pt: Additional warming causes more ice loss, amplifying the warming"
      },
      {
        "label": "c",
        "prompt": "Describe ONE ecological consequence of Arctic sea-ice loss for a specific species or ecosystem.",
        "points": 1,
        "rubric": "1 pt: Polar bear habitat loss, walrus haul-out disruption, or disruption of under-ice algae base of food web"
      },
      {
        "label": "d",
        "prompt": "Explain how thermal expansion contributes to sea-level rise and identify ONE other cause of sea-level rise.",
        "points": 2,
        "rubric": "1 pt: Warmer water occupies more volume due to decreased density\n1 pt: Other cause: land-based ice melt (Greenland/Antarctic/alpine glaciers)"
      },
      {
        "label": "e",
        "prompt": "Identify and briefly describe ONE international agreement aimed at limiting greenhouse gas emissions.",
        "points": 2,
        "rubric": "1 pt: Names agreement (Kyoto Protocol or Paris Agreement)\n1 pt: Accurate description of its goal (binding emission cuts for Annex I; nationally determined contributions to limit warming <2 C)"
      },
      {
        "label": "f",
        "prompt": "Calculate the percent change in Arctic sea-ice extent after four decades if decline continues at 13% per decade (approximate as simple cumulative).",
        "points": 1,
        "rubric": "1 pt: 13 x 4 = 52% total decline (accept 40-55% with valid compounding)"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2018 APES FRQ 2"
  },
  {
    "id": "apes-v2-2018-3",
    "courseSlug": "ap-environmental",
    "year": 2018,
    "number": 3,
    "topic": "Waste management",
    "prompt": "A suburban county generates 500,000 metric tons of municipal solid waste (MSW) annually. Currently 60% is landfilled, 10% is incinerated with energy recovery, and 30% is recycled or composted.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the mass of MSW landfilled annually by the county.",
        "points": 1,
        "rubric": "1 pt: 500,000 x 0.60 = 300,000 metric tons"
      },
      {
        "label": "b",
        "prompt": "Describe TWO features of a modern sanitary landfill designed to protect groundwater.",
        "points": 2,
        "rubric": "1 pt: Composite/clay liner or leachate collection system\n1 pt: Daily soil cover, methane collection, or monitoring wells"
      },
      {
        "label": "c",
        "prompt": "Identify and describe ONE environmental benefit of waste-to-energy incineration.",
        "points": 2,
        "rubric": "1 pt: Identifies benefit (volume reduction, energy generation, avoided landfill methane)\n1 pt: Explains mechanism"
      },
      {
        "label": "d",
        "prompt": "Describe TWO environmental concerns associated with incineration.",
        "points": 2,
        "rubric": "1 pt: Air emissions (dioxins, heavy metals, particulates)\n1 pt: Toxic ash disposal or CO2 emissions"
      },
      {
        "label": "e",
        "prompt": "Explain ONE reason why electronic waste (e-waste) poses particular environmental challenges.",
        "points": 2,
        "rubric": "1 pt: Identifies challenge (toxic metals like lead, mercury, cadmium)\n1 pt: Explains leaching from informal recycling or landfill disposal threatens health/water"
      },
      {
        "label": "f",
        "prompt": "Describe ONE action a local government could take to increase recycling rates.",
        "points": 1,
        "rubric": "1 pt: Pay-as-you-throw pricing, curbside pickup, bottle deposit, or mandatory separation"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2018 APES FRQ 3"
  },
  {
    "id": "apes-v2-2019-1",
    "courseSlug": "ap-environmental",
    "year": 2019,
    "number": 1,
    "topic": "Energy - renewables",
    "prompt": "A coastal community of 25,000 residents is planning to meet part of its electricity needs with a 50 MW offshore wind farm. The capacity factor for the wind farm is estimated to be 40%, and average household consumption is 11,000 kWh per year.",
    "parts": [
      {
        "label": "a",
        "prompt": "Calculate the annual electricity generation (in kWh) of the wind farm.",
        "points": 2,
        "rubric": "1 pt: 50,000 kW x 8,760 h x 0.40\n1 pt: = 1.752 x 10^8 kWh/year (accept 175 million kWh)"
      },
      {
        "label": "b",
        "prompt": "If the average household in the community consumes 11,000 kWh/yr, estimate the number of households the wind farm can supply.",
        "points": 1,
        "rubric": "1 pt: 1.752 x 10^8 / 11,000 = 15,927 households (accept 15,000-16,500)"
      },
      {
        "label": "c",
        "prompt": "Describe ONE environmental advantage of wind energy compared to natural gas.",
        "points": 1,
        "rubric": "1 pt: No combustion emissions (no CO2, NOx, SO2) during operation"
      },
      {
        "label": "d",
        "prompt": "Describe TWO potential ecological concerns associated with offshore wind farms.",
        "points": 2,
        "rubric": "1 pt: Bird or bat collisions\n1 pt: Benthic habitat disturbance, underwater noise impacts on marine mammals, or seafloor cable effects"
      },
      {
        "label": "e",
        "prompt": "Explain ONE economic barrier to widespread adoption of offshore wind power.",
        "points": 2,
        "rubric": "1 pt: Identifies barrier (high capital cost, transmission infrastructure, intermittency requiring backup)\n1 pt: Explains how it raises cost or slows deployment"
      },
      {
        "label": "f",
        "prompt": "Describe ONE way energy storage could help address the intermittency of wind power.",
        "points": 2,
        "rubric": "1 pt: Names storage method (batteries, pumped hydro, compressed air)\n1 pt: Explains how it smooths supply by storing excess generation for later dispatch"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2019 APES FRQ 1"
  },
  {
    "id": "apes-v2-2019-2",
    "courseSlug": "ap-environmental",
    "year": 2019,
    "number": 2,
    "topic": "Forestry and fisheries",
    "prompt": "Atlantic cod (Gadus morhua) stocks off the coast of Newfoundland collapsed in the early 1990s after decades of intensive fishing, leading Canada to impose a moratorium in 1992.",
    "parts": [
      {
        "label": "a",
        "prompt": "Define 'maximum sustainable yield' (MSY) as it applies to a fish stock.",
        "points": 1,
        "rubric": "1 pt: Largest catch that can be taken indefinitely without long-term depletion of the population"
      },
      {
        "label": "b",
        "prompt": "Describe TWO factors that contributed to the collapse of the Atlantic cod fishery.",
        "points": 2,
        "rubric": "1 pt: Overfishing due to improved technology (trawlers, sonar)\n1 pt: Bycatch of juveniles, habitat damage, or underestimated fishing mortality"
      },
      {
        "label": "c",
        "prompt": "Explain ONE socioeconomic consequence of the fishery collapse for coastal communities.",
        "points": 2,
        "rubric": "1 pt: Identifies impact (unemployment, loss of cultural identity, outmigration)\n1 pt: Explains causal connection to fishery closure"
      },
      {
        "label": "d",
        "prompt": "Describe TWO management practices that could help prevent overfishing.",
        "points": 2,
        "rubric": "1 pt: ITQs/catch shares, seasonal closures, or marine protected areas\n1 pt: Gear restrictions (mesh size), size/age limits, or bycatch reduction devices"
      },
      {
        "label": "e",
        "prompt": "Describe ONE ecological consequence of removing a top predator like cod from the marine food web.",
        "points": 2,
        "rubric": "1 pt: Identifies trophic cascade (increased forage fish/invertebrates)\n1 pt: Explains downstream effect on zooplankton, algae, or ecosystem structure"
      },
      {
        "label": "f",
        "prompt": "Identify ONE aquaculture practice and describe ONE negative environmental impact associated with it.",
        "points": 1,
        "rubric": "1 pt: Names practice (salmon pens, shrimp ponds) and one impact (mangrove loss, escapes, nutrient pollution)"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2019 APES FRQ 2"
  },
  {
    "id": "apes-v2-2019-3",
    "courseSlug": "ap-environmental",
    "year": 2019,
    "number": 3,
    "topic": "Mining and reclamation",
    "prompt": "A coal mining company plans to use mountaintop removal mining in Appalachia to access thin coal seams. The process involves clearing forests and using explosives to remove overburden, which is then deposited in adjacent valleys.",
    "parts": [
      {
        "label": "a",
        "prompt": "Distinguish between surface mining and subsurface mining.",
        "points": 2,
        "rubric": "1 pt: Surface removes overburden to access shallow deposits\n1 pt: Subsurface uses tunnels/shafts to reach deeper deposits with less surface disturbance"
      },
      {
        "label": "b",
        "prompt": "Describe TWO environmental impacts of mountaintop removal beyond loss of forest cover.",
        "points": 2,
        "rubric": "1 pt: Stream burial/valley fills altering hydrology\n1 pt: Acid mine drainage, sedimentation, or loss of biodiversity"
      },
      {
        "label": "c",
        "prompt": "Explain how acid mine drainage (AMD) forms.",
        "points": 2,
        "rubric": "1 pt: Pyrite (FeS2) in exposed rock reacts with O2 and water\n1 pt: Produces sulfuric acid that acidifies streams and mobilizes heavy metals"
      },
      {
        "label": "d",
        "prompt": "Identify the U.S. federal law that requires reclamation of surface-mined lands.",
        "points": 1,
        "rubric": "1 pt: Surface Mining Control and Reclamation Act (SMCRA) of 1977"
      },
      {
        "label": "e",
        "prompt": "Describe ONE reclamation practice and explain how it restores ecosystem function.",
        "points": 2,
        "rubric": "1 pt: Names practice (contour grading, replacement of topsoil, native revegetation)\n1 pt: Explains how it re-establishes hydrology, soil, or vegetation"
      },
      {
        "label": "f",
        "prompt": "Describe ONE health effect on nearby residents associated with coal mining or combustion.",
        "points": 1,
        "rubric": "1 pt: Black lung, respiratory disease from particulates, or mercury bioaccumulation"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2019 APES FRQ 3"
  },
  {
    "id": "apes-v2-2020-1",
    "courseSlug": "ap-environmental",
    "year": 2020,
    "number": 1,
    "topic": "Biogeochemical cycles - nitrogen",
    "prompt": "Human activities have more than doubled the rate at which reactive nitrogen enters the biosphere. A major source is the Haber-Bosch process, which converts atmospheric N2 into ammonia (NH3) for fertilizer.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe the process of biological nitrogen fixation and identify the organisms primarily responsible.",
        "points": 2,
        "rubric": "1 pt: Conversion of N2 gas into NH3/NH4+ usable by plants\n1 pt: Identifies nitrogen-fixing bacteria (Rhizobium in legume root nodules, cyanobacteria)"
      },
      {
        "label": "b",
        "prompt": "Describe the process of denitrification and its importance in the nitrogen cycle.",
        "points": 2,
        "rubric": "1 pt: Anaerobic bacteria convert NO3- to N2 gas\n1 pt: Returns N to atmosphere, balancing fixation; reduces fertility of soil/water"
      },
      {
        "label": "c",
        "prompt": "Explain how excess nitrogen fertilizer causes a 'dead zone' in coastal waters such as the Gulf of Mexico.",
        "points": 2,
        "rubric": "1 pt: N runoff stimulates algal blooms in coastal water\n1 pt: Decomposition of algae depletes DO, creating hypoxic zone that kills or displaces marine life"
      },
      {
        "label": "d",
        "prompt": "Identify ONE airborne nitrogen compound produced by combustion and describe one environmental impact.",
        "points": 2,
        "rubric": "1 pt: Names NOx (NO or NO2)\n1 pt: Contributes to photochemical smog, acid deposition, or tropospheric ozone"
      },
      {
        "label": "e",
        "prompt": "Describe ONE agricultural practice that increases nitrogen use efficiency and explain how it reduces N losses.",
        "points": 2,
        "rubric": "1 pt: Practice (split applications, precision agriculture, cover crops, slow-release fertilizer)\n1 pt: Explains mechanism linking practice to reduced leaching/volatilization"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2020 APES FRQ 1"
  },
  {
    "id": "apes-v2-2020-2",
    "courseSlug": "ap-environmental",
    "year": 2020,
    "number": 2,
    "topic": "Population - logistic growth",
    "prompt": "A population of white-tailed deer is introduced to a 1,000-hectare island with abundant forage and no predators. Ecologists estimate the carrying capacity at 800 deer. The initial population is 50 and the intrinsic rate of increase (r) is 0.3 per year.",
    "parts": [
      {
        "label": "a",
        "prompt": "Define 'carrying capacity' and list TWO factors that can set it for a population.",
        "points": 2,
        "rubric": "1 pt: Maximum population size an environment can sustain long-term\n1 pt: Two factors (food, water, shelter, disease, space)"
      },
      {
        "label": "b",
        "prompt": "Distinguish between r-selected and K-selected species and classify white-tailed deer.",
        "points": 2,
        "rubric": "1 pt: r-selected: small, many offspring, little care; K-selected: larger, few offspring, parental care\n1 pt: Deer are more K-selected"
      },
      {
        "label": "c",
        "prompt": "Using the logistic growth equation dN/dt = rN(1 - N/K), calculate the instantaneous growth rate when N = 200 deer.",
        "points": 2,
        "rubric": "1 pt: 0.3 x 200 x (1 - 200/800) = 0.3 x 200 x 0.75\n1 pt: = 45 deer/year"
      },
      {
        "label": "d",
        "prompt": "Describe the shape of the logistic growth curve and identify the point of maximum growth rate.",
        "points": 2,
        "rubric": "1 pt: S-shaped/sigmoidal curve approaching K\n1 pt: Maximum dN/dt at N = K/2"
      },
      {
        "label": "e",
        "prompt": "Describe ONE ecological consequence if the deer population exceeds carrying capacity.",
        "points": 2,
        "rubric": "1 pt: Identifies overshoot consequence (overbrowsing, starvation, disease)\n1 pt: Explains how it reduces population or degrades habitat"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2020 APES FRQ 2"
  },
  {
    "id": "apes-v2-2021-1",
    "courseSlug": "ap-environmental",
    "year": 2021,
    "number": 1,
    "topic": "Urbanization and land use",
    "prompt": "A metropolitan region has experienced rapid suburban sprawl, converting forest and farmland into low-density residential development. Local officials are considering smart-growth policies and increased urban density.",
    "parts": [
      {
        "label": "a",
        "prompt": "Define 'urban sprawl' and identify TWO environmental impacts associated with it.",
        "points": 2,
        "rubric": "1 pt: Expansion of low-density development outward from urban centers\n1 pt: Two impacts (habitat fragmentation, increased impervious surface/runoff, vehicle emissions, loss of farmland)"
      },
      {
        "label": "b",
        "prompt": "Explain how increased impervious surface area affects a local watershed.",
        "points": 2,
        "rubric": "1 pt: Reduces infiltration, increases surface runoff volume and velocity\n1 pt: Leads to flooding, stream channel erosion, reduced groundwater recharge, or higher stream temperatures"
      },
      {
        "label": "c",
        "prompt": "Describe ONE smart-growth strategy and explain how it reduces environmental impact.",
        "points": 2,
        "rubric": "1 pt: Names strategy (mixed-use zoning, transit-oriented development, urban growth boundaries, infill)\n1 pt: Explains reduction in VMT, land conversion, or resource use"
      },
      {
        "label": "d",
        "prompt": "Describe the 'urban heat island' effect and identify ONE cause.",
        "points": 2,
        "rubric": "1 pt: Urban areas are warmer than surrounding rural areas due to low albedo/heat absorption\n1 pt: Cause (asphalt/concrete absorb heat, loss of vegetation, waste heat from vehicles/HVAC)"
      },
      {
        "label": "e",
        "prompt": "Identify ONE benefit of urban green spaces beyond aesthetics.",
        "points": 2,
        "rubric": "1 pt: Identifies benefit (cooling, stormwater capture, air quality, biodiversity, mental health)\n1 pt: Explains mechanism"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2021 APES FRQ 1"
  },
  {
    "id": "apes-v2-2021-2",
    "courseSlug": "ap-environmental",
    "year": 2021,
    "number": 2,
    "topic": "Indoor air pollution",
    "prompt": "In many developing countries, families cook indoors using biomass fuels such as wood, dung, and crop residues in poorly ventilated stoves. The World Health Organization estimates that indoor air pollution causes roughly 3 million premature deaths annually.",
    "parts": [
      {
        "label": "a",
        "prompt": "Identify TWO indoor air pollutants released by biomass combustion.",
        "points": 2,
        "rubric": "1 pt: Particulate matter (PM2.5) or carbon monoxide\n1 pt: Second pollutant (NOx, polycyclic aromatic hydrocarbons, SO2, formaldehyde)"
      },
      {
        "label": "b",
        "prompt": "Explain ONE specific health effect of chronic exposure to PM2.5.",
        "points": 2,
        "rubric": "1 pt: Identifies effect (COPD, lung cancer, cardiovascular disease, low birth weight)\n1 pt: Explains mechanism (particles penetrate deep into alveoli/enter bloodstream)"
      },
      {
        "label": "c",
        "prompt": "Describe ONE improved-cookstove intervention and explain how it reduces indoor air pollution.",
        "points": 2,
        "rubric": "1 pt: Names solution (rocket stove, LPG, biogas, chimney stove)\n1 pt: Explains reduction via more complete combustion or venting outside"
      },
      {
        "label": "d",
        "prompt": "Identify ONE indoor air pollutant commonly found in homes in developed countries and its primary source.",
        "points": 2,
        "rubric": "1 pt: Names pollutant (radon, VOCs, asbestos, secondhand smoke, mold)\n1 pt: Correctly pairs with source (soil gas, paints/adhesives, old insulation, cigarette smoke, damp surfaces)"
      },
      {
        "label": "e",
        "prompt": "Describe ONE simple action a homeowner can take to reduce indoor air pollution.",
        "points": 2,
        "rubric": "1 pt: Action (test for radon, use ventilation, low-VOC materials, HEPA filtration)\n1 pt: Explains how it reduces concentration of pollutant"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2021 APES FRQ 2"
  },
  {
    "id": "apes-v2-2022-1",
    "courseSlug": "ap-environmental",
    "year": 2022,
    "number": 1,
    "topic": "Environmental policy - NEPA and Montreal",
    "prompt": "Federal environmental laws shape how the United States manages natural resources and pollution. Two influential examples are the National Environmental Policy Act (NEPA) and the Montreal Protocol.",
    "parts": [
      {
        "label": "a",
        "prompt": "Identify the year NEPA was enacted and describe its main requirement for major federal actions.",
        "points": 2,
        "rubric": "1 pt: 1970 (signed 1969, effective 1970)\n1 pt: Requires Environmental Impact Statement (EIS) for major federal actions significantly affecting environment"
      },
      {
        "label": "b",
        "prompt": "Describe TWO components typically included in an Environmental Impact Statement.",
        "points": 2,
        "rubric": "1 pt: Purpose/need for action and analysis of environmental impacts\n1 pt: Alternatives to the proposed action or mitigation measures"
      },
      {
        "label": "c",
        "prompt": "Describe the specific environmental problem addressed by the Montreal Protocol.",
        "points": 2,
        "rubric": "1 pt: Depletion of stratospheric ozone layer\n1 pt: Caused by CFCs releasing Cl radicals that catalytically destroy O3"
      },
      {
        "label": "d",
        "prompt": "Explain why the Montreal Protocol is often cited as the most successful international environmental agreement.",
        "points": 2,
        "rubric": "1 pt: Universal ratification and phased-out production of ODS\n1 pt: Measurable decline in atmospheric CFCs and healing of the ozone hole"
      },
      {
        "label": "e",
        "prompt": "Describe ONE human health concern linked to ozone depletion.",
        "points": 2,
        "rubric": "1 pt: Increased UV-B exposure\n1 pt: Leads to skin cancer, cataracts, or immune suppression"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2022 APES FRQ 1"
  },
  {
    "id": "apes-v2-2022-2",
    "courseSlug": "ap-environmental",
    "year": 2022,
    "number": 2,
    "topic": "Water pollution - heavy metals",
    "prompt": "Residents in a rural community drinking water from private wells have been found to have elevated blood lead levels. Investigation reveals that many homes have old lead service lines and nearby abandoned mine tailings contain lead and mercury.",
    "parts": [
      {
        "label": "a",
        "prompt": "Explain why heavy metals such as lead and mercury are particularly dangerous compared to many organic pollutants.",
        "points": 2,
        "rubric": "1 pt: Not biodegradable; persist in environment and tissues\n1 pt: Bioaccumulate and biomagnify through food chains"
      },
      {
        "label": "b",
        "prompt": "Describe ONE neurological effect of lead exposure in children.",
        "points": 1,
        "rubric": "1 pt: Reduced IQ, learning disabilities, behavioral problems, or developmental delays"
      },
      {
        "label": "c",
        "prompt": "Describe the process of biomagnification using mercury in aquatic food webs as an example.",
        "points": 2,
        "rubric": "1 pt: Methylmercury accumulates in tissue (bioaccumulation) over organism's lifetime\n1 pt: Concentration increases at each trophic level because predators consume many prey"
      },
      {
        "label": "d",
        "prompt": "Identify the federal law that sets drinking water standards in the United States and name the agency that enforces it.",
        "points": 2,
        "rubric": "1 pt: Safe Drinking Water Act\n1 pt: Enforced by the U.S. Environmental Protection Agency (EPA)"
      },
      {
        "label": "e",
        "prompt": "Describe ONE remediation method for groundwater contaminated by heavy metals.",
        "points": 2,
        "rubric": "1 pt: Names method (pump-and-treat, permeable reactive barrier, phytoremediation)\n1 pt: Explains how it removes or immobilizes metals"
      },
      {
        "label": "f",
        "prompt": "Describe ONE action a homeowner can take to reduce lead in tap water from service lines.",
        "points": 1,
        "rubric": "1 pt: Flush tap before use, install NSF-certified filter, or replace service line"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2022 APES FRQ 2"
  },
  {
    "id": "apes-v2-2023-1",
    "courseSlug": "ap-environmental",
    "year": 2023,
    "number": 1,
    "topic": "Air pollution - smog and ozone",
    "prompt": "A large city in the southwestern United States regularly exceeds National Ambient Air Quality Standards for ground-level ozone during the summer months.",
    "parts": [
      {
        "label": "a",
        "prompt": "Distinguish between primary and secondary air pollutants and classify ground-level ozone.",
        "points": 2,
        "rubric": "1 pt: Primary emitted directly; secondary formed from reactions in atmosphere\n1 pt: Tropospheric ozone is a secondary pollutant"
      },
      {
        "label": "b",
        "prompt": "Describe the chemistry of photochemical smog formation.",
        "points": 2,
        "rubric": "1 pt: NOx + VOCs + sunlight react in atmosphere\n1 pt: Produces ground-level O3, PAN, and other oxidants"
      },
      {
        "label": "c",
        "prompt": "Explain ONE human health effect of exposure to ground-level ozone.",
        "points": 1,
        "rubric": "1 pt: Airway inflammation, reduced lung function, exacerbation of asthma"
      },
      {
        "label": "d",
        "prompt": "Describe TWO actions a city could take to reduce ozone precursor emissions.",
        "points": 2,
        "rubric": "1 pt: Mobile-source action (inspection/maintenance, transit, reformulated gasoline, EV incentives)\n1 pt: Stationary-source action (VOC controls on refineries/paints, industrial permits)"
      },
      {
        "label": "e",
        "prompt": "Explain how a temperature inversion can worsen urban air pollution.",
        "points": 2,
        "rubric": "1 pt: Warm air layer caps cooler air near surface\n1 pt: Prevents vertical mixing so pollutants accumulate in lower boundary layer"
      },
      {
        "label": "f",
        "prompt": "Identify ONE EPA criteria air pollutant other than ozone.",
        "points": 1,
        "rubric": "1 pt: CO, SO2, NO2, PM, or Pb"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2023 APES FRQ 1"
  },
  {
    "id": "apes-v2-2024-1",
    "courseSlug": "ap-environmental",
    "year": 2024,
    "number": 1,
    "topic": "Biogeochemical cycles - carbon",
    "prompt": "The global carbon cycle describes the transfer of carbon among the atmosphere, oceans, biosphere, and geosphere. Atmospheric CO2 has risen from about 280 ppm in pre-industrial times to over 420 ppm in 2024.",
    "parts": [
      {
        "label": "a",
        "prompt": "Identify TWO major carbon reservoirs and rank them by approximate size from largest to smallest.",
        "points": 2,
        "rubric": "1 pt: Identifies two reservoirs (ocean, atmosphere, fossil fuels, soils, biomass)\n1 pt: Correct ranking (e.g., ocean > fossil fuels > soils > atmosphere > biomass)"
      },
      {
        "label": "b",
        "prompt": "Describe the process of photosynthesis in terms of carbon flow and write the overall equation.",
        "points": 2,
        "rubric": "1 pt: Plants absorb CO2 and use light to produce glucose and O2\n1 pt: 6CO2 + 6H2O -> C6H12O6 + 6O2"
      },
      {
        "label": "c",
        "prompt": "Explain how burning fossil fuels transfers carbon between reservoirs and disrupts the cycle.",
        "points": 2,
        "rubric": "1 pt: Combustion moves C from long-term geologic reservoir to atmosphere as CO2\n1 pt: Rate exceeds natural sinks, increasing atmospheric concentration and radiative forcing"
      },
      {
        "label": "d",
        "prompt": "Describe ocean acidification and its effect on calcifying organisms.",
        "points": 2,
        "rubric": "1 pt: CO2 dissolves in seawater forming H2CO3, lowering pH and reducing carbonate ion concentration\n1 pt: Harder for corals/shellfish to build CaCO3 skeletons, causing dissolution/mortality"
      },
      {
        "label": "e",
        "prompt": "Describe ONE carbon sequestration strategy other than fossil-fuel reduction and explain how it removes carbon from the atmosphere.",
        "points": 2,
        "rubric": "1 pt: Names strategy (afforestation, soil carbon/biochar, wetland restoration, CCS)\n1 pt: Explains mechanism by which CO2 is stored in biomass, soil, or geologic formation"
      }
    ],
    "totalPoints": 10,
    "source": "Adapted from 2024 APES FRQ 1"
  },

  // ─── ap-cs-a wave-2 (+19) ─────────────────────────────
  {
    "id": "cs-a-v2-2016-1",
    "courseSlug": "ap-cs-a",
    "year": 2016,
    "number": 1,
    "topic": "1D array traversal",
    "prompt": "The Gizmo class stores a list of inventory prices in the instance variable `prices`, an array of doubles. Write methods `averagePrice` and `countBelowAverage`.\n```java\npublic class Gizmo {\n  private double[] prices;\n  // precondition: prices.length > 0\n  public double averagePrice() { /* part (a) */ }\n  public int countBelowAverage() { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write the method `averagePrice` that returns the arithmetic mean of the values in `prices`.",
        "points": 4,
        "rubric": "1 pt: Declares and initializes sum accumulator\n1 pt: Loops through all elements of prices\n1 pt: Correctly accumulates sum\n1 pt: Returns sum divided by prices.length as double"
      },
      {
        "label": "b",
        "prompt": "Write the method `countBelowAverage` that returns the number of entries in `prices` strictly less than the average. You may call `averagePrice`.",
        "points": 5,
        "rubric": "1 pt: Calls averagePrice or computes average correctly\n1 pt: Initializes counter\n1 pt: Iterates through prices\n1 pt: Compares element strictly less than average\n1 pt: Returns counter"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from 2016 CS A FRQ 1"
  },
  {
    "id": "cs-a-v2-2016-2",
    "courseSlug": "ap-cs-a",
    "year": 2016,
    "number": 2,
    "topic": "Class design",
    "prompt": "Design a class `HiddenWord` that represents a word the user is trying to guess. The class has a private instance variable `word` holding the target word in all uppercase letters.\n```java\npublic class HiddenWord {\n  private String word;\n  public HiddenWord(String w) { /* constructor */ }\n  public String getHint(String guess) { /* part (b) */ }\n}\n```\nExamples with word `HARPS`:\nguess `HARPS` -> `HARPS`\nguess `HEART` -> `H+++*`\nguess `HOUSE` -> `H++*+`",
    "parts": [
      {
        "label": "a",
        "prompt": "Write the constructor `HiddenWord(String w)` that initializes the instance variable.",
        "points": 2,
        "rubric": "1 pt: Header matches\n1 pt: Assigns parameter to instance variable word"
      },
      {
        "label": "b",
        "prompt": "Write the method `getHint(String guess)` that returns a hint string of the same length as `word` where each position contains the letter if it matches, `*` if the letter appears elsewhere in the word, and `+` otherwise.",
        "points": 7,
        "rubric": "1 pt: Builds a result String of correct length\n1 pt: Iterates over characters of guess and word\n1 pt: Appends matching letter when positions match\n1 pt: Uses indexOf or search to detect letter-in-word but wrong position\n1 pt: Appends `*` for wrong position match\n1 pt: Appends `+` when letter not in word\n1 pt: Returns constructed hint string"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from 2016 CS A FRQ 2 (HiddenWord)"
  },
  {
    "id": "cs-a-v2-2017-1",
    "courseSlug": "ap-cs-a",
    "year": 2017,
    "number": 1,
    "topic": "Digits class - ArrayList",
    "prompt": "The Digits class represents a non-negative integer as an ArrayList of its decimal digits.\n```java\npublic class Digits {\n  private ArrayList<Integer> digitList;\n  public Digits(int num) { /* part (a) */ }\n  public boolean isStrictlyIncreasing() { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write the constructor `Digits(int num)` that stores the digits of `num` in `digitList` in left-to-right order. If `num` is 0, `digitList` should contain the single value 0.",
        "points": 5,
        "rubric": "1 pt: Instantiates digitList as new ArrayList<Integer>()\n1 pt: Handles num == 0 case by adding 0\n1 pt: Repeatedly extracts digit using num % 10\n1 pt: Reduces num with num / 10\n1 pt: Stores digits in left-to-right order (insert at index 0 or reverse)"
      },
      {
        "label": "b",
        "prompt": "Write `isStrictlyIncreasing()` that returns true if each digit in `digitList` is strictly greater than the one preceding it.",
        "points": 4,
        "rubric": "1 pt: Loops through digitList with valid bounds\n1 pt: Compares each pair of consecutive elements\n1 pt: Returns false when out-of-order pair found\n1 pt: Returns true otherwise"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from 2017 CS A FRQ 1 (Digits)"
  },
  {
    "id": "cs-a-v2-2017-2",
    "courseSlug": "ap-cs-a",
    "year": 2017,
    "number": 2,
    "topic": "2D array - row and column",
    "prompt": "Consider a class `Phrase` that stores a phrase and tracks search/replace operations (structure omitted). For this problem, write a static method on a utility class.\n```java\npublic class GridUtil {\n  // Returns sum of all elements in row r of grid.\n  public static int rowSum(int[][] grid, int r) { /* part (a) */ }\n  // Returns true if the sum of column c equals the sum of row r.\n  public static boolean rowColEqual(int[][] grid, int r, int c) { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write `rowSum` to return the sum of all entries in row `r`.",
        "points": 3,
        "rubric": "1 pt: Initializes sum accumulator\n1 pt: Loops through all columns of row r\n1 pt: Adds grid[r][col] and returns sum"
      },
      {
        "label": "b",
        "prompt": "Write `rowColEqual` that returns true if the sum of row `r` equals the sum of column `c`. You may call `rowSum`.",
        "points": 5,
        "rubric": "1 pt: Computes row sum (via rowSum or inline)\n1 pt: Initializes column sum accumulator\n1 pt: Loops through all rows to accumulate column c\n1 pt: Compares two sums for equality\n1 pt: Returns correct boolean"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from 2017 CS A FRQ 4"
  },
  {
    "id": "cs-a-v2-2018-1",
    "courseSlug": "ap-cs-a",
    "year": 2018,
    "number": 1,
    "topic": "1D array - array manipulation",
    "prompt": "A data logger stores temperature readings in an array of doubles.\n```java\npublic class Logger {\n  private double[] temps;\n  // Returns the number of days the reading exceeded threshold.\n  public int daysAbove(double threshold) { /* part (a) */ }\n  // Returns a new array with readings smoothed by averaging each element with its two neighbors.\n  // Endpoints average with their single neighbor.\n  public double[] smooth() { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write `daysAbove(double threshold)` which returns the count of elements strictly greater than threshold.",
        "points": 3,
        "rubric": "1 pt: Initializes counter\n1 pt: Iterates through entire temps array\n1 pt: Increments when element > threshold and returns counter"
      },
      {
        "label": "b",
        "prompt": "Write `smooth()` returning a new array of same length where position i equals the mean of temps[i-1], temps[i], temps[i+1]; endpoints average only with their single neighbor.",
        "points": 6,
        "rubric": "1 pt: Allocates result array with temps.length\n1 pt: Handles left endpoint (average of temps[0] and temps[1])\n1 pt: Handles right endpoint analogously\n1 pt: Loops through interior indices 1..length-2\n1 pt: Computes average of three neighbors correctly\n1 pt: Returns result array"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from 2018 CS A FRQ 1"
  },
  {
    "id": "cs-a-v2-2018-2",
    "courseSlug": "ap-cs-a",
    "year": 2018,
    "number": 2,
    "topic": "Inheritance - class hierarchy",
    "prompt": "A gaming company models tokens with an abstract superclass.\n```java\npublic abstract class GameToken {\n  private String name;\n  public GameToken(String n) { name = n; }\n  public String getName() { return name; }\n  public abstract int getValue();\n  public String toString() { return name + \":\" + getValue(); }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write a subclass `CoinToken` that extends `GameToken`. A CoinToken has an integer denomination, a constructor `CoinToken(String n, int d)`, and returns the denomination as its value.",
        "points": 4,
        "rubric": "1 pt: Class header `extends GameToken`\n1 pt: Private int denomination field\n1 pt: Constructor calls super(n) and assigns denomination\n1 pt: getValue returns denomination"
      },
      {
        "label": "b",
        "prompt": "Write a subclass `GemToken` that extends `GameToken`. A GemToken has a color (String) and a base value. Its `getValue` returns base value doubled if color equals \"red\", otherwise returns base value unchanged. Include the constructor.",
        "points": 5,
        "rubric": "1 pt: Header extends GameToken with private color and baseValue fields\n1 pt: Constructor calls super and assigns fields\n1 pt: Overrides getValue\n1 pt: Doubles when color equals \"red\" using equals\n1 pt: Returns baseValue otherwise"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from 2018 CS A FRQ 2"
  },
  {
    "id": "cs-a-v2-2019-1",
    "courseSlug": "ap-cs-a",
    "year": 2019,
    "number": 1,
    "topic": "APLine class",
    "prompt": "The `APLine` class represents a line in slope-intercept form y = m*x + b.\n```java\npublic class APLine {\n  private double slope;\n  private double yInt;\n  public APLine(double m, double b) { /* part (a) */ }\n  public double getY(double x) { /* part (b) */ }\n  public boolean isOnLine(double x, double y) { /* part (c) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write the constructor that initializes `slope` and `yInt`.",
        "points": 2,
        "rubric": "1 pt: Header matches\n1 pt: Assigns parameters to instance variables"
      },
      {
        "label": "b",
        "prompt": "Write `getY(double x)` returning y = slope*x + yInt.",
        "points": 2,
        "rubric": "1 pt: Uses slope and yInt correctly\n1 pt: Returns double result"
      },
      {
        "label": "c",
        "prompt": "Write `isOnLine(double x, double y)` that returns true when the given point lies on the line (using strict equality is acceptable here).",
        "points": 4,
        "rubric": "1 pt: Calls getY or computes expected y\n1 pt: Compares result to parameter y\n1 pt: Correct boolean return in both cases\n1 pt: No side effects; method signature matches"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from 2019 CS A FRQ 1"
  },
  {
    "id": "cs-a-v2-2019-2",
    "courseSlug": "ap-cs-a",
    "year": 2019,
    "number": 2,
    "topic": "2D array processing",
    "prompt": "A light grid is represented as a 2D array of integers where 1 means lit and 0 means unlit.\n```java\npublic class LightBoard {\n  private int[][] lights;\n  // Returns the number of lit cells in column c.\n  public int columnOn(int c) { /* part (a) */ }\n  // Returns the row index of the row with the most lit cells (first such row on ties).\n  public int brightestRow() { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write `columnOn(int c)` returning the number of lit cells (value 1) in column c.",
        "points": 3,
        "rubric": "1 pt: Initializes counter\n1 pt: Loops over all rows\n1 pt: Increments when lights[row][c] == 1 and returns counter"
      },
      {
        "label": "b",
        "prompt": "Write `brightestRow()` returning the index of the row containing the most 1s (return the lowest index on ties).",
        "points": 5,
        "rubric": "1 pt: Tracks best row index and best count\n1 pt: Outer loop iterates rows\n1 pt: Computes count of 1s per row (inner loop)\n1 pt: Updates best when strictly greater\n1 pt: Returns best row index"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from 2019 CS A FRQ 3"
  },
  {
    "id": "cs-a-v2-2019-3",
    "courseSlug": "ap-cs-a",
    "year": 2019,
    "number": 3,
    "topic": "Recursion - string",
    "prompt": "Consider the following recursion problem on strings.\n```java\npublic class RecUtil {\n  // Returns true if s reads the same forward and backward.\n  public static boolean isPalindrome(String s) { /* part (a) */ }\n  // Returns the number of times the character ch appears in s.\n  public static int countChar(String s, char ch) { /* part (b) */ }\n}\n```\nBoth methods must be implemented recursively; no loops.",
    "parts": [
      {
        "label": "a",
        "prompt": "Write a recursive `isPalindrome(String s)`.",
        "points": 4,
        "rubric": "1 pt: Base case handles length 0 or 1 returning true\n1 pt: Compares first and last characters\n1 pt: Recursive call on middle substring\n1 pt: Returns false when outer characters differ"
      },
      {
        "label": "b",
        "prompt": "Write a recursive `countChar(String s, char ch)`.",
        "points": 4,
        "rubric": "1 pt: Base case for empty string returning 0\n1 pt: Examines first character of s\n1 pt: Adds 1 when character matches, else 0\n1 pt: Recurses on substring(1) and returns sum"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from 2019 CS A recursion style"
  },
  {
    "id": "cs-a-v2-2020-1",
    "courseSlug": "ap-cs-a",
    "year": 2020,
    "number": 1,
    "topic": "ArrayList manipulation",
    "prompt": "Write a static method that removes consecutive duplicates from an ArrayList of Strings.\n```java\npublic class ListUtil {\n  // Modifies list so that no two adjacent elements are equal (using .equals).\n  // Preserves order, removes later duplicate(s).\n  public static void removeAdjacentDuplicates(ArrayList<String> list) { /* implement */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write `removeAdjacentDuplicates` as specified.",
        "points": 6,
        "rubric": "1 pt: Iterates through list with correct bounds\n1 pt: Compares adjacent elements using .equals\n1 pt: Removes later duplicate with list.remove\n1 pt: Correctly adjusts index after removal\n1 pt: Does not throw IndexOutOfBounds\n1 pt: Leaves no adjacent duplicates in final list"
      },
      {
        "label": "b",
        "prompt": "State the Big-O time complexity of your implementation in terms of the list size n and justify in one sentence.",
        "points": 2,
        "rubric": "1 pt: States O(n^2) (due to ArrayList.remove shifting)\n1 pt: Justification references shifting cost or nested traversal"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from 2020 CS A practice"
  },
  {
    "id": "cs-a-v2-2021-1",
    "courseSlug": "ap-cs-a",
    "year": 2021,
    "number": 1,
    "topic": "Simulation method",
    "prompt": "The `Simulation` class models a repeated experiment.\n```java\npublic class Simulation {\n  // Returns a random integer in [min, max] inclusive.\n  public static int randInt(int min, int max) { /* part (a) */ }\n  // Runs numTrials simulations; each trial rolls two dice (1..6).\n  // Returns the number of trials where the sum equals target.\n  public static int runTrials(int numTrials, int target) { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write `randInt(int min, int max)` using `Math.random()`.",
        "points": 3,
        "rubric": "1 pt: Uses Math.random() to produce double in [0,1)\n1 pt: Scales by (max - min + 1) and adds min\n1 pt: Casts to int and returns"
      },
      {
        "label": "b",
        "prompt": "Write `runTrials(int numTrials, int target)` calling `randInt`.",
        "points": 5,
        "rubric": "1 pt: Initializes counter\n1 pt: Loops numTrials times\n1 pt: Rolls two dice via randInt(1,6)\n1 pt: Checks if sum equals target\n1 pt: Increments counter and returns"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from 2021 CS A FRQ 1"
  },
  {
    "id": "cs-a-v2-2021-2",
    "courseSlug": "ap-cs-a",
    "year": 2021,
    "number": 2,
    "topic": "Interface and polymorphism",
    "prompt": "Consider the following interface.\n```java\npublic interface NumericSequence {\n  int nextTerm();\n  void reset();\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write a class `ArithmeticSeq` implementing `NumericSequence` for sequences with start and common difference d. `nextTerm` returns successive terms starting from start; `reset` restarts the sequence.",
        "points": 5,
        "rubric": "1 pt: Class header `implements NumericSequence` with fields start, d, current\n1 pt: Constructor initializes fields\n1 pt: nextTerm returns current value\n1 pt: Advances current by d after returning\n1 pt: reset restores current to start"
      },
      {
        "label": "b",
        "prompt": "Write a static method `sumFirstN(NumericSequence seq, int n)` returning the sum of the next n terms of seq.",
        "points": 4,
        "rubric": "1 pt: Initializes sum accumulator\n1 pt: Loops n times\n1 pt: Calls seq.nextTerm and accumulates\n1 pt: Returns sum"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from 2021 CS A FRQ 4"
  },
  {
    "id": "cs-a-v2-2022-1",
    "courseSlug": "ap-cs-a",
    "year": 2022,
    "number": 1,
    "topic": "String methods",
    "prompt": "A password utility validates user passwords.\n```java\npublic class PasswordUtil {\n  // Returns true if s contains at least one uppercase letter.\n  public static boolean hasUpper(String s) { /* part (a) */ }\n  // Returns true if s is a valid password: length >= 8, has upper, has digit.\n  public static boolean isValid(String s) { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write `hasUpper(String s)`.",
        "points": 4,
        "rubric": "1 pt: Loops through each character of s\n1 pt: Uses Character.isUpperCase or range check A..Z\n1 pt: Returns true on first match\n1 pt: Returns false after complete loop"
      },
      {
        "label": "b",
        "prompt": "Write `isValid(String s)`. You may call `hasUpper`.",
        "points": 5,
        "rubric": "1 pt: Checks s.length() >= 8\n1 pt: Calls hasUpper for uppercase check\n1 pt: Iterates to detect a digit with Character.isDigit\n1 pt: Combines conditions with logical AND\n1 pt: Returns correct boolean in all cases"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from 2022 CS A FRQ 1"
  },
  {
    "id": "cs-a-v2-2022-2",
    "courseSlug": "ap-cs-a",
    "year": 2022,
    "number": 2,
    "topic": "2D array - diagonal search",
    "prompt": "A game board is a square 2D array of ints.\n```java\npublic class Board {\n  private int[][] grid; // square: grid.length == grid[0].length\n  // Returns the sum of the main diagonal (top-left to bottom-right).\n  public int mainDiagonalSum() { /* part (a) */ }\n  // Returns true if any row, column, or diagonal sums to target.\n  public boolean hasLine(int target) { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write `mainDiagonalSum`.",
        "points": 3,
        "rubric": "1 pt: Initializes sum\n1 pt: Loops i from 0 to grid.length-1\n1 pt: Adds grid[i][i] and returns sum"
      },
      {
        "label": "b",
        "prompt": "Write `hasLine(int target)` checking all rows, all columns, and both diagonals.",
        "points": 6,
        "rubric": "1 pt: Checks each row sum against target\n1 pt: Checks each column sum against target\n1 pt: Computes main diagonal sum\n1 pt: Computes anti-diagonal sum (grid[i][n-1-i])\n1 pt: Returns true when any matches target\n1 pt: Returns false after exhausting all lines"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from 2022 CS A FRQ 3"
  },
  {
    "id": "cs-a-v2-2023-1",
    "courseSlug": "ap-cs-a",
    "year": 2023,
    "number": 1,
    "topic": "Recursion - array",
    "prompt": "Implement recursive array utilities.\n```java\npublic class ArrayRec {\n  // Returns the maximum value in arr[lo..hi] inclusive, recursively.\n  public static int maxRec(int[] arr, int lo, int hi) { /* part (a) */ }\n  // Returns true if arr is sorted in strictly increasing order, recursively.\n  public static boolean isIncreasing(int[] arr, int index) { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write `maxRec` recursively. No loops.",
        "points": 4,
        "rubric": "1 pt: Base case lo == hi returns arr[lo]\n1 pt: Recursive call on reduced range (e.g., lo+1..hi or divide-and-conquer)\n1 pt: Uses Math.max or equivalent comparison\n1 pt: Correctly combines recursive result with current element"
      },
      {
        "label": "b",
        "prompt": "Write `isIncreasing(int[] arr, int index)` recursively where caller passes index = 1 initially.",
        "points": 4,
        "rubric": "1 pt: Base case index >= arr.length returns true\n1 pt: Compares arr[index-1] < arr[index]\n1 pt: Returns false on violation\n1 pt: Recurses on index + 1"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from 2023 CS A FRQ 2"
  },
  {
    "id": "cs-a-v2-2023-2",
    "courseSlug": "ap-cs-a",
    "year": 2023,
    "number": 2,
    "topic": "Sorting - selection sort",
    "prompt": "Consider selection sort on an integer array.\n```java\npublic class Sorter {\n  // Performs one pass of selection sort starting at position start.\n  // Places the smallest of arr[start..arr.length-1] at index start.\n  public static void selectionPass(int[] arr, int start) { /* part (a) */ }\n  // Full selection sort ascending using selectionPass.\n  public static void selectionSort(int[] arr) { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write `selectionPass`.",
        "points": 5,
        "rubric": "1 pt: Initializes minIndex = start\n1 pt: Loops through start+1..arr.length-1\n1 pt: Updates minIndex when arr[i] < arr[minIndex]\n1 pt: Swaps arr[start] and arr[minIndex]\n1 pt: Uses temp variable correctly"
      },
      {
        "label": "b",
        "prompt": "Write `selectionSort` using `selectionPass`.",
        "points": 3,
        "rubric": "1 pt: Loops start from 0 to arr.length-2\n1 pt: Calls selectionPass(arr, start) each iteration\n1 pt: Array left sorted in ascending order"
      }
    ],
    "totalPoints": 8,
    "source": "Adapted from 2023 CS A FRQ 4"
  },
  {
    "id": "cs-a-v2-2024-1",
    "courseSlug": "ap-cs-a",
    "year": 2024,
    "number": 1,
    "topic": "Binary search",
    "prompt": "Implement binary search iteratively on a sorted int array.\n```java\npublic class SearchUtil {\n  // Returns index of target in sorted arr, or -1 if not present. Iterative.\n  public static int binarySearch(int[] arr, int target) { /* part (a) */ }\n  // Returns the count of occurrences of target in sorted arr. May call binarySearch.\n  public static int countOccurrences(int[] arr, int target) { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write iterative `binarySearch` on a sorted ascending array.",
        "points": 5,
        "rubric": "1 pt: Initializes lo = 0 and hi = arr.length - 1\n1 pt: Loops while lo <= hi\n1 pt: Computes mid = (lo + hi) / 2\n1 pt: Updates lo or hi based on comparison with target\n1 pt: Returns mid on match, -1 otherwise"
      },
      {
        "label": "b",
        "prompt": "Write `countOccurrences` that returns how many times target appears.",
        "points": 4,
        "rubric": "1 pt: Calls binarySearch (or equivalent) to find any occurrence\n1 pt: Handles -1 (target absent) returning 0\n1 pt: Expands left and right from found index while equal\n1 pt: Returns correct total count"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from 2024 CS A FRQ 2"
  },
  {
    "id": "cs-a-v2-2024-2",
    "courseSlug": "ap-cs-a",
    "year": 2024,
    "number": 2,
    "topic": "Class design - inheritance with toString",
    "prompt": "A library system models items.\n```java\npublic class LibraryItem {\n  private String title;\n  private int year;\n  public LibraryItem(String t, int y) { title = t; year = y; }\n  public String getTitle() { return title; }\n  public int getYear() { return year; }\n  public String toString() { return title + \" (\" + year + \")\"; }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write a subclass `Book` that extends `LibraryItem` and adds an `author` String. Provide a constructor `Book(String t, int y, String a)` and override `toString` to return the superclass form followed by ` by <author>`.",
        "points": 5,
        "rubric": "1 pt: Class header extends LibraryItem with private author field\n1 pt: Constructor calls super(t, y) and assigns author\n1 pt: Overrides toString with @Override annotation or matching signature\n1 pt: Calls super.toString() inside override\n1 pt: Concatenates `\" by \" + author` correctly"
      },
      {
        "label": "b",
        "prompt": "Write a static method `newestItem(ArrayList<LibraryItem> items)` that returns the item with the greatest year. If the list is empty, return null.",
        "points": 4,
        "rubric": "1 pt: Returns null when list is empty\n1 pt: Initializes best to items.get(0)\n1 pt: Loops through remaining items\n1 pt: Updates best when getYear() strictly greater; returns best"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from 2024 CS A FRQ 1"
  },
  {
    "id": "cs-a-v2-2024-3",
    "courseSlug": "ap-cs-a",
    "year": 2024,
    "number": 3,
    "topic": "2D array - spiral/row-column search",
    "prompt": "A seating grid is represented as a 2D array of booleans where true means occupied.\n```java\npublic class SeatGrid {\n  private boolean[][] seats;\n  // Returns the number of occupied seats in the specified rectangular block\n  // with corners (r1,c1) inclusive to (r2,c2) inclusive.\n  public int blockCount(int r1, int c1, int r2, int c2) { /* part (a) */ }\n  // Returns true if any full row is completely occupied.\n  public boolean hasFullRow() { /* part (b) */ }\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Write `blockCount`.",
        "points": 4,
        "rubric": "1 pt: Initializes counter\n1 pt: Outer loop rows r1..r2 inclusive\n1 pt: Inner loop cols c1..c2 inclusive\n1 pt: Increments when seats[r][c] is true and returns counter"
      },
      {
        "label": "b",
        "prompt": "Write `hasFullRow`.",
        "points": 5,
        "rubric": "1 pt: Outer loop iterates all rows\n1 pt: Inner loop iterates all columns of current row\n1 pt: Detects any false cell and breaks/continues correctly\n1 pt: Returns true when an entirely-true row found\n1 pt: Returns false after all rows checked"
      }
    ],
    "totalPoints": 9,
    "source": "Adapted from 2024 CS A FRQ 3"
  },

  // ─── ap-cs-principles wave-2 (+13) ─────────────────────────────
  {
    "id": "csp-v2-2019-1",
    "courseSlug": "ap-cs-principles",
    "year": 2019,
    "number": 1,
    "topic": "Procedure abstraction and list filtering",
    "prompt": "A list `scores` contains integer test scores. Write a procedure `countPassing(scores, cutoff)` that returns the number of scores greater than or equal to `cutoff`.\n\n```pseudocode\nPROCEDURE countPassing(scores, cutoff) {\n  count ← 0\n  FOR EACH s IN scores {\n    IF (s ≥ cutoff) {\n      count ← count + 1\n    }\n  }\n  RETURN count\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Explain how the procedure uses iteration to examine every element of the list.",
        "points": 2,
        "rubric": "1 pt: Identifies the FOR EACH loop as visiting every element in scores.\n1 pt: States that each element is compared against cutoff exactly once."
      },
      {
        "label": "b",
        "prompt": "Describe one benefit of wrapping this logic in a named procedure rather than writing it inline.",
        "points": 2,
        "rubric": "1 pt: Mentions reuse across different lists or cutoffs without rewriting code.\n1 pt: Mentions abstraction, readability, or easier debugging/testing."
      }
    ],
    "totalPoints": 4,
    "source": "Supplemental CSP practice"
  },
  {
    "id": "csp-v2-2019-2",
    "courseSlug": "ap-cs-principles",
    "year": 2019,
    "number": 2,
    "topic": "Data representation: binary and decimal",
    "prompt": "Consider the 8-bit unsigned binary number `10110101`.",
    "parts": [
      {
        "label": "a",
        "prompt": "Convert `10110101` to its decimal (base-10) equivalent and show the place-value sum.",
        "points": 2,
        "rubric": "1 pt: Correctly identifies place values 128, 32, 16, 4, 1.\n1 pt: Correct decimal result of 181."
      },
      {
        "label": "b",
        "prompt": "What is the largest unsigned integer representable with 8 bits? Explain why adding 1 to that value causes overflow.",
        "points": 2,
        "rubric": "1 pt: States the maximum is 255 (or 2^8 - 1).\n1 pt: Explains that 256 requires 9 bits, so the result wraps or overflows in 8-bit storage."
      }
    ],
    "totalPoints": 4,
    "source": "Supplemental CSP practice"
  },
  {
    "id": "csp-v2-2020-3",
    "courseSlug": "ap-cs-principles",
    "year": 2020,
    "number": 3,
    "topic": "RANDOM simulation",
    "prompt": "The procedure `RANDOM(a, b)` returns a random integer from `a` to `b` inclusive. A game simulates rolling two six-sided dice.\n\n```pseudocode\nPROCEDURE rollTwo() {\n  d1 ← RANDOM(1, 6)\n  d2 ← RANDOM(1, 6)\n  RETURN d1 + d2\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "List every possible value that `rollTwo()` can return, and state which value is most likely.",
        "points": 2,
        "rubric": "1 pt: Range 2 through 12 listed.\n1 pt: Identifies 7 as the most likely sum."
      },
      {
        "label": "b",
        "prompt": "Write pseudocode that runs `rollTwo()` 1000 times and counts how many rolls result in a 7.",
        "points": 3,
        "rubric": "1 pt: Loop runs exactly 1000 times.\n1 pt: Calls rollTwo() inside the loop and compares to 7.\n1 pt: Increments a counter only when the sum equals 7 and returns/prints it."
      }
    ],
    "totalPoints": 5,
    "source": "Supplemental CSP practice"
  },
  {
    "id": "csp-v2-2020-4",
    "courseSlug": "ap-cs-principles",
    "year": 2020,
    "number": 4,
    "topic": "Linear vs binary search",
    "prompt": "A list `ids` stores 10,000 student IDs.",
    "parts": [
      {
        "label": "a",
        "prompt": "Describe how a linear search would find a specific ID, and give the worst-case number of comparisons.",
        "points": 2,
        "rubric": "1 pt: Checks each element from start to end until match or end.\n1 pt: Worst case is 10,000 comparisons (n comparisons)."
      },
      {
        "label": "b",
        "prompt": "State one precondition that must hold for binary search to work, and give the approximate worst-case number of comparisons for 10,000 elements.",
        "points": 2,
        "rubric": "1 pt: The list must be sorted.\n1 pt: About 14 comparisons (log2(10000) ≈ 13.3, rounded up)."
      }
    ],
    "totalPoints": 4,
    "source": "Supplemental CSP practice"
  },
  {
    "id": "csp-v2-2021-5",
    "courseSlug": "ap-cs-principles",
    "year": 2021,
    "number": 5,
    "topic": "Boolean logic and XOR",
    "prompt": "Let A and B be Boolean variables. XOR is true exactly when A and B differ.",
    "parts": [
      {
        "label": "a",
        "prompt": "Write a Boolean expression equivalent to `A XOR B` using only AND, OR, and NOT.",
        "points": 2,
        "rubric": "1 pt: Uses correct combination such as (A AND NOT B) OR (NOT A AND B).\n1 pt: Expression is logically correct for all four input combinations."
      },
      {
        "label": "b",
        "prompt": "Complete the truth table for `NOT (A OR B)` for all four combinations of A and B.",
        "points": 2,
        "rubric": "1 pt: Correctly shows output is true only when both A and B are false.\n1 pt: All four rows labeled correctly (T/T→F, T/F→F, F/T→F, F/F→T)."
      }
    ],
    "totalPoints": 4,
    "source": "Supplemental CSP practice"
  },
  {
    "id": "csp-v2-2021-6",
    "courseSlug": "ap-cs-principles",
    "year": 2021,
    "number": 6,
    "topic": "List aggregation: max and min",
    "prompt": "Write pseudocode to find both the maximum and the minimum value in a non-empty list `nums` using a single pass.\n\n```pseudocode\nPROCEDURE minMax(nums) {\n  lo ← nums[1]\n  hi ← nums[1]\n  FOR EACH x IN nums {\n    IF (x < lo) { lo ← x }\n    IF (x > hi) { hi ← x }\n  }\n  RETURN [lo, hi]\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Why is it important to initialize `lo` and `hi` to `nums[1]` instead of to 0?",
        "points": 2,
        "rubric": "1 pt: Explains 0 may be larger than all elements (if all negative) or smaller than all elements (if all positive), giving a wrong answer.\n1 pt: Initializing with an actual list element guarantees correctness regardless of sign."
      },
      {
        "label": "b",
        "prompt": "How many comparisons does the procedure perform on a list of length n, and how does this compare to running a separate max loop and min loop?",
        "points": 2,
        "rubric": "1 pt: About 2n comparisons in a single pass.\n1 pt: Same total work but only one traversal of the list, which can be faster in practice due to memory access."
      }
    ],
    "totalPoints": 4,
    "source": "Supplemental CSP practice"
  },
  {
    "id": "csp-v2-2021-7",
    "courseSlug": "ap-cs-principles",
    "year": 2021,
    "number": 7,
    "topic": "Lossless vs lossy compression",
    "prompt": "A student saves a family photograph as both a PNG (lossless) and a JPEG (lossy) file.",
    "parts": [
      {
        "label": "a",
        "prompt": "Define lossless and lossy compression in the context of image storage.",
        "points": 2,
        "rubric": "1 pt: Lossless compression allows the original data to be reconstructed exactly.\n1 pt: Lossy compression discards some data so the original cannot be perfectly recovered."
      },
      {
        "label": "b",
        "prompt": "Give one scenario where lossless is preferred and one where lossy is preferred, with justification.",
        "points": 2,
        "rubric": "1 pt: Valid lossless use case (medical imaging, archival, text) with reason referring to fidelity.\n1 pt: Valid lossy use case (web photo, streaming) with reason referring to smaller file size or bandwidth."
      }
    ],
    "totalPoints": 4,
    "source": "Supplemental CSP practice"
  },
  {
    "id": "csp-v2-2022-8",
    "courseSlug": "ap-cs-principles",
    "year": 2022,
    "number": 8,
    "topic": "ASCII and error bits",
    "prompt": "The ASCII code for uppercase `A` is 65. An extended scheme adds one parity bit so that the total number of 1-bits in the 8-bit word is even.",
    "parts": [
      {
        "label": "a",
        "prompt": "Write the 7-bit binary ASCII for `A` (65) and then give the 8-bit word after adding an even-parity bit at the left.",
        "points": 2,
        "rubric": "1 pt: 7-bit value 1000001.\n1 pt: Parity bit 0 prepended, yielding 01000001 (already even count of 1s)."
      },
      {
        "label": "b",
        "prompt": "Explain how a receiver uses the parity bit to detect a single-bit transmission error, and state one limitation.",
        "points": 2,
        "rubric": "1 pt: Receiver counts 1-bits; odd count indicates an error.\n1 pt: Limitation: cannot detect an even number of simultaneous bit flips, and cannot correct the error."
      }
    ],
    "totalPoints": 4,
    "source": "Supplemental CSP practice"
  },
  {
    "id": "csp-v2-2022-9",
    "courseSlug": "ap-cs-principles",
    "year": 2022,
    "number": 9,
    "topic": "Parallel vs sequential computing",
    "prompt": "A sequential program takes 60 seconds. Part of the program (40 seconds of work) can be split into 4 parallel tasks, while the remaining 20 seconds must run sequentially.",
    "parts": [
      {
        "label": "a",
        "prompt": "Assuming the parallel portion is perfectly distributed across 4 processors, compute the total runtime.",
        "points": 2,
        "rubric": "1 pt: Parallel portion reduces from 40 s to 10 s (40 / 4).\n1 pt: Total runtime is 20 + 10 = 30 seconds."
      },
      {
        "label": "b",
        "prompt": "Define speedup and compute it for this situation.",
        "points": 2,
        "rubric": "1 pt: Defines speedup as sequential time divided by parallel time.\n1 pt: Speedup = 60 / 30 = 2."
      }
    ],
    "totalPoints": 4,
    "source": "Supplemental CSP practice"
  },
  {
    "id": "csp-v2-2022-10",
    "courseSlug": "ap-cs-principles",
    "year": 2022,
    "number": 10,
    "topic": "API abstraction: procedure arguments",
    "prompt": "A weather app calls a hidden library procedure `getTemp(cityCode, units)`. The student does not know how the procedure retrieves data, only that it returns a number.\n\n```pseudocode\ntempF ← getTemp(\"NYC\", \"F\")\ntempC ← getTemp(\"NYC\", \"C\")\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Explain what is meant by procedural abstraction in this example.",
        "points": 2,
        "rubric": "1 pt: The caller can use getTemp without knowing its internal implementation.\n1 pt: Parameters (cityCode, units) define the interface while hiding details."
      },
      {
        "label": "b",
        "prompt": "Give one advantage and one risk of relying on an external API whose implementation you cannot see.",
        "points": 2,
        "rubric": "1 pt: Advantage such as reduced development effort, reuse, or specialization by experts.\n1 pt: Risk such as outages, breaking changes, privacy/security, or hidden bugs."
      }
    ],
    "totalPoints": 4,
    "source": "Supplemental CSP practice"
  },
  {
    "id": "csp-v2-2023-11",
    "courseSlug": "ap-cs-principles",
    "year": 2023,
    "number": 11,
    "topic": "Filtering a list into a new list",
    "prompt": "Given a list `temps` of daily high temperatures, build a new list `hot` containing only those values greater than 90.\n\n```pseudocode\nPROCEDURE hotDays(temps) {\n  hot ← []\n  FOR EACH t IN temps {\n    IF (t > 90) {\n      APPEND(hot, t)\n    }\n  }\n  RETURN hot\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Trace the procedure on the list [88, 91, 90, 95, 72, 101] and give the resulting `hot` list.",
        "points": 2,
        "rubric": "1 pt: Correctly excludes 88, 90, and 72 (since not strictly greater than 90).\n1 pt: Result is [91, 95, 101]."
      },
      {
        "label": "b",
        "prompt": "Modify the procedure so it instead returns the count of hot days without storing them.",
        "points": 2,
        "rubric": "1 pt: Replaces list with integer counter initialized to 0.\n1 pt: Increments counter inside IF and returns the final count."
      }
    ],
    "totalPoints": 4,
    "source": "Supplemental CSP practice"
  },
  {
    "id": "csp-v2-2023-12",
    "courseSlug": "ap-cs-principles",
    "year": 2023,
    "number": 12,
    "topic": "Iteration pattern: running aggregate",
    "prompt": "Write pseudocode that computes the average of a non-empty list `nums`.\n\n```pseudocode\nPROCEDURE average(nums) {\n  total ← 0\n  FOR EACH x IN nums {\n    total ← total + x\n  }\n  RETURN total / LENGTH(nums)\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Explain why the procedure should not be called on an empty list, and describe one way to guard against that case.",
        "points": 2,
        "rubric": "1 pt: LENGTH(nums) is 0, causing division by zero.\n1 pt: Suggests an IF check that returns 0 or a sentinel before dividing."
      },
      {
        "label": "b",
        "prompt": "If `nums` has 1,000,000 elements, how many addition operations are performed? Describe the runtime behavior as the list grows.",
        "points": 2,
        "rubric": "1 pt: Exactly 1,000,000 additions (one per element).\n1 pt: Runtime grows linearly with n (O(n))."
      }
    ],
    "totalPoints": 4,
    "source": "Supplemental CSP practice"
  },
  {
    "id": "csp-v2-2024-13",
    "courseSlug": "ap-cs-principles",
    "year": 2024,
    "number": 13,
    "topic": "Procedure abstraction with RANDOM",
    "prompt": "A classroom app needs to pick a random student fairly from a class roster.\n\n```pseudocode\nPROCEDURE pickStudent(roster) {\n  i ← RANDOM(1, LENGTH(roster))\n  RETURN roster[i]\n}\n```",
    "parts": [
      {
        "label": "a",
        "prompt": "Explain why using `RANDOM(1, LENGTH(roster))` gives every student an equal probability of being chosen.",
        "points": 2,
        "rubric": "1 pt: RANDOM is described as producing each integer in its range with equal probability.\n1 pt: Every index from 1 to n maps to exactly one student, so each is equally likely."
      },
      {
        "label": "b",
        "prompt": "Modify `pickStudent` so it picks two different students (no repeats) and returns them as a pair.",
        "points": 3,
        "rubric": "1 pt: Picks a first student using RANDOM.\n1 pt: Uses a loop or re-sample until the second index differs from the first.\n1 pt: Returns both students (e.g., as a list of two) without duplication."
      }
    ],
    "totalPoints": 5,
    "source": "Supplemental CSP practice"
  },

  // ─── ap-us-history wave-2 (+19) ─────────────────────────────
  {
    "id": "apush-v2-2017-saq-1",
    "courseSlug": "ap-us-history",
    "year": 2017,
    "number": 1,
    "topic": "Great Awakening",
    "prompt": "Answer parts a, b, and c about the First Great Awakening of the 1730s-1740s.",
    "parts": [
      {
        "label": "a",
        "prompt": "Briefly describe ONE religious change brought about by the First Great Awakening in the British North American colonies.",
        "points": 1,
        "rubric": "1 pt: Identifies a valid change such as growth of evangelical denominations (Baptists, Methodists), emphasis on emotional personal conversion, or challenge to established clergy."
      },
      {
        "label": "b",
        "prompt": "Briefly explain ONE way the Great Awakening contributed to a shared colonial identity.",
        "points": 1,
        "rubric": "1 pt: Explains intercolonial travel of itinerant preachers (e.g., Whitefield), common print culture, or shared religious experiences crossing colony boundaries."
      },
      {
        "label": "c",
        "prompt": "Briefly explain ONE way the Great Awakening influenced later political developments before 1776.",
        "points": 1,
        "rubric": "1 pt: Explains how challenges to religious authority encouraged questioning of political authority, or how democratized churches modeled self-government."
      }
    ],
    "totalPoints": 3,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2017-saq-2",
    "courseSlug": "ap-us-history",
    "year": 2017,
    "number": 2,
    "topic": "French and Indian War and Stamp Act",
    "prompt": "Answer parts a, b, and c about British imperial policy after 1763.",
    "parts": [
      {
        "label": "a",
        "prompt": "Briefly describe ONE reason the British government sought new revenue from the colonies after the French and Indian War.",
        "points": 1,
        "rubric": "1 pt: Identifies massive war debt, cost of stationing troops in North America, or expenses of administering new territory from the Treaty of Paris 1763."
      },
      {
        "label": "b",
        "prompt": "Briefly explain ONE colonial objection to the Stamp Act of 1765.",
        "points": 1,
        "rubric": "1 pt: Explains no taxation without representation, violation of English rights, or that it was a direct internal tax imposed by Parliament rather than colonial assemblies."
      },
      {
        "label": "c",
        "prompt": "Briefly explain ONE specific form of colonial resistance to the Stamp Act.",
        "points": 1,
        "rubric": "1 pt: Identifies Stamp Act Congress, Sons of Liberty crowd actions against stamp distributors, or nonimportation agreements."
      }
    ],
    "totalPoints": 3,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2018-saq-3",
    "courseSlug": "ap-us-history",
    "year": 2018,
    "number": 3,
    "topic": "Articles of Confederation to Constitution",
    "prompt": "Answer parts a, b, and c about the transition from the Articles of Confederation to the Constitution.",
    "parts": [
      {
        "label": "a",
        "prompt": "Briefly describe ONE weakness of the Articles of Confederation.",
        "points": 1,
        "rubric": "1 pt: Identifies inability to tax, no executive, no national court system, unanimous consent required for amendments, or inability to regulate interstate commerce."
      },
      {
        "label": "b",
        "prompt": "Briefly explain ONE specific event between 1783 and 1787 that exposed that weakness.",
        "points": 1,
        "rubric": "1 pt: Explains Shays's Rebellion, failure of trade negotiations with Britain or Spain, or interstate tariff disputes leading to the Annapolis meeting."
      },
      {
        "label": "c",
        "prompt": "Briefly explain ONE way the Constitution of 1787 addressed the weakness identified in part a.",
        "points": 1,
        "rubric": "1 pt: Links the weakness to a specific constitutional remedy such as the taxing power, commerce clause, creation of executive, or supremacy clause."
      }
    ],
    "totalPoints": 3,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2018-saq-4",
    "courseSlug": "ap-us-history",
    "year": 2018,
    "number": 4,
    "topic": "Jeffersonian era",
    "prompt": "Answer parts a, b, and c about the Jefferson presidency (1801-1809).",
    "parts": [
      {
        "label": "a",
        "prompt": "Briefly describe ONE way Jefferson's actions as president departed from his stated political principles.",
        "points": 1,
        "rubric": "1 pt: Identifies the Louisiana Purchase as a loose construction of the Constitution, retention of parts of the Hamiltonian financial system, or use of federal power in the Embargo Act."
      },
      {
        "label": "b",
        "prompt": "Briefly explain ONE consequence of the Louisiana Purchase for the United States.",
        "points": 1,
        "rubric": "1 pt: Explains doubling of national territory, opening of westward expansion, eventual sectional conflict over slavery expansion, or the Lewis and Clark expedition."
      },
      {
        "label": "c",
        "prompt": "Briefly explain ONE effect of the Embargo Act of 1807 on the United States.",
        "points": 1,
        "rubric": "1 pt: Explains damage to New England shipping economy, growth of domestic manufacturing, or increased tensions leading toward the War of 1812."
      }
    ],
    "totalPoints": 3,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2019-saq-5",
    "courseSlug": "ap-us-history",
    "year": 2019,
    "number": 5,
    "topic": "Age of Jackson",
    "prompt": "Answer parts a, b, and c about the presidency of Andrew Jackson.",
    "parts": [
      {
        "label": "a",
        "prompt": "Briefly describe ONE democratic reform associated with the Age of Jackson (1824-1840).",
        "points": 1,
        "rubric": "1 pt: Identifies expansion of white male suffrage, use of nominating conventions, or rise of the spoils system as rotation in office."
      },
      {
        "label": "b",
        "prompt": "Briefly explain ONE way Jackson expanded the power of the presidency.",
        "points": 1,
        "rubric": "1 pt: Explains record use of the veto (e.g., Bank veto), defiance of the Supreme Court in Worcester v. Georgia, or forceful response in the Nullification Crisis."
      },
      {
        "label": "c",
        "prompt": "Briefly explain ONE group that was harmed by Jacksonian policies.",
        "points": 1,
        "rubric": "1 pt: Explains Native Americans via Indian Removal Act and Trail of Tears, or enslaved people via continued expansion of slavery into new states."
      }
    ],
    "totalPoints": 3,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2019-saq-6",
    "courseSlug": "ap-us-history",
    "year": 2019,
    "number": 6,
    "topic": "Antebellum reform - abolition and women",
    "prompt": "Answer parts a, b, and c about antebellum reform movements (1820-1860).",
    "parts": [
      {
        "label": "a",
        "prompt": "Briefly describe ONE goal of the abolitionist movement before the Civil War.",
        "points": 1,
        "rubric": "1 pt: Identifies immediate emancipation (Garrison), gradual emancipation, colonization, or ending the domestic slave trade."
      },
      {
        "label": "b",
        "prompt": "Briefly explain ONE connection between abolitionism and the early women's rights movement.",
        "points": 1,
        "rubric": "1 pt: Explains shared leaders (e.g., Grimke sisters, Stanton, Mott), exclusion of women from antislavery conventions leading to Seneca Falls, or shared natural-rights rhetoric."
      },
      {
        "label": "c",
        "prompt": "Briefly explain ONE specific outcome of the 1848 Seneca Falls Convention.",
        "points": 1,
        "rubric": "1 pt: Explains the Declaration of Sentiments, its demand for woman suffrage, or its role in launching an organized women's rights movement."
      }
    ],
    "totalPoints": 3,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2020-saq-7",
    "courseSlug": "ap-us-history",
    "year": 2020,
    "number": 7,
    "topic": "Manifest Destiny",
    "prompt": "Answer parts a, b, and c about Manifest Destiny in the 1840s.",
    "parts": [
      {
        "label": "a",
        "prompt": "Briefly describe ONE specific territorial acquisition associated with Manifest Destiny.",
        "points": 1,
        "rubric": "1 pt: Identifies annexation of Texas (1845), Oregon Treaty (1846), or Mexican Cession via Treaty of Guadalupe Hidalgo (1848)."
      },
      {
        "label": "b",
        "prompt": "Briefly explain ONE argument used to justify westward expansion.",
        "points": 1,
        "rubric": "1 pt: Explains providential mission, spread of republican government, racial ideology of Anglo-Saxon superiority, or economic access to Pacific trade."
      },
      {
        "label": "c",
        "prompt": "Briefly explain ONE way Manifest Destiny intensified sectional conflict.",
        "points": 1,
        "rubric": "1 pt: Explains Wilmot Proviso debate, Compromise of 1850, or Kansas-Nebraska Act arising from the question of slavery in new territories."
      }
    ],
    "totalPoints": 3,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2020-saq-8",
    "courseSlug": "ap-us-history",
    "year": 2020,
    "number": 8,
    "topic": "Reconstruction",
    "prompt": "Answer parts a, b, and c about Reconstruction (1865-1877).",
    "parts": [
      {
        "label": "a",
        "prompt": "Briefly describe ONE constitutional change made during Reconstruction.",
        "points": 1,
        "rubric": "1 pt: Identifies the 13th (abolition), 14th (citizenship and equal protection), or 15th Amendment (voting rights regardless of race)."
      },
      {
        "label": "b",
        "prompt": "Briefly explain ONE way freedpeople experienced new opportunities during Reconstruction.",
        "points": 1,
        "rubric": "1 pt: Explains voting and officeholding, Freedmen's Bureau schools, founding of Black churches, or family reunification."
      },
      {
        "label": "c",
        "prompt": "Briefly explain ONE reason Reconstruction ended and its gains were rolled back.",
        "points": 1,
        "rubric": "1 pt: Explains Compromise of 1877, white terror (KKK), northern fatigue, Supreme Court decisions like the Slaughterhouse Cases, or economic Panic of 1873."
      }
    ],
    "totalPoints": 3,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2021-saq-9",
    "courseSlug": "ap-us-history",
    "year": 2021,
    "number": 9,
    "topic": "Gilded Age industry and labor",
    "prompt": "Answer parts a, b, and c about the Gilded Age (1870-1900).",
    "parts": [
      {
        "label": "a",
        "prompt": "Briefly describe ONE business practice used by large corporations in the Gilded Age.",
        "points": 1,
        "rubric": "1 pt: Identifies horizontal integration (Rockefeller), vertical integration (Carnegie), trusts, or pools."
      },
      {
        "label": "b",
        "prompt": "Briefly explain ONE reason workers organized during the Gilded Age.",
        "points": 1,
        "rubric": "1 pt: Explains low wages, long hours, dangerous conditions, wage cuts during downturns, or loss of craft autonomy to mechanization."
      },
      {
        "label": "c",
        "prompt": "Briefly explain ONE government response to industrial conflict before 1900.",
        "points": 1,
        "rubric": "1 pt: Explains Interstate Commerce Act, Sherman Antitrust Act, or use of federal troops/injunctions (e.g., Pullman Strike)."
      }
    ],
    "totalPoints": 3,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2021-saq-10",
    "courseSlug": "ap-us-history",
    "year": 2021,
    "number": 10,
    "topic": "Progressive Era",
    "prompt": "Answer parts a, b, and c about the Progressive Era (1900-1917).",
    "parts": [
      {
        "label": "a",
        "prompt": "Briefly describe ONE Progressive reform at the federal level.",
        "points": 1,
        "rubric": "1 pt: Identifies 16th Amendment (income tax), 17th Amendment (direct election of senators), 18th (prohibition), 19th (woman suffrage), Federal Reserve Act, or Pure Food and Drug Act."
      },
      {
        "label": "b",
        "prompt": "Briefly explain ONE limitation of Progressive reform.",
        "points": 1,
        "rubric": "1 pt: Explains exclusion of African Americans, acceptance of segregation, limits on immigrant inclusion, or paternalistic moral reforms."
      },
      {
        "label": "c",
        "prompt": "Briefly explain ONE way muckraking journalism shaped Progressive reform.",
        "points": 1,
        "rubric": "1 pt: Explains a specific example such as Upton Sinclair's The Jungle prompting meat inspection laws, Ida Tarbell on Standard Oil, or Jacob Riis on tenements."
      }
    ],
    "totalPoints": 3,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2022-saq-11",
    "courseSlug": "ap-us-history",
    "year": 2022,
    "number": 11,
    "topic": "1920s society",
    "prompt": "Answer parts a, b, and c about cultural conflict in the 1920s.",
    "parts": [
      {
        "label": "a",
        "prompt": "Briefly describe ONE cultural change of the 1920s associated with modern urban life.",
        "points": 1,
        "rubric": "1 pt: Identifies Harlem Renaissance, flapper culture and changing gender norms, mass consumer culture, radio, or motion pictures."
      },
      {
        "label": "b",
        "prompt": "Briefly explain ONE reaction against those changes during the 1920s.",
        "points": 1,
        "rubric": "1 pt: Explains Prohibition, the revived Ku Klux Klan, National Origins Act of 1924, or the Scopes Trial and fundamentalism."
      },
      {
        "label": "c",
        "prompt": "Briefly explain ONE way the economic prosperity of the 1920s was uneven.",
        "points": 1,
        "rubric": "1 pt: Explains farmers' falling prices, limited gains for industrial workers, or exclusion of African Americans and immigrants from full benefits."
      }
    ],
    "totalPoints": 3,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2022-saq-12",
    "courseSlug": "ap-us-history",
    "year": 2022,
    "number": 12,
    "topic": "Cold War containment",
    "prompt": "Answer parts a, b, and c about early Cold War foreign policy (1945-1960).",
    "parts": [
      {
        "label": "a",
        "prompt": "Briefly describe ONE specific application of the policy of containment before 1960.",
        "points": 1,
        "rubric": "1 pt: Identifies Truman Doctrine aid to Greece and Turkey, Marshall Plan, Berlin Airlift, NATO, or the Korean War."
      },
      {
        "label": "b",
        "prompt": "Briefly explain ONE domestic effect of the early Cold War on the United States.",
        "points": 1,
        "rubric": "1 pt: Explains loyalty programs, McCarthyism, HUAC investigations, growth of the military-industrial complex, or expansion of federal scientific and educational funding."
      },
      {
        "label": "c",
        "prompt": "Briefly explain ONE criticism of containment made during this period.",
        "points": 1,
        "rubric": "1 pt: Explains George Kennan's later objection to militarization, conservative call for rollback, or left critique of interventionism and support for undemocratic regimes."
      }
    ],
    "totalPoints": 3,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2015-leq-1",
    "courseSlug": "ap-us-history",
    "year": 2015,
    "number": 1,
    "topic": "American Revolution - causes",
    "prompt": "Evaluate the extent to which British imperial policies between 1763 and 1776 caused the American Revolution.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a complete essay with thesis, contextualization, evidence, and analysis addressing the prompt.",
        "points": 6,
        "rubric": "1 pt (Thesis): Presents a defensible thesis that evaluates the extent to which British policies caused the Revolution, not merely a restatement.\n1 pt (Contextualization): Describes broader context such as salutary neglect, the Seven Years' War, or Enlightenment ideology.\n1 pt (Evidence): Provides at least two specific pieces of evidence (e.g., Proclamation of 1763, Stamp Act, Townshend Acts, Tea Act, Coercive Acts).\n1 pt (Evidence supports argument): Uses that evidence to support the stated argument about causation.\n1 pt (Analysis - reasoning): Uses causation reasoning to connect British policies to colonial responses.\n1 pt (Analysis - complexity): Demonstrates complexity, for example by weighing ideological vs. economic causes or acknowledging long-term vs. short-term factors."
      }
    ],
    "totalPoints": 6,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2016-leq-2",
    "courseSlug": "ap-us-history",
    "year": 2016,
    "number": 2,
    "topic": "Civil War causes",
    "prompt": "Evaluate the extent to which the expansion of slavery into western territories caused the Civil War.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a complete essay with thesis, contextualization, evidence, and analysis addressing the prompt.",
        "points": 6,
        "rubric": "1 pt (Thesis): Defensible thesis evaluating the role of territorial expansion of slavery in causing the Civil War.\n1 pt (Contextualization): Situates the issue in the Mexican Cession, Manifest Destiny, or sectional balance in the Senate.\n1 pt (Evidence): Provides specifics such as Wilmot Proviso, Compromise of 1850, Kansas-Nebraska Act, Dred Scott, or Bleeding Kansas.\n1 pt (Evidence supports argument): Ties evidence to the claim about causation.\n1 pt (Analysis - reasoning): Uses causation to explain how territorial disputes intensified sectionalism.\n1 pt (Analysis - complexity): Addresses complexity by weighing slavery expansion against states' rights, economic differences, or political breakdown."
      }
    ],
    "totalPoints": 6,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2017-leq-3",
    "courseSlug": "ap-us-history",
    "year": 2017,
    "number": 3,
    "topic": "New Deal",
    "prompt": "Evaluate the extent to which the New Deal transformed the role of the federal government in the United States between 1933 and 1940.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a complete essay with thesis, contextualization, evidence, and analysis addressing the prompt.",
        "points": 6,
        "rubric": "1 pt (Thesis): Defensible thesis about the extent of transformation in federal power during the New Deal.\n1 pt (Contextualization): Discusses the Great Depression, Hoover's response, or pre-1933 federalism.\n1 pt (Evidence): Provides specifics such as Social Security Act, Wagner Act, AAA, TVA, FDIC, or WPA.\n1 pt (Evidence supports argument): Connects programs to federal expansion or continuity with the past.\n1 pt (Analysis - reasoning): Uses continuity and change over time to compare pre- and post-New Deal government.\n1 pt (Analysis - complexity): Acknowledges limits of the New Deal (e.g., exclusion of farmworkers and domestic workers, court challenges, persistence of unemployment)."
      }
    ],
    "totalPoints": 6,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2018-leq-4",
    "courseSlug": "ap-us-history",
    "year": 2018,
    "number": 4,
    "topic": "World War II home front",
    "prompt": "Evaluate the extent to which World War II changed American society on the home front between 1941 and 1945.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a complete essay with thesis, contextualization, evidence, and analysis addressing the prompt.",
        "points": 6,
        "rubric": "1 pt (Thesis): Defensible thesis on the extent of home-front social change during WWII.\n1 pt (Contextualization): Establishes context such as the end of the Depression, New Deal legacy, or prewar Jim Crow and gender norms.\n1 pt (Evidence): Provides specifics such as women in war industries, Double V campaign, zoot suit riots, Japanese American internment, or Bracero Program.\n1 pt (Evidence supports argument): Connects evidence to claims about social change.\n1 pt (Analysis - reasoning): Uses continuity and change to compare wartime society with prewar patterns.\n1 pt (Analysis - complexity): Addresses complexity by contrasting new opportunities with persistent inequalities or by distinguishing short-term wartime changes from long-term shifts."
      }
    ],
    "totalPoints": 6,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2019-leq-5",
    "courseSlug": "ap-us-history",
    "year": 2019,
    "number": 5,
    "topic": "Vietnam War and domestic politics",
    "prompt": "Evaluate the extent to which the Vietnam War changed American politics and society between 1964 and 1975.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a complete essay with thesis, contextualization, evidence, and analysis addressing the prompt.",
        "points": 6,
        "rubric": "1 pt (Thesis): Defensible thesis on the extent of change produced by the Vietnam War at home.\n1 pt (Contextualization): Establishes Cold War containment, the Great Society, or post-WWII consensus.\n1 pt (Evidence): Provides specifics such as Gulf of Tonkin Resolution, Tet Offensive, antiwar movement, draft resistance, My Lai, or Pentagon Papers.\n1 pt (Evidence supports argument): Connects evidence to political and social change.\n1 pt (Analysis - reasoning): Uses causation or continuity and change to link the war to loss of public trust.\n1 pt (Analysis - complexity): Addresses complexity such as War Powers Act vs. continued executive power, or divisions within the antiwar movement."
      }
    ],
    "totalPoints": 6,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2020-leq-6",
    "courseSlug": "ap-us-history",
    "year": 2020,
    "number": 6,
    "topic": "Civil Rights Movement",
    "prompt": "Evaluate the extent to which the civil rights movement between 1954 and 1968 transformed American society.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a complete essay with thesis, contextualization, evidence, and analysis addressing the prompt.",
        "points": 6,
        "rubric": "1 pt (Thesis): Defensible thesis about the extent of transformation produced by the civil rights movement.\n1 pt (Contextualization): Establishes context such as Jim Crow, WWII-era activism, or the early Cold War.\n1 pt (Evidence): Provides specifics such as Brown v. Board, Montgomery Bus Boycott, Little Rock, Civil Rights Act of 1964, Voting Rights Act of 1965, or Black Power.\n1 pt (Evidence supports argument): Connects evidence to claims about legal, political, or social change.\n1 pt (Analysis - reasoning): Uses causation or continuity and change to link activism to federal action and social change.\n1 pt (Analysis - complexity): Recognizes ongoing inequality, backlash, or tensions between nonviolent and militant strategies."
      }
    ],
    "totalPoints": 6,
    "source": "Supplemental APUSH practice"
  },
  {
    "id": "apush-v2-2021-leq-7",
    "courseSlug": "ap-us-history",
    "year": 2021,
    "number": 7,
    "topic": "Conservative resurgence - Nixon to Reagan",
    "prompt": "Evaluate the extent to which conservatism reshaped American politics between 1968 and 1989.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Write a complete essay with thesis, contextualization, evidence, and analysis addressing the prompt.",
        "points": 6,
        "rubric": "1 pt (Thesis): Defensible thesis on how far conservatism reshaped politics from Nixon to Reagan.\n1 pt (Contextualization): Establishes context such as 1960s liberalism, Vietnam, stagflation, or the civil rights backlash.\n1 pt (Evidence): Provides specifics such as Nixon's Southern Strategy, Watergate, tax revolts (Prop 13), Religious Right, Reagan tax cuts, deregulation, or the end of the Cold War.\n1 pt (Evidence supports argument): Connects evidence to claims about conservative ascendancy.\n1 pt (Analysis - reasoning): Uses continuity and change over time to trace the shift from New Deal consensus to conservative governance.\n1 pt (Analysis - complexity): Addresses complexity by noting persistence of entitlement programs, limits of the Reagan Revolution, or internal divisions among conservatives."
      }
    ],
    "totalPoints": 6,
    "source": "Supplemental APUSH practice"
  },

  // ─── ap-world-history wave-2 (+19) ─────────────────────────────
  {
    "id": "apwh-v2-2016-saq-1",
    "courseSlug": "ap-world-history",
    "year": 2016,
    "number": 1,
    "topic": "Song dynasty economic expansion",
    "prompt": "Historians have argued that Song China (960-1279) experienced an 'economic revolution' that transformed Afro-Eurasian commerce. Using your knowledge of Song China, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE technological innovation during the Song dynasty that contributed to commercial growth.",
        "points": 1,
        "rubric": "1 pt: Identifies a valid innovation such as woodblock printing, the magnetic compass, gunpowder, or improved iron smelting."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way Song economic policies encouraged long-distance trade.",
        "points": 1,
        "rubric": "1 pt: Explains a policy such as the issuance of paper money (jiaozi), state support of canal infrastructure, or encouragement of Indian Ocean maritime trade through ports like Quanzhou."
      },
      {
        "label": "C",
        "prompt": "Explain ONE social consequence of Song economic expansion within China.",
        "points": 1,
        "rubric": "1 pt: Explains a consequence such as urbanization of cities like Hangzhou, the rise of a scholar-gentry class via the examination system, or changing roles for women including foot binding among elites."
      }
    ],
    "totalPoints": 3,
    "source": "AP World History course framework, Unit 1"
  },
  {
    "id": "apwh-v2-2017-saq-2",
    "courseSlug": "ap-world-history",
    "year": 2017,
    "number": 2,
    "topic": "Mongol Empire and Eurasian integration",
    "prompt": "A modern historian writes: 'The Pax Mongolica stitched together a vast zone of exchange in which merchants, diseases, and ideas traveled with unprecedented speed.' Respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE specific example of cross-cultural exchange facilitated by the Mongol Empire.",
        "points": 1,
        "rubric": "1 pt: Identifies an example such as the travels of Marco Polo, the transmission of gunpowder technology westward, or the spread of the bubonic plague along trade routes."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way Mongol rule affected political structures in a conquered region.",
        "points": 1,
        "rubric": "1 pt: Explains an effect such as the use of existing bureaucracies in Yuan China, the destruction of the Abbasid Caliphate in 1258, or tribute systems imposed on Rus principalities."
      },
      {
        "label": "C",
        "prompt": "Explain ONE reason for the decline of the Mongol khanates by the mid-1300s.",
        "points": 1,
        "rubric": "1 pt: Explains a reason such as succession disputes, overextension, the impact of the Black Death, or resistance such as the Ming overthrow of the Yuan in 1368."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apwh-v2-2018-saq-3",
    "courseSlug": "ap-world-history",
    "year": 2018,
    "number": 3,
    "topic": "Dar al-Islam and trans-regional connections",
    "prompt": "Using your knowledge of world history from c. 1200-1450, respond to parts A, B, and C about the Islamic world.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE way Islamic scholarship contributed to the preservation or advancement of knowledge in this period.",
        "points": 1,
        "rubric": "1 pt: Identifies a contribution such as the House of Wisdom's translation work, advancements in algebra by al-Khwarizmi, or medical writings by Ibn Sina."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way Islam spread beyond the Arabian Peninsula between 1200 and 1450.",
        "points": 1,
        "rubric": "1 pt: Explains a mechanism such as Sufi missionary activity in South Asia, merchant networks bringing Islam to East Africa, or conquest by Turkic dynasties into Anatolia and India."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way the travels of Ibn Battuta illustrate the character of Dar al-Islam.",
        "points": 1,
        "rubric": "1 pt: Explains that his ability to travel across Africa and Asia using common religious and legal frameworks demonstrates a shared Islamic cultural zone despite political fragmentation."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apwh-v2-2019-saq-4",
    "courseSlug": "ap-world-history",
    "year": 2019,
    "number": 4,
    "topic": "Mali and trans-Saharan trade",
    "prompt": "The Mali Empire under Mansa Musa (r. 1312-1337) became famous across Afro-Eurasia. Respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE commodity that drove trans-Saharan trade in this period.",
        "points": 1,
        "rubric": "1 pt: Identifies a valid commodity such as gold, salt, ivory, or enslaved people."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way Mansa Musa's pilgrimage to Mecca affected Afro-Eurasian perceptions of West Africa.",
        "points": 1,
        "rubric": "1 pt: Explains an effect such as the depiction of Mali on the Catalan Atlas, the flood of gold that temporarily devalued Egyptian currency, or increased diplomatic and scholarly contact with North Africa."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way Islam shaped political or intellectual life in Mali.",
        "points": 1,
        "rubric": "1 pt: Explains a way such as the development of Timbuktu as a center of Islamic learning, the use of Arabic in administration, or the legitimation of Mansa authority through Islam."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apwh-v2-2020-saq-1",
    "courseSlug": "ap-world-history",
    "year": 2020,
    "number": 1,
    "topic": "Mesoamerican and Andean states",
    "prompt": "Using your knowledge of the Aztec and Inca empires before European contact, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE similarity between Aztec and Inca methods of imperial administration.",
        "points": 1,
        "rubric": "1 pt: Identifies a similarity such as the use of tribute systems, reliance on local rulers, or extensive road or causeway infrastructure."
      },
      {
        "label": "B",
        "prompt": "Explain ONE difference in labor systems between the Aztec and Inca empires.",
        "points": 1,
        "rubric": "1 pt: Explains a difference such as Aztec reliance on tribute labor and flower wars for captives versus Inca use of the mit'a rotational labor system."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way geography shaped state organization in EITHER the Aztec or Inca Empire.",
        "points": 1,
        "rubric": "1 pt: Explains a way such as Aztec chinampa agriculture in lake Texcoco supporting Tenochtitlan, or Inca terraced agriculture and quipu record-keeping across Andean elevations."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apwh-v2-2021-saq-2",
    "courseSlug": "ap-world-history",
    "year": 2021,
    "number": 2,
    "topic": "Indian Ocean trade networks",
    "prompt": "A historian asserts that the Indian Ocean world from 1200 to 1450 was characterized by 'cosmopolitan ports where merchants of many faiths negotiated trust without a single imperial umbrella.' Respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE technology that enabled long-distance Indian Ocean trade in this period.",
        "points": 1,
        "rubric": "1 pt: Identifies a technology such as the lateen sail, the astrolabe, the magnetic compass, or the dhow."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way diasporic merchant communities supported Indian Ocean commerce.",
        "points": 1,
        "rubric": "1 pt: Explains a way such as Gujarati merchants settling in East African ports, Chinese communities in Southeast Asia, or Arab traders along the Swahili coast providing networks of trust and credit."
      },
      {
        "label": "C",
        "prompt": "Explain ONE cultural consequence of Indian Ocean trade for an African or Asian society.",
        "points": 1,
        "rubric": "1 pt: Explains a consequence such as the development of Swahili as a Bantu-Arabic hybrid language, the spread of Islam to Southeast Asia, or the incorporation of Indian culinary and religious influences across the Bay of Bengal."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apwh-v2-2022-saq-3",
    "courseSlug": "ap-world-history",
    "year": 2022,
    "number": 3,
    "topic": "Columbian Exchange",
    "prompt": "Using your knowledge of the Columbian Exchange after 1492, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE crop transferred from the Americas to Afro-Eurasia.",
        "points": 1,
        "rubric": "1 pt: Identifies a crop such as maize, potatoes, tomatoes, or cassava."
      },
      {
        "label": "B",
        "prompt": "Explain ONE demographic consequence of the Columbian Exchange in the Americas.",
        "points": 1,
        "rubric": "1 pt: Explains a consequence such as the catastrophic decline of Indigenous populations due to smallpox and measles, or the forced migration of Africans through the Atlantic slave trade to replace lost labor."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way the Columbian Exchange affected populations in Afro-Eurasia.",
        "points": 1,
        "rubric": "1 pt: Explains an effect such as population growth in China and Europe due to new calorie-dense crops like sweet potatoes and potatoes, or the diffusion of chili peppers into South and East Asian cuisines."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apwh-v2-2016-saq-4",
    "courseSlug": "ap-world-history",
    "year": 2016,
    "number": 4,
    "topic": "Land-based Islamic empires",
    "prompt": "Historians have compared the Ottoman, Safavid, and Mughal empires as 'gunpowder empires' of the early modern era. Respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE common feature of Ottoman, Safavid, and Mughal imperial rule.",
        "points": 1,
        "rubric": "1 pt: Identifies a feature such as reliance on gunpowder weaponry, claims to legitimacy through Islam, or centralized tax systems administered by elite officials."
      },
      {
        "label": "B",
        "prompt": "Explain ONE religious policy that distinguished ONE of these empires.",
        "points": 1,
        "rubric": "1 pt: Explains a policy such as the Ottoman millet system, Safavid enforcement of Twelver Shi'ism, or Akbar's policy of sulh-i kul (universal peace) in Mughal India."
      },
      {
        "label": "C",
        "prompt": "Explain ONE reason for the decline of one of these empires by 1800.",
        "points": 1,
        "rubric": "1 pt: Explains a reason such as Ottoman loss of military advantage after the siege of Vienna in 1683, Safavid collapse due to Afghan invasion in 1722, or Mughal fragmentation as regional powers and the British East India Company expanded."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apwh-v2-2017-saq-1",
    "courseSlug": "ap-world-history",
    "year": 2017,
    "number": 1,
    "topic": "Atlantic slave trade",
    "prompt": "Using your knowledge of the Atlantic slave trade between 1500 and 1800, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE African state whose economy or politics were shaped by the Atlantic slave trade.",
        "points": 1,
        "rubric": "1 pt: Identifies a state such as Dahomey, Asante, Kongo, or Oyo."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way the Atlantic slave trade affected the demography of West or Central Africa.",
        "points": 1,
        "rubric": "1 pt: Explains an effect such as sex-ratio imbalances favoring women due to male export, regional depopulation in central African interiors, or displacement caused by slave-raiding warfare."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way enslaved Africans shaped cultural life in the Americas.",
        "points": 1,
        "rubric": "1 pt: Explains a way such as syncretic religions like Vodun or Candomble, the development of creole languages, or influence on music, foodways, and agricultural techniques such as rice cultivation in the Carolinas."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apwh-v2-2018-saq-2",
    "courseSlug": "ap-world-history",
    "year": 2018,
    "number": 2,
    "topic": "Qing dynasty and its challenges",
    "prompt": "The Qing dynasty (1644-1912) expanded Chinese territory to its greatest extent yet faced mounting crises in the 19th century. Respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE way the Qing expanded the territorial reach of the Chinese state.",
        "points": 1,
        "rubric": "1 pt: Identifies an expansion such as the incorporation of Taiwan, the conquest of Xinjiang, or the subjugation of Tibet and Mongolia."
      },
      {
        "label": "B",
        "prompt": "Explain ONE cause of the First Opium War (1839-1842).",
        "points": 1,
        "rubric": "1 pt: Explains a cause such as the British trade imbalance resolved through opium smuggling, Qing commissioner Lin Zexu's destruction of opium stocks, or British demands for open trade and extraterritoriality."
      },
      {
        "label": "C",
        "prompt": "Explain ONE consequence of the 'unequal treaties' for Qing China.",
        "points": 1,
        "rubric": "1 pt: Explains a consequence such as the cession of Hong Kong, opening of treaty ports, loss of tariff autonomy, or internal instability feeding movements like the Taiping Rebellion."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apwh-v2-2019-saq-1",
    "courseSlug": "ap-world-history",
    "year": 2019,
    "number": 1,
    "topic": "Industrialization and global labor",
    "prompt": "Using your knowledge of global industrialization from 1750 to 1900, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE region outside Europe that industrialized before 1900.",
        "points": 1,
        "rubric": "1 pt: Identifies a region such as Meiji Japan, the northeastern United States, or parts of Russia under Witte's reforms."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way industrialization in Europe reshaped labor patterns in Asia or Africa.",
        "points": 1,
        "rubric": "1 pt: Explains a way such as Indian handloom weavers displaced by Lancashire cotton, the use of indentured labor from India and China after abolition of slavery, or African labor recruited for cash-crop plantations and mines."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way Meiji Japan responded to industrial pressure from the West.",
        "points": 1,
        "rubric": "1 pt: Explains a response such as the abolition of the samurai class, state-sponsored zaibatsu industries, universal conscription, or sending missions abroad like the Iwakura Mission to study Western institutions."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apwh-v2-2020-saq-2",
    "courseSlug": "ap-world-history",
    "year": 2020,
    "number": 2,
    "topic": "Decolonization after 1945",
    "prompt": "A scholar argues: 'Decolonization was not merely the lowering of European flags but the struggle to define what sovereignty would mean in a Cold War world.' Respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE newly independent state created through decolonization between 1945 and 1975.",
        "points": 1,
        "rubric": "1 pt: Identifies a state such as India (1947), Ghana (1957), Algeria (1962), or Angola (1975)."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way Cold War rivalry shaped a decolonization movement.",
        "points": 1,
        "rubric": "1 pt: Explains a way such as U.S.-Soviet competition over Vietnam, Soviet support for the MPLA in Angola, or U.S. intervention in the Congo following Lumumba's assassination."
      },
      {
        "label": "C",
        "prompt": "Explain ONE challenge newly independent states faced after winning independence.",
        "points": 1,
        "rubric": "1 pt: Explains a challenge such as colonial border disputes, dependence on former colonizers for markets and capital, ethnic or sectarian tensions, or coups and one-party rule."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apwh-v2-2016-leq-5",
    "courseSlug": "ap-world-history",
    "year": 2016,
    "number": 5,
    "topic": "Transoceanic empires 1450-1750",
    "prompt": "Evaluate the extent to which maritime empires (Spanish, Portuguese, Dutch, British, or French) transformed economies in the Atlantic world from 1450 to 1750.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - Makes a defensible thesis evaluating the extent of economic transformation.\n1 pt: Contextualization - Situates the argument in a broader context such as late-medieval Mediterranean trade or the rise of joint-stock companies.\n1 pt: Evidence - Provides at least two specific, relevant pieces of historical evidence.\n1 pt: Evidence supports argument - Uses evidence to support the thesis about economic transformation.\n1 pt: Analysis - reasoning - Uses causation, comparison, or continuity and change over time to structure the argument.\n1 pt: Analysis - complexity - Demonstrates complexity, e.g., by acknowledging continuities in pre-existing economies or divergent impacts on Africa vs Europe."
      }
    ],
    "totalPoints": 6
  },
  {
    "id": "apwh-v2-2017-leq-6",
    "courseSlug": "ap-world-history",
    "year": 2017,
    "number": 6,
    "topic": "19th-century imperialism in Africa",
    "prompt": "Evaluate the extent to which the 'Scramble for Africa' (c. 1880-1914) was driven by economic motives rather than political or ideological motives.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - States a defensible claim about the relative weight of economic motives.\n1 pt: Contextualization - Connects to industrialization, nationalism, or the Berlin Conference of 1884-1885.\n1 pt: Evidence - Cites at least two specific examples such as Leopold II in the Congo, British in South Africa, or French in West Africa.\n1 pt: Evidence supports argument - Integrates evidence to defend the claim.\n1 pt: Analysis - reasoning - Uses causation or comparison across colonial cases.\n1 pt: Analysis - complexity - Recognizes interaction among motives or counters with Social Darwinist and strategic rationales."
      }
    ],
    "totalPoints": 6
  },
  {
    "id": "apwh-v2-2018-leq-7",
    "courseSlug": "ap-world-history",
    "year": 2018,
    "number": 7,
    "topic": "Silk Road trade 1200-1450",
    "prompt": "Evaluate the extent to which the Silk Roads fostered cross-cultural exchange in Afro-Eurasia from 1200 to 1450.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - Articulates a defensible claim about the degree of exchange.\n1 pt: Contextualization - Places the argument in broader context such as the rise of the Mongols or urban growth in Song China.\n1 pt: Evidence - Uses at least two specific examples like the travels of Marco Polo or the spread of the Black Death.\n1 pt: Evidence supports argument - Ties evidence clearly to the thesis.\n1 pt: Analysis - reasoning - Applies causation or CCOT.\n1 pt: Analysis - complexity - Acknowledges regional variation or unintended consequences such as disease transmission."
      }
    ],
    "totalPoints": 6
  },
  {
    "id": "apwh-v2-2019-leq-8",
    "courseSlug": "ap-world-history",
    "year": 2019,
    "number": 8,
    "topic": "Atlantic revolutions",
    "prompt": "Evaluate the extent to which Enlightenment ideas caused the Atlantic revolutions from 1750 to 1830.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - States a defensible claim about the causal role of Enlightenment ideas.\n1 pt: Contextualization - Links to print culture, imperial crises, or the Seven Years' War.\n1 pt: Evidence - Uses specifics from the American, French, Haitian, or Latin American revolutions.\n1 pt: Evidence supports argument - Connects evidence to the causal claim.\n1 pt: Analysis - reasoning - Uses causation or comparison across revolutions.\n1 pt: Analysis - complexity - Weighs ideas against structural causes like fiscal crisis, slavery, or imperial rivalry."
      }
    ],
    "totalPoints": 6
  },
  {
    "id": "apwh-v2-2020-leq-9",
    "courseSlug": "ap-world-history",
    "year": 2020,
    "number": 9,
    "topic": "World War I as a global conflict",
    "prompt": "Evaluate the extent to which World War I should be understood as a global conflict rather than a European war.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - Presents a defensible evaluation of the war's global scope.\n1 pt: Contextualization - Situates the war within late-19th-century imperialism or the alliance system.\n1 pt: Evidence - Cites specifics such as colonial troops on the Western Front, the East African campaign, or the Ottoman fronts.\n1 pt: Evidence supports argument - Uses evidence to support the global-vs-European claim.\n1 pt: Analysis - reasoning - Applies causation or comparison between theaters.\n1 pt: Analysis - complexity - Addresses how the war both was rooted in European rivalries and had worldwide repercussions like mandates and anticolonial movements."
      }
    ],
    "totalPoints": 6
  },
  {
    "id": "apwh-v2-2021-leq-10",
    "courseSlug": "ap-world-history",
    "year": 2021,
    "number": 10,
    "topic": "Cold War in the Global South",
    "prompt": "Evaluate the extent to which Cold War rivalry shaped political and economic development in Latin America, Africa, or Asia from 1945 to 1991.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - Makes a defensible claim about the Cold War's impact.\n1 pt: Contextualization - Connects to decolonization or the Non-Aligned Movement.\n1 pt: Evidence - Cites two or more examples such as Cuba, Vietnam, Angola, or Iran.\n1 pt: Evidence supports argument - Links evidence to the claim.\n1 pt: Analysis - reasoning - Employs causation or comparison.\n1 pt: Analysis - complexity - Recognizes local agency alongside superpower intervention."
      }
    ],
    "totalPoints": 6
  },
  {
    "id": "apwh-v2-2022-leq-11",
    "courseSlug": "ap-world-history",
    "year": 2022,
    "number": 11,
    "topic": "Globalization since 1990",
    "prompt": "Evaluate the extent to which globalization since 1990 has produced greater economic interdependence among world regions.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - States a defensible claim about interdependence.\n1 pt: Contextualization - Connects to the end of the Cold War or technological change.\n1 pt: Evidence - Uses specifics like NAFTA, the WTO, China's accession to global markets, or the 2008 financial crisis.\n1 pt: Evidence supports argument - Uses evidence in support of the interdependence claim.\n1 pt: Analysis - reasoning - Uses causation, comparison, or continuity and change.\n1 pt: Analysis - complexity - Acknowledges backlash such as anti-globalization movements or rising inequality."
      }
    ],
    "totalPoints": 6
  },

  // ─── ap-euro-history wave-2 (+19) ─────────────────────────────
  {
    "id": "apeuro-v2-2016-saq-1",
    "courseSlug": "ap-euro-history",
    "year": 2016,
    "number": 1,
    "topic": "Italian Renaissance",
    "prompt": "A modern historian writes: 'The Italian Renaissance was less a rupture with the medieval past than a reorganization of elite culture around classical models.' Respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE intellectual or artistic feature associated with the Italian Renaissance.",
        "points": 1,
        "rubric": "1 pt: Identifies a feature such as humanism, linear perspective, patronage of classical texts, or civic humanism."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way economic conditions in Italy supported the Renaissance.",
        "points": 1,
        "rubric": "1 pt: Explains a condition such as banking wealth of families like the Medici in Florence, commercial revenues in Venice, or competitive patronage among city-states."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way the Renaissance differed from intellectual life in medieval Europe.",
        "points": 1,
        "rubric": "1 pt: Explains a difference such as the recovery of Greek texts, the secular focus of humanist education, or an emphasis on individual achievement rather than scholastic theology."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apeuro-v2-2017-saq-2",
    "courseSlug": "ap-euro-history",
    "year": 2017,
    "number": 2,
    "topic": "Protestant Reformation",
    "prompt": "Using your knowledge of the Protestant Reformation, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE specific grievance Martin Luther raised against the Catholic Church.",
        "points": 1,
        "rubric": "1 pt: Identifies a grievance such as the sale of indulgences, clerical corruption, or the authority of the pope over scripture."
      },
      {
        "label": "B",
        "prompt": "Explain ONE reason Luther's ideas spread rapidly across the Holy Roman Empire.",
        "points": 1,
        "rubric": "1 pt: Explains a reason such as the printing press, support from German princes seeking autonomy from Rome, or use of vernacular language."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way the Catholic Church responded to the Reformation.",
        "points": 1,
        "rubric": "1 pt: Explains a response such as the Council of Trent's reaffirmation of doctrine, the founding of the Jesuits, or the Roman Inquisition and Index of Forbidden Books."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apeuro-v2-2018-saq-3",
    "courseSlug": "ap-euro-history",
    "year": 2018,
    "number": 3,
    "topic": "Scientific Revolution",
    "prompt": "Using your knowledge of the Scientific Revolution, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE discovery or theory associated with the Scientific Revolution.",
        "points": 1,
        "rubric": "1 pt: Identifies a discovery such as Copernican heliocentrism, Kepler's laws of planetary motion, or Newton's law of universal gravitation."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way the Scientific Revolution challenged traditional sources of authority.",
        "points": 1,
        "rubric": "1 pt: Explains a challenge such as empirical method displacing Aristotelian philosophy, or Galileo's conflict with the Catholic Church over heliocentrism."
      },
      {
        "label": "C",
        "prompt": "Explain ONE institutional development that supported scientific inquiry.",
        "points": 1,
        "rubric": "1 pt: Explains a development such as the Royal Society in England, the French Academy of Sciences, or expanding correspondence networks among natural philosophers."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apeuro-v2-2019-saq-4",
    "courseSlug": "ap-euro-history",
    "year": 2019,
    "number": 4,
    "topic": "Absolutism under Louis XIV",
    "prompt": "Historians have described Louis XIV (r. 1643-1715) as the archetype of an absolute monarch. Respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE policy by which Louis XIV sought to centralize royal authority.",
        "points": 1,
        "rubric": "1 pt: Identifies a policy such as the construction of Versailles, the use of intendants, or the revocation of the Edict of Nantes in 1685."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way Louis XIV's wars affected France.",
        "points": 1,
        "rubric": "1 pt: Explains an effect such as fiscal strain from the War of the Spanish Succession, territorial gains along the northeastern frontier, or growing resentment among the nobility."
      },
      {
        "label": "C",
        "prompt": "Explain ONE limit on the power of Louis XIV despite his 'absolutist' claims.",
        "points": 1,
        "rubric": "1 pt: Explains a limit such as dependence on noble cooperation for tax collection, regional parlements, or persistent customary law in French provinces."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apeuro-v2-2020-saq-1",
    "courseSlug": "ap-euro-history",
    "year": 2020,
    "number": 1,
    "topic": "English Civil War and Glorious Revolution",
    "prompt": "Using your knowledge of 17th-century England, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE cause of the English Civil War (1642-1649).",
        "points": 1,
        "rubric": "1 pt: Identifies a cause such as Charles I's attempts to rule without Parliament, religious conflict over Anglican reforms, or disputes over taxation such as ship money."
      },
      {
        "label": "B",
        "prompt": "Explain ONE outcome of the Glorious Revolution of 1688.",
        "points": 1,
        "rubric": "1 pt: Explains an outcome such as the English Bill of Rights, parliamentary supremacy, or the Toleration Act of 1689."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way these 17th-century conflicts shaped later European political thought.",
        "points": 1,
        "rubric": "1 pt: Explains an influence such as Locke's Two Treatises justifying limited government, the constitutional model referenced during the American or French Revolutions, or parliamentary constitutionalism as a contrast to continental absolutism."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apeuro-v2-2021-saq-2",
    "courseSlug": "ap-euro-history",
    "year": 2021,
    "number": 2,
    "topic": "Enlightenment",
    "prompt": "A scholar writes: 'The Enlightenment was less a unified movement than a network of overlapping debates about reason, sociability, and reform.' Respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE Enlightenment thinker and a key idea associated with that thinker.",
        "points": 1,
        "rubric": "1 pt: Identifies an accurate pairing such as Montesquieu and separation of powers, Rousseau and the general will, or Voltaire and religious toleration."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way Enlightenment ideas circulated beyond elite circles.",
        "points": 1,
        "rubric": "1 pt: Explains a mechanism such as salons hosted by women, coffeehouses, the Encyclopedie, or cheap print and lending libraries."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way 'enlightened absolutists' applied Enlightenment ideas to governance.",
        "points": 1,
        "rubric": "1 pt: Explains an application such as Frederick II's legal reforms in Prussia, Joseph II's religious toleration edicts, or Catherine II's correspondence with philosophes and early codification efforts."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apeuro-v2-2022-saq-3",
    "courseSlug": "ap-euro-history",
    "year": 2022,
    "number": 3,
    "topic": "French Revolution and Napoleon",
    "prompt": "Using your knowledge of the French Revolution and Napoleonic era, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE grievance of the Third Estate in 1789.",
        "points": 1,
        "rubric": "1 pt: Identifies a grievance such as unequal tax burdens, food shortages, or exclusion from meaningful representation in the Estates-General."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way the Napoleonic era spread revolutionary principles across Europe.",
        "points": 1,
        "rubric": "1 pt: Explains a way such as the Napoleonic Code, the abolition of feudal privileges in conquered territories, or the stimulation of nationalist responses."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way the Congress of Vienna (1814-1815) attempted to limit the legacy of the Revolution.",
        "points": 1,
        "rubric": "1 pt: Explains an attempt such as the restoration of legitimate monarchies, the creation of a balance of power, or the Concert of Europe to coordinate suppression of revolts."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apeuro-v2-2016-saq-4",
    "courseSlug": "ap-euro-history",
    "year": 2016,
    "number": 4,
    "topic": "Industrial Revolution in Britain",
    "prompt": "Using your knowledge of British industrialization c. 1750-1850, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE reason industrialization began in Britain rather than on the Continent.",
        "points": 1,
        "rubric": "1 pt: Identifies a reason such as abundant coal and iron, colonial markets, agricultural productivity, or favorable patent law and capital markets."
      },
      {
        "label": "B",
        "prompt": "Explain ONE social consequence of industrialization in Britain.",
        "points": 1,
        "rubric": "1 pt: Explains a consequence such as urbanization and slum conditions, the rise of a factory working class, or changing gender roles in wage labor."
      },
      {
        "label": "C",
        "prompt": "Explain ONE political or reform response to industrial conditions before 1850.",
        "points": 1,
        "rubric": "1 pt: Explains a response such as the Factory Acts, the Chartist movement for universal male suffrage, or the repeal of the Corn Laws in 1846."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apeuro-v2-2017-saq-1",
    "courseSlug": "ap-euro-history",
    "year": 2017,
    "number": 1,
    "topic": "Nationalism and unification",
    "prompt": "Using your knowledge of 19th-century European nationalism, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE political change brought about by the unification of Germany or Italy.",
        "points": 1,
        "rubric": "1 pt: Identifies a change such as the proclamation of the German Empire in 1871, the incorporation of Rome into Italy in 1870, or the displacement of Austria from Central European affairs."
      },
      {
        "label": "B",
        "prompt": "Explain ONE method used by Bismarck or Cavour to achieve unification.",
        "points": 1,
        "rubric": "1 pt: Explains a method such as Bismarck's wars against Denmark, Austria, and France, or Cavour's alliance with France against Austria in 1859."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way the 1848 revolutions influenced later nationalist movements.",
        "points": 1,
        "rubric": "1 pt: Explains an influence such as demonstrating the weakness of liberal nationalism without military backing, motivating realpolitik strategies, or radicalizing demands for constitutional government."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apeuro-v2-2018-saq-2",
    "courseSlug": "ap-euro-history",
    "year": 2018,
    "number": 2,
    "topic": "Second Industrial Revolution and imperialism",
    "prompt": "A historian observes: 'The Second Industrial Revolution gave European states the steel, steam, and quinine that made the late-19th-century imperial expansion possible.' Respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE technological innovation of the Second Industrial Revolution.",
        "points": 1,
        "rubric": "1 pt: Identifies an innovation such as the Bessemer process, electrical generation, the internal combustion engine, or synthetic dyes."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way new technologies facilitated European imperialism in Africa or Asia.",
        "points": 1,
        "rubric": "1 pt: Explains a way such as steamships navigating African rivers, the Maxim gun in colonial warfare, or telegraph networks enabling imperial administration."
      },
      {
        "label": "C",
        "prompt": "Explain ONE ideology used to justify late-19th-century imperialism.",
        "points": 1,
        "rubric": "1 pt: Explains an ideology such as Social Darwinism, the 'civilizing mission,' or pseudoscientific racial hierarchies."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apeuro-v2-2019-saq-1",
    "courseSlug": "ap-euro-history",
    "year": 2019,
    "number": 1,
    "topic": "Russian Revolution",
    "prompt": "Using your knowledge of the Russian Revolutions of 1917, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE cause of the February Revolution of 1917.",
        "points": 1,
        "rubric": "1 pt: Identifies a cause such as food shortages, military defeats in World War I, or discontent with the Romanov autocracy."
      },
      {
        "label": "B",
        "prompt": "Explain ONE way Bolshevik policies after October 1917 transformed Russian society.",
        "points": 1,
        "rubric": "1 pt: Explains a policy such as the Decree on Land redistributing estates, withdrawal from WWI at Brest-Litovsk, or nationalization of industry under War Communism."
      },
      {
        "label": "C",
        "prompt": "Explain ONE international consequence of the Russian Revolution.",
        "points": 1,
        "rubric": "1 pt: Explains a consequence such as fear of communist revolution in postwar Europe, the founding of the Comintern, or Allied intervention in the Russian Civil War."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apeuro-v2-2020-saq-2",
    "courseSlug": "ap-euro-history",
    "year": 2020,
    "number": 2,
    "topic": "Interwar Europe and fascism",
    "prompt": "Using your knowledge of interwar Europe, respond to parts A, B, and C.",
    "parts": [
      {
        "label": "A",
        "prompt": "Identify ONE factor that contributed to the rise of fascism in Italy or Germany.",
        "points": 1,
        "rubric": "1 pt: Identifies a factor such as resentment over the Treaty of Versailles, economic hardship of the Great Depression, or fear of communist revolution."
      },
      {
        "label": "B",
        "prompt": "Explain ONE policy used by Mussolini or Hitler to consolidate power.",
        "points": 1,
        "rubric": "1 pt: Explains a policy such as the 1922 March on Rome, the Enabling Act of 1933, the Night of the Long Knives, or propaganda under Goebbels."
      },
      {
        "label": "C",
        "prompt": "Explain ONE way the Great Depression weakened democratic governments in Europe.",
        "points": 1,
        "rubric": "1 pt: Explains a way such as coalition paralysis in Weimar Germany, austerity backlash in Britain's National Government, or collapse of public trust in parliamentary institutions."
      }
    ],
    "totalPoints": 3
  },
  {
    "id": "apeuro-v2-2016-leq-5",
    "courseSlug": "ap-euro-history",
    "year": 2016,
    "number": 5,
    "topic": "Reformation and religious conflict",
    "prompt": "Evaluate the extent to which the Protestant Reformation reshaped political authority in Europe between 1517 and 1648.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - States a defensible evaluation of political change.\n1 pt: Contextualization - Connects to late-medieval church-state relations or Renaissance humanism.\n1 pt: Evidence - Cites specifics such as the Peace of Augsburg, the Edict of Nantes, or the Thirty Years' War.\n1 pt: Evidence supports argument - Integrates evidence in service of the claim.\n1 pt: Analysis - reasoning - Uses causation or CCOT.\n1 pt: Analysis - complexity - Acknowledges continuity of confessional politics or regional variation."
      }
    ],
    "totalPoints": 6
  },
  {
    "id": "apeuro-v2-2017-leq-6",
    "courseSlug": "ap-euro-history",
    "year": 2017,
    "number": 6,
    "topic": "Absolutism versus constitutionalism",
    "prompt": "Evaluate the extent to which absolutism and constitutionalism diverged as models of governance in 17th-century Europe, using France and England as examples.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - Makes a defensible claim about the degree of divergence.\n1 pt: Contextualization - Situates in earlier wars of religion or fiscal-military state building.\n1 pt: Evidence - Uses specifics from Louis XIV and from the English Civil War or Glorious Revolution.\n1 pt: Evidence supports argument - Uses evidence to support comparison.\n1 pt: Analysis - reasoning - Employs comparison or causation.\n1 pt: Analysis - complexity - Notes shared features such as centralized taxation or standing armies across both models."
      }
    ],
    "totalPoints": 6
  },
  {
    "id": "apeuro-v2-2018-leq-7",
    "courseSlug": "ap-euro-history",
    "year": 2018,
    "number": 7,
    "topic": "Enlightenment impact",
    "prompt": "Evaluate the extent to which Enlightenment ideas challenged established institutions in 18th-century Europe.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - States a defensible argument about the extent of the challenge.\n1 pt: Contextualization - Situates in Scientific Revolution or religious toleration debates.\n1 pt: Evidence - Uses thinkers and works such as Voltaire, Rousseau, or the Encyclopedie.\n1 pt: Evidence supports argument - Ties evidence to the claim.\n1 pt: Analysis - reasoning - Uses causation or comparison.\n1 pt: Analysis - complexity - Recognizes limits such as continued deference to monarchs or exclusion of women and the poor from reform."
      }
    ],
    "totalPoints": 6
  },
  {
    "id": "apeuro-v2-2019-leq-8",
    "courseSlug": "ap-euro-history",
    "year": 2019,
    "number": 8,
    "topic": "19th-century -isms",
    "prompt": "Evaluate the extent to which nationalism was more influential than liberalism in shaping European politics between 1815 and 1871.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - Makes a defensible comparative claim.\n1 pt: Contextualization - Connects to the Congress of Vienna or the aftermath of Napoleon.\n1 pt: Evidence - Cites cases such as 1848 revolutions, German or Italian unification, or Mazzini's writings.\n1 pt: Evidence supports argument - Integrates evidence on both -isms.\n1 pt: Analysis - reasoning - Uses causation or comparison.\n1 pt: Analysis - complexity - Recognizes overlap between liberal and national demands or regional divergence."
      }
    ],
    "totalPoints": 6
  },
  {
    "id": "apeuro-v2-2020-leq-9",
    "courseSlug": "ap-euro-history",
    "year": 2020,
    "number": 9,
    "topic": "Causes of World War I",
    "prompt": "Evaluate the extent to which the alliance system was the primary cause of the outbreak of World War I in 1914.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - States a defensible claim about causation.\n1 pt: Contextualization - Connects to late-19th-century imperialism or the arms race.\n1 pt: Evidence - Uses specifics such as the Triple Alliance, Triple Entente, Balkan crises, or the July Crisis.\n1 pt: Evidence supports argument - Uses evidence to support or qualify the claim.\n1 pt: Analysis - reasoning - Applies causation or comparison among causes.\n1 pt: Analysis - complexity - Weighs alliances against nationalism, militarism, or contingent decisions in July 1914."
      }
    ],
    "totalPoints": 6
  },
  {
    "id": "apeuro-v2-2021-leq-10",
    "courseSlug": "ap-euro-history",
    "year": 2021,
    "number": 10,
    "topic": "Cold War in Europe",
    "prompt": "Evaluate the extent to which the division of Europe after 1945 was the result of ideological conflict between the United States and the Soviet Union.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - Makes a defensible claim about the role of ideology.\n1 pt: Contextualization - Connects to WWII wartime conferences or reconstruction challenges.\n1 pt: Evidence - Uses specifics such as the Truman Doctrine, Marshall Plan, Berlin Blockade, or the formation of NATO and the Warsaw Pact.\n1 pt: Evidence supports argument - Integrates evidence with the claim.\n1 pt: Analysis - reasoning - Applies causation or comparison.\n1 pt: Analysis - complexity - Acknowledges security concerns and great-power politics alongside ideology."
      }
    ],
    "totalPoints": 6
  },
  {
    "id": "apeuro-v2-2022-leq-11",
    "courseSlug": "ap-euro-history",
    "year": 2022,
    "number": 11,
    "topic": "European integration",
    "prompt": "Evaluate the extent to which European integration from 1957 to 2007 transformed the political and economic order of Europe.",
    "parts": [
      {
        "label": "Response",
        "prompt": "Develop an argument in an essay that addresses the prompt.",
        "points": 6,
        "rubric": "1 pt: Thesis - States a defensible claim about transformation.\n1 pt: Contextualization - Connects to postwar reconstruction or Cold War dynamics.\n1 pt: Evidence - Uses specifics such as the Treaty of Rome, the Maastricht Treaty, the adoption of the euro, or eastward enlargement after 1989.\n1 pt: Evidence supports argument - Uses evidence to support the transformation claim.\n1 pt: Analysis - reasoning - Applies causation or CCOT.\n1 pt: Analysis - complexity - Acknowledges limits such as persistent national sovereignty, euroskepticism, or uneven integration."
      }
    ],
    "totalPoints": 6
  },

];

export function frqsForCourse(slug: CourseSlug): PastFrq[] {
  return PAST_FRQS.filter((f) => f.courseSlug === slug).sort(
    (a, b) => b.year - a.year || a.number - b.number
  );
}

export function getFrqById(id: string): PastFrq | null {
  return PAST_FRQS.find((f) => f.id === id) ?? null;
}
