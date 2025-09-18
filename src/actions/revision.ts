"use serve";

import { ResponseErrorNext } from "@/types";
import { CreateAdminCheckUp, CreateBaseCheckUp, EditCheckUp } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createCheckUp(
  formData: CreateAdminCheckUp | CreateBaseCheckUp,
  id: number,
): Promise<void | ResponseErrorNext> {
  const response = await submitForm<CreateAdminCheckUp | CreateBaseCheckUp, void>(
    "ganado",
    "POST",
    formData,
    id,
    "revision",
  );

  if (typeof response == "object" && "error" in response) return response;
  else {
    return;
  }
}

export async function editCheckUp(
  idRevision: number,
  formData: EditCheckUp,
  id: number,
): Promise<void | ResponseErrorNext> {
  const response = await submitForm<EditCheckUp, void>(
    "ganado",
    "PUT",
    formData,
    id,
    "revision",
    idRevision,
  );

  if (typeof response == "object" && "error" in response) return response;
  else {
    return;
  }
}
