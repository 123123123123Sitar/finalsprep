export type PlanTier = "free" | "regular" | "pro";
export type PaidPlanTier = Exclude<PlanTier, "free">;
export type BillingInterval = "monthly" | "sixmonth";
export type PaidCheckoutPlan = `${PaidPlanTier}-${BillingInterval}`;
export type CheckoutPlan = "monthly" | "sixmonth" | PaidCheckoutPlan;

export function normalizePlanTier(value: unknown): PlanTier {
  return value === "regular" || value === "pro" ? value : "free";
}

export function normalizeBillingInterval(
  value: unknown
): BillingInterval | undefined {
  if (value === "monthly" || value === "sixmonth") return value;
  // Legacy: treat "yearly" as sixmonth for backwards compat during pricing migration.
  if (value === "yearly") return "sixmonth";
  return undefined;
}

export function isPaidPlan(plan: PlanTier | null | undefined): boolean {
  return !!plan && plan !== "free";
}

export function planLabel(plan: PlanTier): string {
  switch (plan) {
    case "regular":
      return "Regular";
    case "pro":
      return "Pro";
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
    case "pro-monthly":
      return { key: "pro-monthly", tier: "pro", interval: "monthly" };
    case "pro-sixmonth":
    case "pro-yearly": // legacy alias
      return { key: "pro-sixmonth", tier: "pro", interval: "sixmonth" };
    case "regular-sixmonth":
    case "sixmonth":
    case "regular-yearly": // legacy alias
    case "yearly": // legacy alias
      return { key: "pro-sixmonth", tier: "pro", interval: "sixmonth" };
    case "regular-monthly":
    case "monthly":
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
export function planPrice(plan: PaidCheckoutPlan): { amount: number; period: string; monthly: number } {
  switch (plan) {
    case "pro-monthly":
      return { amount: 16, period: "/ month", monthly: 16 };
    case "pro-sixmonth":
      return { amount: 90, period: "/ 6 months", monthly: 15 };
    default:
      return { amount: 16, period: "/ month", monthly: 16 };
  }
}
