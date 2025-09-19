"use serve";

import {
  DayVaccination,
  ResponseErrorNext,
  ResponsePlanSanitario,
} from "@/types";
import { CreateVaccinacionDay } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createVaccinationDay(
  formData: CreateVaccinacionDay,
): Promise<DayVaccination | ResponseErrorNext> {
  const response = await submitForm<CreateVaccinacionDay, ResponsePlanSanitario>(
   {endPoint: "planesSanitario",
    data:formData,}
  );
  if ("error" in response) return response;
  else return response.plan_sanitario;
}
