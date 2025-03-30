// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";
import { Configuracion, Hacienda } from "./models";

type User = {
  id: number;
  usuario: string;
  token: string;
  rol: "admin" | "veterinario";
  configuracion: Configuracion;
};

export type ResponseRegistroExitoso = {
  message: string;
};

export type ResponseLogin = {
  login: User;
};

export type ResponseLoginAuthJs = {
  login: boolean;
  redirect: "/hacienda" | null;
  message: string | null;
};

export type CookieCsrf = {
  nameCookie: string;
  token: string;
};

declare module "next-auth" {
  export interface User {
    /** Define any user-specific variables here to make them available to other code inferences */
    id: number;
    usuario: string;
    token: string;
    rol: "admin" | "veterinario";
    xsrf_token: string;
    laravel_session: string;
    userId: number;
    sesion_hacienda: boolean;
    configuracion: Configuracion;
    hacienda: Hacienda | null;
    tiene_preguntas_seguridad: boolean;
    // Any other attributes you need from either your User table columns or additional fields during a session callback
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    id: number;
    usuario: string;
    token: string;
    role: "admin" | "veterinario";
    xsrf_token: string;
    laravel_session: string;
    userId: number;
    sesion_hacienda: boolean;
    configuracion: Configuracion;
    hacienda: Hacienda | null;
    tiene_preguntas_seguridad;
  }
}
