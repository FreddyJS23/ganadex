'use serve';

import { ResponseComprador, ResponseError } from '@/types';
import { CreateCustomer } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createCustomer(
    formData: CreateCustomer,
): Promise<string | number | ResponseError | undefined> {
    try {
        const { comprador }: ResponseComprador = await getData(
            'comprador',
            'POST',
            formData,
        );
        if (comprador) return comprador.nombre;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
