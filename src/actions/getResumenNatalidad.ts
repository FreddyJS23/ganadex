'use serve';

import {  ResponseErrorNext, ResponseResumenNatalidad } from '@/types';
import { getData } from '@/utils/getData';

export async function getResumenNatalidad(year:number): Promise<ResponseResumenNatalidad | ResponseErrorNext > {
    
        const response = await getData<number,ResponseResumenNatalidad>('resumenNatalidad','GET',undefined,year);
        if('error' in response) return response
        else return response
}
