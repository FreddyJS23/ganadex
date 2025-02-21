import { z } from './configInitZod';


const regexDate =
    /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;


export const createWeightMilkShema = z.object({
    peso_leche: z.number().gte(1).lte(32767),
    fecha: z.string().regex(regexDate),

});
