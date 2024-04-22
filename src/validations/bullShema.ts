import { z } from './configInitZod';

export const createBullshema = z.object({
    nombre: z.string().min(3).max(255),
    numero: z.number().gte(1).lte(32767),
    origen: z.string(),
    sexo: z.enum(['H', 'M']),
    fecha_nacimiento: z.date(),
});
