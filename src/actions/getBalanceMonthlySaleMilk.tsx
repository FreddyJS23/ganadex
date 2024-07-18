'use serve';

import { ResponseError } from '@/types';
import {  BalanceDiarioVentaLeche, BalanceMensualVentaLeche } from '@/types/dashboard';
import { getData } from '@/utils/getData';

export async function getBalanceMonthlySaleMilk(month:number): Promise<BalanceDiarioVentaLeche[] | ResponseError | undefined> {
    try {
        const{ balance_mensual}:BalanceMensualVentaLeche = await getData('dashboardVentaLecheBalanceMensual','GET',month);
        return balance_mensual;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
