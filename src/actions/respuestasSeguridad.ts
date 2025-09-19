import { ResponseErrorNext, ResponseRegistroExitoso } from "@/types";
import {
  CreateOrUpdateResponseSecurity,
  CreateResponseSecurity,
} from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createResponseSecurity(
  formData: CreateResponseSecurity,
): Promise<string | ResponseErrorNext> {
  const response = await submitForm<
    CreateResponseSecurity,
    ResponseRegistroExitoso
  >({endPoint:"respuestasSeguridad", data:formData});

  if ("error" in response) return response;
  else return response.message;
}

export async function updateResponseSecurity(
  id: number,
  formData: CreateOrUpdateResponseSecurity,
): Promise<string | ResponseErrorNext> {
  const response = await submitForm<
    CreateOrUpdateResponseSecurity,
    ResponseRegistroExitoso
  >({endPoint:"respuestaSeguridad", method:"PUT", data:formData, id});
  if ("error" in response) return response;
  else return response.message;
}

export async function deleteResponseSecurity(
  id: number,
): Promise<string | ResponseErrorNext> {
  const response = await submitForm<
    { respuestaSeguridadID: number },
    ResponseRegistroExitoso
  >({endPoint:"respuestaSeguridad", method:"DELETE", id});

  if ("error" in response) return response;
  else return response.message;
}
