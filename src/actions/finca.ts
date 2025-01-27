'use serve';

import { ResponseError } from '@/types';
import {  CreateFinca } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createFinca(
    formData: CreateFinca,
): Promise<string | number | ResponseError | undefined> {
    try {
        const { comprador }: Response = await getData(
            '',
            'POST',
            formData,
        );
        if (finca) return finca.nombre;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}