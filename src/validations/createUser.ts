import { z } from './configInitZod';

export const createUserShema = z.object({
    nombre: z.string().max(15).min(3),
    apellido: z.string().max(15).min(3),
    usuario: z.string().max(15).min(3),
    correo: z.string().email(),
    password: z.string().max(15).min(3),
    password2: z.string().max(15).min(3),
}).refine((data)=>
    data.password === data.password2,{message:'Las contraseñas deben coincidir',path:['password2']});
