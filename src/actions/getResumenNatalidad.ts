"use serve";

import { ResponseErrorNext, ResponseResumenNatalidad } from "@/types";
import { getData } from "@/services/apiClient";

export async function getResumenNatalidad(
  year: number,
): Promise<ResponseResumenNatalidad | ResponseErrorNext> {
  const response = await getData<ResponseResumenNatalidad>(
    {endPoint:"resumenNatalidad",
    param:year,
  }
  );
  if ("error" in response) return response;
  else return response;
}
