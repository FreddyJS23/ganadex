'use serve';

import { ResponseError, ResponseVentaLeche, } from '@/types';
import { CreateSaleMilk,} from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createSaleMilk(
    formData: CreateSaleMilk,
): Promise<string | ResponseError | undefined> {
    try {
        const  {venta_leche} : ResponseVentaLeche = await getData(
            'ventasLeche',
            'POST',
            formData,
        );
     
        return venta_leche.cantidad;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
