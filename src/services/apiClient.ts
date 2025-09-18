"use server";

import { endPoints, endPointsCattle } from "@/collections/endPointsApi";
import { handleResponse } from "../utils/handleResponseApi";
import {
  ResponseErrorFromApi,
  ResponseErrorNext,
} from "@/types";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { handleErrorFromApi } from "../utils/handleErrorFromApi";
import ErrorFromApi from "@/lib/errors/errorFromApi";
import { ERROR_401, ERROR_404, ERROR_419, ERROR_500 } from "@/constants/responseApiMessage";


type RequestConfig={
  endPoint: keyof typeof endPoints,
  method: "GET" | "POST" | "DELETE" | "PUT",
  id?: number,
  endPointCattle?: keyof typeof endPointsCattle,
  id2?: number,
}

type GetDataType=Omit<RequestConfig, 'method'> &  {
  param?: string | number,
}

type SubmitFormType<Form>=RequestConfig &  {
  data?: Form,
}


const configRequest=async(config:RequestConfig)=>{

  const {endPoint,method,id,endPointCattle,id2}=config

  const session = (await auth()) as Session;

  const { user } = session;

  /*  const {token,cookieCsrf}=user */
  const { token } = user;

  let url = process.env.API_URL + endPoints[endPoint];

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
    method: method,
    headers: headers,
    credentials: "include",
  };


if (id) url = url + id;
if (endPointCattle) url = url + endPointsCattle[endPointCattle];
if (id2) url = url + id2;

return {url,optionFetch}

}

/* ----------------------------- messages errros ---------------------------- */
const returnErrorFromApi=(status:number,data:ResponseErrorFromApi["data"])=>{
  throw new ErrorFromApi("error", {
    status: status,
    data: data as ResponseErrorFromApi["data"],
  });
}

const returnErrorLaravelFromApi=(e: unknown)=>{
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


/* ----------------------------------- api ---------------------------------- */

export async function submitForm<Form, dataResponse>( {endPoint,method="POST",data,id,endPointCattle,id2}: SubmitFormType<Form>): Promise<dataResponse | ResponseErrorNext> {


  const {optionFetch,url}=await configRequest({endPoint,method,id,endPointCattle,id2})
  
  
  method == "POST" || method == "PUT"
  ? (optionFetch.body = JSON.stringify(data))
  : null;


  try {
    const dataApi = await fetch(url, optionFetch);

    const { data, status } = await handleResponse<dataResponse>(dataApi);
    if (status == 200 || status == 201) return data;
    else if (
      status == 422 ||
      status == 401 ||
      status == 500 ||
      status == 404 ||
      status == 419 ||
      status != 200
    )
      return returnErrorFromApi(status, data as ResponseErrorFromApi["data"]);
  } catch (e: unknown) {
    return returnErrorLaravelFromApi(e);
  }

  return handleErrorFromApi("error");
}



export async function getData<dataResponse>({endPoint,id,endPointCattle,id2,param}:GetDataType): Promise<dataResponse | ResponseErrorNext> {

  const {optionFetch,url:urlWihoutParam}=await configRequest({endPoint,method:"GET",id,endPointCattle,id2})
  
  let url = urlWihoutParam

  if (
  endPoint == "dashboardVentaGanadoBalanceAnual" ||
  endPoint == "dashboardPrincipalbalanceAnualLeche"
)
  url = url + "?year=" + param;
if (endPoint == "dashboardVentaLecheBalanceMensual")
  url = url + "?month=" + param; 

  try {
    const dataApi = await fetch(url, optionFetch);

    const { data, status } = await handleResponse<dataResponse>(dataApi);
    if (status == 200 || status == 201) return data;
    else if (
      status == 422 ||
      status == 401 ||
      status == 500 ||
      status == 404 ||
      status == 419 ||
      status != 200
    )
      return returnErrorFromApi(status, data as ResponseErrorFromApi["data"]);
  } catch (e: unknown) {
    return returnErrorLaravelFromApi(e);
  }

  return handleErrorFromApi("error");
}
