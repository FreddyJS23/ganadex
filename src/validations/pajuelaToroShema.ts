import { z } from './configInitZod';

const regexDate =
    /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;


export const createPajuelaToroSchema = z.object({
    codigo: z.string().min(3).max(255).toUpperCase(),
    descripcion: z.string().max(255),
    fecha: z.string().regex(regexDate),
}).refine((data) => new Date(data.fecha) <= new Date(), {
    message: 'La fecha no puede ser mas alta que la fecha actual',
    path: ['fecha'],
});
