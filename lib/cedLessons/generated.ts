import type {
  CedFlashcard,
  CedLesson,
  CourseCedLessons,
} from "./types";
import { MATH_UNITS } from "../apUnits/math";
import { SCIENCE_UNITS } from "../apUnits/science";
import { CS_UNITS } from "../apUnits/cs";
import { HISTORY_UNITS } from "../apUnits/history";

type TopicLite = { id: string; title: string };
type UnitLite = { number: number; title: string; topics: TopicLite[] };
type Family = "math" | "science" | "cs" | "history";
type Discipline =
  | "precalc"
  | "calculus"
  | "statistics"
  | "physics"
  | "biology"
  | "chemistry"
  | "environmental"
  | "csa"
  | "csp"
  | "history";

type TopicContext = {
  courseSlug: string;
  courseTitle: string;
  family: Family;
  discipline: Discipline;
  unitNumber: number;
  unitTitle: string;
  topicId: string;
  topicTitle: string;
};

type Theme = {
  focus: string;
  representation: string;
  examMove: string;
  studyMove: string;
  formula?: string;
};

const ALL_UNITS: Record<string, UnitLite[]> = {
  ...MATH_UNITS,
  ...SCIENCE_UNITS,
  ...CS_UNITS,
  ...HISTORY_UNITS,
};

const COURSE_META: Record<
  string,
  { title: string; family: Family; discipline: Discipline }
> = {
  "ap-precalc": {
    title: "AP Precalculus",
    family: "math",
    discipline: "precalc",
  },
  "ap-calc-ab": {
    title: "AP Calculus AB",
    family: "math",
    discipline: "calculus",
  },
  "ap-calc-bc": {
    title: "AP Calculus BC",
    family: "math",
    discipline: "calculus",
  },
  "ap-statistics": {
    title: "AP Statistics",
    family: "math",
    discipline: "statistics",
  },
  "ap-physics-1": {
    title: "AP Physics 1",
    family: "science",
    discipline: "physics",
  },
  "ap-physics-2": {
    title: "AP Physics 2",
    family: "science",
    discipline: "physics",
  },
  "ap-physics-c-mech": {
    title: "AP Physics C: Mechanics",
    family: "science",
    discipline: "physics",
  },
  "ap-physics-c-em": {
    title: "AP Physics C: Electricity and Magnetism",
    family: "science",
    discipline: "physics",
  },
  "ap-biology": {
    title: "AP Biology",
    family: "science",
    discipline: "biology",
  },
  "ap-chemistry": {
    title: "AP Chemistry",
    family: "science",
    discipline: "chemistry",
  },
  "ap-environmental": {
    title: "AP Environmental Science",
    family: "science",
    discipline: "environmental",
  },
  "ap-cs-a": {
    title: "AP Computer Science A",
    family: "cs",
    discipline: "csa",
  },
  "ap-cs-principles": {
    title: "AP Computer Science Principles",
    family: "cs",
    discipline: "csp",
  },
  "ap-us-history": {
    title: "AP United States History",
    family: "history",
    discipline: "history",
  },
  "ap-world-history": {
    title: "AP World History: Modern",
    family: "history",
    discipline: "history",
  },
  "ap-euro-history": {
    title: "AP European History",
    family: "history",
    discipline: "history",
  },
};

const FAMILY_FRAMES: Record<
  Family,
  { exam: string; context: string; study: string }
> = {
  math: {
    exam:
      "Strong AP math work keeps symbolic steps tied to a graph, table, or context instead of treating the problem as pure algebra.",
    context:
      "If a domain restriction, theorem, or notation choice matters, say it explicitly rather than hoping the grader will infer it.",
    study:
      "Do short mixed sets, then explain why the representation you chose was the fastest or safest one.",
  },
  science: {
    exam:
      "Strong AP science work defines the system, identifies the variables that matter, and connects evidence or equations back to the model.",
    context:
      "If the prompt gives a graph, lab setup, or diagram, name what it is showing before you interpret it.",
    study:
      "Sketch the process, label the variables, and practice saying what assumption would break the model.",
  },
  cs: {
    exam:
      "Strong AP computer science work traces state carefully, names the purpose of each structure, and handles edge cases instead of memorizing isolated syntax.",
    context:
      "If code appears, slow down enough to track every assignment, method call, and branch that changes program state.",
    study:
      "Trace tiny examples by hand and narrate why the algorithm or abstraction works, not just what output it prints.",
  },
  history: {
    exam:
      "Strong AP history writing makes a claim, places it in context, and supports it with specific evidence tied to the historical thinking skill in the prompt.",
    context:
      "Avoid fact-dumping: every example should be connected to causation, comparison, continuity and change, or contextualization.",
    study:
      "Build short chains of background, development, and consequence so each topic becomes usable evidence instead of a loose fact.",
  },
};

const topicLessonCache = new Map<string, CedLesson>();
const courseLessonCache = new Map<string, CourseCedLessons>();

const TOPIC_INDEX = buildTopicIndex();

export function generateCedLesson(
  courseSlug: string,
  topicId: string
): CedLesson | undefined {
  const cacheKey = `${courseSlug}:${topicId}`;
  const cached = topicLessonCache.get(cacheKey);
  if (cached) return cached;

  const ctx = TOPIC_INDEX[courseSlug]?.[topicId];
  if (!ctx) return undefined;

  const theme = resolveTheme(ctx);
  const lesson: CedLesson = {
    id: ctx.topicId,
    title: ctx.topicTitle,
    summary: makeSummary(ctx, theme),
    lesson: makeLesson(ctx, theme),
    keyIdeas: makeKeyIdeas(ctx, theme),
    workedExample: makeWorkedExample(ctx, theme),
    flashcards: makeFlashcards(ctx, theme),
    commonMistakes: makeCommonMistakes(ctx, theme),
  };

  topicLessonCache.set(cacheKey, lesson);
  return lesson;
}

export function generateCourseCedLessons(
  courseSlug: string
): CourseCedLessons | undefined {
  const cached = courseLessonCache.get(courseSlug);
  if (cached) return cached;

  const topics = TOPIC_INDEX[courseSlug];
  if (!topics) return undefined;

  const generated: CourseCedLessons = {};
  for (const topicId of Object.keys(topics)) {
    const lesson = generateCedLesson(courseSlug, topicId);
    if (lesson) generated[topicId] = lesson;
  }

  courseLessonCache.set(courseSlug, generated);
  return generated;
}

function buildTopicIndex(): Record<string, Record<string, TopicContext>> {
  const index: Record<string, Record<string, TopicContext>> = {};

  for (const [courseSlug, units] of Object.entries(ALL_UNITS)) {
    const meta = COURSE_META[courseSlug];
    if (!meta) continue;

    index[courseSlug] = {};
    for (const unit of units) {
      for (const topic of unit.topics) {
        index[courseSlug][topic.id] = {
          courseSlug,
          courseTitle: meta.title,
          family: meta.family,
          discipline: meta.discipline,
          unitNumber: unit.number,
          unitTitle: unit.title,
          topicId: topic.id,
          topicTitle: topic.title,
        };
      }
    }
  }

  return index;
}

