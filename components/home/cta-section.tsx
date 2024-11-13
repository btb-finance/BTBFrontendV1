"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Earn on BTB Finance?</h2>
        <p className="text-xl mb-8 opacity-90">
          Connect your wallet and start investing in Solana's top liquidity pools.
        </p>
        <Link href="/dashboard">
          <Button variant="secondary" size="lg" className="rounded-full">
            Connect Wallet <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}