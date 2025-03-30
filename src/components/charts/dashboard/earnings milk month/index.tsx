"use client";

import { getBalanceMonthlySaleMilk } from "@/actions/getBalanceMonthlySaleMilk";
import { SelectFilterMonth } from "@/components/select filter month";
import {
  BalanceDiarioVentaLeche,
  BalanceMensualVentaLeche,
} from "@/types/dashboard";
import { ButtonCreateItem } from "@/ui/ButtonCreate";
import { optionChartLineEarningsMilkMonth } from "@/utils/configCharts";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
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
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

export const ChartEarningsMilkMonth = ({
  balance_mensual,
  ganancias,
}: BalanceMensualVentaLeche & { ganancias: number }) => {
  /* Crear un array de objetos con la fecha de inicio y fin del mes actual 
   para que el chart tenga la fecha de inicio y fin del mes actual, al no colocar esto
   el chart solo mostrara las fechas obtenidas de la API, al ocurrir esto el chart en el eje x mostrara
   como la la ultima fecha la obtenida de la API, puediendo ser el dia 15 del mes, lo cual no tendreia sentido ya
    que debe ser un balance mensual */
  const rangeData = (month?: number): BalanceDiarioVentaLeche[] => {
    const dateNow = new Date();

    if (month === undefined) {
      month = dateNow.getMonth();
    } else {
      /* Adaptar mes del select con el mes que maneja javascript */
      month = month - 1;
    }

    const firstDayMonth = new Date(
      dateNow.getFullYear(),
      month,
      1,
    ).toISOString();
    const lastDayMonth = new Date(
      dateNow.getFullYear(),
      month + 1,
      0,
    ).toISOString();

    return [{ fecha: firstDayMonth }, { fecha: lastDayMonth }];
  };

  const [dataGraph, setDataGraph] = useState(
    balance_mensual.concat(rangeData()),
  );

  const data: ChartData<"line", BalanceDiarioVentaLeche[]> = {
    datasets: [
      {
        label: "Cantidad",
        data: dataGraph,
      },
    ],
  };

  const onChangeMonth = async (select: number) => {
    const data = await getBalanceMonthlySaleMilk(select);

    if ("error" in data) return toast.error(messageErrorApi(data));
    setDataGraph(data.concat(rangeData(select)));
  };

  return (
    <>
      {/* titulo */}
      <div className="flex justify-between">
        <div className="flex gap-4">
          <span className="text-2xl">Ganancia acumulada del mes</span>
          <div className="w-32">
            <SelectFilterMonth label="Mes" onChange={onChangeMonth} />
          </div>
        </div>

        {/* boton y modal crear venta leche */}
        <ButtonCreateItem href={"venta_leche/registrar"} />
      </div>
      {/* Ganancias */}
      <span className="mb-1 text-lg">{ganancias}</span>
      <Line options={optionChartLineEarningsMilkMonth} data={data} />;
    </>
  );
};
