"use serve";

import {
  ListaVacunas,
  Pesos,
  ResponseErrorNext,
  ResponseGanado,
} from "@/types";
import { CreateCastle, EditCastle, updateWeight } from "@/types/forms";
import { getData } from "@/utils/getData";

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

  const response = await getData<
    CreateCastle & { vacunas: vacunasSinId[] },
    ResponseGanado
  >("ganado", "POST", { ...formData, vacunas });
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
  const response = await getData<EditCastle, ResponseGanado>(
    "ganado",
    "PUT",
    formData,
    id,
  );
  if ("error" in response) return response;
  else return response.ganado.numero ?? response.ganado.nombre;
}

export async function updateWeightCastle(
  id: number,
  formData: updateWeight,
): Promise<Pesos | ResponseErrorNext> {
  const response = await getData<updateWeight, ResponseGanado>(
    "ganado",
    "PUT",
    formData,
    id,
  );
  if ("error" in response) return response;
  else return response.ganado.pesos!;
}
