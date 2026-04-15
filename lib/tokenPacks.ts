/** Client-safe pack definitions. No Firestore imports.
 *
 * Pricing math (verify before shipping):
 *   Pack sizes below are LLM tokens that land in the user's bonus bank.
 *   Raw API cost per token on our default models is roughly $0.0000025
 *   (avg across Haiku 4.5 input/output). So a 30k-token pack costs us
 *   about $0.075 in API cost before margin.
 *   Stripe fee on small purchases is 2.9% + $0.30. At $1 Stripe takes
 *   $0.33 (leaving $0.67), at $3 takes $0.39 ($2.61 net), at $5 takes
 *   $0.45 ($4.55 net). All three packs remain profitable at the new
 *   prices — but the $1 starter is thin after fees, so keep an eye on
 *   refunds and avoid frequent repurchasers draining margin.
 */
export const TOKEN_PACKS: Array<{
  id: "pack-small" | "pack-medium" | "pack-large";
  label: string;
  tokens: number;
  priceUsd: number;
  envKey: string;
}> = [
  {
    id: "pack-small",
    label: "Starter pack",
    tokens: 5_000,
    priceUsd: 1,
    envKey: "STRIPE_PRICE_PACK_SMALL",
  },
  {
    id: "pack-medium",
    label: "Study pack",
    tokens: 12_000,
    priceUsd: 3,
    envKey: "STRIPE_PRICE_PACK_MEDIUM",
  },
  {
    id: "pack-large",
    label: "Cram pack",
    tokens: 30_000,
    priceUsd: 5,
    envKey: "STRIPE_PRICE_PACK_LARGE",
  },
];

export function getPackById(id: string) {
  return TOKEN_PACKS.find((p) => p.id === id);
}
