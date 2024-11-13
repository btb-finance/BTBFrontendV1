"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, Wallet, LineChart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

function DemoAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
      <div className="w-[400px] h-[400px] bg-background/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-primary/10">
        <div className="relative h-full">
          <div className={`absolute inset-0 transition-opacity duration-500 ${step === 0 ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="text-lg font-semibold mb-4">Deposit</h3>
            {/* Animation content for deposit */}
          </div>
          <div className={`absolute inset-0 transition-opacity duration-500 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="text-lg font-semibold mb-4">Auto-Rebalance</h3>
            {/* Animation content for rebalancing */}
          </div>
          <div className={`absolute inset-0 transition-opacity duration-500 ${step === 2 ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="text-lg font-semibold mb-4">Earn Yields</h3>
            {/* Animation content for yields */}
          </div>
          <div className={`absolute inset-0 transition-opacity duration-500 ${step === 3 ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="text-lg font-semibold mb-4">Monitor</h3>
            {/* Animation content for monitoring */}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E31E24]/10 via-background to-background animate-gradient" />
      </div>
      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 bg-[#E31E24]/10 rounded-full">
            <div className="relative h-6 w-6">
              <Image
                src="/btb-logo.png"
                alt="btb.finance"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-medium text-[#E31E24]">
              Revolutionizing DeFi on Solana
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-[#E31E24] to-[#E31E24]/60">
            Maximize Your DeFi Earnings with BTB Finance
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Professional automated liquidity management platform for Solana DEXs. 
            Optimize your yields across Orca, Raydium, and more with intelligent rebalancing.
          </p>
          
          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto rounded-full h-12 px-8 text-lg bg-[#E31E24] hover:bg-[#E31E24]/90 group">
                <LayoutDashboard className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Launch Dashboard
              </Button>
            </Link>
            <Link href="/pools">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full h-12 px-8 text-lg group">
                <LineChart className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Explore Pools
              </Button>
            </Link>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            <Link href="/dashboard" className="group">
              <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300">
                <LayoutDashboard className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">Your Dashboard</h3>
                <p className="text-sm text-muted-foreground">Monitor your investments</p>
              </div>
            </Link>
            <Link href="/pools" className="group">
              <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300">
                <LineChart className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">Active Pools</h3>
                <p className="text-sm text-muted-foreground">Explore investment options</p>
              </div>
            </Link>
            <Link href="#token" className="group sm:col-span-2 lg:col-span-1">
              <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300">
                <Wallet className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">BTB Token</h3>
                <p className="text-sm text-muted-foreground">View token details</p>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <h3 className="text-3xl font-bold text-primary">$100M+</h3>
              <p className="text-muted-foreground">Total Value Locked</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">15+</h3>
              <p className="text-muted-foreground">Supported Pools</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">24/7</h3>
              <p className="text-muted-foreground">Automated Management</p>
            </div>
          </div>
        </div>
      </div>
      <DemoAnimation />
    </section>
  );
}