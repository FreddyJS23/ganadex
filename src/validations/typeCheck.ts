import { z } from './configInitZod';

export const createTypeCheckShema = z.object({
    tipo: z.string().min(3).max(255),
})