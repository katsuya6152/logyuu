import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGrowthStage = (
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

export const getHealthStatusColor = (status: string | null) => {
  switch (status) {
    case "健康":
      return "bg-blue-500";
    case "妊娠中":
      return "bg-yellow-500";
    case "休息中":
      return "bg-green-500";
    case "治療中":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const extractDatePart = (
  dateString: string,
  part: "localString" | "year" | "month" | "day" | "time",
): string => {
  const date = new Date(dateString);

  switch (part) {
    case "localString":
      return date.toLocaleString();
    case "year":
      return date.getUTCFullYear().toString();
    case "month":
      return (date.getUTCMonth() + 1).toString().padStart(2, "0");
    case "day":
      return date.getUTCDate().toString().padStart(2, "0");
    case "time":
      return date.toLocaleTimeString();
    default:
      throw new Error("Invalid part specified");
  }
};
