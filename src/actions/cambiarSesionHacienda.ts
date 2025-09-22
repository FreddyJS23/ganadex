"use server";

import { ResponseErrorNext, ResponseHacienda } from "@/types";
import { submitForm } from "@/services/apiClient";

export async function changeSessionHacienda(
  hacienda_id: number,
): Promise<ResponseHacienda | ResponseErrorNext> {
  const response = await submitForm<number, ResponseHacienda>({
    endPoint: "cambiarSesisionHacienda",
    method: "GET",
    id: hacienda_id,
  });

  if ("error" in response) return response;
  else return response;
}
