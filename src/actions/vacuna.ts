"use serve";

import { AvailableVaccines, ResponseErrorNext } from "@/types";
import { CreateVaccine } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createVaccine(
  formData: CreateVaccine,
): Promise<AvailableVaccines | ResponseErrorNext> {
  // Enviar los datos al backend
  const response = await submitForm<CreateVaccine, { vacuna: AvailableVaccines }>(
    "vacunas",
    "POST",
    formData,
  );

  if ("error" in response) return response;
  return response.vacuna;
}

export async function updateVaccine(
  id: number,
  formData: CreateVaccine,
): Promise<AvailableVaccines | ResponseErrorNext> {
  // Enviar los datos al backend
  const response = await submitForm<CreateVaccine, { vacuna: AvailableVaccines }>(
    "vacuna",
    "PUT",
    formData,
    id,
  );

  if ("error" in response) return response;
  return response.vacuna;
}
