export async function auth() {
    const url = 'http://127.0.0.1:8000/' + 'api/' + 'login';

    const data = { usuario: 'admin', password: 'admin' };

    const optionFetch: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Origin: process.env.ORIGIN,
        },
        credentials: 'include',
        body: JSON.stringify(data),
    };

    try {
        const res = await fetch(url, optionFetch);

        return await res.json();
    } catch (e) {
        throw new Error('error in fetch');
    }
}
