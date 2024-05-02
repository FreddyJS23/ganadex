import { z } from './configInitZod';

export const createConfigurationShema = z.object({
    moneda: z.string().min(1).max(1),
});
