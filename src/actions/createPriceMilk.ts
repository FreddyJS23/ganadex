'use serve';

import { ResponseError, ResponsePrecioLeche } from '@/types';
import { CreatePriceMilk} from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createPriceMilk(
    formData: CreatePriceMilk,
): Promise<string | number | ResponseError | undefined> {
    try {
       
        const { precio }: ResponsePrecioLeche = await getData(
            'crearPrecioLeche',
            'POST',
            formData,
        );
        if (precio) return precio.precio;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
