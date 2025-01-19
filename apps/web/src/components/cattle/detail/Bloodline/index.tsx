"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CattleDetailGetResType } from "@/types/cattle";

export function Bloodline({
  cattleData,
}: { cattleData: CattleDetailGetResType["data"] }) {
  return (
    <>
      <Card>
        <CardHeader className="p-4">
          <CardTitle>血統情報</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-2 pt-0 flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">父:</span>
            <span>{cattleData.bloodline?.fatherCattleName ?? "-"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">母の父:</span>
            <span>{cattleData.bloodline?.motherFatherCattleName ?? "-"}</span>
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
              {cattleData.bloodline?.motherGreatGrandFatherCattleName ?? "-"}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader className="p-4">
          <CardTitle>母情報</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-2 pt-0 flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">母の名前:</span>
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
    </>
  );
}
