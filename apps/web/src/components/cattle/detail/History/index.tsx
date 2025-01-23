"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventsGetResType } from "@/types/cattle";
import { CalendarIcon, Scissors, Syringe, TruckIcon } from "lucide-react";

export function History({
  eventData,
}: { eventData: EventsGetResType["data"] | undefined }) {
  type EventType = EventsGetResType["data"][number]["eventType"];

  const eventTypeIcons: Record<EventType, React.ReactNode> = {
    ESTRUS: <CalendarIcon className="text-red-500" />,
    INSEMINATION: <CalendarIcon className="text-blue-500" />,
    CALVING: <CalendarIcon className="text-green-500" />,
    VACCINATION: <Syringe className="text-purple-500" />,
    SHIPMENT: <TruckIcon className="text-yellow-500" />,
    HOOF_TRIMMING: <Scissors className="text-gray-500" />,
    OTHER: <CalendarIcon className="text-orange-500" />,
  };

  const eventTypeLabels: Record<EventType, string> = {
    ESTRUS: "発情",
    INSEMINATION: "受精",
    CALVING: "分娩",
    VACCINATION: "ワクチン",
    SHIPMENT: "出荷",
    HOOF_TRIMMING: "削蹄",
    OTHER: "その他",
  };

  const eventTypeColors: Record<EventType, string> = {
    ESTRUS: "border-l-4 border-red-500",
    INSEMINATION: "border-l-4 border-blue-500",
    CALVING: "border-l-4 border-green-500",
    VACCINATION: "border-l-4 border-purple-500",
    SHIPMENT: "border-l-4 border-yellow-500",
    HOOF_TRIMMING: "border-l-4 border-gray-500",
    OTHER: "border-l-4 border-orange-500",
  };

  const sortedEvents = (events: EventsGetResType["data"]) =>
    [...events].sort(
      (a, b) =>
        new Date(b.eventDatetime).getTime() -
        new Date(a.eventDatetime).getTime(),
    );

  const sortedEventsArray = sortedEvents(eventData ?? []);

  return (
    <div className="relative space-y-4">
      {sortedEventsArray.map((event, index) => (
        <Card
          key={event.eventId}
          className={`border-0 ${eventTypeColors[event.eventType]}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium flex items-center">
              {eventTypeLabels[event.eventType]}
              {index === 0 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  最新
                </span>
              )}
            </CardTitle>
            <div className="h-4 w-4">{eventTypeIcons[event.eventType]}</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-gray-600 mb-1">
              {new Date(event.eventDatetime).toLocaleString("ja-JP")}
            </p>
            <p className="text-sm text-gray-700">{event.notes}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
