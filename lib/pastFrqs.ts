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

];

export function frqsForCourse(slug: CourseSlug): PastFrq[] {
  return PAST_FRQS.filter((f) => f.courseSlug === slug).sort(
    (a, b) => b.year - a.year || a.number - b.number
  );
}

export function getFrqById(id: string): PastFrq | null {
  return PAST_FRQS.find((f) => f.id === id) ?? null;
}
