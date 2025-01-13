"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import { useParams, useRouter } from "next/navigation";

export const runtime = "edge";

export default function CattleDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { toast } = useToast();

  const handleDelete = async () => {
    const res = await client.api.cattle.$delete({
      json: { cattleId: params.id },
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert(`Error: ${errorData.message}`);
      return;
    }

    if (res.ok) {
      toast({
        title: "削除完了",
        description: `${params.id}の個体情報が正常に削除されました。`,
      });
      router.push("/cattle");
    }
  };

  return (
    <div className="pt-20">
      <h1>詳細ページ</h1>
      <p>選択された Cattle ID: {params.id}</p>
      <Button variant="destructive" onClick={handleDelete}>
        削除
      </Button>
    </div>
  );
}
