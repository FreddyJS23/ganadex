import { z } from "./configInitZod";
import { createDeathCastleShemaInOthersForm } from "./deathCastle";
import { createSaleCattleShemaInOthersForm } from "./saleCattle";
import { weightsWith2yearShema } from "./weightsShema";

/* Format dd/mm/yyyy o dd-mm-yyyy */
const regexDate =
  /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;

export const createBullShema = z
  .object({
    nombre: z.string().min(3).max(255),
    numero: z.number().gte(1).lte(32767),
    estado_id: z.string().array(),
    origen_id: z.number({
      coerce: true,
      invalid_type_error: "Elija una opción valida",
    }),
    fecha_ingreso: z.string().optional(),
    tipo_id: z.number({
      coerce: true,
      invalid_type_error: "Elija una opción valida",
    }),
    fecha_nacimiento: z.string().regex(regexDate),
  })
  .and(weightsWith2yearShema)
  .refine((data) => new Date(data.fecha_nacimiento as string) <= new Date(), {
    message: "La fecha de nacimiento no puede ser mas alta que la fecha actual",
    path: ["fecha_nacimiento"],
  });
export const bullShemaWithSale = createBullShema.and(
  createSaleCattleShemaInOthersForm,
);
export const bullShemaWitDeath = createBullShema.and(
  createDeathCastleShemaInOthersForm,
);
