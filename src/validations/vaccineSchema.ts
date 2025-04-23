import { z } from "./configInitZod";

export const createVaccineSchema = z.object({
  nombre: z.string().min(3).max(255),
  intervalo_dosis: z.number().gte(1).lte(32767),
  dosis_recomendada_anual: z.number().gte(1).lte(32767).optional().nullable().transform((value) => value ?? null),
  tipo_vacuna: z.enum(["medica", "plan_sanitario"]),
  aplicable_a_todos: z.boolean(),
  tipo_ganados: z.array(
    z.object({
      ganado_tipo_id: z.number(),
      sexo: z.enum(["H", "M"]),
    }),
  ).optional(),
});
