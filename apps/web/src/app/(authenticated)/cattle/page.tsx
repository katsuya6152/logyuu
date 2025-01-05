"use client";
// TODO: SSR対応

import DesktopListView from "@/components/cattle/DesktopListView";
import MobileListView from "@/components/cattle/MobileListView";
import { client } from "@/lib/rpc";
import { useEffect, useState } from "react";

export default function CattleListPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState();

  const fetchCattle = async () => {
    const res = await client.api.cattle.$get();

    const data = await res.json();
    setData(data);
    console.log(`data: ${data}`);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies(fetchCattle): <explanation>
  useEffect(() => {
    fetchCattle();

    // レスポンシブ判定
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {isMobile ? (
          <MobileListView data={data} />
        ) : (
          <DesktopListView data={data} />
        )}
      </div>
    </div>
  );
}
