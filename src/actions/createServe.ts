'use serve';

import { ResponseError,} from '@/types';
import { CreateServe, } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createServe(
    formData: CreateServe,
    id: number,
): Promise<void |ResponseError | undefined>  {
    try {
        await getData(
            'ganado',
            'POST',
            formData,
            id,
            'servicio',
        );

    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
