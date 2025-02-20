import { inputPersonalIdShema } from './checkUpShema';
import { z } from './configInitZod';

const regexDate =
    /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;

export const createBaseBirthShema = z.object({
    observacion: z.string().min(3).max(255),
    nombre: z.string().min(3).max(255),
    numero: z.number().gte(1).lte(32767),
    sexo: z.enum(['H', 'M']),
    peso_nacimiento: z.number().optional(),
    fecha: z.string().regex(regexDate),
}).refine((data) => new Date(data.fecha) <= new Date(), {
    message: 'La fecha no puede ser mas alta que la fecha actual',
    path: ['fecha'],
});;

export const createAdminBirthShema = createBaseBirthShema.and(inputPersonalIdShema);
