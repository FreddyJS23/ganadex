import ErrorFromApi from "@/lib/errors/errorFromApi";
import { getInitCookieXSCRFTOKEN } from "@/services/getInitCookieCsrf";
import {
  ResponseErrorFromApi,
  ResponseRestablecerContraseñaUsuario,
} from "@/types";
import { handleErrorFromApi } from "@/utils/handleErrorFromApi";
import { handleResponse } from "@/utils/handleResponseApi";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const cookiesStore = cookies();

  const laravelSession = cookiesStore.get("laravel_session")?.value;

  const xsrfToken = cookiesStore.get("xsrf_token")?.value;

  if (!laravelSession || !xsrfToken)
    return new Response(
      JSON.stringify({
        error: {
          message:
            "Error, token invalidado o no encontrado, por favor vuelva al login",
        },
      }),
      { status: 500 },
    );

  const url = "http://127.0.0.1:8000/" + "api/" + "restablecer_acceso";

  /*configuracion de cookies*/
  const configCookie: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 10,
  };

  const headers = new Headers({
    Accept: "application/json",
    Origin: process.env.ORIGIN,
    "Content-Type": "application/json",
    Cookie: `XSRF-TOKEN=${xsrfToken}; laravel_session=${laravelSession}`,
    "X-XSRF-TOKEN": xsrfToken,
  });

  const optionFetch: RequestInit = {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(await req.json()),
  };

  /* inicializar token de recuperacion de contraseña */
  let token = "";

  try {
    const response = await fetch(url, optionFetch);
    const { data, status } = await handleResponse(response);
    if (status == 200) {
      const { preguntas, token: tokenResponse } =
        data as ResponseRestablecerContraseñaUsuario;
      token = tokenResponse;
      cookiesStore.set("preguntas", JSON.stringify(preguntas), configCookie);
    } else
      throw new ErrorFromApi("error", {
        status: status,
        data: data as ResponseErrorFromApi["data"],
      });
  } catch (e) {
    const error = handleErrorFromApi(e);
    return new Response(JSON.stringify(error), { status: error.error.status });
  }

  redirect(`/restablecer_acceso/${token}`);
}
