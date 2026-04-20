import type { CourseCedLessons } from "./types";

/**
 * AP Statistics CED lessons — every topic from Units 1-9 of the CED.
 * Content is organized by the 9-unit topic IDs used throughout the app
 * (1.1 through 9.6). The 2026-27 AP Statistics framework reshuffles the
 * same material into 13 thematic units (categorical, 1-var quant, normal
 * distribution, etc.); every screenshot-level topic has a lesson here.
 *
 * Style: direct, procedural, tuned to how AP readers actually score FRQs
 * — "state the conditions, state the name of the procedure, show the
 * work, interpret the result in context." Inline LaTeX uses \\(...\\) so
 * the MathRender pipeline picks it up.
 */

export const AP_STATISTICS_CED_LESSONS: CourseCedLessons = {
  // =========================================================================
  // UNIT 1 — EXPLORING ONE-VARIABLE DATA
  // =========================================================================
  "1.1": {
    id: "1.1",
    title: "Introducing Statistics: What Can We Learn from Data?",
    summary:
      "Statistics is the science of learning from variability — using data to describe patterns and draw conclusions under uncertainty.",
    lesson:
      "Statistics is not just arithmetic on a dataset. It is a four-step investigative process: (1) ask a statistical question, (2) collect data, (3) analyze the data, (4) interpret results in context. A statistical question is one that anticipates variability — 'How tall are students in my school?' is statistical because heights vary, while 'How tall am I?' is not.\n\nThe AP exam rewards students who always name the context and always acknowledge variability. Raw numbers mean nothing without units, sampling frame, and a question they are answering. Throughout this course, every conclusion you make ends with a sentence that mentions the population and the variable in plain language.\n\nVariability is the core concept of the whole course. Two classes of students given the same quiz will produce different means. Two samples from the same population will produce different proportions. Statistics quantifies that variability and uses it to judge whether a pattern is a real signal or plausibly just noise. Chapter by chapter, we build the tools — distributions, probability, sampling models, confidence intervals, hypothesis tests — that answer 'could this have happened by chance alone?'",
    keyIdeas: [
      "Statistical questions anticipate variability in the answer.",
      "The process: ask → collect → analyze → interpret (always in context).",
      "Every conclusion must reference units, population, and variable.",
      "Variability is the central object of study, not the enemy of clean data.",
    ],
    workedExample: {
      prompt:
        "Decide whether the following is a statistical question: 'What is the average number of hours of sleep students at my school get per night?' Explain.",
      solution:
        "Yes — it is a statistical question. Different students get different amounts of sleep, so the answer varies across the population. Answering it requires collecting data from a sample, summarizing, and acknowledging that our estimate will have some sampling variability.",
    },
    commonMistakes: [
      "Dropping context from conclusions ('the mean is 5') instead of ('the mean hours of sleep for students in my school is 5').",
      "Treating a single data point as the answer instead of a distribution.",
      "Confusing 'varied answers' (statistical) with 'disagreement' (opinion).",
    ],
  },
  "1.2": {
    id: "1.2",
    title: "The Language of Variation: Variables",
    summary:
      "A variable is a characteristic that changes from one individual to another. Variables are either categorical or quantitative.",
    lesson:
      "Every AP Stats problem starts with identifying the variable(s) and the individuals. Individuals are the objects described by the data (students, cars, coffee shops). A variable is any attribute recorded about them.\n\nTwo fundamental types: categorical (a.k.a. qualitative) variables record category labels — eye color, political party, yes/no responses. Quantitative variables record numerical amounts on which arithmetic is meaningful — height in cm, test score, minutes waited. Zip codes and jersey numbers are digits but categorical, because averaging them is nonsense.\n\nQuantitative variables split further: discrete (countable — number of pets) versus continuous (measured on a scale — weight in kg). The type of variable dictates which graphs and summaries are legal. Categorical → bar charts, tables, proportions. Quantitative → histograms, dotplots, means, medians. You will lose points on FRQs if you make a histogram of a categorical variable or compute a mean of zip codes.",
    keyIdeas: [
      "Identify individuals and variables before doing anything else.",
      "Categorical = labels/categories; quantitative = meaningful numbers.",
      "Quantitative discrete (counted) vs. continuous (measured).",
      "Graph and summary choice follows variable type — the two are not interchangeable.",
    ],
    workedExample: {
      prompt:
        "Classify: (a) number of siblings, (b) favorite sport, (c) SAT score, (d) ZIP code.",
      solution:
        "(a) quantitative discrete — you count siblings. (b) categorical — labels. (c) quantitative (treated continuous in practice) — numeric score you can average. (d) categorical — digits but no arithmetic meaning.",
    },
    commonMistakes: [
      "Calling a numeric-looking variable quantitative without asking if arithmetic is meaningful (phone numbers, jersey numbers).",
      "Making histograms for categorical data or bar charts for quantitative data.",
      "Forgetting to name individuals when defining the variable.",
    ],
  },
  "1.3": {
    id: "1.3",
    title: "Representing a Categorical Variable with Tables",
    summary:
      "Frequency and relative-frequency tables summarize counts or proportions for each category.",
    lesson:
      "A frequency table lists each category with its count. A relative frequency table divides each count by the total, giving proportions (or percentages). Relative frequencies let you compare groups of different sizes — raw counts alone can mislead if \\(n\\) differs.\n\nFor a two-way table (two categorical variables), the margin of the table (row/column totals) gives marginal distributions, and the body gives joint frequencies. We will return to these in Unit 2 to compute conditional distributions. For one variable, the relative frequencies should sum to 1 (or 100%); off-by-rounding is fine, a missing row is not.\n\nThe AP exam will sometimes give a partial table and ask you to complete it. Stay organized — write the row/column totals explicitly and check they agree. When reporting, use 'proportion' or 'percent' rather than 'rate' to keep vocabulary clean.",
    keyIdeas: [
      "Frequency = count; relative frequency = count / total.",
      "Relative frequencies enable fair cross-group comparison when sizes differ.",
      "Marginal distributions live in the row/column totals.",
      "Check that relative frequencies sum to 1 (or 100%).",
    ],
    workedExample: {
      prompt:
        "Out of 200 students surveyed, 120 prefer pop music, 50 prefer rock, 30 prefer classical. Build a relative frequency table.",
      solution:
        "Pop: 120/200 = 0.60 (60%). Rock: 50/200 = 0.25 (25%). Classical: 30/200 = 0.15 (15%). Total 1.00 (100%).",
    },
    commonMistakes: [
      "Reporting raw counts when the question asks for proportions or percents.",
      "Forgetting to check that percentages sum to 100 (a dropped row is a red flag).",
      "Confusing joint frequencies (cells) with marginal totals.",
    ],
  },
  "1.4": {
    id: "1.4",
    title: "Representing a Categorical Variable with Graphs",
    summary:
      "Use bar charts or pie charts to display the distribution of a categorical variable.",
    lesson:
      "A bar chart has one bar per category. Bar heights = counts or relative frequencies. Bars don't touch, emphasizing that the categories are distinct. A pie chart shows each category as a slice whose angle is proportional to its relative frequency; useful when the point is 'share of a whole' and the number of categories is small.\n\nDescribe the distribution of a categorical variable by naming the most common and least common categories and noting any roughly equal groups. You do not talk about 'shape' or 'skew' for categorical variables — those words are for quantitative data only. If your axes are mislabeled, the chart is worthless — always label axes with the variable name and units (count or relative frequency).\n\nGraders penalize deceptive visuals: non-zero baselines on a bar chart, 3D pie charts, stretched axes. Keep bars starting at zero and let the data speak.",
    keyIdeas: [
      "Bar charts: separate bars, height = count or relative frequency.",
      "Describe by comparing category sizes; don't use 'skew' or 'shape'.",
      "Always start the count axis at zero.",
      "Pie charts only when showing part-of-whole with few categories.",
    ],
    diagram:
      '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Example bar chart"><line x1="40" y1="200" x2="380" y2="200" stroke="currentColor"/><line x1="40" y1="20" x2="40" y2="200" stroke="currentColor"/><rect x="70" y="80" width="50" height="120" fill="#c2410c"/><rect x="150" y="130" width="50" height="70" fill="#c2410c"/><rect x="230" y="160" width="50" height="40" fill="#c2410c"/><rect x="310" y="140" width="50" height="60" fill="#c2410c"/><text x="95" y="220" text-anchor="middle" font-size="11">Pop</text><text x="175" y="220" text-anchor="middle" font-size="11">Rock</text><text x="255" y="220" text-anchor="middle" font-size="11">Class.</text><text x="335" y="220" text-anchor="middle" font-size="11">Other</text><text x="15" y="205" font-size="11">0</text><text x="210" y="15" text-anchor="middle" font-size="12">Music preference</text></svg>',
    commonMistakes: [
      "Describing a bar chart as 'skewed right' — skew is a quantitative concept.",
      "Cutting the count axis to exaggerate differences.",
      "Letting bars touch (that's a histogram) — categorical bars should have gaps.",
    ],
  },
  "1.5": {
    id: "1.5",
    title: "Representing a Quantitative Variable with Graphs",
    summary:
      "Dotplots, stemplots, and histograms show the distribution of a quantitative variable.",
    lesson:
      "Three common graphs for a single quantitative variable.\n\nDotplot: one dot per observation stacked above its value. Good for small \\(n\\) — you can see each individual. Stemplot (stem-and-leaf): splits each value into a stem (leading digits) and leaf (last digit). Preserves the original data like a dotplot but more compact. Histogram: divide the axis into bins of equal width and draw bars whose heights equal the count (or relative frequency) in each bin. Bars touch because the \\(x\\)-axis is continuous.\n\nBin width matters a lot. Too narrow: the histogram looks spiky and noisy. Too wide: it loses structure. There is no single 'right' bin width, but the AP exam will always accept a reasonable choice that clearly shows the shape.\n\nWhen describing a graph, never just say 'it looks weird.' Use the vocabulary from 1.6: shape (skew/symmetric/bimodal), center (roughly where the middle sits), spread (range or IQR), unusual features (outliers, gaps, clusters). Always in context.",
    keyIdeas: [
      "Dotplot and stemplot preserve individual values; histogram summarizes into bins.",
      "Histogram bars TOUCH because the \\(x\\)-axis is continuous quantitative.",
      "Bin width is a judgment call — pick one that reveals shape without noise.",
      "Axes labeled with variable name and units, or you lose credit.",
    ],
    workedExample: {
      prompt:
        "Exam scores: 70, 75, 75, 80, 82, 85, 90, 92, 95, 98. Sketch a stemplot.",
      solution:
        "Stems are tens. 7 | 0 5 5\\n8 | 0 2 5\\n9 | 0 2 5 8. Each leaf is the ones digit; the shape is roughly symmetric and centered near the low 80s.",
    },
    commonMistakes: [
      "Leaving gaps between histogram bars.",
      "Unequal bin widths (allowed in advanced work but not on the AP exam — skip it).",
      "Reading a histogram bar as 'frequency of that exact value' rather than 'count in that interval.'",
    ],
  },
  "1.6": {
    id: "1.6",
    title: "Describing the Distribution of a Quantitative Variable",
    summary:
      "Every description of a quantitative distribution must address shape, center, spread, and unusual features — in context.",
    lesson:
      "SOCS — Shape, Outliers/unusual, Center, Spread — is the mnemonic for a full description. AP graders look for all four, so missing one costs points even if the rest is perfect.\n\nShape: symmetric, skewed right (tail on the right), skewed left (tail on the left), uniform, unimodal, bimodal. A right-skewed distribution has most data on the left with a long tail to the right (think income). Center: one-number summary of the middle — the mean if symmetric, the median if skewed or outliers are present. Spread: range, IQR, or standard deviation. Match the spread measure to the center: mean pairs with SD, median pairs with IQR. Unusual features: outliers, gaps, clusters.\n\nEvery descriptive sentence ends with the variable and units in context. Instead of 'mean is 72, skewed right,' write 'The distribution of test scores (out of 100) is skewed right with median 72 points and IQR 18 points; there is one high outlier at 99 points.'",
    keyIdeas: [
      "SOCS in context: shape, outliers, center, spread.",
      "Skewed data or outliers → report median + IQR. Symmetric → mean + SD.",
      "Always name the variable and units in your sentence.",
      "A single-sentence description should touch all four of SOCS.",
    ],
    workedExample: {
      prompt:
        "A histogram of employee salaries at a small company shows most values between $40k–$70k with a long tail up to $500k (the CEO). Describe the distribution.",
      solution:
        "The distribution of salaries is strongly skewed right. The median salary is around $55k, with IQR roughly $20k, and there is a clear high outlier near $500k corresponding to the CEO.",
    },
    commonMistakes: [
      "Saying 'normal' when you mean 'symmetric and unimodal' — 'normal' has a technical meaning (Unit 1.10).",
      "Reporting mean and SD for a skewed distribution (outliers pull them).",
      "Writing 'it's skewed' with no direction — always say left or right.",
    ],
  },
  "1.7": {
    id: "1.7",
    title: "Summary Statistics for a Quantitative Variable",
    summary:
      "Numerical summaries: measures of center (mean, median) and spread (range, IQR, standard deviation).",
    lesson:
      "Mean: \\(\\bar{x} = \\frac{1}{n}\\sum x_i\\). Sensitive to outliers. Median: the middle value when data is ordered. Resistant. If \\(n\\) is even, the median is the average of the two middle values.\n\nStandard deviation: \\(s_x = \\sqrt{\\frac{1}{n-1}\\sum (x_i - \\bar{x})^2}\\). Measures typical distance of a point from the mean. Divide by \\(n-1\\) for a sample (the Bessel correction). Range = max − min, simple but uses only extremes. IQR = \\(Q_3 - Q_1\\), the middle 50%.\n\nQuartiles: order the data, split at the median. \\(Q_1\\) is the median of the lower half; \\(Q_3\\) is the median of the upper half. The five-number summary (min, \\(Q_1\\), median, \\(Q_3\\), max) is the basis of boxplots (next topic).\n\nThe 1.5·IQR rule flags outliers: any value below \\(Q_1 - 1.5\\cdot\\text{IQR}\\) or above \\(Q_3 + 1.5\\cdot\\text{IQR}\\). This is a rule of thumb, not a definition — other rules exist (e.g., 2 SDs from the mean), and the AP exam will tell you which one to use.",
    keyIdeas: [
      "Mean is non-resistant; median is resistant to outliers.",
      "SD pairs with mean; IQR pairs with median.",
      "\\(s_x\\) uses \\(n-1\\) for a sample, \\(n\\) for a population (\\(\\sigma\\)).",
      "Outliers (1.5·IQR rule): below \\(Q_1 - 1.5\\cdot\\text{IQR}\\) or above \\(Q_3 + 1.5\\cdot\\text{IQR}\\).",
    ],
    workedExample: {
      prompt:
        "Data: 2, 4, 6, 8, 10, 12, 14. Find mean, median, IQR, and SD.",
      solution:
        "Mean \\(= 56/7 = 8\\). Median \\(= 8\\). Lower half: 2,4,6 → \\(Q_1 = 4\\). Upper half: 10,12,14 → \\(Q_3 = 12\\). IQR \\(= 8\\). Deviations: -6,-4,-2,0,2,4,6. Squared sum = 112. \\(s_x = \\sqrt{112/6} \\approx 4.32\\).",
    },
    commonMistakes: [
      "Using \\(n\\) instead of \\(n-1\\) for sample SD.",
      "Including the median when splitting to find \\(Q_1\\) and \\(Q_3\\) with odd \\(n\\) — the AP convention excludes it.",
      "Reporting range as the two endpoints instead of their difference.",
    ],
  },
  "1.8": {
    id: "1.8",
    title: "Graphical Representations of Summary Statistics",
    summary:
      "A boxplot (a.k.a. box-and-whisker plot) visualizes the five-number summary and flags outliers.",
    lesson:
      "A boxplot shows min, \\(Q_1\\), median, \\(Q_3\\), and max as a box with whiskers. A modified boxplot uses the 1.5·IQR rule: whiskers extend only to the most extreme non-outlier; outliers are plotted as individual points. Modified boxplots are what the AP exam expects unless a problem says otherwise.\n\nBoxplots hide shape information — two very different distributions can have the same five-number summary (Anscombe-style coincidences). Use them mainly to compare groups side by side or to flag outliers quickly. For a single distribution, a histogram is almost always more informative.\n\nTo compare two boxplots, talk about relative positions of median, relative box widths (spread), and overlap. Don't just say 'group A is higher' — say 'the median cholesterol in group A is about 20 mg/dL higher than in group B, and the IQRs are similar.'",
    keyIdeas: [
      "Boxplot = min, \\(Q_1\\), median, \\(Q_3\\), max.",
      "Modified boxplot flags outliers separately using the 1.5·IQR rule.",
      "Great for comparing groups; poor for seeing shape.",
      "Always compare center and spread in context when using side-by-side boxplots.",
    ],
    diagram:
      '<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Modified boxplot"><line x1="40" y1="160" x2="380" y2="160" stroke="currentColor"/><line x1="80" y1="80" x2="120" y2="80" stroke="currentColor"/><rect x="120" y="60" width="120" height="40" fill="none" stroke="#c2410c" stroke-width="2"/><line x1="180" y1="60" x2="180" y2="100" stroke="#c2410c" stroke-width="2"/><line x1="240" y1="80" x2="320" y2="80" stroke="currentColor"/><circle cx="360" cy="80" r="4" fill="#c2410c"/><text x="80" y="120" text-anchor="middle" font-size="10">min</text><text x="120" y="120" text-anchor="middle" font-size="10">Q1</text><text x="180" y="120" text-anchor="middle" font-size="10">med</text><text x="240" y="120" text-anchor="middle" font-size="10">Q3</text><text x="320" y="120" text-anchor="middle" font-size="10">max(non-out)</text><text x="360" y="50" text-anchor="middle" font-size="10">outlier</text></svg>',
    commonMistakes: [
      "Forgetting to mark outliers as separate points on a modified boxplot.",
      "Assuming a symmetric boxplot implies symmetric data (it only says quartile spacing is equal).",
      "Writing comparisons without naming the variable or units.",
    ],
  },
  "1.9": {
    id: "1.9",
    title: "Comparing Distributions of a Quantitative Variable",
    summary:
      "When comparing distributions, always comment on shape, center, spread, and unusual features — for both — in context.",
    lesson:
      "Side-by-side boxplots, back-to-back stemplots, overlaid dotplots, and parallel histograms all compare two or more groups. The answer template the AP exam wants is: 'Group A's distribution is [shape] with a center of [value] and spread of [value]; Group B's distribution is [shape] with center [value] and spread [value]. Compared to A, B is [higher/lower/similar] in center and [more/less variable] in spread, with [outlier notes]. All in the context of [variable].'\n\nUse comparative language — words like 'higher,' 'more variable,' 'similar.' Don't describe groups in isolation and leave the reader to spot the difference; the prompt specifically asks for a comparison. If skewness or outliers differ, say so; this often explains why the means and medians diverge.\n\nGraders reward students who report both values AND the comparison. 'Mean A = 72, Mean B = 68' is not a comparison; 'Mean A (72) is 4 points higher than Mean B (68)' is.",
    keyIdeas: [
      "Comparison must use explicit comparative words, not just two descriptions.",
      "Mention center, spread, shape, unusual features — for BOTH groups.",
      "Name the variable and units in the sentence.",
      "Don't forget to note similarities (they count too).",
    ],
    workedExample: {
      prompt:
        "Two classes took the same quiz (max 20). Class A: median 15, IQR 6, no outliers. Class B: median 12, IQR 4, one low outlier at 3. Compare.",
      solution:
        "Both distributions are roughly unimodal. The median score in Class A (15) is about 3 points higher than in Class B (12), and Class A is more variable (IQR 6 vs. 4). Class B has a low outlier at 3 points; Class A has none. Both in the context of quiz scores out of 20.",
    },
    commonMistakes: [
      "Listing statistics for each group without a comparative sentence.",
      "Forgetting to mention outliers or shape.",
      "Dropping context — scores, times, incomes, whatever it is.",
    ],
  },
  "1.10": {
    id: "1.10",
    title: "The Normal Distribution",
    summary:
      "The normal distribution is a symmetric, bell-shaped curve characterized by its mean \\(\\mu\\) and standard deviation \\(\\sigma\\).",
    lesson:
      "Many real-world measurements (heights, test scores, measurement errors) are approximately normal. A normal curve is defined by \\(\\mu\\) (center) and \\(\\sigma\\) (spread). It is symmetric about \\(\\mu\\), with inflection points at \\(\\mu \\pm \\sigma\\).\n\nThe empirical (68-95-99.7) rule: about 68% of data lies within 1 SD of the mean, 95% within 2 SD, 99.7% within 3 SD. Memorize it.\n\nFor general probabilities, standardize with the \\(z\\)-score: \\(z = (x - \\mu)/\\sigma\\). Then use a standard normal table or calculator. Given a proportion (say, the top 10%), invert the process — find the \\(z\\) with that upper tail area and solve \\(x = \\mu + z\\sigma\\).\n\nThe AP exam expects you to clearly state the normal model, show the \\(z\\)-computation, and identify the area you're computing (a sketch of a shaded curve earns credit). Calculator commands like normalcdf and invNorm are fine, but always show the \\(z\\) calculation so the reader can follow the logic.",
    keyIdeas: [
      "Normal curve: \\(N(\\mu, \\sigma)\\); symmetric, bell-shaped, unimodal.",
      "Empirical rule: 68% / 95% / 99.7% within 1/2/3 SD.",
      "\\(z = (x - \\mu)/\\sigma\\) standardizes to \\(N(0,1)\\).",
      "For 'which value cuts off top 10%?' use invNorm to get \\(z\\), then \\(x = \\mu + z\\sigma\\).",
    ],
    workedExample: {
      prompt:
        "SAT math scores are approximately \\(N(500, 100)\\). What proportion of students score above 650?",
      solution:
        "\\(z = (650-500)/100 = 1.5\\). \\(P(Z > 1.5) = 1 - 0.9332 = 0.0668\\). About 6.68% of students score above 650.",
    },
    diagram:
      '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Normal curve"><path d="M 30 170 Q 100 170 130 150 Q 170 90 200 60 Q 230 90 270 150 Q 300 170 370 170" fill="none" stroke="#c2410c" stroke-width="2"/><line x1="30" y1="170" x2="370" y2="170" stroke="currentColor"/><line x1="200" y1="60" x2="200" y2="170" stroke="currentColor" stroke-dasharray="3,3"/><text x="200" y="190" text-anchor="middle" font-size="11">μ</text><text x="130" y="190" text-anchor="middle" font-size="11">μ-σ</text><text x="270" y="190" text-anchor="middle" font-size="11">μ+σ</text><text x="200" y="50" text-anchor="middle" font-size="11">68% within ±1σ</text></svg>',
    commonMistakes: [
      "Forgetting to check or state that the model is approximately normal before applying \\(z\\)-scores.",
      "Confusing 'above 1.5σ' (one tail, ~6.7%) with 'within 1.5σ' (two tails).",
      "Using the empirical rule for values that aren't exactly 1, 2, or 3 SDs out.",
    ],
  },

  // =========================================================================
  // UNIT 2 — EXPLORING TWO-VARIABLE DATA
  // =========================================================================
  "2.1": {
    id: "2.1",
    title: "Introducing Statistics: Are Variables Related?",
    summary:
      "Bivariate analysis asks whether knowing one variable helps predict another.",
    lesson:
      "Unit 1 looked at one variable at a time. In Unit 2 we look at two — a predictor (explanatory, \\(x\\)) and a response (\\(y\\)) — and ask whether they move together.\n\nWith two categorical variables: use two-way tables and conditional proportions. With one categorical and one quantitative: use side-by-side boxplots or parallel dotplots (already covered in 1.9). With two quantitative variables: use a scatterplot and eventually a regression line.\n\nThe conceptual question is causation vs. association. Two variables can be related without one causing the other — lurking variables, confounders, or coincidence can generate association. Statistics lets us describe and quantify association; only a well-designed experiment (Unit 3) justifies causal claims.",
    keyIdeas: [
      "Explanatory \\(x\\) goes on the horizontal axis; response \\(y\\) on the vertical.",
      "Pick a display matched to the variable types (cat-cat, cat-quant, quant-quant).",
      "Association ≠ causation — observational data alone can't confirm cause.",
      "Always describe association in context: 'as X increases, Y tends to…'",
    ],
    commonMistakes: [
      "Jumping to 'X causes Y' from an observational scatterplot.",
      "Putting the response on the \\(x\\)-axis.",
      "Using a scatterplot with a categorical variable.",
    ],
  },
  "2.2": {
    id: "2.2",
    title: "Representing Two Categorical Variables",
    summary:
      "Two-way tables and segmented/side-by-side bar graphs display the joint distribution of two categorical variables.",
    lesson:
      "A two-way table has rows for one variable and columns for the other; each cell is a joint count. Margins give the marginal totals. To visualize, use a side-by-side bar graph (bars for each combination) or a segmented (stacked) bar graph (each bar sums to 100% within a category), which displays conditional distributions.\n\nStacked relative-frequency bar charts are great for comparing conditional distributions — the heights of the segments show how one variable breaks down within each level of the other. Choose which variable to condition on based on the question. 'Do males and females differ in ice cream preference?' → condition on gender.",
    keyIdeas: [
      "Two-way tables have margins (marginal distributions) and interior cells (joint distribution).",
      "Segmented bar charts visualize conditional distributions.",
      "Pick the conditioning variable based on the research question.",
      "Label axes and categories — no shortcuts.",
    ],
    workedExample: {
      prompt:
        "A 2x2 table: Males: 30 pop, 20 rock; Females: 50 pop, 10 rock. Describe the conditional distribution of music preference given gender.",
      solution:
        "Males (n=50): 60% pop, 40% rock. Females (n=60): 83% pop, 17% rock. Both groups prefer pop, but females do so at a noticeably higher rate.",
    },
    commonMistakes: [
      "Mixing up joint and conditional proportions.",
      "Not labeling which variable is on which axis.",
      "Comparing counts when the row totals differ (use proportions).",
    ],
  },
  "2.3": {
    id: "2.3",
    title: "Statistics for Two Categorical Variables",
    summary:
      "Marginal, joint, and conditional proportions summarize the distribution of two categorical variables.",
    lesson:
      "From a two-way table you can compute three kinds of proportions:\n• Joint: cell count / overall total. 'P(Male AND pop).'\n• Marginal: row or column total / overall total. 'P(Male).'\n• Conditional: cell / row (or column) total. 'P(pop | Male).'\n\nTwo categorical variables are associated if the conditional distribution of one depends on the level of the other — i.e., the conditional proportions differ across rows (or columns). If every row has the same conditional distribution, the variables are independent (no association).\n\nSimpson's Paradox: association within groups can reverse when groups are pooled. The classic example: a treatment might look better overall but worse in every subgroup because of uneven group sizes. Always ask whether a lurking variable could create misleading margins.",
    keyIdeas: [
      "Joint = cell/total. Marginal = margin/total. Conditional = cell/(row or column).",
      "Association ↔ conditional distributions differ across categories.",
      "Simpson's Paradox: pooled trends can reverse subgroup trends.",
      "Always specify what you're conditioning on.",
    ],
    workedExample: {
      prompt:
        "From the previous table: find the joint proportion of female rock listeners and the conditional proportion of rock given female.",
      solution:
        "Total = 30+20+50+10 = 110. Joint P(female AND rock) = 10/110 ≈ 0.091. Conditional P(rock | female) = 10/60 ≈ 0.167.",
    },
    commonMistakes: [
      "Confusing joint and conditional (biggest trap).",
      "Using the wrong denominator for conditional probability.",
      "Ignoring Simpson's Paradox in contextual comparisons.",
    ],
  },
  "2.4": {
    id: "2.4",
    title: "Representing the Relationship Between Two Quantitative Variables",
    summary:
      "A scatterplot plots points (\\(x_i, y_i\\)) to reveal form, direction, strength, and outliers.",
    lesson:
      "Scatterplot checklist — DUFS — Direction, Unusual features, Form, Strength.\n\nDirection: positive (up-right), negative (down-right), or none. Form: linear, curved (quadratic, exponential, logarithmic), or no pattern. Strength: how tightly clustered the points are around the form. Unusual features: outliers, clusters, gaps.\n\nExplanatory variable on \\(x\\), response on \\(y\\). Always. Describe in context — 'As hours studied increase, test score tends to increase linearly, with moderate strength and one low-scoring outlier at 3 hours / 50 points.' A well-drawn scatterplot answers half the FRQ before you touch a formula.",
    keyIdeas: [
      "DUFS: direction, unusual, form, strength.",
      "Explanatory → \\(x\\)-axis; response → \\(y\\)-axis.",
      "Describe form before fitting a line — curvature disqualifies a linear model.",
      "Outliers in \\(x\\) (high leverage) matter differently than outliers in \\(y\\).",
    ],
    diagram:
      '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scatterplot"><line x1="40" y1="200" x2="380" y2="200" stroke="currentColor"/><line x1="40" y1="20" x2="40" y2="200" stroke="currentColor"/><circle cx="80" cy="180" r="3" fill="#c2410c"/><circle cx="120" cy="165" r="3" fill="#c2410c"/><circle cx="150" cy="150" r="3" fill="#c2410c"/><circle cx="180" cy="135" r="3" fill="#c2410c"/><circle cx="210" cy="125" r="3" fill="#c2410c"/><circle cx="250" cy="100" r="3" fill="#c2410c"/><circle cx="290" cy="85" r="3" fill="#c2410c"/><circle cx="330" cy="60" r="3" fill="#c2410c"/><text x="210" y="230" text-anchor="middle" font-size="11">x (explanatory)</text></svg>',
    commonMistakes: [
      "Describing only direction without strength and form.",
      "Using 'correlation' when you mean 'association' (correlation is a specific number).",
      "Not noticing curved patterns — they kill linearity claims.",
    ],
  },
  "2.5": {
    id: "2.5",
    title: "Correlation",
    summary:
      "The correlation coefficient \\(r\\) measures the strength and direction of a LINEAR relationship between two quantitative variables.",
    lesson:
      "Formula: \\(r = \\frac{1}{n-1} \\sum \\left(\\frac{x_i - \\bar{x}}{s_x}\\right)\\left(\\frac{y_i - \\bar{y}}{s_y}\\right)\\). You won't compute it by hand on the exam, but know what it represents: an average of paired standardized deviations.\n\nProperties: \\(-1 \\le r \\le 1\\). Sign = direction, magnitude = strength. \\(r = \\pm 1\\) iff all points lie exactly on a line. \\(r\\) is unitless and unaffected by linear rescaling (converting inches to cm doesn't change \\(r\\)). \\(r\\) is symmetric: \\(r_{xy} = r_{yx}\\).\n\nFour critical cautions. (1) \\(r\\) only measures LINEAR strength — a strong curved relationship can still have \\(r \\approx 0\\). (2) \\(r\\) is NOT resistant to outliers. (3) \\(r\\) says nothing about slope. (4) \\(r\\) does not imply causation.\n\nStrength descriptors: \\(|r| \\approx 0\\) none/weak, \\(\\approx 0.5\\) moderate, \\(\\approx 0.8+\\) strong. These are conventions, not rules — the exam wants you to describe both the value and what it means.",
    keyIdeas: [
      "\\(-1 \\le r \\le 1\\); sign = direction, magnitude = linear strength.",
      "\\(r\\) measures LINEAR strength only — always check a scatterplot first.",
      "\\(r\\) is unitless and unchanged by linear rescaling.",
      "Not resistant: a single outlier can distort \\(r\\) dramatically.",
    ],
    workedExample: {
      prompt:
        "A dataset has \\(r = -0.82\\). Describe the relationship.",
      solution:
        "Strong negative linear association: as \\(x\\) increases, \\(y\\) tends to decrease, and the points cluster tightly around a downward line.",
    },
    commonMistakes: [
      "Calling \\(r=0\\) 'no relationship' — could be curved.",
      "Saying 'a correlation of 0.6 means 60% of variation explained' — that's \\(r^2\\), not \\(r\\).",
      "Treating \\(r\\) as a measure of slope — it's not.",
    ],
  },
  "2.6": {
    id: "2.6",
    title: "Linear Regression Models",
    summary:
      "A linear regression model predicts \\(\\hat{y} = a + bx\\). Interpret slope as 'predicted change in \\(y\\) per unit of \\(x\\).'",
    lesson:
      "Given a scatterplot with a linear form, fit a line \\(\\hat{y} = a + bx\\). The hat on \\(\\hat{y}\\) reminds you this is a predicted value, not the actual observed \\(y\\). \\(b\\) is the slope: predicted change in \\(y\\) for every one-unit increase in \\(x\\). \\(a\\) is the \\(y\\)-intercept: predicted \\(y\\) when \\(x = 0\\) — sometimes nonsensical in context (a person with 0 height has no weight).\n\nInterpretation templates the AP rewards:\n• Slope: 'For each additional [unit of \\(x\\)], the predicted [\\(y\\)] increases/decreases by \\(|b|\\) [units].'\n• Intercept: 'When \\(x = 0\\) [units], the predicted [\\(y\\)] is \\(a\\) [units].' Note whether this is meaningful.\n\nDo not extrapolate — predicting outside the observed range of \\(x\\) is risky because the linear pattern may not hold. On FRQs, a prediction well outside the data is often a trap.",
    keyIdeas: [
      "\\(\\hat{y}\\) = predicted \\(y\\); distinct from the observed \\(y_i\\).",
      "Slope interpretation must include direction, magnitude, units, and 'predicted.'",
      "Intercept may be meaningless in context — say so if it is.",
      "Do not extrapolate beyond the observed range of \\(x\\).",
    ],
    workedExample: {
      prompt:
        "\\(\\widehat{\\text{score}} = 20 + 8(\\text{hours})\\). Interpret the slope.",
      solution:
        "For each additional hour studied, the predicted exam score increases by 8 points.",
    },
    commonMistakes: [
      "Dropping 'predicted' — 'the score increases by 8' is wrong, it's the predicted score.",
      "Forgetting units.",
      "Extrapolating (e.g., predicting score for 20 study hours when the data only go to 10).",
    ],
  },
  "2.7": {
    id: "2.7",
    title: "Residuals",
    summary:
      "A residual = observed − predicted = \\(y - \\hat{y}\\). A residual plot reveals whether the linear model fits.",
    lesson:
      "For each data point, the residual is the vertical distance from the point to the regression line: \\(e_i = y_i - \\hat{y}_i\\). Positive residuals mean the model underpredicts; negative mean it overpredicts. The least-squares line (next topic) is the line that minimizes the sum of squared residuals.\n\nA residual plot has \\(x\\) (or \\(\\hat{y}\\)) on the horizontal axis and residuals on the vertical. If the linear model is appropriate, the residual plot should show no pattern — just random scatter around zero. Any curved pattern indicates the linear model is wrong and a transformation or different model is needed. Fanning (increasing spread) indicates non-constant variance, a condition violation for later inference.\n\nOn the AP exam, the first thing a grader checks after you fit a line is whether you examined a residual plot. Saying 'the residual plot shows no clear pattern, so the linear model is appropriate' is a standard, credit-earning sentence.",
    keyIdeas: [
      "Residual = \\(y - \\hat{y}\\); positive means underpredicted.",
      "Good linear fit ↔ residual plot shows random scatter.",
      "Curved pattern in residuals → linear model is wrong.",
      "Always check a residual plot BEFORE trusting a linear regression.",
    ],
    diagram:
      '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Residual plot with no pattern"><line x1="40" y1="100" x2="380" y2="100" stroke="currentColor" stroke-dasharray="4,4"/><line x1="40" y1="20" x2="40" y2="180" stroke="currentColor"/><circle cx="70" cy="85" r="3" fill="#c2410c"/><circle cx="110" cy="115" r="3" fill="#c2410c"/><circle cx="150" cy="95" r="3" fill="#c2410c"/><circle cx="190" cy="110" r="3" fill="#c2410c"/><circle cx="230" cy="88" r="3" fill="#c2410c"/><circle cx="270" cy="105" r="3" fill="#c2410c"/><circle cx="310" cy="92" r="3" fill="#c2410c"/><circle cx="350" cy="115" r="3" fill="#c2410c"/><text x="210" y="195" text-anchor="middle" font-size="11">predicted y or x</text><text x="15" y="25" font-size="11">resid</text></svg>',
    commonMistakes: [
      "Concluding 'good fit' from a high \\(r\\) alone — you still need the residual plot.",
      "Confusing signs (observed − predicted, not the other way).",
      "Missing curvature because the eye 'smooths' it out.",
    ],
  },
  "2.8": {
    id: "2.8",
    title: "Least Squares Regression",
    summary:
      "The least-squares regression line (LSRL) minimizes the sum of squared residuals and always passes through \\((\\bar{x}, \\bar{y})\\).",
    lesson:
      "Formulas: \\(b = r\\frac{s_y}{s_x}\\) and \\(a = \\bar{y} - b\\bar{x}\\). The coefficient of determination \\(r^2\\) is the proportion of variation in \\(y\\) explained by the linear model with \\(x\\). If \\(r^2 = 0.64\\), about 64% of the variability in \\(y\\) is explained by the LSRL with \\(x\\). The rest is residual (unexplained) variation.\n\nRead a computer output (Minitab-style):\n```\nPredictor  Coef   SE Coef  t   P\nConstant   20.0   3.2      6.25 0.000\nHours      8.1    0.9      9.00 0.000\ns = 4.5   R-sq = 0.85\n```\nSlope is in the 'Hours' row, intercept in the 'Constant' row. 's' is the standard deviation of residuals — typical prediction error in \\(y\\)-units. 'R-sq' is \\(r^2\\).\n\nLSRL properties: (1) always passes through \\((\\bar{x}, \\bar{y})\\); (2) residuals sum to zero; (3) minimizing squared residuals (not absolute) — which is why outliers have heavy influence.",
    keyIdeas: [
      "Slope: \\(b = r \\cdot s_y/s_x\\). Intercept: \\(a = \\bar{y} - b\\bar{x}\\).",
      "LSRL passes through \\((\\bar{x}, \\bar{y})\\); residuals sum to zero.",
      "\\(r^2\\) = proportion of variation in \\(y\\) explained by \\(x\\).",
      "Read computer output: Constant row = intercept; variable row = slope.",
    ],
    workedExample: {
      prompt:
        "Given \\(r = 0.9\\), \\(\\bar{x} = 5\\), \\(\\bar{y} = 60\\), \\(s_x = 2\\), \\(s_y = 20\\). Find the LSRL.",
      solution:
        "\\(b = 0.9 \\cdot 20/2 = 9\\). \\(a = 60 - 9(5) = 15\\). \\(\\hat{y} = 15 + 9x\\).",
    },
    commonMistakes: [
      "Interpreting \\(r^2\\) as a percentage of points on the line (it's about variation).",
      "Swapping \\(r \\cdot s_x/s_y\\) for slope — it's \\(r \\cdot s_y/s_x\\).",
      "Forgetting that LSRL is not resistant to outliers.",
    ],
  },
  "2.9": {
    id: "2.9",
    title: "Analyzing Departures from Linearity",
    summary:
      "When residual plots show pattern, transform a variable (log, square root, reciprocal) to linearize.",
    lesson:
      "A curved residual plot tells you the relationship isn't linear. Common transformations:\n• Exponential relationship \\(y = ae^{bx}\\) → take \\(\\ln y\\); linearize to \\(\\ln y = \\ln a + bx\\).\n• Power relationship \\(y = ax^b\\) → take \\(\\ln\\) of both; linearize to \\(\\ln y = \\ln a + b \\ln x\\).\n• Right-skewed \\(x\\) → try \\(\\sqrt{x}\\) or \\(\\log x\\).\n\nAfter transforming, refit the LSRL on transformed variables. Check the new residual plot — is there still a pattern? If yes, try another transformation. Back-transform predictions if needed (e.g., if you regressed \\(\\ln y\\) on \\(x\\), then \\(\\hat{y} = e^{\\hat{\\ln y}}\\)).\n\nLeverage, influence, and outliers deserve vocabulary care. A point with extreme \\(x\\) has high leverage. A point whose removal dramatically changes the line is influential. An outlier is a point with a large residual. A point can be one, two, or all three at once. Influential points are the dangerous ones — check what happens if you remove them.",
    keyIdeas: [
      "Pattern in residuals → transform a variable and refit.",
      "\\(\\log y\\) linearizes exponential; \\(\\log x\\) and \\(\\log y\\) linearizes power.",
      "Leverage (extreme \\(x\\)) ≠ outlier (large residual) ≠ influential.",
      "After transforming, re-check the residual plot.",
    ],
    workedExample: {
      prompt:
        "Population data looks exponential. You regress \\(\\ln P\\) on \\(t\\) and get \\(\\hat{\\ln P} = 2 + 0.1t\\). Predict population at \\(t=10\\).",
      solution:
        "\\(\\hat{\\ln P}(10) = 2 + 1 = 3\\). Back-transform: \\(\\hat{P} = e^3 \\approx 20.1\\).",
    },
    commonMistakes: [
      "Predicting \\(\\hat{\\ln y}\\) and forgetting to exponentiate.",
      "Declaring a transformation successful without checking the new residual plot.",
      "Confusing high leverage with outlier.",
    ],
  },

  // =========================================================================
  // UNIT 3 — COLLECTING DATA
  // =========================================================================
  "3.1": {
    id: "3.1",
    title: "Introducing Statistics: Do the Data We Collected Tell the Truth?",
    summary:
      "How you collect data determines what you can conclude. Bad design poisons analysis no matter how pretty the math is.",
    lesson:
      "You can only generalize to a population if your sample is drawn from it randomly, and you can only claim causation if you ran a randomized experiment. Poor data collection — convenience sampling, unrepresentative frames, biased wording — limits the scope of conclusions, full stop.\n\nTwo big distinctions for Unit 3: (1) observational study vs. experiment — do you assign the treatment or just observe it? (2) random sampling vs. random assignment — the first lets you generalize; the second lets you infer cause. Many questions hinge on correctly labeling a study as one of {observational with random sampling, observational without, experiment with random assignment, experiment without}.\n\nThe phrase 'the data tell the truth' means: the method supports the conclusion. A confident-sounding graph built on biased data is a lie.",
    keyIdeas: [
      "Random SAMPLING → generalize to a population.",
      "Random ASSIGNMENT → establish causation.",
      "Both together = strongest inference.",
      "Poor design cannot be rescued by clever analysis.",
    ],
    commonMistakes: [
      "Confusing 'random sample' with 'random assignment' — different guarantees.",
      "Concluding causation from an observational study, however large.",
      "Reading 'volunteer' or 'online poll' and treating the result as representative.",
    ],
  },
  "3.2": {
    id: "3.2",
    title: "Introduction to Planning a Study",
    summary:
      "Every study starts with a clear question, a defined population, a sampling/assignment plan, and measurement protocol.",
    lesson:
      "Planning a study means being explicit about: the population of interest, the sampling frame (who actually can be reached), the sample (who you actually observe), and the response measurement. Each step is a place where bias can enter.\n\nObservational studies measure variables without intervention. Experiments impose treatments. A retrospective observational study looks back at existing records; a prospective one follows subjects forward. Good AP answers name the study type explicitly.\n\nBefore collecting data, decide what 'success' looks like, how you'll measure it, and how big your sample needs to be. This rigor shows up again in later units, when we pick test statistics and check conditions — the plan made now dictates what inference is legitimate later.",
    keyIdeas: [
      "Define population → frame → sample — note gaps between them.",
      "Observational = measure without intervention. Experiment = assign treatment.",
      "Decide how to measure the response before collecting data.",
      "Plan determines what inference is later justifiable.",
    ],
    commonMistakes: [
      "Mixing up 'population' with 'sample.'",
      "Forgetting that bias enters at each step (frame, sample, measurement).",
      "Defining the study type as 'survey' — that's a method, not a classification.",
    ],
  },
  "3.3": {
    id: "3.3",
    title: "Random Sampling and Data Collection",
    summary:
      "Four random-sampling methods: SRS, stratified, cluster, systematic. Each gives different guarantees and different standard errors.",
    lesson:
      "Simple Random Sample (SRS): every possible sample of size \\(n\\) is equally likely. The gold standard. Implement with a random-number generator assigning each unit a number, then pick \\(n\\) unique ones.\n\nStratified: divide the population into groups (strata) of similar units, then take an SRS within each stratum. Great when strata are homogeneous internally and heterogeneous between. Reduces variability and guarantees representation of each stratum.\n\nCluster: divide the population into naturally-occurring clusters (schools, city blocks), randomly select some clusters, and sample everyone within them. Cheaper logistically but usually less precise than SRS.\n\nSystematic: pick every \\(k\\)-th unit after a random start. Cheap and quick; risky if the list has periodic structure.\n\nMultistage sampling combines several (e.g., stratified clusters). A convenience sample — 'ask whoever walks by' — is not random and gives no generalizability.",
    keyIdeas: [
      "SRS: every sample of size \\(n\\) equally likely.",
      "Stratified: SRS within strata; reduces variance when strata homogeneous.",
      "Cluster: all units within randomly chosen clusters.",
      "Systematic: every \\(k\\)-th after random start; watch for periodicity.",
    ],
    workedExample: {
      prompt:
        "A school has 600 freshmen, 500 sophomores, 500 juniors, 400 seniors. To survey 200 students with equal representation by grade, which method?",
      solution:
        "Stratified sample by grade: take an SRS of 50 from each grade. Ensures each class is represented in proportion you choose (here equal, 50/50/50/50).",
    },
    commonMistakes: [
      "Calling stratified 'cluster' — strata are homogeneous; clusters are heterogeneous.",
      "Thinking any random method gives the same standard error.",
      "Declaring 'self-selected online poll' as an SRS.",
    ],
  },
  "3.4": {
    id: "3.4",
    title: "Potential Problems with Sampling",
    summary:
      "Bias happens when your sampling method systematically favors some outcomes over others. Know the standard types and name them exactly.",
    lesson:
      "Sampling bias (sampling frame misses part of the population). Voluntary response bias (people who choose to respond differ from those who don't — angry callers to a radio show). Undercoverage (some groups of the population have no chance of being sampled — phone surveys miss people without phones). Nonresponse bias (selected people don't respond; those who do differ systematically). Response bias (wording, interviewer effect, or social desirability pushes answers one way). Convenience sampling (pick whoever is nearby; not random at all).\n\nWhen the AP exam asks 'what bias is present?' name the specific type and describe how it likely distorts the result — 'This is voluntary response bias; only strongly-opinionated customers return the card, so the reported satisfaction is likely overstated.'\n\nIncreasing sample size does NOT fix bias. A biased survey of 10,000 is more confidently wrong than one of 100. Fix bias by fixing the method.",
    keyIdeas: [
      "Bigger \\(n\\) does not fix bias — only better design does.",
      "Know the types: voluntary response, undercoverage, nonresponse, response, convenience.",
      "Name the bias AND describe its likely direction in context.",
      "Sampling without a random mechanism → no generalization.",
    ],
    commonMistakes: [
      "Using 'bias' generically — the AP wants a specific labeled type.",
      "Claiming a large sample compensates for biased selection.",
      "Confusing nonresponse (selected, didn't answer) with voluntary response (self-selected).",
    ],
  },
  "3.5": {
    id: "3.5",
    title: "Introduction to Experimental Design",
    summary:
      "Experiments impose treatments on subjects and compare responses. Four principles: comparison, random assignment, control, replication.",
    lesson:
      "Vocab. Experimental units: the smallest entities to which treatments are assigned. Subjects: human experimental units. Factor: the explanatory variable whose levels are the treatments. Treatment: a specific combination of factor levels. Response: the measured outcome.\n\nFour principles of experimental design:\n1. Comparison — at least two treatments (often including a control).\n2. Random assignment — flip a coin, number slips, computer RNG. Balances lurking variables on average.\n3. Control — keep other variables constant or identical across groups, to isolate the treatment effect.\n4. Replication — enough units per treatment to reduce chance variation.\n\nPlacebos address the psychological effect of receiving any treatment. Blinding (single-blind: subjects don't know; double-blind: neither subjects nor experimenters know) prevents expectation bias.\n\nA well-designed experiment justifies cause-and-effect: because random assignment balances all other factors (on average), any observed difference in response can be attributed to the treatment.",
    keyIdeas: [
      "Experiments need comparison, random assignment, control, replication.",
      "Placebos and blinding remove psychological biases.",
      "Random assignment ≠ random sample — they answer different questions.",
      "Only well-designed experiments justify causal conclusions.",
    ],
    commonMistakes: [
      "Mixing up factor, treatment, and level.",
      "Claiming causation from a study without random assignment.",
      "Forgetting to blind when blinding is feasible.",
    ],
  },
  "3.6": {
    id: "3.6",
    title: "Selecting an Experimental Design",
    summary:
      "Completely randomized, randomized block, and matched-pairs — pick the design that controls the right variability.",
    lesson:
      "Completely randomized design: randomly assign subjects to treatments without grouping. Simple, good when subjects are homogeneous.\n\nRandomized block design: group subjects into blocks of similar units (by gender, age, plot of land), then randomly assign treatments within each block. Controls block-to-block variability; think of it like a stratified version of random assignment.\n\nMatched-pairs: a special case of blocking with blocks of size 2. Either (a) pair similar subjects and randomly assign one to each treatment, or (b) apply both treatments to each subject in random order (repeated measures). Matched-pairs remove between-subject variation, making effects easier to detect.\n\nThe AP exam often says 'describe a completely randomized design' or 'describe a blocked design' — you MUST name: (1) exactly how random assignment is done (coin flip, slips of paper, random number generator), (2) what the blocks are (if blocked), (3) what treatment each group gets, (4) what response is measured. Every detail counts. Use a labeled diagram when possible.",
    keyIdeas: [
      "Completely randomized: simple, assumes homogeneous subjects.",
      "Randomized block: controls block-to-block variability.",
      "Matched pairs: blocks of size 2 (either paired subjects or repeated measures).",
      "When asked to describe a design, spell out the RNG mechanism, blocks, treatments, and response.",
    ],
    workedExample: {
      prompt:
        "You want to test whether a new fertilizer helps corn grow, and you have 40 plots on four different hillsides. Propose a design.",
      solution:
        "Use a randomized block design: treat each hillside as a block (10 plots each). Within each hillside, randomly assign 5 plots to new fertilizer and 5 to standard (e.g., put 10 slips in a hat, pick 5 for 'new'). Measure yield at harvest. Blocking by hillside controls for soil and sunlight differences between hillsides.",
    },
    commonMistakes: [
      "Describing a design at a high level ('randomly give half the treatment') without an explicit mechanism.",
      "Confusing blocks with treatments.",
      "Choosing matched pairs without showing how pairs are formed.",
    ],
  },
  "3.7": {
    id: "3.7",
    title: "Inference and Experiments",
    summary:
      "Scope of inference: random sampling allows generalization; random assignment allows causal claims. Only both together allow both.",
    lesson:
      "Map out scope before concluding:\n• Random sample + no random assignment (observational) → generalize to population, but only association, not causation.\n• Random assignment + no random sample (convenience sample, experiment) → causation within the sample, but cannot generalize beyond.\n• Random sample + random assignment → generalize AND causation. The strongest design.\n• Neither random → cannot generalize, cannot claim causation.\n\nOn FRQs, 'what conclusions can you draw?' almost always has a scope-of-inference component. Identify both the sampling method and the assignment method. State clearly what you can conclude — and what you cannot.\n\n'Randomization distribution' is the idea that under the null of no treatment effect, the difference you saw is one outcome of random shuffling. If the observed difference is more extreme than nearly all such shuffles, we reject the null. This is the philosophical foundation for p-values in Unit 6+.",
    keyIdeas: [
      "Sampling ↔ generalizability. Assignment ↔ causation. They're independent axes.",
      "Without random sampling, conclusions apply only to the studied units.",
      "Without random assignment, association is all you can claim.",
      "Randomization distribution gives the logic of p-values later.",
    ],
    workedExample: {
      prompt:
        "A school randomly assigns 100 volunteer students to either a meditation class or a control. Students who meditate score higher on a later test. What scope of conclusion is justified?",
      solution:
        "Because random assignment was used, we can claim meditation caused the higher scores for these volunteers. Because the students volunteered (no random sample), we cannot generalize to all students at the school — the effect might differ for non-volunteers.",
    },
    commonMistakes: [
      "Concluding causation from an observational study.",
      "Generalizing from a non-random sample.",
      "Not naming BOTH the sampling method and the assignment method.",
    ],
  },

  // =========================================================================
  // UNIT 4 — PROBABILITY, RANDOM VARIABLES, PROBABILITY DISTRIBUTIONS
  // =========================================================================
  "4.1": {
    id: "4.1",
    title: "Introducing Statistics: Random and Non-Random Patterns",
    summary:
      "Random processes have unpredictable individual outcomes but predictable long-run patterns. Probability is the math of that long run.",
    lesson:
      "You can't predict the next coin flip, but over millions of flips the proportion of heads settles near 0.5. That's the Law of Large Numbers (LLN): as the sample size grows, the sample proportion/mean converges to the true probability/mean.\n\nShort runs can look weirdly non-random (streaks). That's not a violation of randomness — that's how random data actually looks. The gambler's fallacy (heads is 'due' after a run of tails) confuses independence with some balancing force.\n\nBefore we can do inference, we need a probability model: an assignment of numbers between 0 and 1 to outcomes, summing to 1. Unit 4 builds that machinery — events, conditional probabilities, random variables, named distributions — which Unit 5 turns into sampling distributions and Units 6+ turn into inference.",
    keyIdeas: [
      "Law of Large Numbers: sample proportion → true probability as \\(n \\to \\infty\\).",
      "Short-run streaks are normal; long-run stability is the rule.",
      "Gambler's fallacy: independent trials have no memory.",
      "Inference needs a probability model; Unit 4 builds it.",
    ],
    commonMistakes: [
      "Expecting short runs to look 'balanced' — they often don't.",
      "Confusing 'Law of Averages' (informal) with LLN (formal).",
      "Interpreting probability as 'what will happen next time' instead of long-run relative frequency.",
    ],
  },
  "4.2": {
    id: "4.2",
    title: "Estimating Probabilities Using Simulation",
    summary:
      "When analytic computation is hard, simulate the process many times and approximate the probability with the sample proportion.",
    lesson:
      "Simulation steps: (1) describe the random process and what one trial looks like, (2) assign digits/RNG outputs to represent possible outcomes, (3) run many trials, recording the event of interest, (4) approximate the probability by (number of successes) / (number of trials).\n\nExample setup: to simulate whether a basketball player making 70% of free throws makes at least 4 out of 5, let a random digit 0–6 represent 'make' and 7–9 represent 'miss.' Draw 5 digits; count successes; repeat 1000 times; compute the proportion with ≥ 4 successes.\n\nThe AP exam rewards simulations that are SPECIFIC: 'I use a random digit table. Digits 0–6 = make, 7–9 = miss. I look at five consecutive digits as one trial. I record whether ≥ 4 of the 5 are 0–6. Repeat 100 trials. Estimated probability = successes/100.' Vagueness kills credit.\n\nSimulation accuracy improves with more trials (LLN again). In real AP problems 50–100 trials by hand is typical; computer simulations often use 10,000+.",
    keyIdeas: [
      "Simulation estimates probabilities by running many trials.",
      "Define one trial explicitly (what counts as a success).",
      "Assign RNG outputs to real-world outcomes in proportion.",
      "More trials → more accurate estimate (LLN).",
    ],
    workedExample: {
      prompt:
        "Simulate the probability that rolling a fair die three times yields at least one 6. Describe one trial.",
      solution:
        "Use a random digit table; treat each digit 1–6 as a die roll (ignore 0, 7–9). One trial = take three valid digits; record whether at least one is 6. Repeat 100 trials; estimated probability = (count of successful trials) / 100.",
    },
    commonMistakes: [
      "Not stating what 'one trial' is.",
      "Skipping the assignment of digits to outcomes.",
      "Reporting too few trials (under 20 is nearly useless).",
    ],
  },
  "4.3": {
    id: "4.3",
    title: "Introduction to Probability",
    summary:
      "Probability assigns numbers in [0,1] to events. Key rules: complement, addition (for disjoint events), multiplication (for independent events).",
    lesson:
      "A sample space \\(S\\) is the set of all possible outcomes. An event is a subset of \\(S\\). \\(P(A)\\) = probability of event \\(A\\).\n\nAxioms: (1) \\(0 \\le P(A) \\le 1\\), (2) \\(P(S) = 1\\), (3) for mutually exclusive (disjoint) \\(A, B\\): \\(P(A \\cup B) = P(A) + P(B)\\).\n\nComplement rule: \\(P(A^c) = 1 - P(A)\\). Useful when 'not A' is easier to compute. General addition rule (even when \\(A, B\\) overlap): \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\). The subtraction prevents double-counting the overlap.\n\nAt this stage, everything rests on interpreting probability as long-run relative frequency. Later we'll build conditional probability and independence on top.",
    keyIdeas: [
      "Sample space = all outcomes; event = subset.",
      "\\(P(A^c) = 1 - P(A)\\).",
      "Addition rule: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).",
      "For disjoint events, the overlap is zero so addition is just a sum.",
    ],
    workedExample: {
      prompt:
        "If \\(P(A) = 0.4\\), \\(P(B) = 0.5\\), and \\(P(A \\cap B) = 0.2\\), find \\(P(A \\cup B)\\) and \\(P(A^c)\\).",
      solution:
        "\\(P(A \\cup B) = 0.4 + 0.5 - 0.2 = 0.7\\). \\(P(A^c) = 1 - 0.4 = 0.6\\).",
    },
    commonMistakes: [
      "Forgetting to subtract the overlap in the addition rule.",
      "Assuming events are disjoint because they 'seem separate' — always check.",
      "Reporting probabilities outside [0,1].",
    ],
  },
  "4.4": {
    id: "4.4",
    title: "Mutually Exclusive Events",
    summary:
      "Events are mutually exclusive (disjoint) if they share no outcomes: \\(P(A \\cap B) = 0\\). For them, \\(P(A \\cup B) = P(A) + P(B)\\).",
    lesson:
      "If \\(A\\) and \\(B\\) cannot happen together (e.g., rolling a 3 and rolling a 5 on the same die), they are mutually exclusive. The simple addition rule applies because there's no overlap to subtract.\n\nMutually exclusive ≠ independent. In fact, if two events with nonzero probability are mutually exclusive, they CANNOT be independent — because knowing \\(A\\) happened guarantees \\(B\\) did not. Many students confuse these; always check by thinking 'can both occur?' (exclusivity) versus 'does one affect the other's probability?' (independence).\n\nVenn diagrams help — disjoint circles for mutually exclusive events. Use them on FRQs when the problem is messy.",
    keyIdeas: [
      "Mutually exclusive: no outcomes in common, \\(P(A \\cap B) = 0\\).",
      "For disjoint events: \\(P(A \\cup B) = P(A) + P(B)\\).",
      "Disjoint events with nonzero probability are NOT independent.",
      "Visualize with a Venn diagram when probabilities are messy.",
    ],
    commonMistakes: [
      "Calling two events 'mutually exclusive' because they're unrelated.",
      "Confusing exclusivity with independence.",
      "Applying the disjoint addition rule to overlapping events.",
    ],
  },
  "4.5": {
    id: "4.5",
    title: "Conditional Probability",
    summary:
      "\\(P(B \\mid A) = P(A \\cap B) / P(A)\\). Conditional probability reflects 'given that A happened, what's the chance of B?'",
    lesson:
      "Conditional probability answers the question 'among the outcomes where \\(A\\) is true, what fraction also have \\(B\\) true?' Formally \\(P(B \\mid A) = P(A \\cap B) / P(A)\\), provided \\(P(A) > 0\\).\n\nFrom a two-way table, \\(P(B \\mid A)\\) is just (count of \\(A \\cap B\\)) / (row total for \\(A\\)).\n\nRearranging the definition gives the general multiplication rule: \\(P(A \\cap B) = P(A) \\cdot P(B \\mid A)\\). Useful when probabilities are given sequentially — draw a tree diagram, multiply along branches.\n\nAP graders penalize notation sloppiness — write \\(P(B \\mid A)\\), not \\(P(B/A)\\) or \\(P(A, B)\\). And always interpret the condition in words in the context of the problem.",
    keyIdeas: [
      "\\(P(B \\mid A) = P(A \\cap B)/P(A)\\).",
      "In a two-way table: cell / row total.",
      "Tree diagrams = multiplication rule along branches.",
      "Notation: use the vertical bar, and read 'given.'",
    ],
    workedExample: {
      prompt:
        "From the music table earlier (total 110): \\(P(\\text{pop} \\mid \\text{female}) = ?\\)",
      solution:
        "Female row: 50 pop + 10 rock = 60. P(pop | female) = 50/60 ≈ 0.833.",
    },
    commonMistakes: [
      "Dividing by the total instead of the conditioning group.",
      "Confusing \\(P(A \\mid B)\\) with \\(P(B \\mid A)\\) — they are NOT equal in general.",
      "Dropping the vertical-bar notation.",
    ],
  },
  "4.6": {
    id: "4.6",
    title: "Independent Events and Unions of Events",
    summary:
      "Events are independent if \\(P(A \\mid B) = P(A)\\). Equivalently, \\(P(A \\cap B) = P(A) P(B)\\).",
    lesson:
      "Independence: knowing \\(B\\) occurred tells you nothing about whether \\(A\\) occurred. Formally \\(P(A \\mid B) = P(A)\\), or equivalently \\(P(A \\cap B) = P(A) P(B)\\).\n\nIn practice, check independence by: (1) computing \\(P(A \\mid B)\\) and \\(P(A)\\) and seeing if they match, or (2) checking whether \\(P(A \\cap B)\\) equals \\(P(A) P(B)\\) numerically.\n\nReal-world independence usually comes from the design of the experiment: successive coin flips are independent; draws with replacement are independent; draws without replacement are NOT strictly independent, though if the sample is less than 10% of the population, we treat them as approximately so (the 10% condition, heavily used in Unit 5+).\n\nUnions: the general addition rule \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\) works regardless of independence. Just compute \\(P(A \\cap B)\\) correctly — use multiplication for independent events, the tree diagram otherwise.",
    keyIdeas: [
      "Independent: \\(P(A \\mid B) = P(A)\\), or \\(P(A \\cap B) = P(A) P(B)\\).",
      "Mutually exclusive ≠ independent.",
      "10% condition: treat without-replacement sampling as approximately independent if \\(n < 10\\%\\) of population.",
      "Union formula stays the same; the intersection changes with independence.",
    ],
    workedExample: {
      prompt:
        "\\(P(A) = 0.3\\), \\(P(B) = 0.4\\), independent. Find \\(P(A \\cup B)\\).",
      solution:
        "\\(P(A \\cap B) = 0.3 \\cdot 0.4 = 0.12\\). \\(P(A \\cup B) = 0.3 + 0.4 - 0.12 = 0.58\\).",
    },
    commonMistakes: [
      "Assuming 'A and B are not related' means independent — check the numbers.",
      "Multiplying probabilities for dependent events.",
      "Forgetting the 10% condition when sampling without replacement.",
    ],
  },
  "4.7": {
    id: "4.7",
    title: "Introduction to Random Variables and Probability Distributions",
    summary:
      "A random variable (RV) assigns a number to each outcome. A probability distribution lists all possible values and their probabilities.",
    lesson:
      "A random variable \\(X\\) turns outcomes into numbers. Discrete RV: countable outcomes (number of heads in 10 flips). Continuous RV: uncountable (height). For discrete, a probability distribution is a table/pmf: each value \\(x\\) has probability \\(p(x)\\), all \\(p(x) \\ge 0\\), \\(\\sum p(x) = 1\\).\n\nCumulative distribution function (CDF): \\(F(x) = P(X \\le x)\\). Great for 'at most' and 'at least' (use \\(1 - F\\)) calculations.\n\nFor continuous RVs, probabilities come from areas under a density function. \\(P(X = x) = 0\\) for a single point; only intervals have nonzero probability. We'll mostly use the normal model for continuous RVs.\n\nInterpreting a distribution: 'There's a 25% chance of rolling a 3.' Think long-run relative frequency.",
    keyIdeas: [
      "RV = function mapping outcomes to numbers.",
      "Discrete distribution: pmf with \\(p(x) \\ge 0\\), \\(\\sum p = 1\\).",
      "CDF: \\(F(x) = P(X \\le x)\\).",
      "Continuous: probabilities are areas; \\(P(X=x) = 0\\).",
    ],
    workedExample: {
      prompt:
        "Let \\(X\\) = number of heads in 2 fair flips. Find the distribution.",
      solution:
        "\\(X\\) takes values 0, 1, 2 with probabilities 0.25, 0.5, 0.25 respectively. Sum is 1, all nonneg.",
    },
    commonMistakes: [
      "Omitting probabilities summing to 1.",
      "Treating continuous and discrete probabilities interchangeably.",
      "Reading a CDF value as the PMF (wrong).",
    ],
  },
  "4.8": {
    id: "4.8",
    title: "Mean and Standard Deviation of Random Variables",
    summary:
      "For a discrete RV: \\(\\mu_X = \\sum x \\cdot p(x)\\), \\(\\sigma_X^2 = \\sum (x-\\mu_X)^2 p(x)\\).",
    lesson:
      "The mean (expected value) is the probability-weighted average of the values. Think 'long-run average outcome.' The variance is the probability-weighted average of squared deviations; the SD is its square root.\n\nIn a fair die, \\(\\mu = (1+2+3+4+5+6)/6 = 3.5\\). That's the expected value of a single roll — you won't roll 3.5, but the average of many rolls approaches 3.5 (LLN).\n\nThe formulas on your calculator or on the AP formula sheet:\n\\(E(X) = \\sum x_i p_i\\)\n\\(\\text{Var}(X) = \\sum (x_i - \\mu_X)^2 p_i\\).\nSD = \\(\\sqrt{\\text{Var}(X)}\\).",
    keyIdeas: [
      "Mean (expected value) = probability-weighted average.",
      "Variance uses squared deviations weighted by probability.",
      "SD = \\(\\sqrt{\\text{Var}}\\).",
      "Expected value can be non-integer even when outcomes are.",
    ],
    workedExample: {
      prompt:
        "\\(X\\): 0 with prob 0.2, 1 with 0.5, 2 with 0.3. Find \\(\\mu_X\\) and \\(\\sigma_X\\).",
      solution:
        "\\(\\mu = 0(0.2) + 1(0.5) + 2(0.3) = 1.1\\). Var = \\((0-1.1)^2(0.2) + (1-1.1)^2(0.5) + (2-1.1)^2(0.3) = 0.242 + 0.005 + 0.243 = 0.49\\). SD \\(\\approx 0.7\\).",
    },
    commonMistakes: [
      "Forgetting to weight by probability.",
      "Squaring after summing instead of before.",
      "Reporting variance when the question asks for SD (or vice versa).",
    ],
  },
  "4.9": {
    id: "4.9",
    title: "Combining Random Variables",
    summary:
      "Means always add linearly: \\(E(aX + bY) = aE(X) + bE(Y)\\). Variances add when X, Y are INDEPENDENT: \\(\\text{Var}(aX + bY) = a^2\\text{Var}(X) + b^2\\text{Var}(Y)\\).",
    lesson:
      "For any constants \\(a, b\\) and RVs \\(X, Y\\):\nMean: \\(E(aX + bY) = aE(X) + bE(Y)\\). Always true.\nVariance: \\(\\text{Var}(aX + bY) = a^2\\text{Var}(X) + b^2\\text{Var}(Y)\\) IF \\(X, Y\\) are independent. Note the squared coefficients.\n\nA critical point that trips students: variances of the SUM and DIFFERENCE both use a +: \\(\\text{Var}(X+Y) = \\text{Var}(X) + \\text{Var}(Y)\\) and \\(\\text{Var}(X-Y) = \\text{Var}(X) + \\text{Var}(Y)\\) (for independent RVs). Variance is never subtracted, because squaring \\((-1)\\) gives \\(+1\\).\n\nIf \\(X, Y\\) are dependent, use \\(\\text{Var}(X+Y) = \\text{Var}(X) + \\text{Var}(Y) + 2\\text{Cov}(X, Y)\\) — but the AP exam rarely asks this; instead it will test independence and let you plug into the simple form.\n\nThe sum/difference of normal RVs is again normal. So if \\(X \\sim N(\\mu_X, \\sigma_X)\\) and \\(Y \\sim N(\\mu_Y, \\sigma_Y)\\) independent, then \\(X - Y \\sim N(\\mu_X - \\mu_Y, \\sqrt{\\sigma_X^2 + \\sigma_Y^2})\\).",
    keyIdeas: [
      "Mean of linear combo = linear combo of means.",
      "Variance: squared coefficients, ADD even for differences (when independent).",
      "Independent sum of normals is normal: means subtract, variances add.",
      "Always state independence before combining variances.",
    ],
    workedExample: {
      prompt:
        "\\(X \\sim N(100, 10)\\), \\(Y \\sim N(90, 6)\\), independent. Find the distribution of \\(X - Y\\).",
      solution:
        "Mean: 100 - 90 = 10. Var: \\(10^2 + 6^2 = 136\\). SD = \\(\\sqrt{136} \\approx 11.66\\). \\(X - Y \\sim N(10, 11.66)\\).",
    },
    commonMistakes: [
      "Subtracting variances for differences (wrong — always add).",
      "Forgetting to square the coefficients.",
      "Combining variances without verifying independence.",
    ],
  },
  "4.10": {
    id: "4.10",
    title: "Introduction to the Binomial Distribution",
    summary:
      "BINS conditions: Binary outcomes, Independent trials, fixed Number \\(n\\) of trials, constant probability \\(p\\) of Success.",
    lesson:
      "A binomial random variable counts the number of successes in a fixed number of independent trials, each with the same probability of success. Conditions (BINS):\n• B — Each trial has two outcomes: success or failure.\n• I — Trials are independent.\n• N — Fixed number of trials \\(n\\).\n• S — Probability of success \\(p\\) is the same for each trial.\n\nPMF: \\(P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}\\), for \\(k = 0, 1, \\ldots, n\\). On the calculator: binompdf(n, p, k) for exact; binomcdf(n, p, k) for \\(P(X \\le k)\\).\n\nUse binomcdf with complements for 'at least' questions: \\(P(X \\ge 5) = 1 - P(X \\le 4) = 1 - \\text{binomcdf}(n, p, 4)\\).",
    keyIdeas: [
      "BINS conditions: Binary, Independent, fixed N, constant Success probability.",
      "PMF: \\(\\binom{n}{k} p^k (1-p)^{n-k}\\).",
      "binompdf = exact; binomcdf = cumulative (\\(P(X \\le k)\\)).",
      "Use complements for 'at least' probabilities.",
    ],
    workedExample: {
      prompt:
        "\\(X \\sim \\text{Bin}(10, 0.3)\\). Find \\(P(X = 3)\\).",
      solution:
        "\\(P(X=3) = \\binom{10}{3}(0.3)^3(0.7)^7 = 120(0.027)(0.0824) \\approx 0.267\\).",
    },
    commonMistakes: [
      "Not checking BINS — some 'binomial' setups have varying \\(p\\).",
      "Using binomcdf for an exact-equals problem.",
      "Misreading 'at least 5' as binomcdf(n,p,5).",
    ],
  },
  "4.11": {
    id: "4.11",
    title: "Parameters for a Binomial Distribution",
    summary:
      "If \\(X \\sim \\text{Bin}(n, p)\\): \\(\\mu_X = np\\), \\(\\sigma_X = \\sqrt{np(1-p)}\\).",
    lesson:
      "Mean: you expect \\(np\\) successes on average over many repetitions of the \\(n\\)-trial process. Standard deviation: \\(\\sqrt{np(1-p)}\\). These formulas are on the AP formula sheet, but memorize anyway.\n\nShape: \\(p = 0.5\\) gives a symmetric binomial; \\(p < 0.5\\) skews right; \\(p > 0.5\\) skews left. As \\(n\\) increases, the distribution looks more normal (Central Limit Theorem preview). The normal approximation kicks in when \\(np \\ge 10\\) and \\(n(1-p) \\ge 10\\) — the Large Counts condition. (You'll apply this in Unit 5.)",
    keyIdeas: [
      "\\(\\mu = np\\), \\(\\sigma = \\sqrt{np(1-p)}\\).",
      "Binomial is symmetric when \\(p = 0.5\\), skewed otherwise.",
      "Large Counts: \\(np, n(1-p) \\ge 10\\) for normal approximation.",
      "Use binompdf/binomcdf for exact probabilities; normal only as approximation.",
    ],
    workedExample: {
      prompt:
        "\\(X \\sim \\text{Bin}(50, 0.2)\\). Find \\(\\mu, \\sigma\\), and check Large Counts.",
      solution:
        "\\(\\mu = 10\\), \\(\\sigma = \\sqrt{50(0.2)(0.8)} = \\sqrt{8} \\approx 2.83\\). Large Counts: \\(50(0.2) = 10 \\ge 10\\), \\(50(0.8) = 40 \\ge 10\\). Normal approximation valid.",
    },
    commonMistakes: [
      "Computing variance without squaring SD components.",
      "Using \\(\\sqrt{np}\\) instead of \\(\\sqrt{np(1-p)}\\).",
      "Applying Large Counts with np = 9 (doesn't satisfy \\(\\ge 10\\)).",
    ],
  },
  "4.12": {
    id: "4.12",
    title: "The Geometric Distribution",
    summary:
      "Geometric random variable: number of trials until the FIRST success. PMF: \\(P(X=k) = (1-p)^{k-1} p\\).",
    lesson:
      "BITS conditions (similar to binomial but with 'Trials until first success' instead of a fixed number):\n• Binary — two outcomes.\n• Independent — trials are independent.\n• Trials until first success — not fixed \\(n\\).\n• Same probability of success \\(p\\).\n\nPMF: \\(P(X = k) = (1-p)^{k-1} p\\) for \\(k = 1, 2, 3, \\ldots\\).\n\nMean: \\(\\mu_X = 1/p\\). SD: \\(\\sigma_X = \\sqrt{(1-p)/p^2}\\).\n\nOn the calculator: geometpdf(p, k), geometcdf(p, k). Geometric distributions are heavily skewed right (most trials succeed quickly, but the tail goes on forever).",
    keyIdeas: [
      "Geometric = trials until first success.",
      "PMF: \\((1-p)^{k-1} p\\).",
      "\\(\\mu = 1/p\\); \\(\\sigma = \\sqrt{(1-p)}/p\\).",
      "Always skewed right.",
    ],
    workedExample: {
      prompt:
        "A basketball player makes 40% of free throws. What's the probability the first make is on the 3rd attempt?",
      solution:
        "\\(P(X=3) = (0.6)^2 (0.4) = 0.144\\).",
    },
    commonMistakes: [
      "Confusing geometric (number of trials) with binomial (fixed trials).",
      "Off-by-one: the first success on trial \\(k\\) means \\(k-1\\) failures then 1 success.",
      "Using \\(1/p\\) for SD instead of mean.",
    ],
  },

  // =========================================================================
  // UNIT 5 — SAMPLING DISTRIBUTIONS
  // =========================================================================
  "5.1": {
    id: "5.1",
    title: "Introducing Statistics: Why Is My Sample Not Like Yours?",
    summary:
      "Two samples from the same population give different statistics. The sampling distribution quantifies this variability.",
    lesson:
      "Take 100 random samples of size 50 from the same population. Compute each sample's mean. You'll get 100 different values. The distribution of those sample means across all possible samples is the sampling distribution of \\(\\bar{x}\\).\n\nThe sampling distribution is NOT the distribution of the population, and it is NOT the distribution of a single sample. It's the distribution of a statistic. Confusing these three is the single biggest conceptual error in the course.\n\nParameters (like \\(\\mu, p\\)) describe the population. Statistics (\\(\\bar{x}, \\hat{p}\\)) describe samples and are themselves random variables with their own distribution. Unit 5 characterizes the center, spread, and shape of that distribution so Units 6+ can convert it into confidence intervals and tests.",
    keyIdeas: [
      "Three distributions to keep straight: population, sample, sampling distribution (of a statistic).",
      "Parameters describe population; statistics describe samples.",
      "Sampling distribution has its own mean, SD, and shape.",
      "Variability in statistics is what enables inference.",
    ],
    commonMistakes: [
      "Calling a histogram of one sample 'a sampling distribution.'",
      "Using the sample SD as if it were the SD of the sampling distribution.",
      "Mixing up parameter symbols (\\(\\mu, p\\)) with statistic symbols (\\(\\bar{x}, \\hat{p}\\)).",
    ],
  },
  "5.2": {
    id: "5.2",
    title: "The Normal Distribution, Revisited",
    summary:
      "Review the 68-95-99.7 rule and \\(z\\)-scores in preparation for normal-based sampling distributions.",
    lesson:
      "Unit 1.10 introduced the normal. Here we refresh because all the sampling distribution work depends on it.\n\nAny normally distributed variable \\(X \\sim N(\\mu, \\sigma)\\) becomes \\(Z = (X - \\mu)/\\sigma \\sim N(0, 1)\\). Use \\(Z\\) to read tables or invert probabilities. The standard normal has \\(P(-1 < Z < 1) \\approx 0.68\\), \\(P(-2 < Z < 2) \\approx 0.95\\), \\(P(-3 < Z < 3) \\approx 0.997\\).\n\nCalculator: normalcdf(lower, upper, μ, σ) for probabilities; invNorm(area, μ, σ) for cutoffs. Always state (1) the model, (2) the \\(z\\)-score, (3) the computed probability or cutoff, (4) the interpretation in context. Even a perfect calculator number loses credit without the setup.",
    keyIdeas: [
      "\\(z = (x - \\mu)/\\sigma\\) standardizes.",
      "normalcdf for 'between'; invNorm for 'cutoff from area.'",
      "68-95-99.7 rule, again.",
      "Always show the setup, not just the final number.",
    ],
    workedExample: {
      prompt:
        "Weights of apples are \\(N(8, 1)\\) oz. What proportion weigh between 7 and 9 oz?",
      solution:
        "\\(z_1 = -1\\), \\(z_2 = 1\\). \\(P(-1 < Z < 1) \\approx 0.68\\). About 68% weigh between 7 and 9 oz.",
    },
    commonMistakes: [
      "Computing normalcdf without recording the \\(z\\)-scores.",
      "Forgetting units in the interpretation.",
      "Using invNorm with an area outside (0,1).",
    ],
  },
  "5.3": {
    id: "5.3",
    title: "The Central Limit Theorem",
    summary:
      "For large \\(n\\), the sampling distribution of \\(\\bar{x}\\) is approximately normal regardless of the population shape.",
    lesson:
      "The Central Limit Theorem (CLT): if \\(X_1, X_2, \\ldots, X_n\\) are iid with mean \\(\\mu\\) and SD \\(\\sigma\\), then for large \\(n\\), \\(\\bar{x} \\approx N(\\mu, \\sigma/\\sqrt{n})\\). 'Large enough' is commonly \\(n \\ge 30\\), though the actual threshold depends on how non-normal the population is.\n\nWhat CLT says and doesn't say:\n• Yes: the distribution of the SAMPLE MEAN becomes normal as \\(n\\) grows.\n• No: it does NOT say the individual observations become normal. A skewed population stays skewed — only averages of it become normal.\n\nThis is why the normal distribution is everywhere in statistics: means, proportions, and even test statistics are asymptotically normal thanks to CLT.",
    keyIdeas: [
      "CLT: sampling distribution of \\(\\bar{x}\\) → normal as \\(n\\) grows.",
      "\\(n \\ge 30\\) rule of thumb; more needed if population very skewed.",
      "CLT is about the mean, not individual observations.",
      "Mean of the sampling distribution is \\(\\mu\\); SD is \\(\\sigma/\\sqrt{n}\\).",
    ],
    workedExample: {
      prompt:
        "Population has \\(\\mu = 100\\), \\(\\sigma = 20\\), heavily right-skewed. Describe the sampling distribution of \\(\\bar{x}\\) for \\(n=50\\).",
      solution:
        "By CLT (\\(n=50 \\ge 30\\)), \\(\\bar{x} \\approx N(100, 20/\\sqrt{50}) = N(100, 2.83)\\). Approximately normal, centered at 100.",
    },
    commonMistakes: [
      "Saying 'population is normal because n is large' — CLT is about the mean.",
      "Applying CLT with tiny \\(n\\) on a highly skewed population.",
      "Using \\(\\sigma\\) instead of \\(\\sigma/\\sqrt{n}\\) for the sampling distribution SD.",
    ],
  },
  "5.4": {
    id: "5.4",
    title: "Biased and Unbiased Point Estimates",
    summary:
      "An estimator is unbiased if the mean of its sampling distribution equals the parameter.",
    lesson:
      "A point estimator is a statistic used to estimate a parameter. We want estimators that are (1) unbiased — sampling distribution centered at the true parameter — and (2) low-variability — sampling distribution tightly clustered.\n\nUnbiased estimators include: \\(\\bar{x}\\) for \\(\\mu\\), \\(\\hat{p}\\) for \\(p\\), \\(s^2\\) (using \\(n-1\\)) for \\(\\sigma^2\\). The \\(n-1\\) denominator in sample variance exists precisely to make the estimator unbiased; using \\(n\\) would systematically underestimate \\(\\sigma^2\\).\n\nBias is NOT the same as variability. An unbiased estimator can have high variability; a biased estimator can be very precise (just off-center). The best estimators minimize mean squared error, which combines bias and variance. For the AP exam, the vocabulary is enough: 'unbiased' = centered at truth; 'low variability' = tightly clustered around that center.",
    keyIdeas: [
      "Unbiased: mean of sampling distribution = parameter.",
      "Lower variability (SE) = sampling distribution more tightly packed.",
      "\\(\\bar{x}, \\hat{p}, s^2\\) (with \\(n-1\\)) are unbiased.",
      "Bias ≠ variability; both matter.",
    ],
    commonMistakes: [
      "Claiming a single sample estimate 'is unbiased' — bias is a property of the estimator, not one value.",
      "Confusing sample SD (has \\(n-1\\)) with population SD (has \\(n\\)).",
      "Assuming unbiased ⇒ accurate (variability matters too).",
    ],
  },
  "5.5": {
    id: "5.5",
    title: "Sampling Distributions for Sample Proportions",
    summary:
      "\\(\\hat{p}\\) has mean \\(p\\) and SD \\(\\sqrt{p(1-p)/n}\\); approximately normal when \\(np \\ge 10\\) and \\(n(1-p) \\ge 10\\).",
    lesson:
      "Let \\(\\hat{p} = X/n\\), the sample proportion from \\(n\\) Bernoulli(\\(p\\)) trials. The sampling distribution of \\(\\hat{p}\\):\n• Mean: \\(\\mu_{\\hat{p}} = p\\) (unbiased).\n• SD: \\(\\sigma_{\\hat{p}} = \\sqrt{p(1-p)/n}\\).\n• Shape: approximately normal if Large Counts holds: \\(np \\ge 10\\) and \\(n(1-p) \\ge 10\\).\n\nAdditional condition: sampling is random AND either trials are independent (sampling with replacement or infinite population) OR \\(n < 10\\%\\) of the population (10% condition).\n\nUse this to compute probabilities about \\(\\hat{p}\\): 'what's the chance a random sample of 100 voters has more than 55% support for candidate A?' Standardize with \\(z = (\\hat{p} - p)/\\sqrt{p(1-p)/n}\\) and compute.",
    keyIdeas: [
      "\\(\\hat{p} \\approx N(p, \\sqrt{p(1-p)/n})\\) when Large Counts + Random + 10% hold.",
      "\\(z = (\\hat{p} - p)/\\sqrt{p(1-p)/n}\\).",
      "Large Counts: \\(np \\ge 10\\) AND \\(n(1-p) \\ge 10\\).",
      "Always state and check the conditions before computing.",
    ],
    workedExample: {
      prompt:
        "A die is rolled 180 times. Find the probability more than 20% of rolls are a 6.",
      solution:
        "\\(p = 1/6 \\approx 0.167\\), \\(n = 180\\). Large counts: 30, 150 — OK. \\(\\mu_{\\hat{p}} = 0.167\\), \\(\\sigma_{\\hat{p}} = \\sqrt{(0.167)(0.833)/180} \\approx 0.0278\\). \\(z = (0.20 - 0.167)/0.0278 \\approx 1.19\\). \\(P(Z > 1.19) \\approx 0.117\\). About an 11.7% chance.",
    },
    commonMistakes: [
      "Using \\(p(1-p)\\) without dividing by \\(n\\).",
      "Forgetting to check Large Counts.",
      "Confusing the sampling distribution of \\(\\hat{p}\\) with the binomial distribution of the count \\(X\\).",
    ],
  },
  "5.6": {
    id: "5.6",
    title: "Sampling Distributions for Differences in Sample Proportions",
    summary:
      "For two independent samples: \\(\\hat{p}_1 - \\hat{p}_2\\) has mean \\(p_1 - p_2\\) and SD \\(\\sqrt{p_1(1-p_1)/n_1 + p_2(1-p_2)/n_2}\\).",
    lesson:
      "When comparing two groups, we study the sampling distribution of \\(\\hat{p}_1 - \\hat{p}_2\\).\n• Mean: \\(\\mu_{\\hat{p}_1 - \\hat{p}_2} = p_1 - p_2\\).\n• SD: \\(\\sigma_{\\hat{p}_1 - \\hat{p}_2} = \\sqrt{p_1(1-p_1)/n_1 + p_2(1-p_2)/n_2}\\).\n• Shape: approx normal if Large Counts holds for BOTH samples: \\(n_1 p_1, n_1(1-p_1), n_2 p_2, n_2(1-p_2)\\) all \\(\\ge 10\\).\n\nNote the SD combines variances by adding (under independence). Don't subtract. If the groups share some structure (e.g., matched pairs), independence fails and this formula is wrong — use paired methods instead.",
    keyIdeas: [
      "Mean of differences = difference of means.",
      "Variance of differences = sum of variances (under independence).",
      "Large Counts applies to EACH sample (4 conditions total).",
      "Requires independent random samples from each population.",
    ],
    workedExample: {
      prompt:
        "In two independent samples, \\(p_1 = 0.6, n_1 = 100\\); \\(p_2 = 0.5, n_2 = 150\\). Find the SD of \\(\\hat{p}_1 - \\hat{p}_2\\).",
      solution:
        "\\(\\sqrt{(0.6)(0.4)/100 + (0.5)(0.5)/150} = \\sqrt{0.0024 + 0.00167} = \\sqrt{0.00407} \\approx 0.0638\\).",
    },
    commonMistakes: [
      "Subtracting variances for the difference (always add).",
      "Checking Large Counts only on one sample.",
      "Pooling sample sizes into one \\(n\\) — each sample has its own.",
    ],
  },
  "5.7": {
    id: "5.7",
    title: "Sampling Distributions for Sample Means",
    summary:
      "\\(\\bar{x}\\) has mean \\(\\mu\\) and SD \\(\\sigma/\\sqrt{n}\\); approximately normal if the population is normal OR \\(n \\ge 30\\) (CLT).",
    lesson:
      "For an SRS of size \\(n\\) from a population with mean \\(\\mu\\) and SD \\(\\sigma\\):\n• Mean of sampling distribution: \\(\\mu_{\\bar{x}} = \\mu\\).\n• SD: \\(\\sigma_{\\bar{x}} = \\sigma/\\sqrt{n}\\).\n• Shape: approximately normal if (a) population is normal, or (b) \\(n \\ge 30\\) by CLT. For non-normal populations with \\(n < 30\\), check the shape — moderate sample sizes (15–30) are fine for symmetric-ish populations; very skewed populations may need \\(n > 30\\).\n\nTypical question: 'Population has \\(\\mu = 60\\), \\(\\sigma = 10\\). What's the probability a random sample of 40 has mean above 63?' Compute \\(\\sigma_{\\bar{x}} = 10/\\sqrt{40} \\approx 1.58\\). \\(z = (63-60)/1.58 \\approx 1.90\\). \\(P(Z > 1.90) \\approx 0.029\\).",
    keyIdeas: [
      "\\(\\bar{x} \\approx N(\\mu, \\sigma/\\sqrt{n})\\).",
      "Normality: either population normal OR \\(n \\ge 30\\).",
      "SD shrinks by \\(\\sqrt{n}\\), not \\(n\\).",
      "Also need random sample and 10% condition if sampling without replacement.",
    ],
    workedExample: {
      prompt:
        "If \\(\\mu = 500\\), \\(\\sigma = 100\\), \\(n = 25\\) (normal population), find \\(P(\\bar{x} > 520)\\).",
      solution:
        "\\(\\sigma_{\\bar{x}} = 100/5 = 20\\). \\(z = 1\\). \\(P(Z > 1) \\approx 0.159\\).",
    },
    commonMistakes: [
      "Using \\(\\sigma\\) instead of \\(\\sigma/\\sqrt{n}\\).",
      "Applying CLT without checking sample size or normality.",
      "Confusing sampling distribution with population distribution.",
    ],
  },
  "5.8": {
    id: "5.8",
    title: "Sampling Distributions for Differences in Sample Means",
    summary:
      "\\(\\bar{x}_1 - \\bar{x}_2\\) has mean \\(\\mu_1 - \\mu_2\\) and SD \\(\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}\\).",
    lesson:
      "For two independent SRSs:\n• Mean: \\(\\mu_{\\bar{x}_1 - \\bar{x}_2} = \\mu_1 - \\mu_2\\).\n• SD: \\(\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}\\).\n• Shape: approximately normal if BOTH populations are normal or BOTH \\(n \\ge 30\\).\n\nAs with proportions, variances add (under independence); don't subtract. This formula assumes the two samples are drawn independently of each other — fails for matched-pair data, where a paired-differences approach is required instead.\n\nWhen the population SDs are unknown (they usually are), we replace them with sample SDs and use a \\(t\\)-distribution (Unit 7). But the skeleton of the sampling distribution is identical.",
    keyIdeas: [
      "Mean difference is unbiased estimator of \\(\\mu_1 - \\mu_2\\).",
      "Variances add under independence: \\(\\sigma_1^2/n_1 + \\sigma_2^2/n_2\\).",
      "Normality requires both populations normal or both \\(n \\ge 30\\).",
      "Paired data breaks independence → use paired analysis instead.",
    ],
    workedExample: {
      prompt:
        "\\(\\mu_1 = 75, \\sigma_1 = 10, n_1 = 50\\); \\(\\mu_2 = 70, \\sigma_2 = 12, n_2 = 40\\). Find the mean and SD of \\(\\bar{x}_1 - \\bar{x}_2\\).",
      solution:
        "Mean: \\(75 - 70 = 5\\). SD: \\(\\sqrt{100/50 + 144/40} = \\sqrt{2 + 3.6} = \\sqrt{5.6} \\approx 2.37\\).",
    },
    commonMistakes: [
      "Subtracting variances.",
      "Pooling SD values without checking equal-variance assumption (which AP Stats usually doesn't assume).",
      "Ignoring the 'two independent samples' requirement.",
    ],
  },

  // =========================================================================
  // UNIT 6 — INFERENCE FOR CATEGORICAL DATA: PROPORTIONS
  // =========================================================================
  "6.1": {
    id: "6.1",
    title: "Introducing Statistics: Why Be Normal?",
    summary:
      "Normal-based inference works because sampling distributions are approximately normal for large samples. CIs and tests build on that.",
    lesson:
      "Unit 5 established that \\(\\hat{p}\\) and \\(\\bar{x}\\) have approximately normal sampling distributions under mild conditions. Unit 6 uses that fact to do inference on proportions: confidence intervals estimate \\(p\\), hypothesis tests judge claims about \\(p\\). Unit 7 does the same for means, Unit 8 for chi-square tests, Unit 9 for regression slope.\n\nFour-step inference template that you should internalize:\n1. State — parameter, hypothesis or interval, significance level.\n2. Plan — name the procedure, state conditions, verify.\n3. Do — compute the test statistic, p-value (or interval).\n4. Conclude — in context, with appropriate hedging.\n\nThis template is how graders read your work. Miss a step and the points vanish.",
    keyIdeas: [
      "Normal sampling distributions → normal-based inference.",
      "Four-step template: State, Plan, Do, Conclude.",
      "Every step has context — the variable, the population, the units.",
      "Skipping conditions is an instant point loss.",
    ],
    commonMistakes: [
      "Skipping the 'State' step and jumping to computation.",
      "Citing conditions without verifying with the actual data.",
      "Writing conclusions that aren't in context.",
    ],
  },
  "6.2": {
    id: "6.2",
    title: "Constructing a Confidence Interval for a Population Proportion",
    summary:
      "CI for \\(p\\): \\(\\hat{p} \\pm z^* \\sqrt{\\hat{p}(1-\\hat{p})/n}\\). This is the one-sample \\(z\\)-interval.",
    lesson:
      "A level-\\(C\\) CI for \\(p\\) is \\(\\hat{p} \\pm z^* \\text{SE}\\), where \\(\\text{SE} = \\sqrt{\\hat{p}(1-\\hat{p})/n}\\) and \\(z^*\\) is the critical value with \\(C\\) of the central normal area (e.g., \\(z^* = 1.96\\) for 95%, 1.645 for 90%, 2.576 for 99%).\n\nConditions:\n• Random sample.\n• 10% condition: \\(n \\le 10\\%\\) of the population (so independence holds).\n• Large Counts: \\(n\\hat{p} \\ge 10\\) AND \\(n(1-\\hat{p}) \\ge 10\\) (we use \\(\\hat{p}\\) because \\(p\\) is unknown here).\n\nState the procedure ('one-sample z-interval for \\(p\\)'), list the conditions with numerical checks, compute, interpret. A 95% CI of (0.42, 0.48) for the true proportion of voters supporting candidate A: 'I am 95% confident that the true proportion of voters who support candidate A is between 0.42 and 0.48.' Always in context.",
    keyIdeas: [
      "CI: \\(\\hat{p} \\pm z^* \\sqrt{\\hat{p}(1-\\hat{p})/n}\\).",
      "Conditions: Random, 10%, Large Counts (with \\(\\hat{p}\\)).",
      "\\(z^*\\) for 90/95/99%: 1.645 / 1.96 / 2.576.",
      "Interpretation uses 'I am C% confident the true proportion is…'",
    ],
    workedExample: {
      prompt:
        "Out of 400 people sampled, 180 say yes. Build a 95% CI for \\(p\\).",
      solution:
        "\\(\\hat{p} = 0.45\\). SE = \\(\\sqrt{(0.45)(0.55)/400} \\approx 0.0249\\). ME = \\(1.96 \\cdot 0.0249 \\approx 0.0488\\). CI: (0.401, 0.499). I am 95% confident the true proportion is between 40.1% and 49.9%.",
    },
    commonMistakes: [
      "Using \\(p\\) instead of \\(\\hat{p}\\) in SE for a CI.",
      "Writing 'there's a 95% chance \\(p\\) is in the interval' — wrong; the interval either does or doesn't contain \\(p\\).",
      "Skipping the 'Large Counts with \\(\\hat{p}\\)' check.",
    ],
  },
  "6.3": {
    id: "6.3",
    title: "Justifying a Claim Based on a Confidence Interval for a Population Proportion",
    summary:
      "To test a claim about \\(p\\), see whether the null value falls in or outside the CI.",
    lesson:
      "A two-sided test at level \\(\\alpha = 1 - C\\) is equivalent to checking whether the null value is in a \\(C\\) CI. If the CI for \\(p\\) is (0.41, 0.49) and someone claims \\(p = 0.50\\), the claim is implausible because 0.50 is outside the interval — we'd reject at \\(\\alpha = 0.05\\).\n\nThis is a fast way to answer questions like 'does the data support the claim that \\(p = 0.5\\)?' without running a full hypothesis test. But CIs only do two-sided inference at the complement level; for one-sided tests, use the formal test directly.\n\nInterpretation in conclusion: 'Because 0.50 is not in our 95% CI, we have statistically significant evidence at the 5% level to reject the claim that \\(p = 0.50\\).' Always tie it back to context.",
    keyIdeas: [
      "Null value inside CI → fail to reject; outside → reject.",
      "CI ↔ two-sided test at \\(\\alpha = 1 - C\\).",
      "For one-sided tests, use the full test, not the CI.",
      "Conclusion sentence names the claim, the CI, and the decision.",
    ],
    workedExample: {
      prompt:
        "A 90% CI for \\(p\\) is (0.38, 0.46). Is there evidence that \\(p \\ne 0.40\\) at \\(\\alpha = 0.10\\)?",
      solution:
        "0.40 is inside (0.38, 0.46), so we fail to reject \\(H_0: p = 0.40\\). No significant evidence at the 10% level.",
    },
    commonMistakes: [
      "Using a 95% CI to test at \\(\\alpha = 0.05\\) but forgetting it's two-sided.",
      "Interpreting 'null in CI' as 'null is true' (we just fail to reject).",
      "Confusing the levels: 95% CI ↔ \\(\\alpha = 0.05\\).",
    ],
  },
  "6.4": {
    id: "6.4",
    title: "Setting Up a Test for a Population Proportion",
    summary:
      "State \\(H_0: p = p_0\\) vs. \\(H_a\\) (one or two sided), choose \\(\\alpha\\), verify conditions.",
    lesson:
      "Hypotheses for proportion tests:\n• \\(H_0: p = p_0\\) (a specific claimed value).\n• \\(H_a: p > p_0\\), \\(p < p_0\\), or \\(p \\ne p_0\\) — pick based on the research question.\n\nCrucially, the null is stated WITH EQUALITY, and the standard error uses \\(p_0\\) (the hypothesized value), not \\(\\hat{p}\\). This differs from the CI, where we used \\(\\hat{p}\\) because we didn't assume any specific \\(p\\). In a test we assume \\(H_0\\) is true and see how surprising the data is under that assumption.\n\nConditions for a one-sample \\(z\\)-test of \\(p\\):\n• Random sample.\n• 10% condition.\n• Large Counts: \\(np_0 \\ge 10\\) AND \\(n(1-p_0) \\ge 10\\). Uses \\(p_0\\), not \\(\\hat{p}\\).",
    keyIdeas: [
      "\\(H_0\\) uses equality; \\(H_a\\) is one- or two-sided.",
      "Test SE uses \\(p_0\\); CI SE uses \\(\\hat{p}\\).",
      "Large Counts with \\(p_0\\).",
      "Define the parameter in context before stating hypotheses.",
    ],
    commonMistakes: [
      "Using \\(\\hat{p}\\) in the test SE.",
      "Writing \\(H_0: \\hat{p} = p_0\\) (it's about the parameter, not the statistic).",
      "Skipping the 'define \\(p\\) in context' step.",
    ],
  },
  "6.5": {
    id: "6.5",
    title: "Interpreting p-Values",
    summary:
      "p-value = probability, assuming \\(H_0\\) is true, of observing a test statistic at least as extreme as ours.",
    lesson:
      "The p-value is the probability of results as extreme or more extreme than what we saw, given the null is true. Small p-value → data are surprising under \\(H_0\\) → evidence against \\(H_0\\).\n\nStandard interpretation for AP: 'Assuming \\(H_0: p = 0.5\\) is true (the null), the probability of observing a sample proportion as extreme as 0.60 (or more extreme) is 0.034.'\n\nThe p-value is NOT the probability \\(H_0\\) is true. It is NOT the probability you're wrong. It is a conditional probability about the data, given the null. Students lose points every year for saying 'there's a 3.4% chance the null is true.'\n\nCompare p-value to significance level \\(\\alpha\\): if \\(p < \\alpha\\), reject \\(H_0\\). Otherwise fail to reject.",
    keyIdeas: [
      "p-value = \\(P(\\text{data as extreme or more} \\mid H_0)\\).",
      "Small p-value → reject \\(H_0\\).",
      "p-value is NOT the probability that \\(H_0\\) is true.",
      "Interpretation always includes 'assuming \\(H_0\\) is true' + the specific statistic value.",
    ],
    workedExample: {
      prompt:
        "A two-sided test of \\(H_0: p = 0.5\\) gives p-value 0.034. Interpret at \\(\\alpha = 0.05\\).",
      solution:
        "Assuming \\(p = 0.5\\), there's a 3.4% chance of observing a sample proportion at least as far from 0.5 as ours. Since 0.034 < 0.05, we reject \\(H_0\\) — statistically significant evidence that \\(p \\ne 0.5\\).",
    },
    commonMistakes: [
      "Calling the p-value 'the probability the null is true.'",
      "Forgetting 'assuming the null is true' in the interpretation.",
      "Confusing 'extreme' with 'far from the observed' (they're different directions).",
    ],
  },
  "6.6": {
    id: "6.6",
    title: "Concluding a Test for a Population Proportion",
    summary:
      "Compute \\(z = (\\hat{p} - p_0)/\\sqrt{p_0(1-p_0)/n}\\), find the p-value, compare to \\(\\alpha\\), and conclude in context.",
    lesson:
      "Mechanics:\n• Test statistic: \\(z = \\frac{\\hat{p} - p_0}{\\sqrt{p_0(1-p_0)/n}}\\).\n• p-value: use the standard normal. One-sided \\(>\\): \\(P(Z > z)\\); one-sided \\(<\\): \\(P(Z < z)\\); two-sided: \\(2 \\cdot P(Z > |z|)\\).\n• Decision: if p-value \\(< \\alpha\\), reject \\(H_0\\); else fail to reject.\n\nConclusion template:\n'Because the p-value (X) is less than \\(\\alpha\\) (Y), we reject \\(H_0\\). We have convincing statistical evidence that [restate \\(H_a\\) in context].'\nOR\n'Because the p-value (X) is greater than \\(\\alpha\\) (Y), we fail to reject \\(H_0\\). We do not have convincing statistical evidence that [restate \\(H_a\\) in context].'\n\nNever 'accept' the null. Failing to reject doesn't prove the null — it just says the data are consistent with it.",
    keyIdeas: [
      "Test SE uses \\(p_0\\).",
      "Two-sided p-values double the one-tail probability.",
      "Never 'accept' the null.",
      "Conclusion in context, referring to \\(H_a\\) explicitly.",
    ],
    workedExample: {
      prompt:
        "A claim says 50% of students cheat; 120 out of 200 sampled admit cheating. Test at \\(\\alpha = 0.05\\).",
      solution:
        "\\(\\hat{p} = 0.60\\), \\(p_0 = 0.50\\), \\(n = 200\\). SE = \\(\\sqrt{0.5 \\cdot 0.5 /200} \\approx 0.0354\\). \\(z = 0.10/0.0354 \\approx 2.83\\). Two-sided p-value ≈ \\(2 \\cdot P(Z > 2.83) \\approx 0.0047\\). Since 0.0047 < 0.05, reject \\(H_0\\); convincing evidence the true cheating rate differs from 50%.",
    },
    commonMistakes: [
      "Using one-tail p-value when \\(H_a\\) is two-sided.",
      "Writing 'accept \\(H_0\\).'",
      "Forgetting to compare p-value to \\(\\alpha\\) explicitly.",
    ],
  },
  "6.7": {
    id: "6.7",
    title: "Potential Errors When Performing Tests",
    summary:
      "Type I: reject a true null. Type II: fail to reject a false null. Power: probability of correctly rejecting a false null.",
    lesson:
      "Possible outcomes of a test:\n• \\(H_0\\) true, we fail to reject → correct.\n• \\(H_0\\) true, we reject → Type I error. Probability = \\(\\alpha\\).\n• \\(H_0\\) false, we reject → correct, power.\n• \\(H_0\\) false, we fail to reject → Type II error. Probability = \\(\\beta\\).\n\nPower = \\(1 - \\beta\\) = probability of rejecting a false null. Power increases with: larger sample size, larger effect size (distance from null), larger \\(\\alpha\\) (more willing to reject), smaller population variability.\n\nAP questions often ask 'what's the consequence of a Type I / II error in this context?' Write a context-specific sentence: 'A Type I error means concluding the drug works when it actually doesn't — patients would be prescribed an ineffective drug.' Always tie it back to the story.",
    keyIdeas: [
      "Type I: reject true \\(H_0\\); probability = \\(\\alpha\\).",
      "Type II: fail to reject false \\(H_0\\); probability = \\(\\beta\\).",
      "Power = \\(1 - \\beta\\); probability of detecting a real effect.",
      "Power increases with: larger \\(n\\), larger effect, larger \\(\\alpha\\), smaller variability.",
    ],
    workedExample: {
      prompt:
        "A test for a new drug: \\(H_0\\) says no effect, \\(H_a\\) says positive effect. Describe Type I and Type II errors in context.",
      solution:
        "Type I: concluding the drug works when it doesn't — patients receive an ineffective treatment. Type II: concluding no effect when the drug actually helps — patients miss out on a beneficial treatment.",
    },
    commonMistakes: [
      "Confusing Type I and Type II.",
      "Saying 'power is the probability of Type I' (wrong).",
      "Writing generic error descriptions instead of context-specific.",
    ],
  },
  "6.8": {
    id: "6.8",
    title: "Confidence Intervals for the Difference of Two Proportions",
    summary:
      "CI: \\((\\hat{p}_1 - \\hat{p}_2) \\pm z^* \\sqrt{\\hat{p}_1(1-\\hat{p}_1)/n_1 + \\hat{p}_2(1-\\hat{p}_2)/n_2}\\).",
    lesson:
      "Two-sample \\(z\\)-interval for \\(p_1 - p_2\\). The SE uses separate sample proportions (NOT pooled, because we're not assuming equal proportions here).\n\nConditions:\n• Two independent random samples.\n• 10% condition for each.\n• Large Counts for each: \\(n_1\\hat{p}_1, n_1(1-\\hat{p}_1), n_2\\hat{p}_2, n_2(1-\\hat{p}_2)\\) all \\(\\ge 10\\).\n\nInterpret: 'I am 95% confident that the true difference in proportions (Population 1 − Population 2) is between a and b.' Note the order — always be explicit about which population is which.",
    keyIdeas: [
      "Separate (unpooled) SEs for CI.",
      "Check Large Counts for BOTH samples.",
      "Interpretation specifies the order of subtraction.",
      "Same template as one-proportion CI, just with a subtraction.",
    ],
    workedExample: {
      prompt:
        "\\(\\hat{p}_1 = 0.6, n_1 = 100\\); \\(\\hat{p}_2 = 0.5, n_2 = 200\\). 95% CI for \\(p_1 - p_2\\).",
      solution:
        "Diff = 0.10. SE = \\(\\sqrt{(0.6)(0.4)/100 + (0.5)(0.5)/200} \\approx 0.0610\\). ME = \\(1.96 \\cdot 0.061 \\approx 0.120\\). CI: (−0.020, 0.220). I am 95% confident the difference \\(p_1 - p_2\\) is between −0.02 and 0.22.",
    },
    commonMistakes: [
      "Pooling the SE when you shouldn't (CIs don't pool).",
      "Forgetting to check Large Counts on both samples.",
      "Omitting which population comes first in the subtraction.",
    ],
  },
  "6.9": {
    id: "6.9",
    title: "Justifying a Claim Based on a Confidence Interval for a Difference of Proportions",
    summary:
      "Check whether 0 (no difference) is in the CI. If 0 is inside, no significant difference at the corresponding \\(\\alpha\\).",
    lesson:
      "If the CI for \\(p_1 - p_2\\) is entirely above 0, we are confident \\(p_1 > p_2\\). If entirely below, \\(p_1 < p_2\\). If 0 is in the CI, we cannot conclude a difference at the corresponding \\(\\alpha\\) level.\n\nExample: 95% CI (0.02, 0.15). Zero is outside; we conclude \\(p_1 > p_2\\) at the 5% level. If instead the CI were (−0.03, 0.10), zero is inside — not enough evidence.\n\nAlso comment on the magnitude of the effect. A CI of (0.02, 0.15) says the difference is statistically nonzero AND plausibly between 2 and 15 percentage points. That magnitude might or might not be 'practically significant' depending on the field.",
    keyIdeas: [
      "0 in CI → fail to reject 'no difference.'",
      "0 outside → reject; conclude direction of difference.",
      "Report both statistical and practical significance when the context allows.",
      "Always in context, specifying which group is larger/smaller.",
    ],
    commonMistakes: [
      "Reading a narrow CI near 0 as 'no effect' without comparing to 0.",
      "Confusing 'statistical' with 'practical' significance.",
      "Forgetting to check whether 0 is inside.",
    ],
  },
  "6.10": {
    id: "6.10",
    title: "Setting Up a Test for the Difference of Two Population Proportions",
    summary:
      "\\(H_0: p_1 - p_2 = 0\\) vs. \\(H_a\\). Use a POOLED proportion in the test SE, since under \\(H_0\\) both populations share \\(p\\).",
    lesson:
      "Hypotheses: \\(H_0: p_1 = p_2\\) (or equivalently \\(p_1 - p_2 = 0\\)) vs. \\(H_a\\) one- or two-sided.\n\nUnder \\(H_0\\), both samples come from populations with a common \\(p\\). Estimate it by pooling: \\(\\hat{p}_c = (X_1 + X_2)/(n_1 + n_2)\\). Test SE: \\(\\sqrt{\\hat{p}_c(1-\\hat{p}_c)(1/n_1 + 1/n_2)}\\).\n\nConditions: same as the CI (two independent random samples, 10%, Large Counts for BOTH).\n\nWhy pool for tests but not CIs? Because tests assume \\(H_0\\) (equal proportions), which is information we can use. CIs don't assume equality.",
    keyIdeas: [
      "Pool for TEST SE: \\(\\hat{p}_c = (X_1 + X_2)/(n_1 + n_2)\\).",
      "Don't pool for CIs.",
      "Null: \\(p_1 - p_2 = 0\\).",
      "Test SE formula uses the pooled \\(\\hat{p}_c\\) for both terms.",
    ],
    workedExample: {
      prompt:
        "\\(X_1 = 60, n_1 = 100\\); \\(X_2 = 80, n_2 = 200\\). Find \\(\\hat{p}_c\\).",
      solution:
        "\\(\\hat{p}_c = (60+80)/(100+200) = 140/300 \\approx 0.467\\).",
    },
    commonMistakes: [
      "Forgetting to pool for the test.",
      "Pooling for the CI (wrong).",
      "Using only one group's count for \\(\\hat{p}_c\\).",
    ],
  },
  "6.11": {
    id: "6.11",
    title: "Carrying Out a Test for the Difference of Two Population Proportions",
    summary:
      "\\(z = (\\hat{p}_1 - \\hat{p}_2)/\\sqrt{\\hat{p}_c(1-\\hat{p}_c)(1/n_1 + 1/n_2)}\\). Find p-value and conclude.",
    lesson:
      "Computations:\n• Pooled \\(\\hat{p}_c\\) as in 6.10.\n• \\(z\\) = (sample difference) / (pooled SE).\n• p-value from the normal distribution, based on \\(H_a\\).\n\nFull template for an AP FRQ:\n1. State hypotheses in symbols AND words. Define \\(p_1, p_2\\) in context.\n2. Name the procedure: two-proportion z-test.\n3. Verify conditions (random, 10%, Large Counts).\n4. Compute pooled proportion, SE, z, p-value.\n5. Compare p-value to \\(\\alpha\\); reject or fail to reject.\n6. State conclusion in context: does the evidence support \\(H_a\\)?",
    keyIdeas: [
      "Use the pooled SE in the denominator of \\(z\\).",
      "p-value direction matches \\(H_a\\).",
      "Conclude in context with an explicit reject/fail-to-reject.",
      "Four-step template is mandatory for full credit.",
    ],
    workedExample: {
      prompt:
        "Using \\(X_1=60/n_1=100\\), \\(X_2=80/n_2=200\\), test \\(H_0: p_1 = p_2\\) vs. two-sided at \\(\\alpha = 0.05\\).",
      solution:
        "\\(\\hat{p}_1 = 0.60\\), \\(\\hat{p}_2 = 0.40\\), \\(\\hat{p}_c \\approx 0.467\\). SE = \\(\\sqrt{0.467 \\cdot 0.533 \\cdot (1/100 + 1/200)} \\approx 0.0611\\). \\(z = (0.60-0.40)/0.0611 \\approx 3.27\\). Two-sided p-value ≈ 0.0011. Reject \\(H_0\\); strong evidence \\(p_1 \\ne p_2\\).",
    },
    commonMistakes: [
      "Using unpooled SE for the test (gives wrong z).",
      "Computing a one-tailed p-value for a two-tailed \\(H_a\\).",
      "Failing to tie conclusion back to the research question.",
    ],
  },

  // =========================================================================
  // UNIT 7 — INFERENCE FOR QUANTITATIVE DATA: MEANS
  // =========================================================================
  "7.1": {
    id: "7.1",
    title: "Introducing Statistics: Should I Worry About Error?",
    summary:
      "When \\(\\sigma\\) is unknown, replacing it with \\(s\\) forces us to use the t-distribution, not the normal.",
    lesson:
      "Unit 6 used \\(z\\) because for proportions the SE depended only on the hypothesized \\(p\\) — no unknown \\(\\sigma\\). For means, we don't know \\(\\sigma\\); we estimate it with \\(s\\), the sample SD. Plugging \\(s\\) for \\(\\sigma\\) introduces extra uncertainty, which makes the distribution of the standardized statistic have heavier tails than the standard normal.\n\nWilliam Gosset (Student) worked this out circa 1908. The resulting t-distribution is symmetric, bell-shaped, centered at 0, but with heavier tails than the normal. It's parameterized by degrees of freedom \\(df = n-1\\) for one-sample inference. As \\(df \\to \\infty\\), the t approaches the normal.\n\nUnit 7 replaces \\(z\\) with \\(t\\) for inference about \\(\\mu\\) and \\(\\mu_1 - \\mu_2\\). Everything else — the four-step template, conditions, interpretation — stays the same.",
    keyIdeas: [
      "Unknown \\(\\sigma\\) → use \\(s\\) → use t-distribution.",
      "t has heavier tails than z; accounts for extra uncertainty.",
      "\\(df = n-1\\) for one-sample t.",
      "t → z as \\(n \\to \\infty\\).",
    ],
    commonMistakes: [
      "Using z when the population SD is unknown.",
      "Forgetting to compute df.",
      "Treating t as identical to z for small samples.",
    ],
  },
  "7.2": {
    id: "7.2",
    title: "Constructing a Confidence Interval for a Population Mean",
    summary:
      "One-sample t-interval for \\(\\mu\\): \\(\\bar{x} \\pm t^* \\cdot s/\\sqrt{n}\\), with \\(df = n-1\\).",
    lesson:
      "A level-\\(C\\) CI for \\(\\mu\\) is \\(\\bar{x} \\pm t^* \\cdot s/\\sqrt{n}\\), where \\(t^*\\) is the critical value from the t-distribution with \\(n-1\\) df that cuts off \\(C\\) of the central area.\n\nConditions:\n• Random sample.\n• 10% condition if sampling without replacement.\n• Normal/Large Sample: either the population is normal, or \\(n \\ge 30\\) (CLT), or sample doesn't show strong skew or outliers for moderate \\(n\\) (15–30).\n\nInterpretation: 'I am 95% confident that the true mean [variable] is between [low] and [high] [units].' Include units and always restate the population.",
    keyIdeas: [
      "CI: \\(\\bar{x} \\pm t^* \\cdot s/\\sqrt{n}\\).",
      "\\(t^*\\) from table with \\(df = n-1\\).",
      "Normality condition: population normal, OR \\(n \\ge 30\\), OR moderate \\(n\\) with no strong skew/outliers.",
      "Always interpret with units and context.",
    ],
    workedExample: {
      prompt:
        "\\(n = 20, \\bar{x} = 72.5, s = 5.0\\). Find the 95% CI for \\(\\mu\\). (Assume normality is reasonable.)",
      solution:
        "df = 19; \\(t^* \\approx 2.093\\). ME = 2.093 \\(\\cdot\\) 5/\\(\\sqrt{20}\\) ≈ 2.34. CI: (70.16, 74.84). I am 95% confident the true mean is between 70.16 and 74.84.",
    },
    commonMistakes: [
      "Using \\(z^* = 1.96\\) instead of \\(t^*\\).",
      "Using \\(df = n\\) instead of \\(n-1\\).",
      "Claiming 'the true mean is in the interval with 95% probability' — wrong framing.",
    ],
  },
  "7.3": {
    id: "7.3",
    title: "Justifying a Claim About a Population Mean Based on a Confidence Interval",
    summary:
      "If a proposed \\(\\mu_0\\) is outside the CI, reject it at the corresponding \\(\\alpha\\). Otherwise, no evidence against.",
    lesson:
      "A \\(C\\)-level CI for \\(\\mu\\) rejects \\(H_0: \\mu = \\mu_0\\) against a two-sided alternative at \\(\\alpha = 1 - C\\) iff \\(\\mu_0\\) is outside the interval.\n\n'A company claims the average wait is under 10 minutes. Our 95% CI for the true mean wait is (10.3, 12.1) minutes. Because 10 is below the entire interval, we have evidence that the true mean wait is more than 10 minutes at the 5% level.' Notice we went beyond just 'reject' — we said which direction the data points.\n\nSame caveats as the proportion version: CIs handle two-sided inference; one-sided claims can still be answered informally but a formal one-sided t-test is cleaner.",
    keyIdeas: [
      "Check whether the claimed value is inside the CI.",
      "Outside → reject the claim at \\(\\alpha = 1-C\\).",
      "Inside → no evidence to reject.",
      "State the direction of any rejected claim (higher/lower).",
    ],
    commonMistakes: [
      "Treating 'not in CI' as proof of the alternative value (we just reject the claim).",
      "Using a 95% CI for a 0.10 test without adjusting.",
      "Failing to specify direction when the CI is entirely on one side of the claim.",
    ],
  },
  "7.4": {
    id: "7.4",
    title: "Setting Up a Test for a Population Mean",
    summary:
      "\\(H_0: \\mu = \\mu_0\\) vs. \\(H_a\\); one-sample t-test with \\(df = n-1\\).",
    lesson:
      "Hypotheses: \\(H_0: \\mu = \\mu_0\\) vs. \\(H_a: \\mu > \\mu_0\\), \\(\\mu < \\mu_0\\), or \\(\\mu \\ne \\mu_0\\). Define \\(\\mu\\) in context (e.g., 'true mean wait time for customers at this store').\n\nConditions:\n• Random sample.\n• 10% (if sampling without replacement).\n• Normal/Large Sample (population normal, \\(n \\ge 30\\), or \\(n\\) moderate and sample shape OK).\n\nTest statistic: \\(t = (\\bar{x} - \\mu_0)/(s/\\sqrt{n})\\), df \\(= n - 1\\). Find p-value from the t-distribution.\n\nNote: we use \\(s\\), not \\(\\sigma\\), in the denominator — unlike in proportions where we used the hypothesized \\(p_0\\). That's because for means there's no 'hypothesized SD' structure; the SD is a separate parameter.",
    keyIdeas: [
      "Define \\(\\mu\\) in context BEFORE hypotheses.",
      "Test stat uses \\(s\\), not \\(\\sigma\\).",
      "df = \\(n-1\\).",
      "Check Normal/Large Sample carefully for small \\(n\\).",
    ],
    commonMistakes: [
      "Writing \\(H_0: \\bar{x} = \\mu_0\\).",
      "Using \\(z\\) instead of \\(t\\).",
      "Forgetting to check sample-shape assumption for small \\(n\\).",
    ],
  },
  "7.5": {
    id: "7.5",
    title: "Carrying Out a Test for a Population Mean",
    summary:
      "Compute \\(t\\), find p-value from t-distribution with \\(df = n-1\\), compare to \\(\\alpha\\), conclude.",
    lesson:
      "Same template as Unit 6. Compute \\(t\\), get p-value from tcdf or the table, compare to \\(\\alpha\\).\n\nOn the calculator: tcdf(lower, upper, df). For a one-sided \\(H_a: \\mu > \\mu_0\\) with \\(t = 2.10, df = 19\\): \\(P(T > 2.10) = \\) tcdf(2.10, 1E99, 19) ≈ 0.024.\n\nSample conclusion: 'Because the p-value (0.024) is less than \\(\\alpha = 0.05\\), we reject \\(H_0\\). We have convincing statistical evidence that the mean wait time exceeds 10 minutes.' Always in context.",
    keyIdeas: [
      "Use tcdf / table for t-based p-values.",
      "\\(df = n-1\\).",
      "Two-tailed: double the one-tail.",
      "Conclude in context; mention direction and magnitude if relevant.",
    ],
    workedExample: {
      prompt:
        "\\(n = 16, \\bar{x} = 102, s = 6\\). Test \\(H_0: \\mu = 100\\) vs. \\(\\mu > 100\\) at \\(\\alpha = 0.05\\).",
      solution:
        "\\(t = (102-100)/(6/\\sqrt{16}) = 2/1.5 \\approx 1.33\\), df = 15. p-value = P(T > 1.33) ≈ 0.101. Since 0.101 > 0.05, fail to reject. Not enough evidence that \\(\\mu > 100\\).",
    },
    commonMistakes: [
      "Dividing by \\(s\\) instead of \\(s/\\sqrt{n}\\).",
      "Using z-tables when you should use t.",
      "Forgetting to state the test name in the conclusion.",
    ],
  },
  "7.6": {
    id: "7.6",
    title: "Confidence Intervals for the Difference of Two Means",
    summary:
      "Two-sample t-interval: \\((\\bar{x}_1 - \\bar{x}_2) \\pm t^* \\sqrt{s_1^2/n_1 + s_2^2/n_2}\\). Use technology's df (Welch-Satterthwaite) or the conservative min(\\(n_1-1, n_2-1\\)).",
    lesson:
      "For two independent samples:\n• Estimate: \\(\\bar{x}_1 - \\bar{x}_2\\).\n• SE: \\(\\sqrt{s_1^2/n_1 + s_2^2/n_2}\\).\n• df: from software (Welch approximation) — usually a non-integer number in the 'low teens' to large values. Without software, use the conservative min(\\(n_1-1, n_2-1\\)).\n\nConditions: two independent random samples; 10% for each; Normal/Large Sample for each.\n\nInterpretation: 'I am 95% confident that the true difference in means (Pop 1 − Pop 2) is between [low] and [high] [units].' The AP exam accepts technology's df; just report it.\n\nDon't use the pooled-variance version unless the problem explicitly tells you the variances are equal — the Welch/unpooled version is the default and always valid.",
    keyIdeas: [
      "Separate SEs (unpooled): \\(\\sqrt{s_1^2/n_1 + s_2^2/n_2}\\).",
      "df: Welch (from calculator) or conservative min(\\(n_1-1, n_2-1\\)).",
      "Conditions: independent SRSs, 10% each, Normal/Large each.",
      "Unpooled is the default; pooled requires equal-variance assumption.",
    ],
    workedExample: {
      prompt:
        "\\(n_1=20, \\bar{x}_1=82, s_1=7\\); \\(n_2=25, \\bar{x}_2=78, s_2=6\\). 95% CI for \\(\\mu_1 - \\mu_2\\) (conservative df).",
      solution:
        "Diff = 4. SE = \\(\\sqrt{49/20 + 36/25} = \\sqrt{2.45 + 1.44} = \\sqrt{3.89} \\approx 1.97\\). Conservative df = 19, \\(t^* \\approx 2.093\\). ME ≈ 2.093·1.97 ≈ 4.12. CI: (−0.12, 8.12).",
    },
    commonMistakes: [
      "Subtracting variances instead of adding.",
      "Using \\(df = n_1 + n_2 - 2\\) (that's the pooled df; AP usually uses Welch or conservative).",
      "Reporting the CI without specifying the order of subtraction.",
    ],
  },
  "7.7": {
    id: "7.7",
    title: "Justifying a Claim About the Difference of Two Means",
    summary:
      "Check whether 0 lies in the CI. If not, the data support a real mean difference; state its direction and magnitude.",
    lesson:
      "If the CI for \\(\\mu_1 - \\mu_2\\) is entirely above 0, conclude \\(\\mu_1 > \\mu_2\\). Entirely below: \\(\\mu_1 < \\mu_2\\). Straddles 0: no evidence of a difference at the corresponding \\(\\alpha\\).\n\nExample interpretation: 'Our 95% CI for \\(\\mu_1 - \\mu_2\\) is (1.5, 5.0) years. Because 0 is below the entire interval, we have statistically significant evidence at \\(\\alpha = 0.05\\) that population 1's mean exceeds population 2's by between 1.5 and 5 years.' The magnitude informs practical significance — a CI of (0.01, 0.05) might be statistically significant but practically small.",
    keyIdeas: [
      "0 in CI → no evidence of difference at \\(\\alpha = 1-C\\).",
      "0 outside → difference detected, in the direction of the interval.",
      "Magnitude of CI informs practical significance.",
      "Name order of subtraction explicitly.",
    ],
    commonMistakes: [
      "Ignoring units when interpreting magnitude.",
      "Assuming statistical significance implies practical significance.",
      "Forgetting to specify which mean is larger.",
    ],
  },
  "7.8": {
    id: "7.8",
    title: "Setting Up a Test for the Difference of Two Population Means",
    summary:
      "\\(H_0: \\mu_1 - \\mu_2 = 0\\) vs. \\(H_a\\); two-sample t-test, df from Welch or conservative.",
    lesson:
      "Hypotheses: \\(H_0: \\mu_1 - \\mu_2 = 0\\) (or \\(\\mu_1 = \\mu_2\\)) vs. \\(H_a\\) one- or two-sided. Define \\(\\mu_1, \\mu_2\\) in context.\n\nConditions: two independent random samples, 10% each, Normal/Large Sample for each.\n\nFor paired data (same subjects under two conditions, or naturally matched units), use a paired t-test on the differences — it's a one-sample t-test on \\(d_i = x_{1i} - x_{2i}\\). DON'T do a two-sample t-test on paired data.",
    keyIdeas: [
      "Default null: means are equal.",
      "Distinguish independent samples (two-sample t) vs. paired (one-sample t on differences).",
      "Conditions on BOTH samples independently for two-sample t.",
      "Define parameters in context.",
    ],
    commonMistakes: [
      "Running a two-sample test on paired data.",
      "Forgetting to check independence.",
      "Mixing up \\(\\mu_1 - \\mu_2 = 0\\) vs. testing a specific nonzero difference (rare, but possible).",
    ],
  },
  "7.9": {
    id: "7.9",
    title: "Carrying Out a Test for the Difference of Two Population Means",
    summary:
      "\\(t = (\\bar{x}_1 - \\bar{x}_2 - 0)/\\sqrt{s_1^2/n_1 + s_2^2/n_2}\\); df from Welch or conservative.",
    lesson:
      "Plug in, compute \\(t\\), get p-value from the t-distribution. Compare to \\(\\alpha\\). Conclude in context.\n\nPaired analog: compute differences \\(d_i\\), find \\(\\bar{d}, s_d\\). Use one-sample t-test: \\(t = (\\bar{d} - 0)/(s_d/\\sqrt{n})\\), df = \\(n-1\\). The paired test often has more power than two-sample on the same data, because it eliminates between-subject variability.\n\nAs always: State → Plan → Do → Conclude. Graders look for the right procedure name and the right conditions before they check arithmetic.",
    keyIdeas: [
      "Two-sample test stat uses unpooled SE.",
      "Paired test = one-sample t on differences.",
      "Paired reduces variability and usually has more power.",
      "State the correct procedure name explicitly.",
    ],
    workedExample: {
      prompt:
        "Ten patients have before/after cholesterol measurements. Differences (before − after) have \\(\\bar{d} = 15\\) mg/dL, \\(s_d = 10\\), \\(n=10\\). Test \\(H_0: \\mu_d = 0\\) vs. \\(\\mu_d > 0\\) at \\(\\alpha = 0.05\\).",
      solution:
        "Paired t-test. \\(t = 15/(10/\\sqrt{10}) \\approx 4.74\\), df = 9. p-value ≈ 0.0005. Reject \\(H_0\\); strong evidence the drug lowers cholesterol.",
    },
    commonMistakes: [
      "Treating paired data as two independent samples.",
      "Wrong df.",
      "Not naming the procedure (two-sample t vs. paired t) in the write-up.",
    ],
  },
  "7.10": {
    id: "7.10",
    title: "Skew and Its Impact on Inference for Means",
    summary:
      "Heavy skew or outliers make the t-procedure unreliable for small samples. Check histograms/dotplots before trusting results.",
    lesson:
      "The t-procedure assumes approximately normal sampling distributions. For \\(n \\ge 30\\), CLT usually rescues us. For small \\(n\\), a strongly skewed population or outliers can make t-based p-values and CIs misleading.\n\nPractical rule from the AP materials:\n• \\(n < 15\\): only use t if the data are clearly symmetric with no outliers.\n• \\(15 \\le n < 30\\): OK if no strong skew or outliers.\n• \\(n \\ge 30\\): CLT kicks in; t is reliable even for non-normal populations, unless data are extremely skewed.\n\nOn FRQs, sketch or reference the histogram/boxplot and comment on shape. 'The dotplot of the sample is roughly symmetric with no outliers, so the t-procedure is appropriate despite n = 10.' Conversely: 'The sample is strongly right-skewed with n = 12, so the t-procedure may be unreliable.' Still proceed — the AP exam always wants you to finish — but flag the caveat.",
    keyIdeas: [
      "Small \\(n\\) + skew → t is unreliable.",
      "Use the sample's histogram/boxplot as evidence for/against normality.",
      "Comment explicitly on the shape in your write-up.",
      "Finish the procedure anyway; note any reservations.",
    ],
    commonMistakes: [
      "Running t on tiny skewed samples without comment.",
      "Claiming CLT 'works' for \\(n = 10\\) skewed data.",
      "Skipping the shape check entirely.",
    ],
  },

  // =========================================================================
  // UNIT 8 — INFERENCE FOR CATEGORICAL DATA: CHI-SQUARE
  // =========================================================================
  "8.1": {
    id: "8.1",
    title: "Introducing Statistics: Are My Results Unexpected?",
    summary:
      "Chi-square tests compare observed counts to expected counts. A big \\(\\chi^2\\) means big deviations from what the model predicts.",
    lesson:
      "Up to now, our categorical inference has been about proportions — one or two categories. Chi-square lets us test models with many categories at once.\n\nThree chi-square tests in Unit 8:\n• Goodness of Fit (GOF): does one categorical variable follow a claimed distribution? (e.g., is a die fair?).\n• Test for Homogeneity: do two or more populations have the same distribution across categories? (comparing several group distributions).\n• Test for Independence: are two categorical variables independent in one population?\n\nAll three use \\(\\chi^2 = \\sum (O - E)^2/E\\), summed over cells. Large \\(\\chi^2\\) → observed is far from expected → evidence against the null.",
    keyIdeas: [
      "\\(\\chi^2\\) compares observed to expected cell counts.",
      "GOF: one variable vs. claimed distribution.",
      "Homogeneity: same distribution across populations.",
      "Independence: two variables independent in one population.",
    ],
    commonMistakes: [
      "Using chi-square on quantitative data.",
      "Confusing homogeneity with independence — different sampling designs.",
      "Forgetting that expected counts must be at least 5.",
    ],
  },
  "8.2": {
    id: "8.2",
    title: "Setting Up a Chi-Square Goodness of Fit Test",
    summary:
      "\\(H_0\\): the distribution matches the claimed one. Compute expected counts \\(E_i = n \\cdot p_i\\) from the claim.",
    lesson:
      "Null hypothesis: 'the true distribution is the one claimed, with each category's probability equal to \\(p_i\\).' Alternative: 'the true distribution is not as claimed.' This is an omnibus test — it doesn't say which cell is off.\n\nExpected counts: for a total sample size of \\(n\\) and claimed probability \\(p_i\\), \\(E_i = n p_i\\). If the die is fair, \\(p_i = 1/6\\) for each face, so for \\(n = 120\\) rolls, \\(E_i = 20\\).\n\nConditions:\n• Random sample.\n• Each expected count \\(\\ge 5\\) (this replaces the 'Large Counts' from proportion tests).\n• 10% condition if sampling without replacement.\n\ndf = (number of categories) − 1.",
    keyIdeas: [
      "Expected count \\(E_i = n \\cdot p_i\\).",
      "All expected counts must be \\(\\ge 5\\).",
      "df = categories − 1.",
      "\\(H_a\\) is always 'not as claimed' — no directional alternative.",
    ],
    workedExample: {
      prompt:
        "A 6-sided die is rolled 120 times. Expected count if the die is fair?",
      solution:
        "\\(E_i = 120 \\cdot (1/6) = 20\\) for each face.",
    },
    commonMistakes: [
      "Using observed as expected (or vice versa).",
      "Skipping the expected-count check.",
      "Using df = categories instead of categories − 1.",
    ],
  },
  "8.3": {
    id: "8.3",
    title: "Carrying Out a Chi-Square Goodness of Fit Test",
    summary:
      "\\(\\chi^2 = \\sum (O - E)^2/E\\); compare to \\(\\chi^2\\) distribution with df = categories − 1.",
    lesson:
      "Compute each cell's \\((O_i - E_i)^2/E_i\\) and sum. Look up or compute the p-value using the chi-square distribution with df categories − 1. The p-value is always a right-tail probability (large \\(\\chi^2\\) means big discrepancy).\n\nOn the calculator: χ²cdf(χ²-statistic, 1E99, df).\n\nConclusion: compare p-value to \\(\\alpha\\). If reject, examine which cells contributed most to the statistic — look at \\((O - E)^2/E\\) per cell. That tells you WHERE the distribution deviates from the null, which is useful context in the FRQ conclusion.",
    keyIdeas: [
      "\\(\\chi^2\\) is always nonnegative; p-value is right-tail.",
      "df = categories − 1.",
      "Large contributor cells explain WHY the null is rejected.",
      "Include those cell-level details in your interpretation.",
    ],
    workedExample: {
      prompt:
        "120 die rolls give counts: 1→15, 2→20, 3→18, 4→22, 5→30, 6→15. Test whether fair.",
      solution:
        "Expected = 20 each. Contributions: (15−20)²/20=1.25, 0, 0.2, 0.2, 5, 1.25. Sum χ² = 7.9, df = 5. p-value = χ²cdf(7.9, 1E99, 5) ≈ 0.162. Fail to reject at 0.05. No convincing evidence the die is unfair (though 5's came up much more than expected).",
    },
    commonMistakes: [
      "Using \\(|O-E|\\) instead of \\((O-E)^2\\).",
      "Dividing by \\(O\\) instead of \\(E\\).",
      "Using a two-sided p-value (χ² is always right-tail).",
    ],
  },
  "8.4": {
    id: "8.4",
    title: "Expected Counts in Two-Way Tables",
    summary:
      "\\(E_{ij} = (\\text{row }i\\text{ total})(\\text{column }j\\text{ total})/(\\text{grand total})\\).",
    lesson:
      "For a two-way table in a homogeneity or independence test, compute expected counts under the null by:\n\\(E_{ij} = \\frac{\\text{row total}_i \\cdot \\text{column total}_j}{n}\\).\n\nIntuition for independence: under independence, \\(P(\\text{row}_i \\cap \\text{col}_j) = P(\\text{row}_i) \\cdot P(\\text{col}_j)\\). Multiply those proportions by \\(n\\) to get the expected count. Same formula works for homogeneity.\n\nFor a 2x3 table, compute six expected counts. Check each is \\(\\ge 5\\). df = \\((\\text{rows} - 1)(\\text{cols} - 1)\\).",
    keyIdeas: [
      "\\(E_{ij} = (\\text{row}_i)(\\text{col}_j)/n\\).",
      "df = (rows − 1)(cols − 1).",
      "All expected counts \\(\\ge 5\\).",
      "Same computation for homogeneity and independence.",
    ],
    workedExample: {
      prompt:
        "2x2 table: row totals (40, 60), column totals (50, 50), grand total 100. Find \\(E_{11}\\).",
      solution:
        "\\(E_{11} = 40 \\cdot 50/100 = 20\\).",
    },
    commonMistakes: [
      "Using (row total × column total) without dividing by \\(n\\).",
      "Computing df as rows × cols.",
      "Skipping the expected-count check, especially in sparse tables.",
    ],
  },
  "8.5": {
    id: "8.5",
    title: "Setting Up a Chi-Square Test for Homogeneity or Independence",
    summary:
      "Homogeneity compares one variable across several populations (separate random samples). Independence tests two variables in one population.",
    lesson:
      "Same computation, different framing and sampling:\n\n• Chi-square test of homogeneity. \\(H_0\\): distribution of variable \\(X\\) is the same across all populations. \\(H_a\\): at least one differs. Sample size is fixed within each population (one SRS per group).\n\n• Chi-square test of independence. \\(H_0\\): two variables \\(X, Y\\) are independent. \\(H_a\\): they are associated. One SRS from one population; classify by both variables.\n\nOn the AP exam, choosing between them depends on the study design. Two SRSs from two populations → homogeneity. One SRS from one population classified in two ways → independence. The formula and df are the same, only the interpretation changes.",
    keyIdeas: [
      "Homogeneity: several populations, one variable each.",
      "Independence: one population, two variables.",
      "Sampling design chooses which test.",
      "Same \\(\\chi^2\\) formula and df.",
    ],
    commonMistakes: [
      "Calling it 'independence' when two separate SRSs were taken.",
      "Mixing up hypotheses (homogeneity is about equal distributions, not independence).",
      "Forgetting to state the test name explicitly.",
    ],
  },
  "8.6": {
    id: "8.6",
    title: "Carrying Out a Chi-Square Test for Homogeneity or Independence",
    summary:
      "Compute \\(\\chi^2 = \\sum (O - E)^2/E\\); df = \\((r-1)(c-1)\\); p-value from right tail.",
    lesson:
      "Mechanics: compute expected counts (8.4), compute each \\((O-E)^2/E\\), sum to get \\(\\chi^2\\). df = \\((r-1)(c-1)\\). p-value from the χ² distribution.\n\nConditions: random sample(s); expected counts all \\(\\ge 5\\); 10% condition if without replacement.\n\nConclusion template: 'Because p-value (X) < α, we reject \\(H_0\\). We have convincing evidence of [difference across groups / association between variables] in context.' If rejecting, comment on which cells had the biggest contributions.",
    keyIdeas: [
      "\\(\\chi^2\\) right-tailed, same formula for both tests.",
      "Interpretation depends on test: 'distributions differ' vs. 'variables associated.'",
      "Cell contributions diagnose the source of rejection.",
      "Match wording to the test (homogeneity vs. independence).",
    ],
    workedExample: {
      prompt:
        "2x2 table with O = {30, 20; 10, 40}. Row totals 50, 50; col totals 40, 60; total 100. Test independence at α = 0.05.",
      solution:
        "E = {20, 30; 20, 30}. Contributions: 5, 3.33, 5, 3.33. χ² = 16.67, df = 1. p-value ≈ 0.00004. Reject H₀. Strong evidence the two variables are associated.",
    },
    commonMistakes: [
      "Using df = r·c.",
      "Not distinguishing language between homogeneity and independence.",
      "Skipping the expected-count check.",
    ],
  },
  "8.7": {
    id: "8.7",
    title: "Skills Focus: Selecting an Appropriate Inference Procedure for Categorical Data",
    summary:
      "Pick the correct procedure: one-proportion z, two-proportion z, chi-square (GOF, homogeneity, independence). Design determines which.",
    lesson:
      "Categorical inference flowchart:\n\n1. One population, one variable with two categories → one-proportion z-test or interval.\n2. Two populations, one variable with two categories → two-proportion z.\n3. One population, one variable with more than two categories → chi-square GOF.\n4. Multiple populations, one variable with any number of categories → chi-square test of homogeneity.\n5. One population, two variables → chi-square test of independence.\n\nGraders give NO partial credit for the wrong test — pick carefully. Cue words in the problem: 'claim about a specific distribution' → GOF; 'compare across groups' → homogeneity; 'related' or 'associated' → independence; 'proportion is different from [value]' → one-proportion z.",
    keyIdeas: [
      "Two categories + one population → 1-prop z.",
      "Two categories + two populations → 2-prop z.",
      "Multiple categories + one population, compare to claimed dist → GOF.",
      "Multiple populations OR two variables in one population → χ² (homogeneity or independence).",
    ],
    commonMistakes: [
      "Running GOF on two-way table data.",
      "Using chi-square on 2×2 data with a directional alternative (two-proportion z is better).",
      "Choosing independence when the design was separate SRSs (should be homogeneity).",
    ],
  },

  // =========================================================================
  // UNIT 9 — INFERENCE FOR QUANTITATIVE DATA: SLOPES
  // =========================================================================
  "9.1": {
    id: "9.1",
    title: "Introducing Statistics: Do Those Points Align?",
    summary:
      "Unit 9 does inference on the slope \\(\\beta\\) of a linear regression. Is there a real linear relationship in the population?",
    lesson:
      "Back to Unit 2. The least-squares slope \\(b\\) is a statistic; the true population slope \\(\\beta\\) is the parameter we want to infer. If \\(\\beta = 0\\), there's no linear relationship between \\(x\\) and \\(y\\) in the population.\n\nThe sampling distribution of \\(b\\) is approximately \\(N(\\beta, \\sigma_b)\\) where \\(\\sigma_b\\) depends on the residual variability and the spread of \\(x\\). Under the regression conditions, \\((b - \\beta)/SE_b \\sim t_{n-2}\\).\n\nSo we can build CIs for \\(\\beta\\) and test \\(H_0: \\beta = 0\\). Conditions below get an acronym: LINER.",
    keyIdeas: [
      "\\(b\\) is a statistic; \\(\\beta\\) is the population slope.",
      "\\(b\\) is approximately \\(N(\\beta, \\sigma_b)\\).",
      "Test statistic: \\((b - \\beta_0)/SE_b \\sim t_{n-2}\\).",
      "Under \\(H_0: \\beta = 0\\), \\(x\\) has no linear effect on \\(y\\).",
    ],
    commonMistakes: [
      "Confusing \\(b\\) and \\(\\beta\\) — the exam will not forgive this.",
      "Using \\(df = n - 1\\) instead of \\(n - 2\\).",
      "Testing \\(H_0: r = 0\\) when we really mean \\(\\beta = 0\\) (they're equivalent but the parameter is the slope).",
    ],
  },
  "9.2": {
    id: "9.2",
    title: "Confidence Intervals for the Slope of a Regression Model",
    summary:
      "CI for \\(\\beta\\): \\(b \\pm t^* \\cdot SE_b\\), with \\(df = n - 2\\).",
    lesson:
      "A level-\\(C\\) CI for \\(\\beta\\) is \\(b \\pm t^* SE_b\\), where \\(SE_b\\) usually comes from computer output. Look for the 'SE Coef' column in the slope row of Minitab-style tables.\n\nConditions (LINER):\n• L — Linear: scatterplot shows linear pattern (no curvature in residual plot).\n• I — Independent observations; 10% condition.\n• N — Normal: residuals approximately normal (histogram or normal probability plot).\n• E — Equal variance: residual plot shows roughly constant spread (no fanning).\n• R — Random sample or random assignment.\n\nThe interval gives the range of plausible true slopes. Interpret: 'I am 95% confident that the true slope is between [low] and [high] [y-units per x-unit].' Always include units.",
    keyIdeas: [
      "CI: \\(b \\pm t^* SE_b\\), \\(df = n - 2\\).",
      "LINER conditions must be verified.",
      "SE_b comes from output, not a formula you compute.",
      "Interpretation uses y-per-x units (e.g., 'points per hour of study').",
    ],
    workedExample: {
      prompt:
        "Output gives slope \\(b = 8.1\\), \\(SE_b = 0.9\\), \\(n = 20\\). 95% CI for \\(\\beta\\).",
      solution:
        "df = 18, \\(t^* \\approx 2.101\\). ME = 2.101 · 0.9 ≈ 1.89. CI: (6.21, 9.99) points per hour.",
    },
    commonMistakes: [
      "Using \\(df = n - 1\\) instead of \\(n - 2\\).",
      "Omitting units in the interpretation.",
      "Treating \\(SE_b\\) as if it were the SE of the residuals.",
    ],
  },
  "9.3": {
    id: "9.3",
    title: "Justifying a Claim About the Slope of a Regression Model",
    summary:
      "If 0 is in the CI for \\(\\beta\\), no evidence of a linear relationship; if outside, there is evidence of one, in the sign of the interval.",
    lesson:
      "Because \\(\\beta = 0\\) means 'no linear relationship,' checking whether 0 is in the CI for \\(\\beta\\) tells us whether the data provide evidence of a linear association.\n\n'CI: (0.3, 2.1) points per hour. 0 is outside the interval, so we have evidence of a positive linear relationship between hours studied and score.' Conversely: 'CI: (−0.2, 1.5). 0 is inside, so no conclusive evidence of a linear relationship at this confidence level.'\n\nPractical vs. statistical significance still applies: a CI of (0.01, 0.03) excludes 0 but the effect is tiny.",
    keyIdeas: [
      "0 in CI → no evidence of linear relationship.",
      "0 outside → evidence in the direction of the interval.",
      "Units matter for practical interpretation.",
      "CI ↔ two-sided test at \\(\\alpha = 1 - C\\).",
    ],
    commonMistakes: [
      "Reporting 'no relationship' when really 'no linear relationship.'",
      "Mixing up the signs when the interval straddles zero.",
      "Ignoring magnitude entirely.",
    ],
  },
  "9.4": {
    id: "9.4",
    title: "Setting Up a Test for the Slope of a Regression Model",
    summary:
      "\\(H_0: \\beta = 0\\) vs. \\(H_a\\); t-test on slope with \\(df = n - 2\\).",
    lesson:
      "Hypotheses: \\(H_0: \\beta = 0\\) vs. \\(H_a: \\beta > 0\\), \\(< 0\\), or \\(\\ne 0\\). Define \\(\\beta\\) in context as the true slope of the least-squares regression model relating [response] to [predictor].\n\nConditions: LINER (as in 9.2). State each with evidence — scatterplot for L, residual plot for L and E, normal plot or histogram of residuals for N, sampling/assignment for R, sample size for I's 10% condition.\n\nMost AP problems come with computer output. The t-ratio for the slope row IS the test statistic for \\(H_0: \\beta = 0\\). The printed p-value is for the two-sided test. For a one-sided \\(H_a\\), halve the reported p-value.",
    keyIdeas: [
      "\\(H_0: \\beta = 0\\).",
      "df = \\(n - 2\\).",
      "LINER conditions, verified explicitly.",
      "Printed p-value is two-sided; halve for one-sided.",
    ],
    commonMistakes: [
      "Writing \\(H_0: b = 0\\) instead of \\(\\beta = 0\\).",
      "Skipping or mislabeling LINER conditions.",
      "Using the full two-sided p-value for a one-sided test.",
    ],
  },
  "9.5": {
    id: "9.5",
    title: "Carrying Out a Test for the Slope of a Regression Model",
    summary:
      "\\(t = (b - 0)/SE_b\\), df = \\(n - 2\\). Compare p-value to \\(\\alpha\\); conclude in context.",
    lesson:
      "Test statistic \\(t = b/SE_b\\). p-value from \\(t_{n-2}\\), matching \\(H_a\\). Read it off the output or compute with tcdf.\n\nTypical conclusion: 'Because the p-value (X) is less than α (Y), we reject \\(H_0\\). We have convincing evidence of a [positive/negative/non-zero] linear relationship between [predictor] and [response] in the population.'\n\nRemember: rejecting \\(\\beta = 0\\) means there is a linear relationship, not necessarily a causal one. Causation requires experimental design (Unit 3). State the relationship in context, not as generic 'X affects Y.'",
    keyIdeas: [
      "\\(t = b/SE_b\\), df = \\(n - 2\\).",
      "Use printed p-value from output; halve if one-sided.",
      "Rejection concludes linear relationship, not causation.",
      "Always in context.",
    ],
    workedExample: {
      prompt:
        "Output: b = 8.1, SE_b = 0.9, n = 20. Test \\(H_0: \\beta = 0\\) vs. \\(\\beta > 0\\) at α = 0.05.",
      solution:
        "\\(t = 9.0\\), df = 18. One-sided p-value ≈ 0 (much less than 0.001). Reject \\(H_0\\). Very strong evidence of a positive linear relationship between hours studied and score.",
    },
    commonMistakes: [
      "Not halving the two-sided p-value for a one-sided alternative.",
      "Concluding causation from an observational regression.",
      "Omitting the direction of the relationship in the conclusion.",
    ],
  },
  "9.6": {
    id: "9.6",
    title: "Skills Focus: Selecting an Appropriate Inference Procedure",
    summary:
      "Across all units: pick the right test/interval by identifying the parameter, the design, and the variable types.",
    lesson:
      "A unifying decision tree for the AP exam:\n\n• Quantitative variable, one population: t-interval / t-test for \\(\\mu\\).\n• Quantitative, two populations (independent): two-sample t.\n• Quantitative, paired: paired t (= one-sample t on differences).\n• Categorical, one population, 2 categories: one-proportion z.\n• Categorical, two populations, 2 categories: two-proportion z.\n• Categorical, one population, >2 categories, claimed distribution: chi-square GOF.\n• Categorical, several populations: chi-square homogeneity.\n• Categorical, one population, two categorical variables: chi-square independence.\n• Two quantitative variables, linear relationship: t-test for slope.\n\nReading an AP FRQ: (1) identify variables and their types, (2) count populations/samples, (3) note whether data are paired, (4) note the claim. Write out the procedure name before computing anything. That one line earns you 'plan' points even if you botch arithmetic later.",
    keyIdeas: [
      "Categorical vs. quantitative → z vs. t (or χ²).",
      "Number of populations → one-sample vs. two-sample.",
      "Paired vs. independent → paired t vs. two-sample t.",
      "State the procedure name explicitly — it's worth credit on its own.",
    ],
    commonMistakes: [
      "Skipping the 'name the procedure' step.",
      "Using two-sample t on paired data.",
      "Confusing homogeneity with independence.",
    ],
  },
};
