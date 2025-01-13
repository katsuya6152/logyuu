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
