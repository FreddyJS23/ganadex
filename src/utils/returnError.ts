import { toast } from "sonner";
import { messageErrorApi } from "./handleErrorResponseNext";
import { ResponseErrorNext } from "@/types";
import ErrorFromApi from "@/lib/errors/errorFromApi";

/**De haber un error devolverá un componente toast con el mensaje de error del backend,
 * debe ser utilizado en paginas renderizadas en el navegador(use client)
 */
export const responseErrorFrontend = <T>(response: T | ResponseErrorNext) => {
  /* manejar error del backend y mostrar mensaje */
  if (typeof response == "object" && "error" in response!)
    return toast.error(messageErrorApi(response));

  return response as T;
}

/**De haber un error lanzara un error en nextjs, que se renderizará en la pantalla de error
 * debe ser utilizado en paginas renderizadas en el servidor(use server)
 */
export const responseErrorServer = <T>(response: T | ResponseErrorNext) => {
  if (typeof response == "object" && "error" in response!)
    throw new ErrorFromApi("error", {
      status: response.error.status,
      data: { errors: {}, message: response.error.message },
    });
  return response as T;
}