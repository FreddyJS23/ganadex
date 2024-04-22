import { z } from './configInitZod';

export const createStaffShema = z.object({
    ci: z.number().min(5).max(6),
    nombre: z.string().min(3).max(255),
    apellido: z.string().min(3).max(255),
    fecha_nacimiento: z.date(),
    telefono: z.string().regex(/^\d{4}-\d{7,7}$/),
    cargo_id: z.number(),
});
