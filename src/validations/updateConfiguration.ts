import { z } from './configInitZod';

export const updateConfigurationShema = z.object({
    peso_servicio: z.number().gte(1).lte(32767),
    dias_evento_notificacion: z.number().gte(1).lte(32767),
    dias_diferencia_vacuna: z.number().gte(1).lte(32767),
})
;
