'use serve';

import { ResponseError } from '@/types';
import { CreateAssigmentNumberBullCalf } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function assignmentNumberBullCalf(
    formData: CreateAssigmentNumberBullCalf,
    id: number,
): Promise<void | ResponseError | undefined> {
    try {
        await getData('asignarNumeroCria', 'POST', formData, id);
    } catch (error) {
        console.log(error);
        const { message } = error as Error;
        throw message;
    }
}
