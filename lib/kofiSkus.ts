/**
 * Ko-fi product catalog + mapping from Ko-fi's `direct_link_code` to our
 * internal plan/pack SKUs. Direct link codes come from the Shop admin UI
 * (ko-fi.com/s/<code>) after publishing a product; set them in env vars:
 *
 *   KOFI_CODE_PRO_MONTHLY
 *   KOFI_CODE_PRO_SIXMONTH
 *   KOFI_CODE_HACKER_MONTHLY
 *   KOFI_CODE_HACKER_SIXMONTH
 *   KOFI_CODE_PACK_SMALL
 *   KOFI_CODE_PACK_MEDIUM
 *   KOFI_CODE_PACK_LARGE
 *
 * The webhook resolves an incoming shop_item's direct_link_code via this
 * map. If a code isn't configured, the grant is skipped.
 */
import type { PaidCheckoutPlan } from "@/lib/plans";
import { TOKEN_PACKS } from "@/lib/tokenPacks";

export type PlanSku = {
  kind: "plan";
  sku: PaidCheckoutPlan;
  tier: "pro" | "hacker";
  interval: "monthly" | "sixmonth";
  durationMs: number;
};

export type PackSku = {
  kind: "pack";
  sku: string;
  tokens: number;
};

export type GiftPlanSku = {
  kind: "gift";
  sku: GiftSkuId;
  tier: "pro" | "hacker";
  interval: "monthly" | "sixmonth";
  durationMs: number;
  /** Tokens credited to the buyer as a referral-style thank-you. */
  buyerRewardTokens: number;
};

export type GiftSkuId =
  | "gift-pro-monthly"
  | "gift-pro-sixmonth"
  | "gift-hacker-monthly"
  | "gift-hacker-sixmonth";

export type Sku = PlanSku | PackSku | GiftPlanSku;

const DAY = 86_400_000;
const PLAN_DURATION_MS = { monthly: 31 * DAY, sixmonth: 183 * DAY };

const PLAN_SKUS: PlanSku[] = [
  { kind: "plan", sku: "pro-monthly", tier: "pro", interval: "monthly", durationMs: PLAN_DURATION_MS.monthly },
  { kind: "plan", sku: "pro-sixmonth", tier: "pro", interval: "sixmonth", durationMs: PLAN_DURATION_MS.sixmonth },
  { kind: "plan", sku: "hacker-monthly", tier: "hacker", interval: "monthly", durationMs: PLAN_DURATION_MS.monthly },
  { kind: "plan", sku: "hacker-sixmonth", tier: "hacker", interval: "sixmonth", durationMs: PLAN_DURATION_MS.sixmonth },
];

// Buyer rewards for gifting — deliberately generous to encourage organic
// sharing, and split by tier so hacker gifts are worth the extra effort.
const GIFT_PRO_REWARD = 1000;
const GIFT_HACKER_REWARD = 2500;

const GIFT_SKUS: GiftPlanSku[] = [
  { kind: "gift", sku: "gift-pro-monthly", tier: "pro", interval: "monthly", durationMs: PLAN_DURATION_MS.monthly, buyerRewardTokens: GIFT_PRO_REWARD },
  { kind: "gift", sku: "gift-pro-sixmonth", tier: "pro", interval: "sixmonth", durationMs: PLAN_DURATION_MS.sixmonth, buyerRewardTokens: GIFT_PRO_REWARD },
  { kind: "gift", sku: "gift-hacker-monthly", tier: "hacker", interval: "monthly", durationMs: PLAN_DURATION_MS.monthly, buyerRewardTokens: GIFT_HACKER_REWARD },
  { kind: "gift", sku: "gift-hacker-sixmonth", tier: "hacker", interval: "sixmonth", durationMs: PLAN_DURATION_MS.sixmonth, buyerRewardTokens: GIFT_HACKER_REWARD },
];

const PLAN_ENV_KEYS: Record<PaidCheckoutPlan, string> = {
  "pro-monthly": "KOFI_CODE_PRO_MONTHLY",
  "pro-sixmonth": "KOFI_CODE_PRO_SIXMONTH",
  "hacker-monthly": "KOFI_CODE_HACKER_MONTHLY",
  "hacker-sixmonth": "KOFI_CODE_HACKER_SIXMONTH",
};

const GIFT_ENV_KEYS: Record<GiftSkuId, string> = {
  "gift-pro-monthly": "KOFI_CODE_GIFT_PRO_MONTHLY",
  "gift-pro-sixmonth": "KOFI_CODE_GIFT_PRO_SIXMONTH",
  "gift-hacker-monthly": "KOFI_CODE_GIFT_HACKER_MONTHLY",
  "gift-hacker-sixmonth": "KOFI_CODE_GIFT_HACKER_SIXMONTH",
};

const PACK_ENV_KEYS: Record<string, string> = {
  "pack-small": "KOFI_CODE_PACK_SMALL",
  "pack-medium": "KOFI_CODE_PACK_MEDIUM",
  "pack-large": "KOFI_CODE_PACK_LARGE",
};

function codeFor(envKey: string): string | null {
  const v = process.env[envKey];
  return v && v.trim() ? v.trim().toLowerCase() : null;
}

/** Resolve a Ko-fi direct_link_code into one of our SKUs. Returns null
 *  if the code isn't mapped (unknown product). */
export function resolveKofiCode(code: string | null | undefined): Sku | null {
  if (!code) return null;
  const normalized = code.trim().toLowerCase();
  if (!normalized) return null;

  for (const plan of PLAN_SKUS) {
    if (codeFor(PLAN_ENV_KEYS[plan.sku]) === normalized) return plan;
  }

  for (const gift of GIFT_SKUS) {
    if (codeFor(GIFT_ENV_KEYS[gift.sku]) === normalized) return gift;
  }

  for (const pack of TOKEN_PACKS) {
    if (codeFor(PACK_ENV_KEYS[pack.id]) === normalized) {
      return { kind: "pack", sku: pack.id, tokens: pack.tokens };
    }
  }

  return null;
}

/** Look up the configured direct-link URL for a SKU. Used by /checkout to
 *  redirect buyers straight to the right Ko-fi product page. */
export function kofiUrlFor(params:
  | { kind: "plan"; sku: PaidCheckoutPlan }
  | { kind: "pack"; sku: string }
  | { kind: "gift"; sku: GiftSkuId }
): string | null {
  let envKey: string | undefined;
  if (params.kind === "plan") envKey = PLAN_ENV_KEYS[params.sku];
  else if (params.kind === "gift") envKey = GIFT_ENV_KEYS[params.sku];
  else envKey = PACK_ENV_KEYS[params.sku];
  const code = envKey ? codeFor(envKey) : null;
  return code ? `https://ko-fi.com/s/${code}` : null;
}

export function planSkuFromId(sku: string): PlanSku | null {
  return PLAN_SKUS.find((p) => p.sku === sku) ?? null;
}

export function giftSkuFromId(sku: string): GiftPlanSku | null {
  return GIFT_SKUS.find((g) => g.sku === sku) ?? null;
}

export function packSkuFromId(id: string): PackSku | null {
  const pack = TOKEN_PACKS.find((p) => p.id === id);
  return pack ? { kind: "pack", sku: pack.id, tokens: pack.tokens } : null;
}
