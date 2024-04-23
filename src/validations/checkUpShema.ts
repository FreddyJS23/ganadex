import { z } from './configInitZod';

export const createCheckUpShema = z.object({
    diagnostico: z.string().min(3).max(255),
    tratamiento: z.string().min(3).max(255),
    personal_id: z.number(),
});
