'use serve';

import { ResponseCorrect, ResponseError } from '@/types';
import { CreateUser } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createUser(
    formData: CreateUser,
): Promise<string | ResponseError> {
    try {
        const { message }: ResponseCorrect = await getData(
            'crearUsuario',
            'POST',
            formData,
        );
        return message;
    } catch (error) {
        const { data, status } = error as ResponseError;
        
        throw { data, status };
    }
}
