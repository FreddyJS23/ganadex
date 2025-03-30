import { z } from "zod";


const weightsBaseShema = z.object({
    peso_nacimiento: z.number().optional(),
    peso_destete: z.number().optional(),
    peso_actual: z.number().optional(),
})

const weightsBaseWith2yearShema = z.object({
    peso_2year: z.number().optional(),
}) 


export const weightsShema=weightsBaseShema.refine(
    ({ peso_nacimiento, peso_destete }) =>
        peso_destete && peso_nacimiento && peso_nacimiento >= 1
            ? peso_nacimiento <= peso_destete
            : true,
    {
        message:
            'El peso nacimiento no puede ser mayor que el peso destete',
        path: ['peso_nacimiento'],
    },
).refine(
    ({ peso_nacimiento, peso_actual }) =>
        peso_actual && peso_nacimiento && peso_nacimiento >= 1
            ? peso_nacimiento <= peso_actual
            : true,
    {
        message: 'El peso nacimiento no puede ser mayor que el peso actual',
        path: ['peso_nacimiento'],
    },
).refine(
    ({ peso_destete, peso_actual }) =>
        peso_destete && peso_actual && peso_destete >= 1
            ? peso_destete < peso_actual
            : true,
    {
        message: 'El peso destete no puede ser mayor que el peso actual',
        path: ['peso_destete'],
    },
)


export const weightsWith2yearShema = weightsShema.and(weightsBaseWith2yearShema).refine(
    ({ peso_nacimiento, peso_2year }) =>
        peso_2year && peso_nacimiento && peso_nacimiento >= 1
            ? peso_nacimiento <= peso_2year
            : true,
    {
        message:
            'El peso nacimiento no puede ser mayor que el peso de dos años',
        path: ['peso_nacimiento'],
    },
).refine(
    ({ peso_destete, peso_2year }) =>
        peso_destete && peso_2year && peso_destete >= 1
            ? peso_destete < peso_2year
            : true,
    {
        message:
            'El peso destete no puede ser mayor que el peso de dos año',
        path: ['peso_destete'],
    },
).refine(
    ({ peso_2year, peso_actual }) =>
        peso_2year && peso_actual && peso_2year >= 1
            ? peso_2year < peso_actual :
            { 
                message:
            'El peso de dos años no puede ser mayor que el peso actual',
        path: ['peso_2year'],
            }
)