function resolveTheme(ctx: TopicContext): Theme {
  switch (ctx.discipline) {
    case "precalc":
      return getPrecalcTheme(ctx.topicTitle);
    case "calculus":
      return getCalculusTheme(ctx.topicTitle);
    case "statistics":
      return getStatisticsTheme(ctx.topicTitle);
    case "physics":
      return getPhysicsTheme(ctx.topicTitle);
    case "biology":
      return getBiologyTheme(ctx.topicTitle);
    case "chemistry":
      return getChemistryTheme(ctx.topicTitle);
    case "environmental":
      return getEnvironmentalTheme(ctx.topicTitle);
    case "csa":
      return getCsaTheme(ctx.topicTitle);
    case "csp":
      return getCspTheme(ctx.topicTitle);
    case "history":
      return getHistoryTheme(ctx.topicTitle);
    default:
      return {
        focus: "the central relationship, process, and vocabulary that define the topic",
        representation: "the main representation used in the course",
        examMove: "turn the representation into a clear explanation",
        studyMove:
          "practice the skill in short sets until you can explain the reasoning without notes",
      };
  }
}

function getPrecalcTheme(title: string): Theme {
  const t = title.toLowerCase();

  if (matches(t, ["polynomial", "rational", "zero", "asymptote", "hole", "end behavior"])) {
    return {
      focus:
        "describing how function structure controls zeros, asymptotes, end behavior, and the way algebraic and graphical features line up",
      representation:
        "factored forms, tables of change, graphs, and precise statements about domain and behavior",
      examMove:
        "justify the chosen function model and explain what each feature means in context instead of only listing intercepts or asymptotes",
      studyMove:
        "move back and forth between equation, graph, and verbal description until each representation predicts the others",
      formula: "\\(f(x)=a(x-r_1)(x-r_2)\\cdots\\)",
    };
  }

  if (matches(t, ["exponential", "logarithm", "inverse", "composition", "semi-log"])) {
    return {
      focus:
        "tracking multiplicative change, inverse relationships, and how exponential and logarithmic models behave in real situations",
      representation:
        "tables of ratios, transformed equations, inverse-function notation, and graphs with asymptotic behavior",
      examMove:
        "say whether the situation is additive or multiplicative, then defend the model with rates, ratios, or inverse reasoning",
      studyMove:
        "compare linear and exponential growth on the same inputs and explain why inverse functions undo one another",
      formula: "\\(y=a\\cdot b^x\\) and \\(\\log_b(x)\\)",
    };
  }

  if (matches(t, ["sine", "cosine", "tangent", "trigon", "polar", "sinusoidal"])) {
    return {
      focus:
        "connecting angle, periodic behavior, and circular motion to graphs, identities, and models for repeating phenomena",
      representation:
        "unit-circle values, transformed trig graphs, equations, and polar or angular descriptions",
      examMove:
        "identify amplitude, period, phase, or angle structure before solving so the trig work stays attached to the phenomenon",
      studyMove:
        "sketch one cycle, label the anchor points, and narrate what each parameter changes",
      formula: "\\(y=a\\sin(bx-c)+d\\)",
    };
  }

  if (matches(t, ["parametric", "vector", "matrix", "implicit", "conic"])) {
    return {
      focus:
        "describing relationships that need more than one equation or more than one coordinate system to make the structure visible",
      representation:
        "parametric equations, vector notation, matrices, and geometric interpretations of the same relationship",
      examMove:
        "explain what each parameter or component controls and how the representation simplifies the geometry or motion",
      studyMove:
        "translate the same object among coordinate, parametric, and matrix forms until the connections feel automatic",
    };
  }

  return {
    focus:
      "using multiple function representations to explain how quantities change together and which model fits the situation best",
    representation:
      "graphs, tables, equations, and carefully worded statements about rate and structure",
    examMove:
      "choose the representation that reveals the relationship most clearly and justify why it fits the situation",
    studyMove:
      "practice identifying the function family before doing any algebra so your method matches the structure",
  };
}

function getCalculusTheme(title: string): Theme {
  const t = title.toLowerCase();

  if (matches(t, ["limit", "continuity", "asymptote", "discontinu"])) {
    return {
      focus:
        "describing what a function is doing as the input approaches a value and deciding whether the function behaves continuously there",
      representation:
        "graphs, tables, algebraic simplification, and formal limit notation",
      examMove:
        "justify the limiting behavior from the representation instead of treating the answer as a guess from the graph",
      studyMove:
        "solve the same limit numerically, graphically, and algebraically until the three views feel like one idea",
      formula: "\\(\\lim_{x\\to a} f(x)=L\\)",
    };
  }

  if (matches(t, ["derivative", "differentiat", "rate", "motion", "l'hôpital"])) {
    return {
      focus:
        "interpreting instantaneous change and using derivatives as local linear models for how a quantity is moving or changing",
      representation:
        "difference quotients, derivative notation, tangent lines, and graphs of a function alongside its derivative",
      examMove:
        "state what the derivative means in the problem, then compute or estimate it with notation that keeps units and signs visible",
      studyMove:
        "trace how a positive, negative, or zero derivative changes the graph and the story being modeled",
      formula: "\\(f'(x)=\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}\\)",
    };
  }

  if (matches(t, ["mean value", "extrema", "critical", "concavity", "optimization", "graphing", "candidate"])) {
    return {
      focus:
        "using derivatives to explain behavior over an interval, locate important points, and justify why a quantity is increasing, decreasing, or optimized",
      representation:
        "sign charts, derivative tests, endpoint checks, and annotated graphs of the original function",
      examMove:
        "show the chain of reasoning from derivative evidence to a conclusion about behavior rather than jumping straight to the final point",
      studyMove:
        "build sign charts by hand and say what each interval tells you about the original function",
    };
  }

  if (matches(t, ["integral", "riemann", "accumulation", "antiderivative", "area", "volume", "substitution"])) {
    return {
      focus:
        "treating integration as accumulation of change and linking area, antiderivatives, and net change into one coherent idea",
      representation:
        "Riemann sums, integral notation, area diagrams, accumulation functions, and antiderivative rules",
      examMove:
        "say what is being accumulated, whether the result is net or total, and why the chosen integral setup matches the question",
      studyMove:
        "draw the accumulation picture before integrating so you know what the answer should mean and what sign it should have",
      formula: "\\(\\int_a^b f(x)\\,dx\\)",
    };
  }

  if (matches(t, ["differential equation", "slope field", "separation"])) {
    return {
      focus:
        "using a rate law to describe how a quantity changes over time and recovering the family of functions consistent with that law",
      representation:
        "differential equations, slope fields, families of solution curves, and initial conditions",
      examMove:
        "connect the derivative statement to the behavior of the solution instead of treating the equation and graph as separate topics",
      studyMove:
        "read the slope field first, then solve symbolically and compare the algebraic answer to the field",
    };
  }

  if (matches(t, ["series", "sequence", "polar", "parametric", "vector-valued", "euler"])) {
    return {
      focus:
        "organizing more advanced representations of change, including sequences, series, or curves described in non-rectangular ways",
      representation:
        "partial sums, convergence language, parametric equations, polar forms, and carefully chosen notation",
      examMove:
        "state the condition or test that applies before computing so the method is justified by structure",
      studyMove:
        "name the representation first, then list the small set of questions that always go with it",
    };
  }

  return {
    focus:
      "connecting rates, accumulation, and functional behavior so each derivative or integral fact belongs to a larger model of change",
    representation:
      "equations, graphs, numerical evidence, and concise AP calculus notation",
    examMove:
      "link the symbolic work to what the quantity is doing, not just to an algebraic answer",
    studyMove:
      "practice translating between a graph, a function, and a verbal interpretation of change",
    formula: "\\(\\frac{dy}{dx}\\) and \\(\\int f(x)\\,dx\\)",
  };
}

