"use client";

import { SaleHeader } from "@/components/buybtb/sale-header";
import { SaleStats } from "@/components/buybtb/sale-stats";
import { SaleOptions } from "@/components/buybtb/sale-options";
import { TokenCalculator } from "@/components/buybtb/token-calculator";
import { SaleProgress } from "@/components/buybtb/sale-progress";
import { ParticleSystem } from "@/components/background/particle-system";

export default function BuyBTBPage() {
  return (
    <div className="min-h-screen bg-background">
      <ParticleSystem />
      <main className="container mx-auto px-4 py-16 relative">
        <SaleHeader />
        <SaleStats />
        <SaleOptions />
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <TokenCalculator />
          <SaleProgress />
        </div>
      </main>
    </div>
  );
}