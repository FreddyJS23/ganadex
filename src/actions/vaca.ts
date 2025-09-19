"use serve";

import {
  ListaVacunas,
  Pesos,
  ResponseErrorNext,
  ResponseGanado,
} from "@/types";
import { CreateCastle, EditCastle, updateWeight } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

type vacunasSinId = Omit<ListaVacunas, "id">;

export async function createCastle(
  formData: CreateCastle,
  listVaccines: ListaVacunas[],
): Promise<
  | ResponseErrorNext
  | ResponseGanado["ganado"]["numero"]
  | ResponseGanado["ganado"]["nombre"]
> {
  //en esta destructuracion se saca el id y se utiliza el resto del objecto
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vacunas = listVaccines.map(({ id, ...rest }) => ({ ...rest }));

  const response = await submitForm<
    CreateCastle & { vacunas: vacunasSinId[] },
    ResponseGanado
  >({endPoint:"ganado", data:{ ...formData, vacunas }});
  if ("error" in response) return response;
  else return response.ganado.numero ?? response.ganado.nombre;
}

export async function editCastle(
  id: number,
  formData: EditCastle,
): Promise<
  | ResponseErrorNext
  | ResponseGanado["ganado"]["numero"]
  | ResponseGanado["ganado"]["nombre"]
> {
  const response = await submitForm<EditCastle, ResponseGanado>(
  {endPoint:  "ganado",
    method:"PUT",
    data:formData,
    id,}
  );
  if ("error" in response) return response;
  else return response.ganado.numero ?? response.ganado.nombre;
}

export async function updateWeightCastle(
  id: number,
  formData: updateWeight,
): Promise<Pesos | ResponseErrorNext> {
  const response = await submitForm<updateWeight, ResponseGanado>(
  {endPoint:  "ganado",
    method:"PUT",
    data:formData,
    id,}
  );
  if ("error" in response) return response;
  else return response.ganado.pesos!;
}
