import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { EventType, EventsGetResType } from "@/types/cattle";
import { NotebookPen } from "lucide-react";
import { useState } from "react";

interface EventDialogProps {
  cattleId: string;
  onSubmit: (event: EventsGetResType["data"][number]) => void;
}

export function EventDialog() {
  const [eventType, setEventType] = useState<EventType>("VACCINATION");
  const [eventDateTime, setEventDateTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit({
    //   cattleId: Number(cattleId),
    //   eventType,
    //   eventDatetime,
    //   notes,
    // });
    console.log("handleSubmit");
    setIsOpen(false);
    setEventType("VACCINATION");
    setEventDateTime("");
    setNotes("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="default"
          onClick={() => {}}
          className="absolute right-4 bottom-4"
        >
          <NotebookPen /> 活動を記録する
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>イベント登録</DialogTitle>
          <DialogDescription>
            新しいイベントの詳細を入力してください。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-type" className="text-right">
                イベント種別
              </label>
              <Select
                value={eventType}
                onValueChange={(value) => setEventType(value as EventType)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="イベント種別を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="estrus">発情</SelectItem>
                  <SelectItem value="insemination">受精</SelectItem>
                  <SelectItem value="calving">分娩</SelectItem>
                  <SelectItem value="vaccination">ワクチン</SelectItem>
                  <SelectItem value="shipment">出荷</SelectItem>
                  <SelectItem value="hoof_trimming">削蹄</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-datetime" className="text-right">
                日時
              </label>
              <Input
                id="event-datetime"
                type="datetime-local"
                value={eventDateTime}
                onChange={(e) => setEventDateTime(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="notes" className="text-right">
                メモ
              </label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="col-span-3"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">登録</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
