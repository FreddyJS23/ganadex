"use serve";

import { ResponseErrorNext, ResponsePesajeLeche } from "@/types";
import { CreateWeightMilk, UpdateWeightMilk } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createWeightMilk(
  formData: CreateWeightMilk,
  id: number,
): Promise<string | ResponseErrorNext> {
  const response = await submitForm<CreateWeightMilk, ResponsePesajeLeche>(
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
  formData: UpdateWeightMilk,
): Promise<string | ResponseErrorNext> {
  const response = await submitForm<UpdateWeightMilk, ResponsePesajeLeche>(
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
