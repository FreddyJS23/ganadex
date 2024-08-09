import { z } from './configInitZod';

export const createPajuelaToroSchema = z.object({
    codigo: z.string().min(3).max(255).toUpperCase(),
});
