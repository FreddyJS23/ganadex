// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt';

type User = {
    id: number;
    usuario: string;
    token: string;
};

export type ResponseRegistroExitoso = {
    message: string;
};

export type ResponseLogin = {
    login: User;
};

export type ResponseLoginAuthJs ={
    login:boolean;
    redirect:'/dashboard' | null;
    message:string | null;

}

declare module 'next-auth' {
    export interface User  {
        /** Define any user-specific variables here to make them available to other code inferences */
        id: number;
        usuario: string;
        token: string;
        // Any other attributes you need from either your User table columns or additional fields during a session callback
    }
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    export interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    export interface JWT {
        id: number;
        usuario: string;
        token: string;
    }
    
}
