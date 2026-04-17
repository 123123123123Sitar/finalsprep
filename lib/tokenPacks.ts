/** Client-safe pack definitions. No Firestore imports. */
export const TOKEN_PACKS: Array<{
  id: "pack-small" | "pack-medium" | "pack-large";
  label: string;
  tokens: number;
  priceUsd: number;
}> = [
  {
    id: "pack-small",
    label: "Starter pack",
    tokens: 5_000,
    priceUsd: 1,
  },
  {
    id: "pack-medium",
    label: "Study pack",
    tokens: 12_000,
    priceUsd: 3,
  },
  {
    id: "pack-large",
    label: "Cram pack",
    tokens: 30_000,
    priceUsd: 5,
  },
];

export function getPackById(id: string) {
  return TOKEN_PACKS.find((p) => p.id === id);
}
