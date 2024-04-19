import { z } from './configInitZod';

export const createCustomerShema = z.object({
    causa: z.string().min(3).max(3),
    numero_ganado: z.number().gte(1).lte(32767),
});
