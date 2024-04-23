'use server'

import { endPoints, endPointsCattle } from '@/collections/endPointsApi';
import { handleResponse } from './handleResponseApi';
import { ResponseError } from '@/types';
import { auth } from '@/auth';
import { Session } from 'next-auth';

export async function getData(
    endPoint: keyof typeof endPoints,
    method:'GET' | 'POST' | 'DELETE' | 'PUT'='GET',
    data?:unknown,
    id?: number,
    endPointCattle?: keyof typeof endPointsCattle,
    id2?: number,
) {

   /*  const token = login.login.token; */
     const token = '36|eJqVOt2g2yKtxCFceDeRLrFCRCsfK5UlLMx8vQOj3e2e5ccc'; 

    let url = 'http://127.0.0.1:8000/' + 'api/' + endPoints[endPoint];
    
    const headers = new Headers({
        Accept: 'application/json',
        Origin: process.env.ORIGIN,
        'Content-Type': 'application/json',
    });
    const optionFetch: RequestInit = {
        cache: 'no-store',
        method: method,
        headers: headers,
        credentials: 'include',
     body: JSON.stringify(data),
    };

    if (id) url = url + id;
    if (endPointCattle) url = url + endPointsCattle[endPointCattle];
    if (id2) url = url + id2;

    try {
        const res = await fetch(url, optionFetch);

        const { data, status } = await handleResponse(res);

        if (status == 200 || status == 201) return data;
        else if (status == 422 || status == 401 || status == 500 || status == 404)
            throw { status: status, data: data };
    } catch (e) {
        if (e instanceof Error) throw e;

        const { status, data } = e as ResponseError;
      
        throw { status, data };
    }
}
