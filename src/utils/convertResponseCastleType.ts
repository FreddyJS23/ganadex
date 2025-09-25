import { TypesCattle } from "@/types";
import { TotalTiposGanado } from "@/types/dashboard";

/** Dividir los tipos de ganado y la cantidad de tipos por tipo de ganado
 * para el gráfico de torta
 */
export const getCastleType = (totalTypesCattle: TotalTiposGanado[]) => {
  const typesCattle: Array<keyof typeof TypesCattle> = [];
  const numberTypes: number[] = [];

  totalTypesCattle.forEach((typeCattle) => {
    const type = Object.keys(typeCattle)[0] as keyof typeof TypesCattle;
    const value = Object.values(typeCattle)[0];

    typesCattle.push(type);
    numberTypes.push(value);
  });

  return { typesCattle, numberTypes };
};
