import { web3, BN, Program } from '@project-serum/anchor';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { BTB_PROGRAM_ID, BTB_MINT, TOKEN_MINTS } from './config';
import { getProgramInstance } from './program';

export async function createBuyTokenTransaction(
  wallet: web3.PublicKey,
  amount: number,
  tokenType: string
) {
  try {
    const program = await getProgramInstance();
    const tokenMint = new web3.PublicKey(getTokenMintByType(tokenType));
    const btbMint = new web3.PublicKey(BTB_MINT);

    // Get all required token accounts
    const userTokenAccount = await getAssociatedTokenAddress(tokenMint, wallet);
    const userBtbAccount = await getAssociatedTokenAddress(btbMint, wallet);
    
    // Get PDA for BTB sale account
    const [btbSaleAccount] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("btb-sale-account"), wallet.toBuffer()],
      new web3.PublicKey(BTB_PROGRAM_ID)
    );

    // Get PDA for BTB sale token account
    const [btbSaleTokenAccount] = web3.PublicKey.findProgramAddressSync(
      [btbSaleAccount.toBuffer(), btbMint.toBuffer()],
      new web3.PublicKey(BTB_PROGRAM_ID)
    );

    // Convert amount to proper decimals (assuming 9 decimals)
    const amountBN = new BN(amount * 1e9);

    const tx = await program.methods
      .buyToken(amountBN, parseInt(tokenType))
      .accounts({
        btbSaleAccount,
        userTokenAccount,
        btbSaleTokenAccount,
        userBtbAccount,
        btbMintAccount: btbMint,
        user: wallet,
        systemProgram: web3.SystemProgram.programId,
        tokenProgram: new web3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        associatedTokenProgram: new web3.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
      })
      .transaction();

    return tx;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}

function getTokenMintByType(tokenType: string): string {
  switch (tokenType) {
    case "1": return TOKEN_MINTS.USDT;
    case "2": return TOKEN_MINTS.USDC;
    case "3": return TOKEN_MINTS.PAYPAL_USD;
    default: throw new Error("Invalid token type");
  }
}