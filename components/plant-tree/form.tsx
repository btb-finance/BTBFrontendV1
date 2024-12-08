"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf, Send } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";

export function TreePlantingForm() {
  const { connected } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement token transfer logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      toast.success("Transaction submitted!", {
        description: "Thank you for contributing to a greener planet!"
      });
    } catch (error: any) {
      toast.error("Transaction failed", {
        description: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-background/50 backdrop-blur-sm" id="tree-planting-form">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto border-primary/20">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Plant Trees with BTB</h2>
              <p className="text-muted-foreground">
                For every 10,000 BTB tokens, we plant one tree and match it with another. Double your environmental impact!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Number of Trees to Plant
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    min="1"
                    placeholder="1 tree = 10,000 BTB"
                    className="pl-10"
                  />
                  <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Total BTB needed: <span className="font-mono">10,000</span>
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={!connected || isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Processing..." : "Plant Trees Now"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                100% of contributions go directly to verified tree planting initiatives
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}