import { z } from './configInitZod';

export const createSaleCattleShema = z.object({
    precio: z.number(),
    ganado_id: z.string().regex(/\d/),
    comprador_id: z.string().regex(/\d/),
});
