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

export type Sku = PlanSku | PackSku;

const DAY = 86_400_000;
const PLAN_DURATION_MS = { monthly: 31 * DAY, sixmonth: 183 * DAY };

const PLAN_SKUS: PlanSku[] = [
  { kind: "plan", sku: "pro-monthly", tier: "pro", interval: "monthly", durationMs: PLAN_DURATION_MS.monthly },
  { kind: "plan", sku: "pro-sixmonth", tier: "pro", interval: "sixmonth", durationMs: PLAN_DURATION_MS.sixmonth },
  { kind: "plan", sku: "hacker-monthly", tier: "hacker", interval: "monthly", durationMs: PLAN_DURATION_MS.monthly },
  { kind: "plan", sku: "hacker-sixmonth", tier: "hacker", interval: "sixmonth", durationMs: PLAN_DURATION_MS.sixmonth },
];

const PLAN_ENV_KEYS: Record<PaidCheckoutPlan, string> = {
  "pro-monthly": "KOFI_CODE_PRO_MONTHLY",
  "pro-sixmonth": "KOFI_CODE_PRO_SIXMONTH",
  "hacker-monthly": "KOFI_CODE_HACKER_MONTHLY",
  "hacker-sixmonth": "KOFI_CODE_HACKER_SIXMONTH",
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
): string | null {
  const envKey = params.kind === "plan"
    ? PLAN_ENV_KEYS[params.sku]
    : PACK_ENV_KEYS[params.sku];
  const code = envKey ? codeFor(envKey) : null;
  return code ? `https://ko-fi.com/s/${code}` : null;
}

export function planSkuFromId(sku: string): PlanSku | null {
  return PLAN_SKUS.find((p) => p.sku === sku) ?? null;
}

export function packSkuFromId(id: string): PackSku | null {
  const pack = TOKEN_PACKS.find((p) => p.id === id);
  return pack ? { kind: "pack", sku: pack.id, tokens: pack.tokens } : null;
}
