import { auth } from '@/app/auth';
import { ResponseError } from '@/types';
import { handleResponse } from '@/utils/handleResponseApi';
import { Session } from 'next-auth';

export async function signOutApi() {
    const url = 'http://127.0.0.1:8000/' + 'api/' + 'logout';
    const session = (await auth()) as Session;

    const { user } = session;

    /*  const {token,cookieCsrf}=user */
    const { token } = user;

    const optionFetch: RequestInit = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Origin: process.env.ORIGIN,
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
    };
    try {
        const ganadoDescarte = await fetch(url, optionFetch);
        const { data, status } = await handleResponse(ganadoDescarte);
        if (status == 200) {
            console.log(status);
            return status;
        } else if (status == 422 || status == 401 || status == 500)
            throw { status: status, data: data };
    } catch (e) {
        if (e instanceof Error) throw e;

        const { status, data } = e as ResponseError;
        throw { status, data };
    }
}
