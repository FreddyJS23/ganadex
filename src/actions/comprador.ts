'use serve';

import { ResponseComprador, ResponseErrorNext, } from '@/types';
import { CreateCustomer } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createCustomer(
    formData: CreateCustomer,
): Promise<string | number | ResponseErrorNext | undefined> {
 
        const response= await getData<CreateCustomer,ResponseComprador>(
            'comprador',
            'POST',
            formData,
        );
     
    if('error' in response) return response
    else return response.comprador.nombre
}
