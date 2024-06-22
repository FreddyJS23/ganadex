'use serve';

import { ResponseError, ResponseGanadoDescarte, } from '@/types';
import { CreateBeef,  } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createBeef(
    formData: CreateBeef,
): Promise<string | number | ResponseError | undefined> {

    try {
        const { ganado_descarte }: ResponseGanadoDescarte = await getData(
            'ganadoDescarte',
            'POST',
            formData,
        );
        if (ganado_descarte.numero) return ganado_descarte.numero;
        else if (ganado_descarte.nombre) return ganado_descarte.nombre; 
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
