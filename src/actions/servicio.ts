"use serve";

import { ResponseErrorNext } from "@/types";
import { CreateServe } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createServe(
  formData: CreateServe,
  id: number,
): Promise<void | ResponseErrorNext> {
  const response = await submitForm<CreateServe, void>({
    endPoint: "ganado",
    data: formData,
    id,
    endPointCattle: "servicio",
  });
  if (typeof response == "object" && "error" in response) return response;
  else return;
}

export async function editServe(
  idServe: number,
  idCastle: number,
  formData: CreateServe,
): Promise<void | ResponseErrorNext> {
  const response = await submitForm<CreateServe, void>({
    endPoint: "ganado",
    method: "PUT",
    data: formData,
    id: idCastle,
    endPointCattle: "servicio",
    id2: idServe,
  });
  if (typeof response == "object" && "error" in response) return response;
  else return;
}
