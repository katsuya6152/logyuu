import type { CattleDetailGetResType } from "@/types/cattle";
import { create } from "zustand";

const initialCattleState: CattleDetailGetResType["data"] = {
  cattle: {
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
  },
  mother_info: {
    cattleId: 0,
    motherInfoId: 0,
    motherCattleId: 0,
    motherName: null,
    motherIdentificationNumber: null,
    motherScore: null,
  },
  bloodline: {
    cattleId: 0,
    bloodlineId: 0,
    fatherCattleName: null,
    motherFatherCattleName: null,
    motherGrandFatherCattleName: null,
    motherGreatGrandFatherCattleName: null,
  },
};

const useCattleStore = create<{
  cattleData: CattleDetailGetResType["data"];
  updateState: (updates: Partial<CattleDetailGetResType["data"]>) => void;
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
