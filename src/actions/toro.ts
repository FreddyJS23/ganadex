'use serve';

import { Pesos, ResponseErrorNext, ResponseToro } from '@/types';
import { CreateBull, updateWeight } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createBull(
    formData: CreateBull,
): Promise<string | number | ResponseErrorNext> {
   
        const response = await getData<CreateBull,ResponseToro>('toro', 'POST', formData);
        if('error' in response) return response
        else return response.toro.numero ?? response.toro.nombre
}

export async function updateWeightBull(
    id:number,
    formData:updateWeight,
): Promise<Pesos| ResponseErrorNext>{
      
        const response= await getData<updateWeight,ResponseToro>(
                'toro',
                'PUT',
            formData,
                id
            );  
            if('error' in response) return response
            else return response.toro.pesos!
      
}

