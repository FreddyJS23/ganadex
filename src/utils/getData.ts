import { endPoints, endPointsCattle } from '@/collections/endPointsApi';
import { auth } from '@/services/auth';

export async function getData(
    endPoint: keyof typeof endPoints,
    id?: number,
    endPointCattle?: keyof typeof endPointsCattle,
    id2?: number,
) {

    const login = await auth();
   /*  const token = login.login.token; */
     const token = '36|eJqVOt2g2yKtxCFceDeRLrFCRCsfK5UlLMx8vQOj3e2e5ccc'; 

    let url = 'http://127.0.0.1:8000/' + 'api/' + endPoints[endPoint];
    const optionFetch: RequestInit = {
        cache: 'no-store',
        headers: {
            Accept: 'application/json',
            Origin: process.env.ORIGIN,
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
    };

    if (id) url = url + id;
    if (endPointCattle) url = url + endPointsCattle[endPointCattle];
    if (id2) url = url + id2;

    try {
        const res = await fetch(url, optionFetch);
console.log(res)
        
        return res.json();
    } catch (e) {
        throw new Error('error in fetch');

    }
}
