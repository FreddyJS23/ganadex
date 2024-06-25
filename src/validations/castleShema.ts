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
    })
    .refine(({peso_nacimiento,peso_destete}) =>peso_destete  && peso_nacimiento &&  peso_nacimiento  <= peso_destete,
    {message:'El peso nacimiento no puede ser mayor que el peso destete',
    path:['peso_nacimiento']})
    .refine(({peso_nacimiento,peso_2year}) =>peso_2year  && peso_nacimiento &&  peso_nacimiento  <= peso_2year,
    {message:'El peso nacimiento no puede ser mayor que el peso de dos años',
    path:['peso_nacimiento']})
    .refine(({peso_nacimiento,peso_actual}) =>peso_actual  && peso_nacimiento &&  peso_nacimiento  <= peso_actual,
    {message:'El peso nacimiento no puede ser mayor que el peso actual',
    path:['peso_nacimiento']})
    .refine(({peso_destete,peso_2year}) =>peso_destete  && peso_2year &&  peso_destete  < peso_2year,{message:'El peso destete no puede ser mayor que el peso de dos año',path:['peso_destete']})
    .refine(({peso_destete,peso_actual}) =>peso_destete  && peso_actual &&  peso_destete  < peso_actual,{message:'El peso destete no puede ser mayor que el peso actual',path:['peso_destete']})
    .refine(({peso_2year,peso_actual}) =>peso_2year  && peso_actual &&  peso_2year  < peso_actual,{message:'El peso de dos años no puede ser mayor que el peso actual',path:['peso_2year']})
    .refine(({peso_destete,peso_nacimiento,peso_2year,peso_actual}) =>peso_2year  && peso_actual &&  peso_nacimiento && peso_destete &&
     peso_actual > peso_nacimiento &&
     peso_actual > peso_destete && 
     peso_actual > peso_2year,
     {message:'El peso actual no puede ser menor a los anteriores pesos',path:['peso_actual']})
