import ErrorFromApi from "@/lib/errors/errorFromApi";
import { ResponseErrorNext } from "@/types";

/** Función para tranformar un error proveniente del servidor de laravel */
export const handleErrorFromApi = (e: unknown): ResponseErrorNext => {
  if (e instanceof ErrorFromApi) {
    const { status, data } = e.error;
    return { error: { message: data.message, status: status } };
  }
  if (e instanceof Error) {
    console.log(e.message);
    return { error: { message: "error inesperado", status: 500 } };
  }

  console.log(e);
  return { error: { message: "error desconocido", status: 500 } };
};
