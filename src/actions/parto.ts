"use serve";

import { ResponseErrorNext } from "@/types";
import { CreateBirth, UpdateBirh } from "@/types/forms";
import { getData } from "@/utils/getData";

export async function createBirth(
  formData: CreateBirth,
  id: number,
): Promise<void | ResponseErrorNext> {
  const response = await getData<CreateBirth, void>(
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
  const response = await getData<CreateBirth, void>(
    "ganado",
    "PUT",
    formData,
    idCastle,
    "parto",
    idBirth
  );
  return response;
}
