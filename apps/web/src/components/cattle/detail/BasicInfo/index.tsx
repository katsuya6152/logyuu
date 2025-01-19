"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CattleDetailGetResType } from "@/types/cattle";

export function BasicInfo({
  cattleData,
}: { cattleData: CattleDetailGetResType["data"] }) {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>基本情報</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-2 pt-0 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">個体識別番号:</span>
          <span>{cattleData.cattle.identificationNumber}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">出生日:</span>
          <span>{cattleData.cattle.birthday}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">年齢/月齢/日齢:</span>
          <span>
            {cattleData.cattle.age}歳/{cattleData.cattle.monthsOld}ヶ月/
            {cattleData.cattle.daysOld}日
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">得点:</span>
          <span>{cattleData.cattle.score ?? "-"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">品種:</span>
          <span>{cattleData.cattle.breed ?? "-"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">生産者:</span>
          <span>{cattleData.cattle.producerName ?? "-"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">牛舎:</span>
          <span>{cattleData.cattle.barn ?? "-"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">育種価:</span>
          <span>{cattleData.cattle.breedingValue ?? "-"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">備考:</span>
          <span>{cattleData.cattle.notes ?? "-"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
