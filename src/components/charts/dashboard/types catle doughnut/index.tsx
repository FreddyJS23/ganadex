"use client";

import { ResponseTotalTiposGanado } from "@/types/dashboard";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import {
  optionChartTotalTypesCattle,
  paletteBackground,
} from "@/utils/configCharts";
import { getCastleType } from "@/utils/convertResponseCastleType";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(ArcElement, Tooltip, Legend, annotationPlugin);

export const TortaTipoGanado = ({
  total_tipos_ganado,
}: ResponseTotalTiposGanado) => {
  const { numberTypes, typesCattle } = getCastleType(total_tipos_ganado);

  const typesCattleCapitalized = typesCattle.map((type) =>
    capitalizeFirstLetter(type),
  );

  const datasets: ChartData<"doughnut", number[]> = {
    labels: typesCattle,
    datasets: [
      {
        label: "Total",
        data: numberTypes,
        backgroundColor: paletteBackground,
      },
    ],
  };

  const darkMode =
    document && document.documentElement.classList.contains("dark");
  const letterWhite = "#e5e7eb";
  const letterBlack = "#111827";

  const configAnotation = {
    annotation: {
      //plugin anotaciones
      annotations: {
        dLabel: {
          type: "doughnutLabel",
          content: ({ chart }) => ["Total", chart.getDatasetMeta(0).total],
          font: [
            { size: 20, weight: "bold" },
            { size: 18, weight: "normal" },
          ],
          color: darkMode ? letterWhite : letterBlack,
        },
      },
    },
  };
  //destructurar options
  //primero se destructura el objeto de opciones
  //luego se crear un nuevo objecto con la propiedad plugins
  //se destructora el objeto de plugins
  //y se añade el plugin anotaciones
  const options = {
    ...optionChartTotalTypesCattle,
    plugins: { ...optionChartTotalTypesCattle.plugins, ...configAnotation },
  };

  return <Doughnut data={datasets} options={options} />;
};
