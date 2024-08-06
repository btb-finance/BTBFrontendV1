// src/app/page.tsx

"use client";

import WalletConnect from './WalletConnect';

const Home = () => {
  return (
    <div>
      <h1>Hello Solana Dapp</h1>
      <WalletConnect />
    </div>
  );
};

export default Home;
