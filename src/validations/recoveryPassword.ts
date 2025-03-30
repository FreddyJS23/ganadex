import { z } from "./configInitZod";

export const userRecoveryShema = z.object({
  usuario: z.string().min(3).max(15),
});

export const recoveryPasswordShema = z
  .object({
    respuestas: z.array(
      z.object({
        respuesta: z.string().min(3).max(30),
      }),
    ),

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
