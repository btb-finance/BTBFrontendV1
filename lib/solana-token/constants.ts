// constants.ts

import { PublicKey } from "@solana/web3.js";

export const PAYMENT_TOKENS = {
  "1": {
    mint: new PublicKey("utK7s5CmT6vvkd3JpTg5CfMaqAS8uVMwnqZjPZvcLkD"),
    label: "USDT"
  },
  "2": {
    mint: new PublicKey("ucKymLwwPxrPaUDMtYGx5uoho91SfE3Qs2VuXf9dDZB"),
    label: "USDC"
  },
  "3": {
    mint: new PublicKey("pa3x7zKXd2yvPNM8NxJUp1tu1j8xeXyRb6Y65yqPvtQ"),
    label: "PayPal USD"
  }
} as const;

export interface TokenType {
  mint: PublicKey;
  label: string;
}