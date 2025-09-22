"use serve";

import { ResponseErrorNext, ResponsePrecioLeche } from "@/types";
import { CreatePriceMilk } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createPriceMilk(
  formData: CreatePriceMilk,
): Promise<number | ResponseErrorNext> {
  const response = await submitForm<CreatePriceMilk, ResponsePrecioLeche>({
    endPoint: "crearPrecioLeche",
    data: formData,
  });

  if ("error" in response) return response;
  else return response.precio.precio;
}
