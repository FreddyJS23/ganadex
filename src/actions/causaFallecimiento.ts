"use serve";

import { ResponseCausaFallecimiento, ResponseErrorNext } from "@/types";
import { CreateCausaFallecimiento } from "@/types/forms";
import { getData } from "@/utils/getData";

export async function createCausaFallecimiento(
  formData: CreateCausaFallecimiento,
): Promise<ResponseCausaFallecimiento | ResponseErrorNext> {
  const response = await getData<
    CreateCausaFallecimiento,
    ResponseCausaFallecimiento
  >("causasFallecimiento", "POST", formData);
  if (typeof response == "object" && "error" in response) return response;
  else return response;
}

export async function updateCausaFallecimiento(
  formData: CreateCausaFallecimiento,
  id: number,
): Promise<ResponseCausaFallecimiento | ResponseErrorNext> {
  const response = await getData<
    CreateCausaFallecimiento,
    ResponseCausaFallecimiento
  >("causaFallecimiento", "PUT", formData, id);
  if (typeof response == "object" && "error" in response) return response;
  else return response;
}
