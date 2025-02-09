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
import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import type { EventType } from "@/types/cattle";
import { NotebookPen } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export function EventDialog({ fetch }: { fetch: () => void }) {
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const [eventType, setEventType] = useState<EventType>("VACCINATION");
  const [eventDateTime, setEventDateTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const postEvent = async () => {
    const res = await client.api.cattle[":cattleId"].events.$post({
      param: {
        cattleId: params.id,
      },
      json: {
        eventType: eventType,
        eventDatetime: eventDateTime,
        notes: notes,
      },
    });

    if (res.ok) {
      fetch();
      toast({
        title: "登録完了",
        description: "牛の個体情報が正常に登録されました。",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postEvent();
    console.log("handleSubmit");
    setIsOpen(false);
    setEventType("ESTRUS");
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
                  <SelectItem value="ESTRUS">発情</SelectItem>
                  <SelectItem value="INSEMINATION">受精</SelectItem>
                  <SelectItem value="CALVING">分娩</SelectItem>
                  <SelectItem value="VACCINATION">ワクチン</SelectItem>
                  <SelectItem value="SHIPMENT">出荷</SelectItem>
                  <SelectItem value="HOOF_TRIMMING">削蹄</SelectItem>
                  <SelectItem value="OTHER">その他</SelectItem>
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
