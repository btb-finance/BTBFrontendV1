"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useSolanaWallet } from "@/hooks/use-solana-wallet";
import { shortenAddress } from "@/lib/utils";

export function WalletConnectButton() {
  const { connected, publicKey, connect, disconnect } = useSolanaWallet();

  if (!connected) {
    return (
      <Button onClick={connect} className="gap-2">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <Button variant="outline" onClick={disconnect} className="gap-2">
      <Wallet className="h-4 w-4" />
      {shortenAddress(publicKey?.toString())}
    </Button>
  );
}