"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Wallet } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <Image
                src="/btb-logo.svg"
                alt="BTB Finance"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-xl">BTB Finance</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
            <Link 
              href="/pools" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/pools" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Pools
            </Link>
            {!isHome && (
              <Button variant="outline" size="sm" className="animate-fade-in">
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}