function getStatisticsTheme(title: string): Theme {
  const t = title.toLowerCase();

  if (matches(t, ["distribution", "dotplot", "histogram", "boxplot", "scatterplot", "residual", "regression", "correlation"])) {
    return {
      focus:
        "describing what the data look like, what relationship is present, and whether a model captures the pattern without hiding important deviations",
      representation:
        "plots, summary statistics, regression output, and residual reasoning",
      examMove:
        "describe the shape, center, spread, and unusual features before making a claim about association or fit",
      studyMove:
        "look at the graph before touching a calculator so the numerical summary never replaces the visual pattern",
    };
  }

  if (matches(t, ["sample", "sampling", "experiment", "bias", "randomized", "study design"])) {
    return {
      focus:
        "deciding how data are collected and whether the design supports a trustworthy estimate or causal claim",
      representation:
        "sampling plans, treatment structures, randomization language, and clear statements about bias or confounding",
      examMove:
        "separate what the design can estimate from what it cannot justify, especially when causation is tempting",
      studyMove:
        "classify each scenario by sampling method or experimental design before discussing inference",
    };
  }

  if (matches(t, ["probability", "random variable", "binomial", "geometric"])) {
    return {
      focus:
        "modeling chance with conditions that tell you when a probability rule or named distribution is actually appropriate",
      representation:
        "probability notation, distribution conditions, expected value, and context-based interpretation",
      examMove:
        "state the conditions first, then compute, and finish by explaining what the probability says in words",
      studyMove:
        "sort problems by what is random, what is fixed, and whether the conditions for the model are met",
      formula: "\\(P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}\\)",
    };
  }

  if (matches(t, ["sampling distribution", "central limit", "standard error"])) {
    return {
      focus:
        "understanding how a statistic varies from sample to sample and why repeated sampling creates a predictable distribution",
      representation:
        "sampling-distribution language, standard error, and comparisons between population parameters and sample statistics",
      examMove:
        "distinguish the distribution of the data from the distribution of the statistic before you describe center or spread",
      studyMove:
        "say aloud what is being repeatedly sampled and what statistic is being tracked each time",
    };
  }

  if (matches(t, ["confidence", "significance", "test", "interval", "p-value", "chi-square", "inference"])) {
    return {
      focus:
        "using sample evidence to estimate a population value or test a claim while keeping conditions, variability, and interpretation in view",
      representation:
        "hypotheses, confidence intervals, test statistics, p-values, and context-rich conclusions",
      examMove:
        "write the full chain of inference: conditions, calculation, and conclusion in plain language about the population",
      studyMove:
        "practice matching each scenario to the right inference procedure before you ever compute a statistic",
    };
  }

  return {
    focus:
      "describing data, modeling randomness, and using evidence from samples to support a conclusion about a larger population or process",
    representation:
      "graphs, probability language, and clearly labeled statistical statements",
    examMove:
      "keep the context attached to every number so your statistical conclusion answers the question being asked",
    studyMove:
      "classify the statistical task first: explore, collect, model chance, or infer",
  };
}

function getPhysicsTheme(title: string): Theme {
  const t = title.toLowerCase();

  if (matches(t, ["position", "displacement", "velocity", "acceleration", "kinematic", "motion", "reference frame", "projectile"])) {
    return {
      focus:
        "describing motion with position, velocity, and acceleration and choosing the representation that makes the change easiest to read",
      representation:
        "motion graphs, vector components, sign conventions, and kinematic relationships",
      examMove:
        "decide what each graph or component means before plugging into an equation, especially when direction changes matter",
      studyMove:
        "translate the same motion among words, graphs, and equations until the signs and slopes feel automatic",
      formula: "\\(v=\\frac{dx}{dt}\\) and \\(a=\\frac{dv}{dt}\\)",
    };
  }

  if (matches(t, ["force", "newton", "friction", "spring", "gravitational", "center of mass", "free-body", "circular motion", "equilibrium", "resistive"])) {
    return {
      focus:
        "treating interactions as forces on a clearly defined system and using those forces to explain translational or rotational motion",
      representation:
        "free-body diagrams, system definitions, component equations, and Newton's laws",
      examMove:
        "define the system and draw the force picture first so the equation you write actually matches the physical situation",
      studyMove:
        "redraw the free-body diagram from memory and narrate which interaction each arrow represents",
      formula: "\\(\\sum F = ma\\)",
    };
  }

  if (matches(t, ["energy", "work", "power", "potential", "kinetic"])) {
    return {
      focus:
        "tracking how energy is stored, transferred, or transformed so the physical story stays organized even when the motion changes",
      representation:
        "energy bar charts, system boundaries, work-energy language, and equations for kinetic or potential energy",
      examMove:
        "say which energy terms belong in the system before calculating, then explain the sign and meaning of the transfer",
      studyMove:
        "start every problem by listing the initial and final energy stores before touching the algebra",
      formula: "\\(K=\\tfrac12 mv^2\\)",
    };
  }

  if (matches(t, ["momentum", "impulse", "collision"])) {
    return {
      focus:
        "using momentum as a bookkeeping tool for interactions that happen quickly or in systems where internal forces dominate",
      representation:
        "before-and-after system tables, vector momentum statements, and impulse relationships",
      examMove:
        "separate the system from the environment so you know whether momentum is conserved and in which direction",
      studyMove:
        "write the momentum statement in words before symbols so the conservation idea stays visible",
      formula: "\\(\\vec p = m\\vec v\\)",
    };
  }

  if (matches(t, ["torque", "rotational", "angular", "rolling", "orbit", "satellite"])) {
    return {
      focus:
        "connecting rotational motion to the same conservation and dynamics ideas you already know from translation",
      representation:
        "angular quantities, torque diagrams, moment arms, and side-by-side linear versus rotational analogies",
      examMove:
        "choose the pivot or axis carefully and explain why that choice simplifies the torque or angular-momentum calculation",
      studyMove:
        "pair every linear quantity with its rotational partner until the analogies become automatic",
      formula: "\\(\\tau = rF\\sin\\theta\\)",
    };
  }

  if (matches(t, ["oscillation", "harmonic", "wave", "sound", "optic", "interference", "doppler", "light", "electromagnetic waves"])) {
    return {
      focus:
        "describing repeated motion or wave behavior through amplitude, frequency, phase, superposition, and the medium or field carrying the disturbance",
      representation:
        "wave diagrams, sinusoidal graphs, resonance conditions, and qualitative descriptions of interference",
      examMove:
        "say what is oscillating and which quantity the graph is actually plotting before you interpret the pattern",
      studyMove:
        "sketch one full cycle and label the anchor points that define period, wavelength, and phase",
      formula: "\\(v=f\\lambda\\)",
    };
  }

  if (matches(t, ["fluid", "pressure", "density", "thermodynamic", "ideal gas", "heat", "entropy", "thermal"])) {
    return {
      focus:
        "using macroscopic variables to explain how matter in bulk behaves, whether as a fluid or as a thermal system exchanging energy",
      representation:
        "state variables, energy-transfer statements, pressure relationships, and system diagrams",
      examMove:
        "name the system and the process before you calculate so the sign conventions and assumptions stay consistent",
      studyMove:
        "track what is held fixed and what is changing in each process or fluid situation",
      formula: "\\(PV=nRT\\)",
    };
  }

  if (matches(t, ["electric", "charge", "field", "potential", "circuit", "resist", "kirchhoff", "capacit", "dielectric", "conduct"])) {
    return {
      focus:
        "treating electric behavior as a field-and-energy story, whether you are analyzing charge distributions or current in a circuit",
      representation:
        "field diagrams, potential ideas, circuit schematics, and conservation statements for charge and energy",
      examMove:
        "decide whether the problem is best seen as a force, field, potential, or circuit-conservation question before choosing equations",
      studyMove:
        "redraw the field or circuit from memory and annotate the direction of force, current, and potential change",
      formula: "\\(V=IR\\)",
    };
  }

  if (matches(t, ["magnetic", "flux", "induction"])) {
    return {
      focus:
        "linking magnetic fields, moving charges, and changing flux so you can explain both magnetic forces and induced effects",
      representation:
        "right-hand rules, field sketches, flux ideas, and sign conventions for induced current or emf",
      examMove:
        "state the direction logic explicitly so the sign of the magnetic or induced effect is justified instead of guessed",
      studyMove:
        "practice direction questions separately from magnitude questions until both become stable",
      formula: "\\(\\Phi_B=\\int \\vec B\\cdot d\\vec A\\)",
    };
  }

  if (matches(t, ["radioactive", "nuclear", "photoelectric", "wave functions", "probability", "modern"])) {
    return {
      focus:
        "using probabilistic and quantized models to explain behavior that classical pictures cannot capture on their own",
      representation:
        "energy-level ideas, decay language, wave-particle reasoning, and probability-based interpretation",
      examMove:
        "say what classical intuition would predict, then explain why the modern model gives a better account of the evidence",
      studyMove:
        "pair each phenomenon with the experimental observation that forced the new model into place",
      formula: "\\(E=mc^2\\)",
    };
  }

  return {
    focus:
      "building a compact physical model of the system and using it to predict or explain what the variables do",
    representation:
      "system diagrams, equations with units, and clear qualitative descriptions of the interaction",
    examMove:
      "identify the governing model before calculating so the math never outruns the physics",
    studyMove:
      "say aloud what is interacting, what is changing, and what is conserved",
    formula: "\\(\\text{model} + \\text{representation} + \\text{interpretation}\\)",
  };
}

