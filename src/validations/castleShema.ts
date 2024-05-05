import { z } from './configInitZod';
/* Format dd/mm/yyyy o dd-mm-yyyy */
const regexDate = /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;

export const castleShema = z.object({
    nombre: z.string().min(3).max(255),
    numero:  z.number().gte(1).lte(32767),
    origen:  z.string().min(3).max(255),
    sexo: z.enum(['H', 'M']),
    tipo_id: z.number({ coerce: true,invalid_type_error:'Elija una opción valida' }),
    fecha_nacimiento: z.string().regex(regexDate),
    peso_nacimiento: z.string().regex(/^\d+(\.\d+)?KG$/),
    peso_destete: z.string().regex(/^\d+(\.\d+)?KG$/),
    peso_2year: z.string().regex(/^\d+(\.\d+)?KG$/),
    peso_actual: z.string().regex(/^\d+(\.\d+)?KG$/),
    estado_id: z.string().transform((values)=>values.split(',').map((string)=>parseInt(string))),
    fecha_defuncion: z.string().regex(regexDate).optional(),
    causa_defuncion: z.string().max(255).optional(),
});
