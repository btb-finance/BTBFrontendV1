"use client";

import { Button } from "@/components/ui/button";
import { Leaf, ArrowDown } from "lucide-react";

export function TreePlantingHero() {
  const scrollToForm = () => {
    const form = document.getElementById("tree-planting-form");
    form?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-primary/10 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Environmental Impact Initiative</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Plant Trees, Save Our Planet
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join BTB Finance in our mission to combat climate change. Every tree planted helps reduce carbon emissions, restore ecosystems, and create a sustainable future for generations to come.
          </p>
          <Button onClick={scrollToForm} size="lg" className="rounded-full">
            Make an Impact <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}