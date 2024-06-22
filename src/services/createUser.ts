import { ResponseError } from '@/types';
import { handleResponse } from '@/utils/handleResponseApi';

export async function createUserApi(data?: unknown) {
    const url = 'http://127.0.0.1:8000/' + 'api/' + 'register';

    const headers = new Headers({
        Accept: 'application/json',
        Origin: process.env.ORIGIN,
        'Content-Type': 'application/json',
    });

    const optionFetch: RequestInit = {
        cache: 'no-store',
        method: 'POST',
        headers: headers,
        credentials: 'include',
        body: JSON.stringify(data),
    };

    try {
        const ganadoDescarte = await fetch(url, optionFetch);
        const { data, status } = await handleResponse(ganadoDescarte);
        if (status == 201) return data;
        else throw { status: status, data: data };
    } catch (e) {
        if (e instanceof Error) throw e;

        const { status, data } = e as ResponseError;
        throw { status, data };
    }
}
