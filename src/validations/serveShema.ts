import { z } from './configInitZod';

export const createServeShema = z.object({
    observacion: z.string().min(3).max(255),
    numero_toro: z.number(),
    tipo: z.string(),
    personal_id: z.number(),
});
