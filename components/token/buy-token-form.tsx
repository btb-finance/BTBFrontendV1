"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSolanaWallet } from "@/hooks/use-solana-wallet";
import { createBuyTokenTransaction } from "@/lib/solana/token-purchase";
import { toast } from "sonner";
import { useConnection } from "@solana/wallet-adapter-react";

interface BuyTokenFormProps {
  onSuccess?: () => void;
}

export function BuyTokenForm({ onSuccess }: BuyTokenFormProps) {
  const { connected, publicKey } = useSolanaWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [tokenType, setTokenType] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setIsLoading(true);
      const tx = await createBuyTokenTransaction(
        publicKey,
        parseFloat(amount),
        tokenType
      );

      const signature = await window.solana.signAndSendTransaction(tx);
      
      // Wait for transaction confirmation
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
      
      if (confirmation.value.err) {
        throw new Error('Transaction failed');
      }

      toast.success("Purchase successful!", {
        description: "Your BTB tokens have been sent to your wallet"
      });
      onSuccess?.();
    } catch (error: any) {
      toast.error("Transaction failed", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium">
          Amount
        </label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="0.001"
          step="0.001"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="token-type" className="text-sm font-medium">
          Payment Token
        </label>
        <Select value={tokenType} onValueChange={setTokenType}>
          <SelectTrigger>
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">USDT</SelectItem>
            <SelectItem value="2">USDC</SelectItem>
            <SelectItem value="3">PayPal USD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || !connected}>
        {isLoading ? "Processing..." : "Buy BTB"}
      </Button>
    </form>
  );
}