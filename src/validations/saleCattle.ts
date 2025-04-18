import { z } from "./configInitZod";

const regexDate =
  /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;

const dateValidation = z
  .object({
    fecha: z.string().regex(regexDate),
  })
  .refine((data) => new Date(data.fecha) <= new Date(), {
    message: "La fecha no puede ser mas alta que la fecha actual",
    path: ["fecha"],
  });

const dateValidationInOthersForm = z
  .object({
    fecha_venta: z.string().regex(regexDate),
  })
  .refine((data) => new Date(data.fecha_venta) <= new Date(), {
    message: "La fecha no puede ser mas alta que la fecha actual",
    path: ["fecha_venta"],
  });

const saleCattleShema = z.object({
  precio: z.number(),
  comprador_id: z.string().regex(/\d/),
});

/**validación para el form de venta */
export const createSaleCattleShema = saleCattleShema.and(dateValidation);
/**validación para el form de venta ubicado en otro formulario con otros campos */
export const createSaleCattleShemaInOthersForm = saleCattleShema.and(
  dateValidationInOthersForm,
);
