"use serve";

import { ResponseErrorNext, ResponsePesajeLeche } from "@/types";
import { CreateWeightMilk, UpdateWeightMilkShema } from "@/types/forms";
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
    "pesajesLeche",
  );

  if ("error" in response) return response;
  else return response.pesaje_leche.pesaje;
}

export async function updateWeightMilk(
  idWeightMilk: number,
  idCastle: number,
  formData: UpdateWeightMilkShema,
): Promise<string | ResponseErrorNext> {
  const response = await getData<UpdateWeightMilkShema, ResponsePesajeLeche>(
    "ganado",
    "PUT",
    formData,
    idCastle,
    "pesajeLeche",
    idWeightMilk,
  );

  if ("error" in response) return response;
  else return response.pesaje_leche.pesaje;
}
