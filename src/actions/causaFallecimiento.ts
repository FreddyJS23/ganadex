"use serve";

import { ResponseCausaFallecimiento, ResponseErrorNext } from "@/types";
import { CreateCausaFallecimiento } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createCausaFallecimiento(
  formData: CreateCausaFallecimiento,
): Promise<ResponseCausaFallecimiento | ResponseErrorNext> {
  const response = await submitForm<
    CreateCausaFallecimiento,
    ResponseCausaFallecimiento
  >({endPoint:"causasFallecimiento",data:formData});
  if (typeof response == "object" && "error" in response) return response;
  else return response;
}

export async function updateCausaFallecimiento(
  formData: CreateCausaFallecimiento,
  id: number,
): Promise<ResponseCausaFallecimiento | ResponseErrorNext> {
  const response = await submitForm<
    CreateCausaFallecimiento,
    ResponseCausaFallecimiento
  >({endPoint:"causaFallecimiento",method:"PUT",data:formData, id});
  if (typeof response == "object" && "error" in response) return response;
  else return response;
}
