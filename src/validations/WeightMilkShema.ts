import { z } from './configInitZod';

export const createWeightMilkShema = z.object({
    peso_leche: z.number().gte(1).lte(32767),
});
