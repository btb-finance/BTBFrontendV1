"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTokenPurchase } from "@/hooks/use-token-purchase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PurchaseFormProps {
  onSuccess?: () => void;
}

export function PurchaseForm({ onSuccess }: PurchaseFormProps) {
  const { purchaseToken, isLoading } = useTokenPurchase();
  const [amount, setAmount] = useState("");
  const [tokenType, setTokenType] = useState("1"); // Default to USDT

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await purchaseToken(parseFloat(amount), tokenType);
    if (success) {
      onSuccess?.();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase BTB Tokens</CardTitle>
        <CardDescription>Enter amount and select payment token</CardDescription>
      </CardHeader>
      <CardContent>
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
              className="w-full"
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

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Buy BTB"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}