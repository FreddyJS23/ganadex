'use serve';

import {  ResponseErrorNext } from '@/types';
import { BalanceAnualVentaGanado, BalanceMensualVentaGanado } from '@/types/dashboard';
import { getData } from '@/utils/getData';

export async function getBalanceAnnualSaleCattle(year:number): Promise<BalanceMensualVentaGanado[] | ResponseErrorNext > {
   
        const response= await getData<number,BalanceAnualVentaGanado>('dashboardVentaGanadoBalanceAnual','GET',year);

        if('error' in response) return response
        else return response.balance_anual
}
