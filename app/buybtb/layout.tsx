"use client";

import { Container } from "@/components/layout/container";

export default function BuyBTBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}