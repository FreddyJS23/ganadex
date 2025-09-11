import { z } from "./configInitZod";

const regexDate =
  /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;

export const createBaseCheckUpShema = z
  .object({
    tipo_revision_id: z.string().regex(/\d/),
    vacuna_id: z.string().regex(/\d/).optional(),
    tratamiento: z.string().min(3).max(255).optional(),
    observacion: z.string().min(3).max(255).optional(),
    proxima: z.string().regex(regexDate).optional(),
    dosis: z.number().gte(1).lte(32767).optional(),
    fecha: z.string().regex(regexDate),
    servicio_desconocido: z.boolean().optional(),
    dias_feto: z.number().gte(1).lte(100).optional(),
    toro_id: z.string().regex(/\d/),
  })
  .refine((data) => new Date(data.fecha) <= new Date(), {
    message: "La fecha no puede ser mas alta que la fecha actual",
    path: ["fecha"],
  });

export const inputPersonalIdShema = z.object({
  personal_id: z.string().regex(/\d/),
});
export const createAdminCheckUpShema =
  createBaseCheckUpShema.and(inputPersonalIdShema);

export const editCheckUpShema = z
  .object({
    fecha: z.string().regex(regexDate),
    tratamiento: z.string().min(3).max(255),
  })
  .refine((data) => new Date(data.fecha) <= new Date(), {
    message: "La fecha no puede ser mas alta que la fecha actual",
    path: ["fecha"],
  });
