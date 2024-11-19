import { PublicKey } from "@solana/web3.js";

export const CONFIG = {
  BTB_MINT: new PublicKey("btbVv5dmAjutpRRSr6DKwBPyPyfKiJw4eXU11BPuTCK"),
  OWNER_INITIALIZE_WALLET: new PublicKey("kk4JSSv7f5GX3ePkB9GKvTEP1n59ZrX1oVxLtXuodC4"),
  OWNER_TOKEN_RECEIVE_WALLET: new PublicKey("te6eqhHuXFuhP1bjBfPs17VS84dR1M725FR9txASuCS"),
  COMMITMENT: "confirmed" as const,
  MIN_AMOUNT: "0.001",
  DECIMALS: 1_000_000,
};