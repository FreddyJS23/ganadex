import { z } from "./configInitZod";
import { createDeathCastleShemaInOthersForm } from "./deathCastle";
import { createSaleCattleShemaInOthersForm } from "./saleCattle";

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
    peso_nacimiento: z.number().optional(),
    peso_destete: z.number().optional(),
    peso_2year: z.number().optional(),
    peso_actual: z.number().optional(),
  })
  .refine(
    ({ peso_nacimiento, peso_destete }) =>
      peso_destete && peso_nacimiento && peso_nacimiento >= 1
        ? peso_nacimiento <= peso_destete
        : true,
    {
      message: "El peso nacimiento no puede ser mayor que el peso destete",
      path: ["peso_nacimiento"],
    },
  )
  .refine(
    ({ peso_nacimiento, peso_2year }) =>
      peso_2year && peso_nacimiento && peso_nacimiento >= 1
        ? peso_nacimiento <= peso_2year
        : true,
    {
      message: "El peso nacimiento no puede ser mayor que el peso de dos años",
      path: ["peso_nacimiento"],
    },
  )
  .refine(
    ({ peso_nacimiento, peso_actual }) =>
      peso_actual && peso_nacimiento && peso_nacimiento >= 1
        ? peso_nacimiento <= peso_actual
        : true,
    {
      message: "El peso nacimiento no puede ser mayor que el peso actual",
      path: ["peso_nacimiento"],
    },
  )
  .refine(
    ({ peso_destete, peso_2year }) =>
      peso_destete && peso_2year && peso_destete >= 1
        ? peso_destete < peso_2year
        : true,
    {
      message: "El peso destete no puede ser mayor que el peso de dos año",
      path: ["peso_destete"],
    },
  )
  .refine(
    ({ peso_destete, peso_actual }) =>
      peso_destete && peso_actual && peso_destete >= 1
        ? peso_destete < peso_actual
        : true,
    {
      message: "El peso destete no puede ser mayor que el peso actual",
      path: ["peso_destete"],
    },
  )
  .refine(
    ({ peso_2year, peso_actual }) =>
      peso_2year && peso_actual && peso_2year >= 1
        ? peso_2year < peso_actual
        : true,
    {
      message: "El peso de dos años no puede ser mayor que el peso actual",
      path: ["peso_2year"],
    },
  )
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
