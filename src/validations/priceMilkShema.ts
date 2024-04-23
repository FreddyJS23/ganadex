import { z } from './configInitZod';

export const createBullshema = z.object({
    precio: z.number(),
});
