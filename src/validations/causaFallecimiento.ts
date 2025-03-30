import { z } from "./configInitZod";

export const createCausaFallecimientoShema = z.object({
  causa: z.string().min(3).max(255),
});
