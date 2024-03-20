import { EndPointsFakeApi } from '@/types';

export async function getData(
    endPoint: keyof typeof EndPointsFakeApi,
    id?: number,
) {
    const res = await fetch(
        `${process.env.API_URL}${endPoint}${id ? `/${id}` : ''}`,
        { cache: 'no-store' },
    );
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}
