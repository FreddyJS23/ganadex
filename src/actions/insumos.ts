'use serve';

import { ResponseErrorAction, ResponseInsumo } from '@/types';
import { CreateSupply } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createSupply(
    formData: CreateSupply,
): Promise<string | ResponseErrorAction > {
    
        /* const response = await getData<CreateSupply,ResponseInsumo>(
            'insumo',
            'POST',
            formData,
        );
       */

        return{ error:{message:'disable',status:404}}
   
}
