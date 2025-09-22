"use server";

import ErrorFromApi from "@/lib/errors/errorFromApi";
import { ResponseErrorFromApi, ResponseErrorNext } from "@/types";
import { handleErrorFromApi } from "@/utils/handleErrorFromApi";
import { handleResponse } from "@/utils/handleResponseApi";
import { cookies } from "next/headers";

export async function createUserApi<Form, dataResponse>(
  data?: Form,
): Promise<ResponseErrorNext | dataResponse> {
  const url = process.env.API_URL + "register";

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
    Origin: process.env.ORIGIN,
    "Content-Type": "application/json",
    "X-XSRF-TOKEN": xsrfToken,
    Cookie: `XSRF-TOKEN=${xsrfToken}; laravel_session=${laravelSession}`,
  });

  const optionFetch: RequestInit = {
    cache: "no-store",
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(data),
  };

  try {
    const ganadoDescarte = await fetch(url, optionFetch);
    const { data, status } = await handleResponse(ganadoDescarte);
    if (status == 201) return data as dataResponse;
    throw new ErrorFromApi("error", {
      status: status,
      data: data as ResponseErrorFromApi["data"],
    });
  } catch (e) {
    return handleErrorFromApi(e);
  }
}
