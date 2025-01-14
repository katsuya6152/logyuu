"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { extractDatePart, getGrowthStage } from "@/lib/utils";
import useCattleStore from "@/store/cattle-store";
import classNames from "classnames";
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
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <p className="font-black mr-2">{cattleData.cattle.name}</p>
                <Badge variant="outline">
                  <span
                    className={classNames("font-semibold", {
                      "text-blue-500": cattleData.cattle.gender === "オス",
                      "text-red-500": cattleData.cattle.gender === "メス",
                    })}
                  >
                    {cattleData.cattle.gender}
                  </span>
                </Badge>
                <Badge>{getGrowthStage(cattleData.cattle.growthStage)}</Badge>
                <Badge variant="outline">
                  {cattleData.cattle.healthStatus}
                </Badge>
              </div>
              <p className="text-xs">
                耳標番号：{cattleData.cattle.earTagNumber}
              </p>
            </div>

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
                      {cattleData.cattle.identificationNumber}
                      <br />
                      名号: {cattleData.cattle.name}
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

          <Card>
            <CardHeader className="p-4">
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-2 pt-0 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">個体識別番号: </span>
                <span>{cattleData.cattle.identificationNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">出生日: </span>
                <span>{cattleData.cattle.birthday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">年齢/月齢/:日齢 </span>
                <span>
                  {cattleData.cattle.age}歳/{cattleData.cattle.monthsOld}ヶ月/
                  {cattleData.cattle.daysOld}日
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">得点: </span>
                <span>{cattleData.cattle.score ?? "-"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">品種: </span>
                <span>{cattleData.cattle.breed ?? "-"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">生産者: </span>
                <span>{cattleData.cattle.producerName ?? "-"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">牛舎: </span>
                <span>{cattleData.cattle.barn ?? "-"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">育種価: </span>
                <span>{cattleData.cattle.breedingValue ?? "-"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">備考: </span>
                <span>{cattleData.cattle.notes}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle>血統情報</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-2 pt-0 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">父: </span>
                <span>{cattleData.bloodline?.fatherCattleName ?? "-"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">母の父:</span>
                <span>
                  {cattleData.bloodline?.motherFatherCattleName ?? "-"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">母の祖父:</span>
                <span>
                  {cattleData.bloodline?.motherGrandFatherCattleName ?? "-"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">母の祖祖父:</span>
                <span>
                  {cattleData.bloodline?.motherGreatGrandFatherCattleName ??
                    "-"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle>母情報</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-2 pt-0 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">母の名前: </span>
                <span>{cattleData.mother_info?.motherName ?? "-"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">母の個体識別番号:</span>
                <span>
                  {cattleData.mother_info?.motherIdentificationNumber ?? "-"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">母の得点:</span>
                <span>{cattleData.mother_info?.motherScore ?? "-"}</span>
              </div>
            </CardContent>
          </Card>

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
