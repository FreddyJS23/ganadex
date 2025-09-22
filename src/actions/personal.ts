"use serve";

import {
  Personal,
  ResponseErrorNext,
  ResponsePersonal,
  ResponseRegistroExitoso,
} from "@/types";
import { CreateStaff } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createStaff(
  formData: CreateStaff,
): Promise<string | ResponseErrorNext> {
  const response = await submitForm<CreateStaff, ResponsePersonal>({
    endPoint: "personal",
    data: formData,
  });
  if ("error" in response) return response;
  else return response.personal.nombre;
}

export async function editStaff(
  id: number,
  formData: CreateStaff,
): Promise<Personal | ResponseErrorNext> {
  const response = await submitForm<CreateStaff, ResponsePersonal>({
    endPoint: "personal",
    method: "PUT",
    data: formData,
    id,
  });
  if ("error" in response) return response;
  else return response.personal;
}

export async function addInHacienda(id: number) {
  const response = await submitForm<
    { personal_id: number },
    ResponseRegistroExitoso
  >({ endPoint: "registrarVeterinarioEnHacienda", data: { personal_id: id } });
  if ("error" in response) return response;
  else return response.message;
}

export async function removeInHacienda(id: number) {
  const response = await submitForm<
    { personal_id: number },
    ResponseRegistroExitoso
  >({ endPoint: "eliminarVeterinarioEnHacienda", method: "DELETE", id });
  if ("error" in response) return response;
  else return response.message;
}
