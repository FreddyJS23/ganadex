'use serve';

import { ResponseError } from '@/types';
import { getData } from '@/utils/getData';

export async function castrateBullCalf(
    id: number,
): Promise<void | ResponseError | undefined> {
    try {
        await getData('caparCria', 'GET', undefined, id);
    } catch (error) {
        console.log(error);
        const { message } = error as Error;
        throw message;
    }
}
