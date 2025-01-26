'use serve';

import { ResponseError } from '@/types';
import { CreateBirth } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createBirth(
    formData: CreateBirth,
    id: number,
): Promise<void | ResponseError | undefined> {
    try {
        await getData('ganado', 'POST', formData, id, 'parto');
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
