'use server';

import { endpointsReports } from '@/collections/endPointsApi';
import { ResponseError } from '@/types';
import { auth } from '@/auth';
import { Session } from 'next-auth';

export const GetReports = async (
    endPoint: keyof typeof endpointsReports,
    startDate?: string,
    endDate?: string,
    id?: number,
) => {
    const session = (await auth()) as Session;

    const { user } = session;

    /*  const {token,cookieCsrf}=user */
    const { token } = user;

    let url = '';
    if (endPoint == 'dashboard' || endPoint == 'notaVenta') {
        url = 'http://127.0.0.1:8000' + `/${endpointsReports[endPoint]}`;
    } else if (endPoint == 'ganado') {
        url = 'http://127.0.0.1:8000' + `/${endpointsReports[endPoint]}/${id}`;
    } else if (endPoint == 'venta_leche' || endPoint == 'fallecimiento') {
        url =
            'http://127.0.0.1:8000' +
            `/${endpointsReports[endPoint]}?start=${startDate}&end=${endDate}`;
    }

    const headers = new Headers({
        Accept: '*/*',
        Origin: process.env.ORIGIN,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-XSRF-TOKEN': user.xsrf_token,
        Cookie: `XSRF-TOKEN=${user.xsrf_token}; laravel_session=${user.laravel_session}`,
    });
    /*  if(method == 'POST') headers.append('X-XSRF-TOKEN', cookieCsrf[0].token); */

    const optionFetch: RequestInit = {
        cache: 'no-store',
        method: 'GET',
        headers: headers,
        credentials: 'include',
    };
    try {
        const ganadoDescarte = await fetch(url, optionFetch);
        const pdf = await ganadoDescarte.blob();

        if (ganadoDescarte.status == 200) return pdf;
        else
            throw {
                status: ganadoDescarte.status,
                data: await ganadoDescarte.json(),
            };
    } catch (e) {
        if (e instanceof Error) throw e;
        const { status, data } = e as ResponseError;
        throw `código ${status} ${data.message}`;
    }
};
