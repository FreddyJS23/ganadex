import { TortaCausasFallecimientosGanado } from "@/components/charts/dashboard/common cause dead doughnut";
import { DropdownCausaFallecimiento } from "@/components/dropdowns/dropdown causa fallecimiento";
import { TableDeadCattle } from "@/components/tables/death cattle";
import type { ResponseFallecimientos } from "@/types";
import type { Fallecimientos } from "@/types/dashboard";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseFallecimientos>({
    endPoint: "fallecimientos",
  });
  const { fallecidos } = responseErrorServer(response);

  const response2 = await getData<Fallecimientos>({
    endPoint: "dashboardFallecimientosCausasFrecuentes",
  });
  const { causas_frecuentes, total_fallecidos } =
    responseErrorServer(response2);

  return (
    <section className="flex gap-8 flex-col">
      <div className="flex gap-6 flex-col lg:flex-row w-full">
        {/*   grafico ganancia */}
        <article className="shadow-cards p-4 flex flex-col bg-base-100 max-h-72">
          {/* titulo */}
          <div className="flex justify-between gap-4">
            <span className="text-xl font-bold ">
              Causas mas frecuentes de fallecimientos
            </span>
            <DropdownCausaFallecimiento />
          </div>
          {/* grafico */}
          <TortaCausasFallecimientosGanado
            causas_frecuentes={causas_frecuentes}
            total_fallecidos={total_fallecidos}
          />
        </article>

        {/* tabla fallecimientos */}
        <article className="flex flex-col gap-2 grow">
          <h3 className="ml-2 text-lg md:text-xl font-bold">
            Historial de fallecimientos
          </h3>
          <TableDeadCattle fallecidos={fallecidos} />
        </article>
      </div>
    </section>
  );
}
