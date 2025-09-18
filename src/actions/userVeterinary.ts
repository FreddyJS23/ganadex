"use serve";

import {
  ResponseErrorNext,
  ResponseVeterinarioUsuario,
  UserVeterinaryInfo,
} from "@/types";
import { submitForm } from "@/services/apiClient";

export async function createUserVeterinary(
  id: number,
): Promise<UserVeterinaryInfo | ResponseErrorNext> {
  const response = await submitForm<
    { personal_id: number },
    ResponseVeterinarioUsuario
  >("usuariosVeterinarios", "POST", { personal_id: id });
  if ("error" in response) return response;
  else return response.usuario_veterinario;
}

export async function deleteUserVeterinary(
  id: number,
): Promise<void | ResponseErrorNext> {
  const response = await submitForm<number, void>(
    "usuarioVeterinario",
    "DELETE",
    undefined,
    id,
  );

  return response;
}
