'use server';

import { endpointsReports } from '@/collections/endPointsApi';
import { ResponseError } from '@/types';
import { auth } from '@/auth';
import { Session } from 'next-auth';

export const GetReportsYear = async (
    endPoint: keyof typeof endpointsReports,
    year: number,
) => {
    const session = (await auth()) as Session;

    const { user } = session;

    /*  const {token,cookieCsrf}=user */
    const { token } = user;

    const url =
        'http://127.0.0.1:8000' +
        `/${endpointsReports[endPoint]}?year=${year}`;

    const headers = new Headers({
        Accept: '*/*',
        Origin: process.env.ORIGIN,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    });
    /*  if(method == 'POST') headers.append('X-XSRF-TOKEN', cookieCsrf[0].token); */

    const optionFetch: RequestInit = {
        cache: 'no-store',
        method: 'GET',
        headers: headers,
        credentials: 'include',
    };
    try {
        const res = await fetch(url, optionFetch);
        const pdf = await res.blob();

        if (res.status == 200) return pdf;
        else throw { status: res.status, data: await res.json() };
    } catch (e) {
        if (e instanceof Error) throw e;
        const { status, data } = e as ResponseError;
        throw `código ${status} ${data.message}`;
    }
};
