"use server";

import { endpointsReportsAnnual } from "@/collections/endPointsApi";
import { ResponseError } from "@/types";
import { auth } from "@/auth";
import { Session } from "next-auth";

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
    "http://127.0.0.1:8000" +
    `/${endpointsReportsAnnual[endPoint]}?year=${year}`;

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
      throw {
        status: ganadoDescarte.status,
        data: await ganadoDescarte.json(),
      };
  } catch (e) {
    if (e instanceof Error) throw e;
    const { status, data } = e as ResponseError;
    throw `código ${status} ${data.message}`;
  }
};
