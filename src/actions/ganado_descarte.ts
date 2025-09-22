"use serve";

import {
  ListaVacunas,
  Pesos,
  ResponseErrorNext,
  ResponseGanado,
  ResponseGanadoDescarte,
} from "@/types";
import { CreateBeef, EditCastle, updateWeight } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

export async function createBeef(
  formData: CreateBeef,
  listVaccines: ListaVacunas[],
): Promise<string | number | ResponseErrorNext> {
  //en esta destructuracion se saca el id y se utiliza el resto del objecto
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vacunas = listVaccines.map(({ id, ...rest }) => ({ ...rest }));

  const response = await submitForm<CreateBeef, ResponseGanadoDescarte>({
    endPoint: "ganadoDescarte",
    data: { ...formData, vacunas },
  });

  if ("error" in response) return response;
  else
    return response.ganado_descarte.numero ?? response.ganado_descarte.nombre;
}

export async function editBeef(
  id: number,
  formData: EditCastle,
): Promise<
  | ResponseErrorNext
  | ResponseGanado["ganado"]["numero"]
  | ResponseGanado["ganado"]["nombre"]
> {
  const response = await submitForm<EditCastle, ResponseGanadoDescarte>({
    endPoint: "ganadoDescarte",
    method: "PUT",
    data: formData,
    id,
  });
  if ("error" in response) return response;
  else
    return response.ganado_descarte.numero ?? response.ganado_descarte.nombre;
}

export async function updateWeightBeef(
  id: number,
  formData: updateWeight,
): Promise<Pesos | ResponseErrorNext> {
  const response = await submitForm<updateWeight, ResponseGanadoDescarte>({
    endPoint: "ganadoDescarte",
    method: "PUT",
    data: formData,
    id,
  });
  if ("error" in response) return response;
  else return response.ganado_descarte.pesos!;
}
