import { z } from './configInitZod';

export const createBullshema = z.object({
    numero: z.number().gte(1).lte(32767),
});
