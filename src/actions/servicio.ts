'use serve';

import { ResponseErrorNext } from '@/types';
import { CreateServe } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createServe(
    formData: CreateServe,
    id: number,
): Promise<void | ResponseErrorNext > {
   
       const response= await getData<CreateServe,void>('ganado', 'POST', formData, id, 'servicio');
        if(typeof response == 'object' && 'error' in response)  return response
        else return
}
