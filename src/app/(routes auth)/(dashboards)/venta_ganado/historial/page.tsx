import { CardDashboardSaleCattle } from "@/components/cards";
import { SalesCatle } from "@/components/charts/dashboard/sales catle";
import { TableSaleCasttle } from "@/components/tables/sale casttle";
import { Tooltip } from "@/components/tooltip";
import { ResponseAñosVentaGanado, ResponseVentasGanado } from "@/types";
import {
  BalanceAnualVentaGanado,
  MejorComprador,
  /*  MejorVenta,
    PeorVenta, */
} from "@/types/dashboard";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseVentasGanado>({
    endPoint: "ventasGanado",
  });
  const { ventas } = responseErrorServer(response);

  const response2 = await getData<MejorComprador>({
    endPoint: "dashboardVentaGanadomejorComprador",
  });
  const { comprador } = responseErrorServer(response2);

  const response5 = await getData<BalanceAnualVentaGanado>({
    endPoint: "dashboardVentaGanadoBalanceAnual",
  });
  const { balance_anual } = responseErrorServer(response5);

  const response6 = await getData<ResponseAñosVentaGanado>({
    endPoint: "añosVentaGanado",
  });
  const { años_ventas_ganado } = responseErrorServer(response6);

  return (
    <section className="flex gap-8 flex-col ">
      {/* cards */}
      <article className="flex justify-around flex-wrap gap-4 items-center">
        <CardDashboardSaleCattle
          data={comprador.nombre ?? ""}
          title="Mejor comprador"
          multipleOption
        />
        {/*   <CardDashboardSaleCattle
                    data={mejorVenta.precio ?? ''}
                    title="Mejor venta"
                />
                <CardDashboardSaleCattle
                    data={peorVenta.precio ?? ''}
                    title="Peor venta"
                /> */}
      </article>

      {/*   grafico venta */}
      <article className="w-full shadow-cards bg-base-100 p-4 flex flex-col gap-4">
        <SalesCatle
          balance_anual={balance_anual}
          años_ventas_ganado={años_ventas_ganado}
        >
          <div className="flex gap-2 items-center">
            <span className="text-2xl font-bold">Ganancia anual</span>
            <Tooltip
              type="icon"
              content={"ganancia_anual"}
              placement="right"
              size="md"
            />
          </div>
        </SalesCatle>
      </article>

      {/* tabla ventas */}
      <article className="flex flex-col gap-2">
        <h3 className="ml-2 text-lg md:text-xl font-bold">
          Historial de ventas
        </h3>
        <TableSaleCasttle ventas={ventas} />
      </article>
    </section>
  );
}
