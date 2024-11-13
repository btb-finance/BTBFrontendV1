"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Coins, Lock, Users } from "lucide-react";

const tokenMetrics = [
  {
    title: "Total Supply",
    value: "1,000,000,000 BTB",
    icon: PieChart,
    description: "Fixed supply, no inflation"
  },
  {
    title: "Sale Price",
    value: "$0.001",
    icon: Coins,
    description: "Instant token access"
  },
  {
    title: "Vested Price",
    value: "$0.0005",
    icon: Lock,
    description: "1 year vesting period"
  },
  {
    title: "Sale Allocation",
    value: "50%",
    icon: Users,
    description: "500M tokens for public"
  }
];

export function TokenSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-primary/5 to-transparent" />
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">BTB Token</h2>
          <p className="text-xl text-muted-foreground">
            Power the future of automated liquidity management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {tokenMetrics.map((metric) => (
            <Card key={metric.title} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4 text-primary bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                  <metric.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{metric.title}</h3>
                <p className="text-2xl font-bold text-primary mb-2">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Instant Access</h3>
              <p className="text-3xl font-bold text-primary mb-4">$0.001</p>
              <p className="text-muted-foreground mb-6">Get immediate access to BTB tokens</p>
              <Button className="w-full" size="lg">
                Buy BTB Tokens
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Vested Access</h3>
              <p className="text-3xl font-bold text-primary mb-4">$0.0005</p>
              <p className="text-muted-foreground mb-6">1-year vesting period with lower entry price</p>
              <Button className="w-full" size="lg" variant="outline">
                Buy Vested BTB
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}