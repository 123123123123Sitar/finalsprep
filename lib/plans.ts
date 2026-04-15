export type PlanTier = "free" | "pro" | "premium";
export type PaidPlanTier = Exclude<PlanTier, "free">;
export type BillingInterval = "monthly" | "sixmonth";
export type PaidCheckoutPlan = `${PaidPlanTier}-${BillingInterval}`;
export type CheckoutPlan = "monthly" | "sixmonth" | PaidCheckoutPlan;

export function normalizePlanTier(value: unknown): PlanTier {
  if (value === "pro" || value === "premium") return value;
  // Legacy: "regular" used to be the mid tier — coerce to "pro" now.
  if (value === "regular") return "pro";
  return "free";
}

export function normalizeBillingInterval(
  value: unknown
): BillingInterval | undefined {
  if (value === "monthly" || value === "sixmonth") return value;
  if (value === "yearly") return "sixmonth";
  return undefined;
}

export function isPaidPlan(plan: PlanTier | null | undefined): boolean {
  return !!plan && plan !== "free";
}

export function planLabel(plan: PlanTier): string {
  switch (plan) {
    case "pro":
      return "Pro";
    case "premium":
      return "Premium";
    default:
      return "Free";
  }
}

export function parseCheckoutPlan(input: unknown): {
  key: PaidCheckoutPlan;
  tier: PaidPlanTier;
  interval: BillingInterval;
} {
  const raw = typeof input === "string" ? input : "";
  switch (raw) {
    case "premium-monthly":
      return { key: "premium-monthly", tier: "premium", interval: "monthly" };
    case "premium-sixmonth":
    case "premium-yearly":
      return { key: "premium-sixmonth", tier: "premium", interval: "sixmonth" };
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
    case "premium-monthly":
      return { amount: 29, period: "/ month", monthly: 29 };
    case "premium-sixmonth":
      return { amount: 160, period: "/ 6 months", monthly: 27 };
  }
}
