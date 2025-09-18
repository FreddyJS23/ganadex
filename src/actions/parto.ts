"use serve";

import { ResponseErrorNext } from "@/types";
import { CreateAdminBirth, CreateBaseBirth, UpdateBirh } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createBirth(
  formData: CreateBaseBirth | CreateAdminBirth,
  id: number,
): Promise<void | ResponseErrorNext> {
  const response = await submitForm<CreateBaseBirth | CreateAdminBirth, void>(
    "ganado",
    "POST",
    formData,
    id,
    "parto",
  );
  return response;
}

export async function updateBirth(
  idBirth: number,
  idCastle: number,
  formData: UpdateBirh,
): Promise<void | ResponseErrorNext> {
  const response = await submitForm<UpdateBirh, void>(
    "ganado",
    "PUT",
    formData,
    idCastle,
    "parto",
    idBirth,
  );
  return response;
}
