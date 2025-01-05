import type { CattleGetResType } from "@/types/cattle";

interface MobileListViewProps {
  data?: CattleGetResType;
}

export default function MobileListView(props: MobileListViewProps) {
  return (
    <div>
      <div>MobileListView</div>
      {props.data ? props.data[0].cattle.cattleId : <></>}
    </div>
  );
}