function getBiologyTheme(title: string): Theme {
  const t = title.toLowerCase();

  if (matches(t, ["water", "macromolecule", "chemistry", "carbon", "molecular diversity"])) {
    return {
      focus:
        "using chemical structure to explain biological function, especially why polarity, bonding, and molecular shape matter in living systems",
      representation:
        "structure-function language, molecular diagrams, and comparisons among major biological molecules",
      examMove:
        "connect the molecule's structure to a biological consequence instead of listing properties in isolation",
      studyMove:
        "ask what feature of the molecule makes the process possible and what would change if that feature changed",
    };
  }

  if (matches(t, ["cell", "membrane", "transport", "surface area", "organelle"])) {
    return {
      focus:
        "explaining how cell structures and membranes control exchange, compartmentalization, and the scale limits on cellular life",
      representation:
        "cell diagrams, concentration-gradient reasoning, and structure-function comparisons",
      examMove:
        "name the membrane or organelle feature that makes the process work, then connect it to the direction of movement or function",
      studyMove:
        "redraw the cell or membrane and annotate what crosses, what is blocked, and why",
    };
  }

  if (matches(t, ["photosynthesis", "cellular respiration", "enzyme", "metabolism", "energetics"])) {
    return {
      focus:
        "tracking how biological systems capture, transform, and regulate energy through linked reactions and enzyme-controlled pathways",
      representation:
        "inputs and outputs, coupled-process diagrams, and data about rates or environmental effects",
      examMove:
        "identify what is being converted, where it happens, and what variable would change the rate or yield",
      studyMove:
        "practice telling the story of the pathway from reactants to products without looking at the chart",
    };
  }

  if (matches(t, ["signal", "communication", "cell cycle", "mitosis", "meiosis"])) {
    return {
      focus:
        "showing how cells receive information, regulate checkpoints, and divide in ways that preserve or reshuffle genetic information",
      representation:
        "pathway maps, stage-by-stage cell-cycle descriptions, and observations about what happens when control fails",
      examMove:
        "track the sequence of events and say where regulation or variation enters the process",
      studyMove:
        "make a short timeline of the stages and the biological purpose of each one",
    };
  }

  if (matches(t, ["inherit", "heredity", "chromosome", "trait", "probability"])) {
    return {
      focus:
        "connecting chromosome behavior and probability reasoning to patterns of inheritance across generations",
      representation:
        "family data, probability statements, and links between meiosis and observable traits",
      examMove:
        "separate genotype, phenotype, and inheritance mechanism so the prediction matches the biology",
      studyMove:
        "work small inheritance cases and explain the chromosome event behind each probability result",
    };
  }

  if (matches(t, ["gene", "dna", "rna", "transcription", "translation", "regulation", "mutation", "biotechnology"])) {
    return {
      focus:
        "showing how genetic information is stored, expressed, regulated, and sometimes altered, along with the consequences of those changes",
      representation:
        "central-dogma diagrams, regulatory logic, and evidence from mutations or biotechnology tools",
      examMove:
        "name which level is changing, DNA, RNA, protein, or phenotype, and trace the effect through the pathway",
      studyMove:
        "turn each gene-expression question into a sequence of steps from information to product to phenotype",
    };
  }

  if (matches(t, ["natural selection", "evolution", "phylogeny", "adapt", "population genetics"])) {
    return {
      focus:
        "explaining how variation, selection, and heredity change populations over time and how evidence supports evolutionary relationships",
      representation:
        "population-level reasoning, evidence categories, and comparisons among lineages or environments",
      examMove:
        "keep the unit of evolution at the population level and tie every adaptive claim back to heritable variation and differential success",
      studyMove:
        "ask what the source of variation is, what the selective pressure is, and what evidence shows the change",
    };
  }

  if (matches(t, ["ecology", "population", "community", "ecosystem", "biogeochemical", "biodiversity", "environment"])) {
    return {
      focus:
        "following interactions among organisms and environments, including energy flow, cycling of matter, and population-level responses",
      representation:
        "food-web thinking, ecological data, and clear links between environmental change and biological response",
      examMove:
        "say what level of organization is being analyzed and which interaction drives the observed change",
      studyMove:
        "draw the system and label the feedbacks, transfers, or tradeoffs before answering the question",
    };
  }

  return {
    focus:
      "connecting biological structure, process, and evidence so the topic explains how living systems maintain, reproduce, or change",
    representation:
      "structure-function reasoning, process diagrams, and experimental evidence",
    examMove:
      "turn vocabulary into mechanism by explaining how the observed feature causes the biological outcome",
    studyMove:
      "practice claim, evidence, and reasoning so each concept is tied to what the data show",
  };
}

