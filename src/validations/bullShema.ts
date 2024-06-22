import { z } from './configInitZod';

/* Format dd/mm/yyyy o dd-mm-yyyy */
const regexDate = /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;

export const createBullShema = z.object({
    nombre: z.string().min(3).max(255),
    numero: z.number().gte(1).lte(32767),
    origen: z.string(),
    tipo_id: z.number({
        coerce: true,
        invalid_type_error: 'Elija una opción valida',
    }),
    fecha_nacimiento: z.string().regex(regexDate),
    peso_nacimiento: z.number().optional(),
    peso_destete: z.number().optional(),
    peso_2year: z.number().optional(),
    peso_actual: z.number().optional(),
});
