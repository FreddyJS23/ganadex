'use serve';

import { Pesos, ResponseErrorNext, ResponseGanadoDescarte } from '@/types';
import { CreateBeef, updateWeight } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createBeef(
    formData: CreateBeef,
): Promise<string | number | ResponseErrorNext> {
    
        const response= await getData<CreateBeef,ResponseGanadoDescarte>(
            'ganadoDescarte',
            'POST',
            formData,
        );
       
        if('error' in response) return response
        else return response.ganado_descarte.numero ?? response.ganado_descarte.nombre
    
}

export async function updateWeightBeef(
    id:number,
    formData:updateWeight,
): Promise<Pesos| ResponseErrorNext >{
       
        const response= await getData<updateWeight,ResponseGanadoDescarte>(
                'ganadoDescarte',
                'PUT',
            formData,
                id
            );  
            if('error' in response) return response
            else return response.ganado_descarte.pesos! 
}

