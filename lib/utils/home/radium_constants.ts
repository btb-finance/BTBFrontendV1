export type PoolTypeKey =
  | "all"
  | "concentrated"
  | "standard"
  | "allFarm"
  | "concentratedFarm"
  | "standardFarm";

export const PAGE_SIZE = 10;

export const poolTypes: Record<PoolTypeKey, string> = {
  all: "All",
  concentrated: "Concentrated",
  standard: "Standard",
  allFarm: "All Farm",
  concentratedFarm: "Concentrated Farm",
  standardFarm: "Standard Farm",
};

export const sortTypes = ["desc", "asc"];

export const sortFielts = [
  "default",
  "liquidity",
  "volume24h",
  "fee24h",
  "apr24h",
  "volume7d",
  "fee7h",
  "apr7d",
  "volume30d",
  "fee30d",
  "apr30d",
];
