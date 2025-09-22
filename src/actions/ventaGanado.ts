"use serve";

import {
  ResponseErrorNext,
  ResponseVentaGanado,
  ResponseVentasGanado,
} from "@/types";
import {
  ResponseErrorNext,
  ResponseVentaGanado,
  ResponseVentasGanado,
} from "@/types";
import { CreateSaleCattle } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createSaleCattle(
  formData: CreateSaleCattle,
  id: number,
): Promise<number | ResponseErrorNext> {
  const response = await submitForm<CreateSaleCattle, ResponseVentaGanado>({
    endPoint: "ventaGanado",
    data: Object.assign(formData, { ganado_id: id }),
  });

  if ("error" in response) return response;
  else return response.venta.ganado.numero!;
}

export async function ventaGanadoLote(
  formData: CreateSaleCattle,
  ganadoIds: number[],
): Promise<number | ResponseErrorNext> {
  const response = await submitForm<
    CreateSaleCattle & { ganado_ids: number[] },
    ResponseVentasGanado
  >({
    endPoint: "ventasGanadoLote",
    data: { ...formData, ganado_ids: ganadoIds },
  });
  if ("error" in response) return response;
  else return response.ventas.length;
  else return response.ventas.length;
}
