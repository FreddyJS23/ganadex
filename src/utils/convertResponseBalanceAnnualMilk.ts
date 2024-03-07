
import { BalanceMensualLeche } from '@/types/dashboard';

export const getBalanceMonthFromAnnual = (balanceAnnual: BalanceMensualLeche[]) => {
    let balanceMonth: number[] = [];

    balanceAnnual.forEach(({ promedio_pesaje }) =>
        balanceMonth.push(promedio_pesaje),
    );

    return { balanceMonth };
};
