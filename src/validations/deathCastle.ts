import { z } from './configInitZod';

export const createDeathCastleShema = z.object({
    causa: z.string().min(3).max(255),
});
