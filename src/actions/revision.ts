"use serve";

import { ResponseErrorNext } from "@/types";
import { CreateCheckUp, EditCheckUp} from "@/types/forms";
import { getData } from "@/utils/getData";

export async function createCheckUp(
  formData: CreateCheckUp,
  id: number,
): Promise<void | ResponseErrorNext> {
  const response = await getData<CreateCheckUp, void>(
    "ganado",
    "POST",
    formData,
    id,
    "revision",
  );

  if (typeof response == "object" && "error" in response) return response;
  else {
    return;
  }
}


export async function editCheckUp(
  idRevision: number,
  formData: EditCheckUp,
  id: number,
): Promise<void | ResponseErrorNext> {
  const response = await getData<EditCheckUp, void>(
    "ganado",
    "PUT",
    formData,
    id,
    "revision",
    idRevision,
  );

  if (typeof response == "object" && "error" in response) return response;
  else {
    return;
  }
}
