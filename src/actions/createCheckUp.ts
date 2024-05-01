'use serve';

import { ResponseError,} from '@/types';
import { CreateCheckUp, } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createCheckUp(
    formData: CreateCheckUp,
    id: number,
): Promise<void |ResponseError | undefined>  {
    try {
        await getData(
            'ganado',
            'POST',
            formData,
            id,
            'revision',
        );

    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
