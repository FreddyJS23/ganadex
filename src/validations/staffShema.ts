import { z } from './configInitZod';

/* Format dd/mm/yyyy o dd-mm-yyyy */
const regexDate = /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;


export const createStaffShema = z.object({
    ci: z.number().gt(1000000).lte(99999999),
    nombre: z.string().min(3).max(255),
    apellido: z.string().min(3).max(255),
    fecha_nacimiento: z.string().regex(regexDate),
    telefono: z.string().regex(/^\d{4}-\d{7,7}$/),
    cargo_id:z.string().regex(/\d/),
});
