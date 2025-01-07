import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { CattleGetResType } from "@/types/cattle";
import classNames from "classnames";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownUp,
  ChevronRight,
  Filter,
  Plus,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface MobileListViewProps {
  data?: CattleGetResType;
}

export default function MobileListView(props: MobileListViewProps) {
  const router = useRouter();

  const getGrowthStage = (
    growthStage: "CALF" | "GROWING" | "FATTENING" | "ADULT" | null,
  ) => {
    switch (growthStage) {
      case "CALF":
        return "仔牛";
      case "GROWING":
        return "育成牛";
      case "FATTENING":
        return "肥育牛";
      case "ADULT":
        return "成牛";
    }
  };

  const handleItemClick = (cattleId: number) => {
    router.push(`/cattle/${cattleId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex w-full">
        <Search className="absolute left-9 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="search"
          placeholder="検索..."
          className="pl-10 mx-6 bg-gray-100 dark:bg-gray-800 border-none"
        />
      </div>

      <div className="flex items-center w-full h-5 my-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="w-full">
              <ArrowDownUp />
              並び替え
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>並び替え</SheetTitle>
              <SheetDescription className="text-left">
                並び替えたい項目と順序を選択してください
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-4 pt-4 pb-12">
              <RadioGroup defaultValue="option-0">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-0" id="option-0" />
                  <Label htmlFor="option-0">全て表示</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-1" id="option-1" />
                  <Label htmlFor="option-1">名前</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-2" id="option-2" />
                  <Label htmlFor="option-2">ID</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-3" id="option-3" />
                  <Label htmlFor="option-3">日齢</Label>
                </div>
              </RadioGroup>

              <div className="flex justify-center w-full gap-2">
                <Button variant="outline">
                  <ArrowDown01 />
                  昇順
                </Button>
                <Button variant="outline">
                  <ArrowDown10 />
                  降順
                </Button>
              </div>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">並び替える</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Separator orientation="vertical" />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="w-full">
              <Filter />
              絞り込み
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>絞り込み</SheetTitle>
              <SheetDescription className="text-left">
                絞り込みたい項目を選択してください
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">Content</div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">絞り込む</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <Separator />

      <div className="h-full w-full overflow-y-scroll flex flex-col gap-2">
        {props.data?.map((item) => (
          <div key={item.cattle.cattleId}>
            <div
              className="w-full flex items-center justify-between p-3"
              onClick={() => handleItemClick(item.cattle.cattleId)}
              onKeyDown={() => handleItemClick(item.cattle.cattleId)}
            >
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <p className="font-bold">{item.cattle.name}</p>
                  <Badge variant="outline">
                    <span
                      className={classNames("font-semibold", {
                        "text-blue-500": item.cattle.gender === "オス",
                        "text-red-500": item.cattle.gender === "メス",
                      })}
                    >
                      {item.cattle.gender}
                    </span>
                  </Badge>
                  <Badge variant="default">
                    {getGrowthStage(item.cattle.growthStage)}
                  </Badge>
                </div>
                <div className="flex items-center h-3 gap-2 text-xs">
                  <div>耳標番号：{item.cattle.earTagNumber}</div>
                  <Separator orientation="vertical" />
                  <div>日齢：{item.cattle.daysOld}</div>
                  <Separator orientation="vertical" />
                  <div>
                    ステータス：
                    <span
                      className={classNames("font-semibold", {
                        "text-blue-500": item.cattle.healthStatus === "健康",
                        "text-yellow-500":
                          item.cattle.healthStatus === "妊娠中",
                        "text-green-500": item.cattle.healthStatus === "休息中",
                        "text-red-500": item.cattle.healthStatus === "治療中",
                      })}
                    >
                      {item.cattle.healthStatus}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight />
            </div>
            <Separator />
          </div>
        ))}
      </div>

      <Button
        className="absolute right-4 bottom-4"
        variant="secondary"
        size="icon"
      >
        <Plus />
      </Button>
    </div>
  );
}
