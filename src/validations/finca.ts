import { z } from './configInitZod';

export const createFincaShema = z.object({
    nombre: z
        .string()
        .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1/\sa-zA-ZÀ-ÿ\u00f1\u00d1]{3,30}$/,'Solo se permiten letras')
        .min(3)
        .max(30),
});
