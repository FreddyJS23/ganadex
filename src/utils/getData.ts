import { endPoints, endPointsCattle } from '@/collections/endPointsApi';

export async function getData(
    endPoint: keyof typeof endPoints,
    id?: number,
    endPointCattle?: keyof typeof endPointsCattle,
    id2?: number,
) {
    let url = process.env.API_URL + endPoints[endPoint];
    const optionFetch: RequestInit = { cache: 'no-store' };

    if (id) url = url + id;
    if (endPointCattle) url = url + endPointsCattle[endPointCattle];
    if (id2) url = url + id2;

    try {
        const res = await fetch(url, optionFetch);
        return res.json();
    } catch (e) {
        throw new Error('error in fetch');
    }
}
