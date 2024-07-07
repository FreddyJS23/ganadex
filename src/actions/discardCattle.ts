'use serve';

import { ResponseError } from '@/types';
import { getData } from '@/utils/getData';

export async function discardCattle(
    ganadoId: number,
): Promise<void | ResponseError | undefined> {
    try {
        await getData('descartarGanado', 'POST',{ganado_id:ganadoId});
    } catch (error) {
 
        const { message } = error as Error;
        throw message;
    }
}
