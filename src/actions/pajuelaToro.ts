"use serve";

import { ResponseErrorNext, ResponsePajuelaToro } from "@/types";
import { CreatePajuelaToro } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createPajuelaToro(
  formData: CreatePajuelaToro,
): Promise<string | ResponseErrorNext> {
  const response = await submitForm<CreatePajuelaToro, ResponsePajuelaToro>(
   {endPoint: "pajuelaToro",
    data:formData,}
  );

  if ("error" in response) return response;
  else return response.pajuela_toro.codigo;
}
