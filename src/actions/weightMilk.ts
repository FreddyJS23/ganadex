'use serve';

import { ResponseError, ResponsePesajeLeche } from '@/types';
import { CreateWeightMilk } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createWeightMilk(
    formData: CreateWeightMilk,
    id: number,
): Promise<string | ResponseError | undefined> {
    try {
        const { pesaje_leche }: ResponsePesajeLeche = await getData(
            'ganado',
            'POST',
            formData,
            id,
            'pesajeLeche',
        );

        return pesaje_leche.pesaje;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
