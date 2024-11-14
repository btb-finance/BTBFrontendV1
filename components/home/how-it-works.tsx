"use client";

import { Card } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { ArrowRight, Wallet, Search, Coins, BarChart3 } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Step {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

const steps: Step[] = [
  {
    step: "1",
    title: "Connect Wallet",
    description: "Connect your Solana wallet securely to get started with BTB Finance.",
    icon: Wallet,
    gradient: "from-blue-500/10 via-blue-400/5 to-transparent",
  },
  {
    step: "2",
    title: "Choose Pools",
    description: "Select from curated liquidity pools across Orca and Raydium based on your strategy.",
    icon: Search,
    gradient: "from-purple-500/10 via-purple-400/5 to-transparent",
  },
  {
    step: "3",
    title: "Earn Rewards",
    description: "Start earning fees and rewards automatically through our optimized strategies.",
    icon: Coins,
    gradient: "from-green-500/10 via-green-400/5 to-transparent",
  },
  {
    step: "4",
    title: "Track Performance",
    description: "Monitor your portfolio's performance with real-time analytics and insights.",
    icon: BarChart3,
    gradient: "from-orange-500/10 via-orange-400/5 to-transparent",
  },
];

interface StepCardProps extends Step {
  index: number;
  inView: boolean;
}

function StepCard({ step, title, description, icon: Icon, gradient, index, inView }: StepCardProps) {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-700 transform",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
        gradient
      )} />
      <div className="relative p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">Step {step}</span>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        {index < steps.length - 1 && (
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
          </div>
        )}
      </div>
    </Card>
  );
}

export function HowItWorks() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">How BTB Finance Works</h2>
          <p className="text-xl text-muted-foreground">
            Get started with automated liquidity management in four simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard 
              key={step.step} 
              {...step} 
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}