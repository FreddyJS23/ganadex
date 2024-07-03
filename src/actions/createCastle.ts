'use serve';

import { ResponseError, ResponseGanado } from '@/types';
import { CreateCastle } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createCastle(
    formData: CreateCastle,
): Promise<string | number | ResponseError | undefined> {
    try {
        const { ganado }: ResponseGanado = await getData(
            'ganado',
            'POST',
            formData,
        );
        if (ganado.numero) return ganado.numero;
        else if (ganado.nombre) return ganado.nombre;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
