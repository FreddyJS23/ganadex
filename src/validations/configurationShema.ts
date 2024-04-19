import { z } from './configInitZod';

export const createStaffShema = z.object({
    moneda: z.string().min(1).max(1),
});