function getChemistryTheme(title: string): Theme {
  const t = title.toLowerCase();

  if (matches(t, ["atomic", "electron", "periodic", "photoelectron", "mass spectroscopy", "mole"])) {
    return {
      focus:
        "using atomic structure and periodic trends to explain why substances behave differently at the particle level",
      representation:
        "electron configurations, periodic reasoning, symbolic notation, and particulate models",
      examMove:
        "justify the trend or property from structure rather than quoting the periodic table as if it were a memorized list",
      studyMove:
        "explain each trend in terms of charge, distance, and energy instead of memorizing the direction alone",
    };
  }

  if (matches(t, ["bond", "molecular", "ionic", "lewis", "vsepr", "hybrid", "intermolecular"])) {
    return {
      focus:
        "linking bonding and molecular structure to the properties that emerge from particle arrangement and interaction strength",
      representation:
        "Lewis structures, geometry, polarity, and comparisons of intramolecular versus intermolecular interactions",
      examMove:
        "state the structure first, then use that structure to explain the observed property or trend",
      studyMove:
        "draw the structure and ask what feature controls shape, polarity, or attraction",
    };
  }

  if (matches(t, ["gas", "solution", "phase", "solid", "liquid", "property"])) {
    return {
      focus:
        "explaining bulk properties as consequences of particle motion, spacing, and interactions in different states or mixtures",
      representation:
        "particle-level models, proportional reasoning, and comparisons among states or solution behaviors",
      examMove:
        "translate the macroscopic observation into a particulate explanation before solving numerically",
      studyMove:
        "pair each observed property with the particle model that makes it inevitable",
      formula: "\\(PV=nRT\\)",
    };
  }

  if (matches(t, ["reaction", "stoichi", "titration", "net ionic", "redox"])) {
    return {
      focus:
        "tracking matter through chemical change so balanced equations, mole relationships, and observable evidence all tell the same story",
      representation:
        "balanced equations, particle conservation, mole ratios, and laboratory evidence",
      examMove:
        "balance and interpret the chemistry before doing the arithmetic so the ratio you use has a chemical reason behind it",
      studyMove:
        "rewrite every calculation question as a reaction story: what starts, what changes, and what limits the process",
    };
  }

  if (matches(t, ["kinetic", "rate", "mechanism", "catalyst"])) {
    return {
      focus:
        "explaining reaction rate through collision frequency, energy barriers, and the step-by-step mechanism behind the overall change",
      representation:
        "rate laws, particle collisions, energy profiles, and evidence that supports a mechanism",
      examMove:
        "separate what the data prove from what the mechanism suggests, especially when interpreting rate experiments",
      studyMove:
        "connect every rate change to one of three levers: collisions, energy, or pathway",
    };
  }

  if (matches(t, ["enthalpy", "thermo", "entropy", "gibbs", "heat", "calorimetry"])) {
    return {
      focus:
        "using energy and spontaneity ideas to explain why reactions transfer heat, become favorable, or require outside input",
      representation:
        "energy diagrams, calorimetry setups, and relationships among enthalpy, entropy, and free energy",
      examMove:
        "keep sign conventions visible and explain what the sign says physically, not just numerically",
      studyMove:
        "label system versus surroundings and predict the sign before calculating",
      formula: "\\(\\Delta G = \\Delta H - T\\Delta S\\)",
    };
  }

  if (matches(t, ["equilibrium", "le chatelier", "k", "acid", "base", "ph", "buffer", "solubility"])) {
    return {
      focus:
        "treating chemical systems as dynamic processes whose position and composition depend on competing forward and reverse behavior",
      representation:
        "equilibrium expressions, acid-base models, particulate reasoning, and disturbance-response explanations",
      examMove:
        "separate the direction of shift from the new value of quantities so the verbal reasoning matches the chemistry",
      studyMove:
        "practice saying what changes, what stays fixed, and why the system responds the way it does",
      formula: "\\(K=\\frac{[\\text{products}]^{\\nu}}{[\\text{reactants}]^{\\nu}}\\)",
    };
  }

  return {
    focus:
      "connecting symbolic chemistry to particle-level reasoning so every observation or calculation has a structural explanation behind it",
    representation:
      "balanced equations, particle models, and concise quantitative relationships",
    examMove:
      "show the chemistry that justifies the math rather than treating the procedure as a calculator exercise",
    studyMove:
      "say what the particles are doing before you move to symbols and numbers",
  };
}

function getEnvironmentalTheme(title: string): Theme {
  const t = title.toLowerCase();

  if (matches(t, ["ecosystem", "productivity", "food web", "biogeochemical", "living world"])) {
    return {
      focus:
        "seeing environmental systems as networks of energy flow and matter cycling, with feedbacks that determine stability and change",
      representation:
        "system diagrams, ecological data, and links among producers, consumers, nutrients, and abiotic factors",
      examMove:
        "identify the system boundary and the key transfer or feedback before explaining what changed",
      studyMove:
        "draw the cycle or food-web pathway and label the places where matter or energy enters, leaves, or is stored",
    };
  }

  if (matches(t, ["biodiversity", "species", "island biogeography", "ecological tolerance"])) {
    return {
      focus:
        "explaining why biodiversity varies across habitats and why that diversity matters for resilience, services, and conservation decisions",
      representation:
        "comparative data, habitat variables, and cause-effect reasoning about disturbance and recovery",
      examMove:
        "distinguish a pattern in biodiversity from the mechanism causing it, then tie the pattern to ecological consequences",
      studyMove:
        "link each biodiversity change to habitat size, fragmentation, niche conditions, or disturbance",
    };
  }

  if (matches(t, ["population", "migration", "demography"])) {
    return {
      focus:
        "tracking how populations grow, decline, and redistribute in response to resources, policy, technology, and environmental limits",
      representation:
        "growth models, demographic data, and evidence about carrying capacity or human impact",
      examMove:
        "say which factor is limiting the population and whether the pattern is short-term fluctuation or long-run trend",
      studyMove:
        "compare exponential and logistic stories until you can explain what changes the shape of the curve",
    };
  }

  if (matches(t, ["earth system", "soil", "water", "resource", "geology"])) {
    return {
      focus:
        "connecting Earth's physical systems to the resources humans use and the constraints those systems impose",
      representation:
        "cycle diagrams, resource maps, and process explanations that tie geology, hydrology, and climate together",
      examMove:
        "explain the underlying Earth-system process before you evaluate the human consequence or policy response",
      studyMove:
        "trace the resource from formation or storage to extraction, use, and environmental consequence",
    };
  }

  if (matches(t, ["land", "agriculture", "forest", "fish", "water use"])) {
    return {
      focus:
        "evaluating how humans use land and water, what tradeoffs that use creates, and which management choices reduce the damage",
      representation:
        "resource-use data, environmental tradeoffs, and comparisons of management strategies",
      examMove:
        "name both the benefit and the environmental cost, then explain which mechanism links the two",
      studyMove:
        "study each land or water practice as a chain of inputs, outputs, and unintended consequences",
    };
  }

  if (matches(t, ["energy", "fossil", "renewable", "consumption"])) {
    return {
      focus:
        "comparing energy sources by availability, efficiency, externalities, and the infrastructure needed to use them at scale",
      representation:
        "life-cycle tradeoffs, energy-flow language, and comparisons of reliability, emissions, and land use",
      examMove:
        "evaluate the source on more than one dimension instead of reducing the answer to 'good' or 'bad'",
      studyMove:
        "build a quick comparison chart for each source: extraction, conversion, waste, and tradeoffs",
    };
  }

  if (matches(t, ["pollution", "atmospheric", "aquatic", "terrestrial", "waste"])) {
    return {
      focus:
        "tracking pollutants from source to pathway to effect so you can explain why some pollutants accumulate, spread, or cause disproportionate damage",
      representation:
        "source-pathway-receptor reasoning, environmental chemistry, and data on health or ecosystem impacts",
      examMove:
        "say where the pollutant comes from, how it moves, and what mechanism creates the harm",
      studyMove:
        "turn each pollution case into a three-step story: release, transport, effect",
    };
  }

  if (matches(t, ["climate", "global change", "ozone"])) {
    return {
      focus:
        "explaining long-term global environmental change through energy balance, atmospheric chemistry, and human forcing",
      representation:
        "trend data, feedback loops, and comparisons among mitigation and adaptation strategies",
      examMove:
        "separate evidence of change from the mechanism driving it, then evaluate the response in terms of tradeoffs",
      studyMove:
        "practice linking each trend to a driver, a feedback, and a realistic response option",
    };
  }

  return {
    focus:
      "treating environmental issues as coupled natural and human systems with measurable tradeoffs, feedbacks, and policy choices",
    representation:
      "system diagrams, data trends, and cause-and-effect reasoning",
    examMove:
      "show the pathway from cause to environmental effect to human response instead of naming the issue only",
    studyMove:
      "use short system maps so each topic has a cause, mechanism, and consequence",
  };
}

