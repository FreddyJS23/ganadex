import { cookies } from "next/headers";
import ErrorFromApi from "@/lib/errors/errorFromApi";
import { ResponseErrorFromApi, ResponseRegistroExitoso } from "@/types";
import { handleErrorFromApi } from "@/utils/handleErrorFromApi";
import { handleResponse } from "@/utils/handleResponseApi";

export async function POST(
  req: Request,
  { params }: { params: { token: string } },
) {
  const cookiesStore = cookies();

  const laravelSession = cookiesStore.get("laravel_session")?.value;

  const xsrfToken = cookiesStore.get("xsrf_token")?.value;

  const token = params.token;

  const url = process.env.API_URL + "restablecer_acceso/" + token;

  //Lanzar error si no se encuentra el token
  if (!xsrfToken || !laravelSession)
    return new Response(
      JSON.stringify({
        error: {
          message:
            "Error, token invalidado o no encontrado, por favor vuelva a intentar la acción",
        },
      }),
      { status: 500 },
    );

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

  try {
    const response = await fetch(url, optionFetch);
    const { data, status } = await handleResponse(response);
    if (status == 200) {
      /* Borrar cookies ya que no se necesitaran */
      cookiesStore.getAll().forEach((cookie) => {
        cookiesStore.delete(cookie.name);
      });
      return Response.json(data as ResponseRegistroExitoso);
    }
    throw new ErrorFromApi("error", {
      status: status,
      data: data as ResponseErrorFromApi["data"],
    });
  } catch (e) {
    const error = handleErrorFromApi(e);
    return new Response(JSON.stringify(error), { status: error.error.status });
  }
}
