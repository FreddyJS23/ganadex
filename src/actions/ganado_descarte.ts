'use serve';

import { Pesos, ResponseError, ResponseGanadoDescarte } from '@/types';
import { CreateBeef, updateWeight } from '@/types/forms';
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

export async function updateWeightBeef(
    id:number,
    formData:updateWeight,
): Promise<Pesos| ResponseError | undefined>{
        try {
        const { ganado_descarte }: ResponseGanadoDescarte = await getData(
                'ganadoDescarte',
                'PUT',
            formData,
                id
            );  
            return ganado_descarte.pesos;
        } catch (error) {
            const { message } = error as Error;
            throw message;
        }
}

