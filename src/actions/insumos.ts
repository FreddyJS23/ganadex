"use serve";

import { ResponseErrorNext } from "@/types";

export async function createSupply(): Promise<string | ResponseErrorNext> {
  return { error: { message: "disable", status: 404 } };
}
