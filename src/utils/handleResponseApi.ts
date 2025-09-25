type HandleResponse<T> = {
  status: number;
  data: T;
};

/**Manejar respuesta del fetch de la api de laravel
 * @param dataApi Respuesta del fetch de la api de laravel
 * @returns {Promise<HandleResponse<T>>} Objeto con el status y el data
 */
export const handleResponse = async <T>(
  dataApi: Response,
): Promise<HandleResponse<T>> => {
  return { status: dataApi.status, data: await dataApi.json() };
};
