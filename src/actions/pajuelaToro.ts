"use serve";

import { ResponseErrorNext, ResponsePajuelaToro } from "@/types";
import { CreatePajuelaToro } from "@/types/forms";
import { getData } from "@/utils/getData";

export async function createPajuelaToro(
  formData: CreatePajuelaToro,
): Promise<string | ResponseErrorNext> {
  const response = await getData<CreatePajuelaToro, ResponsePajuelaToro>(
    "pajuelaToro",
    "POST",
    formData,
  );

  if ("error" in response) return response;
  else return response.pajuela_toro.codigo;
}
