export type PlanTier = "free" | "regular" | "pro";
export type PaidPlanTier = Exclude<PlanTier, "free">;
export type BillingInterval = "monthly" | "yearly";
export type PaidCheckoutPlan = `${PaidPlanTier}-${BillingInterval}`;
export type CheckoutPlan = "monthly" | "yearly" | PaidCheckoutPlan;

export function normalizePlanTier(value: unknown): PlanTier {
  return value === "regular" || value === "pro" ? value : "free";
}

export function normalizeBillingInterval(
  value: unknown
): BillingInterval | undefined {
  return value === "monthly" || value === "yearly" ? value : undefined;
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
    case "pro-yearly":
      return { key: "pro-yearly", tier: "pro", interval: "yearly" };
    case "regular-yearly":
    case "yearly":
      return { key: "regular-yearly", tier: "regular", interval: "yearly" };
    case "regular-monthly":
    case "monthly":
    default:
      return { key: "regular-monthly", tier: "regular", interval: "monthly" };
  }
}

export function checkoutDescription(
  tier: PaidPlanTier,
  interval: BillingInterval
): string {
  return `${planLabel(tier)} - ${
    interval === "yearly" ? "Yearly" : "Monthly"
  }`;
}
