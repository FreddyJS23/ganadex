"use server";

import { endpointsReports } from "@/collections/endPointsApi";
import { ResponseError, ResponseErrorFromApi } from "@/types";
import { auth } from "@/auth";
import { Session } from "next-auth";
import ErrorFromApi from "@/lib/errors/errorFromApi";
import {
  ERROR_401,
  ERROR_404,
  ERROR_419,
  ERROR_500,
} from "@/constants/responseApiMessage";
import { handleErrorFromApi } from "@/utils/handleErrorFromApi";

export const GetReports = async (
  endPoint: keyof typeof endpointsReports,
  startDate?: string,
  endDate?: string,
  id?: number,
) => {
  const session = (await auth()) as Session;

  const { user } = session;

  /*  const {token,cookieCsrf}=user */
  const { token } = user;

  let url = "";
  if (endPoint == "dashboard" || endPoint == "notaVenta") {
    url = process.env.API_URL_BASE + `${endpointsReports[endPoint]}`;
  } else if (endPoint == "ganado") {
    url = process.env.API_URL_BASE + `${endpointsReports[endPoint]}/${id}`;
  } else if (endPoint == "venta_leche" || endPoint == "fallecimiento") {
    url =
      process.env.API_URL_BASE +
      `${endpointsReports[endPoint]}?start=${startDate}&end=${endDate}`;
  }

  const headers = new Headers({
    Accept: "application/json",
    Origin: process.env.ORIGIN,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-XSRF-TOKEN": user.xsrf_token,
    Cookie: `XSRF-TOKEN=${user.xsrf_token}; laravel_session=${user.laravel_session}`,
  });
  /*  if(method == 'POST') headers.append('X-XSRF-TOKEN', cookieCsrf[0].token); */

  const optionFetch: RequestInit = {
    cache: "no-store",
    method: "GET",
    headers: headers,
    credentials: "include",
  };
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
