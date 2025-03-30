import { ResponseError } from "@/types";
import { handleResponse } from "@/utils/handleResponseApi";
import { getNewCookiesSession } from "@/utils/getNewCookiesSession";
import { cookies } from "next/headers";

export async function authApi(
  credentials: Partial<Record<"usuario" | "password", unknown>>,
) {
  const url = "http://127.0.0.1:8000/" + "api/" + "login";
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
    const ganadoDescarte = await fetch(url, optionFetch);
    const { data, status } = await handleResponse(ganadoDescarte);
    if (status == 200 || status == 201) {
      const { xsrfToken, laravelSession } = getNewCookiesSession(
        ganadoDescarte.headers,
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

    const { status, data } = e as ResponseError;
    throw { status, data };
  }
}
