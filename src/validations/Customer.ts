import { z } from "./configInitZod";

export const createCustomerShema = z.object({
  nombre: z
    .string()
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1/\sa-zA-ZÀ-ÿ\u00f1\u00d1]{3,30}$/)
    .min(3)
    .max(30),
});
