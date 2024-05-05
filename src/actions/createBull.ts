'use serve';

import { ResponseError, ResponseToro } from '@/types';
import { CreateBull, } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createBull(
    formData: CreateBull,
): Promise<string | number | ResponseError | undefined> {

    try {
        const { toro }: ResponseToro = await getData(
            'toro',
            'POST',
            formData,
        );
        if (toro.numero) return toro.numero;
        else if (toro.nombre) return toro.nombre; 
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
