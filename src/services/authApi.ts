import {  ResponseError } from '@/types';
import { handleResponse } from '@/utils/handleResponseApi';

export async function authApi(
    credentials: Partial<Record<'usuario' | 'password', unknown>>,
) {
    const url = 'http://127.0.0.1:8000/' + 'api/' + 'login';

    const optionFetch: RequestInit = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Origin: process.env.ORIGIN,
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    };

    try {
     const ganadoDescarte = await fetch(url, optionFetch);
        /*   
        const getCookieXSCRFTOKEN = (ganadoDescarte: Response) => {
            const dataCookie: CookieCsrf[] = [];
            const setCookieXsrfToken = ganadoDescarte.headers.getSetCookie();
            setCookieXsrfToken.forEach((setCookie) => {
                setCookie.split(';').forEach((partsOfcookie) => {
                    const [name, value] = partsOfcookie.split('=');
                    
                    if (name == 'XSRF-TOKEN') {
                         el token siempre termina con %3D, lo cual si se envia con esa terminacion sera invalido
                    por eso se parsea para obtener lo que este antes del %  
                        const parsToken = value.split('%');
                        dataCookie.push({
                            nameCookie: name,
                            token: parsToken[0].trim(),
                        });
                    }
                    if (name == 'laravel_session') {
                         el token siempre termina con %3D, lo cual si se envia con esa terminacion sera invalido
                    por eso se parsea para obtener lo que este antes del %  
                        const parsToken = value.split('%');
                        dataCookie.push({
                            nameCookie: name,
                            token: parsToken[0].trim(),
                        });
                    }
                });
            });
            return dataCookie;
        }; */
        const { data, status } = await handleResponse(ganadoDescarte);
        if (status == 200 || status == 201)
            return { ...data.login, /* cookieCsrf: getCookieXSCRFTOKEN(ganadoDescarte)  */};
        else if (status == 422 || status == 401 || status == 500)
            throw { status: status, data: data };
    } catch (e) {
        if (e instanceof Error) throw e;

        const { status, data } = e as ResponseError;
        throw { status, data };
    }
}
