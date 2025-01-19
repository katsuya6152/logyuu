import type { client } from "@/lib/rpc";
import type { InferResponseType } from "hono";

export type CattleGetResType = InferResponseType<
  typeof client.api.cattle.$get,
  200
>;

export type CattleDetailGetResType = InferResponseType<
  (typeof client.api.cattle)[":cattleId"]["$get"],
  200
>;

export type BreedingStatusGetResType = InferResponseType<
  (typeof client.api.cattle)[":cattleId"]["breeding_status"]["$get"],
  200
>;

export type BreedingSummaryGetResType = InferResponseType<
  (typeof client.api.cattle)[":cattleId"]["breeding_summary"]["$get"],
  200
>;
