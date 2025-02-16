'use serve';

import { ResponseErrorNext, ResponseFallecimiento } from '@/types';
import { CreateDeathCastle } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createDeathCattle(
    formData: CreateDeathCastle,
    id: number,
): Promise<number | ResponseErrorNext> {
   
        const response = await getData<CreateDeathCastle, ResponseFallecimiento>(
            'fallecimiento',
            'POST',
            Object.assign(formData, { ganado_id: id }),
        );
        if('error' in response) return response
        else return response.fallecimiento.ganado.numero!

}
