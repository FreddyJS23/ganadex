import { z } from './configInitZod';

export const castleShema = z.object({
    nombre: z.string().min(3).max(255),
    numero:  z.number().gte(1).lte(32767),
    origen:  z.string().min(3).max(255),
    sexo: z.enum(['H', 'M']),
    tipo_id: z.number(),
    fecha_nacimiento: z.date(),
    peso_nacimiento: z.string().regex(/^\d+(\.\d+)?KG$/),
    peso_destete: z.string().regex(/^\d+(\.\d+)?KG$/),
    peso_2year: z.string().regex(/^\d+(\.\d+)?KG$/),
    peso_actual: z.string().regex(/^\d+(\.\d+)?KG$/),
    estado_id: z.array(z.number()),
    fecha_defuncion: z.string(),
    causa_defuncion: z.string().max(255),
});
