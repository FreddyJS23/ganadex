import { ResponseErrorNext, ResponseRegistroExitoso } from "@/types";
import {
  CreateOrUpdateResponseSecurity,
  CreateResponseSecurity,
} from "@/types/forms";
import { getData } from "@/utils/getData";

export async function createResponseSecurity(
  formData: CreateResponseSecurity,
): Promise<string | ResponseErrorNext> {
  const response = await getData<
    CreateResponseSecurity,
    ResponseRegistroExitoso
  >("respuestasSeguridad", "POST", formData);

  if ("error" in response) return response;
  else return response.message;
}

export async function updateResponseSecurity(
  id: number,
  formData: CreateOrUpdateResponseSecurity,
): Promise<string | ResponseErrorNext> {
  const response = await getData<
    CreateOrUpdateResponseSecurity,
    ResponseRegistroExitoso
  >("respuestaSeguridad", "PUT", formData, id);
  console.log(response);
  if ("error" in response) return response;
  else return response.message;
}

export async function deleteResponseSecurity(
  id: number,
): Promise<string | ResponseErrorNext> {
  const response = await getData<
    { respuestaSeguridadID: number },
    ResponseRegistroExitoso
  >("respuestaSeguridad", "DELETE", undefined, id);

  console.log(response);

  if ("error" in response) return response;
  else return response.message;
}