function getCsaTheme(title: string): Theme {
  const t = title.toLowerCase();

  if (matches(t, ["primitive", "variable", "expression", "assignment", "casting"])) {
    return {
      focus:
        "tracking how Java stores simple values and how expressions change program state through assignment, promotion, and type rules",
      representation:
        "variable tables, expression evaluation, and small code traces that show the value after each line",
      examMove:
        "trace the state one line at a time so precedence, casting, and reassignment do not turn into careless errors",
      studyMove:
        "work code by hand and record the value of every variable after each statement",
    };
  }

  if (matches(t, ["object", "string", "method", "math class", "wrapper"])) {
    return {
      focus:
        "using objects as bundles of data and behavior, with method calls that either change state or return information",
      representation:
        "object references, method signatures, string behavior, and examples that distinguish mutating from non-mutating calls",
      examMove:
        "keep track of which object a reference points to and whether the method call returns a value or changes the object",
      studyMove:
        "trace one object through several method calls and narrate what changed and what stayed the same",
    };
  }

  if (matches(t, ["boolean", "if", "else", "control flow", "comparing objects"])) {
    return {
      focus:
        "using conditions to control flow, compare values correctly, and choose the branch that matches the program state",
      representation:
        "truth conditions, branch diagrams, and code traces that show why a condition evaluates the way it does",
      examMove:
        "evaluate the boolean expression first, then follow the branch structure exactly as written",
      studyMove:
        "rewrite complex conditions in plain English before tracing the branch logic",
    };
  }

  if (matches(t, ["loop", "iteration", "nested", "algorithm"])) {
    return {
      focus:
        "using repetition to build algorithms, update state predictably, and stop at the correct time without off-by-one errors",
      representation:
        "loop headers, invariants, tables of changing variables, and simple hand traces through the iterations",
      examMove:
        "identify the loop's purpose, stopping condition, and state update before you decide whether it is correct",
      studyMove:
        "trace the first few iterations by hand and predict what pattern the state changes are creating",
    };
  }

  if (matches(t, ["class", "constructor", "accessor", "mutator", "static", "scope", "this"])) {
    return {
      focus:
        "designing classes so data, constructors, methods, and scope rules work together to model an object cleanly",
      representation:
        "class diagrams, field versus parameter distinctions, and small examples that separate instance behavior from class behavior",
      examMove:
        "say which variable belongs to the object, the method, or the class so scope mistakes do not leak into the code",
      studyMove:
        "read the class like a contract: what state exists, how it is created, and which methods expose or change it",
    };
  }

  if (matches(t, ["arraylist", "array", "2d array", "search", "sort"])) {
    return {
      focus:
        "managing indexed collections, traversing them correctly, and building algorithms that inspect or modify many elements",
      representation:
        "index diagrams, traversal patterns, and hand traces that show which elements are visited and changed",
      examMove:
        "track the index bounds and element access carefully so the logic stays aligned with the data structure",
      studyMove:
        "draw the collection and label the current index, target element, and effect of each update",
    };
  }

  if (matches(t, ["inherit", "super", "polymorphism", "override", "object superclass"])) {
    return {
      focus:
        "organizing related classes so shared behavior lives in a superclass and specialized behavior is provided by subclasses",
      representation:
        "class hierarchies, constructor chains, and examples that show compile-time reference type versus runtime behavior",
      examMove:
        "separate what the reference can access from which overridden method actually runs",
      studyMove:
        "trace the inheritance chain and say what is inherited, what is overridden, and why polymorphism still works",
    };
  }

  if (matches(t, ["recursion"])) {
    return {
      focus:
        "solving a problem by expressing it in terms of smaller versions of itself, with a base case that stops the process cleanly",
      representation:
        "call-stack thinking, smaller subproblems, and comparisons between recursive and iterative structure",
      examMove:
        "identify the base case and the recursive step before tracing return values, or the logic will collapse quickly",
      studyMove:
        "expand a few recursive calls by hand so you can see both the descent and the unwinding",
    };
  }

  return {
    focus:
      "reasoning about Java code as a sequence of state changes, decisions, and abstractions that should remain readable and testable",
    representation:
      "small code traces, state tables, and clear explanations of what each part of the program is responsible for",
    examMove:
      "trace the code deliberately and explain the role of each construct instead of pattern-matching on syntax",
    studyMove:
      "run tiny examples by hand until the program state feels visible",
  };
}

function getCspTheme(title: string): Theme {
  const t = title.toLowerCase();

  if (matches(t, ["collaboration", "purpose", "design", "development", "error"])) {
    return {
      focus:
        "treating computing as an iterative design process in which people define problems, build programs, test them, and improve them together",
      representation:
        "design artifacts, debugging steps, purpose statements, and reflections on how collaboration improves a product",
      examMove:
        "explain the design choice or debugging step in terms of the program's purpose and the user's need",
      studyMove:
        "practice describing what the program should do before you describe how the code accomplishes it",
    };
  }

  if (matches(t, ["binary", "data", "compression", "information"])) {
    return {
      focus:
        "understanding how computers represent information and why encoding or compression choices create tradeoffs in size, speed, and fidelity",
      representation:
        "binary encodings, data transformations, and explanations of what is preserved or lost",
      examMove:
        "state what the data represent in the real world before you discuss how the computer stores or compresses them",
      studyMove:
        "convert a few examples by hand and explain what changed in the representation and what did not",
    };
  }

  if (matches(t, ["algorithm", "programming", "variable", "list", "procedure", "library", "random", "simulation", "efficiency", "undecidable", "conditionals", "iteration", "string", "mathematical"])) {
    return {
      focus:
        "building algorithms that use sequencing, selection, iteration, abstraction, and data structures to solve problems reliably",
      representation:
        "pseudocode, variable-state tracing, procedure calls, and explanations of how abstraction simplifies the solution",
      examMove:
        "trace the algorithm step by step and explain why the abstraction or control structure is necessary",
      studyMove:
        "work tiny inputs by hand and narrate how the state changes after each line or block",
    };
  }

  if (matches(t, ["internet", "fault tolerance", "distributed", "parallel", "network"])) {
    return {
      focus:
        "seeing the internet and modern computing systems as layered networks that move data reliably by distributing work and tolerating failure",
      representation:
        "network diagrams, packets, protocols, redundancy ideas, and comparisons of centralized versus distributed behavior",
      examMove:
        "explain what problem the network design choice solves rather than listing vocabulary without purpose",
      studyMove:
        "tell the story of a message moving across a network and note where reliability is added",
    };
  }

  if (matches(t, ["impact", "bias", "ethical", "legal", "safe", "crowdsourcing", "digital divide", "beneficial", "harmful"])) {
    return {
      focus:
        "evaluating computing as a human system that creates opportunities, harms, and tradeoffs depending on who builds it and who is affected by it",
      representation:
        "case studies, stakeholder analysis, and clear claims about equity, privacy, safety, or bias",
      examMove:
        "identify the stakeholder and the mechanism of impact so the response is analytical rather than opinion-only",
      studyMove:
        "practice making a balanced claim with one benefit, one harm, and one reason the impact is unevenly distributed",
    };
  }

  return {
    focus:
      "connecting the creative, technical, and social sides of computing so programs and systems are understood in context",
    representation:
      "pseudocode, data representations, network models, and stakeholder-centered reasoning",
    examMove:
      "tie the computing concept to its purpose and real-world consequence instead of leaving it abstract",
    studyMove:
      "explain each concept as if you were teaching it to a non-programmer",
  };
}

