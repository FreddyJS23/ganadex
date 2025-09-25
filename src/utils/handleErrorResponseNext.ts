import { ResponseErrorNext } from "@/types";

/** Devolver un mensaje de error en un formato estándar para usarlo en un toast */
export const messageErrorApi = (res: ResponseErrorNext): string | null => {
  /* combrobar si es un objecto para evitar problemas de con el compilador typescript */
  if (typeof res === "object" && res !== null) {
    if ("error" in res) {
      const { message, status } = res.error;
      /* errores en los campos del formulario */
      if (status == 422) return `Error en campo: ${message}`;
      /* no existe el recurso  */ else if (status == 404)
        return "No se encontró el recurso";
      else return message;
    }
  }
  /* no existe errores en la peticion */
  return null;
};
