'use server';

import { ResponseError } from '@/types';
import { auth } from '@/auth';
import { Session } from 'next-auth';

export const RestoreLastBackup= async () => {
    const session = (await auth()) as Session;

    const { user } = session;

    /*  const {token,cookieCsrf}=user */
    const { token } = user;

    const url = 'http://127.0.0.1:8000/api/restaurar';


    const headers = new Headers({
        Accept: '*/*',
        Origin: process.env.ORIGIN,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    });

    const optionFetch: RequestInit = {
        cache: 'no-store',
        method: 'GET',
        headers: headers,
        credentials: 'include',
    };
    try {
        const ganadoDescarte = await fetch(url, optionFetch);
        
        if (ganadoDescarte.status == 200) return ganadoDescarte.status;
        else throw { status: ganadoDescarte.status, data: await ganadoDescarte.json() };
    } catch (e) {
       console.log(e)
        if (e instanceof Error) throw e;
        const { status, data } = e as ResponseError;
        throw `código ${status} ${data.message}`;
    }
};
