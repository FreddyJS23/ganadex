"use serve";

import { ResponseErrorNext, ResponsePesajeLeche } from "@/types";
import { CreateWeightMilk } from "@/types/forms";
import { getData } from "@/utils/getData";

export async function createWeightMilk(
  formData: CreateWeightMilk,
  id: number,
): Promise<string | ResponseErrorNext> {
  const response = await getData<CreateWeightMilk, ResponsePesajeLeche>(
    "ganado",
    "POST",
    formData,
    id,
    "pesajeLeche",
  );

  if ("error" in response) return response;
  else return response.pesaje_leche.pesaje;
}
