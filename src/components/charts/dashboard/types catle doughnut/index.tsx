"use client";

import { ResponseTotalTiposGanado } from "@/types/dashboard";
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
  ChartOptions,
  Chart,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { useThemeStore } from "@/stores/themeStore";
import { LETTER_BLACK, LETTER_WHITE } from "@/constants/colorLetters";

ChartJS.register(ArcElement, Tooltip, Legend, annotationPlugin);

export const TortaTipoGanado = ({
  total_tipos_ganado,
}: ResponseTotalTiposGanado) => {
  const { numberTypes, typesCattle } = getCastleType(total_tipos_ganado);

 
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

  const darkMode = useThemeStore((state) => state.darkMode);

  const configAnotation = {
    annotation: {
     //plugin anotaciones
     annotations: {
      type: "doughnutLabel", 
      content: ({ chart }:{chart:Chart}) => ["Total", chart.getDatasetMeta(0)],
          font: [
            { size: 20, weight: "bold" },
            { size: 18, weight: "normal" },
          ],
          color: darkMode ? LETTER_WHITE : LETTER_BLACK,
        
      },
    },
  };

  const optionChart = optionChartTotalTypesCattle(darkMode);
  //destructurar options
  //primero se destructura el objeto de opciones
  //luego se crear un nuevo objecto con la propiedad plugins
  //se destructora el objeto de plugins
  //y se añade el plugin anotaciones
  const options = {
    ...optionChart,
    plugins: { ...optionChart.plugins, ...configAnotation },
  };

  return <Doughnut data={datasets} options={options as ChartOptions<"doughnut">} />;
};