function getHistoryTheme(title: string): Theme {
  const t = title.toLowerCase();

  if (matches(t, ["contextualizing"])) {
    return {
      focus:
        "placing the topic inside the larger regional or period background so later developments make sense instead of looking isolated",
      representation:
        "period context, surrounding developments, and a clear sense of what conditions were already in place",
      examMove:
        "name the background conditions first, then show how the specific topic grows out of that setting",
      studyMove:
        "build a short before-during-after timeline so the context never floats away from the event",
    };
  }

  if (matches(t, ["comparison"])) {
    return {
      focus:
        "explaining similarities and differences in a way that shows why the comparison matters, not just how two cases look on a list",
      representation:
        "parallel examples, paired evidence, and a clear comparison criterion such as power, economy, culture, or social order",
      examMove:
        "keep the categories of comparison steady so each piece of evidence answers the same comparison question",
      studyMove:
        "build two-column comparisons and write one sentence explaining the significance of each similarity or difference",
    };
  }

  if (matches(t, ["causation", "cause", "effect"])) {
    return {
      focus:
        "showing how conditions, choices, and pressures produced a development and how that development shaped what came next",
      representation:
        "cause-effect chains, short timelines, and evidence that distinguishes long-term causes from immediate triggers",
      examMove:
        "separate background causes, catalysts, and consequences so the timeline does not collapse into one blob of facts",
      studyMove:
        "practice turning the topic into a chain of one because statement and one therefore statement",
    };
  }

  if (matches(t, ["continuity", "change"])) {
    return {
      focus:
        "identifying what actually changed, what persisted, and why both parts matter for understanding the period",
      representation:
        "before-and-after snapshots, turning points, and evidence that tracks persistence alongside transformation",
      examMove:
        "show both sides of the story; AP history rewards recognizing continuity even inside dramatic change",
      studyMove:
        "write one sentence that starts with 'changed because' and one that starts with 'continued because'",
    };
  }

  if (matches(t, ["enlightenment", "renaissance", "reformation", "scientific", "belief", "culture", "identity", "philosophical", "religious"])) {
    return {
      focus:
        "explaining how ideas, beliefs, and cultural forms reshape institutions, identities, and the way people justify power or challenge it",
      representation:
        "major thinkers or texts, cultural evidence, and links between intellectual change and political or social consequences",
      examMove:
        "connect the idea or belief system to a concrete historical consequence instead of treating it as a floating set of principles",
      studyMove:
        "pair each intellectual or cultural development with the institution or social pattern it challenged, supported, or transformed",
    };
  }

  if (matches(t, ["empire", "state", "colon", "power", "administration", "politics", "constitutional", "absolutism"])) {
    return {
      focus:
        "explaining how states build, organize, justify, and contest power across different societies and periods",
      representation:
        "governance structures, political ideology, state-society relationships, and evidence about who benefited or resisted",
      examMove:
        "identify the mechanism of power, military, legal, ideological, or economic, before describing the result",
      studyMove:
        "ask how rulers governed, how subjects responded, and what changed because of that arrangement",
    };
  }

  if (matches(t, ["trade", "exchange", "migration", "connectivity", "roads", "ocean", "diaspora"])) {
    return {
      focus:
        "tracking how movement of goods, people, and ideas reshaped societies economically, culturally, and politically",
      representation:
        "trade routes, migration patterns, diffusion, and cause-effect chains linking contact to consequence",
      examMove:
        "show both the connection itself and the consequence it created instead of stopping at the route or movement",
      studyMove:
        "link each exchange or migration to at least one economic effect and one cultural or political effect",
    };
  }

  if (matches(t, ["revolution", "reform", "nationalism", "awakening", "rights", "movement"])) {
    return {
      focus:
        "showing how ideas, grievances, and collective action can challenge existing institutions and create new political or social possibilities",
      representation:
        "ideological claims, key actors, mass participation, and immediate versus long-term outcomes",
      examMove:
        "state what the movement was reacting against and what concrete change it sought or achieved",
      studyMove:
        "pair each reform or revolution with its ideas, its social base, and its most important consequence",
    };
  }

  if (matches(t, ["industrial", "economy", "labor", "capital", "technology"])) {
    return {
      focus:
        "explaining how economic and technological change reorganizes labor, class, production, and state priorities",
      representation:
        "economic trends, labor systems, social effects, and comparisons of industrial and preindustrial patterns",
      examMove:
        "move beyond inventions to explain how production or social relationships actually changed",
      studyMove:
        "trace the topic through production, labor, social effect, and political response",
    };
  }

  if (matches(t, ["war", "conflict", "diplomacy", "imperial", "cold war", "decolonization"])) {
    return {
      focus:
        "analyzing conflict as a mix of ideology, state interest, technology, and social mobilization, plus the settlements that follow",
      representation:
        "alliances, goals, wartime shifts, and post-conflict consequences for states and societies",
      examMove:
        "keep military events tied to their political aims and long-term consequences instead of narrating battles alone",
      studyMove:
        "study conflict as a sequence of causes, strategy, home-front change, and settlement",
    };
  }

  return {
    focus:
      "turning historical content into usable argument by linking context, evidence, and one of the core historical reasoning skills",
    representation:
      "claims, precise evidence, and clear connections among causes, developments, and consequences",
    examMove:
      "make the argument first, then choose the evidence that proves it for the period being studied",
    studyMove:
      "attach each topic to one reasoning skill so the facts are ready for essays as well as multiple-choice questions",
  };
}

function makeSummary(ctx: TopicContext, theme: Theme): string {
  return `${ctx.topicTitle} is about ${theme.focus}. In ${ctx.unitTitle}, use ${theme.representation} so you can ${theme.examMove}.`;
}

