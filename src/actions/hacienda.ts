"use serve";

import { Hacienda, ResponseErrorNext, ResponseHacienda } from "@/types";
import { CreateHacienda } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createHacienda(
  formData: CreateHacienda,
): Promise<Hacienda | ResponseErrorNext> {
  const response = await submitForm<CreateHacienda, ResponseHacienda>(
    "hacienda",
    "POST",
    formData,
  );
  if ("error" in response) return response;
  else return response.hacienda;
}

export async function editHacienda(
  id: number,
  formData: CreateHacienda,
): Promise<Hacienda | ResponseErrorNext> {
  const response = await submitForm<CreateHacienda, ResponseHacienda>(
    "haciendaAccion",
    "PUT",
    formData,
    id,
  );
  if ("error" in response) return response;
  else return response.hacienda;
}

export async function deleteHacienda(
  id: number,
): Promise<string | ResponseErrorNext> {
  const response = await submitForm<
    CreateHacienda,
    { haciendaID: number | string }
  >("haciendaAccion", "DELETE", undefined, id);
  if ("error" in response) return response;
  else return response.haciendaID.toString();
}

export async function createSesionHacienda(
  haciendaId: number,
): Promise<Hacienda | ResponseErrorNext | undefined> {
  const response = await submitForm<number, ResponseHacienda>(
    "crearSesionHacienda",
    "GET",
    undefined,
    haciendaId,
  );

  if ("error" in response) return response;
  else return response.hacienda;
}
