"use client";

import OrcaComponent from "@/pools/components/main/home/OrcaComponent";
import RadiumComponent from "@/pools/components/main/home/RadiumComponent";
import { useRouter } from "next/navigation";

export function PoolsOverview() {
  const router = useRouter();

  const handlePoolClick = (poolId: string) => {
    router.push(`/pools/${poolId}`);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg border p-4">
        <h2 className="text-2xl font-bold mb-4">Raydium Pools</h2>
        <RadiumComponent onClick={handlePoolClick} />
      </div>
      <div className="rounded-lg border p-4">
        <h2 className="text-2xl font-bold mb-4">Orca Pools</h2>
        <OrcaComponent onClick={handlePoolClick} />
      </div>
    </div>
  );
}