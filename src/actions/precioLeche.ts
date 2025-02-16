'use serve';

import {  ResponseErrorNext, ResponsePrecioLeche } from '@/types';
import {CreatePriceMilk } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createPriceMilk(
    formData: CreatePriceMilk,
): Promise< number | ResponseErrorNext > {
  
        const response = await getData<CreatePriceMilk,ResponsePrecioLeche>(
            'crearPrecioLeche',
            'POST',
            formData,
        );
        
        if('error' in response) return response
        else return response.precio.precio
      
}
