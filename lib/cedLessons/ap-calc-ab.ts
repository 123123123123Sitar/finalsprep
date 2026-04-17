import type { CourseCedLessons } from "./types";

/**
 * AP Calculus AB CED lessons. Covers all 8 units with every topic from the
 * College Board framework. Each topic has a summary, full walkthrough,
 * key ideas, worked example, flashcards, common mistakes, and a quiz.
 */

const AXIS = `
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="#1a1a1a" />
    </marker>
  </defs>
  <line x1="20" y1="120" x2="380" y2="120" stroke="#1a1a1a" stroke-width="1.2" marker-end="url(#arr)" />
  <line x1="200" y1="220" x2="200" y2="20" stroke="#1a1a1a" stroke-width="1.2" marker-end="url(#arr)" />
  <text x="375" y="135" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">x</text>
  <text x="210" y="25" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">y</text>
`;

export const AP_CALC_AB_CED_LESSONS: CourseCedLessons = {
  "1.1": {
    id: "1.1",
    title: "Introducing Calculus: Can Change Occur at an Instant?",
    summary:
      "Calculus answers what rate of change means at a single instant by pushing average rates to a limit as the interval shrinks to zero.",
    lesson:
      "In algebra you measured change over an interval with the slope \\(\\frac{\\Delta y}{\\Delta x}\\). That tells you how fast something moved on average, but not how fast it was moving at one specific moment. Calculus's whole move is to take an average rate over \\([a, a+h]\\), then let \\(h\\) shrink to zero. If the average rates approach a single number, that number is the instantaneous rate of change at \\(a\\).\n\nThink about a car: you drove 60 miles in 1 hour, so the average speed was 60 mph. But the speedometer reading at exactly 2:15 pm is something else. To get it, sample shorter and shorter windows around 2:15. If those averages settle on 58 mph, that's your instantaneous speed.\n\nThis idea generalizes. Whenever a quantity \\(Q\\) depends on another quantity \\(x\\), the instantaneous rate of change of \\(Q\\) at \\(x = a\\) is $$\\lim_{h \\to 0} \\frac{Q(a+h) - Q(a)}{h}.$$ This is the definition of the derivative. Every topic in Units 2 and 3 is a shortcut or technique to compute this limit quickly.\n\nGeometrically, average rate is the slope of a secant line; instantaneous rate is the slope of the tangent line. The tangent is the limit of secants as the second point slides into the first. That's why limits are the foundation of everything this course does.",
    keyIdeas: [
      "Average rate of change on \\([a,b]\\) is \\(\\frac{f(b)-f(a)}{b-a}\\).",
      "Instantaneous rate at \\(a\\) is the limit of average rates as the interval collapses.",
      "Secant slope \\(\\to\\) tangent slope as \\(h \\to 0\\).",
      "Every derivative is secretly this limit — the course is about shortcuts for it.",
    ],
    workedExample: {
      prompt:
        "A particle's position is \\(s(t) = t^2\\). Estimate its instantaneous velocity at \\(t = 3\\) using \\(h = 0.1, 0.01\\).",
      solution:
        "Average velocity on \\([3, 3+h]\\): \\(\\frac{(3+h)^2 - 9}{h} = 6 + h\\). At \\(h=0.1\\) get 6.1; at \\(h=0.01\\) get 6.01. The values approach 6, so instantaneous velocity at \\(t=3\\) is 6.",
    },
    flashcards: [
      { q: "Formula for average rate of change of \\(f\\) on \\([a,b]\\)?", a: "\\(\\frac{f(b)-f(a)}{b-a}\\) — slope of the secant line." },
      { q: "What limit defines the instantaneous rate at \\(a\\)?", a: "\\(\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\)." },
      { q: "Geometric meaning of instantaneous rate of change?", a: "Slope of the tangent line at that point." },
    ],
    commonMistakes: [
      "Using a fixed \\(h\\) and calling it \"instantaneous.\" The point is the limit.",
      "Forgetting units — instantaneous rate keeps the original units (e.g. mph, dollars per unit).",
      "Confusing average and instantaneous rates when the function is nonlinear.",
    ],
    quiz: [
      {
        q: "Which expression gives the instantaneous rate of change of \\(f\\) at \\(x=a\\)?",
        choices: ["\\(\\frac{f(a)-f(0)}{a}\\)", "\\(\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\)", "\\(\\frac{f(a+1)-f(a)}{1}\\)", "\\(f(a)\\)"],
        answerIndex: 1,
        explanation: "That is the derivative definition — the instantaneous rate of change at \\(a\\).",
      },
      {
        q: "For \\(f(x)=x^2\\), the average rate on \\([2, 2.1]\\) equals:",
        choices: ["4", "4.1", "4.2", "0.41"],
        answerIndex: 1,
        explanation: "\\(\\frac{(2.1)^2 - 4}{0.1} = \\frac{0.41}{0.1} = 4.1\\).",
      },
      {
        q: "Secant slope becomes tangent slope when:",
        choices: ["The function is linear.", "The two points merge in the limit.", "The interval is exactly 1.", "The curve is concave up."],
        answerIndex: 1,
        explanation: "Tangent is the limit of secants as the second point approaches the first.",
      },
      {
        q: "A student says speed at \\(t=3\\) is \\(\\frac{s(3.5)-s(3)}{0.5}\\). What's wrong?",
        choices: ["Nothing, that's exactly right.", "That's an average, not an instantaneous, rate.", "Units are wrong.", "Sign is flipped."],
        answerIndex: 1,
        explanation: "That's an average over \\([3, 3.5]\\). You need the limit as the window shrinks to 0.",
      },
    ],
  },

  "1.2": {
    id: "1.2",
    title: "Defining Limits and Using Limit Notation",
    summary:
      "\\(\\lim_{x\\to a} f(x) = L\\) means \\(f(x)\\) can be forced arbitrarily close to \\(L\\) by taking \\(x\\) close (but not equal) to \\(a\\).",
    lesson:
      "A limit describes what value \\(f(x)\\) is heading toward as \\(x\\) approaches some target \\(a\\). Crucially, the limit doesn't care what \\(f(a)\\) actually equals — only what \\(f(x)\\) does for \\(x\\) near but not equal to \\(a\\). You write this as \\(\\lim_{x\\to a} f(x) = L\\).\n\nOne-sided limits look at only one direction. The left limit \\(\\lim_{x\\to a^-} f(x)\\) considers \\(x < a\\); the right limit \\(\\lim_{x\\to a^+} f(x)\\) considers \\(x > a\\). The full two-sided limit exists if and only if both one-sided limits exist and agree.\n\nA limit can fail to exist for three basic reasons: (1) left and right disagree (jump); (2) the function oscillates and never settles (e.g. \\(\\sin(1/x)\\) near 0); (3) the values blow up to \\(\\pm\\infty\\). In the blow-up case we sometimes write \\(\\lim = \\infty\\) to describe the behavior, but technically the limit does not exist as a real number.\n\nNotation hygiene matters on FRQs. Always write the arrow, the target, and the approach direction if one-sided. Do not drop the \"\\(\\lim\\)\" symbol when asking \"what does \\(f\\) approach\"; graders want the setup, not just the number.",
    keyIdeas: [
      "\\(\\lim_{x\\to a} f(x) = L\\) says values approach \\(L\\), not that \\(f(a)=L\\).",
      "Two-sided limit exists iff left and right one-sided limits match.",
      "Infinite limit \\(\\ne\\) \"limit exists\" — it describes blow-up.",
      "Oscillation near \\(a\\) can kill the limit.",
    ],
    workedExample: {
      prompt:
        "Let \\(f(x) = \\begin{cases} x+1, & x<2 \\\\ 5, & x=2 \\\\ x^2-1, & x>2 \\end{cases}\\). Find \\(\\lim_{x\\to 2} f(x)\\).",
      solution:
        "Left: \\(\\lim_{x\\to 2^-}(x+1) = 3\\). Right: \\(\\lim_{x\\to 2^+}(x^2-1) = 3\\). They match, so \\(\\lim_{x\\to 2} f(x) = 3\\). Note \\(f(2) = 5\\) is irrelevant to the limit.",
    },
    flashcards: [
      { q: "When does \\(\\lim_{x\\to a} f(x)\\) exist?", a: "When both one-sided limits exist and are equal." },
      { q: "Does \\(f(a)\\) affect the limit?", a: "No — the limit only sees values near \\(a\\), not at \\(a\\)." },
      { q: "Meaning of \\(\\lim_{x\\to 3^+} f(x)\\)?", a: "Value \\(f\\) approaches as \\(x\\to 3\\) from the right (x > 3)." },
    ],
    commonMistakes: [
      "Assuming \\(\\lim_{x\\to a}f(x) = f(a)\\) automatically — that's continuity, not a limit.",
      "Forgetting to check both sides when the function is piecewise at \\(a\\).",
      "Writing \\(\\lim = \\infty\\) as if the limit \"exists.\"",
    ],
    quiz: [
      {
        q: "\\(\\lim_{x\\to a}f(x) = L\\) means:",
        choices: ["\\(f(a)=L\\).", "\\(f(x)\\) gets arbitrarily close to \\(L\\) as \\(x\\) approaches \\(a\\).", "\\(f\\) is continuous at \\(a\\).", "\\(L = \\infty\\)."],
        answerIndex: 1,
        explanation: "That is the informal definition of a limit, independent of \\(f(a)\\).",
      },
      {
        q: "If \\(\\lim_{x\\to 1^-}f(x)=2\\) and \\(\\lim_{x\\to 1^+}f(x)=5\\), then \\(\\lim_{x\\to 1}f(x)\\) is:",
        choices: ["2", "3.5", "5", "does not exist"],
        answerIndex: 3,
        explanation: "One-sided limits disagree, so the two-sided limit DNE.",
      },
      {
        q: "Which is TRUE?",
        choices: ["Limits always equal function values.", "A limit can exist even when \\(f(a)\\) is undefined.", "If \\(f(a)=7\\), then \\(\\lim_{x\\to a}f(x)=7\\).", "Two-sided limits always exist."],
        answerIndex: 1,
        explanation: "Limits ignore \\(f(a)\\); a hole with a well-defined approach still has a limit.",
      },
      {
        q: "A student writes \\(\\lim_{x\\to 0} 1/x^2 = \\infty\\) and says the limit exists. Correct?",
        choices: ["Yes, \\(\\infty\\) is a valid limit.", "No — infinite limits don't exist as real numbers.", "Yes, because it's not oscillating.", "No — left and right disagree."],
        answerIndex: 1,
        explanation: "Technically the limit does not exist; the notation describes unbounded behavior.",
      },
    ],
  },

  "1.3": {
    id: "1.3",
    title: "Estimating Limit Values from Graphs",
    summary:
      "Read limits off a graph by tracing the curve from each side and seeing where y-values settle — ignoring any filled or open dot at the target.",
    lesson:
      "Graph-based limit questions are exam staples. Given a graph, \\(\\lim_{x\\to a} f(x)\\) asks: as you trace the curve toward \\(x = a\\), what \\(y\\) value does the pencil approach? Do this from the left and from the right separately, then compare.\n\nIgnore the dot at \\(x = a\\) itself. A filled circle marks \\(f(a)\\); an open circle marks that \\(f(a)\\) is undefined or different. Neither changes the limit. The limit is entirely determined by the tail of the curve as \\(x\\) approaches \\(a\\).\n\nWatch for three graphical failure modes: (1) the two branches approach different heights — jump discontinuity, limit DNE; (2) the curve shoots up or down to a vertical asymptote — infinite limit, two-sided limit DNE; (3) the curve oscillates wildly near \\(a\\) — limit DNE.\n\nAlso know limits at infinity. \\(\\lim_{x\\to\\infty} f(x)\\) asks for the horizontal behavior far to the right; on a graph you read the horizontal asymptote. Same idea on the left.",
    keyIdeas: [
      "Limit is about the trend, not the dot at \\(x=a\\).",
      "Check both sides; equal approach \\(\\Rightarrow\\) limit equals that value.",
      "Jumps, asymptotes, and oscillation all kill two-sided limits.",
      "Horizontal asymptote = limit at infinity.",
    ],
    workedExample: {
      prompt:
        "A graph shows the curve \\(y = f(x)\\) approaching \\(y = 4\\) from the left of \\(x = 1\\), approaching \\(y = 4\\) from the right of \\(x = 1\\), with an open circle at \\((1, 4)\\) and a filled dot at \\((1, 2)\\). Find \\(\\lim_{x\\to 1} f(x)\\) and \\(f(1)\\).",
      solution:
        "Left and right approach 4, so \\(\\lim_{x\\to 1} f(x) = 4\\). The filled dot says \\(f(1) = 2\\). These disagree — a removable discontinuity at \\(x = 1\\).",
    },
    flashcards: [
      { q: "Does a filled dot at \\(x=a\\) change the limit?", a: "No — limits don't care about the value at \\(a\\)." },
      { q: "Graphical sign of a jump?", a: "Left and right branches end at different heights." },
      { q: "Graphical sign of an infinite limit?", a: "Vertical asymptote; curve runs off to \\(\\pm\\infty\\)." },
    ],
    commonMistakes: [
      "Reading the dot instead of the approach.",
      "Only checking one side when there's a jump.",
      "Calling a vertical asymptote a \"limit of infinity\" that \"exists.\"",
    ],
    quiz: [
      {
        q: "A graph shows \\(f\\) approaching \\(3\\) from both sides at \\(x=2\\), with \\(f(2)=5\\). What is \\(\\lim_{x\\to 2}f(x)\\)?",
        choices: ["2", "3", "5", "DNE"],
        answerIndex: 1,
        explanation: "Limit is the approach value, 3. The point value 5 is irrelevant.",
      },
      {
        q: "A graph has a vertical asymptote at \\(x=0\\) with the curve going to \\(+\\infty\\) on both sides. \\(\\lim_{x\\to 0}f(x)=\\)",
        choices: ["0", "\\(\\infty\\) (DNE as a real number)", "\\(-\\infty\\)", "1"],
        answerIndex: 1,
        explanation: "Both sides blow up to \\(+\\infty\\); technically the limit DNE as a finite value but we describe it as \\(\\infty\\).",
      },
      {
        q: "Left limit at \\(x=1\\) is 2; right limit is 2; \\(f(1)\\) undefined. \\(\\lim_{x\\to 1}f(x)=\\)",
        choices: ["DNE", "2", "0", "1"],
        answerIndex: 1,
        explanation: "Both sides agree, so the limit equals 2 regardless of \\(f(1)\\).",
      },
      {
        q: "Which does NOT cause a limit to fail to exist (two-sided)?",
        choices: ["Jump discontinuity", "Vertical asymptote", "Removable hole with matching approaches", "Rapid oscillation near \\(a\\)"],
        answerIndex: 2,
        explanation: "A hole with equal one-sided approaches still has a limit equal to that approach value.",
      },
    ],
  },

  "1.4": {
    id: "1.4",
    title: "Estimating Limit Values from Tables",
    summary:
      "Plug \\(x\\) values closing in on the target from both sides; if outputs converge to the same number, that's the limit.",
    lesson:
      "Tables give you a numerical window on a limit. Pick \\(x\\) values that approach \\(a\\) from the left (say \\(a - 0.1, a - 0.01, a - 0.001\\)) and from the right (\\(a + 0.1, a + 0.01, a + 0.001\\)). Compute \\(f\\) at each. If the \\(y\\) values from both sides settle on the same number, that's your limit.\n\nThis is especially handy when algebra is a pain — things like \\(\\lim_{x\\to 0} \\frac{\\sin x}{x}\\) or unfamiliar expressions from graphs. A quick table tells you the answer to 3+ decimals.\n\nWatch for deceptive tables. If the spacing is coarse (e.g. \\(x = 0.1, 0.2, 0.3\\)), you might miss oscillations near \\(a\\). AP graders occasionally bait students with a table that looks stable but reaches a different value when you push to \\(x = 0.0001\\). Keep shrinking \\(h\\); if the values wobble, the limit may not exist.\n\nFor FRQ writeups, state the one-sided estimates first (\"as \\(x \\to 2^-\\), \\(f(x) \\to 5\\); as \\(x \\to 2^+\\), \\(f(x) \\to 5\\)\") and then conclude the two-sided limit.",
    keyIdeas: [
      "Sample from both sides with values shrinking toward \\(a\\).",
      "Matching approach from each side \\(\\Rightarrow\\) limit exists.",
      "Coarse tables can hide oscillation or jumps.",
      "Use the table to estimate to the precision given.",
    ],
    workedExample: {
      prompt:
        "Estimate \\(\\lim_{x\\to 0} \\frac{\\sin x}{x}\\) from a table with \\(x = \\pm 0.1, \\pm 0.01\\).",
      solution:
        "At \\(x = 0.1\\): \\(\\sin(0.1)/0.1 \\approx 0.9983\\). At \\(x = -0.1\\): same (even function), \\(\\approx 0.9983\\). At \\(x = \\pm 0.01\\): \\(\\approx 0.99998\\). Values approach 1 from both sides, so the limit is 1.",
    },
    flashcards: [
      { q: "Why sample both sides?", a: "To confirm left and right approach the same value." },
      { q: "What if values keep moving as \\(h\\) shrinks?", a: "Limit may not exist; investigate further algebraically." },
      { q: "Standard trick limit: \\(\\lim_{x\\to 0}\\sin(x)/x\\)?", a: "Equals 1." },
    ],
    commonMistakes: [
      "Using only one side of the table.",
      "Rounding too aggressively and missing subtle divergence.",
      "Stopping at \\(h=0.1\\); push further (0.01, 0.001) before concluding.",
    ],
    quiz: [
      {
        q: "A table shows \\(f(1.9)=2.99, f(1.99)=2.999, f(2.01)=3.001, f(2.1)=3.01\\). Best estimate of \\(\\lim_{x\\to 2}f(x)\\)?",
        choices: ["2", "3", "2.5", "DNE"],
        answerIndex: 1,
        explanation: "Both sides approach 3.",
      },
      {
        q: "Table gives \\(f(-0.1)=0.1, f(-0.01)=0.01, f(0.01)=-0.01, f(0.1)=-0.1\\). \\(\\lim_{x\\to 0}f(x)=?\\)",
        choices: ["0", "0.1", "-0.1", "DNE"],
        answerIndex: 0,
        explanation: "Both sides head to 0. (Sign flip is fine — both sides still approach zero.)",
      },
      {
        q: "A table sampled only at \\(x=0.5, 1.5\\) is used to guess \\(\\lim_{x\\to 1}f(x)\\). What's the risk?",
        choices: ["Spacing is too coarse — could miss a jump or oscillation.", "The limit can only be found algebraically.", "Tables are never valid.", "Need at least 10 decimals."],
        answerIndex: 0,
        explanation: "Wide spacing can hide discontinuous behavior very near \\(x=1\\).",
      },
      {
        q: "\\(\\lim_{x\\to 0}\\sin(x)/x\\) from a table?",
        choices: ["0", "1", "\\(\\pi\\)", "DNE"],
        answerIndex: 1,
        explanation: "Classic trig limit: value approaches 1.",
      },
    ],
  },

  "1.5": {
    id: "1.5",
    title: "Determining Limits Using Algebraic Properties of Limits",
    summary:
      "Limits distribute over sums, differences, products, quotients (denominator nonzero), and continuous compositions — so you can evaluate most limits by direct substitution.",
    lesson:
      "If \\(\\lim_{x\\to a} f(x) = L\\) and \\(\\lim_{x\\to a} g(x) = M\\), then \\(\\lim(f \\pm g) = L \\pm M\\), \\(\\lim(fg) = LM\\), and \\(\\lim(f/g) = L/M\\) provided \\(M \\ne 0\\). Constants factor out: \\(\\lim(cf) = cL\\). For powers, \\(\\lim f^n = L^n\\).\n\nFor continuous functions, the limit is simply the function evaluated at \\(a\\): polynomials, exponentials, sines, cosines, and logs on their domains all let you substitute directly. So \\(\\lim_{x\\to 3}(x^2 - 2x + 1) = 9 - 6 + 1 = 4\\) — just plug in.\n\nThe hard limits are ones where direct substitution produces \\(0/0\\) or \\(\\infty/\\infty\\). Those indeterminate forms mean algebra (Unit 1.6), L'Hopital (Unit 4.7), or squeeze (Unit 1.8) is required. But always try substitution first; if it gives a finite number with a nonzero denominator, you're done.\n\nComposition rule: if \\(\\lim_{x\\to a} g(x) = M\\) and \\(f\\) is continuous at \\(M\\), then \\(\\lim_{x\\to a} f(g(x)) = f(M)\\). This is how trig and log limits reduce to algebra.",
    keyIdeas: [
      "Sum, difference, product, constant multiple: limit distributes.",
      "Quotient: limit distributes only when denominator's limit \\(\\ne 0\\).",
      "Polynomials and continuous functions: substitute directly.",
      "Indeterminate \\(0/0\\) or \\(\\infty/\\infty\\) \\(\\Rightarrow\\) more work needed.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\lim_{x\\to 2} \\frac{x^2 + 3x}{x + 1}\\).",
      solution:
        "Numerator at 2: \\(4 + 6 = 10\\). Denominator at 2: \\(3 \\ne 0\\). Substitution works: limit = \\(10/3\\).",
    },
    flashcards: [
      { q: "Limit of a sum?", a: "Sum of the limits (if each exists)." },
      { q: "When does the quotient rule fail?", a: "When denominator's limit is 0." },
      { q: "What is \\(0/0\\) as a limit?", a: "Indeterminate — requires algebra, squeeze, or L'Hopital." },
    ],
    commonMistakes: [
      "Applying the quotient rule when denominator limit is 0.",
      "Plugging in and stopping when you hit \\(0/0\\) — that's not the answer, that's a flag.",
      "Confusing indeterminate forms (0/0, \\(\\infty/\\infty\\)) with defined numbers.",
    ],
    quiz: [
      {
        q: "\\(\\lim_{x\\to 4}(3x - 7)=\\)",
        choices: ["5", "7", "12", "undefined"],
        answerIndex: 0,
        explanation: "Polynomial, plug in: \\(12-7=5\\).",
      },
      {
        q: "If \\(\\lim f = 6\\) and \\(\\lim g = 0\\), which limit is GUARANTEED to exist?",
        choices: ["\\(\\lim(f/g)\\)", "\\(\\lim(f \\cdot g)\\)", "\\(\\lim(1/g)\\)", "None"],
        answerIndex: 1,
        explanation: "Product rule always works: \\(6 \\cdot 0 = 0\\). The others have denominator \\(\\to 0\\).",
      },
      {
        q: "\\(\\lim_{x\\to 1}\\frac{x^2 - 1}{x-1}\\) by direct substitution gives:",
        choices: ["0/0 indeterminate", "2", "1", "\\(\\infty\\)"],
        answerIndex: 0,
        explanation: "Both numerator and denominator \\(\\to 0\\) — indeterminate, need algebra next.",
      },
      {
        q: "If \\(\\lim_{x\\to a}g(x)=3\\) and \\(f\\) is continuous at 3, then \\(\\lim_{x\\to a}f(g(x))=\\)",
        choices: ["\\(f(a)\\)", "\\(g(a)\\)", "\\(f(3)\\)", "Depends on \\(f\\)."],
        answerIndex: 2,
        explanation: "Continuity of \\(f\\) at 3 lets you pass the limit inside: \\(f(\\lim g) = f(3)\\).",
      },
    ],
  },

  "1.6": {
    id: "1.6",
    title: "Determining Limits Using Algebraic Manipulation",
    summary:
      "When substitution gives \\(0/0\\), factor, cancel, rationalize with a conjugate, or simplify — then substitute again.",
    lesson:
      "Indeterminate form \\(0/0\\) means numerator and denominator share a common factor that's hiding the answer. Three standard moves clear it:\n\n(1) Factor and cancel. \\(\\lim_{x\\to 2}\\frac{x^2 - 4}{x - 2} = \\lim_{x\\to 2}\\frac{(x-2)(x+2)}{x-2} = \\lim_{x\\to 2}(x+2) = 4\\). The cancellation is legal because the limit cares about \\(x \\ne 2\\), where \\(x - 2 \\ne 0\\).\n\n(2) Rationalize. \\(\\lim_{x\\to 0}\\frac{\\sqrt{x+4} - 2}{x}\\) — multiply top and bottom by the conjugate \\(\\sqrt{x+4}+2\\). Numerator becomes \\((x+4) - 4 = x\\), and the \\(x\\) cancels. Left with \\(\\frac{1}{\\sqrt{x+4}+2} \\to \\frac{1}{4}\\).\n\n(3) Common denominator. \\(\\lim_{h\\to 0}\\frac{1/(x+h) - 1/x}{h} = \\lim\\frac{x - (x+h)}{h \\cdot x(x+h)} = \\lim\\frac{-1}{x(x+h)} = -\\frac{1}{x^2}\\). Useful for derivative-definition limits.\n\nThere's also the trig identity bag: \\(\\sin(x)/x \\to 1\\), \\((1-\\cos x)/x \\to 0\\), \\((1-\\cos x)/x^2 \\to 1/2\\). Memorize these — they're recurring FRQ flavors.\n\nGeneral strategy: substitute first. If you get a real number, you're done. If \\(0/0\\), reach for algebra. If you truly cannot simplify (e.g. limit involves exponentials and polynomials together), L'Hopital awaits in Unit 4.7.",
    keyIdeas: [
      "0/0 is the algebra flag — factor, rationalize, or common denominator.",
      "\\(\\sin(x)/x \\to 1\\) and \\((1-\\cos x)/x \\to 0\\) as \\(x\\to 0\\).",
      "Cancellation is valid under the limit because \\(x\\ne a\\) in the limit.",
      "Always re-substitute after simplifying.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\lim_{x\\to 0}\\frac{\\sqrt{x+9}-3}{x}\\).",
      solution:
        "Multiply by conjugate: \\(\\frac{\\sqrt{x+9}-3}{x}\\cdot\\frac{\\sqrt{x+9}+3}{\\sqrt{x+9}+3} = \\frac{x}{x(\\sqrt{x+9}+3)} = \\frac{1}{\\sqrt{x+9}+3}\\). Substitute: \\(\\frac{1}{\\sqrt{9}+3} = \\frac{1}{6}\\).",
    },
    flashcards: [
      { q: "First move on \\(0/0\\) with polynomials?", a: "Factor and cancel the shared root." },
      { q: "First move on \\(0/0\\) with square roots?", a: "Multiply by the conjugate." },
      { q: "\\(\\lim_{x\\to 0}\\sin(x)/x = ?\\)", a: "1." },
      { q: "\\(\\lim_{x\\to 0}(1-\\cos x)/x = ?\\)", a: "0." },
    ],
    commonMistakes: [
      "Canceling a factor that was never actually in both numerator and denominator.",
      "Forgetting to re-substitute after simplifying.",
      "Mixing up \\((1-\\cos x)/x\\) (= 0) with \\((1-\\cos x)/x^2\\) (= 1/2).",
    ],
    quiz: [
      {
        q: "\\(\\lim_{x\\to 3}\\frac{x^2-9}{x-3}=\\)",
        choices: ["0", "6", "3", "DNE"],
        answerIndex: 1,
        explanation: "Factor: \\((x-3)(x+3)/(x-3) = x+3 \\to 6\\).",
      },
      {
        q: "\\(\\lim_{x\\to 0}\\frac{\\sin(3x)}{x}=\\)",
        choices: ["0", "1", "3", "\\(1/3\\)"],
        answerIndex: 2,
        explanation: "Rewrite as \\(3\\cdot\\frac{\\sin(3x)}{3x}\\to 3\\cdot 1 = 3\\).",
      },
      {
        q: "When you get \\(0/0\\), what does it mean?",
        choices: ["The limit is 0.", "The limit is 1.", "The form is indeterminate — more work required.", "The limit DNE."],
        answerIndex: 2,
        explanation: "0/0 is indeterminate; algebra or L'Hopital resolves it.",
      },
      {
        q: "\\(\\lim_{h\\to 0}\\frac{(2+h)^2 - 4}{h}=\\)",
        choices: ["0", "2", "4", "8"],
        answerIndex: 2,
        explanation: "Expand: \\((4+4h+h^2-4)/h = 4 + h \\to 4\\). (This is \\(f'(2)\\) for \\(f=x^2\\).)",
      },
    ],
  },

  "1.7": {
    id: "1.7",
    title: "Selecting Procedures for Determining Limits",
    summary:
      "Decide which technique to use: substitute, factor, rationalize, use a trig identity, squeeze, or defer to L'Hopital — based on what substitution returns.",
    lesson:
      "This topic is meta: instead of drilling one technique, you decide which one to use. Flowchart:\n\nStep 1: Substitute \\(x = a\\). If you get a finite number, done. If you get \\(c/0\\) with \\(c\\ne 0\\), the limit is infinite (or DNE two-sided). If you get \\(0/0\\) or \\(\\infty/\\infty\\), it's indeterminate — continue.\n\nStep 2: Recognize the form. Polynomial over polynomial with shared root? Factor. Square roots in numerator or denominator? Rationalize with conjugate. Complex fraction? Common denominator. Piecewise? Use the correct piece and one-sided limits.\n\nStep 3: Trig limits. \\(\\sin(x)/x\\), \\((1-\\cos x)/x\\), and variants. Rewrite to expose the standard forms — e.g. \\(\\lim \\tan x / x = \\lim (\\sin x / x)(1/\\cos x) = 1\\).\n\nStep 4: Squeeze. If the function is bounded between two functions with equal limits, use Unit 1.8's squeeze theorem. Common for \\(x \\sin(1/x)\\) type expressions.\n\nStep 5: L'Hopital (Unit 4.7). Differentiate top and bottom separately for \\(0/0\\) or \\(\\infty/\\infty\\). Save this for when nothing else is obvious or for mixed transcendental-polynomial limits.\n\nOn MC questions, often the fastest path is to estimate with a number close to \\(a\\) on your calculator. On FRQs, you must show the algebra.",
    keyIdeas: [
      "Always substitute first — it's free.",
      "\\(0/0\\): factor or rationalize. \\(\\infty/\\infty\\): divide by highest power or L'Hopital.",
      "Trig limits: reshape to \\(\\sin(u)/u\\) form.",
      "Squeeze when the function is bounded by two others with the same limit.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\lim_{x\\to 0} \\frac{1 - \\cos x}{x \\sin x}\\).",
      solution:
        "Substitution gives \\(0/0\\). Multiply top and bottom by \\(1 + \\cos x\\): numerator becomes \\(1 - \\cos^2 x = \\sin^2 x\\). So expression = \\(\\frac{\\sin^2 x}{x \\sin x (1 + \\cos x)} = \\frac{\\sin x}{x(1+\\cos x)} \\to \\frac{1}{1(1+1)} = \\frac{1}{2}\\).",
    },
    flashcards: [
      { q: "First thing to try on any limit?", a: "Direct substitution." },
      { q: "Got \\(5/0\\) — what's the limit?", a: "Infinite; check signs to determine \\(+\\infty\\) or \\(-\\infty\\)." },
      { q: "Got 0/0 with a square root?", a: "Rationalize with the conjugate." },
    ],
    commonMistakes: [
      "Jumping to L'Hopital before trying substitution or algebra.",
      "Applying L'Hopital to a limit that isn't \\(0/0\\) or \\(\\infty/\\infty\\).",
      "Treating \\(c/0\\) (c nonzero) as indeterminate — it's infinite.",
    ],
    quiz: [
      {
        q: "\\(\\lim_{x\\to 2}\\frac{x-2}{x^2-4}\\) — best method?",
        choices: ["Substitute", "Factor and cancel", "Squeeze", "L'Hopital only"],
        answerIndex: 1,
        explanation: "Substitution gives 0/0; factor denominator \\((x-2)(x+2)\\) and cancel.",
      },
      {
        q: "\\(\\lim_{x\\to 0}\\frac{\\sin(5x)}{2x}\\) — best method?",
        choices: ["Factor", "Rewrite as \\(\\frac{5}{2}\\cdot\\frac{\\sin 5x}{5x}\\)", "Conjugate", "Squeeze"],
        answerIndex: 1,
        explanation: "Standard trig limit: multiply/divide to match \\(\\sin(u)/u \\to 1\\); limit = 5/2.",
      },
      {
        q: "\\(\\lim_{x\\to 0}\\frac{\\sqrt{x+1}-1}{x}\\) — best method?",
        choices: ["Substitute", "Factor", "Rationalize (conjugate)", "Squeeze"],
        answerIndex: 2,
        explanation: "0/0 with square root — rationalize; get 1/2.",
      },
      {
        q: "\\(\\lim_{x\\to 0}\\frac{7}{x^2}\\) equals:",
        choices: ["0", "7", "\\(\\infty\\)", "7/0 = indeterminate"],
        answerIndex: 2,
        explanation: "Nonzero over 0 with \\(x^2 > 0\\) on both sides — blows up to \\(+\\infty\\). Not indeterminate.",
      },
    ],
  },

  "1.8": {
    id: "1.8",
    title: "Determining Limits Using the Squeeze Theorem",
    summary:
      "If \\(g(x) \\le f(x) \\le h(x)\\) near \\(a\\) and \\(\\lim g = \\lim h = L\\), then \\(\\lim f = L\\) too.",
    lesson:
      "The squeeze theorem (also called the sandwich theorem) rescues limits where direct computation is hopeless but bounds are easy. You find two helper functions pinching \\(f\\), and if both helpers tend to the same limit, \\(f\\) is forced to match.\n\nClassic example: \\(\\lim_{x\\to 0} x^2 \\sin(1/x)\\). The factor \\(\\sin(1/x)\\) oscillates wildly as \\(x \\to 0\\), so you cannot plug in or factor. But \\(-1 \\le \\sin(1/x) \\le 1\\). Multiply by \\(x^2 \\ge 0\\): \\(-x^2 \\le x^2 \\sin(1/x) \\le x^2\\). As \\(x \\to 0\\), both bounds go to 0, so the middle does too.\n\nKey setup steps: (1) identify the bounded oscillating factor; (2) multiply by the \"shrinker\" (the factor going to 0) — be careful about sign when multiplying by something that can be negative; (3) check both bounds have the same limit.\n\nThe squeeze theorem also proves \\(\\lim_{x\\to 0}\\sin(x)/x = 1\\) from scratch using a geometric argument involving unit circle areas — you don't need to reproduce that proof on the exam, but know the result is provable this way.",
    keyIdeas: [
      "Need an upper and lower bound around \\(f\\) that agree in the limit.",
      "Bounded-times-shrinking is the hallmark pattern (e.g. \\(x^2\\sin(1/x)\\)).",
      "Bounds must hold on an interval around \\(a\\), except possibly at \\(a\\) itself.",
      "Both bound limits must be equal to conclude.",
    ],
    workedExample: {
      prompt:
        "Use the squeeze theorem to find \\(\\lim_{x\\to 0} x \\cos(1/x)\\).",
      solution:
        "\\(-1 \\le \\cos(1/x) \\le 1\\). Multiply by \\(|x|\\): \\(-|x| \\le x\\cos(1/x) \\le |x|\\). Both bounds \\(\\to 0\\) as \\(x \\to 0\\). Therefore \\(\\lim_{x\\to 0} x\\cos(1/x) = 0\\).",
    },
    flashcards: [
      { q: "Statement of squeeze theorem?", a: "If \\(g\\le f\\le h\\) near \\(a\\) and \\(\\lim g=\\lim h=L\\), then \\(\\lim f = L\\)." },
      { q: "When is squeeze the right tool?", a: "Bounded factor times a factor going to 0, or otherwise trapped function." },
      { q: "\\(\\lim_{x\\to 0}x^2\\sin(1/x)=?\\)", a: "0, by squeeze." },
    ],
    commonMistakes: [
      "Using bounds that don't actually bound \\(f\\).",
      "Forgetting to flip inequality when multiplying by a negative.",
      "Concluding when the two bound limits disagree.",
    ],
    quiz: [
      {
        q: "Squeeze theorem requires which condition?",
        choices: ["\\(g(x)=h(x)\\) for all \\(x\\).", "\\(\\lim g = \\lim h\\) and \\(g\\le f\\le h\\) near \\(a\\).", "\\(f\\) is continuous.", "\\(f(a)\\) exists."],
        answerIndex: 1,
        explanation: "Two matching bounds at the target is the whole hypothesis.",
      },
      {
        q: "\\(\\lim_{x\\to 0}x^2\\sin(1/x)=\\)",
        choices: ["1", "0", "DNE", "\\(\\infty\\)"],
        answerIndex: 1,
        explanation: "\\(-x^2 \\le x^2\\sin(1/x) \\le x^2\\), both bounds \\(\\to 0\\).",
      },
      {
        q: "Which limit is best evaluated by squeeze theorem?",
        choices: ["\\(\\lim_{x\\to 3}(x^2 - 9)\\)", "\\(\\lim_{x\\to 0}x\\sin(1/x)\\)", "\\(\\lim_{x\\to 1}\\frac{x^2-1}{x-1}\\)", "\\(\\lim_{x\\to\\infty}\\frac{1}{x}\\)"],
        answerIndex: 1,
        explanation: "The oscillating \\(\\sin(1/x)\\) is bounded; times \\(x\\to 0\\) is a squeeze setup.",
      },
      {
        q: "If \\(g(x) \\le f(x) \\le h(x)\\) with \\(\\lim g = 2\\) and \\(\\lim h = 3\\), what can we conclude about \\(\\lim f\\)?",
        choices: ["\\(\\lim f = 2.5\\)", "\\(\\lim f = 2\\)", "\\(\\lim f = 3\\)", "Cannot conclude from squeeze alone."],
        answerIndex: 3,
        explanation: "Squeeze requires equal bound limits; otherwise it's inconclusive.",
      },
    ],
  },

  "1.9": {
    id: "1.9",
    title: "Connecting Multiple Representations of Limits",
    summary:
      "Translate between graphs, tables, algebraic formulas, and verbal descriptions — the same limit shows up in four guises on the exam.",
    lesson:
      "AP loves to give you a graph of \\(f\\), a formula for \\(g\\), and a table for \\(h\\), then ask about \\(\\lim (f \\cdot g)\\) or \\(\\lim f(g(x))\\). You have to pull the right limit from the right representation.\n\nFrom graphs: read one-sided approach values; distinguish hole from point.\n\nFrom tables: sample both sides; watch for evidence of oscillation or disagreement.\n\nFrom algebra: try substitution, then algebraic manipulation (Unit 1.6).\n\nFrom descriptions: if the problem says \"as time approaches 5, water volume approaches 200 gallons,\" that's \\(\\lim_{t\\to 5} V(t) = 200\\), regardless of whether \\(V(5)\\) is defined.\n\nThe limit-law combinations (Unit 1.5) work regardless of the source representation. If \\(\\lim f(x) = 3\\) from a graph and \\(\\lim g(x) = 4\\) from a formula, then \\(\\lim(f+g) = 7\\) no matter where the pieces came from.\n\nKey exam skill: be fluent in reading each representation and converting to the universal limit notation. Practice translating: \"the graph has a hole at \\((2, 5)\\) with the curve passing through 5 on both sides\" \\(\\equiv\\) \\(\\lim_{x\\to 2}f(x) = 5\\) but \\(f(2) \\ne 5\\).",
    keyIdeas: [
      "Four representations: graph, table, formula, context.",
      "Limit laws apply across representations.",
      "Function value \\(\\ne\\) limit value in general.",
      "\"Hole\" visuals = \"limit exists but function undefined or different.\"",
    ],
    workedExample: {
      prompt:
        "Given a graph with \\(\\lim_{x\\to 1}f(x) = 4\\) and a table showing \\(g(1.1)=5.9, g(0.9)=6.1\\), estimate \\(\\lim_{x\\to 1}[f(x) + g(x)]\\).",
      solution:
        "Table suggests \\(\\lim g = 6\\). Limit of sum is \\(4 + 6 = 10\\).",
    },
    flashcards: [
      { q: "Does a limit care about \\(f(a)\\)?", a: "No." },
      { q: "What's a \"hole\" graphically?", a: "Open circle where the function is undefined or differently valued." },
      { q: "\"Approaches\" in context is which notation?", a: "\\(\\lim_{x\\to a} f(x) = L\\)." },
    ],
    commonMistakes: [
      "Reading a filled dot as the limit value.",
      "Applying limit laws when one limit doesn't exist.",
      "Missing one-sided vs two-sided distinctions across representations.",
    ],
    quiz: [
      {
        q: "Graph shows \\(\\lim_{x\\to 2}f=3\\) and \\(f(2)=1\\). What is \\(\\lim_{x\\to 2}f(x)\\)?",
        choices: ["1", "2", "3", "DNE"],
        answerIndex: 2,
        explanation: "Limit is determined by the approach, 3, not the function value.",
      },
      {
        q: "Table: \\(h(2.99)=5.01, h(3.01)=5.02, h(3)=7\\). What is \\(\\lim_{x\\to 3}h(x)\\)?",
        choices: ["5 (approx.)", "6", "7", "DNE"],
        answerIndex: 0,
        explanation: "Both sides approach ~5; the value at 3 is irrelevant.",
      },
      {
        q: "If \\(\\lim f = 2\\) (graph) and \\(\\lim g = 3\\) (formula), \\(\\lim(fg)=\\)",
        choices: ["5", "6", "2/3", "Cannot determine"],
        answerIndex: 1,
        explanation: "Product rule: \\(2 \\cdot 3 = 6\\).",
      },
      {
        q: "Representation-independent fact about limits?",
        choices: ["Limit = function value always.", "Limit laws (sum, product, quotient) apply regardless of representation.", "Limits require algebraic formulas.", "Limits cannot exist at holes."],
        answerIndex: 1,
        explanation: "As long as each limit exists, the laws combine them, irrespective of how each was found.",
      },
    ],
  },

  "1.10": {
    id: "1.10",
    title: "Exploring Types of Discontinuities",
    summary:
      "Three flavors: removable (hole), jump (one-sided limits disagree), and infinite (vertical asymptote).",
    lesson:
      "A discontinuity at \\(x = a\\) is any failure of \\(f\\) to be continuous there. The CED names three types you must recognize by sight.\n\nRemovable (hole): \\(\\lim_{x\\to a} f(x)\\) exists but either \\(f(a)\\) is undefined or \\(f(a) \\ne\\) the limit. Example: \\(f(x) = (x^2 - 1)/(x - 1)\\) at \\(x = 1\\). The limit is 2 but the function isn't defined there. Redefining \\(f(1) = 2\\) patches the hole — hence \"removable.\"\n\nJump: left and right limits both exist and are finite, but they disagree. Common in piecewise functions. Example: \\(f(x) = x\\) for \\(x<0\\), \\(f(x) = x+1\\) for \\(x\\ge 0\\) has a jump of height 1 at 0.\n\nInfinite: at least one one-sided limit is \\(\\pm\\infty\\); the function has a vertical asymptote. Example: \\(f(x) = 1/x\\) at \\(x = 0\\).\n\nThere's also oscillating (e.g. \\(\\sin(1/x)\\) at 0), which doesn't fit the three boxes cleanly; on AP questions this is usually lumped under \"neither removable, jump, nor infinite.\"\n\nExam trap: a question might show \\(f(a)\\) defined but as a different number than the limit. That's still a removable discontinuity — the limit exists, the point just isn't where it should be.",
    keyIdeas: [
      "Removable: limit exists; value missing or misplaced.",
      "Jump: left \\(\\ne\\) right, both finite.",
      "Infinite: one or both sides blow up.",
      "Redefining the point only fixes removable discontinuities.",
    ],
    workedExample: {
      prompt:
        "Classify the discontinuity of \\(f(x) = \\frac{x^2 - 4}{x - 2}\\) at \\(x = 2\\).",
      solution:
        "Factor: \\(f(x) = x + 2\\) for \\(x\\ne 2\\). \\(\\lim_{x\\to 2}f = 4\\). But \\(f(2)\\) is undefined (division by zero). Limit exists, value missing — removable discontinuity.",
    },
    flashcards: [
      { q: "Removable discontinuity in one line?", a: "Limit exists but doesn't equal \\(f(a)\\) (or \\(f(a)\\) undefined)." },
      { q: "Jump in one line?", a: "Left and right limits disagree (both finite)." },
      { q: "Infinite discontinuity?", a: "Vertical asymptote — one-sided limit is \\(\\pm\\infty\\)." },
    ],
    commonMistakes: [
      "Calling a hole a \"jump\" because the graph looks broken.",
      "Saying \"infinite discontinuity\" when both sides are finite but disagree (that's jump).",
      "Forgetting you can have a removable discontinuity even when \\(f(a)\\) is defined.",
    ],
    quiz: [
      {
        q: "\\(f(x) = \\frac{\\sin x}{x}\\) at \\(x=0\\) has which type of discontinuity?",
        choices: ["Removable", "Jump", "Infinite", "None"],
        answerIndex: 0,
        explanation: "Limit is 1 but \\(f(0)\\) undefined — removable (define \\(f(0)=1\\)).",
      },
      {
        q: "\\(f(x) = 1/x\\) at \\(x=0\\) has:",
        choices: ["Removable discontinuity", "Jump discontinuity", "Infinite discontinuity", "No discontinuity"],
        answerIndex: 2,
        explanation: "Vertical asymptote — infinite discontinuity.",
      },
      {
        q: "Piecewise \\(f\\): \\(f(x)=2\\) for \\(x<1\\), \\(f(x)=5\\) for \\(x\\ge 1\\). At \\(x=1\\):",
        choices: ["Removable", "Jump", "Infinite", "Continuous"],
        answerIndex: 1,
        explanation: "Left limit 2, right limit 5 — finite but unequal = jump.",
      },
      {
        q: "Which discontinuity can be \"fixed\" by redefining \\(f(a)\\)?",
        choices: ["Jump", "Infinite", "Removable", "All three"],
        answerIndex: 2,
        explanation: "Only when the limit exists can a single redefinition make \\(f\\) continuous.",
      },
    ],
    diagram: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
      ${AXIS}
      <path d="M40 80 L180 80" stroke="#c2410c" stroke-width="2.4" fill="none" />
      <path d="M220 140 L360 140" stroke="#c2410c" stroke-width="2.4" fill="none" />
      <circle cx="180" cy="80" r="4" fill="white" stroke="#c2410c" stroke-width="2" />
      <circle cx="220" cy="140" r="4" fill="#c2410c" />
      <text x="150" y="60" font-family="ui-sans-serif" font-size="11" fill="#6b6b6b">jump</text>
    </svg>`,
  },

  "1.11": {
    id: "1.11",
    title: "Defining Continuity at a Point",
    summary:
      "\\(f\\) is continuous at \\(a\\) iff (1) \\(f(a)\\) exists, (2) \\(\\lim_{x\\to a}f(x)\\) exists, (3) they're equal.",
    lesson:
      "Continuity at a single point has three boxes to check, and all three must be ticked:\n\n1. \\(f(a)\\) is defined — plug in \\(a\\), get a real number.\n2. \\(\\lim_{x\\to a} f(x)\\) exists — both one-sided limits agree on a real number.\n3. \\(\\lim_{x\\to a} f(x) = f(a)\\) — the approach matches the value.\n\nIf any box fails, \\(f\\) is discontinuous at \\(a\\). Fail box 1 and you have either a removable (if limit exists) or infinite discontinuity. Fail box 2 and you have a jump or infinite. Fail only box 3 (approach and value disagree) and you have a removable.\n\nWhy the three-box definition? Because each condition rules out one flavor of brokenness. Box 1 makes sure the function exists at \\(a\\); box 2 makes sure it has a sensible neighborhood; box 3 makes sure they match — the graph you'd draw passes through the point without lifting your pencil.\n\nAll polynomials are continuous everywhere. Rational functions are continuous wherever the denominator is nonzero. \\(e^x\\), \\(\\ln x\\) (on \\(x > 0\\)), \\(\\sin x\\), \\(\\cos x\\) are continuous on their domains. So you almost never need the three-box check for these — only at piecewise junctions or removable holes.",
    keyIdeas: [
      "Three-part definition: value, limit, equality.",
      "Continuous at \\(a\\) \\(\\Leftrightarrow\\) graph passes smoothly through \\((a, f(a))\\).",
      "Standard functions are continuous on their domains.",
      "Piecewise junctions are where you actually do the three-box check.",
    ],
    workedExample: {
      prompt:
        "Is \\(f(x) = \\begin{cases}\\frac{x^2-9}{x-3}, & x\\ne 3 \\\\ 6, & x=3\\end{cases}\\) continuous at \\(x=3\\)?",
      solution:
        "Box 1: \\(f(3) = 6\\). Defined. Box 2: \\(\\lim_{x\\to 3}\\frac{x^2-9}{x-3} = \\lim (x+3) = 6\\). Exists. Box 3: limit = value = 6. All three pass — continuous at 3.",
    },
    flashcards: [
      { q: "Three conditions for continuity at \\(a\\)?", a: "(1) \\(f(a)\\) exists; (2) limit exists; (3) they match." },
      { q: "Does continuity at \\(a\\) imply continuity nearby?", a: "Not necessarily — that's continuity on an interval." },
      { q: "Is \\(f(x)=1/x\\) continuous at 0?", a: "No — \\(f(0)\\) undefined, fails box 1." },
    ],
    commonMistakes: [
      "Declaring continuity after only checking the limit.",
      "Declaring continuity after only checking the value.",
      "Forgetting to verify they match when both exist.",
    ],
    quiz: [
      {
        q: "Continuity at \\(a\\) requires which set of conditions?",
        choices: ["\\(f(a)\\) exists.", "\\(\\lim_{x\\to a}f(x)\\) exists.", "\\(\\lim_{x\\to a}f(x) = f(a)\\).", "All three above."],
        answerIndex: 3,
        explanation: "All three boxes must check.",
      },
      {
        q: "\\(f(x)=\\begin{cases}x+1 & x<2\\\\ 5 & x=2\\\\ 3 & x>2\\end{cases}\\). Continuous at 2?",
        choices: ["Yes", "No — limit DNE", "No — value misplaced", "Yes, if we redefine"],
        answerIndex: 1,
        explanation: "Left limit 3, right limit 3 — wait, left is 2+1=3, right is 3. Limit=3, but \\(f(2)=5 \\ne 3\\). Fails box 3, not box 2. So \"No — value misplaced.\" Correct answer: the limit exists (=3) but \\(f(2)=5\\) mismatches.",
      },
      {
        q: "Which function is NOT continuous at \\(x=0\\)?",
        choices: ["\\(f(x) = x^2\\)", "\\(f(x) = \\cos x\\)", "\\(f(x) = 1/x\\)", "\\(f(x) = e^x\\)"],
        answerIndex: 2,
        explanation: "\\(1/x\\) has no value at 0 and blows up — discontinuous.",
      },
      {
        q: "If \\(\\lim_{x\\to 4}f(x) = 7\\) and \\(f(4) = 7\\), is \\(f\\) continuous at 4?",
        choices: ["Yes", "No", "Only if \\(f\\) is a polynomial", "Insufficient info"],
        answerIndex: 0,
        explanation: "All three continuity boxes pass.",
      },
    ],
  },

  "1.12": {
    id: "1.12",
    title: "Confirming Continuity over an Interval",
    summary:
      "\\(f\\) is continuous on an interval if continuous at every interior point and (for closed intervals) has matching one-sided limits at the endpoints.",
    lesson:
      "A function is continuous on an open interval \\((a, b)\\) if it's continuous at every point inside. For a closed interval \\([a, b]\\), continuity at the endpoints means one-sided continuity: \\(\\lim_{x\\to a^+}f(x) = f(a)\\) and \\(\\lim_{x\\to b^-}f(x) = f(b)\\).\n\nCommon continuous families on their domains: polynomials (everywhere), rational (where denominator nonzero), trig functions \\(\\sin, \\cos\\) (everywhere), \\(\\tan\\) (away from odd multiples of \\(\\pi/2\\)), exponentials (everywhere), logarithms (on \\(x > 0\\)), roots (on domain).\n\nFor piecewise functions, continuity on an interval is a junction-check exercise. At every seam, verify the three-box definition; inside each piece, the formula is typically continuous.\n\nImportantly, continuity on an interval is the hypothesis for two major theorems: the Intermediate Value Theorem (Unit 1.16) and the Extreme Value Theorem (Unit 5.2). Both require \\(f\\) continuous on a closed interval, so proving continuity is often the first line of the FRQ solution.",
    keyIdeas: [
      "Continuous on \\((a,b)\\) means continuous at each interior point.",
      "Closed intervals add one-sided continuity at endpoints.",
      "Standard families are continuous on their natural domains.",
      "Piecewise: inspect each seam separately.",
    ],
    workedExample: {
      prompt:
        "Is \\(f(x) = \\begin{cases}x^2, & x\\le 1 \\\\ 2x - 1, & x>1\\end{cases}\\) continuous on \\([0, 2]\\)?",
      solution:
        "Each piece is a polynomial (continuous on its range). Check seam at \\(x=1\\): \\(f(1) = 1\\). Left limit: \\(1^2 = 1\\). Right limit: \\(2(1)-1 = 1\\). All match: continuous at 1. Therefore continuous on \\([0,2]\\).",
    },
    flashcards: [
      { q: "Closed interval continuity at endpoint \\(a\\)?", a: "\\(\\lim_{x\\to a^+}f = f(a)\\)." },
      { q: "When do you need to check at a piecewise junction?", a: "Always — inside each piece the standard formula is already continuous." },
      { q: "Is a polynomial continuous on \\([-100, 100]\\)?", a: "Yes — polynomials are continuous everywhere." },
    ],
    commonMistakes: [
      "Forgetting that closed-interval continuity needs one-sided matches at endpoints.",
      "Checking only one side at a piecewise seam.",
      "Assuming rational functions are continuous at zeros of the denominator.",
    ],
    quiz: [
      {
        q: "Is \\(f(x) = \\tan x\\) continuous on \\([0, \\pi]\\)?",
        choices: ["Yes", "No — discontinuous at \\(\\pi/2\\)", "Only on \\((0, \\pi)\\)", "Only at integer points"],
        answerIndex: 1,
        explanation: "\\(\\tan(\\pi/2)\\) is undefined — vertical asymptote.",
      },
      {
        q: "A piecewise function has each piece polynomial but a mismatch at the seam. Continuous on an interval containing the seam?",
        choices: ["Yes", "No", "Sometimes", "Depends on slope"],
        answerIndex: 1,
        explanation: "A seam mismatch is a discontinuity; fails the three-box test.",
      },
      {
        q: "A polynomial is continuous:",
        choices: ["Only on \\((0, \\infty)\\)", "Only on integers", "Everywhere", "Only on its domain of definition, but its domain excludes some points"],
        answerIndex: 2,
        explanation: "Polynomials are continuous on all of \\(\\mathbb R\\).",
      },
      {
        q: "What's needed to apply EVT or IVT?",
        choices: ["Differentiability", "Continuity on a closed interval \\([a,b]\\)", "\\(f\\) polynomial", "\\(f(a)=f(b)\\)"],
        answerIndex: 1,
        explanation: "Both theorems require continuity on a closed interval.",
      },
    ],
  },

  "1.13": {
    id: "1.13",
    title: "Removing Discontinuities",
    summary:
      "A removable discontinuity at \\(a\\) can be patched by redefining \\(f(a) = \\lim_{x\\to a}f(x)\\).",
    lesson:
      "If \\(\\lim_{x\\to a} f(x) = L\\) exists but \\(f(a) \\ne L\\) (or is undefined), you can build a new function \\(\\tilde f\\) that agrees with \\(f\\) away from \\(a\\) and has \\(\\tilde f(a) = L\\). That new function is continuous at \\(a\\). The discontinuity has been \"removed.\"\n\nYou only get to do this for removable discontinuities. If the left and right limits disagree (jump) or the function blows up (infinite), no single value of \\(f(a)\\) fixes anything.\n\nTypical question: the function \\(f(x) = (x^2 - 4)/(x-2)\\). What value of \\(f(2)\\) makes it continuous? Simplify: \\(f = x + 2\\) for \\(x \\ne 2\\). Limit at 2 is 4. Redefining \\(f(2) = 4\\) closes the hole.\n\nThis topic also underlies a critical idea: derivative quotients like \\(\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\) are technically removable-discontinuity-style limits — the expression is \\(0/0\\) at \\(h=0\\) but has a limit value we name \\(f'(a)\\).",
    keyIdeas: [
      "Only removable discontinuities are \"fixable.\"",
      "Patch value = \\(\\lim_{x\\to a} f(x)\\).",
      "Jumps and infinite discontinuities cannot be removed.",
      "This idea motivates the derivative definition as a \\(0/0\\) limit.",
    ],
    workedExample: {
      prompt:
        "What value of \\(f(3)\\) makes \\(f(x) = \\frac{x^2 - 9}{x - 3}\\) continuous at 3?",
      solution:
        "Simplify: \\(f(x) = x + 3\\) for \\(x\\ne 3\\). Limit at 3: 6. Define \\(f(3) = 6\\) to remove the hole.",
    },
    flashcards: [
      { q: "How do you remove a removable discontinuity?", a: "Redefine \\(f(a) = \\lim_{x\\to a} f(x)\\)." },
      { q: "Can you remove a jump?", a: "No — no single value can match two different one-sided limits." },
      { q: "Can you remove an infinite discontinuity?", a: "No — the limit doesn't exist as a real number." },
    ],
    commonMistakes: [
      "Trying to \"remove\" a jump — impossible.",
      "Setting \\(f(a)\\) to \\(f\\) at a nearby point instead of the limit.",
      "Forgetting to first check that the limit actually exists.",
    ],
    quiz: [
      {
        q: "\\(f(x) = \\frac{x-4}{x^2 - 16}\\). What \\(f(4)\\) makes it continuous at 4?",
        choices: ["0", "4", "\\(1/8\\)", "1"],
        answerIndex: 2,
        explanation: "Simplify: \\(f = 1/(x+4)\\). Limit at 4 = 1/8.",
      },
      {
        q: "Can a jump discontinuity be removed by redefining \\(f(a)\\)?",
        choices: ["Yes", "No", "Only if slope matches", "Only if \\(f\\) is even"],
        answerIndex: 1,
        explanation: "One-sided limits disagree; no single value fixes both sides.",
      },
      {
        q: "If \\(\\lim_{x\\to 2}f(x) = 5\\) but \\(f(2)\\) is undefined, redefining \\(f(2)=\\)",
        choices: ["0", "2", "5", "Any value works"],
        answerIndex: 2,
        explanation: "To restore continuity, match the limit value.",
      },
      {
        q: "Which is TRUE about removable discontinuities?",
        choices: ["The limit at \\(a\\) does not exist.", "The one-sided limits disagree.", "The limit exists but differs from \\(f(a)\\) (or \\(f(a)\\) undefined).", "The function has a vertical asymptote."],
        answerIndex: 2,
        explanation: "Definition of removable.",
      },
    ],
  },

  "1.14": {
    id: "1.14",
    title: "Connecting Infinite Limits and Vertical Asymptotes",
    summary:
      "\\(\\lim_{x\\to a}f(x) = \\pm\\infty\\) means \\(f\\) blows up near \\(a\\); graphically, \\(x = a\\) is a vertical asymptote.",
    lesson:
      "A vertical asymptote at \\(x = a\\) means the graph shoots off to \\(\\pm\\infty\\) as \\(x\\) approaches \\(a\\) from at least one side. Algebraically, this shows up as a zero of the denominator that is not canceled by a matching factor in the numerator — in other words, a denominator zero that isn't a removable hole.\n\nTo determine the sign behavior on each side of an asymptote, use a sign analysis. For \\(f(x) = 1/(x-2)\\) near \\(x=2\\): just to the left (say \\(x=1.9\\)), denominator is tiny negative, so \\(f\\) is huge negative; just right, \\(f\\) is huge positive. So \\(\\lim_{x\\to 2^-}f = -\\infty\\) and \\(\\lim_{x\\to 2^+}f = +\\infty\\). Two-sided limit DNE.\n\nFor \\(1/(x-2)^2\\), the denominator is always positive, so \\(f\\) goes to \\(+\\infty\\) on both sides; two-sided limit is \\(+\\infty\\) (which still counts as DNE for a real-valued limit but the notation is useful).\n\nAlways distinguish: a removable discontinuity has a limit as a finite number; an infinite discontinuity has \\(\\pm\\infty\\). Canceling common factors is the rule — if \\((x-a)\\) cancels cleanly from both top and bottom, it was a hole, not an asymptote.",
    keyIdeas: [
      "Vertical asymptote \\(\\Leftrightarrow\\) one-sided limit is \\(\\pm\\infty\\).",
      "Sign analysis tells you which infinity on each side.",
      "Uncanceled denominator zero = vertical asymptote; canceled = hole.",
      "Two-sided infinite limit still \"DNE\" formally.",
    ],
    workedExample: {
      prompt:
        "Find all vertical asymptotes of \\(f(x) = \\frac{x+1}{x^2 - x - 6}\\).",
      solution:
        "Factor denominator: \\(x^2 - x - 6 = (x-3)(x+2)\\). Zeros at 3 and \\(-2\\). Neither cancels the numerator \\(x+1\\). Vertical asymptotes at \\(x=3\\) and \\(x=-2\\).",
    },
    flashcards: [
      { q: "What causes a vertical asymptote?", a: "Uncanceled zero of the denominator." },
      { q: "Is a two-sided infinite limit technically \"existing\"?", a: "No — no finite value. We use notation for convenience." },
      { q: "Hole vs asymptote?", a: "Hole: factor cancels. Asymptote: it doesn't." },
    ],
    commonMistakes: [
      "Declaring an asymptote at a hole (canceled factor).",
      "Missing the sign change across the asymptote.",
      "Saying \\(\\lim = \\infty\\) counts as \"exists.\"",
    ],
    quiz: [
      {
        q: "\\(f(x)=\\frac{1}{x-3}\\). \\(\\lim_{x\\to 3^+}f(x)=\\)",
        choices: ["\\(-\\infty\\)", "0", "\\(+\\infty\\)", "3"],
        answerIndex: 2,
        explanation: "Just right of 3, denominator is small positive, so \\(f\\) is large positive.",
      },
      {
        q: "Which indicates a vertical asymptote at \\(x=a\\)?",
        choices: ["\\(f(a)\\) is defined.", "Both one-sided limits are finite.", "At least one one-sided limit is \\(\\pm\\infty\\).", "\\(\\lim_{x\\to a}f(x)=0\\)."],
        answerIndex: 2,
        explanation: "That's the defining condition.",
      },
      {
        q: "\\(f(x)=\\frac{x-1}{x^2-1}\\). At \\(x=1\\):",
        choices: ["Vertical asymptote", "Removable discontinuity (hole)", "Continuous", "Jump"],
        answerIndex: 1,
        explanation: "\\(\\frac{x-1}{(x-1)(x+1)} = \\frac{1}{x+1}\\); cancellation removes the discontinuity, leaving a hole.",
      },
      {
        q: "\\(\\lim_{x\\to 0}1/x^2\\) equals:",
        choices: ["0", "\\(+\\infty\\)", "\\(-\\infty\\)", "DNE (different signs)"],
        answerIndex: 1,
        explanation: "\\(x^2\\) positive on both sides; denominator tiny positive pushes \\(f\\to +\\infty\\).",
      },
    ],
  },

  "1.15": {
    id: "1.15",
    title: "Connecting Limits at Infinity and Horizontal Asymptotes",
    summary:
      "\\(\\lim_{x\\to \\pm\\infty}f(x) = L\\) means a horizontal asymptote \\(y=L\\); compare degrees for rational functions.",
    lesson:
      "A horizontal asymptote is the long-run leveling behavior. Formally, \\(\\lim_{x\\to\\infty}f(x) = L\\) says the graph flattens toward \\(y = L\\) far to the right. Similarly for \\(x \\to -\\infty\\).\n\nFor rational functions \\(p(x)/q(x)\\), compare degrees:\n- \\(\\deg p < \\deg q\\): limit is 0 — horizontal asymptote \\(y=0\\).\n- \\(\\deg p = \\deg q\\): limit is the ratio of leading coefficients.\n- \\(\\deg p > \\deg q\\): limit is \\(\\pm\\infty\\) — no horizontal asymptote (there may be a slant or polynomial asymptote).\n\nTo compute cleanly, divide numerator and denominator by the highest power of \\(x\\) appearing. E.g. \\(\\lim_{x\\to\\infty}\\frac{3x^2+5}{2x^2 - x + 1}\\): divide by \\(x^2\\) top and bottom — everything except the leading coefficients dies, giving \\(3/2\\).\n\nFor exponentials, \\(e^x\\) crushes any polynomial as \\(x\\to\\infty\\); \\(\\lim x^n/e^x = 0\\) for any \\(n\\). \\(\\ln x\\) grows but slower than any power. \\(\\lim_{x\\to\\infty}\\ln x/x = 0\\).\n\nA function can have two different horizontal asymptotes — one as \\(x\\to\\infty\\) and another as \\(x\\to-\\infty\\). Classic: \\(\\arctan(x)\\) approaches \\(\\pi/2\\) going right and \\(-\\pi/2\\) going left.",
    keyIdeas: [
      "Horizontal asymptote = finite limit at \\(\\pm\\infty\\).",
      "Rational functions: compare degrees; equal \\(\\Rightarrow\\) ratio of leading coefficients.",
      "Divide by the highest power of \\(x\\) to simplify.",
      "Exponentials beat polynomials; polynomials beat logs.",
    ],
    workedExample: {
      prompt:
        "Find the horizontal asymptotes of \\(f(x) = \\frac{5x^2 - 3}{x^2 + 4}\\).",
      solution:
        "Both degree 2; leading coefficients 5 and 1. \\(\\lim_{x\\to\\pm\\infty}f = 5\\). Single horizontal asymptote \\(y = 5\\).",
    },
    flashcards: [
      { q: "Rational function with top degree < bottom degree: horizontal asymptote?", a: "\\(y=0\\)." },
      { q: "Top degree = bottom: asymptote?", a: "Ratio of leading coefficients." },
      { q: "\\(\\lim_{x\\to\\infty}e^x/x^{100}=?\\)", a: "\\(\\infty\\) — exponential beats any polynomial." },
    ],
    commonMistakes: [
      "Comparing the wrong terms (not the leading ones).",
      "Forgetting horizontal asymptotes can differ at \\(+\\infty\\) vs \\(-\\infty\\).",
      "Concluding no asymptote when degree top > bottom without mentioning slant/poly behavior.",
    ],
    quiz: [
      {
        q: "Horizontal asymptote of \\(f(x)=\\frac{3x+1}{x^2+5}\\)?",
        choices: ["\\(y=3\\)", "\\(y=0\\)", "\\(y=1/5\\)", "None"],
        answerIndex: 1,
        explanation: "Top degree 1 < bottom degree 2; asymptote is \\(y=0\\).",
      },
      {
        q: "\\(\\lim_{x\\to\\infty}\\frac{4x^3-2}{7x^3+x}=\\)",
        choices: ["0", "\\(7/4\\)", "\\(4/7\\)", "\\(\\infty\\)"],
        answerIndex: 2,
        explanation: "Equal degree 3; ratio of leading coefficients 4/7.",
      },
      {
        q: "\\(\\lim_{x\\to\\infty}\\frac{x^3+1}{x+2}=\\)",
        choices: ["0", "1", "\\(\\infty\\)", "\\(1/2\\)"],
        answerIndex: 2,
        explanation: "Numerator grows faster (degree 3 vs 1); no horizontal asymptote.",
      },
      {
        q: "\\(\\lim_{x\\to\\infty}\\arctan(x)=\\)",
        choices: ["0", "\\(\\pi/2\\)", "\\(\\pi\\)", "\\(\\infty\\)"],
        answerIndex: 1,
        explanation: "\\(\\arctan\\) has horizontal asymptote \\(y=\\pi/2\\) at \\(+\\infty\\).",
      },
    ],
  },

  "1.16": {
    id: "1.16",
    title: "Working with the Intermediate Value Theorem",
    summary:
      "If \\(f\\) is continuous on \\([a,b]\\) and \\(N\\) lies between \\(f(a)\\) and \\(f(b)\\), then some \\(c \\in (a,b)\\) has \\(f(c)=N\\).",
    lesson:
      "IVT is an existence theorem: it guarantees a solution \\(c\\) exists, without telling you where. Two conditions must be verified explicitly on FRQs:\n\n1. \\(f\\) is continuous on \\([a, b]\\) — usually because it's a polynomial, rational (denominator nonzero), trig/exp/log on its domain, or a piecewise that's been checked.\n2. The target value \\(N\\) is strictly between \\(f(a)\\) and \\(f(b)\\).\n\nIf both hold, IVT concludes \\(\\exists c \\in (a, b)\\) with \\(f(c) = N\\). Classic use: prove \\(f\\) has a root in an interval by showing \\(f(a)\\) and \\(f(b)\\) differ in sign and \\(f\\) is continuous.\n\nAP FRQ template: \"Because \\(f\\) is continuous on \\([a, b]\\) [state why] and \\(f(a) = \\text{val}_1 < N < \\text{val}_2 = f(b)\\), by the Intermediate Value Theorem there exists \\(c\\) in \\((a, b)\\) such that \\(f(c) = N\\).\" Graders deduct if you skip the continuity justification.\n\nNote: IVT does not say the \\(c\\) is unique. There may be one, three, or more values of \\(c\\) hitting \\(N\\). IVT gives at least one.",
    keyIdeas: [
      "Conditions: continuity on \\([a,b]\\) and \\(N\\) strictly between \\(f(a), f(b)\\).",
      "Conclusion: \\(\\exists c \\in (a,b)\\) with \\(f(c) = N\\).",
      "Existence only, not location or uniqueness.",
      "FRQ: explicitly state both conditions before the conclusion.",
    ],
    workedExample: {
      prompt:
        "Show that \\(f(x) = x^3 + x - 1\\) has a root in \\([0, 1]\\).",
      solution:
        "\\(f\\) is a polynomial, hence continuous on \\([0,1]\\). \\(f(0) = -1 < 0\\) and \\(f(1) = 1 > 0\\). Since 0 is between \\(-1\\) and 1, by IVT there exists \\(c \\in (0, 1)\\) with \\(f(c) = 0\\).",
    },
    flashcards: [
      { q: "IVT conditions?", a: "Continuity on \\([a,b]\\); \\(N\\) between \\(f(a)\\) and \\(f(b)\\)." },
      { q: "IVT conclusion?", a: "\\(\\exists c\\in(a,b)\\) with \\(f(c) = N\\)." },
      { q: "Is \\(c\\) unique by IVT?", a: "No — only at least one exists." },
    ],
    commonMistakes: [
      "Skipping the continuity justification.",
      "Applying IVT to functions with discontinuities on the interval.",
      "Claiming IVT gives the exact \\(c\\) — it only asserts existence.",
    ],
    quiz: [
      {
        q: "IVT requires:",
        choices: ["\\(f\\) differentiable on \\([a,b]\\).", "\\(f\\) continuous on \\([a,b]\\) and \\(N\\) between \\(f(a), f(b)\\).", "\\(f(a)=f(b)\\).", "\\(f\\) monotonic."],
        answerIndex: 1,
        explanation: "Those are the two hypotheses.",
      },
      {
        q: "If \\(f(1) = -2\\) and \\(f(4) = 5\\) and \\(f\\) is continuous on \\([1,4]\\), IVT guarantees:",
        choices: ["\\(f\\) has exactly one zero in \\((1,4)\\).", "\\(f\\) has at least one zero in \\((1,4)\\).", "\\(f\\) has no zero in \\((1,4)\\).", "\\(f'\\) is positive somewhere."],
        answerIndex: 1,
        explanation: "0 is between -2 and 5, so IVT promises at least one zero.",
      },
      {
        q: "Which function allows direct IVT on \\([1,3]\\) to show it takes value 2?",
        choices: ["\\(f(x)=1/(x-2)\\)", "\\(f(x)=\\tan x\\)", "\\(f(x)=x^2+1\\)", "\\(f(x)=\\lfloor x\\rfloor\\)"],
        answerIndex: 2,
        explanation: "\\(x^2+1\\) is continuous everywhere; the others have discontinuities on \\([1,3]\\).",
      },
      {
        q: "A student claims IVT says \\(c\\) is unique. Correct?",
        choices: ["Yes", "No — IVT gives existence, not uniqueness", "Yes, if \\(f\\) is linear", "Only if \\(f(a)<f(b)\\)"],
        answerIndex: 1,
        explanation: "IVT is an existence theorem.",
      },
    ],
  },

  "2.1": {
    id: "2.1",
    title: "Defining Average and Instantaneous Rates of Change at a Point",
    summary:
      "Average rate of change is a secant slope on an interval; instantaneous rate is the limit of that as the interval shrinks — the derivative.",
    lesson:
      "Average rate of change of \\(f\\) on \\([a, b]\\) is \\(\\frac{f(b) - f(a)}{b - a}\\) — the slope of the secant line connecting the two endpoints on the graph. It describes behavior across a window; nothing instant about it.\n\nInstantaneous rate of change at \\(x = a\\) is \\(\\lim_{h\\to 0}\\frac{f(a+h) - f(a)}{h}\\). Same formula as a secant slope, but the window shrinks to a point. When this limit exists, it's called the derivative of \\(f\\) at \\(a\\), written \\(f'(a)\\). Geometrically, it's the slope of the tangent line to the graph at \\((a, f(a))\\).\n\nTwo equivalent formulas worth knowing:\n$$f'(a) = \\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h} = \\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}.$$ The second form is sometimes easier when the function is given explicitly and substitution produces \\(0/0\\) that you can factor.\n\nUnits matter. If \\(f\\) has units of meters and input has units of seconds, \\(f'(a)\\) is in meters per second. AP graders deduct for answers missing units when the context demands them.",
    keyIdeas: [
      "Average rate = secant slope = \\(\\frac{f(b)-f(a)}{b-a}\\).",
      "Instantaneous rate = \\(\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\) = \\(f'(a)\\).",
      "Tangent slope interpretation at a point.",
      "Always keep units in context problems.",
    ],
    workedExample: {
      prompt:
        "For \\(f(x) = x^2 + 1\\), find the average rate on \\([2, 4]\\) and the instantaneous rate at \\(x = 2\\).",
      solution:
        "Average: \\(\\frac{17 - 5}{4-2} = 6\\). Instantaneous: \\(\\lim_{h\\to 0}\\frac{(2+h)^2+1 - 5}{h} = \\lim\\frac{4h+h^2}{h} = \\lim(4+h) = 4\\).",
    },
    flashcards: [
      { q: "Average rate of change formula?", a: "\\(\\frac{f(b)-f(a)}{b-a}\\)." },
      { q: "Two forms of the derivative at \\(a\\)?", a: "\\(\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\) and \\(\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}\\)." },
      { q: "Geometric meaning of \\(f'(a)\\)?", a: "Slope of the tangent line at \\((a, f(a))\\)." },
    ],
    commonMistakes: [
      "Using \\(\\frac{f(b) - f(a)}{b}\\) instead of \\(b - a\\) in the denominator.",
      "Stopping at \\(0/0\\) on the difference quotient — it means simplify, not DNE.",
      "Forgetting units in context.",
    ],
    quiz: [
      {
        q: "Average rate of change of \\(f(x)=x^3\\) on \\([1,3]\\)?",
        choices: ["9", "13", "27", "3"],
        answerIndex: 1,
        explanation: "\\((27-1)/(3-1) = 26/2 = 13\\).",
      },
      {
        q: "Instantaneous rate of change of \\(f(x)=x^2\\) at \\(x=5\\) using the definition?",
        choices: ["25", "10", "5", "0"],
        answerIndex: 1,
        explanation: "\\(\\lim_{h\\to 0}\\frac{(5+h)^2-25}{h}=\\lim(10+h)=10\\).",
      },
      {
        q: "Average rate of change on \\([a,b]\\) is geometrically:",
        choices: ["Slope of tangent at \\(a\\).", "Slope of secant through endpoints.", "Average of \\(f\\).", "Area under the curve."],
        answerIndex: 1,
        explanation: "Secant line slope between \\((a,f(a))\\) and \\((b,f(b))\\).",
      },
      {
        q: "A student says \\(f'(2) = \\frac{f(3)-f(2)}{1}\\). What's wrong?",
        choices: ["Nothing.", "That's an average rate on \\([2,3]\\), not instantaneous at 2.", "Denominator missing.", "Off by a factor of 2."],
        answerIndex: 1,
        explanation: "Needs the limit as the interval shrinks to 0.",
      },
    ],
  },

  "2.2": {
    id: "2.2",
    title: "Defining the Derivative of a Function and Using Derivative Notation",
    summary:
      "\\(f'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}\\); notations include \\(f'\\), \\(dy/dx\\), \\(\\frac{d}{dx}f\\).",
    lesson:
      "The derivative function \\(f'\\) is built by applying the instantaneous-rate limit at every point. Its formula: $$f'(x) = \\lim_{h\\to 0}\\frac{f(x+h) - f(x)}{h}.$$ Wherever this limit exists, \\(f\\) is differentiable.\n\nYou'll see several notations used interchangeably. \\(f'(x)\\) (Lagrange), \\(\\frac{df}{dx}\\) or \\(\\frac{dy}{dx}\\) (Leibniz), \\(Df\\) (operator), \\(\\dot y\\) (Newton, usually time derivatives). Each has strengths: Leibniz makes chain rule obvious; primes are compact; operator notation clarifies what variable you're differentiating with respect to.\n\nUsing the limit definition to compute derivatives is a core Unit 2 skill. Typical steps: (1) substitute \\(x + h\\) for \\(x\\) in \\(f\\); (2) subtract \\(f(x)\\); (3) divide by \\(h\\); (4) simplify until \\(h\\) cancels from the denominator; (5) take the limit as \\(h \\to 0\\).\n\nExample for \\(f(x) = x^2\\): \\(f(x+h) = x^2 + 2xh + h^2\\). \\(f(x+h)-f(x) = 2xh + h^2\\). Divide by \\(h\\): \\(2x + h\\). Limit: \\(2x\\). So \\(f'(x) = 2x\\).\n\nAt a specific point \\(a\\), \\(f'(a)\\) is just \\(f'\\) evaluated at \\(a\\) — and equals the tangent slope at \\((a, f(a))\\). Tangent line: \\(y - f(a) = f'(a)(x - a)\\).",
    keyIdeas: [
      "\\(f'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}\\).",
      "Many notations: \\(f'\\), \\(dy/dx\\), \\(Df\\).",
      "Limit-definition computation is an AP staple.",
      "Tangent line: \\(y = f(a) + f'(a)(x-a)\\).",
    ],
    workedExample: {
      prompt:
        "Use the limit definition to find \\(f'(x)\\) for \\(f(x) = 3x^2 - 2x\\).",
      solution:
        "\\(f(x+h) = 3(x+h)^2 - 2(x+h) = 3x^2 + 6xh + 3h^2 - 2x - 2h\\). \\(f(x+h)-f(x) = 6xh + 3h^2 - 2h = h(6x + 3h - 2)\\). Divide by \\(h\\): \\(6x + 3h - 2\\). Limit: \\(6x - 2\\). So \\(f'(x) = 6x - 2\\).",
    },
    flashcards: [
      { q: "Derivative definition?", a: "\\(f'(x)=\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}\\)." },
      { q: "Leibniz notation?", a: "\\(\\frac{dy}{dx}\\) or \\(\\frac{df}{dx}\\)." },
      { q: "Tangent line equation at \\(a\\)?", a: "\\(y = f(a) + f'(a)(x-a)\\)." },
    ],
    commonMistakes: [
      "Forgetting to expand \\((x+h)^2\\) correctly.",
      "Canceling \\(h\\) before subtracting \\(f(x)\\).",
      "Plugging \\(h = 0\\) before simplifying — that gives \\(0/0\\).",
    ],
    quiz: [
      {
        q: "Using the definition, \\(f'(x)\\) for \\(f(x)=4x\\)?",
        choices: ["0", "4", "\\(4x\\)", "\\(4h\\)"],
        answerIndex: 1,
        explanation: "\\((4(x+h)-4x)/h = 4\\); limit = 4.",
      },
      {
        q: "\\(\\frac{d}{dx}\\) means:",
        choices: ["Derivative with respect to \\(x\\).", "Integral with respect to \\(x\\).", "Second derivative.", "Difference operator."],
        answerIndex: 0,
        explanation: "Leibniz operator for derivative w.r.t. \\(x\\).",
      },
      {
        q: "Tangent line to \\(f\\) at \\(x=a\\) passes through:",
        choices: ["\\((0, f(a))\\)", "\\((a, f(a))\\) with slope \\(f'(a)\\)", "\\((a, 0)\\)", "\\((a, f'(a))\\)"],
        answerIndex: 1,
        explanation: "Tangent line: \\(y - f(a) = f'(a)(x-a)\\).",
      },
      {
        q: "Common error in computing \\(f'\\) via the definition?",
        choices: ["Not expanding \\((x+h)^n\\) fully.", "Using the wrong function.", "Forgetting the limit.", "All of the above."],
        answerIndex: 3,
        explanation: "All three are classic blown steps.",
      },
    ],
  },

  "2.3": {
    id: "2.3",
    title: "Estimating Derivatives of a Function at a Point",
    summary:
      "Estimate \\(f'(a)\\) from a table, graph, or calculator using symmetric difference quotients — accurate to higher order than one-sided.",
    lesson:
      "Often on the AP you aren't given a formula, only values or a graph. You estimate \\(f'(a)\\) using the closest available data.\n\nFrom a graph: locate the tangent at \\(x = a\\) and estimate its slope (rise over run). Two points on the tangent line suffice.\n\nFrom a table with evenly spaced \\(x\\)-values \\(a - h, a, a + h\\): the best estimate is the symmetric (centered) difference quotient $$\\frac{f(a+h) - f(a-h)}{2h}.$$ It's second-order accurate, generally much better than the one-sided quotient \\(\\frac{f(a+h)-f(a)}{h}\\). If the table has only values on one side of \\(a\\), you're forced to use one-sided — note the lower accuracy.\n\nFrom a calculator: the nDeriv function computes centered difference quotients. On FRQs calculator-active sections expect you to use this; show the setup.\n\nFor MC, symmetric differences will usually match an answer choice better. If the question says \"use the data closest to \\(a\\),\" default to symmetric.\n\nFor proper differentiability at \\(a\\), the left and right one-sided quotients must approach the same value. On a graph, corners, cusps, or vertical tangents flag non-differentiability.",
    keyIdeas: [
      "Symmetric difference: \\(\\frac{f(a+h)-f(a-h)}{2h}\\) — preferred when you have both sides.",
      "Graph estimate: pick two tangent-line points, compute slope.",
      "Calculator nDeriv = centered difference.",
      "Corners, cusps, vertical tangents = not differentiable.",
    ],
    workedExample: {
      prompt:
        "Table: \\(f(1.9)=4.8, f(2.0)=5.0, f(2.1)=5.3\\). Estimate \\(f'(2)\\).",
      solution:
        "Symmetric: \\(\\frac{f(2.1)-f(1.9)}{0.2} = \\frac{5.3 - 4.8}{0.2} = 2.5\\). So \\(f'(2)\\approx 2.5\\).",
    },
    flashcards: [
      { q: "Best difference quotient for \\(f'(a)\\) estimate?", a: "Symmetric: \\(\\frac{f(a+h)-f(a-h)}{2h}\\)." },
      { q: "Calculator's nDeriv uses which method?", a: "Centered difference quotient." },
      { q: "Graphical sign of non-differentiability?", a: "Corner, cusp, or vertical tangent." },
    ],
    commonMistakes: [
      "Using forward difference when symmetric is available.",
      "Dropping the 2 in the denominator of the symmetric formula.",
      "Treating a corner point as differentiable.",
    ],
    quiz: [
      {
        q: "Data: \\(f(3)=7, f(4)=10, f(5)=11\\). Best estimate of \\(f'(4)\\)?",
        choices: ["1", "2", "3", "4"],
        answerIndex: 1,
        explanation: "Symmetric: \\((11-7)/2 = 2\\).",
      },
      {
        q: "Symmetric difference quotient is generally:",
        choices: ["Worse than one-sided.", "The same accuracy as one-sided.", "Better (second-order accurate).", "Only useful on grids."],
        answerIndex: 2,
        explanation: "Symmetric differences cancel the first-order error term.",
      },
      {
        q: "At a corner of a graph, \\(f'\\) at that point:",
        choices: ["Exists and is 0.", "Exists and is \\(+\\infty\\).", "Does not exist.", "Is an average of the two slopes."],
        answerIndex: 2,
        explanation: "Left and right one-sided derivatives disagree at a corner.",
      },
      {
        q: "Given only \\(f(2)=1\\) and \\(f(2.01)=1.05\\), estimate \\(f'(2)\\):",
        choices: ["5", "0.5", "0.05", "0"],
        answerIndex: 0,
        explanation: "\\((1.05-1)/0.01 = 5\\).",
      },
    ],
  },

  "2.4": {
    id: "2.4",
    title: "Connecting Differentiability and Continuity",
    summary:
      "Differentiability implies continuity, but continuity does not imply differentiability — corners and cusps prove the gap.",
    lesson:
      "If \\(f\\) is differentiable at \\(a\\), then \\(f\\) is continuous at \\(a\\). Proof sketch: if \\(f'(a)\\) exists, then \\(\\lim_{h\\to 0}[f(a+h) - f(a)] = \\lim h \\cdot \\frac{f(a+h)-f(a)}{h} = 0 \\cdot f'(a) = 0\\), so \\(\\lim_{x\\to a}f(x) = f(a)\\), which is continuity.\n\nThe converse is false. A classic counterexample is \\(f(x) = |x|\\) at \\(x = 0\\). The function is continuous, but the left derivative is \\(-1\\) and the right derivative is \\(+1\\), so the two-sided derivative doesn't exist. Graphically this is a corner.\n\nOther failure modes: cusps (think \\(f(x) = x^{2/3}\\) at 0, where the graph has an infinitely steep tangent), vertical tangents (\\(f(x) = x^{1/3}\\), tangent is vertical so slope is undefined), or discontinuities (obviously can't be differentiable there).\n\nPractical consequence: if a function has a corner at \\(x = a\\), don't apply power rule or any standard differentiation rule there — \\(f'(a)\\) simply doesn't exist. On FRQs, when asked \"is \\(f\\) differentiable at \\(a\\)?\", check both sides of the derivative limit separately for piecewise/absolute-value functions.",
    keyIdeas: [
      "Differentiable \\(\\Rightarrow\\) continuous (one-way implication).",
      "Continuous \\(\\not\\Rightarrow\\) differentiable.",
      "Corners, cusps, vertical tangents, and discontinuities kill differentiability.",
      "For piecewise: check left and right derivatives separately.",
    ],
    workedExample: {
      prompt:
        "Is \\(f(x) = |x - 2|\\) differentiable at \\(x = 2\\)?",
      solution:
        "\\(f\\) is continuous at 2 (value matches limit). Left derivative: \\(-1\\). Right derivative: \\(+1\\). They disagree, so \\(f'(2)\\) DNE. Not differentiable at 2.",
    },
    flashcards: [
      { q: "Differentiable \\(\\Rightarrow\\) ?", a: "Continuous." },
      { q: "Continuous \\(\\Rightarrow\\) differentiable?", a: "No — corners/cusps break it." },
      { q: "Slope of \\(|x|\\) at 0?", a: "DNE (corner)." },
    ],
    commonMistakes: [
      "Believing continuity implies differentiability.",
      "Skipping the one-sided derivative check at piecewise seams.",
      "Calling a vertical tangent \"differentiable with slope \\(\\infty\\).\"",
    ],
    quiz: [
      {
        q: "Which implication is TRUE?",
        choices: ["Continuous \\(\\Rightarrow\\) differentiable.", "Differentiable \\(\\Rightarrow\\) continuous.", "Both directions hold.", "Neither direction holds."],
        answerIndex: 1,
        explanation: "Only differentiability implies continuity; converse has counterexamples.",
      },
      {
        q: "\\(f(x)=|x|\\) at \\(x=0\\) is:",
        choices: ["Differentiable with \\(f'(0)=0\\).", "Differentiable with \\(f'(0)=1\\).", "Continuous but not differentiable.", "Discontinuous."],
        answerIndex: 2,
        explanation: "Continuous; corner kills differentiability.",
      },
      {
        q: "Which feature on a graph guarantees non-differentiability?",
        choices: ["Concavity change.", "Horizontal tangent.", "Corner, cusp, vertical tangent.", "Any inflection point."],
        answerIndex: 2,
        explanation: "Corners/cusps/vertical tangents break the derivative limit.",
      },
      {
        q: "If \\(f\\) is NOT continuous at \\(a\\), is \\(f\\) differentiable at \\(a\\)?",
        choices: ["Yes, possibly.", "No, never.", "Only if one-sided limits match.", "Only if \\(f(a)\\) exists."],
        answerIndex: 1,
        explanation: "Contrapositive of differentiability \\(\\Rightarrow\\) continuity.",
      },
    ],
  },

  "2.5": {
    id: "2.5",
    title: "Applying the Power Rule",
    summary:
      "\\(\\frac{d}{dx}x^n = nx^{n-1}\\) for any real \\(n\\). The workhorse derivative rule.",
    lesson:
      "For any real exponent \\(n\\), \\(\\frac{d}{dx}x^n = n x^{n-1}\\). This covers integers, negative exponents (like \\(1/x = x^{-1}\\)), fractions (like \\(\\sqrt{x} = x^{1/2}\\)), and irrationals.\n\nTo apply the power rule fluently, first rewrite expressions to pure power form. \\(\\frac{1}{x^3} = x^{-3}\\), \\(\\sqrt[3]{x^2} = x^{2/3}\\), \\(x\\sqrt{x} = x^{3/2}\\). Then pull the exponent down as a coefficient and reduce the exponent by 1.\n\nConstant rule: \\(\\frac{d}{dx}c = 0\\) for any constant \\(c\\). Power-rule variant: \\(\\frac{d}{dx}(c x^n) = cn x^{n-1}\\) — the constant rides along.\n\nPower rule interacts with sum and difference rules (Unit 2.6). So \\(\\frac{d}{dx}(3x^4 - 5x^2 + 7) = 12x^3 - 10x + 0 = 12x^3 - 10x\\). Linear combinations of power functions differentiate term-by-term.\n\nCommon trap: people forget the power rule applies to any real exponent, not just positive integers. \\(\\frac{d}{dx}(1/x) = -1/x^2\\); this is power rule with \\(n = -1\\). \\(\\frac{d}{dx}\\sqrt{x} = \\frac{1}{2\\sqrt{x}}\\); power rule with \\(n = 1/2\\).",
    keyIdeas: [
      "Power rule: \\(\\frac{d}{dx}x^n = n x^{n-1}\\) for any real \\(n\\).",
      "Rewrite radicals and fractions as exponents before differentiating.",
      "Constant rule: derivative of a constant is 0.",
      "Applies to negative and fractional exponents.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\frac{d}{dx}(2x^5 - 7\\sqrt{x} + \\frac{4}{x^2})\\).",
      solution:
        "Rewrite: \\(2x^5 - 7x^{1/2} + 4x^{-2}\\). Differentiate each: \\(10x^4 - \\frac{7}{2}x^{-1/2} - 8x^{-3}\\). Rewrite: \\(10x^4 - \\frac{7}{2\\sqrt{x}} - \\frac{8}{x^3}\\).",
    },
    flashcards: [
      { q: "Power rule?", a: "\\(\\frac{d}{dx}x^n = n x^{n-1}\\)." },
      { q: "Derivative of \\(1/x\\)?", a: "\\(-1/x^2\\), using \\(n=-1\\)." },
      { q: "Derivative of \\(\\sqrt{x}\\)?", a: "\\(\\frac{1}{2\\sqrt{x}}\\)." },
    ],
    commonMistakes: [
      "Forgetting to lower the exponent.",
      "Not rewriting radicals/fractions in exponent form before differentiating.",
      "Applying the power rule to \\(e^x\\) or \\(a^x\\) — those use different rules.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}(x^{10})=\\)",
        choices: ["\\(10x^{10}\\)", "\\(10x^9\\)", "\\(x^9\\)", "\\(9x^{10}\\)"],
        answerIndex: 1,
        explanation: "Pull down 10, reduce exponent: \\(10x^9\\).",
      },
      {
        q: "\\(\\frac{d}{dx}(x^{-3})=\\)",
        choices: ["\\(-3x^{-2}\\)", "\\(-3x^{-4}\\)", "\\(3x^{-2}\\)", "\\(3x^{-4}\\)"],
        answerIndex: 1,
        explanation: "\\(n=-3\\); derivative \\(-3x^{-4}\\).",
      },
      {
        q: "\\(\\frac{d}{dx}(\\sqrt{x})=\\)",
        choices: ["\\(\\frac{1}{\\sqrt{x}}\\)", "\\(\\frac{1}{2\\sqrt{x}}\\)", "\\(\\frac{1}{2}\\sqrt{x}\\)", "\\(2\\sqrt{x}\\)"],
        answerIndex: 1,
        explanation: "Power rule with \\(n=1/2\\): \\(\\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}\\).",
      },
      {
        q: "\\(\\frac{d}{dx}(5x^3 + 2x)=\\)",
        choices: ["\\(15x^2 + 2\\)", "\\(15x^3 + 2x\\)", "\\(15x^2\\)", "\\(5x^2 + 2\\)"],
        answerIndex: 0,
        explanation: "Term-by-term power rule.",
      },
    ],
  },

  "2.6": {
    id: "2.6",
    title: "Derivative Rules: Constant, Sum, Difference, and Constant Multiple",
    summary:
      "Linear combinations differentiate term-by-term; constants pass through, derivatives of constants are 0.",
    lesson:
      "Four foundational rules that let you differentiate polynomials and most linear combinations of standard functions:\n\n1. Constant rule: \\(\\frac{d}{dx}[c] = 0\\). The derivative of a flat function is zero.\n\n2. Constant multiple rule: \\(\\frac{d}{dx}[c \\cdot f(x)] = c \\cdot f'(x)\\). Constants pull outside.\n\n3. Sum rule: \\(\\frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x)\\).\n\n4. Difference rule: \\(\\frac{d}{dx}[f(x) - g(x)] = f'(x) - g'(x)\\).\n\nCombined with power rule, these let you handle any polynomial in one step. \\(\\frac{d}{dx}(4x^3 - 5x + 7) = 12x^2 - 5\\). They also work with trig, exponential, and log pieces (Unit 2.7) — so \\(\\frac{d}{dx}(3\\sin x + 2e^x) = 3\\cos x + 2e^x\\).\n\nImportant caveat: there is no \"product rule of linearity\" — \\((fg)' \\ne f'g'\\). That's Unit 2.8's story.\n\nThese rules are linearity of the derivative operator. If \\(D = d/dx\\), then \\(D(af + bg) = aD(f) + bD(g)\\) — the derivative is a linear operator. Keep this in mind; it's the theoretical reason you can always split sums and pull constants.",
    keyIdeas: [
      "Derivatives are linear: sums and constant multiples split.",
      "Derivative of a constant is 0.",
      "Products do NOT follow this pattern — see product rule.",
      "Combine with power rule to handle polynomials instantly.",
    ],
    workedExample: {
      prompt:
        "Find \\(y'\\) for \\(y = 6x^4 - \\frac{3}{x} + 8\\).",
      solution:
        "Rewrite: \\(y = 6x^4 - 3x^{-1} + 8\\). Differentiate: \\(y' = 24x^3 + 3x^{-2} = 24x^3 + 3/x^2\\).",
    },
    flashcards: [
      { q: "Derivative of a constant?", a: "0." },
      { q: "Does \\((fg)' = f'g'\\)?", a: "No — use product rule." },
      { q: "Can constants be pulled out?", a: "Yes: \\((cf)' = cf'\\)." },
    ],
    commonMistakes: [
      "Applying sum rule to a product.",
      "Forgetting the constant rule (derivative = 0).",
      "Losing the constant when pulling it outside.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}(7)=\\)",
        choices: ["7", "1", "0", "\\(1/7\\)"],
        answerIndex: 2,
        explanation: "Derivative of any constant is 0.",
      },
      {
        q: "\\(\\frac{d}{dx}(3x^2 - 4x + 5)=\\)",
        choices: ["\\(6x - 4\\)", "\\(6x - 4 + 5\\)", "\\(3x - 4\\)", "\\(6x^2 - 4\\)"],
        answerIndex: 0,
        explanation: "Term-by-term: \\(6x - 4 + 0\\).",
      },
      {
        q: "\\(\\frac{d}{dx}(5\\sin x) =\\)",
        choices: ["\\(5\\cos x\\)", "\\(-5\\cos x\\)", "\\(\\cos x\\)", "\\(5\\sin x\\)"],
        answerIndex: 0,
        explanation: "Constant pulls out; derivative of \\(\\sin x\\) is \\(\\cos x\\).",
      },
      {
        q: "A student writes \\((x^2 \\cdot x^3)' = 2x \\cdot 3x^2 = 6x^3\\). What's wrong?",
        choices: ["Used the wrong power rule.", "Applied sum rule to a product.", "Applied the product rule incorrectly.", "Both B and C — should use product rule or combine to \\(x^5\\) first."],
        answerIndex: 3,
        explanation: "Linearity doesn't apply to products. Either use product rule or rewrite \\(x^2 \\cdot x^3 = x^5\\) first; correct answer is \\(5x^4\\).",
      },
    ],
  },

  "2.7": {
    id: "2.7",
    title: "Derivatives of cos x, sin x, e^x, and ln x",
    summary:
      "Memorize: \\(\\sin'=\\cos\\), \\(\\cos'=-\\sin\\), \\((e^x)'=e^x\\), \\((\\ln x)'=1/x\\).",
    lesson:
      "Four bedrock derivatives you must have at fingertip speed:\n\n\\(\\frac{d}{dx}\\sin x = \\cos x\\). Derivable via the limit definition and the identities \\(\\sin(a+h) = \\sin a \\cos h + \\cos a \\sin h\\), combined with \\(\\lim \\sin h / h = 1\\) and \\(\\lim (\\cos h - 1)/h = 0\\).\n\n\\(\\frac{d}{dx}\\cos x = -\\sin x\\). Same argument with the cos addition formula. Watch the negative sign — forgetting it is the #1 trig derivative error.\n\n\\(\\frac{d}{dx}e^x = e^x\\). The exponential function is its own derivative — unique among non-constant functions. This makes it central to modeling growth (see Unit 7.8).\n\n\\(\\frac{d}{dx}\\ln x = \\frac{1}{x}\\) (for \\(x > 0\\)). Derivable by implicit differentiation: \\(y = \\ln x \\Leftrightarrow e^y = x\\), so \\(e^y y' = 1\\), giving \\(y' = 1/e^y = 1/x\\).\n\nAdvanced relations to remember for later topics: \\((a^x)' = a^x \\ln a\\); \\((\\log_a x)' = 1/(x \\ln a)\\). These appear via chain rule and the change-of-base identity.\n\nGraphical intuition: \\(\\sin\\) has horizontal tangents at its max/min (values \\(\\pm 1\\)) — that's where \\(\\cos\\) crosses zero. \\(e^x\\) grows in a way that matches its own height. \\(\\ln x\\) has slope \\(1/x\\) — steep near 0, flat for large \\(x\\).",
    keyIdeas: [
      "\\(\\sin'=\\cos\\), \\(\\cos'=-\\sin\\), \\((e^x)' = e^x\\), \\((\\ln x)' = 1/x\\).",
      "Negative sign on \\(\\cos\\) derivative is critical.",
      "\\((a^x)' = a^x\\ln a\\); \\((\\log_a x)' = 1/(x\\ln a)\\).",
      "These combine with sum/constant-multiple rules for linear combinations.",
    ],
    workedExample: {
      prompt:
        "Find \\(f'(x)\\) for \\(f(x) = 3e^x - 2\\sin x + 5\\ln x\\).",
      solution:
        "Apply each rule: \\(f'(x) = 3e^x - 2\\cos x + \\frac{5}{x}\\).",
    },
    flashcards: [
      { q: "\\(\\frac{d}{dx}\\sin x = ?\\)", a: "\\(\\cos x\\)." },
      { q: "\\(\\frac{d}{dx}\\cos x = ?\\)", a: "\\(-\\sin x\\) (note the negative)." },
      { q: "\\(\\frac{d}{dx}e^x = ?\\)", a: "\\(e^x\\)." },
      { q: "\\(\\frac{d}{dx}\\ln x = ?\\)", a: "\\(1/x\\) for \\(x > 0\\)." },
    ],
    commonMistakes: [
      "Dropping the negative on \\(\\frac{d}{dx}\\cos x\\).",
      "Writing \\((e^x)' = xe^{x-1}\\) (confusing with power rule).",
      "Writing \\((\\ln x)' = \\ln x / x\\) (no — it's \\(1/x\\)).",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}(\\sin x + \\cos x)=\\)",
        choices: ["\\(\\cos x + \\sin x\\)", "\\(\\cos x - \\sin x\\)", "\\(-\\cos x - \\sin x\\)", "\\(-\\cos x + \\sin x\\)"],
        answerIndex: 1,
        explanation: "\\(\\cos x + (-\\sin x) = \\cos x - \\sin x\\).",
      },
      {
        q: "\\(\\frac{d}{dx}(e^x) =\\)",
        choices: ["\\(x e^{x-1}\\)", "\\(e^x\\)", "\\(1\\)", "\\(\\ln x\\)"],
        answerIndex: 1,
        explanation: "Exponential is its own derivative.",
      },
      {
        q: "\\(\\frac{d}{dx}(2\\ln x) =\\)",
        choices: ["\\(2\\ln x\\)", "\\(\\frac{2}{x}\\)", "\\(\\frac{1}{2x}\\)", "\\(\\frac{\\ln x}{x}\\)"],
        answerIndex: 1,
        explanation: "Constant pulls out; \\((\\ln x)' = 1/x\\).",
      },
      {
        q: "Slope of \\(y = \\cos x\\) at \\(x = \\pi/2\\)?",
        choices: ["1", "0", "\\(-1\\)", "\\(\\pi/2\\)"],
        answerIndex: 2,
        explanation: "\\(-\\sin(\\pi/2) = -1\\).",
      },
    ],
  },

  "2.8": {
    id: "2.8",
    title: "The Product Rule",
    summary:
      "\\((fg)' = f'g + fg'\\) — derivative of a product is NOT the product of derivatives.",
    lesson:
      "When two functions are multiplied, the derivative is not the product of their derivatives. Instead: $$(fg)' = f' g + f g'.$$ Mnemonic: \"first prime second plus first second prime.\"\n\nWhen to use it: any time you have a product of two non-constant, differentiable functions that aren't already simplified. For example \\(\\frac{d}{dx}[x^2 \\sin x] = 2x \\sin x + x^2 \\cos x\\).\n\nExtension to three factors: \\((fgh)' = f'gh + fg'h + fgh'\\). Each factor gets a turn at being differentiated. You can derive this from pairing product rule twice.\n\nA quick sanity check: if you ever set \\((fg)' = f' g'\\), you'll get wrong answers on everything. The product rule is counterintuitive; memorize it and practice.\n\nSome products simplify first. \\(\\frac{d}{dx}(x^2 \\cdot x^3)\\) — don't use product rule, just combine to \\(x^5\\) and power rule to \\(5x^4\\). But \\(\\frac{d}{dx}(x^2 e^x)\\) cannot be simplified, so product rule is mandatory: \\(2x e^x + x^2 e^x = e^x(2x + x^2)\\).\n\nOn FRQs, always state which rule you're applying. \"By product rule, \\(\\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)\\)\" is a nice preamble when you're about to plug in specific functions.",
    keyIdeas: [
      "\\((fg)' = f'g + fg'\\).",
      "Not \\((fg)' = f'g'\\).",
      "Three factors: each takes a turn being differentiated.",
      "Simplify the product first if you can.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\frac{d}{dx}[x^3 \\ln x]\\).",
      solution:
        "\\(f = x^3, g = \\ln x\\). \\(f' = 3x^2, g' = 1/x\\). Product rule: \\(f'g + fg' = 3x^2 \\ln x + x^3 \\cdot \\frac{1}{x} = 3x^2 \\ln x + x^2\\).",
    },
    flashcards: [
      { q: "Product rule?", a: "\\((fg)' = f'g + fg'\\)." },
      { q: "Three-factor product rule?", a: "\\((fgh)' = f'gh + fg'h + fgh'\\)." },
      { q: "Does \\((fg)' = f'g'\\)?", a: "No — this is a common mistake." },
    ],
    commonMistakes: [
      "Writing \\((fg)' = f'g'\\).",
      "Forgetting one of the two terms.",
      "Skipping product rule when the product simplifies algebraically.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}[x^2 e^x] =\\)",
        choices: ["\\(2xe^x\\)", "\\(x^2 e^x\\)", "\\(2x e^x + x^2 e^x\\)", "\\(2x + e^x\\)"],
        answerIndex: 2,
        explanation: "Product rule: \\(2x \\cdot e^x + x^2 \\cdot e^x\\).",
      },
      {
        q: "Product rule formula?",
        choices: ["\\(f'g'\\)", "\\(f'g + fg'\\)", "\\(f'g - fg'\\)", "\\(\\frac{f'g - fg'}{g^2}\\)"],
        answerIndex: 1,
        explanation: "That's the product rule. The last option is the quotient rule.",
      },
      {
        q: "\\(\\frac{d}{dx}[\\sin x \\cos x] =\\)",
        choices: ["\\(\\cos x \\cdot \\sin x\\)", "\\(\\cos^2 x - \\sin^2 x\\)", "\\(-\\sin x \\cos x\\)", "\\(1\\)"],
        answerIndex: 1,
        explanation: "Product rule: \\(\\cos x \\cdot \\cos x + \\sin x \\cdot (-\\sin x) = \\cos^2 x - \\sin^2 x\\).",
      },
      {
        q: "For \\(f(x) = x\\ln x\\), \\(f'(x) =\\)",
        choices: ["\\(\\ln x\\)", "\\(1\\)", "\\(\\ln x + 1\\)", "\\(x + \\ln x\\)"],
        answerIndex: 2,
        explanation: "Product rule: \\(1 \\cdot \\ln x + x \\cdot (1/x) = \\ln x + 1\\).",
      },
    ],
  },

  "2.9": {
    id: "2.9",
    title: "The Quotient Rule",
    summary:
      "\\(\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}\\) — \"low d-high minus high d-low, over low squared.\"",
    lesson:
      "When you have a quotient of two differentiable functions with \\(g(x) \\ne 0\\): $$\\left(\\frac{f}{g}\\right)' = \\frac{f' g - f g'}{g^2}.$$ Popular mnemonic: \"low d-high minus high d-low, square the low and away we go.\" (Low = denominator, high = numerator.)\n\nThe minus sign matters. \\(f'g - fg'\\), in that order. Many students write \\(fg' - f'g\\) and sign-error into the wrong answer.\n\nOften you can avoid the quotient rule by rewriting. \\(\\frac{x^3}{x^2} = x\\), so derivative is 1 — no need for quotient rule. \\(\\frac{5}{x^3} = 5x^{-3}\\), so derivative is \\(-15x^{-4}\\) via power rule. Only use quotient rule when the expressions don't simplify.\n\nProduct-rule-as-alternative: \\(f/g = f \\cdot g^{-1}\\). Using product and chain, \\((f g^{-1})' = f' g^{-1} - f g^{-2} g' = (f'g - fg')/g^2\\). Same answer; choose whichever is cleaner.\n\nOn FRQs with data: if given \\(f(a), f'(a), g(a), g'(a)\\) and asked for \\((f/g)'(a)\\), plug into the formula. This is a frequent calculus-active question.",
    keyIdeas: [
      "Quotient rule: \\((f/g)' = (f'g - fg')/g^2\\).",
      "Order of subtraction matters: \\(f'g - fg'\\), not \\(fg' - f'g\\).",
      "Simplify the quotient first if possible.",
      "Requires \\(g \\ne 0\\).",
    ],
    workedExample: {
      prompt:
        "Find \\(\\frac{d}{dx}\\left[\\frac{x^2}{\\cos x}\\right]\\).",
      solution:
        "\\(f=x^2, g=\\cos x, f'=2x, g'=-\\sin x\\). \\((f/g)' = \\frac{2x\\cos x - x^2(-\\sin x)}{\\cos^2 x} = \\frac{2x\\cos x + x^2\\sin x}{\\cos^2 x}\\).",
    },
    flashcards: [
      { q: "Quotient rule formula?", a: "\\((f/g)' = (f'g - fg')/g^2\\)." },
      { q: "Mnemonic?", a: "\"Low d-high minus high d-low, square the low.\"" },
      { q: "Alternative to quotient rule?", a: "Rewrite as \\(f g^{-1}\\), use product + chain." },
    ],
    commonMistakes: [
      "Reversing the sign: \\(fg' - f'g\\).",
      "Forgetting the \\(g^2\\) in the denominator.",
      "Using quotient rule when algebra could simplify first.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}\\left[\\frac{x}{x+1}\\right] =\\)",
        choices: ["\\(\\frac{1}{x+1}\\)", "\\(\\frac{1}{(x+1)^2}\\)", "\\(\\frac{-1}{(x+1)^2}\\)", "\\(\\frac{x}{(x+1)^2}\\)"],
        answerIndex: 1,
        explanation: "\\((1(x+1) - x(1))/(x+1)^2 = 1/(x+1)^2\\).",
      },
      {
        q: "Quotient rule is:",
        choices: ["\\((fg)'\\)", "\\((f/g)' = (f'g - fg')/g^2\\)", "\\((f/g)' = f'/g'\\)", "\\((f/g)' = (fg' - f'g)/g\\)"],
        answerIndex: 1,
        explanation: "Standard quotient rule.",
      },
      {
        q: "\\(\\frac{d}{dx}\\left[\\frac{\\sin x}{x}\\right]=\\)",
        choices: ["\\(\\frac{\\cos x}{x}\\)", "\\(\\frac{x\\cos x - \\sin x}{x^2}\\)", "\\(\\frac{\\sin x - x\\cos x}{x^2}\\)", "\\(\\frac{\\cos x - \\sin x}{x^2}\\)"],
        answerIndex: 1,
        explanation: "\\((\\cos x \\cdot x - \\sin x \\cdot 1)/x^2\\).",
      },
      {
        q: "Given \\(f(2)=3, f'(2)=1, g(2)=4, g'(2)=-1\\), find \\((f/g)'(2)\\).",
        choices: ["\\(1/16\\)", "\\(7/16\\)", "\\(-1/16\\)", "\\(7/4\\)"],
        answerIndex: 1,
        explanation: "\\((1 \\cdot 4 - 3 \\cdot (-1))/16 = (4+3)/16 = 7/16\\).",
      },
    ],
  },

  "2.10": {
    id: "2.10",
    title: "Finding the Derivatives of Tangent, Cotangent, Secant, and/or Cosecant Functions",
    summary:
      "\\(\\tan' = \\sec^2\\), \\(\\cot' = -\\csc^2\\), \\(\\sec' = \\sec\\tan\\), \\(\\csc' = -\\csc\\cot\\).",
    lesson:
      "The remaining four trig derivatives follow from the quotient rule applied to \\(\\sin\\) and \\(\\cos\\):\n\n\\(\\frac{d}{dx}\\tan x = \\sec^2 x\\). Derivation: \\(\\tan x = \\sin x / \\cos x\\), quotient rule: \\((\\cos x \\cos x - \\sin x (-\\sin x))/\\cos^2 x = (\\cos^2 + \\sin^2)/\\cos^2 = 1/\\cos^2 = \\sec^2\\).\n\n\\(\\frac{d}{dx}\\cot x = -\\csc^2 x\\). Same trick, \\(\\cot = \\cos/\\sin\\).\n\n\\(\\frac{d}{dx}\\sec x = \\sec x \\tan x\\). \\(\\sec = 1/\\cos\\); quotient rule gives \\(\\sin x / \\cos^2 x = (1/\\cos)(\\sin/\\cos) = \\sec \\tan\\).\n\n\\(\\frac{d}{dx}\\csc x = -\\csc x \\cot x\\). Same structure.\n\nMemorization trick: the \"co-\" derivatives (cos, cot, csc) all have a negative sign. The \"non-co-\" derivatives (sin, tan, sec) are positive.\n\nPair rule for \\(\\sec\\) and \\(\\csc\\): each derivative contains both the original function and the matching cofunction ratio. \\(\\sec' = \\sec \\tan\\) (sec paired with tan), \\(\\csc' = -\\csc \\cot\\) (csc paired with cot).\n\nCommon exam use: compute the slope of a tangent line to \\(y = \\tan x\\) at a given \\(x\\), or differentiate a product \\(x \\sec x\\) via product rule. Always write out the derivative formula before plugging in numbers.",
    keyIdeas: [
      "\\(\\tan' = \\sec^2\\), \\(\\cot' = -\\csc^2\\).",
      "\\(\\sec' = \\sec\\tan\\), \\(\\csc' = -\\csc\\cot\\).",
      "\"Co-\" derivatives are negative.",
      "Derivable via quotient rule on \\(\\sin/\\cos\\).",
    ],
    workedExample: {
      prompt:
        "Find the slope of the tangent line to \\(y = \\tan x\\) at \\(x = \\pi/4\\).",
      solution:
        "\\(y' = \\sec^2 x\\). At \\(\\pi/4\\): \\(\\sec(\\pi/4) = \\sqrt{2}\\), so \\(\\sec^2 = 2\\). Slope = 2.",
    },
    flashcards: [
      { q: "\\(\\frac{d}{dx}\\tan x = ?\\)", a: "\\(\\sec^2 x\\)." },
      { q: "\\(\\frac{d}{dx}\\sec x = ?\\)", a: "\\(\\sec x \\tan x\\)." },
      { q: "\\(\\frac{d}{dx}\\csc x = ?\\)", a: "\\(-\\csc x \\cot x\\)." },
      { q: "Which trig derivatives carry a negative sign?", a: "\\(\\cos, \\cot, \\csc\\) (all \"co-\" functions)." },
    ],
    commonMistakes: [
      "Dropping the negative on \\(\\cot'\\) or \\(\\csc'\\).",
      "Confusing \\(\\sec' = \\sec\\tan\\) with \\(\\sec' = \\sec^2\\).",
      "Mixing up pairings: \\(\\sec'\\) uses \\(\\tan\\), \\(\\csc'\\) uses \\(\\cot\\).",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}\\tan x =\\)",
        choices: ["\\(\\sec^2 x\\)", "\\(-\\sec^2 x\\)", "\\(\\cot x\\)", "\\(\\sec x \\tan x\\)"],
        answerIndex: 0,
        explanation: "Standard derivative of tangent.",
      },
      {
        q: "\\(\\frac{d}{dx}\\sec x =\\)",
        choices: ["\\(\\sec^2 x\\)", "\\(\\sec x \\tan x\\)", "\\(-\\sec x \\tan x\\)", "\\(\\tan^2 x\\)"],
        answerIndex: 1,
        explanation: "Sec times tan.",
      },
      {
        q: "\\(\\frac{d}{dx}\\cot x =\\)",
        choices: ["\\(-\\csc^2 x\\)", "\\(\\csc^2 x\\)", "\\(-\\sec^2 x\\)", "\\(\\tan x\\)"],
        answerIndex: 0,
        explanation: "Note the negative sign on cot's derivative.",
      },
      {
        q: "Slope of \\(y=\\sec x\\) at \\(x=0\\)?",
        choices: ["0", "1", "\\(-1\\)", "\\(\\sec 0\\)"],
        answerIndex: 0,
        explanation: "\\(\\sec(0)\\tan(0) = 1 \\cdot 0 = 0\\).",
      },
    ],
  },

  "3.1": {
    id: "3.1",
    title: "The Chain Rule",
    summary:
      "\\([f(g(x))]' = f'(g(x)) \\cdot g'(x)\\) — differentiate the outer, keep the inner, then multiply by the inner's derivative.",
    lesson:
      "The chain rule handles composed functions. If \\(y = f(g(x))\\), then $$\\frac{dy}{dx} = f'(g(x)) \\cdot g'(x).$$ In Leibniz form: \\(\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}\\) where \\(u = g(x)\\).\n\nThe algorithm: (1) identify outer function \\(f\\) and inner function \\(g\\); (2) differentiate the outer while keeping the inner; (3) multiply by the derivative of the inner.\n\nExample: \\(\\frac{d}{dx}(\\sin(x^2))\\). Outer: \\(\\sin\\), inner: \\(x^2\\). Derivative of outer: \\(\\cos(x^2)\\). Multiply by derivative of inner (\\(2x\\)): \\(2x\\cos(x^2)\\).\n\nMultiple layers: just keep chaining. \\(\\frac{d}{dx}\\sin(\\cos(x^3)) = \\cos(\\cos(x^3)) \\cdot (-\\sin(x^3)) \\cdot 3x^2\\). Work outside in.\n\nCommon compositions to recognize at sight:\n- \\(\\frac{d}{dx}(g(x))^n = n(g(x))^{n-1} g'(x)\\). (Generalized power rule.)\n- \\(\\frac{d}{dx}e^{g(x)} = e^{g(x)} g'(x)\\).\n- \\(\\frac{d}{dx}\\ln(g(x)) = g'(x)/g(x)\\).\n- \\(\\frac{d}{dx}\\sin(g(x)) = \\cos(g(x)) g'(x)\\).\n\nThe chain rule factor \\(g'(x)\\) is what students forget most often — especially on exponentials and trig. Write out the inner derivative before simplifying.",
    keyIdeas: [
      "\\([f(g(x))]' = f'(g(x)) \\cdot g'(x)\\).",
      "Differentiate outer, keep inner, multiply by inner's derivative.",
      "Works for nested compositions — iterate outside-in.",
      "Generalized power rule, exponential, and log forms are chain-rule shortcuts.",
    ],
    workedExample: {
      prompt: "Find \\(\\frac{d}{dx}[(3x^2 + 1)^5]\\).",
      solution: "Outer: \\(u^5\\), inner: \\(u = 3x^2 + 1\\). Derivative: \\(5(3x^2+1)^4 \\cdot 6x = 30x(3x^2+1)^4\\).",
    },
    flashcards: [
      { q: "Chain rule statement?", a: "\\([f(g(x))]' = f'(g(x)) g'(x)\\)." },
      { q: "\\(\\frac{d}{dx}e^{g(x)}\\)?", a: "\\(e^{g(x)} g'(x)\\)." },
      { q: "\\(\\frac{d}{dx}\\ln(g(x))\\)?", a: "\\(g'(x)/g(x)\\)." },
    ],
    commonMistakes: [
      "Forgetting the \\(g'(x)\\) factor — the #1 chain rule error.",
      "Applying chain rule to a function that isn't composed (e.g., just \\(x^2\\)).",
      "Differentiating inner instead of outer first.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}\\sin(2x)=\\)",
        choices: ["\\(\\cos(2x)\\)", "\\(2\\cos(2x)\\)", "\\(-2\\cos(2x)\\)", "\\(2\\sin(2x)\\)"],
        answerIndex: 1,
        explanation: "Outer \\(\\cos(2x)\\) times inner derivative 2.",
      },
      {
        q: "\\(\\frac{d}{dx}e^{x^2}=\\)",
        choices: ["\\(e^{x^2}\\)", "\\(2x e^{x^2}\\)", "\\(2x e^{2x}\\)", "\\(x^2 e^{x^2}\\)"],
        answerIndex: 1,
        explanation: "\\(e^{g} \\cdot g' = e^{x^2} \\cdot 2x\\).",
      },
      {
        q: "\\(\\frac{d}{dx}\\ln(3x+1)=\\)",
        choices: ["\\(\\frac{1}{3x+1}\\)", "\\(\\frac{3}{3x+1}\\)", "\\(\\frac{1}{3(3x+1)}\\)", "\\(\\ln 3\\)"],
        answerIndex: 1,
        explanation: "\\(g'/g = 3/(3x+1)\\).",
      },
      {
        q: "A student writes \\(\\frac{d}{dx}(x^2+1)^3 = 3(x^2+1)^2\\). What's missing?",
        choices: ["Nothing.", "A factor of \\(2x\\) from the inner derivative.", "A factor of \\(x\\).", "Should be 2 not 3."],
        answerIndex: 1,
        explanation: "Missed chain rule — need to multiply by \\(g'(x) = 2x\\).",
      },
    ],
  },

  "3.2": {
    id: "3.2",
    title: "Implicit Differentiation",
    summary:
      "When \\(y\\) is defined implicitly by an equation, differentiate both sides with respect to \\(x\\), treating \\(y\\) as a function and applying chain rule.",
    lesson:
      "Some curves are defined by equations that aren't solved for \\(y\\): \\(x^2 + y^2 = 25\\) (circle), \\(x^3 + y^3 = 6xy\\) (folium). You can still find \\(dy/dx\\) without solving for \\(y\\) explicitly.\n\nTechnique: treat \\(y\\) as an unknown function of \\(x\\). When you differentiate a term involving \\(y\\), use the chain rule: \\(\\frac{d}{dx}[y^n] = n y^{n-1} \\frac{dy}{dx}\\). Every \\(y\\) derivative sprouts a \\(dy/dx\\) factor.\n\nSteps: (1) differentiate both sides of the equation with respect to \\(x\\); (2) every \\(y\\) term produces a \\(y'\\); (3) collect all \\(y'\\) terms on one side; (4) solve algebraically for \\(y'\\).\n\nExample: \\(x^2 + y^2 = 25\\). Differentiate: \\(2x + 2y y' = 0\\). Solve: \\(y' = -x/y\\).\n\nFor a tangent line at a specific point, plug \\(x, y\\) into the expression for \\(y'\\). At \\((3, 4)\\) on the circle: \\(y' = -3/4\\), so tangent is \\(y - 4 = -3/4(x-3)\\).\n\nProduct rule appears in implicit problems too. \\(\\frac{d}{dx}(xy) = y + x y'\\) (product of \\(x\\) and \\(y\\)). Chain rule appears wherever \\(y\\) sits inside another function: \\(\\frac{d}{dx}\\sin y = \\cos y \\cdot y'\\).\n\nAP exam FRQ: they give you an implicit equation and ask for \\(dy/dx\\) and often a tangent line at a point. Show your implicit differentiation cleanly; graders check each step.",
    keyIdeas: [
      "\\(\\frac{d}{dx}y = y'\\); don't drop the chain rule factor.",
      "Differentiate both sides, then solve for \\(y'\\).",
      "Product rule applies to \\(xy\\), \\(x^2 y\\), etc.",
      "Answer for \\(y'\\) will generally be in terms of both \\(x\\) and \\(y\\).",
    ],
    workedExample: {
      prompt: "Find \\(dy/dx\\) if \\(x^2 + xy + y^2 = 7\\).",
      solution: "Differentiate: \\(2x + (y + x y') + 2y y' = 0\\). Collect: \\(y'(x + 2y) = -(2x + y)\\). Solve: \\(y' = -\\frac{2x + y}{x + 2y}\\).",
    },
    flashcards: [
      { q: "When differentiating \\(y^3\\) w.r.t. \\(x\\)?", a: "Get \\(3y^2 y'\\) — chain rule." },
      { q: "\\(\\frac{d}{dx}(xy)=?\\)", a: "\\(y + x y'\\) by product rule." },
      { q: "Final form of \\(y'\\) usually contains?", a: "Both \\(x\\) and \\(y\\)." },
    ],
    commonMistakes: [
      "Forgetting the \\(y'\\) factor on \\(y\\) terms.",
      "Skipping product rule on terms like \\(xy\\).",
      "Failing to collect \\(y'\\) terms before solving.",
    ],
    quiz: [
      {
        q: "If \\(x^2 + y^2 = 25\\), then \\(y' =\\)",
        choices: ["\\(-x/y\\)", "\\(x/y\\)", "\\(-y/x\\)", "\\(y/x\\)"],
        answerIndex: 0,
        explanation: "Differentiate: \\(2x + 2yy' = 0 \\Rightarrow y' = -x/y\\).",
      },
      {
        q: "For \\(y^2 = x\\), \\(dy/dx=\\)",
        choices: ["\\(1/(2y)\\)", "\\(2y\\)", "\\(y/2\\)", "\\(1/x\\)"],
        answerIndex: 0,
        explanation: "\\(2y y' = 1 \\Rightarrow y' = 1/(2y)\\).",
      },
      {
        q: "\\(\\frac{d}{dx}(xy^2)=\\)",
        choices: ["\\(y^2\\)", "\\(2xy\\)", "\\(y^2 + 2xy y'\\)", "\\(2y y'\\)"],
        answerIndex: 2,
        explanation: "Product rule: \\(1 \\cdot y^2 + x \\cdot 2y y'\\).",
      },
      {
        q: "At \\((3, 4)\\) on \\(x^2+y^2=25\\), the tangent line has slope:",
        choices: ["\\(3/4\\)", "\\(-3/4\\)", "\\(4/3\\)", "\\(-4/3\\)"],
        answerIndex: 1,
        explanation: "\\(y' = -x/y = -3/4\\).",
      },
    ],
  },

  "3.3": {
    id: "3.3",
    title: "Differentiating Inverse Functions",
    summary:
      "If \\(g = f^{-1}\\), then \\(g'(a) = \\frac{1}{f'(g(a))}\\) — inverse derivative is the reciprocal of the original derivative at the matching point.",
    lesson:
      "Let \\(f\\) be differentiable and one-to-one, with inverse \\(g = f^{-1}\\). Then \\(f(g(x)) = x\\). Differentiate both sides: \\(f'(g(x)) \\cdot g'(x) = 1\\). Solve: $$g'(x) = \\frac{1}{f'(g(x))}.$$\n\nAt a specific value \\(a\\), if \\(g(a) = b\\) (equivalently \\(f(b) = a\\)), then \\(g'(a) = \\frac{1}{f'(b)}\\). You need to know \\(b\\) (the input to \\(f\\) that produces \\(a\\)) to plug into \\(f'\\).\n\nAP loves this on MC and FRQ. Setup: given a table of \\(f\\) values (and \\(f'\\) values) and a question about \\(g'(a)\\). Steps: (1) find the \\(b\\) with \\(f(b) = a\\); (2) look up \\(f'(b)\\); (3) reciprocate.\n\nExample: \\(f(3) = 5\\), \\(f'(3) = 2\\). Find \\((f^{-1})'(5)\\). Since \\(f(3) = 5\\), \\(f^{-1}(5) = 3\\). So \\((f^{-1})'(5) = 1/f'(3) = 1/2\\).\n\nGeometric intuition: the graph of \\(f^{-1}\\) is \\(f\\) reflected across \\(y = x\\). Slopes reciprocate under that reflection. Horizontal tangent on \\(f\\) becomes vertical tangent on \\(f^{-1}\\), and vice versa — which is why \\(f'(b) = 0\\) means \\(f^{-1}\\) isn't differentiable at \\(a\\).",
    keyIdeas: [
      "\\((f^{-1})'(a) = 1/f'(f^{-1}(a))\\).",
      "To find \\(b\\) to plug into \\(f'\\), solve \\(f(b) = a\\).",
      "\\(f'(b) = 0\\) means \\(f^{-1}\\) isn't differentiable at \\(a\\).",
      "Inverse function graph = original graph reflected over \\(y=x\\).",
    ],
    workedExample: {
      prompt: "Given \\(f(x) = x^3 + x + 1\\), find \\((f^{-1})'(3)\\).",
      solution: "Solve \\(f(b) = 3\\): \\(b^3 + b + 1 = 3 \\Rightarrow b^3 + b - 2 = 0 \\Rightarrow (b-1)(b^2+b+2)=0 \\Rightarrow b=1\\). \\(f'(x) = 3x^2 + 1\\), \\(f'(1) = 4\\). \\((f^{-1})'(3) = 1/4\\).",
    },
    flashcards: [
      { q: "Inverse derivative formula?", a: "\\((f^{-1})'(a) = 1/f'(f^{-1}(a))\\)." },
      { q: "First step to find \\((f^{-1})'(a)\\)?", a: "Find \\(b\\) with \\(f(b)=a\\)." },
      { q: "When is \\(f^{-1}\\) not differentiable at \\(a\\)?", a: "When \\(f'(b) = 0\\) for \\(b = f^{-1}(a)\\)." },
    ],
    commonMistakes: [
      "Plugging \\(a\\) into \\(f'\\) directly — you need \\(b = f^{-1}(a)\\).",
      "Forgetting to reciprocate.",
      "Confusing \\(f'(a)\\) with \\((f^{-1})'(a)\\).",
    ],
    quiz: [
      {
        q: "If \\(f(2)=7\\) and \\(f'(2)=3\\), then \\((f^{-1})'(7)=\\)",
        choices: ["3", "\\(1/3\\)", "\\(1/7\\)", "\\(7/3\\)"],
        answerIndex: 1,
        explanation: "\\(f^{-1}(7)=2\\); \\((f^{-1})'(7) = 1/f'(2) = 1/3\\).",
      },
      {
        q: "\\((f^{-1})'(a)\\) formula?",
        choices: ["\\(1/f'(a)\\)", "\\(-f'(a)\\)", "\\(1/f'(f^{-1}(a))\\)", "\\(f'(f^{-1}(a))\\)"],
        answerIndex: 2,
        explanation: "Must evaluate \\(f'\\) at \\(f^{-1}(a)\\), not at \\(a\\).",
      },
      {
        q: "\\(f(x)=x^3\\). \\((f^{-1})'(8)=\\)",
        choices: ["\\(1/12\\)", "\\(1/8\\)", "\\(12\\)", "\\(3\\)"],
        answerIndex: 0,
        explanation: "\\(f^{-1}(8)=2\\); \\(f'(2)=12\\); reciprocal = 1/12.",
      },
      {
        q: "Why does \\(f'(b)=0\\) cause trouble for \\((f^{-1})'(a)\\)?",
        choices: ["Division by zero.", "\\(f^{-1}\\) doesn't exist.", "Inverse is discontinuous.", "Limit oscillates."],
        answerIndex: 0,
        explanation: "Reciprocal formula divides by \\(f'(b)\\); zero makes it undefined. \\(f^{-1}\\) has a vertical tangent.",
      },
    ],
  },

  "3.4": {
    id: "3.4",
    title: "Differentiating Inverse Trigonometric Functions",
    summary:
      "Memorize \\(\\arcsin' x = 1/\\sqrt{1-x^2}\\), \\(\\arctan' x = 1/(1+x^2)\\), \\(\\arccos' x = -1/\\sqrt{1-x^2}\\).",
    lesson:
      "Inverse trig derivatives show up on every AP exam. Memorize the three that matter most:\n\n\\(\\frac{d}{dx}\\arcsin x = \\frac{1}{\\sqrt{1 - x^2}}\\), valid for \\(-1 < x < 1\\).\n\n\\(\\frac{d}{dx}\\arctan x = \\frac{1}{1 + x^2}\\), valid for all \\(x\\).\n\n\\(\\frac{d}{dx}\\arccos x = -\\frac{1}{\\sqrt{1 - x^2}}\\) (note the negative).\n\nDerivation example (for arcsin): Let \\(y = \\arcsin x\\), so \\(\\sin y = x\\). Differentiate implicitly: \\(\\cos y \\cdot y' = 1\\), \\(y' = 1/\\cos y\\). Use \\(\\cos y = \\sqrt{1 - \\sin^2 y} = \\sqrt{1 - x^2}\\).\n\nChain rule with inverse trig: \\(\\frac{d}{dx}\\arctan(g(x)) = \\frac{g'(x)}{1 + g(x)^2}\\). So \\(\\frac{d}{dx}\\arctan(2x) = \\frac{2}{1 + 4x^2}\\).\n\nAP trap: don't confuse \\(\\arctan x\\) with \\((\\tan x)^{-1} = \\cot x\\). Graders differentiate these ruthlessly.",
    keyIdeas: [
      "\\(\\arcsin'(x) = 1/\\sqrt{1-x^2}\\).",
      "\\(\\arctan'(x) = 1/(1+x^2)\\).",
      "\\(\\arccos'(x) = -1/\\sqrt{1-x^2}\\).",
      "Chain rule: multiply by inner derivative.",
    ],
    workedExample: {
      prompt: "Find \\(\\frac{d}{dx}[\\arctan(3x)]\\).",
      solution: "\\(\\frac{1}{1 + (3x)^2} \\cdot 3 = \\frac{3}{1 + 9x^2}\\).",
    },
    flashcards: [
      { q: "\\(\\arcsin'(x)=?\\)", a: "\\(1/\\sqrt{1-x^2}\\)." },
      { q: "\\(\\arctan'(x)=?\\)", a: "\\(1/(1+x^2)\\)." },
      { q: "\\(\\arccos'(x)=?\\)", a: "\\(-1/\\sqrt{1-x^2}\\)." },
    ],
    commonMistakes: [
      "Forgetting the minus sign on arccos.",
      "Confusing \\(\\arctan\\) with \\(1/\\tan = \\cot\\).",
      "Missing the chain rule factor \\(g'(x)\\).",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}\\arcsin x =\\)",
        choices: ["\\(1/\\sqrt{1-x^2}\\)", "\\(-1/\\sqrt{1-x^2}\\)", "\\(1/(1-x^2)\\)", "\\(\\cos x\\)"],
        answerIndex: 0,
        explanation: "Standard result; note positive sign.",
      },
      {
        q: "\\(\\frac{d}{dx}\\arctan(x^2)=\\)",
        choices: ["\\(1/(1+x^4)\\)", "\\(2x/(1+x^4)\\)", "\\(2x/(1+x^2)\\)", "\\(1/(1+x^2)\\)"],
        answerIndex: 1,
        explanation: "Chain rule: inner = \\(x^2\\), derivative \\(2x\\); \\(1/(1+x^4)\\) times \\(2x\\).",
      },
      {
        q: "Slope of \\(y=\\arctan x\\) at \\(x=1\\)?",
        choices: ["\\(\\pi/4\\)", "\\(1/2\\)", "\\(1\\)", "\\(2\\)"],
        answerIndex: 1,
        explanation: "\\(1/(1+1^2) = 1/2\\).",
      },
      {
        q: "\\(\\frac{d}{dx}\\arccos x\\)?",
        choices: ["\\(1/\\sqrt{1-x^2}\\)", "\\(-1/\\sqrt{1-x^2}\\)", "\\(-1/(1+x^2)\\)", "\\(-\\sin x\\)"],
        answerIndex: 1,
        explanation: "Arccos has a negative sign.",
      },
    ],
  },

  "3.5": {
    id: "3.5",
    title: "Selecting Procedures for Calculating Derivatives",
    summary:
      "Pick the right rule for the structure: power, sum, product, quotient, chain, implicit, or inverse — often you need several stacked.",
    lesson:
      "Most AP problems require identifying which differentiation rules apply and in what order. Diagnostic checklist:\n\n1. Is the expression a sum or difference? Split via linearity.\n2. Is any term a constant multiple of a standard form? Pull constants out.\n3. Is any term a product of non-trivial functions? Product rule.\n4. A quotient? Quotient rule (or rewrite as negative power + product).\n5. A composition (outer of inner)? Chain rule.\n6. Is \\(y\\) defined implicitly? Implicit differentiation.\n\nExample: \\(\\frac{d}{dx}[x^2 \\sin(3x)]\\). This is a product (\\(x^2\\) and \\(\\sin(3x)\\)), with the second factor requiring chain rule. Product rule gives \\(2x\\sin(3x) + x^2 \\cdot 3\\cos(3x)\\).\n\nExample: \\(\\frac{d}{dx}\\left[\\frac{e^{2x}}{x^2 + 1}\\right]\\). Quotient with chain rule on \\(e^{2x}\\).\n\nOrder of operations matters. Product/quotient structure first, then chain rule inside each piece.",
    keyIdeas: [
      "Diagnose structure before differentiating.",
      "Chain rule is usually nested inside another rule.",
      "Simplify algebraically if possible before reaching for heavy machinery.",
      "Double-check: each factor differentiated, each chain rule factor included.",
    ],
    workedExample: {
      prompt: "Find \\(\\frac{d}{dx}\\left[\\frac{\\sin(x^2)}{x}\\right]\\).",
      solution: "Quotient rule. \\(f = \\sin(x^2), f' = 2x\\cos(x^2)\\) (chain). \\(g = x, g' = 1\\). \\((f/g)' = \\frac{2x\\cos(x^2) \\cdot x - \\sin(x^2)}{x^2} = \\frac{2x^2 \\cos(x^2) - \\sin(x^2)}{x^2}\\).",
    },
    flashcards: [
      { q: "Product times chain: order?", a: "Apply product rule first, chain rule within each factor." },
      { q: "When to rewrite instead of quotient rule?", a: "When quotient simplifies (e.g. \\(x^3/x = x^2\\))." },
      { q: "Most commonly forgotten rule?", a: "Chain rule." },
    ],
    commonMistakes: [
      "Applying product rule when sum rule is correct.",
      "Forgetting chain rule inside a product or quotient.",
      "Using quotient rule when algebraic simplification is faster.",
    ],
    quiz: [
      {
        q: "\\(\\frac{d}{dx}[x \\cdot e^x]\\)?",
        choices: ["\\(e^x\\)", "\\(x e^x\\)", "\\(e^x + x e^x\\)", "\\(e^{x^2}\\)"],
        answerIndex: 2,
        explanation: "Product rule: \\(1 \\cdot e^x + x \\cdot e^x\\).",
      },
      {
        q: "\\(\\frac{d}{dx}[\\sin^2 x]\\)?",
        choices: ["\\(2\\sin x\\)", "\\(\\sin^2 x\\)", "\\(2\\sin x \\cos x\\)", "\\(\\cos^2 x\\)"],
        answerIndex: 2,
        explanation: "Chain rule on \\((\\sin x)^2\\): \\(2\\sin x \\cdot \\cos x\\).",
      },
      {
        q: "Which rule applies first to \\(\\frac{\\sin x}{e^x}\\)?",
        choices: ["Chain rule", "Product rule", "Quotient rule", "Implicit"],
        answerIndex: 2,
        explanation: "Outer structure is a quotient.",
      },
      {
        q: "For \\(y = \\ln(\\sec x)\\), \\(y'=\\)",
        choices: ["\\(\\tan x\\)", "\\(\\sec x\\)", "\\(\\csc x\\)", "\\(\\sec^2 x\\)"],
        answerIndex: 0,
        explanation: "Chain: \\(\\frac{\\sec x \\tan x}{\\sec x} = \\tan x\\).",
      },
    ],
  },

  "3.6": {
    id: "3.6",
    title: "Calculating Higher-Order Derivatives",
    summary:
      "\\(f''\\) is the derivative of \\(f'\\); keep going for \\(f^{(n)}\\). Second derivatives measure concavity and acceleration.",
    lesson:
      "The second derivative \\(f''(x)\\) is the derivative of \\(f'(x)\\). Similarly \\(f''' = f^{(3)}\\), and in general \\(f^{(n)}\\) is the \\(n\\)-th derivative.\n\nNotation: \\(f''(x)\\), \\(f^{(n)}(x)\\), \\(\\frac{d^n y}{dx^n}\\), \\(y''\\). All equivalent.\n\nWhy you care: \\(f''\\) captures curvature/concavity (Unit 5.6) and in motion context it's acceleration (Unit 4.2).\n\nProcedure: differentiate, then differentiate again.\n\nExample: \\(f(x) = x^4\\). \\(f'(x) = 4x^3\\). \\(f''(x) = 12x^2\\). \\(f'''(x) = 24x\\). \\(f^{(4)}(x) = 24\\). \\(f^{(5)}(x) = 0\\).\n\nExample with chain rule: \\(f(x) = \\sin(2x)\\). \\(f'(x) = 2\\cos(2x)\\). \\(f''(x) = -4\\sin(2x)\\). Note the chain factor squared after two differentiations.\n\nImplicit second derivatives: differentiate implicitly for \\(y'\\), then differentiate \\(y'\\) again, substituting \\(y'\\) wherever it appears.",
    keyIdeas: [
      "\\(f''\\) = derivative of \\(f'\\).",
      "Second derivative = concavity (Unit 5) and acceleration (Unit 4).",
      "Polynomials eventually become 0.",
      "Chain rule factors accumulate with each differentiation.",
    ],
    workedExample: {
      prompt: "Find \\(f''(x)\\) for \\(f(x) = e^{3x}\\).",
      solution: "\\(f'(x) = 3e^{3x}\\). \\(f''(x) = 9e^{3x}\\).",
    },
    flashcards: [
      { q: "Definition of second derivative?", a: "Derivative of the first derivative." },
      { q: "Physics interpretation of \\(f''\\)?", a: "Acceleration (if \\(f\\) is position)." },
      { q: "\\(\\frac{d^2}{dx^2}(\\sin x)=?\\)", a: "\\(-\\sin x\\)." },
    ],
    commonMistakes: [
      "Stopping after the first derivative.",
      "Forgetting chain rule on the second pass.",
      "Not simplifying before the second differentiation.",
    ],
    quiz: [
      {
        q: "\\(f(x) = x^5\\); \\(f''(x)=\\)",
        choices: ["\\(5x^4\\)", "\\(20x^3\\)", "\\(60x^2\\)", "\\(120x\\)"],
        answerIndex: 1,
        explanation: "\\(f' = 5x^4\\), \\(f'' = 20x^3\\).",
      },
      {
        q: "For \\(y=\\cos x\\), \\(y''=\\)",
        choices: ["\\(\\cos x\\)", "\\(-\\cos x\\)", "\\(\\sin x\\)", "\\(-\\sin x\\)"],
        answerIndex: 1,
        explanation: "\\(y' = -\\sin x\\), \\(y'' = -\\cos x\\).",
      },
      {
        q: "If \\(s(t)\\) is position, \\(s''(t)\\) is:",
        choices: ["Velocity", "Acceleration", "Jerk", "Speed"],
        answerIndex: 1,
        explanation: "Second derivative of position = acceleration.",
      },
      {
        q: "\\(f(x)=\\sin(2x)\\); \\(f''(x)=\\)",
        choices: ["\\(2\\cos(2x)\\)", "\\(-4\\sin(2x)\\)", "\\(4\\sin(2x)\\)", "\\(-\\sin(2x)\\)"],
        answerIndex: 1,
        explanation: "\\(f' = 2\\cos(2x)\\), \\(f'' = -4\\sin(2x)\\). Chain factor 2 squared = 4.",
      },
    ],
  },

  "4.1": {
    id: "4.1",
    title: "Interpreting the Meaning of the Derivative in Context",
    summary:
      "Write derivative values as sentences with the right units — \"at \\(t=3\\) seconds, the function is changing at 2 units per second.\"",
    lesson:
      "AP graders demand a specific sentence structure when interpreting \\(f'(a)\\) in context: (1) state the value, (2) name what's changing, (3) give the units, (4) specify when (at what input value).\n\nTemplate: \"At \\(x = a\\), [output quantity] is changing at \\(f'(a)\\) [output units per input unit].\"\n\nExample: if \\(V(t)\\) is the volume of water in a tank (gallons) at time \\(t\\) (minutes), and \\(V'(5) = 3\\): \"At \\(t = 5\\) minutes, the volume of water in the tank is increasing at 3 gallons per minute.\"\n\nSign matters: positive \\(f'(a)\\) = increasing; negative = decreasing.\n\nUnits come from the structure of the derivative: if output is measured in units \\(Y\\) and input in units \\(X\\), then \\(f'\\) is in units of \\(Y\\) per \\(X\\).\n\nAP graders score this as a two-part rubric item: numerical answer + interpretation sentence. Dropping units costs the interpretation point even if the number is right.",
    keyIdeas: [
      "Always include units and timing in the interpretation.",
      "Units: output units per input unit.",
      "Sign of \\(f'\\) = direction of change.",
      "Template: \"At \\(x=a\\), [quantity] is [increasing/decreasing] at \\(f'(a)\\) [units].\"",
    ],
    workedExample: {
      prompt: "\\(W(t)\\) is a child's weight (lbs) at age \\(t\\) (years). \\(W'(5) = 6\\). Interpret.",
      solution: "\"At age 5 years, the child's weight is increasing at 6 pounds per year.\"",
    },
    flashcards: [
      { q: "Units of \\(f'\\) if \\(f\\) is in meters and \\(x\\) in seconds?", a: "Meters per second." },
      { q: "Sign of \\(f'(a)\\) positive means?", a: "\\(f\\) is increasing at \\(a\\)." },
      { q: "Four elements in interpretation?", a: "Value, quantity, units, timing." },
    ],
    commonMistakes: [
      "Omitting units.",
      "Writing \"the derivative is 3\" without naming the quantity.",
      "Confusing direction of change with positivity of the quantity.",
    ],
    quiz: [
      {
        q: "\\(T(h)\\) is temperature (F) at height \\(h\\) (ft). \\(T'(1000) = -0.003\\). Best interpretation?",
        choices: ["Temperature is decreasing by 0.003 degrees per foot at 1000 ft.", "Temperature is -0.003 F at 1000 ft.", "Temperature is increasing at 0.003 F per foot.", "Temperature is at 1000."],
        answerIndex: 0,
        explanation: "Negative derivative means decreasing; units = F per ft; at \\(h=1000\\).",
      },
      {
        q: "Units of \\(dV/dt\\) if \\(V\\) is in liters and \\(t\\) in hours?",
        choices: ["Liters", "Hours", "Liters per hour", "Hours per liter"],
        answerIndex: 2,
        explanation: "Output units over input units.",
      },
      {
        q: "\\(P'(10) = 0\\) means at \\(t=10\\):",
        choices: ["\\(P\\) is zero.", "\\(P\\) is not changing at that instant.", "\\(P\\) is maximized.", "P is decreasing."],
        answerIndex: 1,
        explanation: "Derivative zero = instantaneous rate of change = 0.",
      },
      {
        q: "What must an AP interpretation sentence include?",
        choices: ["The formula only.", "Value, units, and context (including when).", "A graph.", "A proof."],
        answerIndex: 1,
        explanation: "Graders require value, units, quantity, and timing.",
      },
    ],
  },

  "4.2": {
    id: "4.2",
    title: "Straight-Line Motion: Connecting Position, Velocity, and Acceleration",
    summary:
      "\\(s(t)\\) position, \\(v(t) = s'(t)\\) velocity, \\(a(t) = v'(t) = s''(t)\\) acceleration. Speed = \\(|v|\\).",
    lesson:
      "For a particle on a straight line:\n- Position \\(s(t)\\): location on the line, signed.\n- Velocity \\(v(t) = s'(t)\\): rate of position change; signed.\n- Speed \\(|v(t)|\\): magnitude, always \\(\\ge 0\\).\n- Acceleration \\(a(t) = v'(t) = s''(t)\\): rate of velocity change.\n\nVelocity sign tells direction: \\(v > 0\\) moving right, \\(v < 0\\) moving left.\n\nSpeeding up vs slowing down: the particle is speeding up when \\(v\\) and \\(a\\) have the same sign; slowing down when they have opposite signs. Equivalently, speed increases iff \\(v \\cdot a > 0\\).\n\nA particle is momentarily at rest when \\(v(t) = 0\\). Its direction changes at times where \\(v(t)\\) changes sign.\n\nDisplacement from \\(t = a\\) to \\(t = b\\) is \\(s(b) - s(a)\\). Total distance traveled is \\(\\int_a^b |v(t)| dt\\) — handled in Unit 8.2.\n\nAP FRQs routinely ask: at \\(t = c\\), is the particle speeding up or slowing down? Justify with signs of \\(v\\) and \\(a\\).",
    keyIdeas: [
      "\\(v = s'\\), \\(a = v' = s''\\).",
      "Speed = \\(|v|\\); direction given by sign of \\(v\\).",
      "Speeding up \\(\\Leftrightarrow\\) \\(v\\) and \\(a\\) same sign.",
      "At rest \\(\\Leftrightarrow\\) \\(v = 0\\); direction change requires sign change of \\(v\\).",
    ],
    workedExample: {
      prompt: "\\(s(t) = t^3 - 6t^2 + 9t\\). At \\(t = 2\\), is the particle speeding up or slowing down?",
      solution: "\\(v(t) = 3t^2 - 12t + 9\\). \\(v(2) = 12 - 24 + 9 = -3 < 0\\). \\(a(t) = 6t - 12\\). \\(a(2) = 0\\). Acceleration is 0 at \\(t=2\\); just after, \\(a\\) turns positive while \\(v\\) is still negative — opposite signs, slowing down. Precisely at \\(t=2\\), neither.",
    },
    flashcards: [
      { q: "Definition of speed?", a: "\\(|v(t)|\\)." },
      { q: "When is a particle speeding up?", a: "When \\(v\\) and \\(a\\) have the same sign." },
      { q: "When is a particle momentarily at rest?", a: "When \\(v(t) = 0\\)." },
    ],
    commonMistakes: [
      "Confusing \"at rest\" with \"not moving for an interval.\"",
      "Treating speed = velocity; missing absolute value.",
      "Calling a particle \"slowing down\" when \\(v\\) and \\(a\\) are both negative.",
    ],
    quiz: [
      {
        q: "\\(s(t)=t^2 - 4t\\). Velocity at \\(t=3\\)?",
        choices: ["2", "0", "\\(-2\\)", "6"],
        answerIndex: 0,
        explanation: "\\(s'(t) = 2t - 4\\), at 3: \\(2\\).",
      },
      {
        q: "If \\(v(t) = 4\\) and \\(a(t) = -1\\) at some instant, the particle is:",
        choices: ["Speeding up", "Slowing down", "At rest", "Accelerating in the positive direction"],
        answerIndex: 1,
        explanation: "Opposite signs of \\(v\\) and \\(a\\) = slowing down.",
      },
      {
        q: "Speed equals:",
        choices: ["\\(v(t)\\)", "\\(|v(t)|\\)", "\\(v'(t)\\)", "\\(s'(t)\\)"],
        answerIndex: 1,
        explanation: "Speed is the magnitude of velocity.",
      },
      {
        q: "Particle direction changes at \\(t=c\\) if:",
        choices: ["\\(v(c)=0\\) (sufficient alone).", "\\(v(c)=0\\) and \\(v\\) changes sign at \\(c\\).", "\\(a(c)=0\\).", "\\(s(c)=0\\)."],
        answerIndex: 1,
        explanation: "Sign change is the key; mere zero isn't enough.",
      },
    ],
  },

  "4.3": {
    id: "4.3",
    title: "Rates of Change in Applied Contexts Other Than Motion",
    summary:
      "Apply derivative interpretation to non-motion contexts — flow, population, temperature, cost — with proper units and timing.",
    lesson:
      "Derivatives model any rate of change, not just motion. Common AP contexts:\n\n- Water flow: \\(V(t)\\) volume, \\(V'(t)\\) flow rate (gallons/min).\n- Population: \\(P(t)\\) population, \\(P'(t)\\) growth rate.\n- Temperature: \\(T(t)\\) temperature, \\(T'(t)\\) rate of temperature change.\n- Economics: \\(C(x)\\) cost, \\(C'(x)\\) marginal cost (dollars/unit produced).\n\nSame interpretation rules apply as in Unit 4.1: name the quantity, give value with units, specify the time.\n\nMany AP problems give you a rate function \\(R(t)\\) and ask about the underlying quantity. For example, water flows into a tank at rate \\(R(t) = \\sqrt{t}\\) gallons per hour. Questions:\n- How fast is water flowing in at \\(t=4\\)? \\(R(4) = 2\\) gal/hr.\n- At what rate is the flow rate increasing? \\(R'(t) = 1/(2\\sqrt t)\\).\n- How much water has entered from \\(t=0\\) to \\(t=4\\)? \\(\\int_0^4 R(t)dt\\) (foreshadowing Unit 8.3).\n\nPay attention to derivative vs accumulation language. \"Rate of change\" = derivative. \"Total change\" = integral of the rate.",
    keyIdeas: [
      "Every derivative in context has units of output/input.",
      "Don't mix up \\(R(t)\\) (rate) and \\(R'(t)\\) (rate of rate).",
      "\"Rate of change\" = derivative; \"total change\" = integral.",
      "Sentences with units, values, and timing are required on FRQs.",
    ],
    workedExample: {
      prompt: "Population \\(P(t)\\) has \\(P'(5) = 120\\) when \\(t\\) is in years. Interpret.",
      solution: "\"At \\(t = 5\\) years, the population is increasing at a rate of 120 organisms per year.\"",
    },
    flashcards: [
      { q: "Units of \\(C'(x)\\) if \\(C\\) is cost (\\$) and \\(x\\) is units?", a: "Dollars per unit." },
      { q: "What does \\(P'(t)\\) mean?", a: "Rate of change of population at time \\(t\\)." },
      { q: "Units of \\(P''\\) vs \\(P'\\)?", a: "Differs — \\(P''\\) is per-input-unit squared." },
    ],
    commonMistakes: [
      "Using the wrong units for a second derivative.",
      "Interpreting the rate as the total.",
      "Forgetting to name the quantity changing.",
    ],
    quiz: [
      {
        q: "\\(T'(60) = -0.5\\) (F/min). At \\(t=60\\) min:",
        choices: ["Temperature is -0.5 F.", "Temperature is decreasing at 0.5 F per minute.", "Temperature is 60 F.", "Temperature is increasing."],
        answerIndex: 1,
        explanation: "Negative rate = decreasing; units F/min.",
      },
      {
        q: "Marginal cost \\(C'(100) = 25\\) (\\$/unit). Best interpretation?",
        choices: ["Total cost is \\$25.", "Producing the 101st unit costs about \\$25 more.", "Cost is increasing by \\$25 per hour.", "Cost minimized at \\(x=100\\)."],
        answerIndex: 1,
        explanation: "Derivative approximates cost of one more unit.",
      },
      {
        q: "If \\(R(t)\\) is a flow rate (gal/min), units of \\(R'(t)\\) are:",
        choices: ["Gallons", "Gal/min", "Gal per min per min", "Min/gallon"],
        answerIndex: 2,
        explanation: "Rate of a rate: (gal/min)/min.",
      },
      {
        q: "\"Volume is decreasing at 3 L/s\" corresponds to:",
        choices: ["\\(V(t) = 3\\)", "\\(V'(t) = -3\\)", "\\(V'(t) = 3\\)", "\\(V''(t) = -3\\)"],
        answerIndex: 1,
        explanation: "Decreasing \\(\\Rightarrow\\) negative derivative.",
      },
    ],
  },

  "4.4": {
    id: "4.4",
    title: "Introduction to Related Rates",
    summary:
      "Related rates link rates of multiple quantities by differentiating a relation implicitly with respect to time.",
    lesson:
      "Related rates problems have this structure: (1) two or more quantities are related by a geometric or physical equation; (2) at least one quantity is changing with time; (3) you need the rate of change of another quantity at a specific instant.\n\nCore move: differentiate the relating equation with respect to time \\(t\\). Every variable becomes a \\(dx/dt\\)-style term via chain rule. Solve for the rate you want, then plug in values at the instant.\n\nExample setup: a ladder of length 10 ft leans against a wall. Let \\(x\\) = base distance from wall, \\(y\\) = height on wall. Relation: \\(x^2 + y^2 = 100\\). Given \\(dx/dt = 2\\) ft/s when \\(x = 6\\), find \\(dy/dt\\).\n\nDifferentiate: \\(2x(dx/dt) + 2y(dy/dt) = 0\\). At \\(x=6\\), \\(y = 8\\). Solve: \\(2(6)(2) + 2(8)(dy/dt) = 0 \\Rightarrow dy/dt = -3/2\\) ft/s. The top slides down at 1.5 ft/s.\n\nImportant principle: substitute numerical values for positions only AFTER differentiating. If you plug numbers in too early, the chain rule factor disappears.\n\nKey AP template: (1) label variables and their rates; (2) write the relating equation; (3) differentiate implicitly with respect to \\(t\\); (4) substitute given values; (5) solve; (6) include units.",
    keyIdeas: [
      "Differentiate the relation with respect to \\(t\\) — every variable gets a rate factor.",
      "Substitute numerical values AFTER differentiating, not before.",
      "Include units; rates often have units like ft/s, gal/min.",
      "Choose the relating equation based on geometry.",
    ],
    workedExample: {
      prompt: "A balloon has volume \\(V = \\frac{4}{3}\\pi r^3\\). If \\(r\\) increases at 2 cm/s, find \\(dV/dt\\) when \\(r = 5\\).",
      solution: "\\(dV/dt = 4\\pi r^2 (dr/dt)\\). At \\(r=5, dr/dt=2\\): \\(dV/dt = 4\\pi (25)(2) = 200\\pi\\) cm\\(^3\\)/s.",
    },
    flashcards: [
      { q: "Key operation in related rates?", a: "Differentiate the relation implicitly with respect to time." },
      { q: "When to substitute values?", a: "After differentiating, never before." },
      { q: "Common geometric relations?", a: "Pythagorean, similar triangles, volume formulas." },
    ],
    commonMistakes: [
      "Plugging in numbers before differentiating.",
      "Forgetting the chain rule factor \\(dr/dt\\) etc.",
      "Using the wrong geometric relation.",
    ],
    quiz: [
      {
        q: "In related rates, you differentiate the relation with respect to:",
        choices: ["\\(x\\)", "\\(y\\)", "\\(t\\)", "Any variable"],
        answerIndex: 2,
        explanation: "Time is the common variable both quantities depend on.",
      },
      {
        q: "Why substitute numerical values only AFTER differentiating?",
        choices: ["Tradition.", "To keep equation symbolic.", "Chain rule factors depend on variables being symbolic.", "To make arithmetic easier."],
        answerIndex: 2,
        explanation: "If you plug in a number, the variable becomes a constant and loses its rate factor.",
      },
      {
        q: "Volume of a cube \\(V = x^3\\). If \\(x\\) grows at 1 cm/s, \\(dV/dt\\) at \\(x=4\\):",
        choices: ["48 cm/s", "\\(48\\) cm\\(^3\\)/s", "\\(12\\) cm\\(^3\\)/s", "\\(64\\) cm\\(^3\\)/s"],
        answerIndex: 1,
        explanation: "\\(dV/dt = 3x^2 (dx/dt) = 3(16)(1) = 48\\) cm\\(^3\\)/s.",
      },
      {
        q: "Which relation is typical for a shadow problem?",
        choices: ["Pythagorean", "Similar triangles", "Trig identity", "Law of cosines"],
        answerIndex: 1,
        explanation: "Shadow problems rely on similar triangle ratios.",
      },
    ],
  },

  "4.5": {
    id: "4.5",
    title: "Solving Related Rates Problems",
    summary:
      "Standard pipeline: draw, label, relate, differentiate, substitute, solve with units.",
    lesson:
      "The full related-rates solution process, AP-style:\n\nStep 1: Draw a clear picture with labels. Identify the quantities that change and the quantity whose rate you need.\n\nStep 2: Write a relation connecting only the variables that depend on time.\n\nStep 3: Differentiate with respect to \\(t\\). Every variable \\(x, y, z\\) gets a rate \\(dx/dt, dy/dt, dz/dt\\).\n\nStep 4: Substitute given numerical values at the instant of interest (positions and known rates).\n\nStep 5: Solve algebraically for the unknown rate.\n\nStep 6: Include units and a complete sentence if the FRQ demands.\n\nSome problems require computing a missing position first using the constraint equation. E.g., ladder problem: given \\(x = 6\\) and \\(L = 10\\), compute \\(y = \\sqrt{100 - 36} = 8\\) before plugging in.\n\nTricky variants: conical tank (volume depends on radius and height, but they're related by similar triangles — express volume in one variable before differentiating); shadow with moving source (two similar triangles).",
    keyIdeas: [
      "Draw-label-relate-differentiate-substitute-solve pipeline.",
      "Compute unknown positions from constraints before substituting.",
      "Cone problems: use similar triangles to eliminate a variable.",
      "End with units and sign-appropriate answer.",
    ],
    workedExample: {
      prompt: "Water fills a cone (vertex down) with radius 4 ft at top, height 6 ft. Water flows in at 5 ft\\(^3\\)/min. Find \\(dh/dt\\) when \\(h = 3\\) ft.",
      solution: "Similar triangles: \\(r/h = 4/6 = 2/3\\), so \\(r = 2h/3\\). Volume: \\(V = \\frac{1}{3}\\pi r^2 h = \\frac{4\\pi h^3}{27}\\). Differentiate: \\(dV/dt = \\frac{4\\pi h^2}{9}(dh/dt)\\). At \\(h=3\\): \\(5 = 4\\pi(dh/dt) \\Rightarrow dh/dt = \\frac{5}{4\\pi}\\) ft/min.",
    },
    flashcards: [
      { q: "First step?", a: "Draw a diagram and label variables." },
      { q: "Cone strategy?", a: "Use similar triangles to express \\(V\\) in a single variable." },
      { q: "When do you substitute values?", a: "After differentiating the relation." },
    ],
    commonMistakes: [
      "Plugging in values before differentiating.",
      "Skipping similar-triangle reduction in cone problems.",
      "Forgetting units.",
    ],
    quiz: [
      {
        q: "In a sliding ladder problem, the relation is:",
        choices: ["\\(xy=L\\)", "\\(x^2 + y^2 = L^2\\)", "\\(x+y=L\\)", "\\(x = L \\sin y\\)"],
        answerIndex: 1,
        explanation: "Pythagorean theorem.",
      },
      {
        q: "A spherical balloon has \\(V=(4/3)\\pi r^3\\). If \\(dV/dt = 10\\) and \\(r = 5\\), then \\(dr/dt=\\)",
        choices: ["\\(\\frac{1}{10\\pi}\\)", "\\(\\frac{10}{100\\pi}\\)", "\\(\\frac{1}{10}\\)", "\\(\\frac{2}{5}\\)"],
        answerIndex: 0,
        explanation: "\\(dV/dt = 4\\pi r^2 dr/dt \\Rightarrow dr/dt = 10/(4\\pi \\cdot 25) = 1/(10\\pi)\\).",
      },
      {
        q: "In a conical water tank, you reduce \\(V\\) to one variable by:",
        choices: ["Pythagoras", "Similar triangles", "Chain rule", "Power rule"],
        answerIndex: 1,
        explanation: "Ratio of radius to height is fixed — similar triangles.",
      },
      {
        q: "Common related-rates error?",
        choices: ["Using chain rule.", "Substituting specific values before differentiating.", "Using similar triangles.", "Including units."],
        answerIndex: 1,
        explanation: "You lose the rate of change for that variable if you substitute too early.",
      },
    ],
  },

  "4.6": {
    id: "4.6",
    title: "Approximating Values of a Function Using Local Linearity and Linearization",
    summary:
      "Near \\(a\\), \\(f(x) \\approx f(a) + f'(a)(x-a)\\) — the tangent line approximation.",
    lesson:
      "Local linearization: for \\(x\\) near \\(a\\), $$L(x) = f(a) + f'(a)(x - a) \\approx f(x).$$ This is the tangent line to \\(f\\) at \\(a\\), and it's the best linear approximation of \\(f\\) near that point.\n\nUse it to estimate \\(f(x)\\) for \\(x\\) close to \\(a\\) without computing \\(f\\) directly. Example: estimate \\(\\sqrt{25.3}\\). Take \\(f(x) = \\sqrt{x}\\), \\(a = 25\\). \\(f(a) = 5\\), \\(f'(a) = 1/(2\\sqrt{25}) = 0.1\\). So \\(\\sqrt{25.3} \\approx 5 + 0.1(0.3) = 5.03\\).\n\nAccuracy of linearization depends on how close \\(x\\) is to \\(a\\) and how curved \\(f\\) is. If \\(f'' > 0\\) (concave up), linearization underestimates \\(f\\); if \\(f'' < 0\\) (concave down), it overestimates.\n\nAP applications: estimate \\(f(b)\\) given \\(f(a)\\) and \\(f'(a)\\); estimate changes in \\(f\\) over a small \\(\\Delta x\\). Key FRQ phrasing: \"use the tangent line approximation to estimate...\"\n\nAlso foundational: differentials. \\(dy = f'(x) dx\\) captures the same idea.",
    keyIdeas: [
      "Tangent line approximation: \\(L(x) = f(a) + f'(a)(x-a)\\).",
      "Accurate for \\(x\\) near \\(a\\); accuracy worse as you stray.",
      "Concavity determines whether linearization over- or under-estimates.",
      "Differentials: \\(dy = f'(x) dx\\).",
    ],
    workedExample: {
      prompt: "Use linearization to estimate \\((1.02)^5\\).",
      solution: "Let \\(f(x) = x^5\\), \\(a = 1\\). \\(f(1) = 1\\), \\(f'(1) = 5\\). \\(L(x) = 1 + 5(x-1)\\). \\(L(1.02) = 1.1\\). (Actual: 1.1041.)",
    },
    flashcards: [
      { q: "Tangent line approximation formula?", a: "\\(L(x) = f(a) + f'(a)(x-a)\\)." },
      { q: "If \\(f'' > 0\\), over or under?", a: "Underestimate (curve is above tangent)." },
      { q: "Differential \\(dy\\)?", a: "\\(f'(x) dx\\)." },
    ],
    commonMistakes: [
      "Using linearization at points far from \\(a\\).",
      "Forgetting the sign of \\((x-a)\\) when \\(x < a\\).",
      "Confusing under/overestimate signs with concavity.",
    ],
    quiz: [
      {
        q: "Tangent line to \\(f(x)=\\ln x\\) at \\(a=1\\) is:",
        choices: ["\\(y = x-1\\)", "\\(y = x\\)", "\\(y = 1-x\\)", "\\(y = \\ln x\\)"],
        answerIndex: 0,
        explanation: "\\(f(1)=0, f'(1)=1\\), so \\(L(x) = x-1\\).",
      },
      {
        q: "Using linearization at \\(a=4\\) for \\(f(x)=\\sqrt x\\), estimate \\(\\sqrt{4.1}\\):",
        choices: ["2.025", "2.01", "2.1", "2.05"],
        answerIndex: 0,
        explanation: "\\(L(x) = 2 + (1/4)(x-4)\\); \\(L(4.1) = 2.025\\).",
      },
      {
        q: "If \\(f'' > 0\\), the tangent line approximation is:",
        choices: ["Exact", "An overestimate", "An underestimate", "Indeterminate"],
        answerIndex: 2,
        explanation: "Concave up means the curve lies above the tangent.",
      },
      {
        q: "Linearization works best when:",
        choices: ["\\(x\\) is far from \\(a\\).", "\\(x\\) is close to \\(a\\).", "\\(f\\) is constant.", "\\(f\\) is linear."],
        answerIndex: 1,
        explanation: "Approximation accuracy degrades with distance.",
      },
    ],
  },

  "4.7": {
    id: "4.7",
    title: "Using L'Hôpital's Rule for Determining Limits of Indeterminate Forms",
    summary:
      "For \\(0/0\\) or \\(\\infty/\\infty\\): \\(\\lim\\frac{f}{g} = \\lim\\frac{f'}{g'}\\) if the new limit exists.",
    lesson:
      "L'Hôpital's rule: if \\(\\lim_{x\\to a}f(x) = 0 = \\lim_{x\\to a}g(x)\\) (indeterminate 0/0) or both \\(\\pm\\infty\\), and the limit of \\(f'/g'\\) exists (or is \\(\\pm\\infty\\)), then $$\\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)}.$$\n\nKey conditions: (1) both functions differentiable near \\(a\\); (2) \\(g'(x) \\ne 0\\) near \\(a\\); (3) the limit form is indeterminate.\n\nExample: \\(\\lim_{x\\to 0}\\frac{\\sin x}{x}\\). Form is 0/0. Differentiate top and bottom separately: \\(\\cos x / 1 \\to 1\\).\n\nIterate if needed: \\(\\lim_{x\\to 0}\\frac{1-\\cos x}{x^2}\\). First L'Hôpital: \\(\\sin x / 2x\\), still 0/0. Apply again: \\(\\cos x / 2 \\to 1/2\\).\n\nOther indeterminate forms (convert first):\n- \\(0 \\cdot \\infty\\): rewrite as \\(0/(1/\\infty)\\).\n- \\(\\infty - \\infty\\): combine into a single fraction.\n- \\(0^0, 1^\\infty, \\infty^0\\): take \\(\\ln\\), apply L'Hôpital, exponentiate back.\n\nWARNING: do not differentiate using quotient rule. L'Hôpital differentiates numerator and denominator separately.",
    keyIdeas: [
      "L'Hôpital for \\(0/0\\) or \\(\\infty/\\infty\\) only.",
      "Differentiate top and bottom separately (not as a quotient).",
      "May iterate if still indeterminate.",
      "Other indeterminate forms need algebra first.",
    ],
    workedExample: {
      prompt: "Find \\(\\lim_{x\\to 0}\\frac{e^x - 1}{x}\\).",
      solution: "Form: 0/0. L'Hôpital: \\(\\lim e^x / 1 = e^0 = 1\\).",
    },
    flashcards: [
      { q: "When can you apply L'Hôpital?", a: "0/0 or \\(\\infty/\\infty\\)." },
      { q: "What do you differentiate?", a: "Numerator and denominator separately." },
      { q: "Still indeterminate?", a: "Apply L'Hôpital again." },
    ],
    commonMistakes: [
      "Using quotient rule instead of differentiating separately.",
      "Applying L'Hôpital to non-indeterminate forms.",
      "Not converting \\(0\\cdot\\infty\\) or \\(1^\\infty\\) before applying.",
    ],
    quiz: [
      {
        q: "\\(\\lim_{x\\to 0}\\frac{\\sin x}{x}\\) via L'Hôpital?",
        choices: ["0", "1", "DNE", "\\(\\infty\\)"],
        answerIndex: 1,
        explanation: "0/0; differentiate: \\(\\cos x / 1 \\to 1\\).",
      },
      {
        q: "L'Hôpital requires the form to be:",
        choices: ["Any limit form.", "0/0 or \\(\\infty/\\infty\\).", "5/0.", "\\(0\\cdot\\infty\\) only."],
        answerIndex: 1,
        explanation: "Only these two indeterminate forms qualify directly.",
      },
      {
        q: "\\(\\lim_{x\\to\\infty}\\frac{\\ln x}{x}\\)?",
        choices: ["\\(\\infty\\)", "0", "1", "\\(e\\)"],
        answerIndex: 1,
        explanation: "\\(\\infty/\\infty\\); L'Hôpital: \\(\\frac{1/x}{1} \\to 0\\).",
      },
      {
        q: "A student applies L'Hôpital to \\(\\lim_{x\\to 0}\\frac{x+2}{x+1}\\). What's wrong?",
        choices: ["Nothing.", "Original form 2/1 isn't indeterminate; actual limit is 2.", "Derivatives are wrong.", "Limit is \\(\\infty\\)."],
        answerIndex: 1,
        explanation: "Substituting gives 2/1 = 2. L'Hôpital shouldn't be applied here.",
      },
    ],
  },

  "5.1": {
    id: "5.1",
    title: "Using the Mean Value Theorem",
    summary:
      "If \\(f\\) is continuous on \\([a,b]\\) and differentiable on \\((a,b)\\), then some \\(c \\in (a,b)\\) has \\(f'(c) = \\frac{f(b)-f(a)}{b-a}\\).",
    lesson:
      "The Mean Value Theorem (MVT) says: on any interval where \\(f\\) is continuous on \\([a,b]\\) and differentiable on \\((a,b)\\), there's at least one point \\(c\\) inside where the instantaneous rate matches the average rate.\n\nFormally: \\(\\exists c \\in (a, b)\\) with $$f'(c) = \\frac{f(b) - f(a)}{b - a}.$$\n\nGeometrically: somewhere between \\(a\\) and \\(b\\), the tangent line is parallel to the secant line from \\((a, f(a))\\) to \\((b, f(b))\\).\n\nAP FRQ template: (1) verify \\(f\\) continuous on \\([a,b]\\) and differentiable on \\((a,b)\\); (2) compute average rate \\((f(b)-f(a))/(b-a)\\); (3) conclude by MVT there's a \\(c\\).\n\nRolle's Theorem is a special case: if additionally \\(f(a) = f(b)\\), then some \\(c\\) has \\(f'(c) = 0\\).\n\nUse cases: prove a function has horizontal tangent on an interval; bound \\(f(b) - f(a)\\) given bounds on \\(f'\\); demonstrate an instantaneous rate equals an average rate.",
    keyIdeas: [
      "Requires continuity on closed interval and differentiability on open interval.",
      "Guarantees \\(f'(c) = \\text{average rate of change}\\).",
      "Rolle's theorem = MVT with \\(f(a)=f(b)\\).",
      "Existence only — doesn't locate \\(c\\).",
    ],
    workedExample: {
      prompt: "Find \\(c\\) guaranteed by MVT for \\(f(x) = x^2\\) on \\([1, 3]\\).",
      solution: "Average rate: \\((9-1)/(3-1) = 4\\). \\(f'(x) = 2x\\). Set \\(2c = 4\\): \\(c = 2\\). Yes, \\(c = 2 \\in (1,3)\\).",
    },
    flashcards: [
      { q: "MVT conclusion?", a: "\\(\\exists c\\) with \\(f'(c) = (f(b)-f(a))/(b-a)\\)." },
      { q: "Hypotheses?", a: "Continuous on \\([a,b]\\), differentiable on \\((a,b)\\)." },
      { q: "Rolle's theorem?", a: "MVT with \\(f(a)=f(b)\\), conclusion \\(f'(c)=0\\)." },
    ],
    commonMistakes: [
      "Skipping the hypothesis check on FRQs.",
      "Applying MVT to functions with discontinuities or non-differentiable points.",
      "Claiming uniqueness of \\(c\\).",
    ],
    quiz: [
      {
        q: "MVT requires:",
        choices: ["Continuity on \\((a,b)\\).", "Differentiability at every point of \\([a,b]\\).", "Continuity on \\([a,b]\\) and differentiability on \\((a,b)\\).", "\\(f(a)=f(b)\\)."],
        answerIndex: 2,
        explanation: "Standard MVT hypotheses.",
      },
      {
        q: "For \\(f(x)=x^3\\) on \\([0,2]\\), \\(c\\) guaranteed by MVT?",
        choices: ["\\(2/\\sqrt{3}\\)", "\\(1\\)", "\\(\\sqrt{4/3}\\)", "Both A and C"],
        answerIndex: 3,
        explanation: "Average rate = 4; \\(3c^2 = 4 \\Rightarrow c = 2/\\sqrt 3 = \\sqrt{4/3}\\).",
      },
      {
        q: "Rolle's theorem is a special case of MVT when:",
        choices: ["\\(f'(c) = 0\\).", "\\(f(a) = f(b)\\).", "\\(f\\) is linear.", "\\(f'\\) is continuous."],
        answerIndex: 1,
        explanation: "Equal endpoints make the average rate zero.",
      },
      {
        q: "Does MVT apply to \\(f(x) = |x|\\) on \\([-1,1]\\)?",
        choices: ["Yes", "No — not differentiable at 0", "Yes, with \\(c=0\\)", "Only for \\(x>0\\)"],
        answerIndex: 1,
        explanation: "\\(|x|\\) has a corner at 0; not differentiable on \\((-1,1)\\).",
      },
    ],
  },

  "5.2": {
    id: "5.2",
    title: "Extreme Value Theorem, Global Versus Local Extrema, and Critical Points",
    summary:
      "Continuous on closed interval \\(\\Rightarrow\\) attains global max and min. Critical points are where \\(f'=0\\) or \\(f'\\) undefined.",
    lesson:
      "Extreme Value Theorem (EVT): if \\(f\\) is continuous on \\([a,b]\\), then \\(f\\) attains a global maximum and a global minimum on that interval — at least one each.\n\nLocal vs global extrema: A local max at \\(c\\) means \\(f(c) \\ge f(x)\\) for \\(x\\) near \\(c\\). Global (absolute) max means \\(f(c) \\ge f(x)\\) for all \\(x\\) in the domain. Globals live at either interior critical points or interval endpoints.\n\nCritical points: \\(c\\) is a critical point of \\(f\\) if \\(f'(c) = 0\\) or \\(f'(c)\\) doesn't exist, AND \\(c\\) is in the domain. Critical points are candidates for extrema; not every critical point is an extremum (e.g., \\(f(x) = x^3\\) has \\(f'(0) = 0\\) but no extremum there).\n\nStandard AP problem: find global extrema of \\(f\\) on \\([a,b]\\). Procedure: (1) find critical points in \\((a,b)\\); (2) evaluate \\(f\\) at each critical point and at both endpoints; (3) compare values; (4) largest = global max, smallest = global min. This is the Candidates Test (Unit 5.5).",
    keyIdeas: [
      "EVT needs continuity on a CLOSED interval.",
      "Critical point: \\(f'=0\\) or \\(f'\\) undefined, AND in domain.",
      "Local max/min: compared to nearby values.",
      "Global max/min: compared to all values in domain or interval.",
    ],
    workedExample: {
      prompt: "Find critical points of \\(f(x) = x^3 - 3x\\).",
      solution: "\\(f'(x) = 3x^2 - 3 = 3(x-1)(x+1)\\). Zero at \\(x = \\pm 1\\). \\(f'\\) is defined everywhere. Critical points: \\(x = -1, 1\\).",
    },
    flashcards: [
      { q: "EVT conclusion?", a: "Continuous on \\([a,b]\\) \\(\\Rightarrow\\) attains max and min." },
      { q: "Definition of critical point?", a: "\\(f'(c) = 0\\) or \\(f'(c)\\) DNE, with \\(c\\) in domain." },
      { q: "Does every critical point give an extremum?", a: "No — e.g. \\(f(x)=x^3\\) at 0." },
    ],
    commonMistakes: [
      "Calling a critical point automatically a max or min.",
      "Forgetting endpoints when finding global extrema.",
      "Applying EVT on an open interval.",
    ],
    quiz: [
      {
        q: "EVT requires:",
        choices: ["Differentiability on \\((a,b)\\).", "Continuity on \\([a,b]\\).", "Monotonicity.", "\\(f(a)=f(b)\\)."],
        answerIndex: 1,
        explanation: "Just continuity on a closed interval.",
      },
      {
        q: "Critical points of \\(f(x) = x^2 - 4x\\)?",
        choices: ["\\(x=0\\)", "\\(x=2\\)", "\\(x=4\\)", "\\(x=-2\\)"],
        answerIndex: 1,
        explanation: "\\(f'(x) = 2x - 4 = 0 \\Rightarrow x=2\\).",
      },
      {
        q: "Is \\(x=0\\) a critical point of \\(f(x)=|x|\\)?",
        choices: ["No", "Yes", "Only if \\(f\\) is differentiable.", "No — \\(f'\\) is 0 or 1."],
        answerIndex: 1,
        explanation: "\\(f'(0)\\) DNE — critical point.",
      },
      {
        q: "Global max of a continuous \\(f\\) on \\([a,b]\\) occurs at:",
        choices: ["Interior critical point.", "Endpoint.", "Either.", "\\(f'=0\\) only."],
        answerIndex: 2,
        explanation: "Either a critical point in the interior or an endpoint.",
      },
    ],
  },

  "5.3": {
    id: "5.3",
    title: "Determining Intervals on Which a Function Is Increasing or Decreasing",
    summary:
      "\\(f\\) increasing where \\(f' > 0\\); decreasing where \\(f' < 0\\). Sign analysis around critical points gives intervals.",
    lesson:
      "\\(f\\) is increasing on an interval \\(I\\) if \\(x_1 < x_2 \\in I \\Rightarrow f(x_1) < f(x_2)\\). \\(f\\) is decreasing with the opposite inequality.\n\nFirst derivative test for monotonicity: if \\(f'(x) > 0\\) on \\(I\\), \\(f\\) is increasing on \\(I\\); if \\(f'(x) < 0\\) on \\(I\\), \\(f\\) is decreasing. Proof via MVT.\n\nProcedure: (1) find critical points (where \\(f' = 0\\) or DNE); (2) they partition the domain into intervals; (3) test the sign of \\(f'\\) on each interval using a sample point; (4) state intervals of increase/decrease.\n\nExample: \\(f(x) = x^3 - 3x\\). \\(f'(x) = 3(x-1)(x+1)\\). Critical points at \\(\\pm 1\\). Test intervals:\n- \\(x = -2\\): \\(f'(-2) = 9 > 0\\). Increasing on \\((-\\infty, -1)\\).\n- \\(x = 0\\): \\(f'(0) = -3 < 0\\). Decreasing on \\((-1, 1)\\).\n- \\(x = 2\\): \\(f'(2) = 9 > 0\\). Increasing on \\((1, \\infty)\\).\n\nAP writeup: state where \\(f' > 0\\) with interval notation.",
    keyIdeas: [
      "\\(f' > 0 \\Rightarrow f\\) increasing; \\(f' < 0 \\Rightarrow f\\) decreasing.",
      "Critical points partition intervals.",
      "Sign test \\(f'\\) using one sample per interval.",
      "Endpoints included/excluded based on domain; often just open intervals.",
    ],
    workedExample: {
      prompt: "Find intervals of increase/decrease for \\(f(x) = x^3 - 6x^2 + 9x\\).",
      solution: "\\(f'(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3)\\). Critical points: 1, 3. Test: \\(f'(0) = 9 > 0\\), \\(f'(2) = -3 < 0\\), \\(f'(4) = 9 > 0\\). Increasing on \\((-\\infty, 1) \\cup (3, \\infty)\\), decreasing on \\((1, 3)\\).",
    },
    flashcards: [
      { q: "\\(f'(x) > 0\\) means?", a: "\\(f\\) is increasing there." },
      { q: "How to find increase/decrease intervals?", a: "Find critical points, test sign of \\(f'\\) between them." },
      { q: "Is \"non-decreasing\" same as \"increasing\"?", a: "Technically no — non-decreasing allows flat, strictly increasing does not." },
    ],
    commonMistakes: [
      "Forgetting points where \\(f'\\) DNE as critical points.",
      "Including endpoints where \\(f' = 0\\) in interior interval.",
      "Testing only once when multiple critical points divide the domain.",
    ],
    quiz: [
      {
        q: "If \\(f'(x) = x - 2\\), \\(f\\) is decreasing on:",
        choices: ["\\((-\\infty, 2)\\)", "\\((2, \\infty)\\)", "\\((0, 2)\\)", "All reals"],
        answerIndex: 0,
        explanation: "\\(f' < 0\\) for \\(x < 2\\).",
      },
      {
        q: "\\(f(x) = x^4\\) is:",
        choices: ["Increasing everywhere.", "Decreasing everywhere.", "Decreasing on \\((-\\infty,0)\\), increasing on \\((0,\\infty)\\).", "Constant."],
        answerIndex: 2,
        explanation: "\\(f'(x) = 4x^3\\); negative for \\(x<0\\), positive for \\(x>0\\).",
      },
      {
        q: "Critical point of \\(f\\) at \\(x=c\\); \\(f' > 0\\) on both sides. \\(f\\) at \\(c\\):",
        choices: ["Local max", "Local min", "Neither max nor min", "Inflection"],
        answerIndex: 2,
        explanation: "No sign change of \\(f'\\) — not an extremum.",
      },
      {
        q: "\\(f'(x) = -(x-1)(x+2)\\). Intervals of increase?",
        choices: ["\\((-\\infty, -2)\\) only", "\\((-2, 1)\\)", "\\((1, \\infty)\\)", "All reals"],
        answerIndex: 1,
        explanation: "\\(-(x-1)(x+2) > 0\\) when \\((x-1)(x+2) < 0\\), i.e., \\(-2 < x < 1\\).",
      },
    ],
  },

  "5.4": {
    id: "5.4",
    title: "Using the First Derivative Test to Determine Relative (Local) Extrema",
    summary:
      "At critical point \\(c\\): \\(f'\\) changes + to \\(-\\) = local max; \\(-\\) to + = local min; no sign change = neither.",
    lesson:
      "First Derivative Test: at a critical point \\(c\\),\n- \\(f'\\) changes from + to \\(-\\) as \\(x\\) passes through \\(c\\) \\(\\Rightarrow\\) local max at \\(c\\).\n- \\(f'\\) changes from \\(-\\) to + \\(\\Rightarrow\\) local min at \\(c\\).\n- No sign change \\(\\Rightarrow\\) neither (just a horizontal tangent or inflection).\n\nMechanics: (1) find critical points; (2) organize sign chart of \\(f'\\) across them; (3) classify each.\n\nExample: \\(f(x) = x^3 - 3x\\). Critical points at \\(\\pm 1\\). Sign chart: \\(f' > 0\\) on \\((-\\infty, -1)\\), \\(f' < 0\\) on \\((-1, 1)\\), \\(f' > 0\\) on \\((1, \\infty)\\). So: at \\(x=-1\\), \\(f'\\) changes + to \\(-\\), local max. At \\(x=1\\), \\(f'\\) changes \\(-\\) to +, local min.\n\nAP writeup on FRQ: \"At \\(x = c\\), \\(f'\\) changes from positive to negative, so \\(f\\) has a local maximum at \\(x = c\\).\" Full sentence with justification is required.",
    keyIdeas: [
      "Sign change of \\(f'\\) at critical point \\(c\\) determines extremum.",
      "+ to \\(-\\): local max. \\(-\\) to +: local min.",
      "No sign change: neither.",
      "FRQ requires full sentence justification.",
    ],
    workedExample: {
      prompt: "Classify critical points of \\(f(x) = x^4 - 4x^2\\).",
      solution: "\\(f'(x) = 4x^3 - 8x = 4x(x^2 - 2)\\). Critical points: \\(x = 0, \\pm\\sqrt 2\\). Test signs: \\(f'(-2) = -16 < 0\\), \\(f'(-1) = 4 > 0\\), \\(f'(1) = -4 < 0\\), \\(f'(2) = 16 > 0\\). At \\(x = -\\sqrt 2\\): \\(-\\) to +, local min. At \\(x = 0\\): + to \\(-\\), local max. At \\(x = \\sqrt 2\\): \\(-\\) to +, local min.",
    },
    flashcards: [
      { q: "+ to \\(-\\) sign change at \\(c\\)?", a: "Local max." },
      { q: "\\(-\\) to + sign change?", a: "Local min." },
      { q: "No sign change?", a: "Neither — just a flat spot or inflection." },
    ],
    commonMistakes: [
      "Skipping the sign chart.",
      "Claiming extremum without checking the sign change.",
      "Forgetting to include a full justification sentence on FRQs.",
    ],
    quiz: [
      {
        q: "At \\(x=c\\), \\(f'\\) changes from negative to positive. \\(f\\) has:",
        choices: ["Local max", "Local min", "Inflection", "Horizontal asymptote"],
        answerIndex: 1,
        explanation: "Decrease followed by increase = local min.",
      },
      {
        q: "\\(f'(x) = x^2\\) is nonnegative everywhere. At \\(x=0\\):",
        choices: ["Local max", "Local min", "Neither", "Both"],
        answerIndex: 2,
        explanation: "\\(f' \\ge 0\\); no sign change — neither max nor min.",
      },
      {
        q: "\\(f'(x) = -(x-2)^2\\). At \\(x=2\\):",
        choices: ["Local max", "Local min", "Neither", "Cannot determine"],
        answerIndex: 2,
        explanation: "\\(f' \\le 0\\) near 2; no sign change — neither.",
      },
      {
        q: "For classification via first-derivative test, you need:",
        choices: ["Only the value \\(f'(c)\\).", "The sign of \\(f'\\) on both sides of \\(c\\).", "Second derivative.", "Limit of \\(f\\)."],
        answerIndex: 1,
        explanation: "Signs on either side of \\(c\\) tell you whether it's a max/min.",
      },
    ],
  },

  "5.5": {
    id: "5.5",
    title: "Using the Candidates Test to Determine Absolute (Global) Extrema",
    summary:
      "On a closed interval, evaluate \\(f\\) at each critical point and each endpoint; largest is global max, smallest is global min.",
    lesson:
      "Candidates test for global (absolute) extrema on \\([a, b]\\) when \\(f\\) is continuous:\n\nStep 1: Find all critical points of \\(f\\) in \\((a, b)\\).\nStep 2: Evaluate \\(f\\) at each critical point.\nStep 3: Evaluate \\(f\\) at both endpoints \\(a\\) and \\(b\\).\nStep 4: Compare all values; largest is global max, smallest is global min.\n\nThis works because EVT guarantees extrema exist on a closed interval, and they must occur at critical points (interior) or endpoints.\n\nExample: \\(f(x) = x^3 - 3x\\) on \\([-2, 2]\\). \\(f'(x) = 3x^2 - 3\\); critical points at \\(\\pm 1\\). Candidates: \\(f(-2) = -2, f(-1) = 2, f(1) = -2, f(2) = 2\\). Global max = 2 (at \\(x = -1\\) and \\(x = 2\\)); global min = \\(-2\\) (at \\(x = -2\\) and \\(x = 1\\)).\n\nAP FRQ scoring: you must (1) identify critical points, (2) evaluate all candidates, (3) state which is max/min clearly.",
    keyIdeas: [
      "On \\([a,b]\\): check critical points + endpoints; largest/smallest wins.",
      "Only works if \\(f\\) continuous on closed interval.",
      "Same \\(f\\) value can occur at multiple candidates.",
      "State BOTH the extremum value and its \\(x\\)-location.",
    ],
    workedExample: {
      prompt: "Find the absolute max and min of \\(f(x) = x^2 - 4x + 1\\) on \\([0, 3]\\).",
      solution: "\\(f'(x) = 2x - 4 = 0 \\Rightarrow x = 2\\). Candidates: \\(f(0) = 1\\), \\(f(2) = -3\\), \\(f(3) = -2\\). Max = 1 at \\(x=0\\); min = \\(-3\\) at \\(x=2\\).",
    },
    flashcards: [
      { q: "Candidates test steps?", a: "Find critical points, evaluate \\(f\\) at them + endpoints, compare." },
      { q: "Needs what hypothesis?", a: "\\(f\\) continuous on closed interval." },
      { q: "Where can global extrema occur?", a: "At critical points or endpoints." },
    ],
    commonMistakes: [
      "Forgetting to evaluate at endpoints.",
      "Applying the test on an open interval (EVT not applicable).",
      "Stopping at critical points where the test calls for comparison with endpoints.",
    ],
    quiz: [
      {
        q: "\\(f(x) = x^3 - 3x\\) on \\([0, 2]\\). Global min?",
        choices: ["\\(f(0) = 0\\)", "\\(f(1) = -2\\)", "\\(f(2) = 2\\)", "\\(f(-1) = 2\\)"],
        answerIndex: 1,
        explanation: "Evaluate critical point \\(x=1\\) and endpoints: \\(f(0)=0, f(1)=-2, f(2)=2\\). Min = \\(-2\\).",
      },
      {
        q: "Candidates test needs:",
        choices: ["Differentiability on \\([a,b]\\).", "Continuity on \\([a,b]\\).", "\\(f(a)=f(b)\\).", "Monotonicity."],
        answerIndex: 1,
        explanation: "EVT — continuity suffices.",
      },
      {
        q: "On an OPEN interval, absolute extrema:",
        choices: ["Always exist.", "Exist iff \\(f\\) monotonic.", "May not exist.", "Only occur at endpoints."],
        answerIndex: 2,
        explanation: "EVT doesn't apply; \\(f\\) may not attain max/min on an open interval.",
      },
      {
        q: "\\(f(x) = \\sin x\\) on \\([0, \\pi]\\). Global max?",
        choices: ["\\(f(0) = 0\\)", "\\(f(\\pi/2) = 1\\)", "\\(f(\\pi) = 0\\)", "\\(f(\\pi/4) = \\sqrt{2}/2\\)"],
        answerIndex: 1,
        explanation: "\\(f'(x)=\\cos x = 0\\) at \\(\\pi/2\\); \\(f(\\pi/2)=1\\) is the largest.",
      },
    ],
  },

  "5.6": {
    id: "5.6",
    title: "Determining Concavity of Functions over Their Domains",
    summary:
      "\\(f'' > 0\\) means concave up (cup shape); \\(f'' < 0\\) means concave down (cap). Sign changes of \\(f''\\) are inflection points.",
    lesson:
      "Concavity describes curvature. \\(f\\) is concave up on an interval if the graph lies above its tangent lines (cup shape); concave down if below (cap shape).\n\nTest: \\(f''(x) > 0 \\Rightarrow f\\) concave up. \\(f''(x) < 0 \\Rightarrow\\) concave down.\n\nAn inflection point is a point where concavity changes — equivalently, where \\(f''\\) changes sign.\n\nProcedure: (1) compute \\(f''\\); (2) find where \\(f'' = 0\\) or DNE; (3) check if \\(f''\\) actually changes sign (not every zero is an inflection); (4) report intervals and inflection points.\n\nExample: \\(f(x) = x^4\\). \\(f''(x) = 12x^2 \\ge 0\\) always. Never changes sign; no inflection point (even though \\(f''(0) = 0\\)).\n\nExample: \\(f(x) = x^3\\). \\(f''(x) = 6x\\). Changes sign at 0 (negative for \\(x<0\\), positive for \\(x>0\\)). Inflection point at \\((0, 0)\\).\n\nConnection to \\(f'\\): \\(f' \\) increasing \\(\\Leftrightarrow f\\) concave up. So concavity is the \"acceleration\" of the function — whether its slope is getting steeper (up) or flatter.",
    keyIdeas: [
      "\\(f'' > 0\\): concave up; \\(f'' < 0\\): concave down.",
      "Inflection point = sign change of \\(f''\\).",
      "\\(f''(c) = 0\\) alone doesn't guarantee inflection (need sign change).",
      "Equivalent: \\(f'\\) is increasing \\(\\Leftrightarrow f\\) is concave up.",
    ],
    workedExample: {
      prompt: "Determine concavity intervals for \\(f(x) = x^3 - 3x^2\\).",
      solution: "\\(f'(x) = 3x^2 - 6x\\), \\(f''(x) = 6x - 6\\). \\(f'' = 0\\) at \\(x = 1\\). For \\(x < 1\\), \\(f'' < 0\\) (concave down); for \\(x > 1\\), \\(f'' > 0\\) (concave up). Inflection at \\(x=1\\).",
    },
    flashcards: [
      { q: "Concave up means what about \\(f''\\)?", a: "\\(f'' > 0\\)." },
      { q: "Inflection point criterion?", a: "\\(f''\\) changes sign." },
      { q: "Does \\(f''(c) = 0\\) guarantee inflection?", a: "No — need sign change." },
    ],
    commonMistakes: [
      "Calling every zero of \\(f''\\) an inflection point.",
      "Mixing up concave up (\\(f'' > 0\\)) with increasing (\\(f' > 0\\)).",
      "Omitting the inflection analysis when asked.",
    ],
    quiz: [
      {
        q: "\\(f''(x) = 6x - 12\\). \\(f\\) is concave up on:",
        choices: ["\\((-\\infty, 2)\\)", "\\((2, \\infty)\\)", "All reals", "\\((0, \\infty)\\)"],
        answerIndex: 1,
        explanation: "\\(6x - 12 > 0\\) for \\(x > 2\\).",
      },
      {
        q: "\\(f(x) = x^4\\) has inflection point at:",
        choices: ["\\(x=0\\)", "\\(x = 1\\)", "Nowhere", "\\(x=-1\\)"],
        answerIndex: 2,
        explanation: "\\(f''=12x^2 \\ge 0\\); no sign change.",
      },
      {
        q: "If \\(f''(c) = 0\\):",
        choices: ["\\(c\\) is definitely an inflection point.", "\\(c\\) is never an inflection.", "\\(c\\) might be an inflection (check sign change).", "\\(c\\) is a local max."],
        answerIndex: 2,
        explanation: "Zero of \\(f''\\) is a candidate; must verify sign change.",
      },
      {
        q: "\\(f\\) concave down on an interval means:",
        choices: ["\\(f\\) decreasing.", "\\(f' \\) decreasing.", "\\(f > 0\\).", "\\(f'' > 0\\)."],
        answerIndex: 1,
        explanation: "Concave down \\(\\Leftrightarrow f''<0\\Leftrightarrow f'\\) decreasing.",
      },
    ],
  },

  "5.7": {
    id: "5.7",
    title: "Using the Second Derivative Test to Determine Extrema",
    summary:
      "At critical point \\(c\\): \\(f''(c) > 0\\) = local min; \\(f''(c) < 0\\) = local max; \\(f''(c) = 0\\) = inconclusive.",
    lesson:
      "Second Derivative Test: if \\(f'(c) = 0\\) and \\(f''(c)\\) exists, then\n- \\(f''(c) > 0 \\Rightarrow f\\) has a local MIN at \\(c\\) (concave up at a horizontal tangent).\n- \\(f''(c) < 0 \\Rightarrow f\\) has a local MAX at \\(c\\) (concave down at a horizontal tangent).\n- \\(f''(c) = 0 \\Rightarrow\\) test fails; use first-derivative test instead.\n\nWhy it works: concave up at a flat spot = bowl, so the flat spot is a minimum. Concave down at a flat spot = arch, so the flat spot is a maximum.\n\nPros: quick once you have \\(f''\\). Cons: silent when \\(f''(c) = 0\\); requires \\(f''\\) to exist.\n\nExample: \\(f(x) = x^3 - 3x\\). \\(f'(x) = 3x^2 - 3\\); critical points \\(\\pm 1\\). \\(f''(x) = 6x\\). \\(f''(-1) = -6 < 0\\) \\(\\Rightarrow\\) local max at \\(x = -1\\). \\(f''(1) = 6 > 0\\) \\(\\Rightarrow\\) local min at \\(x = 1\\).\n\nExample where test fails: \\(f(x) = x^4\\). \\(f'(0) = 0\\), \\(f''(0) = 0\\) — test inconclusive. Use first-derivative test: \\(f'\\) negative left, positive right \\(\\Rightarrow\\) local min.",
    keyIdeas: [
      "\\(f''(c) > 0\\) + \\(f'(c) = 0\\): local min.",
      "\\(f''(c) < 0\\) + \\(f'(c) = 0\\): local max.",
      "\\(f''(c) = 0\\): test inconclusive.",
      "Falls back to first-derivative test when needed.",
    ],
    workedExample: {
      prompt: "Use second derivative test on \\(f(x) = -x^2 + 6x\\).",
      solution: "\\(f' = -2x + 6 = 0 \\Rightarrow x = 3\\). \\(f'' = -2 < 0\\). Local max at \\(x = 3\\); \\(f(3) = 9\\).",
    },
    flashcards: [
      { q: "Second derivative test condition for local max?", a: "\\(f'(c)=0\\) and \\(f''(c)<0\\)." },
      { q: "When does the second derivative test fail?", a: "When \\(f''(c)=0\\)." },
      { q: "Fallback when second derivative test fails?", a: "First derivative test." },
    ],
    commonMistakes: [
      "Skipping the \\(f'(c) = 0\\) check.",
      "Concluding from \\(f''(c) = 0\\) — test is inconclusive.",
      "Swapping max/min with sign of \\(f''\\).",
    ],
    quiz: [
      {
        q: "\\(f'(c) = 0\\) and \\(f''(c) = -3\\). At \\(c\\):",
        choices: ["Local min", "Local max", "Inflection", "Neither"],
        answerIndex: 1,
        explanation: "Negative \\(f''\\) at critical point = local max.",
      },
      {
        q: "\\(f'(2) = 0\\) and \\(f''(2) = 0\\). Conclusion?",
        choices: ["Local max", "Local min", "Test is inconclusive; use first-derivative test.", "Inflection point"],
        answerIndex: 2,
        explanation: "Zero second derivative = test fails.",
      },
      {
        q: "For \\(f(x) = x^3 - 6x^2\\), \\(x=0\\) is:",
        choices: ["Local max", "Local min", "Inflection", "Not a critical point"],
        answerIndex: 0,
        explanation: "\\(f'(0) = 0\\); \\(f''(0) = -12 < 0\\) \\(\\Rightarrow\\) local max.",
      },
      {
        q: "Second derivative test works because:",
        choices: ["It requires continuity.", "Concave up at flat spot means bowl shape = min.", "It replaces MVT.", "It gives global extrema."],
        answerIndex: 1,
        explanation: "Geometric intuition: cup at flat spot = min; cap at flat spot = max.",
      },
    ],
  },

  "5.8": {
    id: "5.8",
    title: "Sketching Graphs of Functions and Their Derivatives",
    summary:
      "Use \\(f'\\) for slope info, \\(f''\\) for concavity; work back and forth between \\(f\\), \\(f'\\), \\(f''\\) graphs.",
    lesson:
      "Relationships you should recognize at a glance:\n- \\(f\\) increasing \\(\\Leftrightarrow f' > 0 \\Leftrightarrow\\) \\(f'\\) graph above x-axis.\n- \\(f\\) concave up \\(\\Leftrightarrow f'' > 0 \\Leftrightarrow f'\\) increasing.\n- Local max of \\(f \\Leftrightarrow f'\\) crosses x-axis from + to \\(-\\).\n- Inflection point of \\(f \\Leftrightarrow f'\\) has a local max or min.\n\nGiven a graph of \\(f'\\), you can sketch \\(f\\): where \\(f' > 0\\), \\(f\\) rises; zeros of \\(f'\\) are candidates for \\(f\\)'s extrema; sign changes classify.\n\nGiven a graph of \\(f\\), you can sketch \\(f'\\): slope of \\(f\\) at each \\(x\\) is the height of \\(f'\\) at that \\(x\\). Horizontal tangent \\(\\to\\) \\(f' = 0\\). Steep increase \\(\\to\\) \\(f'\\) large and positive.\n\nAP trap: given \\(f'\\), do not mistake a local extremum of \\(f'\\) for an extremum of \\(f\\) — that's an inflection of \\(f\\), not an extremum. Students constantly confuse which graph they're reading.\n\nFRQ template: identify intervals of increase/decrease, inflection points, local extrema, and concavity. Annotate on the given graph before answering.",
    keyIdeas: [
      "\\(f'\\) graph tells you where \\(f\\) rises/falls.",
      "\\(f''\\) tells concavity (also = whether \\(f'\\) rises/falls).",
      "Zeros of \\(f'\\) = candidates for extrema of \\(f\\).",
      "Extrema of \\(f'\\) = inflection points of \\(f\\).",
    ],
    workedExample: {
      prompt: "Graph of \\(f'\\) shows \\(f' > 0\\) on \\((-\\infty, 2)\\), \\(f' < 0\\) on \\((2, 5)\\), \\(f' > 0\\) on \\((5, \\infty)\\). Describe \\(f\\).",
      solution: "\\(f\\) increasing on \\((-\\infty, 2)\\), decreasing on \\((2, 5)\\), increasing on \\((5, \\infty)\\). Local max at \\(x = 2\\); local min at \\(x = 5\\).",
    },
    flashcards: [
      { q: "From \\(f'\\) graph, how to find \\(f\\)'s local max?", a: "Where \\(f'\\) crosses x-axis from + to \\(-\\)." },
      { q: "Inflection of \\(f\\) = ?", a: "Where \\(f'\\) has a local max or min (or \\(f''\\) changes sign)." },
      { q: "If \\(f''\\) is positive, \\(f'\\) is?", a: "Increasing." },
    ],
    commonMistakes: [
      "Reading \\(f'\\) as \\(f\\).",
      "Confusing extrema of \\(f'\\) with extrema of \\(f\\).",
      "Misreading concavity as direction of change.",
    ],
    quiz: [
      {
        q: "The graph of \\(f'\\) is positive everywhere. \\(f\\) is:",
        choices: ["Constant", "Always increasing", "Always decreasing", "Concave up"],
        answerIndex: 1,
        explanation: "Positive \\(f'\\) \\(\\Rightarrow\\) \\(f\\) increasing.",
      },
      {
        q: "\\(f'\\) has a local min at \\(x=3\\). Then \\(f\\) has:",
        choices: ["A local max at 3.", "A local min at 3.", "An inflection point at 3.", "A discontinuity."],
        answerIndex: 2,
        explanation: "Local extremum of \\(f'\\) = inflection of \\(f\\).",
      },
      {
        q: "Given graph of \\(f\\) with horizontal tangent at \\(x=0\\), \\(f'(0)\\)=",
        choices: ["0", "1", "\\(\\infty\\)", "DNE"],
        answerIndex: 0,
        explanation: "Horizontal tangent = slope 0.",
      },
      {
        q: "If \\(f'\\) crosses the x-axis from - to + at \\(x=c\\), then \\(f\\) has:",
        choices: ["Local max at \\(c\\).", "Local min at \\(c\\).", "Inflection.", "Discontinuity."],
        answerIndex: 1,
        explanation: "First-derivative test: - to + = local min.",
      },
    ],
    diagram: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
      ${AXIS}
      <path d="M30 170 Q100 60 200 120 Q300 180 370 70" fill="none" stroke="#c2410c" stroke-width="2.4" />
      <circle cx="100" cy="70" r="3" fill="#c2410c" />
      <text x="105" y="65" font-family="ui-sans-serif" font-size="10" fill="#6b6b6b">max</text>
      <circle cx="300" cy="175" r="3" fill="#c2410c" />
      <text x="305" y="190" font-family="ui-sans-serif" font-size="10" fill="#6b6b6b">min</text>
    </svg>`,
  },

  "5.9": {
    id: "5.9",
    title: "Connecting a Function, Its First Derivative, and Its Second Derivative",
    summary:
      "Master the dictionary: increasing/decreasing from \\(f'\\), concavity/inflection from \\(f''\\), extrema from sign changes.",
    lesson:
      "This is the synthesis topic. The key facts to have on instant recall:\n\nFrom \\(f'\\) (sign):\n- \\(f' > 0\\): \\(f\\) increasing.\n- \\(f' < 0\\): \\(f\\) decreasing.\n- \\(f' = 0\\) or DNE at critical points.\n\nFrom \\(f''\\) (sign):\n- \\(f'' > 0\\): \\(f\\) concave up (equivalently, \\(f'\\) increasing).\n- \\(f'' < 0\\): \\(f\\) concave down (\\(f'\\) decreasing).\n- Sign change of \\(f''\\) at \\(c\\): inflection point.\n\nFrom \\(f'\\) (shape):\n- Extrema of \\(f'\\) = inflection points of \\(f\\).\n- Zeros of \\(f'\\) = candidates for extrema of \\(f\\).\n\nAP commonly tests the backward direction: given a graph of \\(f'\\), describe \\(f\\). Or: given a table of \\(f\\), estimate where inflection points might be.\n\nAlso look for: \\(f'\\) and \\(f''\\) can provide a complete picture of \\(f\\). A typical question: sketch \\(f\\) given \\(f'\\) with specific zeros and sign pattern, plus \\(f(0)\\). Integrate the information: pin the height at one anchor, then use \\(f'\\) signs to shape the rest.",
    keyIdeas: [
      "Signs of \\(f'\\) decode increase/decrease.",
      "Signs of \\(f''\\) decode concavity.",
      "Zeros of \\(f'\\) are extrema candidates; sign changes classify.",
      "Zeros of \\(f''\\) with sign changes are inflection points.",
    ],
    workedExample: {
      prompt: "\\(f'(x) > 0\\) on \\((0, 3)\\), \\(f''(x) < 0\\) on \\((0, 3)\\). Describe \\(f\\) there.",
      solution: "\\(f\\) is increasing and concave down on \\((0, 3)\\). Slopes are positive but getting smaller (arches up toward a max).",
    },
    flashcards: [
      { q: "Increasing + concave down means?", a: "Slope positive but decreasing." },
      { q: "Decreasing + concave up?", a: "Slope negative but increasing (approaching a min)." },
      { q: "Where does \\(f'\\) have local extrema in terms of \\(f\\)?", a: "Inflection points." },
    ],
    commonMistakes: [
      "Confusing \\(f'\\) zero with \\(f\\) zero.",
      "Reading \\(f''\\) as \\(f\\) or \\(f'\\).",
      "Missing the combined meaning (e.g. increasing + concave down).",
    ],
    quiz: [
      {
        q: "\\(f'(c) = 0\\) and \\(f''(c) > 0\\). \\(f\\) at \\(c\\) has:",
        choices: ["Local max", "Local min", "Inflection", "Asymptote"],
        answerIndex: 1,
        explanation: "Second derivative test: positive = local min.",
      },
      {
        q: "\\(f''(c) = 0\\) but \\(f''\\) doesn't change sign there. Then \\(c\\) is:",
        choices: ["Inflection", "Not an inflection (no concavity change)", "Always a max", "Always a min"],
        answerIndex: 1,
        explanation: "No sign change = no concavity change = no inflection.",
      },
      {
        q: "Given \\(f\\) is decreasing and concave up on \\((1, 4)\\):",
        choices: ["\\(f' > 0\\), \\(f'' > 0\\)", "\\(f' < 0\\), \\(f'' > 0\\)", "\\(f' < 0\\), \\(f'' < 0\\)", "\\(f' > 0\\), \\(f'' < 0\\)"],
        answerIndex: 1,
        explanation: "Decreasing: \\(f'<0\\); concave up: \\(f''>0\\).",
      },
      {
        q: "If \\(f'\\) changes from + to - at \\(c\\), and \\(f''\\) is negative at \\(c\\):",
        choices: ["Consistent with local max.", "Contradicts a local max.", "Means \\(f''(c) = 0\\).", "Means an inflection."],
        answerIndex: 0,
        explanation: "+ to - = local max; concave down there is consistent.",
      },
    ],
  },

  "5.10": {
    id: "5.10",
    title: "Introduction to Optimization Problems",
    summary:
      "Set up an objective function in one variable using the constraint; find critical points; use tests to pick the extremum.",
    lesson:
      "Optimization problems have a structure:\n1. Identify the quantity you want to optimize (the objective).\n2. Identify the constraint linking the variables.\n3. Use the constraint to reduce the objective to a single variable.\n4. Find critical points.\n5. Use first- or second-derivative test (or candidates test) to identify max/min.\n6. Confirm it's a max or min; answer the question.\n\nExample: maximize area of a rectangle with fixed perimeter 40. Let width \\(w\\), length \\(l\\). Perimeter: \\(2w + 2l = 40 \\Rightarrow l = 20 - w\\). Area: \\(A = w(20 - w) = 20w - w^2\\). \\(A'(w) = 20 - 2w = 0 \\Rightarrow w = 10\\). \\(A''(w) = -2 < 0\\), so max. Answer: square 10 x 10, area 100.\n\nUnits and physical meaning: state your answer in a full sentence with units. \"The maximum area is 100 square units, achieved when the rectangle is 10 by 10.\"\n\nConstraints can be geometric (perimeter, volume, distance), physical (total budget), or temporal (time limit). Identifying the right objective and constraint is usually half the work.",
    keyIdeas: [
      "Reduce objective to one variable using constraint.",
      "Find critical points, then classify.",
      "Sanity-check: max or min? Look at units, physical setup.",
      "Always state full answer with units.",
    ],
    workedExample: {
      prompt: "Maximize \\(xy\\) subject to \\(x + y = 10\\) with \\(x, y \\ge 0\\).",
      solution: "\\(y = 10 - x\\). \\(f(x) = x(10 - x) = 10x - x^2\\). \\(f'(x) = 10 - 2x = 0 \\Rightarrow x = 5\\). \\(f''(x) = -2 < 0\\), max. \\(x = y = 5\\), product = 25.",
    },
    flashcards: [
      { q: "Steps for optimization?", a: "Objective, constraint, reduce to 1 variable, find critical points, classify." },
      { q: "Why use the constraint first?", a: "To reduce the problem to one-variable calculus." },
      { q: "How to confirm max vs min?", a: "Second derivative test or endpoint comparison." },
    ],
    commonMistakes: [
      "Forgetting the constraint and using two variables.",
      "Not verifying max vs min.",
      "Omitting units or context in the final answer.",
    ],
    quiz: [
      {
        q: "First step in optimization?",
        choices: ["Take the derivative.", "Identify the objective function.", "Plug in values.", "Apply L'Hôpital."],
        answerIndex: 1,
        explanation: "You can't differentiate without a function.",
      },
      {
        q: "Rectangle perimeter 20. Max area?",
        choices: ["25", "20", "100", "50"],
        answerIndex: 0,
        explanation: "Square of side 5; area 25.",
      },
      {
        q: "Sum of two positive numbers is 12. Minimize sum of their squares?",
        choices: ["72", "36", "144", "0"],
        answerIndex: 0,
        explanation: "\\(f(x) = x^2 + (12-x)^2\\); \\(f'(x) = 4x - 24 = 0 \\Rightarrow x = 6\\). \\(f(6) = 36 + 36 = 72\\).",
      },
      {
        q: "Why classify (max vs min) after finding critical points?",
        choices: ["Formality.", "Critical points can be either max, min, or neither.", "To use the product rule.", "No reason."],
        answerIndex: 1,
        explanation: "Not every critical point is the one you want.",
      },
    ],
  },

  "5.11": {
    id: "5.11",
    title: "Solving Optimization Problems",
    summary:
      "Apply the optimization pipeline to standard geometry, volume, and distance setups — box volumes, open-top containers, minimum-distance points.",
    lesson:
      "Standard AP optimization setups:\n\n1. Open-top box from square sheet: cut squares of side \\(x\\) from corners of an \\(L \\times L\\) sheet, fold up. Volume \\(V(x) = x(L - 2x)^2\\). Differentiate, solve \\(V'(x) = 0\\). Pick the \\(x\\) in the valid range.\n\n2. Minimize distance from a point to a curve: minimize \\(D^2 = (x - a)^2 + (f(x) - b)^2\\). Differentiate \\(D^2\\), set = 0. Why \\(D^2\\) not \\(D\\)? Same critical points, cleaner algebra.\n\n3. Maximum area enclosed given fencing: e.g. fence three sides of a rectangle next to a river. Express area in one variable using fencing constraint.\n\n4. Revenue or cost: given price-quantity relation, maximize revenue \\(R = p \\cdot q\\), often reducing to a quadratic.\n\n5. Tin can: minimize surface area subject to fixed volume. Volume constraint \\(\\pi r^2 h = V\\) lets you write \\(h = V/(\\pi r^2)\\); surface = \\(2\\pi r^2 + 2\\pi r h = 2\\pi r^2 + 2V/r\\). Minimize over \\(r\\).\n\nOn any AP FRQ, always state the domain of the variable explicitly (e.g., \\(0 < x < L/2\\)), then use candidates test if endpoints are reachable.",
    keyIdeas: [
      "Know the 5-6 standard shapes cold: box, can, fence, distance.",
      "Minimize \\(D^2\\) instead of \\(D\\) when dealing with distances.",
      "Always state the domain of your variable.",
      "Use second derivative test or candidates test to confirm min/max.",
    ],
    workedExample: {
      prompt: "A 12 in x 12 in piece of cardboard has squares of side \\(x\\) cut from each corner, folded into an open box. Maximize volume.",
      solution: "Volume: \\(V(x) = x(12 - 2x)^2\\), valid on \\(0 < x < 6\\). \\(V'(x) = (12-2x)^2 + x \\cdot 2(12-2x)(-2) = (12-2x)[(12-2x) - 4x] = (12-2x)(12-6x)\\). Zero at \\(x = 6\\) (boundary) or \\(x = 2\\). Check \\(V''\\) or use first-derivative test: max at \\(x = 2\\). Volume = \\(2(8)^2 = 128\\) in\\(^3\\).",
    },
    flashcards: [
      { q: "Standard setup: open-top box from square sheet?", a: "Cut corners of side \\(x\\); \\(V = x(L-2x)^2\\)." },
      { q: "Minimize distance trick?", a: "Minimize \\(D^2\\) instead of \\(D\\)." },
      { q: "Tin can: what variables?", a: "\\(r\\) and \\(h\\); use volume constraint to eliminate one." },
    ],
    commonMistakes: [
      "Forgetting the domain (e.g., \\(x < L/2\\) in box problem).",
      "Failing to confirm max vs min.",
      "Differentiating \\(D\\) instead of \\(D^2\\) (messier algebra).",
    ],
    quiz: [
      {
        q: "Open-top box from \\(10\\times 10\\) sheet, cut squares of side \\(x\\). Volume?",
        choices: ["\\(x(10-x)^2\\)", "\\(x(10-2x)^2\\)", "\\((10-2x)^2\\)", "\\(10x(10-x)\\)"],
        answerIndex: 1,
        explanation: "Cut \\(x\\) from each side; base is \\((10-2x)\\times(10-2x)\\), height \\(x\\).",
      },
      {
        q: "Fence three sides of rectangle (fourth is river), 100 ft available. Max area?",
        choices: ["625 sq ft", "1250 sq ft", "100 sq ft", "2500 sq ft"],
        answerIndex: 1,
        explanation: "Constraint: \\(2y + x = 100 \\Rightarrow x = 100 - 2y\\); \\(A(y) = (100-2y)y\\); max at \\(y = 25\\): \\(A = 50 \\cdot 25 = 1250\\).",
      },
      {
        q: "Cylinder with fixed volume; minimize surface area. You get:",
        choices: ["Tall and thin.", "Short and fat.", "\\(h = r\\).", "\\(h = 2r\\)."],
        answerIndex: 3,
        explanation: "Optimum cylinder has \\(h = 2r\\) (diameter = height).",
      },
      {
        q: "Why minimize \\(D^2\\) instead of \\(D\\)?",
        choices: ["They have different minima.", "Derivative of \\(D^2\\) is cleaner; same critical points.", "It's required.", "They give different answers."],
        answerIndex: 1,
        explanation: "Same minimizer; simpler algebra.",
      },
    ],
  },

  "5.12": {
    id: "5.12",
    title: "Exploring Behaviors of Implicit Relations",
    summary:
      "For implicit curves, find horizontal tangents where \\(dy/dx = 0\\), vertical tangents where denominator of \\(dy/dx\\) is 0, and use implicit differentiation.",
    lesson:
      "When a curve is defined implicitly by \\(F(x, y) = 0\\), you explore its geometry through \\(dy/dx\\) from implicit differentiation.\n\nHorizontal tangents: set \\(dy/dx = 0\\) and solve with the original equation. Example: \\(x^2 + y^2 = 25\\), \\(dy/dx = -x/y\\). Zero when \\(x = 0\\) (and \\(y \\ne 0\\)); points \\((0, \\pm 5)\\).\n\nVertical tangents: where \\(dy/dx\\) has zero denominator but nonzero numerator. Same circle: vertical tangent where \\(y = 0\\), i.e. \\((\\pm 5, 0)\\).\n\nSecond derivative \\(d^2y/dx^2\\) in implicit form: differentiate \\(dy/dx\\) implicitly, then substitute. Used to classify concavity or determine extrema of the curve's \\(y\\)-values.\n\nAP applications: find tangent lines at specific points on implicitly defined curves; verify a point is on the curve; compute slopes at given coordinates.\n\nFor implicit curves, the tangent line at \\((x_0, y_0)\\) is \\(y - y_0 = m(x - x_0)\\) where \\(m = dy/dx\\) evaluated at \\((x_0, y_0)\\).",
    keyIdeas: [
      "Horizontal tangent: \\(dy/dx = 0\\).",
      "Vertical tangent: denominator of \\(dy/dx\\) = 0 with numerator \\(\\ne 0\\).",
      "Second derivative: differentiate \\(y'\\) implicitly, substitute.",
      "Always check point is on the curve before plugging.",
    ],
    workedExample: {
      prompt: "Find horizontal tangents to \\(y^2 = x^3 - 3x + 2\\).",
      solution: "Differentiate: \\(2y y' = 3x^2 - 3\\); \\(y' = (3x^2 - 3)/(2y)\\). Horizontal: numerator = 0 (with \\(y \\ne 0\\)): \\(3x^2 - 3 = 0 \\Rightarrow x = \\pm 1\\). Check \\(y^2\\) values: at \\(x=1\\), \\(y^2 = 0\\) (excluded); at \\(x=-1\\), \\(y^2 = 4\\), so \\(y = \\pm 2\\). Horizontal tangents at \\((-1, \\pm 2)\\).",
    },
    flashcards: [
      { q: "Where are horizontal tangents?", a: "Where \\(dy/dx\\) numerator = 0." },
      { q: "Where are vertical tangents?", a: "Where denominator = 0, numerator \\(\\ne 0\\)." },
      { q: "How to verify a point on an implicit curve?", a: "Plug \\((x_0, y_0)\\) into the implicit equation." },
    ],
    commonMistakes: [
      "Forgetting to require the point satisfies the curve equation.",
      "Labeling a point as a vertical tangent when both numerator and denominator are zero (indeterminate).",
      "Skipping the second implicit differentiation for \\(y''\\).",
    ],
    quiz: [
      {
        q: "\\(x^2 + y^2 = 25\\). Horizontal tangents?",
        choices: ["\\((5, 0)\\) and \\((-5, 0)\\)", "\\((0, 5)\\) and \\((0, -5)\\)", "Only at origin", "None"],
        answerIndex: 1,
        explanation: "\\(y' = -x/y = 0 \\Rightarrow x = 0 \\Rightarrow y = \\pm 5\\).",
      },
      {
        q: "Vertical tangent on the circle \\(x^2 + y^2 = 4\\)?",
        choices: ["\\((0, \\pm 2)\\)", "\\((\\pm 2, 0)\\)", "\\((\\pm 1, \\pm\\sqrt 3)\\)", "None"],
        answerIndex: 1,
        explanation: "Denominator \\(y = 0\\) gives \\(x = \\pm 2\\).",
      },
      {
        q: "For implicit \\(y'\\), you:",
        choices: ["Solve for \\(y\\) first.", "Differentiate both sides, apply chain rule on \\(y\\) terms.", "Use inverse function derivative.", "Apply L'Hôpital."],
        answerIndex: 1,
        explanation: "Implicit differentiation.",
      },
      {
        q: "If both numerator and denominator of \\(y'\\) are zero at a point:",
        choices: ["Vertical tangent.", "Horizontal tangent.", "Indeterminate — could be a cusp or crossing; more analysis needed.", "Not on the curve."],
        answerIndex: 2,
        explanation: "0/0 case needs additional methods (limits, parametric).",
      },
    ],
  },
};

