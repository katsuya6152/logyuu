"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { getGrowthStage } from "@/lib/utils";
import type { CattleDetailGetResType } from "@/types/cattle";
import classNames from "classnames";
import { Edit, Trash2 } from "lucide-react";

type CattleDetailHeaderProps = {
  cattleData: CattleDetailGetResType["data"];
  onEdit: () => void;
  onDelete: () => void;
};

export function CattleDetailHeader({
  cattleData,
  onEdit,
  onDelete,
}: CattleDetailHeaderProps) {
  return (
    <div className="flex justify-between">
      {/* 左側: 個体情報 */}
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
          <Badge variant="outline">{cattleData.cattle.healthStatus}</Badge>
        </div>
        <p className="text-xs">耳標番号：{cattleData.cattle.earTagNumber}</p>
      </div>

      {/* 右側: 編集・削除ボタン */}
      <div className="flex items-center space-x-2">
        {/* 編集ボタン */}
        <Button
          variant="outline"
          size="icon"
          aria-label="編集"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4" />
        </Button>

        {/* 削除ボタン（ドロワー） */}
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
                個体識別番号: {cattleData.cattle.identificationNumber}
                <br />
                名号: {cattleData.cattle.name}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                variant="destructive"
                aria-label="削除"
                onClick={onDelete}
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
  );
}
