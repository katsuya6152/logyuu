"use client";
// TODO: SSR対応

import DesktopListView from "@/components/cattle/DesktopListView/index";
import MobileListView from "@/components/cattle/MobileListView/index";
import { client } from "@/lib/rpc";
import type { CattleGetResType } from "@/types/cattle";
import { useEffect, useState } from "react";

export default function CattleListPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState<CattleGetResType>();

  const fetchCattle = async () => {
    const res = await client.api.cattle.$get();

    if (res.status === 200) {
      const data200 = await res.json();
      setData(data200);
      console.log(`data: ${data200}`);
    }
    if (res.status === 500) {
      const data500 = await res.json();
      console.log(data500);
    }
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
    <div className="flex h-full w-full items-center justify-center pt-20">
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
