'use serve';

import { ResponseError } from '@/types';
import { BalanceAnualVentaGanado, BalanceMensualVentaGanado } from '@/types/dashboard';
import { getData } from '@/utils/getData';

export async function getBalanceAnnualSaleCattle(year:number): Promise<BalanceMensualVentaGanado[] | ResponseError | undefined> {
    try {
        const{ balance_anual}:BalanceAnualVentaGanado = await getData('dashboardVentaGanadoBalanceAnual','GET',year);
        return balance_anual;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
