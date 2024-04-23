import { z } from './configInitZod';

export const createCustomerShema = z.object({
    nombre: z.string().min(3).max(3),
});
