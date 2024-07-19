'use serve';

import { ResponseError } from '@/types';
import { balanceAnualLeche, BalanceMensualLeche,  } from '@/types/dashboard';
import { getData } from '@/utils/getData';

export async function getBalanceAnnualPrudctionMilk(year:number): Promise<BalanceMensualLeche[] | ResponseError | undefined> {
    try {
        const{ balance_anual}:balanceAnualLeche = await getData('dashboardPrincipalbalanceAnualLeche','GET',year);
        return balance_anual;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
