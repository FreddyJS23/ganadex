"use serve";

import { ResponseComprador, ResponseErrorNext } from "@/types";
import { CreateCustomer } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createCustomer(
  formData: CreateCustomer,
): Promise<string | number | ResponseErrorNext | undefined> {
  const response = await submitForm<CreateCustomer, ResponseComprador>({
    endPoint: "comprador",
    data: formData,
  });

  if ("error" in response) return response;
  else return response.comprador.nombre;
}
