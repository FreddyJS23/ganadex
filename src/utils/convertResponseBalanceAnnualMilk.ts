import { BalanceMensualLeche } from "@/types/dashboard";

export const getBalanceMonthFromAnnual = (
  balanceAnnual: BalanceMensualLeche[],
) => {
  const balanceMonth: number[] = [];

  balanceAnnual.forEach(({ promedio_mensual }) =>
    balanceMonth.push(promedio_mensual),
  );

  return { balanceMonth };
};
