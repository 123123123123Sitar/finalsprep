import type { CourseCedLessons } from "./types";

/**
 * AP Statistics CED lessons, keyed by topic id (e.g. "1.1", "6.11").
 * Voice: terse, peer-to-peer, exam-focused. CED vocabulary is emphasized:
 * "random sampling generalizes, random assignment establishes causation,"
 * "we are 95% confident that the true proportion...," etc.
 */

export const AP_STATISTICS_CED_LESSONS: CourseCedLessons = {
  "1.1": {
    id: "1.1",
    title: "Introducing Statistics: What Can We Learn from Data?",
    summary:
      "Statistics is the science of learning from data. We use samples to estimate population characteristics and quantify the uncertainty in our estimates.",
    lesson:
      "Statistics lets you make decisions when you don't have the whole picture. You observe an individual or a small sample, then use those observations to say something about the larger population. The catch: any two samples will differ, so every conclusion you make needs a margin of uncertainty attached.\n\nKnow the core vocabulary cold. An \\(\\textit{individual}\\) is a single object or person on which we measure something. A \\(\\textit{variable}\\) is that measured characteristic. The \\(\\textit{population}\\) is the entire group we care about; the \\(\\textit{sample}\\) is the subset we actually measure. A \\(\\textit{parameter}\\) is a number describing the population (like \\(\\mu\\) or \\(p\\)). A \\(\\textit{statistic}\\) is the corresponding number from a sample (like \\(\\bar x\\) or \\(\\hat p\\)). Parameters are fixed but usually unknown; statistics change sample to sample.\n\nThe AP exam is really a year-long course on how those sample-to-sample changes behave, and how to use them to make claims about populations. Every unit feeds into one of three big exam skills: describing data, designing studies, and drawing inferences.",
    keyIdeas: [
      "Individual vs variable: who/what you're measuring vs what you measure.",
      "Population vs sample: whole group vs observed subset.",
      "Parameter vs statistic: population number (fixed) vs sample number (varies).",
      "Statistics is about quantifying uncertainty, not just computing numbers.",
    ],
    workedExample: {
      prompt:
        "A researcher randomly selects 200 registered voters in Ohio and asks if they plan to vote in the next election. 124 say yes. Identify the individual, variable, population, parameter, and statistic.",
      solution:
        "Individual: each registered voter selected. Variable: whether the voter plans to vote (categorical: yes/no). Population: all registered voters in Ohio. Parameter: \\(p\\), the true proportion of Ohio registered voters who plan to vote. Statistic: \\(\\hat p = 124/200 = 0.62\\), the sample proportion who plan to vote.",
    },
    flashcards: [
      { q: "Parameter vs statistic?", a: "Parameter describes the population (e.g. \\(\\mu, p\\)); statistic describes a sample (e.g. \\(\\bar x, \\hat p\\))." },
      { q: "What's an individual in a stats problem?", a: "A single object or person on whom a variable is measured." },
      { q: "Why does a sample statistic change across samples?", a: "Sampling variability: each random sample picks up different individuals." },
    ],
    commonMistakes: [
      "Calling a sample proportion \\(p\\) instead of \\(\\hat p\\).",
      "Saying the population is the sample you collected.",
      "Forgetting that parameters are fixed; only statistics vary.",
    ],
    quiz: [
      {
        q: "Which of the following is a parameter?",
        choices: ["\\(\\bar x\\) for a class of 30 students", "\\(\\hat p\\) from a poll of 500 adults", "The mean height \\(\\mu\\) of all adults in the U.S.", "The standard deviation \\(s\\) of a random sample"],
        answerIndex: 2,
        explanation: "A parameter describes a population; \\(\\mu\\) for all U.S. adults qualifies. The others are sample statistics.",
      },
      {
        q: "A quality-control inspector measures the length of 50 randomly chosen bolts from a shipment of 10,000. What is the population?",
        choices: ["The 50 bolts measured", "The 10,000 bolts in the shipment", "All bolts ever made by the manufacturer", "The inspector's measurements"],
        answerIndex: 1,
        explanation: "The population is the full group we want to learn about — the 10,000-bolt shipment.",
      },
      {
        q: "In a study of a new medication, researchers report \\(\\bar x = 7.2\\) hours of sleep for 40 participants. The value 7.2 is best described as:",
        choices: ["A parameter", "A statistic", "An individual", "A variable"],
        answerIndex: 1,
        explanation: "It's a sample mean — a number from a sample, so it's a statistic.",
      },
      {
        q: "Which statement is TRUE about statistics and parameters?",
        choices: ["Statistics are fixed; parameters vary from sample to sample.", "Parameters are fixed but usually unknown; statistics vary from sample to sample.", "Both vary from sample to sample.", "Both are fixed and known."],
        answerIndex: 1,
        explanation: "Parameters describe the population — fixed but often unknown. Statistics are computed from samples and change each time.",
      },
    ],
  },

  "1.2": {
    id: "1.2",
    title: "The Language of Variation: Variables",
    summary:
      "Variables come in two flavors: categorical (labels/groups) and quantitative (numbers you can meaningfully average). Quantitative further splits into discrete and continuous.",
    lesson:
      "Every stats problem starts by classifying the variable. A \\(\\textit{categorical}\\) variable puts an individual into a group — eye color, political party, yes/no on a survey. Even if you code categories with numbers (1 = male, 2 = female), the variable is still categorical because the numbers are just labels.\n\nA \\(\\textit{quantitative}\\) variable records a numerical measurement where arithmetic makes sense: height, test score, temperature, number of siblings. You can compute a mean for a quantitative variable; you cannot for a categorical one.\n\nQuantitative variables break further into \\(\\textit{discrete}\\) (countable values, usually whole numbers — number of kids, goals scored) and \\(\\textit{continuous}\\) (any value in an interval — height, time, weight). Continuous doesn't mean decimals on a calculator; it means there is no next value.\n\nWhy it matters for the exam: the type of variable dictates what graph to use and what inference procedure to run. Categorical goes with tables, bar charts, proportions, chi-square. Quantitative goes with dotplots/histograms, means, t-tests. Misclassify the variable and you'll pick the wrong tool every time.",
    keyIdeas: [
      "Categorical = labels (even if coded as numbers).",
      "Quantitative = numerical measurements where \\(+\\), \\(-\\), mean all make sense.",
      "Discrete is countable; continuous has no next value.",
      "Variable type determines graph choice and inference test.",
    ],
    workedExample: {
      prompt:
        "Classify each variable as categorical or quantitative (and if quantitative, discrete or continuous): (a) zip code, (b) number of texts sent yesterday, (c) body temperature, (d) favorite ice cream flavor.",
      solution:
        "(a) Categorical — digits don't measure anything. (b) Quantitative discrete — countable. (c) Quantitative continuous — any value in a range. (d) Categorical — flavor labels.",
    },
    flashcards: [
      { q: "Is a student ID number categorical or quantitative?", a: "Categorical — it's a label, not a measurement." },
      { q: "Discrete vs continuous quantitative?", a: "Discrete = countable (integers usually); continuous = any value in an interval." },
      { q: "Can you compute a mean of a categorical variable?", a: "No. Means only make sense for quantitative data." },
    ],
    commonMistakes: [
      "Treating numeric codes (e.g. 1 = yes, 0 = no) as quantitative.",
      "Calling something discrete just because it's reported to the nearest whole number.",
      "Confusing quantitative with continuous — number of pets is quantitative but discrete.",
    ],
    quiz: [
      {
        q: "Which variable is categorical?",
        choices: ["Heart rate (bpm)", "Shirt size (S/M/L/XL)", "Height in inches", "Time to run a mile"],
        answerIndex: 1,
        explanation: "Shirt size labels a category even though there's an ordering — it is not a measurement.",
      },
      {
        q: "The number of cars that pass through an intersection in an hour is:",
        choices: ["Categorical", "Quantitative discrete", "Quantitative continuous", "Not a variable"],
        answerIndex: 1,
        explanation: "Counts of cars are integers — quantitative and discrete.",
      },
      {
        q: "A survey records ZIP codes as 5-digit numbers. ZIP code is:",
        choices: ["Quantitative continuous", "Quantitative discrete", "Categorical", "Both categorical and quantitative"],
        answerIndex: 2,
        explanation: "ZIPs are location labels; arithmetic on them is meaningless, so they are categorical.",
      },
      {
        q: "Which of the following is a continuous quantitative variable?",
        choices: ["Eye color", "Number of siblings", "Weight of a newborn", "Letter grade (A, B, C)"],
        answerIndex: 2,
        explanation: "Weight can take any value in an interval — continuous quantitative.",
      },
    ],
  },

  "1.3": {
    id: "1.3",
    title: "Representing a Categorical Variable with Tables",
    summary:
      "Frequency tables count how many individuals fall into each category; relative frequency tables report those counts as proportions or percents.",
    lesson:
      "For a categorical variable, the simplest summary is a \\(\\textit{frequency table}\\): list each category and the count of individuals in it. To compare across groups of different sizes, convert to \\(\\textit{relative frequencies}\\) by dividing each count by the total. Relative frequencies are proportions between 0 and 1 (or percents between 0% and 100%).\n\nAll relative frequencies for a variable sum to 1 (or 100%). If yours don't, you miscounted or forgot a category. Always verify with a quick sum.\n\nOn the exam, reading tables accurately is the whole battle. Label rows and columns, include totals, and state whether the entry is a count or a proportion. When interpreting, swap in the context: \"About 62% of the surveyed voters plan to vote,\" not just \"0.62.\"",
    keyIdeas: [
      "Frequency = count; relative frequency = count / total.",
      "Relative frequencies sum to 1 (or 100%).",
      "Use relative frequencies to compare groups with different totals.",
      "Always write interpretations in context with units or the category name.",
    ],
    workedExample: {
      prompt:
        "A college surveys 400 students about class year: 120 freshmen, 100 sophomores, 90 juniors, 90 seniors. Build the relative frequency table.",
      solution:
        "Freshmen: \\(120/400 = 0.30\\). Sophomores: \\(100/400 = 0.25\\). Juniors: \\(90/400 = 0.225\\). Seniors: \\(90/400 = 0.225\\). Total: 1.00. Interpretation: 30% of surveyed students are freshmen, etc.",
    },
    flashcards: [
      { q: "Definition of relative frequency?", a: "Count in a category divided by the total count." },
      { q: "Why use relative frequency instead of raw counts?", a: "So you can compare across groups of different sizes." },
      { q: "What should all relative frequencies sum to?", a: "1 (or 100% if expressed as percents)." },
    ],
    commonMistakes: [
      "Forgetting to divide by the grand total.",
      "Reporting counts when the question asked for a proportion.",
      "Rounding each category before summing so the total misses 100%.",
    ],
    quiz: [
      {
        q: "A class of 25 students has 10 freshmen. The relative frequency of freshmen is:",
        choices: ["10", "0.25", "0.40", "2.5"],
        answerIndex: 2,
        explanation: "\\(10/25 = 0.40\\).",
      },
      {
        q: "Which statement about a relative frequency table is TRUE?",
        choices: ["All entries are between 0 and 1 and sum to 1.", "All entries are counts.", "Entries can exceed 1 if the sample is large.", "Entries always sum to the sample size."],
        answerIndex: 0,
        explanation: "Relative frequencies are proportions summing to 1.",
      },
      {
        q: "When is relative frequency preferred over raw counts?",
        choices: ["When comparing two groups with different sample sizes", "When the sample is very small", "When data are quantitative", "Only in inference"],
        answerIndex: 0,
        explanation: "Proportions normalize for different sample sizes, enabling fair comparison.",
      },
      {
        q: "A table of 100 observations reports percents: A 25%, B 40%, C 20%, D 20%. What's wrong?",
        choices: ["Nothing — it looks fine.", "Percents sum to 105%, so a mistake was made.", "Cannot have four categories.", "Percents should be counts."],
        answerIndex: 1,
        explanation: "25+40+20+20 = 105%, which exceeds 100% — a counting or rounding error.",
      },
    ],
  },

  "1.4": {
    id: "1.4",
    title: "Representing a Categorical Variable with Graphs",
    summary:
      "Bar charts, pie charts, and segmented bar charts display categorical data. Bar charts compare counts across categories; pie charts emphasize share of a whole.",
    lesson:
      "For a single categorical variable, the go-to display is a \\(\\textit{bar chart}\\): one bar per category, height = frequency or relative frequency. Bars have gaps between them because the categories are distinct. Order categories logically (alphabetical, by size, or by natural order).\n\nA \\(\\textit{pie chart}\\) slices a circle into pieces proportional to each category's relative frequency. Pie charts look nice but are hard to read accurately — humans judge lengths better than angles. On the exam, stick to bar charts unless the prompt specifically asks for pie.\n\nA \\(\\textit{segmented (stacked) bar chart}\\) shows one bar per group, with the bar partitioned by category. Useful for comparing the distribution of a categorical variable across two or more groups side by side.\n\nWhen describing a categorical graph, state (1) which category has the largest share, (2) which has the smallest, and (3) any striking differences between groups, always in context.",
    keyIdeas: [
      "Bar chart: one bar per category, gaps between bars.",
      "Pie chart: slices proportional to relative frequency.",
      "Segmented bar: one bar per group, partitioned by category — great for comparisons.",
      "Describe the largest/smallest categories in context.",
    ],
    workedExample: {
      prompt:
        "Given relative frequencies A: 40%, B: 30%, C: 20%, D: 10%, describe the distribution.",
      solution:
        "Category A has the largest share (40%). Category D has the smallest (10%). The distribution is unbalanced: A is four times D. In a bar chart, A's bar is tallest, decreasing through D.",
    },
    flashcards: [
      { q: "Why do bars in a bar chart have gaps?", a: "Because categories are discrete — there's no continuum between them." },
      { q: "When is a segmented bar chart useful?", a: "Comparing the category distribution across two or more groups." },
      { q: "Best way to compare proportions visually?", a: "Bar chart of relative frequencies — easier to read than pie." },
    ],
    commonMistakes: [
      "Using a histogram (no gaps) for categorical data.",
      "Comparing raw counts across groups of different sizes instead of proportions.",
      "Describing a bar chart without naming a single category.",
    ],
    quiz: [
      {
        q: "Which display is most appropriate for a single categorical variable?",
        choices: ["Histogram", "Bar chart", "Boxplot", "Scatterplot"],
        answerIndex: 1,
        explanation: "Bar charts are designed for categorical variables; histograms are for quantitative data.",
      },
      {
        q: "You want to compare the distribution of preferred soda (Coke/Pepsi/Sprite) across high school and college students. Best graph?",
        choices: ["Two pie charts", "Side-by-side (segmented) bar chart of relative frequencies", "Scatterplot", "Dotplot"],
        answerIndex: 1,
        explanation: "Segmented bar charts of relative frequencies allow direct comparison across groups.",
      },
      {
        q: "In a pie chart, the size of each slice is proportional to:",
        choices: ["The category's raw count only", "The relative frequency of the category", "The number of categories", "The variable's standard deviation"],
        answerIndex: 1,
        explanation: "Slice angle/area reflects the category's share (relative frequency).",
      },
      {
        q: "A bar chart shows the vote counts from two cities. City A has 2000 voters and City B has 500 voters. Comparing raw count bars will:",
        choices: ["Be fair since counts are always comparable.", "Be misleading because the cities have different totals — use relative frequencies.", "Always favor the smaller city.", "Always favor the larger city's minority category."],
        answerIndex: 1,
        explanation: "Different totals mean raw counts mislead; convert to proportions/percents for fair comparison.",
      },
    ],
  },

  "1.5": {
    id: "1.5",
    title: "Representing a Quantitative Variable with Graphs",
    summary:
      "Dotplots, stemplots, and histograms display the distribution of a quantitative variable. Each shape gives a visual sense of center, spread, and skew.",
    lesson:
      "For quantitative data, you have three main displays. A \\(\\textit{dotplot}\\) stacks a dot over each value on a number line — great for small data sets. A \\(\\textit{stemplot}\\) (stem-and-leaf) splits each value into a stem (all but last digit) and a leaf (last digit); it preserves the actual data while showing shape. A \\(\\textit{histogram}\\) bins values into intervals and draws a bar of height equal to frequency (or relative frequency) for each bin.\n\nBars in a histogram touch because the underlying variable is continuous — no gaps between intervals. Choice of bin width matters: too wide loses detail, too narrow creates noise.\n\nWhen you see any quantitative graph, scan for shape (symmetric? skewed right? skewed left? unimodal or multimodal?), center (where is the bulk?), variability (tight or spread out?), and outliers (any points far from the rest?). This is SOCS — or officially on the CED, \\(\\textit{shape, center, variability}\\) — the description template that appears on nearly every FRQ.",
    keyIdeas: [
      "Dotplots: one dot per value; best for small \\(n\\).",
      "Stemplots: preserve data while showing shape.",
      "Histograms: binned bars, bars touch because data are continuous.",
      "Always describe shape, center, variability, and outliers in context.",
    ],
    workedExample: {
      prompt:
        "A histogram of daily high temperatures in July is unimodal, roughly symmetric, centered near 85°F, ranging from 75°F to 95°F, with no apparent outliers. Write a one-sentence description.",
      solution:
        "The distribution of July daily highs is roughly symmetric and unimodal, centered near 85°F with a range of 75-95°F, showing no apparent outliers.",
    },
    flashcards: [
      { q: "Why do histogram bars touch?", a: "Because the variable is continuous — adjacent bins share boundaries." },
      { q: "What does SOCS stand for?", a: "Shape, Outliers, Center, Spread — a description template (CED prefers shape/center/variability)." },
      { q: "Which is better for small \\(n\\): dotplot or histogram?", a: "Dotplot — you can see every value." },
    ],
    commonMistakes: [
      "Forgetting to include units when describing center or spread.",
      "Calling a symmetric bell-curve-ish histogram \"normal\" without checking.",
      "Describing only center and missing shape or spread.",
    ],
    quiz: [
      {
        q: "Which display is best for 15 individual test scores?",
        choices: ["Histogram with 3 bins", "Dotplot", "Pie chart", "Bar chart"],
        answerIndex: 1,
        explanation: "A dotplot preserves each of the 15 values, which is ideal for small data sets.",
      },
      {
        q: "A histogram of income is heavily skewed right with a long tail. Which best describes the distribution?",
        choices: ["Symmetric and unimodal", "Skewed right — most values clustered low with a few high outliers", "Skewed left", "Uniform"],
        answerIndex: 1,
        explanation: "Right-skew means a long tail on the right side; mass is on the left.",
      },
      {
        q: "You want to show the actual raw data values while still seeing shape. Best display?",
        choices: ["Histogram", "Stemplot", "Pie chart", "Boxplot"],
        answerIndex: 1,
        explanation: "Stemplots retain individual values while revealing distribution shape.",
      },
      {
        q: "In a histogram with equal bin widths, the height of a bar tells you:",
        choices: ["The mean of the bin", "The frequency (count) of values in that bin", "The width of the bin", "The category label"],
        answerIndex: 1,
        explanation: "Bar height represents the count (or relative frequency) of values in that interval.",
      },
    ],
  },

  "1.6": {
    id: "1.6",
    title: "Describing the Distribution of a Quantitative Variable",
    summary:
      "Every FRQ description of a quantitative distribution hits shape, center, variability, and outliers, always in context.",
    lesson:
      "The CED rubric for describing a quantitative distribution is locked in: \\(\\textbf{shape, center, variability}\\), plus a note about any \\(\\textit{outliers}\\). Memorize this order — graders read for it.\n\n\\(\\textbf{Shape}\\): Is the distribution symmetric, skewed right (long right tail), or skewed left (long left tail)? Is it unimodal (one peak), bimodal (two peaks), or multimodal? Uniform?\n\n\\(\\textbf{Center}\\): Give an approximate mean or median. For skewed or outlier-heavy data, report the median, since it resists outliers.\n\n\\(\\textbf{Variability}\\) (spread): Report the range (max − min), the IQR (\\(Q_3 - Q_1\\)), or the standard deviation. Use IQR with skewed data.\n\n\\(\\textbf{Outliers}\\): Flag any values far from the bulk. Formally, any value below \\(Q_1 - 1.5\\cdot \\text{IQR}\\) or above \\(Q_3 + 1.5\\cdot \\text{IQR}\\) is an outlier by the 1.5·IQR rule.\n\nAlways describe in context — name the variable, include units, and connect to the real-world scenario.",
    keyIdeas: [
      "SCV order: shape, center, variability (plus outliers).",
      "Skewed right: tail on the right; skewed left: tail on the left.",
      "Median and IQR are resistant to outliers; mean and SD are not.",
      "Always describe in context with units.",
    ],
    workedExample: {
      prompt:
        "A histogram of house prices in a neighborhood is strongly skewed right, with most homes between $200k and $400k but a few near $1.5M. Describe the distribution.",
      solution:
        "The distribution of house prices is skewed right and unimodal, centered around a median of roughly $300k (mean pulled higher by the high-price homes). The bulk of prices lies between $200k and $400k; variability is large, with a range exceeding $1M. A few homes near $1.5M appear as high outliers.",
    },
    flashcards: [
      { q: "Which two summary measures are resistant to outliers?", a: "Median and IQR." },
      { q: "What does right skew imply about mean vs median?", a: "Mean is pulled right, so mean > median." },
      { q: "Variables to hit in every distribution description?", a: "Shape, center, variability, outliers — in context." },
    ],
    commonMistakes: [
      "Reporting just the mean with no comment on shape.",
      "Calling a distribution \"normal\" based on one histogram without justification.",
      "Leaving units off center/spread values on FRQs.",
    ],
    quiz: [
      {
        q: "A distribution has a long tail on the left. It is:",
        choices: ["Skewed right", "Skewed left", "Symmetric", "Bimodal"],
        answerIndex: 1,
        explanation: "Left-skew = tail on the left; values trail off toward smaller numbers.",
      },
      {
        q: "For a distribution of incomes with strong right skew, which center is most appropriate?",
        choices: ["Mean", "Median", "Mode", "Range"],
        answerIndex: 1,
        explanation: "Median resists the pull of high-income outliers; mean does not.",
      },
      {
        q: "Which statistic measures variability and is resistant to outliers?",
        choices: ["Mean", "Standard deviation", "IQR", "Range"],
        answerIndex: 2,
        explanation: "IQR uses the middle 50% of data; outliers in the tails don't affect it.",
      },
      {
        q: "A histogram shows two distinct peaks. You should describe the shape as:",
        choices: ["Unimodal", "Bimodal", "Skewed right", "Symmetric"],
        answerIndex: 1,
        explanation: "Two peaks = bimodal. Could hint at two subpopulations mixed together.",
      },
    ],
  },

  "1.7": {
    id: "1.7",
    title: "Summary Statistics for a Quantitative Variable",
    summary:
      "Mean, median, quartiles, IQR, range, and standard deviation summarize the center and spread of quantitative data. Some resist outliers; others don't.",
    lesson:
      "The \\(\\textit{mean}\\) \\(\\bar x = \\sum x_i / n\\) is the arithmetic average. The \\(\\textit{median}\\) is the middle value when data are ordered (average of the two middles if \\(n\\) is even). Mean is pulled toward outliers; median is not — that's why median is called \\(\\textit{resistant}\\).\n\n\\(\\textit{Quartiles}\\): \\(Q_1\\) is the median of the lower half (below the overall median); \\(Q_3\\) is the median of the upper half. The \\(\\textit{interquartile range}\\) IQR \\(= Q_3 - Q_1\\) measures the middle 50%.\n\nThe \\(\\textit{range}\\) is max − min — super sensitive to outliers.\n\nThe \\(\\textit{standard deviation}\\) \\(s = \\sqrt{\\frac{1}{n-1}\\sum (x_i - \\bar x)^2}\\) measures typical distance from the mean. It's in the same units as the data. \\(s\\) uses \\(n - 1\\) in the denominator for a sample; the population version uses \\(N\\) and is called \\(\\sigma\\).\n\nRule of thumb: symmetric data → report mean and SD; skewed or outlier-heavy data → report median and IQR. Don't mix (e.g., don't report mean with IQR).",
    keyIdeas: [
      "Mean \\(\\bar x\\) is non-resistant; median is resistant.",
      "IQR \\(= Q_3 - Q_1\\) captures the middle 50% and resists outliers.",
      "Sample SD divides by \\(n - 1\\); population SD by \\(N\\).",
      "Symmetric: mean + SD. Skewed: median + IQR.",
    ],
    workedExample: {
      prompt:
        "Data: 2, 4, 4, 5, 7, 9, 12. Find mean, median, \\(Q_1\\), \\(Q_3\\), IQR, range.",
      solution:
        "Mean: \\((2+4+4+5+7+9+12)/7 = 43/7 \\approx 6.14\\). Median: middle value = 5. Lower half (not including median): 2, 4, 4 → \\(Q_1 = 4\\). Upper half: 7, 9, 12 → \\(Q_3 = 9\\). IQR \\(= 9 - 4 = 5\\). Range \\(= 12 - 2 = 10\\).",
    },
    flashcards: [
      { q: "Formula for sample standard deviation?", a: "\\(s = \\sqrt{\\frac{1}{n-1}\\sum(x_i - \\bar x)^2}\\)." },
      { q: "Which summary stats are resistant?", a: "Median, IQR, and quartiles." },
      { q: "Why use \\(n - 1\\) in sample SD?", a: "Bessel's correction — gives an unbiased estimate of population variance." },
    ],
    commonMistakes: [
      "Dividing by \\(n\\) instead of \\(n - 1\\) for a sample SD.",
      "Computing IQR as \\(Q_3 + Q_1\\) instead of \\(Q_3 - Q_1\\).",
      "Including the median when finding \\(Q_1\\) and \\(Q_3\\) for odd \\(n\\).",
    ],
    quiz: [
      {
        q: "Which summary statistic is most resistant to outliers?",
        choices: ["Mean", "Standard deviation", "Range", "Median"],
        answerIndex: 3,
        explanation: "Median is unaffected by extreme values; the others are pulled by them.",
      },
      {
        q: "For the data set \\{1, 2, 2, 3, 100\\}, which is larger, the mean or the median?",
        choices: ["Mean", "Median", "They're equal", "Cannot tell"],
        answerIndex: 0,
        explanation: "The outlier 100 drags the mean (\\(\\approx 21.6\\)) far above the median (2).",
      },
      {
        q: "The IQR of a data set is best interpreted as:",
        choices: ["The total range of the data", "The middle 50% range of the data", "The mean absolute deviation", "The square of the standard deviation"],
        answerIndex: 1,
        explanation: "IQR is \\(Q_3 - Q_1\\), the spread of the central 50% of values.",
      },
      {
        q: "A student reports \\(\\bar x = 72\\), \\(s = 5\\) for a skewed-right data set. What would be a better center + spread pair?",
        choices: ["Mean and range", "Median and IQR", "Mode and variance", "Mean and IQR"],
        answerIndex: 1,
        explanation: "Skewed data are better summarized by resistant measures: median and IQR.",
      },
    ],
  },

  "1.8": {
    id: "1.8",
    title: "Graphical Representations of Summary Statistics",
    summary:
      "Boxplots display the five-number summary and flag outliers using the 1.5·IQR rule.",
    lesson:
      "A \\(\\textit{boxplot}\\) (or box-and-whisker plot) visualizes the five-number summary: min, \\(Q_1\\), median, \\(Q_3\\), max. A box spans \\(Q_1\\) to \\(Q_3\\) with a line at the median; whiskers extend to the smallest and largest non-outlier values.\n\n\\(\\textit{1.5·IQR rule}\\): a value is a potential outlier if it is below \\(Q_1 - 1.5\\cdot \\text{IQR}\\) or above \\(Q_3 + 1.5\\cdot \\text{IQR}\\). On a \\(\\textit{modified boxplot}\\), outliers are plotted as individual points, and whiskers extend only to the most extreme non-outlier.\n\nWhat you can see from a boxplot: skewness (if the median is closer to \\(Q_1\\) the distribution is right-skewed; closer to \\(Q_3\\) means left-skewed), center (median), spread (IQR, whisker length), and outliers (individual points).\n\nWhat you cannot see: the shape's modality (unimodal vs bimodal), exact sample size, or the presence of gaps. For those, you need a histogram or dotplot.",
    keyIdeas: [
      "Five-number summary: min, \\(Q_1\\), median, \\(Q_3\\), max.",
      "Outlier rule: below \\(Q_1 - 1.5\\cdot \\text{IQR}\\) or above \\(Q_3 + 1.5\\cdot \\text{IQR}\\).",
      "Modified boxplots plot outliers as separate points.",
      "Boxplots can't reveal modality — you need a histogram or dotplot for that.",
    ],
    workedExample: {
      prompt:
        "Given \\(Q_1 = 20\\), \\(Q_3 = 35\\), identify any outlier cutoffs. Is a value of 60 an outlier?",
      solution:
        "IQR \\(= 35 - 20 = 15\\). Upper fence: \\(35 + 1.5(15) = 57.5\\). Lower fence: \\(20 - 1.5(15) = -2.5\\). Since \\(60 > 57.5\\), yes — 60 is an outlier by the 1.5·IQR rule.",
    },
    flashcards: [
      { q: "Upper fence formula?", a: "\\(Q_3 + 1.5\\cdot \\text{IQR}\\)." },
      { q: "What does a boxplot fail to show?", a: "Modality (number of peaks) and exact sample size." },
      { q: "What does it mean if the median is near \\(Q_1\\) in a boxplot?", a: "Distribution is skewed right." },
    ],
    commonMistakes: [
      "Forgetting to multiply by 1.5 when computing fences.",
      "Claiming a boxplot shows whether a distribution is bimodal.",
      "Letting whiskers extend to outliers on a modified boxplot.",
    ],
    quiz: [
      {
        q: "A data set has \\(Q_1 = 10, Q_3 = 22\\). The upper outlier cutoff is:",
        choices: ["32", "34", "40", "44"],
        answerIndex: 2,
        explanation: "IQR \\(= 12\\); upper fence \\(= 22 + 1.5(12) = 22 + 18 = 40\\).",
      },
      {
        q: "Which is NOT shown on a boxplot?",
        choices: ["Median", "\\(Q_1\\) and \\(Q_3\\)", "Whether the distribution is bimodal", "Potential outliers"],
        answerIndex: 2,
        explanation: "Boxplots hide modality; two peaks won't appear in the box/whiskers.",
      },
      {
        q: "A boxplot with the median closer to \\(Q_3\\) than to \\(Q_1\\) suggests:",
        choices: ["Right skew", "Left skew", "Symmetric", "Uniform"],
        answerIndex: 1,
        explanation: "When the median sits near the top of the box, data bunch up high — left skew.",
      },
      {
        q: "The whiskers on a modified boxplot extend to:",
        choices: ["The overall minimum and maximum, including outliers.", "\\(Q_1 - 1.5\\cdot \\text{IQR}\\) and \\(Q_3 + 1.5\\cdot \\text{IQR}\\) always.", "The most extreme values that are not outliers.", "Two standard deviations from the mean."],
        answerIndex: 2,
        explanation: "Modified boxplots flag outliers separately; whiskers stop at the most extreme non-outlier.",
      },
    ],
  },

  "1.9": {
    id: "1.9",
    title: "Comparing Distributions of a Quantitative Variable",
    summary:
      "To compare two distributions, use parallel boxplots or side-by-side histograms. Discuss shape, center, and variability with explicit comparative language.",
    lesson:
      "When a prompt asks you to compare two distributions of a quantitative variable, use \\(\\textit{parallel boxplots}\\) or \\(\\textit{side-by-side histograms}\\). Then talk about \\(\\textbf{shape, center, variability}\\), and outliers for both — in the same sentence, with comparative words like \"greater than,\" \"more variable,\" \"more symmetric.\"\n\n\\(\\textbf{Common mistake}\\): students describe each distribution separately (\"Group A is skewed right, centered at 50, with an IQR of 10. Group B is symmetric...\"). Graders score that as description, not comparison. Instead: \"Group A is skewed right while Group B is symmetric.\" \"Group A has a larger median (50) than Group B (40).\" \"Group A has greater variability (IQR = 10) than Group B (IQR = 6).\"\n\nAlways include units and context. End with any outliers: \"Group A has two high outliers; Group B has none.\"",
    keyIdeas: [
      "Use parallel boxplots or side-by-side histograms for comparisons.",
      "Compare shape, center, variability, outliers — in parallel sentences.",
      "Use comparative words: \"greater than,\" \"more variable,\" \"more symmetric.\"",
      "Include context and units every time.",
    ],
    workedExample: {
      prompt:
        "Parallel boxplots show test scores for Class A (median 75, IQR 15) and Class B (median 82, IQR 8). Write a comparative description.",
      solution:
        "Both distributions are roughly symmetric (based on boxplot symmetry). Class B has a larger median score (82) than Class A (75), so Class B performed better on average. Class A has greater variability (IQR = 15) than Class B (IQR = 8), indicating more spread in scores. Neither class shows outliers.",
    },
    flashcards: [
      { q: "Best graph for comparing two quantitative distributions?", a: "Parallel boxplots or side-by-side histograms with equal scales." },
      { q: "What do graders mark you down for on comparison FRQs?", a: "Describing each distribution in isolation with no comparative words." },
      { q: "Always state comparisons in what unit?", a: "In context with the variable's units named." },
    ],
    commonMistakes: [
      "Describing each group separately instead of using comparative language.",
      "Forgetting to compare variability (not just center).",
      "Not using context: e.g. saying \"75 is greater than 70\" without the variable name and unit.",
    ],
    quiz: [
      {
        q: "Which is the MOST effective way to compare two quantitative distributions?",
        choices: ["Describe each distribution in isolation.", "Parallel boxplots with comparative statements for shape, center, variability.", "A single pie chart with both.", "A scatterplot."],
        answerIndex: 1,
        explanation: "Parallel boxplots + comparative statements is the CED-approved approach.",
      },
      {
        q: "Which sentence is comparative (not just descriptive)?",
        choices: ["\"Class A has median 80.\"", "\"Class B has IQR of 12.\"", "\"Class A has a larger median (80) than Class B (72).\"", "\"Both classes have outliers.\""],
        answerIndex: 2,
        explanation: "Comparative language directly contrasts the two groups.",
      },
      {
        q: "Two distributions have the same median but different IQRs. What does this say?",
        choices: ["They have the same shape.", "They have the same spread but different centers.", "They have the same center but different variability.", "One is normal; the other is not."],
        answerIndex: 2,
        explanation: "Equal medians = same center; unequal IQRs = different variability.",
      },
      {
        q: "When describing two distributions, you should always include:",
        choices: ["Only the means.", "Shape, center, variability, and outliers, all in context.", "Just the sample sizes.", "Only the maximum values."],
        answerIndex: 1,
        explanation: "The CED rubric: shape, center, variability, outliers — with context.",
      },
    ],
  },

  "1.10": {
    id: "1.10",
    title: "The Normal Distribution",
    summary:
      "The normal distribution is a symmetric bell curve defined by \\(\\mu\\) and \\(\\sigma\\). Use z-scores and the 68-95-99.7 rule or normalcdf to find areas under it.",
    lesson:
      "A \\(\\textit{normal}\\) (or Gaussian) distribution is fully determined by its mean \\(\\mu\\) and standard deviation \\(\\sigma\\). Its density is symmetric, unimodal, and bell-shaped.\n\n\\(\\textbf{Empirical / 68-95-99.7 rule}\\): in any normal distribution, about 68% of values fall within \\(\\mu \\pm \\sigma\\), 95% within \\(\\mu \\pm 2\\sigma\\), and 99.7% within \\(\\mu \\pm 3\\sigma\\).\n\n\\(\\textbf{Z-scores}\\): \\(z = (x - \\mu)/\\sigma\\) tells you how many standard deviations \\(x\\) sits from the mean. A positive \\(z\\) is above the mean, a negative \\(z\\) is below. Standardizing converts any normal variable to the \\(\\textit{standard normal}\\) \\(N(0, 1)\\).\n\nTo find probabilities, use normalcdf on a calculator: \\(P(a < X < b) = \\text{normalcdf}(a, b, \\mu, \\sigma)\\). To find a cutoff given a probability, use invNorm. On the exam, show the setup: sketch the curve, shade the region, label \\(\\mu\\), \\(\\sigma\\), and the cutoff, and state the z-score along with the probability.",
    keyIdeas: [
      "Normal \\(N(\\mu, \\sigma)\\) is symmetric and bell-shaped.",
      "Empirical rule: 68-95-99.7 within 1, 2, 3 SDs.",
      "\\(z = (x - \\mu)/\\sigma\\) standardizes any normal.",
      "normalcdf for areas; invNorm for cutoffs.",
    ],
    workedExample: {
      prompt:
        "Heights of adult men are roughly \\(N(69, 3)\\) inches. What fraction are taller than 75 inches?",
      solution:
        "\\(z = (75 - 69)/3 = 2\\). \\(P(Z > 2) \\approx 0.0228\\) (from the empirical rule: 95% within 2 SD → 2.5% above +2 SD). About 2.3% of adult men exceed 75 inches.",
    },
    flashcards: [
      { q: "Z-score formula?", a: "\\(z = (x - \\mu)/\\sigma\\)." },
      { q: "Empirical rule percentages?", a: "68% within 1 SD, 95% within 2 SD, 99.7% within 3 SD." },
      { q: "What does normalcdf compute?", a: "The area under a normal curve between two x-values." },
    ],
    commonMistakes: [
      "Using \\(\\mu + \\sigma\\) instead of \\(\\mu - \\sigma\\) for the lower bound.",
      "Forgetting to standardize when tables expect \\(z\\)-scores.",
      "Assuming any symmetric distribution is normal.",
    ],
    quiz: [
      {
        q: "For a standard normal distribution, approximately what fraction of values lie between \\(z = -1\\) and \\(z = 1\\)?",
        choices: ["50%", "68%", "95%", "99.7%"],
        answerIndex: 1,
        explanation: "Empirical rule: 68% within 1 SD of the mean.",
      },
      {
        q: "SAT scores are \\(N(1000, 200)\\). A score of 1400 corresponds to a z-score of:",
        choices: ["1", "2", "3", "4"],
        answerIndex: 1,
        explanation: "\\(z = (1400 - 1000)/200 = 2\\).",
      },
      {
        q: "Which calculator command finds \\(P(X < 80)\\) for \\(X \\sim N(75, 5)\\)?",
        choices: ["normalcdf(75, 80, 0, 1)", "normalcdf(-1E99, 80, 75, 5)", "invNorm(0.80, 75, 5)", "normalpdf(80, 75, 5)"],
        answerIndex: 1,
        explanation: "Use normalcdf with a very small lower bound, the cutoff 80, and parameters 75, 5.",
      },
      {
        q: "A z-score of \\(-2.5\\) means a value is:",
        choices: ["2.5 standard deviations above the mean", "2.5 standard deviations below the mean", "In the top 2.5% of the distribution", "Impossible"],
        answerIndex: 1,
        explanation: "Negative z = below the mean; magnitude 2.5 = 2.5 SDs.",
      },
    ],
  },

  "2.1": {
    id: "2.1",
    title: "Introducing Statistics: Are Variables Related?",
    summary:
      "Unit 2 asks whether two variables are associated. For bivariate data, one variable is typically explanatory (input), the other response (output).",
    lesson:
      "An \\(\\textit{association}\\) between two variables means knowing the value of one gives you information about the other. Unit 2 trains you to detect and describe that association — whether both variables are categorical, both quantitative, or mixed.\n\nWe distinguish between the \\(\\textit{explanatory variable}\\) (the input, predictor, x) and the \\(\\textit{response variable}\\) (the output, y). The explanatory variable is the one we think might cause or predict changes in the response. Sometimes the roles are obvious (fertilizer → crop yield); sometimes both assignments are plausible and you just pick one consistent with the research question.\n\nAn association is \\(\\textbf{not}\\) the same as causation. Two variables can be associated because one causes the other, because they share a lurking variable, or by pure chance. Only a well-designed experiment with random assignment establishes causation. Keep this distinction sharp — it shows up on every bivariate FRQ.",
    keyIdeas: [
      "Association: knowing one variable tells you about the other.",
      "Explanatory (x) vs response (y): predictor vs outcome.",
      "Association \\(\\ne\\) causation without random assignment.",
      "Lurking variables may explain an observed association.",
    ],
    workedExample: {
      prompt:
        "A study finds students who eat breakfast score higher on tests. Identify the explanatory and response variables, and explain why this does not prove breakfast causes higher scores.",
      solution:
        "Explanatory: whether a student eats breakfast. Response: test score. The study is likely observational, so a lurking variable (e.g. overall healthy habits, socioeconomic status) could cause both variables. Random assignment would be needed to claim causation.",
    },
    flashcards: [
      { q: "Explanatory vs response variable?", a: "Explanatory is the input (x, predictor); response is the output (y, outcome)." },
      { q: "Does association imply causation?", a: "No — only random assignment in an experiment supports causation." },
      { q: "What's a lurking variable?", a: "An unmeasured third variable that may cause an observed association." },
    ],
    commonMistakes: [
      "Jumping from an observational association to a causal claim.",
      "Mixing up x and y when graphing.",
      "Ignoring lurking variables when interpreting observational data.",
    ],
    quiz: [
      {
        q: "A researcher observes that people who exercise daily have lower cholesterol. What's the best conclusion?",
        choices: ["Exercise causes lower cholesterol.", "Lower cholesterol causes exercise.", "There's an association between exercise and cholesterol, but not necessarily causation.", "There is no association."],
        answerIndex: 2,
        explanation: "Observational data shows association; causal claims require random assignment.",
      },
      {
        q: "In a study predicting college GPA from SAT score, the explanatory variable is:",
        choices: ["College GPA", "SAT score", "Student age", "College name"],
        answerIndex: 1,
        explanation: "SAT is the predictor (input); GPA is the outcome.",
      },
      {
        q: "A lurking variable is best defined as:",
        choices: ["A third variable that may explain the association between two others.", "An outlier in the data.", "A categorical explanatory variable.", "An error in measurement."],
        answerIndex: 0,
        explanation: "Lurking variables are unmeasured third variables that could produce the observed association.",
      },
      {
        q: "Which experimental feature is required to claim one variable CAUSES another?",
        choices: ["Large sample size", "Random sampling from the population", "Random assignment of subjects to treatments", "Blinding of the researcher"],
        answerIndex: 2,
        explanation: "Random assignment balances lurking variables across groups — the key to causal inference.",
      },
    ],
  },

  "2.2": {
    id: "2.2",
    title: "Representing Two Categorical Variables",
    summary:
      "Two-way tables, mosaic plots, and segmented bar charts display relationships between two categorical variables.",
    lesson:
      "A \\(\\textit{two-way table}\\) (contingency table) has the categories of one variable as rows, the other as columns, and counts in each cell. Row totals, column totals, and the grand total appear in the margins — they're how you get \\(\\textit{marginal distributions}\\).\n\nTo compare the relationship, compute \\(\\textit{conditional distributions}\\): the distribution of one variable given a fixed level of the other. Divide each cell by its row total (or column total, depending on which conditional you want).\n\nGraphically, \\(\\textit{segmented bar charts}\\) of conditional distributions let you compare proportions across groups at a glance. A \\(\\textit{mosaic plot}\\) represents cells as rectangles whose area is proportional to the cell frequency — the shape shows both marginals and the joint distribution at once.\n\nIf conditional distributions differ across groups, the variables are \\(\\textit{associated}\\). If they're (approximately) identical, the variables are \\(\\textit{not associated}\\) — they're independent in the data.",
    keyIdeas: [
      "Two-way table: rows × columns of category combinations.",
      "Marginal distribution: row or column totals / grand total.",
      "Conditional distribution: cell / row total (or column total).",
      "Different conditionals → associated; similar conditionals → not associated.",
    ],
    workedExample: {
      prompt:
        "A two-way table of 200 people by gender and handedness: Male: 85 right, 15 left. Female: 90 right, 10 left. Compute conditional distributions of handedness by gender.",
      solution:
        "Males: 85/100 = 85% right, 15/100 = 15% left. Females: 90/100 = 90% right, 10/100 = 10% left. Females are slightly more right-handed; the small difference suggests a weak (if any) association.",
    },
    flashcards: [
      { q: "What's the marginal distribution of a variable?", a: "Its totals divided by the grand total — ignoring the other variable." },
      { q: "How do you check association in a two-way table?", a: "Compare conditional distributions; if they differ, variables are associated." },
      { q: "Segmented bar chart of conditional distributions shows?", a: "How category percents change across groups." },
    ],
    commonMistakes: [
      "Confusing marginal and conditional distributions.",
      "Dividing by the grand total when you meant to divide by a row/column total.",
      "Calling variables \"independent\" without comparing conditionals.",
    ],
    quiz: [
      {
        q: "In a two-way table, the marginal distribution of the row variable is found by:",
        choices: ["Dividing each row total by the grand total.", "Dividing each cell by its column total.", "Dividing each cell by the grand total.", "Dividing each row total by its corresponding column total."],
        answerIndex: 0,
        explanation: "Marginal: row totals / grand total (or column totals / grand total for the other variable).",
      },
      {
        q: "A two-way table shows 40 smokers out of 200 people, with 30 of them being male (out of 100 males). The conditional probability of being a smoker given male is:",
        choices: ["0.20", "0.15", "0.30", "0.75"],
        answerIndex: 2,
        explanation: "\\(P(\\text{smoker} | \\text{male}) = 30/100 = 0.30\\).",
      },
      {
        q: "Which statement indicates the two variables are NOT associated?",
        choices: ["Conditional distributions differ across groups.", "Conditional distributions are approximately equal across groups.", "One variable has more categories.", "The sample sizes are small."],
        answerIndex: 1,
        explanation: "Approximately equal conditionals means category proportions don't depend on the other variable — no association.",
      },
      {
        q: "Which graph most clearly compares conditional distributions of a categorical variable across groups?",
        choices: ["Histogram", "Scatterplot", "Segmented bar chart of percents", "Boxplot"],
        answerIndex: 2,
        explanation: "Segmented bar charts of percents show how category shares differ across groups.",
      },
    ],
  },

  "2.3": {
    id: "2.3",
    title: "Statistics for Two Categorical Variables",
    summary:
      "From a two-way table, compute joint, marginal, and conditional probabilities. Use them to judge whether the two variables are associated.",
    lesson:
      "A two-way table gives you three families of probabilities.\n\n\\(\\textbf{Joint probability}\\): \\(P(A \\cap B)\\) = cell count / grand total. It's the fraction of the whole sample in a particular combination of categories.\n\n\\(\\textbf{Marginal probability}\\): \\(P(A)\\) = row or column total / grand total. It ignores the other variable entirely.\n\n\\(\\textbf{Conditional probability}\\): \\(P(A|B)\\) = cell count / the total of the row or column for \\(B\\). It asks: of those in group \\(B\\), what fraction is in category \\(A\\)?\n\nIf \\(P(A|B) = P(A)\\) for every combination, the variables are independent (not associated). Any departure from this equality is association. In practice, compare a conditional to a marginal; if they differ meaningfully, report association.\n\nOn the AP, be precise about what you're conditioning on. \"Probability a student is female given they prefer math\" is \\(P(\\text{F} | \\text{math})\\) — divide by the math column total, not the grand total.",
    keyIdeas: [
      "Joint \\(P(A \\cap B)\\) = cell / grand total.",
      "Marginal \\(P(A)\\) = row or column total / grand total.",
      "Conditional \\(P(A|B)\\) = cell / row or column total of \\(B\\).",
      "\\(P(A|B) = P(A)\\) for all cells → no association.",
    ],
    workedExample: {
      prompt:
        "Of 500 surveyed, 200 are male; 150 males and 120 females own pets. Find \\(P(\\text{pet})\\), \\(P(\\text{pet} | \\text{male})\\), \\(P(\\text{pet} | \\text{female})\\). Are gender and pet ownership associated?",
      solution:
        "Total pet owners: 150 + 120 = 270. \\(P(\\text{pet}) = 270/500 = 0.54\\). \\(P(\\text{pet}|\\text{male}) = 150/200 = 0.75\\). \\(P(\\text{pet}|\\text{female}) = 120/300 = 0.40\\). Conditionals differ sharply, so gender and pet ownership are associated in this sample.",
    },
    flashcards: [
      { q: "Joint vs conditional probability?", a: "Joint divides by grand total; conditional divides by the conditioning group's total." },
      { q: "When are two categorical variables independent in data?", a: "When \\(P(A|B) = P(A)\\) for every category combination." },
      { q: "How do you spot association from a table?", a: "Compare conditional distributions — if they differ, there's association." },
    ],
    commonMistakes: [
      "Computing \\(P(A|B)\\) using the grand total instead of the row/column total of \\(B\\).",
      "Mixing up joint and conditional — check the denominator.",
      "Concluding association without comparing conditionals to marginals.",
    ],
    quiz: [
      {
        q: "From a 2×2 table with cell count 30, row total 100, grand total 400, the joint probability for that cell is:",
        choices: ["0.075", "0.30", "0.40", "0.25"],
        answerIndex: 0,
        explanation: "Joint = cell / grand total = 30/400 = 0.075.",
      },
      {
        q: "If \\(P(A) = 0.4\\) and \\(P(A|B) = 0.4\\) for all categories of B, then A and B are:",
        choices: ["Mutually exclusive", "Associated", "Independent", "Complementary"],
        answerIndex: 2,
        explanation: "Equal conditional and marginal probabilities across B → independence.",
      },
      {
        q: "In a two-way table, marginal probability of the row variable's first category is computed as:",
        choices: ["First cell / grand total", "First row total / grand total", "First row total / first column total", "First cell / first column total"],
        answerIndex: 1,
        explanation: "Marginal: row total divided by grand total.",
      },
      {
        q: "Which expression represents \\(P(\\text{success} | \\text{treatment A})\\) in a two-way table?",
        choices: ["Successes in A / total in A", "Successes in A / total successes", "Successes in A / grand total", "Total in A / grand total"],
        answerIndex: 0,
        explanation: "Condition on A: divide by total in A.",
      },
    ],
  },

  "2.4": {
    id: "2.4",
    title: "Representing the Relationship Between Two Quantitative Variables",
    summary:
      "A scatterplot shows two quantitative variables. Describe the relationship by direction, form, strength, and outliers.",
    lesson:
      "A \\(\\textit{scatterplot}\\) plots each individual as a point whose coordinates are \\((x, y)\\) — explanatory on the horizontal axis, response on the vertical. It's the default display for two quantitative variables.\n\nWhen describing a scatterplot, hit four things:\n\\(\\textbf{Direction}\\): positive (as x increases, y tends to increase) or negative (as x increases, y tends to decrease).\n\\(\\textbf{Form}\\): linear, curved (quadratic/exponential), or no clear pattern.\n\\(\\textbf{Strength}\\): how tightly the points follow the form — strong, moderate, weak.\n\\(\\textbf{Outliers}\\): points that don't fit the overall pattern, either in x, y, or both.\n\nInclude all four, in context. Example: \"The scatterplot of height vs weight shows a strong, positive, linear relationship; one unusually short but heavy individual is a potential outlier.\"",
    keyIdeas: [
      "Scatterplot: x on horizontal, y on vertical.",
      "Describe: direction, form, strength, outliers (DFSO).",
      "Direction: positive/negative. Form: linear/curved. Strength: tight/loose.",
      "Always describe in context with variable names.",
    ],
    workedExample: {
      prompt:
        "Students' study hours vs test scores produce a scatterplot trending upward with points hugging a line closely, and no points far from the trend. Describe it.",
      solution:
        "The scatterplot of test score vs study hours shows a strong, positive, linear relationship. As study hours increase, test scores tend to increase. There are no apparent outliers.",
    },
    flashcards: [
      { q: "Four things to describe for a scatterplot?", a: "Direction, form, strength, and outliers (DFSO)." },
      { q: "Which axis gets the explanatory variable?", a: "The horizontal (x) axis." },
      { q: "What's a \"strong\" relationship on a scatterplot?", a: "Points cluster tightly around the form — little scatter." },
    ],
    commonMistakes: [
      "Putting response on the x-axis.",
      "Forgetting to mention strength or form.",
      "Calling a curved pattern \"linear\" because it trends in one direction.",
    ],
    quiz: [
      {
        q: "In a scatterplot, the explanatory variable goes on:",
        choices: ["The y-axis", "The x-axis", "Either axis", "The response axis"],
        answerIndex: 1,
        explanation: "Convention: explanatory on x, response on y.",
      },
      {
        q: "Which is NOT one of the four aspects used to describe a scatterplot?",
        choices: ["Direction", "Form", "Color of points", "Strength"],
        answerIndex: 2,
        explanation: "Color isn't a standard description element; you describe direction, form, strength, and outliers.",
      },
      {
        q: "A scatterplot shows points forming a clear U-shape. The form is:",
        choices: ["Linear", "Curved (non-linear)", "Strong positive", "Random"],
        answerIndex: 1,
        explanation: "U-shape is a curved (non-linear) form, not a linear one.",
      },
      {
        q: "Which description is most complete for a scatterplot?",
        choices: ["\"Positive relationship.\"", "\"Strong linear pattern.\"", "\"Strong, positive, linear relationship with no apparent outliers.\"", "\"The points go up.\""],
        answerIndex: 2,
        explanation: "Complete: direction (positive), form (linear), strength (strong), outliers (none).",
      },
    ],
  },

  "2.5": {
    id: "2.5",
    title: "Correlation",
    summary:
      "The correlation coefficient \\(r\\) measures the strength and direction of a LINEAR association. \\(r \\in [-1, 1]\\) and is not resistant to outliers.",
    lesson:
      "The correlation \\(r\\) quantifies the linear relationship between two quantitative variables. It ranges from \\(-1\\) (perfect negative linear) through 0 (no linear association) to \\(+1\\) (perfect positive linear).\n\nKey properties:\n- \\(r\\) has no units; it's a pure number.\n- \\(r\\) measures linear strength only. A perfect curve can have \\(r\\) near 0.\n- \\(r\\) is \\(\\textbf{not resistant}\\) to outliers — a single far point can swing it.\n- \\(r\\) is unchanged by linear transformations of x or y (e.g. converting units).\n- \\(r\\) is symmetric: \\(r_{xy} = r_{yx}\\).\n- \\(r^2\\) (coefficient of determination) is the fraction of variance in y explained by a linear model in x.\n\nCritically: \\(\\textbf{correlation does not imply causation}\\). A high \\(|r|\\) just says the linear fit is tight; it doesn't prove one variable drives the other.",
    keyIdeas: [
      "\\(-1 \\le r \\le 1\\); sign = direction, magnitude = linear strength.",
      "\\(r\\) measures LINEAR association only.",
      "\\(r\\) is not resistant to outliers.",
      "Correlation \\(\\ne\\) causation.",
    ],
    workedExample: {
      prompt:
        "A data set has \\(r = 0.82\\) between study hours and test score. Interpret \\(r\\) and \\(r^2\\).",
      solution:
        "\\(r = 0.82\\) indicates a strong, positive linear association between study hours and test score. \\(r^2 = 0.67\\), so about 67% of the variation in test scores can be explained by a linear model using study hours.",
    },
    flashcards: [
      { q: "Range of \\(r\\)?", a: "\\([-1, 1]\\)." },
      { q: "Does \\(r\\) measure curved relationships?", a: "No — only linear ones." },
      { q: "What does \\(r^2\\) tell you?", a: "Proportion of variation in y explained by a linear model in x." },
    ],
    commonMistakes: [
      "Using \\(r\\) to describe a curved scatterplot.",
      "Claiming causation from a high \\(r\\).",
      "Assuming \\(r\\) near 0 means \"no relationship\" — it means no LINEAR relationship.",
    ],
    quiz: [
      {
        q: "Which of the following is a valid value for the correlation \\(r\\)?",
        choices: ["\\(-1.2\\)", "\\(1.5\\)", "\\(-0.95\\)", "\\(2.0\\)"],
        answerIndex: 2,
        explanation: "\\(r\\) must be between \\(-1\\) and \\(1\\) inclusive.",
      },
      {
        q: "\\(r = 0.90\\) for X vs Y. Interpretation:",
        choices: ["X causes Y.", "Strong, positive linear association between X and Y.", "Y is always larger than X.", "X and Y are independent."],
        answerIndex: 1,
        explanation: "Near +1 indicates strong positive linear association, not causation.",
      },
      {
        q: "The value \\(r^2 = 0.64\\) means:",
        choices: ["64% of the y-values equal predicted values.", "64% of the variation in y is explained by the linear model with x.", "\\(r = 0.64\\).", "The slope is 0.64."],
        answerIndex: 1,
        explanation: "\\(r^2\\) gives the proportion of variance in y explained by the linear regression on x.",
      },
      {
        q: "A scatterplot is perfectly described by \\(y = x^2\\) (a perfect parabola on a symmetric interval around 0). The correlation \\(r\\) will be approximately:",
        choices: ["1", "\\(-1\\)", "0", "0.5"],
        answerIndex: 2,
        explanation: "A symmetric parabola has no linear trend — \\(r\\) is near 0 even though the relationship is perfect.",
      },
    ],
  },

  "2.6": {
    id: "2.6",
    title: "Linear Regression Models",
    summary:
      "The least-squares regression line \\(\\hat y = a + bx\\) predicts y from x. Slope \\(b\\) gives predicted change in y per unit x; intercept \\(a\\) is predicted y when x = 0.",
    lesson:
      "A linear regression model estimates the relationship between x and y with a line: \\(\\hat y = a + bx\\). The hat on y signals a prediction — the value the line produces for a given x.\n\n\\(\\textbf{Slope \\(b\\)}\\): for each one-unit increase in x, \\(\\hat y\\) changes by \\(b\\) units. You must include direction: if \\(b > 0\\), predicted y increases; if \\(b < 0\\), predicted y decreases. On FRQs, interpret in context with units: \"For each additional hour studied, the predicted test score increases by 4.2 points.\"\n\n\\(\\textbf{Intercept \\(a\\)}\\): the predicted value of y when x = 0. Only meaningful if x = 0 is plausible in context. Sometimes the intercept is mathematically required but practically meaningless (e.g. predicted weight at height 0).\n\nTo predict, plug x into the equation: \\(\\hat y = a + bx\\). Avoid \\(\\textit{extrapolation}\\) — predicting outside the range of observed x values. The linear fit may not hold there.",
    keyIdeas: [
      "\\(\\hat y = a + bx\\); hat denotes predicted value.",
      "Slope \\(b\\): predicted change in y per unit change in x.",
      "Intercept \\(a\\): predicted y when x = 0.",
      "Don't extrapolate outside the observed x range.",
    ],
    workedExample: {
      prompt:
        "A regression gives \\(\\hat{\\text{score}} = 40 + 5(\\text{hours})\\). Interpret slope and intercept. Predict the score for 3 hours of study.",
      solution:
        "Slope: for each additional hour studied, predicted score increases by 5 points. Intercept: predicted score for 0 study hours is 40 — meaningful since 0 hours is plausible. Prediction at 3 hours: \\(40 + 5(3) = 55\\).",
    },
    flashcards: [
      { q: "What does the hat in \\(\\hat y\\) mean?", a: "Predicted value from the regression line." },
      { q: "Interpretation template for slope?", a: "\"For each one-unit increase in x, predicted y changes by \\(b\\) units.\"" },
      { q: "Why avoid extrapolation?", a: "The linear trend may not continue beyond observed x." },
    ],
    commonMistakes: [
      "Interpreting the slope without \"predicted\" — the relationship is an estimate.",
      "Interpreting the intercept when x = 0 is meaningless in context.",
      "Extrapolating far beyond the data range.",
    ],
    quiz: [
      {
        q: "For \\(\\hat y = 10 + 3x\\), the slope is 3. Best interpretation?",
        choices: ["Y is 3 times x.", "For each 1-unit increase in x, predicted y increases by 3.", "X is 3 times y.", "Y equals 3 whenever x is 0."],
        answerIndex: 1,
        explanation: "Slope = predicted change in y per 1-unit change in x.",
      },
      {
        q: "If \\(\\hat{\\text{weight}} = 50 + 2.5(\\text{age})\\) for ages 5-15, which is extrapolation?",
        choices: ["Predicting at age 10.", "Predicting at age 8.", "Predicting at age 40.", "Predicting at age 12."],
        answerIndex: 2,
        explanation: "Age 40 is well outside the observed range (5-15), so using the model there is extrapolation.",
      },
      {
        q: "The intercept of a regression line is interpretable only when:",
        choices: ["The slope is zero.", "X = 0 is a plausible value in context.", "The correlation is strong.", "The sample size exceeds 30."],
        answerIndex: 1,
        explanation: "The intercept is the predicted y at x = 0 — meaningful only if x = 0 makes sense in context.",
      },
      {
        q: "Given \\(\\hat y = 20 - 2x\\), predicted y at x = 5:",
        choices: ["30", "10", "\\(-10\\)", "\\(-30\\)"],
        answerIndex: 1,
        explanation: "\\(\\hat y = 20 - 2(5) = 10\\).",
      },
    ],
  },

  "2.7": {
    id: "2.7",
    title: "Residuals",
    summary:
      "A residual is the vertical distance from an observed point to the regression line: \\(\\text{residual} = y - \\hat y\\). Residual plots diagnose the fit of a linear model.",
    lesson:
      "A \\(\\textit{residual}\\) is the leftover after fitting: \\(e_i = y_i - \\hat y_i\\). Positive residual = observed y is above the line (underprediction). Negative residual = observed y is below the line (overprediction).\n\nA \\(\\textit{residual plot}\\) graphs residuals against x (or against \\(\\hat y\\)). If the linear model is appropriate, the residual plot should show \\(\\textbf{random scatter around zero}\\) with no pattern. Any clear pattern (a U-shape, a megaphone, a trend) signals the linear model is wrong:\n\n- U-shape or curve → relationship is curved, not linear.\n- Fanning out (megaphone) → non-constant variance, inference on regression may be invalid.\n- Systematic trend → missing variable or incorrect form.\n\nOn the AP, checking the residual plot is part of how you justify using a linear model in the first place.",
    keyIdeas: [
      "Residual \\(= y - \\hat y\\) (observed minus predicted).",
      "Positive residual: underprediction. Negative: overprediction.",
      "Residual plots should show random scatter for linear model to be appropriate.",
      "Patterns in residuals signal non-linear relationship or non-constant variance.",
    ],
    workedExample: {
      prompt:
        "A regression predicts \\(\\hat y = 3.2\\) when \\(x = 4\\). The observed value at \\(x = 4\\) is \\(y = 5.0\\). Find the residual and interpret.",
      solution:
        "Residual \\(= 5.0 - 3.2 = 1.8\\). The regression underpredicted by 1.8 units at \\(x = 4\\); the observed y is 1.8 above the line.",
    },
    flashcards: [
      { q: "Residual formula?", a: "\\(e = y - \\hat y\\)." },
      { q: "What does a random-scatter residual plot mean?", a: "A linear model is appropriate." },
      { q: "What does a U-shaped residual plot mean?", a: "The true relationship is curved — linear model is inappropriate." },
    ],
    commonMistakes: [
      "Writing residual as \\(\\hat y - y\\) (sign reversed).",
      "Calling any residual plot with spread \"bad\" — some spread is fine; patterns are bad.",
      "Ignoring the residual plot when justifying a linear model.",
    ],
    quiz: [
      {
        q: "A regression model predicts \\(\\hat y = 15\\) for \\(x = 3\\). The actual y is 12. The residual is:",
        choices: ["3", "\\(-3\\)", "12", "15"],
        answerIndex: 1,
        explanation: "\\(e = y - \\hat y = 12 - 15 = -3\\). Overpredicted by 3.",
      },
      {
        q: "A residual plot shows a clear parabolic pattern. This suggests:",
        choices: ["A linear model is appropriate.", "The relationship is curved; a linear model is not appropriate.", "The residuals are normally distributed.", "The slope is zero."],
        answerIndex: 1,
        explanation: "Curved residuals reveal the true relationship is non-linear.",
      },
      {
        q: "Which residual-plot shape indicates the linear model fits well?",
        choices: ["Funnel / megaphone", "Random scatter around zero", "Clear upward trend", "U-shape"],
        answerIndex: 1,
        explanation: "Random scatter (no pattern) means the linear fit captures the structure.",
      },
      {
        q: "A positive residual means:",
        choices: ["The predicted value is larger than observed.", "The observed value is larger than predicted.", "The slope is positive.", "The correlation is positive."],
        answerIndex: 1,
        explanation: "Residual \\(= y - \\hat y > 0\\) means observed y is above the line.",
      },
    ],
  },

  "2.8": {
    id: "2.8",
    title: "Least Squares Regression",
    summary:
      "The least-squares line minimizes the sum of squared residuals. Slope \\(b = r\\,s_y/s_x\\); intercept \\(a = \\bar y - b\\bar x\\). It passes through \\((\\bar x, \\bar y)\\).",
    lesson:
      "The \\(\\textit{least-squares regression line}\\) (LSRL) is the line that minimizes \\(\\sum (y_i - \\hat y_i)^2\\) — the sum of squared residuals. Key formulas:\n\n\\(b = r \\cdot \\dfrac{s_y}{s_x}\\) — slope.\n\n\\(a = \\bar y - b\\bar x\\) — intercept.\n\nThe LSRL always passes through the point \\((\\bar x, \\bar y)\\). Always.\n\nThe \\(\\textit{coefficient of determination}\\) \\(r^2\\) is the fraction of variation in y explained by the linear model in x: \\(r^2 = 1 - \\dfrac{\\text{SSE}}{\\text{SST}}\\). Interpret in context: \"\\(r^2 = 0.75\\) means 75% of the variation in test scores is explained by the linear model using study hours.\"\n\nStandard deviation of the residuals \\(s\\) (sometimes called the standard error of the estimate) measures typical prediction error: \\(s = \\sqrt{\\text{SSE}/(n-2)}\\). Smaller \\(s\\) = tighter fit.\n\nInterpreting output: exam prompts often hand you a printout. The slope is in the \"Coef\" column for the predictor; \\(a\\) is the \"Coef\" for \"Constant\" or \"(Intercept)\"; \\(s\\) is \"S\" or \"Residual standard error\"; \\(r^2\\) is \"R-Sq\" (sometimes as a percent).",
    keyIdeas: [
      "LSRL minimizes sum of squared residuals.",
      "\\(b = r\\cdot s_y/s_x\\), \\(a = \\bar y - b\\bar x\\).",
      "Line passes through \\((\\bar x, \\bar y)\\).",
      "\\(r^2\\) = proportion of variance in y explained by x; interpret in context.",
    ],
    workedExample: {
      prompt:
        "Given \\(\\bar x = 10, \\bar y = 50, s_x = 3, s_y = 12, r = 0.8\\), find the LSRL.",
      solution:
        "\\(b = r\\,s_y/s_x = 0.8(12)/3 = 3.2\\). \\(a = \\bar y - b\\bar x = 50 - 3.2(10) = 18\\). LSRL: \\(\\hat y = 18 + 3.2x\\). \\(r^2 = 0.64\\) → 64% of variation in y is explained by the linear model with x.",
    },
    flashcards: [
      { q: "What does least-squares minimize?", a: "The sum of squared residuals." },
      { q: "What point does every LSRL pass through?", a: "\\((\\bar x, \\bar y)\\)." },
      { q: "Formula for regression slope?", a: "\\(b = r\\cdot s_y/s_x\\)." },
    ],
    commonMistakes: [
      "Swapping \\(s_x\\) and \\(s_y\\) in the slope formula.",
      "Reporting \\(r^2\\) as \"percent of y values\" instead of percent of variation.",
      "Forgetting that the line passes through \\((\\bar x, \\bar y)\\).",
    ],
    quiz: [
      {
        q: "If \\(r = 0.6, s_x = 2, s_y = 10\\), the regression slope is:",
        choices: ["1.2", "3", "5", "12"],
        answerIndex: 1,
        explanation: "\\(b = 0.6 \\times 10/2 = 3\\).",
      },
      {
        q: "The least-squares regression line always passes through:",
        choices: ["The origin", "\\((\\bar x, \\bar y)\\)", "The largest data point", "The median x and median y"],
        answerIndex: 1,
        explanation: "By construction, the LSRL passes through the point of means.",
      },
      {
        q: "\\(r^2 = 0.81\\) is best interpreted as:",
        choices: ["81% of y values are correct.", "81% of the variation in y is explained by the linear model with x.", "\\(r = 0.9\\).", "The slope is 0.81."],
        answerIndex: 1,
        explanation: "\\(r^2\\) is proportion of variance in y explained — always interpret with 'variation.'",
      },
      {
        q: "A regression intercept is 5 and slope is 2. A student claims \"for each x, y is 2\". This interpretation is:",
        choices: ["Correct.", "Wrong — slope describes predicted change in y per unit change in x, not y itself.", "Correct only for integer x.", "Correct when x is 0."],
        answerIndex: 1,
        explanation: "Slope is about predicted change in y per unit x, not y's value.",
      },
    ],
  },

  "2.9": {
    id: "2.9",
    title: "Analyzing Departures from Linearity",
    summary:
      "If residuals show a pattern, the linear model fits poorly. Transformations (log, power) can linearize curved relationships.",
    lesson:
      "If a scatterplot looks curved or the residual plot has a pattern, the linear model is wrong. The fix: \\(\\textit{transform}\\) one or both variables.\n\nTwo classic transformations:\n\\(\\textbf{Log transformation}\\): if \\(y = ab^x\\) (exponential), then \\(\\log y = \\log a + x\\log b\\) — linear in \\(x\\) and \\(\\log y\\). If \\(y = ax^b\\) (power), then \\(\\log y = \\log a + b\\log x\\) — linear in \\(\\log x\\) and \\(\\log y\\).\n\n\\(\\textbf{How to decide}\\): try a transformation, refit, then check the new residual plot. If the pattern disappears, your transformation worked.\n\nAfter transforming, you interpret the regression output in the transformed variable, then back-transform predictions if needed. Example: if \\(\\hat{\\log y} = 0.5 + 0.2x\\), the predicted y at \\(x = 5\\) is \\(10^{0.5 + 0.2(5)} = 10^{1.5} \\approx 31.6\\).\n\nOn the AP: students must (1) recognize non-linearity (from scatterplot or residual plot), (2) propose a sensible transformation, (3) check the new residual plot, (4) interpret the transformed model or back-transform.",
    keyIdeas: [
      "Non-random residual plot = linear model is inappropriate.",
      "Log y vs x linearizes exponential; log y vs log x linearizes power.",
      "Re-check residual plot after transforming.",
      "Back-transform predictions for interpretation on the original scale.",
    ],
    workedExample: {
      prompt:
        "A scatterplot of bacterial count vs time is curved upward. A plot of log(count) vs time is approximately linear. What does this suggest about the growth?",
      solution:
        "An approximately linear plot of log(count) vs time suggests exponential growth: count \\(\\approx ab^t\\). The slope of the log-linear line equals \\(\\log b\\), and the intercept equals \\(\\log a\\).",
    },
    flashcards: [
      { q: "What transformation linearizes exponential growth?", a: "Log of y vs x (semi-log)." },
      { q: "What transformation linearizes a power relationship?", a: "Log y vs log x (log-log)." },
      { q: "How do you verify a transformation worked?", a: "The residual plot of the transformed regression shows random scatter." },
    ],
    commonMistakes: [
      "Transforming without checking the new residual plot.",
      "Claiming the transformed model is exactly correct rather than a better fit.",
      "Forgetting to back-transform predicted values for interpretation.",
    ],
    quiz: [
      {
        q: "A residual plot shows a clear curved pattern. The correct response is:",
        choices: ["Use a more complex linear model.", "Trust the linear model.", "Consider a transformation of x, y, or both.", "Remove all residuals."],
        answerIndex: 2,
        explanation: "A patterned residual plot means linearity fails; transform and re-check.",
      },
      {
        q: "Plotting \\(\\log y\\) vs \\(x\\) gives a linear pattern. The original relationship is most likely:",
        choices: ["Linear", "Quadratic", "Exponential", "Reciprocal"],
        answerIndex: 2,
        explanation: "Exponential \\(y = ab^x\\) becomes linear when taking log of y.",
      },
      {
        q: "Plotting \\(\\log y\\) vs \\(\\log x\\) is linear. The underlying relationship is a:",
        choices: ["Power function (\\(y = ax^b\\))", "Exponential (\\(y = ab^x\\))", "Logarithmic (\\(y = \\log x\\))", "Linear (\\(y = a + bx\\))"],
        answerIndex: 0,
        explanation: "Log-log linearizes a power function \\(y = ax^b\\).",
      },
      {
        q: "After fitting \\(\\hat{\\log y} = 1 + 0.3x\\), the predicted y at \\(x = 4\\) (using base 10) is:",
        choices: ["\\(10^{2.2}\\)", "\\(1 + 0.3(4)\\)", "\\(e^{2.2}\\)", "\\(2.2\\)"],
        answerIndex: 0,
        explanation: "\\(\\log\\hat y = 1 + 0.3(4) = 2.2\\), so \\(\\hat y = 10^{2.2}\\).",
      },
    ],
  },

  "3.1": {
    id: "3.1",
    title: "Introducing Statistics: Do the Data We Collected Tell the Truth?",
    summary:
      "How data are collected determines what conclusions you can draw. Random sampling generalizes; random assignment establishes causation.",
    lesson:
      "Unit 3 is entirely about the link between data collection method and inference. Two slogans cover 90% of the unit:\n\n1. \\(\\textbf{Random sampling lets us generalize}\\) from sample to population. Without it, any sample conclusion only applies to the people in the sample.\n\n2. \\(\\textbf{Random assignment lets us establish causation}\\) in an experiment. Without random assignment, observed differences may be due to lurking variables.\n\nA study can have one, both, or neither. An observational study with random sampling can describe a population but not cause. An experiment with random assignment on a convenience sample can show cause but only for the subjects studied. The best studies do both.\n\nBias is any systematic tendency for results to differ from the truth. Different flavors of bias (selection, response, non-response, wording) all distort conclusions. Random methods defend against bias.\n\nOn an FRQ, always check: was the sample random? Was the treatment randomly assigned? Your conclusion has to match those answers.",
    keyIdeas: [
      "Random sampling → generalize to population.",
      "Random assignment → establish causation.",
      "Without random methods, conclusions are limited to the observed data.",
      "Bias is any systematic error in the collection process.",
    ],
    workedExample: {
      prompt:
        "A study randomly selects 500 US adults and randomly assigns each to take either a new vitamin or a placebo. Those on the vitamin have fewer colds. What can be concluded?",
      solution:
        "Both random sampling and random assignment are present, so we can (1) generalize to US adults and (2) conclude the vitamin causes fewer colds in that population.",
    },
    flashcards: [
      { q: "What does random sampling enable?", a: "Generalization to the population." },
      { q: "What does random assignment enable?", a: "Causal conclusions." },
      { q: "Define bias.", a: "Systematic tendency for sample results to differ from the truth." },
    ],
    commonMistakes: [
      "Claiming causation from a study with no random assignment.",
      "Generalizing from a convenience sample to the whole population.",
      "Confusing random sampling and random assignment — they do different things.",
    ],
    quiz: [
      {
        q: "A researcher randomly samples 300 patients at a hospital and surveys their satisfaction. She can generalize to:",
        choices: ["All hospital patients nationwide.", "All patients at that hospital.", "Only the 300 surveyed.", "Patients of similar age only."],
        answerIndex: 1,
        explanation: "Random sampling lets you generalize to the population from which you sampled — that hospital.",
      },
      {
        q: "Which study design lets you claim 'X causes Y'?",
        choices: ["Observational study with random sampling.", "Experiment with random assignment.", "Convenience sample.", "Census."],
        answerIndex: 1,
        explanation: "Only random assignment can establish causation by balancing lurking variables.",
      },
      {
        q: "Bias in a study is best described as:",
        choices: ["Random error from sampling variability.", "A systematic tendency for results to differ from the truth.", "Any extreme outlier.", "The difference between sample mean and median."],
        answerIndex: 1,
        explanation: "Bias is systematic distortion, not random noise.",
      },
      {
        q: "A study uses random assignment but not random sampling. Results can:",
        choices: ["Generalize and establish cause.", "Only establish cause for those studied — not generalize.", "Only generalize — not establish cause.", "Do neither."],
        answerIndex: 1,
        explanation: "Random assignment gives causation; no random sampling means limited generalization.",
      },
    ],
  },

  "3.2": {
    id: "3.2",
    title: "Introduction to Planning a Study",
    summary:
      "Every study starts with defining the population, the sampling frame, and what parameter is being estimated. A clear question prevents lost work later.",
    lesson:
      "Planning a study means being explicit about three things:\n\n1. \\(\\textbf{Population}\\) — the group you want to learn about. \"All US voters,\" \"students at one school,\" \"all batteries produced this month.\"\n\n2. \\(\\textbf{Sampling frame}\\) — the actual list of individuals from which the sample is drawn. Gap between population and frame = \\(\\textit{undercoverage}\\) (bias).\n\n3. \\(\\textbf{Parameter}\\) of interest — what number about the population do you want? A proportion \\(p\\)? A mean \\(\\mu\\)? A difference?\n\nCensus vs sample: a census measures every individual in the population — rarely feasible. A sample is a subset; cheaper but requires care. Observational vs experimental: observational studies measure variables as they are; experiments impose treatments.\n\nClearly stating the question and variable type drives the rest of the design. On the AP, sloppy problem framing leads to wrong tests later.",
    keyIdeas: [
      "Identify population, sampling frame, and parameter before collecting.",
      "Undercoverage: population members missing from the frame.",
      "Census measures all; sample measures a subset.",
      "Observational vs experimental study determines what you can conclude.",
    ],
    workedExample: {
      prompt:
        "A pollster wants to know the proportion of likely US voters who approve of the president. She draws names from a list of registered voters. Identify population, frame, and parameter.",
      solution:
        "Population: all likely US voters. Frame: registered voters on the list. Parameter: \\(p\\), the true proportion of likely US voters who approve. (Note: the frame excludes unregistered likely voters — potential undercoverage.)",
    },
    flashcards: [
      { q: "Difference between population and frame?", a: "Population = group of interest; frame = the list actually used to draw the sample." },
      { q: "What is undercoverage?", a: "Population members missing from the sampling frame." },
      { q: "Census vs sample?", a: "Census measures every individual; sample measures a subset." },
    ],
    commonMistakes: [
      "Treating the frame as identical to the population.",
      "Not specifying the parameter of interest — proportion vs mean matters downstream.",
      "Calling an observational study an experiment.",
    ],
    quiz: [
      {
        q: "An online survey of all visitors to a site last week can generalize to:",
        choices: ["All internet users.", "All site visitors ever.", "Only those visitors who chose to answer.", "Nobody in particular."],
        answerIndex: 2,
        explanation: "Voluntary response on a convenience frame; generalization is limited to self-selected respondents.",
      },
      {
        q: "A parameter is:",
        choices: ["A sample number like \\(\\bar x\\).", "A population number like \\(\\mu\\) or \\(p\\).", "A random draw.", "The standard deviation of residuals."],
        answerIndex: 1,
        explanation: "Parameters describe populations; statistics describe samples.",
      },
      {
        q: "A census is:",
        choices: ["A sample of the population.", "A measurement of every individual in the population.", "A type of experiment.", "A random process."],
        answerIndex: 1,
        explanation: "A census attempts to measure every individual in the population.",
      },
      {
        q: "Which of the following is an observational study?",
        choices: ["Randomly assigning mice to diets.", "Measuring glucose in patients without intervention.", "Randomly assigning students to tutors.", "Treating plants with fertilizer vs water."],
        answerIndex: 1,
        explanation: "Observational studies measure variables as they exist — no treatment imposed.",
      },
    ],
  },

  "3.3": {
    id: "3.3",
    title: "Random Sampling and Data Collection",
    summary:
      "Simple random, stratified, cluster, and systematic sampling are the four designs to know. Only random methods justify generalization.",
    lesson:
      "\\(\\textbf{Simple random sample (SRS)}\\): every possible sample of size \\(n\\) is equally likely. Method: assign numbers to individuals, pick with a random device. Gold standard, but sometimes impractical.\n\n\\(\\textbf{Stratified random sample}\\): divide the population into \\(\\textit{strata}\\) (homogeneous subgroups), then take an SRS from each stratum. Use when subgroups differ in the variable of interest — stratification reduces variability of the overall estimate.\n\n\\(\\textbf{Cluster sample}\\): divide the population into \\(\\textit{clusters}\\) (naturally occurring groups like neighborhoods or schools). Randomly select whole clusters; measure every individual in chosen clusters. Cheaper but typically less precise.\n\n\\(\\textbf{Systematic sample}\\): list the population, pick a random starting point, and select every \\(k\\)th individual.\n\n\\(\\textbf{Convenience sample}\\): whoever's easy — not random, biased, never generalizable.\n\n\\(\\textbf{Voluntary response}\\): people self-select — biased toward those with strong opinions.\n\nOnly random methods support generalization to the population.",
    keyIdeas: [
      "SRS: every subset of size n equally likely.",
      "Stratified: random samples within strata (reduces variability).",
      "Cluster: randomly pick whole groups.",
      "Convenience and voluntary response are biased — do not generalize.",
    ],
    workedExample: {
      prompt:
        "A school has 400 freshmen, 300 sophomores, 300 juniors, 200 seniors. Which sampling method samples proportionally from each class?",
      solution:
        "Stratified random sampling by class year. Sample, say, 10% of each stratum: 40 freshmen, 30 sophomores, 30 juniors, 20 seniors. This guarantees representation of each class and reduces sampling variability for class-related variables.",
    },
    flashcards: [
      { q: "When is stratified sampling best?", a: "When strata differ on the variable of interest." },
      { q: "SRS vs systematic sampling?", a: "SRS picks by pure randomness; systematic picks every k-th after a random start." },
      { q: "Why is convenience sampling risky?", a: "No randomness; sample may systematically differ from the population." },
    ],
    commonMistakes: [
      "Calling any sample \"random\" without a random mechanism.",
      "Confusing stratified (pick within groups) and cluster (pick whole groups).",
      "Treating convenience samples as SRS.",
    ],
    quiz: [
      {
        q: "A researcher divides a city into 50 neighborhoods, randomly picks 5, and surveys everyone in those 5. This is:",
        choices: ["SRS", "Stratified random sample", "Cluster sample", "Convenience sample"],
        answerIndex: 2,
        explanation: "Randomly selecting whole groups (neighborhoods) and sampling all within = cluster sampling.",
      },
      {
        q: "Which method is MOST likely to reduce variability when subgroups differ?",
        choices: ["SRS", "Stratified random sample", "Cluster sample", "Voluntary response"],
        answerIndex: 1,
        explanation: "Stratifying by subgroups with differing means/proportions reduces the sampling variability of the overall estimate.",
      },
      {
        q: "Which sampling method is NOT random?",
        choices: ["SRS", "Stratified random sample", "Convenience sample", "Cluster sample"],
        answerIndex: 2,
        explanation: "Convenience samples use no randomization — subject to bias.",
      },
      {
        q: "Selecting every 10th person on a list after a random start is:",
        choices: ["SRS", "Stratified", "Cluster", "Systematic"],
        answerIndex: 3,
        explanation: "Systematic: random start, every k-th afterward.",
      },
    ],
  },

  "3.4": {
    id: "3.4",
    title: "Potential Problems with Sampling",
    summary:
      "Common biases: undercoverage, non-response, response bias, voluntary response, convenience, and question wording. Random methods mitigate but don't eliminate them.",
    lesson:
      "Biases to know by name:\n\n\\(\\textbf{Undercoverage}\\): some members of the population have no chance of being chosen because they're missing from the frame. Example: phone polls miss households without phones.\n\n\\(\\textbf{Non-response bias}\\): selected individuals refuse to answer or can't be reached. If non-responders differ systematically from responders, estimates are biased.\n\n\\(\\textbf{Response bias}\\): respondents lie, misremember, or answer to please the interviewer. Think sensitive topics.\n\n\\(\\textbf{Voluntary response bias}\\): only those with strong opinions self-select — overrepresents extremes.\n\n\\(\\textbf{Convenience bias}\\): sampling whoever is easy — systematically excludes the hard-to-reach.\n\n\\(\\textbf{Wording bias}\\): leading or confusing questions nudge responses in a direction.\n\nIncreasing sample size does NOT reduce bias; it reduces variability. Bias is fixed by improving the method (random sampling, anonymous surveys, neutral wording).",
    keyIdeas: [
      "Bias is a flaw in the method, not in the sample size.",
      "Undercoverage, non-response, response, voluntary response, convenience, wording — all biases.",
      "Larger sample does NOT fix bias.",
      "Design fixes bias; math can't.",
    ],
    workedExample: {
      prompt:
        "A poll calls only landline numbers to measure approval of a new law. Younger adults less likely to have landlines are underrepresented. Which bias is this, and does a bigger sample help?",
      solution:
        "Undercoverage bias — the frame (landline numbers) misses population members (young adults). Bigger sample size doesn't help because the frame is still wrong; bias comes from the method.",
    },
    flashcards: [
      { q: "Does a larger sample reduce bias?", a: "No — it reduces variability. Bias is about method." },
      { q: "Give an example of response bias.", a: "Respondents lying about illegal behavior on a survey." },
      { q: "Voluntary response bias pattern?", a: "Self-selected, overrepresenting strong opinions." },
    ],
    commonMistakes: [
      "Trying to fix bias by adding more respondents.",
      "Confusing non-response (couldn't reach) with voluntary response (self-selected).",
      "Calling any sampling issue \"outlier\" — bias is a structural problem.",
    ],
    quiz: [
      {
        q: "To fix undercoverage bias in a phone poll, the researcher should:",
        choices: ["Increase the sample size.", "Improve the sampling frame to include missing groups.", "Use a longer questionnaire.", "Take a census."],
        answerIndex: 1,
        explanation: "Bias comes from the frame, not sample size — fix by improving frame.",
      },
      {
        q: "A magazine asks readers to mail in opinions; only 3% respond, all strongly. Likely bias:",
        choices: ["Undercoverage", "Voluntary response", "Response bias", "Random error"],
        answerIndex: 1,
        explanation: "Self-selected responders who feel strongly = voluntary response bias.",
      },
      {
        q: "Larger sample size primarily reduces:",
        choices: ["Bias", "Variability (standard error)", "Both equally", "Neither"],
        answerIndex: 1,
        explanation: "More data reduces sampling variability but cannot fix systematic bias.",
      },
      {
        q: "Which is an example of wording bias?",
        choices: ["Survey takes 30 minutes.", "Asking 'Should the government waste tax dollars on this?' vs 'Should the government fund this?'", "Calling only landlines.", "Tracking only those who attended the event."],
        answerIndex: 1,
        explanation: "Loaded wording nudges the respondent; neutral phrasing avoids it.",
      },
    ],
  },

  "3.5": {
    id: "3.5",
    title: "Introduction to Experimental Design",
    summary:
      "Experiments impose treatments. Good designs use control, randomization, replication, and blinding to isolate the treatment effect.",
    lesson:
      "In an \\(\\textit{experiment}\\), the researcher assigns treatments (levels of an \\(\\textit{explanatory variable}\\), called a \\(\\textit{factor}\\)) to \\(\\textit{experimental units}\\) (subjects) and measures a response.\n\nFour principles of good design:\n\n\\(\\textbf{Control}\\): hold other variables constant and include a \\(\\textit{control group}\\) for comparison.\n\n\\(\\textbf{Randomization}\\): randomly assign subjects to treatments. This balances lurking variables and establishes causation.\n\n\\(\\textbf{Replication}\\): use enough subjects per treatment so results aren't due to chance. Not to be confused with replicating an entire study.\n\n\\(\\textbf{Blinding}\\): subjects (single-blind) or both subjects and evaluators (double-blind) don't know which treatment was given — prevents placebo and evaluator biases.\n\nA \\(\\textit{completely randomized design}\\) (CRD) randomly assigns every subject to a treatment group without regard to subject characteristics. Simple and works well when the group is fairly homogeneous.\n\nReport results as \"Subjects receiving the treatment showed X more than controls,\" with random assignment justifying a causal framing.",
    keyIdeas: [
      "Four principles: control, randomization, replication, blinding.",
      "Random assignment balances lurking variables.",
      "Blinding controls placebo and evaluator biases.",
      "CRD: randomly assign all units to treatments.",
    ],
    workedExample: {
      prompt:
        "Design an experiment to test whether a new shampoo increases shine vs an old shampoo.",
      solution:
        "Recruit, say, 100 volunteers. Randomly assign 50 to the new shampoo and 50 to the old (control). Neither subjects nor evaluators know who got which (double-blind). Measure shine after 4 weeks. Compare mean shine between groups. Random assignment + double-blind isolates the shampoo effect.",
    },
    flashcards: [
      { q: "What does randomization in an experiment accomplish?", a: "Balances lurking variables across treatment groups." },
      { q: "Why use blinding?", a: "Controls placebo and evaluator biases." },
      { q: "What is replication in an experiment?", a: "Using enough subjects per treatment so results aren't due to chance." },
    ],
    commonMistakes: [
      "Omitting the control group.",
      "Confusing random sampling (for generalization) with random assignment (for causation).",
      "Calling a study an experiment when no treatment is imposed.",
    ],
    quiz: [
      {
        q: "Which design principle primarily controls the placebo effect?",
        choices: ["Control", "Randomization", "Blinding", "Replication"],
        answerIndex: 2,
        explanation: "Blinding prevents subjects from knowing their treatment, controlling the placebo effect.",
      },
      {
        q: "A completely randomized design:",
        choices: ["Assigns subjects to treatments based on gender.", "Randomly assigns every subject to a treatment without regard to characteristics.", "Blocks by age before assigning.", "Matches subjects by pairs."],
        answerIndex: 1,
        explanation: "CRD ignores subject characteristics and assigns at random.",
      },
      {
        q: "Which is NOT a principle of experimental design?",
        choices: ["Control", "Randomization", "Blinding", "Bias"],
        answerIndex: 3,
        explanation: "Bias is a problem, not a principle.",
      },
      {
        q: "A researcher tests a drug on 5 patients and sees improvement. Biggest flaw?",
        choices: ["Lack of control group.", "Small sample size — insufficient replication.", "No randomization discussed.", "All of the above."],
        answerIndex: 3,
        explanation: "5 subjects, no control, no randomization — every principle is violated.",
      },
    ],
  },

  "3.6": {
    id: "3.6",
    title: "Selecting an Experimental Design",
    summary:
      "Randomized block designs group similar subjects before assigning treatments. Matched pairs is a special case where each block has size 2.",
    lesson:
      "When subjects differ in ways that affect the response, \\(\\textit{blocking}\\) reduces variability. A \\(\\textit{randomized block design}\\) groups subjects into \\(\\textbf{blocks}\\) of similar individuals, then randomly assigns treatments within each block.\n\nExample: testing a new teaching method. Students differ by grade level. Block by grade; within each grade, randomly assign half to the new method, half to the old. Now grade-level variability doesn't mask the treatment effect.\n\nA \\(\\textit{matched pairs design}\\) is a block of size 2. Pair subjects by relevant characteristics (identical twins, same subject before/after), then randomly assign treatments within each pair — or, for a before/after test, apply both treatments to each subject in random order.\n\nWhen to block vs not:\n- Block when you have a known source of variability (age, sex, prior performance).\n- Don't block on irrelevant variables — it doesn't help.\n\n\"Block what you can, randomize what you can't.\" Blocking controls for known variables; randomization controls for unknown ones.",
    keyIdeas: [
      "Randomized block design: group similar subjects, randomize within.",
      "Matched pairs: block size 2; pair by traits or use each subject as own control.",
      "Blocking reduces variability from known nuisance variables.",
      "Random assignment within blocks preserves causal inference.",
    ],
    workedExample: {
      prompt:
        "You want to test a new running shoe. Runners vary by ability. Describe a good design.",
      solution:
        "Randomized block design: group runners into blocks by ability (beginner, intermediate, advanced). Within each block, randomly assign half to new shoes and half to old. Compare performance within blocks. This removes ability-level variability from the comparison.",
    },
    flashcards: [
      { q: "Why block?", a: "To reduce variability from a known nuisance variable." },
      { q: "What is matched pairs?", a: "Block size 2 — pairs of similar subjects or a single subject before/after." },
      { q: "How do you assign treatments within a block?", a: "Randomly, just like in a CRD but scoped to the block." },
    ],
    commonMistakes: [
      "Blocking on the treatment variable itself.",
      "Failing to randomize within blocks.",
      "Calling a CRD a block design just because subjects vary.",
    ],
    quiz: [
      {
        q: "A researcher tests heart meds on patients who vary by age. Best design?",
        choices: ["CRD ignoring age.", "Randomized block design blocking by age group.", "Observational study.", "Voluntary response."],
        answerIndex: 1,
        explanation: "Age affects response; blocking by age reduces its noise in the comparison.",
      },
      {
        q: "A matched pairs design is best when:",
        choices: ["Subjects are highly diverse.", "Subjects can be paired by a relevant characteristic or used as their own control.", "Treatments must be randomized.", "Only observational data is available."],
        answerIndex: 1,
        explanation: "Matched pairs leverages natural pairings to remove within-pair variability.",
      },
      {
        q: "Blocking by a variable unrelated to the response:",
        choices: ["Reduces variability.", "Adds precision.", "Doesn't help — the block isn't relevant.", "Is always better than CRD."],
        answerIndex: 2,
        explanation: "Blocking only reduces variability when blocks differ in the response.",
      },
      {
        q: "Within each block of a randomized block design, treatments should be assigned:",
        choices: ["By convenience.", "Based on subject preference.", "Randomly.", "Alphabetically."],
        answerIndex: 2,
        explanation: "Randomization within blocks is what preserves causal inference.",
      },
    ],
  },

  "3.7": {
    id: "3.7",
    title: "Inference and Experiments",
    summary:
      "What you conclude depends on your methods. Random sampling → generalize; random assignment → causation. Both → generalizable causal claims.",
    lesson:
      "This is the capstone of Unit 3. Given a study, decide what conclusions are valid.\n\n\\(\\textbf{Random sampling only}\\): generalize to the population, but cannot claim causation (observational).\n\n\\(\\textbf{Random assignment only}\\): can claim causation within the subjects studied, but cannot generalize beyond the (possibly non-random) sample.\n\n\\(\\textbf{Both}\\): can claim causation and generalize to the population. Gold standard.\n\n\\(\\textbf{Neither}\\): only describe the collected data — no inference to anyone else, no causation.\n\nOn FRQs, the scoring rubric often awards a point specifically for this distinction. Use the exact language: \"Because subjects were randomly assigned to treatments, we can conclude the treatment caused the observed difference. However, because the sample was not random, we cannot generalize beyond these participants.\"\n\nAnother nuance: in an experiment, \\(\\textit{statistical significance}\\) (a small p-value) indicates the observed difference is unlikely to be due to chance — it supports a causal interpretation \\(\\textit{only}\\) if random assignment was used.",
    keyIdeas: [
      "Random sampling → generalize to population.",
      "Random assignment → causal conclusions about subjects.",
      "Both → generalizable causal claims.",
      "Neither → only describe the data.",
    ],
    workedExample: {
      prompt:
        "A professor uses her own 30 students to test a new study method, randomly assigning 15 to use it and 15 to use the old method. The new method students scored higher. What can she conclude?",
      solution:
        "Random assignment was used, so she can conclude the new study method caused higher scores among her 30 students. Because the sample wasn't random (her own class), she cannot generalize to all students.",
    },
    flashcards: [
      { q: "Random sampling enables?", a: "Generalization to the population." },
      { q: "Random assignment enables?", a: "Causal inference about the sample." },
      { q: "Both random methods enable?", a: "Generalizable causal conclusions." },
    ],
    commonMistakes: [
      "Claiming causation without random assignment.",
      "Generalizing without random sampling.",
      "Conflating sampling and assignment.",
    ],
    quiz: [
      {
        q: "A study with random sampling but no random assignment finds a strong association. You can:",
        choices: ["Claim causation and generalize.", "Claim causation only.", "Generalize but not claim causation.", "Neither."],
        answerIndex: 2,
        explanation: "Random sampling supports generalization; no random assignment blocks causal claims.",
      },
      {
        q: "A randomized experiment on volunteer subjects shows treatment effect. Inference:",
        choices: ["Generalizable to the population and causal.", "Causal for these volunteers; not generalizable.", "Generalizable but not causal.", "Neither."],
        answerIndex: 1,
        explanation: "Random assignment gives causation within studied group; volunteers aren't random sample.",
      },
      {
        q: "Which is the gold standard for establishing a generalizable causal claim?",
        choices: ["Observational study.", "Experiment on convenience sample.", "Random sampling + random assignment.", "Large sample size alone."],
        answerIndex: 2,
        explanation: "Both random sampling and random assignment are needed.",
      },
      {
        q: "Statistical significance from an observational study tells you:",
        choices: ["The result is likely causal.", "The association is unlikely due to chance, but causation isn't established without random assignment.", "The population follows a normal distribution.", "The sample is representative."],
        answerIndex: 1,
        explanation: "Significance rules out chance, not confounding. Random assignment is needed for causation.",
      },
    ],
  },

  "4.1": {
    id: "4.1",
    title: "Introducing Statistics: Random and Non-Random Patterns",
    summary:
      "Probability lets us quantify long-run patterns in random phenomena. The Law of Large Numbers links sample proportion to true probability.",
    lesson:
      "A \\(\\textit{random phenomenon}\\) has individual outcomes that are uncertain but a long-run pattern of regular proportions. Flipping a fair coin: any single flip is unpredictable, but the long-run proportion of heads settles near 0.5.\n\nThe \\(\\textbf{Law of Large Numbers (LLN)}\\): as the number of trials grows, the relative frequency of an outcome converges to the true probability. Short-run streaks are normal; long-run stability is the rule.\n\nThis is the basis for using simulation and data to estimate probabilities. It's also why small samples can mislead — the LLN needs many trials.\n\nA common misconception is the \\(\\textit{gambler's fallacy}\\): after several tails, a head is \"due.\" But trials are independent — the coin has no memory. Past outcomes don't change future probabilities.",
    keyIdeas: [
      "Random phenomena: individually uncertain, long-run predictable.",
      "Law of Large Numbers: sample proportion → true probability as n grows.",
      "Independence: past trials don't affect future ones.",
      "Gambler's fallacy is wrong — no \"due\" for random events.",
    ],
    workedExample: {
      prompt:
        "A coin has landed tails 10 times in a row. What's the probability it lands heads next flip (assuming a fair coin)?",
      solution:
        "0.5. Each flip is independent, so past outcomes don't influence the next flip. The LLN says long-run frequencies will settle near 0.5, but that doesn't mean heads is \"due\" now.",
    },
    flashcards: [
      { q: "State the Law of Large Numbers.", a: "As n grows, sample proportion converges to the true probability." },
      { q: "What's the gambler's fallacy?", a: "Believing past outcomes affect independent future ones." },
      { q: "Random phenomenon definition?", a: "Outcomes uncertain in the short run but with long-run regularity." },
    ],
    commonMistakes: [
      "Applying LLN to small samples.",
      "Believing past results influence independent future trials.",
      "Confusing short-run variability with bias.",
    ],
    quiz: [
      {
        q: "A coin is fair. After 5 heads in a row, the probability of heads on the next flip is:",
        choices: ["Less than 0.5", "0.5", "Greater than 0.5", "Depends on previous flips"],
        answerIndex: 1,
        explanation: "Independence: each flip is 0.5 regardless of history.",
      },
      {
        q: "The Law of Large Numbers says:",
        choices: ["Sample mean is always greater than population mean.", "Sample proportion approaches the true probability as sample size grows.", "Every sample is representative.", "Large samples are always random."],
        answerIndex: 1,
        explanation: "LLN: long-run relative frequency approaches the true probability.",
      },
      {
        q: "The gambler's fallacy involves:",
        choices: ["Belief that independent events influence each other based on history.", "Overestimating small probabilities.", "Random assignment.", "Running large experiments."],
        answerIndex: 0,
        explanation: "The fallacy treats independent events as if they compensate for each other.",
      },
      {
        q: "10 tosses of a fair coin yielded 7 heads. The LLN predicts that:",
        choices: ["The next toss will be tails.", "With more tosses, the proportion of heads will approach 0.5.", "The coin is biased.", "All future tosses average to 0.5."],
        answerIndex: 1,
        explanation: "Long-run convergence to 0.5, not short-run balance.",
      },
    ],
  },

  "4.2": {
    id: "4.2",
    title: "Estimating Probabilities Using Simulation",
    summary:
      "Simulations approximate probabilities by generating many random trials. A simulation mimics the random process and records outcomes.",
    lesson:
      "When exact probability calculations are hard or impossible, \\(\\textit{simulation}\\) is the workaround. Design a random procedure that mimics the real situation, run it many times, and count the fraction of trials matching the event of interest.\n\nSteps for a simulation:\n1. State the event and variable of interest.\n2. Describe the random mechanism (coin, die, random digits from a table or calculator).\n3. Define what counts as a \"success\" and how many trials make up one replication.\n4. Run the simulation many times (100+).\n5. Estimate the probability as successes / trials.\n\nExample: probability at least 1 in a group of 23 people shares a birthday? Simulate by generating 23 random birthdays, check for a match, repeat 10,000 times, and compute the fraction with at least one match (~0.507).\n\nSimulation is especially powerful when analytical solutions are intractable. Always describe the setup clearly on FRQs; graders want reproducibility.",
    keyIdeas: [
      "Simulation estimates probability through many random trials.",
      "Clearly define: trial, success, random mechanism, number of repetitions.",
      "More trials = better estimate (LLN).",
      "Simulation is a fallback when analytical methods are hard.",
    ],
    workedExample: {
      prompt:
        "Use a random digit table to estimate the probability of at least 2 heads in 3 fair-coin flips.",
      solution:
        "Assign even digit = head, odd = tail. Read 3 digits at a time; each trio is one trial. Count trials with at least 2 evens. Over, say, 100 trials, count successes and divide. True probability: \\(P(X \\ge 2) = \\binom{3}{2}(.5)^3 + \\binom{3}{3}(.5)^3 = 0.5\\). Simulation should land near 0.5.",
    },
    flashcards: [
      { q: "When is simulation useful?", a: "When exact probability is hard to compute analytically." },
      { q: "How to design a simulation?", a: "State event, random mechanism, trial definition, success rule, repeat many times." },
      { q: "Estimating probability from simulation?", a: "Successes divided by total trials." },
    ],
    commonMistakes: [
      "Running only a few trials and trusting the estimate.",
      "Not defining what constitutes a success clearly.",
      "Using non-random mechanisms as the simulation source.",
    ],
    quiz: [
      {
        q: "Simulation is MOST useful when:",
        choices: ["The exact probability is simple to compute.", "The random process is too complex for direct calculation.", "Data are categorical.", "There's no randomness."],
        answerIndex: 1,
        explanation: "Simulation shines when analytical approaches are hard or impossible.",
      },
      {
        q: "A simulation with 1000 trials yielded 340 successes. Estimate probability:",
        choices: ["0.034", "0.34", "3.4", "Cannot determine"],
        answerIndex: 1,
        explanation: "\\(340/1000 = 0.34\\).",
      },
      {
        q: "To improve simulation accuracy, you should:",
        choices: ["Increase trials.", "Change the random mechanism.", "Use smaller samples.", "Pick favorable digits."],
        answerIndex: 0,
        explanation: "LLN — more trials, better estimate.",
      },
      {
        q: "Proper setup for simulation requires clearly defining:",
        choices: ["Random mechanism, one trial, success condition, number of trials.", "Only the random mechanism.", "Just the number of trials.", "Only the event."],
        answerIndex: 0,
        explanation: "All four elements are essential for a valid simulation.",
      },
    ],
  },

  "4.3": {
    id: "4.3",
    title: "Introduction to Probability",
    summary:
      "Probability measures likelihood between 0 and 1. The complement rule, addition rule, and basic definitions underpin everything in Unit 4.",
    lesson:
      "A \\(\\textit{probability}\\) \\(P(A)\\) is a number between 0 and 1 that measures how likely event \\(A\\) is. \\(P(A) = 0\\) means \\(A\\) is impossible; \\(P(A) = 1\\) means \\(A\\) is certain.\n\nFor equally likely outcomes, \\(P(A) = \\dfrac{\\#\\text{ outcomes in } A}{\\#\\text{ total outcomes}}\\).\n\n\\(\\textbf{Complement rule}\\): \\(P(A^c) = 1 - P(A)\\). The probability \\(A\\) does NOT happen equals 1 minus the probability it does.\n\n\\(\\textbf{Addition rule (general)}\\): \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\). The union equals the sum minus the overlap.\n\n\\(\\textbf{Sample space}\\) \\(S\\): set of all possible outcomes. \\(P(S) = 1\\).\n\nProbabilities obey three axioms: non-negative, total = 1, additive for disjoint events. Any rule in Unit 4 traces back to these.",
    keyIdeas: [
      "\\(0 \\le P(A) \\le 1\\); \\(P(S) = 1\\).",
      "Complement: \\(P(A^c) = 1 - P(A)\\).",
      "General addition: \\(P(A\\cup B) = P(A) + P(B) - P(A\\cap B)\\).",
      "Sample space = all possible outcomes.",
    ],
    workedExample: {
      prompt:
        "In a class, \\(P(\\text{likes math}) = 0.6\\), \\(P(\\text{likes science}) = 0.5\\), \\(P(\\text{both}) = 0.3\\). Find \\(P(\\text{likes at least one})\\).",
      solution:
        "\\(P(M \\cup S) = 0.6 + 0.5 - 0.3 = 0.8\\). About 80% like at least one of the two.",
    },
    flashcards: [
      { q: "Complement rule?", a: "\\(P(A^c) = 1 - P(A)\\)." },
      { q: "General addition rule?", a: "\\(P(A\\cup B) = P(A) + P(B) - P(A\\cap B)\\)." },
      { q: "What is a sample space?", a: "The set of all possible outcomes; \\(P(S) = 1\\)." },
    ],
    commonMistakes: [
      "Forgetting to subtract \\(P(A\\cap B)\\) in the addition rule.",
      "Reporting a probability greater than 1.",
      "Using union when the context implies intersection.",
    ],
    quiz: [
      {
        q: "If \\(P(A) = 0.3\\), then \\(P(A^c) = \\)",
        choices: ["0.3", "0.7", "1.3", "0"],
        answerIndex: 1,
        explanation: "Complement: \\(1 - 0.3 = 0.7\\).",
      },
      {
        q: "For events with \\(P(A) = 0.4, P(B) = 0.5, P(A\\cap B) = 0.2\\): \\(P(A\\cup B)\\) is:",
        choices: ["0.9", "0.7", "0.1", "1.1"],
        answerIndex: 1,
        explanation: "\\(0.4 + 0.5 - 0.2 = 0.7\\).",
      },
      {
        q: "A valid probability must be:",
        choices: ["Between \\(-1\\) and 1.", "Between 0 and 1 inclusive.", "An integer.", "Greater than 0."],
        answerIndex: 1,
        explanation: "All probabilities live in \\([0, 1]\\).",
      },
      {
        q: "Events with \\(P(A) = 0.5, P(B) = 0.6\\). If students claim \\(P(A\\cup B) = 1.1\\), what's wrong?",
        choices: ["Probabilities can exceed 1 sometimes.", "You forgot to subtract \\(P(A\\cap B)\\).", "Nothing is wrong.", "\\(P(A)\\) should be less than \\(P(B)\\)."],
        answerIndex: 1,
        explanation: "Without subtracting the overlap, union can exceed 1 — impossible.",
      },
    ],
  },

  "4.4": {
    id: "4.4",
    title: "Mutually Exclusive Events",
    summary:
      "Mutually exclusive (disjoint) events cannot occur together: \\(P(A\\cap B) = 0\\). Then \\(P(A\\cup B) = P(A) + P(B)\\).",
    lesson:
      "Two events are \\(\\textit{mutually exclusive}\\) (a.k.a. \\(\\textit{disjoint}\\)) if they cannot both happen in a single trial. Examples: rolling a 3 vs rolling a 5 on one die — disjoint. Raining today vs snowing today — possibly disjoint depending on how you define them.\n\nIf \\(A\\) and \\(B\\) are mutually exclusive, \\(P(A\\cap B) = 0\\). The addition rule simplifies: \\(P(A\\cup B) = P(A) + P(B)\\).\n\nMutual exclusivity is \\(\\textbf{not}\\) the same as \\(\\textbf{independence}\\). Mutually exclusive events cannot both happen, so knowing one happened tells you the other didn't — they're strongly dependent. Independent events can both happen; one's occurrence doesn't change the other's probability.\n\nTo check mutual exclusivity: is it possible for both to occur in one trial? If no, disjoint. If yes, not disjoint.",
    keyIdeas: [
      "Mutually exclusive: cannot both occur; \\(P(A\\cap B) = 0\\).",
      "Disjoint events: \\(P(A\\cup B) = P(A) + P(B)\\).",
      "Mutually exclusive \\(\\ne\\) independent (they're the opposite, in fact).",
      "Check: can both occur in a single trial?",
    ],
    workedExample: {
      prompt:
        "A card is drawn. Let A = card is a King, B = card is a Queen. Are A and B mutually exclusive? Find \\(P(A\\cup B)\\).",
      solution:
        "A card can't be both a King and a Queen, so A and B are mutually exclusive. \\(P(A) = 4/52, P(B) = 4/52\\). \\(P(A\\cup B) = 4/52 + 4/52 = 8/52 \\approx 0.154\\).",
    },
    flashcards: [
      { q: "Definition of mutually exclusive?", a: "Events cannot both occur in a single trial." },
      { q: "For disjoint events, \\(P(A\\cap B)\\) = ?", a: "0." },
      { q: "Are mutually exclusive events independent?", a: "No — they're strongly dependent (one implies the other didn't happen)." },
    ],
    commonMistakes: [
      "Confusing mutually exclusive with independent.",
      "Using \\(P(A) + P(B)\\) for events that overlap.",
      "Thinking rare = disjoint.",
    ],
    quiz: [
      {
        q: "Events A and B are mutually exclusive. Which is TRUE?",
        choices: ["\\(P(A\\cap B) = P(A)\\cdot P(B)\\)", "\\(P(A\\cap B) = 0\\)", "They are independent.", "\\(P(A) = P(B)\\)"],
        answerIndex: 1,
        explanation: "Disjoint events cannot co-occur; intersection probability is 0.",
      },
      {
        q: "\\(P(A) = 0.3, P(B) = 0.4\\), A and B are disjoint. \\(P(A\\cup B) = \\)",
        choices: ["0.7", "0.12", "0.3", "0.58"],
        answerIndex: 0,
        explanation: "Disjoint: \\(P(A\\cup B) = P(A) + P(B) = 0.7\\).",
      },
      {
        q: "Mutually exclusive events with nonzero probabilities are:",
        choices: ["Always independent.", "Never independent.", "Independent only if P(A) = P(B).", "Always complementary."],
        answerIndex: 1,
        explanation: "Knowing A occurred tells you B didn't — strongly dependent.",
      },
      {
        q: "Rolling a 1 or a 2 on a die: the events are disjoint. \\(P(1\\text{ or }2) = \\)",
        choices: ["1/36", "2/6", "1/6", "3/6"],
        answerIndex: 1,
        explanation: "\\(1/6 + 1/6 = 2/6 = 1/3\\).",
      },
    ],
  },

  "4.5": {
    id: "4.5",
    title: "Conditional Probability",
    summary:
      "\\(P(A|B) = P(A\\cap B)/P(B)\\) — the probability of A given that B occurred. It restricts the sample space to B.",
    lesson:
      "Conditional probability asks: given that event \\(B\\) has occurred, what's the probability \\(A\\) also occurred?\n\nFormula: \\(P(A|B) = \\dfrac{P(A\\cap B)}{P(B)}\\), provided \\(P(B) > 0\\).\n\nIntuition: restrict the sample space to those outcomes where \\(B\\) happened, then ask what fraction of those have \\(A\\).\n\nFrom a two-way table: \\(P(A|B) = \\dfrac{\\text{cell count for } A\\cap B}{\\text{row/column total for } B}\\).\n\nThe \\(\\textbf{general multiplication rule}\\) rearranges: \\(P(A\\cap B) = P(B)\\cdot P(A|B)\\). This works even when events aren't independent.\n\n\\(P(A|B)\\) and \\(P(B|A)\\) are different in general. Don't swap them — Bayes's theorem ties them together but requires knowing marginals.",
    keyIdeas: [
      "\\(P(A|B) = P(A\\cap B)/P(B)\\).",
      "Conditional probability restricts to \\(B\\).",
      "General multiplication: \\(P(A\\cap B) = P(B)\\cdot P(A|B)\\).",
      "\\(P(A|B) \\ne P(B|A)\\) in general.",
    ],
    workedExample: {
      prompt:
        "60% of students take Spanish; 40% take both Spanish and French. Find \\(P(\\text{French} | \\text{Spanish})\\).",
      solution:
        "\\(P(F|S) = P(F\\cap S)/P(S) = 0.40/0.60 = 2/3 \\approx 0.667\\). Among Spanish-takers, 67% also take French.",
    },
    flashcards: [
      { q: "Conditional probability formula?", a: "\\(P(A|B) = P(A\\cap B)/P(B)\\)." },
      { q: "General multiplication rule?", a: "\\(P(A\\cap B) = P(B)P(A|B) = P(A)P(B|A)\\)." },
      { q: "How to get \\(P(A|B)\\) from a two-way table?", a: "Cell count for \\(A\\cap B\\) divided by B's row or column total." },
    ],
    commonMistakes: [
      "Confusing \\(P(A|B)\\) with \\(P(B|A)\\).",
      "Dividing by grand total instead of by \\(P(B)\\).",
      "Using \\(P(A\\cap B) = P(A)\\cdot P(B)\\) without verifying independence.",
    ],
    quiz: [
      {
        q: "If \\(P(A\\cap B) = 0.2\\) and \\(P(B) = 0.5\\), \\(P(A|B) = \\)",
        choices: ["0.1", "0.4", "0.7", "2.5"],
        answerIndex: 1,
        explanation: "\\(P(A|B) = 0.2/0.5 = 0.4\\).",
      },
      {
        q: "Which best describes \\(P(A|B)\\)?",
        choices: ["Probability that either A or B occurs.", "Probability of A given B has occurred.", "Probability that A and B both occur.", "Probability of A, ignoring B."],
        answerIndex: 1,
        explanation: "Conditional probability is the \"given\" probability.",
      },
      {
        q: "Out of 200 people, 80 smoke. Among smokers, 30 have heart disease. \\(P(\\text{HD} | \\text{smoke}) = \\)",
        choices: ["30/200", "30/80", "80/200", "50/200"],
        answerIndex: 1,
        explanation: "Given smoke, restrict to 80; 30 have HD: \\(30/80\\).",
      },
      {
        q: "A student says 'If P(A|B) = 0.6, then P(B|A) = 0.6.' This is:",
        choices: ["Always true.", "True only if P(A) = P(B).", "Always false.", "Only true if A and B are disjoint."],
        answerIndex: 1,
        explanation: "By Bayes: \\(P(B|A) = P(A|B)P(B)/P(A)\\); equal only when \\(P(A) = P(B)\\).",
      },
    ],
  },

  "4.6": {
    id: "4.6",
    title: "Independent Events and Unions of Events",
    summary:
      "Events are independent if \\(P(A|B) = P(A)\\). Then \\(P(A\\cap B) = P(A)\\cdot P(B)\\). General addition still applies for unions.",
    lesson:
      "Events \\(A\\) and \\(B\\) are \\(\\textit{independent}\\) if the occurrence of one doesn't change the probability of the other: \\(P(A|B) = P(A)\\), or equivalently \\(P(B|A) = P(B)\\).\n\nIf independent, the \\(\\textbf{multiplication rule}\\) simplifies: \\(P(A\\cap B) = P(A)\\cdot P(B)\\).\n\nTo check independence from a table: compare \\(P(A|B)\\) to \\(P(A)\\). If equal (at all levels), independent. Any inequality means dependent.\n\nFor unions, always use the general rule: \\(P(A\\cup B) = P(A) + P(B) - P(A\\cap B)\\). If independent, \\(P(A\\cap B) = P(A)P(B)\\). If disjoint, \\(P(A\\cap B) = 0\\).\n\nIndependence \\(\\ne\\) mutually exclusive. In fact, mutually exclusive events with nonzero probabilities are dependent.\n\n\"At least one\" problems often use the complement: \\(P(\\text{at least one}) = 1 - P(\\text{none})\\). If \\(n\\) independent trials with success prob \\(p\\), \\(P(\\text{at least one}) = 1 - (1-p)^n\\).",
    keyIdeas: [
      "Independent: \\(P(A|B) = P(A)\\) ↔ \\(P(A\\cap B) = P(A)P(B)\\).",
      "General addition rule for unions.",
      "Independent \\(\\ne\\) disjoint.",
      "At-least-one: complement trick, \\(1 - (1-p)^n\\).",
    ],
    workedExample: {
      prompt:
        "A fair coin is flipped 3 times. Find \\(P(\\text{at least one head})\\).",
      solution:
        "Use complement. \\(P(\\text{no heads}) = (0.5)^3 = 0.125\\). \\(P(\\text{at least 1 head}) = 1 - 0.125 = 0.875\\).",
    },
    flashcards: [
      { q: "Independence condition?", a: "\\(P(A|B) = P(A)\\) or equivalently \\(P(A\\cap B) = P(A)P(B)\\)." },
      { q: "At-least-one probability trick?", a: "\\(1 - P(\\text{none})\\)." },
      { q: "Are disjoint events independent?", a: "No — they're dependent (one implies the other didn't happen)." },
    ],
    commonMistakes: [
      "Assuming independence without checking.",
      "Confusing independent with mutually exclusive.",
      "Computing \\(P(A\\cup B)\\) as \\(P(A) + P(B)\\) for independent (not disjoint) events.",
    ],
    quiz: [
      {
        q: "Two independent events A, B have \\(P(A) = 0.3, P(B) = 0.4\\). \\(P(A\\cap B) = \\)",
        choices: ["0.12", "0.7", "0.1", "0.75"],
        answerIndex: 0,
        explanation: "\\(P(A\\cap B) = P(A)P(B) = 0.3(0.4) = 0.12\\).",
      },
      {
        q: "\\(P(\\text{at least one defective in 5 independent items, each with } p=0.1)\\):",
        choices: ["0.5", "0.4095", "0.9", "0.1"],
        answerIndex: 1,
        explanation: "\\(1 - (0.9)^5 \\approx 0.4095\\).",
      },
      {
        q: "Events A and B: \\(P(A) = 0.5, P(B) = 0.4, P(A\\cap B) = 0.2\\). Are they independent?",
        choices: ["Yes, because \\(P(A\\cap B) = 0.2 = P(A)\\cdot P(B)\\).", "No.", "Insufficient info.", "Only if disjoint."],
        answerIndex: 0,
        explanation: "\\(P(A)P(B) = 0.5(0.4) = 0.2 = P(A\\cap B)\\) → independent.",
      },
      {
        q: "If A and B are mutually exclusive with nonzero probability, they are:",
        choices: ["Independent", "Dependent", "Complementary always", "Equal in probability"],
        answerIndex: 1,
        explanation: "One occurring means the other can't — strongly dependent.",
      },
    ],
  },

  "4.7": {
    id: "4.7",
    title: "Introduction to Random Variables and Probability Distributions",
    summary:
      "A random variable assigns numbers to outcomes. Discrete RVs have probability mass functions; continuous RVs have density functions.",
    lesson:
      "A \\(\\textit{random variable}\\) \\(X\\) assigns a numerical value to each outcome in a sample space. For example, \\(X\\) = number of heads in 3 flips has possible values 0, 1, 2, 3.\n\n\\(\\textbf{Discrete RV}\\): countable outcomes (usually integers). Described by a \\(\\textit{probability distribution}\\) (PMF): a list or formula giving \\(P(X = x)\\) for each value. Probabilities sum to 1.\n\n\\(\\textbf{Continuous RV}\\): can take any value in an interval (e.g. height). Described by a \\(\\textit{density function}\\); probabilities come from areas under the curve. \\(P(X = a) = 0\\) for any single value — only ranges have probability.\n\nA valid probability distribution: each \\(P(X = x) \\in [0, 1]\\), and \\(\\sum P(X = x) = 1\\) (discrete) or total area = 1 (continuous).\n\nExpected value and variance (next topic) come from the distribution.",
    keyIdeas: [
      "Random variable: number assigned to each outcome.",
      "Discrete: PMF \\(P(X = x)\\); sums to 1.",
      "Continuous: density; probabilities are areas.",
      "Continuous \\(P(X = a) = 0\\) for any point.",
    ],
    workedExample: {
      prompt:
        "\\(X\\) = number of heads in 2 flips of a fair coin. Write the PMF.",
      solution:
        "Possible values: 0, 1, 2. \\(P(X = 0) = 0.25\\) (TT), \\(P(X = 1) = 0.5\\) (HT, TH), \\(P(X = 2) = 0.25\\) (HH). Sums to 1 — valid.",
    },
    flashcards: [
      { q: "What is a random variable?", a: "A numerical summary of a random outcome." },
      { q: "Discrete vs continuous RV?", a: "Discrete has countable values; continuous takes any value in an interval." },
      { q: "For continuous RV, what is \\(P(X = a)\\)?", a: "Zero — only intervals have positive probability." },
    ],
    commonMistakes: [
      "Probabilities summing to more or less than 1.",
      "Treating continuous RV probabilities as point values.",
      "Confusing random variables with events.",
    ],
    quiz: [
      {
        q: "For discrete RV X with \\(P(X=1)=0.3, P(X=2)=0.4, P(X=3)=?\\), the missing probability:",
        choices: ["0.1", "0.3", "0.2", "0.4"],
        answerIndex: 1,
        explanation: "Sum must be 1: \\(1 - 0.3 - 0.4 = 0.3\\).",
      },
      {
        q: "For continuous RV X, \\(P(X = 5)\\) is:",
        choices: ["Always 0.5", "0", "1", "Undefined"],
        answerIndex: 1,
        explanation: "Single points have zero probability for continuous RVs.",
      },
      {
        q: "A discrete RV distribution must satisfy:",
        choices: ["Each probability in \\([0,1]\\) and sum = 1.", "Each probability = 1.", "Sum = 0.", "Only positive values allowed."],
        answerIndex: 0,
        explanation: "Valid PMF: probabilities in \\([0,1]\\), summing to 1.",
      },
      {
        q: "Which is a continuous random variable?",
        choices: ["Number of children in a family", "Height of a person", "Number of heads in 10 flips", "Score on a 5-question quiz"],
        answerIndex: 1,
        explanation: "Height can take any value in a range — continuous.",
      },
    ],
  },

  "4.8": {
    id: "4.8",
    title: "Mean and Standard Deviation of Random Variables",
    summary:
      "Expected value \\(\\mu_X = \\sum x \\cdot P(X = x)\\); variance \\(\\sigma_X^2 = \\sum (x - \\mu_X)^2 P(X = x)\\).",
    lesson:
      "The \\(\\textit{expected value}\\) (mean) of a discrete RV is \\(\\mu_X = E(X) = \\sum x\\cdot P(X = x)\\). It's the long-run average if you observed \\(X\\) repeatedly.\n\nThe \\(\\textit{variance}\\) is \\(\\sigma_X^2 = \\text{Var}(X) = \\sum (x - \\mu_X)^2 P(X = x)\\). Standard deviation \\(\\sigma_X = \\sqrt{\\sigma_X^2}\\) is in the same units as \\(X\\).\n\nInterpret the mean in context: \"The long-run average number of heads in 10 flips is 5.\" Interpret the SD: \"Number of heads typically differs from the mean by about 1.58.\"\n\nFor a discrete distribution table, compute both in one pass: multiply each \\(x\\) by \\(P(X = x)\\) for the mean; then compute deviations, square them, multiply by probabilities, and sum for variance.\n\n\\(\\textbf{Linear transformations}\\): if \\(Y = aX + b\\), then \\(\\mu_Y = a\\mu_X + b\\) and \\(\\sigma_Y = |a|\\sigma_X\\) (shift doesn't change spread; scaling scales SD by \\(|a|\\)).",
    keyIdeas: [
      "\\(\\mu_X = \\sum x \\cdot P(X=x)\\).",
      "\\(\\sigma_X^2 = \\sum (x - \\mu_X)^2 P(X=x)\\); \\(\\sigma_X = \\sqrt{\\sigma_X^2}\\).",
      "Mean: long-run average. SD: typical distance from mean.",
      "Linear transformation: \\(Y = aX + b \\Rightarrow \\mu_Y = a\\mu_X + b, \\sigma_Y = |a|\\sigma_X\\).",
    ],
    workedExample: {
      prompt:
        "X takes values 1, 2, 3 with probabilities 0.2, 0.5, 0.3. Find \\(\\mu_X\\) and \\(\\sigma_X\\).",
      solution:
        "\\(\\mu_X = 1(0.2) + 2(0.5) + 3(0.3) = 0.2 + 1 + 0.9 = 2.1\\). Variance: \\((1 - 2.1)^2(0.2) + (2-2.1)^2(0.5) + (3-2.1)^2(0.3) = 0.242 + 0.005 + 0.243 = 0.49\\). \\(\\sigma_X = \\sqrt{0.49} = 0.7\\).",
    },
    flashcards: [
      { q: "Expected value formula?", a: "\\(\\mu_X = \\sum x\\cdot P(X=x)\\)." },
      { q: "Variance formula?", a: "\\(\\sigma_X^2 = \\sum (x - \\mu_X)^2 P(X=x)\\)." },
      { q: "Linear transform: \\(Y = aX + b\\). What happens to mean and SD?", a: "\\(\\mu_Y = a\\mu_X + b\\); \\(\\sigma_Y = |a|\\sigma_X\\)." },
    ],
    commonMistakes: [
      "Forgetting to multiply by probabilities in the mean.",
      "Using \\(n - 1\\) divisor for a true distribution (that's for samples).",
      "Letting the shift constant affect SD.",
    ],
    quiz: [
      {
        q: "X: values 0, 1, 2 with probs 0.5, 0.3, 0.2. E(X) = ?",
        choices: ["0.5", "0.7", "1.0", "1.5"],
        answerIndex: 1,
        explanation: "\\(0(0.5) + 1(0.3) + 2(0.2) = 0.7\\).",
      },
      {
        q: "Let Y = 3X + 5. If \\(\\mu_X = 2, \\sigma_X = 4\\), then \\(\\mu_Y, \\sigma_Y\\):",
        choices: ["(11, 12)", "(6, 4)", "(11, 4)", "(6, 12)"],
        answerIndex: 0,
        explanation: "\\(\\mu_Y = 3(2)+5 = 11; \\sigma_Y = 3(4) = 12\\).",
      },
      {
        q: "The expected value of a random variable is BEST interpreted as:",
        choices: ["The most likely value", "The long-run average over many trials", "The median", "The mode"],
        answerIndex: 1,
        explanation: "\\(E(X)\\) is the long-run mean, not necessarily a possible value.",
      },
      {
        q: "A shift \\(Y = X + 10\\). What happens to variance?",
        choices: ["Increases by 100", "Unchanged", "Increases by 10", "Decreases"],
        answerIndex: 1,
        explanation: "Adding a constant shifts the mean but leaves variance unchanged.",
      },
    ],
  },

  "4.9": {
    id: "4.9",
    title: "Combining Random Variables",
    summary:
      "For any RVs: \\(\\mu_{X \\pm Y} = \\mu_X \\pm \\mu_Y\\). If INDEPENDENT: \\(\\sigma^2_{X \\pm Y} = \\sigma_X^2 + \\sigma_Y^2\\) (variances add).",
    lesson:
      "Means of combined RVs add with the sign of the operation, always:\n\\(E(X + Y) = \\mu_X + \\mu_Y\\) and \\(E(X - Y) = \\mu_X - \\mu_Y\\). This holds whether or not X and Y are independent.\n\n\\(\\textbf{Variances add only when variables are INDEPENDENT}\\), and they always \\(\\textbf{add}\\), not subtract:\n\\(\\text{Var}(X + Y) = \\sigma_X^2 + \\sigma_Y^2\\)\n\\(\\text{Var}(X - Y) = \\sigma_X^2 + \\sigma_Y^2\\) (same!)\n\nStandard deviations do NOT add: compute variance first, then square root.\n\nLinear combinations: \\(\\text{Var}(aX + bY) = a^2\\sigma_X^2 + b^2\\sigma_Y^2\\) (independent). Scale factors square.\n\nIntuition: subtracting two independent variables magnifies, not cancels, variability — both sources of noise still matter.",
    keyIdeas: [
      "\\(\\mu_{X\\pm Y} = \\mu_X \\pm \\mu_Y\\) (always).",
      "\\(\\sigma^2_{X\\pm Y} = \\sigma_X^2 + \\sigma_Y^2\\) (independent).",
      "SDs never simply add; compute variance then take square root.",
      "Linear combo: \\(\\text{Var}(aX + bY) = a^2\\sigma_X^2 + b^2\\sigma_Y^2\\) (independent).",
    ],
    workedExample: {
      prompt:
        "Independent X, Y: \\(\\mu_X = 10, \\sigma_X = 3, \\mu_Y = 5, \\sigma_Y = 4\\). Find \\(\\mu_{X-Y}\\) and \\(\\sigma_{X-Y}\\).",
      solution:
        "\\(\\mu_{X-Y} = 10 - 5 = 5\\). Variance: \\(\\sigma_X^2 + \\sigma_Y^2 = 9 + 16 = 25\\). \\(\\sigma_{X-Y} = \\sqrt{25} = 5\\).",
    },
    flashcards: [
      { q: "Mean of X+Y or X-Y?", a: "\\(\\mu_X \\pm \\mu_Y\\) — works either way." },
      { q: "Variance of X-Y for independent RVs?", a: "\\(\\sigma_X^2 + \\sigma_Y^2\\) (variances add)." },
      { q: "Linear combination variance?", a: "\\(\\text{Var}(aX + bY) = a^2\\sigma_X^2 + b^2\\sigma_Y^2\\) for independent X, Y." },
    ],
    commonMistakes: [
      "Subtracting variances when computing Var(X - Y).",
      "Adding SDs directly instead of variances.",
      "Forgetting to square scale factors in linear combos.",
    ],
    quiz: [
      {
        q: "Independent X, Y: \\(\\sigma_X = 3, \\sigma_Y = 4\\). \\(\\sigma_{X+Y} = \\)",
        choices: ["7", "\\(\\sqrt{25} = 5\\)", "12", "1"],
        answerIndex: 1,
        explanation: "Variances add: \\(9 + 16 = 25\\); SD = 5.",
      },
      {
        q: "For independent X, Y, \\(\\text{Var}(X - Y) = \\)",
        choices: ["\\(\\sigma_X^2 - \\sigma_Y^2\\)", "\\(\\sigma_X^2 + \\sigma_Y^2\\)", "\\(\\sigma_X - \\sigma_Y\\)", "\\(|\\sigma_X - \\sigma_Y|\\)"],
        answerIndex: 1,
        explanation: "Variances always add (never subtract) for independent variables.",
      },
      {
        q: "A student computes \\(\\sigma_{X+Y}\\) by adding \\(\\sigma_X\\) and \\(\\sigma_Y\\). Why is this wrong?",
        choices: ["SDs never add directly — you must add variances and then square root.", "It's correct.", "Only means add.", "Only when independent."],
        answerIndex: 0,
        explanation: "Standard deviations add only in special cases; variances add for independent RVs.",
      },
      {
        q: "Independent X, Y with \\(\\sigma_X = 2, \\sigma_Y = 1\\). \\(\\text{Var}(2X + 3Y) = \\)",
        choices: ["13", "19", "25", "7"],
        answerIndex: 2,
        explanation: "\\(\\text{Var}(aX+bY) = a^2\\sigma_X^2 + b^2\\sigma_Y^2 = 4(4) + 9(1) = 25\\).",
      },
    ],
  },

  "4.10": {
    id: "4.10",
    title: "Introduction to the Binomial Distribution",
    summary:
      "A binomial RV counts successes in n independent Bernoulli trials with fixed probability p. \\(P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}\\).",
    lesson:
      "A \\(\\textit{binomial}\\) random variable \\(X\\) counts the number of successes in \\(n\\) independent trials, each with the same probability \\(p\\) of success. Check the \\(\\textbf{BINS}\\) conditions:\n\n\\(\\textbf{B}\\)inary: each trial is success or failure.\n\\(\\textbf{I}\\)ndependent trials.\n\\(\\textbf{N}\\)umber of trials \\(n\\) is fixed.\n\\(\\textbf{S}\\)ame probability of success \\(p\\) on each trial.\n\nIf all four hold, \\(X \\sim \\text{Binomial}(n, p)\\).\n\nPMF: \\(P(X = k) = \\binom{n}{k}p^k(1-p)^{n-k}\\) for \\(k = 0, 1, \\ldots, n\\).\n\n\\(\\binom{n}{k} = \\frac{n!}{k!(n-k)!}\\) counts the ways to choose which trials are successes.\n\nCalculator: binompdf(n, p, k) for \\(P(X = k)\\); binomcdf(n, p, k) for \\(P(X \\le k)\\).\n\nFor sampling without replacement, binomial only applies approximately — the 10% condition: if sample size \\(\\le\\) 10% of the population, independence is nearly preserved.",
    keyIdeas: [
      "BINS conditions: Binary, Independent, fixed Number, Same p.",
      "PMF: \\(P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}\\).",
      "binompdf for exact count; binomcdf for cumulative.",
      "10% condition for sampling without replacement.",
    ],
    workedExample: {
      prompt:
        "A free-throw shooter makes 70% of attempts. She takes 5 shots. Find \\(P(X = 3)\\).",
      solution:
        "\\(X \\sim \\text{Binomial}(5, 0.7)\\). \\(P(X = 3) = \\binom{5}{3}(0.7)^3(0.3)^2 = 10(0.343)(0.09) = 0.3087\\).",
    },
    flashcards: [
      { q: "Binomial conditions (BINS)?", a: "Binary trials, Independent, fixed Number, Same probability." },
      { q: "Binomial PMF?", a: "\\(P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}\\)." },
      { q: "Calculator commands?", a: "binompdf(n, p, k) for \\(P(X=k)\\); binomcdf(n, p, k) for \\(P(X \\le k)\\)." },
    ],
    commonMistakes: [
      "Using binomial when trials aren't independent.",
      "Confusing binompdf and binomcdf.",
      "Forgetting the combination \\(\\binom{n}{k}\\) in the PMF.",
    ],
    quiz: [
      {
        q: "Which situation is binomial?",
        choices: ["Drawing 5 cards without replacement and counting aces.", "Rolling a die until you get a 6.", "Flipping a fair coin 10 times and counting heads.", "Picking a random student's height."],
        answerIndex: 2,
        explanation: "10 independent flips, binary success (head), fixed \\(n\\), same \\(p\\) — binomial.",
      },
      {
        q: "For \\(X \\sim \\text{Binomial}(4, 0.5)\\), \\(P(X = 2)\\) = ?",
        choices: ["0.125", "0.25", "0.375", "0.5"],
        answerIndex: 2,
        explanation: "\\(\\binom{4}{2}(0.5)^4 = 6(0.0625) = 0.375\\).",
      },
      {
        q: "Which is NOT a requirement for a binomial setting?",
        choices: ["Fixed number of trials", "Independent trials", "Continuous outcome", "Same probability each trial"],
        answerIndex: 2,
        explanation: "Binomial requires binary (discrete) success/failure outcomes.",
      },
      {
        q: "To find \\(P(X \\le 3)\\) for binomial, use:",
        choices: ["binompdf(n, p, 3)", "binomcdf(n, p, 3)", "normalcdf(3, \\(\\infty\\), n, p)", "invNorm(0.3, n, p)"],
        answerIndex: 1,
        explanation: "binomcdf gives cumulative probability \\(\\le k\\).",
      },
    ],
  },

  "4.11": {
    id: "4.11",
    title: "Parameters for a Binomial Distribution",
    summary:
      "For \\(X \\sim \\text{Binomial}(n, p)\\): mean \\(\\mu_X = np\\), variance \\(\\sigma_X^2 = np(1-p)\\), SD \\(\\sigma_X = \\sqrt{np(1-p)}\\).",
    lesson:
      "Two useful shortcuts for binomial parameters:\n\n\\(\\mu_X = np\\) — expected number of successes.\n\n\\(\\sigma_X = \\sqrt{np(1-p)}\\) — standard deviation of number of successes.\n\nVariance \\(\\sigma_X^2 = np(1-p)\\).\n\nThese derive from summing n independent Bernoulli trials, each with mean \\(p\\) and variance \\(p(1-p)\\).\n\nInterpretation: for 100 free throws at \\(p = 0.7\\), expect \\(np = 70\\) makes, with typical spread of \\(\\sqrt{100(0.7)(0.3)} \\approx 4.58\\) around 70.\n\nShape: for small n or extreme p, the binomial is skewed. For large n with p not near 0 or 1, it becomes approximately normal (formalized in Unit 5 via the Large Counts condition: \\(np \\ge 10\\) and \\(n(1-p) \\ge 10\\)).",
    keyIdeas: [
      "\\(\\mu = np\\), \\(\\sigma = \\sqrt{np(1-p)}\\).",
      "These come from summing n Bernoulli trials.",
      "Binomial is approximately normal when \\(np \\ge 10\\) and \\(n(1-p) \\ge 10\\).",
      "Skewed for small n or extreme p.",
    ],
    workedExample: {
      prompt:
        "A factory's 10% defect rate. In a sample of 200 items, find the expected number of defects and SD.",
      solution:
        "\\(n = 200, p = 0.1\\). \\(\\mu = 200(0.1) = 20\\). \\(\\sigma = \\sqrt{200(0.1)(0.9)} = \\sqrt{18} \\approx 4.24\\). Expect about 20 defects, typically varying by 4-5.",
    },
    flashcards: [
      { q: "Binomial mean formula?", a: "\\(\\mu = np\\)." },
      { q: "Binomial SD formula?", a: "\\(\\sigma = \\sqrt{np(1-p)}\\)." },
      { q: "When is a binomial approximately normal?", a: "When \\(np \\ge 10\\) and \\(n(1-p) \\ge 10\\)." },
    ],
    commonMistakes: [
      "Using \\(\\sigma = np(1-p)\\) instead of \\(\\sqrt{np(1-p)}\\).",
      "Forgetting to check Large Counts before using normal approximation.",
      "Applying binomial formulas when conditions aren't met.",
    ],
    quiz: [
      {
        q: "For \\(X \\sim \\text{Binomial}(50, 0.4)\\): \\(\\mu_X\\) = ?",
        choices: ["4", "20", "12", "0.4"],
        answerIndex: 1,
        explanation: "\\(np = 50(0.4) = 20\\).",
      },
      {
        q: "Same X: \\(\\sigma_X\\) = ?",
        choices: ["\\(\\sqrt{12}\\approx 3.46\\)", "12", "20", "\\(\\sqrt{20}\\)"],
        answerIndex: 0,
        explanation: "\\(\\sqrt{50(0.4)(0.6)} = \\sqrt{12}\\).",
      },
      {
        q: "For the binomial to be approximately normal, we need:",
        choices: ["\\(n \\ge 30\\)", "\\(np \\ge 10\\) AND \\(n(1-p) \\ge 10\\)", "\\(p \\ge 0.5\\)", "\\(np \\ge 5\\)"],
        answerIndex: 1,
        explanation: "Large Counts condition requires both \\(np\\) and \\(n(1-p)\\) be at least 10.",
      },
      {
        q: "A student writes \\(\\sigma = np(1-p)\\) for a binomial. This:",
        choices: ["Is correct.", "Gives variance, not SD.", "Only works for p = 0.5.", "Is missing a square root — variance is \\(np(1-p)\\); SD takes the square root."],
        answerIndex: 3,
        explanation: "Variance is \\(np(1-p)\\); SD requires the square root.",
      },
    ],
  },

  "4.12": {
    id: "4.12",
    title: "The Geometric Distribution",
    summary:
      "A geometric RV counts the trial number of the first success in independent Bernoulli trials. \\(P(X = k) = (1-p)^{k-1}p\\); mean \\(1/p\\), SD \\(\\sqrt{1-p}/p\\).",
    lesson:
      "The \\(\\textit{geometric}\\) distribution models the number of trials until (and including) the first success. Conditions \\(\\textbf{BITS}\\):\n\n\\(\\textbf{B}\\)inary outcomes.\n\\(\\textbf{I}\\)ndependent trials.\n\\(\\textbf{T}\\)rials until first success (number of trials is variable).\n\\(\\textbf{S}\\)ame probability \\(p\\) on each trial.\n\nPMF: \\(P(X = k) = (1-p)^{k-1}p\\) for \\(k = 1, 2, 3, \\ldots\\) (1st success on trial \\(k\\)).\n\nMean: \\(\\mu_X = 1/p\\). SD: \\(\\sigma_X = \\dfrac{\\sqrt{1 - p}}{p}\\).\n\nShape: always right-skewed. Most likely to succeed on trial 1; rarely takes many trials.\n\nCalculator: geometpdf(p, k) for \\(P(X = k)\\); geometcdf(p, k) for \\(P(X \\le k)\\).\n\nVs binomial: binomial has fixed \\(n\\); geometric has fixed criterion (first success) and variable \\(n\\).",
    keyIdeas: [
      "Geometric: trial of first success.",
      "BITS conditions.",
      "PMF: \\(P(X=k) = (1-p)^{k-1}p\\).",
      "\\(\\mu = 1/p\\), \\(\\sigma = \\sqrt{1-p}/p\\).",
    ],
    workedExample: {
      prompt:
        "A basketball shooter makes 40% of shots. Find the probability she makes her first basket on the 3rd shot, and the expected number of shots until her first make.",
      solution:
        "\\(p = 0.4\\). \\(P(X = 3) = (0.6)^2(0.4) = 0.144\\). Expected: \\(\\mu = 1/0.4 = 2.5\\) shots.",
    },
    flashcards: [
      { q: "Geometric conditions (BITS)?", a: "Binary, Independent, Trials until first success, Same p." },
      { q: "Geometric mean?", a: "\\(\\mu = 1/p\\)." },
      { q: "Geometric PMF?", a: "\\(P(X=k) = (1-p)^{k-1}p\\)." },
    ],
    commonMistakes: [
      "Starting the count at 0 instead of 1.",
      "Using binomial when the setup has no fixed n.",
      "Swapping mean with SD.",
    ],
    quiz: [
      {
        q: "Geometric RV: \\(p = 0.2\\). \\(P(X = 4)\\) = ?",
        choices: ["\\(0.2^4\\)", "\\(0.8^3(0.2) \\approx 0.1024\\)", "\\(0.8^4\\)", "\\(0.2^3(0.8)\\)"],
        answerIndex: 1,
        explanation: "\\(P(X=4) = (0.8)^3(0.2) = 0.512(0.2) = 0.1024\\).",
      },
      {
        q: "Geometric mean when \\(p = 0.25\\):",
        choices: ["0.25", "4", "0.75", "3"],
        answerIndex: 1,
        explanation: "\\(\\mu = 1/p = 1/0.25 = 4\\).",
      },
      {
        q: "Main difference between binomial and geometric:",
        choices: ["Only binomial is independent.", "Binomial fixes n; geometric fixes first-success criterion.", "Only geometric requires binary outcomes.", "No difference."],
        answerIndex: 1,
        explanation: "Binomial: fixed n. Geometric: trials until first success (variable n).",
      },
      {
        q: "Geometric \\(p = 0.3\\): SD is approximately:",
        choices: ["\\(1/0.3 \\approx 3.33\\)", "\\(\\sqrt{0.7}/0.3 \\approx 2.79\\)", "0.3", "0.7"],
        answerIndex: 1,
        explanation: "\\(\\sigma = \\sqrt{1-p}/p = \\sqrt{0.7}/0.3 \\approx 2.79\\).",
      },
    ],
  },

  "5.1": {
    id: "5.1",
    title: "Introducing Statistics: Why Is My Sample Not Like Yours?",
    summary:
      "Sample statistics vary sample to sample. A sampling distribution describes this variation and is the bridge to inference.",
    lesson:
      "Two students take random samples from the same population. They get different sample means. Why? Because sampling introduces \\(\\textit{variability}\\). Unit 5 formalizes that variability with the concept of a \\(\\textit{sampling distribution}\\).\n\nA \\(\\textbf{sampling distribution}\\) is the distribution of a statistic (like \\(\\bar x\\) or \\(\\hat p\\)) across all possible samples of size \\(n\\). It has a \\(\\textit{mean}\\) (usually equal to the parameter) and a \\(\\textit{standard deviation}\\) (standard error), which measures typical variation among samples.\n\nSampling distributions answer: how much do we expect a sample statistic to vary around the true parameter, and what shape does it take? Without understanding this, inference (CIs and tests) is impossible.\n\nKey preview for later topics:\n- For \\(\\hat p\\): mean \\(= p\\), SD \\(= \\sqrt{p(1-p)/n}\\), approximately normal when Large Counts holds.\n- For \\(\\bar x\\): mean \\(= \\mu\\), SD \\(= \\sigma/\\sqrt{n}\\), approximately normal when \\(n \\ge 30\\) or population is normal (CLT).",
    keyIdeas: [
      "Statistics vary from sample to sample.",
      "Sampling distribution = all possible statistics from all possible samples of size n.",
      "Center of sampling distribution is (usually) the parameter.",
      "Standard deviation of sampling distribution is the standard error.",
    ],
    workedExample: {
      prompt:
        "True population proportion p = 0.6. Ten students each take samples of size 50 and compute \\(\\hat p\\). Describe what their sampling distribution of \\(\\hat p\\) approximately looks like.",
      solution:
        "Each \\(\\hat p\\) varies around p = 0.6. The mean of all possible \\(\\hat p\\) values is 0.6. The SD is \\(\\sqrt{0.6(0.4)/50} \\approx 0.069\\). With large counts, the distribution is approximately normal — students' \\(\\hat p\\) values will mostly fall between about 0.46 and 0.74.",
    },
    flashcards: [
      { q: "Sampling distribution of a statistic?", a: "Distribution of the statistic across all possible samples of size n." },
      { q: "What is the standard error?", a: "The standard deviation of a sampling distribution." },
      { q: "Why is sampling variability inevitable?", a: "Different samples pick different individuals; statistics depend on the sample." },
    ],
    commonMistakes: [
      "Confusing sampling distribution with population distribution.",
      "Calling SE the same as population SD.",
      "Assuming every sample has the same statistic.",
    ],
    quiz: [
      {
        q: "A sampling distribution describes:",
        choices: ["A single sample's values.", "The population distribution.", "How a statistic varies across all possible samples.", "Outliers only."],
        answerIndex: 2,
        explanation: "Sampling distribution = the distribution of a statistic over repeated samples.",
      },
      {
        q: "The standard deviation of a sampling distribution is called the:",
        choices: ["Variance", "Standard error", "Skewness", "Margin of error"],
        answerIndex: 1,
        explanation: "Standard error (SE) is the SD of a sampling distribution.",
      },
      {
        q: "As sample size increases, the standard error of \\(\\bar x\\):",
        choices: ["Increases", "Decreases", "Stays the same", "Is always zero"],
        answerIndex: 1,
        explanation: "\\(\\sigma/\\sqrt{n}\\) decreases as n grows.",
      },
      {
        q: "Two samples from the same population gave different sample means. This is due to:",
        choices: ["Bias", "Sampling variability", "A lurking variable", "Response bias"],
        answerIndex: 1,
        explanation: "Random samples naturally yield different statistics — that's sampling variability.",
      },
    ],
  },

  "5.2": {
    id: "5.2",
    title: "The Normal Distribution, Revisited",
    summary:
      "Normal distributions reappear because many sampling distributions are approximately normal under appropriate conditions (CLT, Large Counts).",
    lesson:
      "The normal distribution shows up all over Unit 5. A quick refresher:\n\n\\(X \\sim N(\\mu, \\sigma)\\) is symmetric, unimodal, bell-shaped. The standard normal \\(Z \\sim N(0, 1)\\) has mean 0 and SD 1.\n\n\\(z = (x - \\mu)/\\sigma\\) standardizes any normal to a Z-score.\n\nEmpirical rule: 68% within \\(\\mu \\pm \\sigma\\), 95% within \\(\\mu \\pm 2\\sigma\\), 99.7% within \\(\\mu \\pm 3\\sigma\\).\n\nFor sampling distributions:\n- \\(\\hat p \\sim N(p, \\sqrt{p(1-p)/n})\\) approximately, when Large Counts holds.\n- \\(\\bar x \\sim N(\\mu, \\sigma/\\sqrt{n})\\) approximately, when CLT applies.\n\nUse normalcdf and invNorm as before to compute probabilities and cutoffs.",
    keyIdeas: [
      "Normal N(\\(\\mu, \\sigma\\)); standard normal N(0, 1).",
      "z-score standardizes to N(0, 1).",
      "Sampling distributions often approximately normal.",
      "68-95-99.7 rule still applies.",
    ],
    workedExample: {
      prompt:
        "\\(\\hat p \\sim N(0.5, 0.05)\\) approximately. Find \\(P(\\hat p > 0.6)\\).",
      solution:
        "\\(z = (0.6 - 0.5)/0.05 = 2\\). \\(P(Z > 2) \\approx 0.0228\\). Or normalcdf(0.6, \\(\\infty\\), 0.5, 0.05) \\(\\approx 0.0228\\).",
    },
    flashcards: [
      { q: "Standard normal mean and SD?", a: "0 and 1." },
      { q: "Empirical rule percentages?", a: "68% within 1 SD; 95% within 2; 99.7% within 3." },
      { q: "z-score formula?", a: "\\(z = (x - \\mu)/\\sigma\\)." },
    ],
    commonMistakes: [
      "Forgetting to use standard error (not population SD) when standardizing sample statistics.",
      "Assuming the sampling distribution is normal without checking conditions.",
      "Misreading z-table values.",
    ],
    quiz: [
      {
        q: "\\(X \\sim N(100, 15)\\). \\(P(X > 115)\\) is approximately:",
        choices: ["0.16", "0.32", "0.50", "0.84"],
        answerIndex: 0,
        explanation: "\\(z = 1\\), so \\(P(Z > 1) \\approx 0.16\\) (empirical rule).",
      },
      {
        q: "To standardize \\(\\bar x = 75\\) from a sampling distribution with \\(\\mu = 70, \\sigma/\\sqrt n = 2\\):",
        choices: ["\\(z = 5\\)", "\\(z = 2.5\\)", "\\(z = 1.25\\)", "\\(z = 70\\)"],
        answerIndex: 1,
        explanation: "\\(z = (75 - 70)/2 = 2.5\\).",
      },
      {
        q: "For a standard normal, what z-score corresponds to the 95th percentile?",
        choices: ["1.28", "1.645", "1.96", "2.33"],
        answerIndex: 1,
        explanation: "\\(P(Z \\le 1.645) \\approx 0.95\\).",
      },
      {
        q: "The empirical rule says about 95% of values fall:",
        choices: ["Within 1 SD", "Within 2 SD", "Within 3 SD", "Below the mean"],
        answerIndex: 1,
        explanation: "95% within \\(\\mu \\pm 2\\sigma\\).",
      },
    ],
  },

  "5.3": {
    id: "5.3",
    title: "The Central Limit Theorem",
    summary:
      "For large n, the sampling distribution of \\(\\bar x\\) is approximately normal regardless of population shape. Rule of thumb: \\(n \\ge 30\\).",
    lesson:
      "The \\(\\textbf{Central Limit Theorem}\\) (CLT) says: as sample size \\(n\\) grows, the sampling distribution of the sample mean \\(\\bar x\\) becomes approximately normal — \\(\\textbf{regardless of the shape of the population distribution}\\) (as long as the population has finite variance).\n\nFor practical use: \\(n \\ge 30\\) is the conventional threshold. If the population is known to be normal, any \\(n\\) works. For skewed populations, larger \\(n\\) is needed.\n\nConsequence: for \\(n \\ge 30\\), we can treat \\(\\bar x\\) as approximately \\(N(\\mu, \\sigma/\\sqrt n)\\). This is what makes t-procedures and z-procedures for means work even when the data are skewed.\n\nCLT does NOT say the population is normal. It says the \\(\\textit{sampling distribution}\\) of \\(\\bar x\\) is approximately normal.",
    keyIdeas: [
      "CLT: \\(\\bar x\\) sampling distribution → normal as \\(n\\) grows.",
      "Rule of thumb: \\(n \\ge 30\\) for reasonably skewed populations.",
      "Mean of sampling distribution = \\(\\mu\\); SD = \\(\\sigma/\\sqrt n\\).",
      "CLT applies to \\(\\bar x\\), not individual observations.",
    ],
    workedExample: {
      prompt:
        "A population is strongly right-skewed with \\(\\mu = 50, \\sigma = 15\\). Samples of size 40 are taken. Describe the sampling distribution of \\(\\bar x\\).",
      solution:
        "By CLT (n = 40 ≥ 30), \\(\\bar x\\) is approximately \\(N(50, 15/\\sqrt{40}) = N(50, 2.37)\\). Even though the population is skewed, the sampling distribution of \\(\\bar x\\) is approximately normal.",
    },
    flashcards: [
      { q: "What does CLT require?", a: "Large sample size (n ≥ 30) or normal population; population with finite variance." },
      { q: "What does CLT say about \\(\\bar x\\)?", a: "Sampling distribution is approximately normal, with mean \\(\\mu\\) and SD \\(\\sigma/\\sqrt n\\)." },
      { q: "Does CLT say the population is normal?", a: "No — it's about the sampling distribution of \\(\\bar x\\)." },
    ],
    commonMistakes: [
      "Saying CLT makes the population normal.",
      "Ignoring CLT and assuming small-n means skewed.",
      "Using CLT for \\(\\hat p\\) (use Large Counts for that).",
    ],
    quiz: [
      {
        q: "The Central Limit Theorem describes the sampling distribution of:",
        choices: ["The population", "\\(\\bar x\\) as n gets large", "Median", "Individual observations"],
        answerIndex: 1,
        explanation: "CLT is about \\(\\bar x\\), not the population or individual data points.",
      },
      {
        q: "Population is uniform from 0 to 10, \\(\\sigma \\approx 2.89\\). For n = 50, SD of \\(\\bar x\\) is:",
        choices: ["2.89", "0.408", "0.058", "0.289"],
        answerIndex: 1,
        explanation: "\\(2.89/\\sqrt{50} \\approx 0.408\\).",
      },
      {
        q: "A skewed population with n = 10. CLT applies?",
        choices: ["Yes, strongly", "Not necessarily — n is small relative to rule-of-thumb", "Always", "Only with outliers"],
        answerIndex: 1,
        explanation: "For skewed populations, n should be larger (≥30) for CLT to apply.",
      },
      {
        q: "If the population is normal with \\(\\sigma = 4\\), the sampling distribution of \\(\\bar x\\) for n = 16:",
        choices: ["Is normal with SD 4", "Is normal with SD 1", "Isn't normal because n < 30", "Skewed"],
        answerIndex: 1,
        explanation: "Normal population → \\(\\bar x\\) is exactly normal for any n; SD = \\(4/\\sqrt{16} = 1\\).",
      },
    ],
  },

  "5.4": {
    id: "5.4",
    title: "Biased and Unbiased Point Estimates",
    summary:
      "A point estimator is unbiased if its sampling distribution is centered at the parameter. \\(\\bar x, \\hat p, s\\) are unbiased for \\(\\mu, p\\), and \\(\\sigma\\) respectively (with the right divisor).",
    lesson:
      "A \\(\\textit{point estimator}\\) is a statistic used to estimate a parameter. An estimator is \\(\\textbf{unbiased}\\) if the mean of its sampling distribution equals the parameter: \\(E(\\hat\\theta) = \\theta\\).\n\nUnbiased estimators:\n- \\(\\bar x\\) for \\(\\mu\\).\n- \\(\\hat p\\) for \\(p\\).\n- \\(s^2\\) (with \\(n - 1\\) divisor) for \\(\\sigma^2\\).\n\nNote that the median is unbiased for \\(\\mu\\) when the population is symmetric but not always otherwise. The sample range is a biased estimator of the population range (it underestimates).\n\nBias is \\(\\textit{systematic}\\); variability is \\(\\textit{random}\\). An estimator can be unbiased but highly variable (bad), or biased but precise (also bad). The goal is \\(\\textit{accurate}\\) (low bias, low variability).\n\nIncreasing sample size reduces variability but does not fix bias. Bias comes from the estimator design or sampling method.",
    keyIdeas: [
      "Unbiased estimator: sampling distribution centered at the parameter.",
      "\\(\\bar x, \\hat p\\) are unbiased for \\(\\mu, p\\).",
      "Sample variance uses \\(n - 1\\) to stay unbiased.",
      "Bias is design/method; variability is sample size.",
    ],
    workedExample: {
      prompt:
        "Why does the sample variance \\(s^2 = \\frac{1}{n-1}\\sum(x_i - \\bar x)^2\\) use \\(n-1\\) instead of \\(n\\)?",
      solution:
        "Dividing by \\(n\\) would give a biased (under)estimate of \\(\\sigma^2\\) because the sample mean \\(\\bar x\\) is always within the sample, reducing apparent variability. The \\(n - 1\\) correction (Bessel's correction) makes \\(s^2\\) unbiased: \\(E(s^2) = \\sigma^2\\).",
    },
    flashcards: [
      { q: "Unbiased estimator definition?", a: "Sampling distribution's mean equals the parameter." },
      { q: "Is \\(\\bar x\\) unbiased for \\(\\mu\\)?", a: "Yes." },
      { q: "Does increasing n reduce bias?", a: "No — it reduces variability." },
    ],
    commonMistakes: [
      "Conflating bias (systematic) with variability (random).",
      "Dividing sample variance by n instead of n - 1.",
      "Thinking a biased estimator can't also be precise.",
    ],
    quiz: [
      {
        q: "An estimator \\(\\hat\\theta\\) is unbiased if:",
        choices: ["\\(\\hat\\theta = \\theta\\) always", "\\(E(\\hat\\theta) = \\theta\\)", "Its variance equals \\(\\theta^2\\)", "It has the smallest variance"],
        answerIndex: 1,
        explanation: "Unbiased: the expected value equals the parameter.",
      },
      {
        q: "Sample mean \\(\\bar x\\) is:",
        choices: ["Biased estimator of \\(\\mu\\)", "Unbiased estimator of \\(\\mu\\)", "Equal to population mean in every sample", "A population parameter"],
        answerIndex: 1,
        explanation: "\\(E(\\bar x) = \\mu\\), so \\(\\bar x\\) is unbiased.",
      },
      {
        q: "Increasing sample size:",
        choices: ["Reduces bias", "Reduces variability (standard error)", "Increases bias", "Has no effect"],
        answerIndex: 1,
        explanation: "Larger n shrinks standard error; bias is structural.",
      },
      {
        q: "Sample variance divides by \\(n - 1\\) to:",
        choices: ["Simplify the formula", "Make it an unbiased estimator of \\(\\sigma^2\\)", "Make it biased", "Increase variance"],
        answerIndex: 1,
        explanation: "Bessel's correction ensures \\(E(s^2) = \\sigma^2\\).",
      },
    ],
  },

  "5.5": {
    id: "5.5",
    title: "Sampling Distributions for Sample Proportions",
    summary:
      "\\(\\hat p\\) has mean p, SD \\(\\sqrt{p(1-p)/n}\\). Approximately normal when Large Counts: \\(np \\ge 10, n(1-p) \\ge 10\\).",
    lesson:
      "For a simple random sample of size \\(n\\) from a population with true proportion \\(p\\), the sample proportion \\(\\hat p = X/n\\) has:\n\n- Mean: \\(\\mu_{\\hat p} = p\\).\n- Standard deviation: \\(\\sigma_{\\hat p} = \\sqrt{\\dfrac{p(1-p)}{n}}\\).\n\nShape: approximately normal when the \\(\\textbf{Large Counts}\\) condition holds:\n\\[np \\ge 10 \\quad \\text{and} \\quad n(1-p) \\ge 10.\\]\n\nAdditional conditions:\n- \\(\\textit{Random}\\) sample (for unbiasedness).\n- \\(\\textit{10\\% condition}\\): \\(n \\le 0.1 N\\) (so independence approximately holds when sampling without replacement).\n\nThese are the conditions you check on every proportion inference FRQ.",
    keyIdeas: [
      "Mean of \\(\\hat p\\) = \\(p\\).",
      "SD of \\(\\hat p\\) = \\(\\sqrt{p(1-p)/n}\\).",
      "Normal approximation when \\(np \\ge 10\\) and \\(n(1-p) \\ge 10\\).",
      "Also need random sampling and 10% condition.",
    ],
    workedExample: {
      prompt:
        "30% of voters support a policy. In a random sample of 100 voters, find the mean and SD of \\(\\hat p\\), and the probability that \\(\\hat p > 0.35\\).",
      solution:
        "\\(\\mu_{\\hat p} = 0.30\\). \\(\\sigma_{\\hat p} = \\sqrt{0.3(0.7)/100} = \\sqrt{0.0021} \\approx 0.0458\\). Large Counts: \\(np = 30 \\ge 10\\), \\(n(1-p) = 70 \\ge 10\\), so approximately normal. \\(z = (0.35 - 0.30)/0.0458 \\approx 1.09\\). \\(P(Z > 1.09) \\approx 0.138\\).",
    },
    flashcards: [
      { q: "Mean of \\(\\hat p\\) sampling distribution?", a: "p (the population proportion)." },
      { q: "SD of \\(\\hat p\\) sampling distribution?", a: "\\(\\sqrt{p(1-p)/n}\\)." },
      { q: "Large Counts condition?", a: "\\(np \\ge 10\\) and \\(n(1-p) \\ge 10\\)." },
    ],
    commonMistakes: [
      "Using \\(\\hat p\\) in SD when finding sampling distribution for a known p.",
      "Forgetting to check Large Counts.",
      "Ignoring the 10% condition.",
    ],
    quiz: [
      {
        q: "\\(p = 0.4, n = 200\\). SD of \\(\\hat p\\) is:",
        choices: ["\\(\\sqrt{0.24/200}\\)", "0.24", "\\(\\sqrt{0.4\\times 0.6/200}\\approx 0.0346\\)", "0.002"],
        answerIndex: 2,
        explanation: "\\(\\sqrt{p(1-p)/n} = \\sqrt{0.24/200} = \\sqrt{0.0012} \\approx 0.0346\\).",
      },
      {
        q: "Large Counts requires:",
        choices: ["\\(n \\ge 30\\)", "\\(np \\ge 10\\) and \\(n(1-p) \\ge 10\\)", "\\(p \\ge 0.5\\)", "\\(p = 1/n\\)"],
        answerIndex: 1,
        explanation: "Large Counts: both \\(np\\) and \\(n(1-p)\\) at least 10.",
      },
      {
        q: "10% condition is used for:",
        choices: ["Checking normality", "Independence when sampling without replacement", "Bias", "Standard error calculation"],
        answerIndex: 1,
        explanation: "10% condition preserves approximate independence in finite populations.",
      },
      {
        q: "For \\(p = 0.5, n = 25\\): is \\(\\hat p\\) approximately normal?",
        choices: ["Yes, both \\(np\\) and \\(n(1-p)\\) = 12.5 ≥ 10", "No, \\(n\\) too small", "Only if population is normal", "Cannot tell"],
        answerIndex: 0,
        explanation: "Large Counts satisfied: both exceed 10.",
      },
    ],
  },

  "5.6": {
    id: "5.6",
    title: "Sampling Distributions for Differences in Sample Proportions",
    summary:
      "For independent \\(\\hat p_1, \\hat p_2\\): mean \\(p_1 - p_2\\), SD \\(\\sqrt{p_1(1-p_1)/n_1 + p_2(1-p_2)/n_2}\\).",
    lesson:
      "When comparing proportions from two independent samples, the sampling distribution of \\(\\hat p_1 - \\hat p_2\\) has:\n\nMean: \\(\\mu_{\\hat p_1 - \\hat p_2} = p_1 - p_2\\).\n\nSD: \\(\\sigma_{\\hat p_1 - \\hat p_2} = \\sqrt{\\dfrac{p_1(1-p_1)}{n_1} + \\dfrac{p_2(1-p_2)}{n_2}}\\).\n\n(Variances add — just like for independent RVs.)\n\nShape: approximately normal when Large Counts holds for BOTH samples: \\(n_1 p_1 \\ge 10, n_1(1-p_1) \\ge 10, n_2 p_2 \\ge 10, n_2(1-p_2) \\ge 10\\).\n\nConditions:\n- Random samples (both).\n- Independent samples (\\(n_1\\) and \\(n_2\\) come from separate, unrelated groups).\n- 10% condition for each sample.\n- Large Counts for both.",
    keyIdeas: [
      "Mean = \\(p_1 - p_2\\).",
      "SD = \\(\\sqrt{p_1(1-p_1)/n_1 + p_2(1-p_2)/n_2}\\).",
      "Variances add for independent samples.",
      "Check Large Counts separately for each sample.",
    ],
    workedExample: {
      prompt:
        "\\(p_1 = 0.5, n_1 = 100; p_2 = 0.4, n_2 = 150\\). Find mean and SD of \\(\\hat p_1 - \\hat p_2\\).",
      solution:
        "Mean: \\(0.5 - 0.4 = 0.1\\). SD: \\(\\sqrt{0.25/100 + 0.24/150} = \\sqrt{0.0025 + 0.0016} = \\sqrt{0.0041} \\approx 0.0640\\).",
    },
    flashcards: [
      { q: "Mean of \\(\\hat p_1 - \\hat p_2\\) sampling distribution?", a: "\\(p_1 - p_2\\)." },
      { q: "SD of \\(\\hat p_1 - \\hat p_2\\)?", a: "\\(\\sqrt{p_1(1-p_1)/n_1 + p_2(1-p_2)/n_2}\\)." },
      { q: "Conditions for normal approximation?", a: "Large Counts for both samples, independence, random, 10% each." },
    ],
    commonMistakes: [
      "Subtracting variances instead of adding.",
      "Forgetting to check Large Counts for both samples.",
      "Treating samples as dependent when they're independent (or vice versa).",
    ],
    quiz: [
      {
        q: "For \\(\\hat p_1 - \\hat p_2\\) with independent samples, variances:",
        choices: ["Subtract", "Add", "Multiply", "Cannot be combined"],
        answerIndex: 1,
        explanation: "Variances add for independent random variables.",
      },
      {
        q: "With \\(p_1 = 0.6, p_2 = 0.5, n_1 = n_2 = 100\\): mean of sampling distribution of \\(\\hat p_1 - \\hat p_2\\):",
        choices: ["0.05", "0.1", "0.5", "0.55"],
        answerIndex: 1,
        explanation: "\\(p_1 - p_2 = 0.6 - 0.5 = 0.1\\).",
      },
      {
        q: "Large Counts for two proportions requires:",
        choices: ["All four: \\(n_1p_1, n_1(1-p_1), n_2p_2, n_2(1-p_2) \\ge 10\\)", "Only \\(n_1 \\ge 30\\)", "Only one of the four", "Random sample only"],
        answerIndex: 0,
        explanation: "All four counts must be at least 10.",
      },
      {
        q: "If samples are NOT independent, the SD formula:",
        choices: ["Still works.", "Needs modification — the standard formula assumes independence.", "Uses \\(\\bar p\\).", "Doesn't exist."],
        answerIndex: 1,
        explanation: "Independence is required for variances to add; paired samples need a different approach.",
      },
    ],
  },

  "5.7": {
    id: "5.7",
    title: "Sampling Distributions for Sample Means",
    summary:
      "\\(\\bar x\\) has mean \\(\\mu\\), SD \\(\\sigma/\\sqrt n\\). Normal if population is normal OR \\(n \\ge 30\\) (CLT).",
    lesson:
      "For a random sample of size \\(n\\) from a population with mean \\(\\mu\\) and SD \\(\\sigma\\):\n\n\\(\\mu_{\\bar x} = \\mu\\) — center unchanged.\n\n\\(\\sigma_{\\bar x} = \\sigma/\\sqrt n\\) — SD shrinks by factor \\(\\sqrt n\\).\n\nShape:\n- If population is normal, \\(\\bar x\\) is normal for any \\(n\\).\n- If population is not normal, \\(\\bar x\\) is approximately normal when \\(n \\ge 30\\) by CLT.\n\nConditions for inference:\n- Random sample.\n- \\(\\textit{Normal/large}\\): population normal OR \\(n \\ge 30\\) (check with a dotplot/boxplot of the sample when possible).\n- 10% condition: sample ≤ 10% of population when sampling without replacement.\n\nThis is the foundation for t-inference in Unit 7. Note: we'll use \\(s/\\sqrt n\\) as the standard error since \\(\\sigma\\) is rarely known.",
    keyIdeas: [
      "Mean of \\(\\bar x\\) = \\(\\mu\\).",
      "SD of \\(\\bar x\\) = \\(\\sigma/\\sqrt n\\).",
      "Normal if pop. normal; approximately normal for \\(n \\ge 30\\) (CLT).",
      "10% condition for independence.",
    ],
    workedExample: {
      prompt:
        "Population \\(\\mu = 100, \\sigma = 15\\), not specified as normal. For \\(n = 36\\), find mean and SD of \\(\\bar x\\) and \\(P(\\bar x > 105)\\).",
      solution:
        "\\(\\mu_{\\bar x} = 100\\). \\(\\sigma_{\\bar x} = 15/\\sqrt{36} = 2.5\\). \\(n = 36 \\ge 30\\), so CLT applies — approximately normal. \\(z = (105-100)/2.5 = 2\\). \\(P(Z > 2) \\approx 0.0228\\).",
    },
    flashcards: [
      { q: "Mean and SD of \\(\\bar x\\)?", a: "\\(\\mu\\) and \\(\\sigma/\\sqrt n\\)." },
      { q: "When is \\(\\bar x\\) normal?", a: "Population normal OR n ≥ 30." },
      { q: "What's the 10% condition for?", a: "Independence in without-replacement sampling." },
    ],
    commonMistakes: [
      "Using \\(\\sigma\\) instead of \\(\\sigma/\\sqrt n\\) for the sampling distribution.",
      "Ignoring the normal/large condition.",
      "Treating a non-random sample as random.",
    ],
    quiz: [
      {
        q: "Population \\(\\sigma = 12, n = 144\\). SD of \\(\\bar x\\):",
        choices: ["12", "1", "0.083", "144"],
        answerIndex: 1,
        explanation: "\\(12/\\sqrt{144} = 12/12 = 1\\).",
      },
      {
        q: "For skewed population, we need:",
        choices: ["\\(n \\ge 10\\)", "\\(n \\ge 30\\)", "Normal population always", "Any n"],
        answerIndex: 1,
        explanation: "CLT rule of thumb: \\(n \\ge 30\\).",
      },
      {
        q: "Doubling n does what to the SD of \\(\\bar x\\)?",
        choices: ["Doubles it", "Halves it", "Divides by \\(\\sqrt 2\\)", "Leaves unchanged"],
        answerIndex: 2,
        explanation: "\\(\\sigma/\\sqrt n\\); replacing n by 2n divides by \\(\\sqrt 2\\).",
      },
      {
        q: "Population is exactly normal with \\(\\mu = 50, \\sigma = 10\\). For n = 4, \\(\\bar x\\) is:",
        choices: ["Exactly normal with SD 5", "Approximately normal", "Skewed", "Undefined"],
        answerIndex: 0,
        explanation: "Normal population → \\(\\bar x\\) exactly normal for any n; SD = \\(10/\\sqrt 4 = 5\\).",
      },
    ],
  },

  "5.8": {
    id: "5.8",
    title: "Sampling Distributions for Differences in Sample Means",
    summary:
      "For independent samples: mean \\(\\mu_1 - \\mu_2\\), SD \\(\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}\\).",
    lesson:
      "For two independent random samples, the sampling distribution of \\(\\bar x_1 - \\bar x_2\\) has:\n\nMean: \\(\\mu_1 - \\mu_2\\).\n\nSD: \\(\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}\\). Variances add.\n\nShape: approximately normal when each sampling distribution is approximately normal — either each population is normal, or each sample has size \\(\\ge 30\\).\n\nConditions:\n- Random samples, independent of each other.\n- Normal/large for each sample.\n- 10% condition for each if sampling without replacement.\n\nIn practice, we rarely know \\(\\sigma_1, \\sigma_2\\). We use \\(s_1, s_2\\) as estimates, yielding \\(\\text{SE} = \\sqrt{s_1^2/n_1 + s_2^2/n_2}\\), and the sampling distribution becomes a \\(\\textit{t-distribution}\\) for inference (Unit 7).",
    keyIdeas: [
      "Mean of \\(\\bar x_1 - \\bar x_2\\) = \\(\\mu_1 - \\mu_2\\).",
      "SD = \\(\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}\\).",
      "Normal/large condition for each sample.",
      "Use \\(s^2\\) when \\(\\sigma^2\\) is unknown (t inference).",
    ],
    workedExample: {
      prompt:
        "\\(\\mu_1 = 70, \\sigma_1 = 10, n_1 = 50; \\mu_2 = 65, \\sigma_2 = 8, n_2 = 40\\). Find mean and SD of \\(\\bar x_1 - \\bar x_2\\).",
      solution:
        "Mean: \\(70 - 65 = 5\\). SD: \\(\\sqrt{100/50 + 64/40} = \\sqrt{2 + 1.6} = \\sqrt{3.6} \\approx 1.897\\).",
    },
    flashcards: [
      { q: "Mean of \\(\\bar x_1 - \\bar x_2\\)?", a: "\\(\\mu_1 - \\mu_2\\)." },
      { q: "SD when \\(\\sigma_1, \\sigma_2\\) known?", a: "\\(\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}\\)." },
      { q: "SD when \\(\\sigma\\) unknown?", a: "Use \\(s_1, s_2\\); becomes t-distribution for inference." },
    ],
    commonMistakes: [
      "Subtracting variances.",
      "Using a single sample's SD for both samples.",
      "Forgetting the independence condition.",
    ],
    quiz: [
      {
        q: "Independent samples. SD of \\(\\bar x_1 - \\bar x_2\\) = ?",
        choices: ["\\(\\sigma_1/\\sqrt{n_1} - \\sigma_2/\\sqrt{n_2}\\)", "\\(\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}\\)", "\\(\\sigma_1^2 + \\sigma_2^2\\)", "\\((\\sigma_1+\\sigma_2)/\\sqrt{n_1+n_2}\\)"],
        answerIndex: 1,
        explanation: "Variances add for independent samples; take square root.",
      },
      {
        q: "\\(\\mu_1 = 50, \\mu_2 = 45\\). Expected \\(\\bar x_1 - \\bar x_2\\):",
        choices: ["95", "45", "5", "0"],
        answerIndex: 2,
        explanation: "\\(\\mu_1 - \\mu_2 = 50 - 45 = 5\\).",
      },
      {
        q: "Variances add for differences of means because:",
        choices: ["Samples are dependent", "Both samples contribute variability — independence implies variance of difference equals sum of variances", "Means always subtract", "Negative correlations"],
        answerIndex: 1,
        explanation: "Independent RVs: \\(\\text{Var}(X - Y) = \\text{Var}(X) + \\text{Var}(Y)\\).",
      },
      {
        q: "When \\(\\sigma\\) unknown, we use \\(s\\) and our sampling distribution becomes:",
        choices: ["Exactly normal", "Approximately t-distributed", "Chi-square", "Uniform"],
        answerIndex: 1,
        explanation: "Using \\(s\\) instead of \\(\\sigma\\) introduces extra variability — that's why we use the t-distribution.",
      },
    ],
  },

  "6.1": {
    id: "6.1",
    title: "Introducing Statistics: Why Be Normal?",
    summary:
      "Inference lets us draw conclusions about a population parameter from a sample statistic. Confidence intervals and significance tests rely on normality of sampling distributions.",
    lesson:
      "Unit 6 introduces statistical inference for proportions. Two main tools:\n\n1. \\(\\textbf{Confidence interval}\\): a range of plausible values for the parameter, with a stated confidence level.\n\n2. \\(\\textbf{Significance test (hypothesis test)}\\): an assessment of evidence against a specified claim about the parameter.\n\nBoth rely on the sampling distribution of \\(\\hat p\\) being approximately normal — which requires Large Counts. That's why \"be normal\" matters: the normal approximation justifies z-procedures.\n\nRoadmap for Unit 6: one-proportion intervals and tests (6.2-6.7), errors/power (6.7), two-proportion intervals and tests (6.8-6.11).\n\nFor every procedure, you'll follow the same structure:\n1. State parameter and hypotheses (for tests).\n2. Check conditions (Random, 10%, Large Counts).\n3. Compute the statistic (z or t).\n4. Compute p-value or interval.\n5. Conclude in context.",
    keyIdeas: [
      "Confidence interval: range of plausible parameter values.",
      "Significance test: evaluate evidence against a claim.",
      "Both rely on approximately normal sampling distributions.",
      "State-Check-Compute-Conclude template on every FRQ.",
    ],
    workedExample: {
      prompt:
        "Why does the Large Counts condition matter for a z-confidence interval for a proportion?",
      solution:
        "The z-interval uses the normal approximation to the sampling distribution of \\(\\hat p\\). Large Counts (\\(np \\ge 10, n(1-p) \\ge 10\\)) ensures the approximation is accurate. Without it, the interval's stated confidence level is wrong.",
    },
    flashcards: [
      { q: "Two main tools of inference?", a: "Confidence intervals and significance tests." },
      { q: "Why must the sampling distribution be approximately normal?", a: "z-procedures rely on the normal approximation." },
      { q: "Four steps on every inference FRQ?", a: "State, Check, Compute, Conclude." },
    ],
    commonMistakes: [
      "Skipping the check-conditions step.",
      "Using a z-interval when conditions aren't met.",
      "Interpreting the confidence interval as a probability about the parameter.",
    ],
    quiz: [
      {
        q: "The purpose of a confidence interval is to:",
        choices: ["Prove a parameter is a specific value.", "Give a range of plausible values for the parameter.", "Compute a sample statistic.", "Test independence."],
        answerIndex: 1,
        explanation: "CIs provide plausible parameter values with a stated confidence.",
      },
      {
        q: "A hypothesis test helps you:",
        choices: ["Estimate a parameter.", "Evaluate evidence against a specific claim.", "Find the sample mean.", "Compute a variance."],
        answerIndex: 1,
        explanation: "Tests assess whether data provide evidence against a claim.",
      },
      {
        q: "The Large Counts condition ensures:",
        choices: ["Random sampling.", "Approximate normality of \\(\\hat p\\).", "Independence of samples.", "Validity of pooled SE."],
        answerIndex: 1,
        explanation: "Large Counts justifies the normal approximation for \\(\\hat p\\).",
      },
      {
        q: "On an inference FRQ, you should always:",
        choices: ["Jump to the formula.", "State, check, compute, conclude — in context.", "Use p = 0.5.", "Assume normality without checking."],
        answerIndex: 1,
        explanation: "The four-step structure is required for full credit.",
      },
    ],
  },

  "6.2": {
    id: "6.2",
    title: "Constructing a Confidence Interval for a Population Proportion",
    summary:
      "One-prop z-interval: \\(\\hat p \\pm z^* \\sqrt{\\hat p(1-\\hat p)/n}\\). Check Random, 10%, and Large Counts (using \\(\\hat p\\)).",
    lesson:
      "A \\(\\textit{one-sample z-interval}\\) for a population proportion \\(p\\) is:\n\n\\[\\hat p \\pm z^*\\sqrt{\\dfrac{\\hat p(1-\\hat p)}{n}}\\]\n\nwhere \\(\\hat p\\) = sample proportion, \\(n\\) = sample size, and \\(z^*\\) is the critical value from \\(N(0,1)\\) for the chosen confidence level (1.645 for 90%, 1.96 for 95%, 2.576 for 99%).\n\nConditions:\n- \\(\\textbf{Random}\\): data from a random sample (or random assignment for experiments).\n- \\(\\textbf{10\\%}\\): \\(n \\le 0.1N\\) (when sampling without replacement).\n- \\(\\textbf{Large Counts}\\): \\(n\\hat p \\ge 10\\) AND \\(n(1-\\hat p) \\ge 10\\). For intervals, use \\(\\hat p\\) (not \\(p_0\\)) since we don't have a hypothesized p.\n\nReport the interval as (lower, upper). The margin of error is \\(z^*\\sqrt{\\hat p(1-\\hat p)/n}\\).\n\nOn FRQs, show \\(\\hat p\\), \\(n\\), all three condition checks with specific numbers, the computation, and the final interval with context.",
    keyIdeas: [
      "Interval: \\(\\hat p \\pm z^*\\sqrt{\\hat p(1-\\hat p)/n}\\).",
      "Critical values: 1.645 (90%), 1.96 (95%), 2.576 (99%).",
      "Conditions: Random, 10%, Large Counts with \\(\\hat p\\).",
      "For CI, use \\(\\hat p\\) in SE, not some hypothesized value.",
    ],
    workedExample: {
      prompt:
        "A random sample of 500 voters finds 290 support a candidate. Construct a 95% confidence interval for \\(p\\).",
      solution:
        "\\(\\hat p = 290/500 = 0.58\\). Conditions: Random (given). 10%: assuming \\(\\ge 5000\\) voters, ok. Large Counts: \\(500(0.58) = 290, 500(0.42) = 210\\), both ≥ 10. SE = \\(\\sqrt{0.58(0.42)/500} \\approx 0.02206\\). 95% CI: \\(0.58 \\pm 1.96(0.02206) = 0.58 \\pm 0.0432\\), or about (0.537, 0.623). We are 95% confident the true proportion of voters supporting the candidate is between 53.7% and 62.3%.",
    },
    flashcards: [
      { q: "CI formula for proportion?", a: "\\(\\hat p \\pm z^*\\sqrt{\\hat p(1-\\hat p)/n}\\)." },
      { q: "z* for 95% CI?", a: "1.96." },
      { q: "Which p in SE: \\(\\hat p\\) or \\(p_0\\)?", a: "\\(\\hat p\\) for intervals." },
    ],
    commonMistakes: [
      "Using \\(p_0\\) in SE for a CI.",
      "Using wrong z* value.",
      "Forgetting to check Large Counts with \\(\\hat p\\).",
    ],
    quiz: [
      {
        q: "For a 99% CI of \\(p\\), the critical value \\(z^*\\) is:",
        choices: ["1.645", "1.96", "2.576", "3.0"],
        answerIndex: 2,
        explanation: "\\(z^* = 2.576\\) for 99% confidence.",
      },
      {
        q: "A 95% CI for \\(p\\) is (0.42, 0.58). The margin of error is:",
        choices: ["0.08", "0.16", "0.04", "0.50"],
        answerIndex: 0,
        explanation: "MoE = (upper − lower) / 2 = 0.16 / 2 = 0.08.",
      },
      {
        q: "A student reports CI = \\(\\hat p \\pm z^* \\sqrt{p_0(1-p_0)/n}\\). What's wrong?",
        choices: ["Nothing.", "Should use \\(\\hat p\\) in the SE for a CI.", "Wrong z*.", "Missing square root."],
        answerIndex: 1,
        explanation: "Confidence intervals use \\(\\hat p\\) in the SE; \\(p_0\\) is only for tests.",
      },
      {
        q: "Large Counts for a 1-prop CI uses:",
        choices: ["\\(np_0\\)", "\\(n\\hat p\\) and \\(n(1-\\hat p)\\)", "\\(n \\ge 30\\)", "Population size N"],
        answerIndex: 1,
        explanation: "For CIs, check \\(n\\hat p\\) and \\(n(1-\\hat p)\\) both at least 10.",
      },
    ],
  },

  "6.3": {
    id: "6.3",
    title: "Justifying a Claim Based on a Confidence Interval for a Population Proportion",
    summary:
      "Interpret the interval: 'We are C% confident the true p is between A and B.' Interpret C%-confidence: in repeated samples, C% of intervals capture p.",
    lesson:
      "Two interpretations to nail:\n\n\\(\\textbf{Interpreting the interval}\\): \"We are C% confident that the true [parameter in context] is between [A] and [B].\" Example: \"We are 95% confident that the true proportion of voters supporting the candidate is between 0.537 and 0.623.\"\n\n\\(\\textbf{Interpreting the confidence level}\\): \"If we took many random samples of size n and constructed a C% CI from each, about C% of those intervals would capture the true parameter.\" This is about the method, not any one interval.\n\n\\(\\textbf{Using a CI to judge a claim}\\): if a claimed value is inside the interval, we don't have convincing evidence against it. If it's outside, we do.\n\nDon't say \"there's a 95% chance \\(p\\) is in the interval\" — the parameter is fixed; the interval is random. Once computed, either \\(p\\) is in it or it isn't.\n\nAlso: confidence intervals address parameters, not individuals. \"95% of voters fall between 0.537 and 0.623\" is wrong — that's not what the interval says.",
    keyIdeas: [
      "Interval interpretation: \"We are C% confident...\"",
      "Level interpretation: \"In repeated sampling, C% of intervals capture the parameter.\"",
      "Don't say there's a C% chance p is in this specific interval.",
      "If claim is inside CI → not convincing evidence against; outside → convincing.",
    ],
    workedExample: {
      prompt:
        "A 95% CI for \\(p\\) is (0.40, 0.52). A newspaper claims \\(p = 0.55\\). Is there evidence against this claim? Interpret the CI and the confidence level.",
      solution:
        "Interpretation of interval: We are 95% confident the true population proportion is between 0.40 and 0.52. Confidence level: if we took many samples and built 95% CIs, about 95% would capture the true p. Since 0.55 is outside (0.40, 0.52), there is convincing evidence against the claim \\(p = 0.55\\).",
    },
    flashcards: [
      { q: "Correct CI interpretation template?", a: "\"We are C% confident the true [parameter] is between [A] and [B].\"" },
      { q: "Confidence level interpretation?", a: "C% of random-sample intervals capture the parameter in repeated sampling." },
      { q: "How does a CI test a claim?", a: "If claimed value is in the interval, not convincing evidence against; if outside, convincing evidence against." },
    ],
    commonMistakes: [
      "Saying 'there's a 95% probability p is in this interval.'",
      "Interpreting the interval as covering individuals or data points.",
      "Forgetting context.",
    ],
    quiz: [
      {
        q: "A 95% CI for \\(p\\) is (0.30, 0.45). The CORRECT interpretation is:",
        choices: ["There's a 95% chance \\(p\\) is between 0.30 and 0.45.", "95% of the population is between 0.30 and 0.45.", "We are 95% confident the true proportion is between 0.30 and 0.45.", "95% of samples fall in this range."],
        answerIndex: 2,
        explanation: "'We are C% confident...' is the standard, correct wording.",
      },
      {
        q: "A 95% CI captures 0.50. A claim that \\(p = 0.50\\):",
        choices: ["Is strongly rejected.", "Cannot be rejected — it's a plausible value.", "Is always correct.", "Requires more data."],
        answerIndex: 1,
        explanation: "Inside the CI = plausible; no convincing evidence against.",
      },
      {
        q: "The CORRECT interpretation of 'C% confidence' is:",
        choices: ["C% of samples are in the interval.", "C% of random-sample CIs capture the parameter in the long run.", "The parameter has a C% chance of being within.", "The SE is exact."],
        answerIndex: 1,
        explanation: "Confidence is about the method's long-run success rate.",
      },
      {
        q: "CI (0.6, 0.8) for \\(p\\). Someone claims \\(p = 0.75\\). Your conclusion:",
        choices: ["Reject the claim.", "0.75 is inside the CI, so it's plausible — no convincing evidence against.", "CI is wrong.", "Run a test."],
        answerIndex: 1,
        explanation: "0.75 is between 0.6 and 0.8 — plausible value.",
      },
    ],
  },

  "6.4": {
    id: "6.4",
    title: "Setting Up a Test for a Population Proportion",
    summary:
      "1-prop z-test: \\(H_0: p = p_0\\) vs \\(H_a\\) (one- or two-sided). Test statistic \\(z = (\\hat p - p_0)/\\sqrt{p_0(1-p_0)/n}\\).",
    lesson:
      "For a hypothesis test about a population proportion:\n\n\\(\\textbf{Hypotheses}\\):\n- \\(H_0: p = p_0\\) (null — the claim to test against).\n- \\(H_a: p \\ne p_0\\) (two-sided), \\(p > p_0\\) (right-sided), or \\(p < p_0\\) (left-sided).\n\nChoose direction based on the research question. Always state hypotheses BEFORE computing.\n\n\\(\\textbf{Test statistic}\\):\n\\[z = \\dfrac{\\hat p - p_0}{\\sqrt{p_0(1-p_0)/n}}.\\]\n\nNote: use \\(p_0\\) (the hypothesized value) in the SE for a TEST. This differs from a CI, where we use \\(\\hat p\\). Why? Under \\(H_0\\), we assume \\(p = p_0\\), so the sampling distribution has SD \\(\\sqrt{p_0(1-p_0)/n}\\).\n\n\\(\\textbf{Conditions}\\):\n- Random.\n- 10%.\n- Large Counts with \\(p_0\\) (NOT \\(\\hat p\\)): \\(np_0 \\ge 10\\) and \\(n(1-p_0) \\ge 10\\).\n\nThese match the assumption \\(p = p_0\\).",
    keyIdeas: [
      "Null \\(H_0: p = p_0\\), alternative specifies direction.",
      "Test statistic: \\(z = (\\hat p - p_0)/\\sqrt{p_0(1-p_0)/n}\\).",
      "SE uses \\(p_0\\) (not \\(\\hat p\\)) for tests.",
      "Large Counts check with \\(p_0\\) for tests.",
    ],
    workedExample: {
      prompt:
        "Claim: more than 40% of adults exercise daily. A random sample of 200 adults has 95 who exercise daily. Set up the test, compute \\(z\\).",
      solution:
        "\\(H_0: p = 0.40\\), \\(H_a: p > 0.40\\). \\(\\hat p = 95/200 = 0.475\\). SE \\(= \\sqrt{0.40(0.60)/200} = \\sqrt{0.0012} \\approx 0.0346\\). \\(z = (0.475 - 0.40)/0.0346 \\approx 2.17\\). Conditions: Random (given), 10% assumed, Large Counts: \\(np_0 = 80 \\ge 10, n(1-p_0) = 120 \\ge 10\\).",
    },
    flashcards: [
      { q: "Test statistic for 1-prop z-test?", a: "\\(z = (\\hat p - p_0)/\\sqrt{p_0(1-p_0)/n}\\)." },
      { q: "Test vs CI: what goes in the SE?", a: "Test uses \\(p_0\\); CI uses \\(\\hat p\\)." },
      { q: "Which p for Large Counts in a test?", a: "\\(p_0\\) — because we assume \\(H_0\\) is true." },
    ],
    commonMistakes: [
      "Using \\(\\hat p\\) in the SE of a test.",
      "Forgetting to state hypotheses first.",
      "Wrong direction in \\(H_a\\).",
    ],
    quiz: [
      {
        q: "For a 1-prop z-test of \\(H_0: p = 0.3\\), the SE uses:",
        choices: ["\\(\\hat p\\)", "\\(p_0\\) = 0.3", "\\(\\hat p - p_0\\)", "Sample SD"],
        answerIndex: 1,
        explanation: "Tests use \\(p_0\\) in SE since \\(H_0\\) assumes \\(p = p_0\\).",
      },
      {
        q: "Null hypothesis for a test of proportion p:",
        choices: ["\\(\\hat p = p_0\\)", "\\(p = p_0\\)", "\\(\\hat p > p_0\\)", "\\(p \\ne p_0\\)"],
        answerIndex: 1,
        explanation: "\\(H_0\\) concerns the population parameter p.",
      },
      {
        q: "\"More than 30% of a population likes X\" is an alternative hypothesis of form:",
        choices: ["\\(p > 0.3\\)", "\\(p < 0.3\\)", "\\(p \\ne 0.3\\)", "\\(p = 0.3\\)"],
        answerIndex: 0,
        explanation: "Directional: we test against \\(H_0: p = 0.3\\) with \\(H_a: p > 0.3\\).",
      },
      {
        q: "A test uses \\(\\hat p\\) in SE instead of \\(p_0\\). This:",
        choices: ["Is correct.", "Is wrong — tests use \\(p_0\\) in SE; CIs use \\(\\hat p\\).", "Makes the test stronger.", "Is standard practice."],
        answerIndex: 1,
        explanation: "Confusion between test and CI; tests require \\(p_0\\) in SE.",
      },
    ],
  },

  "6.5": {
    id: "6.5",
    title: "Interpreting p-Values",
    summary:
      "A p-value is the probability of observing a test statistic as or more extreme than what we saw, assuming \\(H_0\\) is true. Smaller p-values = stronger evidence against \\(H_0\\).",
    lesson:
      "The \\(\\textit{p-value}\\) answers: assuming \\(H_0\\) is true, how unlikely is our observed data (or more extreme)?\n\nCompute: for a one-sided test, p-value is the tail probability beyond the observed z. For two-sided, double the one-sided tail probability.\n\nCalculator: normalcdf(z, \\(\\infty\\), 0, 1) for right-tail, etc.\n\n\\(\\textbf{Interpretation}\\): \"Assuming \\(H_0: p = p_0\\) is true, the probability of getting a sample proportion at least as extreme as \\(\\hat p\\) is [p-value].\"\n\nSmaller p-value = more surprising data under \\(H_0\\) = stronger evidence against \\(H_0\\). Compare to significance level \\(\\alpha\\) (usually 0.05):\n- \\(p \\le \\alpha\\): reject \\(H_0\\).\n- \\(p > \\alpha\\): fail to reject \\(H_0\\).\n\n\\(\\textbf{P-value is NOT}\\):\n- The probability that \\(H_0\\) is true.\n- The probability of making a wrong decision.\n- The probability the data occurred by chance.",
    keyIdeas: [
      "p-value = \\(P(\\text{data or more extreme} | H_0)\\).",
      "Smaller p = stronger evidence against \\(H_0\\).",
      "p ≤ α → reject; p > α → fail to reject.",
      "p-value is NOT probability that \\(H_0\\) is true.",
    ],
    workedExample: {
      prompt:
        "\\(z = 2.17\\) for a right-sided test. Find the p-value and interpret.",
      solution:
        "p-value = \\(P(Z > 2.17) = \\) normalcdf(2.17, \\(\\infty\\), 0, 1) \\(\\approx 0.015\\). Interpretation: assuming \\(H_0\\) is true, the probability of observing \\(\\hat p\\) as large or larger than the one we saw is about 0.015. Since \\(p < 0.05\\), we reject \\(H_0\\) at the 5% level.",
    },
    flashcards: [
      { q: "p-value definition?", a: "Probability of data as or more extreme under \\(H_0\\)." },
      { q: "Decision rule?", a: "\\(p \\le \\alpha\\) → reject; \\(p > \\alpha\\) → fail to reject." },
      { q: "Is p-value the probability \\(H_0\\) is true?", a: "No — it's a conditional probability given \\(H_0\\)." },
    ],
    commonMistakes: [
      "Saying \"p-value is the probability \\(H_0\\) is true.\"",
      "Conflating p-value with significance level.",
      "Using p-value alone without α comparison.",
    ],
    quiz: [
      {
        q: "A p-value of 0.03 means:",
        choices: ["There's a 3% chance \\(H_0\\) is true.", "Assuming \\(H_0\\), the probability of data this extreme is 3%.", "We accept \\(H_0\\).", "\\(H_a\\) is wrong."],
        answerIndex: 1,
        explanation: "p-value is conditional on \\(H_0\\), not a probability \\(H_0\\) is true.",
      },
      {
        q: "At \\(\\alpha = 0.05\\), a p-value of 0.08 means you:",
        choices: ["Reject \\(H_0\\).", "Fail to reject \\(H_0\\).", "Prove \\(H_0\\) true.", "Get more data."],
        answerIndex: 1,
        explanation: "\\(0.08 > 0.05\\) → fail to reject.",
      },
      {
        q: "Smaller p-values correspond to:",
        choices: ["Weaker evidence against \\(H_0\\).", "Stronger evidence against \\(H_0\\).", "No effect.", "Acceptance of \\(H_0\\)."],
        answerIndex: 1,
        explanation: "Smaller p = data more inconsistent with \\(H_0\\) = stronger evidence against.",
      },
      {
        q: "A two-sided test has \\(z = -1.96\\). p-value is approximately:",
        choices: ["0.025", "0.05", "0.10", "0.95"],
        answerIndex: 1,
        explanation: "Two-sided: \\(2 \\times P(Z < -1.96) = 2(0.025) = 0.05\\).",
      },
    ],
  },

  "6.6": {
    id: "6.6",
    title: "Concluding a Test for a Population Proportion",
    summary:
      "Compare p-value to \\(\\alpha\\). Reject or fail to reject \\(H_0\\). State the conclusion in context — never 'accept \\(H_0\\).'",
    lesson:
      "The final step of every significance test:\n\n\\(\\textbf{Decision}\\):\n- If \\(p \\le \\alpha\\): \"We reject \\(H_0\\)\" at the \\(\\alpha\\) level.\n- If \\(p > \\alpha\\): \"We fail to reject \\(H_0\\)\" at the \\(\\alpha\\) level.\n\n\\(\\textbf{Never}\\) say \"accept \\(H_0\\).\" Fail-to-reject means we don't have enough evidence against \\(H_0\\), not that we've proved it true.\n\n\\(\\textbf{Conclusion in context}\\):\n- Reject: \"There is convincing evidence that [alternative in context].\"\n- Fail to reject: \"There is not convincing evidence that [alternative in context].\"\n\nAlways reference the parameter, the value tested, and the population in plain language. Include the significance level.\n\nExample: \"Because \\(p = 0.015 < 0.05\\), we reject \\(H_0\\). There is convincing evidence that more than 40% of adults in this population exercise daily.\"",
    keyIdeas: [
      "Decision rule: \\(p \\le \\alpha\\) → reject; \\(p > \\alpha\\) → fail to reject.",
      "Never 'accept \\(H_0\\).' Only 'fail to reject.'",
      "Conclusion references the alternative, population, and context.",
      "Include the significance level in the conclusion.",
    ],
    workedExample: {
      prompt:
        "A test gives p-value 0.07 at \\(\\alpha = 0.05\\) for \\(H_0: p = 0.5\\) vs \\(H_a: p > 0.5\\). Conclude.",
      solution:
        "Because \\(p = 0.07 > 0.05\\), we fail to reject \\(H_0\\). There is not convincing evidence that the true proportion is greater than 0.5. (Don't say we've 'proved' \\(p = 0.5\\) — just that we lack sufficient evidence against it.)",
    },
    flashcards: [
      { q: "Conclusion when p ≤ α?", a: "Reject \\(H_0\\); convincing evidence for \\(H_a\\)." },
      { q: "Conclusion when p > α?", a: "Fail to reject \\(H_0\\); not convincing evidence for \\(H_a\\)." },
      { q: "Why never 'accept \\(H_0\\)'?", a: "Fail to reject means insufficient evidence, not proof of \\(H_0\\)." },
    ],
    commonMistakes: [
      "Saying 'accept \\(H_0\\).'",
      "Conclusion without context (no variable/population named).",
      "Comparing p to the wrong α.",
    ],
    quiz: [
      {
        q: "At \\(\\alpha = 0.05\\), p-value = 0.03. The decision is:",
        choices: ["Reject \\(H_0\\)", "Accept \\(H_0\\)", "Fail to reject \\(H_0\\)", "Inconclusive"],
        answerIndex: 0,
        explanation: "\\(p \\le \\alpha\\) → reject \\(H_0\\).",
      },
      {
        q: "Which is NEVER an acceptable conclusion?",
        choices: ["Reject \\(H_0\\).", "Fail to reject \\(H_0\\).", "Accept \\(H_0\\).", "Insufficient evidence to reject \\(H_0\\)."],
        answerIndex: 2,
        explanation: "\"Accept\" is incorrect; we can only fail to reject.",
      },
      {
        q: "Strong evidence FOR \\(H_a\\) requires:",
        choices: ["Large p-value.", "p-value ≤ α.", "Sample mean equal to zero.", "\\(\\hat p = p_0\\)."],
        answerIndex: 1,
        explanation: "Small p ≤ α means the data contradict \\(H_0\\), supporting \\(H_a\\).",
      },
      {
        q: "A proper conclusion in context:",
        choices: ["'Reject \\(H_0\\).'", "'At \\(\\alpha = 0.05\\), we reject \\(H_0\\); convincing evidence more than 40% of students own a car.'", "'The data are significant.'", "'\\(p = 0.03\\).'"],
        answerIndex: 1,
        explanation: "Full conclusion: decision + significance level + context (parameter, population, alternative).",
      },
    ],
  },

  "6.7": {
    id: "6.7",
    title: "Potential Errors When Performing Tests",
    summary:
      "Type I: reject a true \\(H_0\\). Type II: fail to reject a false \\(H_0\\). Power = 1 - P(Type II). Increase power with larger n, larger effect, larger α.",
    lesson:
      "Two possible errors in any significance test:\n\n\\(\\textbf{Type I error}\\): rejecting \\(H_0\\) when it's actually true. Probability of Type I = \\(\\alpha\\) (the significance level).\n\n\\(\\textbf{Type II error}\\): failing to reject \\(H_0\\) when it's actually false. Probability of Type II = \\(\\beta\\).\n\n\\(\\textbf{Power}\\) = \\(1 - \\beta\\) = probability of correctly rejecting a false \\(H_0\\). High power is good.\n\nInterpretations:\n- Type I in context: \"We conclude X when really X is not true.\"\n- Type II in context: \"We fail to find X when really X is true.\"\n- Power in context: \"Probability we correctly detect that X is true.\"\n\n\\(\\textbf{Ways to increase power}\\):\n- Larger sample size (reduces SE, easier to detect effects).\n- Larger true effect (farther \\(p\\) is from \\(p_0\\)).\n- Larger \\(\\alpha\\) (more willingness to reject, but more Type I errors).\n- Lower variability.\n\nTrade-off: decreasing \\(\\alpha\\) reduces Type I but increases Type II (reduces power).",
    keyIdeas: [
      "Type I: reject true \\(H_0\\); probability \\(\\alpha\\).",
      "Type II: fail to reject false \\(H_0\\); probability \\(\\beta\\).",
      "Power = 1 - \\(\\beta\\).",
      "Increase power: larger n, larger effect, larger α, lower variability.",
    ],
    workedExample: {
      prompt:
        "Context: testing if a drug works better than placebo. Describe Type I and Type II errors and their consequences.",
      solution:
        "Type I: conclude drug works when it really doesn't — consequence: ineffective (possibly harmful) drug released. Type II: conclude drug doesn't work when it really does — consequence: useful drug rejected, patients miss out. Power = probability of correctly concluding the drug works when it actually does.",
    },
    flashcards: [
      { q: "Type I error definition?", a: "Rejecting \\(H_0\\) when it's true." },
      { q: "Type II error definition?", a: "Failing to reject \\(H_0\\) when it's false." },
      { q: "Power formula?", a: "Power = 1 - \\(\\beta\\), probability of correctly rejecting false \\(H_0\\)." },
    ],
    commonMistakes: [
      "Confusing Type I with Type II.",
      "Thinking α and β move together (they trade off).",
      "Describing power without reference to \\(H_0\\) being false.",
    ],
    quiz: [
      {
        q: "Type I error probability equals:",
        choices: ["\\(\\beta\\)", "Power", "\\(\\alpha\\)", "1 - \\(\\alpha\\)"],
        answerIndex: 2,
        explanation: "By definition, \\(P(\\text{Type I}) = \\alpha\\).",
      },
      {
        q: "To increase power, you can:",
        choices: ["Decrease n.", "Increase n.", "Increase \\(\\beta\\).", "Decrease effect size."],
        answerIndex: 1,
        explanation: "Larger n reduces SE, making it easier to detect effects — higher power.",
      },
      {
        q: "A Type II error occurs when:",
        choices: ["\\(H_0\\) is true and we reject.", "\\(H_0\\) is false and we fail to reject.", "\\(H_0\\) is true and we fail to reject.", "\\(H_a\\) is true and we reject."],
        answerIndex: 1,
        explanation: "Type II: miss a true effect by failing to reject a false \\(H_0\\).",
      },
      {
        q: "Decreasing α from 0.05 to 0.01 will:",
        choices: ["Increase power.", "Decrease power (increase β).", "Leave power unchanged.", "Decrease sample size."],
        answerIndex: 1,
        explanation: "Tighter α → harder to reject → more Type II errors → less power.",
      },
    ],
  },

  "6.8": {
    id: "6.8",
    title: "Confidence Intervals for the Difference of Two Proportions",
    summary:
      "2-prop z-interval: \\((\\hat p_1 - \\hat p_2) \\pm z^*\\sqrt{\\hat p_1(1-\\hat p_1)/n_1 + \\hat p_2(1-\\hat p_2)/n_2}\\).",
    lesson:
      "For independent samples from two populations:\n\n\\[(\\hat p_1 - \\hat p_2) \\pm z^*\\sqrt{\\dfrac{\\hat p_1(1-\\hat p_1)}{n_1} + \\dfrac{\\hat p_2(1-\\hat p_2)}{n_2}}.\\]\n\nConditions (each sample):\n- Random.\n- 10% condition.\n- Large Counts: \\(n_1\\hat p_1, n_1(1-\\hat p_1), n_2\\hat p_2, n_2(1-\\hat p_2)\\) all \\(\\ge 10\\).\n- Samples are independent.\n\nNote: for CIs, use the individual sample proportions \\(\\hat p_1, \\hat p_2\\) in the SE — no pooling, because we're not assuming \\(p_1 = p_2\\). Pooling is only for tests (Topic 6.10).",
    keyIdeas: [
      "Interval: \\((\\hat p_1 - \\hat p_2) \\pm z^* \\cdot \\text{SE}\\).",
      "SE = \\(\\sqrt{\\hat p_1(1-\\hat p_1)/n_1 + \\hat p_2(1-\\hat p_2)/n_2}\\).",
      "No pooling in CIs.",
      "Check Large Counts for both samples separately.",
    ],
    workedExample: {
      prompt:
        "\\(\\hat p_1 = 0.4, n_1 = 100; \\hat p_2 = 0.3, n_2 = 120\\). Construct a 95% CI for \\(p_1 - p_2\\).",
      solution:
        "SE = \\(\\sqrt{0.4(0.6)/100 + 0.3(0.7)/120} = \\sqrt{0.0024 + 0.00175} = \\sqrt{0.00415} \\approx 0.0644\\). 95% CI: \\(0.1 \\pm 1.96(0.0644) = 0.1 \\pm 0.126\\), or \\((-0.026, 0.226)\\). We are 95% confident the true difference \\(p_1 - p_2\\) is between \\(-0.026\\) and \\(0.226\\).",
    },
    flashcards: [
      { q: "2-prop z-interval formula?", a: "\\((\\hat p_1 - \\hat p_2) \\pm z^*\\sqrt{\\hat p_1(1-\\hat p_1)/n_1 + \\hat p_2(1-\\hat p_2)/n_2}\\)." },
      { q: "Do we pool for CIs?", a: "No — CIs use individual \\(\\hat p\\); pooling is only for tests." },
      { q: "How many Large Counts checks?", a: "Four total — two for each sample." },
    ],
    commonMistakes: [
      "Pooling for the CI (that's for tests).",
      "Forgetting samples must be independent.",
      "Subtracting variances in the SE.",
    ],
    quiz: [
      {
        q: "2-prop CI uses which SE?",
        choices: ["Pooled SE", "\\(\\sqrt{\\hat p_1(1-\\hat p_1)/n_1 + \\hat p_2(1-\\hat p_2)/n_2}\\)", "\\(\\sigma/\\sqrt n\\)", "\\(\\hat p(1-\\hat p)/n\\)"],
        answerIndex: 1,
        explanation: "Unpooled SE is used for intervals (no \\(H_0\\) to assume).",
      },
      {
        q: "A 95% CI for \\(p_1 - p_2\\) is \\((-0.05, 0.10)\\). Interpretation:",
        choices: ["\\(p_1 = p_2\\) exactly.", "We are 95% confident true difference is between \\(-0.05\\) and \\(0.10\\).", "\\(p_1 > p_2\\).", "Sample size too small."],
        answerIndex: 1,
        explanation: "CI = plausible range for the parameter difference.",
      },
      {
        q: "When a 2-prop CI contains 0:",
        choices: ["\\(p_1 = p_2\\) certainly.", "We cannot rule out no difference — no convincing evidence \\(p_1 \\ne p_2\\).", "\\(p_1 > p_2\\).", "Samples are dependent."],
        answerIndex: 1,
        explanation: "0 in interval = 'no difference' is plausible.",
      },
      {
        q: "For independent 2-prop CI, conditions include Large Counts. How many counts to check?",
        choices: ["One", "Two", "Three", "Four (both samples, both success/failure)"],
        answerIndex: 3,
        explanation: "Check \\(n\\hat p\\) and \\(n(1-\\hat p)\\) for each of the two samples.",
      },
    ],
  },

  "6.9": {
    id: "6.9",
    title: "Justifying a Claim Based on a Confidence Interval for a Difference of Proportions",
    summary:
      "If 0 is in the 2-prop CI, no convincing evidence of difference. If 0 is outside, there is evidence of a difference.",
    lesson:
      "Interpreting a 2-prop CI (for \\(p_1 - p_2\\)):\n\n\\(\\textbf{Interval interpretation}\\): \"We are C% confident the true difference \\(p_1 - p_2\\) is between [A] and [B].\"\n\n\\(\\textbf{Zero test}\\): if the interval contains 0, it's plausible that \\(p_1 = p_2\\) — no convincing evidence of a difference. If 0 is not in the interval, we have convincing evidence of a difference (direction depends on which side).\n\nExample: CI (0.05, 0.15) — both endpoints positive, so we're confident \\(p_1 > p_2\\) by between 5 and 15 percentage points.\n\nExample: CI \\((-0.03, 0.10)\\) — contains 0, so no convincing evidence of a difference.\n\nAlways phrase in context: name the populations, the categorical variable, and the direction of difference.",
    keyIdeas: [
      "Interval interpretation: 'C% confident true difference between A and B.'",
      "0 in interval → no convincing evidence of difference.",
      "0 not in interval → convincing evidence; direction depends on sign.",
      "Phrase in context.",
    ],
    workedExample: {
      prompt:
        "A 95% CI for \\(p_\\text{drug} - p_\\text{placebo}\\) (success rate) is (0.02, 0.14). Interpret and comment on the drug's effectiveness.",
      solution:
        "We are 95% confident the true difference in success rate is between 0.02 and 0.14. Since 0 is not in the interval, we have convincing evidence the drug is more effective than the placebo; estimated improvement is between 2 and 14 percentage points.",
    },
    flashcards: [
      { q: "Does CI containing 0 suggest difference?", a: "No convincing evidence of a difference." },
      { q: "CI entirely positive means?", a: "\\(p_1 > p_2\\) with stated confidence." },
      { q: "Template for interval interpretation?", a: "'We are C% confident the true difference is between A and B.'" },
    ],
    commonMistakes: [
      "Saying 'p-value = 0.05' when just interpreting a CI.",
      "Confusing sign direction of the difference.",
      "Forgetting context — which is p1, which is p2.",
    ],
    quiz: [
      {
        q: "A 95% CI for \\(p_1 - p_2\\) is \\((-0.02, 0.08)\\). Best conclusion:",
        choices: ["\\(p_1 > p_2\\) with 95% confidence.", "\\(p_1 = p_2\\) exactly.", "No convincing evidence of a difference (0 is in the interval).", "Sample size too small."],
        answerIndex: 2,
        explanation: "0 in CI = no convincing evidence of difference.",
      },
      {
        q: "A 95% CI for \\(p_1 - p_2\\) is \\((0.05, 0.20)\\). We conclude:",
        choices: ["No difference.", "\\(p_2 > p_1\\).", "Convincing evidence \\(p_1 > p_2\\).", "CI is invalid."],
        answerIndex: 2,
        explanation: "Both endpoints positive → \\(p_1 > p_2\\).",
      },
      {
        q: "Interval interpretation MUST include:",
        choices: ["Only the endpoints.", "Endpoints and context (which parameter in which population).", "Z-value only.", "Sample size."],
        answerIndex: 1,
        explanation: "Context is essential for a credit-worthy interpretation.",
      },
      {
        q: "CI of (\\(-0.25, -0.05\\)) for \\(p_1 - p_2\\). Conclusion:",
        choices: ["\\(p_1 > p_2\\).", "\\(p_1 < p_2\\) — convincing evidence.", "No difference.", "CI includes 0."],
        answerIndex: 1,
        explanation: "Both endpoints negative → \\(p_1 < p_2\\).",
      },
    ],
  },

  "6.10": {
    id: "6.10",
    title: "Setting Up a Test for the Difference of Two Population Proportions",
    summary:
      "2-prop z-test: \\(H_0: p_1 = p_2\\). Use pooled proportion \\(\\hat p_c = (x_1 + x_2)/(n_1 + n_2)\\) in the SE.",
    lesson:
      "For a two-proportion test:\n\n\\(\\textbf{Hypotheses}\\):\n- \\(H_0: p_1 = p_2\\) (or \\(p_1 - p_2 = 0\\)).\n- \\(H_a: p_1 \\ne p_2\\), \\(p_1 > p_2\\), or \\(p_1 < p_2\\).\n\n\\(\\textbf{Pooled proportion}\\): under \\(H_0\\), both populations share a common \\(p\\). Estimate by combining successes:\n\\[\\hat p_c = \\dfrac{x_1 + x_2}{n_1 + n_2}\\]\n\n\\(\\textbf{Standard error (pooled)}\\):\n\\[\\text{SE}_\\text{pooled} = \\sqrt{\\hat p_c(1-\\hat p_c)\\left(\\dfrac{1}{n_1} + \\dfrac{1}{n_2}\\right)}\\]\n\nPooling is done only for the test, because \\(H_0\\) assumes equal proportions. CIs don't pool.\n\n\\(\\textbf{Conditions}\\): Random (both), 10% (both), independent samples, Large Counts with \\(\\hat p_c\\): \\(n_i \\hat p_c, n_i(1-\\hat p_c)\\) all \\(\\ge 10\\).",
    keyIdeas: [
      "\\(H_0: p_1 = p_2\\).",
      "Pooled: \\(\\hat p_c = (x_1+x_2)/(n_1+n_2)\\).",
      "SE uses \\(\\hat p_c\\).",
      "Pooling for tests only; CIs don't pool.",
    ],
    workedExample: {
      prompt:
        "\\(x_1 = 60, n_1 = 100; x_2 = 40, n_2 = 100\\). Compute \\(\\hat p_c\\) and the pooled SE.",
      solution:
        "\\(\\hat p_c = (60+40)/(100+100) = 100/200 = 0.5\\). SE = \\(\\sqrt{0.5(0.5)(1/100 + 1/100)} = \\sqrt{0.25(0.02)} = \\sqrt{0.005} \\approx 0.0707\\).",
    },
    flashcards: [
      { q: "Pooled proportion formula?", a: "\\(\\hat p_c = (x_1 + x_2)/(n_1 + n_2)\\)." },
      { q: "Pooled SE?", a: "\\(\\sqrt{\\hat p_c(1-\\hat p_c)(1/n_1 + 1/n_2)}\\)." },
      { q: "Why pool for a test?", a: "\\(H_0\\) assumes \\(p_1 = p_2\\); pooling gives the best estimate of that common p." },
    ],
    commonMistakes: [
      "Using unpooled SE in a test.",
      "Pooling in a CI.",
      "Forgetting to check Large Counts with \\(\\hat p_c\\).",
    ],
    quiz: [
      {
        q: "For a 2-prop z-test, the SE uses:",
        choices: ["\\(\\hat p_1, \\hat p_2\\) separately.", "Pooled \\(\\hat p_c\\) from combined data.", "\\(p_0\\) = 0.5.", "Average of the two \\(\\hat p\\)'s."],
        answerIndex: 1,
        explanation: "Under \\(H_0\\), a common p justifies pooling.",
      },
      {
        q: "Pooled proportion for \\(x_1 = 20, n_1 = 50, x_2 = 30, n_2 = 100\\):",
        choices: ["0.2", "0.3", "50/150 = 0.333", "0.5"],
        answerIndex: 2,
        explanation: "\\(\\hat p_c = (20+30)/(50+100) = 50/150 \\approx 0.333\\).",
      },
      {
        q: "We pool for 2-prop tests because:",
        choices: ["It makes computation easier.", "Under \\(H_0\\), we assume \\(p_1 = p_2\\), so combining gives the best common estimate.", "CIs always pool.", "Pooling reduces bias."],
        answerIndex: 1,
        explanation: "\\(H_0\\) assumes equal proportions; pooling estimates this single common p.",
      },
      {
        q: "A student pools for the 2-prop CI. This is:",
        choices: ["Correct.", "Wrong — CIs don't assume \\(p_1 = p_2\\), so no pooling.", "Fine as long as \\(n_1 = n_2\\).", "Standard."],
        answerIndex: 1,
        explanation: "Pooling is only valid under \\(H_0\\); CIs don't impose that assumption.",
      },
    ],
  },

  "6.11": {
    id: "6.11",
    title: "Carrying Out a Test for the Difference of Two Population Proportions",
    summary:
      "Compute \\(z = (\\hat p_1 - \\hat p_2)/\\text{SE}_\\text{pooled}\\). Find p-value. Compare to α and conclude in context.",
    lesson:
      "Compute the test statistic:\n\\[z = \\dfrac{(\\hat p_1 - \\hat p_2) - 0}{\\sqrt{\\hat p_c(1-\\hat p_c)(1/n_1 + 1/n_2)}}.\\]\n\nFind the p-value using normalcdf (one-tail or two-tail based on \\(H_a\\)).\n\nCompare to \\(\\alpha\\) and conclude:\n- Reject \\(H_0\\): \"Convincing evidence that \\(p_1\\) and \\(p_2\\) differ\" (with direction if one-sided).\n- Fail to reject: \"Not convincing evidence that \\(p_1\\) differs from \\(p_2\\).\"\n\nComplete template on FRQ:\n1. State parameters (\\(p_1, p_2\\)) and hypotheses.\n2. Identify test: 2-prop z-test.\n3. Check conditions (Random, 10%, Large Counts with \\(\\hat p_c\\), independence).\n4. Compute \\(\\hat p_1, \\hat p_2, \\hat p_c\\), SE, z, p-value.\n5. Compare p to α; conclude in context.",
    keyIdeas: [
      "Test statistic: \\(z = (\\hat p_1 - \\hat p_2)/\\text{SE}_\\text{pooled}\\).",
      "p-value: tail probability of Z.",
      "Conclude in context: name populations and direction.",
      "Full template: State, Identify, Check, Compute, Conclude.",
    ],
    workedExample: {
      prompt:
        "Test \\(H_0: p_1 = p_2\\) vs \\(H_a: p_1 > p_2\\) with \\(\\hat p_1 = 0.6, n_1 = 100, \\hat p_2 = 0.4, n_2 = 150\\) at \\(\\alpha = 0.05\\).",
      solution:
        "\\(\\hat p_c = (60+60)/(100+150) = 120/250 = 0.48\\). SE = \\(\\sqrt{0.48(0.52)(1/100+1/150)} = \\sqrt{0.2496(0.01667)} = \\sqrt{0.00416} \\approx 0.0645\\). \\(z = (0.6 - 0.4)/0.0645 \\approx 3.10\\). p-value = \\(P(Z > 3.10) \\approx 0.001\\). Since \\(p = 0.001 < 0.05\\), reject \\(H_0\\). Convincing evidence that \\(p_1 > p_2\\) in context.",
    },
    flashcards: [
      { q: "Test statistic for 2-prop test?", a: "\\(z = (\\hat p_1 - \\hat p_2)/\\sqrt{\\hat p_c(1-\\hat p_c)(1/n_1 + 1/n_2)}\\)." },
      { q: "p-value for a two-sided 2-prop test?", a: "Double the one-tailed probability beyond observed \\(|z|\\)." },
      { q: "Final conclusion template?", a: "\"Reject/Fail to reject; convincing/not convincing evidence that p1 differs from p2.\"" },
    ],
    commonMistakes: [
      "Using unpooled SE in the test.",
      "Not stating conclusion in context.",
      "Using wrong tail for p-value.",
    ],
    quiz: [
      {
        q: "The test statistic for a 2-prop test divides by:",
        choices: ["\\(\\sqrt{\\hat p_1(1-\\hat p_1)/n_1 + \\hat p_2(1-\\hat p_2)/n_2}\\)", "\\(\\sqrt{\\hat p_c(1-\\hat p_c)(1/n_1 + 1/n_2)}\\)", "\\(\\sigma/\\sqrt n\\)", "Pooled variance / n"],
        answerIndex: 1,
        explanation: "Pooled SE uses common \\(\\hat p_c\\).",
      },
      {
        q: "For a 2-sided test, p-value is:",
        choices: ["One-tailed probability.", "Double the one-tailed probability beyond \\(|z|\\).", "\\(z\\) itself.", "\\(\\alpha\\)."],
        answerIndex: 1,
        explanation: "Two-sided tests double the one-tailed area.",
      },
      {
        q: "z = 2.5 for right-sided 2-prop test. p-value ≈",
        choices: ["0.006", "0.025", "0.05", "0.062"],
        answerIndex: 0,
        explanation: "\\(P(Z > 2.5) \\approx 0.0062\\).",
      },
      {
        q: "A proper conclusion:",
        choices: ["'z = 3.10.'", "'Reject H0.'", "'p < 0.05.'", "'At α = 0.05, reject \\(H_0\\); convincing evidence that the proportion of support is higher in Group 1 than Group 2.'"],
        answerIndex: 3,
        explanation: "Full conclusion with decision, α, and context.",
      },
    ],
  },
};
