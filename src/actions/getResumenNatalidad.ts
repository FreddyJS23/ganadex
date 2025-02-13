'use serve';

import { ResponseError, ResponseResumenNatalidad } from '@/types';
import { getData } from '@/utils/getData';

export async function getResumenNatalidad(year:number): Promise<ResponseResumenNatalidad | ResponseError | undefined> {
    try {
        const response:ResponseResumenNatalidad = await getData('resumenNatalidad','GET',undefined,year);
        return response;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
