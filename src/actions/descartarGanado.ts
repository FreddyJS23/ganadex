"use serve";

import { ResponseErrorNext } from "@/types";
import { submitForm } from "@/services/apiClient";

export async function discardCattle(
  ganadoId: number,
): Promise<boolean | ResponseErrorNext | undefined> {
  const response = await submitForm<{ ganado_id: number }, void>({
    endPoint: "descartarGanado",
    data: { ganado_id: ganadoId },
  });
  if (typeof response == "object" && "error" in response) return response;
  else return true;
}
