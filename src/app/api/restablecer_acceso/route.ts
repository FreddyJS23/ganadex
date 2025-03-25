import ErrorFromApi from "@/lib/errors/errorFromApi";
import { getInitCookieXSCRFTOKEN } from "@/services/getInitCookieCsrf";
import { ResponseErrorFromApi, ResponseRestablecerContraseñaUsuario } from "@/types";
import { handleErrorFromApi } from "@/utils/handleErrorFromApi";
import { handleResponse } from "@/utils/handleResponseApi";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   
    const cookiesStore = cookies();

    /* Borrar cookies antiguos */
    cookiesStore.getAll().forEach((cookie) => {
        cookiesStore.delete(cookie.name);
    });
    
    const url = 'http://127.0.0.1:8000/' + 'api/' + 'restablecer_acceso';

    /* Obtener cookies de sesion de laravel */
    const { laravelSession, xsrfToken } = await getInitCookieXSCRFTOKEN()
    
    /*configuracion de cookies*/
    const configCookie: Partial<ResponseCookie> = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 10,
    }

    
    //Lanzar error si no se encuentra el token
    if (!xsrfToken || !laravelSession) return new Response(JSON.stringify({ error:{message: 'Error, token invalidado o no encontrado, por favor vuelva a intentar la acción' } }), { status: 500 })

    /* Agregar cookies de sesion de laravel */
    cookiesStore.set('laravel_session', laravelSession, configCookie)
    cookiesStore.set('xsrf_token', xsrfToken, configCookie)


    const headers = new Headers({
        Accept: 'application/json',
        Origin: process.env.ORIGIN,
        'Content-Type': 'application/json',
        Cookie: `XSRF-TOKEN=${xsrfToken}; laravel_session=${laravelSession}`,
        'X-XSRF-TOKEN': xsrfToken,
    });
    
    const optionFetch: RequestInit = {
        method: 'POST',
        headers: headers,
        credentials: 'include',
        body: JSON.stringify(await req.json()),
    };

    /* inicializar token de recuperacion de contraseña */
    let token=''
    
    try {
        const response = await fetch(url, optionFetch);
        const { data, status } = await handleResponse(response);
        if (status == 200) {
            const { preguntas, token:tokenResponse } = data as ResponseRestablecerContraseñaUsuario
            token=tokenResponse
            cookiesStore.set('preguntas', JSON.stringify(preguntas), configCookie)
        }
        else throw new ErrorFromApi('error', { status: status, data: data as ResponseErrorFromApi['data'] });
    } catch (e) {
        const { error } = handleErrorFromApi(e)
        return new Response(JSON.stringify(error), { status: error.status })
    }
  
    redirect(`/restablecer_acceso/${token}`);

}