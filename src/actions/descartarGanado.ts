"use serve";

import { ResponseErrorNext } from "@/types";
import { getData } from "@/utils/getData";

export async function discardCattle(
  ganadoId: number,
): Promise<boolean | ResponseErrorNext | undefined> {
  const response = await getData<{ ganado_id: number }, void>(
    "descartarGanado",
    "POST",
    { ganado_id: ganadoId },
  );
  if (typeof response == "object" && "error" in response) return response;
  else return true;
}
