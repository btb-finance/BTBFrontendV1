import { PRICES } from "@/lib/solana/config";

export function calculateTokenAmount(usdAmount: number): number {
  return usdAmount / PRICES.BTB;
}

export function calculateVestingAmount(usdAmount: number): number {
  return usdAmount / PRICES.VESTING;
}