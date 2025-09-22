"use serve";

import { ResponseErrorNext } from "@/types";
import { CreateAdminBirth, CreateBaseBirth, UpdateBirh } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createBirth(
  formData: CreateBaseBirth | CreateAdminBirth,
  id: number,
): Promise<void | ResponseErrorNext> {
  const response = await submitForm<CreateBaseBirth | CreateAdminBirth, void>({
    endPoint: "ganado",
    data: formData,
    id,
    endPointCattle: "parto",
  });
  return response;
}

export async function updateBirth(
  idBirth: number,
  idCastle: number,
  formData: UpdateBirh,
): Promise<void | ResponseErrorNext> {
  const response = await submitForm<UpdateBirh, void>({
    endPoint: "ganado",
    method: "PUT",
    data: formData,
    id: idCastle,
    endPointCattle: "parto",
    id2: idBirth,
  });
  return response;
}
