"use serve";

import { ResponseErrorNext, ResponseTipoRevision } from "@/types";
import { CreateTypeCheck } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createTypeCheck(
  formData: CreateTypeCheck,
): Promise<ResponseTipoRevision | ResponseErrorNext> {
  const response = await submitForm<CreateTypeCheck, ResponseTipoRevision>(
  {  endPoint:"tipoRevision",
    data:formData,}
  );
  if (typeof response == "object" && "error" in response) return response;
  else return response;
}

export async function updateTypeCheck(
  formData: CreateTypeCheck,
  id: number,
): Promise<ResponseTipoRevision | ResponseErrorNext> {
  const response = await submitForm<CreateTypeCheck, ResponseTipoRevision>(
  {  endPoint:"tipoRevision",
    method:"PUT",
    data:formData,
    id,}
  );
  if (typeof response == "object" && "error" in response) return response;
  else return response;
}
