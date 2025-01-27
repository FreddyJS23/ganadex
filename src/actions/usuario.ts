'use serve';

import { createUserApi } from '@/services/createUser';
import { ResponseCorrect, ResponseError, ResponseUser } from '@/types';
import { CreateUser, UpdateUser } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createUser(
    formData: CreateUser,
): Promise<string | ResponseError> {
    try {
        const { message }: ResponseCorrect = await createUserApi(formData);
        return message;
    } catch (error) {
        const { data, status } = error as ResponseError;

        throw { data, status };
    }
}

export async function updateUser(
    id:number,
    formData:UpdateUser,
): Promise<string | ResponseError> {
    try {
        const { user }: ResponseUser = await getData('usuario', 'PUT', formData, id);
        return user.usuario;
    } catch (error) {
       const { message } = error as Error;
       throw message;
    }
}