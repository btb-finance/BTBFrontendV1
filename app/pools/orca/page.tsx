"use client";

import OrcaComponent from "@/pools/components/main/home/OrcaComponent";
import { useRouter } from "next/navigation";

export default function OrcaPoolsPage() {
  const router = useRouter();

  const handlePoolClick = (poolId: string) => {
    router.push(`/pools/orca/${poolId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Orca Pools</h1>
          <div className="mt-2 flex space-x-4">
            <button 
              onClick={() => router.push('/pools/orca')}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Orca Pools
            </button>
            <button 
              onClick={() => router.push('/pools/raydium')}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Raydium Pools
            </button>
          </div>
        </div>
        <OrcaComponent onClick={handlePoolClick} />
      </main>
    </div>
  );
}
