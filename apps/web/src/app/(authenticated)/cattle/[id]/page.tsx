"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import useCattleStore from "@/store/cattle-store";
import { Edit, Trash2 } from "lucide-react";
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
        updateState(data200.data.cattle);
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
        description: `${cattleData.name}の個体情報が正常に削除されました。`,
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
    <div className="p-8 pt-20">
      {cattleData ? (
        <div className="mt-4">
          <div className="flex justify-between font-black">
            <div>{cattleData.name}</div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="編集"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4" />
              </Button>

              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="削除">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="text-left">
                      以下の個体情報を削除してもよろしいですか？
                    </DrawerTitle>
                    <DrawerDescription>
                      個体識別番号:
                      {cattleData.identificationNumber}
                      <br />
                      名号: {cattleData.name}
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button
                      variant="destructive"
                      aria-label="削除"
                      onClick={handleDelete}
                    >
                      削除
                    </Button>
                    <DrawerClose asChild>
                      <Button variant="outline">キャンセル</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

          <h2 className="font-bold">詳細情報</h2>
          <p>名前: {cattleData.name}</p>
          <p>成長段階: {cattleData.growthStage}</p>
          <p>性別: {cattleData.gender}</p>
          <p>得点: {cattleData.score ?? "N/A"}</p>
          <p>品種: {cattleData.breed ?? "N/A"}</p>
          <p>健康状態: {cattleData.healthStatus ?? "N/A"}</p>
          {/* <h3 className="mt-2 font-bold">血統情報</h3>
          <p>父: {cattleData.fatherCattleName ?? "N/A"}</p>
          <p>
            母の父:
            {cattleData.motherFatherCattleName ?? "N/A"}
          </p>
          <h3 className="mt-2 font-bold">母情報</h3>
          <p>母の名前: {cattleData.motherName ?? "N/A"}</p>
          <p>
            母の得点: {cattleData..mother_info?.motherScore ?? "N/A"}
          </p> */}
        </div>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
}
