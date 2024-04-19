import { z } from './configInitZod';

export const createBirthShema = z.object({
    observacion: z.string().min(3).max(3),
    nombre: z.number(),
    numero: z.number().gte(1).lte(32767),
    sexo: z.enum(['H', 'M']),
    peso_nacimiento: z.string().regex(/^\d+(\.\d+)?KG$/),
    personal_id: z.number(),
});
