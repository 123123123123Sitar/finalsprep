/**
 * AP Computer Science Principles — full CED bundle.
 *
 * Self-contained module powering the Finals Prep study surface for AP CSP.
 * Each topic ships with a detailed written explanation, CSP-style pseudocode
 * interactives (consumed by the embedded pseudocode runner / trace widgets),
 * flashcards, and practice problems aligned to the College Board CED
 * (Big Ideas CRD, DAT, AAP, CSN, IOC).
 *
 * Because AP CSP is broader than AP CSA, interactives cover both programming
 * (pseudocode runners, trace tables, list visualizers) and non-programming
 * concepts (binary converters, data compression comparisons, packet-routing
 * simulations, cybersecurity decision trees, ethics case studies).
 *
 * Consumers:
 *  - <StudyTopic />      → topic.explanation, keyIdeas, commonMistakes.
 *  - <CspInteractive />  → renders each interactive based on `kind`.
 *  - <Flashcards />      → topic.flashcards.
 *  - <PracticeSet />     → topic.practiceProblems.
 */

export type CspBigIdea = "CRD" | "DAT" | "AAP" | "CSN" | "IOC";

export type CspFlashcard = {
  front: string;
  back: string;
};

/**
 * Discriminated by `kind`. The study surface routes each kind to the right
 * widget. All kinds are safe to fall back to a text-only card that shows
 * `description`, `scenario`, and `answer` if a widget is unavailable.
 */
export type CspInteractive =
  | CspPseudocodeInteractive
  | CspTraceInteractive
  | CspBinaryInteractive
  | CspCompressionInteractive
  | CspListInteractive
  | CspBooleanInteractive
  | CspNetworkInteractive
  | CspEncodingInteractive
  | CspProcedureInteractive
  | CspSimulationInteractive
  | CspEthicsInteractive
  | CspEfficiencyInteractive;

type CspInteractiveBase = {
  id: string;
  title: string;
  description: string;
  hints?: string[];
};

/** Runs CSP-style pseudocode with optional expected stdout. */
export type CspPseudocodeInteractive = CspInteractiveBase & {
  kind: "pseudocode";
  /** AP CSP reference-sheet style pseudocode. */
  pseudocode: string;
  expectedOutput?: string;
  variations?: { prompt: string; hint: string }[];
};

/** Step-by-step trace of variable state after each line. */
export type CspTraceInteractive = CspInteractiveBase & {
  kind: "trace";
  pseudocode: string;
  /** Each row: snapshot of named variables after executing the given line. */
  trace: { line: number; vars: Record<string, string | number | boolean | string> }[];
  finalOutput?: string;
};

/** Convert between decimal, binary, and hexadecimal. Also overflow demo. */
export type CspBinaryInteractive = CspInteractiveBase & {
  kind: "binary";
  /** Starting decimal value. Student edits to explore conversions. */
  initialDecimal: number;
  /** Fixed bit width — helps demonstrate overflow. */
  bits: number;
  showHex?: boolean;
  overflowDemo?: boolean;
};

/** Compare lossy vs lossless compression of the same input. */
export type CspCompressionInteractive = CspInteractiveBase & {
  kind: "compression";
  original: string;
  lossless: { result: string; bytesSaved: number; note: string };
  lossy: { result: string; bytesSaved: number; note: string };
};

/** Visualize list operations (APPEND, INSERT, REMOVE, access by 1-indexed slot). */
export type CspListInteractive = CspInteractiveBase & {
  kind: "list";
  initial: (string | number)[];
  /** Ordered sequence of operations to play through. */
  ops: {
    op: "APPEND" | "INSERT" | "REMOVE" | "SET" | "ACCESS";
    index?: number;
    value?: string | number;
    note: string;
  }[];
};

/** Interactive truth-table builder for AND / OR / NOT expressions. */
export type CspBooleanInteractive = CspInteractiveBase & {
  kind: "boolean";
  /** Boolean expression using AND / OR / NOT and variable names. */
  expression: string;
  variables: string[];
  /** Rows: values for each variable + result. */
  truthTable: Record<string, boolean>[];
};

/** Packet routing / fault-tolerance simulation over a small network graph. */
export type CspNetworkInteractive = CspInteractiveBase & {
  kind: "network";
  nodes: string[];
  edges: { from: string; to: string }[];
  /** Ordered scenarios: sender → receiver with an optional downed edge. */
  scenarios: {
    from: string;
    to: string;
    downed?: { from: string; to: string };
    expectedPath: string[];
    note: string;
  }[];
};

/** Encode text / images as a sequence of bits. Demonstrates abstraction. */
export type CspEncodingInteractive = CspInteractiveBase & {
  kind: "encoding";
  /** What is being encoded — "text" | "image" | "color". */
  target: "text" | "image" | "color";
  /** Ordered mapping rows the student can inspect. */
  rows: { symbol: string; bits: string; note?: string }[];
  sampleInput?: string;
  sampleOutput?: string;
};

/** Define a procedure; exercise parameter passing + return. */
export type CspProcedureInteractive = CspInteractiveBase & {
  kind: "procedure";
  pseudocode: string;
  /** Sample calls to showcase abstraction + reuse. */
  calls: { call: string; returns: string; note: string }[];
};

/** Run a CSP simulation (coin flips, random walks, weather). */
export type CspSimulationInteractive = CspInteractiveBase & {
  kind: "simulation";
  pseudocode: string;
  /** Parameters the learner can tune (trials, probability, etc.). */
  parameters: { name: string; defaultValue: number; min: number; max: number }[];
  /** A precomputed run so non-stochastic UIs can still visualize it. */
  sampleRun: { trial: number; result: string }[];
};

/** Multiple-choice ethics / impact scenario with reasoning. */
export type CspEthicsInteractive = CspInteractiveBase & {
  kind: "ethics";
  scenario: string;
  choices: { label: string; text: string; correct: boolean; reasoning: string }[];
};

/** Compare algorithmic efficiency visually — reasonable vs unreasonable time. */
export type CspEfficiencyInteractive = CspInteractiveBase & {
  kind: "efficiency";
  /** Rows: algorithm name + growth class + ops for n = 10 / 100 / 1000.
   *  ops* accept string to express astronomical growth (e.g. "~10³⁰"). */
  rows: {
    label: string;
    growth: "constant" | "log" | "linear" | "n log n" | "quadratic" | "exponential";
    ops10: number | string;
    ops100: number | string;
    ops1000: number | string;
    note: string;
  }[];
};

export type CspPracticeProblem = {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  /** May contain fenced pseudocode or a small scenario. */
  prompt: string;
  /** Multiple-choice when present; free-response when absent. */
  choices?: string[];
  answer: string;
  explanation: string;
};

export type CspTopic = {
  id: string;
  title: string;
  bigIdea: CspBigIdea;
  summary: string;
  /** 300-600 word walkthrough — plain text, rendered verbatim. */
  explanation: string;
  keyIdeas: string[];
  commonMistakes: string[];
  interactives: CspInteractive[];
  flashcards: CspFlashcard[];
  practiceProblems: CspPracticeProblem[];
};

export type CspUnit = {
  number: number;
  title: string;
  bigIdea: CspBigIdea;
  examWeight: string;
  overview: string;
  topics: CspTopic[];
};

export type ApComputerSciencePrinciplesCourse = {
  id: "ap-cs-principles";
  title: string;
  description: string;
  /** AP CSP pseudocode is reference-sheet based, not a specific language. */
  language: "pseudocode";
  units: CspUnit[];
};

export const AP_COMPUTER_SCIENCE_PRINCIPLES: ApComputerSciencePrinciplesCourse = {
  id: "ap-cs-principles",
  title: "AP Computer Science Principles",
  description:
    "Full Finals Prep bundle for AP Computer Science Principles — covers every CED topic across the five Big Ideas with CSP-style pseudocode, data / binary / network interactives, ethics case studies, flashcards, and practice problems aligned to College Board expectations.",
  language: "pseudocode",
  units: [],
};

