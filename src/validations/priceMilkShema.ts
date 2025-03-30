import { z } from "./configInitZod";

export const createPriceMilkShema = z.object({
  precio: z.number(),
});
