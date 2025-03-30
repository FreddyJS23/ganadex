import { z } from "./configInitZod";

export const createSupplyShema = z.object({
  insumo: z.string().min(3).max(255),
  cantidad: z.number().gte(1).lte(999),
  precio: z.number(),
});
