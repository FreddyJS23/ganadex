"use server";

import { endpointsReportsAnnual } from "@/collections/endPointsApi";
import { ResponseErrorFromApi } from "@/types";
import { auth } from "@/auth";
import { Session } from "next-auth";
import ErrorFromApi from "@/lib/errors/errorFromApi";
import { handleErrorFromApi } from "@/utils/handleErrorFromApi";

export const GetReportsYear = async (
  endPoint: keyof typeof endpointsReportsAnnual,
  year: number,
  method: "GET" | "POST" = "GET",
  data?: FormData,
) => {
  const session = (await auth()) as Session;

  const { user } = session;
  /*  const {token,cookieCsrf}=user */
  const { token } = user;

  const url =
    process.env.API_URL_BASE +
    `${endpointsReportsAnnual[endPoint]}?year=${year}`;

  const headers = new Headers({
    Accept: "*/*",
    Origin: process.env.ORIGIN,
    "X-XSRF-TOKEN": user.xsrf_token,
    Authorization: `Bearer ${token}`,
    Cookie: `XSRF-TOKEN=${user.xsrf_token}; laravel_session=${user.laravel_session}`,
  });
  /*  if(method == 'POST') headers.append('X-XSRF-TOKEN', cookieCsrf[0].token); */

  const optionFetch: RequestInit = {
    cache: "no-store",
    method: method,
    headers: headers,
    credentials: "include",
  };

  if (method == "POST") optionFetch.body = data;
  try {
    const ganadoDescarte = await fetch(url, optionFetch);
    const pdf = await ganadoDescarte.blob();
    if (ganadoDescarte.status == 200) return pdf;
    else
      throw new ErrorFromApi("error", {
        status: ganadoDescarte.status,
        data: {
          message: ganadoDescarte.statusText,
        } as ResponseErrorFromApi["data"],
      });
  } catch (e) {
    /* manejar otros errores del servidor de laravel */
    if (e instanceof ErrorFromApi) {
      return handleErrorFromApi(e);
    }
    return handleErrorFromApi("error");
  }
};
