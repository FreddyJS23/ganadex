import { z } from "./configInitZod";
/* Format dd/mm/yyyy o dd-mm-yyyy */
const regexDate =
  /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;

export const rangeDatesToReportsShema = z
  .object({
    start: z.string().regex(regexDate),
    end: z.string().regex(regexDate),
  })
  .refine((data) => new Date(data.start) < new Date(data.end), {
    message: "La fecha fin no puede ser mas alta que la fecha de inicio",
    path: ["end"],
  })
  .refine((data) => new Date(data.end) <= new Date(), {
    message: "La fecha fin no puede ser mas alta que la fecha actual",
    path: ["end"],
  });
