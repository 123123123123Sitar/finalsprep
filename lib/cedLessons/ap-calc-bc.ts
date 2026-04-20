import type { CourseCedLessons } from "./types";

/**
 * AP Calculus BC CED lessons — every topic from Units 1-10 of the 2024-25 CED.
 * Units 1-8 share content with Calc AB; Units 9-10 (parametrics/polar/vectors
 * and series) are BC-only. Each lesson uses inline LaTeX via \\(...\\) so the
 * client MathRender pipeline picks it up. Tone: direct, procedural, and tuned
 * to how the AP graders actually read FRQs.
 */

export const AP_CALC_BC_CED_LESSONS: CourseCedLessons = {
  // =========================================================================
  // UNIT 1 — LIMITS AND CONTINUITY
  // =========================================================================
  "1.1": {
    id: "1.1",
    title: "Introducing Calculus: Can Change Occur at an Instant?",
    summary:
      "Calculus formalizes the idea that a quantity can have a rate of change at a single instant, not just over an interval.",
    lesson:
      "Algebra handles average rates of change: slope between two points. The problem is that a speedometer reads 60 mph at an instant — not over an interval. How can something have a rate of change at a single point? Calculus answers by zooming: take the average rate of change over an interval \\([a, a+h]\\), then let \\(h \\to 0\\). The limit of those average rates is the instantaneous rate of change.\n\nThis unit is about the limit machinery that makes that idea rigorous. Everything after — derivatives, integrals, series — is built on the limit. Don't think of limits as a \"plug-in x\" exercise; think of them as a controlled way to describe what a function is approaching, regardless of what it does at the target point.\n\nThe AP exam tests this conceptually on MC and FRQ. Expect questions like \"explain why the instantaneous velocity at \\(t = 2\\) can be approximated by \\((s(2.01) - s(2))/0.01\\).\" The answer is: that expression is an average rate of change; as the interval shrinks, it converges to the derivative.",
    keyIdeas: [
      "Instantaneous rate of change = limit of average rates of change.",
      "Average rate over \\([a, a+h]\\) is \\((f(a+h)-f(a))/h\\).",
      "Every topic that follows (derivatives, integrals) rests on the limit.",
      "Limits describe what \\(f\\) is approaching, not necessarily what \\(f\\) equals at the point.",
    ],
    workedExample: {
      prompt:
        "A particle's position is \\(s(t) = t^2\\). Estimate the instantaneous velocity at \\(t = 3\\) using \\(h = 0.01\\).",
      solution:
        "Average velocity over \\([3, 3.01]\\) is \\((s(3.01)-s(3))/0.01 = (9.0601 - 9)/0.01 = 6.01\\). The exact instantaneous velocity is \\(s'(3) = 2(3) = 6\\), so the small-\\(h\\) estimate is very close.",
    },
    commonMistakes: [
      "Treating \\(h = 0\\) as a legal substitution — the whole point is that you can't divide by zero, so you take a limit.",
      "Confusing average rate of change with instantaneous rate.",
      "Forgetting that the limit may exist even when the function is undefined at the point.",
    ],
  },
  "1.2": {
    id: "1.2",
    title: "Defining Limits and Using Limit Notation",
    summary:
      "\\(\\lim_{x \\to a} f(x) = L\\) means \\(f(x)\\) gets arbitrarily close to \\(L\\) as \\(x\\) gets close to \\(a\\) from both sides.",
    lesson:
      "A limit describes behavior near a point. Write \\(\\lim_{x \\to a} f(x) = L\\) to say that \\(f(x)\\) is forced as close to \\(L\\) as you want by taking \\(x\\) close enough to \\(a\\). One-sided limits \\(\\lim_{x \\to a^-}\\) and \\(\\lim_{x \\to a^+}\\) only require approach from one side. The two-sided limit exists if and only if both one-sided limits exist and are equal.\n\nNotation matters on the AP exam. Write \\(\\lim_{x \\to 2} f(x)\\), not \"lim f(2)\" or just \"f(2)\". When grading FRQs, readers will not give credit for informal phrasing — they want the limit symbol with the variable under it.\n\nFunctions with holes, jumps, or asymptotes let us see why the limit is its own object. At a removable hole, \\(f(a)\\) is undefined but the limit exists. At a jump, the one-sided limits disagree and the two-sided limit does not exist. At a vertical asymptote, we say the limit is \\(\\pm\\infty\\) (a statement that the limit does not exist in the standard sense, but we describe its behavior anyway).",
    keyIdeas: [
      "\\(\\lim_{x\\to a} f(x) = L\\) iff both one-sided limits equal \\(L\\).",
      "A limit can exist even if \\(f(a)\\) doesn't.",
      "Use correct notation: \\(\\lim_{x\\to a} f(x)\\), not \"lim f(a)\".",
      "Jumps → one-sided disagree → two-sided DNE.",
    ],
    workedExample: {
      prompt:
        "For \\(f(x) = \\begin{cases} x+1 & x<2 \\\\ 5 & x=2 \\\\ x^2-1 & x>2 \\end{cases}\\), find \\(\\lim_{x\\to 2} f(x)\\).",
      solution:
        "Left: \\(\\lim_{x\\to 2^-}(x+1) = 3\\). Right: \\(\\lim_{x\\to 2^+}(x^2-1) = 3\\). Both sides agree, so \\(\\lim_{x\\to 2} f(x) = 3\\). The fact that \\(f(2) = 5\\) is irrelevant — the limit doesn't care about the value at the point.",
    },
    commonMistakes: [
      "Claiming a limit equals \\(f(a)\\) by reflex — only true when \\(f\\) is continuous at \\(a\\).",
      "Forgetting to check both one-sided limits at piecewise boundaries.",
      "Writing \"lim = DNE = \\(\\infty\\)\" — those aren't the same; infinite limits still don't exist in the finite sense.",
    ],
  },
  "1.3": {
    id: "1.3",
    title: "Estimating Limit Values from Graphs",
    summary:
      "Read limits off a graph by tracing what \\(y\\) approaches from the left and from the right — ignore the dot at \\(x=a\\).",
    lesson:
      "Given a graph, estimate \\(\\lim_{x \\to a} f(x)\\) by sliding your finger along the curve from the left and noting the \\(y\\)-value it approaches, then from the right. If the two match, the limit is that common value. If they differ, the two-sided limit does not exist.\n\nCover the point \\(x = a\\) with your thumb. Whatever the graph is heading toward is the limit, even if there's an open circle, a filled circle of the wrong height, or nothing at all at \\(x = a\\). This is the visual version of \"limits are about behavior near \\(a\\), not at \\(a\\).\"\n\nAP multiple-choice and FRQ problems often show a piecewise-looking graph with open/closed circles, jumps, and asymptotes. Practice reading: does it approach a finite value? Does it approach \\(+\\infty\\) or \\(-\\infty\\)? Does it oscillate? Oscillation (like \\(\\sin(1/x)\\) near 0) is the least common case but does appear.",
    keyIdeas: [
      "Trace the curve, not the single point at \\(x=a\\).",
      "Open and closed circles at \\(x=a\\) don't affect the limit, only \\(f(a)\\).",
      "Limit DNE if the two sides disagree, the function oscillates, or it diverges without settling.",
      "Use the visual to sanity-check algebraic work.",
    ],
    commonMistakes: [
      "Using the filled-in dot at \\(x=a\\) as the limit value.",
      "Assuming the limit exists because the left side does — always check both sides.",
      "Reporting \\(\\infty\\) as a finite limit value.",
    ],
  },
  "1.4": {
    id: "1.4",
    title: "Estimating Limit Values from Tables",
    summary:
      "Tables approximate limits by sampling \\(f(x)\\) at values of \\(x\\) approaching \\(a\\) from both sides.",
    lesson:
      "Given a table of \\(x\\) values close to \\(a\\) (e.g., \\(x = 1.9, 1.99, 1.999\\) and \\(x = 2.001, 2.01, 2.1\\)), look at the trend of \\(f(x)\\). If both columns head to the same \\(y\\)-value, that's your limit estimate. This is the numerical version of the limit definition and is especially useful when you don't have a closed-form for \\(f\\).\n\nThe AP exam loves this for applied contexts: experimental data, temperature probes, or functions defined by integrals. The tip-off that a problem wants the table method is that they give you values, not a formula.\n\nBe honest about estimation. Report the limit to the precision the table supports. If \\(f(1.999) = 4.002\\) and \\(f(2.001) = 4.003\\), writing \\(\\lim = 4\\) is fine. Writing \\(\\lim = 4.0025\\) pretends to more accuracy than the data gives you.",
    keyIdeas: [
      "Check both sides of \\(a\\) — at least three values approaching from each side if possible.",
      "Agreement of both sides at a common value suggests the limit.",
      "Be cautious: a table can miss oscillation or rapid growth near \\(a\\).",
      "Round appropriately to the precision the data supports.",
    ],
    workedExample: {
      prompt:
        "Given \\(f(1.9)=3.71,\\ f(1.99)=3.9701,\\ f(1.999)=3.997,\\ f(2.001)=4.003,\\ f(2.01)=4.03,\\ f(2.1)=4.31\\), estimate \\(\\lim_{x\\to 2} f(x)\\).",
      solution:
        "Both sides approach 4 as \\(x\\) approaches 2. Estimate: \\(\\lim_{x\\to 2} f(x) \\approx 4\\).",
    },
    commonMistakes: [
      "Sampling only one side — can't infer the two-sided limit.",
      "Mistaking slow convergence for the limit not existing.",
      "Ignoring scale — tables can hide large behavior very close to \\(a\\).",
    ],
  },
  "1.5": {
    id: "1.5",
    title: "Determining Limits Using Algebraic Properties of Limits",
    summary:
      "Limits distribute over sums, products, quotients (when the denominator limit is nonzero), and compositions when the inner limit is in the outer's domain.",
    lesson:
      "If \\(\\lim_{x\\to a} f(x) = L\\) and \\(\\lim_{x\\to a} g(x) = M\\), then \\(\\lim(f+g) = L+M\\), \\(\\lim(fg) = LM\\), and \\(\\lim(f/g) = L/M\\) provided \\(M \\neq 0\\). Constants can be pulled out. For composition, \\(\\lim_{x\\to a} f(g(x)) = f(M)\\) if \\(f\\) is continuous at \\(M\\).\n\nDirect substitution is the first move for any limit. If \\(f\\) is continuous at \\(a\\) — which includes polynomials, exponentials, sines, cosines, and any rational function with a nonzero denominator at \\(a\\) — then \\(\\lim_{x\\to a} f(x) = f(a)\\). Full stop.\n\nThe algebraic-properties rules matter most when you're combining multiple simpler limits. For example, \\(\\lim_{x\\to 0}(\\cos x + 3 \\sin x) = \\cos 0 + 3\\sin 0 = 1\\) — you didn't need to prove anything, you just used continuity plus the sum rule.",
    keyIdeas: [
      "Direct substitution works whenever \\(f\\) is continuous at \\(a\\).",
      "Limits split across sums, differences, products, and quotients (denominator \\(\\neq 0\\)).",
      "Constants factor out: \\(\\lim(kf) = k\\lim f\\).",
      "For composition, require continuity of the outer function at the inner limit.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\lim_{x\\to 1}\\frac{2x^2 + 3}{x+4}\\).",
      solution:
        "The numerator and denominator are polynomials, so the quotient is continuous wherever the denominator is nonzero. At \\(x=1\\), denominator \\(= 5 \\neq 0\\). Direct sub: \\((2+3)/5 = 1\\).",
    },
    commonMistakes: [
      "Applying the quotient rule when the denominator limit is 0 — that case needs algebraic manipulation.",
      "Forgetting that \\(\\lim f(g(x)) = f(\\lim g(x))\\) only when \\(f\\) is continuous at the inner limit.",
      "Plugging in without checking whether the function is defined there.",
    ],
  },
  "1.6": {
    id: "1.6",
    title: "Determining Limits Using Algebraic Manipulation",
    summary:
      "When direct substitution gives \\(0/0\\), factor, rationalize, or combine fractions to cancel the offending term.",
    lesson:
      "A \\(0/0\\) form means there is a common factor hiding. Your job is to expose it. Standard moves:\n\n1. **Factor and cancel.** \\(\\lim_{x\\to 2}\\frac{x^2-4}{x-2} = \\lim_{x\\to 2}\\frac{(x-2)(x+2)}{x-2} = \\lim_{x\\to 2}(x+2) = 4\\).\n\n2. **Rationalize.** For \\(\\lim_{x\\to 0}\\frac{\\sqrt{x+1}-1}{x}\\), multiply by \\(\\frac{\\sqrt{x+1}+1}{\\sqrt{x+1}+1}\\) to get \\(\\frac{x}{x(\\sqrt{x+1}+1)} = \\frac{1}{\\sqrt{x+1}+1}\\). Sub: \\(1/2\\).\n\n3. **Combine complex fractions.** \\(\\lim_{h\\to 0}\\frac{1/(2+h) - 1/2}{h}\\) simplifies by finding a common denominator inside the numerator.\n\n4. **Trig identities.** \\(\\lim_{x\\to 0}\\frac{\\sin 2x}{x}\\) rewrites as \\(2\\cdot\\frac{\\sin 2x}{2x}\\), then uses \\(\\lim_{u\\to 0}\\frac{\\sin u}{u}=1\\).\n\nThe algebra is rarely hard — the skill is spotting which manipulation applies. Always write \\(\\lim\\) at every step until you've substituted. Dropping the limit symbol is a common AP FRQ point-loss.",
    keyIdeas: [
      "\\(0/0\\) means there's a hidden common factor; your job is to find it.",
      "Factor-and-cancel handles polynomial ratios.",
      "Rationalize conjugates to kill square roots.",
      "Keep \\(\\lim\\) notation until the variable has been substituted.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\lim_{x\\to 3}\\frac{x^2-9}{x-3}\\).",
      solution:
        "Factor: \\(\\frac{(x-3)(x+3)}{x-3} = x+3\\) for \\(x\\ne 3\\). So \\(\\lim_{x\\to 3}(x+3) = 6\\).",
    },
    commonMistakes: [
      "Canceling factors that aren't actually equal (e.g., treating \\(x+3\\) and \\(x-3\\) as interchangeable).",
      "Dropping the \\(\\lim\\) symbol prematurely.",
      "Forgetting rationalization when a square root appears in a \\(0/0\\) form.",
    ],
  },
  "1.7": {
    id: "1.7",
    title: "Selecting Procedures for Determining Limits",
    summary:
      "Triage limits: try direct substitution first, then pattern-match on the indeterminate form to pick the right tool.",
    lesson:
      "Every limit problem starts the same way: try direct substitution. One of these things happens.\n\n- **Finite value.** Done.\n- **\\(k/0\\) with \\(k\\ne 0\\).** Vertical asymptote. Examine one-sided behavior and sign analysis to decide \\(+\\infty\\), \\(-\\infty\\), or DNE.\n- **\\(0/0\\).** Indeterminate — factor, rationalize, combine, or use L'Hôpital (after you learn it in Unit 4).\n- **\\(\\infty/\\infty\\).** Divide top and bottom by the highest power of \\(x\\), or use L'Hôpital.\n- **\\(0 \\cdot \\infty\\), \\(\\infty - \\infty\\), \\(1^\\infty\\), \\(0^0\\), \\(\\infty^0\\).** Rewrite to get a \\(0/0\\) or \\(\\infty/\\infty\\) form, then apply L'Hôpital or algebra.\n\nThe AP exam rarely asks you to invent a trick. It asks you to diagnose the form and apply the standard procedure. Write one line of substitution first, then commit to a technique.",
    keyIdeas: [
      "Substitute first; only use advanced techniques when you hit an indeterminate form.",
      "\\(0/0\\) and \\(\\infty/\\infty\\) are indeterminate — they demand algebraic work or L'Hôpital.",
      "\\(k/0\\) with nonzero \\(k\\) is a vertical asymptote, not indeterminate.",
      "Named procedures: factor, rationalize, combine fractions, trig identity, L'Hôpital.",
    ],
    commonMistakes: [
      "Jumping to L'Hôpital without verifying the form is indeterminate.",
      "Treating \\(k/0\\) as \\(0/0\\) and trying to factor.",
      "Forgetting that \\(0 \\cdot \\infty\\) must be rewritten before any rule applies.",
    ],
  },
  "1.8": {
    id: "1.8",
    title: "Determining Limits Using the Squeeze Theorem",
    summary:
      "If \\(g(x) \\le f(x) \\le h(x)\\) near \\(a\\) and \\(\\lim g = \\lim h = L\\), then \\(\\lim f = L\\).",
    lesson:
      "The Squeeze (Sandwich) Theorem handles limits that resist direct attack — classically, products of a bounded oscillating function and something tending to 0. The archetype: \\(\\lim_{x\\to 0} x^2 \\sin(1/x)\\). You can't substitute (\\(\\sin(1/x)\\) is undefined at 0), you can't factor, you can't use L'Hôpital. But \\(-1 \\le \\sin(1/x) \\le 1\\), so \\(-x^2 \\le x^2\\sin(1/x) \\le x^2\\). Both bounds go to 0, so the middle is 0.\n\nThe setup is always: identify a bounded piece (often a trig function) and multiply by something tending to 0. Build the inequality carefully — keep the direction consistent when multiplying by negatives.\n\nThe Squeeze Theorem is also the standard tool for proving \\(\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1\\), but on the AP exam you rarely have to reprove that — you just cite it.",
    keyIdeas: [
      "Squeeze requires \\(g \\le f \\le h\\) in a neighborhood of \\(a\\).",
      "Both outer functions must have the same limit at \\(a\\).",
      "Classic use: \\(x^n\\) times a bounded oscillating function.",
      "Cite \\(\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1\\) freely — it's a famous result.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\lim_{x\\to 0} x\\cos(1/x)\\).",
      solution:
        "Since \\(-1 \\le \\cos(1/x) \\le 1\\), we have \\(-|x| \\le x\\cos(1/x) \\le |x|\\). Both \\(\\pm|x| \\to 0\\), so by the Squeeze Theorem the limit is 0.",
    },
    commonMistakes: [
      "Using bounds that don't actually sandwich the function.",
      "Flipping inequality direction when multiplying by a negative.",
      "Trying to squeeze when a direct technique would work.",
    ],
  },
  "1.9": {
    id: "1.9",
    title: "Connecting Multiple Representations of Limits",
    summary:
      "Graphs, tables, formulas, and verbal descriptions must all tell the same story about a limit.",
    lesson:
      "AP questions routinely hand you the same limit in two forms — table plus graph, formula plus description — and ask whether they agree. The skill is translating fluently.\n\nFrom a **formula**, use algebraic techniques. From a **graph**, slide from both sides. From a **table**, check both columns converge to the same value. From a **verbal** description (e.g., \"as \\(x\\) approaches 3 from the right, \\(f(x)\\) grows without bound\"), translate to notation: \\(\\lim_{x\\to 3^+} f(x) = \\infty\\).\n\nWhen representations disagree, something is wrong. Maybe the graph and table are sampled too coarsely to show oscillation. Maybe the verbal description is missing a caveat. Walk through each representation methodically; don't assume one is authoritative.",
    keyIdeas: [
      "Every representation should agree; disagreement signals a missing detail.",
      "Graphs show qualitative behavior at a glance but hide fine detail.",
      "Tables are precise but can miss oscillation or hidden jumps.",
      "Formulas are exact but require correct algebra.",
    ],
    commonMistakes: [
      "Trusting one representation blindly when it contradicts another.",
      "Sampling too coarsely on a table to catch oscillation.",
      "Mis-translating verbal descriptions of infinite limits.",
    ],
  },
  "1.10": {
    id: "1.10",
    title: "Exploring Types of Discontinuities",
    summary:
      "Three flavors: removable (hole), jump (step), and infinite (asymptote). Know how to spot each from formulas and graphs.",
    lesson:
      "A function is **discontinuous** at \\(a\\) if continuity fails. Three cases:\n\n1. **Removable.** \\(\\lim_{x\\to a} f(x)\\) exists but \\(f(a)\\) doesn't equal it (or isn't defined). Example: \\(f(x)=(x^2-4)/(x-2)\\) has a removable discontinuity at \\(x=2\\) — the hole. Define \\(f(2) = 4\\) and it's continuous.\n\n2. **Jump.** The left and right limits exist but disagree. Example: \\(f(x) = \\lfloor x \\rfloor\\) at every integer. No single value of \\(f(a)\\) can fix this.\n\n3. **Infinite.** At least one one-sided limit is \\(\\pm\\infty\\). Example: \\(f(x) = 1/x\\) at \\(x=0\\). The function has a vertical asymptote.\n\nClassify from a formula by factoring and checking the offending point. Classify from a graph by tracing the two sides and noting whether the vertical value settles, jumps, or escapes.",
    keyIdeas: [
      "Removable: limit exists, value doesn't match — fillable hole.",
      "Jump: one-sided limits exist but disagree — unfixable without changing the function.",
      "Infinite: a vertical asymptote is involved.",
      "Classification is a routine step before computing the limit or checking continuity.",
    ],
    workedExample: {
      prompt:
        "Classify the discontinuity of \\(f(x)=\\frac{x^2-1}{x-1}\\) at \\(x=1\\).",
      solution:
        "Factor: \\(\\frac{(x-1)(x+1)}{x-1} = x+1\\) for \\(x\\ne 1\\). The limit is 2, but \\(f(1)\\) is undefined. Removable discontinuity; define \\(f(1)=2\\) to fix it.",
    },
    commonMistakes: [
      "Calling a removable hole a \"jump\" — the two sides agree.",
      "Calling a vertical asymptote \"removable.\" You can't remove \\(\\infty\\).",
      "Forgetting to check the value \\(f(a)\\) when deciding removable vs. continuous.",
    ],
  },
  "1.11": {
    id: "1.11",
    title: "Defining Continuity at a Point",
    summary:
      "\\(f\\) is continuous at \\(a\\) iff \\(\\lim_{x\\to a} f(x) = f(a)\\) — three conditions wrapped into one.",
    lesson:
      "Continuity at \\(a\\) requires three things:\n1. \\(f(a)\\) is defined.\n2. \\(\\lim_{x\\to a} f(x)\\) exists.\n3. The two are equal.\n\nOn FRQs you'll often be asked to show \\(f\\) is continuous at a specific point. List the three conditions and check each explicitly — no skipping. If any fails, state which one and classify the discontinuity.\n\nContinuity is also how we justify \"plug in\" for limits. If \\(f\\) is continuous at \\(a\\), then \\(\\lim_{x\\to a} f(x) = f(a)\\) directly.",
    keyIdeas: [
      "Three-condition definition: \\(f(a)\\) exists, \\(\\lim\\) exists, they match.",
      "Missing any one ⇒ discontinuous.",
      "Continuity justifies direct substitution in limits.",
      "Standard elementary functions are continuous on their domains.",
    ],
    workedExample: {
      prompt:
        "Is \\(f(x) = \\begin{cases} x^2 & x<1 \\\\ 2 & x=1 \\\\ 3x-1 & x>1 \\end{cases}\\) continuous at \\(x=1\\)?",
      solution:
        "Left: \\(\\lim_{x\\to 1^-} x^2 = 1\\). Right: \\(\\lim_{x\\to 1^+}(3x-1) = 2\\). Limits disagree, so \\(\\lim_{x\\to 1} f(x)\\) does not exist. Not continuous (jump discontinuity).",
    },
    commonMistakes: [
      "Checking only one condition and declaring continuity.",
      "Assuming a piecewise function is continuous at the boundary without testing.",
      "Confusing \"continuous\" with \"differentiable\" — continuity is weaker.",
    ],
  },
  "1.12": {
    id: "1.12",
    title: "Confirming Continuity over an Interval",
    summary:
      "\\(f\\) is continuous on \\([a,b]\\) if it is continuous at every interior point and one-sided continuous at the endpoints.",
    lesson:
      "To say \\(f\\) is continuous on \\((a,b)\\) means the three-condition definition holds at every point inside. For \\([a,b]\\), add one-sided continuity at the endpoints: \\(\\lim_{x\\to a^+}f(x) = f(a)\\) and \\(\\lim_{x\\to b^-}f(x) = f(b)\\).\n\nPolynomials are continuous everywhere. Rational functions are continuous on their domains (all reals except zeros of the denominator). Exponentials, sines, cosines are continuous on \\(\\mathbb{R}\\). Logs and roots are continuous on their natural domains.\n\nThe interval version of continuity is what you invoke to cite the IVT and the EVT — both require continuity on a closed interval.",
    keyIdeas: [
      "Interval continuity = continuity at each point inside.",
      "Closed-interval continuity adds one-sided continuity at endpoints.",
      "Standard families (polys, exp, trig, etc.) are continuous on their domains.",
      "IVT and EVT both require continuity on a closed interval.",
    ],
    commonMistakes: [
      "Overlooking domain restrictions (e.g., saying \\(1/x\\) is continuous on \\([-1,1]\\) — it isn't; 0 is undefined).",
      "Forgetting to verify endpoint continuity for closed intervals.",
      "Claiming theorem conclusions (IVT/EVT) without first confirming continuity on the interval.",
    ],
  },
  "1.13": {
    id: "1.13",
    title: "Removing Discontinuities",
    summary:
      "A removable discontinuity at \\(a\\) can be patched by defining \\(f(a) = \\lim_{x\\to a} f(x)\\).",
    lesson:
      "If \\(\\lim_{x\\to a} f(x) = L\\) exists but \\(f(a)\\) is undefined or \\(\\ne L\\), redefine \\(f(a) = L\\). The new piecewise function is continuous at \\(a\\). This is \"removing\" the discontinuity.\n\nAP FRQs set this up as: \"Find a value of \\(k\\) that makes \\(f\\) continuous.\" Compute both one-sided limits at the boundary, set them equal, and solve for the unknown. If the problem has a piecewise function with two boundaries, you may need a system.\n\nThis topic ties directly to Topic 1.11 — you're just using the three-condition definition in reverse: you already have the limit and the function, and you're adjusting the value \\(f(a)\\) to make them match.",
    keyIdeas: [
      "Remove removable discontinuities by defining \\(f(a) = L\\).",
      "Jump and infinite discontinuities can't be patched.",
      "\"Find \\(k\\) that makes \\(f\\) continuous\" = set left limit = right limit.",
      "Two unknown parameters need two equations (usually continuity at two points).",
    ],
    workedExample: {
      prompt:
        "Find \\(k\\) so that \\(f(x) = \\begin{cases} kx+1 & x \\le 2 \\\\ x^2-1 & x > 2 \\end{cases}\\) is continuous.",
      solution:
        "Left limit: \\(k(2)+1 = 2k+1\\). Right limit: \\(4-1 = 3\\). Set equal: \\(2k+1=3 \\Rightarrow k=1\\).",
    },
    commonMistakes: [
      "Trying to remove a jump — you can't.",
      "Solving only for equality of function values, forgetting the limit side.",
      "Algebra errors when distributing the unknown parameter.",
    ],
  },
  "1.14": {
    id: "1.14",
    title: "Connecting Infinite Limits and Vertical Asymptotes",
    summary:
      "\\(\\lim_{x\\to a} f(x) = \\pm\\infty\\) means \\(f\\) has a vertical asymptote at \\(x=a\\).",
    lesson:
      "When direct substitution gives \\(k/0\\) with \\(k\\ne 0\\), the function blows up near \\(a\\). Decide which way by sign analysis: check the sign of the numerator and denominator for \\(x\\) slightly less than and slightly greater than \\(a\\).\n\nFor rational functions, vertical asymptotes occur where the denominator is zero and the numerator is not. A zero that cancels with the numerator is a removable discontinuity (hole), not an asymptote. Always factor before classifying.\n\nAP notation: \\(\\lim_{x\\to a^-}f(x) = -\\infty\\) and \\(\\lim_{x\\to a^+}f(x) = +\\infty\\) is a typical pair at an asymptote of \\(1/(x-a)\\). Write both one-sided limits.",
    keyIdeas: [
      "\\(k/0\\) with \\(k\\ne 0\\) ⇒ vertical asymptote.",
      "Sign of numerator and denominator on each side determines \\(+\\) or \\(-\\infty\\).",
      "Cancelable zeros are holes, not asymptotes.",
      "Always factor before classifying zeros of the denominator.",
    ],
    workedExample: {
      prompt:
        "Find \\(\\lim_{x\\to 2^+}\\frac{1}{x-2}\\) and \\(\\lim_{x\\to 2^-}\\frac{1}{x-2}\\).",
      solution:
        "From the right, \\(x-2>0\\) so \\(1/(x-2) \\to +\\infty\\). From the left, \\(x-2<0\\) so \\(1/(x-2) \\to -\\infty\\).",
    },
    commonMistakes: [
      "Treating \\(1/(x-2)\\) as having a hole rather than an asymptote at \\(x=2\\).",
      "Reporting a single two-sided infinite limit when the signs disagree.",
      "Skipping sign analysis and guessing the \\(\\pm\\).",
    ],
  },
  "1.15": {
    id: "1.15",
    title: "Connecting Limits at Infinity and Horizontal Asymptotes",
    summary:
      "\\(\\lim_{x\\to\\pm\\infty} f(x) = L\\) means \\(f\\) has a horizontal asymptote at \\(y=L\\).",
    lesson:
      "For rational functions, the horizontal behavior depends on the degree comparison:\n- **deg(num) < deg(denom):** \\(\\lim_{x\\to\\pm\\infty} = 0\\); horizontal asymptote \\(y=0\\).\n- **deg(num) = deg(denom):** limit equals the ratio of leading coefficients.\n- **deg(num) > deg(denom):** limit is \\(\\pm\\infty\\); no horizontal asymptote (there may be an oblique one).\n\nThe computational trick is to divide numerator and denominator by the largest power of \\(x\\) in the denominator. Terms with \\(x\\) in the denominator vanish as \\(x \\to \\pm\\infty\\).\n\nNon-rational functions: \\(e^{-x}\\to 0\\) as \\(x\\to\\infty\\); \\(e^x\\to 0\\) as \\(x\\to-\\infty\\); \\(\\arctan x\\to \\pm\\pi/2\\) — memorize the standard asymptotic behaviors.",
    keyIdeas: [
      "Divide top and bottom by the highest power of \\(x\\) in the denominator.",
      "Degree comparison decides whether the limit is 0, a ratio, or \\(\\infty\\).",
      "A function can have up to two horizontal asymptotes (one for \\(+\\infty\\), one for \\(-\\infty\\)).",
      "Know standard behaviors: \\(e^{\\pm x}\\), \\(\\arctan x\\), \\(\\ln x\\).",
    ],
    workedExample: {
      prompt:
        "Find \\(\\lim_{x\\to\\infty}\\frac{3x^2-5}{x^2+7x}\\).",
      solution:
        "Divide by \\(x^2\\): \\((3 - 5/x^2)/(1 + 7/x) \\to 3/1 = 3\\). Horizontal asymptote \\(y=3\\).",
    },
    commonMistakes: [
      "Comparing constant terms instead of leading coefficients.",
      "Claiming \\(y=0\\) for \\(\\text{deg(num)}=\\text{deg(denom)}\\) — it's the leading-coefficient ratio.",
      "Assuming both one-sided infinite limits match (they may not for functions like \\(\\arctan x\\)).",
    ],
  },
  "1.16": {
    id: "1.16",
    title: "Working with the Intermediate Value Theorem",
    summary:
      "If \\(f\\) is continuous on \\([a,b]\\) and \\(N\\) is between \\(f(a)\\) and \\(f(b)\\), some \\(c\\in(a,b)\\) satisfies \\(f(c)=N\\).",
    lesson:
      "The IVT guarantees existence of a solution. Checklist: (1) \\(f\\) continuous on \\([a,b]\\), (2) target \\(N\\) strictly between \\(f(a)\\) and \\(f(b)\\). Conclusion: at least one \\(c\\) in the open interval with \\(f(c) = N\\).\n\nClassic use: prove a polynomial has a root in \\((a,b)\\). Compute \\(f(a)\\) and \\(f(b)\\). If they straddle 0 and \\(f\\) is continuous (which polynomials always are), IVT delivers a root.\n\nFRQ language to reproduce verbatim: \"\\(f\\) is continuous on \\([a,b]\\), and \\(f(a) = \\_, f(b) = \\_\\) so that \\(N=\\_\\) is between them. By the IVT, there exists \\(c\\in(a,b)\\) with \\(f(c) = N\\).\" State every condition explicitly — the rubric wants them named.",
    keyIdeas: [
      "IVT needs continuity on the closed interval.",
      "The target value must be strictly between \\(f(a)\\) and \\(f(b)\\).",
      "IVT gives existence, not uniqueness.",
      "Write the hypotheses out on FRQs — graders deduct for implicit justification.",
    ],
    workedExample: {
      prompt:
        "Show \\(f(x) = x^3 + x - 4\\) has a root in \\((1,2)\\).",
      solution:
        "\\(f\\) is a polynomial, hence continuous on \\([1,2]\\). \\(f(1) = 1+1-4 = -2\\) and \\(f(2) = 8+2-4 = 6\\). Since \\(0\\) is between \\(-2\\) and \\(6\\), by the IVT there exists \\(c\\in(1,2)\\) with \\(f(c)=0\\).",
    },
    commonMistakes: [
      "Skipping the continuity statement.",
      "Concluding uniqueness — IVT only guarantees at least one \\(c\\).",
      "Applying IVT when \\(f(a)\\) and \\(f(b)\\) don't straddle \\(N\\).",
    ],
  },

  // =========================================================================
  // UNIT 2 — DIFFERENTIATION: DEFINITION AND FUNDAMENTAL PROPERTIES
  // =========================================================================
  "2.1": {
    id: "2.1",
    title: "Defining Average and Instantaneous Rates of Change at a Point",
    summary:
      "Average rate of change is a slope between two points; the instantaneous rate is the limit as the interval shrinks to zero.",
    lesson:
      "Average rate of change of \\(f\\) on \\([a,b]\\) is \\(\\frac{f(b)-f(a)}{b-a}\\) — a secant slope. Instantaneous rate of change at \\(x=a\\) is \\(\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\) — the tangent slope.\n\nThe average rate is a geometric average of the function's change over the interval. The instantaneous rate is a pointwise derivative. In physics: average velocity is displacement over time on an interval; instantaneous velocity is the derivative of position at one instant.\n\nThis topic is the prologue to the derivative. Every future computation of \\(f'(a)\\) is a shortcut for computing this limit — so drill the notation now.",
    keyIdeas: [
      "Average rate = secant slope = \\((f(b)-f(a))/(b-a)\\).",
      "Instantaneous rate = tangent slope = \\(\\lim_{h\\to 0}(f(a+h)-f(a))/h\\).",
      "In applied contexts, they describe averaged vs. pointwise behavior.",
      "The instantaneous rate is the derivative evaluated at \\(a\\).",
    ],
    workedExample: {
      prompt:
        "For \\(f(x)=x^2\\), compute the average rate on \\([1,3]\\) and the instantaneous rate at \\(x=1\\).",
      solution:
        "Average: \\((9-1)/(3-1) = 4\\). Instantaneous: \\(\\lim_{h\\to 0}\\frac{(1+h)^2-1}{h} = \\lim_{h\\to 0}(2+h) = 2\\).",
    },
    commonMistakes: [
      "Forgetting to divide by \\(b-a\\) in the average rate.",
      "Setting \\(h=0\\) directly rather than taking a limit.",
      "Confusing the two rates — the average is over an interval, the instantaneous is at a point.",
    ],
  },
  "2.2": {
    id: "2.2",
    title: "Defining the Derivative of a Function and Using Derivative Notation",
    summary:
      "\\(f'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}\\). Also written \\(dy/dx\\), \\(\\frac{d}{dx}f(x)\\), or \\(D_x f\\).",
    lesson:
      "The derivative of \\(f\\) at a general \\(x\\) is the limit of secant slopes: \\(f'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}\\). An equivalent form uses a second point: \\(f'(a) = \\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}\\). Either definition is fair game on the AP exam.\n\nNotations abound: Lagrange \\(f'(x)\\), Leibniz \\(dy/dx\\), Euler \\(D_x f\\). They all mean the same thing. Leibniz is the most common on the AP exam because it tracks the differentiating variable explicitly, which matters for related rates and implicit differentiation.\n\nExpect FRQs that phrase the question as \"using the definition of the derivative, find \\(f'(2)\\).\" That wording forbids the shortcut rules — you must set up the limit and evaluate it algebraically. Practice this mechanically; it's worth easy points.",
    keyIdeas: [
      "Limit-definition: \\(f'(x) = \\lim_{h\\to 0}(f(x+h)-f(x))/h\\).",
      "Alternate: \\(f'(a) = \\lim_{x\\to a}(f(x)-f(a))/(x-a)\\).",
      "Notations: \\(f'\\), \\(dy/dx\\), \\(\\frac{d}{dx}\\), \\(D_x\\).",
      "\"Using the definition\" on FRQs means set up the limit — no shortcuts.",
    ],
    workedExample: {
      prompt:
        "Use the limit definition to find \\(f'(x)\\) for \\(f(x)=x^2+3x\\).",
      solution:
        "\\(\\lim_{h\\to 0}\\frac{(x+h)^2+3(x+h) - (x^2+3x)}{h} = \\lim_{h\\to 0}\\frac{2xh+h^2+3h}{h} = \\lim_{h\\to 0}(2x+h+3) = 2x+3\\).",
    },
    commonMistakes: [
      "Forgetting to expand \\((x+h)^2\\) correctly (the middle term is \\(2xh\\)).",
      "Dropping the \\(\\lim\\) symbol prematurely.",
      "Canceling \\(h\\) before the numerator has been simplified.",
    ],
  },
  "2.3": {
    id: "2.3",
    title: "Estimating Derivatives of a Function at a Point",
    summary:
      "Use the symmetric difference quotient \\((f(a+h)-f(a-h))/(2h)\\) or a forward/backward difference for numerical derivative estimates.",
    lesson:
      "Given a table, a graph, or experimental data, you often can't write \\(f\\) in closed form. Estimate \\(f'(a)\\) with a finite-difference approximation:\n- **Forward:** \\((f(a+h)-f(a))/h\\).\n- **Backward:** \\((f(a)-f(a-h))/h\\).\n- **Symmetric (central):** \\((f(a+h)-f(a-h))/(2h)\\).\n\nThe symmetric estimate is typically the most accurate for a given \\(h\\) because the first-order errors cancel. On tabular-data problems, use the two nearest table entries that straddle \\(a\\).\n\nAP FRQs often frame this as: \"Estimate \\(f'(5)\\) using the data in the table.\" Pick the closest pair, compute the slope, state the units. Units are a common point-dropper — if \\(f\\) is pressure in psi vs. time in seconds, \\(f'\\) is psi per second.",
    keyIdeas: [
      "Symmetric difference is the go-to estimator: \\((f(a+h)-f(a-h))/(2h)\\).",
      "If only one side is given, fall back to forward or backward difference.",
      "Always include units in applied contexts.",
      "Smaller \\(h\\) is better only until rounding error dominates.",
    ],
    workedExample: {
      prompt:
        "Given \\(f(2) = 5\\), \\(f(2.1) = 5.44\\), \\(f(1.9) = 4.58\\), estimate \\(f'(2)\\).",
      solution:
        "Central difference: \\((5.44 - 4.58)/(2\\cdot 0.1) = 0.86/0.2 = 4.3\\). So \\(f'(2) \\approx 4.3\\).",
    },
    commonMistakes: [
      "Dividing by \\(h\\) instead of \\(2h\\) for the central difference.",
      "Using data points that don't straddle the target.",
      "Forgetting units on applied problems.",
    ],
  },
  "2.4": {
    id: "2.4",
    title: "Connecting Differentiability and Continuity",
    summary:
      "Differentiable ⇒ continuous, but not the reverse. Corners, cusps, and vertical tangents are continuous but not differentiable.",
    lesson:
      "If \\(f\\) is differentiable at \\(a\\), then \\(f\\) is continuous at \\(a\\). The converse fails: \\(f(x) = |x|\\) is continuous at 0 but has a corner, so \\(f'(0)\\) doesn't exist (the one-sided derivatives are \\(\\pm 1\\)).\n\nThree ways differentiability can fail with continuity intact:\n1. **Corner.** One-sided derivatives are finite but unequal (e.g., \\(|x|\\) at 0).\n2. **Cusp.** Both one-sided slopes tend to \\(\\infty\\) (or \\(-\\infty\\)) — the tangent is vertical and symmetric (e.g., \\(x^{2/3}\\) at 0).\n3. **Vertical tangent.** Slope tends to \\(\\pm\\infty\\) (e.g., \\(x^{1/3}\\) at 0).\n\nOn FRQs: to check differentiability at a piecewise boundary, confirm (a) continuity first, (b) left and right derivatives match.",
    keyIdeas: [
      "Differentiability is a stronger condition than continuity.",
      "Corners, cusps, and vertical tangents break differentiability.",
      "Check continuity first, then slope agreement, to decide differentiability at a piecewise boundary.",
      "If the derivative is not continuous, the function can still be differentiable (rare on AP but possible).",
    ],
    workedExample: {
      prompt:
        "Is \\(f(x) = |x-1|\\) differentiable at \\(x=1\\)?",
      solution:
        "Continuous at 1 (value is 0 from both sides). Left derivative: \\(-1\\). Right derivative: \\(+1\\). They disagree, so \\(f\\) is not differentiable at 1 (corner).",
    },
    commonMistakes: [
      "Assuming continuity implies differentiability.",
      "Skipping the continuity check when a piecewise function has matching one-sided derivatives but a jump in value.",
      "Forgetting that vertical tangents violate differentiability even though the function is \"smooth\" visually.",
    ],
  },
  "2.5": {
    id: "2.5",
    title: "Applying the Power Rule",
    summary:
      "\\(\\frac{d}{dx}[x^n] = nx^{n-1}\\) for any real \\(n\\).",
    lesson:
      "The power rule handles any monomial: for \\(f(x) = x^n\\), \\(f'(x) = n x^{n-1}\\). It works for positive integers, negatives, fractions, and irrationals. Write negative exponents: \\(1/x^2 = x^{-2}\\), so its derivative is \\(-2x^{-3} = -2/x^3\\). Rewrite radicals: \\(\\sqrt{x} = x^{1/2}\\), so its derivative is \\((1/2)x^{-1/2} = 1/(2\\sqrt{x})\\).\n\nBefore differentiating anything else, rewrite in exponent form. This single step prevents a lot of mistakes — quotients and roots are much easier to handle with power-rule-friendly notation.",
    keyIdeas: [
      "Power rule works for all real exponents.",
      "Rewrite \\(1/x^n\\) as \\(x^{-n}\\) and \\(\\sqrt[m]{x^n}\\) as \\(x^{n/m}\\).",
      "Factor and simplify before applying rules for cleanliness.",
      "Combine with sum/constant-multiple rules for polynomials.",
    ],
    workedExample: {
      prompt:
        "Differentiate \\(f(x) = 3x^5 - 2x^{-1} + \\sqrt{x}\\).",
      solution:
        "Rewrite: \\(f(x) = 3x^5 - 2x^{-1} + x^{1/2}\\). \\(f'(x) = 15x^4 + 2x^{-2} + (1/2)x^{-1/2} = 15x^4 + 2/x^2 + 1/(2\\sqrt{x})\\).",
    },
    commonMistakes: [
      "Decrementing the exponent incorrectly (off by one).",
      "Forgetting to carry negative exponents back to denominator form when simplifying.",
      "Differentiating \\(\\sqrt{x}\\) as \\(x^{-1/2}\\) instead of \\((1/2)x^{-1/2}\\).",
    ],
  },
  "2.6": {
    id: "2.6",
    title: "Derivative Rules: Constant, Sum, Difference, and Constant Multiple",
    summary:
      "The derivative is linear: constants have derivative 0, sums split, and constants factor out.",
    lesson:
      "Three simple rules:\n- \\(\\frac{d}{dx}[c] = 0\\).\n- \\(\\frac{d}{dx}[f \\pm g] = f' \\pm g'\\).\n- \\(\\frac{d}{dx}[kf] = k f'\\).\n\nThese let you differentiate any polynomial term by term. They also combine freely with the power rule, the product rule, and the chain rule — every \"plus\" or \"times a constant\" in your expression simplifies.\n\nOn the AP exam, these rules show up implicitly inside every derivative problem. The only time they're featured is when a problem mixes constant multiples with trickier derivatives (e.g., \\(5e^x + 3\\sin x\\) — just \\(5e^x + 3\\cos x\\), no product rule needed).",
    keyIdeas: [
      "\\(\\frac{d}{dx}[c] = 0\\).",
      "\\(\\frac{d}{dx}[f \\pm g] = f' \\pm g'\\).",
      "\\(\\frac{d}{dx}[kf] = kf'\\).",
      "Linearity: combine freely with power, product, chain rules.",
    ],
    commonMistakes: [
      "Attempting the product rule on \\(kf\\) when the constant-multiple rule suffices.",
      "Forgetting to distribute the derivative across every term of a sum.",
      "Treating \\(x\\) as a constant multiple instead of a variable.",
    ],
  },
  "2.7": {
    id: "2.7",
    title: "Derivatives of \\(\\cos x\\), \\(\\sin x\\), \\(e^x\\), and \\(\\ln x\\)",
    summary:
      "Four elementary derivatives to memorize cold: \\(\\sin' = \\cos\\), \\(\\cos' = -\\sin\\), \\((e^x)' = e^x\\), \\((\\ln x)' = 1/x\\).",
    lesson:
      "These four derivatives are the atoms of transcendental calculus.\n- \\(\\frac{d}{dx}[\\sin x] = \\cos x\\)\n- \\(\\frac{d}{dx}[\\cos x] = -\\sin x\\)\n- \\(\\frac{d}{dx}[e^x] = e^x\\) (the unique function equal to its own derivative up to a constant multiple)\n- \\(\\frac{d}{dx}[\\ln x] = 1/x\\) for \\(x>0\\)\n\nFor general exponential bases: \\((a^x)' = a^x \\ln a\\). For general logs: \\((\\log_a x)' = 1/(x\\ln a)\\). These extensions are products of the base-four rules with the chain rule (next unit).\n\nThese rules are almost always paired with the product, quotient, or chain rule in exam questions — rarely will you see a bare \\(\\sin x\\) to differentiate.",
    keyIdeas: [
      "Memorize: \\(\\sin' = \\cos\\), \\(\\cos' = -\\sin\\), \\((e^x)' = e^x\\), \\((\\ln x)' = 1/x\\).",
      "General base: \\((a^x)' = a^x \\ln a\\); \\((\\log_a x)' = 1/(x\\ln a)\\).",
      "The negative sign on \\(\\cos'\\) is the most common error.",
      "These come combined with chain/product rules in practice.",
    ],
    commonMistakes: [
      "Forgetting the negative sign on \\(\\frac{d}{dx}[\\cos x]\\).",
      "Writing \\((e^x)' = xe^{x-1}\\) — that's the power rule, not the exponential rule.",
      "Using \\((\\ln x)' = \\ln' x\\) — \\(\\ln\\) isn't a variable; the derivative is \\(1/x\\).",
    ],
  },
  "2.8": {
    id: "2.8",
    title: "The Product Rule",
    summary:
      "\\((fg)' = f'g + fg'\\). Use whenever you're multiplying two functions of \\(x\\).",
    lesson:
      "The product rule: \\(\\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)\\). Each term is \"one factor differentiated times the other left alone,\" summed.\n\nDon't distribute \\(\\frac{d}{dx}\\) across a product naively — \\((fg)' \\neq f'g'\\). The product rule is non-negotiable when both factors depend on \\(x\\).\n\nIf one factor is a constant, skip the product rule and use constant multiple: \\((3 \\sin x)' = 3\\cos x\\). If both factors are the same thing, it's still a product: \\((x^2 \\cdot x^2)' = 2x \\cdot x^2 + x^2 \\cdot 2x = 4x^3\\) — which matches \\((x^4)' = 4x^3\\) from the power rule.",
    keyIdeas: [
      "\\((fg)' = f'g + fg'\\).",
      "Use whenever both factors depend on \\(x\\).",
      "Constant multiples don't need the product rule.",
      "Sanity-check by expanding when feasible.",
    ],
    workedExample: {
      prompt:
        "Differentiate \\(f(x) = x^2 e^x\\).",
      solution:
        "\\(f'(x) = 2x \\cdot e^x + x^2 \\cdot e^x = e^x(2x + x^2) = e^x \\cdot x(x+2)\\).",
    },
    commonMistakes: [
      "Writing \\((fg)' = f'g'\\).",
      "Forgetting to differentiate both factors.",
      "Not factoring the result when a common factor appears — it's often expected for clean FRQ answers.",
    ],
  },
  "2.9": {
    id: "2.9",
    title: "The Quotient Rule",
    summary:
      "\\(\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}\\). Watch the sign and the order.",
    lesson:
      "Quotient rule: \\(\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}\\). The key is the minus sign and the order — \\(f'g\\) first, not \\(fg'\\).\n\nAlternative: rewrite \\(f/g\\) as \\(f \\cdot g^{-1}\\) and use product + chain. Some students prefer that because it avoids memorizing the quotient formula. Either is fair on AP; pick one and stick with it.\n\nSimplify after applying. The \\(g^2\\) denominator often combines with numerator factors to reveal a cleaner form. Graders reward the simplification but rarely deduct for leaving it as-is.",
    keyIdeas: [
      "\\((f/g)' = (f'g - fg')/g^2\\) — order and sign matter.",
      "Equivalent: use \\(f \\cdot g^{-1}\\) with product + chain rule.",
      "Always write the denominator \\(g^2\\) even if it simplifies later.",
      "Simplify the final numerator where possible.",
    ],
    workedExample: {
      prompt:
        "Differentiate \\(f(x) = \\frac{\\sin x}{x}\\).",
      solution:
        "\\(f'(x) = \\frac{\\cos x \\cdot x - \\sin x \\cdot 1}{x^2} = \\frac{x\\cos x - \\sin x}{x^2}\\).",
    },
    commonMistakes: [
      "Flipping the numerator order: writing \\(fg' - f'g\\) instead of \\(f'g - fg'\\).",
      "Dropping the \\(g^2\\) in the denominator.",
      "Oversimplifying and losing a sign.",
    ],
  },
  "2.10": {
    id: "2.10",
    title: "Finding the Derivatives of Tangent, Cotangent, Secant, and Cosecant",
    summary:
      "\\(\\tan' = \\sec^2\\), \\(\\cot' = -\\csc^2\\), \\(\\sec' = \\sec\\tan\\), \\(\\csc' = -\\csc\\cot\\).",
    lesson:
      "Derivatives of the remaining four trig functions follow from the quotient rule applied to sine and cosine identities:\n- \\(\\tan x = \\sin x / \\cos x \\Rightarrow \\tan' x = \\sec^2 x\\)\n- \\(\\cot x = \\cos x / \\sin x \\Rightarrow \\cot' x = -\\csc^2 x\\)\n- \\(\\sec x = 1/\\cos x \\Rightarrow \\sec' x = \\sec x \\tan x\\)\n- \\(\\csc x = 1/\\sin x \\Rightarrow \\csc' x = -\\csc x \\cot x\\)\n\nPattern: the \"co\" versions all carry a minus sign (\\(\\cos\\), \\(\\cot\\), \\(\\csc\\) derivatives are negative).\n\nMemorize these alongside the core four. Derivations reinforce the quotient rule but on the exam you'll rarely have time to rederive.",
    keyIdeas: [
      "\\(\\tan' = \\sec^2\\); \\(\\cot' = -\\csc^2\\).",
      "\\(\\sec' = \\sec\\tan\\); \\(\\csc' = -\\csc\\cot\\).",
      "\"Co\" versions are negative.",
      "All derive from quotient rule on sine/cosine.",
    ],
    commonMistakes: [
      "Forgetting the minus on \\(\\cot'\\) and \\(\\csc'\\).",
      "Writing \\(\\sec' = \\sec^2\\) (that's \\(\\tan'\\)).",
      "Mixing up \\(\\csc'\\) and \\(\\sec'\\).",
    ],
  },

  // =========================================================================
  // UNIT 3 — DIFFERENTIATION: COMPOSITE, IMPLICIT, AND INVERSE FUNCTIONS
  // =========================================================================
  "3.1": {
    id: "3.1",
    title: "The Chain Rule",
    summary:
      "\\((f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)\\) — derivative of the outer at the inner, times derivative of the inner.",
    lesson:
      "The chain rule is the tool for compositions. If \\(y = f(u)\\) and \\(u = g(x)\\), then \\(\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}\\).\n\nIn practice: (1) identify the outer and inner functions, (2) differentiate the outer at the inner, keeping the inner symbolic, (3) multiply by the derivative of the inner.\n\nExample: \\(y = \\sin(x^2)\\). Outer: \\(\\sin\\), inner: \\(x^2\\). \\(y' = \\cos(x^2) \\cdot 2x\\).\n\nCompositions of compositions chain further: \\(y = \\sqrt{\\sin(x^2)}\\) needs three differentiations multiplied together. Always peel from the outside in.\n\nThe chain rule shows up everywhere downstream — implicit differentiation, related rates, u-sub in integration. Learn it cold.",
    keyIdeas: [
      "Chain: outer' at inner times inner'.",
      "Compose rules by peeling layers from the outside in.",
      "Nested compositions multiply more factors.",
      "Most downstream calc techniques rely on the chain rule in some form.",
    ],
    workedExample: {
      prompt:
        "Differentiate \\(y = (3x^2+1)^5\\).",
      solution:
        "Outer is \\(u^5\\), inner is \\(u = 3x^2+1\\). \\(y' = 5(3x^2+1)^4 \\cdot 6x = 30x(3x^2+1)^4\\).",
    },
    commonMistakes: [
      "Forgetting to multiply by the derivative of the inner function.",
      "Differentiating the inner function before the outer, changing the result.",
      "Miscounting layers in a double or triple composition.",
    ],
  },
  "3.2": {
    id: "3.2",
    title: "Implicit Differentiation",
    summary:
      "Differentiate both sides of an equation with respect to \\(x\\), treating \\(y\\) as a function of \\(x\\) via the chain rule, then solve for \\(dy/dx\\).",
    lesson:
      "When \\(y\\) is defined implicitly by an equation like \\(x^2 + y^2 = 25\\), you can't always solve for \\(y\\) explicitly. Instead differentiate both sides with respect to \\(x\\). Every \\(y\\) term gets a \\(dy/dx\\) attached (by the chain rule, since \\(y\\) depends on \\(x\\)).\n\nExample: \\(x^2 + y^2 = 25\\) differentiates to \\(2x + 2y\\, dy/dx = 0\\), so \\(dy/dx = -x/y\\).\n\nAlgorithm: (1) differentiate term by term, (2) collect \\(dy/dx\\) terms on one side, (3) factor and solve.\n\nImplicit differentiation is the foundation for differentiating inverse functions (3.3–3.4) and for related rates (4.4–4.5).",
    keyIdeas: [
      "Treat \\(y\\) as a function of \\(x\\); use chain rule on \\(y\\)-terms.",
      "After differentiating, solve algebraically for \\(dy/dx\\).",
      "Use product rule when an \\(xy\\) or similar product appears.",
      "Substitute the given point only after solving.",
    ],
    workedExample: {
      prompt:
        "Find \\(dy/dx\\) for \\(x^2 + xy + y^2 = 7\\).",
      solution:
        "Differentiate: \\(2x + (y + x\\, dy/dx) + 2y\\, dy/dx = 0\\). Collect: \\(dy/dx (x + 2y) = -(2x + y)\\). So \\(dy/dx = -(2x+y)/(x+2y)\\).",
    },
    commonMistakes: [
      "Forgetting the \\(dy/dx\\) when differentiating a \\(y\\)-term.",
      "Skipping the product rule on mixed terms like \\(xy\\).",
      "Leaving \\(dy/dx\\) trapped inside parentheses instead of solving for it.",
    ],
  },
  "3.3": {
    id: "3.3",
    title: "Differentiating Inverse Functions",
    summary:
      "If \\(y = f^{-1}(x)\\), then \\((f^{-1})'(x) = 1/f'(f^{-1}(x))\\).",
    lesson:
      "If \\(f\\) is differentiable and invertible at \\(a\\), and \\(b = f(a)\\), then \\((f^{-1})'(b) = 1/f'(a)\\). In words: the derivative of the inverse at \\(b\\) is the reciprocal of the derivative of \\(f\\) at the matching input \\(a\\).\n\nDerivation: \\(f(f^{-1}(x)) = x\\). Differentiate both sides: \\(f'(f^{-1}(x)) \\cdot (f^{-1})'(x) = 1\\). Solve for \\((f^{-1})'(x)\\).\n\nAP questions typically give a table of \\(f\\) and \\(f'\\) values and ask for \\((f^{-1})'(b)\\) for some \\(b\\). Find \\(a\\) such that \\(f(a)=b\\), then compute \\(1/f'(a)\\).",
    keyIdeas: [
      "\\((f^{-1})'(b) = 1/f'(a)\\) where \\(f(a) = b\\).",
      "Derivation uses implicit differentiation of \\(f(f^{-1}(x)) = x\\).",
      "Look up \\(a\\) from a table before evaluating \\(f'\\).",
      "\\(f'(a)\\) must be nonzero for the inverse to be differentiable at \\(b\\).",
    ],
    workedExample: {
      prompt:
        "\\(f(2)=5\\) and \\(f'(2)=3\\). Find \\((f^{-1})'(5)\\).",
      solution:
        "Since \\(f(2)=5\\), take \\(a=2\\). \\((f^{-1})'(5) = 1/f'(2) = 1/3\\).",
    },
    commonMistakes: [
      "Evaluating \\(f'\\) at the inverse's input instead of at the preimage.",
      "Forgetting to invert the fraction at the end.",
      "Applying when \\(f'(a) = 0\\), where the formula breaks.",
    ],
  },
  "3.4": {
    id: "3.4",
    title: "Differentiating Inverse Trigonometric Functions",
    summary:
      "Memorize the six inverse-trig derivatives; they're all rational functions in \\(x\\).",
    lesson:
      "The six inverse-trig derivatives:\n- \\(\\frac{d}{dx}[\\arcsin x] = \\frac{1}{\\sqrt{1-x^2}}\\)\n- \\(\\frac{d}{dx}[\\arccos x] = -\\frac{1}{\\sqrt{1-x^2}}\\)\n- \\(\\frac{d}{dx}[\\arctan x] = \\frac{1}{1+x^2}\\)\n- \\(\\frac{d}{dx}[\\mathrm{arccot}\\, x] = -\\frac{1}{1+x^2}\\)\n- \\(\\frac{d}{dx}[\\mathrm{arcsec}\\, x] = \\frac{1}{|x|\\sqrt{x^2-1}}\\)\n- \\(\\frac{d}{dx}[\\mathrm{arccsc}\\, x] = -\\frac{1}{|x|\\sqrt{x^2-1}}\\)\n\nThe three \"co\" versions (\\(\\arccos\\), \\(\\mathrm{arccot}\\), \\(\\mathrm{arccsc}\\)) carry minus signs.\n\nDerive from \\(\\sin(\\arcsin x) = x\\): differentiate implicitly, use \\(\\cos^2 + \\sin^2 = 1\\). On the AP exam you apply these with the chain rule inside: \\(\\frac{d}{dx}[\\arctan(2x)] = \\frac{2}{1+(2x)^2}\\).",
    keyIdeas: [
      "\\(\\arcsin' = 1/\\sqrt{1-x^2}\\); \\(\\arctan' = 1/(1+x^2)\\).",
      "The three co-functions carry minus signs.",
      "Apply chain rule inside as needed.",
      "Check domain: \\(\\arcsin'\\) and \\(\\arccos'\\) require \\(|x|<1\\).",
    ],
    workedExample: {
      prompt:
        "Differentiate \\(y = \\arctan(x^2)\\).",
      solution:
        "Chain: \\(y' = \\frac{1}{1+(x^2)^2} \\cdot 2x = \\frac{2x}{1+x^4}\\).",
    },
    commonMistakes: [
      "Forgetting the chain rule when the argument is more than just \\(x\\).",
      "Dropping the minus sign on the co-functions.",
      "Writing \\(\\arcsin' = 1/\\cos x\\) — the derivative is in terms of \\(x\\), not an angle.",
    ],
  },
  "3.5": {
    id: "3.5",
    title: "Selecting Procedures for Calculating Derivatives",
    summary:
      "Triage each expression: identify the outermost operation and pick the matching rule before getting into details.",
    lesson:
      "Before computing any derivative, classify the expression:\n- **Sum/difference**: differentiate term-by-term.\n- **Constant multiple**: factor it out.\n- **Product of two functions of \\(x\\)**: product rule.\n- **Quotient**: quotient rule, or rewrite as a product with a negative exponent.\n- **Composition** (something inside something else): chain rule.\n- **Implicit** (\\(y\\) appears on both sides): differentiate implicitly.\n- **Inverse trig or inverse function**: use the appropriate formula.\n\nOften multiple rules apply in sequence. Differentiate \\(\\sin(x e^x)\\): chain first (outer \\(\\sin\\), inner \\(xe^x\\)), then product rule on the inner. Planning beforehand prevents two-page algebra messes.",
    keyIdeas: [
      "Diagnose the outermost operation first.",
      "Chain rule is often needed after product/quotient.",
      "Rewrite to simplify when possible (e.g., \\(1/f = f^{-1}\\)).",
      "Most exam derivatives require combining two or three rules.",
    ],
    commonMistakes: [
      "Applying the product rule when one factor is a constant.",
      "Missing the chain rule when the inner function isn't simply \\(x\\).",
      "Overcomplicating when a quick rewrite avoids a rule altogether.",
    ],
  },
  "3.6": {
    id: "3.6",
    title: "Calculating Higher-Order Derivatives",
    summary:
      "Differentiate repeatedly to get \\(f''\\), \\(f'''\\), \\(f^{(n)}\\). Second and third derivatives are the most common on AP.",
    lesson:
      "The second derivative \\(f''(x)\\) is the derivative of \\(f'(x)\\). Physically: if \\(s\\) is position, \\(s'\\) is velocity, \\(s''\\) is acceleration. Geometrically: \\(f''\\) controls concavity (Unit 5).\n\nHigher-order derivatives just keep going. Notation: \\(f''(x)\\), \\(f'''(x)\\), \\(f^{(4)}(x)\\), \\(d^n y/dx^n\\).\n\nPatterns help: derivatives of \\(\\sin x\\) cycle through \\(\\cos, -\\sin, -\\cos, \\sin\\) with period 4. Derivatives of \\(e^{ax}\\) pile up factors of \\(a\\). The \\(n\\)th derivative of \\(x^n\\) is \\(n!\\); further derivatives are 0.\n\nFor implicit functions, computing \\(d^2y/dx^2\\) requires differentiating \\(dy/dx\\) again — keep chain rule fully deployed.",
    keyIdeas: [
      "Iterate the derivative to get higher orders.",
      "Physical interpretations: position → velocity → acceleration.",
      "Trig and exponential derivatives show recognizable cycles.",
      "Implicit higher-order derivatives need chain rule reapplied to \\(dy/dx\\).",
    ],
    workedExample: {
      prompt:
        "Find \\(f''(x)\\) for \\(f(x) = e^{3x}\\).",
      solution:
        "\\(f'(x) = 3e^{3x}\\). \\(f''(x) = 9e^{3x}\\).",
    },
    commonMistakes: [
      "Writing \\(f''(x) = (f'(x))^2\\) — that's squaring, not differentiating again.",
      "Losing track of chain factors when computing higher-order implicit derivatives.",
      "Stopping at \\(f'\\) when the question asks for \\(f''\\).",
    ],
  },

  // =========================================================================
  // UNIT 4 — CONTEXTUAL APPLICATIONS OF DIFFERENTIATION
  // =========================================================================
  "4.1": {
    id: "4.1",
    title: "Interpreting the Meaning of the Derivative in Context",
    summary:
      "\\(f'(a)\\) is the instantaneous rate of change of \\(f\\) at \\(x=a\\), in units of \\(f\\) per unit of \\(x\\).",
    lesson:
      "On applied FRQs, you must interpret derivative values in the units of the problem. If \\(f(t)\\) is gallons of water in a tank at time \\(t\\) minutes, then \\(f'(5) = 2\\) means \"at \\(t=5\\) minutes, the water volume is increasing at 2 gallons per minute.\"\n\nStandard interpretation template: \"At [input value], [quantity] is [increasing/decreasing] at [|f'(a)|] [units of f per unit of x].\" Use exactly those components. Skip any and lose points.\n\nSign matters. Positive derivative = increasing; negative = decreasing. State which in words, not just the number.",
    keyIdeas: [
      "Units of \\(f'\\) are (units of \\(f\\)) per (units of \\(x\\)).",
      "State: at \\(x=a\\), \\(f\\) is increasing/decreasing at \\(|f'(a)|\\) units per unit.",
      "Interpret sign as direction of change.",
      "AP rubrics are strict about units and full sentences.",
    ],
    workedExample: {
      prompt:
        "\\(P(t)\\) is a town's population (thousands) at year \\(t\\), and \\(P'(10) = 0.8\\). Interpret.",
      solution:
        "At year 10, the population is increasing at 0.8 thousand (800) people per year.",
    },
    commonMistakes: [
      "Giving just the number without units or a sentence.",
      "Mistaking the sign and saying \"decreasing\" for a positive derivative.",
      "Dropping the rate-over-time language in favor of a plain statement of value.",
    ],
  },
  "4.2": {
    id: "4.2",
    title: "Straight-Line Motion: Position, Velocity, Acceleration",
    summary:
      "If \\(s(t)\\) is position, then \\(v(t) = s'(t)\\) is velocity and \\(a(t) = v'(t) = s''(t)\\) is acceleration.",
    lesson:
      "Motion along a line is the canonical derivative application. Velocity is the signed rate of change of position — positive velocity means moving in the positive direction. Acceleration is the rate of change of velocity.\n\nSpeed is \\(|v(t)|\\) — always nonnegative. A particle is speeding up when \\(v\\) and \\(a\\) have the same sign (both positive or both negative). Slowing down when they have opposite signs. This is a staple FRQ ask.\n\nA particle changes direction when \\(v(t) = 0\\) and \\(v\\) changes sign. Not every zero of \\(v\\) is a direction change — check the sign on both sides.",
    keyIdeas: [
      "\\(v = s'\\), \\(a = v' = s''\\).",
      "Speed = \\(|v|\\), not \\(v\\).",
      "Speeding up ⇔ \\(v\\) and \\(a\\) same sign.",
      "Direction change ⇔ \\(v\\) changes sign (not just hits zero).",
    ],
    workedExample: {
      prompt:
        "A particle has \\(s(t) = t^3 - 6t^2 + 9t\\). Is the particle speeding up or slowing down at \\(t=1\\)?",
      solution:
        "\\(v(t) = 3t^2 - 12t + 9\\); \\(v(1) = 0\\). At the boundary itself the particle is momentarily at rest — neither speeding up nor slowing down. Check a moment after: \\(v(1.1) < 0\\) and \\(a(t) = 6t-12\\), \\(a(1) = -6 < 0\\). After \\(t=1\\), both are negative so it's speeding up.",
    },
    commonMistakes: [
      "Conflating speed with velocity.",
      "Calling every zero of velocity a direction change.",
      "Saying \"speeding up\" based on \\(v\\) alone; you need \\(v\\) and \\(a\\).",
    ],
  },
  "4.3": {
    id: "4.3",
    title: "Rates of Change in Applied Contexts Other Than Motion",
    summary:
      "Any quantity with units can be differentiated; interpret \\(f'\\) in the units of \\(f\\) per unit of the input variable.",
    lesson:
      "Calc FRQs feature oil tanks, car washes, factories, reservoirs, rabbit populations — anything where a quantity depends on time or another variable. The math is the same: the derivative measures the instantaneous rate of change.\n\nSet-up skill: translate the prose into equations. \"Water flows in at a rate of \\(R(t)\\) gallons per hour\" means if \\(V\\) is volume, then \\(dV/dt = R(t)\\). \"The concentration doubles every 5 minutes\" means the concentration satisfies \\(C(t) = C_0 e^{kt}\\) with \\(k = \\ln 2 / 5\\).\n\nInterpretation always uses the same template from 4.1.",
    keyIdeas: [
      "Rate of change = derivative; units follow naturally.",
      "Translate word problems carefully: \"rate\" usually means \\(d(\\text{quantity})/dt\\).",
      "Exponential growth/decay problems reduce to \\(y = y_0 e^{kt}\\).",
      "Always interpret answers in context with units.",
    ],
    commonMistakes: [
      "Confusing rate of change with total change.",
      "Using the wrong variable as the input (e.g., treating a function of temperature as a function of time).",
      "Forgetting units in the final interpretation.",
    ],
  },
  "4.4": {
    id: "4.4",
    title: "Introduction to Related Rates",
    summary:
      "Related rates problems link two or more time-dependent quantities by an equation, then differentiate with respect to \\(t\\).",
    lesson:
      "When several quantities change simultaneously and are related by a formula, their rates of change are linked. Differentiate the relationship implicitly with respect to \\(t\\), then substitute known values to solve for the unknown rate.\n\nExample setup: a spherical balloon inflates. Volume and radius are related by \\(V = \\frac{4}{3}\\pi r^3\\). Differentiating: \\(dV/dt = 4\\pi r^2 \\cdot dr/dt\\). If you know \\(dV/dt\\) and \\(r\\) at a moment, you can solve for \\(dr/dt\\).\n\nThe key skills are picking the right formula, differentiating it correctly, and not substituting numerical values until after you have the derivative — substituting too early kills your chain rule.",
    keyIdeas: [
      "Find the static equation relating the quantities first.",
      "Differentiate implicitly with respect to \\(t\\).",
      "Substitute numerical values only after taking the derivative.",
      "All variables depend on \\(t\\); apply the chain rule to each.",
    ],
    commonMistakes: [
      "Substituting numbers before differentiating — loses variable-rate terms.",
      "Forgetting that every \\(r\\) or \\(V\\) term contributes a \\(dr/dt\\) or \\(dV/dt\\) factor.",
      "Using the wrong geometric formula.",
    ],
  },
  "4.5": {
    id: "4.5",
    title: "Solving Related Rates Problems",
    summary:
      "Follow the five-step algorithm: diagram, variables, equation, differentiate, substitute and solve.",
    lesson:
      "Step-by-step recipe for any related-rates problem:\n1. **Sketch.** Draw the scenario; label lengths with variables.\n2. **Assign variables.** Pick letters for the quantities that change.\n3. **Write the relating equation.** Usually Pythagorean, area, volume, trig.\n4. **Differentiate implicitly** with respect to \\(t\\).\n5. **Substitute known values** and solve for the unknown rate.\n\nInclude units at the end. If \\(dr/dt\\) is in meters per minute, state that explicitly.\n\nClassic setups: ladder sliding (Pythagorean), conical tank (similar triangles to reduce variables), shadow length (similar triangles), balloon inflating (volume). Know these archetypes; the algebra is usually the same once you have the equation.",
    keyIdeas: [
      "Five-step algorithm: sketch, variables, equation, differentiate, solve.",
      "Classic archetypes: ladder, cone, shadow, balloon.",
      "Reduce variables using similar triangles before differentiating if you can.",
      "Always include units in the final answer.",
    ],
    workedExample: {
      prompt:
        "A 10-ft ladder leans against a wall. The base slides away at 2 ft/s. How fast is the top sliding down when the base is 6 ft from the wall?",
      solution:
        "Let \\(x\\) be the base and \\(y\\) the height. \\(x^2 + y^2 = 100\\). Differentiate: \\(2x\\, dx/dt + 2y\\, dy/dt = 0\\). At \\(x=6\\), \\(y = \\sqrt{64} = 8\\), \\(dx/dt = 2\\). So \\(12(2) + 16\\, dy/dt = 0 \\Rightarrow dy/dt = -3/2\\) ft/s. Top slides down at 1.5 ft/s.",
    },
    commonMistakes: [
      "Using \\(y = \\sqrt{100 - x^2}\\) and differentiating it directly — harder than implicit.",
      "Forgetting the negative sign on \\(dy/dt\\) (the height is decreasing).",
      "Substituting values too early.",
    ],
  },
  "4.6": {
    id: "4.6",
    title: "Approximating Values of a Function Using Local Linearity",
    summary:
      "Near \\(x=a\\), \\(f(x) \\approx f(a) + f'(a)(x-a)\\) — the tangent-line (linear) approximation.",
    lesson:
      "The tangent line at \\(x=a\\) is \\(L(x) = f(a) + f'(a)(x-a)\\). Near \\(a\\), \\(L(x)\\) approximates \\(f(x)\\). This is the linearization — the first-order Taylor approximation.\n\nTo estimate \\(f(2.1)\\) when you know \\(f(2)\\) and \\(f'(2)\\): plug into the linear formula. Error shrinks as \\(x\\) gets closer to \\(a\\).\n\nOver- or under-approximation is controlled by concavity. If \\(f\\) is concave up at \\(a\\), the tangent line sits below \\(f\\), so \\(L(x)\\) underestimates \\(f(x)\\). Concave down: tangent sits above, so \\(L\\) overestimates.\n\nAP FRQs ask you to approximate a function value using a tangent line and then state whether the approximation is an over- or under-estimate based on concavity. Memorize both halves of that protocol.",
    keyIdeas: [
      "Linearization: \\(L(x) = f(a) + f'(a)(x-a)\\).",
      "Use for quick estimates of \\(f(x)\\) near \\(a\\).",
      "Concave up at \\(a\\) ⇒ tangent below ⇒ underestimate. Concave down ⇒ overestimate.",
      "Error grows as \\(|x-a|\\) grows.",
    ],
    workedExample: {
      prompt:
        "\\(f(1) = 4\\), \\(f'(1) = 3\\), \\(f''(1) = -2\\). Estimate \\(f(1.1)\\) and state over/under.",
      solution:
        "\\(L(1.1) = 4 + 3(0.1) = 4.3\\). \\(f''(1) < 0\\) means concave down, so tangent is above \\(f\\); 4.3 is an overestimate.",
    },
    commonMistakes: [
      "Swapping over- and underestimate based on \\(f''\\) sign.",
      "Using \\(L(a)\\) instead of \\(L(x)\\) with \\(x\\) not at \\(a\\).",
      "Not stating which direction the estimate leans.",
    ],
  },
  "4.7": {
    id: "4.7",
    title: "Using L'Hôpital's Rule for Indeterminate Forms",
    summary:
      "If \\(\\lim f/g\\) is \\(0/0\\) or \\(\\infty/\\infty\\), then \\(\\lim f/g = \\lim f'/g'\\) (when the second limit exists).",
    lesson:
      "L'Hôpital's Rule: if \\(\\lim_{x\\to a} f(x) = \\lim_{x\\to a} g(x) = 0\\) (or both \\(\\pm\\infty\\)), and \\(g'(x) \\ne 0\\) near \\(a\\), then \\(\\lim_{x\\to a} f(x)/g(x) = \\lim_{x\\to a} f'(x)/g'(x)\\) when the latter exists.\n\nApply repeatedly if the first application yields another indeterminate form. For forms \\(0 \\cdot \\infty\\), \\(\\infty - \\infty\\), \\(0^0\\), \\(1^\\infty\\), \\(\\infty^0\\), convert to \\(0/0\\) or \\(\\infty/\\infty\\) first — usually via rewriting or taking logs.\n\nWrite down the check every time: \"direct sub gives 0/0; L'Hôpital applies.\" Skipping the form check is a common point-loss.",
    keyIdeas: [
      "Check the form is \\(0/0\\) or \\(\\infty/\\infty\\) before using L'Hôpital.",
      "Differentiate numerator and denominator separately, not as a quotient.",
      "Repeat if the new limit is still indeterminate.",
      "Convert other indeterminate forms (\\(0 \\cdot \\infty\\), etc.) first.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\lim_{x\\to 0}\\frac{\\sin x}{x}\\) using L'Hôpital.",
      solution:
        "Direct: \\(0/0\\). L'Hôpital: \\(\\lim_{x\\to 0}\\frac{\\cos x}{1} = 1\\).",
    },
    commonMistakes: [
      "Applying L'Hôpital to a form that isn't indeterminate.",
      "Differentiating \\(f/g\\) as a single quotient (via quotient rule) rather than numerator and denominator separately.",
      "Stopping after one application when the form is still indeterminate.",
    ],
  },

  // =========================================================================
  // UNIT 5 — ANALYTICAL APPLICATIONS OF DIFFERENTIATION
  // =========================================================================
  "5.1": {
    id: "5.1",
    title: "Using the Mean Value Theorem",
    summary:
      "If \\(f\\) is continuous on \\([a,b]\\) and differentiable on \\((a,b)\\), some \\(c\\in(a,b)\\) has \\(f'(c) = (f(b)-f(a))/(b-a)\\).",
    lesson:
      "The MVT guarantees a point where the instantaneous slope matches the average slope. Geometrically: somewhere on a smooth curve, the tangent is parallel to the secant from \\(a\\) to \\(b\\).\n\nFRQ template: \"Justify that there exists \\(c\\) with \\(f'(c) = 3\\).\" Check (1) \\(f\\) is continuous on \\([a,b]\\), (2) differentiable on \\((a,b)\\), (3) average slope = 3. Cite MVT.\n\nThe MVT is the reason several other results work (Rolle's Theorem is the special case \\(f(a) = f(b)\\), giving \\(f'(c)=0\\)). It also underpins the rule that if \\(f' > 0\\) on an interval, \\(f\\) is increasing there.",
    keyIdeas: [
      "Needs continuity on \\([a,b]\\) and differentiability on \\((a,b)\\).",
      "Conclusion: \\(\\exists c\\in (a,b)\\) with \\(f'(c) = (f(b)-f(a))/(b-a)\\).",
      "Rolle's Theorem is the special case \\(f(a) = f(b)\\).",
      "Used to justify statements about \\(f'\\) existence and signs.",
    ],
    workedExample: {
      prompt:
        "Apply the MVT to \\(f(x) = x^2\\) on \\([1,3]\\) and find the \\(c\\).",
      solution:
        "\\(f\\) is continuous and differentiable everywhere. Average slope = \\((9-1)/2 = 4\\). \\(f'(c) = 2c = 4 \\Rightarrow c=2\\). Consistent with MVT.",
    },
    commonMistakes: [
      "Skipping the hypothesis check.",
      "Finding \\(c\\) outside \\((a,b)\\) — that violates the theorem.",
      "Confusing MVT (about slopes) with IVT (about values).",
    ],
  },
  "5.2": {
    id: "5.2",
    title: "Extreme Value Theorem, Global vs. Local Extrema, Critical Points",
    summary:
      "EVT: continuous \\(f\\) on \\([a,b]\\) attains an absolute max and min. Candidates: critical points and endpoints.",
    lesson:
      "A **critical point** of \\(f\\) is an interior point where \\(f'=0\\) or \\(f'\\) is undefined. **Local extrema** occur only at critical points (Fermat's Theorem). **Global extrema** on a closed interval occur either at critical points or at endpoints.\n\nThe **Candidates Test**: to find absolute max/min on \\([a,b]\\), evaluate \\(f\\) at every critical point in \\((a,b)\\) and at both endpoints, then pick the largest and smallest.\n\nThe EVT guarantees the extrema exist — on open intervals or without continuity, they may not.",
    keyIdeas: [
      "EVT requires continuity on a closed interval.",
      "Critical point: interior \\(x\\) with \\(f'=0\\) or \\(f'\\) undefined.",
      "Local extrema happen at critical points.",
      "Global extrema on \\([a,b]\\): test critical points and endpoints.",
    ],
    commonMistakes: [
      "Forgetting endpoints in the candidates test.",
      "Treating every zero of \\(f'\\) as an extremum (not all critical points are extrema).",
      "Applying EVT on an open interval or with a discontinuity.",
    ],
  },
  "5.3": {
    id: "5.3",
    title: "Determining Intervals of Increase/Decrease",
    summary:
      "\\(f\\) is increasing where \\(f' > 0\\), decreasing where \\(f' < 0\\).",
    lesson:
      "Compute \\(f'\\), find its sign on each interval between zeros and undefined points, and label increasing or decreasing.\n\nAlgorithm: find critical points, put them on a number line, test a point in each interval. Note the sign of \\(f'\\) in each. Intervals with positive \\(f'\\): \\(f\\) is increasing. Negative \\(f'\\): \\(f\\) is decreasing.\n\nFRQ wording: give intervals in interval notation like \\((-\\infty, 2)\\) and \\((2, \\infty)\\). Use parentheses at critical points — graders typically accept either open or closed at interior critical points but are strict about at least being consistent.",
    keyIdeas: [
      "\\(f' > 0\\) ⇒ increasing; \\(f' < 0\\) ⇒ decreasing.",
      "Test signs of \\(f'\\) in each interval formed by critical points.",
      "Report intervals in standard notation.",
      "If \\(f'\\) is undefined at a point, include it as a boundary.",
    ],
    workedExample: {
      prompt:
        "Find intervals of increase/decrease for \\(f(x) = x^3 - 3x\\).",
      solution:
        "\\(f'(x) = 3x^2 - 3 = 3(x-1)(x+1)\\). Zeros at \\(x=\\pm 1\\). Test: \\(f'(-2) = 9 > 0\\) (inc), \\(f'(0) = -3 < 0\\) (dec), \\(f'(2) = 9 > 0\\) (inc). Increasing on \\((-\\infty, -1)\\) and \\((1, \\infty)\\); decreasing on \\((-1, 1)\\).",
    },
    commonMistakes: [
      "Confusing the sign of \\(f\\) with the sign of \\(f'\\).",
      "Forgetting to include all critical points — including where \\(f'\\) is undefined.",
      "Giving intervals in the wrong direction.",
    ],
  },
  "5.4": {
    id: "5.4",
    title: "First Derivative Test",
    summary:
      "At a critical point, \\(f' \\) changing from + to \\(-\\) signals a local max; \\(-\\) to + signals a local min.",
    lesson:
      "At a critical point \\(c\\):\n- \\(f'\\) goes \\(+ \\to -\\) ⇒ local maximum.\n- \\(f'\\) goes \\(- \\to +\\) ⇒ local minimum.\n- \\(f'\\) has the same sign on both sides ⇒ neither.\n\nRecipe: build the sign chart from 5.3. At each critical point, read off the transition.\n\nFRQ language: \"At \\(x = c\\), \\(f'\\) changes from positive to negative, so \\(f\\) has a local maximum at \\(x = c\\).\" Include the transition in words — the rubric wants the reasoning.",
    keyIdeas: [
      "+ to \\(-\\): local max. \\(-\\) to +: local min.",
      "Same sign on both sides: not an extremum.",
      "Build the sign chart from factored \\(f'\\).",
      "State the transition on FRQs.",
    ],
    commonMistakes: [
      "Concluding an extremum without checking the sign change.",
      "Mixing up which direction is max vs. min.",
      "Failing to state the reasoning (just writing an answer loses points).",
    ],
  },
  "5.5": {
    id: "5.5",
    title: "Candidates Test for Absolute Extrema",
    summary:
      "For absolute extrema on \\([a,b]\\), evaluate \\(f\\) at each critical point and each endpoint; take the largest and smallest.",
    lesson:
      "Algorithm:\n1. Find all critical points in \\((a,b)\\).\n2. List critical points and both endpoints.\n3. Evaluate \\(f\\) at each.\n4. The largest value is the absolute max; the smallest is the absolute min.\n\nThis is mechanical but requires care with endpoints and arithmetic. Graders always want the list of candidates with values, not a free-form argument.\n\nOn \\([a,b]\\) the EVT guarantees the extrema exist. On \\((a,b)\\) or an unbounded interval, extrema may not exist — don't apply the test blindly.",
    keyIdeas: [
      "Candidates: interior critical points + both endpoints.",
      "Evaluate \\(f\\) at each; pick max and min of those values.",
      "Works on closed intervals thanks to EVT.",
      "Present as a table or list on FRQs.",
    ],
    workedExample: {
      prompt:
        "Find absolute extrema of \\(f(x) = x^3 - 3x\\) on \\([-2, 2]\\).",
      solution:
        "Critical points: \\(f'(x)=3x^2-3=0 \\Rightarrow x=\\pm 1\\). Values: \\(f(-2) = -2\\), \\(f(-1)=2\\), \\(f(1)=-2\\), \\(f(2)=2\\). Absolute max \\(=2\\) at \\(x=-1, 2\\); absolute min \\(=-2\\) at \\(x=-2, 1\\).",
    },
    commonMistakes: [
      "Skipping endpoints.",
      "Using critical points outside the interval.",
      "Reporting only local extrema when the question asks for absolute.",
    ],
  },
  "5.6": {
    id: "5.6",
    title: "Determining Concavity of Functions",
    summary:
      "\\(f\\) is concave up where \\(f'' > 0\\), concave down where \\(f'' < 0\\).",
    lesson:
      "Second derivative controls concavity: \\(f'' > 0\\) means the graph curves upward (smiles); \\(f'' < 0\\) means it curves downward (frowns).\n\nConcavity is about how the slope is changing, not how \\(f\\) is changing. A function can be increasing and concave down (slowing its increase) or decreasing and concave up (slowing its decrease).\n\nInflection points occur where concavity changes. Candidates: zeros and undefined points of \\(f''\\). Confirm a sign change on either side — not every zero of \\(f''\\) is an inflection point.",
    keyIdeas: [
      "\\(f'' > 0\\) ⇒ concave up; \\(f'' < 0\\) ⇒ concave down.",
      "Concavity = behavior of the slope, not of \\(f\\).",
      "Inflection point: sign change of \\(f''\\).",
      "Not every zero of \\(f''\\) is an inflection point.",
    ],
    commonMistakes: [
      "Confusing concavity with increasing/decreasing.",
      "Calling every zero of \\(f''\\) an inflection point.",
      "Mixing up \"up\" and \"down\" when the graph bends in one direction.",
    ],
  },
  "5.7": {
    id: "5.7",
    title: "Second Derivative Test for Extrema",
    summary:
      "At a critical point \\(c\\): \\(f''(c) > 0\\) → local min; \\(f''(c) < 0\\) → local max; \\(f''(c) = 0\\) → test inconclusive.",
    lesson:
      "If \\(f'(c) = 0\\), use the second derivative as a shortcut:\n- \\(f''(c) > 0\\) ⇒ local minimum (concave up at the critical point).\n- \\(f''(c) < 0\\) ⇒ local maximum (concave down).\n- \\(f''(c) = 0\\) ⇒ test fails; fall back to the first derivative test.\n\nIt's faster than the first derivative test when \\(f''\\) is easy to compute. It's inconclusive at higher-order flat points (\\(f(x) = x^4\\) at 0, for example, has \\(f''(0) = 0\\) but is a local minimum).",
    keyIdeas: [
      "Sign of \\(f''(c)\\) decides local max vs. min at a critical point.",
      "\\(f''(c) = 0\\) is inconclusive — use the first derivative test.",
      "Only applies at interior critical points where \\(f'(c) = 0\\).",
      "Faster than the first derivative test when \\(f''\\) is simple.",
    ],
    commonMistakes: [
      "Flipping max and min.",
      "Using the test when \\(f''(c) = 0\\) and concluding no extremum.",
      "Applying the test at a point where \\(f'(c) \\neq 0\\).",
    ],
  },
  "5.8": {
    id: "5.8",
    title: "Sketching Graphs of Functions and Their Derivatives",
    summary:
      "A graph of \\(f'\\) tells you where \\(f\\) is increasing/decreasing and where its extrema are. A graph of \\(f''\\) tells you concavity and inflection points.",
    lesson:
      "Translation table between graphs:\n- \\(f' > 0\\) ⇔ \\(f\\) increasing.\n- \\(f' = 0\\) at a sign change ⇔ local extremum of \\(f\\).\n- \\(f'\\) increasing ⇔ \\(f\\) concave up (\\(f'' > 0\\)).\n- \\(f''\\) sign change ⇔ \\(f\\) inflection point.\n\nOn FRQs you're often given the graph of \\(f'\\) and asked about \\(f\\). Key: the heights of \\(f'\\) are the slopes of \\(f\\), not values of \\(f\\). Don't confuse them.\n\nBuilding \\(f\\) from \\(f'\\): where \\(f'\\) is above the \\(x\\)-axis, \\(f\\) rises. Where \\(f'\\) is below, \\(f\\) falls. The amount \\(f\\) rises/falls corresponds to the area under \\(f'\\) (foreshadowing integration in Unit 6).",
    keyIdeas: [
      "Heights of \\(f'\\) are slopes of \\(f\\).",
      "\\(f'\\) zeros with sign change ⇔ \\(f\\) extrema.",
      "\\(f'\\) increasing ⇔ \\(f\\) concave up.",
      "Reading graph questions are translation exercises — learn the dictionary.",
    ],
    commonMistakes: [
      "Reading \\(f'\\) values as \\(f\\) values.",
      "Mis-identifying extrema from the graph of \\(f\\) as extrema of \\(f'\\).",
      "Forgetting that \\(f'\\) below the axis means \\(f\\) decreasing, not \\(f\\) negative.",
    ],
  },
  "5.9": {
    id: "5.9",
    title: "Connecting \\(f\\), \\(f'\\), and \\(f''\\)",
    summary:
      "Any statement about \\(f\\), \\(f'\\), or \\(f''\\) translates into statements about the others via the sign and monotonicity dictionary.",
    lesson:
      "Master the translation dictionary from 5.8 in both directions. Given \\(f\\), read off \\(f'\\) (slopes) and \\(f''\\) (concavity). Given \\(f'\\), read off where \\(f\\) rises/falls and has extrema; read off where \\(f''\\) is positive/negative from whether \\(f'\\) is rising/falling.\n\nClassic FRQ: \"The graph of \\(f'\\) is shown. Identify where \\(f\\) has a local max, where \\(f\\) is concave up, and where \\(f\\) has inflection points.\" All answers come from reading \\(f'\\)'s graph. Local max of \\(f\\) = zero of \\(f'\\) with \\(+\\to -\\) change. Concave up = \\(f'\\) increasing. Inflection = \\(f'\\) extremum (where \\(f''\\) switches sign).",
    keyIdeas: [
      "\\(f\\) extrema = \\(f'\\) zeros with sign change.",
      "\\(f\\) concave up = \\(f'\\) increasing = \\(f'' > 0\\).",
      "\\(f\\) inflection = \\(f''\\) sign change = \\(f'\\) local extremum.",
      "Practice until the translations are reflexive.",
    ],
    commonMistakes: [
      "Looking at \\(f'\\) for information about \\(f\\)'s sign (they're unrelated).",
      "Confusing \\(f'\\) extrema with \\(f\\) extrema.",
      "Missing inflection points because \\(f'\\) has a flat spot rather than a clear peak/trough.",
    ],
  },
  "5.10": {
    id: "5.10",
    title: "Introduction to Optimization Problems",
    summary:
      "Optimization: use calculus to find the maximum or minimum of a quantity subject to a constraint.",
    lesson:
      "Steps for optimization problems:\n1. Assign variables to unknowns; draw a picture if geometric.\n2. Write the quantity to optimize as a function of one variable (use the constraint to eliminate others).\n3. Determine the feasible domain.\n4. Differentiate, set equal to zero, solve for critical points.\n5. Verify max or min using first or second derivative test, or by checking endpoints.\n6. Interpret in context.\n\nThe meta-skill is translating words into an equation. Most points are lost in step 1-2 (setup), not step 4 (calculus).",
    keyIdeas: [
      "Write the objective as a function of one variable using the constraint.",
      "Find the feasible domain; it constrains which critical points are valid.",
      "Justify max or min, don't just report a critical point.",
      "Answer in context with units.",
    ],
    commonMistakes: [
      "Optimizing the constraint instead of the objective.",
      "Reporting a critical point without verifying it's the desired extremum.",
      "Ignoring the domain — sometimes the optimum is at an endpoint.",
    ],
  },
  "5.11": {
    id: "5.11",
    title: "Solving Optimization Problems",
    summary:
      "Apply the optimization protocol to area, volume, cost, and distance problems — the calc is easy; the setup is what's tested.",
    lesson:
      "Standard archetypes:\n- **Fencing** a rectangular region with fixed perimeter or fixed area.\n- **Boxes** with no top, folded from a rectangular sheet.\n- **Cylinders/cones** with fixed volume and minimal surface area (can design).\n- **Distances** to points on a curve.\n- **Cost minimization** when unit costs vary by material.\n\nFor each, draw, label, write objective in two variables, use constraint to eliminate one, then optimize.\n\nAlways check endpoints of the feasible domain — sometimes the minimum is reached not at an interior critical point but at an extreme.",
    keyIdeas: [
      "Setup is the bottleneck; the derivative is trivial afterward.",
      "Constraint reduces dimension by one.",
      "Verify the extremum and justify your choice of max/min.",
      "Endpoints matter.",
    ],
    workedExample: {
      prompt:
        "A rectangular pen of area 100 m² uses fencing on three sides (one side is a wall). Minimize the fencing.",
      solution:
        "Let \\(x\\) be the length parallel to the wall, \\(y\\) the two perpendicular sides. Constraint: \\(xy = 100 \\Rightarrow x = 100/y\\). Fencing: \\(F = x + 2y = 100/y + 2y\\). \\(dF/dy = -100/y^2 + 2 = 0 \\Rightarrow y^2 = 50 \\Rightarrow y = \\sqrt{50}\\). Then \\(x = 100/\\sqrt{50} = 2\\sqrt{50}\\). Minimum fencing \\(= 4\\sqrt{50} \\approx 28.3\\) m.",
    },
    commonMistakes: [
      "Getting constraint and objective swapped.",
      "Forgetting to eliminate one variable before differentiating.",
      "Not verifying the answer is a minimum.",
    ],
  },
  "5.12": {
    id: "5.12",
    title: "Exploring Behaviors of Implicit Relations",
    summary:
      "Apply sign analysis and tangent/normal line techniques to curves defined implicitly.",
    lesson:
      "For a curve \\(F(x,y)=0\\), implicit differentiation gives \\(dy/dx\\). Use it to find tangent lines, horizontal tangents (numerator of \\(dy/dx\\) = 0), vertical tangents (denominator = 0), or intervals of increase/decrease along branches.\n\nHorizontal tangent: solve \\(dy/dx = 0\\) along with the original equation — the system gives the points.\n\nVertical tangent: denominator of \\(dy/dx\\) vanishes while numerator doesn't. These often occur at \"sharp\" points of the curve.\n\nThe implicit surface plot can have multiple branches. Handle each by considering the local behavior around each point of interest.",
    keyIdeas: [
      "Horizontal tangents: \\(dy/dx = 0\\).",
      "Vertical tangents: denominator of \\(dy/dx\\) = 0, numerator \\(\\ne 0\\).",
      "Substitute the implicit relation when solving systems.",
      "Implicit curves may have multiple branches with different behavior.",
    ],
    commonMistakes: [
      "Forgetting the implicit relation when solving for tangent points.",
      "Reporting vertical tangents where both numerator and denominator are 0 (indeterminate — need deeper analysis).",
      "Skipping the second derivative when the question asks about concavity of an implicit curve.",
    ],
  },

  // =========================================================================
  // UNIT 6 — INTEGRATION AND ACCUMULATION OF CHANGE
  // =========================================================================
  "6.1": {
    id: "6.1",
    title: "Exploring Accumulations of Change",
    summary:
      "An integral accumulates a rate over an interval: if \\(R(t)\\) is a rate, then \\(\\int_a^b R(t)\\,dt\\) is the total change from \\(a\\) to \\(b\\).",
    lesson:
      "Integration is the other core operation of calculus. Differentiation takes a function to its rate of change; integration reverses that move — given a rate, it reconstructs the accumulated total.\n\nIf water flows into a tank at \\(R(t)\\) gallons per minute, the total water added from \\(t=0\\) to \\(t=5\\) is \\(\\int_0^5 R(t)\\,dt\\). The units multiply: gallons/min times min gives gallons.\n\nThis preview motivates everything in Unit 6. Riemann sums will make the definition precise; the Fundamental Theorem will connect accumulation to antiderivatives. For now, the key is the intuition: integrals accumulate, with units that make sense.",
    keyIdeas: [
      "Integral = accumulated quantity from a rate.",
      "Units multiply: integral of rate × time = total.",
      "Positive integrand = net increase; negative = net decrease.",
      "Foreshadows Fundamental Theorem in 6.4.",
    ],
    commonMistakes: [
      "Adding units incorrectly (forgetting the \\(dt\\) contributes to units).",
      "Mistaking accumulated total for instantaneous rate.",
      "Treating the integrand sign as irrelevant — negatives subtract from the running total.",
    ],
  },
  "6.2": {
    id: "6.2",
    title: "Approximating Areas with Riemann Sums",
    summary:
      "Riemann sums approximate \\(\\int_a^b f(x)\\,dx\\) by rectangles: left, right, midpoint, or using trapezoids.",
    lesson:
      "Divide \\([a,b]\\) into \\(n\\) equal subintervals of width \\(\\Delta x = (b-a)/n\\). On each subinterval, pick a sample point and build a rectangle of height \\(f(\\text{sample})\\) and width \\(\\Delta x\\). Sum the rectangle areas.\n\n- **Left Riemann sum**: sample is the left endpoint of each subinterval.\n- **Right**: right endpoint.\n- **Midpoint**: midpoint of each subinterval.\n- **Trapezoidal rule**: average of left and right values — \\(\\frac{\\Delta x}{2}(f(x_0) + 2f(x_1) + \\cdots + 2f(x_{n-1}) + f(x_n))\\).\n\nFor an increasing function, left underestimates, right overestimates (reversed for decreasing). Midpoint and trapezoid are more accurate — midpoint is exact for linear functions too.\n\nAP FRQs often use unequal subintervals with tabular data. In that case compute each rectangle's width individually; the sum is still \\(\\sum f(\\text{sample}) \\cdot \\Delta x_i\\).",
    keyIdeas: [
      "Width \\(\\Delta x\\), height from the sample rule, product summed.",
      "Left, right, midpoint, trapezoid — each has a formula.",
      "Increasing function: left under, right over; decreasing: reversed.",
      "Trapezoidal rule uses weights 1, 2, 2, ..., 2, 1.",
    ],
    workedExample: {
      prompt:
        "Estimate \\(\\int_0^4 x^2\\,dx\\) using \\(n=4\\) left Riemann rectangles.",
      solution:
        "\\(\\Delta x = 1\\); samples \\(x=0,1,2,3\\); heights \\(0, 1, 4, 9\\). Sum \\(= 1(0+1+4+9) = 14\\). (Actual value is \\(64/3 \\approx 21.3\\) — left underestimates the increasing function.)",
    },
    commonMistakes: [
      "Using the wrong sample rule (left when asked for right, etc.).",
      "Skipping \\(\\Delta x\\) — the width is essential.",
      "Confusing trapezoid weights with Simpson weights (Simpson isn't tested on AP).",
    ],
  },
  "6.3": {
    id: "6.3",
    title: "Riemann Sums, Summation Notation, and Definite Integral Notation",
    summary:
      "As \\(n \\to \\infty\\), the Riemann sum \\(\\sum_{i=1}^n f(x_i^*)\\,\\Delta x\\) converges to the definite integral \\(\\int_a^b f(x)\\,dx\\).",
    lesson:
      "Let \\(\\Delta x = (b-a)/n\\) and choose sample points \\(x_i^*\\) in each subinterval. The Riemann sum is \\(\\sum_{i=1}^n f(x_i^*)\\,\\Delta x\\). As \\(n \\to \\infty\\), the sum converges (for continuous or bounded functions with finitely many discontinuities) to the definite integral:\n\n$$\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty}\\sum_{i=1}^n f(x_i^*)\\,\\Delta x.$$\n\nThis is the formal definition. The AP exam won't ask you to compute a limit of Riemann sums from scratch (usually), but it does ask you to recognize one. Examples:\n- \\(\\lim_{n\\to\\infty}\\sum_{i=1}^n \\frac{i}{n^2}\\) is a right Riemann sum for \\(\\int_0^1 x\\,dx\\).\n\nSpotting the pattern is a worth-learning trick: identify \\(\\Delta x\\), the sample rule, and the integrand.",
    keyIdeas: [
      "Definite integral = limit of Riemann sums.",
      "Translate sigma notation into an integral by identifying \\(\\Delta x\\) and \\(f(x_i^*)\\).",
      "\\(\\int_a^b f(x)\\,dx\\) is a number, not a function.",
      "The variable of integration is a dummy — \\(\\int_a^b f(x)\\,dx = \\int_a^b f(t)\\,dt\\).",
    ],
    commonMistakes: [
      "Treating \\(\\int_a^b f(x)\\,dx\\) as a function of \\(x\\).",
      "Mis-identifying the interval or sample rule from sigma notation.",
      "Dropping the limit or \\(\\Delta x\\) when writing the definition.",
    ],
  },
  "6.4": {
    id: "6.4",
    title: "Fundamental Theorem of Calculus and Accumulation Functions",
    summary:
      "Part 1: if \\(F(x) = \\int_a^x f(t)\\,dt\\), then \\(F'(x) = f(x)\\). Accumulation functions are built by integration.",
    lesson:
      "Define \\(F(x) = \\int_a^x f(t)\\,dt\\). This is an **accumulation function**: it measures how much \\(f\\) has accumulated from \\(a\\) to \\(x\\). The FTC Part 1 says \\(F'(x) = f(x)\\) — differentiation undoes integration.\n\nWith a variable upper bound plus chain rule: if \\(F(x) = \\int_a^{g(x)} f(t)\\,dt\\), then \\(F'(x) = f(g(x)) \\cdot g'(x)\\). The AP exam loves this — they'll ask for the derivative of an integral with, say, \\(x^2\\) as the upper bound.\n\nAnalyzing \\(F(x) = \\int_a^x f(t)\\,dt\\) graphically: sign of \\(f\\) tells you whether \\(F\\) is increasing; zeros of \\(f\\) with sign changes are local extrema of \\(F\\); \\(f' > 0\\) means \\(F'' > 0\\) (\\(F\\) concave up).",
    keyIdeas: [
      "FTC1: \\(\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)\\).",
      "Chain rule with variable upper bound: \\(\\frac{d}{dx}\\int_a^{g(x)} f(t)\\,dt = f(g(x))\\,g'(x)\\).",
      "Properties of \\(f\\) translate into properties of the accumulator \\(F\\).",
      "\\(F\\) inherits its derivative's analysis from \\(f\\).",
    ],
    workedExample: {
      prompt:
        "If \\(F(x) = \\int_0^{x^2}\\sin(t)\\,dt\\), find \\(F'(x)\\).",
      solution:
        "Chain: \\(F'(x) = \\sin(x^2) \\cdot 2x = 2x\\sin(x^2)\\).",
    },
    commonMistakes: [
      "Forgetting the chain-rule factor for a variable upper bound.",
      "Evaluating the integral when the chain rule gives the derivative directly.",
      "Applying FTC1 when the lower bound is variable without flipping the sign.",
    ],
  },
  "6.5": {
    id: "6.5",
    title: "Interpreting the Behavior of Accumulation Functions",
    summary:
      "Use the graph of \\(f\\) to reason about the accumulator \\(F(x) = \\int_a^x f(t)\\,dt\\) — its sign, increase/decrease, extrema, concavity.",
    lesson:
      "Given a graph of \\(f\\), answer questions about \\(F(x) = \\int_a^x f(t)\\,dt\\):\n- **\\(F\\) increases** where \\(f > 0\\); **decreases** where \\(f < 0\\).\n- **\\(F\\) local max** where \\(f\\) goes \\(+\\to -\\).\n- **\\(F\\) local min** where \\(f\\) goes \\(-\\to +\\).\n- **\\(F\\) concave up** where \\(f\\) is increasing; down where \\(f\\) is decreasing.\n- **\\(F\\) inflection points** where \\(f\\) has a local extremum.\n\nEvaluating \\(F(b)\\) from a graph: signed area from \\(a\\) to \\(b\\). Count area above the axis positive, below negative.\n\nFRQs that test this usually give a piecewise-linear \\(f\\) with clearly shaded regions and ask you to compute \\(F\\) at several inputs and describe behavior.",
    keyIdeas: [
      "Sign of \\(f\\) ⇔ monotonicity of \\(F\\).",
      "Extrema of \\(F\\) occur at sign changes of \\(f\\).",
      "Concavity of \\(F\\) ⇔ monotonicity of \\(f\\).",
      "\\(F(b)\\) = signed area under \\(f\\) from \\(a\\) to \\(b\\).",
    ],
    commonMistakes: [
      "Identifying extrema of \\(F\\) at extrema of \\(f\\) — wrong; they're at sign changes.",
      "Miscounting signed area when \\(f\\) dips below the axis.",
      "Confusing concavity of \\(F\\) with sign of \\(f\\).",
    ],
  },
  "6.6": {
    id: "6.6",
    title: "Applying Properties of Definite Integrals",
    summary:
      "Linearity, reversing limits, splitting intervals, and recognizing even/odd integrands simplify integrals.",
    lesson:
      "Core properties:\n1. \\(\\int_a^a f\\,dx = 0\\).\n2. \\(\\int_a^b f\\,dx = -\\int_b^a f\\,dx\\).\n3. \\(\\int_a^b (kf + g)\\,dx = k\\int_a^b f\\,dx + \\int_a^b g\\,dx\\) (linearity).\n4. \\(\\int_a^b f\\,dx + \\int_b^c f\\,dx = \\int_a^c f\\,dx\\) (splitting).\n5. Symmetry: \\(\\int_{-a}^{a} f\\,dx = 0\\) if \\(f\\) is odd; \\(= 2\\int_0^a f\\,dx\\) if \\(f\\) is even.\n\nFRQs often give you a table with \\(\\int_0^2 f = 3\\) and \\(\\int_2^5 f = -1\\) and ask \\(\\int_0^5 f\\) — just add. Others hand you \\(\\int_0^3 f = 7\\) and ask \\(\\int_0^3 (2f+5)\\,dx = 2\\cdot 7 + 5\\cdot 3 = 29\\).",
    keyIdeas: [
      "Integrals split along intervals (property 4).",
      "Linearity pulls constants out and breaks sums apart.",
      "Reversing limits changes sign.",
      "Odd/even symmetry on \\([-a,a]\\) can eliminate computation.",
    ],
    commonMistakes: [
      "Adding integrals over overlapping intervals without subtracting the overlap.",
      "Forgetting the sign flip when reversing limits.",
      "Claiming symmetry when the interval isn't symmetric about 0.",
    ],
  },
  "6.7": {
    id: "6.7",
    title: "Fundamental Theorem of Calculus and Definite Integrals",
    summary:
      "FTC Part 2: \\(\\int_a^b f(x)\\,dx = F(b) - F(a)\\) where \\(F\\) is any antiderivative of \\(f\\).",
    lesson:
      "FTC2 is the computational workhorse. To evaluate a definite integral: find an antiderivative \\(F\\), then compute \\(F(b) - F(a)\\). Write it as \\(F(x)\\bigg|_a^b\\).\n\nExample: \\(\\int_1^3 x^2\\,dx = \\frac{x^3}{3}\\bigg|_1^3 = \\frac{27}{3} - \\frac{1}{3} = \\frac{26}{3}\\).\n\nAll antiderivatives differ by a constant, but the constant cancels in \\(F(b)-F(a)\\) — so you can pick any antiderivative.\n\nCombine with techniques from 6.8–6.14 (substitution, parts, partial fractions) to handle any exam-level integrand. The FTC just provides the evaluation step.",
    keyIdeas: [
      "FTC2: \\(\\int_a^b f = F(b) - F(a)\\) for any antiderivative \\(F\\).",
      "Constants of integration cancel in definite integrals.",
      "Notation: \\(F(x)\\bigg|_a^b\\).",
      "FTC2 is the reason antidifferentiation techniques matter.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\int_0^\\pi \\sin x\\,dx\\).",
      solution:
        "\\(F(x) = -\\cos x\\). \\(F(\\pi) - F(0) = -(-1) - (-1) = 1 + 1 = 2\\).",
    },
    commonMistakes: [
      "Forgetting the negative sign when antidifferentiating \\(\\cos\\) or \\(\\sin\\).",
      "Swapping the order of evaluation (\\(F(a) - F(b)\\)).",
      "Using a wrong antiderivative due to missing constants.",
    ],
  },
  "6.8": {
    id: "6.8",
    title: "Antiderivatives and Indefinite Integrals: Basic Rules",
    summary:
      "Antidifferentiate term by term using inverse power rule, reverse trig, exponential, and logarithm rules.",
    lesson:
      "Basic antiderivative rules (always add \\(+C\\)):\n- \\(\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C\\) for \\(n \\ne -1\\).\n- \\(\\int \\frac{1}{x}\\,dx = \\ln|x| + C\\).\n- \\(\\int e^x\\,dx = e^x + C\\).\n- \\(\\int \\sin x\\,dx = -\\cos x + C\\); \\(\\int \\cos x\\,dx = \\sin x + C\\).\n- \\(\\int \\sec^2 x\\,dx = \\tan x + C\\); \\(\\int \\sec x \\tan x\\,dx = \\sec x + C\\).\n- \\(\\int \\frac{1}{1+x^2}\\,dx = \\arctan x + C\\); \\(\\int \\frac{1}{\\sqrt{1-x^2}}\\,dx = \\arcsin x + C\\).\n\nLinearity applies: constants come out, sums split.\n\nNever forget \\(+C\\) on indefinite integrals — automatic point loss otherwise.",
    keyIdeas: [
      "Inverse power rule: add 1 to the exponent, divide.",
      "Linearity: constants factor; sums split.",
      "Memorize the six standard trig/exp/inverse-trig antiderivatives.",
      "Always add \\(+C\\) to indefinite integrals.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\int (3x^2 + 5\\cos x)\\,dx\\).",
      solution:
        "\\(\\int 3x^2\\,dx + \\int 5\\cos x\\,dx = x^3 + 5\\sin x + C\\).",
    },
    commonMistakes: [
      "Forgetting \\(+C\\).",
      "Dividing by \\(n\\) instead of \\(n+1\\) in the power rule.",
      "Confusing \\(\\int \\cos x\\,dx = \\sin x\\) with \\(\\int \\sin x\\,dx = -\\cos x\\).",
    ],
  },
  "6.9": {
    id: "6.9",
    title: "Integration Using Substitution",
    summary:
      "u-substitution is the reverse of the chain rule: pick \\(u\\) as the inner function, compute \\(du\\), rewrite and integrate.",
    lesson:
      "Standard u-sub recipe:\n1. Identify an inner function \\(u = g(x)\\).\n2. Compute \\(du = g'(x)\\,dx\\).\n3. Rewrite the integral in terms of \\(u\\) (and \\(du\\)) so nothing in \\(x\\) remains.\n4. Integrate.\n5. Back-substitute \\(u = g(x)\\), or if definite, change the limits to \\(u\\)-values.\n\nDefinite integrals: either back-substitute or change the limits. The AP rubric usually asks for changed limits on cleaner presentation.\n\nPick \\(u\\) by looking for: (a) an inside of a composition, (b) a \"chunk\" whose derivative appears as another factor, (c) the denominator of a fraction when its derivative is the numerator.",
    keyIdeas: [
      "u-sub = reverse chain rule.",
      "Compute \\(du\\) before rewriting.",
      "Change limits when definite (or back-substitute).",
      "Pick \\(u\\) as the inside of a composition.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\int 2x \\cos(x^2)\\,dx\\).",
      solution:
        "\\(u = x^2\\), \\(du = 2x\\,dx\\). Integral becomes \\(\\int \\cos u\\,du = \\sin u + C = \\sin(x^2) + C\\).",
    },
    commonMistakes: [
      "Missing a missing factor (e.g., \\(du = 2x\\,dx\\) but only \\(x\\,dx\\) appears — you can pull out a constant).",
      "Forgetting to back-substitute on indefinite integrals.",
      "Not changing limits on definite integrals.",
    ],
  },
  "6.10": {
    id: "6.10",
    title: "Integration Using Long Division and Completing the Square",
    summary:
      "For rational integrands with numerator degree ≥ denominator, long-divide first. For quadratic denominators without nice factors, complete the square to get an arctan or log form.",
    lesson:
      "**Long division**: if \\(\\int \\frac{x^2+3}{x+1}\\,dx\\), divide first: \\(\\frac{x^2+3}{x+1} = x - 1 + \\frac{4}{x+1}\\). Integrate: \\(\\frac{x^2}{2} - x + 4\\ln|x+1| + C\\).\n\n**Completing the square**: for \\(\\int \\frac{dx}{x^2+2x+5}\\), write \\(x^2+2x+5 = (x+1)^2+4\\). Substitute \\(u = x+1\\): \\(\\int \\frac{du}{u^2+4} = \\frac{1}{2}\\arctan(u/2) + C = \\frac{1}{2}\\arctan((x+1)/2) + C\\).\n\nBoth techniques reduce tricky rational integrals to standard forms.",
    keyIdeas: [
      "Long division: when numerator degree ≥ denominator degree.",
      "Complete the square to expose \\(u^2 + a^2\\) or \\(a^2 - u^2\\) forms.",
      "Standard form \\(\\int \\frac{du}{u^2+a^2} = \\frac{1}{a}\\arctan(u/a) + C\\).",
      "Rewrite before attempting other techniques.",
    ],
    commonMistakes: [
      "Forgetting to simplify the leftover polynomial after long division.",
      "Completing the square incorrectly — the constant on the outside is the adjustment.",
      "Integrating without first manipulating — brute force usually fails on these.",
    ],
  },
  "6.11": {
    id: "6.11",
    title: "Integration by Parts",
    summary:
      "\\(\\int u\\,dv = uv - \\int v\\,du\\). Choose \\(u\\) by LIATE (log, inverse trig, algebraic, trig, exponential).",
    lesson:
      "Integration by parts comes from the product rule. If you need \\(\\int f(x) g(x)\\,dx\\), let \\(u = f(x)\\) and \\(dv = g(x)\\,dx\\). Compute \\(du\\) and \\(v\\), then apply \\(\\int u\\,dv = uv - \\int v\\,du\\).\n\nPick \\(u\\) using LIATE: logarithms, inverse trig, algebraic, trig, exponential — earlier in the list gets \\(u\\). This maximizes the chance that \\(du\\) is simpler than \\(u\\).\n\nSometimes parts generates a cycle. \\(\\int e^x \\sin x\\,dx\\) needs two applications and algebra to solve for the integral.",
    keyIdeas: [
      "\\(\\int u\\,dv = uv - \\int v\\,du\\).",
      "LIATE orders candidates for \\(u\\).",
      "Sometimes apply twice and solve algebraically.",
      "Parts pairs well with u-sub on nested integrals.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\int x e^x\\,dx\\).",
      solution:
        "\\(u = x\\), \\(dv = e^x\\,dx\\). \\(du = dx\\), \\(v = e^x\\). \\(\\int xe^x\\,dx = xe^x - \\int e^x\\,dx = xe^x - e^x + C = e^x(x-1) + C\\).",
    },
    commonMistakes: [
      "Choosing \\(u\\) to make \\(du\\) more complex, not less.",
      "Dropping signs in \\(uv - \\int v\\,du\\).",
      "Failing to recognize a cycle and solve algebraically.",
    ],
  },
  "6.12": {
    id: "6.12",
    title: "Partial Fractions (Linear Factors)",
    summary:
      "Decompose a proper rational function into simpler pieces whose antiderivatives are logs or arctans.",
    lesson:
      "For \\(\\int \\frac{P(x)}{Q(x)}\\,dx\\) with \\(\\deg P < \\deg Q\\) and \\(Q\\) factors into distinct linear terms: write \\(\\frac{P(x)}{(x-a)(x-b)} = \\frac{A}{x-a} + \\frac{B}{x-b}\\). Solve for \\(A,B\\) by clearing denominators and either equating coefficients or plugging in \\(x=a\\) and \\(x=b\\).\n\nExample: \\(\\frac{1}{x^2-1} = \\frac{1}{(x-1)(x+1)} = \\frac{1/2}{x-1} - \\frac{1/2}{x+1}\\). Integrate each: \\(\\frac{1}{2}\\ln|x-1| - \\frac{1}{2}\\ln|x+1| + C = \\frac{1}{2}\\ln\\left|\\frac{x-1}{x+1}\\right| + C\\).\n\nAP only tests linear factors in partial fractions for BC — no repeated or quadratic factors are required.",
    keyIdeas: [
      "Use when integrand is a proper rational with distinct linear denominator factors.",
      "Decompose into simpler pieces; each gives a log.",
      "Solve for coefficients by substitution or equating coefficients.",
      "Do long division first if numerator degree isn't smaller.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\int \\frac{2}{x^2-4}\\,dx\\).",
      solution:
        "\\(\\frac{2}{(x-2)(x+2)} = \\frac{A}{x-2} + \\frac{B}{x+2}\\). Clearing: \\(2 = A(x+2) + B(x-2)\\). \\(x=2\\): \\(2=4A\\Rightarrow A=1/2\\). \\(x=-2\\): \\(2=-4B\\Rightarrow B=-1/2\\). Integral: \\(\\frac{1}{2}\\ln|x-2| - \\frac{1}{2}\\ln|x+2| + C\\).",
    },
    commonMistakes: [
      "Attempting partial fractions without first long-dividing an improper fraction.",
      "Algebra errors when clearing denominators.",
      "Forgetting absolute values in the log.",
    ],
  },
  "6.13": {
    id: "6.13",
    title: "Evaluating Improper Integrals",
    summary:
      "An integral is improper when an endpoint is infinite or the integrand blows up. Evaluate as a limit.",
    lesson:
      "Two types:\n- **Unbounded interval**: \\(\\int_a^\\infty f\\,dx = \\lim_{b\\to\\infty}\\int_a^b f\\,dx\\).\n- **Unbounded integrand** (e.g., \\(1/\\sqrt{x}\\) near 0): \\(\\int_0^1 \\frac{1}{\\sqrt{x}}\\,dx = \\lim_{a\\to 0^+}\\int_a^1 \\frac{1}{\\sqrt{x}}\\,dx\\).\n\nIf the limit is finite, the integral **converges** to that value. If not, it **diverges**.\n\nClassical benchmark: \\(\\int_1^\\infty \\frac{1}{x^p}\\,dx\\) converges iff \\(p > 1\\); \\(\\int_0^1 \\frac{1}{x^p}\\,dx\\) converges iff \\(p < 1\\). Memorize these — they come up on series convergence tests too.",
    keyIdeas: [
      "Rewrite improper integrals as limits.",
      "Converges if the limit is finite, diverges otherwise.",
      "Classical benchmark: \\(p\\)-integrals at infinity converge iff \\(p > 1\\).",
      "Discontinuities inside the interval need splitting at the singularity.",
    ],
    workedExample: {
      prompt:
        "Evaluate \\(\\int_1^\\infty \\frac{1}{x^2}\\,dx\\).",
      solution:
        "\\(\\lim_{b\\to\\infty}\\int_1^b x^{-2}\\,dx = \\lim_{b\\to\\infty}\\left[-\\frac{1}{x}\\right]_1^b = \\lim_{b\\to\\infty}(-1/b + 1) = 1\\). Converges to 1.",
    },
    commonMistakes: [
      "Plugging \\(\\infty\\) in directly instead of using a limit.",
      "Missing an interior singularity and thus not splitting the integral.",
      "Concluding divergence because the antiderivative is unbounded at \\(\\infty\\) without taking the limit.",
    ],
  },
  "6.14": {
    id: "6.14",
    title: "Selecting Techniques for Antidifferentiation",
    summary:
      "Triage integrals: match patterns to choose between basic rules, u-sub, parts, partial fractions, trig identities, long division, completing the square.",
    lesson:
      "Decision tree:\n- **Is it a basic form?** Use the rule from 6.8.\n- **Does the integrand contain a composition whose inside's derivative is also present?** u-sub.\n- **Is it a product of different types of functions (log·algebraic, algebraic·exp)?** Parts.\n- **Rational function with degrees manageable?** Partial fractions (may need long division first).\n- **Trig product/power?** Use identities to reduce — double angle, Pythagorean.\n- **Looks like \\(1/(x^2+a^2)\\)?** Arctan form (complete the square if needed).\n- **Looks like \\(1/\\sqrt{a^2-x^2}\\)?** Arcsin form.\n\nPractice this meta-skill on mixed problem sets. Speed on identifying the right technique is more important than speed on executing it.",
    keyIdeas: [
      "Pattern-match before reaching for a technique.",
      "u-sub is the first tool to try after basic rules.",
      "Parts for products of different function types (LIATE).",
      "Partial fractions and completing the square handle rational forms.",
    ],
    commonMistakes: [
      "Trying parts when u-sub would work.",
      "Using partial fractions on an improper rational (need long division first).",
      "Forgetting trig identities — \\(\\sin^2 x = (1-\\cos 2x)/2\\) is often the key.",
    ],
  },

  // =========================================================================
  // UNIT 7 — DIFFERENTIAL EQUATIONS
  // =========================================================================
  "7.1": {
    id: "7.1",
    title: "Modeling Situations with Differential Equations",
    summary:
      "A DE relates a function to its rate(s) of change. Translate verbal descriptions into equations of the form \\(dy/dx = f(x,y)\\).",
    lesson:
      "Whenever a problem says \"rate is proportional to the amount,\" you have a differential equation. Examples:\n- \"The population grows at a rate proportional to its size.\" \\(dP/dt = kP\\).\n- \"The temperature difference between an object and the surrounding air decays at a rate proportional to the difference.\" \\(dT/dt = -k(T - T_a)\\) (Newton's law of cooling).\n- \"The rate of spread of a rumor is proportional to the product of those who know and those who don't.\" Logistic.\n\nThe translation is the skill. After you've set up the DE, Unit 7 teaches you to solve and analyze it.",
    keyIdeas: [
      "\"Proportional to\" means \\(dy/dt = k \\cdot (\\text{quantity})\\).",
      "Sign of \\(k\\) indicates growth (\\(+\\)) or decay (\\(-\\)).",
      "Carrying capacity problems lead to logistic DEs.",
      "Applied problems often give enough info to determine \\(k\\) and initial conditions.",
    ],
    commonMistakes: [
      "Omitting the sign when the problem describes decay.",
      "Confusing rate of change with the quantity itself.",
      "Setting up the DE with the wrong variable relationships.",
    ],
  },
  "7.2": {
    id: "7.2",
    title: "Verifying Solutions for Differential Equations",
    summary:
      "Plug a candidate function into the DE; if both sides match, it's a solution.",
    lesson:
      "To check \\(y = f(x)\\) is a solution of a DE, compute \\(f'\\) (and higher derivatives if needed) and substitute into the equation. If the equation is satisfied identically, \\(f\\) is a solution.\n\nExample: check \\(y = 3e^{2x}\\) solves \\(dy/dx = 2y\\). \\(dy/dx = 6e^{2x}\\); \\(2y = 6e^{2x}\\). Equal — it's a solution.\n\nAP FRQs often ask \"verify that \\(y = \\phi(x)\\) satisfies the DE.\" Show the computation explicitly — plug in, simplify, declare equality.",
    keyIdeas: [
      "Substitute derivatives of the candidate into the DE.",
      "A solution must satisfy the DE identically, not just at one point.",
      "Particular solutions satisfy both the DE and given initial conditions.",
      "Verification is a substitution exercise, not a solving one.",
    ],
    commonMistakes: [
      "Checking only one value of \\(x\\) instead of verifying identically.",
      "Forgetting to compute the correct derivative order.",
      "Confusing verification with solving the DE from scratch.",
    ],
  },
  "7.3": {
    id: "7.3",
    title: "Sketching Slope Fields",
    summary:
      "A slope field sketches short line segments with slope \\(f(x,y)\\) at a grid of points — a visual guide to solution curves.",
    lesson:
      "For \\(dy/dx = f(x,y)\\), at each grid point \\((x,y)\\) compute the slope and draw a short segment with that slope. The segments collectively show the \"flow\" of solution curves.\n\nReading slope fields: solutions follow the segments. Equilibria (where \\(f(x,y)=0\\)) appear as horizontal segments. Solutions asymptote to stable equilibria and diverge from unstable ones.\n\nOn AP FRQs you often get a slope field and a question like \"sketch the solution through (0, 1).\" Start at the point and trace a smooth curve that matches segment directions.",
    keyIdeas: [
      "At each grid point, slope = \\(f(x,y)\\); draw a short segment with that slope.",
      "Horizontal segments appear at equilibria.",
      "Solution curves follow the segments continuously.",
      "Slopes depending only on \\(x\\) make vertically-uniform stripes; only on \\(y\\) makes horizontally-uniform stripes.",
    ],
    commonMistakes: [
      "Drawing segments through the origin regardless of actual slope.",
      "Making segments too long — they should be short tangents.",
      "Missing equilibrium lines.",
    ],
  },
  "7.4": {
    id: "7.4",
    title: "Reasoning Using Slope Fields",
    summary:
      "Use slope fields to predict solution behavior — long-term asymptotes, direction at given points, whether solutions cross lines.",
    lesson:
      "Qualitative reasoning from a slope field:\n- **Long-term behavior**: do solutions converge to a horizontal asymptote, grow without bound, oscillate?\n- **Equilibria**: horizontal segments indicate \\(dy/dx = 0\\) — possible constant solutions.\n- **Stability**: if segments near an equilibrium point toward it from both sides, it's stable; away, unstable.\n- **Solution curves don't cross** (for well-behaved DEs). Use this to confine solutions between equilibria.\n\nFRQs often ask: \"If \\(y(0) = 2\\), describe \\(\\lim_{x\\to\\infty} y(x)\\).\" Use the slope field to estimate.",
    keyIdeas: [
      "Slope field gives qualitative solution behavior without solving.",
      "Equilibria separate solution curves into regions.",
      "Stable vs. unstable equilibria visible from surrounding segments.",
      "Solutions are bounded by equilibria in autonomous DEs.",
    ],
    commonMistakes: [
      "Assuming solutions cross horizontal equilibria — they don't.",
      "Misreading segment directions and tracing a curve that violates them.",
      "Ignoring initial condition when predicting long-term behavior.",
    ],
  },
  "7.5": {
    id: "7.5",
    title: "Approximating Solutions Using Euler's Method",
    summary:
      "Step-by-step: \\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\). Euler's method follows the slope field.",
    lesson:
      "Euler's method is a numerical scheme for approximating solutions to \\(dy/dx = f(x,y)\\) with initial condition \\(y(x_0) = y_0\\). At each step:\n1. Compute slope \\(f(x_n, y_n)\\).\n2. Take a step: \\(x_{n+1} = x_n + h\\), \\(y_{n+1} = y_n + h\\cdot f(x_n, y_n)\\).\n3. Repeat until you reach the target \\(x\\).\n\nIt's first-order: error is \\(O(h)\\) per step, \\(O(h)\\) over a fixed interval. For AP the algorithm is more important than the error analysis.\n\nEuler typically under- or over-estimates the true solution depending on the concavity of \\(y\\). Concave up ⇒ Euler underestimates.",
    keyIdeas: [
      "\\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\).",
      "Numerical tangent-line approximation, repeated.",
      "Error shrinks with smaller \\(h\\), linearly.",
      "Concavity of \\(y\\) determines sign of error.",
    ],
    workedExample: {
      prompt:
        "Use Euler with \\(h = 0.5\\) to approximate \\(y(1)\\) for \\(dy/dx = x + y,\\ y(0)=1\\).",
      solution:
        "Step 1 at \\((0,1)\\): slope \\(=1\\); \\(y(0.5) \\approx 1 + 0.5(1) = 1.5\\). Step 2 at \\((0.5, 1.5)\\): slope \\(= 2\\); \\(y(1) \\approx 1.5 + 0.5(2) = 2.5\\).",
    },
    commonMistakes: [
      "Using the target \\(x\\) in the slope formula instead of the current \\(x_n\\).",
      "Dropping or miscounting steps.",
      "Adding \\(f(x_n,y_n)\\) without multiplying by \\(h\\).",
    ],
  },
  "7.6": {
    id: "7.6",
    title: "Finding General Solutions Using Separation of Variables",
    summary:
      "Move all \\(y\\) terms to one side and all \\(x\\) terms to the other, then integrate both sides.",
    lesson:
      "If a DE can be written \\(dy/dx = g(x) h(y)\\), separate variables: \\(\\frac{dy}{h(y)} = g(x)\\,dx\\). Integrate both sides:\n\n$$\\int \\frac{dy}{h(y)} = \\int g(x)\\,dx + C.$$\n\nSolve for \\(y\\) if possible. Don't forget \\(+C\\) — it's essential for matching initial conditions later.\n\nCaveat: dividing by \\(h(y)\\) assumes \\(h(y) \\ne 0\\). Constant solutions \\(y = y_0\\) where \\(h(y_0) = 0\\) are also solutions — don't lose them.",
    keyIdeas: [
      "Separate variables to get \\(dy/h(y) = g(x)\\,dx\\).",
      "Integrate both sides and combine the constants into one \\(+C\\).",
      "Solve for \\(y\\) explicitly when possible.",
      "Check for lost constant solutions from \\(h(y) = 0\\).",
    ],
    workedExample: {
      prompt:
        "Solve \\(dy/dx = xy\\).",
      solution:
        "\\(\\frac{dy}{y} = x\\,dx\\). Integrate: \\(\\ln|y| = x^2/2 + C\\). So \\(|y| = e^{x^2/2+C} = Ae^{x^2/2}\\) with \\(A > 0\\). Allowing signs and \\(y = 0\\): \\(y = Ae^{x^2/2}\\) for any constant \\(A\\).",
    },
    commonMistakes: [
      "Forgetting to add \\(+C\\).",
      "Dividing by \\(h(y)\\) without noting \\(h(y)=0\\) constant solutions.",
      "Leaving \\(\\ln|y|\\) without exponentiating when asked for explicit \\(y\\).",
    ],
  },
  "7.7": {
    id: "7.7",
    title: "Finding Particular Solutions with Initial Conditions",
    summary:
      "Use the initial condition to solve for \\(C\\) in the general solution.",
    lesson:
      "Once you have \\(y(x) = \\text{(general)} + C\\) or \\(y(x) = Ae^{g(x)}\\), plug in the initial condition \\(y(x_0) = y_0\\) to pin down \\(C\\) or \\(A\\).\n\nExample: from \\(y = Ae^{x^2/2}\\) with \\(y(0) = 3\\), \\(3 = A\\cdot 1\\), so \\(A=3\\). Solution: \\(y = 3e^{x^2/2}\\).\n\nAP FRQs grade both general and particular solutions explicitly, so present them clearly. Write \"General solution:\" and \"Particular solution:\" as labels.",
    keyIdeas: [
      "Plug initial condition into general solution.",
      "Solve algebraically for the constant.",
      "Present general and particular solutions distinctly.",
      "Check by differentiating and substituting back.",
    ],
    commonMistakes: [
      "Solving for \\(C\\) before integrating both sides — you can't.",
      "Forgetting to substitute the initial condition.",
      "Leaving the general form when the question asks for the particular solution.",
    ],
  },
  "7.8": {
    id: "7.8",
    title: "Exponential Models with Differential Equations",
    summary:
      "\\(dy/dt = ky \\Rightarrow y(t) = y_0 e^{kt}\\). Growth for \\(k>0\\); decay for \\(k<0\\).",
    lesson:
      "The DE \\(dy/dt = ky\\) has general solution \\(y = Ce^{kt}\\). With initial amount \\(y_0\\), the solution is \\(y(t) = y_0 e^{kt}\\). Positive \\(k\\): exponential growth (populations, compound interest). Negative \\(k\\): exponential decay (radioactive, drug elimination).\n\nGiven two data points you can solve for both \\(y_0\\) and \\(k\\). Half-life relates to \\(k\\) by \\(t_{1/2} = \\ln 2 / |k|\\).\n\nNewton's law of cooling gives a shifted version: \\(dT/dt = -k(T - T_a)\\). Substitute \\(u = T - T_a\\) to reduce to pure exponential decay.",
    keyIdeas: [
      "\\(dy/dt = ky \\Rightarrow y = y_0 e^{kt}\\).",
      "Growth (\\(k>0\\)) or decay (\\(k<0\\)).",
      "Half-life: \\(t_{1/2} = \\ln 2 / |k|\\).",
      "Newton's cooling: shift by ambient, then pure exponential.",
    ],
    workedExample: {
      prompt:
        "A sample decays exponentially with half-life 5 years. Starting at 80 g, how much remains after 12 years?",
      solution:
        "\\(k = -\\ln 2 / 5\\). \\(y(12) = 80 e^{-12\\ln 2 / 5} = 80 \\cdot 2^{-12/5} \\approx 80 / 5.28 \\approx 15.1\\) g.",
    },
    commonMistakes: [
      "Using \\(k\\) with the wrong sign for decay.",
      "Confusing half-life with doubling time.",
      "Forgetting to shift by ambient temperature in cooling problems.",
    ],
  },
  "7.9": {
    id: "7.9",
    title: "Logistic Models with Differential Equations",
    summary:
      "\\(dP/dt = kP(1 - P/M)\\) models bounded growth. Solution approaches carrying capacity \\(M\\); inflection at \\(P = M/2\\).",
    lesson:
      "Logistic DE: \\(dP/dt = kP(1 - P/M)\\). Here \\(M\\) is the carrying capacity (long-term equilibrium). For \\(0 < P < M\\), growth is positive; above \\(M\\), negative. At \\(P = M/2\\), growth rate is maximal — this is the inflection point of the solution curve.\n\nExplicit solution (not usually required on AP FRQ): \\(P(t) = M / (1 + Ae^{-kt})\\) with \\(A\\) determined by the initial condition.\n\nBC exams mostly test the qualitative analysis: identify carrying capacity, identify inflection, describe long-term behavior, and use separation of variables (7.6) if asked to solve explicitly.",
    keyIdeas: [
      "\\(dP/dt = kP(1 - P/M)\\).",
      "Carrying capacity \\(M\\): long-term equilibrium.",
      "Fastest growth at \\(P = M/2\\).",
      "Explicit solution has form \\(M/(1 + Ae^{-kt})\\).",
    ],
    workedExample: {
      prompt:
        "A population follows \\(dP/dt = 0.1 P (1 - P/500)\\) with \\(P(0) = 100\\). What is \\(\\lim_{t\\to\\infty}P\\) and where is growth fastest?",
      solution:
        "Carrying capacity is 500, so \\(P\\to 500\\). Growth is fastest at \\(P = 250\\), midway.",
    },
    commonMistakes: [
      "Finding the peak of growth at \\(P=0\\) or \\(P=M\\) instead of \\(M/2\\).",
      "Mis-identifying the carrying capacity.",
      "Forgetting that \\(P=0\\) and \\(P=M\\) are equilibrium solutions.",
    ],
  },

  // =========================================================================
  // UNIT 8 — APPLICATIONS OF INTEGRATION
  // =========================================================================
  "8.1": {
    id: "8.1",
    title: "Finding the Average Value of a Function on an Interval",
    summary:
      "Average value of \\(f\\) on \\([a,b]\\) is \\(\\frac{1}{b-a}\\int_a^b f(x)\\,dx\\).",
    lesson:
      "The continuous analog of averaging a list of numbers. If \\(f\\) takes finitely many values \\(f_1, \\dots, f_n\\) at equally spaced points, the average is \\((f_1+\\cdots+f_n)/n\\). The integral generalizes this to a continuous spread: divide the accumulated area by the width of the interval.\n\nInterpretation: the average value is the height of a rectangle with the same area as \\(\\int_a^b f(x)\\,dx\\) over the same base.\n\nThe Mean Value Theorem for Integrals: a continuous \\(f\\) attains its average value somewhere in \\((a,b)\\) — i.e., \\(\\exists c\\) with \\(f(c) = \\frac{1}{b-a}\\int_a^b f\\).",
    keyIdeas: [
      "Average = integral divided by interval width.",
      "Rectangle interpretation: area equivalent to integral.",
      "MVT for integrals: continuous \\(f\\) attains its average.",
      "Applied version: average speed, average temperature, average concentration.",
    ],
    workedExample: {
      prompt:
        "Find the average value of \\(f(x) = x^2\\) on \\([0, 3]\\).",
      solution:
        "\\(\\bar{f} = \\frac{1}{3}\\int_0^3 x^2\\,dx = \\frac{1}{3}\\cdot 9 = 3\\).",
    },
    commonMistakes: [
      "Forgetting to divide by \\(b-a\\).",
      "Confusing average value with total accumulation.",
      "Averaging just two endpoint values — that's wrong for anything nonlinear.",
    ],
  },
  "8.2": {
    id: "8.2",
    title: "Position, Velocity, Acceleration Using Integrals",
    summary:
      "\\(s(t) = s(t_0) + \\int_{t_0}^t v(u)\\,du\\); displacement is the integral of velocity; distance traveled is the integral of speed.",
    lesson:
      "Position from velocity: \\(s(t) = s(t_0) + \\int_{t_0}^t v(u)\\,du\\). The integral is net displacement — signed.\n\n**Distance traveled**, by contrast, is \\(\\int_{t_0}^t |v(u)|\\,du\\) — unsigned. When velocity changes sign (direction change), distance traveled exceeds net displacement.\n\nSimilarly, \\(v(t) = v(t_0) + \\int_{t_0}^t a(u)\\,du\\).\n\nAP FRQs routinely ask for both displacement and distance. Keep the distinction straight. If \\(v\\) is sometimes negative, split at the zeros of \\(v\\) and take absolute values piece by piece.",
    keyIdeas: [
      "Displacement = \\(\\int v\\,dt\\); distance = \\(\\int |v|\\,dt\\).",
      "Velocity from acceleration: same idea.",
      "Split at zeros of \\(v\\) to compute distance traveled.",
      "Remember the initial position/velocity constant from the FTC.",
    ],
    workedExample: {
      prompt:
        "A particle has \\(v(t) = t - 2\\) m/s. Find the displacement and distance traveled on \\([0, 4]\\).",
      solution:
        "Displacement: \\(\\int_0^4 (t-2)\\,dt = [t^2/2 - 2t]_0^4 = 8 - 8 = 0\\). Distance: \\(\\int_0^4 |t-2|\\,dt = \\int_0^2 (2-t)\\,dt + \\int_2^4 (t-2)\\,dt = 2 + 2 = 4\\) m.",
    },
    commonMistakes: [
      "Using \\(\\int v\\) for distance — that's displacement.",
      "Forgetting the initial position constant.",
      "Not splitting at zeros of \\(v\\) when computing distance.",
    ],
  },
  "8.3": {
    id: "8.3",
    title: "Accumulation Functions in Applied Contexts",
    summary:
      "Use \\(F(x) = F(a) + \\int_a^x f(t)\\,dt\\) to track running totals in real-world problems.",
    lesson:
      "Pattern: a problem gives you the initial amount and a rate function, then asks for the amount at a later time.\n\nRecipe: \\(A(t) = A(t_0) + \\int_{t_0}^t r(u)\\,du\\). Use the correct rate, correct bounds, and carry units.\n\nExample: a tank has 100 gallons at \\(t=0\\) and water flows in at \\(R(t)\\) gpm and out at \\(D(t)\\) gpm. Volume at time \\(T\\) is \\(100 + \\int_0^T (R(u) - D(u))\\,du\\). Sign conventions (in is positive, out is negative) are crucial.",
    keyIdeas: [
      "\\(A(t) = A(t_0) + \\int r\\,du\\) for any accumulated quantity.",
      "Add inflow, subtract outflow.",
      "Carry units through the integral.",
      "The initial amount is essential — integrals alone don't fix the baseline.",
    ],
    commonMistakes: [
      "Forgetting to add the initial amount.",
      "Using the wrong sign on inflow/outflow terms.",
      "Ignoring units in the final interpretation.",
    ],
  },
  "8.4": {
    id: "8.4",
    title: "Area Between Curves (Functions of \\(x\\))",
    summary:
      "\\(\\int_a^b (\\text{top} - \\text{bottom})\\,dx\\) gives the area of a region bounded above by \\(y = f(x)\\) and below by \\(y = g(x)\\).",
    lesson:
      "If \\(f(x) \\ge g(x)\\) on \\([a,b]\\), the area between the curves is \\(\\int_a^b (f(x) - g(x))\\,dx\\). \"Top minus bottom\" always — no need for absolute values if you set it up correctly.\n\nFind the bounds of integration by solving \\(f(x) = g(x)\\). The solutions are where the curves meet; the area lives between adjacent intersections.\n\nIf top and bottom swap (curves cross inside the interval), split the integral at the crossing and evaluate each piece separately.",
    keyIdeas: [
      "Area = \\(\\int (\\text{top} - \\text{bottom})\\,dx\\).",
      "Find intersections by solving \\(f = g\\).",
      "Split at crossings if top/bottom switch.",
      "No absolute values needed once you identify which is top.",
    ],
    workedExample: {
      prompt:
        "Find the area between \\(y = x^2\\) and \\(y = x\\) on \\([0, 1]\\).",
      solution:
        "On \\([0,1]\\), \\(x \\ge x^2\\). Area \\(= \\int_0^1 (x - x^2)\\,dx = [x^2/2 - x^3/3]_0^1 = 1/2 - 1/3 = 1/6\\).",
    },
    commonMistakes: [
      "Subtracting in the wrong order (bottom - top).",
      "Not solving for intersections to find the bounds.",
      "Missing a crossing inside the interval.",
    ],
  },
  "8.5": {
    id: "8.5",
    title: "Area Between Curves (Functions of \\(y\\))",
    summary:
      "Integrate horizontally: \\(\\int_c^d (x_{\\text{right}} - x_{\\text{left}})\\,dy\\).",
    lesson:
      "When curves are naturally expressed as \\(x = f(y)\\) (or when vertical strips would require splitting), integrate with respect to \\(y\\):\n\n$$\\text{Area} = \\int_c^d (x_{\\text{right}}(y) - x_{\\text{left}}(y))\\,dy.$$\n\nHorizontal strips of width \\(dy\\). Works great when the region is bounded on the left and right by functions of \\(y\\).\n\nFinding bounds: solve for \\(y\\)-values where the curves meet. Setting up the integrand means expressing each boundary as \\(x\\) in terms of \\(y\\).",
    keyIdeas: [
      "Integrate in \\(y\\) when horizontal strips are cleaner.",
      "Right function minus left function.",
      "Solve for \\(x\\) in terms of \\(y\\) for each boundary.",
      "Same logic, different variable.",
    ],
    commonMistakes: [
      "Forgetting to express functions as \\(x(y)\\).",
      "Subtracting left from right (should be right - left).",
      "Mixing \\(dx\\) and \\(dy\\) in the setup.",
    ],
  },
  "8.6": {
    id: "8.6",
    title: "Area Between Curves That Intersect at More Than Two Points",
    summary:
      "Split at each intersection; integrate each piece with the correct top/bottom, then sum.",
    lesson:
      "When two curves cross more than twice, the \"top\" and \"bottom\" roles switch at each crossing. Split the interval at each intersection and compute each piece separately.\n\nExample: \\(y = \\sin x\\) and \\(y = \\cos x\\) on \\([0, 2\\pi]\\) intersect at \\(\\pi/4\\) and \\(5\\pi/4\\). Between crossings, the roles switch. Each integrand is top minus bottom for that sub-interval.\n\nThe skill is bookkeeping. List the intersections in order, check top/bottom on each sub-interval, set up each integral correctly, then sum.",
    keyIdeas: [
      "Split at every intersection.",
      "Check which curve is on top in each sub-interval.",
      "Sum the pieces.",
      "Use a picture to avoid sign errors.",
    ],
    commonMistakes: [
      "Assuming top/bottom stays the same across crossings.",
      "Missing an intersection.",
      "Forgetting to switch the order of subtraction.",
    ],
  },
  "8.7": {
    id: "8.7",
    title: "Volumes with Cross Sections: Squares and Rectangles",
    summary:
      "Volume = \\(\\int_a^b A(x)\\,dx\\) where \\(A(x)\\) is the cross-sectional area at \\(x\\).",
    lesson:
      "For a solid whose cross-section perpendicular to the \\(x\\)-axis is a known shape with known area \\(A(x)\\), the volume is \\(\\int_a^b A(x)\\,dx\\).\n\nFor squares with side \\(s(x)\\): \\(A(x) = s(x)^2\\). The side is often the height of a function above a baseline: if the base is a region between \\(y=f(x)\\) and \\(y=g(x)\\), the side is \\(f(x) - g(x)\\) and \\(A(x) = (f(x)-g(x))^2\\).\n\nFor rectangles, multiply the two dimensions.\n\nSketching the solid helps: imagine slicing with a knife perpendicular to the axis and looking at the face. That's your cross-section.",
    keyIdeas: [
      "Volume = \\(\\int A(x)\\,dx\\).",
      "Square cross-section: \\(A = s^2\\) where \\(s\\) is the side.",
      "Rectangular: \\(A = \\text{width}\\times\\text{height}\\).",
      "Visualize by slicing; always sketch.",
    ],
    workedExample: {
      prompt:
        "The base of a solid is the region bounded by \\(y=x\\), \\(y=0\\), \\(x=1\\). Cross-sections perpendicular to the \\(x\\)-axis are squares. Find the volume.",
      solution:
        "At \\(x\\), side length is \\(s = x\\). \\(A(x) = x^2\\). \\(V = \\int_0^1 x^2\\,dx = 1/3\\).",
    },
    commonMistakes: [
      "Forgetting to square the side.",
      "Using the area of the base as the cross-section.",
      "Using wrong bounds from the base region.",
    ],
  },
  "8.8": {
    id: "8.8",
    title: "Volumes with Cross Sections: Triangles and Semicircles",
    summary:
      "Equilateral triangle: \\(A = (\\sqrt{3}/4)s^2\\). Semicircle: \\(A = \\pi r^2/2\\) with \\(r = s/2\\).",
    lesson:
      "Apply the same recipe — \\(V = \\int A(x)\\,dx\\) — with the area formula appropriate for the cross-section type.\n\n- **Equilateral triangle** with side \\(s\\): \\(A = (\\sqrt{3}/4)s^2\\).\n- **Isosceles right triangle** with leg \\(s\\): \\(A = s^2/2\\).\n- **Semicircle** with diameter \\(s\\): \\(A = \\pi s^2/8 = (\\pi/2)(s/2)^2\\).\n\nWatch for the distinction between diameter and radius when the side length is given.",
    keyIdeas: [
      "Each cross-section type has a standard area formula.",
      "Equilateral: \\((\\sqrt{3}/4)s^2\\).",
      "Semicircle: \\((\\pi/8)s^2\\) if \\(s\\) is the diameter.",
      "Always plug the side-length function into the area formula.",
    ],
    commonMistakes: [
      "Using the wrong area formula for the triangle type.",
      "Confusing radius with diameter.",
      "Forgetting the leading constant (\\(\\sqrt{3}/4\\), \\(\\pi/8\\), etc.).",
    ],
  },
  "8.9": {
    id: "8.9",
    title: "Volume with Disc Method: Revolving Around the \\(x\\)- or \\(y\\)-Axis",
    summary:
      "\\(V = \\pi \\int_a^b [f(x)]^2\\,dx\\) for revolution around the \\(x\\)-axis (or analogously for \\(y\\)).",
    lesson:
      "Rotate the region under \\(y = f(x)\\) around the \\(x\\)-axis. Each vertical slice at \\(x\\) sweeps out a disc of radius \\(f(x)\\) and width \\(dx\\). Its volume is \\(\\pi [f(x)]^2\\,dx\\). Integrate:\n\n$$V = \\pi \\int_a^b [f(x)]^2\\,dx.$$\n\nFor rotation around the \\(y\\)-axis with \\(x = g(y)\\): \\(V = \\pi \\int_c^d [g(y)]^2\\,dy\\).\n\nThe disc method requires the region to touch the axis of rotation (no gap between the region and the axis). If there's a gap, you need the washer method (8.11).",
    keyIdeas: [
      "Disc volume: \\(\\pi r^2\\,dx\\) with \\(r = f(x)\\).",
      "\\(V = \\pi \\int [f(x)]^2\\,dx\\).",
      "Disc method requires the region to touch the axis.",
      "If the axis is not \\(x\\) or \\(y\\)-axis, adjust the radius.",
    ],
    workedExample: {
      prompt:
        "The region under \\(y = \\sqrt{x}\\) from 0 to 4 is rotated around the \\(x\\)-axis. Find the volume.",
      solution:
        "\\(V = \\pi \\int_0^4 (\\sqrt{x})^2\\,dx = \\pi \\int_0^4 x\\,dx = \\pi \\cdot 8 = 8\\pi\\).",
    },
    commonMistakes: [
      "Squaring the radius incorrectly (e.g., forgetting to square).",
      "Using \\(f(x)\\) instead of \\([f(x)]^2\\).",
      "Using the disc method when a washer is needed.",
    ],
  },
  "8.10": {
    id: "8.10",
    title: "Disc Method: Revolving Around Other Axes",
    summary:
      "When rotating around \\(y = k\\) or \\(x = k\\), the disc radius is \\(|f(x) - k|\\) or \\(|g(y) - k|\\).",
    lesson:
      "Same idea as 8.9, but shift the radius. For rotation around \\(y = k\\) (horizontal line), the disc radius is \\(|f(x) - k|\\):\n\n$$V = \\pi \\int_a^b [f(x) - k]^2\\,dx.$$\n\nFor rotation around \\(x = k\\), radius is \\(|g(y) - k|\\):\n\n$$V = \\pi \\int_c^d [g(y) - k]^2\\,dy.$$\n\nAlways sketch: identify the axis, the region, and confirm which is the correct radius direction. The squared quantity doesn't need absolute values — the square takes care of signs.",
    keyIdeas: [
      "Radius is distance from function to axis: \\(|f(x) - k|\\).",
      "Square eliminates sign issues.",
      "Identify axis, region, and radius direction from a sketch.",
      "Method works for any horizontal or vertical axis.",
    ],
    commonMistakes: [
      "Using \\(f(x)\\) as radius when the axis is \\(y=k \\ne 0\\).",
      "Forgetting to square.",
      "Confusing rotation around \\(x=k\\) (vertical axis) with \\(y=k\\).",
    ],
  },
  "8.11": {
    id: "8.11",
    title: "Washer Method: Revolving Around the \\(x\\)- or \\(y\\)-Axis",
    summary:
      "\\(V = \\pi \\int_a^b ([R(x)]^2 - [r(x)]^2)\\,dx\\) where \\(R\\) is the outer and \\(r\\) is the inner radius.",
    lesson:
      "When the region doesn't touch the axis, rotation produces a solid with a hole. Each slice is a washer — an annulus with outer radius \\(R(x)\\) and inner radius \\(r(x)\\). Its area is \\(\\pi(R^2 - r^2)\\); its volume element is \\(\\pi(R^2 - r^2)\\,dx\\).\n\nFor rotation around the \\(x\\)-axis with outer curve \\(y=f(x)\\) and inner \\(y=g(x)\\) (both above the axis), \\(R = f(x)\\) and \\(r = g(x)\\):\n\n$$V = \\pi \\int_a^b ([f(x)]^2 - [g(x)]^2)\\,dx.$$\n\nAlways identify outer vs. inner from a sketch. \\((R^2 - r^2)\\), not \\((R - r)^2\\) — those are very different.",
    keyIdeas: [
      "Washer = outer disc minus inner disc.",
      "Integrand: \\(\\pi(R^2 - r^2)\\), not \\(\\pi(R-r)^2\\).",
      "Use when the region has a gap from the axis.",
      "Outer radius is the farther curve; inner is the closer.",
    ],
    workedExample: {
      prompt:
        "Find the volume when the region between \\(y=x\\) and \\(y=x^2\\) on \\([0,1]\\) is revolved around the \\(x\\)-axis.",
      solution:
        "\\(R = x\\), \\(r = x^2\\) on \\([0,1]\\). \\(V = \\pi \\int_0^1 (x^2 - x^4)\\,dx = \\pi(1/3 - 1/5) = 2\\pi/15\\).",
    },
    commonMistakes: [
      "Writing \\((R-r)^2\\) instead of \\(R^2 - r^2\\).",
      "Swapping outer and inner.",
      "Forgetting to square both radii.",
    ],
  },
  "8.12": {
    id: "8.12",
    title: "Washer Method: Revolving Around Other Axes",
    summary:
      "Same as 8.11 but with shifted radii: \\(R = |f(x) - k|\\), \\(r = |g(x) - k|\\).",
    lesson:
      "Same logic as shifted disc (8.10). For revolution around \\(y=k\\), outer radius is the distance from the outer curve to the axis, inner radius from the inner curve. The formula is \\(\\pi \\int (R^2 - r^2)\\,dx\\) with shifted radii.\n\nSketch carefully — with two curves and a non-standard axis, it's easy to mis-identify which curve is closer to the axis. After rotating, make sure outer radius is indeed larger.",
    keyIdeas: [
      "Shifted radii: \\(|f(x) - k|\\) for the outer, \\(|g(x) - k|\\) for the inner.",
      "Identify which is outer from a sketch.",
      "Integrand still \\(\\pi(R^2 - r^2)\\).",
      "Double-check signs on the shifted functions.",
    ],
    commonMistakes: [
      "Assigning outer/inner incorrectly after shifting.",
      "Squaring the shift twice (remember the absolute value squared is just the squared quantity).",
      "Using the non-shifted formula.",
    ],
  },
  "8.13": {
    id: "8.13",
    title: "Arc Length of a Smooth Planar Curve; Distance Traveled",
    summary:
      "\\(L = \\int_a^b \\sqrt{1 + [f'(x)]^2}\\,dx\\). For parametric: \\(L = \\int_\\alpha^\\beta \\sqrt{(x'(t))^2 + (y'(t))^2}\\,dt\\).",
    lesson:
      "For \\(y = f(x)\\) smooth on \\([a,b]\\), arc length is \\(L = \\int_a^b \\sqrt{1 + [f'(x)]^2}\\,dx\\). Derivation: break the curve into tiny pieces of length \\(ds = \\sqrt{dx^2 + dy^2} = dx \\cdot \\sqrt{1 + (dy/dx)^2}\\) and integrate.\n\nParametric: \\(ds = \\sqrt{(x'(t))^2 + (y'(t))^2}\\,dt\\), so \\(L = \\int_\\alpha^\\beta \\sqrt{(x'(t))^2 + (y'(t))^2}\\,dt\\). This is also the distance traveled by a particle with those parametric coordinates over the time interval.\n\nArc length integrals are often non-elementary — AP exams typically leave the integral un-evaluated or ask for a calculator decimal.",
    keyIdeas: [
      "\\(L = \\int \\sqrt{1 + (dy/dx)^2}\\,dx\\).",
      "Parametric: \\(L = \\int \\sqrt{(x')^2 + (y')^2}\\,dt\\).",
      "Same formula gives distance traveled for parametric motion.",
      "Integrals rarely have closed forms; leave them or compute numerically.",
    ],
    workedExample: {
      prompt:
        "Find the arc length of \\(y = (2/3)x^{3/2}\\) from \\(x=0\\) to \\(x=3\\).",
      solution:
        "\\(y' = x^{1/2}\\). \\(L = \\int_0^3 \\sqrt{1+x}\\,dx = [(2/3)(1+x)^{3/2}]_0^3 = (2/3)(8 - 1) = 14/3\\).",
    },
    commonMistakes: [
      "Forgetting the \\(+1\\) inside the square root.",
      "Using \\((dy/dx)\\) instead of \\((dy/dx)^2\\).",
      "Confusing arc length with area (no \\(\\pi\\), no squared integrand).",
    ],
  },

  // =========================================================================
  // UNIT 9 — PARAMETRIC EQUATIONS, POLAR COORDINATES, VECTOR-VALUED FUNCTIONS
  // =========================================================================
  "9.1": {
    id: "9.1",
    title: "Defining and Differentiating Parametric Equations",
    summary:
      "For \\(x = x(t),\\ y = y(t)\\), \\(dy/dx = (dy/dt) / (dx/dt)\\) whenever \\(dx/dt \\ne 0\\).",
    lesson:
      "Parametric equations describe curves by a parameter \\(t\\) (often time). Examples: \\(x = \\cos t,\\ y = \\sin t\\) traces the unit circle; \\(x = t,\\ y = t^2\\) is the parabola \\(y = x^2\\).\n\nSlope along the curve: \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\). Both derivatives are evaluated at the same \\(t\\). If \\(dx/dt = 0\\), the tangent is vertical (or undefined).\n\nTo find a tangent line at \\(t=t_0\\): compute \\(x(t_0), y(t_0)\\) (the point) and \\(dy/dx\\) at \\(t_0\\) (the slope), then use point-slope form.",
    keyIdeas: [
      "\\(dy/dx = (dy/dt)/(dx/dt)\\).",
      "\\(dx/dt = 0\\) signals vertical tangent.",
      "\\(dy/dt = 0\\) with \\(dx/dt \\ne 0\\) signals horizontal tangent.",
      "Tangent lines require both the point \\((x(t_0), y(t_0))\\) and the slope at \\(t_0\\).",
    ],
    workedExample: {
      prompt:
        "For \\(x = t^2,\\ y = t^3\\), find \\(dy/dx\\) at \\(t = 2\\).",
      solution:
        "\\(dx/dt = 2t = 4\\), \\(dy/dt = 3t^2 = 12\\). \\(dy/dx = 12/4 = 3\\).",
    },
    commonMistakes: [
      "Dividing \\(dx/dt\\) by \\(dy/dt\\) instead of the reverse.",
      "Evaluating at the wrong \\(t\\).",
      "Forgetting to pair the slope with the correct point.",
    ],
  },
  "9.2": {
    id: "9.2",
    title: "Second Derivatives of Parametric Equations",
    summary:
      "\\(\\frac{d^2y}{dx^2} = \\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) \\bigg/ \\frac{dx}{dt}\\) — differentiate the slope with respect to \\(t\\), then divide by \\(dx/dt\\).",
    lesson:
      "Parametric second derivative is not \\(\\frac{d^2 y/dt^2}{d^2 x/dt^2}\\). It's:\n\n$$\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right) = \\frac{\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)}{dx/dt}.$$\n\nStep-by-step:\n1. Compute \\(dy/dx\\) as in 9.1.\n2. Differentiate \\(dy/dx\\) with respect to \\(t\\).\n3. Divide by \\(dx/dt\\).\n\nThe second derivative gives concavity of the parametric curve in the \\(xy\\)-plane.",
    keyIdeas: [
      "Second derivative involves another \\(1/(dx/dt)\\) factor.",
      "Differentiate \\(dy/dx\\) (a function of \\(t\\)) with respect to \\(t\\).",
      "Not the ratio of second derivatives.",
      "Concavity of the curve comes from the sign of \\(d^2 y/dx^2\\).",
    ],
    workedExample: {
      prompt:
        "For \\(x=t^2,\\ y=t^3\\), find \\(d^2y/dx^2\\) at \\(t=1\\).",
      solution:
        "\\(dy/dx = 3t^2/(2t) = 3t/2\\). Differentiate with respect to \\(t\\): \\(d/dt(3t/2) = 3/2\\). Divide by \\(dx/dt = 2t\\): \\(d^2 y/dx^2 = (3/2)/(2t) = 3/(4t)\\). At \\(t=1\\): \\(3/4\\).",
    },
    commonMistakes: [
      "Computing \\((d^2 y/dt^2)/(d^2 x/dt^2)\\) as the second derivative.",
      "Forgetting the extra division by \\(dx/dt\\).",
      "Differentiating \\(dy/dx\\) with respect to \\(x\\) directly.",
    ],
  },
  "9.3": {
    id: "9.3",
    title: "Arc Lengths of Parametric Curves",
    summary:
      "\\(L = \\int_\\alpha^\\beta \\sqrt{(x'(t))^2 + (y'(t))^2}\\,dt\\).",
    lesson:
      "Arc length for parametric curves is distance integrated over time. The speed of the parametric point is \\(|\\vec{r}'(t)| = \\sqrt{(x'(t))^2 + (y'(t))^2}\\); integrating over \\([\\alpha,\\beta]\\) gives total distance traveled, which equals arc length of the traced curve.\n\nThis is the formula to use whenever the curve comes naturally with a parameter — motion problems, for instance.\n\nThese integrals are often non-elementary; calculator or numerical evaluation is common.",
    keyIdeas: [
      "\\(L = \\int \\sqrt{(x')^2 + (y')^2}\\,dt\\).",
      "Same as distance traveled for parametric motion.",
      "Integrals rarely have closed forms.",
      "Generalizes the \\(y = f(x)\\) formula from 8.13.",
    ],
    workedExample: {
      prompt:
        "Find the arc length of \\(x = \\cos t,\\ y = \\sin t\\) on \\([0, \\pi]\\).",
      solution:
        "\\(x'(t) = -\\sin t\\), \\(y'(t) = \\cos t\\). \\(\\sqrt{(-\\sin t)^2 + (\\cos t)^2} = 1\\). \\(L = \\int_0^\\pi 1\\,dt = \\pi\\). (Half of the unit circle — checks out.)",
    },
    commonMistakes: [
      "Squaring only one of \\(x'\\) or \\(y'\\).",
      "Forgetting the square root.",
      "Using \\(x^2 + y^2\\) instead of \\((x')^2 + (y')^2\\).",
    ],
  },
  "9.4": {
    id: "9.4",
    title: "Defining and Differentiating Vector-Valued Functions",
    summary:
      "\\(\\vec{r}(t) = \\langle x(t), y(t)\\rangle\\) is differentiated component-wise: \\(\\vec{r}'(t) = \\langle x'(t), y'(t)\\rangle\\).",
    lesson:
      "A vector-valued function \\(\\vec{r}(t) = \\langle x(t), y(t)\\rangle\\) packages the parametric coordinates into a single object. Its derivative gives the velocity vector: \\(\\vec{v}(t) = \\vec{r}'(t) = \\langle x'(t), y'(t)\\rangle\\). The second derivative is the acceleration vector.\n\nSpeed is the magnitude of velocity: \\(|\\vec{v}(t)| = \\sqrt{(x'(t))^2 + (y'(t))^2}\\).\n\nDirection of motion: the velocity vector points along the tangent in the direction of increasing \\(t\\).",
    keyIdeas: [
      "Differentiate component by component.",
      "\\(\\vec{v} = \\vec{r}'\\); \\(\\vec{a} = \\vec{r}''\\).",
      "Speed = \\(|\\vec{v}|\\) = magnitude of velocity.",
      "Direction of motion = direction of \\(\\vec{v}\\).",
    ],
    workedExample: {
      prompt:
        "For \\(\\vec{r}(t) = \\langle t^2, \\cos t\\rangle\\), find \\(\\vec{v}(\\pi)\\) and the speed at \\(t = \\pi\\).",
      solution:
        "\\(\\vec{v}(t) = \\langle 2t, -\\sin t\\rangle\\). At \\(t=\\pi\\): \\(\\vec{v} = \\langle 2\\pi, 0\\rangle\\). Speed \\(= 2\\pi\\).",
    },
    commonMistakes: [
      "Computing \\(|\\vec{r}|\\) instead of \\(|\\vec{v}|\\) for speed.",
      "Differentiating the components separately but then multiplying them.",
      "Confusing position magnitude with speed.",
    ],
  },
  "9.5": {
    id: "9.5",
    title: "Integrating Vector-Valued Functions",
    summary:
      "Integrate component-wise: \\(\\int \\vec{r}(t)\\,dt = \\langle \\int x(t)\\,dt, \\int y(t)\\,dt\\rangle\\).",
    lesson:
      "Component-wise integration. Given \\(\\vec{v}(t)\\), position at any time is \\(\\vec{r}(t) = \\vec{r}(t_0) + \\int_{t_0}^t \\vec{v}(u)\\,du\\). Each component is a separate scalar integral.\n\nTypical AP problem: given velocity vector and initial position, find position at a later time.",
    keyIdeas: [
      "Integrate each component separately.",
      "Position from velocity: initial position plus integral of velocity vector.",
      "Definite integrals of vector functions give displacement vectors.",
      "Same linearity rules as scalar integrals.",
    ],
    workedExample: {
      prompt:
        "\\(\\vec{v}(t) = \\langle 2t, 3\\rangle\\), \\(\\vec{r}(0) = \\langle 1, 4\\rangle\\). Find \\(\\vec{r}(2)\\).",
      solution:
        "\\(\\vec{r}(2) = \\langle 1, 4\\rangle + \\int_0^2 \\langle 2t, 3\\rangle\\,dt = \\langle 1 + 4, 4 + 6\\rangle = \\langle 5, 10\\rangle\\).",
    },
    commonMistakes: [
      "Forgetting to add the initial position.",
      "Integrating as a single scalar.",
      "Mixing up position and velocity components.",
    ],
  },
  "9.6": {
    id: "9.6",
    title: "Solving Motion Problems Using Parametric and Vector-Valued Functions",
    summary:
      "Position, velocity, acceleration, speed, and direction come from a single vector-valued function.",
    lesson:
      "Full motion protocol for a particle with position \\(\\vec{r}(t) = \\langle x(t), y(t)\\rangle\\):\n- **Velocity**: \\(\\vec{v}(t) = \\vec{r}'(t)\\).\n- **Speed**: \\(|\\vec{v}(t)|\\).\n- **Acceleration**: \\(\\vec{a}(t) = \\vec{r}''(t)\\).\n- **Distance traveled**: \\(\\int |\\vec{v}(t)|\\,dt\\).\n- **Direction of motion**: direction of \\(\\vec{v}\\) (often as an angle or unit vector).\n\nThis is the 2D generalization of Unit 4 straight-line motion. Problems often ask for all of these; compute them systematically.",
    keyIdeas: [
      "Vector derivatives → velocity → acceleration.",
      "Speed = magnitude of velocity.",
      "Distance traveled = integral of speed.",
      "Direction of motion = unit vector in direction of \\(\\vec{v}\\).",
    ],
    commonMistakes: [
      "Reporting speed as a vector.",
      "Reporting velocity as a scalar.",
      "Forgetting to integrate |v|, not v, for distance.",
    ],
  },
  "9.7": {
    id: "9.7",
    title: "Polar Coordinates and Differentiation in Polar Form",
    summary:
      "In polar, \\(r = f(\\theta)\\). Convert via \\(x = r\\cos\\theta,\\ y = r\\sin\\theta\\); differentiate as parametric in \\(\\theta\\).",
    lesson:
      "Polar coordinates describe a point by distance \\(r\\) from the origin and angle \\(\\theta\\) from the positive \\(x\\)-axis. A curve \\(r = f(\\theta)\\) can be converted to parametric:\n\n$$x(\\theta) = f(\\theta)\\cos\\theta,\\quad y(\\theta) = f(\\theta)\\sin\\theta.$$\n\nDifferentiating these as parametric (with parameter \\(\\theta\\)) gives:\n\n$$\\frac{dy}{dx} = \\frac{dy/d\\theta}{dx/d\\theta} = \\frac{f'(\\theta)\\sin\\theta + f(\\theta)\\cos\\theta}{f'(\\theta)\\cos\\theta - f(\\theta)\\sin\\theta}.$$\n\nUse this to find tangent lines, horizontal/vertical tangents, and concavity for polar curves.",
    keyIdeas: [
      "Polar conversion: \\(x = r\\cos\\theta,\\ y = r\\sin\\theta\\).",
      "Treat polar curves as parametric in \\(\\theta\\).",
      "\\(dy/dx\\) uses the product rule via the conversion.",
      "Horizontal tangent ⇔ \\(dy/d\\theta = 0\\) and \\(dx/d\\theta \\ne 0\\).",
    ],
    workedExample: {
      prompt:
        "For the cardioid \\(r = 1 + \\cos\\theta\\), find \\(dy/dx\\) at \\(\\theta = \\pi/2\\).",
      solution:
        "\\(f'(\\theta) = -\\sin\\theta\\). At \\(\\theta = \\pi/2\\), \\(f = 1\\), \\(f' = -1\\). Numerator: \\((-1)(1) + (1)(0) = -1\\). Denominator: \\((-1)(0) - (1)(1) = -1\\). \\(dy/dx = (-1)/(-1) = 1\\).",
    },
    commonMistakes: [
      "Differentiating \\(r\\) directly against \\(\\theta\\) and calling it \\(dy/dx\\).",
      "Forgetting the product rule when converting.",
      "Using degrees instead of radians.",
    ],
  },
  "9.8": {
    id: "9.8",
    title: "Area of a Polar Region Bounded by a Single Curve",
    summary:
      "Area swept by \\(r = f(\\theta)\\) from \\(\\theta=\\alpha\\) to \\(\\beta\\) is \\(\\frac{1}{2}\\int_\\alpha^\\beta [f(\\theta)]^2\\,d\\theta\\).",
    lesson:
      "A polar area element is a thin sector: radius \\(r\\), angle \\(d\\theta\\), area \\(\\frac{1}{2}r^2\\,d\\theta\\). Integrating over the angular range gives the enclosed area:\n\n$$A = \\frac{1}{2}\\int_\\alpha^\\beta [f(\\theta)]^2\\,d\\theta.$$\n\nFor closed curves, \\(\\alpha\\) and \\(\\beta\\) typically differ by \\(2\\pi\\). For loops (like a rose petal), identify where \\(r = 0\\) to set the limits.",
    keyIdeas: [
      "Polar area = \\(\\frac{1}{2}\\int r^2\\,d\\theta\\).",
      "Identify \\(r = 0\\) for loop boundaries.",
      "No Cartesian conversion needed.",
      "Area element is a sector, not a rectangle.",
    ],
    workedExample: {
      prompt:
        "Find the area enclosed by \\(r = 2\\sin\\theta\\).",
      solution:
        "This is a circle traced once on \\([0,\\pi]\\). \\(A = \\frac{1}{2}\\int_0^\\pi 4\\sin^2\\theta\\,d\\theta = 2\\int_0^\\pi \\sin^2\\theta\\,d\\theta = 2 \\cdot \\pi/2 = \\pi\\).",
    },
    commonMistakes: [
      "Forgetting the \\(\\frac{1}{2}\\).",
      "Using \\(r\\) instead of \\(r^2\\).",
      "Integrating over the wrong angular range (too much or too little).",
    ],
  },
  "9.9": {
    id: "9.9",
    title: "Area Between Two Polar Curves",
    summary:
      "Between \\(r_1 = f(\\theta)\\) (outer) and \\(r_2 = g(\\theta)\\) (inner), area is \\(\\frac{1}{2}\\int (f^2 - g^2)\\,d\\theta\\).",
    lesson:
      "Same logic as washers in rectangular: outer region area minus inner region area:\n\n$$A = \\frac{1}{2}\\int_\\alpha^\\beta ([f(\\theta)]^2 - [g(\\theta)]^2)\\,d\\theta.$$\n\nLimits come from intersections. Solve \\(f(\\theta) = g(\\theta)\\) for \\(\\theta\\); check which curve is outer on each sub-interval (use specific test values of \\(\\theta\\)).",
    keyIdeas: [
      "Outer squared minus inner squared.",
      "Find intersections by setting the two \\(r\\) equations equal.",
      "Check outer vs. inner on each sub-interval.",
      "Same \\(\\frac{1}{2}\\) factor as single-curve area.",
    ],
    workedExample: {
      prompt:
        "Find the area inside \\(r = 3\\sin\\theta\\) and outside \\(r = 1 + \\sin\\theta\\).",
      solution:
        "Set equal: \\(3\\sin\\theta = 1 + \\sin\\theta \\Rightarrow 2\\sin\\theta = 1 \\Rightarrow \\sin\\theta = 1/2\\), so \\(\\theta = \\pi/6, 5\\pi/6\\). On that range, \\(3\\sin\\theta\\) is outer. \\(A = \\frac{1}{2}\\int_{\\pi/6}^{5\\pi/6}((3\\sin\\theta)^2 - (1+\\sin\\theta)^2)\\,d\\theta\\). Expanding and integrating (standard techniques) gives \\(\\pi\\).",
    },
    commonMistakes: [
      "Subtracting before squaring.",
      "Forgetting to find intersections.",
      "Mis-identifying outer vs. inner on an interval.",
    ],
  },

  // =========================================================================
  // UNIT 10 — INFINITE SEQUENCES AND SERIES
  // =========================================================================
  "10.1": {
    id: "10.1",
    title: "Defining Convergent and Divergent Infinite Series",
    summary:
      "A series \\(\\sum a_n\\) converges if its sequence of partial sums \\(S_n = a_1 + \\cdots + a_n\\) has a finite limit; otherwise it diverges.",
    lesson:
      "Let \\(a_n\\) be a sequence. The partial sums are \\(S_n = \\sum_{k=1}^n a_k\\). The series \\(\\sum_{n=1}^\\infty a_n\\) converges to \\(L\\) if \\(\\lim_{n\\to\\infty} S_n = L\\). Otherwise it diverges.\n\nThis is the formal definition. In practice, we use convergence tests (10.3–10.10) to decide, rather than computing partial sums directly.\n\nKey language distinctions:\n- **Sequence**: a list \\(\\{a_n\\}\\).\n- **Series**: the sum \\(\\sum a_n\\).\n- **Partial sum**: \\(S_n\\), a specific truncation.\n\nThe AP exam tests all three. Don't blur them.",
    keyIdeas: [
      "Series converges iff partial sums have a finite limit.",
      "Sequence vs. series vs. partial sum — three distinct objects.",
      "Convergence tests let you decide without summing directly.",
      "A convergent series' value is the limit of partial sums.",
    ],
    commonMistakes: [
      "Confusing sequence convergence with series convergence.",
      "Treating \\(\\lim a_n\\) as the value of the series.",
      "Dropping the \"partial\" in partial sum.",
    ],
  },
  "10.2": {
    id: "10.2",
    title: "Working with Geometric Series",
    summary:
      "\\(\\sum_{n=0}^\\infty a r^n\\) converges to \\(a/(1-r)\\) iff \\(|r| < 1\\); diverges otherwise.",
    lesson:
      "A geometric series has ratio \\(r\\) between consecutive terms: \\(a, ar, ar^2, \\ldots\\). The partial sum \\(S_n = a(1 - r^{n+1})/(1-r)\\) (for \\(r \\ne 1\\)).\n\nLimit: if \\(|r| < 1\\), \\(r^{n+1} \\to 0\\), so \\(S_n \\to a/(1-r)\\). If \\(|r| \\ge 1\\), the series diverges.\n\nGeometric series are the foundation of power series and Taylor series: \\(1/(1-x) = \\sum x^n\\) for \\(|x|<1\\) is the starting point for many derivations. Know the formula cold and recognize \"hidden\" geometric series (e.g., \\(\\sum 3 \\cdot (2/3)^n\\)).",
    keyIdeas: [
      "Geometric: constant ratio \\(r\\).",
      "Convergence iff \\(|r| < 1\\).",
      "Sum (starting at \\(n=0\\)): \\(a/(1-r)\\).",
      "Foundation of Taylor series.",
    ],
    workedExample: {
      prompt:
        "Find the sum \\(\\sum_{n=0}^\\infty 3(1/2)^n\\).",
      solution:
        "\\(a = 3\\), \\(r = 1/2\\). Sum \\(= 3/(1 - 1/2) = 6\\).",
    },
    commonMistakes: [
      "Using the formula when \\(|r| \\ge 1\\).",
      "Getting \\(a\\) wrong (it's the first term, with care about the starting index).",
      "Mixing up \\(1/(1-r)\\) with \\(1/(r-1)\\).",
    ],
  },
  "10.3": {
    id: "10.3",
    title: "The \\(n\\)-th Term Test for Divergence",
    summary:
      "If \\(\\lim_{n\\to\\infty} a_n \\ne 0\\), then \\(\\sum a_n\\) diverges. (Does not establish convergence.)",
    lesson:
      "Necessary condition for convergence: if \\(\\sum a_n\\) converges, then \\(\\lim a_n = 0\\). Contrapositive: if \\(\\lim a_n \\ne 0\\) (or doesn't exist), the series diverges.\n\nThis is a **divergence test only**. \\(\\lim a_n = 0\\) does NOT imply convergence — the harmonic series \\(\\sum 1/n\\) has \\(\\lim 1/n = 0\\) but diverges.\n\nUse as a first pass: if you can quickly show \\(\\lim a_n \\ne 0\\), you're done. Otherwise move to other tests.",
    keyIdeas: [
      "If \\(\\lim a_n \\ne 0\\), the series diverges.",
      "If \\(\\lim a_n = 0\\), the test is inconclusive.",
      "Always the first test to try.",
      "Don't misuse as a convergence test.",
    ],
    workedExample: {
      prompt:
        "Does \\(\\sum_{n=1}^\\infty \\frac{n}{n+1}\\) converge?",
      solution:
        "\\(\\lim_{n\\to\\infty} n/(n+1) = 1 \\ne 0\\). By the \\(n\\)-th term test, the series diverges.",
    },
    commonMistakes: [
      "Concluding convergence when \\(\\lim a_n = 0\\).",
      "Using the test when \\(\\lim a_n\\) doesn't exist (still works — if it doesn't go to 0, it can't be 0).",
      "Computing \\(\\lim a_n\\) incorrectly.",
    ],
  },
  "10.4": {
    id: "10.4",
    title: "Integral Test for Convergence",
    summary:
      "If \\(f\\) is positive, continuous, decreasing on \\([1,\\infty)\\) with \\(a_n = f(n)\\), then \\(\\sum a_n\\) and \\(\\int_1^\\infty f(x)\\,dx\\) converge together.",
    lesson:
      "For a positive, continuous, decreasing \\(f\\), the series \\(\\sum_{n=1}^\\infty f(n)\\) and the improper integral \\(\\int_1^\\infty f(x)\\,dx\\) are simultaneously convergent or divergent.\n\nUse when \\(a_n = f(n)\\) is easy to integrate. Standard application: proves the \\(p\\)-series result in 10.5.\n\nCheck the three conditions (positive, continuous, decreasing) explicitly before applying.",
    keyIdeas: [
      "Tied to improper integrals: converge together, diverge together.",
      "Requires positive, continuous, decreasing.",
      "Use for terms that match a nice integrable function.",
      "Typical setup: \\(a_n = 1/n^p\\), or \\(a_n = \\ln n / n\\), etc.",
    ],
    workedExample: {
      prompt:
        "Does \\(\\sum_{n=1}^\\infty \\frac{1}{n^2}\\) converge by the integral test?",
      solution:
        "\\(f(x) = 1/x^2\\) is positive, continuous, decreasing on \\([1,\\infty)\\). \\(\\int_1^\\infty 1/x^2\\,dx = 1\\) (finite). So the series converges.",
    },
    commonMistakes: [
      "Applying the test without checking the three conditions.",
      "Equating the integral's value to the series' value (they converge together but have different sums).",
      "Dropping the lower limit (doesn't have to be 1 — any integer is fine).",
    ],
  },
  "10.5": {
    id: "10.5",
    title: "Harmonic Series and \\(p\\)-Series",
    summary:
      "\\(\\sum 1/n^p\\) converges iff \\(p > 1\\). The harmonic series \\(p=1\\) diverges.",
    lesson:
      "The \\(p\\)-series \\(\\sum_{n=1}^\\infty 1/n^p\\) converges iff \\(p > 1\\). This follows from the integral test applied to \\(1/x^p\\).\n\nSpecial cases worth memorizing:\n- \\(p=1\\): harmonic, \\(\\sum 1/n\\), diverges.\n- \\(p=2\\): \\(\\sum 1/n^2 = \\pi^2/6\\), converges.\n- \\(p=1/2\\): \\(\\sum 1/\\sqrt{n}\\), diverges.\n\nUse \\(p\\)-series as the benchmark for comparison tests — they're the natural reference for \"nice\" polynomial decay.",
    keyIdeas: [
      "Convergence iff \\(p > 1\\).",
      "Harmonic (\\(p=1\\)) diverges — a classical fact.",
      "Use as benchmark for comparison tests.",
      "Limit benchmark behavior of polynomial-type series.",
    ],
    workedExample: {
      prompt:
        "Classify \\(\\sum 1/\\sqrt[3]{n}\\).",
      solution:
        "\\(1/\\sqrt[3]{n} = 1/n^{1/3}\\), so \\(p = 1/3 < 1\\). Diverges.",
    },
    commonMistakes: [
      "Thinking the harmonic series converges because \\(\\lim 1/n = 0\\).",
      "Misidentifying \\(p\\) in fractional-power form.",
      "Forgetting the \\(p > 1\\) boundary.",
    ],
  },
  "10.6": {
    id: "10.6",
    title: "Comparison Tests for Convergence",
    summary:
      "Direct comparison: \\(0 \\le a_n \\le b_n\\) and \\(\\sum b_n\\) converges ⇒ \\(\\sum a_n\\) converges. Limit comparison: \\(\\lim a_n/b_n = c > 0\\) ⇒ both converge or both diverge.",
    lesson:
      "**Direct comparison**: if \\(0 \\le a_n \\le b_n\\) for all large \\(n\\):\n- \\(\\sum b_n\\) converges ⇒ \\(\\sum a_n\\) converges.\n- \\(\\sum a_n\\) diverges ⇒ \\(\\sum b_n\\) diverges.\n\n**Limit comparison**: if \\(a_n, b_n > 0\\) and \\(\\lim a_n/b_n = c\\) with \\(0 < c < \\infty\\), then \\(\\sum a_n\\) and \\(\\sum b_n\\) have the same convergence behavior.\n\nLimit comparison is often easier. Use \\(p\\)-series or geometric series as the benchmark.",
    keyIdeas: [
      "Direct comparison requires term-wise inequality.",
      "Limit comparison needs only same asymptotic rate.",
      "Benchmark with \\(p\\)-series or geometric.",
      "Both tests require positive terms.",
    ],
    workedExample: {
      prompt:
        "Does \\(\\sum \\frac{1}{n^2 + 1}\\) converge?",
      solution:
        "Compare to \\(1/n^2\\): \\(\\lim (1/(n^2+1)) / (1/n^2) = \\lim n^2/(n^2+1) = 1\\). Since \\(\\sum 1/n^2\\) converges, so does the given series by limit comparison.",
    },
    commonMistakes: [
      "Comparing with a divergent benchmark to conclude convergence.",
      "Using direct comparison when the inequality doesn't hold.",
      "Choosing a benchmark with \\(\\lim a_n/b_n = 0\\) or \\(\\infty\\) — then only partial conclusions.",
    ],
  },
  "10.7": {
    id: "10.7",
    title: "Alternating Series Test",
    summary:
      "If \\(b_n > 0\\), \\(b_n\\) decreasing, and \\(\\lim b_n = 0\\), then \\(\\sum (-1)^n b_n\\) converges.",
    lesson:
      "Leibniz's test. Three conditions on the magnitudes \\(b_n\\):\n1. All positive.\n2. Eventually decreasing.\n3. Limit 0.\n\nIf all three hold, the alternating series \\(\\sum (-1)^n b_n\\) or \\(\\sum (-1)^{n+1} b_n\\) converges.\n\nThe test applies only to series that actually alternate sign. Write terms out to confirm.",
    keyIdeas: [
      "Three conditions: positive, decreasing, limit zero.",
      "Applies to alternating series.",
      "Different from convergence tests for positive-term series.",
      "Works even when the absolute version \\(\\sum b_n\\) diverges (conditional convergence).",
    ],
    workedExample: {
      prompt:
        "Does \\(\\sum (-1)^{n+1}/n\\) converge?",
      solution:
        "\\(b_n = 1/n\\): positive, decreasing, limit 0. By AST, the alternating harmonic series converges (to \\(\\ln 2\\)).",
    },
    commonMistakes: [
      "Forgetting to check that \\(b_n\\) is decreasing (not just positive and going to 0).",
      "Applying to non-alternating series.",
      "Calling convergence absolute when it's only conditional.",
    ],
  },
  "10.8": {
    id: "10.8",
    title: "Ratio Test for Convergence",
    summary:
      "Let \\(L = \\lim |a_{n+1}/a_n|\\). If \\(L<1\\), \\(\\sum a_n\\) converges absolutely; \\(L>1\\), diverges; \\(L=1\\), inconclusive.",
    lesson:
      "The ratio test is the go-to for series with factorials, powers, or exponentials.\n\nCompute \\(L = \\lim_{n\\to\\infty}|a_{n+1}/a_n|\\):\n- \\(L < 1\\): absolute convergence.\n- \\(L > 1\\) (including \\(\\infty\\)): divergence.\n- \\(L = 1\\): inconclusive, use another test.\n\nUseful identities: \\((n+1)! / n! = n+1\\); \\((n+1)^{n+1}/n^n\\) grows like \\(e \\cdot n\\).",
    keyIdeas: [
      "\\(L = \\lim |a_{n+1}/a_n|\\).",
      "\\(L < 1\\) ⇒ absolute convergence.",
      "\\(L = 1\\) ⇒ inconclusive.",
      "Great for factorials, exponentials, nested powers.",
    ],
    workedExample: {
      prompt:
        "Does \\(\\sum n!/n^n\\) converge by the ratio test?",
      solution:
        "\\(a_{n+1}/a_n = (n+1)!/(n+1)^{n+1} \\cdot n^n/n! = n^n/(n+1)^n = 1/(1+1/n)^n \\to 1/e < 1\\). Converges absolutely.",
    },
    commonMistakes: [
      "Forgetting absolute values when terms change sign.",
      "Concluding divergence when \\(L = 1\\).",
      "Algebra errors in the ratio simplification.",
    ],
  },
  "10.9": {
    id: "10.9",
    title: "Determining Absolute or Conditional Convergence",
    summary:
      "Absolute: \\(\\sum |a_n|\\) converges. Conditional: \\(\\sum a_n\\) converges but \\(\\sum |a_n|\\) diverges.",
    lesson:
      "Two flavors of convergence for series with sign changes:\n- **Absolute**: \\(\\sum |a_n|\\) converges. Strongest form.\n- **Conditional**: \\(\\sum a_n\\) converges but \\(\\sum |a_n|\\) diverges. Happens for series like the alternating harmonic.\n\nAbsolute convergence implies convergence. The converse fails: conditionally convergent series rely on sign cancellation.\n\nOn AP questions, classify: apply a convergence test to \\(|a_n|\\). If it converges, call it absolute. If not, test the alternating series for (at least) conditional convergence.",
    keyIdeas: [
      "Absolute ⇒ regular convergence.",
      "Conditional: converges via cancellation, but not absolutely.",
      "Alternating harmonic is the canonical conditional example.",
      "Check \\(|a_n|\\) first, then \\(a_n\\).",
    ],
    commonMistakes: [
      "Calling a series conditionally convergent without first verifying non-absolute.",
      "Failing to check alternating conditions separately from absolute ones.",
      "Confusing the two types.",
    ],
  },
  "10.10": {
    id: "10.10",
    title: "Alternating Series Error Bound",
    summary:
      "Error \\(|S - S_n|\\) is at most the magnitude of the first omitted term: \\(|S - S_n| \\le b_{n+1}\\).",
    lesson:
      "For a convergent alternating series satisfying the AST, truncating at \\(S_n\\) leaves error bounded by the next term: \\(|S - S_n| \\le b_{n+1}\\). The actual error has the sign of the next included term.\n\nThis is the simplest error bound in series — no calculus required once you know \\(b_{n+1}\\).",
    keyIdeas: [
      "\\(|S - S_n| \\le b_{n+1}\\).",
      "Works only for AST-satisfying alternating series.",
      "Sign of actual error matches the next term.",
      "Give an exact bound, not just a qualitative statement.",
    ],
    workedExample: {
      prompt:
        "\\(\\sum (-1)^{n+1}/n^3\\). If you stop at \\(n=5\\), bound the error.",
      solution:
        "\\(b_6 = 1/6^3 = 1/216\\). \\(|S - S_5| \\le 1/216 \\approx 0.0046\\).",
    },
    commonMistakes: [
      "Using this bound for non-alternating series.",
      "Using \\(b_n\\) instead of \\(b_{n+1}\\) (the next term).",
      "Forgetting the absolute value in the bound.",
    ],
  },
  "10.11": {
    id: "10.11",
    title: "Finding Taylor Polynomial Approximations",
    summary:
      "\\(T_n(x) = \\sum_{k=0}^n \\frac{f^{(k)}(a)}{k!}(x-a)^k\\) approximates \\(f(x)\\) near \\(x=a\\).",
    lesson:
      "Taylor polynomial of degree \\(n\\) centered at \\(a\\):\n\n$$T_n(x) = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\cdots + \\frac{f^{(n)}(a)}{n!}(x-a)^n.$$\n\nWhen \\(a = 0\\), it's called the **Maclaurin polynomial**. As \\(n\\) grows, \\(T_n\\) fits \\(f\\) increasingly well near \\(a\\).\n\nKey standard Maclaurin series:\n- \\(e^x = \\sum x^n/n!\\)\n- \\(\\sin x = \\sum (-1)^n x^{2n+1}/(2n+1)!\\)\n- \\(\\cos x = \\sum (-1)^n x^{2n}/(2n)!\\)\n- \\(1/(1-x) = \\sum x^n\\) for \\(|x|<1\\)\n- \\(\\ln(1+x) = \\sum (-1)^{n+1} x^n/n\\) for \\(|x|\\le 1,\\ x>-1\\)",
    keyIdeas: [
      "Coefficient of \\((x-a)^k\\) is \\(f^{(k)}(a)/k!\\).",
      "Maclaurin = Taylor at \\(a=0\\).",
      "Memorize the five standard Maclaurin series.",
      "Substituting into a known series often saves work.",
    ],
    workedExample: {
      prompt:
        "Find the degree-3 Maclaurin polynomial for \\(f(x) = e^x\\).",
      solution:
        "\\(f^{(k)}(0) = 1\\) for all \\(k\\). \\(T_3(x) = 1 + x + x^2/2 + x^3/6\\).",
    },
    commonMistakes: [
      "Forgetting the \\(k!\\) in the denominator.",
      "Using \\((x+a)\\) instead of \\((x-a)\\).",
      "Miscounting the degree (degree \\(n\\) has terms up through \\(x^n\\)).",
    ],
  },
  "10.12": {
    id: "10.12",
    title: "Lagrange Error Bound",
    summary:
      "\\(|f(x) - T_n(x)| \\le \\frac{M}{(n+1)!}|x-a|^{n+1}\\) where \\(M\\) bounds \\(|f^{(n+1)}|\\) on the interval between \\(a\\) and \\(x\\).",
    lesson:
      "The remainder after truncating a Taylor series at degree \\(n\\) is bounded by the next term's magnitude with the derivative's max on the interval:\n\n$$|R_n(x)| \\le \\frac{M}{(n+1)!}|x-a|^{n+1}.$$\n\nHere \\(M\\) is any upper bound for \\(|f^{(n+1)}(t)|\\) on the interval between \\(a\\) and \\(x\\). Often \\(M\\) is obvious (e.g., for \\(\\sin, \\cos\\), all derivatives are bounded by 1).\n\nAP FRQ template: given \\(f\\), approximate \\(f(x_0)\\) with a Taylor polynomial and bound the error with Lagrange. State \\(M\\) explicitly.",
    keyIdeas: [
      "\\(|R_n(x)| \\le M/(n+1)! \\cdot |x-a|^{n+1}\\).",
      "\\(M\\) is a bound on \\(|f^{(n+1)}|\\) over the interval.",
      "Works for any function with enough derivatives.",
      "Much stronger than the alternating-series bound in general.",
    ],
    workedExample: {
      prompt:
        "Bound the error when approximating \\(\\sin(0.1)\\) by \\(T_3(x) = x - x^3/6\\) at \\(a=0\\).",
      solution:
        "\\(|f^{(4)}(t)| = |\\sin t| \\le 1\\), so \\(M = 1\\). \\(|R_3(0.1)| \\le (1/4!)(0.1)^4 = 0.0001/24 \\approx 4.17\\times 10^{-6}\\).",
    },
    commonMistakes: [
      "Using \\(M\\) that doesn't actually bound \\(|f^{(n+1)}|\\) on the whole interval.",
      "Confusing \\(n!\\) with \\((n+1)!\\).",
      "Using the wrong power of \\(|x-a|\\).",
    ],
  },
  "10.13": {
    id: "10.13",
    title: "Radius and Interval of Convergence of Power Series",
    summary:
      "A power series \\(\\sum c_n(x-a)^n\\) converges on an interval of radius \\(R\\) around \\(a\\). Find \\(R\\) via the ratio test.",
    lesson:
      "Given \\(\\sum c_n (x-a)^n\\), apply the ratio test:\n\n$$L = \\lim_{n\\to\\infty}\\left|\\frac{c_{n+1}(x-a)^{n+1}}{c_n(x-a)^n}\\right| = |x-a| \\cdot \\lim\\left|\\frac{c_{n+1}}{c_n}\\right|.$$\n\nConvergence requires \\(L < 1\\), i.e., \\(|x-a| < R\\) where \\(R = 1 / \\lim |c_{n+1}/c_n|\\). \\(R\\) is the **radius of convergence**.\n\nCheck endpoints \\(x = a \\pm R\\) separately — the ratio test is inconclusive there. Use other tests (alternating, comparison, \\(p\\)-series) to decide.\n\nThe interval of convergence is \\(|x - a| < R\\) plus any converging endpoints.",
    keyIdeas: [
      "Ratio test gives the radius.",
      "Endpoints require separate tests.",
      "Interval of convergence includes all \\(x\\) where series converges.",
      "Radius can be 0, finite, or infinite.",
    ],
    workedExample: {
      prompt:
        "Find the radius and interval of convergence of \\(\\sum x^n/n\\).",
      solution:
        "Ratio test: \\(\\lim |x^{n+1}/(n+1) \\cdot n/x^n| = |x|\\lim n/(n+1) = |x|\\). Converges for \\(|x|<1\\), so \\(R = 1\\). Endpoints: \\(x=1\\) gives \\(\\sum 1/n\\) (diverges); \\(x=-1\\) gives \\(\\sum (-1)^n/n\\) (converges by AST). Interval: \\([-1, 1)\\).",
    },
    commonMistakes: [
      "Forgetting to check endpoints.",
      "Reporting the radius as an interval (they're different concepts).",
      "Algebra errors in the ratio simplification.",
    ],
  },
  "10.14": {
    id: "10.14",
    title: "Finding Taylor or Maclaurin Series for a Function",
    summary:
      "Build Taylor series by computing derivatives at \\(a\\), or manipulate known series via substitution, differentiation, integration, and multiplication.",
    lesson:
      "**Direct method**: compute \\(f(a), f'(a), f''(a), \\ldots\\), then write \\(\\sum f^{(k)}(a)(x-a)^k/k!\\).\n\n**Manipulation method** (usually faster on AP): start from a known series and substitute, differentiate, integrate, or multiply.\n\nExamples:\n- Maclaurin for \\(\\sin(x^2)\\): substitute \\(x \\to x^2\\) into \\(\\sin x = \\sum(-1)^n x^{2n+1}/(2n+1)!\\) to get \\(\\sum(-1)^n x^{4n+2}/(2n+1)!\\).\n- Maclaurin for \\(1/(1-x^2)\\): substitute into geometric.\n- Maclaurin for \\(-\\ln(1-x)\\): integrate geometric term-by-term.\n\nAlways cite the parent series you're manipulating.",
    keyIdeas: [
      "Direct method via derivatives; manipulation method via known series.",
      "Differentiation and integration of power series work term-wise on the interval of convergence.",
      "Substitution preserves (or shrinks) the interval of convergence.",
      "Cite the known series you're starting from.",
    ],
    workedExample: {
      prompt:
        "Find the Maclaurin series for \\(\\cos(x^2)\\).",
      solution:
        "\\(\\cos x = \\sum (-1)^n x^{2n}/(2n)!\\). Substitute \\(x \\to x^2\\): \\(\\cos(x^2) = \\sum (-1)^n x^{4n}/(2n)!\\).",
    },
    commonMistakes: [
      "Doing derivative-by-derivative when a substitution trick would work.",
      "Mixing up the exponent after substitution.",
      "Forgetting to update the interval of convergence after manipulation.",
    ],
  },
  "10.15": {
    id: "10.15",
    title: "Representing Functions as Power Series",
    summary:
      "On the interval of convergence, a function equals its Taylor series — and you can differentiate or integrate term-by-term.",
    lesson:
      "If \\(f(x) = \\sum c_n (x-a)^n\\) on an interval of convergence, then on that interval:\n- \\(f'(x) = \\sum n c_n (x-a)^{n-1}\\) (term-by-term derivative).\n- \\(\\int f(x)\\,dx = C + \\sum c_n (x-a)^{n+1}/(n+1)\\).\n\nInterval of convergence is preserved under these operations (endpoint behavior may change).\n\nMain AP applications:\n- Finding series for functions that aren't in the standard list (by manipulation).\n- Evaluating limits or integrals that otherwise resist closed-form.\n- Approximating function values with bounded error (via 10.12).",
    keyIdeas: [
      "Power series can be differentiated and integrated term-by-term.",
      "Interval of convergence preserved (endpoints may change).",
      "Use series to evaluate awkward limits or integrals.",
      "Many standard proofs (Euler's formula, etc.) rest on term-wise manipulation.",
    ],
    workedExample: {
      prompt:
        "Use series to evaluate \\(\\int_0^1 \\frac{\\sin x}{x}\\,dx\\) approximately.",
      solution:
        "\\(\\sin x / x = \\sum (-1)^n x^{2n}/(2n+1)!\\). Integrate term-by-term on \\([0,1]\\): \\(\\sum (-1)^n/((2n+1)\\cdot(2n+1)!)\\). Truncating after three terms gives \\(1 - 1/18 + 1/600 \\approx 0.9461\\) (the Si(1) value is ≈ 0.9461).",
    },
    commonMistakes: [
      "Differentiating or integrating outside the interval of convergence.",
      "Confusing the integral of a series with the series of an integral (they match, but handle signs carefully).",
      "Losing track of the shift in exponent after integrating.",
    ],
  },
};
