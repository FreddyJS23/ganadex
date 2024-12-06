import { ERROR_SERVER, ERROR_SIGNIN } from '@/constants/responseApiMessage';
import { authApi } from '@/services/authApi';
import { ResponseError } from '@/types';

import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.usuario = user.usuario;
                token.token = user.token;
                token.role = user.role;
                token.xsrf_token = user.xsrf_token;
                token.laravel_session = user.laravel_session;
                /*     token.cookieCsrf=user.cookieCsrf */
            }
            return token;
        },
        session({ session, token }) {
            session.user.token = token.token;
            session.user.usuario = token.usuario;
            session.user.role = token.role;
            session.user.xsrf_token = token.xsrf_token;
            session.user.laravel_session = token.laravel_session;
            return session;
        },
    },
    pages: { signIn: '/login' },
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                usuario: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;
                try {
                    // logic to verify if user exists
                    user = await authApi(credentials);
                    console.log(user);
                    return user;
                } catch (errorServe) {
                    if (errorServe instanceof Error)
                        throw new AuthError(ERROR_SERVER);

                    const codeStatusServe = errorServe as ResponseError;

                    if (codeStatusServe.status != 401)
                        throw new AuthError(ERROR_SERVER);
                    else if (codeStatusServe.status == 401)
                        throw new AuthError(ERROR_SIGNIN);
                }
            },
        }),
    ],
});
