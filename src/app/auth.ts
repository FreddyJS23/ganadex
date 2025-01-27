import { ERROR_CORS, ERROR_SERVER, ERROR_SIGNIN } from '@/constants/responseApiMessage';
import { authApi } from '@/services/authApi';
import { ResponseError } from '@/types';

import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.userId = parseInt(user.id as string);
                token.usuario = user.usuario;
                token.token = user.token;
                token.role = user.rol;
                token.xsrf_token = user.xsrf_token;
                token.laravel_session = user.laravel_session;
                token.finca=user.finca
                /*     token.cookieCsrf=user.cookieCsrf */
            }
            return token;
        },
        session({ session, token }) {
            session.user.userId = token.userId;
            session.user.token = token.token;
            session.user.usuario = token.usuario;
            session.user.rol = token.role;
            session.user.xsrf_token = token.xsrf_token;
            session.user.laravel_session = token.laravel_session;
            session.user.finca=token.finca
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
                    return user;
                } catch (errorServe) {
                    if (errorServe instanceof Error)
                        throw new AuthError(ERROR_SERVER);

                    const codeStatusServe = errorServe as ResponseError;
                    if (codeStatusServe.status == 401)
                        throw new AuthError(ERROR_SIGNIN);
                    else if (codeStatusServe.status == 419)
                        throw new AuthError(ERROR_CORS);        
                    else 
                        throw new AuthError(ERROR_SERVER);
                }
            },
        }),
    ],
});
