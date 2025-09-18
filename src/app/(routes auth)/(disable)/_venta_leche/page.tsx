import { CardDashboardSaleMilk } from "@/components/cards";
import { ChartEarningsMilkMonth } from "@/components/charts/dashboard/earnings milk month";
import { TableSaleMilk } from "@/components/tables/sale milk";
import { ResponseVentasLeche } from "@/types";
import {
  BalanceMensualVentaLeche,
  GanaciasMes,
  PrecioActual,
  VariacionPrecio,
} from "@/types/dashboard";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  
  const response = await getData<ResponseVentasLeche>({endPoint:"ventasLeche"});
  const {ventas_de_leche}=responseErrorServer(response);
  
  const response2 = await getData<PrecioActual>({endPoint:"dashboardVentaLecheprecioActual"});
  const {precio_actual}=responseErrorServer(response2);
  
  const response3 = await getData<VariacionPrecio>({endPoint:"dashboardVentaLechevariacionPRecio"});
  const {variacion}=responseErrorServer(response3);
  
  const response4 = await getData<GanaciasMes>({endPoint:"dashboardVentaLechegananciasDelMes"});
  const {ganancias}=responseErrorServer(response4);
  
  const response5 = await getData<BalanceMensualVentaLeche>({endPoint:"dashboardVentaLecheBalanceMensual"});
  const {balance_mensual}=responseErrorServer(response5);
  
  

  return (
    <section className="flex p-4  gap-8 flex-col sm:pl-12">
      {/* cards */}
      <article className="flex">
        <CardDashboardSaleMilk
          title="Precio actual"
          value={precio_actual}
          variationValue={Math.round(variacion)}
          multipleOption={true}
        />
      </article>
      <div className="flex gap-6 flex-col lg:flex-row w-full">
        {/*   grafico ganancia */}
        <article className="w-full shadow-cards p-4 flex flex-col bg-base-100">
          {/* grafico */}
          <ChartEarningsMilkMonth
            ganancias={ganancias}
            balance_mensual={balance_mensual}
          />
        </article>

        {/* tabla ventas */}
        <article className="flex flex-col gap-2">
          <h3 className="ml-2 text-lg md:text-xl">Historial de ventas</h3>
          <TableSaleMilk ventas_de_leche={ventas_de_leche} />
        </article>
      </div>
    </section>
  );
}
