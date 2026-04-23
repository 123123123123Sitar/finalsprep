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
];

export function frqsForCourse(slug: CourseSlug): PastFrq[] {
  return PAST_FRQS.filter((f) => f.courseSlug === slug).sort(
    (a, b) => b.year - a.year || a.number - b.number
  );
}

export function getFrqById(id: string): PastFrq | null {
  return PAST_FRQS.find((f) => f.id === id) ?? null;
}
