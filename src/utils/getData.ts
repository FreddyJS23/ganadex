'use server';

import { endPoints, endPointsCattle } from '@/collections/endPointsApi';
import { handleResponse } from './handleResponseApi';
import { ResponseError } from '@/types';
import { auth } from '@/auth';
import { Session } from 'next-auth';
import ErrorApp from './errorApp';

export async function getData(
    endPoint: keyof typeof endPoints,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET',
    data?: unknown,
    id?: number,
    endPointCattle?: keyof typeof endPointsCattle,
    id2?: number,
) {
    const session = (await auth()) as Session;

    const { user } = session;

    /*  const {token,cookieCsrf}=user */
    const { token } = user;

    let url = 'http://127.0.0.1:8000/' + 'api/' + endPoints[endPoint];

    const headers = new Headers({
        Accept: 'application/json',
        Origin: process.env.ORIGIN,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-XSRF-TOKEN': user.xsrf_token,
        Cookie: `XSRF-TOKEN=${user.xsrf_token}; laravel_session=${user.laravel_session}`,
    });

    /*  if(method == 'POST') headers.append('X-XSRF-TOKEN', cookieCsrf[0].token); */

    const optionFetch: RequestInit = {
        cache: 'no-store',
        method: method,
        headers: headers,
        credentials: 'include',
    };

   method == 'POST' || method == 'PUT' ? (optionFetch.body = JSON.stringify(data)) : null;

    if (id) url = url + id;
    if (endPointCattle) url = url + endPointsCattle[endPointCattle];
    if (id2) url = url + id2;
    if (endPoint == 'dashboardVentaGanadoBalanceAnual' || endPoint == 'dashboardPrincipalbalanceAnualLeche') url = url + '?year=' + data;
    if (endPoint == 'dashboardVentaLecheBalanceMensual') url = url + '?month=' + data;
    
    try {
        const dataApi = await fetch(url, optionFetch);

        const { data, status } = await handleResponse(dataApi);
        if (status == 200 || status == 201) return data;
        else if (
            status == 422 ||
            status == 401 ||
            status == 500 ||
            status == 404 ||
            status == 419 ||
            status != 200
        )
            throw { status: status, data: data };
    } catch (e) {
        if (e instanceof Error) throw new Error('Error en la conexión con el servidor');
        const { status, data } = e as ResponseError;
        throw new Error(`${status}: ${data.message}`);
    }
}
