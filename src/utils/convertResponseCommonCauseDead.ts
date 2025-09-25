import { CausaFrecuente } from "@/types/dashboard";

/**Dividir los datos de causas frecuentes y la cantidad de muertes por causa frecuente*/
export const getCommonCausesDeadAndTotalDead = (
  causesDead: CausaFrecuente[],
) => {
  const causeDead: Array<string> = [];
  const totalDead: number[] = [];

  causesDead.forEach((dead) => {
    const cause = Object.values(dead)[1] as string;
    const total = Object.values(dead)[0] as number;

    causeDead.push(cause);
    totalDead.push(total);
  });

  return { causeDead, totalDead };
};
