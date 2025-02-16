type HandleResponse<T> = {
    status: number;
    data:T;
};

export const handleResponse=async <T> (dataApi: Response):Promise<HandleResponse<T>> => {
    return { status: dataApi.status, data: await dataApi.json() };
};
