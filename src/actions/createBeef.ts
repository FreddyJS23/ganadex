'use serve';

import { ResponseError, ResponseRes, } from '@/types';
import { CreateBeef,  } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createBeef(
    formData: CreateBeef,
): Promise<string | number | ResponseError | undefined> {

    try {
        const { res }: ResponseRes = await getData(
            'res',
            'POST',
            formData,
        );
        if (res.numero) return res.numero;
        else if (res.nombre) return res.nombre; 
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
