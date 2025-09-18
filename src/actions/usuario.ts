"use serve";

import { createUserApi } from "@/services/createUser";
import {
  Configuracion,
  ResponseConfiguracion,
  ResponseErrorNext,
  ResponseUser,
} from "@/types";
import { CreateUser, UpdateConfiguration, UpdateUser } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createUser(
  formData: CreateUser,
): Promise<string | ResponseErrorNext> {
  const response = await createUserApi<CreateUser, { message: string }>(
    formData,
  );

  if ("error" in response) return response;
  else return response.message;
}

export async function updateUser(
  id: number,
  formData: UpdateUser,
): Promise<string | ResponseErrorNext> {
  const response = await submitForm<UpdateUser, ResponseUser>(
    "usuario",
    "PUT",
    formData,
    id,
  );
  if ("error" in response) return response;
  else return response.user.usuario;
}

export async function updateConfiguration(
  formData: UpdateConfiguration,
): Promise<Configuracion | ResponseErrorNext> {
  const response = await submitForm<UpdateConfiguration, ResponseConfiguracion>(
    "actualizarConfig",
    "PUT",
    formData,
  );

  if ("error" in response) return response;
  else return response.configuracion;
}
