'use server';

import { signIn } from '@/auth';
import { ERROR_SERVER, ERROR_SIGNIN } from '@/constants/responseApiMessage';
import { ResponseLoginAuthJs } from '@/types';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';

export async function authenticate(
    formData: FormData,
): Promise<ResponseLoginAuthJs | undefined> {
    try {
        await signIn('credentials', {
            usuario: formData.get('usuario'),
            password: formData.get('password'),
            redirectTo: '/dashboard',
        });
    } catch (error) {
        if (isRedirectError(error)) {
            /*  const session = await auth() as Session;

            const { user } = session;

            const { cookieCsrf } = user;
            console.log(cookieCsrf)
            // Set cookie
            cookies().set(cookieCsrf[0].nameCookie, cookieCsrf[0].token,{sameSite:'lax',maxAge:7200});
            // Set cookie
            cookies().set(cookieCsrf[1].nameCookie, cookieCsrf[1].token,{sameSite:'lax',maxAge:7200}); */
            return {
                login: true,
                message: 'Credenciales correctas',
                redirect: '/dashboard',
            };
        }
        if (error instanceof AuthError) {
            const regexMessageErrors = new RegExp(
                `${ERROR_SERVER}|${ERROR_SIGNIN}`,
            );
            const messageError = error.message.match(regexMessageErrors);
            throw messageError && messageError[0];
        }
    }
}
