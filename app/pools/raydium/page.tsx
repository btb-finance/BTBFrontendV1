"use client";

import RadiumComponent from "@/pools/components/main/home/RadiumComponent";
import { useRouter } from "next/navigation";

export default function RaydiumPoolsPage() {
  const router = useRouter();

  const handlePoolClick = (poolId: string) => {
    router.push(`/pools/raydium/${poolId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Raydium Pools</h1>
          <div className="mt-2 flex space-x-4">
            <button 
              onClick={() => router.push('/pools/orca')}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Orca Pools
            </button>
            <button 
              onClick={() => router.push('/pools/raydium')}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Raydium Pools
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">CLMM Pools</h2>
            <RadiumComponent onClick={handlePoolClick} poolType="concentrated" />
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">Standard Pools</h2>
            <RadiumComponent onClick={handlePoolClick} poolType="standard" />
          </div>
        </div>
      </main>
    </div>
  );
}
