"use serve";

import { ResponseErrorNext } from "@/types";
import { BalanceMensualLeche, balanceAnualLeche } from "@/types/dashboard";
import { getData } from "@/services/apiClient";

export async function getBalanceAnnualPrudctionMilk(
  year: number,
): Promise<BalanceMensualLeche[] | ResponseErrorNext> {
  const response = await getData<balanceAnualLeche>({
    endPoint: "dashboardPrincipalbalanceAnualLeche",
    param: year,
  });

  if ("error" in response) return response;
  else return response.balance_anual;
}
