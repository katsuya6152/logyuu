"use client";

import { client } from "@/lib/rpc";
import { useEffect } from "react";

export default function CattleListPage() {
  const fetchCattle = async () => {
    const res = await client.api.cattle.$get();

    const data = await res.json();
    console.log(data);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies(fetchCattle): <explanation>
  useEffect(() => {
    fetchCattle();
  }, []);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">Cattle list page</div>
    </div>
  );
}
