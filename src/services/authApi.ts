import { handleResponse } from "@/utils/handleResponseApi";
import { getNewCookiesSession } from "@/utils/getNewCookiesSession";
import { cookies } from "next/headers";
import { ERROR_401, ERROR_404, ERROR_419, ERROR_500 } from "@/constants/responseApiMessage";
import { handleErrorFromApi } from "@/utils/handleErrorFromApi";
import ErrorFromApi from "@/lib/errors/errorFromApi";
import { ResponseLogin } from "@/types";

export async function authApi(
  credentials: Partial<Record<"usuario" | "password", unknown>>,
) {
  const url = process.env.API_URL + "login";
  const cookiesStore = cookies();

  const laravelSession = cookiesStore.get("laravel_session")?.value;

  const xsrfToken = cookiesStore.get("xsrf_token")?.value;

  if (!laravelSession || !xsrfToken)
    throw {
      status: 500,
      data: {
        message:
          "Error, token invalidado o no encontrado, por favor vuelva al login o recargue la pagina",
      },
    };

  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Origin: process.env.ORIGIN,
    "X-XSRF-TOKEN": xsrfToken,
    Cookie: `XSRF-TOKEN=${xsrfToken}; laravel_session=${laravelSession}`,
  });

  const optionFetch: RequestInit = {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(credentials),
  };
  try {
    const response = await fetch(url, optionFetch);
    const { data, status } = await handleResponse<ResponseLogin>(response);
    if (status == 200 || status == 201) {
      const { xsrfToken, laravelSession } = getNewCookiesSession(
        response.headers,
      );
      return {
        ...data.login,
        xsrf_token: xsrfToken,
        //Obtener nueva session generada por laravel
        laravel_session: laravelSession,
      };
    } else if (status == 422 || status == 401 || status == 500) {
      throw { status: status, data: data };
    } else throw { status: status, data: data };
  } catch (e) {
    if (e instanceof Error) throw e;

    console.log(e);
  /* manejar otros errores del servidor de laravel */
  if (e instanceof ErrorFromApi) {
    const { status } = e.error;
    if (status == 404) throw new Error(ERROR_404);
    else if (status == 401) throw new Error(ERROR_401);
    else if (status == 500) throw new Error(ERROR_500);
    else if (status == 419) throw new Error(ERROR_419);
  }
  return handleErrorFromApi(e);
  }
}
