'use serve';

import { createUserApi } from '@/services/createUser';
import { ResponseCorrect, ResponseError } from '@/types';
import { CreateUser } from '@/types/forms';

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
