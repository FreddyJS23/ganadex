'use serve';

import { Personal, ResponseErrorNext, ResponsePersonal, ResponseRegistroExitoso } from '@/types';
import { CreateStaff } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createStaff(
    formData: CreateStaff,
): Promise<Personal| ResponseErrorNext> {
   
       
        const response = await getData<CreateStaff,ResponsePersonal>(
            'personal',
            'POST',
            formData,
        );
     if('error' in response) return response
     else return response.personal
}

export async function addInHacienda(id:number){
     
    const response = await getData<{personal_id:number},ResponseRegistroExitoso>(
        'registrarVeterinarioEnHacienda',
        'POST',
        {personal_id:id}
       
    );
    if('error' in response) return response
    else return response.message
}

export async function removeInHacienda(id:number){
     
    const response = await getData<{personal_id:number},ResponseRegistroExitoso>(
        'eliminarVeterinarioEnHacienda',
        'DELETE',
        undefined,
        id
       
    );
    if('error' in response) return response
    else return response.message
}