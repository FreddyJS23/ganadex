import { z } from './configInitZod';

/* Format dd/mm/yyyy o dd-mm-yyyy */
const regexDate = /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;

export const createBullshema = z.object({
    nombre: z.string().min(3).max(255),
    numero: z.number().gte(1).lte(32767),
    origen: z.string(),
    sexo: z.enum(['H', 'M']),
    fecha_nacimiento: z.string().regex(regexDate),
});
