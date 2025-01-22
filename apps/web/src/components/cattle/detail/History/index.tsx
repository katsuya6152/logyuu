"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { extractDatePart, getEventType } from "@/lib/utils";
import type { EventsGetResType } from "@/types/cattle";

export function History({
  eventData,
}: { eventData: EventsGetResType["data"] | undefined }) {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>活動履歴</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-2 pt-0 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">ID:</span>
          <span>{eventData ? eventData[0].eventId : "-"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">イベント:</span>
          <span>{eventData ? getEventType(eventData[0].eventType) : "-"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">日付:</span>
          <span>
            {eventData
              ? extractDatePart(eventData[0].eventDatetime, "localString")
              : "-"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
