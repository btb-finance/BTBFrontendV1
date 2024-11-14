"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Settings } from "lucide-react";
import Link from "next/link";

const userPools = [
  {
    name: "SOL/USDC",
    platform: "Raydium",
    invested: 10000,
    share: 0.05,
    apy: 12.5,
    profit: 250,
    profitPercentage: 2.5,
  },
  {
    name: "ETH/USDC",
    platform: "Orca",
    invested: 15000,
    share: 0.03,
    apy: 15.2,
    profit: 450,
    profitPercentage: 3.0,
  },
];

export function UserPools() {
  return (
    <Card className="bg-background/50 backdrop-blur-sm shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Pools</CardTitle>
        <Link href="/pools">
          <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm">
            Add New Pool
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userPools.map((pool) => (
            <div
              key={`${pool.platform}-${pool.name}`}
              className="flex items-center justify-between p-4 rounded-lg bg-background/50 backdrop-blur-sm hover:bg-accent/5 transition-all duration-300"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{pool.name}</h3>
                  <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">{pool.platform}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Invested: ${pool.invested.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Pool Share: {(pool.share * 100).toFixed(2)}%
                </p>
              </div>
              <div className="text-right space-y-1">
                <div className="font-semibold text-green-500">
                  +${pool.profit.toLocaleString()} ({pool.profitPercentage}%)
                </div>
                <div className="text-sm text-muted-foreground">
                  {pool.apy}% APY
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="hover:bg-background/80">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Link href={`/pools/${pool.platform.toLowerCase()}/${pool.name.toLowerCase()}`}>
                    <Button variant="ghost" size="sm" className="hover:bg-background/80">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}