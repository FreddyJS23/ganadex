import { NextResponse } from "next/server";
import { auth as middleware } from "@/auth";

const routesVerinary = [
  "ganado",
  "toros",
  "ganado_descarte",
  "servicios",
  "revisiones",
  "partos",
  "fallecimientos",
  "planes_sanitario",
  "perfil",
  "hacienda",
];

const routeIsAllowed = (url: string) => {
  const route = url.split("/")[1];
  return routesVerinary.includes(route);
};

const redirectRol = (rol: "admin" | "veterinario", url: string) => {
  if (rol == "admin") return NextResponse.redirect(new URL("/dashboard", url));
  else if (rol == "veterinario")
    return NextResponse.redirect(new URL("/ganado", url));
};

export default middleware((request) => {
  //session no iniciada
  if (!request.auth) {
    if (request.nextUrl.pathname.startsWith("/restablecer_acceso")) {
      return NextResponse.next();
    }
    //redirigir a login si intentan acceder a rutas
    if (!request.nextUrl.pathname.startsWith("/login"))
      return NextResponse.redirect(new URL("/login", request.url));
  } else {
    //logueado pero sin una sesion de hacienda
    if (
      !request.auth.user.sesion_hacienda &&
      !request.nextUrl.pathname.startsWith("/hacienda")
    )
      return NextResponse.redirect(new URL("/hacienda", request.url));

    if (
      request.nextUrl.pathname.startsWith("/login") ||
      (request.nextUrl.pathname == "/hacienda" &&
        request.auth.user.sesion_hacienda)
    ) {
      return redirectRol(request.auth.user.rol, request.url);
    }
    if (request.auth.user.rol == "veterinario") {
      //redirigir en caso de login a la ruta de inicio
      if (request.nextUrl.pathname.startsWith("/dashboard"))
        return NextResponse.redirect(new URL("/ganado", request.url));
      if (!routeIsAllowed(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/api/signOut", request.url));
      }
    }
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login
     */

    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
