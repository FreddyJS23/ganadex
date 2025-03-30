import { z } from "zod";

export const createOrUpdateResponseSecurityShema = z.object({
  respuesta: z.string().min(4).max(30),
  pregunta_seguridad_id: z.number({
    coerce: true,
    invalid_type_error: "Elija una opción valida",
  }),
});
