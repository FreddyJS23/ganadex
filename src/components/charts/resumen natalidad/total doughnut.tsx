import { ResponseResumenNatalidad } from "@/types";
import {
  optionChartDoughnutCantidadNacimientos,
  paletteBackground,
} from "@/utils/configCharts";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ChartData,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ForwardedRef, forwardRef } from "react";
import { useThemeStore } from "@/stores/themeStore";
import { LETTER_BLACK, LETTER_WHITE } from "@/constants/colorLetters";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  annotationPlugin,
  ChartDataLabels,
);

type TotalNacimientosAñoActualTortaProps = {
  nacimientos_año_actual: ResponseResumenNatalidad["nacimientos_año_actual"];
};
const TotalNacimientosAñoActualTorta = forwardRef(function (
  { nacimientos_año_actual }: TotalNacimientosAñoActualTortaProps,
  ref: ForwardedRef<ChartJS<"doughnut">>,
) {
  const datasDoughnut: ChartData<"doughnut", number[]> = {
    labels: ["Hembras", "Machos"],
    datasets: [
      {
        label: "Total",
        data: [nacimientos_año_actual.hembras, nacimientos_año_actual.machos],
        backgroundColor: paletteBackground,
      },
    ],
  };

  const totalPartos: number =
    nacimientos_año_actual.hembras + nacimientos_año_actual.machos;

  const darkMode = useThemeStore((state) => state.darkMode);

  const configAnotation = {
    annotation: {
      //plugin anotaciones
      annotations: {
        dLabel: {
          type: "doughnutLabel",
          content: ["Total", !isNaN(totalPartos) ? totalPartos : 0],
          font: [
            { size: 20, weight: "bold" },
            { size: 18, weight: "normal" },
          ],
          color: darkMode ? LETTER_WHITE : LETTER_BLACK,
        },
      },
    },
  };

  const optionsChart = optionChartDoughnutCantidadNacimientos(darkMode);

  //destructurar options
  //primero se destructura el objeto de opciones
  //luego se crear un nuevo objecto con la propiedad plugins
  //se destructora el objeto de plugins
  //y se añade el plugin anotaciones
  const options = {
    ...optionsChart,
    plugins: {
      ...optionsChart.plugins,
      ...configAnotation,
    },
  };

  return <Doughnut ref={ref} options={options} data={datasDoughnut} />;
});
//al colocar el forwardRef en el componente se asegura que el componente  el linter queda con warin de display name
TotalNacimientosAñoActualTorta.displayName = "TotalNacimientosAñoActualTorta";

export { TotalNacimientosAñoActualTorta };
