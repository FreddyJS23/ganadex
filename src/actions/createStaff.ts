'use serve';

import { ResponseError,ResponsePersonal } from '@/types';
import {  CreateStaff } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createStaff(
    formData: CreateStaff,
): Promise<string | number | ResponseError | undefined> {
    try {
        console.log('4')
        const { personal }: ResponsePersonal = await getData(
            'personal',
            'POST',
            formData,
        );
        if (personal.nombre) return personal.nombre;
     
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
