"use serve";

import { ResponseErrorNext } from "@/types";
import {
  BalanceDiarioVentaLeche,
  BalanceMensualVentaLeche,
} from "@/types/dashboard";
import { getData } from "@/services/apiClient";

export async function getBalanceMonthlySaleMilk(
  month: number,
): Promise<BalanceDiarioVentaLeche[] | ResponseErrorNext> {
  const response = await getData<BalanceMensualVentaLeche>(
  {  endPoint:"dashboardVentaLecheBalanceMensual",
    param:month,}
  );

  if ("error" in response) return response;
  else return response.balance_mensual;
}
