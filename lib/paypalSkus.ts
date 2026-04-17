/**
 * SKU catalog for PayPal Orders. The server is the source of truth for
 * prices and access durations — the client cannot influence what a SKU
 * costs or grants. Adding a new product means adding a row here.
 */

import { parseCheckoutPlan, planPrice, type PaidCheckoutPlan } from "@/lib/plans";
import { TOKEN_PACKS } from "@/lib/tokenPacks";

export type PlanSku = {
  kind: "plan";
  sku: PaidCheckoutPlan;
  priceUsd: number;
  description: string;
  durationMs: number;
  tier: "pro" | "hacker";
  interval: "monthly" | "sixmonth";
};

export type PackSku = {
  kind: "pack";
  sku: string;
  priceUsd: number;
  description: string;
  tokens: number;
};

export type Sku = PlanSku | PackSku;

const MS_PER_DAY = 86_400_000;
const PLAN_DURATION_MS: Record<"monthly" | "sixmonth", number> = {
  monthly: 31 * MS_PER_DAY,
  sixmonth: 183 * MS_PER_DAY,
};

const VALID_COUPONS: Record<string, { appliesTo: PaidCheckoutPlan[]; offUsd: number }> = {
  SCORE5: { appliesTo: ["pro-monthly"], offUsd: 5 },
};

export function resolvePlanSku(raw: unknown): PlanSku {
  const { key, tier, interval } = parseCheckoutPlan(raw);
  const { amount } = planPrice(key);
  return {
    kind: "plan",
    sku: key,
    priceUsd: amount,
    description: `FinalsPrep ${tier === "pro" ? "Pro" : "Hacker"} - ${
      interval === "monthly" ? "1 month" : "6 months"
    } of access`,
    durationMs: PLAN_DURATION_MS[interval],
    tier,
    interval,
  };
}

export function resolvePackSku(raw: unknown): PackSku | null {
  if (typeof raw !== "string") return null;
  const pack = TOKEN_PACKS.find((p) => p.id === raw);
  if (!pack) return null;
  return {
    kind: "pack",
    sku: pack.id,
    priceUsd: pack.priceUsd,
    description: `FinalsPrep ${pack.label} - ${pack.tokens.toLocaleString()} bonus tokens`,
    tokens: pack.tokens,
  };
}

export function applyCoupon(
  sku: PlanSku,
  couponCode: string | null | undefined
): { priceUsd: number; coupon: string | null } {
  if (!couponCode) return { priceUsd: sku.priceUsd, coupon: null };
  const code = couponCode.trim().toUpperCase();
  const rule = VALID_COUPONS[code];
  if (!rule) return { priceUsd: sku.priceUsd, coupon: null };
  if (!rule.appliesTo.includes(sku.sku)) {
    return { priceUsd: sku.priceUsd, coupon: null };
  }
  const next = Math.max(0.5, +(sku.priceUsd - rule.offUsd).toFixed(2));
  return { priceUsd: next, coupon: code };
}
