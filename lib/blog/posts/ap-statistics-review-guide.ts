// Auto-split from lib/blogPosts.ts by tools/split_blogposts.ts.
// One file per post so diffs are small and git blame is readable.
//
// Do not edit the shape of this file manually; the loader in
// lib/blogPosts.ts expects a single named default export per slug.

import type { BlogPost } from "../../blogPosts";

export const POST_AP_STATISTICS_REVIEW_GUIDE: BlogPost = {
    slug: "ap-statistics-review-guide",
    title: "AP Statistics Review Guide: Every Unit with FRQ Strategies",
    metaTitle: "AP Statistics Review Guide: All 9 Units (2026 Exam Prep)",
    description:
      "A complete AP Statistics review guide covering all 9 units, inference procedures, FRQ rubric strategies, and the formulas the exam actually tests. Everything you need for a 5.",
    excerpt:
      "AP Statistics is less about math and more about communication. This unit-by-unit guide covers every inference procedure, the four-part FRQ format graders look for, and the conceptual traps that catch smart students.",
    date: "2026-04-13",
    readTime: "10 min read",
    category: "AP Statistics",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "math",
      "STEM",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Statistics is the AP exam where the math is the easy part and the vocabulary is where students lose points. Readers are looking for specific language in specific places. If you know the four-part template for every inference question and the three conditions to check, the exam turns into a fill-in-the-blanks exercise.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "p",
        text: "3 hours. Section I is 40 multiple choice in 90 minutes. Section II is 6 free response in 90 minutes, one of which is the investigative task (worth about twice as much as a regular FRQ). Calculator allowed throughout, formula sheet provided.",
      },
      { type: "h2", text: "Unit 1: Exploring One-Variable Data" },
      {
        type: "p",
        text: "Roughly 15 to 23 percent of the exam, combined with Unit 2. Topics: distributions, center and spread, outliers, boxplots, histograms, z-scores, normal distribution.",
      },
      {
        type: "p",
        text: "Skills. Describe a distribution using SOCS (shape, outliers, center, spread) in context. Compute z-scores and use the empirical rule (68, 95, 99.7). Identify outliers using the 1.5 IQR rule.",
      },
      { type: "h2", text: "Unit 2: Exploring Two-Variable Data" },
      {
        type: "p",
        text: "Topics: scatterplots, correlation, linear regression, residuals, influential points, coefficient of determination.",
      },
      {
        type: "p",
        text: "Skills. Compute and interpret r and r-squared. Identify linearity from residual plots (no pattern means linear). Interpret slope and intercept in context. Distinguish correlation from causation in your written answer.",
      },
      { type: "h2", text: "Unit 3: Collecting Data" },
      {
        type: "p",
        text: "Roughly 12 to 15 percent. Topics: sampling methods (SRS, stratified, cluster, systematic), experimental design (control, randomization, replication, blinding), observational studies, bias.",
      },
      {
        type: "p",
        text: "Skills. Distinguish an experiment from an observational study (you need random assignment for causation). Identify sources of bias (nonresponse, undercoverage, response bias). Explain why randomization matters.",
      },
      { type: "h2", text: "Unit 4: Probability, Random Variables, and Probability Distributions" },
      {
        type: "p",
        text: "Roughly 10 to 20 percent. Topics: probability rules, conditional probability, independence, expected value, variance, binomial and geometric distributions.",
      },
      {
        type: "p",
        text: "Skills. Apply the addition and multiplication rules. Compute expected value as a weighted sum. Recognize a binomial situation (fixed n, two outcomes, independent, constant p). Geometric: trials until the first success.",
      },
      { type: "h2", text: "Unit 5: Sampling Distributions" },
      {
        type: "p",
        text: "Topics: sampling distribution of the mean, sampling distribution of the proportion, central limit theorem.",
      },
      {
        type: "p",
        text: "Skills. Standard error of a sample mean equals sigma over sqrt of n. Standard error of a sample proportion equals sqrt of (p(1 minus p) over n). Central limit theorem: if n is large enough, the sampling distribution of the mean is approximately normal regardless of the population shape.",
      },
      { type: "h2", text: "Unit 6: Inference for Categorical Data, Proportions" },
      {
        type: "p",
        text: "Roughly 12 to 15 percent. Topics: one-sample z-interval for a proportion, two-sample z-interval and z-test, one-sample z-test for a proportion.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Condition check for proportions. Random (stated or assumed). Independent (10 percent rule). Normal (both n p hat and n (1 minus p hat) at least 10).",
      },
      { type: "h2", text: "Unit 7: Inference for Quantitative Data, Means" },
      {
        type: "p",
        text: "Roughly 10 to 18 percent. Topics: one-sample t-interval and t-test, two-sample t-interval and t-test, matched pairs.",
      },
      {
        type: "p",
        text: "Same four-part template: name the procedure, check conditions, compute, interpret in context. For means, the normal condition is either 'population is normal' or 'n greater than 30' (CLT).",
      },
      { type: "h2", text: "Unit 8: Inference for Categorical Data, Chi-Square" },
      {
        type: "p",
        text: "Three types: goodness of fit (one sample compared to expected), independence (one sample, two variables), homogeneity (multiple samples compared).",
      },
      {
        type: "p",
        text: "Skills. Compute expected counts. Chi-square statistic is the sum of (observed minus expected) squared over expected. Degrees of freedom depend on the test type.",
      },
      { type: "h2", text: "Unit 9: Inference for Quantitative Data, Slopes" },
      {
        type: "p",
        text: "Topics: inference for the slope of a regression line, confidence interval for slope, t-test for slope.",
      },
      {
        type: "p",
        text: "Skills. The slope has a standard error provided on the computer output. The test statistic is t equals (b minus 0) over SE of b. Degrees of freedom is n minus 2.",
      },
      { type: "h2", text: "The four-part FRQ template" },
      {
        type: "ol",
        items: [
          "Name the procedure in full: one-sample t-interval for the true mean, two-proportion z-test for the difference in proportions, etc.",
          "State and check the conditions. Quote the problem for random. Check 10 percent. Check normal.",
          "Compute. Show the formula with numbers substituted, then the interval or test statistic and p-value.",
          "Interpret in context. Use the words 'we are 95 percent confident' or 'there is convincing evidence at the alpha equals 0.05 level that.'",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        text: "Do not say there is a 95 percent chance the true parameter is in the interval. The parameter is fixed. The interval is random. Use the word 'confident', not 'probability'.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Skipping the condition check. That is always worth a point, sometimes two.",
          "Using a z-test when you should use a t-test (t when sigma is unknown, which is almost always).",
          "Writing 'the data' when the question is about the population.",
          "Confusing Type I and Type II errors. Type I: reject H0 when it is true. Type II: fail to reject H0 when it is false.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep has the full four-part template for every inference procedure built into its Stats walkthroughs. Paste a problem and it will coach you through the format, not just the math. Free tier covers the full course.",
      },
      {
        type: "p",
        text: "Stats is about communication. If you can name the procedure, check the conditions, do the arithmetic, and write an interpretation in context, you are a 5.",
      },
    ],
  };
