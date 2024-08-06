// src/app/WalletConnect.tsx

"use client";

import { useEffect, useState } from 'react';
import { Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram } from '@solana/web3.js';

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    const { solana } = window as any;
    if (solana) {
      try {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
      } catch (err) {
        console.error(err);
      }
    }
  };

  const callHelloSolana = async () => {
    if (!walletAddress) return;

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const walletPublicKey = new PublicKey(walletAddress);
    const programId = new PublicKey('YourProgramId');

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: walletPublicKey,
        toPubkey: walletPublicKey,
        lamports: 1,
      })
    );

    const { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = walletPublicKey;

    try {
      const { solana } = window as any;
      if (solana) {
        const signedTransaction = await solana.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        await connection.confirmTransaction(signature);
        console.log('Transaction confirmed with signature', signature);
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  useEffect(() => {
    window.addEventListener('load', connectWallet);
  }, []);

  return (
    <div>
      {walletAddress ? (
        <div>
          <p>Connected with wallet {walletAddress}</p>
          <button onClick={callHelloSolana}>Call Hello Solana</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
