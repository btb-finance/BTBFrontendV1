"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PoolsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/pools/raydium");
  }, [router]);

  return null;
}