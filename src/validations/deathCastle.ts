import { z } from './configInitZod';

const regexDate =
    /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;

    const dateValidation=z.object({
        fecha: z.string().regex(regexDate),
    }).refine((data) => new Date(data.fecha) <= new Date(), {
        message: 'La fecha no puede ser mas alta que la fecha actual',
        path: ['fecha'],
    });
    
    const dateValidationInOthersForm=z.object({
        fecha_fallecimiento: z.string().regex(regexDate),
    }).refine((data) => new Date(data.fecha_fallecimiento) <= new Date(), {
        message: 'La fecha no puede ser mas alta que la fecha actual',
        path: ['fecha_fallecimiento'],
    });

const deathCastleShema = z.object({
    causa: z.string().min(3).max(255),
});;

/**Validacion para el form de fallecimiento */
export const createDeathCastleShema = deathCastleShema.and(dateValidation)
/**Validacion para el form de fallecimiento ubicado en otro formulario con otros campos */
export const createDeathCastleShemaInOthersForm = deathCastleShema.and(dateValidationInOthersForm)