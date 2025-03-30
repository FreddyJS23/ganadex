"use serve";

import { ResponseErrorNext, ResponseTipoRevision } from "@/types";
import { CreateTypeCheck } from "@/types/forms";
import { getData } from "@/utils/getData";

export async function createTypeCheck(
  formData: CreateTypeCheck,
): Promise<ResponseTipoRevision | ResponseErrorNext> {
  const response = await getData<CreateTypeCheck, ResponseTipoRevision>(
    "tipoRevision",
    "POST",
    formData,
  );
  if (typeof response == "object" && "error" in response) return response;
  else return response;
}

export async function updateTypeCheck(
  formData: CreateTypeCheck,
  id: number,
): Promise<ResponseTipoRevision | ResponseErrorNext> {
  const response = await getData<CreateTypeCheck, ResponseTipoRevision>(
    "tipoRevision",
    "PUT",
    formData,
    id,
  );
  if (typeof response == "object" && "error" in response) return response;
  else return response;
}
