'use serve';

import { Pesos, ResponseError, ResponseToro } from '@/types';
import { CreateBull, updateWeight } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createBull(
    formData: CreateBull,
): Promise<string | number | ResponseError | undefined> {
    try {
        const { toro }: ResponseToro = await getData('toro', 'POST', formData);
        if (toro.numero) return toro.numero;
        else if (toro.nombre) return toro.nombre;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}

export async function updateWeightBull(
    id:number,
    formData:updateWeight,
): Promise<Pesos| ResponseError | undefined>{
        try {
        const { toro }: ResponseToro = await getData(
                'toro',
                'PUT',
            formData,
                id
            );  
            return toro.pesos;
        } catch (error) {
            const { message } = error as Error;
            throw message;
        }
}

