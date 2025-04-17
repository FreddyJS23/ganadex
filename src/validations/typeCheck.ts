import { z } from "./configInitZod";

export const createTypeCheckShema = z.object({
  tipo: z.string().min(3).max(255),
  codigo: z.string().min(1).max(10),
});
