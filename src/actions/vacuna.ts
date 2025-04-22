"use serve";

import { getData } from "@/utils/getData";
import { AvailableVaccines, ResponseErrorNext } from "@/types";
import { vaccineSchema } from "@/validations/vaccineSchema";

type CreateVaccine = {
  nombre: string;
  intervalo_dosis: number;
  dosis_recomendada_anual: number | null;
  tipo_vacuna: "medica" | "plan_sanitario";
  aplicable_a_todos: boolean;
  tipo_ganados: { id: number; sexo: "H" | "M" }[];
};

export async function createVaccine(
  formData: CreateVaccine,
): Promise<AvailableVaccines | ResponseErrorNext> {

  // Enviar los datos al backend
  const response = await getData<CreateVaccine, { vacuna:AvailableVaccines }>(
    "vacuna",
    "POST",
    formData,
  );

  if ("error" in response) return response;
  return response.vacuna;
}
