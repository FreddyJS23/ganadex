import { z } from "./configInitZod";

export const assignmentNumberBullCalfShema = z.object({
  numero: z.number().gte(1).lte(32767),
});
