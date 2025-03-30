"use serve";

import { ResponseErrorNext, ResponseVentaGanado } from "@/types";
import { CreateSaleCattle } from "@/types/forms";
import { getData } from "@/utils/getData";

export async function createSaleCattle(
  formData: CreateSaleCattle,
  id: number,
): Promise<number | ResponseErrorNext> {
  const response = await getData<CreateSaleCattle, ResponseVentaGanado>(
    "ventaGanado",
    "POST",
    Object.assign(formData, { ganado_id: id }),
  );

  if ("error" in response) return response;
  else return response.venta.ganado.numero!;
}
