import { vacaProductora } from "@/types/dashboard";

/** Dividir los datos de produccion de leche y el numero de la vaca para gráfico de top 3 produccion
 * para el gráfico de top 3 produccion de leche */
export const getTopProductionCastle = (
  topProductionCatle: vacaProductora[],
) => {
  const catle: string[] = [];
  const production: number[] = [];

  topProductionCatle.forEach(({ ganado, peso_leche }) => {
    catle.push(`vaca ${ganado.numero}`);
    production.push(peso_leche);
  });

  return { catle, production };
};
