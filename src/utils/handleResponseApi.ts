export const handleResponse = async (dataApi: Response) => {
    return { status: dataApi.status, data: await dataApi.json() };
};
