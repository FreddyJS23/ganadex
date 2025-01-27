import { z } from './configInitZod';

export const updateUserShema = z
    .object({
        usuario: z.string().max(15).min(3),
        password: z.string().max(15).min(3),
        password2: z.string().max(15).min(3),
    })
    .refine((data) => data.password === data.password2, {
        message: 'Las contraseñas deben coincidir',
        path: ['password2'],
    });
