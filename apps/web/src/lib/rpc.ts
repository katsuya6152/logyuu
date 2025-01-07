import { createClient } from "api";

const myFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const res = await fetch(input, init);

  if (res.status === 204) return Response.json({});

  const jsonData = await res.json();

  if (res.status >= 400) {
    throw Error(jsonData.message ?? "不明なエラー");
  }

  return Response.json(jsonData);
};

export const client = createClient(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787",
);
