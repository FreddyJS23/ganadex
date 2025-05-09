import { useThemeStore } from "@/stores/themeStore";
import { ResponseResumenNatalidad } from "@/types";
import {
  optionChartBarTasaNatalidad,
  paletteBackground,
  paletteBorderColor,
} from "@/utils/configCharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartData,
  BarElement,
} from "chart.js";
import { ForwardedRef, forwardRef } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
type NatalidadUltimos5AñosProps = {
  nacimientos_ultimos_5_año: ResponseResumenNatalidad["nacimientos_ultimos_5_año"];
};

const NatalidadUltimos5AñosBarra = forwardRef(function (
  { nacimientos_ultimos_5_año }: NatalidadUltimos5AñosProps,
  ref: ForwardedRef<ChartJS<"bar">>,
) {
  const extraerDatosUltimosAños = (
    nacimientos_ultimos_5_año: ResponseResumenNatalidad["nacimientos_ultimos_5_año"],
  ) => {
    const years: string[] = [];
    const natalidad: number[] = [];
    //extrarer datos para rellenar grafico
    nacimientos_ultimos_5_año.forEach(({ año, tasa_natalidad }) => {
      years.push(año);
      natalidad.push(tasa_natalidad);
    });
    return { years, natalidad };
  };

  const { years, natalidad } = extraerDatosUltimosAños(
    nacimientos_ultimos_5_año,
  );

  const darkMode = useThemeStore((state) => state.darkMode);

  const dataBar: ChartData<"bar"> = {
    labels: years,
    datasets: [
      {
        label: "Tasa de natalidad ultimos 5 años",
        data: natalidad,
        backgroundColor: paletteBackground,
        borderColor: paletteBorderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {/* gráfico */}
      <Bar ref={ref} options={optionChartBarTasaNatalidad(darkMode)} data={dataBar} />
    </>
  );
});

NatalidadUltimos5AñosBarra.displayName = "NatalidadUltimos5AñosBarra";

export { NatalidadUltimos5AñosBarra };
