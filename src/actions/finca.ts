'use serve';

import { ResponseError, ResponseFinca } from '@/types';
import {  CreateFinca } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createFinca(
    formData: CreateFinca,
): Promise<string | number | ResponseError | undefined> {
    try {
        const { finca }: ResponseFinca = await getData(
            'finca',
            'POST',
            formData,
        );
        if (finca) return finca.nombre;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}

export async function createSesionFinca(
    fincaId: number,
): Promise<string | number | ResponseError | undefined> {
    try {
        const { finca }: ResponseFinca = await getData(
            'crearSesionFinca',
            'GET',
            undefined,
            fincaId,
        );
        if (finca) return finca.nombre;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}

