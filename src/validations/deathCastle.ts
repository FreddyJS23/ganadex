import { z } from './configInitZod';

export const createDeathCastleShema = z.object({
    causa: z.string().min(3).max(255),
    numero_ganado: z.number().gte(1).lte(32767),
});
