"use serve";

import { ResponseErrorNext } from "@/types";
import { CreateAssigmentNumberBullCalf } from "@/types/forms";
import { getData } from "@/utils/getData";

export async function assignmentNumberBullCalf(
  formData: CreateAssigmentNumberBullCalf,
  id: number,
): Promise<void | ResponseErrorNext> {
  const response = await getData<CreateAssigmentNumberBullCalf, number>(
    "asignarNumeroCria",
    "POST",
    formData,
    id,
  );

  if (typeof response == "object" && "error" in response) return response;
}
