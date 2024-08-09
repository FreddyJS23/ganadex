'use serve';

import { ResponseError, ResponsePajuelaToro } from '@/types';
import { CreatePajuelaToro } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createPajuelaToro(
    formData: CreatePajuelaToro,
): Promise<string | ResponseError | undefined> {
    try {
        const { pajuela_toro }: ResponsePajuelaToro = await getData(
            'pajuelaToro',
            'POST',
            formData,
        );

        return pajuela_toro.codigo;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
