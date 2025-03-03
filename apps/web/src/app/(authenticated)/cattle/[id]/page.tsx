"use client";

import { BasicInfo } from "@/components/cattle/detail/BasicInfo";
import { Bloodline } from "@/components/cattle/detail/Bloodline";
import { Breeding } from "@/components/cattle/detail/Breeding";
import { CattleDetailHeader } from "@/components/cattle/detail/Header";
import { History } from "@/components/cattle/detail/History";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import useCattleStore from "@/store/cattle-store";
import type {
  BreedingStatusGetResType,
  BreedingSummaryGetResType,
  EventsGetResType,
} from "@/types/cattle";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const runtime = "edge";

export default function CattleDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const { cattleData, updateState } = useCattleStore();
  const [breedingStatus, setBreedingStatus] =
    useState<BreedingStatusGetResType>();
  const [breedingSummary, setBreedingSummary] =
    useState<BreedingSummaryGetResType>();
  const [events, setEvents] = useState<EventsGetResType>();

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
    // デモアカウントの場合はトースト
    const isDemo = localStorage.getItem("isDemo");
    if (isDemo === "true") {
      toast({
        title: "削除完了",
        description: "※デモアカウントのため実際には削除されていません。",
      });
      router.push("/cattle");
      return;
    }

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

  const fetchBreedingStatus = async () => {
    try {
      const res = await client.api.cattle[":cattleId"].breeding_status.$get({
        param: { cattleId: params.id },
      });

      if (res.status === 404) {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      if (res.status === 200) {
        const data200 = await res.json();
        setBreedingStatus(data200);
      }
    } catch (error) {
      console.error("Failed to fetch cattle details:", error);
      alert("データの取得に失敗しました。");
    }
  };

  const fetchBreedingSummary = async () => {
    try {
      const res = await client.api.cattle[":cattleId"].breeding_summary.$get({
        param: { cattleId: params.id },
      });

      if (res.status === 404) {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      if (res.status === 200) {
        const data200 = await res.json();
        setBreedingSummary(data200);
      }
    } catch (error) {
      console.error("Failed to fetch cattle details:", error);
      alert("データの取得に失敗しました。");
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await client.api.cattle[":cattleId"].events.$get({
        param: { cattleId: params.id },
      });

      if (res.status === 400) {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      if (res.status === 200) {
        const data200 = await res.json();
        setEvents(data200);
      }
    } catch (error) {
      console.error("Failed to fetch cattle details:", error);
      alert("データの取得に失敗しました。");
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies(fetchCattleDetails): <explanation>
  // biome-ignore lint/correctness/useExhaustiveDependencies(fetchBreedingStatus): <explanation>
  // biome-ignore lint/correctness/useExhaustiveDependencies(fetchBreedingSummary): <explanation>
  // biome-ignore lint/correctness/useExhaustiveDependencies(fetchEvents): <explanation>
  useEffect(() => {
    if (params.id) {
      fetchCattleDetails();
      fetchBreedingStatus();
      fetchBreedingSummary();
      fetchEvents();
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
              <Breeding
                statusData={breedingStatus?.data}
                summaryData={breedingSummary?.data}
              />
            </TabsContent>
            <TabsContent value="history">
              <History eventData={events?.data} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-center gap-2 text-xs text-gray-500">
            <p>
              登録日時:
              {cattleData.cattle.createdAt}
            </p>
            /
            <p>
              更新日時:
              {cattleData.cattle.updatedAt}
            </p>
          </div>
        </div>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
}