function makeLesson(ctx: TopicContext, theme: Theme): string {
  const frame = FAMILY_FRAMES[ctx.family];
  const formulaLine = theme.formula
    ? ` A useful anchor for this topic is ${theme.formula}, but the formula only helps when you already know what the quantities mean.`
    : "";

  return `${ctx.topicTitle} sits inside ${ctx.courseTitle} Unit ${ctx.unitNumber}: ${ctx.unitTitle}. The core job here is ${theme.focus}. Start by identifying the quantities, actors, structures, or conditions that define the topic before you rush into computation or recall. Then move through ${theme.representation} so the idea stays visible from more than one angle.${formulaLine}

On the AP exam, ${theme.examMove}. ${frame.exam} ${frame.context} That is why this topic matters beyond memorization: it teaches you what kind of explanation the course considers convincing, not just what vocabulary belongs on the page.

Study this topic by ${theme.studyMove}. ${frame.study} After each practice problem, code trace, document set, or reading check, add one plain-English sentence that explains what the answer means. That final sentence is usually the difference between recognition and mastery, because it proves you understand how ${ctx.topicTitle} fits into the larger logic of ${ctx.unitTitle}.`;
}

function makeKeyIdeas(ctx: TopicContext, theme: Theme): string[] {
  const ideas = [
    `${ctx.topicTitle} centers on ${theme.focus}.`,
    `Work through ${theme.representation} so the same idea is visible in more than one form.`,
    `On AP-style questions, ${theme.examMove}.`,
    `Keep this topic tied to ${ctx.unitTitle}; the unit gives the topic its meaning and its usual exam purpose.`,
  ];

  if (theme.formula) {
    ideas.splice(1, 0, `A useful anchor is ${theme.formula}.`);
  }

  return ideas.slice(0, 4);
}

function makeWorkedExample(
  ctx: TopicContext,
  theme: Theme
): { prompt: string; solution: string } {
  switch (ctx.family) {
    case "math":
      return {
        prompt: `A student reaches an answer in ${ctx.topicTitle}, but they cannot explain why their method was appropriate. What should they identify first, and what would a strong AP-style explanation include?`,
        solution: `Start by naming ${theme.focus}. Then point to ${theme.representation}. A strong response would ${theme.examMove}, and it would end with a sentence explaining what the result means in the setting of ${ctx.unitTitle}.`,
      };
    case "science":
      return {
        prompt: `A student is stuck on an AP question about ${ctx.topicTitle}. Before calculating or making a claim, what should they set up first?`,
        solution: `They should identify the system or process, decide which variables and assumptions matter, and translate the situation through ${theme.representation}. From there, a strong AP response would ${theme.examMove} and connect the conclusion back to the model used in ${ctx.unitTitle}.`,
      };
    case "cs":
      return {
        prompt: `A student reads a code segment tied to ${ctx.topicTitle} and immediately guesses the output. What is the better approach?`,
        solution: `Slow down and trace the program state through ${theme.representation}. A strong AP response would ${theme.examMove}. That means naming the purpose of each structure, following the updates in order, and checking whether the logic still works at the edges.`,
      };
    case "history":
      return {
        prompt: `Write a one-sentence AP history claim for ${ctx.topicTitle} that would actually score better than a fact list.`,
        solution: `A stronger claim starts with context, then makes an argument about significance. For example: "${ctx.topicTitle} mattered because it reveals ${theme.focus}; historians can see that by tracking ${theme.representation}." After the claim, the student should ${theme.examMove} with specific evidence from the period.`,
      };
    default:
      return {
        prompt: `What is the first move in ${ctx.topicTitle}?`,
        solution: `Begin with ${theme.focus}, then use ${theme.representation} so you can ${theme.examMove}.`,
      };
  }
}

function makeFlashcards(ctx: TopicContext, theme: Theme): CedFlashcard[] {
  switch (ctx.family) {
    case "math":
      return [
        {
          q: `What is the core question in ${ctx.topicTitle}?`,
          a: theme.focus,
        },
        {
          q: `Which representations should agree in ${ctx.topicTitle}?`,
          a: theme.representation,
        },
        {
          q: `What does a strong AP response do in ${ctx.topicTitle}?`,
          a: capitalize(theme.examMove) + ".",
        },
      ];
    case "science":
      return [
        {
          q: `What system or process is the topic ${ctx.topicTitle} trying to explain?`,
          a: theme.focus,
        },
        {
          q: `What model or representation should you lean on first?`,
          a: theme.representation,
        },
        {
          q: `What exam move matters most on ${ctx.topicTitle}?`,
          a: capitalize(theme.examMove) + ".",
        },
      ];
    case "cs":
      return [
        {
          q: `What is the main programming idea behind ${ctx.topicTitle}?`,
          a: theme.focus,
        },
        {
          q: `How should you represent or trace ${ctx.topicTitle}?`,
          a: theme.representation,
        },
        {
          q: `What separates a strong AP CS explanation from a weak one here?`,
          a: capitalize(theme.examMove) + ".",
        },
      ];
    case "history":
      return [
        {
          q: `What historical skill does ${ctx.topicTitle} train?`,
          a: theme.focus,
        },
        {
          q: `What kind of evidence or framing should you use?`,
          a: theme.representation,
        },
        {
          q: `What should an AP history answer do with that evidence?`,
          a: capitalize(theme.examMove) + ".",
        },
      ];
    default:
      return [
        { q: `What is ${ctx.topicTitle} really about?`, a: theme.focus },
        { q: `How do you represent ${ctx.topicTitle}?`, a: theme.representation },
        { q: `What exam move matters here?`, a: theme.examMove },
      ];
  }
}

function makeCommonMistakes(ctx: TopicContext, theme: Theme): string[] {
  switch (ctx.family) {
    case "math":
      return [
        "Starting calculations before checking the conditions, restrictions, or notation that make the method valid.",
        `Using one representation from ${ctx.topicTitle} in isolation instead of cross-checking it with ${theme.representation}.`,
        `Stopping after the number or expression without explaining what it says about the function, model, or context in ${ctx.unitTitle}.`,
      ];
    case "science":
      return [
        `Treating ${ctx.topicTitle} as a vocabulary list instead of a system or process that has to be modeled.`,
        "Writing an equation or evidence claim without defining the variables, directions, assumptions, or biological/physical meaning.",
        `Ignoring the setup and jumping to a conclusion before translating the situation through ${theme.representation}.`,
      ];
    case "cs":
      return [
        "Guessing the output from intuition instead of tracing the state line by line.",
        "Memorizing syntax fragments without explaining the role of the variable, method, or structure in the algorithm.",
        `Forgetting to check edge cases, loop bounds, or object state when working through ${ctx.topicTitle}.`,
      ];
    case "history":
      return [
        `Listing facts about ${ctx.topicTitle} without making a defensible historical claim.`,
        "Dropping evidence into an answer without explaining why it proves causation, comparison, contextualization, or change over time.",
        `Mixing periods, actors, or regions because the context for ${ctx.unitTitle} was never stated clearly.`,
      ];
    default:
      return [
        `Treating ${ctx.topicTitle} as memorization instead of reasoning.`,
        "Skipping the representation that makes the topic understandable.",
        "Ending with an answer but not an explanation.",
      ];
  }
}

function matches(text: string, patterns: string[]): boolean {
  return patterns.some((pattern) => text.includes(pattern));
}

function capitalize(value: string): string {
  return value.length === 0 ? value : value[0].toUpperCase() + value.slice(1);
}
