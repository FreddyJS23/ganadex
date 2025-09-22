import { useThemeStore } from "@/stores/themeStore";
import { ResponseResumenNatalidad } from "@/types";
import { optionChartLinePartosTotales } from "@/utils/configCharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { ChartJSOrUndefined } from "node_modules/react-chartjs-2/dist/types";
import { ForwardedRef, forwardRef } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type PartosUltimos5AñosProps = {
  nacimientos_ultimos_5_año: ResponseResumenNatalidad["nacimientos_ultimos_5_año"];
};

const PartosUltimos5AñosLinea = forwardRef(function (
  { nacimientos_ultimos_5_año }: PartosUltimos5AñosProps,
  ref: ForwardedRef<ChartJSOrUndefined<"line">>,
) {
  const extraerDatosUltimosAños = (
    nacimientos_ultimos_5_año: ResponseResumenNatalidad["nacimientos_ultimos_5_año"],
  ) => {
    const years: string[] = [];
    const partos: number[] = [];
    //extraer datos para rellenar gráfico
    nacimientos_ultimos_5_año.forEach(({ año, partos_producidos }) => {
      years.push(año);
      partos.push(partos_producidos);
    });
    return { years, partos };
  };

  const { partos, years } = extraerDatosUltimosAños(nacimientos_ultimos_5_año);

  const darkMode = useThemeStore((state) => state.darkMode);

  const dataLine: ChartData<"line"> = {
    labels: years,
    datasets: [
      {
        label: "Partos",
        data: partos,
      },
    ],
  };

  return (
    <>
      {/* gráfico */}
      <Line
        ref={ref}
        options={optionChartLinePartosTotales(darkMode)}
        data={dataLine}
      />
    </>
  );
});

PartosUltimos5AñosLinea.displayName = "PartosUltimos5Años";

export { PartosUltimos5AñosLinea };
