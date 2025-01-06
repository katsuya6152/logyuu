import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CattleGetResType } from "@/types/cattle";
import { ArrowRight, Search } from "lucide-react";

interface MobileListViewProps {
  data?: CattleGetResType;
}

export default function MobileListView(props: MobileListViewProps) {
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

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="search"
          placeholder="検索..."
          className="pl-10 w-64 bg-gray-100 dark:bg-gray-800 border-none"
        />
      </div>

      <div>
        <Tabs defaultValue="CALF" className="w-full">
          <TabsList>
            <TabsTrigger value="CALF">仔牛</TabsTrigger>
            <TabsTrigger value="GROWING">育成牛</TabsTrigger>
            <TabsTrigger value="FATTENING">肥育牛</TabsTrigger>
            <TabsTrigger value="ADULT">成牛</TabsTrigger>
          </TabsList>
          {/* <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent> */}
        </Tabs>
      </div>

      <div className="h-full w-full overflow-y-scroll flex flex-col gap-4">
        {props.data?.map((item) => (
          <div
            key={item.cattle.cattleId}
            className="w-full flex items-center justify-between border-b-2 border-gray-300"
          >
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <p className="font-bold">{item.cattle.name}</p>
                <Badge variant="outline">
                  {getGrowthStage(item.cattle.growthStage)}
                </Badge>
                <Badge variant="default">{item.cattle.gender}</Badge>
              </div>
              <div className="flex gap-4">
                <p>耳標番号：{item.cattle.earTagNumber}</p>
                <p>日齢:{item.cattle.daysOld}</p>
              </div>
            </div>

            <ArrowRight />
          </div>
        ))}
      </div>
    </div>
  );
}
