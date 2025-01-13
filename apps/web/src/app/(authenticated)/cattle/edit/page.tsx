"use client";

import DesktopEditCattle from "@/components/cattle/edit/Desktop";
import MobileEditCattle from "@/components/cattle/edit/Mobile";
import { useEffect, useState } from "react";

export default function CattleEditPage() {
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
      {isMobile ? <MobileEditCattle /> : <DesktopEditCattle />}
    </div>
  );
}
