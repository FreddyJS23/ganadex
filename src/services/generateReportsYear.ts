"use server";

import { endpointsReportsAnnual } from "@/collections/endPointsApi";
import { ResponseError, ResponseErrorFromApi } from "@/types";
import { auth } from "@/auth";
import { Session } from "next-auth";
import ErrorFromApi from "@/lib/errors/errorFromApi";
import { ERROR_401, ERROR_404, ERROR_419, ERROR_500 } from "@/constants/responseApiMessage";
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
    else throw new ErrorFromApi("error", {
      status: ganadoDescarte.status,
      data: await ganadoDescarte.json() as ResponseErrorFromApi["data"],
    });
  } catch (e) {
     /* manejar otros errores del servidor de laravel */
     if (e instanceof ErrorFromApi){
      const {status}=e.error
      if( status == 404) throw new Error(ERROR_404);
      else if( status == 401) throw new Error(ERROR_401);
      else if( status == 500) throw new Error(ERROR_500);
      else if( status == 419) throw new Error(ERROR_419);
      
    };
    return handleErrorFromApi(e);
  }
};
