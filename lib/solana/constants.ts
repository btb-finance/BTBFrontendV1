import { web3 } from '@project-serum/anchor';

export const PROGRAM_ID = new web3.PublicKey("abcxGrLevAiSMXHnzaasyrKwU4D58w8Ab5KBA9fcrWj");

export const TOKEN_MINTS = {
  BTB: new web3.PublicKey("btbVv5dmAjutpRRSr6DKwBPyPyfKiJw4eXU11BPuTCK"),
  USDT: new web3.PublicKey("utK7s5CmT6vvkd3JpTg5CfMaqAS8uVMwnqZjPZvcLkD"),
  USDC: new web3.PublicKey("utK7s5CmT6vvkd3JpTg5CfMaqAS8uVMwnqZjPZvcLkD"), // Using USDT mint for testing
  PAYPAL_USD: new web3.PublicKey("utK7s5CmT6vvkd3JpTg5CfMaqAS8uVMwnqZjPZvcLkD") // Using USDT mint for testing
};

export const NETWORK = "devnet";
export const CLUSTER_URL = web3.clusterApiUrl(NETWORK);