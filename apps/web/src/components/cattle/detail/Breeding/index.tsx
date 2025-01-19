"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  BreedingStatusGetResType,
  BreedingSummaryGetResType,
} from "@/types/cattle";

export function Breeding({
  statusData,
  summaryData,
}: {
  statusData: BreedingStatusGetResType["data"] | undefined;
  summaryData: BreedingSummaryGetResType["data"] | undefined;
}) {
  return (
    <>
      {statusData ? (
        <Card>
          <CardHeader className="p-4">
            <CardTitle>繁殖（現在の状態）</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-2 pt-0 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">産次:</span>
              <span>{statusData.parity ?? "-"}産</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">分娩予定日:</span>
              <span>{statusData.expectedCalvingDate ?? "-"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">妊娠鑑定予定日:</span>
              <span>{statusData.scheduledPregnancyCheckDate ?? "-"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">分娩後経過日数:</span>
              <span>{statusData.daysAfterCalving ?? "-"}日</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">空胎日数:</span>
              <span>{statusData.daysOpen ?? "-"}日</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">妊娠日数:</span>
              <span>{statusData.pregnancyDays ?? "-"}日</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">受精後日数:</span>
              <span>{statusData.daysAfterInsemination ?? "-"}日</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">種付回数:</span>
              <span>{statusData.inseminationCount ?? "-"}回</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">前回の出産:</span>
              <span>
                {statusData.isDifficultBirth === null
                  ? "-"
                  : statusData.isDifficultBirth
                    ? "難産"
                    : "安産"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">繁殖メモ:</span>
              <span>{statusData.breedingMemo ?? "-"}</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p>読み込み中...</p>
      )}

      {summaryData ? (
        <Card className="mt-4">
          <CardHeader className="p-4">
            <CardTitle>繁殖（累計）</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-2 pt-0 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">累計種付回数:</span>
              <span>{summaryData.totalInseminationCount ?? "-"}回</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">平均空胎日数:</span>
              <span>{summaryData.averageDaysOpen ?? "-"}日</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">平均妊娠期間:</span>
              <span>{summaryData.averagePregnancyPeriod ?? "-"}日</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">平均分娩間隔:</span>
              <span>{summaryData.averageCalvingInterval ?? "-"}日</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">難産回数:</span>
              <span>{summaryData.difficultBirthCount ?? "-"}回</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">受胎頭数:</span>
              <span>{summaryData.pregnancyHeadCount ?? "-"}頭</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">受胎率:</span>
              <span>{summaryData.pregnancySuccessRate ?? "-"}％</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p>読み込み中...</p>
      )}
    </>
  );
}
