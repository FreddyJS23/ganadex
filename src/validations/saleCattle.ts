import { z } from './configInitZod';

export const createSaleCattleShema = z.object({
    precio: z.number(),
    comprador_id: z.string().regex(/\d/),
});
