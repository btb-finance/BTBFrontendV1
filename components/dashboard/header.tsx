"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Wallet, Menu } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold text-xl">
            BTB Finance
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Wallet className="h-4 w-4 mr-2" />
              0x1234...5678
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}