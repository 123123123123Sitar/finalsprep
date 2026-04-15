export type PlanTier = "learner" | "pro" | "hacker";
export type PaidPlanTier = Exclude<PlanTier, "learner">;
export type BillingInterval = "monthly" | "sixmonth";
export type PaidCheckoutPlan = `${PaidPlanTier}-${BillingInterval}`;
export type CheckoutPlan = "monthly" | "sixmonth" | PaidCheckoutPlan;

export function normalizePlanTier(value: unknown): PlanTier {
  if (value === "pro" || value === "hacker" || value === "learner") return value;
  // Legacy aliases — "free" used to be the bottom tier, "premium" the top.
  if (value === "premium") return "hacker";
  if (value === "free") return "learner";
  // "regular" was a deprecated mid tier; coerce to pro.
  if (value === "regular") return "pro";
  return "learner";
}

export function normalizeBillingInterval(
  value: unknown
): BillingInterval | undefined {
  if (value === "monthly" || value === "sixmonth") return value;
  if (value === "yearly") return "sixmonth";
  return undefined;
}

export function isPaidPlan(plan: PlanTier | null | undefined): boolean {
  return !!plan && plan !== "learner";
}

export function planLabel(plan: PlanTier): string {
  switch (plan) {
    case "pro":
      return "Pro";
    case "hacker":
      return "Hacker";
    default:
      return "Learner";
  }
}

export function parseCheckoutPlan(input: unknown): {
  key: PaidCheckoutPlan;
  tier: PaidPlanTier;
  interval: BillingInterval;
} {
  const raw = typeof input === "string" ? input : "";
  switch (raw) {
    case "hacker-monthly":
    case "premium-monthly": // legacy
      return { key: "hacker-monthly", tier: "hacker", interval: "monthly" };
    case "hacker-sixmonth":
    case "hacker-yearly":
    case "premium-sixmonth": // legacy
    case "premium-yearly": // legacy
      return { key: "hacker-sixmonth", tier: "hacker", interval: "sixmonth" };
    case "pro-monthly":
    case "monthly":
    case "regular-monthly":
      return { key: "pro-monthly", tier: "pro", interval: "monthly" };
    case "pro-sixmonth":
    case "pro-yearly":
    case "sixmonth":
    case "regular-sixmonth":
    case "regular-yearly":
    case "yearly":
      return { key: "pro-sixmonth", tier: "pro", interval: "sixmonth" };
    default:
      return { key: "pro-monthly", tier: "pro", interval: "monthly" };
  }
}

export function checkoutDescription(
  tier: PaidPlanTier,
  interval: BillingInterval
): string {
  const intervalLabel = interval === "sixmonth" ? "6 months" : "Monthly";
  return `${planLabel(tier)} - ${intervalLabel}`;
}

/** Display price in dollars for each checkout plan. Source of truth for the UI. */
export function planPrice(
  plan: PaidCheckoutPlan
): { amount: number; period: string; monthly: number } {
  switch (plan) {
    case "pro-monthly":
      return { amount: 16, period: "/ month", monthly: 16 };
    case "pro-sixmonth":
      return { amount: 90, period: "/ 6 months", monthly: 15 };
    case "hacker-monthly":
      return { amount: 29, period: "/ month", monthly: 29 };
    case "hacker-sixmonth":
      return { amount: 160, period: "/ 6 months", monthly: 27 };
  }
}

/** AP-season promo: $5 off the first month. Used in the hero banner and checkout copy. */
export const AP_SALE_ACTIVE = true;
export const AP_SALE_FIRST_MONTH_OFF_USD = 5;
