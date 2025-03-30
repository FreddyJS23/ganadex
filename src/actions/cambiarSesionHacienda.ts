"use server";

import { ResponseErrorNext, ResponseHacienda } from "@/types";
import { getData } from "@/utils/getData";

export async function changeSessionHacienda(
  hacienda_id: number,
): Promise<ResponseHacienda | ResponseErrorNext> {
  const response = await getData<number, ResponseHacienda>(
    "cambiarSesisionHacienda",
    "GET",
    undefined,
    hacienda_id,
  );

  if ("error" in response) return response;
  else return response;
}
