export const handleResponse = async (res: Response) => {
    return { status: res.status, data: await res.json() };
};
