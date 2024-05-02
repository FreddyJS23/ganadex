import { z } from './configInitZod';

export const createSaleMilkShema = z.object({
    cantidad: z.number(),
    precio_id: z.string().regex(/\d/),
});
