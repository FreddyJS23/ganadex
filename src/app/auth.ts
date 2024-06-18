import type { ResponseError } from '@/types';
import Credentials from 'next-auth/providers/credentials';
import NextAuth, { AuthError } from 'next-auth';
import { ERROR_SERVER, ERROR_SIGNIN } from '@/constants/responseApiMessage';
import { authApi } from '@/services/authApi';

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.usuario = user.usuario;
                token.token = user.token;
                // token.cookieCsrf = user.cookieCsrf;
            }

            return token;
        },
        session({ session, token }) {
            session.user.token = token.token;
            session.user.usuario = token.usuario;
            // session.user.cookieCsrf = token.cookieCsrf;

            return session;
        },
    },
    pages: { signIn: '/login' },
    providers: [
        Credentials({
            /* You can specify which fields should be submitted, by adding keys
            to the `credentials` object. e.g. domain, username, password,
            2FA token, etc. */
            credentials: {
                usuario: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    // logic to verify if user exists
                    const user = await authApi(credentials);
                    console.info(user);

                    return user;
                } catch (errorServe) {
                    if (errorServe instanceof Error) {
                        throw new AuthError(ERROR_SERVER);
                    }

                    const codeStatusServe = errorServe as ResponseError;

                    if (codeStatusServe.status !== 401) {
                        throw new AuthError(ERROR_SERVER);
                    }

                    if (codeStatusServe.status === 401) {
                        throw new AuthError(ERROR_SIGNIN);
                    }
                }
            },
        }),
    ],
});
