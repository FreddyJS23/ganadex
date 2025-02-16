import ErrorFromApi from '@/lib/errors/errorFromApi';
import { ResponseError, ResponseErrorFromApi, ResponseErrorNext } from '@/types';
import { handleErrorFromApi } from '@/utils/handleErrorFromApi';
import { handleResponse } from '@/utils/handleResponseApi';

export async function createUserApi<Form,dataResponse>(data?: Form): Promise<ResponseErrorNext | dataResponse  > {
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
        if (status == 201) return data as dataResponse;
        throw new ErrorFromApi('error',{status: status, data: data as ResponseErrorFromApi['data']})  ;
    } catch (e) {
        return  handleErrorFromApi(e)
    }
}
