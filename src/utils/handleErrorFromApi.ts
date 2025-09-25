import ErrorFromApi from "@/lib/errors/errorFromApi";
import { ResponseErrorNext } from "@/types";

/** Función para trasformar un error proveniente de una petición hecha a la api de Laravel*/
export const handleErrorFromApi = (e: unknown): ResponseErrorNext => {
  if (e instanceof ErrorFromApi) {
    const { status, data } = e.error;
    return { error: { message: data.message, status: status } };
  }
  if (e instanceof Error) {
    console.log(e.message);
    return { error: { message: "Error inesperado", status: 500 } };
  }

  console.log(e);
  return { error: { message: "Error desconocido", status: 500 } };
};
