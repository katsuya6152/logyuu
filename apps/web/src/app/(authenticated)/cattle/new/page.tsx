"use client";

import DesktopNewCattle from "@/components/cattle/new/Desktop";
import MobileNewCattle from "@/components/cattle/new/Mobile";
import { useEffect, useState } from "react";

export default function CattleDetailPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // レスポンシブ判定
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="pt-20">
      {isMobile ? <MobileNewCattle /> : <DesktopNewCattle />}
    </div>
  );
}
