'use serve';

import { ResponseErrorNext, ResponsePersonal } from '@/types';
import { CreateStaff } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createStaff(
    formData: CreateStaff,
): Promise<string | ResponseErrorNext> {
   
       
        const response = await getData<CreateStaff,ResponsePersonal>(
            'personal',
            'POST',
            formData,
        );
     if('error' in response) return response
     else return response.personal.nombre
}
