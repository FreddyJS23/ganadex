"use serve";

import { ResponseErrorNext, ResponseVentaLeche } from "@/types";
import { CreateSaleMilk } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createSaleMilk(
  formData: CreateSaleMilk,
): Promise<string | ResponseErrorNext> {
  const response = await submitForm<CreateSaleMilk, ResponseVentaLeche>(
    "ventasLeche",
    "POST",
    formData,
  );

  if ("error" in response) return response;
  else return response.venta_leche.cantidad;
}
