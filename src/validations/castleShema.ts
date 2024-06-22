import { z } from './configInitZod';
/* Format dd/mm/yyyy o dd-mm-yyyy */

export const castleShema = z.object({
    nombre: z.string().min(3).max(255),
    numero:  z.number().gte(1).lte(32767),
    origen:  z.string().min(3).max(255),
    tipo_id: z.number({ coerce: true,invalid_type_error:'Elija una opción valida' }),
    fecha_nacimiento: z.string().optional(),
    peso_nacimiento:z.number().optional(),
    peso_destete:z.number().optional(),
    peso_2year:z.number().optional(),
    peso_actual:z.number().optional(),
    estado_id: z.string().array(),
    fecha_fallecimiento: z.string().optional(),
    causa: z.string().max(255).optional(),
    precio: z.number().optional(),
    comprador_id: z.string().optional(),
    fecha_venta: z.string().optional(),
});
