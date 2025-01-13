import type { CattleDetailGetResType } from "@/types/cattle";
import { create } from "zustand";

const initialCattleState: CattleDetailGetResType["data"]["cattle"] = {
  cattleId: 0,
  ownerUserId: 0,
  identificationNumber: 0,
  earTagNumber: null,
  name: "",
  growthStage: null,
  birthday: "",
  gender: "",
  score: null,
  breed: "",
  healthStatus: "",
  producerName: "",
  barn: "",
  breedingValue: "",
  notes: "",
  age: 0,
  monthsOld: 0,
  daysOld: 0,
  createdAt: "",
  updatedAt: "",
};

const useCattleStore = create<{
  cattleData: CattleDetailGetResType["data"]["cattle"];
  updateState: (
    updates: Partial<CattleDetailGetResType["data"]["cattle"]>,
  ) => void;
  resetState: () => void;
}>((set) => ({
  cattleData: { ...initialCattleState },
  updateState: (updates) =>
    set((state) => ({
      cattleData: { ...state.cattleData, ...updates },
    })),
  resetState: () =>
    set({
      cattleData: { ...initialCattleState },
    }),
}));

export default useCattleStore;
