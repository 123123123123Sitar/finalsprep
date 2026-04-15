/** Client-safe pack definitions. No Firestore imports. */
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
    priceUsd: 5,
    envKey: "STRIPE_PRICE_PACK_SMALL",
  },
  {
    id: "pack-medium",
    label: "Study pack",
    tokens: 12_000,
    priceUsd: 10,
    envKey: "STRIPE_PRICE_PACK_MEDIUM",
  },
  {
    id: "pack-large",
    label: "Cram pack",
    tokens: 30_000,
    priceUsd: 20,
    envKey: "STRIPE_PRICE_PACK_LARGE",
  },
];

export function getPackById(id: string) {
  return TOKEN_PACKS.find((p) => p.id === id);
}
