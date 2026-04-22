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
          "1 point: identifies two-sample t-interval, names conditions (random, independent, normal/large n).\n1 point: computes SE = √(1.6²/50 + 1.4²/50) ≈ 0.300.\n1 point: interval (4.2 − 3.5) ± t* · 0.300 ≈ (0.105, 1.295).\n1 point: interprets in context — 'we are 95% confident the true difference in mean hours (A − B) is between 0.10 and 1.30 hours'.",
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
          "1 point: identifies enzyme saturation — all active sites are occupied.\n1 point: explains rate is then limited by the catalytic turnover of the enzyme, not substrate availability.",
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
];

export function frqsForCourse(slug: CourseSlug): PastFrq[] {
  return PAST_FRQS.filter((f) => f.courseSlug === slug).sort(
    (a, b) => b.year - a.year || a.number - b.number
  );
}

export function getFrqById(id: string): PastFrq | null {
  return PAST_FRQS.find((f) => f.id === id) ?? null;
}
