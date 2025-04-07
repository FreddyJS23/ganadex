import {
  ERROR_CORS,
  ERROR_SERVER,
  ERROR_SIGNIN,
} from "@/constants/responseApiMessage";
import { authApi } from "@/services/authApi";
import { ResponseError } from "@/types";

import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  /* duracion de la session en laravel */
  session:{maxAge:60*60*2},
  callbacks: {
    jwt({ token, user, session, trigger }) {
      if (user) {
        token.userId = parseInt(user.id as string);
        token.usuario = user.usuario;
        token.token = user.token;
        token.role = user.rol;
        token.xsrf_token = user.xsrf_token;
        token.laravel_session = user.laravel_session;
        token.sesion_hacienda = user.sesion_hacienda;
        token.configuracion = user.configuracion;
        token.hacienda = user.hacienda;
        token.tiene_preguntas_seguridad = user.tiene_preguntas_seguridad;
        /*     token.cookieCsrf=user.cookieCsrf */
      }
      if (trigger == "update") {
        token = { ...token, ...session.user };
        return token;
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
      session.user.sesion_hacienda = token.sesion_hacienda;
      session.user.configuracion = token.configuracion;
      session.user.hacienda = token.hacienda;
      session.user.tiene_preguntas_seguridad = token.tiene_preguntas_seguridad;
      return session;
    },
  },
  pages: { signIn: "/login" },
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
          if (errorServe instanceof Error) throw new AuthError(ERROR_SERVER);

          const codeStatusServe = errorServe as ResponseError;
          if (codeStatusServe.status == 401) throw new AuthError(ERROR_SIGNIN);
          else if (codeStatusServe.status == 419)
            throw new AuthError(ERROR_CORS);
          else throw new AuthError(ERROR_SERVER);
        }
      },
    }),
  ],
});
