"use serve";

import { ResponseErrorNext, ResponseFallecimiento } from "@/types";
import { CreateDeathCastle } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createDeathCattle(
  formData: CreateDeathCastle,
  id: number,
): Promise<number | string | ResponseErrorNext> {
  const response = await submitForm<CreateDeathCastle, ResponseFallecimiento>({
    endPoint: "fallecimiento",
    data: Object.assign(formData, { ganado_id: id }),
  });
  if ("error" in response) return response;
  else return response.fallecimiento.ganado.numero ?? "sin número";
}
