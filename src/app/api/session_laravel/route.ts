import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

/* obtener cookies csrf y laravel session para guardar en las cookies de sesion
estos token se regenran al iniciar session de laravel */
export async function GET() {
  const cookiesStore = cookies();

  /* Borrar cookies anteriores */
  cookiesStore.getAll().forEach((cookie) => {
    cookiesStore.delete(cookie.name);
  });
  /* obtener cookies csrf y laravel session */
  const res = await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
    method: "GET",
  });
  const setCookieHeader = res.headers.get("set-cookie");
  const cookiesLaravel = setCookieHeader?.split(", ");

  let xsrfToken = null;
  let laravelSession = null;

  /* extraer tokens de cookies */
  for (const cookie of cookiesLaravel!) {
    if (cookie.startsWith("XSRF-TOKEN=")) {
      /*    el token siempre termina con %3D, lo cual si se envia con esa terminacion sera invalido
                por eso se parsea para obtener lo que este antes del %   */
      xsrfToken = cookie.split("=")[1].split("%")[0];
    } else if (cookie.startsWith("laravel_session=")) {
      laravelSession = cookie.split("=")[1].split("%")[0];
    }
    if (xsrfToken && laravelSession) break;
  }

  /*configuración de cookies*/
  const configCookie: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    /* duracion que tiene la session en laravel */
    maxAge: 60 * 60 * 2,
  };

  //Lanzar error si no se encuentra el token
  if (!xsrfToken || !laravelSession)
    return new Response(
      JSON.stringify({
        error: {
          message:
            "Ha ocurrido un error con los tokens del servidor, por favor vuelva a recargar la pagina",
        },
      }),
      { status: 500 },
    );

  /* guardar token en las cookies de sesion */
  cookiesStore.set("laravel_session", laravelSession, configCookie);
  cookiesStore.set("xsrf_token", xsrfToken, configCookie);
  console.log(cookiesStore.getAll());
  return Response.json({ message: "Ok" });
}
