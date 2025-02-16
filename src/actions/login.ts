'use server';

import { signIn } from '@/auth';
import { ERROR_CORS, ERROR_SERVER, ERROR_SIGNIN } from '@/constants/responseApiMessage';
import { ResponseErrorActionAction, ResponseLoginAuthJs } from '@/types';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';

export async function authenticate(
    formData: FormData,
): Promise<ResponseLoginAuthJs |ResponseErrorActionAction > {
    try {
        await signIn('credentials', {
            usuario: formData.get('usuario'),
            password: formData.get('password'),
            redirectTo: '/dashboard',
        });
    } catch (error) {
        if (isRedirectError(error)) {
            return {
                login: true,
                message: 'Credenciales correctas',
                redirect: '/dashboard',
            };
        }
        if (error instanceof AuthError) {
            const regexMessageErrors = new RegExp(
                `${ERROR_SERVER}|${ERROR_SIGNIN}|${ERROR_CORS}`,
            );
            const messageError = error.message.match(regexMessageErrors) as unknown as string;
            return messageError && {error:{message:messageError[0]}} ;
        }
    }
    return {error:{message:'Error'}}
}
