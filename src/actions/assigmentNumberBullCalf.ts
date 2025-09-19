"use serve";

import { ResponseErrorNext } from "@/types";
import { CreateAssigmentNumberBullCalf } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function assignmentNumberBullCalf(
  formData: CreateAssigmentNumberBullCalf,
  id: number,
): Promise<void | ResponseErrorNext> {
  const response = await submitForm<CreateAssigmentNumberBullCalf, number>(
 { endPoint:  "asignarNumeroCria",
   data:formData,
     id:id,
    }
  );

  if (typeof response == "object" && "error" in response) return response;
}
