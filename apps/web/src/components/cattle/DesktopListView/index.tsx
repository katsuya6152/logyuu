import type { CattleGetResType } from "@/types/cattle";

interface DesktopListViewProps {
  data?: CattleGetResType;
}

export default function DesktopListView(props: DesktopListViewProps) {
  return (
    <div>
      <div>DesktopListView</div>
      {props.data ? props.data.map((d) => d.cattle.cattleId) : <></>}
    </div>
  );
}
