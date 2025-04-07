import { z } from "./configInitZod";

export const createUserShema = z
  .object({
    nombre: z.string().max(15).min(3),
    apellido: z.string().max(15).min(3),
    usuario: z.string().max(15).min(3),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(15, "La contraseña no puede exceder los 15 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una minúscula")
      .regex(/[0-9]/, "Debe contener al menos un número")
      .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial")
      .trim(),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Las contraseñas deben coincidir",
    path: ["password2"],
  });
