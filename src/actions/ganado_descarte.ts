'use serve';

import { ListaVacunas, Pesos, ResponseErrorNext, ResponseGanadoDescarte } from '@/types';
import { CreateBeef, updateWeight } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createBeef(
    formData: CreateBeef,
    listVaccines: ListaVacunas[],

): Promise<string | number | ResponseErrorNext> {
    
     //en esta destructuracion se saca el id y se utiliza el resto del objecto
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const vacunas=listVaccines.map(({id,...rest})=>({...rest}))

        const response= await getData<CreateBeef,ResponseGanadoDescarte>(
            'ganadoDescarte',
            'POST',
            {...formData,vacunas},
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

