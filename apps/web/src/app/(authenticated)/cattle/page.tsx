"use client";

import { useEffect, useState } from "react";

export default function CattleListPage() {
  const [cattle, setCattle] = useState();

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "";

  const fetchCattle = async () => {
    const res = await fetch(`${API_URL}/cattle`);
    const data = await res.json();
    setCattle(data);
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
