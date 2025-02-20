import { z } from './configInitZod';

const regexDate =
    /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;

const toroIdShema=z.object({
    toro_id: z.string().regex(/\d/),
})

const pajuelaToroIdShema=z.object({
    pajuela_toro_id: z.string().regex(/\d/),
})

const createServeShema = z.object({
    observacion: z.string().min(3).max(255),
    tipo: z.enum(['monta', 'inseminacion']),
    fecha: z.string().regex(regexDate),
}).refine((data) => new Date(data.fecha) <= new Date(), {
    message: 'La fecha no puede ser mas alta que la fecha actual',
    path: ['fecha'],
});


export const createServeShemaWithToroId=createServeShema.and(toroIdShema);
export const createServeShemaWithPajuelaToroId=createServeShema.and(pajuelaToroIdShema);
