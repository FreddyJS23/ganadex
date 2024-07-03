'use serve';

import { ResponseError, ResponseInsumo } from '@/types';
import { CreateSupply } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createSupply(
    formData: CreateSupply,
): Promise<string | ResponseError | undefined> {
    try {
        const { insumo }: ResponseInsumo = await getData(
            'insumo',
            'POST',
            formData,
        );
        return insumo.insumo;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
