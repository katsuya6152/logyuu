"use client";

import { useParams } from "next/navigation";

export const runtime = "edge";

export default function CattleDetailPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="pt-20">
      <h1>詳細ページ</h1>
      <p>選択された Cattle ID: {params.id}</p>
    </div>
  );
}