// =============================================================================
// UNIT 1 — CREATIVE DEVELOPMENT (10–13% of exam, Big Idea CRD)
// =============================================================================
AP_COMPUTER_SCIENCE_PRINCIPLES.units.push({
  number: 1,
  title: "Creative Development",
  bigIdea: "CRD",
  examWeight: "10–13% of exam",
  overview:
    "Unit 1 frames the whole course: computing innovations are designed on purpose, with a target audience and a problem in mind. Programmers collaborate, iterate, test, and document. Expect exam questions on the program design process, pair programming benefits, types of errors, and what makes a good test case. Code-trace questions in this unit are short — the goal is to recognize when a program is broken and how to fix it, not to write new algorithms.",
  topics: [
    {
      id: "1.1",
      title: "Collaboration",
      bigIdea: "CRD",
      summary:
        "Collaboration combines diverse skills and perspectives and leads to programs that are easier to read, debug, and extend than solo work.",
      explanation:
        "Collaboration is an explicit AP CSP learning objective, not a soft skill. A collaborative team brings together programmers with different expertise (UI, data, algorithms), different backgrounds, and different perspectives. Diversity matters on the exam: programs written by homogeneous teams are more likely to miss the needs of users who do not look or live like the developers, and that gap is exactly what produces harmful bias (a topic that returns in Unit 5).\n\nPair programming is the canonical structured form. One person drives — types the code — while the other navigates — watches for errors, questions the approach, and reads the spec. The two swap roles regularly. This is not slower in practice, because the real cost of software is debugging, not typing, and a second pair of eyes catches problems before they land. Version control tools (Git is the standard example) let collaborators work on separate copies, merge changes, and roll back to a working state after a mistake.\n\nEffective teams communicate through three channels: code comments (what and why), documentation (how to use the program), and meetings or issue trackers (what to do next). The exam will reward answers that describe concrete collaboration practices — pair programming, peer review, version control, shared documentation — over vague ones like \"we talked a lot.\"",
      keyIdeas: [
        "Diverse teams produce programs that serve a wider audience and contain fewer blind-spot bugs.",
        "Pair programming: one driver, one navigator; roles rotate regularly.",
        "Version control (e.g. Git) lets teammates merge work and revert mistakes.",
        "Good collaboration is visible in code comments, documentation, and issue trackers.",
      ],
      commonMistakes: [
        "Claiming collaboration \"slows teams down\" — AP CSP treats pair programming as a net positive.",
        "Confusing collaboration with delegation: true collaboration involves shared ownership of the same code.",
        "Forgetting that diverse perspectives reduce bias — this reappears in Unit 5.",
      ],
      interactives: [
        {
          id: "1.1.a",
          kind: "ethics",
          title: "Choose a collaboration response",
          description:
            "A peer on your team keeps committing large changes without review and features are breaking. Pick the response most aligned with AP CSP's collaboration expectations.",
          scenario:
            "You are the navigator on a three-person CSP create-performance-task team. Your driver just pushed a 400-line change at 2am that broke three features. The submission is due in two days.",
          choices: [
            {
              label: "A",
              text: "Revert the entire change and exclude them from the rest of the project.",
              correct: false,
              reasoning:
                "Reverting without discussion breaks the collaborative relationship and does not teach the teammate anything. Reverts should be paired with a conversation.",
            },
            {
              label: "B",
              text: "Revert locally, schedule a pair-programming session to re-add the working pieces together, and add a team rule that large changes require review.",
              correct: true,
              reasoning:
                "This restores a working state, re-engages the teammate, and sets a durable process (review). That matches CSP's definition of a productive collaborative team.",
            },
            {
              label: "C",
              text: "Leave the broken code in place and hope nobody grades that section.",
              correct: false,
              reasoning:
                "Graders absolutely run the code. Ignoring bugs defeats the purpose of testing and fails the Create performance task requirements.",
            },
            {
              label: "D",
              text: "Rewrite everything yourself so nothing is broken.",
              correct: false,
              reasoning:
                "Doing the teammate's work alone is not collaboration — it also violates the Create task rules about team contribution.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Define pair programming.", back: "One driver types while one navigator reviews and directs; roles swap regularly." },
        { front: "Why does team diversity matter in CSP?", back: "Diverse perspectives catch bias and surface needs of users the designers do not share." },
        { front: "Role of version control?", back: "Tracks changes, enables merging teammates' work, and allows rollback to a known-good state." },
      ],
      practiceProblems: [
        {
          id: "1.1.p1",
          difficulty: "easy",
          prompt: "Which best describes the navigator role in pair programming?",
          choices: [
            "Types the code while the driver watches silently.",
            "Reviews decisions, spots errors, and suggests direction while the driver types.",
            "Writes the final documentation only.",
            "Is the team lead who assigns tasks.",
          ],
          answer:
            "Reviews decisions, spots errors, and suggests direction while the driver types.",
          explanation:
            "The driver types; the navigator watches for errors and thinks one step ahead about design and testing. Roles should rotate regularly.",
        },
        {
          id: "1.1.p2",
          difficulty: "medium",
          prompt:
            "A team building a health app is made entirely of people in their 20s. Which CSP collaboration concern most directly applies?",
          choices: [
            "The team cannot use version control.",
            "The program may not meet the needs of users outside the team's experience (e.g., older users), producing bias.",
            "Pair programming cannot work with same-aged programmers.",
            "The program will not compile.",
          ],
          answer:
            "The program may not meet the needs of users outside the team's experience (e.g., older users), producing bias.",
          explanation:
            "Homogeneous teams tend to build for themselves. Without deliberate testing with a broader audience, the product can embed assumptions that exclude real users — the definition of computing bias.",
        },
      ],
    },
    {
      id: "1.2",
      title: "Program Function and Purpose",
      bigIdea: "CRD",
      summary:
        "Every program has a purpose, a user, inputs, outputs, and a user interface — and those decisions come before code is written.",
      explanation:
        "Before writing code, CSP asks you to write a program purpose: a one-sentence description of what the program is for and who will use it. From the purpose you derive inputs (what the user or another system provides), outputs (what the program produces), and the behavior that transforms one into the other. Inputs can be typed text, mouse clicks, sensor readings, or data from a file; outputs can be text, graphics, sound, or a new file.\n\nA program has a user interface (UI). In CSP the UI can be as simple as a command-line prompt or as rich as a mobile app. What matters is that the exam asks you to identify what the user sees, what the user does, and what the program does in response. The event-driven programming model — \"when button pressed, do X\" — is how most real UIs are structured, and CSP pseudocode supports it through calls to procedures that are invoked when events happen.\n\nA good purpose statement is concrete: \"Help a high school student decide what to pack based on the forecast\" is testable. \"Do weather things\" is not. The exam often gives you a program and asks you to match its features to its purpose, or to predict what input an innovation requires. Practice reading a purpose statement and listing the minimum set of inputs the program needs.",
      keyIdeas: [
        "Purpose: one sentence saying who the program serves and what problem it solves.",
        "Inputs come from users, sensors, or files; outputs are text, graphics, sound, or files.",
        "User interfaces can be CLI, GUI, voice, or event-driven; CSP treats them uniformly.",
        "Event-driven programs run procedures when specific events happen (clicks, key presses, timers).",
      ],
      commonMistakes: [
        "Describing what the program does in code without naming its user or purpose.",
        "Listing outputs as \"the user types\" — that is an input.",
        "Assuming a GUI is required — a CLI program still has inputs, outputs, and a UI.",
      ],
      interactives: [
        {
          id: "1.2.a",
          kind: "pseudocode",
          title: "Identify inputs, outputs, and purpose",
          description:
            "Run this simple packing-list helper. Before running, predict what the inputs and outputs are. After running, write a one-sentence purpose statement.",
          pseudocode:
            "forecastHigh ← INPUT()\nforecastLow  ← INPUT()\nwillRain     ← INPUT()\n\nIF (forecastHigh ≥ 75)\n{\n    DISPLAY(\"Pack shorts.\")\n}\nELSE\n{\n    DISPLAY(\"Pack pants.\")\n}\n\nIF (forecastLow < 55)\n{\n    DISPLAY(\"Pack a jacket.\")\n}\n\nIF (willRain = \"yes\")\n{\n    DISPLAY(\"Pack an umbrella.\")\n}",
          expectedOutput: "(depends on inputs — e.g. 82, 60, \"no\" → \"Pack shorts.\")",
          variations: [
            {
              prompt: "What are the program's three inputs?",
              hint: "Look for INPUT() calls — each one is a distinct input.",
            },
            {
              prompt: "What is the program's purpose in one sentence?",
              hint: "Name the user (e.g. a student) and the problem (what to pack).",
            },
            {
              prompt: "Add a fourth input for windSpeed and DISPLAY \"Pack a hat\" when it is above 20.",
              hint: "Mirror the existing IF pattern with a new INPUT() and comparison.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "What belongs in a program purpose?", back: "The user the program serves and the problem it solves — one sentence." },
        { front: "Give three examples of inputs.", back: "Keyboard text, mouse click, sensor reading, or data read from a file." },
        { front: "What is event-driven programming?", back: "A style where procedures run in response to user events (clicks, key presses, timers) rather than top-to-bottom." },
      ],
      practiceProblems: [
        {
          id: "1.2.p1",
          difficulty: "easy",
          prompt:
            "A jogging app reads GPS coordinates once per second and shows your speed. Which is the input and which is the output?",
          choices: [
            "Input: speed on screen. Output: GPS coordinates.",
            "Input: GPS coordinates. Output: speed on screen.",
            "Both are inputs.",
            "Both are outputs.",
          ],
          answer: "Input: GPS coordinates. Output: speed on screen.",
          explanation:
            "Inputs enter the program from outside (the GPS sensor). Outputs are what the program presents to the user (speed).",
        },
        {
          id: "1.2.p2",
          difficulty: "medium",
          prompt:
            "Which program purpose is written in the style AP CSP expects?",
          choices: [
            "Cool weather thing.",
            "Do some stuff with data.",
            "Help a gardener decide whether to water based on today's rainfall.",
            "Use Python.",
          ],
          answer:
            "Help a gardener decide whether to water based on today's rainfall.",
          explanation:
            "The purpose names the user (gardener), the decision (water or not), and the input (rainfall). The other options name neither audience nor problem.",
        },
      ],
    },
    {
      id: "1.3",
      title: "Program Design and Development",
      bigIdea: "CRD",
      summary:
        "CSP treats development as an iterative cycle: investigate, design, prototype, test, refine — with documentation throughout.",
      explanation:
        "AP CSP expects you to recognize development as a loop, not a straight line. The investigate phase studies the audience and collects requirements. The design phase turns requirements into a plan — pseudocode, diagrams, UI sketches. The prototype is the first running version, typically rough. Testing exposes what is missing or wrong. Refinement feeds those findings back into another round of design. The same loop repeats until the program serves its purpose.\n\nTwo specific practices show up repeatedly on the exam. Incremental development means building and testing one small piece at a time rather than writing the whole program before running it. If a program grows by 20 lines and then fails, you know the bug is in those 20 lines. Iterative development means revisiting earlier decisions: if testing shows users cannot find a button, the design phase restarts.\n\nDocumentation is a CSP staple. Comments are written next to code to describe what a section does or why a choice was made. They do not change program behavior. External documentation — READMEs, user guides — describes how to run and use the program. The Create performance task explicitly rewards purposeful documentation, so expect multiple choice questions on identifying what a comment contributes and what documentation an innovation needs.",
      keyIdeas: [
        "Development is iterative: investigate, design, prototype, test, refine — then repeat.",
        "Incremental development builds and tests small pieces at a time.",
        "Comments document the code; external documentation describes how to use it.",
        "A program is \"done\" when it meets its purpose for its audience, not when it compiles.",
      ],
      commonMistakes: [
        "Treating testing as a one-time final step rather than something that happens every iteration.",
        "Writing comments that just restate the code (e.g. \"// adds 1 to x\"); CSP wants the why.",
        "Designing the whole program before running anything — incremental development is preferred.",
      ],
      interactives: [
        {
          id: "1.3.a",
          kind: "ethics",
          title: "Pick the next development step",
          description:
            "You are two weeks into a four-week project. Your prototype runs, but three test users all missed the same button. What is the AP CSP move?",
          scenario:
            "The prototype displays a dashboard, and the users have to click a small button in the corner to start tracking. All three testers missed it.",
          choices: [
            {
              label: "A",
              text: "Add features unrelated to the button and test at the end.",
              correct: false,
              reasoning:
                "Ignoring test feedback contradicts iterative development. New features will have the same discoverability problem.",
            },
            {
              label: "B",
              text: "Return to design: sketch a more prominent start control, prototype it, and re-test.",
              correct: true,
              reasoning:
                "Test feedback feeds the next iteration — that is iterative development in one sentence.",
            },
            {
              label: "C",
              text: "Tell the users they need to try harder.",
              correct: false,
              reasoning:
                "When real users fail, the program has a problem — not the users.",
            },
            {
              label: "D",
              text: "Delete the button and ship the app without a start control.",
              correct: false,
              reasoning:
                "The button exists because the program needs the input. Removing it breaks program function, not fixes it.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Phases of the development process?", back: "Investigate → design → prototype → test → refine, iteratively." },
        { front: "Define incremental development.", back: "Build and test one small piece at a time so bugs are localized." },
        { front: "What does a comment do at runtime?", back: "Nothing — comments are for the reader, not the interpreter." },
      ],
      practiceProblems: [
        {
          id: "1.3.p1",
          difficulty: "easy",
          prompt: "Which best describes iterative development?",
          choices: [
            "Writing all the code first, then testing once at the end.",
            "Cycling through design, build, and test, improving each pass.",
            "Letting only the teacher decide what to build.",
            "Deleting the program and starting over from scratch.",
          ],
          answer:
            "Cycling through design, build, and test, improving each pass.",
          explanation:
            "Iterative development is a loop. Each pass uses what was learned in the previous pass to refine design or implementation.",
        },
        {
          id: "1.3.p2",
          difficulty: "medium",
          prompt:
            "Which comment adds the most value according to AP CSP expectations?\n```\n// adds 1 to counter\ncounter ← counter + 1\n```",
          choices: [
            "The existing comment is ideal.",
            "// adds one to count (spelled out)",
            "// counter tracks how many users clicked SUBMIT so we cap at 5",
            "// increments",
          ],
          answer: "// counter tracks how many users clicked SUBMIT so we cap at 5",
          explanation:
            "Comments that restate code add no information. CSP wants the why: intent, constraints, or behavior the reader cannot see from the line alone.",
        },
      ],
    },
    {
      id: "1.4",
      title: "Identifying and Correcting Errors",
      bigIdea: "CRD",
      summary:
        "CSP distinguishes syntax, runtime, logic, and overflow errors, and expects you to use test cases and debugging to find them.",
      explanation:
        "AP CSP classifies errors into four exam-worthy categories. A syntax error violates the grammar of the language: a missing brace, a misspelled keyword. The program will not run. A runtime error happens during execution — dividing by zero, accessing a list slot that does not exist, or running out of memory. A logic error runs cleanly but produces the wrong answer: the program returns 100 when the right answer is 1000. An overflow error is a special runtime case where a value is too large for the number of bits the program uses to represent it; it reappears in Unit 2.\n\nFinding these requires test cases. A test case is a concrete (input → expected output) pair. Good test suites include normal cases, boundary cases (empty list, max value), and edge cases (negative numbers, special characters). CSP explicitly values test-case design: if you only test inputs that work, you will never catch the inputs that don't.\n\nDebugging is the process of locating and fixing errors. Common strategies include reading error messages carefully, adding DISPLAY statements to show intermediate values, hand-tracing the program on paper, and commenting out sections to isolate the bug. The exam rewards the one that localizes the bug with the fewest changes — usually a trace, not a rewrite.",
      keyIdeas: [
        "Syntax error: breaks the grammar; program does not run.",
        "Runtime error: crashes during execution (e.g. divide by 0, bad index).",
        "Logic error: runs fine but produces wrong output.",
        "Overflow error: value too large for the bits reserved (Unit 2).",
        "Test cases should cover normal, boundary, and edge conditions.",
      ],
      commonMistakes: [
        "Assuming a program that \"compiles\" is correct — that only rules out syntax errors.",
        "Writing test cases only for inputs you know work.",
        "Rewriting a module when a targeted trace would isolate the bug in one line.",
      ],
      interactives: [
        {
          id: "1.4.a",
          kind: "trace",
          title: "Trace a buggy average",
          description:
            "This procedure should return the average of the first three list items but it has a logic error. Step through the trace to find the exact line that is wrong.",
          pseudocode:
            "1  PROCEDURE averageFirstThree(nums)\n2  {\n3      total ← nums[1] + nums[2]\n4      RETURN total / 3\n5  }\n6\n7  DISPLAY(averageFirstThree([6, 9, 12, 15]))",
          trace: [
            { line: 3, vars: { "nums[1]": 6, "nums[2]": 9, total: 15 } },
            { line: 4, vars: { total: 15, "total / 3": 5 } },
            { line: 7, vars: { printed: 5 } },
          ],
          finalOutput: "5",
          hints: [
            "Line 3 only adds the first two items, not the first three.",
            "The correct sum should include nums[3] = 12, giving 27 and an average of 9.",
            "This is a logic error — the program runs, but the answer is wrong.",
          ],
        },
      ],
      flashcards: [
        { front: "Syntax error vs runtime error?", back: "Syntax: grammar broken, never runs. Runtime: runs until a bad operation crashes it." },
        { front: "What is a logic error?", back: "A program that runs successfully but produces the wrong result." },
        { front: "What is a good test-case suite?", back: "Covers normal, boundary, and edge inputs — not just ones you know work." },
      ],
      practiceProblems: [
        {
          id: "1.4.p1",
          difficulty: "easy",
          prompt:
            "A program divides two ints and crashes only when the user enters 0 as the divisor. What type of error is this?",
          choices: ["Syntax", "Runtime", "Logic", "Overflow"],
          answer: "Runtime",
          explanation:
            "The program compiles and runs until the division-by-zero operation is attempted. That is a runtime error.",
        },
        {
          id: "1.4.p2",
          difficulty: "medium",
          prompt:
            "Consider a function meant to return the larger of two numbers. For (3, 5) it returns 3 and for (8, 2) it returns 8. What kind of error exists?",
          choices: ["Syntax", "Runtime", "Logic", "No error — this is correct."],
          answer: "Logic",
          explanation:
            "(3, 5) should return 5. The code runs without crashing but produces the wrong answer — textbook logic error.",
        },
        {
          id: "1.4.p3",
          difficulty: "medium",
          prompt:
            "Which test-case list is best for a program that sums a list of integers?",
          choices: [
            "[1, 2, 3]",
            "[1, 2, 3]; []; [−5, 5]; [1000000, 1]",
            "[1]",
            "Always [0, 0, 0]",
          ],
          answer: "[1, 2, 3]; []; [−5, 5]; [1000000, 1]",
          explanation:
            "A strong test suite covers a normal case, a boundary (empty list), an edge case (negatives), and a case that stresses numeric range.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 2 — DATA (17–22% of exam, Big Idea DAT)
// =============================================================================
AP_COMPUTER_SCIENCE_PRINCIPLES.units.push({
  number: 2,
  title: "Data",
  bigIdea: "DAT",
  examWeight: "17–22% of exam",
  overview:
    "Unit 2 is about how computers represent, store, shrink, and interpret data. You will be asked to convert between binary and decimal, explain why some numbers round or overflow, compare lossy vs. lossless compression, identify metadata, and describe how programs turn raw data into information. Expect a mix of calculation questions (binary → decimal) and conceptual questions (why JPEG is lossy).",
  topics: [
    {
      id: "2.1",
      title: "Binary Numbers",
      bigIdea: "DAT",
      summary:
        "Computers represent everything — numbers, text, images, sound — as sequences of bits. Fixed bit widths cause overflow and round-off errors.",
      explanation:
        "Every piece of data in a computer is stored as bits — 0s and 1s. A single bit can encode 2 states; n bits can encode 2^n states. A byte is 8 bits, which is enough to hold 256 distinct values (0–255 if unsigned). A binary number is read right-to-left as place values 2^0, 2^1, 2^2, …. For example, 1011₂ = 8 + 0 + 2 + 1 = 11.\n\nTo convert decimal to binary, repeatedly subtract the largest power of 2 that fits and write a 1; otherwise write a 0. Decimal 13 fits 8 (1), leaves 5; fits 4 (1), leaves 1; skips 2 (0); fits 1 (1), giving 1101₂. To convert binary to decimal, sum the place values where bits are 1.\n\nBit widths are fixed on every computer. An 8-bit register that holds 255 cannot hold 256 — trying produces an overflow error, which wraps or errors depending on the system. Similarly, a decimal like 0.1 has no finite binary representation, so it is stored as an approximation — this is round-off error. Both appear on the exam as reasons a program can be \"correct\" in design but still produce surprising output. The abstraction takeaway: higher-level data types (integers, floats, strings, images) are all layered on top of bits; the exam asks you to recognize that layering, not implement it.",
      keyIdeas: [
        "n bits can represent 2^n distinct values.",
        "Binary place values are 2^0, 2^1, 2^2, … read right to left.",
        "Overflow: a value exceeds the fixed number of bits allocated.",
        "Round-off: numbers like 0.1 have no finite binary representation and are stored approximately.",
      ],
      commonMistakes: [
        "Reading binary left-to-right as if the leftmost bit were 2^0.",
        "Confusing \"8 bits\" with \"8 values\" — 8 bits hold 256 values.",
        "Blaming overflow on \"big numbers\" in general; it only occurs when the value exceeds the allocated bits.",
      ],
      interactives: [
        {
          id: "2.1.a",
          kind: "binary",
          title: "Convert between decimal and binary",
          description:
            "Edit the decimal to see its binary form. Try values near 255 to see the 8-bit cap in action; values over 255 trigger an overflow warning.",
          initialDecimal: 13,
          bits: 8,
          showHex: true,
          overflowDemo: true,
        },
        {
          id: "2.1.b",
          kind: "encoding",
          title: "How many bits do you need?",
          description:
            "Each row shows how many values can be uniquely encoded for a given bit count. Think about the smallest bit width that fits your data.",
          target: "text",
          rows: [
            { symbol: "1 bit", bits: "2 values", note: "True/false, on/off." },
            { symbol: "4 bits", bits: "16 values", note: "One hex digit; enough for a chess piece type." },
            { symbol: "7 bits", bits: "128 values", note: "Classic ASCII character set." },
            { symbol: "8 bits", bits: "256 values", note: "One byte; grayscale pixel intensity." },
            { symbol: "16 bits", bits: "65,536 values", note: "Short audio sample; small Unicode range." },
            { symbol: "32 bits", bits: "~4.29 billion values", note: "Typical int; IPv4 address space." },
          ],
        },
      ],
      flashcards: [
        { front: "How many values does n bits hold?", back: "2^n distinct values." },
        { front: "Binary 1010 in decimal?", back: "8 + 0 + 2 + 0 = 10." },
        { front: "Define overflow error.", back: "A value exceeds the fixed number of bits used to store it." },
        { front: "Why does 0.1 + 0.2 ≠ 0.3 sometimes?", back: "0.1 and 0.2 have no finite binary expansion; they are stored approximately — round-off error." },
      ],
      practiceProblems: [
        {
          id: "2.1.p1",
          difficulty: "easy",
          prompt: "What is 1101₂ in decimal?",
          choices: ["11", "12", "13", "14"],
          answer: "13",
          explanation: "1·8 + 1·4 + 0·2 + 1·1 = 13.",
        },
        {
          id: "2.1.p2",
          difficulty: "medium",
          prompt:
            "A program uses 4 bits to store a player's lives. It tries to store 20. What happens?",
          choices: [
            "Nothing — 20 fits.",
            "Overflow — 4 bits can only hold 0–15.",
            "Round-off error.",
            "Syntax error.",
          ],
          answer: "Overflow — 4 bits can only hold 0–15.",
          explanation:
            "4 bits = 2^4 = 16 states. Values 16–20 exceed that range, causing overflow.",
        },
        {
          id: "2.1.p3",
          difficulty: "medium",
          prompt:
            "Which statement about representing data is TRUE?",
          choices: [
            "Images are stored as text and then converted to bits.",
            "At the lowest level, images, numbers, and text are all sequences of bits.",
            "Computers use decimal internally and only display binary.",
            "Only numbers can be stored as bits.",
          ],
          answer:
            "At the lowest level, images, numbers, and text are all sequences of bits.",
          explanation:
            "Bits are the universal low-level abstraction. Higher types are interpretations imposed on those bits.",
        },
      ],
    },
    {
      id: "2.2",
      title: "Data Compression",
      bigIdea: "DAT",
      summary:
        "Compression shrinks data for storage or transmission. Lossless keeps everything; lossy discards detail for bigger savings.",
      explanation:
        "Compression reduces the number of bits needed to represent data. There are two families on the exam. Lossless compression guarantees perfect reconstruction — every bit of the original can be recovered. It exploits patterns: repeated characters get shorter codes, and a legend lets the decoder rebuild the original. ZIP files, PNG images, and FLAC audio are lossless.\n\nLossy compression throws away information that humans are less likely to notice, in exchange for much smaller files. JPEG drops fine color detail; MP3 drops inaudible frequencies; H.264 drops between-frame redundancy. You cannot recover the original from a lossy file. The exam will ask you to pick the right tool: a medical X-ray or a legal document must stay lossless; a meme on a text thread can be lossy.\n\nTwo exam traps: (1) compression does not always save space on already-random data — sometimes a compressed file is slightly larger than the original; (2) lossy is not \"bad\" — it is the right choice when perceptual quality is all that matters. CSP wants you to reason about trade-offs, not memorize a single \"best\" format.",
      keyIdeas: [
        "Lossless: full reconstruction guaranteed. Example: ZIP, PNG, FLAC.",
        "Lossy: some detail permanently lost for much smaller size. Example: JPEG, MP3.",
        "Pick lossless when every bit matters (medical, legal, code, text).",
        "Pick lossy when file size or bandwidth matters more than full fidelity.",
      ],
      commonMistakes: [
        "Claiming lossy compression is always smaller — it usually is, but not guaranteed on every input.",
        "Assuming you can recover the original from a JPEG — you cannot.",
        "Thinking compression \"deletes data\" randomly; it is algorithmic.",
      ],
      interactives: [
        {
          id: "2.2.a",
          kind: "compression",
          title: "Compress the same text two ways",
          description:
            "Compare lossless run-length encoding and a fictional lossy \"drop vowels\" method on the same string.",
          original: "aaaaabbbbcccc",
          lossless: {
            result: "5a4b4c",
            bytesSaved: 7,
            note: "Run-length encoding stores (count, symbol) — fully reversible.",
          },
          lossy: {
            result: "bbbbcccc",
            bytesSaved: 5,
            note: "Dropped the a-run. Smaller, but you cannot recover \"aaaaa\" from this.",
          },
        },
        {
          id: "2.2.b",
          kind: "ethics",
          title: "Pick the right compression",
          description:
            "Match each use case to the better compression choice. Justify with CSP reasoning.",
          scenario:
            "A hospital wants to email an X-ray image to a specialist in another city.",
          choices: [
            {
              label: "A",
              text: "Lossless (e.g. PNG, DICOM) — diagnostic accuracy depends on every pixel.",
              correct: true,
              reasoning:
                "Medical images drive diagnosis. Lossy artifacts could hide or invent features. Lossless is the correct choice even though the file is larger.",
            },
            {
              label: "B",
              text: "Lossy JPEG at low quality to save bandwidth.",
              correct: false,
              reasoning:
                "Lossy artifacts can resemble pathology. Saving bandwidth at the cost of a misdiagnosis is not a CSP-acceptable trade.",
            },
            {
              label: "C",
              text: "No compression — always send raw pixels.",
              correct: false,
              reasoning:
                "Lossless compression is usually available and safe. Skipping it wastes bandwidth without adding accuracy.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Lossless vs lossy — one-line definition?", back: "Lossless: fully reversible. Lossy: some data permanently discarded for smaller size." },
        { front: "Give a lossless format.", back: "ZIP, PNG, FLAC, or GIF." },
        { front: "Give a lossy format.", back: "JPEG, MP3, or H.264/MP4." },
        { front: "When should you choose lossless?", back: "When every bit matters — medical, legal, code, archival." },
      ],
      practiceProblems: [
        {
          id: "2.2.p1",
          difficulty: "easy",
          prompt: "Which file format uses lossy compression?",
          choices: ["PNG", "ZIP", "JPEG", "TXT"],
          answer: "JPEG",
          explanation:
            "JPEG discards fine color/brightness detail to achieve high compression ratios. PNG, ZIP, and plain text are lossless.",
        },
        {
          id: "2.2.p2",
          difficulty: "medium",
          prompt:
            "Why might a lawyer refuse to share a scanned contract as a JPEG?",
          choices: [
            "JPEG files cannot be emailed.",
            "JPEG is lossy — small text and signatures can be distorted by compression artifacts.",
            "JPEG files are always larger than TXT files.",
            "JPEG requires special hardware to open.",
          ],
          answer:
            "JPEG is lossy — small text and signatures can be distorted by compression artifacts.",
          explanation:
            "Legal documents must be faithfully reproduced. Lossy formats introduce distortions that may change how a signature or clause looks.",
        },
      ],
    },
    {
      id: "2.3",
      title: "Extracting Information from Data",
      bigIdea: "DAT",
      summary:
        "Programs turn raw data into information by filtering, cleaning, and looking for patterns; metadata is data about data.",
      explanation:
        "Data alone is not information. A list of timestamps and heart rates is data; \"your resting heart rate dropped 5 bpm this month\" is information extracted from that data. To get there, programs typically clean the data (removing duplicates, fixing missing values), filter it (keeping only the rows that match a question), and look for trends or correlations.\n\nMetadata is data about the data. A photo's metadata includes when and where it was taken, camera model, and exposure. Metadata is used to organize, index, and search large datasets — you can find every photo taken in Denver in 2024 only because that metadata exists. Metadata is also a privacy concern: people share photos not realizing the GPS coordinates are attached, a point that returns in Unit 5.\n\nLarge data sets need cleaning. Real data arrives with missing fields, inconsistent units (miles vs kilometers), and duplicates. Skipping cleaning produces misleading results. Exam questions will ask you to identify where bias or error could enter a data pipeline — almost always in collection or cleaning.",
      keyIdeas: [
        "Information is extracted from data through filtering, aggregation, and pattern finding.",
        "Metadata = data about data (timestamp, author, GPS, format).",
        "Cleaning removes duplicates, fixes missing/invalid fields, and unifies formats.",
        "Bias and errors most often enter during data collection or cleaning.",
      ],
      commonMistakes: [
        "Conflating data and information — they are distinct on AP CSP.",
        "Forgetting metadata counts as data for privacy purposes.",
        "Trusting trends in uncleaned data with missing or duplicate rows.",
      ],
      interactives: [
        {
          id: "2.3.a",
          kind: "list",
          title: "Filter a list of step counts",
          description:
            "Start with a raw week of step counts including one typo (−500) and one duplicate. Walk through operations to clean and aggregate.",
          initial: [8120, 9542, -500, 10004, 7800, 10004, 6321, 9001],
          ops: [
            {
              op: "REMOVE",
              index: 3,
              note: "Remove the clearly invalid −500 entry (data cleaning).",
            },
            {
              op: "REMOVE",
              index: 4,
              note: "Remove the duplicate 10004 — sensor logged twice.",
            },
            {
              op: "ACCESS",
              index: 1,
              note: "First valid day's steps: 8120 (list is 1-indexed in CSP).",
            },
            {
              op: "APPEND",
              value: 11500,
              note: "Append today's step count after cleaning.",
            },
          ],
        },
        {
          id: "2.3.b",
          kind: "encoding",
          title: "Metadata snapshot",
          description:
            "Every modern photo carries metadata like this. Identify which fields could be privacy concerns.",
          target: "text",
          rows: [
            { symbol: "filename", bits: "IMG_0423.JPG", note: "Descriptive — usually safe." },
            { symbol: "timestamp", bits: "2026-04-21 14:07:03", note: "Reveals when — low risk alone, high risk combined." },
            { symbol: "gps.lat", bits: "39.7392", note: "Privacy concern: exact location." },
            { symbol: "gps.lng", bits: "-104.9903", note: "Privacy concern: exact location." },
            { symbol: "cameraModel", bits: "Pixel 8", note: "Usually safe." },
            { symbol: "ownerUserId", bits: "u_3829", note: "Privacy concern: links the photo to a specific account." },
          ],
        },
      ],
      flashcards: [
        { front: "Data vs information?", back: "Data is raw values; information is what you learn after processing and analysis." },
        { front: "Define metadata.", back: "Data about data — e.g., timestamps, GPS, author, format." },
        { front: "Why clean data?", back: "Raw data has duplicates, missing entries, and bad units that skew any analysis." },
      ],
      practiceProblems: [
        {
          id: "2.3.p1",
          difficulty: "easy",
          prompt: "Which of the following is metadata for a photo?",
          choices: [
            "The RGB values of the pixels.",
            "The GPS coordinates where the photo was taken.",
            "The name of the person in the photo, from facial recognition.",
            "The compressed JPEG bytes.",
          ],
          answer: "The GPS coordinates where the photo was taken.",
          explanation:
            "Pixel data is the photo itself. GPS coordinates are data about the photo — classic metadata.",
        },
        {
          id: "2.3.p2",
          difficulty: "medium",
          prompt:
            "A company runs an analysis on customer call records without removing duplicate rows. Which CSP concern most applies?",
          choices: [
            "Overflow error.",
            "The results over-count customers and produce misleading information.",
            "The program will not compile.",
            "Metadata is lost.",
          ],
          answer:
            "The results over-count customers and produce misleading information.",
          explanation:
            "Skipping cleaning causes duplicates to inflate counts. The data is still present; the derived information is wrong.",
        },
      ],
    },
    {
      id: "2.4",
      title: "Using Programs with Data",
      bigIdea: "DAT",
      summary:
        "Programs process large datasets faster and more consistently than humans, producing visualizations and insights that would be impractical by hand.",
      explanation:
        "Programs scale. A human can eyeball a hundred rows of data; a program can join, filter, and aggregate a billion rows in the same time. That scale is why data-driven innovations exist — traffic prediction, genome analysis, recommendation engines. CSP expects you to recognize when a computing solution is appropriate: when the data volume, update rate, or pattern-finding complexity exceeds manual work.\n\nVisualization is the last step. Histograms, scatter plots, and maps turn numbers into shapes the human visual system can read. The exam will present a dataset and ask which visualization best supports a specific question: \"does study time correlate with grade?\" calls for a scatter plot; \"how do test scores distribute?\" calls for a histogram. The wrong visualization can obscure or invent trends.\n\nPrograms also consume data from multiple sources — APIs, sensors, databases. Combining sources raises questions the exam cares about: are the units compatible? Are the timestamps in the same timezone? Are privacy expectations consistent across sources? CSP rewards answers that treat data combination as an engineering decision, not a free operation.",
      keyIdeas: [
        "Programs win when data scale, speed, or complexity exceeds manual analysis.",
        "Choose a visualization that matches the question (scatter for correlation, bar for comparison, map for geography).",
        "Combining data from multiple sources introduces unit, format, and privacy issues.",
        "A visualization is an abstraction — it hides data to surface a pattern.",
      ],
      commonMistakes: [
        "Picking a visualization based on what looks cool instead of what answers the question.",
        "Treating data from two systems as interchangeable without checking units or schemas.",
        "Assuming more data is always better — noisy data can bury a real trend.",
      ],
      interactives: [
        {
          id: "2.4.a",
          kind: "pseudocode",
          title: "Aggregate a dataset",
          description:
            "Compute the average of a list of daily temperatures using a FOR EACH loop. This is the bread-and-butter data-processing pattern CSP tests.",
          pseudocode:
            "temps ← [68, 72, 75, 70, 65, 80, 78]\ntotal ← 0\nFOR EACH t IN temps\n{\n    total ← total + t\n}\naverage ← total / LENGTH(temps)\nDISPLAY(average)",
          expectedOutput: "72.57142857142857",
          variations: [
            {
              prompt: "Change the list to [50, 50, 50] and predict the output before running.",
              hint: "Sum is 150, length is 3 → 50.",
            },
            {
              prompt: "Add a second loop that counts how many days were above 70.",
              hint: "Initialize a hot counter, IF t > 70 inside the loop, add 1.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Best visualization for correlation?", back: "Scatter plot — one variable on each axis." },
        { front: "Best visualization for frequency?", back: "Histogram — groups values into buckets and shows counts." },
        { front: "Concern when combining two data sources?", back: "Mismatched units, schemas, timezones, or privacy expectations." },
      ],
      practiceProblems: [
        {
          id: "2.4.p1",
          difficulty: "easy",
          prompt:
            "Which visualization best answers: \"Does more sleep lead to higher test scores?\"",
          choices: ["Pie chart", "Histogram", "Scatter plot", "Bar chart"],
          answer: "Scatter plot",
          explanation:
            "Scatter plots show correlation between two numeric variables — exactly what the question asks.",
        },
        {
          id: "2.4.p2",
          difficulty: "medium",
          prompt:
            "Trace:\n```\nnums ← [3, 8, 1, 7, 4]\ntotal ← 0\nFOR EACH x IN nums\n{\n    total ← total + x\n}\nDISPLAY(total)\n```",
          answer: "23",
          explanation:
            "FOR EACH visits each element once. Running sum: 3, 11, 12, 19, 23. Final DISPLAY is 23.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 3 — ALGORITHMS AND PROGRAMMING (30–35% of exam, Big Idea AAP)
// =============================================================================
AP_COMPUTER_SCIENCE_PRINCIPLES.units.push({
  number: 3,
  title: "Algorithms and Programming",
  bigIdea: "AAP",
  examWeight: "30–35% of exam",
  overview:
    "Unit 3 is the biggest unit and drives the bulk of the exam's pseudocode questions. You will write and trace variables, conditionals, loops, lists, procedures, and libraries using AP CSP's reference-sheet pseudocode. The unit also covers algorithm development, binary search, randomness, simulations, algorithmic efficiency, and the existence of undecidable problems.",
  topics: [
    {
      id: "3.1",
      title: "Variables and Assignments",
      bigIdea: "AAP",
      summary:
        "A variable is a named storage slot. Assignment (←) stores a value in a variable; the right side is evaluated first.",
      explanation:
        "AP CSP uses the left-arrow ← for assignment. x ← 5 stores 5 in x. On the exam, reading assignment from right to left is the fastest path: evaluate the right-hand expression, then write the result into the variable on the left. Assignment replaces the previous value completely; x ← x + 1 reads the current x, adds 1, and writes the result back.\n\nVariables do not have fixed types in CSP pseudocode — a variable that holds 5 can later hold \"hello\". This is different from Java (AP CSA) and is an intentional simplification. What matters on the exam is value, not type. Watch for questions that reuse a variable name for a different purpose; the latest assignment always wins.\n\nInitialize every variable before use. A variable that is read before it is assigned is an error on the exam; the answer choices will often hide this as a distractor like \"undefined behavior.\" Good practice (and good exam hygiene): initialize counters to 0 and accumulators to the identity for the operation (0 for sums, 1 for products, empty list for appends).",
      keyIdeas: [
        "Assignment is right-to-left: evaluate the right side, then store in the left.",
        "x ← x + 1 is the standard increment pattern; the old x is used first.",
        "CSP pseudocode variables do not declare a type.",
        "Initialize before you read — counters to 0, accumulators to identity.",
      ],
      commonMistakes: [
        "Reading assignment left-to-right.",
        "Reading a variable before it has been assigned.",
        "Confusing ← (assignment) with = (equality test).",
      ],
      interactives: [
        {
          id: "3.1.a",
          kind: "trace",
          title: "Swap two variables",
          description:
            "Classic swap uses a temporary variable. Trace each line and notice why the order matters.",
          pseudocode:
            "1  a ← 7\n2  b ← 4\n3  temp ← a\n4  a    ← b\n5  b    ← temp\n6  DISPLAY(a)\n7  DISPLAY(b)",
          trace: [
            { line: 1, vars: { a: 7 } },
            { line: 2, vars: { a: 7, b: 4 } },
            { line: 3, vars: { a: 7, b: 4, temp: 7 } },
            { line: 4, vars: { a: 4, b: 4, temp: 7 } },
            { line: 5, vars: { a: 4, b: 7, temp: 7 } },
            { line: 6, vars: { printed: 4 } },
            { line: 7, vars: { printed: 7 } },
          ],
          finalOutput: "4\n7",
        },
      ],
      flashcards: [
        { front: "What symbol is assignment in CSP?", back: "← (left-pointing arrow). Read right-to-left." },
        { front: "What does x ← x + 1 do?", back: "Reads the current x, adds 1, stores the result back into x." },
        { front: "Do CSP variables have fixed types?", back: "No — the same variable can hold different kinds of values over time." },
      ],
      practiceProblems: [
        {
          id: "3.1.p1",
          difficulty: "easy",
          prompt: "After\n```\nx ← 3\nx ← x + 4\nx ← x * 2\n```\nwhat is x?",
          choices: ["7", "10", "14", "24"],
          answer: "14",
          explanation:
            "x = 3; then 3 + 4 = 7; then 7 * 2 = 14.",
        },
        {
          id: "3.1.p2",
          difficulty: "medium",
          prompt:
            "Without a temp variable, does this swap work?\n```\na ← 1\nb ← 2\na ← b\nb ← a\n```",
          answer: "No — after a ← b, a is 2 and the original 1 is lost, so b ← a stores 2 again.",
          explanation:
            "The first line overwrites a before its value is saved. Both variables end up holding 2. A temp or a simultaneous-swap construct is required.",
        },
      ],
    },
    {
      id: "3.2",
      title: "Data Abstraction",
      bigIdea: "AAP",
      summary:
        "Data abstraction groups related values under a single name (e.g. a list) so the program can work with the collection instead of tracking each piece.",
      explanation:
        "Abstraction is the core CSP theme: give something a name so you can use it without repeating its internals. Data abstraction specifically means grouping related data. A list with seven temperatures is one variable that represents a week's worth of weather; without the list, you would need seven variables and seven copies of any loop body that touched them.\n\nCSP pseudocode's list literal is [a, b, c]. Lists are 1-indexed on the exam — nums[1] is the first element, not the zeroth. LENGTH(list) returns the number of items. Assigning a list to a variable hands the program a single handle for the entire collection; procedures can accept a list as one parameter and operate on any size.\n\nThe CSP exam repeatedly rewards the student who recognizes when data abstraction simplifies a program. If you see six nearly identical lines operating on score1, score2, …, the right answer almost always involves rewriting them as a list and a loop.",
      keyIdeas: [
        "Data abstraction bundles related values under one name.",
        "CSP lists are 1-indexed. First element is list[1].",
        "LENGTH(list) returns the number of items.",
        "Abstraction removes duplication and lets procedures scale to any size.",
      ],
      commonMistakes: [
        "Indexing lists from 0 — CSP pseudocode is 1-indexed.",
        "Creating one variable per element (score1, score2, …) instead of a list.",
        "Confusing a list's length with its last index — they are equal in CSP because indices start at 1.",
      ],
      interactives: [
        {
          id: "3.2.a",
          kind: "list",
          title: "One variable, many values",
          description:
            "Observe how the same list supports append and access operations without adding new variables.",
          initial: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          ops: [
            { op: "ACCESS", index: 1, note: "days[1] is Mon — CSP is 1-indexed." },
            { op: "APPEND", value: "Sat", note: "Append adds Sat to the end; list is now length 6." },
            { op: "APPEND", value: "Sun", note: "Another append; list is now length 7." },
            { op: "ACCESS", index: 7, note: "days[7] is Sun. No new variables were needed." },
          ],
        },
      ],
      flashcards: [
        { front: "What index holds the first element in CSP?", back: "1. CSP pseudocode is 1-indexed." },
        { front: "Call for list size?", back: "LENGTH(list)." },
        { front: "Why use a list over individual variables?", back: "One name handles any number of related values and works with loops." },
      ],
      practiceProblems: [
        {
          id: "3.2.p1",
          difficulty: "easy",
          prompt: "Given list ← [10, 20, 30, 40]. What is list[3]?",
          choices: ["10", "20", "30", "40"],
          answer: "30",
          explanation: "CSP is 1-indexed: list[1]=10, list[2]=20, list[3]=30.",
        },
        {
          id: "3.2.p2",
          difficulty: "medium",
          prompt:
            "A student has six separate variables: score1..score6. They now need to sum them. Which refactor is best aligned with AAP?",
          choices: [
            "Write scoreSum ← score1 + score2 + score3 + score4 + score5 + score6.",
            "Replace the six variables with a list and sum using FOR EACH.",
            "Use six nested IF statements.",
            "Create six procedures, one per score.",
          ],
          answer:
            "Replace the six variables with a list and sum using FOR EACH.",
          explanation:
            "Data abstraction converts six parallel variables into one list, enabling a loop that scales to any number of scores.",
        },
      ],
    },
    {
      id: "3.3",
      title: "Mathematical Expressions",
      bigIdea: "AAP",
      summary:
        "CSP supports +, −, *, /, and MOD. Operator precedence and integer-vs-decimal rules mirror standard math.",
      explanation:
        "Arithmetic in CSP pseudocode behaves the way students expect: parentheses first, then * / MOD, then + −, left-to-right ties. The modulus operator MOD returns the remainder after integer division: 17 MOD 5 is 2, because 17 = 3·5 + 2. MOD is the go-to tool for \"every n-th\" tests (i MOD 2 = 0 detects even numbers) and for wrapping values around a range.\n\nDivision in CSP pseudocode yields a true mathematical quotient — 7 / 2 is 3.5. This is different from Java's integer division in AP CSA and is worth double-checking on exam day. If a question expects truncation, it will say so explicitly or call a procedure like `FLOOR`.\n\nThe exam will mix arithmetic with assignment: `total ← total + score`. Evaluate the right side first (the old total plus the new score), then store. Operator-precedence questions frequently put a subtraction or modulus next to a division; parenthesize aggressively on scratch paper to avoid order-of-operations mistakes.",
      keyIdeas: [
        "Standard precedence: parens → * / MOD → + −.",
        "MOD returns the remainder: a MOD b.",
        "Division in CSP pseudocode returns a decimal result (unlike Java).",
        "Combine arithmetic with ← for accumulation: total ← total + x.",
      ],
      commonMistakes: [
        "Assuming 7 / 2 = 3 in CSP pseudocode (it is 3.5).",
        "Forgetting MOD precedence — it ties with * and /, not + −.",
        "Reading a ← b + c left-to-right and adding a to the mix.",
      ],
      interactives: [
        {
          id: "3.3.a",
          kind: "pseudocode",
          title: "Even / odd via MOD",
          description:
            "Run a tiny program that classifies numbers by their MOD 2 result. Change the test value and predict the output.",
          pseudocode:
            "n ← 17\nIF (n MOD 2 = 0)\n{\n    DISPLAY(\"even\")\n}\nELSE\n{\n    DISPLAY(\"odd\")\n}",
          expectedOutput: "odd",
          variations: [
            { prompt: "Set n to 12 and rerun.", hint: "12 MOD 2 is 0 → even." },
            {
              prompt: "Change the test to n MOD 3 = 0 — what does that detect?",
              hint: "Multiples of 3.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "What does MOD do?", back: "Returns the remainder after integer division." },
        { front: "What is 17 MOD 5?", back: "2, because 17 = 3·5 + 2." },
        { front: "Is 7 / 2 integer division in CSP pseudocode?", back: "No — it is 3.5." },
      ],
      practiceProblems: [
        {
          id: "3.3.p1",
          difficulty: "easy",
          prompt: "What is (3 + 2) * 4 MOD 3?",
          answer: "2",
          explanation:
            "Parens first: 3+2 = 5. Then * and MOD tie, left-to-right: 5 * 4 = 20, then 20 MOD 3 = 2.",
        },
        {
          id: "3.3.p2",
          difficulty: "medium",
          prompt:
            "Which expression returns the last digit of a positive integer n?",
          choices: ["n / 10", "n MOD 10", "n MOD n", "n * 10"],
          answer: "n MOD 10",
          explanation:
            "MOD 10 returns the remainder when dividing by 10, which is the ones digit.",
        },
      ],
    },
    {
      id: "3.4",
      title: "Strings",
      bigIdea: "AAP",
      summary:
        "Strings are sequences of characters. CSP-style pseudocode treats them as values you can concatenate, measure, and slice with procedures.",
      explanation:
        "On the AP CSP exam, strings are text in quotes: \"hello\". They can be concatenated with +, or combined using the DISPLAY statement to print multiple pieces. LENGTH applies to strings too — LENGTH(\"hello\") is 5. The exam uses procedures like concat(a, b), substring(s, start, end), and sometimes len(s) depending on the problem; read the procedure description in the prompt.\n\nStrings are values, not special objects. You can store them in variables, pass them to procedures, and put them in lists: cities ← [\"Boston\", \"Denver\"]. Comparing strings with = tests equality; a ≠ b tests inequality. CSP does not test lexicographic string comparison with < or > — stick with = and ≠.\n\nWatch for silent conversions. DISPLAY(\"score: \" + s) expects s already to be a string; if your pseudocode mixes numbers and strings with +, the question will tell you how concatenation handles that case. When in doubt, convert numeric values to strings explicitly if the prompt provides a numToString-style helper.",
      keyIdeas: [
        "Strings are sequences of characters in double quotes.",
        "LENGTH works on strings as well as lists.",
        "Use = / ≠ for string comparison; CSP does not test < / > on strings.",
        "Concatenation joins two strings into one longer string.",
      ],
      commonMistakes: [
        "Comparing strings with < or > — CSP only tests = and ≠.",
        "Mixing numbers and strings with + without reading the prompt's concat rule.",
        "Treating a string like a list of characters — you need a helper procedure to index characters.",
      ],
      interactives: [
        {
          id: "3.4.a",
          kind: "pseudocode",
          title: "Greet a user by name",
          description:
            "Read a name into a string variable and build a greeting with concatenation.",
          pseudocode:
            "name    ← \"Ada\"\ngreet   ← \"Hello, \" + name + \"!\"\nDISPLAY(greet)\nDISPLAY(LENGTH(greet))",
          expectedOutput: "Hello, Ada!\n11",
          variations: [
            {
              prompt: "Replace the name with your own and recount length.",
              hint: "LENGTH counts every character including punctuation and spaces.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "LENGTH(\"hello\")?", back: "5." },
        { front: "String comparison operators tested on AP CSP?", back: "Only = and ≠." },
        { front: "Is \"5\" the same as 5?", back: "No — one is a string, the other is a number." },
      ],
      practiceProblems: [
        {
          id: "3.4.p1",
          difficulty: "easy",
          prompt: "What does\n```\nfirst ← \"AP\"\nsecond ← \"CSP\"\nDISPLAY(first + \" \" + second)\n```\nprint?",
          answer: "AP CSP",
          explanation:
            "Concatenation joins the three pieces with a single space between.",
        },
        {
          id: "3.4.p2",
          difficulty: "medium",
          prompt: "Which comparison is valid in AP CSP?",
          choices: [
            "\"apple\" < \"banana\"",
            "\"apple\" > \"apple\"",
            "\"apple\" = \"apple\"",
            "\"apple\" ≥ 5",
          ],
          answer: "\"apple\" = \"apple\"",
          explanation:
            "CSP tests only = and ≠ on strings, and only between two strings.",
        },
      ],
    },
    {
      id: "3.5",
      title: "Boolean Expressions",
      bigIdea: "AAP",
      summary:
        "Boolean expressions evaluate to true or false. They use relational operators (<, >, =) and the logical operators AND, OR, NOT.",
      explanation:
        "Booleans are the scaffolding for every conditional and loop on the exam. Relational operators =, ≠, <, ≤, >, ≥ compare two values and return true or false. Logical operators combine booleans: a AND b is true only when both are true; a OR b is true when at least one is true; NOT a flips true to false and vice-versa.\n\nShort-circuit evaluation is not explicitly tested by CSP, but you should still evaluate left to right and respect precedence: NOT binds tightest, then AND, then OR. Parenthesize to disambiguate complicated expressions. A common test target is De Morgan's laws: NOT (a AND b) equals (NOT a) OR (NOT b). Students often miss that NOT distributes over AND/OR only if you flip the connector.\n\nBoolean expressions live inside IF statements and loop conditions. Writing a clear boolean means phrasing the test exactly as you would say it: \"temperature is above 80 and the AC is off.\" Drop the verbal connectives straight into AND/OR and you have the CSP form.",
      keyIdeas: [
        "Relational operators: =, ≠, <, ≤, >, ≥.",
        "Logical operators: AND, OR, NOT.",
        "Precedence: NOT > AND > OR (parenthesize when mixing).",
        "De Morgan: NOT(a AND b) = (NOT a) OR (NOT b).",
      ],
      commonMistakes: [
        "Writing NOT a AND b and expecting NOT (a AND b).",
        "Mixing = (equality) with ← (assignment).",
        "Thinking OR is exclusive (it is inclusive — either or both).",
      ],
      interactives: [
        {
          id: "3.5.a",
          kind: "boolean",
          title: "Truth table: (A AND B) OR NOT C",
          description:
            "Walk through all eight combinations and verify each row.",
          expression: "(A AND B) OR (NOT C)",
          variables: ["A", "B", "C"],
          truthTable: [
            { A: false, B: false, C: false, result: true },
            { A: false, B: false, C: true, result: false },
            { A: false, B: true, C: false, result: true },
            { A: false, B: true, C: true, result: false },
            { A: true, B: false, C: false, result: true },
            { A: true, B: false, C: true, result: false },
            { A: true, B: true, C: false, result: true },
            { A: true, B: true, C: true, result: true },
          ],
        },
      ],
      flashcards: [
        { front: "Result of true AND false?", back: "false." },
        { front: "Result of true OR false?", back: "true." },
        { front: "What is NOT (NOT true)?", back: "true — double negation cancels." },
        { front: "De Morgan's law?", back: "NOT(a AND b) = (NOT a) OR (NOT b)." },
      ],
      practiceProblems: [
        {
          id: "3.5.p1",
          difficulty: "easy",
          prompt:
            "When is (x > 10) AND (x < 20) true?",
          choices: [
            "When x is less than 10.",
            "When x is strictly between 10 and 20.",
            "When x is exactly 10 or 20.",
            "Always.",
          ],
          answer: "When x is strictly between 10 and 20.",
          explanation:
            "Both conditions must hold, so 10 < x < 20 exclusive on both sides.",
        },
        {
          id: "3.5.p2",
          difficulty: "medium",
          prompt:
            "Which is equivalent to NOT (a OR b)?",
          choices: [
            "a AND b",
            "(NOT a) AND (NOT b)",
            "(NOT a) OR (NOT b)",
            "a OR b",
          ],
          answer: "(NOT a) AND (NOT b)",
          explanation:
            "De Morgan: NOT distributes across OR and flips it to AND.",
        },
      ],
    },
    {
      id: "3.6",
      title: "Conditionals",
      bigIdea: "AAP",
      summary:
        "IF / ELSE lets a program choose different code paths based on a boolean expression.",
      explanation:
        "A conditional runs a block of code only when a test is true. CSP pseudocode uses IF (condition) { … } ELSE { … }. The ELSE clause is optional. When tests are mutually exclusive and cover several cases, use ELSE IF to chain them without deep nesting. Each condition is a boolean expression (Unit 3.5).\n\nTracing a conditional is the most common CSP question pattern. The trick is to evaluate the boolean carefully, then pick the single branch that runs. Only one branch of an IF / ELSE runs per execution. If nothing matches an ELSE-less IF, the program simply moves on.\n\nStyle note: conditionals pair naturally with procedures. If you find an IF that wraps ten lines of code, consider moving that block into a procedure and calling it from the IF — that is the reusability lesson the exam quietly tests.",
      keyIdeas: [
        "IF (condition) { … } ELSE { … } — only one branch runs.",
        "ELSE is optional; IF alone skips its block when the test is false.",
        "Chain with ELSE IF when tests are mutually exclusive.",
        "Deep nesting is a red flag — consider extracting procedures.",
      ],
      commonMistakes: [
        "Running both branches of an IF / ELSE.",
        "Writing = (equality) versus ← (assignment) inside the condition.",
        "Expecting multiple IFs without ELSE to behave like ELSE IF.",
      ],
      interactives: [
        {
          id: "3.6.a",
          kind: "pseudocode",
          title: "Grade letter from a score",
          description:
            "Run the ladder. Edit the score and trace which branch executes.",
          pseudocode:
            "score ← 83\nIF (score ≥ 90)\n{\n    DISPLAY(\"A\")\n}\nELSE\n{\n    IF (score ≥ 80)\n    {\n        DISPLAY(\"B\")\n    }\n    ELSE\n    {\n        IF (score ≥ 70)\n        {\n            DISPLAY(\"C\")\n        }\n        ELSE\n        {\n            DISPLAY(\"F\")\n        }\n    }\n}",
          expectedOutput: "B",
          variations: [
            { prompt: "Set score to 69 and predict.", hint: "Fails A, B, C tests → F." },
            { prompt: "Set score to 100 and predict.", hint: "First test succeeds → A." },
          ],
        },
      ],
      flashcards: [
        { front: "How many branches of IF / ELSE run per call?", back: "Exactly one." },
        { front: "How do you chain exclusive tests?", back: "ELSE IF — or nested IF / ELSE — clauses." },
        { front: "What runs if no ELSE exists and the test is false?", back: "Nothing inside the IF; execution falls through." },
      ],
      practiceProblems: [
        {
          id: "3.6.p1",
          difficulty: "easy",
          prompt:
            "What prints?\n```\nx ← 5\nIF (x > 10)\n{\n    DISPLAY(\"big\")\n}\nELSE\n{\n    DISPLAY(\"small\")\n}\n```",
          answer: "small",
          explanation:
            "5 > 10 is false, so the ELSE branch runs.",
        },
        {
          id: "3.6.p2",
          difficulty: "medium",
          prompt:
            "What prints?\n```\ntemp ← 72\nIF (temp > 80)\n{\n    DISPLAY(\"hot\")\n}\nIF (temp > 60)\n{\n    DISPLAY(\"mild\")\n}\n```",
          answer: "mild",
          explanation:
            "The two IFs are independent (no ELSE). 72 > 80 is false, 72 > 60 is true.",
        },
      ],
    },
    {
      id: "3.7",
      title: "Nested Conditionals",
      bigIdea: "AAP",
      summary:
        "A conditional inside another conditional refines decisions — handy but easy to get wrong.",
      explanation:
        "Nested conditionals let you ask follow-up questions inside a branch. If the outer test fails, the inner test never runs. The exam loves trace questions that look deep but resolve quickly because most branches never execute.\n\nReading discipline: indent consistently, read the outer condition first, then read the chosen branch's inner condition. When tests are mutually exclusive across a spectrum (grades, ages, tax brackets), an ELSE IF chain is often clearer than deep nesting, but both are acceptable on the exam.\n\nCorrectness bugs most often come from overlapping ranges. If score ≥ 80 matches \"B\" and then the next branch also checks score ≥ 70, the \"C\" branch never runs even for an 89 — which is fine, because the \"B\" branch already took it. Double-check that every possible input maps to exactly one output before declaring a conditional \"done.\"",
      keyIdeas: [
        "Inner tests run only when the outer test admits them.",
        "Mutually exclusive branches keep the reader (and grader) oriented.",
        "Overlapping ranges are a design bug — audit each branch for unique inputs.",
      ],
      commonMistakes: [
        "Checking the same condition twice without chaining ELSE.",
        "Assuming the inner branch runs even when the outer test failed.",
        "Deep nesting that can be flattened with ELSE IF.",
      ],
      interactives: [
        {
          id: "3.7.a",
          kind: "trace",
          title: "Trace a nested age gate",
          description:
            "Walk through the trace for age = 17 and age = 21.",
          pseudocode:
            "1  age ← 17\n2  IF (age ≥ 18)\n3  {\n4      IF (age ≥ 21)\n5      {\n6          DISPLAY(\"adult, 21+\")\n7      }\n8      ELSE\n9      {\n10         DISPLAY(\"adult, under 21\")\n11     }\n12 }\n13 ELSE\n14 {\n15     DISPLAY(\"minor\")\n16 }",
          trace: [
            { line: 1, vars: { age: 17 } },
            { line: 2, vars: { "age ≥ 18": false } },
            { line: 15, vars: { printed: "minor" } },
          ],
          finalOutput: "minor",
          hints: [
            "The outer test fails, so both inner branches (lines 6, 10) never execute.",
            "Re-run mentally with age = 21 — outer true, inner true → line 6.",
          ],
        },
      ],
      flashcards: [
        { front: "What happens to inner IF tests when outer fails?", back: "They never run." },
        { front: "Alternative to deeply nested IFs?", back: "Flatten with ELSE IF when tests are mutually exclusive." },
      ],
      practiceProblems: [
        {
          id: "3.7.p1",
          difficulty: "medium",
          prompt:
            "Trace for score = 85:\n```\nIF (score ≥ 90)\n{\n    DISPLAY(\"A\")\n}\nELSE\n{\n    IF (score ≥ 80)\n    {\n        DISPLAY(\"B\")\n    }\n    ELSE\n    {\n        DISPLAY(\"C\")\n    }\n}\n```",
          answer: "B",
          explanation:
            "85 < 90, fall to ELSE. 85 ≥ 80, so inner IF runs and prints B.",
        },
      ],
    },
    {
      id: "3.8",
      title: "Iteration",
      bigIdea: "AAP",
      summary:
        "REPEAT n TIMES runs a block a fixed number of times; REPEAT UNTIL loops until a condition becomes true.",
      explanation:
        "Iteration automates repetition. AP CSP pseudocode has two forms. REPEAT n TIMES { … } runs the block exactly n times (n must be non-negative). REPEAT UNTIL (condition) { … } runs the block over and over, checking the condition after each pass, and stops once it is true. If the condition is true on the first check, the body has already run once — this is a subtle gotcha.\n\nCSP also supports FOR EACH item IN list { … }, which visits every list element in order. This is the exam's preferred way to iterate over a list; manual index arithmetic is rarely needed.\n\nInfinite loops happen when the loop condition never becomes true — usually because a counter is never updated or a condition compares the wrong variables. The fix is to ensure every REPEAT UNTIL makes measurable progress toward its exit condition.",
      keyIdeas: [
        "REPEAT n TIMES: fixed count, n must be a non-negative integer.",
        "REPEAT UNTIL (cond): runs at least once, then checks cond.",
        "FOR EACH visits every element of a list in order.",
        "Every loop must move toward its stopping condition.",
      ],
      commonMistakes: [
        "Forgetting that REPEAT UNTIL runs the body first, then tests.",
        "Modifying the loop variable inside a FOR EACH unexpectedly.",
        "Writing loops with a condition that never becomes true (infinite loop).",
      ],
      interactives: [
        {
          id: "3.8.a",
          kind: "pseudocode",
          title: "Count down with REPEAT UNTIL",
          description:
            "Decrement until the counter reaches 0. Notice that the body runs before the condition is checked.",
          pseudocode:
            "n ← 3\nREPEAT UNTIL (n = 0)\n{\n    DISPLAY(n)\n    n ← n - 1\n}\nDISPLAY(\"done\")",
          expectedOutput: "3\n2\n1\ndone",
          variations: [
            { prompt: "Set n to 0 before the loop. What prints?", hint: "Body runs once before condition is checked, so 0 then done." },
            {
              prompt: "Add a counter that sums all printed values.",
              hint: "Initialize total ← 0 and add n inside the loop.",
            },
          ],
        },
        {
          id: "3.8.b",
          kind: "pseudocode",
          title: "Sum a list with FOR EACH",
          description:
            "Idiomatic CSP pattern: accumulator + FOR EACH.",
          pseudocode:
            "nums ← [2, 4, 6, 8]\ntotal ← 0\nFOR EACH n IN nums\n{\n    total ← total + n\n}\nDISPLAY(total)",
          expectedOutput: "20",
        },
      ],
      flashcards: [
        { front: "Does REPEAT UNTIL run once even if the condition is already true?", back: "Yes — the condition is checked after the body." },
        { front: "Purpose of FOR EACH?", back: "Visit every element in a list in order without manual indexing." },
        { front: "What causes an infinite loop?", back: "A loop whose condition never becomes true — usually a missing counter update." },
      ],
      practiceProblems: [
        {
          id: "3.8.p1",
          difficulty: "easy",
          prompt:
            "How many times does this loop body run?\n```\nREPEAT 5 TIMES\n{\n    DISPLAY(\"hi\")\n}\n```",
          answer: "5",
          explanation: "REPEAT n TIMES runs the body exactly n times.",
        },
        {
          id: "3.8.p2",
          difficulty: "medium",
          prompt:
            "Trace:\n```\ni ← 1\ntotal ← 0\nREPEAT UNTIL (i > 4)\n{\n    total ← total + i\n    i ← i + 1\n}\nDISPLAY(total)\n```",
          answer: "10",
          explanation:
            "The loop adds 1, 2, 3, 4 to total (stopping when i becomes 5). 1+2+3+4 = 10.",
        },
      ],
    },
    {
      id: "3.9",
      title: "Developing Algorithms",
      bigIdea: "AAP",
      summary:
        "Algorithms combine sequencing, selection, and iteration. You can express the same algorithm with different combinations and compare them.",
      explanation:
        "An algorithm is a finite set of instructions that solves a problem. CSP claims every algorithm can be built from just three constructs: sequencing (one step after another), selection (IF / ELSE), and iteration (REPEAT / FOR EACH). When the exam asks whether a certain control flow is \"expressible,\" the safe answer is yes — these three building blocks are complete.\n\nDeveloping algorithms is a design exercise. Start with the problem statement and the example inputs/outputs. Sketch the steps in English, then convert them to pseudocode. Test with the smallest possible input (often an empty list), the example from the problem, and a big input. The exam rewards students who can compare two algorithms that solve the same task and pick the clearer or more efficient one.\n\nMultiple correct algorithms may exist for the same problem. A \"largest in a list\" problem can scan once keeping a running maximum, sort and take the last element, or recursively split the list. All are correct; they differ in effort, clarity, and efficiency (3.17).",
      keyIdeas: [
        "Sequencing, selection, iteration — the three building blocks of every algorithm.",
        "Design with example inputs and trace them by hand before coding.",
        "Multiple correct algorithms can solve the same problem.",
      ],
      commonMistakes: [
        "Assuming a single correct algorithm per problem.",
        "Skipping the hand-trace step and debugging by guessing.",
        "Choosing the shortest code over the clearest.",
      ],
      interactives: [
        {
          id: "3.9.a",
          kind: "pseudocode",
          title: "Find the maximum of a list",
          description:
            "Classic single-pass algorithm. Initialize max with the first element; compare against each subsequent element.",
          pseudocode:
            "nums ← [4, 9, 2, 11, 7]\nmax ← nums[1]\nFOR EACH n IN nums\n{\n    IF (n > max)\n    {\n        max ← n\n    }\n}\nDISPLAY(max)",
          expectedOutput: "11",
          variations: [
            {
              prompt: "Rewrite to find the MINIMUM instead.",
              hint: "Flip the comparison (n < min) and initialize min to nums[1].",
            },
            {
              prompt: "What happens if the list is empty?",
              hint: "nums[1] is invalid — your algorithm should guard with IF (LENGTH(nums) = 0).",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Three building blocks of algorithms?", back: "Sequencing, selection, iteration." },
        { front: "Why start with the smallest input in testing?", back: "Edge cases like empty lists expose missing guards." },
        { front: "Is there one right algorithm per problem?", back: "No — multiple correct algorithms may exist; they differ in clarity and efficiency." },
      ],
      practiceProblems: [
        {
          id: "3.9.p1",
          difficulty: "medium",
          prompt:
            "Which algorithms correctly return the smallest number in a non-empty list nums?\nI.  Initialize min ← nums[1], compare each element, update when smaller.\nII. Sort the list and return the first element.\nIII. Return the element where the count of smaller elements equals zero.",
          choices: ["I only", "I and II", "II and III", "I, II, and III"],
          answer: "I, II, and III",
          explanation:
            "All three strategies return the correct minimum. They differ in efficiency and complexity but not correctness.",
        },
      ],
    },
    {
      id: "3.10",
      title: "Lists",
      bigIdea: "AAP",
      summary:
        "Lists hold ordered collections of values. CSP supports APPEND, INSERT, REMOVE, ACCESS, and LENGTH.",
      explanation:
        "A list keeps values in a specific order and lets the program grow or shrink the collection as the program runs. CSP pseudocode supports APPEND(list, value) to add to the end, INSERT(list, i, value) to put a value at 1-indexed position i (shifting later items), REMOVE(list, i) to delete the value at position i (closing the gap), and list[i] for direct access. All of these are built in — you do not need to write them yourself.\n\nThe exam tests index arithmetic heavily. Because CSP is 1-indexed, the last element of list is list[LENGTH(list)]. Off-by-one errors almost always come from forgetting that detail. Be especially careful after INSERT or REMOVE — the indices of surrounding elements shift.\n\nLists can hold mixed types in pseudocode, but typical exam problems use lists of numbers or strings. FOR EACH is the cleanest way to visit every element; use a counter-based REPEAT only when you need the index itself, e.g., to report \"the 3rd score.\"",
      keyIdeas: [
        "APPEND adds to the end; INSERT places at a specific index; REMOVE deletes at a specific index.",
        "Last element is list[LENGTH(list)].",
        "INSERT shifts every later element's index up by one.",
        "REMOVE shifts every later element's index down by one.",
      ],
      commonMistakes: [
        "Forgetting that CSP is 1-indexed.",
        "Not updating a loop counter after a REMOVE — you may skip or revisit elements.",
        "Confusing APPEND (end) with INSERT (any index).",
      ],
      interactives: [
        {
          id: "3.10.a",
          kind: "list",
          title: "Insert, append, and remove",
          description:
            "Play each operation in order and watch the indices shift.",
          initial: ["apple", "banana", "cherry"],
          ops: [
            { op: "APPEND", value: "date", note: "List is now 4 long: apple, banana, cherry, date." },
            { op: "INSERT", index: 2, value: "apricot", note: "Inserted at index 2: apple, apricot, banana, cherry, date. banana is now index 3." },
            { op: "REMOVE", index: 4, note: "Removed cherry: apple, apricot, banana, date. date is now index 4." },
            { op: "ACCESS", index: 1, note: "list[1] is apple." },
          ],
        },
      ],
      flashcards: [
        { front: "What does INSERT(list, 2, x) do?", back: "Places x at index 2; everything at index 2 and later shifts up." },
        { front: "Which operation does not shift indices?", back: "APPEND — it only adds to the end." },
        { front: "How do you access the last element?", back: "list[LENGTH(list)]." },
      ],
      practiceProblems: [
        {
          id: "3.10.p1",
          difficulty: "easy",
          prompt:
            "After list ← [1,2,3,4] and REMOVE(list, 2), what is list?",
          choices: ["[1,3,4]", "[2,3,4]", "[1,2,4]", "[1,2,3]"],
          answer: "[1,3,4]",
          explanation:
            "REMOVE at index 2 deletes the value 2 and closes the gap.",
        },
        {
          id: "3.10.p2",
          difficulty: "medium",
          prompt:
            "What is list after:\n```\nlist ← [10, 20, 30]\nINSERT(list, 2, 15)\nAPPEND(list, 40)\n```",
          answer: "[10, 15, 20, 30, 40]",
          explanation:
            "INSERT puts 15 at index 2, shifting 20 and 30 right. APPEND adds 40 at the end.",
        },
      ],
    },
    {
      id: "3.11",
      title: "Binary Search",
      bigIdea: "AAP",
      summary:
        "Binary search repeatedly halves a sorted list until the target is found. Much faster than linear search, but requires a sorted input.",
      explanation:
        "Given a sorted list, binary search checks the middle element. If it matches, return the index. If the target is smaller, search only the left half; if larger, search only the right half. Each step eliminates half the remaining candidates, so the number of steps grows like log₂(n). A list of 1024 items takes about 10 steps; a billion items takes 30. Linear search on the same data would take up to 1024 or 1,000,000,000.\n\nThe exam assumes binary search requires sorted input — if the list is unsorted, binary search can miss the target. Linear search (FOR EACH comparing) works on any order but is slower. Expect questions that ask which algorithm is appropriate for a given scenario.\n\nBinary search can fail in two ways: the target is not in the list (the remaining window shrinks to empty → return \"not found\"), or the list was not actually sorted. Both are standard exam distractors.",
      keyIdeas: [
        "Binary search requires a sorted list.",
        "Each step halves the search space — O(log n).",
        "Linear search works on any order but grows with n.",
        "Return \"not found\" when the window shrinks to empty.",
      ],
      commonMistakes: [
        "Applying binary search to an unsorted list.",
        "Forgetting to exclude the midpoint when narrowing the window.",
        "Counting the work as n/2 instead of log₂(n).",
      ],
      interactives: [
        {
          id: "3.11.a",
          kind: "pseudocode",
          title: "Binary search for a target",
          description:
            "Walk through binary search. Change target to an element not in the list and trace the \"not found\" case.",
          pseudocode:
            "nums   ← [2, 4, 7, 10, 14, 21, 33, 40, 58]\ntarget ← 21\nlow    ← 1\nhigh   ← LENGTH(nums)\nfound  ← -1\n\nREPEAT UNTIL (low > high OR found ≠ -1)\n{\n    mid ← (low + high) / 2\n    IF (nums[mid] = target)\n    {\n        found ← mid\n    }\n    ELSE\n    {\n        IF (nums[mid] < target)\n        {\n            low ← mid + 1\n        }\n        ELSE\n        {\n            high ← mid - 1\n        }\n    }\n}\n\nDISPLAY(found)",
          expectedOutput: "6",
          variations: [
            { prompt: "Change target to 100.", hint: "Never matches; loop ends with found = -1." },
            {
              prompt: "Change target to 40.",
              hint: "Mid starts at 5 (14), then narrows right: 7 (33) then 8 (40) → found = 8.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Precondition for binary search?", back: "The list must be sorted." },
        { front: "Cost growth of binary search?", back: "O(log n) — each step halves the search space." },
        { front: "When does binary search return not-found?", back: "When the low/high window becomes empty (low > high)." },
      ],
      practiceProblems: [
        {
          id: "3.11.p1",
          difficulty: "easy",
          prompt:
            "About how many steps does binary search take on a sorted list of 1,000 items?",
          choices: ["~3", "~10", "~100", "~1000"],
          answer: "~10",
          explanation:
            "log₂(1000) ≈ 10. Each step halves the remaining 1,000 candidates.",
        },
        {
          id: "3.11.p2",
          difficulty: "medium",
          prompt:
            "A student runs binary search on the list [5, 3, 8, 1, 9]. What is the concern?",
          choices: [
            "None — binary search works on any list.",
            "The list is unsorted — binary search can miss the target.",
            "Binary search cannot run on integers.",
            "The list is too short.",
          ],
          answer:
            "The list is unsorted — binary search can miss the target.",
          explanation:
            "Binary search's correctness depends on order. Sort first or use linear search.",
        },
      ],
    },
    {
      id: "3.12",
      title: "Calling Procedures",
      bigIdea: "AAP",
      summary:
        "A procedure runs code under a name. Calling it substitutes the arguments for the parameters and returns a value (or just runs).",
      explanation:
        "A procedure is a named block of code that accepts parameters and optionally returns a value. Calling a procedure looks like name(arg1, arg2). When the call is made, each argument is paired with the matching parameter by position. The procedure's body runs with those parameters bound to the argument values, and when it hits RETURN value, control jumps back to the caller with that value in hand.\n\nCSP separates parameter (name used inside the procedure) from argument (value passed in). The exam deliberately reuses the same variable name for both to confuse you: if the outer scope has x ← 5 and the procedure has parameter x, assigning to x inside the procedure does not change the outer x. CSP pseudocode is call-by-value for primitives on the exam.\n\nProcedures that do not RETURN just run. DISPLAY is a built-in procedure that prints. LENGTH is a built-in that returns. Always check the procedure's signature before calling so you pass the right number and order of arguments.",
      keyIdeas: [
        "Parameters are named inside the procedure; arguments are the values passed in.",
        "Arguments bind to parameters by position.",
        "RETURN sends a value back to the caller and exits the procedure.",
        "Local parameter assignments do not leak into the caller's scope.",
      ],
      commonMistakes: [
        "Mixing up parameter and argument order.",
        "Expecting a procedure to change the caller's variables by reassigning a parameter.",
        "Forgetting that a procedure without RETURN yields no usable value.",
      ],
      interactives: [
        {
          id: "3.12.a",
          kind: "procedure",
          title: "Area of a rectangle",
          description:
            "Call the procedure with different arguments and see the returned value.",
          pseudocode:
            "PROCEDURE area(w, h)\n{\n    RETURN w * h\n}",
          calls: [
            { call: "area(3, 4)", returns: "12", note: "3 × 4." },
            { call: "area(10, 2)", returns: "20", note: "Swap which side is first — same answer for a product." },
            { call: "area(0, 5)", returns: "0", note: "Zero width → area 0." },
          ],
        },
      ],
      flashcards: [
        { front: "Parameter vs argument?", back: "Parameters are the names inside the procedure; arguments are the values passed in at the call." },
        { front: "What does RETURN do?", back: "Exits the procedure and sends a value back to the caller." },
        { front: "Do procedures implicitly change caller variables?", back: "No — assigning to a parameter does not change the caller's matching variable." },
      ],
      practiceProblems: [
        {
          id: "3.12.p1",
          difficulty: "easy",
          prompt:
            "Given\n```\nPROCEDURE double(x)\n{\n    RETURN 2 * x\n}\n```\nwhat is double(7)?",
          answer: "14",
          explanation: "x is bound to 7; 2*7 = 14.",
        },
        {
          id: "3.12.p2",
          difficulty: "medium",
          prompt:
            "Trace:\n```\nx ← 5\nPROCEDURE reset(x)\n{\n    x ← 0\n}\nreset(x)\nDISPLAY(x)\n```",
          answer: "5",
          explanation:
            "The parameter x inside reset shadows the outer x. Reassigning it does not modify the caller's variable.",
        },
      ],
    },
    {
      id: "3.13",
      title: "Developing Procedures",
      bigIdea: "AAP",
      summary:
        "Procedures let you manage complexity: name a reusable operation once and call it from many places.",
      explanation:
        "Writing your own procedures is procedural abstraction. When you notice the same handful of lines repeating, factor them into a procedure with parameters for the things that vary. The rest of the program calls the procedure by name, and a single fix to the procedure propagates everywhere. This is the CSP definition of managing complexity.\n\nGood procedures have clear names (verbs for actions: drawCircle; nouns for values: averageGrade), a short list of parameters, and a single purpose. A procedure that reads as \"compute the average and print it and email the teacher\" is doing three jobs — split it.\n\nThe exam tests procedure design by asking what the effect of a missing parameter is, or which of several proposed procedure signatures best fits a use case. The right answer is usually the one with the fewest parameters that still lets the procedure be reused across the needed cases.",
      keyIdeas: [
        "Procedural abstraction: name reusable logic so callers need not know the details.",
        "Good procedures do one thing and have short parameter lists.",
        "Fixing a bug in one procedure fixes every call site.",
        "Duplicated code is a signal that a procedure is missing.",
      ],
      commonMistakes: [
        "Writing one long procedure that does multiple unrelated things.",
        "Hardcoding values that should be parameters.",
        "Creating procedures nobody calls (over-abstraction).",
      ],
      interactives: [
        {
          id: "3.13.a",
          kind: "procedure",
          title: "Write a fareCalculator",
          description:
            "A ride-share app needs a fare = base + perMile * miles + perMinute * minutes. Define the procedure, then call it for three rides.",
          pseudocode:
            "PROCEDURE fareCalculator(base, perMile, miles, perMinute, minutes)\n{\n    RETURN base + perMile * miles + perMinute * minutes\n}",
          calls: [
            { call: "fareCalculator(2.5, 1.25, 4, 0.3, 12)", returns: "11.1", note: "2.5 + 5 + 3.6" },
            { call: "fareCalculator(3, 2, 0, 0.5, 0)", returns: "3", note: "No miles, no minutes → base only." },
            { call: "fareCalculator(0, 2, 10, 0.4, 5)", returns: "22", note: "0 + 20 + 2." },
          ],
        },
      ],
      flashcards: [
        { front: "Define procedural abstraction.", back: "Naming a reusable block of logic so callers don't need its internals." },
        { front: "Sign a procedure is missing?", back: "The same block of code repeats across the program." },
        { front: "Ideal parameter count?", back: "The smallest number that still lets the procedure handle every needed case." },
      ],
      practiceProblems: [
        {
          id: "3.13.p1",
          difficulty: "medium",
          prompt:
            "A program prints a weekly report three times, each 20 lines of identical code except for the week number. What CSP practice applies?",
          choices: [
            "Copy the 60 lines and keep three versions.",
            "Factor the shared logic into a procedure weeklyReport(weekNumber).",
            "Use three separate variables.",
            "Switch to binary search.",
          ],
          answer:
            "Factor the shared logic into a procedure weeklyReport(weekNumber).",
          explanation:
            "Procedural abstraction replaces repetition with one callable routine parameterized by what differs.",
        },
      ],
    },
    {
      id: "3.14",
      title: "Libraries",
      bigIdea: "AAP",
      summary:
        "A library is a collection of reusable procedures written by someone else; APIs describe how to call them.",
      explanation:
        "Libraries extend a program with pre-written procedures. You call them by name just like your own procedures, but the implementation lives elsewhere. An Application Program Interface (API) is the contract: the name, parameters, return value, and behavior you can rely on without reading the source. Good APIs are stable: if the library maintainer changes the interface, callers break.\n\nFor the exam, recognize that libraries save time and improve reliability. You do not have to rewrite sqrt, sort, or draw a circle — a tested library does it. CSP's own reference sheet is effectively a small standard library (LENGTH, APPEND, RANDOM). Real-world CS uses vastly larger libraries (React, NumPy, TensorFlow), but the principle is the same.\n\nLibraries also raise concerns. A library you include runs in your program — if it is buggy or malicious, your program inherits those problems. This connects to Unit 5: trust, licensing, and the responsibility of the programmer who includes external code.",
      keyIdeas: [
        "A library is a bundle of reusable procedures.",
        "An API is the set of signatures and behaviors callers depend on.",
        "Libraries save development time and improve reliability.",
        "Using a library also means trusting its correctness and security.",
      ],
      commonMistakes: [
        "Reinventing a procedure that a well-tested library already provides.",
        "Treating \"the library does it\" as a guarantee without reading docs.",
        "Forgetting that library code runs with the same privileges as yours.",
      ],
      interactives: [
        {
          id: "3.14.a",
          kind: "procedure",
          title: "Library-provided RANDOM",
          description:
            "RANDOM(a, b) returns an integer in [a, b] inclusive. It behaves like any procedure — the implementation is hidden.",
          pseudocode:
            "// From CSP's reference library:\n// RANDOM(a, b) returns an integer in [a, b] inclusive.",
          calls: [
            { call: "RANDOM(1, 6)", returns: "a value in {1,2,3,4,5,6}", note: "Model a single die roll." },
            { call: "RANDOM(0, 1)", returns: "0 or 1", note: "Model a coin flip." },
            { call: "RANDOM(1, 100)", returns: "a value in [1,100]", note: "Useful in simulations (3.16)." },
          ],
        },
      ],
      flashcards: [
        { front: "Define API.", back: "The set of procedure signatures and documented behaviors a caller can rely on." },
        { front: "Why use a library?", back: "Saves time, reduces bugs, and lets you focus on your program's unique purpose." },
        { front: "Risk of using a library?", back: "You inherit its correctness, licensing, and security properties." },
      ],
      practiceProblems: [
        {
          id: "3.14.p1",
          difficulty: "easy",
          prompt:
            "Which best describes an API?",
          choices: [
            "The internal source code of a library.",
            "A documented contract (names, parameters, return types) that callers rely on.",
            "Any program that uses randomness.",
            "A type of network protocol.",
          ],
          answer:
            "A documented contract (names, parameters, return types) that callers rely on.",
          explanation:
            "APIs expose only what callers need. The internals can change as long as the contract stays the same.",
        },
      ],
    },
    {
      id: "3.15",
      title: "Random Values",
      bigIdea: "AAP",
      summary:
        "RANDOM(a, b) returns an integer in [a, b]. Randomness powers games, simulations, and statistical sampling.",
      explanation:
        "Randomness lets programs simulate events whose outcomes are uncertain: dice, card draws, weather models. CSP's RANDOM(a, b) returns an integer between a and b inclusive; each call is independent of previous calls. Use RANDOM(1, 6) to model a die or RANDOM(0, 1) to flip a coin.\n\nThe exam highlights one property of randomness: independence. If you flipped five heads in a row, RANDOM(0, 1) still has a 50% chance of heads on the next call. Assuming otherwise is the gambler's fallacy — a popular multiple-choice distractor.\n\nYou can combine randomness with IFs to weight outcomes unevenly. If RANDOM(1, 100) ≤ 25 fires 25% of the time. That pattern underpins the simulations in 3.16.",
      keyIdeas: [
        "RANDOM(a, b) is inclusive on both ends.",
        "Calls are independent — past results do not change future odds.",
        "Use ranges and IFs to build weighted outcomes.",
      ],
      commonMistakes: [
        "Assuming RANDOM remembers previous results.",
        "Using RANDOM(1, 6) and expecting an average of 3 (it's 3.5).",
        "Confusing inclusive and exclusive bounds.",
      ],
      interactives: [
        {
          id: "3.15.a",
          kind: "pseudocode",
          title: "Weighted coin",
          description:
            "Make heads come up 70% of the time using RANDOM(1, 100).",
          pseudocode:
            "roll ← RANDOM(1, 100)\nIF (roll ≤ 70)\n{\n    DISPLAY(\"heads\")\n}\nELSE\n{\n    DISPLAY(\"tails\")\n}",
          expectedOutput: "(heads or tails depending on roll)",
          variations: [
            {
              prompt: "Change the weighting to 50/50.",
              hint: "Compare roll ≤ 50.",
            },
            {
              prompt: "Add a third outcome \"edge\" with 1% probability.",
              hint: "Add an IF at the top for roll = 1 → \"edge\".",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Are RANDOM's endpoints inclusive?", back: "Yes — both a and b are possible results." },
        { front: "Does RANDOM remember prior calls?", back: "No — each call is independent." },
        { front: "How do you make a 30% chance event?", back: "IF (RANDOM(1, 100) ≤ 30) { … }." },
      ],
      practiceProblems: [
        {
          id: "3.15.p1",
          difficulty: "easy",
          prompt: "RANDOM(1, 4) can return which values?",
          choices: ["1, 2, 3", "1, 2, 3, 4", "0, 1, 2, 3, 4", "Any real number between 1 and 4"],
          answer: "1, 2, 3, 4",
          explanation: "Both endpoints are included; RANDOM returns integers.",
        },
        {
          id: "3.15.p2",
          difficulty: "medium",
          prompt:
            "You flipped RANDOM(0, 1) and got five 1s in a row. What is the probability of a 1 on the next call?",
          choices: ["0.5", "0.0", "1.0", "0.03"],
          answer: "0.5",
          explanation:
            "Each call is independent. Past results do not change future odds.",
        },
      ],
    },
    {
      id: "3.16",
      title: "Simulations",
      bigIdea: "AAP",
      summary:
        "A simulation is a program that models a real-world process, often using randomness to approximate probabilities.",
      explanation:
        "Simulations explore scenarios that are expensive or impossible to study directly: hurricane paths, virus spread, stock returns. A CSP-style simulation usually combines a loop (run the trial many times), randomness (model uncertain events), and aggregation (count outcomes, compute an average). The more trials you run, the closer your estimate approaches the true probability — this is the intuition behind Monte Carlo methods.\n\nSimulations trade fidelity for tractability. A hurricane simulation uses a simplified physics model; a traffic simulation abstracts each driver as a simple agent. That abstraction is intentional and testable: if the model captures the important variables, its predictions are useful even when it omits small details.\n\nExam questions ask you to identify what a simulation is modeling, what makes its output reliable (trial count, unbiased randomness), and when a simulation is appropriate (when direct experimentation is impractical or unsafe).",
      keyIdeas: [
        "A simulation models a real process using simpler rules and often randomness.",
        "More trials usually produce more accurate estimates.",
        "Simulations abstract away detail; the abstraction must preserve what matters.",
        "Use simulations when direct experimentation is too expensive, slow, or unsafe.",
      ],
      commonMistakes: [
        "Drawing conclusions from a single trial.",
        "Assuming a simulation is more accurate than its underlying model.",
        "Confusing correlation in simulated results with causation.",
      ],
      interactives: [
        {
          id: "3.16.a",
          kind: "simulation",
          title: "Coin-flip fairness",
          description:
            "Simulate flipping a coin n times and reporting the fraction of heads. Vary n to see the estimate converge on 0.5.",
          pseudocode:
            "heads ← 0\ntrials ← n\nREPEAT n TIMES\n{\n    IF (RANDOM(0, 1) = 1)\n    {\n        heads ← heads + 1\n    }\n}\nDISPLAY(heads / trials)",
          parameters: [
            { name: "n", defaultValue: 100, min: 10, max: 10000 },
          ],
          sampleRun: [
            { trial: 10, result: "0.40" },
            { trial: 100, result: "0.51" },
            { trial: 1000, result: "0.497" },
            { trial: 10000, result: "0.5013" },
          ],
        },
      ],
      flashcards: [
        { front: "Why use a simulation?", back: "To study a process that is too expensive, slow, or unsafe to test directly." },
        { front: "What happens to estimated probabilities as trial count grows?", back: "They converge on the true probability." },
        { front: "Can a simulation be \"more accurate\" than its model?", back: "No — its accuracy is capped by how well the model reflects reality." },
      ],
      practiceProblems: [
        {
          id: "3.16.p1",
          difficulty: "easy",
          prompt:
            "Which is the clearest benefit of running a simulation?",
          choices: [
            "You can study a process without performing it in the real world.",
            "The simulation always produces the exact real-world outcome.",
            "The simulation requires no code.",
            "Simulations are faster than any physical experiment.",
          ],
          answer:
            "You can study a process without performing it in the real world.",
          explanation:
            "Simulations let you explore safely and cheaply. They approximate reality rather than duplicate it.",
        },
      ],
    },
    {
      id: "3.17",
      title: "Algorithmic Efficiency",
      bigIdea: "AAP",
      summary:
        "Efficiency measures how work scales with input size. CSP distinguishes \"reasonable\" polynomial-time algorithms from \"unreasonable\" exponential ones.",
      explanation:
        "Efficiency asks: if I double the input, how much longer does the algorithm run? CSP classifies algorithms informally by growth class. Constant time (does the same work regardless of input). Linear time (grows with n). Polynomial time (grows like n², n³, …). Exponential time (grows like 2ⁿ). Exponential time blows up so fast that it quickly becomes impractical — a CSP-level algorithm that takes 2⁶⁰ steps would not finish in a human lifetime.\n\nCSP's vocabulary on this topic is \"reasonable time\" vs \"unreasonable time.\" Reasonable time = polynomial (n, n², n³). Unreasonable time = exponential (2ⁿ) or worse. Problems that can only be solved in unreasonable time are still \"solvable,\" but practically intractable — approximations and heuristics are used instead.\n\nExam questions often show two algorithms solving the same problem and ask which is more efficient or which scales better. Look for extra nested loops (n²) or doubling (2ⁿ). Watch for the word \"every subset\" — subsets grow exponentially.",
      keyIdeas: [
        "Growth classes: constant, linear, polynomial, exponential.",
        "Reasonable time = polynomial. Unreasonable time = exponential or worse.",
        "Nested loops over the same list are a sign of polynomial growth.",
        "Generating \"all subsets\" is exponential (2ⁿ).",
      ],
      commonMistakes: [
        "Conflating \"slow\" with \"unreasonable\" — a linear algorithm on a huge input is still reasonable.",
        "Ignoring the outer loop when counting nested work.",
        "Thinking exponential algorithms are \"wrong\" — they are just impractical at scale.",
      ],
      interactives: [
        {
          id: "3.17.a",
          kind: "efficiency",
          title: "Growth comparison",
          description:
            "Compare the work four algorithms do as n grows from 10 to 1000. Notice how exponential dwarfs everything else.",
          rows: [
            { label: "Lookup in a fixed-size table", growth: "constant", ops10: 1, ops100: 1, ops1000: 1, note: "Runs in the same time no matter how large the input is." },
            { label: "Scan a list (linear search)", growth: "linear", ops10: 10, ops100: 100, ops1000: 1000, note: "Work scales 1:1 with n." },
            { label: "Compare every pair (nested loops)", growth: "quadratic", ops10: 100, ops100: 10000, ops1000: 1000000, note: "Every extra element multiplies the work." },
            { label: "Try every subset", growth: "exponential", ops10: 1024, ops100: "~10³⁰", ops1000: "astronomical", note: "Unreasonable time — infeasible for moderate n." },
          ],
        },
      ],
      flashcards: [
        { front: "What counts as reasonable time in CSP?", back: "Polynomial time — n, n², n³, … — regardless of the exponent." },
        { front: "What counts as unreasonable time?", back: "Exponential (2ⁿ) or worse." },
        { front: "How many subsets does an n-element set have?", back: "2ⁿ — exponential growth." },
      ],
      practiceProblems: [
        {
          id: "3.17.p1",
          difficulty: "medium",
          prompt:
            "Which algorithm is least likely to be considered reasonable for large inputs?",
          choices: [
            "Linear search on a list.",
            "Binary search on a sorted list.",
            "Listing every subset of an n-item set.",
            "Summing the elements of a list.",
          ],
          answer: "Listing every subset of an n-item set.",
          explanation:
            "Subsets grow as 2ⁿ — exponential — which CSP classifies as unreasonable time.",
        },
        {
          id: "3.17.p2",
          difficulty: "medium",
          prompt:
            "An algorithm has a loop from 1 to n that contains a loop from 1 to n. How does the work scale?",
          choices: ["Constant", "Linear (n)", "Quadratic (n²)", "Exponential (2ⁿ)"],
          answer: "Quadratic (n²)",
          explanation:
            "Each outer pass does n inner iterations → n·n = n² total work.",
        },
      ],
    },
    {
      id: "3.18",
      title: "Undecidable Problems",
      bigIdea: "AAP",
      summary:
        "Some problems cannot be solved by any algorithm in every case. Heuristics provide good-enough answers for hard problems.",
      explanation:
        "Not every problem is decidable. An undecidable problem is one for which no algorithm can, in every case, return a correct yes/no answer. The classic example is the halting problem: given any program and input, decide whether it eventually stops. Alan Turing proved that no general algorithm can answer this for all programs. Undecidable does not mean \"hard\" — it means provably impossible in full generality.\n\nAlongside undecidable problems, CSP talks about problems that are decidable but too expensive to solve exactly (unreasonable time, 3.17). For those, programmers use heuristics — rules of thumb that give good enough answers quickly, though not always optimal. GPS traffic routing, spam filtering, and game-playing AIs all use heuristics.\n\nThe exam will contrast decidable vs undecidable and ask when a heuristic is appropriate. Heuristics are the right call when (a) optimal solutions cost too much to compute, and (b) a near-optimal answer is still useful.",
      keyIdeas: [
        "Undecidable: no algorithm can solve every instance of the problem.",
        "Halting problem is the canonical undecidable example.",
        "Heuristics give good-enough answers to hard problems quickly.",
        "Decidable + unreasonable time is different from undecidable.",
      ],
      commonMistakes: [
        "Equating \"hard\" with \"undecidable.\"",
        "Assuming a heuristic is always correct.",
        "Confusing \"the problem is undecidable\" with \"the program crashed.\"",
      ],
      interactives: [
        {
          id: "3.18.a",
          kind: "ethics",
          title: "Pick the right tool for the problem",
          description:
            "A shipping company wants the cheapest route through 40 cities. Which approach matches AP CSP's take?",
          scenario:
            "Finding the absolute shortest route through 40 cities (the Traveling Salesperson Problem) requires checking all orderings — that grows faster than exponential.",
          choices: [
            {
              label: "A",
              text: "Compute the exact optimal route by checking every ordering, no matter how long it takes.",
              correct: false,
              reasoning:
                "40! orderings is astronomically large. Exact computation is impractical — CSP calls this unreasonable time.",
            },
            {
              label: "B",
              text: "Use a heuristic (e.g. nearest-neighbor, 2-opt) to get a good route quickly, accepting that it may not be optimal.",
              correct: true,
              reasoning:
                "When optimal is infeasible, heuristics provide good enough answers. This is the standard CSP response to hard problems.",
            },
            {
              label: "C",
              text: "Declare the problem undecidable and refuse to answer.",
              correct: false,
              reasoning:
                "TSP is decidable — it is just expensive to solve exactly. Undecidability is a different, stronger claim.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Define undecidable.", back: "No algorithm can solve every instance of the problem, even in principle." },
        { front: "Example of undecidability?", back: "The halting problem — deciding whether an arbitrary program halts." },
        { front: "Why use a heuristic?", back: "When exact solutions are too expensive but a near-optimal answer is still useful." },
      ],
      practiceProblems: [
        {
          id: "3.18.p1",
          difficulty: "medium",
          prompt:
            "Which statement is TRUE?",
          choices: [
            "Every decidable problem can be solved in reasonable time.",
            "Heuristics always find the optimal answer.",
            "An undecidable problem has no algorithm that solves every instance.",
            "The halting problem can be solved with enough memory.",
          ],
          answer:
            "An undecidable problem has no algorithm that solves every instance.",
          explanation:
            "Decidability is about whether an algorithm exists at all. Time efficiency is a separate property.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 4 — COMPUTER SYSTEMS AND NETWORKS (11–15% of exam, Big Idea CSN)
// =============================================================================
AP_COMPUTER_SCIENCE_PRINCIPLES.units.push({
  number: 4,
  title: "Computer Systems and Networks",
  bigIdea: "CSN",
  examWeight: "11–15% of exam",
  overview:
    "Unit 4 covers how the Internet and distributed systems actually move data. Expect questions about packets, routing, protocols (TCP/IP, HTTP, DNS), redundancy, fault tolerance, and how parallel and distributed computing speed up programs. Concept-heavy: there are almost no code traces here, but diagrams and simulations matter.",
  topics: [
    {
      id: "4.1",
      title: "The Internet",
      bigIdea: "CSN",
      summary:
        "The Internet is a network of networks that moves data as packets using layered protocols (TCP/IP). DNS turns names into addresses; HTTP carries web requests.",
      explanation:
        "The Internet works because every device agrees on a stack of protocols. An IP address identifies a device (IPv4: 32 bits, written like 192.168.1.5; IPv6: 128 bits). Data sent between devices is broken into packets: small units carrying a piece of the payload plus a header with source, destination, and sequence information. Packets may take different paths through the network; the receiver's TCP layer reassembles them in order and asks for retransmission of any that went missing.\n\nDomain Name System (DNS) maps human-readable names (finalsprep.app) to IP addresses. When you type a URL, your device asks a DNS resolver, gets back an IP address, and then opens a TCP/IP connection to that address. HTTP is the application-layer protocol the browser and server speak over that connection. HTTPS adds TLS encryption so intermediate routers cannot read the traffic.\n\nThe Internet is decentralized: no single router knows the whole path a packet will take. Routers forward based on local routing tables, and if one route is congested or down, packets are routed around it. This is the property 4.2 builds on.",
      keyIdeas: [
        "Data moves as packets with headers (source, destination, sequence).",
        "IP addresses identify devices; DNS maps names to addresses.",
        "TCP provides reliable, ordered delivery on top of IP.",
        "The Internet is decentralized: routers make local decisions.",
      ],
      commonMistakes: [
        "Assuming every packet of a message follows the same path.",
        "Mixing up IP (addressing) with TCP (reliable delivery) or HTTP (application).",
        "Thinking DNS stores web-page content — it only stores name→IP mappings.",
      ],
      interactives: [
        {
          id: "4.1.a",
          kind: "network",
          title: "Route a packet through a mesh",
          description:
            "Follow a packet from A to F across multiple routers. Notice that multiple paths exist.",
          nodes: ["A", "B", "C", "D", "E", "F"],
          edges: [
            { from: "A", to: "B" },
            { from: "A", to: "C" },
            { from: "B", to: "D" },
            { from: "C", to: "D" },
            { from: "C", to: "E" },
            { from: "D", to: "F" },
            { from: "E", to: "F" },
          ],
          scenarios: [
            {
              from: "A",
              to: "F",
              expectedPath: ["A", "B", "D", "F"],
              note: "A router at each hop forwards toward F. Any path of 3 hops works.",
            },
            {
              from: "A",
              to: "F",
              expectedPath: ["A", "C", "E", "F"],
              note: "A valid alternate path. Real routers may pick either based on load.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "What does TCP provide that IP does not?", back: "Reliable, ordered delivery with retransmission of lost packets." },
        { front: "What does DNS do?", back: "Translates human-readable names into IP addresses." },
        { front: "Do all packets of a message take the same route?", back: "Not necessarily — routers make independent forwarding decisions." },
      ],
      practiceProblems: [
        {
          id: "4.1.p1",
          difficulty: "easy",
          prompt:
            "What best describes a packet?",
          choices: [
            "A complete message sent in one piece.",
            "A small unit of data with a header (addressing) and a payload.",
            "A type of hardware router.",
            "The speed of a network connection.",
          ],
          answer:
            "A small unit of data with a header (addressing) and a payload.",
          explanation:
            "Large messages are split into packets, each with routing information. Packets travel independently and are reassembled at the destination.",
        },
        {
          id: "4.1.p2",
          difficulty: "medium",
          prompt:
            "Why is the Internet described as decentralized?",
          choices: [
            "Every router must know every other router.",
            "One central server decides every packet's path.",
            "Routers forward packets based on local information; no central authority controls every path.",
            "Because IP addresses are public.",
          ],
          answer:
            "Routers forward packets based on local information; no central authority controls every path.",
          explanation:
            "Decentralization is what makes the Internet fault-tolerant — routers adapt to local failures without a single bottleneck.",
        },
      ],
    },
    {
      id: "4.2",
      title: "Fault Tolerance",
      bigIdea: "CSN",
      summary:
        "Redundancy keeps systems running when parts fail. Multiple paths, servers, and copies provide fault tolerance.",
      explanation:
        "A fault-tolerant system continues functioning when some of its components fail. The Internet is fault-tolerant because the routing fabric offers many possible paths between any two hosts. If one link goes down, routers around the failure update their local tables and traffic re-routes — often with no visible effect to users. This is direct application of 4.1.\n\nAt the application level, fault tolerance means redundant servers and data. A website served from one machine dies if that machine fails; replicated across data centers on multiple continents, it keeps serving through regional outages. Backups and periodic replication catch data-loss failures.\n\nFault tolerance has costs. Redundancy uses more hardware, energy, and money. CSP expects you to reason about the trade-off: more redundancy means more resilience but higher cost. For critical services (hospitals, banks, 911) the trade is worth it; for a personal project it may not be.",
      keyIdeas: [
        "Redundancy (extra paths, servers, or copies) is what makes a system fault-tolerant.",
        "The Internet's many paths give it built-in fault tolerance.",
        "Fault tolerance costs money, hardware, and energy.",
        "Critical systems justify higher redundancy than casual ones.",
      ],
      commonMistakes: [
        "Treating redundancy as free.",
        "Confusing fault tolerance with security — they are different concerns.",
        "Assuming a single backup server makes a system fault-tolerant for every failure mode.",
      ],
      interactives: [
        {
          id: "4.2.a",
          kind: "network",
          title: "Re-route around an outage",
          description:
            "The direct edge B–D fails. Trace how packets reach F anyway.",
          nodes: ["A", "B", "C", "D", "E", "F"],
          edges: [
            { from: "A", to: "B" },
            { from: "A", to: "C" },
            { from: "B", to: "D" },
            { from: "C", to: "D" },
            { from: "C", to: "E" },
            { from: "D", to: "F" },
            { from: "E", to: "F" },
          ],
          scenarios: [
            {
              from: "A",
              to: "F",
              downed: { from: "B", to: "D" },
              expectedPath: ["A", "C", "D", "F"],
              note: "With B–D down, A→C→D→F still works. Redundancy kept the service online.",
            },
            {
              from: "A",
              to: "F",
              downed: { from: "D", to: "F" },
              expectedPath: ["A", "C", "E", "F"],
              note: "With D–F down, A→C→E→F is the surviving path. Multiple outages can be absorbed as long as any path remains.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Define fault tolerance.", back: "The ability of a system to keep working when some components fail." },
        { front: "How is redundancy related to fault tolerance?", back: "Redundancy (extra paths / servers / copies) is the mechanism that delivers fault tolerance." },
        { front: "What costs rise with redundancy?", back: "Hardware, energy, and operational complexity." },
      ],
      practiceProblems: [
        {
          id: "4.2.p1",
          difficulty: "easy",
          prompt:
            "Which property of the Internet most directly supports fault tolerance?",
          choices: [
            "A single central router.",
            "Multiple possible paths between hosts.",
            "Encrypted traffic.",
            "Strict bandwidth limits.",
          ],
          answer: "Multiple possible paths between hosts.",
          explanation:
            "When one link fails, routers use another. That redundancy is what keeps the Internet online through failures.",
        },
      ],
    },
    {
      id: "4.3",
      title: "Parallel and Distributed Computing",
      bigIdea: "CSN",
      summary:
        "Parallel computing splits work across cores on one machine; distributed computing splits it across many machines. Both shorten total runtime for parallelizable work.",
      explanation:
        "Sequential computing does one operation at a time. Parallel computing does multiple operations simultaneously using multiple processing units (CPU cores). Distributed computing spreads the work across many separate computers connected by a network. Both techniques can finish work faster than sequential computing, but only for work that can be broken into independent pieces.\n\nCSP introduces speedup: the ratio of sequential runtime to parallel runtime. If sequential takes 10 seconds and parallel takes 4, speedup is 2.5×. Speedup is bounded by the unparallelizable portion of the work — some steps must be done in order (read input, combine results), and those set a ceiling. Adding more workers past that ceiling stops helping.\n\nDistributed systems add network latency and partial failure: one of the machines may crash while others continue. Good distributed designs tolerate those failures (see 4.2) and still produce a correct combined result.",
      keyIdeas: [
        "Parallel: many operations at once on one machine.",
        "Distributed: work split across many networked machines.",
        "Speedup = sequential runtime / parallel runtime.",
        "Sequential portions cap possible speedup no matter how many workers you add.",
      ],
      commonMistakes: [
        "Assuming speedup grows linearly with workers forever.",
        "Treating network latency in distributed systems as free.",
        "Forgetting that some operations must remain sequential.",
      ],
      interactives: [
        {
          id: "4.3.a",
          kind: "efficiency",
          title: "Speedup vs worker count",
          description:
            "A program has 2 seconds of sequential setup, 8 seconds of fully-parallel work, and 1 second of sequential wrap-up. Compare total time as workers grow.",
          rows: [
            { label: "1 worker", growth: "constant", ops10: 11, ops100: 11, ops1000: 11, note: "2 + 8 + 1 = 11 seconds (sequential)." },
            { label: "2 workers", growth: "linear", ops10: 7, ops100: 7, ops1000: 7, note: "2 + 4 + 1 = 7 seconds." },
            { label: "4 workers", growth: "linear", ops10: 5, ops100: 5, ops1000: 5, note: "2 + 2 + 1 = 5 seconds." },
            { label: "8 workers", growth: "constant", ops10: 4, ops100: 4, ops1000: 4, note: "2 + 1 + 1 = 4 seconds." },
            { label: "100 workers", growth: "constant", ops10: 3, ops100: 3, ops1000: 3, note: "~3 seconds — sequential parts dominate; extra workers barely help." },
          ],
        },
      ],
      flashcards: [
        { front: "Parallel vs distributed?", back: "Parallel: multiple cores on one machine. Distributed: multiple networked machines." },
        { front: "Define speedup.", back: "Sequential runtime divided by parallel runtime." },
        { front: "Why does adding workers eventually stop helping?", back: "The sequential portion sets a lower bound on total runtime." },
      ],
      practiceProblems: [
        {
          id: "4.3.p1",
          difficulty: "medium",
          prompt:
            "A sequential program takes 30 seconds. Running on 3 parallel workers takes 12 seconds. What is the speedup?",
          choices: ["12", "2.5", "3.0", "0.4"],
          answer: "2.5",
          explanation:
            "Speedup = 30 / 12 = 2.5. Less than 3× because part of the work could not be parallelized.",
        },
        {
          id: "4.3.p2",
          difficulty: "medium",
          prompt:
            "Which task benefits most from parallelization?",
          choices: [
            "Reading a file line-by-line in order.",
            "Running the same image filter on each of 1,000 independent photos.",
            "Walking a linked list from head to tail.",
            "Rolling one die once.",
          ],
          answer:
            "Running the same image filter on each of 1,000 independent photos.",
          explanation:
            "The 1,000 photos are independent — they can be processed on 1,000 workers at once. The other tasks are sequential or trivial.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 5 — IMPACT OF COMPUTING (21–26% of exam, Big Idea IOC)
// =============================================================================
AP_COMPUTER_SCIENCE_PRINCIPLES.units.push({
  number: 5,
  title: "Impact of Computing",
  bigIdea: "IOC",
  examWeight: "21–26% of exam",
  overview:
    "Unit 5 tests your ability to reason about computing's effects on people and society: unintended consequences, digital divide, algorithmic bias, crowdsourcing, legal and ethical concerns, and safe computing practices. The exam will ask you to weigh benefits against harms, identify affected populations, and pick the response most consistent with CSP's ethical framing.",
  topics: [
    {
      id: "5.1",
      title: "Beneficial and Harmful Effects",
      bigIdea: "IOC",
      summary:
        "Every computing innovation has benefits and harms, intended and unintended. CSP asks you to reason about both.",
      explanation:
        "Computing innovations rarely fit into \"good\" or \"bad.\" A social network connects friends across continents (benefit) while amplifying misinformation (harm). A ride-share app reduces drunk driving (benefit) and destabilizes taxi livelihoods (harm). CSP expects you to describe specific affected groups, specific benefits, and specific harms — not to declare an innovation \"good overall\" or \"bad overall.\"\n\nUnintended consequences are the exam's favorite angle. Programmers rarely design for harm; harms arise because the designers did not anticipate how the tool would be used or who would use it. Home video cameras enabled citizen journalism (unintended benefit) and stalking (unintended harm). The CSP framing: innovations are tested against the full range of users, including edge cases and vulnerable populations.\n\nThe mitigation answer on the exam usually involves more testing, more diverse development teams, better documentation, and clearer consent from users. Quick technical fixes (e.g. \"add more security\") are rarely the strongest option.",
      keyIdeas: [
        "Benefits and harms coexist — reason about both specifically.",
        "Unintended consequences arise from gaps in testing and perspective.",
        "Mitigation often involves diverse teams, broader testing, and clearer user consent.",
      ],
      commonMistakes: [
        "Answering \"good\" or \"bad\" without naming specific populations and effects.",
        "Only listing harms or only listing benefits.",
        "Treating harms as inevitable rather than as design outcomes.",
      ],
      interactives: [
        {
          id: "5.1.a",
          kind: "ethics",
          title: "Weigh a smart-doorbell rollout",
          description:
            "A neighborhood is installing smart doorbells with facial recognition. Identify a benefit, a harm, and a mitigation.",
          scenario:
            "The vendor promises reduced package theft (benefit) but the system stores faces of every passerby indefinitely.",
          choices: [
            {
              label: "A",
              text: "Deploy as-is — reduced theft outweighs any privacy concerns.",
              correct: false,
              reasoning:
                "Ignoring privacy harms on the theory that benefits dominate is the exact failure mode CSP warns against.",
            },
            {
              label: "B",
              text: "Add a public sign, short retention window, local-only storage, and opt-out for neighbors who do not want their faces captured.",
              correct: true,
              reasoning:
                "Mitigations address the specific harm (indefinite facial storage) while preserving the benefit.",
            },
            {
              label: "C",
              text: "Cancel the project — all surveillance is unethical.",
              correct: false,
              reasoning:
                "CSP does not ask you to reject innovations categorically. It asks for reasoned trade-offs.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "What is an unintended consequence?", back: "An effect of a computing innovation that the designers did not plan for." },
        { front: "What is the CSP way to argue about impact?", back: "Name specific populations, specific benefits, and specific harms." },
        { front: "Common mitigation strategy?", back: "Diverse testing, consent, retention limits, and transparent documentation." },
      ],
      practiceProblems: [
        {
          id: "5.1.p1",
          difficulty: "medium",
          prompt:
            "Which best answers: \"What is an unintended consequence of GPS navigation apps?\"",
          choices: [
            "GPS always tells drivers the fastest route.",
            "Drivers may be routed through quiet residential streets, creating traffic and safety concerns for residents.",
            "GPS apps are free.",
            "GPS apps use satellites.",
          ],
          answer:
            "Drivers may be routed through quiet residential streets, creating traffic and safety concerns for residents.",
          explanation:
            "The designers intended to optimize driver time. Residents living near a shortcut experience a harm the designers did not plan for.",
        },
      ],
    },
    {
      id: "5.2",
      title: "Digital Divide",
      bigIdea: "IOC",
      summary:
        "The digital divide is the gap in access to computing technology and the Internet — by income, geography, age, disability, or infrastructure.",
      explanation:
        "Access to computing is not uniform. Some communities have high-speed fiber to every home; others lack reliable electricity. The digital divide encompasses access to devices, affordable Internet, digital literacy, and assistive technology for people with disabilities. Students without home Internet cannot do online homework; rural clinics without bandwidth cannot stream telemedicine; older adults without digital literacy may be excluded from services that migrate online.\n\nThe digital divide is not self-correcting. Private markets optimize for profitable customers, often bypassing rural and low-income areas. Public interventions — municipal broadband, device lending programs, accessibility laws, and inclusive design — narrow the gap. CSP expects you to describe specific factors (cost, geography, infrastructure, literacy, disability) and specific mitigations (subsidies, public infrastructure, accessibility standards).\n\nThe exam framing: computing innovations that move services online without accommodating offline users widen the divide. Reasoning about who loses access is a standard IOC question.",
      keyIdeas: [
        "Digital divide = uneven access to computing, across income, geography, age, and ability.",
        "Factors: device cost, Internet cost, infrastructure, digital literacy, disability.",
        "Moving services online without alternatives can exclude offline populations.",
        "Mitigations include subsidies, public infrastructure, and accessibility standards.",
      ],
      commonMistakes: [
        "Framing the divide as only about money.",
        "Assuming rural broadband will arrive without policy.",
        "Ignoring disability and accessibility as part of digital access.",
      ],
      interactives: [
        {
          id: "5.2.a",
          kind: "ethics",
          title: "Design around the digital divide",
          description:
            "A school district considers switching homework submission to a web-only portal.",
          scenario:
            "About 18% of students lack reliable home Internet. The proposed portal has no offline option.",
          choices: [
            {
              label: "A",
              text: "Roll out the portal immediately — students without Internet can use the library.",
              correct: false,
              reasoning:
                "Library-only access penalizes students whose families cannot drive them or whose libraries close early. It widens the digital divide rather than mitigating it.",
            },
            {
              label: "B",
              text: "Launch the portal alongside paper assignments and offer hotspots or loaner devices to families without home Internet.",
              correct: true,
              reasoning:
                "Parallel paths and resource support address the specific barriers CSP highlights in the digital divide.",
            },
            {
              label: "C",
              text: "Require families to upgrade their Internet before the portal launches.",
              correct: false,
              reasoning:
                "Shifting the cost onto families ignores that many cannot afford upgrades. That is the divide.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Define digital divide.", back: "Uneven access to computing and the Internet — by income, geography, age, disability, or infrastructure." },
        { front: "Is the digital divide only about money?", back: "No — it also includes geography, literacy, accessibility, and age." },
        { front: "One mitigation for the divide?", back: "Subsidized broadband, public hotspots, device lending, or accessibility standards." },
      ],
      practiceProblems: [
        {
          id: "5.2.p1",
          difficulty: "easy",
          prompt:
            "Which factor is NOT typically considered part of the digital divide?",
          choices: [
            "Household income.",
            "Geographic location (rural vs urban).",
            "A user's preferred programming language.",
            "Digital literacy.",
          ],
          answer: "A user's preferred programming language.",
          explanation:
            "The divide is about who can access computing, not about which languages advanced users prefer.",
        },
      ],
    },
    {
      id: "5.3",
      title: "Computing Bias",
      bigIdea: "IOC",
      summary:
        "Programs can embed bias through training data, design assumptions, or development-team blind spots — sometimes intentional, often not.",
      explanation:
        "A computing innovation is biased when it treats some groups better than others. Bias enters in three common places. Biased training data: if a hiring model was trained on a company's historical hires (skewed male), it will recommend men. Biased design: if a heart-rate monitor is tested only on light skin, it may fail on darker skin. Biased deployment: if a predictive-policing tool is used only in certain neighborhoods, it reinforces patterns in those neighborhoods while ignoring others.\n\nBias is rarely intentional, but it is rarely accidental in the sense of \"random.\" It follows from data and decisions the programmers made. CSP asks you to name where the bias entered and to propose a concrete fix: broaden training data, test with diverse users, audit for disparate outcomes, add explicit fairness checks.\n\nBias is also the downstream cost of the digital divide (5.2) and a reason diverse teams (1.1) matter. Exam questions will connect the three.",
      keyIdeas: [
        "Bias enters through training data, design decisions, or development-team perspective.",
        "Bias is usually unintentional but follows from concrete choices.",
        "Mitigation: diverse training data, diverse teams, disparate-outcome audits.",
        "Ties back to diverse collaboration (1.1) and the digital divide (5.2).",
      ],
      commonMistakes: [
        "Calling bias \"random error.\"",
        "Assuming adding more data fixes bias (it can entrench it).",
        "Treating fairness as a one-time fix rather than ongoing auditing.",
      ],
      interactives: [
        {
          id: "5.3.a",
          kind: "ethics",
          title: "Audit a resume-screening model",
          description:
            "A hiring model was trained on 10 years of past hires. It heavily favors male candidates. What is the most defensible response?",
          scenario:
            "The company's past hires were 85% male. The model replicates that distribution on new candidates.",
          choices: [
            {
              label: "A",
              text: "Deploy — the model faithfully reflects the past.",
              correct: false,
              reasoning:
                "Faithfully replicating biased history perpetuates the bias. CSP treats that as unacceptable even when no one intended discrimination.",
            },
            {
              label: "B",
              text: "Retrain on balanced data, audit for disparate outcomes, and keep a human reviewer in the loop.",
              correct: true,
              reasoning:
                "Combines all three CSP mitigations: better data, outcome audits, and human oversight. The hiring decision remains accountable.",
            },
            {
              label: "C",
              text: "Add more of the same data — volume will drown out the bias.",
              correct: false,
              reasoning:
                "More biased data is more bias. Volume does not fix direction.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Name the three common sources of computing bias.", back: "Biased training data, biased design decisions, biased deployment context." },
        { front: "Is bias always intentional?", back: "No — it usually is not. But it is always a consequence of concrete choices." },
        { front: "Mitigation for biased training data?", back: "Broaden the data, audit outcomes across groups, and keep humans in the loop." },
      ],
      practiceProblems: [
        {
          id: "5.3.p1",
          difficulty: "medium",
          prompt:
            "A voice-assistant has a much higher error rate for users with certain accents. What is the most likely cause in AP CSP terms?",
          choices: [
            "A runtime error in the microphone driver.",
            "Training data that under-represented those accents.",
            "The voice-assistant is running on old hardware.",
            "Users are speaking too loudly.",
          ],
          answer:
            "Training data that under-represented those accents.",
          explanation:
            "Under-representation in training data is the textbook CSP example of how bias creeps into a system.",
        },
      ],
    },
    {
      id: "5.4",
      title: "Crowdsourcing",
      bigIdea: "IOC",
      summary:
        "Crowdsourcing uses the collective effort of many contributors — paid or unpaid — to build, label, fund, or maintain a resource.",
      explanation:
        "Crowdsourcing harnesses many people to do work a single organization could not. Wikipedia is written by volunteer contributors; open-source software is built by thousands of contributors; Kickstarter funds projects by pooling small contributions; citizen science projects like eBird let birdwatchers worldwide contribute observations.\n\nCrowdsourcing scales, but it introduces quality, legitimacy, and fairness concerns. Who checks submissions? Whose contributions count? Are unpaid contributors being exploited to produce value for a for-profit service? CSP questions often ask you to identify the benefit (scale, diversity, low cost) and the cost (variable quality, vandalism, uncompensated labor).\n\nOn the exam, crowdsourcing is a design choice. If your program needs data that changes constantly and is widely known — local restaurant hours, road closures — crowdsourcing beats hiring a team to collect it. If your program needs expert-level accuracy — medical diagnoses, legal precedent — crowdsourcing is risky.",
      keyIdeas: [
        "Crowdsourcing = collective contribution from many people to build or maintain a resource.",
        "Examples: Wikipedia, open source, Kickstarter, citizen science, OpenStreetMap.",
        "Benefits: scale, diversity, low cost.",
        "Concerns: quality control, uncompensated labor, vandalism.",
      ],
      commonMistakes: [
        "Conflating crowdsourcing with \"asking your friends.\"",
        "Assuming crowdsourcing always beats expert-sourced data.",
        "Ignoring the labor question when contributors are unpaid.",
      ],
      interactives: [
        {
          id: "5.4.a",
          kind: "ethics",
          title: "When is crowdsourcing appropriate?",
          description:
            "Match each scenario to whether crowdsourcing is a good fit.",
          scenario:
            "Option A: Keeping a map of accessible parking spots across a city up to date.",
          choices: [
            {
              label: "A",
              text: "Crowdsourcing (good fit) — local, dynamic, and benefits from many observers.",
              correct: true,
              reasoning:
                "Accessibility info changes constantly and scales with local knowledge — classic crowdsourcing use case.",
            },
            {
              label: "B",
              text: "Centralized team (bad fit for crowdsourcing) — radiology diagnoses from X-rays.",
              correct: true,
              reasoning:
                "Medical diagnosis requires expertise and accountability. Volunteer contributions would introduce unacceptable risk.",
            },
            {
              label: "C",
              text: "Both scenarios should always use crowdsourcing.",
              correct: false,
              reasoning:
                "Crowdsourcing is powerful but not universal. Expert-critical tasks should stay with accountable professionals.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Define crowdsourcing.", back: "Using many contributors — paid or unpaid — to build, label, fund, or maintain a resource." },
        { front: "Example of successful crowdsourcing?", back: "Wikipedia, open-source software, Kickstarter, OpenStreetMap." },
        { front: "One risk of crowdsourcing?", back: "Uneven quality, vandalism, or uncompensated labor." },
      ],
      practiceProblems: [
        {
          id: "5.4.p1",
          difficulty: "easy",
          prompt:
            "Which is the best example of crowdsourcing?",
          choices: [
            "A company purchases a database of addresses.",
            "Thousands of volunteers translate a website by contributing small edits.",
            "A single developer ships a feature.",
            "A CEO makes a decision alone.",
          ],
          answer:
            "Thousands of volunteers translate a website by contributing small edits.",
          explanation:
            "Pooling many small contributions from a broad public is the defining feature of crowdsourcing.",
        },
      ],
    },
    {
      id: "5.5",
      title: "Legal and Ethical Concerns",
      bigIdea: "IOC",
      summary:
        "Copyright, licenses, and intellectual property govern how code, data, and creative work can be used. Creative Commons is the CSP go-to permissive license.",
      explanation:
        "Code, art, and writing are intellectual property. The default in most countries is that the creator holds copyright automatically — others need permission to copy or modify the work. Licenses grant that permission under stated terms. Open-source licenses (MIT, GPL) let anyone use and modify software with attribution; Creative Commons (CC BY, CC BY-SA, CC BY-NC) does the same for creative works.\n\nCSP expects you to recognize when using someone else's work requires permission. Downloading a stock photo for a school project: if it is CC BY, you can use it with attribution; if it is all-rights-reserved, you cannot. Pulling open-source code into your own program: read the license and comply with its attribution or share-alike clauses.\n\nThe exam also covers plagiarism (passing off someone's work as your own), piracy (distributing copyrighted work without permission), and fair use (limited copying for education, commentary, or parody). Picking the stronger answer usually means the one that respects both the law and the intent of the original creator.",
      keyIdeas: [
        "Copyright is automatic; licenses grant specific permissions.",
        "Creative Commons (CC BY, CC BY-SA, CC BY-NC) are CSP's usual examples.",
        "Open-source licenses (MIT, GPL) apply the same idea to code.",
        "Use requires permission unless a license or fair-use exception applies.",
      ],
      commonMistakes: [
        "Assuming \"on the Internet\" means \"free to use.\"",
        "Ignoring attribution requirements on permissive licenses.",
        "Mixing up plagiarism (credit) with piracy (distribution).",
      ],
      interactives: [
        {
          id: "5.5.a",
          kind: "ethics",
          title: "Pick a legal use of a photo",
          description:
            "You want to use a photo you found online in your AP CSP Create performance task. Which use is safe under AP rules?",
          scenario:
            "The photo is marked Creative Commons Attribution (CC BY).",
          choices: [
            {
              label: "A",
              text: "Use it and credit the photographer with a visible attribution line.",
              correct: true,
              reasoning:
                "CC BY allows reuse with attribution. Crediting the photographer satisfies the license and AP's academic integrity rules.",
            },
            {
              label: "B",
              text: "Use it without attribution — it is free on the Internet.",
              correct: false,
              reasoning:
                "\"Free to view\" is not \"free to reuse without credit.\" CC BY still requires attribution.",
            },
            {
              label: "C",
              text: "Claim you took the photo yourself.",
              correct: false,
              reasoning:
                "That is plagiarism. It breaks the license and AP's exam rules.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Is copyright automatic?", back: "Yes — creators hold copyright by default without registering." },
        { front: "What does CC BY require?", back: "Attribution to the creator when you reuse the work." },
        { front: "Plagiarism vs piracy?", back: "Plagiarism: failing to credit. Piracy: distributing without permission." },
      ],
      practiceProblems: [
        {
          id: "5.5.p1",
          difficulty: "medium",
          prompt:
            "A student reuses code from an open-source library with a permissive license. What must they do?",
          choices: [
            "Nothing — open source is free.",
            "Follow the license's terms (usually attribution and possibly share-alike) and note the source in documentation.",
            "Delete the library before submission.",
            "Encrypt the code.",
          ],
          answer:
            "Follow the license's terms (usually attribution and possibly share-alike) and note the source in documentation.",
          explanation:
            "Open-source code is only \"free\" when the license is respected. Attribution and compliance with share-alike clauses are the norm.",
        },
      ],
    },
    {
      id: "5.6",
      title: "Safe Computing",
      bigIdea: "IOC",
      summary:
        "Safe computing covers personally identifiable information (PII), phishing, strong passwords, multi-factor authentication, and encryption.",
      explanation:
        "Personally identifiable information (PII) is data that identifies a real person: name, address, phone number, Social Security number, biometric data. Leaking PII enables identity theft and harassment. CSP expects you to know which fields count as PII and how programs should protect them — limited collection, encryption in transit and at rest, access controls, and deletion when no longer needed.\n\nAuthentication is how a system knows who a user is. Strong passwords (long, unpredictable, unique per site) are the baseline. Multi-factor authentication (MFA) adds a second factor — something you have (phone, hardware key) or something you are (biometric) — on top of something you know (password). MFA dramatically reduces the impact of a stolen password.\n\nPhishing is an attack that tricks a user into volunteering credentials or installing malware. The defense is primarily human: inspect the sender, hover over links, never enter credentials on a page you did not navigate to yourself. Encryption protects data in transit (HTTPS) and at rest (encrypted disks); symmetric and asymmetric encryption are at the conceptual level the exam expects you to recognize.",
      keyIdeas: [
        "PII must be minimized, encrypted, and access-controlled.",
        "Strong passwords: long, unique, unpredictable.",
        "Multi-factor authentication combines something you know, have, and/or are.",
        "Phishing is defeated by user awareness + domain/link checks.",
        "Encryption (HTTPS, disk encryption) protects data in transit and at rest.",
      ],
      commonMistakes: [
        "Treating PII as only Social Security numbers.",
        "Reusing passwords across sites.",
        "Assuming HTTPS guarantees the site is safe (it only guarantees the connection is private).",
        "Clicking links in urgent-sounding emails without verifying the sender.",
      ],
      interactives: [
        {
          id: "5.6.a",
          kind: "ethics",
          title: "Phishing decision tree",
          description:
            "You get an urgent email claiming to be from the College Board asking you to click a link and enter your login. What is the safest response?",
          scenario:
            "Subject: \"Your AP scores are ready — verify identity in the next 15 minutes.\" Sender: service@collegebord-notify.com (note the typo).",
          choices: [
            {
              label: "A",
              text: "Click the link and enter your login — time is short.",
              correct: false,
              reasoning:
                "Urgency is a classic phishing pressure tactic. The misspelled domain confirms the email is not from the College Board.",
            },
            {
              label: "B",
              text: "Do not click. Open a browser, navigate to apscore.collegeboard.org directly, and log in there.",
              correct: true,
              reasoning:
                "Navigating to the real domain bypasses the phishing page entirely. This is the CSP-recommended response.",
            },
            {
              label: "C",
              text: "Reply to the email asking if it is real.",
              correct: false,
              reasoning:
                "An attacker answers the reply. The reply does not verify legitimacy.",
            },
            {
              label: "D",
              text: "Forward the email to every friend for their opinion.",
              correct: false,
              reasoning:
                "Forwarding spreads the attack without verifying anything.",
            },
          ],
        },
        {
          id: "5.6.b",
          kind: "ethics",
          title: "Pick a password strategy",
          description:
            "Which approach best balances security and usability?",
          scenario:
            "You have 40 online accounts. Remembering 40 unique long passwords by memory is impractical.",
          choices: [
            {
              label: "A",
              text: "Use the same password everywhere so it is easy to remember.",
              correct: false,
              reasoning:
                "One site's breach compromises all 40. This is the top reason credentials get stolen at scale.",
            },
            {
              label: "B",
              text: "Use a password manager to generate and store a unique strong password per site, protected by a single strong master password and MFA.",
              correct: true,
              reasoning:
                "Password managers combine strong per-site secrets with a single memorable gate. Adding MFA addresses the single-gate risk.",
            },
            {
              label: "C",
              text: "Write every password on a sticky note on your monitor.",
              correct: false,
              reasoning:
                "Physical exposure is its own leak channel.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "What counts as PII?", back: "Any data that identifies a real person — name, address, phone, SSN, biometrics." },
        { front: "What does MFA add?", back: "A second factor (something you have or are) on top of something you know, so a stolen password is not enough." },
        { front: "How does HTTPS protect a user?", back: "It encrypts the connection so intermediaries cannot read the traffic." },
        { front: "First line of defense against phishing?", back: "User skepticism — check sender, hover over links, and navigate to sites directly." },
      ],
      practiceProblems: [
        {
          id: "5.6.p1",
          difficulty: "easy",
          prompt:
            "Which is the clearest example of PII?",
          choices: [
            "The weather forecast.",
            "A user's home address.",
            "The HTML of a public webpage.",
            "A prime number.",
          ],
          answer: "A user's home address.",
          explanation:
            "Home addresses identify real people and are classic PII. The other options are not personal data.",
        },
        {
          id: "5.6.p2",
          difficulty: "medium",
          prompt:
            "Why is multi-factor authentication stronger than a password alone?",
          choices: [
            "Passwords are obsolete.",
            "A stolen password alone is not enough to log in — the attacker also needs the second factor.",
            "It uses more memory.",
            "It is faster.",
          ],
          answer:
            "A stolen password alone is not enough to log in — the attacker also needs the second factor.",
          explanation:
            "MFA's security benefit is the independence of the factors. Compromising one does not compromise the account.",
        },
        {
          id: "5.6.p3",
          difficulty: "medium",
          prompt:
            "A site's URL shows HTTPS and a padlock. Which conclusion is safe?",
          choices: [
            "The site is trustworthy and legitimate.",
            "The connection between your browser and the site is encrypted, but the site itself could still be malicious.",
            "The site is operated by a government.",
            "The padlock means no one ever visits the site.",
          ],
          answer:
            "The connection between your browser and the site is encrypted, but the site itself could still be malicious.",
          explanation:
            "HTTPS secures the channel, not the content. Phishing sites can and do use HTTPS.",
        },
      ],
    },
  ],
});

// =============================================================================
// Default export — consumed by the Finals Prep study surface.
// =============================================================================
