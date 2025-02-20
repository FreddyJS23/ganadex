'use serve';

import { ListaVacunas, Pesos, ResponseErrorNext, ResponseToro } from '@/types';
import { CreateBull, updateWeight } from '@/types/forms';
import { getData } from '@/utils/getData';

type vacunasSinId=Omit<ListaVacunas,'id'>

export async function createBull(
    formData: CreateBull,
    listVaccines: ListaVacunas[],
): Promise<string | number | ResponseErrorNext> {
   
    //en esta destructuracion se saca el id y se utiliza el resto del objecto
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const vacunas=listVaccines.map(({id,...rest})=>({...rest}))
        
        const response = await getData<CreateBull & {vacunas:vacunasSinId[]},ResponseToro>('toro', 'POST', {...formData,vacunas});
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

