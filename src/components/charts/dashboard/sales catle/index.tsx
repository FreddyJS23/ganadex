"use client";

import { getBalanceAnnualSaleCattle } from "@/actions/getBalanceAnnualSaleCattle";
import { SelectFilterYear } from "@/components/select filter year";
import { ResponseAñosVentaGanado } from "@/types";
import {
  BalanceAnualVentaGanado,
  BalanceMensualVentaGanado,
} from "@/types/dashboard";
import {
  optionChartLineSalesCatle,
  paletteBackground,
  paletteBorderColor,
} from "@/utils/configCharts";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { ChartData } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as TooltipChart,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from "sonner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  TooltipChart,
  Legend,
);

export const SalesCatle = ({
  balance_anual,
  años_ventas_ganado,
  children,
}: BalanceAnualVentaGanado &
  ResponseAñosVentaGanado & { children: React.ReactNode }) => {
  const [dataGraph, setDataGraph] = useState(balance_anual);

  const onChange = async (select: number) => {
    const data = await getBalanceAnnualSaleCattle(select);

    /* manejar error del backend y mostrar mensaje */
    if ("error" in data!) return toast.error(messageErrorApi(data));

    setDataGraph(data);
  };

  const data: ChartData<"bar", BalanceMensualVentaGanado[]> = {
    datasets: [
      {
        data: dataGraph,
        backgroundColor: paletteBackground,
        borderColor: paletteBorderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {/* titulo */}
      <div className="flex gap-4 justify-between">
        {children}
        <div className="w-40">
          <SelectFilterYear
            type="yearsFromDB"
            onChange={onChange}
            label="Año"
            items={años_ventas_ganado}
          />
        </div>
      </div>
      {/* grafico */}
      <Bar options={optionChartLineSalesCatle} data={data} />;
    </>
  );
};
