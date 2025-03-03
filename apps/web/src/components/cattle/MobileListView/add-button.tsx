import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EventDialog } from "./event-dialog";

export const AddButton = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute right-4 bottom-20 flex flex-col gap-2 items-end">
      {isOpen ? (
        <div className="flex flex-col gap-2 items-end">
          <Button
            variant="secondary"
            onClick={() => router.push("/cattle/new")}
          >
            <Plus />
            牛を新規登録する
          </Button>
          <EventDialog />
        </div>
      ) : (
        <></>
      )}

      <Button
        className="w-12 h-12"
        variant="secondary"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <X /> : <Plus />}
      </Button>
    </div>
  );
};
