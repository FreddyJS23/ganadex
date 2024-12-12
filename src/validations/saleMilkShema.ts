import { z } from './configInitZod';

const regexDate =
    /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;


export const createSaleMilkShema = z.object({
    cantidad: z.number(),
    precio_id: z.string().regex(/\d/),
    fecha: z.string().regex(regexDate),
}).refine((data) => new Date(data.fecha) <= new Date(), {
    message: 'La fecha no puede ser mas alta que la fecha actual',
    path: ['fecha'],
});
