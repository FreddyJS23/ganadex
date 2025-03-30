import { z } from "./configInitZod";

/* Format dd/mm/yyyy o dd-mm-yyyy */
const regexDate =
  /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;

export const createVaccinationDayShema = z
  .object({
    fecha_inicio: z.string().regex(regexDate),
    fecha_fin: z.string().regex(regexDate),
    vacuna_id: z.string().regex(/\d/),
  })
  .refine((data) => new Date(data.fecha_inicio) < new Date(data.fecha_fin), {
    message: "La fecha fin no puede ser mas alta que la fecha de inicio",
    path: ["fecha_fin"],
  });
