"use client";

import { BasicInfo } from "@/components/cattle/detail/BasicInfo";
import { Bloodline } from "@/components/cattle/detail/Bloodline";
import { Breeding } from "@/components/cattle/detail/Breeding";
import { CattleDetailHeader } from "@/components/cattle/detail/Header";
import { History } from "@/components/cattle/detail/History";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import { extractDatePart, getGrowthStage } from "@/lib/utils";
import useCattleStore from "@/store/cattle-store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export const runtime = "edge";

export default function CattleDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const { cattleData, updateState } = useCattleStore();

  const fetchCattleDetails = async () => {
    try {
      const res = await client.api.cattle[":cattleId"].$get({
        param: { cattleId: params.id },
      });

      if (res.status === 404) {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      if (res.status === 200) {
        const data200 = await res.json();
        updateState(data200.data);
      }
    } catch (error) {
      console.error("Failed to fetch cattle details:", error);
      alert("データの取得に失敗しました。");
    }
  };

  const handleEdit = () => {
    router.push("/cattle/edit");
  };

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
        description: `${cattleData.cattle.name}の個体情報が正常に削除されました。`,
      });
      router.push("/cattle");
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies(fetchCattleDetails): <explanation>
  useEffect(() => {
    if (params.id) {
      fetchCattleDetails();
    }
  }, [params.id]);

  return (
    <div className="p-4 pt-20">
      {cattleData ? (
        <div className="mt-4 flex flex-col gap-4">
          <CattleDetailHeader
            cattleData={cattleData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">基本情報</TabsTrigger>
              <TabsTrigger value="bloodline">血統</TabsTrigger>
              <TabsTrigger value="breeding">繁殖</TabsTrigger>
              <TabsTrigger value="history">活動履歴</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <BasicInfo cattleData={cattleData} />
            </TabsContent>
            <TabsContent value="bloodline">
              <Bloodline cattleData={cattleData} />
            </TabsContent>
            <TabsContent value="breeding">
              <Breeding cattleData={cattleData} />
            </TabsContent>
            <TabsContent value="history">
              <History cattleData={cattleData} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-center gap-2 text-xs text-gray-500">
            <p>
              登録日時:
              {extractDatePart(cattleData.cattle.createdAt, "localString")}
            </p>
            /
            <p>
              更新日時:
              {extractDatePart(cattleData.cattle.updatedAt, "localString")}
            </p>
          </div>
        </div>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
}
