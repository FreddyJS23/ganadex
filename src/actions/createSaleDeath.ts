'use serve';

import { ResponseError, ResponseFallecimiento} from '@/types';
import { CreateDeathCastle} from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createDeathCattle(
    formData: CreateDeathCastle,
    id:number
): Promise<number | ResponseError | undefined> {
    try {
        const  {fallecimiento} : ResponseFallecimiento = await getData(
            'fallecimiento',
            'POST',
            Object.assign(formData,{ganado_id:id}),
        );
     
        return fallecimiento.ganado.numero!
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
