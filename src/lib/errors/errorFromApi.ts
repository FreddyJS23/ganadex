import { ResponseErrorFromApi } from "@/types";

class ErrorFromApi extends Error {
  error: ResponseErrorFromApi;

  constructor(message: string, error: ResponseErrorFromApi) {
    super(message); // Llama al constructor de la clase Error
    this.error = error; // Agrega una propiedad personalizada
    Object.setPrototypeOf(this, ErrorFromApi.prototype); // Restaura la cadena de prototipos
  }
}

export default ErrorFromApi;
