import { z } from './configInitZod';

export const createWeightMilkShema = z.object({
    peso_leche: z.number().min(3).max(6),
   
});
