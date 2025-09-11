"use serve";

import { ResponseErrorNext } from "@/types";
import { BalanceMensualLeche, balanceAnualLeche } from "@/types/dashboard";
import { getData } from "@/utils/getData";

export async function getBalanceAnnualPrudctionMilk(
  year: number,
): Promise<BalanceMensualLeche[] | ResponseErrorNext> {
  const response = await getData<number, balanceAnualLeche>(
    "dashboardPrincipalbalanceAnualLeche",
    "GET",
    year,
  );

  if ("error" in response) return response;
  else return response.balance_anual;
}
