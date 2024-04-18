import { ResponseError } from '@/types';
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
        const res = await fetch(url, optionFetch);

        const { data, status } = await handleResponse(res);

        if (status == 200 || status == 201) return data;
        else if (status == 422 || status == 401 || status == 500)
            throw { status: status, data: data };
    } catch (e) {
        if (e instanceof Error) throw e;

        const { status, data } = e as ResponseError;
        throw { status, data };
    }
}
