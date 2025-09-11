import { z } from "./configInitZod";
import { createDeathCastleShemaInOthersForm } from "./deathCastle";
import { createSaleCattleShemaInOthersForm } from "./saleCattle";
import { weightsWith2yearShema } from "./weightsShema";
/* Format dd/mm/yyyy o dd-mm-yyyy */

export const castleShema = z
  .object({
    nombre: z.string().min(3).max(255),
    numero: z.number().gte(1).lte(32767),
    origen_id: z.number({
      coerce: true,
      invalid_type_error: "Elija una opción valida",
    }),
    fecha_ingreso: z.string().optional(),
    tipo_id: z.number({
      coerce: true,
      invalid_type_error: "Elija una opción valida",
    }),
    fecha_nacimiento: z.string().optional(),

    estado_id: z.string().array(),
  })
  .and(weightsWith2yearShema)
  .refine((data) => new Date(data.fecha_nacimiento as string) <= new Date(), {
    message: "La fecha de nacimiento no puede ser mas alta que la fecha actual",
    path: ["fecha_nacimiento"],
  });

export const castleShemaWithSale = castleShema.and(
  createSaleCattleShemaInOthersForm,
);
export const castleShemaWitDeath = castleShema.and(
  createDeathCastleShemaInOthersForm,
);

export const castleEditShema = z.object({
  nombre: z.string().min(3).max(255),
  numero: z.number().gte(1).lte(32767),
  origen_id: z.number({
    coerce: true,
    invalid_type_error: "Elija una opción valida",
  }),
  fecha_ingreso: z.string().optional().nullable(),
  fecha_nacimiento: z.string().optional(),
});
